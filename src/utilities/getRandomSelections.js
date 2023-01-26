import normalizeName from "./normalizeName";

export const getRandomSelections = (season) => {
  let activeQueens = [...season.queens];

  const getFourRandomQueens = () => {
    const randomFour = activeQueens.sort(() => 0.5 - Math.random()).slice(0, 4);
    if (activeQueens.length > season.queensInFinale) activeQueens.splice(3, 1);
    return randomFour;
  };

  const res = [...season.queens]
    .slice(season.queensInFinale - 1, season.queens.length)
    .reduce((acc, q, num) => {
      const chosen = getFourRandomQueens();
      if (num === season.queens.length - season.queensInFinale) {
        return {
          ...acc,
          ["finale"]: {
            winner: normalizeName(activeQueens[0].name),
            runnerUp1: normalizeName(activeQueens[1].name),
            runnerUp2: normalizeName(activeQueens[2].name),
            congeniality: normalizeName(activeQueens[3].name),
          },
        };
      } else {
        return {
          ...acc,
          [`top${season.queens.length - num}`]: {
            winner: normalizeName(chosen[0].name),
            top: normalizeName(chosen[1].name),
            bottom: normalizeName(chosen[2].name),
            eliminated: normalizeName(chosen[3].name),
          },
        };
      }
    }, {});
  return res;
};
