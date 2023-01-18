import React from 'react';
import styles from './CodeBlock.module.css';


interface ICodeBlockRequiredProps {
  content: string;
}

interface ICodeBlockOptionalProps {
  containerClass: string;
  fileNameClass: string;
  contentClass: string,
  fileName: string;
}

interface ICodeBlockProps
  extends ICodeBlockRequiredProps,
    ICodeBlockOptionalProps {}

const defaultProps: ICodeBlockOptionalProps = {
  containerClass: '',
  fileNameClass: '',
  contentClass: '',
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
      <div className={`${styles.stumpContentClass} ${props.contentClass}`}>
        <div className={styles.stumpCopyContainerClass}>
        </div>
        {props.content}
      </div>
    </div>
  )
}

CodeBlock.defaultProps = defaultProps
export default CodeBlock
