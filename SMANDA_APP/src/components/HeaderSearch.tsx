import * as React from "react";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";
import { useAppDispatch } from "../context/hooks";
import { getDarkMode, toggleTheme } from "../context/Slicer/GlobalEnvironment";
import { RootStackScreenProps } from "../types/RootType";

type MenuVisibility = {
    [key: string]: boolean | undefined;
};

// const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const HeaderPostComp = ({ navigation, route }: RootStackScreenProps<"(search)">) => {
    const isDarkMode = getDarkMode();
    const dispatch = useAppDispatch();
    const [visible, setVisible] = React.useState<MenuVisibility>({});

    // const _toggleMenu = (name: string) => () => setVisible({ ...visible, [name]: !visible[name] });
    // const _getVisible = (name: string) => !!visible[name];
    const RippleKolor = "rgba(255, 255, 255, 0.3)";
    return (
        <Appbar.Header mode={"center-aligned"}>
            <Appbar.BackAction
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Appbar.Content title={"Pencarian"} />
            <Appbar.Action
                icon={isDarkMode ? "moon-waning-crescent" : "white-balance-sunny"}
                size={30}
                onPress={() => {
                    // alert("im PRESSED");
                    // alert(JSON.stringify(state));
                    dispatch(toggleTheme());
                }}
            />
        </Appbar.Header>
    );
};

export default HeaderPostComp;
