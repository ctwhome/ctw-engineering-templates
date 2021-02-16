NuxtDeployToFirebase.yml
```yml
name: Deploy to firebase

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: npm install, generate
      run: |
           yarn
           yarn generate
    - name: deploy to Firebase Hosting
      uses: w9jds/firebase-action@master
      with:
        args: deploy
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }} # add Firebase Tooken as secret of your Github repository
```
