import React from 'react';
import './NavBar.css'


class NavBar extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
        }
    }

    toggleAppEdit = () => {
        this.props.toggleEdit()
    }

    render () {
        if(this.props.edit) {
            return (
                <nav>
                    <div className="navWide">
                        <div className="wideDiv">
                            <h1 onClick={this.toggleAppEdit}>Public View</h1>
                            </div>
                    </div>
                </nav>
            )
        } else if (!this.props.edit) {
            return (
                <nav>
                    <div className="navWide">
                        <div className="wideDiv">
                            <h1 onClick={this.toggleAppEdit}>Admin</h1>
                            </div>
                    </div>
                </nav>
            )
        }
    }
}

export default NavBar;