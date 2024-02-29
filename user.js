class User {
  constructor(){
  console.log("making user"); //Edit this to be more like a user class
  const usernames = document.querySelectorAll('.username');
  usernames.forEach(username => {
    console.log("setting username");
    username.textContent = this.getUsername().trim();
  });
  const password = document.querySelector('.password');
  if (password != null) {
  password.textContent = this.getPassword().trim();
  }
  }

  getUsername(){
    return localStorage.getItem('username') ?? 'Mystery user';
  }
  
  getPassword(){
    return localStorage.getItem('password') ?? 'N/A';
  }
}

window.onload = function() {
  const user = new User();
};

function login() {
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  localStorage.setItem("username", username.value);
  localStorage.setItem("password", password.value);
  window.location.href = "user_workouts.html";
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
