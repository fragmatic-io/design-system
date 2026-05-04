import { Tooltip } from "antd";
import "./badge.css";

/**
 * Badge Component
 *
 * Displays a badge with icon, label, and optional tooltip.
 *
 * @param {Object} props
 * @param {string} props.status - active | inactive | profile | loss | idle | etc.
 * @param {ReactNode} props.icon - Icon element to display
 * @param {string} props.label - Text to show inside the badge
 * @param {boolean} [props.isIconLeft=true] - Whether icon appears on the left
 * @param {string} [props.onHoverMessage] - Tooltip message on hover (only applies when icon on right)
 */
export const Badge = ({
  status = "",
  icon,
  label,
  isIconLeft = true,
  onHoverMessage,
}) => {
  const normalizedStatus = status?.toLowerCase();
  const showPercent = ["profit", "loss", "none"].includes(normalizedStatus);

  const iconElement = (
    <span className={`badgeIcon ${normalizedStatus}`}>{icon}</span>
  );

  const iconWithTooltip = onHoverMessage ? (
    <Tooltip title={onHoverMessage}>{iconElement}</Tooltip>
  ) : (
    iconElement
  );

  if (icon) {
    return (
      <div className={`badge ${normalizedStatus}`}>
        {isIconLeft && iconWithTooltip}

        <p>
          {label}
          {showPercent && "%"}
        </p>

        {!isIconLeft && iconWithTooltip}
      </div>
    );
  }

  return (
    <div className={`badge ${label.toLowerCase()}`}>
      <p>{label}</p>
    </div>
  );
};
