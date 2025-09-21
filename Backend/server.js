require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const path = require("path");
const multer = require("multer");
const { log } = require('console');

const upload = multer({ dest: 'uploads/' });
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Missing");

app.use(cors({
  origin: "http://localhost:3000", // Adjust to your frontend URL
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Serve static files
app.use('/public', express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/paymentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  amount: Number,
  paymentStatus: String,
  transactionId: String,
  billingDetails: Object,
  paymentMethod: String, // Added to track payment method
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Carnival Event Schema
const CarnivaleventSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  date: { type: Date, default: Date.now }
});

const Carnivalevent = mongoose.model("Carnivalevent", CarnivaleventSchema);

// Email Transporter - FIXED: createTransport instead of createTransporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// Carnival Registration Endpoint
app.post("/carnival-conclave", async (req, res) => {
  const { Name, Email } = req.body;
  const carnivalweek = new Carnivalevent({ Name, Email });

  try {
    await carnivalweek.save();

    await transporter.sendMail({
      from: '"Carnival Submission" <wynxtalks@gmail.com>',
      to: "wynxtalks@gmail.com",
      subject: "New Carnival Submission",
      html: `<p><strong>Name:</strong> ${Name}</p><p><strong>Email:</strong> ${Email}</p>`
    });

    res.status(200).json({ message: "Registration successful", email: Email, name: Name });
  } catch (error) {
    console.error("❌ Error in /carnival-conclave:", error);
    res.status(500).json({ error: error.message });
  }
});

// PDF Email Endpoint
app.post("/send-pdf", async (req, res) => {
  const { email, name, pdfId } = req.body;

  try {
    if (!email || !name || !pdfId) {
      return res.status(400).json({ error: "Email, name, and pdfId are required" });
    }

    const brochureDetails = {
      "womens-day": {
        filename: "WYNx Paris Brochure.pdf",
        subject: "Welcome to WYNx Award-Winning Talks 2026",
        html: `<h2>Welcome to the International Women's Day Carnival of Leadership!</h2>
               <p>Dear ${name},</p>
               <p>Thank you for your interest in our Paris 2026 event.</p>
               <p>Please find the event brochure attached as a PDF, which provides key information including program highlights, participation benefits, and other essential event details.</p>
               <p>If you have any questions or would like further clarification, our team would be happy to assist you. We look forward to the possibility of welcoming you to this impactful event.</p>
               <p>Thank you once again for your interest.</p>
               <p>Warm regards,<br>WYNx Team</p>`
      },
      "quantum": {
        filename: "WYNX New York Brochure.pdf",
        subject: "Welcome to WYNx Award-Winning Talks 2026",
        html: `<h2>Welcome to QUANTUM Next Gen Women Leadership & Mental Health Carnival!</h2>
               <p>Dear ${name},</p>
               <p>Thank you for your interest in our New York 2026 event.</p>
               <p>Please find the event brochure attached as a PDF, which provides key information including program highlights, participation benefits, and other essential event details.</p>
               <p>If you have any questions or would like further clarification, our team would be happy to assist you. We look forward to the possibility of welcoming you to this impactful event.</p>
               <p>Thank you once again for your interest.</p>
               <p>Warm regards,<br>WYNx Team</p>`
      }
    };

    const brochure = brochureDetails[pdfId];

    if (!brochure) {
      return res.status(400).json({ error: "Invalid PDF identifier" });
    }

    const pdfPath = path.resolve(__dirname, 'public', brochure.filename);

    if (!fs.existsSync(pdfPath)) {
      console.error(`❌ PDF not found at: ${pdfPath}`);
      return res.status(500).json({ error: "PDF file not found on server" });
    }

    await transporter.sendMail({
      from: '"Wynx Team" <wynxtalks@gmail.com>',
      to: email,
      subject: brochure.subject,
      html: brochure.html,
      attachments: [{ filename: brochure.filename, path: pdfPath }]
    });

    res.status(200).json({ message: "✅ PDF sent successfully" });
  } catch (error) {
    console.error("❌ Error sending PDF:", error);
    res.status(500).json({ error: error.message });
  }
});

// Carnival Week Data
app.get("/carnival-week", async (req, res) => {
  try {
    const entries = await Carnivalevent.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error("❌ Error in /carnival-week:", error);
    res.status(500).json({ error: error.message });
  }
});

// Enhanced Payment Intent Creation
app.post("/create-payment-intent", async (req, res) => {
  const { amount, billingDetails } = req.body;

  if (!amount || !billingDetails || !billingDetails.email) {
    return res.status(400).json({ error: "Missing required payment details" });
  }

  try {
    console.log(`Creating PaymentIntent for ${amount} USD for ${billingDetails.email}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents (USD)
      currency: "usd",
      description: "WYNx Event Registration - " + (billingDetails.name || "Anonymous"),
      receipt_email: billingDetails.email,
      metadata: {
        customer_name: billingDetails.name || "Anonymous",
        customer_email: billingDetails.email,
        customer_phone: billingDetails.phone || "",
      },
      payment_method_types: ['card'], // Add other methods as needed
      shipping: {
        name: billingDetails.name || "No Name",
        phone: billingDetails.phone || "",
        address: {
          line1: billingDetails.address?.line1 || "",
          city: billingDetails.address?.city || "",
          state: billingDetails.address?.state || "",
          postal_code: billingDetails.address?.postal_code || "",
          country: billingDetails.address?.country || "US",
        },
      },
    });

    console.log(`✅ PaymentIntent created: ${paymentIntent.id}`);
    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error("❌ Error creating payment intent:", error);
    res.status(500).json({ 
      error: "Payment intent creation failed",
      details: error.message 
    });
  }
});

// Enhanced Transaction Saving
app.post("/save-transaction", async (req, res) => {
  const { amount, paymentStatus, transactionId, billingDetails, paymentMethod = 'card' } = req.body;

  const transaction = new Transaction({
    amount,
    paymentStatus,
    transactionId,
    billingDetails,
    paymentMethod,
  });

  try {
    await transaction.save();
    console.log(`✅ Transaction saved: ${transactionId} - ${paymentStatus}`);
    
    // Send confirmation email
    if (paymentStatus === 'succeeded') {
      await sendPaymentConfirmation(billingDetails, amount, transactionId);
    }
    
    res.status(200).json({ 
      message: "Transaction saved successfully",
      transactionId 
    });
  } catch (error) {
    console.error("❌ Error saving transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

// Payment Confirmation Email
async function sendPaymentConfirmation(billingDetails, amount, transactionId) {
  try {
    const mailOptions = {
      from: '"WYNx Team" <wynxtalks@gmail.com>',
      to: billingDetails.email,
      subject: "Payment Confirmation - WYNx Event Registration",
      html: `
        <h2>Payment Successful! 🎉</h2>
        <p>Dear ${billingDetails.name},</p>
        <p>Thank you for your registration! Your payment has been successfully processed.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Payment Details:</h3>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p><strong>Amount:</strong> $${amount}.00 USD</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>You will receive a detailed confirmation email within 24 hours</li>
          <li>Check your spam folder if you don't see it</li>
          <li>Contact us at <a href="mailto:wynxtalks@gmail.com">wynxtalks@gmail.com</a> if you have any questions</li>
        </ul>
        
        <p>We look forward to seeing you at the event!</p>
        <p>Warm regards,<br><strong>WYNx Team</strong></p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          This is an automated confirmation. Please do not reply to this email.
        </p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${billingDetails.email}`);
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error);
  }
}

// Sponsorship Email Endpoint
app.post("/send-email", async (req, res) => {
  const { name, email, mobile, company, designation, state, city } = req.body;

  const mailOptions = {
    from: email,
    to: "praveenkumarkanakala123@gmail.com",
    subject: "New Sponsorship Registration",
    html: `
      <h3>New Sponsorship Registration</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${mobile}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${company}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Designation:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${designation}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>State:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${state}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>City:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${city}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Get all transactions (for admin)
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }).limit(50);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    stripe: !!process.env.STRIPE_SECRET_KEY,
    mongodb: mongoose.connection.readyState === 1
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});