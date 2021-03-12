console.log('Hello,Airtable');

var Airtable = require('airtable');

var base = new Airtable({ apiKey: 'keygDQVvm6DG6i9yJ' }).base('appx84w4NobmIjOH6');

//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("answerbook").select({}).eachPage(gotPageOfAnswers, gotAllAnswers);

// an empty array to hold our book data
const answers = [];

// callback function that receives our data
function gotPageOfAnswers(records, fetchNextPage) {
    console.log("gotPageOfAnswers()");
    // add the records from this page to our books array
    answers.push(...records);
    // request more pages
    fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllAnswers(err) {
    console.log("gotAllAnswers()");

    // report an error, you'd want to do something better than this in production
    if (err) {
        console.log("error loading answers");
        console.error(err);
        return;
    }

    // call function to show the books
    showAnswers();
}



function showAnswers() {
    console.log("showAnswers()");
    const shelf = document.getElementById("shelf");

    // loop through the books loaded from the Airtable API
    answers.forEach((answer) => {
        // create the div, set its text and class
        const div = document.createElement("div");
        div.innerText = answer.fields.answer;
        div.classList.add("book-spine");
        // when the user clicks this book spine, call showBook and send the book data and this spine element
        div.addEventListener("click", () => {
            showAnswer(answer, div);
        });
        // put the newly created book spine on the shelf
        shelf.appendChild(div);
    });
}

function showAnswer(answer, div) {
    console.log("showAnswer()", answer);

    // find the book detail element
    const answerDetail = document.getElementById("answer-detail");

    // populate the template with the data in the provided book
    answerDetail.getElementsByClassName("content")[0].innerText = answer.fields.content; //

    // remove the .active class from any book spines that have it...
    const shelf = document.getElementById("shelf");
    const bookSpines = shelf.getElementsByClassName("active");
    for (const bookSpine of bookSpines) {
        bookSpine.classList.remove("active");
    }
    // ...and set it on the one just clicked
    div.classList.add("active");

    // reveal the detail element, we only really need this the first time
    // but its not hurting to do it more than once
    answerDetail.classList.remove("hidden");
}