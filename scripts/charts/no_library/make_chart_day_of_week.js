import { getDayOfWeek } from "../get_map/get_map.js";

let DayOfWeek = getDayOfWeek();

let maxCount = 0

for (let key in DayOfWeek) {
    if (DayOfWeek[key] > maxCount) {
        maxCount = DayOfWeek[key];
    }
}
for (let key in DayOfWeek) {

    let td1 = document.createElement('td');

    let l_height = (150 / (maxCount - (DayOfWeek[key] - 1)) + 10);

    let div1 = document.createElement('div');
    div1.innerHTML = DayOfWeek[key];


    div1.style.width = 40 + "px";
    div1.style.height = l_height + "px";
    div1.style.backgroundColor = "green";
    td1.append(div1);

    let content = document.getElementById('diagramDayOfTheWeek_content');
    content.append(td1);
}