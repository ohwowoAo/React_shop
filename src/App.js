import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";
import styled from "@emotion/styled";

function App() {
  let dispatch = useDispatch();
  let [productData, setProductdata] = useState(data);
  let [click, setClick] = useState(1);
  let navigate = useNavigate();
  let [alignment, setAlignment] = useState(0);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
    localStorage.getItem("cart") === null
      ? localStorage.setItem("cart", JSON.stringify([]))
      : dispatch(addItem(JSON.parse(localStorage.getItem("cart"))));
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <b style={{ fontSize: 24 }}>복</b>치네가구
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainBg></MainBg>

              <div className="bannerArea">
                <div className="banner">
                  <img
                    src={process.env.PUBLIC_URL + "/img/bigBanner01.webp"}
                    alt=""
                  />
                  <div>
                    <p>EXHIBITIONS 01</p>
                    <span>BEDDING</span>
                  </div>
                </div>
                <div className="banner">
                  <img
                    src={process.env.PUBLIC_URL + "/img/bigBanner02.webp"}
                    alt=""
                  />
                  <div>
                    <p>EXHIBITIONS 02</p>
                    <span>LIVING ROOM</span>
                  </div>
                </div>
                <div className="banner">
                  <img
                    src={process.env.PUBLIC_URL + "/img/bigBanner03.webp"}
                    alt=""
                  />
                  <div>
                    <p>EXHIBITIONS 03</p>
                    <span>DESK</span>
                  </div>
                </div>
              </div>
              <div className="mainTitle">
                <h2>주간 인기 제품</h2>
                <button
                  className={alignment === 0 ? "on" : null}
                  onClick={() => {
                    {
                      let copy = [...productData];
                      copy.sort((a, b) => (a.id < b.id ? -1 : 1));
                      setProductdata(copy);
                      setAlignment(0);
                    }
                  }}
                >
                  # 인기순 정렬
                </button>
                <button
                  className={alignment === 1 ? "on" : null}
                  onClick={() => {
                    {
                      let copy = [...productData];
                      copy.sort((a, b) =>
                        a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1
                      );
                      setProductdata(copy);
                      setAlignment(1);
                    }
                  }}
                >
                  # 이름순 정렬
                </button>
                <button
                  className={alignment === 2 ? "on" : null}
                  onClick={() => {
                    {
                      let copy = [...productData];
                      copy.sort((a, b) => (a.price < b.price ? -1 : 1));
                      setProductdata(copy);
                      setAlignment(2);
                    }
                  }}
                >
                  # 가격 낮은순 정렬
                </button>
                <button
                  className={alignment === 3 ? "on" : null}
                  onClick={() => {
                    {
                      let copy = [...productData];
                      copy.sort((a, b) => (a.price > b.price ? -1 : 1));
                      setProductdata(copy);
                      setAlignment(3);
                    }
                  }}
                >
                  # 가격 높은순 정렬
                </button>
              </div>

              <div className="container">
                <div className="row">
                  {productData.map(function (a, i) {
                    return <Product productData={productData} i={i}></Product>;
                  })}
                </div>
                {/* {
                click === 3 ? null :(click === 2? <button className="moreBtn" onClick={()=>{
                  setClick(click+1);
                  
                }}><img src= {process.env.PUBLIC_URL + '/img/moreBtn.png'} alt='' /></button>  : <button className="moreBtn" onClick={()=>{
                  setClick(click+1);
                  
                }}><img src= {process.env.PUBLIC_URL + '/img/moreBtn.png'} alt='' /></button>)
              } */}
              </div>
            </>
          }
        ></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

function Product(props) {
  return (
    <div className="col-md-4">
      <Link to={"/detail/" + props.productData[props.i].id}>
        <img src={props.productData[props.i].img} width="80%" />
      </Link>
      <h4>{props.productData[props.i].title}</h4>
      <p className="mainPrice">{props.productData[props.i].price}원</p>
    </div>
  );
}

export default App;

const MainBg = styled.div`
  height: 600px;
  background-image: url("./../public/img/mainbgimg.webp");
  background-image: url(${process.env.PUBLIC_URL}/img/mainbgimg.webp);
  background-size: cover;
  background-position: center;
`;
