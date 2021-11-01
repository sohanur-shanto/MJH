import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import swal from 'sweetalert';

class App extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      token: "",
    };
  }


  handleChange = async (event) => {
    await this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.title);
  };

  

  formSubmit = () => {
    swal({
      title: "Success!",
      text: "\nYour password has been successfully changed.\n\nTry to sign in with your new password",
      icon: "success",
    });
  }

  

  handleFormSubmit = (event) => {
    event.preventDefault();

    let data = new FormData(); // creates a new FormData object

    data.append("password", this.state.password);
    data.append("token", this.state.token);

    axios({
      method: "POST",
      url: "http://localhost:8000/api/users/password_reset/confirm/",
      headers: {
        "Content-Type": "application/json"
      },
      data
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

 

  
  render() {
    return (

       <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           <div>
        <img src= "https://magiccopy.xyz/assets/images/hadder.gif"
        style={{ marginRight:100, width:500, height:300}}></img>
    </div>
  <div id="other" className="payment" style={{textAlign:'center', marginTop:30, marginBottom:30}} >
        <h3><i class="fas fa-check-circle"></i> Confirm New Passowrd</h3>
        <hr></hr>
        <br />
        <br />
    <form onSubmit={this.handleFormSubmit} >
        <label for="cheese"><i class="fas fa-lock" style={{marginRight:10}}></i> </label>
          <input class="submissionfield" type="password" name="password" onChange={this.handleChange} placeholder="New Password"  required /><br /><br /><br />
          <label for="cheese"><i class="fas fa-sort-numeric-up" style={{marginRight:10}}></i></label>
          <input class="submissionfield" type="text" name="token" onChange={this.handleChange} placeholder="Token Number" required /><br /><br /><br />
          <input type="submit" onClick={this.formSubmit} className="poka" />
        </form>

	</div>
    
    
  </div>
      
    );
  }
}

export default App;