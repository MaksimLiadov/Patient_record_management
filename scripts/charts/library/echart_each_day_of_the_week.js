import { getDayOfWeek } from "../get_map/get_map.js";

let DayOfWeek = getDayOfWeek();

let a = Object.keys(DayOfWeek);
alert(a.length);

let numberAppointment = [];
for (let day in DayOfWeek) {
    numberAppointment.push(DayOfWeek[day]);
}
alert(numberAppointment);

let optionChartDayOfWeek = {
    title: {
        text: 'График записей по дням недели'
    },
    tooltip: {},
    legend: {
        right: "0%",
        data: ['sales']
    },
    xAxis: {
        data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    yAxis: {},
    series: [
        {
            name: 'sales',
            type: 'bar',
            data: numberAppointment
        }
    ]
};

let chartDayOfWeek = echarts.init(document.getElementById('eachDayOfWeek'));
chartDayOfWeek.setOption(optionChartDayOfWeek);