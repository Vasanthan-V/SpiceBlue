import fetchIntercept from 'fetch-intercept';

const unregister = fetchIntercept.register({
    request (url, config = {}) {
        // config.headers = config.headers || {};
        // config.headers['content-type'] = 'application/json';
        return [url, config];
    },

    requestError (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response (response) {
        // Modify the reponse object
        return response;
    },

    responseError (error) {
        // Handle an fetch error
        return Promise.reject(error);
    },
});

export default unregister;
