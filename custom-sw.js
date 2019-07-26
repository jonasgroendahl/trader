self.addEventListener("push", async function(event) {
  if (event.data) {
    const data = event.data.json();

    const title = data.title;
    const message = data.message;

    const options = {
      body: message
      // here you can add more properties like icon, image, vibrate, etc.
    };
    self.registration.showNotification(title, options);
  } else {
    console.log("Push event but no data");
  }
});
