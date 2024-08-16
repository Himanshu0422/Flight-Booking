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
import VerifyOTP from "./pages/VerifyOtp";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import ProtectedRoute from "./components/common/ProtectedRoute";
import OpenRoute from "./components/common/OpenRoute";

const theme = createTheme({});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <OpenRoute>
                <VerifyOTP />
              </OpenRoute>
            }
          />
          <Route
            path="/auth/google/callback"
            element={
              <OpenRoute>
                <GoogleAuthCallback />
              </OpenRoute>
            }
          />
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
              element={
                <ProtectedRoute>
                  <PassengerDetails />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
