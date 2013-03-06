
Tinytest.add("oauth1 - loginResultForState is stored", function (test) {
  var http = __meteor_bootstrap__.require('http');
  var twitterfooId = Random.id();
  var twitterfooName = 'nickname' + Random.id();
  var twitterfooAccessToken = Random.id();
  var twitterfooAccessTokenSecret = Random.id();
  var state = Random.id();

  OAuth1Binding.prototype.prepareRequestToken = function() {};
  OAuth1Binding.prototype.prepareAccessToken = function() {
    this.accessToken = twitterfooAccessToken;
    this.accessTokenSecret = twitterfooAccessTokenSecret;
  };

  if (!ServiceConfiguration.configurations.findOne({service: 'twitterfoo'}))
    ServiceConfiguration.configurations.insert({service: 'twitterfoo'});
  Accounts.twitterfoo = {};

  try {
    // register a fake login service - twitterfoo
    Oauth.registerService("twitterfoo", 1, function (query) {
      return {
        serviceData: {
          id: twitterfooId,
          screenName: twitterfooName,
          accessToken: twitterfooAccessToken,
          accessTokenSecret: twitterfooAccessTokenSecret
        }
      };
    });

    // simulate logging in using twitterfoo
    Oauth1._requestTokens[state] = twitterfooAccessToken;

    var req = {
      method: "POST",
      url: "/_oauth/twitterfoo?close",
      query: {
        state: state,
        oauth_token: twitterfooAccessToken
      }
    };
    Oauth._middleware(req, new http.ServerResponse(req));

    // XXXTim These tests belong back in accounts
    // // verify that a user is created
    // var user = Meteor.users.findOne(
    //   {"services.twitterfoo.screenName": twitterfooName});
    // test.notEqual(user, undefined);
    // test.equal(user.services.twitterfoo.accessToken,
    //            twitterfooAccessToken);
    // test.equal(user.services.twitterfoo.accessTokenSecret,
    //            twitterfooAccessTokenSecret);

    // // and that that user has a login token
    // test.equal(user.services.resume.loginTokens.length, 1);
    // var token = user.services.resume.loginTokens[0].token;
    // test.notEqual(token, undefined);

    // and that the login result for that user is prepared
    // test.equal(
    //   Oauth._loginResultForState[state].id, user._id);
    // test.equal(
    //   Oauth._loginResultForState[state].token, token);

    // Verify that the Oauth Login Result has the right service data
    test.equal(
      Oauth._loginResultForState[state].service, "twitterfoo");

    test.equal(
      Oauth._loginResultForState[state].serviceData.id, twitterfooId);

    test.equal(
      Oauth._loginResultForState[state].serviceData.accessToken, twitterfooAccessToken);

    test.equal(
      Oauth._loginResultForState[state].serviceData.accessTokenSecret, twitterfooAccessTokenSecret);


  } finally {
    delete Oauth._services.twitterfoo;
  }
});


//  XXXTIM This test's and account failure
// Tinytest.add("oauth1 - error in user creation", function (test) {
//   var http = __meteor_bootstrap__.require('http');
//   var state = Random.id();
//   var twitterfailId = Random.id();
//   var twitterfailName = 'nickname' + Random.id();
//   var twitterfailAccessToken = Random.id();
//   var twitterfailAccessTokenSecret = Random.id();

//   if (!ServiceConfiguration.configurations.findOne({service: 'twitterfail'}))
//     ServiceConfiguration.configurations.insert({service: 'twitterfail'});
//   Accounts.twitterfail = {};

//   // Wire up access token so that verification passes
//   Oauth1._requestTokens[state] = twitterfailAccessToken;

//   try {
//     // register a failing login service
//     Oauth.registerService("twitterfail", 1, function (query) {
//       return {
//         serviceData: {
//           id: twitterfailId,
//           screenName: twitterfailName,
//           accessToken: twitterfailAccessToken,
//           accessTokenSecret: twitterfailAccessTokenSecret
//         },
//         options: {
//           profile: {invalid: true}
//         }
//       };
//     });

//     // a way to fail new users. duplicated from passwords_tests, but
//     // shouldn't hurt.
//     Accounts.validateNewUser(function (user) {
//       return !(user.profile && user.profile.invalid);
//     });

//     // simulate logging in with failure
//     Meteor._suppress_log(1);
//     var req = {
//       method: "POST",
//       url: "/_oauth/twitterfail?close",
//       query: {
//         state: state,
//         oauth_token: twitterfailAccessToken
//       }
//     };

//     Oauth._middleware(req, new http.ServerResponse(req));

//     // verify that a user is not created
//     var user = Meteor.users.findOne({"services.twitter.screenName": twitterfailName});
//     test.equal(user, undefined);

//     // verify an error is stored in login state
//     test.equal(Oauth._loginResultForState[state].error, 403);

//     // verify error is handed back to login method.
//     test.throws(function () {
//       Meteor.apply('login', [{oauth: {version: 1, state: state}}]);
//     });
//   } finally {
//     delete Oauth._services.twitterfail;
//   }
// });


