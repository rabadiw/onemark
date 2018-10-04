// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as firebase from 'firebase'

// require('firebase/auth')
// require('firebase/database')

// Leave out Storage
// require('firebase/storage')

class CloudBackend {
  static initalize() {
    var config = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: ''
    }

    firebase.initializeApp(config)
  }
}

export default CloudBackend
