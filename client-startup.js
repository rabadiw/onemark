const opts = { stdio: 'inherit', cwd: 'src/ui', shell: true }
require('child_process').spawn('yarn', ['start'], opts)
