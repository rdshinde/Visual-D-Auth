import { getSteps } from "../../utility";
import { UiActions, UiActionsTypes, UiState } from "../typings.context";

export const uiReducer = (state: UiState, action: UiActions): UiState => {
  const { type, payload } = action;
  switch (type) {
    case UiActionsTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case UiActionsTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        chosenRoute: "",
        currentStep: "",
        previousStep: "",
        nextStep: "",
        allSteps: [],
      };
    case UiActionsTypes.SET_ROUTE:
      return {
        ...state,
        chosenRoute: payload,
      };
    case UiActionsTypes.SET_STEPS:
      const steps = getSteps(payload);
      return {
        ...state,
        currentStep: steps[0].stepName,
        nextStep: steps[1].stepName,
        previousStep: "",
        allSteps: [...steps],
      };
    case UiActionsTypes.GO_TO_NEXT_STEP:
      let currentStepIndx = state.allSteps.findIndex(
        (step) => step.stepName === state.currentStep
      );
      return {
        ...state,
        currentStep: payload,
        previousStep: state.currentStep,
        nextStep: state.allSteps[currentStepIndx + 1]?.stepName || "",
        allSteps: state.allSteps.map((step, index) => {
          if (step.stepName === payload) {
            return {
              ...step,
              isActive: true,
              isCompleted: false,
            };
          } else if (index <= currentStepIndx) {
            return {
              ...step,
              isActive: false,
              isCompleted: true,
            };
          } else if (index > currentStepIndx) {
            return {
              ...step,
              isActive: false,
              isCompleted: false,
            };
          } else return step;
        }),
      };
    case UiActionsTypes.GO_TO_PREVIOUS_STEP:
      let currentStepIndex = state.allSteps.findIndex(
        (step) => step.stepName === state.currentStep
      );
      return {
        ...state,
        currentStep: payload,
        nextStep: state.allSteps[currentStepIndex].stepName,
        previousStep: state.allSteps[currentStepIndex - 1].stepName || "",
        allSteps: state.allSteps.map((step, index) => {
          if (step.stepName === payload) {
            return {
              ...step,
              isActive: true,
              isCompleted: false,
            };
          } else if (index >= currentStepIndex) {
            return {
              ...step,
              isActive: false,
              isCompleted: false,
            };
          } else if (index < currentStepIndex) {
            return {
              ...step,
              isActive: false,
              isCompleted: true,
            };
          } else return step;
        }),
      };
    case UiActionsTypes.RESET:
      return {
        ...state,
        chosenRoute: "",
        currentStep: "",
        nextStep: "",
        previousStep: "",
        allSteps: [],
      };
    default:
      return state;
  }
};
