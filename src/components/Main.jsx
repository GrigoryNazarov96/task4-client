import React from 'react';
import { useState } from 'react';
import Auth from './Auth';
import Home from './Home';
import NavBar from './NavBar';
// import _ from 'lodash';

const Main = () => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <NavBar setUser={setUser} user={user} />
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <Home user={user} setUser={setUser} />
      )}
    </div>
  );
};

export default Main;
