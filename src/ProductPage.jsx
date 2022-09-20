import React, { useState, useEffect, useRef } from "react";
import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
// import Helmet from 'react-helmet';

function ProductPage() {
  const [productDetail, setProductDetail] = useState([]);
  const [additem, setAdditem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [qunatity, setQuantity] = useState();

  /// Quantity
  function handleClickQuantity(item) {
    setQuantity(item);
    console.log(item);
  }
  function handleClickQuantity2(item) {
    setQuantity(item);
    console.log(item);
  }

  /// AddToCart
  async function handleClickAddToCart(item) {
    // console.log(item);
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
          quantity: count,
          discount: item.perUnitPrice[0].discount,
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const items = await data.json();
    console.log(items);
    setAdditem([items.result.cartItems]);
  }

  // Counter
  const timer = useRef(null);
  const IncNum = () => {
    setCount(count + 1);
    console.log("countInc", count);
    timer.current = setInterval(() => setCount((count) => count + 1), 250);
  };
  const DecNum = () => {
    if (count > 0) {
      setCount(count - 1);
      console.log("countDec", count);
      timer.current = setInterval(
        () => setCount((count) => Math.max(count - 1, 0)),
        250
      );
    }
  };
  function timeoutClear() {
    clearInterval(timer.current);
  }

  /// Fetch Api

  let params = useParams();

  const fetchApi = async () => {
    setLoading(true);
    const data = await fetch(
      "https://healercare-b6b7f.el.r.appspot.com/EcomMedicine/getMedicines",
      {
        method: "post",
        body: JSON.stringify({
          category: [],
          // brand: ['ajmal'],
          brand: [`${params.productBrand}`],
          tags: [],
          // name: 'v2',
          name: `${params.productName}`,
        }),
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const item = await data.json();
    let product = productDetail;
    product = [...item];
    setProductDetail(product);
    setLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, [params.productBrand]);

  function render() {
    if (productDetail[0]) {
      if (productDetail[0].perUnitPrice[1]) {
        if (loading === true) {
          return <h1>loading</h1>;
        } else {
          return (
            <>
              <section className={styles.section}>
                <div className={styles.image}>
                  <img src={productDetail[0].image} alt="..." />
                </div>

                <div className={styles.content}>
                  <p className={styles.name}>{productDetail[0].productName}</p>
                  <div className={styles.brand}>
                    <h3>Brand: </h3>
                    <p className={styles.brand_name}>
                      &emsp;{productDetail[0].brand}
                    </p>
                  </div>

                  <div className={styles.quantity_cont}>
                    <h3>Quantity:</h3>
                    <div className={styles.quantity}>
                      <i
                        className="{styles.fas}"
                        onMouseLeave={timeoutClear}
                        onMouseUp={timeoutClear}
                        onMouseDown={DecNum}
                      >-</i>
                      <h5>{count}</h5>
                      <i
                        className="{styles.fas},fas fa-plus"
                        onMouseLeave={timeoutClear}
                        onMouseUp={timeoutClear}
                        onMouseDown={IncNum}
                      ></i>
                    </div>
                  </div>

                  <div className={styles.size_cont}>
                    <h3>Size:</h3>
                    <button
                      type="button"
                      className={styles.btn_num}
                      onClick={() => {
                        handleClickQuantity(
                          productDetail[0].perUnitPrice[0].number
                        );
                      }}
                    >
                      {productDetail[0].perUnitPrice[0].number}
                    </button>
                    <button
                      type="button"
                      className={styles.btn_num}
                      onClick={() => {
                        handleClickQuantity2(
                          productDetail[0].perUnitPrice[1].number
                        );
                      }}
                    >
                      {productDetail[0].perUnitPrice[1].number}
                    </button>
                  </div>

                  <div className={styles.detail}>
                    <h3>Detail:</h3>
                    <p>{productDetail[0].detail}</p>
                  </div>

                  <div className={styles.dosage}>
                    <h3>Dosage:</h3>
                    <p>{productDetail[0].usage}</p>
                  </div>
                  <button
                    className={styles.btn_add}
                    onClick={() => {
                      handleClickAddToCart(productDetail[0]);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </section>
            </>
          );
        }
      } else {
        if (loading === true) {
          return <h1>loading</h1>;
        } else {
          return (
            <>
              <section className={styles.section}>
                <div className={styles.image}>
                  <img src={productDetail[0].image} alt="..." />
                </div>

                <div className={styles.content}>
                  <p className={styles.name}>{productDetail[0].productName}</p>
                  <div className={styles.brand}>
                    <h3>Brand: </h3>
                    <p className={styles.brand_name}>
                      &emsp;{productDetail[0].brand}
                    </p>
                  </div>

                  <div className={styles.quantity_cont}>
                    <h3>Quantity:</h3>
                    <div className={styles.quantity}>
                      <i
                        className="{styles.fas}"
                        onMouseLeave={timeoutClear}
                        onMouseUp={timeoutClear}
                        onMouseDown={DecNum}
                      >-</i>
                      <h5>{count}</h5>
                      <i
                        className="{styles.fas},fas fa-plus"
                        onMouseLeave={timeoutClear}
                        onMouseUp={timeoutClear}
                        onMouseDown={IncNum}
                      ></i>
                    </div>
                  </div>

                  <div className={styles.size_cont}>
                    <h3>Size:</h3>
                    <button
                      type="button"
                      className={styles.btn_num}
                      onClick={() => {
                        handleClickQuantity(
                          productDetail[0].perUnitPrice[0].number
                        );
                      }}
                    >
                      {productDetail[0].perUnitPrice[0].number}
                    </button>
                  </div>

                  <div className={styles.detail}>
                    <h3>Detail:</h3>
                    <p>{productDetail[0].detail}</p>
                  </div>

                  <div className={styles.dosage}>
                    <h3>Dosage:</h3>
                    <p>{productDetail[0].usage}</p>
                  </div>
                  <button
                    className={styles.btn_add}
                    onClick={() => {
                      handleClickAddToCart(productDetail[0]);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </section>
            </>
          );
        }
      }
    }
  }

  return <>{render()}</>;
}

export default ProductPage;
