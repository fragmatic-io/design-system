import icons from "../Icons/constants";
import "./profitLose.css";

export const ProfitLose = ({ prvData = 0, currentData = 0 }) => {
  let percentageChange;

  if (prvData === 0) {
    percentageChange = currentData === 0 ? 0 : 100;
  } else {
    percentageChange = ((currentData - prvData) / Math.abs(prvData)) * 100;
  }

  const isProfit = percentageChange >= 0;

  return (
    <div className={`frgm-profit ${isProfit ? "profit" : "lose"}`}>
      <p style={{ display: "flex", alignItems: "center" }}>
        {isProfit ? icons.arrowUpRight : icons.arrowDownRight}
        {percentageChange.toFixed(1)}%
      </p>
    </div>
  );
};
