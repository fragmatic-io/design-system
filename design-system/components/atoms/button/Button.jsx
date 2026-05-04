import PropTypes from "prop-types";
import icons from "../Icons/constants";
import "./button.css";
import Image from "next/image";
import { useState } from "react";

// pass onHoverColorChange to toggle onHover on the button
// pass hoverBackgroundColor to change the background color on hover
export const Button = ({
  isIcon = false,
  icon = icons.anchor,
  label = "Button",
  backgroundColor,
  textColor = "#000",
  background = true,
  isImage = false,
  imageSrc,
  position = "left",
  disabled = false,
  onclick = () => {},
  style = {},
  isLoading = false,
  isDropdown = false,
  hoverBackgroundColor = "#059669",
  onHoverColorChange = false,
  type,
  className = "",
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <button
        onMouseEnter={() => !disabled && setIsHover(true)}
        onMouseLeave={() => !disabled && setIsHover(false)}
        style={{
          backgroundColor: background
            ? isHover && onHoverColorChange
              ? hoverBackgroundColor || backgroundColor
              : backgroundColor
            : "transparent",
          color: textColor,
          border: background ? `1px solid #E5E5E5` : "none",
          ...style,
        }}
        className={`button border grow-anim text-white rounded ${
          !background ? "no_background" : ""
        } ${isLoading ? "loading" : ""} ${disabled ? " !cursor-not-allowed" : ""} ${className}`}
        disabled={disabled}
        onClick={disabled ? undefined : onclick}
        {...(type ? { type } : {})}
      >
        {position === "right" && label}
        {isIcon && <span style={{ color: textColor }}>{icon}</span>}
        {isImage && <Image src={imageSrc} alt="icon" />}
        {position === "left" && label}
        {isDropdown && <span>{icons.chevronDown}</span>}
      </button>
    </>
  );
};

Button.propTypes = {
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  background: PropTypes.bool,
};
