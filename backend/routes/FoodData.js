const express = require("express");
const router = express.Router();

router.post("/food", (req, res)=>{
    res.send([global.food_category, global.food_items]);
})

module.exports = router;