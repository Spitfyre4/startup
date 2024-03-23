

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
    console.log("outside");
    if (response.ok) {
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

// async function login() {
//   const username = document.querySelector("#username").value;
//   const password = document.querySelector("#password").value;
//   const user = new User(username, password);

//   try {
//     console.log("going in login try block");
//     const response = await fetch('/api/verify', {
//       method: 'POST',
//       headers: {'content-type': 'application/json'},
//       body: JSON.stringify(user)
//     });
//     const responseData = await response.json();

//     console.log("Received response from /api/verify:", response);
//     console.log("outside try block");

//     if (responseDa.ok) {
//       console.log("inside respone");
//         localStorage.setItem("username", username);
//         localStorage.setItem("password", password);
//         window.location.href = "user_workouts.html";
//     } else if (response.status === 401) {
//         window.location.href = "index.html";
//         console.error('Failed to verify user:', response.statusText);
//     } else {
//         console.error('Unexpected error:', response.statusText);
//     }
// } catch (error) {
//     console.error('Error logging in:', error);
// }

// }

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
