document.addEventListener('DOMContentLoaded', function () {
  let checkboxes = document.querySelectorAll('.addList');

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        let defaultDate = document.getElementById("defaultDate").value;
        if (!defaultDate) {
          alert("Вы не выбрали дату");
          this.checked = false;
        }
        else {
          let timeTable = document.querySelector('.timeTable');
          let newWorker = document.createElement('li');
          newWorker.classList.add('oneWorker');
          newWorker.innerHTML = `
            <div class="date"></div>
            <div class="FIO"></div>
            <ul class="schedule">
              <li></li>
            </ul>
          `;
          timeTable.append(newWorker);

          //последний список
          let lastList = timeTable.lastChild;

          //заполнение ФИО работника

          let name = this.nextElementSibling.textContent;

          let lastFIO = lastList.querySelector('.FIO');
          lastFIO.innerHTML = name

          //Заполнение даты

          let lastDivClassDate = lastList.querySelector('.date');
          fillingDate(lastDivClassDate, defaultDate);

          //заполнение списка времени записи

          let lastsheduleList = lastList.querySelector('.schedule');
          recordingTimeEnter(lastsheduleList, lastFIO, lastDivClassDate, lastFIO.innerHTML);

          //событие нажатия на время

          lastsheduleList.childNodes.forEach(function (recordingTime) {
            recordingTime.addEventListener('click', function () {

              //Удаление
              let ComputedStyle = getComputedStyle(recordingTime);
              if (ComputedStyle.backgroundColor == "rgb(0, 128, 0)") {
                let del = confirm("Вы хотите удалить запись?");
                if (del) {
                  //как лучше?
                  let schedule = this.parentNode;
                  let oneWorker = schedule.parentNode;

                  let fio = oneWorker.querySelector(".FIO").innerHTML;
                  let date = this.parentNode.parentNode.querySelector(".date").innerHTML;
                  deleteRecord(this, fio, date);
                  return;
                }
                else
                  return;
              }

              //Добавление
              let FIO = prompt("Введите ваше ФИО", "Иванов Иван Иванович");
              Validation = checkValidation(FIO);
              if (Validation) {

                defaultDate = lastDivClassDate.innerHTML;
                let key = lastFIO.innerHTML + "," + defaultDate + "," + recordingTime.innerHTML
                localStorage.setItem(key, FIO)

                recordingTime.innerHTML = FIO;
                recordingTime.classList.add("appointment");
                recordingTime.classList.remove("freely");
                //recordingTime.style.backgroundColor = "green";
                //localStorage.clear();
              }
              else {
                alert("Введено некоректное ФИО");
                return;
              }
            });
          });
        }

      } else {
        let name = this.nextElementSibling.textContent;
        let timeTable = document.querySelector(".timeTable");
        let oneWorker = timeTable.querySelectorAll(".oneWorker");

        for (let i = 0; i < oneWorker.length; i++) {
          let workerFIO = oneWorker[i].querySelector(".FIO").textContent;

          if (workerFIO == name) {
            oneWorker[i].remove();
          }
        }
      }
    });
  });
});


function deleteRecord(element, fio, date) {

  timeInnerHtml = element.nextSibling.innerHTML;
  let [hours, minuts] = timeInnerHtml.split(":");
  minuts = minuts - 10;
  if (minuts == "0") {
    minuts = "00";
  }
  let time = hours + ":" + (minuts);


  element.innerHTML = time;
  element.classList.remove("appointment");
  element.classList.add("freely");
  //element.style.backgroundColor = "";

  let key = fio + "," + date + "," + time;

  localStorage.removeItem(key)
}

function fillingDate(lastDivClassDate, defaultDate) {
  let defaultDateSplit = defaultDate.split('-');
  let dd = defaultDateSplit[2];
  let mm = defaultDateSplit[1];
  let yyyy = defaultDateSplit[0];

  defaultDate = dd + "-" + mm + "-" + yyyy;
  lastDivClassDate.innerHTML = defaultDate;
}

function checkValidation(fio) {
  let isValidated = true;

  let [name, lastName, Patronymic] = fio.split(" ");

  if (!(name && lastName && Patronymic))
    isValidated = false;

  for (let i = 0; i < fio.length; i++) {
    let a = fio[i];
    if (a == "1" || a == "2" || a == "3" || a == "4" || a == "5" || a == "6" || a == "7" || a == "8" || a == "9" || a == "0"
      || a == "!" || a == "@" || a == "#" || a == "$" || a == "%" || a == "^" || a == "&" || a == "*" || a == "(") {
      isValidated = false
    }
  }

  return isValidated;
}

function recordingTimeEnter(lastscheduleList, lastFIO, defaultDate) {
  lastscheduleList.firstChild.remove();

  let KeyName;

  let time = new Date();
  time.setHours(8, 0, 0);

  for (let i = 0; i < 21; i++) {

    let thereIsRecord = false;

    let newItem = document.createElement('li');
    let hours = time.getHours();
    let minuts = time.getMinutes();

    if (minuts == "0")
      minuts = "00";

    newItem.innerHTML = (hours + ":" + minuts);

    if (localStorage.length == 0) {
      newItem.innerHTML = (hours + ":" + minuts);
      newItem.setAttribute('data-time', 0);
      newItem.classList.add("freely");
      lastscheduleList.append(newItem);
      time.setMinutes(time.getMinutes() + 10)
    }

    for (let i = 0; i < localStorage.length; i++) {

      let key = localStorage.key(i);
      let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

      if ((keyWorkerName == lastFIO.innerHTML) && (keyRecordDate == defaultDate.innerHTML) && (keyTime == newItem.innerHTML)) {
        thereIsRecord = true;
        KeyName = localStorage.getItem(key);
        newItem.innerHTML = KeyName;
        newItem.classList.add("appointment");
        //newItem.style.backgroundColor = "green";
        newItem.setAttribute('data-time', 0);
        lastscheduleList.append(newItem);
        time.setMinutes(time.getMinutes() + 10);
      }
    }

    if (!thereIsRecord && localStorage.length != 0) {
      newItem.innerHTML = (hours + ":" + minuts);
      newItem.setAttribute('data-time', 0);
      newItem.classList.add("freely");
      lastscheduleList.append(newItem);
      time.setMinutes(time.getMinutes() + 10);
    }
  }
}