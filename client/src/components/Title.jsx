import PropTypes from "prop-types";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

const Title = ({ children, classes, breadcrumbs }) => {
  return (
    <>
      <h1 className={classes ?? "heading-title text-4xl font-bold"}>
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
  classes: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export default Title;
