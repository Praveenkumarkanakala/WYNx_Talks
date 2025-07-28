import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, TextField, Radio, RadioGroup, FormControlLabel, Checkbox,} from '@mui/material';
import summitImage from '../images/education.jpg';

const SummitContainer = styled(Box)({
  width: '100%',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f9f9f9',
});
const SummitHeader = styled(Box)({
  width: '100%',
  backgroundColor: '#000',
  padding: '1rem 2rem',
  textAlign: 'center',
  '& h1': {
    maxWidth: '1200px',
    margin: '0 auto',
    color: 'white',
    fontSize: '2rem',
    lineHeight: 1.2,
    padding: '1rem 0',
  },
});
const SummitMain = styled(Box)({
  margin: '20px 15% 0',
  padding: '2rem',
  '@media (max-width: 1200px)': {
    margin: '20px 10% 0',
  },
  '@media (max-width: 768px)': {
    margin: '0 5%',
    padding: '1rem',
  },
});
const SummitInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  marginBottom: '2rem',
  '@media (max-width: 992px)': {
    flexDirection: 'column',
    textAlign: 'center',
  },
});
const SummitDetails = styled(Box)({
  '& h2': {
    fontSize: '1.5rem',
    color: '#000',
    marginTop: '20px',
    textAlign: 'left',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 576px)': {
      fontSize: '1.1rem',
    },
  },
  '& p': {
    color: 'black',
    fontSize: '1.1rem',
    marginTop: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 576px)': {
      fontSize: '0.9rem',
    },
  },
});
const EnterToWinButton = styled(Button)({
  backgroundColor: 'transparent',
  color: '#e91e63',
  border: '2px solid #e91e63',
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  borderRadius: '5px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#e91e63',
    color: 'white',
  },
  '@media (max-width: 768px)': {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
  },
});
const SummitForm = styled(Box)({
  marginTop: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0',
});
const FormRow = styled(Box)({
  display: 'flex',
  gap: '2rem',
  marginBottom: '1.5rem',
  '@media (max-width: 992px)': {
    flexDirection: 'column',
    gap: '1.5rem',
  },
});
const FormGroup = styled(Box)({flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1rem', '@media (max-width: 576px)': {
    marginBottom: '1rem',
  },
});
const BenefitOptions = styled(Box)({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem',
  '@media (max-width: 992px)': { gridTemplateColumns: '1fr', gap: '0.75rem', },
  '@media (max-width: 576px)': { gap: '0.5rem', },
});
const CheckboxGroup = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '1.5rem',
  '@media (max-width: 992px)': { gridTemplateColumns: '1fr', gap: '0.75rem', },
  '@media (max-width: 576px)': { gap: '0.5rem',},
});
const OptionLabel = styled(FormControlLabel)({
  padding: '0.6rem',
  border: '1px solid #ddd',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  '& .MuiFormControlLabel-label': {
    color: '#000',
  },
  '@media (max-width: 768px)': {
    padding: '0.5rem',
  },
  '@media (max-width: 576px)': {
    padding: '0.4rem',
  },
});
const NewsletterLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    color: '#000',
  },
});
const EnterButton = styled(Button)({
  margin: '1rem auto',
  backgroundColor: '#4fc3f7',
  color: '#000',
  border: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '6px',
  textTransform: 'none',
  display: 'block',
  width: '20%',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#29b6f6',
  },
  '@media (max-width: 992px)': {
    width: '40%',
  },
  '@media (max-width: 768px)': {
    width: '60%',
    fontSize: '0.9rem',
    padding: '0.8rem',
  },
  '@media (max-width: 576px)': {
    width: '100%',
    fontSize: '1rem',
    padding: '1rem',
  },
});

