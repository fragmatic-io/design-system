import Image from "next/image";
import "./pill.css";
export const Pill = ({
  label,
  isActive = false,
  imageSrc,
  isIcon = false,
}) => {
  return (
    <div
      className={`pill px-6 py-3 ${isActive ? "" : "not-selected"}`}
    >
      {isIcon && <Image src={imageSrc} alt="icon" />}
      <p className="mx-1.5">{label}</p>
    </div>
  );
};
