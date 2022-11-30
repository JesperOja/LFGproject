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
    /*
      getAll().then(game => {
          const games: Game[] = game as Game[];
      
          dispatch({ type: "GET_GAME_LIST", payload: games });
      });
    */
    getPosts().then(post => {
      const posts: Post[] = post as Post[];
      posts.sort((a, b) => Number(b.id) - Number(a.id));
      dispatch({ type: "GET_POSTS", payload: posts });
    });

    getComments().then(comment => {
      const comments = comment as Comment[];

      dispatch({ type: "GET_COMMENTS", payload: comments });
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON && loggedUserJSON !== undefined) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "LOGIN", payload: user });
    }

  }, [dispatch]);

  if (email === "") {
    return (
      <LoginPage />
    )
  } else {
    const thisuser = Object.values(profile).filter(prof => prof.email === email);
    
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(email)
    )

    const handleLogout = () => {
      window.localStorage.clear();
      dispatch({ type: "LOGOUT", payload: "" })
    }

    return (
      <CustomRouter>
        <header>
          <nav className="h-[65px] border-b shadow-lg flex relative font-semibold text-gray-600">

            <div className="absolute w-full h-full">
              <div className="flex h-full mx-auto w-fit justify-around">
                <Link to="/"><button className="px-5 hover:bg-gray-300 h-full hover:text-gray-900">Feed</button></Link>
                <Link to="/About "><button  className="px-5 hover:bg-gray-300 hover:text-gray-900">About</button></Link>
              </div>
            </div>

            <div className="ml-auto flex z-10">
              <Link to="/profile"><button className="h-full px-5 hover:bg-gray-300 hover:text-gray-900">Profile</button></Link>
              <Link to="/login"><button onClick={handleLogout} className="h-full px-5 hover:bg-red-400 bg-red-600 text-white">Logout</button></Link>
            </div>

          </nav>
        </header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/game/:id' element={<GameInfo />} />
          <Route path='/About' element={<AboutPage />} />
          <Route path='/profile/edit' element={<EditProfileForm currentUser={thisuser[0]} />} />
        </Routes>
      </CustomRouter>
    );
  }
}

export default App;