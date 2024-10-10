import FarmListModel from "./FarmListModel.ts";

interface UserModel {
  userId: string;
  userName: string;
  userRole: string;
  farmList: FarmListModel[];
}

export default UserModel;
