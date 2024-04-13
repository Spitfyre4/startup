import React, { useEffect, useState } from 'react';
import './account.css';
import { useNavigate } from 'react-router-dom';

export function Account() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  async function changeUsername() {
    const oldUsername = localStorage.getItem("username");
    const newUsername = document.querySelector("#username").value;

    try {
      const response = await fetch('/api/change-username', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ oldUsername, newUsername })
      });

      const responseData = await response.json();

      if (responseData.changed) {
        localStorage.setItem("username", newUsername);
        navigate("/workouts");
      } else {
        console.error('Failed to change username.');
      }
    } catch (error) {
      console.error('Error changing username:', error);
    }
    
  }

  async function changePassword() {
    const username = localStorage.getItem("username");
    const password = document.querySelector("#password").value;

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ username, password })
      });

      const responseData = await response.json();

      if (responseData.changed) {
        localStorage.setItem("password", password);
        navigate("/workouts");
      } else {
        console.error('Failed to change password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  }

}