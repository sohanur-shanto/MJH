import React, {useState, useEffect, useRef} from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import {InlineShareButtons} from 'sharethis-reactjs'
import dateFormat from 'dateformat'

import { PDFExport, savePDF } from '@progress/kendo-react-pdf'


function OrderScreen({ match }) {

    const pdfExportCompornent = useRef(null)
    const contentArea = useRef(null)

    const handleExportWithComponent = (event) => {
        pdfExportCompornent.current.save()
    }

    const handleExportWithMethod = (event) => {
        savePDF(contentArea.current, { paperSize: "A4" })

    }

    

    

    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)


    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails


    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    
  

    const properties = { header: 'Acme' }
    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AfMme_xhIk14WIsgDuJXietSKeQyuv3Gb9XU2Mh9tgfwl-jy2KjSa-24bnzHpcxdNg7uL_Tb7apE2ox8'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }


    useEffect(() => {
        if(!order || successPay || order._id !== Number(orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if (!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }



    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) :  (
       
        
        <div className="invoicees">
            <div className='button-area' style={{ marginTop:30}}>
                                    <Button primary={false} onClick={handleExportWithComponent}><h7>Download Invoice</h7></Button>
                                </div>
        <PDFExport ref={pdfExportCompornent} paperSize="A4">
       
            <Row>
            
                <Col md={12}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <Col style={{marginTop:10, textAlign:'center'}}>
                           <img src='https://i2.wp.com/laksura.com.bd/wp-content/uploads/2021/06/main_logo.png?fit=487%2C180&ssl=1'
                            width="150"
                            height="60"
                            ></img>
                        
                            </Col>

                            <Row style={{marginTop:10, marginBottom:20}}>
                                <Col md={6} >
                                    <ListGroup.Item>
                                        <p><strong style={{marginRight:1}}>Name:</strong> <h7 >{ order.user.name}</h7></p>
                                        <p><strong style={{marginRight:1}}>Address:</strong> <h7 >{ order.shippingAddress.address}</h7></p>
                                        <p><strong style={{marginRight:1}}>Mobile:</strong> <h7 >{order.shippingAddress.number}</h7></p>
                                        <p><strong style={{marginRight:1}}>Profession:</strong> <h7 >{order.shippingAddress.postalCode}</h7></p>
                                    </ListGroup.Item>
                                </Col>
                                <Col md={6}>
                                    <ListGroup.Item>
                                        <p><strong style={{marginRight:2}}>Invoice Number:</strong> <h7 >#{order._id}</h7></p>
                                        <p><strong style={{marginRight:2}}>Order Number:</strong> <h7 >{order._id}</h7></p>
                                        <p><strong style={{marginRight:2}}>Order Date:</strong> <h7 style={{marginRight:2}}>{dateFormat(order.createdAt, "yyyy-mm-dd")}</h7>Time: {dateFormat(order.createdAt, "hh:mm:ss")}</p>
                                    </ListGroup.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                   
                                        <p>
                                            <strong style={{marginRight:5}}> Payment Method: </strong>
                                            {order.paymentMethod}
                                        </p>

                                        {order.isPaid ? (
                                            <Message variant='success'><p>Paid on: <h7 style={{marginRight:7, marginLeft:10}}>{dateFormat(order.paidAt, "yyyy-mm-dd")}</h7>Time: {dateFormat(order.createdAt, "hh:mm:ss")}</p></Message>
                                        ) : (
                                            <Message variant='danger'><p>Not Paid (Please Pay Soon)</p></Message>
                                        )}
                                 
                                </Col>
                            </Row>

                     
                        </ListGroup.Item>

                        <ListGroup.Item>
                   
                      <Row>
                            <h5 style={{textAlign:'center', marginTop: 15, marginBottom:15}}>Order Items</h5></Row>
                            
                    
                            {order.orderItems.length === 0 ? <Message variant='danger'>
                                You have no order.
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid/>
                                                </Col>

                                                <Col md={5}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={6}>
                                                <strong className="tk"> {item.qty} X Tk {item.price}</strong> = <strong className="tk">Tk {(item.qty * item.price).toFixed(2)}</strong>
                                                </Col>
                                            </Row>
                                       
                                    ))}

                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>                   
                </Col>
               
                                      

                <Col >
                    <Card>
                        <ListGroup variant='flush'>

                        
                           
                                <h5 style={{textAlign:'center', marginTop: 15, marginBottom:15}}>Order Summary</h5>
                             
                           

                                <ListGroup.Item>
                           
                                <Row style={{textAlign:'center'}}>
                                    <Col><b>Subtotal</b> </Col>
                                    <Col>
                                    <strong className="tk">Tk {order.itemsPrice}</strong>
                                    </Col>
                                </Row>
                            


                            
                                <Row style={{textAlign:'center'}}>
                                    <Col><b>Shipping</b> </Col>
                                    <Col>
                                    <strong className="tk">Tk {order.shippingPrice}</strong><small>via Flat rate</small>
                                    </Col>
                                </Row>
                           


                            
                                <Row style={{textAlign:'center'}}>
                                    <Col><b>Total </b></Col>
                                    <Col>
                                    <strong className="tk" >Tk {order.totalPrice} </strong>
                                    </Col>
                                </Row>
                            

                          
                                <Row style={{textAlign:'center'}}>
                                    <Col><b>Payment Status</b> </Col>
                                    <Col>
                                    <strong style={{color:'red', textAlign:'center'}}>{order.status}</strong> 
                                    </Col>
                                </Row>
                           

                             
                                <Row style={{textAlign:'center'}}>
                                    <Col><b>Order Status</b> </Col>
                                    <Col>
                                    <strong style={{color:'red', textAlign:'center'}}>{order.orderStatus}</strong> 
                                    </Col>
                                </Row>
                                
                                <Row style={{textAlign:'center'}}>
                                    <Col style={{ marginBottom:500}}><b>Received By</b> </Col>
                                    <Col>
                                    <strong style={{ textAlign:'center'}}>{order.received}</strong> 
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                      

                            {/* {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                        </ListGroup.Item>
                                    )} */}
                            
                            
                        </ListGroup>       
                    </Card>
                </Col>
                  
            </Row>
            </PDFExport>
          
                 
                                
           
           
        </div>
    )
}

export default OrderScreen
