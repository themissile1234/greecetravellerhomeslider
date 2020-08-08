# Jquery Translate #

JqueryTranslate is a plugin that allows you to translate webpages.
This plugin was born from the need to translate pages simply and rapidly.

To use simply add the attribute to the html element date-translate

<h1 data-translate="title"></h1>


How to use
==========


* Create a file with the descriptions, eg

pt_PT.json

`{
  "title":"nome"
}`

* add the data-translate attribute to the html element

`<h1 data-translate="title"></h1>`

* Add the plugin

 ```js
 $(function(){
    $("body").translate({
      initLang:'pt_PT'
    });
  });


Events
==========

* **creationCompleted** (is triggered when the plugin is loaded)
* **translateComplete** (is triggered when the translate is complete)
* **translateError**    (is triggered when translation went wrong)

Options
==========

  ```js
  var defaults = {
    initLang:'pt_PT',
    dir:'/',
    area:'#translate-area',
    filePath:'./files/',
    langs:[{
      lang:'pt_PT',
      desc:'Português',
      flagClass:'translate-flag-pt'
    },{
      lang:'us_EN',
      desc:'English',
      flagClass:'translate-flag-en'
    }],
    itemClass:"translate-item-class",
    cookieName:'translate-translate-lang',
    cookieTime:7,
    loadingClass:"translate-loading"
  }