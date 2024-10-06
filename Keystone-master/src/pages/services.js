import React from 'react';
import './services.scss';

function Services() {
  return (
    <section className="c-section">
  <div className="c-services">
    <div className="c-services__item">
      <div className="c-services__item-content">
        <h3>Responsive Web Design</h3>
        <p>
          We leverage the concept of mobile-first design. Through our work, we focus on designing an experience that works across different screen sizes.
        </p>
      </div>
    </div>
    <div className="c-services__item">
      <div className="c-services__item-content">
        <h3>UX Auditing</h3>
        <p>
          If you are unsure of how your app behaves, we can help by doing a detailed UX audit that will highlight most of the issues in your product. From there, we can take it further and fix all issues.
        </p>
      </div>
    </div>
    <div className="c-services__item">
      <div className="c-services__item-content">
        <h3>Front End Development</h3>
        <p>
          We are Front End masters with a deep focus on HTML, CSS. The result of our work is a responsive, accessible, and performant websites. Either you have the design ready and want us to code it, or you want us to do both design and code, we're happy to do so.
        </p>
      </div>
    </div>
  </div>
</section>
  );
}

export default Services;