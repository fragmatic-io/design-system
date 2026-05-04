import "./progressBar.css";

export const ProgressBar = ({ data, isDisplayData = true, color }) => {
  return (
    <div className="progress-bar">
      <progress
        value={data ? data : 0}
        max="100"
        style={{ "--color": color, width: "100%" }}
      ></progress>
      {isDisplayData && (
        <p className="progress-bar-data">{data ? data : 0}%</p>
      )}{" "}
    </div>
  );
};
