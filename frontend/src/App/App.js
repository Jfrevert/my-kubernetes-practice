import React from 'react';
import ApplicationList from '../ApplicationList/ApplicationList'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import '../index.css'
import * as serviceWorker from '../serviceWorker';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: true
        }
    }

    toggleEdit = () => {
        this.setState({ edit: !this.state.edit})
    }

    render() {
        return (    
            <div className='lead-div'>
                <NavBar toggleEdit={this.toggleEdit} edit={this.state.edit}/>
                <Header edit={this.state.edit}/>
                <ApplicationList edit={this.state.edit} />
            </div>
        )
    }
}


export default App;