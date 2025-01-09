import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContex";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [dispalyResponse, setDisplayResponse] = useState("");
  const [precious, setprecious] = useState("");
  const [osonwa, setosonwa] = useState("");
  const {
    options,
    handleGenerateQuestion,
    questionOutput,
    newresharch,
    selectedLabel,
    questionModal,
    setQuestionModal,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setDisplayResponse("Correct answer!");
      setTimeout(() => {
        if (currentQuestionIndex < questionOutput.length - 1) {
          // Increment question index for the next question
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setDisplayResponse(""); // Clear feedback message
        } else {
          // Final question completed
          setprecious("Congratulations! You've completed the test.");
          setosonwa("Consider moving to the next level!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        setSelectedOption(null); // Reset selected option
      }, 1000);
    } else {
      setDisplayResponse("Incorrect answer. Try again.");
    }
  };

  const currentQuestion = questionOutput[currentQuestionIndex];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      {questionModal && (
        <div className="bg-[rgba(0,0,0,0.5)] fixed h-[100vh] w-[100vw] top-0 flex items-center justify-center right-0">
          <div className="sm:h-[60vh] h-[50vh] rounded-2xl shadow-lg w-[97vw] sm:w-[50vw] bg-white">
            <p className="text-center py-1">
              Test Your progress From This Course{" "}
              {/* <span
                          className="p-1 text-red-600 text-[15px]"
                          onClick={() => setQuestionModal(false)}
                        >
                          x
                        </span> */}
            </p>
            <div className="h-[45vh] w-[49vw]  p-4   ">
              {questionOutput.length !== 0 ? (
                <div className="flex flex-col justify-between h-[45vh] w-[49vw] ">
                  <div className="shadow-sm h-[514px] w-[945px]  flex flex-col justify-between rounded-[12px] p-[30px]">
                    <div>
                      <p className="font-[500]  text-[#1B1B1B] text-[12px] mb-1">
                        <span className="text-black">
                          {currentQuestionIndex + 1},
                        </span>
                        {currentQuestion.question}
                      </p>
                      <ul>
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-1"
                          >
                            <input
                              id={`option-${index}`}
                              name="answer"
                              type="radio"
                              checked={selectedOption === option}
                              value={option}
                              onChange={() => handleOptionChange(option)}
                            />
                            <label
                              className="text-[#515151] text-[12px]  font-[500]  "
                              htmlFor={`option-${index}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div className=" flex flex-col gap-1 ">
                      <p className="text-[#18A09A] text-[20px]">
                        {dispalyResponse}
                      </p>
                      <p className="text-[#18A09A] text-[20px]">{precious}</p>
                      {osonwa}

                      <button
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                        className=" bg-[#18A09A] flex items-center justify-center text-[#FFFFFF] font-[600] text-[13px] p-[20px] rounded-[12px] w-[100px] h-[40px] "
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-red-600 text-[10px] flex items-center h-[30vh] justify-center flex-col">
                  <CircularProgress size={54} color="inherit" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
