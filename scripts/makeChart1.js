
    let mapAllworkers = new Map();

    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let [keyWorkerName, keyRecordDate, keyTime] = key.split(',');

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if(keyRecordDate == today){
            if(mapAllworkers.has(keyWorkerName)){
                mapAllworkers.set(keyWorkerName, mapAllworkers.get(keyWorkerName) + 1);
            }
            else{
                mapAllworkers.set(keyWorkerName, 1);
            }
        }
    }

    let numberRecords = 0;
    let numberWorkers = 0;
    let maxRecords = 0;
    let arrKey = [];

    for (let [key, value] of mapAllworkers) {
        arrKey.push(key);
        numberRecords += value;
        numberWorkers += 1;
        if(value > maxRecords)
            maxRecords = value;
    }
    
    for(let i = 0; i < numberWorkers; i++){

        let th1 = document.createElement('th');
        th1.textContent = arrKey[i];

        let td1 = document.createElement('td');

        let l_height = 100 / (maxRecords - (mapAllworkers.get(arrKey[i]) - 1));

        let div1 = document.createElement('div');
        div1.innerHTML = mapAllworkers.get(arrKey[i]);

        
        div1.style.width = 40 + "px";
        div1.style.height = l_height + "px";
        div1.style.backgroundColor = "green";
        td1.append(div1);

        let headerRow = document.getElementById('diagramEmployment_InternalHeader');
        headerRow.append(th1);

        let content = document.getElementById('diagramEmployment_content');
        content.append(td1);
    }