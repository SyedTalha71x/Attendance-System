import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "54VbajbEcWTY2DzoS1Rb",
        region: "ap"
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>,
)
