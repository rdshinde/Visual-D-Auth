import { Buffer } from "buffer";
import React from "react";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { generateMnemonic } from "bip39";
import { toast } from "react-hot-toast";
import { Images } from "../../components/pwd-builder/PwdBuilder";
import { fetchContractMethod, getPasswordHash } from "../../services";
import { ContractMethods } from "../../services/fetchContractMethod";
import { RouteNames, StepNames } from "../../utility/getSteps";
import {
  AuthFormActionsTypes,
  AuthFormState,
  UiActionsTypes,
  UseAuthProvider,
} from "../typings.context";
import { UiProvider } from "../ui/UiProvider";
import { authFormReducer } from "./authFormReducer";

(window as any).Buffer = Buffer;
export const initialAuthFormState = {
  username: "",
  pwdImages: [],
  gridImages: [],
  pwdHash: "",
  mnemonicPhrase: "",
  mnemonicPhraseHash: "",
  userMnemonicPhraseInput: [],
  developerDetails: {
    mode: "",
    privatekey: "",
    publicKey: "",
    useWindowWallet: true,
  },
};

const AuthFormContext = createContext<{
  authFormState: AuthFormState;
  authFormDispatch: React.Dispatch<any>;
  isLoading: boolean;
  contractMethodResponseHandler: Function;
  userMnemonicPhrase: string[];
}>({
  authFormState: initialAuthFormState,
  authFormDispatch: () => null,
  isLoading: false,
  contractMethodResponseHandler: () => false,
  userMnemonicPhrase: [],
});

export type Props = {
  children: React.ReactNode;
  privateKey?: string;
  publicKey?: string;
  mode?: string;
  useWindowWallet?: boolean;
  onErrorHandler?: (result: any) => void;
  onSuccessHandler?: (result: any) => void;
};

export const useAuthProvider = (): UseAuthProvider =>
  useContext(AuthFormContext);

