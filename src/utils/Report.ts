class Report {
  constructor() {
    this.cache = { source: null, analyses: null, report: null, rlines: null };
  }

  display(rlines) {
    // Use cached HTMl content if there is no updated data.
    if (rlines == null) {
      rlines = this.cache.rlines;
    } else {
      this.cache.rlines = rlines;
      this.cache.report = {};
    }

    // Build and display the report HTML.
    let linesOutput = [];
    for (let i = 0; i < Math.min(rlines.length); i++) {
      const row = i + 1;
      if (row in this.cache.report) {
        linesOutput.push(this.cache.report[row]);
      } else {
        const html = rlines[i];
        linesOutput.push(html);
        this.cache.report[row] = html;
      }
    }

    console.log("linesOutput: ", linesOutput);
    // document.getElementById("report").innerHTML =
    //   '<div id="detail"></div>' + linesOutput.join("");

    // // Set up event handlers for detail tooltips.
    // const elements = document.getElementsByClassName("detail");
    // for (let i = 0; i < elements.length; i++) {
    //   const element = elements[i];
    //   element.addEventListener("mouseover", function (event) {
    //     const detail = document.getElementById("detail");
    //     detail.style.display = "block";
    //     detail.style.top = element.offsetTop + 24 + "px";
    //     detail.style.left =
    //       element.offsetLeft +
    //       element.getBoundingClientRect().width -
    //       16 +
    //       "px";
    //     detail.innerHTML = element.dataset.detail;
    //   });
    //   element.addEventListener("mouseout", function (event) {
    //     const detail = document.getElementById("detail");
    //     detail.style.display = "none";
    //   });
    // }
  }
}

export default Report;
