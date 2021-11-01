import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import swal from 'sweetalert';

class App extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
       email: "",
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
      text: "\nWe have sent you an email with token.\n\nGo check and verify your email.",
      icon: "success",
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    let data = new FormData(); // creates a new FormData object

    data.append("email", this.state.email);

    axios({
      method: "POST",
      url: "http://localhost:8000/api/users/password_reset/",
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
        <img src= "https://img.freepik.com/free-vector/thoughtful-serious-young-man-with-hand-him-feeling-doubt-isolated-thinks-finds-solution_140689-209.jpg?size=626&ext=jpg"
        style={{width:700, height:450}}></img>
    </div>
  <div id="other" className="payment" style={{textAlign:'center', marginRight:100, marginTop:30, marginBottom:30}} >
        <h3><i class="fas fa-cogs" ></i> Reset Password </h3>
        <hr></hr>
        <br />
        <br />
    <form onSubmit={this.handleFormSubmit} >
        <label for="cheese"> <i class="far fa-envelope" style={{marginRight:10}}></i></label>
          <input class="submissionfield" type="email" name="email" onChange={this.handleChange} placeholder="Email" required /><br /><br /><br />
          <input type="submit" onClick={this.formSubmit} className="poka" />
        </form>

	</div>
    
  </div>




      
    );
  }
}

export default App;