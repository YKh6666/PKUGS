(function () {
  function renderFallback(container, message) {
    if (!container) {
      return;
    }
    container.textContent = message;
    container.classList.add("overview-chart-fallback");
  }

  function initOverviewChart() {
    var chartContainer = document.getElementById("overview-chartdiv");
    if (!chartContainer) {
      return;
    }

    if (!window.am5 || !window.am5percent || !window.am5themes_Animated) {
      renderFallback(chartContainer, "Chart library failed to load");
      return;
    }

    window.am5.ready(function () {
      var root = window.am5.Root.new("overview-chartdiv");

      root.setThemes([window.am5themes_Animated.new(root)]);

      var chart = root.container.children.push(
        window.am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          innerRadius: window.am5.percent(12),
        })
      );

      var bgColor = root.interfaceColors.get("background");

      var level1Series = chart.series.push(
        window.am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          alignLabels: false,
          radius: window.am5.percent(58),
          innerRadius: window.am5.percent(18),
        })
      );

      level1Series.ticks.template.setAll({ forceHidden: true });
      level1Series.labels.template.setAll({ forceHidden: true });
      level1Series.slices.template.setAll({
        templateField: "sliceSettings",
        stroke: bgColor,
        strokeWidth: 2,
        tooltipText: "一级分类\n{category}: {valuePercentTotal.formatNumber('0.0')}% ({value})",
      });
      level1Series.slices.template.states.create("hover", { scale: 0.96 });

      var level2Series = chart.series.push(
        window.am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          alignLabels: true,
          radius: window.am5.percent(96),
          innerRadius: window.am5.percent(61),
        })
      );

      level2Series.labels.template.setAll({
        oversizedBehavior: "truncate",
        maxWidth: 110,
        fontSize: 11,
      });
      level2Series.slices.template.setAll({
        templateField: "sliceSettings",
        stroke: bgColor,
        strokeWidth: 2,
        tooltipText: "{parentCategory} / {category}: {valuePercentTotal.formatNumber('0.0')}% ({value})",
      });
      level2Series.slices.template.states.create("hover", { scale: 0.97 });

      var level1Data = [
        {
          category: "Raw Capture",
          value: 42,
          sliceSettings: { fill: window.am5.color(0x0f766e) },
        },
        {
          category: "Reconstruction",
          value: 33,
          sliceSettings: { fill: window.am5.color(0x1d4ed8) },
        },
        {
          category: "Outputs",
          value: 25,
          sliceSettings: { fill: window.am5.color(0xf59e0b) },
        },
      ];

      var level2Data = [
        {
          category: "Raw Video",
          parentCategory: "Raw Capture",
          value: 18,
          sliceSettings: { fill: window.am5.color(0x14b8a6) },
        },
        {
          category: "Extracted Frames",
          parentCategory: "Raw Capture",
          value: 14,
          sliceSettings: { fill: window.am5.color(0x2dd4bf) },
        },
        {
          category: "Flight Metadata",
          parentCategory: "Raw Capture",
          value: 10,
          sliceSettings: { fill: window.am5.color(0x5eead4) },
        },
        {
          category: "Sparse COLMAP",
          parentCategory: "Reconstruction",
          value: 13,
          sliceSettings: { fill: window.am5.color(0x2563eb) },
        },
        {
          category: "Dense COLMAP",
          parentCategory: "Reconstruction",
          value: 11,
          sliceSettings: { fill: window.am5.color(0x3b82f6) },
        },
        {
          category: "Camera Calib",
          parentCategory: "Reconstruction",
          value: 9,
          sliceSettings: { fill: window.am5.color(0x60a5fa) },
        },
        {
          category: "3DGS Checkpoints",
          parentCategory: "Outputs",
          value: 10,
          sliceSettings: { fill: window.am5.color(0xf59e0b) },
        },
        {
          category: "PLY Exports",
          parentCategory: "Outputs",
          value: 8,
          sliceSettings: { fill: window.am5.color(0xfbbf24) },
        },
        {
          category: "Compressed Packs",
          parentCategory: "Outputs",
          value: 7,
          sliceSettings: { fill: window.am5.color(0xfcd34d) },
        },
      ];

      level1Series.data.setAll(level1Data);
      level2Series.data.setAll(level2Data);

      level1Series.appear(1000, 100);
      level2Series.appear(1000, 100);

      window.addEventListener(
        "beforeunload",
        function () {
          root.dispose();
        },
        { once: true }
      );
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOverviewChart, { once: true });
  } else {
    initOverviewChart();
  }
})();
