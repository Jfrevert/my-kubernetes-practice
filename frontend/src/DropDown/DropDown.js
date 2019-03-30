import React from 'react'

class DropDown extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectValue: this.props.selectedStatus
        }
    }

    handleChange = (event) => {
        this.setState({ selectValue: event.target.value });
      }

    setApplicationStatus = () => {
        this.props.setParentStateFromChild(this.state.selectValue);
    }

    render () {

        return (
            <div>
                {/* <h3> {this.props.selectedStatus} </h3> */}
                <button onClick={this.setApplicationStatus}> TEST SET STATE FROM DROPDOWN COMPONENT</button>

                <select value={this.state.selectValue} onChange={this.handleChange} >
                    <option value="green">green</option>
                    <option value="yellow">yellow</option>
                    <option value="red">red</option>
                </select>
            </div>       
        )


    }
}

export default DropDown;