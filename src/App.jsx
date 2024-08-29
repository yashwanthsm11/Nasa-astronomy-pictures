// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import DataPage from "./DataPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/data/:date" element={<DataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
