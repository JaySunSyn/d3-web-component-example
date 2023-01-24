import {html, css, LitElement} from 'lit';

import '../donut-chart.js';

export class AppShell extends LitElement {
  static styles = css`p { color: blue }`;

  static properties = {
    name: {type: String},
  };

  constructor() {
    super();
  }

  render() {
    return html`<donut-chart></donut-chart>`;
  }
}
