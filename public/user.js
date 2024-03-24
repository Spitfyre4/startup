

function initializeUser() {
  console.log("making user");

  const usernames = document.querySelectorAll('.username');
  usernames.forEach(username => {
    console.log("setting username");
    username.textContent = getUsername().trim();
  });

  const password = document.querySelector('.password');
  if (password != null) {
    password.textContent = getPassword().trim();
  }
}

function getUsername() {
  return localStorage.getItem('username') ?? 'Mystery user';
}

function getPassword() {
  const password = localStorage.getItem('password');
  return password ? '*'.repeat(password.length) : 'N/A';
}

class User{
  constructor(username, password){
      this.username = username;
      this.password = password;
  }
}

window.onload = function() {
  initializeUser()
};

async function register() {
  console.log("in register");
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const user = new User(username, password);

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

    console.log("outside");
    if (responseData.added) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        console.log("inside");
        window.location.href = "user_workouts.html";
        
    } else {
        console.log("inside");
        window.location.href = "index.html";
        
        console.error('Failed to create user:', response.statusText);
    }
} catch (error) {
    console.error('Error creating user:', error);
}

}


async function login() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const user = { username, password };


  try {
    console.log("going in login try block");

    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
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
      window.location.href = "user_workouts.html";
    } else {
      console.log("User verification failed.");
      window.location.href = "index.html";
    }

  } catch (error) {
    console.error('Error logging in:', error);
  }
}


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
        window.location.href = "account.html";
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
        window.location.href = "account.html";
    } else {
        console.error('Failed to change password.');
    }
} catch (error) {
    console.error('Error changing password:', error);
}

}
