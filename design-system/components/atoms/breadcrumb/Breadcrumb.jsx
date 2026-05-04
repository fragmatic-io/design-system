import Link from "next/link";
import icons from "../../../components/Atoms/Icons/constants";
import "./breadcrumb.css";
export const Breadcrumb = ({
  breadcrumbPath = [{ label: "Overview", href: "#" }],
}) => {
  const path = breadcrumbPath.slice(-3);
  return (
    <nav className="frgm-breadcrumb" aria-label="Breadcrumb">
      <ol className="FRGM-flex items-center whitespace-nowrap">
        {path?.map((item, index) => {
          return index === path.length - 1 ? (
            <li
              className="inline-flex items-center "
              aria-current="page"
              key={index}
              style={{ textTransform: "capitalize" }}
            >
              {item?.label}
            </li>
          ) : (
            <li className="FRGM-flex items-center" key={index}>
              <Link
                className="FRGM-flex items-center text-sm"
                href={item?.href}
                style={{ textTransform: "capitalize", color: "#6F7C88" }}
              >
                {item?.label}
              </Link>
              {icons.chevronRight}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
