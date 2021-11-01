import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { userLoginReducer } from '../reducers/userReducers'





function LoginScreen({location, history}) {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)

    const { error, loading, userInfo } = userLogin 

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }            
        }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer >
            <h3 style={{marginTop:50}}>Sign In</h3>
            {error && <Message variant='warning'>{error}</Message>}
            {loading && <Loader />}
            <hr />
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label><i class="far fa-envelope"></i><strong style={{marginLeft: 15}}>Email Address </strong> </Form.Label>
                    <Form.Control
                        type='email'
                        // placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    >
                    </Form.Control>
                </Form.Group>
                <br />



                <Form.Group controlId='password'>
                    <Form.Label><i class="fas fa-lock"></i><strong style={{marginLeft: 15}}>Password </strong></Form.Label>
                    <Form.Control
                        type='password'
                        // placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <br />
                <Button type='submit' bg="dark"><strong>Sign In</strong></Button>
                <br />

                <Row className='py-3'>
                    <Col>
                    <br />
                        New Customer? <Link 
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Sign Up
                        </Link>
                    </Col>
                    
                </Row>
                <Row className='py-3' style={{marginBottom:50}}>
                    <Col>
                  
                    Forgot your assword? <Link 
                        to={redirect ? `/reset-password` : '/register'}>
                        Reset Password
                        </Link>
                    </Col>
                    
                </Row >
                
            </Form >
        </FormContainer>
    )
}

export default LoginScreen
