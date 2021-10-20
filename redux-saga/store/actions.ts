import { Action } from "redux";

export const actionTypes = {
}

export function action(type: string, payload = {}): Action {
    return { type, ...payload };
}

export const SET_ALL_DATA_SCHEMA = 'SET_ALL_DATA_SCHEMA';

export const SET_ALL_SSRDATA = 'SET_ALL_SSRDATA';
export const setSSRInfo = (data: any) => action(SET_ALL_SSRDATA, { data });

export const setAllDataAC = (entityName: string, response: any) => {
    return action(SET_ALL_DATA_SCHEMA, { entityName, response });
};