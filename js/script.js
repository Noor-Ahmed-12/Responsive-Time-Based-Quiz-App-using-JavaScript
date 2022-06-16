//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".card-info");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".card-quiz");
const option_list = document.querySelector(".quiz-opt-list");
const time_line = document.querySelector(".card-quiz .time_line");
const timeText = document.querySelector(".timer .time_left");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestion(0);
  que_counter(1);
  startTime(10);
  startTimeLine(0);
};

let que_count = 0;
let que_num = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let user_score = 0;
let counterLine;

let next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".card-result");
const restart_quiz = result_box.querySelector(".quiz-replay");
const end_quiz = result_box.querySelector(".quiz-end");

// resultbox quit btn
end_quiz.onclick = () => {
  window.location.reload();
};

// resultbox  restart btn
restart_quiz.onclick = () => {
  result_box.classList.remove("activeResult");
  quiz_box.classList.add("activeQuiz");
  let que_count = 0;
  let que_num = 1;
  let timeValue = 15;
  let widthValue = 0;

  showQuestion(que_count);
  que_counter(que_num);
  clearInterval(counter);
  startTime(timeValue);
  clearInterval(counterLine);
  startTimeLine(widthValue);
  next_btn.style.display = "none";
//   timeText.textContent = "Time left";
};

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_num++;
    showQuestion(que_count);
    que_counter(que_num);
    clearInterval(counter);
    startTime(timeValue);
    clearInterval(counterLine);
    startTimeLine(timeValue);
    next_btn.style.display = "none";
    // timeText.textContent = "Time left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    next_btn.style.display = "none";
    showResultBox();
  }
};

function showQuestion(index) {
  let que_text = document.querySelector(".que_text");

  que_text.innerHTML = `<span style="font-size:20px;font-weight:bold;margin-left: 20%;">${questions[index].numb}.  ${questions[index].question}</span>`;
  option_list.innerHTML = `
        <li class="list-group-item"> 
            <div class="row align m-0">
                <div class="col-sm-10 qst-option">${questions[index].options[0]}</div>
            </div>
        </li>

        <li class="list-group-item"> 
        <div class="row align m-0">
            <div class="col-sm-10 qst-option">${questions[index].options[1]}</div>
        </div>
        </li>

        <li class="list-group-item"> 
            <div class="row align m-0">
                <div class="col-sm-10 qst-option">${questions[index].options[2]}</div>
            </div>
        </li>

        <li class="list-group-item"> 
            <div class="row align m-0">
                <div class="col-sm-10 qst-option">${questions[index].options[3]}</div>
            </div>
        </li>
        `;
  // options selection check
  const option = option_list.querySelectorAll(".qst-option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// icons
let tickicon ='<div class="col-sm-2"><div class="icon tick"><i class="fas fa-check"></i></div></div>';
let crossicon ='<div class="col-sm-2"><div class="icon cross"><i class="fas fa-times"></i></div></div>';

function optionSelected(u_ans) {
  clearInterval(counter);
  clearInterval(counterLine);
  let user_answer = u_ans.innerText;
  console.log(u_ans);
  let correct_answer = questions[que_count].answer;
  console.log(correct_answer);
  if (user_answer == correct_answer) {
    user_score++;
    u_ans.classList.add("opt-correct");
    u_ans.insertAdjacentHTML("afterend", tickicon);
  } else {
    u_ans.classList.add("opt-incorrect");
    u_ans.insertAdjacentHTML("afterend", crossicon);
  }

  // if ans is incorrect,automatically select the correct ans
  for (let k = 0; k < option_list.children.length; k++) {
    if (option_list.children[k].innerText == correct_answer) {
      option_list.children[k].setAttribute("class", "qst-option opt-correct");
    }
  }

  // once options is selected,disabled all
  for (let j = 0; j < option_list.children.length; j++) {
    option_list.children[j].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function que_counter(index) {
  const bottom_que_container = document.querySelector(".total_que");
  bottom_que_container.innerHTML = `<span>${index} of ${questions.length} questions.</span>`;
}

function showResultBox() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score-text");
  if (user_score > 3) {
    scoreText.innerHTML = `and congratulations, you got &nbsp; ${user_score}&nbsp; out of &nbsp;${questions.length}</div>`;
  } else if (user_score > 1) {
    scoreText.innerHTML = `and not bad, you got &nbsp;<p> ${user_score} </p>&nbsp; out of &nbsp;<p>${questions.length}</p></div>`;
  } else {
    scoreText.innerHTML = `and sorry, you got &nbsp;<p> ${user_score} </p>&nbsp; out of &nbsp;<p>${questions.length}</p><br>You must try again!</div>`;
  }
}

function startTime(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    //   timeText.textContent = "Time off";
      let correct_answer = questions[que_count].answer;
      // / if ans is incorrect,automatically select the correct ans
      for (let k = 0; k < option_list.children.length; k++) {
        if (option_list.children[k].innerText == correct_answer) {
          option_list.children[k].setAttribute("class","qst-option opt-correct");
        }
      }
      // once options is selected,disabled all
      for (let j = 0; j < option_list.children.length; j++) {
        option_list.children[j].classList.add("disabled");
      }
      next_btn.style.display = "block";
    }
  }
}
function startTimeLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    time_line.style.width = time + "px";

    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}
