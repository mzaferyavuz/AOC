(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.connExt = exports;
} else {
  fan.connExt = root.fan.connExt = {};
}

fan.connExt.ConnModel = fan.sys.Obj.$extend(fan.sys.Obj);
fan.connExt.ConnModel.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.connExt.ConnModel.prototype.$typeof = function() { return fan.connExt.ConnModel.$type; }
fan.connExt.ConnModel.make = function(pod,$name) {
  var self = new fan.connExt.ConnModel();
  fan.connExt.ConnModel.make$(self,pod,$name);
  return self;
  }
fan.connExt.ConnModel.make$ = function(self,pod,$name)
{
  if ($name === undefined) $name = fan.sys.Str.getRange(pod.$name(),fan.sys.Range.make(0,-4));
  self.m_pod = pod;
  self.m_$name = $name;
  self.m_connTag = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"Conn");
  self.m_connRefTag = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"ConnRef");
  self.m_pingFunc = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"Ping");
  self.m_pointTag = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"Point");
  if (self.isDiscoverSupported())
  {
    self.m_discoverFunc = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"Discover");
  }
  ;
  if (self.isLearnSupported())
  {
    self.m_learnFunc = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"Learn");
  }
  ;
  if (self.isCurSupported())
  {
    self.m_syncCurFunc = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"SyncCur");
    self.m_pointCurTag = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"Cur");
    self.m_pointCurType = self.pointAddrType();
  }
  ;
  if (self.isWriteSupported())
  {
    self.m_pointWriteTag = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"Write");
    self.m_pointWriteType = self.pointAddrType();
  }
  ;
  if (self.isHisSupported())
  {
    self.m_syncHisFunc = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"SyncHis");
    self.m_pointHisTag = fan.sys.Str.plus(fan.sys.Str.plus("",$name),"His");
    self.m_pointHisType = self.pointAddrType();
  }
  ;
  if (fan.sys.ObjUtil.compareNE(fan.sys.Env.cur().runtime(),"js"))
  {
    self.m_connTypeRef = pod.type(fan.sys.Str.plus(fan.sys.Str.capitalize($name),"Conn"));
  }
  ;
  var misc = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
  misc.set("name",$name);
  if (self.isCurSupported())
  {
    misc.set("cur",fan.haystack.Marker.m_val);
  }
  ;
  if (self.isHisSupported())
  {
    misc.set("his",fan.haystack.Marker.m_val);
  }
  ;
  if (self.isWriteSupported())
  {
    misc.set("write",fan.haystack.Marker.m_val);
  }
  ;
  if (self.isLearnSupported())
  {
    misc.set("learn",fan.haystack.Marker.m_val);
  }
  ;
  self.m_features = fan.haystack.Etc.makeDict(misc);
  return;
}
fan.connExt.ConnModel.prototype.isPollingSupported = function()
{
  return false;
}
fan.connExt.ConnModel.prototype.pollingMode = function()
{
  return (function($this) { if ($this.isPollingSupported()) return fan.connExt.PollingMode.m_manual; return fan.connExt.PollingMode.m_disabled; })(this);
}
fan.connExt.ConnModel.prototype.isDiscoverSupported = function()
{
  return false;
}
fan.connExt.ConnModel.prototype.isLearnSupported = function()
{
  return false;
}
fan.connExt.ConnModel.prototype.isCurSupported = function()
{
  return false;
}
fan.connExt.ConnModel.prototype.isWriteSupported = function()
{
  return false;
}
fan.connExt.ConnModel.prototype.isHisSupported = function()
{
  return false;
}
fan.connExt.ConnModel.prototype.pointAddrType = function()
{
  return fan.sys.Str.$type;
}
fan.connExt.ConnModel.prototype.connType = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u1 = $this.m_connTypeRef; if ($_u1 != null) return $_u1; throw $this.jsErr(); })(this),fan.sys.Type.$type);
}
fan.connExt.ConnModel.prototype.jsErr = function()
{
  return fan.sys.Err.make("Not available in JavaScript runtime");
}
fan.connExt.ConnModel.prototype.m_pod = null;
fan.connExt.ConnModel.prototype.m_$name = null;
fan.connExt.ConnModel.prototype.m_connTag = null;
fan.connExt.ConnModel.prototype.m_connRefTag = null;
fan.connExt.ConnModel.prototype.m_pointCurTag = null;
fan.connExt.ConnModel.prototype.m_pointTag = null;
fan.connExt.ConnModel.prototype.m_pointCurType = null;
fan.connExt.ConnModel.prototype.m_pointWriteTag = null;
fan.connExt.ConnModel.prototype.m_pointWriteType = null;
fan.connExt.ConnModel.prototype.m_pointWriteLevelTag = null;
fan.connExt.ConnModel.prototype.m_pointHisTag = null;
fan.connExt.ConnModel.prototype.m_pointHisType = null;
fan.connExt.ConnModel.prototype.m_pingFunc = null;
fan.connExt.ConnModel.prototype.m_discoverFunc = null;
fan.connExt.ConnModel.prototype.m_learnFunc = null;
fan.connExt.ConnModel.prototype.m_syncCurFunc = null;
fan.connExt.ConnModel.prototype.m_syncHisFunc = null;
fan.connExt.ConnModel.prototype.m_connTypeRef = null;
fan.connExt.ConnModel.prototype.m_features = null;
fan.connExt.PollingMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.connExt.PollingMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.connExt.PollingMode.prototype.$typeof = function() { return fan.connExt.PollingMode.$type; }
fan.connExt.PollingMode.prototype.isPollingEnabled = function()
{
  return this !== fan.connExt.PollingMode.m_disabled;
}
fan.connExt.PollingMode.make = function($ordinal,$name) {
  var self = new fan.connExt.PollingMode();
  fan.connExt.PollingMode.make$(self,$ordinal,$name);
  return self;
  }
fan.connExt.PollingMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.connExt.PollingMode.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.connExt.PollingMode.$type,$name,checked),fan.connExt.PollingMode.$type.toNullable());
}
fan.connExt.PollingMode.static$init = function()
{
  fan.connExt.PollingMode.m_disabled = fan.connExt.PollingMode.make(0,"disabled");
  fan.connExt.PollingMode.m_manual = fan.connExt.PollingMode.make(1,"manual");
  fan.connExt.PollingMode.m_buckets = fan.connExt.PollingMode.make(2,"buckets");
  fan.connExt.PollingMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u2 = fan.sys.List.make(fan.connExt.PollingMode.$type, [fan.connExt.PollingMode.m_disabled,fan.connExt.PollingMode.m_manual,fan.connExt.PollingMode.m_buckets]); if ($_u2 == null) return null; return fan.sys.ObjUtil.toImmutable($_u2); })(this),fan.sys.Type.find("connExt::PollingMode[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.connExt.PollingMode.m_disabled = null;
fan.connExt.PollingMode.m_manual = null;
fan.connExt.PollingMode.m_buckets = null;
fan.connExt.PollingMode.m_vals = null;
fan.connExt.ConnApplet = fan.sys.Obj.$extend(fan.sys.Obj);
fan.connExt.ConnApplet.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.connExt.ConnApplet.prototype.$typeof = function() { return fan.connExt.ConnApplet.$type; }
fan.connExt.ConnApplet.make = function() {
  var self = new fan.connExt.ConnApplet();
  fan.connExt.ConnApplet.make$(self);
  return self;
  }
fan.connExt.ConnApplet.make$ = function(self)
{
  return;
}
fan.connExt.$pod = fan.sys.Pod.$add('connExt');
with (fan.connExt.$pod)
{
  fan.connExt.ConnModel.$type = $at('ConnModel','sys::Obj',[],{'sys::Js':""},8195);
  fan.connExt.PollingMode.$type = $at('PollingMode','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.connExt.ConnApplet.$type = $at('ConnApplet','sys::Obj',[],{'sys::Js':""},8192);
  fan.connExt.ConnModel.$type.$af('pod',73730,'sys::Pod',{}).$af('name',73730,'sys::Str',{}).$af('connTag',73730,'sys::Str',{}).$af('connRefTag',73730,'sys::Str',{}).$af('pointCurTag',73730,'sys::Str?',{}).$af('pointTag',73730,'sys::Str',{'sys::NoDoc':""}).$af('pointCurType',73730,'sys::Type?',{}).$af('pointWriteTag',73730,'sys::Str?',{}).$af('pointWriteType',73730,'sys::Type?',{}).$af('pointWriteLevelTag',73730,'sys::Str?',{'sys::NoDoc':""}).$af('pointHisTag',73730,'sys::Str?',{}).$af('pointHisType',73730,'sys::Type?',{}).$af('pingFunc',73730,'sys::Str',{}).$af('discoverFunc',73730,'sys::Str?',{}).$af('learnFunc',73730,'sys::Str?',{}).$af('syncCurFunc',73730,'sys::Str?',{}).$af('syncHisFunc',73730,'sys::Str?',{}).$af('connTypeRef',67586,'sys::Type?',{}).$af('features',73730,'haystack::Dict',{'sys::NoDoc':""}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('name','sys::Str',true)]),{}).$am('isPollingSupported',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pollingMode',270336,'connExt::PollingMode',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isDiscoverSupported',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isLearnSupported',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isCurSupported',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isWriteSupported',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isHisSupported',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pointAddrType',270336,'sys::Type?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('connProto',270337,'haystack::Dict',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('connType',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('jsErr',2048,'sys::Err',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.connExt.PollingMode.$type.$af('disabled',106506,'connExt::PollingMode',{}).$af('manual',106506,'connExt::PollingMode',{}).$af('buckets',106506,'connExt::PollingMode',{}).$af('vals',106498,'connExt::PollingMode[]',{}).$am('isPollingEnabled',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'connExt::PollingMode?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.connExt.ConnApplet.$type.$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "connExt");
  m_meta.set("pod.version", "3.1.6");
  m_version = fan.sys.Version.fromStr("3.1.6");
  m_meta.set("pod.depends", "sys 1.0;concurrent 1.0;inet 1.0;sys 1.0;web 1.0;axon 3.1.6;folio 3.1.6;foliox 3.1.6;haystack 3.1.6;misc 3.1.6;hx 3.1.6;hxPoint 3.1.6;hxConn 3.1.6;pim 3.1.6;hisExt 3.1.6;jobExt 3.1.6;skyarc 3.1.6;skyarcd 3.1.6;navMod 3.1.6");
  m_meta.set("pod.summary", "Connector Extension Framework");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:24:23-05:00 New_York");
  m_meta.set("build.tsKey", "221115162423");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("license.name", "Commercial");
  m_meta.set("org.name", "SkyFoundry");
  m_meta.set("pod.docSrc", "false");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "SkySpark");
  m_meta.set("proj.uri", "https://skyfoundry.com/skyspark");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://skyfoundry.com/");
  m_meta.set("pod.native.java", "false");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("pod.native.js", "false");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
with (fan.sys.Env.cur().$props("connExt:locale/en.props"))
{
  set("conn.ext.dis","Connectors");
}
fan.connExt.PollingMode.static$init();
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.uiBuilder = exports;
} else {
  fan.uiBuilder = root.fan.uiBuilder = {};
}

fan.uiBuilder.BacnetDiscoverView = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiBuilder.BacnetDiscoverView.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.BacnetDiscoverView.prototype.$typeof = function() { return fan.uiBuilder.BacnetDiscoverView.$type; }
fan.uiBuilder.BacnetDiscoverView.make = function() {
  var self = new fan.uiBuilder.BacnetDiscoverView();
  fan.uiBuilder.BacnetDiscoverView.make$(self);
  return self;
  }
fan.uiBuilder.BacnetDiscoverView.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  self.m_bcastAddrs = fan.domkit.ListButton.make();
  self.m_bcastAddr = self.textField("");
  self.m_textLowRange = self.textField("0");
  self.m_textHighRange = self.textField("4194303");
  self.m_textTimeout = self.textField("8sec","Timeout in seconds");
  self.m_discover = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("discover")));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.onDiscover();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  var gridBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u2,
    function(it)
    {
      it.cellStyle("*","*","padding: 4px");
      it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"*","white-space: nowrap");
      it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),"*","min-width: 350px");
      return;
    })),fan.domkit.GridBox.$type);
  var flow1 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["7px"]));
      fan.sys.ObjUtil.coerce(it.add($this.m_bcastAddrs),fan.domkit.FlowBox.$type).add($this.m_bcastAddr);
      return;
    })),fan.domkit.FlowBox.$type);
  gridBox.addRow(fan.sys.List.make(fan.dom.Elem.$type, [self.label(fan.sys.Str.plus(fan.sys.Str.plus("",fan.uiBuilder.BacnetDiscoverView.$type.pod().locale("discover.bcastAddr")),":")),flow1]));
  gridBox.addRow(fan.sys.List.make(fan.dom.Elem.$type, [self.label(fan.sys.Str.plus(fan.sys.Str.plus("",fan.uiBuilder.BacnetDiscoverView.$type.pod().locale("discover.lowRange")),":")),self.m_textLowRange]));
  gridBox.addRow(fan.sys.List.make(fan.dom.Elem.$type, [self.label(fan.sys.Str.plus(fan.sys.Str.plus("",fan.uiBuilder.BacnetDiscoverView.$type.pod().locale("discover.highRange")),":")),self.m_textHighRange]));
  gridBox.addRow(fan.sys.List.make(fan.dom.Elem.$type, [self.label(fan.sys.Str.plus(fan.sys.Str.plus("",fan.uiBuilder.BacnetDiscoverView.$type.pod().locale("discover.timeout")),":")),self.m_textTimeout]));
  gridBox.addRow(fan.sys.List.make(fan.domkit.Button.$type, [self.m_discover]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]));
  self.loadBroadcastAddrs();
  self.m_devTree = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Tree.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u4,
    function(it)
    {
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u5,
        function(self)
        {
          $this.m_addDev.enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.is(self.sel().item(),fan.uiBuilder.DevNode.$type),fan.sys.Bool.$type.toNullable()));
          return;
        }));
      return;
    })),fan.domkit.Tree.$type);
  self.m_addDev = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.uiBuilder.BacnetDiscoverView.$type.pod().locale("discover.addDevice")));
      it.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.doAddDevice();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_discovered = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      it.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
      fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.add($this.m_addDev);
          return;
        })),fan.domkit.FlowBox.$type)),fan.domkit.SashBox.$type).add($this.m_devTree);
      return;
    })),fan.domkit.SashBox.$type);
  var sash = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["170px","100%"]));
      fan.sys.ObjUtil.coerce(it.add(gridBox),fan.domkit.SashBox.$type).add($this.m_discovered);
      return;
    })),fan.domkit.SashBox.$type);
  self.add(sash);
  self.m_devTree.rebuild();
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.textField = function(text,place)
{
  if (place === undefined) place = "";
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(text);
      it.placeholder$(place);
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      return;
    })),fan.domkit.TextField.$type);
}
fan.uiBuilder.BacnetDiscoverView.prototype.label = function(text)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.text$(text);
      it.style().trap("fontWeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["bold"]));
      return;
    })),fan.domkit.Label.$type);
}
fan.uiBuilder.BacnetDiscoverView.prototype.bcastAddrs = function()
{
  return this.m_bcastAddrs;
}
fan.uiBuilder.BacnetDiscoverView.prototype.bcastAddrs$ = function(it)
{
  this.m_bcastAddrs = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.bcastAddr = function()
{
  return this.m_bcastAddr;
}
fan.uiBuilder.BacnetDiscoverView.prototype.bcastAddr$ = function(it)
{
  this.m_bcastAddr = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.textLowRange = function()
{
  return this.m_textLowRange;
}
fan.uiBuilder.BacnetDiscoverView.prototype.textLowRange$ = function(it)
{
  this.m_textLowRange = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.textHighRange = function()
{
  return this.m_textHighRange;
}
fan.uiBuilder.BacnetDiscoverView.prototype.textHighRange$ = function(it)
{
  this.m_textHighRange = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.textTimeout = function()
{
  return this.m_textTimeout;
}
fan.uiBuilder.BacnetDiscoverView.prototype.textTimeout$ = function(it)
{
  this.m_textTimeout = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.discover = function()
{
  return this.m_discover;
}
fan.uiBuilder.BacnetDiscoverView.prototype.discover$ = function(it)
{
  this.m_discover = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.devTree = function()
{
  return this.m_devTree;
}
fan.uiBuilder.BacnetDiscoverView.prototype.devTree$ = function(it)
{
  this.m_devTree = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.addDev = function()
{
  return this.m_addDev;
}
fan.uiBuilder.BacnetDiscoverView.prototype.addDev$ = function(it)
{
  this.m_addDev = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.discovered = function()
{
  return this.m_discovered;
}
fan.uiBuilder.BacnetDiscoverView.prototype.discovered$ = function(it)
{
  this.m_discovered = it;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.loadBroadcastAddrs = function()
{
  var $this = this;
  this.m_session.m_api.eval("bacnetListBroadcastIps()").onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      var items = fan.sys.List.make(fan.sys.Str.$type, ["255.255.255.255"]);
      g.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u10,
        function(row)
        {
          if (row.missing("ip"))
          {
            return;
          }
          ;
          items.push(fan.sys.ObjUtil.coerce(row.trap("ip",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
          return;
        }));
      items.push("BBMD");
      $this.m_bcastAddrs.items$(items);
      $this.m_bcastAddrs.sel().index$(fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
      $this.m_bcastAddr.val$(fan.sys.ObjUtil.coerce(items.first(),fan.sys.Str.$type));
      $this.m_bcastAddrs.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u11,
        function(it)
        {
          if (fan.sys.ObjUtil.equals($this.m_bcastAddrs.sel().item(),"BBMD"))
          {
            $this.m_bcastAddr.placeholder$("<BBMD IP-address>[:<port>]");
            $this.m_bcastAddr.val$("");
          }
          else
          {
            $this.m_bcastAddr.placeholder$(null);
            $this.m_bcastAddr.val$(fan.sys.ObjUtil.coerce($this.m_bcastAddrs.sel().item(),fan.sys.Str.$type));
          }
          ;
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.onDiscover = function()
{
  var $this = this;
  var timeout = fan.haystack.Number.fromStr(this.m_textTimeout.val(),false);
  if (timeout == null)
  {
    return fan.ui.Flash.showErr(this,fan.sys.Str.plus("Invalid timeout: ",this.m_textTimeout.val()));
  }
  ;
  this.m_discover.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
  this.m_discovered.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
  var cmd = fan.sys.StrBuf.make().add("bacnetDeviceDiscovery(").add(fan.sys.Str.toCode(this.m_bcastAddr.val())).addChar(44).add(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",this.m_textLowRange.val()),".."),this.m_textHighRange.val()),",")).add(fan.sys.Str.plus(fan.sys.Str.plus("",timeout),")"));
  var ax = fan.ui.Flash.showActivity(this,fan.sys.Str.plus(fan.sys.Str.plus("",fan.uiBuilder.BacnetDiscoverView.$type.pod().locale("discover.discovering")),"..."));
  this.m_session.m_api.eval(cmd.toStr()).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      $this.m_discovered.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["visible"]));
      $this.loadDiscovery(g);
      return;
    })).onErr(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      fan.ui.Flash.showErr($this,g);
      return;
    })).onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      ax.close();
      $this.m_discover.enabled$(fan.sys.ObjUtil.coerce(true,fan.sys.Bool.$type.toNullable()));
      return;
    }));
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.loadDiscovery = function(g)
{
  var $this = this;
  var roots = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("uiBuilder::HostNode")),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u13,
    function(it)
    {
      it.ordered$(true);
      return;
    })),fan.sys.Type.find("[sys::Str:uiBuilder::HostNode]"));
  try
  {
    this.m_devTree.roots().clear();
    g.each(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u14,
      function(row)
      {
        var ip = row.get("host");
        var host = roots.getOrAdd(fan.sys.ObjUtil.coerce(ip,fan.sys.Str.$type),fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u15,
          function(it)
          {
            return fan.uiBuilder.HostNode.make(fan.sys.ObjUtil.coerce(ip,fan.sys.Str.$type));
          }));
        var dnet = (function($this) { var $_u16 = row.get("dNet"); if ($_u16 != null) return $_u16; return ""; })($this);
        var network = host.m_networks.getOrAdd(fan.sys.ObjUtil.coerce(dnet,fan.sys.Str.$type),fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u17,
          function(it)
          {
            return fan.uiBuilder.NetNode.make(fan.sys.ObjUtil.coerce(dnet,fan.sys.Str.$type));
          }));
        network.m_devices.add(fan.uiBuilder.DevNode.make(row));
        return;
      }));
    this.m_devTree.roots$(roots.vals());
  }
  finally
  {
    this.m_devTree.rebuild();
  }
  ;
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.doAddDevice = function()
{
  var $this = this;
  this.m_addDev.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
  var devNode = fan.sys.ObjUtil.as(this.m_devTree.sel().item(),fan.uiBuilder.DevNode.$type);
  var uri = devNode.uri();
  var dis = devNode.deviceName();
  if (fan.sys.Str.isEmpty(dis))
  {
    dis = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",devNode.m_device.trap("host",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])))," - "),devNode.deviceId());
  }
  ;
  var cmd = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("bacnetAddDevice(",fan.sys.Str.toCode(dis)),", "),uri.toCode()),")");
  var ax = fan.ui.Flash.showActivity(this,fan.sys.Str.plus(fan.sys.Str.plus("Adding ",dis),"..."));
  this.m_session.m_api.eval(cmd).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      fan.ui.Flash.showOk($this,fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Added ",dis)," with id "),g.first().id()));
      return;
    })).onErr(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      fan.ui.Flash.showErr($this,g);
      return;
    })).onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      ax.close();
      $this.m_addDev.enabled$(fan.sys.ObjUtil.coerce(true,fan.sys.Bool.$type.toNullable()));
      return;
    }));
  return;
}
fan.uiBuilder.BacnetDiscoverView.prototype.m_bcastAddrs = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_bcastAddr = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_textLowRange = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_textHighRange = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_textTimeout = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_discover = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_devTree = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_addDev = null;
fan.uiBuilder.BacnetDiscoverView.prototype.m_discovered = null;
fan.uiBuilder.HostNode = fan.sys.Obj.$extend(fan.domkit.TreeNode);
fan.uiBuilder.HostNode.prototype.$ctor = function()
{
  fan.domkit.TreeNode.prototype.$ctor.call(this);
  var $this = this;
  this.m_networks = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Obj"),fan.sys.Type.find("sys::Obj?")),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u18,
    function(it)
    {
      it.ordered$(true);
      return;
    })),fan.sys.Type.find("[sys::Obj:sys::Obj?]")),fan.sys.Type.find("[sys::Str:uiBuilder::NetNode]"));
  return;
}
fan.uiBuilder.HostNode.prototype.$typeof = function() { return fan.uiBuilder.HostNode.$type; }
fan.uiBuilder.HostNode.make = function(ip) {
  var self = new fan.uiBuilder.HostNode();
  fan.uiBuilder.HostNode.make$(self,ip);
  return self;
  }
fan.uiBuilder.HostNode.make$ = function(self,ip)
{
  fan.domkit.TreeNode.make$(self);
  ;
  self.m_ip = ip;
  return;
}
fan.uiBuilder.HostNode.prototype.networks = function()
{
  return this.m_networks;
}
fan.uiBuilder.HostNode.prototype.networks$ = function(it)
{
  this.m_networks = it;
  return;
}
fan.uiBuilder.HostNode.prototype.children = function()
{
  var $this = this;
  return this.m_networks.vals().sort(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u19,
    function(a,b)
    {
      return fan.sys.ObjUtil.compare(a.m_dnet,b.m_dnet);
    }));
}
fan.uiBuilder.HostNode.prototype.onElem = function(elem,flags)
{
  elem.text$(this.m_ip);
  return;
}
fan.uiBuilder.HostNode.prototype.m_ip = null;
fan.uiBuilder.HostNode.prototype.m_networks = null;
fan.uiBuilder.NetNode = fan.sys.Obj.$extend(fan.domkit.TreeNode);
fan.uiBuilder.NetNode.prototype.$ctor = function()
{
  fan.domkit.TreeNode.prototype.$ctor.call(this);
  var $this = this;
  this.m_devices = fan.sys.List.make(fan.uiBuilder.DevNode.$type);
  return;
}
fan.uiBuilder.NetNode.prototype.$typeof = function() { return fan.uiBuilder.NetNode.$type; }
fan.uiBuilder.NetNode.make = function(dnet) {
  var self = new fan.uiBuilder.NetNode();
  fan.uiBuilder.NetNode.make$(self,dnet);
  return self;
  }
fan.uiBuilder.NetNode.make$ = function(self,dnet)
{
  fan.domkit.TreeNode.make$(self);
  ;
  self.m_dnet = dnet;
  return;
}
fan.uiBuilder.NetNode.prototype.devices = function()
{
  return this.m_devices;
}
fan.uiBuilder.NetNode.prototype.devices$ = function(it)
{
  this.m_devices = it;
  return;
}
fan.uiBuilder.NetNode.prototype.children = function()
{
  return this.m_devices;
}
fan.uiBuilder.NetNode.prototype.onElem = function(elem,flags)
{
  var text = (function($this) { if (fan.sys.Str.isEmpty($this.m_dnet)) return fan.sys.Str.plus("",fan.uiBuilder.NetNode.$type.pod().locale("discover.local")); return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("network"))," "),$this.m_dnet); })(this);
  elem.text$(text);
  return;
}
fan.uiBuilder.NetNode.prototype.m_dnet = null;
fan.uiBuilder.NetNode.prototype.m_devices = null;
fan.uiBuilder.DevNode = fan.sys.Obj.$extend(fan.domkit.TreeNode);
fan.uiBuilder.DevNode.prototype.$ctor = function()
{
  fan.domkit.TreeNode.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.DevNode.prototype.$typeof = function() { return fan.uiBuilder.DevNode.$type; }
fan.uiBuilder.DevNode.make = function(device) {
  var self = new fan.uiBuilder.DevNode();
  fan.uiBuilder.DevNode.make$(self,device);
  return self;
  }
fan.uiBuilder.DevNode.make$ = function(self,device)
{
  fan.domkit.TreeNode.make$(self);
  self.m_device = device;
  return;
}
fan.uiBuilder.DevNode.prototype.deviceName = function()
{
  return fan.sys.ObjUtil.coerce(this.m_device.trap("bacnetDeviceName",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
}
fan.uiBuilder.DevNode.prototype.deviceId = function()
{
  return fan.sys.ObjUtil.coerce(this.m_device.trap("deviceId",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
}
fan.uiBuilder.DevNode.prototype.deviceAdr = function()
{
  return fan.sys.ObjUtil.coerce(this.m_device.get("dAdr"),fan.sys.Str.$type.toNullable());
}
fan.uiBuilder.DevNode.prototype.uri = function()
{
  var net = fan.sys.ObjUtil.as(this.parent(),fan.uiBuilder.NetNode.$type);
  return (function($this) { if (fan.sys.Str.isEmpty(net.m_dnet)) return fan.sys.Str.toUri(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("bacnet://",$this.m_device.trap("host",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))),"/"),$this.deviceId())); return fan.sys.Str.toUri(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("bacnet://",$this.m_device.trap("host",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))),"/"),$this.deviceId()),"?dnet="),net.m_dnet),"&dadr="),$this.deviceAdr())); })(this);
}
fan.uiBuilder.DevNode.prototype.onElem = function(elem,flags)
{
  var $this = this;
  var address = "";
  if (this.deviceAdr() != null)
  {
    address = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(" - ",fan.uiBuilder.DevNode.$type.pod().locale("discover.address")),": "),this.deviceAdr());
  }
  ;
  elem.removeAll();
  elem.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",$this.deviceName()));
      it.style().trap("fontWeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["bold"]));
      return;
    })),fan.domkit.Label.$type));
  elem.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(" - ",fan.uiBuilder.DevNode.$type.pod().locale("discover.deviceId")),": "),$this.deviceId()),""),address));
      return;
    })),fan.domkit.Label.$type));
  return;
}
fan.uiBuilder.DevNode.prototype.m_device = null;
fan.uiBuilder.CbBoxTable = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.CbBoxTable.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.CbBoxTable.prototype.$typeof = function() { return fan.uiBuilder.CbBoxTable.$type; }
fan.uiBuilder.CbBoxTable.make = function(model) {
  var self = new fan.uiBuilder.CbBoxTable();
  fan.uiBuilder.CbBoxTable.make$(self,model);
  return self;
  }
fan.uiBuilder.CbBoxTable.make$ = function(self,model)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.m_model = model;
  self.m_conns = fan.uiBuilder.CbBoxConn.make(model);
  self.m_points = fan.uiBuilder.CbBoxPoint.make(model);
  self.add((function($this) { var $_u22 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%"]));
      it.resizable$(true);
      it.add($this.m_conns);
      return;
    })),fan.domkit.SashBox.$type); $this.m_sash = $_u22; return $_u22; })(self));
  return;
}
fan.uiBuilder.CbBoxTable.prototype.prime = function()
{
  this.m_conns.onSelect();
  this.m_points.onSelect();
  return;
}
fan.uiBuilder.CbBoxTable.prototype.onUpdate = function(onConns)
{
  if (onConns === undefined) onConns = null;
  this.m_conns.onLoading();
  var sk = this.m_sash.children().size();
  if ((this.m_model.m_showPoints && fan.sys.ObjUtil.compareNE(sk,3)))
  {
    this.m_sash.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["50%","10px","50%"]));
    fan.sys.ObjUtil.coerce(this.m_sash.removeAll(),fan.domkit.SashBox.$type).addAll(fan.sys.List.make(fan.dom.Elem.$type, [this.m_conns,fan.domkit.SashBox.div(),this.m_points]));
  }
  else
  {
    if ((!this.m_model.m_showPoints && fan.sys.ObjUtil.compareNE(sk,1)))
    {
      this.m_sash.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%"]));
      fan.sys.ObjUtil.coerce(this.m_sash.removeAll(),fan.domkit.SashBox.$type).add(this.m_conns);
    }
    ;
  }
  ;
  this.m_model.m_req.loadConns(fan.sys.ObjUtil.coerce(this.m_model.m_selectedExt.trap("tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type),this.m_model.m_filter,this.m_conns,fan.sys.ObjUtil.coerce(onConns,fan.sys.Type.find("|haystack::Dict[]->sys::Void|?")));
  return;
}
fan.uiBuilder.CbBoxTable.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbBoxTable.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbBoxTable.prototype.sash = function()
{
  return this.m_sash;
}
fan.uiBuilder.CbBoxTable.prototype.sash$ = function(it)
{
  this.m_sash = it;
  return;
}
fan.uiBuilder.CbBoxTable.prototype.conns = function()
{
  return this.m_conns;
}
fan.uiBuilder.CbBoxTable.prototype.conns$ = function(it)
{
  this.m_conns = it;
  return;
}
fan.uiBuilder.CbBoxTable.prototype.points = function()
{
  return this.m_points;
}
fan.uiBuilder.CbBoxTable.prototype.points$ = function(it)
{
  this.m_points = it;
  return;
}
fan.uiBuilder.CbBoxTable.prototype.m_model = null;
fan.uiBuilder.CbBoxTable.prototype.m_sash = null;
fan.uiBuilder.CbBoxTable.prototype.m_conns = null;
fan.uiBuilder.CbBoxTable.prototype.m_points = null;
fan.uiBuilder.CbBoxPimTable = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.CbBoxPimTable.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.CbBoxPimTable.prototype.$typeof = function() { return fan.uiBuilder.CbBoxPimTable.$type; }
fan.uiBuilder.CbBoxPimTable.prototype.pim = function()
{
  return this.table().pim();
}
fan.uiBuilder.CbBoxPimTable.prototype.onFeed = function(event)
{
  this.table().onFeed(event);
  return;
}
fan.uiBuilder.CbBoxPimTable.make = function() {
  var self = new fan.uiBuilder.CbBoxPimTable();
  fan.uiBuilder.CbBoxPimTable.make$(self);
  return self;
  }
fan.uiBuilder.CbBoxPimTable.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  return;
}
fan.uiBuilder.ConnBuilder = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiBuilder.ConnBuilder.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_isInit = false;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.$typeof = function() { return fan.uiBuilder.ConnBuilder.$type; }
fan.uiBuilder.ConnBuilder.make = function() {
  var self = new fan.uiBuilder.ConnBuilder();
  fan.uiBuilder.ConnBuilder.make$(self);
  return self;
  }
fan.uiBuilder.ConnBuilder.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  ;
  self.m_model = fan.uiBuilder.CbModel.make(self);
  self.m_toolbar = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      return;
    })),fan.domkit.Box.$type);
  self.m_list = fan.uiBuilder.CbBoxList.make(self.m_model);
  self.m_table = fan.uiBuilder.CbBoxTable.make(self.m_model);
  self.m_details = fan.uiBuilder.CbBoxDetail.make(self.m_model);
  self.m_table.prime();
  self.m_sashRight = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      fan.sys.ObjUtil.coerce(it.add($this.m_toolbar),fan.domkit.SashBox.$type).add((function($this) { var $_u24 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          it.dir$(fan.domkit.Dir.m_right);
          it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%"]));
          it.add($this.m_table);
          return;
        })),fan.domkit.SashBox.$type); $this.m_sashBottom = $_u24; return $_u24; })($this));
      return;
    })),fan.domkit.SashBox.$type);
  self.add((function($this) { var $_u25 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["15%","10px","85%"]));
      it.resizable$(true);
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_list),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add($this.m_sashRight);
      return;
    })),fan.domkit.SashBox.$type); $this.m_sashTop = $_u25; return $_u25; })(self));
  return;
}
fan.uiBuilder.ConnBuilder.prototype.sel = function()
{
  return this.m_table.m_points.sel();
}
fan.uiBuilder.ConnBuilder.prototype.onUpdate = function()
{
  var $this = this;
  if (!this.m_isInit)
  {
    this.m_isInit = true;
    this.m_model.init(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u26,
      function(it)
      {
        if (!$this.checkNew())
        {
          var ext = fan.sys.ObjUtil.as($this.$var("selectedExt"),fan.sys.Str.$type);
          var conn = fan.sys.ObjUtil.as($this.$var("selectedConn"),fan.haystack.Ref.$type);
          var filter = fan.sys.ObjUtil.as($this.$var("filter"),fan.sys.Str.$type);
          $this.m_model.restore(ext,conn,filter);
        }
        ;
        return;
      }));
  }
  ;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.reload = function()
{
  this.m_isInit = false;
  this.onUpdate();
  return;
}
fan.uiBuilder.ConnBuilder.prototype.onLayout = function()
{
  var sk = this.m_sashBottom.children().size();
  if ((this.m_model.m_showDetails && fan.sys.ObjUtil.compareNE(sk,3)))
  {
    this.m_sashBottom.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["54%","10px","46%"]));
    fan.sys.ObjUtil.coerce(this.m_sashBottom.removeAll(),fan.domkit.SashBox.$type).addAll(fan.sys.List.make(fan.dom.Elem.$type, [this.m_table,fan.domkit.SashBox.div(),this.m_details]));
  }
  else
  {
    if ((!this.m_model.m_showDetails && fan.sys.ObjUtil.compareNE(sk,1)))
    {
      this.m_sashBottom.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%"]));
      fan.sys.ObjUtil.coerce(this.m_sashBottom.removeAll(),fan.domkit.SashBox.$type).add(this.m_table);
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.checkNew = function()
{
  if (fan.dom.Win.cur().sessionStorage().get("fresco.cb.new") != null)
  {
    fan.dom.Win.cur().sessionStorage().remove("fresco.cb.new");
    this.m_model.m_actions.newConn();
    return true;
  }
  ;
  return false;
}
fan.uiBuilder.ConnBuilder.prototype.reloadNew = function()
{
  fan.dom.Win.cur().sessionStorage().set("fresco.cb.new",fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type));
  this.m_session.reload();
  return;
}
fan.uiBuilder.ConnBuilder.prototype.isInit = function()
{
  return this.m_isInit;
}
fan.uiBuilder.ConnBuilder.prototype.isInit$ = function(it)
{
  this.m_isInit = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.ConnBuilder.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.sashTop = function()
{
  return this.m_sashTop;
}
fan.uiBuilder.ConnBuilder.prototype.sashTop$ = function(it)
{
  this.m_sashTop = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.sashRight = function()
{
  return this.m_sashRight;
}
fan.uiBuilder.ConnBuilder.prototype.sashRight$ = function(it)
{
  this.m_sashRight = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.sashBottom = function()
{
  return this.m_sashBottom;
}
fan.uiBuilder.ConnBuilder.prototype.sashBottom$ = function(it)
{
  this.m_sashBottom = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.toolbar = function()
{
  return this.m_toolbar;
}
fan.uiBuilder.ConnBuilder.prototype.toolbar$ = function(it)
{
  this.m_toolbar = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.list = function()
{
  return this.m_list;
}
fan.uiBuilder.ConnBuilder.prototype.list$ = function(it)
{
  this.m_list = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.table = function()
{
  return this.m_table;
}
fan.uiBuilder.ConnBuilder.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.details = function()
{
  return this.m_details;
}
fan.uiBuilder.ConnBuilder.prototype.details$ = function(it)
{
  this.m_details = it;
  return;
}
fan.uiBuilder.ConnBuilder.prototype.m_isInit = false;
fan.uiBuilder.ConnBuilder.prototype.m_model = null;
fan.uiBuilder.ConnBuilder.prototype.m_sashTop = null;
fan.uiBuilder.ConnBuilder.prototype.m_sashRight = null;
fan.uiBuilder.ConnBuilder.prototype.m_sashBottom = null;
fan.uiBuilder.ConnBuilder.prototype.m_toolbar = null;
fan.uiBuilder.ConnBuilder.prototype.m_list = null;
fan.uiBuilder.ConnBuilder.prototype.m_table = null;
fan.uiBuilder.ConnBuilder.prototype.m_details = null;
fan.uiBuilder.CbBoxConn = fan.sys.Obj.$extend(fan.uiBuilder.CbBoxPimTable);
fan.uiBuilder.CbBoxConn.prototype.$ctor = function()
{
  fan.uiBuilder.CbBoxPimTable.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_buttons = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("domkit::Button"));
  return;
}
fan.uiBuilder.CbBoxConn.prototype.$typeof = function() { return fan.uiBuilder.CbBoxConn.$type; }
fan.uiBuilder.CbBoxConn.make = function(model) {
  var self = new fan.uiBuilder.CbBoxConn();
  fan.uiBuilder.CbBoxConn.make$(self,model);
  return self;
  }
fan.uiBuilder.CbBoxConn.make$ = function(self,model)
{
  var $this = self;
  fan.uiBuilder.CbBoxPimTable.make$(self);
  ;
  self.m_model = model;
  self.table$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTable.make(model.session().m_pim.grid(fan.haystack.Etc.makeEmptyGrid())),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u27,
    function(it)
    {
      it.sel().multi$(true);
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u27,
        function(it)
        {
          $this.onSelect();
          return;
        }));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u27,
        function(it)
        {
          model.m_actions.edit(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.ui.UiPimTable.$type));
  var b = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("domkit::Button")),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u28,
    function(it)
    {
      it.ordered$(true);
      return;
    })),fan.sys.Type.find("[sys::Str:domkit::Button]"));
  b.set("edit",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("edit")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.edit(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("dup",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("dup")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.dup(fan.sys.ObjUtil.coerce($this.table().sel().item(),fan.haystack.Dict.$type));
          return;
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("trash",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("trash")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.trash(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("enable",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("enable")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.enable(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("disable",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("disable")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.disable(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("ping",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("ping")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.ping(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("close",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("close")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.close(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("cxmenu",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().addClass("disclosure");
      it.trap("title",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("contextMenu"))]));
      it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline("context"));
          return;
        })));
      it.onPopup(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u30,
        function(it)
        {
          return fan.ui.UiContextMenu.buildMenu(model.m_view,$this.table().selIds());
        }));
      return;
    })),fan.domkit.Button.$type));
  b.set("points",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u31,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("points")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u31,
        function(it)
        {
          model.togglePoints();
          return;
        }));
      return;
    })),fan.domkit.ToggleButton.$type));
  b.set("details",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u31,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("details")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u31,
        function(it)
        {
          model.toggleDetails();
          return;
        }));
      return;
    })),fan.domkit.ToggleButton.$type));
  self.m_buttons = b;
  b.get("details").style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
  self.m_filter = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
      it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["200px"]));
      it.placeholder$("Filter...");
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u32,
        function(t)
        {
          model.selectConnFilter(fan.sys.Str.trimToNull(t.val()));
          return;
        }));
      return;
    })),fan.domkit.TextField.$type);
  var connToolbar = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px","4px","20px","4px","20px","4px","20px","20px","0px","0px"]));
      fan.sys.ObjUtil.coerce(it.addAll(b.vals()),fan.domkit.FlowBox.$type).add($this.m_filter);
      return;
    })),fan.domkit.FlowBox.$type);
  model.m_view.m_toolbar.add(connToolbar);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiUtil.makeEmptyBox(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      return;
    })),fan.domkit.Box.$type));
  return;
}
fan.uiBuilder.CbBoxConn.prototype.onLoading = function()
{
  this.replace(fan.sys.ObjUtil.coerce(this.lastChild(),fan.dom.Elem.$type),fan.ui.UiUtil.makeSpinnerBox());
  return;
}
fan.uiBuilder.CbBoxConn.prototype.onLoad = function(grid)
{
  var $this = this;
  grid = grid.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u33,
    function(r)
    {
      return r.has("conn");
    })).sortDis();
  this.m_filter.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u34 = $this.m_model.m_filter; if ($_u34 != null) return $_u34; return ""; })(this),fan.sys.Str.$type));
  fan.sys.ObjUtil.as(this.m_buttons.get("points"),fan.domkit.ToggleButton.$type).selected$(this.m_model.m_showPoints);
  fan.sys.ObjUtil.as(this.m_buttons.get("details"),fan.domkit.ToggleButton.$type).selected$(this.m_model.m_showDetails);
  this.table().update(this.m_model.session().m_pim.grid(grid));
  this.replace(fan.sys.ObjUtil.coerce(this.lastChild(),fan.dom.Elem.$type),this.table());
  this.onSelect();
  return;
}
fan.uiBuilder.CbBoxConn.prototype.sel = function()
{
  return fan.sys.ObjUtil.coerce(this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]"));
}
fan.uiBuilder.CbBoxConn.prototype.clearSel = function()
{
  this.table().sel().clear();
  return;
}
fan.uiBuilder.CbBoxConn.prototype.syncSel = function(conn)
{
  var $this = this;
  if (conn != null)
  {
    this.table().sel().index$(fan.sys.ObjUtil.coerce(this.table().pim().findRow(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u35,
      function(r)
      {
        return fan.sys.ObjUtil.equals(r.m_id,conn.id());
      })).index(),fan.sys.Int.$type.toNullable()));
  }
  ;
  return;
}
fan.uiBuilder.CbBoxConn.prototype.onSelect = function()
{
  var conns = fan.sys.ObjUtil.coerce(this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]"));
  this.m_buttons.get("edit").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(conns.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("dup").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.equals(conns.size(),1),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("trash").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(conns.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("enable").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(conns.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("disable").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(conns.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("ping").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(conns.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("close").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(conns.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("cxmenu").enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(conns.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("points").enabled$(fan.sys.ObjUtil.coerce(this.m_model.m_selectedExt != null,fan.sys.Bool.$type.toNullable()));
  this.m_buttons.get("details").enabled$(fan.sys.ObjUtil.coerce(this.m_model.m_selectedExt != null,fan.sys.Bool.$type.toNullable()));
  this.m_filter.enabled$(fan.sys.ObjUtil.coerce(this.m_model.m_selectedExt != null,fan.sys.Bool.$type.toNullable()));
  this.m_model.selectConn(conns);
  return;
}
fan.uiBuilder.CbBoxConn.prototype.connCols = function(grid)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(grid.size(),0))
  {
    return fan.sys.ObjUtil.coerce(fan.sys.Str.$type.emptyList(),fan.sys.Type.find("sys::Str[]"));
  }
  ;
  var cols = fan.sys.List.make(fan.sys.Str.$type);
  grid.colNames().each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u36,
    function(c)
    {
      if (fan.sys.ObjUtil.equals(c,"id"))
      {
        return;
      }
      ;
      if (fan.sys.ObjUtil.equals(c,"mod"))
      {
        return;
      }
      ;
      if (grid.any(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u33,
        function(r)
        {
          return r.get(c) != null;
        })))
      {
        cols.add(c);
      }
      ;
      return;
    }));
  return fan.sys.List.make(fan.sys.Str.$type, ["dis","uri","connState","connStatus","connErr"]).addAll(cols.sort()).unique();
}
fan.uiBuilder.CbBoxConn.prototype.table = function()
{
  return this.m_table;
}
fan.uiBuilder.CbBoxConn.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.uiBuilder.CbBoxConn.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbBoxConn.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbBoxConn.prototype.filter = function()
{
  return this.m_filter;
}
fan.uiBuilder.CbBoxConn.prototype.filter$ = function(it)
{
  this.m_filter = it;
  return;
}
fan.uiBuilder.CbBoxConn.prototype.buttons = function()
{
  return this.m_buttons;
}
fan.uiBuilder.CbBoxConn.prototype.buttons$ = function(it)
{
  this.m_buttons = it;
  return;
}
fan.uiBuilder.CbBoxConn.prototype.m_table = null;
fan.uiBuilder.CbBoxConn.prototype.m_model = null;
fan.uiBuilder.CbBoxConn.prototype.m_filter = null;
fan.uiBuilder.CbBoxConn.prototype.m_buttons = null;
fan.uiBuilder.CbNewConnDialog = fan.sys.Obj.$extend(fan.ui.ContentDialog);
fan.uiBuilder.CbNewConnDialog.prototype.$ctor = function()
{
  fan.ui.ContentDialog.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_selIndex = null;
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.$typeof = function() { return fan.uiBuilder.CbNewConnDialog.$type; }
fan.uiBuilder.CbNewConnDialog.make = function(view) {
  var self = new fan.uiBuilder.CbNewConnDialog();
  fan.uiBuilder.CbNewConnDialog.make$(self,view);
  return self;
  }
fan.uiBuilder.CbNewConnDialog.make$ = function(self,view)
{
  var $this = self;
  fan.ui.ContentDialog.make$(self);
  ;
  self.m_view = view;
  self.title$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("new"))," "),fan.sys.Pod.find("ui").locale("conn")));
  self.width$("400px");
  self.height$("400px");
  self.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("domkit-border-top domkit-border-bottom");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("overflowY",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      return;
    })),fan.domkit.Box.$type));
  self.addButton("ok",null,true);
  self.addButton("cancel");
  self.onAction(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u37,
    function(key)
    {
      if (fan.sys.ObjUtil.equals(key,"cancel"))
      {
        return true;
      }
      ;
      var r = $this.m_grid.get(fan.sys.ObjUtil.coerce($this.m_selIndex,fan.sys.Int.$type));
      (function($this) { var $_u38 = $this.m_cbOk; if ($_u38 == null) return null; return $_u38.call(fan.sys.ObjUtil.coerce(r.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Obj.$type)); })($this);
      return true;
    }));
  self.reload();
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.onOk = function(f)
{
  this.m_cbOk = f;
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.reload = function()
{
  var $this = this;
  this.setOk(false);
  this.m_selIndex = null;
  fan.sys.ObjUtil.coerce(this.content().removeAll(),fan.dom.Elem.$type.toNullable()).add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u39,
    function(it)
    {
      return;
    })));
  fan.ui.UiSession.cur().m_api.eval("connBuilderExts()").onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      var box = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u2,
        function(it)
        {
          it.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
          it.halign$(fan.domkit.Align.m_fill);
          it.cellStyle("*","*","padding: 4px 10px; cursor: default");
          it.cellStyle(fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type),"*","text-align: right");
          it.cellStyle("*","even","background-color: #f9f9fa");
          return;
        })),fan.domkit.GridBox.$type);
      $this.m_grid = g;
      $this.m_grid.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u40,
        function(r,i)
        {
          var enabled = fan.sys.ObjUtil.equals(r.trap("enabled",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),true);
          var color = (function($this) { if (enabled) return fan.ui.Colors.m_purple; return "#bbb"; })($this);
          var label = fan.ui.UiLabel.make(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u29,
            function(it)
            {
              if (!enabled)
              {
                it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[color]));
              }
              ;
              it.icon$(fan.ui.Icon.outline(fan.sys.ObjUtil.coerce(r.trap("icon",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type),color));
              it.label$(fan.sys.ObjUtil.toStr(r.trap("dis",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))));
              return;
            }));
          var status = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[color]));
              it.text$((function($this) { if (enabled) return ""; return fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("extDisabled")); })($this));
              return;
            })),fan.domkit.Label.$type);
          var button = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              if (enabled)
              {
                it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
              }
              ;
              it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("enable")));
              it.onAction(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u1,
                function(it)
                {
                  $this.onEnableExt(r);
                  return;
                }));
              return;
            })),fan.domkit.Button.$type);
          box.addRow(fan.sys.List.make(fan.dom.Elem.$type, [label,status,button]));
          return;
        }));
      if (fan.sys.ObjUtil.equals((function($this) { var $_u43 = $this.m_grid.first(); if ($_u43 == null) return null; return $_u43.trap("enabled",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])); })($this),true))
      {
        $this.onSelect(box,fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type));
      }
      ;
      box.onEvent("keydown",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.onKeyEvent(box,e);
          return;
        }));
      box.onEvent("mousedown",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.onSelect(box,e);
          return;
        }));
      box.onEvent("dblclick",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.fireAction("ok");
          return;
        }));
      fan.sys.ObjUtil.coerce($this.content().removeAll(),fan.dom.Elem.$type.toNullable()).add(box);
      fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u45,
        function(it)
        {
          box.focus();
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.onKeyEvent = function(box,e)
{
  if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_up))
  {
    var n = (function($this) { if ($this.m_selIndex == null) return 0; return fan.sys.Int.minus(fan.sys.ObjUtil.coerce($this.m_selIndex,fan.sys.Int.$type),1); })(this);
    var r = this.m_grid.getSafe(n);
    if ((r != null && fan.sys.ObjUtil.equals(r.trap("enabled",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),true)))
    {
      this.onSelect(box,fan.sys.ObjUtil.coerce(n,fan.sys.Obj.$type));
    }
    ;
    e.stop();
  }
  else
  {
    if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_down))
    {
      var n = (function($this) { if ($this.m_selIndex == null) return 0; return fan.sys.Int.plus(fan.sys.ObjUtil.coerce($this.m_selIndex,fan.sys.Int.$type),1); })(this);
      var r = this.m_grid.getSafe(n);
      if ((r != null && fan.sys.ObjUtil.equals(r.trap("enabled",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),true)))
      {
        this.onSelect(box,fan.sys.ObjUtil.coerce(n,fan.sys.Obj.$type));
      }
      ;
      e.stop();
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.onSelect = function(box,obj)
{
  var $this = this;
  var i = (function($this) { var $_u48 = fan.sys.ObjUtil.as(obj,fan.sys.Int.$type); if ($_u48 != null) return $_u48; return box.rowIndexOf(fan.sys.ObjUtil.coerce(obj,fan.dom.Event.$type).target()); })(this);
  if (fan.sys.ObjUtil.equals(i,this.m_selIndex))
  {
    return;
  }
  ;
  var rows = box.querySelectorAll("tr");
  if (this.m_selIndex != null)
  {
    rows.get(fan.sys.ObjUtil.coerce(this.m_selIndex,fan.sys.Int.$type)).querySelectorAll("td").each(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u49,
      function(td)
      {
        td.style().removeClass("domkit-sel");
        (function($this) { var $_u50 = (function($this) { var $_u51 = td.querySelector("img"); if ($_u51 == null) return null; return $_u51.style(); })($this); if ($_u50 == null) return null; return $_u50.trap("filter",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null])); })($this);
        return;
      }));
  }
  ;
  if ((i == null || fan.sys.ObjUtil.equals(this.m_grid.get(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type)).trap("enabled",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),false)))
  {
    this.m_selIndex = null;
    this.setOk(false);
    return;
  }
  ;
  this.m_selIndex = i;
  rows.get(fan.sys.ObjUtil.coerce(this.m_selIndex,fan.sys.Int.$type)).querySelectorAll("td").each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u49,
    function(td)
    {
      td.style().addClass("domkit-sel");
      (function($this) { var $_u52 = (function($this) { var $_u53 = td.querySelector("img"); if ($_u53 == null) return null; return $_u53.style(); })($this); if ($_u52 == null) return null; return $_u52.trap("filter",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["brightness(100)"])); })($this);
      return;
    }));
  this.setOk(true);
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.onEnableExt = function(r)
{
  var $this = this;
  fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("extAdd(",fan.haystack.Etc.toAxon(r.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])))),")")).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      $this.m_view.reloadNew();
      return;
    }));
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.setOk = function(v)
{
  this.button("ok").enabled$(fan.sys.ObjUtil.coerce(v,fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.CbNewConnDialog.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.selIndex = function()
{
  return this.m_selIndex;
}
fan.uiBuilder.CbNewConnDialog.prototype.selIndex$ = function(it)
{
  this.m_selIndex = it;
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.grid = function()
{
  return this.m_grid;
}
fan.uiBuilder.CbNewConnDialog.prototype.grid$ = function(it)
{
  this.m_grid = it;
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.cbOk = function()
{
  return this.m_cbOk;
}
fan.uiBuilder.CbNewConnDialog.prototype.cbOk$ = function(it)
{
  this.m_cbOk = it;
  return;
}
fan.uiBuilder.CbNewConnDialog.prototype.m_view = null;
fan.uiBuilder.CbNewConnDialog.prototype.m_selIndex = null;
fan.uiBuilder.CbNewConnDialog.prototype.m_grid = null;
fan.uiBuilder.CbNewConnDialog.prototype.m_cbOk = null;
fan.uiBuilder.CbBoxPoint = fan.sys.Obj.$extend(fan.uiBuilder.CbBoxPimTable);
fan.uiBuilder.CbBoxPoint.prototype.$ctor = function()
{
  fan.uiBuilder.CbBoxPimTable.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cols = fan.sys.List.make(fan.sys.Str.$type);
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.$typeof = function() { return fan.uiBuilder.CbBoxPoint.$type; }
fan.uiBuilder.CbBoxPoint.make = function(model) {
  var self = new fan.uiBuilder.CbBoxPoint();
  fan.uiBuilder.CbBoxPoint.make$(self,model);
  return self;
  }
fan.uiBuilder.CbBoxPoint.make$ = function(self,model)
{
  var $this = self;
  fan.uiBuilder.CbBoxPimTable.make$(self);
  ;
  self.m_model = model;
  self.table$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTable.make(model.session().m_pim.grid(fan.haystack.Etc.makeEmptyGrid())),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u27,
    function(it)
    {
      it.sel().multi$(true);
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u27,
        function(it)
        {
          $this.onSelect();
          return;
        }));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u27,
        function(it)
        {
          model.m_actions.edit(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.ui.UiPimTable.$type));
  self.m_edit = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("edit")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.edit(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_trash = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("trash")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.m_actions.trash(fan.sys.ObjUtil.coerce($this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_cxMenu = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().addClass("disclosure");
      it.trap("title",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("contextMenu"))]));
      it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline("context"));
          return;
        })));
      it.onPopup(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u30,
        function(it)
        {
          return fan.ui.UiContextMenu.buildMenu(model.m_view,$this.table().selIds());
        }));
      return;
    })),fan.domkit.Button.$type);
  self.add((function($this) { var $_u54 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px","20px"]));
          fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_edit),fan.domkit.FlowBox.$type).add($this.m_trash),fan.domkit.FlowBox.$type).add($this.m_cxMenu);
          return;
        })),fan.domkit.FlowBox.$type)),fan.domkit.SashBox.$type).add($this.table());
      return;
    })),fan.domkit.SashBox.$type); $this.m_sash = $_u54; return $_u54; })(self));
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.onLoading = function()
{
  this.m_sash.replace(fan.sys.ObjUtil.coerce(this.m_sash.lastChild(),fan.dom.Elem.$type),fan.ui.UiUtil.makeSpinnerBox());
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.onLoad = function(grid)
{
  grid = grid.sortDis();
  this.table().sel().clear();
  this.table().update(this.m_model.session().m_pim.grid(grid));
  this.m_sash.replace(fan.sys.ObjUtil.coerce(this.m_sash.lastChild(),fan.dom.Elem.$type),this.table());
  this.onSelect();
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.sel = function()
{
  return fan.sys.ObjUtil.coerce(this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]"));
}
fan.uiBuilder.CbBoxPoint.prototype.onSelect = function()
{
  var points = fan.sys.ObjUtil.coerce(this.table().sel().items(),fan.sys.Type.find("haystack::Dict[]"));
  this.m_edit.enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(points.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_trash.enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(points.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_cxMenu.enabled$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(points.size(),0),fan.sys.Bool.$type.toNullable()));
  this.m_model.selectPoint(points);
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.pointCols = function(grid)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(grid.size(),0))
  {
    return fan.sys.ObjUtil.coerce(fan.sys.Str.$type.emptyList(),fan.sys.Type.find("sys::Str[]"));
  }
  ;
  var cols = fan.sys.List.make(fan.sys.Str.$type);
  grid.colNames().each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u36,
    function(c)
    {
      if (fan.sys.ObjUtil.equals(c,"mod"))
      {
        return;
      }
      ;
      if (grid.any(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u33,
        function(r)
        {
          return r.get(c) != null;
        })))
      {
        cols.add(c);
      }
      ;
      return;
    }));
  return fan.sys.List.make(fan.sys.Str.$type, ["id","connRef","curStatus","curVal","writeStatus","writeVal","writeLevel","hisStatus"]).addAll(cols.sort()).unique();
}
fan.uiBuilder.CbBoxPoint.prototype.table = function()
{
  return this.m_table;
}
fan.uiBuilder.CbBoxPoint.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbBoxPoint.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.sash = function()
{
  return this.m_sash;
}
fan.uiBuilder.CbBoxPoint.prototype.sash$ = function(it)
{
  this.m_sash = it;
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.cols = function()
{
  return this.m_cols;
}
fan.uiBuilder.CbBoxPoint.prototype.cols$ = function(it)
{
  this.m_cols = it;
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.edit = function()
{
  return this.m_edit;
}
fan.uiBuilder.CbBoxPoint.prototype.edit$ = function(it)
{
  this.m_edit = it;
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.trash = function()
{
  return this.m_trash;
}
fan.uiBuilder.CbBoxPoint.prototype.trash$ = function(it)
{
  this.m_trash = it;
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.cxMenu = function()
{
  return this.m_cxMenu;
}
fan.uiBuilder.CbBoxPoint.prototype.cxMenu$ = function(it)
{
  this.m_cxMenu = it;
  return;
}
fan.uiBuilder.CbBoxPoint.prototype.m_table = null;
fan.uiBuilder.CbBoxPoint.prototype.m_model = null;
fan.uiBuilder.CbBoxPoint.prototype.m_sash = null;
fan.uiBuilder.CbBoxPoint.prototype.m_cols = null;
fan.uiBuilder.CbBoxPoint.prototype.m_edit = null;
fan.uiBuilder.CbBoxPoint.prototype.m_trash = null;
fan.uiBuilder.CbBoxPoint.prototype.m_cxMenu = null;
fan.uiBuilder.CbActions = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.CbActions.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.CbActions.prototype.$typeof = function() { return fan.uiBuilder.CbActions.$type; }
fan.uiBuilder.CbActions.make = function(model) {
  var self = new fan.uiBuilder.CbActions();
  fan.uiBuilder.CbActions.make$(self,model);
  return self;
  }
fan.uiBuilder.CbActions.make$ = function(self,model)
{
  self.m_model = model;
  return;
}
fan.uiBuilder.CbActions.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbActions.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbActions.prototype.newConn = function()
{
  var $this = this;
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.CbNewConnDialog.make(this.m_model.m_view),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u55,
    function(it)
    {
      it.onOk(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u56,
        function(conn)
        {
          var tag = fan.sys.Str.plus(fan.sys.Str.plus("",conn),"Conn");
          var tree = fan.ui.UiSession.cur().m_pim.protoTree("conn");
          var node = tree.roots().first().children().find(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u57,
            function(r)
            {
              return r.meta().has(tag);
            }));
          var axon = fan.haystack.Etc.toAxon(node.meta());
          fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("pimFormNew(",axon),")")).onOk(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u9,
            function(g)
            {
              fan.ui.UiPimForm.openDialog(fan.sys.ObjUtil.coerce(g.first(),fan.haystack.Dict.$type),null,fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u58,
                function(diff)
                {
                  $this.m_model.commit(fan.sys.List.make(fan.haystack.Dict.$type, [diff]));
                  return;
                }));
              return;
            }));
          return false;
        }));
      return;
    })),fan.uiBuilder.CbNewConnDialog.$type).open();
  return;
}
fan.uiBuilder.CbActions.prototype.edit = function(dicts)
{
  var $this = this;
  this.m_model.m_req.loadRecs(dicts,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u59,
    function(recs)
    {
      if (fan.sys.ObjUtil.equals(recs.size(),1))
      {
        fan.ui.UiPimForm.openDialog(fan.sys.ObjUtil.coerce(recs.first(),fan.haystack.Dict.$type),null,fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u58,
          function(diff)
          {
            $this.m_model.commit(fan.sys.List.make(fan.haystack.Dict.$type, [diff]));
            return;
          }));
      }
      else
      {
        fan.ui.UiPimBatchForm.openDialog(recs,fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u60,
          function(diffs)
          {
            $this.m_model.commit(diffs);
            return;
          }));
      }
      ;
      return;
    }));
  return;
}
fan.uiBuilder.CbActions.prototype.dup = function(rec)
{
  var $this = this;
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AlertDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u61,
    function(it)
    {
      var dlg = it;
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("confirm")));
      it.icon$(fan.ui.Icon.outline("warn",fan.ui.Colors.m_yellow));
      it.msg$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("dupItems")));
      it.info$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("dupItemsDetails")));
      it.checkbox$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("alsoApplyKids")));
      it.checkboxDefVal$(false);
      it.count$(fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()));
      it.addButton("yes",null,true);
      it.addButton("no",null,false);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          if (fan.sys.ObjUtil.equals(key,"yes"))
          {
            $this.m_model.dup(rec,fan.sys.ObjUtil.coerce(dlg.count(),fan.sys.Int.$type),dlg.isChecked());
          }
          ;
          return true;
        }));
      return;
    })),fan.ui.AlertDialog.$type).open();
  return;
}
fan.uiBuilder.CbActions.prototype.trash = function(recs)
{
  var $this = this;
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AlertDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u61,
    function(it)
    {
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("trash")));
      it.icon$(fan.ui.Icon.outline("trash",fan.ui.Colors.m_darkSilver));
      it.msg$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("moveToTrash")));
      it.info$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("moveToTrashDetails")));
      it.addButton("yes",null);
      it.addButton("no",null,true);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          if (fan.sys.ObjUtil.equals(key,"no"))
          {
            return true;
          }
          ;
          $this.m_model.trash(recs);
          return true;
        }));
      return;
    })),fan.ui.AlertDialog.$type).open();
  return;
}
fan.uiBuilder.CbActions.prototype.enable = function(conns)
{
  this.m_model.m_req.enable(conns);
  return;
}
fan.uiBuilder.CbActions.prototype.disable = function(conns)
{
  this.m_model.m_req.disable(conns);
  return;
}
fan.uiBuilder.CbActions.prototype.ping = function(conns)
{
  this.m_model.m_req.ping(conns);
  return;
}
fan.uiBuilder.CbActions.prototype.close = function(conns)
{
  this.m_model.m_req.close(conns);
  return;
}
fan.uiBuilder.CbActions.prototype.m_model = null;
fan.uiBuilder.CbModel = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.CbModel.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_exts = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_filter = null;
  this.m_selectedExt = null;
  this.m_selectedConns = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_selectedPoints = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_detailsConn = null;
  this.m_detailsPoint = null;
  this.m_detailsIndex = 0;
  this.m_showPoints = false;
  this.m_showDetails = false;
  return;
}
fan.uiBuilder.CbModel.prototype.$typeof = function() { return fan.uiBuilder.CbModel.$type; }
fan.uiBuilder.CbModel.make = function(view) {
  var self = new fan.uiBuilder.CbModel();
  fan.uiBuilder.CbModel.make$(self,view);
  return self;
  }
fan.uiBuilder.CbModel.make$ = function(self,view)
{
  ;
  self.m_view = view;
  self.m_req = fan.uiBuilder.CbReq.make(self);
  self.m_actions = fan.uiBuilder.CbActions.make(self);
  return;
}
fan.uiBuilder.CbModel.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.CbModel.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.CbModel.prototype.session = function()
{
  return this.m_view.m_session;
}
fan.uiBuilder.CbModel.prototype.init = function(f)
{
  this.reloadExts(f);
  return;
}
fan.uiBuilder.CbModel.prototype.restore = function(tag,ref,filter)
{
  var $this = this;
  if ((tag == null && ref == null && filter == null))
  {
    return;
  }
  ;
  var ext = (function($this) { var $_u62 = $this.m_exts.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u63,
    function(x)
    {
      return fan.sys.ObjUtil.equals(x.trap("tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),tag);
    })); if ($_u62 != null) return $_u62; return fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["tag"],["conn"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"))); })(this);
  this.selectExt(ext,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u64,
    function(conns)
    {
      $this.selectConnFilter(filter);
      var conn = conns.find(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u65,
        function(c)
        {
          return fan.sys.ObjUtil.equals(c.id(),ref);
        }));
      if (conn != null)
      {
        $this.selectConn(fan.sys.List.make(fan.haystack.Dict.$type.toNullable(), [conn]));
      }
      ;
      fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("10ms"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u45,
        function(it)
        {
          $this.m_view.m_list.syncSel($this.m_selectedExt);
          $this.m_view.m_table.m_conns.syncSel(conn);
          $this.m_view.m_table.m_conns.m_filter.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u66 = filter; if ($_u66 != null) return $_u66; return ""; })($this),fan.sys.Str.$type));
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.CbModel.prototype.req = function()
{
  return this.m_req;
}
fan.uiBuilder.CbModel.prototype.req$ = function(it)
{
  this.m_req = it;
  return;
}
fan.uiBuilder.CbModel.prototype.actions = function()
{
  return this.m_actions;
}
fan.uiBuilder.CbModel.prototype.actions$ = function(it)
{
  this.m_actions = it;
  return;
}
fan.uiBuilder.CbModel.prototype.exts = function()
{
  return this.m_exts;
}
fan.uiBuilder.CbModel.prototype.exts$ = function(it)
{
  this.m_exts = it;
  return;
}
fan.uiBuilder.CbModel.prototype.filter = function()
{
  return this.m_filter;
}
fan.uiBuilder.CbModel.prototype.filter$ = function(it)
{
  this.m_filter = it;
  return;
}
fan.uiBuilder.CbModel.prototype.selectedExt = function()
{
  return this.m_selectedExt;
}
fan.uiBuilder.CbModel.prototype.selectedExt$ = function(it)
{
  this.m_selectedExt = it;
  return;
}
fan.uiBuilder.CbModel.prototype.selectedConns = function()
{
  return this.m_selectedConns;
}
fan.uiBuilder.CbModel.prototype.selectedConns$ = function(it)
{
  this.m_selectedConns = it;
  return;
}
fan.uiBuilder.CbModel.prototype.selectedPoints = function()
{
  return this.m_selectedPoints;
}
fan.uiBuilder.CbModel.prototype.selectedPoints$ = function(it)
{
  this.m_selectedPoints = it;
  return;
}
fan.uiBuilder.CbModel.prototype.detailsConn = function()
{
  return this.m_detailsConn;
}
fan.uiBuilder.CbModel.prototype.detailsConn$ = function(it)
{
  this.m_detailsConn = it;
  return;
}
fan.uiBuilder.CbModel.prototype.detailsPoint = function()
{
  return this.m_detailsPoint;
}
fan.uiBuilder.CbModel.prototype.detailsPoint$ = function(it)
{
  this.m_detailsPoint = it;
  return;
}
fan.uiBuilder.CbModel.prototype.detailsIndex = function()
{
  return this.m_detailsIndex;
}
fan.uiBuilder.CbModel.prototype.detailsIndex$ = function(it)
{
  this.m_detailsIndex = it;
  return;
}
fan.uiBuilder.CbModel.prototype.selectExt = function(ext,onConns)
{
  if (onConns === undefined) onConns = null;
  if (fan.sys.ObjUtil.equals(this.m_selectedExt,ext))
  {
    return;
  }
  ;
  this.m_selectedExt = ext;
  this.m_filter = null;
  this.m_view.m_list.syncSel(ext);
  this.updateExts();
  this.updateConns(onConns);
  if (this.m_view.m_isInit)
  {
    this.m_view.setVars(fan.sys.Map.fromLiteral(["selectedExt"],[(function($this) { var $_u67 = ext; if ($_u67 == null) return null; return $_u67.trap("tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])); })(this)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")));
  }
  ;
  return;
}
fan.uiBuilder.CbModel.prototype.selectConnFilter = function(filter)
{
  this.m_filter = (function($this) { var $_u68 = filter; if ($_u68 == null) return null; return fan.sys.Str.trimToNull($_u68); })(this);
  this.updateConns();
  if (this.m_view.m_isInit)
  {
    this.m_view.setVars(fan.sys.Map.fromLiteral(["filter"],[filter],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str?")));
  }
  ;
  return;
}
fan.uiBuilder.CbModel.prototype.selectConn = function(conns)
{
  this.m_selectedConns = fan.sys.ObjUtil.coerce((function($this) { var $_u69 = conns; if ($_u69 != null) return $_u69; return fan.haystack.Dict.$type.emptyList(); })(this),fan.sys.Type.find("haystack::Dict[]"));
  this.m_detailsConn = (function($this) { if (fan.sys.ObjUtil.equals($this.m_selectedConns.size(),1)) return $this.m_selectedConns.first(); return null; })(this);
  this.m_detailsIndex = 0;
  if (fan.sys.ObjUtil.compareNE(this.pointConnRef(this.m_detailsPoint),(function($this) { var $_u71 = $this.m_detailsConn; if ($_u71 == null) return null; return $_u71.id(); })(this)))
  {
    this.m_detailsPoint = null;
  }
  ;
  this.updatePoints();
  this.updateDetails();
  if (this.m_view.m_isInit)
  {
    this.m_view.setVars(fan.sys.Map.fromLiteral(["selectedConn"],[(function($this) { var $_u72 = (function($this) { var $_u73 = conns; if ($_u73 == null) return null; return $_u73.first(); })($this); if ($_u72 == null) return null; return $_u72.id(); })(this)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Ref?")));
  }
  ;
  return;
}
fan.uiBuilder.CbModel.prototype.selectPoint = function(points)
{
  var $this = this;
  this.m_selectedPoints = fan.sys.ObjUtil.coerce((function($this) { var $_u74 = points; if ($_u74 != null) return $_u74; return fan.haystack.Dict.$type.emptyList(); })(this),fan.sys.Type.find("haystack::Dict[]"));
  this.m_detailsPoint = this.m_selectedPoints.first();
  this.m_detailsIndex = (function($this) { if ($this.m_detailsPoint == null) return 0; return 1; })(this);
  if (this.m_detailsPoint != null)
  {
    this.m_detailsConn = (function($this) { var $_u76 = $this.m_view.m_table.m_conns.pim().findRow(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u35,
      function(r)
      {
        return fan.sys.ObjUtil.equals(r.m_id,$this.pointConnRef($this.m_detailsPoint));
      })); if ($_u76 == null) return null; return $_u76.dict(); })(this);
  }
  ;
  this.updateDetails();
  return;
}
fan.uiBuilder.CbModel.prototype.selectDetails = function(index)
{
  if (index === undefined) index = this.m_detailsIndex;
  this.m_detailsIndex = index;
  this.updateDetails();
  return;
}
fan.uiBuilder.CbModel.prototype.showPoints = function()
{
  return this.m_showPoints;
}
fan.uiBuilder.CbModel.prototype.showPoints$ = function(it)
{
  this.m_showPoints = it;
  return;
}
fan.uiBuilder.CbModel.prototype.togglePoints = function()
{
  this.m_showPoints = !this.m_showPoints;
  this.updateConns();
  return;
}
fan.uiBuilder.CbModel.prototype.showDetails = function()
{
  return this.m_showDetails;
}
fan.uiBuilder.CbModel.prototype.showDetails$ = function(it)
{
  this.m_showDetails = it;
  return;
}
fan.uiBuilder.CbModel.prototype.toggleDetails = function()
{
  this.m_showDetails = !this.m_showDetails;
  this.m_view.onLayout();
  this.updateDetails();
  return;
}
fan.uiBuilder.CbModel.prototype.commit = function(recs)
{
  var $this = this;
  var isNew = recs.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      return r.missing("id");
    }));
  var isPoints = recs.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      return r.has("point");
    }));
  this.m_req.commit(recs,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u78,
    function(r)
    {
      if (isNew)
      {
        var tag = fan.haystack.Etc.dictNames(fan.sys.ObjUtil.coerce(r.first(),fan.haystack.Dict.$type)).find(fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u79,
          function(t)
          {
            return fan.sys.Str.endsWith(t,"Conn");
          }));
        var ext = $this.m_exts.find(fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u63,
          function(x)
          {
            return fan.sys.ObjUtil.equals(x.trap("tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),tag);
          }));
        var cur = (function($this) { var $_u80 = $this.m_selectedExt; if ($_u80 == null) return null; return $_u80.trap("tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])); })($this);
        if (fan.sys.ObjUtil.compareNE(cur,"conn"))
        {
          $this.m_selectedExt = (function($this) { var $_u81 = ext; if ($_u81 != null) return $_u81; return $this.m_exts.first(); })($this);
          $this.m_view.m_list.syncSel(ext);
        }
        ;
        $this.reloadExts();
        $this.updateConns();
      }
      else
      {
        if (isPoints)
        {
          $this.updatePoints();
        }
        else
        {
          $this.updateConns();
        }
        ;
      }
      ;
      return;
    }));
  return;
}
fan.uiBuilder.CbModel.prototype.dup = function(rec,count,cascade)
{
  var $this = this;
  this.m_req.dup(fan.sys.List.make(fan.haystack.Dict.$type, [rec]),count,cascade,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u82,
    function(it)
    {
      $this.reloadExts();
      $this.updateConns();
      return;
    }));
  return;
}
fan.uiBuilder.CbModel.prototype.trash = function(recs)
{
  var $this = this;
  var isPoints = recs.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      return r.has("point");
    }));
  this.m_req.trash(fan.sys.ObjUtil.coerce(recs.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u83,
    function(r)
    {
      return r.id();
    })),fan.sys.Type.find("haystack::Ref[]")),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u78,
    function(r)
    {
      if (isPoints)
      {
        $this.updatePoints();
      }
      else
      {
        $this.reloadExts();
        $this.updateConns();
      }
      ;
      return;
    }));
  return;
}
fan.uiBuilder.CbModel.prototype.reloadExts = function(f)
{
  if (f === undefined) f = null;
  var $this = this;
  this.m_view.m_list.onLoading();
  this.m_req.loadExts(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u84,
    function(exts)
    {
      $this.m_exts = exts;
      $this.m_view.m_list.onLoad(exts);
      (function($this) { var $_u85 = f; if ($_u85 == null) return null; return $_u85.call($this); })($this);
      return;
    }));
  return;
}
fan.uiBuilder.CbModel.prototype.updateExts = function()
{
  this.m_view.m_list.onUpdate();
  return;
}
fan.uiBuilder.CbModel.prototype.updateConns = function(f)
{
  if (f === undefined) f = null;
  this.m_view.m_table.onUpdate(f);
  return;
}
fan.uiBuilder.CbModel.prototype.updatePoints = function()
{
  if (this.m_showPoints)
  {
    this.m_view.m_table.m_points.onLoading();
    this.m_req.loadPoints(this.m_selectedConns,this.m_view.m_table.m_points);
  }
  ;
  return;
}
fan.uiBuilder.CbModel.prototype.updateDetails = function()
{
  if (this.m_showDetails)
  {
    this.m_view.m_details.onUpdate(this.m_detailsConn,this.m_detailsPoint,this.m_detailsIndex);
  }
  ;
  return;
}
fan.uiBuilder.CbModel.prototype.pointConnRef = function(pt)
{
  if (pt == null)
  {
    return null;
  }
  ;
  return this.session().m_pim.conns().connRef(fan.sys.ObjUtil.coerce(pt,fan.haystack.Dict.$type),false);
}
fan.uiBuilder.CbModel.prototype.m_view = null;
fan.uiBuilder.CbModel.prototype.m_req = null;
fan.uiBuilder.CbModel.prototype.m_actions = null;
fan.uiBuilder.CbModel.prototype.m_exts = null;
fan.uiBuilder.CbModel.prototype.m_filter = null;
fan.uiBuilder.CbModel.prototype.m_selectedExt = null;
fan.uiBuilder.CbModel.prototype.m_selectedConns = null;
fan.uiBuilder.CbModel.prototype.m_selectedPoints = null;
fan.uiBuilder.CbModel.prototype.m_detailsConn = null;
fan.uiBuilder.CbModel.prototype.m_detailsPoint = null;
fan.uiBuilder.CbModel.prototype.m_detailsIndex = 0;
fan.uiBuilder.CbModel.prototype.m_showPoints = false;
fan.uiBuilder.CbModel.prototype.m_showDetails = false;
fan.uiBuilder.CbBoxList = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.CbBoxList.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.CbBoxList.prototype.$typeof = function() { return fan.uiBuilder.CbBoxList.$type; }
fan.uiBuilder.CbBoxList.make = function(model) {
  var self = new fan.uiBuilder.CbBoxList();
  fan.uiBuilder.CbBoxList.make$(self,model);
  return self;
  }
fan.uiBuilder.CbBoxList.make$ = function(self,model)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.m_model = model;
  var actionBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px"]));
      it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("new")));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              model.m_actions.newConn();
              return;
            }));
          return;
        })),fan.domkit.Button.$type));
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_list = fan.ui.ListBox.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u86,
    function(it)
    {
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u86,
        function(it)
        {
          if ($this.m_list.sel().item() != null)
          {
            model.selectExt(fan.sys.ObjUtil.coerce($this.m_list.sel().item(),fan.haystack.Dict.$type.toNullable()));
          }
          ;
          return;
        }));
      it.onElem(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u87,
        function(item,sel)
        {
          return fan.ui.UiLabel.make(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u29,
            function(it)
            {
              it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
              it.icon$(fan.ui.Icon.outline(fan.sys.ObjUtil.coerce(item.trap("icon",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type),(function($this) { if (sel) return "#fff"; return fan.ui.Colors.m_purple; })($this)));
              it.label$(item.dis());
              var size = fan.sys.ObjUtil.coerce(item.trap("size",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Number.$type).toInt();
              if (fan.sys.ObjUtil.compareGT(size,0))
              {
                it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("span"),fan.sys.Func.make$closure(
                  fan.uiBuilder.$clos$_u89,
                  function(it)
                  {
                    it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
                    it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["2px 4px"]));
                    it.style().trap("fontSize",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["11px"]));
                    it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (sel) return "#fff"; return "#999"; })($this)]));
                    it.text$(fan.sys.Int.toLocale(size));
                    return;
                  })),fan.dom.Elem.$type));
              }
              ;
              return;
            }));
        }),fan.sys.Type.find("|sys::Obj,sys::Bool->sys::Obj|")));
      return;
    }));
  self.add((function($this) { var $_u91 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      fan.sys.ObjUtil.coerce(it.add(actionBox),fan.domkit.SashBox.$type).add(fan.ui.UiUtil.makeEmptyBox());
      return;
    })),fan.domkit.SashBox.$type); $this.m_sash = $_u91; return $_u91; })(self));
  return;
}
fan.uiBuilder.CbBoxList.prototype.onLoading = function()
{
  var $this = this;
  this.m_sash.replace(fan.sys.ObjUtil.coerce(this.m_sash.lastChild(),fan.dom.Elem.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiUtil.makeEmptyBox(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u39,
        function(it)
        {
          return;
        })));
      return;
    })),fan.domkit.Box.$type));
  return;
}
fan.uiBuilder.CbBoxList.prototype.onLoad = function(items)
{
  this.m_list.items$(items);
  this.m_sash.replace(fan.sys.ObjUtil.coerce(this.m_sash.lastChild(),fan.dom.Elem.$type),this.m_list);
  return;
}
fan.uiBuilder.CbBoxList.prototype.onUpdate = function()
{
  var $this = this;
  var tag = (function($this) { var $_u92 = $this.m_model.m_selectedExt; if ($_u92 == null) return null; return $_u92.trap("tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])); })(this);
  this.m_list.sel().index$(this.m_list.items().findIndex(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u93,
    function(d)
    {
      return fan.sys.ObjUtil.equals(fan.sys.ObjUtil.trap(d,"tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),tag);
    })));
  return;
}
fan.uiBuilder.CbBoxList.prototype.syncSel = function(ext)
{
  var $this = this;
  if (ext == null)
  {
    this.m_list.sel().clear();
  }
  else
  {
    this.m_list.sel().index$(this.m_list.items().findIndex(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u94,
      function(r)
      {
        return fan.sys.ObjUtil.equals(fan.sys.ObjUtil.trap(r,"tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),ext.trap("tag",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])));
      })));
  }
  ;
  return;
}
fan.uiBuilder.CbBoxList.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbBoxList.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbBoxList.prototype.sash = function()
{
  return this.m_sash;
}
fan.uiBuilder.CbBoxList.prototype.sash$ = function(it)
{
  this.m_sash = it;
  return;
}
fan.uiBuilder.CbBoxList.prototype.list = function()
{
  return this.m_list;
}
fan.uiBuilder.CbBoxList.prototype.list$ = function(it)
{
  this.m_list = it;
  return;
}
fan.uiBuilder.CbBoxList.prototype.m_model = null;
fan.uiBuilder.CbBoxList.prototype.m_sash = null;
fan.uiBuilder.CbBoxList.prototype.m_list = null;
fan.uiBuilder.ConnTraceView = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiBuilder.ConnTraceView.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_state = fan.uiBuilder.ConnTraceViewState.make(fan.haystack.Etc.emptyDict());
  return;
}
fan.uiBuilder.ConnTraceView.prototype.$typeof = function() { return fan.uiBuilder.ConnTraceView.$type; }
fan.uiBuilder.ConnTraceView.make = function() {
  var self = new fan.uiBuilder.ConnTraceView();
  fan.uiBuilder.ConnTraceView.make$(self);
  return self;
  }
fan.uiBuilder.ConnTraceView.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  ;
  var pim = self.m_session.m_pim.grid(fan.haystack.Etc.makeEmptyGrid());
  var connVar = self.node().$var("conn");
  var connPicker = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Input.makeForDef(self.m_session,connVar.m_def,fan.sys.ObjUtil.coerce((function($this) { var $_u95 = connVar.val(); if ($_u95 != null) return $_u95; return fan.haystack.Ref.m_nullRef; })(self),fan.sys.Obj.$type)),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u96,
    function(it)
    {
      it.onModify(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u96,
        function(it)
        {
          $this.update(fan.sys.Map.fromLiteral(["conn"],[(function($this) { var $_u97 = fan.sys.ObjUtil.as(it.save(),fan.haystack.Ref.$type); if ($_u97 != null) return $_u97; return fan.haystack.Ref.m_nullRef; })($this)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Ref?")));
          return;
        }));
      return;
    })),fan.ui.Input.$type);
  (function($this) { var $_u98 = fan.sys.ObjUtil.as(connPicker,fan.ui.RefInput.$type); if ($_u98 == null) return null; return $_u98.inViewBar(); })(self);
  var typesVar = self.node().$var("types");
  var typesPicker = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Input.makeForDef(self.m_session,typesVar.m_def,fan.sys.ObjUtil.coerce((function($this) { var $_u99 = typesVar.val(); if ($_u99 != null) return $_u99; return "*"; })(self),fan.sys.Obj.$type)),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u96,
    function(it)
    {
      it.onModify(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u96,
        function(it)
        {
          $this.update(fan.sys.Map.fromLiteral(["types"],[it.save()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
          return;
        }));
      return;
    })),fan.ui.Input.$type);
  var refresh = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("refresh")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.update(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_pause = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u31,
    function(it)
    {
      it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["70px"]));
      it.elemOff$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("pause")));
      it.elemOn$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("paused")));
      it.selected$(false);
      return;
    })),fan.domkit.ToggleButton.$type);
  self.m_enableAction = self.action("enable").button();
  self.m_disableAction = self.action("disable").button();
  var toolbar = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.style().addClass("ui-UiViewToolbar");
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px","20px","4px","20px","4px","4px","20px","4px","20px","4px"]));
      it.style().trap("paddingBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(connPicker),fan.domkit.FlowBox.$type).add(typesPicker),fan.domkit.FlowBox.$type).add($this.action("ping").button()),fan.domkit.FlowBox.$type).add($this.action("close").button()),fan.domkit.FlowBox.$type).add($this.m_enableAction),fan.domkit.FlowBox.$type).add($this.m_disableAction),fan.domkit.FlowBox.$type).add($this.action("clear").button()),fan.domkit.FlowBox.$type).add(refresh),fan.domkit.FlowBox.$type).add($this.m_pause),fan.domkit.FlowBox.$type).add($this.action("menu").button()),fan.domkit.FlowBox.$type).add($this.action("details").button());
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_infoBar = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.style().trap("paddingBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_table = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTable.make(pim),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u27,
    function(it)
    {
      it.sel().multi$(false);
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u27,
        function(it)
        {
          $this.updateDetails();
          return;
        }));
      it.rebuild();
      return;
    })),fan.ui.UiPimTable.$type);
  self.m_details = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextArea.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u100,
    function(it)
    {
      it.style().addClass("ui-font-mono");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["pre"]));
      it.ro$(true);
      it.val$("Details here!");
      return;
    })),fan.domkit.TextArea.$type);
  self.m_disabled = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u101,
    function(it)
    {
      it.dir$("column");
      it.alignCross$("center");
      it.alignMain$("center");
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      fan.sys.ObjUtil.coerce(it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.solid("circle",fan.ui.Colors.m_red).resize("14px"));
          it.label$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("trace"))," "),fan.sys.Pod.find("ui").locale("disabled")));
          it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
          it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          return;
        }))),fan.domkit.FlexBox.$type).add($this.action("enable").button());
      return;
    })),fan.domkit.FlexBox.$type);
  self.m_main = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.resizable$(true);
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["50%","8px","50%"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_table),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add($this.m_details);
      return;
    })),fan.domkit.SashBox.$type);
  self.m_card = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      return;
    })),fan.domkit.Box.$type);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u101,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.dir$("column");
      it.flex$(fan.sys.List.make(fan.sys.Str.$type, ["none","none","1 1 0"]));
      it.add(toolbar);
      it.add($this.m_infoBar);
      it.add($this.m_card);
      return;
    })),fan.domkit.FlexBox.$type));
  self.updateState(fan.haystack.Etc.emptyDict());
  return;
}
fan.uiBuilder.ConnTraceView.prototype.sel = function()
{
  return this.m_state.m_sel;
}
fan.uiBuilder.ConnTraceView.prototype.onUpdate = function()
{
  var data = this.node().data(null,false);
  if (data == null)
  {
    return;
  }
  ;
  var pim = data.pim();
  if (!this.m_pause.selected())
  {
    this.m_table.update(fan.sys.ObjUtil.coerce(pim,fan.pim.PimGrid.$type));
    this.m_table.scrollTo(null,fan.sys.ObjUtil.coerce(fan.sys.Int.minus(pim.numRows(),1),fan.sys.Int.$type.toNullable()));
    this.updateDetails();
  }
  ;
  this.updateState(pim.m_meta);
  return;
}
fan.uiBuilder.ConnTraceView.prototype.onFeed = function(key,node,res)
{
  if (this.m_pause.selected())
  {
    return;
  }
  ;
  this.m_table.onFeed(fan.sys.ObjUtil.coerce(res.trap("feed",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Grid.$type));
  this.m_table.scrollTo(null,fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.m_table.pim().numRows(),1),fan.sys.Int.$type.toNullable()));
  return;
}
fan.uiBuilder.ConnTraceView.prototype.updateDetails = function()
{
  this.m_details.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u102 = (function($this) { var $_u103 = (function($this) { var $_u104 = fan.sys.ObjUtil.as($this.m_table.sel().item(),fan.haystack.Dict.$type); if ($_u104 == null) return null; return $_u104.get("arg"); })($this); if ($_u103 == null) return null; return fan.sys.ObjUtil.toStr($_u103); })($this); if ($_u102 != null) return $_u102; return ""; })(this),fan.sys.Str.$type));
  return;
}
fan.uiBuilder.ConnTraceView.prototype.updateState = function(meta)
{
  this.m_state = fan.uiBuilder.ConnTraceViewState.make(meta);
  this.m_enableAction.enabled$(fan.sys.ObjUtil.coerce((this.m_state.hasSel() && !this.m_state.m_isEnabled),fan.sys.Bool.$type.toNullable()));
  this.m_disableAction.enabled$(fan.sys.ObjUtil.coerce((this.m_state.hasSel() && this.m_state.m_isEnabled),fan.sys.Bool.$type.toNullable()));
  this.updateInfoBar();
  this.m_card.removeAll();
  this.m_card.add((function($this) { if ($this.m_state.m_isEnabled) return $this.m_main; return $this.m_disabled; })(this));
  return;
}
fan.uiBuilder.ConnTraceView.prototype.updateInfoBar = function()
{
  var $this = this;
  this.m_infoBar.removeAll();
  if (!this.m_state.hasSel())
  {
    this.m_infoBar.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u8,
      function(it)
      {
        it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("noConnSelected")));
        return;
      })),fan.domkit.Label.$type));
    return;
  }
  ;
  var info = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Icon.outline("info").resize("14px"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u106,
    function(it)
    {
      it.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["5px"]));
      it.onEvent("click",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          var g = fan.haystack.Etc.makeDictGrid(null,$this.m_state.m_conn);
          fan.ui.DictPopup.make($this.m_session,g,fan.sys.ObjUtil.coerce(g.first(),fan.haystack.Dict.$type)).open(e.pagePos().m_x,e.pagePos().m_y);
          return;
        }));
      return;
    })),fan.ui.Icon.$type);
  var label = fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.icon$(fan.ui.Icon.outline($this.m_state.m_icon,fan.ui.Colors.m_purple));
      it.label$($this.m_state.m_conn.dis());
      return;
    }));
  var enabled = fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.icon$(fan.ui.Icon.solid("circle",(function($this) { if ($this.m_state.m_isEnabled) return fan.ui.Colors.m_green; return fan.ui.Colors.m_red; })($this)).resize("14px"));
      it.label$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("trace"))," "),(function($this) { if ($this.m_state.m_isEnabled) return fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("enabled")); return fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("disabled")); })($this)));
      it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
      return;
    }));
  this.m_infoBar.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["6px","12px"]));
  this.m_infoBar.add(info);
  this.m_infoBar.add(label);
  this.m_infoBar.add(enabled);
  return;
}
fan.uiBuilder.ConnTraceView.prototype.state = function()
{
  return this.m_state;
}
fan.uiBuilder.ConnTraceView.prototype.state$ = function(it)
{
  this.m_state = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.pause = function()
{
  return this.m_pause;
}
fan.uiBuilder.ConnTraceView.prototype.pause$ = function(it)
{
  this.m_pause = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.infoBar = function()
{
  return this.m_infoBar;
}
fan.uiBuilder.ConnTraceView.prototype.infoBar$ = function(it)
{
  this.m_infoBar = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.enableAction = function()
{
  return this.m_enableAction;
}
fan.uiBuilder.ConnTraceView.prototype.enableAction$ = function(it)
{
  this.m_enableAction = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.disableAction = function()
{
  return this.m_disableAction;
}
fan.uiBuilder.ConnTraceView.prototype.disableAction$ = function(it)
{
  this.m_disableAction = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.table = function()
{
  return this.m_table;
}
fan.uiBuilder.ConnTraceView.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.details = function()
{
  return this.m_details;
}
fan.uiBuilder.ConnTraceView.prototype.details$ = function(it)
{
  this.m_details = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.card = function()
{
  return this.m_card;
}
fan.uiBuilder.ConnTraceView.prototype.card$ = function(it)
{
  this.m_card = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.disabled = function()
{
  return this.m_disabled;
}
fan.uiBuilder.ConnTraceView.prototype.disabled$ = function(it)
{
  this.m_disabled = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.main = function()
{
  return this.m_main;
}
fan.uiBuilder.ConnTraceView.prototype.main$ = function(it)
{
  this.m_main = it;
  return;
}
fan.uiBuilder.ConnTraceView.prototype.m_state = null;
fan.uiBuilder.ConnTraceView.prototype.m_pause = null;
fan.uiBuilder.ConnTraceView.prototype.m_infoBar = null;
fan.uiBuilder.ConnTraceView.prototype.m_enableAction = null;
fan.uiBuilder.ConnTraceView.prototype.m_disableAction = null;
fan.uiBuilder.ConnTraceView.prototype.m_table = null;
fan.uiBuilder.ConnTraceView.prototype.m_details = null;
fan.uiBuilder.ConnTraceView.prototype.m_card = null;
fan.uiBuilder.ConnTraceView.prototype.m_disabled = null;
fan.uiBuilder.ConnTraceView.prototype.m_main = null;
fan.uiBuilder.ConnTraceTypesInput = fan.sys.Obj.$extend(fan.ui.Input);
fan.uiBuilder.ConnTraceTypesInput.prototype.$ctor = function()
{
  fan.ui.Input.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.$typeof = function() { return fan.uiBuilder.ConnTraceTypesInput.$type; }
fan.uiBuilder.ConnTraceTypesInput.make = function() {
  var self = new fan.uiBuilder.ConnTraceTypesInput();
  fan.uiBuilder.ConnTraceTypesInput.make$(self);
  return self;
  }
fan.uiBuilder.ConnTraceTypesInput.make$ = function(self)
{
  var $this = self;
  fan.ui.Input.make$(self);
  self.m_button = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().addClass("disclosure");
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("types")));
      it.onPopup(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u30,
        function(it)
        {
          return fan.uiBuilder.ConnTraceTypesPopup.make($this.m_session,$this.m_val,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u109,
            function(newVal)
            {
              $this.m_val = newVal;
              $this.modified$(true);
              return;
            }));
        }));
      return;
    })),fan.domkit.Button.$type);
  self.add(self.m_button);
  return;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.onLoad = function(val)
{
  this.m_val = fan.sys.ObjUtil.coerce(val,fan.sys.Str.$type);
  return;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.onSave = function()
{
  return this.m_val;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.onRO = function()
{
  this.m_button.enabled$(fan.sys.ObjUtil.coerce(!this.ro(),fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.val = function()
{
  return this.m_val;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.val$ = function(it)
{
  this.m_val = it;
  return;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.button = function()
{
  return this.m_button;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.button$ = function(it)
{
  this.m_button = it;
  return;
}
fan.uiBuilder.ConnTraceTypesInput.prototype.m_val = null;
fan.uiBuilder.ConnTraceTypesInput.prototype.m_button = null;
fan.uiBuilder.ConnTraceTypesPopup = fan.sys.Obj.$extend(fan.domkit.Popup);
fan.uiBuilder.ConnTraceTypesPopup.prototype.$ctor = function()
{
  fan.domkit.Popup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_checks = fan.sys.List.make(fan.domkit.Checkbox.$type);
  return;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.$typeof = function() { return fan.uiBuilder.ConnTraceTypesPopup.$type; }
fan.uiBuilder.ConnTraceTypesPopup.make = function(session,val,onOk) {
  var self = new fan.uiBuilder.ConnTraceTypesPopup();
  fan.uiBuilder.ConnTraceTypesPopup.make$(self,session,val,onOk);
  return self;
  }
fan.uiBuilder.ConnTraceTypesPopup.make$ = function(self,session,val,onOk)
{
  var $this = self;
  fan.domkit.Popup.make$(self);
  ;
  self.m_$enum = session.m_pim.$enum(session.m_ns.def("connTraceType").trap("enum",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])));
  val = fan.sys.Str.trim(val);
  var isAll = (fan.sys.Str.isEmpty(val) || fan.sys.ObjUtil.equals(val,"*"));
  var typesMap = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")).setList(fan.sys.Str.split(fan.sys.Str.trim(val),fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable())));
  var flexBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u101,
    function(it)
    {
      it.dir$("column");
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["12px"]));
      it.alignCross$("stretch");
      return;
    })),fan.domkit.FlexBox.$type);
  self.m_$enum.m_items.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u110,
    function(item)
    {
      var check = fan.domkit.Checkbox.make();
      check.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u111,
        function(it)
        {
          $this.checkOk();
          return;
        }));
      check.checked$((isAll || typesMap.containsKey(item.$name())));
      $this.m_checks.add(check);
      flexBox.add(check.wrap(fan.ui.UiUtil.itemToElem(item)));
      return;
    }));
  var all = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("all")));
      it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.m_checks.each(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u112,
            function(c)
            {
              c.checked$(true);
              return;
            }));
          $this.checkOk();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  var none = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("none")));
      it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.m_checks.each(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u112,
            function(c)
            {
              c.checked$(false);
              return;
            }));
          $this.checkOk();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_ok = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("ok")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.close();
          onOk.call($this.save());
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  flexBox.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u101,
    function(it)
    {
      it.dir$("row");
      it.alignMain$("flex-end");
      it.style().trap("marginTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["12px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(all),fan.domkit.FlexBox.$type).add(none),fan.domkit.FlexBox.$type).add($this.m_ok);
      return;
    })),fan.domkit.FlexBox.$type));
  self.add(flexBox);
  return;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.checkOk = function()
{
  var $this = this;
  this.m_ok.enabled$(fan.sys.ObjUtil.coerce(this.m_checks.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u113,
    function(it)
    {
      return it.checked();
    })),fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.save = function()
{
  var $this = this;
  if (this.m_checks.all(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u113,
    function(it)
    {
      return it.checked();
    })))
  {
    return "*";
  }
  ;
  var s = fan.sys.StrBuf.make();
  this.m_checks.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u114,
    function(c,i)
    {
      if (c.checked())
      {
        s.join($this.m_$enum.m_items.get(i).$name(),",");
      }
      ;
      return;
    }));
  return s.toStr();
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.$enum = function()
{
  return this.m_$enum;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.$enum$ = function(it)
{
  this.m_$enum = it;
  return;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.checks = function()
{
  return this.m_checks;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.checks$ = function(it)
{
  this.m_checks = it;
  return;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.ok = function()
{
  return this.m_ok;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.ok$ = function(it)
{
  this.m_ok = it;
  return;
}
fan.uiBuilder.ConnTraceTypesPopup.prototype.m_$enum = null;
fan.uiBuilder.ConnTraceTypesPopup.prototype.m_checks = null;
fan.uiBuilder.ConnTraceTypesPopup.prototype.m_ok = null;
fan.uiBuilder.ConnTraceViewState = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.ConnTraceViewState.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.ConnTraceViewState.prototype.$typeof = function() { return fan.uiBuilder.ConnTraceViewState.$type; }
fan.uiBuilder.ConnTraceViewState.make = function(meta) {
  var self = new fan.uiBuilder.ConnTraceViewState();
  fan.uiBuilder.ConnTraceViewState.make$(self,meta);
  return self;
  }
fan.uiBuilder.ConnTraceViewState.make$ = function(self,meta)
{
  self.m_conn = fan.sys.ObjUtil.coerce((function($this) { var $_u115 = fan.sys.ObjUtil.as(meta.get("conn"),fan.haystack.Dict.$type); if ($_u115 != null) return $_u115; return fan.haystack.Etc.emptyDict(); })(self),fan.haystack.Dict.$type);
  self.m_icon = fan.sys.ObjUtil.coerce((function($this) { var $_u116 = fan.sys.ObjUtil.as(meta.get("icon"),fan.sys.Str.$type); if ($_u116 != null) return $_u116; return "conn"; })(self),fan.sys.Str.$type);
  self.m_isEnabled = fan.sys.ObjUtil.coerce((function($this) { var $_u117 = fan.sys.ObjUtil.as(meta.get("enabled"),fan.sys.Bool.$type); if ($_u117 != null) return $_u117; return fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()); })(self),fan.sys.Bool.$type);
  self.m_sel = fan.sys.ObjUtil.coerce((function($this) { var $_u118 = (function($this) { if ($this.m_conn.isEmpty()) return fan.sys.List.make(fan.haystack.Dict.$type); return fan.sys.List.make(fan.haystack.Dict.$type, [$this.m_conn]); })($this); if ($_u118 == null) return null; return fan.sys.ObjUtil.toImmutable($_u118); })(self),fan.sys.Type.find("haystack::Dict[]"));
  return;
}
fan.uiBuilder.ConnTraceViewState.prototype.hasSel = function()
{
  return fan.sys.ObjUtil.compareGT(this.m_sel.size(),0);
}
fan.uiBuilder.ConnTraceViewState.prototype.m_conn = null;
fan.uiBuilder.ConnTraceViewState.prototype.m_icon = null;
fan.uiBuilder.ConnTraceViewState.prototype.m_isEnabled = false;
fan.uiBuilder.ConnTraceViewState.prototype.m_sel = null;
fan.uiBuilder.CbReq = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.CbReq.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.CbReq.prototype.$typeof = function() { return fan.uiBuilder.CbReq.$type; }
fan.uiBuilder.CbReq.make = function(model) {
  var self = new fan.uiBuilder.CbReq();
  fan.uiBuilder.CbReq.make$(self,model);
  return self;
  }
fan.uiBuilder.CbReq.make$ = function(self,model)
{
  self.m_model = model;
  return;
}
fan.uiBuilder.CbReq.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbReq.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbReq.prototype.loadExts = function(callback)
{
  var $this = this;
  this.m_model.session().m_api.eval("connBuilderReadExts()").onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      var all = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["dis","tag","icon","size"],[fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("allConns")),"conn","conn",g.meta().trap("size",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")));
      var items = fan.sys.List.make(fan.haystack.Dict.$type).add(all).addAll(g.toRows());
      callback.call(items);
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.loadConns = function(ext,filter,box,onDone)
{
  if (onDone === undefined) onDone = null;
  var $this = this;
  var f = this.m_model.session().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("connBuilderReadConns(",fan.sys.Str.toCode(ext)),", "),(function($this) { var $_u120 = filter; if ($_u120 == null) return null; return fan.sys.Str.toCode($_u120); })(this)),")"));
  f.onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u121,
    function(res)
    {
      if ($this.m_connFeedKey != null)
      {
        $this.m_model.m_view.fw().uiFeeds().remove(fan.sys.ObjUtil.coerce($this.m_connFeedKey,fan.sys.Str.$type));
      }
      ;
      $this.m_connFeedKey = fan.sys.ObjUtil.coerce(res.meta().get("feedKey"),fan.sys.Str.$type.toNullable());
      if ($this.m_connFeedKey != null)
      {
        $this.m_model.m_view.fw().uiFeeds().set(fan.sys.ObjUtil.coerce($this.m_connFeedKey,fan.sys.Str.$type),fan.uiBuilder.CbFeed.make($this.m_model,box));
      }
      ;
      box.onLoad(res);
      (function($this) { var $_u122 = onDone; if ($_u122 == null) return null; return $_u122.call(res.toRows()); })($this);
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.loadPoints = function(conns,box)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(conns.size(),0))
  {
    return box.onLoad(fan.haystack.Etc.makeEmptyGrid());
  }
  ;
  var a = fan.haystack.Etc.toAxon(conns.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u123,
    function(c)
    {
      return c.id();
    })));
  var f = this.m_model.session().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("connBuilderReadPoints(",a),")"));
  f.onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u121,
    function(res)
    {
      if ($this.m_pointFeedKey != null)
      {
        $this.m_model.m_view.fw().uiFeeds().remove(fan.sys.ObjUtil.coerce($this.m_pointFeedKey,fan.sys.Str.$type));
      }
      ;
      $this.m_pointFeedKey = fan.sys.ObjUtil.coerce(res.meta().get("feedKey"),fan.sys.Str.$type.toNullable());
      if ($this.m_pointFeedKey != null)
      {
        $this.m_model.m_view.fw().uiFeeds().set(fan.sys.ObjUtil.coerce($this.m_pointFeedKey,fan.sys.Str.$type),fan.uiBuilder.CbFeed.make($this.m_model,box));
      }
      ;
      box.onLoad(res);
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.loadDetails = function(rec,callback)
{
  var $this = this;
  var f = this.m_model.session().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("connBuilderDetails(",rec.id().toCode()),")"));
  f.onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u121,
    function(res)
    {
      callback.call(res);
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.loadRec = function(rec,callback)
{
  var $this = this;
  var f = fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("readById(",rec.id().toCode()),")"));
  f.onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      callback.call(fan.sys.ObjUtil.coerce(g.first(),fan.haystack.Dict.$type));
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.loadRecs = function(recs,callback)
{
  var $this = this;
  var a = fan.haystack.Etc.toAxon(recs.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u83,
    function(r)
    {
      return r.id();
    })));
  var f = fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("readByIds(",a),")"));
  f.onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      callback.call(g.toRows());
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.enable = function(conns)
{
  var $this = this;
  var ids = fan.haystack.Etc.toAxon(conns.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u123,
    function(c)
    {
      return c.id();
    })));
  fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("connBuilderEnable(",ids),")"));
  return;
}
fan.uiBuilder.CbReq.prototype.disable = function(conns)
{
  var $this = this;
  var ids = fan.haystack.Etc.toAxon(conns.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u123,
    function(c)
    {
      return c.id();
    })));
  fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("connBuilderDisable(",ids),")"));
  return;
}
fan.uiBuilder.CbReq.prototype.ping = function(conns)
{
  var $this = this;
  var ids = fan.haystack.Etc.toAxon(conns.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u123,
    function(c)
    {
      return c.id();
    })));
  fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("connBuilderPing(",ids),")"));
  return;
}
fan.uiBuilder.CbReq.prototype.close = function(conns)
{
  var $this = this;
  var ids = fan.haystack.Etc.toAxon(conns.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u123,
    function(c)
    {
      return c.id();
    })));
  fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("connBuilderClose(",ids),")"));
  return;
}
fan.uiBuilder.CbReq.prototype.commit = function(recs,callback)
{
  var $this = this;
  var flash = fan.ui.Flash.showActivity(this.m_model.m_view,fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("working")),"..."));
  var func = (function($this) { if (recs.first().has("id")) return "recEdit"; return "recNew"; })(this);
  var req = fan.haystack.Etc.makeDictsGrid(null,recs);
  fan.ui.UiSession.cur().m_api.call(func,req).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      callback.call(g.toRows());
      return;
    })).onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      flash.close();
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.dup = function(recs,count,cascade,callback)
{
  var $this = this;
  var flash = fan.ui.Flash.showActivity(this.m_model.m_view,fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("working")),"..."));
  var meta = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Obj"),fan.sys.Type.find("sys::Obj?"));
  meta.set("dupCount",fan.haystack.Number.makeInt(count));
  if (!cascade)
  {
    meta.set("shallow",fan.haystack.Marker.m_val);
  }
  ;
  fan.ui.UiSession.cur().m_api.call("recDup",fan.haystack.Etc.makeDictsGrid(meta,recs)).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      callback.call(g.toRows());
      return;
    })).onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      flash.close();
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.trash = function(refs,callback)
{
  var $this = this;
  var flash = fan.ui.Flash.showActivity(this.m_model.m_view,fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("working")),"..."));
  var expr = fan.ui.UiUtil.makeAxonCall("recTrash",fan.sys.List.make(fan.sys.Type.find("haystack::Ref[]"), [refs]));
  fan.ui.UiSession.cur().m_api.eval(expr).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      callback.call(g.toRows());
      return;
    })).onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      flash.close();
      return;
    }));
  return;
}
fan.uiBuilder.CbReq.prototype.connFeedKey = function()
{
  return this.m_connFeedKey;
}
fan.uiBuilder.CbReq.prototype.connFeedKey$ = function(it)
{
  this.m_connFeedKey = it;
  return;
}
fan.uiBuilder.CbReq.prototype.pointFeedKey = function()
{
  return this.m_pointFeedKey;
}
fan.uiBuilder.CbReq.prototype.pointFeedKey$ = function(it)
{
  this.m_pointFeedKey = it;
  return;
}
fan.uiBuilder.CbReq.prototype.m_model = null;
fan.uiBuilder.CbReq.prototype.m_connFeedKey = null;
fan.uiBuilder.CbReq.prototype.m_pointFeedKey = null;
fan.uiBuilder.CbFeed = fan.sys.Obj.$extend(fan.ui.UiFeed);
fan.uiBuilder.CbFeed.prototype.$ctor = function()
{
  fan.ui.UiFeed.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.CbFeed.prototype.$typeof = function() { return fan.uiBuilder.CbFeed.$type; }
fan.uiBuilder.CbFeed.make = function(m,box) {
  var self = new fan.uiBuilder.CbFeed();
  fan.uiBuilder.CbFeed.make$(self,m,box);
  return self;
  }
fan.uiBuilder.CbFeed.make$ = function(self,m,box)
{
  fan.ui.UiFeed.make$(self);
  self.m_model = m;
  self.m_box = box;
  return;
}
fan.uiBuilder.CbFeed.prototype.onFeed = function(event)
{
  this.m_box.onFeed(event);
  return;
}
fan.uiBuilder.CbFeed.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbFeed.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbFeed.prototype.box = function()
{
  return this.m_box;
}
fan.uiBuilder.CbFeed.prototype.box$ = function(it)
{
  this.m_box = it;
  return;
}
fan.uiBuilder.CbFeed.prototype.m_model = null;
fan.uiBuilder.CbFeed.prototype.m_box = null;
fan.uiBuilder.CbBoxDetail = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.CbBoxDetail.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.CbBoxDetail.prototype.$typeof = function() { return fan.uiBuilder.CbBoxDetail.$type; }
fan.uiBuilder.CbBoxDetail.make = function(model) {
  var self = new fan.uiBuilder.CbBoxDetail();
  fan.uiBuilder.CbBoxDetail.make$(self,model);
  return self;
  }
fan.uiBuilder.CbBoxDetail.make$ = function(self,model)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.m_model = model;
  self.m_nav = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["-1px"]));
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_refresh = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("refresh")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          model.selectDetails();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_content = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("domkit-border");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px"]));
      return;
    })),fan.domkit.Box.$type);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with($this.m_nav,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u3,
            function(it)
            {
              it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["left"]));
              return;
            })),fan.domkit.FlowBox.$type)),fan.domkit.FlowBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with($this.m_refresh,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
              return;
            })),fan.domkit.Button.$type));
          return;
        })),fan.domkit.FlowBox.$type)),fan.domkit.SashBox.$type).add($this.m_content);
      return;
    })),fan.domkit.SashBox.$type));
  return;
}
fan.uiBuilder.CbBoxDetail.prototype.onUpdate = function(conn,point,index)
{
  var $this = this;
  if (conn == null)
  {
    this.m_nav.removeAll();
    this.m_refresh.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
    this.m_content.removeAll();
  }
  else
  {
    this.m_refresh.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
    fan.sys.ObjUtil.coerce(this.m_content.removeAll(),fan.domkit.Box.$type).add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u39,
      function(it)
      {
        return;
      })));
    fan.sys.ObjUtil.coerce(this.m_nav.removeAll(),fan.domkit.FlowBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u31,
      function(it)
      {
        it.style().addClass("paleBlue");
        it.style().trap("maxWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["160px"]));
        it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
        it.style().trap("textOverflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["ellipsis"]));
        it.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["nowrap"]));
        it.text$(fan.sys.ObjUtil.coerce(conn.dis(),fan.sys.Str.$type));
        it.selected$(fan.sys.ObjUtil.equals(index,0));
        it.onAction(fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u31,
          function(it)
          {
            $this.m_model.selectDetails(0);
            return;
          }));
        return;
      })),fan.domkit.ToggleButton.$type));
    if (point != null)
    {
      this.m_nav.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u31,
        function(it)
        {
          it.style().addClass("paleBlue");
          it.style().trap("maxWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["160px"]));
          it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
          it.style().trap("textOverflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["ellipsis"]));
          it.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["nowrap"]));
          it.text$(fan.sys.ObjUtil.coerce(point.dis(),fan.sys.Str.$type));
          it.selected$(fan.sys.ObjUtil.equals(index,1));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u31,
            function(it)
            {
              $this.m_model.selectDetails(1);
              return;
            }));
          return;
        })),fan.domkit.ToggleButton.$type));
    }
    ;
    var rec = (function($this) { if (fan.sys.ObjUtil.equals(index,0)) return conn; return point; })(this);
    this.m_lastReqId = rec.id();
    this.m_model.m_req.loadDetails(fan.sys.ObjUtil.coerce(rec,fan.haystack.Dict.$type),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u9,
      function(g)
      {
        if (fan.sys.ObjUtil.compareNE(g.meta().trap("id",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),$this.m_lastReqId))
        {
          return;
        }
        ;
        $this.m_refresh.enabled$(fan.sys.ObjUtil.coerce(true,fan.sys.Bool.$type.toNullable()));
        fan.sys.ObjUtil.coerce($this.m_content.removeAll(),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("pre"),fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u89,
          function(it)
          {
            it.style().addClass("ui-font-mono");
            it.text$(fan.sys.ObjUtil.coerce(g.first().trap("val",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
            return;
          })),fan.dom.Elem.$type));
        return;
      }));
  }
  ;
  return;
}
fan.uiBuilder.CbBoxDetail.prototype.model = function()
{
  return this.m_model;
}
fan.uiBuilder.CbBoxDetail.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.uiBuilder.CbBoxDetail.prototype.nav = function()
{
  return this.m_nav;
}
fan.uiBuilder.CbBoxDetail.prototype.nav$ = function(it)
{
  this.m_nav = it;
  return;
}
fan.uiBuilder.CbBoxDetail.prototype.refresh = function()
{
  return this.m_refresh;
}
fan.uiBuilder.CbBoxDetail.prototype.refresh$ = function(it)
{
  this.m_refresh = it;
  return;
}
fan.uiBuilder.CbBoxDetail.prototype.content = function()
{
  return this.m_content;
}
fan.uiBuilder.CbBoxDetail.prototype.content$ = function(it)
{
  this.m_content = it;
  return;
}
fan.uiBuilder.CbBoxDetail.prototype.lastReqId = function()
{
  return this.m_lastReqId;
}
fan.uiBuilder.CbBoxDetail.prototype.lastReqId$ = function(it)
{
  this.m_lastReqId = it;
  return;
}
fan.uiBuilder.CbBoxDetail.prototype.m_model = null;
fan.uiBuilder.CbBoxDetail.prototype.m_nav = null;
fan.uiBuilder.CbBoxDetail.prototype.m_refresh = null;
fan.uiBuilder.CbBoxDetail.prototype.m_content = null;
fan.uiBuilder.CbBoxDetail.prototype.m_lastReqId = null;
fan.uiBuilder.FbEditFile = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.FbEditFile.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.FbEditFile.prototype.$typeof = function() { return fan.uiBuilder.FbEditFile.$type; }
fan.uiBuilder.FbEditFile.make = function(view,file,text) {
  var self = new fan.uiBuilder.FbEditFile();
  fan.uiBuilder.FbEditFile.make$(self,view,file,text);
  return self;
  }
fan.uiBuilder.FbEditFile.make$ = function(self,view,file,text)
{
  var $this = self;
  self.m_view = view;
  self.m_file = file;
  self.m_editor = fan.ui.TextEditor.make(view.m_session,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u126,
    function(it)
    {
      it.m_lang = fan.ui.TextEditorLang.forFile(file);
      return;
    }));
  self.m_editor.val$(text);
  return;
}
fan.uiBuilder.FbEditFile.prototype.invoke = function()
{
  var $this = this;
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.ContentDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      var dlg = it;
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("edit")));
      it.width$("800px");
      it.height$("400px");
      it.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("borderTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
          it.style().trap("borderBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
          it.add($this.m_editor);
          return;
        })),fan.domkit.Box.$type));
      it.addButton("ok",fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("save")),true);
      it.addButton("cancel");
      it.onOpen(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u127,
        function(it)
        {
          $this.m_editor.relayout().focus();
          return;
        }));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          if (fan.sys.ObjUtil.compareNE(key,"ok"))
          {
            return true;
          }
          ;
          $this.m_view.m_session.m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("ioWriteStr(",fan.sys.Str.toCode($this.m_editor.val())),", "),$this.m_file.m_uri.toCode()),")")).onOk(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u9,
            function(g)
            {
              dlg.close();
              $this.m_view.refresh();
              return;
            })).onErr(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u128,
            function(e)
            {
              fan.ui.Flash.showErr(dlg,e);
              return;
            }));
          return false;
        }));
      return;
    })),fan.ui.ContentDialog.$type).open();
  return;
}
fan.uiBuilder.FbEditFile.prototype.onSave = function()
{
  return;
}
fan.uiBuilder.FbEditFile.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.FbEditFile.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.FbEditFile.prototype.file = function()
{
  return this.m_file;
}
fan.uiBuilder.FbEditFile.prototype.file$ = function(it)
{
  this.m_file = it;
  return;
}
fan.uiBuilder.FbEditFile.prototype.editor = function()
{
  return this.m_editor;
}
fan.uiBuilder.FbEditFile.prototype.editor$ = function(it)
{
  this.m_editor = it;
  return;
}
fan.uiBuilder.FbEditFile.prototype.m_view = null;
fan.uiBuilder.FbEditFile.prototype.m_file = null;
fan.uiBuilder.FbEditFile.prototype.m_editor = null;
fan.uiBuilder.FbPreviewBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.FbPreviewBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.FbPreviewBox.prototype.$typeof = function() { return fan.uiBuilder.FbPreviewBox.$type; }
fan.uiBuilder.FbPreviewBox.make = function(view) {
  var self = new fan.uiBuilder.FbPreviewBox();
  fan.uiBuilder.FbPreviewBox.make$(self,view);
  return self;
  }
fan.uiBuilder.FbPreviewBox.make$ = function(self,view)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.m_view = view;
  self.m_header = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      return;
    })),fan.domkit.Box.$type);
  self.m_preview = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("domkit-border");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      return;
    })),fan.domkit.Box.$type);
  self.m_info = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#999"]));
      return;
    })),fan.domkit.Label.$type);
  self.m_vbut = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ListButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u11,
    function(it)
    {
      it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["62px"]));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u11,
        function(it)
        {
          $this.load($this.m_node,fan.sys.ObjUtil.coerce($this.m_vbut.sel().item(),fan.ui.UiFileView.$type.toNullable()));
          return;
        }));
      it.onElem(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u129,
        function(item)
        {
          return fan.sys.ObjUtil.coerce(item,fan.ui.UiFileView.$type).m_dis;
        }));
      return;
    })),fan.domkit.ListButton.$type);
  self.m_download = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("download")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.onDownload();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_edit = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("edit")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          fan.uiBuilder.FbEditFile.make(view,fan.sys.ObjUtil.coerce($this.m_file,fan.ui.UiFile.$type),fan.sys.ObjUtil.coerce($this.m_val,fan.sys.Str.$type)).invoke();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_rename = fan.uiBuilder.FbAxRename.make(view).button();
  self.m_$delete = view.makeButton("delete");
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      fan.sys.ObjUtil.coerce(it.add($this.m_header),fan.domkit.SashBox.$type).add($this.m_preview);
      return;
    })),fan.domkit.SashBox.$type));
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.load = function(node,fview)
{
  if (fview === undefined) fview = null;
  var $this = this;
  this.m_node = node;
  this.m_file = null;
  this.m_val = null;
  this.m_header.removeAll();
  this.m_preview.removeAll();
  this.m_info.text$("");
  this.m_vbut.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  this.m_download.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
  this.m_edit.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
  this.m_rename.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
  this.m_$delete.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
  if (node == null)
  {
    return;
  }
  ;
  this.m_file = fan.ui.UiFile.make(this.m_view.m_session,fan.sys.ObjUtil.coerce(node,fan.pim.PimNode.$type));
  if (fview == null)
  {
    fview = this.m_file.m_views.first();
  }
  ;
  if (!this.m_file.isDir())
  {
    this.m_download.enabled$(fan.sys.ObjUtil.coerce(true,fan.sys.Bool.$type.toNullable()));
    this.m_rename.enabled$(fan.sys.ObjUtil.coerce(this.m_file.m_writable,fan.sys.Bool.$type.toNullable()));
    this.m_$delete.enabled$(fan.sys.ObjUtil.coerce(this.m_file.m_writable,fan.sys.Bool.$type.toNullable()));
  }
  ;
  if (fan.sys.ObjUtil.compareGT(this.m_file.m_views.size(),1))
  {
    this.m_vbut.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["inline-block"]));
    this.m_vbut.items$(this.m_file.m_views);
    this.m_vbut.sel().index$(this.m_file.m_views.findIndex(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u130,
      function(w)
      {
        return fan.sys.ObjUtil.equals(w,fview);
      })));
  }
  ;
  this.m_header.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.icon$(fan.ui.Icon.outline($this.m_file.m_icon,"#888"));
      it.label$($this.m_file.m_$name);
      return;
    })));
  this.m_header.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["20px","20px","4px","4px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_info),fan.domkit.FlowBox.$type).add($this.m_vbut),fan.domkit.FlowBox.$type).add($this.m_download),fan.domkit.FlowBox.$type).add($this.m_edit),fan.domkit.FlowBox.$type).add($this.m_rename),fan.domkit.FlowBox.$type).add($this.m_$delete);
      return;
    })),fan.domkit.FlowBox.$type));
  var $_u131 = fview;
  if (fan.sys.ObjUtil.equals($_u131,fan.ui.UiFileView.m_dir))
  {
    this.loadDir();
  }
  else if (fan.sys.ObjUtil.equals($_u131,fan.ui.UiFileView.m_text))
  {
    this.loadText();
  }
  else if (fan.sys.ObjUtil.equals($_u131,fan.ui.UiFileView.m_table))
  {
    this.loadTable();
  }
  else if (fan.sys.ObjUtil.equals($_u131,fan.ui.UiFileView.m_image))
  {
    this.loadImage();
  }
  else
  {
    this.loadUnknown(fan.sys.ObjUtil.coerce(fview,fan.ui.UiFileView.$type));
  }
  ;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.loadDir = function()
{
  var $this = this;
  this.m_preview.add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u39,
    function(it)
    {
      return;
    })));
  this.m_file.readDir(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u132,
    function(grid)
    {
      if (grid == null)
      {
        return $this.loadUnknown(fan.ui.UiFileView.m_dir);
      }
      ;
      grid = grid.addColMeta("uri",fan.sys.Map.fromLiteral(["hidden"],[fan.haystack.Marker.m_val],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Marker")));
      grid = grid.addCol("download",fan.sys.Map.fromLiteral(["format"],[fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("link"))],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u133,
        function(row)
        {
          return $this.m_view.m_session.m_uris.href(fan.sys.ObjUtil.coerce(row.trap("uri",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Uri.$type));
        }));
      var table = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTable.make($this.m_view.m_session.m_pim.grid(fan.sys.ObjUtil.coerce(grid,fan.haystack.Grid.$type))),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u27,
        function(it)
        {
          it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
          it.onSelect(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u134,
            function(t)
            {
              $this.onDirSelect(t.selRows().first());
              return;
            }));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u134,
            function(t)
            {
              $this.onDirAction(t.selRows().first());
              return;
            }));
          it.rebuild();
          return;
        })),fan.ui.UiPimTable.$type);
      fan.sys.ObjUtil.coerce($this.m_preview.removeAll(),fan.domkit.Box.$type).add(table);
      return;
    }));
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.loadText = function()
{
  var $this = this;
  this.m_preview.add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u39,
    function(it)
    {
      return;
    })));
  this.m_file.readStr(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u135,
    function(str)
    {
      if (str == null)
      {
        return $this.loadUnknown(fan.ui.UiFileView.m_text);
      }
      ;
      $this.m_val = str;
      var editor = fan.ui.TextEditor.make($this.m_view.m_session,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u126,
        function(it)
        {
          it.m_lang = fan.ui.TextEditorLang.forFile(fan.sys.ObjUtil.coerce($this.m_file,fan.ui.UiFile.$type));
          it.m_ro = true;
          return;
        }));
      $this.m_edit.enabled$(fan.sys.ObjUtil.coerce(true,fan.sys.Bool.$type.toNullable()));
      fan.sys.ObjUtil.coerce($this.m_preview.removeAll(),fan.domkit.Box.$type).add(editor);
      editor.val$(fan.sys.ObjUtil.coerce(str,fan.sys.Str.$type));
      editor.relayout();
      return;
    }));
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.loadTable = function()
{
  var $this = this;
  this.m_preview.add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u39,
    function(it)
    {
      return;
    })));
  this.m_file.readGrid(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u132,
    function(grid)
    {
      if (grid == null)
      {
        return $this.loadUnknown(fan.ui.UiFileView.m_table);
      }
      ;
      var table = fan.ui.UiPimTable.make($this.m_view.m_session.m_pim.grid(fan.sys.ObjUtil.coerce(grid,fan.haystack.Grid.$type)));
      table.style().removeClass("domkit-border");
      fan.sys.ObjUtil.coerce($this.m_preview.removeAll(),fan.domkit.Box.$type).add(table);
      table.rebuild();
      return;
    }));
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.loadImage = function()
{
  var $this = this;
  this.m_preview.add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u39,
    function(it)
    {
      return;
    })));
  var img = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("img"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      it.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[$this.m_file.href()]));
      return;
    })),fan.dom.Elem.$type);
  img.onEvent("load",false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u44,
    function(e)
    {
      $this.m_info.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",img.trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])))," x "),img.trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))));
      img.style().trap("maxWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      img.style().trap("maxHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      fan.sys.ObjUtil.coerce($this.m_preview.removeAll(),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.add(img);
          return;
        })),fan.domkit.Box.$type));
      return;
    }));
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.loadUnknown = function(view)
{
  var $this = this;
  var elem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#999"]));
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("noPreviewAvail"))," \u2022 "),view.m_dis));
      return;
    })),fan.dom.Elem.$type);
  fan.sys.ObjUtil.coerce(this.m_preview.removeAll(),fan.domkit.Box.$type).add(fan.ui.UiUtil.makeCenterBox(elem));
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.onDownload = function()
{
  if (this.m_file == null)
  {
    return;
  }
  ;
  fan.dom.Win.cur().open(this.m_file.href());
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.onDirSelect = function(row)
{
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.onDirAction = function(row)
{
  if (row == null)
  {
    return;
  }
  ;
  this.m_view.goto(fan.sys.ObjUtil.coerce(row.trap("uri",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Uri.$type));
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.FbPreviewBox.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.header = function()
{
  return this.m_header;
}
fan.uiBuilder.FbPreviewBox.prototype.header$ = function(it)
{
  this.m_header = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.preview = function()
{
  return this.m_preview;
}
fan.uiBuilder.FbPreviewBox.prototype.preview$ = function(it)
{
  this.m_preview = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.info = function()
{
  return this.m_info;
}
fan.uiBuilder.FbPreviewBox.prototype.info$ = function(it)
{
  this.m_info = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.vbut = function()
{
  return this.m_vbut;
}
fan.uiBuilder.FbPreviewBox.prototype.vbut$ = function(it)
{
  this.m_vbut = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.download = function()
{
  return this.m_download;
}
fan.uiBuilder.FbPreviewBox.prototype.download$ = function(it)
{
  this.m_download = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.edit = function()
{
  return this.m_edit;
}
fan.uiBuilder.FbPreviewBox.prototype.edit$ = function(it)
{
  this.m_edit = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.rename = function()
{
  return this.m_rename;
}
fan.uiBuilder.FbPreviewBox.prototype.rename$ = function(it)
{
  this.m_rename = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.$delete = function()
{
  return this.m_$delete;
}
fan.uiBuilder.FbPreviewBox.prototype.$delete$ = function(it)
{
  this.m_$delete = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.FbPreviewBox.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.file = function()
{
  return this.m_file;
}
fan.uiBuilder.FbPreviewBox.prototype.file$ = function(it)
{
  this.m_file = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.val = function()
{
  return this.m_val;
}
fan.uiBuilder.FbPreviewBox.prototype.val$ = function(it)
{
  this.m_val = it;
  return;
}
fan.uiBuilder.FbPreviewBox.prototype.m_view = null;
fan.uiBuilder.FbPreviewBox.prototype.m_header = null;
fan.uiBuilder.FbPreviewBox.prototype.m_preview = null;
fan.uiBuilder.FbPreviewBox.prototype.m_info = null;
fan.uiBuilder.FbPreviewBox.prototype.m_vbut = null;
fan.uiBuilder.FbPreviewBox.prototype.m_download = null;
fan.uiBuilder.FbPreviewBox.prototype.m_edit = null;
fan.uiBuilder.FbPreviewBox.prototype.m_rename = null;
fan.uiBuilder.FbPreviewBox.prototype.m_$delete = null;
fan.uiBuilder.FbPreviewBox.prototype.m_node = null;
fan.uiBuilder.FbPreviewBox.prototype.m_file = null;
fan.uiBuilder.FbPreviewBox.prototype.m_val = null;
fan.uiBuilder.FbAxRename = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.FbAxRename.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.FbAxRename.prototype.$typeof = function() { return fan.uiBuilder.FbAxRename.$type; }
fan.uiBuilder.FbAxRename.make = function(view) {
  var self = new fan.uiBuilder.FbAxRename();
  fan.uiBuilder.FbAxRename.make$(self,view);
  return self;
  }
fan.uiBuilder.FbAxRename.make$ = function(self,view)
{
  var $this = self;
  self.m_view = view;
  self.m_action = fan.sys.ObjUtil.coerce(view.actions().find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u136,
    function(a)
    {
      return fan.sys.ObjUtil.equals(a.node().m_$name,"rename");
    })),fan.ui.UiAction.$type);
  return;
}
fan.uiBuilder.FbAxRename.prototype.button = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$($this.m_action.node().m_dis);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.openDialog();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
}
fan.uiBuilder.FbAxRename.prototype.openDialog = function()
{
  var $this = this;
  var opts = fan.haystack.Etc.makeDict1("fileName",fan.haystack.Marker.m_val);
  fan.ui.UiUtil.promptStr(this.m_action.node().m_dis,fan.sys.ObjUtil.coerce(this.m_view.sel().first().trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type),opts,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u109,
    function(newVal)
    {
      $this.m_action.invoke(fan.sys.List.make(fan.sys.Str.$type, [newVal]));
      return;
    }));
  return;
}
fan.uiBuilder.FbAxRename.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.FbAxRename.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.FbAxRename.prototype.action = function()
{
  return this.m_action;
}
fan.uiBuilder.FbAxRename.prototype.action$ = function(it)
{
  this.m_action = it;
  return;
}
fan.uiBuilder.FbAxRename.prototype.m_view = null;
fan.uiBuilder.FbAxRename.prototype.m_action = null;
fan.uiBuilder.FileBuilder = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiBuilder.FileBuilder.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.FileBuilder.prototype.$typeof = function() { return fan.uiBuilder.FileBuilder.$type; }
fan.uiBuilder.FileBuilder.make = function() {
  var self = new fan.uiBuilder.FileBuilder();
  fan.uiBuilder.FileBuilder.make$(self);
  return self;
  }
fan.uiBuilder.FileBuilder.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  var meta = fan.haystack.Etc.emptyDict();
  var pim = self.m_session.m_pim.navTree("file",meta);
  self.m_preview = fan.uiBuilder.FbPreviewBox.make(self);
  self.m_tree = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTree.make(pim),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u137,
    function(it)
    {
      it.onInit(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u138,
        function(it)
        {
          return;
        }));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u139,
        function(t)
        {
          $this.fireSelect();
          $this.updateSel(fan.sys.ObjUtil.coerce(t.sel().items(),fan.sys.Type.find("pim::PimNode[]")));
          return;
        }));
      it.onIcon(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u140,
        function(p)
        {
          return (function($this) { if (p.hasChildren()) return fan.ui.Icon.solid(p.icon(),fan.ui.Colors.m_grey); return fan.ui.Icon.outline(p.icon(),fan.ui.Colors.m_grey); })($this);
        }));
      return;
    })),fan.ui.UiPimTree.$type);
  self.m_newBut = self.makeNewButton(fan.sys.List.make(fan.sys.Str.$type, ["newDir","newFile"]));
  self.m_upload = self.makeButton("upload");
  self.style().addClass("uiBuilder-FileBuilder");
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["30%","10px","70%"]));
      it.resizable$(true);
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          it.dir$(fan.domkit.Dir.m_down);
          it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
          fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u3,
            function(it)
            {
              it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px"]));
              fan.sys.ObjUtil.coerce(it.add($this.m_newBut),fan.domkit.FlowBox.$type).add($this.m_upload);
              return;
            })),fan.domkit.FlowBox.$type)),fan.domkit.SashBox.$type).add($this.m_tree);
          return;
        })),fan.domkit.SashBox.$type)),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add($this.m_preview);
      return;
    })),fan.domkit.SashBox.$type));
  self.m_inUpdate = true;
  try
  {
    self.updateSel(fan.sys.ObjUtil.coerce(fan.pim.PimNode.$type.emptyList(),fan.sys.Type.find("pim::PimNode[]")));
  }
  finally
  {
    self.m_inUpdate = false;
  }
  ;
  return;
}
fan.uiBuilder.FileBuilder.prototype.sel = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(this.m_tree.sel().items().map(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u142,
    function(p)
    {
      var f = fan.ui.UiFile.make($this.m_session,p);
      return fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","uri"],[f.m_$name,f.m_uri],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
    }),fan.sys.Type.find("|sys::Obj,sys::Int->sys::Obj?|"))),fan.sys.Type.find("haystack::Dict[]"));
}
fan.uiBuilder.FileBuilder.prototype.onUpdate = function()
{
  this.m_inUpdate = true;
  try
  {
    this.m_tree.rebuildAll();
    var uri = this.$var("uri");
    if (uri != null)
    {
      this.m_tree.expandTo(fan.sys.ObjUtil.coerce(uri,fan.sys.Obj.$type));
    }
    ;
  }
  finally
  {
    this.m_inUpdate = false;
  }
  ;
  return;
}
fan.uiBuilder.FileBuilder.prototype.refresh = function()
{
  this.m_preview.load(fan.sys.ObjUtil.coerce(this.m_tree.sel().items().first(),fan.pim.PimNode.$type.toNullable()));
  return;
}
fan.uiBuilder.FileBuilder.prototype.goto = function(uri)
{
  this.update(fan.sys.Map.fromLiteral(["uri"],[uri],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Uri")));
  this.m_tree.expandTo(uri);
  return;
}
fan.uiBuilder.FileBuilder.prototype.makeNewButton = function(names)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().addClass("disclosure");
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("new")));
      it.onPopup(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u143,
        function(b)
        {
          var m = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Menu.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u144,
            function(it)
            {
              return;
            })),fan.domkit.Menu.$type);
          names.each(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u145,
            function(n)
            {
              var action = $this.actions().find(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u136,
                function(a)
                {
                  return fan.sys.ObjUtil.equals(a.node().m_$name,n);
                }));
              m.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u146,
                function(it)
                {
                  it.text$(action.node().m_dis);
                  it.onAction(fan.sys.Func.make$closure(
                    fan.uiBuilder.$clos$_u146,
                    function(it)
                    {
                      action.invoke();
                      return;
                    }));
                  return;
                })),fan.domkit.MenuItem.$type));
              return;
            }));
          return m;
        }));
      return;
    })),fan.domkit.Button.$type);
}
fan.uiBuilder.FileBuilder.prototype.makeButton = function($name,onInvoke)
{
  if (onInvoke === undefined) onInvoke = null;
  var $this = this;
  var action = this.actions().find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u136,
    function(a)
    {
      return fan.sys.ObjUtil.equals(a.node().m_$name,$name);
    }));
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(action.node().m_dis);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          action.invoke((function($this) { var $_u147 = onInvoke; if ($_u147 == null) return null; return $_u147.call(); })($this));
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
}
fan.uiBuilder.FileBuilder.prototype.updateSel = function(nodes)
{
  var $this = this;
  if (!this.m_inUpdate)
  {
    this.setVars(fan.sys.Map.fromLiteral(["uri"],[(function($this) { var $_u148 = nodes.first(); if ($_u148 == null) return null; return $_u148.uri(); })(this)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Uri?")));
  }
  ;
  var w = (fan.sys.ObjUtil.compareGT(nodes.size(),0) && nodes.all(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u149,
    function(p)
    {
      return p.meta().get("writable") != null;
    })));
  this.m_newBut.enabled$(fan.sys.ObjUtil.coerce(w,fan.sys.Bool.$type.toNullable()));
  this.m_upload.enabled$(fan.sys.ObjUtil.coerce(w,fan.sys.Bool.$type.toNullable()));
  this.m_preview.load(nodes.first());
  return;
}
fan.uiBuilder.FileBuilder.prototype.tree = function()
{
  return this.m_tree;
}
fan.uiBuilder.FileBuilder.prototype.tree$ = function(it)
{
  this.m_tree = it;
  return;
}
fan.uiBuilder.FileBuilder.prototype.preview = function()
{
  return this.m_preview;
}
fan.uiBuilder.FileBuilder.prototype.preview$ = function(it)
{
  this.m_preview = it;
  return;
}
fan.uiBuilder.FileBuilder.prototype.newBut = function()
{
  return this.m_newBut;
}
fan.uiBuilder.FileBuilder.prototype.newBut$ = function(it)
{
  this.m_newBut = it;
  return;
}
fan.uiBuilder.FileBuilder.prototype.upload = function()
{
  return this.m_upload;
}
fan.uiBuilder.FileBuilder.prototype.upload$ = function(it)
{
  this.m_upload = it;
  return;
}
fan.uiBuilder.FileBuilder.prototype.inUpdate = function()
{
  return this.m_inUpdate;
}
fan.uiBuilder.FileBuilder.prototype.inUpdate$ = function(it)
{
  this.m_inUpdate = it;
  return;
}
fan.uiBuilder.FileBuilder.prototype.m_tree = null;
fan.uiBuilder.FileBuilder.prototype.m_preview = null;
fan.uiBuilder.FileBuilder.prototype.m_newBut = null;
fan.uiBuilder.FileBuilder.prototype.m_upload = null;
fan.uiBuilder.FileBuilder.prototype.m_inUpdate = false;
fan.uiBuilder.LibActions = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.LibActions.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.LibActions.prototype.$typeof = function() { return fan.uiBuilder.LibActions.$type; }
fan.uiBuilder.LibActions.enable = function(view)
{
  var $this = this;
  if (fan.uiBuilder.LibActions.checkCloud(view))
  {
    return;
  }
  ;
  var sel = view.sel();
  var names = fan.uiBuilder.LibActions.toNames(sel);
  if (sel.isEmpty())
  {
    return;
  }
  ;
  var enabled = view.sel().findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      return r.has("enabled");
    }));
  if (!enabled.isEmpty())
  {
    fan.uiBuilder.LibActions.showErr(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("alreadyEnabled")),fan.uiBuilder.LibActions.toNames(enabled).join(", "));
    return;
  }
  ;
  var apply = fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u150,
    function()
    {
      var func = (function($this) { if (fan.uiBuilder.LibActions.isExtSettings(view)) return "extAdd"; return "sysModAdd"; })($this);
      fan.uiBuilder.LibActions.eval(view,func,names);
      return;
    });
  var ns = view.m_session.m_ns;
  var missing = fan.uiBuilder.LibActions.missingDepends(ns,sel);
  if (!missing.isEmpty())
  {
    var missingSysMods = fan.uiBuilder.LibActions.missingSysMods(ns,missing);
    if (!missingSysMods.isEmpty())
    {
      fan.uiBuilder.LibActions.showErr(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("cannotEnableMissingSysMods")),missing.join(", "));
      return;
    }
    ;
    names.addAll(missing);
    fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AlertDialog.make(),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u61,
      function(it)
      {
        it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("confirm")));
        it.icon$(fan.ui.Icon.outline("warn",fan.ui.Colors.m_darkYellow));
        it.msg$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("enableAllDepends")));
        it.info$(missing.join(","));
        it.addButton("ok",fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("enableAll")),true);
        it.addButton("cancel");
        it.onAction(fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u37,
          function(key)
          {
            if (fan.sys.ObjUtil.equals(key,"ok"))
            {
              apply.call();
            }
            ;
            return true;
          }));
        return;
      })),fan.ui.AlertDialog.$type).open();
  }
  else
  {
    apply.call();
  }
  ;
  return;
}
fan.uiBuilder.LibActions.disable = function(view)
{
  var $this = this;
  if (fan.uiBuilder.LibActions.checkCloud(view))
  {
    return;
  }
  ;
  var sel = view.sel();
  var names = fan.uiBuilder.LibActions.toNames(sel);
  if (sel.isEmpty())
  {
    return;
  }
  ;
  var disabled = view.sel().findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      return r.missing("enabled");
    }));
  if (!disabled.isEmpty())
  {
    fan.uiBuilder.LibActions.showErr(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("alreadyDisabled")),fan.uiBuilder.LibActions.toNames(disabled).join(", "));
    return;
  }
  ;
  var boot = view.sel().findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      return fan.sys.ObjUtil.is(r.get("enabled"),fan.sys.Str.$type);
    }));
  if (!boot.isEmpty())
  {
    fan.uiBuilder.LibActions.showErr(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("cannotDisableBootMods")),fan.uiBuilder.LibActions.toNames(boot).join(", "));
    return;
  }
  ;
  var ns = view.m_session.m_ns;
  var dependents = fan.uiBuilder.LibActions.dependents(view.m_session.m_ns,names);
  if (!dependents.isEmpty())
  {
    fan.uiBuilder.LibActions.showErr(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("cannotDisableDependents")),dependents.join(", "));
    return;
  }
  ;
  var func = (function($this) { if (fan.uiBuilder.LibActions.isExtSettings(view)) return "extRemove"; return "sysModRemove"; })(this);
  fan.uiBuilder.LibActions.eval(view,func,names);
  return;
}
fan.uiBuilder.LibActions.checkCloud = function(view)
{
  if (view.data().meta().has("cloudDisable"))
  {
    fan.uiBuilder.LibActions.showErr("Cloud system modules managed by conductor","Make your changes on conductor node for whole cloud");
    return true;
  }
  ;
  return false;
}
fan.uiBuilder.LibActions.isExtSettings = function(view)
{
  return fan.sys.ObjUtil.equals(view.node().def().$name(),"extSettings");
}
fan.uiBuilder.LibActions.showErr = function(msg,info)
{
  var $this = this;
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AlertDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u61,
    function(it)
    {
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("err")));
      it.icon$(fan.ui.Icon.outline("warn",fan.ui.Colors.m_red));
      it.msg$(msg);
      it.info$(info);
      it.addButton("ok",fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("ok")),true);
      return;
    })),fan.ui.AlertDialog.$type).open();
  return;
}
fan.uiBuilder.LibActions.toNames = function(rows)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(rows.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u153,
    function(row)
    {
      return fan.sys.ObjUtil.coerce(row.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
    })),fan.sys.Type.find("sys::Str[]"));
}
fan.uiBuilder.LibActions.dependents = function(ns,toDisable)
{
  var $this = this;
  var acc = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  ns.libs().each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u154,
    function(lib)
    {
      if (toDisable.contains(lib.$name()))
      {
        return;
      }
      ;
      if (lib.depends().any(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u155,
        function(sym)
        {
          return toDisable.contains(sym.$name());
        })))
      {
        acc.set(lib.$name(),lib.$name());
      }
      ;
      return;
    }));
  return acc.vals().sort();
}
fan.uiBuilder.LibActions.missingDepends = function(ns,toEnable)
{
  var $this = this;
  var acc = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  toEnable.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u156,
    function(dict)
    {
      var $name = fan.sys.ObjUtil.coerce(dict.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
      var depends = fan.sys.ObjUtil.coerce(dict.trap("depends",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Type.find("sys::Str[]"));
      depends.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u157,
        function(dependName)
        {
          var lib = ns.lib(dependName,false);
          if (lib != null)
          {
            return;
          }
          ;
          var inToEnabled = toEnable.find(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u158,
            function(e)
            {
              return fan.sys.ObjUtil.equals(e.get("name"),dependName);
            }));
          if (inToEnabled != null)
          {
            return;
          }
          ;
          acc.set(dependName,dependName);
          return;
        }));
      return;
    }));
  return acc.vals().sort();
}
fan.uiBuilder.LibActions.missingSysMods = function(ns,libNames)
{
  var $this = this;
  var installed = fan.sys.Str.split(fan.sys.ObjUtil.toStr(ns.misc("installedSysMods")),fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable()));
  return libNames.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u159,
    function(n)
    {
      return installed.contains(n);
    }));
}
fan.uiBuilder.LibActions.eval = function(view,funcName,libNames)
{
  var $this = this;
  var expr = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(funcName,"("),fan.haystack.Etc.toAxon(libNames)),")");
  var req = fan.haystack.Etc.makeMapGrid(null,fan.sys.Map.fromLiteral(["expr"],[fan.sys.Str.toStr(expr)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  var ax = fan.ui.Flash.showActivity(view,fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("working")),"..."));
  var f = view.m_session.m_api.call("eval",req);
  f.onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u121,
    function(res)
    {
      ax.onClose(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u160,
        function(it)
        {
          view.m_session.reload();
          return;
        }));
      ax.close();
      return;
    }));
  f.onErr(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u161,
    function(err)
    {
      ax.close();
      fan.ui.Flash.showErr(view,err);
      return;
    }));
  return;
}
fan.uiBuilder.LibActions.make = function() {
  var self = new fan.uiBuilder.LibActions();
  fan.uiBuilder.LibActions.make$(self);
  return self;
  }
fan.uiBuilder.LibActions.make$ = function(self)
{
  return;
}
fan.uiBuilder.ShellResultBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.ShellResultBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_vizBox = null;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.$typeof = function() { return fan.uiBuilder.ShellResultBox.$type; }
fan.uiBuilder.ShellResultBox.make = function(view) {
  var self = new fan.uiBuilder.ShellResultBox();
  fan.uiBuilder.ShellResultBox.make$(self,view);
  return self;
  }
fan.uiBuilder.ShellResultBox.make$ = function(self,view)
{
  fan.domkit.Box.make$(self);
  ;
  self.m_view = view;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.selRows = function()
{
  var t = fan.sys.ObjUtil.as((function($this) { var $_u162 = $this.m_sash; if ($_u162 == null) return null; return $_u162.firstChild(); })(this),fan.ui.UiPimTable.$type);
  if (t == null)
  {
    return fan.sys.ObjUtil.coerce(fan.haystack.Dict.$type.emptyList(),fan.sys.Type.find("haystack::Dict[]"));
  }
  ;
  return t.selRows();
}
fan.uiBuilder.ShellResultBox.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.uiBuilder.ShellResultBox.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.uiBuilder.ShellResultBox.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.onRefNav = function(f)
{
  this.m_cbRefNav = f;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.cbRefNav = function()
{
  return this.m_cbRefNav;
}
fan.uiBuilder.ShellResultBox.prototype.cbRefNav$ = function(it)
{
  this.m_cbRefNav = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.load = function(view,grid)
{
  this.removeAll();
  this.m_sview = view;
  this.m_pimRenderer = null;
  var $_u163 = view;
  if (fan.sys.ObjUtil.equals($_u163,"table"))
  {
    this.add(this.toTable(grid));
  }
  else if (fan.sys.ObjUtil.equals($_u163,"chart"))
  {
    this.add(this.toChart(grid));
  }
  else if (fan.sys.ObjUtil.equals($_u163,"card"))
  {
    this.add(this.toCard(grid));
  }
  else if (fan.sys.ObjUtil.equals($_u163,"text"))
  {
    this.add(this.toText(grid));
  }
  else if (fan.sys.ObjUtil.equals($_u163,"fandoc"))
  {
    this.add(this.toFandoc(grid));
  }
  else
  {
    this.add(this.toFiletype(view,grid));
  }
  ;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.loadErr = function(err)
{
  var $this = this;
  this.m_pimRenderer = null;
  fan.sys.ObjUtil.coerce(this.removeAll(),fan.uiBuilder.ShellResultBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("domkit-border");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.add(fan.ui.UiUtil.errTrace(err));
      return;
    })),fan.domkit.Box.$type));
  return;
}
fan.uiBuilder.ShellResultBox.prototype.feedUpdate = function(feed)
{
  (function($this) { var $_u164 = $this.m_pimRenderer; if ($_u164 == null) return null; return $_u164.onFeed(feed); })(this);
  return;
}
fan.uiBuilder.ShellResultBox.prototype.toTable = function(grid)
{
  var $this = this;
  var open = (this.m_sash != null && fan.sys.ObjUtil.compareNE(this.m_sash.sizes().last(),"0px"));
  var opts = fan.sys.Map.fromLiteral(["forceRefNav","formatActual","presentation"],[fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()),this.m_view.$var("presentation")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  var pim = this.m_view.m_session.m_pim.grid(grid,fan.haystack.Etc.makeDict(opts));
  this.m_tprez = fan.ui.TableViewPrez.make(this);
  this.m_tprez.onUpdate(pim);
  var table = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTable.make(pim),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u27,
    function(it)
    {
      it.sel().multi$(true);
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u134,
        function(t)
        {
          (function($this) { var $_u165 = $this.m_cbSelect; if ($_u165 == null) return null; return $_u165.call(t.selRows()); })($this);
          return;
        }));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u134,
        function(t)
        {
          (function($this) { var $_u166 = $this.m_cbAction; if ($_u166 == null) return null; return $_u166.call(t.selRows()); })($this);
          return;
        }));
      it.onNav(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u167,
        function(e)
        {
          if (fan.sys.ObjUtil.is(e.cell().val(),fan.haystack.Ref.$type))
          {
            (function($this) { var $_u168 = $this.m_cbRefNav; if ($_u168 == null) return null; return $_u168.call(fan.sys.ObjUtil.coerce(e.cell().val(),fan.sys.Obj.$type)); })($this);
          }
          ;
          return;
        }));
      it.onCustomizeHeaderMenu(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u169,
        function(p)
        {
          p.add(fan.ui.UiUtil.hsep());
          p.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u146,
            function(it)
            {
              it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u29,
                function(it)
                {
                  it.icon$(fan.ui.Icon.outline("paintBrush",fan.ui.Colors.m_grey));
                  it.label$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("customize")));
                  return;
                })));
              it.onAction(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u146,
                function(it)
                {
                  $this.openPrez();
                  return;
                }));
              return;
            })),fan.domkit.MenuItem.$type));
          return;
        }));
      it.rebuild();
      return;
    })),fan.ui.UiPimTable.$type);
  this.m_pimRenderer = table;
  this.m_sash = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%","0px","0px"]));
      it.resizable$(true);
      it.onSashResize(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          fan.ui.UiUtil.savePrezSidebar(fan.sys.ObjUtil.coerce($this.m_sview,fan.sys.Str.$type),fan.sys.ObjUtil.coerce($this.m_sash.sizes().last(),fan.sys.Str.$type));
          return;
        }));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(table),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().addClass("domkit-border");
          it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px 10px 10px"]));
          it.add(fan.sys.ObjUtil.coerce($this.m_tprez,fan.dom.Elem.$type));
          return;
        })),fan.domkit.Box.$type));
      return;
    })),fan.domkit.SashBox.$type);
  if (open)
  {
    this.openPrez();
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_sash,fan.dom.Elem.$type);
}
fan.uiBuilder.ShellResultBox.prototype.toCard = function(grid)
{
  var $this = this;
  var open = (this.m_sash != null && fan.sys.ObjUtil.compareNE(this.m_sash.sizes().last(),"0px"));
  var opts = fan.sys.Map.fromLiteral(["forceRefNav","formatActual","presentation"],[fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()),this.m_view.$var("presentation")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  var pim = this.m_view.m_session.m_pim.grid(grid,fan.haystack.Etc.makeDict(opts));
  var deckPrez = fan.ui.DeckViewPrez.make(this);
  deckPrez.onUpdate(pim);
  var deck = fan.ui.UiPimCardDeck.make(pim);
  this.m_pimRenderer = deck;
  this.m_sash = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%","0px","0px"]));
      it.resizable$(true);
      it.onSashResize(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          fan.ui.UiUtil.savePrezSidebar(fan.sys.ObjUtil.coerce($this.m_sview,fan.sys.Str.$type),fan.sys.ObjUtil.coerce($this.m_sash.sizes().last(),fan.sys.Str.$type));
          return;
        }));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(deck),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().addClass("domkit-border");
          it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px 10px 10px"]));
          it.add(deckPrez);
          return;
        })),fan.domkit.Box.$type));
      return;
    })),fan.domkit.SashBox.$type);
  if (open)
  {
    this.openPrez();
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_sash,fan.dom.Elem.$type);
}
fan.uiBuilder.ShellResultBox.prototype.toChart = function(grid)
{
  var $this = this;
  var open = (this.m_sash != null && fan.sys.ObjUtil.compareNE(this.m_sash.sizes().last(),"0px"));
  var opts = fan.sys.Map.fromLiteral(["size","presentation"],[this.size(),this.m_view.$var("presentation")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  var pim = this.m_view.m_session.m_pim.grid(grid,fan.haystack.Etc.makeDict(opts));
  this.m_cprez = fan.ui.ChartViewPrez.make(this);
  if (pim.canChart())
  {
    this.m_cprez.onUpdate(pim);
  }
  ;
  this.m_sash = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%","0px","0px"]));
      it.resizable$(true);
      it.onSashResize(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          fan.ui.UiUtil.savePrezSidebar(fan.sys.ObjUtil.coerce($this.m_sview,fan.sys.Str.$type),fan.sys.ObjUtil.coerce($this.m_sash.sizes().last(),fan.sys.Str.$type));
          return;
        }));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().addClass("domkit-border");
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
          it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
          it.add(fan.sys.ObjUtil.coerce((function($this) { var $_u170 = fan.ui.VizBox.make($this.m_view.m_session,$this.m_view,true).rebuild(pim); $this.vizBox$($_u170); return $_u170; })($this),fan.dom.Elem.$type));
          return;
        })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().addClass("domkit-border");
          it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px 10px 10px"]));
          it.add(fan.sys.ObjUtil.coerce($this.m_cprez,fan.dom.Elem.$type));
          return;
        })),fan.domkit.Box.$type));
      return;
    })),fan.domkit.SashBox.$type);
  if (open)
  {
    this.openPrez();
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_sash,fan.dom.Elem.$type);
}
fan.uiBuilder.ShellResultBox.prototype.toText = function(grid)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextArea.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u100,
    function(it)
    {
      it.style().addClass("ui-font-mono");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["pre"]));
      it.ro$(true);
      it.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u171 = (function($this) { var $_u172 = (function($this) { var $_u173 = grid.first(); if ($_u173 == null) return null; return $_u173.get("val"); })($this); if ($_u172 == null) return null; return fan.sys.ObjUtil.toStr($_u172); })($this); if ($_u171 != null) return $_u171; return ""; })($this),fan.sys.Str.$type));
      return;
    })),fan.domkit.TextArea.$type);
}
fan.uiBuilder.ShellResultBox.prototype.toFandoc = function(grid)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ScrollBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u174,
    function(it)
    {
      var text = (function($this) { var $_u175 = (function($this) { var $_u176 = (function($this) { var $_u177 = grid.first(); if ($_u177 == null) return null; return $_u177.get("val"); })($this); if ($_u176 == null) return null; return fan.sys.ObjUtil.toStr($_u176); })($this); if ($_u175 != null) return $_u175; return ""; })($this);
      var buf = fan.sys.StrBuf.make();
      fan.ui.UiUtil.fandocParse(fan.sys.ObjUtil.coerce(text,fan.sys.Str.$type)).writeChildren(fan.fandoc.HtmlDocWriter.make(buf.out()));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px"]));
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.style().addClass("ui-FandocView");
          it.html$(buf.toStr());
          return;
        })),fan.dom.Elem.$type));
      return;
    })),fan.domkit.ScrollBox.$type);
}
fan.uiBuilder.ShellResultBox.prototype.toFiletype = function(type,grid)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextArea.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u100,
    function(it)
    {
      var ns = $this.m_view.m_session.m_ns;
      var f = ns.filetypes().find(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u178,
        function(f)
        {
          return fan.sys.ObjUtil.equals(f.$name(),type);
        }));
      if (f == null)
      {
        throw fan.sys.ArgErr.make(fan.sys.Str.plus(fan.sys.Str.plus("Unknown filetype '",type),"'"));
      }
      ;
      var buf = fan.sys.StrBuf.make();
      fan.ui.UiUtil.makeGridWriter($this.m_view.m_session,fan.sys.ObjUtil.coerce(f,fan.haystack.Filetype.$type),buf.out()).writeGrid(grid);
      it.style().addClass("ui-font-mono");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.trap("wrap",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["off"]));
      it.ro$(true);
      it.val$(buf.toStr());
      return;
    })),fan.domkit.TextArea.$type);
}
fan.uiBuilder.ShellResultBox.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.ShellResultBox.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.togglePrez = function()
{
  if (fan.sys.ObjUtil.equals(this.m_sash.sizes().last(),"0px"))
  {
    this.openPrez();
  }
  else
  {
    this.closePrez();
  }
  ;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.viewNode = function()
{
  return this.m_view.node();
}
fan.uiBuilder.ShellResultBox.prototype.vizBox = function()
{
  return this.m_vizBox;
}
fan.uiBuilder.ShellResultBox.prototype.vizBox$ = function(it)
{
  this.m_vizBox = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.update = function(changes,opts)
{
  if (opts === undefined) opts = fan.haystack.Etc.emptyDict();
  this.m_view.update(changes);
  return;
}
fan.uiBuilder.ShellResultBox.prototype.openPrez = function()
{
  this.m_sash.sizes$(fan.ui.UiUtil.loadPrezSidebar(fan.sys.ObjUtil.coerce(this.m_sview,fan.sys.Str.$type)));
  return;
}
fan.uiBuilder.ShellResultBox.prototype.closePrez = function()
{
  this.m_sash.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%","0px","0px"]));
  return;
}
fan.uiBuilder.ShellResultBox.prototype.highlight = function(col,row)
{
  return;
}
fan.uiBuilder.ShellResultBox.prototype.sview = function()
{
  return this.m_sview;
}
fan.uiBuilder.ShellResultBox.prototype.sview$ = function(it)
{
  this.m_sview = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.tprez = function()
{
  return this.m_tprez;
}
fan.uiBuilder.ShellResultBox.prototype.tprez$ = function(it)
{
  this.m_tprez = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.cprez = function()
{
  return this.m_cprez;
}
fan.uiBuilder.ShellResultBox.prototype.cprez$ = function(it)
{
  this.m_cprez = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.sash = function()
{
  return this.m_sash;
}
fan.uiBuilder.ShellResultBox.prototype.sash$ = function(it)
{
  this.m_sash = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.pimRenderer = function()
{
  return this.m_pimRenderer;
}
fan.uiBuilder.ShellResultBox.prototype.pimRenderer$ = function(it)
{
  this.m_pimRenderer = it;
  return;
}
fan.uiBuilder.ShellResultBox.prototype.m_cbSelect = null;
fan.uiBuilder.ShellResultBox.prototype.m_cbAction = null;
fan.uiBuilder.ShellResultBox.prototype.m_cbRefNav = null;
fan.uiBuilder.ShellResultBox.prototype.m_view = null;
fan.uiBuilder.ShellResultBox.prototype.m_vizBox = null;
fan.uiBuilder.ShellResultBox.prototype.m_sview = null;
fan.uiBuilder.ShellResultBox.prototype.m_tprez = null;
fan.uiBuilder.ShellResultBox.prototype.m_cprez = null;
fan.uiBuilder.ShellResultBox.prototype.m_sash = null;
fan.uiBuilder.ShellResultBox.prototype.m_pimRenderer = null;
fan.uiBuilder.ShellView = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiBuilder.ShellView.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.ShellView.prototype.$typeof = function() { return fan.uiBuilder.ShellView.$type; }
fan.uiBuilder.ShellView.make = function() {
  var self = new fan.uiBuilder.ShellView();
  fan.uiBuilder.ShellView.make$(self);
  return self;
  }
fan.uiBuilder.ShellView.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  self.m_sashBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      return;
    })),fan.domkit.SashBox.$type);
  self.m_query = fan.uiBuilder.ShellQueryBar.make(self);
  self.m_tools = fan.uiBuilder.ShellToolBar.make(self);
  self.m_result = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.ShellResultBox.make(self),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u179,
    function(it)
    {
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u180,
        function(sel)
        {
          $this.fireSelect();
          return;
        }));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u180,
        function(sel)
        {
          $this.onAction(sel);
          return;
        }));
      it.onRefNav(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u181,
        function(ref)
        {
          $this.update(fan.sys.Map.fromLiteral(["expr"],[fan.sys.Str.plus(fan.sys.Str.plus("readLink(",ref.toCode()),")")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
          return;
        }));
      return;
    })),fan.uiBuilder.ShellResultBox.$type);
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(self.m_sashBox.add(self.m_query),fan.domkit.SashBox.$type).add(self.m_tools),fan.domkit.SashBox.$type).add(self.m_result);
  self.add(self.m_sashBox);
  return;
}
fan.uiBuilder.ShellView.prototype.sel = function()
{
  return this.m_result.selRows();
}
fan.uiBuilder.ShellView.prototype.templatePref = function(node)
{
  var rec = this.sel().first();
  return (function($this) { if (rec == null) return null; return $this.m_session.m_ns.templates().forDict(fan.sys.ObjUtil.coerce(rec,fan.haystack.Dict.$type),false); })(this);
}
fan.uiBuilder.ShellView.prototype.onUpdate = function()
{
  var updateAction = (function($this) { var $_u183 = $this.flash(); if ($_u183 == null) return null; return $_u183.get("action"); })(this);
  var $_u184 = updateAction;
  if (fan.sys.ObjUtil.equals($_u184,"new"))
  {
    return this.onUpdateNew(fan.sys.ObjUtil.coerce(this.flash().trap("res",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Grid.$type));
  }
  else if (fan.sys.ObjUtil.equals($_u184,"dup"))
  {
    return this.onUpdateDup(fan.sys.ObjUtil.coerce(this.flash().trap("res",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Grid.$type));
  }
  ;
  var expr = (function($this) { var $_u185 = fan.sys.ObjUtil.as($this.$var("expr"),fan.sys.Str.$type); if ($_u185 != null) return $_u185; return ""; })(this);
  var view = fan.sys.Str.trimToNull(fan.sys.ObjUtil.toStr(this.$var("tab")));
  var grid = (function($this) { var $_u186 = $this.data(null,false); if ($_u186 != null) return $_u186; return fan.haystack.Etc.makeEmptyGrid(); })(this);
  this.m_query.push(fan.sys.ObjUtil.coerce(expr,fan.sys.Str.$type));
  if (view == null)
  {
    view = fan.sys.ObjUtil.coerce((function($this) { var $_u187 = grid.meta().get("view"); if ($_u187 != null) return $_u187; return "table"; })(this),fan.sys.Str.$type.toNullable());
  }
  ;
  if (!this.m_tools.isValidView(fan.sys.ObjUtil.coerce(view,fan.sys.Str.$type)))
  {
    view = "table";
  }
  ;
  this.m_curView = view;
  this.m_query.focus();
  this.m_tools.update(fan.sys.ObjUtil.coerce(expr,fan.sys.Str.$type),fan.sys.ObjUtil.coerce(view,fan.sys.Str.$type));
  this.m_result.load(fan.sys.ObjUtil.coerce(view,fan.sys.Str.$type),fan.sys.ObjUtil.coerce(grid,fan.haystack.Grid.$type));
  this.fireSelect();
  this.node().$var("tab").update(view);
  return;
}
fan.uiBuilder.ShellView.prototype.onUpdateNew = function(res)
{
  this.update(fan.sys.Map.fromLiteral(["expr"],[fan.sys.Str.plus(fan.sys.Str.plus("readLink(",res.first().id().toCode()),")")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  return;
}
fan.uiBuilder.ShellView.prototype.onUpdateDup = function(res)
{
  if (fan.sys.ObjUtil.equals(res.size(),1))
  {
    this.update(fan.sys.Map.fromLiteral(["expr"],[fan.sys.Str.plus(fan.sys.Str.plus("readLink(",res.first().id().toCode()),")")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  }
  else
  {
    this.update(fan.sys.Map.fromLiteral(["expr"],[fan.sys.Str.plus(fan.sys.Str.plus("readByIds(",fan.haystack.Etc.toAxon(res.ids())),")")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  }
  ;
  return;
}
fan.uiBuilder.ShellView.prototype.onFeed = function(key,data,res)
{
  this.m_result.feedUpdate(fan.sys.ObjUtil.coerce(res.trap("feed",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Grid.$type));
  return;
}
fan.uiBuilder.ShellView.prototype.onDataErr = function(err)
{
  var expr = (function($this) { var $_u188 = fan.sys.ObjUtil.as($this.$var("expr"),fan.sys.Str.$type); if ($_u188 != null) return $_u188; return ""; })(this);
  var view = "table";
  this.m_query.focus();
  this.m_tools.update(fan.sys.ObjUtil.coerce(expr,fan.sys.Str.$type),view);
  this.m_result.loadErr(err);
  return;
}
fan.uiBuilder.ShellView.prototype.commands = function()
{
  var acc = fan.ui.UiView.prototype.commands.call(this);
  acc.add(fan.sys.ObjUtil.coerce(this.m_session.m_ns.command("customize"),fan.skyarc.CommandDef.$type));
  acc.add(fan.sys.ObjUtil.coerce(this.m_session.m_ns.command("toggleInput"),fan.skyarc.CommandDef.$type));
  acc.add(fan.sys.ObjUtil.coerce(this.m_session.m_ns.command("gotoRecent"),fan.skyarc.CommandDef.$type));
  return acc;
}
fan.uiBuilder.ShellView.prototype.onCommand = function(cmd,event)
{
  if (fan.sys.ObjUtil.equals(cmd.$name(),"customize"))
  {
    this.m_result.togglePrez();
    return true;
  }
  ;
  if (fan.sys.ObjUtil.equals(cmd.$name(),"toggleInput"))
  {
    this.m_query.onInputMode(fan.uiBuilder.ShellInputMode.getCur().toggle());
    return true;
  }
  ;
  if (fan.sys.ObjUtil.equals(cmd.$name(),"gotoRecent"))
  {
    this.m_query.onRecent();
    return true;
  }
  ;
  return fan.ui.UiView.prototype.onCommand.call(this,cmd,event);
}
fan.uiBuilder.ShellView.prototype.openPrez = function()
{
  this.m_result.openPrez();
  return;
}
fan.uiBuilder.ShellView.prototype.focusView = function()
{
  this.m_query.focus();
  return;
}
fan.uiBuilder.ShellView.prototype.queryRebuilt = function(mode)
{
  if (mode.isLine())
  {
    this.m_sashBox.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["29px","44px","100%"]));
  }
  else
  {
    this.m_sashBox.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["190px","44px","100%"]));
  }
  ;
  return;
}
fan.uiBuilder.ShellView.prototype.onAction = function(sel)
{
  var $this = this;
  var rec = sel.first();
  if (rec == null)
  {
    return;
  }
  ;
  var edit = this.actions().find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u136,
    function(a)
    {
      return fan.sys.ObjUtil.equals(a.node().m_action,"recEdit");
    }));
  if (edit != null)
  {
    edit.invoke();
  }
  ;
  return;
}
fan.uiBuilder.ShellView.prototype.sashBox = function()
{
  return this.m_sashBox;
}
fan.uiBuilder.ShellView.prototype.sashBox$ = function(it)
{
  this.m_sashBox = it;
  return;
}
fan.uiBuilder.ShellView.prototype.query = function()
{
  return this.m_query;
}
fan.uiBuilder.ShellView.prototype.query$ = function(it)
{
  this.m_query = it;
  return;
}
fan.uiBuilder.ShellView.prototype.tools = function()
{
  return this.m_tools;
}
fan.uiBuilder.ShellView.prototype.tools$ = function(it)
{
  this.m_tools = it;
  return;
}
fan.uiBuilder.ShellView.prototype.result = function()
{
  return this.m_result;
}
fan.uiBuilder.ShellView.prototype.result$ = function(it)
{
  this.m_result = it;
  return;
}
fan.uiBuilder.ShellView.prototype.curView = function()
{
  return this.m_curView;
}
fan.uiBuilder.ShellView.prototype.curView$ = function(it)
{
  this.m_curView = it;
  return;
}
fan.uiBuilder.ShellView.prototype.m_sashBox = null;
fan.uiBuilder.ShellView.prototype.m_query = null;
fan.uiBuilder.ShellView.prototype.m_tools = null;
fan.uiBuilder.ShellView.prototype.m_result = null;
fan.uiBuilder.ShellView.prototype.m_curView = null;
fan.uiBuilder.ShellToolBar = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.ShellToolBar.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.ShellToolBar.prototype.$typeof = function() { return fan.uiBuilder.ShellToolBar.$type; }
fan.uiBuilder.ShellToolBar.make = function(view) {
  var self = new fan.uiBuilder.ShellToolBar();
  fan.uiBuilder.ShellToolBar.make$(self,view);
  return self;
  }
fan.uiBuilder.ShellToolBar.make$ = function(self,view)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.m_view = view;
  self.m_allViews = fan.sys.ObjUtil.coerce((function($this) { var $_u189 = fan.sys.List.make(fan.sys.Str.$type).addAll(fan.uiBuilder.ShellToolBar.m_baseViews).addAll(fan.sys.ObjUtil.coerce(view.m_session.m_ns.filetypes().findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u178,
    function(f)
    {
      return (f.isText() && !f.isView() && f.hasWriter());
    })).map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u190,
    function(f)
    {
      return f.$name();
    })),fan.sys.Type.find("sys::Str[]"))); if ($_u189 == null) return null; return fan.sys.ObjUtil.toImmutable($_u189); })(self),fan.sys.Type.find("sys::Str[]"));
  self.m_query = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.style().addClass("ui-font-mono");
      it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#555"]));
      it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
      it.style().trap("textOverflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["ellipsis"]));
      it.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["nowrap"]));
      return;
    })),fan.domkit.Label.$type);
  self.m_recNew = view.action("new").button();
  self.m_recEdit = view.action("edit").button();
  self.m_recDup = view.action("dup").button();
  self.m_recTrash = view.action("trash").button();
  self.m_cxMenu = view.action("menu").button();
  self.m_recDup.text$("Dup");
  self.m_cxMenu.firstChild().lastChild().text$("");
  self.m_showMeta = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("meta")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.onShowMeta();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_saveView = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.add(fan.ui.Icon.outline("addView"));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.onSaveView();
          return;
        }));
      it.trap("title",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("saveResultAsView"))]));
      return;
    })),fan.domkit.Button.$type);
  self.m_views = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().addClass("disclosure");
      it.onPopup(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u30,
        function(it)
        {
          return $this.onViewsMenu();
        }));
      return;
    })),fan.domkit.Button.$type);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px 0 4px 0"]));
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%","460px"]));
      fan.sys.ObjUtil.coerce(it.add($this.m_query),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.halign$(fan.domkit.Align.m_right);
          it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px","4px","4px","10px","10px","10px","10px"]));
          fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_recNew),fan.domkit.FlowBox.$type).add($this.m_recEdit),fan.domkit.FlowBox.$type).add($this.m_recDup),fan.domkit.FlowBox.$type).add($this.m_recTrash),fan.domkit.FlowBox.$type).add($this.m_cxMenu),fan.domkit.FlowBox.$type).add($this.m_showMeta),fan.domkit.FlowBox.$type).add($this.m_saveView),fan.domkit.FlowBox.$type).add($this.m_views);
          return;
        })),fan.domkit.FlowBox.$type));
      return;
    })),fan.domkit.SashBox.$type));
  return;
}
fan.uiBuilder.ShellToolBar.prototype.update = function(expr,view)
{
  this.m_query.text$(fan.sys.Str.plus("\u21d2 ",fan.sys.Str.replace(expr,"\n"," \u205e ")));
  this.m_views.text$(this.viewDis(view));
  return;
}
fan.uiBuilder.ShellToolBar.prototype.onShowMeta = function()
{
  var $this = this;
  var grid = (function($this) { var $_u191 = $this.m_view.data(null,false); if ($_u191 != null) return $_u191; return fan.haystack.Etc.makeEmptyGrid(); })(this);
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.ContentDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("meta")));
      it.width$("700px");
      it.height$("400px");
      it.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px"]));
          it.add(fan.ui.GridMeta.make(fan.sys.ObjUtil.coerce(grid,fan.haystack.Grid.$type)));
          return;
        })),fan.domkit.Box.$type));
      it.addButton("ok",null,true);
      return;
    })),fan.ui.ContentDialog.$type).open();
  return;
}
fan.uiBuilder.ShellToolBar.prototype.onSaveView = function()
{
  var $this = this;
  var vname = this.m_view.m_curView;
  if (!fan.uiBuilder.ShellToolBar.m_baseViews.contains(fan.sys.ObjUtil.coerce(vname,fan.sys.Str.$type)))
  {
    vname = "table";
  }
  ;
  var map = this.m_view.node().save();
  var src = fan.sys.StrBuf.make();
  src.add(fan.sys.Str.plus(fan.sys.Str.plus("view: { inherit:",fan.sys.Str.toCode(vname))," }\n"));
  var prez = fan.sys.ObjUtil.as(map.get("presentation"),fan.haystack.Grid.$type);
  if (prez != null)
  {
    src.add("presentation:Trio:\n  var\n  kind:Grid\n  defVal:Zinc:\n");
    fan.sys.Str.splitLines(fan.haystack.ZincWriter.gridToStr(fan.sys.ObjUtil.coerce(prez,fan.haystack.Grid.$type))).each(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u192,
      function(line)
      {
        if (!fan.sys.Str.isEmpty(line))
        {
          src.add("    ").add(line).add("\n");
        }
        ;
        return;
      }));
  }
  ;
  var expr = fan.sys.ObjUtil.coerce((function($this) { var $_u193 = map.get("expr"); if ($_u193 != null) return $_u193; return ""; })(this),fan.sys.Str.$type);
  src.add(fan.sys.Str.plus(fan.sys.Str.plus("data: { expr:",fan.sys.Str.toCode(expr))," }"));
  var stub = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["appName","view","dis","src"],["misc","myView","My View",src.toStr()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  var temp = fan.ui.UiSession.cur().m_ns.template("view");
  var form = fan.ui.TemplateForm.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u194,
    function(it)
    {
      it.m_session = fan.ui.UiSession.cur();
      it.m_rec = stub;
      it.m_templates = fan.sys.ObjUtil.coerce((function($this) { var $_u195 = fan.sys.List.make(fan.skyarc.TemplateDef.$type.toNullable(), [temp]); if ($_u195 == null) return null; return fan.sys.ObjUtil.toImmutable($_u195); })($this),fan.sys.Type.find("skyarc::TemplateDef[]"));
      it.template$(fan.sys.ObjUtil.coerce(temp,fan.skyarc.TemplateDef.$type));
      it.showAdd$(false);
      it.showAdvanced$(false);
      return;
    }));
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(form.dialog(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      var dlg = it;
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("saveView")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          if (fan.sys.ObjUtil.compareNE(key,"ok"))
          {
            return true;
          }
          ;
          try
          {
            var meta = fan.sys.Map.fromLiteral(["templateName"],["view"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
            var rec = form.save();
            var ax = fan.ui.Flash.showActivity(fan.sys.ObjUtil.coerce(dlg.content(),fan.dom.Elem.$type),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("working")),"..."));
            fan.ui.UiSession.cur().m_api.call("recNew",fan.haystack.Etc.makeDictGrid(meta,rec)).onOk(fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u121,
              function(res)
              {
                ax.close();
                dlg.close();
                return;
              })).onErr(fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u161,
              function(err)
              {
                ax.close();
                fan.ui.Flash.showErr(dlg,err);
                return;
              }));
            return false;
          }
          catch ($_u196)
          {
            $_u196 = fan.sys.Err.make($_u196);
            if ($_u196 instanceof fan.sys.Err)
            {
              var err = $_u196;
              var err;
              fan.ui.Flash.showErr(form,err);
              return false;
            }
            else
            {
              throw $_u196;
            }
          }
          ;
        }));
      return;
    })),fan.ui.ContentDialog.$type).open();
  return;
}
fan.uiBuilder.ShellToolBar.prototype.onViewsMenu = function()
{
  var $this = this;
  var menu = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Menu.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u144,
    function(it)
    {
      return;
    })),fan.domkit.Menu.$type);
  this.m_allViews.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u197,
    function(v)
    {
      if (((fan.sys.ObjUtil.equals(v,"text") || fan.sys.ObjUtil.equals(v,"fandoc")) && fan.haystack.Etc.gridToStrVal($this.m_view.data(),null) == null))
      {
        return;
      }
      ;
      menu.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u146,
        function(it)
        {
          it.text$($this.viewDis(v));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u146,
            function(it)
            {
              $this.m_view.update(fan.sys.Map.fromLiteral(["tab"],[v],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
              return;
            }));
          return;
        })),fan.domkit.MenuItem.$type));
      return;
    }));
  return menu;
}
fan.uiBuilder.ShellToolBar.prototype.viewDis = function(v)
{
  return fan.sys.ObjUtil.coerce((function($this) { if (fan.uiBuilder.ShellToolBar.m_baseViews.contains(v)) return fan.sys.Pod.find("ui").locale(v); return $this.m_view.m_session.m_ns.def(fan.sys.Str.plus("filetype:",v)).dis(); })(this),fan.sys.Str.$type);
}
fan.uiBuilder.ShellToolBar.prototype.isValidView = function(viewName)
{
  return this.m_allViews.contains(viewName);
}
fan.uiBuilder.ShellToolBar.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.ShellToolBar.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.query = function()
{
  return this.m_query;
}
fan.uiBuilder.ShellToolBar.prototype.query$ = function(it)
{
  this.m_query = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.recNew = function()
{
  return this.m_recNew;
}
fan.uiBuilder.ShellToolBar.prototype.recNew$ = function(it)
{
  this.m_recNew = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.recEdit = function()
{
  return this.m_recEdit;
}
fan.uiBuilder.ShellToolBar.prototype.recEdit$ = function(it)
{
  this.m_recEdit = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.recDup = function()
{
  return this.m_recDup;
}
fan.uiBuilder.ShellToolBar.prototype.recDup$ = function(it)
{
  this.m_recDup = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.recTrash = function()
{
  return this.m_recTrash;
}
fan.uiBuilder.ShellToolBar.prototype.recTrash$ = function(it)
{
  this.m_recTrash = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.cxMenu = function()
{
  return this.m_cxMenu;
}
fan.uiBuilder.ShellToolBar.prototype.cxMenu$ = function(it)
{
  this.m_cxMenu = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.showMeta = function()
{
  return this.m_showMeta;
}
fan.uiBuilder.ShellToolBar.prototype.showMeta$ = function(it)
{
  this.m_showMeta = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.saveView = function()
{
  return this.m_saveView;
}
fan.uiBuilder.ShellToolBar.prototype.saveView$ = function(it)
{
  this.m_saveView = it;
  return;
}
fan.uiBuilder.ShellToolBar.prototype.views = function()
{
  return this.m_views;
}
fan.uiBuilder.ShellToolBar.prototype.views$ = function(it)
{
  this.m_views = it;
  return;
}
fan.uiBuilder.ShellToolBar.static$init = function()
{
  fan.uiBuilder.ShellToolBar.m_baseViews = fan.sys.ObjUtil.coerce((function($this) { var $_u199 = fan.sys.List.make(fan.sys.Str.$type, ["table","chart","card","text","fandoc"]); if ($_u199 == null) return null; return fan.sys.ObjUtil.toImmutable($_u199); })(this),fan.sys.Type.find("sys::Str[]"));
  return;
}
fan.uiBuilder.ShellToolBar.m_baseViews = null;
fan.uiBuilder.ShellToolBar.prototype.m_allViews = null;
fan.uiBuilder.ShellToolBar.prototype.m_view = null;
fan.uiBuilder.ShellToolBar.prototype.m_query = null;
fan.uiBuilder.ShellToolBar.prototype.m_recNew = null;
fan.uiBuilder.ShellToolBar.prototype.m_recEdit = null;
fan.uiBuilder.ShellToolBar.prototype.m_recDup = null;
fan.uiBuilder.ShellToolBar.prototype.m_recTrash = null;
fan.uiBuilder.ShellToolBar.prototype.m_cxMenu = null;
fan.uiBuilder.ShellToolBar.prototype.m_showMeta = null;
fan.uiBuilder.ShellToolBar.prototype.m_saveView = null;
fan.uiBuilder.ShellToolBar.prototype.m_views = null;
fan.uiBuilder.ShellQueryBar = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.ShellQueryBar.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_mru = fan.ui.Mru.axon();
  this.m_needRelayout = true;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.$typeof = function() { return fan.uiBuilder.ShellQueryBar.$type; }
fan.uiBuilder.ShellQueryBar.make = function(view) {
  var self = new fan.uiBuilder.ShellQueryBar();
  fan.uiBuilder.ShellQueryBar.make$(self,view);
  return self;
  }
fan.uiBuilder.ShellQueryBar.make$ = function(self,view)
{
  fan.domkit.Box.make$(self);
  ;
  self.m_view = view;
  self.rebuild();
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.rebuild = function()
{
  var $this = this;
  var mode = fan.uiBuilder.ShellInputMode.getCur();
  this.m_needRelayout = true;
  this.m_prompt = fan.ui.TextEditor.make(this.m_view.m_session,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u126,
    function(it)
    {
      it.m_lang = fan.ui.TextEditorLang.m_axon;
      it.m_singleLine = mode.isLine();
      it.onArrowUp(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u126,
        function(it)
        {
          $this.onPromptUp();
          return;
        }));
      it.onArrowDown(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u126,
        function(it)
        {
          $this.onPromptDown();
          return;
        }));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u126,
        function(it)
        {
          $this.onEval();
          if (mode.isLine())
          {
            $this.m_prompt.val$("");
          }
          ;
          return;
        }));
      return;
    }));
  var promptBox = fan.sys.ObjUtil.coerce(this.m_prompt,fan.dom.Elem.$type);
  if (mode.isBlock())
  {
    promptBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u23,
      function(it)
      {
        it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
        it.add(fan.sys.ObjUtil.coerce($this.m_prompt,fan.dom.Elem.$type));
        return;
      })),fan.domkit.Box.$type);
  }
  ;
  var toggle = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u31,
    function(it)
    {
      it.add(fan.ui.Icon.color((function($this) { if (mode.isLine()) return "chevronDown"; return "chevronUp"; })($this)));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u31,
        function(it)
        {
          $this.onInputMode(mode.toggle());
          return;
        }));
      return;
    })),fan.domkit.ToggleButton.$type);
  var recent = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.add(fan.ui.Icon.color("recent"));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.onRecent();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  var eval = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("eval")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.onEval();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  this.removeAll();
  this.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%","115px"]));
      fan.sys.ObjUtil.coerce(it.add(promptBox),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.style().trap("paddingLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
          it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px"]));
          fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(toggle),fan.domkit.FlowBox.$type).add(recent),fan.domkit.FlowBox.$type).add(eval);
          return;
        })),fan.domkit.FlowBox.$type));
      return;
    })),fan.domkit.SashBox.$type));
  this.m_view.queryRebuilt(mode);
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.push = function(expr)
{
  if ((fan.sys.ObjUtil.compareGT(fan.sys.Str.size(fan.sys.Str.trim(expr)),0) && fan.sys.ObjUtil.compareNE(expr,"{}")))
  {
    this.m_mru.push(expr);
  }
  ;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.focus = function()
{
  if (this.m_needRelayout)
  {
    this.m_prompt.relayout();
    this.m_needRelayout = false;
  }
  ;
  this.m_prompt.focus();
  this.m_mruIndex = -1;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.onInputMode = function(mode)
{
  mode.setCur();
  this.rebuild();
  this.focus();
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.onEval = function()
{
  var expr = fan.sys.Str.trim(this.m_prompt.val());
  if (fan.sys.ObjUtil.equals(fan.sys.Str.size(expr),0))
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.compareGT(fan.sys.Str.size(expr),0))
  {
    this.m_mru.push(expr);
  }
  ;
  this.m_view.update(fan.sys.Map.fromLiteral(["tab","expr"],["",expr],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.onPromptUp = function()
{
  if (fan.sys.ObjUtil.equals(this.m_mruIndex,fan.sys.Int.minus(this.m_mru.list().size(),1)))
  {
    return;
  }
  ;
  this.m_prompt.val$(this.m_mru.list().get(this.m_mruIndex = fan.sys.Int.increment(this.m_mruIndex)));
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.onPromptDown = function()
{
  if (fan.sys.ObjUtil.compareLE(this.m_mruIndex,0))
  {
    return this.onRecent();
  }
  ;
  this.m_prompt.val$(this.m_mru.list().get(this.m_mruIndex = fan.sys.Int.decrement(this.m_mruIndex)));
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.onRecent = function()
{
  var $this = this;
  var menu = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Menu.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u144,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce($this.m_prompt.size().m_w,fan.sys.Num.$type)),fan.sys.Obj.$type.toNullable())),"px")]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["60%"]));
      it.onClose(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u144,
        function(it)
        {
          $this.m_prompt.focus();
          return;
        }));
      return;
    })),fan.domkit.Menu.$type);
  this.m_mru.list().each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u201,
    function(x)
    {
      menu.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u146,
        function(it)
        {
          it.text$(x);
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u146,
            function(it)
            {
              $this.m_prompt.val$(x);
              return;
            }));
          return;
        })),fan.domkit.MenuItem.$type));
      return;
    }));
  var p = this.m_prompt.pagePos();
  menu.select(fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
  menu.open(p.m_x,fan.sys.Float.plus(p.m_y,this.m_prompt.size().m_h));
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.mru = function()
{
  return this.m_mru;
}
fan.uiBuilder.ShellQueryBar.prototype.mru$ = function(it)
{
  this.m_mru = it;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.mruIndex = function()
{
  return this.m_mruIndex;
}
fan.uiBuilder.ShellQueryBar.prototype.mruIndex$ = function(it)
{
  this.m_mruIndex = it;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.ShellQueryBar.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.needRelayout = function()
{
  return this.m_needRelayout;
}
fan.uiBuilder.ShellQueryBar.prototype.needRelayout$ = function(it)
{
  this.m_needRelayout = it;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.prompt = function()
{
  return this.m_prompt;
}
fan.uiBuilder.ShellQueryBar.prototype.prompt$ = function(it)
{
  this.m_prompt = it;
  return;
}
fan.uiBuilder.ShellQueryBar.prototype.m_mru = null;
fan.uiBuilder.ShellQueryBar.prototype.m_mruIndex = 0;
fan.uiBuilder.ShellQueryBar.prototype.m_view = null;
fan.uiBuilder.ShellQueryBar.prototype.m_needRelayout = false;
fan.uiBuilder.ShellQueryBar.prototype.m_prompt = null;
fan.uiBuilder.ShellInputMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.uiBuilder.ShellInputMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.ShellInputMode.prototype.$typeof = function() { return fan.uiBuilder.ShellInputMode.$type; }
fan.uiBuilder.ShellInputMode.prototype.isLine = function()
{
  return this === fan.uiBuilder.ShellInputMode.m_line;
}
fan.uiBuilder.ShellInputMode.prototype.isBlock = function()
{
  return this === fan.uiBuilder.ShellInputMode.m_block;
}
fan.uiBuilder.ShellInputMode.prototype.toggle = function()
{
  return (function($this) { if ($this.isLine()) return fan.uiBuilder.ShellInputMode.m_block; return fan.uiBuilder.ShellInputMode.m_line; })(this);
}
fan.uiBuilder.ShellInputMode.key = function()
{
  return "ui.shell.inputMode";
}
fan.uiBuilder.ShellInputMode.getCur = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u203 = fan.uiBuilder.ShellInputMode.fromStr(fan.sys.ObjUtil.coerce((function($this) { var $_u204 = fan.sys.ObjUtil.as(fan.dom.Win.cur().localStorage().get(fan.uiBuilder.ShellInputMode.key()),fan.sys.Str.$type); if ($_u204 != null) return $_u204; return ""; })($this),fan.sys.Str.$type),false); if ($_u203 != null) return $_u203; return fan.uiBuilder.ShellInputMode.m_line; })(this),fan.uiBuilder.ShellInputMode.$type);
}
fan.uiBuilder.ShellInputMode.prototype.setCur = function()
{
  fan.dom.Win.cur().localStorage().set(fan.uiBuilder.ShellInputMode.key(),this.$name());
  return;
}
fan.uiBuilder.ShellInputMode.make = function($ordinal,$name) {
  var self = new fan.uiBuilder.ShellInputMode();
  fan.uiBuilder.ShellInputMode.make$(self,$ordinal,$name);
  return self;
  }
fan.uiBuilder.ShellInputMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.uiBuilder.ShellInputMode.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.uiBuilder.ShellInputMode.$type,$name,checked),fan.uiBuilder.ShellInputMode.$type.toNullable());
}
fan.uiBuilder.ShellInputMode.static$init = function()
{
  fan.uiBuilder.ShellInputMode.m_line = fan.uiBuilder.ShellInputMode.make(0,"line");
  fan.uiBuilder.ShellInputMode.m_block = fan.uiBuilder.ShellInputMode.make(1,"block");
  fan.uiBuilder.ShellInputMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u205 = fan.sys.List.make(fan.uiBuilder.ShellInputMode.$type, [fan.uiBuilder.ShellInputMode.m_line,fan.uiBuilder.ShellInputMode.m_block]); if ($_u205 == null) return null; return fan.sys.ObjUtil.toImmutable($_u205); })(this),fan.sys.Type.find("uiBuilder::ShellInputMode[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.uiBuilder.ShellInputMode.m_line = null;
fan.uiBuilder.ShellInputMode.m_block = null;
fan.uiBuilder.ShellInputMode.m_vals = null;
fan.uiBuilder.SiteBuilder = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiBuilder.SiteBuilder.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_checkBinds = fan.sys.List.make(fan.haystack.Dict.$type);
  return;
}
fan.uiBuilder.SiteBuilder.prototype.$typeof = function() { return fan.uiBuilder.SiteBuilder.$type; }
fan.uiBuilder.SiteBuilder.make = function() {
  var self = new fan.uiBuilder.SiteBuilder();
  fan.uiBuilder.SiteBuilder.make$(self);
  return self;
  }
fan.uiBuilder.SiteBuilder.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  ;
  self.m_req = fan.uiBuilder.SbReq.make(self);
  self.m_sbaction = fan.uiBuilder.SbAction.make(self);
  var smeta = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["navSelAnyRec","navIncludeBoundTo","navIncludeTags"],[fan.haystack.Marker.m_val,fan.haystack.Marker.m_val,fan.sys.List.make(fan.sys.Str.$type, ["equip","point"])],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
  var stree = self.m_session.m_pim.navTree("point",smeta);
  var ctree = self.m_session.m_pim.navTree("connLearn",fan.haystack.Etc.emptyDict());
  self.m_siteTree = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTree.make(stree),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u137,
    function(it)
    {
      it.sel().multi$(true);
      it.canDrag$(true);
      it.onVElem(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u206,
        function(v,p)
        {
          $this.makeSiteNode(v,p);
          return;
        }));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u139,
        function(t)
        {
          $this.m_newChild.enabled$(fan.sys.ObjUtil.coerce((fan.sys.ObjUtil.equals(t.sel().size(),1) && fan.sys.ObjUtil.trap(t.sel().item(),"recId",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])) != null && fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.trap(t.sel().item(),"hasChildren",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Bool.$type)),fan.sys.Bool.$type.toNullable()));
          $this.m_bind.enabled$(fan.sys.ObjUtil.coerce($this.canDrop(fan.sys.ObjUtil.coerce($this.m_siteTree.sel().items(),fan.sys.Type.find("pim::PimNode[]?")),fan.sys.ObjUtil.coerce($this.m_connTree.sel().items(),fan.sys.Type.find("pim::PimNode[]?"))),fan.sys.Bool.$type.toNullable()));
          $this.m_infoBox.onUpdate(fan.sys.ObjUtil.coerce(t.sel().items(),fan.sys.Type.find("pim::PimNode[]")));
          $this.setVars(fan.sys.Map.fromLiteral(["selected"],[(function($this) { var $_u207 = fan.sys.ObjUtil.as(t.sel().item(),fan.pim.PimNode.$type); if ($_u207 == null) return null; return $_u207.id(); })($this)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")));
          return;
        }));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u139,
        function(t)
        {
          $this.m_sbaction.edit(fan.sys.ObjUtil.coerce(t.sel().items(),fan.sys.Type.find("pim::PimNode[]")));
          return;
        }));
      it.onCanDrop(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u208,
        function(t,d)
        {
          return $this.canDrop(fan.sys.List.make(fan.pim.PimNode.$type, [t]),fan.sys.ObjUtil.coerce(d,fan.sys.Type.find("pim::PimNode[]?")));
        }));
      it.onDrop(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u209,
        function(target,nodes)
        {
          if (nodes.any(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u210,
            function(n)
            {
              return fan.sys.ObjUtil.equals(n.tree(),ctree);
            })))
          {
            $this.m_sbaction.bind(target,nodes);
          }
          else
          {
            $this.m_sbaction.move(target,nodes);
          }
          ;
          return;
        }),fan.sys.Type.find("|pim::PimNode,sys::Obj->sys::Void|")));
      it.onRebuildAll(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u139,
        function(t)
        {
          $this.m_infoBox.onUpdate(fan.sys.ObjUtil.coerce(t.sel().items(),fan.sys.Type.find("pim::PimNode[]")));
          if (($this.m_primeSearch && fan.sys.ObjUtil.compareGT(fan.sys.Str.size($this.m_search.val()),0)))
          {
            $this.m_primeSearch = false;
            $this.m_siteTree.search($this.m_search.val());
          }
          ;
          return;
        }));
      return;
    })),fan.ui.UiPimTree.$type);
  self.m_infoBox = fan.uiBuilder.SbInfoBox.make(self);
  self.m_connTree = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.UiPimTree.make(ctree),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u137,
    function(it)
    {
      it.disableNetworkReload$(true);
      it.sel().multi$(true);
      it.canDrag$(true);
      it.onVElem(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u206,
        function(v,p)
        {
          $this.makeConnNode(v,p);
          return;
        }));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u139,
        function(t)
        {
          $this.m_bind.enabled$(fan.sys.ObjUtil.coerce($this.canDrop(fan.sys.ObjUtil.coerce($this.m_siteTree.sel().items(),fan.sys.Type.find("pim::PimNode[]?")),fan.sys.ObjUtil.coerce($this.m_connTree.sel().items(),fan.sys.Type.find("pim::PimNode[]?"))),fan.sys.Bool.$type.toNullable()));
          $this.m_info.enabled$(fan.sys.ObjUtil.coerce((fan.sys.ObjUtil.equals(t.sel().size(),1) && fan.sys.ObjUtil.as(t.sel().item(),fan.pim.PimNode.$type).meta().has("learn")),fan.sys.Bool.$type.toNullable()));
          return;
        }));
      return;
    })),fan.ui.UiPimTree.$type);
  var siteActions = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u101,
    function(it)
    {
      it.flex$(fan.sys.List.make(fan.sys.Str.$type, ["0 0 auto","0 0 auto","1 1 auto","0 0 auto"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
          it.text$(fan.sys.ObjUtil.coerce(fan.ui.UiSession.cur().m_pim.siteBuilderRoot().dis(),fan.sys.Str.$type));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              $this.m_sbaction.newRoot();
              return;
            }));
          return;
        })),fan.domkit.Button.$type)),fan.domkit.FlexBox.$type).add((function($this) { var $_u211 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
          it.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("new"))," "),fan.sys.Pod.find("ui").locale("child")));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              $this.m_sbaction.newChild(fan.sys.ObjUtil.coerce($this.m_siteTree.sel().item(),fan.pim.PimNode.$type));
              return;
            }));
          return;
        })),fan.domkit.Button.$type); $this.m_newChild = $_u211; return $_u211; })($this)),fan.domkit.FlexBox.$type).add((function($this) { var $_u212 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u7,
        function(it)
        {
          it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.placeholder$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("search")),"..."));
          it.onEvent("keydown",false,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u44,
            function(e)
            {
              if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_tab))
              {
                fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
                  fan.uiBuilder.$clos$_u45,
                  function(it)
                  {
                    $this.m_siteTree.sel().clear();
                    $this.m_siteTree.focus();
                    return;
                  }));
              }
              ;
              return;
            }));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u32,
            function(t)
            {
              $this.m_siteTree.search($this.m_search.val());
              return;
            }));
          return;
        })),fan.domkit.TextField.$type); $this.m_search = $_u212; return $_u212; })($this)),fan.domkit.FlexBox.$type).add((function($this) { var $_u213 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.trap("title",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("toggleConns"))]));
          it.add(fan.ui.Icon.outline("sbToggleConn"));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              $this.onToggleConns();
              return;
            }));
          return;
        })),fan.domkit.Button.$type); $this.m_toggleConns = $_u213; return $_u213; })($this));
      return;
    })),fan.domkit.FlexBox.$type);
  var connActions = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.halign$(fan.domkit.Align.m_right);
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px"]));
      fan.sys.ObjUtil.coerce(it.add((function($this) { var $_u214 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("bind")));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              $this.m_sbaction.bind(fan.sys.ObjUtil.coerce($this.m_siteTree.sel().item(),fan.pim.PimNode.$type),fan.sys.ObjUtil.coerce($this.m_connTree.sel().items(),fan.sys.Type.find("pim::PimNode[]")));
              return;
            }));
          return;
        })),fan.domkit.Button.$type); $this.m_bind = $_u214; return $_u214; })($this)),fan.domkit.FlowBox.$type).add((function($this) { var $_u215 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("info")));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u216,
            function(b)
            {
              var n = fan.sys.ObjUtil.as($this.m_connTree.sel().item(),fan.pim.PimNode.$type);
              var r = n.meta().get("learn");
              var g = fan.haystack.Etc.makeDictGrid(null,fan.sys.ObjUtil.coerce(r,fan.haystack.Dict.$type));
              var x = fan.sys.Float.plus(b.pagePos().m_x,b.size().m_w);
              var y = fan.sys.Float.plus(b.pagePos().m_y,b.size().m_h);
              fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.DictPopup.make(fan.ui.UiSession.cur(),g,fan.sys.ObjUtil.coerce(r,fan.haystack.Dict.$type)),fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u217,
                function(it)
                {
                  it.halign$(fan.domkit.Align.m_right);
                  return;
                })),fan.ui.DictPopup.$type).open(x,y);
              return;
            }));
          return;
        })),fan.domkit.Button.$type); $this.m_info = $_u215; return $_u215; })($this));
      return;
    })),fan.domkit.FlowBox.$type);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["32%","10px","36%","10px","32%"]));
      it.resizable$(true);
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          it.dir$(fan.domkit.Dir.m_down);
          it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["24px","10px","100%"]));
          fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(siteActions),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u23,
            function(it)
            {
              return;
            })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add($this.m_siteTree);
          return;
        })),fan.domkit.SashBox.$type)),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add($this.m_infoBox),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          it.dir$(fan.domkit.Dir.m_down);
          it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
          fan.sys.ObjUtil.coerce(it.add(connActions),fan.domkit.SashBox.$type).add($this.m_connTree);
          return;
        })),fan.domkit.SashBox.$type));
      return;
    })),fan.domkit.SashBox.$type));
  if (fan.sys.ObjUtil.equals(self.getViewPref("showConns"),"false"))
  {
    self.onToggleConns();
  }
  ;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.sel = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(this.m_siteTree.sel().items().map(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u218,
    function(n)
    {
      return fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["id"],[n.recId()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Ref?")));
    }),fan.sys.Type.find("|sys::Obj,sys::Int->sys::Obj?|"))),fan.sys.Type.find("haystack::Dict[]"));
}
fan.uiBuilder.SiteBuilder.prototype.onUpdate = function()
{
  var $this = this;
  var sel = fan.sys.ObjUtil.as(this.$var("selected"),fan.haystack.Ref.$type);
  if ((sel != null && fan.sys.ObjUtil.equals(this.m_siteTree.sel().size(),0)))
  {
    this.m_siteTree.expandTo(fan.sys.ObjUtil.coerce(sel,fan.sys.Obj.$type));
  }
  else
  {
    this.m_primeSearch = fan.sys.ObjUtil.compareGT(fan.sys.Str.size(this.m_search.val()),0);
    this.m_siteTree.rebuildAll();
    if (fan.sys.ObjUtil.compareGT(this.checkBinds().size(),0))
    {
      var recs = this.checkBinds().findAll(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u77,
        function(r)
        {
          return r.get("id") != null;
        }));
      fan.uiBuilder.SbUpdater.checkBinds(recs,this.m_connTree);
      this.checkBinds().clear();
      this.m_connTree.rebuildAll();
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.makeSiteNode = function(v,node)
{
  var $this = this;
  var icon = fan.ui.Icon.outline(node.icon(),fan.ui.Colors.m_green);
  v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("img"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u219,
    function(it)
    {
      it.attrs().set("class","def");
      it.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[icon.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))]));
      return;
    })),fan.vdom.VElem.$type));
  v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("span"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u219,
    function(it)
    {
      it.attrs().set("class","def");
      it.text$(node.dis());
      return;
    })),fan.vdom.VElem.$type));
  if (node.recId() == null)
  {
    v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("div"),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u219,
      function(it)
      {
        it.attrs().set("class","sb-aux group");
        it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("grouping")));
        return;
      })),fan.vdom.VElem.$type));
  }
  ;
  var boundTo = fan.sys.ObjUtil.as(node.meta().get("boundTo"),fan.haystack.Ref.$type);
  if (boundTo != null)
  {
    v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("div"),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u219,
      function(it)
      {
        it.attrs().set("class","sb-aux conn");
        it.text$(boundTo.dis());
        return;
      })),fan.vdom.VElem.$type));
  }
  else
  {
    if (node.meta().has("point"))
    {
      v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("div"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u219,
        function(it)
        {
          it.attrs().set("class","sb-aux");
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("unbound")));
          return;
        })),fan.vdom.VElem.$type));
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.makeConnNode = function(v,node)
{
  var $this = this;
  if (!fan.sys.ObjUtil.is(node.stash(),fan.haystack.Dict.$type))
  {
    node.stash$(node.meta());
  }
  ;
  var icon = fan.ui.Icon.outline(node.icon(),fan.ui.Colors.m_purple);
  v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("img"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u219,
    function(it)
    {
      it.attrs().set("class","def");
      it.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[icon.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))]));
      return;
    })),fan.vdom.VElem.$type));
  v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("span"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u219,
    function(it)
    {
      it.attrs().set("class","def");
      it.text$(node.dis());
      return;
    })),fan.vdom.VElem.$type));
  if (!node.hasChildren())
  {
    var overrides = fan.sys.ObjUtil.as(node.stash(),fan.haystack.Dict.$type);
    var pointRef = fan.sys.ObjUtil.as(overrides.get("boundTo"),fan.haystack.Ref.$type);
    if (pointRef == null)
    {
      v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("div"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u219,
        function(it)
        {
          it.attrs().set("class","sb-aux");
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("unbound")));
          return;
        })),fan.vdom.VElem.$type));
    }
    else
    {
      v.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.vdom.VElem.make("div"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u219,
        function(it)
        {
          it.attrs().set("class","sb-aux conn");
          it.text$(pointRef.dis());
          return;
        })),fan.vdom.VElem.$type));
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.canDrop = function(targets,sources)
{
  var $this = this;
  if ((sources == null || sources.isEmpty()))
  {
    return false;
  }
  ;
  if ((targets == null || targets.isEmpty()))
  {
    return false;
  }
  ;
  if (targets.all(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return n.recId() == null;
    })))
  {
    return false;
  }
  ;
  var isBind = fan.sys.ObjUtil.equals(sources.first().tree(),this.m_connTree.pimTree());
  if (isBind)
  {
    if (fan.sys.ObjUtil.compareNE(targets.size(),1))
    {
      return false;
    }
    ;
    var m = targets.first().meta();
    if ((m.missing("equip") && m.missing("point")))
    {
      return false;
    }
    ;
    if ((fan.sys.ObjUtil.compareGT(this.m_connTree.sel().size(),1) && m.missing("equip")))
    {
      return false;
    }
    ;
    return this.m_connTree.sel().items().any(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u220,
      function(n)
      {
        return fan.sys.ObjUtil.coerce(n,fan.pim.PimNode.$type).selectable();
      }));
  }
  else
  {
    return true;
  }
  ;
}
fan.uiBuilder.SiteBuilder.prototype.onToggleConns = function()
{
  var sash = fan.sys.ObjUtil.coerce(this.firstChild(),fan.domkit.SashBox.$type);
  var showConns = fan.sys.ObjUtil.equals(sash.sizes().last(),"0px");
  this.setViewPref("showConns",fan.sys.Bool.toStr(showConns));
  sash.sizes$((function($this) { if (showConns) return fan.sys.List.make(fan.sys.Str.$type, ["32%","10px","36%","10px","32%"]); return fan.sys.List.make(fan.sys.Str.$type, ["40%","10px","60%","0px","0px"]); })(this));
  return;
}
fan.uiBuilder.SiteBuilder.prototype.req = function()
{
  return this.m_req;
}
fan.uiBuilder.SiteBuilder.prototype.req$ = function(it)
{
  this.m_req = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.sbaction = function()
{
  return this.m_sbaction;
}
fan.uiBuilder.SiteBuilder.prototype.sbaction$ = function(it)
{
  this.m_sbaction = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.checkBinds = function()
{
  return this.m_checkBinds;
}
fan.uiBuilder.SiteBuilder.prototype.checkBinds$ = function(it)
{
  this.m_checkBinds = it.rw();
  return;
}
fan.uiBuilder.SiteBuilder.prototype.siteTree = function()
{
  return this.m_siteTree;
}
fan.uiBuilder.SiteBuilder.prototype.siteTree$ = function(it)
{
  this.m_siteTree = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.infoBox = function()
{
  return this.m_infoBox;
}
fan.uiBuilder.SiteBuilder.prototype.infoBox$ = function(it)
{
  this.m_infoBox = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.connTree = function()
{
  return this.m_connTree;
}
fan.uiBuilder.SiteBuilder.prototype.connTree$ = function(it)
{
  this.m_connTree = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.newChild = function()
{
  return this.m_newChild;
}
fan.uiBuilder.SiteBuilder.prototype.newChild$ = function(it)
{
  this.m_newChild = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.search = function()
{
  return this.m_search;
}
fan.uiBuilder.SiteBuilder.prototype.search$ = function(it)
{
  this.m_search = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.primeSearch = function()
{
  return this.m_primeSearch;
}
fan.uiBuilder.SiteBuilder.prototype.primeSearch$ = function(it)
{
  this.m_primeSearch = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.bind = function()
{
  return this.m_bind;
}
fan.uiBuilder.SiteBuilder.prototype.bind$ = function(it)
{
  this.m_bind = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.info = function()
{
  return this.m_info;
}
fan.uiBuilder.SiteBuilder.prototype.info$ = function(it)
{
  this.m_info = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.toggleConns = function()
{
  return this.m_toggleConns;
}
fan.uiBuilder.SiteBuilder.prototype.toggleConns$ = function(it)
{
  this.m_toggleConns = it;
  return;
}
fan.uiBuilder.SiteBuilder.prototype.m_req = null;
fan.uiBuilder.SiteBuilder.prototype.m_sbaction = null;
fan.uiBuilder.SiteBuilder.prototype.m_checkBinds = null;
fan.uiBuilder.SiteBuilder.prototype.m_siteTree = null;
fan.uiBuilder.SiteBuilder.prototype.m_infoBox = null;
fan.uiBuilder.SiteBuilder.prototype.m_connTree = null;
fan.uiBuilder.SiteBuilder.prototype.m_newChild = null;
fan.uiBuilder.SiteBuilder.prototype.m_search = null;
fan.uiBuilder.SiteBuilder.prototype.m_primeSearch = false;
fan.uiBuilder.SiteBuilder.prototype.m_bind = null;
fan.uiBuilder.SiteBuilder.prototype.m_info = null;
fan.uiBuilder.SiteBuilder.prototype.m_toggleConns = null;
fan.uiBuilder.SbUpdater = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.SbUpdater.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.SbUpdater.prototype.$typeof = function() { return fan.uiBuilder.SbUpdater.$type; }
fan.uiBuilder.SbUpdater.checkBinds = function(recs,connTree)
{
  var $this = this;
  var map = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("haystack::Ref"),fan.sys.Type.find("haystack::Dict")).setList(recs,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u222,
    function(r)
    {
      return r.id();
    }));
  connTree.pimTree().roots().each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u223,
    function(n)
    {
      fan.uiBuilder.SbUpdater.checkNode(n,map);
      return;
    }));
  return;
}
fan.uiBuilder.SbUpdater.checkNode = function(node,map)
{
  var $this = this;
  if (!node.hasChildren())
  {
    fan.uiBuilder.SbUpdater.checkNodeBinds(node,map);
  }
  ;
  if (node.isLoaded())
  {
    node.children().each(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u224,
      function(k)
      {
        fan.uiBuilder.SbUpdater.checkNode(k,map);
        return;
      }));
  }
  ;
  return;
}
fan.uiBuilder.SbUpdater.checkNodeBinds = function(node,map)
{
  var $this = this;
  if (!fan.uiBuilder.SbUpdater.isBindValid(node,map))
  {
    node.stash$(fan.haystack.Etc.dictRemove(fan.sys.ObjUtil.coerce(node.stash(),fan.haystack.Dict.$type),"boundTo"));
  }
  ;
  var rec = map.vals().find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      return fan.uiBuilder.SbUpdater.isRecBound(r,node);
    }));
  if (rec != null)
  {
    node.stash$(fan.haystack.Etc.dictSet(fan.sys.ObjUtil.coerce(node.stash(),fan.haystack.Dict.$type.toNullable()),"boundTo",rec.id()));
  }
  ;
  return;
}
fan.uiBuilder.SbUpdater.isBindValid = function(node,map)
{
  var stash = fan.sys.ObjUtil.as(node.stash(),fan.haystack.Dict.$type);
  var bind = fan.sys.ObjUtil.as(stash.get("boundTo"),fan.haystack.Ref.$type);
  if (bind == null)
  {
    return true;
  }
  ;
  var rec = map.get(fan.sys.ObjUtil.coerce(bind,fan.haystack.Ref.$type));
  if (rec == null)
  {
    return true;
  }
  ;
  return fan.uiBuilder.SbUpdater.isRecBound(fan.sys.ObjUtil.coerce(rec,fan.haystack.Dict.$type),node);
}
fan.uiBuilder.SbUpdater.isRecBound = function(rec,node)
{
  if (rec.has("trash"))
  {
    return false;
  }
  ;
  var conn = fan.ui.UiSession.cur().m_pim.conns().byPoint(rec,false);
  if (conn == null)
  {
    return false;
  }
  ;
  var connRef = fan.sys.ObjUtil.as(node.navRefGrouping().get("connRef"),fan.haystack.Ref.$type);
  if (fan.sys.ObjUtil.compareNE(rec.get(conn.m_connRefTag),connRef))
  {
    return false;
  }
  ;
  var stash = fan.sys.ObjUtil.as(node.stash(),fan.haystack.Dict.$type);
  var learn = fan.sys.ObjUtil.as(stash.get("learn"),fan.haystack.Dict.$type);
  if ((conn.m_curTag != null && rec.has(fan.sys.ObjUtil.coerce(conn.m_curTag,fan.sys.Str.$type))))
  {
    return fan.sys.ObjUtil.equals(rec.get(fan.sys.ObjUtil.coerce(conn.m_curTag,fan.sys.Str.$type)),learn.get(fan.sys.ObjUtil.coerce(conn.m_curTag,fan.sys.Str.$type)));
  }
  ;
  if ((conn.m_writeTag != null && rec.has(fan.sys.ObjUtil.coerce(conn.m_writeTag,fan.sys.Str.$type))))
  {
    return fan.sys.ObjUtil.equals(rec.get(fan.sys.ObjUtil.coerce(conn.m_writeTag,fan.sys.Str.$type)),learn.get(fan.sys.ObjUtil.coerce(conn.m_writeTag,fan.sys.Str.$type)));
  }
  ;
  if ((conn.m_hisTag != null && rec.has(fan.sys.ObjUtil.coerce(conn.m_hisTag,fan.sys.Str.$type))))
  {
    return fan.sys.ObjUtil.equals(rec.get(fan.sys.ObjUtil.coerce(conn.m_hisTag,fan.sys.Str.$type)),learn.get(fan.sys.ObjUtil.coerce(conn.m_hisTag,fan.sys.Str.$type)));
  }
  ;
  return false;
}
fan.uiBuilder.SbUpdater.make = function() {
  var self = new fan.uiBuilder.SbUpdater();
  fan.uiBuilder.SbUpdater.make$(self);
  return self;
  }
fan.uiBuilder.SbUpdater.make$ = function(self)
{
  return;
}
fan.uiBuilder.SbReq = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.SbReq.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.SbReq.prototype.$typeof = function() { return fan.uiBuilder.SbReq.$type; }
fan.uiBuilder.SbReq.make = function(view) {
  var self = new fan.uiBuilder.SbReq();
  fan.uiBuilder.SbReq.make$(self,view);
  return self;
  }
fan.uiBuilder.SbReq.make$ = function(self,view)
{
  self.m_view = view;
  return;
}
fan.uiBuilder.SbReq.prototype.loadRec = function(node,callback)
{
  var $this = this;
  this.loadRecs(fan.sys.List.make(fan.pim.PimNode.$type, [node]),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u59,
    function(recs)
    {
      callback.call(fan.sys.ObjUtil.coerce(recs.first(),fan.haystack.Dict.$type));
      return;
    }));
  return;
}
fan.uiBuilder.SbReq.prototype.loadRecs = function(nodes,callback)
{
  var $this = this;
  var r = nodes.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u225,
    function(n)
    {
      return n.recId();
    }));
  var a = fan.haystack.Etc.toAxon(r);
  var f = fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus("readByIds(",a),")"));
  f.onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      callback.call(g.toRows());
      return;
    }));
  return;
}
fan.uiBuilder.SbReq.prototype.moveRecs = function(parent,nodes)
{
  var $this = this;
  var refs = nodes.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u225,
    function(n)
    {
      return n.recId();
    }));
  this.doReq("move",fan.sys.List.make(fan.sys.Obj.$type.toNullable(), [refs,parent.recId()]));
  return;
}
fan.uiBuilder.SbReq.prototype.dupRecs = function(nodes,cascade,count)
{
  var $this = this;
  var refs = nodes.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u225,
    function(n)
    {
      return n.recId();
    }));
  this.doReq("dup",fan.sys.List.make(fan.sys.Obj.$type.toNullable(), [refs,fan.sys.ObjUtil.coerce(cascade,fan.sys.Obj.$type.toNullable()),fan.haystack.Number.makeInt(count)]));
  return;
}
fan.uiBuilder.SbReq.prototype.trashRecs = function(nodes,cascade)
{
  var $this = this;
  var refs = nodes.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u225,
    function(n)
    {
      return n.recId();
    }));
  this.doReq("trash",fan.sys.List.make(fan.sys.Obj.$type, [refs,fan.sys.ObjUtil.coerce(cascade,fan.sys.Obj.$type)]),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u150,
    function()
    {
      $this.m_view.m_siteTree.sel().clear();
      return;
    }));
  return;
}
fan.uiBuilder.SbReq.prototype.batchBind = function(parent,binds,func)
{
  var $this = this;
  var dicts = fan.sys.ObjUtil.coerce(binds.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u226,
    function(b)
    {
      return fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["source","target","navName","cur","write","his"],[fan.ui.UiSession.cur().m_pim.conns().nodeToConnBind(b.m_source),(function($this) { var $_u227 = b.m_target; if ($_u227 == null) return null; return $_u227.recId(); })($this),b.m_$name,fan.sys.ObjUtil.coerce(b.m_curVal,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(b.m_writeVal,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(b.m_hisVal,fan.sys.Obj.$type.toNullable())],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")));
    })),fan.sys.Type.find("haystack::Dict[]"));
  this.doReq("batchBind",fan.sys.List.make(fan.sys.Obj.$type.toNullable(), [parent.recId(),dicts]),func);
  return;
}
fan.uiBuilder.SbReq.prototype.unbind = function(nodes)
{
  var $this = this;
  var refs = nodes.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u225,
    function(n)
    {
      return n.recId();
    }));
  this.doReq("unbind",fan.sys.List.make(fan.sys.Type.find("sys::Obj?[]"), [refs]));
  return;
}
fan.uiBuilder.SbReq.prototype.commit = function(recs)
{
  this.doReq("commit",fan.sys.List.make(fan.sys.Type.find("haystack::Dict[]"), [recs]));
  return;
}
fan.uiBuilder.SbReq.prototype.doReq = function(cmd,args,callback)
{
  if (callback === undefined) callback = null;
  var $this = this;
  var flash = fan.ui.Flash.showActivity(this.m_view,fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("working")),"..."));
  var req = fan.haystack.Etc.makeDict2("cmd",cmd,"args",args);
  fan.ui.UiSession.cur().m_api.call("sbInvoke",fan.haystack.Etc.makeDictGrid(null,req)).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      (function($this) { var $_u228 = callback; if ($_u228 == null) return null; return $_u228.call(); })($this);
      $this.m_view.checkBinds$(g.toRows());
      $this.m_view.update();
      return;
    })).onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      flash.close();
      return;
    }));
  return;
}
fan.uiBuilder.SbReq.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.SbReq.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.SbReq.prototype.m_view = null;
fan.uiBuilder.SbBatchBind = fan.sys.Obj.$extend(fan.ui.ContentDialog);
fan.uiBuilder.SbBatchBind.prototype.$ctor = function()
{
  fan.ui.ContentDialog.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_actions = fan.sys.List.make(fan.domkit.ListButton.$type);
  this.m_names = fan.sys.List.make(fan.domkit.TextField.$type);
  this.m_curChecks = fan.sys.List.make(fan.domkit.Checkbox.$type);
  this.m_wrtChecks = fan.sys.List.make(fan.domkit.Checkbox.$type);
  this.m_hisChecks = fan.sys.List.make(fan.domkit.Checkbox.$type);
  return;
}
fan.uiBuilder.SbBatchBind.prototype.$typeof = function() { return fan.uiBuilder.SbBatchBind.$type; }
fan.uiBuilder.SbBatchBind.make = function(view,target,sources) {
  var self = new fan.uiBuilder.SbBatchBind();
  fan.uiBuilder.SbBatchBind.make$(self,view,target,sources);
  return self;
  }
fan.uiBuilder.SbBatchBind.make$ = function(self,view,target,sources)
{
  var $this = self;
  fan.ui.ContentDialog.make$(self);
  ;
  var prefh = fan.sys.Int.min(300,fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.dom.Win.cur().viewport().m_h,fan.sys.Num.$type)),120));
  self.m_view = view;
  self.m_target = target;
  self.title$(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.icon$(fan.ui.Icon.outline(target.icon(),fan.ui.Colors.m_darkGreen));
      it.label$(target.dis());
      return;
    })));
  self.width$("960px");
  self.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(self.makeTable(target,sources),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      it.style().trap("minHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(prefh,fan.sys.Obj.$type.toNullable())),"px")]));
      return;
    })),fan.dom.Elem.$type));
  self.addButton("ok",fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("bind")),true);
  self.addButton("cancel");
  self.onAction(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u37,
    function(key)
    {
      if (fan.sys.ObjUtil.equals(key,"cancel"))
      {
        return true;
      }
      ;
      $this.onCommit();
      return false;
    }));
  return;
}
fan.uiBuilder.SbBatchBind.prototype.makeTable = function(target,sources)
{
  var $this = this;
  var tbody = fan.dom.Elem.make("tbody");
  var table = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("table"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      it.style().addClass("uiBuilder-SbBindDialog-table");
      it.add(tbody);
      return;
    })),fan.dom.Elem.$type);
  tbody.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("tr"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("th"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("action")));
          return;
        })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("th"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("name")));
          return;
        })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("th"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.text$("Cur");
          return;
        })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("th"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.text$("Write");
          return;
        })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("th"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.text$("His");
          return;
        })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("th"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("bindTo")));
          return;
        })),fan.dom.Elem.$type));
      return;
    })),fan.dom.Elem.$type));
  var pimConns = fan.ui.UiSession.cur().m_pim.conns();
  var points = target.children().findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u57,
    function(r)
    {
      return r.meta().has("point");
    }));
  sources.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u223,
    function(n)
    {
      var conn = n;
      while (conn.parent().parent() != null)
      {
        conn = fan.sys.ObjUtil.coerce(conn.parent(),fan.pim.PimNode.$type);
      }
      ;
      var bound = fan.sys.ObjUtil.as(fan.sys.ObjUtil.as(n.stash(),fan.haystack.Dict.$type).get("boundTo"),fan.haystack.Ref.$type);
      var label = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
          it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#999"]));
          it.style().trap("maxWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["200px"]));
          it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
          it.style().trap("textOverflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["ellipsis"]));
          it.text$((function($this) { if (bound == null) return ""; return bound.dis(); })($this));
          return;
        })),fan.domkit.Label.$type);
      var $name = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u7,
        function(it)
        {
          it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["200px"]));
          it.val$(n.dis());
          return;
        })),fan.domkit.TextField.$type);
      $this.m_names.add($name);
      var canCur = pimConns.nodeHasCur(n);
      var canWrt = pimConns.nodeHasWrite(n);
      var canHis = pimConns.nodeHasHis(n);
      var cur = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Checkbox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u111,
        function(it)
        {
          it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 4px"]));
          it.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (canCur) return null; return "0"; })($this)]));
          it.checked$(canCur);
          return;
        })),fan.domkit.Checkbox.$type);
      var wrt = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Checkbox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u111,
        function(it)
        {
          it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 4px"]));
          it.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (canWrt) return null; return "0"; })($this)]));
          it.checked$(canWrt);
          return;
        })),fan.domkit.Checkbox.$type);
      var his = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Checkbox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u111,
        function(it)
        {
          it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 4px"]));
          it.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (canHis) return null; return "0"; })($this)]));
          it.checked$(canHis);
          return;
        })),fan.domkit.Checkbox.$type);
      $this.m_curChecks.add(cur);
      $this.m_wrtChecks.add(wrt);
      $this.m_hisChecks.add(his);
      var action = $this.makeAction(n,points);
      $this.m_actions.add(action);
      action.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u233,
        function(b)
        {
          var x = fan.sys.ObjUtil.equals(b.sel().index(),1);
          var y = fan.sys.ObjUtil.compareNE(b.sel().index(),0);
          $name.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (x) return null; return "0"; })($this)]));
          cur.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if ((y && canCur)) return null; return "0"; })($this)]));
          wrt.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if ((y && canWrt)) return null; return "0"; })($this)]));
          his.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if ((y && canHis)) return null; return "0"; })($this)]));
          return;
        }));
      if (fan.sys.ObjUtil.equals(action.sel().index(),0))
      {
        $name.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
        label.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["inline-block"]));
      }
      ;
      if (fan.sys.ObjUtil.compareNE(action.sel().index(),1))
      {
        $name.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
        cur.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
        wrt.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
        his.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
      }
      ;
      tbody.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("tr"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("td"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.add(action);
              return;
            })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("td"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.add($name).add(label);
              return;
            })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("td"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.add(cur);
              return;
            })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("td"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.add(wrt);
              return;
            })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("td"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.add(his);
              return;
            })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("td"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
              it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u29,
                function(it)
                {
                  it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
                  it.icon$(fan.ui.Icon.outline("conn",fan.ui.Colors.m_purple));
                  it.label$(conn.dis());
                  return;
                }))).add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u29,
                function(it)
                {
                  it.icon$(fan.ui.Icon.outline("point",fan.ui.Colors.m_purple));
                  it.label$(n.dis());
                  return;
                })));
              return;
            })),fan.dom.Elem.$type));
          return;
        })),fan.dom.Elem.$type));
      return;
    }));
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      it.style().addClass("domkit-border-top domkit-border-bottom");
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("overflowX",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      it.style().trap("overflowY",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.style().trap("marginTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
      it.add(table);
      return;
    })),fan.dom.Elem.$type);
}
fan.uiBuilder.SbBatchBind.prototype.makeAction = function(conn,existingPoints)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ListButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u11,
    function(it)
    {
      var stash = fan.sys.ObjUtil.as(conn.stash(),fan.haystack.Dict.$type);
      var bound = fan.sys.ObjUtil.as(stash.get("boundTo"),fan.haystack.Ref.$type);
      var avail = existingPoints.findAll(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u210,
        function(n)
        {
          return n.meta().get("boundTo") == null;
        }));
      it.setProp("conn",conn);
      it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["160px"]));
      it.items$(fan.sys.List.make(fan.sys.Obj.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type)]).addAll(avail));
      it.sel().index$(fan.sys.ObjUtil.coerce((function($this) { if (bound == null) return 1; return 0; })($this),fan.sys.Int.$type.toNullable()));
      if (bound != null)
      {
        it.enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
      }
      ;
      it.onElem(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u129,
        function(item)
        {
          if (fan.sys.ObjUtil.equals(item,0))
          {
            return fan.ui.UiLabel.make(fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u29,
              function(it)
              {
                it.icon$(fan.ui.Icon.outline("ban",fan.ui.Colors.m_darkSilver));
                it.label$("No action");
                return;
              }));
          }
          ;
          if (fan.sys.ObjUtil.equals(item,1))
          {
            return fan.ui.UiLabel.make(fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u29,
              function(it)
              {
                it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.ui.Colors.m_darkGreen]));
                it.icon$(fan.ui.Icon.outline("add",fan.ui.Colors.m_darkGreen));
                it.label$("New point");
                return;
              }));
          }
          ;
          return fan.ui.UiLabel.make(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u29,
            function(it)
            {
              it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.ui.Colors.m_blue]));
              it.icon$(fan.ui.Icon.outline("arrowRight",fan.ui.Colors.m_blue));
              it.label$(fan.sys.ObjUtil.coerce(item,fan.pim.PimNode.$type).dis());
              return;
            }));
        }));
      return;
    })),fan.domkit.ListButton.$type);
}
fan.uiBuilder.SbBatchBind.prototype.onCommit = function()
{
  var $this = this;
  var binds = fan.sys.List.make(fan.uiBuilder.SbBindInfo.$type);
  this.m_actions.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u239,
    function(b,i)
    {
      var conn = fan.sys.ObjUtil.coerce(b.prop("conn"),fan.pim.PimNode.$type);
      var opt = b.sel().item();
      if (fan.sys.ObjUtil.equals(opt,0))
      {
        return;
      }
      ;
      var $name = fan.sys.Str.trim($this.m_names.get(i).val());
      if (fan.sys.Str.isEmpty($name))
      {
        $name = conn.dis();
      }
      ;
      binds.add(fan.uiBuilder.SbBindInfo.make(conn,fan.sys.ObjUtil.as(opt,fan.pim.PimNode.$type),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u240,
        function(it)
        {
          it.m_$name = $name;
          it.m_kind = "Number";
          it.m_curVal = $this.m_curChecks.get(i).checked();
          it.m_writeVal = $this.m_wrtChecks.get(i).checked();
          it.m_hisVal = $this.m_hisChecks.get(i).checked();
          return;
        })));
      return;
    }));
  this.m_view.m_req.batchBind(this.m_target,binds,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u150,
    function()
    {
      $this.close();
      return;
    }));
  return;
}
fan.uiBuilder.SbBatchBind.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.SbBatchBind.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.SbBatchBind.prototype.target = function()
{
  return this.m_target;
}
fan.uiBuilder.SbBatchBind.prototype.target$ = function(it)
{
  this.m_target = it;
  return;
}
fan.uiBuilder.SbBatchBind.prototype.actions = function()
{
  return this.m_actions;
}
fan.uiBuilder.SbBatchBind.prototype.actions$ = function(it)
{
  this.m_actions = it;
  return;
}
fan.uiBuilder.SbBatchBind.prototype.names = function()
{
  return this.m_names;
}
fan.uiBuilder.SbBatchBind.prototype.names$ = function(it)
{
  this.m_names = it;
  return;
}
fan.uiBuilder.SbBatchBind.prototype.curChecks = function()
{
  return this.m_curChecks;
}
fan.uiBuilder.SbBatchBind.prototype.curChecks$ = function(it)
{
  this.m_curChecks = it;
  return;
}
fan.uiBuilder.SbBatchBind.prototype.wrtChecks = function()
{
  return this.m_wrtChecks;
}
fan.uiBuilder.SbBatchBind.prototype.wrtChecks$ = function(it)
{
  this.m_wrtChecks = it;
  return;
}
fan.uiBuilder.SbBatchBind.prototype.hisChecks = function()
{
  return this.m_hisChecks;
}
fan.uiBuilder.SbBatchBind.prototype.hisChecks$ = function(it)
{
  this.m_hisChecks = it;
  return;
}
fan.uiBuilder.SbBatchBind.prototype.m_view = null;
fan.uiBuilder.SbBatchBind.prototype.m_target = null;
fan.uiBuilder.SbBatchBind.prototype.m_actions = null;
fan.uiBuilder.SbBatchBind.prototype.m_names = null;
fan.uiBuilder.SbBatchBind.prototype.m_curChecks = null;
fan.uiBuilder.SbBatchBind.prototype.m_wrtChecks = null;
fan.uiBuilder.SbBatchBind.prototype.m_hisChecks = null;
fan.uiBuilder.SbBindInfo = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.SbBindInfo.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.SbBindInfo.prototype.$typeof = function() { return fan.uiBuilder.SbBindInfo.$type; }
fan.uiBuilder.SbBindInfo.make = function(source,target,f) {
  var self = new fan.uiBuilder.SbBindInfo();
  fan.uiBuilder.SbBindInfo.make$(self,source,target,f);
  return self;
  }
fan.uiBuilder.SbBindInfo.make$ = function(self,source,target,f)
{
  self.m_source = source;
  self.m_target = target;
  f.call(self);
  return;
}
fan.uiBuilder.SbBindInfo.prototype.source = function()
{
  return this.m_source;
}
fan.uiBuilder.SbBindInfo.prototype.source$ = function(it)
{
  this.m_source = it;
  return;
}
fan.uiBuilder.SbBindInfo.prototype.target = function()
{
  return this.m_target;
}
fan.uiBuilder.SbBindInfo.prototype.target$ = function(it)
{
  this.m_target = it;
  return;
}
fan.uiBuilder.SbBindInfo.prototype.m_source = null;
fan.uiBuilder.SbBindInfo.prototype.m_target = null;
fan.uiBuilder.SbBindInfo.prototype.m_$name = null;
fan.uiBuilder.SbBindInfo.prototype.m_kind = null;
fan.uiBuilder.SbBindInfo.prototype.m_curVal = false;
fan.uiBuilder.SbBindInfo.prototype.m_writeVal = false;
fan.uiBuilder.SbBindInfo.prototype.m_hisVal = false;
fan.uiBuilder.SbAction = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.SbAction.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.SbAction.prototype.$typeof = function() { return fan.uiBuilder.SbAction.$type; }
fan.uiBuilder.SbAction.make = function(view) {
  var self = new fan.uiBuilder.SbAction();
  fan.uiBuilder.SbAction.make$(self,view);
  return self;
  }
fan.uiBuilder.SbAction.make$ = function(self,view)
{
  self.m_view = view;
  return;
}
fan.uiBuilder.SbAction.prototype.newRoot = function()
{
  var $this = this;
  var rec = fan.ui.UiSession.cur().m_pim.siteBuilderRoot();
  fan.ui.UiPimForm.openDialog(rec,null,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u58,
    function(diff)
    {
      $this.m_view.m_req.commit(fan.sys.List.make(fan.haystack.Dict.$type, [diff]));
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.newChild = function(parent)
{
  var $this = this;
  this.m_view.m_req.loadRec(parent,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u241,
    function(rec)
    {
      fan.ui.UiPimNew.newChild(rec,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u242,
        function(proto)
        {
          fan.ui.UiPimForm.openDialog(proto,null,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u58,
            function(diff)
            {
              $this.m_view.m_req.commit(fan.sys.List.make(fan.haystack.Dict.$type, [diff]));
              return;
            }));
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.move = function(parent,nodes)
{
  var $this = this;
  nodes = nodes.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return n.recId() != null;
    }));
  if (nodes.isEmpty())
  {
    return;
  }
  ;
  var icon = fan.ui.Icon.outline("move",fan.ui.Colors.m_darkYellow);
  fan.ui.UiUtil.confirmIcon(icon,"moveRec",null,null,false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u243,
    function(it)
    {
      $this.m_view.m_req.moveRecs(parent,nodes);
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.edit = function(nodes)
{
  var $this = this;
  nodes = nodes.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return n.recId() != null;
    }));
  if (nodes.isEmpty())
  {
    return;
  }
  ;
  this.m_view.m_req.loadRecs(nodes,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u59,
    function(recs)
    {
      if (fan.sys.ObjUtil.equals(recs.size(),1))
      {
        fan.ui.UiPimForm.openDialog(fan.sys.ObjUtil.coerce(recs.first(),fan.haystack.Dict.$type),null,fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u58,
          function(diff)
          {
            $this.m_view.m_req.commit(fan.sys.List.make(fan.haystack.Dict.$type, [diff]));
            return;
          }));
      }
      else
      {
        fan.ui.UiPimBatchForm.openDialog(recs,fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u60,
          function(diffs)
          {
            $this.m_view.m_req.commit(diffs);
            return;
          }));
      }
      ;
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.dup = function(nodes)
{
  var $this = this;
  nodes = nodes.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return n.recId() != null;
    }));
  if (nodes.isEmpty())
  {
    return;
  }
  ;
  var icon = fan.ui.Icon.outline("copy",fan.ui.Colors.m_mint);
  fan.ui.UiUtil.confirmIcon(icon,"dupItems","alsoApplyKids",fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()),false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u244,
    function(cascade,count)
    {
      $this.m_view.m_req.dupRecs(nodes,cascade,fan.sys.ObjUtil.coerce(count,fan.sys.Int.$type));
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.trash = function(nodes)
{
  var $this = this;
  nodes = nodes.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return n.recId() != null;
    }));
  if (nodes.isEmpty())
  {
    return;
  }
  ;
  var icon = fan.ui.Icon.outline("trash",fan.ui.Colors.m_darkSilver);
  fan.ui.UiUtil.confirmIcon(icon,"moveToTrash","alsoApplyKids",null,true,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u245,
    function(cascade)
    {
      $this.m_view.m_req.trashRecs(nodes,cascade);
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.bind = function(target,sources)
{
  var $this = this;
  sources = sources.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return fan.sys.ObjUtil.coerce(n,fan.pim.PimNode.$type).selectable();
    }));
  if (fan.sys.ObjUtil.equals(sources.size(),0))
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.equals(sources.size(),1))
  {
    this.doBind(target,fan.sys.ObjUtil.coerce(sources.first(),fan.pim.PimNode.$type));
  }
  else
  {
    this.m_view.m_siteTree.pimTree().load(target).onNode(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u246,
      function(res)
      {
        fan.uiBuilder.SbBatchBind.make($this.m_view,target,sources).open();
        return;
      }));
  }
  ;
  return;
}
fan.uiBuilder.SbAction.prototype.doBind = function(target,source)
{
  var $this = this;
  if (fan.sys.ObjUtil.as(source.stash(),fan.haystack.Dict.$type).has("boundTo"))
  {
    return fan.ui.UiUtil.alert("unbindToBind");
  }
  ;
  if ((target.meta().has("point") && target.meta().has("boundTo")))
  {
    return fan.ui.UiUtil.alert("unbindToBind");
  }
  ;
  this.m_view.m_req.loadRec(target,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u241,
    function(rec)
    {
      if (rec.has("point"))
      {
        var pim = fan.ui.UiSession.cur().m_pim;
        var opts = fan.haystack.Etc.makeDict(fan.sys.List.make(fan.sys.Str.$type, ["cur","write","his"]));
        var expr1 = fan.ui.UiUtil.makeAxonCall("readById",fan.sys.List.make(fan.haystack.Ref.$type, [rec.id()]));
        var expr2 = fan.ui.UiUtil.makeAxonCall("pimConnBind",fan.sys.List.make(fan.haystack.Dict.$type, [pim.conns().nodeToConnBind(source),opts]));
        fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",expr1),"."),expr2)).onOk(fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u9,
          function(g)
          {
            var staged = fan.haystack.Etc.dictRemove(fan.sys.ObjUtil.coerce(g.first(),fan.haystack.Dict.$type),"id");
            staged = fan.haystack.Etc.dictRemove(staged,"mod");
            fan.ui.UiPimForm.openStagedDialog(rec,null,staged,fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u58,
              function(diff)
              {
                $this.m_view.m_req.commit(fan.sys.List.make(fan.haystack.Dict.$type, [diff]));
                return;
              }));
            return;
          }));
      }
      else
      {
        var pim = fan.ui.UiSession.cur().m_pim;
        var point = pim.pointProto(rec);
        var opts = fan.haystack.Etc.makeDict(fan.sys.List.make(fan.sys.Str.$type, ["cur","write","his"]));
        var expr1 = fan.ui.UiUtil.makeAxonCall("pimFormNew",fan.sys.List.make(fan.haystack.Dict.$type, [point.m_src]));
        var expr2 = fan.ui.UiUtil.makeAxonCall("pimConnBind",fan.sys.List.make(fan.haystack.Dict.$type, [pim.conns().nodeToConnBind(source),opts]));
        fan.ui.UiSession.cur().m_api.eval(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",expr1),"."),expr2)).onOk(fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u9,
          function(g)
          {
            fan.ui.UiPimForm.openDialog(fan.sys.ObjUtil.coerce(g.first(),fan.haystack.Dict.$type),null,fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u58,
              function(diff)
              {
                $this.m_view.m_req.commit(fan.sys.List.make(fan.haystack.Dict.$type, [diff]));
                return;
              }));
            return;
          }));
      }
      ;
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.unbind = function(nodes)
{
  var $this = this;
  fan.ui.UiUtil.confirm("unbindConfirm",fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u243,
    function(it)
    {
      $this.m_view.m_req.unbind(nodes);
      return;
    }));
  return;
}
fan.uiBuilder.SbAction.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.SbAction.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.SbAction.prototype.m_view = null;
fan.uiBuilder.SbSyncHis = fan.sys.Obj.$extend(fan.ui.ContentDialog);
fan.uiBuilder.SbSyncHis.prototype.$ctor = function()
{
  fan.ui.ContentDialog.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.SbSyncHis.prototype.$typeof = function() { return fan.uiBuilder.SbSyncHis.$type; }
fan.uiBuilder.SbSyncHis.make = function(points,onSync) {
  var self = new fan.uiBuilder.SbSyncHis();
  fan.uiBuilder.SbSyncHis.make$(self,points,onSync);
  return self;
  }
fan.uiBuilder.SbSyncHis.make$ = function(self,points,onSync)
{
  var $this = self;
  fan.ui.ContentDialog.make$(self);
  self.m_points = fan.sys.ObjUtil.coerce((function($this) { var $_u247 = points; if ($_u247 == null) return null; return fan.sys.ObjUtil.toImmutable($_u247); })(self),fan.sys.Type.find("haystack::Dict[]"));
  self.m_onSync = onSync;
  self.m_syncLast = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.RadioButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u248,
    function(it)
    {
      it.checked$(true);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u248,
        function(it)
        {
          $this.m_syncRange.checked$(false);
          $this.m_input.ro$(true);
          return;
        }));
      return;
    })),fan.domkit.RadioButton.$type);
  self.m_syncRange = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.RadioButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u248,
    function(it)
    {
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u248,
        function(it)
        {
          $this.m_syncLast.checked$(false);
          $this.m_input.ro$(false);
          return;
        }));
      return;
    })),fan.domkit.RadioButton.$type);
  var lastWeek = fan.haystack.Span.makeRel(fan.haystack.SpanMode.m_thisWeek);
  self.m_input = fan.ui.Input.makeForTag(fan.ui.UiSession.cur(),"span",fan.sys.ObjUtil.coerce(lastWeek,fan.sys.Obj.$type));
  self.m_input.ro$(true);
  var box = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px 0 10px 20px"]));
      it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["400px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Icon.outline("sync",fan.ui.Colors.m_green).resize("48px"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u106,
        function(it)
        {
          it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["left"]));
          it.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
          it.style().trap("paddingRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["20px"]));
          return;
        })),fan.ui.Icon.$type)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 0 10px 0"]));
          it.add($this.m_syncLast.wrap("Sync since last sync"));
          return;
        })),fan.dom.Elem.$type)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.add($this.m_syncRange.wrap("Sync range: ")).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with($this.m_input,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u96,
            function(it)
            {
              it.style().trap("marginTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
              it.style().trap("marginLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["86px"]));
              it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
              return;
            })),fan.ui.Input.$type));
          return;
        })),fan.dom.Elem.$type));
      return;
    })),fan.domkit.Box.$type);
  self.title$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("sync"))," "),fan.sys.Pod.find("ui").locale("his")));
  self.width$("auto");
  self.content$(box);
  self.addButton("ok",fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("sync")),true);
  self.addButton("cancel");
  self.onAction(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u37,
    function(key)
    {
      if (fan.sys.ObjUtil.equals(key,"cancel"))
      {
        return true;
      }
      ;
      var span = (function($this) { if ($this.m_syncLast.checked()) return null; return $this.m_input.save(); })($this);
      onSync.call(points,span);
      return true;
    }));
  return;
}
fan.uiBuilder.SbSyncHis.prototype.onSync = function()
{
  return this.m_onSync;
}
fan.uiBuilder.SbSyncHis.prototype.onSync$ = function(it)
{
  this.m_onSync = it;
  return;
}
fan.uiBuilder.SbSyncHis.prototype.syncLast = function()
{
  return this.m_syncLast;
}
fan.uiBuilder.SbSyncHis.prototype.syncLast$ = function(it)
{
  this.m_syncLast = it;
  return;
}
fan.uiBuilder.SbSyncHis.prototype.syncRange = function()
{
  return this.m_syncRange;
}
fan.uiBuilder.SbSyncHis.prototype.syncRange$ = function(it)
{
  this.m_syncRange = it;
  return;
}
fan.uiBuilder.SbSyncHis.prototype.input = function()
{
  return this.m_input;
}
fan.uiBuilder.SbSyncHis.prototype.input$ = function(it)
{
  this.m_input = it;
  return;
}
fan.uiBuilder.SbSyncHis.prototype.m_points = null;
fan.uiBuilder.SbSyncHis.prototype.m_onSync = null;
fan.uiBuilder.SbSyncHis.prototype.m_syncLast = null;
fan.uiBuilder.SbSyncHis.prototype.m_syncRange = null;
fan.uiBuilder.SbSyncHis.prototype.m_input = null;
fan.uiBuilder.SbInfoBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.SbInfoBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cur = fan.sys.List.make(fan.pim.PimNode.$type);
  this.m_curRecs = fan.sys.ObjUtil.coerce(fan.haystack.Dict.$type.emptyList(),fan.sys.Type.find("haystack::Dict[]"));
  return;
}
fan.uiBuilder.SbInfoBox.prototype.$typeof = function() { return fan.uiBuilder.SbInfoBox.$type; }
fan.uiBuilder.SbInfoBox.make = function(view) {
  var self = new fan.uiBuilder.SbInfoBox();
  fan.uiBuilder.SbInfoBox.make$(self,view);
  return self;
  }
fan.uiBuilder.SbInfoBox.make$ = function(self,view)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.m_view = view;
  self.m_header = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.halign$(fan.domkit.Align.m_right);
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px"]));
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_box = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("uiBuilder-info-box domkit-border");
      it.style().trap("overflowX",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
      it.style().trap("overflowY",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.onEvent("dragenter",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.send("dragenter",e);
          return;
        }));
      it.onEvent("dragover",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.send("dragover",e);
          return;
        }));
      it.onEvent("dragleave",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.send("dragleave",e);
          return;
        }));
      it.onEvent("dragend",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.send("dragend",e);
          return;
        }));
      it.onEvent("drop",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.send("drop",e);
          return;
        }));
      return;
    })),fan.domkit.Box.$type);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      fan.sys.ObjUtil.coerce(it.add($this.m_header),fan.domkit.SashBox.$type).add($this.m_box);
      return;
    })),fan.domkit.SashBox.$type));
  return;
}
fan.uiBuilder.SbInfoBox.prototype.onUpdate = function(nodes)
{
  var $this = this;
  this.m_cur = nodes;
  this.m_curRecs = fan.sys.ObjUtil.coerce(fan.haystack.Dict.$type.emptyList(),fan.sys.Type.find("haystack::Dict[]"));
  if ((fan.sys.ObjUtil.equals(nodes.size(),0) || nodes.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return n.recId() == null;
    }))))
  {
    this.m_header.removeAll();
    this.m_box.removeAll();
    return;
  }
  ;
  var label = this.makeLabel(nodes);
  var menu = this.makeMenu(nodes);
  var edit = this.makeEdit(nodes);
  var dup = this.makeDup(nodes);
  var trash = this.makeTrash(nodes);
  this.m_header.removeAll();
  this.m_header.add(label);
  this.m_header.add(fan.sys.ObjUtil.coerce(menu,fan.dom.Elem.$type));
  this.m_header.add(fan.sys.ObjUtil.coerce(edit,fan.dom.Elem.$type));
  this.m_header.add(fan.sys.ObjUtil.coerce(dup,fan.dom.Elem.$type));
  this.m_header.add(fan.sys.ObjUtil.coerce(trash,fan.dom.Elem.$type));
  fan.sys.ObjUtil.coerce(this.m_box.removeAll(),fan.domkit.Box.$type).add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u39,
    function(it)
    {
      return;
    })));
  this.m_view.m_req.loadRecs(nodes,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u59,
    function(recs)
    {
      $this.m_curRecs = recs;
      var gridBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u2,
        function(it)
        {
          it.halign$(fan.domkit.Align.m_fill);
          it.cellStyle("*","*","padding: 1px 4px; white-space: nowrap");
          it.cellStyle("*","even","background: #f9f9fa;");
          it.cellStyle("*",fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"background: #f2f2f4; border-bottom: 1px solid #d9d9d9; font-weight:500");
          it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"*","padding-left: 3px");
          it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),"*","padding-left: 6px");
          it.cellStyle(fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type),"*","width: 100%; color: #999; padding-left: 10px");
          return;
        })),fan.domkit.GridBox.$type);
      var info = fan.ui.RecInfo.make(recs);
      var markers = info.m_tags.findAll(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u250,
        function(t)
        {
          return fan.sys.ObjUtil.equals(t.m_kind,fan.haystack.Kind.m_marker);
        }));
      var tags = info.m_tags.findAll(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u250,
        function(t)
        {
          return fan.sys.ObjUtil.compareNE(t.m_kind,fan.haystack.Kind.m_marker);
        }));
      var markHtml = markers.join(", ",fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u251,
        function(m)
        {
          return (function($this) { if (m.m_sameVal) return m.m_$name; return fan.sys.Str.plus(fan.sys.Str.plus("<span style='font-style:italic; color:#aaa'>",m.m_$name),"</span>"); })($this);
        }));
      gridBox.addRow(fan.sys.List.make(fan.dom.Elem.$type, [fan.ui.Icon.outline("check",fan.ui.Colors.m_darkGrey),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.html$(markHtml);
          return;
        })),fan.domkit.Label.$type)]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]));
      tags.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u253,
        function(tag)
        {
          gridBox.addRow(fan.sys.List.make(fan.dom.Elem.$type, [fan.ui.Icon.outline(tag.m_icon,fan.ui.Colors.m_grey),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              it.text$(tag.m_$name);
              return;
            })),fan.domkit.Label.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              if (!tag.m_sameVal)
              {
                it.style().trap("fontStyle",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["italic"]));
                it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#aaa"]));
              }
              ;
              it.text$(fan.sys.ObjUtil.coerce((function($this) { var $_u254 = tag.m_valDis; if ($_u254 != null) return $_u254; return fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("multiple")); })($this),fan.sys.Str.$type));
              return;
            })),fan.domkit.Label.$type)]));
          return;
        }));
      fan.sys.ObjUtil.coerce($this.m_box.removeAll(),fan.domkit.Box.$type).add(gridBox);
      return;
    }));
  return;
}
fan.uiBuilder.SbInfoBox.prototype.makeLabel = function(nodes)
{
  var $this = this;
  var icon = (function($this) { if (fan.sys.ObjUtil.equals(nodes.size(),1)) return nodes.first().icon(); return "clone"; })(this);
  var dis = (function($this) { if (fan.sys.ObjUtil.equals(nodes.size(),1)) return nodes.first().dis(); return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("multipleSelection"))," ("),fan.sys.ObjUtil.coerce(nodes.size(),fan.sys.Obj.$type.toNullable())),")"); })(this);
  return fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["left"]));
      it.icon$(fan.ui.Icon.outline(icon,fan.ui.Colors.m_grey));
      it.label$(dis);
      return;
    }));
}
fan.uiBuilder.SbInfoBox.prototype.makeMenu = function(nodes)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px 20px 3px 7px"]));
      it.style().addClass("disclosure");
      it.add(fan.ui.Icon.outline("context"));
      it.onPopup(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u30,
        function(it)
        {
          return $this.makeCxMenu(nodes);
        }));
      return;
    })),fan.domkit.Button.$type);
}
fan.uiBuilder.SbInfoBox.prototype.makeCxMenu = function(nodes)
{
  var $this = this;
  return fan.ui.UiContextMenu.buildMenu(this.m_view,fan.sys.ObjUtil.coerce(nodes.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u225,
    function(n)
    {
      return n.id();
    })),fan.sys.Type.find("haystack::Ref[]")),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u257,
    function(m)
    {
      if (nodes.all(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u210,
        function(n)
        {
          return n.meta().has("point");
        })))
      {
        $this.makePointCxMenu(m);
      }
      ;
      return;
    }));
}
fan.uiBuilder.SbInfoBox.prototype.makePointCxMenu = function(menu)
{
  var $this = this;
  var pim = fan.ui.UiSession.cur().m_pim;
  var isBound = this.m_cur.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u210,
    function(n)
    {
      return n.meta().has("boundTo");
    }));
  var hasHis = this.m_curRecs.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u77,
    function(r)
    {
      var conn = pim.conns().byPoint(r,false);
      return (conn != null && conn.m_hisTag != null && r.has(fan.sys.ObjUtil.coerce(conn.m_hisTag,fan.sys.Str.$type)));
    }));
  var items = fan.sys.List.make(fan.domkit.MenuItem.$type, [fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(this.menuItem("blankSp",fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("unbind"))),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u146,
    function(it)
    {
      it.enabled$(fan.sys.ObjUtil.coerce(isBound,fan.sys.Bool.$type.toNullable()));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u258,
        function(b)
        {
          $this.m_view.m_sbaction.unbind($this.m_cur);
          return;
        }));
      return;
    })),fan.domkit.MenuItem.$type)]);
  var kids = menu.children();
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(menu.removeAll(),fan.domkit.Menu.$type).addAll(items),fan.domkit.Menu.$type).add(fan.ui.UiUtil.menuSep()),fan.domkit.Menu.$type).addAll(kids);
  return;
}
fan.uiBuilder.SbInfoBox.prototype.menuItem = function(icon,text)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u146,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px 20px 1px 10px"]));
      it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.padding$("4px");
          it.icon$(fan.ui.Icon.outline(icon,fan.ui.Colors.m_grey));
          it.label$(text);
          return;
        })));
      return;
    })),fan.domkit.MenuItem.$type);
}
fan.uiBuilder.SbInfoBox.prototype.makeEdit = function(nodes)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("edit")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.m_view.m_sbaction.edit(nodes);
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
}
fan.uiBuilder.SbInfoBox.prototype.makeDup = function(nodes)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("dup")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.m_view.m_sbaction.dup(nodes);
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
}
fan.uiBuilder.SbInfoBox.prototype.makeTrash = function(nodes)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("trash")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.m_view.m_sbaction.trash(nodes);
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
}
fan.uiBuilder.SbInfoBox.prototype.send = function(msg,e)
{
  var $this = this;
  if (fan.sys.ObjUtil.compareNE(this.m_cur.size(),1))
  {
    return;
  }
  ;
  var data = fan.sys.ObjUtil.as(fan.domkit.DndUtil.getData(e.dataTransfer()),fan.sys.Type.find("sys::List"));
  if (data == null)
  {
    return;
  }
  ;
  if (data.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u259,
    function(x)
    {
      return !fan.sys.ObjUtil.is(x,fan.pim.PimNode.$type);
    })))
  {
    return;
  }
  ;
  var target = fan.sys.ObjUtil.coerce(this.m_cur.first(),fan.pim.PimNode.$type);
  var nodes = fan.sys.ObjUtil.coerce(data,fan.sys.Type.find("pim::PimNode[]"));
  if (!this.m_view.canDrop(fan.sys.List.make(fan.pim.PimNode.$type, [target]),nodes))
  {
    return;
  }
  ;
  var $_u260 = msg;
  if (fan.sys.ObjUtil.equals($_u260,"dragenter"))
  {
    e.stop();
    this.m_box.style().addClass("uiBuilder-dnd-over");
  }
  else if (fan.sys.ObjUtil.equals($_u260,"dragover"))
  {
    e.stop();
  }
  else if (fan.sys.ObjUtil.equals($_u260,"dragleave"))
  {
    this.m_box.style().removeClass("uiBuilder-dnd-over");
  }
  else if (fan.sys.ObjUtil.equals($_u260,"drop"))
  {
    e.stop();
    this.m_box.style().removeClass("uiBuilder-dnd-over");
    var isMove = fan.sys.ObjUtil.equals(nodes.first().tree(),this.m_view.m_siteTree.pimTree());
    if (isMove)
    {
      this.m_view.m_sbaction.move(target,nodes);
    }
    else
    {
      this.m_view.m_sbaction.bind(target,nodes);
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.SbInfoBox.prototype.view = function()
{
  return this.m_view;
}
fan.uiBuilder.SbInfoBox.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiBuilder.SbInfoBox.prototype.header = function()
{
  return this.m_header;
}
fan.uiBuilder.SbInfoBox.prototype.header$ = function(it)
{
  this.m_header = it;
  return;
}
fan.uiBuilder.SbInfoBox.prototype.box = function()
{
  return this.m_box;
}
fan.uiBuilder.SbInfoBox.prototype.box$ = function(it)
{
  this.m_box = it;
  return;
}
fan.uiBuilder.SbInfoBox.prototype.cur = function()
{
  return this.m_cur;
}
fan.uiBuilder.SbInfoBox.prototype.cur$ = function(it)
{
  this.m_cur = it;
  return;
}
fan.uiBuilder.SbInfoBox.prototype.curRecs = function()
{
  return this.m_curRecs;
}
fan.uiBuilder.SbInfoBox.prototype.curRecs$ = function(it)
{
  this.m_curRecs = it;
  return;
}
fan.uiBuilder.SbInfoBox.prototype.m_view = null;
fan.uiBuilder.SbInfoBox.prototype.m_header = null;
fan.uiBuilder.SbInfoBox.prototype.m_box = null;
fan.uiBuilder.SbInfoBox.prototype.m_cur = null;
fan.uiBuilder.SbInfoBox.prototype.m_curRecs = null;
fan.uiBuilder.ViewMgr = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.ViewMgr.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.ViewMgr.prototype.$typeof = function() { return fan.uiBuilder.ViewMgr.$type; }
fan.uiBuilder.ViewMgr.onBuilder = function(v)
{
  var r = v.sel().first();
  var s = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["view","viewRef"],["views",r.id()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
  v.gotoView(s,fan.ui.UiAction._event());
  return;
}
fan.uiBuilder.ViewMgr.onGoto = function(v)
{
  var r = v.sel().first();
  v.gotoView(fan.sys.ObjUtil.coerce(r.trap("view",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Obj.$type),fan.ui.UiAction._event());
  return;
}
fan.uiBuilder.ViewMgr.make = function() {
  var self = new fan.uiBuilder.ViewMgr();
  fan.uiBuilder.ViewMgr.make$(self);
  return self;
  }
fan.uiBuilder.ViewMgr.make$ = function(self)
{
  return;
}
fan.uiBuilder.VbInspector = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbInspector.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbInspector.prototype.$typeof = function() { return fan.uiBuilder.VbInspector.$type; }
fan.uiBuilder.VbInspector.make = function(builder) {
  var self = new fan.uiBuilder.VbInspector();
  fan.uiBuilder.VbInspector.make$(self,builder);
  return self;
  }
fan.uiBuilder.VbInspector.make$ = function(self,builder)
{
  fan.domkit.Box.make$(self);
  self.m_builder = builder;
  self.style().addClass("uiBuilder-ViewBuilder-tool").addClass("uiBuilder-ViewBuilder-inspector");
  self.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
  self.style().trap("overflowY",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
  return;
}
fan.uiBuilder.VbInspector.prototype.onSelect = function()
{
  var session = this.m_builder.m_session;
  var node = this.m_builder.selNode();
  this.removeAll();
  if (node != null)
  {
    this.add(this.info());
    this.add(this.section("var","Vars",fan.sys.List.make(fan.sys.Str.$type, ["mode","kind","defVal"]),node.m_vars));
    this.add(this.section("action","Actions",fan.sys.List.make(fan.sys.Str.$type, ["action"]),node.m_actions));
    if (!node.isCompound())
    {
      this.add(this.section("db","Data",fan.sys.List.make(fan.sys.Str.$type, ["expr"]),node.m_datas));
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.VbInspector.prototype.info = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px 0"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["60px"]));
      var node = $this.m_builder.selNode();
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Icon.outline(node.icon($this.m_builder.m_session.m_ns),fan.ui.Colors.m_darkGrey).resize("32px"),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u106,
        function(it)
        {
          it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
          it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["18px"]));
          it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
          return;
        })),fan.ui.Icon.$type)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().addClass("font-bold");
          it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
          it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["15px"]));
          it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["40px"]));
          it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
          it.text$(fan.sys.ObjUtil.coerce((function($this) { if (node.m_parent == null) return $this.m_builder.m_rec.trap("view",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])); return node.m_$name; })($this),fan.sys.Str.$type));
          return;
        })),fan.domkit.Label.$type)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().addClass("font-light");
          it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
          it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["31px"]));
          it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["40px"]));
          it.text$(fan.sys.ObjUtil.coerce((function($this) { var $_u262 = node.m_inherit; if ($_u262 != null) return $_u262; return ""; })($this),fan.sys.Str.$type));
          return;
        })),fan.domkit.Label.$type)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
          it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.style().trap("right",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
          it.style().addClass("link");
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("edit")));
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              fan.uiBuilder.VbEditor.make($this.m_builder,fan.sys.ObjUtil.coerce(node,fan.uiBuilder.VbNode.$type)).open();
              return;
            }));
          return;
        })),fan.domkit.Button.$type));
      return;
    })),fan.domkit.Box.$type);
}
fan.uiBuilder.VbInspector.prototype.section = function(icon,title,cols,rows)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      it.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
      it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.style().trap("borderBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #e8e8e8"]));
          it.style().trap("paddingBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["2px"]));
          it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u29,
            function(it)
            {
              it.style().addClass("font-bold");
              it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
              it.icon$(fan.ui.Icon.outline(icon,fan.ui.Colors.m_darkGrey));
              it.label$(title);
              return;
            })));
          return;
        })),fan.domkit.FlowBox.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u2,
        function(it)
        {
          var grid = it;
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px 0 4px 6px"]));
          it.cellStyle("*","*","padding:0 4px; white-space: nowrap;");
          it.cellStyle(fan.sys.Range.make(1,5),"*",fan.sys.Str.plus("color: #88888b; ",fan.ui.UiUtil.m_fontLight));
          rows.each(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u263,
            function(r)
            {
              if ((fan.sys.ObjUtil.equals(icon,"var") && fan.sys.ObjUtil.equals(r.get("name"),"layout")))
              {
                return;
              }
              ;
              if ((fan.sys.ObjUtil.equals(icon,"var") && fan.sys.ObjUtil.equals(r.get("name"),"uiViewBar")))
              {
                return;
              }
              ;
              if ((fan.sys.ObjUtil.equals(icon,"var") && r.has("vizComp")))
              {
                return;
              }
              ;
              if (fan.sys.ObjUtil.equals(icon,"db"))
              {
                var expr = (function($this) { var $_u264 = r.get("expr"); if ($_u264 != null) return $_u264; return ""; })($this);
                grid.addRow(fan.sys.List.make(fan.domkit.Label.$type, [fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
                  fan.uiBuilder.$clos$_u8,
                  function(it)
                  {
                    return;
                  })),fan.domkit.Label.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
                  fan.uiBuilder.$clos$_u8,
                  function(it)
                  {
                    it.text$(fan.sys.ObjUtil.coerce(expr,fan.sys.Str.$type));
                    return;
                  })),fan.domkit.Label.$type)]));
              }
              else
              {
                var row = fan.sys.List.make(fan.dom.Elem.$type);
                row.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
                  fan.uiBuilder.$clos$_u8,
                  function(it)
                  {
                    it.text$(fan.sys.Str.plus("\u2022 ",r.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))));
                    return;
                  })),fan.domkit.Label.$type));
                cols.each(fan.sys.Func.make$closure(
                  fan.uiBuilder.$clos$_u36,
                  function(c)
                  {
                    var v = r.get(c);
                    if (fan.sys.ObjUtil.equals(c,"mode"))
                    {
                      v = "var";
                      if (r.has("input"))
                      {
                        v = "input";
                      }
                      ;
                      if (r.has("binding"))
                      {
                        v = "binding";
                      }
                      ;
                    }
                    ;
                    if ((fan.sys.ObjUtil.equals(c,"defVal") && r.has("binding")))
                    {
                      v = r.get("binding");
                    }
                    ;
                    row.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
                      fan.uiBuilder.$clos$_u8,
                      function(it)
                      {
                        it.text$(fan.sys.ObjUtil.coerce((function($this) { var $_u265 = (function($this) { var $_u266 = v; if ($_u266 == null) return null; return fan.sys.ObjUtil.toStr($_u266); })($this); if ($_u265 != null) return $_u265; return ""; })($this),fan.sys.Str.$type));
                        return;
                      })),fan.domkit.Label.$type));
                    return;
                  }));
                grid.addRow(row);
              }
              ;
              return;
            }));
          return;
        })),fan.domkit.GridBox.$type));
      return;
    })),fan.dom.Elem.$type);
}
fan.uiBuilder.VbInspector.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbInspector.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbInspector.prototype.m_builder = null;
fan.uiBuilder.VbActionEditor = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbActionEditor.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_names = fan.sys.List.make(fan.domkit.TextField.$type);
  this.m_funcs = fan.sys.List.make(fan.domkit.TextField.$type);
  this.m_metas = fan.sys.List.make(fan.domkit.TextField.$type);
  return;
}
fan.uiBuilder.VbActionEditor.prototype.$typeof = function() { return fan.uiBuilder.VbActionEditor.$type; }
fan.uiBuilder.VbActionEditor.make = function(builder,node) {
  var self = new fan.uiBuilder.VbActionEditor();
  fan.uiBuilder.VbActionEditor.make$(self,builder,node);
  return self;
  }
fan.uiBuilder.VbActionEditor.make$ = function(self,builder,node)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.m_builder = builder;
  self.m_node = node;
  self.m_gridBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u2,
    function(it)
    {
      it.cellStyle("*","*","padding: 4px");
      it.cellStyle("*",fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("text-transform:uppercase; ",fan.ui.UiUtil.m_fontBold),"; "),"color:#888; font-size:11px; padding: 0 4px"));
      it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"*","width: 150px;");
      it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),"*","width: 200px");
      it.cellStyle(fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type),"*","width: 300px");
      it.cellStyle(fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type),"*","padding-left: 0");
      it.addRow(fan.sys.List.make(fan.domkit.Label.$type, [fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("name")));
          return;
        })),fan.domkit.Label.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("func")));
          return;
        })),fan.domkit.Label.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("meta")));
          return;
        })),fan.domkit.Label.$type)]));
      return;
    })),fan.domkit.GridBox.$type);
  node.m_actions.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u267,
    function(a)
    {
      $this.addAction(a);
      return;
    }));
  self.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 6px 6px"]));
  self.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["728px"]));
  self.add(self.m_gridBox);
  return;
}
fan.uiBuilder.VbActionEditor.prototype.dialog = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.ContentDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("actions")));
      it.width$("auto");
      it.content$($this);
      it.aux$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              it.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("add"))," "),fan.sys.Pod.find("ui").locale("action")));
              it.onAction(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u1,
                function(it)
                {
                  $this.addAction(null);
                  fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("10ms"),fan.sys.Func.make$closure(
                    fan.uiBuilder.$clos$_u45,
                    function(it)
                    {
                      $this.m_names.last().focus();
                      return;
                    }));
                  return;
                }));
              return;
            })),fan.domkit.Button.$type));
          return;
        })),fan.domkit.FlowBox.$type));
      it.addButton("ok",null,true);
      it.addButton("cancel");
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          return (function($this) { if (fan.sys.ObjUtil.equals(key,"ok")) return $this.save(); return true; })($this);
        }));
      return;
    })),fan.ui.ContentDialog.$type);
}
fan.uiBuilder.VbActionEditor.prototype.addAction = function(d)
{
  var $this = this;
  if (d == null)
  {
    var l = this.m_names.map(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u269,
      function(t)
      {
        return fan.sys.Str.trim(t.val());
      }));
    var n = fan.uiBuilder.ViewBuilder.uniqueList(fan.sys.ObjUtil.coerce(l,fan.sys.Type.find("sys::Str[]")),"action");
    d = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","action"],[n,""],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  }
  ;
  var trio = this.m_builder.toTrio(fan.sys.ObjUtil.coerce(d,fan.haystack.Dict.$type),fan.sys.List.make(fan.sys.Str.$type, ["name","action"]));
  var $name = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(fan.sys.ObjUtil.coerce(d.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      return;
    })),fan.domkit.TextField.$type);
  var func = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(fan.sys.ObjUtil.coerce(d.trap("action",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      return;
    })),fan.domkit.TextField.$type);
  var meta = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(trio);
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      return;
    })),fan.domkit.TextField.$type);
  var rem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().addClass("link");
      it.add(fan.ui.Icon.outline("x"));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.removeAction(fan.sys.ObjUtil.coerce($this.m_names.index($name),fan.sys.Int.$type));
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  this.m_names.add($name);
  this.m_funcs.add(func);
  this.m_metas.add(meta);
  this.m_gridBox.addRow(fan.sys.List.make(fan.dom.Elem.$type, [$name,func,meta,rem]));
  return;
}
fan.uiBuilder.VbActionEditor.prototype.removeAction = function(index)
{
  this.m_gridBox.removeRow(fan.sys.Int.plus(index,1));
  this.m_names.removeAt(index);
  this.m_funcs.removeAt(index);
  this.m_metas.removeAt(index);
  return;
}
fan.uiBuilder.VbActionEditor.prototype.save = function()
{
  var $this = this;
  try
  {
    var actions = fan.sys.List.make(fan.haystack.Dict.$type);
    this.m_names.each(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u270,
      function(n,i)
      {
        var $name = fan.sys.Str.trim($this.m_names.get(i).val());
        var func = fan.sys.Str.trim($this.m_funcs.get(i).val());
        var meta = $this.m_builder.fromTrio(fan.sys.Str.trim($this.m_metas.get(i).val()));
        var action = fan.haystack.Etc.dictMerge(meta,fan.sys.Map.fromLiteral(["name","action"],[$name,func],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
        actions.add(action);
        return;
      }));
    this.m_node.m_actions = actions;
    this.m_builder.onSave();
    return true;
  }
  catch ($_u271)
  {
    $_u271 = fan.sys.Err.make($_u271);
    if ($_u271 instanceof fan.sys.Err)
    {
      var err = $_u271;
      var err;
      fan.ui.Flash.showErr(this,err);
      return false;
    }
    else
    {
      throw $_u271;
    }
  }
  ;
}
fan.uiBuilder.VbActionEditor.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbActionEditor.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbActionEditor.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbActionEditor.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbActionEditor.prototype.gridBox = function()
{
  return this.m_gridBox;
}
fan.uiBuilder.VbActionEditor.prototype.gridBox$ = function(it)
{
  this.m_gridBox = it;
  return;
}
fan.uiBuilder.VbActionEditor.prototype.names = function()
{
  return this.m_names;
}
fan.uiBuilder.VbActionEditor.prototype.names$ = function(it)
{
  this.m_names = it;
  return;
}
fan.uiBuilder.VbActionEditor.prototype.funcs = function()
{
  return this.m_funcs;
}
fan.uiBuilder.VbActionEditor.prototype.funcs$ = function(it)
{
  this.m_funcs = it;
  return;
}
fan.uiBuilder.VbActionEditor.prototype.metas = function()
{
  return this.m_metas;
}
fan.uiBuilder.VbActionEditor.prototype.metas$ = function(it)
{
  this.m_metas = it;
  return;
}
fan.uiBuilder.VbActionEditor.prototype.m_builder = null;
fan.uiBuilder.VbActionEditor.prototype.m_node = null;
fan.uiBuilder.VbActionEditor.prototype.m_gridBox = null;
fan.uiBuilder.VbActionEditor.prototype.m_names = null;
fan.uiBuilder.VbActionEditor.prototype.m_funcs = null;
fan.uiBuilder.VbActionEditor.prototype.m_metas = null;
fan.uiBuilder.VbEdBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbEdBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbEdBox.prototype.$typeof = function() { return fan.uiBuilder.VbEdBox.$type; }
fan.uiBuilder.VbEdBox.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbEdBox.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbEdBox.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbEdBox.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbEdBox.prototype.aux = function()
{
  return this.m_aux;
}
fan.uiBuilder.VbEdBox.prototype.aux$ = function(it)
{
  this.m_aux = it;
  return;
}
fan.uiBuilder.VbEdBox.prototype.onUpdate = function()
{
  return;
}
fan.uiBuilder.VbEdBox.prototype.onSave = function()
{
  return;
}
fan.uiBuilder.VbEdBox.make = function() {
  var self = new fan.uiBuilder.VbEdBox();
  fan.uiBuilder.VbEdBox.make$(self);
  return self;
  }
fan.uiBuilder.VbEdBox.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  return;
}
fan.uiBuilder.VbEdBox.prototype.m_builder = null;
fan.uiBuilder.VbEdBox.prototype.m_node = null;
fan.uiBuilder.VbEdBox.prototype.m_aux = null;
fan.uiBuilder.VbEdView = fan.sys.Obj.$extend(fan.uiBuilder.VbEdBox);
fan.uiBuilder.VbEdView.prototype.$ctor = function()
{
  fan.uiBuilder.VbEdBox.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_viewTypes = fan.sys.List.make(fan.sys.Str.$type);
  this.m_tools = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("dom::Elem"));
  return;
}
fan.uiBuilder.VbEdView.prototype.$typeof = function() { return fan.uiBuilder.VbEdView.$type; }
fan.uiBuilder.VbEdView.prototype.onUpdate = function()
{
  var $this = this;
  var vbvar = (function($this) { var $_u272 = $this.m_node.$var("uiViewBar"); if ($_u272 != null) return $_u272; return fan.haystack.Etc.emptyDict(); })(this);
  var showTitle = fan.sys.ObjUtil.equals(vbvar.get("showTitle"),true);
  var titleText = vbvar.get("title");
  var titleInit = (function($this) { if (showTitle) return (function($this) { if (titleText == null) return 2; return 1; })($this); return 0; })(this);
  this.m_$name = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["700px"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      it.val$(fan.sys.ObjUtil.coerce((function($this) { if ($this.m_node.m_parent == null) return $this.m_builder.m_rec.trap("view",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])); return $this.m_node.m_$name; })($this),fan.sys.Str.$type));
      it.enabled$(fan.sys.ObjUtil.coerce($this.m_node.m_parent != null,fan.sys.Bool.$type.toNullable()));
      return;
    })),fan.domkit.TextField.$type);
  this.m_titleOpts = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ListButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u11,
    function(it)
    {
      it.style().trap("borderColor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["transparent"]));
      it.items$(fan.sys.List.make(fan.sys.Str.$type, [fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("none")),fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("show")),fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("useGridMeta"))]));
      it.sel().index$(fan.sys.ObjUtil.coerce(titleInit,fan.sys.Int.$type.toNullable()));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u233,
        function(b)
        {
          $this.m_titleField.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (fan.sys.ObjUtil.equals(b.sel().index(),1)) return "inline-block"; return "none"; })($this)]));
          return;
        }));
      return;
    })),fan.domkit.ListButton.$type);
  this.m_titleField = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["700px"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (fan.sys.ObjUtil.equals(titleInit,1)) return "inline-block"; return "none"; })($this)]));
      it.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u278 = titleText; if ($_u278 != null) return $_u278; return fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("viewTitleDef")); })($this),fan.sys.Str.$type));
      return;
    })),fan.domkit.TextField.$type);
  this.m_inherit = this.m_node.m_inherit;
  if (fan.sys.ObjUtil.equals(this.m_inherit,"blank"))
  {
    this.m_inherit = "table";
  }
  ;
  var dataTool = fan.uiBuilder.VbDataTool.make(fan.sys.ObjUtil.coerce(this.m_node,fan.uiBuilder.VbNode.$type));
  var textTool = fan.uiBuilder.VbTextTool.make(fan.sys.ObjUtil.coerce(this.m_node,fan.uiBuilder.VbNode.$type));
  var hasMap = this.m_builder.m_session.m_ns.ext("map",false) != null;
  this.m_tool = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      return;
    })),fan.dom.Elem.$type);
  this.m_viewTypes = fan.sys.List.make(fan.sys.Str.$type);
  this.m_tools = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("dom::Elem"));
  var addViewType = fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u279,
    function(n,e)
    {
      $this.m_viewTypes.add(n);
      $this.m_tools.add(n,e);
      return;
    });
  addViewType.call("table",dataTool);
  addViewType.call("chart",dataTool);
  addViewType.call("card",dataTool);
  addViewType.call("form",dataTool);
  addViewType.call("text",textTool);
  addViewType.call("fandoc",textTool);
  addViewType.call("iframe",dataTool);
  if (hasMap)
  {
    addViewType.call("map",dataTool);
  }
  ;
  addViewType.call("reuse",fan.uiBuilder.VbReuseTool.make(fan.sys.ObjUtil.coerce(this.m_builder,fan.uiBuilder.ViewBuilder.$type),fan.sys.ObjUtil.coerce(this.m_node,fan.uiBuilder.VbNode.$type)));
  addViewType.call("page",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      return;
    })),fan.domkit.Box.$type));
  addViewType.call("pageBreak",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      return;
    })),fan.domkit.Box.$type));
  addViewType.call("tile",fan.uiBuilder.VbTileTool.make(fan.sys.ObjUtil.coerce(this.m_node,fan.uiBuilder.VbNode.$type)));
  var group = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ButtonGroup.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u280,
    function(it)
    {
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u281,
        function(g)
        {
          var v = $this.m_viewTypes.get(fan.sys.ObjUtil.coerce(g.selIndex(),fan.sys.Int.$type));
          var t = $this.m_tools.get(v);
          $this.m_tool.parent().replace(fan.sys.ObjUtil.coerce($this.m_tool,fan.dom.Elem.$type),fan.sys.ObjUtil.coerce(t,fan.dom.Elem.$type));
          $this.m_inherit = v;
          $this.m_tool = t;
          (function($this) { var $_u282 = fan.sys.ObjUtil.as($this.m_tool,fan.uiBuilder.VbViewTool.$type); if ($_u282 == null) return null; return $_u282.onFocus(); })($this);
          return;
        }));
      return;
    })),fan.domkit.ButtonGroup.$type);
  var types = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      return;
    })),fan.domkit.Box.$type);
  this.m_viewTypes.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u197,
    function(v)
    {
      var icon = v;
      var text = (function($this) { if (fan.sys.ObjUtil.equals(v,"reuse")) return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("use"))," "),fan.sys.Pod.find("ui").locale("existing")); return fan.sys.Str.toDisplayName(v); })($this);
      var button = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u31,
        function(it)
        {
          it.style().addClass("flush");
          it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
          it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["35px"]));
          it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["left"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["5px 10px"]));
          it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
          it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u29,
            function(it)
            {
              it.icon$(fan.ui.Icon.color(icon).resize("24px"));
              it.label$(text);
              return;
            })));
          return;
        })),fan.domkit.ToggleButton.$type);
      group.add(button);
      types.add(button);
      return;
    }));
  this.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
  fan.sys.ObjUtil.coerce(this.removeAll(),fan.uiBuilder.VbEdView.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","10px","440px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
          it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
          it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px 8px"]));
          it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px"]));
          fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("name")),":"));
              return;
            })),fan.domkit.Label.$type)),fan.domkit.FlowBox.$type).add(fan.sys.ObjUtil.coerce($this.m_$name,fan.dom.Elem.$type));
          return;
        })),fan.domkit.FlowBox.$type)),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          return;
        })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          it.dir$(fan.domkit.Dir.m_right);
          it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["150px","10px","100%"]));
          fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.WellBox.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u284,
            function(it)
            {
              it.add(types);
              return;
            })),fan.domkit.WellBox.$type)),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u23,
            function(it)
            {
              return;
            })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce($this.m_tool,fan.dom.Elem.$type));
          return;
        })),fan.domkit.SashBox.$type));
      return;
    })),fan.domkit.SashBox.$type));
  var i = this.m_viewTypes.findIndex(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u285,
    function(v)
    {
      return fan.sys.ObjUtil.equals($this.m_inherit,v);
    }));
  if (i != null)
  {
    group.selIndex$(i);
  }
  else
  {
    group.selIndex$(this.m_viewTypes.findIndex(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u285,
      function(v)
      {
        return fan.sys.ObjUtil.equals(v,"reuse");
      })));
  }
  ;
  fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("200ms"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u45,
    function(it)
    {
      (function($this) { var $_u286 = fan.sys.ObjUtil.as($this.m_tool,fan.uiBuilder.VbViewTool.$type); if ($_u286 == null) return null; return $_u286.onFocus(); })($this);
      return;
    }));
  return;
}
fan.uiBuilder.VbEdView.prototype.onSave = function()
{
  var $this = this;
  if (fan.sys.ObjUtil.coerce(this.m_$name.enabled(),fan.sys.Bool.$type))
  {
    this.m_node.m_$name = fan.sys.Str.trim(this.m_$name.val());
  }
  ;
  this.m_node.m_inherit = (function($this) { var $_u287 = $this.m_inherit; if ($_u287 != null) return $_u287; return "table"; })(this);
  var vbix = this.m_node.m_vars.findIndex(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"uiViewBar");
    }));
  var vbvar = (function($this) { if (vbix == null) return fan.uiBuilder.VbEdVars.m_defUiViewBar; return $this.m_node.m_vars.get(fan.sys.ObjUtil.coerce(vbix,fan.sys.Int.$type)); })(this);
  var $_u290 = this.m_titleOpts.sel().index();
  if (fan.sys.ObjUtil.equals($_u290,0))
  {
    vbvar = fan.haystack.Etc.dictRemove(vbvar,"showTitle");
    vbvar = fan.haystack.Etc.dictRemove(vbvar,"title");
  }
  else if (fan.sys.ObjUtil.equals($_u290,1))
  {
    vbvar = fan.haystack.Etc.dictSet(vbvar,"showTitle",fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
    vbvar = fan.haystack.Etc.dictSet(vbvar,"title",fan.sys.Str.trim(this.m_titleField.val()));
  }
  else if (fan.sys.ObjUtil.equals($_u290,2))
  {
    vbvar = fan.haystack.Etc.dictSet(vbvar,"showTitle",fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
    vbvar = fan.haystack.Etc.dictRemove(vbvar,"title");
  }
  ;
  if (vbix == null)
  {
    if (!this.isVarEmpty(vbvar))
    {
      this.m_node.m_vars.add(vbvar);
    }
    ;
  }
  else
  {
    if (this.isVarEmpty(vbvar))
    {
      this.m_node.m_vars.removeAt(fan.sys.ObjUtil.coerce(vbix,fan.sys.Int.$type));
    }
    else
    {
      this.m_node.m_vars.set(fan.sys.ObjUtil.coerce(vbix,fan.sys.Int.$type),vbvar);
    }
    ;
  }
  ;
  this.m_node.m_vars = this.m_node.m_vars.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return fan.sys.ObjUtil.compareNE(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"layout");
    }));
  this.m_node.m_datas.clear();
  if (fan.sys.ObjUtil.is(this.m_tool,fan.uiBuilder.VbViewTool.$type))
  {
    fan.sys.ObjUtil.coerce(this.m_tool,fan.uiBuilder.VbViewTool.$type).onSave(this.m_builder.m_session,fan.sys.ObjUtil.coerce(this.m_node,fan.uiBuilder.VbNode.$type));
  }
  ;
  return;
}
fan.uiBuilder.VbEdView.prototype.isVarEmpty = function(v)
{
  var names = fan.haystack.Etc.dictNames(v);
  if (fan.sys.ObjUtil.compareGT(names.size(),4))
  {
    return false;
  }
  ;
  return (names.contains("var") && names.contains("name") && names.contains("kind") && names.contains("defVal"));
}
fan.uiBuilder.VbEdView.prototype.$name = function()
{
  return this.m_$name;
}
fan.uiBuilder.VbEdView.prototype.$name$ = function(it)
{
  this.m_$name = it;
  return;
}
fan.uiBuilder.VbEdView.prototype.titleOpts = function()
{
  return this.m_titleOpts;
}
fan.uiBuilder.VbEdView.prototype.titleOpts$ = function(it)
{
  this.m_titleOpts = it;
  return;
}
fan.uiBuilder.VbEdView.prototype.titleField = function()
{
  return this.m_titleField;
}
fan.uiBuilder.VbEdView.prototype.titleField$ = function(it)
{
  this.m_titleField = it;
  return;
}
fan.uiBuilder.VbEdView.prototype.inherit = function()
{
  return this.m_inherit;
}
fan.uiBuilder.VbEdView.prototype.inherit$ = function(it)
{
  this.m_inherit = it;
  return;
}
fan.uiBuilder.VbEdView.prototype.viewTypes = function()
{
  return this.m_viewTypes;
}
fan.uiBuilder.VbEdView.prototype.viewTypes$ = function(it)
{
  this.m_viewTypes = it;
  return;
}
fan.uiBuilder.VbEdView.prototype.tools = function()
{
  return this.m_tools;
}
fan.uiBuilder.VbEdView.prototype.tools$ = function(it)
{
  this.m_tools = it;
  return;
}
fan.uiBuilder.VbEdView.prototype.tool = function()
{
  return this.m_tool;
}
fan.uiBuilder.VbEdView.prototype.tool$ = function(it)
{
  this.m_tool = it;
  return;
}
fan.uiBuilder.VbEdView.make = function() {
  var self = new fan.uiBuilder.VbEdView();
  fan.uiBuilder.VbEdView.make$(self);
  return self;
  }
fan.uiBuilder.VbEdView.make$ = function(self)
{
  fan.uiBuilder.VbEdBox.make$(self);
  ;
  return;
}
fan.uiBuilder.VbEdView.prototype.m_$name = null;
fan.uiBuilder.VbEdView.prototype.m_titleOpts = null;
fan.uiBuilder.VbEdView.prototype.m_titleField = null;
fan.uiBuilder.VbEdView.prototype.m_inherit = null;
fan.uiBuilder.VbEdView.prototype.m_viewTypes = null;
fan.uiBuilder.VbEdView.prototype.m_tools = null;
fan.uiBuilder.VbEdView.prototype.m_tool = null;
fan.uiBuilder.VbViewTool = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbViewTool.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbViewTool.prototype.$typeof = function() { return fan.uiBuilder.VbViewTool.$type; }
fan.uiBuilder.VbViewTool.prototype.onFocus = function()
{
  return;
}
fan.uiBuilder.VbViewTool.prototype.onSave = function(session,node)
{
  return;
}
fan.uiBuilder.VbViewTool.make = function() {
  var self = new fan.uiBuilder.VbViewTool();
  fan.uiBuilder.VbViewTool.make$(self);
  return self;
  }
fan.uiBuilder.VbViewTool.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  return;
}
fan.uiBuilder.VbDataTool = fan.sys.Obj.$extend(fan.uiBuilder.VbViewTool);
fan.uiBuilder.VbDataTool.prototype.$ctor = function()
{
  fan.uiBuilder.VbViewTool.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbDataTool.prototype.$typeof = function() { return fan.uiBuilder.VbDataTool.$type; }
fan.uiBuilder.VbDataTool.make = function(node) {
  var self = new fan.uiBuilder.VbDataTool();
  fan.uiBuilder.VbDataTool.make$(self,node);
  return self;
  }
fan.uiBuilder.VbDataTool.make$ = function(self,node)
{
  var $this = self;
  fan.uiBuilder.VbViewTool.make$(self);
  var data = (function($this) { var $_u291 = node.m_datas.first(); if ($_u291 != null) return $_u291; return fan.haystack.Etc.emptyDict(); })(self);
  var w = 720;
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("{",fan.sys.ObjUtil.coerce(w,fan.sys.Obj.$type.toNullable())),"}px")]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 auto"]));
      it.style().trap("paddingRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["inline-block"]));
          it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["16px"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["9px 0"]));
          it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
          it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#555"]));
          it.text$("\$");
          return;
        })),fan.domkit.Label.$type)),fan.domkit.Box.$type).add((function($this) { var $_u292 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u7,
        function(it)
        {
          it.style().addClass("ui-font-mono");
          it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.minus(w,16),32),4),fan.sys.Obj.$type.toNullable())),"px")]));
          it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
          it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["32px"]));
          it.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u293 = data.get("expr"); if ($_u293 != null) return $_u293; return ""; })($this),fan.sys.Str.$type));
          it.onEvent("keydown",false,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u44,
            function(e)
            {
              if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_up))
              {
                $this.m_x = fan.sys.Int.min(fan.sys.Int.plus($this.m_x,1),fan.sys.Int.minus($this.mru().list().size(),1));
                $this.m_query.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u294 = $this.mru().list().getSafe($this.m_x); if ($_u294 != null) return $_u294; return $this.m_query.val(); })($this),fan.sys.Str.$type));
              }
              else
              {
                if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_down))
                {
                  if (fan.sys.ObjUtil.compareGT($this.m_x,0))
                  {
                    $this.m_x = fan.sys.Int.max(fan.sys.Int.minus($this.m_x,1),0);
                    $this.m_query.val$(fan.sys.ObjUtil.coerce((function($this) { var $_u295 = $this.mru().list().getSafe($this.m_x); if ($_u295 != null) return $_u295; return $this.m_query.val(); })($this),fan.sys.Str.$type));
                  }
                  ;
                }
                ;
              }
              ;
              return;
            }));
          return;
        })),fan.domkit.TextField.$type); $this.m_query = $_u292; return $_u292; })($this)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.style().addClass("flush");
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 6px"]));
          it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px 0"]));
          it.onPopup(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u30,
            function(it)
            {
              return $this.onMruPopup();
            }));
          it.add(fan.ui.Icon.outline("recent"));
          return;
        })),fan.domkit.Button.$type));
      return;
    })),fan.domkit.Box.$type));
  return;
}
fan.uiBuilder.VbDataTool.prototype.onFocus = function()
{
  this.m_query.focus();
  return;
}
fan.uiBuilder.VbDataTool.prototype.onSave = function(s,node)
{
  var $this = this;
  var expr = fan.sys.Str.trimToNull(this.m_query.val());
  if ((expr != null && fan.sys.ObjUtil.compareGT(fan.sys.Str.size(expr),0)))
  {
    if ((fan.sys.ObjUtil.compareNE(fan.sys.Str.get(expr,0),34) && fan.sys.ObjUtil.compareNE(fan.sys.Str.get(expr,-1),34)))
    {
      this.mru().push(fan.sys.ObjUtil.coerce(expr,fan.sys.Str.$type));
    }
    ;
    fan.view.DataNode.make("data",fan.sys.Map.fromLiteral(["expr"],[expr],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str?"))).m_varNames.each(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u145,
      function(n)
      {
        if (node.$var(n) != null)
        {
          return;
        }
        ;
        node.m_vars.add(fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","var","input","kind"],[n,fan.haystack.Marker.m_val,fan.haystack.Marker.m_val,$this.toKind(n)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"))));
        return;
      }));
  }
  ;
  node.m_datas = (function($this) { if (expr == null) return fan.sys.List.make(fan.haystack.Dict.$type); return fan.sys.List.make(fan.haystack.Dict.$type, [fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","expr"],["data",expr],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str?")))]); })(this);
  return;
}
fan.uiBuilder.VbDataTool.prototype.toKind = function($name)
{
  var $_u297 = $name;
  if (fan.sys.ObjUtil.equals($_u297,"site"))
  {
    return "Ref<site>";
  }
  else if (fan.sys.ObjUtil.equals($_u297,"sites"))
  {
    return "Ref<site>[]";
  }
  else if (fan.sys.ObjUtil.equals($_u297,"equip"))
  {
    return "Ref<equip>";
  }
  else if (fan.sys.ObjUtil.equals($_u297,"equips"))
  {
    return "Ref<equip>[]";
  }
  else if (fan.sys.ObjUtil.equals($_u297,"point"))
  {
    return "Ref<point>";
  }
  else if (fan.sys.ObjUtil.equals($_u297,"points"))
  {
    return "Ref<point>[]";
  }
  else if (fan.sys.ObjUtil.equals($_u297,"dates"))
  {
    return "Span";
  }
  else if (fan.sys.ObjUtil.equals($_u297,"span"))
  {
    return "Span";
  }
  else
  {
    return "Str";
  }
  ;
}
fan.uiBuilder.VbDataTool.prototype.onMruPopup = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Menu.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u144,
    function(it)
    {
      it.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["nowrap"]));
      it.halign$(fan.domkit.Align.m_right);
      it.addAll(fan.sys.ObjUtil.coerce($this.mru().list().map(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u298,
        function(x)
        {
          return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u146,
            function(it)
            {
              it.text$(fan.sys.Str.plus("\$ ",x));
              it.onAction(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u146,
                function(it)
                {
                  $this.m_query.val$(x);
                  $this.m_query.focus();
                  return;
                }));
              return;
            })),fan.domkit.MenuItem.$type);
        })),fan.sys.Type.find("dom::Elem[]")));
      return;
    })),fan.domkit.Menu.$type);
}
fan.uiBuilder.VbDataTool.prototype.mru = function()
{
  var mru = fan.sys.ObjUtil.coerce(fan.concurrent.Actor.locals().get("ws.vb.mru.axon"),fan.ui.Mru.$type.toNullable());
  if (mru == null)
  {
    fan.concurrent.Actor.locals().set("ws.vb.mru.axon",mru = fan.ui.Mru.axon());
  }
  ;
  return fan.sys.ObjUtil.coerce(mru,fan.ui.Mru.$type);
}
fan.uiBuilder.VbDataTool.prototype.x = function()
{
  return this.m_x;
}
fan.uiBuilder.VbDataTool.prototype.x$ = function(it)
{
  this.m_x = it;
  return;
}
fan.uiBuilder.VbDataTool.prototype.query = function()
{
  return this.m_query;
}
fan.uiBuilder.VbDataTool.prototype.query$ = function(it)
{
  this.m_query = it;
  return;
}
fan.uiBuilder.VbDataTool.prototype.m_x = 0;
fan.uiBuilder.VbDataTool.prototype.m_query = null;
fan.uiBuilder.VbTextTool = fan.sys.Obj.$extend(fan.uiBuilder.VbViewTool);
fan.uiBuilder.VbTextTool.prototype.$ctor = function()
{
  fan.uiBuilder.VbViewTool.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbTextTool.prototype.$typeof = function() { return fan.uiBuilder.VbTextTool.$type; }
fan.uiBuilder.VbTextTool.make = function(node) {
  var self = new fan.uiBuilder.VbTextTool();
  fan.uiBuilder.VbTextTool.make$(self,node);
  return self;
  }
fan.uiBuilder.VbTextTool.make$ = function(self,node)
{
  var $this = self;
  fan.uiBuilder.VbViewTool.make$(self);
  var data = (function($this) { var $_u299 = node.m_datas.first(); if ($_u299 != null) return $_u299; return fan.haystack.Etc.emptyDict(); })(self);
  var expr = self.fromExpr(fan.sys.ObjUtil.coerce((function($this) { var $_u300 = data.get("expr"); if ($_u300 != null) return $_u300; return ""; })(self),fan.sys.Str.$type));
  self.m_dataTool = fan.uiBuilder.VbDataTool.make(node);
  self.m_area = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextArea.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u100,
    function(it)
    {
      it.style().addClass("ui-font-mono");
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px 8px"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
      it.val$(expr);
      return;
    })),fan.domkit.TextArea.$type);
  var sash = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      return;
    })),fan.domkit.SashBox.$type);
  var group = fan.domkit.ButtonGroup.make();
  group.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u31,
    function(it)
    {
      it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["60px"]));
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("text")));
      return;
    })),fan.domkit.ToggleButton.$type));
  group.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u31,
    function(it)
    {
      it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["60px"]));
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("expr")));
      return;
    })),fan.domkit.ToggleButton.$type));
  group.onSelect(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u280,
    function(it)
    {
      var c = sash.lastChild();
      if (fan.sys.ObjUtil.equals(group.selIndex(),0))
      {
        c.parent().replace(fan.sys.ObjUtil.coerce(c,fan.dom.Elem.$type),$this.m_area);
      }
      else
      {
        c.parent().replace(fan.sys.ObjUtil.coerce(c,fan.dom.Elem.$type),$this.m_dataTool);
      }
      ;
      return;
    }));
  sash.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["-1px"]));
      it.addAll(group.buttons());
      return;
    })),fan.domkit.FlowBox.$type));
  sash.add(self.m_area);
  self.add(sash);
  group.selIndex$(fan.sys.ObjUtil.coerce((function($this) { if (($this.m_literal || fan.sys.ObjUtil.equals(fan.sys.Str.size(expr),0))) return 0; return 1; })(self),fan.sys.Int.$type.toNullable()));
  return;
}
fan.uiBuilder.VbTextTool.prototype.onFocus = function()
{
  if (this.m_area.parent() != null)
  {
    this.m_area.focus();
  }
  else
  {
    this.m_dataTool.onFocus();
  }
  ;
  return;
}
fan.uiBuilder.VbTextTool.prototype.onSave = function(s,node)
{
  if (this.m_area.parent() == null)
  {
    this.m_dataTool.onSave(s,node);
  }
  else
  {
    var expr = this.toExpr(fan.sys.Str.trim(this.m_area.val()));
    node.m_datas = fan.sys.List.make(fan.haystack.Dict.$type, [fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","expr"],["data",expr],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")))]);
  }
  ;
  return;
}
fan.uiBuilder.VbTextTool.prototype.fromExpr = function(x)
{
  var isExpr = true;
  try
  {
    var expr = fan.axon.Parser.make(fan.axon.Loc.m_unknown,fan.sys.Str.$in(x)).parse();
    isExpr = fan.sys.ObjUtil.compareNE(expr.type(),fan.axon.ExprType.m_literal);
  }
  catch ($_u302)
  {
    $_u302 = fan.sys.Err.make($_u302);
    if ($_u302 instanceof fan.sys.Err)
    {
      var e = $_u302;
      var e;
      isExpr = true;
    }
    else
    {
      throw $_u302;
    }
  }
  ;
  if (isExpr)
  {
    this.m_literal = false;
    return x;
  }
  ;
  this.m_literal = true;
  if (fan.sys.Str.startsWith(x,"\""))
  {
    x = fan.sys.Str.getRange(x,fan.sys.Range.make(1,-1));
  }
  ;
  if (fan.sys.Str.endsWith(x,"\""))
  {
    x = fan.sys.Str.getRange(x,fan.sys.Range.make(0,-2));
  }
  ;
  return fan.sys.Str.replace(fan.sys.Str.replace(x,"\\\"","\""),"\\n","\n");
}
fan.uiBuilder.VbTextTool.prototype.toExpr = function(f)
{
  return fan.sys.Str.toCode(f);
}
fan.uiBuilder.VbTextTool.prototype.dataTool = function()
{
  return this.m_dataTool;
}
fan.uiBuilder.VbTextTool.prototype.dataTool$ = function(it)
{
  this.m_dataTool = it;
  return;
}
fan.uiBuilder.VbTextTool.prototype.area = function()
{
  return this.m_area;
}
fan.uiBuilder.VbTextTool.prototype.area$ = function(it)
{
  this.m_area = it;
  return;
}
fan.uiBuilder.VbTextTool.prototype.literal = function()
{
  return this.m_literal;
}
fan.uiBuilder.VbTextTool.prototype.literal$ = function(it)
{
  this.m_literal = it;
  return;
}
fan.uiBuilder.VbTextTool.prototype.m_dataTool = null;
fan.uiBuilder.VbTextTool.prototype.m_area = null;
fan.uiBuilder.VbTextTool.prototype.m_literal = false;
fan.uiBuilder.VbReuseTool = fan.sys.Obj.$extend(fan.uiBuilder.VbViewTool);
fan.uiBuilder.VbReuseTool.prototype.$ctor = function()
{
  fan.uiBuilder.VbViewTool.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbReuseTool.prototype.$typeof = function() { return fan.uiBuilder.VbReuseTool.$type; }
fan.uiBuilder.VbReuseTool.make = function(builder,node) {
  var self = new fan.uiBuilder.VbReuseTool();
  fan.uiBuilder.VbReuseTool.make$(self,builder,node);
  return self;
  }
fan.uiBuilder.VbReuseTool.make$ = function(self,builder,node)
{
  var $this = self;
  fan.uiBuilder.VbViewTool.make$(self);
  var s = builder.m_session;
  var table = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Table.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u303,
    function(it)
    {
      it.showHeader$(false);
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u304,
        function(t)
        {
          $this.m_sel = t.sel().item();
          return;
        }));
      return;
    })),fan.domkit.Table.$type);
  var blacklist = fan.sys.List.make(fan.sys.Str.$type, ["home"]);
  s.ws().m_appAll.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u305,
    function(a)
    {
      if (s.m_ns.views().forApp(a).all(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u306,
        function(v)
        {
          return v.isUi2();
        })))
      {
        blacklist.add(a.$name());
      }
      ;
      return;
    }));
  self.m_orig = fan.sys.ObjUtil.coerce((function($this) { var $_u307 = node.m_inherit; if ($_u307 != null) return $_u307; return "table"; })(self),fan.sys.Str.$type);
  var opts = fan.sys.Map.fromLiteral(["blacklist"],[blacklist],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
  var sel = s.m_ns.view(fan.sys.ObjUtil.coerce(node.m_inherit,fan.sys.Str.$type),false);
  if ((sel != null && sel.app() != null))
  {
    opts.set("sel",sel.app().$name());
    if (fan.sys.ObjUtil.equals(sel.app().$name(),"favs"))
    {
      self.updateTableFav(builder,table);
    }
    else
    {
      self.updateTable(builder,table,fan.sys.ObjUtil.coerce(sel.app(),fan.skyarc.AppDef.$type),sel);
    }
    ;
  }
  ;
  var picker = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AppPicker.makeSmall(s,"xxx",opts),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u308,
    function(it)
    {
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u309,
        function(def)
        {
          if (fan.sys.ObjUtil.equals(def.$name(),"favs"))
          {
            $this.updateTableFav(builder,table);
          }
          else
          {
            $this.updateTable(builder,table,fan.sys.ObjUtil.coerce(def,fan.skyarc.AppDef.$type),null);
          }
          ;
          return;
        }));
      return;
    })),fan.ui.AppPicker.$type);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["50%","10px","50%"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(picker),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          return;
        })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add(table);
      return;
    })),fan.domkit.SashBox.$type));
  return;
}
fan.uiBuilder.VbReuseTool.prototype.onSave = function(s,node)
{
  var $this = this;
  if (this.m_sel == null)
  {
    node.m_inherit = "table";
  }
  else
  {
    var vdef = fan.sys.ObjUtil.as(this.m_sel,fan.skyarc.ViewDef.$type);
    var state = null;
    if (vdef == null)
    {
      var fav = fan.sys.ObjUtil.coerce(this.m_sel,fan.haystack.Dict.$type);
      var vlink = fan.sys.ObjUtil.coerce(fav.trap("viewLink",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Dict.$type);
      vdef = s.m_ns.view(fan.sys.ObjUtil.coerce(vlink.trap("view",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
      state = fan.sys.ObjUtil.coerce(vlink.get("state"),fan.haystack.Dict.$type.toNullable());
    }
    ;
    if (fan.sys.ObjUtil.equals(vdef.$name(),"shell"))
    {
      var tab = (function($this) { var $_u310 = state.get("tab"); if ($_u310 != null) return $_u310; return "table"; })(this);
      if ((fan.sys.ObjUtil.compareNE(tab,"table") && fan.sys.ObjUtil.compareNE(tab,"chart")))
      {
        tab = "table";
      }
      ;
      node.m_inherit = fan.sys.ObjUtil.coerce(tab,fan.sys.Str.$type.toNullable());
      node.m_vars.clear();
      node.setVar("presentation",state.get("presentation"));
      node.m_datas.add(fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","expr"],["data",state.get("expr")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"))));
    }
    else
    {
      if (fan.sys.ObjUtil.compareNE(this.m_orig,vdef.$name()))
      {
        node.m_vars.clear();
      }
      ;
      node.m_inherit = vdef.$name();
      var temp = s.makeViewNode(fan.sys.ObjUtil.coerce(vdef,fan.sys.Obj.$type));
      temp.vars().each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u311,
        function(v)
        {
          if (node.$var(v.m_$name) != null)
          {
            return;
          }
          ;
          node.m_vars.add(fan.haystack.Etc.dictMerge(v.m_meta,fan.sys.Map.fromLiteral(["name"],[v.m_$name],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"))));
          return;
        }));
      (function($this) { var $_u312 = state; if ($_u312 == null) return null; return $_u312.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u313,
        function(v,n)
        {
          node.setVar(n,v);
          return;
        })); })(this);
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.VbReuseTool.prototype.updateTable = function(builder,table,app,view)
{
  var $this = this;
  var myName = builder.m_rec.trap("view",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
  var ns = builder.m_session.m_ns;
  var list = ns.views().forApp(app).findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u306,
    function(v)
    {
      return (!v.isUi2() && fan.sys.ObjUtil.compareNE(v.$name(),myName));
    }));
  table.model$(fan.ui.ListModel.make(list,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u314,
    function(v)
    {
      return fan.sys.ObjUtil.coerce(v.dis(),fan.sys.Str.$type);
    })));
  table.sel().index$((function($this) { if (view == null) return fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()); return list.findIndex(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u306,
    function(v)
    {
      return fan.sys.ObjUtil.equals(v,view);
    })); })(this));
  table.rebuild();
  this.m_sel = table.sel().item();
  return;
}
fan.uiBuilder.VbReuseTool.prototype.updateTableFav = function(builder,table)
{
  var $this = this;
  builder.m_session.m_api.eval("readAll(fav and not setAsDefault)").onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u9,
    function(g)
    {
      table.model$(fan.ui.ListModel.make(g.toRows(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u316,
        function(d)
        {
          return fan.sys.ObjUtil.coerce(d.dis(),fan.sys.Str.$type);
        })));
      table.sel().index$(fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
      table.rebuild();
      $this.m_sel = table.sel().item();
      return;
    }));
  return;
}
fan.uiBuilder.VbReuseTool.prototype.sel = function()
{
  return this.m_sel;
}
fan.uiBuilder.VbReuseTool.prototype.sel$ = function(it)
{
  this.m_sel = it;
  return;
}
fan.uiBuilder.VbReuseTool.prototype.m_sel = null;
fan.uiBuilder.VbReuseTool.prototype.m_orig = null;
fan.uiBuilder.VbTileTool = fan.sys.Obj.$extend(fan.uiBuilder.VbViewTool);
fan.uiBuilder.VbTileTool.prototype.$ctor = function()
{
  fan.uiBuilder.VbViewTool.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbTileTool.prototype.$typeof = function() { return fan.uiBuilder.VbTileTool.$type; }
fan.uiBuilder.VbTileTool.make = function(node) {
  var self = new fan.uiBuilder.VbTileTool();
  fan.uiBuilder.VbTileTool.make$(self,node);
  return self;
  }
fan.uiBuilder.VbTileTool.make$ = function(self,node)
{
  var $this = self;
  fan.uiBuilder.VbViewTool.make$(self);
  self.m_tb = fan.uiBuilder.TileBuilder.make();
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.WellBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u284,
    function(it)
    {
      it.add($this.m_tb);
      return;
    })),fan.domkit.WellBox.$type));
  var layout = (function($this) { var $_u317 = node.$var("layout"); if ($_u317 != null) return $_u317; return node.$var("mode"); })(self);
  var spec = fan.view.TileSpec.fromStr(fan.sys.ObjUtil.coerce((function($this) { var $_u318 = (function($this) { var $_u319 = layout; if ($_u319 == null) return null; return $_u319.get("defVal"); })($this); if ($_u318 != null) return $_u318; return "grid 6x6"; })(self),fan.sys.Str.$type),false);
  if (spec != null)
  {
    self.m_tb.load(fan.sys.ObjUtil.coerce(spec,fan.view.TileSpec.$type));
  }
  ;
  return;
}
fan.uiBuilder.VbTileTool.prototype.onSave = function(s,node)
{
  var mode = this.m_tb.save();
  node.m_vars.add(fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","var","kind","defVal"],["layout",fan.haystack.Marker.m_val,"Str",mode],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"))));
  var size = fan.view.TileSpec.fromStr(mode).m_tiles.size();
  while (fan.sys.ObjUtil.compareLT(node.m_subs.size(),size))
  {
    node.m_subs.add(fan.uiBuilder.VbNode.blank(s,node));
  }
  ;
  while (fan.sys.ObjUtil.compareGT(node.m_subs.size(),size))
  {
    node.m_subs.removeAt(-1);
  }
  ;
  return;
}
fan.uiBuilder.VbTileTool.prototype.tb = function()
{
  return this.m_tb;
}
fan.uiBuilder.VbTileTool.prototype.tb$ = function(it)
{
  this.m_tb = it;
  return;
}
fan.uiBuilder.VbTileTool.prototype.m_tb = null;
fan.uiBuilder.VbCanvas = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbCanvas.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_sel = null;
  return;
}
fan.uiBuilder.VbCanvas.prototype.$typeof = function() { return fan.uiBuilder.VbCanvas.$type; }
fan.uiBuilder.VbCanvas.make = function(builder) {
  var self = new fan.uiBuilder.VbCanvas();
  fan.uiBuilder.VbCanvas.make$(self,builder);
  return self;
  }
fan.uiBuilder.VbCanvas.make$ = function(self,builder)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.m_builder = builder;
  self.style().addClass("uiBuilder-ViewBuilder-tool").addClass("uiBuilder-ViewBuilder-canvas");
  self.add((function($this) { var $_u320 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("mask");
      $this.onEvent("mousedown",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          var p = $this.relPos(e.pagePos());
          $this.querySelectorAll("div.ui-UiView").reverse().eachWhile(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u321,
            function(v)
            {
              var s = $this.relPos(v.pagePos());
              if ((fan.sys.ObjUtil.compareLE(s.m_x,p.m_x) && fan.sys.ObjUtil.compareLE(p.m_x,fan.sys.Float.plusInt(s.m_x,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(v.size().m_w,fan.sys.Num.$type)))) && fan.sys.ObjUtil.compareLE(s.m_y,p.m_y) && fan.sys.ObjUtil.compareLE(p.m_y,fan.sys.Float.plusInt(s.m_y,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(v.size().m_h,fan.sys.Num.$type))))))
              {
                var list = fan.sys.List.make(fan.uiBuilder.VbNode.$type);
                builder.flatten(list,fan.sys.ObjUtil.coerce(builder.m_root,fan.uiBuilder.VbNode.$type));
                var sel = list.find(fan.sys.Func.make$closure(
                  fan.uiBuilder.$clos$_u322,
                  function(n)
                  {
                    return fan.sys.ObjUtil.equals(n.m_orig,fan.sys.ObjUtil.coerce(v,fan.ui.UiView.$type).node());
                  }));
                if (sel != null)
                {
                  builder.selNode$(sel);
                  return fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable());
                }
                ;
              }
              ;
              return null;
            }));
          return;
        }));
      $this.onEvent("dblclick",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          if (builder.selNode() == null)
          {
            return;
          }
          ;
          fan.uiBuilder.VbEditor.make(builder,fan.sys.ObjUtil.coerce(builder.selNode(),fan.uiBuilder.VbNode.$type)).open();
          return;
        }));
      $this.onEvent("mousewheel",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          var pageView = fan.sys.ObjUtil.as($this.m_mask.prevSibling(),fan.ui.PageView.$type);
          (function($this) { var $_u323 = pageView; if ($_u323 == null) return null; return $_u323.scrollDelta(0,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(e.delta().m_y,fan.sys.Num.$type))); })($this);
          return;
        }));
      return;
    })),fan.domkit.Box.$type); $this.m_mask = $_u320; return $_u320; })(self));
  return;
}
fan.uiBuilder.VbCanvas.prototype.load = function(node)
{
  var $this = this;
  var v = fan.ui.UiView.instantiate(this.m_builder.m_session,fan.sys.ObjUtil.coerce(node.m_orig,fan.view.ViewNode.$type));
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(this.removeAll(),fan.uiBuilder.VbCanvas.$type).add(v),fan.uiBuilder.VbCanvas.$type).add(this.m_mask);
  fan.ui.ViewResolver.make(this.m_builder.m_session,v).resolve();
  fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("10ms"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u45,
    function(it)
    {
      $this.querySelectorAll("div.ui-BlankView").each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u324,
        function(b)
        {
          if (fan.sys.ObjUtil.is(fan.sys.ObjUtil.as(b,fan.ui.UiView.$type).parentView(),fan.ui.PageView.$type))
          {
            b.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100px"]));
          }
          ;
          b.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#f8f8f8"]));
          b.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#888"]));
          b.add(fan.ui.UiUtil.makeCenterBox(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u29,
            function(it)
            {
              it.icon$(fan.ui.Icon.outline("add","#777"));
              it.label$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("doubleClickEdit")));
              return;
            }))));
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.VbCanvas.prototype.clear = function()
{
  this.removeAll();
  return;
}
fan.uiBuilder.VbCanvas.prototype.onSelect = function()
{
  if (this.m_builder.selNode() == null)
  {
    return;
  }
  ;
  var v = this.nodeToView(this,fan.sys.ObjUtil.coerce(this.m_builder.selNode(),fan.uiBuilder.VbNode.$type));
  if (v == null)
  {
    return;
  }
  ;
  if (this.m_sel != null)
  {
    this.m_sel.style().removeClass("sel-view");
  }
  ;
  this.m_sel = v;
  this.m_sel.style().addClass("sel-view");
  return;
}
fan.uiBuilder.VbCanvas.prototype.nodeToView = function(base,node)
{
  var v = fan.sys.ObjUtil.as(base,fan.ui.UiView.$type);
  if (fan.sys.ObjUtil.equals((function($this) { var $_u325=v; return ($_u325==null) ? null : $_u325.node() }(this)),node.m_orig))
  {
    return v;
  }
  ;
  var kids = base.children();
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,kids.size()); (function($this) { var $_u326 = i; i = fan.sys.Int.increment(i); return $_u326; })(this))
  {
    v = this.nodeToView(kids.get(i),node);
    if (v != null)
    {
      return v;
    }
    ;
  }
  ;
  return null;
}
fan.uiBuilder.VbCanvas.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbCanvas.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbCanvas.prototype.mask = function()
{
  return this.m_mask;
}
fan.uiBuilder.VbCanvas.prototype.mask$ = function(it)
{
  this.m_mask = it;
  return;
}
fan.uiBuilder.VbCanvas.prototype.sel = function()
{
  return this.m_sel;
}
fan.uiBuilder.VbCanvas.prototype.sel$ = function(it)
{
  this.m_sel = it;
  return;
}
fan.uiBuilder.VbCanvas.prototype.m_builder = null;
fan.uiBuilder.VbCanvas.prototype.m_mask = null;
fan.uiBuilder.VbCanvas.prototype.m_sel = null;
fan.uiBuilder.VbNode = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.VbNode.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_parent = null;
  this.m_vars = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_actions = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_datas = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_subs = fan.sys.List.make(fan.uiBuilder.VbNode.$type);
  return;
}
fan.uiBuilder.VbNode.prototype.$typeof = function() { return fan.uiBuilder.VbNode.$type; }
fan.uiBuilder.VbNode.blank = function(session,parent)
{
  if (parent === undefined) parent = null;
  var n = (function($this) { if (parent == null) return "root"; return fan.uiBuilder.ViewBuilder.unique(fan.sys.ObjUtil.coerce(parent,fan.uiBuilder.VbNode.$type),"subView"); })(this);
  var o = session.makeViewNode(n,fan.sys.Map.fromLiteral(["inherit","uiType"],["blank","ui::BlankView"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  var m = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["view"],[fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["inherit"],["blank"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")))],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Dict")));
  return fan.uiBuilder.VbNode.decodeVbNode(o,n,fan.haystack.Etc.makeDict(m));
}
fan.uiBuilder.VbNode.decode = function(session,src)
{
  var view = session.decodeViewNode(src);
  var dict = fan.haystack.TrioReader.make(fan.sys.Str.$in(src)).readDict();
  return fan.uiBuilder.VbNode.decodeVbNode(view,"root",fan.sys.ObjUtil.coerce(dict,fan.haystack.Dict.$type));
}
fan.uiBuilder.VbNode.decodeVbNode = function(orig,$name,dict)
{
  var $this = this;
  var node = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbNode.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u328,
    function(it)
    {
      var meta = fan.sys.ObjUtil.coerce(dict.trap("view",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Dict.$type);
      it.m_orig = orig;
      it.m_$name = $name;
      it.m_inherit = fan.sys.ObjUtil.coerce(meta.get("inherit"),fan.sys.Str.$type.toNullable());
      it.m_template = fan.sys.ObjUtil.coerce(meta.get("templateName"),fan.sys.Str.$type.toNullable());
      return;
    })),fan.uiBuilder.VbNode.$type);
  dict.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u313,
    function(v,n)
    {
      if (fan.sys.ObjUtil.equals(n,"view"))
      {
        return;
      }
      ;
      if (!fan.sys.ObjUtil.is(v,fan.haystack.Dict.$type))
      {
        throw fan.sys.Err.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Expecting Dict value: ",n)," "),fan.sys.ObjUtil.$typeof(v)));
      }
      ;
      var m = fan.sys.ObjUtil.coerce(v,fan.haystack.Dict.$type);
      if (m.has("view"))
      {
        var sub = fan.uiBuilder.VbNode.decodeVbNode(orig.subViews().get(node.m_subs.size()),n,m);
        sub.m_parent = node;
        node.m_subs.add(sub);
        return;
      }
      ;
      if ((m.missing("var") && m.missing("action") && m.missing("expr")))
      {
        var o = orig.child(n,false);
        if (o != null)
        {
          m = fan.haystack.Etc.dictMerge(o.m_meta,m);
        }
        ;
      }
      ;
      if (m.has("var"))
      {
        node.m_vars.add(fan.haystack.Etc.dictMerge(m,fan.sys.Map.fromLiteral(["name"],[n],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"))));
      }
      else
      {
        if (m.has("action"))
        {
          node.m_actions.add(fan.haystack.Etc.dictMerge(m,fan.sys.Map.fromLiteral(["name"],[n],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"))));
        }
        else
        {
          if (m.has("expr"))
          {
            node.m_datas.add(fan.haystack.Etc.dictMerge(m,fan.sys.Map.fromLiteral(["name"],[n],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"))));
          }
          ;
        }
        ;
      }
      ;
      return;
    }));
  return node;
}
fan.uiBuilder.VbNode.toView = function(s,node,children)
{
  if (children === undefined) children = true;
  var $this = this;
  var meta = fan.sys.Map.fromLiteral(["inherit","templateName"],[node.m_inherit,node.m_template],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str?"));
  var view = s.makeViewNode(fan.sys.ObjUtil.coerce(node.m_$name,fan.sys.Obj.$type),meta);
  node.m_vars.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u329,
    function(v)
    {
      fan.uiBuilder.VbNode.merge(view,fan.view.VarNode.$type,v);
      return;
    }));
  node.m_actions.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u267,
    function(a)
    {
      fan.uiBuilder.VbNode.merge(view,fan.view.ActionNode.$type,a);
      return;
    }));
  node.m_datas.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u330,
    function(d)
    {
      fan.uiBuilder.VbNode.merge(view,fan.view.DataNode.$type,d);
      return;
    }));
  if (children)
  {
    node.m_subs.each(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u331,
      function(v)
      {
        view.add(fan.uiBuilder.VbNode.toView(s,v));
        return;
      }));
  }
  ;
  return view;
}
fan.uiBuilder.VbNode.merge = function(view,type,dict)
{
  var orig = view.child(fan.sys.ObjUtil.coerce(dict.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type),false);
  if (orig == null)
  {
    var child = type.make(fan.sys.List.make(fan.sys.Obj.$type.toNullable(), [dict.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Etc.dictRemove(dict,"name")]));
    view.add(fan.sys.ObjUtil.coerce(child,fan.view.AvtNode.$type));
  }
  else
  {
    view.modify(fan.sys.ObjUtil.coerce(orig,fan.view.AvtNode.$type),fan.haystack.Etc.dictRemove(dict,"name"));
  }
  ;
  return;
}
fan.uiBuilder.VbNode.prototype.orig = function()
{
  return this.m_orig;
}
fan.uiBuilder.VbNode.prototype.orig$ = function(it)
{
  this.m_orig = it;
  return;
}
fan.uiBuilder.VbNode.prototype.parent = function()
{
  return this.m_parent;
}
fan.uiBuilder.VbNode.prototype.parent$ = function(it)
{
  this.m_parent = it;
  return;
}
fan.uiBuilder.VbNode.prototype.root = function()
{
  var n = this;
  while (n.m_parent != null)
  {
    n = fan.sys.ObjUtil.coerce(n.m_parent,fan.uiBuilder.VbNode.$type);
  }
  ;
  return n;
}
fan.uiBuilder.VbNode.prototype.$name = function()
{
  return this.m_$name;
}
fan.uiBuilder.VbNode.prototype.$name$ = function(it)
{
  this.m_$name = it;
  return;
}
fan.uiBuilder.VbNode.prototype.inherit = function()
{
  return this.m_inherit;
}
fan.uiBuilder.VbNode.prototype.inherit$ = function(it)
{
  this.m_inherit = it;
  return;
}
fan.uiBuilder.VbNode.prototype.template = function()
{
  return this.m_template;
}
fan.uiBuilder.VbNode.prototype.template$ = function(it)
{
  this.m_template = it;
  return;
}
fan.uiBuilder.VbNode.prototype.icon = function(ns)
{
  try
  {
    var $_u332 = this.m_inherit;
    if (fan.sys.ObjUtil.equals($_u332,"blank"))
    {
      return "blank";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"card"))
    {
      return "card";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"chart"))
    {
      return "chartLine";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"form"))
    {
      return "form";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"text"))
    {
      return "text";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"fandoc"))
    {
      return "fandoc";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"iframe"))
    {
      return "iframe";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"map"))
    {
      return "map";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"table"))
    {
      return "table";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"page"))
    {
      return "page";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"pageBreak"))
    {
      return "pageBreak";
    }
    else if (fan.sys.ObjUtil.equals($_u332,"tile"))
    {
      return "tile";
    }
    else
    {
      var v = ns.view(fan.sys.ObjUtil.coerce(this.m_inherit,fan.sys.Str.$type),false);
      if (v != null)
      {
        return fan.ui.AppPicker.toAppIcon(fan.sys.ObjUtil.coerce(v.app(),fan.skyarc.AppDef.$type));
      }
      ;
      return "view";
    }
    ;
  }
  catch ($_u333)
  {
    $_u333 = fan.sys.Err.make($_u333);
    if ($_u333 instanceof fan.sys.Err)
    {
      var err = $_u333;
      var err;
      err.trace();
      return "question";
    }
    else
    {
      throw $_u333;
    }
  }
  ;
}
fan.uiBuilder.VbNode.prototype.isCompound = function()
{
  return (this.isTile() || this.isPage());
}
fan.uiBuilder.VbNode.prototype.isTile = function()
{
  return fan.sys.ObjUtil.equals(this.m_inherit,"tile");
}
fan.uiBuilder.VbNode.prototype.isPage = function()
{
  return fan.sys.ObjUtil.equals(this.m_inherit,"page");
}
fan.uiBuilder.VbNode.prototype.mode = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { if ($this.isTile()) return (function($this) { var $_u335 = (function($this) { var $_u336 = $this.$var("mode"); if ($_u336 == null) return null; return $_u336.get("defVal"); })($this); if ($_u335 != null) return $_u335; return "4s"; })($this); return null; })(this),fan.sys.Str.$type.toNullable());
}
fan.uiBuilder.VbNode.prototype.vars = function()
{
  return this.m_vars;
}
fan.uiBuilder.VbNode.prototype.vars$ = function(it)
{
  this.m_vars = it;
  return;
}
fan.uiBuilder.VbNode.prototype.actions = function()
{
  return this.m_actions;
}
fan.uiBuilder.VbNode.prototype.actions$ = function(it)
{
  this.m_actions = it;
  return;
}
fan.uiBuilder.VbNode.prototype.datas = function()
{
  return this.m_datas;
}
fan.uiBuilder.VbNode.prototype.datas$ = function(it)
{
  this.m_datas = it;
  return;
}
fan.uiBuilder.VbNode.prototype.subs = function()
{
  return this.m_subs;
}
fan.uiBuilder.VbNode.prototype.subs$ = function(it)
{
  this.m_subs = it;
  return;
}
fan.uiBuilder.VbNode.prototype.$var = function($name)
{
  var $this = this;
  return this.m_vars.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),$name);
    }));
}
fan.uiBuilder.VbNode.prototype.action = function($name)
{
  var $this = this;
  return this.m_actions.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),$name);
    }));
}
fan.uiBuilder.VbNode.prototype.data = function($name)
{
  if ($name === undefined) $name = "data";
  var $this = this;
  return this.m_datas.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u337,
    function(d)
    {
      return fan.sys.ObjUtil.equals(d.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),$name);
    }));
}
fan.uiBuilder.VbNode.prototype.setVar = function($name,val)
{
  var $this = this;
  if (val == null)
  {
    return;
  }
  ;
  var i = this.m_vars.findIndex(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),$name);
    }));
  if (i != null)
  {
    this.m_vars.set(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),fan.haystack.Etc.dictSet(this.m_vars.get(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type)),"defVal",val));
  }
  else
  {
    this.m_vars.add(fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["var","name","kind","defVal"],[fan.haystack.Marker.m_val,$name,(function($this) { if (fan.sys.ObjUtil.equals($name,"presentation")) return "Grid"; return fan.haystack.Kind.fromVal(val); })(this),val],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"))));
  }
  ;
  return;
}
fan.uiBuilder.VbNode.prototype.replace = function(cur,node)
{
  var i = this.m_subs.index(cur);
  this.m_subs.set(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),node);
  return;
}
fan.uiBuilder.VbNode.prototype.dup = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbNode.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u328,
    function(it)
    {
      it.m_orig = $this.m_orig;
      it.m_parent = $this.m_parent;
      it.m_$name = $this.m_$name;
      it.m_inherit = $this.m_inherit;
      it.m_template = $this.m_template;
      it.m_vars = $this.m_vars.dup();
      it.m_actions = $this.m_actions.dup();
      it.m_datas = $this.m_datas.dup();
      it.m_subs = fan.sys.ObjUtil.coerce($this.m_subs.map(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u339,
        function(s)
        {
          return s.dup();
        })),fan.sys.Type.find("uiBuilder::VbNode[]"));
      return;
    })),fan.uiBuilder.VbNode.$type);
}
fan.uiBuilder.VbNode.prototype.dump = function()
{
  fan.sys.ObjUtil.echo(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("# VbNode\n#   name:     ",this.m_$name),"\n#   inherit:  "),this.m_inherit),"\n#   template: "),this.m_template),"\n#   vars:     "),this.m_vars),"\n#   actions:  "),this.m_actions),"\n#   data:     "),this.m_datas),"\n#   subs:     "),this.m_subs));
  return;
}
fan.uiBuilder.VbNode.make = function() {
  var self = new fan.uiBuilder.VbNode();
  fan.uiBuilder.VbNode.make$(self);
  return self;
  }
fan.uiBuilder.VbNode.make$ = function(self)
{
  ;
  return;
}
fan.uiBuilder.VbNode.prototype.m_orig = null;
fan.uiBuilder.VbNode.prototype.m_parent = null;
fan.uiBuilder.VbNode.prototype.m_$name = null;
fan.uiBuilder.VbNode.prototype.m_inherit = null;
fan.uiBuilder.VbNode.prototype.m_template = null;
fan.uiBuilder.VbNode.prototype.m_vars = null;
fan.uiBuilder.VbNode.prototype.m_actions = null;
fan.uiBuilder.VbNode.prototype.m_datas = null;
fan.uiBuilder.VbNode.prototype.m_subs = null;
fan.uiBuilder.VbEdActions = fan.sys.Obj.$extend(fan.uiBuilder.VbEdBox);
fan.uiBuilder.VbEdActions.prototype.$ctor = function()
{
  fan.uiBuilder.VbEdBox.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_names = fan.sys.List.make(fan.domkit.TextField.$type);
  this.m_dises = fan.sys.List.make(fan.domkit.TextField.$type);
  this.m_funcs = fan.sys.List.make(fan.domkit.TextField.$type);
  this.m_origs = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_metas = fan.sys.List.make(fan.ui.Input.$type);
  return;
}
fan.uiBuilder.VbEdActions.prototype.$typeof = function() { return fan.uiBuilder.VbEdActions.$type; }
fan.uiBuilder.VbEdActions.prototype.onUpdate = function()
{
  var $this = this;
  this.m_names.clear();
  this.m_dises.clear();
  this.m_funcs.clear();
  this.m_origs.clear();
  this.m_metas.clear();
  this.m_aux.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["10px"]));
  this.m_aux.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.addAction(null);
          fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("10ms"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u45,
            function(it)
            {
              $this.m_names.last().focus();
              return;
            }));
          return;
        }));
      it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline("add"));
          it.label$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("add"))," "),fan.sys.Pod.find("ui").locale("action")));
          return;
        })));
      return;
    })),fan.domkit.Button.$type));
  this.removeAll();
  this.m_node.m_actions.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u267,
    function(a)
    {
      $this.addAction(a);
      return;
    }));
  return;
}
fan.uiBuilder.VbEdActions.prototype.addAction = function(d)
{
  var $this = this;
  if (d == null)
  {
    var l = this.m_names.map(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u269,
      function(t)
      {
        return fan.sys.Str.trim(t.val());
      }));
    var n = fan.uiBuilder.ViewBuilder.uniqueList(fan.sys.ObjUtil.coerce(l,fan.sys.Type.find("sys::Str[]")),"action");
    d = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","action"],[n,""],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  }
  ;
  var dval = (function($this) { var $_u340 = d.get("dis"); if ($_u340 != null) return $_u340; return (function($this) { var $_u341 = d.get("disKey"); if ($_u341 != null) return $_u341; return ""; })($this); })(this);
  var $name = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(fan.sys.ObjUtil.coerce(d.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      return;
    })),fan.domkit.TextField.$type);
  var dis = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(fan.sys.ObjUtil.coerce(dval,fan.sys.Str.$type));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      return;
    })),fan.domkit.TextField.$type);
  var func = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(fan.sys.ObjUtil.coerce(d.trap("action",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      return;
    })),fan.domkit.TextField.$type);
  var orig = this.actionMeta(fan.sys.ObjUtil.coerce(d,fan.haystack.Dict.$type));
  var meta = fan.ui.Input.makeForTag(this.m_builder.m_session,"meta",orig);
  var rem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().addClass("link");
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 7px"]));
      it.add(fan.ui.Icon.outline("x"));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.removeAction($name);
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  this.m_names.add($name);
  this.m_dises.add(dis);
  this.m_funcs.add(func);
  this.m_origs.add(orig);
  this.m_metas.add(meta);
  var disLabel = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("dis")),":"));
      it.style().addClass("light");
      return;
    })),fan.domkit.Label.$type);
  var funcLabel = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("action")),":"));
      it.style().addClass("light");
      return;
    })),fan.domkit.Label.$type);
  var metaLabel = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("meta")),":"));
      it.style().addClass("light");
      return;
    })),fan.domkit.Label.$type);
  var subGrid = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u2,
    function(it)
    {
      it.cellStyle("*","*","padding: 4px");
      it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"*","width: 85px; text-align: right");
      it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),"*","width: 500px");
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [disLabel,dis]));
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [funcLabel,func]));
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [metaLabel,meta]));
      return;
    })),fan.domkit.GridBox.$type);
  this.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.WellBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u284,
    function(it)
    {
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
      it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u2,
        function(it)
        {
          it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"*","vertical-align: top; padding: 7px 0 0 6px");
          it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),"*","vertical-align: top; padding: 6px 12px 6px 6px; width: 200px");
          it.cellStyle(fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type),"*","padding: 0; border-left: 1px solid #d9d9d9");
          it.cellStyle(fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type),"*","vertical-align: top; padding: 0 0 0 12px; text-align: right");
          it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [fan.ui.UiLabel.make(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u29,
            function(it)
            {
              it.icon$(fan.ui.Icon.outline("action"));
              it.label$("");
              return;
            })),$name,subGrid,rem]));
          return;
        })),fan.domkit.GridBox.$type));
      return;
    })),fan.domkit.WellBox.$type));
  return;
}
fan.uiBuilder.VbEdActions.prototype.removeAction = function($name)
{
  var $this = this;
  var i = this.m_names.findIndex(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u342,
    function(n)
    {
      return fan.sys.ObjUtil.equals(n,$name);
    }));
  if (i == null)
  {
    return;
  }
  ;
  this.m_names.removeAt(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type));
  this.m_dises.removeAt(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type));
  this.m_funcs.removeAt(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type));
  this.m_origs.removeAt(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type));
  this.m_metas.removeAt(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type));
  var k = this.children().get(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type));
  k.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(k.size().m_h,fan.sys.Obj.$type.toNullable())),"px")]));
  k.transition(fan.sys.Map.fromLiteral(["opacity","height"],["0","0px"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("200ms"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      $this.remove(k);
      return;
    }));
  return;
}
fan.uiBuilder.VbEdActions.prototype.onSave = function()
{
  var $this = this;
  var actions = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_names.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u270,
    function(n,i)
    {
      var $name = fan.sys.Str.trim($this.m_names.get(i).val());
      var func = fan.sys.Str.trim($this.m_funcs.get(i).val());
      var meta = fan.sys.ObjUtil.coerce($this.m_metas.get(i).save(),fan.haystack.Dict.$type);
      var orig = $this.m_origs.get(i);
      var action = fan.sys.Map.fromLiteral(["name","action"],[$name,func],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
      var dis = fan.sys.Str.trimToNull($this.m_dises.get(i).val());
      if (dis != null)
      {
        if (fan.sys.Str.contains(dis,"::"))
        {
          action.set("disKey",fan.sys.ObjUtil.coerce(dis,fan.sys.Obj.$type));
        }
        else
        {
          action.set("dis",fan.sys.ObjUtil.coerce(dis,fan.sys.Obj.$type));
        }
        ;
      }
      ;
      meta.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u343,
        function(mv,mn)
        {
          action.set(mn,fan.sys.ObjUtil.coerce(mv,fan.sys.Obj.$type));
          return;
        }));
      orig.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u343,
        function(mv,mn)
        {
          if (!action.containsKey(mn))
          {
            action.remove(mn);
          }
          ;
          return;
        }));
      actions.add(fan.haystack.Etc.makeDict(action));
      return;
    }));
  this.m_node.m_actions = actions;
  return;
}
fan.uiBuilder.VbEdActions.prototype.actionMeta = function(d)
{
  var $this = this;
  return fan.haystack.Etc.dictFindAll(d,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u344,
    function(v,n)
    {
      if (fan.sys.ObjUtil.equals(n,"action"))
      {
        return false;
      }
      ;
      if (fan.sys.ObjUtil.equals(n,"dis"))
      {
        return false;
      }
      ;
      if (fan.sys.ObjUtil.equals(n,"disKey"))
      {
        return false;
      }
      ;
      if (fan.sys.ObjUtil.equals(n,"name"))
      {
        return false;
      }
      ;
      return true;
    }));
}
fan.uiBuilder.VbEdActions.prototype.names = function()
{
  return this.m_names;
}
fan.uiBuilder.VbEdActions.prototype.names$ = function(it)
{
  this.m_names = it;
  return;
}
fan.uiBuilder.VbEdActions.prototype.dises = function()
{
  return this.m_dises;
}
fan.uiBuilder.VbEdActions.prototype.dises$ = function(it)
{
  this.m_dises = it;
  return;
}
fan.uiBuilder.VbEdActions.prototype.funcs = function()
{
  return this.m_funcs;
}
fan.uiBuilder.VbEdActions.prototype.funcs$ = function(it)
{
  this.m_funcs = it;
  return;
}
fan.uiBuilder.VbEdActions.prototype.origs = function()
{
  return this.m_origs;
}
fan.uiBuilder.VbEdActions.prototype.origs$ = function(it)
{
  this.m_origs = it;
  return;
}
fan.uiBuilder.VbEdActions.prototype.metas = function()
{
  return this.m_metas;
}
fan.uiBuilder.VbEdActions.prototype.metas$ = function(it)
{
  this.m_metas = it;
  return;
}
fan.uiBuilder.VbEdActions.make = function() {
  var self = new fan.uiBuilder.VbEdActions();
  fan.uiBuilder.VbEdActions.make$(self);
  return self;
  }
fan.uiBuilder.VbEdActions.make$ = function(self)
{
  fan.uiBuilder.VbEdBox.make$(self);
  ;
  return;
}
fan.uiBuilder.VbEdActions.prototype.m_names = null;
fan.uiBuilder.VbEdActions.prototype.m_dises = null;
fan.uiBuilder.VbEdActions.prototype.m_funcs = null;
fan.uiBuilder.VbEdActions.prototype.m_origs = null;
fan.uiBuilder.VbEdActions.prototype.m_metas = null;
fan.uiBuilder.VbEditor = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbEditor.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbEditor.prototype.$typeof = function() { return fan.uiBuilder.VbEditor.$type; }
fan.uiBuilder.VbEditor.make = function(builder,orig) {
  var self = new fan.uiBuilder.VbEditor();
  fan.uiBuilder.VbEditor.make$(self,builder,orig);
  return self;
  }
fan.uiBuilder.VbEditor.make$ = function(self,builder,orig)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.m_builder = builder;
  self.m_origIx = (function($this) { if (orig.m_parent == null) return null; return orig.m_parent.m_subs.index(orig); })(self);
  self.m_node = orig.dup();
  self.m_aux = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["4px"]));
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_tabBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.TabBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u346,
    function(it)
    {
      it.addTab(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("view")),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbEdView.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u347,
        function(it)
        {
          return;
        })),fan.uiBuilder.VbEdView.$type));
      it.addTab(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("vars")),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbEdVars.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u348,
        function(it)
        {
          return;
        })),fan.uiBuilder.VbEdVars.$type));
      it.addTab(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("actions")),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbEdActions.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u349,
        function(it)
        {
          return;
        })),fan.uiBuilder.VbEdActions.$type));
      it.addTab(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("source")),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbEdSrc.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u350,
        function(it)
        {
          return;
        })),fan.uiBuilder.VbEdSrc.$type));
      it.onBeforeTab(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u351,
        function(t,i)
        {
          return $this.onValidate(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type.toNullable()));
        }));
      $this.prime(fan.sys.ObjUtil.coerce(it.children().first(),fan.uiBuilder.VbEdBox.$type));
      return;
    })),fan.ui.TabBox.$type);
  self.m_dialog = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.ContentDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      it.title$(null);
      it.width$("920px");
      it.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px"]));
          it.style().trap("minHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["539px"]));
          it.dir$(fan.domkit.Dir.m_down);
          it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["44px","100%"]));
          fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with($this.m_tabBox.tabs(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.style().addClass("ui-TabBox flush");
              it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
              it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px 0"]));
              return;
            })),fan.dom.Elem.$type)),fan.domkit.SashBox.$type).add($this.m_tabBox);
          return;
        })),fan.domkit.SashBox.$type));
      it.aux$($this.m_aux);
      it.addButton("ok",null,true);
      it.addButton("cancel");
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          if (fan.sys.ObjUtil.equals(key,"ok"))
          {
            if (!$this.onValidate())
            {
              return false;
            }
            ;
            if (orig.m_parent == null)
            {
              builder.m_root = $this.m_node;
            }
            else
            {
              orig.m_parent.replace(orig,$this.m_node);
            }
            ;
            builder.selNode$($this.m_node);
            builder.onSave();
          }
          ;
          return true;
        }));
      return;
    })),fan.ui.ContentDialog.$type);
  return;
}
fan.uiBuilder.VbEditor.prototype.open = function()
{
  this.m_dialog.open();
  return;
}
fan.uiBuilder.VbEditor.prototype.onValidate = function(newIndex)
{
  if (newIndex === undefined) newIndex = null;
  try
  {
    var ed = fan.sys.ObjUtil.coerce(this.m_tabBox.selItem(),fan.uiBuilder.VbEdBox.$type);
    ed.onSave();
    var p = this.m_node;
    if (p.m_parent != null)
    {
      p = p.m_parent.dup();
      p.m_subs.set(fan.sys.ObjUtil.coerce(this.m_origIx,fan.sys.Int.$type),this.m_node);
    }
    ;
    fan.uiBuilder.VbNode.toView(this.m_builder.m_session,p).encode();
    if (newIndex != null)
    {
      this.prime(fan.sys.ObjUtil.coerce(this.m_tabBox.children().get(fan.sys.ObjUtil.coerce(newIndex,fan.sys.Int.$type)),fan.uiBuilder.VbEdBox.$type));
    }
    ;
    return true;
  }
  catch ($_u352)
  {
    $_u352 = fan.sys.Err.make($_u352);
    if ($_u352 instanceof fan.sys.Err)
    {
      var err = $_u352;
      var err;
      fan.ui.Flash.showErr(this.m_tabBox,err);
      return false;
    }
    else
    {
      throw $_u352;
    }
  }
  ;
}
fan.uiBuilder.VbEditor.prototype.prime = function(ed)
{
  this.m_aux.removeAll();
  ed.m_builder = this.m_builder;
  ed.m_node = this.m_node;
  ed.m_aux = this.m_aux;
  ed.onUpdate();
  return;
}
fan.uiBuilder.VbEditor.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbEditor.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbEditor.prototype.origIx = function()
{
  return this.m_origIx;
}
fan.uiBuilder.VbEditor.prototype.origIx$ = function(it)
{
  this.m_origIx = it;
  return;
}
fan.uiBuilder.VbEditor.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbEditor.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbEditor.prototype.tabBox = function()
{
  return this.m_tabBox;
}
fan.uiBuilder.VbEditor.prototype.tabBox$ = function(it)
{
  this.m_tabBox = it;
  return;
}
fan.uiBuilder.VbEditor.prototype.aux = function()
{
  return this.m_aux;
}
fan.uiBuilder.VbEditor.prototype.aux$ = function(it)
{
  this.m_aux = it;
  return;
}
fan.uiBuilder.VbEditor.prototype.dialog = function()
{
  return this.m_dialog;
}
fan.uiBuilder.VbEditor.prototype.dialog$ = function(it)
{
  this.m_dialog = it;
  return;
}
fan.uiBuilder.VbEditor.prototype.m_builder = null;
fan.uiBuilder.VbEditor.prototype.m_origIx = null;
fan.uiBuilder.VbEditor.prototype.m_node = null;
fan.uiBuilder.VbEditor.prototype.m_tabBox = null;
fan.uiBuilder.VbEditor.prototype.m_aux = null;
fan.uiBuilder.VbEditor.prototype.m_dialog = null;
fan.uiBuilder.VbBatchBind = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.VbBatchBind.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_names = fan.sys.List.make(fan.sys.Str.$type);
  return;
}
fan.uiBuilder.VbBatchBind.prototype.$typeof = function() { return fan.uiBuilder.VbBatchBind.$type; }
fan.uiBuilder.VbBatchBind.invoke = function(view)
{
  var $this = this;
  var b = fan.uiBuilder.VbBatchBind.make(view);
  if (b.m_names.isEmpty())
  {
    fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AlertDialog.make(),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u61,
      function(it)
      {
        it.title$("Batch Bind");
        it.width$("500px");
        it.icon$(fan.ui.Icon.outline("warn",fan.ui.Colors.m_yellow));
        it.msg$("No inputs to bind");
        it.info$("Batch bind works by binding a top-level input to all\nthe sub-view inputs with the same name and type.");
        it.addButton("ok",null,true);
        return;
      })),fan.ui.AlertDialog.$type).open();
    return;
  }
  ;
  b.open();
  return;
}
fan.uiBuilder.VbBatchBind.make = function(builder) {
  var self = new fan.uiBuilder.VbBatchBind();
  fan.uiBuilder.VbBatchBind.make$(self,builder);
  return self;
  }
fan.uiBuilder.VbBatchBind.make$ = function(self,builder)
{
  var $this = self;
  ;
  self.m_builder = builder;
  self.m_root = fan.sys.ObjUtil.coerce(builder.m_root,fan.uiBuilder.VbNode.$type);
  self.m_tops = self.m_root.m_vars.findAll(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return v.has("input");
    }));
  var map = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Int"));
  self.findNameKeys(self.m_root,map);
  map.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u353,
    function(v,k)
    {
      if (fan.sys.ObjUtil.compareLT(v,2))
      {
        return;
      }
      ;
      var s = fan.sys.Str.split(k,fan.sys.ObjUtil.coerce(58,fan.sys.Int.$type.toNullable()));
      if ($this.m_tops.any(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u354,
        function(t)
        {
          return (fan.sys.ObjUtil.equals(t.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),s.get(0)) && fan.sys.ObjUtil.equals(t.trap("kind",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),s.get(1)));
        })))
      {
        $this.m_names.add(fan.sys.ObjUtil.coerce(s.first(),fan.sys.Str.$type));
      }
      ;
      return;
    }));
  self.m_names = self.m_names.sort();
  return;
}
fan.uiBuilder.VbBatchBind.prototype.findNameKeys = function(node,map)
{
  var $this = this;
  node.m_orig.vars().each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u311,
    function(v)
    {
      if (v.isInput())
      {
        var key = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",v.m_$name),":"),v.kind());
        map.set(key,fan.sys.ObjUtil.coerce(fan.sys.Int.plus(fan.sys.ObjUtil.coerce((function($this) { var $_u355 = map.get(key); if ($_u355 != null) return $_u355; return fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()); })($this),fan.sys.Int.$type),1),fan.sys.Obj.$type.toNullable()));
      }
      ;
      return;
    }));
  node.m_vars.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u329,
    function(v)
    {
      if ((v.has("input") && v.has("kind")))
      {
        var key = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))),":"),v.trap("kind",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])));
        map.set(key,fan.sys.ObjUtil.coerce(fan.sys.Int.plus(fan.sys.ObjUtil.coerce((function($this) { var $_u356 = map.get(key); if ($_u356 != null) return $_u356; return fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()); })($this),fan.sys.Int.$type),1),fan.sys.Obj.$type.toNullable()));
      }
      ;
      return;
    }));
  node.m_subs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u357,
    function(s)
    {
      $this.findNameKeys(s,map);
      return;
    }));
  return;
}
fan.uiBuilder.VbBatchBind.prototype.open = function()
{
  var $this = this;
  var list = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ListButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u11,
    function(it)
    {
      it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100px"]));
      it.items$($this.m_names);
      return;
    })),fan.domkit.ListButton.$type);
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.ContentDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      it.title$("Batch Bind");
      it.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Icon.outline("binding",fan.ui.Colors.m_purple).resize("48px"),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u106,
            function(it)
            {
              it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px 20px 0 10px"]));
              it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["left"]));
              return;
            })),fan.ui.Icon.$type)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u89,
            function(it)
            {
              it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px 10px 0 10px"]));
              it.text$("Bind all inputs with the selected name to the\ntop-level view input.");
              return;
            })),fan.dom.Elem.$type)),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u2,
            function(it)
            {
              it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
              it.cellStyle("*","*","padding:4px");
              it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u8,
                function(it)
                {
                  it.text$("Input");
                  return;
                })),fan.domkit.Label.$type),list]));
              return;
            })),fan.domkit.GridBox.$type));
          return;
        })),fan.domkit.Box.$type));
      it.addButton("ok",null,true);
      it.addButton("cancel");
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          if (fan.sys.ObjUtil.equals(key,"ok"))
          {
            $this.commit(fan.sys.ObjUtil.coerce(list.sel().item(),fan.sys.Str.$type));
          }
          ;
          return true;
        }));
      return;
    })),fan.ui.ContentDialog.$type).open();
  return;
}
fan.uiBuilder.VbBatchBind.prototype.commit = function($name)
{
  var $this = this;
  var input = this.m_root.m_vars.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),$name);
    }));
  this.m_root.m_subs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u358,
    function(sub)
    {
      $this.bindInput(sub,fan.sys.ObjUtil.coerce(input,fan.haystack.Dict.$type));
      return;
    }));
  this.m_builder.onSave();
  return;
}
fan.uiBuilder.VbBatchBind.prototype.bindInput = function(node,top)
{
  var $this = this;
  var $name = top.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
  var kind = top.trap("kind",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
  var input = node.m_vars.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return (fan.sys.ObjUtil.equals(v.get("name"),$name) && fan.sys.ObjUtil.equals(v.get("kind"),kind));
    }));
  if (input != null)
  {
    var p = node.m_parent;
    var path = "";
    while (p != null)
    {
      path = fan.sys.Str.plus(path,"../");
      p = p.m_parent;
    }
    ;
    var $var = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["var","name","kind","binding"],[fan.haystack.Marker.m_val,input.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),input.trap("kind",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",path),""),top.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])))],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")));
    var i = node.m_vars.findIndex(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u288,
      function(v)
      {
        return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),$name);
      }));
    node.m_vars.set(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),$var);
  }
  ;
  node.m_subs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u358,
    function(sub)
    {
      $this.bindInput(sub,top);
      return;
    }));
  return;
}
fan.uiBuilder.VbBatchBind.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbBatchBind.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbBatchBind.prototype.root = function()
{
  return this.m_root;
}
fan.uiBuilder.VbBatchBind.prototype.root$ = function(it)
{
  this.m_root = it;
  return;
}
fan.uiBuilder.VbBatchBind.prototype.tops = function()
{
  return this.m_tops;
}
fan.uiBuilder.VbBatchBind.prototype.tops$ = function(it)
{
  this.m_tops = it;
  return;
}
fan.uiBuilder.VbBatchBind.prototype.names = function()
{
  return this.m_names;
}
fan.uiBuilder.VbBatchBind.prototype.names$ = function(it)
{
  this.m_names = it;
  return;
}
fan.uiBuilder.VbBatchBind.prototype.m_builder = null;
fan.uiBuilder.VbBatchBind.prototype.m_root = null;
fan.uiBuilder.VbBatchBind.prototype.m_tops = null;
fan.uiBuilder.VbBatchBind.prototype.m_names = null;
fan.uiBuilder.ViewBuilder = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiBuilder.ViewBuilder.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.ViewBuilder.prototype.$typeof = function() { return fan.uiBuilder.ViewBuilder.$type; }
fan.uiBuilder.ViewBuilder.make = function() {
  var self = new fan.uiBuilder.ViewBuilder();
  fan.uiBuilder.ViewBuilder.make$(self);
  return self;
  }
fan.uiBuilder.ViewBuilder.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  self.m_tree = fan.uiBuilder.VbTree.make(self);
  self.m_inspector = fan.uiBuilder.VbInspector.make(self);
  self.m_canvas = fan.uiBuilder.VbCanvas.make(self);
  self.m_saveSpinner = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.ui.Colors.m_darkGreen]));
      it.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
      it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 12px 0 10px"]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["24px"]));
      it.style().trap("lineHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["24px"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
      it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
      it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["20px"]));
      fan.sys.ObjUtil.coerce(it.add(fan.ui.Spinner.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u39,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline("spinner","#fff"));
          it.iconSize$("16px");
          it.inline$(true);
          return;
        }))),fan.domkit.Box.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().trap("marginLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
          it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("saving")));
          return;
        })),fan.domkit.Label.$type));
      return;
    })),fan.domkit.Box.$type);
  self.m_sidebar = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["30%","10px","70%","3px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_tree),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          return;
        })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add($this.m_inspector),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          return;
        })),fan.domkit.Box.$type));
      return;
    })),fan.domkit.SashBox.$type);
  self.m_viewBar = fan.ui.UiViewBar.make(self);
  var vbc = self.m_viewBar.findControls();
  vbc.children().get(-4).style().trap("marginLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["20px"]));
  vbc.children().get(-3).style().trap("marginLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["20px"]));
  vbc.children().get(-2).style().trap("marginLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["20px"]));
  vbc.children().get(-2).style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
  vbc.children().get(-1).style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
  vbc.add(self.m_saveSpinner);
  self.style().addClass("uiBuilder-ViewBuilder");
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, [$this.m_viewBar.m_height,"100%"]));
      fan.sys.ObjUtil.coerce(it.add($this.m_viewBar),fan.domkit.SashBox.$type).add((function($this) { var $_u359 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u6,
        function(it)
        {
          it.dir$(fan.domkit.Dir.m_right);
          it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["70%","10px","30%"]));
          fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u23,
            function(it)
            {
              it.style().trap("paddingBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
              it.add($this.m_canvas);
              return;
            })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u23,
            function(it)
            {
              return;
            })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add($this.m_sidebar);
          return;
        })),fan.domkit.SashBox.$type); $this.m_sash = $_u359; return $_u359; })($this));
      return;
    })),fan.domkit.SashBox.$type));
  return;
}
fan.uiBuilder.ViewBuilder.prototype.onUpdate = function()
{
  var $this = this;
  this.m_viewBar.update();
  var ref = this.$var("viewRef");
  this.m_rec = this.data().find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u33,
    function(r)
    {
      return fan.sys.ObjUtil.equals(r.id(),ref);
    }));
  if ((this.m_rec == null && ref != null))
  {
    this.update(fan.sys.Map.fromLiteral(["viewRef"],[null],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")));
    return;
  }
  ;
  this.fireSelect();
  if (this.m_rec == null)
  {
    this.m_tree.clear();
    this.m_canvas.clear();
    this.selNode$(null);
  }
  else
  {
    this.m_root = fan.uiBuilder.VbNode.decode(this.m_session,fan.sys.ObjUtil.coerce(this.m_rec.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type));
    this.m_tree.load(fan.sys.ObjUtil.coerce(this.m_root,fan.uiBuilder.VbNode.$type));
    this.m_canvas.load(fan.sys.ObjUtil.coerce(this.m_root,fan.uiBuilder.VbNode.$type));
    var vsel = null;
    if (this.selNode() != null)
    {
      var list = fan.sys.List.make(fan.uiBuilder.VbNode.$type);
      this.flatten(list,fan.sys.ObjUtil.coerce(this.m_root,fan.uiBuilder.VbNode.$type));
      vsel = list.find(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u322,
        function(n)
        {
          return fan.sys.ObjUtil.equals(n.m_$name,$this.selNode().m_$name);
        }));
    }
    ;
    this.selNode$((function($this) { var $_u360 = vsel; if ($_u360 != null) return $_u360; return $this.m_root; })(this));
  }
  ;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.sel = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { if ($this.m_rec == null) return fan.haystack.Dict.$type.emptyList(); return fan.sys.List.make(fan.haystack.Dict.$type.toNullable(), [$this.m_rec]); })(this),fan.sys.Type.find("haystack::Dict[]"));
}
fan.uiBuilder.ViewBuilder.prototype.onSave = function()
{
  var $this = this;
  this.showSaving();
  var viewNode = fan.uiBuilder.VbNode.toView(this.m_session,fan.sys.ObjUtil.coerce(this.m_root,fan.uiBuilder.VbNode.$type));
  this.m_rec = fan.haystack.Etc.dictSet(this.m_rec,"src",viewNode.encode());
  var req = fan.haystack.Etc.makeDictGrid(fan.sys.Map.fromLiteral(["commit"],["update"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),fan.sys.ObjUtil.coerce(this.m_rec,fan.haystack.Dict.$type));
  this.m_session.m_api.call("commit",req).onOk(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u121,
    function(res)
    {
      $this.update();
      return;
    })).onErr(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u161,
    function(err)
    {
      fan.ui.Flash.showErr($this,err);
      return;
    })).onComplete(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u12,
    function(it)
    {
      $this.hideSaving();
      return;
    }));
  return;
}
fan.uiBuilder.ViewBuilder.prototype.onNew = function()
{
  var $this = this;
  fan.uiBuilder.VbNew.make(this).invoke(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u362,
    function(dlg,rec)
    {
      var ax = fan.ui.Flash.showActivity(fan.sys.ObjUtil.coerce(dlg.content(),fan.dom.Elem.$type),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("working")),"..."));
      var f = $this.m_session.m_api.call("recNew",fan.haystack.Etc.makeDictGrid(fan.sys.Map.fromLiteral(["templateName"],["view"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),rec));
      f.onOk(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u121,
        function(res)
        {
          ax.onClose(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u160,
            function(it)
            {
              dlg.close();
              $this.update(fan.sys.Map.fromLiteral(["viewRef"],[res.first().id()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Ref")));
              $this.m_session.reload();
              return;
            }));
          ax.close();
          return;
        }));
      f.onErr(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u161,
        function(err)
        {
          ax.close();
          fan.ui.Flash.showErr(fan.sys.ObjUtil.coerce(dlg.content(),fan.dom.Elem.$type),err);
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.ViewBuilder.prototype.onBatchBind = function()
{
  fan.uiBuilder.VbBatchBind.invoke(this);
  return;
}
fan.uiBuilder.ViewBuilder.prototype.onToggleSidebar = function()
{
  this.m_sash.sizes$((function($this) { if (fan.sys.Str.contains(fan.sys.ObjUtil.toStr($this.m_sash.firstChild().style().effective("width")),"100%")) return fan.sys.List.make(fan.sys.Str.$type, ["70%","10px","30%"]); return fan.sys.List.make(fan.sys.Str.$type, ["100%","0px","0px"]); })(this));
  return;
}
fan.uiBuilder.ViewBuilder.prototype.selNode = function()
{
  return this.m_selNode;
}
fan.uiBuilder.ViewBuilder.prototype.selNode$ = function(it)
{
  this.m_selNode = it;
  this.m_canvas.onSelect();
  this.m_tree.onSelect();
  this.m_inspector.onSelect();
  return;
}
fan.uiBuilder.ViewBuilder.prototype.flatten = function(acc,n)
{
  var $this = this;
  acc.add(n);
  n.m_subs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u358,
    function(sub)
    {
      $this.flatten(acc,sub);
      return;
    }));
  return;
}
fan.uiBuilder.ViewBuilder.prototype.showSaving = function()
{
  this.m_saveSpinner.transition(fan.sys.Map.fromLiteral(["opacity"],["1"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"));
  return;
}
fan.uiBuilder.ViewBuilder.prototype.hideSaving = function()
{
  var $this = this;
  fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("500ms"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u45,
    function(it)
    {
      $this.m_saveSpinner.transition(fan.sys.Map.fromLiteral(["opacity"],["0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("200ms"));
      return;
    }));
  return;
}
fan.uiBuilder.ViewBuilder.unique = function(n,base)
{
  var $this = this;
  var list = fan.sys.List.make(fan.sys.Str.$type).addAll(fan.sys.ObjUtil.coerce(n.m_vars.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u364,
    function(v)
    {
      return v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
    })),fan.sys.Type.find("sys::Str[]"))).addAll(fan.sys.ObjUtil.coerce(n.m_actions.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u364,
    function(v)
    {
      return v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
    })),fan.sys.Type.find("sys::Str[]"))).addAll(fan.sys.ObjUtil.coerce(n.m_datas.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u364,
    function(v)
    {
      return v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
    })),fan.sys.Type.find("sys::Str[]"))).addAll(fan.sys.ObjUtil.coerce(n.m_subs.map(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u365,
    function(v)
    {
      return v.m_$name;
    })),fan.sys.Type.find("sys::Str[]")));
  return fan.uiBuilder.ViewBuilder.uniqueList(list,base);
}
fan.uiBuilder.ViewBuilder.uniqueList = function(names,base)
{
  var c = 1;
  var s = base;
  while (names.contains(s))
  {
    s = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",base),""),fan.sys.ObjUtil.coerce((function($this) { var $_u366 = c; c = fan.sys.Int.increment(c); return $_u366; })(this),fan.sys.Obj.$type.toNullable()));
  }
  ;
  return s;
}
fan.uiBuilder.ViewBuilder.prototype.toTrio = function(d,blacklist)
{
  var $this = this;
  var buf = fan.sys.StrBuf.make();
  fan.haystack.Etc.dictNames(d).each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u145,
    function(n)
    {
      if (blacklist.contains(n))
      {
        return;
      }
      ;
      var v = d.get(n);
      buf.join((function($this) { if (fan.sys.ObjUtil.equals(v,fan.haystack.Marker.m_val)) return n; return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",n),":"),fan.haystack.Etc.toAxon(v)); })($this),", ");
      return;
    }));
  return buf.toStr();
}
fan.uiBuilder.ViewBuilder.prototype.fromTrio = function(trio)
{
  var $this = this;
  var map = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
  fan.ui.UiUtil.parseTrio(trio).each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u368,
    function(v)
    {
      map.set(v.m_$name,fan.sys.ObjUtil.coerce(v.defVal(),fan.sys.Obj.$type));
      return;
    }));
  return fan.haystack.Etc.makeDict(map);
}
fan.uiBuilder.ViewBuilder.prototype.rec = function()
{
  return this.m_rec;
}
fan.uiBuilder.ViewBuilder.prototype.rec$ = function(it)
{
  this.m_rec = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.root = function()
{
  return this.m_root;
}
fan.uiBuilder.ViewBuilder.prototype.root$ = function(it)
{
  this.m_root = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.viewBar = function()
{
  return this.m_viewBar;
}
fan.uiBuilder.ViewBuilder.prototype.viewBar$ = function(it)
{
  this.m_viewBar = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.sash = function()
{
  return this.m_sash;
}
fan.uiBuilder.ViewBuilder.prototype.sash$ = function(it)
{
  this.m_sash = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.sidebar = function()
{
  return this.m_sidebar;
}
fan.uiBuilder.ViewBuilder.prototype.sidebar$ = function(it)
{
  this.m_sidebar = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.saveSpinner = function()
{
  return this.m_saveSpinner;
}
fan.uiBuilder.ViewBuilder.prototype.saveSpinner$ = function(it)
{
  this.m_saveSpinner = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.tree = function()
{
  return this.m_tree;
}
fan.uiBuilder.ViewBuilder.prototype.tree$ = function(it)
{
  this.m_tree = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.inspector = function()
{
  return this.m_inspector;
}
fan.uiBuilder.ViewBuilder.prototype.inspector$ = function(it)
{
  this.m_inspector = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.canvas = function()
{
  return this.m_canvas;
}
fan.uiBuilder.ViewBuilder.prototype.canvas$ = function(it)
{
  this.m_canvas = it;
  return;
}
fan.uiBuilder.ViewBuilder.prototype.m_selNode = null;
fan.uiBuilder.ViewBuilder.prototype.m_rec = null;
fan.uiBuilder.ViewBuilder.prototype.m_root = null;
fan.uiBuilder.ViewBuilder.prototype.m_viewBar = null;
fan.uiBuilder.ViewBuilder.prototype.m_sash = null;
fan.uiBuilder.ViewBuilder.prototype.m_sidebar = null;
fan.uiBuilder.ViewBuilder.prototype.m_saveSpinner = null;
fan.uiBuilder.ViewBuilder.prototype.m_tree = null;
fan.uiBuilder.ViewBuilder.prototype.m_inspector = null;
fan.uiBuilder.ViewBuilder.prototype.m_canvas = null;
fan.uiBuilder.VbEdSrc = fan.sys.Obj.$extend(fan.uiBuilder.VbEdBox);
fan.uiBuilder.VbEdSrc.prototype.$ctor = function()
{
  fan.uiBuilder.VbEdBox.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbEdSrc.prototype.$typeof = function() { return fan.uiBuilder.VbEdSrc.$type; }
fan.uiBuilder.VbEdSrc.prototype.onUpdate = function()
{
  var $this = this;
  var src = fan.uiBuilder.VbNode.toView(this.m_builder.m_session,fan.sys.ObjUtil.coerce(this.m_node,fan.uiBuilder.VbNode.$type),false).encode();
  this.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
  fan.sys.ObjUtil.coerce(this.removeAll(),fan.uiBuilder.VbEdSrc.$type).add(fan.sys.ObjUtil.coerce((function($this) { var $_u369 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextArea.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u100,
    function(it)
    {
      it.style().addClass("ui-font-mono");
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["472px"]));
      it.val$(src);
      return;
    })),fan.domkit.TextArea.$type); $this.m_area = $_u369; return $_u369; })(this),fan.dom.Elem.$type));
  return;
}
fan.uiBuilder.VbEdSrc.prototype.onSave = function()
{
  var copy = fan.uiBuilder.VbNode.decode(this.m_builder.m_session,fan.sys.Str.trim(this.m_area.val()));
  this.m_node.m_inherit = copy.m_inherit;
  this.m_node.m_template = copy.m_template;
  this.m_node.m_vars = copy.m_vars;
  this.m_node.m_actions = copy.m_actions;
  this.m_node.m_datas = copy.m_datas;
  return;
}
fan.uiBuilder.VbEdSrc.prototype.area = function()
{
  return this.m_area;
}
fan.uiBuilder.VbEdSrc.prototype.area$ = function(it)
{
  this.m_area = it;
  return;
}
fan.uiBuilder.VbEdSrc.make = function() {
  var self = new fan.uiBuilder.VbEdSrc();
  fan.uiBuilder.VbEdSrc.make$(self);
  return self;
  }
fan.uiBuilder.VbEdSrc.make$ = function(self)
{
  fan.uiBuilder.VbEdBox.make$(self);
  return;
}
fan.uiBuilder.VbEdSrc.prototype.m_area = null;
fan.uiBuilder.VbTree = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbTree.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_nodes = fan.sys.List.make(fan.uiBuilder.VbTreeNode.$type);
  return;
}
fan.uiBuilder.VbTree.prototype.$typeof = function() { return fan.uiBuilder.VbTree.$type; }
fan.uiBuilder.VbTree.make = function(builder) {
  var self = new fan.uiBuilder.VbTree();
  fan.uiBuilder.VbTree.make$(self,builder);
  return self;
  }
fan.uiBuilder.VbTree.make$ = function(self,builder)
{
  fan.domkit.Box.make$(self);
  ;
  self.m_builder = builder;
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  self.style().addClass("uiBuilder-ViewBuilder-tool").addClass("uiBuilder-ViewBuilder-tree");
  self.style().trap("outline",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  self.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
  return;
}
fan.uiBuilder.VbTree.prototype.load = function(node)
{
  this.m_nodes.clear();
  this.addNode(node);
  fan.sys.ObjUtil.coerce(this.removeAll(),fan.uiBuilder.VbTree.$type).addAll(this.m_nodes);
  return;
}
fan.uiBuilder.VbTree.prototype.clear = function()
{
  this.m_nodes.clear();
  this.removeAll();
  return;
}
fan.uiBuilder.VbTree.prototype.onSelect = function()
{
  var $this = this;
  this.m_nodes.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u370,
    function(n)
    {
      n.sel$(fan.sys.ObjUtil.equals(n.m_node,$this.m_builder.selNode()));
      return;
    }));
  return;
}
fan.uiBuilder.VbTree.prototype.addNode = function(node)
{
  var $this = this;
  this.m_nodes.add(fan.uiBuilder.VbTreeNode.make(this,node));
  node.m_subs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u331,
    function(v)
    {
      $this.addNode(v);
      return;
    }));
  return;
}
fan.uiBuilder.VbTree.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbTree.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbTree.prototype.nodes = function()
{
  return this.m_nodes;
}
fan.uiBuilder.VbTree.prototype.nodes$ = function(it)
{
  this.m_nodes = it;
  return;
}
fan.uiBuilder.VbTree.prototype.m_builder = null;
fan.uiBuilder.VbTree.prototype.m_nodes = null;
fan.uiBuilder.VbTreeNode = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbTreeNode.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_depth$Store = "_once_";
  this.m_icon$Store = "_once_";
  this.m_sel = false;
  return;
}
fan.uiBuilder.VbTreeNode.prototype.$typeof = function() { return fan.uiBuilder.VbTreeNode.$type; }
fan.uiBuilder.VbTreeNode.make = function(tree,node) {
  var self = new fan.uiBuilder.VbTreeNode();
  fan.uiBuilder.VbTreeNode.make$(self,tree,node);
  return self;
  }
fan.uiBuilder.VbTreeNode.make$ = function(self,tree,node)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.m_tree = tree;
  self.m_node = node;
  self.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("2px 4px 2px ",fan.sys.ObjUtil.coerce(fan.sys.Int.plus(8,fan.sys.Int.mult(self.depth(),20)),fan.sys.Obj.$type.toNullable())),"px")]));
  self.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["28px"]));
  self.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
  self.style().trap("userSelect",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u371,
    function(it)
    {
      tree.m_builder.selNode$(node);
      return;
    }));
  self.onEvent("dblclick",false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u44,
    function(e)
    {
      var sel = tree.m_builder.selNode();
      fan.uiBuilder.VbEditor.make(tree.m_builder,fan.sys.ObjUtil.coerce(sel,fan.uiBuilder.VbNode.$type)).open();
      return;
    }));
  var $name = (function($this) { if (node.m_parent == null) return tree.m_builder.m_rec.trap("view",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])); return node.m_$name; })(self);
  self.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.icon$(fan.ui.Icon.outline($this.icon(),fan.ui.Colors.m_darkGrey));
      it.label$(fan.sys.ObjUtil.coerce($name,fan.sys.Str.$type.toNullable()));
      return;
    })));
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      if (node.isPage())
      {
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u1,
          function(it)
          {
            it.style().addClass("link");
            it.onAction(fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u1,
              function(it)
              {
                var ref = tree.m_builder.selNode();
                var blank = fan.uiBuilder.VbNode.blank(tree.m_builder.m_session,node);
                if (fan.sys.ObjUtil.equals(ref,node))
                {
                  node.m_subs.add(blank);
                }
                else
                {
                  var i = node.m_subs.index(fan.sys.ObjUtil.coerce(ref,fan.uiBuilder.VbNode.$type));
                  node.m_subs.insert(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),1),blank);
                }
                ;
                tree.m_builder.selNode$(blank);
                tree.m_builder.onSave();
                return;
              }));
            it.add(fan.ui.Icon.outline("add"));
            return;
          })),fan.domkit.Button.$type));
      }
      ;
      if (node.isCompound())
      {
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u1,
          function(it)
          {
            it.style().addClass("link");
            it.onAction(fan.sys.Func.make$closure(
              fan.uiBuilder.$clos$_u1,
              function(it)
              {
                fan.uiBuilder.VbNodeReorder.make(tree.m_builder,node).dialog().open();
                return;
              }));
            it.add(fan.ui.Icon.outline("reorder"));
            return;
          })),fan.domkit.Button.$type));
      }
      ;
      it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          it.style().addClass("link");
          it.onAction(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              fan.uiBuilder.VbNodeRemover.make(tree.m_builder,node).dialog().open();
              return;
            }));
          it.add(fan.ui.Icon.outline("x"));
          return;
        })),fan.domkit.Button.$type));
      return;
    })),fan.domkit.FlowBox.$type));
  return;
}
fan.uiBuilder.VbTreeNode.prototype.depth = function()
{
  if (this.m_depth$Store === "_once_")
  {
    this.m_depth$Store = fan.sys.ObjUtil.coerce(this.depth$Once(),fan.sys.Obj.$type.toNullable());
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_depth$Store,fan.sys.Int.$type);
}
fan.uiBuilder.VbTreeNode.prototype.icon = function()
{
  if (this.m_icon$Store === "_once_")
  {
    this.m_icon$Store = this.icon$Once();
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_icon$Store,fan.sys.Str.$type);
}
fan.uiBuilder.VbTreeNode.prototype.sel = function()
{
  return this.m_sel;
}
fan.uiBuilder.VbTreeNode.prototype.sel$ = function(it)
{
  this.m_sel = it;
  this.style().toggleClass("domkit-sel",fan.sys.ObjUtil.coerce(it,fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiBuilder.VbTreeNode.prototype.tree = function()
{
  return this.m_tree;
}
fan.uiBuilder.VbTreeNode.prototype.tree$ = function(it)
{
  this.m_tree = it;
  return;
}
fan.uiBuilder.VbTreeNode.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbTreeNode.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbTreeNode.prototype.depth$Once = function()
{
  var d = 0;
  var p = this.m_node.m_parent;
  while (p != null)
  {
    (function($this) { var $_u373 = d; d = fan.sys.Int.increment(d); return $_u373; })(this);
    p = p.m_parent;
  }
  ;
  return d;
}
fan.uiBuilder.VbTreeNode.prototype.icon$Once = function()
{
  return this.m_node.icon(this.m_tree.m_builder.m_session.m_ns);
}
fan.uiBuilder.VbTreeNode.prototype.m_sel = false;
fan.uiBuilder.VbTreeNode.prototype.m_tree = null;
fan.uiBuilder.VbTreeNode.prototype.m_node = null;
fan.uiBuilder.VbTreeNode.prototype.m_depth$Store = null;
fan.uiBuilder.VbTreeNode.prototype.m_icon$Store = null;
fan.uiBuilder.VbNodeReorder = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbNodeReorder.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbNodeReorder.prototype.$typeof = function() { return fan.uiBuilder.VbNodeReorder.$type; }
fan.uiBuilder.VbNodeReorder.make = function(builder,node) {
  var self = new fan.uiBuilder.VbNodeReorder();
  fan.uiBuilder.VbNodeReorder.make$(self,builder,node);
  return self;
  }
fan.uiBuilder.VbNodeReorder.make$ = function(self,builder,node)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.m_builder = builder;
  self.m_node = node;
  self.m_box = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("uiBuilder-ViewBuilder-reorderBox");
      it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["relative"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.mult(node.m_subs.size(),36),fan.sys.Obj.$type.toNullable())),"px")]));
      return;
    })),fan.domkit.Box.$type);
  node.m_subs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u357,
    function(s)
    {
      $this.m_box.add(fan.uiBuilder.VbTreeReorderEntry.make(builder.m_session,s));
      return;
    }));
  self.reorder();
  fan.sys.ObjUtil.$with(fan.domkit.DropTarget.bind(self.m_box),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u374,
    function(it)
    {
      it.canDrop(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u375,
        function(data)
        {
          $this.m_cur = fan.sys.ObjUtil.as(data,fan.uiBuilder.VbTreeReorderEntry.$type);
          return $this.m_cur != null;
        }));
      it.onOver(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u376,
        function(pagePos)
        {
          var p = $this.relPos(pagePos);
          $this.m_dy = fan.sys.ObjUtil.coerce(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(p.m_y,fan.sys.Num.$type)),fan.sys.Int.$type.toNullable());
          $this.reorder();
          return;
        }));
      return;
    }));
  self.add(self.m_box);
  return;
}
fan.uiBuilder.VbNodeReorder.prototype.dialog = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.ContentDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      it.title$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("dragToReorder")));
      it.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.add($this);
          return;
        })),fan.domkit.Box.$type));
      it.addButton("ok",null,true);
      it.addButton("cancel");
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          return (function($this) { if (fan.sys.ObjUtil.equals(key,"ok")) return $this.save(); return true; })($this);
        }));
      return;
    })),fan.ui.ContentDialog.$type);
}
fan.uiBuilder.VbNodeReorder.prototype.reorder = function()
{
  var $this = this;
  if ((this.m_cur != null && this.m_dy != null))
  {
    var cy = fan.sys.Str.toInt(fan.sys.Str.getRange(fan.sys.ObjUtil.toStr(this.m_cur.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))),fan.sys.Range.make(0,-3)));
    if ((fan.sys.ObjUtil.compareLT(this.m_dy,cy) && fan.sys.ObjUtil.compareNE(this.m_box.firstChild(),this.m_cur)))
    {
      var prev = this.m_cur.prevSibling();
      this.m_box.remove(fan.sys.ObjUtil.coerce(this.m_cur,fan.dom.Elem.$type));
      this.m_box.insertBefore(fan.sys.ObjUtil.coerce(this.m_cur,fan.dom.Elem.$type),fan.sys.ObjUtil.coerce(prev,fan.dom.Elem.$type));
    }
    else
    {
      if ((fan.sys.ObjUtil.compareGT(this.m_dy,fan.sys.Int.plus(fan.sys.ObjUtil.coerce(cy,fan.sys.Int.$type),36)) && fan.sys.ObjUtil.compareNE(this.m_box.lastChild(),this.m_cur)))
      {
        var next = this.m_cur.nextSibling();
        this.m_box.remove(fan.sys.ObjUtil.coerce(this.m_cur,fan.dom.Elem.$type));
        if (fan.sys.ObjUtil.equals(next,this.m_box.lastChild()))
        {
          this.m_box.add(fan.sys.ObjUtil.coerce(this.m_cur,fan.dom.Elem.$type));
        }
        else
        {
          this.m_box.insertBefore(fan.sys.ObjUtil.coerce(this.m_cur,fan.dom.Elem.$type),fan.sys.ObjUtil.coerce(next.nextSibling(),fan.dom.Elem.$type));
        }
        ;
      }
      ;
    }
    ;
  }
  ;
  this.m_box.children().each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u378,
    function(kid,i)
    {
      kid.transition(fan.sys.Map.fromLiteral(["top"],[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.mult(i,36),fan.sys.Obj.$type.toNullable())),"px")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("200ms"));
      return;
    }));
  return;
}
fan.uiBuilder.VbNodeReorder.prototype.save = function()
{
  var $this = this;
  try
  {
    this.m_node.m_subs = fan.sys.ObjUtil.coerce(this.m_box.children().map(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u379,
      function(e)
      {
        return fan.sys.ObjUtil.coerce(e,fan.uiBuilder.VbTreeReorderEntry.$type).m_node;
      })),fan.sys.Type.find("uiBuilder::VbNode[]"));
    this.m_builder.onSave();
    return true;
  }
  catch ($_u380)
  {
    $_u380 = fan.sys.Err.make($_u380);
    if ($_u380 instanceof fan.sys.Err)
    {
      var err = $_u380;
      var err;
      fan.ui.Flash.showErr(this,err);
      return false;
    }
    else
    {
      throw $_u380;
    }
  }
  ;
}
fan.uiBuilder.VbNodeReorder.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbNodeReorder.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbNodeReorder.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbNodeReorder.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbNodeReorder.prototype.cur = function()
{
  return this.m_cur;
}
fan.uiBuilder.VbNodeReorder.prototype.cur$ = function(it)
{
  this.m_cur = it;
  return;
}
fan.uiBuilder.VbNodeReorder.prototype.dy = function()
{
  return this.m_dy;
}
fan.uiBuilder.VbNodeReorder.prototype.dy$ = function(it)
{
  this.m_dy = it;
  return;
}
fan.uiBuilder.VbNodeReorder.prototype.box = function()
{
  return this.m_box;
}
fan.uiBuilder.VbNodeReorder.prototype.box$ = function(it)
{
  this.m_box = it;
  return;
}
fan.uiBuilder.VbNodeReorder.prototype.m_builder = null;
fan.uiBuilder.VbNodeReorder.prototype.m_node = null;
fan.uiBuilder.VbNodeReorder.prototype.m_cur = null;
fan.uiBuilder.VbNodeReorder.prototype.m_dy = null;
fan.uiBuilder.VbNodeReorder.prototype.m_box = null;
fan.uiBuilder.VbTreeReorderEntry = fan.sys.Obj.$extend(fan.dom.Elem);
fan.uiBuilder.VbTreeReorderEntry.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbTreeReorderEntry.prototype.$typeof = function() { return fan.uiBuilder.VbTreeReorderEntry.$type; }
fan.uiBuilder.VbTreeReorderEntry.make = function(session,node) {
  var self = new fan.uiBuilder.VbTreeReorderEntry();
  fan.uiBuilder.VbTreeReorderEntry.make$(self,session,node);
  return self;
  }
fan.uiBuilder.VbTreeReorderEntry.make$ = function(self,session,node)
{
  var $this = self;
  fan.dom.Elem.make$(self,"div");
  self.m_node = node;
  self.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
  self.style().trap("boxSizing",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["border-box"]));
  self.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
  self.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  self.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px 10px"]));
  self.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
  self.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
  self.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["32px"]));
  self.style().trap("lineHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["24px"]));
  self.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
  self.style().trap("boxShadow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#bbb 0 1px 1px"]));
  self.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
  self.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["move"]));
  self.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.icon$(fan.ui.Icon.outline(node.icon(session.m_ns)));
      it.label$(node.m_$name);
      return;
    })));
  self.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u29,
    function(it)
    {
      it.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["right"]));
      it.icon$(fan.ui.Icon.outline("reorder"));
      it.label$("");
      return;
    })));
  fan.sys.ObjUtil.$with(fan.domkit.DragTarget.bind(self),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u381,
    function(it)
    {
      it.onDrag(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u382,
        function(e)
        {
          e.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#ddd"]));
          return $this;
        }));
      it.onEnd(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u383,
        function(e)
        {
          e.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.VbTreeReorderEntry.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbTreeReorderEntry.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbTreeReorderEntry.prototype.m_node = null;
fan.uiBuilder.VbNodeRemover = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.VbNodeRemover.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.VbNodeRemover.prototype.$typeof = function() { return fan.uiBuilder.VbNodeRemover.$type; }
fan.uiBuilder.VbNodeRemover.make = function(builder,node) {
  var self = new fan.uiBuilder.VbNodeRemover();
  fan.uiBuilder.VbNodeRemover.make$(self,builder,node);
  return self;
  }
fan.uiBuilder.VbNodeRemover.make$ = function(self,builder,node)
{
  self.m_builder = builder;
  self.m_node = node;
  return;
}
fan.uiBuilder.VbNodeRemover.prototype.dialog = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AlertDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u61,
    function(it)
    {
      $this.m_dlg = it;
      it.title$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("remove"))," "),fan.sys.Pod.find("ui").locale("view")));
      it.icon$(fan.ui.Icon.outline("warn",fan.ui.Colors.m_yellow));
      it.msg$(fan.sys.Str.plus(fan.sys.Str.plus("Remove '",$this.m_node.m_$name),"'?"));
      it.info$("This will remove the given view and all its children");
      it.addButton("yes");
      it.addButton("no",null,true);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          return (function($this) { if (fan.sys.ObjUtil.equals(key,"yes")) return $this.save(); return true; })($this);
        }));
      return;
    })),fan.ui.AlertDialog.$type);
}
fan.uiBuilder.VbNodeRemover.prototype.save = function()
{
  var $this = this;
  try
  {
    if (this.m_node.m_parent == null)
    {
      this.m_builder.m_root = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbNode.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u328,
        function(it)
        {
          it.m_$name = "root";
          it.m_inherit = "blank";
          return;
        })),fan.uiBuilder.VbNode.$type);
      this.m_builder.selNode$(this.m_builder.m_root);
    }
    else
    {
      if (this.m_node.m_parent.isTile())
      {
        var blank = fan.uiBuilder.VbNode.blank(this.m_builder.m_session,this.m_node.m_parent);
        this.m_node.m_parent.replace(this.m_node,blank);
        this.m_builder.selNode$(blank);
      }
      else
      {
        this.m_builder.selNode$(this.m_node.m_parent);
        this.m_node.m_parent.m_subs.remove(this.m_node);
      }
      ;
    }
    ;
    this.m_builder.onSave();
    return true;
  }
  catch ($_u385)
  {
    $_u385 = fan.sys.Err.make($_u385);
    if ($_u385 instanceof fan.sys.Err)
    {
      var err = $_u385;
      var err;
      fan.ui.Flash.showErr(fan.sys.ObjUtil.coerce(this.m_dlg.firstChild(),fan.dom.Elem.$type),err);
      return false;
    }
    else
    {
      throw $_u385;
    }
  }
  ;
}
fan.uiBuilder.VbNodeRemover.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbNodeRemover.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbNodeRemover.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbNodeRemover.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbNodeRemover.prototype.dlg = function()
{
  return this.m_dlg;
}
fan.uiBuilder.VbNodeRemover.prototype.dlg$ = function(it)
{
  this.m_dlg = it;
  return;
}
fan.uiBuilder.VbNodeRemover.prototype.m_builder = null;
fan.uiBuilder.VbNodeRemover.prototype.m_node = null;
fan.uiBuilder.VbNodeRemover.prototype.m_dlg = null;
fan.uiBuilder.VbEdVars = fan.sys.Obj.$extend(fan.uiBuilder.VbEdBox);
fan.uiBuilder.VbEdVars.prototype.$ctor = function()
{
  fan.uiBuilder.VbEdBox.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_inputs = fan.sys.List.make(fan.uiBuilder.VbVarInput.$type);
  return;
}
fan.uiBuilder.VbEdVars.prototype.$typeof = function() { return fan.uiBuilder.VbEdVars.$type; }
fan.uiBuilder.VbEdVars.prototype.onUpdate = function()
{
  var $this = this;
  this.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
  this.m_showLabels = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Checkbox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u111,
    function(it)
    {
      it.checked$($this.m_node.m_vars.any(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u288,
        function(v)
        {
          return (fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"uiViewBar") && v.has("showVarLabels"));
        })));
      return;
    })),fan.domkit.Checkbox.$type);
  this.m_aux.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["20px"]));
  this.m_aux.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.addVar(null);
          return;
        }));
      it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline("add"));
          it.label$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("add"))," "),fan.sys.Pod.find("ui").locale("var")));
          return;
        })));
      return;
    })),fan.domkit.Button.$type));
  this.m_aux.add(this.m_showLabels.wrap(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("showInputLabels")));
      return;
    })),fan.domkit.Label.$type)));
  this.m_inputs.clear();
  this.removeAll();
  this.m_node.m_vars.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u329,
    function(v)
    {
      $this.addVar(v);
      return;
    }));
  return;
}
fan.uiBuilder.VbEdVars.prototype.addVar = function(d)
{
  var $this = this;
  if (d == null)
  {
    var l = this.m_inputs.map(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u386,
      function(x)
      {
        return fan.sys.Str.trim(x.m_$name.val());
      }));
    var n = fan.uiBuilder.ViewBuilder.uniqueList(fan.sys.ObjUtil.coerce(l,fan.sys.Type.find("sys::Str[]")),"var");
    d = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["name","input","kind"],[n,fan.haystack.Marker.m_val,"Span"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
  }
  ;
  var input = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbVarInput.make(this.m_builder.m_session,fan.sys.ObjUtil.coerce(this.m_node,fan.uiBuilder.VbNode.$type),fan.sys.ObjUtil.coerce(d,fan.haystack.Dict.$type)),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u387,
    function(it)
    {
      it.onExpand(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u388,
        function(x)
        {
          $this.m_inputs.each(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u389,
            function(y)
            {
              if (fan.sys.ObjUtil.compareNE(x,y))
              {
                y.save();
                y.collapse();
              }
              ;
              return;
            }));
          return;
        }));
      it.onRemoveVar(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u388,
        function(x)
        {
          $this.removeVar(x);
          return;
        }));
      return;
    })),fan.uiBuilder.VbVarInput.$type);
  if (((fan.sys.ObjUtil.equals(d.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"layout") && this.m_node.isTile()) || fan.sys.ObjUtil.equals(d.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"uiViewBar") || d.has("vizComp")))
  {
    input.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  }
  else
  {
    input.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
  }
  ;
  this.m_inputs.add(input);
  this.add(input);
  return;
}
fan.uiBuilder.VbEdVars.prototype.removeVar = function(input)
{
  var $this = this;
  this.m_inputs.remove(input);
  var k = input;
  k.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(k.size().m_h,fan.sys.Obj.$type.toNullable())),"px")]));
  k.transition(fan.sys.Map.fromLiteral(["opacity","height"],["0","0px"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("200ms"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u89,
    function(it)
    {
      $this.remove(k);
      return;
    }));
  return;
}
fan.uiBuilder.VbEdVars.prototype.onSave = function()
{
  var $this = this;
  var vars = fan.sys.List.make(fan.haystack.Dict.$type);
  this.m_inputs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u390,
    function(input)
    {
      var $var = input.save();
      var $name = $var.get("name");
      var existing = $this.m_node.$var(fan.sys.ObjUtil.coerce($name,fan.sys.Str.$type));
      if (existing != null)
      {
        existing.each(fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u391,
          function(ev,en)
          {
            if ((fan.uiBuilder.VbEdVars.m_managedTags.get(en) == null && $var.get(en) == null))
            {
              $var.set(en,fan.sys.ObjUtil.coerce(ev,fan.sys.Obj.$type));
            }
            ;
            return;
          }));
      }
      ;
      var rem = $var.keys().findAll(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u392,
        function(k)
        {
          return fan.sys.ObjUtil.equals($var.get(k),fan.haystack.Remove.m_val);
        }));
      rem.each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u393,
        function(k)
        {
          $var.remove(k);
          return;
        }));
      vars.add(fan.haystack.Etc.makeDict($var));
      return;
    }));
  var uiViewBar = vars.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u288,
    function(v)
    {
      return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"uiViewBar");
    }));
  if (this.m_showLabels.checked())
  {
    if (uiViewBar == null)
    {
      uiViewBar = fan.uiBuilder.VbEdVars.m_defUiViewBar;
    }
    ;
    uiViewBar = fan.haystack.Etc.dictSet(uiViewBar,"showVarLabels",fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  }
  else
  {
    if (uiViewBar != null)
    {
      uiViewBar = fan.haystack.Etc.dictRemove(fan.sys.ObjUtil.coerce(uiViewBar,fan.haystack.Dict.$type),"showVarLabels");
    }
    ;
  }
  ;
  if (uiViewBar != null)
  {
    var i = vars.findIndex(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u288,
      function(v)
      {
        return fan.sys.ObjUtil.equals(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"uiViewBar");
      }));
    if (i == null)
    {
      vars.add(fan.sys.ObjUtil.coerce(uiViewBar,fan.haystack.Dict.$type));
    }
    else
    {
      vars.set(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),fan.sys.ObjUtil.coerce(uiViewBar,fan.haystack.Dict.$type));
    }
    ;
  }
  ;
  this.m_node.m_vars = vars;
  return;
}
fan.uiBuilder.VbEdVars.prototype.inputs = function()
{
  return this.m_inputs;
}
fan.uiBuilder.VbEdVars.prototype.inputs$ = function(it)
{
  this.m_inputs = it;
  return;
}
fan.uiBuilder.VbEdVars.prototype.showLabels = function()
{
  return this.m_showLabels;
}
fan.uiBuilder.VbEdVars.prototype.showLabels$ = function(it)
{
  this.m_showLabels = it;
  return;
}
fan.uiBuilder.VbEdVars.make = function() {
  var self = new fan.uiBuilder.VbEdVars();
  fan.uiBuilder.VbEdVars.make$(self);
  return self;
  }
fan.uiBuilder.VbEdVars.make$ = function(self)
{
  fan.uiBuilder.VbEdBox.make$(self);
  ;
  return;
}
fan.uiBuilder.VbEdVars.static$init = function()
{
  fan.uiBuilder.VbEdVars.m_managedTags = fan.sys.ObjUtil.coerce((function($this) { var $_u394 = fan.sys.ObjUtil.coerce(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Obj"),fan.sys.Type.find("sys::Obj?")).setList(fan.sys.List.make(fan.sys.Str.$type, ["name","var","kind","defVal","binding","input"])),fan.sys.Type.find("[sys::Str:sys::Str]")); if ($_u394 == null) return null; return fan.sys.ObjUtil.toImmutable($_u394); })(this),fan.sys.Type.find("[sys::Str:sys::Str]"));
  fan.uiBuilder.VbEdVars.m_defUiViewBar = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["var","name","kind","defVal"],[fan.haystack.Marker.m_val,"uiViewBar","Dict",fan.haystack.Etc.emptyDict()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
  return;
}
fan.uiBuilder.VbEdVars.m_managedTags = null;
fan.uiBuilder.VbEdVars.m_defUiViewBar = null;
fan.uiBuilder.VbEdVars.prototype.m_inputs = null;
fan.uiBuilder.VbEdVars.prototype.m_showLabels = null;
fan.uiBuilder.VbVarInput = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.VbVarInput.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbVarInput.prototype.$typeof = function() { return fan.uiBuilder.VbVarInput.$type; }
fan.uiBuilder.VbVarInput.make = function(session,node,$var) {
  var self = new fan.uiBuilder.VbVarInput();
  fan.uiBuilder.VbVarInput.make$(self,session,node,$var);
  return self;
  }
fan.uiBuilder.VbVarInput.make$ = function(self,session,node,$var)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  var def = self.inputValDef(fan.sys.ObjUtil.coerce($var.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type),fan.sys.ObjUtil.coerce((function($this) { var $_u395 = $var.get("kind"); if ($_u395 != null) return $_u395; return "Str"; })(self),fan.sys.Obj.$type),$var);
  self.m_session = session;
  self.m_origMeta = self.varMeta($var);
  self.m_$name = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(def.m_$name);
      return;
    })),fan.domkit.TextField.$type);
  self.m_mode = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiBuilder.VbVarMode.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u396,
    function(it)
    {
      return;
    })),fan.uiBuilder.VbVarMode.$type);
  self.m_kind = fan.ui.Input.makeForTag(session,"kind",def.m_kind.m_signature);
  self.m_form = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ListButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u11,
    function(it)
    {
      it.items$(fan.sys.List.make(fan.sys.Str.$type, [fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("require")),"defVal"]));
      return;
    })),fan.domkit.ListButton.$type);
  self.m_input = fan.ui.Input.makeForDef(session,def,fan.sys.ObjUtil.coerce((function($this) { var $_u397 = def.defVal(); if ($_u397 != null) return $_u397; return def.m_kind.defVal(); })(self),fan.sys.Obj.$type));
  self.m_bind = fan.uiBuilder.VbBindingInput.doMake(session,node,fan.sys.ObjUtil.coerce((function($this) { var $_u398 = $var.get("binding"); if ($_u398 != null) return $_u398; return ""; })(self),fan.sys.Str.$type));
  self.m_meta = fan.ui.Input.makeForTag(session,"meta",self.m_origMeta);
  self.m_rem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#d9d9d9"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 3px 3px 0"]));
      it.style().addPseudoClass(":hover","background:#d2d2d2 !important");
      it.style().addPseudoClass(":active","background:#c2c2c2 !important");
      it.add(fan.ui.Icon.outline("x"));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["9px 0 6px 0"]));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          (function($this) { var $_u399 = $this.m_cbRemove; if ($_u399 == null) return null; return $_u399.call($this); })($this);
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  if ($var.has("input"))
  {
    self.m_mode.selIndex$(1);
  }
  ;
  if ($var.has("binding"))
  {
    self.m_mode.selIndex$(2);
  }
  ;
  if ($var.missing("input"))
  {
    self.m_form.sel().index$(fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()));
  }
  ;
  if ($var.has("defVal"))
  {
    self.m_form.sel().index$(fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()));
  }
  ;
  self.m_$name.onModify(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      $this.onUpdate();
      return;
    }));
  self.m_mode.onSelect(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u396,
    function(it)
    {
      $this.onUpdate();
      return;
    }));
  self.m_kind.onModify(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u96,
    function(it)
    {
      $this.onUpdate();
      return;
    }));
  self.m_form.onSelect(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u11,
    function(it)
    {
      $this.onUpdate();
      return;
    }));
  self.m_input.onModify(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u96,
    function(it)
    {
      $this.onUpdate();
      return;
    }));
  self.m_meta.onModify(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u96,
    function(it)
    {
      $this.onUpdate();
      return;
    }));
  self.m_infoBox = self.makeInfoBox();
  self.m_formBox = self.makeFormBox();
  self.m_wellBox = self.makeWellBox();
  self.m_wellBox.onEvent("mouseenter",false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u44,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.m_wellBox.onEvent("mouseleave",false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u44,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.m_wellBox.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u44,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.m_wellBox.onEvent("mouseup",false,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u44,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%","1px","40px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_wellBox),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.html$("&nbsp;");
          return;
        })),fan.domkit.Box.$type)),fan.domkit.SashBox.$type).add($this.m_rem);
      return;
    })),fan.domkit.SashBox.$type));
  self.onUpdate();
  return;
}
fan.uiBuilder.VbVarInput.prototype.isExpanded = function()
{
  return fan.sys.ObjUtil.equals(this.m_wellBox.lastChild().style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"block");
}
fan.uiBuilder.VbVarInput.prototype.collapse = function()
{
  this.m_wellBox.lastChild().style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  return;
}
fan.uiBuilder.VbVarInput.prototype.onExpand = function(f)
{
  this.m_cbExpand = f;
  return;
}
fan.uiBuilder.VbVarInput.prototype.cbExpand = function()
{
  return this.m_cbExpand;
}
fan.uiBuilder.VbVarInput.prototype.cbExpand$ = function(it)
{
  this.m_cbExpand = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.onRemoveVar = function(f)
{
  this.m_cbRemove = f;
  return;
}
fan.uiBuilder.VbVarInput.prototype.cbRemove = function()
{
  return this.m_cbRemove;
}
fan.uiBuilder.VbVarInput.prototype.cbRemove$ = function(it)
{
  this.m_cbRemove = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.save = function()
{
  var $this = this;
  var $name = fan.sys.Str.trim(this.m_$name.val());
  var mode = this.m_mode.selIndex();
  var kind = this.m_kind.save();
  var form = this.m_form.sel().index();
  var input = this.m_input.save();
  var meta = fan.sys.ObjUtil.coerce(this.m_meta.save(),fan.haystack.Dict.$type);
  var $var = fan.sys.Map.fromLiteral(["name","var","kind"],[$name,fan.haystack.Marker.m_val,kind],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
  if (fan.sys.ObjUtil.equals(form,1))
  {
    $var.set("defVal",input);
  }
  ;
  if (fan.sys.ObjUtil.equals(mode,1))
  {
    $var.set("input",fan.sys.ObjUtil.coerce((function($this) { var $_u400 = meta.get("input"); if ($_u400 != null) return $_u400; return fan.haystack.Marker.m_val; })(this),fan.sys.Obj.$type));
  }
  ;
  if (fan.sys.ObjUtil.equals(mode,2))
  {
    $var.set("binding",input);
    $var.remove("kind");
    $var.remove("defVal");
  }
  ;
  meta.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u313,
    function(v,n)
    {
      $var.set(n,fan.sys.ObjUtil.coerce(v,fan.sys.Obj.$type));
      return;
    }));
  this.m_origMeta.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u313,
    function(v,n)
    {
      if (!$var.containsKey(n))
      {
        $var.set(n,fan.haystack.Remove.m_val);
      }
      ;
      return;
    }));
  return $var;
}
fan.uiBuilder.VbVarInput.prototype.makeInfoBox = function()
{
  var $this = this;
  var modeIcon = "var";
  if (fan.sys.ObjUtil.equals(this.m_mode.selIndex(),1))
  {
    modeIcon = "textField";
  }
  ;
  if (fan.sys.ObjUtil.equals(this.m_mode.selIndex(),2))
  {
    modeIcon = "binding";
  }
  ;
  var kindStr = fan.ui.UiKind.fromKind(fan.sys.ObjUtil.coerce(fan.haystack.Kind.fromStr(fan.sys.ObjUtil.coerce(this.m_kind.save(),fan.sys.Str.$type)),fan.haystack.Kind.$type)).html();
  var formStr = (function($this) { if (fan.sys.ObjUtil.equals($this.m_mode.selIndex(),2)) return fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("binding")); return $this.m_form.text(); })(this);
  if (fan.sys.ObjUtil.compareGT(this.m_form.sel().index(),0))
  {
    var val = this.m_input.save();
    if (fan.sys.ObjUtil.is(this.m_input,fan.ui.RefInput.$type))
    {
      val = this.m_input.querySelector(".domkit-Button").text();
    }
    ;
    formStr = fan.sys.Str.plus(formStr,fan.sys.Str.plus(fan.sys.Str.plus(": <span style='color:#88888a'>",val),"</save>"));
  }
  ;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u2,
    function(it)
    {
      it.style().trap("userSelect",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      it.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
      it.halign$(fan.domkit.Align.m_fill);
      it.cellStyle("*","*","overflow:hidden; white-space:nowrap");
      it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"width:22px; padding-left:5px");
      it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"width:120px");
      it.cellStyle(fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"width:34px");
      it.cellStyle(fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"width:140px");
      it.cellStyle(fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"width:200px");
      it.cellStyle(fan.sys.ObjUtil.coerce(5,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"");
      it.cellStyle(fan.sys.ObjUtil.coerce(6,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"width:32px; text-align:right");
      it.addRow(fan.sys.List.make(fan.domkit.Label.$type, [fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline("var",fan.ui.Colors.m_darkPurple));
          it.label$("");
          return;
        })),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().addClass("font-bold");
          it.text$(fan.sys.Str.trim($this.m_$name.val()));
          return;
        })),fan.domkit.Label.$type),fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline(modeIcon,fan.ui.Colors.m_indigo));
          it.label$("");
          return;
        })),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.html$(kindStr);
          return;
        })),fan.domkit.Label.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.html$(formStr);
          return;
        })),fan.domkit.Label.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().trap("paddingLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#88888a"]));
          it.text$(fan.sys.Str.plus(fan.sys.Str.plus("{ ",fan.haystack.ZincWriter.tagsToStr($this.m_meta.save()))," }"));
          return;
        })),fan.domkit.Label.$type),fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.icon$(fan.ui.Icon.outline("chevronDown"));
          it.label$("");
          return;
        }))]));
      it.querySelector("table").style().trap("tableLayout",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["fixed"]));
      return;
    })),fan.domkit.GridBox.$type);
}
fan.uiBuilder.VbVarInput.prototype.makeFormBox = function()
{
  var $this = this;
  var nameLabel = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.style().addClass("font-light");
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("name")),":"));
      return;
    })),fan.domkit.Label.$type);
  var modeLabel = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.style().addClass("font-light");
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("mode")),":"));
      return;
    })),fan.domkit.Label.$type);
  var kindLabel = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.style().addClass("font-light");
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("kind")),":"));
      return;
    })),fan.domkit.Label.$type);
  var metaLabel = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      it.style().addClass("font-light");
      it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("meta")),":"));
      return;
    })),fan.domkit.Label.$type);
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u2,
    function(it)
    {
      it.cellStyle("*","*","padding: 4px");
      it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"*","width: 85px; text-align: right");
      it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),"*","width: 500px");
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [nameLabel,$this.m_$name]));
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [modeLabel,$this.m_mode]));
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [kindLabel,$this.m_kind]));
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [$this.m_form,$this.m_input]));
      it.addRow(fan.sys.List.make(fan.dom.Elem.$type, [metaLabel,$this.m_meta]));
      return;
    })),fan.domkit.GridBox.$type);
}
fan.uiBuilder.VbVarInput.prototype.makeWellBox = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.WellBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u284,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["5px"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px 0 0 3px"]));
      fan.sys.ObjUtil.coerce(it.add($this.m_infoBox),fan.domkit.WellBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("marginTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px 0 10px 134px"]));
          it.style().trap("borderTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d2d2d2"]));
          it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
          it.add($this.m_formBox);
          return;
        })),fan.domkit.Box.$type));
      return;
    })),fan.domkit.WellBox.$type);
}
fan.uiBuilder.VbVarInput.prototype.inputValDef = function($name,kind,meta)
{
  if (meta === undefined) meta = null;
  var k = (function($this) { var $_u402 = fan.sys.ObjUtil.as(kind,fan.haystack.Kind.$type); if ($_u402 != null) return $_u402; return fan.haystack.Kind.fromStr(fan.sys.ObjUtil.toStr(kind)); })(this);
  var v = (function($this) { var $_u403 = meta; if ($_u403 == null) return null; return $_u403.get("defVal"); })(this);
  var d = fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["kind","defVal"],[k.m_signature,v],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")));
  if (meta != null)
  {
    d = fan.haystack.Etc.dictMerge(d,meta);
  }
  ;
  return fan.skyarc.ValDef.make($name,d);
}
fan.uiBuilder.VbVarInput.prototype.varMeta = function(d)
{
  var $this = this;
  return fan.haystack.Etc.dictFindAll(d,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u344,
    function(v,n)
    {
      if (fan.sys.ObjUtil.equals(n,"var"))
      {
        return false;
      }
      ;
      if (fan.sys.ObjUtil.equals(n,"name"))
      {
        return false;
      }
      ;
      if (fan.sys.ObjUtil.equals(n,"kind"))
      {
        return false;
      }
      ;
      if (fan.sys.ObjUtil.equals(n,"binding"))
      {
        return false;
      }
      ;
      if (fan.sys.ObjUtil.equals(n,"defVal"))
      {
        return false;
      }
      ;
      return true;
    }));
}
fan.uiBuilder.VbVarInput.prototype.onMouseEvent = function(e)
{
  var $_u404 = e.type();
  if (fan.sys.ObjUtil.equals($_u404,"mouseenter"))
  {
    if (!this.isExpanded())
    {
      this.m_wellBox.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#e0e0e0"]));
    }
    ;
  }
  else if (fan.sys.ObjUtil.equals($_u404,"mouseleave"))
  {
    if (!this.isExpanded())
    {
      this.m_wellBox.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
    }
    ;
  }
  else if (fan.sys.ObjUtil.equals($_u404,"mousedown"))
  {
    if (!this.isExpanded())
    {
      this.m_wellBox.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#d9d9d9"]));
    }
    ;
  }
  else if (fan.sys.ObjUtil.equals($_u404,"mouseup"))
  {
    if (this.isExpanded())
    {
      if (this.m_infoBox.containsChild(e.target()))
      {
        this.collapse();
      }
      ;
    }
    else
    {
      var p = fan.ui.UiUtil.closest(this,fan.ui.TabBox.$type);
      try
      {
        (function($this) { var $_u405 = $this.m_cbExpand; if ($_u405 == null) return null; return $_u405.call($this); })(this);
        this.m_wellBox.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
        this.m_wellBox.lastChild().style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
      }
      catch ($_u406)
      {
        $_u406 = fan.sys.Err.make($_u406);
        if ($_u406 instanceof fan.sys.Err)
        {
          var err = $_u406;
          var err;
          fan.ui.Flash.showErr(fan.sys.ObjUtil.coerce(p,fan.dom.Elem.$type),err);
        }
        else
        {
          throw $_u406;
        }
      }
      ;
    }
    ;
  }
  ;
  return;
}
fan.uiBuilder.VbVarInput.prototype.onUpdate = function()
{
  try
  {
    this.doUpdate();
  }
  catch ($_u407)
  {
    $_u407 = fan.sys.Err.make($_u407);
    if ($_u407 instanceof fan.sys.Err)
    {
      var err = $_u407;
      var err;
      fan.ui.UiUtil.dumpStack(err);
    }
    else
    {
      throw $_u407;
    }
  }
  ;
  return;
}
fan.uiBuilder.VbVarInput.prototype.doUpdate = function()
{
  var $this = this;
  var oldInput = this.m_input;
  var p = this.m_form.parent();
  if (fan.sys.ObjUtil.compareLT(this.m_mode.selIndex(),2))
  {
    this.m_form.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["inline-block"]));
    while (fan.sys.ObjUtil.compareGT(p.children().size(),1))
    {
      p.remove(fan.sys.ObjUtil.coerce(p.lastChild(),fan.dom.Elem.$type));
    }
    ;
    var kind = fan.haystack.Kind.fromStr(fan.sys.ObjUtil.coerce(this.m_kind.save(),fan.sys.Str.$type));
    if ((fan.sys.ObjUtil.compareNE(this.m_input.m_def.m_kind,kind) || fan.sys.ObjUtil.is(this.m_input,fan.uiBuilder.VbBindingInput.$type)))
    {
      var m = null;
      try
      {
        m = fan.sys.ObjUtil.coerce(this.m_meta.save(),fan.haystack.Dict.$type.toNullable());
      }
      catch ($_u408)
      {
      }
      ;
      this.m_input = fan.ui.Input.makeForDef(this.m_session,this.inputValDef("val",fan.sys.ObjUtil.coerce(kind,fan.sys.Obj.$type),m),kind.defVal());
      this.m_input.onModify(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u96,
        function(it)
        {
          $this.onUpdate();
          return;
        }));
    }
    ;
  }
  else
  {
    this.m_form.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
    while (fan.sys.ObjUtil.compareGT(p.children().size(),1))
    {
      p.remove(fan.sys.ObjUtil.coerce(p.lastChild(),fan.dom.Elem.$type));
    }
    ;
    p.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u8,
      function(it)
      {
        it.style().addClass("font-light");
        it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("binding")),":"));
        return;
      })),fan.domkit.Label.$type));
    this.m_input = this.m_bind;
  }
  ;
  this.m_kind.ro$(fan.sys.ObjUtil.equals(this.m_mode.selIndex(),2));
  if (fan.sys.ObjUtil.compareNE(this.m_mode.selIndex(),2))
  {
    var $_u409 = this.m_form.sel().index();
    if (fan.sys.ObjUtil.equals($_u409,0))
    {
      this.m_input.ro$(true);
    }
    else if (fan.sys.ObjUtil.equals($_u409,1))
    {
      this.m_input.ro$(false);
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.compareNE(oldInput,this.m_input))
  {
    oldInput.parent().replace(oldInput,this.m_input);
  }
  ;
  p = this.m_infoBox.parent();
  var oldInfo = this.m_infoBox;
  this.m_infoBox = this.makeInfoBox();
  p.replace(oldInfo,this.m_infoBox);
  return;
}
fan.uiBuilder.VbVarInput.prototype.session = function()
{
  return this.m_session;
}
fan.uiBuilder.VbVarInput.prototype.session$ = function(it)
{
  this.m_session = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.origMeta = function()
{
  return this.m_origMeta;
}
fan.uiBuilder.VbVarInput.prototype.origMeta$ = function(it)
{
  this.m_origMeta = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.infoBox = function()
{
  return this.m_infoBox;
}
fan.uiBuilder.VbVarInput.prototype.infoBox$ = function(it)
{
  this.m_infoBox = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.formBox = function()
{
  return this.m_formBox;
}
fan.uiBuilder.VbVarInput.prototype.formBox$ = function(it)
{
  this.m_formBox = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.wellBox = function()
{
  return this.m_wellBox;
}
fan.uiBuilder.VbVarInput.prototype.wellBox$ = function(it)
{
  this.m_wellBox = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.rem = function()
{
  return this.m_rem;
}
fan.uiBuilder.VbVarInput.prototype.rem$ = function(it)
{
  this.m_rem = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.$name = function()
{
  return this.m_$name;
}
fan.uiBuilder.VbVarInput.prototype.$name$ = function(it)
{
  this.m_$name = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.mode = function()
{
  return this.m_mode;
}
fan.uiBuilder.VbVarInput.prototype.mode$ = function(it)
{
  this.m_mode = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.kind = function()
{
  return this.m_kind;
}
fan.uiBuilder.VbVarInput.prototype.kind$ = function(it)
{
  this.m_kind = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.form = function()
{
  return this.m_form;
}
fan.uiBuilder.VbVarInput.prototype.form$ = function(it)
{
  this.m_form = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.bind = function()
{
  return this.m_bind;
}
fan.uiBuilder.VbVarInput.prototype.bind$ = function(it)
{
  this.m_bind = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.input = function()
{
  return this.m_input;
}
fan.uiBuilder.VbVarInput.prototype.input$ = function(it)
{
  this.m_input = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.meta = function()
{
  return this.m_meta;
}
fan.uiBuilder.VbVarInput.prototype.meta$ = function(it)
{
  this.m_meta = it;
  return;
}
fan.uiBuilder.VbVarInput.prototype.m_cbExpand = null;
fan.uiBuilder.VbVarInput.prototype.m_cbRemove = null;
fan.uiBuilder.VbVarInput.prototype.m_session = null;
fan.uiBuilder.VbVarInput.prototype.m_origMeta = null;
fan.uiBuilder.VbVarInput.prototype.m_infoBox = null;
fan.uiBuilder.VbVarInput.prototype.m_formBox = null;
fan.uiBuilder.VbVarInput.prototype.m_wellBox = null;
fan.uiBuilder.VbVarInput.prototype.m_rem = null;
fan.uiBuilder.VbVarInput.prototype.m_$name = null;
fan.uiBuilder.VbVarInput.prototype.m_mode = null;
fan.uiBuilder.VbVarInput.prototype.m_kind = null;
fan.uiBuilder.VbVarInput.prototype.m_form = null;
fan.uiBuilder.VbVarInput.prototype.m_bind = null;
fan.uiBuilder.VbVarInput.prototype.m_input = null;
fan.uiBuilder.VbVarInput.prototype.m_meta = null;
fan.uiBuilder.VbVarMode = fan.sys.Obj.$extend(fan.domkit.FlowBox);
fan.uiBuilder.VbVarMode.prototype.$ctor = function()
{
  fan.domkit.FlowBox.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbVarMode.prototype.$typeof = function() { return fan.uiBuilder.VbVarMode.$type; }
fan.uiBuilder.VbVarMode.make = function() {
  var self = new fan.uiBuilder.VbVarMode();
  fan.uiBuilder.VbVarMode.make$(self);
  return self;
  }
fan.uiBuilder.VbVarMode.make$ = function(self)
{
  var $this = self;
  fan.domkit.FlowBox.make$(self);
  self.m_group = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ButtonGroup.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u280,
    function(it)
    {
      it.add($this.toggle("var"));
      it.add($this.toggle("textField"));
      it.add($this.toggle("binding"));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u280,
        function(it)
        {
          var $_u410 = $this.m_group.selIndex();
          if (fan.sys.ObjUtil.equals($_u410,0))
          {
            $this.m_label.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("var")));
          }
          else if (fan.sys.ObjUtil.equals($_u410,1))
          {
            $this.m_label.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("input")));
          }
          else if (fan.sys.ObjUtil.equals($_u410,2))
          {
            $this.m_label.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("binding")));
          }
          ;
          (function($this) { var $_u411 = $this.m_cbSelect; if ($_u411 == null) return null; return $_u411.call($this); })($this);
          return;
        }));
      return;
    })),fan.domkit.ButtonGroup.$type);
  self.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["-1px","-1px","6px"]));
  self.addAll(self.m_group.buttons());
  self.add((function($this) { var $_u412 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u8,
    function(it)
    {
      return;
    })),fan.domkit.Label.$type); $this.m_label = $_u412; return $_u412; })(self));
  self.selIndex$(0);
  return;
}
fan.uiBuilder.VbVarMode.prototype.toggle = function(icon)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u31,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 7px"]));
      it.elemOn$(fan.ui.Icon.outline(icon,"#fff"));
      it.elemOff$(fan.ui.Icon.outline(icon,fan.ui.Colors.m_darkGrey));
      return;
    })),fan.domkit.ToggleButton.$type);
}
fan.uiBuilder.VbVarMode.prototype.selIndex = function()
{
  return fan.sys.ObjUtil.coerce(this.m_group.selIndex(),fan.sys.Int.$type);
}
fan.uiBuilder.VbVarMode.prototype.selIndex$ = function(it)
{
  this.m_group.selIndex$(fan.sys.ObjUtil.coerce(it,fan.sys.Int.$type.toNullable()));
  return;
}
fan.uiBuilder.VbVarMode.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.uiBuilder.VbVarMode.prototype.label = function()
{
  return this.m_label;
}
fan.uiBuilder.VbVarMode.prototype.label$ = function(it)
{
  this.m_label = it;
  return;
}
fan.uiBuilder.VbVarMode.prototype.group = function()
{
  return this.m_group;
}
fan.uiBuilder.VbVarMode.prototype.group$ = function(it)
{
  this.m_group = it;
  return;
}
fan.uiBuilder.VbVarMode.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.uiBuilder.VbVarMode.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.uiBuilder.VbVarMode.prototype.m_selIndex = 0;
fan.uiBuilder.VbVarMode.prototype.m_label = null;
fan.uiBuilder.VbVarMode.prototype.m_group = null;
fan.uiBuilder.VbVarMode.prototype.m_cbSelect = null;
fan.uiBuilder.VbBindingInput = fan.sys.Obj.$extend(fan.ui.Input);
fan.uiBuilder.VbBindingInput.prototype.$ctor = function()
{
  fan.ui.Input.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiBuilder.VbBindingInput.prototype.$typeof = function() { return fan.uiBuilder.VbBindingInput.$type; }
fan.uiBuilder.VbBindingInput.doMake = function(session,node,val)
{
  var meta = fan.sys.Map.fromLiteral(["input"],[fan.uiBuilder.VbBindingInput.$type.qname()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  var def = fan.skyarc.ValDef.makeTag("binding",fan.haystack.Etc.makeDict(meta),val);
  var input = fan.sys.ObjUtil.coerce(fan.ui.Input.makeForDef(session,def,val),fan.uiBuilder.VbBindingInput.$type);
  input.m_node = node;
  return input;
}
fan.uiBuilder.VbBindingInput.make = function() {
  var self = new fan.uiBuilder.VbBindingInput();
  fan.uiBuilder.VbBindingInput.make$(self);
  return self;
  }
fan.uiBuilder.VbBindingInput.make$ = function(self)
{
  var $this = self;
  fan.ui.Input.make$(self);
  self.m_field = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["calc(100% - 104px)"]));
      it.style().trap("marginRight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
      it.onModify(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u7,
        function(it)
        {
          $this.modified$(true);
          return;
        }));
      return;
    })),fan.domkit.TextField.$type);
  self.m_button = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100px"]));
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("select")));
      it.onPopup(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u30,
        function(it)
        {
          return $this.makePopup();
        }));
      return;
    })),fan.domkit.Button.$type);
  self.add(self.m_field);
  self.add(self.m_button);
  return;
}
fan.uiBuilder.VbBindingInput.prototype.onLoad = function(val)
{
  this.m_field.val$(fan.sys.ObjUtil.toStr(val));
  return;
}
fan.uiBuilder.VbBindingInput.prototype.onSave = function()
{
  return fan.sys.Str.trim(this.m_field.val());
}
fan.uiBuilder.VbBindingInput.prototype.onRO = function()
{
  this.m_field.enabled$(fan.sys.ObjUtil.coerce(!this.ro(),fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiBuilder.VbBindingInput.prototype.makePopup = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Popup.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u413,
    function(it)
    {
      $this.m_popup = it;
      it.halign$(fan.domkit.Align.m_right);
      var box = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["250px"]));
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["5px 0"]));
          it.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
          it.style().trap("userSelect",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
          return;
        })),fan.domkit.Box.$type);
      $this.addTree(box,$this.m_node.root(),0);
      it.add(box);
      return;
    })),fan.domkit.Popup.$type);
}
fan.uiBuilder.VbBindingInput.prototype.addTree = function(box,n,depth)
{
  var $this = this;
  var pad = fan.sys.Int.mult(depth,10);
  box.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("0 10px 0 ",fan.sys.ObjUtil.coerce(fan.sys.Int.plus(10,pad),fan.sys.Obj.$type.toNullable())),"px")]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.ui.Colors.m_grey]));
          it.icon$(fan.ui.Icon.outline(n.icon($this.m_session.m_ns),fan.ui.Colors.m_grey));
          it.label$(n.m_$name);
          return;
        })));
      return;
    })),fan.domkit.Box.$type));
  n.m_vars.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u329,
    function(v)
    {
      var elem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("0 10px 0 ",fan.sys.ObjUtil.coerce(fan.sys.Int.plus(30,pad),fan.sys.Obj.$type.toNullable())),"px")]));
          it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
          it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              it.text$(fan.sys.Str.plus("\u2013 ",v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))));
              return;
            })),fan.domkit.Label.$type));
          return;
        })),fan.domkit.Box.$type);
      if (fan.sys.ObjUtil.equals($this.m_node,n))
      {
        elem.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.ui.Colors.m_grey]));
      }
      else
      {
        elem.style().addPseudoClass(":hover","background:#3498db; color:#fff");
        elem.onEvent("mouseup",false,fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u371,
          function(it)
          {
            $this.m_popup.close();
            $this.m_field.val$(n.m_orig.$var(fan.sys.ObjUtil.coerce(v.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type)).path(fan.sys.ObjUtil.coerce($this.m_node.m_orig,fan.view.ViewNode.$type)));
            return;
          }));
      }
      ;
      box.add(elem);
      return;
    }));
  n.m_subs.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u414,
    function(kid)
    {
      $this.addTree(box,kid,fan.sys.Int.plus(depth,1));
      return;
    }));
  return;
}
fan.uiBuilder.VbBindingInput.prototype.field = function()
{
  return this.m_field;
}
fan.uiBuilder.VbBindingInput.prototype.field$ = function(it)
{
  this.m_field = it;
  return;
}
fan.uiBuilder.VbBindingInput.prototype.button = function()
{
  return this.m_button;
}
fan.uiBuilder.VbBindingInput.prototype.button$ = function(it)
{
  this.m_button = it;
  return;
}
fan.uiBuilder.VbBindingInput.prototype.node = function()
{
  return this.m_node;
}
fan.uiBuilder.VbBindingInput.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.uiBuilder.VbBindingInput.prototype.popup = function()
{
  return this.m_popup;
}
fan.uiBuilder.VbBindingInput.prototype.popup$ = function(it)
{
  this.m_popup = it;
  return;
}
fan.uiBuilder.VbBindingInput.prototype.m_field = null;
fan.uiBuilder.VbBindingInput.prototype.m_button = null;
fan.uiBuilder.VbBindingInput.prototype.m_node = null;
fan.uiBuilder.VbBindingInput.prototype.m_popup = null;
fan.uiBuilder.TileBuilder = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiBuilder.TileBuilder.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_tiles = fan.sys.List.make(fan.graphics.Rect.$type);
  this.m_cellElems = fan.sys.List.make(fan.dom.Elem.$type);
  this.m_tileElems = fan.sys.List.make(fan.dom.Elem.$type);
  return;
}
fan.uiBuilder.TileBuilder.prototype.$typeof = function() { return fan.uiBuilder.TileBuilder.$type; }
fan.uiBuilder.TileBuilder.make = function() {
  var self = new fan.uiBuilder.TileBuilder();
  fan.uiBuilder.TileBuilder.make$(self);
  return self;
  }
fan.uiBuilder.TileBuilder.make$ = function(self)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.m_colsField = self.makeFiled(fan.uiBuilder.TileBuilder.m_defCols);
  self.m_rowsField = self.makeFiled(fan.uiBuilder.TileBuilder.m_defRows);
  var clear = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u1,
    function(it)
    {
      it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
      it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
      it.style().trap("right",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
      it.text$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("clear")));
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u1,
        function(it)
        {
          $this.clearTiles();
          $this.update();
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  self.m_canvas = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
      it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["relative"]));
      it.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
      it.style().trap("outline",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      it.onEvent("mousedown",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          var fmove = null;
          var fup = null;
          $this.onMouseDown(e);
          fmove = fan.dom.Win.cur().doc().onEvent("mousemove",true,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u415,
            function(de)
            {
              $this.onMouseMove(de);
              return;
            }));
          fup = fan.dom.Win.cur().doc().onEvent("mouseup",true,fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u415,
            function(de)
            {
              $this.onMouseUp(de);
              fan.dom.Win.cur().doc().removeEvent("mouseup",true,fan.sys.ObjUtil.coerce(fmove,fan.sys.Type.find("sys::Func")));
              fan.dom.Win.cur().doc().removeEvent("mouseup",true,fan.sys.ObjUtil.coerce(fup,fan.sys.Type.find("sys::Func")));
              return;
            }));
          return;
        }));
      it.onEvent("mousemove",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.onMouseMove(e);
          return;
        }));
      it.onEvent("mouseup",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.onMouseUp(e);
          return;
        }));
      it.onEvent("keydown",false,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u44,
        function(e)
        {
          $this.onKeyDown(e);
          return;
        }));
      return;
    })),fan.domkit.Box.$type);
  var grid = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u3,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["6px"]));
      it.halign$(fan.domkit.Align.m_center);
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_colsField),fan.domkit.FlowBox.$type).add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u29,
        function(it)
        {
          it.add(fan.ui.Icon.outline("x").resize("12px"));
          return;
        }))),fan.domkit.FlowBox.$type).add($this.m_rowsField),fan.domkit.FlowBox.$type).add(clear);
      return;
    })),fan.domkit.FlowBox.$type);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["34px","100%"]));
      fan.sys.ObjUtil.coerce(it.add(grid),fan.domkit.SashBox.$type).add($this.m_canvas);
      return;
    })),fan.domkit.SashBox.$type));
  self.rebuild();
  return;
}
fan.uiBuilder.TileBuilder.prototype.load = function(spec)
{
  var $this = this;
  this.m_colsField.val$(fan.sys.Int.toStr(spec.m_cols));
  this.m_rowsField.val$(fan.sys.Int.toStr(spec.m_rows));
  this.clearTiles();
  this.rebuild();
  spec.m_tiles.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u416,
    function(t)
    {
      $this.addTile(t);
      return;
    }));
  this.update();
  return;
}
fan.uiBuilder.TileBuilder.prototype.save = function()
{
  var $this = this;
  var buf = fan.sys.StrBuf.make();
  buf.add(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("grid ",fan.sys.ObjUtil.coerce(this.m_cols,fan.sys.Obj.$type.toNullable())),"x"),fan.sys.ObjUtil.coerce(this.m_rows,fan.sys.Obj.$type.toNullable())));
  this.m_tiles.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u416,
    function(t)
    {
      var x = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(t.m_x,fan.sys.Num.$type));
      var y = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(t.m_y,fan.sys.Num.$type));
      var w = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(t.m_w,fan.sys.Num.$type));
      var h = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(t.m_h,fan.sys.Num.$type));
      if ((fan.sys.ObjUtil.compareGT(fan.sys.Int.plus(x,w),$this.m_cols) || fan.sys.ObjUtil.compareGT(fan.sys.Int.plus(y,h),$this.m_rows)))
      {
        return;
      }
      ;
      buf.join(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(x,fan.sys.Obj.$type.toNullable()))," "),fan.sys.ObjUtil.coerce(y,fan.sys.Obj.$type.toNullable()))," "),fan.sys.ObjUtil.coerce(w,fan.sys.Obj.$type.toNullable()))," "),fan.sys.ObjUtil.coerce(h,fan.sys.Obj.$type.toNullable())),"; ");
      return;
    }));
  return buf.toStr();
}
fan.uiBuilder.TileBuilder.prototype.clearTiles = function()
{
  var $this = this;
  this.m_tiles.clear();
  this.m_tileElems.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u417,
    function(t)
    {
      t.parent().remove(t);
      return;
    }));
  this.m_tileElems.clear();
  return;
}
fan.uiBuilder.TileBuilder.prototype.makeFiled = function(val)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u7,
    function(it)
    {
      it.val$(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(val,fan.sys.Obj.$type.toNullable())));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["60px"]));
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #bbb"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
      it.onModify(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u7,
        function(it)
        {
          $this.rebuild();
          return;
        }));
      return;
    })),fan.domkit.TextField.$type);
}
fan.uiBuilder.TileBuilder.prototype.rebuild = function()
{
  var $this = this;
  this.m_canvas.removeAll();
  this.m_cellElems.clear();
  this.m_tileElems.clear();
  this.m_cols = fan.sys.ObjUtil.coerce((function($this) { var $_u418 = fan.sys.Str.toInt($this.m_colsField.val(),10,false); if ($_u418 != null) return $_u418; return fan.sys.ObjUtil.coerce(fan.uiBuilder.TileBuilder.m_defCols,fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type);
  this.m_rows = fan.sys.ObjUtil.coerce((function($this) { var $_u419 = fan.sys.Str.toInt($this.m_rowsField.val(),10,false); if ($_u419 != null) return $_u419; return fan.sys.ObjUtil.coerce(fan.uiBuilder.TileBuilder.m_defRows,fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type);
  this.m_cellw = fan.sys.Float.div(fan.sys.Float.make(100.0),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.m_cols,fan.sys.Num.$type)));
  this.m_cellh = fan.sys.Float.div(fan.sys.Float.make(100.0),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.m_rows,fan.sys.Num.$type)));
  fan.sys.Int.times(this.m_rows,fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u420,
    function(r)
    {
      fan.sys.Int.times($this.m_cols,fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u421,
        function(c)
        {
          var cell = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u23,
            function(it)
            {
              it.style().addClass("cell");
              it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
              it.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
              it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiBuilder.TileBuilder.m_bgCell]));
              it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
              it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.multFloat(c,$this.m_cellw),fan.sys.Obj.$type.toNullable())),"%")]));
              it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.multFloat(r,$this.m_cellh),fan.sys.Obj.$type.toNullable())),"%")]));
              it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("calc(",fan.sys.Float.toLocale($this.m_cellw,"0.00",fan.sys.Locale.m_en)),"% - 5px)")]));
              it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("calc(",fan.sys.Float.toLocale($this.m_cellh,"0.00",fan.sys.Locale.m_en)),"% - 5px)")]));
              return;
            })),fan.domkit.Box.$type);
          $this.m_canvas.add(cell);
          $this.m_cellElems.add(cell);
          return;
        }));
      return;
    }));
  this.m_tiles.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u416,
    function(t)
    {
      $this.addTile(t,true);
      return;
    }));
  this.update();
  return;
}
fan.uiBuilder.TileBuilder.prototype.update = function()
{
  var $this = this;
  this.m_cellElems.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u422,
    function(cell)
    {
      cell.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiBuilder.TileBuilder.m_bgCell]));
      return;
    }));
  if ((this.m_pivot == null && this.m_tiles.isEmpty()))
  {
    this.showHelp();
  }
  else
  {
    this.hideHelp();
  }
  ;
  this.m_tileElems.each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u423,
    function(tile,i)
    {
      tile.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (fan.sys.ObjUtil.equals($this.m_tiles.get(i),$this.m_sel)) return fan.uiBuilder.TileBuilder.m_bgSel; return fan.uiBuilder.TileBuilder.m_bgTile; })($this)]));
      tile.firstChild().firstChild().text$(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.plus(i,1),fan.sys.Obj.$type.toNullable())));
      return;
    }));
  return;
}
fan.uiBuilder.TileBuilder.prototype.onMouseDown = function(e)
{
  this.m_canvas.focus();
  e.stop();
  var pos = this.m_canvas.relPos(e.pagePos());
  var c = this.toCol(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(pos.m_x,fan.sys.Num.$type)));
  var r = this.toRow(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(pos.m_y,fan.sys.Num.$type)));
  this.m_sel = this.toTile(c,r);
  this.m_pivot = (function($this) { if ($this.m_sel == null) return fan.graphics.Point.makeInt(c,r); return null; })(this);
  this.update();
  return;
}
fan.uiBuilder.TileBuilder.prototype.onMouseMove = function(e)
{
  var $this = this;
  e.stop();
  if (this.m_pivot == null)
  {
    return;
  }
  ;
  var cur = this.m_canvas.relPos(e.pagePos());
  var dc = this.toCol(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(cur.m_x,fan.sys.Num.$type)));
  var dr = this.toRow(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(cur.m_y,fan.sys.Num.$type)));
  var x1 = fan.sys.Int.max(fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_x,fan.sys.Num.$type)),dc),0);
  var y1 = fan.sys.Int.max(fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_y,fan.sys.Num.$type)),dr),0);
  var x2 = fan.sys.Int.min(fan.sys.Int.max(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_x,fan.sys.Num.$type)),dc),fan.sys.Int.minus(this.m_cols,1));
  var y2 = fan.sys.Int.min(fan.sys.Int.max(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_y,fan.sys.Num.$type)),dr),fan.sys.Int.minus(this.m_rows,1));
  this.update();
  fan.sys.Range.make(y2,y1).each(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u426,
    function(y)
    {
      fan.sys.Range.make(x2,x1).each(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u427,
        function(x)
        {
          var i = fan.sys.Int.plus(fan.sys.Int.mult($this.m_cols,y),x);
          var k = $this.m_canvas.children().get(i);
          k.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiBuilder.TileBuilder.m_bgSel]));
          return;
        }));
      return;
    }));
  return;
}
fan.uiBuilder.TileBuilder.prototype.onMouseUp = function(e)
{
  var $this = this;
  e.stop();
  if (this.m_pivot == null)
  {
    return;
  }
  ;
  var cur = this.m_canvas.relPos(e.pagePos());
  var dc = this.toCol(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(cur.m_x,fan.sys.Num.$type)));
  var dr = this.toRow(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(cur.m_y,fan.sys.Num.$type)));
  var x1 = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.max(fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_x,fan.sys.Num.$type)),dc),0),fan.sys.Num.$type));
  var y1 = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.max(fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_y,fan.sys.Num.$type)),dr),0),fan.sys.Num.$type));
  var x2 = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.min(fan.sys.Int.max(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_x,fan.sys.Num.$type)),dc),fan.sys.Int.minus(this.m_cols,1)),fan.sys.Num.$type));
  var y2 = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.min(fan.sys.Int.max(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.m_pivot.m_y,fan.sys.Num.$type)),dr),fan.sys.Int.minus(this.m_rows,1)),fan.sys.Num.$type));
  var rect = fan.graphics.Rect.make(x1,y1,fan.sys.Float.plusInt(fan.sys.Float.minus(x2,x1),1),fan.sys.Float.plusInt(fan.sys.Float.minus(y2,y1),1));
  if (fan.sys.ObjUtil.equals(this.m_tiles.any(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u428,
    function(t)
    {
      return t.intersects(rect);
    })),false))
  {
    this.addTile(rect);
    this.m_sel = rect;
  }
  ;
  this.update();
  this.m_pivot = null;
  return;
}
fan.uiBuilder.TileBuilder.prototype.onKeyDown = function(e)
{
  var $this = this;
  var $_u429 = e.key();
  if (fan.sys.ObjUtil.equals($_u429,fan.dom.Key.m_esc))
  {
    if (this.m_pivot == null)
    {
      return;
    }
    ;
    e.stop();
    this.m_pivot = null;
    this.update();
  }
  else if (fan.sys.ObjUtil.equals($_u429,fan.dom.Key.m_$delete) || fan.sys.ObjUtil.equals($_u429,fan.dom.Key.m_backspace))
  {
    if (this.m_sel == null)
    {
      return;
    }
    ;
    e.stop();
    var i = this.m_tiles.findIndex(fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u428,
      function(t)
      {
        return fan.sys.ObjUtil.equals(t,$this.m_sel);
      }));
    this.m_tiles.removeAt(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type));
    this.m_canvas.remove(this.m_tileElems.removeAt(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type)));
    this.update();
  }
  ;
  return;
}
fan.uiBuilder.TileBuilder.prototype.addTile = function(r,rebuild)
{
  if (rebuild === undefined) rebuild = false;
  var $this = this;
  var tile = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u23,
    function(it)
    {
      it.style().addClass("sel");
      it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
      it.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
      it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiBuilder.TileBuilder.m_bgTile]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
      it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.mult(r.m_x,$this.m_cellw),fan.sys.Obj.$type.toNullable())),"%")]));
      it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.mult(r.m_y,$this.m_cellh),fan.sys.Obj.$type.toNullable())),"%")]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("calc(",fan.sys.Float.toLocale(fan.sys.Float.mult(r.m_w,$this.m_cellw),"0.00",fan.sys.Locale.m_en)),"% - 5px)")]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("calc(",fan.sys.Float.toLocale(fan.sys.Float.mult(r.m_h,$this.m_cellh),"0.00",fan.sys.Locale.m_en)),"% - 5px)")]));
      it.add(fan.ui.UiUtil.makeCenterBox(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u89,
        function(it)
        {
          it.style().addClass("font-bold");
          it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
          it.text$("");
          return;
        })),fan.dom.Elem.$type)));
      return;
    })),fan.domkit.Box.$type);
  if (fan.sys.ObjUtil.equals(rebuild,false))
  {
    this.m_tiles.add(r);
  }
  ;
  this.m_canvas.add(tile);
  this.m_tileElems.add(tile);
  return;
}
fan.uiBuilder.TileBuilder.prototype.showHelp = function()
{
  var $this = this;
  if (this.m_help == null)
  {
    this.m_help = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
      fan.uiBuilder.$clos$_u23,
      function(it)
      {
        it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
        it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
        it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
        it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["50%"]));
        it.style().trap("transform",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["translateY(-50%)"]));
        it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
          fan.uiBuilder.$clos$_u8,
          function(it)
          {
            it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["34px"]));
            it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
            it.style().trap("color",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#999"]));
            it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["4px"]));
            it.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#e5e5e5"]));
            it.text$("Click and drag to create new tiles");
            return;
          })),fan.domkit.Label.$type));
        return;
      })),fan.domkit.Box.$type);
  }
  ;
  if (this.m_help.parent() == null)
  {
    this.m_canvas.add(fan.sys.ObjUtil.coerce(this.m_help,fan.dom.Elem.$type));
  }
  ;
  return;
}
fan.uiBuilder.TileBuilder.prototype.hideHelp = function()
{
  (function($this) { var $_u430 = $this.m_help.parent(); if ($_u430 == null) return null; return $_u430.remove(fan.sys.ObjUtil.coerce($this.m_help,fan.dom.Elem.$type)); })(this);
  return;
}
fan.uiBuilder.TileBuilder.prototype.toCol = function(x)
{
  return fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.floor(fan.sys.Float.div(fan.sys.Float.mult(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(x,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.m_canvas.size().m_w,fan.sys.Num.$type))),fan.sys.Float.make(100.0)),this.m_cellw)),fan.sys.Num.$type)),this.m_cols);
}
fan.uiBuilder.TileBuilder.prototype.toRow = function(y)
{
  return fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.floor(fan.sys.Float.div(fan.sys.Float.mult(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(y,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.m_canvas.size().m_h,fan.sys.Num.$type))),fan.sys.Float.make(100.0)),this.m_cellh)),fan.sys.Num.$type)),this.m_rows);
}
fan.uiBuilder.TileBuilder.prototype.toTile = function(c,r)
{
  var $this = this;
  return this.m_tiles.find(fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u428,
    function(t)
    {
      var x1 = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(t.m_x,fan.sys.Num.$type));
      var y1 = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(t.m_y,fan.sys.Num.$type));
      var x2 = fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.plus(t.m_x,t.m_w),fan.sys.Num.$type)),1);
      var y2 = fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.plus(t.m_y,t.m_h),fan.sys.Num.$type)),1);
      return (fan.sys.ObjUtil.compareGE(c,x1) && fan.sys.ObjUtil.compareGE(r,y1) && fan.sys.ObjUtil.compareLE(c,x2) && fan.sys.ObjUtil.compareLE(r,y2));
    }));
}
fan.uiBuilder.TileBuilder.prototype.colsField = function()
{
  return this.m_colsField;
}
fan.uiBuilder.TileBuilder.prototype.colsField$ = function(it)
{
  this.m_colsField = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.rowsField = function()
{
  return this.m_rowsField;
}
fan.uiBuilder.TileBuilder.prototype.rowsField$ = function(it)
{
  this.m_rowsField = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.canvas = function()
{
  return this.m_canvas;
}
fan.uiBuilder.TileBuilder.prototype.canvas$ = function(it)
{
  this.m_canvas = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.cols = function()
{
  return this.m_cols;
}
fan.uiBuilder.TileBuilder.prototype.cols$ = function(it)
{
  this.m_cols = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.rows = function()
{
  return this.m_rows;
}
fan.uiBuilder.TileBuilder.prototype.rows$ = function(it)
{
  this.m_rows = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.cellw = function()
{
  return this.m_cellw;
}
fan.uiBuilder.TileBuilder.prototype.cellw$ = function(it)
{
  this.m_cellw = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.cellh = function()
{
  return this.m_cellh;
}
fan.uiBuilder.TileBuilder.prototype.cellh$ = function(it)
{
  this.m_cellh = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.pivot = function()
{
  return this.m_pivot;
}
fan.uiBuilder.TileBuilder.prototype.pivot$ = function(it)
{
  this.m_pivot = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.sel = function()
{
  return this.m_sel;
}
fan.uiBuilder.TileBuilder.prototype.sel$ = function(it)
{
  this.m_sel = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.tiles = function()
{
  return this.m_tiles;
}
fan.uiBuilder.TileBuilder.prototype.tiles$ = function(it)
{
  this.m_tiles = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.cellElems = function()
{
  return this.m_cellElems;
}
fan.uiBuilder.TileBuilder.prototype.cellElems$ = function(it)
{
  this.m_cellElems = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.tileElems = function()
{
  return this.m_tileElems;
}
fan.uiBuilder.TileBuilder.prototype.tileElems$ = function(it)
{
  this.m_tileElems = it;
  return;
}
fan.uiBuilder.TileBuilder.prototype.help = function()
{
  return this.m_help;
}
fan.uiBuilder.TileBuilder.prototype.help$ = function(it)
{
  this.m_help = it;
  return;
}
fan.uiBuilder.TileBuilder.static$init = function()
{
  fan.uiBuilder.TileBuilder.m_defCols = 6;
  fan.uiBuilder.TileBuilder.m_defRows = 6;
  fan.uiBuilder.TileBuilder.m_bgCell = "#d9d9d9";
  fan.uiBuilder.TileBuilder.m_bgTile = "#999";
  fan.uiBuilder.TileBuilder.m_bgSel = "#3498db";
  return;
}
fan.uiBuilder.TileBuilder.m_defCols = 0;
fan.uiBuilder.TileBuilder.m_defRows = 0;
fan.uiBuilder.TileBuilder.m_bgCell = null;
fan.uiBuilder.TileBuilder.m_bgTile = null;
fan.uiBuilder.TileBuilder.m_bgSel = null;
fan.uiBuilder.TileBuilder.prototype.m_colsField = null;
fan.uiBuilder.TileBuilder.prototype.m_rowsField = null;
fan.uiBuilder.TileBuilder.prototype.m_canvas = null;
fan.uiBuilder.TileBuilder.prototype.m_cols = 0;
fan.uiBuilder.TileBuilder.prototype.m_rows = 0;
fan.uiBuilder.TileBuilder.prototype.m_cellw = fan.sys.Float.make(0);
fan.uiBuilder.TileBuilder.prototype.m_cellh = fan.sys.Float.make(0);
fan.uiBuilder.TileBuilder.prototype.m_pivot = null;
fan.uiBuilder.TileBuilder.prototype.m_sel = null;
fan.uiBuilder.TileBuilder.prototype.m_tiles = null;
fan.uiBuilder.TileBuilder.prototype.m_cellElems = null;
fan.uiBuilder.TileBuilder.prototype.m_tileElems = null;
fan.uiBuilder.TileBuilder.prototype.m_help = null;
fan.uiBuilder.VbNew = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiBuilder.VbNew.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiBuilder.VbNew.prototype.$typeof = function() { return fan.uiBuilder.VbNew.$type; }
fan.uiBuilder.VbNew.make = function(builder) {
  var self = new fan.uiBuilder.VbNew();
  fan.uiBuilder.VbNew.make$(self,builder);
  return self;
  }
fan.uiBuilder.VbNew.make$ = function(self,builder)
{
  var $this = self;
  self.m_builder = builder;
  self.m_cardBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.CardBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u431,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["640px"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["220px"]));
      fan.sys.ObjUtil.coerce(it.add($this.makeType()),fan.domkit.CardBox.$type).add($this.makeForm());
      return;
    })),fan.domkit.CardBox.$type);
  self.m_dialog = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.ContentDialog.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u127,
    function(it)
    {
      it.title$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("new"))," "),fan.sys.Pod.find("ui").locale("view")));
      it.width$("auto");
      it.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u23,
        function(it)
        {
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 10px"]));
          it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u23,
            function(it)
            {
              it.style().trap("borderTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px solid #d9d9d9"]));
              it.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
              it.add($this.m_cardBox);
              return;
            })),fan.domkit.Box.$type));
          return;
        })),fan.domkit.Box.$type));
      it.addButton("ok",null,true);
      it.addButton("cancel");
      it.onAction(fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u37,
        function(key)
        {
          if (fan.sys.ObjUtil.equals(key,"ok"))
          {
            return $this.doCommit();
          }
          ;
          return true;
        }));
      return;
    })),fan.ui.ContentDialog.$type);
  return;
}
fan.uiBuilder.VbNew.prototype.invoke = function(onCommit)
{
  this.onType();
  this.m_dialog.open();
  this.m_cbCommit = onCommit;
  return;
}
fan.uiBuilder.VbNew.prototype.onType = function()
{
  this.m_cardBox.effect$("slideRight");
  this.m_cardBox.selIndex$(fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
  this.m_dialog.button("ok").enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiBuilder.VbNew.prototype.onForm = function()
{
  var $this = this;
  this.m_cardBox.effect$("slideLeft");
  this.m_cardBox.selIndex$(fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()));
  this.m_dialog.button("ok").enabled$(fan.sys.ObjUtil.coerce(true,fan.sys.Bool.$type.toNullable()));
  fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("350ms"),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u45,
    function(it)
    {
      $this.m_viewInput.querySelector("input").focus();
      return;
    }));
  return;
}
fan.uiBuilder.VbNew.prototype.makeType = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["auto","auto"]));
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
      fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u8,
        function(it)
        {
          it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
          it.text$(fan.sys.Str.plus(fan.sys.Str.plus("",fan.uiBuilder.VbNew.$type.pod().locale("selectViewType","Select the type of view to create")),":"));
          return;
        })),fan.domkit.Label.$type)),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          var group = fan.domkit.ButtonGroup.make();
          fan.sys.List.make(fan.sys.Str.$type, ["tile","report","custom"]).each(fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u432,
            function(t)
            {
              group.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u31,
                function(it)
                {
                  it.style().addClass("uiBuilder-flush");
                  it.onAction(fan.sys.Func.make$closure(
                    fan.uiBuilder.$clos$_u31,
                    function(it)
                    {
                      $this.m_type = t;
                      $this.onForm();
                      return;
                    }));
                  fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("img"),fan.sys.Func.make$closure(
                    fan.uiBuilder.$clos$_u89,
                    function(it)
                    {
                      it.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("/pod/uiBuilder/res/svg/",t),".svg")]));
                      return;
                    })),fan.dom.Elem.$type)),fan.domkit.ToggleButton.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
                    fan.uiBuilder.$clos$_u8,
                    function(it)
                    {
                      it.text$(fan.sys.Str.plus("",fan.sys.Str.toDisplayName(t)));
                      return;
                    })),fan.domkit.Label.$type));
                  return;
                })),fan.domkit.ToggleButton.$type));
              return;
            }));
          it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["10px"]));
          it.addAll(group.buttons());
          return;
        })),fan.domkit.FlowBox.$type));
      return;
    })),fan.domkit.SashBox.$type);
}
fan.uiBuilder.VbNew.prototype.makeForm = function()
{
  var $this = this;
  this.m_viewInput = fan.ui.Input.makeForTag(this.m_builder.m_session,"view","myView");
  this.m_disInput = fan.ui.Input.makeForTag(this.m_builder.m_session,"dis","My View");
  this.m_appInput = fan.ui.Input.makeForTag(this.m_builder.m_session,"appName","misc");
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiBuilder.$clos$_u6,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_down);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["auto","auto"]));
      fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u3,
        function(it)
        {
          it.style().trap("paddingBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["20px"]));
          it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u1,
            function(it)
            {
              it.style().addClass("link");
              it.style().trap("paddingLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["5px"]));
              it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u29,
                function(it)
                {
                  it.icon$(fan.ui.Icon.outline("navLeft","#5a89c2"));
                  it.label$(fan.sys.Str.plus("",fan.sys.Pod.find("ui").locale("back")));
                  return;
                })));
              it.onAction(fan.sys.Func.make$closure(
                fan.uiBuilder.$clos$_u1,
                function(it)
                {
                  $this.onType();
                  return;
                }));
              return;
            })),fan.domkit.Button.$type));
          return;
        })),fan.domkit.FlowBox.$type)),fan.domkit.SashBox.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.GridBox.make(),fan.sys.Func.make$closure(
        fan.uiBuilder.$clos$_u2,
        function(it)
        {
          it.halign$(fan.domkit.Align.m_center);
          it.cellStyle("*","*","padding: 4px");
          it.cellStyle(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),"*","white-space: nowrap");
          it.cellStyle(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),"*","width: 500px");
          it.addRow(fan.sys.List.make(fan.dom.Elem.$type.toNullable(), [fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              it.text$("view");
              return;
            })),fan.domkit.Label.$type),$this.m_viewInput]));
          it.addRow(fan.sys.List.make(fan.dom.Elem.$type.toNullable(), [fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              it.text$("dis");
              return;
            })),fan.domkit.Label.$type),$this.m_disInput]));
          it.addRow(fan.sys.List.make(fan.dom.Elem.$type.toNullable(), [fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiBuilder.$clos$_u8,
            function(it)
            {
              it.text$("appName");
              return;
            })),fan.domkit.Label.$type),$this.m_appInput]));
          return;
        })),fan.domkit.GridBox.$type));
      return;
    })),fan.domkit.SashBox.$type);
}
fan.uiBuilder.VbNew.prototype.doCommit = function()
{
  try
  {
    var map = fan.sys.Map.fromLiteral(["view","dis","appName"],[this.m_viewInput.save(),this.m_disInput.save(),this.m_appInput.save()],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
    var $_u433 = this.m_type;
    if (fan.sys.ObjUtil.equals($_u433,"tile"))
    {
      map.set("src","view: {inherit:\"tile\"}\nlayout: {var kind:\"Str\" defVal:\"grid 6x6; 0 0 6 3; 0 3 6 3\"}\nsubView1: Trio:\n  view: {inherit:\"blank\"}\nsubView2: Trio:\n  view: {inherit:\"blank\"}");
    }
    else if (fan.sys.ObjUtil.equals($_u433,"report"))
    {
      map.set("src","view: {inherit:\"page\"}\nheading: Trio:\n  view: {inherit:\"fandoc\"}\n  data: {expr:\"\\\"New Report\\\\n***\\\"\"}\nsubView1: Trio:\n  view: {inherit:\"blank\"}");
    }
    else
    {
      map.set("src","view: {inherit:\"blank\"}");
    }
    ;
    this.m_cbCommit.call(this.m_dialog,fan.haystack.Etc.makeDict(map));
    return false;
  }
  catch ($_u434)
  {
    $_u434 = fan.sys.Err.make($_u434);
    if ($_u434 instanceof fan.sys.Err)
    {
      var err = $_u434;
      var err;
      fan.ui.Flash.showErr(fan.sys.ObjUtil.coerce(this.m_dialog.content(),fan.dom.Elem.$type),err);
      return false;
    }
    else
    {
      throw $_u434;
    }
  }
  ;
}
fan.uiBuilder.VbNew.prototype.builder = function()
{
  return this.m_builder;
}
fan.uiBuilder.VbNew.prototype.builder$ = function(it)
{
  this.m_builder = it;
  return;
}
fan.uiBuilder.VbNew.prototype.dialog = function()
{
  return this.m_dialog;
}
fan.uiBuilder.VbNew.prototype.dialog$ = function(it)
{
  this.m_dialog = it;
  return;
}
fan.uiBuilder.VbNew.prototype.cardBox = function()
{
  return this.m_cardBox;
}
fan.uiBuilder.VbNew.prototype.cardBox$ = function(it)
{
  this.m_cardBox = it;
  return;
}
fan.uiBuilder.VbNew.prototype.type = function()
{
  return this.m_type;
}
fan.uiBuilder.VbNew.prototype.type$ = function(it)
{
  this.m_type = it;
  return;
}
fan.uiBuilder.VbNew.prototype.viewInput = function()
{
  return this.m_viewInput;
}
fan.uiBuilder.VbNew.prototype.viewInput$ = function(it)
{
  this.m_viewInput = it;
  return;
}
fan.uiBuilder.VbNew.prototype.disInput = function()
{
  return this.m_disInput;
}
fan.uiBuilder.VbNew.prototype.disInput$ = function(it)
{
  this.m_disInput = it;
  return;
}
fan.uiBuilder.VbNew.prototype.appInput = function()
{
  return this.m_appInput;
}
fan.uiBuilder.VbNew.prototype.appInput$ = function(it)
{
  this.m_appInput = it;
  return;
}
fan.uiBuilder.VbNew.prototype.cbCommit = function()
{
  return this.m_cbCommit;
}
fan.uiBuilder.VbNew.prototype.cbCommit$ = function(it)
{
  this.m_cbCommit = it;
  return;
}
fan.uiBuilder.VbNew.prototype.m_builder = null;
fan.uiBuilder.VbNew.prototype.m_dialog = null;
fan.uiBuilder.VbNew.prototype.m_cardBox = null;
fan.uiBuilder.VbNew.prototype.m_type = null;
fan.uiBuilder.VbNew.prototype.m_viewInput = null;
fan.uiBuilder.VbNew.prototype.m_disInput = null;
fan.uiBuilder.VbNew.prototype.m_appInput = null;
fan.uiBuilder.VbNew.prototype.m_cbCommit = null;
fan.uiBuilder.$pod = fan.sys.Pod.$add('uiBuilder');
with (fan.uiBuilder.$pod)
{
  fan.uiBuilder.BacnetDiscoverView.$type = $at('BacnetDiscoverView','ui::UiView',[],{'sys::Js':""},128);
  fan.uiBuilder.HostNode.$type = $at('HostNode','domkit::TreeNode',[],{'sys::Js':""},128);
  fan.uiBuilder.NetNode.$type = $at('NetNode','domkit::TreeNode',[],{'sys::Js':""},128);
  fan.uiBuilder.DevNode.$type = $at('DevNode','domkit::TreeNode',[],{'sys::Js':""},128);
  fan.uiBuilder.CbBoxTable.$type = $at('CbBoxTable','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.CbBoxPimTable.$type = $at('CbBoxPimTable','domkit::Box',[],{'sys::Js':""},129);
  fan.uiBuilder.ConnBuilder.$type = $at('ConnBuilder','ui::UiView',[],{'sys::Js':""},128);
  fan.uiBuilder.CbBoxConn.$type = $at('CbBoxConn','uiBuilder::CbBoxPimTable',[],{'sys::Js':""},128);
  fan.uiBuilder.CbNewConnDialog.$type = $at('CbNewConnDialog','ui::ContentDialog',[],{'sys::Js':""},128);
  fan.uiBuilder.CbBoxPoint.$type = $at('CbBoxPoint','uiBuilder::CbBoxPimTable',[],{'sys::Js':""},128);
  fan.uiBuilder.CbActions.$type = $at('CbActions','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.CbModel.$type = $at('CbModel','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.CbBoxList.$type = $at('CbBoxList','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.ConnTraceView.$type = $at('ConnTraceView','ui::UiView',[],{'sys::Js':""},8192);
  fan.uiBuilder.ConnTraceTypesInput.$type = $at('ConnTraceTypesInput','ui::Input',[],{'sys::Js':""},128);
  fan.uiBuilder.ConnTraceTypesPopup.$type = $at('ConnTraceTypesPopup','domkit::Popup',[],{'sys::Js':""},128);
  fan.uiBuilder.ConnTraceViewState.$type = $at('ConnTraceViewState','sys::Obj',[],{'sys::Js':""},130);
  fan.uiBuilder.CbReq.$type = $at('CbReq','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.CbFeed.$type = $at('CbFeed','ui::UiFeed',[],{'sys::Js':""},128);
  fan.uiBuilder.CbBoxDetail.$type = $at('CbBoxDetail','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.FbEditFile.$type = $at('FbEditFile','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.FbPreviewBox.$type = $at('FbPreviewBox','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.FbAxRename.$type = $at('FbAxRename','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.FileBuilder.$type = $at('FileBuilder','ui::UiView',[],{'sys::Js':""},128);
  fan.uiBuilder.LibActions.$type = $at('LibActions','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.ShellResultBox.$type = $at('ShellResultBox','domkit::Box',['ui::ChartViewPrezable','ui::TableViewPrezable'],{'sys::Js':""},128);
  fan.uiBuilder.ShellView.$type = $at('ShellView','ui::UiView',[],{'sys::Js':""},128);
  fan.uiBuilder.ShellToolBar.$type = $at('ShellToolBar','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.ShellQueryBar.$type = $at('ShellQueryBar','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.ShellInputMode.$type = $at('ShellInputMode','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},170);
  fan.uiBuilder.SiteBuilder.$type = $at('SiteBuilder','ui::UiView',[],{'sys::Js':""},128);
  fan.uiBuilder.SbUpdater.$type = $at('SbUpdater','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.SbReq.$type = $at('SbReq','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.SbBatchBind.$type = $at('SbBatchBind','ui::ContentDialog',[],{'sys::Js':""},128);
  fan.uiBuilder.SbBindInfo.$type = $at('SbBindInfo','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.SbAction.$type = $at('SbAction','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.SbSyncHis.$type = $at('SbSyncHis','ui::ContentDialog',[],{'sys::Js':""},128);
  fan.uiBuilder.SbInfoBox.$type = $at('SbInfoBox','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.ViewMgr.$type = $at('ViewMgr','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.VbInspector.$type = $at('VbInspector','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbActionEditor.$type = $at('VbActionEditor','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbEdBox.$type = $at('VbEdBox','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbEdView.$type = $at('VbEdView','uiBuilder::VbEdBox',[],{'sys::Js':""},128);
  fan.uiBuilder.VbViewTool.$type = $at('VbViewTool','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbDataTool.$type = $at('VbDataTool','uiBuilder::VbViewTool',[],{'sys::Js':""},128);
  fan.uiBuilder.VbTextTool.$type = $at('VbTextTool','uiBuilder::VbViewTool',[],{'sys::Js':""},128);
  fan.uiBuilder.VbReuseTool.$type = $at('VbReuseTool','uiBuilder::VbViewTool',[],{'sys::Js':""},128);
  fan.uiBuilder.VbTileTool.$type = $at('VbTileTool','uiBuilder::VbViewTool',[],{'sys::Js':""},128);
  fan.uiBuilder.VbCanvas.$type = $at('VbCanvas','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbNode.$type = $at('VbNode','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.VbEdActions.$type = $at('VbEdActions','uiBuilder::VbEdBox',[],{'sys::Js':""},128);
  fan.uiBuilder.VbEditor.$type = $at('VbEditor','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbBatchBind.$type = $at('VbBatchBind','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.ViewBuilder.$type = $at('ViewBuilder','ui::UiView',[],{'sys::Js':""},128);
  fan.uiBuilder.VbEdSrc.$type = $at('VbEdSrc','uiBuilder::VbEdBox',[],{'sys::Js':""},128);
  fan.uiBuilder.VbTree.$type = $at('VbTree','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbTreeNode.$type = $at('VbTreeNode','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbNodeReorder.$type = $at('VbNodeReorder','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbTreeReorderEntry.$type = $at('VbTreeReorderEntry','dom::Elem',[],{'sys::Js':""},128);
  fan.uiBuilder.VbNodeRemover.$type = $at('VbNodeRemover','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.VbEdVars.$type = $at('VbEdVars','uiBuilder::VbEdBox',[],{'sys::Js':""},128);
  fan.uiBuilder.VbVarInput.$type = $at('VbVarInput','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbVarMode.$type = $at('VbVarMode','domkit::FlowBox',[],{'sys::Js':""},128);
  fan.uiBuilder.VbBindingInput.$type = $at('VbBindingInput','ui::Input',[],{'sys::Js':""},128);
  fan.uiBuilder.TileBuilder.$type = $at('TileBuilder','domkit::Box',[],{'sys::Js':""},128);
  fan.uiBuilder.VbNew.$type = $at('VbNew','sys::Obj',[],{'sys::Js':""},128);
  fan.uiBuilder.BacnetDiscoverView.$type.$af('bcastAddrs',73728,'domkit::ListButton',{}).$af('bcastAddr',73728,'domkit::TextField',{}).$af('textLowRange',73728,'domkit::TextField',{}).$af('textHighRange',73728,'domkit::TextField',{}).$af('textTimeout',73728,'domkit::TextField',{}).$af('discover',73728,'domkit::Button',{}).$af('devTree',73728,'domkit::Tree',{}).$af('addDev',73728,'domkit::Button',{}).$af('discovered',73728,'domkit::SashBox',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('textField',2048,'domkit::TextField',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('text','sys::Str',false),new fan.sys.Param('place','sys::Str',true)]),{}).$am('label',2048,'domkit::Label',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('text','sys::Str',false)]),{}).$am('loadBroadcastAddrs',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onDiscover',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('loadDiscovery',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('g','haystack::Grid',false)]),{}).$am('doAddDevice',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.HostNode.$type.$af('ip',73730,'sys::Str',{}).$af('networks',73728,'[sys::Str:uiBuilder::NetNode]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ip','sys::Str',false)]),{}).$am('children',271360,'domkit::TreeNode[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onElem',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false),new fan.sys.Param('flags','domkit::TreeFlags',false)]),{});
  fan.uiBuilder.NetNode.$type.$af('dnet',73730,'sys::Str',{}).$af('devices',73728,'uiBuilder::DevNode[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dnet','sys::Str',false)]),{}).$am('children',271360,'domkit::TreeNode[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onElem',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false),new fan.sys.Param('flags','domkit::TreeFlags',false)]),{});
  fan.uiBuilder.DevNode.$type.$af('device',73730,'haystack::Dict',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('device','haystack::Dict',false)]),{}).$am('deviceName',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('deviceId',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('deviceAdr',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('uri',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onElem',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false),new fan.sys.Param('flags','domkit::TreeFlags',false)]),{});
  fan.uiBuilder.CbBoxTable.$type.$af('model',67584,'uiBuilder::CbModel',{}).$af('sash',67584,'domkit::SashBox',{}).$af('conns',65664,'uiBuilder::CbBoxConn',{}).$af('points',65664,'uiBuilder::CbBoxPoint',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('model','uiBuilder::CbModel',false)]),{}).$am('prime',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onConns','sys::Func?',true)]),{});
  fan.uiBuilder.CbBoxPimTable.$type.$am('pim',8192,'pim::PimGrid',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('table',270337,'ui::UiPimTable',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('data','haystack::Grid',false)]),{}).$am('onFeed',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','haystack::Grid',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.ConnBuilder.$type.$af('isInit',65664,'sys::Bool',{}).$af('model',67584,'uiBuilder::CbModel',{}).$af('sashTop',67584,'domkit::SashBox',{}).$af('sashRight',67584,'domkit::SashBox',{}).$af('sashBottom',67584,'domkit::SashBox',{}).$af('toolbar',65664,'domkit::Box',{}).$af('list',65664,'uiBuilder::CbBoxList',{}).$af('table',65664,'uiBuilder::CbBoxTable',{}).$af('details',65664,'uiBuilder::CbBoxDetail',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sel',271360,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('reload',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLayout',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('checkNew',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('reloadNew',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.CbBoxConn.$type.$af('table',336896,'ui::UiPimTable',{}).$af('model',67584,'uiBuilder::CbModel',{}).$af('filter',65664,'domkit::TextField',{}).$af('buttons',67584,'[sys::Str:domkit::Button]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('model','uiBuilder::CbModel',false)]),{}).$am('onLoading',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('sel',128,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clearSel',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('syncSel',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conn','haystack::Dict?',false)]),{}).$am('onSelect',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('connCols',2048,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{});
  fan.uiBuilder.CbNewConnDialog.$type.$af('view',67584,'uiBuilder::ConnBuilder',{}).$af('selIndex',67584,'sys::Int?',{}).$af('grid',67584,'haystack::Grid?',{}).$af('cbOk',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::ConnBuilder',false)]),{}).$am('onOk',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('reload',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onKeyEvent',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('box','domkit::GridBox',false),new fan.sys.Param('e','dom::Event',false)]),{}).$am('onSelect',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('box','domkit::GridBox',false),new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('onEnableExt',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','haystack::Dict',false)]),{}).$am('setOk',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','sys::Bool',false)]),{});
  fan.uiBuilder.CbBoxPoint.$type.$af('table',336896,'ui::UiPimTable',{}).$af('model',67584,'uiBuilder::CbModel',{}).$af('sash',67584,'domkit::SashBox',{}).$af('cols',67584,'sys::Str[]',{}).$af('edit',67584,'domkit::Button',{}).$af('trash',67584,'domkit::Button',{}).$af('cxMenu',67584,'domkit::Button',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('model','uiBuilder::CbModel',false)]),{}).$am('onLoading',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('sel',128,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSelect',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pointCols',2048,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{});
  fan.uiBuilder.CbActions.$type.$af('model',67584,'uiBuilder::CbModel',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('model','uiBuilder::CbModel',false)]),{}).$am('newConn',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('edit',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dicts','haystack::Dict[]',false)]),{}).$am('dup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','haystack::Dict',false)]),{}).$am('trash',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false)]),{}).$am('enable',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{}).$am('disable',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{}).$am('ping',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{}).$am('close',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{});
  fan.uiBuilder.CbModel.$type.$af('view',73728,'uiBuilder::ConnBuilder',{}).$af('req',73728,'uiBuilder::CbReq',{}).$af('actions',73728,'uiBuilder::CbActions',{}).$af('exts',73728,'haystack::Dict[]',{}).$af('filter',73728,'sys::Str?',{}).$af('selectedExt',73728,'haystack::Dict?',{}).$af('selectedConns',73728,'haystack::Dict[]',{}).$af('selectedPoints',73728,'haystack::Dict[]',{}).$af('detailsConn',73728,'haystack::Dict?',{}).$af('detailsPoint',73728,'haystack::Dict?',{}).$af('detailsIndex',73728,'sys::Int',{}).$af('showPoints',73728,'sys::Bool',{}).$af('showDetails',73728,'sys::Bool',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::ConnBuilder',false)]),{}).$am('session',8192,'ui::UiSession',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('init',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('restore',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tag','sys::Str?',false),new fan.sys.Param('ref','haystack::Ref?',false),new fan.sys.Param('filter','sys::Str?',false)]),{}).$am('selectExt',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ext','haystack::Dict?',false),new fan.sys.Param('onConns','|haystack::Dict[]->sys::Void|?',true)]),{}).$am('selectConnFilter',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('filter','sys::Str?',false)]),{}).$am('selectConn',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]?',false)]),{}).$am('selectPoint',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('points','haystack::Dict[]?',false)]),{}).$am('selectDetails',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',true)]),{}).$am('togglePoints',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toggleDetails',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('commit',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false)]),{}).$am('dup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','haystack::Dict',false),new fan.sys.Param('count','sys::Int',false),new fan.sys.Param('cascade','sys::Bool',false)]),{}).$am('trash',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false)]),{}).$am('reloadExts',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('updateExts',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('updateConns',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::Func?',true)]),{}).$am('updatePoints',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('updateDetails',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pointConnRef',2048,'haystack::Ref?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pt','haystack::Dict?',false)]),{});
  fan.uiBuilder.CbBoxList.$type.$af('model',67584,'uiBuilder::CbModel',{}).$af('sash',67584,'domkit::SashBox',{}).$af('list',67584,'ui::ListBox',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('model','uiBuilder::CbModel',false)]),{}).$am('onLoading',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('items','haystack::Dict[]',false)]),{}).$am('onUpdate',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('syncSel',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ext','haystack::Dict?',false)]),{});
  fan.uiBuilder.ConnTraceView.$type.$af('state',67584,'uiBuilder::ConnTraceViewState',{}).$af('pause',67584,'domkit::ToggleButton',{}).$af('infoBar',67584,'domkit::FlowBox',{}).$af('enableAction',67584,'domkit::Button',{}).$af('disableAction',67584,'domkit::Button',{}).$af('table',67584,'ui::UiPimTable',{}).$af('details',67584,'domkit::TextArea',{}).$af('card',67584,'domkit::Box',{}).$af('disabled',67584,'domkit::Box',{}).$af('main',67584,'domkit::Box',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sel',271360,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onFeed',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('node','view::DataNode',false),new fan.sys.Param('res','haystack::Dict',false)]),{}).$am('updateDetails',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('updateState',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('meta','haystack::Dict',false)]),{}).$am('updateInfoBar',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.ConnTraceTypesInput.$type.$af('val',67584,'sys::Str',{}).$af('button',67584,'domkit::Button',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj',false)]),{}).$am('onSave',267264,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRO',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.ConnTraceTypesPopup.$type.$af('enum',67584,'pim::PimEnum',{}).$af('checks',67584,'domkit::Checkbox[]',{}).$af('ok',67584,'domkit::Button',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('session','ui::UiSession',false),new fan.sys.Param('val','sys::Str',false),new fan.sys.Param('onOk','|sys::Str->sys::Void|',false)]),{}).$am('checkOk',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('save',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.ConnTraceViewState.$type.$af('conn',73730,'haystack::Dict',{}).$af('icon',73730,'sys::Str',{}).$af('isEnabled',73730,'sys::Bool',{}).$af('sel',73730,'haystack::Dict[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('meta','haystack::Dict',false)]),{}).$am('hasSel',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.CbReq.$type.$af('model',67584,'uiBuilder::CbModel',{}).$af('connFeedKey',67584,'sys::Str?',{}).$af('pointFeedKey',67584,'sys::Str?',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('model','uiBuilder::CbModel',false)]),{}).$am('loadExts',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('callback','|haystack::Dict[]->sys::Void|',false)]),{}).$am('loadConns',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ext','sys::Str',false),new fan.sys.Param('filter','sys::Str?',false),new fan.sys.Param('box','uiBuilder::CbBoxConn',false),new fan.sys.Param('onDone','|haystack::Dict[]->sys::Void|?',true)]),{}).$am('loadPoints',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false),new fan.sys.Param('box','uiBuilder::CbBoxPoint',false)]),{}).$am('loadDetails',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','haystack::Dict',false),new fan.sys.Param('callback','|haystack::Grid->sys::Void|',false)]),{}).$am('loadRec',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','haystack::Dict',false),new fan.sys.Param('callback','|haystack::Dict->sys::Void|',false)]),{}).$am('loadRecs',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false),new fan.sys.Param('callback','|haystack::Dict[]->sys::Void|',false)]),{}).$am('enable',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{}).$am('disable',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{}).$am('ping',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{}).$am('close',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conns','haystack::Dict[]',false)]),{}).$am('commit',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false),new fan.sys.Param('callback','|haystack::Dict[]->sys::Void|',false)]),{}).$am('dup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false),new fan.sys.Param('count','sys::Int',false),new fan.sys.Param('cascade','sys::Bool',false),new fan.sys.Param('callback','|haystack::Dict[]->sys::Void|',false)]),{}).$am('trash',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('refs','haystack::Ref[]',false),new fan.sys.Param('callback','|haystack::Dict[]->sys::Void|',false)]),{});
  fan.uiBuilder.CbFeed.$type.$af('model',67584,'uiBuilder::CbModel',{}).$af('box',67584,'uiBuilder::CbBoxPimTable',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('m','uiBuilder::CbModel',false),new fan.sys.Param('box','uiBuilder::CbBoxPimTable',false)]),{}).$am('onFeed',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','haystack::Grid',false)]),{});
  fan.uiBuilder.CbBoxDetail.$type.$af('model',67584,'uiBuilder::CbModel',{}).$af('nav',67584,'domkit::FlowBox',{}).$af('refresh',67584,'domkit::Button',{}).$af('content',67584,'domkit::Box',{}).$af('lastReqId',67584,'haystack::Ref?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('model','uiBuilder::CbModel',false)]),{}).$am('onUpdate',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conn','haystack::Dict?',false),new fan.sys.Param('point','haystack::Dict?',false),new fan.sys.Param('index','sys::Int',false)]),{});
  fan.uiBuilder.FbEditFile.$type.$af('view',67584,'uiBuilder::FileBuilder',{}).$af('file',67584,'ui::UiFile',{}).$af('editor',67584,'ui::TextEditor',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::FileBuilder',false),new fan.sys.Param('file','ui::UiFile',false),new fan.sys.Param('text','sys::Str',false)]),{}).$am('invoke',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.FbPreviewBox.$type.$af('view',67584,'uiBuilder::FileBuilder',{}).$af('header',67584,'domkit::Box',{}).$af('preview',67584,'domkit::Box',{}).$af('info',67584,'domkit::Label',{}).$af('vbut',67584,'domkit::ListButton',{}).$af('download',67584,'domkit::Button',{}).$af('edit',67584,'domkit::Button',{}).$af('rename',67584,'domkit::Button',{}).$af('delete',67584,'domkit::Button',{}).$af('node',67584,'pim::PimNode?',{}).$af('file',67584,'ui::UiFile?',{}).$af('val',67584,'sys::Obj?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::FileBuilder',false)]),{}).$am('load',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','pim::PimNode?',false),new fan.sys.Param('fview','ui::UiFileView?',true)]),{}).$am('loadDir',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('loadText',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('loadTable',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('loadImage',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('loadUnknown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiFileView',false)]),{}).$am('onDownload',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onDirSelect',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('row','haystack::Dict?',false)]),{}).$am('onDirAction',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('row','haystack::Dict?',false)]),{});
  fan.uiBuilder.FbAxRename.$type.$af('view',67584,'ui::UiView',{}).$af('action',67584,'ui::UiAction',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::FileBuilder',false)]),{}).$am('button',8192,'domkit::Button',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('openDialog',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.FileBuilder.$type.$af('tree',67584,'ui::UiPimTree',{}).$af('preview',67584,'uiBuilder::FbPreviewBox',{}).$af('newBut',67584,'domkit::Button',{}).$af('upload',67584,'domkit::Button',{}).$af('inUpdate',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sel',271360,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refresh',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('goto',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('makeNewButton',2048,'domkit::Button',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('names','sys::Str[]',false)]),{}).$am('makeButton',128,'domkit::Button',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('onInvoke','sys::Func?',true)]),{}).$am('updateSel',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{});
  fan.uiBuilder.LibActions.$type.$am('enable',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false)]),{}).$am('disable',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false)]),{}).$am('checkCloud',34818,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false)]),{}).$am('isExtSettings',34818,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false)]),{}).$am('showErr',34818,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('info','sys::Str',false)]),{}).$am('toNames',34818,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rows','haystack::Dict[]',false)]),{}).$am('dependents',34818,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ns','skyarc::SysNamespace',false),new fan.sys.Param('toDisable','sys::Str[]',false)]),{}).$am('missingDepends',34818,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ns','skyarc::SysNamespace',false),new fan.sys.Param('toEnable','haystack::Dict[]',false)]),{}).$am('missingSysMods',34818,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ns','skyarc::SysNamespace',false),new fan.sys.Param('libNames','sys::Str[]',false)]),{}).$am('eval',34818,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false),new fan.sys.Param('funcName','sys::Str',false),new fan.sys.Param('libNames','sys::Str[]',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.ShellResultBox.$type.$af('cbSelect',67584,'sys::Func?',{}).$af('cbAction',67584,'sys::Func?',{}).$af('cbRefNav',67584,'sys::Func?',{}).$af('view',67584,'uiBuilder::ShellView',{}).$af('vizBox',336896,'ui::VizBox?',{}).$af('sview',67584,'sys::Str?',{}).$af('tprez',67584,'ui::TableViewPrez?',{}).$af('cprez',67584,'ui::ChartViewPrez?',{}).$af('sash',67584,'domkit::SashBox?',{}).$af('pimRenderer',67584,'ui::UiPimRenderer?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::ShellView',false)]),{}).$am('selRows',8192,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|haystack::Dict[]->sys::Void|',false)]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|haystack::Dict[]->sys::Void|',false)]),{}).$am('onRefNav',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|haystack::Ref->sys::Void|',false)]),{}).$am('load',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','sys::Str',false),new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('loadErr',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('err','haystack::Grid',false)]),{}).$am('feedUpdate',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('feed','haystack::Grid',false)]),{}).$am('toTable',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('toCard',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('toChart',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('toText',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('toFandoc',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('toFiletype',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('togglePrez',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('viewNode',271360,'view::ViewNode',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('update',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('changes','[sys::Str:sys::Obj]',false),new fan.sys.Param('opts','haystack::Dict',true)]),{}).$am('openPrez',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('closePrez',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('highlight',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int?',false),new fan.sys.Param('row','sys::Int?',false)]),{});
  fan.uiBuilder.ShellView.$type.$af('sashBox',67584,'domkit::SashBox',{}).$af('query',67584,'uiBuilder::ShellQueryBar',{}).$af('tools',67584,'uiBuilder::ShellToolBar',{}).$af('result',67584,'uiBuilder::ShellResultBox',{}).$af('curView',65664,'sys::Str?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sel',271360,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('templatePref',271360,'skyarc::TemplateDef?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','view::ActionNode',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdateNew',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('res','haystack::Grid',false)]),{}).$am('onUpdateDup',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('res','haystack::Grid',false)]),{}).$am('onFeed',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('data','view::DataNode',false),new fan.sys.Param('res','haystack::Dict',false)]),{}).$am('onDataErr',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('err','haystack::Grid',false)]),{}).$am('commands',271360,'skyarc::CommandDef[]',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('onCommand',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cmd','skyarc::CommandDef',false),new fan.sys.Param('event','dom::Event',false)]),{'sys::NoDoc':""}).$am('openPrez',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('focusView',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('queryRebuilt',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','uiBuilder::ShellInputMode',false)]),{}).$am('onAction',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('sel','haystack::Dict[]',false)]),{});
  fan.uiBuilder.ShellToolBar.$type.$af('baseViews',100354,'sys::Str[]',{}).$af('allViews',67586,'sys::Str[]',{}).$af('view',67584,'uiBuilder::ShellView',{}).$af('query',67584,'domkit::Label',{}).$af('recNew',67584,'domkit::Button',{}).$af('recEdit',67584,'domkit::Button',{}).$af('recDup',67584,'domkit::Button',{}).$af('recTrash',67584,'domkit::Button',{}).$af('cxMenu',67584,'domkit::Button',{}).$af('showMeta',67584,'domkit::Button',{}).$af('saveView',67584,'domkit::Button',{}).$af('views',67584,'domkit::Button',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::ShellView',false)]),{}).$am('update',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('expr','sys::Str',false),new fan.sys.Param('view','sys::Str',false)]),{}).$am('onShowMeta',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSaveView',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onViewsMenu',2048,'domkit::Popup',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('viewDis',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','sys::Str',false)]),{}).$am('isValidView',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('viewName','sys::Str',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.ShellQueryBar.$type.$af('mru',67584,'ui::Mru',{}).$af('mruIndex',67584,'sys::Int',{}).$af('view',67584,'uiBuilder::ShellView',{}).$af('needRelayout',67584,'sys::Bool',{}).$af('prompt',67584,'ui::TextEditor?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::ShellView',false)]),{}).$am('rebuild',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('push',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('expr','sys::Str',false)]),{}).$am('focus',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onInputMode',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','uiBuilder::ShellInputMode',false)]),{}).$am('onEval',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onPromptUp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onPromptDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRecent',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.ShellInputMode.$type.$af('line',106506,'uiBuilder::ShellInputMode',{}).$af('block',106506,'uiBuilder::ShellInputMode',{}).$af('vals',106498,'uiBuilder::ShellInputMode[]',{}).$am('isLine',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isBlock',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toggle',8192,'uiBuilder::ShellInputMode',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('key',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getCur',40962,'uiBuilder::ShellInputMode',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('setCur',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'uiBuilder::ShellInputMode?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.SiteBuilder.$type.$af('req',65664,'uiBuilder::SbReq',{}).$af('sbaction',65664,'uiBuilder::SbAction',{}).$af('checkBinds',65664,'haystack::Dict[]',{}).$af('siteTree',65664,'ui::UiPimTree',{}).$af('infoBox',67584,'uiBuilder::SbInfoBox',{}).$af('connTree',67584,'ui::UiPimTree',{}).$af('newChild',67584,'domkit::Button',{}).$af('search',67584,'domkit::TextField',{}).$af('primeSearch',67584,'sys::Bool',{}).$af('bind',67584,'domkit::Button',{}).$af('info',67584,'domkit::Button',{}).$af('toggleConns',67584,'domkit::Button',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sel',271360,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeSiteNode',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','vdom::VElem',false),new fan.sys.Param('node','pim::PimNode',false)]),{}).$am('makeConnNode',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','vdom::VElem',false),new fan.sys.Param('node','pim::PimNode',false)]),{}).$am('canDrop',128,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('targets','pim::PimNode[]?',false),new fan.sys.Param('sources','pim::PimNode[]?',false)]),{}).$am('onToggleConns',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.SbUpdater.$type.$am('checkBinds',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false),new fan.sys.Param('connTree','ui::UiPimTree',false)]),{}).$am('checkNode',34818,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','pim::PimNode',false),new fan.sys.Param('map','[haystack::Ref:haystack::Dict]',false)]),{}).$am('checkNodeBinds',34818,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','pim::PimNode',false),new fan.sys.Param('map','[haystack::Ref:haystack::Dict]',false)]),{}).$am('isBindValid',34818,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','pim::PimNode',false),new fan.sys.Param('map','[haystack::Ref:haystack::Dict]',false)]),{}).$am('isRecBound',34818,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','haystack::Dict',false),new fan.sys.Param('node','pim::PimNode',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.SbReq.$type.$af('view',67584,'uiBuilder::SiteBuilder',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::SiteBuilder',false)]),{}).$am('loadRec',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','pim::PimNode',false),new fan.sys.Param('callback','|haystack::Dict->sys::Void|',false)]),{}).$am('loadRecs',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false),new fan.sys.Param('callback','|haystack::Dict[]->sys::Void|',false)]),{}).$am('moveRecs',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','pim::PimNode',false),new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('dupRecs',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false),new fan.sys.Param('cascade','sys::Bool',false),new fan.sys.Param('count','sys::Int',false)]),{}).$am('trashRecs',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false),new fan.sys.Param('cascade','sys::Bool',false)]),{}).$am('batchBind',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','pim::PimNode',false),new fan.sys.Param('binds','uiBuilder::SbBindInfo[]',false),new fan.sys.Param('func','sys::Func',false)]),{}).$am('unbind',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('commit',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('recs','haystack::Dict[]',false)]),{}).$am('doReq',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cmd','sys::Str',false),new fan.sys.Param('args','sys::Obj[]',false),new fan.sys.Param('callback','sys::Func?',true)]),{});
  fan.uiBuilder.SbBatchBind.$type.$af('view',67584,'uiBuilder::SiteBuilder',{}).$af('target',67584,'pim::PimNode',{}).$af('actions',67584,'domkit::ListButton[]',{}).$af('names',67584,'domkit::TextField[]',{}).$af('curChecks',67584,'domkit::Checkbox[]',{}).$af('wrtChecks',67584,'domkit::Checkbox[]',{}).$af('hisChecks',67584,'domkit::Checkbox[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::SiteBuilder',false),new fan.sys.Param('target','pim::PimNode',false),new fan.sys.Param('sources','pim::PimNode[]',false)]),{}).$am('makeTable',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','pim::PimNode',false),new fan.sys.Param('sources','pim::PimNode[]',false)]),{}).$am('makeAction',2048,'domkit::ListButton',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('conn','pim::PimNode',false),new fan.sys.Param('existingPoints','pim::PimNode[]',false)]),{}).$am('onCommit',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.SbBindInfo.$type.$af('source',73728,'pim::PimNode',{}).$af('target',73728,'pim::PimNode?',{}).$af('name',73730,'sys::Str',{}).$af('kind',73730,'sys::Str',{}).$af('curVal',73730,'sys::Bool',{}).$af('writeVal',73730,'sys::Bool',{}).$af('hisVal',73730,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('source','pim::PimNode',false),new fan.sys.Param('target','pim::PimNode?',false),new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{});
  fan.uiBuilder.SbAction.$type.$af('view',67584,'uiBuilder::SiteBuilder',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::SiteBuilder',false)]),{}).$am('newRoot',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('newChild',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','pim::PimNode',false)]),{}).$am('move',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','pim::PimNode',false),new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('edit',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('dup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('trash',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('bind',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','pim::PimNode',false),new fan.sys.Param('sources','pim::PimNode[]',false)]),{}).$am('doBind',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','pim::PimNode',false),new fan.sys.Param('source','pim::PimNode',false)]),{}).$am('unbind',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{});
  fan.uiBuilder.SbSyncHis.$type.$af('points',67586,'haystack::Dict[]',{}).$af('onSync',67584,'sys::Func',{}).$af('syncLast',67584,'domkit::RadioButton',{}).$af('syncRange',67584,'domkit::RadioButton',{}).$af('input',67584,'ui::Input',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('points','haystack::Dict[]',false),new fan.sys.Param('onSync','|haystack::Dict[],sys::Obj?->sys::Void|',false)]),{});
  fan.uiBuilder.SbInfoBox.$type.$af('view',67584,'uiBuilder::SiteBuilder',{}).$af('header',67584,'domkit::FlowBox',{}).$af('box',67584,'domkit::Box',{}).$af('cur',67584,'pim::PimNode[]',{}).$af('curRecs',67584,'haystack::Dict[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::SiteBuilder',false)]),{}).$am('onUpdate',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('makeLabel',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('makeMenu',2048,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('makeCxMenu',2048,'domkit::Menu',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('makePointCxMenu',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('menu','domkit::Menu',false)]),{}).$am('menuItem',2048,'domkit::MenuItem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('icon','sys::Str',false),new fan.sys.Param('text','sys::Str',false)]),{}).$am('makeEdit',2048,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('makeDup',2048,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('makeTrash',2048,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('nodes','pim::PimNode[]',false)]),{}).$am('send',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('e','dom::Event',false)]),{});
  fan.uiBuilder.ViewMgr.$type.$am('onBuilder',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','ui::UiView',false)]),{}).$am('onGoto',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','ui::UiView',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbInspector.$type.$af('builder',65664,'uiBuilder::ViewBuilder',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false)]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('info',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('section',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('icon','sys::Str',false),new fan.sys.Param('title','sys::Str',false),new fan.sys.Param('cols','sys::Str[]',false),new fan.sys.Param('rows','haystack::Dict[]',false)]),{});
  fan.uiBuilder.VbActionEditor.$type.$af('builder',65664,'uiBuilder::ViewBuilder',{}).$af('node',65664,'uiBuilder::VbNode',{}).$af('gridBox',67584,'domkit::GridBox',{}).$af('names',67584,'domkit::TextField[]',{}).$af('funcs',67584,'domkit::TextField[]',{}).$af('metas',67584,'domkit::TextField[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('dialog',8192,'domkit::Dialog',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','haystack::Dict?',false)]),{}).$am('removeAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('save',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbEdBox.$type.$af('builder',73728,'uiBuilder::ViewBuilder?',{}).$af('node',73728,'uiBuilder::VbNode?',{}).$af('aux',73728,'domkit::FlowBox?',{}).$am('onUpdate',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbEdView.$type.$af('name',67584,'domkit::TextField?',{}).$af('titleOpts',67584,'domkit::ListButton?',{}).$af('titleField',67584,'domkit::TextField?',{}).$af('inherit',67584,'sys::Str?',{}).$af('viewTypes',67584,'sys::Str[]',{}).$af('tools',67584,'[sys::Str:dom::Elem]',{}).$af('tool',67584,'dom::Elem?',{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isVarEmpty',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','haystack::Dict',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbViewTool.$type.$am('onFocus',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('session','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbDataTool.$type.$af('x',67584,'sys::Int',{}).$af('query',67584,'domkit::TextField',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('onFocus',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('toKind',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('onMruPopup',2048,'domkit::Popup',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mru',2048,'ui::Mru',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbTextTool.$type.$af('dataTool',67584,'uiBuilder::VbDataTool',{}).$af('area',67584,'domkit::TextArea',{}).$af('literal',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('onFocus',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('fromExpr',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Str',false)]),{}).$am('toExpr',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::Str',false)]),{});
  fan.uiBuilder.VbReuseTool.$type.$af('sel',67584,'sys::Obj?',{}).$af('orig',67586,'sys::Str',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('updateTable',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false),new fan.sys.Param('table','domkit::Table',false),new fan.sys.Param('app','skyarc::AppDef',false),new fan.sys.Param('view','skyarc::ViewDef?',false)]),{}).$am('updateTableFav',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false),new fan.sys.Param('table','domkit::Table',false)]),{});
  fan.uiBuilder.VbTileTool.$type.$af('tb',67584,'uiBuilder::TileBuilder',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{});
  fan.uiBuilder.VbCanvas.$type.$af('builder',67584,'uiBuilder::ViewBuilder',{}).$af('mask',67584,'domkit::Box',{}).$af('sel',67584,'ui::UiView?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false)]),{}).$am('load',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('clear',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('nodeToView',8192,'ui::UiView?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('base','dom::Elem',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{});
  fan.uiBuilder.VbNode.$type.$af('orig',73728,'view::ViewNode?',{}).$af('parent',73728,'uiBuilder::VbNode?',{}).$af('name',73728,'sys::Str?',{}).$af('inherit',73728,'sys::Str?',{}).$af('template',73728,'sys::Str?',{}).$af('vars',73728,'haystack::Dict[]',{}).$af('actions',73728,'haystack::Dict[]',{}).$af('datas',73728,'haystack::Dict[]',{}).$af('subs',73728,'uiBuilder::VbNode[]',{}).$am('blank',40962,'uiBuilder::VbNode',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('session','ui::UiSession',false),new fan.sys.Param('parent','uiBuilder::VbNode?',true)]),{}).$am('decode',40962,'uiBuilder::VbNode',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('session','ui::UiSession',false),new fan.sys.Param('src','sys::Str',false)]),{}).$am('decodeVbNode',34818,'uiBuilder::VbNode',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('orig','view::ViewNode',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('dict','haystack::Dict',false)]),{}).$am('toView',40962,'view::ViewNode',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false),new fan.sys.Param('children','sys::Bool',true)]),{}).$am('merge',34818,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','view::ViewNode',false),new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('dict','haystack::Dict',false)]),{}).$am('root',8192,'uiBuilder::VbNode',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ns','skyarc::SysNamespace',false)]),{}).$am('isCompound',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isTile',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isPage',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mode',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::Deprecated':""}).$am('var',8192,'haystack::Dict?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('action',8192,'haystack::Dict?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('data',8192,'haystack::Dict?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',true)]),{}).$am('setVar',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('replace',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cur','uiBuilder::VbNode',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('dup',8192,'uiBuilder::VbNode',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dump',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbEdActions.$type.$af('names',67584,'domkit::TextField[]',{}).$af('dises',67584,'domkit::TextField[]',{}).$af('funcs',67584,'domkit::TextField[]',{}).$af('origs',67584,'haystack::Dict[]',{}).$af('metas',67584,'ui::Input[]',{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','haystack::Dict?',false)]),{}).$am('removeAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','domkit::TextField',false)]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('actionMeta',2048,'haystack::Dict',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','haystack::Dict',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbEditor.$type.$af('builder',67584,'uiBuilder::ViewBuilder',{}).$af('origIx',67584,'sys::Int?',{}).$af('node',67584,'uiBuilder::VbNode',{}).$af('tabBox',67584,'ui::TabBox',{}).$af('aux',67584,'domkit::FlowBox',{}).$af('dialog',67584,'domkit::Dialog',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false),new fan.sys.Param('orig','uiBuilder::VbNode',false)]),{}).$am('open',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onValidate',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newIndex','sys::Int?',true)]),{}).$am('prime',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ed','uiBuilder::VbEdBox',false)]),{});
  fan.uiBuilder.VbBatchBind.$type.$af('builder',67584,'uiBuilder::ViewBuilder',{}).$af('root',67584,'uiBuilder::VbNode',{}).$af('tops',67584,'haystack::Dict[]',{}).$af('names',67584,'sys::Str[]',{}).$am('invoke',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiBuilder::ViewBuilder',false)]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false)]),{}).$am('findNameKeys',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false),new fan.sys.Param('map','[sys::Str:sys::Int]',false)]),{}).$am('open',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('commit',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('bindInput',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false),new fan.sys.Param('top','haystack::Dict',false)]),{});
  fan.uiBuilder.ViewBuilder.$type.$af('selNode',73728,'uiBuilder::VbNode?',{}).$af('rec',65664,'haystack::Dict?',{}).$af('root',65664,'uiBuilder::VbNode?',{}).$af('viewBar',65664,'ui::UiViewBar',{}).$af('sash',65664,'domkit::SashBox',{}).$af('sidebar',65664,'domkit::SashBox',{}).$af('saveSpinner',65664,'dom::Elem',{}).$af('tree',65664,'uiBuilder::VbTree',{}).$af('inspector',65664,'uiBuilder::VbInspector',{}).$af('canvas',65664,'uiBuilder::VbCanvas',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sel',271360,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onNew',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onBatchBind',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onToggleSidebar',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('flatten',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('acc','uiBuilder::VbNode[]',false),new fan.sys.Param('n','uiBuilder::VbNode',false)]),{}).$am('showSaving',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hideSaving',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unique',32898,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','uiBuilder::VbNode',false),new fan.sys.Param('base','sys::Str',false)]),{}).$am('uniqueList',32898,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('names','sys::Str[]',false),new fan.sys.Param('base','sys::Str',false)]),{}).$am('toTrio',128,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','haystack::Dict',false),new fan.sys.Param('blacklist','sys::Str[]',false)]),{}).$am('fromTrio',128,'haystack::Dict',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('trio','sys::Str',false)]),{});
  fan.uiBuilder.VbEdSrc.$type.$af('area',67584,'domkit::TextArea?',{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbTree.$type.$af('builder',65664,'uiBuilder::ViewBuilder',{}).$af('nodes',65664,'uiBuilder::VbTreeNode[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false)]),{}).$am('load',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('clear',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addNode',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','uiBuilder::VbNode',false)]),{});
  fan.uiBuilder.VbTreeNode.$type.$af('sel',73728,'sys::Bool',{}).$af('tree',65664,'uiBuilder::VbTree',{}).$af('node',65664,'uiBuilder::VbNode',{}).$af('depth$Store',722944,'sys::Obj?',{}).$af('icon$Store',722944,'sys::Obj?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tree','uiBuilder::VbTree',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('depth',532480,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',532480,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('depth$Once',133120,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon$Once',133120,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbNodeReorder.$type.$af('builder',65664,'uiBuilder::ViewBuilder',{}).$af('node',65664,'uiBuilder::VbNode',{}).$af('cur',67584,'uiBuilder::VbTreeReorderEntry?',{}).$af('dy',67584,'sys::Int?',{}).$af('box',67584,'domkit::Box',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('dialog',8192,'domkit::Dialog',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('reorder',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('save',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbTreeReorderEntry.$type.$af('node',65664,'uiBuilder::VbNode',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('session','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{});
  fan.uiBuilder.VbNodeRemover.$type.$af('builder',65664,'uiBuilder::ViewBuilder',{}).$af('node',65664,'uiBuilder::VbNode',{}).$af('dlg',65664,'domkit::Dialog?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false),new fan.sys.Param('node','uiBuilder::VbNode',false)]),{}).$am('dialog',8192,'domkit::Dialog',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('save',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbEdVars.$type.$af('managedTags',100354,'[sys::Str:sys::Str]',{}).$af('defUiViewBar',98434,'haystack::Dict',{}).$af('inputs',67584,'uiBuilder::VbVarInput[]',{}).$af('showLabels',67584,'domkit::Checkbox?',{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addVar',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','haystack::Dict?',false)]),{}).$am('removeVar',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('input','uiBuilder::VbVarInput',false)]),{}).$am('onSave',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbVarInput.$type.$af('cbExpand',67584,'sys::Func?',{}).$af('cbRemove',67584,'sys::Func?',{}).$af('session',67584,'ui::UiSession',{}).$af('origMeta',67584,'haystack::Dict',{}).$af('infoBox',67584,'dom::Elem',{}).$af('formBox',67584,'dom::Elem',{}).$af('wellBox',67584,'dom::Elem',{}).$af('rem',67584,'domkit::Button',{}).$af('name',65664,'domkit::TextField',{}).$af('mode',67584,'uiBuilder::VbVarMode',{}).$af('kind',67584,'ui::Input',{}).$af('form',67584,'domkit::ListButton',{}).$af('bind',67584,'ui::Input',{}).$af('input',67584,'ui::Input',{}).$af('meta',67584,'ui::Input',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('session','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false),new fan.sys.Param('var','haystack::Dict',false)]),{}).$am('isExpanded',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('collapse',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onExpand',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onRemoveVar',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('save',8192,'[sys::Str:sys::Obj]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeInfoBox',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeFormBox',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeWellBox',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('inputValDef',2048,'skyarc::ValDef',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('kind','sys::Obj',false),new fan.sys.Param('meta','haystack::Dict?',true)]),{}).$am('varMeta',2048,'haystack::Dict',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','haystack::Dict',false)]),{}).$am('onMouseEvent',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onUpdate',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doUpdate',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbVarMode.$type.$af('selIndex',8192,'sys::Int',{}).$af('label',67584,'domkit::Label',{}).$af('group',67584,'domkit::ButtonGroup',{}).$af('cbSelect',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toggle',2048,'domkit::ToggleButton',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('icon','sys::Str',false)]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|uiBuilder::VbVarMode->sys::Void|',false)]),{});
  fan.uiBuilder.VbBindingInput.$type.$af('field',67584,'domkit::TextField',{}).$af('button',67584,'domkit::Button',{}).$af('node',67584,'uiBuilder::VbNode?',{}).$af('popup',67584,'domkit::Popup?',{}).$am('doMake',40962,'ui::Input',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('session','ui::UiSession',false),new fan.sys.Param('node','uiBuilder::VbNode',false),new fan.sys.Param('val','sys::Str',false)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj',false)]),{}).$am('onSave',267264,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRO',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makePopup',2048,'domkit::Popup',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addTree',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('box','dom::Elem',false),new fan.sys.Param('n','uiBuilder::VbNode',false),new fan.sys.Param('depth','sys::Int',false)]),{});
  fan.uiBuilder.TileBuilder.$type.$af('defCols',100354,'sys::Int',{}).$af('defRows',100354,'sys::Int',{}).$af('bgCell',100354,'sys::Str',{}).$af('bgTile',100354,'sys::Str',{}).$af('bgSel',100354,'sys::Str',{}).$af('colsField',67584,'domkit::TextField',{}).$af('rowsField',67584,'domkit::TextField',{}).$af('canvas',67584,'domkit::Box',{}).$af('cols',67584,'sys::Int',{}).$af('rows',67584,'sys::Int',{}).$af('cellw',67584,'sys::Float',{}).$af('cellh',67584,'sys::Float',{}).$af('pivot',67584,'graphics::Point?',{}).$af('sel',67584,'graphics::Rect?',{}).$af('tiles',67584,'graphics::Rect[]',{}).$af('cellElems',67584,'dom::Elem[]',{}).$af('tileElems',67584,'dom::Elem[]',{}).$af('help',67584,'dom::Elem?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('load',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('spec','view::TileSpec',false)]),{}).$am('save',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clearTiles',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeFiled',2048,'domkit::TextField',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Int',false)]),{}).$am('rebuild',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('update',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onMouseDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onMouseMove',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onMouseUp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onKeyDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('addTile',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','graphics::Rect',false),new fan.sys.Param('rebuild','sys::Bool',true)]),{}).$am('showHelp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hideHelp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toCol',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false)]),{}).$am('toRow',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('y','sys::Int',false)]),{}).$am('toTile',2048,'graphics::Rect?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Int',false),new fan.sys.Param('r','sys::Int',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiBuilder.VbNew.$type.$af('builder',67584,'uiBuilder::ViewBuilder',{}).$af('dialog',67584,'ui::ContentDialog',{}).$af('cardBox',67584,'domkit::CardBox',{}).$af('type',67584,'sys::Str?',{}).$af('viewInput',67584,'ui::Input?',{}).$af('disInput',67584,'ui::Input?',{}).$af('appInput',67584,'ui::Input?',{}).$af('cbCommit',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('builder','uiBuilder::ViewBuilder',false)]),{}).$am('invoke',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onCommit','|ui::ContentDialog,haystack::Dict->sys::Void|',false)]),{}).$am('onType',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onForm',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeType',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeForm',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doCommit',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "uiBuilder");
  m_meta.set("pod.version", "3.1.6");
  m_version = fan.sys.Version.fromStr("3.1.6");
  m_meta.set("pod.depends", "sys 1.0;util 1.0;concurrent 1.0;web 1.0;graphics 1.0;dom 1.0;domkit 1.0;fandoc 1.0;vdom 0+;haystack 3.1.6;axon 3.1.6;view 3.1.6;viz 3.1.6;skyarc 3.1.6;navMod 3.1.6;def 3.1.6;pim 3.1.6;codemirror 3.1.6;ui 3.1.6");
  m_meta.set("pod.summary", "Builder framework");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:24:19-05:00 New_York");
  m_meta.set("build.tsKey", "221115162419");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("license.name", "Commercial");
  m_meta.set("org.name", "SkyFoundry");
  m_meta.set("pod.docSrc", "false");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "SkySpark");
  m_meta.set("proj.uri", "https://skyfoundry.com/skyspark");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://skyfoundry.com/");
  m_meta.set("pod.native.java", "false");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("pod.native.js", "false");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
with (fan.sys.Env.cur().$props("uiBuilder:locale/en.props"))
{
  set("search","Search");
  set("help","Help");
  set("bacnetDiscover","BACnet Discover");
  set("discover.addDevice","Add Device");
  set("discover.bcastAddr","Broadcast Address");
  set("discover.lowRange","Instance Low Range");
  set("discover.highRange","Instance High Range");
  set("discover.timeout","Discovery Timeout");
  set("discover.discovering","Discovering Devices");
  set("discover.local","-Local Network-");
  set("discover.deviceId","Device ID");
  set("discover.address","Address");
}
fan.uiBuilder.$clos$_u1 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Button","false"]);
fan.uiBuilder.$clos$_u2 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::GridBox","false"]);
fan.uiBuilder.$clos$_u3 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::FlowBox","false"]);
fan.uiBuilder.$clos$_u4 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Tree","false"]);
fan.uiBuilder.$clos$_u5 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["self","domkit::Tree","false"]);
fan.uiBuilder.$clos$_u6 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::SashBox","false"]);
fan.uiBuilder.$clos$_u7 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TextField","false"]);
fan.uiBuilder.$clos$_u8 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Label","false"]);
fan.uiBuilder.$clos$_u9 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["g","haystack::Grid","false"]);
fan.uiBuilder.$clos$_u10 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["row","haystack::Row","false"]);
fan.uiBuilder.$clos$_u11 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::ListButton","false"]);
fan.uiBuilder.$clos$_u12 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","haystack::Grid","false"]);
fan.uiBuilder.$clos$_u13 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Str:uiBuilder::HostNode]","false"]);
fan.uiBuilder.$clos$_u14 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["row","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u15 = new fan.sys.ClosureFuncSpec$(fan.uiBuilder.HostNode.$type,["it","sys::Str","false"]);
fan.uiBuilder.$clos$_u17 = new fan.sys.ClosureFuncSpec$(fan.uiBuilder.NetNode.$type,["it","sys::Str","false"]);
fan.uiBuilder.$clos$_u18 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Obj:sys::Obj?]","false"]);
fan.uiBuilder.$clos$_u19 = new fan.sys.ClosureFuncSpec$(fan.sys.Int.$type,["a","uiBuilder::NetNode","false","b","uiBuilder::NetNode","false"]);
fan.uiBuilder.$clos$_u23 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Box","false"]);
fan.uiBuilder.$clos$_u26 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::CbModel","false"]);
fan.uiBuilder.$clos$_u27 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::UiPimTable","false"]);
fan.uiBuilder.$clos$_u28 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Str:domkit::Button]","false"]);
fan.uiBuilder.$clos$_u29 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::UiLabel","false"]);
fan.uiBuilder.$clos$_u30 = new fan.sys.ClosureFuncSpec$(fan.domkit.Popup.$type,["it","domkit::Button","false"]);
fan.uiBuilder.$clos$_u31 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::ToggleButton","false"]);
fan.uiBuilder.$clos$_u32 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","domkit::TextField","false"]);
fan.uiBuilder.$clos$_u33 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["r","haystack::Row","false"]);
fan.uiBuilder.$clos$_u35 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["r","pim::PimRow","false"]);
fan.uiBuilder.$clos$_u36 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","sys::Str","false"]);
fan.uiBuilder.$clos$_u37 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["key","sys::Str","false"]);
fan.uiBuilder.$clos$_u39 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::Spinner","false"]);
fan.uiBuilder.$clos$_u40 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["r","haystack::Row","false","i","sys::Int","false"]);
fan.uiBuilder.$clos$_u44 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","dom::Event","false"]);
fan.uiBuilder.$clos$_u45 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Win","false"]);
fan.uiBuilder.$clos$_u49 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["td","dom::Elem","false"]);
fan.uiBuilder.$clos$_u55 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::CbNewConnDialog","false"]);
fan.uiBuilder.$clos$_u56 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["conn","sys::Str","false"]);
fan.uiBuilder.$clos$_u57 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["r","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u58 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["diff","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u59 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["recs","haystack::Dict[]","false"]);
fan.uiBuilder.$clos$_u60 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["diffs","haystack::Dict[]","false"]);
fan.uiBuilder.$clos$_u61 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::AlertDialog","false"]);
fan.uiBuilder.$clos$_u63 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["x","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u64 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["conns","haystack::Dict[]","false"]);
fan.uiBuilder.$clos$_u65 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["c","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u77 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["r","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u78 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["r","haystack::Dict[]","false"]);
fan.uiBuilder.$clos$_u79 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["t","sys::Str","false"]);
fan.uiBuilder.$clos$_u82 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","haystack::Dict[]","false"]);
fan.uiBuilder.$clos$_u83 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["r","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u84 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["exts","haystack::Dict[]","false"]);
fan.uiBuilder.$clos$_u86 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::ListBox","false"]);
fan.uiBuilder.$clos$_u87 = new fan.sys.ClosureFuncSpec$(fan.dom.Elem.$type,["item","haystack::Dict","false","sel","sys::Bool","false"]);
fan.uiBuilder.$clos$_u89 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Elem","false"]);
fan.uiBuilder.$clos$_u93 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["d","sys::Obj","false"]);
fan.uiBuilder.$clos$_u94 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["r","sys::Obj","false"]);
fan.uiBuilder.$clos$_u96 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::Input","false"]);
fan.uiBuilder.$clos$_u100 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TextArea","false"]);
fan.uiBuilder.$clos$_u101 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::FlexBox","false"]);
fan.uiBuilder.$clos$_u106 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::Icon","false"]);
fan.uiBuilder.$clos$_u109 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["newVal","sys::Str","false"]);
fan.uiBuilder.$clos$_u110 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["item","pim::PimItem","false"]);
fan.uiBuilder.$clos$_u111 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Checkbox","false"]);
fan.uiBuilder.$clos$_u112 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","domkit::Checkbox","false"]);
fan.uiBuilder.$clos$_u113 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["it","domkit::Checkbox","false"]);
fan.uiBuilder.$clos$_u114 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","domkit::Checkbox","false","i","sys::Int","false"]);
fan.uiBuilder.$clos$_u121 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["res","haystack::Grid","false"]);
fan.uiBuilder.$clos$_u123 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["c","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u126 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::TextEditor","false"]);
fan.uiBuilder.$clos$_u127 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::ContentDialog","false"]);
fan.uiBuilder.$clos$_u128 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","haystack::Grid","false"]);
fan.uiBuilder.$clos$_u129 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type,["item","sys::Obj","false"]);
fan.uiBuilder.$clos$_u130 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["w","ui::UiFileView","false"]);
fan.uiBuilder.$clos$_u132 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["grid","haystack::Grid?","false"]);
fan.uiBuilder.$clos$_u133 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["row","haystack::Row","false"]);
fan.uiBuilder.$clos$_u134 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","ui::UiPimTable","false"]);
fan.uiBuilder.$clos$_u135 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["str","sys::Str?","false"]);
fan.uiBuilder.$clos$_u136 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["a","ui::UiAction","false"]);
fan.uiBuilder.$clos$_u137 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::UiPimTree","false"]);
fan.uiBuilder.$clos$_u138 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","pim::PimNode[]","false"]);
fan.uiBuilder.$clos$_u139 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","ui::UiPimTree","false"]);
fan.uiBuilder.$clos$_u140 = new fan.sys.ClosureFuncSpec$(fan.ui.Icon.$type,["p","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u142 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["p","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u143 = new fan.sys.ClosureFuncSpec$(fan.domkit.Popup.$type,["b","domkit::Button","false"]);
fan.uiBuilder.$clos$_u144 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Menu","false"]);
fan.uiBuilder.$clos$_u145 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","sys::Str","false"]);
fan.uiBuilder.$clos$_u146 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::MenuItem","false"]);
fan.uiBuilder.$clos$_u149 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["p","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u150 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,[]);
fan.uiBuilder.$clos$_u153 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["row","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u154 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["lib","skyarc::LibDef","false"]);
fan.uiBuilder.$clos$_u155 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["sym","haystack::Symbol","false"]);
fan.uiBuilder.$clos$_u156 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["dict","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u157 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["dependName","sys::Str","false"]);
fan.uiBuilder.$clos$_u158 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["e","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u159 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["n","sys::Str","false"]);
fan.uiBuilder.$clos$_u160 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::Flash","false"]);
fan.uiBuilder.$clos$_u161 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["err","haystack::Grid","false"]);
fan.uiBuilder.$clos$_u167 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","ui::UiPimTableEvent","false"]);
fan.uiBuilder.$clos$_u169 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["p","domkit::Popup","false"]);
fan.uiBuilder.$clos$_u174 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::ScrollBox","false"]);
fan.uiBuilder.$clos$_u178 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["f","haystack::Filetype","false"]);
fan.uiBuilder.$clos$_u179 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::ShellResultBox","false"]);
fan.uiBuilder.$clos$_u180 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["sel","haystack::Dict[]","false"]);
fan.uiBuilder.$clos$_u181 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["ref","haystack::Ref","false"]);
fan.uiBuilder.$clos$_u190 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["f","haystack::Filetype","false"]);
fan.uiBuilder.$clos$_u192 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["line","sys::Str","false"]);
fan.uiBuilder.$clos$_u194 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::TemplateForm","false"]);
fan.uiBuilder.$clos$_u197 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Str","false"]);
fan.uiBuilder.$clos$_u201 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["x","sys::Str","false"]);
fan.uiBuilder.$clos$_u206 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","vdom::VElem","false","p","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u208 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["t","pim::PimNode","false","d","sys::Obj","false"]);
fan.uiBuilder.$clos$_u209 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["target","pim::PimNode","false","nodes","pim::PimNode[]","false"]);
fan.uiBuilder.$clos$_u210 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["n","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u216 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","domkit::Button","false"]);
fan.uiBuilder.$clos$_u217 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::DictPopup","false"]);
fan.uiBuilder.$clos$_u218 = new fan.sys.ClosureFuncSpec$(fan.haystack.Dict.$type,["n","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u219 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","vdom::VElem","false"]);
fan.uiBuilder.$clos$_u220 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["n","sys::Obj","false"]);
fan.uiBuilder.$clos$_u222 = new fan.sys.ClosureFuncSpec$(fan.haystack.Ref.$type,["r","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u223 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u224 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["k","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u225 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["n","pim::PimNode","false"]);
fan.uiBuilder.$clos$_u226 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["b","uiBuilder::SbBindInfo","false"]);
fan.uiBuilder.$clos$_u233 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","domkit::ListButton","false"]);
fan.uiBuilder.$clos$_u239 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","domkit::ListButton","false","i","sys::Int","false"]);
fan.uiBuilder.$clos$_u240 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::SbBindInfo","false"]);
fan.uiBuilder.$clos$_u241 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["rec","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u242 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["proto","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u243 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","sys::Bool","false"]);
fan.uiBuilder.$clos$_u244 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["cascade","sys::Bool","false","count","sys::Int?","false"]);
fan.uiBuilder.$clos$_u245 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["cascade","sys::Bool","false"]);
fan.uiBuilder.$clos$_u246 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["res","pim::PimNode?","false"]);
fan.uiBuilder.$clos$_u248 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::RadioButton","false"]);
fan.uiBuilder.$clos$_u250 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["t","ui::RecTagInfo","false"]);
fan.uiBuilder.$clos$_u251 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["m","ui::RecTagInfo","false"]);
fan.uiBuilder.$clos$_u253 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["tag","ui::RecTagInfo","false"]);
fan.uiBuilder.$clos$_u257 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["m","domkit::Menu","false"]);
fan.uiBuilder.$clos$_u258 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","domkit::MenuItem","false"]);
fan.uiBuilder.$clos$_u259 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["x","sys::Obj?","false"]);
fan.uiBuilder.$clos$_u263 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["r","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u267 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["a","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u269 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["t","domkit::TextField","false"]);
fan.uiBuilder.$clos$_u270 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","domkit::TextField","false","i","sys::Int","false"]);
fan.uiBuilder.$clos$_u279 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","sys::Str","false","e","dom::Elem","false"]);
fan.uiBuilder.$clos$_u280 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::ButtonGroup","false"]);
fan.uiBuilder.$clos$_u281 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["g","domkit::ButtonGroup","false"]);
fan.uiBuilder.$clos$_u284 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::WellBox","false"]);
fan.uiBuilder.$clos$_u285 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["v","sys::Str","false"]);
fan.uiBuilder.$clos$_u288 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["v","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u298 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["x","sys::Str","false"]);
fan.uiBuilder.$clos$_u303 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Table","false"]);
fan.uiBuilder.$clos$_u304 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","domkit::Table","false"]);
fan.uiBuilder.$clos$_u305 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["a","skyarc::AppDef","false"]);
fan.uiBuilder.$clos$_u306 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["v","skyarc::ViewDef","false"]);
fan.uiBuilder.$clos$_u308 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::AppPicker","false"]);
fan.uiBuilder.$clos$_u309 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["def","skyarc::AppDef?","false"]);
fan.uiBuilder.$clos$_u311 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","view::VarNode","false"]);
fan.uiBuilder.$clos$_u313 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Obj?","false","n","sys::Str","false"]);
fan.uiBuilder.$clos$_u314 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["v","skyarc::ViewDef","false"]);
fan.uiBuilder.$clos$_u316 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["d","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u321 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["v","dom::Elem","false"]);
fan.uiBuilder.$clos$_u322 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["n","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u324 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","dom::Elem","false"]);
fan.uiBuilder.$clos$_u328 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u329 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u330 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["d","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u331 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u337 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["d","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u339 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["s","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u342 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["n","domkit::TextField","false"]);
fan.uiBuilder.$clos$_u343 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["mv","sys::Obj?","false","mn","sys::Str","false"]);
fan.uiBuilder.$clos$_u344 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["v","sys::Obj?","false","n","sys::Str","false"]);
fan.uiBuilder.$clos$_u346 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::TabBox","false"]);
fan.uiBuilder.$clos$_u347 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::VbEdView","false"]);
fan.uiBuilder.$clos$_u348 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::VbEdVars","false"]);
fan.uiBuilder.$clos$_u349 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::VbEdActions","false"]);
fan.uiBuilder.$clos$_u350 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::VbEdSrc","false"]);
fan.uiBuilder.$clos$_u351 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["t","ui::TabBox","false","i","sys::Int","false"]);
fan.uiBuilder.$clos$_u353 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Int","false","k","sys::Str","false"]);
fan.uiBuilder.$clos$_u354 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["t","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u357 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["s","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u358 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["sub","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u362 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["dlg","ui::ContentDialog","false","rec","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u364 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["v","haystack::Dict","false"]);
fan.uiBuilder.$clos$_u365 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["v","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u368 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","skyarc::ValDef","false"]);
fan.uiBuilder.$clos$_u370 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","uiBuilder::VbTreeNode","false"]);
fan.uiBuilder.$clos$_u371 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Event","false"]);
fan.uiBuilder.$clos$_u374 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::DropTarget","false"]);
fan.uiBuilder.$clos$_u375 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["data","sys::Obj","false"]);
fan.uiBuilder.$clos$_u376 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["pagePos","graphics::Point","false"]);
fan.uiBuilder.$clos$_u378 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["kid","dom::Elem","false","i","sys::Int","false"]);
fan.uiBuilder.$clos$_u379 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["e","dom::Elem","false"]);
fan.uiBuilder.$clos$_u381 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::DragTarget","false"]);
fan.uiBuilder.$clos$_u382 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type,["e","dom::Elem","false"]);
fan.uiBuilder.$clos$_u383 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","dom::Elem","false"]);
fan.uiBuilder.$clos$_u386 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["x","uiBuilder::VbVarInput","false"]);
fan.uiBuilder.$clos$_u387 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::VbVarInput","false"]);
fan.uiBuilder.$clos$_u388 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["x","uiBuilder::VbVarInput","false"]);
fan.uiBuilder.$clos$_u389 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["y","uiBuilder::VbVarInput","false"]);
fan.uiBuilder.$clos$_u390 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["input","uiBuilder::VbVarInput","false"]);
fan.uiBuilder.$clos$_u391 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["ev","sys::Obj?","false","en","sys::Str","false"]);
fan.uiBuilder.$clos$_u392 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["k","sys::Str","false"]);
fan.uiBuilder.$clos$_u393 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["k","sys::Str","false"]);
fan.uiBuilder.$clos$_u396 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiBuilder::VbVarMode","false"]);
fan.uiBuilder.$clos$_u413 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Popup","false"]);
fan.uiBuilder.$clos$_u414 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["kid","uiBuilder::VbNode","false"]);
fan.uiBuilder.$clos$_u415 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["de","dom::Event","false"]);
fan.uiBuilder.$clos$_u416 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","graphics::Rect","false"]);
fan.uiBuilder.$clos$_u417 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","dom::Elem","false"]);
fan.uiBuilder.$clos$_u420 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["r","sys::Int","false"]);
fan.uiBuilder.$clos$_u421 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","sys::Int","false"]);
fan.uiBuilder.$clos$_u422 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["cell","dom::Elem","false"]);
fan.uiBuilder.$clos$_u423 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["tile","dom::Elem","false","i","sys::Int","false"]);
fan.uiBuilder.$clos$_u426 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["y","sys::Int","false"]);
fan.uiBuilder.$clos$_u427 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["x","sys::Int","false"]);
fan.uiBuilder.$clos$_u428 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["t","graphics::Rect","false"]);
fan.uiBuilder.$clos$_u431 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::CardBox","false"]);
fan.uiBuilder.$clos$_u432 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","sys::Str","false"]);
fan.uiBuilder.ShellToolBar.static$init();
fan.uiBuilder.ShellInputMode.static$init();
fan.uiBuilder.VbEdVars.static$init();
fan.uiBuilder.TileBuilder.static$init();
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.uiDev = exports;
} else {
  fan.uiDev = root.fan.uiDev = {};
}

fan.uiDev.DevMain = fan.sys.Obj.$extend(fan.domkit.FlexBox);
fan.uiDev.DevMain.prototype.$ctor = function()
{
  fan.domkit.FlexBox.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.DevMain.prototype.$typeof = function() { return fan.uiDev.DevMain.$type; }
fan.uiDev.DevMain.make = function(view) {
  var self = new fan.uiDev.DevMain();
  fan.uiDev.DevMain.make$(self,view);
  return self;
  }
fan.uiDev.DevMain.make$ = function(self,view)
{
  fan.domkit.FlexBox.make$(self);
  self.m_view = view;
  self.m_state = fan.uiDev.DevState.boot(view.m_session.m_ns);
  self.m_cmdBar = fan.uiDev.CmdBarPane.make(self);
  self.m_nav = fan.uiDev.NavPane.make(self);
  self.m_content = fan.uiDev.ContentPane.make(self);
  self.m_tool = fan.uiDev.ToolPane.make(self);
  self.m_status = fan.uiDev.StatusPane.make(self);
  self.m_navSplit = fan.uiDev.SideBarBox.make(self.m_content,self.m_nav,fan.domkit.Dir.m_left).show(true);
  self.m_toolSplit = fan.uiDev.SideBarBox.make(self.m_navSplit,self.m_tool,fan.domkit.Dir.m_down);
  self.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  self.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  self.style().addClass("uiDev-main");
  self.dir$("column");
  self.flex$(fan.sys.List.make(fan.sys.Str.$type, ["none","1 1 0","none"]));
  self.add(self.m_cmdBar);
  self.add(self.m_toolSplit);
  self.add(self.m_status);
  return;
}
fan.uiDev.DevMain.prototype.state = function()
{
  return this.m_state;
}
fan.uiDev.DevMain.prototype.state$ = function(it)
{
  this.m_state = it;
  return;
}
fan.uiDev.DevMain.prototype.onUpdate = function(newState)
{
  var $this = this;
  var oldState = this.m_state;
  var event = fan.uiDev.DevStateEvent.make(oldState,newState);
  this.m_view.onDevStateUpdate(newState);
  this.m_state = newState;
  if (event.m_showNav)
  {
    this.m_navSplit.show(this.m_state.isShowNav());
  }
  ;
  if (event.m_showTool)
  {
    this.m_toolSplit.show(this.m_state.isShowTool());
  }
  ;
  this.eachPane(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u0,
    function(pane)
    {
      pane.onUpdate(event);
      return;
    }));
  return;
}
fan.uiDev.DevMain.prototype.goto = function(item,opts)
{
  if (opts === undefined) opts = null;
  fan.uiDev.GotoOp.make(item,opts).run(this);
  return;
}
fan.uiDev.DevMain.prototype.funcNew = function(proto)
{
  fan.uiDev.FuncNewOp.make(proto).run(this);
  return;
}
fan.uiDev.DevMain.prototype.funcEdit = function()
{
  fan.uiDev.FuncEditOp.make().run(this);
  return;
}
fan.uiDev.DevMain.prototype.funcTrash = function()
{
  fan.uiDev.FuncTrashOp.make().run(this);
  return;
}
fan.uiDev.DevMain.prototype.funcCheck = function(flashOk)
{
  fan.uiDev.FuncCheckOp.make(flashOk).run(this);
  return;
}
fan.uiDev.DevMain.prototype.setDirty = function()
{
  fan.uiDev.UpdateOp.setDirty().run(this);
  return;
}
fan.uiDev.DevMain.prototype.clearDirty = function()
{
  fan.uiDev.UpdateOp.clearDirty().run(this);
  return;
}
fan.uiDev.DevMain.prototype.find = function(find)
{
  if (find === undefined) find = null;
  fan.uiDev.FindOp.make(fan.sys.ObjUtil.coerce((function($this) { var $_u1 = find; if ($_u1 != null) return $_u1; return $this.m_state.m_find; })(this),fan.misc.TextSearch.$type)).run(this);
  return;
}
fan.uiDev.DevMain.prototype.findInFuncs = function(find)
{
  if (find === undefined) find = null;
  fan.uiDev.FindInFuncsOp.make(fan.sys.ObjUtil.coerce((function($this) { var $_u2 = find; if ($_u2 != null) return $_u2; return $this.m_state.m_find; })(this),fan.misc.TextSearch.$type)).run(this);
  return;
}
fan.uiDev.DevMain.prototype.docs = function(word)
{
  fan.uiDev.DocsOp.make(word).run(this);
  return;
}
fan.uiDev.DevMain.prototype.build = function()
{
  fan.uiDev.BuildOp.make().run(this);
  return;
}
fan.uiDev.DevMain.prototype.hideTools = function()
{
  fan.uiDev.HideToolsOp.make().run(this);
  return;
}
fan.uiDev.DevMain.prototype.toggleNav = function()
{
  fan.uiDev.UpdateOp.showNav((function($this) { if ($this.m_state.isShowNav()) return "hide"; return "funcs"; })(this)).run(this);
  return;
}
fan.uiDev.DevMain.prototype.save = function(onDone)
{
  if (onDone === undefined) onDone = null;
  fan.uiDev.SaveOp.make(onDone).run(this);
  return;
}
fan.uiDev.DevMain.prototype.reload = function()
{
  fan.uiDev.GotoOp.make(this.m_state.m_doc,fan.uiDev.GotoOp.m_reload).run(this);
  return;
}
fan.uiDev.DevMain.prototype.clearMarks = function()
{
  fan.uiDev.UpdateOp.marks(fan.uiDev.DocItem.m_none).run(this);
  return;
}
fan.uiDev.DevMain.prototype.setMarks = function(marks)
{
  fan.uiDev.UpdateOp.marks(marks).run(this);
  return;
}
fan.uiDev.DevMain.prototype.prevMark = function()
{
  (function($this) { var $_u4 = fan.uiDev.CurMarkOp.prev($this.m_state); if ($_u4 == null) return null; return $_u4.run($this); })(this);
  return;
}
fan.uiDev.DevMain.prototype.nextMark = function()
{
  (function($this) { var $_u5 = fan.uiDev.CurMarkOp.next($this.m_state); if ($_u5 == null) return null; return $_u5.run($this); })(this);
  return;
}
fan.uiDev.DevMain.prototype.refocus = function()
{
  this.m_content.refocus();
  return;
}
fan.uiDev.DevMain.prototype.eachPane = function(f)
{
  f.call(this.m_cmdBar);
  f.call(this.m_content);
  f.call(this.m_nav);
  f.call(this.m_tool);
  f.call(this.m_status);
  return;
}
fan.uiDev.DevMain.prototype.eval = function(expr,onOk)
{
  this.m_view.m_session.m_api.eval(expr).onOk(onOk);
  return;
}
fan.uiDev.DevMain.prototype.invokeAction = function($name,extraMeta,onOk)
{
  if (extraMeta === undefined) extraMeta = null;
  if (onOk === undefined) onOk = null;
  this.action($name,extraMeta,onOk).invoke();
  return;
}
fan.uiDev.DevMain.prototype.action = function($name,extraMeta,onOk)
{
  if (extraMeta === undefined) extraMeta = null;
  if (onOk === undefined) onOk = null;
  var meta = fan.haystack.Etc.makeDict1("action",$name);
  meta = fan.haystack.Etc.dictMerge(meta,extraMeta);
  var action = fan.ui.UiAction.make(this.m_view,fan.view.ActionNode.make($name,meta));
  if (onOk != null)
  {
    action.onOk(fan.sys.ObjUtil.coerce(onOk,fan.sys.Type.find("|haystack::Grid->sys::Void|")));
  }
  ;
  return action;
}
fan.uiDev.DevMain.prototype.flash = function(msg)
{
  fan.ui.Flash.showWarn(this.m_view,msg);
  return;
}
fan.uiDev.DevMain.prototype.session = function()
{
  return this.m_view.m_session;
}
fan.uiDev.DevMain.prototype.view = function()
{
  return this.m_view;
}
fan.uiDev.DevMain.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiDev.DevMain.prototype.cmdBar = function()
{
  return this.m_cmdBar;
}
fan.uiDev.DevMain.prototype.cmdBar$ = function(it)
{
  this.m_cmdBar = it;
  return;
}
fan.uiDev.DevMain.prototype.content = function()
{
  return this.m_content;
}
fan.uiDev.DevMain.prototype.content$ = function(it)
{
  this.m_content = it;
  return;
}
fan.uiDev.DevMain.prototype.nav = function()
{
  return this.m_nav;
}
fan.uiDev.DevMain.prototype.nav$ = function(it)
{
  this.m_nav = it;
  return;
}
fan.uiDev.DevMain.prototype.tool = function()
{
  return this.m_tool;
}
fan.uiDev.DevMain.prototype.tool$ = function(it)
{
  this.m_tool = it;
  return;
}
fan.uiDev.DevMain.prototype.status = function()
{
  return this.m_status;
}
fan.uiDev.DevMain.prototype.status$ = function(it)
{
  this.m_status = it;
  return;
}
fan.uiDev.DevMain.prototype.navSplit = function()
{
  return this.m_navSplit;
}
fan.uiDev.DevMain.prototype.navSplit$ = function(it)
{
  this.m_navSplit = it;
  return;
}
fan.uiDev.DevMain.prototype.toolSplit = function()
{
  return this.m_toolSplit;
}
fan.uiDev.DevMain.prototype.toolSplit$ = function(it)
{
  this.m_toolSplit = it;
  return;
}
fan.uiDev.DevMain.prototype.keyHandler = function()
{
  return this.m_keyHandler;
}
fan.uiDev.DevMain.prototype.keyHandler$ = function(it)
{
  this.m_keyHandler = it;
  return;
}
fan.uiDev.DevMain.prototype.m_state = null;
fan.uiDev.DevMain.prototype.m_view = null;
fan.uiDev.DevMain.prototype.m_cmdBar = null;
fan.uiDev.DevMain.prototype.m_content = null;
fan.uiDev.DevMain.prototype.m_nav = null;
fan.uiDev.DevMain.prototype.m_tool = null;
fan.uiDev.DevMain.prototype.m_status = null;
fan.uiDev.DevMain.prototype.m_navSplit = null;
fan.uiDev.DevMain.prototype.m_toolSplit = null;
fan.uiDev.DevMain.prototype.m_keyHandler = null;
fan.uiDev.DevView = fan.sys.Obj.$extend(fan.ui.UiView);
fan.uiDev.DevView.prototype.$ctor = function()
{
  fan.ui.UiView.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.DevView.prototype.$typeof = function() { return fan.uiDev.DevView.$type; }
fan.uiDev.DevView.make = function() {
  var self = new fan.uiDev.DevView();
  fan.uiDev.DevView.make$(self);
  return self;
  }
fan.uiDev.DevView.make$ = function(self)
{
  var $this = self;
  fan.ui.UiView.make$(self);
  self.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u6,
    function(it)
    {
      it.text$("Loading...");
      return;
    })),fan.domkit.Label.$type));
  return;
}
fan.uiDev.DevView.prototype.sel = function()
{
  var rec = (function($this) { var $_u7 = (function($this) { var $_u8=(function($this) { var $_u9=$this.m_main; return ($_u9==null) ? null : $_u9.m_state }($this)); return ($_u8==null) ? null : $_u8.m_doc }($this)); if ($_u7 == null) return null; return $_u7.rec(false); })(this);
  if (rec != null)
  {
    return fan.sys.List.make(fan.haystack.Dict.$type, [fan.sys.ObjUtil.coerce(rec,fan.haystack.Dict.$type)]);
  }
  ;
  return fan.sys.ObjUtil.coerce(fan.haystack.Dict.$type.emptyList(),fan.sys.Type.find("haystack::Dict[]"));
}
fan.uiDev.DevView.prototype.onUpdate = function()
{
  var $this = this;
  if (this.m_main != null)
  {
    return;
  }
  ;
  this.m_main = fan.uiDev.DevMain.make(this);
  this.removeAll();
  this.add(fan.sys.ObjUtil.coerce(this.m_main,fan.dom.Elem.$type));
  var vars = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  this.node().vars().each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u10,
    function($var)
    {
      vars.set($var.m_$name,$this.varToState($var.m_$name,$var.val()));
      return;
    }));
  fan.uiDev.InitOp.make(vars).run(fan.sys.ObjUtil.coerce(this.m_main,fan.uiDev.DevMain.$type));
  return;
}
fan.uiDev.DevView.prototype.onBeforeUnload = function(cb)
{
  if (this.m_main == null)
  {
    return true;
  }
  ;
  if (!this.m_main.m_state.m_dirty)
  {
    return true;
  }
  ;
  fan.uiDev.UnloadOp.make(cb).run(fan.sys.ObjUtil.coerce(this.m_main,fan.uiDev.DevMain.$type));
  return false;
}
fan.uiDev.DevView.prototype.commands = function()
{
  var $this = this;
  var builtIn = fan.ui.UiView.prototype.commands.call(this);
  return this.m_session.m_ns.commands().findAll(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u11,
    function(cmd)
    {
      if (cmd.isCodeMirror())
      {
        return true;
      }
      ;
      if ($this.m_main == null)
      {
        return false;
      }
      ;
      if (builtIn.contains(cmd))
      {
        return true;
      }
      ;
      return $this.m_main.m_state.m_cmds.get(cmd.$name(),false) != null;
    }));
}
fan.uiDev.DevView.prototype.onCommand = function(def,event)
{
  if (this.m_main != null)
  {
    var cmd = this.m_main.m_state.m_cmds.get(def.$name(),false);
    if (cmd != null)
    {
      cmd.invoke(fan.sys.ObjUtil.coerce(this.m_main,fan.uiDev.DevMain.$type));
      return true;
    }
    ;
  }
  ;
  return fan.ui.UiView.prototype.onCommand.call(this,def,event);
}
fan.uiDev.DevView.prototype.focusView = function()
{
  this.m_main.refocus();
  return;
}
fan.uiDev.DevView.prototype.onDevStateUpdate = function(state)
{
  var $this = this;
  var changes = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  this.node().vars().each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u10,
    function($var)
    {
      var devVal = $this.stateToVar($var.m_$name,state.get($var.m_$name));
      if (fan.sys.ObjUtil.compareNE($var.val(),devVal))
      {
        changes.set($var.m_$name,devVal);
      }
      ;
      return;
    }));
  if (changes.isEmpty())
  {
    return;
  }
  ;
  this.update(changes);
  return;
}
fan.uiDev.DevView.prototype.varToState = function($name,val)
{
  var $_u12 = $name;
  if (fan.sys.ObjUtil.equals($_u12,"uri"))
  {
    return fan.sys.ObjUtil.as(val,fan.sys.Uri.$type);
  }
  else if (fan.sys.ObjUtil.equals($_u12,"markers"))
  {
    return (function($this) { if (fan.sys.ObjUtil.is(val,fan.sys.Type.find("sys::List"))) return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.toImmutable(fan.sys.List.make(fan.sys.Str.$type).addAll(fan.sys.ObjUtil.coerce(val,fan.sys.Type.find("sys::Str[]")))),fan.sys.Type.find("sys::Str[]")); return fan.sys.Str.$type.emptyList(); })(this);
  }
  else
  {
    return val;
  }
  ;
}
fan.uiDev.DevView.prototype.stateToVar = function($name,val)
{
  var $_u14 = $name;
  if (fan.sys.ObjUtil.equals($_u14,"markers"))
  {
    return (function($this) { if (fan.sys.ObjUtil.coerce(val,fan.sys.Type.find("sys::List")).isEmpty()) return null; return val; })(this);
  }
  else
  {
    return val;
  }
  ;
}
fan.uiDev.DevView.prototype.refocus = function()
{
  (function($this) { var $_u16 = $this.m_main; if ($_u16 == null) return null; return $_u16.refocus(); })(this);
  return;
}
fan.uiDev.DevView.prototype.main = function()
{
  return this.m_main;
}
fan.uiDev.DevView.prototype.main$ = function(it)
{
  this.m_main = it;
  return;
}
fan.uiDev.DevView.prototype.codeMirrorLoaded = function()
{
  return this.m_codeMirrorLoaded;
}
fan.uiDev.DevView.prototype.codeMirrorLoaded$ = function(it)
{
  this.m_codeMirrorLoaded = it;
  return;
}
fan.uiDev.DevView.prototype.retryUpdate = function()
{
  return this.m_retryUpdate;
}
fan.uiDev.DevView.prototype.retryUpdate$ = function(it)
{
  this.m_retryUpdate = it;
  return;
}
fan.uiDev.DevView.prototype.m_main = null;
fan.uiDev.DevView.prototype.m_codeMirrorLoaded = false;
fan.uiDev.DevView.prototype.m_retryUpdate = false;
fan.uiDev.DocItem = function() {}
fan.uiDev.DocItem.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DocItem.prototype.$typeof = function() { return fan.uiDev.DocItem.$type; }
fan.uiDev.DocItem.prototype.dis = function()
{
  return this.$name();
}
fan.uiDev.DocItem.prototype.isErr = function()
{
  return false;
}
fan.uiDev.DocItem.prototype.compare = function(that)
{
  return fan.sys.ObjUtil.compare(this.$name(),fan.sys.ObjUtil.coerce(that,fan.uiDev.DocItem.$type).$name());
}
fan.uiDev.DocItem.prototype.isSpan = function()
{
  return (this.pos() != null && this.endPos() != null);
}
fan.uiDev.DocItem.prototype.pos = function()
{
  return null;
}
fan.uiDev.DocItem.prototype.endPos = function()
{
  return null;
}
fan.uiDev.DocItem.static$init = function()
{
  fan.uiDev.DocItem.m_none = fan.sys.ObjUtil.coerce((function($this) { var $_u17 = fan.sys.ObjUtil.coerce(fan.uiDev.DocItem.$type.emptyList(),fan.sys.Type.find("uiDev::DocItem[]")); if ($_u17 == null) return null; return fan.sys.ObjUtil.toImmutable($_u17); })(this),fan.sys.Type.find("uiDev::DocItem[]"));
  return;
}
fan.uiDev.DocItem.m_none = null;
fan.uiDev.Document = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.Document.prototype.compare = fan.uiDev.DocItem.prototype.compare;
fan.uiDev.Document.prototype.isErr = fan.uiDev.DocItem.prototype.isErr;
fan.uiDev.Document.prototype.dis = fan.uiDev.DocItem.prototype.dis;
fan.uiDev.Document.prototype.isSpan = fan.uiDev.DocItem.prototype.isSpan;
fan.uiDev.Document.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.Document.prototype.$typeof = function() { return fan.uiDev.Document.$type; }
fan.uiDev.Document.load = function(res)
{
  var rec = fan.sys.ObjUtil.as(res.get("rec"),fan.haystack.Dict.$type);
  if (rec != null)
  {
    return fan.uiDev.RecDoc.make(fan.sys.ObjUtil.coerce(rec,fan.haystack.Dict.$type));
  }
  ;
  var file = fan.sys.ObjUtil.as(res.get("file"),fan.haystack.Dict.$type);
  if (file != null)
  {
    return fan.uiDev.FileDoc.make(fan.sys.ObjUtil.coerce(file,fan.haystack.Dict.$type));
  }
  ;
  var notFound = fan.sys.ObjUtil.as(res.get("notFound"),fan.sys.Uri.$type);
  if (notFound != null)
  {
    return fan.uiDev.NotFoundDoc.make(fan.sys.ObjUtil.coerce(notFound,fan.sys.Uri.$type));
  }
  ;
  return null;
}
fan.uiDev.Document.prototype.isBlank = function()
{
  return false;
}
fan.uiDev.Document.prototype.isNotFound = function()
{
  return false;
}
fan.uiDev.Document.prototype.pos = function()
{
  return null;
}
fan.uiDev.Document.prototype.endPos = function()
{
  return null;
}
fan.uiDev.Document.prototype.isRec = function()
{
  return false;
}
fan.uiDev.Document.prototype.rec = function(checked)
{
  if (checked === undefined) checked = true;
  if (checked)
  {
    throw fan.sys.Err.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Not RecDoc: ",this.$name())," ["),fan.sys.ObjUtil.$typeof(this).$name()),"]"));
  }
  ;
  return null;
}
fan.uiDev.Document.prototype.isFile = function()
{
  return false;
}
fan.uiDev.Document.prototype.isDir = function()
{
  return false;
}
fan.uiDev.Document.make = function() {
  var self = new fan.uiDev.Document();
  fan.uiDev.Document.make$(self);
  return self;
  }
fan.uiDev.Document.make$ = function(self)
{
  return;
}
fan.uiDev.RecDoc = fan.sys.Obj.$extend(fan.uiDev.Document);
fan.uiDev.RecDoc.prototype.$ctor = function()
{
  fan.uiDev.Document.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.RecDoc.prototype.$typeof = function() { return fan.uiDev.RecDoc.$type; }
fan.uiDev.RecDoc.idToUri = function(id)
{
  return fan.sys.Str.toUri(fan.sys.Str.plus("id:",id.id()));
}
fan.uiDev.RecDoc.make = function(rec) {
  var self = new fan.uiDev.RecDoc();
  fan.uiDev.RecDoc.make$(self,rec);
  return self;
  }
fan.uiDev.RecDoc.make$ = function(self,rec)
{
  fan.uiDev.Document.make$(self);
  self.m_uri = fan.uiDev.RecDoc.idToUri(rec.id());
  self.m_$name = fan.sys.ObjUtil.coerce(rec.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
  self.m_recRef = rec;
  return;
}
fan.uiDev.RecDoc.prototype.uri = function()
{
  return this.m_uri;
}
fan.uiDev.RecDoc.prototype.$name = function()
{
  return this.m_$name;
}
fan.uiDev.RecDoc.prototype.text = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u18 = fan.sys.ObjUtil.as($this.rec().get("src"),fan.sys.Str.$type); if ($_u18 != null) return $_u18; return ""; })(this),fan.sys.Str.$type);
}
fan.uiDev.RecDoc.prototype.icon = function()
{
  return fan.uiDev.DevIcon.m_func;
}
fan.uiDev.RecDoc.prototype.isRec = function()
{
  return true;
}
fan.uiDev.RecDoc.prototype.rec = function(checked)
{
  if (checked === undefined) checked = true;
  return this.m_recRef;
}
fan.uiDev.RecDoc.prototype.isFile = function()
{
  return false;
}
fan.uiDev.RecDoc.prototype.isDir = function()
{
  return false;
}
fan.uiDev.RecDoc.prototype.m_uri = null;
fan.uiDev.RecDoc.prototype.m_$name = null;
fan.uiDev.RecDoc.prototype.m_recRef = null;
fan.uiDev.FileDoc = fan.sys.Obj.$extend(fan.uiDev.Document);
fan.uiDev.FileDoc.prototype.$ctor = function()
{
  fan.uiDev.Document.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FileDoc.prototype.$typeof = function() { return fan.uiDev.FileDoc.$type; }
fan.uiDev.FileDoc.make = function(meta) {
  var self = new fan.uiDev.FileDoc();
  fan.uiDev.FileDoc.make$(self,meta);
  return self;
  }
fan.uiDev.FileDoc.make$ = function(self,meta)
{
  fan.uiDev.Document.make$(self);
  self.m_uri = fan.sys.ObjUtil.coerce(meta.trap("uri",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Uri.$type);
  self.m_meta = meta;
  self.m_icon = fan.uiDev.DevIcon.makeDict(meta);
  return;
}
fan.uiDev.FileDoc.prototype.uri = function()
{
  return this.m_uri;
}
fan.uiDev.FileDoc.prototype.$name = function()
{
  return this.m_uri.$name();
}
fan.uiDev.FileDoc.prototype.icon = function()
{
  return this.m_icon;
}
fan.uiDev.FileDoc.prototype.text = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u19 = fan.sys.ObjUtil.as($this.m_meta.get("text"),fan.sys.Str.$type); if ($_u19 != null) return $_u19; return ""; })(this),fan.sys.Str.$type);
}
fan.uiDev.FileDoc.prototype.m_meta = null;
fan.uiDev.FileDoc.prototype.m_uri = null;
fan.uiDev.FileDoc.prototype.m_icon = null;
fan.uiDev.DocRef = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.DocRef.prototype.compare = fan.uiDev.DocItem.prototype.compare;
fan.uiDev.DocRef.prototype.isErr = fan.uiDev.DocItem.prototype.isErr;
fan.uiDev.DocRef.prototype.dis = fan.uiDev.DocItem.prototype.dis;
fan.uiDev.DocRef.prototype.endPos = fan.uiDev.DocItem.prototype.endPos;
fan.uiDev.DocRef.prototype.pos = fan.uiDev.DocItem.prototype.pos;
fan.uiDev.DocRef.prototype.isSpan = fan.uiDev.DocItem.prototype.isSpan;
fan.uiDev.DocRef.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DocRef.prototype.$typeof = function() { return fan.uiDev.DocRef.$type; }
fan.uiDev.DocRef.fromGrid = function(grid)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(grid.mapToList(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u20,
    function(row)
    {
      return fan.uiDev.DocRef.makeDict(row);
    })),fan.sys.Type.find("uiDev::DocItem[]"));
}
fan.uiDev.DocRef.makeDict = function(meta) {
  var self = new fan.uiDev.DocRef();
  fan.uiDev.DocRef.makeDict$(self,meta);
  return self;
  }
fan.uiDev.DocRef.makeDict$ = function(self,meta)
{
  self.m_meta = meta;
  self.m_uri = fan.sys.ObjUtil.coerce(meta.trap("uri",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Uri.$type);
  self.m_$name = fan.sys.ObjUtil.coerce(meta.trap("name",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
  self.m_icon = fan.uiDev.DevIcon.makeDict(meta);
  return;
}
fan.uiDev.DocRef.makeDoc = function(doc) {
  var self = new fan.uiDev.DocRef();
  fan.uiDev.DocRef.makeDoc$(self,doc);
  return self;
  }
fan.uiDev.DocRef.makeDoc$ = function(self,doc)
{
  self.m_meta = fan.haystack.Etc.emptyDict();
  self.m_uri = doc.uri();
  self.m_$name = doc.$name();
  self.m_icon = doc.icon();
  return;
}
fan.uiDev.DocRef.prototype.uri = function()
{
  return this.m_uri;
}
fan.uiDev.DocRef.prototype.$name = function()
{
  return this.m_$name;
}
fan.uiDev.DocRef.prototype.icon = function()
{
  return this.m_icon;
}
fan.uiDev.DocRef.prototype.m_meta = null;
fan.uiDev.DocRef.prototype.m_uri = null;
fan.uiDev.DocRef.prototype.m_$name = null;
fan.uiDev.DocRef.prototype.m_icon = null;
fan.uiDev.DocPos = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.DocPos.prototype.compare = fan.uiDev.DocItem.prototype.compare;
fan.uiDev.DocPos.prototype.isErr = fan.uiDev.DocItem.prototype.isErr;
fan.uiDev.DocPos.prototype.isSpan = fan.uiDev.DocItem.prototype.isSpan;
fan.uiDev.DocPos.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DocPos.prototype.$typeof = function() { return fan.uiDev.DocPos.$type; }
fan.uiDev.DocPos.make = function(item,pos) {
  var self = new fan.uiDev.DocPos();
  fan.uiDev.DocPos.make$(self,item,pos);
  return self;
  }
fan.uiDev.DocPos.make$ = function(self,item,pos)
{
  self.m_item = item;
  self.m_pos = pos;
  return;
}
fan.uiDev.DocPos.prototype.pos = function()
{
  return this.m_pos;
}
fan.uiDev.DocPos.prototype.endPos = function()
{
  return null;
}
fan.uiDev.DocPos.prototype.dis = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(this.$name(),"("),fan.sys.ObjUtil.coerce(fan.sys.Int.plus(this.m_pos.m_line,1),fan.sys.Obj.$type.toNullable())),")");
}
fan.uiDev.DocPos.prototype.uri = function()
{
  return this.m_item.uri();
}
fan.uiDev.DocPos.prototype.$name = function()
{
  return this.m_item.$name();
}
fan.uiDev.DocPos.prototype.icon = function()
{
  return this.m_item.icon();
}
fan.uiDev.DocPos.prototype.m_item = null;
fan.uiDev.DocPos.prototype.m_pos = null;
fan.uiDev.GotoLineItem = fan.sys.Obj.$extend(fan.uiDev.DocPos);
fan.uiDev.GotoLineItem.prototype.$ctor = function()
{
  fan.uiDev.DocPos.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.GotoLineItem.prototype.$typeof = function() { return fan.uiDev.GotoLineItem.$type; }
fan.uiDev.GotoLineItem.make = function(item,pos) {
  var self = new fan.uiDev.GotoLineItem();
  fan.uiDev.GotoLineItem.make$(self,item,pos);
  return self;
  }
fan.uiDev.GotoLineItem.make$ = function(self,item,pos)
{
  fan.uiDev.DocPos.make$(self,item,pos);
  return;
}
fan.uiDev.GotoLineItem.prototype.dis = function()
{
  return fan.sys.Str.plus("Goto Line: ",fan.sys.ObjUtil.coerce(fan.sys.Int.plus(this.m_pos.m_line,1),fan.sys.Obj.$type.toNullable()));
}
fan.uiDev.DocErrPos = fan.sys.Obj.$extend(fan.uiDev.DocPos);
fan.uiDev.DocErrPos.prototype.$ctor = function()
{
  fan.uiDev.DocPos.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DocErrPos.prototype.$typeof = function() { return fan.uiDev.DocErrPos.$type; }
fan.uiDev.DocErrPos.make = function(item,pos,msg) {
  var self = new fan.uiDev.DocErrPos();
  fan.uiDev.DocErrPos.make$(self,item,pos,msg);
  return self;
  }
fan.uiDev.DocErrPos.make$ = function(self,item,pos,msg)
{
  fan.uiDev.DocPos.make$(self,item,pos);
  self.m_msg = msg;
  return;
}
fan.uiDev.DocErrPos.prototype.isErr = function()
{
  return true;
}
fan.uiDev.DocErrPos.prototype.icon = function()
{
  return fan.uiDev.DevIcon.m_warn;
}
fan.uiDev.DocErrPos.prototype.dis = function()
{
  return fan.sys.Str.plus(fan.uiDev.DocPos.prototype.dis.call(this),fan.sys.Str.plus(": ",this.m_msg));
}
fan.uiDev.DocErrPos.prototype.m_msg = null;
fan.uiDev.DocMark = fan.sys.Obj.$extend(fan.uiDev.DocPos);
fan.uiDev.DocMark.prototype.$ctor = function()
{
  fan.uiDev.DocPos.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DocMark.prototype.$typeof = function() { return fan.uiDev.DocMark.$type; }
fan.uiDev.DocMark.make = function(item,pos,endPos,msg) {
  var self = new fan.uiDev.DocMark();
  fan.uiDev.DocMark.make$(self,item,pos,endPos,msg);
  return self;
  }
fan.uiDev.DocMark.make$ = function(self,item,pos,endPos,msg)
{
  if (msg === undefined) msg = null;
  fan.uiDev.DocPos.make$(self,item,pos);
  self.m_endPos = endPos;
  self.m_msg = msg;
  return;
}
fan.uiDev.DocMark.prototype.endPos = function()
{
  return this.m_endPos;
}
fan.uiDev.DocMark.prototype.dis = function()
{
  var dis = fan.uiDev.DocPos.prototype.dis.call(this);
  if (this.m_msg != null)
  {
    dis = fan.sys.Str.plus(dis,fan.sys.Str.plus(": ",this.m_msg));
  }
  ;
  return dis;
}
fan.uiDev.DocMark.prototype.m_endPos = null;
fan.uiDev.DocMark.prototype.m_msg = null;
fan.uiDev.DevDocItem = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.DevDocItem.prototype.compare = fan.uiDev.DocItem.prototype.compare;
fan.uiDev.DevDocItem.prototype.isErr = fan.uiDev.DocItem.prototype.isErr;
fan.uiDev.DevDocItem.prototype.dis = fan.uiDev.DocItem.prototype.dis;
fan.uiDev.DevDocItem.prototype.endPos = fan.uiDev.DocItem.prototype.endPos;
fan.uiDev.DevDocItem.prototype.pos = fan.uiDev.DocItem.prototype.pos;
fan.uiDev.DevDocItem.prototype.isSpan = fan.uiDev.DocItem.prototype.isSpan;
fan.uiDev.DevDocItem.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DevDocItem.prototype.$typeof = function() { return fan.uiDev.DevDocItem.$type; }
fan.uiDev.DevDocItem.makeBlank = function()
{
  return fan.uiDev.DevDocItem.make(fan.uiDev.DevDocItem.m_blankUri,fan.uiDev.DevIcon.m_blank);
}
fan.uiDev.DevDocItem.make = function(uri,icon) {
  var self = new fan.uiDev.DevDocItem();
  fan.uiDev.DevDocItem.make$(self,uri,icon);
  return self;
  }
fan.uiDev.DevDocItem.make$ = function(self,uri,icon)
{
  self.m_uri = uri;
  self.m_icon = icon;
  return;
}
fan.uiDev.DevDocItem.prototype.uri = function()
{
  return this.m_uri;
}
fan.uiDev.DevDocItem.prototype.$name = function()
{
  return this.m_uri.$name();
}
fan.uiDev.DevDocItem.prototype.icon = function()
{
  return this.m_icon;
}
fan.uiDev.DevDocItem.static$init = function()
{
  fan.uiDev.DevDocItem.m_blankUri = fan.sys.Uri.fromStr("dev:blank");
  return;
}
fan.uiDev.DevDocItem.m_blankUri = null;
fan.uiDev.DevDocItem.prototype.m_uri = null;
fan.uiDev.DevDocItem.prototype.m_icon = null;
fan.uiDev.BlankDoc = fan.sys.Obj.$extend(fan.uiDev.Document);
fan.uiDev.BlankDoc.prototype.$ctor = function()
{
  fan.uiDev.Document.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.BlankDoc.prototype.$typeof = function() { return fan.uiDev.BlankDoc.$type; }
fan.uiDev.BlankDoc.prototype.uri = function()
{
  return fan.uiDev.DevDocItem.m_blankUri;
}
fan.uiDev.BlankDoc.prototype.$name = function()
{
  return fan.uiDev.DevDocItem.m_blankUri.$name();
}
fan.uiDev.BlankDoc.prototype.icon = function()
{
  return fan.uiDev.DevIcon.m_blank;
}
fan.uiDev.BlankDoc.prototype.text = function()
{
  return "";
}
fan.uiDev.BlankDoc.prototype.isBlank = function()
{
  return true;
}
fan.uiDev.BlankDoc.make = function() {
  var self = new fan.uiDev.BlankDoc();
  fan.uiDev.BlankDoc.make$(self);
  return self;
  }
fan.uiDev.BlankDoc.make$ = function(self)
{
  fan.uiDev.Document.make$(self);
  return;
}
fan.uiDev.NotFoundDoc = fan.sys.Obj.$extend(fan.uiDev.Document);
fan.uiDev.NotFoundDoc.prototype.$ctor = function()
{
  fan.uiDev.Document.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.NotFoundDoc.prototype.$typeof = function() { return fan.uiDev.NotFoundDoc.$type; }
fan.uiDev.NotFoundDoc.make = function(uri) {
  var self = new fan.uiDev.NotFoundDoc();
  fan.uiDev.NotFoundDoc.make$(self,uri);
  return self;
  }
fan.uiDev.NotFoundDoc.make$ = function(self,uri)
{
  fan.uiDev.Document.make$(self);
  self.m_uri = uri;
  return;
}
fan.uiDev.NotFoundDoc.prototype.uri = function()
{
  return this.m_uri;
}
fan.uiDev.NotFoundDoc.prototype.$name = function()
{
  return this.m_uri.$name();
}
fan.uiDev.NotFoundDoc.prototype.icon = function()
{
  return fan.uiDev.DevIcon.m_warn;
}
fan.uiDev.NotFoundDoc.prototype.text = function()
{
  return fan.sys.Str.plus("NOT FOUND: ",this.m_uri);
}
fan.uiDev.NotFoundDoc.prototype.isNotFound = function()
{
  return true;
}
fan.uiDev.NotFoundDoc.prototype.m_uri = null;
fan.uiDev.DevPane = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiDev.DevPane.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.DevPane.prototype.$typeof = function() { return fan.uiDev.DevPane.$type; }
fan.uiDev.DevPane.make = function(main) {
  var self = new fan.uiDev.DevPane();
  fan.uiDev.DevPane.make$(self,main);
  return self;
  }
fan.uiDev.DevPane.make$ = function(self,main)
{
  fan.domkit.Box.make$(self);
  self.m_main = main;
  return;
}
fan.uiDev.DevPane.prototype.main = function()
{
  return this.m_main;
}
fan.uiDev.DevPane.prototype.main$ = function(it)
{
  this.m_main = it;
  return;
}
fan.uiDev.DevPane.prototype.state = function()
{
  return this.m_main.m_state;
}
fan.uiDev.DevPane.prototype.m_main = null;
fan.uiDev.CmdBarPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.CmdBarPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.CmdBarPane.prototype.$typeof = function() { return fan.uiDev.CmdBarPane.$type; }
fan.uiDev.CmdBarPane.make = function(main) {
  var self = new fan.uiDev.CmdBarPane();
  fan.uiDev.CmdBarPane.make$(self,main);
  return self;
  }
fan.uiDev.CmdBarPane.make$ = function(self,main)
{
  var $this = self;
  fan.uiDev.DevPane.make$(self,main);
  var cmds = main.m_state.m_cmds;
  var tbCmds = fan.sys.List.make(fan.uiDev.Cmd.$type.toNullable(), [cmds.get("commands"),cmds.get("save"),cmds.get("new"),cmds.get("edit"),cmds.get("trash"),cmds.get("find"),cmds.get("docs"),cmds.get("hideTools")]);
  self.m_buttons = fan.sys.ObjUtil.coerce(tbCmds.map(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u21,
    function(cmd)
    {
      return fan.uiDev.CmdButton.make(main,fan.sys.ObjUtil.coerce(cmd,fan.uiDev.Cmd.$type));
    })),fan.sys.Type.find("uiDev::CmdButton[]"));
  self.style().trap("paddingBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
  var flow = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u22,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["24px","24px","4px","4px","24px","4px","4px"]));
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_buttons.each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u23,
    function(b)
    {
      flow.add(b);
      return;
    }));
  self.add(flow);
  return;
}
fan.uiDev.CmdBarPane.prototype.onUpdate = function(event)
{
  var $this = this;
  this.m_buttons.each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u24,
    function(button)
    {
      button.updateEnable();
      return;
    }));
  return;
}
fan.uiDev.CmdBarPane.prototype.buttons = function()
{
  return this.m_buttons;
}
fan.uiDev.CmdBarPane.prototype.buttons$ = function(it)
{
  this.m_buttons = it;
  return;
}
fan.uiDev.CmdBarPane.prototype.m_buttons = null;
fan.uiDev.CmdButton = fan.sys.Obj.$extend(fan.domkit.Button);
fan.uiDev.CmdButton.prototype.$ctor = function()
{
  fan.domkit.Button.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.CmdButton.prototype.$typeof = function() { return fan.uiDev.CmdButton.$type; }
fan.uiDev.CmdButton.makeIcon = function(main,cmd)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiDev.CmdButton.make(main,cmd),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u25,
    function(it)
    {
      it.text$("");
      it.add(fan.sys.ObjUtil.coerce(fan.ui.Icon.makeSpec(cmd.icon().black()),fan.dom.Elem.$type));
      it.style().addClass("uiDev-mouseOverButton");
      it.trap("title",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[cmd.dis()]));
      return;
    })),fan.uiDev.CmdButton.$type);
}
fan.uiDev.CmdButton.make = function(main,cmd) {
  var self = new fan.uiDev.CmdButton();
  fan.uiDev.CmdButton.make$(self,main,cmd);
  return self;
  }
fan.uiDev.CmdButton.make$ = function(self,main,cmd)
{
  var $this = self;
  fan.domkit.Button.make$(self);
  self.m_main = main;
  self.m_cmd = cmd;
  self.text$(cmd.disToolbar());
  if (cmd.isPopup())
  {
    self.style().addClass("disclosure");
    self.onPopup(fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u26,
      function(it)
      {
        return cmd.onPopup(main);
      }));
  }
  else
  {
    self.onAction(fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u25,
      function(it)
      {
        cmd.invoke(main);
        return;
      }));
  }
  ;
  return;
}
fan.uiDev.CmdButton.prototype.updateEnable = function()
{
  this.enabled$(fan.sys.ObjUtil.coerce(this.m_cmd.enable(this.m_main),fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiDev.CmdButton.prototype.main = function()
{
  return this.m_main;
}
fan.uiDev.CmdButton.prototype.main$ = function(it)
{
  this.m_main = it;
  return;
}
fan.uiDev.CmdButton.prototype.m_main = null;
fan.uiDev.CmdButton.prototype.m_cmd = null;
fan.uiDev.AbstractToolPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.AbstractToolPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.AbstractToolPane.prototype.$typeof = function() { return fan.uiDev.AbstractToolPane.$type; }
fan.uiDev.AbstractToolPane.make = function(main) {
  var self = new fan.uiDev.AbstractToolPane();
  fan.uiDev.AbstractToolPane.make$(self,main);
  return self;
  }
fan.uiDev.AbstractToolPane.make$ = function(self,main)
{
  fan.uiDev.DevPane.make$(self,main);
  return;
}
fan.uiDev.AbstractToolPane.prototype.init = function(toolbar,body)
{
  var $this = this;
  var title = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u6,
    function(it)
    {
      it.text$($this.type().m_dis);
      return;
    })),fan.domkit.Label.$type);
  var close = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiDev.CmdButton.makeIcon(this.m_main,fan.sys.ObjUtil.coerce(this.state().m_cmds.get("hideTools"),fan.uiDev.Cmd.$type)),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u25,
    function(it)
    {
      it.style().trap("marginLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      return;
    })),fan.uiDev.CmdButton.$type);
  var top = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u27,
    function(it)
    {
      it.flex$(fan.sys.List.make(fan.sys.Str.$type, ["0 0 auto","0 0 auto","0 0 auto"]));
      it.style().trap("minHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["32px"]));
      it.style().trap("paddingBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(title),fan.domkit.FlexBox.$type).add(toolbar),fan.domkit.FlexBox.$type).add(close);
      return;
    })),fan.domkit.FlexBox.$type);
  var flex = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u27,
    function(it)
    {
      it.dir$("column");
      it.flex$(fan.sys.List.make(fan.sys.Str.$type, ["0 0 auto","1 1 0"]));
      fan.sys.ObjUtil.coerce(it.add(top),fan.domkit.FlexBox.$type).add(body);
      return;
    })),fan.domkit.FlexBox.$type);
  this.add(flex);
  return;
}
fan.uiDev.AbstractToolPane.prototype.refocus = function()
{
  return;
}
fan.uiDev.BuildPane = fan.sys.Obj.$extend(fan.uiDev.AbstractToolPane);
fan.uiDev.BuildPane.prototype.$ctor = function()
{
  fan.uiDev.AbstractToolPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.BuildPane.prototype.$typeof = function() { return fan.uiDev.BuildPane.$type; }
fan.uiDev.BuildPane.make = function(main) {
  var self = new fan.uiDev.BuildPane();
  fan.uiDev.BuildPane.make$(self,main);
  return self;
  }
fan.uiDev.BuildPane.make$ = function(self,main)
{
  fan.uiDev.AbstractToolPane.make$(self,main);
  self.m_marksPane = fan.uiDev.MarksPane.make(main);
  self.init(fan.domkit.Label.make(),self.m_marksPane);
  return;
}
fan.uiDev.BuildPane.prototype.type = function()
{
  return fan.uiDev.ToolType.m_build;
}
fan.uiDev.BuildPane.prototype.onUpdate = function(event)
{
  this.m_marksPane.onUpdate(event);
  return;
}
fan.uiDev.BuildPane.prototype.marksPane = function()
{
  return this.m_marksPane;
}
fan.uiDev.BuildPane.prototype.marksPane$ = function(it)
{
  this.m_marksPane = it;
  return;
}
fan.uiDev.BuildPane.prototype.m_marksPane = null;
fan.uiDev.StatusPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.StatusPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.StatusPane.prototype.$typeof = function() { return fan.uiDev.StatusPane.$type; }
fan.uiDev.StatusPane.make = function(main) {
  var self = new fan.uiDev.StatusPane();
  fan.uiDev.StatusPane.make$(self,main);
  return self;
  }
fan.uiDev.StatusPane.make$ = function(self,main)
{
  fan.uiDev.DevPane.make$(self,main);
  self.style().trap("minHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["20px"]));
  return;
}
fan.uiDev.StatusPane.prototype.onUpdate = function(event)
{
  return;
}
fan.uiDev.StatusPane.prototype.clear = function()
{
  if (this.m_isClear)
  {
    return;
  }
  ;
  this.m_isClear = true;
  this.removeAll();
  return;
}
fan.uiDev.StatusPane.prototype.flash = function(icon,text)
{
  this.show(icon,text,fan.sys.Duration.fromStr("3sec"));
  return;
}
fan.uiDev.StatusPane.prototype.show = function(icon,text,timeout)
{
  if (timeout === undefined) timeout = null;
  var $this = this;
  if (this.m_timeoutId != null)
  {
    fan.dom.Win.cur().clearTimeout(fan.sys.ObjUtil.coerce(this.m_timeoutId,fan.sys.Int.$type));
  }
  ;
  if (timeout != null)
  {
    this.m_timeoutId = fan.sys.ObjUtil.coerce(fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("3sec"),fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u28,
      function(it)
      {
        $this.onTimeout();
        return;
      })),fan.sys.Int.$type.toNullable());
  }
  ;
  this.clear();
  this.m_isClear = false;
  var iconElem = fan.ui.Icon.makeSpec(icon);
  iconElem.style().addClass("uiDev-label-icon");
  iconElem.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px 4px 0 0"]));
  this.add(fan.sys.ObjUtil.coerce(iconElem,fan.dom.Elem.$type));
  var textElem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u6,
    function(it)
    {
      it.text$(text);
      return;
    })),fan.domkit.Label.$type);
  textElem.style().addClass("uiDev-label-text");
  textElem.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px 0 0 0"]));
  this.add(textElem);
  return;
}
fan.uiDev.StatusPane.prototype.onTimeout = function()
{
  this.m_timeoutId = null;
  this.clear();
  return;
}
fan.uiDev.StatusPane.prototype.timeoutId = function()
{
  return this.m_timeoutId;
}
fan.uiDev.StatusPane.prototype.timeoutId$ = function(it)
{
  this.m_timeoutId = it;
  return;
}
fan.uiDev.StatusPane.prototype.isClear = function()
{
  return this.m_isClear;
}
fan.uiDev.StatusPane.prototype.isClear$ = function(it)
{
  this.m_isClear = it;
  return;
}
fan.uiDev.StatusPane.prototype.m_timeoutId = null;
fan.uiDev.StatusPane.prototype.m_isClear = false;
fan.uiDev.ToolPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.ToolPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.ToolPane.prototype.$typeof = function() { return fan.uiDev.ToolPane.$type; }
fan.uiDev.ToolPane.make = function(main) {
  var self = new fan.uiDev.ToolPane();
  fan.uiDev.ToolPane.make$(self,main);
  return self;
  }
fan.uiDev.ToolPane.make$ = function(self,main)
{
  fan.uiDev.DevPane.make$(self,main);
  return;
}
fan.uiDev.ToolPane.prototype.onUpdate = function(event)
{
  if (event.m_showTool)
  {
    this.updateToolPane();
  }
  ;
  (function($this) { var $_u29 = $this.m_cur; if ($_u29 == null) return null; return $_u29.onUpdate(event); })(this);
  return;
}
fan.uiDev.ToolPane.prototype.updateToolPane = function()
{
  var cur = (function($this) { var $_u30 = fan.uiDev.ToolType.fromStr($this.state().m_showTool,false); if ($_u30 == null) return null; return $_u30.makePane($this.m_main); })(this);
  this.removeAll();
  if (cur != null)
  {
    this.add(fan.sys.ObjUtil.coerce(cur,fan.dom.Elem.$type));
  }
  ;
  this.m_cur = cur;
  return;
}
fan.uiDev.ToolPane.prototype.refocus = function()
{
  (function($this) { var $_u31 = $this.m_cur; if ($_u31 == null) return null; return $_u31.refocus(); })(this);
  return;
}
fan.uiDev.ToolPane.prototype.cur = function()
{
  return this.m_cur;
}
fan.uiDev.ToolPane.prototype.cur$ = function(it)
{
  this.m_cur = it;
  return;
}
fan.uiDev.ToolPane.prototype.m_cur = null;
fan.uiDev.ToolType = fan.sys.Obj.$extend(fan.sys.Enum);
fan.uiDev.ToolType.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.ToolType.prototype.$typeof = function() { return fan.uiDev.ToolType.$type; }
fan.uiDev.ToolType.make = function($ordinal,$name,dis,paneType) {
  var self = new fan.uiDev.ToolType();
  fan.uiDev.ToolType.make$(self,$ordinal,$name,dis,paneType);
  return self;
  }
fan.uiDev.ToolType.make$ = function(self,$ordinal,$name,dis,paneType)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  self.m_dis = dis;
  self.m_paneType = paneType;
  return;
}
fan.uiDev.ToolType.prototype.makePane = function(main)
{
  return fan.sys.ObjUtil.coerce(this.m_paneType.make(fan.sys.List.make(fan.uiDev.DevMain.$type, [main])),fan.uiDev.AbstractToolPane.$type);
}
fan.uiDev.ToolType.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.uiDev.ToolType.$type,$name,checked),fan.uiDev.ToolType.$type.toNullable());
}
fan.uiDev.ToolType.static$init = function()
{
  fan.uiDev.ToolType.m_find = fan.uiDev.ToolType.make(0,"find","Find",fan.uiDev.FindPane.$type);
  fan.uiDev.ToolType.m_docs = fan.uiDev.ToolType.make(1,"docs","Docs",fan.uiDev.DocsPane.$type);
  fan.uiDev.ToolType.m_build = fan.uiDev.ToolType.make(2,"build","Build",fan.uiDev.BuildPane.$type);
  fan.uiDev.ToolType.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u32 = fan.sys.List.make(fan.uiDev.ToolType.$type, [fan.uiDev.ToolType.m_find,fan.uiDev.ToolType.m_docs,fan.uiDev.ToolType.m_build]); if ($_u32 == null) return null; return fan.sys.ObjUtil.toImmutable($_u32); })(this),fan.sys.Type.find("uiDev::ToolType[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.uiDev.ToolType.m_find = null;
fan.uiDev.ToolType.m_docs = null;
fan.uiDev.ToolType.m_build = null;
fan.uiDev.ToolType.m_vals = null;
fan.uiDev.ToolType.prototype.m_dis = null;
fan.uiDev.ToolType.prototype.m_paneType = null;
fan.uiDev.ContentPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.ContentPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.ContentPane.prototype.$typeof = function() { return fan.uiDev.ContentPane.$type; }
fan.uiDev.ContentPane.make = function(main) {
  var self = new fan.uiDev.ContentPane();
  fan.uiDev.ContentPane.make$(self,main);
  return self;
  }
fan.uiDev.ContentPane.make$ = function(self,main)
{
  fan.uiDev.DevPane.make$(self,main);
  self.m_devBlank = fan.sys.ObjUtil.coerce(self.init(fan.uiDev.DevBlankPane.make(main)),fan.uiDev.DevBlankPane.$type);
  self.m_notFound = fan.sys.ObjUtil.coerce(self.init(fan.uiDev.NotFoundPane.make(main)),fan.uiDev.NotFoundPane.$type);
  self.m_code = fan.sys.ObjUtil.coerce(self.init(fan.uiDev.CodePane.make(main)),fan.uiDev.CodePane.$type);
  self.select(self.m_devBlank);
  return;
}
fan.uiDev.ContentPane.prototype.refocus = function()
{
  this.m_cur.refocus();
  return;
}
fan.uiDev.ContentPane.prototype.curText = function()
{
  return this.m_cur.curText();
}
fan.uiDev.ContentPane.prototype.curWord = function()
{
  return this.m_cur.curWord();
}
fan.uiDev.ContentPane.prototype.curSelection = function()
{
  return this.m_cur.curSelection();
}
fan.uiDev.ContentPane.prototype.curSelectionOrWord = function()
{
  return this.m_cur.curSelectionOrWord();
}
fan.uiDev.ContentPane.prototype.onGoto = function(item)
{
  this.m_cur.onGoto(item);
  return;
}
fan.uiDev.ContentPane.prototype.onInsertUnit = function()
{
  this.m_cur.onInsertUnit();
  return;
}
fan.uiDev.ContentPane.prototype.onUpdate = function(event)
{
  if (event.m_content)
  {
    if (this.state().m_doc.isBlank())
    {
      this.select(this.m_devBlank);
    }
    else
    {
      if (this.state().m_doc.isNotFound())
      {
        this.select(this.m_notFound);
      }
      else
      {
        this.select(this.m_code);
      }
      ;
    }
    ;
  }
  ;
  this.m_devBlank.onUpdate(event);
  this.m_notFound.onUpdate(event);
  this.m_code.onUpdate(event);
  return;
}
fan.uiDev.ContentPane.prototype.init = function(pane)
{
  pane.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
  pane.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
  pane.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
  pane.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  pane.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  pane.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
  this.add(pane);
  return pane;
}
fan.uiDev.ContentPane.prototype.select = function(pane)
{
  if (pane === this.m_cur)
  {
    return;
  }
  ;
  if (this.m_cur != null)
  {
    this.m_cur.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
  }
  ;
  this.m_cur = pane;
  this.m_cur.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
  return;
}
fan.uiDev.ContentPane.prototype.cur = function()
{
  return this.m_cur;
}
fan.uiDev.ContentPane.prototype.cur$ = function(it)
{
  this.m_cur = it;
  return;
}
fan.uiDev.ContentPane.prototype.devBlank = function()
{
  return this.m_devBlank;
}
fan.uiDev.ContentPane.prototype.devBlank$ = function(it)
{
  this.m_devBlank = it;
  return;
}
fan.uiDev.ContentPane.prototype.notFound = function()
{
  return this.m_notFound;
}
fan.uiDev.ContentPane.prototype.notFound$ = function(it)
{
  this.m_notFound = it;
  return;
}
fan.uiDev.ContentPane.prototype.code = function()
{
  return this.m_code;
}
fan.uiDev.ContentPane.prototype.code$ = function(it)
{
  this.m_code = it;
  return;
}
fan.uiDev.ContentPane.prototype.m_cur = null;
fan.uiDev.ContentPane.prototype.m_devBlank = null;
fan.uiDev.ContentPane.prototype.m_notFound = null;
fan.uiDev.ContentPane.prototype.m_code = null;
fan.uiDev.AbstractContentPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.AbstractContentPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.AbstractContentPane.prototype.$typeof = function() { return fan.uiDev.AbstractContentPane.$type; }
fan.uiDev.AbstractContentPane.make = function(main) {
  var self = new fan.uiDev.AbstractContentPane();
  fan.uiDev.AbstractContentPane.make$(self,main);
  return self;
  }
fan.uiDev.AbstractContentPane.make$ = function(self,main)
{
  fan.uiDev.DevPane.make$(self,main);
  return;
}
fan.uiDev.AbstractContentPane.prototype.refocus = function()
{
  return;
}
fan.uiDev.AbstractContentPane.prototype.curText = function()
{
  return "";
}
fan.uiDev.AbstractContentPane.prototype.curWord = function()
{
  return "";
}
fan.uiDev.AbstractContentPane.prototype.curSelection = function()
{
  return "";
}
fan.uiDev.AbstractContentPane.prototype.curSelectionOrWord = function()
{
  var sel = this.curSelection();
  if (!fan.sys.Str.isEmpty(sel))
  {
    return sel;
  }
  ;
  return this.curWord();
}
fan.uiDev.AbstractContentPane.prototype.onGoto = function(item)
{
  return;
}
fan.uiDev.AbstractContentPane.prototype.onInsertUnit = function()
{
  return;
}
fan.uiDev.DevBlankPane = fan.sys.Obj.$extend(fan.uiDev.AbstractContentPane);
fan.uiDev.DevBlankPane.prototype.$ctor = function()
{
  fan.uiDev.AbstractContentPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.DevBlankPane.prototype.$typeof = function() { return fan.uiDev.DevBlankPane.$type; }
fan.uiDev.DevBlankPane.make = function(main) {
  var self = new fan.uiDev.DevBlankPane();
  fan.uiDev.DevBlankPane.make$(self,main);
  return self;
  }
fan.uiDev.DevBlankPane.make$ = function(self,main)
{
  var $this = self;
  fan.uiDev.AbstractContentPane.make$(self,main);
  var icon = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Icon.color("ide"),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u33,
    function(it)
    {
      it.resize("48px");
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      return;
    })),fan.ui.Icon.$type);
  var title = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u34,
    function(it)
    {
      it.text$("Code Editor");
      it.style().trap("fontSize",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["24px"]));
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["24px"]));
      return;
    })),fan.dom.Elem.$type);
  var center = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u27,
    function(it)
    {
      it.dir$("column");
      it.alignCross$("center");
      it.alignMain$("center");
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(icon),fan.domkit.FlexBox.$type).add(title),fan.domkit.FlexBox.$type).add($this.makeCmdHelp(fan.sys.ObjUtil.coerce($this.state().m_cmds.get("commands"),fan.uiDev.Cmd.$type))),fan.domkit.FlexBox.$type).add($this.makeCmdHelp(fan.sys.ObjUtil.coerce($this.state().m_cmds.get("goto"),fan.uiDev.Cmd.$type))),fan.domkit.FlexBox.$type).add($this.makeCmdHelp(fan.sys.ObjUtil.coerce($this.state().m_cmds.get("new"),fan.uiDev.Cmd.$type)));
      return;
    })),fan.domkit.FlexBox.$type);
  self.add(center);
  return;
}
fan.uiDev.DevBlankPane.prototype.makeCmdHelp = function(cmd)
{
  var $this = this;
  var hotKeys = this.m_main.session().hotKeys().keysFor(cmd.m_def);
  var match = fan.misc.FuzzySearch.fromStr("").match(cmd.dis());
  var elem = fan.uiDev.UiDevUtil.cmdItemElem(cmd.m_def,hotKeys,fan.sys.ObjUtil.coerce(match,fan.misc.FuzzyMatch.$type));
  elem.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["250px"]));
  elem.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["2px"]));
  elem.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
  elem.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
  elem.style().addClass("uiDev-mouseOverButton");
  elem.onEvent("mouseup",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      cmd.invoke($this.m_main);
      return;
    }));
  return elem;
}
fan.uiDev.DevBlankPane.prototype.onUpdate = function(event)
{
  return;
}
fan.uiDev.NotFoundPane = fan.sys.Obj.$extend(fan.uiDev.AbstractContentPane);
fan.uiDev.NotFoundPane.prototype.$ctor = function()
{
  fan.uiDev.AbstractContentPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_docName = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u6,
    function(it)
    {
      return;
    })),fan.domkit.Label.$type);
  return;
}
fan.uiDev.NotFoundPane.prototype.$typeof = function() { return fan.uiDev.NotFoundPane.$type; }
fan.uiDev.NotFoundPane.make = function(main) {
  var self = new fan.uiDev.NotFoundPane();
  fan.uiDev.NotFoundPane.make$(self,main);
  return self;
  }
fan.uiDev.NotFoundPane.make$ = function(self,main)
{
  var $this = self;
  fan.uiDev.AbstractContentPane.make$(self,main);
  ;
  var icon = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.Icon.color("warn"),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u33,
    function(it)
    {
      it.resize("48px");
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      return;
    })),fan.ui.Icon.$type);
  var title = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u34,
    function(it)
    {
      it.text$("Document Not Found");
      it.style().trap("fontSize",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["24px"]));
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      return;
    })),fan.dom.Elem.$type);
  var center = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u27,
    function(it)
    {
      it.dir$("column");
      it.alignCross$("center");
      it.alignMain$("center");
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add(icon),fan.domkit.FlexBox.$type).add(title),fan.domkit.FlexBox.$type).add($this.m_docName);
      return;
    })),fan.domkit.FlexBox.$type);
  self.add(center);
  return;
}
fan.uiDev.NotFoundPane.prototype.onUpdate = function(event)
{
  if ((event.m_content && this.state().m_doc.isNotFound()))
  {
    this.m_docName.text$(this.state().m_doc.$name());
  }
  ;
  return;
}
fan.uiDev.NotFoundPane.prototype.docName = function()
{
  return this.m_docName;
}
fan.uiDev.NotFoundPane.prototype.docName$ = function(it)
{
  this.m_docName = it;
  return;
}
fan.uiDev.NotFoundPane.prototype.m_docName = null;
fan.uiDev.FindPane = fan.sys.Obj.$extend(fan.uiDev.AbstractToolPane);
fan.uiDev.FindPane.prototype.$ctor = function()
{
  fan.uiDev.AbstractToolPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.FindPane.prototype.$typeof = function() { return fan.uiDev.FindPane.$type; }
fan.uiDev.FindPane.make = function(main) {
  var self = new fan.uiDev.FindPane();
  fan.uiDev.FindPane.make$(self,main);
  return self;
  }
fan.uiDev.FindPane.make$ = function(self,main)
{
  var $this = self;
  fan.uiDev.AbstractToolPane.make$(self,main);
  self.m_pattern = self.makeField();
  self.m_pattern.onModify(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u36,
    function(it)
    {
      $this.onFind(false);
      return;
    }));
  self.m_matchCase = self.makeToggle("Aa","Match Case");
  self.m_matchWord = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(self.makeToggle("W","Match Whole Word"),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u37,
    function(it)
    {
      it.style().trap("textDecoration",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["underline overline"]));
      return;
    })),fan.domkit.ToggleButton.$type);
  self.m_regex = self.makeToggle("re","Regular Expression");
  var findInFuncs = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Button.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u38,
    function(it)
    {
      it.text$("Find in Funcs");
      it.onAction(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u38,
        function(it)
        {
          $this.onFind(true);
          return;
        }));
      return;
    })),fan.domkit.Button.$type);
  var cmds = main.m_state.m_cmds;
  self.m_prev = fan.uiDev.CmdButton.makeIcon(main,fan.sys.ObjUtil.coerce(cmds.get("markPrev"),fan.uiDev.Cmd.$type));
  self.m_next = fan.uiDev.CmdButton.makeIcon(main,fan.sys.ObjUtil.coerce(cmds.get("markNext"),fan.uiDev.Cmd.$type));
  self.m_count = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u6,
    function(it)
    {
      it.text$("");
      return;
    })),fan.domkit.Label.$type);
  var findBox = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlowBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u22,
    function(it)
    {
      it.gaps$(fan.sys.List.make(fan.sys.Str.$type, ["8px","-1px","-1px","16px","16px","0x","16px","16px"]));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 8px"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_pattern),fan.domkit.FlowBox.$type).add($this.m_matchCase),fan.domkit.FlowBox.$type).add($this.m_matchWord),fan.domkit.FlowBox.$type).add($this.m_regex),fan.domkit.FlowBox.$type).add(findInFuncs),fan.domkit.FlowBox.$type).add($this.m_prev),fan.domkit.FlowBox.$type).add($this.m_next),fan.domkit.FlowBox.$type).add($this.m_count);
      return;
    })),fan.domkit.FlowBox.$type);
  self.m_marksPane = fan.uiDev.MarksPane.make(main);
  self.init(findBox,self.m_marksPane);
  return;
}
fan.uiDev.FindPane.prototype.makeField = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u36,
    function(it)
    {
      it.cols$(fan.sys.ObjUtil.coerce(50,fan.sys.Int.$type.toNullable()));
      return;
    })),fan.domkit.TextField.$type);
}
fan.uiDev.FindPane.prototype.makeToggle = function(symbol,tip)
{
  var $this = this;
  var button = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u37,
    function(it)
    {
      it.text$(symbol);
      return;
    })),fan.domkit.ToggleButton.$type);
  button.trap("title",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[tip]));
  button.onAction(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u37,
    function(it)
    {
      $this.onFind(false);
      return;
    }));
  return button;
}
fan.uiDev.FindPane.prototype.type = function()
{
  return fan.uiDev.ToolType.m_find;
}
fan.uiDev.FindPane.prototype.onFind = function(inAll)
{
  var $this = this;
  try
  {
    var ts = fan.misc.TextSearch.make(fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u39,
      function(it)
      {
        it.m_pattern = $this.m_pattern.val();
        it.m_matchCase = $this.m_matchCase.selected();
        it.m_matchWord = $this.m_matchWord.selected();
        it.m_regex = $this.m_regex.selected();
        return;
      }));
    if (inAll)
    {
      this.m_main.findInFuncs(ts);
    }
    else
    {
      this.m_main.find(ts);
    }
    ;
  }
  catch ($_u40)
  {
    $_u40 = fan.sys.Err.make($_u40);
    if ($_u40 instanceof fan.sys.Err)
    {
      var e = $_u40;
      var e;
      fan.sys.ObjUtil.echo(fan.sys.Str.plus("WARN: ",e));
    }
    else
    {
      throw $_u40;
    }
  }
  ;
  return;
}
fan.uiDev.FindPane.prototype.onUpdate = function(event)
{
  if (event.m_find)
  {
    var f = this.state().m_find;
    this.m_pattern.val$(f.m_pattern);
    this.m_matchCase.selected$(f.m_matchCase);
    this.m_matchWord.selected$(f.m_matchWord);
    this.m_regex.selected$(f.m_regex);
  }
  ;
  if ((event.m_marks || event.m_curMark))
  {
    this.m_prev.updateEnable();
    this.m_next.updateEnable();
    this.m_count.text$(fan.uiDev.FindPane.toCountText(this.state()));
  }
  ;
  this.m_marksPane.onUpdate(event);
  return;
}
fan.uiDev.FindPane.toCountText = function(s)
{
  if (s.m_marks.isEmpty())
  {
    return "No Results";
  }
  ;
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.plus(s.m_curMark,1),fan.sys.Obj.$type.toNullable()))," of "),fan.sys.ObjUtil.coerce(s.m_marks.size(),fan.sys.Obj.$type.toNullable()));
}
fan.uiDev.FindPane.prototype.refocus = function()
{
  this.m_pattern.focus();
  return;
}
fan.uiDev.FindPane.prototype.pattern = function()
{
  return this.m_pattern;
}
fan.uiDev.FindPane.prototype.pattern$ = function(it)
{
  this.m_pattern = it;
  return;
}
fan.uiDev.FindPane.prototype.matchCase = function()
{
  return this.m_matchCase;
}
fan.uiDev.FindPane.prototype.matchCase$ = function(it)
{
  this.m_matchCase = it;
  return;
}
fan.uiDev.FindPane.prototype.matchWord = function()
{
  return this.m_matchWord;
}
fan.uiDev.FindPane.prototype.matchWord$ = function(it)
{
  this.m_matchWord = it;
  return;
}
fan.uiDev.FindPane.prototype.regex = function()
{
  return this.m_regex;
}
fan.uiDev.FindPane.prototype.regex$ = function(it)
{
  this.m_regex = it;
  return;
}
fan.uiDev.FindPane.prototype.prev = function()
{
  return this.m_prev;
}
fan.uiDev.FindPane.prototype.prev$ = function(it)
{
  this.m_prev = it;
  return;
}
fan.uiDev.FindPane.prototype.next = function()
{
  return this.m_next;
}
fan.uiDev.FindPane.prototype.next$ = function(it)
{
  this.m_next = it;
  return;
}
fan.uiDev.FindPane.prototype.count = function()
{
  return this.m_count;
}
fan.uiDev.FindPane.prototype.count$ = function(it)
{
  this.m_count = it;
  return;
}
fan.uiDev.FindPane.prototype.marksPane = function()
{
  return this.m_marksPane;
}
fan.uiDev.FindPane.prototype.marksPane$ = function(it)
{
  this.m_marksPane = it;
  return;
}
fan.uiDev.FindPane.prototype.m_pattern = null;
fan.uiDev.FindPane.prototype.m_matchCase = null;
fan.uiDev.FindPane.prototype.m_matchWord = null;
fan.uiDev.FindPane.prototype.m_regex = null;
fan.uiDev.FindPane.prototype.m_prev = null;
fan.uiDev.FindPane.prototype.m_next = null;
fan.uiDev.FindPane.prototype.m_count = null;
fan.uiDev.FindPane.prototype.m_marksPane = null;
fan.uiDev.NavPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.NavPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.NavPane.prototype.$typeof = function() { return fan.uiDev.NavPane.$type; }
fan.uiDev.NavPane.make = function(main) {
  var self = new fan.uiDev.NavPane();
  fan.uiDev.NavPane.make$(self,main);
  return self;
  }
fan.uiDev.NavPane.make$ = function(self,main)
{
  var $this = self;
  fan.uiDev.DevPane.make$(self,main);
  self.m_selector = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.uiDev.MarkerSelector.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u41,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["left"]));
      it.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["nowrap"]));
      it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
      it.style().trap("textOverflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["ellipsis"]));
      it.onModify(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u42,
        function(sm)
        {
          fan.uiDev.SetMarkersOp.make(sm.m_selected).run(main);
          return;
        }));
      return;
    })),fan.uiDev.MarkerSelector.$type);
  self.m_listBox = fan.uiDev.ListBox.make(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u43,
    function(it)
    {
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiDev.UiDevUtil.border()]));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u44,
        function(e)
        {
          main.goto(fan.sys.ObjUtil.coerce(e.m_item,fan.uiDev.DocItem.$type));
          return;
        }));
      it.onElem(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u45,
        function(item)
        {
          return fan.uiDev.UiDevUtil.iconTextElem(item.icon(),item.dis());
        }),fan.sys.Type.find("|sys::Obj->dom::Elem|")));
      it.onSearch(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u46,
        function(item)
        {
          return item.dis();
        }),fan.sys.Type.find("|sys::Obj->sys::Str|")));
      it.m_focusable = true;
      return;
    }));
  self.add(self.m_listBox.makeSearchCombo(self.m_selector));
  return;
}
fan.uiDev.NavPane.prototype.onUpdate = function(event)
{
  this.updateItems(event);
  this.updateSelected();
  return;
}
fan.uiDev.NavPane.prototype.updateItems = function(event)
{
  if (!event.m_funcs)
  {
    return;
  }
  ;
  this.m_selector.update(this.state().m_funcs.m_markers,this.state().m_markers);
  this.m_listBox.update(this.state().m_funcs.show(this.state().m_markers));
  return;
}
fan.uiDev.NavPane.prototype.updateSelected = function()
{
  var $this = this;
  this.m_listBox.selected$(this.state().m_funcs.m_list.find(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u47,
    function(res)
    {
      return fan.sys.ObjUtil.equals(res.m_uri,$this.state().m_uri);
    })));
  return;
}
fan.uiDev.NavPane.prototype.selector = function()
{
  return this.m_selector;
}
fan.uiDev.NavPane.prototype.selector$ = function(it)
{
  this.m_selector = it;
  return;
}
fan.uiDev.NavPane.prototype.listBox = function()
{
  return this.m_listBox;
}
fan.uiDev.NavPane.prototype.listBox$ = function(it)
{
  this.m_listBox = it;
  return;
}
fan.uiDev.NavPane.prototype.m_selector = null;
fan.uiDev.NavPane.prototype.m_listBox = null;
fan.uiDev.CodePane = fan.sys.Obj.$extend(fan.uiDev.AbstractContentPane);
fan.uiDev.CodePane.prototype.$ctor = function()
{
  fan.uiDev.AbstractContentPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_caretMemory = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Uri"),fan.sys.Type.find("codemirror::Pos"));
  return;
}
fan.uiDev.CodePane.prototype.$typeof = function() { return fan.uiDev.CodePane.$type; }
fan.uiDev.CodePane.make = function(main) {
  var self = new fan.uiDev.CodePane();
  fan.uiDev.CodePane.make$(self,main);
  return self;
  }
fan.uiDev.CodePane.make$ = function(self,main)
{
  fan.uiDev.AbstractContentPane.make$(self,main);
  ;
  self.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiDev.UiDevUtil.border()]));
  return;
}
fan.uiDev.CodePane.prototype.mountCodeMirror = function()
{
  var $this = this;
  this.m_cm = fan.ui.TextEditor.make(this.m_main.session(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u48,
    function(it)
    {
      it.m_lang = fan.ui.TextEditorLang.m_axon;
      it.onModify(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u48,
        function(it)
        {
          $this.onModify();
          return;
        }));
      it.onSave(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u48,
        function(it)
        {
          $this.m_main.save();
          return;
        }));
      return;
    }));
  this.removeAll();
  this.add(fan.sys.ObjUtil.coerce(this.m_cm,fan.dom.Elem.$type));
  this.m_cm.relayout();
  return;
}
fan.uiDev.CodePane.prototype.onModify = function()
{
  this.m_main.setDirty();
  this.m_main.m_status.clear();
  return;
}
fan.uiDev.CodePane.prototype.refocus = function()
{
  this.m_cm.focus();
  return;
}
fan.uiDev.CodePane.prototype.curText = function()
{
  return this.m_cm.val();
}
fan.uiDev.CodePane.prototype.curWord = function()
{
  return this.m_cm.curWord();
}
fan.uiDev.CodePane.prototype.curSelection = function()
{
  return this.m_cm.selection();
}
fan.uiDev.CodePane.prototype.onGoto = function(item)
{
  if (item.pos() != null)
  {
    this.m_cm.caret$(fan.sys.ObjUtil.coerce(item.pos(),fan.codemirror.Pos.$type));
  }
  ;
  return;
}
fan.uiDev.CodePane.prototype.onUpdate = function(event)
{
  if (this.m_cm == null)
  {
    this.saveCaret();
    this.mountCodeMirror();
  }
  ;
  if ((event.m_content && fan.sys.ObjUtil.compareNE(this.m_cm.val(),this.state().m_doc.text())))
  {
    var text = this.state().m_doc.text();
    this.m_cm.val$(this.state().m_doc.text());
    this.restoreCaret();
  }
  ;
  if (event.m_marks)
  {
    this.updateMarks();
  }
  ;
  if (event.m_curMark)
  {
    this.selectCurMark();
    this.updateMarks();
  }
  ;
  return;
}
fan.uiDev.CodePane.prototype.updateMarks = function()
{
  var $this = this;
  this.m_cm.clearMarks();
  this.state().m_marks.each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u49,
    function(m,i)
    {
      if (fan.sys.ObjUtil.compareNE(m.uri(),$this.state().m_uri))
      {
        return;
      }
      ;
      if (m.pos() == null)
      {
        return;
      }
      ;
      var style = fan.codemirror.MarkStyle.m_highlight;
      if (m.isErr())
      {
        style = fan.codemirror.MarkStyle.m_err;
      }
      else
      {
        if (fan.sys.ObjUtil.equals(i,$this.state().m_curMark))
        {
          style = fan.codemirror.MarkStyle.m_highlightCur;
        }
        ;
      }
      ;
      $this.m_cm.mark(fan.sys.ObjUtil.coerce(m.pos(),fan.codemirror.Pos.$type),fan.sys.ObjUtil.coerce((function($this) { var $_u50 = m.endPos(); if ($_u50 != null) return $_u50; return fan.codemirror.Pos.make(m.pos().m_line,100); })($this),fan.codemirror.Pos.$type),style);
      return;
    }));
  return;
}
fan.uiDev.CodePane.prototype.selectCurMark = function()
{
  var mark = this.state().m_marks.getSafe(this.state().m_curMark);
  if ((mark == null || mark.pos() == null))
  {
    return;
  }
  ;
  this.m_cm.caret$(fan.sys.ObjUtil.coerce(mark.pos(),fan.codemirror.Pos.$type));
  return;
}
fan.uiDev.CodePane.prototype.saveCaret = function()
{
  if (this.m_cm == null)
  {
    return;
  }
  ;
  this.m_caretMemory.set(this.state().m_uri,this.m_cm.caret());
  return;
}
fan.uiDev.CodePane.prototype.restoreCaret = function()
{
  if (this.m_cm == null)
  {
    return;
  }
  ;
  var pos = this.m_caretMemory.get(this.state().m_uri);
  if (pos != null)
  {
    this.m_cm.caret$(fan.sys.ObjUtil.coerce(pos,fan.codemirror.Pos.$type));
  }
  ;
  return;
}
fan.uiDev.CodePane.prototype.cm = function()
{
  return this.m_cm;
}
fan.uiDev.CodePane.prototype.cm$ = function(it)
{
  this.m_cm = it;
  return;
}
fan.uiDev.CodePane.prototype.caretMemory = function()
{
  return this.m_caretMemory;
}
fan.uiDev.CodePane.prototype.caretMemory$ = function(it)
{
  this.m_caretMemory = it;
  return;
}
fan.uiDev.CodePane.prototype.m_cm = null;
fan.uiDev.CodePane.prototype.m_caretMemory = null;
fan.uiDev.MarksPane = fan.sys.Obj.$extend(fan.uiDev.DevPane);
fan.uiDev.MarksPane.prototype.$ctor = function()
{
  fan.uiDev.DevPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.MarksPane.prototype.$typeof = function() { return fan.uiDev.MarksPane.$type; }
fan.uiDev.MarksPane.make = function(main) {
  var self = new fan.uiDev.MarksPane();
  fan.uiDev.MarksPane.make$(self,main);
  return self;
  }
fan.uiDev.MarksPane.make$ = function(self,main)
{
  fan.uiDev.DevPane.make$(self,main);
  self.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
  self.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiDev.UiDevUtil.border()]));
  self.style().trap("backgroundColor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["white"]));
  self.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
  return;
}
fan.uiDev.MarksPane.prototype.onUpdate = function(event)
{
  if (event.m_marks)
  {
    this.showMarks();
  }
  else
  {
    if (event.m_curMark)
    {
      var list = fan.sys.ObjUtil.as(this.children().first(),fan.uiDev.ListBox.$type);
      if (list != null)
      {
        list.selected$(this.state().m_marks.getSafe(this.state().m_curMark));
      }
      ;
    }
    ;
  }
  ;
  return;
}
fan.uiDev.MarksPane.prototype.showMarks = function()
{
  var $this = this;
  var list = fan.uiDev.ListBox.make(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u43,
    function(it)
    {
      it.onElem(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u45,
        function(item)
        {
          return fan.uiDev.UiDevUtil.iconTextElem(item.icon(),item.dis());
        }),fan.sys.Type.find("|sys::Obj->dom::Elem|")));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u44,
        function(e)
        {
          fan.uiDev.CurMarkOp.make(fan.sys.ObjUtil.coerce(e.m_item,fan.uiDev.DocItem.$type),fan.sys.ObjUtil.coerce(e.m_index,fan.sys.Int.$type)).run($this.m_main);
          return;
        }));
      it.update($this.state().m_marks);
      return;
    }));
  fan.sys.ObjUtil.coerce(this.removeAll(),fan.uiDev.MarksPane.$type).add(list);
  return;
}
fan.uiDev.DocsPane = fan.sys.Obj.$extend(fan.uiDev.AbstractToolPane);
fan.uiDev.DocsPane.prototype.$ctor = function()
{
  fan.uiDev.AbstractToolPane.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.DocsPane.prototype.$typeof = function() { return fan.uiDev.DocsPane.$type; }
fan.uiDev.DocsPane.make = function(main) {
  var self = new fan.uiDev.DocsPane();
  fan.uiDev.DocsPane.make$(self,main);
  return self;
  }
fan.uiDev.DocsPane.make$ = function(self,main)
{
  var $this = self;
  fan.uiDev.AbstractToolPane.make$(self,main);
  var funcs = self.state().m_ns.funcs().findAll(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u51,
    function(f)
    {
      return f.isDoc();
    }));
  funcs.sort(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u52,
    function(a,b)
    {
      return fan.sys.ObjUtil.compare(a.$name(),b.$name());
    }));
  self.m_listBox = fan.uiDev.ListBox.make(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u43,
    function(it)
    {
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiDev.UiDevUtil.border()]));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u44,
        function(e)
        {
          main.docs(fan.sys.ObjUtil.coerce(e.m_item,fan.skyarc.FuncDef.$type).$name());
          return;
        }));
      it.onElem(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u53,
        function(f)
        {
          return fan.uiDev.UiDevUtil.iconTextElem(fan.uiDev.DevIcon.m_func,f.$name());
        }),fan.sys.Type.find("|sys::Obj->dom::Elem|")));
      it.onSearch(fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u54,
        function(f)
        {
          return f.$name();
        }),fan.sys.Type.find("|sys::Obj->sys::Str|")));
      it.m_focusable = true;
      it.update(funcs);
      return;
    }));
  self.m_docPane = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u55,
    function(it)
    {
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("border",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.uiDev.UiDevUtil.border()]));
      it.style().trap("backgroundColor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
      it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      return;
    })),fan.domkit.Box.$type);
  var sash = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.SashBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u56,
    function(it)
    {
      it.dir$(fan.domkit.Dir.m_right);
      it.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["20%","8px","80%"]));
      it.resizable$(true);
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(it.add($this.m_listBox.makeSearchCombo(null)),fan.domkit.SashBox.$type).add(fan.domkit.SashBox.div()),fan.domkit.SashBox.$type).add($this.m_docPane);
      return;
    })),fan.domkit.SashBox.$type);
  self.onUpdateDocSymbol();
  self.init(fan.domkit.Label.make(),sash);
  return;
}
fan.uiDev.DocsPane.prototype.type = function()
{
  return fan.uiDev.ToolType.m_docs;
}
fan.uiDev.DocsPane.prototype.onUpdate = function(event)
{
  if (event.m_docSymbol)
  {
    this.onUpdateDocSymbol();
  }
  ;
  return;
}
fan.uiDev.DocsPane.prototype.onUpdateDocSymbol = function()
{
  var func = this.state().m_ns.func(this.state().m_docSymbol,false);
  if (func != null)
  {
    this.onShow(func);
  }
  ;
  return;
}
fan.uiDev.DocsPane.prototype.onShow = function(f)
{
  this.m_docPane.html$(fan.uiDev.DocsPane.docToHtml(f));
  return;
}
fan.uiDev.DocsPane.docToHtml = function(f)
{
  var $this = this;
  if (f == null)
  {
    return "";
  }
  ;
  var s = fan.sys.StrBuf.make();
  var out = fan.web.WebOutStream.make(s.out());
  out.div("style='margin:10px;'");
  out.div("style='font-weight:bold; color:#070;'").w(f.$name()).w("(");
  f.expr().m_params.each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u57,
    function(p,i)
    {
      if (fan.sys.ObjUtil.compareGT(i,0))
      {
        out.w(", ");
      }
      ;
      out.w(p.m_$name);
      if (p.m_def != null)
      {
        out.w(": ").w(p.m_def);
      }
      ;
      return;
    }));
  out.w(")").divEnd();
  var fandoc = fan.fandoc.FandocParser.make().parseStr(f.doc());
  var writer = fan.fandoc.HtmlDocWriter.make(out);
  writer.onLink$(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u58,
    function(link)
    {
      link.uri$(fan.sys.Str.plus("/doc/link?",link.uri()));
      return;
    }));
  fandoc.writeChildren(writer);
  out.divEnd();
  return s.toStr();
}
fan.uiDev.DocsPane.prototype.listBox = function()
{
  return this.m_listBox;
}
fan.uiDev.DocsPane.prototype.listBox$ = function(it)
{
  this.m_listBox = it;
  return;
}
fan.uiDev.DocsPane.prototype.docPane = function()
{
  return this.m_docPane;
}
fan.uiDev.DocsPane.prototype.docPane$ = function(it)
{
  this.m_docPane = it;
  return;
}
fan.uiDev.DocsPane.prototype.m_listBox = null;
fan.uiDev.DocsPane.prototype.m_docPane = null;
fan.uiDev.Cmd = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.Cmd.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.Cmd.prototype.$typeof = function() { return fan.uiDev.Cmd.$type; }
fan.uiDev.Cmd.make = function(def) {
  var self = new fan.uiDev.Cmd();
  fan.uiDev.Cmd.make$(self,def);
  return self;
  }
fan.uiDev.Cmd.make$ = function(self,def)
{
  self.m_def = def;
  return;
}
fan.uiDev.Cmd.prototype.$name = function()
{
  return this.m_def.$name();
}
fan.uiDev.Cmd.prototype.dis = function()
{
  return fan.sys.ObjUtil.coerce(this.m_def.dis(),fan.sys.Str.$type);
}
fan.uiDev.Cmd.prototype.disToolbar = function()
{
  return this.dis();
}
fan.uiDev.Cmd.prototype.icon = function()
{
  return fan.uiDev.DevIcon.makeCommand(this.m_def);
}
fan.uiDev.Cmd.prototype.enable = function(main)
{
  return true;
}
fan.uiDev.Cmd.prototype.isCodeMirror = function()
{
  return !fan.sys.Str.isEmpty(this.cmName());
}
fan.uiDev.Cmd.prototype.cmName = function()
{
  return "";
}
fan.uiDev.Cmd.prototype.isPopup = function()
{
  return false;
}
fan.uiDev.Cmd.prototype.onPopup = function(main)
{
  throw fan.sys.UnsupportedErr.make();
}
fan.uiDev.Cmd.prototype.toStr = function()
{
  return this.dis();
}
fan.uiDev.Cmd.prototype.m_def = null;
fan.uiDev.Cmds = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.Cmds.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.Cmds.prototype.$typeof = function() { return fan.uiDev.Cmds.$type; }
fan.uiDev.Cmds.boot = function(ns) {
  var self = new fan.uiDev.Cmds();
  fan.uiDev.Cmds.boot$(self,ns);
  return self;
  }
fan.uiDev.Cmds.boot$ = function(self,ns)
{
  var $this = self;
  var acc = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("uiDev::Cmd"));
  ns.commands().each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u59,
    function(def)
    {
      if (def.isCodeMirror())
      {
        acc.add(def.$name(),fan.uiDev.CodeMirrorCmd.make(def));
      }
      ;
      return;
    }));
  fan.sys.ObjUtil.$typeof(self).pod().types().each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u60,
    function(type)
    {
      if ((!type.fits(fan.uiDev.Cmd.$type) || type.isAbstract() || fan.sys.ObjUtil.equals(type,fan.uiDev.CodeMirrorCmd.$type)))
      {
        return;
      }
      ;
      try
      {
        var $name = fan.sys.Str.decapitalize(fan.sys.Str.getRange(type.$name(),fan.sys.Range.make(0,-4)));
        var def = ns.command($name);
        var cmd = fan.sys.ObjUtil.coerce(type.make(fan.sys.List.make(fan.skyarc.CommandDef.$type.toNullable(), [def])),fan.uiDev.Cmd.$type);
        acc.add(cmd.$name(),cmd);
      }
      catch ($_u61)
      {
        $_u61 = fan.sys.Err.make($_u61);
        if ($_u61 instanceof fan.sys.Err)
        {
          var e = $_u61;
          var e;
          fan.sys.ObjUtil.echo(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("ERROR: invalid cmd: ",type),"\n  "),e));
        }
        else
        {
          throw $_u61;
        }
      }
      ;
      return;
    }));
  self.m_list = fan.sys.ObjUtil.coerce((function($this) { var $_u62 = acc.vals().sort(); if ($_u62 == null) return null; return fan.sys.ObjUtil.toImmutable($_u62); })(self),fan.sys.Type.find("uiDev::Cmd[]"));
  self.m_map = fan.sys.ObjUtil.coerce((function($this) { var $_u63 = acc; if ($_u63 == null) return null; return fan.sys.ObjUtil.toImmutable($_u63); })(self),fan.sys.Type.find("[sys::Str:uiDev::Cmd]"));
  return;
}
fan.uiDev.Cmds.prototype.get = function($name,checked)
{
  if (checked === undefined) checked = true;
  var cmd = this.m_map.get($name);
  if (cmd != null)
  {
    return cmd;
  }
  ;
  if (checked)
  {
    throw fan.sys.Err.make(fan.sys.Str.plus("Unknown cmd: ",$name));
  }
  ;
  return null;
}
fan.uiDev.Cmds.prototype.m_list = null;
fan.uiDev.Cmds.prototype.m_map = null;
fan.uiDev.CommandsCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.CommandsCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.CommandsCmd.prototype.$typeof = function() { return fan.uiDev.CommandsCmd.$type; }
fan.uiDev.CommandsCmd.make = function(def) {
  var self = new fan.uiDev.CommandsCmd();
  fan.uiDev.CommandsCmd.make$(self,def);
  return self;
  }
fan.uiDev.CommandsCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.CommandsCmd.prototype.invoke = function(main)
{
  fan.uiDev.CommandsPopup.make(main.m_view).show();
  return;
}
fan.uiDev.FindCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.FindCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FindCmd.prototype.$typeof = function() { return fan.uiDev.FindCmd.$type; }
fan.uiDev.FindCmd.make = function(def) {
  var self = new fan.uiDev.FindCmd();
  fan.uiDev.FindCmd.make$(self,def);
  return self;
  }
fan.uiDev.FindCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.FindCmd.prototype.invoke = function(main)
{
  var pattern = main.m_content.curSelectionOrWord();
  main.find(main.m_state.m_find.setPattern(pattern));
  return;
}
fan.uiDev.ToggleSidebarCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.ToggleSidebarCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.ToggleSidebarCmd.prototype.$typeof = function() { return fan.uiDev.ToggleSidebarCmd.$type; }
fan.uiDev.ToggleSidebarCmd.make = function(def) {
  var self = new fan.uiDev.ToggleSidebarCmd();
  fan.uiDev.ToggleSidebarCmd.make$(self,def);
  return self;
  }
fan.uiDev.ToggleSidebarCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.ToggleSidebarCmd.prototype.invoke = function(main)
{
  main.toggleNav();
  return;
}
fan.uiDev.HideToolsCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.HideToolsCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.HideToolsCmd.prototype.$typeof = function() { return fan.uiDev.HideToolsCmd.$type; }
fan.uiDev.HideToolsCmd.make = function(def) {
  var self = new fan.uiDev.HideToolsCmd();
  fan.uiDev.HideToolsCmd.make$(self,def);
  return self;
  }
fan.uiDev.HideToolsCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.HideToolsCmd.prototype.disToolbar = function()
{
  return "Hide";
}
fan.uiDev.HideToolsCmd.prototype.enable = function(main)
{
  return main.m_state.isShowTool();
}
fan.uiDev.HideToolsCmd.prototype.invoke = function(main)
{
  main.hideTools();
  return;
}
fan.uiDev.DocsCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.DocsCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DocsCmd.prototype.$typeof = function() { return fan.uiDev.DocsCmd.$type; }
fan.uiDev.DocsCmd.make = function(def) {
  var self = new fan.uiDev.DocsCmd();
  fan.uiDev.DocsCmd.make$(self,def);
  return self;
  }
fan.uiDev.DocsCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.DocsCmd.prototype.invoke = function(main)
{
  main.docs(main.m_content.curWord());
  return;
}
fan.uiDev.ReloadCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.ReloadCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.ReloadCmd.prototype.$typeof = function() { return fan.uiDev.ReloadCmd.$type; }
fan.uiDev.ReloadCmd.make = function(def) {
  var self = new fan.uiDev.ReloadCmd();
  fan.uiDev.ReloadCmd.make$(self,def);
  return self;
  }
fan.uiDev.ReloadCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.ReloadCmd.prototype.invoke = function(main)
{
  main.reload();
  return;
}
fan.uiDev.SaveCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.SaveCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.SaveCmd.prototype.$typeof = function() { return fan.uiDev.SaveCmd.$type; }
fan.uiDev.SaveCmd.make = function(def) {
  var self = new fan.uiDev.SaveCmd();
  fan.uiDev.SaveCmd.make$(self,def);
  return self;
  }
fan.uiDev.SaveCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.SaveCmd.prototype.enable = function(main)
{
  return main.m_state.m_dirty;
}
fan.uiDev.SaveCmd.prototype.invoke = function(main)
{
  main.save();
  return;
}
fan.uiDev.BuildCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.BuildCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.BuildCmd.prototype.$typeof = function() { return fan.uiDev.BuildCmd.$type; }
fan.uiDev.BuildCmd.make = function(def) {
  var self = new fan.uiDev.BuildCmd();
  fan.uiDev.BuildCmd.make$(self,def);
  return self;
  }
fan.uiDev.BuildCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.BuildCmd.prototype.invoke = function(main)
{
  main.build();
  return;
}
fan.uiDev.MarkPrevCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.MarkPrevCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.MarkPrevCmd.prototype.$typeof = function() { return fan.uiDev.MarkPrevCmd.$type; }
fan.uiDev.MarkPrevCmd.make = function(def) {
  var self = new fan.uiDev.MarkPrevCmd();
  fan.uiDev.MarkPrevCmd.make$(self,def);
  return self;
  }
fan.uiDev.MarkPrevCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.MarkPrevCmd.prototype.enable = function(main)
{
  return (!main.m_state.m_marks.isEmpty() && fan.sys.ObjUtil.compareGT(main.m_state.m_curMark,0));
}
fan.uiDev.MarkPrevCmd.prototype.invoke = function(main)
{
  main.prevMark();
  return;
}
fan.uiDev.MarkNextCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.MarkNextCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.MarkNextCmd.prototype.$typeof = function() { return fan.uiDev.MarkNextCmd.$type; }
fan.uiDev.MarkNextCmd.make = function(def) {
  var self = new fan.uiDev.MarkNextCmd();
  fan.uiDev.MarkNextCmd.make$(self,def);
  return self;
  }
fan.uiDev.MarkNextCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.MarkNextCmd.prototype.enable = function(main)
{
  return (!main.m_state.m_marks.isEmpty() && fan.sys.ObjUtil.compareLT(fan.sys.Int.plus(main.m_state.m_curMark,1),main.m_state.m_marks.size()));
}
fan.uiDev.MarkNextCmd.prototype.invoke = function(main)
{
  main.nextMark();
  return;
}
fan.uiDev.CodeMirrorCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.CodeMirrorCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.CodeMirrorCmd.prototype.$typeof = function() { return fan.uiDev.CodeMirrorCmd.$type; }
fan.uiDev.CodeMirrorCmd.make = function(def) {
  var self = new fan.uiDev.CodeMirrorCmd();
  fan.uiDev.CodeMirrorCmd.make$(self,def);
  return self;
  }
fan.uiDev.CodeMirrorCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.CodeMirrorCmd.prototype.invoke = function(main)
{
  return;
}
fan.uiDev.GotoCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.GotoCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.GotoCmd.prototype.$typeof = function() { return fan.uiDev.GotoCmd.$type; }
fan.uiDev.GotoCmd.make = function(def) {
  var self = new fan.uiDev.GotoCmd();
  fan.uiDev.GotoCmd.make$(self,def);
  return self;
  }
fan.uiDev.GotoCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.GotoCmd.prototype.invoke = function(main)
{
  fan.uiDev.GotoPopup.make(main,"").show();
  return;
}
fan.uiDev.GotoRecentCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.GotoRecentCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.GotoRecentCmd.prototype.$typeof = function() { return fan.uiDev.GotoRecentCmd.$type; }
fan.uiDev.GotoRecentCmd.make = function(def) {
  var self = new fan.uiDev.GotoRecentCmd();
  fan.uiDev.GotoRecentCmd.make$(self,def);
  return self;
  }
fan.uiDev.GotoRecentCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.GotoRecentCmd.prototype.invoke = function(main)
{
  fan.uiDev.GotoRecentPopup.make(main).show();
  return;
}
fan.uiDev.NewCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.NewCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.NewCmd.prototype.$typeof = function() { return fan.uiDev.NewCmd.$type; }
fan.uiDev.NewCmd.make = function(def) {
  var self = new fan.uiDev.NewCmd();
  fan.uiDev.NewCmd.make$(self,def);
  return self;
  }
fan.uiDev.NewCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.NewCmd.prototype.invoke = function(main)
{
  main.funcNew(null);
  return;
}
fan.uiDev.NewCmd.prototype.isPopup = function()
{
  return true;
}
fan.uiDev.NewCmd.prototype.onPopup = function(main)
{
  var $this = this;
  var menu = fan.ui.UiUtil.asyncMenu();
  var fut = main.session().m_api.eval("pimNewFuncs()");
  fut.onOk(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u64,
    function(g)
    {
      menu.removeAll();
      g.each(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u65,
        function(row)
        {
          var meta = fan.sys.ObjUtil.coerce(row.trap("menu",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Dict.$type);
          var proto = fan.haystack.Etc.dictRemove(row,"menu");
          menu.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
            fan.uiDev.$clos$_u66,
            function(it)
            {
              it.add(fan.ui.UiLabel.make(fan.sys.Func.make$closure(
                fan.uiDev.$clos$_u67,
                function(it)
                {
                  it.icon$(fan.ui.Icon.outline(fan.sys.ObjUtil.coerce(meta.trap("icon",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type)));
                  it.label$(meta.dis());
                  return;
                })));
              it.onAction(fan.sys.Func.make$closure(
                fan.uiDev.$clos$_u66,
                function(it)
                {
                  main.funcNew(proto);
                  return;
                }));
              return;
            })),fan.domkit.MenuItem.$type));
          return;
        }));
      return;
    }));
  fut.onErr(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u64,
    function(g)
    {
      fan.sys.ObjUtil.coerce(menu.removeAll(),fan.domkit.Menu.$type).add(fan.ui.UiUtil.errTrace(g));
      return;
    }));
  return menu;
}
fan.uiDev.EditCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.EditCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.EditCmd.prototype.$typeof = function() { return fan.uiDev.EditCmd.$type; }
fan.uiDev.EditCmd.make = function(def) {
  var self = new fan.uiDev.EditCmd();
  fan.uiDev.EditCmd.make$(self,def);
  return self;
  }
fan.uiDev.EditCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.EditCmd.prototype.enable = function(main)
{
  return main.m_state.m_doc.isRec();
}
fan.uiDev.EditCmd.prototype.invoke = function(main)
{
  main.funcEdit();
  return;
}
fan.uiDev.TrashCmd = fan.sys.Obj.$extend(fan.uiDev.Cmd);
fan.uiDev.TrashCmd.prototype.$ctor = function()
{
  fan.uiDev.Cmd.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.TrashCmd.prototype.$typeof = function() { return fan.uiDev.TrashCmd.$type; }
fan.uiDev.TrashCmd.make = function(def) {
  var self = new fan.uiDev.TrashCmd();
  fan.uiDev.TrashCmd.make$(self,def);
  return self;
  }
fan.uiDev.TrashCmd.make$ = function(self,def)
{
  fan.uiDev.Cmd.make$(self,def);
  return;
}
fan.uiDev.TrashCmd.prototype.enable = function(main)
{
  return main.m_state.m_doc.isRec();
}
fan.uiDev.TrashCmd.prototype.invoke = function(main)
{
  main.funcTrash();
  return;
}
fan.uiDev.DevState = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.DevState.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DevState.prototype.$typeof = function() { return fan.uiDev.DevState.$type; }
fan.uiDev.DevState.boot = function(ns) {
  var self = new fan.uiDev.DevState();
  fan.uiDev.DevState.boot$(self,ns);
  return self;
  }
fan.uiDev.DevState.boot$ = function(self,ns)
{
  var $this = self;
  self.m_ns = ns;
  self.m_uri = fan.uiDev.DevDocItem.m_blankUri;
  self.m_doc = fan.uiDev.BlankDoc.make();
  self.m_recent = fan.sys.ObjUtil.coerce((function($this) { var $_u68 = fan.uiDev.DocItem.m_none; if ($_u68 == null) return null; return fan.sys.ObjUtil.toImmutable($_u68); })(self),fan.sys.Type.find("uiDev::DocItem[]"));
  self.m_dirty = false;
  self.m_showNav = "funcs";
  self.m_showTool = "hide";
  self.m_marks = fan.sys.ObjUtil.coerce((function($this) { var $_u69 = fan.uiDev.DocItem.m_none; if ($_u69 == null) return null; return fan.sys.ObjUtil.toImmutable($_u69); })(self),fan.sys.Type.find("uiDev::DocItem[]"));
  self.m_cmds = fan.uiDev.Cmds.boot(ns);
  self.m_funcs = fan.uiDev.Funcs.boot();
  self.m_markers = fan.sys.ObjUtil.coerce((function($this) { var $_u70 = fan.sys.ObjUtil.coerce(fan.sys.Str.$type.emptyList(),fan.sys.Type.find("sys::Str[]")); if ($_u70 == null) return null; return fan.sys.ObjUtil.toImmutable($_u70); })(self),fan.sys.Type.find("sys::Str[]"));
  self.m_find = fan.misc.TextSearch.make(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u39,
    function(it)
    {
      it.m_pattern = "";
      return;
    }));
  self.m_docSymbol = "";
  return;
}
fan.uiDev.DevState.make = function(f) {
  var self = new fan.uiDev.DevState();
  fan.uiDev.DevState.make$(self,f);
  return self;
  }
fan.uiDev.DevState.make$ = function(self,f)
{
  f.call(self);
  return;
}
fan.uiDev.DevState.prototype.errs = function()
{
  var $this = this;
  return this.m_marks.any(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u71,
    function(m)
    {
      return m.isErr();
    }));
}
fan.uiDev.DevState.prototype.isShowNav = function()
{
  return fan.sys.ObjUtil.compareNE(this.m_showNav,"hide");
}
fan.uiDev.DevState.prototype.isShowTool = function()
{
  return fan.sys.ObjUtil.compareNE(this.m_showTool,"hide");
}
fan.uiDev.DevState.prototype.get = function($name)
{
  return fan.sys.ObjUtil.$typeof(this).field($name).get(this);
}
fan.uiDev.DevState.prototype.update = function(changes)
{
  var $this = this;
  changes = changes.findAll(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u72,
    function(v,n)
    {
      return fan.sys.ObjUtil.compareNE($this.get(n),v);
    }));
  if (changes.isEmpty())
  {
    return this;
  }
  ;
  if ((fan.sys.ObjUtil.equals(changes.get("uri"),fan.uiDev.DevDocItem.m_blankUri) && changes.get("doc") == null))
  {
    changes.set("doc",fan.uiDev.BlankDoc.make());
  }
  ;
  this.checkRecent(changes);
  var sets = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Field"),fan.sys.Type.find("sys::Obj?"));
  this.eachField(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u73,
    function(f,v)
    {
      if (changes.containsKey(f.$name()))
      {
        v = changes.get(f.$name());
      }
      ;
      sets.set(f,v);
      return;
    }));
  var newState = fan.uiDev.DevState.make(fan.sys.Field.makeSetFunc(sets));
  if (changes.get("uri") != null)
  {
    newState.checkUri();
  }
  ;
  if (changes.get("doc") != null)
  {
    newState.checkUri();
  }
  ;
  return newState;
}
fan.uiDev.DevState.prototype.checkRecent = function(changes)
{
  var $this = this;
  var oldDoc = this.m_doc;
  var newDoc = fan.sys.ObjUtil.as(changes.get("doc"),fan.uiDev.Document.$type);
  if (newDoc == null)
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.equals(oldDoc.uri(),newDoc.uri()))
  {
    return;
  }
  ;
  if ((oldDoc.isBlank() || oldDoc.isNotFound()))
  {
    return;
  }
  ;
  var recent = this.m_recent.dup();
  var oldIndex = recent.findIndex(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u74,
    function(item)
    {
      return fan.sys.ObjUtil.equals(item.uri(),oldDoc.uri());
    }));
  if (oldIndex != null)
  {
    recent.removeAt(fan.sys.ObjUtil.coerce(oldIndex,fan.sys.Int.$type));
  }
  ;
  recent.insert(0,fan.uiDev.DocRef.makeDoc(oldDoc));
  if (fan.sys.ObjUtil.compareGT(recent.size(),10))
  {
    recent = recent.getRange(fan.sys.Range.make(0,10,true));
  }
  ;
  changes.set("recent",fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.toImmutable(recent),fan.sys.Type.find("uiDev::DocItem[]")));
  return;
}
fan.uiDev.DevState.prototype.checkUri = function()
{
  if (fan.sys.ObjUtil.compareNE(this.m_uri,this.m_doc.uri()))
  {
    throw fan.sys.Err.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("uri != doc.uri [",this.m_uri),", "),this.m_doc.uri()),"]"));
  }
  ;
  return;
}
fan.uiDev.DevState.warn = function(msg)
{
  fan.sys.ObjUtil.echo(fan.sys.Str.plus("WARN: ",msg));
  return;
}
fan.uiDev.DevState.prototype.toStr = function()
{
  var $this = this;
  var s = fan.sys.StrBuf.make();
  this.eachField(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u75,
    function(field,val)
    {
      if ((val == null || fan.sys.ObjUtil.equals(val,false)))
      {
        return;
      }
      ;
      s.join(field.$name(),", ").add(":").add(fan.uiDev.DevState.valToStr(val));
      return;
    }));
  return s.toStr();
}
fan.uiDev.DevState.valToStr = function(val)
{
  if (fan.sys.ObjUtil.is(val,fan.haystack.Dict.$type))
  {
    return "{...}";
  }
  ;
  var str = fan.sys.ObjUtil.toStr(val);
  if (fan.sys.ObjUtil.compareGT(fan.sys.Str.size(str),20))
  {
    str = fan.sys.Str.plus(fan.sys.Str.getRange(str,fan.sys.Range.make(0,19)),"...");
  }
  ;
  return str;
}
fan.uiDev.DevState.prototype.eachField = function(f)
{
  var $this = this;
  fan.sys.ObjUtil.$typeof(this).fields().each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u76,
    function(field)
    {
      if (field.isStatic())
      {
        return;
      }
      ;
      f.call(field,field.get($this));
      return;
    }));
  return;
}
fan.uiDev.DevState.prototype.m_ns = null;
fan.uiDev.DevState.prototype.m_uri = null;
fan.uiDev.DevState.prototype.m_doc = null;
fan.uiDev.DevState.prototype.m_recent = null;
fan.uiDev.DevState.prototype.m_dirty = false;
fan.uiDev.DevState.prototype.m_marks = null;
fan.uiDev.DevState.prototype.m_curMark = 0;
fan.uiDev.DevState.prototype.m_cmds = null;
fan.uiDev.DevState.prototype.m_funcs = null;
fan.uiDev.DevState.prototype.m_markers = null;
fan.uiDev.DevState.prototype.m_showNav = null;
fan.uiDev.DevState.prototype.m_showTool = null;
fan.uiDev.DevState.prototype.m_find = null;
fan.uiDev.DevState.prototype.m_docSymbol = null;
fan.uiDev.DevStateEvent = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.DevStateEvent.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DevStateEvent.prototype.$typeof = function() { return fan.uiDev.DevStateEvent.$type; }
fan.uiDev.DevStateEvent.make = function(a,b) {
  var self = new fan.uiDev.DevStateEvent();
  fan.uiDev.DevStateEvent.make$(self,a,b);
  return self;
  }
fan.uiDev.DevStateEvent.make$ = function(self,a,b)
{
  self.m_content = (fan.sys.ObjUtil.compareNE(a.m_uri,b.m_uri) || a.m_doc !== b.m_doc);
  self.m_funcs = (fan.sys.ObjUtil.compareNE(a.m_funcs,b.m_funcs) || fan.sys.ObjUtil.compareNE(a.m_markers,b.m_markers));
  self.m_showNav = fan.sys.ObjUtil.compareNE(a.m_showNav,b.m_showNav);
  self.m_showTool = fan.sys.ObjUtil.compareNE(a.m_showTool,b.m_showTool);
  self.m_find = fan.sys.ObjUtil.compareNE(a.m_find,b.m_find);
  self.m_docSymbol = fan.sys.ObjUtil.compareNE(a.m_docSymbol,b.m_docSymbol);
  self.m_marks = a.m_marks !== b.m_marks;
  self.m_curMark = fan.sys.ObjUtil.compareNE(a.m_curMark,b.m_curMark);
  return;
}
fan.uiDev.DevStateEvent.prototype.toStr = function()
{
  var $this = this;
  var s = fan.sys.StrBuf.make();
  fan.sys.ObjUtil.$typeof(this).fields().each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u77,
    function(f)
    {
      if (fan.sys.ObjUtil.equals(f.get($this),true))
      {
        s.join(f.$name(),",");
      }
      ;
      return;
    }));
  return fan.sys.Str.plus(fan.sys.Str.plus("DevStateEvent { ",s)," }");
}
fan.uiDev.DevStateEvent.prototype.m_content = false;
fan.uiDev.DevStateEvent.prototype.m_funcs = false;
fan.uiDev.DevStateEvent.prototype.m_showNav = false;
fan.uiDev.DevStateEvent.prototype.m_showTool = false;
fan.uiDev.DevStateEvent.prototype.m_find = false;
fan.uiDev.DevStateEvent.prototype.m_docSymbol = false;
fan.uiDev.DevStateEvent.prototype.m_marks = false;
fan.uiDev.DevStateEvent.prototype.m_curMark = false;
fan.uiDev.DevOp = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.DevOp.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DevOp.prototype.$typeof = function() { return fan.uiDev.DevOp.$type; }
fan.uiDev.DevOp.prototype.main = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u78 = $this.m_mainRef; if ($_u78 != null) return $_u78; throw fan.sys.Err.make("Not running"); })(this),fan.uiDev.DevMain.$type);
}
fan.uiDev.DevOp.prototype.state = function()
{
  return this.main().m_state;
}
fan.uiDev.DevOp.prototype.run = function(main)
{
  var $this = this;
  this.m_mainRef = main;
  if ((this.confirmSave() && this.state().m_dirty))
  {
    this.showConfirmSave(fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u79,
      function()
      {
        $this.onRun();
        return;
      }));
  }
  else
  {
    this.onRun();
  }
  ;
  return;
}
fan.uiDev.DevOp.prototype.update = function(changes)
{
  var oldState = this.main().m_state;
  var newState = oldState.update(changes);
  if (newState === oldState)
  {
    return;
  }
  ;
  this.main().onUpdate(newState);
  return;
}
fan.uiDev.DevOp.prototype.eval = function(expr,onOk)
{
  this.main().eval(expr,onOk);
  return;
}
fan.uiDev.DevOp.prototype.fetchToChanges = function(changes,data)
{
  changes.addNotNull("doc",fan.uiDev.Document.load(data));
  changes.addNotNull("funcs",fan.uiDev.Funcs.load(data));
  return;
}
fan.uiDev.DevOp.prototype.confirmSave = function()
{
  return false;
}
fan.uiDev.DevOp.prototype.showConfirmSave = function(onDone)
{
  var $this = this;
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.ui.AlertDialog.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u80,
    function(it)
    {
      it.icon$(fan.ui.Icon.outline("warn",fan.ui.Colors.m_yellow));
      it.msg$(fan.sys.Str.plus(fan.sys.Str.plus("Save changes to \"",$this.state().m_doc.$name()),"\"?"));
      it.info$("Your changes will be lost if not saved");
      it.addButton("save",null,true);
      it.addButton("discard",null);
      it.addButton("cancel",null);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u81,
        function(key)
        {
          var $_u82 = key;
          if (fan.sys.ObjUtil.equals($_u82,"save"))
          {
            $this.main().save(fan.sys.Func.make$closure(
              fan.uiDev.$clos$_u79,
              function()
              {
                onDone.call();
                return;
              }));
          }
          else if (fan.sys.ObjUtil.equals($_u82,"discard"))
          {
            $this.main().clearDirty();
            onDone.call();
          }
          else if (fan.sys.ObjUtil.equals($_u82,"cancel"))
          {
            $this.main().m_nav.updateSelected();
          }
          ;
          return true;
        }));
      return;
    })),fan.ui.AlertDialog.$type).open();
  return;
}
fan.uiDev.DevOp.prototype.mainRef = function()
{
  return this.m_mainRef;
}
fan.uiDev.DevOp.prototype.mainRef$ = function(it)
{
  this.m_mainRef = it;
  return;
}
fan.uiDev.DevOp.make = function() {
  var self = new fan.uiDev.DevOp();
  fan.uiDev.DevOp.make$(self);
  return self;
  }
fan.uiDev.DevOp.make$ = function(self)
{
  return;
}
fan.uiDev.DevOp.prototype.m_mainRef = null;
fan.uiDev.FetchOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.FetchOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
  this.m_changes = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  return;
}
fan.uiDev.FetchOp.prototype.$typeof = function() { return fan.uiDev.FetchOp.$type; }
fan.uiDev.FetchOp.prototype.fetch = function()
{
  var $this = this;
  var reqAxon = fan.haystack.Etc.toAxon(this.req());
  this.eval(fan.sys.Str.plus(fan.sys.Str.plus("devFetch(",reqAxon),")"),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u83,
    function(res)
    {
      $this.m_data = res.get(0);
      $this.onFetch();
      $this.update($this.m_changes);
      return;
    }));
  return;
}
fan.uiDev.FetchOp.prototype.onFetch = function()
{
  this.fetchToChanges(this.m_changes,fan.sys.ObjUtil.coerce(this.m_data,fan.haystack.Dict.$type));
  return;
}
fan.uiDev.FetchOp.prototype.changes = function()
{
  return this.m_changes;
}
fan.uiDev.FetchOp.prototype.changes$ = function(it)
{
  this.m_changes = it;
  return;
}
fan.uiDev.FetchOp.prototype.data = function()
{
  return this.m_data;
}
fan.uiDev.FetchOp.prototype.data$ = function(it)
{
  this.m_data = it;
  return;
}
fan.uiDev.FetchOp.make = function() {
  var self = new fan.uiDev.FetchOp();
  fan.uiDev.FetchOp.make$(self);
  return self;
  }
fan.uiDev.FetchOp.make$ = function(self)
{
  fan.uiDev.DevOp.make$(self);
  ;
  return;
}
fan.uiDev.FetchOp.prototype.m_changes = null;
fan.uiDev.FetchOp.prototype.m_data = null;
fan.uiDev.InitOp = fan.sys.Obj.$extend(fan.uiDev.FetchOp);
fan.uiDev.InitOp.prototype.$ctor = function()
{
  fan.uiDev.FetchOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.InitOp.prototype.$typeof = function() { return fan.uiDev.InitOp.$type; }
fan.uiDev.InitOp.make = function(vars) {
  var self = new fan.uiDev.InitOp();
  fan.uiDev.InitOp.make$(self,vars);
  return self;
  }
fan.uiDev.InitOp.make$ = function(self,vars)
{
  fan.uiDev.FetchOp.make$(self);
  self.m_vars = vars;
  self.m_uri = fan.sys.ObjUtil.coerce((function($this) { var $_u84 = fan.sys.ObjUtil.as(vars.get("uri"),fan.sys.Uri.$type); if ($_u84 != null) return $_u84; return fan.uiDev.DevDocItem.m_blankUri; })(self),fan.sys.Uri.$type);
  self.m_markers = fan.sys.ObjUtil.coerce((function($this) { var $_u85 = fan.sys.ObjUtil.as(vars.get("markers"),fan.sys.Type.find("sys::Str[]")); if ($_u85 != null) return $_u85; return fan.sys.Str.$type.emptyList(); })(self),fan.sys.Type.find("sys::Str[]"));
  self.m_showNav = fan.sys.ObjUtil.coerce((function($this) { var $_u86 = fan.sys.ObjUtil.as(vars.get("showNav"),fan.sys.Str.$type); if ($_u86 != null) return $_u86; return "funcs"; })(self),fan.sys.Str.$type);
  self.m_showTool = fan.sys.ObjUtil.coerce((function($this) { var $_u87 = fan.sys.ObjUtil.as(vars.get("showTool"),fan.sys.Str.$type); if ($_u87 != null) return $_u87; return "hide"; })(self),fan.sys.Str.$type);
  return;
}
fan.uiDev.InitOp.prototype.req = function()
{
  return fan.haystack.Etc.makeDict(fan.sys.Map.fromLiteral(["uri","general","shortcuts","funcs"],[this.m_uri,fan.haystack.Marker.m_val,fan.haystack.Marker.m_val,fan.haystack.Marker.m_val],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
}
fan.uiDev.InitOp.prototype.onRun = function()
{
  this.fetch();
  return;
}
fan.uiDev.InitOp.prototype.onFetch = function()
{
  this.m_changes.set("uri",this.m_uri);
  this.m_changes.set("markers",this.m_markers);
  this.m_changes.set("showNav",this.m_showNav);
  this.m_changes.set("showTool",this.m_showTool);
  fan.uiDev.FetchOp.prototype.onFetch.call(this);
  return;
}
fan.uiDev.InitOp.prototype.vars = function()
{
  return this.m_vars;
}
fan.uiDev.InitOp.prototype.vars$ = function(it)
{
  this.m_vars = it;
  return;
}
fan.uiDev.InitOp.prototype.uri = function()
{
  return this.m_uri;
}
fan.uiDev.InitOp.prototype.uri$ = function(it)
{
  this.m_uri = it;
  return;
}
fan.uiDev.InitOp.prototype.markers = function()
{
  return this.m_markers;
}
fan.uiDev.InitOp.prototype.markers$ = function(it)
{
  this.m_markers = it;
  return;
}
fan.uiDev.InitOp.prototype.showNav = function()
{
  return this.m_showNav;
}
fan.uiDev.InitOp.prototype.showNav$ = function(it)
{
  this.m_showNav = it;
  return;
}
fan.uiDev.InitOp.prototype.showTool = function()
{
  return this.m_showTool;
}
fan.uiDev.InitOp.prototype.showTool$ = function(it)
{
  this.m_showTool = it;
  return;
}
fan.uiDev.InitOp.prototype.m_vars = null;
fan.uiDev.InitOp.prototype.m_uri = null;
fan.uiDev.InitOp.prototype.m_markers = null;
fan.uiDev.InitOp.prototype.m_showNav = null;
fan.uiDev.InitOp.prototype.m_showTool = null;
fan.uiDev.UnloadOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.UnloadOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.UnloadOp.prototype.$typeof = function() { return fan.uiDev.UnloadOp.$type; }
fan.uiDev.UnloadOp.make = function(cb) {
  var self = new fan.uiDev.UnloadOp();
  fan.uiDev.UnloadOp.make$(self,cb);
  return self;
  }
fan.uiDev.UnloadOp.make$ = function(self,cb)
{
  fan.uiDev.DevOp.make$(self);
  self.m_cb = cb;
  return;
}
fan.uiDev.UnloadOp.prototype.confirmSave = function()
{
  return true;
}
fan.uiDev.UnloadOp.prototype.onRun = function()
{
  this.m_cb.call();
  return;
}
fan.uiDev.UnloadOp.prototype.cb = function()
{
  return this.m_cb;
}
fan.uiDev.UnloadOp.prototype.cb$ = function(it)
{
  this.m_cb = it;
  return;
}
fan.uiDev.UnloadOp.prototype.m_cb = null;
fan.uiDev.UpdateOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.UpdateOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.UpdateOp.prototype.$typeof = function() { return fan.uiDev.UpdateOp.$type; }
fan.uiDev.UpdateOp.setDirty = function() {
  var self = new fan.uiDev.UpdateOp();
  fan.uiDev.UpdateOp.setDirty$(self);
  return self;
  }
fan.uiDev.UpdateOp.setDirty$ = function(self)
{
  fan.uiDev.DevOp.make$(self);
  self.m_changes = fan.sys.Map.fromLiteral(["dirty","marks"],[fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type),fan.uiDev.DocItem.m_none],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
  return;
}
fan.uiDev.UpdateOp.clearDirty = function() {
  var self = new fan.uiDev.UpdateOp();
  fan.uiDev.UpdateOp.clearDirty$(self);
  return self;
  }
fan.uiDev.UpdateOp.clearDirty$ = function(self)
{
  fan.uiDev.DevOp.make$(self);
  self.m_changes = fan.sys.Map.fromLiteral(["dirty"],[fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable())],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Bool"));
  return;
}
fan.uiDev.UpdateOp.marks = function(marks) {
  var self = new fan.uiDev.UpdateOp();
  fan.uiDev.UpdateOp.marks$(self,marks);
  return self;
  }
fan.uiDev.UpdateOp.marks$ = function(self,marks)
{
  fan.uiDev.DevOp.make$(self);
  self.m_changes = fan.sys.Map.fromLiteral(["curMark","marks"],[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.toImmutable(marks),fan.sys.Type.find("uiDev::DocItem[]"))],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj"));
  return;
}
fan.uiDev.UpdateOp.showNav = function(showNav) {
  var self = new fan.uiDev.UpdateOp();
  fan.uiDev.UpdateOp.showNav$(self,showNav);
  return self;
  }
fan.uiDev.UpdateOp.showNav$ = function(self,showNav)
{
  fan.uiDev.DevOp.make$(self);
  self.m_changes = fan.sys.Map.fromLiteral(["showNav"],[showNav],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  return;
}
fan.uiDev.UpdateOp.prototype.onRun = function()
{
  this.update(this.m_changes);
  return;
}
fan.uiDev.UpdateOp.prototype.changes = function()
{
  return this.m_changes;
}
fan.uiDev.UpdateOp.prototype.changes$ = function(it)
{
  this.m_changes = it;
  return;
}
fan.uiDev.UpdateOp.prototype.m_changes = null;
fan.uiDev.GotoOp = fan.sys.Obj.$extend(fan.uiDev.FetchOp);
fan.uiDev.GotoOp.prototype.$ctor = function()
{
  fan.uiDev.FetchOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.GotoOp.prototype.$typeof = function() { return fan.uiDev.GotoOp.$type; }
fan.uiDev.GotoOp.make = function(item,opts) {
  var self = new fan.uiDev.GotoOp();
  fan.uiDev.GotoOp.make$(self,item,opts);
  return self;
  }
fan.uiDev.GotoOp.make$ = function(self,item,opts)
{
  if (opts === undefined) opts = null;
  fan.uiDev.FetchOp.make$(self);
  self.m_item = item;
  self.m_opts = fan.haystack.Etc.makeDict(opts);
  return;
}
fan.uiDev.GotoOp.prototype.isNewUri = function()
{
  return (fan.sys.ObjUtil.compareNE(this.m_item.uri(),this.state().m_uri) || this.m_opts.has("reload"));
}
fan.uiDev.GotoOp.prototype.confirmSave = function()
{
  return this.isNewUri();
}
fan.uiDev.GotoOp.prototype.req = function()
{
  return fan.haystack.Etc.dictSet(this.m_opts,"uri",this.m_item.uri());
}
fan.uiDev.GotoOp.prototype.onRun = function()
{
  if (this.isNewUri())
  {
    this.m_changes.set("uri",this.m_item.uri());
    this.fetch();
  }
  else
  {
    this.update(this.m_changes);
  }
  ;
  this.main().m_content.onGoto(this.m_item);
  return;
}
fan.uiDev.GotoOp.prototype.item = function()
{
  return this.m_item;
}
fan.uiDev.GotoOp.prototype.item$ = function(it)
{
  this.m_item = it;
  return;
}
fan.uiDev.GotoOp.prototype.opts = function()
{
  return this.m_opts;
}
fan.uiDev.GotoOp.prototype.opts$ = function(it)
{
  this.m_opts = it;
  return;
}
fan.uiDev.GotoOp.static$init = function()
{
  fan.uiDev.GotoOp.m_reload = fan.haystack.Etc.makeDict1("reload",fan.haystack.Marker.m_val);
  fan.uiDev.GotoOp.m_refreshNav = fan.haystack.Etc.makeDict1("funcs",fan.haystack.Marker.m_val);
  fan.uiDev.GotoOp.m_reloadAndRefreshNav = fan.haystack.Etc.makeDict2("reload",fan.haystack.Marker.m_val,"funcs",fan.haystack.Marker.m_val);
  return;
}
fan.uiDev.GotoOp.m_reload = null;
fan.uiDev.GotoOp.m_refreshNav = null;
fan.uiDev.GotoOp.m_reloadAndRefreshNav = null;
fan.uiDev.GotoOp.prototype.m_item = null;
fan.uiDev.GotoOp.prototype.m_opts = null;
fan.uiDev.CurMarkOp = fan.sys.Obj.$extend(fan.uiDev.GotoOp);
fan.uiDev.CurMarkOp.prototype.$ctor = function()
{
  fan.uiDev.GotoOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.CurMarkOp.prototype.$typeof = function() { return fan.uiDev.CurMarkOp.$type; }
fan.uiDev.CurMarkOp.prev = function(state)
{
  if (state.m_marks.isEmpty())
  {
    return null;
  }
  ;
  var newCurMark = fan.sys.Int.max(fan.sys.Int.decrement(state.m_curMark),0);
  return fan.uiDev.CurMarkOp.make(state.m_marks.get(newCurMark),newCurMark);
}
fan.uiDev.CurMarkOp.next = function(state)
{
  if (state.m_marks.isEmpty())
  {
    return null;
  }
  ;
  var newCurMark = fan.sys.Int.min(fan.sys.Int.increment(state.m_curMark),fan.sys.Int.minus(state.m_marks.size(),1));
  return fan.uiDev.CurMarkOp.make(state.m_marks.get(newCurMark),newCurMark);
}
fan.uiDev.CurMarkOp.make = function(item,curMark) {
  var self = new fan.uiDev.CurMarkOp();
  fan.uiDev.CurMarkOp.make$(self,item,curMark);
  return self;
  }
fan.uiDev.CurMarkOp.make$ = function(self,item,curMark)
{
  fan.uiDev.GotoOp.make$(self,item);
  self.m_curMark = curMark;
  return;
}
fan.uiDev.CurMarkOp.prototype.onRun = function()
{
  this.m_changes.set("curMark",fan.sys.ObjUtil.coerce(this.m_curMark,fan.sys.Obj.$type.toNullable()));
  fan.uiDev.GotoOp.prototype.onRun.call(this);
  return;
}
fan.uiDev.CurMarkOp.prototype.m_curMark = 0;
fan.uiDev.FuncNewOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.FuncNewOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FuncNewOp.prototype.$typeof = function() { return fan.uiDev.FuncNewOp.$type; }
fan.uiDev.FuncNewOp.make = function(proto) {
  var self = new fan.uiDev.FuncNewOp();
  fan.uiDev.FuncNewOp.make$(self,proto);
  return self;
  }
fan.uiDev.FuncNewOp.make$ = function(self,proto)
{
  fan.uiDev.DevOp.make$(self);
  self.m_proto = proto;
  return;
}
fan.uiDev.FuncNewOp.prototype.confirmSave = function()
{
  return true;
}
fan.uiDev.FuncNewOp.prototype.onRun = function()
{
  var $this = this;
  var action = this.main().action("recNew",fan.sys.Map.fromLiteral(["actionNew"],[fan.haystack.Marker.m_val],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Marker")),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u83,
    function(res)
    {
      $this.main().clearDirty();
      var newRec = res.first();
      if ((newRec == null || newRec.missing("id")))
      {
        return;
      }
      ;
      $this.main().goto(fan.uiDev.RecDoc.make(fan.sys.ObjUtil.coerce(newRec,fan.haystack.Dict.$type)),fan.uiDev.GotoOp.m_refreshNav);
      return;
    }));
  if (this.m_proto == null)
  {
    action.invoke();
  }
  else
  {
    action.openPimForm(fan.sys.ObjUtil.coerce(this.m_proto,fan.haystack.Dict.$type));
  }
  ;
  return;
}
fan.uiDev.FuncNewOp.prototype.m_proto = null;
fan.uiDev.FuncEditOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.FuncEditOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FuncEditOp.prototype.$typeof = function() { return fan.uiDev.FuncEditOp.$type; }
fan.uiDev.FuncEditOp.prototype.confirmSave = function()
{
  return true;
}
fan.uiDev.FuncEditOp.prototype.onRun = function()
{
  var $this = this;
  this.main().invokeAction("recEdit",fan.sys.Map.fromLiteral(["select"],[fan.haystack.Marker.m_val],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Marker")),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u83,
    function(res)
    {
      $this.main().goto($this.state().m_doc,fan.uiDev.GotoOp.m_reloadAndRefreshNav);
      return;
    }));
  return;
}
fan.uiDev.FuncEditOp.make = function() {
  var self = new fan.uiDev.FuncEditOp();
  fan.uiDev.FuncEditOp.make$(self);
  return self;
  }
fan.uiDev.FuncEditOp.make$ = function(self)
{
  fan.uiDev.DevOp.make$(self);
  return;
}
fan.uiDev.FuncTrashOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.FuncTrashOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FuncTrashOp.prototype.$typeof = function() { return fan.uiDev.FuncTrashOp.$type; }
fan.uiDev.FuncTrashOp.prototype.onRun = function()
{
  var $this = this;
  this.main().invokeAction("recTrash",fan.sys.Map.fromLiteral(["select"],[fan.haystack.Marker.m_val],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("haystack::Marker")),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u83,
    function(res)
    {
      $this.main().clearDirty();
      $this.main().goto(fan.uiDev.DevDocItem.makeBlank(),fan.uiDev.GotoOp.m_refreshNav);
      return;
    }));
  return;
}
fan.uiDev.FuncTrashOp.make = function() {
  var self = new fan.uiDev.FuncTrashOp();
  fan.uiDev.FuncTrashOp.make$(self);
  return self;
  }
fan.uiDev.FuncTrashOp.make$ = function(self)
{
  fan.uiDev.DevOp.make$(self);
  return;
}
fan.uiDev.FuncCheckOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.FuncCheckOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FuncCheckOp.prototype.$typeof = function() { return fan.uiDev.FuncCheckOp.$type; }
fan.uiDev.FuncCheckOp.make = function(flashOk) {
  var self = new fan.uiDev.FuncCheckOp();
  fan.uiDev.FuncCheckOp.make$(self,flashOk);
  return self;
  }
fan.uiDev.FuncCheckOp.make$ = function(self,flashOk)
{
  fan.uiDev.DevOp.make$(self);
  self.m_flashOk = flashOk;
  return;
}
fan.uiDev.FuncCheckOp.prototype.onRun = function()
{
  if (!this.state().m_doc.isRec())
  {
    return;
  }
  ;
  var src = this.main().m_content.curText();
  try
  {
    var $name = (function($this) { var $_u88 = $this.state().m_doc.rec().get("name"); if ($_u88 != null) return $_u88; return "check"; })(this);
    fan.axon.Parser.make(fan.axon.Loc.make(fan.sys.ObjUtil.coerce($name,fan.sys.Str.$type)),fan.sys.Str.$in(src)).parseTop(fan.sys.ObjUtil.coerce($name,fan.sys.Str.$type));
    this.buildOk();
  }
  catch ($_u89)
  {
    $_u89 = fan.sys.Err.make($_u89);
    if ($_u89 instanceof fan.axon.AxonErr)
    {
      var e = $_u89;
      var e;
      this.buildErr(e.msg(),fan.codemirror.Pos.make(fan.sys.Int.minus(e.m_loc.m_line,1),0));
    }
    else if ($_u89 instanceof fan.sys.Err)
    {
      var e = $_u89;
      var e;
      this.buildErr(fan.sys.Str.plus("Internal error: ",e),fan.codemirror.Pos.make(0,0));
    }
    else
    {
      throw $_u89;
    }
  }
  ;
  return;
}
fan.uiDev.FuncCheckOp.prototype.buildOk = function()
{
  this.main().clearMarks();
  if (this.m_flashOk)
  {
    this.main().m_status.flash(fan.uiDev.DevIcon.m_ok,"Build ok");
  }
  ;
  return;
}
fan.uiDev.FuncCheckOp.prototype.buildErr = function(msg,pos)
{
  this.main().setMarks(fan.sys.List.make(fan.uiDev.DocErrPos.$type, [fan.uiDev.DocErrPos.make(this.state().m_doc,pos,msg)]));
  this.main().m_status.show(fan.uiDev.DevIcon.m_warn,fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(msg," (Line "),fan.sys.ObjUtil.coerce(fan.sys.Int.plus(pos.m_line,1),fan.sys.Obj.$type.toNullable())),")"));
  return;
}
fan.uiDev.FuncCheckOp.prototype.m_flashOk = false;
fan.uiDev.SaveOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.SaveOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.SaveOp.prototype.$typeof = function() { return fan.uiDev.SaveOp.$type; }
fan.uiDev.SaveOp.make = function(onDone) {
  var self = new fan.uiDev.SaveOp();
  fan.uiDev.SaveOp.make$(self,onDone);
  return self;
  }
fan.uiDev.SaveOp.make$ = function(self,onDone)
{
  fan.uiDev.DevOp.make$(self);
  self.m_onDone = onDone;
  return;
}
fan.uiDev.SaveOp.prototype.onRun = function()
{
  var $this = this;
  if (this.state().m_doc.isRec())
  {
    if (!this.state().errs())
    {
      this.main().funcCheck(false);
      if (this.state().errs())
      {
        return;
      }
      ;
    }
    ;
  }
  ;
  var uri = this.state().m_doc.uri();
  var text = this.main().m_content.curText();
  this.eval(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("devSave(",uri.toCode()),", "),fan.sys.Str.toCode(text)),")"),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u83,
    function(res)
    {
      var data = res.get(0);
      var changes = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
      changes.set("dirty",fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
      $this.fetchToChanges(changes,data);
      $this.update(changes);
      if ($this.m_onDone != null)
      {
        $this.m_onDone.call();
      }
      ;
      $this.main().m_content.refocus();
      $this.main().m_status.flash(fan.uiDev.DevIcon.m_ok,"Saved");
      return;
    }));
  return;
}
fan.uiDev.SaveOp.prototype.onDone = function()
{
  return this.m_onDone;
}
fan.uiDev.SaveOp.prototype.onDone$ = function(it)
{
  this.m_onDone = it;
  return;
}
fan.uiDev.SaveOp.prototype.m_onDone = null;
fan.uiDev.FindOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.FindOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FindOp.prototype.$typeof = function() { return fan.uiDev.FindOp.$type; }
fan.uiDev.FindOp.make = function(find) {
  var self = new fan.uiDev.FindOp();
  fan.uiDev.FindOp.make$(self,find);
  return self;
  }
fan.uiDev.FindOp.make$ = function(self,find)
{
  fan.uiDev.DevOp.make$(self);
  self.m_find = find;
  return;
}
fan.uiDev.FindOp.prototype.onRun = function()
{
  var $this = this;
  var doc = this.state().m_doc;
  var marks = fan.sys.List.make(fan.uiDev.DocItem.$type);
  fan.sys.Str.splitLines(this.main().m_content.curText()).each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u90,
    function(line,lineNum)
    {
      $this.m_find.matchEach(line,fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u91,
        function(range)
        {
          marks.add(fan.uiDev.DocMark.make(doc,fan.codemirror.Pos.make(lineNum,range.start()),fan.codemirror.Pos.make(lineNum,range.end()),line));
          return;
        }));
      return;
    }));
  this.findDone(marks);
  return;
}
fan.uiDev.FindOp.prototype.findDone = function(marks)
{
  this.update(fan.sys.Map.fromLiteral(["showTool","find","curMark","marks"],["find",this.m_find,fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.toImmutable(marks),fan.sys.Type.find("uiDev::DocItem[]"))],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
  this.main().m_tool.refocus();
  return;
}
fan.uiDev.FindOp.prototype.m_find = null;
fan.uiDev.FindInFuncsOp = fan.sys.Obj.$extend(fan.uiDev.FindOp);
fan.uiDev.FindInFuncsOp.prototype.$ctor = function()
{
  fan.uiDev.FindOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.FindInFuncsOp.prototype.$typeof = function() { return fan.uiDev.FindInFuncsOp.$type; }
fan.uiDev.FindInFuncsOp.make = function(find) {
  var self = new fan.uiDev.FindInFuncsOp();
  fan.uiDev.FindInFuncsOp.make$(self,find);
  return self;
  }
fan.uiDev.FindInFuncsOp.make$ = function(self,find)
{
  fan.uiDev.FindOp.make$(self,find);
  return;
}
fan.uiDev.FindInFuncsOp.prototype.onRun = function()
{
  var $this = this;
  var findArg = fan.haystack.Etc.toAxon(this.m_find.encode());
  this.eval(fan.sys.Str.plus(fan.sys.Str.plus("devFindInFuncs(",findArg),")"),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u83,
    function(res)
    {
      var marks = res.mapToList(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u20,
        function(row)
        {
          var item = fan.uiDev.DocRef.makeDict(row);
          var lineNum = fan.sys.ObjUtil.coerce(row.trap("lineNum",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Number.$type).toInt();
          var startCol = fan.sys.ObjUtil.coerce(row.trap("startCol",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Number.$type).toInt();
          var endCol = fan.sys.ObjUtil.coerce(row.trap("endCol",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Number.$type).toInt();
          var lineText = row.trap("lineText",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
          return fan.uiDev.DocMark.make(item,fan.codemirror.Pos.make(lineNum,startCol),fan.codemirror.Pos.make(lineNum,endCol),fan.sys.ObjUtil.coerce(lineText,fan.sys.Str.$type.toNullable()));
        }));
      $this.findDone(fan.sys.ObjUtil.coerce(marks,fan.sys.Type.find("uiDev::DocItem[]")));
      return;
    }));
  return;
}
fan.uiDev.DocsOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.DocsOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DocsOp.prototype.$typeof = function() { return fan.uiDev.DocsOp.$type; }
fan.uiDev.DocsOp.make = function(word) {
  var self = new fan.uiDev.DocsOp();
  fan.uiDev.DocsOp.make$(self,word);
  return self;
  }
fan.uiDev.DocsOp.make$ = function(self,word)
{
  fan.uiDev.DevOp.make$(self);
  self.m_word = word;
  return;
}
fan.uiDev.DocsOp.prototype.onRun = function()
{
  this.update(fan.sys.Map.fromLiteral(["showTool","docSymbol"],["docs",(function($this) { var $_u92 = $this.m_word; if ($_u92 != null) return $_u92; return ""; })(this)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str?")));
  return;
}
fan.uiDev.DocsOp.prototype.m_word = null;
fan.uiDev.BuildOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.BuildOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.BuildOp.prototype.$typeof = function() { return fan.uiDev.BuildOp.$type; }
fan.uiDev.BuildOp.prototype.onRun = function()
{
  this.main().funcCheck(true);
  return;
}
fan.uiDev.BuildOp.make = function() {
  var self = new fan.uiDev.BuildOp();
  fan.uiDev.BuildOp.make$(self);
  return self;
  }
fan.uiDev.BuildOp.make$ = function(self)
{
  fan.uiDev.DevOp.make$(self);
  return;
}
fan.uiDev.HideToolsOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.HideToolsOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.HideToolsOp.prototype.$typeof = function() { return fan.uiDev.HideToolsOp.$type; }
fan.uiDev.HideToolsOp.prototype.onRun = function()
{
  this.update(fan.sys.Map.fromLiteral(["showTool","marks","curMark"],["hide",fan.uiDev.DocItem.m_none,fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type)],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj")));
  this.main().m_content.refocus();
  return;
}
fan.uiDev.HideToolsOp.make = function() {
  var self = new fan.uiDev.HideToolsOp();
  fan.uiDev.HideToolsOp.make$(self);
  return self;
  }
fan.uiDev.HideToolsOp.make$ = function(self)
{
  fan.uiDev.DevOp.make$(self);
  return;
}
fan.uiDev.SetMarkersOp = fan.sys.Obj.$extend(fan.uiDev.DevOp);
fan.uiDev.SetMarkersOp.prototype.$ctor = function()
{
  fan.uiDev.DevOp.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.SetMarkersOp.prototype.$typeof = function() { return fan.uiDev.SetMarkersOp.$type; }
fan.uiDev.SetMarkersOp.make = function(selected) {
  var self = new fan.uiDev.SetMarkersOp();
  fan.uiDev.SetMarkersOp.make$(self,selected);
  return self;
  }
fan.uiDev.SetMarkersOp.make$ = function(self,selected)
{
  fan.uiDev.DevOp.make$(self);
  self.m_selected = fan.sys.ObjUtil.coerce((function($this) { var $_u93 = selected; if ($_u93 == null) return null; return fan.sys.ObjUtil.toImmutable($_u93); })(self),fan.sys.Type.find("sys::Str[]"));
  return;
}
fan.uiDev.SetMarkersOp.prototype.onRun = function()
{
  this.update(fan.sys.Map.fromLiteral(["markers"],[this.m_selected],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str[]")));
  return;
}
fan.uiDev.SetMarkersOp.prototype.m_selected = null;
fan.uiDev.Funcs = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.Funcs.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.Funcs.prototype.$typeof = function() { return fan.uiDev.Funcs.$type; }
fan.uiDev.Funcs.boot = function() {
  var self = new fan.uiDev.Funcs();
  fan.uiDev.Funcs.boot$(self);
  return self;
  }
fan.uiDev.Funcs.boot$ = function(self)
{
  self.m_list = fan.sys.ObjUtil.coerce((function($this) { var $_u94 = fan.sys.ObjUtil.coerce(fan.uiDev.DocRef.$type.emptyList(),fan.sys.Type.find("uiDev::DocRef[]")); if ($_u94 == null) return null; return fan.sys.ObjUtil.toImmutable($_u94); })(self),fan.sys.Type.find("uiDev::DocRef[]"));
  self.m_markers = fan.sys.ObjUtil.coerce((function($this) { var $_u95 = fan.sys.ObjUtil.coerce(fan.sys.Str.$type.emptyList(),fan.sys.Type.find("sys::Str[]")); if ($_u95 == null) return null; return fan.sys.ObjUtil.toImmutable($_u95); })(self),fan.sys.Type.find("sys::Str[]"));
  return;
}
fan.uiDev.Funcs.load = function(data)
{
  if (data.missing("funcs"))
  {
    return null;
  }
  ;
  return fan.uiDev.Funcs.make(fan.sys.ObjUtil.coerce(data.trap("funcs",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.haystack.Grid.$type),fan.sys.ObjUtil.coerce(data.get("funcMarkers"),fan.sys.Type.find("sys::Str[]?")));
}
fan.uiDev.Funcs.make = function(grid,markers) {
  var self = new fan.uiDev.Funcs();
  fan.uiDev.Funcs.make$(self,grid,markers);
  return self;
  }
fan.uiDev.Funcs.make$ = function(self,grid,markers)
{
  var $this = self;
  var acc = grid.mapToList(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u96,
    function(row)
    {
      return fan.uiDev.DocRef.makeDict(row);
    }));
  self.m_list = fan.sys.ObjUtil.coerce((function($this) { var $_u97 = fan.sys.ObjUtil.coerce(acc.sort(),fan.sys.Type.find("uiDev::DocRef[]")); if ($_u97 == null) return null; return fan.sys.ObjUtil.toImmutable($_u97); })(self),fan.sys.Type.find("uiDev::DocRef[]"));
  self.m_markers = fan.sys.ObjUtil.coerce((function($this) { var $_u98 = fan.sys.ObjUtil.coerce((function($this) { var $_u99 = markers; if ($_u99 != null) return $_u99; return fan.sys.Str.$type.emptyList(); })($this),fan.sys.Type.find("sys::Str[]")); if ($_u98 == null) return null; return fan.sys.ObjUtil.toImmutable($_u98); })(self),fan.sys.Type.find("sys::Str[]"));
  return;
}
fan.uiDev.Funcs.prototype.show = function(selected)
{
  var $this = this;
  if (selected.isEmpty())
  {
    return this.m_list;
  }
  ;
  return this.m_list.findAll(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u47,
    function(res)
    {
      return selected.any(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u100,
        function(marker)
        {
          return res.m_meta.has(marker);
        }));
    }));
}
fan.uiDev.Funcs.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus("Funcs [",fan.sys.ObjUtil.coerce(this.m_list.size(),fan.sys.Obj.$type.toNullable())),"]");
}
fan.uiDev.Funcs.prototype.m_list = null;
fan.uiDev.Funcs.prototype.m_markers = null;
fan.uiDev.MarkerSelector = fan.sys.Obj.$extend(fan.domkit.Button);
fan.uiDev.MarkerSelector.prototype.$ctor = function()
{
  fan.domkit.Button.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_markers = fan.sys.List.make(fan.sys.Str.$type);
  this.m_selected = fan.sys.List.make(fan.sys.Str.$type);
  return;
}
fan.uiDev.MarkerSelector.prototype.$typeof = function() { return fan.uiDev.MarkerSelector.$type; }
fan.uiDev.MarkerSelector.make = function() {
  var self = new fan.uiDev.MarkerSelector();
  fan.uiDev.MarkerSelector.make$(self);
  return self;
  }
fan.uiDev.MarkerSelector.make$ = function(self)
{
  var $this = self;
  fan.domkit.Button.make$(self);
  ;
  self.text$(fan.uiDev.MarkerSelector.m_allName);
  self.onPopup(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u101,
    function(b)
    {
      return fan.uiDev.MarkerSelectorPopup.make($this);
    }));
  return;
}
fan.uiDev.MarkerSelector.prototype.update = function(markers,selected)
{
  this.m_markers = markers;
  this.m_selected = fan.sys.ObjUtil.coerce((function($this) { var $_u102 = selected; if ($_u102 != null) return $_u102; return fan.sys.Str.$type.emptyList(); })(this),fan.sys.Type.find("sys::Str[]"));
  this.text$((function($this) { if ($this.isAll()) return fan.uiDev.MarkerSelector.m_allName; return selected.join(", "); })(this));
  return;
}
fan.uiDev.MarkerSelector.prototype.isAll = function()
{
  return this.m_selected.isEmpty();
}
fan.uiDev.MarkerSelector.prototype.isSelected = function(m)
{
  return this.m_selected.contains(m);
}
fan.uiDev.MarkerSelector.prototype.markers = function()
{
  return this.m_markers;
}
fan.uiDev.MarkerSelector.prototype.markers$ = function(it)
{
  this.m_markers = it;
  return;
}
fan.uiDev.MarkerSelector.prototype.selected = function()
{
  return this.m_selected;
}
fan.uiDev.MarkerSelector.prototype.selected$ = function(it)
{
  this.m_selected = it;
  return;
}
fan.uiDev.MarkerSelector.prototype.onModify = function(f)
{
  this.m_cbModify = f;
  return;
}
fan.uiDev.MarkerSelector.prototype.fireModified = function(selected)
{
  this.m_selected = selected;
  (function($this) { var $_u104 = $this.m_cbModify; if ($_u104 == null) return null; return $_u104.call($this); })(this);
  return;
}
fan.uiDev.MarkerSelector.prototype.cbModify = function()
{
  return this.m_cbModify;
}
fan.uiDev.MarkerSelector.prototype.cbModify$ = function(it)
{
  this.m_cbModify = it;
  return;
}
fan.uiDev.MarkerSelector.static$init = function()
{
  fan.uiDev.MarkerSelector.m_allName = "All";
  return;
}
fan.uiDev.MarkerSelector.prototype.m_markers = null;
fan.uiDev.MarkerSelector.prototype.m_selected = null;
fan.uiDev.MarkerSelector.m_allName = null;
fan.uiDev.MarkerSelector.prototype.m_cbModify = null;
fan.uiDev.MarkerSelectorPopup = fan.sys.Obj.$extend(fan.domkit.Popup);
fan.uiDev.MarkerSelectorPopup.prototype.$ctor = function()
{
  fan.domkit.Popup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.MarkerSelectorPopup.prototype.$typeof = function() { return fan.uiDev.MarkerSelectorPopup.$type; }
fan.uiDev.MarkerSelectorPopup.make = function(s) {
  var self = new fan.uiDev.MarkerSelectorPopup();
  fan.uiDev.MarkerSelectorPopup.make$(self,s);
  return self;
  }
fan.uiDev.MarkerSelectorPopup.make$ = function(self,s)
{
  var $this = self;
  fan.domkit.Popup.make$(self);
  self.m_selector = s;
  self.m_all = fan.sys.ObjUtil.coerce(self.makeButton(fan.uiDev.MarkerSelector.m_allName,s.isAll()),fan.domkit.ToggleButton.$type);
  self.m_markers = fan.sys.ObjUtil.coerce(self.m_selector.m_markers.map(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u105,
    function(m)
    {
      return fan.sys.ObjUtil.coerce($this.makeButton(m,s.isSelected(m)),fan.domkit.ToggleButton.$type);
    })),fan.sys.Type.find("domkit::ToggleButton[]"));
  var box = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u55,
    function(it)
    {
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
      it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      it.add($this.m_all);
      it.addAll($this.m_markers);
      return;
    })),fan.domkit.Box.$type);
  self.add(box);
  return;
}
fan.uiDev.MarkerSelectorPopup.prototype.makeButton = function($name,selected)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ToggleButton.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u37,
    function(it)
    {
      it.text$($name);
      it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
      it.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["left"]));
      it.style().trap("borderRadius",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["6px"]));
      it.selected$(selected);
      it.onAction(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u106,
        function(b)
        {
          $this.onToggle(b,fan.sys.ObjUtil.coerce(b._event(),fan.dom.Event.$type));
          return;
        }));
      return;
    })),fan.domkit.ToggleButton.$type);
}
fan.uiDev.MarkerSelectorPopup.prototype.onToggle = function(b,event)
{
  var $this = this;
  var single = !(event.ctrl() || event.meta());
  if (single)
  {
    this.eachToggle(fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u107,
      function(t)
      {
        t.selected$(b === t);
        return;
      }));
  }
  else
  {
    if (b === this.m_all)
    {
      this.m_markers.each(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u107,
        function(t)
        {
          t.selected$(false);
          return;
        }));
    }
    ;
    this.m_all.selected$(!this.m_markers.any(fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u108,
      function(m)
      {
        return m.selected();
      })));
  }
  ;
  var selected = fan.sys.List.make(fan.sys.Str.$type);
  this.m_markers.each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u109,
    function(m)
    {
      if (m.selected())
      {
        selected.add(m.text());
      }
      ;
      return;
    }));
  this.m_selector.fireModified(selected);
  if (single)
  {
    this.close();
  }
  ;
  return;
}
fan.uiDev.MarkerSelectorPopup.prototype.eachToggle = function(f)
{
  f.call(this.m_all);
  this.m_markers.each(f);
  return;
}
fan.uiDev.MarkerSelectorPopup.prototype.selector = function()
{
  return this.m_selector;
}
fan.uiDev.MarkerSelectorPopup.prototype.selector$ = function(it)
{
  this.m_selector = it;
  return;
}
fan.uiDev.MarkerSelectorPopup.prototype.all = function()
{
  return this.m_all;
}
fan.uiDev.MarkerSelectorPopup.prototype.all$ = function(it)
{
  this.m_all = it;
  return;
}
fan.uiDev.MarkerSelectorPopup.prototype.markers = function()
{
  return this.m_markers;
}
fan.uiDev.MarkerSelectorPopup.prototype.markers$ = function(it)
{
  this.m_markers = it;
  return;
}
fan.uiDev.MarkerSelectorPopup.prototype.m_selector = null;
fan.uiDev.MarkerSelectorPopup.prototype.m_all = null;
fan.uiDev.MarkerSelectorPopup.prototype.m_markers = null;
fan.uiDev.SymbolInput = fan.sys.Obj.$extend(fan.ui.Input);
fan.uiDev.SymbolInput.prototype.$ctor = function()
{
  fan.ui.Input.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.SymbolInput.prototype.$typeof = function() { return fan.uiDev.SymbolInput.$type; }
fan.uiDev.SymbolInput.make = function() {
  var self = new fan.uiDev.SymbolInput();
  fan.uiDev.SymbolInput.make$(self);
  return self;
  }
fan.uiDev.SymbolInput.make$ = function(self)
{
  var $this = self;
  fan.ui.Input.make$(self);
  self.m_field = self.makeTextField();
  self.m_field.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { var $_u110 = $this.m_def.m_meta.get("size"); if ($_u110 != null) return $_u110; return "100%"; })(self)]));
  self.add(self.m_field);
  var auto = fan.sys.ObjUtil.coerce(fan.uiDev.SymbolAutoField.make(self).apply(self.m_field),fan.uiDev.SymbolAutoField.$type);
  auto.onModify(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u36,
    function(it)
    {
      $this.modified$(true);
      return;
    }));
  return;
}
fan.uiDev.SymbolInput.prototype.onRO = function()
{
  this.m_field.enabled$(fan.sys.ObjUtil.coerce(!this.ro(),fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiDev.SymbolInput.prototype.onLoad = function(val)
{
  this.m_field.val$(fan.sys.ObjUtil.toStr(val));
  return;
}
fan.uiDev.SymbolInput.prototype.onSave = function()
{
  return fan.sys.ObjUtil.coerce(fan.haystack.Symbol.fromStr(fan.sys.Str.trim(this.m_field.val())),fan.sys.Obj.$type);
}
fan.uiDev.SymbolInput.prototype.field = function()
{
  return this.m_field;
}
fan.uiDev.SymbolInput.prototype.field$ = function(it)
{
  this.m_field = it;
  return;
}
fan.uiDev.SymbolInput.prototype.m_field = null;
fan.uiDev.SymbolListInput = fan.sys.Obj.$extend(fan.uiDev.SymbolInput);
fan.uiDev.SymbolListInput.prototype.$ctor = function()
{
  fan.uiDev.SymbolInput.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.SymbolListInput.prototype.$typeof = function() { return fan.uiDev.SymbolListInput.$type; }
fan.uiDev.SymbolListInput.prototype.onLoad = function(val)
{
  this.m_field.val$(fan.haystack.Symbol.toList(val).join(", "));
  return;
}
fan.uiDev.SymbolListInput.prototype.onSave = function()
{
  var $this = this;
  var str = fan.sys.Str.trim(this.m_field.val());
  if (fan.sys.Str.isEmpty(str))
  {
    return fan.haystack.Symbol.$type.emptyList();
  }
  ;
  return fan.sys.Str.split(str,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable())).map(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u111,
    function(s)
    {
      return fan.sys.ObjUtil.coerce(fan.haystack.Symbol.fromStr(s),fan.haystack.Symbol.$type);
    }));
}
fan.uiDev.SymbolListInput.make = function() {
  var self = new fan.uiDev.SymbolListInput();
  fan.uiDev.SymbolListInput.make$(self);
  return self;
  }
fan.uiDev.SymbolListInput.make$ = function(self)
{
  fan.uiDev.SymbolInput.make$(self);
  return;
}
fan.uiDev.AutoField = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.AutoField.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_search = fan.misc.FuzzySearch.fromStr("");
  return;
}
fan.uiDev.AutoField.prototype.$typeof = function() { return fan.uiDev.AutoField.$type; }
fan.uiDev.AutoField.prototype.apply = function(field)
{
  var $this = this;
  if (this.m_field != null)
  {
    throw fan.sys.Err.make();
  }
  ;
  this.m_field = field;
  field.setAttr("autocomplete","off");
  field.setAttr("autocorrect","off");
  field.setAttr("autocapitalize","off");
  field.setAttr("spellcheck","false");
  field.onEvent("input",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      $this.showHints();
      return;
    }));
  field.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      $this.onKeyDown(e);
      return;
    }));
  field.onModify(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u112,
    function(t)
    {
      $this.fireOnModify();
      return;
    }));
  return this;
}
fan.uiDev.AutoField.prototype.onElem = function(search,item)
{
  var match = search.match(this.itemToStr(item),item);
  return fan.uiDev.UiDevUtil.fuzzyMatchElem(fan.sys.ObjUtil.coerce(match,fan.misc.FuzzyMatch.$type),this.icon(item));
}
fan.uiDev.AutoField.prototype.onModify = function(f)
{
  this.m__onModify = f;
  return;
}
fan.uiDev.AutoField.prototype._onModify = function()
{
  return this.m__onModify;
}
fan.uiDev.AutoField.prototype._onModify$ = function(it)
{
  this.m__onModify = it;
  return;
}
fan.uiDev.AutoField.prototype.fireOnModify = function()
{
  if (this.m__onModify != null)
  {
    this.m__onModify.call(fan.sys.ObjUtil.coerce(this.m_field,fan.domkit.TextField.$type));
  }
  ;
  return;
}
fan.uiDev.AutoField.prototype.onKeyDown = function(event)
{
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_up))
  {
    return this.onUp(event);
  }
  ;
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_down))
  {
    return this.onDown(event);
  }
  ;
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_tab))
  {
    return this.onEnter(event);
  }
  ;
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_enter))
  {
    return this.onEnter(event);
  }
  ;
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_esc))
  {
    return this.close(event);
  }
  ;
  return;
}
fan.uiDev.AutoField.prototype.onUp = function(event)
{
  if (this.isOpen())
  {
    this.m_hints.onUp(event);
  }
  ;
  return;
}
fan.uiDev.AutoField.prototype.onDown = function(event)
{
  if (this.isOpen())
  {
    this.m_hints.onDown(event);
  }
  else
  {
    this.showHints();
  }
  ;
  return;
}
fan.uiDev.AutoField.prototype.onEnter = function(event)
{
  if (!this.isOpen())
  {
    return;
  }
  ;
  this.onSelect(this.m_hints.selected());
  this.close(event);
  return;
}
fan.uiDev.AutoField.prototype.onSelect = function(item)
{
  if (item == null)
  {
    return;
  }
  ;
  var val = this.itemToStr(fan.sys.ObjUtil.coerce(item,fan.sys.Obj.$type));
  var cur = fan.sys.Str.trim(this.m_field.val());
  if (fan.sys.Str.contains(cur,","))
  {
    val = fan.sys.Str.plus(fan.sys.Str.trim(fan.sys.Str.getRange(cur,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(fan.sys.Str.indexr(cur,","),fan.sys.Int.$type),true))),fan.sys.Str.plus(", ",val));
  }
  ;
  this.m_field.val$(val);
  this.fireOnModify();
  return;
}
fan.uiDev.AutoField.prototype.showHints = function()
{
  var $this = this;
  this.open();
  var s = fan.sys.Str.trim(this.m_field.val());
  if (fan.sys.Str.contains(s,","))
  {
    s = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(fan.sys.Str.indexr(s,","),fan.sys.Int.$type),1),-1)));
  }
  ;
  this.m_search = fan.misc.FuzzySearch.fromStr(s);
  var items = this.m_search.matchAll(this.allItems(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u113,
    function(item)
    {
      return $this.itemToStr(item);
    }));
  this.m_hints.update(items);
  return;
}
fan.uiDev.AutoField.prototype.isOpen = function()
{
  return this.m_bodyMask != null;
}
fan.uiDev.AutoField.prototype.open = function()
{
  var $this = this;
  if (this.isOpen())
  {
    return;
  }
  ;
  var pos = this.m_field.pagePos();
  var size = this.m_field.size();
  var viewport = fan.dom.Win.cur().viewport();
  var px = pos.m_x;
  var py = fan.sys.Float.plus(pos.m_y,size.m_h);
  var pw = size.m_w;
  var ph = fan.sys.Float.make(296.0);
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plus(py,ph),viewport.m_h))
  {
    ph = fan.sys.Float.max(fan.sys.Float.make(60.0),fan.sys.Float.minus(fan.sys.Float.minus(viewport.m_h,py),fan.sys.Float.make(4.0)));
  }
  ;
  this.m_hints = fan.uiDev.ListBox.make(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u43,
    function(it)
    {
      it.m_focusable = false;
      it.style().trap("maxHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(ph,fan.sys.Obj.$type.toNullable())),"px")]));
      it.onElem(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u114,
        function(item)
        {
          return $this.onElem($this.m_search,item);
        }));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u44,
        function(e)
        {
          $this.onSelect(e.m_item);
          if (e.isMouse())
          {
            $this.close(e.m_dom);
          }
          ;
          return;
        }));
      return;
    }));
  var popup = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u34,
    function(it)
    {
      it.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
      it.style().trap("zIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100"]));
      it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(px,fan.sys.Obj.$type.toNullable())),"px")]));
      it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(py,fan.sys.Obj.$type.toNullable())),"px")]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(pw,fan.sys.Obj.$type.toNullable())),"px")]));
      it.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
      it.add(fan.sys.ObjUtil.coerce($this.m_hints,fan.dom.Elem.$type));
      return;
    })),fan.dom.Elem.$type);
  this.m_bodyMask = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u34,
    function(it)
    {
      it.id$("uiDev-AutoField-mask");
      it.style().addClass("domkit-Popup-mask");
      it.onEvent("mousedown",false,fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u35,
        function(e)
        {
          if (!popup.containsChild(e.target()))
          {
            $this.close(e);
          }
          ;
          return;
        }));
      it.add(popup);
      return;
    })),fan.dom.Elem.$type);
  fan.dom.Win.cur().doc().body().add(fan.sys.ObjUtil.coerce(this.m_bodyMask,fan.dom.Elem.$type));
  return;
}
fan.uiDev.AutoField.prototype.close = function(event)
{
  if (!this.isOpen())
  {
    return;
  }
  ;
  event.stop();
  fan.dom.Win.cur().doc().body().remove(fan.sys.ObjUtil.coerce(this.m_bodyMask,fan.dom.Elem.$type));
  this.m_hints = null;
  this.m_bodyMask = null;
  return;
}
fan.uiDev.AutoField.prototype.field = function()
{
  return this.m_field;
}
fan.uiDev.AutoField.prototype.field$ = function(it)
{
  this.m_field = it;
  return;
}
fan.uiDev.AutoField.prototype.search = function()
{
  return this.m_search;
}
fan.uiDev.AutoField.prototype.search$ = function(it)
{
  this.m_search = it;
  return;
}
fan.uiDev.AutoField.prototype.bodyMask = function()
{
  return this.m_bodyMask;
}
fan.uiDev.AutoField.prototype.bodyMask$ = function(it)
{
  this.m_bodyMask = it;
  return;
}
fan.uiDev.AutoField.prototype.hints = function()
{
  return this.m_hints;
}
fan.uiDev.AutoField.prototype.hints$ = function(it)
{
  this.m_hints = it;
  return;
}
fan.uiDev.AutoField.make = function() {
  var self = new fan.uiDev.AutoField();
  fan.uiDev.AutoField.make$(self);
  return self;
  }
fan.uiDev.AutoField.make$ = function(self)
{
  ;
  return;
}
fan.uiDev.AutoField.prototype.m__onModify = null;
fan.uiDev.AutoField.prototype.m_field = null;
fan.uiDev.AutoField.prototype.m_search = null;
fan.uiDev.AutoField.prototype.m_bodyMask = null;
fan.uiDev.AutoField.prototype.m_hints = null;
fan.uiDev.SymbolAutoField = fan.sys.Obj.$extend(fan.uiDev.AutoField);
fan.uiDev.SymbolAutoField.prototype.$ctor = function()
{
  fan.uiDev.AutoField.prototype.$ctor.call(this);
  var $this = this;
  this.m_allItems$Store = "_once_";
  return;
}
fan.uiDev.SymbolAutoField.prototype.$typeof = function() { return fan.uiDev.SymbolAutoField.$type; }
fan.uiDev.SymbolAutoField.make = function(input) {
  var self = new fan.uiDev.SymbolAutoField();
  fan.uiDev.SymbolAutoField.make$(self,input);
  return self;
  }
fan.uiDev.SymbolAutoField.make$ = function(self,input)
{
  fan.uiDev.AutoField.make$(self);
  ;
  self.m_input = input;
  return;
}
fan.uiDev.SymbolAutoField.prototype.icon = function(item)
{
  return fan.uiDev.DevIcon.m_tag;
}
fan.uiDev.SymbolAutoField.prototype.itemToStr = function(item)
{
  return fan.sys.ObjUtil.coerce(item,fan.haystack.Def.$type).symbol().toStr();
}
fan.uiDev.SymbolAutoField.prototype.allItems = function()
{
  if (this.m_allItems$Store === "_once_")
  {
    this.m_allItems$Store = this.allItems$Once();
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_allItems$Store,fan.sys.Type.find("haystack::Def[]"));
}
fan.uiDev.SymbolAutoField.prototype.input = function()
{
  return this.m_input;
}
fan.uiDev.SymbolAutoField.prototype.input$ = function(it)
{
  this.m_input = it;
  return;
}
fan.uiDev.SymbolAutoField.prototype.allItems$Once = function()
{
  var $this = this;
  return this.m_input.m_session.m_ns.findDefs(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u115,
    function(def)
    {
      return def.symbol().type().isTerm();
    }));
}
fan.uiDev.SymbolAutoField.prototype.m_input = null;
fan.uiDev.SymbolAutoField.prototype.m_allItems$Store = null;
fan.uiDev.AdminFuncNameListInput = fan.sys.Obj.$extend(fan.ui.Input);
fan.uiDev.AdminFuncNameListInput.prototype.$ctor = function()
{
  fan.ui.Input.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.AdminFuncNameListInput.prototype.$typeof = function() { return fan.uiDev.AdminFuncNameListInput.$type; }
fan.uiDev.AdminFuncNameListInput.make = function() {
  var self = new fan.uiDev.AdminFuncNameListInput();
  fan.uiDev.AdminFuncNameListInput.make$(self);
  return self;
  }
fan.uiDev.AdminFuncNameListInput.make$ = function(self)
{
  var $this = self;
  fan.ui.Input.make$(self);
  self.m_field = self.makeTextField();
  self.m_field.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { var $_u116 = $this.m_def.m_meta.get("size"); if ($_u116 != null) return $_u116; return "100%"; })(self)]));
  self.add(self.m_field);
  var auto = fan.sys.ObjUtil.coerce(fan.uiDev.AdminFuncNameAutoField.make(self).apply(self.m_field),fan.uiDev.AdminFuncNameAutoField.$type);
  auto.onModify(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u36,
    function(it)
    {
      $this.modified$(true);
      return;
    }));
  return;
}
fan.uiDev.AdminFuncNameListInput.prototype.onRO = function()
{
  this.m_field.enabled$(fan.sys.ObjUtil.coerce(!this.ro(),fan.sys.Bool.$type.toNullable()));
  return;
}
fan.uiDev.AdminFuncNameListInput.prototype.onLoad = function(val)
{
  this.m_field.val$(fan.sys.ObjUtil.coerce(val,fan.sys.Type.find("sys::List")).join(", "));
  return;
}
fan.uiDev.AdminFuncNameListInput.prototype.onSave = function()
{
  var str = fan.sys.Str.trim(this.m_field.val());
  if (fan.sys.Str.isEmpty(str))
  {
    return fan.sys.Str.$type.emptyList();
  }
  ;
  return fan.sys.Str.split(str,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable()));
}
fan.uiDev.AdminFuncNameListInput.prototype.field = function()
{
  return this.m_field;
}
fan.uiDev.AdminFuncNameListInput.prototype.field$ = function(it)
{
  this.m_field = it;
  return;
}
fan.uiDev.AdminFuncNameListInput.prototype.m_field = null;
fan.uiDev.AdminFuncNameAutoField = fan.sys.Obj.$extend(fan.uiDev.AutoField);
fan.uiDev.AdminFuncNameAutoField.prototype.$ctor = function()
{
  fan.uiDev.AutoField.prototype.$ctor.call(this);
  var $this = this;
  this.m_allItems$Store = "_once_";
  return;
}
fan.uiDev.AdminFuncNameAutoField.prototype.$typeof = function() { return fan.uiDev.AdminFuncNameAutoField.$type; }
fan.uiDev.AdminFuncNameAutoField.make = function(input) {
  var self = new fan.uiDev.AdminFuncNameAutoField();
  fan.uiDev.AdminFuncNameAutoField.make$(self,input);
  return self;
  }
fan.uiDev.AdminFuncNameAutoField.make$ = function(self,input)
{
  fan.uiDev.AutoField.make$(self);
  ;
  self.m_input = input;
  return;
}
fan.uiDev.AdminFuncNameAutoField.prototype.icon = function(item)
{
  return fan.uiDev.DevIcon.m_func;
}
fan.uiDev.AdminFuncNameAutoField.prototype.itemToStr = function(item)
{
  return fan.sys.Str.toStr(fan.sys.ObjUtil.coerce(item,fan.haystack.Def.$type).$name());
}
fan.uiDev.AdminFuncNameAutoField.prototype.allItems = function()
{
  if (this.m_allItems$Store === "_once_")
  {
    this.m_allItems$Store = this.allItems$Once();
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_allItems$Store,fan.sys.Type.find("haystack::Def[]"));
}
fan.uiDev.AdminFuncNameAutoField.prototype.input = function()
{
  return this.m_input;
}
fan.uiDev.AdminFuncNameAutoField.prototype.input$ = function(it)
{
  this.m_input = it;
  return;
}
fan.uiDev.AdminFuncNameAutoField.prototype.allItems$Once = function()
{
  var $this = this;
  return this.m_input.m_session.m_ns.funcs().findAll(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u51,
    function(f)
    {
      return (f.has("admin") || f.has("su"));
    }));
}
fan.uiDev.AdminFuncNameAutoField.prototype.m_input = null;
fan.uiDev.AdminFuncNameAutoField.prototype.m_allItems$Store = null;
fan.uiDev.UiDevUtil = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.UiDevUtil.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.UiDevUtil.prototype.$typeof = function() { return fan.uiDev.UiDevUtil.$type; }
fan.uiDev.UiDevUtil.border = function()
{
  return "1px solid #ccc";
}
fan.uiDev.UiDevUtil.gotoItemElem = function(item,match)
{
  var elem = fan.domkit.Box.make();
  elem.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px 0"]));
  elem.add(fan.uiDev.UiDevUtil.fuzzyMatchElem(match,item.icon()));
  return elem;
}
fan.uiDev.UiDevUtil.cmdItemElem = function(cmd,hotKeys,match)
{
  var $this = this;
  var dis = fan.uiDev.UiDevUtil.fuzzyMatchElem(match,fan.uiDev.DevIcon.makeCommand(cmd));
  var keys = fan.uiDev.UiDevUtil.hotKeysElem(hotKeys);
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u27,
    function(it)
    {
      it.flex$(fan.sys.List.make(fan.sys.Str.$type, ["1 1 auto","0 0 auto"]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["calc(100% - 20px)"]));
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["23px"]));
      it.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
      fan.sys.ObjUtil.coerce(it.add(dis),fan.domkit.FlexBox.$type).add(keys);
      return;
    })),fan.domkit.FlexBox.$type);
}
fan.uiDev.UiDevUtil.iconTextElem = function(icon,text)
{
  var $this = this;
  var elem = fan.domkit.Box.make();
  elem.style().trap("whiteSpace",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["nowrap"]));
  var iconElem = fan.ui.Icon.makeSpec(icon);
  iconElem.style().addClass("uiDev-label-icon");
  elem.add(fan.sys.ObjUtil.coerce(iconElem,fan.dom.Elem.$type));
  var textElem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u6,
    function(it)
    {
      it.text$(text);
      return;
    })),fan.domkit.Label.$type);
  textElem.style().addClass("uiDev-label-text");
  elem.add(textElem);
  return elem;
}
fan.uiDev.UiDevUtil.fuzzyMatchElem = function(match,icon)
{
  var $this = this;
  var elem = fan.domkit.Box.make();
  var iconElem = fan.ui.Icon.makeSpec(icon);
  iconElem.style().addClass("uiDev-label-icon");
  elem.add(fan.sys.ObjUtil.coerce(iconElem,fan.dom.Elem.$type));
  match.split(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u117,
    function(subStr,highlight)
    {
      var textElem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("span"),fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u34,
        function(it)
        {
          it.text$(subStr);
          return;
        })),fan.dom.Elem.$type);
      textElem.style().addClass("uiDev-label-text");
      if (highlight)
      {
        textElem.style().addClass("uiDev-label-text-match");
      }
      ;
      elem.add(textElem);
      return;
    }));
  return elem;
}
fan.uiDev.UiDevUtil.hotKeysElem = function(hotKeys)
{
  var $this = this;
  var span = fan.domkit.Box.make();
  hotKeys.each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u118,
    function(hotKey,i)
    {
      if (fan.sys.ObjUtil.compareGT(i,0))
      {
        span.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
          fan.uiDev.$clos$_u6,
          function(it)
          {
            it.style().trap("paddingLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
            return;
          })),fan.domkit.Label.$type));
      }
      ;
      hotKey.each(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u119,
        function(symbol)
        {
          var key = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
            fan.uiDev.$clos$_u6,
            function(it)
            {
              it.text$(symbol);
              return;
            })),fan.domkit.Label.$type);
          key.style().addClass("uiDev-shortcut-key");
          span.add(key);
          return;
        }));
      return;
    }));
  return span;
}
fan.uiDev.UiDevUtil.make = function() {
  var self = new fan.uiDev.UiDevUtil();
  fan.uiDev.UiDevUtil.make$(self);
  return self;
  }
fan.uiDev.UiDevUtil.make$ = function(self)
{
  return;
}
fan.uiDev.DevIcon = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.DevIcon.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.DevIcon.prototype.$typeof = function() { return fan.uiDev.DevIcon.$type; }
fan.uiDev.DevIcon.makeCommand = function(c)
{
  var $name = (function($this) { var $_u120 = fan.sys.ObjUtil.as(c.get("icon"),fan.sys.Str.$type); if ($_u120 != null) return $_u120; return "command"; })(this);
  if (fan.sys.ObjUtil.equals($name,"command"))
  {
    if (fan.sys.Str.startsWith(c.$name(),"edit"))
    {
      $name = "edit";
    }
    ;
    if (fan.sys.Str.startsWith(c.$name(),"move"))
    {
      $name = "layoutFill";
    }
    ;
  }
  ;
  return fan.uiDev.DevIcon.makeOutline(fan.sys.ObjUtil.coerce($name,fan.sys.Str.$type));
}
fan.uiDev.DevIcon.makeDict = function(d)
{
  var $name = (function($this) { var $_u121 = fan.sys.ObjUtil.as(d.get("icon"),fan.sys.Str.$type); if ($_u121 != null) return $_u121; return "file"; })(this);
  return fan.uiDev.DevIcon.makeOutline(fan.sys.ObjUtil.coerce($name,fan.sys.Str.$type));
}
fan.uiDev.DevIcon.makeColor = function($name)
{
  return fan.pim.IconSpec.makeColor($name);
}
fan.uiDev.DevIcon.makeOutline = function($name,color)
{
  if (color === undefined) color = "#080";
  return fan.pim.IconSpec.makeOutline($name,color);
}
fan.uiDev.DevIcon.make = function() {
  var self = new fan.uiDev.DevIcon();
  fan.uiDev.DevIcon.make$(self);
  return self;
  }
fan.uiDev.DevIcon.make$ = function(self)
{
  return;
}
fan.uiDev.DevIcon.static$init = function()
{
  fan.uiDev.DevIcon.m_blank = fan.uiDev.DevIcon.makeOutline("blank");
  fan.uiDev.DevIcon.m_func = fan.uiDev.DevIcon.makeOutline("func");
  fan.uiDev.DevIcon.m_ok = fan.uiDev.DevIcon.makeColor("ok");
  fan.uiDev.DevIcon.m_tag = fan.uiDev.DevIcon.makeOutline("tag",fan.ui.Colors.m_yellow);
  fan.uiDev.DevIcon.m_warn = fan.uiDev.DevIcon.makeOutline("warn",fan.ui.Colors.m_darkOrange);
  return;
}
fan.uiDev.DevIcon.m_blank = null;
fan.uiDev.DevIcon.m_func = null;
fan.uiDev.DevIcon.m_ok = null;
fan.uiDev.DevIcon.m_tag = null;
fan.uiDev.DevIcon.m_warn = null;
fan.uiDev.ListBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.uiDev.ListBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_elems = fan.sys.List.make(fan.uiDev.ListBoxElem.$type);
  return;
}
fan.uiDev.ListBox.prototype.$typeof = function() { return fan.uiDev.ListBox.$type; }
fan.uiDev.ListBox.make = function(f) {
  var self = new fan.uiDev.ListBox();
  fan.uiDev.ListBox.make$(self,f);
  return self;
  }
fan.uiDev.ListBox.make$ = function(self,f)
{
  if (f === undefined) f = null;
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  self.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
  self.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  self.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  self.style().trap("overflowX",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
  self.style().trap("overflowY",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
  self.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#fff"]));
  self.style().addPseudoClass(":focus","outline: none;");
  self.onEvent("mousemove",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      $this.onMouseMove(e);
      return;
    }));
  self.onEvent("mouseleave",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      $this.onMouseLeave(e);
      return;
    }));
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      $this.onMouseDown(e);
      return;
    }));
  self.onEvent("mouseup",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      $this.onMouseUp(e);
      return;
    }));
  if (self.m_focusable)
  {
    self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
    self.onEvent("keydown",false,fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u35,
      function(e)
      {
        $this.onKeyDown(e);
        return;
      }));
  }
  ;
  return;
}
fan.uiDev.ListBox.prototype.update = function(items)
{
  var $this = this;
  this.m_elems = fan.sys.ObjUtil.coerce(items.map(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u122,
    function(item,i)
    {
      return fan.uiDev.ListBoxElem.make(i,item,$this.itemToElem(item));
    })),fan.sys.Type.find("uiDev::ListBoxElem[]"));
  this.removeAll();
  this.addAll(this.m_elems);
  this.select(null,fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
  if (this.m_searchField != null)
  {
    this.search(this.m_searchField.val());
  }
  ;
  return;
}
fan.uiDev.ListBox.prototype.selected = function()
{
  return (function($this) { var $_u123=$this.elem($this.m_selIndex); return ($_u123==null) ? null : $_u123.m_item }(this));
}
fan.uiDev.ListBox.prototype.selected$ = function(it)
{
  this.select(null,this.index(it));
  return;
}
fan.uiDev.ListBox.prototype.onElem = function(f)
{
  this.m_cbElem = f;
  return;
}
fan.uiDev.ListBox.prototype.onSearch = function(f)
{
  this.m_cbSearch = f;
  return;
}
fan.uiDev.ListBox.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.uiDev.ListBox.prototype.itemToElem = function(item)
{
  var $this = this;
  if (this.m_cbElem == null)
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u6,
      function(it)
      {
        it.text$(fan.sys.ObjUtil.toStr(item));
        return;
      })),fan.domkit.Label.$type);
  }
  ;
  return fan.sys.ObjUtil.coerce(this.m_cbElem.call(item),fan.dom.Elem.$type);
}
fan.uiDev.ListBox.prototype.makeSearchCombo = function(top)
{
  var $this = this;
  if (this.m_cbSearch == null)
  {
    throw fan.sys.Err.make("Must add onSearch handler");
  }
  ;
  var field = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u36,
    function(it)
    {
      it.placeholder$("Search...");
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
      it.style().trap("marginBottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["8px"]));
      it.onModify(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u124,
        function(f)
        {
          $this.search(f.val());
          return;
        }));
      return;
    })),fan.domkit.TextField.$type);
  field.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_down))
      {
        $this.searchDownKey(e);
      }
      ;
      if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_esc))
      {
        field.val$("");
        $this.search("");
      }
      ;
      return;
    }));
  var flex = fan.sys.List.make(fan.sys.Str.$type, ["none","1 1 0"]);
  if (top != null)
  {
    flex.insert(0,"none");
  }
  ;
  this.m_searchField = field;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.FlexBox.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u27,
    function(it)
    {
      it.dir$("column");
      it.flex$(flex);
      if (top != null)
      {
        it.add(fan.sys.ObjUtil.coerce(top,fan.dom.Elem.$type));
      }
      ;
      it.add(field);
      it.add($this);
      return;
    })),fan.domkit.FlexBox.$type);
}
fan.uiDev.ListBox.prototype.searchDownKey = function(e)
{
  var $this = this;
  e.stop();
  this.select(e,this.m_elems.findIndex(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u125,
    function(elem)
    {
      return elem.m_visible;
    })));
  this.focus();
  return;
}
fan.uiDev.ListBox.prototype.search = function(pattern)
{
  var $this = this;
  this.selected$(null);
  this.scrollPos$(fan.graphics.Point.make(fan.sys.Float.make(0.0),fan.sys.Float.make(0.0)));
  pattern = fan.sys.Str.trim(pattern);
  this.m_elems.each(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u126,
    function(elem)
    {
      elem.setVisible($this.isSearchMatch(pattern,elem));
      return;
    }));
  return;
}
fan.uiDev.ListBox.prototype.isSearchMatch = function(pattern,elem)
{
  if (fan.sys.Str.isEmpty(pattern))
  {
    return true;
  }
  ;
  var str = fan.sys.ObjUtil.coerce(this.m_cbSearch.call(elem.m_item),fan.sys.Str.$type);
  return fan.sys.Str.indexIgnoreCase(str,pattern) != null;
}
fan.uiDev.ListBox.prototype.select = function(event,index)
{
  var $this = this;
  if (index != null)
  {
    if (fan.sys.ObjUtil.compareGE(index,this.m_elems.size()))
    {
      index = fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.m_elems.size(),1),fan.sys.Int.$type.toNullable());
    }
    ;
    if (fan.sys.ObjUtil.compareLT(index,0))
    {
      index = fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable());
    }
    ;
  }
  ;
  this.mouseOver(null);
  var old = this.elem(this.m_selIndex);
  if (old != null)
  {
    old.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
  }
  ;
  this.m_selIndex = index;
  var elem = this.elem(index);
  if (elem == null)
  {
    return;
  }
  ;
  elem.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#d6eaff"]));
  var sy = this.scrollPos().m_y;
  var mh = this.size().m_h;
  var iy = elem.pos().m_y;
  var ih = elem.size().m_h;
  if (fan.sys.ObjUtil.compareGT(sy,iy))
  {
    this.scrollPos$(fan.graphics.Point.make(fan.sys.Float.make(0.0),iy));
  }
  else
  {
    if (fan.sys.ObjUtil.compareLT(fan.sys.Float.plus(sy,mh),fan.sys.Float.plus(iy,ih)))
    {
      this.scrollPos$(fan.graphics.Point.make(fan.sys.Float.make(0.0),fan.sys.Float.minus(fan.sys.Float.plus(iy,ih),mh)));
    }
    ;
  }
  ;
  if ((event != null && this.m_cbSelect != null))
  {
    this.m_cbSelect.call(fan.uiDev.ListBoxEvent.make(fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u127,
      function(it)
      {
        it.m_index = index;
        it.m_item = elem.m_item;
        it.m_dom = fan.sys.ObjUtil.coerce(event,fan.dom.Event.$type);
        return;
      })));
  }
  ;
  return;
}
fan.uiDev.ListBox.prototype.mouseOver = function(index)
{
  var old = this.elem(this.m_overIndex);
  if ((old != null && fan.sys.ObjUtil.compareNE(old.m_index,this.m_selIndex)))
  {
    old.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
  }
  ;
  this.m_overIndex = index;
  var elem = this.elem(index);
  if ((elem == null || fan.sys.ObjUtil.equals(index,this.m_selIndex)))
  {
    return;
  }
  ;
  elem.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["#eee"]));
  return;
}
fan.uiDev.ListBox.prototype.elem = function(index)
{
  if ((index == null || fan.sys.ObjUtil.compareLT(index,0)))
  {
    return null;
  }
  ;
  return this.m_elems.getSafe(fan.sys.ObjUtil.coerce(index,fan.sys.Int.$type));
}
fan.uiDev.ListBox.prototype.index = function(item)
{
  var $this = this;
  return this.m_elems.findIndex(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u125,
    function(elem)
    {
      return fan.sys.ObjUtil.equals(elem.m_item,item);
    }));
}
fan.uiDev.ListBox.prototype.onKeyDown = function(event)
{
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_up))
  {
    return this.onUp(event);
  }
  ;
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_down))
  {
    return this.onDown(event);
  }
  ;
  return;
}
fan.uiDev.ListBox.prototype.onUp = function(event)
{
  event.stop();
  if (this.m_selIndex == null)
  {
    return;
  }
  ;
  for (var i = fan.sys.Int.minus(fan.sys.ObjUtil.coerce(this.m_selIndex,fan.sys.Int.$type),1); fan.sys.ObjUtil.compareGE(i,0); i = fan.sys.Int.decrement(i))
  {
    if (this.m_elems.get(i).m_visible)
    {
      this.select(event,fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type.toNullable()));
      break;
    }
    ;
  }
  ;
  return;
}
fan.uiDev.ListBox.prototype.onDown = function(event)
{
  event.stop();
  if (this.m_selIndex == null)
  {
    return;
  }
  ;
  for (var i = fan.sys.Int.plus(fan.sys.ObjUtil.coerce(this.m_selIndex,fan.sys.Int.$type),1); fan.sys.ObjUtil.compareLT(i,this.m_elems.size()); i = fan.sys.Int.increment(i))
  {
    if (this.m_elems.get(i).m_visible)
    {
      this.select(event,fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type.toNullable()));
      break;
    }
    ;
  }
  ;
  return;
}
fan.uiDev.ListBox.prototype.onMouseMove = function(event)
{
  var item = this.mouseToItem(event);
  this.mouseOver((function($this) { var $_u128=item; return ($_u128==null) ? null : $_u128.m_index }(this)));
  return;
}
fan.uiDev.ListBox.prototype.onMouseLeave = function(event)
{
  this.m_mouseIsDown = false;
  this.mouseOver(null);
  return;
}
fan.uiDev.ListBox.prototype.onMouseDown = function(event)
{
  this.m_mouseIsDown = true;
  this.select(event,(function($this) { var $_u129=$this.mouseToItem(event); return ($_u129==null) ? null : $_u129.m_index }(this)));
  return;
}
fan.uiDev.ListBox.prototype.onMouseUp = function(event)
{
  if (this.m_mouseIsDown)
  {
    this.select(event,(function($this) { var $_u130=$this.mouseToItem(event); return ($_u130==null) ? null : $_u130.m_index }(this)));
  }
  ;
  this.m_mouseIsDown = false;
  return;
}
fan.uiDev.ListBox.prototype.mouseToItem = function(event)
{
  var x = event.target();
  while (x != null)
  {
    if (fan.sys.ObjUtil.is(x,fan.uiDev.ListBoxElem.$type))
    {
      return fan.sys.ObjUtil.coerce(x,fan.uiDev.ListBoxElem.$type.toNullable());
    }
    ;
    x = x.parent();
  }
  ;
  return null;
}
fan.uiDev.ListBox.prototype.elems = function()
{
  return this.m_elems;
}
fan.uiDev.ListBox.prototype.elems$ = function(it)
{
  this.m_elems = it;
  return;
}
fan.uiDev.ListBox.prototype.selIndex = function()
{
  return this.m_selIndex;
}
fan.uiDev.ListBox.prototype.selIndex$ = function(it)
{
  this.m_selIndex = it;
  return;
}
fan.uiDev.ListBox.prototype.overIndex = function()
{
  return this.m_overIndex;
}
fan.uiDev.ListBox.prototype.overIndex$ = function(it)
{
  this.m_overIndex = it;
  return;
}
fan.uiDev.ListBox.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.uiDev.ListBox.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.uiDev.ListBox.prototype.cbElem = function()
{
  return this.m_cbElem;
}
fan.uiDev.ListBox.prototype.cbElem$ = function(it)
{
  this.m_cbElem = it;
  return;
}
fan.uiDev.ListBox.prototype.cbSearch = function()
{
  return this.m_cbSearch;
}
fan.uiDev.ListBox.prototype.cbSearch$ = function(it)
{
  this.m_cbSearch = it;
  return;
}
fan.uiDev.ListBox.prototype.mouseIsDown = function()
{
  return this.m_mouseIsDown;
}
fan.uiDev.ListBox.prototype.mouseIsDown$ = function(it)
{
  this.m_mouseIsDown = it;
  return;
}
fan.uiDev.ListBox.prototype.searchField = function()
{
  return this.m_searchField;
}
fan.uiDev.ListBox.prototype.searchField$ = function(it)
{
  this.m_searchField = it;
  return;
}
fan.uiDev.ListBox.prototype.m_focusable = false;
fan.uiDev.ListBox.prototype.m_selected = null;
fan.uiDev.ListBox.prototype.m_elems = null;
fan.uiDev.ListBox.prototype.m_selIndex = null;
fan.uiDev.ListBox.prototype.m_overIndex = null;
fan.uiDev.ListBox.prototype.m_cbSelect = null;
fan.uiDev.ListBox.prototype.m_cbElem = null;
fan.uiDev.ListBox.prototype.m_cbSearch = null;
fan.uiDev.ListBox.prototype.m_mouseIsDown = false;
fan.uiDev.ListBox.prototype.m_searchField = null;
fan.uiDev.ListBoxEvent = fan.sys.Obj.$extend(fan.sys.Obj);
fan.uiDev.ListBoxEvent.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.uiDev.ListBoxEvent.prototype.$typeof = function() { return fan.uiDev.ListBoxEvent.$type; }
fan.uiDev.ListBoxEvent.make = function(f) {
  var self = new fan.uiDev.ListBoxEvent();
  fan.uiDev.ListBoxEvent.make$(self,f);
  return self;
  }
fan.uiDev.ListBoxEvent.make$ = function(self,f)
{
  f.call(self);
  return;
}
fan.uiDev.ListBoxEvent.prototype.index = function()
{
  return this.m_index;
}
fan.uiDev.ListBoxEvent.prototype.index$ = function(it)
{
  this.m_index = it;
  return;
}
fan.uiDev.ListBoxEvent.prototype.item = function()
{
  return this.m_item;
}
fan.uiDev.ListBoxEvent.prototype.item$ = function(it)
{
  this.m_item = it;
  return;
}
fan.uiDev.ListBoxEvent.prototype.dom = function()
{
  return this.m_dom;
}
fan.uiDev.ListBoxEvent.prototype.dom$ = function(it)
{
  this.m_dom = it;
  return;
}
fan.uiDev.ListBoxEvent.prototype.isMouse = function()
{
  return this.m_dom.key() == null;
}
fan.uiDev.ListBoxEvent.prototype.isKey = function()
{
  return this.m_dom.key() != null;
}
fan.uiDev.ListBoxEvent.prototype.m_index = null;
fan.uiDev.ListBoxEvent.prototype.m_item = null;
fan.uiDev.ListBoxEvent.prototype.m_dom = null;
fan.uiDev.ListBoxElem = fan.sys.Obj.$extend(fan.dom.Elem);
fan.uiDev.ListBoxElem.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_visible = true;
  return;
}
fan.uiDev.ListBoxElem.prototype.$typeof = function() { return fan.uiDev.ListBoxElem.$type; }
fan.uiDev.ListBoxElem.make = function(index,item,content) {
  var self = new fan.uiDev.ListBoxElem();
  fan.uiDev.ListBoxElem.make$(self,index,item,content);
  return self;
  }
fan.uiDev.ListBoxElem.make$ = function(self,index,item,content)
{
  fan.dom.Elem.make$(self);
  ;
  self.m_index = index;
  self.m_item = (function($this) { var $_u131 = item; if ($_u131 == null) return null; return fan.sys.ObjUtil.toImmutable($_u131); })(self);
  self.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
  self.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  self.style().trap("paddingLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
  self.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px"]));
  self.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
  self.style().trap("userSelect",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  self.add(content);
  return;
}
fan.uiDev.ListBoxElem.prototype.setVisible = function(visible)
{
  this.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (visible) return "block"; return "none"; })(this)]));
  this.m_visible = visible;
  return;
}
fan.uiDev.ListBoxElem.prototype.visible = function()
{
  return this.m_visible;
}
fan.uiDev.ListBoxElem.prototype.visible$ = function(it)
{
  this.m_visible = it;
  return;
}
fan.uiDev.ListBoxElem.prototype.toStr = function()
{
  return fan.sys.ObjUtil.toStr(this.m_item);
}
fan.uiDev.ListBoxElem.prototype.m_index = 0;
fan.uiDev.ListBoxElem.prototype.m_item = null;
fan.uiDev.ListBoxElem.prototype.m_visible = false;
fan.uiDev.AutoPopup = fan.sys.Obj.$extend(fan.domkit.Popup);
fan.uiDev.AutoPopup.prototype.$ctor = function()
{
  fan.domkit.Popup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.AutoPopup.prototype.$typeof = function() { return fan.uiDev.AutoPopup.$type; }
fan.uiDev.AutoPopup.make = function(view,pattern) {
  var self = new fan.uiDev.AutoPopup();
  fan.uiDev.AutoPopup.make$(self,view,pattern);
  return self;
  }
fan.uiDev.AutoPopup.make$ = function(self,view,pattern)
{
  var $this = self;
  fan.domkit.Popup.make$(self);
  self.m_view = view;
  self.m_search = fan.misc.FuzzySearch.fromStr(pattern);
  self.m_input = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u36,
    function(it)
    {
      it.val$(pattern);
      it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
      it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
      it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["calc(100% - 20px)"]));
      it.onModify(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u36,
        function(it)
        {
          $this.onInputModify();
          return;
        }));
      return;
    })),fan.domkit.TextField.$type);
  self.m_listBox = fan.uiDev.ListBox.make(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u43,
    function(it)
    {
      it.m_focusable = false;
      it.style().trap("maxHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.uiDev.AutoPopup.m_resultsHeight,fan.sys.Obj.$type.toNullable())),"px")]));
      it.onElem(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u114,
        function(item)
        {
          return $this.onElem($this.m_search,item);
        }));
      it.onSelect(fan.sys.Func.make$closure(
        fan.uiDev.$clos$_u44,
        function(e)
        {
          if (e.isMouse())
          {
            $this.fireAction(e.m_item,e.m_dom);
          }
          ;
          return;
        }));
      return;
    }));
  self.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.uiDev.AutoPopup.m_popupWidth,fan.sys.Obj.$type.toNullable())),"px")]));
  self.style().trap("overflow",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
  self.add(self.m_input);
  self.add(self.m_listBox);
  self.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u35,
    function(e)
    {
      $this.onKeyDown(e);
      return;
    }));
  self.onOpen(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u133,
    function(it)
    {
      $this.m_input.focus();
      $this.onUpdate($this.m_search);
      return;
    }));
  self.onClose(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u133,
    function(it)
    {
      (function($this) { var $_u134 = fan.sys.ObjUtil.as(view,fan.uiDev.DevView.$type); if ($_u134 == null) return null; return $_u134.refocus(); })($this);
      return;
    }));
  return;
}
fan.uiDev.AutoPopup.prototype.show = function()
{
  var pos = this.m_view.pagePos();
  var size = this.m_view.size();
  this.open(fan.sys.Float.plus(pos.m_x,fan.sys.Float.divInt(fan.sys.Float.minusInt(size.m_w,fan.uiDev.AutoPopup.m_popupWidth),2)),pos.m_y);
  return;
}
fan.uiDev.AutoPopup.prototype.update = function(items)
{
  this.m_listBox.update(items);
  return;
}
fan.uiDev.AutoPopup.prototype.fireAction = function(item,event)
{
  this.close();
  if (item != null)
  {
    this.onAction(fan.sys.ObjUtil.coerce(item,fan.sys.Obj.$type),event);
  }
  ;
  return;
}
fan.uiDev.AutoPopup.prototype.onInputModify = function()
{
  this.m_search = fan.misc.FuzzySearch.fromStr(fan.sys.Str.trim(this.m_input.val()));
  this.onUpdate(this.m_search);
  return;
}
fan.uiDev.AutoPopup.prototype.onKeyDown = function(event)
{
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_up))
  {
    return this.onUp(event);
  }
  ;
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_down))
  {
    return this.onDown(event);
  }
  ;
  if (fan.sys.ObjUtil.equals(event.key(),fan.dom.Key.m_enter))
  {
    return this.onEnter(event);
  }
  ;
  return;
}
fan.uiDev.AutoPopup.prototype.onUp = function(event)
{
  this.m_listBox.onUp(event);
  return;
}
fan.uiDev.AutoPopup.prototype.onDown = function(event)
{
  this.m_listBox.onDown(event);
  return;
}
fan.uiDev.AutoPopup.prototype.onEnter = function(event)
{
  event.stop();
  this.fireAction(this.m_listBox.selected(),event);
  return;
}
fan.uiDev.AutoPopup.prototype.view = function()
{
  return this.m_view;
}
fan.uiDev.AutoPopup.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.uiDev.AutoPopup.prototype.input = function()
{
  return this.m_input;
}
fan.uiDev.AutoPopup.prototype.input$ = function(it)
{
  this.m_input = it;
  return;
}
fan.uiDev.AutoPopup.prototype.listBox = function()
{
  return this.m_listBox;
}
fan.uiDev.AutoPopup.prototype.listBox$ = function(it)
{
  this.m_listBox = it;
  return;
}
fan.uiDev.AutoPopup.prototype.search = function()
{
  return this.m_search;
}
fan.uiDev.AutoPopup.prototype.search$ = function(it)
{
  this.m_search = it;
  return;
}
fan.uiDev.AutoPopup.static$init = function()
{
  fan.uiDev.AutoPopup.m_popupWidth = 600;
  fan.uiDev.AutoPopup.m_resultsHeight = 300;
  return;
}
fan.uiDev.AutoPopup.m_popupWidth = 0;
fan.uiDev.AutoPopup.m_resultsHeight = 0;
fan.uiDev.AutoPopup.prototype.m_view = null;
fan.uiDev.AutoPopup.prototype.m_input = null;
fan.uiDev.AutoPopup.prototype.m_listBox = null;
fan.uiDev.AutoPopup.prototype.m_search = null;
fan.uiDev.GotoPopup = fan.sys.Obj.$extend(fan.uiDev.AutoPopup);
fan.uiDev.GotoPopup.prototype.$ctor = function()
{
  fan.uiDev.AutoPopup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.GotoPopup.prototype.$typeof = function() { return fan.uiDev.GotoPopup.$type; }
fan.uiDev.GotoPopup.make = function(main,start) {
  var self = new fan.uiDev.GotoPopup();
  fan.uiDev.GotoPopup.make$(self,main,start);
  return self;
  }
fan.uiDev.GotoPopup.make$ = function(self,main,start)
{
  fan.uiDev.AutoPopup.make$(self,main.m_view,start);
  self.m_main = main;
  return;
}
fan.uiDev.GotoPopup.prototype.onUpdate = function(search)
{
  var $this = this;
  var pattern = search.m_pattern;
  this.m_main.eval(fan.sys.Str.plus(fan.sys.Str.plus("devFuzzySearch(",fan.sys.Str.toCode(pattern)),")"),fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u135,
    function(grid)
    {
      var matches = fan.uiDev.DocRef.fromGrid(grid);
      var lineItem = $this.gotoLineItem(pattern);
      if (lineItem != null)
      {
        matches.insert(0,fan.sys.ObjUtil.coerce(lineItem,fan.uiDev.DocItem.$type));
      }
      ;
      $this.update(matches);
      return;
    }));
  return;
}
fan.uiDev.GotoPopup.prototype.gotoLineItem = function(pattern)
{
  if (fan.sys.Str.startsWith(pattern,":"))
  {
    pattern = fan.sys.Str.getRange(pattern,fan.sys.Range.make(1,-1));
  }
  ;
  var line = fan.sys.Str.toInt(pattern,10,false);
  if (line == null)
  {
    return null;
  }
  ;
  line = fan.sys.ObjUtil.coerce(fan.sys.Int.minus(fan.sys.ObjUtil.coerce(line,fan.sys.Int.$type),1),fan.sys.Int.$type.toNullable());
  if (fan.sys.ObjUtil.compareLT(line,0))
  {
    return null;
  }
  ;
  return fan.uiDev.GotoLineItem.make(this.m_main.m_state.m_doc,fan.codemirror.Pos.make(fan.sys.ObjUtil.coerce(line,fan.sys.Int.$type),0));
}
fan.uiDev.GotoPopup.prototype.onAction = function(item,event)
{
  this.m_main.goto(fan.sys.ObjUtil.coerce(item,fan.uiDev.DocItem.$type));
  return;
}
fan.uiDev.GotoPopup.prototype.onElem = function(search,obj)
{
  var $this = this;
  var item = fan.sys.ObjUtil.coerce(obj,fan.uiDev.DocItem.$type);
  var match = search.match(item.$name(),item);
  if (match == null)
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
      fan.uiDev.$clos$_u6,
      function(it)
      {
        it.text$(item.dis());
        return;
      })),fan.domkit.Label.$type);
  }
  ;
  return fan.uiDev.UiDevUtil.gotoItemElem(item,fan.sys.ObjUtil.coerce(match,fan.misc.FuzzyMatch.$type));
}
fan.uiDev.GotoPopup.prototype.main = function()
{
  return this.m_main;
}
fan.uiDev.GotoPopup.prototype.main$ = function(it)
{
  this.m_main = it;
  return;
}
fan.uiDev.GotoPopup.prototype.m_main = null;
fan.uiDev.GotoRecentPopup = fan.sys.Obj.$extend(fan.uiDev.GotoPopup);
fan.uiDev.GotoRecentPopup.prototype.$ctor = function()
{
  fan.uiDev.GotoPopup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.GotoRecentPopup.prototype.$typeof = function() { return fan.uiDev.GotoRecentPopup.$type; }
fan.uiDev.GotoRecentPopup.make = function(main) {
  var self = new fan.uiDev.GotoRecentPopup();
  fan.uiDev.GotoRecentPopup.make$(self,main);
  return self;
  }
fan.uiDev.GotoRecentPopup.make$ = function(self,main)
{
  fan.uiDev.GotoPopup.make$(self,main,"");
  self.m_main = main;
  return;
}
fan.uiDev.GotoRecentPopup.prototype.onUpdate = function(search)
{
  var $this = this;
  var matches = this.m_main.m_state.m_recent.findAll(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u74,
    function(item)
    {
      return search.match(item.$name(),item) != null;
    }));
  this.update(matches);
  return;
}
fan.uiDev.GotoRecentPopup.prototype.main = function()
{
  return this.m_main;
}
fan.uiDev.GotoRecentPopup.prototype.main$ = function(it)
{
  this.m_main = it;
  return;
}
fan.uiDev.GotoRecentPopup.prototype.m_main = null;
fan.uiDev.CommandsPopup = fan.sys.Obj.$extend(fan.uiDev.AutoPopup);
fan.uiDev.CommandsPopup.prototype.$ctor = function()
{
  fan.uiDev.AutoPopup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.CommandsPopup.prototype.$typeof = function() { return fan.uiDev.CommandsPopup.$type; }
fan.uiDev.CommandsPopup.make = function(view) {
  var self = new fan.uiDev.CommandsPopup();
  fan.uiDev.CommandsPopup.make$(self,view);
  return self;
  }
fan.uiDev.CommandsPopup.make$ = function(self,view)
{
  fan.uiDev.AutoPopup.make$(self,view,"");
  return;
}
fan.uiDev.CommandsPopup.prototype.onUpdate = function(search)
{
  var $this = this;
  var cmds = this.m_view.commands();
  cmds = fan.sys.ObjUtil.coerce(search.matchAll(cmds,fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u136,
    function(cmd)
    {
      return fan.sys.ObjUtil.coerce(cmd.dis(),fan.sys.Str.$type);
    }),fan.sys.Type.find("|sys::Obj->sys::Str|"))),fan.sys.Type.find("skyarc::CommandDef[]"));
  this.update(cmds);
  return;
}
fan.uiDev.CommandsPopup.prototype.onAction = function(item,event)
{
  var cmd = fan.sys.ObjUtil.coerce(item,fan.skyarc.CommandDef.$type);
  this.m_view.onCommand(cmd,event);
  return;
}
fan.uiDev.CommandsPopup.prototype.onElem = function(search,item)
{
  var cmd = fan.sys.ObjUtil.coerce(item,fan.skyarc.CommandDef.$type);
  var match = search.match(fan.sys.ObjUtil.coerce(cmd.dis(),fan.sys.Str.$type),cmd);
  var hotKeys = this.m_view.m_session.hotKeys().keysFor(cmd);
  return fan.uiDev.UiDevUtil.cmdItemElem(cmd,hotKeys,fan.sys.ObjUtil.coerce(match,fan.misc.FuzzyMatch.$type));
}
fan.uiDev.GotoViewPopup = fan.sys.Obj.$extend(fan.uiDev.AutoPopup);
fan.uiDev.GotoViewPopup.prototype.$ctor = function()
{
  fan.uiDev.AutoPopup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.uiDev.GotoViewPopup.prototype.$typeof = function() { return fan.uiDev.GotoViewPopup.$type; }
fan.uiDev.GotoViewPopup.make = function(view) {
  var self = new fan.uiDev.GotoViewPopup();
  fan.uiDev.GotoViewPopup.make$(self,view);
  return self;
  }
fan.uiDev.GotoViewPopup.make$ = function(self,view)
{
  fan.uiDev.AutoPopup.make$(self,view,"");
  return;
}
fan.uiDev.GotoViewPopup.prototype.onUpdate = function(search)
{
  var $this = this;
  var views = this.m_view.m_session.m_ns.views().findAll(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u137,
    function(v)
    {
      return v.app() != null;
    }));
  views = fan.sys.ObjUtil.coerce(search.matchAll(views,fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
    fan.uiDev.$clos$_u138,
    function(v)
    {
      return v.qdis();
    }),fan.sys.Type.find("|sys::Obj->sys::Str|"))),fan.sys.Type.find("skyarc::ViewDef[]"));
  this.update(views);
  return;
}
fan.uiDev.GotoViewPopup.prototype.onAction = function(item,event)
{
  var viewItem = fan.sys.ObjUtil.coerce(item,fan.skyarc.ViewDef.$type);
  this.m_view.gotoView(viewItem,event);
  return;
}
fan.uiDev.GotoViewPopup.prototype.onElem = function(search,item)
{
  var view = fan.sys.ObjUtil.coerce(item,fan.skyarc.ViewDef.$type);
  var match = search.match(view.qdis(),view);
  var icon = fan.pim.IconSpec.makeOutline(view.icon(),"#080");
  var elem = fan.uiDev.UiDevUtil.fuzzyMatchElem(fan.sys.ObjUtil.coerce(match,fan.misc.FuzzyMatch.$type),icon);
  elem.style().trap("padding",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["3px 0"]));
  return elem;
}
fan.uiDev.SideBarBox = fan.sys.Obj.$extend(fan.domkit.SashBox);
fan.uiDev.SideBarBox.prototype.$ctor = function()
{
  fan.domkit.SashBox.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_divSize = 8;
  this.m_shown = false;
  this.m_lastSideSizePercent = 25;
  return;
}
fan.uiDev.SideBarBox.prototype.$typeof = function() { return fan.uiDev.SideBarBox.$type; }
fan.uiDev.SideBarBox.make = function(main,side,sideDir) {
  var self = new fan.uiDev.SideBarBox();
  fan.uiDev.SideBarBox.make$(self,main,side,sideDir);
  return self;
  }
fan.uiDev.SideBarBox.make$ = function(self,main,side,sideDir)
{
  fan.domkit.SashBox.make$(self);
  ;
  self.m_main = main;
  self.m_side = side;
  self.m_divElem = fan.domkit.SashBox.div();
  self.m_sideDir = sideDir;
  var $_u139 = sideDir;
  if (fan.sys.ObjUtil.equals($_u139,fan.domkit.Dir.m_up) || fan.sys.ObjUtil.equals($_u139,fan.domkit.Dir.m_down))
  {
    self.dir$(fan.domkit.Dir.m_down);
  }
  else if (fan.sys.ObjUtil.equals($_u139,fan.domkit.Dir.m_left) || fan.sys.ObjUtil.equals($_u139,fan.domkit.Dir.m_right))
  {
    self.dir$(fan.domkit.Dir.m_right);
  }
  ;
  self.resizable$(false);
  self.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%"]));
  self.add(main);
  return;
}
fan.uiDev.SideBarBox.prototype.show = function(shown)
{
  if (fan.sys.ObjUtil.equals(this.m_shown,shown))
  {
    return this;
  }
  ;
  this.m_shown = shown;
  if (!shown)
  {
    this.m_lastSideSizePercent = this.curSideSizePercent();
    this.remove(this.m_divElem);
    this.remove(this.m_side);
    this.resizable$(false);
    this.sizes$(fan.sys.List.make(fan.sys.Str.$type, ["100%"]));
    return this;
  }
  ;
  var sidePercent = fan.sys.Int.max(fan.sys.Int.min(this.m_lastSideSizePercent,90),10);
  var mainPercent = fan.sys.Int.minus(100,sidePercent);
  var $_u140 = this.m_sideDir;
  if (fan.sys.ObjUtil.equals($_u140,fan.domkit.Dir.m_up) || fan.sys.ObjUtil.equals($_u140,fan.domkit.Dir.m_left))
  {
    this.insertChildBefore(this.m_divElem,this.m_main);
    this.insertChildBefore(this.m_side,this.m_divElem);
    this.sizes$(fan.sys.List.make(fan.sys.Str.$type, [fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(sidePercent,fan.sys.Obj.$type.toNullable())),"%"),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(this.m_divSize,fan.sys.Obj.$type.toNullable())),"px"),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(mainPercent,fan.sys.Obj.$type.toNullable())),"%")]));
  }
  else if (fan.sys.ObjUtil.equals($_u140,fan.domkit.Dir.m_down) || fan.sys.ObjUtil.equals($_u140,fan.domkit.Dir.m_right))
  {
    this.add(this.m_divElem);
    this.add(this.m_side);
    this.sizes$(fan.sys.List.make(fan.sys.Str.$type, [fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(mainPercent,fan.sys.Obj.$type.toNullable())),"%"),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(this.m_divSize,fan.sys.Obj.$type.toNullable())),"px"),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(sidePercent,fan.sys.Obj.$type.toNullable())),"%")]));
  }
  ;
  this.resizable$(true);
  return this;
}
fan.uiDev.SideBarBox.prototype.curSideSizePercent = function()
{
  try
  {
    return fan.sys.Int.div(fan.sys.Int.mult(this.dirSize(this.m_side.size()),100),this.dirSize(this.size()));
  }
  catch ($_u141)
  {
    $_u141 = fan.sys.Err.make($_u141);
    if ($_u141 instanceof fan.sys.Err)
    {
      var e = $_u141;
      var e;
      return 25;
    }
    else
    {
      throw $_u141;
    }
  }
  ;
}
fan.uiDev.SideBarBox.prototype.dirSize = function(size)
{
  return (function($this) { if (fan.sys.ObjUtil.equals($this.dir(),fan.domkit.Dir.m_down)) return fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(size.m_h,fan.sys.Num.$type)); return fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(size.m_w,fan.sys.Num.$type)); })(this);
}
fan.uiDev.SideBarBox.prototype.main = function()
{
  return this.m_main;
}
fan.uiDev.SideBarBox.prototype.main$ = function(it)
{
  this.m_main = it;
  return;
}
fan.uiDev.SideBarBox.prototype.side = function()
{
  return this.m_side;
}
fan.uiDev.SideBarBox.prototype.side$ = function(it)
{
  this.m_side = it;
  return;
}
fan.uiDev.SideBarBox.prototype.divElem = function()
{
  return this.m_divElem;
}
fan.uiDev.SideBarBox.prototype.divElem$ = function(it)
{
  this.m_divElem = it;
  return;
}
fan.uiDev.SideBarBox.prototype.sideDir = function()
{
  return this.m_sideDir;
}
fan.uiDev.SideBarBox.prototype.sideDir$ = function(it)
{
  this.m_sideDir = it;
  return;
}
fan.uiDev.SideBarBox.prototype.divSize = function()
{
  return this.m_divSize;
}
fan.uiDev.SideBarBox.prototype.divSize$ = function(it)
{
  this.m_divSize = it;
  return;
}
fan.uiDev.SideBarBox.prototype.shown = function()
{
  return this.m_shown;
}
fan.uiDev.SideBarBox.prototype.shown$ = function(it)
{
  this.m_shown = it;
  return;
}
fan.uiDev.SideBarBox.prototype.lastSideSizePercent = function()
{
  return this.m_lastSideSizePercent;
}
fan.uiDev.SideBarBox.prototype.lastSideSizePercent$ = function(it)
{
  this.m_lastSideSizePercent = it;
  return;
}
fan.uiDev.SideBarBox.prototype.m_main = null;
fan.uiDev.SideBarBox.prototype.m_side = null;
fan.uiDev.SideBarBox.prototype.m_divElem = null;
fan.uiDev.SideBarBox.prototype.m_sideDir = null;
fan.uiDev.SideBarBox.prototype.m_divSize = 0;
fan.uiDev.SideBarBox.prototype.m_shown = false;
fan.uiDev.SideBarBox.prototype.m_lastSideSizePercent = 0;
fan.uiDev.$pod = fan.sys.Pod.$add('uiDev');
with (fan.uiDev.$pod)
{
  fan.uiDev.DevMain.$type = $at('DevMain','domkit::FlexBox',[],{'sys::Js':""},128);
  fan.uiDev.DevView.$type = $at('DevView','ui::UiView',[],{'sys::Js':""},8192);
  fan.uiDev.DocItem.$type = $am('DocItem','sys::Obj',[],{'sys::Js':""},387);
  fan.uiDev.Document.$type = $at('Document','sys::Obj',['uiDev::DocItem'],{'sys::Js':""},131);
  fan.uiDev.RecDoc.$type = $at('RecDoc','uiDev::Document',[],{'sys::Js':""},130);
  fan.uiDev.FileDoc.$type = $at('FileDoc','uiDev::Document',[],{'sys::Js':""},130);
  fan.uiDev.DocRef.$type = $at('DocRef','sys::Obj',['uiDev::DocItem'],{'sys::Js':""},130);
  fan.uiDev.DocPos.$type = $at('DocPos','sys::Obj',['uiDev::DocItem'],{'sys::Js':""},130);
  fan.uiDev.GotoLineItem.$type = $at('GotoLineItem','uiDev::DocPos',[],{'sys::Js':""},130);
  fan.uiDev.DocErrPos.$type = $at('DocErrPos','uiDev::DocPos',[],{'sys::Js':""},130);
  fan.uiDev.DocMark.$type = $at('DocMark','uiDev::DocPos',[],{'sys::Js':""},130);
  fan.uiDev.DevDocItem.$type = $at('DevDocItem','sys::Obj',['uiDev::DocItem'],{'sys::Js':""},130);
  fan.uiDev.BlankDoc.$type = $at('BlankDoc','uiDev::Document',[],{'sys::Js':""},130);
  fan.uiDev.NotFoundDoc.$type = $at('NotFoundDoc','uiDev::Document',[],{'sys::Js':""},130);
  fan.uiDev.DevPane.$type = $at('DevPane','domkit::Box',[],{'sys::Js':""},129);
  fan.uiDev.CmdBarPane.$type = $at('CmdBarPane','uiDev::DevPane',[],{'sys::Js':""},128);
  fan.uiDev.CmdButton.$type = $at('CmdButton','domkit::Button',[],{'sys::Js':""},128);
  fan.uiDev.AbstractToolPane.$type = $at('AbstractToolPane','uiDev::DevPane',[],{'sys::Js':""},129);
  fan.uiDev.BuildPane.$type = $at('BuildPane','uiDev::AbstractToolPane',[],{'sys::Js':""},128);
  fan.uiDev.StatusPane.$type = $at('StatusPane','uiDev::DevPane',[],{'sys::Js':""},128);
  fan.uiDev.ToolPane.$type = $at('ToolPane','uiDev::DevPane',[],{'sys::Js':""},128);
  fan.uiDev.ToolType.$type = $at('ToolType','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},170);
  fan.uiDev.ContentPane.$type = $at('ContentPane','uiDev::DevPane',[],{'sys::Js':""},128);
  fan.uiDev.AbstractContentPane.$type = $at('AbstractContentPane','uiDev::DevPane',[],{'sys::Js':""},129);
  fan.uiDev.DevBlankPane.$type = $at('DevBlankPane','uiDev::AbstractContentPane',[],{'sys::Js':""},128);
  fan.uiDev.NotFoundPane.$type = $at('NotFoundPane','uiDev::AbstractContentPane',[],{'sys::Js':""},128);
  fan.uiDev.FindPane.$type = $at('FindPane','uiDev::AbstractToolPane',[],{'sys::Js':""},128);
  fan.uiDev.NavPane.$type = $at('NavPane','uiDev::DevPane',[],{'sys::Js':""},128);
  fan.uiDev.CodePane.$type = $at('CodePane','uiDev::AbstractContentPane',[],{'sys::Js':""},128);
  fan.uiDev.MarksPane.$type = $at('MarksPane','uiDev::DevPane',[],{'sys::Js':""},128);
  fan.uiDev.DocsPane.$type = $at('DocsPane','uiDev::AbstractToolPane',[],{'sys::Js':""},128);
  fan.uiDev.Cmd.$type = $at('Cmd','sys::Obj',[],{'sys::Js':""},131);
  fan.uiDev.Cmds.$type = $at('Cmds','sys::Obj',[],{'sys::Js':""},130);
  fan.uiDev.CommandsCmd.$type = $at('CommandsCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.FindCmd.$type = $at('FindCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.ToggleSidebarCmd.$type = $at('ToggleSidebarCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.HideToolsCmd.$type = $at('HideToolsCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.DocsCmd.$type = $at('DocsCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.ReloadCmd.$type = $at('ReloadCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.SaveCmd.$type = $at('SaveCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.BuildCmd.$type = $at('BuildCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.MarkPrevCmd.$type = $at('MarkPrevCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.MarkNextCmd.$type = $at('MarkNextCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.CodeMirrorCmd.$type = $at('CodeMirrorCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.GotoCmd.$type = $at('GotoCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.GotoRecentCmd.$type = $at('GotoRecentCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.NewCmd.$type = $at('NewCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.EditCmd.$type = $at('EditCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.TrashCmd.$type = $at('TrashCmd','uiDev::Cmd',[],{'sys::Js':""},130);
  fan.uiDev.DevState.$type = $at('DevState','sys::Obj',[],{'sys::Js':""},130);
  fan.uiDev.DevStateEvent.$type = $at('DevStateEvent','sys::Obj',[],{'sys::Js':""},130);
  fan.uiDev.DevOp.$type = $at('DevOp','sys::Obj',[],{'sys::Js':""},129);
  fan.uiDev.FetchOp.$type = $at('FetchOp','uiDev::DevOp',[],{'sys::Js':""},129);
  fan.uiDev.InitOp.$type = $at('InitOp','uiDev::FetchOp',[],{'sys::Js':""},128);
  fan.uiDev.UnloadOp.$type = $at('UnloadOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.UpdateOp.$type = $at('UpdateOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.GotoOp.$type = $at('GotoOp','uiDev::FetchOp',[],{'sys::Js':""},128);
  fan.uiDev.CurMarkOp.$type = $at('CurMarkOp','uiDev::GotoOp',[],{'sys::Js':""},128);
  fan.uiDev.FuncNewOp.$type = $at('FuncNewOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.FuncEditOp.$type = $at('FuncEditOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.FuncTrashOp.$type = $at('FuncTrashOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.FuncCheckOp.$type = $at('FuncCheckOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.SaveOp.$type = $at('SaveOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.FindOp.$type = $at('FindOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.FindInFuncsOp.$type = $at('FindInFuncsOp','uiDev::FindOp',[],{'sys::Js':""},128);
  fan.uiDev.DocsOp.$type = $at('DocsOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.BuildOp.$type = $at('BuildOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.HideToolsOp.$type = $at('HideToolsOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.SetMarkersOp.$type = $at('SetMarkersOp','uiDev::DevOp',[],{'sys::Js':""},128);
  fan.uiDev.Funcs.$type = $at('Funcs','sys::Obj',[],{'sys::Js':""},130);
  fan.uiDev.MarkerSelector.$type = $at('MarkerSelector','domkit::Button',[],{'sys::Js':""},128);
  fan.uiDev.MarkerSelectorPopup.$type = $at('MarkerSelectorPopup','domkit::Popup',[],{'sys::Js':""},128);
  fan.uiDev.SymbolInput.$type = $at('SymbolInput','ui::Input',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.uiDev.SymbolListInput.$type = $at('SymbolListInput','uiDev::SymbolInput',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.uiDev.AutoField.$type = $at('AutoField','sys::Obj',[],{'sys::NoDoc':"",'sys::Js':""},8193);
  fan.uiDev.SymbolAutoField.$type = $at('SymbolAutoField','uiDev::AutoField',[],{'sys::Js':""},128);
  fan.uiDev.AdminFuncNameListInput.$type = $at('AdminFuncNameListInput','ui::Input',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.uiDev.AdminFuncNameAutoField.$type = $at('AdminFuncNameAutoField','uiDev::AutoField',[],{'sys::Js':""},128);
  fan.uiDev.UiDevUtil.$type = $at('UiDevUtil','sys::Obj',[],{'sys::Js':""},128);
  fan.uiDev.DevIcon.$type = $at('DevIcon','sys::Obj',[],{'sys::Js':""},8194);
  fan.uiDev.ListBox.$type = $at('ListBox','domkit::Box',[],{'sys::Js':""},128);
  fan.uiDev.ListBoxEvent.$type = $at('ListBoxEvent','sys::Obj',[],{'sys::Js':""},128);
  fan.uiDev.ListBoxElem.$type = $at('ListBoxElem','dom::Elem',[],{'sys::Js':""},128);
  fan.uiDev.AutoPopup.$type = $at('AutoPopup','domkit::Popup',[],{'sys::Js':""},129);
  fan.uiDev.GotoPopup.$type = $at('GotoPopup','uiDev::AutoPopup',[],{'sys::Js':""},128);
  fan.uiDev.GotoRecentPopup.$type = $at('GotoRecentPopup','uiDev::GotoPopup',[],{'sys::Js':""},128);
  fan.uiDev.CommandsPopup.$type = $at('CommandsPopup','uiDev::AutoPopup',[],{'sys::Js':""},128);
  fan.uiDev.GotoViewPopup.$type = $at('GotoViewPopup','uiDev::AutoPopup',[],{'sys::Js':""},128);
  fan.uiDev.SideBarBox.$type = $at('SideBarBox','domkit::SashBox',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.uiDev.DevMain.$type.$af('state',73728,'uiDev::DevState',{}).$af('view',65664,'uiDev::DevView',{}).$af('cmdBar',73728,'uiDev::CmdBarPane',{}).$af('content',73728,'uiDev::ContentPane',{}).$af('nav',73728,'uiDev::NavPane',{}).$af('tool',73728,'uiDev::ToolPane',{}).$af('status',73728,'uiDev::StatusPane',{}).$af('navSplit',67584,'uiDev::SideBarBox',{}).$af('toolSplit',67584,'uiDev::SideBarBox',{}).$af('keyHandler',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','uiDev::DevView',false)]),{}).$am('onUpdate',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newState','uiDev::DevState',false)]),{}).$am('goto',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('opts','sys::Obj?',true)]),{}).$am('funcNew',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('proto','haystack::Dict?',false)]),{}).$am('funcEdit',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('funcTrash',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('funcCheck',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('flashOk','sys::Bool',false)]),{}).$am('setDirty',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clearDirty',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('find','misc::TextSearch?',true)]),{}).$am('findInFuncs',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('find','misc::TextSearch?',true)]),{}).$am('docs',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('word','sys::Str?',false)]),{}).$am('build',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hideTools',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toggleNav',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('save',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onDone','|->sys::Void|?',true)]),{}).$am('reload',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clearMarks',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('setMarks',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('marks','uiDev::DocItem[]',false)]),{}).$am('prevMark',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('nextMark',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refocus',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('eachPane',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|uiDev::DevPane->sys::Void|',false)]),{}).$am('eval',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('expr','sys::Str',false),new fan.sys.Param('onOk','|haystack::Grid->sys::Void|',false)]),{}).$am('invokeAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('extraMeta','sys::Obj?',true),new fan.sys.Param('onOk','|haystack::Grid->sys::Void|?',true)]),{}).$am('action',128,'ui::UiAction',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('extraMeta','sys::Obj?',true),new fan.sys.Param('onOk','|haystack::Grid->sys::Void|?',true)]),{}).$am('flash',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false)]),{}).$am('session',128,'ui::UiSession',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DevView.$type.$af('main',67584,'uiDev::DevMain?',{}).$af('codeMirrorLoaded',67584,'sys::Bool',{}).$af('retryUpdate',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sel',271360,'haystack::Dict[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onBeforeUnload',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cb','sys::Func',false)]),{}).$am('commands',271360,'skyarc::CommandDef[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onCommand',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false),new fan.sys.Param('event','dom::Event',false)]),{}).$am('focusView',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onDevStateUpdate',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('state','uiDev::DevState',false)]),{}).$am('varToState',2048,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('stateToVar',2048,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('refocus',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DocItem.$type.$af('none',106498,'uiDev::DocItem[]',{}).$am('uri',270337,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',270337,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',270337,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dis',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isErr',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('isSpan',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pos',270336,'codemirror::Pos?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('endPos',270336,'codemirror::Pos?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.Document.$type.$am('load',40966,'uiDev::Document?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('res','haystack::Dict',false)]),{}).$am('uri',271361,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',271361,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',271361,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('text',270337,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isBlank',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isNotFound',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pos',9216,'codemirror::Pos?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('endPos',9216,'codemirror::Pos?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isRec',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('rec',270336,'haystack::Dict?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isFile',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isDir',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.RecDoc.$type.$af('uri',336898,'sys::Uri',{}).$af('name',336898,'sys::Str',{}).$af('recRef',67586,'haystack::Dict',{}).$am('idToUri',40962,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('id','haystack::Ref',false)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','haystack::Dict',false)]),{}).$am('text',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',271360,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isRec',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('rec',271360,'haystack::Dict?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isFile',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isDir',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.FileDoc.$type.$af('meta',73730,'haystack::Dict',{}).$af('uri',336898,'sys::Uri',{}).$af('icon',336898,'pim::IconSpec',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('meta','haystack::Dict',false)]),{}).$am('name',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('text',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DocRef.$type.$af('meta',73730,'haystack::Dict',{}).$af('uri',336898,'sys::Uri',{}).$af('name',336898,'sys::Str',{}).$af('icon',336898,'pim::IconSpec',{}).$am('fromGrid',40962,'uiDev::DocItem[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false)]),{}).$am('makeDict',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('meta','haystack::Dict',false)]),{}).$am('makeDoc',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('doc','uiDev::Document',false)]),{});
  fan.uiDev.DocPos.$type.$af('item',73730,'uiDev::DocItem',{}).$af('pos',336898,'codemirror::Pos?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('pos','codemirror::Pos',false)]),{}).$am('endPos',271360,'codemirror::Pos?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dis',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('uri',271360,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',271360,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.GotoLineItem.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('pos','codemirror::Pos',false)]),{}).$am('dis',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DocErrPos.$type.$af('msg',73730,'sys::Str?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('pos','codemirror::Pos',false),new fan.sys.Param('msg','sys::Str',false)]),{}).$am('isErr',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',271360,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dis',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DocMark.$type.$af('endPos',336898,'codemirror::Pos?',{}).$af('msg',73730,'sys::Str?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('pos','codemirror::Pos',false),new fan.sys.Param('endPos','codemirror::Pos',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('dis',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DevDocItem.$type.$af('blankUri',106498,'sys::Uri',{}).$af('uri',336898,'sys::Uri',{}).$af('icon',336898,'pim::IconSpec',{}).$am('makeBlank',40962,'uiDev::DevDocItem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('icon','pim::IconSpec',false)]),{}).$am('name',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.BlankDoc.$type.$am('uri',271360,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',271360,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('text',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isBlank',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.NotFoundDoc.$type.$af('uri',336898,'sys::Uri',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('name',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',271360,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('text',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isNotFound',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DevPane.$type.$af('main',73728,'uiDev::DevMain',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('state',8192,'uiDev::DevState',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{});
  fan.uiDev.CmdBarPane.$type.$af('buttons',73728,'uiDev::CmdButton[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{});
  fan.uiDev.CmdButton.$type.$af('main',73728,'uiDev::DevMain',{}).$af('cmd',73730,'uiDev::Cmd',{}).$am('makeIcon',40962,'uiDev::CmdButton',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false),new fan.sys.Param('cmd','uiDev::Cmd',false)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false),new fan.sys.Param('cmd','uiDev::Cmd',false)]),{}).$am('updateEnable',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.AbstractToolPane.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('type',270337,'uiDev::ToolType',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('init',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('toolbar','dom::Elem',false),new fan.sys.Param('body','dom::Elem',false)]),{}).$am('refocus',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.BuildPane.$type.$af('marksPane',73728,'uiDev::MarksPane',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('type',271360,'uiDev::ToolType',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{});
  fan.uiDev.StatusPane.$type.$af('timeoutId',67584,'sys::Int?',{}).$af('isClear',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('clear',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('flash',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('icon','pim::IconSpec',false),new fan.sys.Param('text','sys::Str',false)]),{}).$am('show',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('icon','pim::IconSpec',false),new fan.sys.Param('text','sys::Str',false),new fan.sys.Param('timeout','sys::Duration?',true)]),{}).$am('onTimeout',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.ToolPane.$type.$af('cur',67584,'uiDev::AbstractToolPane?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('updateToolPane',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refocus',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.ToolType.$type.$af('find',106506,'uiDev::ToolType',{}).$af('docs',106506,'uiDev::ToolType',{}).$af('build',106506,'uiDev::ToolType',{}).$af('vals',106498,'uiDev::ToolType[]',{}).$af('dis',73730,'sys::Str',{}).$af('paneType',73730,'sys::Type',{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false),new fan.sys.Param('dis','sys::Str',false),new fan.sys.Param('paneType','sys::Type',false)]),{}).$am('makePane',8192,'uiDev::AbstractToolPane',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('fromStr',40966,'uiDev::ToolType?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.ContentPane.$type.$af('cur',67584,'uiDev::AbstractContentPane?',{}).$af('devBlank',67584,'uiDev::DevBlankPane',{}).$af('notFound',67584,'uiDev::NotFoundPane',{}).$af('code',67584,'uiDev::CodePane',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('refocus',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curText',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curWord',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curSelection',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curSelectionOrWord',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onGoto',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false)]),{}).$am('onInsertUnit',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('init',2048,'uiDev::AbstractContentPane',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pane','uiDev::AbstractContentPane',false)]),{}).$am('select',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pane','uiDev::AbstractContentPane',false)]),{});
  fan.uiDev.AbstractContentPane.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('refocus',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curText',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curWord',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curSelection',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curSelectionOrWord',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onGoto',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false)]),{}).$am('onInsertUnit',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DevBlankPane.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('makeCmdHelp',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cmd','uiDev::Cmd',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{});
  fan.uiDev.NotFoundPane.$type.$af('docName',67584,'domkit::Label',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{});
  fan.uiDev.FindPane.$type.$af('pattern',73728,'domkit::TextField',{}).$af('matchCase',73728,'domkit::ToggleButton',{}).$af('matchWord',73728,'domkit::ToggleButton',{}).$af('regex',73728,'domkit::ToggleButton',{}).$af('prev',73728,'uiDev::CmdButton',{}).$af('next',73728,'uiDev::CmdButton',{}).$af('count',73728,'domkit::Label',{}).$af('marksPane',73728,'uiDev::MarksPane',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('makeField',2048,'domkit::TextField',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeToggle',2048,'domkit::ToggleButton',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('symbol','sys::Str',false),new fan.sys.Param('tip','sys::Str',false)]),{}).$am('type',271360,'uiDev::ToolType',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onFind',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('inAll','sys::Bool',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('toCountText',34818,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','uiDev::DevState',false)]),{}).$am('refocus',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.NavPane.$type.$af('selector',67584,'uiDev::MarkerSelector',{}).$af('listBox',67584,'uiDev::ListBox',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('updateItems',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('updateSelected',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.CodePane.$type.$af('cm',67584,'ui::TextEditor?',{}).$af('caretMemory',67584,'[sys::Uri:codemirror::Pos]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('mountCodeMirror',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onModify',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refocus',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curText',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curWord',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('curSelection',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onGoto',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('updateMarks',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('selectCurMark',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('saveCaret',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('restoreCaret',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.MarksPane.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('showMarks',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DocsPane.$type.$af('listBox',73728,'uiDev::ListBox',{}).$af('docPane',73728,'domkit::Box',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('type',271360,'uiDev::ToolType',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','uiDev::DevStateEvent',false)]),{}).$am('onUpdateDocSymbol',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onShow',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','skyarc::FuncDef?',false)]),{}).$am('docToHtml',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','skyarc::FuncDef?',false)]),{});
  fan.uiDev.Cmd.$type.$af('def',73730,'skyarc::CommandDef',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dis',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('disToolbar',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',8192,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('enable',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('isCodeMirror',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cmName',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('invoke',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('isPopup',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onPopup',270336,'domkit::Popup',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('toStr',9216,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.Cmds.$type.$af('list',73730,'uiDev::Cmd[]',{}).$af('map',67586,'[sys::Str:uiDev::Cmd]',{}).$am('boot',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ns','skyarc::SysNamespace',false)]),{}).$am('get',8192,'uiDev::Cmd?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{});
  fan.uiDev.CommandsCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.FindCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.ToggleSidebarCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.HideToolsCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('disToolbar',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('enable',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.DocsCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.ReloadCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.SaveCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('enable',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.BuildCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.MarkPrevCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('enable',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.MarkNextCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('enable',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.CodeMirrorCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.GotoCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.GotoRecentCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.NewCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('isPopup',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onPopup',271360,'domkit::Popup',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.EditCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('enable',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.TrashCmd.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','skyarc::CommandDef',false)]),{}).$am('enable',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('invoke',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{});
  fan.uiDev.DevState.$type.$af('ns',73730,'skyarc::SysNamespace',{}).$af('uri',73730,'sys::Uri',{}).$af('doc',73730,'uiDev::Document',{}).$af('recent',73730,'uiDev::DocItem[]',{}).$af('dirty',73730,'sys::Bool',{}).$af('marks',73730,'uiDev::DocItem[]',{}).$af('curMark',73730,'sys::Int',{}).$af('cmds',73730,'uiDev::Cmds',{}).$af('funcs',73730,'uiDev::Funcs',{}).$af('markers',73730,'sys::Str[]',{}).$af('showNav',73730,'sys::Str',{}).$af('showTool',73730,'sys::Str',{}).$af('find',73730,'misc::TextSearch',{}).$af('docSymbol',73730,'sys::Str',{}).$am('boot',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ns','skyarc::SysNamespace',false)]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('errs',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isShowNav',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isShowTool',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('update',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('changes','[sys::Str:sys::Obj?]',false)]),{}).$am('checkRecent',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('changes','[sys::Str:sys::Obj?]',false)]),{}).$am('checkUri',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('warn',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('valToStr',34818,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('eachField',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Field,sys::Obj?->sys::Void|',false)]),{});
  fan.uiDev.DevStateEvent.$type.$af('content',73730,'sys::Bool',{}).$af('funcs',73730,'sys::Bool',{}).$af('showNav',73730,'sys::Bool',{}).$af('showTool',73730,'sys::Bool',{}).$af('find',73730,'sys::Bool',{}).$af('docSymbol',73730,'sys::Bool',{}).$af('marks',73730,'sys::Bool',{}).$af('curMark',73730,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','uiDev::DevState',false),new fan.sys.Param('b','uiDev::DevState',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DevOp.$type.$af('mainRef',67584,'uiDev::DevMain?',{}).$am('main',8192,'uiDev::DevMain',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('state',8192,'uiDev::DevState',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('run',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onRun',266241,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('update',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('changes','[sys::Str:sys::Obj?]',false)]),{}).$am('eval',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('expr','sys::Str',false),new fan.sys.Param('onOk','|haystack::Grid->sys::Void|',false)]),{}).$am('fetchToChanges',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('changes','[sys::Str:sys::Obj?]',false),new fan.sys.Param('data','haystack::Dict',false)]),{}).$am('confirmSave',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('showConfirmSave',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onDone','|->sys::Void|',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.FetchOp.$type.$af('changes',73728,'[sys::Str:sys::Obj?]',{}).$af('data',73728,'haystack::Dict?',{}).$am('fetch',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('req',270337,'haystack::Dict',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onFetch',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.InitOp.$type.$af('vars',67584,'[sys::Str:sys::Obj?]',{}).$af('uri',67584,'sys::Uri',{}).$af('markers',67584,'sys::Str[]',{}).$af('showNav',67584,'sys::Str',{}).$af('showTool',67584,'sys::Str',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('vars','[sys::Str:sys::Obj?]',false)]),{}).$am('req',271360,'haystack::Dict',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onFetch',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.UnloadOp.$type.$af('cb',73728,'sys::Func',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cb','sys::Func',false)]),{}).$am('confirmSave',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.UpdateOp.$type.$af('changes',67584,'[sys::Str:sys::Obj?]',{}).$am('setDirty',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clearDirty',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('marks',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('marks','uiDev::DocItem[]',false)]),{}).$am('showNav',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('showNav','sys::Str',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.GotoOp.$type.$af('reload',106498,'haystack::Dict',{}).$af('refreshNav',106498,'haystack::Dict',{}).$af('reloadAndRefreshNav',106498,'haystack::Dict',{}).$af('item',67584,'uiDev::DocItem',{}).$af('opts',67584,'haystack::Dict',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('opts','sys::Obj?',true)]),{}).$am('isNewUri',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('confirmSave',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('req',271360,'haystack::Dict',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.CurMarkOp.$type.$af('curMark',73730,'sys::Int',{}).$am('prev',40962,'uiDev::CurMarkOp?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('state','uiDev::DevState',false)]),{}).$am('next',40962,'uiDev::CurMarkOp?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('state','uiDev::DevState',false)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('curMark','sys::Int',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.FuncNewOp.$type.$af('proto',73730,'haystack::Dict?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('proto','haystack::Dict?',false)]),{}).$am('confirmSave',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.FuncEditOp.$type.$am('confirmSave',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.FuncTrashOp.$type.$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.FuncCheckOp.$type.$af('flashOk',73730,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('flashOk','sys::Bool',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('buildOk',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('buildErr',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('pos','codemirror::Pos',false)]),{});
  fan.uiDev.SaveOp.$type.$af('onDone',67584,'|->sys::Void|?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onDone','|->sys::Void|?',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.FindOp.$type.$af('find',73730,'misc::TextSearch',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('find','misc::TextSearch',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findDone',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('marks','uiDev::DocItem[]',false)]),{});
  fan.uiDev.FindInFuncsOp.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('find','misc::TextSearch',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DocsOp.$type.$af('word',73730,'sys::Str?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('word','sys::Str?',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.BuildOp.$type.$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.HideToolsOp.$type.$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.SetMarkersOp.$type.$af('selected',73730,'sys::Str[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selected','sys::Str[]',false)]),{}).$am('onRun',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.Funcs.$type.$af('list',73730,'uiDev::DocRef[]',{}).$af('markers',73730,'sys::Str[]',{}).$am('boot',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('load',40966,'uiDev::Funcs?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('data','haystack::Dict',false)]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','haystack::Grid',false),new fan.sys.Param('markers','sys::Str[]?',false)]),{}).$am('show',8192,'uiDev::DocRef[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selected','sys::Str[]',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.MarkerSelector.$type.$af('markers',73728,'sys::Str[]',{}).$af('selected',73728,'sys::Str[]',{}).$af('allName',106498,'sys::Str',{}).$af('cbModify',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('update',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('markers','sys::Str[]',false),new fan.sys.Param('selected','sys::Str[]?',false)]),{}).$am('isAll',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isSelected',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('m','sys::Str',false)]),{}).$am('onModify',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireModified',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selected','sys::Str[]',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.MarkerSelectorPopup.$type.$af('selector',67584,'uiDev::MarkerSelector',{}).$af('all',67584,'domkit::ToggleButton',{}).$af('markers',67584,'domkit::ToggleButton[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','uiDev::MarkerSelector',false)]),{}).$am('makeButton',2048,'domkit::Button',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('selected','sys::Bool',false)]),{}).$am('onToggle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','domkit::ToggleButton',false),new fan.sys.Param('event','dom::Event',false)]),{}).$am('eachToggle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::ToggleButton->sys::Void|',false)]),{});
  fan.uiDev.SymbolInput.$type.$af('field',65664,'domkit::TextField',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRO',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj',false)]),{}).$am('onSave',267264,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.SymbolListInput.$type.$am('onLoad',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj',false)]),{}).$am('onSave',267264,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.AutoField.$type.$af('_onModify',67584,'|domkit::TextField->sys::Void|?',{}).$af('field',67584,'domkit::TextField?',{}).$af('search',67584,'misc::FuzzySearch',{}).$af('bodyMask',67584,'dom::Elem?',{}).$af('hints',67584,'uiDev::ListBox?',{}).$am('apply',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('field','domkit::TextField',false)]),{}).$am('allItems',270337,'sys::Obj[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('icon',270337,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('itemToStr',270337,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('onElem',270336,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false),new fan.sys.Param('item','sys::Obj',false)]),{}).$am('onModify',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::TextField->sys::Void|',false)]),{}).$am('fireOnModify',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onKeyDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onUp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onEnter',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onSelect',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj?',false)]),{}).$am('showHints',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isOpen',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('open',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.SymbolAutoField.$type.$af('input',67584,'ui::Input',{}).$af('allItems$Store',722944,'sys::Obj?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('input','ui::Input',false)]),{}).$am('icon',271360,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('itemToStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('allItems',795648,'haystack::Def[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('allItems$Once',133120,'haystack::Def[]',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.AdminFuncNameListInput.$type.$af('field',65664,'domkit::TextField',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onRO',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onLoad',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj',false)]),{}).$am('onSave',267264,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.AdminFuncNameAutoField.$type.$af('input',67584,'ui::Input',{}).$af('allItems$Store',722944,'sys::Obj?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('input','ui::Input',false)]),{}).$am('icon',271360,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('itemToStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('allItems',795648,'haystack::Def[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('allItems$Once',133120,'haystack::Def[]',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.UiDevUtil.$type.$am('border',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('gotoItemElem',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','uiDev::DocItem',false),new fan.sys.Param('match','misc::FuzzyMatch',false)]),{}).$am('cmdItemElem',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cmd','skyarc::CommandDef',false),new fan.sys.Param('hotKeys','ui::HotKey[]',false),new fan.sys.Param('match','misc::FuzzyMatch',false)]),{}).$am('iconTextElem',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('icon','pim::IconSpec',false),new fan.sys.Param('text','sys::Str',false)]),{}).$am('fuzzyMatchElem',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('match','misc::FuzzyMatch',false),new fan.sys.Param('icon','pim::IconSpec',false)]),{}).$am('hotKeysElem',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hotKeys','ui::HotKey[]',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.DevIcon.$type.$af('blank',106498,'pim::IconSpec',{}).$af('func',106498,'pim::IconSpec',{}).$af('ok',106498,'pim::IconSpec',{}).$af('tag',106498,'pim::IconSpec',{}).$af('warn',106498,'pim::IconSpec',{}).$am('makeCommand',40962,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','skyarc::CommandDef',false)]),{}).$am('makeDict',40962,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','haystack::Dict',false)]),{}).$am('makeColor',40962,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('makeOutline',40962,'pim::IconSpec',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('color','sys::Str',true)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.ListBox.$type.$af('focusable',73730,'sys::Bool',{}).$af('selected',8192,'sys::Obj?',{}).$af('elems',67584,'uiDev::ListBoxElem[]',{}).$af('selIndex',67584,'sys::Int?',{}).$af('overIndex',67584,'sys::Int?',{}).$af('cbSelect',67584,'sys::Func?',{}).$af('cbElem',67584,'sys::Func?',{}).$af('cbSearch',67584,'sys::Func?',{}).$af('mouseIsDown',67584,'sys::Bool',{}).$af('searchField',67584,'domkit::TextField?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('update',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('items','sys::Obj[]',false)]),{}).$am('onElem',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj->dom::Elem|',false)]),{}).$am('onSearch',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj->sys::Str|',false)]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|uiDev::ListBoxEvent->sys::Void|',false)]),{}).$am('itemToElem',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('makeSearchCombo',8192,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('top','dom::Elem?',false)]),{}).$am('searchDownKey',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('search',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false)]),{}).$am('isSearchMatch',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('elem','uiDev::ListBoxElem',false)]),{}).$am('select',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event?',false),new fan.sys.Param('index','sys::Int?',false)]),{}).$am('mouseOver',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int?',false)]),{}).$am('elem',2048,'uiDev::ListBoxElem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int?',false)]),{}).$am('index',2048,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj?',false)]),{}).$am('onKeyDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onUp',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onDown',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onMouseMove',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onMouseLeave',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onMouseDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onMouseUp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('mouseToItem',2048,'uiDev::ListBoxElem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{});
  fan.uiDev.ListBoxEvent.$type.$af('index',73728,'sys::Int?',{}).$af('item',73728,'sys::Obj?',{}).$af('dom',73728,'dom::Event',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isMouse',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isKey',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.ListBoxElem.$type.$af('index',73730,'sys::Int',{}).$af('item',73730,'sys::Obj',{}).$af('visible',73728,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('item','sys::Obj',false),new fan.sys.Param('content','dom::Elem',false)]),{}).$am('setVisible',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('visible','sys::Bool',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.AutoPopup.$type.$af('popupWidth',100354,'sys::Int',{}).$af('resultsHeight',100354,'sys::Int',{}).$af('view',73728,'ui::UiView',{}).$af('input',67584,'domkit::TextField',{}).$af('listBox',67584,'uiDev::ListBox',{}).$af('search',67584,'misc::FuzzySearch',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false),new fan.sys.Param('pattern','sys::Str',false)]),{}).$am('show',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onUpdate',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false)]),{}).$am('update',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('items','sys::Obj[]',false)]),{}).$am('onElem',270337,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false),new fan.sys.Param('item','sys::Obj',false)]),{}).$am('fireAction',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj?',false),new fan.sys.Param('event','dom::Event',false)]),{}).$am('onAction',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false),new fan.sys.Param('event','dom::Event',false)]),{}).$am('onInputModify',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onKeyDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onUp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('onEnter',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','dom::Event',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.uiDev.GotoPopup.$type.$af('main',67584,'uiDev::DevMain',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false),new fan.sys.Param('start','sys::Str',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false)]),{}).$am('gotoLineItem',2048,'uiDev::GotoLineItem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false)]),{}).$am('onAction',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false),new fan.sys.Param('event','dom::Event',false)]),{}).$am('onElem',271360,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false),new fan.sys.Param('obj','sys::Obj',false)]),{});
  fan.uiDev.GotoRecentPopup.$type.$af('main',67584,'uiDev::DevMain',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','uiDev::DevMain',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false)]),{});
  fan.uiDev.CommandsPopup.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false)]),{}).$am('onAction',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false),new fan.sys.Param('event','dom::Event',false)]),{}).$am('onElem',271360,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false),new fan.sys.Param('item','sys::Obj',false)]),{});
  fan.uiDev.GotoViewPopup.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','ui::UiView',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false)]),{}).$am('onAction',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false),new fan.sys.Param('event','dom::Event',false)]),{}).$am('onElem',271360,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('search','misc::FuzzySearch',false),new fan.sys.Param('item','sys::Obj',false)]),{});
  fan.uiDev.SideBarBox.$type.$af('main',67584,'dom::Elem',{}).$af('side',67584,'dom::Elem',{}).$af('divElem',67584,'dom::Elem',{}).$af('sideDir',67584,'domkit::Dir',{}).$af('divSize',67584,'sys::Int',{}).$af('shown',67584,'sys::Bool',{}).$af('lastSideSizePercent',67584,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('main','dom::Elem',false),new fan.sys.Param('side','dom::Elem',false),new fan.sys.Param('sideDir','domkit::Dir',false)]),{}).$am('show',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('shown','sys::Bool',false)]),{}).$am('curSideSizePercent',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dirSize',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','graphics::Size',false)]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "uiDev");
  m_meta.set("pod.version", "3.1.6");
  m_version = fan.sys.Version.fromStr("3.1.6");
  m_meta.set("pod.depends", "sys 1.0;graphics 1.0;dom 1.0;domkit 1.0;fandoc 1.0;web 1.0;codemirror 3.1.6;haystack 3.1.6;misc 3.1.6;pim 3.1.6;axon 3.1.6;view 3.1.6;skyarc 3.1.6;skyarcd 3.1.6;ui 3.1.6");
  m_meta.set("pod.summary", "Developer tools UI");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:24:21-05:00 New_York");
  m_meta.set("build.tsKey", "221115162421");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("license.name", "Commercial");
  m_meta.set("org.name", "SkyFoundry");
  m_meta.set("pod.docSrc", "false");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "SkySpark");
  m_meta.set("proj.uri", "https://skyfoundry.com/skyspark");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://skyfoundry.com/");
  m_meta.set("pod.native.java", "false");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("pod.native.js", "false");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
fan.uiDev.$clos$_u0 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["pane","uiDev::DevPane","false"]);
fan.uiDev.$clos$_u6 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Label","false"]);
fan.uiDev.$clos$_u10 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["$var","view::VarNode","false"]);
fan.uiDev.$clos$_u11 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["cmd","skyarc::CommandDef","false"]);
fan.uiDev.$clos$_u20 = new fan.sys.ClosureFuncSpec$(fan.uiDev.DocItem.$type,["row","haystack::Row","false"]);
fan.uiDev.$clos$_u21 = new fan.sys.ClosureFuncSpec$(fan.uiDev.CmdButton.$type,["cmd","uiDev::Cmd?","false"]);
fan.uiDev.$clos$_u22 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::FlowBox","false"]);
fan.uiDev.$clos$_u23 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","uiDev::CmdButton","false"]);
fan.uiDev.$clos$_u24 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["button","uiDev::CmdButton","false"]);
fan.uiDev.$clos$_u25 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiDev::CmdButton","false"]);
fan.uiDev.$clos$_u26 = new fan.sys.ClosureFuncSpec$(fan.domkit.Popup.$type,["it","domkit::Button","false"]);
fan.uiDev.$clos$_u27 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::FlexBox","false"]);
fan.uiDev.$clos$_u28 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Win","false"]);
fan.uiDev.$clos$_u33 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::Icon","false"]);
fan.uiDev.$clos$_u34 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Elem","false"]);
fan.uiDev.$clos$_u35 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","dom::Event","false"]);
fan.uiDev.$clos$_u36 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TextField","false"]);
fan.uiDev.$clos$_u37 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::ToggleButton","false"]);
fan.uiDev.$clos$_u38 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Button","false"]);
fan.uiDev.$clos$_u39 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","misc::TextSearch","false"]);
fan.uiDev.$clos$_u41 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiDev::MarkerSelector","false"]);
fan.uiDev.$clos$_u42 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["sm","uiDev::MarkerSelector","false"]);
fan.uiDev.$clos$_u43 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiDev::ListBox","false"]);
fan.uiDev.$clos$_u44 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","uiDev::ListBoxEvent","false"]);
fan.uiDev.$clos$_u45 = new fan.sys.ClosureFuncSpec$(fan.dom.Elem.$type,["item","uiDev::DocItem","false"]);
fan.uiDev.$clos$_u46 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["item","uiDev::DocItem","false"]);
fan.uiDev.$clos$_u47 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["res","uiDev::DocRef","false"]);
fan.uiDev.$clos$_u48 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::TextEditor","false"]);
fan.uiDev.$clos$_u49 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["m","uiDev::DocItem","false","i","sys::Int","false"]);
fan.uiDev.$clos$_u51 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["f","skyarc::FuncDef","false"]);
fan.uiDev.$clos$_u52 = new fan.sys.ClosureFuncSpec$(fan.sys.Int.$type,["a","skyarc::FuncDef","false","b","skyarc::FuncDef","false"]);
fan.uiDev.$clos$_u53 = new fan.sys.ClosureFuncSpec$(fan.dom.Elem.$type,["f","skyarc::FuncDef","false"]);
fan.uiDev.$clos$_u54 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["f","skyarc::FuncDef","false"]);
fan.uiDev.$clos$_u55 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Box","false"]);
fan.uiDev.$clos$_u56 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::SashBox","false"]);
fan.uiDev.$clos$_u57 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["p","axon::FnParam","false","i","sys::Int","false"]);
fan.uiDev.$clos$_u58 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["link","fandoc::Link","false"]);
fan.uiDev.$clos$_u59 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["def","skyarc::CommandDef","false"]);
fan.uiDev.$clos$_u60 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["type","sys::Type","false"]);
fan.uiDev.$clos$_u64 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["g","haystack::Grid","false"]);
fan.uiDev.$clos$_u65 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["row","haystack::Row","false"]);
fan.uiDev.$clos$_u66 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::MenuItem","false"]);
fan.uiDev.$clos$_u67 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::UiLabel","false"]);
fan.uiDev.$clos$_u71 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["m","uiDev::DocItem","false"]);
fan.uiDev.$clos$_u72 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["v","sys::Obj?","false","n","sys::Str","false"]);
fan.uiDev.$clos$_u73 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["f","sys::Field","false","v","sys::Obj?","false"]);
fan.uiDev.$clos$_u74 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["item","uiDev::DocItem","false"]);
fan.uiDev.$clos$_u75 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["field","sys::Field","false","val","sys::Obj?","false"]);
fan.uiDev.$clos$_u76 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["field","sys::Field","false"]);
fan.uiDev.$clos$_u77 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["f","sys::Field","false"]);
fan.uiDev.$clos$_u79 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,[]);
fan.uiDev.$clos$_u80 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","ui::AlertDialog","false"]);
fan.uiDev.$clos$_u81 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["key","sys::Str","false"]);
fan.uiDev.$clos$_u83 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["res","haystack::Grid","false"]);
fan.uiDev.$clos$_u90 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["line","sys::Str","false","lineNum","sys::Int","false"]);
fan.uiDev.$clos$_u91 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["range","sys::Range","false"]);
fan.uiDev.$clos$_u96 = new fan.sys.ClosureFuncSpec$(fan.uiDev.DocRef.$type,["row","haystack::Row","false"]);
fan.uiDev.$clos$_u100 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["marker","sys::Str","false"]);
fan.uiDev.$clos$_u101 = new fan.sys.ClosureFuncSpec$(fan.domkit.Popup.$type,["b","domkit::Button","false"]);
fan.uiDev.$clos$_u105 = new fan.sys.ClosureFuncSpec$(fan.domkit.ToggleButton.$type,["m","sys::Str","false"]);
fan.uiDev.$clos$_u106 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","domkit::ToggleButton","false"]);
fan.uiDev.$clos$_u107 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","domkit::ToggleButton","false"]);
fan.uiDev.$clos$_u108 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["m","domkit::ToggleButton","false"]);
fan.uiDev.$clos$_u109 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["m","domkit::ToggleButton","false"]);
fan.uiDev.$clos$_u111 = new fan.sys.ClosureFuncSpec$(fan.haystack.Symbol.$type,["s","sys::Str","false"]);
fan.uiDev.$clos$_u112 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["t","domkit::TextField","false"]);
fan.uiDev.$clos$_u113 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["item","sys::Obj","false"]);
fan.uiDev.$clos$_u114 = new fan.sys.ClosureFuncSpec$(fan.dom.Elem.$type,["item","sys::Obj","false"]);
fan.uiDev.$clos$_u115 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["def","haystack::Def","false"]);
fan.uiDev.$clos$_u117 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["subStr","sys::Str","false","highlight","sys::Bool","false"]);
fan.uiDev.$clos$_u118 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["hotKey","ui::HotKey","false","i","sys::Int","false"]);
fan.uiDev.$clos$_u119 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["symbol","sys::Str","false"]);
fan.uiDev.$clos$_u122 = new fan.sys.ClosureFuncSpec$(fan.uiDev.ListBoxElem.$type,["item","sys::Obj","false","i","sys::Int","false"]);
fan.uiDev.$clos$_u124 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["f","domkit::TextField","false"]);
fan.uiDev.$clos$_u125 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["elem","uiDev::ListBoxElem","false"]);
fan.uiDev.$clos$_u126 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["elem","uiDev::ListBoxElem","false"]);
fan.uiDev.$clos$_u127 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiDev::ListBoxEvent","false"]);
fan.uiDev.$clos$_u133 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","uiDev::AutoPopup","false"]);
fan.uiDev.$clos$_u135 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["grid","haystack::Grid","false"]);
fan.uiDev.$clos$_u136 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["cmd","skyarc::CommandDef","false"]);
fan.uiDev.$clos$_u137 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["v","skyarc::ViewDef","false"]);
fan.uiDev.$clos$_u138 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["v","skyarc::ViewDef","false"]);
fan.uiDev.DocItem.static$init();
fan.uiDev.DevDocItem.static$init();
fan.uiDev.ToolType.static$init();
fan.uiDev.GotoOp.static$init();
fan.uiDev.MarkerSelector.static$init();
fan.uiDev.DevIcon.static$init();
fan.uiDev.AutoPopup.static$init();
}).call(this);
