import React from "react";
import { UiActionsTypes } from "../../context/typings.context";
import { useUi } from "../../context/ui/UiProvider";
import "tailwindcss/dist/tailwind.css";

export type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

const authButtonStyles = {
  default:
    "m-3 mx-auto bg-inherit border border-gray-300 hover:border-none text-blue hover:text-white hover:bg-blue transition-all px-4 py-3 w-[content] rounded-md shadow-sm shadow-gray-300 flex flex-row justify-center items-center font-bold cursor-pointer duration-500 h-[content] z-0",
};

export const AuthButton = (props: Props) => {
  const { uiState, uiDispatch } = useUi();
  const { styles, className } = props;
  return (
    <>
      {uiState.isModalOpen ? (
        ""
      ) : (
        <button
          style={{ ...styles }}
          className={`${className} ${authButtonStyles.default} `}
          type="button"
          title="Authenticate using VisualDAuth."
          onClick={() => uiDispatch({ type: UiActionsTypes.OPEN_MODAL })}
        >
          {props.children ? props.children : `Authenticate using VisualDAuth.`}
        </button>
      )}
    </>
  );
};
