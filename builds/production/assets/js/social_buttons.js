!function(t){t.contactButtons=function(e){var o,n={effect:"",buttons:{facebook:{class:"facebook",use:!1,icon:"facebook",link:"",title:"Follow on Facebook"},google:{class:"gplus",use:!1,icon:"google-plus",link:"",title:"Visit on Google Plus"},linkedin:{class:"linkedin",use:!1,icon:"linkedin",link:"",title:"Visit on LinkedIn"},twitter:{class:"twitter",use:!1,icon:"twitter",link:"",title:"Follow on Twitter"},pinterest:{class:"pinterest",use:!1,icon:"pinterest",link:"",title:"Follow on Pinterest"},phone:{class:"phone",use:!1,icon:"phone",link:"",title:"Call us",type:"phone"},email:{class:"email",use:!1,icon:"envelope",link:"",title:"Send us an email",type:"email"}}},a=e;for(o in n.buttons)e.buttons[o]&&(a.buttons[o]=t.extend(n.buttons[o],e.buttons[o]));var s=t("#contact-buttons-bar");if(0===s.length){t("body").append('<div id="contact-buttons-bar">'),s=t("#contact-buttons-bar"),s.addClass(a.effect);var i='<button class="contact-button-link show-hide-contact-bar"><i class="fa fa-share-alt-square"></i></button>';s.append(i);var l;for(l in a.buttons){var c=a.buttons[l],r=c.link,u=c.use;if(u){"phone"===c.type?r="tel:"+c.link:"email"===c.type&&(r="mailto:"+c.link);var p='<i class="fa fa-'+c.icon+'"></i>',b='<a href="'+r+'" class="contact-button-link cb-ancor '+c.class+'" '+(c.title?'title="'+c.title+'"':"")+(c.extras?c.extras:"")+">"+p+"</a>";s.append(b)}}setTimeout(function(){s.animate({right:0})},200),t("body").on("click",".show-hide-contact-bar",function(e){e.preventDefault(),e.stopImmediatePropagation(),t(".show-hide-contact-bar").find(".fa").toggleClass("fa-angle-right fa-share-alt-square"),s.find(".cb-ancor").toggleClass("cb-hidden")})}},t(function(){var e=t("#contact-buttons-bar.slide-on-scroll");e.attr("data-top",e.css("top")),t(window).scroll(function(){clearTimeout(t.data(this,"scrollCheck")),t.data(this,"scrollCheck",setTimeout(function(){var o=t(window).scrollTop()+parseInt(e.attr("data-top"));e.animate({top:o},500)},250))})})}(jQuery),$.contactButtons({effect:"slide-on-scroll",buttons:{facebook:{class:"facebook",use:!0,link:"https://www.facebook.com/pages/mycompany",extras:'target="_blank"'},linkedin:{class:"linkedin",use:!0,link:"https://www.linkedin.com/company/mycompany"},google:{class:"gplus",use:!0,link:"https://plus.google.com/myidongoogle"},mybutton:{class:"twitter",use:!0,link:"http://twitter.com",icon:"twitter",title:"My title for the button"},phone:{class:"phone separated",use:!0,link:"+000"},email:{class:"email",use:!0,link:"test@web.com"}}});