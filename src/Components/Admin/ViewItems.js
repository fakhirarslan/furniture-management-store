import React, { Component } from 'react';
import { List, Popconfirm, Tooltip, Row, Col, Drawer, message, Form, Input, Card, Button, InputNumber } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import axios from 'axios';

import './viewItems.css';

//import logo from '../../Database/public/uploads/IMAGE-1609491529309.png';

class ViewItems extends Component {

  constructor() {
    super();

    this.state = {
      items: [],
      drawerVisible: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/items/itemList')
      .then(res => {
        this.setState({
          items: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleDrawer = () => {
    this.setState({
      drawerVisible: !this.state.drawerVisible
    });
  }

  handleDelete = id => {
    axios.delete(`http://localhost:4000/items/itemDelete/${id}`)
      .then(res => {
        if (res.data.success) {
          message.success('Deleted Successful');
        }
        else {
          message.error('An error occured while deleting!');
        }
      })
      .catch(err => { });
  }

  render() {
    return (
      <div className="listview">
        <List
          className="list"
          itemLayout="horizontal"
          dataSource={this.state.items}
          renderItem={item => (
            <>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <img alt='temp' />
                  }
                  title={item.title}
                  description={
                    <Row>
                      <Col><b>Price:</b> {item.price}</Col>
                      <Col><b>Quantity:</b> {item.quantity}</Col>
                    </Row>
                  }
                />
                <Tooltip title="Edit">
                  <EditTwoTone onClick={this.toggleDrawer} />
                </Tooltip>
                <Drawer
                  title="Edit Item"
                  placement="right"
                  closable={true}
                  onClose={this.toggleDrawer}
                  visible={this.state.drawerVisible}
                  className="item-drawer"
                  width={500}
                >
                  <Card className="item-card" title="Edit Item Form" bordered={false} hoverable={true}>
                    <Form
                      name="normal_login"
                      className="item-form"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={this.onFinish}
                    >
                      <Form.Item name="title" label="Title" rules={[
                        {
                          message: 'Please enter title!',
                        },
                      ]}>
                        <Input type="text" placeholder={`${item.title}`} />
                      </Form.Item>
                      <Form.Item label="Quantity">
                        <Form.Item name="quantity" noStyle rules={[
                          {
                            message: 'Please enter quantity!',
                          },
                        ]}>
                          <InputNumber min={1} max={10000} placeholder={`${item.quantity}`} />
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="Price">
                        <Form.Item name="price" noStyle rules={[
                          {
                            message: 'Please enter price',
                          },
                        ]}>
                          <InputNumber min={1} max={1000000} placeholder={`${item.price}`} />
                        </Form.Item>
                        <span className="ant-form-text"> PKR (per item)</span>
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                          Update
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Drawer>
                <Popconfirm
                  placement="topLeft"
                  title="Are you sure?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => this.handleDelete(item._id)}
                >
                  <Tooltip title="Delete">
                    <DeleteTwoTone />
                  </Tooltip>
                </Popconfirm>
              </List.Item>
            </>
          )}
        />
      </div>
    );
  }
}

export default ViewItems;
