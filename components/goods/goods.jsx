import style from './goods.module.css'
import React from 'react'
import { Image, Select, Button, Tooltip,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'



const { Option } = Select;

export default function goods(props) {
    let [goods, setGoods] = React.useState(props)

    function handleChange(value) {
       let oldVal = JSON.parse(JSON.stringify(goods))
       oldVal.type=value
        setGoods(oldVal)
    }
    function addToCart(){
        console.log("点击");
        message.success('成功加入购物车');
        PubSub.publish('addToCart', goods) //发布消息
    }
    return (
        <div className={style.card}>
            <Image width={'100%'} height={130} src={goods.imageUrl}></Image>
            <div className={style.name}>{goods.name}</div>
            <div className={style.money} >{goods.money + '元'}</div>
            <div className={style.mes}>{goods.mes}</div>
            <Select defaultValue="中号" style={{ width: 100, marginLeft:5 }} onChange={handleChange} size="middle">
                <Option value="小号">小号</Option>
                <Option value="中号">中号</Option>
                <Option value="大号">大号</Option>
            </Select>
            <Tooltip title="加入购物车">
                <Button type="primary" onClick={addToCart}  icon={<PlusOutlined />} style={{marginLeft:8}} />
            </Tooltip>
        </div>
    )
}