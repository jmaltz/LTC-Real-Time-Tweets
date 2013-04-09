var tweet = Backbone.Model.extend({
		defaults: {
				id: 0,
				text: 'error',
				username: 'undefined',
				image: 'undefined'
		},
		initialize: function(){
				if(!this.get('id')){
						this.set({'id': defaults.id});
				}
				if(!this.get('text')){
						this.set({'tweet': defaults.tweet});
				}
				if(!this.get('username')){
						this.set({'username': defaults.username});
				}
				if(!this.get('image')){
						this.set({'image': defaults.image});
				}
		}
});

var TweetsCollection = Backbone.Collection.extend({
		model: tweet
});
