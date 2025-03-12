import classNames from "classnames"
import { FC, useState } from "react"
import Branding from "../../../components/common/Branding"
import Button from "../../../components/ui/Button"
import { Paragraph, Title } from "../../../components/ui/Typography"
import InitializeForm from "../../../forms/InitializeForm"
import useDictStore from "../../../stores/dict"

const InitializeWindow: FC = () => {
  const { dict } = useDictStore()

  const [isStarted, setIsStarted] = useState<boolean>(false)

  return <div className="flex flex-col min-h-screen justify-center w-full
    bg-day-200 dark:bg-night-400"
  >
    <div className="relative inset-0 w-full bg-cover bg-left
      transition-all duration-1000 ease-in-out"
      style={{
        opacity: isStarted ? 0 : 1,
        paddingTop: isStarted ? "0" : "75%",
        backgroundImage: `url(/assets/images/onboarding.webp)`
      }}
    >
      <div className="inset-0 absolute bg-gradient-to-t from-day-200
        dark:from-night-400 to-transparent backdrop-blur-sm"
      />

    </div>

    <div className="flex flex-col grow text-center
      bg-day-200 dark:bg-night-400"
    >
      <Branding size={
        isStarted ? "medium" : "large"
      } className={classNames(
        "relative transition-all duration-1000 ease-in-out", {
        "-mt-24": !isStarted
      })} />

      <div className="flex flex-col grow p-6">
        <Title className="text-cream-500 relative">
          {isStarted
            ? dict.windows.initialize.register.title
            : dict.branding.name
          }
        </Title>

        <Paragraph className="text-cream-600 my-4 relative italic grow">
          {isStarted
            ? dict.windows.initialize.register.description
            : dict.branding.slogan
          }
        </Paragraph>

        {isStarted && <InitializeForm />}

        {!isStarted &&
          <Button
            className="relative transition-all
            duration-1000 ease-in-out"
            onClick={() => setIsStarted(true)}
          >
            {dict.windows.initialize.welcome.start}
          </Button>
        }
      </div>
    </div>
  </div>
}

export default InitializeWindow