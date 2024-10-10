import Section from "../../components/Section.tsx";
import Layout from "../../components/Layout.tsx";
import AlarmContainer from "./components/Alarm/AlarmContainer.tsx";
import CameraContainer from "./components/Camera/CameraContainer.tsx";
import WeatherContainer from "./components/Weather/WeatherContainer.tsx";
import SectorContainer from "./components/Sector/SectorContainer.tsx";
import GlobalContainer from "./components/Global/GlobalContainer.tsx";
import LoadingPage from "../Loading/Loading.tsx";
import useFarmLoader from "../../hooks/useFarmLoader.tsx";
import ErrorComponent from "../Error/ErrorComponent.tsx";

const HomePage = () => {
  const { data: farm, isPending, error, isError } = useFarmLoader();

  let content;

  if (isPending) {
    content = <LoadingPage />;
  }

  if (isError) {
    content = (
        <ErrorComponent
            error={error}
            className="h(100%) w(1240) pack bg(--color-background)"
        />
    );
  }

  if (farm) {
    const address = farm.address;
    content = (
      <>
        <Layout className="h(100%) w(450) gap(24) vbox">
          <AlarmContainer alarms={farm.sectorAlarms} sectors={farm.sectors} />
          <Section height="383" className="clip">
            <CameraContainer cameras={farm.cameras} images={farm.images} />
          </Section>
          <Section height="321">
            <WeatherContainer
              sigCode={address.sigCode}
              emdCode={address.emdCode}
            />
          </Section>
        </Layout>
        <Layout className="h(100%) w(766) gap(24) vbox">
          <Section height="431">
            <SectorContainer />
          </Section>
          <Section height="353" className="p(25) relative">
            <GlobalContainer globalSensors={farm.globalSensors} />
          </Section>
        </Layout>
      </>
    );
  }

  return <>{content}</>;
};

export default HomePage;
