import React, { useEffect, useState } from 'react';
import Panel from '../../templates/Panel';
import { usePlaylist } from '../../../contexts/PlaylistContext';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Randomize from './Randomize.jsx';




const Settings = () => {
  const { selectedPlaylist } = usePlaylist();
  const [songs, setSongs] = useState([]);
  const [sliderValue, setSliderValue] = useState(30);
  let id = 0
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const updateSongId = () => {
    id = (id + 1);
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
    <>
      <div>
        <div style={{ display: "flex", flexDirection: "column", flexBasis: "10px" }}>
          <Panel backgroundColor=''>
            <h1>Setting</h1>

          </Panel>


          <Slider aria-label="Volume" defaultValue={"50"} value={sliderValue} onChange={handleChange} />
          <Panel backgroundColor=''>
            <div>Test</div>
          </Panel>
          <Button onClick={() => {Randomize(songs)}}>
            Sort
          </Button>

        </div>
      </div>



    </>
  );
};



export default Settings;