// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

class OnemarkService {
  private endpoints: { marksUri: string; };
  public with(ctx: { apiUrl: string }) {
    const apiUrl = ctx.apiUrl.replace(/\/$/g, "") + "/";
    this.endpoints = {
      marksUri: `${apiUrl}api/marks`
    }
    return this;
  }
  public getMarks(search: string = ""): Promise<any[]> {
    const marksUri = this.endpoints.marksUri;

    return new Promise<[any]>((resolve, reject) => {

      fetch(marksUri, {
        headers: new Headers({ 'accept': 'application/json' }),
        method: "get"
      })
        .catch((error) => {
          // traceError(error)
          reject(error)
        })
        .then((response) => {
          if (response && response.json) {
            response.json().then((result) => {
              let data = result.data;
              if (search.length > 1) {
                try {
                  const re = new RegExp(search);
                  data = data.filter((v: any) => re.test(v.title)
                    || re.test(v.url)
                    || !(undefined === (v.tags || []).find((t: string) => re.test(t)))
                  );
                } catch (e) {
                  alert(`bad search exprssion "${search}"`);
                }
              }
              // success
              resolve(data)
            })
          }
        })
    })
  }
  public deleteMarks(marks: [{ id: string }]) {
    const marksUri = this.endpoints.marksUri;
    // generic func
    const deleteMark = (id: string) => {
      return fetch(
        `${marksUri}/${id}`, { method: 'delete' }
      )
    }
    // delete one at a time
    return new Promise<void>((resolve, reject) => {
      Promise.all(
        marks.map(v => deleteMark(v.id))
      ).catch((err) => {
        // traceError(err)
      })
      resolve()
    })
  }
}

export default OnemarkService;