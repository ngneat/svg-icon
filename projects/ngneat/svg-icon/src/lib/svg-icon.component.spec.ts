import { missingIcon } from '@app/svg/missing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { dashboardIcon } from 'src/app/svg/dashboard';
import { settingsIcon } from 'src/app/svg/settings';

import { SvgIconComponent } from './svg-icon.component';
import { provideSvgIcons, provideSvgIconsConfig } from './providers';

describe('SvgIconComponent', () => {
  let host: SpectatorHost<SvgIconComponent>;

  const createHost = createHostFactory({
    component: SvgIconComponent,
    providers: [provideSvgIcons([dashboardIcon, settingsIcon])],
  });

  it('should render the svg', () => {
    host = createHost(`<svg-icon key="dashboard"></svg-icon>`);
    expect(host.hostElement.querySelector('.svg-icon-dashboard')).toExist();
    expect(host.hostElement.querySelector('.svg-icon-dashboard')?.innerHTML).toContain('<svg');
  });

  it('should set the role attribute', () => {
    host = createHost(`<svg-icon key="dashboard"></svg-icon>`);
    expect(host.element).toHaveAttribute('role', 'img');
  });

  it('should change icons', () => {
    host = createHost(`<svg-icon [key]="key"></svg-icon>`, {
      hostProps: {
        key: 'dashboard',
      },
    });

    expect(host.hostElement.querySelector('.svg-icon-dashboard')).toExist();
    host.setHostInput('key', 'settings');
    expect(host.hostElement.querySelector('.svg-icon-dashboard')).not.toExist();
    expect(host.hostElement.querySelector('.svg-icon-settings')).toExist();
  });

  it('should change colors', () => {
    host = createHost(`<svg-icon [key]="key" [color]="color"></svg-icon>`, {
      hostProps: {
        key: 'dashboard',
        color: 'white',
      },
    });

    expect(host.element.style.color).toBe('var(--svg-icon-color, white)');
    host.setHostInput('color', 'red');
    expect(host.element.style.color).toBe('var(--svg-icon-color, red)');
  });

  it('should not assign falsy height', () => {
    host = createHost(`<svg-icon [key]="key" [height]="height"></svg-icon>`, {
      hostProps: {
        key: 'dashboard',
        height: undefined,
      },
    });

    expect(host.element.style.height).toBe('');
  });

  it('should not assign falsy width', () => {
    host = createHost(`<svg-icon [key]="key" [width]="width"></svg-icon>`, {
      hostProps: {
        key: 'dashboard',
        width: undefined,
      },
    });

    expect(host.element.style.width).toBe('');
  });

  it('should not assign falsy color', () => {
    host = createHost(`<svg-icon [key]="key" [color]="color"></svg-icon>`, {
      hostProps: {
        key: 'dashboard',
        color: undefined,
      },
    });

    expect(host.element.style.color).toBe('');
  });

  it('should change font size', () => {
    host = createHost(`<svg-icon [key]="key" [fontSize]="fontSize"></svg-icon>`, {
      hostProps: {
        key: 'dashboard',
        fontSize: '20px',
      },
    });

    expect(host.element.style.fontSize).toBe('20px');
    host.setHostInput('fontSize', '50px');
    expect(host.element.style.fontSize).toBe('50px');
  });

  it('should change width and height', () => {
    host = createHost(`<svg-icon key="dashboard" width="50px" height="50px"></svg-icon>`);

    expect(host.element.style.width).toBe('var(--svg-icon-width, 50px)');
    expect(host.element.style.height).toBe('var(--svg-icon-height, 50px)');
  });

  it('should set the default size', () => {
    host = createHost(`<svg-icon key="dashboard"></svg-icon>`);

    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-md, 1rem)');
  });

  it('should set the default size when passing undefined size properties', () => {
    host = createHost(`<svg-icon key="dashboard" [fontSize]="fontSize" [size]="size"></svg-icon>`);

    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-md, 1rem)');
  });

  it('should set the size when passing undefined fontSize property', () => {
    host = createHost(`<svg-icon key="dashboard" [fontSize]="fontSize" [size]="size"></svg-icon>`, {
      hostProps: {
        size: 'lg',
      },
    });

    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-lg, 1.5rem)');
  });

  it('should respect sizes', () => {
    host = createHost(`<svg-icon key="dashboard" [size]="size"></svg-icon>`, {
      hostProps: {
        size: 'md',
      },
    });

    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-md, 1rem)');
    host.setHostInput('size', 'lg');
    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-lg, 1.5rem)');
  });

  describe('noShrink', () => {
    it('should add minWidth when passing noShrink true', () => {
      host = createHost(`<svg-icon [noShrink]="true" key="dashboard"></svg-icon>`);

      expect(host.element.style.minWidth).toBe('var(--svg-icon-font-size-md, 1rem)');
    });

    it('should support size changes', () => {
      host = createHost(`<svg-icon [noShrink]="true" key="dashboard" [size]="size"></svg-icon>`, {
        hostProps: {
          size: 'md',
        },
      });

      expect(host.element.style.minWidth).toBe('var(--svg-icon-font-size-md, 1rem)');
      host.setHostInput('size', 'lg');
      expect(host.element.style.minWidth).toBe('var(--svg-icon-font-size-lg, 1.5rem)');
    });
  });
});

describe('SvgIconComponent Custom Sizes', () => {
  let host: SpectatorHost<SvgIconComponent>;

  const createHost = createHostFactory({
    component: SvgIconComponent,
    providers: [
      provideSvgIconsConfig({
        defaultSize: 'lg',
        sizes: {
          sm: '16px',
          md: '32px',
          lg: '64px',
        },
        icons: [dashboardIcon, settingsIcon],
      }),
    ],
  });

  it('should set the default size', () => {
    host = createHost(`<svg-icon key="dashboard"></svg-icon>`);

    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-lg, 64px)');
  });

  it('should respect sizes', () => {
    host = createHost(`<svg-icon key="dashboard" [size]="size"></svg-icon>`, {
      hostProps: {
        size: 'md',
      },
    });

    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-md, 32px)');
    host.setHostInput('size', 'sm');
    expect(host.element.style.fontSize).toBe('var(--svg-icon-font-size-sm, 16px)');
  });
});

describe('SvgIconComponent without Missing Icon', () => {
  let host: SpectatorHost<SvgIconComponent>;

  const createHost = createHostFactory({
    component: SvgIconComponent,
    providers: [provideSvgIcons(settingsIcon)],
  });

  it('should not render unknown or missing icon', () => {
    host = createHost(`<svg-icon key="unknown"></svg-icon>`);

    expect(host.hostElement.querySelector('.svg-icon-missing')?.innerHTML).not.toContain('<svg');
  });
});

describe('SvgIconComponent with Missing Icon', () => {
  let host: SpectatorHost<SvgIconComponent>;

  const createHost = createHostFactory({
    component: SvgIconComponent,
    providers: [
      provideSvgIcons(settingsIcon),
      provideSvgIconsConfig({
        missingIconFallback: missingIcon,
      }),
    ],
  });

  it('should render missing icon ', () => {
    host = createHost(`<svg-icon key="unknown"></svg-icon>`);

    expect(host.hostElement.querySelector('.svg-icon-unknown')).toExist();
    expect(host.hostElement.querySelector('.svg-icon-unknown')?.innerHTML).toContain('<svg');
  });
});
