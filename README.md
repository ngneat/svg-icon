<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> A lightweight library that makes it easier to use SVG icons in your Angular Application

`<svg-icon>` displays SVG icons by directly inlining the SVG content into the DOM as a child of itself. This approach offers an advantage over an <img> tag or a CSS background-image because it allows styling the SVG with CSS. 

For example, the default color of the SVG content is the CSS `currentColor` value. This makes SVG icons by default have the same color as surrounding text and allows you to change the color by setting the color style on the `svg-icon` element.

## Installation

`ng add @ngneat/svg-icon`

The command will automatically do the following steps for you.

## Recommended Flow

### Icons Preparation

- Add the icons to `src/assets/svg`
- Use [svg-to-ts](https://github.com/kreuzerk/svg-to-ts) to clean and extract the icons content:

```json
{
  "scripts": {
    "generate-icons": "svg-to-ts"
  },
  "svg-to-ts": {
    "conversionType": "object",
    "srcFiles": [
      "./src/assets/svg/*.svg"
    ],
    "outputDirectory": "./src/assets/svg",
    "fileName": "svg-icons",
    "svgoConfig": {
      "plugins": [
        {
          "removeDimensions": true,
          "cleanupAttrs": true
        }
      ]
    }
  }
}
```

- Run `npm run generate-icons`

### Icons Rendering
Import the `SvgIconsModule` in your `AppModule`, and register the icons:

```ts
import { SvgIconsModule } from '@ngneat/svg-icon';

import icons from '../assets/svg/svg-icons';

@NgModule({
  imports: [
    SvgIconsModule.forRoot({
      icons
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Now you can use the `svg-icon` component:

```html
<svg-icon key="settings"></svg-icon>
<svg-icon key="settings" color="hotpink" fontSize="40px"></svg-icon>
```

To control the SVG size, we use the `font-size` property as described in this [article](https://css-tricks.com/control-icons-with-font-size/). 
You have the options to pass fixed sizes and use them across the application:

```ts
@NgModule({
  imports: [
    SvgIconsModule.forRoot({
      sizes: {
        xm: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px'
      },
      icons
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

And use the `size` input:

```html
<svg-icon key="settings" size="lg"></svg-icon>
```

### SvgIconRegistry

You can inject the `SvgIconRegistry`, and use it to insert new SVG icons or get them:

```ts
import { SvgIconRegistry } from '@ngneat/svg-icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   constructor(private registry: SvgIconRegistry) {
     registry.register({ settings: `<svg>...</svg>`});
     registry.get(key);
     registry.getAll();
   }
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.netbasal.com/"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;" alt=""/><br /><sub><b>Netanel Basal</b></sub></a><br /><a href="https://github.com/@ngneat/svg-icon/commits?author=NetanelBasal" title="Code">💻</a> <a href="https://github.com/@ngneat/icons/commits?author=NetanelBasal" title="Documentation">📖</a> <a href="#ideas-NetanelBasal" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
