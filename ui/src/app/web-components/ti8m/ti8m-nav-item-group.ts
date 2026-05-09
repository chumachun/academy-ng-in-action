import { LitElement, html, css } from 'lit';

// Extend the LitElement base class
// export the class, so it can be imported where it is needed
export class Ti8mNavItemGroupCustomComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
      float: right;
      height: 55px;
    }

    ul {
      list-style: none;
      padding-left: 0;
    }

    .menu {
      width: 100%;
      height: 55px;
      font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 0;
    }

    .tim-nav-bar-group {
      float: right;
      height: 55px;
    }
  `;

  override render() {
    return html`
      <div class="tim-nav-bar-group">
        <div class="module left">
          <ul class="menu">
            <slot></slot>
          </ul>
        </div>
      </div>
    `;
  }
}
