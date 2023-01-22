import React, { useState } from 'react';
import { isPropertySignature } from 'typescript';


/**
 * Interface that defines the props for the FileName component.
 */
interface IFileName {
  fileName: string,
  className: string
}


/**
 * Conditionally renders a FileName component.
 * @param props props for component
 * @returns the FileName component
 */
export const FileName = (props: IFileName) => {
  if (props.fileName) {
    return (
      <div className={props.className}>
        {props.fileName}
      </div>
    )
  } else {
    return <></>
  }
}