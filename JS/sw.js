self.addEventListener("install", () => {
    console.log("Service Worker Installed");
});

self.addEventListener("fetch", () => { });


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}