import React, {useEffect, useState} from "react";
import "./Registration.css"
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {registration,addProfileData} from "../../Store/Actions/Authentication";
import {message, Form} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import LoginLogo from "../../Common/image/Lettermark_White.png";
const Register = () => {

    const dispatch = useDispatch()
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [loader, setLoader] = useState(false)
    const {loading} = useSelector(state => state.authenticationReducer)

    const signUp = () => {
        dispatch(registration(email, password, (response) => {
            localStorage.setItem('token', response.user.xa)
            localStorage.setItem('email', response.user.email)
            localStorage.setItem('type','user')
            message.success('SigningUp...')
            dispatch(addProfileData(name,address,phone))
            history.push('/')
        }));
    };
    useEffect(() => {
        setLoader(loading)
    }, [loading])

    return (
        <div className="body-style">

            <div className="container" id="container">
                <div className="form-container sign-up-container">
                </div>
                <div className="form-container sign-in-container">
                    <div className="form-style">
                        <h1>Signing UP!</h1>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={signUp}
                        >
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                ]}>
                                <input type="text" value={name} placeholder="Name"
                                       onChange={(e) => setName(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}>
                                <input type="email" value={email} placeholder="Email"
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                    {
                                        min:6,
                                        message: 'Minimum Password length is 6',
                                    }
                                ]}>
                                <input type="password" value={password} placeholder="Password"
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Address!',
                                    },
                                ]}>
                                <input type="text" value={address} placeholder="Address"
                                       onChange={(e) => setAddress(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone!',
                                    },
                                ]}>
                                <input type="phone" value={phone} placeholder="Phone Number"
                                       onChange={(e) => setPhone(e.target.value)}/>
                            </Form.Item>
                            {loader ? <LoadingOutlined spin/> :
                                <button className="signUp buttonRegister"   type="submit" >Sign Up</button>}
                        </Form>
                    </div>

                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <img src={LoginLogo} height={150} alt={"Logo"} width={150} style={{marginBottom:"20px"}}/>
                            <p style={{fontSize:"20px",fontWeight:"bold"}}>The act of giving, made "EASY" </p>
                            <button className="ghost buttonRegister" id="signUp" onClick={() => history.push("/login")}>Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Register
