import { createContext, useContext, useMemo, useReducer } from "react";

export const PreferencesContext = createContext<any>(null);
export const StateContext = createContext<any>(null);

export type AvailableActionType = "GoDark" | "switchTheme";
export type ThemePropsReducerContext = {
    theme: "light" | "dark";
    isDarkMode: boolean;
};
export const initialState = {
    theme: "light",
    isDarkMode: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "GoDark":
            return {
                ...state,
                theme: "dark",
                isDarkMode: true,
            };
        case "switchTheme":
            return {
                ...state,
                theme: state.theme == "light" ? "dark" : "light",
                isDarkMode: !state.isDarkMode,
            };
        default:
            return {
                ...state,
            };
    }
};

export const StateProvider = ({ reducer, initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
    return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};
// export const useGlobals = (): { state: ThemePropsReducerContext; dispatch({type: [Key in AvailableType]: undefined }): void } => useContext(StateContext);
export const useGlobals = (): {
    state: ThemePropsReducerContext;
    dispatch: (action: { type: AvailableActionType }) => void;
} => useContext(StateContext);
