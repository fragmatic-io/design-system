import Image from "next/image";
import "./linkButton.css";
import Link from "next/link";

export const LinkButton = ({
  label = "link title",
  imageSrc,
  imageAlt = "image alt",
  href = "#",
}) => {
  return (
    <div className="link-button">
      {imageSrc && <Image src={imageSrc} alt={imageAlt} />}
      <Link href={href}>{label}</Link>
    </div>
  );
};
