import React, { useEffect } from "react";
import { useAuthProvider } from "../../context/auth/VisualDAuthProvider";
import { AuthFormActionsTypes } from "../../context/typings.context";
import "tailwindcss/dist/tailwind.css";

type Props = {
  labelName: string;
  inputType: string;
  mnemonicWord?: string;
  index?: number;
};

export const InputField = ({
  labelName,
  inputType,
  mnemonicWord,
  index,
}: Props) => {
  const [isWordValid, setIsWordValid] = React.useState<boolean>(false);
  const [mnemonicWordInput, setMnemonicWordInput] = React.useState<string>("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMnemonicWordInput(e.target.value.trim());
  };

  const { authFormDispatch } = useAuthProvider();

  useEffect(() => {
    if (mnemonicWordInput === mnemonicWord) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_USER_MNEMONIC_INPUT,
        payload: { index: index, word: mnemonicWordInput },
      });
      setIsWordValid(true);
    } else {
      setIsWordValid(false);
    }
  }, [mnemonicWordInput]);

  return (
    <div className={`mb-6 w-full`}>
      <label
        htmlFor="default-input"
        className="block mb-1 text-lg font-bold text-blue text-left"
      >
        {labelName} <span className="text-red-500">*</span>
      </label>
      <input
        type={inputType}
        onChange={inputHandler}
        value={mnemonicWordInput}
        tabIndex={0}
        id="default-input"
        className={`bg-gray-50 font-bold text-gray-600 border bg-inherit border-gray-300 text-sm focus:outline-none focus:ring-bluelight rounded-lg block w-full p-2.5 ${
          isWordValid
            ? "shadow-md shadow-green-500 focus:shadow-green-500"
            : "shadow-md shadow-orange focus:shadow-orange"
        } focus:shadow-md 
          focus:shadow-bluelight
       }`}
      />
      <span
        className={`block my-1 mx-1 font-bold text-sm ${
          isWordValid ? "text-green-500" : "text-orange"
        } text-start`}
        aria-hidden
        tabIndex={-1}
      >
        {isWordValid ? "Looks good!" : "Please enter the correct word."}
      </span>
    </div>
  );
};
