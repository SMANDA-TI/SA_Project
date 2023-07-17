import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostScreen from "./PostMapper";
import GuruScreen from "./GuruMapper";
import HeaderPostComp from "../../components/HeaderPost";
import HeaderGuruComp from "../../components/HeaderGuru";
import { WPAvailableScreenParam } from "../../types/RootType";

const Stack = createNativeStackNavigator<WPAvailableScreenParam>();
export default function WordPressStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"PostOverview"}
                component={PostScreen}
                options={{
                    header: (props) => (
                        <HeaderPostComp
                            navigation={props.navigation as any}
                            route={props.route as any}
                        />
                    ),
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name={"GuruOverview"}
                component={GuruScreen}
                options={{
                    header: (props) => <HeaderGuruComp navigation={props.navigation as any} />,
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
