
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
    
    d3.csv("data/PatOneData.csv", function(obj) {
        var parsedString = obj.date.replace('/','-').split('-');
        return {
            Date : new Date(parsedString[2], parsedString[1] - 1, parsedString[0]),
            Neutral : obj.Neutral,
            Mission : obj.Mission,
            FullSuite : obj.FullSuite,
            LongTerm : obj.LongTerm,
            Negative : obj.Negative,
            Doubts : obj.Doubts,
            Hopes : obj.Hopes,
            SampleSize : obj.SampleSize,
            RealSampleSize : obj.RealSampleSize
        }
    }).then(function(data) {
        var dateData = [];
        var neutralData = [];
        var missionData = [];
        var fullSuiteData = [];
        var longTermData = [];
        var negativeData = [];
        var doubtsData = [];
        var hopesData = [];

        data.forEach(function (currentEntry) {
            dateData.push(currentEntry.Date);
            neutralData.push(currentEntry.Neutral);
            missionData.push(currentEntry.Mission);
            
            fullSuiteData.push(currentEntry.FullSuite);
            longTermData.push(currentEntry.LongTerm);
            negativeData.push(currentEntry.Negative);
            doubtsData.push(currentEntry.Doubts);
            hopesData.push(currentEntry.Hopes);
        });
        
        // Create our first trace
        var Neutral = {
            x: dateData,
            y: neutralData,
            type: "scatter",
            mode: "line",
            name:"Neutral"
        };
        // Create our first trace
        var Mission = {
            x: dateData,
            y: missionData,
            type: "scatter",
            mode: "line",
            name:"Mission"
        };
        
        // Create our first trace
        var FullSuite = {
            x: dateData,
            y: fullSuiteData,
            type: "scatter",
            mode: "line",
            name:"FullSuite"
        };
        // Create our first trace
        var LongTerm = {
            x: dateData,
            y: longTermData,
            type: "scatter",
            mode: "line",
            name:"LongTerm"
        };
        // Create our first trace
        var Negatives = {
            x: dateData,
            y: negativeData,
            type: "scatter",
            mode: "line",
            name:"Negatives"
        };
        // Create our first trace
        var Doubts = {
            x: dateData,
            y: doubtsData,
            type: "scatter",
            mode: "line",
            name:"Doubts"
        };
        // Create our first trace
        var Hopes = {
            x: dateData,
            y: hopesData,
            type: "scatter",
            mode: "line",
            name:"Hopes"
        };

        // The data array consists of both traces
        var traceData = [Neutral, Mission, FullSuite, LongTerm, Negatives, Doubts, Hopes];        
        // Note that we omitted the layout object this time
        // This will use default parameters for the layout
        Plotly.newPlot("DataPlot", traceData);        
        return data;
        

    })
}

ClearAndFillTable();