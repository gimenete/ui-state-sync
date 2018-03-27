const { Component, h } = require('./component')

class AddressList extends Component {
  getInitialState() {
    return {
      addresses: []
    }
  }

  componentDidMount() {
    this.input = this.root.querySelector('input')

    // event handlers
    this.root.addEventListener('submit', e => {
      e.preventDefault()
      const address = this.input.value
      this.input.value = ''
      this.addAddress(address)
    })

    this.root.addEventListener('click', e => {
      const id = e.target.getAttribute('data-delete-id')
      if (!id) return // user clicked in something else
      this.removeAddress(id)
    })
  }

  render() {
    return (
      <div>
        <form>
          <input />
        </form>
        {this.state.addresses.length === 0 && (
          <p class="help">Type an email address and hit enter</p>
        )}
        <ul>
          {this.state.addresses.map(addr => (
            <li key={addr.id}>
              <a data-delete-id={addr.id}>delete</a>
              <span>{addr.address}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  addAddress(address) {
    const id = String(Date.now())
    this.setState({
      addresses: this.state.addresses.concat({ address, id })
    })
  }

  removeAddress(id) {
    this.setState({
      addresses: this.state.addresses.filter(item => item.id !== id)
    })
  }
}

const root = document.getElementById('addressList')
new AddressList(root)
