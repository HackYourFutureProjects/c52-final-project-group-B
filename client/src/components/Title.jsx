import PropTypes from "prop-types";
import cn from "@/util/cn";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

const Title = ({ children, className, breadcrumbs }) => {
  return (
    <>
      <h1 className={cn("heading-title text-4xl font-bold", className)}>
        {children}
      </h1>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          underline="hover"
          classNames={{ base: "flex justify-center mt-2" }}
        >
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={index} href={crumb.path}>
              {crumb.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      )}
    </>
  );
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export default Title;
