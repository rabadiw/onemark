const myMock = jest.fn();
const { AppConfig } = require("../app/api/config/settings")


test('middleware test', () => {

  const startupA = function () {
    let handlers = [];
    const getNextFunc = (arg, arr) => {
      let next = () => { };
      if (!arr) { return next; }
      if (arr.length > 1) {
        let nextArr = arr.slice(1);
        next = getNextFunc(arg, nextArr);
      }
      return () => { arr[0](arg, next); }
    };
    return {
      use(...handler) {
        handlers.push(...handler);
        return this;
      },
      start(args) {
        if (handlers.length === 0) {
          console.log("No handlers found");
        } else {
          handlers[0](args, getNextFunc(args, handlers.slice(1)));
        }
      }
    }
  };


  const useApi = (args, next) => {
    console.log('entering useApi', next);
    const startupApi = (args) => { args.indexOf("--run-api") !== -1 };
    if (!startupApi(args)) {
      next();
      return;
    }
    require("./api/index");
  };

  const useApp = (args, next) => {
    console.log('entering useApp', next);
    next();
    return;
    //new OnemarkApp();
    //console.log("OnemarkAPP");
  };

  const useDefault = (args, next) => {
    console.log("No app to start.");
  }

  const a = new myMock();
  myMock.bind(startupA)

  startupA()
    .use(useApi)
    .use(useApp)
    .use(useDefault)
    .start(process.argv);

  expect(myMock).toBeCalled();

});

test('appSettings values', () => {

  console.info("test")

  console.info(`AppConfig.Settings: ${JSON.stringify(AppConfig.init())}`);

  expect(1).toEqual(1);

});