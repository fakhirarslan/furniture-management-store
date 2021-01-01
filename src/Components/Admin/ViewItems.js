import React, { Component } from 'react';
import { List, Popconfirm, Tooltip, Row, Col, message } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import axios from 'axios';

import './viewItems.css';

//import logo from '../../Database/public/uploads/IMAGE-1609491529309.png';

class ViewItems extends Component {

  constructor() {
    super();

    this.state = {
      items: []
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
                  <EditTwoTone />
                </Tooltip>
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
