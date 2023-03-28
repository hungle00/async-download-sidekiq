import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static targets = ["progress", "progressWrapper"];

  export() {
    this.progressWrapperTarget.classList.remove("display-none");
  }
}
