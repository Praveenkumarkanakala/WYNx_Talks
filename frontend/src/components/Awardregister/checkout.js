// checkout.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Container, Typography, Paper, Grid,
  Button, Box, Alert, Divider,
} from "@mui/material";

const stripePromise = loadStripe("pk_live_51Suo3iQUfazZeuEKJLd1doK0cYsB7ZWYfCWCJfME6BJ5RCll4inUw2r25RMQWmhcCcywSLssGcn7Fy6Cr7fb9OnG00bBGkBiu5");

// During local dev
// const API_BASE = "http://localhost:5001";

const API_BASE = "https://www.wynxtalks.com";

/* ─── Theme ─────────────────────────────────────────────────── */
const GOLD       = '#c8922a';
const GOLD_HOV   = '#dba338';
const GOLD_SOFT  = 'rgba(200,146,42,0.35)';
const GOLD_FAINT = 'rgba(200,146,42,0.12)';
const DARKBG     = '#0a1a14';
const PANEL      = '#0f2019';
const TEXT_DIM   = 'rgba(255,255,255,0.6)';
const TEXT_FAINT = 'rgba(255,255,255,0.4)';


const formatConference = (v) => v || '—';
const formatMode       = (mode) =>
  mode === 'physical' ? 'Physical Speaker (In-person)'
  : mode === 'virtual' ? 'Virtual Speaker (Online)'
  : '—';

/* ─── Small label + value block ────────────────────────────── */
const Field = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography sx={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', mb: 0.3 }}>
      {label}
    </Typography>
    <Typography sx={{ color: '#fff', fontSize: '14px', wordBreak: 'break-word' }}>
      {value || '—'}
    </Typography>
  </Grid>
);


