import "react-native-gesture-handler";
import { Main } from "./src/index";
import { initialState, reducer, StateProvider } from "./src/context/RootContext";
// import { registerRootComponent } from "expo";

function App() {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Main />
        </StateProvider>
    );
}

export default App;
// registerRootComponent(App);
