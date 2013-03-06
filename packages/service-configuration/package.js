Package.describe({
  summary: "Manage the configuration for third-party services"
});

Package.on_use(function(api) {

  // api.add_files(
  //   ['twitter_login_button.css'],
  //   'client');

  api.add_files('service_configuration_common.js', ['client', 'server']);
  // api.add_files('twitter_server.js', 'server');
  // api.add_files('twitter_client.js', 'client');
});
