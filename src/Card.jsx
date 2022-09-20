import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card(curElem) {
  // console.log(curElem);
  const [productDetail, setProductDetail] = useState([]);

  async function handleClick(item) {
    // console.log(item.productName);
    // console.log(item._id);
    // console.log(item.unit);
    // console.log(item.brand);
    // console.log(item.image);
    // console.log(item.perUnitPrice[0].price);
    // console.log(item.perUnitPrice[0].discount);
    const data = await fetch(
      "https://healercare-b6b7f.el.r.appspot.com/cart/additem",
      {
        method: "post",
        body: JSON.stringify({
          productId: `${item._id}`,
          userId: "1234567890",
          productName: `${item.productName}`,
          unit: `${item.unit}`,
          brand: `${item.brand}`,
          image: `${item.image}`,
          price: item.perUnitPrice[0].price,
          quantity: 1,
          discount: item.perUnitPrice[0].discount,
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const items = await data.json();
    setProductDetail([items.result.cartItems]);

  }


  return (
    <>
      <div className="container">
        <div className="card">
          <div className="head">
            <h2>{curElem.curElem.category}</h2>
            <div className="discount">
              <button>
                {Math.round(
                  (curElem.curElem.perUnitPrice[0].discount /
                    curElem.curElem.perUnitPrice[0].price) *
                    100
                )}
                % OFF
              </button>
            </div>
          </div>
          <div>
            <Link
              to={`/${curElem.curElem.brand}/${curElem.curElem.productName}`}
            >
              <div className="product">
                <img src={curElem.curElem.image} alt="..." />
              </div>
              <div className="text">
                <div className="title">
                  <h3>{curElem.curElem.productName}</h3>
                  <p>{curElem.curElem.brand}</p>
                  <h3>{curElem.curElem.unit}</h3>
                  <p>
                    PKR.{curElem.curElem.perUnitPrice[0].price}
                    <s style={{ color: "red" }}>
                      PKR.
                      {curElem.curElem.perUnitPrice[0].price +
                        curElem.curElem.perUnitPrice[0].discount}
                    </s>
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <button
            className="btn-cart"
            type="button"
            onClick={() => {
              handleClick(curElem.curElem);
            }}
          >
            Add to Cart
          </button>
        </div>
        {/* <div> */}
        {/* </div> */}
      </div>
    </>
  );
}


export default Card;
