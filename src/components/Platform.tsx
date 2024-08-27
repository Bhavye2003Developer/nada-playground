import Editor from "../Program/Editor";
import InputDisplay from "../Program/InputDisplay";
import { useEffect, useState } from "react";
import init from "../utils/init";
import Header from "./Header";
import { fetchCode } from "../utils/helper";
import { useSearchParams } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import OutputDisplay from "../Program/OutputDisplay";
import MessageDisplay from "../Program/MessageDisplay";
import useGlobals from "../stores/useGlobals";
import LoadingDisplay from "./LoadingDisplay";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-toastify/dist/ReactToastify.css";
import "react-resizable/css/styles.css";

function Platform() {
  let [searchParams] = useSearchParams();
  const [messageHeight, setMessageHeight] = useState(
    (window.innerHeight * 33.333333) / 100
  );

  const isInitialisationCompleted = useGlobals(
    (state) => state.isInitialisationCompleted
  );

  useEffect(() => {
    // init();
    console.log(searchParams);
    const sharedValue = searchParams.get("shared");
    fetchCode(sharedValue || "");
    console.log("height: ", messageHeight);
  }, []);

  const onResize = (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    setMessageHeight(size.height);
  };

  return (
    <div className="flex flex-col w-full h-screen absolute">
      <div
        className={`h-screen flex flex-1 flex-col ${
          isInitialisationCompleted ? null : "opacity-50 pointer-events-none"
        }`}
      >
        <Header />
        <div className="flex h-screen mb-3 mx-2">
          <div className="w-full flex flex-col">
            <div style={{ height: `calc(100% - ${messageHeight}px)` }}>
              <Editor />
            </div>
            <ResizableBox
              height={messageHeight}
              width={Infinity}
              axis="y"
              resizeHandles={["n"]}
              minConstraints={[Infinity, 100]} // Minimum height constraint
              maxConstraints={[Infinity, 500]} // Maximum height constraint
              onResize={onResize}
              className="flex flex-col"
            >
              <MessageDisplay />
            </ResizableBox>
          </div>
          <div className="w-full flex flex-col">
            <InputDisplay />
            {/* <div className="mb-3"></div> */}
            <OutputDisplay />
          </div>
        </div>
      </div>
      {isInitialisationCompleted ? null : <LoadingDisplay />}
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
