// preview.jsx page

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container,  Typography,  Paper,  Grid,  Button,  Box,  Divider,  Chip,} from '@mui/material';

/* ─── Theme — matches Registerpage.jsx / landing page ───────── */
const GOLD = '#c8922a';
const GOLD_HOV = '#dba338';
const GOLD_SOFT = 'rgba(200,146,42,0.35)';
const GOLD_FAINT = 'rgba(200,146,42,0.12)';
const DARKBG = '#0a1a14';
const PANEL = '#0f2019';
const PANEL_LIGHT = '#102219';
const TEXT_DIM = 'rgba(255,255,255,0.6)';
const TEXT_FAINT = 'rgba(255,255,255,0.4)';

/* ─── Conference label ─────────────────────────────────────── */

const formatConference = (value) => value || '—';

const formatMode = (mode) =>
  mode === 'physical' ? 'Physical Speaker (In-person)'
  : mode === 'virtual' ? 'Virtual Speaker (Online)'
  : '—';

/* ─── Compact field block ─────────────────────────────── */
const Field = ({ label, value, sm = 6 }) => (
  <Grid item xs={12} sm={sm}>
    <Typography sx={{ fontWeight: 700, color: GOLD, fontSize: '11px', letterSpacing: '0.6px', textTransform: 'uppercase', mb: 0.4 }}>
      {label}
    </Typography>
    <Typography sx={{ color: '#ffffff', fontSize: '14.5px', wordBreak: 'break-word', lineHeight: 1.4 }}>
      {value || '—'}
    </Typography>
  </Grid>
);

