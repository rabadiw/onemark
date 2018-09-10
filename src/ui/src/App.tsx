// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';

// import logo from './logo.svg';

interface IProps {
  dataService: any
}

class App extends React.Component<IProps, object> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Onemark</h1>
        </header>
        <div>
          <Dashboard items={this.getItems()} />
        </div>
      </div>
    );
  }

  private getItems(): any[] {
    return [{
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
    }];
  }
}

export default App;
