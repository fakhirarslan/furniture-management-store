import React, { Component } from 'react';
import { removeUserSession } from '../Auth/Session/Session';
import { withRouter } from 'react-router-dom';

class Admin extends Component {

   logout = () => {
      removeUserSession();
      this.props.toggleLogin();
      this.props.history.push('/login');
   }

   render() {
      return (
         <div>
            Admin
            <button onClick={this.logout}>Logout</button>
         </div>
      );
   }
}

export default withRouter(Admin);
