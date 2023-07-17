import { configureStore } from "@reduxjs/toolkit";
import GlobalSlice from "./Slicer/GlobalEnvironment";
import WPSlice from "./Slicer/WordpressProvider";
// ...

export const store = configureStore({
    reducer: {
        Global: GlobalSlice,
        WPData: WPSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
