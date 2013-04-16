$(function(){

    var probability = .01;

    var bgImage = Backbone.Model.extend({
    
    });

    var bgImageCollection = Backbone.Collection.extend({
        model: bgImage
        
    });

    var allImages = new bgImageCollection;
    var displayedImages = new bgImageCollection;
    
    var bgImageView = Backbone.View.extend({

        tagName: 'span'


        , template: _.template('<img src="<%= source %>" />')
        
        , render: function(){

            var templated = this.template(this.model.toJSON());
            this.$el.html(templated);
            return this;
        }

        , initialize : function(){
            
            this.model.bind('change', this.render, this);
        }
    });

    var background = Backbone.View.extend({
    
        initialize: function(){

            console.log('initialize all up in that shit!!');
            
            displayedImages.bind('add', this.addImage, this);

            // get the part of the location trailing the slash
            var hashtag = window.location.pathname.match(/\/[a-zA-Z]*$/)[0];
            hashtag = hashtag.substring(1);

            $.ajax({
                url: '/tweets?hashtag=' 
                    + hashtag 
                , success: function(data){
                    var results = data.results;
                    for(var i = 0; i < results.length; i++){
                        var result = results[i];
                        displayedImages.add({
                            'source': result['profile_image_url']
                        });
                        allImages.add(results[i]);
                    }

                }
            })

            // on return, add all those images to the list of tweets
            // then, select random tweets and append each of t
        }

        , addImage: function(image){

            var newImage = new bgImageView({model: image});
            console.log(newImage.render().el);
            this.$el.append(newImage.render().el); 
        }
    });

    var bg = new background({el: $('#display-area')});

});
