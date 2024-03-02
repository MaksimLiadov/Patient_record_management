const getMap = {
    getAllTimeMap: function () {
        let mapAllTime = new Map();

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

            if (mapAllTime.has(keyWorkerName)) {
                mapAllTime.set(keyWorkerName, mapAllTime.get(keyWorkerName) + 1);
            }
            else {
                mapAllTime.set(keyWorkerName, 1);
            }
        }
        return mapAllTime
    },
    getOneDayMap: function () {
        let mapOneDay = new Map();

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();

            today = dd + '-' + mm + '-' + yyyy;

            if (keyRecordDate == today) {
                if (mapOneDay.has(keyWorkerName)) {
                    mapOneDay.set(keyWorkerName, mapOneDay.get(keyWorkerName) + 1);
                }
                else {
                    mapOneDay.set(keyWorkerName, 1);
                }
            }
        }
        return mapOneDay
    },
    getDayOfWeek: function () {
        let countDayOfWeek = {
            sunday: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0
        }

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

            let date = new Date(keyRecordDate);
            let dayOfWeek = date.getDay();

            switch (dayOfWeek) {
                case 0:
                    countDayOfWeek.sunday += 1;
                    break;
                case 1:
                    countDayOfWeek.monday += 1;
                    break;
                case 2:
                    countDayOfWeek.tuesday += 1;
                    break;
                case 3:
                    countDayOfWeek.wednesday += 1;
                    break;
                case 4:
                    countDayOfWeek.thursday += 1;
                    break;
                case 5:
                    countDayOfWeek.friday += 1;
                    break;
                case 6:
                    countDayOfWeek.saturday += 1;
                    break;
            }
        }

        return countDayOfWeek
    }
}

export const getAllTimeMap = getMap.getAllTimeMap;
export const getOneDayMap = getMap.getOneDayMap;
export const getDayOfWeek = getMap.getDayOfWeek