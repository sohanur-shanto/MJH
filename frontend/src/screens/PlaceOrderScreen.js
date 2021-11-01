import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { orderCreateReducer } from '../reducers/orderReducers'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({ history }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    cart.shippingPrice = cart.cartItems.reduce((acc, item) => acc + 300 * item.qty, 0).toFixed(2)

    cart.taxPrice = 0
    
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    if(!cart.paymentMethod){
        history.push('/payment')
    }


    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET })
        }
    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <br />
            <br />
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3 style={{marginBottom: 15}}>Shipping</h3>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {'  '} Profession: {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                <strong>Number: </strong>
                                {cart.shippingAddress.number}
                            </p>
                        </ListGroup.Item>
                        <br />
                        <br />



                        <ListGroup.Item>
                            <h3 style={{marginBottom: 15}}>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <br />
                        <br />


                        <ListGroup.Item>
                            <h3 style={{marginBottom: 15}}>Order Items</h3>
                            {cart.cartItems.length === 0 ? <Message variant='danger'>
                                Your Cart is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid />
                                                </Col>

                                                <Col md={5}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={5}>
                                                    {item.qty} X <strong className="tk">৳ </strong>{item.price} = <strong className="tk">৳ </strong>{(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>                   
                </Col>

                <Col md={5}>
                    <Card>
                        <ListGroup variant='flush' style={{textAlign:'center'}}>
                            <ListGroup.Item>
                                <h3 >Order Summary</h3>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Item: </Col>
                                    <Col>
                                    <strong className="tk">৳</strong> {cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>
                                    <strong className="tk">৳</strong> {cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>
                                    <strong className="tk">৳</strong> {cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>
                                    <strong className="tk">৳</strong> {cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

{/* 
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item> */}

                               
                            <ListGroup.Item style={{textAlign:'center'}}>
                                <Button type='button' className='btn-block' disbaled={cart.cartItems === 0} onClick={placeOrder}>
                                <strong> Place Order</strong>   
                                </Button>
                                <br />
                               
                            </ListGroup.Item>
                           
                        </ListGroup>
                        
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
