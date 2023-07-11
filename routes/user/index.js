const User = require("../../database_models/user_model");



module.exports.register = function(server, options, next) {
    server.route([
        {
            method: "POST",
            path: "/sign_up",
            handler: function(request, reply) {
                User.findOne({"email": request.payload.email}, function(err, existing_user) {
                    if (existing_user) {
                        reply("This email has already been registered. Try again with another email.").code(400);
                    } else {
                        var user = new User({"email": request.payload.email, "name": request.payload.name, "password": request.payload.password});
                        user.save(function(err, saved_user_record) {
                            if (err) {
                                reply("Error during signing up.").code(400);
                            } else {
                                reply("Signed up successfully.");
                            }
                        })
                    }
                })
            }
        },
        {
            method: "POST",
            path: "/login",
            handler: function(request, reply) {
                User.findOne({"email": request.payload.email, "password": request.payload.password}, function(err, valid_user) {
                    if (valid_user) {
                        request.cookieAuth.set({"user": valid_user.email, "name": valid_user.name, "member_id": valid_user.member_id});
                        reply();
                    }
                })
            }
        }
    ])
    next();
}

module.exports.register.attributes = {
    pkg: require('./package.json') 
}