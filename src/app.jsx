// import React from 'react';
// import { Login } from './login/login';
// import { Account } from './account/account';
// import { Workout } from './workout/workout';
// import { WorkoutList } from './workoutList/workoutList';
// import { About } from './about/about';

// export function App() {
//   return (
//     <div>
//       <h1>Smart Workouts</h1>
//       <Login />
//       <Account />
//       <Workout />
//       <WorkoutList />
//       <About />
//     </div>
//   );
// }


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-white text-dark">
      <header className="header bg-secondary text-light sticky-top">
        <h1>Smart Workouts</h1>
  
        <nav>
          <menu>
            <li className="menu nav-item"><a className="nav-link active" href="index.html">Home</a></li>
            <li className="menu nav-item"><a className="nav-link" href="user_workouts.html">Workouts</a></li>
            <li className="menu nav-item"><a className="nav-link" href="workout_catalog.html">Workout Catalog</a></li>
            <li className="menu nav-item"><a className="nav-link" href="account.html">Account</a></li>
          </menu>
        </nav>
  
        <hr />
      </header>


      <main>
        Main things
      </main>

      <footer className="footer bg-secondary text-light">
        <a href="about.html" style={{ display: "inline-block" }}>About</a>
        <a href="https://github.com/Spitfyre4/startup" style={{ float: "right" }}>GitHub</a>
      </footer>
    </div>
  );
    }