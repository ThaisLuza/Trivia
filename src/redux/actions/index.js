export const TOKEN = 'TOKEN';
export const QUESTIONS = 'QUESTIONS';
export const USER = 'USER';

export const createToken = (token) => ({
  type: TOKEN,
  token,
});

export const createUser = (name, email) => ({
  type: USER,
  name,
  email,
});

export const createQuestions = (asks) => ({
  type: QUESTIONS,
  asks,
});

export const triviaFetch = () => async (dispatch) => {
  const tokenGenerator = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenRequest = await tokenGenerator.json();
  dispatch(createToken(tokenRequest.token));
  localStorage.setItem('token', tokenRequest.token);
  const questionsGenerator = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenRequest.token}`);
  const questionsRequest = await questionsGenerator.json();
  dispatch(createQuestions(questionsRequest.results));
};
