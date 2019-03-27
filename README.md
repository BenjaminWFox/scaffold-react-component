# Scaffold Component README

This VSCode extension is an oppinionated way to scaffold new React Components.

## To use

After installation, right-clicking on a folder in the Explorer View will give you the option to make either a:

- New Class Component
- New Functional Component

It expects that the component name in PascalCase

`MyNewComponent`

For the folder & files, the PascalCase name will be transformed to lowercase with dashes

`my-new-component`

The folder/file structure is

```
my-new-component
- index.js
- my-new-component.js
- my-new-component.test.js
```

## Extension Settings

This extension contributes the following settings:

* `scaffoldreactcomponent.stringToReplace`: Use a custom string to inject the Component Name into the files. Default is XXXXXX.
* `scaffoldreactcomponent.pathToTemplates`: If you copy & modify the templates, add the path to your custom templates here.

### IMPORTANT

If you use custom templates, note that all four files should be present in your new directory.
Any instances of `stringToReplace` will be replaced with the new component name.

## Template File Nameing & Structure

`template-index.js`

```
import _ from './XXXXXX'

export default _
```

`template-component-test.js`

```
[ empty ]
```

`template-class-component.js`

```
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
  },
})

class XXXXXX extends React.Component {
  state = {
  }

  render() {
    const classes = useStyles()
  
    return (
      <div className={classes.root}></div>
    )
  }
}

XXXXXX.propTypes = {
}

export default XXXXXX
```

`template-functional-component.js`

```
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
  },
})

const XXXXXX = function XXXXXX({ }) {
  const classes = useStyles()

  return (
    <div className={classes.root}></div>
  )
}

XXXXXX.propTypes = {
}

export default XXXXXX
```
