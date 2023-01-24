import { html, css, LitElement } from 'lit';

const d3 = window.d3;

class DonutChart extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  `;

  static properties = {
    data: { type: Array },
  };

  get svg() {
    return d3.select(this.shadowRoot.querySelector('.chart'))
  }

  constructor() {
    super();

    this.data = [2, 4, 8, 10];
    this.colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b"];
  }

  updated(changedProps) {
    if (changedProps.has('data')) {
      this._buildChart(this.svg);
    }
  }

  _buildChart(svg) {
    const width = svg.attr("width");
    const height = svg.attr("height");
    const radius = Math.min(width, height) / 2;
    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal(this.colors);

    // Generate the pie
    const pie = d3.pie();

    // Generate the arcs
    const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    //Generate groups
    const arcs = g.selectAll("arc")
                .data(pie(this.data))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);
  }

  render() {
    return html`<svg width="300" height="200" class="chart"> </svg>`;
  }
}

export {
  DonutChart,
}