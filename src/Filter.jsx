import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import  "./Dropdown.css";

function Filter({ setActiveGenre, activeGenre, setFiltered, collectionList }) {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(collectionList);
      return;
    }
    const filtered = collectionList.filter((item) =>
      item.brand.includes(activeGenre)
    );
    setFiltered(filtered);
  }, [activeGenre]);

  return (
    <div className="filter-container">
      <div className="dropdown">
        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <FontAwesomeIcon className="filter" size="3x" icon={faFilter} />
          </div>

          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <ul className="select">
              <li>
                <label
                  className={activeGenre === 0 ? "active" : ""}
                  onClick={() => setActiveGenre(0)}
                >
                  <input type="radio" name="radio" />
                  All
                </label>
              </li>
              <li>
                <label
                  className={activeGenre === "Hamdard" ? "active" : ""}
                  onClick={() => setActiveGenre("Hamdard")}
                >
                  <input type="radio" name="radio" />
                  Hamdard
                </label>
              </li>
              <li>
                <label
                  className={activeGenre === "Ashraf" ? "active" : ""}
                  onClick={() => setActiveGenre("Ashraf")}
                >
                  <input type="radio" name="radio" />
                  Ashraf
                </label>
              </li>
              <li>
                <label
                  className={activeGenre === "Ajmal" ? "active" : ""}
                  onClick={() => setActiveGenre("Ajmal")}
                >
                  <input type="radio" name="radio" />
                  Ajmal
                </label>
              </li>
              <li>
                <label
                  className={activeGenre === "Marhaba" ? "active" : ""}
                  onClick={() => setActiveGenre("Marhaba")}
                >
                  <input type="radio" name="radio" />
                  Marhaba
                </label>
              </li>
              <li>
                <label
                  className={activeGenre === "Qarshi" ? "active" : ""}
                  onClick={() => setActiveGenre("Qarshi")}
                >
                  <input type="radio" name="radio" />
                  Qarshi
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
