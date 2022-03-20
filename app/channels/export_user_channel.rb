class ExportUserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "export_user"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
