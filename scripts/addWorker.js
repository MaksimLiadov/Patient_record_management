document.addEventListener('DOMContentLoaded', function() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {

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

        //заполнение ФИО работника

        let name = this.nextElementSibling.textContent;
        
        let allFIO = document.querySelectorAll('.FIO');
        let lastFIO = allFIO[allFIO.length - 1];
        lastFIO.innerHTML = name

        //Заполнение даты

        let defaultDate = document.getElementById("defaultDate").value;

        let divClassDate = document.querySelectorAll('.date');
        let lastDivClassDate = divClassDate[divClassDate.length - 1]
        lastDivClassDate.innerHTML = defaultDate


          //заполнение списка времени записи
          let allScheduleList = document.querySelectorAll('.schedule');
          let lastscheduleList = allScheduleList[allScheduleList.length - 1];
          recordingTimeEntry(lastscheduleList, lastFIO, lastDivClassDate, lastFIO.innerHTML);

        
        //событие нажатия на время

        let recordingTimes = document.querySelectorAll('[data-time]')
        
        recordingTimes.forEach(function(recordingTime){
        recordingTime.addEventListener('click', function(){
        
          if(recordingTime.style.background == "green")
            return;

          let FIO = prompt("Введите ваше ФИО", "Иванов Иван Иванович");  
          if(FIO){
            
            let key = lastFIO.innerHTML +","+ defaultDate +","+ recordingTime.innerHTML
            localStorage.setItem(key, FIO)

            recordingTime.innerHTML = FIO;
            recordingTime.style.background = "green";
            //localStorage.clear();
          }
          else
            return;
            
        
          });
        });
              
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



function recordingTimeEntry(lastscheduleList, lastFIO, defaultDate){
  lastscheduleList.firstChild.remove();
  
  let KeyName;

  let time = new Date();
  time.setHours(8, 0, 0);

  for (let i = 0; i < 21; i++) {

    let thereIsRecord = false;

      let newItem = document.createElement('li');
      let hours = time.getHours();
      let minuts = time.getMinutes();

      if(minuts == "0")
        minuts = "00";

      newItem.innerHTML = (hours +":" + minuts);

      if(localStorage.length == 0){
        newItem.innerHTML = (hours +":" + minuts);
        newItem.setAttribute('data-time', 0);
        lastscheduleList.append(newItem);
        time.setMinutes(time.getMinutes() + 10)
      }
      
      for (let i = 0; i < localStorage.length; i++){
        
        let key = localStorage.key(i);
         let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');
  
         if((keyWorkerName == lastFIO.innerHTML) && (keyRecordDate == defaultDate.innerHTML) && (keyTime == newItem.innerHTML)){
          KeyName = localStorage.getItem(key);
          newItem.innerHTML = KeyName;
          newItem.textContent = KeyName;
          newItem.style.backgroundColor = "green";
          newItem.setAttribute('data-time', 0);
          lastscheduleList.append(newItem);
          time.setMinutes(time.getMinutes() + 10);
         }
      }

      if(!thereIsRecord && localStorage.length != 0){
        newItem.innerHTML = (hours +":" + minuts);
        newItem.setAttribute('data-time', 0);
        lastscheduleList.append(newItem);
        time.setMinutes(time.getMinutes() + 10);
      }  
  }
}