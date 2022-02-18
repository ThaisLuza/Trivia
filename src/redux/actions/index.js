export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const SCORE = 'SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const COUNT_HITS = 'COUNT_HITS';

export const playerLoginInputs = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const updateScore = (payload) => ({
  type: SCORE,
  payload,
});

export const updateToken = (payload) => ({
  type: TOKEN_REQUEST,
  payload,
});

export const nextQuestion = (payload) => ({
  type: NEXT_QUESTION,
  payload,
});

export const countHits = () => ({
  type: COUNT_HITS,
});
