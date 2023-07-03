import "react-native-gesture-handler";
import { Main } from "./src/index";
import { initialState, reducer, StateProvider } from "./src/context/RootContext";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaProvider } from "react-native-safe-area-context";

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

// import { registerRootComponent } from "expo";

function App() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <SafeAreaProvider>
                <Main />
            </SafeAreaProvider>
        </StateProvider>
    );
}

export default App;
// registerRootComponent(App);
