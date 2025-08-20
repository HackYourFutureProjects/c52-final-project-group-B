import { Spinner } from "@heroui/react";

const Loader = () => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
};

export default Loader;
