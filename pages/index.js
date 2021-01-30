import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';

import db from '../db.json';
import Card from '../src/components/Card';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from "../src/components/Link";

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Card
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -1000 },
          }}
          initial="hidden"
          animate="show"
        >
          <Card.Header>
            <h1>{db.title}</h1>
          </Card.Header>
          <Card.Content>
            <p>{db.description}</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button
                type="submit"
                disabled={name.length === 0}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {`Jogar ${name}`}
              </Button>
            </form>
          </Card.Content>
        </Card>
        <Card
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -1000 },
          }}
          initial="hidden"
          animate="show"
        >
          <Card.Content
            style={{
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            <h1>Quizes da Galera</h1>
            <br />
            {db.external.map((external) => {
              const [projectName, githubUser] = external
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

              if (projectName === undefined || githubUser === undefined) {
                return false;
              }

              return (
                <li
                  key={external}
                  style={{
                    listStyle: 'none'
                  }}
                >
                  <Card.Topic
                    as={Link}
                    href={`/quiz/${projectName}___${githubUser}`}
                    >
                    {`${githubUser}/${projectName}`}
                  </Card.Topic>
                </li>
              );
            })}
          </Card.Content>
        </Card>
        <Footer
          as={motion.section}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0},
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/danielmalka/aluraquiz-rpg" />
    </QuizBackground>
  );
}
