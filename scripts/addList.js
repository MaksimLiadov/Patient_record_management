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
          let Tables = document.querySelector('.timeTable');
          let lastList = Tables.lastChild;//.querySelector('.schedule');

          //заполнение ФИО работника

          let name = this.nextElementSibling.textContent;

          let lastFIO = lastList.querySelector('.FIO');
          lastFIO.innerHTML = name

          //Заполнение даты


          let lastDivClassDate = lastList.querySelector('.date');


          let defaultDateSplit = defaultDate.split('-');
          let dd = defaultDateSplit[2];
          let mm = defaultDateSplit[1];
          let yyyy = defaultDateSplit[0];
          defaultDate = dd + "-" + mm + "-" + yyyy;
          lastDivClassDate.innerHTML = defaultDate;

          //заполнение списка времени записи

          let lastsheduleList = lastList.querySelector('.schedule');
          recordingTimeEntry(lastsheduleList, lastFIO, lastDivClassDate, lastFIO.innerHTML);

          //событие нажатия на время

          lastsheduleList.childNodes.forEach(function (recordingTime) {
            recordingTime.addEventListener('click', function () {

              if (recordingTime.style.background == "green")
                return;

              let FIO = prompt("Введите ваше ФИО", "Иванов Иван Иванович");
              if (FIO) {

                let key = lastFIO.innerHTML + "," + defaultDate + "," + recordingTime.innerHTML
                localStorage.setItem(key, FIO)

                recordingTime.innerHTML = FIO;
                recordingTime.style.background = "green";
                //localStorage.clear();
              }
              else
                return;


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



function recordingTimeEntry(lastscheduleList, lastFIO, defaultDate) {
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
        newItem.textContent = KeyName;
        newItem.style.backgroundColor = "green";
        newItem.setAttribute('data-time', 0);
        lastscheduleList.append(newItem);
        time.setMinutes(time.getMinutes() + 10);
      }
    }

    if (!thereIsRecord && localStorage.length != 0) {
      newItem.innerHTML = (hours + ":" + minuts);
      newItem.setAttribute('data-time', 0);
      lastscheduleList.append(newItem);
      time.setMinutes(time.getMinutes() + 10);
    }
  }
}