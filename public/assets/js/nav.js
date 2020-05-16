document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    const elements = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elements);
    loadNav();
});

function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status !== 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll(".sidenav a, .topnav a, a.brand-text, tr.url").forEach(function(elm) {
                elm.addEventListener("click", function(event) {
                    // Tutup sidenav
                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    // Muat konten halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
}

function loadPage(page) {
    const hashtagUrl = page.split("#");

    if(hashtagUrl.length > 1){
        page = hashtagUrl[1];
    }

    if (page === "" || page.length === 0) page = "competition";

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");

            if(page === "competition"){
                // Do Nothing
            }
            else if(page === "favorite"){
                getSaved();
            }

            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "assets/page/" + page + ".html", true);
    xhttp.send();
}