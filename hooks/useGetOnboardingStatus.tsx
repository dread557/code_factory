import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetOnboardingStatus = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);
  return {
    isFirstLaunch: isFirstLaunch,
  };
};

export default useGetOnboardingStatus;
