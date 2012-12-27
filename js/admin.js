var adminHandler = (function(){
		var adminTweets = new TweetsCollection;
		var approvedTweets = new TweetsCollection;
		var currentHashtag = "";


		var AdminTweet = Backbone.View.extend({
				template: _.template('<div class="tweet">' +
					'<div class="left-image pull-left">' +
					'<img src="<%= image %> ">' +
					'</div>' +
					'<div class="individual-tweet pull-left">' +
					'<div class="user"> <%= username %> </div>' +
					'<div class="tweet-content"><%= text %></div>' +
					'</div>' +
					'<div class="approve-tweet pull-right">' +
					'<button class="btn btn-success approve-btn">Approve</button>' +
					'</div>' +
					'</div>'),

				events: {
					'click .approve-btn': 'approveTweet'
				},

				approveTweet: function(){
					
					adminTweets.remove(this.model);
					
					var approvedObj = {};
					approvedObj.hashtag = adminHandler.currentHashtag;

					console.log('hashtag is ' + adminHandler.currentHashtag);

					approvedObj.tweet = this.model;
					
					socket.emit('approve', approvedObj);
					approvedTweets.add(this.model);
					this.remove();
				},

				render: function(){
					
					var templated = this.template(this.model.toJSON());
					this.$el.html(templated);
					return this;
				}
		});

		var ApprovedTweet = Backbone.View.extend({
				template: _.template('<div class="tweet">' +
					 '<div class="left-image pull-left">' +
					 '<img src="<%= image %> ">' +
					 '</div>' +
					 '<div class="individual-tweet pull-left">' +
					 '<div class="user"> <%= username %> </div>' +
					 '<div class="tweet-content"><%= text %></div>' +
					 '</div>' +
					 '</div>'),

				render: function(){
					var templated = this.template(this.model.toJSON());
					this.$el.html(templated);
					return this;
				}							
		});

		
		var AdminList = Backbone.View.extend({

				initialize: function(){
					adminTweets.bind('add', this.addTweet, this);
				},

				addTweet: function(tweet){
					var newView = new AdminTweet({model: tweet});
					$(newView.render().$el).prependTo(this.$el).fadeIn('slow');
				}
		});

		var ApprovedList = Backbone.View.extend({
				
				initialize: function(){
					approvedTweets.bind('add', this.addTweet, this);
				},

				addTweet: function(tweet){
					var newView = new ApprovedTweet({model: tweet});
					$(newView.render().$el).prependTo(this.$el).fadeIn('slow');
				}
		});

		var adminView = new AdminList({el: $('#tweets-content')});
		var approvedView = new ApprovedList({el: $('#approved-tweets-content')});

		return {		
				addTweet: function(tweet){
					adminTweets.add(tweet);
				},

				addTweetList: function(tweets){
					var tweets = tweets['new-tweets'];
		
					try {
						tweets = JSON.parse(tweets);
					} catch(error) {
						console.log("JSON Error");
						tweets = [];
					}
					
					for(var i = 0; i < tweets.length; i++) {
							this.addTweet(tweets[i]);
					}
				},

				addApproved: function(tweet){
					approvedTweets.add(tweet);
				},

				addApprovedList: function(tweets){
					for(var i = 0; i<tweets.length; i++){
							this.addApproved(tweets[i]);
					}
				},

				setHashtag: function(hashtag){
					this.currentHashtag = hashtag;
				},
				
				getHashtag: function(){
					return this.currentHashtag;
				}
				
		};
})();



