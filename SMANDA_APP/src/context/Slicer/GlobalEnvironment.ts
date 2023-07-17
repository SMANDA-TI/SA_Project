import { createSelector, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";

type ItemState = {
    theme: "light" | "dark";
    isDarkMode: boolean;
    isTransparent: boolean;
    ArticleIsDoubleFlat: boolean;
};

const initialState: ItemState = {
    theme: "light",
    isDarkMode: false,
    isTransparent: false,
    ArticleIsDoubleFlat: false,
};

const GlobalSlice = createSlice({
    initialState,
    name: "globals",
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            state.isDarkMode = !state.isDarkMode;
        },
        toggleTransparent: (state) => {
            state.isTransparent = !state.isTransparent;
        },
        toggleArticleBlock: (state) => {
            state.ArticleIsDoubleFlat = !state.ArticleIsDoubleFlat;
        },
    },
});

// export function getUseGlobal() {
//     return useAppSelector((state) => state.Global);
// }
export function getDarkMode() {
    return useAppSelector((state) => state.Global.isDarkMode);
}
export function getTheme() {
    return useAppSelector((state) => state.Global.theme);
}
export function getTransparent() {
    return useAppSelector((state) => state.Global.isTransparent);
}
export function getArticleIsDoubleFlat() {
    return useAppSelector((state) => state.Global.ArticleIsDoubleFlat);
}

export const { toggleArticleBlock, toggleTheme, toggleTransparent } = GlobalSlice.actions;

export default GlobalSlice.reducer;