const PaymentForm = ({ submissionData, packageData }) => {
  const stripe   = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [success, setSuccess] = useState(false);


  const logTransaction = async (paymentStatus, transactionId, extra = {}) => {
    try {
      const res = await fetch(`${API_BASE}/api/save-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:        packageData.total,
          paymentStatus,

          transactionId: transactionId || `no-id-${Date.now()}`,
          billingDetails: {
            name:        `${submissionData.firstName} ${submissionData.lastName}`,
            email:       submissionData.email,
            phone:       submissionData.phone,
            country:     submissionData.country,
            company:     submissionData.company,
            designation: submissionData.designation,
            conference:  formatConference(submissionData.conference),
            package:     packageData.packageName,
            mode:        packageData.mode,
            total:       packageData.total,
            ...extra,
          },
        }),
      });
      if (!res.ok) {
        console.error("save-transaction returned non-OK status:", res.status);
      }
    } catch (saveErr) {
      console.error("Failed to save transaction log:", saveErr);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { paymentIntent, error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        payment_method_data: {
          billing_details: {
            name:  `${submissionData.firstName} ${submissionData.lastName}`,
            email: submissionData.email,
          },
        },
      },

      redirect: 'if_required',
    });

    /* ── Case 1: Stripe returned an error (declined, auth failed, etc.) ── */
    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);

      await logTransaction(
        "failed",
        stripeError.payment_intent?.id,
        {
          failureReason: stripeError.message,
          failureCode:   stripeError.code || null,
        }
      );
      return;
    }

    /* ── Case 2: Payment succeeded ── */
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      await logTransaction("succeeded", paymentIntent.id);

      setSuccess(true);
      setTimeout(() => navigate("/success"), 1500);
      setLoading(false);
      return;
    }


    if (paymentIntent) {
      await logTransaction(paymentIntent.status || "incomplete", paymentIntent.id);
      setError("Payment was not completed. Please try again.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <Alert severity="success" sx={{ mt: 2, fontSize: '15px' }}>
        🎉 Payment successful! Redirecting…
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <PaymentElement
        options={{
          layout: 'tabs',
          defaultValues: {
            billingDetails: {
              name:  `${submissionData.firstName} ${submissionData.lastName}`,
              email: submissionData.email,
            },
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading || !stripe}
        sx={{
          mt: 2.5,
          py: 1.5,
          bgcolor: GOLD,
          color: DARKBG,
          fontWeight: 700,
          fontSize: '16px',
          borderRadius: '8px',
          textTransform: 'none',
          '&:hover': { bgcolor: GOLD_HOV },
          '&.Mui-disabled': { bgcolor: 'rgba(200,146,42,0.3)', color: 'rgba(10,26,20,0.5)' },
        }}
      >
        {loading ? "Processing…" : `Pay $${packageData.total}`}
      </Button>
    </Box>
  );
};


const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const submissionData = location.state?.submissionData;
  const packageData    = location.state?.packageData;

  const [clientSecret, setClientSecret] = useState(null);
  const [fetchError,   setFetchError]   = useState(null);

  useEffect(() => {
    if (!submissionData || !packageData) return;

    let cancelled = false;

    const createIntent = async () => {
      console.log("[checkout] requesting payment intent from", `${API_BASE}/api/create-payment-intent`);
      const startedAt = performance.now();

      try {
        const res = await fetch(`${API_BASE}/api/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: packageData.total,
            billingDetails: {
              name:  `${submissionData.firstName} ${submissionData.lastName}`,
              email: submissionData.email,
              address: { country: submissionData.country || '' },
            },
          }),
        });

        console.log(`[checkout] response received after ${(performance.now() - startedAt).toFixed(0)}ms, status:`, res.status);

        if (!res.ok) {
          // Try to parse JSON error body, but don't blow up if it isn't JSON
          let message = `Server responded with status ${res.status}`;
          try {
            const errData = await res.json();
            message = errData.error || message;
          } catch (parseErr) {
            console.error("[checkout] could not parse error response as JSON:", parseErr);
          }
          throw new Error(message);
        }

        const data = await res.json();
        if (!data.clientSecret) {
          throw new Error("Server did not return a clientSecret.");
        }

        if (!cancelled) {
          setClientSecret(data.clientSecret);
        }
      } catch (err) {
        console.error("[checkout] create-payment-intent failed:", err);

        if (cancelled) return;

        // fetch only throws "TypeError: Failed to fetch" for actual network-level
        // failures (server down, CORS block, wrong host/port, DNS failure, etc.)
        if (err instanceof TypeError) {
          setFetchError(
            `Could not reach the payment server at ${API_BASE}. Is the backend running and is CORS configured correctly?`
          );
        } else {
          setFetchError(err.message || "Could not connect to payment server.");
        }
      }
    };

    createIntent();

    return () => {
      cancelled = true;
    };
  }, []);   // runs once on mount

  if (!submissionData || !packageData) {
    return (
      <Box sx={{ background: DARKBG, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: GOLD, fontWeight: 700, mb: 3 }}>
            No order data found. Please go back and complete the form.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/awardsnomination')}
            sx={{ color: GOLD, borderColor: GOLD_SOFT, textTransform: 'none', px: 4, py: 1.3,
              '&:hover': { borderColor: GOLD, backgroundColor: GOLD_FAINT } }}
          >
            ← Back to Registration
          </Button>
        </Container>
      </Box>
    );
  }

  const stripeAppearance = {
    theme: 'night',
    variables: {
      colorPrimary:        GOLD,
      colorBackground:     '#102219',
      colorText:           '#ffffff',
      colorDanger:         '#fa755a',
      fontFamily:          '"Inter", "Segoe UI", sans-serif',
      borderRadius:        '8px',
      colorTextPlaceholder: 'rgba(255,255,255,0.35)',
    },
    rules: {
      '.Input': {
        border:      `1.5px solid ${GOLD_SOFT}`,
        boxShadow:   'none',
        padding:     '12px 14px',
      },
      '.Input:focus': {
        border:    `1.5px solid ${GOLD}`,
        boxShadow: `0 0 0 2px ${GOLD_FAINT}`,
      },
      '.Label': {
        color:       'rgba(255,255,255,0.7)',
        fontSize:    '12px',
        fontWeight:  '600',
        letterSpacing: '0.5px',
      },
      '.Tab': {
        border:      `1.5px solid ${GOLD_SOFT}`,
        background:  '#102219',
      },
      '.Tab--selected': {
        border:      `1.5px solid ${GOLD}`,
        background:  GOLD_FAINT,
        color:       GOLD,
      },
    },
  };

  return (
    <Box sx={{ background: DARKBG, minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800, color: '#fff',
            fontSize: { xs: '26px', md: '32px' }, mb: 0.5,
          }}>
            Complete Your <span style={{ color: GOLD }}>Payment</span>
          </Typography>
          <Typography sx={{ color: TEXT_DIM, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Secure Checkout — Powered by Stripe
          </Typography>
        </Box>

        <Grid container spacing={3}>

          {/* ── LEFT: personal + package summary ── */}
          <Grid item xs={12} md={7}>
            <Paper sx={{
              p: { xs: 2.5, md: 3.5 }, borderRadius: 3,
              background: PANEL, border: `1px solid ${GOLD_FAINT}`,
              boxShadow: '0 16px 50px rgba(0,0,0,0.4)',
            }}>
              {/* Personal */}
              <Typography sx={{ color: GOLD, fontWeight: 700, letterSpacing: '1.8px', fontSize: '11px', mb: 1 }}>
                PERSONAL DETAILS
              </Typography>
              <Divider sx={{ mb: 2, borderColor: GOLD_FAINT }} />
              <Grid container spacing={2}>
                <Field label="Name"        value={`${submissionData.firstName} ${submissionData.lastName}`} />
                <Field label="Email"       value={submissionData.email} />
                <Field label="Phone"       value={submissionData.phone} />
                <Field label="Country"     value={submissionData.country} />
                <Field label="Designation" value={submissionData.designation} />
                <Field label="Company"     value={submissionData.company} />
                <Grid item xs={12}>
                  <Typography sx={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', mb: 0.3 }}>
                    Conference
                  </Typography>
                  <Typography sx={{ color: '#fff', fontSize: '14px' }}>
                    {formatConference(submissionData.conference)}
                  </Typography>
                </Grid>
              </Grid>

              {/* Package */}
              <Typography sx={{ color: GOLD, fontWeight: 700, letterSpacing: '1.8px', fontSize: '11px', mt: 3.5, mb: 1 }}>
                PACKAGE
              </Typography>
              <Divider sx={{ mb: 2, borderColor: GOLD_FAINT }} />
              <Grid container spacing={2}>
                <Field label="Participation" value={formatMode(packageData.mode)} />
                <Field label="Package"       value={packageData.packageName} />
                {packageData.accompanying > 0 && (
                  <Field label="Accompanying" value={`${packageData.accompanying} person${packageData.accompanying > 1 ? 's' : ''}`} />
                )}
                {packageData.extraNights > 0 && (
                  <Field label="Extra Nights" value={`${packageData.extraNights} night${packageData.extraNights > 1 ? 's' : ''}`} />
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* ── RIGHT: order summary + payment form ── */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
              <Paper sx={{
                p: { xs: 2.5, md: 3 }, borderRadius: 3,
                background: PANEL, border: `1px solid ${GOLD_SOFT}`,
                boxShadow: '0 16px 50px rgba(0,0,0,0.4)',
              }}>
                {/* Order summary */}
                <Typography sx={{ color: GOLD, fontWeight: 700, letterSpacing: '1.8px', fontSize: '11px', mb: 2 }}>
                  ORDER SUMMARY
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: TEXT_DIM, fontSize: '13px' }}>{packageData.packageName}</Typography>
                  <Typography sx={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>${packageData.packagePrice}</Typography>
                </Box>

                {packageData.accompanying > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: TEXT_DIM, fontSize: '13px' }}>Accompanying × {packageData.accompanying}</Typography>
                    <Typography sx={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>${packageData.accompanying * 369}</Typography>
                  </Box>
                )}

                {packageData.extraNights > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: TEXT_DIM, fontSize: '13px' }}>Extra Nights × {packageData.extraNights}</Typography>
                    <Typography sx={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>${packageData.extraNights * 369}</Typography>
                  </Box>
                )}

                <Divider sx={{ my: 1.8, borderColor: GOLD_SOFT }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3 }}>
                  <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '12px', letterSpacing: '1px' }}>TOTAL</Typography>
                  <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '28px', lineHeight: 1 }}>${packageData.total}</Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: GOLD_FAINT }} />

                {/* Payment form — only mounts once clientSecret is ready */}
                {fetchError ? (
                  <Alert severity="error">{fetchError}</Alert>
                ) : !clientSecret ? (
                  <Typography sx={{ color: TEXT_DIM, fontSize: '13px', textAlign: 'center', py: 2 }}>
                    Loading payment form…
                  </Typography>
                ) : (
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret, appearance: stripeAppearance }}
                  >
                    <PaymentForm
                      submissionData={submissionData}
                      packageData={packageData}
                    />
                  </Elements>
                )}

                <Typography sx={{ color: TEXT_FAINT, fontSize: '10.5px', textAlign: 'center', mt: 2, lineHeight: 1.5 }}>
                  Your payment is secured by Stripe. We never store your card details.
                </Typography>
              </Paper>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;