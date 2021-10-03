(function () {
    window.toggleExpander = function toggleExpander(x) {
        const menu = document.getElementsByClassName("menu")[0];
        const navigation = document.getElementsByClassName("navigation")[0];
        if (menu.classList.contains('expanded--visible')) {
            menu.classList.toggle('expanded--visible');
            navigation.addEventListener('transitionend', function(e) {
                menu.classList.toggle("expanded");
              }, {
                capture: false,
                once: true,
                passive: false
              });
        } else {
            menu.classList.toggle("expanded");
            setTimeout(() => menu.classList.toggle('expanded--visible'), 20);
        }
    };
    window.addEventListener("load", () => {
        // #region click to enlarge images 
        const imageWrappers = document.querySelectorAll(".click-to-enlarge");
        imageWrappers.forEach(imageWrapper => {
            {% if site.data.metaData.clickToEnlargeImages %}
            imageWrapper.addEventListener("click", () => {
                const img = imageWrapper.getElementsByTagName("img")[0];
                const src = img.attributes.getNamedItem("src");
                const modal = document.createElement("div");
                const removeModal = function() {
                    modal.classList.add("hidden");
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 200);
                };
                const newImage = document.createElement("img");
                newImage.classList.add("modal__picture-zoomed--image");
                newImage.setAttribute("src", src.value);
                modal.classList.add("modal__picture-zoomed", "hidden");
                // modal.style.backgroundImage = `URL("${src.value}")`;
                modal.addEventListener("click", removeModal);
                modal.append(newImage);
                document.body.append(modal);
                document.body.addEventListener("keyup", e => {
                    if (e.key === 'Escape') {
                        removeModal();
                    }
                }, {once : true});
                setTimeout(() => {
                    modal.classList.remove("hidden");
                }, 0);
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
                case "spotifyalbum":
                    return rt(`https://open.spotify.com/embed/album/${src}`, 80);
                case "spotifyplaylist":
                    return rt(`https://open.spotify.com/embed/playlist/${src}`, 80);
                case "spotifyepisode":
                    return rt(`https://open.spotify.com/embed/episode/${src}`, 152);
                case "spotifyshow":
                    return rt(`https://open.spotify.com/embed/show/${src}`, 152);
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