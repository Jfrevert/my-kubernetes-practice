import React from 'react'
import Card from '../Card/Card'
import './ApplicationList.css'

class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          applications: [],
          value: 'Enter application name'
                }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getApplications()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        event.preventDefault();
        this.createApplication();
    }

    getApplications() {
        console.log('The child component Card called the parent components getApplications() function.')
        fetch('http://localhost/applications')
        .then((response) => response.json())
        .then((data) => {
            let dataArr = Object.values(data)
            return dataArr
        })
        .then((dataArr) => this.setState({ applications: dataArr }))
        .catch(err => {
            console.log(err)
        })
    }

    deleteApplicationFromState = (appId) => {
        let newArray = [...this.state.applications]

        const checkId = (element) => {
            return element._id.$oid >= appId;
        }
        let idToDelete = newArray.findIndex(checkId)

        newArray.splice(idToDelete, 1)
        this.setState({ applications: newArray })

        console.log('now lets check using findINDEX')
        
    }
  
    createApplication(url = `http://localhost/new-application`, data = {
        application_name: this.state.value,
        application_status: "green"
    }) {
        return fetch(url, {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json",
                
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        })
        .then(response => {
            response.json()
        this.getApplications()
        })
        .catch(err => console.log(err))
    }
      

    render()  {
        if (this.props.edit) {
        return (
            <div className="applicationlist">
                <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            <ul>
                {this.state.applications.map((name, index) => {
                    return <li key={ index }>
                                <Card application={name} 
                                getApplicationsThroughParent={this.getApplications} 
                                parentEdit={this.props.edit}
                                deleteApplicationFromState={this.deleteApplicationFromState} />
                            </li>;
                  })}
            </ul>
            </div>
        )
    } else if (!this.props.edit) {
        return (
            <div className="applicationlist">
                <ul>
                    {this.state.applications.map((name, index) => {
                        return <li key={ index }>
                                    <Card application={name} 
                                    getApplicationsThroughParent={this.getApplications} 
                                    parentEdit={this.props.edit}
                                    deleteApplicationFromState={this.deleteApplicationFromState} />
                                </li>;
                    })}
                </ul>
            </div>
        )
    }
    }
}

export default ApplicationList;