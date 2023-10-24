import { ADD_CART, REMOVE, REMOVE_ITEM, EMPTY } from "../type"

export const ADD = (item) => {
  return {
    type: ADD_CART,
    payload: item,
  }
}
export const DELETE = (id) => {
  return {
    type: REMOVE,
    payload: id,
  }
}
export const EMPTYCART = () => {
  return {
    type: EMPTY
  }
}
export const REMOVE_INT = (item) => {
  return {
    type: REMOVE_ITEM,
    payload: item,
  }
}

export const setSelectedChat = (chat) => {
  return {
    type: 'SET_SELECTED_CHAT',
    payload: chat
  }
}