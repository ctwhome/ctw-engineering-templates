## Enable format autofix with eslint

Add a `.vscode/settings.json` file inside the project

```json
{
  "editor.formatOnSave": true,
  "vetur.validation.template": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
```

## Some extra eslint rules
.eslistrc.js
```js
rules: {
  // Allow console-logs  
  'no-console': false,
  // Allow unused variables
  'no-unused-vars': false,
},
```
