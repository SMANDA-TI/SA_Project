import { createContext, useContext, useMemo, useReducer } from "react";
import { Post } from "../types/PostTypes";

export const PreferencesContext = createContext<any>(null);
export const StateContext = createContext<any>(null);

export type AvailableActionType = "GoDark" | "switchTheme" | "switchTp" | "populatePost" | "populatePostArtikel" | "setActivePost";
export type ThemePropsReducerContext = {
    theme: "light" | "dark";
    isDarkMode: boolean;
    isTransparent: boolean;
    data_SMANDA_APP: { artikel?: Post[]; activePost?: Post };
};
export const initialState: ThemePropsReducerContext = {
    theme: "light",
    isDarkMode: false,
    isTransparent: false,
    data_SMANDA_APP: {},
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
        case "switchTp":
            return {
                ...state,
                isTransparent: !state.isTransparent,
            };
        case "populatePost":
            return {
                ...state,
                data_SMANDA_APP: action.payload,
            };
        case "populatePostArtikel":
            return {
                ...state,
                data_SMANDA_APP: { artikel: action.payload },
            };
        case "setActivePost":
            return {
                ...state,
                data_SMANDA_APP: {
                    ...state.data_SMANDA_APP,
                    activePost: {
                        ...state.data_SMANDA_APP.activePost,
                        ...action.payload,
                    },
                },
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
    dispatch: (action: { type: AvailableActionType; payload?: object | any }) => void;
} => useContext(StateContext);
