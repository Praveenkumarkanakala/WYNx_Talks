// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   Box,
// } from '@mui/material';

// const PreviewPage = () => {
//   const location = useLocation();
//   const formData = location.state?.formData;

//   if (!formData) {
//     return (
//       <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
//         <Typography variant="h5" color="error">
//           No data available. Please go back and submit the form.
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 8 }}>
//       {/* Removed elevation and added custom styling */}
//       <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
//         <Typography
//           variant="h4"
//           gutterBottom
//           align="center"
//           sx={{
//             fontWeight: 'bold',
//             color: '#333',
//             mb: 4,
//             textTransform: 'uppercase',
//             letterSpacing: '1px',
//           }}
//         >
//           Preview Your Submission
//         </Typography>

//         <Grid container spacing={3}>
//           {/* First Name */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               First Name:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.firstName}</Typography>
//           </Grid>

//           {/* Last Name */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               Last Name:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.lastName}</Typography>
//           </Grid>

//           {/* Email */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               Email:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.email}</Typography>
//           </Grid>

//           {/* Phone Number */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               Phone Number:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.phone}</Typography>
//           </Grid>

//           {/* Newsletter Subscription */}
//           <Grid item xs={12}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               Would you like to subscribe to our newsletter? :
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.newsletter}</Typography>
//           </Grid>

//           {/* Benefit */}
//           <Grid item xs={12}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               What will be the most benefit to you right now? :
//             </Typography>
//             <Typography sx={{ color: '#333' }}>
//               {formData.benefit === 'other' ? formData['benefit-other'] : formData.benefit}
//             </Typography>
//           </Grid>

//           {/* Favorite Magazine Topics */}
//           <Grid item xs={12}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               Select 3 workshops you would most like to attend :
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{(formData.workshops || []).join(', ')}</Typography>
//           </Grid>

//           {/* Feature in WINSPIRE Magazine */}
//           <Grid item xs={12}>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#555',
//                 mb: 1,
//               }}
//             >
//               Feature you in WINSPIRE Magazine and what is your favourite topic? :
//             </Typography>
//             <Typography sx={{ color: '#333' }}>
//               {formData.featureTopic || 'Not Selected'}
//             </Typography>
//           </Grid>
//         </Grid>

//         {/* Award Winning Fee Text */}
//         <Box sx={{ mt: 3, textAlign: 'center' }}>
//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: 'bold',
//               color: '#007bff',
//               fontSize: '1.2rem',
//             }}
//           >
//             Award Winning Fee is $900
//           </Typography>
//         </Box>

//         {/* Action Buttons */}
//         <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={() => window.history.back()}
//             sx={{
//               textTransform: 'none',
//               px: 4,
//               py: 1.5,
//               borderColor: '#007bff',
//               color: '#007bff',
//               '&:hover': {
//                 borderColor: '#0056b3',
//                 color: '#0056b3',
//               },
//             }}
//           >
//             Go Back
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               textTransform: 'none',
//               px: 4,
//               py: 1.5,
//               bgcolor: '#007bff',
//               '&:hover': {
//                 bgcolor: '#0056b3',
//               },
//             }}
//           >
//             Proceed To Pay
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default PreviewPage;



import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe
const stripePromise = loadStripe("pk_live_51NZAOXSHndIYc9QjsYvC1BF7dV0ZPqaSYxSZJOmMmIvm5ZukRFNOp1dOFPmKLw8eBgqjO35ot8L6x0mF1Ypbyahp00XKqIb6TM");

const CheckoutForm = ({ formData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
        amount: 900, // Amount in USD
        billingDetails: {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          address: { city: "Unknown", country: "US" },
        },
      });

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { email: formData.email },
        },
      });

      if (error) throw new Error(error.message);

      // Save transaction to database
      await axios.post("http://localhost:5000/save-transaction", {
        amount: 900,
        paymentStatus: "Succeeded",
        transactionId: paymentIntent.id,
        billingDetails: { email: formData.email },
      });

      onSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!stripe || loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Pay $0"}
      </Button>
    </form>
  );
};

const PreviewPage = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: "none", border: "1px solid #e0e0e0" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "#333", mb: 4, textTransform: "uppercase" }}
        >
          Preview Your Submission
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#555", mb: 1 }}>
              First Name:
            </Typography>
            <Typography sx={{ color: "#333" }}>{formData.firstName}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#555", mb: 1 }}>
              Last Name:
            </Typography>
            <Typography sx={{ color: "#333" }}>{formData.lastName}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#555", mb: 1 }}>
              Email:
            </Typography>
            <Typography sx={{ color: "#333" }}>{formData.email}</Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#007bff", fontSize: "1.2rem" }}>
            Award Winning Fee is $900
          </Typography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.history.back()}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.5,
              borderColor: "#007bff",
              color: "#007bff",
              "&:hover": { borderColor: "#0056b3", color: "#0056b3" },
            }}
          >
            Go Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsPaying(true)}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.5,
              bgcolor: "#007bff",
              "&:hover": { bgcolor: "#0056b3" },
            }}
          >
            Proceed To Pay
          </Button>
        </Box>

        {isPaying && (
          <Box sx={{ mt: 4 }}>
            <Elements stripe={stripePromise}>
              <CheckoutForm formData={formData} onSuccess={() => setPaymentSuccess(true)} />
            </Elements>
          </Box>
        )}

        {paymentSuccess && (
          <Typography sx={{ mt: 4, color: "green", textAlign: "center", fontWeight: "bold" }}>
            Payment Successful!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default PreviewPage;
