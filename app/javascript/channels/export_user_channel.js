// import consumer from "./consumer"

// consumer.subscriptions.create("ExportUserChannel", {
//   connected() {
//     // Called when the subscription is ready for use on the server
//     console.log("hello")
//   },

//   disconnected() {
//     // Called when the subscription has been terminated by the server
//   },

//   received(data) {
//     // Called when there's incoming data on the websocket for this channel
//     console.log(data)
//     window.location.href = `/export_download.xlsx?id=${data}`
//   }
// });
