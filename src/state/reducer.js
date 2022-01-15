
const initItemsState = {
  items:[],
  
}

export const itemReducer = (state = initItemsState, action) => {
  if (action.type === '@items/created') {
    return {...state, items:state.items.concat(action.payload)}
  } 
  if (action.type === '@items/deleted') {
    
    return {...state, items: state.items.filter( (item, index) => index !== action.payload)}
  } 
  return state
}

const initBundleState = {
  bundles:[]
}

export const bundleReducer = (state = initBundleState, action) => {
  if (action.type === '@bundle/added') {
    return {...state, bundles:state.bundles.concat(action.payload)}
  } 
  if (action.type === '@bundle/deleted') {
    
    return {...state, bundles: state.bundles.filter( (item, index) => index !== action.payload)}
  } 
  return state
}


 export const createItem = (item) => {
    return {
      type: '@items/created',
      payload: item
      
    }
  }

  export const deleteItem = (index) => {
    return {
      type: '@items/deleted',
      payload: index     
    }
  }

  export const addBundle = (item) => {   
    return {
      type: '@bundle/added',
      payload: item  
    }
  }

  
  export const deleteBundle = (index) => {
    return {
      type: '@bundle/deleted',
      payload: index     
    }
  }

  