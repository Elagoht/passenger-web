import { IconKey, IconSettings, IconTools } from "@tabler/icons-react";
import { FC } from "react";
import Branding from "../../../common/Branding";
import Box from "../../../ui/Box";
import MainButton from "./MainButton";
import NavBarLink from "./NavBarLink";

const Navbar: FC = () => {
  return (
    <Box
      orientation="vertical"
      padding="sm"
      shadow="outer"
      className="items-center gap-6 md:m-6 md:mr-0 md:p-6 self-stretch min-w-64
      max-md:fixed bottom-0 left-0 right-0 z-30 md:w-min"
    >
      <Branding size="small" className="max-md:hidden" />

      <nav
        className="md:flex-col flex w-full max-md:items-center
        justify-evenly gap-2"
      >
        <NavBarLink
          icon={IconKey}
          hiddenOnMobile
          label="Accounts"
          path="/accounts"
        />

        <NavBarLink icon={IconTools} label="Tools" path="/tools" />

        <MainButton />

        <NavBarLink icon={IconSettings} label="Settings" path="/settings" />
      </nav>
    </Box>
  );
};

export default Navbar;
