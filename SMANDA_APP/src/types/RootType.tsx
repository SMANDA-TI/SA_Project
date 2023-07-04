import { ParamListBase, NavigatorScreenParams, RouteProp, CompositeScreenProps } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MappedPostData } from "./PostTypes";

export type RootStackScreen = {
    Welcome: undefined;
    GetStarted: undefined;
    "(tabs)": NavigatorScreenParams<RootTabScreen>;
    "(post)": {
        screen: PostScreenAvailable;
        params: {
            post_data: MappedPostData;
        };
    };
    "(overlay)": NavigatorScreenParams<RootOverlayScreen>;
    "(search)": { screen: SearchScreenAvailable };
};
export type RouteRootStackScreen = {
    Welcome: undefined;
    GetStarted: undefined;
    "(tabs)": NavigatorScreenParams<RootTabScreen>;
    "(post)": {
        post_data: MappedPostData;
    };
    "(overlay)": NavigatorScreenParams<RootOverlayScreen>;
    "(search)": { screen: SearchScreenAvailable };
};

export type TabScreenAvailable = "Home" | "School" | "Information" | "Settings";
export type OverlayScreenAvailable = "Account";
export type PostScreenAvailable = "PostOverview";
export type SearchScreenAvailable = "Search";
export type PostParamAvailable = "post_data";

export type RootTabScreen = {
    [Key in TabScreenAvailable]: undefined;
};
export type RootOverlayScreen = {
    [Key in OverlayScreenAvailable]: undefined;
};
export type RootPostScreen = {
    params: { post_data: MappedPostData };
};
// export type RootPostScreen = {
//     screen?: PostScreenAvailable;
//     post_data?: MappedPostData;
// };

// export type RootScreenProps<T extends keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
// export type RootScreenProps<T extends keyof RootStackScreen = keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
export type RoutePostProp = RouteProp<RouteRootStackScreen, "(post)">;
export type RootScreenProps = NativeStackScreenProps<RootStackScreen>;
export type DKRootScreenProps = NativeStackScreenProps<ParamListBase>;
export type typeUseNavigation = NativeStackNavigationProp<ParamListBase>;
export type NavigationProp = NativeStackNavigationProp<ParamListBase>;

export type PropsPost = {
    navigation?: NavigationProp;
    route?: RoutePostProp;
};
export type PropsOptional = {
    navigation?: NavigationProp;
    route?: RouteProp<RouteRootStackScreen>;
};
// export type typeUseNavigation = NativeStackNavigationProp<ParamListBase<RootStackScreen>>;
// export type RootStackScreenProps<T extends keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
