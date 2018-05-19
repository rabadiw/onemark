const { spawn, spawnSync } = require('child_process')

const opts = { stdio: 'inherit', cwd: 'src-client', shell: true };

// build
spawn('npm', ['install'], opts);
let buildProces = spawn('npm', ['build'], opts);

buildProces.on("exit", (code, signal) => {
  if (code !== 0) {
    console.log(`build process existed with ${code} and ${signal}`)
    return
  }
  // copy build to app/www
  // first clear app/www
  if (process.platform === "win32") {
    spawnSync('powershell', ['rm -recurse ./app/www/'], { stdio: 'inherit', cwd: '.', shell: true })
    spawnSync('powershell', ['cp -recurse ./src-client/build/* ./app/www/'], { stdio: 'inherit', cwd: '.', shell: true })
  } else {
    spawnSync('rm', ['-r', './app/www/'], { stdio: 'inherit', cwd: '.', shell: true })
    spawnSync('mkdir', ['-p', './app/www/'], { stdio: 'inherit', cwd: '.', shell: true })
    spawnSync('cp', ['-r', './src-client/build/*', './app/www/'], { stdio: 'inherit', cwd: '.', shell: true })
  }
})
