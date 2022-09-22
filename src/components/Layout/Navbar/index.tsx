import React from 'react';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import { ReactComponent as ElrondLogo } from './../../../assets/img/elrond.svg';
import './index.scss';
import './menu-button.png';
import evoloadLogoHeader from '../../../assets/img/evoload-logo-light.svg';

const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const[expanded, setExpanded] = React.useState(false);

  const isLoggedIn = Boolean(address);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light is-open">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" data-aos="fade-down" data-aos-duration="1300" data-aos-delay="300"><img src={evoloadLogoHeader} alt="Evoload Freight Exchange" /></Link>

        <div className='login-on-mobile'>
          {isLoggedIn ? (
            <NavItem className='button-type-1' onClick={handleLogout}>
              <span className="line one"></span>
              <span className="line two"></span>
              <span className="line three"></span>
              <span className="line four"></span>
              <span className="decoration one"></span>
              <span className="decoration two"></span>
              <span className="decoration three"></span>
              <span className="decoration four"></span>
              <span className="decoration five"></span>
              <span className="decoration six"></span>
              Logout
              <svg className="button-icon" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.1614 12.3695L14.4869 14.7073L21.7069 7.51684L14.5206 0.292664L12.1842 2.61952L15.3796 5.8317L0.502832 5.81671L0.499512 9.11481L15.4144 9.12983L12.1614 12.3695ZM14.519 1L14.519 0.999974L21 7.51518L21 7.51521L14.519 1ZM16.5834 6.33291L1.00233 6.31722V6.31724L16.5834 6.33293L16.5834 6.33291Z" fill="#AEDDFF" /></svg>
              <span className="shadow"></span>
            </NavItem>
          ) : (
            <Link to={routeNames.unlock} className='button-type-1'>
              <span className="line one"></span>
              <span className="line two"></span>
              <span className="line three"></span>
              <span className="line four"></span>
              <span className="decoration one"></span>
              <span className="decoration two"></span>
              <span className="decoration three"></span>
              <span className="decoration four"></span>
              <span className="decoration five"></span>
              <span className="decoration six"></span>
              Login
              <svg className="button-icon" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.1614 12.3695L14.4869 14.7073L21.7069 7.51684L14.5206 0.292664L12.1842 2.61952L15.3796 5.8317L0.502832 5.81671L0.499512 9.11481L15.4144 9.12983L12.1614 12.3695ZM14.519 1L14.519 0.999974L21 7.51518L21 7.51521L14.519 1ZM16.5834 6.33291L1.00233 6.31722V6.31724L16.5834 6.33293L16.5834 6.33291Z" fill="#AEDDFF" /></svg>
              <span className="shadow"></span>
            </Link>
          )}
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded={expanded} aria-label="Toggle navigation" onClick={() => setExpanded(true)}>
          <span className="navbar-toggle-wing-left"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggle-wing-right"></span>
        </button>
        <div className={expanded ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'} id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">

            <li className="navbar-wing-left" data-aos="zoom-in-left" data-aos-duration="1000" data-aos-delay="500"></li>

            <li className="nav-item" onClick={() => setExpanded(false)}>
              <Link to={routeNames.presale} aria-current='page' className='nav-link'>Buy EVLD</Link>
            </li>

            <li className="nav-item" onClick={() => setExpanded(false)}>
              <a href='https://evoload.co' aria-current='page' className='nav-link'>Back to website</a>
            </li>

            <li className="navbar-wing-right" data-aos="zoom-in-right" data-aos-duration="1000" data-aos-delay="500"></li>

            <li className="navbar-background" data-aos="fade-in" data-aos-duration="1300"></li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <NavItem className='button-type-1' onClick={handleLogout}>
                <span className="line one"></span>
                <span className="line two"></span>
                <span className="line three"></span>
                <span className="line four"></span>
                <span className="decoration one"></span>
                <span className="decoration two"></span>
                <span className="decoration three"></span>
                <span className="decoration four"></span>
                <span className="decoration five"></span>
                <span className="decoration six"></span>
                Logout
                <svg className="button-icon" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.1614 12.3695L14.4869 14.7073L21.7069 7.51684L14.5206 0.292664L12.1842 2.61952L15.3796 5.8317L0.502832 5.81671L0.499512 9.11481L15.4144 9.12983L12.1614 12.3695ZM14.519 1L14.519 0.999974L21 7.51518L21 7.51521L14.519 1ZM16.5834 6.33291L1.00233 6.31722V6.31724L16.5834 6.33293L16.5834 6.33291Z" fill="#AEDDFF" /></svg>
                <span className="shadow"></span>
              </NavItem>
            ) : (
              <Link to={routeNames.unlock} className='button-type-1'>
                <span className="line one"></span>
                <span className="line two"></span>
                <span className="line three"></span>
                <span className="line four"></span>
                <span className="decoration one"></span>
                <span className="decoration two"></span>
                <span className="decoration three"></span>
                <span className="decoration four"></span>
                <span className="decoration five"></span>
                <span className="decoration six"></span>
                CONNECT WALLET
                <svg className="button-icon" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.1614 12.3695L14.4869 14.7073L21.7069 7.51684L14.5206 0.292664L12.1842 2.61952L15.3796 5.8317L0.502832 5.81671L0.499512 9.11481L15.4144 9.12983L12.1614 12.3695ZM14.519 1L14.519 0.999974L21 7.51518L21 7.51521L14.519 1ZM16.5834 6.33291L1.00233 6.31722V6.31724L16.5834 6.33293L16.5834 6.33291Z" fill="#AEDDFF" /></svg>
                <span className="shadow"></span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





