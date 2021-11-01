import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,


    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,


    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,


    PRODUCT_STORM_REQUEST,
    PRODUCT_STORM_SUCCESS,
    PRODUCT_STORM_FAIL,
} from '../constants/productConstants'


export const productListReducer = (state = { products: [], p: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: []}
        
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state

    }
}




export const categoryProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true, products: []}
        
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state

    }
}








export const stormListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_STORM_REQUEST:
            return { loading: true, products: []}
        
        case PRODUCT_STORM_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_STORM_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state

    }
}



export const productDetailsReducer = (state = { product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state

    }
}



// export const productTopRatedReducer = (state = { product: [] }, action) => {
//     switch (action.type) {
//         case PRODUCT_TOP_REQUEST:
//             return { loading: true, products: [] }
        
//         case PRODUCT_TOP_SUCCESS:
//             return { loading: false, product: action.payload }

//         case PRODUCT_TOP_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state

//     }
// }



export const productTopRatedReducer = (state = { carousels: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, carousels: [] }

        case PRODUCT_TOP_SUCCESS:
            return { loading: false, carousels: action.payload, }

        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}