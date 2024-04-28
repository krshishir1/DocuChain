import { steps, stepValue } from "../config/onboarding";
import { useState } from "react";

interface OnboardingProps {
  register: (studentData : any) => void;
}

import { useSwitchChain } from "wagmi";

const Onboarding : React.FC<any> = ({register, setStudent, switchNetwork}) => {
  const [currentStepNum, setCurrentStepNum] = useState(0);

  const {switchChain} = useSwitchChain();

  const [values, setValues] = useState<any>(stepValue);

  const handleNext = (e: any) => {
    e.preventDefault();

    if (currentStepNum < steps.length - 1) {
      setCurrentStepNum(currentStepNum + 1);
    }
  };

  const handleBack = (e: any) => {
    e.preventDefault();

    if (currentStepNum > 0) {
      setCurrentStepNum(currentStepNum - 1);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStudent(values);
    switchNetwork({chainId: 134})

    // await register(values);
  }

  return (
    <div
      className="md:w-3/5 mx-auto p-4 bg-gray-100 rounded-xl"
      style={{ minHeight: "450px" }}
    >
      {steps.map((step, index) => {
        const { stepName, inputs } = step;
        return (
          currentStepNum == index && (
            <div key={`step-${index + 1}`} className="px-10 py-5">
              <h2 className="text-3xl font-bold text-center">{stepName}</h2>
              <form className="flex flex-col gap-4">
                {inputs.map((input: any, i) => {
                  return (
                    <article>
                      {input.cols ? (
                        <div key={`input-${i + 1}`}>
                          {input.question && (
                            <label className="text-lg font-bold">
                              {" "}
                              {input.question}{" "}
                            </label>
                          )}

                          <div className="flex flex-wrap gap-2 md:gap-8">
                            {input.cols.map((col, index: number) => {
                              return (
                                <div key={`col-${index + 1}`} className="">
                                  {col.question && (
                                    <label className="text-lg font-bold">
                                      {col.question}
                                    </label>
                                  )}

                                  <div>
                                    {col.type !== "select" ? (
                                      <input
                                        type={col.type}
                                        value={values[col.tag]}
                                        onChange={(e) =>
                                          setValues({
                                            ...values,
                                            [col.tag]: e.target.value,
                                          })
                                        }
                                        placeholder={col.placeholder}
                                        className="px-4 py-2 mt-2 border border-gray-300 rounded-lg basis-1/2"
                                      />
                                    ) : (
                                      <select
                                        value={values[col.tag]}
                                        onChange={(e) =>
                                          setValues({
                                            ...values,
                                            [col.tag]: e.target.value,
                                          })
                                        }
                                        className="w-full bg-white px-4 py-2 mt-2 border border-gray-300 rounded-lg basis-1/2"
                                      >
                                        {col.options?.map((option) => {
                                          return (
                                            <option
                                              key={option.value}
                                              value={option.value}
                                            >
                                              {option.detail}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={`input-${i + 1}`}
                          className="mt-5 flex flex-col gap-2"
                        >
                          <label className="text-lg font-bold">
                            {input.question}
                          </label>
                          {input.type !== "select" ? (
                            <input
                              type={input.type}
                              value={values[input.tag]}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [input.tag]: e.target.value,
                                })
                              }
                              // placeholder={input.placeholder}
                              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                            />
                          ) : (
                            <select
                              value={values[input.tag]}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [input.tag]: e.target.value,
                                })
                              }
                              className="w-full bg-white px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                            >
                              {input.options?.map((option) => {
                                return (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.detail}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}

                <div className="flex mt-4 gap-4 justify-center">
                  {currentStepNum > 0 && (
                    <button
                      onClick={handleBack}
                      className="bg-primary text-black px-6 py-3 text-lg font-bold uppercase rounded-lg"
                    >
                      Back
                    </button>
                  )}
                  {currentStepNum < steps.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="bg-primary text-black px-6 py-3 text-lg font-bold uppercase rounded-lg"
                    >
                      Next
                    </button>
                  )}
                  {currentStepNum === steps.length - 1 && (
                    <button
                      onClick={handleSubmit}
                      className="bg-primary text-black px-6 py-3 text-lg font-bold uppercase rounded-lg"
                    >
                      Protect Data
                    </button>
                  )}
                </div>
              </form>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Onboarding;
