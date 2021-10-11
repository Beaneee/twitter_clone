import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService } from '../firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userobj, setUserobj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserobj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userobj={userobj}/> : "Initializing..."}
    </>
  );
}

export default App;
