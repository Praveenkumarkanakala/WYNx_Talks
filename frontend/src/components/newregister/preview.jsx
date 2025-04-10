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

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" color="error">
          No data available. Please go back and submit the form.
        </Typography>
      </Container>
    );
  }

  const handleProceedToPay = () => {
    navigate('/checkout', { state: { formData } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#333',
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
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              First Name:
            </Typography>
            <Typography sx={{ color: '#333' }}>{formData.firstName}</Typography>
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              Last Name:
            </Typography>
            <Typography sx={{ color: '#333' }}>{formData.lastName}</Typography>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              Email:
            </Typography>
            <Typography sx={{ color: '#333' }}>{formData.email}</Typography>
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              Phone Number:
            </Typography>
            <Typography sx={{ color: '#333' }}>{formData.phone}</Typography>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              Would you like to subscribe to our newsletter? :
            </Typography>
            <Typography sx={{ color: '#333' }}>{formData.newsletter || 'Not Selected'}</Typography>
          </Grid>

          {/* Benefit */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              What will be the most benefit to you right now? :
            </Typography>
            <Typography sx={{ color: '#333' }}>
              {formData.benefit === 'other' ? formData['benefit-other'] || 'Not Specified' : formData.benefit}
            </Typography>
          </Grid>

          {/* Workshops */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              Select 3 workshops you would most like to attend :
            </Typography>
            <Typography sx={{ color: '#333' }}>
              {Array.isArray(formData.workshops) ? formData.workshops.join(', ') : 'Not Selected'}
            </Typography>
          </Grid>

          {/* Feature in WINSPIRE Magazine */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', mb: 1 }}>
              Feature you in WINSPIRE Magazine and what is your favourite topic? :
            </Typography>
            <Typography sx={{ color: '#333' }}>
              {formData.featureTopic || 'Not Selected'}
            </Typography>
          </Grid>
        </Grid>

        {/* Award Winning Fee Text */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              color: '#007bff',
              fontSize: '1.2rem',
            }}
          >
            Award Winning Fee is $999
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.history.back()}
            sx={{
              textTransform: 'none',
              px: 4,
              py: 1.5,
              borderColor: '#007bff',
              color: '#007bff',
              '&:hover': {
                borderColor: '#0056b3',
                color: '#0056b3',
              },
            }}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProceedToPay}
            sx={{
              textTransform: 'none',
              px: 4,
              py: 1.5,
              bgcolor: '#007bff',
              '&:hover': {
                bgcolor: '#0056b3',
              },
            }}
          >
            Proceed To Pay
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PreviewPage;