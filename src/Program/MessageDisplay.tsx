import { useEffect } from "react";
import DisplayPanel from "../components/DisplayPanel";
import useProgramCache from "../stores/useProgramCache";

type messageColorType = {
  [messageCls: string]: string;
};

const messageColors: messageColorType = {
  information: "text-white-600",
  success: "text-green-600",
  warning: "text-yellow-600",
  error: "text-red-600",
};

function MessageDisplay() {
  const messages = useProgramCache((state) => state.messages);

  useEffect(() => {
    console.log("message updated: ", messages);
  }, [messages]);

  return (
    <DisplayPanel name="Program Info">
      <span>
        {messages.length > 0
          ? messages.map((message, index) => {
              const [cls, txt] = message;
              const color = messageColors[cls.toLowerCase()];
              console.log("color: ", color, txt);
              const renderedMsg = (
                <span key={index}>
                  {cls != "Information" ? (
                    <b className={`${color}`}>{cls}: </b>
                  ) : null}
                  {txt}
                  <br />
                </span>
              );
              return renderedMsg;
            })
          : null}
      </span>
    </DisplayPanel>
  );
}

export default MessageDisplay;
