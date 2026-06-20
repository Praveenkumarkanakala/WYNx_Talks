require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("FATAL: STRIPE_SECRET_KEY is missing from your .env file.");
  process.exit(1);
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// During local dev
// app.use(cors());

// For production
app.use(cors({
  origin: "https://wynxtalks.com",
}));

app.use(bodyParser.json());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/paymentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err.message));

/* ─── Transaction schema ────────────────────────────────────── */
const transactionSchema = new mongoose.Schema({
  amount:         Number,
  paymentStatus:  String,
  transactionId:  String,
  billingDetails: Object,       // stores full registration + package info
  date:           { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

/* ─── Contact schema ────────────────────────────────────────── */
const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  status:  { type: String, default: "new" }, // new | read | replied
  date:    { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);


app.post("/api/create-payment-intent", async (req, res) => {
  console.log("[create-payment-intent] request received:", JSON.stringify(req.body));

  const { amount, billingDetails } = req.body;

  if (!amount || !billingDetails || !billingDetails.email) {
    console.warn("[create-payment-intent] rejected: missing amount or billingDetails.email");
    return res.status(400).json({ error: "Missing required payment details (amount, billingDetails.email)." });
  }

  const startedAt = Date.now();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount:        Math.round(amount * 100),
      currency:      "usd",
      description:   "WYNx Conference Registration",
      receipt_email: billingDetails.email,
      ...(billingDetails.name && {
        shipping: {
          name:    billingDetails.name,
          address: billingDetails.address || {},
        },
      }),
    });

    console.log(`[create-payment-intent] succeeded in ${Date.now() - startedAt}ms, intent: ${paymentIntent.id}`);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(`[create-payment-intent] FAILED after ${Date.now() - startedAt}ms`);
    console.error("[create-payment-intent] Stripe error type:", error.type);
    console.error("[create-payment-intent] Stripe error message:", error.message);
    res.status(500).json({ error: error.message || "Payment intent creation failed." });
  }
});


app.post("/api/save-transaction", async (req, res) => {
  const { amount, paymentStatus, transactionId, billingDetails } = req.body;

  if (!transactionId || !paymentStatus) {
    return res.status(400).json({ error: "Missing transactionId or paymentStatus." });
  }

  try {
    const transaction = new Transaction({ amount, paymentStatus, transactionId, billingDetails });
    await transaction.save();
    res.status(200).json({ message: "Transaction saved successfully." });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ error: error.message });
  }
});



/* ─── POST /api/contact ─────────────────────────────────────── */
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields (name, email, subject, message) are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  try {
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    console.log(`[contact] new message saved from ${email} (id: ${contact._id})`);
    res.status(201).json({ message: "Message received successfully.", id: contact._id });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});


app.get("/api/contact", async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;

    const contacts = await Contact.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.json({ contacts, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ─── GET /api/contact/:id ──────────────────────────────────── */
app.get("/api/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Message not found." });
    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));