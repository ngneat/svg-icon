import { createHostFactory, Spectator } from '@ngneat/spectator';
import { fromSvgProps, SvgIconComponent, SvgIconsModule } from '@ngneat/icons';
import * as icons from '../../../../../src/assets/svg/my-icons.model';

describe('SvgIconComponent', () => {
  let spectator: Spectator<SvgIconComponent>;
  const createHost = createHostFactory({
    component: SvgIconComponent,
    imports: [
      SvgIconsModule.forRoot({
        icons: fromSvgProps(icons),
        sizes: {
          md: '20px',
          lg: '40px'
        }
      })
    ]
  });

  it('should render the icon', () => {
    const spectator = createHost(`<svg-icon key="location"></svg-icon>`);
    expect(spectator.queryHost(`.svg-icon-location`)).toExist();
    expect(spectator.hostElement.querySelector('svg')).toExist();
  });

  it('should support color', () => {
    const spectator = createHost(`<svg-icon key="location" color="#fff"></svg-icon>`);
    expect(spectator.element).toHaveStyle({ color: '#fff' });
  });

  it('should support fontSize', () => {
    const spectator = createHost(`<svg-icon key="location" fontSize="20px"></svg-icon>`);
    expect(spectator.element).toHaveStyle({ fontSize: '20px' });
  });

  it('should support size', () => {
    const spectator = createHost(`<svg-icon key="location" size="lg"></svg-icon>`);
    expect(spectator.element).toHaveStyle({ fontSize: '40px' });
  });

  it('should support dynamic', () => {
    const spectator = createHost(`<svg-icon [key]="icon"></svg-icon>`, { hostProps: { icon: 'location' } });
    expect(spectator.queryHost(`.svg-icon-location`)).toExist();
    spectator.setHostInput({ icon: 'settings' });
    expect(spectator.queryHost(`.svg-icon-settings`)).toExist();
    expect(spectator.queryHost(`.svg-icon-location`)).not.toExist();
  });
});
