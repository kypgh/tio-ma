import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import aLinks from "../config/aLinks";
import images from "../config/images";
import { Dflex } from "../styles/sharedstyles";
import ButtonPrimary from "./Buttons/ButtonPrimary";
import ReadOnly from "./ReadOnly";

const OpenAccount = ({
  label = "You don’t have any live accounts",
  btnMsg = "Open Live Account",
  isDemo = false,
}) => {
  const router = useRouter();

  return (
    <Dflex column style={{ gap: "15px" }}>
      <Image
        src={images.openAccountImage.src}
        width={100}
        height={70}
        alt={images.openAccountImage.alt}
      />
      <label>{label}</label>
      <ReadOnly url={aLinks.completeProfile}>
        <ButtonPrimary
          onClick={() => {
            router.push({
              pathname: aLinks.myaccount,
              query: { tab: isDemo ? "open-demo" : "open-live" },
            });
          }}
        >
          {btnMsg}
        </ButtonPrimary>
      </ReadOnly>
    </Dflex>
  );
};

export default OpenAccount;
