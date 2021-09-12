(function () {
    window.toggleExpander = function toggleExpander(x) {
        document.getElementsByClassName("menu")[0].classList.toggle("expanded");
    }
    window.addEventListener("load", () => {
        const images = document.querySelectorAll("img[click-to-enlarge]");
        images.forEach(img => {
            {% if site.data.metaData.clickToEnlargeImages %}
            img.addEventListener("click", () => {
                const src = img.attributes.getNamedItem("src");
                console.log(src)
                const modal = document.createElement("div");
                const removeModal = function() {
                    document.body.removeChild(modal);
                };
                modal.classList.add("modal__picture-zoomed");
                modal.style.backgroundImage = `URL("${src.value}")`;
                modal.addEventListener("click", removeModal);
                document.body.append(modal);
                document.body.addEventListener("keyup", e => {
                    if (e.key === 'Escape') {
                        removeModal();
                    }
                }, {once : true})
            });
            {% else %}
            img.removeAttribute("click-to-enlarge");
            {% endif %}
        });
    })
})();