export const VisualDAuthProvider = ({
  privateKey,
  publicKey,
  mode,
  useWindowWallet,
  children,
  onErrorHandler,
  onSuccessHandler,
}: Props): any => {
  // Add types to reducer and state  and dispatch
  const [authFormState, authFormDispatch] = useReducer(
    authFormReducer,
    initialAuthFormState
  );

  const [isLoading, setLoader] = useState<boolean>(false);

  const [onSuccess, setOnSuccess] = useState<any>({});
  const [onError, setOnError] = useState<any>({});

  const [userMnemonicPhrase, setUserMnemonicPhrase] = useState<string[]>([]);

  useEffect(() => {
    if (privateKey && publicKey && mode) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_DEVELOPER_DETAILS,
        payload: {
          mode,
          privateKey,
          publicKey,
          useWindowWallet,
        },
      });
    } else {
      console.log("privateKey, publicKey, mode not found");
    }
  }, [privateKey, publicKey, mode, useWindowWallet]);

  useEffect(() => {
    if (authFormState.pwdImages.length > 0 && authFormState.username) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_PWD_HASH,
        payload: getPasswordHash(
          authFormState.pwdImages,
          authFormState.username
        ),
      });
    }
  }, [authFormState.pwdImages]);

  const isOnlySixImagesInPwd = (pwdImages: Images[]) => {
    const filteredImages = pwdImages.filter((image) => {
      return Boolean(image.imageSrc);
    });
    return filteredImages.length === 6;
  };

  useEffect(() => {
    if (
      isOnlySixImagesInPwd(authFormState.pwdImages) &&
      authFormState.username
    ) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_MNEMONIC_PHRASE,
        payload: generateMnemonic(128),
      });
    }
  }, [authFormState.pwdImages]);

  const contractMethodResponseHandler = (
    currentStep: StepNames,
    chosenRoute: RouteNames,
    allSteps: any,
    currentStepIndex: number,
    uiDispatch: React.Dispatch<any>
  ) => {
    const {
      username,
      pwdHash,
      mnemonicPhrase,
      userMnemonicPhraseInput,
      developerDetails: { mode, privateKey, useWindowWallet, publicKey },
    } = authFormState;
    let response: any;
    if (chosenRoute === RouteNames.REGISTER) {
      switch (currentStep) {
        case StepNames.USERNAME:
          if (username) {
            response = fetchContractMethod(
              ContractMethods.IS_USERNAME_TAKEN,
              mode,
              publicKey,
              privateKey,
              useWindowWallet,
              { username },
              setLoader
            );
          } else {
            toast.error("Username is required.");
          }
          if (response) {
            response.then((res: any) => {
              if (!res?.isUsernameTaken && res?.status) {
                toast.success(res?.message);
                uiDispatch({
                  type: UiActionsTypes.GO_TO_NEXT_STEP,
                  payload: allSteps[currentStepIndex + 1].stepName || "",
                });
              } else {
                toast.error(res?.message);
              }
            });
          }
          break;
        case StepNames.PASSWORD:
          if (
            pwdHash &&
            username &&
            isOnlySixImagesInPwd(authFormState.pwdImages) &&
            mnemonicPhrase
          ) {
            response = fetchContractMethod(
              ContractMethods.CREATE_NEW_USER,
              mode,
              publicKey,
              privateKey,
              useWindowWallet,
              { username, pwdHash, mnemonicPhrase },
              setLoader
            );
          } else {
            toast.error("Six Image password is required.");
          }
          if (response) {
            return response.then((res: any) => {
              if (res?.status) {
                toast.success(res?.message);
                setOnSuccess({ ...res, action: "User Registration." });
                uiDispatch({
                  type: UiActionsTypes.GO_TO_NEXT_STEP,
                  payload: allSteps[currentStepIndex + 1].stepName || "",
                });
              } else {
                toast.error(res?.message);
                setOnError({ ...res, action: "User Registration." });
              }
            });
          }
          break;
        case StepNames.DONE:
          uiDispatch({
            type: UiActionsTypes.CLOSE_MODAL,
          });
          authFormDispatch({
            type: AuthFormActionsTypes.RESET,
          });
          break;
      }
    } else if (chosenRoute === RouteNames.LOGIN) {
      switch (currentStep) {
        case StepNames.USERNAME:
          if (username) {
            response = fetchContractMethod(
              ContractMethods.IS_USERNAME_TAKEN,
              mode,
              publicKey,
              privateKey,
              useWindowWallet,
              { username },
              setLoader
            );
          } else {
            toast.error("Username is required.");
          }
          if (response) {
            response.then((res: any) => {
              if (res?.isUsernameTaken) {
                toast.success(res?.message);
                uiDispatch({
                  type: UiActionsTypes.GO_TO_NEXT_STEP,
                  payload: allSteps[currentStepIndex + 1].stepName || "",
                });
              } else {
                toast.error(res?.message);
              }
            });
          }
          break;
        case StepNames.PASSWORD:
          if (
            pwdHash &&
            username &&
            isOnlySixImagesInPwd(authFormState.pwdImages)
          ) {
            response = fetchContractMethod(
              ContractMethods.LOGIN_REGISTERED_USER,
              mode,
              publicKey,
              privateKey,
              useWindowWallet,
              { username, pwdHash },
              setLoader
            );
          } else {
            toast.error("Six Image password is required.");
          }
          if (response) {
            response.then((res: any) => {
              if (res?.userLogin) {
                toast.success(res?.message);
                setOnSuccess({ ...res, action: "User Login." });
                uiDispatch({
                  type: UiActionsTypes.GO_TO_NEXT_STEP,
                  payload: allSteps[currentStepIndex + 1].stepName || "",
                });
              } else {
                toast.error(res?.message);
                setOnError({ ...res, action: "User Login." });
              }
            });
          }
          break;
        case StepNames.DONE:
          uiDispatch({
            type: UiActionsTypes.CLOSE_MODAL,
          });
          authFormDispatch({
            type: AuthFormActionsTypes.RESET,
          });
          break;
      }
    } else if (chosenRoute === RouteNames.RECOVER) {
      switch (currentStep) {
        case StepNames.USERNAME:
          if (username) {
            (async () => {
              const usernameResponse = await fetchContractMethod(
                ContractMethods.IS_USERNAME_TAKEN,
                mode,
                publicKey,
                privateKey,
                useWindowWallet,
                { username },
                setLoader
              );
              if (usernameResponse) {
                const usernameRes = await usernameResponse;
                if (usernameRes?.isUsernameTaken) {
                  toast.success(usernameRes?.message);
                  const mnemonicPhraseResponse = await fetchContractMethod(
                    ContractMethods.GET_MNEMONIC_PHRASE,
                    mode,
                    publicKey,
                    privateKey,
                    useWindowWallet,
                    { username },
                    setLoader
                  );
                  if (mnemonicPhraseResponse) {
                    const mnemonicPhraseRes = await mnemonicPhraseResponse;
                    if (mnemonicPhraseRes) {
                      setUserMnemonicPhrase([
                        ...mnemonicPhraseRes?.mnemonicPhrase.split(" "),
                      ]);
                      uiDispatch({
                        type: UiActionsTypes.GO_TO_NEXT_STEP,
                        payload: allSteps[currentStepIndex + 1].stepName || "",
                      });
                    } else {
                      toast.error(mnemonicPhraseRes?.message);
                    }
                  }
                  uiDispatch({
                    type: UiActionsTypes.GO_TO_NEXT_STEP,
                    payload: allSteps[currentStepIndex + 1].stepName || "",
                  });
                } else {
                  toast.error(usernameRes?.message);
                }
              }
            })();
          } else {
            toast.error("Username is required.");
          }
          break;
        case StepNames.VERIFY:
          if (userMnemonicPhraseInput) {
            const mnemonicPhraseInput = userMnemonicPhraseInput.join(" ");
            const mnemonicPhrase = userMnemonicPhrase.join(" ");
            if (mnemonicPhraseInput === mnemonicPhrase) {
              response = fetchContractMethod(
                ContractMethods.VERIFY_MNEMONIC_PHRASE,
                mode,
                publicKey,
                privateKey,
                useWindowWallet,
                { username, mnemonicPhrase: mnemonicPhraseInput },
                setLoader
              );
            } else {
              toast.error("Mnemonic Phrase is incorrect.");
            }
          } else {
            toast.error("Mnemonic Phrase is required.");
          }
          if (response) {
            response.then((res: any) => {
              if (res?.isMnemonicPhraseValid) {
                toast.success(res?.message);
                uiDispatch({
                  type: UiActionsTypes.GO_TO_NEXT_STEP,
                  payload: allSteps[currentStepIndex + 1].stepName || "",
                });
              } else {
                toast.error(res?.message);
              }
            });
          }
          break;
        case StepNames.PASSWORD:
          if (
            pwdHash &&
            username &&
            isOnlySixImagesInPwd(authFormState.pwdImages)
          ) {
            response = fetchContractMethod(
              ContractMethods.RESET_USER_PASSWORD,
              mode,
              publicKey,
              privateKey,
              useWindowWallet,
              { username, newPassword: pwdHash },
              setLoader
            );
          } else {
            toast.error("Six Image password is required.");
          }
          if (response) {
            response.then((res: any) => {
              if (res?.isResetSuccessful) {
                toast.success(res?.message);
                setOnSuccess({ ...res, action: "User Password Reset." });
                uiDispatch({
                  type: UiActionsTypes.GO_TO_NEXT_STEP,
                  payload: allSteps[currentStepIndex + 1].stepName || "",
                });
              } else {
                toast.error(res?.message);
                setOnError({ ...res, action: "User Password Reset." });
              }
            });
          }
          break;
        case StepNames.DONE:
          uiDispatch({
            type: UiActionsTypes.CLOSE_MODAL,
          });
          authFormDispatch({
            type: AuthFormActionsTypes.RESET,
          });
          break;
      }
    }
  };
  useEffect(() => {
    if (onSuccess && onSuccess.status) {
      onSuccessHandler
        ? onSuccessHandler(onSuccess)
        : toast.error(
            "Please provide the onSuccessHandler function in VisualDAuthProvider"
          );
    }
  }, [onSuccess]);

  useEffect(() => {
    if (onError && onError.status) {
      onErrorHandler
        ? onErrorHandler(onError)
        : toast.error(
            "Please provide the onErrorHandler function in VisualDAuthProvider"
          );
    }
  }, [onError]);

  // console.log("authFormState", authFormState);

  return (
    <AuthFormContext.Provider
      value={{
        authFormState,
        authFormDispatch,
        isLoading,
        contractMethodResponseHandler,
        userMnemonicPhrase,
      }}
    >
      <UiProvider>{children}</UiProvider>
    </AuthFormContext.Provider>
  );
};
