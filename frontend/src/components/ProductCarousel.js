import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch()
    
    const [data, setData] = useState([]);

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, carousels } = productTopRated


    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' autoplay loop >
                    {carousels.map((carousel) => (
                        <Carousel.Item interval={2000} key={carousel.id}>
                                <Image src={carousel.image} fluid />
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ProductCarousel















// // import React, { useEffect } from 'react'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { Link } from 'react-router-dom'
// // import { Carousel, Image } from 'react-bootstrap'
// // import Loader from './Loader'
// // import Message from './Message'
// // import { listTopProducts } from '../actions/productActions'

// // function ProductCarousel() {

// //     const dispatch = useDispatch()

// //     const productTopRated = useSelector(state => state.productTopRated)
// //     const { error, loading, carousels } = productTopRated


// //     useEffect(() => {
// //         dispatch(listTopProducts())
// //     }, [dispatch])


// //     return ( loading ? <Loader />
// //     :error
// //     ? <Message variant='danger'>{error}</Message>
// //     :(
// //         <Carousel pause='hover' className='bg-dark'>
            
// //             {carousels.map(carousel => (
// //                 <Carousel.Item key={carousel.id}>
// //                         <Image src={carousel.image} alt={carousel.name} fluid />
// //                         <Carousel.Caption className='carousel.caption'>
// //                             <h4>{carousel.caption} </h4>
// //                         </Carousel.Caption>
// //                 </Carousel.Item>
// //             ))}
// //         </Carousel>
// //     )
// //     )
// // }

// // export default ProductCarousel
