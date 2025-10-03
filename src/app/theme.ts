"use client"
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-inter)",
  },
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#5BB3EA",
      contrastText: "#F8FAFF",
    },
    secondary: {
      main: "#464646",
      contrastText: "#F8FAFF",
    },
    error: {
      main: "#F44336",
      contrastText: "#F8FAFF",
    },
    warning: {
      main: "#FF9800",
      contrastText: "#000000",
    },
    info: {
      main: "#00BCD4",
      contrastText: "#000000",
    },
    success: {
      main: "#4CAF50",
      contrastText: "#000000",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#F8FAFF",
      secondary: "#000000",
      disabled: "#BDBDBD",
    },
    common: {
      black: "#000000",
      white: "#F8FAFF",
    },
  },
})

export default theme
