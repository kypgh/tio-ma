import { useState, useEffect } from "react";

function useDevice() {
  const [device, setDevice] = useState("unknown");

  useEffect(() => {
    var userAgent =
      navigator.userAgent ||
      navigator.vendor ||
      window.opera ||
      navigator.platform;

    if (/windows phone/i.test(userAgent)) {
      setDevice("win");
    } else if (/android/i.test(userAgent)) {
      setDevice("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setDevice("iOS");
    } else if (navigator.platform?.includes("Win")) {
      setDevice("win");
    } else {
      setDevice("unknown");
    }
  }, []);

  return device;
}

export default useDevice;
