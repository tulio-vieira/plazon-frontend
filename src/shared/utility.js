export const DEFAULT_BANNER = '/images/default-banner.png';

export const DEFAULT_PROFILE_PIC = '/images/default-profile-picture.jpg';

export const convertDate = (dateString) => {
    return new Date(dateString.trim()).toDateString().replace(/^\S+\s/,'').replace(/ (?=\d{4})/, ', ');
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

export const VIDEO_VALIDATORS = [
    // youtube validator
    {
      // eslint-disable-next-line
      regex: /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
      embedUrl: 'https://www.youtube.com/embed/'
    },
    // vimeo validator
    {
      // eslint-disable-next-line
      regex: /^(?:https?:\/\/)?(?:www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i,
      embedUrl: 'https://player.vimeo.com/video/'
    }
  ];