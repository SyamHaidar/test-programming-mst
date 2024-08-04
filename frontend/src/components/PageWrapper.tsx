import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

interface PageWrapperProps {
  children?: ReactNode
  title?: string
  meta?: string
  tag?: string
}

export default function PageWrapper({
  children,
  title = '',
  meta,
  tag,
}: PageWrapperProps) {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Syamh.` : 'Syamh.'}</title>
        {meta && meta}
        {tag && tag}
      </Helmet>

      {children}
    </>
  )
}
