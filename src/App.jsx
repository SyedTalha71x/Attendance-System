import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Homepage from './Components/Homepage';
import Header from './Components/Header';
import { State } from './Context/State';
import Create from './Components/Create';
import Adminpanel from './Components/Adminpanel';
import Report from './Components/Report';
import UserList from '../src/Components/Userlist'
import Attendance from '../src/Components/Attendance'
import Dashboard from '../src/Components/Dashboard'



function App() {
  return (
    <>
      <State>
        <Router>
          <Routes>
          <Route path='/' element={<Dashboard />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/Create' element={<Create />} />
            <Route path='/Adminpanel' element={<Adminpanel />} />
            <Route path='/Report' element={<Report />} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/Attendance' element={<Attendance />} />
          </Routes >
        </Router>
      </State>
    </>
  )
}

export default App
