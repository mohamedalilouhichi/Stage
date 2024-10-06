import React, { useState, useEffect } from 'react';
import './home.css';

function Home() {
  const [showInitialPhrases, setShowInitialPhrases] = useState(true);
  const [showNewPhrase, setShowNewPhrase] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPhrases(false);
      setShowNewPhrase(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToReports = () => {
    const offset = 415;
    const reportSection = document.getElementById('report-section');
    if (reportSection) {
      const topPos = reportSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: topPos + offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {showInitialPhrases && (
        <div className="phrases">
          <div className="phrase-line phrase1">MOHAMED ALI LOUHICHI</div>
          <div className="phrase-line phrase2">OFFRE N°180NCYQ
          </div>
        </div>
      )}
      {showNewPhrase && (
        <div className="new-phrase">
          <div className="new-phrase-text">Time to see your reports.</div>
          <button className="my-reports-button" onClick={scrollToReports}>
            My Reports
          </button>
        </div>
      )}
      <div>
        <div id="report-section" className="report-section">
          
        </div>
      </div>
    </div>
  );
}

export default Home;
