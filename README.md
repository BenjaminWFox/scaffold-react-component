# Scaffold React Component

This VSCode extension adds two context menu items in the Explorer view to quickly create React components.

## To use

After installation, right-clicking on a folder in the Explorer View will give you options for:

- New Class Component
- New Functional Component

Selecting either option brings up an input where you can enter your component name. It expects that the component name is PascalCase:

`MyNewComponent`

For the folder & files, the PascalCase name will be transformed to lowercase with dashes

`my-new-component`

The folder/file structure created by default is:

```
my-new-component            // parent folder
- index.js                  // for cleaner imports of the component elsewhere
- my-new-component.js       // component
- my-new-component.test.js  // for component tests
```

## Extension Settings

This extension has one setting for specifying a path to custom templates:

* `scaffoldreactcomponent.pathToTemplates`: If you copy & modify the templates, add the path to your custom template folder here.

Use `__StubComponentName__` in your custom templates in place of the intended component name. 

In a custom template folder you may omit (or leave empty) the index & test files, if desired.

## Template File Naming & Structure

The default templates assumes you are using React and PropTypes, and testing with Jest.

### template-index.js

```
import _ from './__StubComponentName__'

export default _
```

### template-component-test.js

```
import __StubComponentName__ from '.'

describe('The __StubComponentName__ component', () => {
  // TODO: Implement a real test
  it('Should import successfully', () => {    
    console.warn('TODO: Implement a real test', __StubComponentName__)

    expect(__StubComponentName__).toBeDefined()
  })
})
```

### template-class-component.js

```
import React from 'react'
import PropTypes from 'prop-types'

class __StubComponentName__ extends React.Component {
  state = {}

  render() {
    return (
      <div>content</div>
    )
  }
}

__StubComponentName__.propTypes = {}

export default __StubComponentName__
```

### template-functional-component.js

```
import React from 'react'
import PropTypes from 'prop-types'

const __StubComponentName__ = function __StubComponentName__() {
  return (
    <div>content</div>
  )
}

__StubComponentName__.propTypes = {}

export default __StubComponentName__
```
