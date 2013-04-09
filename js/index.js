var indexHandler = (function(){

    var probability = .01;

    var bgImage = Backbone.Model.extend({
    
    });

    var bgImageCollection = Backbone.Collection.extend({
        model: bgImage
        
    });

    var allImages = new bgImageCollection;
    var displayedImages = new bgImageCollection;
    
    var bgImageView = Backbone.View.extend({

        template: _.template('<div class="bgImage">' +
                 '<img src="<%= source %>" />' +
                 '</div>'
                  )
        
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
                    
                }
            })

            // on return, add all those images to the list of tweets
            // then, select random tweets and append each of t
        }

        , addImage: function(image){
            
            var newImage = new bgImageView({model: image});
            this.$el.append(newImage); 
        }
    });

    var bg = new background({el: $('#display-area')});

})();
