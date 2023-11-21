const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://foodie:ak74ayTG@cluster0.mfkjxxh.mongodb.net/foodiemern?retryWrites=true&w=majority";

const mongoConnect =async ()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("database is connected");
        const itemData = await mongoose.connection.db.collection("food_items");
        const categoryData = await mongoose.connection.db.collection("food_category");
        global.food_items  = await itemData.find({}).toArray();
        global.food_category = await categoryData.find({}).toArray();
    }catch(e){
        console.log(e)
    }
}

module.exports = mongoConnect;