import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import data from './data';
import './Detail.css';
import axios from 'axios';
import { addItem } from './store.js';

const Detail = () => {
    let [productData, setProductdata] = useState(data);
    let [timeSale, SettimeSale] = useState(true);
    let [amount, SetAmount] = useState(1);
    // let [num, setNum] = useState('');
    let [tab, SetTab] = useState(0);
    let dispatch = useDispatch();

    let {id} = useParams();
    let navigate = useNavigate();
    
    useEffect (()=> {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '상품상세페이지';
    },[]);
    
    useEffect(()=> {
        let watched = localStorage.getItem('watched');
        watched = JSON.parse(watched);
        watched.push(data[id].id);
        watched = new Set(watched);
        watched = Array.from(watched);
        localStorage.setItem('watched',JSON.stringify(watched));
    },[])

    useEffect(()=> {
        setTimeout(()=> {SettimeSale(false)}, 3000); 
    },[])

    useEffect(()=>{
        if(isNaN(amount) === true){
            alert('숫자만 입력해주세요');
            SetAmount(amount = 1);
        }
        if(amount <= 0){
            alert('해당 상품의 최소 구매 수량은 1개 입니다');
            SetAmount(amount = 1);
        }
    },[amount])
    
    // useEffect(() => {
    //     console.log(localStorage.getItem('cart'))
    // },[])
    
    
    return (
        <div className="container">
            <div className="row">
                {
                    timeSale === true ? <div className='timesale'><p>※ 배송비 이벤트 기간 ~8월 15일 (3초후에 사라집니다.) </p></div> : null
                }
                
                <div className="col-md-8 thumb-info">
                    <img src={productData[id].img} width="100%" />
                </div>
                <div className="col-md-4 info">
                    <h4 className="pt-5">{productData[id].title}</h4>
                    <p className='productInfo'>{data[id].content}</p>
                    <p className='price'>{data[id].price}</p>
                    <table class="detailOpt">
                        <tr>
                            <th scope="row">제조사</th>
                            <td>내용이 들어갑니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">브랜드</th>
                            <td>내용이 들어갑니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">배송비</th>
                            <td> 배송비이벤트🔥 주문금액에 상관없이 무료배송</td>
                        </tr>
                    </table>
                    <div className='innerPrice'>
                        <p className='innerPriceName'>{productData[id].title}</p>
                        <div className='MK_qty-ctrl'>
                            <input value={amount} onChange={(e) => {SetAmount(e.target.value)}}></input>
                            <button className='plus' onClick={()=>{SetAmount(amount ++ )}}>+</button>
                            <button className='minus' onClick={()=>{SetAmount(amount --)}}>-</button>
                        </div>
                        <p className='innerPrice_basic'>{ Math.ceil(data[id].price * amount)}</p>
                    </div>
                    
                    <div className='total'><p>TOTAL</p> <b>{ Math.ceil(data[id].price * amount)}원</b></div>
                    <button className="cartBtn" onClick={()=>{
                        let cartList = JSON.parse(localStorage.getItem('cart'));
                        cartList.push({id : data[id].id, name : data[id].title, count : 1});
                        localStorage.setItem('cart', JSON.stringify(cartList))
                        dispatch(addItem(JSON.parse(localStorage.getItem('cart'))))
                    }}>Cart</button> 
                    <button className="backBtn" onClick={()=>{navigate(-1)}}>Back</button> 
                </div>
            </div>
            {/* <input onChange={(e) => {setNum(e.target.value)}}></input> */}
            
            <div className='tabWrap'>
                <ul>
                    <li className={tab === 0? 'bold' : null} onClick={()=>{SetTab(0)}}>제품정보</li>
                    <li className={tab === 1? 'bold' : null} onClick={()=>{SetTab(1)}}>제품문의</li>
                    <li className={tab === 2? 'bold' : null} onClick={()=>{SetTab(2)}}>리뷰</li>
                    <li className={tab === 3? 'bold' : null} onClick={()=>{SetTab(3)}}>교환/반품</li>
                </ul>
                <Tabcontent tab={tab} />
            </div>
            
        </div>
    );
};

function Tabcontent (props) {

    let [fade, setFade] = useState('');

    useEffect (()=>{
        setTimeout(()=> {setFade('end')}, 10)
        return () => {
            setFade('')
        }
    }, [props.tab])

    return (<div className={'tabInfo ' + 'start ' + fade}>
        { [ <div>제품정보입니다</div>,  <div>제품문의입니다</div>, <div>리뷰</div>, <div>교환/반품</div>][props.tab]}</div>)
}
export default Detail;