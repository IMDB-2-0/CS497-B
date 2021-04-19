/*
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import { ResetPassWord } from '../redux/actions/authActions';

import Background from '../assets/diego-ph-BCuxVP5WEsU-unsplash.jpg';

const Login = ({ auth, ResetPasswordAction, history, errors }) => {
  const onFinish = (values) => {
    ResetPasswordAction(values, history);
  };

  const onFinishFailed = (errorInfo) => {
    // eslint-disable-next-line no-console
    message.error('Cannot login. Server may not be running');
    message.error('Failed:', errorInfo, errors);
  };

  if (auth.isAuthenticated) {
    history.push('/');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '550px',
          padding: '25px',
          background: 'rgba(255, 255, 255, 1.0)',
        }}
      >
        <h4>Reset Password</h4>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Please input your old password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  ResetPasswordAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { ResetPasswordAction: ResetPassWord })(
  Login
);
*/