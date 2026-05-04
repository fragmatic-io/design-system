import icons from "@/components/Atoms/Icons/constants";

const trendConfig = {
  up: { icon: icons.arrowUpBig },
  down: { icon: icons.arrowDownBig },
  same: { icon: icons.arrowRightBig },
};

const highlightClasses = {
  up: "bg-[#F7FEE7] text-[#4D7C0F]",
  down: "bg-[#FEF2F2] text-[#B91C1C]",
};

const truncateWithTooltip = (v, max = 15, visible = 15) => {
  if (typeof v !== "string") return { text: v, tooltip: undefined };

  if (v.length <= max || visible >= v.length) {
    return { text: v, tooltip: undefined };
  }

  return {
    text: `${v.slice(0, visible)}...`,
    tooltip: v,
  };
};

const capitalize = (v) =>
  typeof v === "string"
    ? v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : v;

const MetaPill = ({ label, value, trend, highlight }) => {
  const trendData = trendConfig[trend];
  const bgClass = highlightClasses[highlight] ?? "";

  const formattedValue = capitalize(value) || "N/A";
  const { text, tooltip } = truncateWithTooltip(formattedValue);

  return (
    <div className="flex flex-col h-full text-sm">
      <span className="text-neutral-500 whitespace-nowrap">
        {capitalize(label) || "N/A"}
      </span>

      <div className="flex flex-1 items-center">
        <span
          className={`relative inline-flex items-center gap-1 font-medium px-3 py-0.5 rounded-full hover:cursor-pointer ${bgClass}`}
          title={tooltip}
        >
          {trendData && (
            <span className="absolute -left-[1rem]">{trendData.icon}</span>
          )}
          <span className="flex justify-center text-center" title={tooltip}>
            {text}
          </span>
        </span>
      </div>
    </div>
  );
};

export default MetaPill;
