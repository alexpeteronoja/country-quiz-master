import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from '../Question';
import Congratulation from './Congratulations';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      async function fetchQuestion() {
        const res = await axios.get(
          'https://restcountries.com/v3.1/all?limit=10'
        );
        const questionData = res.data
          .sort(() => Math.random - 0.5)
          .slice(0, 10)
          .map(country => {
            const questionType = Math.floor(Math.random() * 5);

            switch (questionType) {
              case 0: //return Capital
                return {
                  type: 'Capital',
                  question: `What is the Capital of ${country.name.common}`,
                  options: generateOption(
                    country.capital?.[0] || 'NA',
                    ['Tokyo', 'Paris', 'London', 'Berlin', 'Madrid', 'Rome'],
                    country.capital?.[0]
                  ),
                  correctAnswer: country.capital?.[0],
                };

              case 1: //return Population
                return {
                  type: 'Population',
                  question: `What is the Approximate Population of ${country.name.common}`,
                  options: generatePopulationOptions(country.population),
                  correctAnswer:
                    country.population?.toLocaleString() || 'Unknown',
                };

              case 2: //return Language
                const language = country.languages
                  ? Object.values(country.languages)
                  : ['Unknown'];
                return {
                  type: 'Language',
                  question: `Which of these languages is spoken in ${country.name.common}`,
                  options: generateOption(
                    language[0],
                    [
                      'English',
                      'Spanish',
                      'French',
                      'German',
                      'Mandarin',
                      'Arabic',
                    ],
                    language[0]
                  ),
                  correctAnswer: language,
                };

              case 3: // Currency question
                const currency = country.currencies
                  ? Object.values(country.currencies)[0].name
                  : 'Unknown';
                return {
                  type: 'currency',
                  question: `What is the currency of ${country.name.common}?`,
                  options: generateOption(
                    currency,
                    ['Euro', 'Dollar', 'Pound', 'Yen', 'Rupee', 'Peso'],
                    currency
                  ),
                  correctAnswer: currency,
                };

              default:
                return {
                  type: 'flag',
                  question: 'Which country does this flag belong to?',
                  options: generateOption(
                    country.name.common,
                    [
                      'Japan',
                      'France',
                      'Brazil',
                      'Canada',
                      'Australia',
                      'India',
                    ],
                    country.name.common
                  ),
                  correctAnswer: country.name.common,
                  flag: country.flags.png,
                };
            }
          });

        setQuestions(questionData);
        setLoading(false);
        setUserAnswers(new Array(questionData.length).fill(''));
      }

      fetchQuestion();
    } catch (err) {
      console.error(err);
    }
  }, []);
  // console.log(userAnswers);

  const generateOption = (correctAnswer, pool, exclude) => {
    const wrongOption = pool
      .filter(opt => opt !== exclude)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [correctAnswer, ...wrongOption];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const generatePopulationOptions = population => {
    if (!population) return ['Unknown', 'Not available', 'No data', 'N/A'];

    const popNum = Number(population);
    const option = [
      popNum.toLocaleString(),
      (popNum * 0.8).toLocaleString(),
      (popNum * 1.2).toLocaleString(),
      (popNum + 1000000).toLocaleString(),
    ];

    return option.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    const newAnswer = [...userAnswers];
    newAnswer[questionIndex] = answerIndex;
    setUserAnswers(newAnswer);
  };

  // const handleNextQuestion = () => {
  //   if (currentQuestion < questions.length - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   }
  // };

  // const handlePrevQuestion = () => {
  //   if (currentQuestion > 0) {
  //     setCurrentQuestion(currentQuestion - 1);
  //   }
  // };

  const handleNavBtn = value => {
    setCurrentQuestion(value - 1);
  };

  useEffect(() => {
    const allAnswered = userAnswers.every(
      answer => answer !== null && answer !== undefined && answer !== ''
    );

    if (allAnswered && questions.length > 0) {
      let correct = 0;

      questions.forEach((question, index) => {
        // For language questions (where correctAnswer is an array)
        if (question.type === 'Language') {
          if (question.correctAnswer.includes(userAnswers[index])) {
            correct++;
          }
        }
        // For all other question types
        else if (userAnswers[index] === question.correctAnswer) {
          correct++;
        }
      });

      setScore(correct);
      setShowResult(true);
    }
  }, [userAnswers, questions]); // Added questions to dependencies

  const handlePlayAgain = () => {
    setShowResult(false);
    setUserAnswers(new Array(questions.length).fill(''));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return <div>No question Available</div>;
  }

  const currentQ = questions[currentQuestion];

  if (showResult) {
    return (
      <>
        <Congratulation score={score} handlePlayAgain={handlePlayAgain} />
      </>
    );
  }

  return (
    <>
      <Question
        question={currentQ.question}
        options={currentQ.options}
        onAnswerSelect={answer => handleAnswer(currentQuestion, answer)}
        questionType={currentQ.type}
        flagUrl={currentQ.type === 'flag' ? currentQ.flag : null}
        questionLength={questions.length}
        currentQuestion={currentQuestion + 1}
        selectedAnswer={userAnswers[currentQuestion]}
        handleNavBtn={handleNavBtn}
        userAnswer={userAnswers}
        correctAnswer={currentQ.correctAnswer}
      />

      {/* <div>
        <button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNextQuestion} type="button">
            Next
          </button>
        ) : (
          <button onClick={handleFinishQuiz} type="button">
            Finish Quiz
          </button>
        )}
      </div> */}
    </>
  );
}

export default Quiz;
