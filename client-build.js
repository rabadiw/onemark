const { spawn, spawnSync } = require('child_process')

const args = ['build'];
const opts = { stdio: 'inherit', cwd: 'src-client', shell: true };

// build
let buildProces = spawn('yarn', args, opts);

buildProces.on("exit", (code, signal) => {
  if (code !== 0) {
    console.log(`build process existed with ${code} and ${signal}`)
    return
  }
  // copy build to app/www
  // first clear app/www  
  spawnSync('powershell', ['rm -r ./app/www/*'], { stdio: 'inherit', cwd: '.', shell: true })
  spawnSync('powershell', ['mv ./src-client/build/* ./app/www'], { stdio: 'inherit', cwd: '.', shell: true })
})
