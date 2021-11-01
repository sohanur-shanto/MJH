import React, {useState, useEffect} from 'react'
import { Form, Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


function ShippingScreen({history}) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [number, setNumber] = useState(shippingAddress.number)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, number }))
        history.push('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h4 style={{textAlign:'center', marginTop:40}}><b>Personal Information</b></h4>
            <hr />
            <br />
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>


                <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>


                <Form.Group controlId='postalCode'>
                        <Form.Label>Profession</Form.Label>
                        {/* <Form.Control
                            required
                            type='text'
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                            
                        </Form.Control> */}


                    <Form.Select aria-label="Default select example"
                    required
                    type='text'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}>
                    <option>Select Profession</option>
                    <option value="Ordinary">Ordinary / Regular</option>
                    <option value="Administration">Administration</option>
                    <option value="Air Force">Air Force</option>
                    <option value="Ansar">Ansar</option>
                    <option value="Army">Army</option> 
                    <option value="CID">CID</option>
                    <option value="DB">DB</option>
                    <option value="DGIF">DGIF</option>
                    <option value="Navy">Navy</option>
                    <option value="Police">Police</option>
                    <option value="RAB">RAB</option>
                    <option value="Others">Others</option>
            
                    </Form.Select>
                </Form.Group>



                <Form.Group controlId='number'>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            required
                            type='text'
                        
                            value={number ? number : ''}
                            onChange={(e) => setNumber(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>

                <br />
                <Button type='submit' style={{}}>
                   <strong> Continue</strong>
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
