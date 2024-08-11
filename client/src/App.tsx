import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Flights from "./pages/Flights";
import Home from "./pages/Home";
import PassengerDetails from "./pages/PassengerDetails";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Layout>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-flights" element={<Flights />} />
            <Route
              path="/passenger-details/:flightId"
              element={<PassengerDetails />}
            />
          </Routes>
        </Router>
      </Layout>
    </MantineProvider>
  );
};

export default App;
