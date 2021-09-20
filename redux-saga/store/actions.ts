import { Action } from "redux";

export function action(type: string, payload = {}): Action {
    return { type, ...payload };
}

export const SET_ALL_DATA = 'SET_ALL_DATA';

export const setAllData = (response: any) => action(SET_ALL_DATA, { response });
