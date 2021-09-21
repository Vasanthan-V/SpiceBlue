import {
    GET_TASK_LIST, CLEAR_LIST, POST_TASK, PUT_TASK,
} from '../_main/actionTypes';
import { setLoading } from '../Loader/actions';
import callFetch from '../_main/fetch';
import { parseJSON, stringifier } from '../_main/utils';

export function syncReducer(type, data) {
    return {
        type,
        payload: {
            data,
        },
    };
}

export function postTask(dispatch, request) {
    dispatch(setLoading(true));
    const url = `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=${localStorage.company_id}`;
    return callFetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: stringifier(request),
    })
        .then((res) => {
            dispatch(syncReducer(POST_TASK, request));
            dispatch(setLoading(false));
            return {
                isSuccess: true,
                result: res,
            };
        })
        .catch((error) => {
            parseJSON(error)
                .then((err) => {
                    dispatch(syncReducer(POST_TASK, err));
                    dispatch(setLoading(false));
                    return {
                        isSuccess: false,
                        error: err.message,
                    };
                })
                .catch((err) => console.log(err));
        });
}

export function updateTask(dispatch, request, task_id) {
    dispatch(setLoading(true));
    const url = `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task_id}?company_id=${localStorage.company_id}`;
    return callFetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: stringifier(request),
    })
        .then((res) => {
            dispatch(syncReducer(POST_TASK, request));
            dispatch(setLoading(false));
            return {
                isSuccess: true,
                result: res,
            };
        })
        .catch((error) => {
            parseJSON(error)
                .then((err) => {
                    dispatch(syncReducer(PUT_TASK, err));
                    dispatch(setLoading(false));
                    return {
                        isSuccess: false,
                        error: err.message,
                    };
                })
                .catch((err) => console.log(err));
        });
}

export function getTasks(dispatch) {
    const url = ` https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=${localStorage.company_id}`;
    return callFetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            dispatch(syncReducer(GET_TASK_LIST, res));
        })
        .catch((error) => {
            parseJSON(error)
                .then((err) => {
                    dispatch(syncReducer(GET_TASK_LIST, err));
                })
                .catch((err) => console.log(err));
        });
}

export function clearTask(dispatch, task_id) {
    const url = `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task_id}?company_id=${localStorage.company_id}`;
    return callFetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.company_id}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
        .then(() => {
            dispatch(syncReducer(CLEAR_LIST));
        })
        .catch(() => {
            parseJSON()
                .then(() => {
                    dispatch(syncReducer(CLEAR_LIST));
                })
                .catch((error) => console.log(error));
        });
}