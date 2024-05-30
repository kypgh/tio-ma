import { CardTitle, VCard } from "./videoCard.style";
import Image from "next/image";

export default function Videocard({ vsrc, valt, vtitle, vstate, mState, vid }) {
  const stateUpdate = () => {
    vstate(true);
    mState(vid);
  };
  return (
    <>
      <VCard className="btn" onClick={stateUpdate}>
        <Image src={vsrc} alt={valt} width={240} height={136} />
        <CardTitle>{vtitle}</CardTitle>
      </VCard>
    </>
  );
}
