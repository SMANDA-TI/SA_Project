import { View, Button } from "react-native";
import { RootScreenProps } from "../../types/NavigationType";
import { Text } from "react-native-paper";

export function HomeScreen(props: RootScreenProps) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() =>
                    props.navigation.navigate("(tabs)", {
                        screen: "Details",
                    })
                }></Button>
            <Text>Welcome Screen</Text>
            <Button title="Preview to Welcome" onPress={() => props.navigation.navigate("Welcome")}></Button>
        </View>
    );
}
