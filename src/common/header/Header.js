
import "./Header.css"; // Import the CSS file
import logo from "../../assets/logo.svg"; // Import the logo image
import Button from "@material-ui/core/Button";

import LoginModal from "./LoginModal";
import React, { useState } from "react";
import axios from 'axios';

function Header() {

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleLogin = () => {
   

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  
  axios.post('Api to login', {
    username: username,
    password: password
  })
  .then((response) => {
   
    console.log(response.data);
  })
  .catch((error) => {
    
    console.log(error);
  });
  };

  const handleRegister = () => {
  

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const contactNumber = document.getElementById('contactNumber').value;


  axios.post('Api to register a user', {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    contactNumber: contactNumber
  })
  .then((response) => {
    
    console.log(response.data);
  })
  .catch((error) => {
    
    console.log(error);
  });
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="login-button">
      
      <Button variant="contained" color="default" onClick={handleModalOpen}>Login</Button>

      </div>
      <LoginModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    </header>
  );
}

export default Header;

// onClick={() => props.history.push()}