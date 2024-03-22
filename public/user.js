

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
  return localStorage.getItem('password') ?? 'N/A';
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
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  localStorage.setItem("username", username.value);
  localStorage.setItem("password", password.value);
  const user = new User(username, password);

  try {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    });

    if (response.ok) {
        window.location.href = "user_workouts.html";
    } else {
        console.error('Failed to create user:', response.statusText);
    }
} catch (error) {
    console.error('Error creating user:', error);
}

}

async function login() {
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  localStorage.setItem("username", username.value);
  localStorage.setItem("password", password.value);
  const user = new User(username, password);

  try {
    const response = await fetch('/api/user', {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    });

    if (response.ok) {
        window.location.href = "user_workouts.html";
    } else {
        console.error('Failed to verify user:', response.statusText);
    }
} catch (error) {
    console.error('Error logging in:', error);
}

}


function changeUsername() {
  const username = document.querySelector("#username");
  localStorage.setItem("username", username.value);
  window.location.href = "account.html";
}

function changePassword() {
  const password = document.querySelector("#password");
  localStorage.setItem("password", password.value);
  window.location.href = "account.html";
}
