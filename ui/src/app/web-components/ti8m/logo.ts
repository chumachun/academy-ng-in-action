import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

// Extend the LitElement base class
// export the class, so it can be imported where it is needed
export class LogoCustomComponent extends LitElement {
  static override styles = css`
    :host {
      float: left;
      padding: 0 32px;
      cursor: pointer;
    }

    a {
      height: 55px;
      display: inline-block;
    }

    img {
      max-height: 60%;
      vertical-align: middle;
      max-width: 100%;
    }
  `;

  @property({ type: String }) imgSrc;

  constructor() {
    super();
    this.imgSrc = 'https://www.ti8m.ch/dam/jcr:f379c49b-e63c-45a2-8651-3c3bda876ee6/Logo_o.svg';
  }

  override render() {
    return html`
      <a>
        <img src="${this.imgSrc}" alt="" />
      </a>
    `;
  }
}
