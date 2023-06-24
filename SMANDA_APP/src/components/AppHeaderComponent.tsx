import { Appbar } from "react-native-paper";
import { TabScreenAvailable } from "../types/RootType";
import { useGlobals } from "../context/RootContext";

export function AppHeaderComponent(props: { Title: TabScreenAvailable }) {
    const { state, dispatch } = useGlobals();
    return (
        <Appbar.Header mode={"center-aligned"}>
            {/* <Appbar.BackAction onPress={() => {}} /> */}
            {/* <Appbar.Action icon={Title == "Home" ? "account-circle-outline" : "account-question-outline"} size={30} onPress={() => {}} /> */}
            <Appbar.Action
                icon={state.isDarkMode ? "moon-waning-crescent" : "white-balance-sunny"}
                size={30}
                onPress={() => {
                    // alert("im PRESSED");
                    // alert(JSON.stringify(state));
                    dispatch({ type: "switchTheme" });
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
