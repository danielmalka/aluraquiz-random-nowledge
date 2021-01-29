/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../../db.json';
import Head from 'next/head';
import Card from '../../components/Card';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import ResultBox from '../../components/ResultBox';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import {AnimatePresence, motion} from "framer-motion";
import CloseButton from "../../components/CloseButton";
import GitHubCorner from "../../components/GitHubCorner";
import useNotify from "../../useNotify";

function LoadingCard() {
  return (
    <Card>
      <Card.Header>
        Carregando...
      </Card.Header>

      <Card.Content>
        <img
          src={` ${db.path}/img/loading.gif`}
          alt="Carregando"
          width="100%"
        />
      </Card.Content>
    </Card>
  );
}

function QuestionCard({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
    addResult,
  }) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Card>
      <Card.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Card.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Card.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Card.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Card.Topic>
            );
          })}
          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Confirmar
          </Button>
        </AlternativesForm>
      </Card.Content>
    </Card>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizScreen({ externalQuestions, externalBg }) {
  const notify = useNotify();
  const [notifications, setNotifications] = React.useState([]);
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

  function addResult(result) {
    const msgNotify = result ? "Você acertou!" : "Você errou!";
    const styleNotify = result ? "success" : "error";
    notify({ title: msgNotify, type: styleNotify })
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionCard
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingCard />}

        {screenState === screenStates.RESULT && <ResultBox results={results} />}
      </QuizContainer>
      <div className="container">
        <ul>
          <AnimatePresence initial={false}>
            {notifications.map(not => {
              const index = notifications.indexOf(not)
              console.log(notifications, index);
              return (
                <motion.li
                  key={`motion___${index}`}
                  positionTransition
                  initial={{ opacity: 0, y: 50, scale: 0.3}}
                  animate={{ opaity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 }}}
                >
                  <CloseButton
                    close={() => setNotifications(notifications.splice(index, 1))}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
      <GitHubCorner projectUrl="https://github.com/danielmalka/aluraquiz-rpg" />
    </QuizBackground>
  );
}
