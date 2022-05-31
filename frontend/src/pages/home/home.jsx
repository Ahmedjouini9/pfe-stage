import React from 'react';

import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from '../../containers';
import { CTA, Brand, Navbar } from '../../components';

import './home.css';

const Home = () => {
  return(
  <div className="App">
    <Navbar />
    <Header />
    <Brand />
    <WhatGPT3 />
    <Features />
    <Possibility />
    <CTA />
    <Blog />
    <Footer />
  </div>
  )
  };

export default Home;
