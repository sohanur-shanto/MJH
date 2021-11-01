import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Tabs } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { categoryListProducts } from '../actions/productActions'
import Count from '../components/Count'



function CategoryScreen({history}) {

    
    const dispatch = useDispatch()
 
    let keyword1 = history.location.search

    const categoryProductList = useSelector(state => state.categoryProductList)
    const {error, loading, products} = categoryProductList

    useEffect(() => {
        dispatch(categoryListProducts(keyword1))
 
    }, [dispatch,keyword1])

    return (
        <div style={{textAlign:'center'}}>
           
                    {loading ? <Loader />
                                : error ? <Message variant='danger'>{error}</Message>
                                    :
                                    <Row className='flex flex-wrap' >
                                            {products.map(product => (
                                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                                    <Product product={product} />
                                                </Col>
                                            ))}
                                    </Row>  
                            }

               
                        
                        </div>
                    )
                }
             
            

export default CategoryScreen
