import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Tabs, Tab, Modal, Button, Image, ListGroup, Form, Carousel } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Container} from 'react-floating-action-button'
import InfiniteScroll from 'react-infinite-scroll-component';
import Image_card from '../components/Image_card'





function HomeScreen({history}) {

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    let keyword = history.location.search

    console.log(keyword)

    useEffect(() => {
        dispatch(listProducts(keyword))
        params: {  }
    }, [dispatch, keyword])


    return (
        
        <InfiniteScroll style={{
            overflow:'hidden'
        }}
        dataLength={products.length}
        next={() => setPage(page+1)}
        hasMore={true}
        >
            <Container>
            <Button
                tooltip="Cart"
                icon=""
                rotate={true}
                onClick={handleShow}
                className="btn btn-circle btn-xl float-button"
                ><i className="fas fa-shopping-cart" style={{fontSize:23}}><sup className='shanto'>{cartItems.length}</sup></i></Button>

            </Container> 

             { !keyword && <ProductCarousel /> }
             <br />
             { !keyword && <Image_card />}
             
        
     

            <h3 style={{ textAlign: "center", marginTop: 100}}><b><i class="far fa-grin-beam"></i> Recent Products  </b></h3>
            <hr />
            <br />



            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
              
                    <Row className='flex flex-wrap' >
                            {products.length === 0 &&(
                                    <Col style={{ textAlign: "center" }}>
                                        
                                        
                                        <img src='https://tradebharat.in/assets/catalogue/img/no-product-found.png'
                                        style={{height:400, width:800}}></img>
                                        
                                        
                                    </Col>                
                                )}

                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                    </Row> 
                   
            } 

                



                    {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                    :
                        <Row className='flex flex-wrap' style={{ marginTop: 150 }}>
                            
                                <h3 style={{ textAlign: "center" }}><b><i class="fas fa-biking"></i> MotorBike   </b></h3>
                            
                                <hr />
                                {products.filter((product) => product.category === 1 ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                        </Row>
                    }
                    {
                        loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                        :

                        <Row className='flex flex-wrap'>
                           
                                <h3 style={{ textAlign: "center", marginTop: 150 }}><b><i class="fas fa-car"></i> Car   </b></h3>
                                            <hr />
                                            {products.filter((product) => product.category === 2 ).map(p => (
                                                <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                                    <Product product = {p} />
                                                </Col>
                                            ))}     
                            
                    
                        </Row>
                    } 




                    {
                    loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                    :
                        <Row className='flex flex-wrap' style={{ marginTop: 150 }}>
                            
                                <h3 style={{ textAlign: "center" }}><b><i class="fas fa-fan"></i> Air Conditioner  </b></h3>
                            
                                <hr />
                                {products.filter((product) => product.category === 3 ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                        </Row>
                    }



                    

                    <Row className='flex flex-wrap' style={{ marginTop: 150 }}> 
                            <h3 style={{ textAlign: "center", marginTop: 100 }}><b><i class="fas fa-gifts" ></i> Shop By Brands </b></h3>
                            <hr />
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">               

                            <Tab className="brand" eventKey="tvs" title={<span><strong><img src='https://s3-ap-southeast-1.amazonaws.com/media.evaly.com.bd/media/images/76d6b3547f94-7a531c8ebcf7-b45b4da4267a-c48484db76c7-tvs-auto-bangladesh.png'
                                width="150"
                                height="150"></img></strong> </span>}
                                >
                                {products.filter((product) => product.brand === 'TVS' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                            </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="hero" title={<span><strong><img src='https://s3-ap-southeast-1.amazonaws.com/media.evaly.com.bd/media/images/272a97796567-hero.png'
                                width="150"
                                height="150"></img> </strong></span>}
                                >
                                {products.filter((product) => product.brand === 'Honda' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="suzuki" title={<span><strong><img src='data:image/png;base64,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'
                                width="150"
                                height="150"></img> </strong></span>}
                                >
                                {products.filter((product) => product.brand === 'Suzuki' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="walton" title={<span><strong><img src='https://df17fp68uwcso.cloudfront.net/eyJidWNrZXQiOiJtZWRpYS5ldmFseS5jb20uYmQiLCJrZXkiOiJtZWRpYS9pbWFnZXMvNTU3NjZiMTk1YTNmLTAzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjQwMCwiZml0IjoiY29udGFpbiJ9LCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfSwiZmxhdHRlbiI6dHJ1ZSwianBlZyI6eyJxdWFsaXR5IjoxMDB9fX0='
                                width="150"
                                height="150"></img></strong> </span>}
                                >
                                {products.filter((product) => product.brand === 'Walton' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="minister" title={<span><strong><img src='data:image/png;base64,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'
                                width="150"
                                height="150"></img> </strong></span>}
                                >
                                {products.filter((product) => product.brand === 'Minister' ).map(p => (
                             
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                    
                                    
                                ))}
                            </Tab>
                        
                                

                            <Tab eventKey="yamaha" title={<span><strong><img src='https://motorcycle-logos.com/wp-content/uploads/2016/10/Logo-Yamaha.png'
                                width="150"
                                height="150"></img> </strong></span>}
                                >
                                {products.filter((product) => product.brand === 'Yamaha' ).map(p => (
                                  
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                   
                                ))}
                            </Tab>
                            

                            <Tab eventKey="home" title="">
                                <h5 style={{textAlign:'center', marginTop:60, color: 'green'}}><b></b> </h5>
                            </Tab>
                        </Tabs>
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
                                    <br /> 
                                    
                                   
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
                                                            <Image src={item.image} alt={item.name} fluid />
                                                        </Col>
                                                        <Col md={4}>
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

                                                        <Col md={3}>
                                                            <Button
                                                                type='button'
                                                                variant='light'
                                                                onClick={() => removeFromCartHandler(item.product)}
                                                            >
                                                                <i className='fas fa-trash' style={{fontSize:13}}><strong> Remove</strong></i>
                                                            </Button>
                                                        </Col>



                                                    </Row>
                                                </ListGroup.Item>
                                            ) )}
                                    </ListGroup>
                                )}
                                <br />
                                <Button variant="outline-dark" onClick={handleClose}>
                                <strong className="tk">Total-  ৳ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
                                </Button>
                            </Col>
                            


                        </Modal.Body>

                        <Modal.Footer>
                        
                        
                        <Button variant="outline-danger" onClick={handleClose}>
                           <strong> Close </strong>
                        </Button>
                        <LinkContainer to='/cart' > 
                        <Button variant="outline-success" onClick={handleClose}>
                        <strong> Go to Cart</strong>
                        </Button>
                        </LinkContainer>
                            

                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                            variant="outline-dark"
                        >
                        <strong>Checkout </strong>
                        </Button>
                        </Modal.Footer>
                    </Modal>
        </InfiniteScroll>
    )
}

export default HomeScreen























{/* {
                        loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                        :

                        <Row className='flex flex-wrap'>
                            {products.length != 0 && !keyword && (
                            <Col>
                                <h3 style={{ textAlign: "center" }}><b> Car   <i class="fas fa-car"></i></b></h3>
                                            <hr />
                                            {products.filter((product) => product.category === 2 ).map(p => (
                                                <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                                    <Product product = {p} />
                                                </Col>
                                            ))}     
                            </Col>
                            )}
                        </Row>
                    }  */}


                    {/* <Row> 
                        <h3 style={{ textAlign: "center", marginTop: 100 }}><b>Shop By Brands <i class="fas fa-gifts"></i></b></h3>
                            <hr />
                            <Col md={2}>
                                <img src='https://s3-ap-southeast-1.amazonaws.com/media.evaly.com.bd/media/images/76d6b3547f94-7a531c8ebcf7-b45b4da4267a-c48484db76c7-tvs-auto-bangladesh.png'
                                width="150"
                                height="150"></img>
                            </Col>

                            <Col md={2}>
                                <img src='https://s3-ap-southeast-1.amazonaws.com/media.evaly.com.bd/media/images/272a97796567-hero.png'
                                width="150"
                                height="150"></img>
                            </Col>

                            <Col md={2}>
                                <img src='https://pngimage.net/wp-content/uploads/2018/06/marcas-de-moto-png-1.png'
                                width="150"
                                height="150"></img>
                            </Col>

                            <Col md={2}>
                                <img src='https://df17fp68uwcso.cloudfront.net/eyJidWNrZXQiOiJtZWRpYS5ldmFseS5jb20uYmQiLCJrZXkiOiJtZWRpYS9pbWFnZXMvNTU3NjZiMTk1YTNmLTAzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjQwMCwiZml0IjoiY29udGFpbiJ9LCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfSwiZmxhdHRlbiI6dHJ1ZSwianBlZyI6eyJxdWFsaXR5IjoxMDB9fX0='
                                width="150"
                                height="150"></img>
                            </Col>

                            <Col md={2}>
                                <img src='https://www.carlogos.org/car-logos/scuderia-ferrari-logo-800x1050.png'
                                width="150"
                                height="150"></img>
                            </Col>

                            <Col md={2} style={{}}>
                                <img src='https://cdn-0.motorcycle-logos.com/wp-content/uploads/2016/10/Yamaha-Motor-Logo.png'
                                width="150"
                                height="150"></img>
                            </Col>
                    </Row> */}