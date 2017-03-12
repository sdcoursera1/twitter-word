var request = require('request');
var Twit = require('twit');
var T = new Twit(require('./config.js'));
var createIsCool = require('iscool');
var wordnikKey = require('./permissions.js').key;

var getNounUrl = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=noun-plural,noun-posessive,proper-noun,proper-noun-plural,proper-noun-posessive&minCorpusCount=100&minDictionaryCount=13&minLength=3&maxLength=8&api_key=' + wordnikKey;

var isCool = createIsCool();


Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

setInterval(tweetIT,1000*60*60*24);
tweetIT();
// fruits = ['berries',];

function tweetIT() 
{
    function tweetWord(word) {
    T.post('statuses/update', { status: word }, function(err, reply) {
        if (err) {
            console.log('error:', err);
        } else {
            console.log('tweet:', reply);
        }
    });

}
function tweetSnozz() {
    var noun = '',
        tweet = 'The ',
        fruitstring;
    //let's get some adjectives!
    request(getNounUrl, function(error, response, data) {
        // let's make sure we're dealing with JSON
        var nounData = JSON.parse(data);
        console.log(nounData);
        if (!error) 
        {
            noun = nounData.word;
            // if we got back some data from the API and it didn't error
            if (isCool(noun) && !(noun[0] === noun[0].toUpperCase()))
            {
                console.log(noun);
                fruitstring = noun + 'berries';
                tweet += fruitstring + ' taste like ' + fruitstring +'!';
                console.log(tweet);
                tweetWord(tweet);
                return;
            } 
            else {
                tweetSnozz();
                }
        }
        
    });
}
tweetSnozz();
}

