import React from 'react';
import styles from './CodeBlock.module.css';


interface ICodeBlockRequiredProps {
  text: string;
}

interface ICodeBlockOptionalProps {
  containerClass: string;
  fileNameClass: string;
  fileName: string;
}

interface ICodeBlockProps
  extends ICodeBlockRequiredProps,
    ICodeBlockOptionalProps {}

const defaultProps: ICodeBlockOptionalProps = {
  containerClass: '',
  fileNameClass: '',
  fileName: ''
}

const FileName = (fileName: string, className: string) => {
  return (
    <div className={className}>
      {fileName}
    </div>
  )
}

const CodeBlock = (props: ICodeBlockProps) => {
  return (
    <div 
      className={`${styles.stumpContainerClass} ${props.containerClass}`}
    >
      {props.fileName ? FileName(props.fileName, `${styles.stumpFileNameClass} ${props.fileNameClass}`) : ''}
    </div>
  )
}

CodeBlock.defaultProps = defaultProps
export default CodeBlock
