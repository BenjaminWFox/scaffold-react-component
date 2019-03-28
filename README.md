# Scaffold React Component

This VSCode extension is an oppinionated way to scaffold new React components.

## To use

After installation, right-clicking on a folder in the Explorer View will give you options for:

- New Class Component
- New Functional Component

It expects that the component name is PascalCase

`MyNewComponent`

For the folder & files, the PascalCase name will be transformed to lowercase with dashes

`my-new-component`

The folder/file structure is

```
my-new-component            // parent folder
- index.js                  // only for cleaner imports of the component elsewhere
- my-new-component.js       // component
- my-new-component.test.js  // for component tests
```

## Extension Settings

This extension has one setting for specifying a path to custom templates:

* `scaffoldreactcomponent.pathToTemplates`: If you copy & modify the templates, add the path to your custom template folder here.

### IMPORTANT

If you use custom templates, note that all four files should be present in your new directory.
Any instances of `stringToReplace` will be replaced with the new component name.

## Template File Naming & Structure

The default templates assumes you are using React, Material-UI, and PropTypes. It also assumes a bit about your ESLint setup.

### template-index.js

```
import _ from './XXXXXX'

export default _
```

### template-component-test.js

```
[ empty ]
```

### template-class-component.js

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

### template-functional-component.js

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
