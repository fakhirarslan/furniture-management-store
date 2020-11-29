import React, { Component } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
//import { PlusOutlined } from '@ant-design/icons';

import axios from 'axios';

import './addItemForm.style.css';

class AddItemForm extends Component {

  constructor() {
    super();

    this.state = {
      selectedFile: null,
      imageUrl: ''
    }
  }

  handleFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  uploadFile = () => {
    const data = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    data.append = ('file', this.state.selectedFile);
    axios.post('http://localhost:4000/upload/image', data, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  uploadButton = values => {
    const item = {
      title: values.title,
      quantity: values.quantity,
      price: values.price,
      image: values.upload[0].thumbUrl
    };

    axios
      .post('items/', {
        item
      })
      .then(response => {
        if (response.data.status === "Item Failed") {
          //message.error('User Not Found!');
        } else {
          //message.success('Login Successful');
        }
      }).catch(error => {
        //message.error('No internet! Check your internet connection');
      });

    console.log(item);
  }

  render() {
    return (
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        initialValues={{ size: 'default' }}
        className="add-item-form"
        onFinish={this.uploadButton}
      >
        <Form.Item name="title" label="Title">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Quantity">
          <Form.Item name="quantity" noStyle>
            <InputNumber min={1} max={10000} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Price">
          <Form.Item name="price" noStyle>
            <InputNumber min={1} max={1000000} />
          </Form.Item>
          <span className="ant-form-text"> PKR</span>
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={this.normFile}
        >
          <input id='file' name='file' type='file' onChange={this.handleFileChange} />
          <Button type="primary" onClick={this.uploadFile} >Upload</Button>
        </Form.Item>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddItemForm;
