import { ImageInfo, ImageType } from "../constant/type.ts";
import { get12HourFormat, getFormattedDate } from "../constant/date.ts";
import ImageModel from "../models/Image/ImageModel.ts";

export const parseValue = <T extends Record<string, string | number>>(
    enumObj: T,
    value: string,
): T[keyof T] | undefined => {
    const keys = Object.keys(enumObj).filter((k) => isNaN(Number(k)));

    for (const key of keys) {
        if (key === value) {
            return enumObj[key as keyof T];
        }
    }

    return undefined;
};

export const extractImageInfo = (image: ImageModel): ImageInfo => {
    const [imageChannel, cameraId, name] = image.base64Image.split("_");
    const stringToDate = new Date(image.captureTime);
    const date = getFormattedDate(stringToDate);
    const time = get12HourFormat(stringToDate);
    const parseCameraId = parseInt(cameraId);
    const parseImageChannel = parseValue(ImageType, imageChannel);
    return {
        name,
        cameraId: parseCameraId,
        imageChannel: parseImageChannel,
        date,
        time,
    };
};

export const areListsEqual = <T>(list1: T[], list2: T[]) => {
    if (list1.length !== list2.length) {
        return false;
    }

    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) {
            return false;
        }
    }

    return true;
};

export const imageDownload = (
    url: string,
    sectorName: string,
    type: string,
    time: string,
) => {
    const name = `${sectorName}_${time}_${type}.jpg`;

    const link = document.createElement("a");
    link.href = url;
    link.download = name;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
};

export const calculateStep = (min: number, max: number) => {
    const range = max - min;

    if (range < 1) {
        return 0.01;
    } else if (range < 10) {
        return 0.1;
    } else if (range < 100) {
        return 1;
    } else if (range < 1000) {
        return 10;
    } else if (range < 10000) {
        return 100;
    } else {
        return 1000;
    }
};

export const idSort = <T extends {id: number}>(models: Array<T>) => {
    return models.sort((a, b) => a.id - b.id);
};

export const dateSort = <T extends {time: string}>(models: T[]) => {
    return models.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateB.getTime() - dateA.getTime();
    });
}