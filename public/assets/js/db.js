const dbPromised = idb.open("football-data", 1, function(upgradeDb) {
    const teamObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamObjectStore.createIndex("name", "name", { unique: false });
});

function saveTeam(team){
    return new Promise(function(resolve, reject){
        dbPromised
            .then(function(db){
                const tx = db.transaction("teams", "readwrite");
                const store = tx.objectStore("teams");
                store.put(team)

                resolve(tx.complete);
            })
            .catch(function(error){
                reject(error);
            });
    });
}

function deleteTeam(id){
    return new Promise(function(resolve, reject){
        dbPromised
            .then(function(db){
                const tx = db.transaction("teams", "readwrite");
                const store = tx.objectStore("teams");
                store.delete(Number(id));
                resolve(tx.complete);
            })
            .catch(function(error){
                reject(error);
            });
    });
}

function getSavedTeams(){
    return new Promise(function(resolve, reject){
        dbPromised
            .then(function(db){
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function(teams){
                resolve(teams);
            })
    });
}

function getSavedTeamById(id){
    return new Promise(function(resolve, reject){
        dbPromised
            .then(function(db){
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                resolve(store.get(Number(id)));
            })
            .catch(function(error){
                reject(error);
            });
    });
}

// function getById(id) {
//     return new Promise(function(resolve, reject) {
//         dbPromised
//             .then(function(db) {
//                 var tx = db.transaction("articles", "readonly");
//                 var store = tx.objectStore("articles");
//                 return store.get(id);
//             })
//             .then(function(article) {
//                 resolve(article);
//             });
//     });
// }
