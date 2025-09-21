import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Alert,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    "pk_live_51RwLAARzckuLa8yPZ5etoX3yvRSYsOKCA4CQ8kUulRf9DZ3UVjwqelZaaE1tUvn5lD5FC5MpBWQw2CNiU53nC2Sd00Cgc5uc3r"
);

const CheckoutForm = ({ formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const [paymentRequest, setPaymentRequest] = React.useState(null);

  // Zelle-specific state
  const [zelleConfirmation, setZelleConfirmation] = React.useState(false);

  React.useEffect(() => {
    if (stripe && elements && paymentMethod === "card") {
      const paymentRequest = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Event Registration",
          amount: 20000, // Amount in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      });

      // Check availability of Apple Pay/Google Pay
      paymentRequest.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(paymentRequest);
        }
      });

      // Handle payment response for digital wallets
      paymentRequest.on("paymentmethod", async (event) => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            "http://localhost:5001/create-payment-intent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: 200,
                billingDetails: {
                  name: event.payerName,
                  email: event.payerEmail,
                  phone: event.payerPhone,
                },
              }),
            }
          );

          const { clientSecret, error: backendError } = await response.json();
          if (backendError) {
            setError(backendError);
            setLoading(false);
            return;
          }

          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: event.paymentMethod.id,
          });

          if (error) {
            setError(error.message);
            event.complete("fail");
          } else {
            setSuccess(true);
            event.complete("success");
            setTimeout(() => alert("Payment successful!"), 1000);
          }
        } catch (err) {
          setError("An unexpected error occurred. Please try again.");
          event.complete("fail");
        }

        setLoading(false);
      });
    }
  }, [stripe, elements, paymentMethod]);

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe not loaded. Try again.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const billingDetails = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: {
          line1: formData.address || "N/A",
        },
      };

      const response = await fetch(
        "http://localhost:5001/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 200,
            billingDetails,
          }),
        }
      );

      const { clientSecret, error: backendError } = await response.json();
      if (backendError) {
        setError(backendError);
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        await fetch("http://localhost:5001/save-transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 200,
            paymentStatus: "succeeded",
            transactionId: result.paymentIntent.id,
            billingDetails,
            paymentMethod: "card",
          }),
        });

        setSuccess(true);
        setTimeout(() => alert("Payment successful!"), 1000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  const handleZelleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate sending Zelle payment confirmation to backend
      const billingDetails = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: {
          line1: formData.address || "N/A",
        },
      };

      await fetch("http://localhost:5001/save-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 200,
          paymentStatus: "pending", // Zelle payments need manual verification
          transactionId: `zelle-${Date.now()}`, // Temporary ID
          billingDetails,
          paymentMethod: "zelle",
        }),
      });

      setZelleConfirmation(true);
      setTimeout(() => alert("Zelle payment request submitted! Awaiting verification."), 1000);
    } catch (err) {
      setError("Failed to record Zelle payment request. Please try again.");
    }

    setLoading(false);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setError(null);
    setZelleConfirmation(false);
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
      ) : zelleConfirmation ? (
        <Alert severity="info">
          Zelle payment request submitted! You'll receive a confirmation once the payment is verified.
        </Alert>
      ) : (
        <Box>
          {/* Payment Method Selection */}
          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <FormLabel component="legend">Choose Payment Method</FormLabel>
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel
                value="wallet"
                control={<Radio />}
                label="Apple Pay/Google Pay"
                disabled={!paymentRequest}
              />
              {/* <FormControlLabel
                value="zelle"
                control={<Radio />}
                label="Zelle"
              /> */}
            </RadioGroup>
          </FormControl>

          {paymentMethod === "card" ? (
            <>
              <form onSubmit={handleCardSubmit}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#333",
                        "::placeholder": {
                          color: "#aab7b4",
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
                  type="submit"
                  variant="contained"
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
                  {loading ? "Processing..." : "Pay $200 Now"}
                </Button>
              </form>

              <Divider sx={{ my: 3 }}>or</Divider>

              {paymentRequest && (
                <Box>
                  <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
                    Pay with Digital Wallet
                  </Typography>
                  <PaymentRequestButtonElement
                    className="PaymentRequestButton"
                    options={{ paymentRequest }}
                    style={{
                      paymentRequestButton: {
                        type: "buy",
                        theme: "dark",
                        height: "44px",
                        borderRadius: "6px",
                      },
                    }}
                  />
                </Box>
              )}
            </>
          ) : paymentMethod === "wallet" ? (
            <Box>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                Digital wallet option not available on this device
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setPaymentMethod("card")}
                sx={{ mb: 2 }}
              >
                Use Credit Card Instead
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
                Pay with Zelle
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please send $200.00 USD via Zelle to the following:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                Zelle Email: payments@yourbusiness.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Include your email ({formData.email}) in the Zelle memo for verification.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={handleZelleSubmit}
                sx={{
                  py: 1.5,
                  bgcolor: "#007bff",
                  "&:hover": {
                    bgcolor: "#0056b3",
                  },
                }}
              >
                {loading ? "Processing..." : "Confirm Zelle Payment Sent"}
              </Button>
            </Box>
          )}
        </Box>
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
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#007bff", mt: 2 }}
              >
                Total Amount: $200.00 USD
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Elements
          stripe={stripePromise}
          options={{
            appearance: {
              theme: "stripe",
            },
            locale: "en",
          }}
        >
          <CheckoutForm formData={formData} />
        </Elements>
      </Paper>
    </Container>
  );
};

export default Checkout;