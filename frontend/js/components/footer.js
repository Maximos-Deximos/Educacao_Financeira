const path = window.location.pathname.includes("/pages/")
        ? "../components/footer.html"
        : "components/footer.html";

fetch(path)
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });