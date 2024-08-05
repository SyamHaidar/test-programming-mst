import { Link, NavLink } from 'react-router-dom'
import { Box, Container, Stack, theme, Typography } from '../theme'

// ----------------------------------------------------------------------

export default function Header() {
  //
  const headerMenu = [
    { path: '/transaction', name: 'Transaksi' },
    { path: '/customer', name: 'Customer' },
    { path: '/product', name: 'Produk' },
  ]

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.canvas.default,
        borderBottom: `1px solid ${theme.palette.border.default}`,
      }}
    >
      <Container>
        <Stack alignItems="center" justifyContent="space-between" sx={{ height: '72px' }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            as={Link}
            to={`/`}
            sx={{
              height: '40px',
              width: '40px',
              backgroundColor: theme.palette.background.canvas.secondary.default,
              borderRadius: '6px',
            }}
          >
            <Typography weight="700" hexColor="#fff">
              sh.
            </Typography>
          </Stack>

          <Stack alignItems="center" sx={{ height: '100%' }}>
            {headerMenu.map((data, index) => (
              <Stack
                key={index}
                alignItems="center"
                spacing="8"
                as={NavLink}
                to={data.path}
                sx={{
                  padding: '0 16px',
                  height: '100%',
                  transition: '.3s',
                  fontWeight: '500',
                  fontSize: '14px',
                  '&:hover': {
                    boxShadow: `0 2px 0 -1px ${theme.palette.border.secondary.default}`,
                    color: theme.palette.text.primary,
                  },
                }}
              >
                {data.name}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
