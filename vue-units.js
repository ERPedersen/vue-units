module.exports = {
    install: function (Vue, options) {

        var units = options && options.units ? options.units : require('convert-units');

        Object.defineProperties(Vue.prototype, {
            $units: {
                get: function () {
                    return units;
                }
            }
        });

        Vue.units = units;

        Vue.filter('units', function (value, from, to) {
            return units(value).from(from).to(to);
        });

    }
};