import "./index.scss";
import { Card, Button, Input, Form, message } from "antd";
import { fetchLogin } from "@/store/modules/user";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import logo from "@/assets/imgs/logo.png";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    await dispatch(fetchLogin(values))
    navigate("/")
    message.success("登录成功")
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img src={logo} className="login-logo" alt="" />
        <Form validateTrigger={["onSubmit", "onBlur"]} onFinish={onFinish}>
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确" },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input placeholder="请输入验证码" maxLength={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
