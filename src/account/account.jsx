import React, { useEffect, useState } from 'react';
import './account.css';

export function Account() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    initializeUser();
  }, []);

  function initializeUser() {
    const storedUsername = getUsername();
    const storedPassword = getPassword();
    setUsername(storedUsername);
    setPassword(storedPassword);
  }

  function getUsername() {
    return localStorage.getItem('username') ?? 'Mystery user';
  }

  function getPassword() {
    const storedPassword = localStorage.getItem('password');
    return storedPassword ? '*'.repeat(storedPassword.length) : 'N/A';
  }

  return (
    <main className="background">
      <div className="translucent-box"style={{ top: '40%' }}>
        <h1>Account Info</h1>
        <span>Username: </span>
        <span className="username">{username}</span>
        <br />
        <span>Password: </span>
        <span className="password">{password}</span>
      </div>

      <div className="translucent-box" style={{ top: '70%'}}>
        <h2>Change Info</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" />
          <button type="button" className="btn btn-secondary" onClick={changeUsername}>Change</button>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
          <button type="button" className="btn btn-secondary" onClick={changePassword}>Change</button>
        </div>
      </div>
    </main>
  );



function changeUsername() {
}

function changePassword() {
}

}