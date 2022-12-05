import { FC } from "react";
import { ImSpinner3 } from "react-icons/im";

type ClassProps = { size?: "small" | "medium" | "large" };

const Loading: FC<ClassProps> = (props) => {
  let sizeClass = "";
  switch (props.size) {
    case "small":
      sizeClass = "text-2xl";
      break;
    case "medium":
      sizeClass = "text-4xl";
      break;
    case "large":
      sizeClass = "text-6xl";
      break;
    default:
      sizeClass = "text-4xl sm:text-8xl";
  }

  return (
    <div
      className={`flex items-center mx-auto h-full text-center justify-center font-bold text-primary-default ${sizeClass} `}
    >
      <ImSpinner3 className="animate-spin" />
    </div>
  );
};
export default Loading;
