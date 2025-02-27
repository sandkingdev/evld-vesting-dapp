import React from 'react';
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core';
import { useLocation } from 'react-router-dom';
import routes, { routeNames } from 'routes';
import Scroll from '../Scroll/Scroll.js';
import Footer from './Footer';
import Navbar from './Navbar';
import './index.scss';



const Layout = ({ children }: { children: any }) => {
  const { pathname, search } = useLocation();

  
  
 
  


  return (
    
      
    <div className='background-1 epad-layout d-flex flex-column flex-fill wrapper' >
    <Navbar />

      <div className='ev-dapp'>

     <Scroll />
     
     
      <main className='d-flex flex-column flex-grow-1'>
      
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.unlock}${search}`}
        >
          {children}
        </AuthenticatedRoutesWrapper>
        
      </main>
      <Footer />
     
      
      
      </div>
    </div>
 
  );
};

export default Layout;
