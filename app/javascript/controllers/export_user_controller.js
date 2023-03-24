import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static targets = ["progress", "progressWrapper"];

  export() {
    fetch('/export_user')
      .then(() => {
        this.progressWrapperTarget.classList.remove("display-none");
        this.subscribe_channel(this.progressTarget)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  subscribe_channel(progressTarget) {
    this.channel = consumer.subscriptions.create("ExportUserChannel", {
      connected() {
        console.log("hello")
      },
    
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
    
      received(data) {
        if (data["jid"] == null) {
          progressTarget.style.width = `${data["progress"]}%`;
        } else {
          window.location.href = `/export_download.xlsx?id=${data["jid"]}`
        }
      }
    });
  }
}
