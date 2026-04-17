import React, { useState } from 'react';

import day1 from './agenda-day1.jpg';
import day2 from './agenda-day2.jpg';
import day3 from './agenda-day3.jpg';
import day4 from './agenda-day4.jpg';
import day5 from './agenda-day5.jpg';
import day6 from './agenda-day6.jpg';
import day7 from './agenda-day7.jpg'

const Agenda = () => {
  const dates = [ 'July 20, 2026', 'July 21, 2026', 'July 22, 2026', 'July 23, 2026', 'July 24, 2026', 'July 25, 2026', 'July 26, 2026' ];

  const agendaImages = {
    'July 20, 2026': day1, 'July 21, 2026': day2, 'July 22, 2026': day3, 'July 23, 2026': day4,
    'July 24, 2026': day5, 'July 25, 2026': day6, 'July 26, 2026': day7
  };

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '30px 20px',
      fontFamily: 'Arial, sans-serif',
       backgroundColor: '#96705aff', 
    },
    heading: {
      textAlign: 'center',
      fontSize: '2.2rem',
      fontWeight: '700',
      marginBottom: '25px',
      color: '#000',
    },
    dateButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      maxWidth: '800px',
      margin: '0 auto 30px',
    },
    button: {
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      background: '#FFA500',
      color: '#fff',
      transition: 'all 0.2s ease',
    },
    activeButton: {
      background: '#FF8C00',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
    },
    imageWrapper: {
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      maxHeight: '100vh',
      objectFit: 'contain',
      borderRadius: '12px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>New York Conclave Agenda 2026</h2>

      <div style={styles.dateButtons}>
        {dates.map((date) => (
          <button
            key={date}
            style={{
              ...styles.button,
              ...(selectedDate === date ? styles.activeButton : {}),
            }}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </button>
        ))}
      </div>

      <div style={styles.imageWrapper}>
        <img
          src={agendaImages[selectedDate]}
          alt={`${selectedDate} Agenda`}
          style={styles.image}
        />
      </div>
    </div>
  );
};

export default Agenda;
