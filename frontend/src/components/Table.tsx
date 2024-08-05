import { ReactNode } from 'react'
import styled from 'styled-components'
import { Card, Stack, theme, Typography } from '../theme'

// ----------------------------------------------------------------------

const CustomTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead th {
    background-color: ${theme.palette.background.canvas.light};
    color: ${theme.palette.text.secondary};
    width: auto;
  }

  tbody tr {
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.palette.border.default};
    }
  }

  th,
  td {
    text-align: left;
    padding: 16px;
    color: ${theme.palette.text.primary};
    &:first-child {
      width: 80px;
    }
  }
`
// ----------------------------------------------------------------------

interface TableProps {
  head: any[]
  data?: any[]
  children: ReactNode
}

export default function Table({ children, head, data }: TableProps) {
  return (
    <Card variant="outline" sx={{ padding: '0', overflowX: 'scroll' }}>
      <CustomTable>
        <thead>
          <tr>
            {head.map((data, index) => (
              <th key={index}>{data.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {!data ? (
            <tr>
              <td colSpan={head.length}>
                <Stack justifyContent="center" sx={{ padding: '16px' }}>
                  <Typography>Data belum tersedia</Typography>
                </Stack>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </CustomTable>
    </Card>
  )
}