/* ─── Section heading ─────────────────────────────────── */
const SectionHeading = ({ children, mt = 0 }) => (
  <Box sx={{ mt, mb: 2 }}>
    <Typography sx={{ color: GOLD, fontWeight: 700, letterSpacing: '1.8px', fontSize: '11px' }}>
      {children}
    </Typography>
    <Divider sx={{ mt: 0.8, borderColor: GOLD_FAINT }} />
  </Box>
);

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const submissionData = location.state?.submissionData;
  const packageData = location.state?.packageData;

  /* ── Guard: nothing to preview ── */
  if (!submissionData) {
    return (
      <Box sx={{ background: DARKBG, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: GOLD, fontWeight: 700, mb: 3 }}>
            No data available. Please go back and submit the form.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/awardsnomination')}
            sx={{
              color: GOLD,
              borderColor: GOLD_SOFT,
              textTransform: 'none',
              px: 4,
              py: 1.3,
              '&:hover': { borderColor: GOLD, backgroundColor: GOLD_FAINT },
            }}
          >
            ← Go Back to Form
          </Button>
        </Container>
      </Box>
    );
  }

 
  const handleBack = () => {
    navigate('/awardsnomination', {
      state: {
        resumeStep: 2,               // land directly on the Package step
        resumeSubmissionData: submissionData,
        resumePackageData: packageData,
      },
    });
  };

  const handleProceedToPay = () => {
    navigate('/checkout', { state: { submissionData, packageData } });
  };

  const addOnsList = [];
  if (packageData?.accompanying > 0) {
    addOnsList.push(`${packageData.accompanying} Accompanying Person${packageData.accompanying > 1 ? 's' : ''}`);
  }
  if (packageData?.extraNights > 0) {
    addOnsList.push(`${packageData.extraNights} Extra Night${packageData.extraNights > 1 ? 's' : ''}`);
  }

  return (
    <Box sx={{ background: DARKBG, minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">

        {/* ── Page header ── */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              color: '#ffffff',
              fontSize: { xs: '26px', md: '32px' },
              mb: 0.5,
            }}
          >
            Confirm Details & <span style={{ color: GOLD }}>Proceed to Payment</span>
          </Typography>
          <Typography sx={{ color: TEXT_DIM, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Step 3 of 3 — Confirm Your Details
          </Typography>
        </Box>

        <Grid container spacing={3}>

          {/* ═══════════ LEFT: details ═══════════ */}
          <Grid item xs={12} md={7}>
            <Paper sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3,
              boxShadow: '0 16px 50px rgba(0,0,0,0.4)',
              background: PANEL,
              border: `1px solid ${GOLD_FAINT}`,
              height: '100%',
            }}>
              <SectionHeading>PERSONAL &amp; CONFERENCE</SectionHeading>

              <Grid container spacing={2.2}>
                <Field label="First Name" value={submissionData.firstName} />
                <Field label="Last Name" value={submissionData.lastName} />
                <Field label="Email" value={submissionData.email} />
                <Field label="Phone Number" value={submissionData.phone} />
                <Field label="Country" value={submissionData.country} />
                <Field label="Designation / Role" value={submissionData.designation} />
                <Field label="Company / Organization" value={submissionData.company} sm={12} />
                <Field label="Conference" value={formatConference(submissionData.conference)} sm={12} />
                {submissionData.linkedin && <Field label="LinkedIn Profile" value={submissionData.linkedin} />}
                {submissionData.facebook && <Field label="Facebook Profile" value={submissionData.facebook} />}
              </Grid>

              <SectionHeading mt={3.5}>PARTICIPATION</SectionHeading>

              {packageData ? (
                <>
                  <Grid container spacing={2.2}>
                    <Field label="Participation Type" value={formatMode(packageData.mode)} />
                    <Field label="Package" value={packageData.packageName} />
                  </Grid>

                  {addOnsList.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {addOnsList.map((label) => (
                        <Chip
                          key={label}
                          label={label}
                          size="small"
                          sx={{
                            background: GOLD_FAINT,
                            color: GOLD,
                            border: `1px solid ${GOLD_SOFT}`,
                            fontWeight: 600,
                            fontSize: '11.5px',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <Typography sx={{ color: TEXT_DIM, fontStyle: 'italic', fontSize: '14px' }}>
                  No package selected yet.
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* ═══════════ RIGHT: sticky price summary ═══════════ */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
              <Paper sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                boxShadow: '0 16px 50px rgba(0,0,0,0.4)',
                background: PANEL,
                border: `1px solid ${GOLD_SOFT}`,
              }}>
                <Typography sx={{ color: GOLD, fontWeight: 700, letterSpacing: '1.8px', fontSize: '11px', mb: 2 }}>
                  ORDER SUMMARY
                </Typography>

                {packageData ? (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
                      <Box>
                        <Typography sx={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>
                          {packageData.packageName}
                        </Typography>
                        <Typography sx={{ color: TEXT_FAINT, fontSize: '11.5px', mt: 0.2 }}>
                          {formatMode(packageData.mode)}
                        </Typography>
                      </Box>
                      <Typography sx={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', pl: 1 }}>
                        ${packageData.packagePrice}
                      </Typography>
                    </Box>

                    {packageData.accompanying > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography sx={{ color: TEXT_DIM, fontSize: '13px' }}>
                          Accompanying Person × {packageData.accompanying}
                        </Typography>
                        <Typography sx={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>
                          ${packageData.accompanying * 369}
                        </Typography>
                      </Box>
                    )}
                    {packageData.extraNights > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography sx={{ color: TEXT_DIM, fontSize: '13px' }}>
                          Extra Night × {packageData.extraNights}
                        </Typography>
                        <Typography sx={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>
                          ${packageData.extraNights * 369}
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 1.8, borderColor: GOLD_SOFT }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2.5 }}>
                      <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '12px', letterSpacing: '1px' }}>
                        TOTAL
                      </Typography>
                      <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '28px', lineHeight: 1 }}>
                        ${packageData.total}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Typography sx={{ color: TEXT_DIM, fontStyle: 'italic', fontSize: '13px', mb: 2.5 }}>
                    Select a package to see pricing.
                  </Typography>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleProceedToPay}
                  disabled={!packageData}
                  sx={{
                    textTransform: 'none',
                    py: 1.4,
                    bgcolor: GOLD,
                    color: DARKBG,
                    fontWeight: 700,
                    fontSize: '15px',
                    borderRadius: 2,
                    mb: 1.2,
                    '&:hover': { bgcolor: GOLD_HOV },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(200,146,42,0.25)',
                      color: 'rgba(10,26,20,0.5)',
                    },
                  }}
                >
                  Proceed To Pay →
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleBack}
                  sx={{
                    textTransform: 'none',
                    py: 1.3,
                    color: 'rgba(255,255,255,0.75)',
                    borderColor: 'rgba(255,255,255,0.18)',
                    fontSize: '13.5px',
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: GOLD,
                      color: GOLD,
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  ← Edit Registration Plan
                </Button>

                <Typography sx={{ color: TEXT_FAINT, fontSize: '10.5px', textAlign: 'center', mt: 2, lineHeight: 1.5 }}>
                  By proceeding you agree to the conference's Terms &amp; Conditions.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PreviewPage;