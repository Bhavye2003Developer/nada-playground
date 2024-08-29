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
    <div className="flex flex-col w-full h-screen absolute">
      <div
        className={`h-screen flex flex-1 flex-col ${
          initializationState === InitializationState.Completed
            ? null
            : "opacity-35 pointer-events-none"
        }`}
      >
        <Header />
        <div className="flex h-screen mb-3 mx-2 overflow-hidden">
          <div className="w-full flex flex-col h-full">
            <div
              style={{
                height: `calc(100% - ${messageHeight}px)`,
              }}
              className="flex-1"
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
              className="flex flex-col"
            >
              <MessageDisplay />
            </ResizableBox>
          </div>
          <div className="w-full flex flex-col overflow-hidden">
            <InputDisplay />
            <OutputDisplay />
          </div>
        </div>
      </div>

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
