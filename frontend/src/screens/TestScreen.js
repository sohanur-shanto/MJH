import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import swal from 'sweetalert';

class App extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      order_number: "",
      account_number: ""
    };
  }

  handleInputChange = async (event) => {
    await this.setState({
      [event.target.name]: event.target.files[0]
    });
  };

  handleChange = async (event) => {
    await this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.title);
  };

  

  formSubmit = () => {
    swal({
      title: "Success!",
      text: "\nYour Payment Slip & Order Number Submitted.\n\nAfter few minutes you will be able to see your updated invoice from your dashboard.",
      icon: "success",
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    let data = new FormData(); // creates a new FormData object

    data.append("image", this.state.image); // add your file to form data
    data.append("order_number", this.state.order_number);
    data.append("account_number", this.state.account_number);

    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/orders/note",
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
  <div id="other" style={{textAlign:'center', marginTop:30}} >
       
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6 pb-5">


                      

                    <form onSubmit={this.handleFormSubmit} >
                        <div class="card rounded-0">
                            <div class="card-header p-0">
                                <div class="bg-transparent text-white text-center py-2">
                                <h3> Upload Payment Slip </h3>
                                    
                                </div>
                            </div>
                            <div class="card-body p-3">

                            <br />
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fas fa-sort-numeric-up"></i></div>
                                        </div>
                                        <input type="text" class="form-control" id="nombre"  name="order_number" onChange={this.handleChange} placeholder="Order Number" required />
                                    </div>
                                </div>
                                <br />
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-university"></i></div>
                                        </div>
                                        <input type="text" class="form-control" id="nombre" name="account_number" onChange={this.handleChange} placeholder="Bank Account Number" required />
                                    </div>
                                </div>
                                <br />

                                <div class="form-group" >
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend" >
                                            <div class="input-group-text" ><i class="fa fa-upload" style={{marginRight:30}} ></i><strong > Payment Slip</strong></div>
                                        </div>
                                        <input type="file" name="image" onChange={this.handleInputChange} required  /><br /><br />
                                    </div>
                                </div>
                                <br />

                                <div class="text-center">
                                <input type="submit" onClick={this.formSubmit} className="poka" />
                                </div>
                            </div>
                            <br />

                        </div>
                    </form>
             


                </div>
	</div>
</div>

	</div>
  

      
    );
  }
}

export default App;










 {/* <h3><i class="far fa-money-bill-alt"></i> Payment verification </h3>
        <hr></hr>
        <br />
        <br />
    <form onSubmit={this.handleFormSubmit} >
        <label for="cheese" ><h7><b><i class="fas fa-sort-numeric-up"></i> Order Number</b></h7></label><br />
          <input class="submissionfield" type="text" name="order_number" onChange={this.handleChange} required /><br /><br /><br />
          <label for="cheese"><h7><b><i class="fas fa-university"></i> Bank Account Number </b></h7></label><br />
          <input class="submissionfield" type="text" name="account_number" onChange={this.handleChange} required /><br /><br /><br />
          <label for="cheese"><h7 ><b ><i class="fas fa-upload"></i> Upload Payment Slip</b></h7></label>
         
          <input type="submit" onClick={this.formSubmit} className="poka" />
        </form> */}