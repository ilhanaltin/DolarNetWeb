import { CurrencyHistoryDataVM } from './../../../../models/integration/currency/CurrencyHistoryDataVM';
import { Component, OnInit, NgZone } from '@angular/core';
import { CurrencyService } from 'src/app/main/services/currency.service';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';
import { CurrencyHistorySearchCriteriaVM } from 'src/app/main/models/integration/currency/CurrencyHistorySearchCriteriaVM';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_tr_TR from "@amcharts/amcharts4/lang/tr_TR";
import { formatDate } from '@angular/common';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'currency-graph',
  templateUrl: './currency-graph.component.html',
  styleUrls: ['./currency-graph.component.css']
})
export class CurrencyGraphComponent implements OnInit {

  currencyHistoryRates: CurrencyHistoryDataVM[];
  readonly _globalConstants = GlobalConstants;
  private chart: am4charts.XYChart;
  code: string;
  header: string;
  period: number;

  constructor(private _currencyService: CurrencyService,
    private route: ActivatedRoute,
    private zone: NgZone) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe((params : ParamMap)=> { 
         this.code = params.get('code');
         this.period = this._globalConstants.DatePeriod.Week;
          this.generateGraph();  
          
          this.header = this.code + " - " + this.getCurrencyName(this.code);
      });  
  }

  generateGraph()
  {
      let criteria =new CurrencyHistorySearchCriteriaVM();
      criteria.period = this.period == null ? this._globalConstants.DatePeriod.Week : this.period;
      criteria.code = this.code;

      this._currencyService.getHistory(criteria).subscribe(resp=>{
        this.currencyHistoryRates = resp.result.currencyHistoryList;
        this.viewHistoryGraph();
      });
  }

  viewHistoryGraph() {

    this.zone.runOutsideAngular(() => {
        this.chart = am4core.create("chartdiv", am4charts.XYChart);              

        // Add data
        let data = [];
        this.currencyHistoryRates.forEach(hist => {
            data.push({ date: hist.date, value: hist.price.toString()});
        });

        this.chart.data = data;

        this.chart.language.locale = am4lang_tr_TR;
        this.chart.numberFormatter.numberFormat = "#,###";

        // Create axes
        let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;

        let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        //valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        // Create series
        let series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.strokeWidth = 3;
        series.fillOpacity = 0.5;
        series.tooltipText = "{valueY.value}";

        // Add horizontal scrollbar
        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        this.chart.scrollbarX = scrollbarX;

        // Add cursor
        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.behavior = "zoomY";
        this.chart.cursor.lineX.disabled = true;
    });
  }

  setPeriod(_period){
      this.period = _period;
      this.chart.data = [];
      this.generateGraph();
  }

  getCurrencyName(code: string) : string
  {
      return this._globalConstants.symbolNames[this._globalConstants.symbols.indexOf(code)];
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}