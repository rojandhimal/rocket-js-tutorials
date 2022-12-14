// require the necessary libraries
const faker = require("faker");
const mongoose = require("mongoose")
const Product = require("./model")

async function seedData() {
    // Connection URL
    const uri = "mongodb://localhost:27017/test_db";
    const seed_count = 5000;
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })

    let timeSeriesData = [];
    // create 5000 fake data
    for (let i = 0; i < seed_count; i++) {
        const name = faker.name.firstName();
        const price = faker.commerce.price()
        timeSeriesData.push({ name, price });
    }

    const seedDB = async () => {
        await Product.insertMany(timeSeriesData)
    }

    seedDB().then(() => {
        mongoose.connection.close()
    })
}

seedData()