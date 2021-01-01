import React, { Component } from 'react';
import { List, Popconfirm, Tooltip, Row, Col, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import axios from 'axios';

import './viewUsers.css';

class ViewUserList extends Component {

  constructor() {
    super();

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/users/userList')
      .then(res => {
        let filteredList = res.data.filter(user => !user.isAdmin);
        this.setState({
          users: filteredList
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete = id => {
    axios.delete(`http://localhost:4000/users/userDelete/${id}`)
    .then(res => {
      if(res.data.success) {
        message.success('Deleted Successful');
      }
      else {
        message.error('An error occured while deleting!');
      }
    })
    .catch(err => {});
  }

  render() {
    return (
      <div className="listview">
        <List
          className="list"
          itemLayout="horizontal"
          dataSource={this.state.users}
          renderItem={user => (
            <>
              <List.Item>
                <List.Item.Meta
                  title={user.name}
                  description={
                    <Row>
                      <Col><b>Email:</b> {user.email}</Col>
                      <Col><b>Phone:</b> {user.phone}</Col>
                    </Row>
                  }
                />
                <Popconfirm
                  placement="topLeft"
                  title="Are you sure?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => this.handleDelete(user._id)}
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

export default ViewUserList;
