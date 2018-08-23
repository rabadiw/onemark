const { spawn, spawnSync } = require('child_process')

let srcpath = './src/api'
let tarpath = './app'

// API build
let buildProces = spawn('tsc', ['-p', srcpath], { stdio: 'inherit', cwd: '.', shell: true });

buildProces.on("exit", (code, signal) => {
  if (code !== 0) {
    console.log(`build process existed with ${code} and ${signal}`)
    return
  }
  // copy build to app/
  // first clear app/
  if (process.platform === "win32") {
    spawnSync('powershell', [`cp -recurse ${srcpath}/public/* ${tarpath}`], { stdio: 'inherit', cwd: '.', shell: true })
  } else {
    spawnSync('cp', ['-r', `${srcpath}/public/*`, `${tarpath}`], { stdio: 'inherit', cwd: '.', shell: true })
  }

  spawn('npm', ['install'], { stdio: 'inherit', cwd: `${tarpath}`, shell: true });
})
