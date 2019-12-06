import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import './PostMessage.css';

const PostMessage = props => {
  return (
    <Form inline className="PostMessage_form" onSubmit={props.submit}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0 PostMessage_group">
        <Label for="authorName">Author</Label>
        <Input required type="text" name="author" id="authorName" placeholder="Enter your name" onChange={props.post} value={props.author}
        />
      </FormGroup>
      <FormGroup className="PostMessage_group">
        <Label for="message">Your message</Label>
        <Input type="textarea" name="message" id="message" placeholder="Enter your message" onChange={props.post} value={props.message}/>
      </FormGroup>
      <Button type="submit" className="PostMessage_button">Send</Button>
    </Form>
  )
};

export default PostMessage;
