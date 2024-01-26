const STORAGE_TOKEN = 'ELJLEP42JGCO2CLBQB9MF88BI7O20GSNUHT2NMOT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

//this function is to store the users in the server

async function setItem(key, value){
    const payload = {key, value, token:STORAGE_TOKEN};
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

//this function is to get the user from the server with the key

async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if(res.data){
            return res.data.value;
        } throw `Could not found data with "${key}".`;
        
        });
}