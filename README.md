<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

> A lightweight library that makes it easier to use SVG icons in your Angular Application

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

The `svg-icon` library enables using the `<svg-icon>` tag to directly display SVG icons in the DOM.
This approach offers an advantage over using an `<img>` tag or via the CSS `background-image` property, because it allows styling and animating the SVG with CSS.

For example, if the fill or stroke properties of elements in the svg are set to `currentColor`, they will have the color defined for the containing DOM element,. So the color can easily be changed by changing the color style on the `svg-icon` element.

## Installation

`ng add @ngneat/svg-icon`

This command will automatically preform the recommended flow (steps 2-4).

## Recommended Flow

### Icons Preparation

1. Add the icons to `src/assets/svg`
2. Use [svg-to-ts](https://github.com/kreuzerk/svg-to-ts) to clean and extract the icons content:

   ```json
   {
     "scripts": {
       "generate-icons": "svg-to-ts"
     },
     "svg-to-ts": {
       "generateType": "false",
       "delimiter": "KEBAB",
       "conversionType": "files",
       "iconsFolderName": "svg",
       "prefix": "app",
       "srcFiles": ["./src/assets/svg/*.svg"],
       "outputDirectory": "./src/app",
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

3. Run `npm run generate-icons`

   ### Icons Rendering

4. Import the `SvgIconsModule` in your `AppModule`, and register the icons:

   ```ts
   import { SvgIconsModule } from '@ngneat/svg-icon';

   import { appSettings } from '../svg/app-settings.icon';

   @NgModule({
     imports: [
       SvgIconsModule.forRoot({
         icons: [appSettings]
       })
     ],
     bootstrap: [AppComponent]
   })
   export class AppModule {}
   ```

5. Now you can use the `svg-icon` component:

   ```html
   // prettier-ignore
   <svg-icon key="settings"></svg-icon>
   <svg-icon key="settings" color="hotpink" fontSize="40px"></svg-icon>
   ```

In lazy load modules, you can use the `forChild` method:

```ts
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { appSettings } from '../svg/app-settings.icon';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SvgIconsModule.forChild([appSettings])]
})
export class DashboardModule {}
```

### Icon Sizing

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
        lg: '20px'
      },
      defaultSize: 'md'
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

### SvgIconRegistry

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
  styleUrls: ['./app.component.scss']
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

<a href="https://www.buymeacoffee.com/basalnetanel" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.netbasal.com/"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;" alt=""/><br /><sub><b>Netanel Basal</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=NetanelBasal" title="Code">💻</a> <a href="https://github.com/@ngneat/icons/commits?author=NetanelBasal" title="Documentation">📖</a> <a href="#ideas-NetanelBasal" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/theblushingcrow"><img src="https://avatars3.githubusercontent.com/u/638818?v=4" width="100px;" alt=""/><br /><sub><b>Inbal Sinai</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=theblushingcrow" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/shaharkazaz"><img src="https://avatars2.githubusercontent.com/u/17194830?v=4" width="100px;" alt=""/><br /><sub><b>Shahar Kazaz</b></sub></a><br /><a href="https://github.com/@ngneat/icons/commits?author=shaharkazaz" title="Code">💻</a> <a href="#ideas-shaharkazaz" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
</br>
Logo icon was made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
