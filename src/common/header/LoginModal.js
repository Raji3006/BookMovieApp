import React from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import { Tabs, Tab, FormControl, InputLabel, Input } from '@material-ui/core';

function LoginModal(props) {
  const { showModal, handleModalClose, activeTab, handleTabChange, handleLogin, handleRegister } = props;


  return (
    <Modal isOpen={showModal} onRequestClose={handleModalClose} contentLabel="Login/Register Modal"  style={{
        content: {
          width:'25%',
          height:'70%',  
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
      }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Login" value="login" />
        <Tab label="Register" value="register" />
      </Tabs>
      {activeTab === "login" && (
        <React.Fragment>
          <FormControl fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleLogin} style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
            Login
          </Button>
        </React.Fragment>
      )}
      {activeTab === "register" && (
        <React.Fragment>
          <FormControl fullWidth>
            <InputLabel htmlFor="firstName" >First Name</InputLabel>
            <Input id="firstName" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input id="lastName" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
            <Input id="contactNumber" />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRegister} style={{ display: "flex", justifyContent: "center", margin: "16px 0" }} >
            Register
          </Button>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default LoginModal;