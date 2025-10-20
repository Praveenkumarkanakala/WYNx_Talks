import React, { useState } from 'react';
import image1 from './conclaveimage2.jpg';
import image2 from './conclaveimage1.jpg';
import image3 from './conclaveimage.jpg';
import { useNavigate } from 'react-router-dom';

const ConferenceCard = ({ imageSrc, conferenceName, location, date, showDetails, pdfId, hasAgenda }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ Name: '', Email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const sendPDFEmail = async (email, name, pdfId) => {
    try {
      const response = await fetch('http://localhost:5001/send-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, pdfId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send PDF');
      }

      console.log(`✅ PDF for ${pdfId} sent successfully`);
    } catch (error) {
      console.error('❌ Error sending PDF:', error);
      throw error;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Store user details in database
      const response = await fetch("http://localhost:5001/carnival-conclave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // Step 2: Send PDF based on the event selected
        await sendPDFEmail(formData.Email, formData.Name, pdfId);

        setFormData({ Name: '', Email: '' });
        alert("🎉 Thanks for your interest! Conference details will be sent to your email.");
        setShowModal(false);
      } else {
        alert("❌ Submission failed: " + result.error);
      }
    } catch (error) {
      alert("❌ Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={styles.card}>
        <img src={imageSrc} alt={conferenceName} style={styles.image} />
        <div style={styles.content}>
          <h3 style={styles.conferenceName}>{conferenceName}</h3>
          <p style={styles.infoText}><strong>Date:</strong> {date}</p>
          <p style={styles.infoText}><strong>Location:</strong> {location}</p>
          {showDetails && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
              <button style={styles.detailsButton} onClick={() => setShowModal(true)}>
                Details
              </button>
              {hasAgenda && (
                <button style={styles.detailsButton} onClick={() => navigate('/parisagenda2026')}>
                  Agenda
                </button>
              )}
              <button style={styles.detailsButton} onClick={() => navigate('/awardsnomination')}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>


      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ marginBottom: '15px' }}>Conference Registration</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="Name"
                placeholder="Your Name"
                value={formData.Name}
                onChange={handleChange}
                required
                disabled={loading}
                style={styles.input}
              />
              <input
                type="email"
                name="Email"
                placeholder="Your Email"
                value={formData.Email}
                onChange={handleChange}
                required
                disabled={loading}
                style={styles.input}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={styles.sendButton} disabled={loading}>
                  {loading ? 'Processing...' : 'Send'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={styles.cancelButton}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const ConferencePage = () => {
  return (
    <div style={styles.container}>
      <ConferenceCard
        imageSrc={image1}
        conferenceName="International Women's Day Carnival of Leadership, Impact & Innovation"
        date="March 02-08, 2026."
        location="Paris, France"
        showDetails={true}
        pdfId="womens-day"
        hasAgenda={true} 
      />
      <ConferenceCard
        imageSrc={image2}
        conferenceName="QUANTUM Next Gen Women Leadership & Mental Health Carnival 2026"
        date="July 20-26, 2026."
        location="New York, USA."
        showDetails={true}
        pdfId="quantum"
        hasAgenda={false} 
      />
      <ConferenceCard
        imageSrc={image3}
        conferenceName="International Conference on Women’s Conscious Leadership & Wellbeing"
        date="November 02-08, 2026"
        location="Dubai, UAE"
        showDetails={false}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '77px',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    overflowX: 'auto',
    gap: '20px',
    flexWrap: 'nowrap',
    boxSizing: 'border-box',
  },
  card: {
    flex: '0 0 30%',
    minWidth: '300px',
    maxWidth: '400px',
    height: '420px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    color: '#000',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  content: {
    padding: '15px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    height: 'calc(100% - 180px)',
  },
  conferenceName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#222',
    lineHeight: '1.4',
    minHeight: '50px',
  },
  infoText: {
    fontSize: '13px',
    margin: '2px 0',
    color: '#333',
  },
  detailsButton: {
    marginTop: 'auto',
    padding: '8px 14px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    alignSelf: 'flex-start',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    width: '90%',
    maxWidth: '400px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ConferencePage;
