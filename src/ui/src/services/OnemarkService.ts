// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

class OnemarkService {
  private items = [{
    "created": "2016-11-29T22:15:04.620Z",
    "domain": "blogs.msdn.microsoft.com",
    "favIconUrl": "https://blogs.msdn.microsoft.com/dotnet/wp-content/themes/cloud-platform/images/favicon-msdn.png",
    "id": "1",
    "tags": ["tag 1", "tag 2"],
    "title": "Announcing .NET Core 1.1 | .NET Blog",
    "url": "https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-net-core-1-1/",
  }, {
    "created": "2016-11-29T22:15:04.620Z",
    "domain": "www.nuget.org",
    "favIconUrl": "https://www.nuget.org/favicon.ico",
    "id": "2",
    "tags": ["tag a", "tag b"],
    "title": "NuGet Gallery | NETStandard.Library 1.6.0",
    "url": "https://www.nuget.org/packages/NETStandard.Library/1.6.0",
  }, {
    "created": "2016-11-29T22:15:04.620Z",
    "domain": "blogs.msdn.microsoft.com",
    "favIconUrl": "https://blogs.msdn.microsoft.com/dotnet/wp-content/themes/cloud-platform/images/favicon-msdn.png",
    "id": "3",
    "tags": ["tag 1", "tag 2"],
    "title": "Announcing .NET Core 1.1 | .NET Blog",
    "url": "https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-net-core-1-1/",
  }, {
    "created": "2016-11-29T22:15:04.620Z",
    "domain": "www.nuget.org",
    "favIconUrl": "https://www.nuget.org/favicon.ico",
    "id": "4",
    "tags": ["tag a", "tag b"],
    "title": "NuGet Gallery | NETStandard.Library 1.6.0",
    "url": "https://www.nuget.org/packages/NETStandard.Library/1.6.0",
  }, {
    "created": "2016-11-29T22:15:04.620Z",
    "domain": "www.nuget.org",
    "favIconUrl": "https://www.nuget.org/favicon.ico",
    "id": "5",
    "tags": ["tag a", "tag b"],
    "title": "NuGet Gallery | NETStandard.Library 1.6.0",
    "url": "https://www.nuget.org/packages/NETStandard.Library/1.6.0",
  }];
  public with(ctx: any) {
    return this;
  }
  public getItems(search: string = ""): any[] {
    if (search.length > 1) {
      try {
        const re = new RegExp(search);
        return this.items.filter(v => re.test(v.title)
          || re.test(v.url)
          || !(undefined === v.tags.find(t => re.test(t)))
        );
      } catch (e) {
        alert(`bad search exprssion "${search}"`);
      }
    }
    return this.items;
  }
}

export default OnemarkService;