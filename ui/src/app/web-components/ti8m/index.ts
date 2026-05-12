import { LogoCustomComponent } from './logo';
import { NavBarCustomComponent } from './nav-bar';
import { NavItemCustomComponent } from './nav-item';
import { NavItemGroupCustomComponent } from './nav-item-group';
import { NavItemUserCustomComponent } from './nav-item-user';

export function defineCustomComponents() {
  customElements.define('tim-logo', LogoCustomComponent);
  customElements.define('tim-nav-bar', NavBarCustomComponent);
  customElements.define('tim-nav-item', NavItemCustomComponent);
  customElements.define('tim-nav-item-group', NavItemGroupCustomComponent);
  customElements.define('tim-nav-item-user', NavItemUserCustomComponent);
}
