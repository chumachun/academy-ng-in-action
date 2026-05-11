import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

// Extend the LitElement base class
// export the class, so it can be imported where it is needed
export class NavItemCustomComponent extends LitElement {
  static override styles = css`
    :host {
      font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      outline: 0;
      cursor: pointer;
    }

    :host(:hover) a {
      opacity: 1 !important;
    }

    :host(.active) a {
      opacity: 1 !important;
    }

    li {
      margin-right: 32px;
      float: left;
      position: relative;
      transition: all 0.3s ease;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      opacity: 1;
    }

    a {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
      color: #292929;
      opacity: 0.5;
      transition: all 0.3s ease;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      max-width: 100%;
      white-space: normal;
      text-decoration: none;
      outline: 0;
    }
  `;

  @property({ type: String }) href;
  @property({ type: String }) override title;

  constructor() {
    super();
    this.href = '';
    this.title = 'Not defined';
  }

  override render() {
    return html` <li>${this.title}</li> `;
  }
}
