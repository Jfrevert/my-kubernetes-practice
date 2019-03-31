import React from 'react';
import DropDown from '../DropDown/DropDown'
import Face from '../Face/Face'
import './Card.css'
import { TiPencil, TiTrash } from "react-icons/ti";
import { FaRegSave } from "react-icons/fa"; 


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
                } else {
                    alert('there was an error: ' + resp.status + " " + resp.err)
                }
            })
            .catch(err => console.log("There was an error: " + err))
      }

      handleDelete = () => {

        fetch('http://localhost/delete?application=' + this.props.application._id.$oid, {method: "DELETE"})
        .then(resp => {
            if (resp.status >= 200 && resp.status < 300){
                this.props.deleteApplicationFromState(this.props.application._id.$oid)
            } else {
                alert('error: '+ resp.status)
            }
        })

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

        if(this.props.parentEdit){
            if (this.state.edit) {
                return (
                    <div className="card">
                            <p>Name:</p>
                            <textarea value={this.state.value} onChange={this.handleChange} />

                            <h3> 
                            <button onClick={this.handleToggleClick}>
                            <FaRegSave />
                            </button>
                            </h3>
                            Status: <DropDown setParentStateFromChild={this.setStateFromChild} selectedStatus={this.state.application_status} />
                    </div>
                )
                
            } else {
                return (
                    <div className="card">
                        <div className="app-name">
                            <h3> {this.state.application_name} 
                                <button onClick={this.handleToggleClick}>
                                    <TiPencil />
                                </button>
                            </h3>

                            <h3>
                                <button onClick={this.handleDelete}>
                                    <TiTrash />
                                </button>
                            </h3>
                        </div>
    
                        <div class="status">
                            <h3> Status: {this.state.application_status} 
                            </h3>
                            <Face color={this.state.application_status}/>

                        </div>
                    </div>
                );
            }
        } else if (!this.props.parentEdit) {
            return (
                <div className="card">
                    <div className="app-name">
                        <h3> {this.state.application_name} 
                        </h3>
                    </div>

                    <div class="status">
                        <h3> Status: {this.state.application_status} 
                        </h3>
                        <Face color={this.state.application_status}/>
                    </div>
                </div>
            );
        }






        
    }
}

export default Header