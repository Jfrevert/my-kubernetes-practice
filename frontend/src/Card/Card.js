import React from 'react';
import './Card.css'


class Header extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            value: this.props.component_name,
            component_name: this.props.todo.component_name,
            component_status: this.props.todo.component_status

        };
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      handleToggleClick() {
          if(this.state.edit) {
              //sent PUT with object here
              this.handleSubmit()
          }
        this.setState(state => ({
          edit: !state.edit
        }));
      }

      handleSubmit() {
        const data = {
            _id: this.props.todo._id.$oid ,
            component_name: this.state.value,
            component_status: this.props.todo.component_status
        }

         fetch('http://localhost/edit', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    fetch('http://localhost/get?component=' + this.props.todo._id.$oid)
                        .then((response) => response.json())
                        .then((myJson)  => JSON.stringify(myJson.result))
                        .then(final => this.setState({ component_name:final.component_name, component_status: final.component_status }))
                        .then(this.props.parentFunction())
                        .catch(err=> console.log(err))
                        
                }
            })
            .catch(err => console.log("There was an error: " + err))
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

    render(props) {
        if (this.state.edit) {
            return (
                <div className="card">
                        <textarea value={this.state.value} onChange={this.handleChange} />
                        <button onClick={this.handleToggleClick}>Save</button>
                </div>
            )
        } else {
            return (
                <div className="card">
                    <h3> {this.state.component_name} </h3><h3> Status: {this.state.component_status} </h3>
                    <button onClick={this.handleToggleClick}>
                        Edit
                    </button>
                </div>
            );
        }
    }
}

export default Header