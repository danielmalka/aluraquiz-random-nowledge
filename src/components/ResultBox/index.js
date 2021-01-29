// src/components/GitHubCorner/index.js
import React from 'react';
import Card from '../Card';

// eslint-disable-next-line react/prop-types
export default function ResultBox({ results }) {
  return (
    <Card>
      <Card.Header>
        Tela de Resultado:
      </Card.Header>

      <Card.Content>
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
