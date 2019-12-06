import React, {Component} from 'react';
import PostMessage from '../../components/PostMessage/PostMessage';
import GetMessage from '../../components/GetMessage/GetMessage';

class Message extends Component {
  interval = null;
  
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      lastTime: 0,
      postMessage: {author: '', message: ''},
    };
  }

  async componentDidMount() {
    this.getMessages();
    this.interval = setInterval(() => this.getMessages(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async getMessages() {
    const response = await fetch('http://146.185.154.90:8000/messages?datetime=' + this.state.lastTime);
    if (response.ok) {
      const messages = await response.json();
      if(messages.length === 0) return false;
      else {
        const messagesState = [...this.state.messages];
        const lastTime = messages[messages.length - 1].datetime;
        let stateMessages = messagesState.concat(messages);
        this.setState({messages: stateMessages, lastTime});
      }
    }
  }

  enterMessage = event => {
    let postMessage = {...this.state.postMessage};
    postMessage[event.target.name] = event.target.value;
    this.setState({postMessage});
  };

  handleSubmit(event){ 
    event.preventDefault();

    let postMessage = {...this.state.postMessage};
    const axios = require('axios');

    const querystring = require('querystring');
    axios.post('http://146.185.154.90:8000/messages', 
      querystring.stringify({ 
        message: postMessage.message,
        author: postMessage.author 
      })
    );
    
    this.setState({postMessage: {author: '', message: ''}});
  };

  render() {
    return (
      <div className='Message'>
        <PostMessage 
          post={this.enterMessage}
          submit={(event) => this.handleSubmit(event)}
          author={this.state.postMessage.author}
          message={this.state.postMessage.message}
        />
        <div className='MessagesAll'>
        {this.state.messages.map(message => (
          <GetMessage
            key={message._id}
            date={message.datetime}
            author={message.author}
            message={message.message}
          />
        )).reverse()}
        </div>
      </div>
    )
  }
}

export default Message;