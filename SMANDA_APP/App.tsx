import "react-native-gesture-handler";
import { Main } from "./src/index";
import smandaStore from "./src/context/ReduxData";
// import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

// import { registerRootComponent } from "expo";

function App() {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    return (
        <Provider store={smandaStore}>
            <SafeAreaProvider>
                <Main />
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
// registerRootComponent(App);
