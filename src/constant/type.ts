import UserModel from "../models/User/UserModel.ts";

export type SliderDataType = {
  id: number;
  name: string;
  unit: string;
  min: number;
  max: number;
  revision: number;
  userMin: number;
  userMax: number;
};

export type dateOptionsType = {
  func: () => { start: string; end: string } | string;
  text: string;
};

export type globalListType = {
  global: boolean;
} & listType;

export type listType = {
  name: string;
  value: number;
  checked: boolean;
};

export interface AlarmRowType {
  alarmType: string | number;
  date: string;
  time: string;
  sectorName: string;
  sensorType: string;
  alarmStandard: string | number;
  sensorValue: string;
  overValue: string;
}

export enum AlarmType {
  "주의 필요",
  "주의",
  "매우 위험",
}

export enum ImageType {
  RGB,
  NIR1,
  NIR2,
}

export type DateType = {
  start: string;
  end: string;
};

export type RootLoaderData = {
  farms: UserModel;
};

export interface ChevronArrowIconProps {
  height?: string;
  width?: string;
  isOver?: boolean;
}

export interface EntranceArrowIconProps {
  color?: string;
  iconSize?: string;
}

export interface FormIconProps {
  isSelected: boolean;
}

export type EachSectorSettingType = {
  id: number;
  modified: boolean;
  fold: boolean;
};

export type CameraItem = {
  id: number;
  alias: string;
  selected: boolean;
};

export type ImageInfo = {
  name: string;
  cameraId: number;
  imageChannel: ImageType | undefined;
  date: string;
  time: string;
};

export type CaptureInfoType = {
  captureId: number;
  captureTime: string;
  base64Image: string;
  selected: boolean;
};

export type DownloadInfoType = {
  cameraId: number;
  selected: boolean;
  images: CaptureInfoType[];
};

export type EachSettingType = {
  id: number;
  modified: boolean;
  fold: boolean;
};
