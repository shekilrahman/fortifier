import LoadingScreen from "./LoadingScreen";
import { useState } from "react";

export default function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
      setIsLoading(false);
    };

    return (
      <>
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        {!isLoading && <WrappedComponent {...props} />}
      </>
    );
  };
}