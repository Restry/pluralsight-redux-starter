import React from 'react';
import {Link} from 'react-router';

import { DatePicker } from 'antd';

import LoginForm from '../account/Login';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Pluralsig Administration & RESTRY</h1>
        <DatePicker />
        <p>React, Redux and React Router in ES6 for ultra-responsive web apps.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>

        <LoginForm />
      </div>
    );
  }
}

export default HomePage;

