const API_KEY = `90d87babf6bd4f7fa5566e0841cd9fec`;
const BASE_URL = `https://api.football-data.org/v2/`;
const COMPETITIONS_URL = `${BASE_URL}competitions/`;
const STANDINGS_URL = `${BASE_URL}competitions/`;
const TEAM_URL = `${BASE_URL}teams/`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

function getStandingLeague(id){

    if('caches' in window){
        caches.match(`${STANDINGS_URL}${id}/standings`)
            .then(function(response){
                if(response){
                    response.json().then(function(data){
                        showStandingData(data);
                    });
                }
            })
    }

    fetchAPI(`${STANDINGS_URL}${id}/standings`)
        .then(status)
        .then(json)
        .then(function(data){
            showStandingData(data);
        })
        .catch(error);
}

function getTeamById(id){
    if('caches' in window){
        caches.match(`${TEAM_URL}${id}`)
            .then(function(response){
                if(response){
                    response.json().then(function(data){
                        showTeamData(data);
                    });
                }
            })
    }
    return fetchAPI(`${TEAM_URL}${id}`)
        .then(status)
        .then(json)
        .then(function(data){
            showTeamData(data);
        })
        .catch(error);
}

function getTeamMatchesById(id){
    return fetchAPI(`${TEAM_URL}${id}/matches?status=SCHEDULED`)
        .then(status)
        .then(json);
}

function getCompetitions(){
    return fetchAPI(`${COMPETITIONS_URL}`)
        .then(status)
        .then(json);
}