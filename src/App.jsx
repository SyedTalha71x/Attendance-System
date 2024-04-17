import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Homepage from './Components/Homepage';
import Header from './Components/Header';
import { State } from './Context/State';
import Create from './Components/Create';



function App() {
  return (
    <>
      <State>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/Create' element={<Create />} />
          </Routes >
        </Router>
      </State>
    </>
  )
}

export default App
