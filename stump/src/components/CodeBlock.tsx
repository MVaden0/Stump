import React from 'react';
import styles from './CodeBlock.module.css';


interface ICodeBlockRequiredProps {
  text: string;
}

interface ICodeBlockOptionalProps {
  containerClass: string;
}

interface ICodeBlockProps
  extends ICodeBlockRequiredProps,
    ICodeBlockOptionalProps {}

const defaultProps: ICodeBlockOptionalProps = {
    containerClass: styles.stumpContainerClass,
}

const CodeBlock = (props: ICodeBlockProps) => {
    return (
        <div className={props.containerClass}>
            
        </div>
      )
}

CodeBlock.defaultProps = defaultProps
export default CodeBlock
