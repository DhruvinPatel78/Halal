import React, {useEffect, useState} from "react";
import {getProfileData,updateProfile,updateStoreStatus,updatePassword} from "../../Store/Actions/Authentication";
import '../Home/Home.css'
import {
    Form,
    Input,
    Button,
    Card,
    Spin,
    Typography,
    Switch,
    Modal
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import Logo from '../../Common/image/logo.png'
const { Title,Text } = Typography;

const UserProfile = () => {
    const dispatch = useDispatch();
    const [enableEdit,setEnableEdit] = useState(false)
    const [profileState, setProfileState] = useState({});
    const {loading, profileData, exist} = useSelector(state => state.authenticationReducer)
    const [loader, setLoader] = useState(false)
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
    const [storeName,setStoreName] = useState("")
    const [phone,setPhone] = useState("")
    const [modalVisible,setModal] = useState(false)
    const [password,setPassword] = useState('')
    const email = localStorage.getItem('email')
    const type = localStorage.getItem('type')
    useEffect(() => {
        getProfilesData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(profileData) {
            setProfileState(profileData)
        }
    },[profileData])
    useEffect(() => {
        setLoader(loading)
    }, [loading])


    const getProfilesData = () => {

        dispatch(getProfileData())
    }

    const updateProfileData = () => {
        dispatch(updateProfile(name,address,phone,storeName))
        setEnableEdit(false)
    }

    const onHandleSaveAndEdit = (exist) => {
        setEnableEdit(true)
        if(exist) {
            setName(profileState.Name)
            setAddress(profileState.Address)
            setPhone(profileState.PhoneNumber)
            setStoreName(profileState.StoreName)
        }
    }
    const onChange = (checked) => {
        dispatch(updateStoreStatus(checked ? 1 : 0))
    }

    const updatePasswords = () => {
        dispatch(updatePassword(password))
        setModal(false)
    }

    return(<>
        <Card style={{marginBottom:"100px", height:"75px"}}>
            <Title level={4} style={{float:"left"}}>Profile</Title>
        </Card>
        {loader ? <Spin size="large" /> : <Card className="customDesign"  style={{width:"100%",borderRadius:"15px",}} extra={
            type === 'vendor' &&<><Text strong>Your store is</Text>  <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                checked={profileState && profileState.IsActive}
                onChange={onChange}
            /></>
        }>

                <img src={Logo} alt={"logo"} height={150} width={150} style={{marginTop:"-100px",marginBottom:"30px"}}/>

        {!enableEdit ?  <>
            <p><Text strong>Email - </Text> {email}</p>
            {type === 'vendor' &&    <p ><Text strong>Store Name - </Text> {profileState.StoreName}</p>}
            <p ><Text strong>Name - </Text> {profileState.Name}</p>
            <p > <Text strong>Phone Number - </Text>  {profileState.PhoneNumber}</p>
            <p ><Text strong>Address - </Text> {profileState.Address}</p>
            <Button type="primary" onClick={() => onHandleSaveAndEdit(exist)}>Edit</Button> <Button type="default" onClick={() => setModal(true)}>Change Password</Button></>
        :
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="large"
        >
            <Form.Item label="Name">
                <Input onChange={(e) => setName(e.target.value)} value={name} />
            </Form.Item>
            <Form.Item label="Address">
                <Input onChange={(e) => setAddress(e.target.value)} value={address} />
            </Form.Item>
            <Form.Item label="Phone Number">
                <Input onChange={(e) => setPhone(e.target.value)} value={phone} />
            </Form.Item>
            {type === 'vendor' && <Form.Item label="Store Name">
                <Input onChange={(e) => setStoreName(e.target.value)} value={storeName} />
            </Form.Item>}
                <Button type="primary" onClick={updateProfileData}>Save</Button> <Button onClick={() => setEnableEdit(false)}>Cancel</Button>
        </Form>}
            <Modal
                title="Change Your password"
                visible={modalVisible}
                onOk={updatePasswords}
                onCancel={() => setModal(false)}
            >

                    <Input.Password placeholder="Enter new password" size="large" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />

            </Modal>
    </Card>}</>)
}

export default UserProfile
