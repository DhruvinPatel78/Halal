import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {updateStockDetails} from "../../Store/Actions/Orders";
import {useDispatch} from "react-redux";

const EditStock = (props) => {
    const {stockByVendor} = props
    const [lamb, setLamb] = useState(stockByVendor.Lamb)
    const [lambCost, setLambCost] = useState(stockByVendor.LambCost)
    const [cow, setCow] = useState(stockByVendor.Cow)
    const [cowCost, setCowCost] = useState(stockByVendor.CowCost)
    const [goat, setGoat] = useState(stockByVendor.Goat)
    const [goatCost, setGoatCost] = useState(stockByVendor.GoatCost)
    const [cowShare, setCowShare] = useState(stockByVendor.CowShare)
    const [cowShareCost, setCowShareCost] = useState(stockByVendor.CowShareCost)
    const dispatch = useDispatch();

    const updateStock = () => {
        dispatch(updateStockDetails({
            lamb,
            lambCost,
            cow,
            cowCost,
            goat,
            goatCost,
            cowShare,
            cowShareCost
        }));
        props.onClose();
    }


    return (<div>
        <Form
            layout="vertical"
        >
            <Form.Item label="Lamb">
                <Input type={"number"} placeholder="Enter Lamb" size="large" value={lamb}
                       onChange={(e) => setLamb(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Lamb Cost">
                <Input type={"number"}  onChange={(e) => setLambCost(e.target.value)} value={lambCost} size="large"/>
            </Form.Item >
            <Form.Item label="Cow">
                <Input type={"number"} size="large" value={cow}
                       onChange={(e) => setCow(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Cow Cost">
                <Input type={"number"}  onChange={(e) => setCowCost(e.target.value)} value={cowCost} size="large"/>
            </Form.Item>
            <Form.Item label="Goat">
                <Input type={"number"}  size="large" value={goat}
                       onChange={(e) => setGoat(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Goat Cost">
                <Input type={"number"}  onChange={(e) => setGoatCost(e.target.value)} value={goatCost} size="large"/>
            </Form.Item>
            <Form.Item label="Cow Share">
                <Input type={"number"}  onChange={(e) => setCowShare(e.target.value)} value={cowShare} size="large"/>
            </Form.Item>
            <Form.Item label="Cow Share Cost">
                <Input type={"number"}  onChange={(e) => setCowShareCost(e.target.value)} value={cowShareCost} size="large"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={updateStock}>Save</Button>
            </Form.Item>
        </Form>
    </div>)
}

export default EditStock;

