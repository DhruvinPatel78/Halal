import React, {useEffect, useState} from "react";
import "./Login.css"
import {useHistory} from "react-router";
import {useDispatch,useSelector} from "react-redux";
import {login} from "../../Store/Actions/Authentication";
import {Form, message} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import LoginLogo from '../../Common/image/Lettermark_White.png'
const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false)
    const { loading } = useSelector(state => state.authenticationReducer)

    const signIn = () => {
        dispatch(login(email,password, (response,Type) => {
            localStorage.setItem('token', response.user.xa)
            localStorage.setItem('type', Type)
            localStorage.setItem('email', response.user.email)
            message.success('Signed In...')
            if(Type === 'admin') {
                history.push('/admin/users')
            } else if(Type === 'vendor')  {
                history.push('/vendor/profile')
            } else {
                history.push('/')
            }
        }));
    };

    useEffect(() => {
        setLoader(loading)
    },[loading])

    const signUp = () => {
        history.push("/register")
    }

    return(
        <div className="bodys-style">

            <div className="container" id="container">
                <div className="form-container sign-up-container">
                </div>
                <div className="form-container sign-in-container">
                    <div className="form-style">
                        <h1>Sign in</h1>
                        <span>or use your account</span>
                        <br/>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={signIn}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Item>
                            <br/>
                            <Form.Item>
                        { loader ? <LoadingOutlined spin/> : <button className="signIn buttonClass" type="submit" >Sign In</button> }
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <img src={LoginLogo} alt={"Logo"} height={150} width={150} style={{marginBottom:"20px"}}/>
                            <p style={{fontSize:"20px",fontWeight:"bold"}}>Ordering Halal, Made "EASY"</p>
                            <button className="buttonClass ghost" id="signUp" onClick={signUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
