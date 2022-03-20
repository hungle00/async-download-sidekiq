redis_url = "redis://localhost:6379/1"

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url }
  Sidekiq::Status.configure_server_middleware config
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis_url }
  Sidekiq::Status.configure_server_middleware config
end