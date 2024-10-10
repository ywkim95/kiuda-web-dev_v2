import ImageModel from "./ImageModel.ts";

type PaginationImageModel = {
  count: number;
  images: ImageModel[];
};
export default PaginationImageModel;
