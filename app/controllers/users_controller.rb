class UsersController < ApplicationController
  def index
  end

  def export
    @jid = ExportUserJob.perform_async
    respond_to do |format|
      format.turbo_stream
    end
  end

  def export_download
    job_id = params[:id]
    exported_file_name = "users_export_#{job_id}.xlsx"
    filename = "UserData_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}.xlsx"

    respond_to do |format|
      format.xlsx do
        send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
      end
    end
  end
end
