export enum RouteNames {
  REGISTER = "register",
  RECOVER = "recover",
  LOGIN = "login",
}
export enum StepNames {
  USERNAME = "Username",
  PASSWORD = "Password",
  VERIFY = "Verify",
  DONE = "Done!", 
}
export interface Step {
  stepName: StepNames;
  stepNumber: number;
  isActive: boolean;
  isCompleted: boolean;
}

export const getSteps = (payload: string): Step[] => {
  switch (payload) {
    case RouteNames.REGISTER:
      return [
        {
          stepName: StepNames.USERNAME,
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: StepNames.PASSWORD,
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: StepNames.DONE,
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
      ];
    case RouteNames.RECOVER:
      return [
        {
          stepName: StepNames.USERNAME,
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: StepNames.VERIFY,
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: StepNames.PASSWORD,
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: StepNames.DONE,
          stepNumber: 4,
          isActive: false,
          isCompleted: false,
        },
      ];
    case RouteNames.LOGIN:
      return [
        {
          stepName: StepNames.USERNAME,
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: StepNames.PASSWORD,
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: StepNames.DONE,
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
      ];
    default:
      return [];
  }
};
