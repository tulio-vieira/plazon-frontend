import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = (maxWidth) => makeStyles((theme) => ({
  embededContent: {
    position: 'relative',
    maxWidth: maxWidth,
    margin: '0 auto',
    overflow: 'hidden'
  },
  iframeContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%',
    height: 0,
    '& iframe': {
      borderRadius: 10,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: maxWidth*0.6
  }
}));

export default function EmbededContent({ contentUrl, isVideo, children, isSmall }) {
  const classes = useStyles(isSmall ? 500 : 800)();

  return (
    <div className={classes.embededContent}>

      {children}

      {isVideo ?
          <div className={classes.iframeContainer}>
            <iframe
              width="560"
              height="315"
              title='video'
              src={contentUrl} frameBorder="0" 
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        :
        <img className={classes.image} src={contentUrl} alt='Not found'/>
      }
      
    </div>
  );
}