import {
    NavigatorScreenParams,
    CompositeScreenProps,
    NavigationProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MappedPostData } from "./PostTypes";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type BottomTabScreenAvailableParam = {
    Home: undefined;
    School: { scrollTo: "Filosofi" | "Denah" | "Lokasi" } | undefined;
    Information: undefined;
    Settings: undefined;
    Article: undefined;
};

export type BottomTabScreenAvailable = "Home" | "School" | "Information" | "Settings" | "Article";

export type RootStackScreenList = {
    Welcome: undefined;
    GetStarted: undefined;
    "(tabs)": NavigatorScreenParams<BottomTabScreenAvailableParam>;
    "(search)": NavigatorScreenParams<SearchAvailableScreenParam>;
    "(wordpress)": NavigatorScreenParams<WPAvailableScreenParam>;
};

export type SearchAvailableScreenParam = {
    Search: undefined;
};
export type WPAvailableScreenParam = {
    PostOverview: { post_data: MappedPostData } | undefined;
    GuruOverview: { post_data: MappedPostData } | undefined;
};

export type RootStackScreenProps<T extends keyof RootStackScreenList> = NativeStackScreenProps<
    RootStackScreenList,
    T
>;

export type RootTabScreenProps<T extends keyof BottomTabScreenAvailableParam> =
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabScreenAvailableParam, T>,
        RootStackScreenProps<keyof RootStackScreenList>
    >;
export type WPNestStackScreenProps<T extends keyof WPAvailableScreenParam> = CompositeScreenProps<
    NativeStackScreenProps<WPAvailableScreenParam, T>,
    RootStackScreenProps<keyof RootStackScreenList>
>;

export type useNavigationType = NavigationProp<RootStackScreenList>;

export type TabNavigationProps<T extends keyof BottomTabScreenAvailableParam> =
    NativeStackNavigationProp<BottomTabScreenAvailableParam, T>;
export type StackNavigationProps<T extends keyof RootStackScreenList> = NativeStackNavigationProp<
    RootStackScreenList,
    T
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackScreenList {}
    }
}
