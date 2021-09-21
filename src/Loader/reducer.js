import {
    SET_LOADING,
} from '../_main/actionTypes';

export default function reducer(state = false, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                isLoading: payload,
            };
        default:
            return state;
    }
}
