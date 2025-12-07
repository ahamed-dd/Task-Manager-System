import { type ReactNode } from 'react'

type Props = { children:ReactNode}

export default function Layout(props: Props) {
  return (
    <div>
        
        {props.children} 
    </div>
  )
}


