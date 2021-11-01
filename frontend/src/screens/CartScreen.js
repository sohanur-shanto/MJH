import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ match, location, history }) {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() =>{

        if(productId){
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }


    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        
        <Row style={{marginTop:30, marginBottom:300}}>
            <Col md={8}>
                <h4 style={{textAlign:'center'}}><b ><i className="fas fa-shopping-cart" ></i> Shopping Cart </b></h4>
                <hr /> 
                {cartItems.length === 0 ? (
                    <Message variant='danger'>
                        
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={3}>
                                        <strong className="tk">৳</strong>{item.price}
                                        </Col>

                                        <Col md={1}>

                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                                        >
                                            {   
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                 ) ) 
                                            }

                                        </Form.Control>

                                        </Col>

                                        <Col md={3}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash' style={{fontSize:18}}> <strong> Remove</strong></i>
                                            </Button>
                                        </Col>


                                    </Row>
                                </ListGroup.Item>
                            ) )}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>
                            <br />
                            <strong className="tk">৳</strong>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                                           
                    <ListGroup.Item>
                        <Button
                        style={{marginTop:10}}
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                           <strong> Proceed To Checkout <i class="fas fa-money-check-alt" style={{marginLeft:10, fontSize:15}}></i></strong>
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
