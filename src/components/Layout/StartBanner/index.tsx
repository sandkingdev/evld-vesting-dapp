import React from 'react';




const StartBanner = (props : any) => {

  
   
  return (
    <div className="start-banner">
    <div className="container">
    <div className="row">
    <div className="col-12">
    <h1 data-aos="zoom-out" data-aos-duration="1000" data-aos-delay="300">{props.pageName}</h1>
    </div>
    </div>
    </div>
    </div>
  );
};

export default StartBanner;
