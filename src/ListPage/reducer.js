/* eslint-disable indent */
import { POST_TASK, CLEAR_LIST, GET_TASK_LIST } from '../_main/actionTypes';

const initial = {
    list: { data: [], error: null },
    tasklist: { data: {}, error: null },
    tasklistGet: {data: {}, error: null},
    item: { data: [], error: null },
};
export function ListReducer(state = initial, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_TASK: {
            return {
                ...state,
                tasklist: {
                    data: payload.data,
                    error: payload.error,
                },
            };
        }
        case GET_TASK_LIST: {
            return {
                ...state,
                tasklistGet: {
                    data: payload.data.results,
                    error: payload.error,
                },
            };
        }
        case CLEAR_LIST: {
            return {
                ...state,
                list: {
                    data: [],
                    error: null,
                },
                tasklist: { data: {}, error: null },
                tasklistGet: { data: {}, error: null },
                item: {
                    data: [],
                    error: null,
                },
            };
        }
        default:
            return state;
    }
}