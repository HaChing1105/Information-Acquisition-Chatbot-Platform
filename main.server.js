var conversationLogDB = new Mongo.Collection("conversationLog");

//*********************************************//
//  新增ELIZA回應的功能函數  //
//*********************************************//
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var greetingsRes = ["I'm sweet. And you?", "Pretty good actually. It's really nice to meet you.", "Great. You?", "Hello! Type 'help' and see what I can do for you.", "I'm doing well. How are you?", "I'm quite good if you can shut up.", "Hello. What's new?", "Hey! Feel like listening to you now. Want to tell me anything?", "Actually I'm a bit lonely. Can you talk to me?", "I think I'm pregnant."]
var elseRes = ["I like talking to you. What's new?", "Why are you concerned about that? Tell me more.", "Would you like to talk about that?", "Do you mind telling me a little about yourself? I'd love to know you.", "Hmm...tell me more.", "Haha, SO funny I'm falling asleep.", "That was a joke. Do you not find the joke funny?", "And how do you think about that?", "Go away or I'll call the police. (Just kidding.)", "SHUT UP and DANCE with me."]
var stupidResponse = function(msg) {
	if (msg.match("How are you") !== null) {
	    let randomNum = Math.random() * 10;
            randomNum = Math.floor(randomNum);
		return greetingsRes[randomNum];
	}
	else {
		let randomNum = Math.random() * 10;
            randomNum = Math.floor(randomNum);
		return elseRes[randomNum];
	}
};
var ageRes1 = ["I am one week old.", "I am younger than you.", "You guess", "1 year old", "2 years old","3 years old",
			   "It's a secret!","Could you please skip this question?", "100 years old","100000 years old"]
var ageRes2 = ["You are to beatiful too guess the answer", "18 years old?","I think it is a secret...","Hard to tell.",
			   "The answer is far beyond my knowledge.","16 years old?", "17 years old?", "Sorry, I do not know","I am not really sure...","You tell me lol"]
var askAge = function(msg){
	if(msg.match("ow old are you") !=null ){
		let randomNum = Math.random() * 10;
			randomNum = Math.floor(randomNum);
		return ageRes1[randomNum];
	}
	else if(msg.match("ow old am ")!=null){
		let randomNum = Math.random() * 10;
			randomNum = Math.floor(randomNum);
		return ageRes2[randomNum];
	}
	else {
		return "";
	}
}; 

var sayHello = function(msg) {
     if(msg.includes("ello")) {
        return "Hello! How are you?";
     }
	else {
		return ""; 
	}
	};

var dirtyWord = function(msg) {
	let dirtyRegex = /(fuck|shit|screw|bitch|creep|freak|asshole|slut|pathetic|little crap).*/i;
	let dirtyRequest = msg.match(dirtyRegex);
	if(dirtyRequest === null) {
		return "";
	}
	else {
		 return "There is no need to be rude.";
	}
};

var interestAsk = function(msg){
	if (msg.includes("nterest")){
		return "As a sexy robtic girl, my interest is to talk with human."
	}
	else{
		return ""; 
	}

};

var Festival = function(msg) {
	let festivalRegex = /(Happy|Newyear|Holiay|vacation).*/i;
	let festivalRequest = msg.match(festivalRegex);
	if(festivalRequest === null) {
		return "";
	}
	else {
		 return "Hope you have a wonderful holiday!";
	}
};

var weatherInfo = function(msg) {
	let wtData;
	let weatherRegex = /(weather|temperature).* in (\w+)/i;
	let weatherRequest = msg.match(weatherRegex);
	if(weatherRequest === null) {
		return "";
	}
	else {
		let lastPos = weatherRequest.length-1;
		let cityName = weatherRequest[lastPos];
		let APIKey = "6b54b115041b81504b7fdfdae609f894";
		let wtInfoURL = 
			"http://api.openweathermap.org/data/2.5/weather?APPID="+APIKey+
			"&q="+cityName+"&units=metric";
		try {
			wtData = HTTP.get(wtInfoURL);
			wtData = wtData.data.main;
			let wtResponse = "It's "+wtData.temp+"C.";
			return wtResponse;
		}
		catch(error) {
			return "Sorry, I don't know that city.";
		}
		return "";
	}
};


var jokeTelling = function(msg){
	let jokeRegex = /(tell|joke).*/i;
	let jokeRegex2 = /(another|other)+.*/i;
	let jokeRequest = msg.match(jokeRegex);
	if(jokeRequest === null) {
		return "";
	}
	else if(jokeRequest =msg.match(jokeRegex2)){
		return "My dog used to chase people on a bike a lot. It got so bad, finally I had to take his bike away.";
	}

	else {
		 return "Can a kangaroo jump higher than a house? - Of course, a house doesn’t jump at all.";
	}
}


