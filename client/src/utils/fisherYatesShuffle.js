const fisherYatesShuffle = (array) => {
  for (const i = array.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomNum]] = [array[randomNum], array[i]];
  }

  return array;
};

export default fisherYatesShuffle;
