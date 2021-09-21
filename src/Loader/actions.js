import {
    SET_LOADING,
} from '../_main/actionTypes';

export function fetchLoading(value) {
    return {
        type: SET_LOADING,
        payload: value,
    };
}

export function setLoading(value) {
    return (dispatch) => {
        dispatch(fetchLoading(value));
    };
}

export default {
    setLoading,
};
