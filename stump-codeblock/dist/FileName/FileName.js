var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Conditionally renders a FileName component.
 * @param props props for component
 * @returns the FileName component
 */
export var FileName = function (props) {
    if (props.fileName) {
        return (_jsx("div", __assign({ className: props.className }, { children: props.fileName })));
    }
    else {
        return _jsx(_Fragment, {});
    }
};
