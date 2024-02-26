let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("defaultDate").value = today;

const inputeDate = document.getElementById('defaultDate');

inputeDate.addEventListener('change', function () {

    let allList = document.querySelectorAll('.oneWorker');

    allList.forEach(function (List) {
        let newDate = document.getElementById("defaultDate").value;
        let dateElem = List.querySelector('.date');
        changeDate(newDate, dateElem);

        function changeDate(newDate, dateElem) {

            let defaultDateSplit = newDate.split('-');
            let dd = defaultDateSplit[2];
            let mm = defaultDateSplit[1];
            let yyyy = defaultDateSplit[0];

            newDate = dd + "-" + mm + "-" + yyyy;
            dateElem.innerHTML = newDate;

            date = List.querySelector('.date');
            fio = List.querySelector('.FIO');
            recordingTimeChange(List, fio, date);
        }

    });
});

function recordingTimeChange(oneWorker, FIO, date) {

    let schedule = oneWorker.querySelector('.schedule');

    let time = new Date();
    time.setHours(8, 0, 0);

    for (let i = 2; i < 23; i++) {

        let hours = time.getHours();
        let minuts = time.getMinutes();

        if (minuts == "0")
            minuts = "00";

        let thereIsRecord = false;
        for (let j = 0; j < localStorage.length; j++) {

            let key = localStorage.key(j);
            let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

            if ((keyWorkerName == FIO.innerHTML) && (keyRecordDate == date.innerHTML) && (keyTime == schedule.childNodes[i].innerHTML)) {
                thereIsRecord = true;
                KeyName = localStorage.getItem(key);
                schedule.childNodes[i].innerHTML = KeyName;
                schedule.childNodes[i].style.backgroundColor = "green";
                time.setMinutes(time.getMinutes() + 10)
            }
        }
        if (!thereIsRecord && localStorage.length != 0) {
            schedule.childNodes[i].innerHTML = (hours + ":" + minuts);
            time.setMinutes(time.getMinutes() + 10);
            schedule.childNodes[i].style.backgroundColor = "";
        }
    }
}