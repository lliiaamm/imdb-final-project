import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import About from './components/about/About'
import Home from './components/home/Home'
import Favotites from './components/favorites/Favotites'
import { Route, Routes } from 'react-router-dom'
import './App.css';

function App() {


  return (
    <div className="App">
      <h2>MY IMDB</h2>
      <Routes>
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/favorites" element={<Favotites/>} />
      </Routes>
    </div>
  );
}

export default App;
