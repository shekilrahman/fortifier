import LoadingScreen from "./LoadingScreen";
import { useState, useEffect } from "react";

export default function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading delay or wait for assets to load
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Adjust based on actual loading time

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
}
