// Initialize Share-Buttons
$.contactButtons({
  effect  : 'slide-on-scroll',
  buttons : {
    'facebook':   { class: 'facebook', use: true, link: 'https://www.facebook.com/pages/mycompany', extras: 'target="_blank"' },
    'linkedin':   { class: 'linkedin', use: true, link: 'https://www.linkedin.com/company/mycompany' },
    'google':     { class: 'gplus',    use: true, link: 'https://plus.google.com/myidongoogle' },
    'mybutton':   { class: 'git',      use: true, link: 'http://github.com', icon: 'github', title: 'My title for the button' },
    'phone':      { class: 'phone separated',    use: true, link: '+000' },
    'email':      { class: 'email',    use: true, link: 'test@web.com' }
  }
});