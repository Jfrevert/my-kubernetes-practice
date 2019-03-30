import React from 'react';
import './NavBar.css'
import { MdHome } from "react-icons/md";
import { MdPublic } from "react-icons/md";

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
                            <h1 onClick={this.toggleAppEdit}>
                            See Public View 
                            <MdPublic />
                            </h1>
                            </div>
                    </div>
                </nav>
            )
        } else if (!this.props.edit) {
            return (
                <nav>
                    <div className="navWide">
                        <div className="wideDiv">
                            <h1 onClick={this.toggleAppEdit}>
                            See Edit View 
                            <MdHome />
                            </h1>
                            </div>
                    </div>
                </nav>
            )
        }
    }
}

export default NavBar;