import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table, Tabs, Tab, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { logout } from '../actions/userActions'
import ReactDOM from "react-dom"
import Map from '../components/Map'
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

 



function ProfileScreen({history}) {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const logoutHandler = () => {
        dispatch(logout())
    }


    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }            
        }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }
    }

    return (

            <Row className='flex flex-wrap'>
              
                
            
                <hr />
                <Tab.Container className="userprofile" id="left-tabs-example" defaultActiveKey="third">
            <Row>
                <Col sm={2}>
                <Nav variant="pills" className="flex-column pillsize bg-light">
                    <Nav.Item className="nav_bg_1">
                    <Nav.Link eventKey="third"><i class=" nav_i fas fa-tachometer-alt" ></i><strong className="pill_nav" style={{marginLeft:10}}>Dashboard </strong> </Nav.Link>
                    </Nav.Item>
                    <hr />
                    <Nav.Item className="nav_bg_1">
                    <Nav.Link eventKey="first"><i class=" nav_i far fa-hand-point-right"></i><strong className="pill_nav" style={{marginLeft:12}}>My Account </strong>
                                </Nav.Link>
                    </Nav.Item>
                    <hr />
                    <Nav.Item className="nav_bg_1">
                    <Nav.Link eventKey="second"><i class=" nav_i fab fa-jedi-order"></i><strong className="pill_nav" style={{marginLeft:12}}>Orders </strong> </Nav.Link>
                    </Nav.Item>
                    <hr />
                    <Nav.Item className="nav_bg_1">
                    <Nav.Link eventKey="fourth"><i class=" nav_i fas fa-map-marker-alt"></i><strong className="pill_nav" style={{marginLeft:12}}>Address </strong> </Nav.Link>
                    </Nav.Item>
                    <hr />

                    <Nav.Item className="nav_bg_1">
                    <Nav.Link eventKey="fifth"><i class=" nav_i far fa-heart"></i><strong className="pill_nav" style={{marginLeft:12}}>Wishlist </strong> </Nav.Link>
                    </Nav.Item>

                    <hr />
                    <Nav.Item className="nav_bg_1">
                    <Nav.Link eventKey="sixth"><i class=" nav_i fas fa-user-tie"></i><strong className="pill_nav" style={{marginLeft:12}}>Vendor </strong> </Nav.Link>
                    </Nav.Item>
                    <hr />

                    <Nav.Item className="nav_bg_1">
                    <Nav.Link eventKey="eight"><i class=" nav_i fas fa-clipboard-list"></i><strong className="pill_nav" style={{marginLeft:12}}>Support Ticket</strong> </Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                
                <Col sm={10} style={{marginBottom:80}}>
                <Tab.Content>
                    <Tab.Pane eventKey="third">
                
                    <br />
                        <strong>Hello,</strong>
                        
              

            <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
            <br />
            <br />
            {/* https://i.pinimg.com/originals/e1/59/25/e15925c931a81678a3c2e0c0a40db781.gif */}
                <Col> 
                <img src='https://cdn.dribbble.com/users/2788963/screenshots/6829123/characterheadgif3.gif'
                        height='220'
                        ></img>
                        <img src='https://cdn.dribbble.com/users/1501052/screenshots/4545496/finding-signatures.gif'
                        height='250'
                        ></img>
                    </Col>
                    <br />
                    <br />
                    <br />

          <strong>Become a Vendor</strong><p>Vendors can sell products and manage a store with a vendor dashboard.</p>
            <br />
          <strong>Become a Wholesale Customer</strong><p>Wholesale customers can purchase products wholesale from vendors.</p>
          </Tab.Pane>
        <Tab.Pane eventKey="first" >
     
        {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='warning'>{error}</Message>}
                    {loading && <Loader />}
                   
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control
                                    required
                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>
                        <br />


                        <Form.Group controlId='email'>
                                <Form.Label><b>Email Address</b></Form.Label>
                                <Form.Control
                                    required
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>
                        <br />

                        <Form.Group controlId='password'>
                                <Form.Label><b>Password</b></Form.Label>
                                <Form.Control
                            
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >

                                </Form.Control>
                        </Form.Group>
                        <br />


                        <Form.Group controlId='passwordConfirm'>
                                <Form.Label><b>Confirm Password</b></Form.Label>
                                <Form.Control
                                
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >

                                </Form.Control>
                        </Form.Group>


                            <br />
                            <Button type='submit' bg="dark"><strong>Update</strong></Button>
                            <br />

                        </Form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                
                            {loadingOrders ? (
                                <Loader/>
                            ) : errorOrders ? (
                                <Message variant='danger'>{errorOrders}</Message>
                            ) : (
                                <Table striped responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: "center" }}>Number</th>
                                            <th  style={{ textAlign: "center" }}>Date</th>
                                            <th  style={{ textAlign: "center" }}>Total</th>
                                            <th  style={{ textAlign: "center" }}>Paid</th>
                                            <th  style={{ textAlign: "center" }}>Status</th>
                                            <th  style={{ textAlign: "center" }}>Delivered</th>
                                            <th style={{ textAlign: "center" }}>Information</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orders.map(order => (
                                            <tr>
                                                <td style={{ textAlign: "center" }}>{order._id}</td>
                                                <td>{order.createdAt.substring(0,10)}</td>
                                                <td  style={{ textAlign: "center" }}><strong className="tk">৳</strong> {order.totalPrice}</td>
                                                <td  style={{ textAlign: "center" }}>{order.isPaid ? order.paidAt : (
                                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                                )}</td>
                                                <td style={{ textAlign: "center" }}>{order.status }</td>
                                                <td  style={{ textAlign: "center" }}>{order.isDelivered ? order.deliverAt : (
                                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                                )}</td>
                                                <td style={{ textAlign: "center" }}>
                                                    <LinkContainer to={`/order/${order._id}`}>
                                                        <Button className='btn-sm' >Invoice</Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </Table>
                            )}      
                    </Tab.Pane>
                        
                                <Tab.Pane eventKey="fourth">
                            <Map />
                                </Tab.Pane>

                                <Tab.Pane eventKey="fifth">
                                    <div style={{marginTop:80, textAlign:'center'}}><img src='https://cdn.dribbble.com/users/392618/screenshots/2121061/wishlist.gif'></img></div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="sixth">
                                
                                       
                                        <p style={{textAlign:'center', marginTop: 50}}><b style={{color: 'green'}}>Vendor</b> management is important for a number of reasons. For one thing, vendor management plays a key role when it comes to selecting the right vendor for a particular business need.<strong style={{color:'red'}}> You don't have any permission to become a vendor</strong>. Go contact with the authorities.</p>
                                        <br />
                                        <br />
                                        
                                        <div style={{textAlign:'center'}}>
                                            <img src='https://acegif.com/wp-content/gifs/handshake-32.gif' style={{marginTop:50, height: 200}}></img></div>
                                </Tab.Pane>

                                {/* <Tab.Pane eventKey="seven">
                                    <div style={{marginTop:100, textAlign:'center'}}>
                                        <h4 style={{color:'green'}}><b>You have no downloads</b></h4>
                                        <br />
                                        <img src='https://cdn.dribbble.com/users/729829/screenshots/2267150/download20001.gif'
                                    height='300'
                                    width='400'></img></div>
                                </Tab.Pane> */}

                                <Tab.Pane eventKey="eight">
                                <p style={{textAlign:'center'}}><strong style={{color:'red'}}>No tickets found! </strong>Have any query? Let us know your query and we will get back to you as soon as possible. Contact with our customer care for support ticket.</p>
                                    <div style={{ textAlign:'center'}}><img src='https://637835.smushcdn.com/1231160/wp-content/uploads/2020/09/Active-Support-1.gif?lossy=1&strip=1&webp=1'
                                ></img></div>
                                <p style={{ textAlign:'center'}}> <i class="fas fa-phone-alt" style={{marginRight:20, color: 'red'}}></i> +8801792-777660 <br /><i class="fas fa-headphones" style={{marginRight:20, color: 'red'}}></i> Dedicated support <br /> From 10am-10pm Sat-Thu</p>
                                    
                                </Tab.Pane>

                            </Tab.Content>
                            </Col>
                        </Row>
                        </Tab.Container>
                    
            
        </Row>


    )

    
}

export default ProfileScreen
