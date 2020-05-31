import { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

class Container extends Component {
  constructor(props, context) {
    super(props, context)

    this.el = document.createElement('div')
    this.closer = document.createElement('div')
    this.modalContent = document.createElement('div')

    this.modalContent.className = 'content'
    this.el.className = 'popupModal'
    this.closer.className = 'closer'
    this.closer.onclick = () => {
      this.props.onClose()
    }
  }

  componentWillMount() {
    document.body.style.overflow = 'hidden'
  }

  componentDidMount() {
    document.body.appendChild(this.el)
    this.el.appendChild(this.closer)
    this.el.appendChild(this.modalContent)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
    document.body.style.overflow = 'auto'
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.modalContent)
  }
}

Container.defaultProps = {
  onClose: () => {},
  compact: false,
}

export default Container
