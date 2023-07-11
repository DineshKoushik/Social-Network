const Hapi = require("hapi");
const server = new Hapi.Server();
const mongoose = require("mongoose");
const User = require("./database_models/user_model");
const node_connect_db = mongoose.connect("mongodb://127.0.0.1/node_connect");

server.connection({port: 3000});
server.start();

server.route({
    method: "GET",
    path: "/",
    handler: function(request, reply) {
        reply.view("landing");
    }
});

server.register(require("vision"), function(err){
    server.views({
        engines: {
            ejs: require("ejs")
        },
        relativeTo: __dirname,
        path: "views"
    })
});

server.register(require("inert"), function(err){

});

// server.register(require("hapi-auth-cookie"));
// server.auth.strategy("simple-cookie-strategy", "cookie", {
//     cookie: "node_connect_cookie",
//     password: "abcdefghabcdefghabcdefghabcdefgh",
//     isSecure: false
// });

server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: "public"
        }
    }
});

server.register({
    register: require("./routes/user"), 
    function(err) {
        if (err) {
            return;
        }
    }
})

server.register({
    register: require("./routes/home"), 
    function(err) {
        if (err) {
            return;
        }
    }
})