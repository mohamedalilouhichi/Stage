import React from 'react';
import Menu from "./menu";
import './ReportsPage.css';

const reports = [
  {  title: 'Report 1', content: 'This is the content of Report 1.', pdf: 'report1.pdf' },
  {  title: 'Report 2', content: 'This is the content of Report 2.', pdf: 'report2.pdf' },
  {  title: 'Report 3', content: 'This is the content of Report 3.', pdf: 'report3.pdf' },
  {  title: 'Report 4', content: 'This is the content of Report 4.', pdf: 'report4.pdf' },
  {  title: 'Report 5', content: 'This is the content of Report 5.', pdf: 'report5.pdf' },
  {  title: 'Report 6', content: 'This is the content of Report 6.', pdf: 'report6.pdf' },
];

function ReportsPage() {
  return (
    <div>
      <Menu />
      <div className="reports-page-content">
        <h1 className="reports-heading">All Reports</h1>
        <table>
          <thead>
            <tr>
              
              <th>Title</th>
              <th>Content</th>
              <th>PDF</th> 
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                
                <td>{report.title}</td>
                <td>{report.content}</td>
                <td><a href={process.env.PUBLIC_URL + '/' + report.pdf} target="_blank" rel="noopener noreferrer">PDF Link</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsPage;
