import React, { Component } from 'react';
import myCountryData from './data.json';
import RightSide from './RightSide.js';
import './App.css';

const axios = require('axios');



class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      opts: [],
      alpha2Code: "",
      count: 0,
      countryData: [],
      bordersArray: []
      

    })

    this.handleChange = this.handleChange.bind(this);
    this.handleCountUpdate = this.handleCountUpdate.bind(this);
    this.handleCountriesAxiosRequest = this.handleCountriesAxiosRequest.bind(this);
    this.handleBordersUpdate = this.handleBordersUpdate.bind(this);

  }

  handleChange(event) {
    this.setState({

      [event.target.name]: event.target.value,

    })

  }

  handleCountriesAxiosRequest() {
    var alpha2Code = this.state.alpha2Code;
    
    var data = [];
    
    axios
      .get('https://restcountries.eu/rest/v2/alpha/'+ alpha2Code)
      .then((response) => {
        data.push(response.data);
        

        this.setState({
          countryData :  data,
          count : 1
         })
      })
      .catch(function (error) {
          console.log(error);
      });
     
      
  }

  handleCountUpdate(newCount){
    this.setState({
      count: newCount,
    })
  }
  handleBordersUpdate(bordersArray){
    this.setState({
      bordersArray: bordersArray,
    })
  }


  

  componentDidMount() {


    var dropdownArray = [];
    for (let i = 0; i < myCountryData.length; i++) {
      dropdownArray.push(<option key={myCountryData[i].code} value={myCountryData[i].code}> {myCountryData[i].name} </option>);
    }
    this.setState({
      opts: dropdownArray
    });
  };




  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron">
            <div className="container text-center">
              <h1 className="display-3">Travel Wise</h1>
              <p className="lead">Quick facts to make you a Wise Traveller.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4">

              <div className="card">
                <div className="card-header">
                  Country Select
              </div>
                <div className="card-body">

                  <form>




                    <div className="form-group">
                      <label className="font-weight-bold" htmlFor="alpha2Code">Select a Country you wish to visit</label>
                      <select className="form-control" name="alpha2Code" id="alpha2Code" onChange={this.handleChange}>
                        <option value="" disabled selected >Select a Country</option>
                        {this.state.opts}
                      </select>
                    </div>
                    <label className="font-weight-bold" htmlFor="selectPriority">Click below to begin your journey on becoming a Wise Traveller</label>
                  </form>

                </div>
                <div className="card-footer">
                  <button name="submit" type="submit" className="btn btn-success btn-block" onClick={this.handleCountriesAxiosRequest}>Ready? Set? Go!</button>
                </div>
              </div>

            </div>
            <div className="col-sm-8 col-md-8  col-lg-8 ">

              <div className="card">
                <div className="card-header">
                  Let's Explore
                </div>
                <RightSide
                  data={this.state}
                  handleCountUpdate={this.handleCountUpdate}
                  handleBordersUpdate={this.handleBordersUpdate}


                />

              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div id="footer" className="mt-4 border rounded bg-light text-muted">
            <p className="text-right pt-3 pr-2 ">&copy;2017 Francisco Arroyo </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
