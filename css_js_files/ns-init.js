// ns-init.js: MSysNamespace [260422125231]
(function() {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

fan.ui.UiSysNamespaceLoader.prototype.isProj = function() { return false; }

fan.ui.UiSysNamespaceLoader.prototype.jsLoadSettings = function() {
var s = this.addSettings.bind(this);
s("cluster","{mod:2018-04-12T10:07:25.26Z id:@h:cluster \"h:cluster\" sysMod}");
s("obs","{mod:2023-03-18T04:56:10.329Z id:@h:obs \"h:obs\" sysMod}");
s("auth","{mod:2023-03-18T04:56:10.661Z id:@h:auth \"h:auth\" sysMod}");
s("lic","{mod:2018-04-12T10:07:26.01Z id:@h:lic \"h:lic\" sysMod}");
s("phIoT","{mod:2023-03-18T04:56:10.681Z id:@h:phIoT \"h:phIoT\" sysMod}");
s("iot","{mod:2023-03-18T04:56:10.685Z id:@h:iot \"h:iot\" sysMod}");
s("hx","{mod:2023-03-18T04:56:10.691Z id:@h:hx \"h:hx\" sysMod}");
s("dev","{mod:2018-04-12T10:07:26.025Z id:@h:dev \"h:dev\" sysMod}");
s("ui","{mod:2018-04-12T10:07:26.056Z id:@h:ui \"h:ui\" sysMod}");
s("host","{mod:2018-04-12T10:07:26.135Z id:@h:host \"h:host\" sysMod}");
s("api","{mod:2018-04-12T10:07:26.15Z allowTextPlain:F sysMod attestCookies:F jsonVersion:3 id:@h:api \"h:api\" allowGetWithSideEffects:T}");
s("brand","{mod:2018-04-12T10:07:26.197Z id:@h:brand \"h:brand\" sysMod}");
s("nav","{mod:2023-03-18T04:56:10.735Z id:@h:nav \"h:nav\" sysMod}");
s("clock","{mod:2023-03-18T04:56:10.757Z id:@h:clock \"h:clock\" sysMod}");
s("crypto","{mod:2018-04-12T10:07:26.51Z id:@h:crypto \"h:crypto\" sysMod}");
s("lint","{mod:2023-03-18T04:56:11.002Z id:@h:lint \"h:lint\" sysMod}");
s("install","{mod:2018-04-12T10:07:26.822Z id:@h:install \"h:install\" sysMod}");
s("doc","{mod:2018-04-12T10:07:26.853Z id:@h:doc \"h:doc\" sysMod}");
s("http","{mod:2020-10-23T10:22:07.868Z httpsEnabled:F httpPort:80 httpsPort:443 siteUri:`https://analytics12.honeywellcloud.com/ui/` sysMod id:@h:http \"h:http\" addr:\"\"}");
s("phScience","{mod:2023-03-18T04:56:11.04Z id:@h:phScience \"h:phScience\" sysMod}");
s("diag","{mod:2018-04-12T10:07:25.369Z id:@h:diag \"h:diag\" sysMod}");
s("pod","{mod:2018-04-12T10:07:25.947Z id:@h:pod \"h:pod\" sysMod}");
s("log","{mod:2021-07-28T07:09:16.592Z maxAge:7day bufMax:10000 id:@h:log \"h:log\" sysMod}");
s("session","{maxSessions:25000 mod:2023-03-18T07:17:39.286Z webSessionTimeout:30min id:@h:session \"h:session\" sysMod uiSessionTimeout:5min}");
s("skyarc","{mod:2023-03-18T04:56:10.676Z id:@h:skyarc \"h:skyarc\" sysMod}");
s("file","{mod:2023-03-18T04:56:10.695Z id:@h:file \"h:file\" sysMod}");
s("alert","{mod:2018-04-12T10:07:26.119Z id:@h:alert \"h:alert\" sysMod}");
s("phIct","{mod:2023-03-18T04:56:10.719Z id:@h:phIct \"h:phIct\" sysMod}");
s("repl","{mod:2023-03-18T04:56:10.723Z id:@h:repl \"h:repl\" sysMod}");
s("email","{mod:2018-12-17T08:15:15.435Z uri:`smtp://smtp-secure.honeywell.com:25/` sysMod from:\"AOC@Honeywell.com\" tls:F id:@h:email \"h:email\" username:\"\"}");
s("debug","{mod:2018-04-12T10:07:26.228Z id:@h:debug \"h:debug\" sysMod}");
s("xquery","{mod:2023-03-18T04:56:10.739Z id:@h:xquery \"h:xquery\" sysMod}");
s("proj","{mod:2018-04-12T10:07:26.463Z id:@h:proj \"h:proj\" sysMod}");
s("watchdog","{mod:2018-04-12T10:07:26.822Z id:@h:watchdog \"h:watchdog\" sysMod}");
s("ph","{mod:2023-03-18T04:56:11.026Z id:@h:ph \"h:ph\" sysMod}");
s("axon","{mod:2023-03-18T04:56:11.044Z id:@h:axon \"h:axon\" sysMod}");
s("pub","{mod:2018-04-12T10:07:26.885Z id:@h:pub \"h:pub\" sysMod}");
s("user","{mod:2018-04-12T10:07:26.9Z id:@h:user \"h:user\" sysMod}");
}

fan.ui.UiSysNamespaceLoader.prototype.jsLoadMisc = function() {
var s = this.addMiscStr.bind(this);
var z = this.addMiscZinc.bind(this);
s("tz","Auckland");
s("pimStyles","//\n// Copyright (c) 2017, SkyFoundry LLC\n// All Rights Reserved\n//\n// History:\n//   22 Jun 2017  Brian Frank  Creation\n//\n\n//////////////////////////////////////////////////////////////////////////\n// Defaults\n//////////////////////////////////////////////////////////////////////////\n\ncomp {\n  font: 9pt Roboto, sans-serif;\n  color: black;\n}\n\n//////////////////////////////////////////////////////////////////////////\n// Text\n//////////////////////////////////////////////////////////////////////////\n\ntext {\n  font: 10pt Roboto, sans-serif;\n  color: black;\n}\n\nbold {\n  font: bold 10pt Roboto, sans-serif;\n}\n\nitalic {\n  font: italic 10pt Helvetica, sans-serif;\n}\n\nmonospace {\n  font: 10pt Roboto Mono, monospace;\n}\n\nh1 {\n  font: bold 16pt Roboto, sans-serif;\n  margin: 16 0 5;\n  border: 0 0 1 0 #ccc;\n}\n\nh2 {\n  font: bold 14pt Roboto, sans-serif;\n  margin: 8 0 5;\n}\n\nh3 {\n  font: bold 12pt Roboto, sans-serif;\n  margin: 5 0 3;\n}\n\nh4 {\n  font: bold 11pt Roboto, sans-serif;\n  margin: 4 0 3;\n}\n\ntitle {\n  font: bold 12pt Roboto, sans-serif;\n  margin: 0 0 10 0;\n  halign: center;\n  whitespace: nowrap;\n}\n\nsubtitle {\n  font: bold 10pt Roboto, sans-serif;\n  color: #777;\n  margin: 0 0 10 0;\n  halign: center;\n  whitespace: nowrap;\n}\n\np {\n  margin: 4 0;\n}\n\npre {\n  font: 9pt Roboto Mono, monospace;\n  margin: 4 3;\n  padding: 5 10;\n  whitespace: pre;\n  background: #f6f6f6;\n  border: 1 #ccc 4;\n}\n\nlistPane {\n  font: 10pt Roboto, sans-serif;\n  color: black;\n}\n\nnoData {\n  color: #ccc;\n  halign: center;\n  whitespace: nowrap;\n}\n\nbreak {\n  color: #ddd;\n  strokeWidth: 1;\n  margin: 10 0;\n}\n\n//////////////////////////////////////////////////////////////////////////\n// Table\n//////////////////////////////////////////////////////////////////////////\n\ntable.header {\n  font: bold 9pt Roboto, sans-serif;\n  color: black;\n  whitespace: nowrap;\n  border: 1 #777;\n  background: #eee;\n  padding: 4;\n}\n\ntable.cell {\n  font: 9pt Roboto, sans-serif;\n  color: black;\n  whitespace: nowrap;\n  border: 1 #777;\n  padding: 4;\n}\n\n//////////////////////////////////////////////////////////////////////////\n// Card\n//////////////////////////////////////////////////////////////////////////\n\ncard.box {\n  padding: 10;\n}\n\ncard.title {\n  halign: left;\n  padding: 0 0 0 4;\n}\n\ncard.subtitle {\n  halign: left;\n  padding: 0 0 0 4;\n}\n\ncard.primary {\n  font: bold 36pt Roboto, sans-serif;\n}\n\ncard.label {\n  font: bold 9pt Roboto, sans-serif;\n  color: #777;\n  whitespace: nowrap;\n  padding: 4;\n}\n\ncard.val {\n  font: 9pt Roboto, sans-serif;\n  color: black;\n  whitespace: nowrap;\n  padding: 4;\n}\n\n//////////////////////////////////////////////////////////////////////////\n// Charts\n//////////////////////////////////////////////////////////////////////////\n\naxis.tickLabel {\n  font: 8pt Roboto, sans-serif;\n  color: #555;\n}\n\naxis.tickMark {\n  color: #ddd;\n  length: 5;\n}\n\nlegend {\n  font: 9pt Roboto, sans-serif;\n  color: #000;\n}\n\nruntimePlot {\n  font: 9pt Roboto, sans-serif;\n}\n\nguidesPlot {\n  border: #b4b4b4 #ddd;\n  background: #fefefe;\n}\n\nguidesPlot.y {\n  color: #ddd;\n  strokeDasharray: 6,4;\n}\n\nguidesPlot.x {\n  color: #f7f7f7;\n}\n\ntracePlot {\n  color: #555;\n  strokeDasharray: 3,1;\n}\n\nchartPopup {\n  font: 9pt Roboto, sans-serif;\n  color: #000;\n}\n\n//////////////////////////////////////////////////////////////////////////\n// Views/Printing\n//////////////////////////////////////////////////////////////////////////\n\nviewPane {\n  margin: 8;\n  clip: box;\n}\n\npage {\n  margin: 54;  // 3/4\"\n  clip: box;\n}\n\n\n\n");
s("iconNames","action,add,addView,alpha,app,apps,arc,arrowDown,arrowLeft,arrowRight,arrowUp,asterisk,attachment,bacnet,ban,barcode,beta,bill,bin,binding,blank,blankSp,bolt,bool,box,builder,calendar,campus,cannabis,card,cardDeck,cell,cellAll,char,chart,chartArea,chartBar,chartDonut,chartHeatMap,chartLine,chartPie,chartScatter,chartStackedBar,chartTimeline,check,chevronDown,chevronUp,choice,circle,clear,clipboard,clock,clone,cloneDb,cloud,cloudy,code,column,command,compassDraft,conn,connTuning,context,coord,copy,cpu,cur,date,dateTime,db,debug,def,dict,disabled,disclosureCollapsed,disclosureExpanded,docker,dollar,down,download,dropbox,ecobee,edit,elec,energyStar,entity,equip,err,euro,export,fan,fandoc,fault,fav,file,floor,flurries,folder,form,func,gas,gauge,gear,geoCity,geoState,googleDrive,greenhouseGas,grid,group,hammer,haystack,hdd,header,help,his,home,host,html,ice,ide,iframe,info,ioDir,java,job,key,kpi,layout2h,layout2v,layoutFill,license,lightbulb,link,list,lock,mail,map,marker,menu,meter,mixin,modbus,more,move,mqtt,na,navLeft,navRight,nest,network,node,note,num,number,obix,obj,ok,opc,open,page,pageBreak,paintBrush,paperAirplane,paperClip,partlyCloudy,plug,pod,point,presentation,pushpin,puzzle,python,question,radar,rain,rainFreezing,rainShowers,ram,rdf,recent,ref,region,released,remove,reorder,reuse,rocket,row,rule,ruleTuning,ruler,sbToggleConn,schedule,scheduleWeek,search,sedona,select,settings,showers,sidebar,site,snmp,snow,snowFlurries,spark,spinner,splitView,sql,square,star,status,steam,stopWatch,str,subtract,sun,symbol,sync,table,tag,target,tariff,task,temp,text,textField,thread,thunderstorms,tile,time,toolbox,trash,tree,undo,unknown,uri,user,var,view,warn,water,weather,weatherStation,webBrowser,wifi,workbook,workflow,worksheet,wrench,x,xstr");
z("localNodeId","@n:2386b0c1-9240e82c \"Honeywell Analytics (Windows Server 2016)\"");
z("siteUri","`https://analytics12.honeywellcloud.com/ui/`");
z("prefs","{}");
s("installedSysMods","alert,api,auth,axon,brand,certAuth,clock,cluster,clusterAuth,crypto,debug,dev,diag,doc,email,file,host,http,hx,install,iot,ldap,lic,lint,log,nav,obs,ph,phIct,phIoT,phScience,pod,proj,pub,repl,samlSso,session,skyarc,ui,user,watchdog,xquery");
z("bootConfig","{}");
s("geoCountry","US");
z("brand","{productUri:`https://buildingsolutions.honeywell.com/en-US/solutions/ConnectedServices/Pages/default.aspx` bootKey:\"317ad84b-e4829784\" key:\"honAnalytics\" dis:\"Honeywell Analytics\"}");
}

fan.ui.UiSysNamespaceLoader.prototype.jsLoadProjLib = function() {
return null;
}

}).call(this);
