import { IconKey, IconSettings, IconTools } from "@tabler/icons-react";
import { FC } from "react";
import Branding from "../../../common/Branding";
import MainButton from "./MainButton";
import NavBarLink from "./NavBarLink";

const Navbar: FC = () => {
  return (
    <aside
      className="flex flex-col items-center gap-6 md:m-6 md:p-6
      shadow-inner self-stretch min-w-64 md:shadow-day-400 shadow-day-50
      rounded-t-3xl dark:shadow-night-500 md:rounded-3xl bg-day-100
      dark:bg-night-900 max-md:fixed bottom-0 left-0 right-0 z-30"
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
    </aside>
  );
};

export default Navbar;
