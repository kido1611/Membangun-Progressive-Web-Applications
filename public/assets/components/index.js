let page = window.location.hash.substr(1);
loadPage(page);

function getSaved(){
    getSavedTeams().then(function(teams){
        let content = `<h5>Favorite Team</h5>`;

        teams.forEach(function(team){
            content += `
                <div class="col s12 m6 l4">
                    <div class="card">
                        <a href="team.html?id=${team.id}">
                            <div class="card-image">
                                <img class="responsive-img" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="max-height: 200px;" alt="logo">
                            </div>
                            <div class="card-content">
                                <span class="card-title">${team.name}</span>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        });

        document.getElementById('content').innerHTML = content;
        console.log(teams);
    });
}

function getCompetition(){
    getCompetitions()
        .then(function(data){
            let content = `<h5>Competitions</h5>`;
            content += `
                <table class="striped highlight centered responsive-table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>From</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>`;
            data.competitions.forEach(function(competition){
                content += `
                    <tr>
                        <td>${competition.id}</td>
                        <td><a href="standing.html?id=${competition.id}">${competition.name}</a></td>
                        <td>${competition.area.name}</td>
                        <td></td>
                    </tr>
                `;
            });
            content += `
                    </tbody>
                </table>
            `;

            document.getElementById('content').innerHTML = content;
        });
}