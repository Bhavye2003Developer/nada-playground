import Editor from "../Program/Editor";
import InputDisplay from "../Program/InputDisplay";
import { useEffect } from "react";
import init from "../utils/init";
import Header from "./Header";
import { fetchCode } from "../utils/helper";
import { useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from "react-toastify";
import OutputDisplay from "../Program/OutputDisplay";
import MessageDisplay from "../Program/MessageDisplay";
import useGlobals from "../stores/useGlobals";
import LoadingDisplay from "./LoadingDisplay";

function Platform() {
  let [searchParams] = useSearchParams();
  const isInitialisationCompleted = useGlobals(
    (state) => state.isInitialisationCompleted
  );

  useEffect(() => {
    init();
    console.log(searchParams);
    const sharedValue = searchParams.get("shared");
    fetchCode(sharedValue || "");
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <div
        className={`h-screen flex flex-1 flex-col ${
          isInitialisationCompleted ? null : "opacity-50 pointer-events-none"
        }`}
      >
        <Header />
        <div className="flex h-screen mb-3 mx-2">
          <div className="w-full flex flex-col">
            <Editor />
            <div className="mb-3"></div>
            <MessageDisplay />
          </div>
          <div className="w-full flex flex-col">
            <InputDisplay />
            <div className="mb-3"></div>
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
