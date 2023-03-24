class ExportUserJob
  include Sidekiq::Job

  def perform(*args)
    users = User.pluck :id, :name, :email, :address, :phone
    total = users.size
    # Tạo Axlsx package and workbook
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    
    # Thêm sheet với tên Users
    xlsx_workbook.add_worksheet(name: "Users") do |worksheet|
      worksheet.add_row %w(ID Name Email Address Phone)
      
      users.each.with_index(1) do |user, idx|
        worksheet.add_row user
        # Sleep 500ms for test
        ActionCable.server.broadcast "export_user", { progress: idx.to_f / total * 100 } if idx %  5 == 0
        sleep 0.1
      end
    end
    
    # Save file into tmp with suffix is jobId
    xlsx_package.serialize Rails.root.join("tmp", "users_export_#{self.jid}.xlsx")

    ActionCable.server.broadcast "export_user", { jid: self.jid }
  end
end
