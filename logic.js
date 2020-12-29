document.getElementById("startButton").addEventListener("click",startTheGame);
var word; // This is global variable for the words we generate from the random generator!
var idx; // This is a global variable that holds the position of the alphabet we are at in the word "word"!
var numOfWords; // Global variable that cumulatively counts the number of words typed!
var time; // Stores the value of instantaneous time!
function startTheGame()
{
	var contentSlides = document.getElementsByClassName("slide");
	// Game started so we are hiding the start slide!
	contentSlides[0].classList.add("hideDisplay");
	//
	// Now the "321 Go!" down timer is to be shown!
	contentSlides[1].classList.remove("hideDisplay");
	startCountdown(contentSlides);
	//
}
function startCountdown(contentSlides) // This function gives the 321Go! functionality to the web page!
{
	var localTime = 2;
	var intervalId = setInterval(function ()
	{
		document.getElementById("onClickCount").innerText = localTime;
		if(localTime==="leave")
		{
			clearInterval(intervalId);
			showWords(contentSlides);
		}
		if(localTime!="Go!")
			localTime -= 1;
		else
			localTime = "leave";
		if(localTime===0)
			localTime = "Go!";
	},1000);
}
function showWords(contentSlides)
{
	// The words start to come so we hide the 321Go slide!
	contentSlides[1].classList.add("hideDisplay");
	contentSlides[2].classList.remove("hideDisplay");
	document.getElementsByClassName("keyboard")[0].classList.remove("hideDisplay");
	//
	// Code to down count the time!
	var intervalId1 = setInterval(function()
	{
		// Note in the string s = 300 -> s[0] = 3!
		var tString = document.getElementById("time").innerText;
		time = 0;
		for(var i=0;i<tString.length;i++)
			time = (time*10) + (tString.charCodeAt(i)-"0".charCodeAt(0));
		time -= 1;
		if(time===0)
		{
			clearInterval(intervalId1);
			showResults(contentSlides);
		}
		document.getElementById("time").innerText = time;
	},1000);
	//

	// Code for the words generation!
		word = getAWord();
		boldedWord = word;
		idx = 0;
		numOfWords = 0;
		document.getElementById("word").innerHTML = word.slice(0,idx)+" <b>"+word.slice(idx,idx+1)+"</b> "+word.slice(idx+1,word.length);
		document.addEventListener("keydown",keyGotPressed);
	//
}
function showResults(contentSlides)
{
	contentSlides[2].classList.add("hideDisplay");
	document.getElementsByClassName("keyboard")[0].classList.add("hideDisplay");
	contentSlides[3].classList.remove("hideDisplay");
	document.getElementById("wpm").innerHTML = 0;
	document.removeEventListener("keydown",keyGotPressed);

	document.getElementById("refreshButton").addEventListener("click",function(){location.reload();});
	var finalSpeed = numOfWords; // Since the time is 60s!
	document.getElementById("resultWPM").innerHTML = "<b>"+finalSpeed+"</b>";
}
//////////////////////////////// Code for generating random words ////////////////////////////////////////////////////////////////////////////
function getAWord() // This function generates a random word!
{
	// var req = new XMLHttpRequest();
	// req.open("GET","/",false);
	// req.send();
	// var retText = req.responseText;
	// delete req;
	// return retText;
	var set = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var randWord = [];
	var l = 5; // l stands for lower limit!
	var u = 3; // u stands for upper limit!
	// The words generated will have a length in the range [l,l+u-1]
	var len = l+(Math.floor((Math.random()*10))%u); // Words of length 5 to 7 are generated!
	for(var i=0;i<len;i++)
	{
		var k = Math.floor(Math.random()*100)%(set.length);
		randWord.push(set[k]);
	}
	var returnWord = "";
	for(var i=0;i<randWord.length;i++)
		returnWord += randWord[i];
	return returnWord;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function keyGotPressed(event)
{
	var keyEntered = document.getElementById(event.key);
	if(event.key === word[idx])
	{
		keyEntered.classList.add("correct");
		setTimeout(function (){keyEntered.classList.remove("correct")},150);
		idx += 1;
	}
	else
	{
		if(((event.key).charCodeAt(0)>="a".charCodeAt(0)) && ((event.key).charCodeAt(0)<="z".charCodeAt(0)))
		{
			keyEntered.classList.add("incorrect");
			setTimeout(function (){keyEntered.classList.remove("incorrect")},150);
		}
	}
	// Checking and incrementing the bold character
	if(idx >= word.length)
	{
		word = getAWord();
		idx = 0;
		numOfWords += 1;
		console.log(numOfWords); // Console.logging the number of words pressed till now!
		// Change the instantaneous WPM value!
		document.getElementById("wpm").innerHTML = Math.floor((numOfWords*60)/(60-time)); // 60 is there in the numerator because 1 minute = 60s.
		//60 is there in the denominator because, the timer runs for 60 seconds (i.e. denominator corresponds to the time elapsed in seconds!)
		//
	}
	document.getElementById("word").innerHTML = word.slice(0,idx)+" <b>"+word.slice(idx,idx+1)+"</b> "+word.slice(idx+1,word.length);
}

/* This is some of the syntax used when we are woking with the keyboard event!
var keyboard = document.getElementsByClassName("key");
document.addEventListener("keydown",pressKey);
function pressKey(event)
{
	var keyPressed = document.getElementById(event.key);

	// Code for making any press appear green in colour!
	keyPressed.classList.add("correct");
	setTimeout(function (){keyPressed.classList.remove("correct")},150);
	//
}
*/
