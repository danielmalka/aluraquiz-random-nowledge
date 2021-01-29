/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import QuizScreen from '../../src/screen/Quiz';

export default function QuizPage() {
  const internalQuetions = db.questions;
  const internalBg = db.bg;
  return (
    <QuizScreen
      externalQuestions={internalQuetions}
      externalBg={internalBg}
    />
  );
}
