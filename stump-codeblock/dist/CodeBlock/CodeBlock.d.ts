/// <reference types="react" />
import './CodeBlock.module.css';
import { ICFGConfig } from '../Parser/Parser';
/**
 * Interface that defines the required props for the CodeBlock component.
 */
interface ICodeBlockRequiredProps {
    content: string;
}
/**
 * Interface that defines the optional props for the CodeBlock component.
 */
interface ICodeBlockOptionalProps {
    containerClass: string;
    fileNameClass: string;
    contentClass: string;
    fileName: string;
    CFGConfig: ICFGConfig;
}
/**
 * Interface that defines the required and optional props for the CodeBlock component.
 */
interface ICodeBlockProps extends ICodeBlockRequiredProps, ICodeBlockOptionalProps {
}
/**
 * Renders a CodeBlock component.
 * @param props props for component
 * @returns the CodeBlock component
 */
export declare const CodeBlock: {
    (props: ICodeBlockProps): JSX.Element;
    defaultProps: ICodeBlockOptionalProps;
};
export {};
