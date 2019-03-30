import React from 'react';

class Header extends React.Component  {
    head = {
        height: '20vh',
        background: "linear-gradient(45deg, #8350CE 0%, #A43355 100%, #C59237 100%)",
        color: 'white'
    }

    render() {
        if (!this.props.edit) {
            return (
                <div class='head-div' style={this.head}>
                        <h1>Welcome to the status page app.</h1>
                        <h2>Listed Applications are below</h2>
                </div>
            );
        } else if (this.props.edit) {
            return (
                <div class='head-div' style={this.head}>
                        <h1>Hello. Welcome to the status page app.</h1>
                        <h2>Start out by entering an application you would like to keep track of.</h2>
                </div>
            );
        }

    }

}



export default Header