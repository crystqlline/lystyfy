import React, { useEffect, useState } from 'react';

// Function to fetch playlists using the access token stored in localStorage
async function fetchUserPlaylists() {
  const accessToken = localStorage.getItem('spotify_access_token');
  if (!accessToken) {
    console.error('No access token found. Please log in.');
    return [];
  }

  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch playlists:', response.statusText);
    return [];
  }

  const data = await response.json();
  return data.items; // Array of playlists
}

const PlaylistGrid = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserPlaylists();
      console.log(data)
      setPlaylists(data.filter((playlist) => playlist !== null));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading playlists...</p>;
  }

  if (playlists.length == 0 || playlists===null) {
    return <p>No playlists found. Please ensure you are logged in to Spotify and have created playlists.</p>;
  }

  return (
    <div>
      <h1>Your Spotify Playlists</h1>
      <div style={styles.gridContainer}>
        {playlists.map((playlist) => (
          <div key={playlist.id} style={styles.gridItem}>
          {playlist.images && playlist.images.length > 0 ? (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              style={styles.image}
            />
          ) : (
            <div style={styles.placeholderImage}>No Image</div>
          )}
          <p style={styles.name}>{playlist.name}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles for the grid layout and playlist items
const styles = {
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  gridItem: {
    textAlign: 'center',
    width: '150px',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  placeholderImage: {
    width: '150px',
    height: '150px',
    backgroundColor: '#ccc',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    color: '#666',
  },
  name: {
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default PlaylistGrid;