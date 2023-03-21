import React from "react";
import { useAuthProvider } from "../../context/auth/VisualDAuthProvider";
import { UiActionsTypes } from "../../context/typings.context";
import { useUi } from "../../context/ui/UiProvider";
import { StepNames } from "../../utility/getSteps";
import "tailwindcss/dist/tailwind.css";

export const FooterNav = () => {
  const { uiState, uiDispatch } = useUi();
  const { allSteps, currentStep, previousStep, nextStep, chosenRoute } =
    uiState;
  const { contractMethodResponseHandler } = useAuthProvider();
  const nextButtonHandler = () => {
    const currentStepIndex = allSteps.findIndex(
      (step) => step.stepName === currentStep
    );
    if (!nextStep) {
      return;
    } else {
      contractMethodResponseHandler(
        currentStep,
        nextStep,
        previousStep,
        chosenRoute,
        allSteps,
        currentStepIndex,
        uiDispatch
      );
      // uiDispatch({
      //   type: UiActionsTypes.GO_TO_NEXT_STEP,
      //   payload: allSteps[currentStepIndex + 1].stepName || "",
      // });
    }
  };
  const previousButtonHandler = () => {
    const currentStepIndex = allSteps.findIndex(
      (step) => step.stepName === currentStep
    );

    if (!previousStep || currentStep === allSteps[0].stepName) {
      uiDispatch({
        type: UiActionsTypes.RESET,
      });
      return;
    } else {
      uiDispatch({
        type: UiActionsTypes.GO_TO_PREVIOUS_STEP,
        payload: allSteps[currentStepIndex - 1].stepName || "",
      });
    }
  };

  const closeModalHandler = () => {
    uiDispatch({
      type: UiActionsTypes.RESET,
    });
  };

  return (
    <>
      {uiState.chosenRoute && (
        <nav className="flex justify-between items-center w-full">
          <button
            className={`bg-gray-50 border border-gray-300text-lg font-bold text-gray-400 hover:text-blue bg-inherit hover:border-bluelight focus:shadow-md focus:shadow-bluelight rounded-lg px-5 py-2 mr-2 mb-2 transition-all focus:outline-none focus:ring-bluelight flex items-center ${
              currentStep === StepNames.DONE ? "invisible" : ""
            }`}
            tabIndex={1}
            type="button"
            onClick={previousButtonHandler}
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
            </span>
            Previous
          </button>
          {currentStep !== StepNames.DONE ? (
            <button
              className="text-white text-lg font-bold bg-blue hover:bg-bluelighter focus:shadow-md focus:shadow-bluelight rounded-lg px-5 py-2 transition-all focus:outline-none focus:ring-bluelight flex items-center"
              tabIndex={1}
              onClick={nextButtonHandler}
              type="button"
            >
              Next
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                </svg>
              </span>
            </button>
          ) : (
            <button
              className="text-white text-lg font-bold bg-blue hover:bg-bluelighter focus:shadow-md focus:shadow-bluelight rounded-lg px-5 py-2 transition-all focus:outline-none focus:ring-bluelight flex items-center"
              tabIndex={1}
              onClick={closeModalHandler}
              type="button"
            >
              Close
            </button>
          )}
        </nav>
      )}
    </>
  );
};
