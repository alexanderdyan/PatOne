
var tBody = d3.select("tbody");
var tHead = d3.select("thead");
var weeklyTable = d3.select("id", "weekly-table");

//Call the table class & link to html table (**where column names are located)
var tClass = d3.select("class", "table table-striped");
weeklyTable.attr("class", "table table-striped");

// Create & fill Html table in current html file.
// Takes an array of dictionary objects each representing an entry
function ClearAndFillWeeklyTable() {    
    tBody.html("");
    tHead.html("");
    
    d3.csv("data/Weekly_July_September.csv", function(obj) {
        var parsedString = obj.date.replace('/','-').split('-');
        return {
            Date : new Date(2020, parsedString[1] - 1, parsedString[0]),
            Neutral : obj.neutral,
            Negative : obj.neg,
            Positive : obj.pos,
            ClosingPTOTF : obj.closingPTOTF, 
            ClosingPATTO : obj.closingPATTO, 
            Covid: obj.covid19,
            Warrants: obj.warrants,
            Rev: obj.rev,
            Total : obj.total
        }
    }).then(function(data) {
        var dateData = [];
        var positiveData = [];
        var neutralData = [];
        var totalData = [];
        var negativeData = [];
        var closingStockPTOTF = [];
        var closingStockPATTO = [];
        var covidData = [];
        var warrantsData = [];
        var revData = [];

        data.forEach(function (currentEntry) {
            dateData.push(currentEntry.Date);
            neutralData.push(currentEntry.Neutral);
            positiveData.push(currentEntry.Positive);
            negativeData.push(currentEntry.Negative);
            closingStockPTOTF.push(currentEntry.ClosingPTOTF);
            closingStockPATTO.push(currentEntry.ClosingPATTO);
            if(currentEntry.Covid != -1)
                covidData.push(currentEntry.Covid)
            if(currentEntry.Warrants != -1)
                warrantsData.push(currentEntry.Warrants)
            if(currentEntry.Rev != -1)
                revData.push(currentEntry.Rev)                
            totalData.push(currentEntry.Total);
        });
        
        // Create our first trace
        var Neutral = {
            x: dateData,
            y: neutralData,
            type: "scatter",
            mode: "line",
            name:"Neutral",
            line:{ color:'rgb(125, 125, 125)', width:2 }
        };

        // Create our first trace
        var NeutralTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [neutralData[0],neutralData[neutralData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Neutral Trendline",
            line:{ color:'rgb(125, 125, 125)', width:2 }
        };

        // Create our first trace
        var Positives = {
            x: dateData,
            y: positiveData,
            type: "scatter",
            mode: "line",
            name:"Positive",
            line:{ color:'green', width:2 }
        };

        // Create our first trace
        var PositiveTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [positiveData[0],positiveData[positiveData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Positive Trendline",
            line:{ color:'green', width:2 }
        };
        // Create our first trace
        var Negatives = {
            x: dateData,
            y: negativeData,
            type: "scatter",
            mode: "line",
            name:"Negatives",
            line:{ color:'red', width:2 }
        };
        // Create our first trace
        var NegativesTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [negativeData[0],negativeData[negativeData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Negatives Trendline",
            line:{ color:'red', width:2 }
        };
        // Create our first trace
        var Totals = {
            x: dateData,
            y: totalData,
            type: "scatter",
            mode: "line",
            name:"Total",
            line:{ color:'black', width:2 }
        };
        // Create our first trace
        var TotalsTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [totalData[0],totalData[totalData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Totals Trendline",
            line:{ color:'black', width:2 }
        };

        var ClosingStockPricePTOTF = {
            x: dateData,
            y: closingStockPTOTF,
            yaxis: 'y2',
            type: "scatter",
            mode: "line",
            name:"PTOTF(USD)",
            line:{ color:'rgb(255, 255, 0)', width:2 }
        }
        var ClosingStockPricePATTO = {
            x: dateData,
            y: closingStockPATTO,
            yaxis: 'y3',
            type: "scatter",
            mode: "line",
            name:"PAT.TO(CAD)",
            line:{ color:'rgb(255, 169, 0)', width:2 }
        }

        var Covid19 = {
            x: dateData.slice(dateData.length - covidData.length),
            y: covidData,
            yaxis: 'y',
            type: "scatter",
            mode: "line",
            name:"Covid-19",
            line:{ color:'rgb(125, 0, 0)', width:2 }
        }
        
        var WarrantsTrend = {
            x: dateData.slice(dateData.length - warrantsData.length),
            y: warrantsData,
            yaxis: 'y',
            type: "scatter",
            mode: "line",
            name:"Warrants",
            line:{ color:'rgb(125, 125, 0)', width:2 }
        }
        var RevTrend = {
            x: dateData.slice(dateData.length - revData.length),
            y: revData,
            yaxis: 'y',
            type: "scatter",
            mode: "line",
            name:"Revenue",
            line:{ color:'blue', width:2 }
        }

        // The data array consists of both traces
        var traceData = [Neutral, Positives, Negatives, Covid19, WarrantsTrend, RevTrend, Totals, NeutralTrend, PositiveTrend, NegativesTrend, TotalsTrend, ClosingStockPricePTOTF, ClosingStockPricePATTO];        
        // Note that we omitted the layout object this time
        // This will use default parameters for the layout
        Plotly.newPlot("DataPlot", traceData,
        { 
            xaxis:
            {
                title: { text: 'Date' }
            },
            yaxis: 
            {
                title: { text: 'Number of Participants' },
                side: 'left'
            },
            yaxis2:
            {
                //title: { text: 'Closing Stock Price PTOTF' },
                overlaying: 'y',
                side: 'right',
                position:0.97,
                showticklabels:false
            },
            yaxis3:
            {
                //title: { text: 'Closing Stock Price PAT.TO' },
                overlaying: 'y',
                side: 'right',
                position:0.99,
                showticklabels:false
            },        
            "legend": {
                "x": 1.1
            },
        });        
        return data;
        

    })
}


// Create & fill Html table in current html file.
// Takes an array of dictionary objects each representing an entry
function ClearAndFillSentimentTable() {    
    tBody.html("");
    tHead.html("");
    
    d3.csv("data/Weekly_July_September.csv", function(obj) {
        var parsedString = obj.date.replace('/','-').split('-');
        return {
            Date : new Date(2020, parsedString[1] - 1, parsedString[0]),
            Neutral : obj.neutral,
            Negative : obj.neg,
            Positive : obj.pos,
            ClosingPTOTF : obj.closingPTOTF, 
            ClosingPATTO : obj.closingPATTO, 
            Total : obj.total
        }
    }).then(function(data) {
        var dateData = [];
        var positiveData = [];
        var neutralData = [];
        var totalData = [];
        var negativeData = [];
        var closingStockPTOTF = [];
        var closingStockPATTO = [];

        data.forEach(function (currentEntry) {
            dateData.push(currentEntry.Date);
            neutralData.push(currentEntry.Neutral);
            positiveData.push(currentEntry.Positive);
            negativeData.push(currentEntry.Negative);
            closingStockPTOTF.push(currentEntry.ClosingPTOTF);
            closingStockPATTO.push(currentEntry.ClosingPATTO);
            totalData.push(currentEntry.Total);
        });
        
        // Create our first trace
        var Neutral = {
            x: dateData,
            y: neutralData,
            type: "scatter",
            mode: "line",
            name:"Neutral",
            line:{ color:'blue', width:2 }
        };

        // Create our first trace
        var NeutralTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [neutralData[0],neutralData[neutralData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Neutral Trendline",
            line:{ color:'blue', width:2 }
        };

        // Create our first trace
        var Positives = {
            x: dateData,
            y: positiveData,
            type: "scatter",
            mode: "line",
            name:"Positive",
            line:{ color:'green', width:2 }
        };

        // Create our first trace
        var PositiveTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [positiveData[0],positiveData[positiveData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Positive Trendline",
            line:{ color:'green', width:2 }
        };
        // Create our first trace
        var Negatives = {
            x: dateData,
            y: negativeData,
            type: "scatter",
            mode: "line",
            name:"Negatives",
            line:{ color:'red', width:2 }
        };
        // Create our first trace
        var NegativesTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [negativeData[0],negativeData[negativeData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Negatives Trendline",
            line:{ color:'red', width:2 }
        };
        // Create our first trace
        var Totals = {
            x: dateData,
            y: totalData,
            type: "scatter",
            mode: "line",
            name:"Total",
            line:{ color:'black', width:2 }
        };
        // Create our first trace
        var TotalsTrend = {
            x: [dateData[0],dateData[dateData.length -1]] ,
            y: [totalData[0],totalData[totalData.length -1]] ,
            type: "scatter",
            mode: "line",
            name:"Totals Trendline",
            line:{ color:'black', width:2 }
        };

        var ClosingStockPricePTOTF = {
            x: dateData,
            y: closingStockPTOTF,
            yaxis: 'y2',
            type: "scatter",
            mode: "line",
            name:"PTOTF(USD)",
            line:{ color:'rgb(150, 170, 189)', width:2 }
        }
        var ClosingStockPricePATTO = {
            x: dateData,
            y: closingStockPATTO,
            yaxis: 'y3',
            type: "scatter",
            mode: "line",
            name:"PAT.TO(CAD)",
            line:{ color:'rgb(255, 169, 0)', width:2 }
        }

        // The data array consists of both traces
        var traceData = [Neutral, Positives, Negatives, Totals, NeutralTrend, PositiveTrend, NegativesTrend, TotalsTrend, ClosingStockPricePTOTF, ClosingStockPricePATTO];        
        // Note that we omitted the layout object this time
        // This will use default parameters for the layout
        Plotly.newPlot("DataPlot", traceData,
        { 
            xaxis:
            {
                title: { text: 'Date' }
            },
            yaxis: 
            {
                title: { text: 'Number of Participants' },
                side: 'left'
            },
            yaxis2:
            {
                //title: { text: 'Closing Stock Price PTOTF' },
                overlaying: 'y',
                side: 'right',
                position:0.97,
                showticklabels:false
            },
            yaxis3:
            {
                //title: { text: 'Closing Stock Price PAT.TO' },
                overlaying: 'y',
                side: 'right',
                position:0.99,
                showticklabels:false
            },        
            "legend": {
                "x": 1.1
            },
        });        
        return data;
        

    })
}

ClearAndFillWeeklyTable();