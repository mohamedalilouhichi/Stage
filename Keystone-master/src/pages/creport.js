import React, { useState } from 'react';
import './creport.css';

function CReport() {
  const sampleArticles = [
    {
      id: 1,
      title: 'Report Date: 12/05/2017',
      src: './assets/assets/images/pdfimage.jpg',
      description: 'the description of the report 1 a section of report will be shown here',
    },
    {
      id: 2,
      title: 'Report Date: 20/11/2018',
      src: './assets/assets/images/pdfimage.jpg',
      description: 'the description of report 2 a section of the report will be shown here',
    },
    {
      id: 3,
      title: 'Report Date: 15/06/2019',
      src: './assets/assets/images/pdfimage.jpg',
      description: 'the description of report 3 a section of the report will be shown here',
    },
  ];

  const [visibleArticles, setVisibleArticles] = useState(3);

  const handleShowMore = () => {
    setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 3);
  };

  const handleButtonClick = articleId => {
    const pdfPath = `/report${articleId}.pdf`;
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="creport-container">
      {sampleArticles.slice(0, visibleArticles).map(article => (
        <article className="article" key={article.id}>
          <div className="article-header">
            <div className="inner">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <h2>{article.title}</h2>
                <img src={article.src} alt="Article header" />
              </a>
            </div>
          </div>
          <div className="article-body">
            <h1 className="article-title">Report title</h1>
           
              <p>{article.description}</p>
            
            <button onClick={() => handleButtonClick(article.id)}>Go &rarr;</button>
          </div>
        </article>
      ))}
      
     
      <div className="show-more-button">
      <a href="/reports">
        <button className="learn-more" onClick={handleShowMore}>
          <span className="circle">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Show More</span>
        </button>
        </a>
      </div>
    </div>
  );
}

export default CReport;
