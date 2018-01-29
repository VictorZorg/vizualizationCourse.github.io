var cnt = 0;
var curr_header = '';




d3.json("countries_1995_2012.json", function(error, data){

        nn_data = [];

        color_map = {
            'Americas': '#905a99',
            'Africa': '#d08485',
            'Asia': '#658552',
            'Europe': '#98b1ef',
            'Oceania': '#e7da7b'
        }

        for (i=0; i< data.length; i++) {
            for (j=0; j<data[i]['years'].length; j++) {
                obj = {
                    'name': data[i]['name'],
                    'continent': data[i]['continent'],
                    'gdp': data[i]['years'][j]['gdp'],
                    'life_expectancy': data[i]['years'][j]['life_expectancy'],
                    'population': data[i]['years'][j]['population'],
                    'year': data[i]['years'][j]['year'],
                    'color': color_map[data[i]['continent']]
                }
                nn_data.push(obj);
            }
        }

        data = nn_data;


        var desired_cols = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year']

        var columns = desired_cols;

        var table = d3.select("#table-container").append("table"),
            thead = table.append("thead").attr("class", "thead");
        tbody = table.append("tbody");

        table.append("caption").html("World Countries Ranking");


        d3.selectAll('.myCheckbox').on("change",update);
        d3.selectAll('.aggregation').on("change",update);
        d3.selectAll('.sort_by_key').on("change",update);
        d3.selectAll('.encoder').on("change",update);
        d3.select('.range').on("change", update);

        var agg = 'None';
        var sorting = 'population';
        var encode = 'population';


        function setAgg() {

            d3.selectAll(".aggregation").each(function (d) {
                rb = d3.select(this);
                if (rb.property('checked')) {
                    agg = rb.property("value");
                }
            });
        }




        function update(){

            d3.select('thead').remove();
            d3.select('tbody').remove();

            d3.selectAll('g').remove();
            d3.selectAll('svg').remove();



            thead = table.append("thead").attr("class", "thead");

            tbody = table.append("tbody");


            var continent_check = [];
            d3.selectAll(".myCheckbox").each(function(d){
                cb = d3.select(this);
                if(cb.property("checked")){
                    continent_check.push(cb.property("value"));
                }
            });


            var curr_year = d3.select('.range').property('value');




            if (continent_check.length == 0) {
                continent_check = ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];
            }

            data1 = data.filter(function(d,i){
                return continent_check.includes(d['continent']) && d['year'] == curr_year;
            });


            setAgg();


            if (agg == "byCont") {
                data1 = d3.nest()
                    .key(function (d) { return d['continent']; })
                    .rollup(function (rws) {
                        var aggTable = {
                            gdp: 0,
                            continent: rws[0]['continent'],
                            name: rws[0]['continent'],
                            life_expectancy: 0,
                            population: 0,
                            year: rws[0]['year']
                        };

                        var numberOfCountries = 0;
                        rws.forEach(function (rw) {
                            numberOfCountries++;

                            aggTable['gdp'] += rw['gdp'];
                            aggTable['life_expectancy'] += rw['life_expectancy'];
                            aggTable['population'] += rw['population'];

                        });

                        aggTable['life_expectancy'] /= numberOfCountries;

                        return aggTable;
                    }).entries(data1);


                data1 = data1.map(function (dict) {return dict.value;});


            }


            d3.selectAll(".encoder").each(function (d) {
                var rb = d3.select(this);
                if (rb.property('checked')) {
                    encode = rb.property("value");
                }
            });

            d3.selectAll(".sort_by_key").each(function (d) {
                var rb = d3.select(this);
                if (rb.property('checked')) {
                    sorting = rb.property("value");
                }
            });





            data1 = data1.sort(function(a, b) {
                return d3.descending(a[sorting], b[sorting]);
            });


            //------------------------------------------------------------------------------------------------------------------------


            var margin = {top: 50, bottom: 10, left:300, right: 40};
            var width = 1200 - margin.left - margin.right;
            var height = data1.length * 21;

            var svg = d3.select("body").append("svg")
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom);


            var xScale = d3.scaleLinear().range([0, width]);
            var yScale = d3.scaleBand().rangeRound([0, height], .8, 0);


            var max = d3.max(data1, d => d[encode]);
            var min = 0;

            xScale.domain([min, max]);
            yScale.domain(data1.map(function (d) {
                return d.name;
            }));

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var groups = g.append("g")
                .selectAll("text")
                .data(data1)
                .enter()
                .append("g");

            groups.append("text")
                .text(d => d.name)
                .attr("x", xScale(min) - 10)
                .attr("y", function (d) {
                    return yScale(d.name) + 9;
                }).attr("dy", ".35em")
                .attr("text-anchor", "end");


            var div = d3.select("body").append("div").attr("class", "toolTip");


            function format_output(arr, feature) {
                if (feature == 'gdp') {
                    return d3.format(".3s")(arr[feature]);
                }
                if (feature == 'life_expectancy') {
                    return d3.format(".1f")(arr[feature]);
                }
                if (feature == 'population') {
                    return d3.format(",")(arr[feature]);
                }

                return arr[feature];
            };



            var bars = groups
                .append("rect")
                .attr("width", function (d) {
                    return xScale(d[encode]);
                })
                .attr("height", 18)
                .attr("x", xScale(min))
                .attr("y", function (d) {
                    return yScale(d.name);
                }).attr("fill", function(d){
                    if (agg == "byCont") {
                        return color_map[d.name];
                    }
                    return d.color;
                }).on("mousemove", function(d){
                    div.style("left", d3.event.pageX+10+"px");
                    div.style("top", d3.event.pageY-25+"px");
                    div.style("display", "inline-block");
                    div.html("Year: " + curr_year + '<br>' +
                        "Continent: "+ (d.continent)+"<br>"+
                        "Bar encoded by " + encode + " value" +
                        '<br>' + encode + ': ' + format_output(d, encode) + '<br>' +
                        "Sorted by: " + sorting
                        + '<br>' + sorting + ': ' + format_output(d, sorting));
                }).on("mouseout", function(d){
                    div.style("display", "none");
                });


            d3.select('table').remove();

        }
        update();
    }
)