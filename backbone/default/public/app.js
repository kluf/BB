_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}

var Comment = Backbone.Model.extend({});
var Comments = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.post = options.post;
    },
    url: function() {
        return this.post.url() + '/comments';
    }
});

var Post = Backbone.Model.extend({
    initialize: function() {
        this.comments = new Comments([], {post: this});
    }
});

var Posts = Backbone.Collection.extend({
    model: Post,
    url: '/posts'
});


var CommentView = Backbone.View.extend({
    template: _.template($('#commentView').html()),
    render: function() {
        this.model.date = new Date(Date.parse(this.model.date)).toDateString();
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var CommentFormView = Backbone.View.extend({
    tagName: 'form',
    initialize: function(options) {
        this.post = options.post;
    },
    template: _.template($("#commentFormView").html()),
    events: {
        'click button': 'submitComment'
    },
    render: function() {
        this.el.innerHTML = this.template();
        return this;
    },
    submitComment: function(e) {
        e.preventDefault();
        var name = this.$('#cmtName').val();
        var text = this.$('#cmtText').val();
        console.log(this.post);
        var commentAttrs = {
            postId: this.post.get('id'),
            name: name,
            text: text,
            date: new Date()
        };
        this.post.comments.create(commentAttrs);
        this.el.reset();
    }
});

var CommentsView = Backbone.View.extend({
    initialize: function(options) {
        this.post = options.post;
        this.post.comments.on('add', this.addComment, this);
    },
    addComment: function(comment) {
        this.$el.append(new CommentView({
            model: comment
        }).render().el);
    },
    render: function() {
        // console.log(this.post.toJSON());
        this.$el.append('<h2> Comments </h2>');
        this.$el.append(new CommentFormView({
            post: this.post
        }).render().el);
        this.post.comments.fetch();
        return this;
    }
});


var PostListView = Backbone.View.extend({
    tagName: 'li',
    template: _.template("<a href='/posts/{{id}}'>{{title}}</a>"),
    render: function() {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    },
    events: {
        'click a': 'handleClick'
    },
    handleClick: function(e) {
        e.preventDefault();
        postRouter.navigate($(e.currentTarget).attr('href'), {trigger: true});
    }
});

var PostsListView = Backbone.View.extend({
    template: _.template("<h1>List</h1><ul></ul>"),
    render: function() {
        this.el.innerHTML = this.template();
        var ul = this.$el.find("ul");
        this.collection.forEach(function(post) {
            ul.append(new PostListView({
                model: post
            }).render().el);
        });
        return this;
    }
});

var PostView = Backbone.View.extend({
    template: _.template(this.$('#postView').html()),
    events: {
        'click a': 'handleClick'
    },
    render: function() {
        var model = this.model.toJSON();
        model.pubDate = new Date(Date.parse(model.pubDate)).toDateString();
        this.el.innerHTML = this.template(model);
        return this;
    },
    handleClick: function(e) {
        e.preventDefault();
        postRouter.navigate($(e.currentTarget).attr('href'), {trigger: true});
        return false;
    }
});

var PostFormView = Backbone.View.extend({
    tagName: 'form',
    template: _.template($('#postFormView').html()),
    initialize: function(options) {
        this.posts = options.posts
    },
    events: {
        'click button': 'createPost'
    },
    render: function() {
        this.el.innerHTML = this.template();
        return this;
    },
    createPost: function(e) {
        e.preventDefault();
        var postAttrs = {
            content: $("#postText").val(),
            title: $('#postTitle').val(),
            pubDate: new Date()
        };
        this.posts.create(postAttrs);
        postRouter.navigate('/', {trigger: true});
        return false;
    }
});

var PostRouter = Backbone.Router.extend({
    initialize: function(options) {
        this.posts = options.posts;
        this.main = options.main;
    },
    routes: {
        '': 'index',
        'posts/:id/comments': 'commentView',
        'posts/new': 'newPost',
        'posts/:id': 'singlePost',
    },
    index: function() {
        var pv = new PostsListView({collection: this.posts});
        this.main.html(pv.render().el);
    },
    singlePost: function(id) {
        var post = this.posts.get(id);
        var pv = new PostView({model: post});
        var cv = new CommentsView({post: post});
        this.main.html(pv.render().el);
        this.main.append(cv.render().el);
    },
    newPost: function() {
        var pfv = new PostFormView({posts: this.posts});
        this.main.html(pfv.render().el);
    },
});