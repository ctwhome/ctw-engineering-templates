
- @nuxt/pwa module

## Step 1: Build oneline the application
1 - Navigate to https://www.pwabuilder.com, enter the URL of your PWA and click “Start”.
2 - Apply any changes to application that need to be modified in the manifest of service worker.
3 - Build the App
![Screenshot 2021-02-16 at 07 54 00](https://user-images.githubusercontent.com/4195550/108028482-354c5900-702c-11eb-85de-a2fcd7b36637.png)
4 - Download the app you want
![image](https://user-images.githubusercontent.com/4195550/108028553-557c1800-702c-11eb-8882-027db020a61b.png)

## Step 2: test your APK on your Android phone
1 - Simply send the APK to your android phone and install it to test it

Notes: 
- The app shows in inside the browser window.. not nice


## Publish into the Andoird Play Store

> => [Page intrctions here](https://github.com/pwa-builder/CloudAPK/blob/master/Next-steps.md)
 
#### Note about Quality Criteria on Android
As of Chrome 86, PWAs downloaded from the Google Play Store will now crash if your app:

- Does not have a valid TLS certificate
- Does not work offline
- Does not link to your digital assetlinks file correctly

Because of this you should ensure that your PWA works completely offline, runs on an HTTPS domain and has your assetlinks file linked. For the assetlinks file, please refer to Step 1 above. For your offline experience, we recommend running your PWA through PWABuilder to ensure that your PWA works offline. For more info, check out this article from our friends over on the Chrome team.
