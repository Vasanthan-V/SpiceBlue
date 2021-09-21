import { reducer as loader } from '../Loader';
import { ListReducer as trailList } from '../ListPage/reducer';
import { loginReducer as login } from '../Login/reducer';

const combineReducers = (slices) => (state, action) => Object.keys(slices).reduce(
    (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
    }),
    state,
);

export default combineReducers({
    loader,
    trailList,
    login,
});
