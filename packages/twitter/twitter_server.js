(function () {

  Oauth.registerService('twitter', 1, Twitter._urls, function(oauthBinding) {
    var identity = oauthBinding.get('https://api.twitter.com/1.1/account/verify_credentials.json').data;

    return {
      serviceData: {
        id: identity.id_str,
        screenName: identity.screen_name,
        accessToken: oauthBinding.accessToken,
        accessTokenSecret: oauthBinding.accessTokenSecret
      },
      options: {
        profile: {
          name: identity.name
        }
      }
    };
  });
}) ();
