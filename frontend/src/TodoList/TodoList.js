import React from 'react'
import Card from '../Card/Card'
import './TodoList.css'


class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          todos: [],
          value: 'Enter application name'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getComponents()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
    this.createComponent();
    }

    getComponents() {
        fetch('http://localhost/components')
        .then((response) => response.json())
        .then((data) => {
            let dataArr = Object.values(data)
            return dataArr
        })
        .then((dataArr) => this.setState({ todos: dataArr }))
        .catch(err => {
            console.log(err)
    })
    }
  
       createComponent(url = `http://localhost/new-component`, data = {
         component_name: this.state.value,
         component_status: "green"
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
            this.getComponents()
            })
          .catch(err => console.log(err))
      }

    render()  {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            <ul>
                {this.state.todos.map((name, index) => {
                    return <li key={ index }>
                                <Card todo={name} parentFunction={this.getComponents}/>
                            </li>;
                  })}
            </ul>
            </div>
        )
    }
}

export default TodoList;