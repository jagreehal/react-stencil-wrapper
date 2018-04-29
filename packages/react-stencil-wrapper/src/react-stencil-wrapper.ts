import React from 'react'

export type Props = {
  eventListeners?: any
  children: React.ReactElement<any>
  componentDidMountCallback?: Function
  src?: string
}

export class StencilComponentWrapper extends React.Component<Props> {
  wc: any
  propsNames: string[] = []
  wcReady: boolean = false
  wcReadyInterval: NodeJS.Timer

  waitForWebComponent = () => {
    return new Promise(resolve => {
      if (this.wc && this.wcReady) {
        return resolve()
      }
      this.wcReadyInterval = setInterval(async () => {
        if (this.wc) {
          clearInterval(this.wcReadyInterval)
          if (typeof (<any>this.wc).componentOnReady === 'function') {
            await (<any>this.wc).componentOnReady()
          }
          this.wcReady = true
          return resolve()
        }
      }, 10)
    })
  }

  updateProps = () => {
    if (this.wcReady) {
      this.propsNames.forEach(propName => {
        this.wc[propName] = (<any>this.props)[propName]
      })
    }
  }

  addEventListeners = (eventListeners: Object) => {
    if (this.wc !== undefined && eventListeners !== undefined) {
      Object.entries(eventListeners).forEach(([name, value]) => {
        this.wc.addEventListener(name, value)
      })
    }
  }

  removeEventListeners = (eventListeners: Object) => {
    if (this.wc !== undefined && eventListeners !== undefined) {
      Object.entries(eventListeners).forEach(([name, value]) => {
        this.wc.removeEventListener(name, value)
      })
    }
  }

  componentWillMount() {
    if (this.props.src) {
      const script = document.createElement('script')
      script.src = this.props.src
      document.head.appendChild(script)
    }
  }

  async componentDidMount() {
    await this.waitForWebComponent()
    const { src, children, eventListeners, componentDidMountCallback, ...props } = this.props
    this.addEventListeners(eventListeners)
    Object.entries(props).forEach(([name, value]) => {
      if (typeof value === 'function') {
        this.wc[name] = value
      } else {
        this.propsNames.push(name)
      }
    })
    this.updateProps()
    if (componentDidMountCallback) {
      componentDidMountCallback(this.wc)
    }
  }

  componentWillUnmount() {
    this.removeEventListeners(this.props.eventListeners)
    if (this.wcReadyInterval) {
      clearInterval(this.wcReadyInterval)
    }
  }
  componentDidUpdate() {
    if (this.wcReady) {
      this.updateProps()
    }
  }

  render() {
    return React.cloneElement(this.props.children, {
      ref: (node: React.ReactNode) => {
        this.wc = node
      }
    })
  }
}
