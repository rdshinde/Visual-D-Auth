import React from 'react';
import { useAuthProvider } from '../../context/auth/VisualDAuthProvider';
import { AuthFormActionsTypes, Message } from '../../context/typings.context';
import { useUi } from '../../context/ui/UiProvider';
import { RouteNames } from '../../utility/getSteps';

export const UserNameField = () => {
  const {
    authFormDispatch,
    authFormState: { username },
  } = useAuthProvider();

  const [validationMessage, setValidationMessage] = React.useState<Message>({
    description: '',
    type: '',
  });

  const setUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if (inputValue.length > 10) {
      setValidationMessage({
        description: 'Username should be less than 10 characters',
        type: 'error',
      });
    } else if (inputValue.length < 3) {
      setValidationMessage({
        description: 'Username should be more than 3 characters',
        type: 'error',
      });
    } else if (inputValue.length === 0) {
      setValidationMessage({
        description: 'Username should not be empty',
        type: 'error',
      });
    } else {
      setValidationMessage({
        description: 'Looks Good!',
        type: 'success',
      });
    }
    authFormDispatch({
      type: AuthFormActionsTypes.SET_USERNAME,
      payload: inputValue,
    });
  };
  const {
    uiState: { chosenRoute },
  } = useUi();

  return (
    <>
      <section className='w-full'>
        <div className='text-start py-3 my-2'>
          <h2 className='text-2xl font-extrabold text-gray-500'>
            {chosenRoute === RouteNames.REGISTER ? 'Create' : 'Enter'} your Username.
          </h2>
          {chosenRoute === RouteNames.REGISTER ? (
            <span className='font-bold text-md text-bluelight'>
              Please choose a username which is <span className='text-orange font-semibold'>unique</span> to you.
            </span>
          ) : (
            <span className='font-bold text-md text-bluelight'>
              Input the already registered
              <span className='text-orange font-semibold'> VisualDAuth</span> username.
            </span>
          )}
        </div>
      </section>
      <section className={`mb-6 w-full `}>
        <label htmlFor='default-input' className='block mb-2 text-lg font-bold text-blue text-left'>
          Username <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          tabIndex={0}
          id='default-input'
          className={`bg-gray-50 font-bold border bg-inherit border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-bluelight rounded-lg block w-full p-2.5 focus:shadow-sm focus:shadow-bluelight `}
          placeholder='Enter your username.'
          value={username}
          onChange={setUsernameInput}
        />
        <span
          className={`block my-1 mx-1 font-bold text-sm text-${
            validationMessage.type === 'error' ? 'orange' : 'green-500'
          } text-start`}
          aria-hidden='true'
          tabIndex={-1}
        >
          {validationMessage.description}
        </span>
      </section>
    </>
  );
};
