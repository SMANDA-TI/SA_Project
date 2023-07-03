import { DefaultTheme as NavigationLightTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { adaptNavigationTheme, configureFonts, MD3DarkTheme, MD3LightTheme, useTheme } from "react-native-paper";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationLightTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const SMANDA_LIGHT = {
    colors: {
        primary: "rgb(0, 106, 106)",
        onPrimary: "rgb(255, 255, 255)",
        primaryContainer: "rgb(0, 251, 251)",
        onPrimaryContainer: "rgb(0, 32, 32)",
        secondary: "rgb(74, 99, 99)",
        onSecondary: "rgb(255, 255, 255)",
        secondaryContainer: "rgb(204, 232, 231)",
        onSecondaryContainer: "rgb(5, 31, 31)",
        tertiary: "rgb(75, 96, 124)",
        onTertiary: "rgb(255, 255, 255)",
        tertiaryContainer: "rgb(211, 228, 255)",
        onTertiaryContainer: "rgb(4, 28, 53)",
        error: "rgb(186, 26, 26)",
        onError: "rgb(255, 255, 255)",
        errorContainer: "rgb(255, 218, 214)",
        onErrorContainer: "rgb(65, 0, 2)",
        background: "rgb(250, 253, 252)",
        onBackground: "rgb(25, 28, 28)",
        surface: "rgb(250, 253, 252)",
        onSurface: "rgb(25, 28, 28)",
        surfaceVariant: "rgb(218, 229, 228)",
        onSurfaceVariant: "rgb(63, 73, 72)",
        outline: "rgb(111, 121, 121)",
        outlineVariant: "rgb(190, 201, 200)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(45, 49, 49)",
        inverseOnSurface: "rgb(239, 241, 240)",
        inversePrimary: "rgb(0, 221, 221)",
        elevation: {
            level0: "transparent",
            level1: "rgb(238, 246, 245)",
            level2: "rgb(230, 241, 240)",
            level3: "rgb(223, 237, 236)",
            level4: "rgb(220, 235, 235)",
            level5: "rgb(215, 232, 232)",
        },
        surfaceDisabled: "rgba(25, 28, 28, 0.12)",
        onSurfaceDisabled: "rgba(25, 28, 28, 0.38)",
        backdrop: "rgba(41, 50, 50, 0.4)",
    },
};

export const SMANDA_DARK = {
    colors: {
        primary: "rgb(0, 221, 221)",
        onPrimary: "rgb(0, 55, 55)",
        primaryContainer: "rgb(0, 79, 79)",
        onPrimaryContainer: "rgb(0, 251, 251)",
        secondary: "rgb(176, 204, 203)",
        onSecondary: "rgb(27, 53, 52)",
        secondaryContainer: "rgb(50, 75, 75)",
        onSecondaryContainer: "rgb(204, 232, 231)",
        tertiary: "rgb(179, 200, 232)",
        onTertiary: "rgb(28, 49, 75)",
        tertiaryContainer: "rgb(51, 72, 99)",
        onTertiaryContainer: "rgb(211, 228, 255)",
        error: "rgb(255, 180, 171)",
        onError: "rgb(105, 0, 5)",
        errorContainer: "rgb(147, 0, 10)",
        onErrorContainer: "rgb(255, 180, 171)",
        background: "rgb(25, 28, 28)",
        onBackground: "rgb(224, 227, 226)",
        surface: "rgb(25, 28, 28)",
        onSurface: "rgb(224, 227, 226)",
        surfaceVariant: "rgb(63, 73, 72)",
        onSurfaceVariant: "rgb(190, 201, 200)",
        outline: "rgb(136, 147, 146)",
        outlineVariant: "rgb(63, 73, 72)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(224, 227, 226)",
        inverseOnSurface: "rgb(45, 49, 49)",
        inversePrimary: "rgb(0, 106, 106)",
        elevation: {
            level0: "transparent",
            level1: "rgb(24, 38, 38)",
            level2: "rgb(23, 43, 43)",
            level3: "rgb(22, 49, 49)",
            level4: "rgb(22, 51, 51)",
            level5: "rgb(22, 55, 55)",
        },
        surfaceDisabled: "rgba(224, 227, 226, 0.12)",
        onSurfaceDisabled: "rgba(224, 227, 226, 0.38)",
        backdrop: "rgba(41, 50, 50, 0.4)",
    },
};

const OrangeDark = {
    colors: {
        primary: "rgb(255, 185, 92)",
        onPrimary: "rgb(70, 42, 0)",
        primaryContainer: "rgb(101, 62, 0)",
        onPrimaryContainer: "rgb(255, 221, 183)",
        secondary: "rgb(223, 194, 162)",
        onSecondary: "rgb(63, 45, 23)",
        secondaryContainer: "rgb(87, 67, 43)",
        onSecondaryContainer: "rgb(252, 222, 188)", // Button
        tertiary: "rgb(186, 205, 159)",
        onTertiary: "rgb(38, 53, 20)",
        tertiaryContainer: "rgb(60, 76, 40)",
        onTertiaryContainer: "rgb(214, 233, 185)",
        error: "rgb(255, 180, 171)",
        onError: "rgb(105, 0, 5)",
        errorContainer: "rgb(147, 0, 10)",
        onErrorContainer: "rgb(255, 180, 171)",
        background: "rgb(31, 27, 22)", // Background
        onBackground: "rgb(235, 225, 217)", // Text
        surface: "rgb(31, 27, 22)",
        onSurface: "rgb(235, 225, 217)", // Text
        surfaceVariant: "rgb(80, 69, 57)",
        onSurfaceVariant: "rgb(212, 196, 181)",
        outline: "rgb(156, 142, 128)",
        outlineVariant: "rgb(80, 69, 57)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(235, 225, 217)", // Text
        inverseOnSurface: "rgb(53, 47, 42)",
        inversePrimary: "rgb(133, 84, 0)",
        elevation: {
            level0: "transparent",
            level1: "rgb(42, 35, 26)",
            level2: "rgb(49, 40, 28)",
            level3: "rgb(56, 44, 30)",
            level4: "rgb(58, 46, 30)",
            level5: "rgb(62, 49, 32)",
        },
        surfaceDisabled: "rgba(235, 225, 217, 0.12)",
        onSurfaceDisabled: "rgba(235, 225, 217, 0.38)",
        backdrop: "rgba(56, 47, 36, 0.4)",
    },
};

export const PaperDarkThemeCombined = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...SMANDA_LIGHT.colors,
    },
};
export const PaperLightThemeCombined = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...SMANDA_LIGHT.colors,
    },
};
export const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
        ...SMANDA_LIGHT.colors,
    },
};

export const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
        ...SMANDA_DARK.colors,
        // ...OrangeDark.colors,
    },
    // fonts: configureFonts()
};
// Implementasi palsu
// const isDarkMode = () => useTheme().dark;
// export const WhatsTheme = useTheme().dark;
// export const NowThemeNav = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
// export const NowPaperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
