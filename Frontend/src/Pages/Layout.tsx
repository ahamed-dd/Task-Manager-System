import React, { type ReactNode } from 'react'
import styled from '@emotion/styled'
import Sidebar from '../Components/Sidebar'

type Props = { children:ReactNode}

export default function Layout(props: Props) {
  return (
    <div>
        
        {props.children} 
    </div>
  )
}


