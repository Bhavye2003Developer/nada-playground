import Editor from "../Program/Editor";
import InputDisplay from "../Program/InputDisplay";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import init from "../utils/init";
import Header from "./Header";
import { fetchCode } from "../utils/helper";
import { useSearchParams } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import OutputDisplay from "../Program/OutputDisplay";
import MessageDisplay from "../Program/MessageDisplay";
import useGlobals, { InitializationState } from "../stores/useGlobals";
import LoadingDisplay from "./LoadingDisplay";
import { ResizableBox } from "react-resizable";
import "react-toastify/dist/ReactToastify.css";
import "react-resizable/css/styles.css";

function Platform() {
  const maxMessageDisplayHeight = (window.innerHeight * 25.0) / 100;
  let [searchParams] = useSearchParams();
  const [messageHeight, setMessageHeight] = useState(maxMessageDisplayHeight);

  const initializationState = useGlobals((state) => state.initalizationState);

  useEffect(() => {
    init();
    console.log(searchParams);
    const sharedValue = searchParams.get("shared");
    fetchCode(sharedValue || "");
  }, []);

  const onResize = useCallback(
    (_: SyntheticEvent, data: { size: { height: number } }) => {
      setMessageHeight(data.size.height);
    },
    []
  );

  return (
    <div className="flex flex-col w-full h-screen absolute bg-gray-100 dark:bg-gray-800">
      <div
        className={`h-screen flex flex-1 flex-col transition-opacity duration-300 ${
          initializationState === InitializationState.Completed
            ? "opacity-100"
            : "opacity-35 pointer-events-none"
        }`}
      >
        <Header />
        <div className="flex h-screen mb-3 mx-2 overflow-hidden space-x-2">
          {/* Left Side: Editor and Message Display */}
          <div className="w-2/3 flex flex-col h-full space-y-2">
            <div
              style={{
                height: `calc(100% - ${messageHeight}px)`,
              }}
              className="flex-1 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
            >
              <Editor messageHeight={messageHeight} />
            </div>
            <ResizableBox
              height={messageHeight}
              width={Infinity}
              axis="y"
              resizeHandles={["n"]}
              minConstraints={[Infinity, 100]}
              maxConstraints={[Infinity, maxMessageDisplayHeight]}
              onResize={onResize}
              className="flex flex-col bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
            >
              <MessageDisplay />
            </ResizableBox>
          </div>
          {/* Right Side: Input and Output Display */}
          <div className="w-1/3 flex flex-col h-full space-y-2">
            <div className="flex-1 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
              <InputDisplay />
            </div>
            <div className="flex-1 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
              <OutputDisplay />
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Notifications */}
      {initializationState === InitializationState.Completed ? null : (
        <LoadingDisplay />
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        draggable={false}
        pauseOnHover={false}
        transition={Flip}
      />
    </div>
  );
}

export default Platform;
