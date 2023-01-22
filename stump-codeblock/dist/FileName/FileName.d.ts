/// <reference types="react" />
/**
 * Interface that defines the props for the FileName component.
 */
interface IFileName {
    fileName: string;
    className: string;
}
/**
 * Conditionally renders a FileName component.
 * @param props props for component
 * @returns the FileName component
 */
export declare const FileName: (props: IFileName) => JSX.Element;
export {};
