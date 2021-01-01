import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
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
    const formData = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    formData.append('myImage', this.state.selectedFile);
    axios.post('http://localhost:4000/upload/image', formData, config)
      .then(res => {
        this.setState({
          imageUrl: res.data.req.path
        });
      })
      .catch(err => console.log(err));
  }

  uploadButton = values => {
    const item = {
      title: values.title,
      quantity: values.quantity,
      price: values.price,
      image: this.state.imageUrl,
    };

    axios.post('http://localhost:4000/items', {
      item
    })
      .then(response => {
        message.success('Item Added Successful');
      }).catch(error => {
        message.error('No internet! Check your internet connection');
      });
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
        <Form.Item name="title" label="Title" rules={[
          {
            required: true,
            message: 'Please enter title!',
          },
        ]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Quantity">
          <Form.Item name="quantity" noStyle rules={[
            {
              required: true,
              message: 'Please enter quantity!',
            },
          ]}>
            <InputNumber min={1} max={10000} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Price">
          <Form.Item name="price" noStyle rules={[
            {
              required: true,
              message: 'Please enter price',
            },
          ]}>
            <InputNumber min={1} max={1000000} />
          </Form.Item>
          <span className="ant-form-text"> PKR (per item)</span>
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={this.normFile}
        >
          <input id='file' name='myImage' type='file' onChange={this.handleFileChange} />
          <Button type="primary" onClick={this.uploadFile}>Upload</Button>
        </Form.Item>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddItemForm;
