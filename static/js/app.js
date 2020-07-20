
var tBody = d3.select("tbody");
var tHead = d3.select("thead");
var ufoTable = d3.select("id", "ufo-table");

//Call the table class & link to html table (**where column names are located)
var tClass = d3.select("class", "table table-striped");
ufoTable.attr("class", "table table-striped");

// Create & fill Html table in current html file.
// Takes an array of dictionary objects each representing an entry
function ClearAndFillTable() {    
    tBody.html("");
    tHead.html("");
    
    d3.csv("data/Weekly_Feb_July2020.csv", function(obj) {
        var parsedString = obj.date.replace('/','-').split('-');
        return {
            Date : new Date(2020, parsedString[1] - 1, parsedString[0]),
            Neutral : obj.neutral,
            Negative : obj.neg,
            Positive : obj.pos,
            Total : obj.total
        }
    }).then(function(data) {
        console.log(data)
        var dateData = [];
        var positiveData = [];
        var neutralData = [];
        var totalData = [];
        var negativeData = [];

        data.forEach(function (currentEntry) {
            dateData.push(currentEntry.Date);
            neutralData.push(currentEntry.Neutral);
            positiveData.push(currentEntry.Positive);
            negativeData.push(currentEntry.Negative);
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
        var Positives = {
            x: dateData,
            y: positiveData,
            type: "scatter",
            mode: "line",
            name:"Positive",
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
        var Totals = {
            x: dateData,
            y: totalData,
            type: "scatter",
            mode: "line",
            name:"Total",
            line:{ color:'black', width:2 }
        };

        // The data array consists of both traces
        var traceData = [Neutral, Positives, Negatives, Totals];        
        // Note that we omitted the layout object this time
        // This will use default parameters for the layout
        Plotly.newPlot("DataPlot", traceData);        
        return data;
        

    })
}

ClearAndFillTable();