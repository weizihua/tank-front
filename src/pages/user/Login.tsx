import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import "./Login.less"
import TankComponent from "../../common/component/TankComponent";
import {Button, Col, Form, Input, Row} from 'antd';
import User from "../../common/model/user/User";
import Moon from "../../common/model/global/Moon";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import Sun from "../../common/model/global/Sun";
import MessageBoxUtil from "../../common/util/MessageBoxUtil";
import Preference from "../../common/model/preference/Preference";


interface IProps extends RouteComponentProps {

}

interface IState {

}

export default class Login extends TankComponent<IProps, IState> {

  user: User = Moon.getSingleton().user

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

    //进入登录页面，默认退出一次
    this.logout()
  }

  //退出登录
  logout() {

    let that = this

    this.user.httpLogout(function () {
      //刷新整个网站
      Sun.updateFrame()
    })

  }

  onFinish(values: any) {
    console.log('Success:', values);

    let that = this

    let user = that.user

    user.httpLogin(values["username"], values["password"], function () {
      MessageBoxUtil.success(Moon.t("user.loginSuccess"))

      that.props.history.push('/')

    })

  };

  onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  };


  render() {

    let that = this
    let preference: Preference = Moon.getSingleton().preference


    return (
      <div className="user-login">

        <Row>
          <Col span={8} offset={8}>

            <div className="welcome">
              {Moon.t("user.welcomeLogin")}
            </div>

            <Form
              name="basic"
              initialValues={{remember: true}}
              onFinish={this.onFinish.bind(this)}
              onFinishFailed={this.onFinishFailed.bind(this)}
            >
              <Form.Item
                name="username"
                rules={[{required: true, message: Moon.t("user.enterUsername")}]}
              >
                <Input size="large" placeholder={Moon.t("user.enterUsername")} prefix={<UserOutlined/>}/>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{required: true, message: Moon.t("user.enterPassword")}]}
              >
                <Input.Password size="large" placeholder={Moon.t("user.enterPassword")} prefix={<LockOutlined/>}/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" icon={<UserOutlined/>} block={true} htmlType="submit">
                  {Moon.t("user.login")}
                </Button>
              </Form.Item>

              {
                preference.allowRegister && (
                  <div className="text-right">
                    <Link to={"/user/register"}>
                      <span className="link">{Moon.t("user.toToRegister")}</span>
                    </Link>
                  </div>
                )
              }


            </Form>

          </Col>
        </Row>

      </div>
    );
  }
}


