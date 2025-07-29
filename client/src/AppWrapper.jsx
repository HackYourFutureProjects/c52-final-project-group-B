import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import Navigator from "./components/Navigator";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper = ({ children }) => {
  return (
    <HeroUIProvider>
      <Navigator />
      <main className="light text-foreground bg-background">
        <Router>{children}</Router>
      </main>
    </HeroUIProvider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
