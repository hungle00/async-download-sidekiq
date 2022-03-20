import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["download", "status"];

  export() {
    fetch('/export_user')
      .then(response => response.json())
      .then(data => {
        const jobId = data.jid;
        this.statusTarget.textContent = "Exporting ...";

        this.timer = setInterval(() => {
          this.checkJobStatus(jobId)
        }, 1000);
      });
  }

  checkJobStatus(jobId) {
    fetch(`/export_status?job_id=${jobId}`)
      .then(response => response.json())
      .then(data => {
        const percentage = data.percentage;
        this.statusTarget.textContent = `Exporting ${percentage}%`;
        if(data.status == "error") {
            this.stopCheckJobStatus();
        }else if(data.status === "complete") {
          this.stopCheckJobStatus()
          this.downloadTarget.href = `/export_download.xlsx?id=${jobId}`;
          this.downloadTarget.classList.remove("hidden");
        }
      })
  }

  stopCheckJobStatus() {
    if(this.timer) {
      clearInterval(this.timer);
    }
  }

  disconnect() {
    this.stopCheckJobStatus();
  }
}
