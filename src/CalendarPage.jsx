import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    const date = selectedDate.toISOString().split('T')[0];
    navigate(`/data/${date}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'auto',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '100vh', // Full viewport height
        background: 'linear-gradient(135deg, #d5d8ff, #e1ccec)',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1 // Ensure the inner div is above the gradient background
        }}
      >
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '16px', 
          color: '#333',
          lineHeight: '1.2'
        }}>Select a Date</h1>
        <div style={{ marginBottom: '16px', width: '100%' }}>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="react-calendar"
          />
        </div>
        <button 
          onClick={handleSubmit} 
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#af7ac5',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            marginTop: '16px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#BBEEC0';
            e.target.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#af7ac5';
            e.target.style.color = '#ffffff';
          }}
        >
          Submit
        </button>
       </div>
     </div>
  );
}

export default CalendarPage;
