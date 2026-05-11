import { LitElement, html, css } from 'lit';

// Extend the LitElement base class
// export the class, so it can be imported where it is needed
export class NavBarCustomComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .tim-nav-bar {
      height: 55px;
      max-height: 55px;
      line-height: 53px;
      border-bottom: 1px solid #ccc;
    }
  `;

  override render() {
    return html`
      <div class="tim-nav-bar">
        <slot></slot>
      </div>
    `;
  }
}
