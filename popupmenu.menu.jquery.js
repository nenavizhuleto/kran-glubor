(function($) {
  $.fn.popUpMenu = function(options) {
    var opts = $.extend({}, $.fn.popUpMenu.defaults, options);
    opts.direction = opts.direction.replace(/^\w/, function($0) {
      return $0.toUpperCase();
    });

    return this.each(function() {
      var menu = $(this);
      menu.append(opts.append);
      menu.prepend(opts.prepend);
      
      menu.find(opts.subMenuItem).mouseenter(function() {
        var sib = $(this).siblings();
        sib.find(opts.subMenu).hide();
        sib.find('a').removeClass(opts.overClass);  
      });
      
      menu.find(opts.subMenu).parent().each(function() {
        var o = $(this),
          s = o.children(opts.subMenu),
          k = false,
          l = s.parents(opts.subMenu).length,
          a = o.find('a:first');
        
        a.addClass(opts.hasSubMenu);
        
        o.hover(
          function() {            
            var p = $.fn.popUpMenu['getPosition' + opts.direction](o, l, s);
            k = true;
            s.css(p)[opts.showEffect](opts.timeEffect);
            a.addClass(opts.overClass);
          },
          function() {
            k = false;
            
            window.setTimeout(function() {
              if (!k) {
                s[opts.hideEffect](opts.timeEffect);
                a.removeClass(opts.overClass);
              }
            }, opts.sleep);
          }
        );
      });
    });
  }
    
  $.fn.popUpMenu.defaults = {
    subMenu: 'ul',
    subMenuItem: 'li',
    append: '',
    prepend: '',
    overClass: 'over',
    hasSubMenu: 'has',
    showEffect: 'show',
    hideEffect: 'hide',
    timeEffect: 0,
    direction: 'right',
    sleep: 500
  };
  
  $.fn.popUpMenu.getPositionRight = function(o) {
    var p = o.position();
    return {
      left: p.left + o.width(),
      top: p.top
    };
  };
  
  $.fn.popUpMenu.getPositionLeft = function(o) {
    var p = o.position();
    return {
      left: p.left - o.width(),
      top: p.top
    };
  };
  
  $.fn.popUpMenu.getPositionBottom = function(o, l) {
    var p = o.position();
    if (l == 1) {
      return {
        left: p.left,
        top: p.top + o.height()
      };
    } else {
      return {
        left: p.left + o.width(),
        top: p.top
      }
    }
  };
  
  $.fn.popUpMenu.getPositionTop = function(o, l, s) {
    var p = o.position();
    if (l == 1) {
      return {
        left: p.left,
        top: p.top - s.height()
      };
    } else {
      return {
        left: p.left + o.width(),
        top: p.top - s.height() + o.height()
      };
    }
  };
})(jQuery);

$(function() {  
  $('#lmenu').popUpMenu({
  });
});