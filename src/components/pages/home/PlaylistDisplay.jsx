import React, { useEffect, useState } from 'react';
import Panel from '../../templates/Panel';
import { usePlaylist } from '../../../contexts/PlaylistContext'; 



const PlaylistDisplay = () => {
  const { selectedPlaylist } = usePlaylist(); 
  const [songs, setSongs] = useState([]);
  let id = 0; //added semicolon! thank me later.

  const updateSongId = ()=>{
    id = (id+1);
    return id

  }
  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      if (!selectedPlaylist) return; 

      const token = localStorage.getItem('spotify_access_token'); 
      const url = `https://api.spotify.com/v1/playlists/${selectedPlaylist.id}/tracks`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlist songs');
        }

        const data = await response.json();
        data.items.filter(item => item !== null);
        
        setSongs(data.items.map(item => item.track)); 
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchPlaylistSongs();
  }, [selectedPlaylist]); 

  if (!selectedPlaylist) {
    return <div>Please select a playlist to view its songs.</div>;
  }

  return (
    <div style={{width: "80%" }}>
      <h2>{selectedPlaylist.name} - Songs</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: "0px",  flexShrink: "10"}}>
        {songs.map((song) => (

          <Panel
            key={updateSongId()}
            backgroundColor="#faf0e6"
            borderRadius="10px"
            
            topMargin="5px"
            leftMargin="5px"
            rightMargin="10px"
            alignItems= "center"
            justifyContent= "center"
          >
            
              <div style={{
                  display:"flex", flexDirection: "column", backgroundColor: '', flex: "0.4",leftMargin:"0", alignItems: "center",
              }} >
                  <img
                  src={song.album.images[0]?.url}
                  alt={song.name}
                  style={{ width: '100%', height: '100%', borderRadius: '5px',justifyContent: "center" }}
                />
                </div>
                
                

              {/* Song and Artist Information */}
              <Panel flexWidth="0.9" topMargin="1%" bottomMargin="1%" leftMargin="10px" rightMargin="5px" justifyContent="left" alignItems="center" >
                <div style={{ fontSize:'80%', color: 'black', display: 'flex', flexDirection: 'column' }}>
                  <strong >{song.name}</strong>
                  <span>{song.artists[0].name}</span>
                </div>
              </Panel>
          </Panel>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDisplay;