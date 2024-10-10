import { http, HttpResponse } from "msw";
import { apiRoutes, apiUrl } from "../http/routes.ts";

type LoginRequestBody = {
  id: string;
  password: string;
  autoLogin?: boolean;
};

const handler = [
  http.post(apiRoutes.LOGIN, async ({ request }) => {
    const { id, password, autoLogin }: LoginRequestBody =
      (await request.json()) as LoginRequestBody;

    if (!id || !password)
      throw new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
        headers: {},
      });

    if (id === "test" && password === "test") {
      console.log(autoLogin);
      return HttpResponse.json(
        { message: "로그인 성공!" },
        {
          status: 200,
          statusText: "Success",
          headers: {
            "Set-Cookie": "token=1234; Path=/; HttpOnly; SameSite=Strict",
          },
        },
      );
    } else {
      throw new HttpResponse(null, {
        status: 404,
        statusText: "Not Found",
        headers: {},
      });
    }
  }),
  http.post(apiRoutes.LOGOUT, ({ request }) => {
    const token = request.headers.get("Cookie");

    if (!token || token !== "token=1234")
      throw new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
        headers: {},
      });

    return HttpResponse.json(
      { message: "로그아웃 성공!" },
      {
        status: 200,
        statusText: "Success",
        headers: {
          "Set-Cookie": "token=; Path=/; HttpOnly; SameSite=Strict",
        },
      },
    );
  }),
  http.get(`${apiUrl}${apiRoutes.FARM_LIST}`, ({ request }) => {
    const token = request.headers.get("Cookie");

    if (!token || token !== "token=1234")
      throw new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
        headers: {},
      });

    return HttpResponse.json(
      {
        id: "test",
        name: "포도연구소",
        role_id: "USER",
        farmList: [
          {
            id: 1,
            alias: "포도농장",
            farm_address: {
              sig_code: "11",
              emd_code: "110",
            },
          },
          {
            id: 2,
            alias: "사과농장",
            farm_address: {
              sig_code: "11",
              emd_code: "110",
            },
          },
        ],
      },
      {
        status: 200,
        statusText: "Success",
      },
    );
  }),
  http.get(`${apiUrl}${apiRoutes.MAIN}`, ({ params }) => {
    const { farmId } = params as { farmId: string };
    if (farmId !== "2" && farmId !== "1") {
      throw new HttpResponse(null, {
        status: 404,
        statusText: "Not Found",
        headers: {},
      });
    } else {
      return HttpResponse.json({
        id: farmId,
        alias: "포도농장",
        sector_row: 4,
        sector_col: 3,
        farm_address: {
          sig_code: "11",
          emd_code: "110",
        },
        farm_entranceList: [
          {
            id: 1,
            directionId: 1,
            position_number: 1,
          },
          {
            id: 2,
            directionId: 4,
            position_number: 3,
          },
          {
            id: 3,
            directionId: 2,
            position_number: 1,
          },
        ],
        farm_sectorList: [
          {
            id: 1,
            farmSectorRow: "1",
            farmSectorCol: "1",
            alias: null,
            sensorList: [
              {
                id: 1,
                sensor_spec: {
                  min: -40,
                  max: 60,
                  revision: 0,
                  name: "토양온도",
                  unit: "℃",
                  measurement_target: "Soil",
                },
                sensor_alarm_setting: {
                  min: -40,
                  max: 60,
                  revision: 0,
                },
              },
              {
                id: 2,
                sensor_spec: {
                  min: 0,
                  max: 100,
                  revision: 0,
                  name: "토양습도",
                  unit: "%",
                  measurement_target: "Soil",
                },
                sensor_alarm_setting: {
                  min: 0,
                  max: 100,
                  revision: 0,
                },
              },
            ],
          },
          {
            id: 2,
            farmSectorRow: "1",
            farmSectorCol: "2",
            alias: null,
            sensorList: [
              {
                id: 3,
                sensor_spec: {
                  min: 0,
                  max: 100,
                  revision: 0,
                  name: "대기습도",
                  unit: "%",
                  measurement_target: "Air",
                },
                sensor_alarm_setting: {
                  min: 0,
                  max: 100,
                  revision: 0,
                },
              },
              {
                id: 4,
                sensor_spec: {
                  min: -40,
                  max: 60,
                  revision: 0,
                  name: "대기온도",
                  unit: "℃",
                  measurement_target: "Air",
                },
                sensor_alarm_setting: {
                  min: -40,
                  max: 60,
                  revision: 0,
                },
              },
            ],
          },
        ],
        alarmList: [
          {
            sensor_id: 1,
            time: "2021-09-01T00:00:00",
            value: 61,
            level: 1,
          },
          {
            sensor_id: 2,
            time: "2021-09-01T00:00:00",
            value: 101,
            level: 1,
          },
          {
            sensor_id: 2,
            time: "2021-09-01T00:00:00",
            value: 103,
            level: 1,
          },
        ],
      });
    }
  }),
  http.get(`${apiUrl}${apiRoutes.VALUE}`, ({ cookies }) => {
    const token = cookies.toString().includes("token=1234");

    if (!token) {
      throw new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
        headers: {},
      });
    }

    return HttpResponse.json(
      {
        sensorList: [
          {
            sensor_id: 1,
            time: "2021-09-01T00:00:00",
            value: 61,
          },
          {
            sensor_id: 2,
            time: "2021-09-01T00:00:00",
            value: 101,
          },
        ],
      },
      {
        status: 200,
        statusText: "Success",
      },
    );
  }),
  http.get(
    `${apiUrl}${apiRoutes.VALUE_FROM_SPEC}?startDate=2024-04-23&endDate=2024-04-24`,
    ({ cookies }) => {
      const token = cookies.toString().includes("token=1234");

      if (!token) {
        throw new HttpResponse(null, {
          status: 401,
          statusText: "Unauthorized",
          headers: {},
        });
      }

      return HttpResponse.json({
        sensorList: [
          {
            sensor_id: 1,
            valueList: [
              {
                time: "2024-04-23",
                value: 1.3,
              },
              {
                time: "2024-04-24",
                value: 1.5,
              },
            ],
          },
          {
            sensor_id: 2,
            valueList: [
              {
                time: "2024-04-23",
                value: 12,
              },
              {
                time: "2024-04-24",
                value: 13,
              },
            ],
          },
        ],
      });
    },
  ),
  http.get(
    `${apiUrl}${apiRoutes.IMAGE}?startDate=2024-04-23&endDate=2024-04-23&cameraList=1,2&timeList=000,001`,
    ({ cookies }) => {
      const token = cookies.toString().includes("token=1234");

      if (!token) {
        throw new HttpResponse(null, {
          status: 401,
          statusText: "Unauthorized",
          headers: {},
        });
      }

      return HttpResponse.json({
        cameraList: [
          {
            id: 1,
            alias: null,
          },
          {
            id: 2,
            alias: null,
          },
        ],
        imageList: [
          {
            capture_time: "2024-04-23T00:00:00",
            capture_img_name: "1_20240423_000_RGB.jpg",
          },
          {
            capture_time: "2024-04-23T00:00:00",
            capture_img_name: "1_20240423_000_NIR1.jpg",
          },
          {
            capture_time: "2024-04-23T00:00:00",
            capture_img_name: "1_20240423_000_NIR2.jpg",
          },
          {
            capture_time: "2024-04-23T01:00:00",
            capture_img_name: "1_20240423_010_RGB.jpg",
          },
          {
            capture_time: "2024-04-23T01:00:00",
            capture_img_name: "1_20240423_010_NIR1.jpg",
          },
          {
            capture_time: "2024-04-23T01:00:00",
            capture_img_name: "1_20240423_010_NIR2.jpg",
          },
          {
            capture_time: "2024-04-23T00:00:00",
            capture_img_name: "2_20240423_000_RGB.jpg",
          },
          {
            capture_time: "2024-04-23T00:00:00",
            capture_img_name: "2_20240423_000_NIR1.jpg",
          },
          {
            capture_time: "2024-04-23T00:00:00",
            capture_img_name: "2_20240423_000_NIR2.jpg",
          },
          {
            capture_time: "2024-04-23T01:00:00",
            capture_img_name: "2_20240423_010_RGB.jpg",
          },
          {
            capture_time: "2024-04-23T01:00:00",
            capture_img_name: "2_20240423_010_NIR1.jpg",
          },
          {
            capture_time: "2024-04-23T01:00:00",
            capture_img_name: "2_20240423_010_NIR2.jpg",
          },
        ],
      });
    },
  ),
];

export default handler;
