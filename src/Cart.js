import React, { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { addCount, addItem, deCount } from './store';

const Cart = () => {
    let cartdata = useSelector((state)=> state.cart);
    let dispatch = useDispatch()
    console.log(cartdata);

    useEffect (()=> {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '장바구니페이지';
    },[]);

    // useEffect (()=>{
    //     dispatch(addItem(JSON.parse(localStorage.getItem('cart'))))
    //     // JSON.parse(localStorage.getItem('cart'));
    // },[]);
    
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cartdata.map(function(a, i){
                        return(
                            <tr>
                                <td>{cartdata[i].id}</td>
                                <td>{cartdata[i].name}</td>
                                <td>{cartdata[i].count}</td>
                                <td><button className='cartAmount' onClick={()=> {
                                    dispatch(addCount(cartdata[i].id))
                                }}>+</button>
                                <button className='cartAmount' onClick={()=>{
                                    cartdata[i].count >= 2 ? dispatch(deCount(i)) : alert('해당 상품의 최소 구매 수량은 1개 입니다');
                                }}>-</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table> 
        </div>
    );
};

export default Cart;