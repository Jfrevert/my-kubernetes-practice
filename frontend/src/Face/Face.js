import React from 'react';
import { MdSentimentSatisfied, MdWarning } from "react-icons/md"; 
import { WiFire } from "react-icons/wi"; 



class Face extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {
        console.log("props available to face" + this.props.color)
    }

    // style = {
    //     color: this.props.color
    // }

    render() {
        if(this.props.color === 'green') {
            const style = {
                color: '#1eff1e',
                height: '2em',
                width: '2em'
            }
            return (    
                <div>
                <h1 > 
                <MdSentimentSatisfied style={style}/>
                 </h1>
                 <p>No problems reported.</p>
                 </div>
            )

        
        } else if (this.props.color === 'yellow') {
            const style = {
                color: 'yellow',
                height: '2em',
                width: '2em'
            }
            return (
                <div>
                    <h1>
                    <MdWarning style={style}/>
                    </h1>
                    <p>We are currently investigating issues with the service.</p>
                 </div>
            )
        }else if (this.props.color === 'red') {
            const style = {
                color: 'red',
                icon:  {
                    height: '2em',
                    width: '2em',
                }
            }
            return (    
                <div style={style} >
                    <h1 >
                    <WiFire style={style.icon}/>
                    </h1>
                    <p>There is an outage in this service, and we have all teams on deck actively fixing the issue.</p>
                 </div>
            )
        }

    }
}


export default Face;