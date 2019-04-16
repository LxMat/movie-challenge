import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: "100%",
  },
  slider: {
    padding: '22px 0px',
  },
};

class StepSlider extends React.Component {
    /*
  state = {
    value: 3,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  */

  render() {
    const { classes } = this.props;
    //const { value } = this.state;
    console.log(this.props.value)
    return (
      <div className={classes.root}>
        <Slider
          classes={{ container: classes.slider }}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={(this.props.max-this.props.min)/this.props.steps}
          onChange={this.props.onchange}
        />
      </div>
    );
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepSlider);
