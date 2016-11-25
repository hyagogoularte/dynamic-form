/**
 * @author Hyago Goularte
 * @created 22-Nov-2016
 *
 */

var ValidParamterObject = (function() {

    function getParameter() {

        var $_GET = {},
            args = location.search.substr(1).split(/&/);

        for (var i = 0; i < args.length; ++i) {
            var tmp = args[i].split(/=/);
            if (tmp[0] != "") {
                $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
            }
        }

        return $_GET;
    }

    function returnParam(value) {
        if (value['modal'] === null || value['modal'] === undefined) {
            return false;
        }

        return $.parseJSON(value['modal']);
    }

    return {
        getParameter: function() {
            return returnParam(getParameter());
        }
    }
});
