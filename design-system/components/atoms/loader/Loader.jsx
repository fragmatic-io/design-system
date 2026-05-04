import { LoadingOutlined } from "@ant-design/icons";

export const getCustomSpinner = (size = "default", color = "#b5d525") => {
  const sizeMap = {
    small: 16,
    default: 40,
    large: 64,
  };

  const finalSize =
    typeof size === "number" ? size : sizeMap[size] || sizeMap.default;

  return (
    <LoadingOutlined
      style={{
        fontSize: finalSize,
        color: color,
      }}
      spin
    />
  );
};

// Keep this as a React node so existing `indicator={customSpinner}` usage
// continues to render the branded green spinner across the app.
export const customSpinner = getCustomSpinner();

export const typingLoader = (
  <>
    <style jsx>{`
      @keyframes typingBounce {
        0%,
        80%,
        100% {
          transform: scale(0);
        }
        40% {
          transform: scale(1);
        }
      }
    `}</style>

    <div className="flex items-center justify-center gap-2 py-1">
      <span className="w-2 h-2 bg-[#b5d525] rounded-full animate-[typingBounce_1.4s_infinite_ease-in-out] [animation-delay:0ms]"></span>
      <span className="w-2 h-2 bg-[#b5d525] rounded-full animate-[typingBounce_1.4s_infinite_ease-in-out] [animation-delay:200ms]"></span>
      <span className="w-2 h-2 bg-[#b5d525] rounded-full animate-[typingBounce_1.4s_infinite_ease-in-out] [animation-delay:400ms]"></span>
    </div>
  </>
);
