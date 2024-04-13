import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './app.css';
import { Login } from './login/login';
import { Account } from './account/account';
import { Workout } from './workout/workout';
import { WorkoutList } from './workoutList/workoutList';
import { About } from './about/about';

export default function App() {

  return (
    <BrowserRouter>
      <div className="body bg-white text-dark">
        <header className="header bg-secondary text-light sticky-top">
          <h1>Smart Workouts</h1>
  
          <nav>
            <menu>
              <li className="menu nav-item"><NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
              <li className="menu nav-item"><NavLink className="nav-link" activeClassName="active" to="/workouts">Workouts</NavLink></li>
              <li className="menu nav-item"><NavLink className="nav-link" activeClassName="active" to="/catalog">Workout Catalog</NavLink></li>
              <li className="menu nav-item"><NavLink className="nav-link" activeClassName="active" to="/account">Account</NavLink></li>
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/workouts" element={<WorkoutList isUser={true} />} />
          <Route path="/catalog" element={<WorkoutList isUser={false} />} />
          <Route path="/about" element={<About />} />
          <Route path="/workout/:id/:isUser" element={<Workout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-secondary text-light">
          <NavLink to="/about" className="nav-link" activeClassName="active" style={{ display: "inline-block" }}>About</NavLink>
          <a href="https://github.com/Spitfyre4/startup" style={{ float: "right" }}>GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}