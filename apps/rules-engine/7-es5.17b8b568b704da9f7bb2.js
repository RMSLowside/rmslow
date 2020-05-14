function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{itua:function(e,t,a){"use strict";a.r(t),a.d(t,"TestRuleComponent",(function(){return g}));var r=function e(){_classCallCheck(this,e)},n=a("EM62"),s=a("nIj0"),o=a("qFEQ"),c=a("29Wa"),i=a("Cd2c"),u=a("Meci"),l=a("PBFl"),b=a("2kYt"),d=a("GAih");function m(e,t){1&e&&(n.Wb(0,"mat-card-title",19),n.Ec(1,"Matches Rule"),n.Vb())}function h(e,t){1&e&&(n.Wb(0,"mat-card-title",19),n.Ec(1,"Does Not Match Rule"),n.Vb())}function p(e,t){if(1&e&&(n.Wb(0,"mat-card",16),n.Wb(1,"mat-card-header",17),n.Cc(2,m,2,0,"mat-card-title",18),n.Cc(3,h,2,0,"mat-card-title",18),n.Vb(),n.Vb()),2&e){var a=n.ic();n.Eb(1),n.nc("ngClass",a.matched?"matched":"unmatched"),n.Eb(1),n.nc("ngIf",a.matched),n.Eb(1),n.nc("ngIf",!a.matched)}}var f,g=((f=function(){function e(t){_classCallCheck(this,e),this.formBuilder=t,this.rulesMessage=new r,this.testRan=!1,this.matched=!1}return _createClass(e,[{key:"ngOnInit",value:function(){this.jsonForm=this.formBuilder.group({guide:"",producer:"",createdate:"",text:"",title:""}),this.rulesMessage.guide="",this.rulesMessage.producer="",this.rulesMessage.createDate="",this.rulesMessage.text="",this.rulesMessage.title="",this.onChanges()}},{key:"onChanges",value:function(){var e=this;this.jsonForm.valueChanges.subscribe((function(t){e.rulesMessage.guide=t.guide,e.rulesMessage.producer=t.producer,e.rulesMessage.createDate=t.createdate,e.rulesMessage.text=t.text,e.rulesMessage.title=t.title}))}},{key:"searchGuide",value:function(e){var t=e,a="This is the full text content of the document. wow so much content in here. amazing.",r="COVID 19 Studies";this.jsonForm=this.formBuilder.group({guide:t,producer:"Amazon",createdate:"2019-03-24",text:a,title:r}),this.rulesMessage.guide=t,this.rulesMessage.producer="Amazon",this.rulesMessage.createDate="2019-03-24",this.rulesMessage.text=a,this.rulesMessage.title=r}},{key:"runTest",value:function(){this.matched=Math.random()>=.5,this.testRan=!0}}]),e}()).\u0275fac=function(e){return new(e||f)(n.Qb(s.d))},f.\u0275cmp=n.Kb({type:f,selectors:[["rms-frontend-test-rule"]],decls:42,vars:6,consts:[[1,"body"],["fxFlex","1 1 auto"],[1,"search",3,"formGroup"],[1,"searchBox"],["matInput","","formControlName","searchGuide",3,"keydown.enter"],["fxLayout","row","fxLayoutAlign","space-between start"],[1,"card"],["fxLayout","column","fxLayoutAlign","start stretch",3,"formGroup"],["matInput","","required","","formControlName","guide"],["matInput","","required","","formControlName","producer"],["matInput","","required","","formControlName","createdate"],["matInput","","required","","formControlName","text"],["matInput","","required","","formControlName","title"],["fxLayout","row","fxLayoutAlign","start center",1,"results"],["mat-raised-button","","color","accent",1,"testButton",3,"click"],["class","testResult",4,"ngIf"],[1,"testResult"],[3,"ngClass"],["class","headerText",4,"ngIf"],[1,"headerText"]],template:function(e,t){1&e&&(n.Wb(0,"div",0),n.Wb(1,"div"),n.Rb(2,"span",1),n.Wb(3,"form",2),n.Wb(4,"mat-form-field",3),n.Wb(5,"mat-label"),n.Ec(6,"GUIDE Search"),n.Vb(),n.Wb(7,"input",4),n.ec("keydown.enter",(function(e){return t.searchGuide(e.target.value)})),n.Vb(),n.Vb(),n.Vb(),n.Rb(8,"span",1),n.Vb(),n.Wb(9,"div",5),n.Wb(10,"mat-card",6),n.Wb(11,"mat-card-content"),n.Wb(12,"form",7),n.Wb(13,"mat-form-field"),n.Wb(14,"mat-label"),n.Ec(15,"guide"),n.Vb(),n.Rb(16,"input",8),n.Vb(),n.Wb(17,"mat-form-field"),n.Wb(18,"mat-label"),n.Ec(19,"producer"),n.Vb(),n.Rb(20,"input",9),n.Vb(),n.Wb(21,"mat-form-field"),n.Wb(22,"mat-label"),n.Ec(23,"createDate"),n.Vb(),n.Rb(24,"input",10),n.Vb(),n.Wb(25,"mat-form-field"),n.Wb(26,"mat-label"),n.Ec(27,"text"),n.Vb(),n.Rb(28,"input",11),n.Vb(),n.Wb(29,"mat-form-field"),n.Wb(30,"mat-label"),n.Ec(31,"title"),n.Vb(),n.Rb(32,"input",12),n.Vb(),n.Vb(),n.Vb(),n.Vb(),n.Wb(33,"mat-card",6),n.Wb(34,"mat-card-content"),n.Wb(35,"pre"),n.Ec(36),n.jc(37,"json"),n.Vb(),n.Vb(),n.Vb(),n.Vb(),n.Wb(38,"div",13),n.Wb(39,"button",14),n.ec("click",(function(){return t.runTest()})),n.Ec(40,"Test Rule"),n.Vb(),n.Cc(41,p,4,3,"mat-card",15),n.Vb(),n.Vb()),2&e&&(n.Eb(3),n.nc("formGroup",t.searchForm),n.Eb(9),n.nc("formGroup",t.jsonForm),n.Eb(24),n.Fc(n.kc(37,4,t.rulesMessage)),n.Eb(5),n.nc("ngIf",t.testRan))},directives:[o.a,s.s,s.n,s.g,c.b,c.e,i.b,s.b,s.m,s.f,o.c,o.b,u.a,u.b,s.q,l.a,b.l,u.c,b.j,d.a,u.f],pipes:[b.f],styles:[".body[_ngcontent-%COMP%]{width:100%}.search[_ngcontent-%COMP%]{width:50%}.searchBox[_ngcontent-%COMP%]{margin-top:15px;margin-bottom:15px;width:100%}.card[_ngcontent-%COMP%]{width:40%}.results[_ngcontent-%COMP%]{margin-top:50px;height:100px}.testButton[_ngcontent-%COMP%]{margin-right:15px}.testResult[_ngcontent-%COMP%]{width:300px;padding:0!important}.matched[_ngcontent-%COMP%]{background-color:#49e66e;padding:5px}.unmatched[_ngcontent-%COMP%]{background-color:#e65949;padding:5px}.headerText[_ngcontent-%COMP%]{margin-top:12px}pre[_ngcontent-%COMP%]{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word}"]}),f)}}]);