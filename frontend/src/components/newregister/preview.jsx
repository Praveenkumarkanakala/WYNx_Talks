// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   Box,
// } from '@mui/material';

// // Helper to format benefit choice
// const formatBenefit = (choice, otherText) => {
//   const labels = {
//     industryPanels: 'Industry Panels',
//     professionalDevelopment: 'Professional Development',
//     networking: 'Networking',
//     teamBuilding: 'Team Building',
//     other: 'Other'
//   };
//   if (choice === 'other') {
//     return otherText || 'Other (not specified)';
//   }
//   return labels[choice] || choice;
// };

// // Helper to format magazine topic
// const formatMagazineTopic = (topic) => {
//   const labels = {
//     trailblazingWomen: 'Trailblazing Women',
//     genderEquity: 'Gender Equity',
//     leadership: 'Leadership',
//     mentoring: 'Mentoring',
//     books: 'Books',
//     productsWeLove: 'Products We Love'
//   };
//   return labels[topic] || topic;
// };

// const PreviewPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const formData = location.state?.submissionData;

//   if (!formData) {
//     return (
//       <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
//         <Typography variant="h5" color="error">
//           No data available. Please go back and submit the form.
//         </Typography>
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={() => navigate('/')}
//           sx={{ mt: 3 }}
//         >
//           ← Go Back to Form
//         </Button>
//       </Container>
//     );
//   }

//   const handleProceedToPay = () => {
//     navigate('/checkout', { state: { formData } });
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 8 }}>
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
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               First Name:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.firstName}</Typography>
//           </Grid>

//           {/* Last Name */}
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               Last Name:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.lastName}</Typography>
//           </Grid>

//           {/* Email */}
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               Email:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.email}</Typography>
//           </Grid>

//           {/* Phone Number */}
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               Phone Number:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>{formData.phone}</Typography>
//           </Grid>

//           {/* Newsletter Subscription */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               Would you like to subscribe to our newsletter?
//             </Typography>
//             <Typography sx={{ color: '#333' }}>
//               {formData.subscribeNewsletter === 'yes' ? 'Yes' : 'No'}
//             </Typography>
//           </Grid>

//           {/* Benefit */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               What will be the most benefit to you right now?
//             </Typography>
//             <Typography sx={{ color: '#333' }}>
//               {formatBenefit(formData.benefitChoice, formData.otherBenefit)}
//             </Typography>
//           </Grid>

//           {/* Workshops */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               Selected Workshops (up to 3):
//             </Typography>
//             <Typography sx={{ color: '#333' }}>
//               {Array.isArray(formData.selectedWorkshops) && formData.selectedWorkshops.length > 0
//                 ? formData.selectedWorkshops.join(', ')
//                 : 'None selected'}
//             </Typography>
//           </Grid>

//           {/* Magazine Topic */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
//               Favourite WINSPIRE Magazine Topic:
//             </Typography>
//             <Typography sx={{ color: '#333' }}>
//               {formatMagazineTopic(formData.magazineFeatureTopic)}
//             </Typography>
//           </Grid>
//         </Grid>

//         {/* Fee Notice */}
//         <Box sx={{ mt: 3, textAlign: 'center' }}>
//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: 'bold',
//               color: '#d32f2f', // red to highlight cost
//               fontSize: '1.2rem',
//             }}
//           >
//             Award Winning Fee: $999
//           </Typography>
//         </Box>

//         {/* Action Buttons */}
//         <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={() => navigate(-1)} // go back in history
//             sx={{
//               textTransform: 'none',
//               px: 4,
//               py: 1.5,
//             }}
//           >
//             Go Back
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleProceedToPay}
//             sx={{
//               textTransform: 'none',
//               px: 4,
//               py: 1.5,
//               bgcolor: '#1976d2',
//               '&:hover': { bgcolor: '#1565c0' },
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


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
} from '@mui/material';

// Helper to format benefit choice
const formatBenefit = (choice, otherText) => {
  const labels = {
    industryPanels: 'Industry Panels',
    professionalDevelopment: 'Professional Development',
    networking: 'Networking',
    teamBuilding: 'Team Building',
    other: 'Other'
  };
  if (choice === 'other') {
    return otherText || 'Other (not specified)';
  }
  return labels[choice] || choice;
};

// Helper to format magazine topic
const formatMagazineTopic = (topic) => {
  const labels = {
    trailblazingWomen: 'Trailblazing Women',
    genderEquity: 'Gender Equity',
    leadership: 'Leadership',
    mentoring: 'Mentoring',
    books: 'Books',
    productsWeLove: 'Products We Love'
  };
  return labels[topic] || topic;
};

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const formData = location.state?.submissionData;

  if (!formData) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" sx={{ color: '#c8922a' }}>
          No data available. Please go back and submit the form.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{
            mt: 3,
            color: '#c8922a',
            borderColor: 'rgba(200, 146, 42, 0.5)',
            '&:hover': { borderColor: '#c8922a', backgroundColor: 'rgba(200, 146, 42, 0.08)' }
          }}
        >
          ← Go Back to Form
        </Button>
      </Container>
    );
  }

  const handleProceedToPay = () => {
    navigate('/checkout', { state: { formData } });
  };

  return (
    <Box sx={{ background: '#0a1a14', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Paper sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          background: '#0f2019',
          border: '1px solid rgba(200, 146, 42, 0.18)',
        }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              color: '#c8922a',
              mb: 4,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Preview Your Submission
          </Typography>

          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                First Name:
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>{formData.firstName}</Typography>
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                Last Name:
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>{formData.lastName}</Typography>
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                Email:
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>{formData.email}</Typography>
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                Phone Number:
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>{formData.phone}</Typography>
            </Grid>

            {/* Newsletter Subscription */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                Would you like to subscribe to our newsletter?
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>
                {formData.subscribeNewsletter === 'yes' ? 'Yes' : 'No'}
              </Typography>
            </Grid>

            {/* Benefit */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                What will be the most benefit to you right now?
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>
                {formatBenefit(formData.benefitChoice, formData.otherBenefit)}
              </Typography>
            </Grid>

            {/* Workshops */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                Selected Workshops (up to 3):
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>
                {Array.isArray(formData.selectedWorkshops) && formData.selectedWorkshops.length > 0
                  ? formData.selectedWorkshops.join(', ')
                  : 'None selected'}
              </Typography>
            </Grid>

            {/* Magazine Topic */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#c8922a', mb: 1 }}>
                Favourite WINSPIRE Magazine Topic:
              </Typography>
              <Typography sx={{ color: '#ffffff' }}>
                {formatMagazineTopic(formData.magazineFeatureTopic)}
              </Typography>
            </Grid>
          </Grid>

          {/* Fee Notice */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: '#c8922a',
                fontSize: '1.2rem',
              }}
            >
              Award Winning Fee: $999
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                textTransform: 'none',
                px: 4,
                py: 1.5,
                color: 'rgba(255,255,255,0.8)',
                borderColor: 'rgba(255,255,255,0.2)',
                '&:hover': {
                  borderColor: '#c8922a',
                  color: '#c8922a',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              onClick={handleProceedToPay}
              sx={{
                textTransform: 'none',
                px: 4,
                py: 1.5,
                bgcolor: '#c8922a',
                color: '#0a1a14',
                fontWeight: 700,
                '&:hover': { bgcolor: '#dba338' },
              }}
            >
              Proceed To Pay
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PreviewPage;