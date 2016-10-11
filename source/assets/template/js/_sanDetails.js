var replaceHtmlEntites = (function() {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g,
        translate = {
            'nbsp': String.fromCharCode(160),
            'amp': '&',
            'quot': '"',
            'lt': '<',
            'gt': '>'
        },
        translator = function($0, $1) {
            return translate[$1];
        };

    return function(s) {
        return s.replace(translate_re, translator);
    };
})();