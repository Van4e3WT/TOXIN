/* global $ */

import 'Root/vendors/multislider-v43/multislider-v43';
import 'Root/vendors/multislider-v43/multislider-v43.css';

import './multislider-v43-fork.scss';

class Multislider {
  constructor(rootElement, props) {
    this.props = props;
    this.rootElement = rootElement;
  }

  init() {
    const { rootElement, props } = this;

    $(rootElement).multislider(props);
  }
}

export default Multislider;
