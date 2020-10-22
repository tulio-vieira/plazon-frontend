import React from 'react';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

const styles = (theme) => ({

});

export default function Post() {
  const classes = useStyles();

  return (
    <div >
      New Component
    </div>
  );
}

class NewComponent extends Component {

  render() {
    const classes = this.props.classes;
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default withStyles(styles)(NewComponent);