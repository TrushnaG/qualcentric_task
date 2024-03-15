const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log("Database Connection successful!");
}).catch((e) => {
    console.log("Database Connection failed!");
})