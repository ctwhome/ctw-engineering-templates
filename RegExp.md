# Regular Expressions

### Playground
* https://regex101.com/

### Apply regexp to string
```js
var textA = 'All I see here are apples, APPles and apPleS';
var regexOne = /apples/gi;

console.log(textA.match(regexOne));
// Output : [ "apples", "APPles", "apPleS" ]

```

![image](https://user-images.githubusercontent.com/4195550/107110462-518c1100-6848-11eb-816c-d24c04c047a3.png)


### Common patterns

| Description |Patrern |Result |
|-------------|--------|-------|
| Get file extension | `\.(mov\|mp4\|mpg\|f3)$/mg` |'Isn't this fun?' |
| Phone number |`\(\d\d\d\) \d\d\d-?\d\d\d\d` |(562) 988-1688 || Dashes |
| ID or tracking number | `Tracking ID\:\s*(\w*)\s*` | Tracking ID: 12KDF7Q89WFL |
| whole words only | `\b` => `\bword\b` | This **word** is selected. |
