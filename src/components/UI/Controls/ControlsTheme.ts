import { createTheme } from "@mui/material";


export const theme = createTheme({
  palette: {
    primary: {
      main: "#78ab3a",
    },
    secondary: {
      main: "#78ab3a",
    },
    warning: {
      main: "#ff9966",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "#ff9966",
        },
        tooltip: {
          backgroundColor: "#ff9966",
        },
      },
    },
  },
});
