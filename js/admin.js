var adminHandler = (function(){
		var adminTweets = new TweetsCollection;
		var approvedTweets = new TweetsCollection;

		var AdminTweet = Backbone.View.extend({
				template: _.template('<div class="tweet">' +
														 '<div class="left-image pull-left">' +
														 '<img src="<%= image %> ">' +
														 '</div>' +
														 '<div class="individual-tweet pull-left">' +
														 '<div class="user"> <%= from %> </div>' +
														 '<div class="tweet-content"><%= text %></div>' +
														 '</div>' +
														 '<div class="approve-tweet pull-right">' +
														 '<button class="btn btn-success approve-btn">Approve</button>' +
														 '</div>' +
														 '</div>'),

				events:{
						'click button.approve-btn': "approveTweet"
				},

				approveTweet: function(){
						adminTweets.remove(this.model);
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
														 '<div class="user"> <%= from %> </div>' +
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
				el: $('#tweets-content'),

				initialize: function(){
						adminTweets.bind('add', this.addTweet);
						//adminTweets.bind('reset', resetView, this);
				},

				addTweet: function(tweet){
						console.log('does this get called???');
						var newView = new AdminTweet({model: tweet});
 						$(newView.render().el).hide().prepend(this.$el).fadeIn('slow');
				}
		});

		var adminView = new AdminList;

		return {		
				addTweet: function(tweet){
						adminTweets.add(tweet);
				}
		};
})();



