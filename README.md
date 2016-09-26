# Ajax.page.loader.andRooter-jQuery.plugin

##Instalation:
```html
<!-- Put it just brefore closing body tag </body>  -->
<script src="src= http //ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="path/to/ajaxPageLoaderAndRooter/lib.js"></script>
<script>
    aplrNavigate({
        contentSelector: '#content', // Element in wich content will be placed.
        navLinkSelector: '#navbar a', // For adding css class "active".
        pathToIncludes: 'includes', //'folder/where/includes/are_stored',
    });
</script>
```
##Usage:
This is how it works:<br><br>
Set navigation links as fragment identifiers (#about).<br>
This will search for file in folder of your choice (pathToIncludes - property)<br>
named about.html<br>
#example:
```html

<!-- Navigation links -->
<div id="navbar">
    <a href="#home">Home</a> <!-- Loads home.html etc -->
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
</div>
```
