import React, { memo } from "react";
import withBase from "hocs/withBase";
import { Link } from "react-router-dom";
import icons from "ultils/icons";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const { MdOutlineKeyboardArrowRight } = icons;

const Breadcrumbs = ({ title, category, product, location }) => {
  const routes = [
    { path: "/", breadcrumb: "home" },
    { path: `/${location.pathname.split("/")[1]}`, breadcrumb: product },
    {
      path: "/products/:category",
      breadcrumb: category?.toLowerCase(),
    },
    {
      path: "/products/:category/:pid/:title",
      breadcrumb: title?.toLowerCase(),
    },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center gap-1">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="flex items-center gap-1"
          >
            <span className="capitalize hover:text-blue-500 transition-all">
              {breadcrumb}
            </span>
            {index !== self.length - 1 && <MdOutlineKeyboardArrowRight />}
          </Link>
        ))}
    </div>
  );
};

export default withBase(memo(Breadcrumbs));
