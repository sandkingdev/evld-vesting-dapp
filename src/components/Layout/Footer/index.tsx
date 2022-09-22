import React from 'react';


import evoloadLogoFooter from '../../../assets/img/evoload-logo-light.svg';
import footerLeftDeco from '../../../assets/img/footer-left-deco.svg';
import footerRightDeco from '../../../assets/img/footer-right-deco.svg';

const Footer = () => {
  return (

<footer>
<img src={footerLeftDeco} alt="Evoload" className="footer-left-deco"/>
<div className="container">
<div className="row">
<div className="col-6 col-lg-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
<div className="footer-box">
<h5 className="footer-box-title">Product</h5>
<ul className="footer-box-anchors">
<li><a href="https://evoload.co/">Home</a></li>
<li><a href="https://evoload.co/tokenomics.html">Tokenomics</a></li>
<li><a href="https://evoload.co/roadmap.html">Roadmap</a></li>
<li><a href="https://evoload.co/team.html">Team</a></li>
</ul>
</div>
</div>
<div className="col-6 col-lg-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
<div className="footer-box">
<h5 className="footer-box-title">Community</h5>
<ul className="footer-box-anchors">

<li><a href="https://cutt.ly/0HFnxTo" target="_blank" rel="noopener noreferrer">Twitter</a></li>

<li><a href="https://t.me/evoloadofficial" target="_blank" rel="noopener noreferrer">Telegram</a></li>

<li className="d-none"><a href="https://discord.com/invite/j9YMmkyQ2S" target="_blank" rel="noopener noreferrer">Discord</a></li>

<li><a href="https://www.youtube.com/channel/UCaGw0SwH9TE6Pe6KFJt7Wpg" target="_blank" rel="noopener noreferrer">Youtube</a></li>

</ul>
</div>
</div>
<div className="col-6 col-lg-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
<div className="footer-box">
<h5 className="footer-box-title">Resources</h5>
<ul className="footer-box-anchors">
<li><a href="https://litepaper.evoload.co/" target="_blank" rel="noopener noreferrer">Litepaper</a></li>
<li><a href="https://evoload.co/assets/docs/Evoload-Pitch-Deck.pdf" target='_blank' rel="noreferrer">Pitch Deck</a></li>
</ul>
</div>
</div>
<div className="col-6 col-lg-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="400">
<div className="footer-box">
<h5 className="footer-box-title">Legal</h5>
<ul className="footer-box-anchors">
<li><a href="https://evoload.co/terms-and-conditions.html">Terms and Conditions</a></li>
<li><a href="https://evoload.co/privacy-policy.html">Privacy Policy</a></li>
</ul>
</div>
</div>
</div>
<div className="row footer-copyright">
<div className="col-lg-6 fc-left">
<a href="https://evoload.co/"><img src={evoloadLogoFooter} alt="Evoload"/></a>
</div>
<div className="col-lg-6 fc-right">
<p>2022 Evoload © All rights reserved. </p>
</div>
</div>
</div>
<img src={footerRightDeco}  alt="Evoload" className="footer-right-deco"/>
</footer>
  );
};

export default Footer;
