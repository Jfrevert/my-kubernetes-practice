import React from 'react'
import './DropDown.css'

class DropDown extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectValue: this.props.selectedStatus
        }
    }

    handleChange = (event) => {
        this.setState({ selectValue: event.target.value },() => {
            this.setApplicationStatus();
        });
      }

    setApplicationStatus = () => {
        this.props.setParentStateFromChild(this.state.selectValue);
    }

    render () {

        return (
                <select value={this.state.selectValue} onChange={this.handleChange} >
                    <option value="green">green</option>
                    <option value="yellow">yellow</option>
                    <option value="red">red</option>
                </select>
        )


    }
}

export default DropDown;