// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

class OnemarkService {
  // private items = [{
  //   "created": "2016-11-29T22:15:04.620Z",
  //   "domain": "blogs.msdn.microsoft.com",
  //   "favIconUrl": "https://blogs.msdn.microsoft.com/dotnet/wp-content/themes/cloud-platform/images/favicon-msdn.png",
  //   "id": "1",
  //   "tags": ["tag 1", "tag 2"],
  //   "title": "Announcing .NET Core 1.1 | .NET Blog",
  //   "url": "https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-net-core-1-1/",
  // }, {
  //   "created": "2016-11-29T22:15:04.620Z",
  //   "domain": "www.nuget.org",
  //   "favIconUrl": "https://www.nuget.org/favicon.ico",
  //   "id": "2",
  //   "tags": ["tag a", "tag b"],
  //   "title": "NuGet Gallery | NETStandard.Library 1.6.0",
  //   "url": "https://www.nuget.org/packages/NETStandard.Library/1.6.0",
  // }, {
  //   "created": "2016-11-29T22:15:04.620Z",
  //   "domain": "blogs.msdn.microsoft.com",
  //   "favIconUrl": "https://blogs.msdn.microsoft.com/dotnet/wp-content/themes/cloud-platform/images/favicon-msdn.png",
  //   "id": "3",
  //   "tags": ["tag 1", "tag 2"],
  //   "title": "Announcing .NET Core 1.1 | .NET Blog",
  //   "url": "https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-net-core-1-1/",
  // }, {
  //   "created": "2016-11-29T22:15:04.620Z",
  //   "domain": "www.nuget.org",
  //   "favIconUrl": "https://www.nuget.org/favicon.ico",
  //   "id": "4",
  //   "tags": ["tag a", "tag b"],
  //   "title": "NuGet Gallery | NETStandard.Library 1.6.0",
  //   "url": "https://www.nuget.org/packages/NETStandard.Library/1.6.0",
  // }, {
  //   "created": "2016-11-29T22:15:04.620Z",
  //   "domain": "www.nuget.org",
  //   "favIconUrl": "https://www.nuget.org/favicon.ico",
  //   "id": "5",
  //   "tags": ["tag a", "tag b"],
  //   "title": "NuGet Gallery | NETStandard.Library 1.6.0",
  //   "url": "https://www.nuget.org/packages/NETStandard.Library/1.6.0",
  // }];
  private endpoints: { markUri: string; };
  public with(ctx: { apiUrl: string }) {
    const apiUrl = ctx.apiUrl.replace(/\/$/g, "") + "/";
    this.endpoints = {
      markUri: `${apiUrl}api/marks`
    }
    return this;
  }
  public getItems(search: string = ""): Promise<any[]> {
    const markUri = this.endpoints.markUri;
    return new Promise<[any]>((resolve, reject) => {


      fetch(markUri, {
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

              resolve(data)
            })
          }
        })

    })

    // if (search.length > 1) {
    //   try {
    //     const re = new RegExp(search);
    //     return this.items.filter(v => re.test(v.title)
    //       || re.test(v.url)
    //       || !(undefined === v.tags.find(t => re.test(t)))
    //     );
    //   } catch (e) {
    //     alert(`bad search exprssion "${search}"`);
    //   }
    // }
    // return this.items;
  }
  public deleteMarks(items: [any]) {
    // // generic func
    // let deleteMark = (id: string) => {
    //   return fetch(
    //     `${this.baseApiUrl}api/marks/${id}`, { method: 'delete' }
    //   )
    // }
    // // delete one at a time
    // return new Promise<void>((resolve, reject) => {
    //   Promise.all(
    //     marks.map(v => deleteMark(v.id))
    //   ).catch((err) => {
    //     traceError(err)
    //   })
    //   resolve()
    // })
  }
}

export default OnemarkService;