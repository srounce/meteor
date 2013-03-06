(function () {
  Meteor.loginWithTwitter = function(options, callback) {
    Twitter.loginWithTwitter(options, callback, Accounts.oauth.tryLoginAfterPopupClosed);
  };
})();

