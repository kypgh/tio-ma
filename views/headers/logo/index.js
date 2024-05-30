import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PUBLIC_PATHS } from "../../../config/enums";
import images from "../../../config/images";
import useWindowSize from "../../../utils/hooks/useWindowSize";

export default function Logo() {
  const { width } = useWindowSize();
  const { pathname, locale } = useRouter();
  const [url, setUrl] = useState("/");

  useEffect(() => {
    if (PUBLIC_PATHS.includes(pathname)) {
      setUrl(`${process.env.NEXT_PUBLIC_TIO_MARKETS_URL}/${locale}`);
    } else {
      setUrl("/");
    }
  }, [pathname, locale]);

  return (
    <>
      <Link
        href={{
          pathname: url,
        }}
      >
        <>
          {width &&
            (width > 991 ? (
              <Image
                src={images.logoDesktop.src}
                width={150}
                height={27}
                alt={images.logoDesktop.alt}
                priority="true"
              />
            ) : (
              <Image
                src={images.logoMobile.src}
                width={34}
                height={27}
                alt={images.logoMobile.alt}
                priority="true"
              />
            ))}
        </>
      </Link>
    </>
  );
}
