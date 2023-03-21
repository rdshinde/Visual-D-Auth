import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthButton, VisualDAuthProvider } from 'react-visual-d-auth'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <VisualDAuthProvider
    publicKey={process.env.METAMASK_ACCOUNT_PUBLIC_KEY}
    privateKey={process.env.METAMASK_ACCOUNT_PRIVATE_KEY}
    mode='Development'
    useWindowWallet={false}
    onErrorHandler={(error) => console.log(error)}
    onSuccessHandler={(result) => console.log(result)}
    // children={''}
  >
    <div id='auth-form'>
      <AuthButton />
    </div>
  </VisualDAuthProvider>,
)
