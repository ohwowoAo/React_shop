import { configureStore, createSlice } from '@reduxjs/toolkit'

let cart = createSlice({
    name: 'cart',
    initialState :
    [
        {id : 0, name : '몽몽이포스터', count : 2},
        {id : 1, name : '스마일 컵, 냄비 받침대 2size', count : 1}
    ],
    reducers:{
      addCount(state, action){
        let cartId = state.findIndex((a)=> a.id === action.payload )
        state[cartId].count ++
      },
      deCount(state, action){
        state[action.payload].count --
      },
      addItem(state, action){
        state.splice(0, state.length, ...action.payload);
      }
    } 
})
export let {addCount, deCount, addItem} = cart.actions;

export default configureStore({
  reducer: {
    cart : cart.reducer
  }
}) 

