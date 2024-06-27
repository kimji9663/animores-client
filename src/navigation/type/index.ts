import { IProfile } from "../../../types/Profile";
import { ScreenName } from "../../statics/constants/ScreenName"

export type RootStackParamList = {
    [ScreenName.Login]: undefined;
    [ScreenName.Join]: undefined;
    [ScreenName.JoinCompleted]: undefined;
    [ScreenName.CreateDiary]: undefined;
    [ScreenName.AddTodo]: undefined;
	[ScreenName.PatManagement]: undefined;
	[ScreenName.PetType]: undefined;
	[ScreenName.BreedType]: undefined;
	[ScreenName.AddPet]: undefined;
	[ScreenName.Mypage]: undefined;
	[ScreenName.Home]: { profile: IProfile };
	[ScreenName.Profiles]: undefined;
	[ScreenName.CreateProfile]: undefined;
}