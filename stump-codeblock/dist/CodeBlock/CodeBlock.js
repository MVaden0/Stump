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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './CodeBlock.module.css';
import { FileName } from '../FileName/FileName';
import { Parser, jsParseCFG } from '../Parser/Parser';
// default props for the CodeBlock component.
var defaultProps = {
    containerClass: '',
    fileNameClass: '',
    contentClass: '',
    fileName: '',
    CFGConfig: jsParseCFG
};
/**
 * Renders a CodeBlock component.
 * @param props props for component
 * @returns the CodeBlock component
 */
export var CodeBlock = function (props) {
    var _a = useState(false), copyButtonClicked = _a[0], setCopyButtonClicked = _a[1];
    var parser = new Parser({ text: props.content, CFGConfig: props.CFGConfig });
    /**
     * Manages clipboard and animation functionality of copy button.
     */
    var copyButtonOnClick = function () {
        navigator.clipboard.writeText(props.content);
        // toggle copy button
        if (!copyButtonClicked) {
            setCopyButtonClicked(true);
            setTimeout(function () {
                setCopyButtonClicked(false);
            }, 1500);
        }
    };
    return (_jsxs("div", __assign({ className: "".concat('stumpContainerClass', " ").concat(props.containerClass) }, { children: [_jsx(FileName, { fileName: props.fileName, className: "".concat('stumpFileNameClass', " ").concat(props.fileNameClass) }), _jsxs("div", __assign({ className: 'stumpContentWrapperClass' }, { children: [_jsx("div", __assign({ className: "".concat('stumpContentClass', " ").concat(props.contentClass) }, { children: parser.render() })), _jsx("div", __assign({ className: 'stumpCopyContainerClass' }, { children: _jsxs("svg", __assign({ onClick: copyButtonOnClick, className: "".concat('stumpCopyButton', " ").concat(copyButtonClicked ? 'stumpCopyButtonAnimationSVG' : ''), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, { children: [_jsx("path", { className: "".concat('stumpCopyButtonPath1', " ").concat(copyButtonClicked ? 'stumpCopyButtonAnimation1' : '') }), _jsx("path", { className: "".concat('stumpCopyButtonPath2', " ").concat(copyButtonClicked ? 'stumpCopyButtonAnimation2' : '') })] })) }))] }))] })));
};
CodeBlock.defaultProps = defaultProps;
