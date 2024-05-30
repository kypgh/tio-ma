import { IoMdNotifications } from "react-icons/io";
import { Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";

export default function Notification() {
  return (
    <>
      <Dflex style={{ cursor: "pointer" }}>
        <IoMdNotifications color={theme.colors.mainWhite} size={20} />
      </Dflex>
    </>
  );
}
