import React from 'react';
import { useAuthProvider } from '../../context/auth/VisualDAuthProvider';
import { InputField } from '../input-field/InputField';

export const MnemonicInput = () => {
  const { userMnemonicPhrase } = useAuthProvider();
  return (
    <>
      <section className='w-full'>
        <div className='text-start py-3 my-2'>
          <h2 className='text-2xl font-extrabold text-gray-500'>Enter your Mnemonic Phrase.</h2>
          <span className='font-bold text-md text-bluelight'>
            Please enter your mnemonic phrase in the <span className='text-orange font-bold'>correct</span> order.
          </span>
        </div>
      </section>
      <section className='w-full grid grid-cols-4 gap-3 items-center justify-evenly flex-wrap border border-gray-300 p-5 rounded-lg my-2'>
        {userMnemonicPhrase?.map((word, index) => {
          return (
            <InputField
              key={index}
              labelName={`Word ${index + 1}`}
              index={index}
              inputType={'text'}
              mnemonicWord={word}
            />
          );
        })}
      </section>
    </>
  );
};
