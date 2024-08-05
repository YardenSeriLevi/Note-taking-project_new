import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Tabs, Tab } from 'react-bootstrap';

const AuthPage = () => {
  const [key, setKey] = useState('login');

  return (
    <div className="auth-container">
      <Tabs id="auth-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="login" title="Login">
          <Login />
        </Tab>
        <Tab eventKey="register" title="Register">
          <Register />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AuthPage;
