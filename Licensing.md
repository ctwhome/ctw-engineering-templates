## Licensing Notes
Tracking and understanding licensing Node applications can be tedious due to the 3rd party packages involved in the project.

You can run this command locally to check the number of licensing for the installed packages.
```npx license-checker --summary ```

See only production packages: 
```npx license-checker --production ```

[See all option here](https://github.com/davglass/license-checker#options)

Example:
```shell
 $ npx license-checker --production --summary
├─ MIT: 988
├─ ISC: 89
├─ CC0-1.0: 24
├─ BSD-2-Clause: 22
├─ BSD-3-Clause: 12
├─ Apache-2.0: 6
├─ (MIT OR CC0-1.0): 3
├─ Public Domain: 2
├─ BSD*: 2
├─ 0BSD: 2
├─ (MIT OR Apache-2.0): 1
├─ CC-BY-4.0: 1
├─ UNLICENSED: 1
├─ (WTFPL OR MIT): 1
├─ (MIT AND Zlib): 1
└─ (MIT AND BSD-3-Clause): 1
```
