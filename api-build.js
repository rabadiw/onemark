const { spawn, spawnSync } = require('child_process')

// API build
let buildProces = spawn('tsc', ['-p', './src-api'], { stdio: 'inherit', cwd: '.', shell: true });

buildProces.on("exit", (code, signal) => {
  if (code !== 0) {
    console.log(`build process existed with ${code} and ${signal}`)
    return
  }
  // copy build to app/
  // first clear app/
  if (process.platform === "win32") {
    spawnSync('powershell', ['cp -recurse ./src-api/public/* ./app/'], { stdio: 'inherit', cwd: '.', shell: true })
  } else {
    spawnSync('cp', ['-r', './src-api/public/*', './app/'], { stdio: 'inherit', cwd: '.', shell: true })
  }

  spawn('npm', ['install'], { stdio: 'inherit', cwd: './app', shell: true });
})
