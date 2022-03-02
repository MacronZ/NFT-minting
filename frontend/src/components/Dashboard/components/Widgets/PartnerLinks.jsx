import React from 'react';
import '../../../../styles/Dashboard/Widgets.scss';

const PartnernLink = () => (
  <div className="widget dummy-widget">
    <div className="col col-1 col-sm-4">
      <select name="drodpwnas" id="dropdown">
        <option value="">Terminated</option>

        <option value="banner">banner</option>
        <option value="size">size</option>
        <option value="image">image</option>
        <option value="ib">IB</option>
      </select>
    </div>
    <div className="col col-1 col-sm-4">
      <select name="drodpwnas" id="dropdown">
        <option value="">Terminated</option>
        <option value="banner">banner</option>
        <option value="size">size</option>
        <option value="image">image</option>
        <option value="ib">IB</option>
      </select>
    </div>
  </div>
);

export default PartnernLink;
