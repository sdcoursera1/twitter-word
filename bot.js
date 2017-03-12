console.log('The bot is starting');
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);


setInterval(tweetIT,1000*60*60*24);
tweetIT();

function tweetIT(){

	var r= Math.floor(Math.random()*100);

	var tweet =
	{ status: 'here is a random number' + r + ' #codingisfun' }


	T.post('statuses/update', tweet, tweeted) ;


	function tweeted(err, data, response) {
		if(err) {
			console.log('Something is wrong')
		}
		else {
	  console.log('It worked!'); }
	}

}



/*
var tweet =
	{ status: '#codingisfun' }


	T.post('statuses/update', tweet, tweeted) ;


	function tweeted(err, data, response) {
		if(err) {
			console.log('Something is wrong')
		}
		else {
	  console.log('It worked!'); }
	}
	*/

/*
var params = {
				 q: 'modi since:2017-03-01',
				 count: 100
			 };


T.get('search/tweets', params, gotData);

function gotData (err, data, response) {
  var tweets = data.statuses;
  for (var i=0; i< tweets.length;i++) {
  	console.log(tweets[i].text);
  }
  // console.log(data)
};
*/
