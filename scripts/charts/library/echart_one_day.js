import { getOneDayMap } from "../get_map/get_map.js";

let mapOneDay = getOneDayMap();

let workersArr = [];
for (let worker of mapOneDay.keys()) {
    workersArr.push(worker);
}

let numberRecords = [];
for (let count of mapOneDay.values()) {
    numberRecords.push(count);
}

let optionChartOneDay = {
    title: {
        text: 'График записей на сегодня'
    },
    tooltip: {},
    legend: {
        right: "0%",
        data: ['Записи']
    },
    xAxis: {
        data: workersArr
    },
    yAxis: {},
    series: [
        {
            name: 'Записи',
            type: 'bar',
            data: numberRecords
        }
    ]
};

let chartOneDay = echarts.init(document.getElementById('oneDay'));
chartOneDay.setOption(optionChartOneDay);