require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://praveenkumarkanakala123:Praveen@2003@ion.svdmv.mongodb.net/paymentDB", {
// mongoose.connect("mongodb://127.0.0.1:27017/paymentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  amount: Number,
  paymentStatus: String,
  transactionId: String,
  billingDetails: Object,
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Stripe Payment Intent Endpoint
app.post("/create-payment-intent", async (req, res) => {
  const { amount, billingDetails } = req.body;

  if (!amount || !billingDetails || !billingDetails.email) {
    return res.status(400).json({ error: "Missing required payment details" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents (USD)
      currency: "usd",
      description: "Payment for Service/Item",
      receipt_email: billingDetails.email,
      shipping: {
        name: billingDetails.name || "No Name",
        address: billingDetails.address || {},
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Payment intent creation failed" });
  }
});


// Save Transaction Endpoint
app.post("/save-transaction", async (req, res) => {
  const { amount, paymentStatus, transactionId, billingDetails } = req.body;

  const transaction = new Transaction({
    amount,
    paymentStatus,
    transactionId,
    billingDetails,
  });

  try {
    await transaction.save();
    res.status(200).json({ message: "Transaction saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send Email Endpoint
app.post("/send-email", async (req, res) => {
  const { name, email, mobile, company, designation, state, city } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "praveenkumarkanakala123@gmail.com", // Replace with your email
      pass: "gugl rswv iubk caov", // Replace with your app password
    },
  });

  const mailOptions = {
    from: email,
    to: "praveenkumarkanakala123@gmail.com",
    subject: "New Sponsorship Registration",
    text: `
      Name: ${name}
      Email: ${email}
      Mobile: ${mobile}
      Company: ${company}
      Designation: ${designation}
      State: ${state}
      City: ${city}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
