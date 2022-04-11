import PubSub from 'pubsub-js'
import React from 'react'
import { Modal, Button, Empty } from 'antd';
import CartsGoods from './cartsGoods';
export default function carts({ getLen }) {
    let [cartsList, setCartsList] = React.useState([])
    let [allMoney, setAllMoney] = React.useState(0)
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    PubSub.subscribe('addToCart', addTocart)
    PubSub.subscribe('changeToCart', changeToCart)
    React.useEffect(() => {
        let newAllMoney = 0
        if (!cartsList) {
            setAllMoney(0)
            return
        }
        cartsList.map(val => {
            newAllMoney += parseInt(val.cartNum) * parseInt(val.money)
        })
        setAllMoney(newAllMoney)
        getLen(cartsList.length)
    }, [cartsList])

    function changeToCart(msg, data) {
        let newGoods = data
        let oldcartsList = JSON.parse(JSON.stringify(cartsList))
        let newcartsList = oldcartsList.map((val) => {
            if ((newGoods.id == val.id) && (newGoods.type == val.type)) {
                val.cartNum = newGoods.cartNum
                return val
            }
            else {
                return val
            }
        }).filter((val) => {
            if (val.cartNum > 0) return true
        })
        setCartsList(JSON.parse(JSON.stringify(newcartsList)))
    }
    function addTocart(msg, data) {
        // console.log(msg);
        let newGoods = JSON.parse(JSON.stringify(data))
        let oldcartsList = JSON.parse(JSON.stringify(cartsList))
        if (oldcartsList == []) {
            setCartsList([...newGoods])
        }
        else {
            let flag = true
            let newcartsList = oldcartsList.map((val) => {
                if ((newGoods.id == val.id) && (newGoods.type == val.type)) {
                    flag = false
                    val.cartNum++
                    return val
                }
                else {
                    return val
                }
            })
            if (flag == true) newcartsList.push(newGoods)
            setCartsList([...newcartsList])
        }

        //TODO
        console.log("此时的购物车", cartsList);
    }
    function clearCart() {
        setCartsList([])
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    PubSub.subscribe("show", showModal)
    return (
        <div style={{ position: 'relative', paddingBottom: 15 }}>
            <Modal title="购物车" visible={isModalVisible} onCancel={handleCancel} width={600}
                maskClosable={false} footer={null} destroyOnClose>
                <div>
                    {
                        cartsList.map((val) => {
                            return <CartsGoods {...val} key={val.id + 111}></CartsGoods>
                        })
                    }
                    {allMoney != 0 && <div className='allMoney'>
                        {"合计: " + allMoney + '元'}
                    </div>}

                </div>
                {
                    cartsList.length == 0 && <Empty description={'购物车空空如也'} />
                }
                {
                    cartsList.length != 0 && <Button onClick={clearCart} danger style={{ marginTop: 20 }}>清空购物车</Button>
                }
            </Modal>
            <style jsx>
                {`
                      .allMoney{
                         color:red;
                         font-weight:bold;
                         position:absolute;
                         right:15%;
                         bottom:6%;
                      }    
                      `}
            </style>
        </div>
    )
}