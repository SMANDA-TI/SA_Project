import { ParamListBase, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackScreen = {
    "(tabs)": NavigatorScreenParams<RootTabScreen>;
    Welcome: undefined;
};

export type RootTabScreen = {
    Home: undefined;
    Details: undefined;
};

export type RootScreenProps = NativeStackScreenProps<RootStackScreen>;
export type typeUseNavigation = NativeStackNavigationProp<ParamListBase>;
// export type typeUseNavigaion = NativeStackNavigationProp<ParamListBase<RootStackScreen>>;
// export type RootStackScreenProps<T extends keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
