const dom = require('virtual-dom/h')
const diff = require('virtual-dom/diff')
const patch = require('virtual-dom/patch')
const createElement = require('virtual-dom/create-element')

// Base class to create components
module.exports.Component = class Component {
  constructor(root) {
    this.root = root
    this.tree = h('div', null)
    this.rootNode = createElement(this.tree)
    this.root.appendChild(this.rootNode)
    this.state = this.getInitialState()
    this.update()
    this.componentDidMount()
  }

  componentDidMount() {}

  setState(state) {
    this.state = Object.assign(this.state || {}, state)
    this.update()
  }

  update() {
    const newTree = this.render()
    const patches = diff(this.tree, newTree)
    this.rootNode = patch(this.rootNode, patches)
    this.tree = newTree
  }

  getInitialState() {
    return {}
  }

  render() {
    return null
  }
}

// Bridge function between what babel expects and virtual-dom needs
const h = (...args) => {
  const name = args[0]
  // In a real framework we would support nesting custom components
  if (typeof name !== 'string') {
    throw new Error('Nesting custom components is not supported')
    // In a real implementation it would be a function/class for another component
    // You should create an instance of it passing the attributes as props
    // and render the component
  } else {
    const children = args.slice(2).filter(x => x)
    const props = args[1] || {}
    const attrs = Object.keys(props).reduce(
      (attrs, name) => {
        if (name.startsWith('data-')) {
          attrs.attributes[name] = props[name]
        } else {
          attrs[name] = props[name]
        }
        return attrs
      },
      { attributes: {} }
    )
    return dom(name, attrs, children)
  }
}

module.exports.h = h
