import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import jwt_decode from 'jwt-decode';
import { Link, IndexLink } from 'react-router';

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
debugger;
      axios.post('/api/users/auth', values).then((res) => {

        var _token = res.token;
				var _decoded = jwt_decode(_token);

				// decoded data from our JSON web token
				console.log(_decoded);

        toastr.success(res,'Login success')
      }).catch(() => {});

      console.log('Received values of form: ', values);
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or
          <Link to="/register" >register now!</Link>
        </FormItem>
      </Form>
    );
  },
}));

export default NormalLoginForm;
