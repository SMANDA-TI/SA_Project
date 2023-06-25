import { ParamListBase, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackScreen = {
    Welcome: undefined;
    GetStarted: undefined;
    "(tabs)": NavigatorScreenParams<RootTabScreen>;
    "(overlay)": NavigatorScreenParams<RootTabScreen>;
};

export type TabScreenAvailable = "Home" | "Event" | "Information" | "Settings";
export type OverlayScreenAvailable = "Account";

export type RootTabScreen = {
    [Key in TabScreenAvailable]: undefined;
};
export type RootOverlayScreen = {
    [Key in OverlayScreenAvailable]: undefined;
};

export type RootScreenProps = NativeStackScreenProps<RootStackScreen>;
export type typeUseNavigation = NativeStackNavigationProp<ParamListBase>;
// export type typeUseNavigaion = NativeStackNavigationProp<ParamListBase<RootStackScreen>>;
// export type RootStackScreenProps<T extends keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
