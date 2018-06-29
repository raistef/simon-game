import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './App.css';


var baseUrl = "https://s3.amazonaws.com/freecodecamp/";
var audio = ["simonSound1.mp3", "simonSound2.mp3", "simonSound3.mp3", "simonSound4.mp3"];

//button components
class Red extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    // change code below this line

  }
  // change code below this line

  render() {
    return (
      <button id="red" className="col-md-4 col-sm-4 col-xs-2 btn"></button>
    );
  }
};

class Black extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    // change code below this line

  }
  // change code below this line

  render() {
    return (
      <button id="black" className="col-md-4 col-sm-4 col-xs-4 btn"></button>
    );
  }
};

class Blue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    // change code below this line

  }
  // change code below this line

  render() {
    return (
      <button ref="blue" id="blue" className="col-md-4 col-sm-4 btn"></button>
    );
  }
};

class Orange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    // change code below this line

  }
  // change code below this line

  render() {
    return (
      <button ref="orange" id="orange" className="col-md-4 col-sm-4 btn"></button>
    );
  }
};

class Main extends React.Component {
	constructor(props) {
    	super(props);
    	// initialize state 
    	this.state = {
  			mode: 'simple',
  			count: '00',
  			fin:false,
  			arrFired:[],
  			arrClicked:[],
  			message:"Keep it up!",
  			equal:true,
  			test:"low_opacity"
  			
		}
		this.newGame = this.newGame.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.prev = this.prev.bind(this);
		this.one = this.one.bind(this);

	}
	
	newGame() {
			document.body.style = 'background-color: red;';
		
		    this.setState({
			  fin: false
			});
		    var time1=0;
		    this.state.arrFired=[];
		    this.state.arrClicked=[];
		    this.state.message="Keep it up!";
		    this.one();   
	}

	prev(){
      this.state.count=this.state.arrFired.length;
      var time1=1000;
      this.state.arrFired.forEach(function(item){
     
      setTimeout(function(){
        new Audio(baseUrl+audio[item]).play();
        this.state.arr[item].fadeOut().fadeIn();
      
   
        },time1);

        time1+=1000;
        
        });
 
   }

 one() {
      var arr=[this.refs.red, this.refs.black, this.refs.blue, this.refs.orange];
      var r=0;
      this.setState({
		  clickedArr:[],
		  arrFired:[],
		  count:this.state.arrFired.length
 	  });
      r=Math.floor((Math.random() * 4) + 0);
      this.state.arrFired.push(r);
      new Audio(baseUrl+audio[r]).play();
      //arr[r].fadeOut().fadeIn();
      
    }
   
   handleClick() {
   	  //this.fadeOut().fadeIn();
      new Audio(baseUrl + audio[0]).play();
      this.state.clickedArr.push(0);
      if(this.state.clickedArr.length !== this.state.arrFired.length) {
      	this.setState({
		  equal: false
		});
      }
        
	  for(var i = this.state.arrFired.length; i--;) {
	        if(this.state.arrClicked[i] !== this.state.arrFired[i])
	            this.setState({
				  equal: false
				});
	  }
      if (this.state.clickedArr.length==20 && this.state.equal==true){
      	this.setState({
			message: "You won!",
			fin: true
		});
                
      }
      if (this.state.fin==false && this.state.equal==true) {
         this.setState({
			message: "Keep it up!"
		});
         var timeToWait=(this.state.arrFired.length+1)*1000;
         this.App.prototype.prev();
         setTimeout(function(){
            this.App.prototype.one();
         },timeToWait);
      
      }
      else if (this.state.clickedArr.length==this.state.arrFired.length && this.state.fin==false && this.state.equal==false) {
        if (this.state.mode!="simple"){ 
        	this.setState({
			  message: "Wrong! Your game will restart."
			});
                 
          setTimeout(function(){
            this.App.prototype.newGame();
            },2000);
        } 
        else {
        	this.setState({
			  message: "Wrong! Please listen and try again.",
			  arrClicked:[]
			});
			           
           setTimeout(function(){
           this.App.prototype.prev(); 
           },1000);
        }
 
      }
    };

    render() {
  	  var arrClicked=this.state.arrClicked;
  	  var arrFired=this.state.arrFired;
	  var fin=this.state.fin;
	  
	  
	  
    return (
        <div>
        	<div id="top">
			  <p>Strict
			    <label className="switch">
			  		<input id="strict" type="checkbox"></input>
			  		<span className="slider round"></span>
			    </label>
			    <span id="spanCount">Count</span>
			  	<button id="count">{this.state.count}</button>
			  </p>
			  <p id="mistake">{this.state.message}</p>
  			</div>
		   <Red />
		   <Black />
		   <br></br>
		   <button id="turn" className="col-md-4 col-sm-4" onClick={this.newGame}>New game</button>
		   <br></br>
		   <Blue />
		   <Orange />
  		</div>
    );
  }
}

export default Main;
