import React from 'react';
import { useAuthProvider } from '../../context/auth/VisualDAuthProvider';

export const MnemonicPhraseContainer = () => {
  const copyToClipBoardHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const phrase = e.currentTarget.parentElement?.querySelector('span');
    if (phrase) {
      navigator.clipboard.writeText(phrase.textContent || '');
      e.currentTarget.style.fontSize = '0.9rem';
      e.currentTarget.innerHTML = `Copied!`;
    }
  };
  const { authFormState } = useAuthProvider();
  return (
    <>
      <section className='w-full'>
        <div className='text-start py-3 my-2'>
          <h2 className='text-2xl font-extrabold text-gray-500'>Here is your Mnemonic Phrase!</h2>
          <span className='font-bold text-md text-bluelight'>
            Please copy this phrase and store it in a safe place. You will need it to{' '}
            <span className='text-orange font-bold'> recover </span>
            your account if you lose your password.
          </span>
        </div>
      </section>
      <section className={`mb-6 w-full text-center flex items-center justify-center`}>
        <div
          className={`max-w-[400px] text-lg font-semibold border border-gray-300 rounded-lg md:p-5 md:pt-7 sm:p-2 m-2 w-full relative shadow-md shadow-gray-200 text-center`}
        >
          <span className='font-bold text-gray-700'>{authFormState?.mnemonicPhrase}</span>
          <button
            className='bg-gray-50 font-bold text-blue bg-inherit  flex items-center absolute top-1 right-2 ease-in-out duration-500 hover:text-bluelighter transition-all'
            tabIndex={1}
            title='Copy Phrase'
            onClick={copyToClipBoardHandler}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5 hover:text-bluelighter transition-all focus:outline-none'
            >
              <path
                fillRule='evenodd'
                d='M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0114.75 19h-9.5A2.25 2.25 0 013 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 019 1h2c1.373 0 2.531.923 2.887 2.182zM7.5 4A1.5 1.5 0 019 2.5h2A1.5 1.5 0 0112.5 4v.5h-5V4z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};
