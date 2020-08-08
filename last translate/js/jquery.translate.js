;(function($){

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

  function Translate(element, options){
    this.config = $.extend({}, defaults, options);
    this.element = element;
    this.init();
  }

  Translate.prototype.init = function(){

    me = this;

    if(me.getLangCookie(me.config.cookieName)!=null && me.getLangCookie(me.config.cookieName)!="")
      me.config.initLang=me.getLangCookie(me.config.cookieName);

    $.each(me.config, function(key, val){
      me.element.on(key+".translate", function(){
        val(me.element);
      });
    });

    $('<div/>',{
          "class": me.config.loadingClass
       }).appendTo($(me.config.area));

    for (var i = 0; i < me.config.langs.length; i++) {
       $('<span/>',{
          "class": me.config.langs[i].flagClass
       }).appendTo($(me.config.area));

      $('<a/>',{
          text: me.config.langs[i].desc,
          "class": me.config.itemClass,
          href:'#'+me.config.langs[i].lang,
          data: {'lang': me.config.langs[i].lang}
       })
      .appendTo($(me.config.area))
      .on("click", function(e){
          var lang = $(this).data('lang');
          me.setLangCookie(me.config.cookieName,lang, me.config.cookieTime);
          me.config.initLang=lang;
          me.translateText(lang);
       });
    };

    me.translateText(me.config.initLang);

    this.element.trigger("creationComplete");

  }

  Translate.prototype.translateText = function(lang){

    me = this;

    $.ajax({
            url: me.config.filePath+""+me.config.initLang+".json",
            type:'GET',
            dataType:"json",
            beforeSend : function(){
              $("."+me.config.loadingClass).show();
            },
            success : function(results){
                var content=results;
                var items = $(me.element).children();
                for (var i = 0 ; i < items.length; i++) {
                    if($(items[i]).data("translate")!=undefined){
                      var label = $(items[i]).data("translate");
                      $(items[i]).html(content[label]);
                    }

                };

                $("."+me.config.loadingClass).hide();
                me.element.trigger("translateComplete");
            },

            error:function(e){
              $("."+me.config.loadingClass).hide();
              me.element.trigger("translateError");
            }
        });
  }


  Translate.prototype.setLangCookie = function(cname,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cValue=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=cname + "=" + cValue;
  }


  Translate.prototype.getLangCookie = function(cname)
  {
    var cValue = document.cookie;
    var cStart = cValue.indexOf(" " + cname + "=");
    if (cStart == -1)
      {
      cStart = cValue.indexOf(cname + "=");
      }
    if (cStart == -1)
      {
      cValue = null;
      }
    else
      {
      cStart = cValue.indexOf("=", cStart) + 1;
      var cEnd = cValue.indexOf(";", cStart);
      if (cEnd == -1)
      {
    cEnd = cValue.length;
    }
    cValue = unescape(cValue.substring(cStart,cEnd));
    }
    return cValue;
  }

  $.fn.translate = function(options){

    new Translate(this, options)
    return this;

  };
}(jQuery));