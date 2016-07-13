/**
 * Created by omar on 7/10/16.
 */
// Continuous Marquee with Button(s)
// copyright 30th September 2009, 20th December 2012 by Stephen Chapman
// http://www.felgall.com
// permission to use this Javascript on your web page is granted
// provided that all of the code below in this script (including these
// comments) is used without any alteration

(function (speed, cl, ss) {
    "use strict";
    var nodes, i, ii, mqr, objWidth, mq, mqRotate, sb, t, b;
    t = false;
    mqr = [];
    if (!document.getElementsByClassName) document.getElementsByClassName = function (cl) {
        var retNode, myclass, elem, classes, i, ii;
        retNode = [];
        myclass = new RegExp('\\b' + cl + '\\b');
        elem = this.getElementsByTagName('*');
        for (i = 0, ii = elem.length; i < ii; i++) {
            classes = elem[i].className;
            if (myclass.test(classes)) retNode.push(elem[i]);
        }
        return retNode;
    };
    objWidth = function (obj) {
        return obj.offsetWidth || obj.clip.width;
    };
    mq = function (node) {
        var i, wid, fulwid, txt, heit, maxw, s;
        this.mqo = node;
        txt = this.mqo.innerHTML;
        this.mqo.style.position = 'relative';
        this.mqo.style.overflow = 'hidden';
        s = document.createElement('span');
        this.mqo.appendChild(s);
        this.mqo.getElementsByTagName('span')[0].style.whiteSpace = 'nowrap';
        this.mqo.getElementsByTagName('span')[0].innerHTML = txt;
        wid = objWidth(this.mqo.getElementsByTagName('span')[0]) + 5;
        fulwid = objWidth(this.mqo);
        this.mqo.innerHTML = '';
        heit = this.mqo.style.height;
        this.mqo.onmouseout = function () {
            if (!t) mqr[0].TO = setInterval(function () {
                mqRotate(mqr);
            }, speed)
        };
        this.mqo.onmouseover = function () {
            clearInterval(mqr[0].TO);
        };
        this.mqo.ary = [];
        maxw = Math.ceil(fulwid / wid) + 1;
        for (i = 0; i < maxw; i++) {
            this.mqo.ary[i] = document.createElement('div');
            this.mqo.ary[i].innerHTML = txt;
            this.mqo.ary[i].style.position = 'absolute';
            this.mqo.ary[i].style.left = (wid * i) + 'px';
            this.mqo.ary[i].style.width = wid + 'px';
            this.mqo.ary[i].style.height = heit;
            this.mqo.appendChild(this.mqo.ary[i]);
        }
        return this.mqo;
    };
    mqRotate = function (mqr) {
        var j, i, x, y, z, maxa;
        for (j = mqr.length - 1; j > -1; j--) {
            maxa = mqr[j].ary.length;
            for (i = 0; i < maxa; i++) {
                x = mqr[j].ary[i].style;
                x.left = (parseInt(x.left, 10) - 1) + 'px';
            }
            y = mqr[j].ary[0].style;
            if (parseInt(y.left, 10) + parseInt(y.width, 10) < 0) {
                z = mqr[j].ary.shift();
                z.style.left = (parseInt(z.style.left, 10) + parseInt(z.style.width, 10) * maxa) + 'px';
                mqr[j].ary.push(z);
            }
        }
    };
    nodes = document.getElementsByClassName(cl);
    for (i = 0, ii = nodes.length; i < ii; i++) {
        mqr.push(new mq(nodes[i]));
    }
    ;
    if (mqr.length > 0)mqr[0].TO = setInterval(function () {
        mqRotate(mqr);
    }, speed);
    if (typeof ss == 'string') {
        sb = document.getElementsByClassName(ss);
        for (i = 0, ii = sb.length; i < ii; i++) {
            sb[i].innerHTML = '';
            b = document.createElement('button');
            b.innerHTML = ' Stop ';
            sb[i].appendChild(b);
            sb[i].onclick = function () {
                if (t) {
                    t = false;
                    mqr[0].TO = setInterval(function () {
                        mqRotate(mqr);
                    }, speed);
                    for (i = 0, ii = sb.length; i < ii; i++) sb[i].firstChild.innerHTML = ' Stop ';
                } else {
                    t = true;
                    clearInterval(mqr[0].TO);
                    for (i = 0, ii = sb.length; i < ii; i++) sb[i].firstChild.innerHTML = 'Start';
                }
            };
        }
    }
})(50, 'marquee', 'marqueess');
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, function (moment) {
    'use strict';


    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    }, pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    }, plurals = {
        s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    }, pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    }, months = [
        'كانون الثاني يناير',
        'شباط فبراير',
        'آذار مارس',
        'نيسان أبريل',
        'أيار مايو',
        'حزيران يونيو',
        'تموز يوليو',
        'آب أغسطس',
        'أيلول سبتمبر',
        'تشرين الأول أكتوبر',
        'تشرين الثاني نوفمبر',
        'كانون الأول ديسمبر'
    ];

    var ar = moment.defineLocale('ar', {
        months: months,
        monthsShort: months,
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'D/\u200FM/\u200FYYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM: function (input) {
            return 'م' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'بعد %s',
            past: 'منذ %s',
            s: pluralize('s'),
            m: pluralize('m'),
            mm: pluralize('m'),
            h: pluralize('h'),
            hh: pluralize('h'),
            d: pluralize('d'),
            dd: pluralize('d'),
                M: pluralize('M'),
            MM: pluralize('M'),
            y: pluralize('y'),
            yy: pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12  // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ar;
}));
moment.locale("ar");

