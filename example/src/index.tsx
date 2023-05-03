import React from 'react';
import ReactDOM from 'react-dom';
import { AuthButton, VisualDAuthProvider } from 'react-visual-d-auth';

ReactDOM.render(
  <React.StrictMode>
    <VisualDAuthProvider
      publicKey={`0xE112f74b09564c6BD94d1f4e1b71254f881AD641`}
      privateKey={`2c8f002d2cea49b1d02bb2e2cd3c9113f534809a0dc2a1820e33b15b2788eab7`}
      mode={'Development'}
      useWindowWallet={true}
      onErrorHandler={(result) => {
        console.log(result);
      }}
      onSuccessHandler={(result) => {
        console.log(result);
      }}
    >
      <div id='auth-form'>
        <AuthButton />
      </div>
    </VisualDAuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
