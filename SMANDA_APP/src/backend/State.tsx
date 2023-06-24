import React, { createContext, useContext, useReducer } from "react";

/**
 * @param state
 * @param action
 * @returns {{isAuthenticated: boolean}|{theme: *}|{theme: *, isAuthenticated: boolean, user: {}}}
 */
export const reducer = (state, action) => {
    switch (action.type) {
        case "switchTheme":
            return {
                ...state,
                theme: action.theme,
            };
        default:
            return {
                ...state,
            };
    }
};

export const initialState = {
    theme: "light",
    showLoader: false,
};

/**
 * @type {React.Context<{session: {number: null, sex: null, name: null, sign: null, language: string, relationship: null, birthDate: null, notifications: boolean}, theme: string, showLoader: boolean, day: string}>}
 */
export const StateContext = createContext(null);

/**
 * Provider
 * @param reducer
 * @param initialState
 * @param children
 * @returns {*}
 * @constructor
 */
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

/**
 * @returns {{theme: string}}
 */
export const useGlobals = () => useContext(StateContext);
