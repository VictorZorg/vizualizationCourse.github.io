# 1.1
DOM Inspector облегчает работу со страницами со служной структурой, так как содержит множество интсрументов для дебага.
# 1.2
Мы подгружаем файл (в нашем случае json) через d3, который, читая его массивом, распределяет данные по столбцам (с выделенными из массива же
названиями) и строкам, используя для этого теги.
# 2.1
Т.к. в других колонках значения для каждой из стран уникальны, то такая фильтрация не имеет смысла. 
Повторяющиеся значения присутствуют только в колонке years и в данной лабораторной работе уже используется слайдер для фильтрации по году
для данных из файла countries_1995_2012.json.
# 3.1
Т.к. повторяющиеся значения также содержатся в колонке years, то и аггрегировать имеет смысл по году (используем файл countries_1995_2012.json).
Можно было бы добавить среднее значение "life_expectancy", разницу между минимальными и максимальными значениями GDP, среднее значение GDP на душу населения.
# 4.1 
Аттрибут years, включенный внутрь блока основной информации о стране, содержит данные, которые изменялись с течением времени с 1995го по 2012ый года, такие как:
валовый внутренний продукт, средняя продолжительность жизни, основные партнеры по экспорту и численность населения. 
# 5.1
1) Графика SVG векторная, а HTML - растровая.
2) Графика SVG всегда отображается с наилучшим разрешением. В отличае от графики HTML, она опирается на множества опорных точек 
и изображение описывается математическими формулами. Вследствие чего сколько ни увеличивай масштаб векторного изображения, 
пикселей никогда не будет видно.
3)Работать с растровыми изображениями проще, т.к. механизмы её создания и редактирования более привычны и распространены. 
Однако чем больше пикселей, тем больше размер изображения.
4) Векторные изображения содержат в себе малое кол-во информации. Следовательно, они занимают малый объем памяти. 
Однако не каждая графическая сцена может быть представлена в векторном виде: для сложного изображения с широкой цветовой гаммой 
может потребоваться огромное количество точек и кривых, что сведёт «на нет» все преимущества векторной графики. 
(SVG применяется для создания различных фигур и линий).
# 7.1 (I'M IN LOVE WITH THAT! Thank you for this question!)
[Meteorological data](https://www.ventusky.com/?p=51.809;19.160;3&l=temperature&t=20160714/08) 
# 7.2 
With interactivity:
1. The number of dimensions of data are not limited, all
visual elements don't must be present on the same surface at the same time;
2. Some visualizations can make exploring data feel more like
playing a game;
3. Dynamic, interactive visualizations can empower people to explore the data
for themselves.
# 7.3
Limitations of visualisation:
1. Data visualization tools show but they do not provide any explainations or details;
2.Visualisation is not good to show complex data or complex situations;
3.Sometimes leads to misunderstanding of data;
4.Bad visualizationcan make unrelated things look related.
# 7.4
Visualisation helps us to understand relationships and meaning of data. People should understand it correctly, and data's semantic makes specifying structure and building its hierarchy much more easier because each chunk of content replaced by a semantic description of what that content is.
# 7.5
Quantitative - to compare and to sort values
Categorical - to group, to filter and to sort values
Ordinal scale - to group and sort values
# 7.6
An associative variable allows grouping across changes in the variable. Examples:
1.Continent
2.Country
3.University
4.Sex
5.Car
# 7.7
Quantitative visual variables:
1.Size
2.Weight
