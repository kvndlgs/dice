import React from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import DiceGame from './components/DiceGame';

function App() {
  return (
    <>
      <Layout>
        <DiceGame />
      </Layout>
      <Toaster position="top-right" />
    </>
  );
}

export default App;