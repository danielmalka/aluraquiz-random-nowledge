import React from 'react';
import QuizScreen from "../../src/screen/Quiz";
import {ThemeProvider} from "styled-components";

export default function QuizDaGaleraPage({dbExterno}) {
  console.log(dbExterno);
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        return respostaDoServidor.json();
      }
      throw new Error('Falha na requisição...');
    })
    .then((respostaConvertida) => respostaConvertida)
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      dbExterno
    }
  }
}