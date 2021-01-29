// src/components/GitHubCorner/index.js
import React from 'react';
import { useRouter } from 'next/router'
import Card from '../Card';
import BackLinkArrow from "../BackLinkArrow";

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
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
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
