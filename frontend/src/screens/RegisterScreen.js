import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'



function RegisterScreen({ location, history }) {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)

    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }            
        }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }


    return (
        <FormContainer>
            <h3 style={{marginTop:50}}>Sign Up</h3>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='warning'>{error}</Message>}
            {loading && <Loader />}
            <hr />
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                        <Form.Label><i class="fas fa-user"></i><strong style={{marginLeft: 10}}>Name </strong> </Form.Label>
                        <Form.Control
                            required
                            type='name'
                            // placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <br />


                <Form.Group controlId='email'>
                        <Form.Label><i class="far fa-envelope"></i><strong style={{marginLeft: 10}}>Email Address</strong> </Form.Label>
                        <Form.Control
                            required
                            type='email'
                            // placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>

                <br />

                <Form.Group controlId='password'>
                        <Form.Label><i class="fas fa-lock"></i><strong style={{marginLeft: 10}}>Password </strong></Form.Label>
                        <Form.Control
                            required
                            type='password'
                            // placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                </Form.Group>

                <br />
                <Form.Group controlId='passwordConfirm'>
                        <Form.Label><i class="fas fa-lock"></i><strong style={{marginLeft: 10}}>Confirm Password </strong></Form.Label>
                        <Form.Control
                            required
                            type='password'
                            // placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >

                        </Form.Control>
                </Form.Group>


                    <br />
                    <Button type='submit'  bg="dark"><strong>Register</strong></Button>
                    <br />

                </Form>

                
                <Row className='py-3' style={{marginBottom:50}}>
                        <Col>
                        <br />
                            Already Have an Account? <Link 
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Sign In
                            </Link>
                        </Col>
                </Row>

        </FormContainer>
    )
}

export default RegisterScreen
