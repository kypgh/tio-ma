import { PUBLIC_PATHS } from "@/config/enums";
import { useCurrentUser } from "@/utils/hooks/queryHooks";
import useWindowSize from "@/utils/hooks/useWindowSize";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import useIsEligibleForTC from "@/utils/hooks/useIsEligibleForTC";

export default function Layout({ children, genericTranslations }) {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(width < 992);
  }, [width < 992]);

  const router = useRouter();
  const isPublicPath = PUBLIC_PATHS.includes(router.pathname);

  const { data } = useCurrentUser({
    enabled: !isPublicPath,
  });
  const isKycApproved = data?.flags?.kycStatus === "approved";

  // is eligible to view trading central
  const { isEligible } = useIsEligibleForTC();

  return (
    <>
      <Nav
        isMobile={isMobile}
        isPublicPath={isPublicPath}
        genericTranslations={genericTranslations}
        isKycApproved={isKycApproved}
        isEligible={isEligible}
      >
        {children}
      </Nav>
    </>
  );
}
