export const BASE_URL = 'http://127.0.0.1:3100';

export const DEFAULT_BANNER = BASE_URL + '/images/default-banner.jpg';

export const DEFAULT_PROFILE_PIC = BASE_URL + '/images/default-profile-picture.jpg';

// this attaches the base url to the picture if it is stored in the server
export const setPic = (picUrl) => {
    return picUrl[0] === '/' ? (BASE_URL + picUrl) : picUrl;
}

export const convertDate = (dateString) => {
    return new Date(dateString).toDateString().replace(/^\S+\s/,'').replace(/ (?=\d{4})/, ', ');
}

// UPDATE OBJECT NO UNDEFINED
export const updateObject = (oldObject, updatedProperties) => {
    let updatedPropsNoUndefined = {};
    for(let key in updatedProperties) {
        if (updatedProperties[key] !== undefined) updatedPropsNoUndefined[key] = updatedProperties[key];
    }
    return {
        ...oldObject,
        ...updatedPropsNoUndefined
    };
};

export const checkValidity = ( value, type ) => {
    if (value === '') return 'Required';
    switch(type) {
        case 'email':
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return pattern.test( value ) ? null : 'Invalid e-mail'
        case 'username':
            return value.match(/[^a-zA-z0-9]/g) ? 'Alpha-numeric characters only' : null;
        case 'name':
            return value.match(/[ ]{2}|[^a-zA-z0-9 ]/g) ? 'Alpha-numeric characters or single spaces only' : null;
        default:
            return null;
    }
}