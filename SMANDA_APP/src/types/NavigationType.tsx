import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackScreen = {
    Home: undefined;
    Welcome: undefined;
    Details: undefined;
};

export type StackScreenProps = NativeStackScreenProps<RootStackScreen>;
export type typeUseNavigation = NativeStackNavigationProp<ParamListBase>;
// export type typeUseNavigaion = NativeStackNavigationProp<ParamListBase<RootStackScreen>>;
// export type RootStackScreenProps<T extends keyof RootStackScreen> = NativeStackScreenProps<RootStackScreen, T>;
