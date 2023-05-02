import React from 'react';
import { createPortal } from 'react-dom';

import { UiActionsTypes } from '../../context/typings.context';
import { useUi } from '../../context/ui/UiProvider';
import { StepNames } from '../../utility/getSteps';

type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

export const ModalContainerOverlay = (props: Props): JSX.Element => {
  const {
    uiDispatch,
    uiState: { currentStep },
  } = useUi();
  const { styles, children, className } = props;
  const modalRoot = document.getElementById('root');
  if (!modalRoot) {
    return <></>;
  }
  const closeModalHandler = () => {
    if (currentStep === StepNames.DONE) {
      uiDispatch({
        type: UiActionsTypes.RESET,
      });
      uiDispatch({
        type: UiActionsTypes.CLOSE_MODAL,
      });
      return;
    }
    uiDispatch({
      type: UiActionsTypes.CLOSE_MODAL,
    });
  };
  return createPortal(
    <div
      style={{ ...styles }}
      className={`${className} absolute -z-20 top-0 left-0 bottom-0 right-0 h-full w-full bg-gray-400 opacity-10`}
      onClick={closeModalHandler}
    >
      {children}
    </div>,
    modalRoot,
  );
};
