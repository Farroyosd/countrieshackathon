import React from 'react';
import agentImg from './travelagent.png';
import Map from './google.js';
const axios = require('axios');




export default class RightSide extends React.Component {
    constructor(props) {
        super(props);

        this.handle2Count = this.handle2Count.bind(this);
        this.handle1Count = this.handle1Count.bind(this);
        this.handle3Count = this.handle3Count.bind(this);
        this.handle4Count = this.handle4Count.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handle2Click = this.handle2Click.bind(this);
        this.handleAxiosBorderCountries = this.handleAxiosBorderCountries.bind(this);
        

    }
    
    handle1Count() {
        var newCount = 1;
        
        this.props.handleCountUpdate(newCount);
    }

    handle2Count() {
        
                var newCount = 2;
        
                this.props.handleCountUpdate(newCount);
            }

    handle3Count() {
        var newCount = 3;
        
        this.props.handleCountUpdate(newCount);
    }

    handle4Count() {
        var newCount = 4;
        
        this.props.handleCountUpdate(newCount);
    }
    handleFinish() {
        var newCount = 0;
        
        this.props.handleCountUpdate(newCount);
    }
    handle2Click (){
        this.handleAxiosBorderCountries();
        this.handle2Count();
    }
    handleAxiosBorderCountries(){
        var borders = this.props.data.countryData[0].borders;
        var bordersArray = [];
        for (let i = 0; i < borders.length; i++) {
            axios
            .get('https://restcountries.eu/rest/v2/alpha/'+ borders[i])
            .then((response) => {
              bordersArray.push(response.data.name);
            })
        }
        console.log(bordersArray);
        this.props.handleBordersUpdate(bordersArray);
    }

    

    render() {

        var cData = this.props.data.countryData[0];

        // { cData.name }
        // { cData.capital }
        // { cData.subregion }
        // { cData.population }
        // { cData.latlng[0] }//lat
        // { cData.latlng[1] }//lng
        // { cData.borders }//figure out way to get full country names
        // { cData.currencies[0].name }
        // { cData.languages[0].name }
        // { cData.translations.de }//german
        // { cData.translations.fr }//french
        // { cData.translations.ja }//japanese
        // { cData.flag }





        if (this.props.data.count === 1) {
           
            return (
                <div className="pages">
                    <div className="travelAgent">
                        <img className="travelAgent" alt="Funny Travel Agent" src={agentImg} />
                    </div>
                    <div className="px-5">
                        <p>Hi! My name is Mike. I’ll be your Travel Wise Agent today.</p>
                        <p>Let's see here. Looks like you're interested in heading to {cData.subregion}. More specifically {cData.name}.</p>
                        <p>I haven’t had a chance to go there myself but I hear it is wonderful!</p>
                        <p>Ok, so let's get you set up with some information about {cData.name} that may... be beneficial for your trip.</p>

                    </div>
                    <div className="twoBtn">
                        <button type="button" className="btn btn-success hideBtn">back</button>
                        <button type="button" className="btn btn-success" onClick={this.handle2Click} >Next</button>
                    </div>
                </div>
            )
        }
        else if (this.props.data.count === 2) {
            
            return (

                <div className="pages">
                    <div className="travelAgent">
                        <img className="travelAgent" alt="Funny Travel Agent" src={agentImg} />
                    </div>
                    <div className="px-5">
                        <p>{cData.name} has a population of {cData.population.toLocaleString()}. Odds are you will make some new friends here.</p>
                        <p>You should check out their capital city {cData.capital}, even travel to some of the neighboring countries.</p>
                        <p>Where ever you explore, if you get lost, just look for the Flag below to ensure you find your way back to {cData.name}.</p>
                        <img className="flag pb-3" alt="Funny Travel Agent" src={cData.flag} />


                    </div>
                    <div className="twoBtn">
                        <button type="button" className="btn btn-success" onClick={this.handle1Count}>Back</button>
                        <button type="button" className="btn btn-success" onClick={this.handle3Count} >Next</button>
                    </div>
                </div>

            )
        }
        else if (this.props.data.count === 3) {
            
            return (
                
                    <div className="pages">
                    <div className="travelAgent">
                        <img className="travelAgent" alt="Funny Travel Agent" src={agentImg} />
                    </div>
                    <div className="px-5">
                        <p>Did you know that the Germans call {cData.name}, {cData.translations.de}. 
                            The French call it {cData.translations.fr}. 
                            The Japanese call it {cData.translations.ja}. You don't read Japanese? 
                            Anyways….
                        </p>
                        <p>Ok, a few other things. You may want to exchange some of your cash to {cData.currencies[0].name}, 
                            which is the country’s currency. You tend to get more bang for your buck this way.</p>
                        <p>If you do not speak {cData.languages[0].name} you may want to learn a few words since this is the Countries primary language.</p>
                        


                    </div>
                    <div className="twoBtn">
                        <button type="button" className="btn btn-success" onClick={this.handle2Count}>Back</button>
                        <button type="button" className="btn btn-success" onClick={this.handle4Count} >Next</button>
                    </div>
                </div>
                
            )
        }
        else if (this.props.data.count === 4) {
            
            return (
                <div className="pages">
                <div className="travelAgent">
                    <img className="travelAgent" alt="Funny Travel Agent" src={agentImg} />
                </div>
                <div className="px-5">
                    <p>Look, Here is how {cData.name}, and some of it's neighbors {this.props.data.bordersArray.toString()} look like from space! Well at least in google maps.</p>
                    <p>Anyways... Looks like you are all set! Enjoy your Trip!</p>
                </div>
                    <div className="border rounded"style={{height: "400px", width: "728px" }}>
                    <Map
                        data1={cData}
                    />
                    </div>
                
                <div className="twoBtn pt-3">
                    <button type="button" className="btn btn-success" onClick={this.handle3Count}>Back</button>
                    <button type="button" className="btn btn-success" onClick={this.handleFinish} >Finish</button>
                    </div> 
                </div>
                
            )
        }
        return (
            <div>
                <img alt="World Map" id="countryImg" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Vorld_Flag_map_Version_2.3.png" />
            </div>
        )
    }
}