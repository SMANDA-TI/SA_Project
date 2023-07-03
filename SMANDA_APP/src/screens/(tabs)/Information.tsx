import { View, SafeAreaView } from "react-native";
import { RootScreenProps, typeUseNavigation } from "../../types/RootType";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "react-native-paper";
import { useGlobals } from "../../context/RootContext";

export function InformationScreen(props: RootScreenProps) {
    // const nav = useNavigation<typeUseNavigation>();
    const { state, dispatch } = useGlobals();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Informasi!</Text>
                <Button
                    onPress={() => {
                        props.navigation.navigate("(post)");
                    }}>
                    Click
                </Button>
            </View>
        </SafeAreaView>
    );
}
