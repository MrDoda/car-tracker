import "./App.css";
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Router } from "./Router";
import { Alerts } from "./Components/Alerts";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#48c1ad",
      light: "#365e57",
    },
    secondary: {
      main: "#ff6d1b",
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      <Alerts />
    </ThemeProvider>
  );
}

export default App;
