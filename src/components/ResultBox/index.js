// src/components/GitHubCorner/useNotify.js
import React from 'react';
import { useRouter } from 'next/router'
import Card from '../Card';
import BackLinkArrow from "../BackLinkArrow";
import {motion} from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function ResultBox({ results }) {
  const router = useRouter()
  const name = router.query.name ?? ''
  const resultsCount = results.filter((x) => x).length

  return (
    <Card>
      <Card.Header>
        <BackLinkArrow href="/" />
        Tela de Resultado:
      </Card.Header>

      <Card.Content>
        <h3>{resultsCount > 0 ? `Parabéns ` : `Não foi desta vez `} {name}!</h3>
        <p>
          <motion.div
            animate={{
              scale: [1, 2, 1, 2, 1],
              x: [0, 130, 0, 140, 0],
              y: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8],
              loop: false,
              repeatDelay: 1
            }}
          >
            Você acertou
            {' '}
            {results.filter((x) => x).length}
            {' '}
            perguntas
          </motion.div>
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
}
