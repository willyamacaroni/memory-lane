import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <div className='mx-auto max-w-7xl sm:p-6 lg:p-8' >
          <div className='h-max rounded-lg bg-white shadow h-96'>
            <div className='px-4 py-5 sm:p-6'>
              <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4'>
                <Routes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;

