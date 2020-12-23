import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmbededContent from '../Comments/EmbededContent';

const useStyles = makeStyles((theme) => ({
  contentPreview: {
    border: '1px solid ' + theme.palette.text.secondary,
    padding: theme.spacing(2),
    borderRadius: 16,
    marginTop: theme.spacing(1)
  },
  closeIconContainer: {
    position: 'absolute',
    padding: 6,
    top: -6,
    right: -6,
    zIndex: 100,
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.mid,
    boxShadow: '0px 0px 2px 2px ' + theme.palette.background.mid
  },
  closeIcon: {
    padding: 5,
    color: 'white',
    backgroundColor: 'red',
    fontSize: 20,
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: '100%',
    borderRadius: '50%'
  }
}));

export default function ContentPreview({ contentUrl, isVideo, onClear }) {
  const classes = useStyles();

  return (
    <div className={classes.contentPreview}>

        <EmbededContent
          isSmall={true}
          contentUrl={contentUrl}
          isVideo={isVideo} >

          <div className={classes.closeIconContainer} onClick={onClear}>
            <div className={classes.closeIcon}>&#10006;</div>
          </div>

        </EmbededContent>
        
    </div>
  );
}