const DEZ = 10;
const HARD = 3;
const MEDIUM = 2;
const EASY = 1;

const gamePoints = (timer, difficulty) => {
  if (difficulty === 'easy') {
    return DEZ + (timer * EASY);
  }
  if (difficulty === 'medium') {
    return DEZ + (timer * MEDIUM);
  }
  return DEZ + (timer * HARD);
};

export default gamePoints;
