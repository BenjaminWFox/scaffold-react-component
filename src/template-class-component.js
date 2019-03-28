import React from 'react'
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

const styles = {
  root: {
  },
}

class __StubComponentName__ extends React.Component {
  state = {
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>content</div>
    )
  }
}

__StubComponentName__.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(__StubComponentName__)
