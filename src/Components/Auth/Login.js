import React, { Component } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from './Session/Session';

import './login.style.css';

class Login extends Component {

  onFinish = values => {
    const user = {
      email: values.username,
      password: values.password
    };

    axios
      .post('users/login', {
        email: user.email, password: user.password
      })
      .then(response => {
        if (response.data.status === "No User") {
          message.error('User Not Found!');
        } else {
          setUserSession(response.data);
          this.props.toggleLogin();
          message.success('Login Successful');
          if (response.data.isAdmin) {
            this.props.history.push('/admin');
          } else {
            this.props.history.push('/home');
          }
        }
      }).catch(error => {
        message.error('No internet! Check your internet connection');
      });
  };

  render() {
    return (
      <div className="site-card-border-less-wrapper login-card-wrapper">
        <Card className="login-card" title="Login Form" bordered={false} hoverable={true}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              &nbsp;Or <Link to="/register">Register now</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default withRouter(Login);
