import React, { useEffect } from 'react';
import Profile from './Component/profile/Profile';
import LoginPage from './Component/login/LoginPage';
import './App.css';
import { useStateValue } from './state/state';
import { Game, Login, Post, ProfileModel, Comment } from './types';
import { getUsers } from './services/userService';
import { getProfiles } from './services/profileService';
import {
  Route, Link, Routes
} from "react-router-dom"
import HomePage from './Component/home/HomePage';
import CustomRouter from './Component/router/CustomRouter';
import ProfilePage from './Component/profile/ProfilePage';
import GameInfo from './Component/game/GameInfo';
import { getAll } from './services/gameService';
import { getPosts } from './services/postService';
import { getComments } from './services/commentService';
import AboutPage from './Component/home/AboutPage';
import EditProfileForm from './Component/profile/EditProfileForm';
import { Navbar, Nav } from 'react-bootstrap'

const App: React.FC = () => {
  const [{ email, profile }, dispatch] = useStateValue();

  useEffect(() => {
    getProfiles().then(data => {

      const profiles: ProfileModel[] = data as ProfileModel[];
      dispatch({ type: "GET_PROFILES", payload: profiles });
    });
    getUsers().then(user => {
      const users: Login[] = user as Login[];

      dispatch({ type: "GET_USERS", payload: users });
    });

    getAll().then(game => {
      const games: Game[] = game as Game[];
      if (games.length > 0) {
        dispatch({ type: "GET_GAME_LIST", payload: games });
      }
    });

    getPosts().then(post => {
      const posts: Post[] = post as Post[];
      if (posts.length > 0) {
        posts.sort((a, b) => Number(b.id) - Number(a.id));
        dispatch({ type: "GET_POSTS", payload: posts });
      }

    });

    getComments().then(comment => {
      const comments = comment as Comment[];
      if (comments.length > 0) {
        dispatch({ type: "GET_COMMENTS", payload: comments });
      }

    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON && loggedUserJSON !== undefined) {
      const user: string = JSON.parse(loggedUserJSON);
      dispatch({ type: "LOGIN", payload: user });
    }

  }, [dispatch]);

  if (email === "") {
    return (
      <LoginPage />
    )
  } else {
    const thisuser = Object.values(profile).find(prof => prof.email === email) as ProfileModel;

    window.localStorage.setItem(
      'loggedUser', JSON.stringify(email)
    )

    const handleLogout = () => {
      window.localStorage.clear();
      dispatch({ type: "LOGOUT", payload: "" })
    }

    return (
      <div className='divide-y divide-slate-100'>
        <CustomRouter>
          <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link to="/"><button className="px-5 hover:bg-gray-300 h-full hover:text-gray-900">Feed</button></Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to="/About"><button className="px-5 hover:bg-gray-300 hover:text-gray-900">About</button></Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link  to="/profile"><button className="h-full px-5 hover:bg-gray-300 hover:text-gray-900">Profile</button></Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                  <Link to="/login"><button onClick={handleLogout} className="h-full px-5 hover:bg-red-400 bg-red-600 text-white">Logout</button></Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/game/:id' element={<GameInfo />} />
            <Route path='/About' element={<AboutPage />} />
            <Route path='/profile/edit' element={<EditProfileForm currentUser={thisuser} />} />
          </Routes>
        </CustomRouter>
      </div>
    );
  }
}

export default App;