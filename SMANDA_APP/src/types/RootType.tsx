import { ParamListBase, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackScreen = {
    Welcome: undefined;
    GetStarted: undefined;
    "(tabs)": NavigatorScreenParams<RootTabScreen>;
    "(post)": NavigatorScreenParams<RootPostScreen>;
    "(overlay)": NavigatorScreenParams<RootOverlayScreen>;
};

export type TabScreenAvailable = "Home" | "Event" | "Information" | "Settings";
export type OverlayScreenAvailable = "Account";
// export type PostScreenAvailable = "Post";

export type RootTabScreen = {
    [Key in TabScreenAvailable]: undefined;
};
export type RootOverlayScreen = {
    [Key in OverlayScreenAvailable]: undefined;
};
export type RootPostScreen = {
    [key: string]: undefined;
};

// export type RootScreenProps<T extends keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
export type RootScreenProps<T extends keyof RootStackScreen = keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
export type typeUseNavigation = NativeStackNavigationProp<ParamListBase>;
// export type typeUseNavigaion = NativeStackNavigationProp<ParamListBase<RootStackScreen>>;
// export type RootStackScreenProps<T extends keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
