import React, {Fragment} from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import CrearCuenta from './pages/auth/crearcuenta';
import Home from './pages/Home';

function App() {

  return (
    <Fragment>
      <Router>
      <StyledEngineProvider injectFirst>
        <Navbar />
      </StyledEngineProvider>
      <div className=" mt-4">
        <Routes>
          <Route path="/Login" exact element={<Login/>}/>
          <Route path="/RegistroUser" exact element={<CrearCuenta/>}/>
          <Route path="/" exact element={<Home/>}/>
        </Routes>
        <br></br>
      </div>
      </Router>
    </Fragment>
  );
}

export default App;
