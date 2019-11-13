import React from 'react';

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

export default class WindowSize extends React.Component {
  state = getSize();

  handleResize = () => {
    this.setState(getSize())
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const windowSize = this.state
    return (
      <div>
        {windowSize.width} x {windowSize.height}
      </div>
    )
  }
}
