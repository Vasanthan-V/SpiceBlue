import {
    GET_USER,
    CLEAR_USER,
    GET_USERID,
    GET_USERDETAIL,
} from '../_main/actionTypes';

const initial = {
    item: { data: {}, error: null },
    list: { userID: [], error: null },
};

export function loginReducer(state = initial, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USER: {
            return {
                ...state,
                item: {
                    data: payload.data,
                    error: payload.error,
                },
            };
        }
        case CLEAR_USER: {
            return {
                ...state,
                item: {
                    data: null,
                    error: null,
                },
            };
        }
        case GET_USERID: {
            return {
                ...state,
                list: {
                    userID: payload.data.results,
                    error: payload.error,
                },
            };
        }
        case GET_USERDETAIL: {
            return {
                ...state,
                list: {
                    userDetails: payload.data.results.data,
                    error: payload.error,
                },
            };
        }
        default:
            return state;
    }
}
