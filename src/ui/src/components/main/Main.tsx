import Button from '@material-ui/core/Button';
import * as React from 'react';

import './Main.css';

class Main extends React.Component {
  public render() {
    return (
      <div className="Main">
        <p className="Main-content">
          <Button variant="contained" color="primary">
            Hello World
          </Button>
        </p>
      </div>
    );
  }
}

export default Main;