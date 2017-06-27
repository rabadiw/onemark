export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function traceError(error) {
  if (error.response) {
    console.log(error.response);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export const log = (v) => {
  console.log(v);
}