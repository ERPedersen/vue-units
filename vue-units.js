(function () {

    /**
     * Install plugin
     * @param Vue
     * @param options
     */

    function plugin(Vue, options) {

        /*
         * Check if plugin is already installed
         */
        if (plugin.installed) {
            console.warn('It seems like you\'re trying to install vue-units twice.')
            return;
        }
        plugin.installed = true;

        /*
         * Override the convert-units plugin, if another is defined
         */
        var units = options && options.units ? options.units : require('convert-units');

        /*
         * Make the instance of convert-units available on the vue instance
         * using this.$units.
         */
        Object.defineProperties(Vue.prototype, {
            $units: {
                get: function () {
                    return units;
                }
            }
        });

        /*
         * Make the instance of convert units available on the global
         * Vue instance.
         */
        Vue.units = units;

        /*
         * Add a simple filter for converting units
         */
        Vue.filter('units', function (value, from, to) {
            try {
                return units(value).from(from).to(to);
            } catch (err) {
                // Prevent Vue from crashing if incorrect metrics are provided
                // and simply return the original value instead.
                console.error(err);
                return value;
            }
        });
    }

    if (typeof exports == "object") {
        module.exports = plugin
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return plugin })
    } else if (window.Vue) {
        Vue.use(plugin)
    }

})();