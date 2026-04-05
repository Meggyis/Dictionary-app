import logo from './assets/logo.png'; 
import './App.css'
import Dictionary from './Dictionary';

function App() {

  return (
   
    <div className="App">
      <div className='container'>
    <header className='App-header'>
      <img src={logo} className="App-logo img-fluid" alt="Logo" />
    <h1>Dictionary App</h1>
    </header>
    <main>
      <Dictionary />
    </main>
    <footer className='App-footer'><small>Coded by Katalin Simon for the SheCodes Bootcamp</small></footer>
    </div>
  </div>
  )
}

export default App;
