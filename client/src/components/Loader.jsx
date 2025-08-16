import { Spinner } from "@heroui/react";

const Loader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
};

export default Loader;
