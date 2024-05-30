import { useEffect, useState } from "react";

function useIsCookiesEnabled() {
  const [isCookiesEnabled, setIsCookiesEnabled] = useState(false);
  useEffect(() => {
    if (navigator.cookieEnabled) {
      setIsCookiesEnabled(true);
    }
  }, []);
  return isCookiesEnabled;
}

export default useIsCookiesEnabled;
