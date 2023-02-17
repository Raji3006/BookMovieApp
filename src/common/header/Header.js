import React from "react";
import "./Header.css"; // Import the CSS file
import logo from "../../assets/logo.svg"; // Import the logo image
import Button from "@material-ui/core/Button";
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="login-button">
      <Button variant="contained" color="default">Login</Button>
      </div>
    </header>
  );
}

export default Header;