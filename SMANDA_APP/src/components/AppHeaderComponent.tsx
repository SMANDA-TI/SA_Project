import { Appbar } from "react-native-paper";
import { useNavigationType, BottomTabScreenAvailable } from "../types/RootType";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../context/hooks";
import { getDarkMode, toggleTheme } from "../context/Slicer/GlobalEnvironment";
type JustTitle = {
    Title: BottomTabScreenAvailable;
};
export function AppHeaderComponent({ Title }: JustTitle) {
    const dispatch = useAppDispatch();
    const isDarkMode = getDarkMode();
    const navigation = useNavigation<useNavigationType>();
    return (
        <Appbar.Header mode={"center-aligned"}>
            {/* <Appbar.BackAction onPress={() => {}} /> */}
            {/* <Appbar.Action icon={Title == "Home" ? "account-circle-outline" : "account-question-outline"} size={30} onPress={() => {}} /> */}
            {Title === "Home" ? null : (
                <Appbar.BackAction
                    onPress={() => navigation.navigate("(tabs)", { screen: "Home" })}
                />
            )}
            <Appbar.Content
                title={
                    Title == "Home"
                        ? "Beranda"
                        : Title == "Information"
                        ? "Informasi"
                        : Title == "Settings"
                        ? "Pengaturan"
                        : Title == "School"
                        ? "Sekolah"
                        : "Artikel"
                }
            />
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
}
