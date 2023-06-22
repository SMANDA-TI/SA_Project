import { View, Button } from "react-native";
import { RootScreenProps, typeUseNavigation } from "../../types/RootType";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";

export function InformationScreen(props: RootScreenProps) {
    // const nav = useNavigation<typeUseNavigation>();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Informasi!</Text>
            <Button title="Go Back" onPress={() => props.navigation.goBack()}></Button>
            <Text>Welcome Screen</Text>
            <Button title="Preview to Welcome Again" onPress={() => props.navigation.navigate("Welcome")}></Button>
        </View>
    );
}
