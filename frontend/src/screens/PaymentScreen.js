import React, {useState, useEffect} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'



function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Bank Deposite, Fund Transfer (Online/Offline Payment)')

    // const [customerType, setcustomerType] = useState('Regular', 'Police', 'RAB', 'DGIF', 'CID', 'NAVY', 'Air Force', 'Army', 'DB', 'Administration')

    if (!shippingAddress.address) {
        history.push('/shipping')
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        // dispatch(saveCustomerType(customerType))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <hr />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <br />
                    <br />
                    <br />
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <br />
                    <br />
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Offline Payment (Bank Deposite/Fund Transfer)'
                            id= 'paypal'
                            name= 'paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                        <br />

                    
                        
                    </Col>
                </Form.Group>

               
                <br />
               
                <Button type='submit'>
                <strong> Continue</strong>
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
