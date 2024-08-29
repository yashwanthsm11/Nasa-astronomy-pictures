import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function DataPage() {
  const { date } = useParams(); // Get date from URL parameters
  const navigate = useNavigate(); // Initialize navigate function
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    const fetchAPIData = async () => {
      setLoading(true);
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}`;

      const localKey = `NASA-${date}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log('Fetched from cache for date', date);
        setLoading(false);
        return;
      }
      localStorage.clear();

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log('Fetched from API for date', date);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPIData();
  }, [date]);

  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigates back to the previous page
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '10px',
          backgroundColor: '#d7dbdd',
          color: '#17202a',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#17202a';
          e.target.style.color = '#d7dbdd'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#d7dbdd';
          e.target.style.color = '#17202a'
        }}
      >
        Back{/* Arrow symbol or you can use "Back" text */}
      </button>

      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      ) : (
        data && <Main data={data} />
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  );
}

export default DataPage;
