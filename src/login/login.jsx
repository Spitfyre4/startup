import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser() {
    const user = { username, password };

    try {
      console.log("going in login try block");

      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(user)
      });

      console.log("Received response from /api/verify:", response);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      console.log("outside try block");

      if (responseData.exists) {
        console.log("User verification successful.");
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // window.location.href = "user_workouts.html"; 
        navigate("/workouts");
      } else{
        console.log("User verification failed.");
        // window.location.href = "index.html";
        navigate("/");
      }

    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async function register() {
    console.log("in register");
    const user = { username, password };

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
      });

      console.log("Received response from /api/user:", response);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      console.log("outside try block");

      if (responseData.added) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        console.log("inside");

        navigate("/workouts");
      } else {
        console.log("inside");
        navigate("/");
        console.error('Failed to create user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }


  return (
    <main className="index-background">
      <h1 style={{ color: "whitesmoke", fontWeight: "bold", height: "500px" }}>Welcome</h1>
      <div className="translucent-box">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-primary" onClick={loginUser} style={{ marginRight: "5px" }}>Login</button>
          <button type="button" className="btn btn-primary" onClick={register}>Register</button>
        </div>
      </div>
    </main>
  )
}

