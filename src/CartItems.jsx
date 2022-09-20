import React, { useState, useEffect } from "react";
import CartStyle from "./Cart.module.css";
import LandingPage from "./LandingPage";

const ContextCart = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [productItemDetail, setProductItemDetail] = useState([]);
  const [productAdd, setProductAdd] = useState([]);



  async function handleClickRemove(item) {
    // console.log(item.productCartId);
    // console.log(item.quantity);
    const data = await fetch(
      "https://healercare-b6b7f.el.r.appspot.com/cart/remove",
      {
        method: "DELETE",
        body: JSON.stringify({
          productCartId: `${item.productCartId}`,
          userId: "1234567890",
          quantity: item.quantity,
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const items = await data.json();
    console.log('Remove api',items);
    fetchApi();
  }

  async function handleClickMinus(item) {
    console.log(item.productCartId);
    const data = await fetch(
      "https://healercare-b6b7f.el.r.appspot.com/cart/remove",
      {
        method: "DELETE",
        body: JSON.stringify({
          productCartId: `${item.productCartId}`,
          userId: "1234567890",
          quantity: 1,
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const items = await data.json();
    console.log(items);
    fetchApi();
  }

  async function handleClickPlus(item) {
    // console.log(item);
    const data = await fetch(
      "https://healercare-b6b7f.el.r.appspot.com/cart/additem",
      {
        method: "post",
        body: JSON.stringify({
          productId: `${item.productId}`,
          userId: "1234567890",
          productName: `${item.productName}`,
          unit: `${item.unit}`,
          brand: `${item.brand}`,
          image: `${item.image}`,
          price: item.price,
          quantity: 1,
          discount: item.discount,
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const items = await data.json();
    setProductAdd([items.result.cartItems]);
    fetchApi();
  }

  async function handleClickEmpty(item) {
    console.log(item.userId);
    const data = await fetch(
      "https://healercare-b6b7f.el.r.appspot.com/cart/empty",
      {
        method: "post",
        body: JSON.stringify({
          userId: item.userId,
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await data.json();
    fetchApi();
  }


  const fetchApi = async () => {
    const data = await fetch(
      "https://healercare-b6b7f.el.r.appspot.com/cart/mine",
      {
        method: "post",
        body: JSON.stringify({
          userId: "1234567890",
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const items = await data.json();
    setProductDetail(items.result.cartItems);
    setProductItemDetail(items.result);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="body_div">
      {/* <h1> Cart </h1> */}
      {/* <h1 className={CartStyle.heading_style}> Cart </h1> */}
      <section className={CartStyle.cart_section}>
        <h1 className={CartStyle.heading}>
          Your Cart (
          <span className="total-items-count">{productDetail.length}</span>
          items )
        </h1>
      </section>
      {productDetail.map((curElem) => {
        return (
          <div key={curElem.productId}>
            {/* <p>Vart{curElem.productId}</p> */}
            <section className={CartStyle.cart_section}>
              <div className={CartStyle.cart_items}>
                <div className={CartStyle.items_container}>
                  <div className={CartStyle.items_info}>
                    <div className={CartStyle.image}>
                      <img src={curElem.image} alt="..." />
                    </div>
                    <div className={CartStyle.title}>
                      <h2>{curElem.productName}</h2>
                      <p>{curElem.brand}</p>
                    </div>
                    <div className={CartStyle.quantity}>
                      <i
                        className="{CartStyle.fas}"
                        onClick={() => {
                          handleClickMinus(curElem);
                        }}
                      >-</i>
                      <input type="text" placeholder={curElem.quantity} />
                      <i
                        className="{CartStyle.fas},fas fa-plus"
                        onClick={() => {
                          handleClickPlus(curElem);
                        }}
                      ></i>
                    </div>
                    <div className={CartStyle.price}>
                      <h3>Rs: {curElem.price}</h3>
                    </div>

                    <div
                      className={CartStyle.delete_item}
                      onClick={() => {
                        handleClickRemove(curElem);
                      }}
                    >
                      <i className="{CartStyle.fas}">
                        <span className={CartStyle.ce}>Remove</span>
                      </i>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <div className={CartStyle.bill}>
        <h3>
          Sub Total:&emsp;Rs. <span>{productItemDetail.subtotal}</span>
        </h3>
        <hr />
        <h3>
          Discount:&emsp;Rs. <span>{productItemDetail.discount}</span>
        </h3>
        <hr />
        {/* <h3>
          Delivery Fee:&emsp; Rs. <span>200</span>
        </h3>
        <hr /> */}
        <br />
        <h3>
          Your Bill Is:&emsp;Rs. <span>{productItemDetail.total}</span>
        </h3>
        <button>Checkout</button>
        <button onClick={() => {
                        handleClickEmpty(productItemDetail);
                      }}>Empty Cart</button>
      </div>
    </div>
  );
};

export default ContextCart;
