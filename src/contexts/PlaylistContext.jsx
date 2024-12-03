import React, { createContext, useState, useContext } from 'react';

const PlaylistContext = createContext();

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  
  return (
    <PlaylistContext.Provider value={{ selectedPlaylist, setSelectedPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
