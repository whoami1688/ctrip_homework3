import { Image, InputNumber } from 'antd';
import PubSub from 'pubsub-js'
import React from 'react';

export default function cartsGoods(props) {
    const [item, setItem] = React.useState(props)
    function onChange(value) {
        let newItem = JSON.parse(JSON.stringify(item))
        newItem.cartNum = parseInt(value)
        setItem(newItem)
        PubSub.publish('changeToCart', JSON.parse(JSON.stringify(newItem)))
    }
    return (
        <div>
            <div className='item'>
                <div className='one'>
                    <Image src={item.imageUrl} height={53} ></Image>
                </div>
                <div className='two'>
                    <span style={{ fontSize: 15, fontWeight: 'bold', }}>{item.name}</span>
                    <span style={{ fontSize: 12, fontWeight: '300', color: 'rgba(83, 83, 88,0.7)' }}>{item.type}</span>
                    <InputNumber min={0} defaultValue={item.cartNum} onChange={onChange} />
                </div>
                <div className='three'>
                    {parseInt(item.money) * item.cartNum + '元'}
                </div>
            </div>
            <style jsx>
                {`
                .item{
                   width:87%;
                   margin:0 auto;
                   margin-top:20px;
                   padding-bottom:20px;
                   display:flex;
                   border-bottom:1px silver solid;
                   position:relative;
                }
                .two{
                    margin-left:30px;
                    display:flex;
                    flex-direction:column;
                }
                .three{
                    position:absolute;
                    bottom:15px;
                    right:50px;
                }
              `}
            </style>
        </div>
    )
}