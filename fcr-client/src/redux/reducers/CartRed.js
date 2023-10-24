import { ADD_CART, EMPTY, REMOVE, REMOVE_ITEM } from "../type"

const initialStore = {
  carts: [],

}
// reducer
 const cartReducer = (state = initialStore, action) => {
  switch (action.type) {
    case ADD_CART:
      /*return {
        ...state,
        carts: [...state.carts, action.payload],
      }*/
      const itemIndex = state.carts.findIndex((item) => item._id === action.payload._id)
      if (itemIndex >= 0) {
        state.carts[itemIndex].quantity += 1
      } else {
        const temp = { ...action.payload, quantity: 1 }
        return {
          ...state,
          carts: [...state.carts, temp],
        }
      }

    case REMOVE:
      const data = state.carts.filter((el) => el._id !== action.payload)
      return {
        ...state,
        carts: data,
      }

    case REMOVE_ITEM:
      const itemIndex_desc = state.carts.findIndex((item) => item._id === action.payload._id)
      if (state.carts[itemIndex_desc].quantity >= 1) {
        const delete_item = (state.carts[itemIndex_desc].quantity -= 1)
        console.log([...state.carts, delete_item])
        return {
          ...state,
          carts: [...state.carts],
        }
      } else if (state.carts[itemIndex_desc].quantity === 1) {
        const data = state.carts.filter((el) => el._id !== action.payload._id)
        return {
          ...state,
          carts: data,
        }
      }
      case EMPTY:
        return{
          ...state,
          carts:[],
        }
    default:
      return state
  }
}
export default cartReducer;