import { Props } from '../components/auth-button/AuthButton';
import { RouteNames, StepNames } from '../utility/getSteps';

export type Image = {
  id?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type AuthFormState = {
  username: string;
  pwdImages: Image[];
  gridImages: Image[];
  pwdHash: string;
  mnemonicPhrase: string;
  mnemonicPhraseHash: string;
  userMnemonicPhraseInput: string[];
  developerDetails?: {
    mode?: string;
    privateKey?: string;
    publicKey?: string;
    useWindowWallet?: boolean;
  };
};
export type UseAuthProvider = {
  authFormState: AuthFormState;
  authFormDispatch: React.Dispatch<any>;
  isLoading: boolean;
  contractMethodResponseHandler: (
    currentStep: StepNames,
    chosenRoute: RouteNames,
    allSteps: any,
    currentStepIndex: number,
    uiDispatch: React.Dispatch<any>,
  ) => void;
  userMnemonicPhrase: string[];
};

export enum AuthFormActionsTypes {
  SET_USERNAME = 'SET_USERNAME',
  SET_PWD_IMAGES = 'SET_PWD_IMAGES',
  SET_GRID_IMAGES = 'SET_GRID_IMAGES',
  SET_PWD_HASH = 'SET_PWD_HASH',
  SET_MNEMONIC_PHRASE = 'SET_MNEMONIC_PHRASE',
  SET_MNEMONIC_PHRASE_HASH = 'SET_MNEMONIC_PHRASE_HASH',
  SET_DEVELOPER_DETAILS = 'SET_DEVELOPER_DETAILS',
  SET_USER_MNEMONIC_INPUT = 'SET_USER_MNEMONIC_INPUT',
  RESET = 'RESET',
}

export type AuthFormActions = {
  type: AuthFormActionsTypes;
  payload?: any;
};
export type Message = {
  type?: 'success' | 'error' | 'warning' | 'info' | '';
  description?: string | '';
};
export type UiState = {
  isModalOpen: boolean;
  chosenRoute: RouteNames | any;
  currentStep: StepNames | '';
  previousStep: StepNames | '';
  nextStep: StepNames | '';
  allSteps: {
    stepName: StepNames | '';
    stepNumber: number;
    isActive: boolean;
    isCompleted: boolean;
  }[];
};

export type UseUi = {
  uiState: UiState;
  uiDispatch: React.Dispatch<any>;
  AuthButton: React.FC<Props>;
};

export enum UiActionsTypes {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_ROUTE = 'SET_ROUTE',
  SET_STEPS = 'SET_STEPS',
  GO_TO_NEXT_STEP = 'GO_TO_NEXT_STEP',
  GO_TO_PREVIOUS_STEP = 'GO_TO_PREVIOUS_STEP',
  RESET = 'RESET',
}

export type UiActions = {
  type: UiActionsTypes;
  payload?: any;
};
