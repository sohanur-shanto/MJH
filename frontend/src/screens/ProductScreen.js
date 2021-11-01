import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Form, Button, Card, Modal } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import products from '../products'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { productDetailsReducer } from '../reducers/productReducers'
import {InlineShareButtons} from 'sharethis-reactjs';
import {InlineFollowButtons} from 'sharethis-reactjs';
import { addToCart, removeFromCart } from '../actions/cartActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Container} from 'react-floating-action-button'


function ProductScreen({ match, history }) {
    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    
    return (
        <div>
            <Container>
             
                <Button
                    tooltip="Cart"
                    icon=""
                    rotate={true}
                    onClick={handleShow}
                    className="btn btn-primary btn-circle btn-xl"><i className="fas fa-shopping-cart" style={{fontSize:23}}><sup className='shanto'>{cartItems.length}</sup></i></Button>
            </Container>

            <Link to='/' className='btn btn-light my-3'><strong>Go Back</strong></Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                :(
                            <Row>
                                <Col md={6}>
                                    
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                
                               
                            
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                       

                                        <ListGroup.Item>
                                            Old Price: <strong className="tk">৳</strong><del> {product.old_price} </del>
                                        </ListGroup.Item>

                                        <ListGroup.Item >
                                            Discount: <b>{product.discount}%</b>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: <strong className="tk">৳</strong> {product.price}
                                        </ListGroup.Item>


                                        <ListGroup.Item style={{color: 'red'}}>
                                            <p><b>{product.short_description}</b></p> 
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <br />
                                            <InlineShareButtons
                                                config={{
                                                    alignment: 'center',  // alignment of buttons (left, center, right)
                                                    color: 'white',      // set the color of buttons (social, white)
                                                    enabled: true,        // show/hide buttons (true, false)
                                                    font_size: 16,        // font size for the buttons
                                                    labels: 'cta',        // button labels (cta, counts, null)
                                                    language: 'en',       // which language to use (see LANGUAGES)
                                                    networks: [           // which networks to include (see SHARING NETWORKS)
                                                    'facebook',
                                                    'messenger',
                                                    'whatsapp',
                                                    
                                                    ],
                                                    padding: 12,          // padding within buttons (INTEGER)
                                                    radius: 4,            // the corner radius on each button (INTEGER)
                                                    show_total: true,
                                                    size: 35,             // the size of each button (INTEGER)

                                                    // OPTIONAL PARAMETERS
                                                    url: 'https://www.laksura.com.bd', // (defaults to current url)
                                                    image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                                                    description: 'laksura.com is a Global Multifunctional trusted e- commerce site, Which focus on cloud computing digital streaming IoT and artificial intelligence',       // (defaults to og:description or twitter:description)
                                                    title: 'Laksura',            // (defaults to og:title or twitter:title)
                                                    message: 'Please let us know your query',     // (only for email sharing)
                                                    subject: 'Customer Support',  // (only for email sharing)
                                                    username: 'laksura' // (only for twitter sharing)
                                                }}
                                                />
                                            </ListGroup.Item>


                                <ListGroup.Item style={{marginTop: 30}}>
                                                                    <strong>Have questions about this product ?</strong>
                                                                    <p style={{marginTop: 10}}><i class="fas fa-phone-volume"></i> +8801792-777660</p>
                                </ListGroup.Item>
   
           
                                            <br />

                                    <ListGroup.Item>
                                                                    <InlineFollowButtons
                                        config={{
                                            action: 'Follow us:', // call to action (STRING)
                                            action_enable: true,  // show/hide call to action (true, false)
                                            action_pos: 'bottom', // position of call to action (left, top, right)
                                            alignment: 'center',  // alignment of buttons (left, center, right)
                                            color: 'social',       // set the color of buttons (social, white)
                                            enabled: true,        // show/hide buttons (true, false)
                                            networks: [           // which networks to include (see FOLLOW NETWORKS)
                                            'twitter',
                                            'facebook',
                                            'instagram',
                                            'youtube'
                                            ],
                                            padding: 8,           // padding within buttons (INTEGER)
                                            profiles: {           // social profile links for buttons
                                            twitter: 'laksura',
                                            facebook: 'laksura.com.bd',
                                            instagram: 'laksura',
                                            youtube: '/channel/UC7opyXRii-Qm3BXI2QXNCSw'
                                            },
                                            radius: 9,            // the corner radius on each button (INTEGER)
                                            size: 32,             // the size of each button (INTEGER)
                                            spacing: 12       // the spacing between buttons (INTEGER)
                                        }}
                                        />
                                        </ListGroup.Item>


        
                                </ListGroup>

                                </Col>

                                

                                <Col md={3}>
                                    <img src={product.brandImage} style={{height:80, width:80, marginBottom:40, marginLeft:80}}></img>
                                    <Card>
                                        <ListGroup variant='flush'>

                                            
                                            
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                    <strong><strong className="tk">৳</strong> {product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>


                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>


                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity:</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {   
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x+1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ) ) 
                                                            }

                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            
                                            )}
                                            <br />

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler} 
                                                    className='btn-block' 
                                                    disabled={product.countInStock == 0} 
                                                    type='button'
                                         
                                                >
                                                <strong>Add to Cart <i className="fas fa-shopping-cart" style={{marginLeft: 10}}></i></strong></Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                    <br />
                                    <br />


                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                
                                                <Row>
                                                    <Col>
                                                    <strong><i class="far fa-thumbs-up" style={{marginRight:20, color: 'red'}}></i> Authentic Product</strong>
                                                    <p>100% authentic products</p>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                    <strong><i class="fas fa-lock" style={{marginRight:20, color: 'red'}}></i> Secure Payment</strong>
                                                    <p>100% secure payment</p>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                    <strong><i class="fas fa-headphones" style={{marginRight:20, color: 'red'}}></i> Dedicated support</strong>
                                                    <p>From 10am-10pm Sat-Thu</p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                 
                                </Col>
                            </Row>


                )

            }

            <Row>
            <ListGroup variant="flush">
            <Col md={3}>

                                        <ListGroup.Item>
                                           <b> Description </b>
                                        </ListGroup.Item>
                                        </Col>

                                        <Col md={6}>

                                <ListGroup.Item>
                                    {product.description}
                                </ListGroup.Item>
                                </Col>
            </ListGroup>
            </Row>



            <Modal  
                    show={show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    dialogClassName="modal-90w"
                    onHide={handleClose}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                        <Col >
                                <h4 style={{textAlign:'center'}}><b > Shopping Cart <i className="fas fa-shopping-cart" style={{color:'green'}}></i></b></h4>
                                <hr /> 
                                {cartItems.length === 0 ? (
                                    <Message variant='danger'>
                                        
                                        Your cart is empty 
                                    </Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                            {cartItems.map(item => (
                                                <ListGroup.Item key={item.product}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col md={5}>
                                                            <Link to={`/product/${item.product}`}><strong>{item.name}</strong></Link>
                                                        </Col>

                                                        <Col md={2}>
                                                        <strong className="tk">৳</strong>{item.price}
                                                        </Col>

                                                        <Col md={2}>

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

                                                        <Col md={2}>
                                                            <Button
                                                                type='button'
                                                                variant='light'
                                                                onClick={() => removeFromCartHandler(item.product)}
                                                            >
                                                                <i className='fas fa-trash' style={{fontSize:15}}></i>
                                                            </Button>
                                                        </Col>

                                                    </Row>
                                                </ListGroup.Item>
                                            ) )}
                                    </ListGroup>
                                )}
                        <br />
                        <Button variant="primary" onClick={handleClose}>
                        <strong className="tk">Total-  ৳ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
                        </Button>
                            </Col>


                        </Modal.Body>

                        <Modal.Footer>
                       
                        
                        <Button variant="danger" onClick={handleClose}>
                        <strong> Close</strong>
                        </Button>
                        <LinkContainer to='/cart' > 
                        <Button variant="success" onClick={handleClose}>
                        <strong> Go to Cart</strong>
                        </Button>
                        </LinkContainer>
                            

                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                        <strong>Checkout </strong>
                        </Button>
                        </Modal.Footer>
                    </Modal>
            

        </div>
    )
}

export default ProductScreen
