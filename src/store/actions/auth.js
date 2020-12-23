import axios from '../../axios-instance';
import * as actionTypes from './actionTypes';

const userFields = ['_id', 'name', 'username', 'profile_pic', 'banner_pic'];

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        currentUser: {
            ...user,
            profile_pic: user.profile_pic,
            banner_pic: user.banner_pic
        }
    };
}
;
const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        redirectMessage: 'Account successfully registered!'
    };
};

export const updatePictures = (profile_pic, banner_pic) => {
    return {
        type: actionTypes.UPDATE_PICTURES,
        profile_pic,
        banner_pic
    };
}

export const authFail = (errors) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errors
    };
};

export const logout = () => {
    [...userFields, 'token', 'expirationDate'].forEach(field => {
        localStorage.removeItem(field);
    });
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (authData, isRegister) => {
    
    return dispatch => {
        dispatch(authStart());
        const url = '/' + (isRegister ? 'register' : 'login');
        axios.post(url, authData)
            .then(res => {
                if (isRegister) return dispatch(registerSuccess());
                dispatch(authSuccess(res.data.token, res.data.user));
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('token', res.data.token);
                userFields.forEach(userField => {
                    localStorage.setItem(userField, res.data.user[userField]);
                });
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.errors));
            });
    };
};

// fix this
export const authCheckState = () => {
    return dispatch => {
        let currentUser = {};
        userFields.forEach(userField => {
            currentUser[userField] = localStorage.getItem(userField);
            if (!currentUser[userField]) return dispatch(logout());
        });
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (!token || !expirationDate || expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, currentUser));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 )); 
        }
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};