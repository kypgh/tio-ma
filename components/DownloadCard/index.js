import { DCard, CardTitle } from "./downloadCard.style";
import Link from "next/link";
import Image from "next/image";
import ButtonSecondary from "../Buttons/ButtonSecondary";
import ButtonPrimary from "../Buttons/ButtonPrimary";

export default function Downloadcard({ dsrc, dalt, dtitle, durl, dbtntext }) {
  return (
    <>
      <DCard>
        <Image src={dsrc} alt={dalt} width={120} height={120} />
        <CardTitle>{dtitle}</CardTitle>
        <Link href={durl} target="_blank" download>
          <ButtonSecondary
            width={"100px"}
            size={"10px"}
            weight={700}
            style={{
              margin: "0px auto",
            }}
          >
            {dbtntext}
          </ButtonSecondary>
        </Link>
      </DCard>
    </>
  );
}
