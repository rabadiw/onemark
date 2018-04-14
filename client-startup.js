const opts = { stdio: 'inherit', cwd: 'src-client', shell: true }
require('child_process').spawn('yarn', ['start'], opts)
