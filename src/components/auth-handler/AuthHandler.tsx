import { AnimatePresence } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuthProvider } from "../../context/auth/VisualDAuthProvider";
import { useUi } from "../../context/ui/UiProvider";
import { componentRenderingHandler } from "../../utility/componentRenderingHandler";
import { AuthOptions } from "../auth-options/AuthOptions";
import { FooterNav } from "../footer-navigation/FooterNav";
import { IconContainer } from "../icon-container/IconContainer";
import { Loader } from "../loader/Loader";
import { StepperChain } from "../stepper/StepperChain";
import "tailwindcss/dist/tailwind.css";

export const AuthHandler = () => {
  const { uiState } = useUi();
  const { isLoading } = useAuthProvider();
  const { chosenRoute, allSteps, currentStep } = uiState;
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(
    <AuthOptions />
  );

  useEffect(() => {
    setCurrentComponent(
      <>
        {componentRenderingHandler(currentStep, chosenRoute)}
        <FooterNav />
      </>
    );
  }, [uiState, currentStep]);
  return (
    <div className={`relative w-full`}>
      <AnimatePresence>
        {isLoading ? (
          <>
            <div className="absolute z-10 -inset-0 p-5 h-full w-full bg-[#fff] opacity-90"></div>
            <div className="w-full top-[16vh] relative z-50">
              <Loader />
            </div>
          </>
        ) : (
          ""
        )}
      </AnimatePresence>
      <IconContainer />
      <div className="w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 my-5">
        {uiState.chosenRoute ? <StepperChain steps={allSteps} /> : ""}
        {currentComponent}
        {/* <FooterNav /> */}
      </div>
      <footer className="mt-2">
        <p className="text-center text-gray-500 text-xs">
          &copy;2023{" "}
          <span className="text-bluelight cursor-pointer">VisualDAuth</span>.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
};
