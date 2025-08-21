import PropTypes from "prop-types";
import { useNavigate, useHref } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import UserProvider from "@/provider/UserProvider";
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider placement="top-right" toastOffset={25} />
      <UserProvider>
        <main className="flex min-h-screen flex-col items-center px-4 xl:px-0">
          <Navigator />
          <div className="container flex-1">{children}</div>
          <Footer />
        </main>
      </UserProvider>
    </HeroUIProvider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
