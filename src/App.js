import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Header from "./layout/Header";
import Results from "./pages/Result";
import Main from "./layout/header/Main";

function App() {
  return (
    <div className="App">
      <Header/>
      <Main>
        <Results/>
      </Main>
    </div>
  );
}

export default App;