/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */
!function(e){e.fn.marquee=function(t){return this.each(function(){var i,a,n,r,s,o=e.extend({},e.fn.marquee.defaults,t),u=e(this),d=3,p="animation-play-state",l=!1,c=function(e,t,i){for(var a=["webkit","moz","MS","o",""],n=0;n<a.length;n++)a[n]||(t=t.toLowerCase()),e.addEventListener(a[n]+t,i,!1)},f=function(e){var t=[];for(var i in e)e.hasOwnProperty(i)&&t.push(i+":"+e[i]);return t.push(),"{"+t.join(",")+"}"},m=function(){u.timer=setTimeout(B,o.delayBeforeStart)},g={pause:function(){l&&o.allowCss3Support?i.css(p,"paused"):e.fn.pause&&i.pause(),u.data("runningStatus","paused"),u.trigger("paused")},resume:function(){l&&o.allowCss3Support?i.css(p,"running"):e.fn.resume&&i.resume(),u.data("runningStatus","resumed"),u.trigger("resumed")},toggle:function(){g["resumed"==u.data("runningStatus")?"pause":"resume"]()},destroy:function(){clearTimeout(u.timer),u.find("*").andSelf().unbind(),u.html(u.find(".js-marquee:first").html())}};if("string"==typeof t)return void(e.isFunction(g[t])&&(i||(i=u.find(".js-marquee-wrapper")),u.data("css3AnimationIsSupported")===!0&&(l=!0),g[t]()));var h;e.each(o,function(e,t){if(h=u.attr("data-"+e),"undefined"!=typeof h){switch(h){case"true":h=!0;break;case"false":h=!1}o[e]=h}}),o.duration=o.speed||o.duration,r="up"==o.direction||"down"==o.direction,o.gap=o.duplicated?parseInt(o.gap):0,u.wrapInner('<div class="js-marquee"></div>');var v=u.find(".js-marquee").css({"margin-right":o.gap,"float":"left"});if(o.duplicated&&v.clone(!0).appendTo(u),u.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'),i=u.find(".js-marquee-wrapper"),r){var y=u.height();i.removeAttr("style"),u.height(y),u.find(".js-marquee").css({"float":"none","margin-bottom":o.gap,"margin-right":0}),o.duplicated&&u.find(".js-marquee:last").css({"margin-bottom":0});var x=u.find(".js-marquee:first").height()+o.gap;o.startVisible&&!o.duplicated?(o._completeDuration=(parseInt(x,10)+parseInt(y,10))/parseInt(y,10)*o.duration,o.duration=parseInt(x,10)/parseInt(y,10)*o.duration):o.duration=(parseInt(x,10)+parseInt(y,10))/parseInt(y,10)*o.duration}else s=u.find(".js-marquee:first").width()+o.gap,a=u.width(),o.startVisible&&!o.duplicated?(o._completeDuration=(parseInt(s,10)+parseInt(a,10))/parseInt(a,10)*o.duration,o.duration=parseInt(s,10)/parseInt(a,10)*o.duration):o.duration=(parseInt(s,10)+parseInt(a,10))/parseInt(a,10)*o.duration;if(o.duplicated&&(o.duration=o.duration/2),o.allowCss3Support){var I=document.body||document.createElement("div"),b="marqueeAnimation-"+Math.floor(1e7*Math.random()),S="Webkit Moz O ms Khtml".split(" "),w="animation",q="",j="";if(I.style.animation&&(j="@keyframes "+b+" ",l=!0),l===!1)for(var C=0;C<S.length;C++)if(void 0!==I.style[S[C]+"AnimationName"]){var V="-"+S[C].toLowerCase()+"-";w=V+w,p=V+p,j="@"+V+"keyframes "+b+" ",l=!0;break}l&&(q=b+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s infinite "+o.css3easing,u.data("css3AnimationIsSupported",!0))}var A=function(){i.css("margin-top","up"==o.direction?y+"px":"-"+x+"px")},k=function(){i.css("margin-left","left"==o.direction?a+"px":"-"+s+"px")};o.duplicated?(r?o.startVisible?i.css("margin-top",0):i.css("margin-top","up"==o.direction?y+"px":"-"+(2*x-o.gap)+"px"):o.startVisible?i.css("margin-left",0):i.css("margin-left","left"==o.direction?a+"px":"-"+(2*s-o.gap)+"px"),o.startVisible||(d=1)):o.startVisible?d=2:r?A():k();var B=function(){if(o.duplicated&&(1===d?(o._originalDuration=o.duration,r?o.duration="up"==o.direction?o.duration+y/(x/o.duration):2*o.duration:o.duration="left"==o.direction?o.duration+a/(s/o.duration):2*o.duration,q&&(q=b+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing),d++):2===d&&(o.duration=o._originalDuration,q&&(b+="0",j=e.trim(j)+"0 ",q=b+" "+o.duration/1e3+"s 0s infinite "+o.css3easing),d++)),r?o.duplicated?(d>2&&i.css("margin-top","up"==o.direction?0:"-"+x+"px"),n={"margin-top":"up"==o.direction?"-"+x+"px":0}):o.startVisible?2===d?(q&&(q=b+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing),n={"margin-top":"up"==o.direction?"-"+x+"px":y+"px"},d++):3===d&&(o.duration=o._completeDuration,q&&(b+="0",j=e.trim(j)+"0 ",q=b+" "+o.duration/1e3+"s 0s infinite "+o.css3easing),A()):(A(),n={"margin-top":"up"==o.direction?"-"+i.height()+"px":y+"px"}):o.duplicated?(d>2&&i.css("margin-left","left"==o.direction?0:"-"+s+"px"),n={"margin-left":"left"==o.direction?"-"+s+"px":0}):o.startVisible?2===d?(q&&(q=b+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing),n={"margin-left":"left"==o.direction?"-"+s+"px":a+"px"},d++):3===d&&(o.duration=o._completeDuration,q&&(b+="0",j=e.trim(j)+"0 ",q=b+" "+o.duration/1e3+"s 0s infinite "+o.css3easing),k()):(k(),n={"margin-left":"left"==o.direction?"-"+s+"px":a+"px"}),u.trigger("beforeStarting"),l){i.css(w,q);var t=j+" { 100%  "+f(n)+"}",p=i.find("style");0!==p.length?p.filter(":last").html(t):i.append("<style>"+t+"</style>"),c(i[0],"AnimationIteration",function(){u.trigger("finished")}),c(i[0],"AnimationEnd",function(){B(),u.trigger("finished")})}else i.animate(n,o.duration,o.easing,function(){u.trigger("finished"),o.pauseOnCycle?m():B()});u.data("runningStatus","resumed")};u.bind("pause",g.pause),u.bind("resume",g.resume),o.pauseOnHover&&u.bind("mouseenter mouseleave",g.toggle),l&&o.allowCss3Support?B():m()})},e.fn.marquee.defaults={allowCss3Support:!0,css3easing:"linear",easing:"linear",delayBeforeStart:1e3,direction:"left",duplicated:!1,duration:5e3,gap:20,pauseOnCycle:!1,pauseOnHover:!1,startVisible:!1}}($);
