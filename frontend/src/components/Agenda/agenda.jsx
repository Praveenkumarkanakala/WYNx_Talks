import React, { useState } from 'react';

const Agenda = () => {
  const dates = [ 'March 02, 2026', 'March 03, 2026', 'March 04, 2026', 'March 05, 2026', 'March 06, 2026', 'March 07, 2026', 'March 08, 2026'  ];

  // Define unique agenda for each day
  const dailyAgendas = {
    'March 02, 2026': [ 'OPENING CEREMONY', 'Christina Balzani', 'Mary Scott', 'Stephanie OBrien', 'Mari Haruno', 'COFFEE BREAK', 'Heidy Kallion', 'Kunio Hara', 'Jean Pael', 'Dominykas Surgailis', 'Candice Ruggiero',  'LUNCH BREAK', 'Tina Collura', 'Bruce Wren',  'Jeffrey Herbert Williams',  'Shilpa Kudekar-McNeilly', 'Rasimah Jar', 'Amb Dr. Maureen Mbondiah', 'Ali Gordon', 'Adileen Priety'  ],

    'March 03, 2026': [ 'OPENING CEREMONY',  'Dr. Ignacio Bonasa',  'Victoria  Noethling', 'Limor Jasinski', 'Dr. Maria Cristina Sheehan', 'COFFEE BREAK', 'Nikki Langman ', 'Reem Sabah', 'Annabelle Hartnell', 'Melissa von Musser',  'Duta May Bouquet- Brown',  'LUNCH BREAK',  'Hayley Forbes',  'Nina Balaouras', 'Brigitte St-Jean', 'Shimul Rajput', 'Speaker Slot Available', 'Rosalind Millett', 'Speaker Slot Available', 'Speaker Slot Available'
    ],

    'March 04, 2026': [  'OPENING CEREMONY',  'Manjinder Kaur','Anne Deatly,Phd',  'Sonia Bendjaffer-Yousef',  'Nisha Meng Ming Li', 'COFFEE BREAK', 'Sandy Austin ', 'Glebova Ellina', 'Dr. Ruhi Banerjee', 'Barb Varcl Smith', 'Amarilys Galloza Carrero', 'LUNCH BREAK',  'Tanzim Noor',  'Laila Tazi',  'Allison C. Williams',  'Nio Queiro',  ' Wahida Parveen ',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available'
    ],

    // Add more days as needed — for now, repeat March 02 for remaining days
    'March 05, 2026': [
      'OPENING CEREMONY',  'Speaker Slot Available',  'Lissette Valle',   'Dr. Ruchi Mishra Sharma',   'Zonja Glover',   'COFFEE BREAK',   'Dr.Obioma Martin',  ' EnowBisong spouse Njonje Alice Bessem',  ' Dr. Denise Y. Wynn',  'Stephanie Forbes',  'Speaker Slot Available',  'LUNCH BREAK',  'Dr. Sharon Shappley',   'Dr. Dimple Patel',  'Carlota De Gula Iremedio',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available'
    ],

    'March 06, 2026': [
      'OPENING CEREMONY',  'Ann-Marie Emmanuele',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'COFFEE BREAK', 'Speaker Slot Available',  'Victoria Noethling',  'Brigitte St-Jean',  'Thiru Damodharan',  'Kathryn Lancioni',  'LUNCH BREAK',  'Deborah S. Greenhut', 'Nina Balaouras',   'Arsella Burton', 'Sam Sammane', 'Huma Nosheen Mirza', 'Speaker Slot Available', 'Speaker Slot Available', 'Melissa von Musser'

     ],

    'March 07, 2026': [
      'OPENING CEREMONY', 'Speaker Slot Available', 'Rudy Merouchi', 'Kimly Hoang-Nakata',  'Catia Arnaut',  'COFFEE BREAK',   '  Dawn Chen',  'Speaker Slot Available',  'Dr. Denise Y. Wynn',  'Masako Toyama',  'Speaker Slot Available',  'LUNCH BREAK',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',   'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available'
    ],

    'March 08, 2026': [
      'OPENING CEREMONY', 'Speaker Slot Available', 'Speaker Slot Available', 'Speaker Slot Available', 'Speaker Slot Available', 'COFFEE BREAK', 'Speaker Slot Available', 'Speaker Slot Available', 'Speaker Slot Available', 'Speaker Slot Available', 'Speaker Slot Available',  'LUNCH BREAK',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',  'Speaker Slot Available',   'Speaker Slot Available'
    ]
  };

  const getDuration = (item) => {
    if (item === 'COFFEE BREAK') return 30;
    if (item === 'LUNCH BREAK' || item === 'Farewell Lunch') return 60;
    return 40; // All speaking/events: 40 minutes
  };

  const generateTimeSlotsForAgenda = (agendaItems) => {
    const slots = [];
    let hour = 7;
    let minute = 30;

    for (let i = 0; i < agendaItems.length; i++) {
      const item = agendaItems[i];
      const duration = getDuration(item);

      // Format start time
      const startHour = hour;
      const startMinute = minute;
      const startPeriod = startHour < 12 ? 'AM' : 'PM';
      const displayStartHour = startHour % 12 === 0 ? 12 : startHour > 12 ? startHour - 12 : startHour;
      const startTime = `${displayStartHour}:${startMinute.toString().padStart(2, '0')} ${startPeriod}`;

      // Calculate end time
      const totalEndMinutes = hour * 60 + minute + duration;
      let endHour = Math.floor(totalEndMinutes / 60);
      let endMinute = totalEndMinutes % 60;
      const endPeriod = endHour < 12 ? 'AM' : 'PM';
      const displayEndHour = endHour % 12 === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
      const endTime = `${displayEndHour}:${endMinute.toString().padStart(2, '0')} ${endPeriod}`;

      slots.push(`${startTime} - ${endTime}`);

      // Advance time
      minute += duration;
      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }
    }

    return slots;
  };

  // Build agendasByDate with unique time slots per day
  const agendasByDate = {};
  dates.forEach((date) => {
    const agendaItems = dailyAgendas[date] || [];
    const times = generateTimeSlotsForAgenda(agendaItems);
    agendasByDate[date] = times.map((time, index) => ({
      time,
      speaker: agendaItems[index] || 'TBD',
    }));
  });

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const agenda = agendasByDate[selectedDate] || [];

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '30px 20px',
      background: '#6B5B4B',
      minHeight: '100vh',
      color: '#fff',
    },
    heading: {
      textAlign: 'center',
      fontSize: '2.2rem',
      fontWeight: '700',
      marginBottom: '25px',
      color: '#FFA500',
    },
    agendaWrapper: {
      position: 'relative',
      maxWidth: '720px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
    },
    agendaContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      flex: 1,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '3px solid #FFA500',
      fontWeight: 'bold',
      fontSize: '1.15rem',
      color: '#FFA500',
    },
    headerTime: {
      width: '200px',
      textAlign: 'center',
    },
    headerSpeaker: {
      flex: 1,
      textAlign: 'right',
      paddingRight: '20px',
    },
    slot: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '2px solid #FFA500',
    },
    time: {
      width: '200px',
      fontSize: '1.05rem',
      fontWeight: 'bold',
      color: '#FFA500',
      textAlign: 'center',
    },
    speaker: {
      fontSize: '1.05rem',
      fontWeight: '600',
      color: '#fff',
      flex: 1,
      textAlign: 'right',
      paddingRight: '20px',
    },
    dateButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      maxWidth: '720px',
      margin: '0 auto 25px',
      padding: '0 10px',
    },
    button: {
      padding: '12px 8px',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      background: '#FFA500',
      color: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease',
      fontSize: '0.95rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    buttonActive: {
      background: '#FF8C00',
      transform: 'scale(1.03)',
      boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Paris 1-WEEK CARNIVAL Agenda 2026</h2>

      <div style={styles.dateButtons}>
        {dates.map((date) => (
          <button
            key={date}
            style={{
              ...styles.button,
              ...(selectedDate === date ? styles.buttonActive : {}),
            }}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </button>
        ))}
      </div>

      <div style={styles.agendaWrapper}>
        <div style={styles.agendaContainer}>
          <div style={styles.headerRow}>
            <div style={styles.headerTime}>Time Slot</div>
            <div style={styles.headerSpeaker}>Event / Speaker</div>
          </div>

          {agenda.length > 0 ? (
            agenda.map((item, index) => (
              <div key={index} style={styles.slot}>
                <div style={styles.time}>{item.time}</div>
                <div style={styles.speaker}>{item.speaker}</div>
              </div>
            ))
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#FFA500' }}>
              No agenda scheduled for this day.
            </div>
          )}
        </div>

        <div
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '7rem',
            fontWeight: 'bold',
            color: '#fff',
            letterSpacing: '7px',
            whiteSpace: 'nowrap',
            padding: '10px 0',
            paddingLeft: '15px',
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 1,
          }}
        >
          REFRESHMENTS
        </div>
      </div>
    </div>
  );
};

export default Agenda;