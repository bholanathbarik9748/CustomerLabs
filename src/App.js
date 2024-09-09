import React, { useState } from 'react';
import SegmentPopup from './Components/SegmentPopup';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="App">
      <button className="save-button" onClick={handleSaveClick}>
        Save Segment
      </button>
      {showPopup && <SegmentPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;
