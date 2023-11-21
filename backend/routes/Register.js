const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const jwtSecret = "akshayisthegreatandyoubetterknowthat";


router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: "invalid email/password" });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 17);
    try {
      const isPresent = await User.findOne({ email: req.body.email });

      if(isPresent){
        return res.send({ errors: "email already registered!"});
      }

      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: passwordHash,
      });

      const userData = await User.findOne({ email: req.body.email });

      const data = {
        user:{
            id : userData._id
        }
      }

      const token = jwt.sign(data, jwtSecret);

      res.json({
        success: true,
        token
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);


router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: "invalid email/password" });
    }
    try {
      const userData = await User.findOne({ email: req.body.email });
      if (!userData) {
        return res.send({ errors: "email not found!" });
      }
      const isUser = await bcrypt.compare(req.body.password, userData.password);
      if (!isUser) {
        return res.send({ errors: "incorrect password!" });
      }

      const data = {
        user:{
            id : userData._id
        }
      }

      const token = jwt.sign(data, jwtSecret);

      res.json({
        success: true,
        token
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);

module.exports = router;
