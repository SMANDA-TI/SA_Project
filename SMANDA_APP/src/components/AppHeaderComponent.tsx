import { Appbar } from "react-native-paper";
import { TabScreenAvailable } from "../types/RootType";
// import { isDarkMode } from "../../App";
import { Props } from "../types/RootType";
import { useContext, useEffect, useReducer, useState } from "react";
import { PreferencesContext } from "../../App";
import { useGlobals } from "../backend/State";

// export function ThemeChange(): void {
//     const theme: Props = useContext(PreferencesContext);
//     theme.toggleTheme();
// }

export function AppHeaderComponent(props: { Title: TabScreenAvailable }) {
    const [isDark, setDark] = useState(false);
    const theme: Props = useContext(PreferencesContext);
    // const [state, dispatch] = useGlobals();
    return (
        <Appbar.Header mode={"center-aligned"}>
            {/* <Appbar.BackAction onPress={() => {}} /> */}
            {/* <Appbar.Action icon={Title == "Home" ? "account-circle-outline" : "account-question-outline"} size={30} onPress={() => {}} /> */}
            <Appbar.Action
                icon={theme.isDarkMode ? "moon-waning-crescent" : "white-balance-sunny"}
                size={30}
                onPress={() => {
                    // alert("im PRESSED");
                    setDark(() => !isDark);
                    // ThemeChange();
                    // alert(JSON.stringify(state));
                    theme.toggleTheme();
                }}
            />
            <Appbar.Content
                title={
                    props.Title == "Home"
                        ? "Beranda"
                        : props.Title == "Information"
                        ? "Informasi"
                        : props.Title == "Settings"
                        ? "Penggaturan"
                        : "Event"
                }
            />
            <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
    );
}
