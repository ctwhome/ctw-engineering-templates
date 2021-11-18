## Supabase Google OAuth

Go to the credentials page in your project in google console:  
https://console.cloud.google.com/apis/credentials

1.  Oauth Consent Screen
2.  Create OAuth (Web Application)

Authorized redirect URI's: `https://<Supabase database url>.supabase.co/auth/v1/callback`

It is important to have first the production URL in the Site URL, and the locals at the additional URLs, also mobile apps, etc. 

Then login with localhost, change the redirect to localhost from JS:

```javascript
function loginWithProvider (provider:Provider = 'google', isDev:boolean) {
  supabase.auth.signIn({ provider }, {
    redirectTo: isDev ? 'http://localhost:3000' : undefined
  })
}
```

### Supabase dashboard

site url: https://production.netlify.app  
Additional Redirect: http://localhost:3000

![image](https://user-images.githubusercontent.com/4195550/118251263-a377af00-b4a7-11eb-9d92-a2fb390e9873.png)

### Google credentials:  
 

![image](https://user-images.githubusercontent.com/4195550/127732285-c9559536-8447-404c-b755-996f564ecc61.png)
