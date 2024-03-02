import { getAllTimeMap } from "../get_map/get_map.js";

let AllTimeMap = getAllTimeMap();

let employeeArray = [];
for (let employee of AllTimeMap.keys()) {
    employeeArray.push(employee);
}

let numberRecords = [];
for (let count of AllTimeMap.values()) {
    numberRecords.push(count);
}

let optionChartAllTime = {
    title: {
        text: 'График записей за все время'
    },
    tooltip: {},
    legend: {
        right: "0%",
        data: ['sales']
    },
    xAxis: {
        data: employeeArray
    },
    yAxis: {},
    series: [
        {
            name: 'sales',
            type: 'bar',
            data: numberRecords
        }
    ]
};

let chartAllTime = echarts.init(document.getElementById('allTime'));
chartAllTime.setOption(optionChartAllTime);