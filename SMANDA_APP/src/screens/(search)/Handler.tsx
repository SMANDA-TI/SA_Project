import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchMapper from "./SearchMapper";
import HeaderSearch from "../../components/HeaderSearch";
import { RootStackScreenProps } from "../../types/RootType";

const Stack = createNativeStackNavigator();
export default function SearchStack(props: RootStackScreenProps<"(search)">) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"Search"}
                component={SearchMapper}
                options={{
                    header: (props) => (
                        <HeaderSearch
                            navigation={props.navigation as any}
                            route={props.route as any}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
