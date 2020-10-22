import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    currentUser: {},
    errors: [],
    loading: false,
    redirectMessage: null,
    authRedirectPath: '/'
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return updateObject( state, { error: null, loading: true } );
        case actionTypes.AUTH_SUCCESS: return updateObject( state, { token: action.token, currentUser: action.currentUser, error: null, loading: false } );
        case actionTypes.AUTH_FAIL: return updateObject( state, { errors: action.errors, loading: false });
        case actionTypes.AUTH_LOGOUT: return updateObject(state, { token: null, currentUser: {} });
        case actionTypes.SET_AUTH_REDIRECT_PATH: return updateObject(state, { authRedirectPath: action.path, redirectMessage: action.redirectMessage })
        case actionTypes.CLEAR_ERRORS: return updateObject(state, { errors: [] });
        case actionTypes.CLEAR_REDIRECT_MESSAGE: return updateObject(state, { redirectMessage: null });
        case actionTypes.UPDATE_PICTURES: return {...state, currentUser: updateObject(state.currentUser, { profile_pic: action.profile_pic, banner_pic: action.banner_pic }) };
        default: return state;
    }
};

export default reducer;