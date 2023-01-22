import React, { useState } from 'react'
import './CodeBlock.module.css'

import { FileName } from '../FileName/FileName'
import { Parser, jsParseCFG, ICFGConfig} from '../Parser/Parser'


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
  contentClass: string,
  fileName: string;
  CFGConfig: ICFGConfig
}


/**
 * Interface that defines the required and optional props for the CodeBlock component.
 */
interface ICodeBlockProps
  extends ICodeBlockRequiredProps,
    ICodeBlockOptionalProps {}


// default props for the CodeBlock component.
const defaultProps: ICodeBlockOptionalProps = {
  containerClass: '',
  fileNameClass: '',
  contentClass: '',
  fileName: '',
  CFGConfig: jsParseCFG
}


/**
 * Renders a CodeBlock component.
 * @param props props for component
 * @returns the CodeBlock component
 */
export const CodeBlock = (props: ICodeBlockProps) => {
  const [copyButtonClicked, setCopyButtonClicked] = useState(false)

  let parser: Parser = new Parser({text: props.content, CFGConfig: props.CFGConfig})

  /**
   * Manages clipboard and animation functionality of copy button.
   */
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
      className={`${'stumpContainerClass'} ${props.containerClass}`}
    >
      <FileName
        fileName={props.fileName}
        className={`${'stumpFileNameClass'} ${props.fileNameClass}`}
      />
      <div className={'stumpContentWrapperClass'}>
        <div className={`${'stumpContentClass'} ${props.contentClass}`}>
          {parser.render()}
        </div>
        <div className={'stumpCopyContainerClass'}>
          <svg 
            onClick={copyButtonOnClick} 
            className={`${'stumpCopyButton'} ${copyButtonClicked ? 'stumpCopyButtonAnimationSVG' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
          >
            <path className={`${'stumpCopyButtonPath1'} ${copyButtonClicked ? 'stumpCopyButtonAnimation1' : ''}`}/>
            <path className={`${'stumpCopyButtonPath2'} ${copyButtonClicked ? 'stumpCopyButtonAnimation2' : ''}`}/>
          </svg>
        </div>
      </div>
    </div>
  )
}

CodeBlock.defaultProps = defaultProps