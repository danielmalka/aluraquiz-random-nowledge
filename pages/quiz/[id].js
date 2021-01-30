import React from 'react';
import db from '../../db.json';
import { useRouter } from 'next/router'
import QuizScreen from "../../src/screen/Quiz";
import {ThemeProvider} from "styled-components";
import useNotify from "../../src/useNotify";

export default function QuizDaGaleraPage({dbExterno}) {
  const router = useRouter();
  const notify = useNotify();
  if (dbExterno.theme === undefined || dbExterno.questions === undefined || dbExterno.bg === undefined) {
    dbExterno = {
      theme: db.theme,
      questions: db.questions,
      bg: db.bg
    };
    notify({ title: "Erro com esse Quiz. Tente outro...", type: "error" })
  }
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
  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServidor) => {
        if (respostaDoServidor.ok) {
          return respostaDoServidor.json();
        }
        return {};
      })
      .then((respostaConvertida) => respostaConvertida)
      .catch((err) => {
        return {};
      });

    return {
      props: {
        dbExterno
      }
    }
  } catch (err) {
    return {};
  }
}