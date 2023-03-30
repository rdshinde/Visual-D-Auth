import React, { ReactNode } from 'react';
import {
  AuthOptions,
  MnemonicInput,
  MnemonicPhraseContainer,
  PwdBuilder,
  SuccessGif,
  UserNameField,
} from '../components';
import { RouteNames, StepNames } from './getSteps';

export const componentRenderingHandler = (currentStep: StepNames | any, chosenRoute: RouteNames | any): ReactNode => {
  switch (currentStep) {
    case StepNames.USERNAME:
      return (
        <>
          <UserNameField />
        </>
      );

    case StepNames.PASSWORD:
      return (
        <>
          <PwdBuilder />
        </>
      );

    case StepNames.VERIFY:
      return (
        <>
          <MnemonicInput />
        </>
      );

    case StepNames.DONE:
      if (chosenRoute === RouteNames.REGISTER) {
        return (
          <>
            <MnemonicPhraseContainer />
          </>
        );
      } else {
        return (
          <>
            <SuccessGif />
          </>
        );
      }

    default:
      return <AuthOptions />;
  }
};
