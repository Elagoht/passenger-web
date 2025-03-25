import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Container from "../../../../components/layout/Container";
import { Title } from "../../../../components/ui/Typography";
import PreferencesForm from "../../../../forms/PreferencesForm";
import { getPreferences } from "../../../../services/preferences";
import { getWordlists } from "../../../../services/wordlists";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";

const PreferencesWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [settings, setSettings] = useState<Preference[]>();
  const [loading, setLoading] = useState(true);
  const [wordlists, setWordlists] = useState<WordlistCard[]>();

  useEffect(() => {
    setLoading(true);

    getPreferences(token)
      .then((settings) => setSettings(settings))
      .then(() =>
        getWordlists(token).then((wordlists) => setWordlists(wordlists)),
      )
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <Container className="gap-4">
      <Title>{dict.windows.preferences.title}</Title>

      {loading || !settings || !wordlists ? (
        <IconLoader className="animate-spin" />
      ) : (
        <PreferencesForm settings={settings} wordlists={wordlists} />
      )}
    </Container>
  );
};

export default PreferencesWindow;
