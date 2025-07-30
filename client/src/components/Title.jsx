import PropTypes from "prop-types";

const Title = ({ children, classes }) => {
  return (
    <h1 className={classes ? classes : "heading-title text-4xl font-bold"}>
      {children}
    </h1>
  );
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default Title;
