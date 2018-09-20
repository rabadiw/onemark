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
      apiKey: 'AIzaSyA0OwVZP6R-UYbKIjweH2ldAjKUYsSsbrM',
      authDomain: 'onemark-6ba70.firebaseapp.com',
      databaseURL: 'https://onemark-6ba70.firebaseio.com',
      projectId: 'onemark-6ba70',
      storageBucket: '',
      messagingSenderId: '136905303205'
    }

    firebase.initializeApp(config)
  }
}

export default CloudBackend
