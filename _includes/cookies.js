(function() {
    const consentPropName = "cookies_consent";
    const storageType = localStorage;

    shouldShowCookieConsent = () => !storageType.getItem(consentPropName);
    acceptCookieConsent = () => storageType.setItem(consentPropName, true);
    window.addEventListener("load", () => {
        if(!shouldShowCookieConsent()) {
            return;
        }
        const cookieContainer = document.createElement("div");
        cookieContainer.classList.add("hidden");
        const cookieParagraph = document.createElement("p");
        const cookieContent = document.createTextNode("{{ site.data.metaData.cookies.message }}");
        const cookieAgreeButton = document.createElement("button");
        const cookieButtonContent = document.createTextNode("{{ site.data.metaData.cookies.agreeButtonText }}");
        cookieAgreeButton.appendChild(cookieButtonContent);
        cookieAgreeButton.onclick = () => {
            acceptCookieConsent();
            cookieContainer.classList.add("hidden");
            window.setTimeout(cookieContainer.remove.bind(cookieContainer), 1000);
        }
        cookieParagraph.append(cookieContent);
        cookieContainer.append(cookieParagraph, cookieAgreeButton);
        cookieContainer.classList.add("cookie-container")
        document.body.appendChild(cookieContainer);
        window.setTimeout(() => cookieContainer.classList.remove("hidden"));
    });
})();