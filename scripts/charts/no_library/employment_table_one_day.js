import { getOneDayMap } from "../get_map/get_map.js";

let mapOneDay = getOneDayMap();

let numberRecords = 0;
let numberWorkers = 0;
let maxRecords = 0;
let arrKey = [];

for (let [key, value] of mapOneDay) {
    arrKey.push(key);
    numberRecords += value;
    numberWorkers += 1;
    if (value > maxRecords)
        maxRecords = value;
}

for (let i = 0; i < numberWorkers; i++) {

    let th1 = document.createElement('th');
    th1.textContent = arrKey[i];

    let td1 = document.createElement('td');

    let l_height = (150 / (maxRecords - (mapOneDay.get(arrKey[i]) - 1)) + 10);

    let div1 = document.createElement('div');
    div1.innerHTML = mapOneDay.get(arrKey[i]);


    div1.style.width = 40 + "px";
    div1.style.height = l_height + "px";
    div1.style.backgroundColor = "green";
    td1.append(div1);

    let headerRow = document.getElementById('diagramEmployment_InternalHeader');
    headerRow.append(th1);

    let content = document.getElementById('diagramEmployment_content');
    content.append(td1);
}