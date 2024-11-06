const fisherYatesShuffle = (array) => {
  // 가져온 api의 data 그 자체를 바꿔서 리턴할 수 없으므로 복제하기
  let duplicatedArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * (i + 1));

    [duplicatedArray[i], duplicatedArray[randomNum]] = [
      duplicatedArray[randomNum],
      duplicatedArray[i],
    ];
  }

  return duplicatedArray;
};

export default fisherYatesShuffle;
