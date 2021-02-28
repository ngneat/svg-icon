import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { SvgIconComponent } from './svg-icon.component';
import { SvgIconsModule } from './svg-icons.module';
import { dashboardIcon } from 'src/app/svg/dashboard';
import { settingsIcon } from 'src/app/svg/settings';

describe('SvgIconComponent', () => {
  let host: SpectatorHost<SvgIconComponent, Partial<SvgIconComponent>>;

  const createHost = createHostFactory({
    component: SvgIconComponent,
    declareComponent: false,
    imports: [SvgIconsModule.forRoot({
      icons: [dashboardIcon, settingsIcon]
    })]
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
        key: 'dashboard'
      }
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
        color: 'white'
      }
    });

    expect(host.element.style.color).toBe('white');
    host.setHostInput('color', 'red');
    expect(host.element.style.color).toBe('red');
  });

  it('should change font size', () => {
    host = createHost(`<svg-icon [key]="key" [fontSize]="fontSize"></svg-icon>`, {
      hostProps: {
        key: 'dashboard',
        fontSize: '20px'
      }
    });

    expect(host.element.style.fontSize).toBe('20px');
    host.setHostInput('fontSize', '50px');
    expect(host.element.style.fontSize).toBe('50px');
  });

  it('should change width and height', () => {
    host = createHost(`<svg-icon key="dashboard" width="50px" height="50px"></svg-icon>`);

    expect(host.element.style.width).toBe('50px');
    expect(host.element.style.height).toBe('50px');
  });

  it('should set the default size', () => {
    host = createHost(`<svg-icon key="dashboard"></svg-icon>`);

    expect(host.element.style.fontSize).toBe('1rem');
  });

  it('should respect sizes', () => {
    host = createHost(`<svg-icon key="dashboard" [size]="size"></svg-icon>`, {
      hostProps: {
        size: 'md'
      }
    });

    expect(host.element.style.fontSize).toBe('1rem');
    host.setHostInput('size', 'lg');
    expect(host.element.style.fontSize).toBe('1.5rem');
  });

});


describe('SvgIconComponent Custom Sizes', () => {
  let host: SpectatorHost<SvgIconComponent, Partial<SvgIconComponent>>;

  const createHost = createHostFactory({
    component: SvgIconComponent,
    declareComponent: false,
    imports: [SvgIconsModule.forRoot({
      defaultSize: 'lg',
      sizes: {
        sm: '16px',
        md: '32px',
        lg: '64px'
      },
      icons: [dashboardIcon, settingsIcon]
    })]
  });

  it('should set the default size', () => {
    host = createHost(`<svg-icon key="dashboard"></svg-icon>`);

    expect(host.element.style.fontSize).toBe('64px');
  });

  it('should respect sizes', () => {
    host = createHost(`<svg-icon key="dashboard" [size]="size"></svg-icon>`, {
      hostProps: {
        size: 'md'
      }
    });

    expect(host.element.style.fontSize).toBe('32px');
    host.setHostInput('size', 'sm');
    expect(host.element.style.fontSize).toBe('16px');
  });
})