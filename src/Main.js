import React, { Component } from 'react';
import './App.css';

var baseUrl = "https://s3.amazonaws.com/freecodecamp/";
var audio = ["simonSound1.mp3", "simonSound2.mp3", "simonSound3.mp3", "simonSound4.mp3"];

class Main extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
  			strict: false,
  			count: 0,
  			arrFired:[],
  			arrClicked:[],
  			message:"You have to memorize which buttons are being clicked and reproduce the sequence. If you manage to reproduce 10 clicks - you win the game!",
  			equal:false,
  			showButtons:false
		}
		this.newGame = this.newGame.bind(this);
		this.prev = this.prev.bind(this);
		this.triggerButtons = this.triggerButtons.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.turnStrict=this.turnStrict.bind(this);
	}

	triggerButtons() {
	 	var arr=[this.refs.red, this.refs.black, this.refs.blue, this.refs.orange];
	    var r=0;
	  	r=Math.floor((Math.random() * 4) + 0);
	    this.state.arrFired.push(r);
	    new Audio(baseUrl+audio[r]).play();
	    arr[r].style = 'background-color: green;';
	    setTimeout(function(){
      	    if (r==0) {
      	    	arr[r].style = 'background-color: red;';
      	    }
      	    else if (r==1) {
      	    	arr[r].style = 'background-color: black;';
      	    }
      	    else if (r==2) {
      	    	arr[r].style = 'background-color: blue;';
      	    }
      	    else
      	    	arr[r].style = 'background-color: orange;';
            
        },500);
        this.setState({
			count:this.state.arrFired.length
		});
    }
	
	newGame() {
			this.setState({
      		count:0,
      		arrFired:[],
		    arrClicked:[],
		    message: "Good luck!",
		    showButtons: true
    		},() => {setTimeout(function(){
				      	    			this.triggerButtons(); 
				            			}.bind(this),800);

					})
		    }

	

	prev(){
	  var arr=[this.refs.red, this.refs.black, this.refs.blue, this.refs.orange];
	  this.setState({
			  count:this.state.arrFired.length,
			  arrClicked:[]
			});
		    
      
      var time1=1000;
      this.state.arrFired.forEach(function(item){
	      setTimeout(function(){
	        new Audio(baseUrl+audio[item]).play();
	        arr[item].style = 'background-color: green;';
	        setTimeout(function(){
	      	    if (item==0) {
	      	    	arr[item].style = 'background-color: red;';
	      	    }
	      	    else if (item==1) {
	      	    	arr[item].style = 'background-color: black;';
	      	    }
	      	    else if (item==2) {
	      	    	arr[item].style = 'background-color: blue;';
	      	    }
	      	    else
	      	    	arr[item].style = 'background-color: orange;';
	            
	         },200);
	      
	   
	        },time1);

        time1+=1200;
        
        });
 
   }

 
   
    handleClick(button) {
   		var arr=[this.refs.red, this.refs.black, this.refs.blue, this.refs.orange];
   	    arr[button].style= 'background-color: green;';
   	  	setTimeout(function(){
      	    if (button==0) {
      	    	arr[button].style = 'background-color: red;';
      	    }
      	    else if (button==1) {
      	    	arr[button].style = 'background-color: black;';
      	    }
      	    else if (button==2) {
      	    	arr[button].style = 'background-color: blue;';
      	    }
      	    else
      	    	arr[button].style = 'background-color: orange;';
            
         },500);
   	     	  
  		new Audio(baseUrl + audio[button]).play();
      	this.state.arrClicked.push(button);
      	for(var i=0; i<this.state.arrFired.length; i++) {
				if (this.state.arrClicked[i]==undefined) {
		     		break;
		     	}
				else if (this.state.arrClicked[i] != this.state.arrFired[i]) {
					if(this.state.strict==false) {
			        	this.setState({
			      		arrClicked:[],
					    message: "Wrong! Please listen and try again.",
					    equal: false
			    		},() => { setTimeout(function(){
				           this.prev(); 
				           }.bind(this),100); })
		        	}
		        	else {
			        	this.setState({
						  message: "Wrong! Your game will restart."
						});
	                 
				        setTimeout(function(){
								            this.newGame();
								            }.bind(this),2000);
					}
				}

				else if (this.state.arrClicked.length==10 && i==this.state.arrFired.length-1 && (this.state.arrClicked[i] == this.state.arrFired[i])) {
					this.setState({
						message: "Game over. You won!"
					}
						,() => {
								if (this.state.message=="Game over. You won!") {
									setTimeout(function(){
							           window.location.reload();
							         },2500);
								}
							

					}
					);
					
				}
				
				else if (i==this.state.arrFired.length-1 && this.state.arrFired.length!=10) {
					this.setState({
						message: "Keep it up!"
					});
					var timeToWait=(this.state.arrFired.length+1)*1000;
			         this.prev();
			         setTimeout(function(){
							           this.triggerButtons();
							         }.bind(this),timeToWait);
				}

				

        };
        
    }

    turnStrict() {

    	
    		this.setState({
			  strict:!this.state.strict
			});
    	
    }

    handleChange(event) {
	    this.setState({
	      count:event.target.value
	    });
    }

    render() {
  	  
	  
    return (
        
        	<div id="top">
			  <p>Strict <label className="switch">
			  		<input id="strict" type="checkbox" onClick={this.turnStrict}></input>
			  		<span className="slider round"></span>
			    </label>
			    <span id="spanCount">Count </span>
			  	<input id="count" value={this.state.count} onChange={this.handleChange}></input>
			  </p>
			  <p id="message" className="col-md-8 col-sm-8 col-xs-8">{this.state.message}</p>
  			  <div id="buttons">
  			  { this.state.showButtons ? 
  			   <div>
	  			<button ref="red" id="red" className="col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(0)}></button>
	  			<button ref="black" id="black" className="col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(1)}></button>
			    
		       </div>
  			  : 
  			  	<div>
	  			<button ref="red" id="red" className="invisible col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(0)}></button>
	  			<button ref="black" id="black" className="invisible col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(1)}></button>
			    
		       </div>

  			   }
		   	  <button id="newGame" className="col-md-4 col-sm-4" onClick={this.newGame}>New game</button>
		      {this.state.showButtons ? 
		       <div>
 			   	<button ref="blue" id="blue" className="col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(2)}></button>
			   	<button ref="orange" id="orange" className="col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(3)}></button>
		       </div>
		     : 
		     <div>
 			   	<button ref="blue" id="blue" className="invisible col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(2)}></button>
			   	<button ref="orange" id="orange" className="invisible col-md-4 col-sm-4 col-xs-4 btn" onClick={() =>this.handleClick(3)}></button>
		       </div>
		     }
		     </div>
  		</div>
    );
  }
}

export default Main;
