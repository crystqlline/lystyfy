import React from 'react'
import { useState, useEffect} from 'react'

import Panel from "../../templates/Panel"
{/*<div style={{ height: '100%', width: '100%' }}>*/}

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'ce817eb205084d69ace124baa8a5fa0c'; 
const REDIRECT_URI = 'http://localhost:5173/callback'; 
const SCOPES = 'user-library-read user-read-private playlist-read-private playlist-modify-public playlist-modify-private '; 

function LoginPage() {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const url = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    setAuthUrl(url);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center", backgroundColor: "#242424", color: "white" }}>
      <h1>Lystyfy</h1>
      <a href={authUrl}>
      <button className="button-1">
        Connect with Spotify.
      </button>
      </a>
      
    </div>
  );
}

export default LoginPage;