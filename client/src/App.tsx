import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Flights from './pages/Flights';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-flights" element={<Flights />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
