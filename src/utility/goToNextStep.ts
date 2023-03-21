import { UiActionsTypes } from '../context/typings.context'
// import { StepNames } from "./getSteps";

export const goToNextStep = (allSteps: any, currentStep: string, uiDispatch: any) => {
  const currentStepIndex = allSteps.findIndex((step: any) => step.stepName === currentStep)
  uiDispatch({
    type: UiActionsTypes.GO_TO_NEXT_STEP,
    payload: allSteps[currentStepIndex + 1].stepName || '',
  })
}
