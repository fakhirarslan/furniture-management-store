import React, { Component } from 'react';
import { Form, Input, Tooltip, Select, Button, Card, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import './register.style.css';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

class Register extends Component {

  onFinish = values => {
    axios
      .post('users/register', {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.prefix + '' + values.phone,
        isAdmin: false
      })
      .then(response => {
        if(response.data.error === "User Already Exists!") {
          message.error('User Already Exists! Please login.');
        } else {
          message.success('Registration Successful!');
          this.props.history.push('/login');
        }
      })
      .catch(error => {
        message.error('No internet! Check your internet connection');
      });
  };

  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="92">+92</Option>
      </Select>
    </Form.Item>
  );


  render() {
    return (
      <div className="site-card-border-less-wrapper register-card-wrapper">
        <Card className="register-card" title="Register Form" bordered={false} hoverable={true}>
          <Form
            {...formItemLayout}
            name="register"
            onFinish={this.onFinish}
            initialValues={{
              prefix: '92',
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="name"
              label={
                <span>
                  Name&nbsp;
                  <Tooltip title="Enter your full name">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                addonBefore={this.prefixSelector}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              &nbsp;Or <Link to="/login">Login now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default withRouter(Register);