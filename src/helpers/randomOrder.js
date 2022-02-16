const randomOrder = (type, questions) => {
  const newQuestions = [];
  if (type === 'multiple') {
    for (let index = questions.length - 1; index >= 0; index -= 1) {
      const questionIndex = Math.floor(Math.random() * questions.length);
      newQuestions.push(questions[questionIndex]);
      questions.splice(questionIndex, 1);
    }
    return newQuestions;
  }
  // Source Splice: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  // Source Floor: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
  const randomIndex = Math.floor(Math.random() * questions.length);
  return [...new Set([...questions, questions[randomIndex]])];
};
  // Source Random: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Source Set: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set

export default randomOrder;
