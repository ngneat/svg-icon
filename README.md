<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

> A lightweight library that makes it easier to use SVG icons in your Angular Application

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

The `svg-icon` library enables using the `<svg-icon>` tag to directly display SVG icons in the DOM.
This approach offers an advantage over using an `<img>` tag or via the CSS `background-image` property, because it allows styling and animating the SVG with CSS.

For example, if the `fill` or `stroke` properties of elements in the svg are set to `currentColor`, they will have the color defined for the containing DOM element. So the color can easily be changed by changing the color style on the `svg-icon` element.

## Installation

`ng add @ngneat/svg-icon`

## Icons Preparation

- Add the icons to `src/assets/svg`
- Add an alias to the `tsconfig` file:

```json
{
  ...
  "paths": {
    "@app/svg/*": ["src/app/svg/*"]
  }
}
```

- Use `@ngneat/svg-generator` to clean and extract the icons content:

```json
{
  "scripts": {
    "generate-icons": "svgGenerator"
  },
  "svgGenerator": {
    "outputPath": "./src/app/svg",
    "prefix": "app",
    "srcPath": "./src/assets/svg",
    "svgoConfig": {
      "plugins": [
        "removeDimensions"
      ]
    }
  }
}
```

- Run `npm run generate-icons`

## Custom config

The `svgGenerator` config object is placed by default in your main `package.json`.

It can also be placed in any location supported by the [Cosmiconfig library](https://github.com/davidtheclark/cosmiconfig) such as a custom `.svgGeneratorrc.json` file.

The config object is looked for in the project root directory by default.

If your config object is located in another directory, you can specify it through the `--config-dir` option of the `svg-generator` CLI: `npm run svg-generator --config-dir=/your/custom/dir/where/the/config/is/located`. The config object will then be looked for in all valid [Cosmiconfig library](https://github.com/davidtheclark/cosmiconfig) locations starting from that directory and going up the directory tree until a config is found.

## Icons Rendering

Import the `SvgIconsModule` in your `AppModule`, and register the icons:

```ts
import { SvgIconsModule } from '@ngneat/svg-icon';
import { settingsIcon } from '@app/svg/settings';

@NgModule({
  imports: [
    SvgIconsModule.forRoot({
      icons: [settingsIcon],
    }),
  ],
})
export class AppModule {}
```

Now we can use the `svg-icon` component:

```html
<svg-icon key="settings"></svg-icon>
<svg-icon key="settings" color="hotpink" fontSize="40px"></svg-icon>
```

## Register icons locally

In lazy load modules or in reusable component modules, we can use the `forChild` method, for register icons accessible locally in these modules:

```ts
import { dashboardIcon } from '@app/svg/dashboard';
import { userIcon } from '@app/svg/user';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, SvgIconsModule.forChild([userIcon])],
})
export class DashboardModule {}
```

Note that we're NOT using a barrel file (i.e `index.ts`). This will make sure we only **load** the SVG files we use in the current module.

## Webpack Plugin

To make the process more seamless, the library provides a Webpack plugin you can use to automate the extracting process:

```ts
const { SvgGeneratorWebpackPlugin } = require('@ngneat/svg-generator/webpack-plugin');

{
  plugins: [
    new SvgGeneratorWebpackPlugin({
      watch: !isProd,
      srcPath: './src/assets/svg',
      outputPath: './src/app/svg',
      svgoConfig: {
        plugins: [
          "removeDimensions"
        ],
      },
    }),
  ];
}
```

## Group Icons

There are cases where we want to group multiple SVG icons. For example, we might have a `notifications` feature, and we need to load SVG icons such as Slack, Email, etc.

In such cases, create a unique directory, and put the related icons inside it. For example:

```
home.svg
user.svg
/notifications
 - slack.svg
 - email.svg
```

This will create a `notifications` folder with a `barrel` file that export the SVG icons inside the folder under a const named `${folderName}Icons`:

```ts
import { notificationsIcons } from '@app/svg/notifications';

@NgModule({
  imports: [SvgIconsModule.forChild(notificationsIcons)],
})
export class NotificationsModule {}
```

## Icon Sizing

To control the SVG size, we use the `font-size` property as described in this [article](https://css-tricks.com/control-icons-with-font-size/).
You also have the option to pass fixed sizes and use them across the application:

```ts
@NgModule({
  imports: [
    SvgIconsModule.forRoot({
      sizes: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '25px',
        xxl: '30px'
      },
      defaultSize: 'md',
      icons
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

They are used in the `size` input:

```html
<svg-icon key="settings" size="lg"></svg-icon>
```

## Inputs

```ts
@Input() key: string;
@Input() size: string;
@Input() fontSize: string;
@Input() color: string;
@Input() width: string | number;
@Input() height: string | number;
@Input() noShrink: boolean;
```

## SvgIconRegistry

You can inject the `SvgIconRegistry`, and get existing SVG icons or register new ones:

```ts
import { SvgIconRegistry } from '@ngneat/svg-icon';

interface Icon {
  name: string;
  data: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private registry: SvgIconRegistry) {
    registry.register([Icon, Icon, Icon]);
    registry.register(Icon);
    registry.get(name);
    registry.getAll();
  }
}
```

## Missing Icon

You can define **missingIconFallback** which will be used if icon is not found in registry:

```ts
import { unknownIcon } from '@app/svg/unknown';

@NgModule({
  imports: [
    SvgIconsModule.forRoot({
      missingIconFallback: unknownIcon,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.netbasal.com/"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Netanel Basal</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=NetanelBasal" title="Code">💻</a> <a href="https://github.com/@ngneat/icons/commits?author=NetanelBasal" title="Documentation">📖</a> <a href="#ideas-NetanelBasal" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/theblushingcrow"><img src="https://avatars3.githubusercontent.com/u/638818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Inbal Sinai</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=theblushingcrow" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/shaharkazaz"><img src="https://avatars2.githubusercontent.com/u/17194830?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shahar Kazaz</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=shaharkazaz" title="Code">💻</a> <a href="#ideas-shaharkazaz" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://medium.com/@overthesanity"><img src="https://avatars1.githubusercontent.com/u/7337691?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Artur Androsovych</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=arturovt" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vltansky"><img src="https://avatars0.githubusercontent.com/u/5851280?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vlad Tansky</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=vltansky" title="Code">💻</a></td>
    <td align="center"><a href="http://zgabievi.co/"><img src="https://avatars.githubusercontent.com/u/1515299?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zura Gabievi</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=zgabievi" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
</br>
Logo icon was made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
