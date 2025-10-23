require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const path = require("path");
const multer = require("multer");

const upload = multer({ dest: 'uploads/' });
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/paymentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const transactionSchema = new mongoose.Schema({
  amount: Number,
  paymentStatus: String,
  transactionId: String,
  billingDetails: Object,
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// const CarnivaleventSchema = new mongoose.Schema({
//   Name: String,
//   Email: String,
//   date: { type: Date, default: Date.now }
// });

// const Carnivalevent = mongoose.model("Carnivalevent", CarnivaleventSchema);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
// });

// app.post("/carnival-conclave", async (req, res) => {
//   const { Name, Email } = req.body;
//   const carnivalweek = new Carnivalevent({ Name, Email });

//   try {
//     await carnivalweek.save();

//     await transporter.sendMail({
//       from: '"Carnival Submission" <wynxtalks@gmail.com>',
//       to: "wynxtalks@gmail.com",
//       subject: "New Carnival Submission",
//       html: `<p><strong>Name:</strong> ${Name}</p><p><strong>Email:</strong> ${Email}</p>`
//     });

//     res.status(200).json({ message: "Registration successful", email: Email, name: Name });
//   } catch (error) {
//     console.error("Error in /carnival-conclave:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/send-pdf", async (req, res) => {
//   const { email, name, pdfId } = req.body;

//   try {
//     if (!email || !name || !pdfId) {
//       return res.status(400).json({ error: "Email, name, and pdfId are required" });
//     }

//     const brochureDetails = {
//       "womens-day": {
//         filename: "WYNx Paris Brochure.pdf",
//         subject: "Welcome to WYNx Award-Winning Talks 2026",
//         html: `<h2>Welcome to the International Women's Day Carnival of Leadership!</h2>
//                <p>Dear ${name},</p>
//                <p>Thank you for your interest in our Paris 2026 event.</p>
//                <p>Please find the event brochure attached as a PDF, which provides key information including program highlights, participation benefits, and other essential event details.</p>
//                <p>If you have any questions or would like further clarification, our team would be happy to assist you. We look forward to the possibility of welcoming you to this impactful event.</p>
//                <p>Thank you once again for your interest.</p>
//                <p>Warm regards,<br>WYNx Team</p>`
//       },
//       "quantum": {
//         filename: "WYNX New York Brochure.pdf",
//         subject: "Welcome to WYNx Award-Winning Talks 2026",
//         html: `<h2>Welcome to QUANTUM Next Gen Women Leadership & Mental Health Carnival!</h2>
//                <p>Dear ${name},</p>
//                <p>Thank you for your interest in our New York 2026 event.</p>
//                <p>Please find the event brochure attached as a PDF, which provides key information including program highlights, participation benefits, and other essential event details.</p>
//                <p>If you have any questions or would like further clarification, our team would be happy to assist you. We look forward to the possibility of welcoming you to this impactful event.</p>
//                <p>Thank you once again for your interest.</p>
//                <p>Warm regards,<br>WYNx Team</p>`
//       }
//     };

//     const brochure = brochureDetails[pdfId];

//     if (!brochure) {
//       return res.status(400).json({ error: "Invalid PDF identifier" });
//     }

//     const pdfPath = path.resolve(__dirname, 'public', brochure.filename);

//     if (!fs.existsSync(pdfPath)) {
//       console.error(`❌ PDF not found at: ${pdfPath}`);
//       return res.status(500).json({ error: "PDF file not found on server" });
//     }

//     await transporter.sendMail({
//       from: '"Wynx Team" <wynxtalks@gmail.com>',
//       to: email,
//       subject: brochure.subject,
//       html: brochure.html,
//       attachments: [{ filename: brochure.filename, path: pdfPath }]
//     });

//     res.status(200).json({ message: "✅ PDF sent successfully" });
//   } catch (error) {
//     console.error("❌ Error sending PDF:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

app.get("/carnival-week", async (req, res) => {
  try {
    const entries = await Carnivalevent.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error("❌ Error in /carnival-week:", error);
    res.status(500).json({ error: error.message });
  }
});

// Payment and other endpoints
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
    console.error("Error saving transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/send-email", async (req, res) => {
  const { name, email, mobile, company, designation, state, city } = req.body;

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
    res.status(500).json({ error: "Failed to send email." });
  }
});


const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));