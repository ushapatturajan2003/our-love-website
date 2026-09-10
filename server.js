const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});

app.get("/", function(req, res) {
res.send("Our Love Website Server is Running ♡");
});

app.post("/api/visit", async function(req, res) {

try {

    const { date, time, from, destination, nickname } = req.body;

    console.log("Visit Details Received:");
    console.log(req.body);

    // Email to YOU - full details
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.MY_EMAIL,
        subject: "Chennai Visit Details ♡",
        text:

`Someone is coming to Chennai ♡

Name to call: ${nickname}

Date: ${date}
Time: ${time}
Travelling From: ${from}
Chennai Destination: ${destination}
`
});

    // Email to HIM - cute message only
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.HIS_EMAIL,
        subject: "A little message for you ♡",
        text: `${nickname}, unakkaga wait pannittu irukken da ♡`
    });

    console.log("Both emails sent successfully ♡");

    res.json({
        success: true,
        message: "Everything is sent successfully ♡"
    });

} catch (error) {

    console.error("Email Error:", error);

    res.status(500).json({
        success: false,
        message: "Email could not be sent."
    });

}

});

const PORT = 5000;

app.listen(PORT, function() {
console.log("Server is running on http://localhost:" + PORT);
});