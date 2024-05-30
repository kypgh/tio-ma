import { CgMenuGridO } from "react-icons/cg";
import { Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";

export default function Explorer() {
  return (
    <>
      <Dflex style={{ cursor: "pointer" }}>
        <CgMenuGridO color={theme.colors.mainWhite} size={22} />
      </Dflex>
    </>
  );
}
