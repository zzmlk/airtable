console.log('Hello,Airtable');

var Airtable = require('airtable');

var base = new Airtable({ apiKey: 'keygDQVvm6DG6i9yJ' }).base('appx84w4NobmIjOH6');


base("answerbook").select({}).eachPage(gotPageOfAnswers, gotAllAnswers);


const answers = [];


function gotPageOfAnswers(records, fetchNextPage) {
    console.log("gotPageOfAnswers()");

    answers.push(...records);

    fetchNextPage();
}


function gotAllAnswers(err) {
    console.log("gotAllAnswers()");


    if (err) {
        console.log("error loading answers");
        console.error(err);
        return;
    }


    showAnswers();
}



function showAnswers() {
    console.log("showAnswers()");
    const shelf = document.getElementById("shelf");


    answers.forEach((answer) => {

        const div = document.createElement("div");
        div.innerText = answer.fields.answer;
        div.classList.add("block");

        div.addEventListener("click", () => {
            showAnswer(answer, div);
        });

        shelf.appendChild(div);
    });
}

function showAnswer(answer, div) {
    console.log("showAnswers()", answer);


    const answerDetail = document.getElementById("answer-detail");


    answerDetail.getElementsByClassName("content")[0].innerText = answer.fields.content; //


    const shelf = document.getElementById("shelf");
    const blocks = shelf.getElementsByClassName("active");
    for (const block of blocks) {
        block.classList.remove("active");
    }

    div.classList.add("active");


    answerDetail.classList.remove("hidden");
}