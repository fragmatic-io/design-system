import icons from "../Icons/constants";
import "./segmentStatus.css";

export const SegmentStatus = ({ status }) => {
  return (
    <div className={`segment-status ${status}`}>
      <p className="">{icons.dot}</p>
      <p>{status}</p>
    </div>
  );
};
