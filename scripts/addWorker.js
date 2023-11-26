document.addEventListener('DOMContentLoaded', function() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {

          let timeTable = document.querySelector('.timeTable');
          let newWorker = document.createElement('li');
          newWorker.classList.add('oneWorker');
          newWorker.innerHTML = `
            <div class="date">20.20.2023</div>
            <div class="FIO"></div>
            <ul class="schedule">
              <li></li>
            </ul>
          `;
          timeTable.append(newWorker);

          //заполнение списка времени записи
          let allScheduleList = document.querySelectorAll('.schedule');
          let lastscheduleList = allScheduleList[allScheduleList.length - 1];

          lastscheduleList.firstChild.remove();
          
          let time = new Date();
          time.setHours(8, 0, 0);
          for (let i = 0; i < 21; i++) {
            let newItem = document.createElement('li');
            let hours = time.getHours();
            let minuts = time.getMinutes();
            if(minuts == "0")
              minuts = "00";
            newItem.innerHTML = (hours +":" + minuts);
            newItem.setAttribute('data-time', 0);
            lastscheduleList.append(newItem);
            time.setMinutes(time.getMinutes() + 10)
          }

        //заполнение ФИО
        let name = this.nextElementSibling.textContent;
        
        let allFIO = document.querySelectorAll('.FIO');
        let lastFIO = allFIO[allFIO.length - 1];
        lastFIO.innerHTML = name

        //событие нажатия на время

        let recordingTimes = document.querySelectorAll('[data-time]')
        recordingTimes.forEach(function(recordingTime){
            recordingTime.addEventListener('click', function(){
              if(recordingTime.style.background == "green")
                return

              let FIO;
              if(FIO = prompt("Введите ваше фИО", "Иванов Иван Иванович")){
                recordingTime.innerHTML = FIO;
                recordingTime.style.background = "green";
              }
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