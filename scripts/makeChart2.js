let mapAllworkersTable2 = new Map();

for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

    if(mapAllworkersTable2.has(keyWorkerName)){
       mapAllworkersTable2.set(keyWorkerName, mapAllworkersTable2.get(keyWorkerName) + 1);
    }
    else{
        mapAllworkersTable2.set(keyWorkerName, 1);
    }
}

let numberRecordsTable2 = 0;
let numberWorkersTable2 = 0;
let maxRecordsTable2 = 0;
let arrKeyTable2 = [];

for (let [key, value] of mapAllworkersTable2) {
    arrKeyTable2.push(key);
    numberRecordsTable2 += value;
    numberWorkersTable2 += 1;
    if(value > maxRecordsTable2)
        maxRecordsTable2 = value;
}

for(let i = 0; i < numberWorkersTable2; i++){

    let th1 = document.createElement('th');
    th1.textContent = arrKeyTable2[i];

    let td1 = document.createElement('td');

    let l_height = (150 / (maxRecordsTable2 - (mapAllworkersTable2.get(arrKeyTable2[i]) - 1)) + 10);

    let div1 = document.createElement('div');
    div1.innerHTML = mapAllworkersTable2.get(arrKeyTable2[i]);

    
    div1.style.width = 40 + "px";
    div1.style.height = l_height + "px";
    div1.style.backgroundColor = "green";
    td1.append(div1);

    let headerRow = document.getElementById('diagramEmploymentAll_InternalHeader');
    headerRow.append(th1);

    let content = document.getElementById('diagramEmploymentAll_content');
    content.append(td1);
}