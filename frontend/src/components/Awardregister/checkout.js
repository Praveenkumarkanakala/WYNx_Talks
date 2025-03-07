import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_live_51NZAOXSHndIYc9QjsYvC1BF7dV0ZPqaSYxSZJOmMmIvm5ZukRFNOp1dOFPmKLw8eBgqjO35ot8L6x0mF1Ypbyahp00XKqIb6TM");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    if (!stripe || !elements) {
      setError("Stripe not loaded. Try again.");
      setLoading(false);
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  
    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setSuccess("Payment successful!");
  
      // Save transaction details
      try {
        await fetch("http://localhost:5000/save-transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: paymentIntent.amount / 100,
            paymentStatus: paymentIntent.status,
            transactionId: paymentIntent.id,
            billingDetails: {}, // Add actual billing details here if available
          }),
        });
      } catch (err) {
        console.error("Failed to save transaction:", err);
      }
  
      setTimeout(() => navigate("/success"), 2000);
    }
  
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Complete Payment</h2>
      <CardElement options={{ style: { base: { fontSize: "18px" } } }} />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: "20px", padding: "10px 20px" }}>
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Checkout</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Invalid session. Please try again.</p>
      )}
    </div>
  );
};

export default Checkout;
