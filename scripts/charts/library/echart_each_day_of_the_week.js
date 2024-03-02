import { getDayOfWeek } from "../get_map/get_map.js";

let DayOfWeek = getDayOfWeek();

let numberAppointment = [];
for (let day in DayOfWeek) {
    numberAppointment.push(DayOfWeek[day]);
}

let optionChartDayOfWeek = {
    title: {
        text: 'График записей по дням недели'
    },
    tooltip: {},
    legend: {
        right: "0%",
        data: ['Записи']
    },
    xAxis: {
        data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    yAxis: {},
    series: [
        {
            name: 'Записи',
            type: 'bar',
            data: numberAppointment
        }
    ]
};

let chartDayOfWeek = echarts.init(document.getElementById('eachDayOfWeek'));
chartDayOfWeek.setOption(optionChartDayOfWeek);