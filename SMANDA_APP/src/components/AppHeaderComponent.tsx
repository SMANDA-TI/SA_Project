import { Appbar } from "react-native-paper";
import { TabScreenAvailable } from "../types/RootType";

export function AppHeaderComponent(Title: TabScreenAvailable) {
    return (
        <Appbar.Header mode={"center-aligned"}>
            {/* <Appbar.BackAction onPress={() => {}} /> */}
            <Appbar.Action icon={Title == "Home" ? "account-circle-outline" : "account-question-outline"} size={30} onPress={() => {}} />
            <Appbar.Content
                title={Title == "Home" ? "Beranda" : Title == "Information" ? "Informasi" : Title == "Settings" ? "Penggaturan" : "Event"}
            />
            <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
    );
}
