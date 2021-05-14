import React, { useState, useEffect } from 'react'
import Route from './routes'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import "./App.css"

function App() {
  const theme = createMuiTheme({
    typography: {
      // Em chinês e japonês os caracteres são geralmente maiores,
      // então um tamanho de letra menor pode ser apropriado.
      fontSize: 12,
    },
    palette: {
      primary: {
        light: '#3d6bb3',
        main: '#1976d2',
        dark: '#093170',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ed4b82',
        main: '#e91e63',
        dark: '#a31545',
        contrastText: '#ffffff',
      },
      success: {
        light: '#81c784',
        main: '#4caf50',
        dark: '#388e3c',
        contrastText: '#ffffff',
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#ffffff',
      },
      warning: {
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00',
        contrastText: '#ffffff',
      }
    }
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Route />
      </ThemeProvider>
    </div>
  );
}

export default App;
