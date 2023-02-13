import { useState } from "preact/hooks";
import { animate, glide, spring, timeline } from "motion";

interface Props {
  className?: string;
}

function invertColor(hex: string, bw = true) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    return undefined;
  }
  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  const rString = (255 - r).toString(16);
  const gString = (255 - g).toString(16);
  const bString = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(rString) + padZero(gString) + padZero(bString);
}

function padZero(str: string, len?: number) {
  len = len || 2;
  const zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

export const CardMaker = ({ className }: Props) => {
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    timeline([
      [
        "#card-maker-card",
        {
          transform: [
            "translateX(0)",
            "translateX(50px) scale(1.05)",
            "translateX(-80vw) scale(0)",
          ],
          opacity: [1, 1, 0.3],
        },
        {
          easing: glide({ velocity: 1000 }),
          duration: 1000,
        },
      ],
      [
        "#card-maker-card",
        {
          transform: ["scale(0.8) translateX(50vw)", "translateX(0)"],
          opacity: 1,
        },
        {
          easing: spring(),
          duration: 1000,
        },
      ],
    ]).finished.then(() => {
      setBackgroundColor("#fff");
      setName("");
      setTitle("");
      setMessage("");
    });
  };

  return (
    <div className={`flex flex-col items-center w-full gap-4 ${className}`}>
      <p>Get in contact and leave me your custom card:</p>
      <Card
        backgroundColor={backgroundColor}
        name={{
          value: name,
          onChange(value) {
            setName(value);
          },
        }}
        title={{
          value: title,
          onChange(value) {
            setTitle(value);
          },
        }}
        message={{
          value: message,
          onChange(value) {
            setMessage(value);
          },
        }}
      />
      <Controls
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <button
        class="bg-primary text-white px-10 py-2 rounded-md hover:bg-primaryd transition duration-200 ease-in-out"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

interface CardProps {
  backgroundColor?: string;
  name: {
    value: string;
    onChange: (value: string) => void;
  };
  title: {
    value: string;
    onChange: (value: string) => void;
  };
  message: {
    value: string;
    onChange: (value: string) => void;
  };
}

export const Card = ({ backgroundColor, name, title, message }: CardProps) => {
  const color = invertColor(backgroundColor, true);

  return (
    <div
      id={"card-maker-card"}
      className={
        "w-full sm:w-2/3 p-4 shadow-md flex flex-col gap-2 aspect-[5/3]"
      }
      style={{ background: backgroundColor, color }}
    >
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          class="bg-transparent"
          value={name.value}
          onInput={(e) => name.onChange(e.currentTarget.value)}
        />
      </div>
      <hr />
      <div>
        <input
          type="text"
          placeholder="Enter Title"
          class="bg-transparent w-full"
          value={title.value}
          onInput={(e) => title.onChange(e.currentTarget.value)}
        />
        <textarea
          class={"w-full my-4 bg-transparent resize-none h-[100px]"}
          placeholder="Enter your message"
          value={message.value}
          onInput={(e) => message.onChange(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

interface ControlsProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

export const Controls = ({
  backgroundColor,
  setBackgroundColor,
}: ControlsProps) => {
  return (
    <div class="flex flex-row gap-4">
      <div class={"flex flex-row items-center gap-2 py-1 px-3"}>
        <div
          class={"border-2 border-solid h-4 w-4"}
          style={{ background: backgroundColor }}
        ></div>
        <input
          type="text"
          placeholder={"Color"}
          class="bg-transparent"
          onInput={(e) => {
            setBackgroundColor(e.currentTarget.value);
          }}
          value={backgroundColor}
        />
      </div>
    </div>
  );
};

CardMaker.Card = Card;
CardMaker.Controls = Controls;
