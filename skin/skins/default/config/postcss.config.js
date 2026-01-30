'use strict'

const reporter = require('postcss-reporter');

module.exports = ctx => ({
  map: ctx.file.dirname.includes('examples') ? false : {
    inline: false,
    annotation: true,
    sourcesContent: true
  },
  plugins: {
    autoprefixer: { cascade: false },
    rtlcss: ctx.env === 'RTL' ? {} : false,
    'postcss-reporter': { clearReportedMessages: true }
  }
});
