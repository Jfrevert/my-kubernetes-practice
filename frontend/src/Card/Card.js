import React from 'react';
import './Card.css'


class Header extends React.Component  {
    constructor(props) {
        super(props);
    
        this.state = {
          isShow: true,
        };
      }

    render(props) {
        return (
            <div class="card">
                <h3> {this.props.todo.component_name} </h3><h3> Status: {this.props.todo.component_status} </h3> <h3> ID: { this.props.todo._id.$oid} </h3>
            </div>
        );
    }
}

export default Header