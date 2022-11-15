import React from 'react';
import Main from '../template/Main';

// import { Container } from './styles';

function Home() {
  return (
    <Main
      icon="home"
      title="Início"
      subtitle="Segundo Projeto do capítulo de React."
    >
      <div className="display-4">Bem Vindo!</div>
      <hr />
      <p className="mb-0">
        Sistema para exemplificar a construçao de um cadastro desenvolvido em
        React
      </p>
    </Main>
  );
}

export default Home;