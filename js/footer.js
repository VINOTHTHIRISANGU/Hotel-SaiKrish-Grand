document.addEventListener("DOMContentLoaded", function () {

    fetch("footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Footer file not found");
            }

            return response.text();
        })
        .then(data => {
            const footerContainer =
                document.getElementById("footer-container");

            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        })
        .catch(error => {
            console.error("Footer loading error:", error);
        });

});