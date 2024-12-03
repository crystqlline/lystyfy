function compare( a, b ) {
    if ( a.id > b.id ){
      return -1;
    }
    else {
      return 1;
    }
}

const Randomize = (songs) => {
    var newSongs = [...songs];
    newSongs.sort(compare);
    return newSongs;
};

export default Randomize;