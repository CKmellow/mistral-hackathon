import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyBGO2frmJT1YwTw3v8KkoMvAj-DjGBEqjw",
  authDomain: "pamojaapp-29b13.firebaseapp.com",
  databaseURL: "https://pamojaapp-29b13-default-rtdb.firebaseio.com",
  projectId: "pamojaapp-29b13",
  storageBucket: "pamojaapp-29b13.appspot.com",  // FIXED: had wrong domain
  messagingSenderId: "817147303650",
  appId: "1:817147303650:web:12c8a37a9bb421fef3f0bb",
  measurementId: "G-2XYSQ5LB5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const landingPageUrl = '/landingpage'; // Adjust this to your route

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
      if (user) {
        setMessage(`Already signed in as: ${user.email || user.uid}. Redirecting...`);
        setTimeout(() => {
          window.location.href = landingPageUrl;
        }, 1500);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEmailSignUp = async () => {
    setMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Signed up successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = landingPageUrl;
      }, 1500);
    } catch (error) {
      setMessage(`Sign-up failed: ${error.message}`);
    }
  };

  const handleEmailSignIn = async () => {
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Signed in successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = landingPageUrl;
      }, 1500);
    } catch (error) {
      setMessage(`Sign-in failed: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    setMessage('');
    try {
      await signOut(auth);
      setCurrentUser(null);
      setMessage('Signed out successfully.');
    } catch (error) {
      setMessage(`Sign-out failed: ${error.message}`);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-400 mx-auto"></div>
          <p className="text-lg">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md space-y-6 border border-white/20">
        <h2 className="text-2xl font-bold text-center">Welcome to PamojaApp</h2>

        {currentUser ? (
          <>
            <p className="text-center">
              Signed in as: <span className="font-semibold text-blue-400 break-all">{currentUser.email}</span>
            </p>
            <button
              onClick={handleSignOut}
              className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md font-semibold text-white"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-sm text-gray-300">Please sign in or sign up to continue.</p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleEmailSignIn}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
              >
                Sign In with Email
              </button>

              <button
                onClick={handleEmailSignUp}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md font-semibold"
              >
                Sign Up with Email
              </button>
            </div>
          </>
        )}

        {message && (
          <div className="mt-4 text-center text-sm text-yellow-300">{message}</div>
        )}
      </div>
    </div>
  );
}
