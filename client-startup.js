// set browser
process.env['BROWSER'] = 'chrome'
const opts = {
  stdio: 'inherit',
  cwd: 'src/ui',
  shell: true
}
require('child_process').spawn('npm', ['start'], opts)