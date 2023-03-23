import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["download", "progress", "progressWrapper"];

  export() {
    fetch('/export_user')
      .then(response => response.json())
      .then(data => {
        const jobId = data.jid;
        this.progressWrapperTarget.classList.remove("display-none");

        this.timer = setInterval(() => {
          this.checkJobStatus(jobId)
        }, 1000);
      });
  }

  checkJobStatus(jobId) {
    fetch(`/export_status?job_id=${jobId}`)
      .then(response => response.json())
      .then(data => {
        const progress = data.percentage;
        this.progressTarget.style.width = `${progress}%`;
        if(data.status == "error") {
            this.stopCheckJobStatus();
        }else if(data.status === "complete") {
          this.stopCheckJobStatus()
          this.downloadTarget.href = `/export_download.xlsx?id=${jobId}`;
          this.downloadTarget.classList.remove("display-none");
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
