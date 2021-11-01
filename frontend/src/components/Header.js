import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Badge, Nav, Container,containerFluid, Row, Form, Dropdown, Button, FormControl, NavDropdown,DropdownButton, ListGroup, ButtonGroup } from 'react-bootstrap'
import { LinkContainer,MenuItem  } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import {InlineShareButtons} from 'sharethis-reactjs';
import Autosuggest from 'react-bootstrap-autosuggest'
import Search from 'react-search'
import ReactDOM from 'react-dom'
import { listProducts } from '../actions/productActions'
import { Typeahead } from 'react-bootstrap-typeahead'
import Product from '../components/Product'
import InputAutoSugest from 'react-input-autosugest';
import TestScreen from '../screens/TestScreen'


function Header() {

    const [singleSelections, setSingleSelections] = useState([]);
    
    
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const [Keyword, setKeyword] = useState('')

    let history = useHistory()
   

    const submitHandler = (e) => {
        e.preventDefault()
        if(Keyword){
            history.push(`/?keyword=${Keyword}`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart



    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>

                <Container className = "up_head_div">
                    <Nav.Link className="upper_header"><h7 style={{marginRight:10}}><i class="fas fa-phone-alt">
                        </i> +8801792-777660  </h7>
                          <h7><i className="far fa-envelope">
                             </i> support@laksura.com.bd</h7> <h7 style={{float:"right"}}>
                             <i class="fas fa-download"></i>   Download Our App Now</h7>
                    
                    </Nav.Link>
                   
                </Container>

          

               
            
            <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect className="ok" >
               

                <Container>
                    <LinkContainer to='/' style={{ marginRight: 60 }}>
                        <Navbar.Brand>
                            <img src='https://i2.wp.com/laksura.com.bd/wp-content/uploads/2021/06/main_logo.png?fit=487%2C180&ssl=1'
                            width="110"
                            height="45"
                            ></img>
                            </Navbar.Brand>
                    </LinkContainer> 
                    

                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    
                        <Form className="main_form" onSubmit={submitHandler} >
                            <FormControl className="main_form"
                                type="text"
                                placeholder="Search for products"
                                name='q'
                                className="col-md-12 input"
                                aria-label="Search"
                                onChange={(e) => setKeyword(e.target.value)}
                                
                            />

                             {/* <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={setSingleSelections}
                                    options={products}
                                    placeholder="Search for products"
                                    selected={singleSelections}  
                            />  */}
                      
              <Button type='submit' variant="outline-primary" className="main-btn"><i class="fas fa-search" style={{fontSize:13}}></i></Button>
                            </Form>
                        

                        <Nav className="cart_pi">

                        <LinkContainer to='/cart' >
                            <Nav.Link><i className="fas fa-shopping-cart" style={{marginRight: 20, fontSize:18}}><sup className='shanto'>{cartItems.length}</sup>
                          </i></Nav.Link>
                          

                        </LinkContainer>
     
                    </Nav>
                       

                        {userInfo ? (
                        <NavDropdown className = "user_l" title={userInfo.name} id='username'> 
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ): (
                        <LinkContainer to='/login' className = "user_l">
                            <Nav.Link className = "user_l"><i class="fas fa-user-tie"></i> Login/Register</Nav.Link>   
                        </LinkContainer>   
                    )}

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            
            <Navbar bg="primary" expand="lg" variant="dark" collapseOnSelect className="second_nav" >
                <Container>

                <Nav className = "campaign_zone">
                        <DropdownButton id="dropdown-basic-button"  className="browse" title= "Browse Categories" > 
                        <LinkContainer to='/category/?keyword1=1'>
                            <Dropdown.Item className= "main_drop"><i style={{marginRight:30}} class="fas fa-motorcycle"></i> MotorBike</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/category/?keyword1=2'>
                        <Dropdown.Item className= "main_drop"><i style={{marginRight:30}} class="fas fa-car"></i> Car</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/category/?keyword1=3'>
                        <Dropdown.Item className= "main_drop"><i style={{marginRight:30}} class="fas fa-fan"></i> Air Cooler</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/category/?keyword1=4'>
                        <Dropdown.Item className= "main_drop"><i style={{marginRight:30}} class="fas fa-landmark"></i> Land & property</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/category/?keyword1=4'>
                        <Dropdown.Item className= "main_drop"><i style={{marginRight:30}} class="fas fa-mobile-alt"></i> Mobile Phone</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/category/?keyword1=4'>
                        <Dropdown.Item className= "main_drop"> <i style={{marginRight:30}} class="fas fa-laptop"></i> Computer & Laptop</Dropdown.Item>
                        </LinkContainer>
                       
                       
</DropdownButton> 
                        
                        
                    </Nav>


                    


                {/* <Nav className = "merchant_zone">
                        <LinkContainer to='/cart' >
                        <Nav.Link><i className="fas fa-balance-scale"></i> 
                        {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                         Tk</Nav.Link>
                    </LinkContainer>
                </Nav> */}

                <Nav className = "campaign_zone">
                        <LinkContainer to='/payment-verification' >
                        <Nav.Link><i class="fas fa-cloud-upload-alt"></i> Upload</Nav.Link>
                    </LinkContainer>
                        </Nav>

                <Nav className = "campaign_zone">
                        <LinkContainer to='/storm' >
                        <Nav.Link><i class="fas fa-poo-storm"></i> Storm</Nav.Link>
                    </LinkContainer>
                        </Nav>
                        {/* <Nav className = "campaign_zone">
                        <LinkContainer to='/brands' >
                        <Nav.Link><i class="fab fa-asymmetrik"></i> All Brands</Nav.Link>
                    </LinkContainer>
                        </Nav> */}

                        <Nav className = "campaign_zone">
                        <LinkContainer to='/laksuramall' >
                        <Nav.Link ><i class="fas fa-store"></i> Laksura Mall</Nav.Link>
                    </LinkContainer>
                        </Nav>
                        

                        <Nav className = "campaign_zone">
                        <LinkContainer to='/campaign' >
                        <Nav.Link><i class="fas fa-globe"></i> All Campaigns</Nav.Link>
                    </LinkContainer>
                    <Nav className = "campaign_zone" style={{marginLeft:65}}>
                        <LinkContainer to='/vendor' >
                        <Nav.Link><i className="fas fa-users"></i> Merchant Zone </Nav.Link>
                    </LinkContainer>
                        </Nav>
                        </Nav>

                        <Nav className = "help">
                        <a href="https://www.facebook.com/groups/323932469282385" >
                        <i class="fas fa-question"></i> Help
                    </a>
                        </Nav>

                        {/* <Nav className = "admin">
                        <LinkContainer to='/orderlist' >
                        <Nav.Link ><i class="fas fa-user-lock"></i></Nav.Link>
                    </LinkContainer>
                        </Nav> */}
                
                </Container>
            
            </Navbar>


        </header>
     
    )
                    }


export default Header
