import React from 'react';
import ReactDOM from 'react-dom';
import { AuthButton, VisualDAuthProvider } from '../../dist/esm/src';
import '../../dist/styles.css';
ReactDOM.render(
  <React.StrictMode>
    <VisualDAuthProvider
      publicKey={process.env.METAMASK_ACCOUNT_PUBLIC_KEY}
      privateKey={process.env.METAMASK_ACCOUNT_PRIVATE_KEY}
      mode='Development'
      useWindowWallet={false}
      onErrorHandler={(error) => console.log(error)}
      onSuccessHandler={(result) => console.log(result)}
    >
      <div id='auth-form'>
        <AuthButton />
        sdvsdv
      </div>
    </VisualDAuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
