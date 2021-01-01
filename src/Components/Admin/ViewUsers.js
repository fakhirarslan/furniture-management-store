import React, { Component } from 'react';
import { removeUserSession } from '../Auth/Session/Session';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu, Divider, Tooltip, Button } from 'antd';
import { UserOutlined, PlusOutlined, BarChartOutlined, IdcardTwoTone } from '@ant-design/icons';

import ViewUserList from './ViewUserList';

import './admin.style.css';

const { Header, Content, Footer } = Layout;

class ViewUser extends Component {

  logout = () => {
    removeUserSession();
    this.props.toggleLogin();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.SubMenu className="profile" icon={<UserOutlined />}>
                <Menu.Item key="2">
                  <Link to="/">{this.props.user.name}</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <p onClick={this.logout}>Logout</p>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="admin-content">
              <div className="admin-menu">
                <div>
                  <Link to='/admin'>
                    <Tooltip title="View Item Details">
                      <Button className="admin-menu-item" type="primary" shape="circle" icon={<BarChartOutlined />} />
                    </Tooltip>
                  </Link>
                </div>
                <div>
                  <Link to='/admin/add-item'>
                    <Tooltip title="Add Item">
                      <Button className="admin-menu-item" type="primary" shape="circle" icon={<PlusOutlined />} />
                    </Tooltip>
                  </Link>
                </div>
                <div>
                  <Link to='/admin/view-users'>
                    <Tooltip title="View Users">
                      <Button className="admin-menu-item" type="primary" shape="circle" icon={<IdcardTwoTone />} />
                    </Tooltip>
                  </Link>
                </div>
              </div>
              <Divider>View Users</Divider>
              <div>
                <ViewUserList />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyrights 2020</Footer>
        </Layout>
      </div>
    );
  }
}

export default withRouter(ViewUser);
