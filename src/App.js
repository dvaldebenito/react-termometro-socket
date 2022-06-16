import React, { Component } from 'react';
import Thermometer from 'react-thermometer-component'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './App.css';
import { BallTriangle } from "react-loader-spinner";

const client = new W3CWebSocket('ws://192.168.100.80:81');

class App extends Component {

  state = {
    data: {}
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send('hello');
    };
    client.onmessage = (message) => {
      if (message.data !== "0") {
        console.log('data: ', JSON.parse(message.data).data);
        this.setState({ data: JSON.parse(message.data).data })
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            !this.state.data.temperatura ?
             <> <BallTriangle
                height="100"
                width="100"
                color='grey'
                ariaLabel='loading'
              /> 
              <p>Conectando...</p>
            </>:
            <>
              <Thermometer
                theme="dark"
                value={this.state.data.temperatura}
                max="40"
                steps="3"
                format="°C"
                size="large"
                height="300"
              />
              <p>Temperatura en dormitorio de Daniel</p>
            </>
          }



        </header>
      </div>
    );
  }
}

export default App;
