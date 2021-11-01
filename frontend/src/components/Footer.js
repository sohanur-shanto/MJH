import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon, MDBBtn } from "mdbreact";
import { Container, Row, Col } from 'react-bootstrap'
import React, {Component} from 'react'
// import footer_logo from "../../public/images/white_logo.png"


function Footer() {
    return (
      
        <MDBFooter color="blue" className="font-small  mt-4" >
             <Container>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>

          
          
          <MDBCol md="3">
          <img src="https://923998.smushcdn.com/2409548/wp-content/uploads/elementor/thumbs/white_logo-3-p9uh3qfhqlstqa6o1b972rh3bgqk1qmsqjnoeipoq2.png?lossy=0&strip=1&webp=1" alt="Girl in a jacket"/>
            <p>
            laksura.com is a Global Multifunctional trusted e- commerce site, Which focus on cloud computing digital streaming IoT and artificial intelligence.
            </p>
          </MDBCol>


          <MDBCol md="2">
            <br />
            <h6 className="title" style={{ marginBottom: 20 }}><b>Download</b></h6>
            <img src='https://diplomaticcard.be/wp-content/uploads/2016/10/google-play-badge.png' height='40px' style={{ marginBottom: 20 }}></img>
            <br />
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png' height='40px'></img>
          </MDBCol> 
          <MDBCol md="2">
            <br />
            <h6 className="title"> <b>Menu</b></h6>
            <hr />
            <ul>
              <li className="list-unstyled">
                <a href="#!">Privacy Policy</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Refund Policy</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Terms & Conditions</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">About Us</a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol md="3" style={{ marginTop: 20 }}>
            <h6 className="title"><b>Contact Us</b></h6>
            <br />
            <p>
            31 Del Janani, Flat-4, Road-6, Block-C, Banani Model Town, Dhaka -1213
            </p>
            <p>Email: support@laksura.com</p>
            <p>Contact no: +8801792-777660</p>
          </MDBCol>


          <MDBCol md="2" style={{ marginTop: 20 }}>
            <h6 className="title" style={{ marginBottom: 30 }}><b>Get In Touch</b></h6>
        
        <a href="https://www.facebook.com/laksura.com.bd" className="reddit-ic mr-3">
        <MDBIcon fab icon="facebook-f" size="3x" />
        </a> <br />
        <a href="#!" className="reddit-ic mr-3">
        <MDBIcon fab icon="twitter" size="3x" />
        </a> <br />
        <a href="#!" className="reddit-ic mr-3"> 
        <MDBIcon fab icon="youtube" size="3x" />
         </a> <br />
    
          </MDBCol>

          
       




        </MDBRow>
        
      </MDBContainer>
      
      </Container>


      <div className="container-fluid footer_ssl">
      <div className="footer-copyright text-center py-3">
          <img className="img-fluid" src='https://i2.wp.com/laksura.com/wp-content/uploads/2021/05/pay_method_support-1.png?resize=1024%2C165&ssl=1'
         ></img>       
      
        </div>
      </div>
      <div className="text-center py-5">
      <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Laksura.com Enterprise. All right Reserved.
        </MDBContainer>
      </div>
      
    </MDBFooter>
  );
 
}

export default Footer

