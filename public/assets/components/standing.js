document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getStanding(idParam);

});

function getStanding(id){
    getStandingLeague(id);
}

function showStandingData(data){
    const startDateString = new Intl.DateTimeFormat(['ban', 'id'], {
        day: '2-digit', month: 'long', year: 'numeric'
    }).format(new Date(data.season.startDate));

    const endDateString = new Intl.DateTimeFormat(['ban', 'id'], {
        day: '2-digit', month: 'long', year: 'numeric'
    }).format(new Date(data.season.endDate));

    const lastUpdateString = new Intl.DateTimeFormat(['ban', 'id'], {
        day: '2-digit', month: 'long', year: 'numeric'
    }).format(new Date(data.competition.lastUpdated));

    let content = ``;
    content += `<h4>Standing ${data.competition.name} - ${data.competition.area.name}</h4>`;
    content += `<p>From ${startDateString} until ${endDateString}</p>`;

    let standingTable = `
        <table class="striped highlight centered responsive-table" id="table-standing">
            <thead>
                <tr>
                    <th>No</th>
                    <th colspan="2">Team</th>
                    <th>Play</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Lose</th>
                    <th>Goals</th>
                </tr>
            </thead>
            <tbody>`;
    data.standings[0].table.forEach(function(result){
        let logo = result.team.crestUrl;
        if(logo){
            logo = logo.replace(/^http:\/\//i, 'https://');
        }
        standingTable += `
            <tr style="cursor: pointer;" onclick='window.location.href="team.html?id=${result.team.id}"'>
                <td>${result.position}</td>
                <td><img alt="logo" src="${logo}" width="48" height="48"></td>
                <td class="left-align">${result.team.name}</td>
                <td>${result.playedGames}</td>
                <td>${result.won}</td>
                <td>${result.draw}</td>
                <td>${result.lost}</td>
                <td>${result.goalsFor}-${result.goalsAgainst}</td>
            </tr>
        `;
    });
    standingTable += `
            </tbody>
        </table>
    `;
    content += standingTable;
    content += `<p class="right-align">Last update : ${lastUpdateString}</p>`;

    document.getElementById("content").innerHTML = content;
}

function showStandingError(error){
    const content = `
        <h5>Error - ${error}</h5>
    `;

    document.getElementById("content").innerHTML = content;
}