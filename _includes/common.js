(function () {
    window.toggleExpander = function toggleExpander(x) {
        document.getElementsByClassName("menu")[0].classList.toggle("expanded");
    }
    window.addEventListener("load", () => {
        // #region click to enlarge images 
        const images = document.querySelectorAll("img[click-to-enlarge]");
        images.forEach(img => {
            {% if site.data.metaData.clickToEnlargeImages %}
            img.addEventListener("click", () => {
                const src = img.attributes.getNamedItem("src");
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
        // #endregion click to enlarge images 
        // #region embedded audio players
        const players = document.querySelectorAll("iframe.embedded-player");
        const getParamsByPlayerType = (src, type) => {
            const rt = (src, height) => ({
                src: src,
                height: height
            });
            switch (type.toLocaleLowerCase()) {
                case "soundcloud":
                    return rt(`https://w.soundcloud.com/player/?url=${src}`, 125);
                case "bandcamp":
                    return rt(`https://bandcamp.com/EmbeddedPlayer/${src}`, 125);
                case "spotify":
                    return rt(`https://open.spotify.com/embed/track/${src}`, 80);
                case "youtube":
                    return rt(`https://www.youtube.com/embed/${src}`, 350);
                case "anchor.fm":
                    return rt(`https://anchor.fm/sucias/embed/episodes/${src}`,102);
                default:
                    return rt(src, 125);
            }
        };
        players.forEach(player => {
            const givenSrc = player.getAttribute("givenSrc");
            const type = player.getAttribute("type");
            const { src, height } = getParamsByPlayerType(givenSrc, type);
            player.setAttribute("src", src);
            player.setAttribute("height", height);
            player.classList.remove("hidden");
        });
        // #endregion embedded audio players
    });
})();