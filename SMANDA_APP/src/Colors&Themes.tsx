import { DefaultTheme as NavigationLightTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationLightTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
    },
};

const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
    },
};

// Implementasi palsu
const isDarkMode = true;
export const NowThemeNav = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
export const NowPaperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
