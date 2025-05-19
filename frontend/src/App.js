import React from "react";
import AppRouter from "./routes/Router";
import { Container } from "@mui/material";
import StepperWrapper from "./components/StepperWrapper";

function App() {
  return (
    <Container>
      <StepperWrapper />
      <AppRouter />
    </Container>
  );
}

export default App;
