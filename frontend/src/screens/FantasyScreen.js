import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Tabs } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { stormProducts } from '../actions/productActions'
import Count from '../components/Count'
import { Alert } from 'react-bootstrap'



function Fantasy() {

const dispatch = useDispatch()
const stormList = useSelector(state => state.stormList)
const {error, loading, products} = stormList

useEffect(() => {
    dispatch(stormProducts())

}, [dispatch])


    return (
        <div>
            
           <Alert variant="transparent" style={{marginTop:150}}>
            <Alert.Heading style={{textAlign:'center', color:'black'}} >Campaign Expired !  <i class="fas fa-heart-broken" style={{color:'red'}}></i></Alert.Heading>
            <p>
            </p>
            <hr />
            <p className="mb-0" style={{textAlign:'center', color:'black'}}>
                Please wait for our next campaign and stay connected with us for updated information.
            </p>
            </Alert>
         

            <Row className='flex flex-wrap' style={{ marginTop: 150 }}> 
        
                            <hr />
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">               

                            <Tab eventKey="tvs" title={<span><img src='https://s3-ap-southeast-1.amazonaws.com/media.evaly.com.bd/media/images/76d6b3547f94-7a531c8ebcf7-b45b4da4267a-c48484db76c7-tvs-auto-bangladesh.png'
                                width="150"
                                height="150"></img> </span>}
                                >
                            

                                
                                {products.filter((product) => product.brand === 'TVS' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                            </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="hero" title={<span><img src='https://s3-ap-southeast-1.amazonaws.com/media.evaly.com.bd/media/images/272a97796567-hero.png'
                                width="150"
                                height="150"></img> </span>}
                                >
                                {products.filter((product) => product.brand === 'Honda' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="suzuki" title={<span><img src='https://pngimage.net/wp-content/uploads/2018/06/marcas-de-moto-png-1.png'
                                width="150"
                                height="150"></img> </span>}
                                >
                                {products.filter((product) => product.brand === 'Suzuki' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="walton" title={<span><img src='https://df17fp68uwcso.cloudfront.net/eyJidWNrZXQiOiJtZWRpYS5ldmFseS5jb20uYmQiLCJrZXkiOiJtZWRpYS9pbWFnZXMvNTU3NjZiMTk1YTNmLTAzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjQwMCwiZml0IjoiY29udGFpbiJ9LCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfSwiZmxhdHRlbiI6dHJ1ZSwianBlZyI6eyJxdWFsaXR5IjoxMDB9fX0='
                                width="150"
                                height="150"></img> </span>}
                                >
                                {products.filter((product) => product.brand === 'Walton' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="minister" title={<span><img src='data:image/png;base64,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'
                                width="150"
                                height="150"></img> </span>}
                                >
                                {products.filter((product) => product.brand === 'Minister' ).map(p => (
                                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product = {p} />
                                    </Col>
                                ))}
                            </Tab>

                            <Tab eventKey="yamaha" title={<span><img src='https://cdn-0.motorcycle-logos.com/wp-content/uploads/2016/10/Yamaha-Motor-Logo.png'
                                width="150"
                                height="150"></img> </span>}
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
        </div>
    )
}

export default Fantasy


