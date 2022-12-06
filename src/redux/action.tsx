import { ADD_ITEM } from "./constants";

export const additem = (b: string) => {
    return {
        type: ADD_ITEM,
        b: b
    }
}