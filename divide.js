var isSession = false;
var timeleft = 30;
var timeoutId;
var level = hardness()


function formLoad() {
  clearTimeout(timeoutId);
  let lblwrong = document.getElementById('lblwrong');
  let lbl = document.getElementById('lblMsg');
  let lblFirst = document.getElementById('lblFirst');
  let lblSecond = document.getElementById('lblSecond');
  level = hardness();
  let x = Math.round((Math.random() * level));
  let y = Math.round((Math.random() * level));
  let random = Math.round(Math.random() * 10);
  if (random > 6) {
    x = x * -1
    y = y * -1
  } else if (random < 3) {
    x = x * -1
  }
  y = x * y;
  lblFirst.innerHTML = y.toString();
  lblSecond.innerHTML = x.toString();
  lblwrong.innerHTML = ' ';
  let txtAnswer = document.getElementById('txtAnswer');
  txtAnswer.value = '';
  resetTimer(level);
}


function hardness() {
  let selectLevel = document.getElementById("selectLevel");
  let levelValue = selectLevel.options[selectLevel.selectedIndex].value;
  return levelValue;
}


function resetTimer(level) {
  timeleft = level;
  if (level == 100) {
    timeleft = 60;
  }
  else if (level == 1000) {
    timeleft = 90;
  }
  else if (level == 10000) {
    timeleft = 120;
  }
  startTimer();
}


function startTimer() {
  timeoutId = setTimeout(() => {
    let lbl = document.getElementById('lblTimeLeft');
    lbl.innerHTML = timeleft.toString();
    if (timeleft > 0) {
       if (timeleft < 11) {
        lbl.style.color = "red"
      } else {
        lbl.style.color = "aqua"
      }
      startTimer();
      timeleft = timeleft - 1;
    }
    else {
      submit();
    }
  }, 1000);
}


function levelChange() {
  timeleft = 0;
  formLoad();
}



function submit() {
  let lblFirst = document.getElementById('lblFirst').innerHTML;
  let lblSecond = document.getElementById('lblSecond').innerHTML;
  let outcome = validate(lblFirst, lblSecond);
  let lbl = document.getElementById('lblMsg');
  if (outcome) {
    lbl.style.color = 'aqua'
    lbl.innerHTML = 'Correct';
    showCorrect();
  }
  else {
    lbl.style.color = 'red'
    lbl.innerHTML = 'Incorrect';
    showIncorrect();
  }
  formLoad();
}


function validate(first, second) {
  if (first == null || second == null)
    return false;
  else {
    let txtAnswer = document.getElementById('txtAnswer');
    let times = first / second
    if (times == txtAnswer.value && txtAnswer.value.length > 0)
      return true;
    else
      return false;
  }
}


function showCorrect() {
  let lblCorrect = document.getElementById('lblCorrect');
  if (lblCorrect.innerHTML != '') {
    let score = parseInt(lblCorrect.innerHTML);
    score++;
    lblCorrect.innerHTML = score;
  }
  else {
    lblCorrect.innerHTML = 1;
  }
}


function showIncorrect() {
  let lblIncorrect = document.getElementById('lblIncorrect');
  if (lblIncorrect.innerHTML != '') {
    let score = parseInt(lblIncorrect.innerHTML);
    score++;
    lblIncorrect.innerHTML = score;
  }
  else {
    lblIncorrect.innerHTML = 1;
  }
}


function skip() {
  let lbl = document.getElementById('lblMsg');
  lbl.innerHTML = '';
  let txtAnswer = document.getElementById('txtAnswer');
  txtAnswer.value = '';
  submit();
}


