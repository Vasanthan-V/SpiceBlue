import { GET_USER, CLEAR_USER, GET_USERID, GET_USERDETAIL } from '../_main/actionTypes';
import { setLoading } from '../Loader/actions';
import callFetch from '../_main/fetch';
import { parseJSON, stringifier } from '../_main/utils';

export function setUser(error, data) {
    return {
        type: GET_USER,
        payload: {
            error,
            data,
        },
    };
}
export function syncReducer(type, data) {
    return {
        type,
        payload: {
            data,
        },
    };
}
export function clearUser() {
    delete localStorage.user;
    return {
        type: CLEAR_USER,
    };
}

export function getUser(request, dispatch) {
    dispatch(setLoading(true));
    const url = 'https://stage.api.sloovi.com/login';
    return callFetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: stringifier(request),
    })
        .then((res) => {
            dispatch(setUser(null, res));
            dispatch(setLoading(false));
            localStorage.token = res.results.token;
            localStorage.user_id = res.results.user_id;
            localStorage.user_company_id = res.results.company_id;
            localStorage.company_id = 'company_0336d06ff0ec4b3b9306ddc288482663';
            localStorage.icon = res.results.icon;
            return {
                isSuccess: true,
                result: res,
            };
        })
        .catch((error) => {
            parseJSON(error)
                .then((err) => {
                    dispatch(setUser(err, null));
                    dispatch(setLoading(false));
                    return {
                        isSuccess: false,
                        error: err.message,
                    };
                })
                .catch((err) => console.log(err));
        });
}

export function getuserid(dispatch) {
    dispatch(setLoading(true));
    const url = `https://stage.api.sloovi.com/user?company_id=${localStorage.user_company_id}&product=outreach`;
    return callFetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',     
        },
    })
        .then((res) => {
            dispatch(syncReducer(GET_USERID, res));
        })
        .catch((error) => {
            parseJSON(error)
                .then((err) => {
                    dispatch(syncReducer(GET_USERID, err));
                })
                .catch((err) => console.log(err));
        });
}

export function getuserDetails(dispatch) {
    dispatch(setLoading(true));
    const url = `https://stage.api.sloovi.com/team?company_id=${localStorage.user_company_id}&product=outreach`;
    return callFetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        },
    })
        .then((res) => {
            dispatch(syncReducer(GET_USERDETAIL, res));
        })
        .catch((error) => {
            parseJSON(error)
                .then((err) => {
                    dispatch(syncReducer(GET_USERDETAIL, err));
                })
                .catch((err) => console.log(err));
        });
}