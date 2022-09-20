import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Filter from "./Filter";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { Link } from "react-router-dom";



function LandingPage() {
  const [collectionList, setCollectionList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState("");
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [hasmore, setHasmore] = useState(true);
  const [loading, setIsloading] = useState(false);

  const handleBottom = () => {
    if (hasmore === true) {
      fetchApi(skip);
      setSkip(skip + 20);
    }
  };



  useEffect(() => {
    handleBottom(fetchApi());
  }, []);

  const fetchApi = async (skipMed) => {
      setIsloading(true);
      const data = await fetch(
        "https://healercare-b6b7f.el.r.appspot.com/EcomMedicine/getMedicines",
        {
          method: "post",
          body: JSON.stringify({
            category: [],
            brand: [],
            tags: [],
            name: "",
            skip: skipMed,
          }),
          cache: "default",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const item = await data.json();
      let med = collectionList;
      med = [...med, ...item];
      // console.log(med);
      setCollectionList(med);
      setFiltered(med);
      // alert(`${collectionList.length}`);
      if (item.length < 20) {
        setHasmore(false);
      }
      setIsloading(false);
    }

    function rendertag(){
      if(loading === true) {
        return <h1>Loading...</h1>
      }
    }



  return ( 
    <React.Fragment>
      <div className="App body_style">
        <header>
          <div className="cart-shopping">
            <h2>Shopping</h2>
          </div>
          <div className="cart-icon">
            {/* <form onSubmit={search} className="search-form"> */}
            <FontAwesomeIcon className="search" size="2x" icon={faSearch} />
            <input
              className="searchbox"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {/* </form> */}
            <Link
              to={`/cart`}
            >
            <img src="./images/cart.png" alt="cart-logo" />
            <p>0</p>
            </Link>
          </div>
        </header>

        <Filter
          collectionList={collectionList}
          setFiltered={setFiltered}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
        />

        {filtered
          .filter((curElem) => {
            if (search === "") {
              return curElem;
            } else if (
              curElem.productName.toLowerCase().includes(search.toLowerCase())
            ) {
              return curElem;
            }
          })
          .map((curElem) => {
            // console.log(curElem);
            return <Card key={curElem._id} curElem={curElem}/>;
          })}
        <BottomScrollListener onBottom={() => handleBottom()} offset={100} />
        
      </div>
      {rendertag()}
    </React.Fragment>
  );
}

export default LandingPage;
