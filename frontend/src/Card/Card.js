import React from 'react';
import DropDown from '../DropDown/DropDown'
import './Card.css'


class Header extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            value: this.props.application_name,
            application_name: this.props.application.application_name,
            application_status: this.props.application.application_status

        };
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      handleToggleClick() {
          if(this.state.edit) {
              this.handleSubmit()
          }
        this.setState(state => ({
          edit: !state.edit
        }));
      }
      
    handleSubmit() {
        const data = {
            _id: this.props.application._id.$oid ,
            application_name: this.state.value || this.state.application_name,
            application_status: this.state.application_status
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
                    this.setState({ edit:false,
                                    value: '',
                                    application_name: data.application_name,
                                    application_status: data.application_status
                                 }, () => {
                                     this.props.getApplicationsThroughParent()
                                 })
                }
            })
            .catch(err => console.log("There was an error: " + err))
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      setStateFromChild = (dropDownValueFromChild) => {
          this.setState({ 
            application_name: this.state.application_name,
            application_status: dropDownValueFromChild
         } , () => {
            this.handleSubmit();
         })
    }

    render(props) {
        if (this.state.edit) {
            return (
                <div className="card">
                        <p>Edit {this.state.application_name}'s name</p>
                        <textarea value={this.state.value} onChange={this.handleChange} />
                        <button onClick={this.handleToggleClick}>Save</button>
                        <p>Edit {this.state.application_name}'s status</p>

                </div>
            )
        } else {
            return (
                <div className="card">
                    <h3> {this.state.application_name} </h3>
                    <button onClick={this.handleToggleClick}>
                        Edit Name
                    </button>

                    <div class="status">
                        <h3> Status: {this.state.application_status} </h3>
                        <DropDown setParentStateFromChild={this.setStateFromChild} selectedStatus={this.state.application_status} />
                    </div>
                </div>
            );
        }
    }
}

export default Header