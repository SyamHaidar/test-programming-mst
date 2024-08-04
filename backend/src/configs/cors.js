const cors = require('cors')

// -----------------------------------------------------------------------------

const _cors = cors({
  origin: 'http://localhost:3000',
  credentials: true,
})

module.exports = _cors
