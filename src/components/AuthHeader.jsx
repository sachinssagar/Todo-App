import { useState, useEffect } from 'react';

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';

const provider = new GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const AuthHeader = ({ user, loggedIn }) => {
  const [display, setDisplay] = useState(false);
  // const user = auth.currentUser;

  // const [loggedIn, setLoggedIn] = useState();
  // auth.onAuthStateChanged((user) => {
  //   // console.log(user);
  //   if (user) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // });

  // useEffect(() => {
  //   if (loggedIn !== undefined) {
  //     //do loggedIn stuff
  //   }
  // }, [loggedIn]);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleDropDown = () => {
    // code
    setDisplay(!display);
  };

  return (
    <div className="todo-header">
      <div className="right">
        {loggedIn ? (
          <div style={{ padding: '8px 12px', display: 'flex' }}>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="avatar"
              style={{
                margin: '0 6px',
              }}
            />

            <button
              style={{
                padding: '8px 12px',
                display: 'block',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              type="button"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="login"
            type="button"
            onClick={handleLogin}
            style={{
              padding: '8px 12px',
              display: 'block',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <svg
              style={{
                margin: '-4px 6px',
              }}
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                fill="#4285F4"
              ></path>
              <path
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                fill="#34A853"
              ></path>
              <path
                d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                fill="#EA4335"
              ></path>
            </svg>
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
