import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContex";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Home from "./Home";

function Input() {
  const { options, setOptions, callresponse, responseGenarated } =
    useContext(GlobalContext);
  const [buttonText, setButtonText] = useState("Generate");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [counter, setCounter] = useState(0);

  const navigate = useNavigate();

  // Array of phrases for the button text during loading
  const loadingPhrases = [
    "Gathering resources...",
    "Surfing the internet...",
    "Preparing your journey...",
    "Fetching the best results...",
    "Compiling data...",
  ];

  const handleInput = (e) => {
    setOptions(e.target.value);
  };

  const handleSend = () => {
    setIsLoading(true);
    setCounter(0); // Reset counter when starting the loading
    setButtonText(loadingPhrases[0]); // Set initial button text
    callresponse();
    setOptions("");
  };

  useEffect(() => {
    // Change loading text every 2 seconds
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText(loadingPhrases[counter % loadingPhrases.length]);
        setCounter((prevCounter) => prevCounter + 1); // Update counter for next phrase
      }, 8000); // Update every 2 seconds

      return () => clearInterval(interval); // Clean up interval on unmount or when loading stops
    }
  }, [isLoading, counter, loadingPhrases]);

  useEffect(() => {
    if (responseGenarated.length > 0) {
      setIsLoading(false);
      setButtonText("Done");
      navigate("/flowchartDisplay"); // Navigate when data is generated
    }
  }, [responseGenarated, navigate]);

  return (
    <>
      <Home />
      <div className="h-[100vh] bg-black flex items-center justify-center">
        <div className="h-[50vh] sm:h-[70vh] flex-col gradient w-[90%] sm:w-[70vw] flex items-center justify-center">
          <p className="text-[20px] sm:text-[30px] font-[600]">
            Welcome To Tech Road Map
          </p>
          <p className="text-[20px] text-center sm:text-[30px] font-[600]">
            What Career in tech do you want to Search?
          </p>
          <div className="flex items-center ">
            {" "}
            {/* Flex container with space between items */}
            <div className="w-[12rem] sm:w-[20rem] h-[4rem] relative">
              <input
                id="search"
                type="text"
                autoComplete="off"
                value={options}
                onChange={handleInput}
                className="absolute forminput top-0 left-0 w-[100%] h-[100%] rounded-s-lg text-white border border-black outline-none bg-black p-[10px]"
              />
              <label
                className="text-blue-500 w-[100px] sm:text-[20px] text-center absolute left-[2rem] top-[25%] cursor-text transition"
                htmlFor="search"
              >
                search
              </label>
            </div>
            <button
              className="bg-blue-400 h-[4rem] w-[8em] items-center mx-auto text-[12px] rounded-r-lg sm:text-[20px] sm:w-[120px] flex justify-center"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? (
                // Display the spinner inside the button
                <CircularProgress size={24} color="inherit" />
              ) : (
                buttonText
              )}
            </button>
          </div>

          {isLoading && (
            <div className="mt-4 text-white text-center">
              <p>{loadingText}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Input;
