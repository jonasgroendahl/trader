self.addEventListener("push", function(event) {
  if (event.data) {
    const options = {
      body: "Crazy stuff"
      // here you can add more properties like icon, image, vibrate, etc.
    };
    self.registration.showNotification(event.data.text(), options);
  } else {
    console.log("Push event but no data");
  }
});
