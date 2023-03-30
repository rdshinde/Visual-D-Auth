import React, { useEffect, useState } from 'react';
import { UiActionsTypes } from '../../context/typings.context';
import { useUi } from '../../context/ui/UiProvider';
import { LoginIcon } from '../icons/user-icons/LoginIcon';
import { RegisterIcon } from '../icons/user-icons/RegisterIcon';

export const AuthOptions = () => {
  const { uiState, uiDispatch } = useUi();
  const [route, setRoute] = useState<string>('');

  const handleRoute = (route: string) => {
    setRoute(route);
  };

  useEffect(() => {
    if (route === 'register') {
      uiDispatch({ type: UiActionsTypes.SET_ROUTE, payload: 'register' });
    } else if (route === 'login') {
      uiDispatch({ type: UiActionsTypes.SET_ROUTE, payload: 'login' });
    } else if (route === 'recover') {
      uiDispatch({ type: UiActionsTypes.SET_ROUTE, payload: 'recover' });
    } else {
      uiDispatch({ type: UiActionsTypes.SET_ROUTE, payload: '' });
    }
  }, [route, uiDispatch]);

  return (
    <>
      <section className='w-full'>
        <div className='text-start py-3 my-2'>
          <h2 className='text-2xl font-extrabold text-gray-500'>Select your Route.</h2>
          <span className='font-bold text-md text-bluelight'>
            If you have already registered with
            <span className='text-orange font-bold'> VisualDAuth </span>
            please choose Login, otherwise choose register.
          </span>
        </div>
      </section>
      <section className='flex justify-around md:gap-10 lg:gap-20 items-center m-5 mt-10 mb-10'>
        <button
          className={`border border-gray-300 flex items-center justify-center flex-col text-blue p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-bluelight transition duration-300 ease-in-out gap-3 ${
            uiState.chosenRoute === 'register' ? 'bg-bluelight text-white' : ''
          }`}
          type='button'
          title='Register as a new user.'
          onClick={() => handleRoute('register')}
        >
          <span>
            <RegisterIcon />
          </span>
          <span className='font-bold text-lg'>Register as a new user.</span>
        </button>
        <button
          className={`border border-gray-300 flex items-center justify-center flex-col text-blue p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-bluelight transition duration-300 ease-in-out gap-3 ${
            uiState.chosenRoute === 'login' ? 'bg-bluelight text-white' : ''
          }}`}
          title='Login as an existing user.'
          type='button'
          onClick={() => handleRoute('login')}
        >
          <span>
            <LoginIcon />
          </span>
          <span className='font-bold text-lg'>Login as an existing user.</span>
        </button>
      </section>
      <section className='my-1 w-full text-center'>
        <p className='p-1'>
          To recover your account or password{' '}
          <button
            className='text-orange font-bold cursor-pointer hover:underline transition-all ease-in-out'
            onClick={() => handleRoute('recover')}
            type='button'
            title='Recover your account or password.'
          >
            click here.
          </button>
        </p>
      </section>
    </>
  );
};
