import React from 'react'
import { useState, useEffect} from 'react'
import SearchBar from "./SearchBar"
import Panel from "../../templates/Panel"


  
{/*<div style={{ height: '100%', width: '100%' }}>*/}

import "./SearchMenu.css"
import PlaylistGrid from './PlaylistGrid'

const sampleData = async (query) => {

  const token = localStorage.getItem('spotify_access_token'); // Assuming you have the token stored in localStorage

  if (!token) {
    throw new Error('Spotify access token is missing');
  }

  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=10`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Error fetching playlists from Spotify');
    }

    const data = await response.json();
    const playlists = data.playlists.items; 

    return playlists;
  } catch (error) {
    console.error(error);
    return []; 
  }
};


function SearchMenu(){
    
    return (
        <>
            <div className="search-container">
              
              <SearchBar data={sampleData} />
              
              <Panel backgroundColor="#000000" borderRadius="20px" flexWidth={2} children={<PlaylistGrid></PlaylistGrid>}>
              </Panel>
              </div>
              
           
        </>
    )
}

export default SearchMenu 