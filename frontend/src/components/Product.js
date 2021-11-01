import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'



function Product({ product }) {

  
    return (
        <Card className="my-3 p-3 rounded">
           
           
            <strong style={{ color: 'navy', alignItems:'center' }} className="hellow">-{product.discount}%</strong>
            
            
            <Link to={`/product/${product._id}`}>
            
                <Card.Img src={product.image} />
                
            </Link>

            <Card.Body >
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                {/* <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>         
                </Card.Text> */}

                <Card.Text as="div">
                    <strong className="tk">৳</strong><del > {product.old_price}</del>  <strong className="tk tk1"  >৳</strong>
                    
                    <strong className = "dis_money">{product.price}</strong>
                     
                </Card.Text>
{/* 
                <Card.Text as="div">
                   Status:  <strong style={{marginLeft:6}}>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                </Card.Text> */}
                

                <Card.Text as="text" >
                <Link to={`/product/${product._id}`}>
                <Button className = "by_now" disabled={product.countInStock == 0} style={{ marginTop: 20}} ><strong className = "buy_now">Buy now  <i class="fa fa-shopping-basket" aria-hidden="true"></i></strong></Button>
                    </Link>
                </Card.Text>


                {/* <Button>Buy now
                <Link to={`/product/${product._id}`}></Link>
                </Button> */}

            
           


            </Card.Body>
        </Card>
    )
}

export default Product