const LeadershipSummit = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === 'checkbox') {
        const existingValues = prevData[name] || [];
        return {
          ...prevData,
          [name]: checked
            ? [...existingValues, value]
            : existingValues.filter((v) => v !== value),
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedWorkshops = formData.workshops || [];
    if (selectedWorkshops.length !== 3) {
      alert('Please select exactly 3 workshops.');
      return;
    }
    if (formData.benefit === 'other' && !formData['benefit-other']) {
      alert('Please specify your other benefit.');
      return;
    }

    navigate('/preview', { state: { formData } });
  };
  const isWorkshopsValid = (formData.workshops || []).length === 3;

  return (
    <SummitContainer>
      <SummitHeader>
        <Typography variant="h1" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
          Next Gen Women Leadership Summit 2026
        </Typography>
      </SummitHeader>
      <SummitMain>
        <SummitInfo>
          <Box>
            <Typography variant="h3" sx={{ color: 'black' }}>
              Next Gen Women Leadership <br /> Summit 2026
            </Typography>
          </Box>
          <img src={summitImage} alt="Leadership Summit" style={{ maxWidth: '300px', height: 'auto', borderRadius: '10px' }} />
        </SummitInfo>
        <SummitDetails>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Don’t Miss the Live Interview!
          </Typography>
          <Typography>
            We’re bringing this feature to life with a live interview featuring incredible women.
            They’ll share their journeys, challenges, and insights on breaking barriers in their
            industries. Stay tuned for details!
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Explore the WINSPIRE Magazine Online
          </Typography>
          <Typography variant="h2">
            This is just one of the many powerful stories featured in WINSPIRE Magazine Volumes.
          </Typography>
          <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
            <EnterToWinButton onClick={() => (window.location.href = 'https://www.winspire.live/')} >
              Explore Now
            </EnterToWinButton>
          </Box>
        </SummitDetails>
        <SummitForm>
          <Typography variant="h2" sx={{ fontSize: '1.75rem', color: '#000', mb: 2, fontWeight: 600 }}>
            Enter to Win
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Typography component="label" htmlFor="firstName" sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                  * First Name:
                </Typography>
                <TextField
                  id="firstName"
                  name="firstName"
                  required
                  onChange={handleChange}
                  size="small"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '6px',
                      fontSize: '1rem',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ddd',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196f3',
                    },
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Typography component="label" htmlFor="lastName" sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                  * Last Name:
                </Typography>
                <TextField
                  id="lastName"
                  name="lastName"
                  required
                  onChange={handleChange}
                  size="small"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '6px',
                      fontSize: '1rem',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ddd',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196f3',
                    },
                  }}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Typography component="label" htmlFor="email" sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                  * Email:
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#666', mb: 0.75, mt: -0.5 }}>
                  The winner will be contacted by email.
                </Typography>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  size="small"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '6px',
                      fontSize: '1rem',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ddd',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196f3',
                    },
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Typography component="label" htmlFor="phone" sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                  * Phone Number:
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#666', mb: 0.75, mt: -0.5 }}>
                  The winner will be contacted by phone.
                </Typography>
                <TextField
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  onChange={handleChange}
                  size="small"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '6px',
                      fontSize: '1rem',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ddd',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196f3',
                    },
                  }}
                />
              </FormGroup>
            </FormRow>
            <FormRow sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
              <FormGroup>
                <Typography sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                  * Would you like to subscribe to our newsletter?
                </Typography>
                <RadioGroup row name="newsletter" onChange={handleChange}>
                  <NewsletterLabel value="yes" control={<Radio />} label="Yes" />
                  <NewsletterLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Typography sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                * What will be the most benefit to you right now?
              </Typography>
              <BenefitOptions>
                {['industry-panels', 'professional-development', 'networking', 'team-building', 'other'].map(
                  (val, i) => (
                    <OptionLabel
                      key={i}
                      control={<Radio />}
                      label={
                        <>
                          {val.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          {val === 'other' && (
                            <TextField
                              name="benefit-other"
                              onChange={handleChange}
                              size="small"
                              sx={{ ml: 1, flex: 1 }}
                            />
                          )}
                        </>
                      }
                      value={val}
                      name="benefit"
                      required
                    />
                  )
                )}
              </BenefitOptions>
            </FormGroup>
            <FormGroup>
              <Typography sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                * Select 3 workshops you would most like to attend
              </Typography>
              <CheckboxGroup>
                {[ 'The State of the Market', 'Dare to Live the Life You Dream Of', 'Reclaim Your Confidence, Increase Your Energy, and Take Control of Your Health', 'Be Seen Be Heard: Empowering your voice and elevating your presence!', 'Valuing Your Worth', 'Protect Your Energy, Lead Your Life', 'The Transformative Power of True Leadership', 'Unlocking the Joy of Being Present',
                ].map((val, i) => (
                  <OptionLabel key={i} control={<Checkbox />} label={val} value={val} name="workshops" onChange={handleChange} />
                ))}
              </CheckboxGroup>
              {!isWorkshopsValid && (
                <Typography sx={{ color: 'red', fontSize: '0.875rem', mt: 1 }}>
                  Please select exactly 3 workshops.
                </Typography>
              )}
            </FormGroup>
            <FormGroup>
              <Typography sx={{ fontWeight: 500, color: '#000', mb: 0.75 }}>
                * Feature you in WINSPIRE Magazine and what is your favourite topic?
              </Typography>
              <BenefitOptions>
                {['Trailblazing Women', 'Gender Equity', 'Leadership', 'Mentoring', 'Books', 'Products We Love'].map(
                  (val, i) => (
                    <OptionLabel
                      key={i}
                      control={<Radio />}
                      label={val.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      value={val}
                      name="featureTopic"
                      required
                    />
                  )
                )}
              </BenefitOptions>
            </FormGroup>
            <EnterButton type="submit" disabled={!isWorkshopsValid}>
              Enter To Win
            </EnterButton>
          </Box>
        </SummitForm>
      </SummitMain>
    </SummitContainer>
  );
};

export default LeadershipSummit;