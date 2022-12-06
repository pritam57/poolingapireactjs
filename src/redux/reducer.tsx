import { ADD_ITEM } from "./constants";

export const addingitem = (data = "json", action: any) => {
    switch (action.type) {
        case ADD_ITEM:
            return data = action.b;

        default:
            return data;

    }
}