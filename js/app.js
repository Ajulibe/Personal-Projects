//variables
//note this newtweet is a global variable to be accessed by all functions
const tweetList = document.querySelector('#tweet-list');






//Event listeners

eventListeners();

function eventListeners() {
    //form submition
    document.querySelector('#form').addEventListener('submit', newTweet);
    //listening out for loading event for the LS action
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}


//Functions
function newTweet(event) {
    event.preventDefault();
    //targetting the value of input into the searchbox
    const tweet = document.querySelector('#tweet').value;
    if (tweet === '') {
        alert('No Tweet has been added');
    } else {


        // //creating a close symbol
        let removeBtn = document.createElement('a');
        // note its advisable to use classlist instead of className for flexibility purpose
        removeBtn.classList = 'remove-tweet'
        removeBtn.textContent = 'X';

        //creating a list element
        const li = document.createElement('li');
        li.textContent = tweet;


        //appending the remove button to each tweet
        li.appendChild(removeBtn);

        //appending the tweets to the parent element
        tweetList.appendChild(li);


        // adding tweet to the local storage
        addTweetLocalStorage(tweet);
        alert('You have added a tweet')
    }



    this.reset(); //resets the current working area values
}




//removing an added element
const nope = document.querySelector('.remove-tweet');
tweetList.addEventListener('click', closeBtn);




//close button function
function closeBtn(event) {

    if (event.target.classList.contains('remove-tweet')) {
        event.target.parentElement.remove()
    } else
        console.log('error!!')
    removeLocalStorage(event);
    alert('you have deleted a message')
}


// //add to local storage function 
function addTweetLocalStorage(tweet) {

    let Messages = getTweetFromStorage();
    // adding the messages to the local storage
    Messages.push(tweet)
        //convert the array to a string
    localStorage.setItem('Messages', JSON.stringify(Messages));
}



function getTweetFromStorage() {

    //get the values if none is returning
    const tweetsLS = localStorage.getItem('Messages');
    let Messages;
    if (tweetsLS === null) {
        Messages = [];
    } else {
        Messages = JSON.parse(tweetsLS);
    }
    return Messages; //note the message returned here is 
    // tweet available already in the local storage

}

//function to print the content 
// of the local storage and save into the main page on load
function localStorageOnLoad() {
    let Messages = getTweetFromStorage();
    console.log(Messages);
    //for each loop for the array

    Messages.forEach(myFunction)
}

function myFunction(tweet) {
    let removeBtn = document.createElement('a');
    // note its advisable to use classlist instead of className for flexibility purpose
    removeBtn.classList = 'remove-tweet'
    removeBtn.textContent = 'X';
    //creating a list element
    const li = document.createElement('li');
    li.textContent = tweet;


    //appending the remove button to each tweet
    li.appendChild(removeBtn);

    //appending the tweets to the parent element
    tweetList.appendChild(li);

    //MY PERSONAL METHOD...I USED item AS THE RETURN VALUE FOR myFunction
    //the use of .innerHTML is manipulating the dom can cause room for errors later
    //textContent is preferred
    // demoP = document.getElementById('tweet-list');
    // demoP.innerHTML = demoP.innerHTML + '<li>' + item + "<a class=\'remove-tweet \'>" + 'X' + '</a>' + '</li>';
}

//removing items from the local storage on reload
function removeLocalStorage(event) {
    let Messages = getTweetFromStorage();
    let Content = event.target.parentNode.innerText; //get the content of the clicked element
    //obtained the postiion of a clicked element wrt its postion in the 
    //DOM array
    let OriginalContent = Content.replace('X', ''); //it shows X at the end.so i replaced X with a space
    //you can also use substring
    console.log(OriginalContent);
    let arrayPosition = Messages.indexOf(OriginalContent); //got the position of the element in the array
    console.log(arrayPosition);
    console.log(Messages[arrayPosition]);
    Messages.splice(arrayPosition, 1); //used the obtained index to apply the splice method on the Message array
    console.log(Messages); //printed out a new array
    localStorage.setItem('Messages', JSON.stringify(Messages)); //set the value of the new array as the new LS
    //another method
    //read the curent valu of the local storage
    //localStorage.getItem('Mesasges')// which is tweetLS//this will return all the vlaues of the local storage
    //create a for each loop after remove the constant apperaring X
    //if (OriginalContent === tweetLS )//the for each method will tooggle through LS to see if OriginalContent
    //is part of the LS..when it is we will remove it from the array
    //Messages.Splice(index).it will automatically kow the index because there was a strict comparator
    //that showed they are the same thing,plus the finction paramenter showed the variables under consideration
    //Messages.forEach(function(tweetLS,index)){

}