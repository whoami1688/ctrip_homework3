import Goods from "../components/goods/goods"
import Carts from "../components/carts/carts"
import goodsData from '../data/data'
import React from "react"
import style from "../styles/Home.module.css"
import { ShoppingCartOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'
import { Tag } from 'antd';

export default function Home() {
  const [goodsList, setGoodsList] = React.useState(goodsData)
  const [cartsNum, setCartsNum] = React.useState(0)
  function showCart() {
    PubSub.publish("show", true)
  }
  function getLen(res) {
    setCartsNum(res)
  }
  function showWhichCart() {
    if (cartsNum>0) {
      return (
        <Tag icon={<ShoppingCartOutlined style={{ fontSize: 25 }} />}
          color="#21ba45">
          <span style={{ fontSize: 16 }}> {cartsNum}</span>
        </Tag>
      )
    } else {
      return <ShoppingCartOutlined style={{ fontSize: 25 }} />
    }
  }
  return (
    <div className={style.home}>
      <div className={style.goodsList}>
        {
          goodsList.map((item) => {
            return <Goods {...item} key={item.id}></Goods>
          })
        }
        <div className={style.chart} onClick={showCart} >
          {
            showWhichCart()
          }
        </div>

        <div className={style.carts}>
          <Carts getLen={getLen}></Carts>
        </div>
      </div>
    </div>
  )
}
