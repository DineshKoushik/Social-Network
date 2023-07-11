

module.exports.register = function(plugin, options, next) {
    plugin.route([
        {
            method: "GET",
            path: "/home",
            handler: function(request, reply) {
                reply.view("home");
            }
        }
    ])
    next();
}

module.exports.register.attributes = {
    pkg: require("./package.json")
}