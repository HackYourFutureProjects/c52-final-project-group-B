import PropTypes from "prop-types";
import cn from "@/util/cn";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

const Title = ({ children, className, breadcrumbs }) => {
  return (
    <>
      <h1
        className={cn(
          "heading-title text-primary text-4xl font-bold capitalize",
          className
        )}
      >
        {children}
      </h1>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          underline="hover"
          classNames={{
            base: "flex justify-center mt-2",
            list: "flex justify-center",
          }}
        >
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem
              key={index}
              href={crumb.path}
              color={breadcrumbs.length - 1 === index ? "secondary" : "default"}
              className="capitalize"
              classNames={{ separator: "text-foreground" }}
            >
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
