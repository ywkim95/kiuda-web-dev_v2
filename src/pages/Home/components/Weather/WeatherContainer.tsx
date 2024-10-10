import Span from "../../../../components/Span.tsx";
import { fontSize, fontWeight } from "../../../../constant/font.ts";
import P from "../../../../components/P.tsx";
import WeatherMain from "./components/WeatherMain.tsx";
import ForecastList from "./components/ForecastList.tsx";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "../../../../http/http.ts";
import LoadingButton from "../../../Loading/LoadingButton.tsx";
import { FC } from "react";
import ErrorComponent from "../../../Error/ErrorComponent.tsx";
import { oneHour } from "../../../../constant/date.ts";

interface WeatherContainerProps {
    sigCode: string;
    emdCode: string;
}

const WeatherContainer: FC<WeatherContainerProps> = ({ sigCode, emdCode }) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["weather", { sigCode, emdCode }],
        queryFn: ({ signal }) => getWeatherData({ signal, sigCode, emdCode }),
        gcTime: 1000 * 60 * 60,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: oneHour,
    });

    let content;

    if (isPending) {
        content = (
            <div className="h(271) w(100%) pack">
                <LoadingButton />
            </div>
        );
    }

    if (isError) {
        content = (
            <ErrorComponent
                className="h(321) w(100%) pack bg(white)"
                error={error}
            />
        );
    }

    if (data) {
        const { items, nowWeather, emd, sd, sig } = data;
        const { temp, humidity, sky, pty } = nowWeather;
        content = (
            <>
                <div className="hbox(top) space-between  pb(15)">
                    <div className="vbox">
                        <div>
                            <Span
                                fontWeight={fontWeight.BOLD}
                                fontSize={fontSize.ExtraBIG}
                            >
                                {/* 실제 주소 매핑 */}
                                {emd}{" "}
                                <Span>
                                    {sd} {sig}
                                </Span>
                            </Span>
                        </div>
                        <div className="hbox(top) pt(8) gap(10)">
                            <Span
                                fontWeight={fontWeight.BOLD}
                                fontSize={66}
                                color="--color-primary"
                            >
                                {temp}°
                            </Span>
                            <div className="vbox gap(4) pt(8)">
                                <div className="vbox gap(3)">
                                    <P fontSize={fontSize.SMALL}>습도</P>
                                    <P
                                        color="--color-primary"
                                        fontWeight={fontWeight.BOLD}
                                    >
                                        {humidity}%
                                    </P>
                                </div>
                                <P
                                    fontSize={fontSize.BIG}
                                    fontWeight={fontWeight.BOLD}
                                >
                                    {sky}
                                    {pty !== "" ? `/ ${pty}` : ""}
                                </P>
                            </div>
                        </div>
                    </div>
                    <WeatherMain sky={sky} />
                </div>
                <ForecastList items={items} />
            </>
        );
    }

    return <div className="vbox h(100%) pt(50) px(30)">{content}</div>;
};

export default WeatherContainer;
