import { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, useTheme } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { HomeScreen } from "./Home";
import { InformationScreen } from "./Information";
import { SchoolScreen } from "./School";
import { SettingsScreen } from "./Settings";
import { AppHeaderComponent } from "../../components/AppHeaderComponent";
import { RootStackScreenProps } from "../../types/RootType";
import { ArticleScreen } from "./Article";
// import * as NavigationBar from "expo-navigation-bar";

const Tab = createBottomTabNavigator();

export function MyTabs(props: RootStackScreenProps<"(tabs)">) {
    const tema = useTheme();
    // useEffect(() => {
    //     async () => {
    //         if (Platform.OS == "android") {
    //             try {
    //                 await NavigationBar.setBackgroundColorAsync(tema.colors.elevation.level2);
    //                 await NavigationBar.setBorderColorAsync("transparent");
    //                 await NavigationBar.setButtonStyleAsync(tema.dark ? "light" : "dark");
    //             } catch (e) {
    //                 // ignore error
    //             }
    //         } else return;
    //     };
    // }, [tema]);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    // compact={true}
                    // uncomment kalo mau inactive tabs jangan ada label text-nya, dan ada animation pas clicknya https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/BottomNavigationBar/#props
                    // shifting={true}
                    // style={{ marginHorizontal: 5 }}
                    navigationState={state}
                    safeAreaInsets={{ left: 5, right: 5, top: insets.top, bottom: insets.bottom }}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                ? options.title
                                : route.name;
                        // console.log(options);
                        return label as string;
                    }}
                />
            )}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Beranda",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="home" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="Home" />,
                }}
            />
            <Tab.Screen
                name="School"
                component={SchoolScreen}
                options={{
                    tabBarLabel: "Sekolah",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="school" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="School" />,
                }}
            />
            <Tab.Screen
                name="Information"
                component={InformationScreen}
                options={{
                    tabBarLabel: "Informasi",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="forum" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="Information" />,
                }}
            />
            <Tab.Screen
                name="Article"
                component={ArticleScreen}
                options={{
                    tabBarLabel: "Artikel",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <MaterialCommunityIcons
                                name="card-bulleted"
                                size={size}
                                color={color}
                            />
                        );
                    },
                    header: () => <AppHeaderComponent Title="Article" />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: "Pengaturan",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="cog" size={size} color={color} />;
                    },
                    header: () => <AppHeaderComponent Title="Settings" />,
                }}
            />
        </Tab.Navigator>
    );
}

// function HomeScreen() {
//     return (
//         <View style={styles.container}>
//             <Text variant="headlineMedium">Home!</Text>
//         </View>
//     );
// }

// function SettingsScreen() {
//     return (
//         <View style={styles.container}>
//             <Text variant="headlineMedium">Settings!</Text>
//         </View>
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
