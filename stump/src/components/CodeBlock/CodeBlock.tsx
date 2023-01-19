import React, { useState } from 'react';
import styles from './CodeBlock.module.css';

const jsParseMap = {
  'delimeter': {
    'symbol': [' ', '.', '{', '}'],
    'color': '#fede5d'
  },
  'keyword': {
    'symbol': ['self'],
    'color': '#fede5d'
  },
}

const parseContent = (content: string) => {
  let parsedContent: JSX.Element[] = []

  // parse through content until a delimeter is reached
  let delimeterFound: boolean = false

  let i: number = 0

  while(!delimeterFound) {
    if (jsParseMap.delimeter.symbol.includes(content.substring(i, i + 1))) {
      let symbol = content.substring(0, i)
      
      if (jsParseMap.keyword.symbol.includes(symbol)) {
        parsedContent.push(
          <span style={{color: jsParseMap.keyword.color}}>{content.substring(0, i)}</span>
        )
      }

      delimeterFound = true
      
    } else {
      i += 1
    }
  }

  return parsedContent
}












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

const fileName = (fileName: string, className: string) => {
  return (
    <div className={className}>
      {fileName}
    </div>
  )
}

const CodeBlock = (props: ICodeBlockProps) => {
  const [copyButtonClicked, setCopyButtonClicked] = useState(false)

  const copyButtonOnClick = () => {
    navigator.clipboard.writeText(props.content)

    // toggle copy button
    if (!copyButtonClicked) {
      setCopyButtonClicked(true)
      setTimeout(() => {
        setCopyButtonClicked(false)
      }, 1500)
    }
  }

  return (
    <div 
      className={`${styles.stumpContainerClass} ${props.containerClass}`}
    >
      {props.fileName ? fileName(props.fileName, `${styles.stumpFileNameClass} ${props.fileNameClass}`) : ''}
      <div className={styles.stumpContentWrapperClass}>
        <div className={`${styles.stumpContentClass} ${props.contentClass}`}>
          {parseContent(props.content)}
        </div>
        <div className={styles.stumpCopyContainerClass}>
          <svg 
            onClick={copyButtonOnClick} 
            className={`${styles.stumpCopyButton} ${copyButtonClicked ? styles.stumpCopyButtonAnimationSVG : ''}`} 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
          >
            <path className={`${styles.stumpCopyButtonPath1} ${copyButtonClicked ? styles.stumpCopyButtonAnimation1 : ''}`}/>
            <path className={`${styles.stumpCopyButtonPath2} ${copyButtonClicked ? styles.stumpCopyButtonAnimation2 : ''}`}/>
          </svg>
        </div>
      </div>
    </div>
  )
}

CodeBlock.defaultProps = defaultProps
export default CodeBlock
