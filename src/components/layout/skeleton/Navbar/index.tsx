import { IconKey, IconSettings, IconTools } from "@tabler/icons-react";
import { FC } from "react";
import useDictStore from "../../../../stores/dict";
import Branding from "../../../common/Branding";
import { Paragraph, Title } from "../../../ui/Typography";
import MainButton from "./MainButton";
import NavBarLink from "./NavBarLink";

const Navbar: FC = () => {
  const { dict } = useDictStore();

  return (
    <div
      className="flex flex-col items-center gap-6 md:m-6 md:mr-0 md:p-6 self-stretch min-w-64
      max-md:fixed bottom-0 left-0 right-0 z-30 md:w-min bg-day-100
      dark:bg-night-900 rounded-t-2xl md:rounded-2xl"
    >
      <figure
        className="flex flex-col text-center items-center justify-center
        gap-2 max-md:hidden"
      >
        <Branding size="small" />

        <Title className="text-cream-500">{dict.branding.name}</Title>

        <Paragraph className="text-sm">{dict.branding.shortSlogan}</Paragraph>
      </figure>

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
    </div>
  );
};

export default Navbar;
