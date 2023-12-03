let monday = 0;
let tuesday = 0;
let wednesday = 0;
let thursday = 0;
let friday = 0;
let saturday = 0;
let sunday = 0;


for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

    let date = new Date(keyRecordDate);

    let dayOfWeekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = dayOfWeekArr[date.getDay()];
    
    switch(dayOfWeek) {
        case 'Monday':
            monday += 1;
        break;
        case 'Tuesday':
            tuesday += 1;
        break;
        case 'Wednesday':
            wednesday += 1;
        break;
        case 'Thursday':
            thursday += 1;
        break;
        case 'Friday':
            friday += 1;
        break;
        case 'Saturday':
            saturday += 1;
        break;
        case 'Sunday':
            sunday += 1;
        break;
      }
}

let countDayOfWeekArr = [];
countDayOfWeekArr[0] = monday;
countDayOfWeekArr[1] = tuesday;
countDayOfWeekArr[2] = wednesday;
countDayOfWeekArr[3] = thursday;
countDayOfWeekArr[4] = friday;
countDayOfWeekArr[5] = saturday;
countDayOfWeekArr[6] = sunday;

let maxCount = 0

for (let i = 0; i < 7; i++){
    if(countDayOfWeekArr[i] > maxCount){
        maxCount = countDayOfWeekArr[i];
    }
}

for(let i = 0; i < 7; i++){

    let td1 = document.createElement('td');

    let l_height = (150 / (maxCount - (countDayOfWeekArr[i] - 1)) + 10);

    let div1 = document.createElement('div');
    div1.innerHTML = countDayOfWeekArr[i];

    
    div1.style.width = 40 + "px";
    div1.style.height = l_height + "px";
    div1.style.backgroundColor = "green";
    td1.append(div1);

    let content = document.getElementById('diagramDayOfTheWeek_content');
    content.append(td1);
}