import { apiUrl } from "./data";

const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function subscribePushNotifications(userId) {
  navigator.serviceWorker.ready.then(registration => {
    const applicationServerKey = urlB64ToUint8Array(
      "BMK8jBPX7P3Ck7iX5hx2r2oGIk1j8qW2iSXCNs1a8RrrWv-y5ndVw3FuoX34TcR4t6DTnzehJy3UA82fWwojsdM"
    );

    const options = { applicationServerKey, userVisibleOnly: true };

    registration.pushManager.subscribe(options).then(subscription => {
      console.log(subscription, "hi");
      fetch(`${apiUrl}/push-notifcation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          keys: {
            auth: btoa(
              String.fromCharCode.apply(null, new Uint8Array(subscription.getKey("auth")))
            ),
            p256dh: btoa(
              String.fromCharCode.apply(null, new Uint8Array(subscription.getKey("p256dh")))
            ) // https://stackoverflow.com/questions/36230214/keys-property-doesnt-exist-on-my-pushregistration-object
          },
          userId
        })
      })
        .then(res => res.json())
        .then(_ => console.log("Subscribed to push notifcations"))
        .catch(e => console.log("Didnt subscribe, error"));
    });
  });
}