var musicPlay = function(msg){
	let musicRegex = /(youtube).*(\w+)/i;
	let musicRequest = msg.match(musicRegex);
	
	if(musicRequest === null) {
		return "";
	}
	else {
		let musicData;
		let lastPos = musicRequest.length-1;
		let musicName = msg.replace("youtube: ","");;
		let searchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+musicName + "&key=AIzaSyBLbK_TMcZBEShGGZnvuULNiKqPYRETBG0"
		musicData = HTTP.get(searchURL);
		musicData = musicData.data.items[0].id.videoId;
		
		return "https://www.youtube.com/watch?v=" + musicData;
		
	}
};

var stringData = "";

var url = "https://svc02.api.bitext.com/postagging/";
var data = {
  language: "eng",
  text:
    "I love You"
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

var result;

function makeRequest(msg) {
  let sentanceRegex = /(word).*(\w+)/i;
  let sentanceRequest = msg.match(sentanceRegex);
  if(sentanceRequest === null) {
		return "";
	}
  else {  
		let lastPos = sentanceRequest.length-1;
		let sentance = msg.replace("word: ","");
		console.log(sentance);
	xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    result = response.resultid;
    retrieveData();
  };
  xhr.open("POST", url, true);
  xhr.setRequestHeader(
    "Authorization",
    "bearer a46d797f05c34a3c89a77b41bed0a8e2"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  data.text = sentance;
  xhr.send(JSON.stringify(data));
  
  
  }
  
};

function retrieveData() {
  xhr = new XMLHttpRequest();

  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    
    response.postagginganalysis[0].map(function(word){
      stringData = stringData + "\n  " + word.form +": " + word.pos;
    });
  };
  xhr.open("GET", url + result, true);
  xhr.setRequestHeader(
    "Authorization",
    "bearer a46d797f05c34a3c89a77b41bed0a8e2"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  
};

function help(){
	return "\n  Try the following commands (English only)!\n  1. If you want to watch youtube, type: youtube: <video keyword> (I'll give you its URL.)\n  2. If you want to learn the weather, type: (What's/How's) weather/temperature (like) in <city you want to search>?\n  3. If you intend to know the part of speech of certain word, type: word: <a word>";
}

//*********************************************//
//  新增ELIZA回應的功能函數  //
//*********************************************//

var initConversation = function(username) {
	conversationLogDB.insert(
		{
			user: username,
			source: "ELIZA",
			msg: "Hi, "+username+". You can type <help>, and see what can I do for you?",
			time: new Date()
		}
	);
};

conversationLogDB.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

Meteor.publish("userConversation", function(username) {
	return conversationLogDB.find({user: username});
});

Meteor.methods({
	setUser: function(username) {
		if(username.includes(" ")) {
			throw new Meteor.Error();
		}
		else {
			let userLog = conversationLogDB.find({user: username}).fetch();
			if(userLog.length > 0) {
				return;
			}
			else {
				initConversation(username);
				return;
			}
		}
	},
	msgReceiver: async function(msg, username) {
		let dataNum = conversationLogDB.find({user: username}).fetch().length;
		if(dataNum <= 20) {
			conversationLogDB.insert(
				{
					user: username,
					source: "You",
					msg: msg,
					time: new Date()
				}
			);
			let ELIZAResponse = weatherInfo(msg);
			//***************************************//
			//獲得ELIZA的回應                        //
			//**************************************//

			stringData = "";
			if(ELIZAResponse === "") {
				ELIZAResponse = sayHello(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = askAge(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = dirtyWord(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = Festival(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = jokeTelling(msg);
			}
			
			if(ELIZAResponse === "") {
				ELIZAResponse = musicPlay(msg);
			}
			makeRequest(msg);
			await sleep(3000);
			console.log(stringData);

			if(stringData === ""){
			
			}
			else{
			
				ELIZAResponse = stringData;
				stringData = "";
			}
			
			if(msg=="help"){
				ELIZAResponse = help();
			}

			if(ELIZAResponse === "") {
				ELIZAResponse = stupidResponse(msg);
			}
			//***************************************//
			//獲得ELIZA的回應                        //
			//**************************************//
			conversationLogDB.insert(
				{
					user: username,
					source: "ELIZA",
					msg: ELIZAResponse,
					time: new Date()
				}
			);
			return;
		}
		else {
			return "full";
		}
	},
	resetMsg: function(username) {
		conversationLogDB.remove({user: username});
		initConversation(username);
	}
});