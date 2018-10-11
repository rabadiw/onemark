// Abstract Logger
class Logger {
  info(msg) {
    let outmsg = `[info] ${msg}`;
    console.log(outmsg);
  }
  cmd(msg) {
    let outmsg = `\n> ${msg}`;
    console.log(outmsg);
  }
}

// source: https://gist.github.com/rabadiw/b5646905ac1e8db8f80ef921df822792
class FlagParser {
  static parse(args) {
    // guard
    if (false === Array.isArray(args)) { return []; }

    // Creates a flag from KeyValue pair
    let makeFlag = (kv) => {
      let b = {}
      let k = kv[0]
      let v = kv[1]

      // Test empty key, but not value 
      if (k.length === 0 && v.length > 0) {
        k = v
        v = true
      }

      // Test one entry
      if (kv.length === 1) {
        k = kv[0]
        v = true
      }

      // set the object 
      b[k] = v;

      return b;
    }

    let result = {}
    Array.from(args)
      .slice(2)
      .forEach(v => {
        let a = v.replace(/-{1,2}/g, "").split(/=/g) || [];
        result = Object.assign(result, makeFlag(a));
      });

    return result;
  }
}

// build client
class ClientBuilder {
  constructor() { }
  with(opt) {
    this.ctx = {
      log: opt.logger,
      canRun: (opt.flags.client === true)
    };
    return this;
  }
  do() {
    // guard
    if (false === this.ctx.canRun) { return; }

    this.ctx.log.info("ClientBuilder do...");

    const { spawn, spawnSync } = require('child_process')

    const cwd = './src/ui'
    const twd = './app'

    // build
    let spawnOps = { stdio: 'inherit', cwd: cwd, shell: true };
    spawn('npm', ['install'], spawnOps);
    let buildProces = spawn('npm', ['run', 'build'], spawnOps);

    buildProces.on("exit", (code, signal) => {
      if (code !== 0) {
        this.ctx.log.info(`build process existed with ${code} and ${signal}`)
        return
      }

      // copy build to app/www/
      let platformCommands = {
        win32: [
          { cmd: 'powershell', args: ['mkdir', `${twd}/www/`] },
          { cmd: 'powershell', args: ['rm -recurse', `${twd}/www/*`] },
          { cmd: 'powershell', args: ['cp -recurse', `${cwd}/build/*`, `${twd}/www/`] },
        ],
        linux: [
          { cmd: 'mkdir', args: ['-p', `${twd}/www/`] },
          { cmd: 'rm', args: ['-rf', `${twd}/www/.`] },
          { cmd: 'cp', args: ['-r', `${cwd}/build/.`, `${twd}/www/`] },
        ]
      }

      let cmds = (process.platform === "win32") ? platformCommands.win32 : platformCommands.linux;

      cmds.forEach((cmd) => {
        this.ctx.log.cmd([cmd.cmd, ...cmd.args].join(' '))
        spawnSync(cmd.cmd, cmd.args, { stdio: 'inherit', cwd: '.', shell: true })
      })

    })
  }
}

// build app
class AppBuilder {
  constructor() { }
  with(opt) {
    this.ctx = {
      log: opt.logger,
      canRun: (opt.flags.app === true)
    };

    return this;
  }
  do() {
    // guard
    if (false === this.ctx.canRun) { return; }

    this.ctx.log.info("AppBuilder do...");

    const { spawn, spawnSync } = require('child_process')

    let cwd = './src/app'
    let twd = './app'

    // build
    let spawnOps = { stdio: 'inherit', cwd: cwd, shell: true };
    spawn('npm', ['install'], spawnOps);
    // let buildProces = spawn('tsc', ['-p', cwd], spawnOps);
    let buildProces = spawn('npm', ['run', 'build'], spawnOps);

    buildProces.on("exit", (code, signal) => {
      if (code !== 0) {
        this.ctx.log.info(`build process existed with ${code} and ${signal}`)
        return
      }

      // copy build to app/
      let platformCommands = {
        win32: [
          { cmd: 'powershell', args: ['mkdir', `${twd}`] },
          { cmd: 'powershell', args: ['rm -recurse', `-exclude 'www'`, `${twd}/*`] },
          { cmd: 'powershell', args: ['cp -recurse', `${cwd}/public/*`, `${twd}/`] },
          { cmd: 'powershell', args: ['cp -recurse', `${cwd}/build/*`, `${twd}/`] },
        ],
        linux: [
          { cmd: 'mkdir', args: ['-p', `${twd}`] },
          { cmd: 'rm', args: ['-rf', `${twd}/!(www)`] },
          { cmd: 'cp', args: ['-rv', `${cwd}/public/.`, `${twd}/`] },
          { cmd: 'cp', args: ['-r', `${cwd}/build/.`, `${twd}/`] },
        ]
      }

      let cmds = (process.platform === "win32") ? platformCommands.win32 : platformCommands.linux;

      cmds.forEach((cmd) => {
        this.ctx.log.cmd([cmd.cmd, ...cmd.args].join(' '))
        spawnSync(cmd.cmd, cmd.args, { stdio: 'inherit', cwd: '.', shell: true })
      })

      // node_modules for dist
      spawn('npm', ['install'], { stdio: 'inherit', cwd: `${twd}`, shell: true });

    })
  }
}

// clean build
class BuildCleaner {
  constructor() { }
  with(opt) {
    this.ctx = {
      log: opt.logger,
      canRun: ((opt.flags.app && opt.flags.client) === true)
    };

    return this;
  }
  do() {
    // guard
    if (false === this.ctx.canRun) { return; }

    const { spawnSync } = require('child_process')

    this.ctx.log.info("BuildCleaner do...");
    let twd = './app'

    // copy build to app/
    let platformCommands = {
      win32: [
        { cmd: 'powershell', args: ['rm -recurse', `${twd}`] },
      ],
      linux: [
        { cmd: 'rm', args: ['-rf', `${twd}`] },
      ]
    }

    let cmds = (process.platform === "win32") ? platformCommands.win32 : platformCommands.linux;

    cmds.forEach((cmd) => {
      this.ctx.log.cmd([cmd.cmd, ...cmd.args].join(' '))
      spawnSync(cmd.cmd, cmd.args, { stdio: 'inherit', cwd: '.', shell: true })
    })
  }
}

function run(opt) {
  opt.logger.info(`runtime options: ${JSON.stringify(opt)}\n`);

  [
    { o: BuildCleaner, d: opt },
    { o: ClientBuilder, d: opt },
    { o: AppBuilder, d: opt }
  ]
    .forEach((pkg) =>
      (new pkg.o())
        .with(pkg.d)
        .do())
}

run({ logger: new Logger(), flags: FlagParser.parse(process.argv) });
