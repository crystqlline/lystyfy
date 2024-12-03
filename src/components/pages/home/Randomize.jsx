function hashString(str){
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

function compare(sliderValue) {
    return (a, b) => {
        const modA = hashString(a.id) % (50+sliderValue);
        const modB = hashString(b.id) % (50+sliderValue);

        if (modA > modB) {
            return -1;
        } else {
            return 1;
        }
    };
}

const Randomize = (songs, sliderValue) => {
    var newSongs = [...songs];
    newSongs.sort(compare(sliderValue)); // Pass sliderValue to compare
    console.log(sliderValue);
    console.log(songs);
    console.log(newSongs);
    return newSongs;
};

export default Randomize;