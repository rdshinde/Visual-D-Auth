import { AnimatePresence } from 'framer-motion';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Alert, AuthButton, AuthHandler, ModalContainer, ModalContainerOverlay } from '../../components';
import { Props } from '../../components/auth-button/AuthButton';
import { RouteNames, StepNames } from '../../utility/getSteps';
import { UiActionsTypes, UiState, UseUi } from '../typings.context';
import { uiReducer } from './uiReducer';

export const initialUiState: UiState = {
  isModalOpen: false,
  chosenRoute: '',
  currentStep: '',
  previousStep: '',
  nextStep: '',
  allSteps: [],
};

const UiContext = createContext<{
  uiState: UiState;
  uiDispatch: React.Dispatch<any>;
  AuthButton: React.FC<Props>;
}>({
  uiState: initialUiState,
  uiDispatch: () => null,
  AuthButton: AuthButton,
});

const useUi = (): UseUi => useContext(UiContext);

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [uiState, uiDispatch] = useReducer(uiReducer, initialUiState);

  useEffect(() => {
    if (uiState.chosenRoute) {
      uiDispatch({
        type: UiActionsTypes.SET_STEPS,
        payload: uiState.chosenRoute,
      });
    }
  }, [uiState.chosenRoute]);

  useEffect((): any => {
    if (uiState.currentStep === StepNames.DONE && uiState.chosenRoute !== RouteNames.REGISTER) {
      const timeoutId = setTimeout(() => {
        uiDispatch({
          type: UiActionsTypes.CLOSE_MODAL,
        });
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [uiState.currentStep, uiState.chosenRoute]);

  return (
    <UiContext.Provider value={{ uiState, uiDispatch, AuthButton }}>
      <AnimatePresence>
        {uiState.isModalOpen && (
          <>
            <Alert />
            <ModalContainerOverlay />
            <ModalContainer>
              <AuthHandler />
            </ModalContainer>
          </>
        )}
      </AnimatePresence>
      {children}
    </UiContext.Provider>
  );
};

export { UiProvider, useUi };
