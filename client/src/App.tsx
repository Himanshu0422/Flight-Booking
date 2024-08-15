import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Flights from "./pages/Flights";
import Home from "./pages/Home";
import PassengerDetails from "./pages/PassengerDetails";
import Signup from "./pages/Signup";

const theme = createTheme({});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/search-flights" element={<Flights />} />
            <Route
              path="/passenger-details/:flightId"
              element={<PassengerDetails />}
            />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
