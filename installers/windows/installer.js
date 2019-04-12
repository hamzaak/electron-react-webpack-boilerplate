"use strict";

const builder = require('electron-builder')
const Platform = builder.Platform
const packageJson = require('../../package.json')

let options = {
  appId: packageJson.appId,
  artifactName: `${packageJson.name}-setup-${packageJson.version}.exe`,
  productName: packageJson.productName,
  directories: {
    output: 'release-builds',
  },
  win: {
    target: [
      {
        target: "nsis",
        arch: [
          "x64",
          "ia32"
        ]
      },
    ],
    icon: "public/assets/app.ico",
  },
}

builder.build({
  targets: Platform.WINDOWS.createTarget(),
  config: options,
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.error(e)
})
