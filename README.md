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

```
npm i @ngneat/svg-icon
npm i @ngneat/svg-generator --save-dev
```

## Icons Preparation

- Add the icons to `src/assets/svg`
- Add an alias to the `tsconfig` file (optional):

```json
{
  "paths": {
    "@app/svg/*": ["src/app/svg/*"]
  }
}
```

- Configure the `@ngneat/svg-generator` to clean and extract the icons content. Add the following to your `package.json` file:

```json
{
  "scripts": {
    "prestart": "npm run svg",
    "prebuild": "npm run svg",
    "svg": "svg-generator"
  },
  "svgGenerator": {
    "outputPath": "./src/app/svg",
    "srcPath": "./src/assets/svg",
    "svgoConfig": {
      "plugins": [
        "removeDimensions",
        "cleanupAttrs",
        {
          "name": "convertColors",
          "params": {
            "currentColor": true
          }
        }
      ]
    }
  }
}
```

It can be modified to meet your needs.

- Add the `outputPath` to your `gitignore` file
- Run `npm run svg`

## Icons Rendering

Use the `provideSvgIcons` to register the icons:

```ts
import { provideSvgIcons } from '@ngneat/svg-icon';
import { settingsIcon } from '@app/svg/settings';

bootstrapApplication(AppComponent, {
  providers: [provideSvgIcons([settingsIcon])],
});
```

Now we can import the **standalone** `SvgIconComponent` and use the `svg-icon` component:

```ts
import { SvgIconComponent } from '@ngneat/svg-icon';

@Component({
  imports: [SvgIconComponent],
  template: `
    <svg-icon key="settings"></svg-icon>

    <svg-icon key="settings" color="hotpink" fontSize="40px"></svg-icon>
  `,
})
export class FooComponent {}
```

_Note_ that the `key` should be striclty typed based on your icons. You can also export the `SvgIcons` type from the library if you need it.

## Register icons locally

In lazy load modules or lazy routes, we can use the `provideSvgIcons` method, for register icons accessible locally in these modules:

```ts
import { dashboardIcon } from '@app/svg/dashboard';
import { userIcon } from '@app/svg/user';
import { provideSvgIcons } from '@ngneat/svg-icon';

@NgModule({
  declarations: [DashboardComponent],
  providers: [provideSvgIcons([userIcon])],
  imports: [DashboardRoutingModule],
})
export class DashboardModule {}

// OR in a Route def
{
  path: 'dashboard',
  providers: [provideSvgIcons([userIcon])],
  component: DashboardPageComponent
}
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
        plugins: ['removeDimensions'],
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
  providers: [provideSvgIcons(notificationsIcons)],
})
export class NotificationsModule {}
```

## Icon Sizing

To control the SVG size, we use the `font-size` property as described in this [article](https://css-tricks.com/control-icons-with-font-size/).
You also have the option to pass fixed sizes and use them across the application:

```ts
import { provideSvgIconsConfig } from '@ngneat/svg-icon';

bootstrapApplication(AppComponent, {
  providers: [
    provideSvgIconsConfig({
      sizes: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '25px',
        xxl: '30px',
      },
      defaultSize: 'md',
      icons,
    }),
  ],
});
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

You can also use the `injectRegisterIcons` method to register icons using the new `inject` API:

```ts
import { injectRegisterIcons } from '@ngneat/svg-icon';

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
  constructor() {
    injectRegisterIcons([Icon, Icon, Icon]);
  }
}
```

## Missing Icon

You can define **missingIconFallback** which will be used if icon is not found in registry:

```ts
import { provideSvgIconsConfig } from '@ngneat/svg-icon';
import { unknownIcon } from '@app/svg/unknown';

bootstrapApplication(AppComponent, {
  providers: [
    provideSvgIconsConfig({
      missingIconFallback: unknownIcon,
    }),
  ],
});
```

## Custom config file

The `svgGenerator` config object is placed by default in your main `package.json`.

It can also be placed in any location supported by the [Cosmiconfig library](https://github.com/davidtheclark/cosmiconfig) such as a custom `.svgGeneratorrc.json` file.

The config object is looked for in the project root directory by default.

If your config object is located in another directory, you can specify it through the `--config-dir` option of the `svg` CLI: `npm run svg --config-dir=/your/custom/dir/where/the/config/is/located`. The config object will then be looked for in all valid [Cosmiconfig library](https://github.com/davidtheclark/cosmiconfig) locations starting from that directory and going up the directory tree until a config is found.
