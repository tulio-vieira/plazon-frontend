import React, { Component } from 'react';

class Observer extends Component {
  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      this.observer.unobserve(entries[0].target);
      this.props.hasBeenSeen();
    }
  });

  render() {
    return (
      <div ref={el => {if(el) this.observer.observe(el)}}/>
    );
  }
}

export default Observer;