import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static targets = ["status"];

  export() {
    fetch('/export_user')
      .then(() => {
        this.statusTarget.textContent = "Exporting ...";
        this.subscribe_channel(this.downloadTarget)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  subscribe_channel() {
    this.channel = consumer.subscriptions.create("ExportUserChannel", {
      connected() {
        console.log("hello")
      },
    
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
    
      received(data) {
        console.log(data)
        window.location.href = `/export_download.xlsx?id=${data}`
      }
    });
  }
}
