const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const db = require('./config/db');

const app = express();

async function connect() {
    try {
        await mongoose.connect(db.url,{ useNewUrlParser: true });
        
    } catch (err) {
        console.log(err);
    }
}

connect();
app.use(express.json());
app.use("/api",routes);


app.listen(8000, () => {
    console.log('Server running on port 8000');
})

