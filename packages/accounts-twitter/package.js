Package.describe({
  summary: "Login service for Twitter accounts"
});

Package.on_use(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth-helper', ['client', 'server']);
  api.use('twitter', ['client', 'server']);

  api.add_files(['twitter_login_button.css'], 'client');

  api.add_files('twitter_common.js', ['client', 'server']);
  api.add_files('twitter_server.js', 'server');
  api.add_files('twitter_client.js', 'client');
});
