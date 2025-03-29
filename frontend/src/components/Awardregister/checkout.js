import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Alert,
} from "@mui/material";

const stripePromise = loadStripe("pk_live_51NZAOXSHndIYc9QjsYvC1BF7dV0ZPqaSYxSZJOmMmIvm5ZukRFNOp1dOFPmKLw8eBgqjO35ot8L6x0mF1Ypbyahp00XKqIb6TM");

const CheckoutForm = ({ formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe not loaded. Try again.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Simulate fetching a clientSecret from the backend
    try {
      const response = await fetch("https://wyn-conferences.onrender.com/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 90000, // $900 in cents
        }),
      });

      const { clientSecret } = await response.json();

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        setTimeout(() => alert("Payment successful!"), 1000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Complete Payment
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success ? (
        <Alert severity="success">Payment Successful!</Alert>
      ) : (
        <>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: "#007bff",
              "&:hover": {
                bgcolor: "#0056b3",
              },
            }}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </>
      )}
    </Paper>
  );
};

const Checkout = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5" color="error">
          No data available. Please go back and submit the form.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        {/* Title */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Checkout
        </Typography>

        {/* Order Summary */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                First Name:
              </Typography>
              <Typography>{formData.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Last Name:
              </Typography>
              <Typography>{formData.lastName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Email:
              </Typography>
              <Typography>{formData.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Phone Number:
              </Typography>
              <Typography>{formData.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Selected Workshops:
              </Typography>
              <Typography>
                {Array.isArray(formData.workshops)
                  ? formData.workshops.join(", ")
                  : "Not Selected"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Stripe Payment Form */}
        <Elements stripe={stripePromise}>
          <CheckoutForm formData={formData} />
        </Elements>
      </Paper>
    </Container>
  );
};

export default Checkout;