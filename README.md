# TeeAssembler 3.0 AngularJS

TeeAssembler 3.0 AngularJS is a script used for coloring a TeeWorlds/DDNet skins image the same way TeeWorlds/DDNet does and rendering the image in your browser using only CSS and TypeScript (and animate the eyes), you can implement it in your AngularJs project using `npm i ng-tee-assembler`.

---
## Credits

Converted to TypeScript and implemented in an AngularJS library by **Samuele Radici (kio)**

Thanks to [b0th#6474](https://github.com/theobori) for helping Aleksandar with the original project.

And thank you [.alexander](https://github.com/AlexIsTheGuy) for helping me and allowing me to do this project

## Project Infos

Base project: [tw-utils](https://github.com/theobori/tw-utils).

Original project: [TeeAssembler-2.0](https://github.com/AlexIsTheGuy/TeeAssembler-2.0).

---
## Release

The npm package is released on npmjs.com [ng-tee-assembler](https://www.npmjs.com/package/ng-tee-assembler).

---
## Exporting
Build: `npm run build-library`

Pack: `npm run pack-lib`

---
## Usage

### Installation: 

`npm i ng-tee-assembler`


### Importing inside a component module: 

```JS

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

...

import { NgTeeAssemblerModule } from "ng-tee-assembler";

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        ...,
        NgTeeAssemblerModule
    ]
})
export class AppModule { }

```


### Implementation:

NOTE: YOU WILL HAVE TO CHOOSE A SIZE FOR THE TEE OR THE EYES CAN BE BUGGY


```html
<!DOCTYPE html>
<html>
	<head>

		...

	</head>
	<body>

		...

		<render-tee data-size="92px"><render-tee>

	</body>
</html>
```

### Automatic Rendering (No coloring)

```html
<render-tee data-size="92px" data-skinimage='https://api.skins.tw/api/resolve/skins/mouse'></render-tee>
```

### Automatic Rendering (With coloring)

```html
<render-tee data-size="92px" data-skinimage='https://api.skins.tw/api/resolve/skins/mouse' data-bodycolor='13149440' data-feetcolor='255' data-coloringmode='code'></render-tee>

```

### You can also make eyes look at the mouse

```html
<render-tee data-size="92px" data-skinimage='https://api.skins.tw/api/resolve/skins/mouse' data-lookmouse="true"></render-tee>

```
Note: The value of data-lookmouse must be "true" to set it to false you can simply remove the data attribute


### You can also add an angle to the eyes

```html
<render-tee data-size="92px" data-skinimage='https://api.skins.tw/api/resolve/skins/mouse' data-look="90"></render-tee>

```
Note: The value of data-look is the angle and must be an int


### Set an attibute with a variable

```html
<render-tee data-size="92px" [attr.data-skinimage]="variablename" [attr.data-look]="variablename2"></render-tee>

```
Note: The variable must be declared in the ts component



---

## Known issues

- Eyes are not perfectly aligned like in the game but it's close enough.


## Contact

You can contact me on Discord for anything related to the fork of the original project: everestkio

Contact of the original project owner: .alexander_

---
## License

Copyright (c) 2022 Aleksandar Blažić

Copyright (c) 2023 Samuele Radici

Licensed under the [MIT](https://github.com/AlexIsTheGuy/TeeAssembler-2.0/blob/main/LICENSE) license.

