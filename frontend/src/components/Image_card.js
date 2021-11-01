import React from 'react'
import { Container,Row,Col, Card,Button } from 'react-bootstrap'


const Image_card = () => {
    return (
        <>
            <Container>
  <Row>
    <Col>
    <Card className="img-card_back">
  <Card.Img src="https://i1.wp.com/laksura.com/wp-content/uploads/2021/06/2-1.png?fit=700%2C350&ssl=1" alt="Card image" />
  <Card.ImgOverlay>
    <Card.Title>Storm Offer</Card.Title>
    <Card.Text className= "card_main_header">
      Upto 40% off on Home Appliances
      </Card.Text>
    <Button variant="outline-primary">Primary</Button>{' '}
  </Card.ImgOverlay>
</Card>
    </Col>
    <Col>
    <Card className="img-card_back">
  <Card.Img src="https://i0.wp.com/laksura.com/wp-content/uploads/2021/07/2-1.png?fit=700%2C350&ssl=1" alt="Card image" />
  <Card.ImgOverlay>
    <Card.Title>Card title</Card.Title>
    <Card.Text className= "card_main_header">
     MotorBike 35% off
    </Card.Text>
    <Button variant="outline-primary">Primary</Button>{' '}
  </Card.ImgOverlay>
</Card>
    </Col>
  </Row>
 
</Container>
        </>
    )
}

export default Image_card
