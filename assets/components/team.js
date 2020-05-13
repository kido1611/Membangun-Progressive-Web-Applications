let selectedTeam = '';
var btnSave = document.getElementById("save");

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    btnSave.onclick = function() {
        getSavedTeamById(idParam)
            .then(function(team){
                if(!team){
                    console.log(selectedTeam);
                    saveTeam(selectedTeam)
                        .then(function(){
                            M.toast({html: 'Team has been saved'});
                            btnSave.innerHTML = '<i class="large material-icons">favorite</i>';
                        })
                        .catch(function(error){
                            console.log(error);
                            M.toast({html: 'Failed'});
                        });
                }
                else{
                    deleteTeam(idParam)
                        .then(function(){
                            M.toast({html: 'Team has been deleted'});
                            btnSave.innerHTML = '<i class="large material-icons">favorite_border</i>';
                        })
                }
            })
            .catch(function(error){
                console.log(`${error}, ${idParam}`);
            });
    };

    getTeamById(idParam);

    function getMatchs(){
        getTeamMatchesById(idParam)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }
});

function showTeamData(data){
    selectedTeam = data;
    let content = `
        <div class="row">
            <div class="col s12 m4 center-align">
                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" width="200" height="200" alt="logo">
            </div>
            <div class="col s12 m8">
                <h4>${data.name}</h4>
                <h5>${data.area.name}</h5>
                <h6>Since ${data.founded}</h6>
                <div>
                    <p>
                        <b>Address</b><br/>
                        ${data.address}
                    </p>
                    <p>
                        <b>Email</b><br/>
                        <a href="mailto:${data.email}" target="_blank">${data.email}</a>
                    </p>
                    <p>
                        <b>Phone</b><br/>
                        ${data.phone}
                    </p>
                    <p>
                        <b>Website</b><br/>
                        <a href="${data.website}" target="_blank">${data.website}</a>
                    </p>
                    <p>
                        <b>Venue</b><br/>
                        ${data.venue}
                    </p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s12"><a class="active" href="#squad">Squad</a></li>
                </ul>
            </div>
            <div id="squad" class="col s12">
                <table class="striped highlight centered responsive-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>From</th>
                            <th>Birth</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>`;
        data.squad.forEach(function(result){
            const birthDate = new Intl.DateTimeFormat(['ban', 'id'], {
                day: '2-digit', month: 'long', year: 'numeric'
            }).format(new Date(result.dateOfBirth));

            let position = `${result.role}`;
            if(result.role === "PLAYER"){
                position += ` - ${result.position}`;
            }
            content += `
                <tr>
                    <td>${result.name}</td>
                    <td>${result.nationality}</td>
                    <td>${result.countryOfBirth}, ${birthDate}</td>
                    <td>${position}</td>
                </tr>
            `;
        });
        content += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById("content").innerHTML = content;

    getSavedTeamById(data.id)
        .then(function(team){
            if(team){
                btnSave.innerHTML = '<i class="large material-icons">favorite</i>';
            }
        })
        .catch(function(error){
            console.log(error);
        });

    const elements = document.querySelectorAll(".tabs");
    const instance = M.Tabs.init(elements);
}