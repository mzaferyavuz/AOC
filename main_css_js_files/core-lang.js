(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.concurrent = exports;
} else {
  fan.concurrent = root.fan.concurrent = {};
}

fan.concurrent.AtomicInt = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.AtomicInt.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.concurrent.AtomicIntPeer(this);
  var $this = this;
}
fan.concurrent.AtomicInt.prototype.$typeof = function() { return fan.concurrent.AtomicInt.$type; }
fan.concurrent.AtomicInt.make = function(val) {
  var self = new fan.concurrent.AtomicInt();
  fan.concurrent.AtomicInt.make$(self,val);
  return self;
  }
fan.concurrent.AtomicInt.make$ = function(self,val)
{
  if (val === undefined) val = 0;
  self.val$(val);
  return;
}
fan.concurrent.AtomicInt.prototype.val = function()
{
  return this.peer.val(this);
}
fan.concurrent.AtomicInt.prototype.val$ = function(it)
{
  return this.peer.val$(this,it);
}
fan.concurrent.AtomicInt.prototype.getAndSet = function(val)
{
  return this.peer.getAndSet(this,val);
}
fan.concurrent.AtomicInt.prototype.compareAndSet = function(expect,update)
{
  return this.peer.compareAndSet(this,expect,update);
}
fan.concurrent.AtomicInt.prototype.getAndIncrement = function()
{
  return this.peer.getAndIncrement(this);
}
fan.concurrent.AtomicInt.prototype.getAndDecrement = function()
{
  return this.peer.getAndDecrement(this);
}
fan.concurrent.AtomicInt.prototype.getAndAdd = function(delta)
{
  return this.peer.getAndAdd(this,delta);
}
fan.concurrent.AtomicInt.prototype.incrementAndGet = function()
{
  return this.peer.incrementAndGet(this);
}
fan.concurrent.AtomicInt.prototype.decrementAndGet = function()
{
  return this.peer.decrementAndGet(this);
}
fan.concurrent.AtomicInt.prototype.addAndGet = function(delta)
{
  return this.peer.addAndGet(this,delta);
}
fan.concurrent.AtomicInt.prototype.increment = function()
{
  return this.peer.increment(this);
}
fan.concurrent.AtomicInt.prototype.decrement = function()
{
  return this.peer.decrement(this);
}
fan.concurrent.AtomicInt.prototype.add = function(delta)
{
  return this.peer.add(this,delta);
}
fan.concurrent.AtomicInt.prototype.toStr = function()
{
  return fan.sys.Int.toStr(this.val());
}
fan.concurrent.AtomicIntPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.AtomicIntPeer.prototype.$ctor = function() {}
fan.concurrent.AtomicIntPeer.prototype.m_val = 0;
fan.concurrent.AtomicIntPeer.prototype.val = function(self) { return this.m_val; }
fan.concurrent.AtomicIntPeer.prototype.val$ = function(self, val) { this.m_val = val; }
fan.concurrent.AtomicIntPeer.prototype.getAndSet = function(self, val) {
  var old = this.m_val;
  this.m_val = val;
  return old;
}
fan.concurrent.AtomicIntPeer.prototype.compareAndSet = function(self, expect, update) {
  if (this.m_val == expect) {
    this.m_val = update;
    return true;
  }
  return false;
}
fan.concurrent.AtomicIntPeer.prototype.getAndIncrement = function(self) {
  return this.getAndAdd(self, 1);
}
fan.concurrent.AtomicIntPeer.prototype.getAndDecrement = function(self) {
  return this.getAndAdd(self, -1);
}
fan.concurrent.AtomicIntPeer.prototype.getAndAdd = function(self, delta) {
  var old = this.m_val;
  this.m_val = old + delta;
  return old;
}
fan.concurrent.AtomicIntPeer.prototype.incrementAndGet = function(self) {
  return this.addAndGet(self, 1);
}
fan.concurrent.AtomicIntPeer.prototype.decrementAndGet = function(self) {
  return this.addAndGet(self, -1)
}
fan.concurrent.AtomicIntPeer.prototype.addAndGet = function(self, delta) {
  this.m_val = this.m_val + delta;
  return this.m_val;
}
fan.concurrent.AtomicIntPeer.prototype.increment = function(self) {
  this.add(self, 1);
}
fan.concurrent.AtomicIntPeer.prototype.decrement = function(self) {
  this.add(self, -1)
}
fan.concurrent.AtomicIntPeer.prototype.add = function(self, delta) {
  this.m_val = this.m_val + delta;
}
fan.concurrent.Actor = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.Actor.prototype.$ctor = function() {}
fan.concurrent.Actor.prototype.$typeof = function() { return fan.concurrent.Actor.$type; }
fan.concurrent.Actor.locals = function()
{
  if (fan.concurrent.Actor.$locals == null)
  {
    var k = fan.sys.Str.$type;
    var v = fan.sys.Obj.$type.toNullable();
    fan.concurrent.Actor.$locals = fan.sys.Map.make(k, v);
  }
  return fan.concurrent.Actor.$locals;
}
fan.concurrent.Actor.$locals = null;
fan.concurrent.ActorPool = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.ActorPool.prototype.$ctor = function() {}
fan.concurrent.ActorPool.prototype.$typeof = function() { return fan.concurrent.ActorPool.$type; }
fan.concurrent.AtomicRef = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.AtomicRef.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.concurrent.AtomicRefPeer(this);
  var $this = this;
}
fan.concurrent.AtomicRef.prototype.$typeof = function() { return fan.concurrent.AtomicRef.$type; }
fan.concurrent.AtomicRef.make = function(val) {
  var self = new fan.concurrent.AtomicRef();
  fan.concurrent.AtomicRef.make$(self,val);
  return self;
  }
fan.concurrent.AtomicRef.make$ = function(self,val)
{
  if (val === undefined) val = null;
  self.val$(val);
  return;
}
fan.concurrent.AtomicRef.prototype.val = function()
{
  return this.peer.val(this);
}
fan.concurrent.AtomicRef.prototype.val$ = function(it)
{
  return this.peer.val$(this,it);
}
fan.concurrent.AtomicRef.prototype.getAndSet = function(val)
{
  return this.peer.getAndSet(this,val);
}
fan.concurrent.AtomicRef.prototype.compareAndSet = function(expect,update)
{
  return this.peer.compareAndSet(this,expect,update);
}
fan.concurrent.AtomicRef.prototype.toStr = function()
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u0 = (function($this) { var $_u1 = $this.val(); if ($_u1 == null) return null; return fan.sys.ObjUtil.toStr($_u1); })($this); if ($_u0 != null) return $_u0; return "null"; })(this),fan.sys.Str.$type);
}
fan.concurrent.AtomicRefPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.AtomicRefPeer.prototype.$ctor = function() {}
fan.concurrent.AtomicRefPeer.prototype.m_val = null;
fan.concurrent.AtomicRefPeer.prototype.val = function(self) { return this.m_val; }
fan.concurrent.AtomicRefPeer.prototype.val$ = function(self, val)
{
  if (!fan.sys.ObjUtil.isImmutable(val)) throw fan.sys.NotImmutableErr.make();
  this.m_val = val;
}
fan.concurrent.AtomicRefPeer.prototype.getAndSet = function(self, val)
{
  if (!fan.sys.ObjUtil.isImmutable(val)) throw fan.sys.NotImmutableErr.make();
  var old = this.m_val;
  this.m_val = val;
  return old;
}
fan.concurrent.AtomicRefPeer.prototype.compareAndSet = function(self, expect, update)
{
  if (!fan.sys.ObjUtil.isImmutable(update)) throw fan.sys.NotImmutableErr.make();
  if (this.m_val != expect) return false;
  this.m_val = update;
  return true;
}
fan.concurrent.Future = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.Future.prototype.$ctor = function() {}
fan.concurrent.Future.prototype.$typeof = function() { return fan.concurrent.Future.$type; }
fan.concurrent.FutureState = fan.sys.Obj.$extend(fan.sys.Enum);
fan.concurrent.FutureState.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.concurrent.FutureState.prototype.$typeof = function() { return fan.concurrent.FutureState.$type; }
fan.concurrent.FutureState.prototype.isPending = function()
{
  return this === fan.concurrent.FutureState.m_pending;
}
fan.concurrent.FutureState.prototype.isComplete = function()
{
  return this !== fan.concurrent.FutureState.m_pending;
}
fan.concurrent.FutureState.prototype.isOk = function()
{
  return this === fan.concurrent.FutureState.m_ok;
}
fan.concurrent.FutureState.prototype.isErr = function()
{
  return this === fan.concurrent.FutureState.m_err;
}
fan.concurrent.FutureState.prototype.isCancelled = function()
{
  return this === fan.concurrent.FutureState.m_cancelled;
}
fan.concurrent.FutureState.make = function($ordinal,$name) {
  var self = new fan.concurrent.FutureState();
  fan.concurrent.FutureState.make$(self,$ordinal,$name);
  return self;
  }
fan.concurrent.FutureState.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.concurrent.FutureState.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.concurrent.FutureState.$type,$name,checked),fan.concurrent.FutureState.$type.toNullable());
}
fan.concurrent.FutureState.static$init = function()
{
  fan.concurrent.FutureState.m_pending = fan.concurrent.FutureState.make(0,"pending");
  fan.concurrent.FutureState.m_ok = fan.concurrent.FutureState.make(1,"ok");
  fan.concurrent.FutureState.m_err = fan.concurrent.FutureState.make(2,"err");
  fan.concurrent.FutureState.m_cancelled = fan.concurrent.FutureState.make(3,"cancelled");
  fan.concurrent.FutureState.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u2 = fan.sys.List.make(fan.concurrent.FutureState.$type, [fan.concurrent.FutureState.m_pending,fan.concurrent.FutureState.m_ok,fan.concurrent.FutureState.m_err,fan.concurrent.FutureState.m_cancelled]); if ($_u2 == null) return null; return fan.sys.ObjUtil.toImmutable($_u2); })(this),fan.sys.Type.find("concurrent::FutureState[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.concurrent.FutureState.m_pending = null;
fan.concurrent.FutureState.m_ok = null;
fan.concurrent.FutureState.m_err = null;
fan.concurrent.FutureState.m_cancelled = null;
fan.concurrent.FutureState.m_vals = null;
fan.concurrent.AtomicBool = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.AtomicBool.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.concurrent.AtomicBoolPeer(this);
  var $this = this;
}
fan.concurrent.AtomicBool.prototype.$typeof = function() { return fan.concurrent.AtomicBool.$type; }
fan.concurrent.AtomicBool.make = function(val) {
  var self = new fan.concurrent.AtomicBool();
  fan.concurrent.AtomicBool.make$(self,val);
  return self;
  }
fan.concurrent.AtomicBool.make$ = function(self,val)
{
  if (val === undefined) val = false;
  self.val$(val);
  return;
}
fan.concurrent.AtomicBool.prototype.val = function()
{
  return this.peer.val(this);
}
fan.concurrent.AtomicBool.prototype.val$ = function(it)
{
  return this.peer.val$(this,it);
}
fan.concurrent.AtomicBool.prototype.getAndSet = function(val)
{
  return this.peer.getAndSet(this,val);
}
fan.concurrent.AtomicBool.prototype.compareAndSet = function(expect,update)
{
  return this.peer.compareAndSet(this,expect,update);
}
fan.concurrent.AtomicBool.prototype.toStr = function()
{
  return fan.sys.Bool.toStr(this.val());
}
fan.concurrent.AtomicBoolPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.AtomicBoolPeer.prototype.$ctor = function() {}
fan.concurrent.AtomicBoolPeer.prototype.m_val = false;
fan.concurrent.AtomicBoolPeer.prototype.val = function(self) { return this.m_val; }
fan.concurrent.AtomicBoolPeer.prototype.val$ = function(self, val) { this.m_val = val; }
fan.concurrent.AtomicBoolPeer.prototype.getAndSet = function(self, val) {
  var old = this.m_val;
  this.m_val = val;
  return old;
}
fan.concurrent.AtomicBoolPeer.prototype.compareAndSet = function(self, expect, update) {
  if (this.m_val == expect) {
    this.m_val = update;
    return true;
  }
  return false;
}
fan.concurrent.ConcurrentMap = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.ConcurrentMap.make = function(capacity)
{
  var self = new fan.concurrent.ConcurrentMap();
  self.m_map = fan.sys.Map.make(fan.sys.Obj.$type, fan.sys.Obj.$type)
  return self;
}
fan.concurrent.ConcurrentMap.prototype.$ctor = function() {}
fan.concurrent.ConcurrentMap.prototype.$typeof = function() { return fan.concurrent.ConcurrentMap.$type; }
fan.concurrent.ConcurrentMap.prototype.isEmpty = function() { return this.m_map.isEmpty(); }
fan.concurrent.ConcurrentMap.prototype.size = function() { return this.m_map.size(); }
fan.concurrent.ConcurrentMap.prototype.get = function(key) { return this.m_map.get(key); }
fan.concurrent.ConcurrentMap.prototype.set = function(key, val)
{
  this.m_map.set(key, this.$checkImmutable(val));
}
fan.concurrent.ConcurrentMap.prototype.getAndSet = function(key, val)
{
  var old = this.m_map.get(key);
  this.m_map.set(key, this.$checkImmutable(val));
  return old;
}
fan.concurrent.ConcurrentMap.prototype.add = function(key, val)
{
  if (this.containsKey(key)) throw fan.sys.Err("Key already mapped: " + key);
  this.m_map.add(key, this.$checkImmutable(val));
}
fan.concurrent.ConcurrentMap.prototype.getOrAdd = function(key, defVal)
{
  var val = this.m_map.get(key);
  if (val == null) { this.m_map.add(key, this.$checkImmutable(val = defVal)); }
  return val;
}
fan.concurrent.ConcurrentMap.prototype.setAll = function(m)
{
  if (m.isImmutable()) this.m_map.setAll(m);
  else
  {
    var vals = m.vals();
    for (i=0; i<vals.size(); ++i) { this.$checkImmutable(vals.get(i)); }
    this.m_map.setAll(m);
  }
  return this;
}
fan.concurrent.ConcurrentMap.prototype.remove = function(key) { return this.m_map.remove(key); }
fan.concurrent.ConcurrentMap.prototype.clear = function() { this.m_map.clear(); }
fan.concurrent.ConcurrentMap.prototype.each = function(f) { this.m_map.each(f); }
fan.concurrent.ConcurrentMap.prototype.eachWhile = function(f) { return this.m_map.eachWhile(f); }
fan.concurrent.ConcurrentMap.prototype.containsKey = function(key) { return this.m_map.containsKey(key); }
fan.concurrent.ConcurrentMap.prototype.keys = function(of)
{
  var array = [];
  this.m_map.$each(function(b) { array.push(b.key); });
  return fan.sys.List.make(of, array);
}
fan.concurrent.ConcurrentMap.prototype.vals = function(of)
{
  var array = [];
  this.m_map.$each(function(b) { array.push(b.val); });
  return fan.sys.List.make(of, array);
}
fan.concurrent.ConcurrentMap.prototype.$checkImmutable = function(val)
{
  if (fan.sys.ObjUtil.isImmutable(val)) return val;
  else throw fan.sys.NotImmutableErr.make();
}
fan.concurrent.$pod = fan.sys.Pod.$add('concurrent');
with (fan.concurrent.$pod)
{
  fan.concurrent.AtomicInt.$type = $at('AtomicInt','sys::Obj',[],{'sys::Js':""},8226);
  fan.concurrent.Actor.$type = $at('Actor','sys::Obj',[],{'sys::Js':""},8706);
  fan.concurrent.ActorPool.$type = $at('ActorPool','sys::Obj',[],{'sys::Js':""},8706);
  fan.concurrent.AtomicRef.$type = $at('AtomicRef','sys::Obj',[],{'sys::Js':""},8226);
  fan.concurrent.Future.$type = $at('Future','sys::Obj',[],{'sys::Js':""},8707);
  fan.concurrent.FutureState.$type = $at('FutureState','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.concurrent.AtomicBool.$type = $at('AtomicBool','sys::Obj',[],{'sys::Js':""},8226);
  fan.concurrent.ConcurrentMap.$type = $at('ConcurrentMap','sys::Obj',[],{'sys::Js':""},8738);
  fan.concurrent.AtomicInt.$type.$af('val',8704,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Int',true)]),{}).$am('getAndSet',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Int',false)]),{}).$am('compareAndSet',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('expect','sys::Int',false),new fan.sys.Param('update','sys::Int',false)]),{}).$am('getAndIncrement',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getAndDecrement',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getAndAdd',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('delta','sys::Int',false)]),{}).$am('incrementAndGet',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decrementAndGet',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addAndGet',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('delta','sys::Int',false)]),{}).$am('increment',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decrement',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('add',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('delta','sys::Int',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.concurrent.Actor.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pool','concurrent::ActorPool',false),new fan.sys.Param('receive','|sys::Obj?->sys::Obj?|?',true)]),{}).$am('makeCoalescing',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pool','concurrent::ActorPool',false),new fan.sys.Param('toKey','|sys::Obj?->sys::Obj?|?',false),new fan.sys.Param('coalesce','|sys::Obj?,sys::Obj?->sys::Obj?|?',false),new fan.sys.Param('receive','|sys::Obj?->sys::Obj?|?',true)]),{}).$am('pool',8192,'concurrent::ActorPool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('send',8192,'concurrent::Future',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Obj?',false)]),{}).$am('sendLater',8192,'concurrent::Future',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Duration',false),new fan.sys.Param('msg','sys::Obj?',false)]),{}).$am('sendWhenComplete',8192,'concurrent::Future',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','concurrent::Future',false),new fan.sys.Param('msg','sys::Obj?',false)]),{}).$am('sendWhenDone',8192,'concurrent::Future',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','concurrent::Future',false),new fan.sys.Param('msg','sys::Obj?',false)]),{'sys::NoDoc':"",'sys::Deprecated':"sys::Deprecated{msg=\"Use sendWhenComplete\";}"}).$am('receive',266240,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Obj?',false)]),{}).$am('threadState',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('queueSize',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('queuePeak',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('receiveCount',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('receiveTicks',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('sleep',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('duration','sys::Duration',false)]),{}).$am('locals',40962,'[sys::Str:sys::Obj?]',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.concurrent.ActorPool.$type.$af('name',73730,'sys::Str',{}).$af('maxThreads',73730,'sys::Int',{}).$af('maxTimeBeforeYield',73730,'sys::Duration',{'sys::NoDoc':""}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('isStopped',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isDone',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('stop',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('kill',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('join',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('timeout','sys::Duration?',true)]),{}).$am('balance',270336,'concurrent::Actor',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('actors','concurrent::Actor[]',false)]),{'sys::NoDoc':""});
  fan.concurrent.AtomicRef.$type.$af('val',8704,'sys::Obj?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj?',true)]),{}).$am('getAndSet',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('compareAndSet',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('expect','sys::Obj?',false),new fan.sys.Param('update','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.concurrent.Future.$type.$am('makeCompletable',40962,'concurrent::Future',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',270337,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('timeout','sys::Duration?',true)]),{}).$am('state',270337,'concurrent::FutureState',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isDone',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':"",'sys::Deprecated':"sys::Deprecated{msg=\"Use Future.state\";}"}).$am('isCancelled',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':"",'sys::Deprecated':"sys::Deprecated{msg=\"Use Future.state\";}"}).$am('cancel',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('complete',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('completeErr',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('err','sys::Err',false)]),{}).$am('wraps',270336,'concurrent::Future?',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('waitFor',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('timeout','sys::Duration?',true)]),{}).$am('waitForAll',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('futures','concurrent::Future[]',false),new fan.sys.Param('timeout','sys::Duration?',true)]),{});
  fan.concurrent.FutureState.$type.$af('pending',106506,'concurrent::FutureState',{}).$af('ok',106506,'concurrent::FutureState',{}).$af('err',106506,'concurrent::FutureState',{}).$af('cancelled',106506,'concurrent::FutureState',{}).$af('vals',106498,'concurrent::FutureState[]',{}).$am('isPending',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isComplete',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isOk',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isErr',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isCancelled',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'concurrent::FutureState?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.concurrent.AtomicBool.$type.$af('val',8704,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Bool',true)]),{}).$am('getAndSet',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Bool',false)]),{}).$am('compareAndSet',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('expect','sys::Bool',false),new fan.sys.Param('update','sys::Bool',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.concurrent.ConcurrentMap.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('initialCapacity','sys::Int',true)]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false)]),{'sys::Operator':""}).$am('set',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false),new fan.sys.Param('val','sys::Obj',false)]),{'sys::Operator':""}).$am('getAndSet',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false),new fan.sys.Param('val','sys::Obj',false)]),{}).$am('add',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false),new fan.sys.Param('val','sys::Obj',false)]),{}).$am('getOrAdd',8192,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false),new fan.sys.Param('defVal','sys::Obj',false)]),{}).$am('setAll',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('m','sys::Map',false)]),{}).$am('remove',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false)]),{}).$am('clear',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('each',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj,sys::Obj->sys::Void|',false)]),{}).$am('eachWhile',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj,sys::Obj->sys::Obj?|',false)]),{}).$am('containsKey',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false)]),{}).$am('keys',8192,'sys::Obj[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('of','sys::Type',false)]),{}).$am('vals',8192,'sys::Obj[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('of','sys::Type',false)]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "concurrent");
  m_meta.set("pod.version", "1.0.78.3106");
  m_version = fan.sys.Version.fromStr("1.0.78.3106");
  m_meta.set("pod.depends", "sys 1.0");
  m_meta.set("pod.summary", "Utilities for concurrent programming");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:22:59-05:00 New_York");
  m_meta.set("build.tsKey", "221115162259");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("pod.docSrc", "true");
  m_meta.set("license.name", "Academic Free License 3.0");
  m_meta.set("org.name", "Fantom");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "Fantom Core");
  m_meta.set("proj.uri", "https://fantom.org/");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://fantom.org/");
  m_meta.set("pod.native.java", "true");
  m_meta.set("vcs.uri", "https://github.com/fantom-lang/fantom");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("vcs.name", "Git");
  m_meta.set("pod.native.js", "true");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
fan.concurrent.FutureState.static$init();
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.graphics = exports;
} else {
  fan.graphics = root.fan.graphics = {};
}

fan.graphics.Paint = function() {}
fan.graphics.Paint.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Paint.prototype.$typeof = function() { return fan.graphics.Paint.$type; }
fan.graphics.Color = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Color.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Color.prototype.$typeof = function() { return fan.graphics.Color.$type; }
fan.graphics.Color.make = function(rgb,a) {
  var self = new fan.graphics.Color();
  fan.graphics.Color.make$(self,rgb,a);
  return self;
  }
fan.graphics.Color.make$ = function(self,rgb,a)
{
  if (rgb === undefined) rgb = 0;
  if (a === undefined) a = fan.sys.Float.make(1.0);
  self.m_rgb = fan.sys.Int.and(rgb,16777215);
  self.m_a = fan.sys.Float.min(fan.sys.Float.max(a,fan.sys.Float.make(0.0)),fan.sys.Float.make(1.0));
  return;
}
fan.graphics.Color.makeRgb = function(r,g,b,a)
{
  if (a === undefined) a = fan.sys.Float.make(1.0);
  return fan.graphics.Color.make(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(fan.sys.Int.and(r,255),16),fan.sys.Int.shiftl(fan.sys.Int.and(g,255),8)),fan.sys.Int.and(b,255)),a);
}
fan.graphics.Color.makeHsl = function(h,s,l,a)
{
  if (a === undefined) a = fan.sys.Float.make(1.0);
  var r = l;
  var g = l;
  var b = l;
  if (fan.sys.ObjUtil.compareNE(s,fan.sys.Float.make(0.0)))
  {
    if (fan.sys.ObjUtil.equals(h,fan.sys.Float.make(360.0)))
    {
      h = fan.sys.Float.make(0.0);
    }
    ;
    h = fan.sys.Float.div(h,fan.sys.Float.make(60.0));
    var i = fan.sys.Float.floor(h);
    var f = fan.sys.Float.minus(h,i);
    var p = fan.sys.Float.mult(l,fan.sys.Float.minus(fan.sys.Float.make(1.0),s));
    var q = fan.sys.Float.mult(l,fan.sys.Float.minus(fan.sys.Float.make(1.0),fan.sys.Float.mult(s,f)));
    var t = fan.sys.Float.mult(l,fan.sys.Float.minus(fan.sys.Float.make(1.0),fan.sys.Float.mult(s,fan.sys.Float.minus(fan.sys.Float.make(1.0),f))));
    var $_u3 = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(i,fan.sys.Num.$type));
    if (fan.sys.ObjUtil.equals($_u3,0))
    {
      r = l;
      g = t;
      b = p;
    }
    else if (fan.sys.ObjUtil.equals($_u3,1))
    {
      r = q;
      g = l;
      b = p;
    }
    else if (fan.sys.ObjUtil.equals($_u3,2))
    {
      r = p;
      g = l;
      b = t;
    }
    else if (fan.sys.ObjUtil.equals($_u3,3))
    {
      r = p;
      g = q;
      b = l;
    }
    else if (fan.sys.ObjUtil.equals($_u3,4))
    {
      r = t;
      g = p;
      b = l;
    }
    else if (fan.sys.ObjUtil.equals($_u3,5))
    {
      r = l;
      g = p;
      b = q;
    }
    ;
  }
  ;
  return fan.graphics.Color.make(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(r,fan.sys.Float.make(255.0)),fan.sys.Num.$type)),16),fan.sys.Int.shiftl(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(g,fan.sys.Float.make(255.0)),fan.sys.Num.$type)),8)),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(b,fan.sys.Float.make(255.0)),fan.sys.Num.$type))),a);
}
fan.graphics.Color.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    if (fan.sys.Str.startsWith(s,"#"))
    {
      return fan.graphics.Color.parseHex(s);
    }
    ;
    var k = fan.graphics.Color.m_byKeyword.get(s);
    if (k != null)
    {
      return k;
    }
    ;
    var paren = fan.sys.Str.index(s,"(");
    if (paren != null)
    {
      if (fan.sys.ObjUtil.compareNE(fan.sys.Str.get(s,-1),41))
      {
        throw fan.sys.Err.make();
      }
      ;
      return fan.graphics.Color.parseFunc(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(paren,fan.sys.Int.$type),true)),fan.graphics.GeomUtil.split(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(paren,fan.sys.Int.$type),1),-2))));
    }
    ;
    throw fan.sys.Err.make();
  }
  catch ($_u4)
  {
    $_u4 = fan.sys.Err.make($_u4);
    if ($_u4 instanceof fan.sys.Err)
    {
      var e = $_u4;
      var e;
    }
    else
    {
      throw $_u4;
    }
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Color: ",s));
  }
  ;
  return null;
}
fan.graphics.Color.listFromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    var toks = fan.sys.Str.split(s,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable()));
    if (fan.sys.Str.contains(s,"("))
    {
      var acc = fan.sys.List.make(fan.sys.StrBuf.$type);
      var inParen = false;
      toks.each(fan.sys.Func.make$closure(
        fan.graphics.$clos$_u5,
        function(tok,i)
        {
          if (inParen)
          {
            fan.sys.ObjUtil.coerce(acc.last().addChar(44),fan.sys.StrBuf.$type.toNullable()).add(tok);
          }
          else
          {
            acc.add(fan.sys.StrBuf.make().add(tok));
          }
          ;
          if (fan.sys.Str.contains(tok,"("))
          {
            inParen = true;
          }
          ;
          if (fan.sys.Str.contains(tok,")"))
          {
            inParen = false;
          }
          ;
          return;
        }));
      toks = fan.sys.ObjUtil.coerce(acc.map(fan.sys.Func.make$closure(
        fan.graphics.$clos$_u6,
        function(buf)
        {
          return buf.toStr();
        })),fan.sys.Type.find("sys::Str[]"));
    }
    ;
    return fan.sys.ObjUtil.coerce(toks.map(fan.sys.Func.make$closure(
      fan.graphics.$clos$_u7,
      function(tok)
      {
        return fan.sys.ObjUtil.coerce(fan.graphics.Color.fromStr(tok),fan.graphics.Color.$type);
      })),fan.sys.Type.find("graphics::Color[]?"));
  }
  catch ($_u8)
  {
    $_u8 = fan.sys.Err.make($_u8);
    if ($_u8 instanceof fan.sys.Err)
    {
      var e = $_u8;
      var e;
      e.trace();
    }
    else
    {
      throw $_u8;
    }
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid color list: ",s));
  }
  ;
  return null;
}
fan.graphics.Color.parseHex = function(s)
{
  var sub = fan.sys.Str.getRange(s,fan.sys.Range.make(1,-1));
  var hex = fan.sys.Str.toInt(sub,16);
  var $_u9 = fan.sys.Str.size(sub);
  if (fan.sys.ObjUtil.equals($_u9,3))
  {
    var r = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),8),15);
    r = fan.sys.Int.or(fan.sys.Int.shiftl(r,4),r);
    var g = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),4),15);
    g = fan.sys.Int.or(fan.sys.Int.shiftl(g,4),g);
    var b = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),0),15);
    b = fan.sys.Int.or(fan.sys.Int.shiftl(b,4),b);
    return fan.graphics.Color.make(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(r,16),fan.sys.Int.shiftl(g,8)),b));
  }
  else if (fan.sys.ObjUtil.equals($_u9,4))
  {
    var r = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),12),15);
    r = fan.sys.Int.or(fan.sys.Int.shiftl(r,4),r);
    var g = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),8),15);
    g = fan.sys.Int.or(fan.sys.Int.shiftl(g,4),g);
    var b = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),4),15);
    b = fan.sys.Int.or(fan.sys.Int.shiftl(b,4),b);
    var a = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),0),15);
    a = fan.sys.Int.or(fan.sys.Int.shiftl(a,4),a);
    return fan.graphics.Color.makeRgb(r,g,b,fan.sys.Int.divFloat(a,fan.sys.Float.make(255.0)));
  }
  else if (fan.sys.ObjUtil.equals($_u9,6))
  {
    return fan.graphics.Color.make(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type));
  }
  else if (fan.sys.ObjUtil.equals($_u9,8))
  {
    return fan.graphics.Color.make(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),8),fan.sys.ObjUtil.coerce(fan.sys.Str.toFloat(fan.graphics.GeomUtil.formatFloat(fan.sys.Int.divFloat(fan.sys.Int.and(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),255),fan.sys.Float.make(255.0)))),fan.sys.Float.$type));
  }
  else
  {
    throw fan.sys.Err.make();
  }
  ;
}
fan.graphics.Color.parseFunc = function(func,args)
{
  var $_u10 = func;
  if (fan.sys.ObjUtil.equals($_u10,"rgb") || fan.sys.ObjUtil.equals($_u10,"rgba"))
  {
    return fan.graphics.Color.makeRgb(fan.graphics.Color.parseRgbArg(args.get(0)),fan.graphics.Color.parseRgbArg(args.get(1)),fan.graphics.Color.parseRgbArg(args.get(2)),fan.graphics.Color.parsePercentArg(args.getSafe(3)));
  }
  else if (fan.sys.ObjUtil.equals($_u10,"hsl") || fan.sys.ObjUtil.equals($_u10,"hsla"))
  {
    return fan.graphics.Color.makeHsl(fan.graphics.Color.parseDegArg(args.get(0)),fan.graphics.Color.parsePercentArg(args.get(1)),fan.graphics.Color.parsePercentArg(args.get(2)),fan.graphics.Color.parsePercentArg(args.getSafe(3)));
  }
  else
  {
    throw fan.sys.Err.make();
  }
  ;
}
fan.graphics.Color.parseRgbArg = function(s)
{
  if (fan.sys.ObjUtil.equals(fan.sys.Str.get(s,-1),37))
  {
    return fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.div(fan.sys.Float.mult(fan.sys.Float.make(255.0),fan.sys.ObjUtil.coerce(fan.sys.Str.toFloat(fan.sys.Str.getRange(s,fan.sys.Range.make(0,-2))),fan.sys.Float.$type)),fan.sys.Float.make(100.0)),fan.sys.Num.$type));
  }
  ;
  return fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(s),fan.sys.Int.$type);
}
fan.graphics.Color.parseDegArg = function(s)
{
  if (fan.sys.Str.endsWith(s,"deg"))
  {
    s = fan.sys.Str.getRange(s,fan.sys.Range.make(0,-4));
  }
  ;
  var f = fan.sys.Str.toFloat(s);
  if (fan.sys.ObjUtil.compareGT(f,fan.sys.Float.make(360.0)))
  {
    f = fan.sys.ObjUtil.coerce(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.mod(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(f,fan.sys.Num.$type)),360),fan.sys.Num.$type)),fan.sys.Float.$type.toNullable());
  }
  ;
  return fan.sys.ObjUtil.coerce(f,fan.sys.Float.$type);
}
fan.graphics.Color.parsePercentArg = function(s)
{
  if (s == null)
  {
    return fan.sys.Float.make(1.0);
  }
  ;
  if (fan.sys.ObjUtil.equals(fan.sys.Str.get(s,-1),37))
  {
    return fan.sys.Float.div(fan.sys.ObjUtil.coerce(fan.sys.Str.toFloat(fan.sys.Str.getRange(s,fan.sys.Range.make(0,-2))),fan.sys.Float.$type),fan.sys.Float.make(100.0));
  }
  ;
  return fan.sys.ObjUtil.coerce(fan.sys.Str.toFloat(s),fan.sys.Float.$type);
}
fan.graphics.Color.prototype.r = function()
{
  return fan.sys.Int.and(fan.sys.Int.shiftr(this.m_rgb,16),255);
}
fan.graphics.Color.prototype.g = function()
{
  return fan.sys.Int.and(fan.sys.Int.shiftr(this.m_rgb,8),255);
}
fan.graphics.Color.prototype.b = function()
{
  return fan.sys.Int.and(this.m_rgb,255);
}
fan.graphics.Color.prototype.h = function()
{
  var r = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.r(),fan.sys.Num.$type));
  var b = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.b(),fan.sys.Num.$type));
  var g = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.g(),fan.sys.Num.$type));
  var min = fan.sys.Float.min(r,fan.sys.Float.min(b,g));
  var max = fan.sys.Float.max(r,fan.sys.Float.max(b,g));
  var delta = fan.sys.Float.minus(max,min);
  var s = (function($this) { if (fan.sys.ObjUtil.equals(max,fan.sys.Float.make(0.0))) return fan.sys.Float.make(0.0); return fan.sys.Float.div(delta,max); })(this);
  var h = fan.sys.Float.make(0.0);
  if (fan.sys.ObjUtil.compareNE(s,fan.sys.Float.make(0.0)))
  {
    if (fan.sys.ObjUtil.equals(r,max))
    {
      h = fan.sys.Float.div(fan.sys.Float.minus(g,b),delta);
    }
    else
    {
      if (fan.sys.ObjUtil.equals(g,max))
      {
        h = fan.sys.Float.plus(fan.sys.Float.make(2.0),fan.sys.Float.div(fan.sys.Float.minus(b,r),delta));
      }
      else
      {
        if (fan.sys.ObjUtil.equals(b,max))
        {
          h = fan.sys.Float.plus(fan.sys.Float.make(4.0),fan.sys.Float.div(fan.sys.Float.minus(r,g),delta));
        }
        ;
      }
      ;
    }
    ;
    h = fan.sys.Float.mult(h,fan.sys.Float.make(60.0));
    if (fan.sys.ObjUtil.compareLT(h,fan.sys.Float.make(0.0)))
    {
      h = fan.sys.Float.plus(h,fan.sys.Float.make(360.0));
    }
    ;
  }
  ;
  return h;
}
fan.graphics.Color.prototype.s = function()
{
  var min = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.min(this.r(),fan.sys.Int.min(this.b(),this.g())),fan.sys.Num.$type));
  var max = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.max(this.r(),fan.sys.Int.max(this.b(),this.g())),fan.sys.Num.$type));
  return (function($this) { if (fan.sys.ObjUtil.equals(max,fan.sys.Float.make(0.0))) return fan.sys.Float.make(0.0); return fan.sys.Float.div(fan.sys.Float.minus(max,min),max); })(this);
}
fan.graphics.Color.prototype.l = function()
{
  return fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.max(this.r(),fan.sys.Int.max(this.b(),this.g())),fan.sys.Num.$type)),fan.sys.Float.make(255.0));
}
fan.graphics.Color.prototype.hash = function()
{
  return fan.sys.Int.xor(this.m_rgb,fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_a),24));
}
fan.graphics.Color.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.graphics.Color.$type);
  if (x == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(x.m_rgb,this.m_rgb) && fan.sys.ObjUtil.equals(x.m_a,this.m_a));
}
fan.graphics.Color.prototype.toStr = function()
{
  if (fan.sys.ObjUtil.compareGE(this.m_a,fan.sys.Float.make(1.0)))
  {
    return this.toHexStr();
  }
  ;
  var aStr = fan.sys.Float.toLocale(this.m_a,"0.##",fan.sys.Locale.m_en);
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("rgba(",fan.sys.ObjUtil.coerce(this.r(),fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.g(),fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.b(),fan.sys.Obj.$type.toNullable())),","),aStr),")");
}
fan.graphics.Color.prototype.toHexStr = function()
{
  var hex = fan.sys.Int.toHex(this.m_rgb,fan.sys.ObjUtil.coerce(6,fan.sys.Int.$type.toNullable()));
  if (fan.sys.ObjUtil.compareGE(this.m_a,fan.sys.Float.make(1.0)))
  {
    if ((fan.sys.ObjUtil.equals(fan.sys.Str.get(hex,0),fan.sys.Str.get(hex,1)) && fan.sys.ObjUtil.equals(fan.sys.Str.get(hex,2),fan.sys.Str.get(hex,3)) && fan.sys.ObjUtil.equals(fan.sys.Str.get(hex,4),fan.sys.Str.get(hex,5))))
    {
      return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("#",fan.sys.Int.toChar(fan.sys.Str.get(hex,0))),fan.sys.Int.toChar(fan.sys.Str.get(hex,2))),fan.sys.Int.toChar(fan.sys.Str.get(hex,4)));
    }
    else
    {
      return fan.sys.Str.plus("#",hex);
    }
    ;
  }
  ;
  var ahex = fan.sys.Int.toHex(fan.sys.Int.max(fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(fan.sys.Float.make(255.0),this.m_a),fan.sys.Num.$type)),255),0),fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()));
  return fan.sys.Str.plus(fan.sys.Str.plus("#",hex),ahex);
}
fan.graphics.Color.prototype.isColorPaint = function()
{
  return true;
}
fan.graphics.Color.prototype.asColorPaint = function()
{
  return this;
}
fan.graphics.Color.prototype.isTransparent = function()
{
  return fan.sys.ObjUtil.compareLE(this.m_a,fan.sys.Float.make(0.0));
}
fan.graphics.Color.prototype.opacity = function(opacity)
{
  if (opacity === undefined) opacity = fan.sys.Float.make(1.0);
  return fan.graphics.Color.make(this.m_rgb,fan.sys.Float.mult(this.m_a,opacity));
}
fan.graphics.Color.prototype.lighter = function(percentage)
{
  if (percentage === undefined) percentage = fan.sys.Float.make(0.2);
  var l = fan.sys.Float.min(fan.sys.Float.max(fan.sys.Float.plus(this.l(),percentage),fan.sys.Float.make(0.0)),fan.sys.Float.make(1.0));
  return fan.graphics.Color.makeHsl(this.h(),this.s(),l);
}
fan.graphics.Color.prototype.darker = function(percentage)
{
  if (percentage === undefined) percentage = fan.sys.Float.make(0.2);
  return this.lighter(fan.sys.Float.negate(percentage));
}
fan.graphics.Color.prototype.saturate = function(percentage)
{
  if (percentage === undefined) percentage = fan.sys.Float.make(0.2);
  var s = fan.sys.Float.min(fan.sys.Float.max(fan.sys.Float.plus(this.s(),percentage),fan.sys.Float.make(0.0)),fan.sys.Float.make(1.0));
  return fan.graphics.Color.makeHsl(this.h(),s,this.l());
}
fan.graphics.Color.prototype.desaturate = function(percentage)
{
  if (percentage === undefined) percentage = fan.sys.Float.make(0.2);
  return this.saturate(fan.sys.Float.negate(percentage));
}
fan.graphics.Color.interpolateRgb = function(a,b,t)
{
  return fan.graphics.Color.makeRgb(fan.graphics.Color.interpolateByte(a.r(),b.r(),t),fan.graphics.Color.interpolateByte(a.g(),b.g(),t),fan.graphics.Color.interpolateByte(a.b(),b.b(),t),fan.graphics.Color.interpolatePercent(a.m_a,b.m_a,t));
}
fan.graphics.Color.interpolateHsl = function(a,b,t)
{
  return fan.graphics.Color.makeHsl(fan.graphics.Color.interpolateDeg(a.h(),b.h(),t),fan.graphics.Color.interpolatePercent(a.s(),b.s(),t),fan.graphics.Color.interpolatePercent(a.l(),b.l(),t),fan.graphics.Color.interpolatePercent(a.m_a,b.m_a,t));
}
fan.graphics.Color.interpolateDeg = function(a,b,t)
{
  return fan.sys.Float.max(fan.sys.Float.min(fan.sys.Float.plus(a,fan.sys.Float.mult(fan.sys.Float.minus(b,a),t)),fan.sys.Float.make(360.0)),fan.sys.Float.make(0.0));
}
fan.graphics.Color.interpolateByte = function(a,b,t)
{
  return fan.sys.Int.max(fan.sys.Int.min(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Int.plusFloat(a,fan.sys.Int.multFloat(fan.sys.Int.minus(b,a),t)),fan.sys.Num.$type)),255),0);
}
fan.graphics.Color.interpolatePercent = function(a,b,t)
{
  return fan.sys.Float.max(fan.sys.Float.min(fan.sys.Float.plus(a,fan.sys.Float.mult(fan.sys.Float.minus(b,a),t)),fan.sys.Float.make(1.0)),fan.sys.Float.make(0.0));
}
fan.graphics.Color.keywords = function()
{
  return fan.graphics.Color.m_byKeyword.keys();
}
fan.graphics.Color.static$init = function()
{
  var $this = this;
  fan.graphics.Color.m_transparent = fan.graphics.Color.make(0,fan.sys.Float.make(0.0));
  fan.graphics.Color.m_black = fan.graphics.Color.make(0,fan.sys.Float.make(1.0));
  fan.graphics.Color.m_white = fan.graphics.Color.make(16777215,fan.sys.Float.make(1.0));
  if (true)
  {
    var acc = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("graphics::Color")),fan.sys.Func.make$closure(
      fan.graphics.$clos$_u13,
      function(it)
      {
        it.caseInsensitive$(true);
        return;
      })),fan.sys.Type.find("[sys::Str:graphics::Color]"));
    acc.set("black",fan.graphics.Color.make(0));
    acc.set("silver",fan.graphics.Color.make(12632256));
    acc.set("gray",fan.graphics.Color.make(8421504));
    acc.set("white",fan.graphics.Color.make(16777215));
    acc.set("maroon",fan.graphics.Color.make(8388608));
    acc.set("red",fan.graphics.Color.make(16711680));
    acc.set("purple",fan.graphics.Color.make(8388736));
    acc.set("fuchsia",fan.graphics.Color.make(16711935));
    acc.set("green",fan.graphics.Color.make(32768));
    acc.set("lime",fan.graphics.Color.make(65280));
    acc.set("olive",fan.graphics.Color.make(8421376));
    acc.set("yellow",fan.graphics.Color.make(16776960));
    acc.set("navy",fan.graphics.Color.make(128));
    acc.set("blue",fan.graphics.Color.make(255));
    acc.set("teal",fan.graphics.Color.make(32896));
    acc.set("aqua",fan.graphics.Color.make(65535));
    acc.set("orange",fan.graphics.Color.make(16753920));
    acc.set("aliceblue",fan.graphics.Color.make(15792383));
    acc.set("antiquewhite",fan.graphics.Color.make(16444375));
    acc.set("aquamarine",fan.graphics.Color.make(8388564));
    acc.set("azure",fan.graphics.Color.make(15794175));
    acc.set("beige",fan.graphics.Color.make(16119260));
    acc.set("bisque",fan.graphics.Color.make(16770244));
    acc.set("blanchedalmond",fan.graphics.Color.make(16772045));
    acc.set("blueviolet",fan.graphics.Color.make(9055202));
    acc.set("brown",fan.graphics.Color.make(10824234));
    acc.set("burlywood",fan.graphics.Color.make(14596231));
    acc.set("cadetblue",fan.graphics.Color.make(6266528));
    acc.set("chartreuse",fan.graphics.Color.make(8388352));
    acc.set("chocolate",fan.graphics.Color.make(13789470));
    acc.set("coral",fan.graphics.Color.make(16744272));
    acc.set("cornflowerblue",fan.graphics.Color.make(6591981));
    acc.set("cornsilk",fan.graphics.Color.make(16775388));
    acc.set("crimson",fan.graphics.Color.make(14423100));
    acc.set("cyan",fan.graphics.Color.make(65535));
    acc.set("darkblue",fan.graphics.Color.make(139));
    acc.set("darkcyan",fan.graphics.Color.make(35723));
    acc.set("darkgoldenrod",fan.graphics.Color.make(12092939));
    acc.set("darkgray",fan.graphics.Color.make(11119017));
    acc.set("darkgreen",fan.graphics.Color.make(25600));
    acc.set("darkgrey",fan.graphics.Color.make(11119017));
    acc.set("darkkhaki",fan.graphics.Color.make(12433259));
    acc.set("darkmagenta",fan.graphics.Color.make(9109643));
    acc.set("darkolivegreen",fan.graphics.Color.make(5597999));
    acc.set("darkorange",fan.graphics.Color.make(16747520));
    acc.set("darkorchid",fan.graphics.Color.make(10040012));
    acc.set("darkred",fan.graphics.Color.make(9109504));
    acc.set("darksalmon",fan.graphics.Color.make(15308410));
    acc.set("darkseagreen",fan.graphics.Color.make(9419919));
    acc.set("darkslateblue",fan.graphics.Color.make(4734347));
    acc.set("darkslategray",fan.graphics.Color.make(3100495));
    acc.set("darkslategrey",fan.graphics.Color.make(3100495));
    acc.set("darkturquoise",fan.graphics.Color.make(52945));
    acc.set("darkviolet",fan.graphics.Color.make(9699539));
    acc.set("deeppink",fan.graphics.Color.make(16716947));
    acc.set("deepskyblue",fan.graphics.Color.make(49151));
    acc.set("dimgray",fan.graphics.Color.make(6908265));
    acc.set("dimgrey",fan.graphics.Color.make(6908265));
    acc.set("dodgerblue",fan.graphics.Color.make(2003199));
    acc.set("firebrick",fan.graphics.Color.make(11674146));
    acc.set("floralwhite",fan.graphics.Color.make(16775920));
    acc.set("forestgreen",fan.graphics.Color.make(2263842));
    acc.set("gainsboro",fan.graphics.Color.make(14474460));
    acc.set("ghostwhite",fan.graphics.Color.make(16316671));
    acc.set("gold",fan.graphics.Color.make(16766720));
    acc.set("goldenrod",fan.graphics.Color.make(14329120));
    acc.set("greenyellow",fan.graphics.Color.make(11403055));
    acc.set("grey",fan.graphics.Color.make(8421504));
    acc.set("honeydew",fan.graphics.Color.make(15794160));
    acc.set("hotpink",fan.graphics.Color.make(16738740));
    acc.set("indianred",fan.graphics.Color.make(13458524));
    acc.set("indigo",fan.graphics.Color.make(4915330));
    acc.set("ivory",fan.graphics.Color.make(16777200));
    acc.set("khaki",fan.graphics.Color.make(15787660));
    acc.set("lavender",fan.graphics.Color.make(15132410));
    acc.set("lavenderblush",fan.graphics.Color.make(16773365));
    acc.set("lawngreen",fan.graphics.Color.make(8190976));
    acc.set("lemonchiffon",fan.graphics.Color.make(16775885));
    acc.set("lightblue",fan.graphics.Color.make(11393254));
    acc.set("lightcoral",fan.graphics.Color.make(15761536));
    acc.set("lightcyan",fan.graphics.Color.make(14745599));
    acc.set("lightgoldenrodyellow",fan.graphics.Color.make(16448210));
    acc.set("lightgray",fan.graphics.Color.make(13882323));
    acc.set("lightgreen",fan.graphics.Color.make(9498256));
    acc.set("lightgrey",fan.graphics.Color.make(13882323));
    acc.set("lightpink",fan.graphics.Color.make(16758465));
    acc.set("lightsalmon",fan.graphics.Color.make(16752762));
    acc.set("lightseagreen",fan.graphics.Color.make(2142890));
    acc.set("lightskyblue",fan.graphics.Color.make(8900346));
    acc.set("lightslategray",fan.graphics.Color.make(7833753));
    acc.set("lightslategrey",fan.graphics.Color.make(7833753));
    acc.set("lightsteelblue",fan.graphics.Color.make(11584734));
    acc.set("lightyellow",fan.graphics.Color.make(16777184));
    acc.set("limegreen",fan.graphics.Color.make(3329330));
    acc.set("linen",fan.graphics.Color.make(16445670));
    acc.set("mediumaquamarine",fan.graphics.Color.make(6737322));
    acc.set("mediumblue",fan.graphics.Color.make(205));
    acc.set("mediumorchid",fan.graphics.Color.make(12211667));
    acc.set("mediumpurple",fan.graphics.Color.make(9662683));
    acc.set("mediumseagreen",fan.graphics.Color.make(3978097));
    acc.set("mediumslateblue",fan.graphics.Color.make(8087790));
    acc.set("mediumspringgreen",fan.graphics.Color.make(64154));
    acc.set("mediumturquoise",fan.graphics.Color.make(4772300));
    acc.set("mediumvioletred",fan.graphics.Color.make(13047173));
    acc.set("midnightblue",fan.graphics.Color.make(1644912));
    acc.set("mintcream",fan.graphics.Color.make(16121850));
    acc.set("mistyrose",fan.graphics.Color.make(16770273));
    acc.set("moccasin",fan.graphics.Color.make(16770229));
    acc.set("navajowhite",fan.graphics.Color.make(16768685));
    acc.set("oldlace",fan.graphics.Color.make(16643558));
    acc.set("olivedrab",fan.graphics.Color.make(7048739));
    acc.set("orangered",fan.graphics.Color.make(16729344));
    acc.set("orchid",fan.graphics.Color.make(14315734));
    acc.set("palegoldenrod",fan.graphics.Color.make(15657130));
    acc.set("palegreen",fan.graphics.Color.make(10025880));
    acc.set("paleturquoise",fan.graphics.Color.make(11529966));
    acc.set("palevioletred",fan.graphics.Color.make(14381203));
    acc.set("papayawhip",fan.graphics.Color.make(16773077));
    acc.set("peachpuff",fan.graphics.Color.make(16767673));
    acc.set("peru",fan.graphics.Color.make(13468991));
    acc.set("pink",fan.graphics.Color.make(16761035));
    acc.set("plum",fan.graphics.Color.make(14524637));
    acc.set("powderblue",fan.graphics.Color.make(11591910));
    acc.set("rosybrown",fan.graphics.Color.make(12357519));
    acc.set("royalblue",fan.graphics.Color.make(4286945));
    acc.set("saddlebrown",fan.graphics.Color.make(9127187));
    acc.set("salmon",fan.graphics.Color.make(16416882));
    acc.set("sandybrown",fan.graphics.Color.make(16032864));
    acc.set("seagreen",fan.graphics.Color.make(3050327));
    acc.set("seashell",fan.graphics.Color.make(16774638));
    acc.set("sienna",fan.graphics.Color.make(10506797));
    acc.set("skyblue",fan.graphics.Color.make(8900331));
    acc.set("slateblue",fan.graphics.Color.make(6970061));
    acc.set("slategray",fan.graphics.Color.make(7372944));
    acc.set("slategrey",fan.graphics.Color.make(7372944));
    acc.set("snow",fan.graphics.Color.make(16775930));
    acc.set("springgreen",fan.graphics.Color.make(65407));
    acc.set("steelblue",fan.graphics.Color.make(4620980));
    acc.set("tan",fan.graphics.Color.make(13808780));
    acc.set("thistle",fan.graphics.Color.make(14204888));
    acc.set("tomato",fan.graphics.Color.make(16737095));
    acc.set("transparent",fan.graphics.Color.m_transparent);
    acc.set("turquoise",fan.graphics.Color.make(4251856));
    acc.set("violet",fan.graphics.Color.make(15631086));
    acc.set("wheat",fan.graphics.Color.make(16113331));
    acc.set("whitesmoke",fan.graphics.Color.make(16119285));
    acc.set("yellowgreen",fan.graphics.Color.make(10145074));
    acc.set("rebeccapurple",fan.graphics.Color.make(6697881));
    fan.graphics.Color.m_byKeyword = fan.sys.ObjUtil.coerce((function($this) { var $_u14 = acc; if ($_u14 == null) return null; return fan.sys.ObjUtil.toImmutable($_u14); })(this),fan.sys.Type.find("[sys::Str:graphics::Color]"));
  }
  ;
  return;
}
fan.graphics.Color.m_transparent = null;
fan.graphics.Color.m_black = null;
fan.graphics.Color.m_white = null;
fan.graphics.Color.prototype.m_rgb = 0;
fan.graphics.Color.prototype.m_a = fan.sys.Float.make(0);
fan.graphics.Color.m_byKeyword = null;
fan.graphics.Font = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Font.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_names = fan.sys.ObjUtil.coerce((function($this) { var $_u15 = fan.sys.List.make(fan.sys.Str.$type, ["sans-serif"]); if ($_u15 == null) return null; return fan.sys.ObjUtil.toImmutable($_u15); })(this),fan.sys.Type.find("sys::Str[]"));
  this.m_size = fan.sys.Float.make(11.0);
  this.m_weight = fan.graphics.FontWeight.m_normal;
  this.m_style = fan.graphics.FontStyle.m_normal;
  return;
}
fan.graphics.Font.prototype.$typeof = function() { return fan.graphics.Font.$type; }
fan.graphics.Font.make = function(f) {
  var self = new fan.graphics.Font();
  fan.graphics.Font.make$(self,f);
  return self;
  }
fan.graphics.Font.make$ = function(self,f)
{
  ;
  f.call(self);
  return;
}
fan.graphics.Font.makeFields = function(names,size,weight,style) {
  var self = new fan.graphics.Font();
  fan.graphics.Font.makeFields$(self,names,size,weight,style);
  return self;
  }
fan.graphics.Font.makeFields$ = function(self,names,size,weight,style)
{
  if (weight === undefined) weight = fan.graphics.FontWeight.m_normal;
  if (style === undefined) style = fan.graphics.FontStyle.m_normal;
  ;
  if (names.isEmpty())
  {
    throw fan.sys.ArgErr.make("No names specified");
  }
  ;
  self.m_names = fan.sys.ObjUtil.coerce((function($this) { var $_u16 = names; if ($_u16 == null) return null; return fan.sys.ObjUtil.toImmutable($_u16); })(self),fan.sys.Type.find("sys::Str[]"));
  self.m_size = size;
  self.m_weight = weight;
  self.m_style = style;
  self.m_data = fan.graphics.FontData.find(self);
  return;
}
fan.graphics.Font.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var toks = fan.sys.Str.split(s);
    var toki = 0;
    var style = fan.graphics.FontStyle.decode(toks.get(toki),false);
    if (style != null)
    {
      (function($this) { var $_u17 = toki; toki = fan.sys.Int.increment(toki); return $_u17; })(this);
    }
    else
    {
      style = fan.graphics.FontStyle.m_normal;
    }
    ;
    var weight = fan.graphics.FontWeight.decode(toks.get(toki),false);
    if (weight != null)
    {
      (function($this) { var $_u18 = toki; toki = fan.sys.Int.increment(toki); return $_u18; })(this);
    }
    else
    {
      weight = fan.graphics.FontWeight.m_normal;
    }
    ;
    if (!fan.sys.Str.endsWith(toks.get(toki),"pt"))
    {
      throw fan.sys.Err.make();
    }
    ;
    var size = fan.sys.Str.toFloat(fan.sys.Str.getRange(toks.get(toki),fan.sys.Range.make(0,-3)));
    (function($this) { var $_u19 = toki; toki = fan.sys.Int.increment(toki); return $_u19; })(this);
    var names = fan.graphics.Font.decodeNames(toks.getRange(fan.sys.Range.make(toki,-1)).join(" "));
    return fan.graphics.Font.makeFields(names,fan.sys.ObjUtil.coerce(size,fan.sys.Float.$type),fan.sys.ObjUtil.coerce(weight,fan.graphics.FontWeight.$type),fan.sys.ObjUtil.coerce(style,fan.graphics.FontStyle.$type));
  }
  catch ($_u20)
  {
    $_u20 = fan.sys.Err.make($_u20);
    if ($_u20 instanceof fan.sys.Err)
    {
      var e = $_u20;
      var e;
    }
    else
    {
      throw $_u20;
    }
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Font: ",s));
  }
  ;
  return null;
}
fan.graphics.Font.decodeNames = function(s)
{
  return fan.sys.Str.split(s,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable()));
}
fan.graphics.Font.decodeSize = function(s)
{
  if (!fan.sys.Str.endsWith(s,"pt"))
  {
    throw fan.sys.Err.make(fan.sys.Str.plus("Invalid font size: ",s));
  }
  ;
  return fan.sys.ObjUtil.coerce(fan.sys.Str.toFloat(fan.sys.Str.getRange(s,fan.sys.Range.make(0,-3))),fan.sys.Float.$type);
}
fan.graphics.Font.decodeWeight = function(s)
{
  return fan.sys.ObjUtil.coerce(fan.graphics.FontWeight.decode(s),fan.graphics.FontWeight.$type);
}
fan.graphics.Font.decodeStyle = function(s)
{
  return fan.sys.ObjUtil.coerce(fan.graphics.FontStyle.decode(s),fan.graphics.FontStyle.$type);
}
fan.graphics.Font.fromProps = function(props)
{
  if (props.get("font-family") == null)
  {
    return null;
  }
  ;
  return fan.graphics.Font.makeFields(fan.graphics.Font.decodeNames(fan.sys.ObjUtil.coerce((function($this) { var $_u21 = props.get("font-family"); if ($_u21 != null) return $_u21; return "sans-serif"; })(this),fan.sys.Str.$type)),fan.graphics.Font.decodeSize(fan.sys.ObjUtil.coerce((function($this) { var $_u22 = props.get("font-size"); if ($_u22 != null) return $_u22; return "12pt"; })(this),fan.sys.Str.$type)),fan.graphics.Font.decodeWeight(fan.sys.ObjUtil.coerce((function($this) { var $_u23 = props.get("font-weight"); if ($_u23 != null) return $_u23; return "normal"; })(this),fan.sys.Str.$type)),fan.graphics.Font.decodeStyle(fan.sys.ObjUtil.coerce((function($this) { var $_u24 = props.get("font-style"); if ($_u24 != null) return $_u24; return "normal"; })(this),fan.sys.Str.$type)));
}
fan.graphics.Font.prototype.toProps = function()
{
  var $this = this;
  var acc = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),fan.sys.Func.make$closure(
    fan.graphics.$clos$_u25,
    function(it)
    {
      it.ordered$(true);
      return;
    })),fan.sys.Type.find("[sys::Str:sys::Str]"));
  acc.set("font-family",this.m_names.join(","));
  acc.set("font-size",fan.sys.Str.plus(fan.graphics.GeomUtil.formatFloat(this.m_size),"pt"));
  if (!this.m_weight.isNormal())
  {
    acc.set("font-weight",fan.sys.Int.toStr(this.m_weight.m_num));
  }
  ;
  if (!this.m_style.isNormal())
  {
    acc.set("font-style",this.m_style.$name());
  }
  ;
  return acc;
}
fan.graphics.Font.prototype.$name = function()
{
  return fan.sys.ObjUtil.coerce(this.m_names.first(),fan.sys.Str.$type);
}
fan.graphics.Font.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(this.m_names.hash(),fan.sys.Float.hash(this.m_size)),fan.sys.Int.mult(fan.sys.ObjUtil.hash(this.m_weight),73)),fan.sys.Int.mult(fan.sys.ObjUtil.hash(this.m_style),19));
}
fan.graphics.Font.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.graphics.Font.$type);
  if (x == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_names,x.m_names) && fan.sys.ObjUtil.equals(this.m_size,x.m_size) && fan.sys.ObjUtil.equals(this.m_weight,x.m_weight) && fan.sys.ObjUtil.equals(this.m_style,x.m_style));
}
fan.graphics.Font.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make();
  if (!this.m_style.isNormal())
  {
    s.add(this.m_style.$name()).addChar(32);
  }
  ;
  if (!this.m_weight.isNormal())
  {
    s.add(fan.sys.ObjUtil.coerce(this.m_weight.m_num,fan.sys.Obj.$type.toNullable())).addChar(32);
  }
  ;
  s.add(fan.graphics.GeomUtil.formatFloat(this.m_size)).add("pt").addChar(32);
  s.add(this.m_names.join(","));
  return s.toStr();
}
fan.graphics.Font.prototype.toSize = function(size)
{
  if (fan.sys.ObjUtil.equals(this.m_size,size))
  {
    return this;
  }
  ;
  return fan.graphics.Font.makeFields(this.m_names,size,this.m_weight,this.m_style);
}
fan.graphics.Font.prototype.toStyle = function(style)
{
  if (fan.sys.ObjUtil.equals(this.m_style,style))
  {
    return this;
  }
  ;
  return fan.graphics.Font.makeFields(this.m_names,this.m_size,this.m_weight,style);
}
fan.graphics.Font.prototype.toWeight = function(weight)
{
  if (fan.sys.ObjUtil.equals(this.m_weight,weight))
  {
    return this;
  }
  ;
  return fan.graphics.Font.makeFields(this.m_names,this.m_size,weight,this.m_style);
}
fan.graphics.Font.prototype.normalize = function()
{
  if (this.m_data != null)
  {
    return this;
  }
  ;
  return fan.graphics.FontData.normalize(this);
}
fan.graphics.Font.prototype.metrics = function(dc)
{
  if (dc === undefined) dc = fan.graphics.DeviceContext.cur();
  if (this.m_data == null)
  {
    throw fan.sys.UnsupportedErr.make(fan.sys.Str.plus("FontMetrics not supported: ",this));
  }
  ;
  return fan.graphics.FontDataMetrics.make(dc,this.m_size,fan.sys.ObjUtil.coerce(this.m_data,fan.graphics.FontData.$type));
}
fan.graphics.Font.prototype.m_names = null;
fan.graphics.Font.prototype.m_size = fan.sys.Float.make(0);
fan.graphics.Font.prototype.m_weight = null;
fan.graphics.Font.prototype.m_style = null;
fan.graphics.Font.prototype.m_data = null;
fan.graphics.FontMetrics = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.FontMetrics.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.FontMetrics.prototype.$typeof = function() { return fan.graphics.FontMetrics.$type; }
fan.graphics.FontMetrics.make = function() {
  var self = new fan.graphics.FontMetrics();
  fan.graphics.FontMetrics.make$(self);
  return self;
  }
fan.graphics.FontMetrics.make$ = function(self)
{
  return;
}
fan.graphics.FontDataMetrics = fan.sys.Obj.$extend(fan.graphics.FontMetrics);
fan.graphics.FontDataMetrics.prototype.$ctor = function()
{
  fan.graphics.FontMetrics.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.FontDataMetrics.prototype.$typeof = function() { return fan.graphics.FontDataMetrics.$type; }
fan.graphics.FontDataMetrics.make = function(dc,size,data) {
  var self = new fan.graphics.FontDataMetrics();
  fan.graphics.FontDataMetrics.make$(self,dc,size,data);
  return self;
  }
fan.graphics.FontDataMetrics.make$ = function(self,dc,size,data)
{
  fan.graphics.FontMetrics.make$(self);
  self.m_data = data;
  self.m_size = size;
  self.m_ratio = fan.sys.Float.div(fan.sys.Float.mult(fan.sys.Float.mult(fan.sys.Float.div(dc.m_dpi,fan.sys.Float.make(72.0)),fan.graphics.FontDataMetrics.m_fudge),size),fan.sys.Float.make(1000.0));
  return;
}
fan.graphics.FontDataMetrics.prototype.height = function()
{
  return fan.sys.Float.round(fan.sys.Int.multFloat(this.m_data.m_height,this.m_ratio));
}
fan.graphics.FontDataMetrics.prototype.ascent = function()
{
  return fan.sys.Float.round(fan.sys.Int.multFloat(this.m_data.m_ascent,this.m_ratio));
}
fan.graphics.FontDataMetrics.prototype.descent = function()
{
  return fan.sys.Float.round(fan.sys.Int.multFloat(this.m_data.m_descent,this.m_ratio));
}
fan.graphics.FontDataMetrics.prototype.leading = function()
{
  return fan.sys.Float.round(fan.sys.Int.multFloat(this.m_data.m_leading,this.m_ratio));
}
fan.graphics.FontDataMetrics.prototype.width = function(s)
{
  var d = this.m_data;
  var w = 0;
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,fan.sys.Str.size(s)); i = fan.sys.Int.increment(i))
  {
    w = fan.sys.Int.plus(w,d.charWidth(fan.sys.Str.get(s,i)));
  }
  ;
  return fan.sys.Float.round(fan.sys.Float.mult(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(w,fan.sys.Num.$type)),this.m_ratio));
}
fan.graphics.FontDataMetrics.prototype.lastChar = function()
{
  return this.m_data.m_lastChar;
}
fan.graphics.FontDataMetrics.static$init = function()
{
  fan.graphics.FontDataMetrics.m_fudge = fan.sys.Float.make(1.02);
  return;
}
fan.graphics.FontDataMetrics.m_fudge = fan.sys.Float.make(0);
fan.graphics.FontDataMetrics.prototype.m_data = null;
fan.graphics.FontDataMetrics.prototype.m_size = fan.sys.Float.make(0);
fan.graphics.FontDataMetrics.prototype.m_ratio = fan.sys.Float.make(0);
fan.graphics.FontWeight = fan.sys.Obj.$extend(fan.sys.Enum);
fan.graphics.FontWeight.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.FontWeight.prototype.$typeof = function() { return fan.graphics.FontWeight.$type; }
fan.graphics.FontWeight.prototype.isNormal = function()
{
  return this === fan.graphics.FontWeight.m_normal;
}
fan.graphics.FontWeight.fromNum = function(num,checked)
{
  if (checked === undefined) checked = true;
  var $_u26 = num;
  if (fan.sys.ObjUtil.equals($_u26,100))
  {
    return fan.graphics.FontWeight.m_thin;
  }
  else if (fan.sys.ObjUtil.equals($_u26,200))
  {
    return fan.graphics.FontWeight.m_extraLight;
  }
  else if (fan.sys.ObjUtil.equals($_u26,300))
  {
    return fan.graphics.FontWeight.m_light;
  }
  else if (fan.sys.ObjUtil.equals($_u26,400))
  {
    return fan.graphics.FontWeight.m_normal;
  }
  else if (fan.sys.ObjUtil.equals($_u26,500))
  {
    return fan.graphics.FontWeight.m_medium;
  }
  else if (fan.sys.ObjUtil.equals($_u26,600))
  {
    return fan.graphics.FontWeight.m_semiBold;
  }
  else if (fan.sys.ObjUtil.equals($_u26,700))
  {
    return fan.graphics.FontWeight.m_bold;
  }
  else if (fan.sys.ObjUtil.equals($_u26,800))
  {
    return fan.graphics.FontWeight.m_extraBold;
  }
  else if (fan.sys.ObjUtil.equals($_u26,900))
  {
    return fan.graphics.FontWeight.m_black;
  }
  ;
  if (checked)
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid FontWeight num: ",fan.sys.ObjUtil.coerce(num,fan.sys.Obj.$type.toNullable())));
  }
  ;
  return null;
}
fan.graphics.FontWeight.decode = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var val = fan.graphics.FontWeight.fromStr(s,false);
    if (val != null)
    {
      return val;
    }
    ;
    return fan.graphics.FontWeight.fromNum(fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(s),fan.sys.Int.$type));
  }
  catch ($_u27)
  {
    $_u27 = fan.sys.Err.make($_u27);
    if ($_u27 instanceof fan.sys.Err)
    {
      var e = $_u27;
      var e;
    }
    else
    {
      throw $_u27;
    }
  }
  ;
  if (checked)
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid FontWeight: ",s));
  }
  ;
  return null;
}
fan.graphics.FontWeight.make = function($ordinal,$name,num) {
  var self = new fan.graphics.FontWeight();
  fan.graphics.FontWeight.make$(self,$ordinal,$name,num);
  return self;
  }
fan.graphics.FontWeight.make$ = function(self,$ordinal,$name,num)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  self.m_num = num;
  return;
}
fan.graphics.FontWeight.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.graphics.FontWeight.$type,$name,checked),fan.graphics.FontWeight.$type.toNullable());
}
fan.graphics.FontWeight.static$init = function()
{
  fan.graphics.FontWeight.m_thin = fan.graphics.FontWeight.make(0,"thin",100);
  fan.graphics.FontWeight.m_extraLight = fan.graphics.FontWeight.make(1,"extraLight",200);
  fan.graphics.FontWeight.m_light = fan.graphics.FontWeight.make(2,"light",300);
  fan.graphics.FontWeight.m_normal = fan.graphics.FontWeight.make(3,"normal",400);
  fan.graphics.FontWeight.m_medium = fan.graphics.FontWeight.make(4,"medium",500);
  fan.graphics.FontWeight.m_semiBold = fan.graphics.FontWeight.make(5,"semiBold",600);
  fan.graphics.FontWeight.m_bold = fan.graphics.FontWeight.make(6,"bold",700);
  fan.graphics.FontWeight.m_extraBold = fan.graphics.FontWeight.make(7,"extraBold",800);
  fan.graphics.FontWeight.m_black = fan.graphics.FontWeight.make(8,"black",900);
  fan.graphics.FontWeight.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u28 = fan.sys.List.make(fan.graphics.FontWeight.$type, [fan.graphics.FontWeight.m_thin,fan.graphics.FontWeight.m_extraLight,fan.graphics.FontWeight.m_light,fan.graphics.FontWeight.m_normal,fan.graphics.FontWeight.m_medium,fan.graphics.FontWeight.m_semiBold,fan.graphics.FontWeight.m_bold,fan.graphics.FontWeight.m_extraBold,fan.graphics.FontWeight.m_black]); if ($_u28 == null) return null; return fan.sys.ObjUtil.toImmutable($_u28); })(this),fan.sys.Type.find("graphics::FontWeight[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.graphics.FontWeight.m_thin = null;
fan.graphics.FontWeight.m_extraLight = null;
fan.graphics.FontWeight.m_light = null;
fan.graphics.FontWeight.m_normal = null;
fan.graphics.FontWeight.m_medium = null;
fan.graphics.FontWeight.m_semiBold = null;
fan.graphics.FontWeight.m_bold = null;
fan.graphics.FontWeight.m_extraBold = null;
fan.graphics.FontWeight.m_black = null;
fan.graphics.FontWeight.m_vals = null;
fan.graphics.FontWeight.prototype.m_num = 0;
fan.graphics.FontStyle = fan.sys.Obj.$extend(fan.sys.Enum);
fan.graphics.FontStyle.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.FontStyle.prototype.$typeof = function() { return fan.graphics.FontStyle.$type; }
fan.graphics.FontStyle.prototype.isNormal = function()
{
  return this === fan.graphics.FontStyle.m_normal;
}
fan.graphics.FontStyle.decode = function(s,checked)
{
  if (checked === undefined) checked = true;
  return fan.graphics.FontStyle.fromStr(s,checked);
}
fan.graphics.FontStyle.make = function($ordinal,$name) {
  var self = new fan.graphics.FontStyle();
  fan.graphics.FontStyle.make$(self,$ordinal,$name);
  return self;
  }
fan.graphics.FontStyle.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.graphics.FontStyle.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.graphics.FontStyle.$type,$name,checked),fan.graphics.FontStyle.$type.toNullable());
}
fan.graphics.FontStyle.static$init = function()
{
  fan.graphics.FontStyle.m_normal = fan.graphics.FontStyle.make(0,"normal");
  fan.graphics.FontStyle.m_italic = fan.graphics.FontStyle.make(1,"italic");
  fan.graphics.FontStyle.m_oblique = fan.graphics.FontStyle.make(2,"oblique");
  fan.graphics.FontStyle.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u29 = fan.sys.List.make(fan.graphics.FontStyle.$type, [fan.graphics.FontStyle.m_normal,fan.graphics.FontStyle.m_italic,fan.graphics.FontStyle.m_oblique]); if ($_u29 == null) return null; return fan.sys.ObjUtil.toImmutable($_u29); })(this),fan.sys.Type.find("graphics::FontStyle[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.graphics.FontStyle.m_normal = null;
fan.graphics.FontStyle.m_italic = null;
fan.graphics.FontStyle.m_oblique = null;
fan.graphics.FontStyle.m_vals = null;
fan.graphics.Image = function() {}
fan.graphics.Image.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Image.prototype.$typeof = function() { return fan.graphics.Image.$type; }
fan.graphics.Image.prototype.w = function()
{
  return this.size().m_w;
}
fan.graphics.Image.prototype.h = function()
{
  return this.size().m_h;
}
fan.graphics.Image.mimeForExt = function(ext)
{
  ext = fan.sys.Str.lower(ext);
  if (fan.sys.ObjUtil.equals(ext,"svg"))
  {
    return fan.graphics.Image.m_mimeSvg;
  }
  ;
  if (fan.sys.ObjUtil.equals(ext,"png"))
  {
    return fan.graphics.Image.m_mimePng;
  }
  ;
  if ((fan.sys.ObjUtil.equals(ext,"jpg") || fan.sys.ObjUtil.equals(ext,"jpeg")))
  {
    return fan.graphics.Image.m_mimeJpeg;
  }
  ;
  if (fan.sys.ObjUtil.equals(ext,"gif"))
  {
    return fan.graphics.Image.m_mimeGif;
  }
  ;
  return fan.sys.ObjUtil.coerce((function($this) { var $_u30 = fan.sys.MimeType.forExt(ext); if ($_u30 != null) return $_u30; return fan.sys.MimeType.fromStr("image/unknown"); })(this),fan.sys.MimeType.$type);
}
fan.graphics.Image.static$init = function()
{
  fan.graphics.Image.m_mimePng = fan.sys.ObjUtil.coerce(fan.sys.MimeType.fromStr("image/png"),fan.sys.MimeType.$type);
  fan.graphics.Image.m_mimeGif = fan.sys.ObjUtil.coerce(fan.sys.MimeType.fromStr("image/gif"),fan.sys.MimeType.$type);
  fan.graphics.Image.m_mimeJpeg = fan.sys.ObjUtil.coerce(fan.sys.MimeType.fromStr("image/jpeg"),fan.sys.MimeType.$type);
  fan.graphics.Image.m_mimeSvg = fan.sys.ObjUtil.coerce(fan.sys.MimeType.fromStr("image/svg+xml"),fan.sys.MimeType.$type);
  return;
}
fan.graphics.Image.m_mimePng = null;
fan.graphics.Image.m_mimeGif = null;
fan.graphics.Image.m_mimeJpeg = null;
fan.graphics.Image.m_mimeSvg = null;
fan.graphics.PngImage = function() {}
fan.graphics.PngImage.prototype.h = fan.graphics.Image.prototype.h;
fan.graphics.PngImage.prototype.w = fan.graphics.Image.prototype.w;
fan.graphics.PngImage.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.PngImage.prototype.$typeof = function() { return fan.graphics.PngImage.$type; }
fan.graphics.PngImage.prototype.hasAlpha = function()
{
  return (fan.sys.ObjUtil.equals(this.colorType(),4) || fan.sys.ObjUtil.equals(this.colorType(),6));
}
fan.graphics.PngImage.prototype.hasPalette = function()
{
  return fan.sys.ObjUtil.compareGT(this.palette().size(),0);
}
fan.graphics.PngImage.prototype.hasTransparency = function()
{
  return fan.sys.ObjUtil.compareGT(this.transparency().size(),0);
}
fan.graphics.PngImage.prototype.colorType = function()
{
  return fan.sys.ObjUtil.coerce(this.get("colorType"),fan.sys.Int.$type);
}
fan.graphics.PngImage.prototype.colors = function()
{
  var c = (function($this) { if ((fan.sys.ObjUtil.equals($this.colorType(),2) || fan.sys.ObjUtil.equals($this.colorType(),6))) return 3; return 1; })(this);
  return (function($this) { if ($this.hasAlpha()) return fan.sys.Int.plus(c,1); return c; })(this);
}
fan.graphics.PngImage.prototype.pixelBits = function()
{
  return fan.sys.Int.mult(this.colors(),fan.sys.ObjUtil.coerce(this.get("colorSpaceBits"),fan.sys.Int.$type));
}
fan.graphics.PngImage.prototype.palette = function()
{
  return fan.sys.ObjUtil.coerce(this.get("palette"),fan.sys.Buf.$type);
}
fan.graphics.PngImage.prototype.transparency = function()
{
  return fan.sys.ObjUtil.coerce(this.get("transparency"),fan.sys.Buf.$type);
}
fan.graphics.PngImage.prototype.imgData = function()
{
  return fan.sys.ObjUtil.coerce(this.get("imgData"),fan.sys.Buf.$type);
}
fan.graphics.DeviceContext = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.DeviceContext.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.DeviceContext.prototype.$typeof = function() { return fan.graphics.DeviceContext.$type; }
fan.graphics.DeviceContext.cur = function()
{
  return fan.graphics.DeviceContext.m_curRef;
}
fan.graphics.DeviceContext.make = function(dpi) {
  var self = new fan.graphics.DeviceContext();
  fan.graphics.DeviceContext.make$(self,dpi);
  return self;
  }
fan.graphics.DeviceContext.make$ = function(self,dpi)
{
  self.m_dpi = dpi;
  return;
}
fan.graphics.DeviceContext.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus("DeviceContext { dpi=",fan.sys.ObjUtil.coerce(this.m_dpi,fan.sys.Obj.$type.toNullable()))," }");
}
fan.graphics.DeviceContext.static$init = function()
{
  fan.graphics.DeviceContext.m_curRef = fan.graphics.DeviceContext.make(fan.sys.Float.make(96.0));
  return;
}
fan.graphics.DeviceContext.m_curRef = null;
fan.graphics.DeviceContext.prototype.m_dpi = fan.sys.Float.make(0);
fan.graphics.FontData = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.FontData.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.FontData.prototype.$typeof = function() { return fan.graphics.FontData.$type; }
fan.graphics.FontData.find = function(f)
{
  return fan.graphics.FontData.m_registry.get(fan.graphics.FontData.toKey(f.m_style,f.m_weight,f.$name()));
}
fan.graphics.FontData.register = function(acc,m)
{
  acc.set(m.m_key,m);
  return;
}
fan.graphics.FontData.toKey = function(style,weight,$name)
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",style)," "),fan.sys.ObjUtil.coerce(weight.m_num,fan.sys.Obj.$type.toNullable()))," "),$name);
}
fan.graphics.FontData.make = function(key,ascent,descent,widths,charToWidth) {
  var self = new fan.graphics.FontData();
  fan.graphics.FontData.make$(self,key,ascent,descent,widths,charToWidth);
  return self;
  }
fan.graphics.FontData.make$ = function(self,key,ascent,descent,widths,charToWidth)
{
  var toks = fan.sys.Str.split(key);
  self.m_style = fan.sys.ObjUtil.coerce(fan.graphics.FontStyle.decode(toks.get(0)),fan.graphics.FontStyle.$type);
  self.m_weight = fan.sys.ObjUtil.coerce(fan.graphics.FontWeight.decode(toks.get(1)),fan.graphics.FontWeight.$type);
  self.m_$name = fan.sys.Str.replace(toks.get(2),"-"," ");
  self.m_key = fan.graphics.FontData.toKey(self.m_style,self.m_weight,self.m_$name);
  self.m_ascent = ascent;
  self.m_descent = descent;
  self.m_leading = descent;
  self.m_height = fan.sys.Int.plus(fan.sys.Int.plus(self.m_leading,ascent),descent);
  self.m_widths = fan.sys.ObjUtil.coerce((function($this) { var $_u33 = widths; if ($_u33 == null) return null; return fan.sys.ObjUtil.toImmutable($_u33); })(self),fan.sys.Type.find("sys::Int[]"));
  self.m_charToWidth = charToWidth;
  self.m_lastChar = fan.sys.Int.plus(fan.sys.Str.size(charToWidth),32);
  return;
}
fan.graphics.FontData.normalize = function(f)
{
  var m = null;
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,f.m_names.size()); i = fan.sys.Int.increment(i))
  {
    m = fan.graphics.FontData.toNormalize(f.m_style,f.m_weight,f.m_names.get(i));
    if (m != null)
    {
      break;
    }
    ;
  }
  ;
  if (m == null)
  {
    m = fan.graphics.FontData.m_registry.getChecked("normal 400 Helvetica");
  }
  ;
  return fan.graphics.Font.makeFields(fan.sys.List.make(fan.sys.Str.$type, [m.m_$name]),f.m_size,m.m_weight,m.m_style);
}
fan.graphics.FontData.toNormalize = function(style,weight,$name)
{
  var m = fan.graphics.FontData.m_registry.get(fan.graphics.FontData.toKey(style,weight,$name));
  if (m != null)
  {
    return m;
  }
  ;
  if (fan.sys.ObjUtil.compareLT(weight.m_num,400))
  {
    weight = fan.graphics.FontWeight.m_normal;
  }
  else
  {
    if (fan.sys.ObjUtil.compareGT(weight.m_num,400))
    {
      weight = fan.graphics.FontWeight.m_bold;
    }
    ;
  }
  ;
  m = fan.graphics.FontData.m_registry.get(fan.graphics.FontData.toKey(style,weight,$name));
  if (m != null)
  {
    return m;
  }
  ;
  if (fan.sys.ObjUtil.equals(style,fan.graphics.FontStyle.m_oblique))
  {
    m = fan.graphics.FontData.m_registry.get(fan.graphics.FontData.toKey(fan.graphics.FontStyle.m_italic,weight,$name));
    if (m != null)
    {
      return m;
    }
    ;
  }
  ;
  return fan.graphics.FontData.m_registry.get(fan.graphics.FontData.toKey(fan.graphics.FontStyle.m_normal,fan.graphics.FontWeight.m_normal,$name));
}
fan.graphics.FontData.prototype.charWidth = function(ch)
{
  if (fan.sys.ObjUtil.compareLT(ch,32))
  {
    return 0;
  }
  ;
  if (fan.sys.ObjUtil.compareLT(ch,this.m_lastChar))
  {
    var index = fan.sys.Int.minus(fan.sys.Str.get(this.m_charToWidth,fan.sys.Int.minus(ch,32)),37);
    return this.m_widths.get(index);
  }
  ;
  if (fan.sys.ObjUtil.equals(ch,8226))
  {
    return this.charWidth(42);
  }
  ;
  if ((fan.sys.ObjUtil.compareLE(8320,ch) && fan.sys.ObjUtil.compareLE(ch,8329)))
  {
    return this.charWidth(179);
  }
  ;
  return this.charWidth(109);
}
fan.graphics.FontData.static$init = function()
{
  var $this = this;
  if (true)
  {
    var acc = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("graphics::FontData")),fan.sys.Func.make$closure(
      fan.graphics.$clos$_u34,
      function(it)
      {
        it.ordered$(true);
        return;
      })),fan.sys.Type.find("[sys::Str:graphics::FontData]"));
    try
    {
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 400 Helvetica",770,230,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(191,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(222,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(260,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(278,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(334,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(355,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(365,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(370,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(469,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(537,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(584,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(737,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(834,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(889,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(944,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1015,fan.sys.Obj.$type.toNullable())]),"))+44=8&**.6)*))4444444444))6664@889987;9)184<9;8;98798>887)))04*44144)44''1'<4444*1)419111*(*6%%%%%%?%%%%%%%%%%%%%%%%%%%%%%%%%%)*4444(4*:-46%:*/3***52)**,4<<<7888888?98888))))99;;;;;6;9999887444444=14444))))4444444374444141"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 700 Helvetica",770,230,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(238,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(280,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(333,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(365,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(370,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(474,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(584,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(737,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(834,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(889,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(944,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(975,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"'(-0095&((+2'(''0000000000((2223;55554375'0538574754354:443('(20(03030(33''0'93333+0(30700.+'+2%%%%%%<%%%%%%%%%%%%%%%%%%%%%%%%%%'(0000'0(6*02%6(,/(((10'(()08883555555<54444''''5577777275555443000000900000''''3333333/33333030"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("italic 400 Helvetica",770,230,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(191,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(222,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(260,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(278,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(334,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(355,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(365,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(370,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(469,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(537,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(584,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(737,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(834,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(889,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(944,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1015,fan.sys.Obj.$type.toNullable())]),"))+44=8&**.6)*))4444444444))6664@889987;9)184<9;8;98798>887)))04*44144)44''1'<4444*1)419111*(*6%%%%%%?%%%%%%%%%%%%%%%%%%%%%%%%%%)*4444(4*:-46%:*/3***52)**,4<<<7888888?98888))))99;;;;;6;9999887444444=14444))))4444444374444141"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("italic 700 Helvetica",770,230,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(238,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(280,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(333,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(365,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(370,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(474,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(584,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(737,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(834,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(889,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(944,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(975,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"'(-0095&((+2'(''0000000000((2223;55554375'0538574754354:443('(20(03030(33''0'93333+0(30700.+'+2%%%%%%<%%%%%%%%%%%%%%%%%%%%%%%%%%'(0000'0(6*02%6(,/(((10'(()08883555555<54444''''5577777275555443000000900000''''3333333/33333030"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 300 Roboto",967,211,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(170,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(191,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(195,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(210,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(217,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(223,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(226,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(228,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(240,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(246,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(266,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(281,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(287,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(321,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(326,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(331,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(336,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(361,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(378,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(397,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(416,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(427,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(432,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(442,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(453,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(456,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(459,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(475,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(481,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(486,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(490,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(506,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(511,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(516,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(518,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(523,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(530,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(536,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(545,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(550,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(554,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(558,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(562,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(564,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(569,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(571,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(582,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(586,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(593,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(598,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(599,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(605,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(613,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(616,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(617,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(625,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(631,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(635,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(649,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(657,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(669,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(677,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(685,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(710,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(725,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(739,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(756,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(776,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(802,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(846,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(865,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(886,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(896,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(913,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"/,2UNh\\&34;R'2.9NNNNNNNNNN)(FNH?p^[abSQef0M_Jmfd\\d`WXb]o[YX.9.:<2KNGOH5OM,-D,nMQNP6E3MBiCAC5+5e%%%%%%q%%%%%%%%%%%%%%%%%%%%%%%%%%/+LTgG*Z<k=?L%k;8J771PA//7>>gij@^^^^^^paSSSS0000cfdddddIdbbbbYWVKKKKKKlGHHHH++++UMQQQQQSPMMMMAQA"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 400 Roboto",967,211,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(174,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(196,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(211,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(240,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(243,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(247,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(248,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(257,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(263,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(265,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(272,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(276,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(309,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(313,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(320,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(327,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(338,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(342,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(348,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(367,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(374,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(412,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(418,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(431,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(447,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(451,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(458,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(472,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(473,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(484,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(489,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(496,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(508,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(516,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(523,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(525,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(533,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(534,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(538,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(547,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(551,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(553,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(554,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(562,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(566,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(568,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(571,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(581,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(586,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(593,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(597,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(601,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(616,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(623,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(627,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(631,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(636,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(651,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(652,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(656,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(670,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(681,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(687,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(713,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(732,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(751,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(786,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(844,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(876,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(887,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(898,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(935,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),",-4[Qg\\&78=S'1.;QQQQQQQQQQ*(FNHAna\\`bSOdf0O]Llfe^e[XY`_m]ZZ/;/<?2MQHRJ8QN*)F*lOTQS6G5NChEBE6+6d%%%%%%p%%%%%%%%%%%%%%%%%%%%%%%%%%,+MVfI)[<j>AP%j@:K993RD.,9@AgiiBaaaaaao`SSSS0000cfeeeeeJe````ZXYMMMMMMkHJJJJ++++WOTTTTTTRNNNNBUB"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 500 Roboto",967,211,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(169,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(220,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(238,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(249,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(251,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(258,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(265,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(268,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(274,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(282,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(324,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(328,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(335,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(352,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(354,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(370,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(380,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(396,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(418,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(427,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(442,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(446,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(451,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(457,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(485,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(487,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(491,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(495,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(503,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(508,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(516,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(522,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(523,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(533,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(537,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(541,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(555,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(557,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(561,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(564,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(566,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(568,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(571,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(574,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(582,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(591,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(602,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(607,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(610,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(613,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(624,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(631,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(633,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(639,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(647,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(653,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(666,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(668,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(681,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(690,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(702,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(710,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(727,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(734,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(743,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(771,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(783,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(792,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(844,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(870,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(875,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(880,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(895,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(940,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),")-0WPf\\&34:L'1/7PPPPPPPPPP,(CME?o_Z^^OJad/KZImdb\\bYVV^]n[WU.8.9<0INFNH4PK+*E+lLQNP3D2LAgB?B2*2_%%%%%%q%%%%%%%%%%%%%%%%%%%%%%%%%%),MTcG)Y:i;>K%i>6H551T@/+5=>ehj?______p^OOOO////`dbbbbbGb^^^^WUXIIIIIIkFHHHH,,,,SLQQQQQQOLLLL?R?"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 700 Roboto",967,211,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(162,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(244,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(252,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(253,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(262,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(268,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(274,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(278,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(282,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(292,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(301,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(321,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(331,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(332,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(338,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(353,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(358,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(365,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(374,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(388,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(422,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(437,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(446,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(453,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(457,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(467,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(490,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(502,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(505,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(509,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(517,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(521,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(534,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(537,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(542,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(548,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(551,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(560,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(563,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(565,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(570,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(572,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(575,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(596,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(608,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(616,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(619,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(631,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(638,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(648,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(650,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(656,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(658,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(665,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(673,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(681,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(690,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(692,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(707,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(718,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(738,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(761,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(784,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(808,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(844,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(866,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(876,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(895,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(940,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"(,1RQcZ&55=J'9/8QQQQQQQQQQ.*DPEAj]WZYMJ^a/LWIia_X_WTU[ZiWUS-:-;<2HMFMI6PL+*G+hLNMN7E4LCcDBD2)2X%%%%%%l%%%%%%%%%%%%%%%%%%%%%%%%%%(.QR`H(V?e<AK%eB9H883T@0+8>AbdfA]]]]]]kZMMMM////\\a_____G_[[[[USVHHHHHHgFIIII,,,,QLNNNNNONLLLLBOB"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 400 Times",750,250,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(180,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(200,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(250,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(278,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(300,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(310,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(333,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(408,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(444,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(453,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(469,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(480,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(541,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(564,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(750,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(760,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(833,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(889,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(921,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(944,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"(,/44@?&,,48(,()4444444444))8880B<;;<:7<<,-<:A<<7<;7:<<C<<:,),24,04040,44))4)?4444,-)44<4403'35%%%%%%D%%%%%%%%%%%%%%%%%%%%%%%%%%(,4444'4,>)48%>,.6**,91(,*+4===0<<<<<<A;::::,,,,<<<<<<<8<<<<<<74000000;00000))))4444444644444444"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 700 Times",750,250,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(220,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(250,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(278,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(300,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(333,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(394,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(444,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(520,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(540,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(570,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(581,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(750,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(833,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(930,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(944,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"'*3//?<(**/4'*'(//////////**444/=989987;;+/;8>9;7;93899?998*(*6/*/3.3.*/3(*3(<3/33.+*3/9//.,&,0%%%%%%?%%%%%%%%%%%%%%%%%%%%%%%%%%'*////&/*:)/4%:*-2))*51'*)*/:::/999999?98888++++99;;;;;4;9999973//////9.....((((/3/////2/3333/3/"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("italic 400 Times",750,250,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(214,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(250,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(276,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(278,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(300,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(310,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(333,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(422,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(444,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(523,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(541,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(675,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(750,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(760,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(833,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(889,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(920,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"',/11>=&,,19',')1111111111,,9991@778:77::,085>8:7:715:7>755-)-/1,11010)11))0):1111--)10800-.(.3%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%'-1111(1,<(19%<,.4**,62',*+1;;;1777777?87777,,,,:8:::::9:::::571111111800000))))1111111411111010"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("italic 700 Times",750,250,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(220,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(250,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(266,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(278,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(300,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(333,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(348,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(389,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(395,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(444,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(485,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(500,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(556,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(570,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(606,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(611,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(667,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(722,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(750,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(778,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(833,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(889,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(944,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"'-422=<)++25'+')2222222222++5552=999:99:<-298>::8:948:9>988+)+52+22020+24))2)<4222--)40920-,&,5%%%%%%@%%%%%%%%%%%%%%%%%%%%%%%%%%'-2222&2+;(27%;+/3**+62'+**2;;;2999999?99999----:::::::5:::::882222222:00001))).2422222324444020"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 400 Courier",754,247,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(600,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))%%%%%%*%%%%%%%%%%%%%%%%%%%%%%%%%%)))))))))))))%))&')))()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))'))))))))"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 700 Courier",754,247,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(600,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))%%%%%%*%%%%%%%%%%%%%%%%%%%%%%%%%%)))))))))))))%))&')))()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))'))))))))"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("italic 400 Courier",754,247,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(600,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))%%%%%%*%%%%%%%%%%%%%%%%%%%%%%%%%%)))))))))))))%))&')))()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))'))))))))"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("italic 700 Courier",754,247,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(400,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(549,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(576,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(600,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))%%%%%%*%%%%%%%%%%%%%%%%%%%%%%%%%%)))))))))))))%))&')))()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))'))))))))"));
      fan.graphics.FontData.register(acc,fan.graphics.FontData.make("normal 400 Roboto-Mono",967,211,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(601,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(615,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1000,fan.sys.Obj.$type.toNullable())]),"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%(%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"));
    }
    catch ($_u35)
    {
      $_u35 = fan.sys.Err.make($_u35);
      if ($_u35 instanceof fan.sys.Err)
      {
        var e = $_u35;
        var e;
        e.trace();
      }
      else
      {
        throw $_u35;
      }
    }
    ;
    fan.graphics.FontData.m_registry = fan.sys.ObjUtil.coerce((function($this) { var $_u36 = acc; if ($_u36 == null) return null; return fan.sys.ObjUtil.toImmutable($_u36); })(this),fan.sys.Type.find("[sys::Str:graphics::FontData]"));
  }
  ;
  return;
}
fan.graphics.FontData.m_registry = null;
fan.graphics.FontData.prototype.m_key = null;
fan.graphics.FontData.prototype.m_$name = null;
fan.graphics.FontData.prototype.m_weight = null;
fan.graphics.FontData.prototype.m_style = null;
fan.graphics.FontData.prototype.m_height = 0;
fan.graphics.FontData.prototype.m_leading = 0;
fan.graphics.FontData.prototype.m_ascent = 0;
fan.graphics.FontData.prototype.m_descent = 0;
fan.graphics.FontData.prototype.m_widths = null;
fan.graphics.FontData.prototype.m_charToWidth = null;
fan.graphics.FontData.prototype.m_lastChar = 0;
fan.graphics.Stroke = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Stroke.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_width = fan.sys.Float.make(1.0);
  this.m_cap = fan.graphics.StrokeCap.m_butt;
  this.m_join = fan.graphics.StrokeJoin.m_miter;
  return;
}
fan.graphics.Stroke.prototype.$typeof = function() { return fan.graphics.Stroke.$type; }
fan.graphics.Stroke.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    var width = fan.sys.Float.make(1.0);
    var dash = null;
    var cap = fan.graphics.StrokeCap.m_butt;
    var join = fan.graphics.StrokeJoin.m_miter;
    var toks = null;
    var bracketStart = fan.sys.Str.index(s,"[");
    if (bracketStart != null)
    {
      var bracketEnd = fan.sys.Str.indexr(s,"]");
      dash = fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(bracketStart,fan.sys.Int.$type),1),fan.sys.ObjUtil.coerce(bracketEnd,fan.sys.Int.$type),true));
      toks = fan.sys.Str.split(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(bracketStart,fan.sys.Int.$type),true))).addAll(fan.sys.Str.split(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(bracketEnd,fan.sys.Int.$type),1),-1))));
    }
    else
    {
      if (fan.sys.Str.isEmpty(s))
      {
        throw fan.sys.Err.make();
      }
      ;
      toks = fan.sys.Str.split(s);
    }
    ;
    toks.each(fan.sys.Func.make$closure(
      fan.graphics.$clos$_u37,
      function(tok)
      {
        if (fan.sys.Str.isEmpty(tok))
        {
          return;
        }
        ;
        var $char = fan.sys.Str.get(tok,0);
        if ((fan.sys.Int.isDigit($char) || fan.sys.ObjUtil.equals($char,46)))
        {
          width = fan.sys.ObjUtil.coerce(fan.sys.Float.fromStr(tok),fan.sys.Float.$type);
          return;
        }
        ;
        var tryCap = fan.graphics.StrokeCap.fromStr(tok,false);
        if (tryCap != null)
        {
          cap = fan.sys.ObjUtil.coerce(tryCap,fan.graphics.StrokeCap.$type);
          return;
        }
        ;
        join = fan.sys.ObjUtil.coerce(fan.graphics.StrokeJoin.fromStr(tok,true),fan.graphics.StrokeJoin.$type);
        return;
      }));
    return fan.graphics.Stroke.makeFields(width,fan.sys.ObjUtil.coerce(dash,fan.sys.Str.$type.toNullable()),cap,join);
  }
  catch ($_u38)
  {
    $_u38 = fan.sys.Err.make($_u38);
    if ($_u38 instanceof fan.sys.Err)
    {
      var e = $_u38;
      var e;
      if (checked)
      {
        throw fan.sys.ParseErr.make(fan.sys.Str.plus("Stroke: ",s));
      }
      ;
      return null;
    }
    else
    {
      throw $_u38;
    }
  }
  ;
}
fan.graphics.Stroke.make = function(f) {
  var self = new fan.graphics.Stroke();
  fan.graphics.Stroke.make$(self,f);
  return self;
  }
fan.graphics.Stroke.make$ = function(self,f)
{
  ;
  f.call(self);
  return;
}
fan.graphics.Stroke.makeFields = function(width,dash,cap,join) {
  var self = new fan.graphics.Stroke();
  fan.graphics.Stroke.makeFields$(self,width,dash,cap,join);
  return self;
  }
fan.graphics.Stroke.makeFields$ = function(self,width,dash,cap,join)
{
  if (width === undefined) width = fan.sys.Float.make(1.0);
  if (dash === undefined) dash = null;
  if (cap === undefined) cap = fan.graphics.StrokeCap.m_butt;
  if (join === undefined) join = fan.graphics.StrokeJoin.m_miter;
  ;
  self.m_width = width;
  self.m_dash = dash;
  self.m_cap = cap;
  self.m_join = join;
  return;
}
fan.graphics.Stroke.prototype.hash = function()
{
  var hash = fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Float.hash(this.m_width),fan.sys.Int.shiftl(this.m_cap.ordinal(),11)),fan.sys.Int.shiftl(this.m_join.ordinal(),13));
  if (this.m_dash != null)
  {
    hash = fan.sys.Int.xor(hash,fan.sys.Str.hash(this.m_dash));
  }
  ;
  return hash;
}
fan.graphics.Stroke.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.graphics.Stroke.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_width,that.m_width) && fan.sys.ObjUtil.equals(this.m_dash,that.m_dash) && this.m_cap === that.m_cap && this.m_join === that.m_join);
}
fan.graphics.Stroke.prototype.toSize = function(newWidth)
{
  if (fan.sys.ObjUtil.equals(this.m_width,newWidth))
  {
    return this;
  }
  ;
  return fan.graphics.Stroke.makeFields(newWidth,this.m_dash,this.m_cap,this.m_join);
}
fan.graphics.Stroke.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make();
  if (fan.sys.ObjUtil.compareNE(this.m_width,fan.sys.Float.make(1.0)))
  {
    s.join(fan.graphics.GeomUtil.formatFloat(this.m_width));
  }
  ;
  if (this.m_dash != null)
  {
    s.add(" [").add(this.m_dash).add("]");
  }
  ;
  if (this.m_cap !== fan.graphics.StrokeCap.m_butt)
  {
    s.addChar(32).add(this.m_cap.$name());
  }
  ;
  if (this.m_join !== fan.graphics.StrokeJoin.m_miter)
  {
    s.addChar(32).add(this.m_join.$name());
  }
  ;
  if (s.isEmpty())
  {
    return fan.graphics.GeomUtil.formatFloat(this.m_width);
  }
  ;
  return s.toStr();
}
fan.graphics.Stroke.static$init = function()
{
  fan.graphics.Stroke.m_defVal = fan.graphics.Stroke.makeFields();
  return;
}
fan.graphics.Stroke.m_defVal = null;
fan.graphics.Stroke.prototype.m_width = fan.sys.Float.make(0);
fan.graphics.Stroke.prototype.m_dash = null;
fan.graphics.Stroke.prototype.m_cap = null;
fan.graphics.Stroke.prototype.m_join = null;
fan.graphics.StrokeCap = fan.sys.Obj.$extend(fan.sys.Enum);
fan.graphics.StrokeCap.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.StrokeCap.prototype.$typeof = function() { return fan.graphics.StrokeCap.$type; }
fan.graphics.StrokeCap.make = function($ordinal,$name) {
  var self = new fan.graphics.StrokeCap();
  fan.graphics.StrokeCap.make$(self,$ordinal,$name);
  return self;
  }
fan.graphics.StrokeCap.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.graphics.StrokeCap.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.graphics.StrokeCap.$type,$name,checked),fan.graphics.StrokeCap.$type.toNullable());
}
fan.graphics.StrokeCap.static$init = function()
{
  fan.graphics.StrokeCap.m_butt = fan.graphics.StrokeCap.make(0,"butt");
  fan.graphics.StrokeCap.m_round = fan.graphics.StrokeCap.make(1,"round");
  fan.graphics.StrokeCap.m_square = fan.graphics.StrokeCap.make(2,"square");
  fan.graphics.StrokeCap.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u39 = fan.sys.List.make(fan.graphics.StrokeCap.$type, [fan.graphics.StrokeCap.m_butt,fan.graphics.StrokeCap.m_round,fan.graphics.StrokeCap.m_square]); if ($_u39 == null) return null; return fan.sys.ObjUtil.toImmutable($_u39); })(this),fan.sys.Type.find("graphics::StrokeCap[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.graphics.StrokeCap.m_butt = null;
fan.graphics.StrokeCap.m_round = null;
fan.graphics.StrokeCap.m_square = null;
fan.graphics.StrokeCap.m_vals = null;
fan.graphics.StrokeJoin = fan.sys.Obj.$extend(fan.sys.Enum);
fan.graphics.StrokeJoin.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.StrokeJoin.prototype.$typeof = function() { return fan.graphics.StrokeJoin.$type; }
fan.graphics.StrokeJoin.make = function($ordinal,$name) {
  var self = new fan.graphics.StrokeJoin();
  fan.graphics.StrokeJoin.make$(self,$ordinal,$name);
  return self;
  }
fan.graphics.StrokeJoin.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.graphics.StrokeJoin.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.graphics.StrokeJoin.$type,$name,checked),fan.graphics.StrokeJoin.$type.toNullable());
}
fan.graphics.StrokeJoin.static$init = function()
{
  fan.graphics.StrokeJoin.m_bevel = fan.graphics.StrokeJoin.make(0,"bevel");
  fan.graphics.StrokeJoin.m_miter = fan.graphics.StrokeJoin.make(1,"miter");
  fan.graphics.StrokeJoin.m_radius = fan.graphics.StrokeJoin.make(2,"radius");
  fan.graphics.StrokeJoin.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u40 = fan.sys.List.make(fan.graphics.StrokeJoin.$type, [fan.graphics.StrokeJoin.m_bevel,fan.graphics.StrokeJoin.m_miter,fan.graphics.StrokeJoin.m_radius]); if ($_u40 == null) return null; return fan.sys.ObjUtil.toImmutable($_u40); })(this),fan.sys.Type.find("graphics::StrokeJoin[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.graphics.StrokeJoin.m_bevel = null;
fan.graphics.StrokeJoin.m_miter = null;
fan.graphics.StrokeJoin.m_radius = null;
fan.graphics.StrokeJoin.m_vals = null;
fan.graphics.Point = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Point.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Point.prototype.$typeof = function() { return fan.graphics.Point.$type; }
fan.graphics.Point.make = function(x,y) {
  var self = new fan.graphics.Point();
  fan.graphics.Point.make$(self,x,y);
  return self;
  }
fan.graphics.Point.make$ = function(self,x,y)
{
  self.m_x = x;
  self.m_y = y;
  return;
}
fan.graphics.Point.makeInt = function(x,y) {
  var self = new fan.graphics.Point();
  fan.graphics.Point.makeInt$(self,x,y);
  return self;
  }
fan.graphics.Point.makeInt$ = function(self,x,y)
{
  self.m_x = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(x,fan.sys.Num.$type));
  self.m_y = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(y,fan.sys.Num.$type));
  return;
}
fan.graphics.Point.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var f = fan.graphics.GeomUtil.parseFloatList(s);
    return fan.graphics.Point.make(f.get(0),f.get(1));
  }
  catch ($_u41)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Point: ",s));
  }
  ;
  return null;
}
fan.graphics.Point.prototype.translate = function(t)
{
  return fan.graphics.Point.make(fan.sys.Float.plus(this.m_x,t.m_x),fan.sys.Float.plus(this.m_y,t.m_y));
}
fan.graphics.Point.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Float.hash(this.m_x),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_y),16));
}
fan.graphics.Point.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.graphics.Point.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_x,that.m_x) && fan.sys.ObjUtil.equals(this.m_y,that.m_y));
}
fan.graphics.Point.prototype.toStr = function()
{
  return fan.graphics.GeomUtil.formatFloats2(this.m_x,this.m_y);
}
fan.graphics.Point.static$init = function()
{
  fan.graphics.Point.m_defVal = fan.graphics.Point.make(fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
  return;
}
fan.graphics.Point.m_defVal = null;
fan.graphics.Point.prototype.m_x = fan.sys.Float.make(0);
fan.graphics.Point.prototype.m_y = fan.sys.Float.make(0);
fan.graphics.Size = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Size.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Size.prototype.$typeof = function() { return fan.graphics.Size.$type; }
fan.graphics.Size.make = function(w,h) {
  var self = new fan.graphics.Size();
  fan.graphics.Size.make$(self,w,h);
  return self;
  }
fan.graphics.Size.make$ = function(self,w,h)
{
  self.m_w = w;
  self.m_h = h;
  return;
}
fan.graphics.Size.makeInt = function(w,h) {
  var self = new fan.graphics.Size();
  fan.graphics.Size.makeInt$(self,w,h);
  return self;
  }
fan.graphics.Size.makeInt$ = function(self,w,h)
{
  self.m_w = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(w,fan.sys.Num.$type));
  self.m_h = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(h,fan.sys.Num.$type));
  return;
}
fan.graphics.Size.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var f = fan.graphics.GeomUtil.parseFloatList(s);
    return fan.graphics.Size.make(f.get(0),f.get(1));
  }
  catch ($_u42)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Size: ",s));
  }
  ;
  return null;
}
fan.graphics.Size.prototype.toStr = function()
{
  return fan.graphics.GeomUtil.formatFloats2(this.m_w,this.m_h);
}
fan.graphics.Size.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Float.hash(this.m_w),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_h),16));
}
fan.graphics.Size.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.graphics.Size.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_w,that.m_w) && fan.sys.ObjUtil.equals(this.m_h,that.m_h));
}
fan.graphics.Size.static$init = function()
{
  fan.graphics.Size.m_defVal = fan.graphics.Size.make(fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
  return;
}
fan.graphics.Size.m_defVal = null;
fan.graphics.Size.prototype.m_w = fan.sys.Float.make(0);
fan.graphics.Size.prototype.m_h = fan.sys.Float.make(0);
fan.graphics.Rect = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Rect.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Rect.prototype.$typeof = function() { return fan.graphics.Rect.$type; }
fan.graphics.Rect.make = function(x,y,w,h) {
  var self = new fan.graphics.Rect();
  fan.graphics.Rect.make$(self,x,y,w,h);
  return self;
  }
fan.graphics.Rect.make$ = function(self,x,y,w,h)
{
  self.m_x = x;
  self.m_y = y;
  self.m_w = w;
  self.m_h = h;
  return;
}
fan.graphics.Rect.makeInt = function(x,y,w,h) {
  var self = new fan.graphics.Rect();
  fan.graphics.Rect.makeInt$(self,x,y,w,h);
  return self;
  }
fan.graphics.Rect.makeInt$ = function(self,x,y,w,h)
{
  self.m_x = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(x,fan.sys.Num.$type));
  self.m_y = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(y,fan.sys.Num.$type));
  self.m_w = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(w,fan.sys.Num.$type));
  self.m_h = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(h,fan.sys.Num.$type));
  return;
}
fan.graphics.Rect.makePosSize = function(p,s) {
  var self = new fan.graphics.Rect();
  fan.graphics.Rect.makePosSize$(self,p,s);
  return self;
  }
fan.graphics.Rect.makePosSize$ = function(self,p,s)
{
  self.m_x = p.m_x;
  self.m_y = p.m_y;
  self.m_w = s.m_w;
  self.m_h = s.m_h;
  return;
}
fan.graphics.Rect.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var f = fan.graphics.GeomUtil.parseFloatList(s);
    return fan.graphics.Rect.make(f.get(0),f.get(1),f.get(2),f.get(3));
  }
  catch ($_u43)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Rect: ",s));
  }
  ;
  return null;
}
fan.graphics.Rect.prototype.pos = function()
{
  return fan.graphics.Point.make(this.m_x,this.m_y);
}
fan.graphics.Rect.prototype.size = function()
{
  return fan.graphics.Size.make(this.m_w,this.m_h);
}
fan.graphics.Rect.prototype.contains = function(pt)
{
  return (fan.sys.ObjUtil.compareGE(pt.m_x,this.m_x) && fan.sys.ObjUtil.compareLE(pt.m_x,fan.sys.Float.plus(this.m_x,this.m_w)) && fan.sys.ObjUtil.compareGE(pt.m_y,this.m_y) && fan.sys.ObjUtil.compareLE(pt.m_y,fan.sys.Float.plus(this.m_y,this.m_h)));
}
fan.graphics.Rect.prototype.intersects = function(that)
{
  var ax1 = this.m_x;
  var ay1 = this.m_y;
  var ax2 = fan.sys.Float.plus(ax1,this.m_w);
  var ay2 = fan.sys.Float.plus(ay1,this.m_h);
  var bx1 = that.m_x;
  var by1 = that.m_y;
  var bx2 = fan.sys.Float.plus(bx1,that.m_w);
  var by2 = fan.sys.Float.plus(by1,that.m_h);
  return !(fan.sys.ObjUtil.compareLE(ax2,bx1) || fan.sys.ObjUtil.compareLE(bx2,ax1) || fan.sys.ObjUtil.compareLE(ay2,by1) || fan.sys.ObjUtil.compareLE(by2,ay1));
}
fan.graphics.Rect.prototype.intersection = function(that)
{
  var ax1 = this.m_x;
  var ay1 = this.m_y;
  var ax2 = fan.sys.Float.plus(ax1,this.m_w);
  var ay2 = fan.sys.Float.plus(ay1,this.m_h);
  var bx1 = that.m_x;
  var by1 = that.m_y;
  var bx2 = fan.sys.Float.plus(bx1,that.m_w);
  var by2 = fan.sys.Float.plus(by1,that.m_h);
  var rx1 = fan.sys.Float.max(ax1,bx1);
  var rx2 = fan.sys.Float.min(ax2,bx2);
  var ry1 = fan.sys.Float.max(ay1,by1);
  var ry2 = fan.sys.Float.min(ay2,by2);
  var rw = fan.sys.Float.minus(rx2,rx1);
  var rh = fan.sys.Float.minus(ry2,ry1);
  if ((fan.sys.ObjUtil.compareLE(rw,fan.sys.Float.make(0.0)) || fan.sys.ObjUtil.compareLE(rh,fan.sys.Float.make(0.0))))
  {
    return fan.graphics.Rect.m_defVal;
  }
  ;
  return fan.graphics.Rect.make(rx1,ry1,rw,rh);
}
fan.graphics.Rect.prototype.union = function(that)
{
  var ax1 = this.m_x;
  var ay1 = this.m_y;
  var ax2 = fan.sys.Float.plus(ax1,this.m_w);
  var ay2 = fan.sys.Float.plus(ay1,this.m_h);
  var bx1 = that.m_x;
  var by1 = that.m_y;
  var bx2 = fan.sys.Float.plus(bx1,that.m_w);
  var by2 = fan.sys.Float.plus(by1,that.m_h);
  var rx1 = fan.sys.Float.min(ax1,bx1);
  var rx2 = fan.sys.Float.max(ax2,bx2);
  var ry1 = fan.sys.Float.min(ay1,by1);
  var ry2 = fan.sys.Float.max(ay2,by2);
  var rw = fan.sys.Float.minus(rx2,rx1);
  var rh = fan.sys.Float.minus(ry2,ry1);
  if ((fan.sys.ObjUtil.compareLE(rw,fan.sys.Float.make(0.0)) || fan.sys.ObjUtil.compareLE(rh,fan.sys.Float.make(0.0))))
  {
    return fan.graphics.Rect.m_defVal;
  }
  ;
  return fan.graphics.Rect.make(rx1,ry1,rw,rh);
}
fan.graphics.Rect.prototype.toStr = function()
{
  return fan.graphics.GeomUtil.formatFloats4(this.m_x,this.m_y,this.m_w,this.m_h);
}
fan.graphics.Rect.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Float.hash(this.m_x),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_y),8)),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_w),16)),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_w),24));
}
fan.graphics.Rect.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.graphics.Rect.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_x,that.m_x) && fan.sys.ObjUtil.equals(this.m_y,that.m_y) && fan.sys.ObjUtil.equals(this.m_w,that.m_w) && fan.sys.ObjUtil.equals(this.m_h,that.m_h));
}
fan.graphics.Rect.static$init = function()
{
  fan.graphics.Rect.m_defVal = fan.graphics.Rect.make(fan.sys.Float.make(0.0),fan.sys.Float.make(0.0),fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
  return;
}
fan.graphics.Rect.m_defVal = null;
fan.graphics.Rect.prototype.m_x = fan.sys.Float.make(0);
fan.graphics.Rect.prototype.m_y = fan.sys.Float.make(0);
fan.graphics.Rect.prototype.m_w = fan.sys.Float.make(0);
fan.graphics.Rect.prototype.m_h = fan.sys.Float.make(0);
fan.graphics.Insets = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Insets.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Insets.prototype.$typeof = function() { return fan.graphics.Insets.$type; }
fan.graphics.Insets.make = function(top,right,bottom,left) {
  var self = new fan.graphics.Insets();
  fan.graphics.Insets.make$(self,top,right,bottom,left);
  return self;
  }
fan.graphics.Insets.make$ = function(self,top,right,bottom,left)
{
  if (right === undefined) right = null;
  if (bottom === undefined) bottom = null;
  if (left === undefined) left = null;
  if (right == null)
  {
    right = top;
  }
  ;
  if (bottom == null)
  {
    bottom = top;
  }
  ;
  if (left == null)
  {
    left = right;
  }
  ;
  self.m_top = fan.sys.Num.toFloat(top);
  self.m_right = fan.sys.Num.toFloat(right);
  self.m_bottom = fan.sys.Num.toFloat(bottom);
  self.m_left = fan.sys.Num.toFloat(left);
  return;
}
fan.graphics.Insets.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var f = fan.graphics.GeomUtil.parseFloatList(s);
    return fan.graphics.Insets.make(fan.sys.ObjUtil.coerce(f.get(0),fan.sys.Num.$type),fan.sys.ObjUtil.coerce(f.getSafe(1),fan.sys.Num.$type.toNullable()),fan.sys.ObjUtil.coerce(f.getSafe(2),fan.sys.Num.$type.toNullable()),fan.sys.ObjUtil.coerce(f.getSafe(3),fan.sys.Num.$type.toNullable()));
  }
  catch ($_u44)
  {
    $_u44 = fan.sys.Err.make($_u44);
    if ($_u44 instanceof fan.sys.Err)
    {
      var e = $_u44;
      var e;
    }
    else
    {
      throw $_u44;
    }
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Insets: ",s));
  }
  ;
  return null;
}
fan.graphics.Insets.prototype.toStr = function()
{
  if ((fan.sys.ObjUtil.equals(this.m_top,this.m_right) && fan.sys.ObjUtil.equals(this.m_top,this.m_bottom) && fan.sys.ObjUtil.equals(this.m_top,this.m_left)))
  {
    return fan.graphics.GeomUtil.formatFloat(this.m_top);
  }
  else
  {
    return fan.graphics.GeomUtil.formatFloats4(this.m_top,this.m_right,this.m_bottom,this.m_left);
  }
  ;
}
fan.graphics.Insets.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Float.hash(this.m_top),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_right),8)),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_bottom),16)),fan.sys.Int.shiftl(fan.sys.Float.hash(this.m_left),24));
}
fan.graphics.Insets.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.graphics.Insets.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_top,that.m_top) && fan.sys.ObjUtil.equals(this.m_right,that.m_right) && fan.sys.ObjUtil.equals(this.m_bottom,that.m_bottom) && fan.sys.ObjUtil.equals(this.m_left,that.m_left));
}
fan.graphics.Insets.prototype.toSize = function()
{
  return fan.graphics.Size.make(fan.sys.Float.plus(this.m_right,this.m_left),fan.sys.Float.plus(this.m_top,this.m_bottom));
}
fan.graphics.Insets.prototype.w = function()
{
  return fan.sys.Float.plus(this.m_left,this.m_right);
}
fan.graphics.Insets.prototype.h = function()
{
  return fan.sys.Float.plus(this.m_top,this.m_bottom);
}
fan.graphics.Insets.static$init = function()
{
  fan.graphics.Insets.m_defVal = fan.graphics.Insets.make(fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Num.$type),fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Num.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Num.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Num.$type.toNullable()));
  return;
}
fan.graphics.Insets.m_defVal = null;
fan.graphics.Insets.prototype.m_top = fan.sys.Float.make(0);
fan.graphics.Insets.prototype.m_right = fan.sys.Float.make(0);
fan.graphics.Insets.prototype.m_bottom = fan.sys.Float.make(0);
fan.graphics.Insets.prototype.m_left = fan.sys.Float.make(0);
fan.graphics.GeomUtil = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.GeomUtil.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.GeomUtil.prototype.$typeof = function() { return fan.graphics.GeomUtil.$type; }
fan.graphics.GeomUtil.split = function(s)
{
  var acc = fan.sys.List.make(fan.sys.Str.$type);
  var start = 0;
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,fan.sys.Str.size(s)); i = fan.sys.Int.increment(i))
  {
    var c = fan.sys.Str.get(s,i);
    if ((fan.sys.ObjUtil.equals(c,32) || fan.sys.ObjUtil.equals(c,44)))
    {
      if (fan.sys.ObjUtil.compareLT(start,i))
      {
        acc.add(fan.sys.Str.getRange(s,fan.sys.Range.make(start,i,true)));
      }
      ;
      start = fan.sys.Int.plus(i,1);
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.compareLT(start,fan.sys.Str.size(s)))
  {
    acc.add(fan.sys.Str.getRange(s,fan.sys.Range.make(start,-1)));
  }
  ;
  return acc;
}
fan.graphics.GeomUtil.parseFloatList = function(s)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.graphics.GeomUtil.split(s).map(fan.sys.Func.make$closure(
    fan.graphics.$clos$_u45,
    function(tok)
    {
      return fan.sys.ObjUtil.coerce(fan.sys.Str.toFloat(fan.sys.Str.trim(tok)),fan.sys.Obj.$type.toNullable());
    })),fan.sys.Type.find("sys::Float[]"));
}
fan.graphics.GeomUtil.formatFloats2 = function(a,b)
{
  return fan.sys.StrBuf.make().add(fan.graphics.GeomUtil.formatFloat(a)).addChar(32).add(fan.graphics.GeomUtil.formatFloat(b)).toStr();
}
fan.graphics.GeomUtil.formatFloats4 = function(a,b,c,d)
{
  return fan.sys.StrBuf.make().add(fan.graphics.GeomUtil.formatFloat(a)).addChar(32).add(fan.graphics.GeomUtil.formatFloat(b)).addChar(32).add(fan.graphics.GeomUtil.formatFloat(c)).addChar(32).add(fan.graphics.GeomUtil.formatFloat(d)).toStr();
}
fan.graphics.GeomUtil.formatFloat = function(f)
{
  return fan.sys.Float.toLocale(f,"0.###",fan.sys.Locale.m_en);
}
fan.graphics.GeomUtil.make = function() {
  var self = new fan.graphics.GeomUtil();
  fan.graphics.GeomUtil.make$(self);
  return self;
  }
fan.graphics.GeomUtil.make$ = function(self)
{
  return;
}
fan.graphics.GraphicsPath = function() {}
fan.graphics.GraphicsPath.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.GraphicsPath.prototype.$typeof = function() { return fan.graphics.GraphicsPath.$type; }
fan.graphics.Graphics = function() {}
fan.graphics.Graphics.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Graphics.prototype.$typeof = function() { return fan.graphics.Graphics.$type; }
fan.graphics.Graphics.prototype.m_paint = null;
fan.graphics.Graphics.prototype.m_color = null;
fan.graphics.Graphics.prototype.m_stroke = null;
fan.graphics.Graphics.prototype.m_alpha = fan.sys.Float.make(0);
fan.graphics.Graphics.prototype.m_font = null;
fan.graphics.Transform = fan.sys.Obj.$extend(fan.sys.Obj);
fan.graphics.Transform.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.Transform.prototype.$typeof = function() { return fan.graphics.Transform.$type; }
fan.graphics.Transform.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    var t = null;
    fan.sys.Str.split(s,fan.sys.ObjUtil.coerce(41,fan.sys.Int.$type.toNullable())).each(fan.sys.Func.make$closure(
      fan.graphics.$clos$_u46,
      function(func)
      {
        if (fan.sys.Str.startsWith(func,","))
        {
          func = fan.sys.Str.trim(fan.sys.Str.getRange(func,fan.sys.Range.make(1,-1)));
        }
        ;
        if (fan.sys.Str.isEmpty(func))
        {
          return;
        }
        ;
        var r = fan.graphics.Transform.parseFunc(func);
        t = (function($this) { if (t == null) return r; return fan.sys.ObjUtil.coerce(t.mult(r),fan.graphics.Transform.$type.toNullable()); })($this);
        return;
      }));
    if (t != null)
    {
      return t;
    }
    ;
  }
  catch ($_u48)
  {
    $_u48 = fan.sys.Err.make($_u48);
    if ($_u48 instanceof fan.sys.Err)
    {
      var e = $_u48;
      var e;
    }
    else
    {
      throw $_u48;
    }
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Transform: ",s));
  }
  ;
  return null;
}
fan.graphics.Transform.parseFunc = function(s)
{
  var op = (function($this) { var $_u49 = fan.sys.Str.index(s,"("); if ($_u49 != null) return $_u49; throw fan.sys.Err.make(); })(this);
  var $name = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(op,fan.sys.Int.$type),true)));
  var argsStr = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(op,fan.sys.Int.$type),1),-1)));
  var args = fan.graphics.GeomUtil.parseFloatList(argsStr);
  var $_u50 = $name;
  if (fan.sys.ObjUtil.equals($_u50,"matrix"))
  {
    return fan.graphics.Transform.make(args.get(0),args.get(1),args.get(2),args.get(3),args.get(4),args.get(5));
  }
  else if (fan.sys.ObjUtil.equals($_u50,"translate"))
  {
    return fan.graphics.Transform.translate(args.get(0),fan.sys.ObjUtil.coerce((function($this) { var $_u51 = args.getSafe(1); if ($_u51 != null) return $_u51; return fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Float.$type.toNullable()); })(this),fan.sys.Float.$type));
  }
  else if (fan.sys.ObjUtil.equals($_u50,"scale"))
  {
    return fan.graphics.Transform.scale(args.get(0),fan.sys.ObjUtil.coerce((function($this) { var $_u52 = args.getSafe(1); if ($_u52 != null) return $_u52; return fan.sys.ObjUtil.coerce(args.get(0),fan.sys.Float.$type.toNullable()); })(this),fan.sys.Float.$type));
  }
  else if (fan.sys.ObjUtil.equals($_u50,"rotate"))
  {
    return fan.graphics.Transform.rotate(args.get(0),args.getSafe(1),args.getSafe(2));
  }
  else if (fan.sys.ObjUtil.equals($_u50,"skewX"))
  {
    return fan.graphics.Transform.skewX(args.get(0));
  }
  else if (fan.sys.ObjUtil.equals($_u50,"skewY"))
  {
    return fan.graphics.Transform.skewY(args.get(0));
  }
  else
  {
    throw fan.sys.Err.make($name);
  }
  ;
}
fan.graphics.Transform.translate = function(tx,ty)
{
  return fan.graphics.Transform.make(fan.sys.Float.make(1.0),fan.sys.Float.make(0.0),fan.sys.Float.make(0.0),fan.sys.Float.make(1.0),tx,ty);
}
fan.graphics.Transform.scale = function(sx,sy)
{
  return fan.graphics.Transform.make(sx,fan.sys.Float.make(0.0),fan.sys.Float.make(0.0),sy,fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
}
fan.graphics.Transform.rotate = function(angle,cx,cy)
{
  if (cx === undefined) cx = null;
  if (cy === undefined) cy = null;
  var a = fan.sys.Float.toRadians(angle);
  var acos = fan.sys.Float.cos(a);
  var asin = fan.sys.Float.sin(a);
  var rot = fan.graphics.Transform.make(acos,asin,fan.sys.Float.negate(asin),acos,fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
  if (cx == null)
  {
    return rot;
  }
  ;
  return fan.graphics.Transform.translate(fan.sys.ObjUtil.coerce(cx,fan.sys.Float.$type),fan.sys.ObjUtil.coerce(cy,fan.sys.Float.$type)).mult(rot).mult(fan.graphics.Transform.translate(fan.sys.Float.negate(fan.sys.ObjUtil.coerce(cx,fan.sys.Float.$type)),fan.sys.Float.negate(fan.sys.ObjUtil.coerce(cy,fan.sys.Float.$type))));
}
fan.graphics.Transform.skewX = function(angle)
{
  var a = fan.sys.Float.toRadians(angle);
  return fan.graphics.Transform.make(fan.sys.Float.make(1.0),fan.sys.Float.make(0.0),fan.sys.Float.tan(a),fan.sys.Float.make(1.0),fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
}
fan.graphics.Transform.skewY = function(angle)
{
  var a = fan.sys.Float.toRadians(angle);
  return fan.graphics.Transform.make(fan.sys.Float.make(1.0),fan.sys.Float.tan(a),fan.sys.Float.make(0.0),fan.sys.Float.make(1.0),fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
}
fan.graphics.Transform.make = function(a,b,c,d,e,f) {
  var self = new fan.graphics.Transform();
  fan.graphics.Transform.make$(self,a,b,c,d,e,f);
  return self;
  }
fan.graphics.Transform.make$ = function(self,a,b,c,d,e,f)
{
  self.m_a = a;
  self.m_c = c;
  self.m_e = e;
  self.m_b = b;
  self.m_d = d;
  self.m_f = f;
  return;
}
fan.graphics.Transform.prototype.mult = function(that)
{
  return fan.graphics.Transform.make(fan.sys.Float.plus(fan.sys.Float.plus(fan.sys.Float.mult(this.m_a,that.m_a),fan.sys.Float.mult(this.m_c,that.m_b)),fan.sys.Float.mult(this.m_e,fan.sys.Float.make(0.0))),fan.sys.Float.plus(fan.sys.Float.plus(fan.sys.Float.mult(this.m_b,that.m_a),fan.sys.Float.mult(this.m_d,that.m_b)),fan.sys.Float.mult(this.m_f,fan.sys.Float.make(0.0))),fan.sys.Float.plus(fan.sys.Float.plus(fan.sys.Float.mult(this.m_a,that.m_c),fan.sys.Float.mult(this.m_c,that.m_d)),fan.sys.Float.mult(this.m_e,fan.sys.Float.make(0.0))),fan.sys.Float.plus(fan.sys.Float.plus(fan.sys.Float.mult(this.m_b,that.m_c),fan.sys.Float.mult(this.m_d,that.m_d)),fan.sys.Float.mult(this.m_f,fan.sys.Float.make(0.0))),fan.sys.Float.plus(fan.sys.Float.plus(fan.sys.Float.mult(this.m_a,that.m_e),fan.sys.Float.mult(this.m_c,that.m_f)),fan.sys.Float.mult(this.m_e,fan.sys.Float.make(1.0))),fan.sys.Float.plus(fan.sys.Float.plus(fan.sys.Float.mult(this.m_b,that.m_e),fan.sys.Float.mult(this.m_d,that.m_f)),fan.sys.Float.mult(this.m_f,fan.sys.Float.make(1.0))));
}
fan.graphics.Transform.prototype.hash = function()
{
  return fan.sys.Str.hash(this.toStr());
}
fan.graphics.Transform.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.graphics.Transform.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return fan.sys.ObjUtil.equals(this.toStr(),that.toStr());
}
fan.graphics.Transform.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make();
  s.add("matrix(").add(fan.graphics.Transform.f2s(this.m_a)).addChar(32).add(fan.graphics.Transform.f2s(this.m_b)).addChar(32).add(fan.graphics.Transform.f2s(this.m_c)).addChar(32).add(fan.graphics.Transform.f2s(this.m_d)).addChar(32).add(fan.graphics.Transform.f2s(this.m_e)).addChar(32).add(fan.graphics.Transform.f2s(this.m_f)).addChar(41);
  return s.toStr();
}
fan.graphics.Transform.f2s = function(f)
{
  return fan.sys.Float.toLocale(f,"0.#####",fan.sys.Locale.m_en);
}
fan.graphics.Transform.prototype.m_a = fan.sys.Float.make(0);
fan.graphics.Transform.prototype.m_b = fan.sys.Float.make(0);
fan.graphics.Transform.prototype.m_c = fan.sys.Float.make(0);
fan.graphics.Transform.prototype.m_d = fan.sys.Float.make(0);
fan.graphics.Transform.prototype.m_e = fan.sys.Float.make(0);
fan.graphics.Transform.prototype.m_f = fan.sys.Float.make(0);
fan.graphics.GraphicsEnv = function() {}
fan.graphics.GraphicsEnv.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.graphics.GraphicsEnv.prototype.$typeof = function() { return fan.graphics.GraphicsEnv.$type; }
fan.graphics.GraphicsEnv.cur = function()
{
  var cur = fan.graphics.GraphicsEnv.m_curRef.val();
  if (cur == null)
  {
    fan.graphics.GraphicsEnv.m_curRef.val$(cur = fan.graphics.GraphicsEnv.init());
  }
  ;
  return fan.sys.ObjUtil.coerce(cur,fan.graphics.GraphicsEnv.$type);
}
fan.graphics.GraphicsEnv.init = function()
{
  if (fan.sys.ObjUtil.equals(fan.sys.Env.cur().runtime(),"js"))
  {
    return fan.sys.ObjUtil.coerce(fan.sys.Type.find("dom::DomGraphicsEnv").make(),fan.graphics.GraphicsEnv.$type.toNullable());
  }
  else
  {
    return fan.sys.ObjUtil.coerce(fan.sys.Type.find("graphicsJava::ServerGraphicsEnv").make(),fan.graphics.GraphicsEnv.$type.toNullable());
  }
  ;
}
fan.graphics.GraphicsEnv.install = function(env)
{
  fan.graphics.GraphicsEnv.m_curRef.val$(env);
  return;
}
fan.graphics.GraphicsEnv.static$init = function()
{
  fan.graphics.GraphicsEnv.m_curRef = fan.concurrent.AtomicRef.make(null);
  return;
}
fan.graphics.GraphicsEnv.m_curRef = null;
fan.graphics.$pod = fan.sys.Pod.$add('graphics');
with (fan.graphics.$pod)
{
  fan.graphics.Paint.$type = $am('Paint','sys::Obj',[],{'sys::Js':""},8451);
  fan.graphics.Color.$type = $at('Color','sys::Obj',['graphics::Paint'],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8226);
  fan.graphics.Font.$type = $at('Font','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.graphics.FontMetrics.$type = $at('FontMetrics','sys::Obj',[],{'sys::Js':""},8195);
  fan.graphics.FontDataMetrics.$type = $at('FontDataMetrics','graphics::FontMetrics',[],{'sys::Js':""},130);
  fan.graphics.FontWeight.$type = $at('FontWeight','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.graphics.FontStyle.$type = $at('FontStyle','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.graphics.Image.$type = $am('Image','sys::Obj',[],{'sys::Js':""},8449);
  fan.graphics.PngImage.$type = $am('PngImage','sys::Obj',['graphics::Image'],{'sys::Js':"",'sys::NoDoc':""},8449);
  fan.graphics.DeviceContext.$type = $at('DeviceContext','sys::Obj',[],{'sys::NoDoc':"",'sys::Js':""},8194);
  fan.graphics.FontData.$type = $at('FontData','sys::Obj',[],{'sys::Js':"",'sys::NoDoc':""},8194);
  fan.graphics.Stroke.$type = $at('Stroke','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.graphics.StrokeCap.$type = $at('StrokeCap','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.graphics.StrokeJoin.$type = $at('StrokeJoin','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.graphics.Point.$type = $at('Point','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.graphics.Size.$type = $at('Size','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.graphics.Rect.$type = $at('Rect','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.graphics.Insets.$type = $at('Insets','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.graphics.GeomUtil.$type = $at('GeomUtil','sys::Obj',[],{'sys::NoDoc':"",'sys::Js':""},8194);
  fan.graphics.GraphicsPath.$type = $am('GraphicsPath','sys::Obj',[],{'sys::Js':""},8449);
  fan.graphics.Graphics.$type = $am('Graphics','sys::Obj',[],{'sys::Js':""},8449);
  fan.graphics.Transform.$type = $at('Transform','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.graphics.GraphicsEnv.$type = $am('GraphicsEnv','sys::Obj',[],{'sys::Js':""},8451);
  fan.graphics.Paint.$type.$am('isColorPaint',270337,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('asColorPaint',270337,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Color.$type.$af('transparent',106498,'graphics::Color',{}).$af('black',106498,'graphics::Color',{}).$af('white',106498,'graphics::Color',{}).$af('rgb',73730,'sys::Int',{}).$af('a',73730,'sys::Float',{}).$af('byKeyword',100354,'[sys::Str:graphics::Color]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rgb','sys::Int',true),new fan.sys.Param('a','sys::Float',true)]),{}).$am('makeRgb',40962,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Int',false),new fan.sys.Param('g','sys::Int',false),new fan.sys.Param('b','sys::Int',false),new fan.sys.Param('a','sys::Float',true)]),{}).$am('makeHsl',40962,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('h','sys::Float',false),new fan.sys.Param('s','sys::Float',false),new fan.sys.Param('l','sys::Float',false),new fan.sys.Param('a','sys::Float',true)]),{}).$am('fromStr',40966,'graphics::Color?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('listFromStr',40962,'graphics::Color[]?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{'sys::NoDoc':""}).$am('parseHex',34818,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('parseFunc',34818,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('func','sys::Str',false),new fan.sys.Param('args','sys::Str[]',false)]),{}).$am('parseRgbArg',34818,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('parseDegArg',34818,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('parsePercentArg',34818,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str?',false)]),{}).$am('r',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('g',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('b',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('s',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('l',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toHexStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isColorPaint',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('asColorPaint',271360,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isTransparent',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('opacity',8192,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('opacity','sys::Float',true)]),{}).$am('lighter',8192,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('percentage','sys::Float',true)]),{}).$am('darker',8192,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('percentage','sys::Float',true)]),{}).$am('saturate',8192,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('percentage','sys::Float',true)]),{}).$am('desaturate',8192,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('percentage','sys::Float',true)]),{}).$am('interpolateRgb',40962,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','graphics::Color',false),new fan.sys.Param('b','graphics::Color',false),new fan.sys.Param('t','sys::Float',false)]),{}).$am('interpolateHsl',40962,'graphics::Color',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','graphics::Color',false),new fan.sys.Param('b','graphics::Color',false),new fan.sys.Param('t','sys::Float',false)]),{}).$am('interpolateDeg',34818,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Float',false),new fan.sys.Param('b','sys::Float',false),new fan.sys.Param('t','sys::Float',false)]),{}).$am('interpolateByte',34818,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Int',false),new fan.sys.Param('b','sys::Int',false),new fan.sys.Param('t','sys::Float',false)]),{}).$am('interpolatePercent',34818,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Float',false),new fan.sys.Param('b','sys::Float',false),new fan.sys.Param('t','sys::Float',false)]),{}).$am('keywords',40962,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Font.$type.$af('names',73730,'sys::Str[]',{}).$af('size',73730,'sys::Float',{}).$af('weight',73730,'graphics::FontWeight',{}).$af('style',73730,'graphics::FontStyle',{}).$af('data',67586,'graphics::FontData?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('makeFields',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('names','sys::Str[]',false),new fan.sys.Param('size','sys::Float',false),new fan.sys.Param('weight','graphics::FontWeight',true),new fan.sys.Param('style','graphics::FontStyle',true)]),{'sys::NoDoc':""}).$am('fromStr',40966,'graphics::Font?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('decodeNames',34818,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('decodeSize',34818,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('decodeWeight',34818,'graphics::FontWeight',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('decodeStyle',34818,'graphics::FontStyle',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('fromProps',40966,'graphics::Font?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)]),{}).$am('toProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toSize',8192,'graphics::Font',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','sys::Float',false)]),{}).$am('toStyle',8192,'graphics::Font',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('style','graphics::FontStyle',false)]),{}).$am('toWeight',8192,'graphics::Font',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('weight','graphics::FontWeight',false)]),{}).$am('normalize',8192,'graphics::Font',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('metrics',8192,'graphics::FontMetrics',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dc','graphics::DeviceContext',true)]),{'sys::NoDoc':""});
  fan.graphics.FontMetrics.$type.$am('height',270337,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ascent',270337,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('descent',270337,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('leading',270337,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('width',270337,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.FontDataMetrics.$type.$af('fudge',100354,'sys::Float',{}).$af('data',67586,'graphics::FontData',{}).$af('size',67586,'sys::Float',{}).$af('ratio',67586,'sys::Float',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dc','graphics::DeviceContext',false),new fan.sys.Param('size','sys::Float',false),new fan.sys.Param('data','graphics::FontData',false)]),{'sys::NoDoc':""}).$am('height',271360,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ascent',271360,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('descent',271360,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('leading',271360,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('width',271360,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('lastChar',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.FontWeight.$type.$af('thin',106506,'graphics::FontWeight',{}).$af('extraLight',106506,'graphics::FontWeight',{}).$af('light',106506,'graphics::FontWeight',{}).$af('normal',106506,'graphics::FontWeight',{}).$af('medium',106506,'graphics::FontWeight',{}).$af('semiBold',106506,'graphics::FontWeight',{}).$af('bold',106506,'graphics::FontWeight',{}).$af('extraBold',106506,'graphics::FontWeight',{}).$af('black',106506,'graphics::FontWeight',{}).$af('vals',106498,'graphics::FontWeight[]',{}).$af('num',73730,'sys::Int',{}).$am('isNormal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromNum',40962,'graphics::FontWeight?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('num','sys::Int',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('decode',40962,'graphics::FontWeight?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{'sys::NoDoc':""}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false),new fan.sys.Param('num','sys::Int',false)]),{}).$am('fromStr',40966,'graphics::FontWeight?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.FontStyle.$type.$af('normal',106506,'graphics::FontStyle',{}).$af('italic',106506,'graphics::FontStyle',{}).$af('oblique',106506,'graphics::FontStyle',{}).$af('vals',106498,'graphics::FontStyle[]',{}).$am('isNormal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decode',40962,'graphics::FontStyle?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{'sys::NoDoc':""}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'graphics::FontStyle?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Image.$type.$af('mimePng',106498,'sys::MimeType',{'sys::NoDoc':""}).$af('mimeGif',106498,'sys::MimeType',{'sys::NoDoc':""}).$af('mimeJpeg',106498,'sys::MimeType',{'sys::NoDoc':""}).$af('mimeSvg',106498,'sys::MimeType',{'sys::NoDoc':""}).$am('uri',270337,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isLoaded',270337,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mime',270337,'sys::MimeType',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',270337,'graphics::Size',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('w',270336,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h',270336,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',270337,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('prop','sys::Str',false)]),{'sys::NoDoc':"",'sys::Operator':""}).$am('mimeForExt',40962,'sys::MimeType',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ext','sys::Str',false)]),{'sys::NoDoc':""}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.PngImage.$type.$am('hasAlpha',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasPalette',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasTransparency',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('colorType',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('colors',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pixelBits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('palette',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('transparency',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('imgData',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pixels',270337,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.DeviceContext.$type.$af('curRef',100354,'graphics::DeviceContext',{}).$af('dpi',73730,'sys::Float',{}).$am('cur',40962,'graphics::DeviceContext',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dpi','sys::Float',false)]),{'sys::NoDoc':""}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.FontData.$type.$af('registry',106498,'[sys::Str:graphics::FontData]',{}).$af('key',73730,'sys::Str',{}).$af('name',73730,'sys::Str',{}).$af('weight',73730,'graphics::FontWeight',{}).$af('style',73730,'graphics::FontStyle',{}).$af('height',73730,'sys::Int',{}).$af('leading',73730,'sys::Int',{}).$af('ascent',73730,'sys::Int',{}).$af('descent',73730,'sys::Int',{}).$af('widths',73730,'sys::Int[]',{}).$af('charToWidth',67586,'sys::Str',{}).$af('lastChar',73730,'sys::Int',{}).$am('find',40962,'graphics::FontData?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','graphics::Font',false)]),{}).$am('register',34818,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('acc','[sys::Str:graphics::FontData]',false),new fan.sys.Param('m','graphics::FontData',false)]),{}).$am('toKey',34818,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('style','graphics::FontStyle',false),new fan.sys.Param('weight','graphics::FontWeight',false),new fan.sys.Param('name','sys::Str',false)]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('ascent','sys::Int',false),new fan.sys.Param('descent','sys::Int',false),new fan.sys.Param('widths','sys::Int[]',false),new fan.sys.Param('charToWidth','sys::Str',false)]),{}).$am('normalize',40962,'graphics::Font',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','graphics::Font',false)]),{}).$am('toNormalize',34818,'graphics::FontData?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('style','graphics::FontStyle',false),new fan.sys.Param('weight','graphics::FontWeight',false),new fan.sys.Param('name','sys::Str',false)]),{}).$am('charWidth',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ch','sys::Int',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Stroke.$type.$af('defVal',106498,'graphics::Stroke',{}).$af('width',73730,'sys::Float',{}).$af('dash',73730,'sys::Str?',{}).$af('cap',73730,'graphics::StrokeCap',{}).$af('join',73730,'graphics::StrokeJoin',{}).$am('fromStr',40966,'graphics::Stroke?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('makeFields',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Float',true),new fan.sys.Param('dash','sys::Str?',true),new fan.sys.Param('cap','graphics::StrokeCap',true),new fan.sys.Param('join','graphics::StrokeJoin',true)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('toSize',8192,'graphics::Stroke',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newWidth','sys::Float',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.StrokeCap.$type.$af('butt',106506,'graphics::StrokeCap',{}).$af('round',106506,'graphics::StrokeCap',{}).$af('square',106506,'graphics::StrokeCap',{}).$af('vals',106498,'graphics::StrokeCap[]',{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'graphics::StrokeCap?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.StrokeJoin.$type.$af('bevel',106506,'graphics::StrokeJoin',{}).$af('miter',106506,'graphics::StrokeJoin',{}).$af('radius',106506,'graphics::StrokeJoin',{}).$af('vals',106498,'graphics::StrokeJoin[]',{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'graphics::StrokeJoin?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Point.$type.$af('defVal',106498,'graphics::Point',{}).$af('x',73730,'sys::Float',{}).$af('y',73730,'sys::Float',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('makeInt',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)]),{}).$am('fromStr',40966,'graphics::Point?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('translate',8192,'graphics::Point',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','graphics::Point',false)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Size.$type.$af('defVal',106498,'graphics::Size',{}).$af('w',73730,'sys::Float',{}).$af('h',73730,'sys::Float',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('makeInt',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)]),{}).$am('fromStr',40966,'graphics::Size?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Rect.$type.$af('defVal',106498,'graphics::Rect',{}).$af('x',73730,'sys::Float',{}).$af('y',73730,'sys::Float',{}).$af('w',73730,'sys::Float',{}).$af('h',73730,'sys::Float',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('makeInt',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)]),{}).$am('makePosSize',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','graphics::Point',false),new fan.sys.Param('s','graphics::Size',false)]),{}).$am('fromStr',40966,'graphics::Rect?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('pos',8192,'graphics::Point',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',8192,'graphics::Size',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('contains',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pt','graphics::Point',false)]),{}).$am('intersects',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','graphics::Rect',false)]),{}).$am('intersection',8192,'graphics::Rect',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','graphics::Rect',false)]),{}).$am('union',8192,'graphics::Rect',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','graphics::Rect',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Insets.$type.$af('defVal',106498,'graphics::Insets',{}).$af('top',73730,'sys::Float',{}).$af('right',73730,'sys::Float',{}).$af('bottom',73730,'sys::Float',{}).$af('left',73730,'sys::Float',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('top','sys::Num',false),new fan.sys.Param('right','sys::Num?',true),new fan.sys.Param('bottom','sys::Num?',true),new fan.sys.Param('left','sys::Num?',true)]),{}).$am('fromStr',40966,'graphics::Insets?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('toSize',8192,'graphics::Size',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('w',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.GeomUtil.$type.$am('split',40962,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('parseFloatList',40962,'sys::Float[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('formatFloats2',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Float',false),new fan.sys.Param('b','sys::Float',false)]),{}).$am('formatFloats4',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Float',false),new fan.sys.Param('b','sys::Float',false),new fan.sys.Param('c','sys::Float',false),new fan.sys.Param('d','sys::Float',false)]),{}).$am('formatFloat',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::Float',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.GraphicsPath.$type.$am('draw',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fill',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clip',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('moveTo',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('lineTo',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('arc',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('radius','sys::Float',false),new fan.sys.Param('start','sys::Float',false),new fan.sys.Param('sweep','sys::Float',false)]),{}).$am('curveTo',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cp1x','sys::Float',false),new fan.sys.Param('cp1y','sys::Float',false),new fan.sys.Param('cp2x','sys::Float',false),new fan.sys.Param('cp2y','sys::Float',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('quadTo',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cpx','sys::Float',false),new fan.sys.Param('cpy','sys::Float',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('close',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Graphics.$type.$af('paint',270337,'graphics::Paint',{}).$af('color',270337,'graphics::Color',{}).$af('stroke',270337,'graphics::Stroke',{}).$af('alpha',270337,'sys::Float',{}).$af('font',270337,'graphics::Font',{}).$am('metrics',270337,'graphics::FontMetrics',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('path',270337,'graphics::GraphicsPath',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('drawLine',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x1','sys::Float',false),new fan.sys.Param('y1','sys::Float',false),new fan.sys.Param('x2','sys::Float',false),new fan.sys.Param('y2','sys::Float',false)]),{}).$am('drawRect',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('fillRect',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('clipRect',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('drawRoundRect',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false),new fan.sys.Param('wArc','sys::Float',false),new fan.sys.Param('hArc','sys::Float',false)]),{}).$am('fillRoundRect',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false),new fan.sys.Param('wArc','sys::Float',false),new fan.sys.Param('hArc','sys::Float',false)]),{}).$am('drawText',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('drawImage',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','graphics::Image',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',true),new fan.sys.Param('h','sys::Float',true)]),{}).$am('drawImageRegion',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','graphics::Image',false),new fan.sys.Param('src','graphics::Rect',false),new fan.sys.Param('dst','graphics::Rect',false)]),{}).$am('translate',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('transform',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('transform','graphics::Transform',false)]),{}).$am('push',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','graphics::Rect?',true)]),{}).$am('pop',270337,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dispose',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.graphics.Transform.$type.$af('a',73730,'sys::Float',{}).$af('b',73730,'sys::Float',{}).$af('c',73730,'sys::Float',{}).$af('d',73730,'sys::Float',{}).$af('e',73730,'sys::Float',{}).$af('f',73730,'sys::Float',{}).$am('fromStr',40966,'graphics::Transform?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('parseFunc',34818,'graphics::Transform',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('translate',40962,'graphics::Transform',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tx','sys::Float',false),new fan.sys.Param('ty','sys::Float',false)]),{}).$am('scale',40962,'graphics::Transform',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('sx','sys::Float',false),new fan.sys.Param('sy','sys::Float',false)]),{}).$am('rotate',40962,'graphics::Transform',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('angle','sys::Float',false),new fan.sys.Param('cx','sys::Float?',true),new fan.sys.Param('cy','sys::Float?',true)]),{}).$am('skewX',40962,'graphics::Transform',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('angle','sys::Float',false)]),{}).$am('skewY',40962,'graphics::Transform',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('angle','sys::Float',false)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Float',false),new fan.sys.Param('b','sys::Float',false),new fan.sys.Param('c','sys::Float',false),new fan.sys.Param('d','sys::Float',false),new fan.sys.Param('e','sys::Float',false),new fan.sys.Param('f','sys::Float',false)]),{}).$am('mult',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','graphics::Transform',false)]),{'sys::Operator':""}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('f2s',34818,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::Float',false)]),{});
  fan.graphics.GraphicsEnv.$type.$af('curRef',100354,'concurrent::AtomicRef',{}).$am('cur',40962,'graphics::GraphicsEnv',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('init',34818,'graphics::GraphicsEnv?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('install',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('env','graphics::GraphicsEnv',false)]),{'sys::NoDoc':""}).$am('image',270337,'graphics::Image',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('data','sys::Buf?',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "graphics");
  m_meta.set("pod.version", "1.0.78.3106");
  m_version = fan.sys.Version.fromStr("1.0.78.3106");
  m_meta.set("pod.depends", "sys 1.0;concurrent 1.0");
  m_meta.set("pod.summary", "Graphics API");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:23:10-05:00 New_York");
  m_meta.set("build.tsKey", "221115162310");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("pod.docSrc", "true");
  m_meta.set("license.name", "Academic Free License 3.0");
  m_meta.set("org.name", "Fantom");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "Fantom Core");
  m_meta.set("proj.uri", "https://fantom.org/");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://fantom.org/");
  m_meta.set("pod.native.java", "false");
  m_meta.set("vcs.uri", "https://github.com/fantom-lang/fantom");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("vcs.name", "Git");
  m_meta.set("pod.native.js", "false");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
fan.graphics.$clos$_u5 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["tok","sys::Str","false","i","sys::Int","false"]);
fan.graphics.$clos$_u6 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["buf","sys::StrBuf","false"]);
fan.graphics.$clos$_u7 = new fan.sys.ClosureFuncSpec$(fan.graphics.Color.$type,["tok","sys::Str","false"]);
fan.graphics.$clos$_u13 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Str:graphics::Color]","false"]);
fan.graphics.$clos$_u25 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Str:sys::Str]","false"]);
fan.graphics.$clos$_u34 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Str:graphics::FontData]","false"]);
fan.graphics.$clos$_u37 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["tok","sys::Str","false"]);
fan.graphics.$clos$_u45 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["tok","sys::Str","false"]);
fan.graphics.$clos$_u46 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["func","sys::Str","false"]);
fan.graphics.Color.static$init();
fan.graphics.FontDataMetrics.static$init();
fan.graphics.FontWeight.static$init();
fan.graphics.FontStyle.static$init();
fan.graphics.Image.static$init();
fan.graphics.DeviceContext.static$init();
fan.graphics.FontData.static$init();
fan.graphics.Stroke.static$init();
fan.graphics.StrokeCap.static$init();
fan.graphics.StrokeJoin.static$init();
fan.graphics.Point.static$init();
fan.graphics.Size.static$init();
fan.graphics.Rect.static$init();
fan.graphics.Insets.static$init();
fan.graphics.GraphicsEnv.static$init();
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.util = exports;
} else {
  fan.util = root.fan.util = {};
}

fan.util.CsvInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.util.CsvInStream.prototype.$ctor = function()
{
  fan.sys.InStream.prototype.$ctor.call(this);
  var $this = this;
  this.m_delimiter = 44;
  this.m_trim = true;
  this.m_rowWidth = 10;
  return;
}
fan.util.CsvInStream.prototype.$typeof = function() { return fan.util.CsvInStream.$type; }
fan.util.CsvInStream.make = function($in) {
  var self = new fan.util.CsvInStream();
  fan.util.CsvInStream.make$(self,$in);
  return self;
  }
fan.util.CsvInStream.make$ = function(self,$in)
{
  fan.sys.InStream.make$(self,$in);
  ;
  return;
}
fan.util.CsvInStream.prototype.delimiter = function()
{
  return this.m_delimiter;
}
fan.util.CsvInStream.prototype.delimiter$ = function(it)
{
  this.m_delimiter = it;
  return;
}
fan.util.CsvInStream.prototype.trim = function()
{
  return this.m_trim;
}
fan.util.CsvInStream.prototype.trim$ = function(it)
{
  this.m_trim = it;
  return;
}
fan.util.CsvInStream.prototype.readAllRows = function()
{
  var $this = this;
  var rows = fan.sys.List.make(fan.sys.Type.find("sys::Str[]"));
  this.eachRow(fan.sys.Func.make$closure(
    fan.util.$clos$_u0,
    function(row)
    {
      rows.add(row);
      return;
    }));
  return rows;
}
fan.util.CsvInStream.prototype.eachRow = function(f)
{
  try
  {
    while (true)
    {
      var row = this.readRow();
      if (row == null)
      {
        break;
      }
      ;
      f.call(fan.sys.ObjUtil.coerce(row,fan.sys.Type.find("sys::Str[]")));
    }
    ;
  }
  finally
  {
    this.close();
  }
  ;
  return;
}
fan.util.CsvInStream.prototype.readRow = function()
{
  this.m_line = this.readLine(null);
  if (this.m_line == null)
  {
    return null;
  }
  ;
  var cells = fan.sys.List.make(fan.sys.Str.$type);
  cells.capacity$(this.m_rowWidth);
  this.m_pos = 0;
  while (fan.sys.ObjUtil.compareLT(this.m_pos,fan.sys.Str.size(this.m_line)))
  {
    cells.add(this.parseCell());
  }
  ;
  if ((!fan.sys.Str.isEmpty(this.m_line) && fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_line,-1),this.m_delimiter)))
  {
    cells.add("");
  }
  ;
  this.m_rowWidth = cells.size();
  return cells;
}
fan.util.CsvInStream.prototype.parseCell = function()
{
  if (this.m_trim)
  {
    while ((fan.sys.ObjUtil.compareLT(this.m_pos,fan.sys.Str.size(this.m_line)) && fan.sys.Int.isSpace(fan.sys.Str.get(this.m_line,this.m_pos))))
    {
      (function($this) { var $_u1 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u1; })(this);
    }
    ;
    if (fan.sys.ObjUtil.compareGE(this.m_pos,fan.sys.Str.size(this.m_line)))
    {
      return "";
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.compareNE(fan.sys.Str.get(this.m_line,this.m_pos),34))
  {
    return this.parseNonQuotedCell();
  }
  else
  {
    return this.parseQuotedCell();
  }
  ;
}
fan.util.CsvInStream.prototype.parseNonQuotedCell = function()
{
  var start = this.m_pos;
  while ((fan.sys.ObjUtil.compareLT(this.m_pos,fan.sys.Str.size(this.m_line)) && fan.sys.ObjUtil.compareNE(fan.sys.Str.get(this.m_line,this.m_pos),this.m_delimiter)))
  {
    this.m_pos = fan.sys.Int.increment(this.m_pos);
  }
  ;
  var end = fan.sys.Int.minus(this.m_pos,1);
  if (this.m_trim)
  {
    while ((fan.sys.ObjUtil.compareGT(end,start) && fan.sys.Int.isSpace(fan.sys.Str.get(this.m_line,end))))
    {
      end = fan.sys.Int.decrement(end);
    }
    ;
  }
  ;
  this.m_pos = fan.sys.Int.increment(this.m_pos);
  if (fan.sys.ObjUtil.compareLT(end,start))
  {
    return "";
  }
  ;
  return fan.sys.Str.getRange(this.m_line,fan.sys.Range.make(start,end));
}
fan.util.CsvInStream.prototype.parseQuotedCell = function()
{
  var s = fan.sys.StrBuf.make();
  this.m_pos = fan.sys.Int.plus(this.m_pos,1);
  while (true)
  {
    var ch = fan.sys.Str.getSafe(this.m_line,(function($this) { var $_u2 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u2; })(this),0);
    while (fan.sys.ObjUtil.equals(ch,0))
    {
      this.m_pos = 0;
      this.m_line = this.readLine();
      if (this.m_line == null)
      {
        throw fan.sys.IOErr.make("Unexpected end of file in multi-line quoted cell");
      }
      ;
      s.addChar(10);
      ch = fan.sys.Str.getSafe(this.m_line,(function($this) { var $_u3 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u3; })(this),0);
    }
    ;
    if (fan.sys.ObjUtil.compareNE(ch,34))
    {
      s.addChar(ch);
      continue;
    }
    ;
    ch = fan.sys.Str.getSafe(this.m_line,(function($this) { var $_u4 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u4; })(this));
    if (fan.sys.ObjUtil.equals(ch,34))
    {
      s.addChar(ch);
      continue;
    }
    ;
    while (fan.sys.ObjUtil.compareNE(ch,this.m_delimiter))
    {
      ch = fan.sys.Str.getSafe(this.m_line,(function($this) { var $_u5 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u5; })(this),this.m_delimiter);
    }
    ;
    break;
  }
  ;
  return s.toStr();
}
fan.util.CsvInStream.prototype.rowWidth = function()
{
  return this.m_rowWidth;
}
fan.util.CsvInStream.prototype.rowWidth$ = function(it)
{
  this.m_rowWidth = it;
  return;
}
fan.util.CsvInStream.prototype.line = function()
{
  return this.m_line;
}
fan.util.CsvInStream.prototype.line$ = function(it)
{
  this.m_line = it;
  return;
}
fan.util.CsvInStream.prototype.pos = function()
{
  return this.m_pos;
}
fan.util.CsvInStream.prototype.pos$ = function(it)
{
  this.m_pos = it;
  return;
}
fan.util.CsvInStream.prototype.m_delimiter = 0;
fan.util.CsvInStream.prototype.m_trim = false;
fan.util.CsvInStream.prototype.m_rowWidth = 0;
fan.util.CsvInStream.prototype.m_line = null;
fan.util.CsvInStream.prototype.m_pos = 0;
fan.util.Macro = fan.sys.Obj.$extend(fan.sys.Obj);
fan.util.Macro.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.util.Macro.prototype.$typeof = function() { return fan.util.Macro.$type; }
fan.util.Macro.make = function(pattern) {
  var self = new fan.util.Macro();
  fan.util.Macro.make$(self,pattern);
  return self;
  }
fan.util.Macro.make$ = function(self,pattern)
{
  self.m_pattern = pattern;
  return;
}
fan.util.Macro.prototype.apply = function(resolve)
{
  var resBuf = fan.sys.StrBuf.make();
  var keyBuf = fan.sys.StrBuf.make();
  var pos = 0;
  var start = -1;
  var size = fan.sys.Str.size(this.m_pattern);
  var mode = fan.util.Macro.m_norm;
  while (true)
  {
    if (fan.sys.ObjUtil.equals(mode,fan.util.Macro.m_norm))
    {
      if (fan.sys.ObjUtil.equals(pos,size))
      {
        break;
      }
      ;
      if ((fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_pattern,pos),123) && fan.sys.ObjUtil.equals(fan.sys.Str.getSafe(this.m_pattern,fan.sys.Int.plus(pos,1)),123)))
      {
        mode = fan.util.Macro.m_inMacro;
        start = pos;
        pos = fan.sys.Int.plus(pos,2);
        keyBuf.clear();
      }
      else
      {
        resBuf.addChar(fan.sys.Str.get(this.m_pattern,(function($this) { var $_u6 = pos; pos = fan.sys.Int.increment(pos); return $_u6; })(this)));
      }
      ;
    }
    else
    {
      if (fan.sys.ObjUtil.equals(mode,fan.util.Macro.m_inMacro))
      {
        if (fan.sys.ObjUtil.equals(pos,size))
        {
          throw fan.sys.ParseErr.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Unterminated macro at index ",fan.sys.ObjUtil.coerce(start,fan.sys.Obj.$type.toNullable())),": "),this.m_pattern));
        }
        ;
        if ((fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_pattern,pos),125) && fan.sys.ObjUtil.equals(fan.sys.Str.getSafe(this.m_pattern,fan.sys.Int.plus(pos,1)),125)))
        {
          mode = fan.util.Macro.m_norm;
          pos = fan.sys.Int.plus(pos,2);
          resBuf.add(resolve.call(keyBuf.toStr()));
        }
        else
        {
          keyBuf.addChar(fan.sys.Str.get(this.m_pattern,(function($this) { var $_u7 = pos; pos = fan.sys.Int.increment(pos); return $_u7; })(this)));
        }
        ;
      }
      else
      {
        throw fan.sys.Err.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Illegal State: mode [",fan.sys.ObjUtil.coerce(mode,fan.sys.Obj.$type.toNullable())),"] pos ["),fan.sys.ObjUtil.coerce(pos,fan.sys.Obj.$type.toNullable())),"]: "),this.m_pattern));
      }
      ;
    }
    ;
  }
  ;
  return resBuf.toStr();
}
fan.util.Macro.prototype.keys = function()
{
  var $this = this;
  var acc = fan.sys.List.make(fan.sys.Str.$type);
  this.apply(fan.sys.Func.make$closure(
    fan.util.$clos$_u8,
    function(key)
    {
      acc.add(key);
      return key;
    }));
  return acc;
}
fan.util.Macro.static$init = function()
{
  fan.util.Macro.m_norm = 0;
  fan.util.Macro.m_inMacro = 1;
  return;
}
fan.util.Macro.prototype.m_pattern = null;
fan.util.Macro.m_norm = 0;
fan.util.Macro.m_inMacro = 0;
fan.util.FileLoc = fan.sys.Obj.$extend(fan.sys.Obj);
fan.util.FileLoc.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.util.FileLoc.prototype.$typeof = function() { return fan.util.FileLoc.$type; }
fan.util.FileLoc.makeFile = function(file,line,col)
{
  if (line === undefined) line = 0;
  if (col === undefined) col = 0;
  var uri = file.uri();
  var $name = (function($this) { if (fan.sys.ObjUtil.equals(uri.scheme(),"fan")) return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",uri.host()),"::"),uri.pathStr()); return file.pathStr(); })(this);
  return fan.util.FileLoc.make($name,line,col);
}
fan.util.FileLoc.make = function(file,line,col) {
  var self = new fan.util.FileLoc();
  fan.util.FileLoc.make$(self,file,line,col);
  return self;
  }
fan.util.FileLoc.make$ = function(self,file,line,col)
{
  if (line === undefined) line = 0;
  if (col === undefined) col = 0;
  self.m_file = file;
  self.m_line = line;
  self.m_col = col;
  return;
}
fan.util.FileLoc.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Str.hash(this.m_file),fan.sys.Int.hash(this.m_line)),fan.sys.Int.shiftl(fan.sys.Int.hash(this.m_col),17));
}
fan.util.FileLoc.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.util.FileLoc.$type);
  if (x == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_file,x.m_file) && fan.sys.ObjUtil.equals(this.m_line,x.m_line) && fan.sys.ObjUtil.equals(this.m_col,x.m_col));
}
fan.util.FileLoc.prototype.compare = function(that)
{
  var x = fan.sys.ObjUtil.coerce(that,fan.util.FileLoc.$type);
  if (fan.sys.ObjUtil.compareNE(this.m_file,x.m_file))
  {
    return fan.sys.ObjUtil.compare(this.m_file,x.m_file);
  }
  ;
  if (fan.sys.ObjUtil.compareNE(this.m_line,x.m_line))
  {
    return fan.sys.ObjUtil.compare(this.m_line,x.m_line);
  }
  ;
  return fan.sys.ObjUtil.compare(this.m_col,x.m_col);
}
fan.util.FileLoc.prototype.toStr = function()
{
  if (fan.sys.ObjUtil.compareLE(this.m_line,0))
  {
    return this.m_file;
  }
  ;
  if (fan.sys.ObjUtil.compareLE(this.m_col,0))
  {
    return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",this.m_file),"("),fan.sys.ObjUtil.coerce(this.m_line,fan.sys.Obj.$type.toNullable())),")");
  }
  ;
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",this.m_file),"("),fan.sys.ObjUtil.coerce(this.m_line,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_col,fan.sys.Obj.$type.toNullable())),")");
}
fan.util.FileLoc.static$init = function()
{
  fan.util.FileLoc.m_unknown = fan.util.FileLoc.make("unknown",0);
  fan.util.FileLoc.m_inputs = fan.util.FileLoc.make("inputs",0);
  fan.util.FileLoc.m_synthetic = fan.util.FileLoc.make("synthetic",0);
  return;
}
fan.util.FileLoc.m_unknown = null;
fan.util.FileLoc.m_inputs = null;
fan.util.FileLoc.m_synthetic = null;
fan.util.FileLoc.prototype.m_file = null;
fan.util.FileLoc.prototype.m_line = 0;
fan.util.FileLoc.prototype.m_col = 0;
fan.util.CsvOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.util.CsvOutStream.prototype.$ctor = function()
{
  fan.sys.OutStream.prototype.$ctor.call(this);
  var $this = this;
  this.m_delimiter = 44;
  return;
}
fan.util.CsvOutStream.prototype.$typeof = function() { return fan.util.CsvOutStream.$type; }
fan.util.CsvOutStream.make = function(out) {
  var self = new fan.util.CsvOutStream();
  fan.util.CsvOutStream.make$(self,out);
  return self;
  }
fan.util.CsvOutStream.make$ = function(self,out)
{
  fan.sys.OutStream.make$(self,out);
  ;
  return;
}
fan.util.CsvOutStream.prototype.delimiter = function()
{
  return this.m_delimiter;
}
fan.util.CsvOutStream.prototype.delimiter$ = function(it)
{
  this.m_delimiter = it;
  return;
}
fan.util.CsvOutStream.prototype.writeRow = function(row)
{
  var $this = this;
  row.each(fan.sys.Func.make$closure(
    fan.util.$clos$_u10,
    function(cell,i)
    {
      if (fan.sys.ObjUtil.compareGT(i,0))
      {
        $this.writeChar($this.m_delimiter);
      }
      ;
      $this.writeCell(cell);
      return;
    }));
  return fan.sys.ObjUtil.coerce(this.writeChar(10),fan.util.CsvOutStream.$type);
}
fan.util.CsvOutStream.prototype.writeCell = function(cell)
{
  var $this = this;
  if (!this.isQuoteRequired(cell))
  {
    return fan.sys.ObjUtil.coerce(this.print(cell),fan.util.CsvOutStream.$type);
  }
  ;
  this.writeChar(34);
  fan.sys.Str.each(cell,fan.sys.Func.make$closure(
    fan.util.$clos$_u11,
    function(ch)
    {
      if (fan.sys.ObjUtil.equals(ch,34))
      {
        $this.writeChar(34);
      }
      ;
      $this.writeChar(ch);
      return;
    }));
  return fan.sys.ObjUtil.coerce(this.writeChar(34),fan.util.CsvOutStream.$type);
}
fan.util.CsvOutStream.prototype.isQuoteRequired = function(cell)
{
  var $this = this;
  if (fan.sys.Str.isEmpty(cell))
  {
    return true;
  }
  ;
  if ((fan.sys.Int.isSpace(fan.sys.Str.get(cell,0)) || fan.sys.Int.isSpace(fan.sys.Str.get(cell,-1))))
  {
    return true;
  }
  ;
  return fan.sys.Str.any(cell,fan.sys.Func.make$closure(
    fan.util.$clos$_u12,
    function(ch)
    {
      return (fan.sys.ObjUtil.equals(ch,$this.m_delimiter) || fan.sys.ObjUtil.equals(ch,34) || fan.sys.ObjUtil.equals(ch,10) || fan.sys.ObjUtil.equals(ch,13));
    }));
}
fan.util.CsvOutStream.prototype.m_delimiter = 0;
fan.util.JsonInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.util.JsonInStream.prototype.$ctor = function()
{
  fan.sys.InStream.prototype.$ctor.call(this);
  var $this = this;
  this.m_cur = 63;
  this.m_pos = 0;
  return;
}
fan.util.JsonInStream.prototype.$typeof = function() { return fan.util.JsonInStream.$type; }
fan.util.JsonInStream.make = function($in) {
  var self = new fan.util.JsonInStream();
  fan.util.JsonInStream.make$(self,$in);
  return self;
  }
fan.util.JsonInStream.make$ = function(self,$in)
{
  fan.sys.InStream.make$(self,$in);
  ;
  return;
}
fan.util.JsonInStream.prototype.readJson = function()
{
  this.m_pos = 0;
  this.consume();
  this.skipWhitespace();
  return this.parseVal();
}
fan.util.JsonInStream.prototype.parseObj = function()
{
  var $this = this;
  var pairs = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?")),fan.sys.Func.make$closure(
    fan.util.$clos$_u13,
    function(it)
    {
      it.ordered$(true);
      return;
    })),fan.sys.Type.find("[sys::Str:sys::Obj?]"));
  this.skipWhitespace();
  this.expect(fan.util.JsonToken.m_objectStart);
  while (true)
  {
    this.skipWhitespace();
    if (this.maybe(fan.util.JsonToken.m_objectEnd))
    {
      return pairs;
    }
    ;
    this.parsePair(pairs);
    if (!this.maybe(fan.util.JsonToken.m_comma))
    {
      break;
    }
    ;
  }
  ;
  this.expect(fan.util.JsonToken.m_objectEnd);
  return pairs;
}
fan.util.JsonInStream.prototype.parsePair = function(obj)
{
  this.skipWhitespace();
  var key = this.parseStr();
  this.skipWhitespace();
  this.expect(fan.util.JsonToken.m_colon);
  this.skipWhitespace();
  var val = this.parseVal();
  this.skipWhitespace();
  obj.set(key,val);
  return;
}
fan.util.JsonInStream.prototype.parseVal = function()
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(this.m_cur,fan.util.JsonToken.m_quote))
  {
    return this.parseStr();
  }
  else
  {
    if ((fan.sys.Int.isDigit(this.m_cur) || fan.sys.ObjUtil.equals(this.m_cur,45)))
    {
      return this.parseNum();
    }
    else
    {
      if (fan.sys.ObjUtil.equals(this.m_cur,fan.util.JsonToken.m_objectStart))
      {
        return this.parseObj();
      }
      else
      {
        if (fan.sys.ObjUtil.equals(this.m_cur,fan.util.JsonToken.m_arrayStart))
        {
          return this.parseArray();
        }
        else
        {
          if (fan.sys.ObjUtil.equals(this.m_cur,116))
          {
            fan.sys.Int.times(4,fan.sys.Func.make$closure(
              fan.util.$clos$_u14,
              function()
              {
                $this.consume();
                return;
              }));
            return fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable());
          }
          else
          {
            if (fan.sys.ObjUtil.equals(this.m_cur,102))
            {
              fan.sys.Int.times(5,fan.sys.Func.make$closure(
                fan.util.$clos$_u14,
                function()
                {
                  $this.consume();
                  return;
                }));
              return fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable());
            }
            else
            {
              if (fan.sys.ObjUtil.equals(this.m_cur,110))
              {
                fan.sys.Int.times(4,fan.sys.Func.make$closure(
                  fan.util.$clos$_u14,
                  function()
                  {
                    $this.consume();
                    return;
                  }));
                return null;
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.compareLT(this.m_cur,0))
  {
    throw this.err("Unexpected end of stream");
  }
  ;
  throw this.err(fan.sys.Str.plus("Unexpected token ",fan.sys.ObjUtil.coerce(this.m_cur,fan.sys.Obj.$type.toNullable())));
}
fan.util.JsonInStream.prototype.parseNum = function()
{
  var integral = fan.sys.StrBuf.make();
  var fractional = fan.sys.StrBuf.make();
  var exponent = fan.sys.StrBuf.make();
  if (this.maybe(45))
  {
    integral.add("-");
  }
  ;
  while (fan.sys.Int.isDigit(this.m_cur))
  {
    integral.addChar(this.m_cur);
    this.consume();
  }
  ;
  if (fan.sys.ObjUtil.equals(this.m_cur,46))
  {
    var decimal = true;
    this.consume();
    while (fan.sys.Int.isDigit(this.m_cur))
    {
      fractional.addChar(this.m_cur);
      this.consume();
    }
    ;
  }
  ;
  if ((fan.sys.ObjUtil.equals(this.m_cur,101) || fan.sys.ObjUtil.equals(this.m_cur,69)))
  {
    exponent.addChar(this.m_cur);
    this.consume();
    if (fan.sys.ObjUtil.equals(this.m_cur,43))
    {
      this.consume();
    }
    else
    {
      if (fan.sys.ObjUtil.equals(this.m_cur,45))
      {
        exponent.addChar(this.m_cur);
        this.consume();
      }
      ;
    }
    ;
    while (fan.sys.Int.isDigit(this.m_cur))
    {
      exponent.addChar(this.m_cur);
      this.consume();
    }
    ;
  }
  ;
  var num = null;
  if (fan.sys.ObjUtil.compareGT(fractional.size(),0))
  {
    num = fan.sys.ObjUtil.coerce(fan.sys.Float.fromStr(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(integral.toStr(),"."),fractional.toStr()),exponent.toStr())),fan.sys.Num.$type.toNullable());
  }
  else
  {
    if (fan.sys.ObjUtil.compareGT(exponent.size(),0))
    {
      num = fan.sys.ObjUtil.coerce(fan.sys.Float.fromStr(fan.sys.Str.plus(integral.toStr(),exponent.toStr())),fan.sys.Num.$type.toNullable());
    }
    else
    {
      num = fan.sys.ObjUtil.coerce(fan.sys.Int.fromStr(integral.toStr()),fan.sys.Num.$type.toNullable());
    }
    ;
  }
  ;
  return fan.sys.ObjUtil.coerce(num,fan.sys.Obj.$type);
}
fan.util.JsonInStream.prototype.parseStr = function()
{
  var s = fan.sys.StrBuf.make();
  this.expect(fan.util.JsonToken.m_quote);
  while (fan.sys.ObjUtil.compareNE(this.m_cur,fan.util.JsonToken.m_quote))
  {
    if (fan.sys.ObjUtil.compareLT(this.m_cur,0))
    {
      throw this.err("Unexpected end of str literal");
    }
    ;
    if (fan.sys.ObjUtil.equals(this.m_cur,92))
    {
      s.addChar(this.escape());
    }
    else
    {
      s.addChar(this.m_cur);
      this.consume();
    }
    ;
  }
  ;
  this.expect(fan.util.JsonToken.m_quote);
  return s.toStr();
}
fan.util.JsonInStream.prototype.escape = function()
{
  this.expect(92);
  var $_u15 = this.m_cur;
  if (fan.sys.ObjUtil.equals($_u15,98))
  {
    this.consume();
    return 8;
  }
  else if (fan.sys.ObjUtil.equals($_u15,102))
  {
    this.consume();
    return 12;
  }
  else if (fan.sys.ObjUtil.equals($_u15,110))
  {
    this.consume();
    return 10;
  }
  else if (fan.sys.ObjUtil.equals($_u15,114))
  {
    this.consume();
    return 13;
  }
  else if (fan.sys.ObjUtil.equals($_u15,116))
  {
    this.consume();
    return 9;
  }
  else if (fan.sys.ObjUtil.equals($_u15,34))
  {
    this.consume();
    return 34;
  }
  else if (fan.sys.ObjUtil.equals($_u15,92))
  {
    this.consume();
    return 92;
  }
  else if (fan.sys.ObjUtil.equals($_u15,47))
  {
    this.consume();
    return 47;
  }
  ;
  if (fan.sys.ObjUtil.equals(this.m_cur,117))
  {
    this.consume();
    var n3 = fan.sys.Int.fromDigit(this.m_cur,16);
    this.consume();
    var n2 = fan.sys.Int.fromDigit(this.m_cur,16);
    this.consume();
    var n1 = fan.sys.Int.fromDigit(this.m_cur,16);
    this.consume();
    var n0 = fan.sys.Int.fromDigit(this.m_cur,16);
    this.consume();
    if ((n3 == null || n2 == null || n1 == null || n0 == null))
    {
      throw this.err("Invalid hex value for \\uxxxx");
    }
    ;
    return fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(fan.sys.ObjUtil.coerce(n3,fan.sys.Int.$type),12),fan.sys.Int.shiftl(fan.sys.ObjUtil.coerce(n2,fan.sys.Int.$type),8)),fan.sys.Int.shiftl(fan.sys.ObjUtil.coerce(n1,fan.sys.Int.$type),4)),fan.sys.ObjUtil.coerce(n0,fan.sys.Int.$type));
  }
  ;
  throw this.err("Invalid escape sequence");
}
fan.util.JsonInStream.prototype.parseArray = function()
{
  var array = fan.sys.List.make(fan.sys.Obj.$type.toNullable());
  this.expect(fan.util.JsonToken.m_arrayStart);
  this.skipWhitespace();
  if (this.maybe(fan.util.JsonToken.m_arrayEnd))
  {
    return array;
  }
  ;
  while (true)
  {
    this.skipWhitespace();
    var val = this.parseVal();
    array.add(val);
    this.skipWhitespace();
    if (!this.maybe(fan.util.JsonToken.m_comma))
    {
      break;
    }
    ;
  }
  ;
  this.skipWhitespace();
  this.expect(fan.util.JsonToken.m_arrayEnd);
  return array;
}
fan.util.JsonInStream.prototype.skipWhitespace = function()
{
  while (fan.sys.Int.isSpace(this.m_cur))
  {
    this.consume();
  }
  ;
  return;
}
fan.util.JsonInStream.prototype.expect = function(tt)
{
  if (fan.sys.ObjUtil.compareLT(this.m_cur,0))
  {
    throw this.err(fan.sys.Str.plus("Unexpected end of stream, expected ",fan.sys.Int.toChar(tt)));
  }
  ;
  if (fan.sys.ObjUtil.compareNE(this.m_cur,tt))
  {
    throw this.err(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Expected ",fan.sys.Int.toChar(tt)),", got "),fan.sys.Int.toChar(this.m_cur))," at "),fan.sys.ObjUtil.coerce(this.m_pos,fan.sys.Obj.$type.toNullable())));
  }
  ;
  this.consume();
  return;
}
fan.util.JsonInStream.prototype.maybe = function(tt)
{
  if (fan.sys.ObjUtil.compareNE(this.m_cur,tt))
  {
    return false;
  }
  ;
  this.consume();
  return true;
}
fan.util.JsonInStream.prototype.consume = function()
{
  this.m_cur = fan.sys.ObjUtil.coerce((function($this) { var $_u16 = $this.readChar(); if ($_u16 != null) return $_u16; return fan.sys.ObjUtil.coerce(-1,fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type);
  (function($this) { var $_u17 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u17; })(this);
  return;
}
fan.util.JsonInStream.prototype.err = function(msg)
{
  return fan.sys.ParseErr.make(msg);
}
fan.util.JsonInStream.prototype.cur = function()
{
  return this.m_cur;
}
fan.util.JsonInStream.prototype.cur$ = function(it)
{
  this.m_cur = it;
  return;
}
fan.util.JsonInStream.prototype.pos = function()
{
  return this.m_pos;
}
fan.util.JsonInStream.prototype.pos$ = function(it)
{
  this.m_pos = it;
  return;
}
fan.util.JsonInStream.prototype.m_cur = 0;
fan.util.JsonInStream.prototype.m_pos = 0;
fan.util.JsonToken = fan.sys.Obj.$extend(fan.sys.Obj);
fan.util.JsonToken.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.util.JsonToken.prototype.$typeof = function() { return fan.util.JsonToken.$type; }
fan.util.JsonToken.make = function() {
  var self = new fan.util.JsonToken();
  fan.util.JsonToken.make$(self);
  return self;
  }
fan.util.JsonToken.make$ = function(self)
{
  return;
}
fan.util.JsonToken.static$init = function()
{
  fan.util.JsonToken.m_objectStart = 123;
  fan.util.JsonToken.m_objectEnd = 125;
  fan.util.JsonToken.m_colon = 58;
  fan.util.JsonToken.m_arrayStart = 91;
  fan.util.JsonToken.m_arrayEnd = 93;
  fan.util.JsonToken.m_comma = 44;
  fan.util.JsonToken.m_quote = 34;
  fan.util.JsonToken.m_grave = 96;
  return;
}
fan.util.JsonToken.m_objectStart = 0;
fan.util.JsonToken.m_objectEnd = 0;
fan.util.JsonToken.m_colon = 0;
fan.util.JsonToken.m_arrayStart = 0;
fan.util.JsonToken.m_arrayEnd = 0;
fan.util.JsonToken.m_comma = 0;
fan.util.JsonToken.m_quote = 0;
fan.util.JsonToken.m_grave = 0;
fan.util.JsonOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.util.JsonOutStream.prototype.$ctor = function()
{
  fan.sys.OutStream.prototype.$ctor.call(this);
  var $this = this;
  this.m_escapeUnicode = true;
  return;
}
fan.util.JsonOutStream.prototype.$typeof = function() { return fan.util.JsonOutStream.$type; }
fan.util.JsonOutStream.writeJsonToStr = function(obj)
{
  var buf = fan.sys.StrBuf.make();
  fan.util.JsonOutStream.make(buf.out()).writeJson(obj);
  return buf.toStr();
}
fan.util.JsonOutStream.make = function(out) {
  var self = new fan.util.JsonOutStream();
  fan.util.JsonOutStream.make$(self,out);
  return self;
  }
fan.util.JsonOutStream.make$ = function(self,out)
{
  fan.sys.OutStream.make$(self,out);
  ;
  return;
}
fan.util.JsonOutStream.prototype.escapeUnicode = function()
{
  return this.m_escapeUnicode;
}
fan.util.JsonOutStream.prototype.escapeUnicode$ = function(it)
{
  this.m_escapeUnicode = it;
  return;
}
fan.util.JsonOutStream.prototype.writeJson = function(obj)
{
  if (fan.sys.ObjUtil.is(obj,fan.sys.Str.$type))
  {
    this.writeJsonStr(fan.sys.ObjUtil.coerce(obj,fan.sys.Str.$type));
  }
  else
  {
    if (fan.sys.ObjUtil.is(obj,fan.sys.Num.$type))
    {
      this.writeJsonNum(fan.sys.ObjUtil.coerce(obj,fan.sys.Num.$type));
    }
    else
    {
      if (fan.sys.ObjUtil.is(obj,fan.sys.Bool.$type))
      {
        this.writeJsonBool(fan.sys.ObjUtil.coerce(obj,fan.sys.Bool.$type));
      }
      else
      {
        if (fan.sys.ObjUtil.is(obj,fan.sys.Type.find("sys::Map")))
        {
          this.writeJsonMap(fan.sys.ObjUtil.coerce(obj,fan.sys.Type.find("sys::Map")));
        }
        else
        {
          if (fan.sys.ObjUtil.is(obj,fan.sys.Type.find("sys::List")))
          {
            this.writeJsonList(fan.sys.ObjUtil.coerce(obj,fan.sys.Type.find("sys::Obj?[]")));
          }
          else
          {
            if (obj == null)
            {
              this.writeJsonNull();
            }
            else
            {
              this.writeJsonObj(fan.sys.ObjUtil.coerce(obj,fan.sys.Obj.$type));
            }
            ;
          }
          ;
        }
        ;
      }
      ;
    }
    ;
  }
  ;
  return this;
}
fan.util.JsonOutStream.prototype.writeJsonObj = function(obj)
{
  var $this = this;
  var type = fan.sys.Type.of(obj);
  var ser = fan.sys.ObjUtil.as(type.facet(fan.sys.Serializable.$type,false),fan.sys.Serializable.$type);
  if (ser == null)
  {
    throw fan.sys.IOErr.make(fan.sys.Str.plus("Object type not serializable: ",type));
  }
  ;
  if (ser.m_simple)
  {
    this.writeJsonStr(fan.sys.ObjUtil.toStr(obj));
    return;
  }
  ;
  this.writeChar(fan.util.JsonToken.m_objectStart);
  var first = true;
  type.fields().each(fan.sys.Func.make$closure(
    fan.util.$clos$_u18,
    function(f,i)
    {
      if ((f.isStatic() || fan.sys.ObjUtil.equals(f.hasFacet(fan.sys.Transient.$type),true)))
      {
        return;
      }
      ;
      if (first)
      {
        first = false;
      }
      else
      {
        $this.writeChar(fan.util.JsonToken.m_comma);
      }
      ;
      $this.writeJsonPair(f.$name(),f.get(obj));
      return;
    }));
  this.writeChar(fan.util.JsonToken.m_objectEnd);
  return;
}
fan.util.JsonOutStream.prototype.writeJsonMap = function(map)
{
  var $this = this;
  this.writeChar(fan.util.JsonToken.m_objectStart);
  var notFirst = false;
  map.each(fan.sys.Func.make$closure(
    fan.util.$clos$_u19,
    function(val,key)
    {
      if (!fan.sys.ObjUtil.is(key,fan.sys.Str.$type))
      {
        throw fan.sys.Err.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("JSON map key is not Str type: ",key)," ["),fan.sys.ObjUtil.$typeof(key)),"]"));
      }
      ;
      if (notFirst)
      {
        $this.writeChar(fan.util.JsonToken.m_comma);
      }
      ;
      $this.writeJsonPair(fan.sys.ObjUtil.coerce(key,fan.sys.Str.$type),val);
      notFirst = true;
      return;
    }));
  this.writeChar(fan.util.JsonToken.m_objectEnd);
  return;
}
fan.util.JsonOutStream.prototype.writeJsonList = function(array)
{
  var $this = this;
  this.writeChar(fan.util.JsonToken.m_arrayStart);
  var notFirst = false;
  array.each(fan.sys.Func.make$closure(
    fan.util.$clos$_u20,
    function(item)
    {
      if (notFirst)
      {
        $this.writeChar(fan.util.JsonToken.m_comma);
      }
      ;
      $this.writeJson(item);
      notFirst = true;
      return;
    }));
  this.writeChar(fan.util.JsonToken.m_arrayEnd);
  return;
}
fan.util.JsonOutStream.prototype.writeJsonStr = function(str)
{
  var $this = this;
  this.writeChar(fan.util.JsonToken.m_quote);
  fan.sys.Str.each(str,fan.sys.Func.make$closure(
    fan.util.$clos$_u21,
    function($char)
    {
      if ((fan.sys.ObjUtil.compareLE($char,127) || !$this.m_escapeUnicode))
      {
        var $_u22 = $char;
        if (fan.sys.ObjUtil.equals($_u22,8))
        {
          fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(98);
        }
        else if (fan.sys.ObjUtil.equals($_u22,12))
        {
          fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(102);
        }
        else if (fan.sys.ObjUtil.equals($_u22,10))
        {
          fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(110);
        }
        else if (fan.sys.ObjUtil.equals($_u22,13))
        {
          fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(114);
        }
        else if (fan.sys.ObjUtil.equals($_u22,9))
        {
          fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(116);
        }
        else if (fan.sys.ObjUtil.equals($_u22,92))
        {
          fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(92);
        }
        else if (fan.sys.ObjUtil.equals($_u22,34))
        {
          fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(34);
        }
        else
        {
          $this.writeChar($char);
        }
        ;
      }
      else
      {
        fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce($this.writeChar(92),fan.util.JsonOutStream.$type).writeChar(117),fan.util.JsonOutStream.$type).print(fan.sys.Int.toHex($char,fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
      }
      ;
      return;
    }));
  this.writeChar(fan.util.JsonToken.m_quote);
  return;
}
fan.util.JsonOutStream.prototype.writeJsonNum = function(num)
{
  this.print(num);
  return;
}
fan.util.JsonOutStream.prototype.writeJsonBool = function(bool)
{
  this.print(fan.sys.ObjUtil.coerce(bool,fan.sys.Obj.$type.toNullable()));
  return;
}
fan.util.JsonOutStream.prototype.writeJsonNull = function()
{
  this.print("null");
  return;
}
fan.util.JsonOutStream.prototype.writeJsonPair = function(key,val)
{
  this.writeJsonStr(key);
  this.writeChar(fan.util.JsonToken.m_colon);
  this.writeJson(val);
  return;
}
fan.util.JsonOutStream.prototype.m_escapeUnicode = false;
fan.util.$pod = fan.sys.Pod.$add('util');
with (fan.util.$pod)
{
  fan.util.CsvInStream.$type = $at('CsvInStream','sys::InStream',[],{'sys::Js':""},8192);
  fan.util.Macro.$type = $at('Macro','sys::Obj',[],{'sys::Js':""},8194);
  fan.util.FileLoc.$type = $at('FileLoc','sys::Obj',[],{'sys::Js':""},8194);
  fan.util.CsvOutStream.$type = $at('CsvOutStream','sys::OutStream',[],{'sys::Js':""},8192);
  fan.util.JsonInStream.$type = $at('JsonInStream','sys::InStream',[],{'sys::Js':""},8192);
  fan.util.JsonToken.$type = $at('JsonToken','sys::Obj',[],{'sys::Js':""},128);
  fan.util.JsonOutStream.$type = $at('JsonOutStream','sys::OutStream',[],{'sys::Js':""},8192);
  fan.util.CsvInStream.$type.$af('delimiter',73728,'sys::Int',{}).$af('trim',73728,'sys::Bool',{}).$af('rowWidth',67584,'sys::Int',{}).$af('line',67584,'sys::Str?',{}).$af('pos',67584,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false)]),{}).$am('readAllRows',8192,'sys::Str[][]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('eachRow',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str[]->sys::Void|',false)]),{}).$am('readRow',270336,'sys::Str[]?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseCell',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseNonQuotedCell',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseQuotedCell',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.util.Macro.$type.$af('pattern',73730,'sys::Str',{}).$af('norm',100354,'sys::Int',{}).$af('inMacro',100354,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false)]),{}).$am('apply',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('resolve','|sys::Str->sys::Str|',false)]),{}).$am('keys',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.util.FileLoc.$type.$af('unknown',106498,'util::FileLoc',{}).$af('inputs',106498,'util::FileLoc',{}).$af('synthetic',106498,'util::FileLoc',{}).$af('file',73730,'sys::Str',{}).$af('line',73730,'sys::Int',{}).$af('col',73730,'sys::Int',{}).$am('makeFile',40966,'util::FileLoc?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('file','sys::File',false),new fan.sys.Param('line','sys::Int',true),new fan.sys.Param('col','sys::Int',true)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('file','sys::Str',false),new fan.sys.Param('line','sys::Int',true),new fan.sys.Param('col','sys::Int',true)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.util.CsvOutStream.$type.$af('delimiter',73728,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false)]),{}).$am('writeRow',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('row','sys::Str[]',false)]),{}).$am('writeCell',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cell','sys::Str',false)]),{}).$am('isQuoteRequired',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cell','sys::Str',false)]),{});
  fan.util.JsonInStream.$type.$af('cur',67584,'sys::Int',{}).$af('pos',67584,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false)]),{}).$am('readJson',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseObj',2048,'[sys::Str:sys::Obj?]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parsePair',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','[sys::Str:sys::Obj?]',false)]),{}).$am('parseVal',2048,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseNum',2048,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseStr',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('escape',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseArray',2048,'sys::List',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('skipWhitespace',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('expect',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tt','sys::Int',false)]),{}).$am('maybe',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tt','sys::Int',false)]),{}).$am('consume',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('err',2048,'sys::Err',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false)]),{});
  fan.util.JsonToken.$type.$af('objectStart',98434,'sys::Int',{}).$af('objectEnd',98434,'sys::Int',{}).$af('colon',98434,'sys::Int',{}).$af('arrayStart',98434,'sys::Int',{}).$af('arrayEnd',98434,'sys::Int',{}).$af('comma',98434,'sys::Int',{}).$af('quote',98434,'sys::Int',{}).$af('grave',98434,'sys::Int',{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.util.JsonOutStream.$type.$af('escapeUnicode',73728,'sys::Bool',{}).$am('writeJsonToStr',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false)]),{}).$am('writeJson',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('writeJsonObj',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('writeJsonMap',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('map','sys::Map',false)]),{}).$am('writeJsonList',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('array','sys::Obj?[]',false)]),{}).$am('writeJsonStr',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false)]),{}).$am('writeJsonNum',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('num','sys::Num',false)]),{}).$am('writeJsonBool',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bool','sys::Bool',false)]),{}).$am('writeJsonNull',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeJsonPair',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "util");
  m_meta.set("pod.version", "1.0.78.3106");
  m_version = fan.sys.Version.fromStr("1.0.78.3106");
  m_meta.set("pod.depends", "sys 1.0;concurrent 1.0");
  m_meta.set("pod.summary", "Utilities");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:23:03-05:00 New_York");
  m_meta.set("build.tsKey", "221115162303");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("pod.docSrc", "true");
  m_meta.set("license.name", "Academic Free License 3.0");
  m_meta.set("org.name", "Fantom");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "Fantom Core");
  m_meta.set("proj.uri", "https://fantom.org/");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://fantom.org/");
  m_meta.set("pod.native.java", "true");
  m_meta.set("vcs.uri", "https://github.com/fantom-lang/fantom");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("vcs.name", "Git");
  m_meta.set("pod.native.js", "false");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
fan.util.$clos$_u0 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["row","sys::Str[]","false"]);
fan.util.$clos$_u8 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["key","sys::Str","false"]);
fan.util.$clos$_u10 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["cell","sys::Str","false","i","sys::Int","false"]);
fan.util.$clos$_u11 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["ch","sys::Int","false"]);
fan.util.$clos$_u12 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["ch","sys::Int","false"]);
fan.util.$clos$_u13 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Str:sys::Obj?]","false"]);
fan.util.$clos$_u14 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,[]);
fan.util.$clos$_u18 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["f","sys::Field","false","i","sys::Int","false"]);
fan.util.$clos$_u19 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["val","sys::Obj?","false","key","sys::Obj?","false"]);
fan.util.$clos$_u20 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["item","sys::Obj?","false"]);
fan.util.$clos$_u21 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["$char","sys::Int","false"]);
fan.util.Macro.static$init();
fan.util.FileLoc.static$init();
fan.util.JsonToken.static$init();
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.web = exports;
} else {
  fan.web = root.fan.web = {};
}

fan.web.WebOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.web.WebOutStream.prototype.$ctor = function()
{
  fan.sys.OutStream.prototype.$ctor.call(this);
  var $this = this;
}
fan.web.WebOutStream.prototype.$typeof = function() { return fan.web.WebOutStream.$type; }
fan.web.WebOutStream.make = function(out) {
  var self = new fan.web.WebOutStream();
  fan.web.WebOutStream.make$(self,out);
  return self;
  }
fan.web.WebOutStream.make$ = function(self,out)
{
  fan.sys.OutStream.make$(self,out);
  return;
}
fan.web.WebOutStream.prototype.w = function(obj)
{
  this.writeChars((function($this) { if (obj == null) return "null"; return fan.sys.ObjUtil.toStr(obj); })(this));
  return this;
}
fan.web.WebOutStream.prototype.tab = function(numSpaces)
{
  if (numSpaces === undefined) numSpaces = 2;
  this.writeChars(fan.sys.Str.spaces(numSpaces));
  return this;
}
fan.web.WebOutStream.prototype.nl = function()
{
  this.writeChar(10);
  return this;
}
fan.web.WebOutStream.prototype.prolog = function()
{
  this.writeChars(fan.sys.Str.plus(fan.sys.Str.plus("<?xml version='1.0' encoding='",this.charset()),"'?>\n"));
  return this;
}
fan.web.WebOutStream.prototype.tag = function(elemName,attrs,empty)
{
  if (attrs === undefined) attrs = null;
  if (empty === undefined) empty = false;
  this.writeChar(60);
  this.writeChars(elemName);
  if (attrs != null)
  {
    fan.sys.ObjUtil.coerce(this.writeChar(32),fan.web.WebOutStream.$type).writeChars(fan.sys.ObjUtil.coerce(attrs,fan.sys.Str.$type));
  }
  ;
  if (empty)
  {
    this.writeChars(" /");
  }
  ;
  this.writeChar(62);
  return this;
}
fan.web.WebOutStream.prototype.tagEnd = function(elemName)
{
  fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(this.writeChars("</"),fan.web.WebOutStream.$type).writeChars(elemName),fan.web.WebOutStream.$type).writeChar(62);
  return this;
}
fan.web.WebOutStream.prototype.docType = function()
{
  this.writeChars("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n");
  this.writeChars(" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n");
  return this;
}
fan.web.WebOutStream.prototype.docType5 = function()
{
  this.writeChars("<!DOCTYPE html>\n");
  return this;
}
fan.web.WebOutStream.prototype.html = function()
{
  return this.tag("html","xmlns='http://www.w3.org/1999/xhtml'").nl();
}
fan.web.WebOutStream.prototype.htmlEnd = function()
{
  return this.tagEnd("html").nl();
}
fan.web.WebOutStream.prototype.head = function()
{
  return this.tag("head").nl();
}
fan.web.WebOutStream.prototype.headEnd = function()
{
  return this.tagEnd("head").nl();
}
fan.web.WebOutStream.prototype.title = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("title",attrs);
}
fan.web.WebOutStream.prototype.titleEnd = function()
{
  return this.tagEnd("title").nl();
}
fan.web.WebOutStream.prototype.includeCss = function(href)
{
  if (this.m_cssUris == null)
  {
    this.m_cssUris = fan.sys.List.make(fan.sys.Uri.$type);
  }
  ;
  if (!this.m_cssUris.contains(href))
  {
    var attrs = fan.sys.Str.plus(fan.sys.Str.plus("rel='stylesheet' type='text/css' href='",fan.sys.Str.toXml(href.encode())),"'");
    this.tag("link",attrs,true).nl();
    this.m_cssUris.add(href);
  }
  ;
  return this;
}
fan.web.WebOutStream.prototype.includeJs = function(href)
{
  if (href === undefined) href = null;
  if (this.m_jsUris == null)
  {
    this.m_jsUris = fan.sys.List.make(fan.sys.Uri.$type);
  }
  ;
  if (!this.m_jsUris.contains(fan.sys.ObjUtil.coerce(href,fan.sys.Uri.$type)))
  {
    this.tag("script",fan.sys.Str.plus(fan.sys.Str.plus("type='text/javascript' src='",fan.sys.Str.toXml(href.encode())),"'"));
    this.tagEnd("script").nl();
    this.m_jsUris.add(fan.sys.ObjUtil.coerce(href,fan.sys.Uri.$type));
  }
  ;
  return this;
}
fan.web.WebOutStream.prototype.initJs = function(env)
{
  var $this = this;
  this.w("<script type='text/javascript'>").nl();
  this.w("var fan\$env = {").nl();
  env.keys().each(fan.sys.Func.make$closure(
    fan.web.$clos$_u2,
    function(n,i)
    {
      var v = env.get(n);
      $this.w(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("  ",fan.sys.Str.toCode(n)),":"),fan.sys.Str.toCode(v)));
      if (fan.sys.ObjUtil.compareLT(i,fan.sys.Int.minus(env.keys().size(),1)))
      {
        $this.w(",");
      }
      ;
      $this.nl();
      return;
    }));
  this.w("}").nl();
  var main = env.get("main");
  if (main != null)
  {
    this.w(fan.sys.Str.plus(fan.sys.Str.plus("window.addEventListener('load', function() {\n  fan.sys.Env.\$invokeMain('",main),"');\n}, false);")).nl();
  }
  ;
  this.w("</script>").nl();
  return this;
}
fan.web.WebOutStream.prototype.atom = function(href,attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag(fan.sys.Str.plus(fan.sys.Str.plus("link rel='alternate' type='application/atom+xml' href='",fan.sys.Str.toXml(href.encode())),"'"),attrs,true).nl();
}
fan.web.WebOutStream.prototype.rss = function(href,attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag(fan.sys.Str.plus(fan.sys.Str.plus("link rel='alternate' type='application/rss+xml' href='",fan.sys.Str.toXml(href.encode())),"'"),attrs,true).nl();
}
fan.web.WebOutStream.prototype.favIcon = function(href,attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag(fan.sys.Str.plus(fan.sys.Str.plus("link rel='icon' href='",fan.sys.Str.toXml(href.encode())),"'"),attrs,true).nl();
}
fan.web.WebOutStream.prototype.style = function(attrs)
{
  if (attrs === undefined) attrs = "type='text/css'";
  return this.tag("style",attrs).nl();
}
fan.web.WebOutStream.prototype.styleEnd = function()
{
  return this.tagEnd("style").nl();
}
fan.web.WebOutStream.prototype.script = function(attrs)
{
  if (attrs === undefined) attrs = "type='text/javascript'";
  return this.tag("script",attrs).nl();
}
fan.web.WebOutStream.prototype.scriptEnd = function()
{
  return this.tagEnd("script").nl();
}
fan.web.WebOutStream.prototype.body = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("body",attrs).nl();
}
fan.web.WebOutStream.prototype.bodyEnd = function()
{
  return this.tagEnd("body").nl();
}
fan.web.WebOutStream.prototype.h1 = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("h1",attrs);
}
fan.web.WebOutStream.prototype.h1End = function()
{
  return this.tagEnd("h1").nl();
}
fan.web.WebOutStream.prototype.h2 = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("h2",attrs);
}
fan.web.WebOutStream.prototype.h2End = function()
{
  return this.tagEnd("h2").nl();
}
fan.web.WebOutStream.prototype.h3 = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("h3",attrs);
}
fan.web.WebOutStream.prototype.h3End = function()
{
  return this.tagEnd("h3").nl();
}
fan.web.WebOutStream.prototype.h4 = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("h4",attrs);
}
fan.web.WebOutStream.prototype.h4End = function()
{
  return this.tagEnd("h4").nl();
}
fan.web.WebOutStream.prototype.h5 = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("h5",attrs);
}
fan.web.WebOutStream.prototype.h5End = function()
{
  return this.tagEnd("h5").nl();
}
fan.web.WebOutStream.prototype.h6 = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("h6",attrs);
}
fan.web.WebOutStream.prototype.h6End = function()
{
  return this.tagEnd("h6").nl();
}
fan.web.WebOutStream.prototype.div = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("div",attrs).nl();
}
fan.web.WebOutStream.prototype.divEnd = function()
{
  return this.tagEnd("div").nl();
}
fan.web.WebOutStream.prototype.span = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("span",attrs);
}
fan.web.WebOutStream.prototype.spanEnd = function()
{
  return this.tagEnd("span");
}
fan.web.WebOutStream.prototype.p = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("p",attrs).nl();
}
fan.web.WebOutStream.prototype.pEnd = function()
{
  return this.tagEnd("p").nl();
}
fan.web.WebOutStream.prototype.b = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("b",attrs);
}
fan.web.WebOutStream.prototype.bEnd = function()
{
  return this.tagEnd("b");
}
fan.web.WebOutStream.prototype.i = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("i",attrs);
}
fan.web.WebOutStream.prototype.iEnd = function()
{
  return this.tagEnd("i");
}
fan.web.WebOutStream.prototype.em = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("em",attrs);
}
fan.web.WebOutStream.prototype.emEnd = function()
{
  return this.tagEnd("em");
}
fan.web.WebOutStream.prototype.pre = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("pre",attrs);
}
fan.web.WebOutStream.prototype.preEnd = function()
{
  return this.tagEnd("pre").nl();
}
fan.web.WebOutStream.prototype.code = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("code",attrs);
}
fan.web.WebOutStream.prototype.codeEnd = function()
{
  return this.tagEnd("code");
}
fan.web.WebOutStream.prototype.hr = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("hr",attrs,true).nl();
}
fan.web.WebOutStream.prototype.br = function()
{
  return this.tag("br",null,true);
}
fan.web.WebOutStream.prototype.a = function(href,attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag(fan.sys.Str.plus(fan.sys.Str.plus("a href='",fan.sys.Str.toXml(href.encode())),"'"),attrs);
}
fan.web.WebOutStream.prototype.aEnd = function()
{
  return this.tagEnd("a");
}
fan.web.WebOutStream.prototype.img = function(src,attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag(fan.sys.Str.plus(fan.sys.Str.plus("img src='",fan.sys.Str.toXml(src.encode())),"'"),attrs,true);
}
fan.web.WebOutStream.prototype.table = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("table",attrs).nl();
}
fan.web.WebOutStream.prototype.tableEnd = function()
{
  return this.tagEnd("table").nl();
}
fan.web.WebOutStream.prototype.thead = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("thead",attrs).nl();
}
fan.web.WebOutStream.prototype.theadEnd = function()
{
  return this.tagEnd("thead").nl();
}
fan.web.WebOutStream.prototype.tbody = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("tbody",attrs).nl();
}
fan.web.WebOutStream.prototype.tbodyEnd = function()
{
  return this.tagEnd("tbody").nl();
}
fan.web.WebOutStream.prototype.tfoot = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("tfoot",attrs).nl();
}
fan.web.WebOutStream.prototype.tfootEnd = function()
{
  return this.tagEnd("tfoot").nl();
}
fan.web.WebOutStream.prototype.tr = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("tr",attrs).nl();
}
fan.web.WebOutStream.prototype.trEnd = function()
{
  return this.tagEnd("tr").nl();
}
fan.web.WebOutStream.prototype.th = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("th",attrs);
}
fan.web.WebOutStream.prototype.thEnd = function()
{
  return this.tagEnd("th").nl();
}
fan.web.WebOutStream.prototype.td = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("td",attrs);
}
fan.web.WebOutStream.prototype.tdEnd = function()
{
  return this.tagEnd("td").nl();
}
fan.web.WebOutStream.prototype.ul = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("ul",attrs).nl();
}
fan.web.WebOutStream.prototype.ulEnd = function()
{
  return this.tagEnd("ul").nl();
}
fan.web.WebOutStream.prototype.ol = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("ol",attrs).nl();
}
fan.web.WebOutStream.prototype.olEnd = function()
{
  return this.tagEnd("ol").nl();
}
fan.web.WebOutStream.prototype.li = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("li",attrs);
}
fan.web.WebOutStream.prototype.liEnd = function()
{
  return this.tagEnd("li");
}
fan.web.WebOutStream.prototype.dl = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("dl",attrs).nl();
}
fan.web.WebOutStream.prototype.dlEnd = function()
{
  return this.tagEnd("dl").nl();
}
fan.web.WebOutStream.prototype.dt = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("dt",attrs).nl();
}
fan.web.WebOutStream.prototype.dtEnd = function()
{
  return this.tagEnd("dt").nl();
}
fan.web.WebOutStream.prototype.dd = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("dd",attrs).nl();
}
fan.web.WebOutStream.prototype.ddEnd = function()
{
  return this.tagEnd("dd").nl();
}
fan.web.WebOutStream.prototype.form = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("form",attrs).nl();
}
fan.web.WebOutStream.prototype.formEnd = function()
{
  return this.tagEnd("form").nl();
}
fan.web.WebOutStream.prototype.label = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("label",attrs).nl();
}
fan.web.WebOutStream.prototype.labelEnd = function()
{
  return this.tagEnd("label").nl();
}
fan.web.WebOutStream.prototype.input = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input",attrs,true);
}
fan.web.WebOutStream.prototype.textField = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input type='text'",attrs,true);
}
fan.web.WebOutStream.prototype.password = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input type='password'",attrs,true);
}
fan.web.WebOutStream.prototype.hidden = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input type='hidden'",attrs,true);
}
fan.web.WebOutStream.prototype.button = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input type='button'",attrs,true);
}
fan.web.WebOutStream.prototype.checkbox = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input type='checkbox'",attrs,true);
}
fan.web.WebOutStream.prototype.radio = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input type='radio'",attrs,true);
}
fan.web.WebOutStream.prototype.submit = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("input type='submit'",attrs,true);
}
fan.web.WebOutStream.prototype.select = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("select",attrs).nl();
}
fan.web.WebOutStream.prototype.selectEnd = function()
{
  return this.tagEnd("select").nl();
}
fan.web.WebOutStream.prototype.option = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("option",attrs);
}
fan.web.WebOutStream.prototype.optionEnd = function()
{
  return this.tagEnd("option").nl();
}
fan.web.WebOutStream.prototype.textArea = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("textarea",attrs).nl();
}
fan.web.WebOutStream.prototype.textAreaEnd = function()
{
  return this.tagEnd("textarea").nl();
}
fan.web.WebOutStream.prototype.header = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("header",attrs).nl();
}
fan.web.WebOutStream.prototype.headerEnd = function()
{
  return this.tagEnd("header").nl();
}
fan.web.WebOutStream.prototype.footer = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("footer",attrs).nl();
}
fan.web.WebOutStream.prototype.footerEnd = function()
{
  return this.tagEnd("footer").nl();
}
fan.web.WebOutStream.prototype.main = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("main",attrs).nl();
}
fan.web.WebOutStream.prototype.mainEnd = function()
{
  return this.tagEnd("main").nl();
}
fan.web.WebOutStream.prototype.nav = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("nav",attrs).nl();
}
fan.web.WebOutStream.prototype.navEnd = function()
{
  return this.tagEnd("nav").nl();
}
fan.web.WebOutStream.prototype.section = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("section",attrs).nl();
}
fan.web.WebOutStream.prototype.sectionEnd = function()
{
  return this.tagEnd("section").nl();
}
fan.web.WebOutStream.prototype.article = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("article",attrs).nl();
}
fan.web.WebOutStream.prototype.articleEnd = function()
{
  return this.tagEnd("article").nl();
}
fan.web.WebOutStream.prototype.aside = function(attrs)
{
  if (attrs === undefined) attrs = null;
  return this.tag("aside",attrs).nl();
}
fan.web.WebOutStream.prototype.asideEnd = function()
{
  return this.tagEnd("aside").nl();
}
fan.web.WebOutStream.prototype.esc = function(obj)
{
  if (obj == null)
  {
    return this.w("null");
  }
  ;
  return fan.sys.ObjUtil.coerce(this.writeXml(fan.sys.ObjUtil.toStr(obj),fan.sys.OutStream.m_xmlEscQuotes),fan.web.WebOutStream.$type);
}
fan.web.WebOutStream.prototype.cssUris = function()
{
  return this.m_cssUris;
}
fan.web.WebOutStream.prototype.cssUris$ = function(it)
{
  this.m_cssUris = it;
  return;
}
fan.web.WebOutStream.prototype.jsUris = function()
{
  return this.m_jsUris;
}
fan.web.WebOutStream.prototype.jsUris$ = function(it)
{
  this.m_jsUris = it;
  return;
}
fan.web.WebOutStream.prototype.m_cssUris = null;
fan.web.WebOutStream.prototype.m_jsUris = null;
fan.web.WebUtil = fan.sys.Obj.$extend(fan.sys.Obj);
fan.web.WebUtil.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.web.WebUtil.prototype.$typeof = function() { return fan.web.WebUtil.$type; }
fan.web.WebUtil.isToken = function(s)
{
  var $this = this;
  if (fan.sys.Str.isEmpty(s))
  {
    return false;
  }
  ;
  return fan.sys.Str.all(s,fan.sys.Func.make$closure(
    fan.web.$clos$_u3,
    function(c)
    {
      return fan.web.WebUtil.isTokenChar(c);
    }));
}
fan.web.WebUtil.isTokenChar = function(c)
{
  return (fan.sys.ObjUtil.compareLT(c,127) && fan.web.WebUtil.m_tokenChars.get(c));
}
fan.web.WebUtil.toQuotedStr = function(s)
{
  var $this = this;
  var buf = fan.sys.StrBuf.make();
  buf.addChar(34);
  fan.sys.Str.each(s,fan.sys.Func.make$closure(
    fan.web.$clos$_u4,
    function(c)
    {
      if ((fan.sys.ObjUtil.compareLT(c,32) || fan.sys.ObjUtil.compareGT(c,126)))
      {
        throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid quoted str chars: ",s));
      }
      ;
      if (fan.sys.ObjUtil.equals(c,34))
      {
        buf.addChar(92);
      }
      ;
      buf.addChar(c);
      return;
    }));
  buf.addChar(34);
  return buf.toStr();
}
fan.web.WebUtil.fromQuotedStr = function(s)
{
  if ((fan.sys.ObjUtil.compareLT(fan.sys.Str.size(s),2) || fan.sys.ObjUtil.compareNE(fan.sys.Str.get(s,0),34) || fan.sys.ObjUtil.compareNE(fan.sys.Str.get(s,-1),34)))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Not quoted str: ",s));
  }
  ;
  return fan.sys.Str.replace(fan.sys.Str.getRange(s,fan.sys.Range.make(1,-2)),"\\\"","\"");
}
fan.web.WebUtil.parseList = function(s)
{
  return fan.sys.Str.split(s,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable()));
}
fan.web.WebUtil.parseHeaders = function($in)
{
  return fan.web.WebUtil.doParseHeaders($in,null);
}
fan.web.WebUtil.doParseHeaders = function($in,cookies)
{
  var headers = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  headers.caseInsensitive$(true);
  var last = null;
  while (true)
  {
    var peek = $in.peek();
    if (fan.sys.ObjUtil.equals(peek,fan.web.WebUtil.m_CR))
    {
      break;
    }
    ;
    if ((fan.sys.Int.isSpace(fan.sys.ObjUtil.coerce(peek,fan.sys.Int.$type)) && last != null))
    {
      (function($this) { var $_u7 = headers; var $_u8 = fan.sys.ObjUtil.coerce(last,fan.sys.Str.$type); var $_u5 = fan.sys.Str.plus(headers.get(fan.sys.ObjUtil.coerce(last,fan.sys.Str.$type)),fan.sys.Str.plus(" ",fan.sys.Str.trim(fan.web.WebUtil.readLine($in)))); $_u7.set($_u8,$_u5); return $_u5; })(this);
      continue;
    }
    ;
    var key = fan.sys.Str.trim(fan.web.WebUtil.token($in,58));
    var val = fan.sys.Str.trim(fan.web.WebUtil.token($in,fan.web.WebUtil.m_CR));
    if (fan.sys.ObjUtil.compareNE($in.read(),fan.web.WebUtil.m_LF))
    {
      throw fan.sys.ParseErr.make("Invalid CRLF line ending");
    }
    ;
    if ((fan.sys.Str.equalsIgnoreCase(key,"Set-Cookie") && cookies != null))
    {
      var cookie = fan.web.Cookie.fromStr(val,false);
      if (cookie != null)
      {
        cookies.add(fan.sys.ObjUtil.coerce(cookie,fan.web.Cookie.$type));
      }
      ;
    }
    ;
    var dup = headers.get(key);
    if (dup == null)
    {
      headers.set(key,val);
    }
    else
    {
      headers.set(key,fan.sys.Str.plus(fan.sys.Str.plus(dup,","),val));
    }
    ;
    last = key;
  }
  ;
  if ((fan.sys.ObjUtil.compareNE($in.read(),fan.web.WebUtil.m_CR) || fan.sys.ObjUtil.compareNE($in.read(),fan.web.WebUtil.m_LF)))
  {
    throw fan.sys.ParseErr.make("Invalid CRLF headers ending");
  }
  ;
  return headers;
}
fan.web.WebUtil.token = function($in,sep)
{
  var $this = this;
  var tok = $in.readStrToken(fan.sys.ObjUtil.coerce(fan.web.WebUtil.m_maxTokenSize,fan.sys.Int.$type.toNullable()),fan.sys.Func.make$closure(
    fan.web.$clos$_u9,
    function(ch)
    {
      return fan.sys.ObjUtil.equals(ch,sep);
    }));
  if (tok == null)
  {
    throw fan.sys.IOErr.make("Unexpected end of stream");
  }
  ;
  if (fan.sys.ObjUtil.compareGE(fan.sys.Str.size(tok),fan.web.WebUtil.m_maxTokenSize))
  {
    throw fan.sys.ParseErr.make("Token too big");
  }
  ;
  $in.read();
  return fan.sys.ObjUtil.coerce(tok,fan.sys.Str.$type);
}
fan.web.WebUtil.parseQVals = function(s)
{
  var $this = this;
  var map = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Float"));
  map.def$(fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Float.$type.toNullable()));
  fan.sys.Str.split(s,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable())).each(fan.sys.Func.make$closure(
    fan.web.$clos$_u10,
    function(tok)
    {
      if (fan.sys.Str.isEmpty(tok))
      {
        return;
      }
      ;
      var $name = tok;
      var q = fan.sys.Float.make(1.0);
      var x = fan.sys.Str.index(tok,";");
      if (x != null)
      {
        $name = fan.sys.Str.trim(fan.sys.Str.getRange(tok,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(x,fan.sys.Int.$type),true)));
        var attrs = fan.sys.Str.trim(fan.sys.Str.getRange(tok,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(x,fan.sys.Int.$type),1),-1)));
        var qattr = fan.sys.Str.index(attrs,"q=");
        if (qattr != null)
        {
          q = fan.sys.ObjUtil.coerce((function($this) { var $_u11 = fan.sys.Float.fromStr(fan.sys.Str.getRange(attrs,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(qattr,fan.sys.Int.$type),2),-1)),false); if ($_u11 != null) return $_u11; return fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Float.$type.toNullable()); })($this),fan.sys.Float.$type);
        }
        ;
      }
      ;
      map.set($name,fan.sys.ObjUtil.coerce(q,fan.sys.Obj.$type.toNullable()));
      return;
    }));
  return map;
}
fan.web.WebUtil.writeHeaders = function(out,headers)
{
  var $this = this;
  headers.each(fan.sys.Func.make$closure(
    fan.web.$clos$_u12,
    function(v,k)
    {
      if (fan.sys.Str.containsChar(v,10))
      {
        v = fan.sys.Str.splitLines(v).join("\n ");
      }
      ;
      out.print(k).print(": ").print(v).print("\r\n");
      return;
    }));
  return;
}
fan.web.WebUtil.headersToCharset = function(headers)
{
  var ct = headers.get("Content-Type");
  if (ct != null)
  {
    var mime = fan.sys.MimeType.fromStr(fan.sys.ObjUtil.coerce(ct,fan.sys.Str.$type),false);
    if (mime != null)
    {
      return mime.charset();
    }
    ;
  }
  ;
  return fan.sys.Charset.utf8();
}
fan.web.WebUtil.makeContentInStream = function(headers,$in)
{
  $in = fan.sys.ObjUtil.coerce(fan.web.WebUtil.doMakeContentInStream(headers,$in),fan.sys.InStream.$type);
  var ce = headers.get("Content-Encoding");
  if (ce != null)
  {
    ce = fan.sys.Str.lower(ce);
    var $_u13 = ce;
    if (fan.sys.ObjUtil.equals($_u13,"gzip"))
    {
      return fan.sys.Zip.gzipInStream($in);
    }
    else if (fan.sys.ObjUtil.equals($_u13,"deflate"))
    {
      return fan.sys.Zip.deflateInStream($in);
    }
    else
    {
      throw fan.sys.IOErr.make(fan.sys.Str.plus("Unsupported Content-Encoding: ",ce));
    }
    ;
  }
  ;
  return $in;
}
fan.web.WebUtil.doMakeContentInStream = function(headers,$in)
{
  var $this = this;
  var cs = fan.web.WebUtil.headersToCharset(headers);
  var len = headers.get("Content-Length");
  if (len != null)
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeFixedInStream($in,fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(len),fan.sys.Int.$type)),fan.sys.Func.make$closure(
      fan.web.$clos$_u14,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.InStream.$type);
  }
  ;
  if (fan.sys.Str.contains(fan.sys.Str.lower(headers.get("Transfer-Encoding","")),"chunked"))
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeChunkedInStream($in),fan.sys.Func.make$closure(
      fan.web.$clos$_u14,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.InStream.$type);
  }
  ;
  return $in;
}
fan.web.WebUtil.makeContentOutStream = function(headers,out)
{
  var $this = this;
  var cs = fan.web.WebUtil.headersToCharset(headers);
  var len = headers.get("Content-Length");
  if (len != null)
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeFixedOutStream(out,fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(len),fan.sys.Int.$type)),fan.sys.Func.make$closure(
      fan.web.$clos$_u15,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.OutStream.$type);
  }
  ;
  var ct = headers.get("Content-Type");
  if (ct != null)
  {
    headers.set("Transfer-Encoding","chunked");
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeChunkedOutStream(out),fan.sys.Func.make$closure(
      fan.web.$clos$_u15,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.OutStream.$type);
  }
  ;
  return null;
}
fan.web.WebUtil.makeFixedInStream = function($in,fixed)
{
  return fan.web.ChunkInStream.make($in,fan.sys.ObjUtil.coerce(fixed,fan.sys.Int.$type.toNullable()));
}
fan.web.WebUtil.makeChunkedInStream = function($in)
{
  return fan.web.ChunkInStream.make($in,null);
}
fan.web.WebUtil.makeFixedOutStream = function(out,fixed)
{
  return fan.web.FixedOutStream.make(out,fixed);
}
fan.web.WebUtil.makeChunkedOutStream = function(out)
{
  return fan.web.ChunkOutStream.make(out);
}
fan.web.WebUtil.readLine = function($in)
{
  var max = 65536;
  var line = $in.readLine(fan.sys.ObjUtil.coerce(max,fan.sys.Int.$type.toNullable()));
  if (line == null)
  {
    throw fan.sys.IOErr.make("Unexpected end of stream");
  }
  ;
  if (fan.sys.ObjUtil.equals(fan.sys.Str.size(line),max))
  {
    throw fan.sys.IOErr.make("Max request line");
  }
  ;
  return fan.sys.ObjUtil.coerce(line,fan.sys.Str.$type);
}
fan.web.WebUtil.parseMultiPart = function($in,boundary,cb)
{
  boundary = fan.sys.Str.plus("--",boundary);
  var line = fan.web.WebUtil.readLine($in);
  if (fan.sys.ObjUtil.equals(line,fan.sys.Str.plus(boundary,"--")))
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.compareNE(line,boundary))
  {
    throw fan.sys.IOErr.make(fan.sys.Str.plus("Expecting boundry line ",fan.sys.Str.toCode(boundary)));
  }
  ;
  while (true)
  {
    var headers = fan.web.WebUtil.parseHeaders($in);
    var partIn = fan.web.MultiPartInStream.make($in,boundary);
    cb.call(headers,partIn);
    if (partIn.m_endOfParts)
    {
      break;
    }
    ;
  }
  ;
  return;
}
fan.web.WebUtil.jsMain = function(out,main,env)
{
  if (env === undefined) env = null;
  var $this = this;
  var envStr = fan.sys.StrBuf.make();
  if (fan.sys.ObjUtil.compareGT((function($this) { var $_u16 = env; if ($_u16 == null) return null; return $_u16.size(); })(this),0))
  {
    envStr.add("var env = fan.sys.Map.make(fan.sys.Str.\$type, fan.sys.Str.\$type);\n");
    envStr.add("  env.caseInsensitive\$(true);\n");
    env.each(fan.sys.Func.make$closure(
      fan.web.$clos$_u12,
      function(v,k)
      {
        envStr.add("  ");
        v = fan.sys.Str.toCode(v,fan.sys.ObjUtil.coerce(39,fan.sys.Int.$type.toNullable()));
        if (fan.sys.ObjUtil.equals(k,"sys.uriPodBase"))
        {
          envStr.add(fan.sys.Str.plus(fan.sys.Str.plus("fan.fwt.WidgetPeer.\$uriPodBase = ",v),";\n"));
        }
        else
        {
          envStr.add(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("env.set('",k),"', "),v),");\n"));
        }
        ;
        return;
      }));
    envStr.add("  fan.sys.Env.cur().\$setVars(env);");
  }
  ;
  out.printLine(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("<script type='text/javascript'>\nwindow.addEventListener('load', function()\n{\n  // inject env vars\n  ",envStr.toStr()),"\n\n  // find main\n  var qname = '"),main),"';\n  var dot = qname.indexOf('.');\n  if (dot < 0) qname += '.main';\n  var main = fan.sys.Slot.findMethod(qname);\n\n  // invoke main\n  if (main.isStatic()) main.call();\n  else main.callOn(main.parent().make());\n}, false);\n</script>"));
  return;
}
fan.web.WebUtil.make = function() {
  var self = new fan.web.WebUtil();
  fan.web.WebUtil.make$(self);
  return self;
  }
fan.web.WebUtil.make$ = function(self)
{
  return;
}
fan.web.WebUtil.static$init = function()
{
  if (true)
  {
    var m = fan.sys.List.make(fan.sys.Bool.$type);
    for (var i = 0; fan.sys.ObjUtil.compareLT(i,127); i = fan.sys.Int.increment(i))
    {
      m.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(i,32),fan.sys.Obj.$type.toNullable()));
    }
    ;
    m.set(40,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(41,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(60,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(62,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(64,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(44,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(59,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(58,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(92,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(34,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(47,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(91,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(93,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(63,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(61,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(123,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(125,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(32,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(9,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    fan.web.WebUtil.m_tokenChars = fan.sys.ObjUtil.coerce((function($this) { var $_u17 = m; if ($_u17 == null) return null; return fan.sys.ObjUtil.toImmutable($_u17); })(this),fan.sys.Type.find("sys::Bool[]"));
  }
  ;
  fan.web.WebUtil.m_CR = 13;
  fan.web.WebUtil.m_LF = 10;
  fan.web.WebUtil.m_HT = 9;
  fan.web.WebUtil.m_SP = 32;
  fan.web.WebUtil.m_maxTokenSize = 16384;
  return;
}
fan.web.WebUtil.m_tokenChars = null;
fan.web.WebUtil.m_CR = 0;
fan.web.WebUtil.m_LF = 0;
fan.web.WebUtil.m_HT = 0;
fan.web.WebUtil.m_SP = 0;
fan.web.WebUtil.m_maxTokenSize = 0;
fan.web.ChunkInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.web.ChunkInStream.prototype.$ctor = function()
{
  fan.sys.InStream.prototype.$ctor.call(this);
  var $this = this;
}
fan.web.ChunkInStream.prototype.$typeof = function() { return fan.web.ChunkInStream.$type; }
fan.web.ChunkInStream.make = function($in,fixed) {
  var self = new fan.web.ChunkInStream();
  fan.web.ChunkInStream.make$(self,$in,fixed);
  return self;
  }
fan.web.ChunkInStream.make$ = function(self,$in,fixed)
{
  if (fixed === undefined) fixed = null;
  fan.sys.InStream.make$(self,null);
  self.m_$in = $in;
  self.m_noMoreChunks = fixed != null;
  self.m_chunkRem = fan.sys.ObjUtil.coerce((function($this) { if (fixed != null) return fixed; return fan.sys.ObjUtil.coerce(-1,fan.sys.Int.$type.toNullable()); })(self),fan.sys.Int.$type);
  return;
}
fan.web.ChunkInStream.prototype.read = function()
{
  if ((this.m_pushback != null && !this.m_pushback.isEmpty()))
  {
    return this.m_pushback.pop();
  }
  ;
  if (!this.checkChunk())
  {
    return null;
  }
  ;
  this.m_chunkRem = fan.sys.Int.minus(this.m_chunkRem,1);
  return this.m_$in.read();
}
fan.web.ChunkInStream.prototype.readBuf = function(buf,n)
{
  if ((this.m_pushback != null && !this.m_pushback.isEmpty() && fan.sys.ObjUtil.compareGT(n,0)))
  {
    buf.write(fan.sys.ObjUtil.coerce(this.m_pushback.pop(),fan.sys.Int.$type));
    return fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable());
  }
  ;
  if (!this.checkChunk())
  {
    return null;
  }
  ;
  var numRead = this.m_$in.readBuf(buf,fan.sys.Int.min(this.m_chunkRem,n));
  if (numRead != null)
  {
    this.m_chunkRem = fan.sys.Int.minus(this.m_chunkRem,fan.sys.ObjUtil.coerce(numRead,fan.sys.Int.$type));
  }
  ;
  return numRead;
}
fan.web.ChunkInStream.prototype.unread = function(b)
{
  if (this.m_pushback == null)
  {
    this.m_pushback = fan.sys.List.make(fan.sys.Int.$type);
  }
  ;
  this.m_pushback.push(fan.sys.ObjUtil.coerce(b,fan.sys.Obj.$type.toNullable()));
  return this;
}
fan.web.ChunkInStream.prototype.checkChunk = function()
{
  try
  {
    if (fan.sys.ObjUtil.compareGT(this.m_chunkRem,0))
    {
      return true;
    }
    ;
    if (this.m_noMoreChunks)
    {
      return false;
    }
    ;
    if ((fan.sys.ObjUtil.compareNE(this.m_chunkRem,-1) && !fan.sys.Str.isEmpty(fan.web.WebUtil.readLine(this.m_$in))))
    {
      throw fan.sys.Err.make();
    }
    ;
    var line = fan.web.WebUtil.readLine(this.m_$in);
    var semi = fan.sys.Str.index(line,";");
    if (semi != null)
    {
      line = fan.sys.Str.getRange(line,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(semi,fan.sys.Int.$type)));
    }
    ;
    this.m_chunkRem = fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(line),16),fan.sys.Int.$type);
    if (fan.sys.ObjUtil.compareGT(this.m_chunkRem,0))
    {
      return true;
    }
    ;
    this.m_noMoreChunks = true;
    fan.web.WebUtil.parseHeaders(this.m_$in);
    return false;
  }
  catch ($_u19)
  {
    $_u19 = fan.sys.Err.make($_u19);
    if ($_u19 instanceof fan.sys.Err)
    {
      var e = $_u19;
      var e;
      throw fan.sys.IOErr.make("Invalid format for HTTP chunked transfer encoding");
    }
    else
    {
      throw $_u19;
    }
  }
  ;
}
fan.web.ChunkInStream.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.$typeof(this))," { noMoreChunks="),fan.sys.ObjUtil.coerce(this.m_noMoreChunks,fan.sys.Obj.$type.toNullable()))," chunkRem="),fan.sys.ObjUtil.coerce(this.m_chunkRem,fan.sys.Obj.$type.toNullable()))," pushback="),this.m_pushback)," }");
}
fan.web.ChunkInStream.prototype.$in = function()
{
  return this.m_$in;
}
fan.web.ChunkInStream.prototype.$in$ = function(it)
{
  this.m_$in = it;
  return;
}
fan.web.ChunkInStream.prototype.noMoreChunks = function()
{
  return this.m_noMoreChunks;
}
fan.web.ChunkInStream.prototype.noMoreChunks$ = function(it)
{
  this.m_noMoreChunks = it;
  return;
}
fan.web.ChunkInStream.prototype.chunkRem = function()
{
  return this.m_chunkRem;
}
fan.web.ChunkInStream.prototype.chunkRem$ = function(it)
{
  this.m_chunkRem = it;
  return;
}
fan.web.ChunkInStream.prototype.pushback = function()
{
  return this.m_pushback;
}
fan.web.ChunkInStream.prototype.pushback$ = function(it)
{
  this.m_pushback = it;
  return;
}
fan.web.ChunkInStream.prototype.m_$in = null;
fan.web.ChunkInStream.prototype.m_noMoreChunks = false;
fan.web.ChunkInStream.prototype.m_chunkRem = 0;
fan.web.ChunkInStream.prototype.m_pushback = null;
fan.web.FixedOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.web.FixedOutStream.prototype.$ctor = function()
{
  fan.sys.OutStream.prototype.$ctor.call(this);
  var $this = this;
}
fan.web.FixedOutStream.prototype.$typeof = function() { return fan.web.FixedOutStream.$type; }
fan.web.FixedOutStream.make = function(out,fixed) {
  var self = new fan.web.FixedOutStream();
  fan.web.FixedOutStream.make$(self,out,fixed);
  return self;
  }
fan.web.FixedOutStream.make$ = function(self,out,fixed)
{
  fan.sys.OutStream.make$(self,null);
  self.m_out = out;
  self.m_fixed = fan.sys.ObjUtil.coerce(fixed,fan.sys.Int.$type.toNullable());
  return;
}
fan.web.FixedOutStream.prototype.write = function(b)
{
  this.checkChunk(1);
  this.m_out.write(b);
  return this;
}
fan.web.FixedOutStream.prototype.writeBuf = function(buf,n)
{
  if (n === undefined) n = buf.remaining();
  this.checkChunk(n);
  this.m_out.writeBuf(buf,n);
  return this;
}
fan.web.FixedOutStream.prototype.flush = function()
{
  this.m_out.flush();
  return this;
}
fan.web.FixedOutStream.prototype.close = function()
{
  try
  {
    this.flush();
    return true;
  }
  catch ($_u20)
  {
    $_u20 = fan.sys.Err.make($_u20);
    if ($_u20 instanceof fan.sys.Err)
    {
      var e = $_u20;
      var e;
      return false;
    }
    else
    {
      throw $_u20;
    }
  }
  ;
}
fan.web.FixedOutStream.prototype.checkChunk = function(n)
{
  this.m_written = fan.sys.Int.plus(this.m_written,n);
  if (fan.sys.ObjUtil.compareGT(this.m_written,this.m_fixed))
  {
    throw fan.sys.IOErr.make(fan.sys.Str.plus("Attempt to write more than Content-Length: ",fan.sys.ObjUtil.coerce(this.m_fixed,fan.sys.Obj.$type.toNullable())));
  }
  ;
  return;
}
fan.web.FixedOutStream.prototype.out = function()
{
  return this.m_out;
}
fan.web.FixedOutStream.prototype.out$ = function(it)
{
  this.m_out = it;
  return;
}
fan.web.FixedOutStream.prototype.fixed = function()
{
  return this.m_fixed;
}
fan.web.FixedOutStream.prototype.fixed$ = function(it)
{
  this.m_fixed = it;
  return;
}
fan.web.FixedOutStream.prototype.written = function()
{
  return this.m_written;
}
fan.web.FixedOutStream.prototype.written$ = function(it)
{
  this.m_written = it;
  return;
}
fan.web.FixedOutStream.prototype.m_out = null;
fan.web.FixedOutStream.prototype.m_fixed = null;
fan.web.FixedOutStream.prototype.m_written = 0;
fan.web.ChunkOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.web.ChunkOutStream.prototype.$ctor = function()
{
  fan.sys.OutStream.prototype.$ctor.call(this);
  var $this = this;
}
fan.web.ChunkOutStream.prototype.$typeof = function() { return fan.web.ChunkOutStream.$type; }
fan.web.ChunkOutStream.make = function(out) {
  var self = new fan.web.ChunkOutStream();
  fan.web.ChunkOutStream.make$(self,out);
  return self;
  }
fan.web.ChunkOutStream.make$ = function(self,out)
{
  fan.sys.OutStream.make$(self,null);
  self.m_out = out;
  self.m_buffer = fan.sys.Buf.make(fan.sys.Int.plus(fan.web.ChunkOutStream.m_chunkSize,256));
  return;
}
fan.web.ChunkOutStream.prototype.write = function(b)
{
  this.m_buffer.write(b);
  this.checkChunk();
  return this;
}
fan.web.ChunkOutStream.prototype.writeBuf = function(buf,n)
{
  if (n === undefined) n = buf.remaining();
  this.m_buffer.writeBuf(buf,n);
  this.checkChunk();
  return this;
}
fan.web.ChunkOutStream.prototype.flush = function()
{
  if (this.m_closed)
  {
    throw fan.sys.IOErr.make("ChunkOutStream is closed");
  }
  ;
  if (fan.sys.ObjUtil.compareGT(this.m_buffer.size(),0))
  {
    this.m_out.print(fan.sys.Int.toHex(this.m_buffer.size())).print("\r\n");
    this.m_out.writeBuf(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(this.m_buffer.flip(),fan.sys.Buf.$type.toNullable()),fan.sys.Buf.$type),this.m_buffer.remaining());
    this.m_out.print("\r\n").flush();
    this.m_buffer.clear();
  }
  ;
  return this;
}
fan.web.ChunkOutStream.prototype.close = function()
{
  if (this.m_closed)
  {
    return true;
  }
  ;
  try
  {
    this.flush();
    this.m_closed = true;
    this.m_out.print("0\r\n\r\n").flush();
    return true;
  }
  catch ($_u21)
  {
    return false;
  }
  ;
}
fan.web.ChunkOutStream.prototype.checkChunk = function()
{
  if (fan.sys.ObjUtil.compareGE(this.m_buffer.size(),fan.web.ChunkOutStream.m_chunkSize))
  {
    this.flush();
  }
  ;
  return;
}
fan.web.ChunkOutStream.prototype.out = function()
{
  return this.m_out;
}
fan.web.ChunkOutStream.prototype.out$ = function(it)
{
  this.m_out = it;
  return;
}
fan.web.ChunkOutStream.prototype.buffer = function()
{
  return this.m_buffer;
}
fan.web.ChunkOutStream.prototype.buffer$ = function(it)
{
  this.m_buffer = it;
  return;
}
fan.web.ChunkOutStream.prototype.closed = function()
{
  return this.m_closed;
}
fan.web.ChunkOutStream.prototype.closed$ = function(it)
{
  this.m_closed = it;
  return;
}
fan.web.ChunkOutStream.static$init = function()
{
  fan.web.ChunkOutStream.m_chunkSize = 1024;
  return;
}
fan.web.ChunkOutStream.m_chunkSize = 0;
fan.web.ChunkOutStream.prototype.m_out = null;
fan.web.ChunkOutStream.prototype.m_buffer = null;
fan.web.ChunkOutStream.prototype.m_closed = false;
fan.web.MultiPartInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.web.MultiPartInStream.prototype.$ctor = function()
{
  fan.sys.InStream.prototype.$ctor.call(this);
  var $this = this;
}
fan.web.MultiPartInStream.prototype.$typeof = function() { return fan.web.MultiPartInStream.$type; }
fan.web.MultiPartInStream.make = function($in,boundary) {
  var self = new fan.web.MultiPartInStream();
  fan.web.MultiPartInStream.make$(self,$in,boundary);
  return self;
  }
fan.web.MultiPartInStream.make$ = function(self,$in,boundary)
{
  fan.sys.InStream.make$(self,null);
  self.m_$in = $in;
  self.m_boundary = boundary;
  self.m_curLine = fan.sys.ObjUtil.coerce(fan.sys.Buf.make(1024),fan.sys.Buf.$type);
  return;
}
fan.web.MultiPartInStream.prototype.read = function()
{
  if ((this.m_pushback != null && !this.m_pushback.isEmpty()))
  {
    return this.m_pushback.pop();
  }
  ;
  if (!this.checkLine())
  {
    return null;
  }
  ;
  this.m_numRead = fan.sys.Int.plus(this.m_numRead,1);
  return this.m_curLine.read();
}
fan.web.MultiPartInStream.prototype.readBuf = function(buf,n)
{
  if ((this.m_pushback != null && !this.m_pushback.isEmpty() && fan.sys.ObjUtil.compareGT(n,0)))
  {
    buf.write(fan.sys.ObjUtil.coerce(this.m_pushback.pop(),fan.sys.Int.$type));
    this.m_numRead = fan.sys.Int.plus(this.m_numRead,1);
    return fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable());
  }
  ;
  if (!this.checkLine())
  {
    return null;
  }
  ;
  var actualRead = this.m_curLine.readBuf(buf,n);
  this.m_numRead = fan.sys.Int.plus(this.m_numRead,fan.sys.ObjUtil.coerce(actualRead,fan.sys.Int.$type));
  return actualRead;
}
fan.web.MultiPartInStream.prototype.unread = function(b)
{
  if (this.m_pushback == null)
  {
    this.m_pushback = fan.sys.List.make(fan.sys.Int.$type);
  }
  ;
  this.m_pushback.push(fan.sys.ObjUtil.coerce(b,fan.sys.Obj.$type.toNullable()));
  this.m_numRead = fan.sys.Int.minus(this.m_numRead,1);
  return this;
}
fan.web.MultiPartInStream.prototype.checkLine = function()
{
  if (fan.sys.ObjUtil.compareGT(this.m_curLine.remaining(),0))
  {
    return true;
  }
  ;
  if (this.m_endOfPart)
  {
    return false;
  }
  ;
  this.m_curLine.clear();
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,1024); i = fan.sys.Int.increment(i))
  {
    var c = this.m_$in.readU1();
    this.m_curLine.write(c);
    if (fan.sys.ObjUtil.equals(c,10))
    {
      break;
    }
    ;
  }
  ;
  if ((fan.sys.ObjUtil.compareLT(this.m_curLine.size(),2) || fan.sys.ObjUtil.compareNE(this.m_curLine.get(-2),13)))
  {
    this.m_curLine.seek(0);
    return true;
  }
  ;
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,fan.sys.Str.size(this.m_boundary)); i = fan.sys.Int.increment(i))
  {
    var c = this.m_$in.readU1();
    if (fan.sys.ObjUtil.compareNE(c,fan.sys.Str.get(this.m_boundary,i)))
    {
      if (fan.sys.ObjUtil.equals(c,13))
      {
        this.m_$in.unread(c);
      }
      else
      {
        this.m_curLine.write(c);
      }
      ;
      this.m_curLine.seek(0);
      return true;
    }
    ;
    this.m_curLine.write(c);
  }
  ;
  this.m_curLine.size$(fan.sys.Int.minus(fan.sys.Int.minus(this.m_curLine.size(),fan.sys.Str.size(this.m_boundary)),2));
  var c1 = this.m_$in.readU1();
  var c2 = this.m_$in.readU1();
  if ((fan.sys.ObjUtil.equals(c1,45) && fan.sys.ObjUtil.equals(c2,45)))
  {
    this.m_endOfParts = true;
    c1 = this.m_$in.readU1();
    c2 = this.m_$in.readU1();
  }
  ;
  if ((fan.sys.ObjUtil.compareNE(c1,13) || fan.sys.ObjUtil.compareNE(c2,10)))
  {
    throw fan.sys.IOErr.make(fan.sys.Str.plus("Fishy boundary ",fan.sys.Str.toCode(fan.sys.Str.plus(fan.sys.Int.toChar(c1),fan.sys.Int.toChar(c2)),fan.sys.ObjUtil.coerce(34,fan.sys.Int.$type.toNullable()),true)));
  }
  ;
  this.m_endOfPart = true;
  this.m_curLine.seek(0);
  return fan.sys.ObjUtil.compareGT(this.m_curLine.size(),0);
}
fan.web.MultiPartInStream.prototype.$in = function()
{
  return this.m_$in;
}
fan.web.MultiPartInStream.prototype.$in$ = function(it)
{
  this.m_$in = it;
  return;
}
fan.web.MultiPartInStream.prototype.boundary = function()
{
  return this.m_boundary;
}
fan.web.MultiPartInStream.prototype.boundary$ = function(it)
{
  this.m_boundary = it;
  return;
}
fan.web.MultiPartInStream.prototype.curLine = function()
{
  return this.m_curLine;
}
fan.web.MultiPartInStream.prototype.curLine$ = function(it)
{
  this.m_curLine = it;
  return;
}
fan.web.MultiPartInStream.prototype.pushback = function()
{
  return this.m_pushback;
}
fan.web.MultiPartInStream.prototype.pushback$ = function(it)
{
  this.m_pushback = it;
  return;
}
fan.web.MultiPartInStream.prototype.endOfPart = function()
{
  return this.m_endOfPart;
}
fan.web.MultiPartInStream.prototype.endOfPart$ = function(it)
{
  this.m_endOfPart = it;
  return;
}
fan.web.MultiPartInStream.prototype.endOfParts = function()
{
  return this.m_endOfParts;
}
fan.web.MultiPartInStream.prototype.endOfParts$ = function(it)
{
  this.m_endOfParts = it;
  return;
}
fan.web.MultiPartInStream.prototype.numRead = function()
{
  return this.m_numRead;
}
fan.web.MultiPartInStream.prototype.numRead$ = function(it)
{
  this.m_numRead = it;
  return;
}
fan.web.MultiPartInStream.prototype.m_$in = null;
fan.web.MultiPartInStream.prototype.m_boundary = null;
fan.web.MultiPartInStream.prototype.m_curLine = null;
fan.web.MultiPartInStream.prototype.m_pushback = null;
fan.web.MultiPartInStream.prototype.m_endOfPart = false;
fan.web.MultiPartInStream.prototype.m_endOfParts = false;
fan.web.MultiPartInStream.prototype.m_numRead = 0;
fan.web.Cookie = fan.sys.Obj.$extend(fan.sys.Obj);
fan.web.Cookie.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_path = "/";
  this.m_secure = false;
  this.m_httpOnly = true;
  this.m_sameSite = "strict";
  return;
}
fan.web.Cookie.prototype.$typeof = function() { return fan.web.Cookie.$type; }
fan.web.Cookie.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    var params = null;
    var semi = fan.sys.Str.index(s,";");
    if (semi != null)
    {
      params = fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(semi,fan.sys.Int.$type),1),-1));
      s = fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(semi,fan.sys.Int.$type),true));
    }
    ;
    var eq = fan.sys.Str.index(s,"=");
    if (eq == null)
    {
      throw fan.sys.ParseErr.make(s);
    }
    ;
    var $name = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(eq,fan.sys.Int.$type),true)));
    var val = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(eq,fan.sys.Int.$type),1),-1)));
    if (params == null)
    {
      return fan.web.Cookie.make($name,val);
    }
    ;
    return fan.web.Cookie.make($name,val,fan.sys.Func.make$closure(
      fan.web.$clos$_u22,
      function(it)
      {
        var p = fan.sys.MimeType.parseParams(fan.sys.ObjUtil.coerce(params,fan.sys.Str.$type));
        it.m_domain = p.get("Domain");
        it.m_path = p.get("Path","/");
        return;
      }));
  }
  catch ($_u23)
  {
    $_u23 = fan.sys.Err.make($_u23);
    if ($_u23 instanceof fan.sys.Err)
    {
      var e = $_u23;
      var e;
      if (checked)
      {
        throw fan.sys.ParseErr.make(fan.sys.Str.plus("Cookie: ",s));
      }
      ;
      return null;
    }
    else
    {
      throw $_u23;
    }
  }
  ;
}
fan.web.Cookie.makeSession = function($name,val,overrides)
{
  if (overrides === undefined) overrides = null;
  var $this = this;
  var pod = fan.web.Cookie.$type.pod();
  var fields = fan.sys.Map.fromLiteral([fan.web.Cookie.$type.slot("secure"),fan.web.Cookie.$type.slot("sameSite"),fan.web.Cookie.$type.slot("httpOnly")],[fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.equals(pod.config("secureSessionCookie","false"),"true"),fan.sys.Obj.$type.toNullable()),pod.config("sameSiteSessionCookie","strict"),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable())],fan.sys.Type.find("sys::Field"),fan.sys.Type.find("sys::Obj?"));
  if (overrides != null)
  {
    overrides.each(fan.sys.Func.make$closure(
      fan.web.$clos$_u24,
      function(v,f)
      {
        fields.set(f,v);
        return;
      }));
  }
  ;
  return fan.web.Cookie.make($name,val,fan.sys.Field.makeSetFunc(fields));
}
fan.web.Cookie.make = function($name,val,f) {
  var self = new fan.web.Cookie();
  fan.web.Cookie.make$(self,$name,val,f);
  return self;
  }
fan.web.Cookie.make$ = function(self,$name,val,f)
{
  if (f === undefined) f = null;
  var $this = self;
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  self.m_$name = $name;
  self.m_val = val;
  if ((!fan.web.WebUtil.isToken(self.m_$name) || fan.sys.ObjUtil.equals(fan.sys.Str.get(self.m_$name,0),36)))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Cookie name has illegal chars: ",val));
  }
  ;
  if (!fan.sys.Str.all(self.m_val,fan.sys.Func.make$closure(
    fan.web.$clos$_u3,
    function(c)
    {
      return (fan.sys.ObjUtil.compareLE(32,c) && fan.sys.ObjUtil.compareLE(c,126) && fan.sys.ObjUtil.compareNE(c,59));
    })))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Cookie value has illegal chars: ",val));
  }
  ;
  if (fan.sys.ObjUtil.compareGE(fan.sys.Int.plus(fan.sys.Str.size(self.m_val),32),fan.web.WebUtil.m_maxTokenSize))
  {
    throw fan.sys.ArgErr.make("Cookie value too big");
  }
  ;
  return;
}
fan.web.Cookie.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make(64);
  s.add(this.m_$name).add("=").add(this.m_val);
  if (this.m_maxAge != null)
  {
    s.add(";Max-Age=").add(fan.sys.ObjUtil.coerce(this.m_maxAge.toSec(),fan.sys.Obj.$type.toNullable()));
    if (fan.sys.ObjUtil.compareLE(this.m_maxAge.ticks(),0))
    {
      s.add(";Expires=").add("Sat, 01 Jan 2000 00:00:00 GMT");
    }
    else
    {
      s.add(";Expires=").add(fan.sys.DateTime.nowUtc().plus(fan.sys.ObjUtil.coerce(this.m_maxAge,fan.sys.Duration.$type)).toHttpStr());
    }
    ;
  }
  ;
  if (this.m_domain != null)
  {
    s.add(";Domain=").add(this.m_domain);
  }
  ;
  if (this.m_path != null)
  {
    s.add(";Path=").add(this.m_path);
  }
  ;
  if (this.m_secure)
  {
    s.add(";Secure");
  }
  ;
  if (this.m_httpOnly)
  {
    s.add(";HttpOnly");
  }
  ;
  if (this.m_sameSite != null)
  {
    s.add(fan.sys.Str.plus(";SameSite=",this.m_sameSite));
  }
  ;
  return s.toStr();
}
fan.web.Cookie.prototype.toNameValStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",this.m_$name),"="),this.m_val);
}
fan.web.Cookie.prototype.m_$name = null;
fan.web.Cookie.prototype.m_val = null;
fan.web.Cookie.prototype.m_maxAge = null;
fan.web.Cookie.prototype.m_domain = null;
fan.web.Cookie.prototype.m_path = null;
fan.web.Cookie.prototype.m_secure = false;
fan.web.Cookie.prototype.m_httpOnly = false;
fan.web.Cookie.prototype.m_sameSite = null;
fan.web.$pod = fan.sys.Pod.$add('web');
with (fan.web.$pod)
{
  fan.web.WebOutStream.$type = $at('WebOutStream','sys::OutStream',[],{'sys::Js':""},8192);
  fan.web.WebUtil.$type = $at('WebUtil','sys::Obj',[],{'sys::Js':""},8192);
  fan.web.ChunkInStream.$type = $at('ChunkInStream','sys::InStream',[],{'sys::Js':""},128);
  fan.web.FixedOutStream.$type = $at('FixedOutStream','sys::OutStream',[],{'sys::Js':""},128);
  fan.web.ChunkOutStream.$type = $at('ChunkOutStream','sys::OutStream',[],{'sys::Js':""},128);
  fan.web.MultiPartInStream.$type = $at('MultiPartInStream','sys::InStream',[],{'sys::Js':""},128);
  fan.web.Cookie.$type = $at('Cookie','sys::Obj',[],{'sys::Js':""},8194);
  fan.web.WebOutStream.$type.$af('cssUris',67584,'sys::Uri[]?',{}).$af('jsUris',67584,'sys::Uri[]?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false)]),{}).$am('w',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('tab',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('numSpaces','sys::Int',true)]),{}).$am('nl',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('prolog',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tag',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elemName','sys::Str',false),new fan.sys.Param('attrs','sys::Str?',true),new fan.sys.Param('empty','sys::Bool',true)]),{}).$am('tagEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elemName','sys::Str',false)]),{}).$am('docType',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('docType5',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('html',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('htmlEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('head',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('headEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('title',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('titleEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('includeCss',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('href','sys::Uri',false)]),{}).$am('includeJs',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('href','sys::Uri?',true)]),{}).$am('initJs',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('env','[sys::Str:sys::Str]',false)]),{}).$am('atom',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('href','sys::Uri',false),new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('rss',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('href','sys::Uri',false),new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('favIcon',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('href','sys::Uri',false),new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('style',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('styleEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('script',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('scriptEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('body',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('bodyEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h1',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('h1End',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h2',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('h2End',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h3',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('h3End',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('h4End',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h5',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('h5End',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h6',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('h6End',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('div',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('divEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('span',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('spanEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('p',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('pEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('b',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('bEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('i',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('iEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('em',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('emEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pre',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('preEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('code',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('codeEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hr',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('br',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('a',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('href','sys::Uri',false),new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('aEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('img',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('src','sys::Uri',false),new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('table',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('tableEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('thead',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('theadEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tbody',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('tbodyEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tfoot',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('tfootEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tr',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('trEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('th',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('thEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('td',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('tdEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ul',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('ulEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ol',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('olEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('li',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('liEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dl',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('dlEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dt',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('dtEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('ddEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('form',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('formEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('label',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('labelEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('input',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('textField',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('password',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('hidden',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('button',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('checkbox',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('radio',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('submit',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('select',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('selectEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('option',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('optionEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('textArea',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('textAreaEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('header',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('headerEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('footer',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('footerEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('main',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('mainEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('nav',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('navEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('section',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('sectionEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('article',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('articleEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('aside',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('attrs','sys::Str?',true)]),{}).$am('asideEnd',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('esc',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{});
  fan.web.WebUtil.$type.$af('tokenChars',100354,'sys::Bool[]',{}).$af('CR',98434,'sys::Int',{}).$af('LF',98434,'sys::Int',{}).$af('HT',98434,'sys::Int',{}).$af('SP',98434,'sys::Int',{}).$af('maxTokenSize',98434,'sys::Int',{}).$am('isToken',40962,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('isTokenChar',40962,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Int',false)]),{}).$am('toQuotedStr',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('fromQuotedStr',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('parseList',40962,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('parseHeaders',40962,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false)]),{}).$am('doParseHeaders',32898,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false),new fan.sys.Param('cookies','web::Cookie[]?',false)]),{}).$am('token',34818,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false),new fan.sys.Param('sep','sys::Int',false)]),{}).$am('parseQVals',40962,'[sys::Str:sys::Float]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('writeHeaders',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('headers','[sys::Str:sys::Str]',false)]),{'sys::NoDoc':""}).$am('headersToCharset',40962,'sys::Charset',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('headers','[sys::Str:sys::Str]',false)]),{}).$am('makeContentInStream',40962,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('headers','[sys::Str:sys::Str]',false),new fan.sys.Param('in','sys::InStream',false)]),{}).$am('doMakeContentInStream',34818,'sys::InStream?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('headers','[sys::Str:sys::Str]',false),new fan.sys.Param('in','sys::InStream',false)]),{}).$am('makeContentOutStream',40962,'sys::OutStream?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('headers','[sys::Str:sys::Str]',false),new fan.sys.Param('out','sys::OutStream',false)]),{}).$am('makeFixedInStream',40962,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false),new fan.sys.Param('fixed','sys::Int',false)]),{}).$am('makeChunkedInStream',40962,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false)]),{}).$am('makeFixedOutStream',40962,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('fixed','sys::Int',false)]),{}).$am('makeChunkedOutStream',40962,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false)]),{}).$am('readLine',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false)]),{'sys::NoDoc':""}).$am('parseMultiPart',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false),new fan.sys.Param('boundary','sys::Str',false),new fan.sys.Param('cb','|[sys::Str:sys::Str],sys::InStream->sys::Void|',false)]),{}).$am('jsMain',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('main','sys::Str',false),new fan.sys.Param('env','[sys::Str:sys::Str]?',true)]),{'sys::Deprecated':"sys::Deprecated{msg=\"use WebOutStream.initJs\";}"}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.web.ChunkInStream.$type.$af('in',73728,'sys::InStream',{}).$af('noMoreChunks',73728,'sys::Bool',{}).$af('chunkRem',73728,'sys::Int',{}).$af('pushback',73728,'sys::Int[]?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false),new fan.sys.Param('fixed','sys::Int?',true)]),{}).$am('read',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBuf',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('unread',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('checkChunk',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.web.FixedOutStream.$type.$af('out',73728,'sys::OutStream',{}).$af('fixed',73728,'sys::Int?',{}).$af('written',73728,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('fixed','sys::Int',false)]),{}).$am('write',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('writeBuf',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)]),{}).$am('flush',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('checkChunk',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{});
  fan.web.ChunkOutStream.$type.$af('chunkSize',106498,'sys::Int',{}).$af('out',73728,'sys::OutStream',{}).$af('buffer',73728,'sys::Buf?',{}).$af('closed',73728,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false)]),{}).$am('write',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('writeBuf',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)]),{}).$am('flush',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('checkChunk',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.web.MultiPartInStream.$type.$af('in',73728,'sys::InStream',{}).$af('boundary',73728,'sys::Str',{}).$af('curLine',73728,'sys::Buf',{}).$af('pushback',73728,'sys::Int[]?',{}).$af('endOfPart',73728,'sys::Bool',{}).$af('endOfParts',73728,'sys::Bool',{}).$af('numRead',73728,'sys::Int',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false),new fan.sys.Param('boundary','sys::Str',false)]),{}).$am('read',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBuf',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('unread',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('checkLine',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.web.Cookie.$type.$af('name',73730,'sys::Str',{}).$af('val',73730,'sys::Str',{}).$af('maxAge',73730,'sys::Duration?',{}).$af('domain',73730,'sys::Str?',{}).$af('path',73730,'sys::Str?',{}).$af('secure',73730,'sys::Bool',{}).$af('httpOnly',73730,'sys::Bool',{}).$af('sameSite',73730,'sys::Str?',{}).$am('fromStr',40966,'web::Cookie?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('makeSession',40962,'web::Cookie',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Str',false),new fan.sys.Param('overrides','[sys::Field:sys::Obj?]?',true)]),{'sys::NoDoc':""}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Str',false),new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toNameValStr',128,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "web");
  m_meta.set("pod.version", "1.0.78.3106");
  m_version = fan.sys.Version.fromStr("1.0.78.3106");
  m_meta.set("pod.depends", "sys 1.0;concurrent 1.0;inet 1.0");
  m_meta.set("pod.summary", "Standard weblet APIs for processing HTTP requests");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:23:07-05:00 New_York");
  m_meta.set("build.tsKey", "221115162307");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("pod.docSrc", "true");
  m_meta.set("license.name", "Academic Free License 3.0");
  m_meta.set("org.name", "Fantom");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "Fantom Core");
  m_meta.set("proj.uri", "https://fantom.org/");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://fantom.org/");
  m_meta.set("pod.native.java", "false");
  m_meta.set("vcs.uri", "https://github.com/fantom-lang/fantom");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("vcs.name", "Git");
  m_meta.set("pod.native.js", "false");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
fan.web.$clos$_u2 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","sys::Str","false","i","sys::Int","false"]);
fan.web.$clos$_u3 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["c","sys::Int","false"]);
fan.web.$clos$_u4 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","sys::Int","false"]);
fan.web.$clos$_u9 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["ch","sys::Int","false"]);
fan.web.$clos$_u10 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["tok","sys::Str","false"]);
fan.web.$clos$_u12 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Str","false","k","sys::Str","false"]);
fan.web.$clos$_u14 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","sys::InStream","false"]);
fan.web.$clos$_u15 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","sys::OutStream","false"]);
fan.web.$clos$_u22 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","web::Cookie","false"]);
fan.web.$clos$_u24 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Obj?","false","f","sys::Field","false"]);
fan.web.WebUtil.static$init();
fan.web.ChunkOutStream.static$init();
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.dom = exports;
} else {
  fan.dom = root.fan.dom = {};
}

fan.dom.Storage = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Storage.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.StoragePeer(this);
  var $this = this;
}
fan.dom.Storage.prototype.$typeof = function() { return fan.dom.Storage.$type; }
fan.dom.Storage.make = function() {
  var self = new fan.dom.Storage();
  fan.dom.Storage.make$(self);
  return self;
  }
fan.dom.Storage.make$ = function(self)
{
  return;
}
fan.dom.Storage.prototype.size = function()
{
  return this.peer.size(this);
}
fan.dom.Storage.prototype.key = function(index)
{
  return this.peer.key(this,index);
}
fan.dom.Storage.prototype.get = function(key)
{
  return this.peer.get(this,key);
}
fan.dom.Storage.prototype.set = function(key,val)
{
  return this.peer.set(this,key,val);
}
fan.dom.Storage.prototype.remove = function(key)
{
  return this.peer.remove(this,key);
}
fan.dom.Storage.prototype.clear = function()
{
  return this.peer.clear(this);
}
fan.dom.StoragePeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.StoragePeer.prototype.$ctor = function(self) {}
fan.dom.StoragePeer.prototype.$instance = null;
fan.dom.StoragePeer.prototype.size = function(self, key)
{
  return this.$instance.length;
}
fan.dom.StoragePeer.prototype.key = function(self, index)
{
  return this.$instance.key(index);
}
fan.dom.StoragePeer.prototype.get = function(self, key)
{
  return this.$instance.getItem(key);
}
fan.dom.StoragePeer.prototype.set = function(self, key, val)
{
  this.$instance.setItem(key, val);
}
fan.dom.StoragePeer.prototype.remove = function(self, key)
{
  this.$instance.removeItem(key);
}
fan.dom.StoragePeer.prototype.clear = function(self)
{
  this.$instance.clear();
}
fan.dom.MutationObserver = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.MutationObserver.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.MutationObserverPeer(this);
  var $this = this;
}
fan.dom.MutationObserver.prototype.$typeof = function() { return fan.dom.MutationObserver.$type; }
fan.dom.MutationObserver.make = function(callback) {
  var self = new fan.dom.MutationObserver();
  fan.dom.MutationObserver.make$(self,callback);
  return self;
  }
fan.dom.MutationObserver.make$ = function(self,callback)
{
  self.m_callback = callback;
  return;
}
fan.dom.MutationObserver.prototype.observe = function(target,opts)
{
  return this.peer.observe(this,target,opts);
}
fan.dom.MutationObserver.prototype.takeRecs = function()
{
  return this.peer.takeRecs(this);
}
fan.dom.MutationObserver.prototype.disconnet = function()
{
  return this.peer.disconnet(this);
}
fan.dom.MutationObserver.prototype.callback = function()
{
  return this.m_callback;
}
fan.dom.MutationObserver.prototype.callback$ = function(it)
{
  this.m_callback = it;
  return;
}
fan.dom.MutationObserver.prototype.m_callback = null;
fan.dom.MutationObserverPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.MutationObserverPeer.prototype.$ctor = function(self)
{
  this.observer = new MutationObserver(function(recs)
  {
    var list = fan.dom.MutationObserverPeer.$makeRecList(recs);
    var args = fan.sys.List.make(fan.sys.Obj.$type, [list]);
    self.m_callback.callOn(self, args);
  });
}
fan.dom.MutationObserverPeer.prototype.observe = function(self, target, opts)
{
  var config = {
    childList:             opts.get("childList")      == true ? true : false,
    attributes:            opts.get("attrs")          == true ? true : false,
    characterData:         opts.get("charData")       == true ? true : false,
    subtree:               opts.get("subtree")        == true ? true : false,
    attributeOldValue:     opts.get("attrOldVal")     == true ? true : false,
    characterDataOldValue: opts.get("charDataOldVal") == true ? true : false,
  };
  var filter = opts.get("attrFilter")
  if (filter != null) config.attributeFilter = filter.m_values;
  this.observer.observe(target.peer.elem, config);
  return self;
}
fan.dom.MutationObserverPeer.prototype.takeRecs = function(self)
{
  var recs = this.observer.takeRecords();
  return fan.dom.MutationObserverPeer.$makeRecList(recs);
}
fan.dom.MutationObserverPeer.prototype.disconnect = function(self)
{
  this.observer.disconnect();
}
fan.dom.MutationObserverPeer.$makeRec = function(rec)
{
  var fanRec = fan.dom.MutationRec.make();
  if (rec.type == "attributes") fanRec.m_type = "attrs";
  else if (rec.type == "characterData") fanRec.m_type = "charData";
  else fanRec.m_type = rec.type;
  fanRec.m_target = fan.dom.ElemPeer.wrap(rec.target);
  fanRec.m_attr   = rec.attributeName;
  fanRec.m_attrNs = rec.attributeNamespace;
  fanRec.m_oldVal = rec.oldValue;
  if (rec.previousSibling) fanRec.m_prevSibling = fan.dom.ElemPeer.wrap(rec.previousSibling);
  if (rec.nextSibling) fanRec.m_nextSibling = fan.dom.ElemPeer.wrap(rec.nextSibling);
  var added = new Array();
  for (var i=0; i<rec.addedNodes.length; i++)
    added.push(fan.dom.ElemPeer.wrap(rec.addedNodes[i]));
  fanRec.m_added = fan.sys.List.make(fan.dom.Elem.$type, added);
  var removed = new Array();
  for (var i=0; i<rec.removedNodes.length; i++)
    removed.push(fan.dom.ElemPeer.wrap(rec.removedNodes[i]));
  fanRec.m_removed = fan.sys.List.make(fan.dom.Elem.$type, removed);
  return fanRec;
}
fan.dom.MutationObserverPeer.$makeRecList = function(recs)
{
  var list = new Array();
  for (var i=0; i<recs.length; i++)
    list.push(fan.dom.MutationObserverPeer.$makeRec(recs[i]));
  return fan.sys.List.make(fan.dom.MutationRec.$type, list);
}
fan.dom.MutationRec = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.MutationRec.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.dom.MutationRec.prototype.$typeof = function() { return fan.dom.MutationRec.$type; }
fan.dom.MutationRec.make = function(f) {
  var self = new fan.dom.MutationRec();
  fan.dom.MutationRec.make$(self,f);
  return self;
  }
fan.dom.MutationRec.make$ = function(self,f)
{
  if (f === undefined) f = null;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.dom.MutationRec.prototype.type = function()
{
  return this.m_type;
}
fan.dom.MutationRec.prototype.type$ = function(it)
{
  this.m_type = it;
  return;
}
fan.dom.MutationRec.prototype.target = function()
{
  return this.m_target;
}
fan.dom.MutationRec.prototype.target$ = function(it)
{
  this.m_target = it;
  return;
}
fan.dom.MutationRec.prototype.added = function()
{
  return this.m_added;
}
fan.dom.MutationRec.prototype.added$ = function(it)
{
  this.m_added = it;
  return;
}
fan.dom.MutationRec.prototype.removed = function()
{
  return this.m_removed;
}
fan.dom.MutationRec.prototype.removed$ = function(it)
{
  this.m_removed = it;
  return;
}
fan.dom.MutationRec.prototype.prevSibling = function()
{
  return this.m_prevSibling;
}
fan.dom.MutationRec.prototype.prevSibling$ = function(it)
{
  this.m_prevSibling = it;
  return;
}
fan.dom.MutationRec.prototype.nextSibling = function()
{
  return this.m_nextSibling;
}
fan.dom.MutationRec.prototype.nextSibling$ = function(it)
{
  this.m_nextSibling = it;
  return;
}
fan.dom.MutationRec.prototype.attr = function()
{
  return this.m_attr;
}
fan.dom.MutationRec.prototype.attr$ = function(it)
{
  this.m_attr = it;
  return;
}
fan.dom.MutationRec.prototype.attrNs = function()
{
  return this.m_attrNs;
}
fan.dom.MutationRec.prototype.attrNs$ = function(it)
{
  this.m_attrNs = it;
  return;
}
fan.dom.MutationRec.prototype.oldVal = function()
{
  return this.m_oldVal;
}
fan.dom.MutationRec.prototype.oldVal$ = function(it)
{
  this.m_oldVal = it;
  return;
}
fan.dom.MutationRec.prototype.m_type = null;
fan.dom.MutationRec.prototype.m_target = null;
fan.dom.MutationRec.prototype.m_added = null;
fan.dom.MutationRec.prototype.m_removed = null;
fan.dom.MutationRec.prototype.m_prevSibling = null;
fan.dom.MutationRec.prototype.m_nextSibling = null;
fan.dom.MutationRec.prototype.m_attr = null;
fan.dom.MutationRec.prototype.m_attrNs = null;
fan.dom.MutationRec.prototype.m_oldVal = null;
fan.dom.TextSel = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.TextSel.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.TextSelPeer(this);
  var $this = this;
}
fan.dom.TextSel.prototype.$typeof = function() { return fan.dom.TextSel.$type; }
fan.dom.TextSel.make = function() {
  var self = new fan.dom.TextSel();
  fan.dom.TextSel.make$(self);
  return self;
  }
fan.dom.TextSel.make$ = function(self)
{
  return;
}
fan.dom.TextSel.prototype.clear = function()
{
  return this.peer.clear(this);
}
fan.dom.TextSelPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.TextSelPeer.prototype.$ctor = function(self)
{
  this.sel = null;
}
fan.dom.TextSelPeer.prototype.clear = function(self)
{
  return this.sel.removeAllRanges();
}
fan.dom.CanvasGraphics = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.CanvasGraphics.prototype.$ctor = function() {}
fan.dom.CanvasGraphics.prototype.$typeof = function()
{
  return fan.dom.CanvasGraphics.$type;
}
fan.dom.CanvasGraphics.render = function(canvas, cb)
{
  var cx = canvas.peer.elem.getContext("2d");
  var g = new fan.dom.CanvasGraphics();
  if (!canvas.peer.m_inited)
  {
    // first time thru scale by half a pixel to avoid blurry lines
    canvas.peer.m_inited = true;
    cx.translate(0.5, 0.5);
  }
  g.cx = cx;
  cb.call(g);
}
fan.dom.CanvasGraphics.prototype.m_paint = fan.graphics.Color.m_black;
fan.dom.CanvasGraphics.prototype.paint  = function() { return this.m_paint }
fan.dom.CanvasGraphics.prototype.paint$ = function(x)
{
  this.m_paint = x;
  this.cx.fillStyle = x.asColorPaint().toStr();
  this.cx.strokeStyle = x.asColorPaint().toStr();
}
fan.dom.CanvasGraphics.prototype.m_color = fan.graphics.Color.m_black;
fan.dom.CanvasGraphics.prototype.color  = function() { return this.m_color }
fan.dom.CanvasGraphics.prototype.color$ = function(x)
{
  this.m_color = x;
  this.paint$(x);
}
fan.dom.CanvasGraphics.prototype.m_stroke = fan.graphics.Stroke.m_defVal;
fan.dom.CanvasGraphics.prototype.stroke  = function() { return this.m_stroke }
fan.dom.CanvasGraphics.prototype.stroke$  = function(x)
{
  this.m_stroke       = x;
  this.cx.lineWidth   = x.m_width;
  this.cx.lineCap     = x.m_cap.toStr();
  this.cx.lineJoin    = x.m_join == fan.graphics.StrokeJoin.m_radius ? "round" : x.m_join.toStr();
  this.cx.setLineDash(this.toStrokeDash(x.m_dash));
}
fan.dom.CanvasGraphics.prototype.toStrokeDash = function(x)
{
  if (x == null) return [];
  return fan.graphics.GeomUtil.parseFloatList(x).m_values;
}
fan.dom.CanvasGraphics.prototype.m_alpha = null
fan.dom.CanvasGraphics.prototype.alpha   = function() { return this.m_alpha }
fan.dom.CanvasGraphics.prototype.alpha$  = function(x)
{
  this.m_alpha = x;
  this.cx.globalAlpha = x;
}
fan.dom.CanvasGraphics.prototype.m_font = null
fan.dom.CanvasGraphics.prototype.font   = function() { return this.m_font }
fan.dom.CanvasGraphics.prototype.font$  = function(x)
{
  this.m_font = x;
  this.cx.font = x.toStr();
}
fan.dom.CanvasGraphics.prototype.metrics = function()
{
  return new fan.dom.CanvasFontMetrics().init(this.cx);
}
fan.dom.CanvasGraphics.prototype.path = function()
{
  this.cx.beginPath();
  var path = new fan.dom.CanvasGraphicsPath();
  path.cx = this.cx;
  return path;
}
fan.dom.CanvasGraphics.prototype.drawLine = function(x1, y1, x2, y2)
{
  this.cx.beginPath();
  this.cx.moveTo(x1, y1);
  this.cx.lineTo(x2, y2);
  this.cx.stroke();
  return this;
}
fan.dom.CanvasGraphics.prototype.drawRect = function(x, y, w, h)
{
  this.cx.strokeRect(x, y, w, h);
  return this;
}
fan.dom.CanvasGraphics.prototype.fillRect = function(x, y, w, h)
{
  this.cx.fillRect(x, y, w, h);
  return this;
}
fan.dom.CanvasGraphics.prototype.clipRect = function(x, y, w, h)
{
  this.cx.rect(x, y, w, h)
  this.cx.clip();
  return this;
}
fan.dom.CanvasGraphics.prototype.drawRoundRect = function(x, y, w, h, wArc, hArc)
{
  this.pathRoundRect(x, y, w, h, wArc, hArc);
  this.cx.stroke();
  return this;
}
fan.dom.CanvasGraphics.prototype.fillRoundRect = function(x, y, w, h, wArc, hArc)
{
  this.pathRoundRect(x, y, w, h, wArc, hArc);
  this.cx.fill();
  return this;
}
fan.dom.CanvasGraphics.prototype.pathRoundRect = function(x, y, w, h, wArc, hArc)
{
  this.cx.beginPath();
  this.cx.moveTo(x + wArc, y);
  this.cx.lineTo(x + w - wArc, y);
  this.cx.quadraticCurveTo(x + w, y, x + w, y + hArc);
  this.cx.lineTo(x + w, y + h - hArc);
  this.cx.quadraticCurveTo(x + w, y + h , x + w - wArc, y + h);
  this.cx.lineTo(x + wArc, y + h);
  this.cx.quadraticCurveTo(x, y + h , x, y + h - hArc);
  this.cx.lineTo(x, y + hArc);
  this.cx.quadraticCurveTo(x, y, x + wArc, y);
}
fan.dom.CanvasGraphics.prototype.drawText = function (s, x, y)
{
  this.cx.fillText(s, x, y);
  return this;
}
fan.dom.CanvasGraphics.prototype.drawImage = function (img, x, y, w, h)
{
  if (w === undefined) w = img.w();
  if (h === undefined) h = img.h();
  this.cx.drawImage(img.peer.elem, x, y, w, h);
  return this;
}
fan.dom.CanvasGraphics.prototype.drawImageRegion = function (img, src, dst)
{
  this.cx.drawImage(img.peer.elem,
    src.m_x, src.m_y, src.m_w, src.m_h,
    dst.m_x, dst.m_y, dst.m_w, dst.m_h);
  return this;
}
fan.dom.CanvasGraphics.prototype.translate = function (x, y)
{
  this.cx.translate(x, y);
  return this;
}
fan.dom.CanvasGraphics.prototype.transform = function (t)
{
  this.cx.transform(t.m_a, t.m_b, t.m_c, t.m_d, t.m_e, t.m_f);
  return this;
}
fan.dom.CanvasGraphics.prototype.push = function (r)
{
  this.cx.save();
  if (r !== undefined)
  {
    this.cx.translate(r.m_x, r.m_y);
    this.cx.rect(0, 0, r.m_w, r.m_h);
    this.cx.clip();
  }
  var state = new Object();
  state.paint     = this.m_paint;
  state.color     = this.m_color;
  state.stroke    = this.m_stroke;
  state.alpha     = this.m_alpha;
  state.font      = this.m_font;
  this.stack.push(state);
  return this;
}
fan.dom.CanvasGraphics.prototype.pop = function ()
{
  this.cx.restore();
  var state = this.stack.pop();
  this.m_paint  = state.paint;
  this.m_color  = state.color;
  this.m_stroke = state.stroke;
  this.m_alpha  = state.alpha;
  this.m_font   = state.font;
  return this;
}
fan.dom.CanvasGraphics.prototype.stack = new Array();
fan.dom.CanvasGraphicsPath = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.CanvasGraphicsPath.prototype.$ctor = function() {}
fan.dom.CanvasGraphicsPath.prototype.$typeof = function()
{
  return fan.dom.CanvasGraphicsPath.$type;
}
fan.dom.CanvasGraphicsPath.prototype.cx = null;
fan.dom.CanvasGraphicsPath.prototype.draw = function()
{
  this.cx.stroke();
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.fill = function()
{
  this.cx.fill();
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.clip = function()
{
  this.cx.clip();
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.moveTo = function(x, y)
{
  this.cx.moveTo(x, y);
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.lineTo = function(x, y)
{
  this.cx.lineTo(x, y);
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.arc = function(x, y, radius, start, sweep)
{
  var startRadians = (360 - start) * Math.PI / 180;
  var endRadians = startRadians - (sweep * Math.PI / 180);
  var counterclockwise = sweep > 0;
  this.cx.arc(x, y, radius, startRadians, endRadians, counterclockwise);
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.curveTo = function(cp1x, cp1y, cp2x, cp2y, x, y)
{
  this.cx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.quadTo = function(cpx, cpy, x, y)
{
  this.cx.quadraticCurveTo(cpx, cpy, x, y);
  return this;
}
fan.dom.CanvasGraphicsPath.prototype.close = function()
{
  this.cx.closePath();
  return this;
}
fan.dom.CanvasFontMetrics = fan.sys.Obj.$extend(fan.graphics.FontMetrics);
fan.dom.CanvasFontMetrics.prototype.$ctor = function() {}
fan.dom.CanvasFontMetrics.prototype.$typeof = function()
{
  return fan.dom.CanvasFontMetrics.$type;
}
fan.dom.CanvasFontMetrics.prototype.init = function(cx)
{
  var m = cx.measureText("Hg");
  this.cx = cx
  this.m_ascent =  Math.ceil(m.actualBoundingBoxAscent);
  this.m_descent = Math.ceil(m.actualBoundingBoxDescent);
  this.m_leading = Math.ceil(m.fontBoundingBoxAscent) - this.m_ascent;
  this.m_height = this.m_leading + this.m_ascent + this.m_descent;
  return this;
}
fan.dom.CanvasFontMetrics.prototype.height = function() { return this.m_height; }
fan.dom.CanvasFontMetrics.prototype.leading = function() { return this.m_leading; }
fan.dom.CanvasFontMetrics.prototype.ascent = function() { return this.m_ascent; }
fan.dom.CanvasFontMetrics.prototype.descent = function() { return this.m_descent; }
fan.dom.CanvasFontMetrics.prototype.width = function(str) { return this.cx.measureText(str).width; }
fan.dom.Elem = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Elem.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.dom.Elem.prototype.$typeof = function() { return fan.dom.Elem.$type; }
fan.dom.Elem.make = function(tagName,ns) {
  var self = new fan.dom.Elem();
  fan.dom.Elem.make$(self,tagName,ns);
  return self;
  }
fan.dom.Elem.make$ = function(self,tagName,ns)
{
  if (tagName === undefined) tagName = "div";
  if (ns === undefined) ns = null;
  self._make(tagName,ns);
  return;
}
fan.dom.Elem.prototype._make = function(tagName,ns)
{
  return this.peer._make(this,tagName,ns);
}
fan.dom.Elem.fromNative = function(elem,type)
{
  if (type === undefined) type = fan.dom.Elem.$type;
  return fan.dom.ElemPeer.fromNative(elem,type);
}
fan.dom.Elem.fromHtml = function(html)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.dom.$clos$_u1,
    function(it)
    {
      it.html$(html);
      return;
    })),fan.dom.Elem.$type).firstChild(),fan.dom.Elem.$type);
}
fan.dom.Elem.prototype.ns = function()
{
  return this.peer.ns(this);
}
fan.dom.Elem.prototype.tagName = function()
{
  return this.peer.tagName(this);
}
fan.dom.Elem.prototype.id = function()
{
  return this.attr("id");
}
fan.dom.Elem.prototype.id$ = function(it)
{
  this.setAttr("id",it);
  return;
}
fan.dom.Elem.prototype.style = function()
{
  return this.peer.style(this);
}
fan.dom.Elem.prototype.text = function()
{
  return this.peer.text(this);
}
fan.dom.Elem.prototype.text$ = function(it)
{
  return this.peer.text$(this,it);
}
fan.dom.Elem.prototype.html = function()
{
  return this.peer.html(this);
}
fan.dom.Elem.prototype.html$ = function(it)
{
  return this.peer.html$(this,it);
}
fan.dom.Elem.prototype.enabled = function()
{
  return this.peer.enabled(this);
}
fan.dom.Elem.prototype.enabled$ = function(it)
{
  return this.peer.enabled$(this,it);
}
fan.dom.Elem.prototype.attrs = function()
{
  return this.peer.attrs(this);
}
fan.dom.Elem.prototype.attr = function($name)
{
  return this.peer.attr(this,$name);
}
fan.dom.Elem.prototype.setAttr = function($name,val,ns)
{
  if (ns === undefined) ns = null;
  return this.peer.setAttr(this,$name,val,ns);
}
fan.dom.Elem.prototype.removeAttr = function($name)
{
  return this.peer.removeAttr(this,$name);
}
fan.dom.Elem.prototype.get = function($name)
{
  return this.attr($name);
}
fan.dom.Elem.prototype.set = function($name,val)
{
  this.setAttr($name,val);
  return;
}
fan.dom.Elem.prototype.prop = function($name)
{
  return this.peer.prop(this,$name);
}
fan.dom.Elem.prototype.setProp = function($name,val)
{
  return this.peer.setProp(this,$name,val);
}
fan.dom.Elem.prototype.trap = function($name,args)
{
  if (args === undefined) args = null;
  return this.peer.trap(this,$name,args);
}
fan.dom.Elem.prototype.invoke = function($name,args)
{
  if (args === undefined) args = null;
  return this.peer.invoke(this,$name,args);
}
fan.dom.Elem.prototype.pos = function()
{
  return this.peer.pos(this);
}
fan.dom.Elem.prototype.pos$ = function(it)
{
  return this.peer.pos$(this,it);
}
fan.dom.Elem.prototype.pagePos = function()
{
  return this.peer.pagePos(this);
}
fan.dom.Elem.prototype.relPos = function(p)
{
  var pp = this.pagePos();
  return fan.graphics.Point.make(fan.sys.Float.minus(p.m_x,pp.m_x),fan.sys.Float.minus(p.m_y,pp.m_y));
}
fan.dom.Elem.prototype.size = function()
{
  return this.peer.size(this);
}
fan.dom.Elem.prototype.size$ = function(it)
{
  return this.peer.size$(this,it);
}
fan.dom.Elem.prototype.scrollPos = function()
{
  return this.peer.scrollPos(this);
}
fan.dom.Elem.prototype.scrollPos$ = function(it)
{
  return this.peer.scrollPos$(this,it);
}
fan.dom.Elem.prototype.scrollSize = function()
{
  return this.peer.scrollSize(this);
}
fan.dom.Elem.prototype.scrollIntoView = function(alignToTop)
{
  if (alignToTop === undefined) alignToTop = true;
  return this.peer.scrollIntoView(this,alignToTop);
}
fan.dom.Elem.prototype.renderCanvas = function(f)
{
  fan.dom.CanvasGraphics.render(this,f);
  return;
}
fan.dom.Elem.prototype.parent = function()
{
  return this.peer.parent(this);
}
fan.dom.Elem.prototype.hasChildren = function()
{
  return this.peer.hasChildren(this);
}
fan.dom.Elem.prototype.children = function()
{
  return this.peer.children(this);
}
fan.dom.Elem.prototype.firstChild = function()
{
  return this.peer.firstChild(this);
}
fan.dom.Elem.prototype.lastChild = function()
{
  return this.peer.lastChild(this);
}
fan.dom.Elem.prototype.prevSibling = function()
{
  return this.peer.prevSibling(this);
}
fan.dom.Elem.prototype.nextSibling = function()
{
  return this.peer.nextSibling(this);
}
fan.dom.Elem.prototype.containsChild = function(elem)
{
  return this.peer.containsChild(this,elem);
}
fan.dom.Elem.prototype.querySelector = function(selectors)
{
  return this.peer.querySelector(this,selectors);
}
fan.dom.Elem.prototype.querySelectorAll = function(selectors)
{
  return this.peer.querySelectorAll(this,selectors);
}
fan.dom.Elem.prototype.clone = function(deep)
{
  if (deep === undefined) deep = true;
  return this.peer.clone(this,deep);
}
fan.dom.Elem.prototype.add = function(child)
{
  this.addChild(child);
  this.onAdd(child);
  child.onParent(this);
  return this;
}
fan.dom.Elem.prototype.insertBefore = function(child,ref)
{
  this.insertChildBefore(child,ref);
  this.onAdd(child);
  child.onParent(this);
  return this;
}
fan.dom.Elem.prototype.replace = function(oldChild,newChild)
{
  this.replaceChild(oldChild,newChild);
  oldChild.onUnparent(this);
  this.onRemove(oldChild);
  this.onAdd(newChild);
  newChild.onParent(this);
  return this;
}
fan.dom.Elem.prototype.remove = function(child)
{
  this.removeChild(child);
  child.onUnparent(this);
  this.onRemove(child);
  return this;
}
fan.dom.Elem.prototype.addAll = function(elems)
{
  var $this = this;
  elems.each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u2,
    function(e)
    {
      $this.add(e);
      return;
    }));
  return this;
}
fan.dom.Elem.prototype.removeAll = function()
{
  var $this = this;
  this.children().each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u3,
    function(kid)
    {
      $this.remove(kid);
      return;
    }));
  return this;
}
fan.dom.Elem.prototype.addChild = function(child)
{
  return this.peer.addChild(this,child);
}
fan.dom.Elem.prototype.insertChildBefore = function(child,ref)
{
  return this.peer.insertChildBefore(this,child,ref);
}
fan.dom.Elem.prototype.replaceChild = function(oldChild,newChild)
{
  return this.peer.replaceChild(this,oldChild,newChild);
}
fan.dom.Elem.prototype.removeChild = function(child)
{
  return this.peer.removeChild(this,child);
}
fan.dom.Elem.prototype.onParent = function(parent)
{
  return;
}
fan.dom.Elem.prototype.onUnparent = function(parent)
{
  return;
}
fan.dom.Elem.prototype.onAdd = function(child)
{
  return;
}
fan.dom.Elem.prototype.onRemove = function(child)
{
  return;
}
fan.dom.Elem.prototype.hasFocus = function()
{
  return this.peer.hasFocus(this);
}
fan.dom.Elem.prototype.focus = function()
{
  return this.peer.focus(this);
}
fan.dom.Elem.prototype.blur = function()
{
  return this.peer.blur(this);
}
fan.dom.Elem.prototype.onEvent = function(type,useCapture,handler)
{
  return this.peer.onEvent(this,type,useCapture,handler);
}
fan.dom.Elem.prototype.removeEvent = function(type,useCapture,handler)
{
  return this.peer.removeEvent(this,type,useCapture,handler);
}
fan.dom.Elem.prototype.transition = function(props,opts,dur,onComplete)
{
  if (onComplete === undefined) onComplete = null;
  var $this = this;
  var x = this.size();
  var style = this.style();
  if (opts != null)
  {
    style.setAll(fan.sys.ObjUtil.coerce(opts,fan.sys.Type.find("[sys::Str:sys::Obj?]")));
  }
  ;
  style.trap("transitionDuration",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[dur]));
  style.trap("transitionProperty",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.dom.Style.toVendors(props.keys()).join(", ")]));
  props.each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u4,
    function(val,prop)
    {
      style.set(prop,val);
      return;
    }));
  if (onComplete != null)
  {
    fan.dom.Win.cur().setTimeout(dur,fan.sys.Func.make$closure(
      fan.dom.$clos$_u5,
      function(it)
      {
        onComplete.call($this);
        return;
      }));
  }
  ;
  return;
}
fan.dom.Elem.prototype.animateStart = function(frames,opts,dur)
{
  if (opts != null)
  {
    this.style().setAll(fan.sys.ObjUtil.coerce(opts,fan.sys.Type.find("[sys::Str:sys::Obj?]")));
  }
  ;
  this.style().trap("animationName",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[frames.m_$name]));
  this.style().trap("animationDuration",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[dur]));
  return;
}
fan.dom.Elem.prototype.animateStop = function()
{
  this.style().trap("animation",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
  return;
}
fan.dom.Elem.prototype.m_id = null;
fan.dom.ElemPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.ElemPeer.prototype.$ctor = function(self)
{
  this.m_pos  = fan.graphics.Point.m_defVal;
  this.m_size = fan.graphics.Size.m_defVal;
}
fan.dom.ElemPeer.prototype._make = function(self, tagName, ns)
{
  // short-circut for wrap()
  if (tagName === undefined) return;
  var doc  = fan.dom.Win.cur().doc().peer.doc;
  var elem = ns
     ? doc.createElementNS(ns.toStr(), tagName)
     : doc.createElement(tagName);
  this.elem = elem;
  this.elem._fanElem = self;
  // optimziation hooks for non-html namespaces
  if (ns)
  {
    if (ns.toStr() == "http://www.w3.org/2000/svg") this.$svg = true;
  }
}
fan.dom.ElemPeer.fromNative = function(obj, type)
{
  if (obj instanceof fan.dom.Elem) return obj;
  return fan.dom.ElemPeer.wrap(obj, type.make());
}
fan.dom.ElemPeer.wrap = function(elem, fanElem)
{
  if (elem == null) throw fan.sys.ArgErr.make("elem is null")
  if (elem._fanElem != undefined)
    return elem._fanElem;
  if (fanElem && !(fanElem instanceof fan.dom.Elem))
    throw fan.sys.ArgErr.make("Type does not subclass Elem: " + fanElem);
  var x = fanElem || fan.dom.Elem.make();
  x.peer.elem = elem;
  elem._fanElem = x;
  return x;
}
fan.dom.ElemPeer.prototype.ns = function(self)
{
  var ns = this.elem.namespaceURI;
  return fan.sys.Uri.fromStr(ns);
}
fan.dom.ElemPeer.prototype.tagName = function(self) { return fan.sys.Str.lower(this.elem.nodeName); }
fan.dom.ElemPeer.prototype.style = function(self)
{
  if (this.$style == null)
  {
    this.$style = fan.dom.Style.make();
    this.$style.peer.elem  = this.elem;
    this.$style.peer.style = this.elem.style;
    // polyfill for IE11/Edge with SVG nodes
    if (this.$svg && !this.elem.classList)
      this.elem.classList = new fan.dom.StylePeer.polyfillClassList(this.elem);
  }
  return this.$style;
}
fan.dom.ElemPeer.prototype.text  = function(self) { return this.elem.textContent; }
fan.dom.ElemPeer.prototype.text$ = function(self, val) { this.elem.textContent = val; }
fan.dom.ElemPeer.prototype.html  = function(self) { return this.elem.innerHTML; }
fan.dom.ElemPeer.prototype.html$ = function(self, val) { this.elem.innerHTML = val; }
fan.dom.ElemPeer.prototype.enabled  = function(self)
{
  if (this.elem.disabled === undefined) return null;
  return !this.elem.disabled;
}
fan.dom.ElemPeer.prototype.enabled$ = function(self, val)
{
  if (this.elem.disabled === undefined) return;
  this.elem.disabled = !val;
}
fan.dom.ElemPeer.prototype.attrs = function(self)
{
  var map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  map.m_caseInsensitive = true;
  var attrs = this.elem.attributes;
  for(var i=0; i<attrs.length; i++)
  {
    map.set(attrs[i].name, attrs[i].value);
  }
  return map;
}
fan.dom.ElemPeer.prototype.attr = function(self, name)
{
  return this.elem.getAttribute(name);
}
fan.dom.ElemPeer.prototype.setAttr = function(self, name, val, ns)
{
  if (val == null)
    this.elem.removeAttribute(name);
  else
  {
    if (ns == null)
      this.elem.setAttribute(name, val);
    else
      this.elem.setAttributeNS(ns.toStr(), name, val);
  }
  return self;
}
fan.dom.ElemPeer.prototype.removeAttr = function(self, name)
{
  this.elem.removeAttribute(name);
  return self;
}
fan.dom.ElemPeer.prototype.prop = function(self, name)
{
  if (fan.dom.ElemPeer.propHooks[name])
    return fan.dom.ElemPeer.propHooks[name](this);
  return this.elem[name];
}
fan.dom.ElemPeer.prototype.setProp = function(self, name, val)
{
  this.elem[name] = val;
  return self;
}
fan.dom.ElemPeer.propHooks = {
  contentWindow: function(peer)
  {
    var v = peer.elem.contentWindow;
    if (v == null) return null;
    var w = fan.dom.Win.make();
    w.peer.win = v;
    return w
  },
  files: function(peer)
  {
    var f = peer.elem.files;
    if (f == null) return null;
    var list = fan.sys.List.make(fan.dom.DomFile.$type);
    for (var i=0; i<f.length; i++) list.add(fan.dom.DomFilePeer.wrap(f[i]));
    return list;
  }
}
fan.dom.ElemPeer.prototype.trap = function(self, name, args)
{
  if (this.$svg) return fan.dom.Svg.doTrap(self, name, args);
  if (args == null || args.isEmpty()) return this.prop(self, name);
  this.setProp(self, name, args.first());
  return null;
}
fan.dom.ElemPeer.prototype.invoke = function(self, name, args)
{
  var f = this.elem[name];
  // verify propery is actually a function
  if (typeof f != 'function')
    throw fan.sys.ArgErr.make(name + " is not a function");
  // map fantom objects to js natives
  var arglist = null;
  if (args != null)
  {
    // TODO :)
    arglist = [];
    for (var i=0; i<args.size(); i++)
      arglist.push(args.get(i));
  }
  return f.apply(this.elem, arglist);
}
fan.dom.ElemPeer.prototype.pos = function(self)
{
  var x = this.elem.offsetLeft;
  var y = this.elem.offsetTop;
  if (this.m_pos.m_x != x || this.m_pos.m_y != y)
    this.m_pos = fan.graphics.Point.makeInt(x, y);
  return this.m_pos;
}
fan.dom.ElemPeer.prototype.pos$ = function(self, val)
{
  this.m_pos = fan.graphics.Point.makeInt(val.m_x, val.m_y);
  this.elem.style.left = val.m_x + "px";
  this.elem.style.top  = val.m_y + "px";
}
fan.dom.ElemPeer.prototype.pagePos = function(self)
{
  var r = this.elem.getBoundingClientRect();
  var x = Math.round(r.left);
  var y = Math.round(r.top);
  return fan.graphics.Point.makeInt(x, y);
}
fan.dom.ElemPeer.prototype.size = function(self)
{
  var w = this.elem.offsetWidth  || 0;
  var h = this.elem.offsetHeight || 0;
  if (this.m_size.m_w != w || this.m_size.m_h != h)
    this.m_size = fan.graphics.Size.makeInt(w, h);
  return this.m_size;
}
fan.dom.ElemPeer.prototype.size$ = function(self, val)
{
  this.m_size = fan.graphics.Size.makeInt(val.m_w, val.m_h);
  this.elem.style.width  = val.m_w + "px";
  this.elem.style.height = val.m_h + "px";
}
fan.dom.ElemPeer.prototype.scrollPos = function(self)
{
  var x = this.elem.scrollLeft;
  var y = this.elem.scrollTop;
  if (!this.m_scrollPos || this.m_scrollPos.m_x != x || this.m_scrollPos.m_y != y)
    this.m_scrollPos = fan.graphics.Point.makeInt(x, y);
  return this.m_scrollPos;
}
fan.dom.ElemPeer.prototype.scrollPos$ = function(self, val)
{
  this.m_scrollPos = fan.graphics.Point.makeInt(val.m_x, val.m_y);
  this.elem.scrollLeft = val.m_x;
  this.elem.scrollTop  = val.m_y;
}
fan.dom.ElemPeer.prototype.scrollSize = function(self)
{
  var w = this.elem.scrollWidth;
  var h = this.elem.scrollHeight;
  if (!this.m_scrollSize || this.m_scrollSize.m_w != w || this.m_size.m_h != h)
    this.m_scrollSize = fan.graphics.Size.makeInt(w, h);
  return this.m_scrollSize;
}
fan.dom.ElemPeer.prototype.scrollIntoView = function(self, alignToTop)
{
  this.elem.scrollIntoView(alignToTop);
}
fan.dom.ElemPeer.prototype.parent = function(self)
{
  if (this.elem.nodeName == "BODY") return null;
  var parent = this.elem.parentNode;
  if (parent == null) return null;
  return fan.dom.ElemPeer.wrap(parent);
}
fan.dom.ElemPeer.prototype.hasChildren = function(self)
{
  return this.elem.childElementCount > 0;
}
fan.dom.ElemPeer.prototype.children = function(self)
{
  var list = new Array();
  var kids = this.elem.childNodes;
  for (var i=0; i<kids.length; i++)
    if (kids[i].nodeType == 1)
      list.push(fan.dom.ElemPeer.wrap(kids[i]));
  return fan.sys.List.make(fan.dom.Elem.$type, list);
}
fan.dom.ElemPeer.prototype.firstChild = function(self)
{
  var kids = this.elem.childNodes;
  for (var i=0; i<kids.length; i++)
    if (kids[i].nodeType == 1)
      return fan.dom.ElemPeer.wrap(kids[i]);
  return null;
}
fan.dom.ElemPeer.prototype.lastChild = function(self)
{
  var kids = this.elem.childNodes;
  for (var i=kids.length-1; i>=0; i--)
    if (kids[i].nodeType == 1)
      return fan.dom.ElemPeer.wrap(kids[i]);
  return null;
}
fan.dom.ElemPeer.prototype.prevSibling = function(self)
{
  var sib = this.elem.previousSibling;
  while (sib != null && sib.nodeType != 1)
    sib = sib.previousSibling;
  if (sib == null) return null;
  return fan.dom.ElemPeer.wrap(sib);
}
fan.dom.ElemPeer.prototype.nextSibling = function(self)
{
  var sib = this.elem.nextSibling;
  while (sib != null && sib.nodeType != 1)
    sib = sib.nextSibling;
  if (sib == null) return null;
  return fan.dom.ElemPeer.wrap(sib);
}
fan.dom.ElemPeer.prototype.containsChild = function(self, test)
{
  return this.elem.contains(test.peer.elem);
}
fan.dom.ElemPeer.prototype.querySelector = function(self, selectors)
{
  var elem = this.elem.querySelector(selectors);
  if (elem == null) return null;
  return fan.dom.ElemPeer.wrap(elem);
}
fan.dom.ElemPeer.prototype.querySelectorAll = function(self, selectors)
{
  var list  = fan.sys.List.make(fan.dom.Elem.$type);
  var elems = this.elem.querySelectorAll(selectors);
  for (var i=0; i<elems.length; i++)
    list.add(fan.dom.ElemPeer.wrap(elems[i]));
  return list;
}
fan.dom.ElemPeer.prototype.clone = function(self, deep)
{
  var clone = this.elem.cloneNode(deep);
  return fan.dom.ElemPeer.wrap(clone);
}
fan.dom.ElemPeer.prototype.addChild = function(self, child)
{
  this.elem.appendChild(child.peer.elem);
}
fan.dom.ElemPeer.prototype.insertChildBefore = function(self, child, ref)
{
  this.elem.insertBefore(child.peer.elem, ref.peer.elem);
}
fan.dom.ElemPeer.prototype.replaceChild = function(self, oldChild, newChild)
{
  this.elem.replaceChild(newChild.peer.elem, oldChild.peer.elem);
}
fan.dom.ElemPeer.prototype.removeChild = function(self, child)
{
  this.elem.removeChild(child.peer.elem);
}
fan.dom.ElemPeer.prototype.hasFocus = function(self)
{
  return this.elem === document.activeElement;
}
fan.dom.ElemPeer.prototype.focus = function(self)
{
  // IE throws err if element is not visible, so we need
  // to wrap in a try block
  try { this.elem.focus(); }
  catch (err) {} // ignore
}
fan.dom.ElemPeer.prototype.blur = function(self)
{
  this.elem.blur();
}
fan.dom.ElemPeer.prototype.find = function(self, f)
{
  var kids = this.children(self);
  for (var i=0; i<kids.length; i++)
  {
    var kid = kids[i];
    if (f.call(kid)) return kid;
    kid = kid.find(f);
    if (kid != null) return kid;
  }
  return null;
}
fan.dom.ElemPeer.prototype.findAll = function(self, f, acc)
{
  if (acc == null) acc = new Array();
  var kids = this.children(self);
  for (var i=0; i<kids.length; i++)
  {
    var kid = kids[i];
    if (f.call(kid)) acc.push(kid);
    kid.findAll(f, acc);
  }
  return acc;
}
fan.dom.ElemPeer.prototype.onEvent = function(self, type, useCapture, handler)
{
  handler.$func = function(e) { handler.call(fan.dom.EventPeer.make(e)); }
  this.elem.addEventListener(type, handler.$func, useCapture);
  return handler;
}
fan.dom.ElemPeer.prototype.removeEvent = function(self, type, useCapture, handler)
{
  if (handler.$func)
    this.elem.removeEventListener(type, handler.$func, useCapture);
}
fan.dom.ElemPeer.prototype.toStr = function(self)
{
  var name = this.elem.nodeName;
  var type = this.elem.type;
  var id   = this.elem.id;
  var str  = "<" + fan.sys.Str.lower(name);
  if (type != null && type.length > 0) str += " type='" + type + "'";
  if (id != null && id.length > 0) str += " id='" + id + "'"
  str += ">";
  return str;
}
fan.dom.Style = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Style.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.StylePeer(this);
  var $this = this;
}
fan.dom.Style.prototype.$typeof = function() { return fan.dom.Style.$type; }
fan.dom.Style.make = function() {
  var self = new fan.dom.Style();
  fan.dom.Style.make$(self);
  return self;
  }
fan.dom.Style.make$ = function(self)
{
  return;
}
fan.dom.Style.prototype.classes = function()
{
  return this.peer.classes(this);
}
fan.dom.Style.prototype.classes$ = function(it)
{
  return this.peer.classes$(this,it);
}
fan.dom.Style.prototype.hasClass = function($name)
{
  return this.peer.hasClass(this,$name);
}
fan.dom.Style.prototype.addClass = function($name)
{
  return this.peer.addClass(this,$name);
}
fan.dom.Style.prototype.removeClass = function($name)
{
  return this.peer.removeClass(this,$name);
}
fan.dom.Style.prototype.toggleClass = function($name,cond)
{
  if (cond === undefined) cond = null;
  if (fan.sys.ObjUtil.coerce((function($this) { var $_u6 = (function($this) { var $_u7 = cond; if ($_u7 == null) return null; return fan.sys.Bool.not($_u7); })($this); if ($_u6 != null) return $_u6; return fan.sys.ObjUtil.coerce($this.hasClass($name),fan.sys.Bool.$type.toNullable()); })(this),fan.sys.Bool.$type))
  {
    this.removeClass($name);
  }
  else
  {
    this.addClass($name);
  }
  ;
  return this;
}
fan.dom.Style.prototype.addPseudoClass = function($name,css)
{
  var $this = this;
  if (!fan.sys.Str.startsWith($name,":"))
  {
    throw fan.sys.ArgErr.make("Pseudo-class name must start with ':'");
  }
  ;
  var key = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",$name),"/"),css);
  var cls = fan.dom.Style.pseudoCache().get(key);
  if (cls == null)
  {
    cls = fan.sys.Str.plus("dom-style-autogen-",fan.sys.ObjUtil.coerce(fan.dom.Style.m_counter.getAndIncrement(),fan.sys.Obj.$type.toNullable()));
    fan.dom.Win.cur().doc().head().add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("style"),fan.sys.Func.make$closure(
      fan.dom.$clos$_u1,
      function(it)
      {
        it.trap("type",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["text/css"]));
        it.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(".",cls),""),$name)," { "),css)," }"));
        return;
      })),fan.dom.Elem.$type));
    fan.dom.Style.pseudoCache().set(key,fan.sys.ObjUtil.coerce(cls,fan.sys.Str.$type));
  }
  ;
  this.addClass(fan.sys.ObjUtil.coerce(cls,fan.sys.Str.$type));
  return fan.sys.ObjUtil.coerce(cls,fan.sys.Str.$type);
}
fan.dom.Style.prototype.clear = function()
{
  return this.peer.clear(this);
}
fan.dom.Style.prototype.computed = function($name)
{
  return this.peer.computed(this,$name);
}
fan.dom.Style.prototype.effective = function($name)
{
  return this.peer.effective(this,$name);
}
fan.dom.Style.prototype.get = function($name)
{
  return this.peer.get(this,$name);
}
fan.dom.Style.prototype.set = function($name,val)
{
  var $this = this;
  if (val == null)
  {
    this.setProp($name,null);
    return this;
  }
  ;
  var sval = "";
  var $_u8 = (function($this) { var $_u9 = val; if ($_u9 == null) return null; return fan.sys.ObjUtil.$typeof($_u9); })(this);
  if (fan.sys.ObjUtil.equals($_u8,fan.sys.Duration.$type))
  {
    sval = fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.trap(val,"toMillis",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))),"ms");
  }
  else
  {
    sval = fan.sys.ObjUtil.toStr(val);
  }
  ;
  if (fan.dom.Style.m_vendor.containsKey($name))
  {
    this.setProp(fan.sys.Str.plus("-webkit-",$name),sval);
    this.setProp(fan.sys.Str.plus("-moz-",$name),sval);
    this.setProp(fan.sys.Str.plus("-ms-",$name),sval);
  }
  ;
  if (fan.dom.Style.m_vendorVals.any(fan.sys.Func.make$closure(
    fan.dom.$clos$_u10,
    function(v)
    {
      return fan.sys.Str.startsWith(sval,v);
    })))
  {
    this.setProp($name,fan.sys.Str.plus("-webkit-",sval));
    this.setProp($name,fan.sys.Str.plus("-moz-",sval));
    this.setProp($name,fan.sys.Str.plus("-ms-",sval));
  }
  ;
  this.setProp($name,sval);
  return this;
}
fan.dom.Style.prototype.setAll = function(map)
{
  var $this = this;
  map.each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u11,
    function(v,n)
    {
      $this.set(n,v);
      return;
    }));
  return this;
}
fan.dom.Style.prototype.setCss = function(css)
{
  var $this = this;
  fan.sys.Str.split(css,fan.sys.ObjUtil.coerce(59,fan.sys.Int.$type.toNullable())).each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u12,
    function(s)
    {
      if (fan.sys.Str.isEmpty(s))
      {
        return;
      }
      ;
      var i = fan.sys.Str.index(s,":");
      var n = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),true)));
      var v = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),1),-1)));
      $this.set(n,v);
      return;
    }));
  return this;
}
fan.dom.Style.prototype.trap = function($name,args)
{
  if (args === undefined) args = null;
  $name = this.fromCamel($name);
  if ((args == null || args.isEmpty()))
  {
    return this.get($name);
  }
  ;
  this.set($name,args.first());
  return null;
}
fan.dom.Style.prototype.setProp = function($name,val)
{
  return this.peer.setProp(this,$name,val);
}
fan.dom.Style.prototype.fromCamel = function(s)
{
  var $this = this;
  var h = fan.sys.StrBuf.make();
  fan.sys.Str.each(s,fan.sys.Func.make$closure(
    fan.dom.$clos$_u13,
    function(ch)
    {
      if (fan.sys.Int.isUpper(ch))
      {
        h.addChar(45).addChar(fan.sys.Int.lower(ch));
      }
      else
      {
        h.addChar(ch);
      }
      ;
      return;
    }));
  return h.toStr();
}
fan.dom.Style.toVendors = function(names)
{
  var $this = this;
  var acc = fan.sys.List.make(fan.sys.Str.$type);
  names.each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u14,
    function(n)
    {
      acc.addAll(fan.dom.Style.toVendor(n));
      return;
    }));
  return acc;
}
fan.dom.Style.toVendor = function($name)
{
  if (fan.dom.Style.m_vendor.containsKey($name))
  {
    var w = fan.dom.Win.cur();
    if (w.m_isWebkit)
    {
      return fan.sys.List.make(fan.sys.Str.$type, [fan.sys.Str.plus("-webkit-",$name)]);
    }
    ;
    if (w.m_isFirefox)
    {
      return fan.sys.List.make(fan.sys.Str.$type, [fan.sys.Str.plus("-moz-",$name),$name]);
    }
    ;
    if (w.m_isIE)
    {
      return fan.sys.List.make(fan.sys.Str.$type, [fan.sys.Str.plus("-ms-",$name),$name]);
    }
    ;
  }
  ;
  return fan.sys.List.make(fan.sys.Str.$type, [$name]);
}
fan.dom.Style.pseudoCache = function()
{
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.as(fan.dom.Style.m_pseudoCacheRef.val(),fan.sys.Unsafe.$type).val(),fan.sys.Type.find("[sys::Str:sys::Str]"));
}
fan.dom.Style.static$init = function()
{
  fan.dom.Style.m_vendor = fan.sys.ObjUtil.coerce((function($this) { var $_u15 = fan.sys.ObjUtil.coerce(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Obj"),fan.sys.Type.find("sys::Obj?")).setList(fan.sys.List.make(fan.sys.Str.$type, ["align-content","align-items","animation","animation-delay","animation-direction","animation-duration","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","animation-fill-mode","flex","flex-direction","flex-wrap","justify-content","transform","user-select"])),fan.sys.Type.find("[sys::Str:sys::Str[]]")); if ($_u15 == null) return null; return fan.sys.ObjUtil.toImmutable($_u15); })(this),fan.sys.Type.find("[sys::Str:sys::Str[]]"));
  fan.dom.Style.m_vendorVals = fan.sys.ObjUtil.coerce((function($this) { var $_u16 = fan.sys.List.make(fan.sys.Str.$type, ["linear-gradient"]); if ($_u16 == null) return null; return fan.sys.ObjUtil.toImmutable($_u16); })(this),fan.sys.Type.find("sys::Str[]"));
  fan.dom.Style.m_counter = fan.concurrent.AtomicInt.make(0);
  fan.dom.Style.m_pseudoCacheRef = fan.concurrent.AtomicRef.make(fan.sys.Unsafe.make(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"))));
  return;
}
fan.dom.Style.m_vendor = null;
fan.dom.Style.m_vendorVals = null;
fan.dom.Style.m_counter = null;
fan.dom.Style.m_pseudoCacheRef = null;
fan.dom.StylePeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.StylePeer.prototype.$ctor = function(self)
{
  // set in ElemPeer.style
  this.elem  = null;
  this.style = null;
}
fan.dom.StylePeer.prototype.classes  = function(self)
{
  return fan.sys.List.make(fan.sys.Str.$type, this.elem.classList);
}
fan.dom.StylePeer.prototype.classes$ = function(self, val)
{
  this.elem.className = val.join(" ");
  return this.classes();
}
fan.dom.StylePeer.prototype.hasClass = function(self, className)
{
  return this.elem.classList.contains(className);
}
fan.dom.StylePeer.prototype.addClass = function(self, className)
{
  // split for legacy support for addClass("x y z")
  var arr = className.split(" ");
  for (var i=0; i<arr.length; i++) this.elem.classList.add(arr[i]);
  return self;
}
fan.dom.StylePeer.prototype.removeClass = function(self, className)
{
  // split for legacy support for removeClass("x y z")
  var arr = className.split(" ");
  for (var i=0; i<arr.length; i++) this.elem.classList.remove(arr[i]);
  return self;
}
fan.dom.StylePeer.prototype.clear = function(self)
{
  this.style.cssText = "";
  return self;
}
fan.dom.StylePeer.prototype.computed = function(self, name)
{
  if (!this.elem) return null;
  return window.getComputedStyle(this.elem).getPropertyValue(name);
}
fan.dom.StylePeer.prototype.effective = function(self, name)
{
  if (!this.elem) return null;
  // inline style rule always wins
  var val = this.get(self, name);
  if (val != null && val != "") return val;
  // else walk sheets
  var matches = [];
  for (var i=0; i<document.styleSheets.length; i++)
  {
    // it is a security exception to introspect the rules of a
    // stylesheet that was loaded from a different domain than
    // the current document; so just silently ignore those rules
    var sheet = document.styleSheets[i];
    var rules;
    try { rules = sheet.rules || sheet.cssRules || []; }
    catch (err) { rules = []; }
    for (var r=0; r<rules.length; r++)
    {
      var rule = rules[r];
      if (this.elem.msMatchesSelector)
      {
        if (this.elem.msMatchesSelector(rule.selectorText))
          matches.push(rule);
      }
      else
      {
        // Safari 10 (at least) throws an err during matches() if it doesn't
        // understand the CSS selector; silently ignore these errs
        try
        {
          if (this.elem.matches(rule.selectorText))
            matches.push(rule);
        }
        catch (err) {}
      }
    }
  }
  // walk backwards to find last val
  for (var m=matches.length-1; m>=0; m--)
  {
    val = matches[m].style.getPropertyValue(name);
    if (val != null && val != "") return val;
  }
  return null;
}
fan.dom.StylePeer.prototype.get = function(self, name)
{
  return this.style.getPropertyValue(name);
}
fan.dom.StylePeer.prototype.setProp = function(self, name, val)
{
  if (val == null) this.style.removeProperty(name);
  else this.style.setProperty(name, val);
}
fan.dom.StylePeer.polyfillClassList = function(e)
{
  var elem = e;
  function list()
  {
    var attr = elem.getAttribute("class")
    return attr ? attr.split(" ") : [];
  }
  this.add = function(name)
  {
    var x = list();
    x.push(name);
    elem.setAttribute("class", x.join(" "));
  }
  this.remove = function(name)
  {
    var x = list();
    var i = x.indexOf(name);
    if (i >= 0)
    {
      x.splice(i, 1);
      elem.setAttribute("class", x.join(" "));
    }
  }
  this.contains = function(name)
  {
    return list().indexOf(name) >= 0;
  }
}
fan.dom.Svg = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Svg.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.dom.Svg.prototype.$typeof = function() { return fan.dom.Svg.$type; }
fan.dom.Svg.make = function() {
  var self = new fan.dom.Svg();
  fan.dom.Svg.make$(self);
  return self;
  }
fan.dom.Svg.make$ = function(self)
{
  return;
}
fan.dom.Svg.elem = function(tagName)
{
  return fan.dom.Elem.make(tagName,fan.dom.Svg.m_ns);
}
fan.dom.Svg.line = function(x1,y1,x2,y2)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Svg.elem("line"),fan.sys.Func.make$closure(
    fan.dom.$clos$_u1,
    function(it)
    {
      it.trap("x1",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[x1]));
      it.trap("y1",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[y1]));
      it.trap("x2",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[x2]));
      it.trap("y2",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[y2]));
      return;
    })),fan.dom.Elem.$type);
}
fan.dom.Svg.rect = function(x,y,w,h)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Svg.elem("rect"),fan.sys.Func.make$closure(
    fan.dom.$clos$_u1,
    function(it)
    {
      it.trap("x",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[x]));
      it.trap("y",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[y]));
      it.trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[w]));
      it.trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[h]));
      return;
    })),fan.dom.Elem.$type);
}
fan.dom.Svg.text = function(text,x,y)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Svg.elem("text"),fan.sys.Func.make$closure(
    fan.dom.$clos$_u1,
    function(it)
    {
      it.text$(text);
      it.trap("x",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[x]));
      it.trap("y",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[y]));
      return;
    })),fan.dom.Elem.$type);
}
fan.dom.Svg.image = function(href,x,y,w,h)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Svg.elem("image"),fan.sys.Func.make$closure(
    fan.dom.$clos$_u1,
    function(it)
    {
      it.trap("x",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(x,fan.sys.Obj.$type.toNullable())]));
      it.trap("y",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(y,fan.sys.Obj.$type.toNullable())]));
      it.trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(w,fan.sys.Obj.$type.toNullable())]));
      it.trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(h,fan.sys.Obj.$type.toNullable())]));
      it.setAttr("href",href.encode(),fan.dom.Svg.m_nsXLink);
      return;
    })),fan.dom.Elem.$type);
}
fan.dom.Svg.def = function(svgElem,defElem)
{
  var $this = this;
  if (fan.sys.ObjUtil.compareNE(svgElem.tagName(),"svg"))
  {
    throw fan.sys.Err.make(fan.sys.Str.plus("Document not <svg> element: ",svgElem.tagName()));
  }
  ;
  var defsElem = svgElem.children().find(fan.sys.Func.make$closure(
    fan.dom.$clos$_u17,
    function(kid)
    {
      return fan.sys.ObjUtil.equals(kid.tagName(),"defs");
    }));
  if (defsElem == null)
  {
    defsElem = fan.dom.Svg.elem("defs");
    if (svgElem.hasChildren())
    {
      svgElem.insertBefore(fan.sys.ObjUtil.coerce(defsElem,fan.dom.Elem.$type),fan.sys.ObjUtil.coerce(svgElem.children().first(),fan.dom.Elem.$type));
    }
    else
    {
      svgElem.add(fan.sys.ObjUtil.coerce(defsElem,fan.dom.Elem.$type));
    }
    ;
  }
  ;
  if (defElem.id() == null)
  {
    defElem.id$(fan.sys.Str.plus("def-",fan.sys.Int.toHex(fan.dom.Svg.m_genId.incrementAndGet())));
  }
  ;
  if (defElem.parent() == null)
  {
    defsElem.add(defElem);
  }
  ;
  return fan.sys.ObjUtil.coerce(defElem.id(),fan.sys.Str.$type);
}
fan.dom.Svg.defUrl = function(svgElem,defElem)
{
  return fan.sys.Str.plus(fan.sys.Str.plus("url(#",fan.dom.Svg.def(svgElem,defElem)),")");
}
fan.dom.Svg.doTrap = function(svgElem,$name,args)
{
  if (args === undefined) args = null;
  var $this = this;
  if ((args == null || args.isEmpty()))
  {
    return (function($this) { var $_u18 = svgElem.attr($name); if ($_u18 == null) return null; return fan.sys.Str.toStr($_u18); })(this);
  }
  else
  {
    var val = args.first();
    if (fan.sys.ObjUtil.equals($name,"text"))
    {
      svgElem.text$(fan.sys.ObjUtil.toStr(val));
      return null;
    }
    ;
    if (fan.sys.ObjUtil.equals($name,"font"))
    {
      if (fan.sys.ObjUtil.is(val,fan.sys.Str.$type))
      {
        val = fan.graphics.Font.fromStr(fan.sys.ObjUtil.coerce(val,fan.sys.Str.$type));
      }
      ;
      var f = fan.sys.ObjUtil.coerce(val,fan.graphics.Font.$type);
      f.toProps().each(fan.sys.Func.make$closure(
        fan.dom.$clos$_u19,
        function(v,n)
        {
          svgElem.setAttr(n,fan.sys.Str.toStr(v));
          return;
        }));
      return null;
    }
    ;
    if (fan.dom.Svg.m_camelMap.containsKey($name))
    {
      $name = fan.dom.Svg.fromCamel($name);
    }
    ;
    svgElem.setAttr($name,fan.sys.ObjUtil.toStr(val));
    return null;
  }
  ;
}
fan.dom.Svg.fromCamel = function(s)
{
  var h = fan.sys.StrBuf.make(fan.sys.Int.plus(fan.sys.Str.size(s),2));
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,fan.sys.Str.size(s)); i = fan.sys.Int.increment(i))
  {
    var ch = fan.sys.Str.get(s,i);
    if (fan.sys.Int.isUpper(ch))
    {
      h.addChar(45).addChar(fan.sys.Int.lower(ch));
    }
    else
    {
      h.addChar(ch);
    }
    ;
  }
  ;
  return h.toStr();
}
fan.dom.Svg.static$init = function()
{
  fan.dom.Svg.m_ns = fan.sys.Uri.fromStr("http://www.w3.org/2000/svg");
  fan.dom.Svg.m_nsXLink = fan.sys.Uri.fromStr("http://www.w3.org/1999/xlink");
  fan.dom.Svg.m_genId = fan.concurrent.AtomicInt.make();
  fan.dom.Svg.m_camelMap = fan.sys.ObjUtil.coerce((function($this) { var $_u20 = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")).setList(fan.sys.List.make(fan.sys.Str.$type, ["accentHeight","alignmentBaseline","baselineShift","capHeight","clipPath","clipRule","colorInterpolation","colorInterpolationFilters","colorProfile","colorRendering","dominantBaseline","enableBackground","fillOpacity","fillRule","floodColor","floodOpacity","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","glyphName","glyphOrientationHorizontal","glyphOrientationVertical","horizAdvX","horizOriginX","imageRendering","letterSpacing","lightingColor","markerEnd","markerMid","markerStart","overlinePosition","overlineThickness","panose1","paintOrder","renderingIntent","shapeRendering","stopColor","stopOpacity","strikethroughPosition","strikethroughThickness","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","textAnchor","textDecoration","textRendering","underlinePosition","underlineThickness","unicode","unicodeBidi","unicodeRange","unitsPerEm","vAlphabetic","vHanging","vIdeographic","vMathematical","values","version","vertAdvY","vertOriginX","vertOriginY","wordSpacing","xHeight"])); if ($_u20 == null) return null; return fan.sys.ObjUtil.toImmutable($_u20); })(this),fan.sys.Type.find("[sys::Str:sys::Str]"));
  return;
}
fan.dom.Svg.m_ns = null;
fan.dom.Svg.m_nsXLink = null;
fan.dom.Svg.m_genId = null;
fan.dom.Svg.m_camelMap = null;
fan.dom.DomCoord = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomCoord.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.DomCoordPeer(this);
  var $this = this;
}
fan.dom.DomCoord.prototype.$typeof = function() { return fan.dom.DomCoord.$type; }
fan.dom.DomCoord.make = function() {
  var self = new fan.dom.DomCoord();
  fan.dom.DomCoord.make$(self);
  return self;
  }
fan.dom.DomCoord.make$ = function(self)
{
  return;
}
fan.dom.DomCoord.prototype.lat = function()
{
  return this.peer.lat(this);
}
fan.dom.DomCoord.prototype.lng = function()
{
  return this.peer.lng(this);
}
fan.dom.DomCoord.prototype.accuracy = function()
{
  return this.peer.accuracy(this);
}
fan.dom.DomCoord.prototype.altitude = function()
{
  return this.peer.altitude(this);
}
fan.dom.DomCoord.prototype.altitudeAccuracy = function()
{
  return this.peer.altitudeAccuracy(this);
}
fan.dom.DomCoord.prototype.heading = function()
{
  return this.peer.heading(this);
}
fan.dom.DomCoord.prototype.speed = function()
{
  return this.peer.speed(this);
}
fan.dom.DomCoord.prototype.ts = function()
{
  return this.peer.ts(this);
}
fan.dom.DomCoord.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("{ lat=",fan.sys.ObjUtil.coerce(this.lat(),fan.sys.Obj.$type.toNullable()))," lng="),fan.sys.ObjUtil.coerce(this.lng(),fan.sys.Obj.$type.toNullable()))," accuracy="),fan.sys.ObjUtil.coerce(this.accuracy(),fan.sys.Obj.$type.toNullable()))," altitude="),fan.sys.ObjUtil.coerce(this.altitude(),fan.sys.Obj.$type.toNullable())),fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(" altitudeAccuracy=",fan.sys.ObjUtil.coerce(this.altitudeAccuracy(),fan.sys.Obj.$type.toNullable()))," heading="),fan.sys.ObjUtil.coerce(this.heading(),fan.sys.Obj.$type.toNullable()))," speed="),fan.sys.ObjUtil.coerce(this.speed(),fan.sys.Obj.$type.toNullable()))," ts="),this.ts())," }"));
}
fan.dom.DomCoordPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomCoordPeer.prototype.$ctor = function() {}
fan.dom.DomCoordPeer.wrap = function(pos)
{
  var x = fan.dom.DomCoord.make();
  x.peer.m_coords = pos.coords;
  x.peer.m_ts = pos.timestamp ? fan.sys.Duration.fromStr(""+pos.timestamp+"ms") : null;
  return x;
}
fan.dom.DomCoordPeer.prototype.lat              = function() { return this.m_coords.latitude;  }
fan.dom.DomCoordPeer.prototype.lng              = function() { return this.m_coords.longitude; }
fan.dom.DomCoordPeer.prototype.accuracy         = function() { return this.m_coords.accuracy;  }
fan.dom.DomCoordPeer.prototype.altitude         = function() { return this.m_coords.altitude; }
fan.dom.DomCoordPeer.prototype.altitudeAccuracy = function() { return this.m_coords.altitudeAccuracy; }
fan.dom.DomCoordPeer.prototype.heading          = function() { return this.m_coords.heading; }
fan.dom.DomCoordPeer.prototype.speed            = function() { return this.m_coords.speed; }
fan.dom.DomCoordPeer.prototype.ts               = function() { return this.m_ts; }
fan.dom.DomGraphicsEnv = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomGraphicsEnv.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_images = fan.concurrent.ConcurrentMap.make();
  return;
}
fan.dom.DomGraphicsEnv.prototype.$typeof = function() { return fan.dom.DomGraphicsEnv.$type; }
fan.dom.DomGraphicsEnv.prototype.image = function(uri,data)
{
  if (data === undefined) data = null;
  var image = fan.sys.ObjUtil.as(this.m_images.get(uri),fan.dom.DomImage.$type);
  if (image != null)
  {
    return fan.sys.ObjUtil.coerce(image,fan.graphics.Image.$type);
  }
  ;
  image = this.loadImage(uri);
  return fan.sys.ObjUtil.coerce(this.m_images.getOrAdd(uri,fan.sys.ObjUtil.coerce(image,fan.sys.Obj.$type)),fan.graphics.Image.$type);
}
fan.dom.DomGraphicsEnv.prototype.loadImage = function(uri)
{
  var mime = fan.graphics.Image.mimeForExt(fan.sys.ObjUtil.coerce((function($this) { var $_u21 = uri.ext(); if ($_u21 != null) return $_u21; return ""; })(this),fan.sys.Str.$type));
  var elem = fan.dom.Elem.make("img");
  elem.trap("src",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[uri.encode()]));
  return fan.dom.DomImage.make(uri,mime,elem);
}
fan.dom.DomGraphicsEnv.make = function() {
  var self = new fan.dom.DomGraphicsEnv();
  fan.dom.DomGraphicsEnv.make$(self);
  return self;
  }
fan.dom.DomGraphicsEnv.make$ = function(self)
{
  ;
  return;
}
fan.dom.DomGraphicsEnv.prototype.m_images = null;
fan.dom.HttpReq = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.HttpReq.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.HttpReqPeer(this);
  var $this = this;
  this.m_uri = fan.sys.Uri.fromStr("#");
  this.m_headers = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  this.m_async = true;
  this.m_resType = "";
  this.m_withCredentials = false;
  return;
}
fan.dom.HttpReq.prototype.$typeof = function() { return fan.dom.HttpReq.$type; }
fan.dom.HttpReq.make = function(f) {
  var self = new fan.dom.HttpReq();
  fan.dom.HttpReq.make$(self,f);
  return self;
  }
fan.dom.HttpReq.make$ = function(self,f)
{
  if (f === undefined) f = null;
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.dom.HttpReq.prototype.uri = function()
{
  return this.m_uri;
}
fan.dom.HttpReq.prototype.uri$ = function(it)
{
  this.m_uri = it;
  return;
}
fan.dom.HttpReq.prototype.headers = function()
{
  return this.m_headers;
}
fan.dom.HttpReq.prototype.headers$ = function(it)
{
  this.m_headers = it;
  return;
}
fan.dom.HttpReq.prototype.async = function()
{
  return this.m_async;
}
fan.dom.HttpReq.prototype.async$ = function(it)
{
  this.m_async = it;
  return;
}
fan.dom.HttpReq.prototype.resType = function()
{
  return this.m_resType;
}
fan.dom.HttpReq.prototype.resType$ = function(it)
{
  this.m_resType = it;
  return;
}
fan.dom.HttpReq.prototype.withCredentials = function()
{
  return this.m_withCredentials;
}
fan.dom.HttpReq.prototype.withCredentials$ = function(it)
{
  this.m_withCredentials = it;
  return;
}
fan.dom.HttpReq.prototype.onProgress = function(f)
{
  this.m_cbProgress = f;
  return;
}
fan.dom.HttpReq.prototype.cbProgress = function()
{
  return this.m_cbProgress;
}
fan.dom.HttpReq.prototype.cbProgress$ = function(it)
{
  this.m_cbProgress = it;
  return;
}
fan.dom.HttpReq.prototype.send = function(method,content,c)
{
  return this.peer.send(this,method,content,c);
}
fan.dom.HttpReq.prototype.get = function(c)
{
  this.send("GET",null,c);
  return;
}
fan.dom.HttpReq.prototype.post = function(content,c)
{
  this.send("POST",content,c);
  return;
}
fan.dom.HttpReq.prototype.postForm = function(form,c)
{
  return this.peer.postForm(this,form,c);
}
fan.dom.HttpReq.prototype.postFormMultipart = function(form,c)
{
  return this.peer.postFormMultipart(this,form,c);
}
fan.dom.HttpReq.prototype.m_uri = null;
fan.dom.HttpReq.prototype.m_headers = null;
fan.dom.HttpReq.prototype.m_async = false;
fan.dom.HttpReq.prototype.m_resType = null;
fan.dom.HttpReq.prototype.m_withCredentials = false;
fan.dom.HttpReq.prototype.m_cbProgress = null;
fan.dom.HttpReqPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.HttpReqPeer.prototype.$ctor = function(self) {}
fan.dom.HttpReqPeer.prototype.send = function(self, method, content, f)
{
  var xhr = new XMLHttpRequest();
  var buf;
  var view;
  // attach progress listener if configured
  if (self.m_cbProgress != null)
  {
    var _p = xhr;
    var _m = method.toUpperCase();
    if (_m == "POST" || _m == "PUT") _p = xhr.upload
    _p.addEventListener("progress", function(e) {
      if (e.lengthComputable) self.m_cbProgress.call(e.loaded, e.total);
    });
  }
  // open request
  xhr.open(method.toUpperCase(), self.m_uri.encode(), self.m_async);
  if (self.m_async)
  {
    xhr.onreadystatechange = function ()
    {
      if (xhr.readyState == 4)
        f.call(fan.dom.HttpReqPeer.makeRes(xhr));
    }
  }
  // set response type
  xhr.responseType = self.m_resType;
  // setup headers
  var ct = false;
  var k = self.m_headers.keys();
  for (var i=0; i<k.size(); i++)
  {
    var key = k.get(i);
    if (fan.sys.Str.lower(key) == "content-type") ct = true;
    xhr.setRequestHeader(key, self.m_headers.get(key));
  }
  xhr.withCredentials = self.m_withCredentials;
  // send request based on content type
  if (content == null)
  {
    xhr.send(null);
  }
  else if (content instanceof FormData)
  {
    // send FormData (implicity adds Content-Type header)
    xhr.send(content);
  }
  else if (fan.sys.ObjUtil.$typeof(content) === fan.sys.Str.$type)
  {
    // send text
    if (!ct) xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(content);
  }
  else if (content instanceof fan.sys.Buf)
  {
    // send binary
    if (!ct) xhr.setRequestHeader("Content-Type", "application/octet-stream");
    buf = new ArrayBuffer(content.size());
    view = new Uint8Array(buf);
    view.set(content.m_buf.slice(0, content.size()));
    xhr.send(view);
  }
  else if (content instanceof fan.dom.DomFile)
  {
    // send file as raw data
    xhr.send(content.peer.file);
  }
  else
  {
    throw fan.sys.Err.make("Can only send Str or Buf: " + content);
  }
  // for sync requests; directly invoke response handler
  if (!self.m_async) f.call(fan.dom.HttpReqPeer.makeRes(xhr));
}
fan.dom.HttpReqPeer.makeRes = function(xhr)
{
  var isText = xhr.responseType == "" || xhr.responseType == "text";
  var res = fan.dom.HttpRes.make();
  res.m_$xhr    = xhr;
  res.m_status  = xhr.status;
  res.m_content = isText ? xhr.responseText : "";
  var all = xhr.getAllResponseHeaders().split("\n");
  for (var i=0; i<all.length; i++)
  {
    if (all[i].length == 0) continue;
    var j = all[i].indexOf(":");
    var k = fan.sys.Str.trim(all[i].substr(0, j));
    var v = fan.sys.Str.trim(all[i].substr(j+1));
    res.m_headers.set(k, v);
  }
  return res;
}
fan.dom.HttpReqPeer.prototype.postForm = function(self, form, f)
{
  // encode form content into urlencoded str
  var content = ""
  var k = form.keys();
  for (var i=0; i<k.size(); i++)
  {
    if (i > 0) content += "&";
    content += encodeURIComponent(k.get(i)) + "=" +
               encodeURIComponent(form.get(k.get(i)));
  }
  // send POST request
  self.m_headers.set("Content-Type", "application/x-www-form-urlencoded");
  self.send("POST", content, f);
}
fan.dom.HttpReqPeer.prototype.postFormMultipart = function(self, form, f)
{
  // encode form map to FormData instance
  var data = new FormData();
  var keys = form.keys();
  for (var i=0; i<keys.size(); i++)
  {
    var k = keys.get(i);
    var v = form.get(k);
    if (v instanceof fan.dom.DomFile)
      data.append(k, v.peer.file, v.peer.file.name);
    else
      data.append(k, v);
  }
  // send POST request
  self.send("POST", data, f);
}
fan.dom.ResizeObserver = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.ResizeObserver.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.ResizeObserverPeer(this);
  var $this = this;
}
fan.dom.ResizeObserver.prototype.$typeof = function() { return fan.dom.ResizeObserver.$type; }
fan.dom.ResizeObserver.make = function() {
  var self = new fan.dom.ResizeObserver();
  fan.dom.ResizeObserver.make$(self);
  return self;
  }
fan.dom.ResizeObserver.make$ = function(self)
{
  return;
}
fan.dom.ResizeObserver.prototype.observe = function(target)
{
  return this.peer.observe(this,target);
}
fan.dom.ResizeObserver.prototype.unobserve = function(target)
{
  return this.peer.unobserve(this,target);
}
fan.dom.ResizeObserver.prototype.disconnet = function()
{
  return this.peer.disconnet(this);
}
fan.dom.ResizeObserver.prototype.onResize = function(callback)
{
  this.m_callback = callback;
  return;
}
fan.dom.ResizeObserver.prototype.callback = function()
{
  return this.m_callback;
}
fan.dom.ResizeObserver.prototype.callback$ = function(it)
{
  this.m_callback = it;
  return;
}
fan.dom.ResizeObserver.prototype.m_callback = null;
fan.dom.ResizeObserverPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.ResizeObserverPeer.prototype.$ctor = function(self)
{
  this.observer = new ResizeObserver(function(entries)
  {
    if (self.m_callback != null)
    {
      var list = fan.dom.ResizeObserverPeer.$makeEntryList(entries);
      var args = fan.sys.List.make(fan.sys.Obj.$type, [list]);
      self.m_callback.callOn(self, args);
    }
  });
}
fan.dom.ResizeObserverPeer.prototype.observe = function(self, target)
{
  this.observer.observe(target.peer.elem);
  return self;
}
fan.dom.ResizeObserverPeer.prototype.unobserve = function(self, target)
{
  this.observer.unobserve(target.peer.elem);
  return self;
}
fan.dom.ResizeObserverPeer.prototype.disconnect = function(self)
{
  this.observer.disconnect();
}
fan.dom.ResizeObserverPeer.$makeEntryList = function(entries)
{
  var list = new Array();
  for (var i=0; i<entries.length; i++)
    list.push(fan.dom.ResizeObserverPeer.$makeEntry(entries[i]));
  return fan.sys.List.make(fan.dom.ResizeObserver.$type, list);
}
fan.dom.ResizeObserverPeer.$makeEntry = function(entry)
{
  var w  = entry.contentRect.width;
  var h  = entry.contentRect.height;
  var re = fan.dom.ResizeObserverEntry.make();
  re.m_target = fan.dom.ElemPeer.wrap(entry.target);
  re.m_size   = fan.graphics.Size.make(w, h);
  return re;
}
fan.dom.ResizeObserverEntry = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.ResizeObserverEntry.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.dom.ResizeObserverEntry.prototype.$typeof = function() { return fan.dom.ResizeObserverEntry.$type; }
fan.dom.ResizeObserverEntry.make = function(f) {
  var self = new fan.dom.ResizeObserverEntry();
  fan.dom.ResizeObserverEntry.make$(self,f);
  return self;
  }
fan.dom.ResizeObserverEntry.make$ = function(self,f)
{
  if (f === undefined) f = null;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.dom.ResizeObserverEntry.prototype.target = function()
{
  return this.m_target;
}
fan.dom.ResizeObserverEntry.prototype.target$ = function(it)
{
  this.m_target = it;
  return;
}
fan.dom.ResizeObserverEntry.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("ResizeObserverEntry { target=",this.m_target)," size="),this.m_size)," }");
}
fan.dom.ResizeObserverEntry.prototype.m_target = null;
fan.dom.ResizeObserverEntry.prototype.m_size = null;
fan.dom.DataTransfer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DataTransfer.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.DataTransferPeer(this);
  var $this = this;
}
fan.dom.DataTransfer.prototype.$typeof = function() { return fan.dom.DataTransfer.$type; }
fan.dom.DataTransfer.prototype.dropEffect = function()
{
  return this.peer.dropEffect(this);
}
fan.dom.DataTransfer.prototype.dropEffect$ = function(it)
{
  return this.peer.dropEffect$(this,it);
}
fan.dom.DataTransfer.prototype.effectAllowed = function()
{
  return this.peer.effectAllowed(this);
}
fan.dom.DataTransfer.prototype.effectAllowed$ = function(it)
{
  return this.peer.effectAllowed$(this,it);
}
fan.dom.DataTransfer.prototype.types = function()
{
  return this.peer.types(this);
}
fan.dom.DataTransfer.prototype.getData = function(type)
{
  return this.peer.getData(this,type);
}
fan.dom.DataTransfer.prototype.setData = function(type,val)
{
  return this.peer.setData(this,type,val);
}
fan.dom.DataTransfer.prototype.setDragImage = function(image,x,y)
{
  return this.peer.setDragImage(this,image,x,y);
}
fan.dom.DataTransfer.prototype.files = function()
{
  return this.peer.files(this);
}
fan.dom.DataTransfer.make = function() {
  var self = new fan.dom.DataTransfer();
  fan.dom.DataTransfer.make$(self);
  return self;
  }
fan.dom.DataTransfer.make$ = function(self)
{
  return;
}
fan.dom.DataTransferPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DataTransferPeer.prototype.$ctor = function(self) {}
fan.dom.DataTransferPeer.prototype.dropEffect = function(self) { return this.dataTx.dropEffect; }
fan.dom.DataTransferPeer.prototype.dropEffect$ = function(self, val) { this.dataTx.dropEffect = val; }
fan.dom.DataTransferPeer.prototype.effectAllowed = function(self) { return this.dataTx.effectAllowed; }
fan.dom.DataTransferPeer.prototype.effectAllowed$ = function(self, val) { this.dataTx.effectAllowed = val; }
fan.dom.DataTransferPeer.prototype.types = function(self)
{
  var list = fan.sys.List.make(fan.sys.Str.$type);
  for (var i=0; i<this.dataTx.types.length; i++) list.add(this.dataTx.types[i]);
  return list;
}
fan.dom.DataTransferPeer.prototype.getData = function(self, type)
{
  var val = this.dataTx.getData(type);
  if (val == "") val = this.data[type] || "";
  return val;
}
fan.dom.DataTransferPeer.prototype.setData = function(self, type, val)
{
  // we keep a backup of data for WebKit workaround - see EventPeer.dataTransfer
  this.data[type] = val;
  return this.dataTx.setData(type, val);
}
fan.dom.DataTransferPeer.prototype.setDragImage = function(self, image, x, y)
{
  this.dataTx.setDragImage(image.peer.elem, x, y);
  return self;
}
fan.dom.DataTransferPeer.prototype.files = function(self)
{
  if (this.dataTx.files.length == 0)
    return fan.dom.DomFile.$type.emptyList();
  var list = fan.sys.List.make(fan.dom.DomFile.$type);
  for (var i=0; i<this.dataTx.files.length; i++)
      list.add(fan.dom.DomFilePeer.wrap(this.dataTx.files[i]));
  return list;
}
fan.dom.DataTransferPeer.make = function(dataTx)
{
  var x = fan.dom.DataTransfer.make();
  x.peer.dataTx = dataTx;
  x.peer.data = {};
  return x;
}
fan.dom.HttpRes = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.HttpRes.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_headers = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),fan.sys.Func.make$closure(
    fan.dom.$clos$_u22,
    function(it)
    {
      it.caseInsensitive$(true);
      return;
    })),fan.sys.Type.find("[sys::Str:sys::Str]"));
  this.m_content = "";
  return;
}
fan.dom.HttpRes.prototype.$typeof = function() { return fan.dom.HttpRes.$type; }
fan.dom.HttpRes.make = function() {
  var self = new fan.dom.HttpRes();
  fan.dom.HttpRes.make$(self);
  return self;
  }
fan.dom.HttpRes.make$ = function(self)
{
  ;
  return;
}
fan.dom.HttpRes.prototype.status = function()
{
  return this.m_status;
}
fan.dom.HttpRes.prototype.status$ = function(it)
{
  this.m_status = it;
  return;
}
fan.dom.HttpRes.prototype.headers = function()
{
  return this.m_headers;
}
fan.dom.HttpRes.prototype.headers$ = function(it)
{
  this.m_headers = it;
  return;
}
fan.dom.HttpRes.prototype.content = function()
{
  return this.m_content;
}
fan.dom.HttpRes.prototype.content$ = function(it)
{
  this.m_content = it;
  return;
}
fan.dom.HttpRes.prototype.m_status = 0;
fan.dom.HttpRes.prototype.m_headers = null;
fan.dom.HttpRes.prototype.m_content = null;
fan.dom.Doc = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Doc.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.DocPeer(this);
  var $this = this;
}
fan.dom.Doc.prototype.$typeof = function() { return fan.dom.Doc.$type; }
fan.dom.Doc.make = function() {
  var self = new fan.dom.Doc();
  fan.dom.Doc.make$(self);
  return self;
  }
fan.dom.Doc.make$ = function(self)
{
  return;
}
fan.dom.Doc.prototype.title = function()
{
  return this.peer.title(this);
}
fan.dom.Doc.prototype.title$ = function(it)
{
  return this.peer.title$(this,it);
}
fan.dom.Doc.prototype.head = function()
{
  return this.peer.head(this);
}
fan.dom.Doc.prototype.body = function()
{
  return this.peer.body(this);
}
fan.dom.Doc.prototype.activeElem = function()
{
  return this.peer.activeElem(this);
}
fan.dom.Doc.prototype.elemById = function(id)
{
  return this.peer.elemById(this,id);
}
fan.dom.Doc.prototype.createElem = function(tagName,attrib,ns)
{
  if (attrib === undefined) attrib = null;
  if (ns === undefined) ns = null;
  return this.peer.createElem(this,tagName,attrib,ns);
}
fan.dom.Doc.prototype.createFrag = function()
{
  return this.peer.createFrag(this);
}
fan.dom.Doc.prototype.querySelector = function(selectors)
{
  return this.peer.querySelector(this,selectors);
}
fan.dom.Doc.prototype.querySelectorAll = function(selectors)
{
  return this.peer.querySelectorAll(this,selectors);
}
fan.dom.Doc.prototype.querySelectorAllType = function(selectors,type)
{
  return this.peer.querySelectorAllType(this,selectors,type);
}
fan.dom.Doc.prototype.exportPng = function(img)
{
  return this.peer.exportPng(this,img);
}
fan.dom.Doc.prototype.exportJpg = function(img,quality)
{
  return this.peer.exportJpg(this,img,quality);
}
fan.dom.Doc.prototype.onEvent = function(type,useCapture,handler)
{
  return this.peer.onEvent(this,type,useCapture,handler);
}
fan.dom.Doc.prototype.removeEvent = function(type,useCapture,handler)
{
  return this.peer.removeEvent(this,type,useCapture,handler);
}
fan.dom.Doc.prototype.exec = function($name,defUi,val)
{
  if (defUi === undefined) defUi = false;
  if (val === undefined) val = null;
  return this.peer.exec(this,$name,defUi,val);
}
fan.dom.Doc.prototype.out = function()
{
  return this.peer.out(this);
}
fan.dom.Doc.prototype.cookies = function()
{
  try
  {
    return fan.sys.MimeType.parseParams(this.getCookiesStr()).ro();
  }
  catch ($_u23)
  {
    $_u23 = fan.sys.Err.make($_u23);
    if ($_u23 instanceof fan.sys.Err)
    {
      var e = $_u23;
      var e;
      e.trace();
    }
    else
    {
      throw $_u23;
    }
  }
  ;
  return fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")).ro();
}
fan.dom.Doc.prototype.addCookie = function(c)
{
  return this.peer.addCookie(this,c);
}
fan.dom.Doc.prototype.getCookiesStr = function()
{
  return this.peer.getCookiesStr(this);
}
fan.dom.DocPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DocPeer.prototype.$ctor = function(self)
{
  this.doc = null;
}
fan.dom.DocPeer.prototype.title  = function(self) { return this.doc.title; }
fan.dom.DocPeer.prototype.title$ = function(self, val) { this.doc.title = val; }
fan.dom.DocPeer.prototype.head = function(self)
{
  return fan.dom.ElemPeer.wrap(this.doc.head);
}
fan.dom.DocPeer.prototype.body = function(self)
{
  return fan.dom.ElemPeer.wrap(this.doc.body);
}
fan.dom.DocPeer.prototype.activeElem = function(self)
{
  var elem = this.doc.activeElement;
  if (elem == null) return null;
  return fan.dom.ElemPeer.wrap(elem);
}
fan.dom.DocPeer.prototype.elemById = function(self, id)
{
  var elem = this.doc.getElementById(id);
  if (elem == null) return null;
  return fan.dom.ElemPeer.wrap(elem);
}
fan.dom.DocPeer.prototype.createElem = function(self, tagName, attribs, ns)
{
  var elem = ns
    ? this.doc.createElementNS(ns.toStr, tagName)
    : this.doc.createElement(tagName);
  var wrap = fan.dom.ElemPeer.wrap(elem);
  if (ns) wrap.m_ns = ns;
  if (attribs != null)
  {
    var k = attribs.keys();
    for (var i=0; i<k.size(); i++)
      wrap.set(k.get(i), attribs.get(k.get(i)));
  }
  return wrap;
}
fan.dom.DocPeer.prototype.createFrag = function(self)
{
  var frag = this.doc.createDocumentFragment();
  return fan.dom.ElemPeer.wrap(frag);
}
fan.dom.DocPeer.prototype.querySelector = function(self, selectors)
{
  var elem = this.doc.querySelector(selectors);
  if (elem == null) return null;
  return fan.dom.ElemPeer.wrap(elem);
}
fan.dom.DocPeer.prototype.querySelectorAll = function(self, selectors)
{
  var list  = fan.sys.List.make(fan.dom.Elem.$type);
  var elems = this.doc.querySelectorAll(selectors);
  for (var i=0; i<elems.length; i++)
    list.add(fan.dom.ElemPeer.wrap(elems[i]));
  return list;
}
fan.dom.DocPeer.prototype.querySelectorAllType = function(self, selectors, type)
{
  var list  = fan.sys.List.make(fan.dom.Elem.$type);
  var elems = this.doc.querySelectorAll(selectors);
  for (var i=0; i<elems.length; i++)
    list.add(fan.dom.ElemPeer.wrap(elems[i], type.make()));
  return list;
}
fan.dom.DocPeer.prototype.exportPng = function(self, img)
{
  return this.__export(img, "image/png");
}
fan.dom.DocPeer.prototype.exportJpg = function(self, img, quality)
{
  return this.__export(img, "image/jpeg", quality);
}
fan.dom.DocPeer.prototype.__export = function(img, mimeType, quality)
{
  var elem = img.peer.elem;
  // set phy canvas size to img
  var canvas = this.doc.createElement("canvas");
  canvas.style.width  = elem.width  + "px";
  canvas.style.height = elem.height + "px";
  // scale up working space if retina
  var ratio     = window.devicePixelRatio || 1;
  canvas.width  = ratio * elem.width;
  canvas.height = ratio * elem.height;
  // render with scale factor
  var cx = canvas.getContext("2d");
  cx.scale(ratio, ratio);
  cx.drawImage(elem, 0, 0);
  return canvas.toDataURL(mimeType, quality);
}
fan.dom.DocPeer.prototype.onEvent = function(self, type, useCapture, handler)
{
  handler.$func = function(e) { handler.call(fan.dom.EventPeer.make(e)); }
  this.doc.addEventListener(type, handler.$func, useCapture);
  return handler;
}
fan.dom.DocPeer.prototype.removeEvent = function(self, type, useCapture, handler)
{
  if (handler.$func)
    this.doc.removeEventListener(type, handler.$func, useCapture);
}
fan.dom.DocPeer.prototype.exec = function(self, name, defUi, val)
{
  return this.doc.execCommand(name, defUi, val);
}
fan.dom.DocPeer.prototype.out = function(self)
{
  return fan.web.WebOutStream.make(new fan.dom.DocOutStream(this.doc));
}
fan.dom.DocPeer.prototype.getCookiesStr = function(self) { return this.doc.cookie; }
fan.dom.DocPeer.prototype.addCookie = function(self,c)
{
  // always force HttpOnly otherwise this is a no-op for browsers
  c.m_httpOnly = false;
  this.doc.cookie = c.toStr();
}
fan.dom.DocOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.dom.DocOutStream.prototype.$ctor = function(doc) { this.doc = doc; }
fan.dom.DocOutStream.prototype.w = function(v)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.write = function(x)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.writeBuf = function(buf, n)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.writeI2 = function(x)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.writeI4 = function(x)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.writeI8 = function(x)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.writeF4 = function(x)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.writeF8 = function(x)
{
  throw fan.sys.UnsupportedErr.make("binary write on Doc output");
}
fan.dom.DocOutStream.prototype.writeUtf = function(x)
{
  throw fan.sys.UnsupportedErr.make("modified UTF-8 format write on StrBuf output");
}
fan.dom.DocOutStream.prototype.writeChar = function(c)
{
  this.doc.write(String.fromCharCode(c));
}
fan.dom.DocOutStream.prototype.writeChars = function(s, off, len)
{
  if (off === undefined) off = 0;
  if (len === undefined) len = s.length-off;
  this.doc.write(s.substr(off, len));
  return this;
}
fan.dom.DocOutStream.prototype.flush = function() { return this; }
fan.dom.DocOutStream.prototype.close = function()
{
  this.doc.close();
  return true;
}
fan.dom.Key = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Key.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.dom.Key.prototype.$typeof = function() { return fan.dom.Key.$type; }
fan.dom.Key.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var key = fan.dom.Key.m_byName.get(s);
    if (key != null)
    {
      return key;
    }
    ;
  }
  catch ($_u24)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Key: ",s));
  }
  ;
  return null;
}
fan.dom.Key.fromCode = function(code)
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u25 = fan.dom.Key.m_byCode.get(fan.sys.ObjUtil.coerce(code,fan.sys.Obj.$type.toNullable())); if ($_u25 != null) return $_u25; return fan.dom.Key.make(code,fan.sys.Str.plus("0x",fan.sys.Int.toHex(code))); })(this),fan.dom.Key.$type);
}
fan.dom.Key.make = function(code,$name,symbol) {
  var self = new fan.dom.Key();
  fan.dom.Key.make$(self,code,$name,symbol);
  return self;
  }
fan.dom.Key.make$ = function(self,code,$name,symbol)
{
  if (symbol === undefined) symbol = null;
  self.m_code = code;
  self.m_$name = $name;
  self.m_symbol = symbol;
  return;
}
fan.dom.Key.prototype.hash = function()
{
  return fan.sys.Str.hash(this.m_$name);
}
fan.dom.Key.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.dom.Key.$type);
  if (x == null)
  {
    return false;
  }
  ;
  return fan.sys.ObjUtil.equals(this.m_$name,x.m_$name);
}
fan.dom.Key.prototype.toStr = function()
{
  return this.m_$name;
}
fan.dom.Key.prototype.isModifier = function()
{
  return (fan.sys.ObjUtil.equals(this,fan.dom.Key.m_alt) || fan.sys.ObjUtil.equals(this,fan.dom.Key.m_shift) || fan.sys.ObjUtil.equals(this,fan.dom.Key.m_ctrl) || fan.sys.ObjUtil.equals(this,fan.dom.Key.m_meta));
}
fan.dom.Key.static$init = function()
{
  var $this = this;
  fan.dom.Key.m_a = fan.dom.Key.make(65,"A");
  fan.dom.Key.m_b = fan.dom.Key.make(66,"B");
  fan.dom.Key.m_c = fan.dom.Key.make(67,"C");
  fan.dom.Key.m_d = fan.dom.Key.make(68,"D");
  fan.dom.Key.m_e = fan.dom.Key.make(69,"E");
  fan.dom.Key.m_f = fan.dom.Key.make(70,"F");
  fan.dom.Key.m_g = fan.dom.Key.make(71,"G");
  fan.dom.Key.m_h = fan.dom.Key.make(72,"H");
  fan.dom.Key.m_i = fan.dom.Key.make(73,"I");
  fan.dom.Key.m_j = fan.dom.Key.make(74,"J");
  fan.dom.Key.m_k = fan.dom.Key.make(75,"K");
  fan.dom.Key.m_l = fan.dom.Key.make(76,"L");
  fan.dom.Key.m_m = fan.dom.Key.make(77,"M");
  fan.dom.Key.m_n = fan.dom.Key.make(78,"N");
  fan.dom.Key.m_o = fan.dom.Key.make(79,"O");
  fan.dom.Key.m_p = fan.dom.Key.make(80,"P");
  fan.dom.Key.m_q = fan.dom.Key.make(81,"Q");
  fan.dom.Key.m_r = fan.dom.Key.make(82,"R");
  fan.dom.Key.m_s = fan.dom.Key.make(83,"S");
  fan.dom.Key.m_t = fan.dom.Key.make(84,"T");
  fan.dom.Key.m_u = fan.dom.Key.make(85,"U");
  fan.dom.Key.m_v = fan.dom.Key.make(86,"V");
  fan.dom.Key.m_w = fan.dom.Key.make(87,"W");
  fan.dom.Key.m_x = fan.dom.Key.make(88,"X");
  fan.dom.Key.m_y = fan.dom.Key.make(89,"Y");
  fan.dom.Key.m_z = fan.dom.Key.make(90,"Z");
  fan.dom.Key.m_num0 = fan.dom.Key.make(48,"0");
  fan.dom.Key.m_num1 = fan.dom.Key.make(49,"1");
  fan.dom.Key.m_num2 = fan.dom.Key.make(50,"2");
  fan.dom.Key.m_num3 = fan.dom.Key.make(51,"3");
  fan.dom.Key.m_num4 = fan.dom.Key.make(52,"4");
  fan.dom.Key.m_num5 = fan.dom.Key.make(53,"5");
  fan.dom.Key.m_num6 = fan.dom.Key.make(54,"6");
  fan.dom.Key.m_num7 = fan.dom.Key.make(55,"7");
  fan.dom.Key.m_num8 = fan.dom.Key.make(56,"8");
  fan.dom.Key.m_num9 = fan.dom.Key.make(57,"9");
  fan.dom.Key.m_space = fan.dom.Key.make(32,"Space");
  fan.dom.Key.m_backspace = fan.dom.Key.make(8,"Backspace");
  fan.dom.Key.m_enter = fan.dom.Key.make(13,"Enter");
  fan.dom.Key.m_$delete = fan.dom.Key.make(46,"Del");
  fan.dom.Key.m_esc = fan.dom.Key.make(27,"Esc");
  fan.dom.Key.m_tab = fan.dom.Key.make(9,"Tab");
  fan.dom.Key.m_capsLock = fan.dom.Key.make(20,"CapsLock");
  fan.dom.Key.m_semicolon = fan.dom.Key.make(186,"Semicolon",";");
  fan.dom.Key.m_equal = fan.dom.Key.make(187,"Equal","=");
  fan.dom.Key.m_comma = fan.dom.Key.make(188,"Comma",",");
  fan.dom.Key.m_dash = fan.dom.Key.make(189,"Dash","-");
  fan.dom.Key.m_period = fan.dom.Key.make(190,"Period",".");
  fan.dom.Key.m_slash = fan.dom.Key.make(191,"Slash","/");
  fan.dom.Key.m_backtick = fan.dom.Key.make(192,"Backtick","`");
  fan.dom.Key.m_openBracket = fan.dom.Key.make(219,"OpenBracket","[");
  fan.dom.Key.m_backSlash = fan.dom.Key.make(220,"BackSlash","\\");
  fan.dom.Key.m_closeBracket = fan.dom.Key.make(221,"CloseBracket","]");
  fan.dom.Key.m_quote = fan.dom.Key.make(222,"Quote","\"");
  fan.dom.Key.m_left = fan.dom.Key.make(37,"Left","\u2190");
  fan.dom.Key.m_up = fan.dom.Key.make(38,"Up","\u2191");
  fan.dom.Key.m_right = fan.dom.Key.make(39,"Right","\u2192");
  fan.dom.Key.m_down = fan.dom.Key.make(40,"Down","\u2193");
  fan.dom.Key.m_pageUp = fan.dom.Key.make(33,"PageUp");
  fan.dom.Key.m_pageDown = fan.dom.Key.make(34,"PageDown");
  fan.dom.Key.m_home = fan.dom.Key.make(36,"Home");
  fan.dom.Key.m_end = fan.dom.Key.make(35,"End");
  fan.dom.Key.m_insert = fan.dom.Key.make(45,"Insert");
  fan.dom.Key.m_f1 = fan.dom.Key.make(112,"F1");
  fan.dom.Key.m_f2 = fan.dom.Key.make(113,"F2");
  fan.dom.Key.m_f3 = fan.dom.Key.make(114,"F3");
  fan.dom.Key.m_f4 = fan.dom.Key.make(115,"F4");
  fan.dom.Key.m_f5 = fan.dom.Key.make(116,"F5");
  fan.dom.Key.m_f6 = fan.dom.Key.make(117,"F6");
  fan.dom.Key.m_f7 = fan.dom.Key.make(118,"F7");
  fan.dom.Key.m_f8 = fan.dom.Key.make(119,"F8");
  fan.dom.Key.m_f9 = fan.dom.Key.make(120,"F9");
  fan.dom.Key.m_f10 = fan.dom.Key.make(121,"F10");
  fan.dom.Key.m_alt = fan.dom.Key.make(18,"Alt");
  fan.dom.Key.m_shift = fan.dom.Key.make(16,"Shift");
  fan.dom.Key.m_ctrl = fan.dom.Key.make(17,"Ctrl");
  fan.dom.Key.m_meta = fan.dom.Key.make(91,"Meta");
  if (true)
  {
    var c = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Int"),fan.sys.Type.find("dom::Key"));
    var n = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("dom::Key"));
    fan.dom.Key.$type.fields().each(fan.sys.Func.make$closure(
      fan.dom.$clos$_u26,
      function(f)
      {
        if ((f.isStatic() && fan.sys.ObjUtil.equals(f.type(),fan.dom.Key.$type)))
        {
          var key = fan.sys.ObjUtil.coerce(f.get(null),fan.dom.Key.$type);
          c.add(fan.sys.ObjUtil.coerce(key.m_code,fan.sys.Obj.$type.toNullable()),key);
          n.add(key.m_$name,key);
          if (key.m_symbol != null)
          {
            n.add(fan.sys.ObjUtil.coerce(key.m_symbol,fan.sys.Str.$type),key);
          }
          ;
        }
        ;
        return;
      }));
    c.add(fan.sys.ObjUtil.coerce(173,fan.sys.Obj.$type.toNullable()),fan.dom.Key.m_dash);
    c.add(fan.sys.ObjUtil.coerce(61,fan.sys.Obj.$type.toNullable()),fan.dom.Key.m_equal);
    c.add(fan.sys.ObjUtil.coerce(59,fan.sys.Obj.$type.toNullable()),fan.dom.Key.m_semicolon);
    c.add(fan.sys.ObjUtil.coerce(224,fan.sys.Obj.$type.toNullable()),fan.dom.Key.m_meta);
    c.add(fan.sys.ObjUtil.coerce(93,fan.sys.Obj.$type.toNullable()),fan.dom.Key.m_meta);
    fan.dom.Key.m_byCode = fan.sys.ObjUtil.coerce((function($this) { var $_u27 = c; if ($_u27 == null) return null; return fan.sys.ObjUtil.toImmutable($_u27); })(this),fan.sys.Type.find("[sys::Int:dom::Key]"));
    fan.dom.Key.m_byName = fan.sys.ObjUtil.coerce((function($this) { var $_u28 = n; if ($_u28 == null) return null; return fan.sys.ObjUtil.toImmutable($_u28); })(this),fan.sys.Type.find("[sys::Str:dom::Key]"));
  }
  ;
  return;
}
fan.dom.Key.m_a = null;
fan.dom.Key.m_b = null;
fan.dom.Key.m_c = null;
fan.dom.Key.m_d = null;
fan.dom.Key.m_e = null;
fan.dom.Key.m_f = null;
fan.dom.Key.m_g = null;
fan.dom.Key.m_h = null;
fan.dom.Key.m_i = null;
fan.dom.Key.m_j = null;
fan.dom.Key.m_k = null;
fan.dom.Key.m_l = null;
fan.dom.Key.m_m = null;
fan.dom.Key.m_n = null;
fan.dom.Key.m_o = null;
fan.dom.Key.m_p = null;
fan.dom.Key.m_q = null;
fan.dom.Key.m_r = null;
fan.dom.Key.m_s = null;
fan.dom.Key.m_t = null;
fan.dom.Key.m_u = null;
fan.dom.Key.m_v = null;
fan.dom.Key.m_w = null;
fan.dom.Key.m_x = null;
fan.dom.Key.m_y = null;
fan.dom.Key.m_z = null;
fan.dom.Key.m_num0 = null;
fan.dom.Key.m_num1 = null;
fan.dom.Key.m_num2 = null;
fan.dom.Key.m_num3 = null;
fan.dom.Key.m_num4 = null;
fan.dom.Key.m_num5 = null;
fan.dom.Key.m_num6 = null;
fan.dom.Key.m_num7 = null;
fan.dom.Key.m_num8 = null;
fan.dom.Key.m_num9 = null;
fan.dom.Key.m_space = null;
fan.dom.Key.m_backspace = null;
fan.dom.Key.m_enter = null;
fan.dom.Key.m_$delete = null;
fan.dom.Key.m_esc = null;
fan.dom.Key.m_tab = null;
fan.dom.Key.m_capsLock = null;
fan.dom.Key.m_semicolon = null;
fan.dom.Key.m_equal = null;
fan.dom.Key.m_comma = null;
fan.dom.Key.m_dash = null;
fan.dom.Key.m_period = null;
fan.dom.Key.m_slash = null;
fan.dom.Key.m_backtick = null;
fan.dom.Key.m_openBracket = null;
fan.dom.Key.m_backSlash = null;
fan.dom.Key.m_closeBracket = null;
fan.dom.Key.m_quote = null;
fan.dom.Key.m_left = null;
fan.dom.Key.m_up = null;
fan.dom.Key.m_right = null;
fan.dom.Key.m_down = null;
fan.dom.Key.m_pageUp = null;
fan.dom.Key.m_pageDown = null;
fan.dom.Key.m_home = null;
fan.dom.Key.m_end = null;
fan.dom.Key.m_insert = null;
fan.dom.Key.m_f1 = null;
fan.dom.Key.m_f2 = null;
fan.dom.Key.m_f3 = null;
fan.dom.Key.m_f4 = null;
fan.dom.Key.m_f5 = null;
fan.dom.Key.m_f6 = null;
fan.dom.Key.m_f7 = null;
fan.dom.Key.m_f8 = null;
fan.dom.Key.m_f9 = null;
fan.dom.Key.m_f10 = null;
fan.dom.Key.m_alt = null;
fan.dom.Key.m_shift = null;
fan.dom.Key.m_ctrl = null;
fan.dom.Key.m_meta = null;
fan.dom.Key.m_byCode = null;
fan.dom.Key.m_byName = null;
fan.dom.Key.prototype.m_$name = null;
fan.dom.Key.prototype.m_code = 0;
fan.dom.Key.prototype.m_symbol = null;
fan.dom.DomFile = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomFile.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.DomFilePeer(this);
  var $this = this;
}
fan.dom.DomFile.prototype.$typeof = function() { return fan.dom.DomFile.$type; }
fan.dom.DomFile.prototype.$name = function()
{
  return this.peer.$name(this);
}
fan.dom.DomFile.prototype.ext = function()
{
  var n = this.$name();
  var i = fan.sys.Str.indexr(n,".");
  return (function($this) { if (i == null) return null; return fan.sys.Str.getRange(n,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),1),-1)); })(this);
}
fan.dom.DomFile.prototype.size = function()
{
  return this.peer.size(this);
}
fan.dom.DomFile.prototype.type = function()
{
  return this.peer.type(this);
}
fan.dom.DomFile.prototype.readAsDataUri = function(f)
{
  return this.peer.readAsDataUri(this,f);
}
fan.dom.DomFile.prototype.readAsText = function(f)
{
  return this.peer.readAsText(this,f);
}
fan.dom.DomFile.make = function() {
  var self = new fan.dom.DomFile();
  fan.dom.DomFile.make$(self);
  return self;
  }
fan.dom.DomFile.make$ = function(self)
{
  return;
}
fan.dom.DomFilePeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomFilePeer.prototype.$ctor = function(self)
{
  this.file = null;
}
fan.dom.DomFilePeer.wrap = function(file)
{
  if (file == null) throw fan.sys.ArgErr.make("file is null")
  if (file._fanFile != undefined)
    return file._fanFile;
  var x = fan.dom.DomFile.make();
  x.peer.file = file;
  file._fanFile = x;
  return x;
}
fan.dom.DomFilePeer.prototype.$name = function(self)
{
  return this.file.name;
}
fan.dom.DomFilePeer.prototype.size = function(self)
{
  return this.file.size;
}
fan.dom.DomFilePeer.prototype.type = function(self)
{
  return this.file.type;
}
fan.dom.DomFilePeer.prototype.readAsDataUri = function(self, func)
{
  var reader = new FileReader();
  reader.onload = function(e) {
    var uri = fan.sys.Uri.decode(e.target.result.toString());
    func.call(uri);
  }
  reader.readAsDataURL(this.file);
}
fan.dom.DomFilePeer.prototype.readAsText = function(self, func)
{
  var reader = new FileReader();
  reader.onload = function(e) {
    func.call(e.target.result);
  }
  reader.readAsText(this.file);
}
fan.dom.Event = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Event.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.EventPeer(this);
  var $this = this;
  this.m_stash = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  return;
}
fan.dom.Event.prototype.$typeof = function() { return fan.dom.Event.$type; }
fan.dom.Event.make = function() {
  var self = new fan.dom.Event();
  fan.dom.Event.make$(self);
  return self;
  }
fan.dom.Event.make$ = function(self)
{
  ;
  return;
}
fan.dom.Event.makeMock = function()
{
  return fan.dom.EventPeer.makeMock();
}
fan.dom.Event.fromNative = function(event)
{
  return fan.dom.EventPeer.fromNative(event);
}
fan.dom.Event.prototype.type = function()
{
  return this.peer.type(this);
}
fan.dom.Event.prototype.target = function()
{
  return this.peer.target(this);
}
fan.dom.Event.prototype.pagePos = function()
{
  return this.peer.pagePos(this);
}
fan.dom.Event.prototype.alt = function()
{
  return this.peer.alt(this);
}
fan.dom.Event.prototype.ctrl = function()
{
  return this.peer.ctrl(this);
}
fan.dom.Event.prototype.shift = function()
{
  return this.peer.shift(this);
}
fan.dom.Event.prototype.meta = function()
{
  return this.peer.meta(this);
}
fan.dom.Event.prototype.button = function()
{
  return this.peer.button(this);
}
fan.dom.Event.prototype.delta = function()
{
  return this.peer.delta(this);
}
fan.dom.Event.prototype.key = function()
{
  return this.peer.key(this);
}
fan.dom.Event.prototype.err = function()
{
  return this.peer.err(this);
}
fan.dom.Event.prototype.stop = function()
{
  return this.peer.stop(this);
}
fan.dom.Event.prototype.get = function($name,def)
{
  if (def === undefined) def = null;
  return this.peer.get(this,$name,def);
}
fan.dom.Event.prototype.set = function($name,val)
{
  return this.peer.set(this,$name,val);
}
fan.dom.Event.prototype.trap = function($name,args)
{
  if (args === undefined) args = null;
  if ((args == null || args.isEmpty()))
  {
    return this.get($name);
  }
  ;
  this.set($name,args.first());
  return null;
}
fan.dom.Event.prototype.dataTransfer = function()
{
  return this.peer.dataTransfer(this);
}
fan.dom.Event.prototype.stash = function()
{
  return this.m_stash;
}
fan.dom.Event.prototype.stash$ = function(it)
{
  this.m_stash = it;
  return;
}
fan.dom.Event.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Event { type=",this.type())," target="),this.target())," pagePos="),this.pagePos())," button="),fan.sys.ObjUtil.coerce(this.button(),fan.sys.Obj.$type.toNullable()))," delta="),this.delta())," key="),this.key())," alt="),(function($this) { if ($this.alt()) return "T"; return "F"; })(this))," ctrl="),(function($this) { if ($this.ctrl()) return "T"; return "F"; })(this))," shift="),(function($this) { if ($this.shift()) return "T"; return "F"; })(this))," meta="),(function($this) { if ($this.meta()) return "T"; return "F"; })(this))," }");
}
fan.dom.Event.prototype.m_stash = null;
fan.dom.EventPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.EventPeer.prototype.$ctor = function(self) {}
fan.dom.EventPeer.makeMock = function()
{
  return fan.dom.EventPeer.make(new Event("mock"));
}
fan.dom.EventPeer.fromNative = function(obj)
{
  return fan.dom.EventPeer.make(obj);
}
fan.dom.EventPeer.prototype.type = function(self) { return this.event.type; }
fan.dom.EventPeer.prototype.target = function(self)
{
  if (this.$target == null)
  {
    // 8 May 2019 - Andy Frank:
    // Firefox 66.0.5 is firing events with TEXT_NODE as targets; I'm not
    // sure if this is new behavior (or correct behavoir) -- but since the
    // Fantom DOM pod only handles ELEMENT_NODE; walk up to the parent
    var t = this.event.target;
    if (t.nodeType == 3) t = t.parentNode;
    this.$target = fan.dom.ElemPeer.wrap(t);
  }
  return this.$target;
}
fan.dom.EventPeer.prototype.pagePos = function(self)
{
  if (this.$pagePos == null)
    this.$pagePos = fan.graphics.Point.makeInt(this.event.pageX || 0, this.event.pageY || 0);
  return this.$pagePos;
}
fan.dom.EventPeer.prototype.alt   = function(self) { return this.event.altKey; }
fan.dom.EventPeer.prototype.ctrl  = function(self) { return this.event.ctrlKey; }
fan.dom.EventPeer.prototype.shift = function(self) { return this.event.shiftKey; }
fan.dom.EventPeer.prototype.meta  = function(self) { return this.event.metaKey; }
fan.dom.EventPeer.prototype.button = function(self) { return this.event.button; }
fan.dom.EventPeer.prototype.key = function(self) { return this.$key }
fan.dom.EventPeer.prototype.delta = function(self)
{
  if (this.$delta == null)
  {
    this.$delta = this.event.deltaX != null && this.event.deltaY != null
      ? fan.graphics.Point.makeInt(this.event.deltaX, this.event.deltaY)
      : fan.graphics.Point.m_defVal;
  }
  return this.$delta;
}
fan.dom.EventPeer.prototype.err = function(self)
{
  if (this.event.error == null) return null;
  if (this.$err == null) this.$err = fan.sys.Err.make(this.event.error);
  return this.$err;
}
fan.dom.EventPeer.prototype.stop = function(self)
{
  this.event.preventDefault();
  this.event.stopPropagation();
  this.event.cancelBubble = true;
  this.event.returnValue = false;
}
fan.dom.EventPeer.prototype.get = function(self, name, def)
{
  var val = this.event[name];
  if (val != null) return val;
  if (def != null) return def;
  return null;
}
fan.dom.EventPeer.prototype.set = function(self, name, val)
{
  this.elem[name] = val;
}
fan.dom.EventPeer.prototype.dataTransfer = function(self)
{
  // Andy Frank 19-Jun-2015: Chrome/WebKit do not allow reading
  // getData during the dragover event - which makes it impossible
  // to check drop targets during drag. To workaround for now we
  // just cache in a static field
  //
  // 12-Aug-2019: this logic needed to be tweaked a bit to add
  // support for dragging files into the browser - the lastDataTx
  // temp copy should be cleared during EventPeer.make when we
  // detect either a 'drop' or 'dragend' event
  if (fan.dom.EventPeer.lastDataTx)
    return fan.dom.EventPeer.lastDataTx;
  if (!this.dataTx)
    this.dataTx = fan.dom.EventPeer.lastDataTx = fan.dom.DataTransferPeer.make(this.event.dataTransfer);
  return this.dataTx;
}
fan.dom.EventPeer.make = function(event)
{
  // map native to Fan
  var x = fan.dom.Event.make();
  x.peer.event = event;
  if (event.keyCode) x.peer.$key = fan.dom.Key.fromCode(event.keyCode);
  // we need to flush our working copy when we see a dragend
  // event; this allows us to request the real drop contents
  // which are hidden in alot of cases during ondrag
  if (event.type.charAt(0) == 'd' && (event.type == "drop" || event.type == "dragend"))
    fan.dom.EventPeer.lastDataTx = null
  return x;
}
fan.dom.DomImage = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomImage.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.DomImagePeer(this);
  var $this = this;
}
fan.dom.DomImage.prototype.$typeof = function() { return fan.dom.DomImage.$type; }
fan.dom.DomImage.make = function(uri,mime,elem) {
  var self = new fan.dom.DomImage();
  fan.dom.DomImage.make$(self,uri,mime,elem);
  return self;
  }
fan.dom.DomImage.make$ = function(self,uri,mime,elem)
{
  self.m_uri = uri;
  self.m_mime = mime;
  self.init(elem);
  return;
}
fan.dom.DomImage.prototype.init = function(elem)
{
  return this.peer.init(this,elem);
}
fan.dom.DomImage.prototype.uri = function()
{
  return this.m_uri;
}
fan.dom.DomImage.prototype.mime = function()
{
  return this.m_mime;
}
fan.dom.DomImage.prototype.isLoaded = function()
{
  return this.peer.isLoaded(this);
}
fan.dom.DomImage.prototype.size = function()
{
  return this.peer.size(this);
}
fan.dom.DomImage.prototype.w = function()
{
  return this.peer.w(this);
}
fan.dom.DomImage.prototype.h = function()
{
  return this.peer.h(this);
}
fan.dom.DomImage.prototype.get = function(prop)
{
  return null;
}
fan.dom.DomImage.prototype.m_uri = null;
fan.dom.DomImage.prototype.m_mime = null;
fan.dom.DomImagePeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomImagePeer.prototype.$ctor = function(self) {}
fan.dom.DomImagePeer.prototype.init = function(self, elem)
{
  // map dom::Elem("img") to its HTMLImageElement
  this.elem = elem.peer.elem
}
fan.dom.DomImagePeer.prototype.isLoaded = function(self)
{
  return this.elem.complete;
}
fan.dom.DomImagePeer.prototype.size = function(self)
{
  return fan.graphics.Size.make(this.w(), this.h());
}
fan.dom.DomImagePeer.prototype.w = function(self)
{
  return fan.sys.Float.make(this.elem.naturalWidth);
}
fan.dom.DomImagePeer.prototype.h = function(self)
{
  return fan.sys.Float.make(this.elem.naturalHeight);
}
fan.dom.CssDim = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.CssDim.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.dom.CssDim.prototype.$typeof = function() { return fan.dom.CssDim.$type; }
fan.dom.CssDim.make = function(val,unit) {
  var self = new fan.dom.CssDim();
  fan.dom.CssDim.make$(self,val,unit);
  return self;
  }
fan.dom.CssDim.make$ = function(self,val,unit)
{
  self.m_val = val;
  self.m_unit = unit;
  return;
}
fan.dom.CssDim.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    if (fan.sys.ObjUtil.equals(s,"auto"))
    {
      return fan.dom.CssDim.m_autoVal;
    }
    ;
    var n = fan.sys.StrBuf.make();
    var f = false;
    for (var i = 0; fan.sys.ObjUtil.compareLT(i,fan.sys.Str.size(s)); (function($this) { var $_u34 = i; i = fan.sys.Int.increment(i); return $_u34; })(this))
    {
      var ch = fan.sys.Str.get(s,i);
      if ((fan.sys.ObjUtil.equals(ch,45) || fan.sys.Int.isDigit(ch)))
      {
        n.addChar(ch);
      }
      else
      {
        if (fan.sys.ObjUtil.equals(ch,46))
        {
          f = true;
          n.addChar(ch);
        }
        else
        {
          break;
        }
        ;
      }
      ;
    }
    ;
    var v = (function($this) { if (f) return fan.sys.ObjUtil.coerce(fan.sys.Str.toFloat(n.toStr()),fan.sys.Num.$type.toNullable()); return fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(n.toStr()),fan.sys.Num.$type.toNullable()); })(this);
    var u = fan.sys.Str.getRange(s,fan.sys.Range.make(n.size(),-1));
    if (fan.sys.ObjUtil.equals(fan.sys.Str.size(u),0))
    {
      throw fan.sys.Err.make("Missing unit");
    }
    ;
    if (fan.sys.ObjUtil.equals(fan.sys.Str.all(u,fan.sys.Func.make$closure(
      fan.dom.$clos$_u36,
      function(ch)
      {
        return (fan.sys.ObjUtil.equals(ch,37) || fan.sys.Int.isAlpha(ch));
      })),false))
    {
      throw fan.sys.Err.make("Invalid unit");
    }
    ;
    return fan.dom.CssDim.make(fan.sys.ObjUtil.coerce(v,fan.sys.Num.$type),u);
  }
  catch ($_u37)
  {
    $_u37 = fan.sys.Err.make($_u37);
    if ($_u37 instanceof fan.sys.Err)
    {
      var err = $_u37;
      var err;
      if (checked)
      {
        throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid CssDim: ",s),err);
      }
      ;
      return null;
    }
    else
    {
      throw $_u37;
    }
  }
  ;
}
fan.dom.CssDim.prototype.hash = function()
{
  return fan.sys.Str.hash(this.toStr());
}
fan.dom.CssDim.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.dom.CssDim.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_val,that.m_val) && fan.sys.ObjUtil.equals(this.m_unit,that.m_unit));
}
fan.dom.CssDim.prototype.toStr = function()
{
  return (function($this) { if ($this === fan.dom.CssDim.m_autoVal) return "auto"; return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",$this.m_val),""),$this.m_unit); })(this);
}
fan.dom.CssDim.static$init = function()
{
  fan.dom.CssDim.m_defVal = fan.dom.CssDim.make(fan.sys.ObjUtil.coerce(0,fan.sys.Num.$type),"px");
  fan.dom.CssDim.m_autoVal = fan.dom.CssDim.make(fan.sys.ObjUtil.coerce(0,fan.sys.Num.$type),"auto");
  return;
}
fan.dom.CssDim.m_defVal = null;
fan.dom.CssDim.prototype.m_val = null;
fan.dom.CssDim.prototype.m_unit = null;
fan.dom.CssDim.m_autoVal = null;
fan.dom.WeakMap = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.WeakMap.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.WeakMapPeer(this);
  var $this = this;
}
fan.dom.WeakMap.prototype.$typeof = function() { return fan.dom.WeakMap.$type; }
fan.dom.WeakMap.prototype.has = function(key)
{
  return this.peer.has(this,key);
}
fan.dom.WeakMap.prototype.get = function(key)
{
  return this.peer.get(this,key);
}
fan.dom.WeakMap.prototype.set = function(key,val)
{
  return this.peer.set(this,key,val);
}
fan.dom.WeakMap.prototype.$delete = function(key)
{
  return this.peer.$delete(this,key);
}
fan.dom.WeakMap.make = function() {
  var self = new fan.dom.WeakMap();
  fan.dom.WeakMap.make$(self);
  return self;
  }
fan.dom.WeakMap.make$ = function(self)
{
  return;
}
fan.dom.WeakMapPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.WeakMapPeer.prototype.$ctor = function(self) { this.map = new WeakMap(); }
fan.dom.WeakMapPeer.prototype.has = function(self, key) { return this.map.has(key); }
fan.dom.WeakMapPeer.prototype.get = function(self, key) { return this.map.get(key); }
fan.dom.WeakMapPeer.prototype.set = function(self, key, val) { this.map.set(key, val); return self; }
fan.dom.WeakMapPeer.prototype.delete = function(self, key) { return this.map.delete(key); }
fan.dom.Win = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Win.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.WinPeer(this);
  var $this = this;
}
fan.dom.Win.prototype.$typeof = function() { return fan.dom.Win.$type; }
fan.dom.Win.make = function() {
  var self = new fan.dom.Win();
  fan.dom.Win.make$(self);
  return self;
  }
fan.dom.Win.make$ = function(self)
{
  var ua = self.userAgent();
  self.m_isMac = fan.sys.Str.contains(ua,"Mac OS X");
  self.m_isWindows = fan.sys.Str.contains(ua,"Windows");
  self.m_isLinux = fan.sys.Str.contains(ua,"Linux");
  self.m_isWebkit = fan.sys.Str.contains(ua,"AppleWebKit/");
  self.m_isChrome = fan.sys.Str.contains(ua,"Chrome/");
  self.m_isSafari = (fan.sys.Str.contains(ua,"Safari/") && fan.sys.Str.contains(ua,"Version/"));
  self.m_isFirefox = fan.sys.Str.contains(ua,"Firefox/");
  self.m_isIE = (fan.sys.Str.contains(ua,"MSIE") || fan.sys.Str.contains(ua,"Trident/"));
  self.m_isEdge = fan.sys.Str.contains(ua,"Edge/");
  return;
}
fan.dom.Win.cur = function()
{
  return fan.dom.WinPeer.cur();
}
fan.dom.Win.prototype.open = function(uri,winName,opts)
{
  if (uri === undefined) uri = fan.sys.Uri.fromStr("about:blank");
  if (winName === undefined) winName = null;
  if (opts === undefined) opts = null;
  return this.peer.open(this,uri,winName,opts);
}
fan.dom.Win.prototype.close = function()
{
  return this.peer.close(this);
}
fan.dom.Win.prototype.doc = function()
{
  return this.peer.doc(this);
}
fan.dom.Win.prototype.textSel = function()
{
  return this.peer.textSel(this);
}
fan.dom.Win.prototype.addStyleRules = function(rules)
{
  return this.peer.addStyleRules(this,rules);
}
fan.dom.Win.prototype.alert = function(obj)
{
  return this.peer.alert(this,obj);
}
fan.dom.Win.prototype.confirm = function(obj)
{
  return this.peer.confirm(this,obj);
}
fan.dom.Win.prototype.viewport = function()
{
  return this.peer.viewport(this);
}
fan.dom.Win.prototype.screenSize = function()
{
  return this.peer.screenSize(this);
}
fan.dom.Win.prototype.parent = function()
{
  return this.peer.parent(this);
}
fan.dom.Win.prototype.top = function()
{
  return this.peer.top(this);
}
fan.dom.Win.eval = function(js)
{
  return fan.dom.WinPeer.eval(js);
}
fan.dom.Win.prototype.log = function(obj)
{
  return this.peer.log(this,obj);
}
fan.dom.Win.prototype.scrollPos = function()
{
  return this.peer.scrollPos(this);
}
fan.dom.Win.prototype.scrollTo = function(x,y)
{
  return this.peer.scrollTo(this,x,y);
}
fan.dom.Win.prototype.scrollBy = function(x,y)
{
  return this.peer.scrollBy(this,x,y);
}
fan.dom.Win.prototype.uri = function()
{
  return this.peer.uri(this);
}
fan.dom.Win.prototype.hyperlink = function(uri)
{
  return this.peer.hyperlink(this,uri);
}
fan.dom.Win.prototype.reload = function(force)
{
  if (force === undefined) force = false;
  return this.peer.reload(this,force);
}
fan.dom.Win.prototype.hisBack = function()
{
  return this.peer.hisBack(this);
}
fan.dom.Win.prototype.hisForward = function()
{
  return this.peer.hisForward(this);
}
fan.dom.Win.prototype.hisPushState = function(title,uri,map)
{
  return this.peer.hisPushState(this,title,uri,map);
}
fan.dom.Win.prototype.hisReplaceState = function(title,uri,map)
{
  return this.peer.hisReplaceState(this,title,uri,map);
}
fan.dom.Win.prototype.onEvent = function(type,useCapture,handler)
{
  return this.peer.onEvent(this,type,useCapture,handler);
}
fan.dom.Win.prototype.removeEvent = function(type,useCapture,handler)
{
  return this.peer.removeEvent(this,type,useCapture,handler);
}
fan.dom.Win.prototype.reqAnimationFrame = function(f)
{
  return this.peer.reqAnimationFrame(this,f);
}
fan.dom.Win.prototype.setTimeout = function(delay,f)
{
  return this.peer.setTimeout(this,delay,f);
}
fan.dom.Win.prototype.clearTimeout = function(timeoutId)
{
  return this.peer.clearTimeout(this,timeoutId);
}
fan.dom.Win.prototype.setInterval = function(delay,f)
{
  return this.peer.setInterval(this,delay,f);
}
fan.dom.Win.prototype.clearInterval = function(intervalId)
{
  return this.peer.clearInterval(this,intervalId);
}
fan.dom.Win.prototype.geoCurPosition = function(onSuccess,onErr,opts)
{
  if (onErr === undefined) onErr = null;
  if (opts === undefined) opts = null;
  return this.peer.geoCurPosition(this,onSuccess,onErr,opts);
}
fan.dom.Win.prototype.geoWatchPosition = function(onSuccess,onErr,opts)
{
  if (onErr === undefined) onErr = null;
  if (opts === undefined) opts = null;
  return this.peer.geoWatchPosition(this,onSuccess,onErr,opts);
}
fan.dom.Win.prototype.geoClearWatch = function(id)
{
  return this.peer.geoClearWatch(this,id);
}
fan.dom.Win.prototype.sessionStorage = function()
{
  return this.peer.sessionStorage(this);
}
fan.dom.Win.prototype.localStorage = function()
{
  return this.peer.localStorage(this);
}
fan.dom.Win.prototype.userAgent = function()
{
  return this.peer.userAgent(this);
}
fan.dom.Win.prototype.diagnostics = function()
{
  return this.peer.diagnostics(this);
}
fan.dom.Win.prototype.m_isMac = false;
fan.dom.Win.prototype.m_isWindows = false;
fan.dom.Win.prototype.m_isLinux = false;
fan.dom.Win.prototype.m_isWebkit = false;
fan.dom.Win.prototype.m_isChrome = false;
fan.dom.Win.prototype.m_isSafari = false;
fan.dom.Win.prototype.m_isFirefox = false;
fan.dom.Win.prototype.m_isIE = false;
fan.dom.Win.prototype.m_isEdge = false;
fan.dom.WinPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.WinPeer.prototype.$ctor = function(self)
{
  this.win = null;
}
fan.dom.WinPeer.cur = function()
{
  if (fan.dom.WinPeer.$cur == null)
  {
    fan.dom.WinPeer.$cur = fan.dom.Win.make();
    fan.dom.WinPeer.$cur.peer.win = window;
  }
  return fan.dom.WinPeer.$cur;
}
fan.dom.WinPeer.prototype.userAgent = function(self)
{
  return navigator.userAgent;
}
fan.dom.WinPeer.prototype.open = function(self, uri, name, opts)
{
  if (name === undefined) name = null;
  if (opts === undefined) opts = null;
  var optStr = "";
  if (opts != null)
  {
    var keys = opts.keys();
    for (var i=0; i<keys.size(); i++)
    {
      var key = keys.get(i);
      var val = opts.get(key);
      if (optStr != null) optStr += ",";
      optStr += key + "=" + val;
    }
  }
  var w = fan.dom.Win.make();
  if (opts != null) w.peer.win = this.win.open(uri.encode(), name, optStr);
  if (name != null) w.peer.win = this.win.open(uri.encode(), name);
  else              w.peer.win = this.win.open(uri.encode());
  return w;
}
fan.dom.WinPeer.prototype.close = function(self)
{
  this.win.close();
}
fan.dom.WinPeer.prototype.doc = function(self)
{
  if (this.$doc == null)
  {
    this.$doc = fan.dom.Doc.make();
    this.$doc.peer.doc = this.win.document;
  }
  return this.$doc;
}
fan.dom.WinPeer.prototype.textSel = function(self)
{
  if (this.$textSel == null)
  {
    this.$textSel = fan.dom.TextSel.make();
    this.$textSel.peer.sel = this.win.getSelection();
  }
  return this.$textSel;
}
fan.dom.WinPeer.prototype.addStyleRules = function(self, rules)
{
  var doc = this.win.document;
  var style = doc.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) style.styleSheet.cssText = rules;
  else style.appendChild(doc.createTextNode(rules));
  doc.getElementsByTagName("head")[0].appendChild(style);
}
fan.dom.WinPeer.prototype.alert = function(self, obj)
{
  this.win.alert(obj);
}
fan.dom.WinPeer.prototype.confirm = function(self, obj)
{
  return this.win.confirm(obj);
}
fan.dom.WinPeer.prototype.viewport = function(self)
{
  return (typeof this.win.innerWidth != "undefined")
    ? fan.graphics.Size.makeInt(this.win.innerWidth, this.win.innerHeight)
    : fan.graphics.Size.makeInt(
        this.win.document.documentElement.clientWidth,
        this.win.document.documentElement.clientHeight);
}
fan.dom.WinPeer.prototype.screenSize = function(self)
{
  if (this.$screenSize == null)
    this.$screenSize = fan.graphics.Size.makeInt(this.win.screen.width, this.win.screen.height);
  return this.$screenSize;
}
fan.dom.WinPeer.prototype.parent = function(self)
{
  if (this.win == this.win.parent) return null;
  if (this.$parent == null)
  {
    this.$parent = fan.dom.Win.make();
    this.$parent.peer.win = this.win.parent;
  }
  return this.$parent;
}
fan.dom.WinPeer.prototype.top = function(self)
{
  if (this.win == this.win.top) return self;
  if (this.$top == null)
  {
    this.$top = fan.dom.Win.make();
    this.$top.peer.win = this.win.top;
  }
  return this.$top;
}
fan.dom.WinPeer.eval = function(js)
{
  return eval(js);
}
fan.dom.WinPeer.prototype.log = function(self, obj)
{
  console.log(obj);
}
fan.dom.WinPeer.prototype.scrollPos = function(self)
{
  var x = this.win.scrollX;
  var y = this.win.scrollY;
  if (!this.m_scrollPos || this.m_scrollPos.m_x != x || this.m_scrollPos.m_y != y)
    this.m_scrollPos = fan.graphics.Point.makeInt(x, y);
  return this.m_scrollPos;
}
fan.dom.WinPeer.prototype.scrollTo = function(self, x, y)
{
  this.win.scrollTo(x, y)
}
fan.dom.WinPeer.prototype.scrollBy = function(self, x, y)
{
  this.win.scrollBy(x, y)
}
fan.dom.WinPeer.prototype.uri = function(self)
{
  return fan.sys.Uri.decode(this.win.location.toString());
}
fan.dom.WinPeer.prototype.hyperlink = function(self, uri)
{
  var href = uri.encode();
  if (uri.m_scheme == "mailto")
  {
    // TODO: mailto links are not decoding + as spaces properly, so
    // not showing up correctly in email clients when subj/body are
    // specified; for now just manually convert back
    href = href.replaceAll("+", " ");
  }
  this.win.location = href;
}
fan.dom.WinPeer.prototype.reload  = function(self, force)
{
  this.win.location.reload(force);
}
fan.dom.WinPeer.prototype.hisBack      = function(self) { this.win.history.back(); }
fan.dom.WinPeer.prototype.hisForward   = function(self) { this.win.history.forward(); }
fan.dom.WinPeer.prototype.hisPushState = function(self, title, uri, map)
{
  var state = fan.dom.WinPeer.mapToState(map);
  this.win.history.pushState(state, title, uri.encode());
}
fan.dom.WinPeer.prototype.hisReplaceState = function(self, title, uri, map)
{
  var state = fan.dom.WinPeer.mapToState(map);
  this.win.history.replaceState(state, title, uri.encode());
}
fan.dom.WinPeer.mapToState = function(map)
{
  // TODO FIXIT: serializtaion
  var array = [];
  map.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [
      new fan.sys.Param("val","sys::Obj",false),
      new fan.sys.Param("key","sys::Str",false)
    ]),
    fan.sys.Void.$type,
    function(val,key) { array[key] = val })
  );
  return array;
}
fan.dom.WinPeer.prototype.onEvent = function(self, type, useCapture, handler)
{
  handler.$func = function(e)
  {
    var evt = fan.dom.EventPeer.make(e);
    if (type == "popstate")
    {
      // copy state object into Event.stash
      // TODO FIXIT: deserializtaion
      var array = e.state;
      for (var key in array) evt.m_stash.set(key, array[key]);
    }
    handler.call(evt);
    if (type == "beforeunload")
    {
      var msg = evt.m_stash.get("beforeunloadMsg");
      if (msg != null)
      {
        e.returnValue = msg;
        return msg;
      }
    }
  }
  this.win.addEventListener(type, handler.$func, useCapture);
  return handler;
}
fan.dom.WinPeer.prototype.removeEvent = function(self, type, useCapture, handler)
{
  if (handler.$func)
    this.win.removeEventListener(type, handler.$func, useCapture);
}
fan.dom.WinPeer.prototype.fakeHashChange = function(self, handler)
{
  var $this = this;
  var getHash = function()
  {
    var href  = $this.win.location.href;
    var index = href.indexOf('#');
    return index == -1 ? '' : href.substr(index+1);
  }
  var oldHash = getHash();
  var checkHash = function()
  {
    var newHash = getHash();
    if (oldHash != newHash)
    {
      oldHash = newHash;
      handler.call(fan.dom.EventPeer.make(null));
    }
  }
  setInterval(checkHash, 100);
}
fan.dom.WinPeer.prototype.callLater = function(self, delay, f)
{
  var func = function() { f.call() }
  this.win.setTimeout(func, delay.toMillis());
}
fan.dom.WinPeer.prototype.reqAnimationFrame = function(self, f)
{
  var func = function() { f.call(self) };
  this.win.requestAnimationFrame(func);
}
fan.dom.WinPeer.prototype.setTimeout = function(self, delay, f)
{
  var func = function() { f.call(self) }
  return this.win.setTimeout(func, delay.toMillis());
}
fan.dom.WinPeer.prototype.clearTimeout = function(self, id)
{
  this.win.clearTimeout(id);
}
fan.dom.WinPeer.prototype.setInterval = function(self, delay, f)
{
  var func = function() { f.call(self) }
  return this.win.setInterval(func, delay.toMillis());
}
fan.dom.WinPeer.prototype.clearInterval = function(self, id)
{
  this.win.clearInterval(id);
}
fan.dom.WinPeer.prototype.geoCurPosition = function(self, onSuccess, onErr, opts)
{
  this.win.navigator.geolocation.getCurrentPosition(
    function(p,ts) { onSuccess.call(fan.dom.DomCoordPeer.wrap(p,ts)); },
    function(err)  { if (onErr) onErr.call(fan.sys.Err.make(err.code + ": " + err.message)); },
    this.$geoOpts(opts));
}
fan.dom.WinPeer.prototype.geoWatchPosition = function(self, onSuccess, onErr, opts)
{
  return this.win.navigator.geolocation.watchPosition(
    function(p,ts) { onSuccess.call(fan.dom.DomCoordPeer.wrap(p,ts)); },
    function(err)  { if (onErr) onErr.call(fan.sys.Err.make(err.code + ": " + err.message)); },
    this.$geoOpts(opts));
}
fan.dom.WinPeer.prototype.geoClearWatch = function(self, id)
{
  this.win.navigator.geolocation.clearWatch(id);
}
fan.dom.WinPeer.prototype.$geoOpts = function(fanMap)
{
  if (!fanMap) return null;
  var opts = {};
  var keys = fanMap.keys();
  for (var i=0; i<keys.size(); i++)
  {
    var key = keys.get(i);
    var val = fanMap.get(key);
    opts[key] = val;
  }
  return opts;
}
fan.dom.WinPeer.prototype.sessionStorage = function(self)
{
  if (this.$sessionStorage == null)
  {
    this.$sessionStorage = fan.dom.Storage.make();
    this.$sessionStorage.peer.$instance = this.win.sessionStorage;
  }
  return this.$sessionStorage;
}
fan.dom.WinPeer.prototype.localStorage = function(self)
{
  if (this.$localStorage == null)
  {
    this.$localStorage = fan.dom.Storage.make();
    this.$localStorage.peer.$instance = this.win.localStorage;
  }
  return this.$localStorage;
}
fan.dom.WinPeer.prototype.diagnostics = function(self)
{
  var map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Obj.$type);
  map.ordered$(true);
  var dur = function(s, e) {
    return s && e ? fan.sys.Duration.makeMillis(e-s) : null;
  }
  // user-agent
  map.set("ua", this.win.navigator.userAgent);
  // performance.timing
  var t = this.win.performance.timing;
  map.set("perf.timing.unload",         dur(t.unloadEventStart,      t.unloadEventEnd));
  map.set("perf.timing.redirect",       dur(t.redirectStart,         t.redirectEnd));
  map.set("perf.timing.domainLookup",   dur(t.domainLookupStart,     t.domainLookupEnd));
  map.set("perf.timing.connect",        dur(t.connectStart,          t.connectEnd));
  map.set("perf.timing.secureConnect",  dur(t.secureConnectionStart, t.connectEnd));
  map.set("perf.timing.request",        dur(t.requestStart,          t.responseStart));
  map.set("perf.timing.response",       dur(t.responseStart,         t.responseEnd));
  map.set("perf.timing.domInteractive", dur(t.domLoading,            t.domInteractive));
  map.set("perf.timing.domLoaded",      dur(t.domLoading,            t.domComplete));
  map.set("perf.timing.load",           dur(t.loadEventStart,        t.loadEventEnd));
  return map;
}
fan.dom.KeyFrames = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.KeyFrames.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.dom.KeyFrames.prototype.$typeof = function() { return fan.dom.KeyFrames.$type; }
fan.dom.KeyFrames.make = function(frames) {
  var self = new fan.dom.KeyFrames();
  fan.dom.KeyFrames.make$(self,frames);
  return self;
  }
fan.dom.KeyFrames.make$ = function(self,frames)
{
  var $this = self;
  self.m_$name = fan.sys.Str.plus("kf-",fan.sys.ObjUtil.coerce(fan.dom.KeyFrames.m_id.getAndIncrement(),fan.sys.Obj.$type.toNullable()));
  self.m_frames = fan.sys.ObjUtil.coerce((function($this) { var $_u39 = frames; if ($_u39 == null) return null; return fan.sys.ObjUtil.toImmutable($_u39); })(self),fan.sys.Type.find("dom::KeyFrame[]"));
  var buf = fan.sys.StrBuf.make();
  var out = buf.out();
  fan.sys.List.make(fan.sys.Str.$type, ["-webkit-","-moz-",""]).each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u40,
    function(prefix)
    {
      out.printLine(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("@",prefix),"keyframes "),$this.m_$name)," {"));
      frames.each(fan.sys.Func.make$closure(
        fan.dom.$clos$_u41,
        function(f)
        {
          out.print(fan.sys.Str.plus(fan.sys.Str.plus("  ",f.m_step)," {"));
          f.m_props.each(fan.sys.Func.make$closure(
            fan.dom.$clos$_u42,
            function(val,$name)
            {
              var names = fan.dom.Style.toVendor($name);
              names.each(fan.sys.Func.make$closure(
                fan.dom.$clos$_u14,
                function(n)
                {
                  out.print(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(" ",n),":"),val),";"));
                  return;
                }));
              return;
            }));
          out.printLine(" }");
          return;
        }));
      out.printLine("}");
      return;
    }));
  fan.dom.Win.cur().addStyleRules(buf.toStr());
  return;
}
fan.dom.KeyFrames.prototype.toStr = function()
{
  var $this = this;
  var buf = fan.sys.StrBuf.make();
  var out = buf.out();
  out.printLine(fan.sys.Str.plus(fan.sys.Str.plus("@keyframes ",this.m_$name)," {"));
  this.m_frames.each(fan.sys.Func.make$closure(
    fan.dom.$clos$_u41,
    function(f)
    {
      out.printLine(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("  ",f.m_step)," "),f.m_props));
      return;
    }));
  out.printLine("}");
  return buf.toStr();
}
fan.dom.KeyFrames.static$init = function()
{
  fan.dom.KeyFrames.m_id = fan.concurrent.AtomicInt.make(0);
  return;
}
fan.dom.KeyFrames.prototype.m_frames = null;
fan.dom.KeyFrames.prototype.m_$name = null;
fan.dom.KeyFrames.m_id = null;
fan.dom.KeyFrame = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.KeyFrame.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.dom.KeyFrame.prototype.$typeof = function() { return fan.dom.KeyFrame.$type; }
fan.dom.KeyFrame.make = function(step,props) {
  var self = new fan.dom.KeyFrame();
  fan.dom.KeyFrame.make$(self,step,props);
  return self;
  }
fan.dom.KeyFrame.make$ = function(self,step,props)
{
  self.m_step = step;
  self.m_props = fan.sys.ObjUtil.coerce((function($this) { var $_u43 = props; if ($_u43 == null) return null; return fan.sys.ObjUtil.toImmutable($_u43); })(self),fan.sys.Type.find("[sys::Str:sys::Obj]"));
  return;
}
fan.dom.KeyFrame.prototype.m_step = null;
fan.dom.KeyFrame.prototype.m_props = null;
fan.dom.$pod = fan.sys.Pod.$add('dom');
with (fan.dom.$pod)
{
  fan.dom.Storage.$type = $at('Storage','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.MutationObserver.$type = $at('MutationObserver','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.MutationRec.$type = $at('MutationRec','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.TextSel.$type = $at('TextSel','sys::Obj',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.dom.CanvasGraphics.$type = $at('CanvasGraphics','sys::Obj',['graphics::Graphics'],{'sys::Js':""},640);
  fan.dom.CanvasGraphicsPath.$type = $at('CanvasGraphicsPath','sys::Obj',['graphics::GraphicsPath'],{'sys::Js':""},640);
  fan.dom.CanvasFontMetrics.$type = $at('CanvasFontMetrics','graphics::FontMetrics',[],{'sys::Js':""},642);
  fan.dom.Elem.$type = $at('Elem','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.Style.$type = $at('Style','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.Svg.$type = $at('Svg','sys::Obj',[],{'sys::Js':""},8226);
  fan.dom.DomCoord.$type = $at('DomCoord','sys::Obj',[],{'sys::Js':""},8194);
  fan.dom.DomGraphicsEnv.$type = $at('DomGraphicsEnv','sys::Obj',['graphics::GraphicsEnv'],{'sys::NoDoc':"",'sys::Js':""},8194);
  fan.dom.HttpReq.$type = $at('HttpReq','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.ResizeObserver.$type = $at('ResizeObserver','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.ResizeObserverEntry.$type = $at('ResizeObserverEntry','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.DataTransfer.$type = $at('DataTransfer','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.HttpRes.$type = $at('HttpRes','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.Doc.$type = $at('Doc','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.Key.$type = $at('Key','sys::Obj',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.dom.DomFile.$type = $at('DomFile','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.Event.$type = $at('Event','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.DomImage.$type = $at('DomImage','sys::Obj',['graphics::Image'],{'sys::Js':""},130);
  fan.dom.CssDim.$type = $at('CssDim','sys::Obj',[],{'sys::NoDoc':"",'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8194);
  fan.dom.WeakMap.$type = $at('WeakMap','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.Win.$type = $at('Win','sys::Obj',[],{'sys::Js':""},8192);
  fan.dom.KeyFrames.$type = $at('KeyFrames','sys::Obj',[],{'sys::Js':""},8194);
  fan.dom.KeyFrame.$type = $at('KeyFrame','sys::Obj',[],{'sys::Js':""},8194);
  fan.dom.Storage.$type.$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('key',8704,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('get',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false)]),{'sys::Operator':""}).$am('set',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('val','sys::Obj',false)]),{'sys::Operator':""}).$am('remove',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false)]),{}).$am('clear',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.MutationObserver.$type.$af('callback',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('callback','|dom::MutationRec[]->sys::Void|',false)]),{}).$am('observe',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','dom::Elem',false),new fan.sys.Param('opts','[sys::Str:sys::Obj]',false)]),{}).$am('takeRecs',8704,'dom::MutationRec[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('disconnet',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.MutationRec.$type.$af('type',73728,'sys::Str',{}).$af('target',73728,'dom::Elem',{}).$af('added',73728,'dom::Elem[]',{}).$af('removed',73728,'dom::Elem[]',{}).$af('prevSibling',73728,'dom::Elem?',{}).$af('nextSibling',73728,'dom::Elem?',{}).$af('attr',73728,'sys::Str?',{}).$af('attrNs',73728,'sys::Str?',{}).$af('oldVal',73728,'sys::Str?',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{});
  fan.dom.TextSel.$type.$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.CanvasGraphics.$type.$af('paint',271872,'graphics::Paint',{}).$af('color',271872,'graphics::Color',{}).$af('stroke',271872,'graphics::Stroke',{}).$af('alpha',271872,'sys::Float',{}).$af('font',271872,'graphics::Font',{}).$am('render',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('canvas','dom::Elem',false),new fan.sys.Param('cb','|graphics::Graphics->sys::Void|',false)]),{}).$am('metrics',271872,'graphics::FontMetrics',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('path',271872,'graphics::GraphicsPath',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('drawLine',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x1','sys::Float',false),new fan.sys.Param('y1','sys::Float',false),new fan.sys.Param('x2','sys::Float',false),new fan.sys.Param('y2','sys::Float',false)]),{}).$am('drawRect',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('fillRect',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('clipRect',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('drawRoundRect',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false),new fan.sys.Param('wArc','sys::Float',false),new fan.sys.Param('hArc','sys::Float',false)]),{}).$am('fillRoundRect',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false),new fan.sys.Param('wArc','sys::Float',false),new fan.sys.Param('hArc','sys::Float',false)]),{}).$am('drawText',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('drawImage',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','graphics::Image',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',true),new fan.sys.Param('h','sys::Float',true)]),{}).$am('drawImageRegion',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','graphics::Image',false),new fan.sys.Param('src','graphics::Rect',false),new fan.sys.Param('dst','graphics::Rect',false)]),{}).$am('translate',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('transform',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('transform','graphics::Transform',false)]),{}).$am('push',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','graphics::Rect?',true)]),{}).$am('pop',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dispose',271872,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.CanvasGraphicsPath.$type.$am('draw',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fill',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clip',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('moveTo',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('lineTo',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('arc',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('radius','sys::Float',false),new fan.sys.Param('start','sys::Float',false),new fan.sys.Param('sweep','sys::Float',false)]),{}).$am('curveTo',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cp1x','sys::Float',false),new fan.sys.Param('cp1y','sys::Float',false),new fan.sys.Param('cp2x','sys::Float',false),new fan.sys.Param('cp2y','sys::Float',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('quadTo',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cpx','sys::Float',false),new fan.sys.Param('cpy','sys::Float',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('close',271872,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.CanvasFontMetrics.$type.$af('height',271872,'sys::Float',{}).$af('ascent',271872,'sys::Float',{}).$af('descent',271872,'sys::Float',{}).$af('leading',271872,'sys::Float',{}).$am('width',271872,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.Elem.$type.$af('id',8192,'sys::Str?',{}).$af('text',8704,'sys::Str',{}).$af('html',8704,'sys::Str',{}).$af('enabled',270848,'sys::Bool?',{}).$af('pos',8704,'graphics::Point',{}).$af('size',8704,'graphics::Size',{}).$af('scrollPos',8704,'graphics::Point',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tagName','sys::Str',true),new fan.sys.Param('ns','sys::Uri?',true)]),{}).$am('_make',2560,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tagName','sys::Str',false),new fan.sys.Param('ns','sys::Uri?',false)]),{}).$am('fromNative',41474,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','sys::Obj',false),new fan.sys.Param('type','sys::Type',true)]),{}).$am('fromHtml',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('html','sys::Str',false)]),{}).$am('ns',8704,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tagName',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('style',8704,'dom::Style',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('attrs',8704,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('attr',8704,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('setAttr',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Str?',false),new fan.sys.Param('ns','sys::Uri?',true)]),{}).$am('removeAttr',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('get',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{'sys::Operator':""}).$am('set',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Str?',false)]),{'sys::Operator':""}).$am('prop',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('setProp',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('trap',271872,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('invoke',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('pagePos',8704,'graphics::Point',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('relPos',8192,'graphics::Point',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','graphics::Point',false)]),{}).$am('scrollSize',8704,'graphics::Size',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('scrollIntoView',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('alignToTop','sys::Bool',true)]),{}).$am('renderCanvas',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|graphics::Graphics->sys::Void|',false)]),{}).$am('parent',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasChildren',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('children',8704,'dom::Elem[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('firstChild',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('lastChild',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('prevSibling',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('nextSibling',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('containsChild',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('querySelector',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selectors','sys::Str',false)]),{}).$am('querySelectorAll',8704,'dom::Elem[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selectors','sys::Str',false)]),{}).$am('clone',8704,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('deep','sys::Bool',true)]),{}).$am('add',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)]),{'sys::Operator':""}).$am('insertBefore',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false),new fan.sys.Param('ref','dom::Elem',false)]),{}).$am('replace',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('oldChild','dom::Elem',false),new fan.sys.Param('newChild','dom::Elem',false)]),{}).$am('remove',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)]),{}).$am('addAll',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elems','dom::Elem[]',false)]),{}).$am('removeAll',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addChild',4608,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)]),{'sys::NoDoc':""}).$am('insertChildBefore',4608,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false),new fan.sys.Param('ref','dom::Elem',false)]),{'sys::NoDoc':""}).$am('replaceChild',4608,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('oldChild','dom::Elem',false),new fan.sys.Param('newChild','dom::Elem',false)]),{'sys::NoDoc':""}).$am('removeChild',4608,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)]),{'sys::NoDoc':""}).$am('onParent',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','dom::Elem',false)]),{'sys::NoDoc':""}).$am('onUnparent',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','dom::Elem',false)]),{'sys::NoDoc':""}).$am('onAdd',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)]),{'sys::NoDoc':""}).$am('onRemove',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)]),{'sys::NoDoc':""}).$am('hasFocus',270848,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('focus',270848,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('blur',270848,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onEvent',8704,'sys::Func',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','|dom::Event->sys::Void|',false)]),{}).$am('removeEvent',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','sys::Func',false)]),{}).$am('transition',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Obj]',false),new fan.sys.Param('opts','[sys::Str:sys::Obj]?',false),new fan.sys.Param('dur','sys::Duration',false),new fan.sys.Param('onComplete','|dom::Elem->sys::Void|?',true)]),{}).$am('animateStart',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('frames','dom::KeyFrames',false),new fan.sys.Param('opts','[sys::Str:sys::Obj]?',false),new fan.sys.Param('dur','sys::Duration',false)]),{}).$am('animateStop',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.Style.$type.$af('classes',8704,'sys::Str[]',{}).$af('vendor',100354,'[sys::Str:sys::Str[]]',{}).$af('vendorVals',100354,'sys::Str[]',{}).$af('counter',100354,'concurrent::AtomicInt',{}).$af('pseudoCacheRef',100354,'concurrent::AtomicRef',{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasClass',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('addClass',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('removeClass',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('toggleClass',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('cond','sys::Bool?',true)]),{}).$am('addPseudoClass',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('css','sys::Str',false)]),{}).$am('clear',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('computed',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('effective',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('get',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{'sys::Operator':""}).$am('set',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)]),{'sys::Operator':""}).$am('setAll',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('map','[sys::Str:sys::Obj?]',false)]),{}).$am('setCss',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('css','sys::Str',false)]),{}).$am('trap',271360,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('setProp',2560,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Str?',false)]),{}).$am('fromCamel',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('toVendors',32898,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('names','sys::Str[]',false)]),{}).$am('toVendor',32898,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('pseudoCache',34818,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.Svg.$type.$af('ns',106498,'sys::Uri',{}).$af('nsXLink',106498,'sys::Uri',{}).$af('genId',100354,'concurrent::AtomicInt',{}).$af('camelMap',100354,'[sys::Str:sys::Str]',{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('elem',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tagName','sys::Str',false)]),{}).$am('line',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x1','sys::Num',false),new fan.sys.Param('y1','sys::Num',false),new fan.sys.Param('x2','sys::Num',false),new fan.sys.Param('y2','sys::Num',false)]),{}).$am('rect',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Num',false),new fan.sys.Param('y','sys::Num',false),new fan.sys.Param('w','sys::Num',false),new fan.sys.Param('h','sys::Num',false)]),{}).$am('text',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('text','sys::Str',false),new fan.sys.Param('x','sys::Num',false),new fan.sys.Param('y','sys::Num',false)]),{}).$am('image',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('href','sys::Uri',false),new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('w','sys::Float',false),new fan.sys.Param('h','sys::Float',false)]),{}).$am('def',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('svgElem','dom::Elem',false),new fan.sys.Param('defElem','dom::Elem',false)]),{}).$am('defUrl',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('svgElem','dom::Elem',false),new fan.sys.Param('defElem','dom::Elem',false)]),{}).$am('doTrap',32898,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('svgElem','dom::Elem',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('fromCamel',34818,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.DomCoord.$type.$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('lat',8704,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('lng',8704,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('accuracy',8704,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('altitude',8704,'sys::Float?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('altitudeAccuracy',8704,'sys::Float?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('heading',8704,'sys::Float?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('speed',8704,'sys::Float?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ts',8704,'sys::Duration?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.DomGraphicsEnv.$type.$af('images',67586,'concurrent::ConcurrentMap',{}).$am('image',271360,'graphics::Image',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('data','sys::Buf?',true)]),{}).$am('loadImage',2048,'dom::DomImage',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.HttpReq.$type.$af('uri',73728,'sys::Uri',{}).$af('headers',73728,'[sys::Str:sys::Str]',{}).$af('async',73728,'sys::Bool',{}).$af('resType',73728,'sys::Str',{'sys::NoDoc':""}).$af('withCredentials',73728,'sys::Bool',{}).$af('cbProgress',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('onProgress',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Int,sys::Int->sys::Void|',false)]),{}).$am('send',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('method','sys::Str',false),new fan.sys.Param('content','sys::Obj?',false),new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)]),{}).$am('get',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)]),{}).$am('post',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('content','sys::Obj',false),new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)]),{}).$am('postForm',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('form','[sys::Str:sys::Str]',false),new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)]),{}).$am('postFormMultipart',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('form','[sys::Str:sys::Obj]',false),new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)]),{});
  fan.dom.ResizeObserver.$type.$af('callback',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('observe',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','dom::Elem',false)]),{}).$am('unobserve',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','dom::Elem',false)]),{}).$am('disconnet',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onResize',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('callback','|dom::ResizeObserverEntry[]->sys::Void|',false)]),{});
  fan.dom.ResizeObserverEntry.$type.$af('target',73728,'dom::Elem',{}).$af('size',73730,'graphics::Size',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.DataTransfer.$type.$af('dropEffect',8704,'sys::Str',{}).$af('effectAllowed',8704,'sys::Str',{}).$am('types',8704,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getData',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false)]),{}).$am('setData',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('val','sys::Str',false)]),{}).$am('setDragImage',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('image','dom::Elem',false),new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)]),{}).$am('files',8704,'dom::DomFile[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.HttpRes.$type.$af('status',73728,'sys::Int',{}).$af('headers',73728,'[sys::Str:sys::Str]',{}).$af('content',73728,'sys::Str',{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.Doc.$type.$af('title',8704,'sys::Str',{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('head',8704,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('body',8704,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('activeElem',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('elemById',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('id','sys::Str',false)]),{}).$am('createElem',8704,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tagName','sys::Str',false),new fan.sys.Param('attrib','[sys::Str:sys::Str]?',true),new fan.sys.Param('ns','sys::Uri?',true)]),{}).$am('createFrag',8704,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('querySelector',8704,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selectors','sys::Str',false)]),{}).$am('querySelectorAll',8704,'dom::Elem[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selectors','sys::Str',false)]),{}).$am('querySelectorAllType',8704,'dom::Elem[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('selectors','sys::Str',false),new fan.sys.Param('type','sys::Type',false)]),{'sys::NoDoc':""}).$am('exportPng',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','dom::Elem',false)]),{'sys::NoDoc':""}).$am('exportJpg',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','dom::Elem',false),new fan.sys.Param('quality','sys::Float?',false)]),{'sys::NoDoc':""}).$am('onEvent',8704,'sys::Func',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','|dom::Event->sys::Void|',false)]),{}).$am('removeEvent',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','sys::Func',false)]),{}).$am('exec',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('defUi','sys::Bool',true),new fan.sys.Param('val','sys::Obj?',true)]),{}).$am('out',8704,'web::WebOutStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cookies',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addCookie',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','web::Cookie',false)]),{}).$am('getCookiesStr',2560,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.Key.$type.$af('a',106498,'dom::Key',{}).$af('b',106498,'dom::Key',{}).$af('c',106498,'dom::Key',{}).$af('d',106498,'dom::Key',{}).$af('e',106498,'dom::Key',{}).$af('f',106498,'dom::Key',{}).$af('g',106498,'dom::Key',{}).$af('h',106498,'dom::Key',{}).$af('i',106498,'dom::Key',{}).$af('j',106498,'dom::Key',{}).$af('k',106498,'dom::Key',{}).$af('l',106498,'dom::Key',{}).$af('m',106498,'dom::Key',{}).$af('n',106498,'dom::Key',{}).$af('o',106498,'dom::Key',{}).$af('p',106498,'dom::Key',{}).$af('q',106498,'dom::Key',{}).$af('r',106498,'dom::Key',{}).$af('s',106498,'dom::Key',{}).$af('t',106498,'dom::Key',{}).$af('u',106498,'dom::Key',{}).$af('v',106498,'dom::Key',{}).$af('w',106498,'dom::Key',{}).$af('x',106498,'dom::Key',{}).$af('y',106498,'dom::Key',{}).$af('z',106498,'dom::Key',{}).$af('num0',106498,'dom::Key',{}).$af('num1',106498,'dom::Key',{}).$af('num2',106498,'dom::Key',{}).$af('num3',106498,'dom::Key',{}).$af('num4',106498,'dom::Key',{}).$af('num5',106498,'dom::Key',{}).$af('num6',106498,'dom::Key',{}).$af('num7',106498,'dom::Key',{}).$af('num8',106498,'dom::Key',{}).$af('num9',106498,'dom::Key',{}).$af('space',106498,'dom::Key',{}).$af('backspace',106498,'dom::Key',{}).$af('enter',106498,'dom::Key',{}).$af('delete',106498,'dom::Key',{}).$af('esc',106498,'dom::Key',{}).$af('tab',106498,'dom::Key',{}).$af('capsLock',106498,'dom::Key',{}).$af('semicolon',106498,'dom::Key',{}).$af('equal',106498,'dom::Key',{}).$af('comma',106498,'dom::Key',{}).$af('dash',106498,'dom::Key',{}).$af('period',106498,'dom::Key',{}).$af('slash',106498,'dom::Key',{}).$af('backtick',106498,'dom::Key',{}).$af('openBracket',106498,'dom::Key',{}).$af('backSlash',106498,'dom::Key',{}).$af('closeBracket',106498,'dom::Key',{}).$af('quote',106498,'dom::Key',{}).$af('left',106498,'dom::Key',{}).$af('up',106498,'dom::Key',{}).$af('right',106498,'dom::Key',{}).$af('down',106498,'dom::Key',{}).$af('pageUp',106498,'dom::Key',{}).$af('pageDown',106498,'dom::Key',{}).$af('home',106498,'dom::Key',{}).$af('end',106498,'dom::Key',{}).$af('insert',106498,'dom::Key',{}).$af('f1',106498,'dom::Key',{}).$af('f2',106498,'dom::Key',{}).$af('f3',106498,'dom::Key',{}).$af('f4',106498,'dom::Key',{}).$af('f5',106498,'dom::Key',{}).$af('f6',106498,'dom::Key',{}).$af('f7',106498,'dom::Key',{}).$af('f8',106498,'dom::Key',{}).$af('f9',106498,'dom::Key',{}).$af('f10',106498,'dom::Key',{}).$af('alt',106498,'dom::Key',{}).$af('shift',106498,'dom::Key',{}).$af('ctrl',106498,'dom::Key',{}).$af('meta',106498,'dom::Key',{}).$af('byCode',100354,'[sys::Int:dom::Key]',{}).$af('byName',100354,'[sys::Str:dom::Key]',{}).$af('name',73730,'sys::Str',{}).$af('code',73730,'sys::Int',{}).$af('symbol',73730,'sys::Str?',{}).$am('fromStr',40966,'dom::Key?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('fromCode',40962,'dom::Key',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('code','sys::Int',false)]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('code','sys::Int',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('symbol','sys::Str?',true)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isModifier',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.DomFile.$type.$am('name',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ext',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('type',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAsDataUri',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Uri->sys::Void|',false)]),{}).$am('readAsText',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.Event.$type.$af('stash',73728,'[sys::Str:sys::Obj?]',{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeMock',41474,'dom::Event',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('fromNative',41474,'dom::Event',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','sys::Obj',false)]),{}).$am('type',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('target',8704,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pagePos',8704,'graphics::Point',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('alt',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ctrl',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('shift',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('meta',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('button',8704,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('delta',8704,'graphics::Point?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('key',8704,'dom::Key?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('err',8704,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('stop',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('def','sys::Obj?',true)]),{'sys::Operator':""}).$am('set',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)]),{'sys::Operator':""}).$am('trap',271360,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('dataTransfer',8704,'dom::DataTransfer',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.DomImage.$type.$af('uri',336898,'sys::Uri',{}).$af('mime',336898,'sys::MimeType',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('mime','sys::MimeType',false),new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('init',2560,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('isLoaded',271872,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',271872,'graphics::Size',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('w',271872,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('h',271872,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',271360,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('prop','sys::Str',false)]),{'sys::Operator':""});
  fan.dom.CssDim.$type.$af('defVal',106498,'dom::CssDim',{}).$af('val',73730,'sys::Num',{}).$af('unit',73730,'sys::Str',{}).$af('autoVal',100354,'dom::CssDim',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Num',false),new fan.sys.Param('unit','sys::Str',false)]),{}).$am('fromStr',40966,'dom::CssDim?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.WeakMap.$type.$am('has',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false)]),{}).$am('get',8704,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false)]),{'sys::Operator':""}).$am('set',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false),new fan.sys.Param('val','sys::Obj',false)]),{'sys::Operator':""}).$am('delete',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Obj',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.Win.$type.$af('isMac',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isWindows',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isLinux',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isWebkit',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isChrome',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isSafari',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isFirefox',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isIE',73730,'sys::Bool',{'sys::NoDoc':""}).$af('isEdge',73730,'sys::Bool',{'sys::NoDoc':""}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cur',41474,'dom::Win',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('open',8704,'dom::Win',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',true),new fan.sys.Param('winName','sys::Str?',true),new fan.sys.Param('opts','[sys::Str:sys::Str]?',true)]),{}).$am('close',8704,'dom::Win',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doc',8704,'dom::Doc',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('textSel',8704,'dom::TextSel',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('addStyleRules',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rules','sys::Str',false)]),{}).$am('alert',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('confirm',8704,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('viewport',8704,'graphics::Size',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('screenSize',8704,'graphics::Size',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parent',8704,'dom::Win?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('top',8704,'dom::Win',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('eval',41474,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('js','sys::Str',false)]),{}).$am('log',8704,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('scrollPos',8704,'graphics::Point',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('scrollTo',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)]),{}).$am('scrollBy',8704,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)]),{}).$am('uri',8704,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hyperlink',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('reload',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('force','sys::Bool',true)]),{}).$am('hisBack',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hisForward',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hisPushState',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('title','sys::Str',false),new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('map','[sys::Str:sys::Obj]',false)]),{}).$am('hisReplaceState',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('title','sys::Str',false),new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('map','[sys::Str:sys::Obj]',false)]),{}).$am('onEvent',8704,'sys::Func',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','|dom::Event->sys::Void|',false)]),{}).$am('removeEvent',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','sys::Func',false)]),{}).$am('reqAnimationFrame',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('setTimeout',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('delay','sys::Duration',false),new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('clearTimeout',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('timeoutId','sys::Int',false)]),{}).$am('setInterval',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('delay','sys::Duration',false),new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('clearInterval',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('intervalId','sys::Int',false)]),{}).$am('geoCurPosition',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onSuccess','|dom::DomCoord->sys::Void|',false),new fan.sys.Param('onErr','|sys::Err->sys::Void|?',true),new fan.sys.Param('opts','[sys::Str:sys::Obj]?',true)]),{}).$am('geoWatchPosition',8704,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onSuccess','|dom::DomCoord->sys::Void|',false),new fan.sys.Param('onErr','|sys::Err->sys::Void|?',true),new fan.sys.Param('opts','[sys::Str:sys::Obj]?',true)]),{}).$am('geoClearWatch',8704,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('id','sys::Int',false)]),{}).$am('sessionStorage',8704,'dom::Storage',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localStorage',8704,'dom::Storage',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('userAgent',8704,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('diagnostics',8704,'[sys::Str:sys::Obj]',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""});
  fan.dom.KeyFrames.$type.$af('frames',73730,'dom::KeyFrame[]',{}).$af('name',65666,'sys::Str',{}).$af('id',100354,'concurrent::AtomicInt',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('frames','dom::KeyFrame[]',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.dom.KeyFrame.$type.$af('step',73730,'sys::Str',{}).$af('props',73730,'[sys::Str:sys::Obj]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('step','sys::Str',false),new fan.sys.Param('props','[sys::Str:sys::Obj]',false)]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "dom");
  m_meta.set("pod.version", "1.0.78.3106");
  m_version = fan.sys.Version.fromStr("1.0.78.3106");
  m_meta.set("pod.depends", "sys 1.0;concurrent 1.0;graphics 1.0;web 1.0");
  m_meta.set("pod.summary", "Web Browser DOM API");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:23:12-05:00 New_York");
  m_meta.set("build.tsKey", "221115162312");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("pod.docSrc", "true");
  m_meta.set("license.name", "Academic Free License 3.0");
  m_meta.set("org.name", "Fantom");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "Fantom Core");
  m_meta.set("proj.uri", "https://fantom.org/");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://fantom.org/");
  m_meta.set("pod.native.java", "true");
  m_meta.set("vcs.uri", "https://github.com/fantom-lang/fantom");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("vcs.name", "Git");
  m_meta.set("pod.native.js", "true");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
fan.dom.$clos$_u1 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Elem","false"]);
fan.dom.$clos$_u2 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","dom::Elem","false"]);
fan.dom.$clos$_u3 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["kid","dom::Elem","false"]);
fan.dom.$clos$_u4 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["val","sys::Obj","false","prop","sys::Str","false"]);
fan.dom.$clos$_u5 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Win","false"]);
fan.dom.$clos$_u10 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["v","sys::Str","false"]);
fan.dom.$clos$_u11 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Obj?","false","n","sys::Str","false"]);
fan.dom.$clos$_u12 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["s","sys::Str","false"]);
fan.dom.$clos$_u13 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["ch","sys::Int","false"]);
fan.dom.$clos$_u14 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","sys::Str","false"]);
fan.dom.$clos$_u17 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["kid","dom::Elem","false"]);
fan.dom.$clos$_u19 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Str","false","n","sys::Str","false"]);
fan.dom.$clos$_u22 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","[sys::Str:sys::Str]","false"]);
fan.dom.$clos$_u26 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["f","sys::Field","false"]);
fan.dom.$clos$_u36 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["ch","sys::Int","false"]);
fan.dom.$clos$_u40 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["prefix","sys::Str","false"]);
fan.dom.$clos$_u41 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["f","dom::KeyFrame","false"]);
fan.dom.$clos$_u42 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["val","sys::Obj","false","$name","sys::Str","false"]);
fan.dom.Style.static$init();
fan.dom.Svg.static$init();
fan.dom.Key.static$init();
fan.dom.CssDim.static$init();
fan.dom.KeyFrames.static$init();
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

if (typeof exports !== 'undefined') {
  fan.domkit = exports;
} else {
  fan.domkit = root.fan.domkit = {};
}

fan.domkit.Button = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Button.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_popupOffset = fan.graphics.Point.m_defVal;
  this.m_isCombo = false;
  this.m_mouseDown = false;
  this.m_popup = null;
  this.m_cbAction = null;
  this.m_cbPopup = null;
  return;
}
fan.domkit.Button.prototype.$typeof = function() { return fan.domkit.Button.$type; }
fan.domkit.Button.make = function() {
  var self = new fan.domkit.Button();
  fan.domkit.Button.make$(self);
  return self;
  }
fan.domkit.Button.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self);
  ;
  self.style().addClass("domkit-control domkit-control-button domkit-Button");
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      e.stop();
      if (!fan.sys.ObjUtil.coerce($this.enabled(),fan.sys.Bool.$type))
      {
        return;
      }
      ;
      $this.m__event = e;
      $this.m_mouseDown = true;
      $this.doMouseDown();
      return;
    }));
  self.onEvent("mouseup",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (!fan.sys.ObjUtil.coerce($this.enabled(),fan.sys.Bool.$type))
      {
        return;
      }
      ;
      $this.m__event = e;
      $this.doMouseUp();
      if ($this.m_mouseDown)
      {
        $this.fireAction(e);
        if ($this.m_cbPopup != null)
        {
          $this.openPopup();
        }
        ;
      }
      ;
      $this.m_mouseDown = false;
      return;
    }));
  self.onEvent("mouseleave",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (!$this.m_mouseDown)
      {
        return;
      }
      ;
      $this.m__event = e;
      $this.doMouseUp();
      $this.m_mouseDown = false;
      return;
    }));
  self.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (!fan.sys.ObjUtil.coerce($this.enabled(),fan.sys.Bool.$type))
      {
        return;
      }
      ;
      $this.m__event = e;
      if ((fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_space) || (fan.sys.ObjUtil.is($this,fan.domkit.ListButton.$type) && fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_down))))
      {
        $this.doMouseDown();
        if ($this.m_cbPopup == null)
        {
          fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
            fan.domkit.$clos$_u1,
            function()
            {
              $this.fireAction(e);
              $this.doMouseUp();
              return;
            }));
        }
        else
        {
          if (fan.sys.ObjUtil.equals((function($this) { var $_u2=$this.m_popup; return ($_u2==null) ? null : $_u2.m_isOpen }($this)),true))
          {
            $this.m_popup.close();
          }
          else
          {
            $this.openPopup();
          }
          ;
        }
        ;
      }
      ;
      return;
    }));
  return;
}
fan.domkit.Button.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.domkit.Button.prototype.onPopup = function(f)
{
  this.m_cbPopup = f;
  return;
}
fan.domkit.Button.prototype.popupOffset = function()
{
  return this.m_popupOffset;
}
fan.domkit.Button.prototype.popupOffset$ = function(it)
{
  this.m_popupOffset = it;
  return;
}
fan.domkit.Button.prototype.removeOnPopup = function()
{
  this.m_cbPopup = null;
  return;
}
fan.domkit.Button.prototype.openPopup = function()
{
  var $this = this;
  if (this.m_cbPopup == null)
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.equals((function($this) { var $_u3=$this.m_popup; return ($_u3==null) ? null : $_u3.m_isOpen }(this)),true))
  {
    return;
  }
  ;
  var x = fan.sys.Float.plus(this.pagePos().m_x,this.m_popupOffset.m_x);
  var y = fan.sys.Float.plusInt(fan.sys.Float.plus(this.pagePos().m_y,this.m_popupOffset.m_y),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.size().m_h,fan.sys.Num.$type)));
  var w = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(this.size().m_w,fan.sys.Num.$type));
  if (this.m_isCombo)
  {
    var combo = this.parent();
    x = combo.pagePos().m_x;
    w = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(combo.size().m_w,fan.sys.Num.$type));
  }
  ;
  this.showDown();
  this.m_popup = fan.sys.ObjUtil.coerce(this.m_cbPopup.call(this),fan.domkit.Popup.$type.toNullable());
  var $_u4 = this.m_popup.m_halign;
  if (fan.sys.ObjUtil.equals($_u4,fan.domkit.Align.m_center))
  {
    x = fan.sys.Float.plusInt(x,fan.sys.Int.div(w,2));
  }
  else if (fan.sys.ObjUtil.equals($_u4,fan.domkit.Align.m_right))
  {
    x = fan.sys.Float.plusInt(x,w);
  }
  ;
  this.m_popup._onClose(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u5,
    function(it)
    {
      $this.showUp();
      if ($this.m_isCombo)
      {
        fan.sys.ObjUtil.coerce($this.parent(),fan.domkit.Combo.$type).m_field.focus();
      }
      else
      {
        $this.focus();
      }
      ;
      return;
    }));
  if (this.m_popup.style().effective("min-width") == null)
  {
    this.m_popup.style().trap("minWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(w,fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  this.m_popup.open(x,y);
  return;
}
fan.domkit.Button.prototype.enabled = function()
{
  return fan.sys.ObjUtil.coerce(!this.style().hasClass("disabled"),fan.sys.Bool.$type.toNullable());
}
fan.domkit.Button.prototype.enabled$ = function(it)
{
  if (fan.sys.ObjUtil.coerce(it,fan.sys.Bool.$type))
  {
    this.style().removeClass("disabled");
    this.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  }
  else
  {
    this.style().addClass("disabled");
    this.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(-1,fan.sys.Obj.$type.toNullable())]));
  }
  ;
  return;
}
fan.domkit.Button.prototype.isCombo = function()
{
  return this.m_isCombo;
}
fan.domkit.Button.prototype.isCombo$ = function(it)
{
  this.m_isCombo = it;
  return;
}
fan.domkit.Button.prototype.showDown = function()
{
  this.style().addClass("down");
  return;
}
fan.domkit.Button.prototype.showUp = function()
{
  this.style().removeClass("down");
  return;
}
fan.domkit.Button.prototype.doMouseDown = function()
{
  this.showDown();
  return;
}
fan.domkit.Button.prototype.doMouseUp = function()
{
  this.showUp();
  return;
}
fan.domkit.Button.prototype.mouseDown = function()
{
  return this.m_mouseDown;
}
fan.domkit.Button.prototype.mouseDown$ = function(it)
{
  this.m_mouseDown = it;
  return;
}
fan.domkit.Button.prototype.fireAction = function(e)
{
  (function($this) { var $_u6 = $this.m_cbAction; if ($_u6 == null) return null; return $_u6.call($this); })(this);
  return;
}
fan.domkit.Button.prototype._event = function()
{
  return this.m__event;
}
fan.domkit.Button.prototype._event$ = function(it)
{
  this.m__event = it;
  return;
}
fan.domkit.Button.prototype.popup = function()
{
  return this.m_popup;
}
fan.domkit.Button.prototype.popup$ = function(it)
{
  this.m_popup = it;
  return;
}
fan.domkit.Button.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.domkit.Button.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.domkit.Button.prototype.cbPopup = function()
{
  return this.m_cbPopup;
}
fan.domkit.Button.prototype.cbPopup$ = function(it)
{
  this.m_cbPopup = it;
  return;
}
fan.domkit.Button.prototype.m_popupOffset = null;
fan.domkit.Button.prototype.m_enabled = null;
fan.domkit.Button.prototype.m_isCombo = false;
fan.domkit.Button.prototype.m_mouseDown = false;
fan.domkit.Button.prototype.m__event = null;
fan.domkit.Button.prototype.m_popup = null;
fan.domkit.Button.prototype.m_cbAction = null;
fan.domkit.Button.prototype.m_cbPopup = null;
fan.domkit.ToggleButton = fan.sys.Obj.$extend(fan.domkit.Button);
fan.domkit.ToggleButton.prototype.$ctor = function()
{
  fan.domkit.Button.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_selected = false;
  this.m_elemOn = null;
  this.m_elemOff = null;
  this.m_group = null;
  return;
}
fan.domkit.ToggleButton.prototype.$typeof = function() { return fan.domkit.ToggleButton.$type; }
fan.domkit.ToggleButton.make = function() {
  var self = new fan.domkit.ToggleButton();
  fan.domkit.ToggleButton.make$(self);
  return self;
  }
fan.domkit.ToggleButton.make$ = function(self)
{
  fan.domkit.Button.make$(self);
  ;
  self.style().addClass("domkit-ToggleButton");
  return;
}
fan.domkit.ToggleButton.prototype.selected = function()
{
  return this.m_selected;
}
fan.domkit.ToggleButton.prototype.selected$ = function(it)
{
  this.m_selected = it;
  this.style().toggleClass("selected",fan.sys.ObjUtil.coerce(it,fan.sys.Bool.$type.toNullable()));
  if (it)
  {
    this.showDown();
    if (this.elemOn() != null)
    {
      fan.sys.ObjUtil.coerce(this.removeAll(),fan.domkit.ToggleButton.$type).add(fan.sys.ObjUtil.coerce(this.elemOn(),fan.dom.Elem.$type));
    }
    ;
  }
  else
  {
    this.showUp();
    if (this.elemOff() != null)
    {
      fan.sys.ObjUtil.coerce(this.removeAll(),fan.domkit.ToggleButton.$type).add(fan.sys.ObjUtil.coerce(this.elemOff(),fan.dom.Elem.$type));
    }
    ;
  }
  ;
  return;
}
fan.domkit.ToggleButton.prototype.elemOn = function()
{
  return this.m_elemOn;
}
fan.domkit.ToggleButton.prototype.elemOn$ = function(it)
{
  var $this = this;
  var val = it;
  this.m_elemOn = (function($this) { if (fan.sys.ObjUtil.is(it,fan.dom.Elem.$type)) return val; return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.ObjUtil.toStr(val));
      return;
    })),fan.dom.Elem.$type); })(this);
  return;
}
fan.domkit.ToggleButton.prototype.elemOff = function()
{
  return this.m_elemOff;
}
fan.domkit.ToggleButton.prototype.elemOff$ = function(it)
{
  var $this = this;
  var val = it;
  this.m_elemOff = (function($this) { if (fan.sys.ObjUtil.is(it,fan.dom.Elem.$type)) return val; return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.ObjUtil.toStr(val));
      return;
    })),fan.dom.Elem.$type); })(this);
  return;
}
fan.domkit.ToggleButton.prototype.doMouseUp = function()
{
  if (this.m_mouseDown)
  {
    this.selected$(!this.selected());
    if (this.m_group != null)
    {
      this.m_group.m__event = this.m__event;
      this.m_group.select(this);
    }
    ;
  }
  ;
  return;
}
fan.domkit.ToggleButton.prototype.group = function()
{
  return this.m_group;
}
fan.domkit.ToggleButton.prototype.group$ = function(it)
{
  this.m_group = it;
  return;
}
fan.domkit.ToggleButton.prototype.m_selected = false;
fan.domkit.ToggleButton.prototype.m_elemOn = null;
fan.domkit.ToggleButton.prototype.m_elemOff = null;
fan.domkit.ToggleButton.prototype.m_group = null;
fan.domkit.Box = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Box.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.domkit.Box.prototype.$typeof = function() { return fan.domkit.Box.$type; }
fan.domkit.Box.make = function() {
  var self = new fan.domkit.Box();
  fan.domkit.Box.make$(self);
  return self;
  }
fan.domkit.Box.make$ = function(self)
{
  fan.dom.Elem.make$(self,"div");
  self.style().addClass("domkit-Box");
  return;
}
fan.domkit.SashBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.SashBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_dir = fan.domkit.Dir.m_right;
  this.m_resizable = false;
  this.m_sizes = fan.sys.List.make(fan.sys.Str.$type);
  this.m_minSize = "10%";
  this.m_dims = fan.sys.ObjUtil.coerce(fan.dom.CssDim.$type.emptyList(),fan.sys.Type.find("dom::CssDim[]"));
  this.m_active = false;
  return;
}
fan.domkit.SashBox.prototype.$typeof = function() { return fan.domkit.SashBox.$type; }
fan.domkit.SashBox.make = function() {
  var self = new fan.domkit.SashBox();
  fan.domkit.SashBox.make$(self);
  return self;
  }
fan.domkit.SashBox.make$ = function(self)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.style().addClass("domkit-SashBox");
  self.onEvent("mousedown",true,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseDown(e);
      return;
    }));
  self.onEvent("mouseup",true,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseUp(e);
      return;
    }));
  self.onEvent("mousemove",true,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseMove(e);
      return;
    }));
  return;
}
fan.domkit.SashBox.prototype.dir = function()
{
  return this.m_dir;
}
fan.domkit.SashBox.prototype.dir$ = function(it)
{
  this.m_dir = it;
  return;
}
fan.domkit.SashBox.prototype.resizable = function()
{
  return this.m_resizable;
}
fan.domkit.SashBox.prototype.resizable$ = function(it)
{
  this.m_resizable = it;
  return;
}
fan.domkit.SashBox.prototype.onSashResize = function(f)
{
  this.m_cbSashResize = f;
  return;
}
fan.domkit.SashBox.prototype.sizes = function()
{
  return this.m_sizes;
}
fan.domkit.SashBox.prototype.sizes$ = function(it)
{
  var $this = this;
  this.m_sizes = it;
  this.m_dims = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.toImmutable(it.map(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u10,
    function(s)
    {
      return fan.dom.CssDim.fromStr(s);
    }))),fan.sys.Type.find("sys::Obj?[]")),fan.sys.Type.find("dom::CssDim[]"));
  this.applyStyle();
  return;
}
fan.domkit.SashBox.prototype.minSize = function()
{
  return this.m_minSize;
}
fan.domkit.SashBox.prototype.minSize$ = function(it)
{
  this.m_minSize = it;
  return;
}
fan.domkit.SashBox.div = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u11,
    function(it)
    {
      it.style().addClass("domkit-SashBox-div");
      return;
    })),fan.domkit.Box.$type);
}
fan.domkit.SashBox.prototype.onAdd = function(c)
{
  this.applyStyle();
  return;
}
fan.domkit.SashBox.prototype.onRemove = function(c)
{
  this.applyStyle();
  return;
}
fan.domkit.SashBox.prototype.applyStyle = function()
{
  var $this = this;
  var fixed = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Float"));
  this.m_dims.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u12,
    function(d)
    {
      if (fan.sys.ObjUtil.equals(d.m_unit,"%"))
      {
        return;
      }
      ;
      fixed.set(d.m_unit,fan.sys.ObjUtil.coerce(fan.sys.Float.plus(fan.sys.ObjUtil.coerce((function($this) { var $_u13 = fixed.get(d.m_unit); if ($_u13 != null) return $_u13; return fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Float.$type.toNullable()); })($this),fan.sys.Float.$type),fan.sys.Num.toFloat(d.m_val)),fan.sys.Obj.$type.toNullable()));
      return;
    }));
  var kids = this.children();
  kids.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u14,
    function(kid,i)
    {
      var d = $this.m_dims.getSafe(i);
      if (d == null)
      {
        return;
      }
      ;
      var css = d.toStr();
      if ((fan.sys.ObjUtil.equals(d.m_unit,"%") && fan.sys.ObjUtil.compareGT(fixed.size(),0)))
      {
        var per = fixed.join(" - ",fan.sys.Func.make$closure(
          fan.domkit.$clos$_u15,
          function(sum,unit)
          {
            return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.mult(fan.sys.Float.div(fan.sys.Num.toFloat(d.m_val),fan.sys.Float.make(100.0)),sum),fan.sys.Obj.$type.toNullable())),""),unit);
          }));
        css = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("calc(",d.toStr())," - "),per),")");
      }
      ;
      kid.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (fan.sys.ObjUtil.equals(css,"0px")) return "none"; return (function($this) { if (fan.sys.ObjUtil.is(kid,fan.domkit.FlexBox.$type)) return "flex"; return "block"; })($this); })($this)]));
      var vert = fan.sys.ObjUtil.equals($this.m_dir,fan.domkit.Dir.m_down);
      kid.style().trap("float",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (vert) return "none"; return "left"; })($this)]));
      kid.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (vert) return "100%"; return css; })($this)]));
      kid.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (vert) return css; return "100%"; })($this)]));
      return;
    }));
  return;
}
fan.domkit.SashBox.prototype.onMouseDown = function(e)
{
  var $this = this;
  if (!this.m_resizable)
  {
    return;
  }
  ;
  if (this.m_resizeIndex == null)
  {
    return;
  }
  ;
  e.stop();
  var div = this.children().get(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(this.m_resizeIndex,fan.sys.Int.$type),1));
  this.m_active = true;
  this.m_splitter = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.style().addClass("domkit-resize-splitter");
      return;
    })),fan.dom.Elem.$type);
  if (fan.sys.ObjUtil.equals(this.m_dir,fan.domkit.Dir.m_down))
  {
    this.m_pivoff = fan.sys.ObjUtil.coerce(fan.sys.Float.minus(this.relPos(e.pagePos()).m_y,div.pos().m_y),fan.sys.Float.$type.toNullable());
    this.m_splitter.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(div.pos().m_y,fan.sys.Obj.$type.toNullable())),"px")]));
    this.m_splitter.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
    this.m_splitter.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(div.size().m_h,fan.sys.Obj.$type.toNullable())),"px")]));
  }
  else
  {
    this.m_pivoff = fan.sys.ObjUtil.coerce(fan.sys.Float.minus(this.relPos(e.pagePos()).m_x,div.pos().m_x),fan.sys.Float.$type.toNullable());
    this.m_splitter.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(div.pos().m_x,fan.sys.Obj.$type.toNullable())),"px")]));
    this.m_splitter.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(div.size().m_w,fan.sys.Obj.$type.toNullable())),"px")]));
    this.m_splitter.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  }
  ;
  var doc = fan.dom.Win.cur().doc();
  var fmove = null;
  var fup = null;
  fmove = doc.onEvent("mousemove",true,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u21,
    function(de)
    {
      $this.onMouseMove(de);
      return;
    }));
  fup = doc.onEvent("mouseup",true,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u21,
    function(de)
    {
      $this.onMouseUp(de);
      de.stop();
      doc.removeEvent("mousemove",true,fan.sys.ObjUtil.coerce(fmove,fan.sys.Type.find("sys::Func")));
      doc.removeEvent("mouseup",true,fan.sys.ObjUtil.coerce(fup,fan.sys.Type.find("sys::Func")));
      return;
    }));
  this.add(fan.sys.ObjUtil.coerce(this.m_splitter,fan.dom.Elem.$type));
  return;
}
fan.domkit.SashBox.prototype.onMouseUp = function(e)
{
  if (!this.m_resizable)
  {
    return;
  }
  ;
  if (!this.m_active)
  {
    return;
  }
  ;
  var p = this.relPos(e.pagePos());
  var kids = this.children();
  if (fan.sys.ObjUtil.equals(this.m_dir,fan.domkit.Dir.m_down))
  {
    var y = 0;
    for (var i = 0; fan.sys.ObjUtil.compareLE(i,this.m_resizeIndex); (function($this) { var $_u22 = i; i = fan.sys.Int.increment(i); return $_u22; })(this))
    {
      y = fan.sys.Int.plus(y,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(kids.get(i).size().m_h,fan.sys.Num.$type)));
    }
    ;
    this.applyResize(fan.sys.ObjUtil.coerce(this.m_resizeIndex,fan.sys.Int.$type),fan.sys.Float.minus(fan.sys.Float.minusInt(p.m_y,y),fan.sys.ObjUtil.coerce(this.m_pivoff,fan.sys.Float.$type)));
  }
  else
  {
    var x = 0;
    for (var i = 0; fan.sys.ObjUtil.compareLE(i,this.m_resizeIndex); (function($this) { var $_u23 = i; i = fan.sys.Int.increment(i); return $_u23; })(this))
    {
      x = fan.sys.Int.plus(x,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(kids.get(i).size().m_w,fan.sys.Num.$type)));
    }
    ;
    this.applyResize(fan.sys.ObjUtil.coerce(this.m_resizeIndex,fan.sys.Int.$type),fan.sys.Float.minus(fan.sys.Float.minusInt(p.m_x,x),fan.sys.ObjUtil.coerce(this.m_pivoff,fan.sys.Float.$type)));
  }
  ;
  this.m_active = false;
  this.m_resizeIndex = null;
  this.remove(fan.sys.ObjUtil.coerce(this.m_splitter,fan.dom.Elem.$type));
  return;
}
fan.domkit.SashBox.prototype.onMouseMove = function(e)
{
  var $this = this;
  if (!this.m_resizable)
  {
    return;
  }
  ;
  var p = this.relPos(e.pagePos());
  if (this.m_active)
  {
    if (fan.sys.ObjUtil.equals(this.m_dir,fan.domkit.Dir.m_down))
    {
      var sy = fan.sys.Float.min(fan.sys.Float.max(fan.sys.Float.make(0.0),fan.sys.Float.minus(p.m_y,fan.sys.ObjUtil.coerce(this.m_pivoff,fan.sys.Float.$type))),fan.sys.Float.minus(this.size().m_h,this.m_splitter.size().m_h));
      this.m_splitter.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(sy,fan.sys.Obj.$type.toNullable())),"px")]));
      e.stop();
    }
    else
    {
      var sx = fan.sys.Float.min(fan.sys.Float.max(fan.sys.Float.make(0.0),fan.sys.Float.minus(p.m_x,fan.sys.ObjUtil.coerce(this.m_pivoff,fan.sys.Float.$type))),fan.sys.Float.minus(this.size().m_w,this.m_splitter.size().m_w));
      this.m_splitter.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(sx,fan.sys.Obj.$type.toNullable())),"px")]));
      e.stop();
    }
    ;
    return;
  }
  else
  {
    var div = this.toDiv(e.target());
    if (div != null)
    {
      this.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (fan.sys.ObjUtil.equals($this.m_dir,fan.domkit.Dir.m_down)) return "row-resize"; return "col-resize"; })(this)]));
      this.m_resizeIndex = fan.sys.ObjUtil.coerce(fan.sys.Int.max(0,fan.sys.Int.minus(fan.sys.ObjUtil.coerce(this.children().findIndex(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u25,
        function(c)
        {
          return fan.sys.ObjUtil.equals(c,div);
        })),fan.sys.Int.$type),1)),fan.sys.Int.$type.toNullable());
    }
    else
    {
      this.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["default"]));
      this.m_resizeIndex = null;
    }
    ;
  }
  ;
  return;
}
fan.domkit.SashBox.prototype.toDiv = function(elem)
{
  while (elem != null)
  {
    if ((elem.style().hasClass("domkit-SashBox-div") && fan.sys.ObjUtil.equals(elem.parent(),this)))
    {
      return elem;
    }
    ;
    elem = elem.parent();
  }
  ;
  return null;
}
fan.domkit.SashBox.prototype.applyResize = function(index,delta)
{
  this.sizesToPercent();
  var da = this.m_dims.get(index);
  var db = this.m_dims.get(fan.sys.Int.plus(index,2));
  var min = fan.sys.Num.toFloat(fan.dom.CssDim.fromStr(this.m_minSize).m_val);
  var dav = fan.sys.Num.toFloat(da.m_val);
  var dbv = fan.sys.Num.toFloat(db.m_val);
  if (fan.sys.ObjUtil.compareLE(fan.sys.Float.plus(dav,dbv),fan.sys.Float.plus(min,min)))
  {
    return;
  }
  ;
  var working = this.sizes().dup();
  var sz = (function($this) { if (fan.sys.ObjUtil.equals($this.m_dir,fan.domkit.Dir.m_down)) return $this.size().m_h; return $this.size().m_w; })(this);
  var dp = fan.sys.Float.mult(fan.sys.Float.div(delta,sz),fan.sys.Float.make(100.0));
  var av = fan.sys.Str.toFloat(fan.sys.Float.toLocale(fan.sys.Float.plus(dav,dp),"0.00",fan.sys.Locale.m_en));
  var bv = fan.sys.Str.toFloat(fan.sys.Float.toLocale(fan.sys.Float.minus(fan.sys.Float.plus(dav,dbv),fan.sys.ObjUtil.coerce(av,fan.sys.Float.$type)),"0.00",fan.sys.Locale.m_en));
  if (fan.sys.ObjUtil.compareLT(av,min))
  {
    av = fan.sys.ObjUtil.coerce(min,fan.sys.Float.$type.toNullable());
    bv = fan.sys.Str.toFloat(fan.sys.Float.toLocale(fan.sys.Float.minus(fan.sys.Float.plus(dav,dbv),fan.sys.ObjUtil.coerce(av,fan.sys.Float.$type)),"0.00",fan.sys.Locale.m_en));
  }
  else
  {
    if (fan.sys.ObjUtil.compareLT(bv,min))
    {
      bv = fan.sys.ObjUtil.coerce(min,fan.sys.Float.$type.toNullable());
      av = fan.sys.Str.toFloat(fan.sys.Float.toLocale(fan.sys.Float.minus(fan.sys.Float.plus(dav,dbv),fan.sys.ObjUtil.coerce(bv,fan.sys.Float.$type)),"0.00",fan.sys.Locale.m_en));
    }
    ;
  }
  ;
  working.set(index,fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(av,fan.sys.Obj.$type.toNullable())),"%"));
  working.set(fan.sys.Int.plus(index,2),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(bv,fan.sys.Obj.$type.toNullable())),"%"));
  this.sizes$(working);
  this.applyStyle();
  (function($this) { var $_u27 = $this.m_cbSashResize; if ($_u27 == null) return null; return $_u27.call($this); })(this);
  return;
}
fan.domkit.SashBox.prototype.sizesToPercent = function()
{
  var $this = this;
  if (this.m_dims.all(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u28,
    function(d)
    {
      return fan.sys.ObjUtil.equals(d.m_unit,"%");
    })))
  {
    return;
  }
  ;
  var sz = (function($this) { if (fan.sys.ObjUtil.equals($this.m_dir,fan.domkit.Dir.m_down)) return $this.size().m_h; return $this.size().m_w; })(this);
  var converted = fan.sys.List.make(fan.dom.CssDim.$type);
  var remainder = fan.sys.Float.make(100.0);
  var kids = this.children();
  this.m_dims.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u30,
    function(d,i)
    {
      if (fan.sys.ObjUtil.equals(d.m_unit,"%"))
      {
        converted.add(fan.dom.CssDim.m_defVal);
        return;
      }
      ;
      var ksz = (function($this) { var $_u31 = (function($this) { var $_u32=kids.getSafe(i); return ($_u32==null) ? null : $_u32.size() }($this)); if ($_u31 != null) return $_u31; return fan.graphics.Size.m_defVal; })($this);
      var kval = (function($this) { if (fan.sys.ObjUtil.equals($this.m_dir,fan.domkit.Dir.m_down)) return ksz.m_h; return ksz.m_w; })($this);
      var val = fan.sys.Str.toFloat(fan.sys.Float.toLocale(fan.sys.Float.mult(fan.sys.Float.div(kval,fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(sz,fan.sys.Num.$type))),fan.sys.Float.make(100.0)),"0.00",fan.sys.Locale.m_en));
      converted.add(fan.dom.CssDim.make(fan.sys.ObjUtil.coerce(val,fan.sys.Num.$type),"%"));
      remainder = fan.sys.Float.minus(remainder,fan.sys.ObjUtil.coerce(val,fan.sys.Float.$type));
      return;
    }));
  this.m_dims.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u30,
    function(d,i)
    {
      if (fan.sys.ObjUtil.compareNE(d.m_unit,"%"))
      {
        return;
      }
      ;
      var val = fan.sys.Str.toFloat(fan.sys.Float.toLocale(fan.sys.Float.div(fan.sys.Float.mult(fan.sys.Num.toFloat(d.m_val),remainder),fan.sys.Float.make(100.0)),"0.00",fan.sys.Locale.m_en));
      converted.set(i,fan.dom.CssDim.make(fan.sys.ObjUtil.coerce(val,fan.sys.Num.$type),"%"));
      return;
    }));
  var sum = fan.sys.Float.make(0.0);
  converted.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u12,
    function(d)
    {
      sum = fan.sys.Float.plus(sum,fan.sys.Num.toFloat(d.m_val));
      return;
    }));
  if (fan.sys.ObjUtil.compareGT(sum,fan.sys.Float.make(100.0)))
  {
    converted.set(-1,fan.dom.CssDim.make(fan.sys.ObjUtil.coerce(fan.sys.Float.minus(fan.sys.Num.toFloat(converted.last().m_val),fan.sys.Float.minus(sum,fan.sys.Float.make(100.0))),fan.sys.Num.$type),"%"));
  }
  ;
  this.sizes$(fan.sys.ObjUtil.coerce(converted.map(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u34,
    function(c)
    {
      return c.toStr();
    })),fan.sys.Type.find("sys::Str[]")));
  return;
}
fan.domkit.SashBox.prototype.dims = function()
{
  return this.m_dims;
}
fan.domkit.SashBox.prototype.dims$ = function(it)
{
  this.m_dims = it;
  return;
}
fan.domkit.SashBox.prototype.active = function()
{
  return this.m_active;
}
fan.domkit.SashBox.prototype.active$ = function(it)
{
  this.m_active = it;
  return;
}
fan.domkit.SashBox.prototype.resizeIndex = function()
{
  return this.m_resizeIndex;
}
fan.domkit.SashBox.prototype.resizeIndex$ = function(it)
{
  this.m_resizeIndex = it;
  return;
}
fan.domkit.SashBox.prototype.pivoff = function()
{
  return this.m_pivoff;
}
fan.domkit.SashBox.prototype.pivoff$ = function(it)
{
  this.m_pivoff = it;
  return;
}
fan.domkit.SashBox.prototype.splitter = function()
{
  return this.m_splitter;
}
fan.domkit.SashBox.prototype.splitter$ = function(it)
{
  this.m_splitter = it;
  return;
}
fan.domkit.SashBox.prototype.cbSashResize = function()
{
  return this.m_cbSashResize;
}
fan.domkit.SashBox.prototype.cbSashResize$ = function(it)
{
  this.m_cbSashResize = it;
  return;
}
fan.domkit.SashBox.prototype.m_dir = null;
fan.domkit.SashBox.prototype.m_resizable = false;
fan.domkit.SashBox.prototype.m_sizes = null;
fan.domkit.SashBox.prototype.m_minSize = null;
fan.domkit.SashBox.prototype.m_dims = null;
fan.domkit.SashBox.prototype.m_active = false;
fan.domkit.SashBox.prototype.m_resizeIndex = null;
fan.domkit.SashBox.prototype.m_pivoff = null;
fan.domkit.SashBox.prototype.m_splitter = null;
fan.domkit.SashBox.prototype.m_cbSashResize = null;
fan.domkit.TextField = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.TextField.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cbAction = null;
  this.m_cbModify = null;
  return;
}
fan.domkit.TextField.prototype.$typeof = function() { return fan.domkit.TextField.$type; }
fan.domkit.TextField.make = function() {
  var self = new fan.domkit.TextField();
  fan.domkit.TextField.make$(self);
  return self;
  }
fan.domkit.TextField.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self,"input");
  ;
  self.set("type","text");
  self.style().addClass("domkit-control domkit-control-text domkit-TextField");
  self.onEvent("input",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.checkUpdate();
      $this.fireModify(e);
      return;
    }));
  self.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_enter))
      {
        $this.fireAction(e);
      }
      ;
      return;
    }));
  return;
}
fan.domkit.TextField.prototype.cols = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("size",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Int.$type.toNullable());
}
fan.domkit.TextField.prototype.cols$ = function(it)
{
  this.trap("size",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.TextField.prototype.placeholder = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("placeholder",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type.toNullable());
}
fan.domkit.TextField.prototype.placeholder$ = function(it)
{
  this.trap("placeholder",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[it]));
  return;
}
fan.domkit.TextField.prototype.ro = function()
{
  return fan.sys.ObjUtil.coerce(this.prop("readOnly"),fan.sys.Bool.$type);
}
fan.domkit.TextField.prototype.ro$ = function(it)
{
  this.setProp("readOnly",fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable()));
  return;
}
fan.domkit.TextField.prototype.password = function()
{
  return fan.sys.ObjUtil.equals(this.trap("type",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"password");
}
fan.domkit.TextField.prototype.password$ = function(it)
{
  this.trap("type",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (it) return "password"; return "text"; })(this)]));
  return;
}
fan.domkit.TextField.prototype.val = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("value",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
}
fan.domkit.TextField.prototype.val$ = function(it)
{
  this.trap("value",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[it]));
  this.checkUpdate();
  return;
}
fan.domkit.TextField.prototype.onModify = function(f)
{
  this.m_cbModify = f;
  return;
}
fan.domkit.TextField.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.domkit.TextField.prototype.select = function(start,end)
{
  this.setProp("selectionStart",fan.sys.ObjUtil.coerce(start,fan.sys.Obj.$type.toNullable()));
  this.setProp("selectionEnd",fan.sys.ObjUtil.coerce(end,fan.sys.Obj.$type.toNullable()));
  return;
}
fan.domkit.TextField.prototype.fireAction = function(e)
{
  (function($this) { var $_u36 = $this.m_cbAction; if ($_u36 == null) return null; return $_u36.call($this); })(this);
  return;
}
fan.domkit.TextField.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.domkit.TextField.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.domkit.TextField.prototype.fireModify = function(e)
{
  (function($this) { var $_u37 = $this.m_cbModify; if ($_u37 == null) return null; return $_u37.call($this); })(this);
  return;
}
fan.domkit.TextField.prototype.cbModify = function()
{
  return this.m_cbModify;
}
fan.domkit.TextField.prototype.cbModify$ = function(it)
{
  this.m_cbModify = it;
  return;
}
fan.domkit.TextField.prototype.checkUpdate = function()
{
  if (fan.sys.ObjUtil.is(this.parent(),fan.domkit.Combo.$type))
  {
    fan.sys.ObjUtil.coerce(this.parent(),fan.domkit.Combo.$type).update(fan.sys.Str.trim(this.val()));
  }
  ;
  return;
}
fan.domkit.TextField.prototype.m_cols = null;
fan.domkit.TextField.prototype.m_placeholder = null;
fan.domkit.TextField.prototype.m_ro = false;
fan.domkit.TextField.prototype.m_password = false;
fan.domkit.TextField.prototype.m_val = null;
fan.domkit.TextField.prototype.m_cbAction = null;
fan.domkit.TextField.prototype.m_cbModify = null;
fan.domkit.RadioButton = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.RadioButton.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cbAction = null;
  this.m_group = null;
  return;
}
fan.domkit.RadioButton.prototype.$typeof = function() { return fan.domkit.RadioButton.$type; }
fan.domkit.RadioButton.make = function() {
  var self = new fan.domkit.RadioButton();
  fan.domkit.RadioButton.make$(self);
  return self;
  }
fan.domkit.RadioButton.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self,"input");
  ;
  self.set("type","radio");
  self.style().addClass("domkit-RadioButton");
  self.onEvent("change",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.fireAction(e);
      return;
    }));
  return;
}
fan.domkit.RadioButton.prototype.wrap = function(content)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("label"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.add($this).add(fan.sys.ObjUtil.coerce((function($this) { if (fan.sys.ObjUtil.is(content,fan.dom.Elem.$type)) return content; return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.domkit.$clos$_u39,
        function(it)
        {
          it.text$(fan.sys.ObjUtil.toStr(content));
          return;
        })),fan.domkit.Label.$type); })($this),fan.dom.Elem.$type));
      return;
    })),fan.dom.Elem.$type);
}
fan.domkit.RadioButton.prototype.checked = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("checked",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Bool.$type);
}
fan.domkit.RadioButton.prototype.checked$ = function(it)
{
  this.trap("checked",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.RadioButton.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.domkit.RadioButton.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.domkit.RadioButton.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.domkit.RadioButton.prototype.fireAction = function(e)
{
  if (this.m_group != null)
  {
    this.m_group.m__event = e;
    this.m_group.select(this);
  }
  ;
  (function($this) { var $_u40 = $this.m_cbAction; if ($_u40 == null) return null; return $_u40.call($this); })(this);
  return;
}
fan.domkit.RadioButton.prototype.group = function()
{
  return this.m_group;
}
fan.domkit.RadioButton.prototype.group$ = function(it)
{
  this.m_group = it;
  return;
}
fan.domkit.RadioButton.prototype.m_checked = false;
fan.domkit.RadioButton.prototype.m_cbAction = null;
fan.domkit.RadioButton.prototype.m_group = null;
fan.domkit.ListButton = fan.sys.Obj.$extend(fan.domkit.Button);
fan.domkit.ListButton.prototype.$ctor = function()
{
  fan.domkit.Button.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_items = fan.sys.Obj.$type.emptyList();
  this.m_cbSelect = null;
  this.m_cbElem = null;
  this.m_find = "";
  return;
}
fan.domkit.ListButton.prototype.$typeof = function() { return fan.domkit.ListButton.$type; }
fan.domkit.ListButton.make = function() {
  var self = new fan.domkit.ListButton();
  fan.domkit.ListButton.make$(self);
  return self;
  }
fan.domkit.ListButton.make$ = function(self)
{
  var $this = self;
  fan.domkit.Button.make$(self);
  ;
  self.style().addClass("domkit-ListButton disclosure-list");
  self.m_sel = fan.domkit.ListButtonSelection.make(self);
  self.onPopup(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u41,
    function(it)
    {
      return $this.makeListbox();
    }));
  self.update();
  self.m_popupOffset = fan.graphics.Point.makeInt(-12,0);
  return;
}
fan.domkit.ListButton.prototype.items = function()
{
  return this.m_items;
}
fan.domkit.ListButton.prototype.items$ = function(it)
{
  this.m_items = it;
  this.m_sel.index$((function($this) { if (fan.sys.ObjUtil.equals(it.size(),0)) return null; return fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()); })(this));
  this.update();
  return;
}
fan.domkit.ListButton.prototype.sel = function()
{
  return this.m_sel;
}
fan.domkit.ListButton.prototype.sel$ = function(it)
{
  this.m_sel = it;
  return;
}
fan.domkit.ListButton.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.domkit.ListButton.prototype.onElem = function(f)
{
  this.m_cbElem = f;
  this.update();
  return;
}
fan.domkit.ListButton.prototype.update = function()
{
  var $this = this;
  if (this.m_isCombo)
  {
    return;
  }
  ;
  this.removeAll();
  if ((fan.sys.ObjUtil.equals(this.items().size(),0) || this.m_sel.item() == null))
  {
    this.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u8,
      function(it)
      {
        it.text$("\u200b");
        return;
      })),fan.dom.Elem.$type));
  }
  else
  {
    this.add(this.makeElem(fan.sys.ObjUtil.coerce(this.m_sel.item(),fan.sys.Obj.$type)));
  }
  ;
  return;
}
fan.domkit.ListButton.prototype.fireSelect = function()
{
  (function($this) { var $_u43 = $this.m_cbSelect; if ($_u43 == null) return null; return $_u43.call($this); })(this);
  return;
}
fan.domkit.ListButton.prototype.makeListbox = function()
{
  var $this = this;
  this.m_find = "";
  this.m_menu = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Menu.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u44,
    function(it)
    {
      return;
    })),fan.domkit.Menu.$type);
  this.items().each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u45,
    function(item,i)
    {
      var elem = $this.makeElem(item);
      $this.m_menu.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.MenuItem.make(),fan.sys.Func.make$closure(
        fan.domkit.$clos$_u46,
        function(it)
        {
          if (!$this.m_isCombo)
          {
            it.style().addClass("domkit-ListButton-MenuItem");
            if (fan.sys.ObjUtil.equals($this.m_sel.index(),i))
            {
              it.style().addClass("sel");
            }
            ;
          }
          ;
          it.add(elem);
          it.onAction(fan.sys.Func.make$closure(
            fan.domkit.$clos$_u46,
            function(it)
            {
              $this.m_sel.index$(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type.toNullable()));
              $this.fireSelect();
              return;
            }));
          return;
        })),fan.domkit.MenuItem.$type));
      if (elem.style().hasClass("disabled"))
      {
        $this.m_menu.lastChild().enabled$(fan.sys.ObjUtil.coerce(false,fan.sys.Bool.$type.toNullable()));
      }
      ;
      return;
    }));
  this.m_menu.select(this.m_sel.index());
  this.m_menu.m_onCustomKeyDown = fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMenuKeyDown(e);
      return;
    });
  return fan.sys.ObjUtil.coerce(this.m_menu,fan.domkit.Popup.$type);
}
fan.domkit.ListButton.prototype.makeElem = function(item)
{
  var $this = this;
  var v = (function($this) { if ($this.m_cbElem == null) return fan.sys.ObjUtil.toStr(item); return $this.m_cbElem.call(item); })(this);
  return fan.sys.ObjUtil.coerce((function($this) { if (fan.sys.ObjUtil.is(v,fan.dom.Elem.$type)) return v; return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.text$(fan.sys.ObjUtil.toStr(v));
      return;
    })),fan.dom.Elem.$type); })(this),fan.dom.Elem.$type);
}
fan.domkit.ListButton.prototype.onMenuKeyDown = function(e)
{
  var $this = this;
  if (fan.sys.Int.isAlphaNum(e.key().m_code))
  {
    this.m_find = fan.sys.Str.plus(this.m_find,fan.sys.Str.lower(fan.sys.Int.toChar(e.key().m_code)));
    var ix = this.items().findIndex(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u49,
      function(i)
      {
        return fan.sys.Str.startsWith(fan.sys.Str.lower(fan.sys.ObjUtil.toStr(i)),$this.m_find);
      }));
    if (ix != null)
    {
      this.m_menu.select(ix);
    }
    ;
  }
  ;
  return;
}
fan.domkit.ListButton.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.domkit.ListButton.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.domkit.ListButton.prototype.cbElem = function()
{
  return this.m_cbElem;
}
fan.domkit.ListButton.prototype.cbElem$ = function(it)
{
  this.m_cbElem = it;
  return;
}
fan.domkit.ListButton.prototype.find = function()
{
  return this.m_find;
}
fan.domkit.ListButton.prototype.find$ = function(it)
{
  this.m_find = it;
  return;
}
fan.domkit.ListButton.prototype.menu = function()
{
  return this.m_menu;
}
fan.domkit.ListButton.prototype.menu$ = function(it)
{
  this.m_menu = it;
  return;
}
fan.domkit.ListButton.prototype.m_items = null;
fan.domkit.ListButton.prototype.m_sel = null;
fan.domkit.ListButton.prototype.m_cbSelect = null;
fan.domkit.ListButton.prototype.m_cbElem = null;
fan.domkit.ListButton.prototype.m_find = null;
fan.domkit.ListButton.prototype.m_menu = null;
fan.domkit.Selection = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.Selection.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_enabled = true;
  this.m_multi = false;
  return;
}
fan.domkit.Selection.prototype.$typeof = function() { return fan.domkit.Selection.$type; }
fan.domkit.Selection.prototype.enabled = function()
{
  return this.m_enabled;
}
fan.domkit.Selection.prototype.enabled$ = function(it)
{
  this.m_enabled = it;
  return;
}
fan.domkit.Selection.prototype.multi = function()
{
  return this.m_multi;
}
fan.domkit.Selection.prototype.multi$ = function(it)
{
  this.m_multi = it;
  this.refresh();
  return;
}
fan.domkit.Selection.prototype.clear = function()
{
  this.items$(fan.sys.List.make(fan.sys.Obj.$type));
  return;
}
fan.domkit.Selection.prototype.refresh = function()
{
  return;
}
fan.domkit.Selection.make = function() {
  var self = new fan.domkit.Selection();
  fan.domkit.Selection.make$(self);
  return self;
  }
fan.domkit.Selection.make$ = function(self)
{
  ;
  return;
}
fan.domkit.Selection.prototype.m_enabled = false;
fan.domkit.Selection.prototype.m_multi = false;
fan.domkit.Selection.prototype.m_item = null;
fan.domkit.Selection.prototype.m_items = null;
fan.domkit.Selection.prototype.m_index = null;
fan.domkit.Selection.prototype.m_indexes = null;
fan.domkit.IndexSelection = fan.sys.Obj.$extend(fan.domkit.Selection);
fan.domkit.IndexSelection.prototype.$ctor = function()
{
  fan.domkit.Selection.prototype.$ctor.call(this);
  var $this = this;
  this.m_indexes = fan.sys.List.make(fan.sys.Int.$type);
  return;
}
fan.domkit.IndexSelection.prototype.$typeof = function() { return fan.domkit.IndexSelection.$type; }
fan.domkit.IndexSelection.prototype.isEmpty = function()
{
  return this.indexes().isEmpty();
}
fan.domkit.IndexSelection.prototype.size = function()
{
  return this.indexes().size();
}
fan.domkit.IndexSelection.prototype.item = function()
{
  return this.items().first();
}
fan.domkit.IndexSelection.prototype.item$ = function(it)
{
  this.items$((function($this) { if (it == null) return fan.sys.List.make(fan.sys.Obj.$type); return fan.sys.List.make(fan.sys.Obj.$type.toNullable(), [it]); })(this));
  return;
}
fan.domkit.IndexSelection.prototype.items = function()
{
  return this.toItems(this.indexes());
}
fan.domkit.IndexSelection.prototype.items$ = function(it)
{
  this.indexes$(this.toIndexes(it));
  return;
}
fan.domkit.IndexSelection.prototype.index = function()
{
  return this.indexes().first();
}
fan.domkit.IndexSelection.prototype.index$ = function(it)
{
  this.indexes$((function($this) { if (it == null) return fan.sys.List.make(fan.sys.Int.$type); return fan.sys.List.make(fan.sys.Int.$type.toNullable(), [fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]); })(this));
  return;
}
fan.domkit.IndexSelection.prototype.indexes = function()
{
  return this.m_indexes;
}
fan.domkit.IndexSelection.prototype.indexes$ = function(it)
{
  if (!this.m_enabled)
  {
    return;
  }
  ;
  var oldIndexes = this.m_indexes;
  var newIndexes = this.checkIndexes(it).sort().ro();
  this.m_indexes = newIndexes;
  this.onUpdate(oldIndexes,newIndexes);
  return;
}
fan.domkit.IndexSelection.prototype.refresh = function()
{
  var temp = this.indexes();
  this.indexes$(temp);
  return;
}
fan.domkit.IndexSelection.prototype.checkIndexes = function(indexes)
{
  var $this = this;
  var checked = indexes.findAll(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u52,
    function(index)
    {
      return (fan.sys.ObjUtil.compareLE(0,index) && fan.sys.ObjUtil.compareLT(index,$this.max()));
    }));
  if ((!this.multi() && fan.sys.ObjUtil.compareGT(checked.size(),1)))
  {
    checked = fan.sys.List.make(fan.sys.Int.$type.toNullable(), [fan.sys.ObjUtil.coerce(checked.first(),fan.sys.Obj.$type.toNullable())]);
  }
  ;
  return checked;
}
fan.domkit.IndexSelection.prototype.toItems = function(indexes)
{
  var $this = this;
  var max = this.max();
  var acc = fan.sys.List.make(fan.sys.Obj.$type);
  acc.capacity$(indexes.size());
  indexes.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u53,
    function(index)
    {
      if (fan.sys.ObjUtil.compareLT(index,max))
      {
        var item = $this.toItem(index);
        acc.add(item);
      }
      ;
      return;
    }));
  return acc;
}
fan.domkit.IndexSelection.prototype.toIndexes = function(items)
{
  var $this = this;
  var acc = fan.sys.List.make(fan.sys.Int.$type);
  acc.capacity$(items.size());
  items.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u54,
    function(item)
    {
      var index = $this.toIndex(item);
      if (index != null)
      {
        acc.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(index,fan.sys.Int.$type),fan.sys.Obj.$type.toNullable()));
      }
      ;
      return;
    }));
  return acc;
}
fan.domkit.IndexSelection.make = function() {
  var self = new fan.domkit.IndexSelection();
  fan.domkit.IndexSelection.make$(self);
  return self;
  }
fan.domkit.IndexSelection.make$ = function(self)
{
  fan.domkit.Selection.make$(self);
  ;
  return;
}
fan.domkit.IndexSelection.prototype.m_item = null;
fan.domkit.IndexSelection.prototype.m_items = null;
fan.domkit.IndexSelection.prototype.m_index = null;
fan.domkit.IndexSelection.prototype.m_indexes = null;
fan.domkit.ListButtonSelection = fan.sys.Obj.$extend(fan.domkit.IndexSelection);
fan.domkit.ListButtonSelection.prototype.$ctor = function()
{
  fan.domkit.IndexSelection.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.ListButtonSelection.prototype.$typeof = function() { return fan.domkit.ListButtonSelection.$type; }
fan.domkit.ListButtonSelection.make = function(button) {
  var self = new fan.domkit.ListButtonSelection();
  fan.domkit.ListButtonSelection.make$(self,button);
  return self;
  }
fan.domkit.ListButtonSelection.make$ = function(self,button)
{
  fan.domkit.IndexSelection.make$(self);
  self.m_button = button;
  return;
}
fan.domkit.ListButtonSelection.prototype.max = function()
{
  return this.m_button.items().size();
}
fan.domkit.ListButtonSelection.prototype.toItem = function(index)
{
  return this.m_button.items().get(index);
}
fan.domkit.ListButtonSelection.prototype.toIndex = function(item)
{
  var $this = this;
  return this.m_button.items().findIndex(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u49,
    function(i)
    {
      return fan.sys.ObjUtil.equals(i,item);
    }));
}
fan.domkit.ListButtonSelection.prototype.onUpdate = function(oldIndexes,newIndexes)
{
  this.m_button.update();
  return;
}
fan.domkit.ListButtonSelection.prototype.button = function()
{
  return this.m_button;
}
fan.domkit.ListButtonSelection.prototype.button$ = function(it)
{
  this.m_button = it;
  return;
}
fan.domkit.ListButtonSelection.prototype.m_button = null;
fan.domkit.TreeNode = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.TreeNode.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_expanded = false;
  return;
}
fan.domkit.TreeNode.prototype.$typeof = function() { return fan.domkit.TreeNode.$type; }
fan.domkit.TreeNode.prototype.parent = function()
{
  return this.m_parent;
}
fan.domkit.TreeNode.prototype.parent$ = function(it)
{
  this.m_parent = it;
  return;
}
fan.domkit.TreeNode.prototype.isExpanded = function()
{
  return this.m_expanded;
}
fan.domkit.TreeNode.prototype.hasChildren = function()
{
  return !this.children().isEmpty();
}
fan.domkit.TreeNode.prototype.children = function()
{
  return fan.sys.ObjUtil.coerce(fan.domkit.TreeNode.$type.emptyList(),fan.sys.Type.find("domkit::TreeNode[]"));
}
fan.domkit.TreeNode.prototype.depth = function()
{
  return this.m_depth;
}
fan.domkit.TreeNode.prototype.depth$ = function(it)
{
  this.m_depth = it;
  return;
}
fan.domkit.TreeNode.prototype.elem = function()
{
  return this.m_elem;
}
fan.domkit.TreeNode.prototype.elem$ = function(it)
{
  this.m_elem = it;
  return;
}
fan.domkit.TreeNode.prototype.expanded = function()
{
  return this.m_expanded;
}
fan.domkit.TreeNode.prototype.expanded$ = function(it)
{
  this.m_expanded = it;
  return;
}
fan.domkit.TreeNode.make = function() {
  var self = new fan.domkit.TreeNode();
  fan.domkit.TreeNode.make$(self);
  return self;
  }
fan.domkit.TreeNode.make$ = function(self)
{
  ;
  return;
}
fan.domkit.TreeNode.prototype.m_parent = null;
fan.domkit.TreeNode.prototype.m_depth = null;
fan.domkit.TreeNode.prototype.m_elem = null;
fan.domkit.TreeNode.prototype.m_expanded = false;
fan.domkit.TreeFlags = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.TreeFlags.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.TreeFlags.prototype.$typeof = function() { return fan.domkit.TreeFlags.$type; }
fan.domkit.TreeFlags.make = function(f) {
  var self = new fan.domkit.TreeFlags();
  fan.domkit.TreeFlags.make$(self,f);
  return self;
  }
fan.domkit.TreeFlags.make$ = function(self,f)
{
  f.call(self);
  return;
}
fan.domkit.TreeFlags.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("TreeFlags { focused=",fan.sys.ObjUtil.coerce(this.m_focused,fan.sys.Obj.$type.toNullable())),"; selected="),fan.sys.ObjUtil.coerce(this.m_selected,fan.sys.Obj.$type.toNullable()))," }");
}
fan.domkit.TreeFlags.prototype.m_focused = false;
fan.domkit.TreeFlags.prototype.m_selected = false;
fan.domkit.TreeEvent = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.TreeEvent.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.TreeEvent.prototype.$typeof = function() { return fan.domkit.TreeEvent.$type; }
fan.domkit.TreeEvent.make = function(t,n,f) {
  var self = new fan.domkit.TreeEvent();
  fan.domkit.TreeEvent.make$(self,t,n,f);
  return self;
  }
fan.domkit.TreeEvent.make$ = function(self,t,n,f)
{
  self.m_tree = t;
  self.m_node = n;
  f.call(self);
  return;
}
fan.domkit.TreeEvent.prototype.tree = function()
{
  return this.m_tree;
}
fan.domkit.TreeEvent.prototype.tree$ = function(it)
{
  this.m_tree = it;
  return;
}
fan.domkit.TreeEvent.prototype.node = function()
{
  return this.m_node;
}
fan.domkit.TreeEvent.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.domkit.TreeEvent.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("TreeNode { node=",this.m_node)," type="),this.m_type)," pagePos="),this.m_pagePos)," nodePos="),this.m_nodePos)," size="),this.m_size)," }");
}
fan.domkit.TreeEvent.prototype.m_tree = null;
fan.domkit.TreeEvent.prototype.m_node = null;
fan.domkit.TreeEvent.prototype.m_type = null;
fan.domkit.TreeEvent.prototype.m_pagePos = null;
fan.domkit.TreeEvent.prototype.m_nodePos = null;
fan.domkit.TreeEvent.prototype.m_size = null;
fan.domkit.Tree = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.Tree.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_roots = fan.sys.List.make(fan.domkit.TreeNode.$type);
  this.m_nodes = fan.sys.List.make(fan.domkit.TreeNode.$type);
  this.m_cbTreeEvent = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Func"));
  this.m_manFocus = false;
  return;
}
fan.domkit.Tree.prototype.$typeof = function() { return fan.domkit.Tree.$type; }
fan.domkit.Tree.make = function() {
  var self = new fan.domkit.Tree();
  fan.domkit.Tree.make$(self);
  return self;
  }
fan.domkit.Tree.make$ = function(self)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.m_sel = fan.domkit.TreeSelection.make(self);
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  self.style().addClass("domkit-Tree domkit-border");
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.onEvent("mouseup",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.onEvent("dblclick",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.onEvent("focus",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.m_manFocus = true;
      $this.refresh();
      return;
    }));
  self.onEvent("blur",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.m_manFocus = false;
      $this.refresh();
      return;
    }));
  return;
}
fan.domkit.Tree.prototype.roots = function()
{
  return this.m_roots;
}
fan.domkit.Tree.prototype.roots$ = function(it)
{
  this.m_roots = it;
  return;
}
fan.domkit.Tree.prototype.rebuild = function()
{
  var $this = this;
  if (fan.sys.ObjUtil.compareGT(this.size().m_w,fan.sys.Float.make(0.0)))
  {
    this.doRebuild();
  }
  else
  {
    fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("16ms"),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u1,
      function()
      {
        $this.rebuild();
        return;
      }));
  }
  ;
  return;
}
fan.domkit.Tree.prototype.refresh = function()
{
  var $this = this;
  this.m_roots.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u55,
    function(r)
    {
      $this.refreshNode(r);
      return;
    }));
  return;
}
fan.domkit.Tree.prototype.refreshNode = function(node)
{
  this.doRefreshNode(node);
  return;
}
fan.domkit.Tree.prototype.expand = function(node,expanded)
{
  if (fan.sys.ObjUtil.equals(node.m_expanded,expanded))
  {
    return;
  }
  ;
  node.m_expanded = expanded;
  this.refreshNode(node);
  return;
}
fan.domkit.Tree.prototype.displayState = function(node,state)
{
  var content = node.m_elem.querySelector(".domkit-Tree-node");
  content.style().removeClass("down");
  if (fan.sys.ObjUtil.equals(state,"down"))
  {
    content.style().addClass("down");
  }
  ;
  return;
}
fan.domkit.Tree.prototype.sel = function()
{
  return this.m_sel;
}
fan.domkit.Tree.prototype.sel$ = function(it)
{
  this.m_sel = it;
  return;
}
fan.domkit.Tree.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.domkit.Tree.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.domkit.Tree.prototype.onTreeEvent = function(type,f)
{
  this.m_cbTreeEvent.set(type,f);
  return;
}
fan.domkit.Tree.prototype.doRebuild = function()
{
  var $this = this;
  this.removeAll();
  this.m_roots.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u55,
    function(r)
    {
      $this.add($this.toElem(null,r));
      return;
    }));
  return;
}
fan.domkit.Tree.prototype.doRefreshNode = function(node)
{
  var $this = this;
  if (node.m_elem == null)
  {
    return;
  }
  ;
  node.m_elem.style().toggleClass("expanded",fan.sys.ObjUtil.coerce(node.m_expanded,fan.sys.Bool.$type.toNullable()));
  var expander = node.m_elem.querySelector(".domkit-Tree-node-expander");
  expander.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.mult(fan.sys.ObjUtil.coerce(node.m_depth,fan.sys.Int.$type),fan.domkit.Tree.m_depthIndent),fan.sys.Obj.$type.toNullable())),"px")]));
  expander.html$((function($this) { if (node.hasChildren()) return "\u25ba"; return "&nbsp;"; })(this));
  while (fan.sys.ObjUtil.compareGT(node.m_elem.children().size(),1))
  {
    node.m_elem.remove(fan.sys.ObjUtil.coerce(node.m_elem.lastChild(),fan.dom.Elem.$type));
  }
  ;
  var selected = this.m_sel.items().contains(node);
  var content = node.m_elem.querySelector(".domkit-Tree-node");
  content.style().toggleClass("domkit-sel",fan.sys.ObjUtil.coerce(selected,fan.sys.Bool.$type.toNullable()));
  var flags = fan.domkit.TreeFlags.make(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u57,
    function(it)
    {
      it.m_focused = $this.m_manFocus;
      it.m_selected = selected;
      return;
    }));
  content.style().trap("paddingLeft",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.mult(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(node.m_depth,fan.sys.Int.$type),1),fan.domkit.Tree.m_depthIndent),fan.sys.Obj.$type.toNullable())),"px")]));
  node.onElem(fan.sys.ObjUtil.coerce(content.lastChild(),fan.dom.Elem.$type),flags);
  if (node.m_expanded)
  {
    node.children().each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u58,
      function(k)
      {
        k.m_parent = node;
        node.m_elem.add($this.toElem(node,k));
        $this.doRefreshNode(k);
        return;
      }));
  }
  ;
  return;
}
fan.domkit.Tree.prototype.toElem = function(parent,node)
{
  var $this = this;
  if (node.m_elem == null)
  {
    node.m_depth = fan.sys.ObjUtil.coerce((function($this) { if (parent == null) return 0; return fan.sys.Int.plus(fan.sys.ObjUtil.coerce(parent.m_depth,fan.sys.Int.$type),1); })(this),fan.sys.Int.$type.toNullable());
    node.m_elem = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u8,
      function(it)
      {
        it.style().addClass("domkit-Tree-node-block");
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
          fan.domkit.$clos$_u8,
          function(it)
          {
            it.style().addClass("domkit-Tree-node");
            it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
              fan.domkit.$clos$_u8,
              function(it)
              {
                it.style().addClass("domkit-Tree-node-expander");
                return;
              })),fan.dom.Elem.$type)).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
              fan.domkit.$clos$_u8,
              function(it)
              {
                return;
              })),fan.dom.Elem.$type));
            return;
          })),fan.dom.Elem.$type));
        return;
      })),fan.dom.Elem.$type);
    this.refreshNode(node);
  }
  ;
  return fan.sys.ObjUtil.coerce(node.m_elem,fan.dom.Elem.$type);
}
fan.domkit.Tree.prototype.toNode = function(elem)
{
  var $this = this;
  while (!elem.style().hasClass("domkit-Tree-node-block"))
  {
    elem = fan.sys.ObjUtil.coerce(elem.parent(),fan.dom.Elem.$type);
  }
  ;
  var elemPath = fan.sys.List.make(fan.dom.Elem.$type, [elem]);
  while (!elemPath.first().parent().style().hasClass("domkit-Tree"))
  {
    elemPath.insert(0,fan.sys.ObjUtil.coerce(elemPath.first().parent(),fan.dom.Elem.$type));
  }
  ;
  var node = null;
  elemPath.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u60,
    function(p)
    {
      var i = p.parent().children().findIndex(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u61,
        function(k)
        {
          return fan.sys.ObjUtil.equals(p,k);
        }));
      node = (function($this) { if (node == null) return $this.m_roots.get(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type)); return node.children().get(fan.sys.Int.minus(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type),1)); })($this);
      return;
    }));
  return fan.sys.ObjUtil.coerce(node,fan.domkit.TreeNode.$type);
}
fan.domkit.Tree.prototype.onMouseEvent = function(e)
{
  var $this = this;
  var elem = e.target();
  if (fan.sys.ObjUtil.equals(elem,this))
  {
    return;
  }
  ;
  var node = this.toNode(elem);
  if (fan.sys.ObjUtil.equals(e.type(),"mousedown"))
  {
    if ((!elem.style().hasClass("domkit-Tree-node-expander") && !this.m_sel.items().contains(node)))
    {
      this.m_sel.item$(node);
      (function($this) { var $_u63 = $this.m_cbSelect; if ($_u63 == null) return null; return $_u63.call($this); })(this);
    }
    ;
  }
  else
  {
    if (fan.sys.ObjUtil.equals(e.type(),"mouseup"))
    {
      if (elem.style().hasClass("domkit-Tree-node-expander"))
      {
        this.expand(node,!node.m_expanded);
      }
      ;
    }
    ;
  }
  ;
  if ((fan.sys.ObjUtil.equals(e.type(),"dblclick") && !elem.style().hasClass("domkit-Tree-node-expander")))
  {
    (function($this) { var $_u64 = $this.m_cbAction; if ($_u64 == null) return null; return $_u64.call($this,e); })(this);
  }
  ;
  var cb = this.m_cbTreeEvent.get(e.type());
  if (cb != null)
  {
    var blockElem = node.m_elem;
    var nodeElem = blockElem.firstChild();
    var indent = fan.sys.Int.mult(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(node.m_depth,fan.sys.Int.$type),1),fan.domkit.Tree.m_depthIndent);
    var npos = nodeElem.relPos(e.pagePos());
    if (fan.sys.ObjUtil.compareLT(fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(npos.m_x,fan.sys.Num.$type)),indent),0))
    {
      return;
    }
    ;
    cb.call(fan.domkit.TreeEvent.make(this,node,fan.sys.Func.make$closure(
      fan.domkit.$clos$_u65,
      function(it)
      {
        it.m_type = e.type();
        it.m_pagePos = e.pagePos();
        it.m_nodePos = fan.graphics.Point.make(fan.sys.Float.minusInt(npos.m_x,indent),npos.m_y);
        it.m_size = fan.graphics.Size.make(fan.sys.Float.minusInt(nodeElem.size().m_w,indent),nodeElem.size().m_h);
        return;
      })));
  }
  ;
  return;
}
fan.domkit.Tree.prototype.onUpdateSel = function(oldNodes,newNodes)
{
  var $this = this;
  oldNodes.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u66,
    function(n)
    {
      $this.refreshNode(n);
      return;
    }));
  newNodes.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u66,
    function(n)
    {
      $this.refreshNode(n);
      return;
    }));
  return;
}
fan.domkit.Tree.prototype.nodes = function()
{
  return this.m_nodes;
}
fan.domkit.Tree.prototype.nodes$ = function(it)
{
  this.m_nodes = it;
  return;
}
fan.domkit.Tree.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.domkit.Tree.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.domkit.Tree.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.domkit.Tree.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.domkit.Tree.prototype.cbTreeEvent = function()
{
  return this.m_cbTreeEvent;
}
fan.domkit.Tree.prototype.cbTreeEvent$ = function(it)
{
  this.m_cbTreeEvent = it;
  return;
}
fan.domkit.Tree.prototype.manFocus = function()
{
  return this.m_manFocus;
}
fan.domkit.Tree.prototype.manFocus$ = function(it)
{
  this.m_manFocus = it;
  return;
}
fan.domkit.Tree.static$init = function()
{
  fan.domkit.Tree.m_depthIndent = 16;
  return;
}
fan.domkit.Tree.prototype.m_roots = null;
fan.domkit.Tree.prototype.m_sel = null;
fan.domkit.Tree.m_depthIndent = 0;
fan.domkit.Tree.prototype.m_nodes = null;
fan.domkit.Tree.prototype.m_cbSelect = null;
fan.domkit.Tree.prototype.m_cbAction = null;
fan.domkit.Tree.prototype.m_cbTreeEvent = null;
fan.domkit.Tree.prototype.m_manFocus = false;
fan.domkit.TreeSelection = fan.sys.Obj.$extend(fan.domkit.Selection);
fan.domkit.TreeSelection.prototype.$ctor = function()
{
  fan.domkit.Selection.prototype.$ctor.call(this);
  var $this = this;
  this.m_items = fan.sys.List.make(fan.sys.Obj.$type);
  return;
}
fan.domkit.TreeSelection.prototype.$typeof = function() { return fan.domkit.TreeSelection.$type; }
fan.domkit.TreeSelection.make = function(tree) {
  var self = new fan.domkit.TreeSelection();
  fan.domkit.TreeSelection.make$(self,tree);
  return self;
  }
fan.domkit.TreeSelection.make$ = function(self,tree)
{
  fan.domkit.Selection.make$(self);
  ;
  self.m_tree = tree;
  return;
}
fan.domkit.TreeSelection.prototype.isEmpty = function()
{
  return this.items().isEmpty();
}
fan.domkit.TreeSelection.prototype.size = function()
{
  return this.items().size();
}
fan.domkit.TreeSelection.prototype.item = function()
{
  return this.items().first();
}
fan.domkit.TreeSelection.prototype.item$ = function(it)
{
  this.items$((function($this) { if (it == null) return fan.sys.List.make(fan.sys.Obj.$type); return fan.sys.List.make(fan.sys.Obj.$type.toNullable(), [it]); })(this));
  return;
}
fan.domkit.TreeSelection.prototype.items = function()
{
  return this.m_items;
}
fan.domkit.TreeSelection.prototype.items$ = function(it)
{
  if (!this.m_enabled)
  {
    return;
  }
  ;
  var oldItems = this.m_items;
  var newItems = (function($this) { if ($this.multi()) return it; return (function($this) { if (fan.sys.ObjUtil.compareGT(it.size(),0)) return fan.sys.List.make(fan.sys.Obj.$type.toNullable(), [it.first()]); return fan.sys.List.make(fan.sys.Obj.$type); })($this); })(this).ro();
  this.m_items = newItems;
  this.m_tree.onUpdateSel(fan.sys.ObjUtil.coerce(oldItems,fan.sys.Type.find("domkit::TreeNode[]")),fan.sys.ObjUtil.coerce(newItems,fan.sys.Type.find("domkit::TreeNode[]")));
  return;
}
fan.domkit.TreeSelection.prototype.index = function()
{
  throw fan.sys.Err.make("Not implemented for Tree");
}
fan.domkit.TreeSelection.prototype.index$ = function(it)
{
  throw fan.sys.Err.make("Not implemented for Tree");
}
fan.domkit.TreeSelection.prototype.indexes = function()
{
  throw fan.sys.Err.make("Not implemented for Tree");
}
fan.domkit.TreeSelection.prototype.indexes$ = function(it)
{
  throw fan.sys.Err.make("Not implemented for Tree");
}
fan.domkit.TreeSelection.prototype.tree = function()
{
  return this.m_tree;
}
fan.domkit.TreeSelection.prototype.tree$ = function(it)
{
  this.m_tree = it;
  return;
}
fan.domkit.TreeSelection.prototype.m_item = null;
fan.domkit.TreeSelection.prototype.m_items = null;
fan.domkit.TreeSelection.prototype.m_index = null;
fan.domkit.TreeSelection.prototype.m_indexes = null;
fan.domkit.TreeSelection.prototype.m_tree = null;
fan.domkit.Dialog = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.Dialog.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_title = null;
  this.m_frame = null;
  this.m_cbOpen = null;
  this.m_cbClose = null;
  this.m_cbKeyDown = null;
  return;
}
fan.domkit.Dialog.prototype.$typeof = function() { return fan.domkit.Dialog.$type; }
fan.domkit.Dialog.make = function() {
  var self = new fan.domkit.Dialog();
  fan.domkit.Dialog.make$(self);
  return self;
  }
fan.domkit.Dialog.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  ;
  self.m_uid = fan.sys.ObjUtil.coerce(fan.domkit.Dialog.m_nextId.val(),fan.sys.Int.$type);
  fan.domkit.Dialog.m_nextId.val$(fan.sys.ObjUtil.coerce(fan.sys.Int.plus(self.m_uid,1),fan.sys.Obj.$type.toNullable()));
  self.style().addClass("domkit-Dialog");
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.Dialog.prototype.title = function()
{
  return this.m_title;
}
fan.domkit.Dialog.prototype.title$ = function(it)
{
  this.m_title = it;
  return;
}
fan.domkit.Dialog.prototype.onBeforeOpen = function()
{
  return;
}
fan.domkit.Dialog.prototype.onAfterOpen = function()
{
  return;
}
fan.domkit.Dialog.prototype.onKeyDown = function(f)
{
  this.m_cbKeyDown = f;
  return;
}
fan.domkit.Dialog.prototype.open = function()
{
  var $this = this;
  this.onBeforeOpen();
  var mask = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.id$(fan.sys.Str.plus("domkitDialog-mask-",fan.sys.ObjUtil.coerce($this.m_uid,fan.sys.Obj.$type.toNullable())));
      it.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
      it.style().addClass("domkit-Dialog-mask");
      it.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
      it.onEvent("keydown",false,fan.sys.Func.make$closure(
        fan.domkit.$clos$_u0,
        function(e)
        {
          (function($this) { var $_u70 = $this.m_cbKeyDown; if ($_u70 == null) return null; return $_u70.call(e); })($this);
          return;
        }));
      return;
    })),fan.dom.Elem.$type);
  this.m_frame = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.style().addClass("domkit-Dialog-frame");
      it.style().setAll(fan.sys.Map.fromLiteral(["transform","opacity"],["scale(0.75)","0.0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
      return;
    })),fan.dom.Elem.$type);
  if (this.m_title != null)
  {
    var telem = (function($this) { var $_u71 = fan.sys.ObjUtil.as($this.m_title,fan.dom.Elem.$type); if ($_u71 != null) return $_u71; return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u39,
      function(it)
      {
        it.style().addClass("def-label");
        it.text$(fan.sys.ObjUtil.toStr($this.m_title));
        return;
      })),fan.domkit.Label.$type); })(this);
    this.m_frame.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u8,
      function(it)
      {
        it.style().addClass("domkit-Dialog-title");
        it.add(fan.sys.ObjUtil.coerce(telem,fan.dom.Elem.$type));
        it.onEvent("mousedown",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            e.stop();
            var vp = fan.dom.Win.cur().viewport();
            var doc = fan.dom.Win.cur().doc();
            var off = doc.body().relPos(e.pagePos());
            var fps = $this.m_frame.pos();
            var fsz = $this.m_frame.size();
            var fmove = null;
            var fup = null;
            fmove = doc.onEvent("mousemove",true,fan.sys.Func.make$closure(
              fan.domkit.$clos$_u21,
              function(de)
              {
                var pos = doc.body().relPos(de.pagePos());
                var fx = fan.sys.Int.min(fan.sys.Int.max(fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(pos.m_x,fan.sys.Num.$type)),fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(off.m_x,fan.sys.Num.$type)),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fps.m_x,fan.sys.Num.$type)))),0),fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(vp.m_w,fan.sys.Num.$type)),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fsz.m_w,fan.sys.Num.$type))));
                var fy = fan.sys.Int.min(fan.sys.Int.max(fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(pos.m_y,fan.sys.Num.$type)),fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(off.m_y,fan.sys.Num.$type)),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fps.m_y,fan.sys.Num.$type)))),0),fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(vp.m_h,fan.sys.Num.$type)),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fsz.m_h,fan.sys.Num.$type))));
                mask.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
                $this.m_frame.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
                $this.m_frame.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fx,fan.sys.Obj.$type.toNullable())),"px")]));
                $this.m_frame.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fy,fan.sys.Obj.$type.toNullable())),"px")]));
                return;
              }));
            fup = doc.onEvent("mouseup",true,fan.sys.Func.make$closure(
              fan.domkit.$clos$_u21,
              function(de)
              {
                de.stop();
                doc.removeEvent("mousemove",true,fan.sys.ObjUtil.coerce(fmove,fan.sys.Type.find("sys::Func")));
                doc.removeEvent("mouseup",true,fan.sys.ObjUtil.coerce(fup,fan.sys.Type.find("sys::Func")));
                return;
              }));
            return;
          }));
        return;
      })),fan.dom.Elem.$type));
  }
  ;
  this.m_frame.add(this);
  mask.add(fan.sys.ObjUtil.coerce(this.m_frame,fan.dom.Elem.$type));
  var body = fan.dom.Win.cur().doc().body();
  body.add(mask);
  mask.transition(fan.sys.Map.fromLiteral(["opacity"],["1"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"));
  this.m_frame.transition(fan.sys.Map.fromLiteral(["transform","opacity"],["scale(1)","1"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      $this.focus();
      $this.onAfterOpen();
      $this.fireOpen();
      return;
    }));
  return;
}
fan.domkit.Dialog.prototype.close = function()
{
  var $this = this;
  var mask = fan.dom.Win.cur().doc().elemById(fan.sys.Str.plus("domkitDialog-mask-",fan.sys.ObjUtil.coerce(this.m_uid,fan.sys.Obj.$type.toNullable())));
  (function($this) { var $_u72 = mask; if ($_u72 == null) return null; return $_u72.transition(fan.sys.Map.fromLiteral(["opacity"],["0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms")); })(this);
  (function($this) { var $_u73 = $this.m_frame; if ($_u73 == null) return null; return $_u73.transition(fan.sys.Map.fromLiteral(["transform","opacity"],["scale(0.75)","0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      (function($this) { var $_u74 = (function($this) { var $_u75 = mask; if ($_u75 == null) return null; return $_u75.parent(); })($this); if ($_u74 == null) return null; return $_u74.remove(fan.sys.ObjUtil.coerce(mask,fan.dom.Elem.$type)); })($this);
      $this.fireClose();
      return;
    })); })(this);
  return;
}
fan.domkit.Dialog.prototype.onOpen = function(f)
{
  this.m_cbOpen = f;
  return;
}
fan.domkit.Dialog.prototype.onClose = function(f)
{
  this.m_cbClose = f;
  return;
}
fan.domkit.Dialog.prototype.fireOpen = function()
{
  (function($this) { var $_u76 = $this.m_cbOpen; if ($_u76 == null) return null; return $_u76.call($this); })(this);
  return;
}
fan.domkit.Dialog.prototype.fireClose = function()
{
  (function($this) { var $_u77 = $this.m_cbClose; if ($_u77 == null) return null; return $_u77.call($this); })(this);
  return;
}
fan.domkit.Dialog.prototype.frame = function()
{
  return this.m_frame;
}
fan.domkit.Dialog.prototype.frame$ = function(it)
{
  this.m_frame = it;
  return;
}
fan.domkit.Dialog.prototype.cbOpen = function()
{
  return this.m_cbOpen;
}
fan.domkit.Dialog.prototype.cbOpen$ = function(it)
{
  this.m_cbOpen = it;
  return;
}
fan.domkit.Dialog.prototype.cbClose = function()
{
  return this.m_cbClose;
}
fan.domkit.Dialog.prototype.cbClose$ = function(it)
{
  this.m_cbClose = it;
  return;
}
fan.domkit.Dialog.prototype.cbKeyDown = function()
{
  return this.m_cbKeyDown;
}
fan.domkit.Dialog.prototype.cbKeyDown$ = function(it)
{
  this.m_cbKeyDown = it;
  return;
}
fan.domkit.Dialog.static$init = function()
{
  fan.domkit.Dialog.m_nextId = fan.concurrent.AtomicRef.make(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()));
  return;
}
fan.domkit.Dialog.prototype.m_title = null;
fan.domkit.Dialog.prototype.m_uid = 0;
fan.domkit.Dialog.m_nextId = null;
fan.domkit.Dialog.prototype.m_frame = null;
fan.domkit.Dialog.prototype.m_cbOpen = null;
fan.domkit.Dialog.prototype.m_cbClose = null;
fan.domkit.Dialog.prototype.m_cbKeyDown = null;
fan.domkit.Popup = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Popup.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_halign = fan.domkit.Align.m_left;
  return;
}
fan.domkit.Popup.prototype.$typeof = function() { return fan.domkit.Popup.$type; }
fan.domkit.Popup.make = function() {
  var self = new fan.domkit.Popup();
  fan.domkit.Popup.make$(self);
  return self;
  }
fan.domkit.Popup.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self);
  ;
  self.m_uid = fan.domkit.Popup.m_nextId.getAndIncrement();
  self.style().addClass("domkit-Popup");
  self.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_esc))
      {
        $this.close();
      }
      ;
      return;
    }));
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.Popup.prototype.halign = function()
{
  return this.m_halign;
}
fan.domkit.Popup.prototype.halign$ = function(it)
{
  this.m_halign = it;
  return;
}
fan.domkit.Popup.prototype.isOpen = function()
{
  return this.m_isOpen;
}
fan.domkit.Popup.prototype.isOpen$ = function(it)
{
  this.m_isOpen = it;
  return;
}
fan.domkit.Popup.prototype.open = function(x,y)
{
  var $this = this;
  if (this.m_isOpen)
  {
    return;
  }
  ;
  this.m_openPos = fan.graphics.Point.make(x,y);
  this.style().setAll(fan.sys.Map.fromLiteral(["left","top","-webkit-transform","opacity"],[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(x,fan.sys.Obj.$type.toNullable())),"px"),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(y,fan.sys.Obj.$type.toNullable())),"px"),"scale(1)","0.0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  var body = fan.dom.Win.cur().doc().body();
  body.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.id$(fan.sys.Str.plus("domkitPopup-mask-",fan.sys.ObjUtil.coerce($this.m_uid,fan.sys.Obj.$type.toNullable())));
      it.style().addClass("domkit-Popup-mask");
      it.onEvent("mousedown",false,fan.sys.Func.make$closure(
        fan.domkit.$clos$_u0,
        function(e)
        {
          if ((fan.sys.ObjUtil.equals(e.target(),$this) || $this.containsChild(e.target())))
          {
            return;
          }
          ;
          $this.close();
          return;
        }));
      it.add($this);
      return;
    })),fan.dom.Elem.$type));
  this.fitBounds();
  this.onBeforeOpen();
  this.transition(fan.sys.Map.fromLiteral(["opacity"],["1"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      $this.focus();
      $this.fireOpen(null);
      return;
    }));
  return;
}
fan.domkit.Popup.prototype.close = function()
{
  var $this = this;
  this.transition(fan.sys.Map.fromLiteral(["transform","opacity"],["scale(0.75)","0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      var mask = fan.dom.Win.cur().doc().elemById(fan.sys.Str.plus("domkitPopup-mask-",fan.sys.ObjUtil.coerce($this.m_uid,fan.sys.Obj.$type.toNullable())));
      (function($this) { var $_u78 = (function($this) { var $_u79 = mask; if ($_u79 == null) return null; return $_u79.parent(); })($this); if ($_u78 == null) return null; return $_u78.remove(fan.sys.ObjUtil.coerce(mask,fan.dom.Elem.$type)); })($this);
      $this.fireClose(null);
      return;
    }));
  return;
}
fan.domkit.Popup.prototype.fitBounds = function()
{
  if (this.parent() == null)
  {
    return;
  }
  ;
  var x = this.m_openPos.m_x;
  var y = this.m_openPos.m_y;
  var sz = this.size();
  var $_u80 = this.m_halign;
  if (fan.sys.ObjUtil.equals($_u80,fan.domkit.Align.m_center))
  {
    x = fan.sys.Float.max(fan.domkit.Popup.m_gutter,fan.sys.Float.minusInt(x,fan.sys.Int.div(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(sz.m_w,fan.sys.Num.$type)),2)));
    this.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(x,fan.sys.Obj.$type.toNullable())),"px")]));
  }
  else if (fan.sys.ObjUtil.equals($_u80,fan.domkit.Align.m_right))
  {
    x = fan.sys.Float.max(fan.domkit.Popup.m_gutter,fan.sys.Float.minusInt(x,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(sz.m_w,fan.sys.Num.$type))));
    this.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(x,fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  var vp = fan.dom.Win.cur().viewport();
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plus(fan.sys.Float.plus(sz.m_w,fan.domkit.Popup.m_gutter),fan.domkit.Popup.m_gutter),vp.m_w))
  {
    this.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minus(fan.sys.Float.minus(vp.m_w,fan.domkit.Popup.m_gutter),fan.domkit.Popup.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plus(fan.sys.Float.plus(sz.m_h,fan.domkit.Popup.m_gutter),fan.domkit.Popup.m_gutter),vp.m_h))
  {
    this.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minus(fan.sys.Float.minus(vp.m_h,fan.domkit.Popup.m_gutter),fan.domkit.Popup.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  sz = this.size();
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plus(fan.sys.Float.plus(x,sz.m_w),fan.domkit.Popup.m_gutter),vp.m_w))
  {
    this.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minus(fan.sys.Float.minus(vp.m_w,sz.m_w),fan.domkit.Popup.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plus(fan.sys.Float.plus(y,sz.m_h),fan.domkit.Popup.m_gutter),vp.m_h))
  {
    this.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minus(fan.sys.Float.minus(vp.m_h,sz.m_h),fan.domkit.Popup.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  return;
}
fan.domkit.Popup.prototype.onBeforeOpen = function()
{
  return;
}
fan.domkit.Popup.prototype.onOpen = function(f)
{
  this.m_cbOpen = f;
  return;
}
fan.domkit.Popup.prototype.onClose = function(f)
{
  this.m_cbClose = f;
  return;
}
fan.domkit.Popup.prototype._onClose = function(f)
{
  this.m__cbClose = f;
  return;
}
fan.domkit.Popup.prototype.fireOpen = function(e)
{
  (function($this) { var $_u81 = $this.m_cbOpen; if ($_u81 == null) return null; return $_u81.call($this); })(this);
  this.m_isOpen = true;
  return;
}
fan.domkit.Popup.prototype.fireClose = function(e)
{
  (function($this) { var $_u82 = $this.m__cbClose; if ($_u82 == null) return null; return $_u82.call($this); })(this);
  (function($this) { var $_u83 = $this.m_cbClose; if ($_u83 == null) return null; return $_u83.call($this); })(this);
  this.m_isOpen = false;
  return;
}
fan.domkit.Popup.prototype.openPos = function()
{
  return this.m_openPos;
}
fan.domkit.Popup.prototype.openPos$ = function(it)
{
  this.m_openPos = it;
  return;
}
fan.domkit.Popup.prototype.cbOpen = function()
{
  return this.m_cbOpen;
}
fan.domkit.Popup.prototype.cbOpen$ = function(it)
{
  this.m_cbOpen = it;
  return;
}
fan.domkit.Popup.prototype.cbClose = function()
{
  return this.m_cbClose;
}
fan.domkit.Popup.prototype.cbClose$ = function(it)
{
  this.m_cbClose = it;
  return;
}
fan.domkit.Popup.prototype._cbClose = function()
{
  return this.m__cbClose;
}
fan.domkit.Popup.prototype._cbClose$ = function(it)
{
  this.m__cbClose = it;
  return;
}
fan.domkit.Popup.static$init = function()
{
  fan.domkit.Popup.m_nextId = fan.concurrent.AtomicInt.make(0);
  fan.domkit.Popup.m_gutter = fan.sys.Float.make(12.0);
  return;
}
fan.domkit.Popup.prototype.m_halign = null;
fan.domkit.Popup.prototype.m_isOpen = false;
fan.domkit.Popup.prototype.m_uid = 0;
fan.domkit.Popup.m_nextId = null;
fan.domkit.Popup.m_gutter = fan.sys.Float.make(0);
fan.domkit.Popup.prototype.m_openPos = null;
fan.domkit.Popup.prototype.m_cbOpen = null;
fan.domkit.Popup.prototype.m_cbClose = null;
fan.domkit.Popup.prototype.m__cbClose = null;
fan.domkit.Menu = fan.sys.Obj.$extend(fan.domkit.Popup);
fan.domkit.Menu.prototype.$ctor = function()
{
  fan.domkit.Popup.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_onCustomKeyDown = null;
  this.m_lastEvent = 0;
  this.m_armed = false;
  return;
}
fan.domkit.Menu.prototype.$typeof = function() { return fan.domkit.Menu.$type; }
fan.domkit.Menu.make = function() {
  var self = new fan.domkit.Menu();
  fan.domkit.Menu.make$(self);
  return self;
  }
fan.domkit.Menu.make$ = function(self)
{
  var $this = self;
  fan.domkit.Popup.make$(self);
  ;
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  self.style().addClass("domkit-Menu");
  self.onOpen(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u44,
    function(it)
    {
      $this.focus();
      return;
    }));
  self.onEvent("mouseleave",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u84,
    function(it)
    {
      $this.select(null);
      return;
    }));
  self.onEvent("mouseover",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (fan.sys.ObjUtil.compareGT($this.m_lastEvent,0))
      {
        $this.m_lastEvent = 0;
        return;
      }
      ;
      var t = e.target();
      while ((t != null && !fan.sys.ObjUtil.is(t,fan.domkit.MenuItem.$type)))
      {
        t = (function($this) { var $_u85 = t; if ($_u85 == null) return null; return $_u85.parent(); })($this);
      }
      ;
      if (t == null)
      {
        $this.select(null);
        return;
      }
      ;
      var index = $this.children().findIndex(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u61,
        function(k)
        {
          return fan.sys.ObjUtil.equals(t,k);
        }));
      if (index != null)
      {
        var item = fan.sys.ObjUtil.coerce($this.children().get(fan.sys.ObjUtil.coerce(index,fan.sys.Int.$type)),fan.domkit.MenuItem.$type);
        $this.select((function($this) { if (fan.sys.ObjUtil.coerce(item.enabled(),fan.sys.Bool.$type)) return index; return null; })($this));
      }
      ;
      $this.m_lastEvent = 0;
      return;
    }));
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.m_armed = true;
      return;
    }));
  self.onEvent("mouseup",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if ($this.m_armed)
      {
        $this.fireAction(e);
      }
      ;
      return;
    }));
  self.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      var $_u87 = e.key();
      if (fan.sys.ObjUtil.equals($_u87,fan.dom.Key.m_esc))
      {
        $this.close();
      }
      else if (fan.sys.ObjUtil.equals($_u87,fan.dom.Key.m_up))
      {
        e.stop();
        $this.m_lastEvent = 1;
        $this.select((function($this) { if ($this.m_selIndex == null) return $this.findFirst(); return $this.findPrev(fan.sys.ObjUtil.coerce($this.m_selIndex,fan.sys.Int.$type)); })($this));
      }
      else if (fan.sys.ObjUtil.equals($_u87,fan.dom.Key.m_down))
      {
        e.stop();
        $this.m_lastEvent = 1;
        $this.select((function($this) { if ($this.m_selIndex == null) return $this.findFirst(); return $this.findNext(fan.sys.ObjUtil.coerce($this.m_selIndex,fan.sys.Int.$type)); })($this));
      }
      else if (fan.sys.ObjUtil.equals($_u87,fan.dom.Key.m_space) || fan.sys.ObjUtil.equals($_u87,fan.dom.Key.m_enter))
      {
        e.stop();
        $this.fireAction(e);
      }
      else
      {
        if ($this.m_onCustomKeyDown != null)
        {
          e.stop();
          $this.m_lastEvent = 1;
          $this.m_onCustomKeyDown.call(e);
        }
        ;
      }
      ;
      return;
    }));
  return;
}
fan.domkit.Menu.prototype.onBeforeOpen = function()
{
  if (this.m_selIndex != null)
  {
    this.select(this.m_selIndex);
  }
  ;
  return;
}
fan.domkit.Menu.prototype.select = function(index)
{
  var kids = this.children();
  if (fan.sys.ObjUtil.equals(kids.size(),0))
  {
    return;
  }
  ;
  if (this.m_selIndex != null)
  {
    kids.get(fan.sys.ObjUtil.coerce(this.m_selIndex,fan.sys.Int.$type)).style().removeClass("domkit-sel");
  }
  ;
  if (index == null)
  {
    this.m_selIndex = null;
    return;
  }
  ;
  if (fan.sys.ObjUtil.compareLT(index,0))
  {
    index = fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable());
  }
  ;
  if (fan.sys.ObjUtil.compareGT(index,fan.sys.Int.minus(kids.size(),1)))
  {
    index = fan.sys.ObjUtil.coerce(fan.sys.Int.minus(kids.size(),1),fan.sys.Int.$type.toNullable());
  }
  ;
  var item = kids.get(fan.sys.ObjUtil.coerce(index,fan.sys.Int.$type));
  item.style().addClass("domkit-sel");
  this.m_selIndex = index;
  var sy = this.scrollPos().m_y;
  var mh = this.size().m_h;
  var iy = item.pos().m_y;
  var ih = item.size().m_h;
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
  return;
}
fan.domkit.Menu.prototype.findFirst = function()
{
  var i = 0;
  var kids = this.children();
  while (fan.sys.ObjUtil.compareLT((function($this) { var $_u90 = i; i = fan.sys.Int.increment(i); return $_u90; })(this),fan.sys.Int.minus(kids.size(),1)))
  {
    var item = fan.sys.ObjUtil.as(kids.get(i),fan.domkit.MenuItem.$type);
    if ((item != null && fan.sys.ObjUtil.coerce(item.enabled(),fan.sys.Bool.$type)))
    {
      return fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type.toNullable());
    }
    ;
  }
  ;
  return null;
}
fan.domkit.Menu.prototype.findPrev = function(start)
{
  var i = start;
  var kids = this.children();
  while (fan.sys.ObjUtil.compareGE(i = fan.sys.Int.decrement(i),0))
  {
    var item = fan.sys.ObjUtil.as(kids.get(i),fan.domkit.MenuItem.$type);
    if ((item != null && fan.sys.ObjUtil.coerce(item.enabled(),fan.sys.Bool.$type)))
    {
      return fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type.toNullable());
    }
    ;
  }
  ;
  return fan.sys.ObjUtil.coerce(start,fan.sys.Int.$type.toNullable());
}
fan.domkit.Menu.prototype.findNext = function(start)
{
  var i = start;
  var kids = this.children();
  while (fan.sys.ObjUtil.compareLT(i = fan.sys.Int.increment(i),kids.size()))
  {
    var item = fan.sys.ObjUtil.as(kids.get(i),fan.domkit.MenuItem.$type);
    if ((item != null && fan.sys.ObjUtil.coerce(item.enabled(),fan.sys.Bool.$type)))
    {
      return fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type.toNullable());
    }
    ;
  }
  ;
  return fan.sys.ObjUtil.coerce(start,fan.sys.Int.$type.toNullable());
}
fan.domkit.Menu.prototype.fireAction = function(e)
{
  if (this.m_selIndex == null)
  {
    return;
  }
  ;
  var item = fan.sys.ObjUtil.coerce(this.children().get(fan.sys.ObjUtil.coerce(this.m_selIndex,fan.sys.Int.$type)),fan.domkit.MenuItem.$type);
  item.fireAction(e);
  return;
}
fan.domkit.Menu.prototype.onCustomKeyDown = function()
{
  return this.m_onCustomKeyDown;
}
fan.domkit.Menu.prototype.onCustomKeyDown$ = function(it)
{
  this.m_onCustomKeyDown = it;
  return;
}
fan.domkit.Menu.prototype.selIndex = function()
{
  return this.m_selIndex;
}
fan.domkit.Menu.prototype.selIndex$ = function(it)
{
  this.m_selIndex = it;
  return;
}
fan.domkit.Menu.prototype.lastEvent = function()
{
  return this.m_lastEvent;
}
fan.domkit.Menu.prototype.lastEvent$ = function(it)
{
  this.m_lastEvent = it;
  return;
}
fan.domkit.Menu.prototype.armed = function()
{
  return this.m_armed;
}
fan.domkit.Menu.prototype.armed$ = function(it)
{
  this.m_armed = it;
  return;
}
fan.domkit.Menu.prototype.m_onCustomKeyDown = null;
fan.domkit.Menu.prototype.m_selIndex = null;
fan.domkit.Menu.prototype.m_lastEvent = 0;
fan.domkit.Menu.prototype.m_armed = false;
fan.domkit.MenuItem = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.MenuItem.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cbAction = null;
  return;
}
fan.domkit.MenuItem.prototype.$typeof = function() { return fan.domkit.MenuItem.$type; }
fan.domkit.MenuItem.make = function() {
  var self = new fan.domkit.MenuItem();
  fan.domkit.MenuItem.make$(self);
  return self;
  }
fan.domkit.MenuItem.make$ = function(self)
{
  fan.dom.Elem.make$(self);
  ;
  self.style().addClass("domkit-control domkit-MenuItem");
  return;
}
fan.domkit.MenuItem.prototype.enabled = function()
{
  return fan.sys.ObjUtil.coerce(!this.style().hasClass("disabled"),fan.sys.Bool.$type.toNullable());
}
fan.domkit.MenuItem.prototype.enabled$ = function(it)
{
  this.style().toggleClass("disabled",fan.sys.ObjUtil.coerce(!fan.sys.ObjUtil.coerce(it,fan.sys.Bool.$type),fan.sys.Bool.$type.toNullable()));
  return;
}
fan.domkit.MenuItem.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.domkit.MenuItem.prototype.fireAction = function(e)
{
  if (!fan.sys.ObjUtil.coerce(this.enabled(),fan.sys.Bool.$type))
  {
    return;
  }
  ;
  this.m__event = e;
  (function($this) { var $_u91 = fan.sys.ObjUtil.as($this.parent(),fan.domkit.Popup.$type); if ($_u91 == null) return null; return $_u91.close(); })(this);
  (function($this) { var $_u92 = $this.m_cbAction; if ($_u92 == null) return null; return $_u92.call($this); })(this);
  return;
}
fan.domkit.MenuItem.prototype._event = function()
{
  return this.m__event;
}
fan.domkit.MenuItem.prototype._event$ = function(it)
{
  this.m__event = it;
  return;
}
fan.domkit.MenuItem.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.domkit.MenuItem.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.domkit.MenuItem.prototype.m_enabled = null;
fan.domkit.MenuItem.prototype.m__event = null;
fan.domkit.MenuItem.prototype.m_cbAction = null;
fan.domkit.FilePicker = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.FilePicker.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cbSelect = null;
  return;
}
fan.domkit.FilePicker.prototype.$typeof = function() { return fan.domkit.FilePicker.$type; }
fan.domkit.FilePicker.make = function() {
  var self = new fan.domkit.FilePicker();
  fan.domkit.FilePicker.make$(self);
  return self;
  }
fan.domkit.FilePicker.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self,"input");
  ;
  self.style().addClass("domkit-FilePicker");
  self.trap("type",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["file"]));
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  self.onEvent("change",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u84,
    function(it)
    {
      if ($this.m_cbSelect != null)
      {
        $this.m_cbSelect.call($this);
      }
      ;
      return;
    }));
  return;
}
fan.domkit.FilePicker.prototype.accept = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("accept",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type.toNullable());
}
fan.domkit.FilePicker.prototype.accept$ = function(it)
{
  this.trap("accept",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[it]));
  return;
}
fan.domkit.FilePicker.prototype.multi = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("multiple",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Bool.$type);
}
fan.domkit.FilePicker.prototype.multi$ = function(it)
{
  this.trap("multiple",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.FilePicker.prototype.open = function()
{
  this.invoke("click");
  return;
}
fan.domkit.FilePicker.prototype.files = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("files",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Type.find("dom::DomFile[]"));
}
fan.domkit.FilePicker.prototype.reset = function()
{
  this.trap("value",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[""]));
  return;
}
fan.domkit.FilePicker.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.domkit.FilePicker.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.domkit.FilePicker.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.domkit.FilePicker.prototype.m_accept = null;
fan.domkit.FilePicker.prototype.m_multi = false;
fan.domkit.FilePicker.prototype.m_cbSelect = null;
fan.domkit.FlexBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.FlexBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_dir = "row";
  this.m_wrap = "nowrap";
  this.m_alignMain = "flex-start";
  this.m_alignCross = "center";
  this.m_alignLines = "stretch";
  this.m_flex = fan.sys.List.make(fan.sys.Str.$type);
  return;
}
fan.domkit.FlexBox.prototype.$typeof = function() { return fan.domkit.FlexBox.$type; }
fan.domkit.FlexBox.make = function() {
  var self = new fan.domkit.FlexBox();
  fan.domkit.FlexBox.make$(self);
  return self;
  }
fan.domkit.FlexBox.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  ;
  self.style().addClass("domkit-FlexBox");
  return;
}
fan.domkit.FlexBox.prototype.dir = function()
{
  return this.m_dir;
}
fan.domkit.FlexBox.prototype.dir$ = function(it)
{
  this.m_dir = it;
  return;
}
fan.domkit.FlexBox.prototype.wrap = function()
{
  return this.m_wrap;
}
fan.domkit.FlexBox.prototype.wrap$ = function(it)
{
  this.m_wrap = it;
  return;
}
fan.domkit.FlexBox.prototype.alignMain = function()
{
  return this.m_alignMain;
}
fan.domkit.FlexBox.prototype.alignMain$ = function(it)
{
  this.m_alignMain = it;
  return;
}
fan.domkit.FlexBox.prototype.alignCross = function()
{
  return this.m_alignCross;
}
fan.domkit.FlexBox.prototype.alignCross$ = function(it)
{
  this.m_alignCross = it;
  return;
}
fan.domkit.FlexBox.prototype.alignLines = function()
{
  return this.m_alignLines;
}
fan.domkit.FlexBox.prototype.alignLines$ = function(it)
{
  this.m_alignLines = it;
  return;
}
fan.domkit.FlexBox.prototype.flex = function()
{
  return this.m_flex;
}
fan.domkit.FlexBox.prototype.flex$ = function(it)
{
  this.m_flex = it;
  return;
}
fan.domkit.FlexBox.prototype.onParent = function(p)
{
  this.applyStyle();
  return;
}
fan.domkit.FlexBox.prototype.onAdd = function(c)
{
  this.applyStyle();
  return;
}
fan.domkit.FlexBox.prototype.onRemove = function(c)
{
  this.applyStyle();
  return;
}
fan.domkit.FlexBox.prototype.applyStyle = function()
{
  var $this = this;
  this.style().setAll(fan.sys.Map.fromLiteral(["flex-direction","flex-wrap","justify-content","align-items","align-content"],[this.m_dir,this.m_wrap,this.m_alignMain,this.m_alignCross,this.m_alignLines],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  this.children().each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u14,
    function(kid,i)
    {
      var f = $this.m_flex.getSafe(i);
      if (f != null)
      {
        kid.style().trap("flex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[f]));
      }
      ;
      if (fan.sys.ObjUtil.is(kid,fan.domkit.Box.$type))
      {
        if ((fan.sys.ObjUtil.equals($this.m_dir,"row") && fan.sys.ObjUtil.equals(kid.style().effective("width"),"100%")))
        {
          kid.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
        }
        else
        {
          if ((fan.sys.ObjUtil.equals($this.m_dir,"column") && fan.sys.ObjUtil.equals(kid.style().effective("height"),"100%")))
          {
            kid.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
          }
          ;
        }
        ;
      }
      ;
      return;
    }));
  return;
}
fan.domkit.FlexBox.prototype.m_dir = null;
fan.domkit.FlexBox.prototype.m_wrap = null;
fan.domkit.FlexBox.prototype.m_alignMain = null;
fan.domkit.FlexBox.prototype.m_alignCross = null;
fan.domkit.FlexBox.prototype.m_alignLines = null;
fan.domkit.FlexBox.prototype.m_flex = null;
fan.domkit.Table = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Table.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_model = fan.domkit.TableModel.make();
  this.m_showHeader = true;
  this.m_stripeClasses = fan.sys.List.make(fan.sys.Str.$type, ["even","odd"]);
  this.m_sortEnabled = true;
  this.m_cbTableEvent = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Func"));
  this.m_sbarsz = 15;
  this.m_thumbMargin = 2;
  this.m_overScroll = fan.sys.Int.plus(this.m_sbarsz,2);
  this.m_scrollPageFreq = fan.sys.Duration.fromStr("100ms");
  this.m_scrollPulseDir = fan.sys.Duration.fromStr("300ms");
  this.m_headers = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Int"),fan.sys.Type.find("dom::Elem"));
  this.m_cells = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("domkit::TablePos"),fan.sys.Type.find("dom::Elem"));
  this.m_colx = fan.sys.List.make(fan.sys.Int.$type);
  this.m_colw = fan.sys.List.make(fan.sys.Int.$type);
  this.m_ucolw = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Int"),fan.sys.Type.find("sys::Int"));
  this.m_hpbutw = 22;
  this.m_manFocus = false;
  return;
}
fan.domkit.Table.prototype.$typeof = function() { return fan.domkit.Table.$type; }
fan.domkit.Table.make = function() {
  var self = new fan.domkit.Table();
  fan.domkit.Table.make$(self);
  return self;
  }
fan.domkit.Table.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self,"div");
  ;
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  self.m_view = fan.domkit.TableView.make(self);
  self.m_sel = fan.domkit.TableSelection.make(self.m_view);
  self.style().addClass("domkit-Table").addClass("domkit-border");
  self.onEvent("wheel",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if ((!$this.m_hasScrolly && e.delta() != null && fan.sys.ObjUtil.compareGT(fan.sys.Float.abs(e.delta().m_y),fan.sys.Float.abs(e.delta().m_x))))
      {
        return;
      }
      ;
      $this.onScroll(e.delta());
      e.stop();
      return;
    }));
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.onEvent("mouseup",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.onEvent("mousemove",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.onEvent("dblclick",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseEvent(e);
      return;
    }));
  self.onEvent("keydown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onKeyEvent(e);
      return;
    }));
  self.onEvent("focus",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (!$this.m_manFocus)
      {
        $this.m_manFocus = true;
        $this.refresh();
      }
      ;
      return;
    }));
  self.onEvent("blur",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.m_manFocus = false;
      $this.refresh();
      return;
    }));
  fan.domkit.DomListener.cur().onResize(self,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      $this.rebuild();
      return;
    }));
  return;
}
fan.domkit.Table.prototype.model = function()
{
  return this.m_model;
}
fan.domkit.Table.prototype.model$ = function(it)
{
  this.m_model = it;
  this.m_view.refresh();
  return;
}
fan.domkit.Table.prototype.showHeader = function()
{
  return this.m_showHeader;
}
fan.domkit.Table.prototype.showHeader$ = function(it)
{
  this.m_showHeader = it;
  return;
}
fan.domkit.Table.prototype.stripeClasses = function()
{
  return this.m_stripeClasses;
}
fan.domkit.Table.prototype.stripeClasses$ = function(it)
{
  this.m_stripeClasses = it;
  return;
}
fan.domkit.Table.prototype.onHeaderPopup = function(f)
{
  this.m_cbHeaderPopup = f;
  return;
}
fan.domkit.Table.prototype.view = function()
{
  return this.m_view;
}
fan.domkit.Table.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.domkit.Table.prototype.sortCol = function()
{
  return this.m_view.m_sortCol;
}
fan.domkit.Table.prototype.sortDir = function()
{
  return this.m_view.m_sortDir;
}
fan.domkit.Table.prototype.sort = function(col,dir)
{
  if (dir === undefined) dir = fan.domkit.Dir.m_up;
  if (!this.m_sortEnabled)
  {
    return;
  }
  ;
  this.m_pivot = null;
  this.m_view.sort(col,dir);
  this.model().onSort(col,dir);
  this.refresh();
  (function($this) { var $_u93 = $this.m_cbSort; if ($_u93 == null) return null; return $_u93.call($this); })(this);
  return;
}
fan.domkit.Table.prototype.sortEnabled = function()
{
  return this.m_sortEnabled;
}
fan.domkit.Table.prototype.sortEnabled$ = function(it)
{
  this.m_sortEnabled = it;
  return;
}
fan.domkit.Table.prototype.scrollTo = function(col,row)
{
  if ((fan.sys.ObjUtil.equals(this.m_numCols,0) || fan.sys.ObjUtil.compareLE(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(this.m_colx.last(),fan.sys.Int.$type),fan.sys.ObjUtil.coerce(this.m_colw.last(),fan.sys.Int.$type)),this.m_tbodyw)))
  {
    col = null;
  }
  ;
  if (fan.sys.ObjUtil.compareLT(this.m_numRows,this.m_numVisRows))
  {
    row = null;
  }
  ;
  if (col != null)
  {
    col = fan.sys.ObjUtil.coerce(fan.sys.Int.min(fan.sys.Int.max(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type),0),fan.sys.Int.minus(this.m_numCols,1)),fan.sys.Int.$type.toNullable());
    var rx = this.m_colx.get(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type));
    var rw = this.m_colw.get(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type));
    var maxx = fan.sys.Int.minus(this.m_maxScrollx,this.m_tbodyw);
    if (this.m_hasScrolly)
    {
      maxx = fan.sys.Int.plus(maxx,this.m_overScroll);
    }
    ;
    col = fan.sys.ObjUtil.coerce(fan.sys.Int.max(fan.sys.Int.min(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type),fan.sys.Int.minus(this.m_numCols,this.m_numVisCols)),0),fan.sys.Int.$type.toNullable());
    this.m_scrollx = fan.sys.Int.min(rx,maxx);
  }
  ;
  if (row != null)
  {
    row = fan.sys.ObjUtil.coerce(fan.sys.Int.min(fan.sys.Int.max(fan.sys.ObjUtil.coerce(row,fan.sys.Int.$type),0),fan.sys.Int.minus(this.m_numRows,1)),fan.sys.Int.$type.toNullable());
    var ry = fan.sys.Int.mult(fan.sys.ObjUtil.coerce(row,fan.sys.Int.$type),this.m_rowh);
    var miny = this.m_scrolly;
    var maxy = fan.sys.Int.minus(fan.sys.Int.plus(this.m_scrolly,this.m_tbodyh),this.m_rowh);
    if (this.m_hasScrollx)
    {
      maxy = fan.sys.Int.minus(maxy,this.m_overScroll);
    }
    ;
    if ((fan.sys.ObjUtil.compareGE(ry,miny) && fan.sys.ObjUtil.compareLE(ry,maxy)))
    {
      row = null;
    }
    else
    {
      if (fan.sys.ObjUtil.compareLT(ry,this.m_scrolly))
      {
        this.m_scrolly = ry;
      }
      else
      {
        this.m_scrolly = fan.sys.Int.plus(this.m_scrolly,fan.sys.Int.minus(ry,maxy));
        row = fan.sys.ObjUtil.coerce(fan.sys.Int.max(fan.sys.Int.min(fan.sys.Int.div(this.m_scrolly,this.m_rowh),fan.sys.Int.minus(this.m_numRows,this.m_numVisRows)),0),fan.sys.Int.$type.toNullable());
      }
      ;
    }
    ;
  }
  ;
  this.onUpdate(fan.sys.ObjUtil.coerce((function($this) { var $_u94 = col; if ($_u94 != null) return $_u94; return fan.sys.ObjUtil.coerce($this.m_firstVisCol,fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type),fan.sys.ObjUtil.coerce((function($this) { var $_u95 = row; if ($_u95 != null) return $_u95; return fan.sys.ObjUtil.coerce($this.m_firstVisRow,fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type));
  return;
}
fan.domkit.Table.prototype.sel = function()
{
  return this.m_sel;
}
fan.domkit.Table.prototype.sel$ = function(it)
{
  this.m_sel = it;
  return;
}
fan.domkit.Table.prototype.onBeforeSelect = function(f)
{
  this.m_cbBeforeSelect = f;
  return;
}
fan.domkit.Table.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.domkit.Table.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.domkit.Table.prototype.onSort = function(f)
{
  this.m_cbSort = f;
  return;
}
fan.domkit.Table.prototype.onKeyDown = function(f)
{
  this.m_cbKeyDown = f;
  return;
}
fan.domkit.Table.prototype.onTableEvent = function(type,f)
{
  this.m_cbTableEvent.set(type,f);
  return;
}
fan.domkit.Table.prototype.onBeforeRebuild = function()
{
  return;
}
fan.domkit.Table.prototype.rebuild = function()
{
  var $this = this;
  if (fan.sys.ObjUtil.compareGT(this.size().m_w,fan.sys.Float.make(0.0)))
  {
    this.doRebuild();
  }
  else
  {
    fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("16ms"),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u1,
      function()
      {
        $this.rebuild();
        return;
      }));
  }
  ;
  return;
}
fan.domkit.Table.prototype.refresh = function()
{
  var $this = this;
  this.refreshHeaders();
  fan.sys.Int.times(this.m_numVisRows,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u96,
    function(r)
    {
      var row = fan.sys.Int.plus($this.m_firstVisRow,r);
      $this.refreshRow(row);
      return;
    }));
  return;
}
fan.domkit.Table.prototype.refreshHeaders = function()
{
  var $this = this;
  fan.sys.Int.times(this.m_numVisCols,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u97,
    function(c)
    {
      var col = fan.sys.Int.plus($this.m_firstVisCol,c);
      var header = $this.m_headers.get(fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable()));
      if (header == null)
      {
        return;
      }
      ;
      $this.refreshHeader(header,col);
      return;
    }));
  return;
}
fan.domkit.Table.prototype.refreshHeader = function(header,col)
{
  header = (function($this) { var $_u98 = header; if ($_u98 != null) return $_u98; return $this.m_headers.get(fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable())); })(this);
  if (header == null)
  {
    throw fan.sys.Err.make(fan.sys.Str.plus("Header not found: ",fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable())));
  }
  ;
  header.style().removeClass("last");
  if (fan.sys.ObjUtil.equals(col,fan.sys.Int.minus(this.m_numCols,1)))
  {
    header.style().addClass("last");
  }
  ;
  if ((fan.sys.ObjUtil.compareLT(col,this.m_numCols) && fan.sys.ObjUtil.equals(this.m_view.colViewToModel(col),this.m_view.m_sortCol)))
  {
    header.style().addClass("domkit-Table-header-sort").removeClass("down up popup").addClass((function($this) { if (fan.sys.ObjUtil.equals($this.sortDir(),fan.domkit.Dir.m_up)) return "up"; return "down"; })(this));
    if ((fan.sys.ObjUtil.equals(col,fan.sys.Int.minus(this.m_numCols,1)) && this.m_hasHpbut))
    {
      header.style().addClass("popup");
    }
    ;
  }
  else
  {
    header.style().removeClass("domkit-Table-header-sort").removeClass("down up popup");
  }
  ;
  if (fan.sys.ObjUtil.compareLT(col,this.m_numCols))
  {
    this.m_view.onHeader(fan.sys.ObjUtil.coerce(header,fan.dom.Elem.$type),col);
  }
  ;
  return;
}
fan.domkit.Table.prototype.refreshRow = function(row)
{
  var $this = this;
  if ((fan.sys.ObjUtil.compareLT(row,this.m_firstVisRow) || fan.sys.ObjUtil.compareGT(row,fan.sys.Int.plus(this.m_firstVisRow,this.m_numVisRows))))
  {
    return;
  }
  ;
  fan.sys.Int.times(this.m_numVisCols,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u97,
    function(c)
    {
      var col = fan.sys.Int.plus($this.m_firstVisCol,c);
      var pos = fan.domkit.TablePos.make(col,row);
      var cell = $this.m_cells.get(pos);
      if (cell == null)
      {
        return;
      }
      ;
      $this.refreshCell(cell,pos.m_col,pos.m_row);
      return;
    }));
  return;
}
fan.domkit.Table.prototype.refreshCell = function(cell,col,row)
{
  var $this = this;
  cell = (function($this) { var $_u100 = cell; if ($_u100 != null) return $_u100; return $this.m_cells.get(fan.domkit.TablePos.make(col,row)); })(this);
  if (cell == null)
  {
    throw fan.sys.Err.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Cell not found: ",fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type.toNullable())));
  }
  ;
  cell.style().removeClass("last").removeClass("domkit-sel");
  if (fan.sys.ObjUtil.compareGT(this.m_stripeClasses.size(),0))
  {
    this.m_stripeClasses.each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u101,
      function(c)
      {
        cell.style().removeClass(c);
        return;
      }));
    cell.style().addClass(this.m_stripeClasses.get(fan.sys.Int.mod(row,this.m_stripeClasses.size())));
  }
  ;
  if (fan.sys.ObjUtil.equals(col,fan.sys.Int.minus(this.m_numCols,1)))
  {
    cell.style().addClass("last");
  }
  ;
  if ((fan.sys.ObjUtil.compareLT(col,this.m_numCols) && fan.sys.ObjUtil.compareLT(row,this.m_numRows)))
  {
    var rowSel = fan.sys.ObjUtil.compareGE(this.m_sel.indexes().binarySearch(fan.sys.ObjUtil.coerce(this.m_view.rowViewToModel(row),fan.sys.Obj.$type.toNullable())),0);
    if (rowSel)
    {
      cell.style().addClass("domkit-sel");
    }
    ;
    var flags = fan.domkit.TableFlags.make(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u102,
      function(it)
      {
        it.m_focused = $this.m_manFocus;
        it.m_selected = rowSel;
        return;
      }));
    this.m_view.onCell(fan.sys.ObjUtil.coerce(cell,fan.dom.Elem.$type),col,row,flags);
  }
  ;
  return;
}
fan.domkit.Table.prototype.doRebuild = function()
{
  var $this = this;
  this.onBeforeRebuild();
  this.m_view.refresh();
  this.m_view.sort(this.m_view.m_sortCol,this.m_view.m_sortDir);
  this.m_numCols = this.m_view.numCols();
  this.m_numRows = this.m_view.numRows();
  this.m_sel.refresh();
  this.m_headers.clear();
  this.m_cells.clear();
  var tbodysz = this.size();
  this.m_theadh = (function($this) { if ($this.m_showHeader) return $this.m_view.headerHeight(); return 0; })(this);
  this.m_tbodyw = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(tbodysz.m_w,fan.sys.Num.$type));
  this.m_tbodyh = fan.sys.Int.minus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(tbodysz.m_h,fan.sys.Num.$type)),this.m_theadh);
  var cx = 0;
  this.m_colx.clear();
  this.m_colw.clear();
  fan.sys.Int.times(this.m_numCols,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u97,
    function(c)
    {
      var cw = (function($this) { var $_u104 = $this.m_ucolw.get(fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())); if ($_u104 != null) return $_u104; return fan.sys.ObjUtil.coerce($this.m_view.colWidth(c),fan.sys.Int.$type.toNullable()); })($this);
      $this.m_colx.add(fan.sys.ObjUtil.coerce(cx,fan.sys.Obj.$type.toNullable()));
      $this.m_colw.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(cw,fan.sys.Int.$type),fan.sys.Obj.$type.toNullable()));
      cx = fan.sys.Int.plus(cx,fan.sys.ObjUtil.coerce(cw,fan.sys.Int.$type));
      return;
    }));
  this.m_rowh = this.m_view.rowHeight();
  this.m_numVisCols = fan.sys.Int.plus(this.findMaxVisCols(),2);
  this.m_numVisRows = fan.sys.Int.plus(fan.sys.Int.div(this.m_tbodyh,this.m_rowh),2);
  this.m_scrollx = 0;
  this.m_scrolly = 0;
  this.m_maxScrollx = fan.sys.ObjUtil.coerce(this.m_colw.reduce(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u105,
    function(r,w)
    {
      return fan.sys.Int.plus(r,w);
    }),fan.sys.Type.find("|sys::Obj?,sys::Int,sys::Int->sys::Obj?|"))),fan.sys.Int.$type);
  this.m_maxScrolly = fan.sys.Int.mult(this.m_numRows,this.m_rowh);
  this.m_firstVisCol = 0;
  this.m_firstVisRow = 0;
  this.m_hasScrollx = fan.sys.ObjUtil.compareGT(this.m_maxScrollx,this.m_tbodyw);
  this.m_hasScrolly = fan.sys.ObjUtil.compareGT(this.m_maxScrolly,this.m_tbodyh);
  this.m_hbar = this.makeScrollBar(fan.domkit.Dir.m_right);
  this.m_vbar = this.makeScrollBar(fan.domkit.Dir.m_down);
  if (fan.sys.ObjUtil.compareLE(this.m_maxScrollx,this.m_tbodyw))
  {
    if (fan.sys.ObjUtil.equals(this.m_numCols,0))
    {
      this.m_numVisCols = 0;
    }
    else
    {
      this.m_numVisCols = this.m_numCols;
      this.m_colw.set(-1,fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.m_tbodyw,fan.sys.ObjUtil.coerce(this.m_colx.last(),fan.sys.Int.$type)),fan.sys.Obj.$type.toNullable()));
    }
    ;
  }
  else
  {
    if (this.m_hasScrolly)
    {
      (function($this) { var $_u108 = $this.m_colw; var $_u109 = -1; var $_u106 = fan.sys.Int.plus($this.m_colw.get(-1),$this.m_overScroll); $_u108.set($_u109,$_u106); return $_u106; })(this);
    }
    ;
  }
  ;
  this.m_thead = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.style().addClass("domkit-Table-thead");
      it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_theadh,fan.sys.Obj.$type.toNullable())),"px")]));
      if (fan.sys.ObjUtil.equals($this.m_theadh,0))
      {
        it.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      }
      ;
      return;
    })),fan.dom.Elem.$type);
  fan.sys.Int.times(this.m_numVisCols,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u97,
    function(c)
    {
      var header = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
        fan.domkit.$clos$_u8,
        function(it)
        {
          it.style().addClass("domkit-Table-header");
          it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.colwSafe(c),fan.sys.Obj.$type.toNullable())),"px")]));
          it.style().trap("lineHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.plus($this.m_theadh,1),fan.sys.Obj.$type.toNullable())),"px")]));
          if (fan.sys.ObjUtil.equals(c,fan.sys.Int.minus($this.m_numCols,1)))
          {
            it.style().addClass("last");
          }
          ;
          return;
        })),fan.dom.Elem.$type);
      $this.m_headers.set(fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable()),header);
      $this.refreshHeader(header,c);
      $this.m_thead.add(header);
      return;
    }));
  if (this.m_cbHeaderPopup == null)
  {
    this.m_hpbut = null;
    this.m_hasHpbut = false;
  }
  else
  {
    this.m_hpbut = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u8,
      function(it)
      {
        var mtop = fan.sys.Int.plus(fan.sys.Int.div(fan.sys.Int.minus($this.m_theadh,21),2),3);
        it.style().addClass("domkit-Table-header-popup");
        it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_theadh,fan.sys.Obj.$type.toNullable())),"px")]));
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
          fan.domkit.$clos$_u8,
          function(it)
          {
            it.style().trap("marginTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(mtop,fan.sys.Obj.$type.toNullable())),"px")]));
            return;
          })),fan.dom.Elem.$type));
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
          fan.domkit.$clos$_u8,
          function(it)
          {
            return;
          })),fan.dom.Elem.$type));
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
          fan.domkit.$clos$_u8,
          function(it)
          {
            return;
          })),fan.dom.Elem.$type));
        return;
      })),fan.dom.Elem.$type);
    this.m_hasHpbut = true;
    this.m_thead.add(fan.sys.ObjUtil.coerce(this.m_hpbut,fan.dom.Elem.$type));
  }
  ;
  this.m_tbody = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.style().addClass("domkit-Table-tbody");
      it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_theadh,fan.sys.Obj.$type.toNullable())),"px")]));
      return;
    })),fan.dom.Elem.$type);
  fan.sys.Int.times(this.m_numVisRows,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u96,
    function(r)
    {
      fan.sys.Int.times($this.m_numVisCols,fan.sys.Func.make$closure(
        fan.domkit.$clos$_u97,
        function(c)
        {
          var rowSel = false;
          var cell = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
            fan.domkit.$clos$_u8,
            function(it)
            {
              it.style().addClass("domkit-Table-cell");
              if (fan.sys.ObjUtil.compareGT($this.m_stripeClasses.size(),0))
              {
                it.style().addClass($this.m_stripeClasses.get(fan.sys.Int.mod(r,$this.m_stripeClasses.size())));
              }
              ;
              if (fan.sys.ObjUtil.equals(c,fan.sys.Int.minus($this.m_numCols,1)))
              {
                it.style().addClass("last");
              }
              ;
              if ((fan.sys.ObjUtil.compareLT(c,$this.m_numCols) && fan.sys.ObjUtil.compareLT(r,$this.m_numRows)))
              {
                if (fan.sys.ObjUtil.compareGE($this.m_sel.indexes().binarySearch(fan.sys.ObjUtil.coerce($this.m_view.rowViewToModel(r),fan.sys.Obj.$type.toNullable())),0))
                {
                  it.style().addClass("domkit-sel");
                  rowSel = true;
                }
                ;
              }
              ;
              it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.colwSafe(c),fan.sys.Obj.$type.toNullable())),"px")]));
              it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_rowh,fan.sys.Obj.$type.toNullable())),"px")]));
              it.style().trap("lineHeight",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.plus($this.m_rowh,1),fan.sys.Obj.$type.toNullable())),"px")]));
              return;
            })),fan.dom.Elem.$type);
          var flags = fan.domkit.TableFlags.make(fan.sys.Func.make$closure(
            fan.domkit.$clos$_u102,
            function(it)
            {
              it.m_focused = $this.m_manFocus;
              it.m_selected = rowSel;
              return;
            }));
          $this.m_cells.set(fan.domkit.TablePos.make(c,r),cell);
          if ((fan.sys.ObjUtil.compareLT(c,$this.m_numCols) && fan.sys.ObjUtil.compareLT(r,$this.m_numRows)))
          {
            $this.m_view.onCell(cell,c,r,flags);
          }
          ;
          $this.m_tbody.add(cell);
          return;
        }));
      return;
    }));
  this.removeAll();
  this.add(fan.sys.ObjUtil.coerce(this.m_thead,fan.dom.Elem.$type));
  this.add(fan.sys.ObjUtil.coerce(this.m_tbody,fan.dom.Elem.$type));
  this.add(fan.sys.ObjUtil.coerce(this.m_hbar,fan.dom.Elem.$type));
  this.add(fan.sys.ObjUtil.coerce(this.m_vbar,fan.dom.Elem.$type));
  this.onUpdate(0,0);
  return;
}
fan.domkit.Table.prototype.makeScrollBar = function(dir)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      var xsz = fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.minus($this.m_sbarsz,$this.m_thumbMargin),$this.m_thumbMargin),1);
      it.style().addClass("domkit-Table-scrollbar");
      if (fan.sys.ObjUtil.equals(dir,fan.domkit.Dir.m_right))
      {
        if (!$this.m_hasScrollx)
        {
          it.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
        }
        ;
        $this.m_htrackw = fan.sys.Int.minus(fan.sys.Int.minus($this.m_tbodyw,(function($this) { if ($this.m_hasScrolly) return $this.m_sbarsz; return 0; })($this)),2);
        $this.m_hthumbw = fan.sys.Int.max(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_tbodyw,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_maxScrollx,fan.sys.Num.$type))),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_htrackw,fan.sys.Num.$type))),fan.sys.Num.$type)),xsz);
        it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
        it.style().trap("bottom",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
        it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_htrackw,fan.sys.Obj.$type.toNullable())),"px")]));
        it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_sbarsz,fan.sys.Obj.$type.toNullable())),"px")]));
        it.style().trap("borderTopWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px"]));
        it.onEvent("dblclick",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            e.stop();
            return;
          }));
        it.onEvent("mouseup",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            $this.m_hbarPageId = $this.stopScrollPage($this.m_hbarPageId);
            return;
          }));
        it.onEvent("mouseout",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            $this.m_hbarPageId = $this.stopScrollPage($this.m_hbarPageId);
            return;
          }));
        it.onEvent("mousedown",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            e.stop();
            var p = e.target().relPos(e.pagePos());
            var thumb = e.target().firstChild();
            if (fan.sys.ObjUtil.compareLT(p.m_x,thumb.pos().m_x))
            {
              $this.m_hbarPageId = $this.startScrollPage(fan.graphics.Point.makeInt(fan.sys.Int.negate($this.m_tbodyw),0));
            }
            else
            {
              if (fan.sys.ObjUtil.compareGT(p.m_x,fan.sys.Float.plusInt(thumb.pos().m_x,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(thumb.size().m_w,fan.sys.Num.$type)))))
              {
                $this.m_hbarPageId = $this.startScrollPage(fan.graphics.Point.makeInt($this.m_tbodyw,0));
              }
              ;
            }
            ;
            return;
          }));
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
          fan.domkit.$clos$_u8,
          function(it)
          {
            it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_thumbMargin,fan.sys.Obj.$type.toNullable())),"px")]));
            it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
            it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
            it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_hthumbw,fan.sys.Obj.$type.toNullable())),"px")]));
            it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(xsz,fan.sys.Obj.$type.toNullable())),"px")]));
            it.onEvent("dblclick",false,fan.sys.Func.make$closure(
              fan.domkit.$clos$_u0,
              function(e)
              {
                e.stop();
                return;
              }));
            it.onEvent("mousedown",false,fan.sys.Func.make$closure(
              fan.domkit.$clos$_u0,
              function(e)
              {
                e.stop();
                $this.m_hthumbDragOff = fan.sys.ObjUtil.coerce(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce($this.m_hbar.firstChild().relPos(e.pagePos()).m_x,fan.sys.Num.$type)),fan.sys.Int.$type.toNullable());
                var doc = fan.dom.Win.cur().doc();
                var fmove = null;
                var fup = null;
                fmove = doc.onEvent("mousemove",true,fan.sys.Func.make$closure(
                  fan.domkit.$clos$_u21,
                  function(de)
                  {
                    var dx = fan.sys.Float.minusInt($this.m_hbar.relPos(de.pagePos()).m_x,fan.sys.ObjUtil.coerce($this.m_hthumbDragOff,fan.sys.Int.$type));
                    var sx = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.multInt(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(dx,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_htrackw,fan.sys.Num.$type))),$this.m_maxScrollx),fan.sys.Num.$type));
                    $this.onScroll(fan.graphics.Point.makeInt(fan.sys.Int.minus(sx,$this.m_scrollx),0));
                    return;
                  }));
                fup = doc.onEvent("mouseup",true,fan.sys.Func.make$closure(
                  fan.domkit.$clos$_u21,
                  function(de)
                  {
                    de.stop();
                    $this.m_hthumbDragOff = null;
                    doc.removeEvent("mousemove",true,fan.sys.ObjUtil.coerce(fmove,fan.sys.Type.find("sys::Func")));
                    doc.removeEvent("mouseup",true,fan.sys.ObjUtil.coerce(fup,fan.sys.Type.find("sys::Func")));
                    return;
                  }));
                return;
              }));
            return;
          })),fan.dom.Elem.$type));
      }
      else
      {
        if (!$this.m_hasScrolly)
        {
          it.style().trap("visibility",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["hidden"]));
        }
        ;
        $this.m_vtrackh = fan.sys.Int.minus(fan.sys.Int.minus($this.m_tbodyh,(function($this) { if ($this.m_hasScrollx) return $this.m_sbarsz; return 0; })($this)),2);
        $this.m_vthumbh = fan.sys.Int.max(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_tbodyh,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_maxScrolly,fan.sys.Num.$type))),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_vtrackh,fan.sys.Num.$type))),fan.sys.Num.$type)),xsz);
        it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_theadh,fan.sys.Obj.$type.toNullable())),"px")]));
        it.style().trap("right",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
        it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_sbarsz,fan.sys.Obj.$type.toNullable())),"px")]));
        it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_vtrackh,fan.sys.Obj.$type.toNullable())),"px")]));
        it.style().trap("borderLeftWidth",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1px"]));
        it.onEvent("dblclick",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            e.stop();
            return;
          }));
        it.onEvent("mouseup",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            $this.m_vbarPageId = $this.stopScrollPage($this.m_vbarPageId);
            return;
          }));
        it.onEvent("mouseout",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            $this.m_vbarPageId = $this.stopScrollPage($this.m_vbarPageId);
            return;
          }));
        it.onEvent("mousedown",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            e.stop();
            var p = e.target().relPos(e.pagePos());
            var thumb = e.target().firstChild();
            if (fan.sys.ObjUtil.compareLT(p.m_y,thumb.pos().m_y))
            {
              $this.m_vbarPageId = $this.startScrollPage(fan.graphics.Point.makeInt(0,fan.sys.Int.negate($this.m_tbodyh)));
            }
            else
            {
              if (fan.sys.ObjUtil.compareGT(p.m_y,fan.sys.Float.plusInt(thumb.pos().m_y,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(thumb.size().m_h,fan.sys.Num.$type)))))
              {
                $this.m_vbarPageId = $this.startScrollPage(fan.graphics.Point.makeInt(0,$this.m_tbodyh));
              }
              ;
            }
            ;
            return;
          }));
        it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
          fan.domkit.$clos$_u8,
          function(it)
          {
            it.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_thumbMargin,fan.sys.Obj.$type.toNullable())),"px")]));
            it.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
            it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0px"]));
            it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(xsz,fan.sys.Obj.$type.toNullable())),"px")]));
            it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.m_vthumbh,fan.sys.Obj.$type.toNullable())),"px")]));
            it.onEvent("dblclick",false,fan.sys.Func.make$closure(
              fan.domkit.$clos$_u0,
              function(e)
              {
                e.stop();
                return;
              }));
            it.onEvent("mousedown",false,fan.sys.Func.make$closure(
              fan.domkit.$clos$_u0,
              function(e)
              {
                e.stop();
                $this.m_vthumbDragOff = fan.sys.ObjUtil.coerce(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce($this.m_vbar.firstChild().relPos(e.pagePos()).m_y,fan.sys.Num.$type)),fan.sys.Int.$type.toNullable());
                var doc = fan.dom.Win.cur().doc();
                var fmove = null;
                var fup = null;
                fmove = doc.onEvent("mousemove",true,fan.sys.Func.make$closure(
                  fan.domkit.$clos$_u21,
                  function(de)
                  {
                    var dy = fan.sys.Float.minusInt($this.m_vbar.relPos(de.pagePos()).m_y,fan.sys.ObjUtil.coerce($this.m_vthumbDragOff,fan.sys.Int.$type));
                    var sy = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.multInt(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(dy,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce($this.m_vtrackh,fan.sys.Num.$type))),$this.m_maxScrolly),fan.sys.Num.$type));
                    $this.onScroll(fan.graphics.Point.makeInt(0,fan.sys.Int.minus(sy,$this.m_scrolly)));
                    return;
                  }));
                fup = doc.onEvent("mouseup",true,fan.sys.Func.make$closure(
                  fan.domkit.$clos$_u21,
                  function(de)
                  {
                    de.stop();
                    $this.m_vthumbDragOff = null;
                    doc.removeEvent("mousemove",true,fan.sys.ObjUtil.coerce(fmove,fan.sys.Type.find("sys::Func")));
                    doc.removeEvent("mouseup",true,fan.sys.ObjUtil.coerce(fup,fan.sys.Type.find("sys::Func")));
                    return;
                  }));
                return;
              }));
            return;
          })),fan.dom.Elem.$type));
      }
      ;
      return;
    })),fan.dom.Elem.$type);
}
fan.domkit.Table.prototype.startScrollPage = function(delta)
{
  var $this = this;
  this.onScroll(delta);
  return fan.sys.ObjUtil.coerce(fan.dom.Win.cur().setInterval(this.m_scrollPageFreq,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u112,
    function(it)
    {
      $this.onScroll(delta);
      return;
    })),fan.sys.Int.$type.toNullable());
}
fan.domkit.Table.prototype.stopScrollPage = function(fid)
{
  if (fid != null)
  {
    fan.dom.Win.cur().clearInterval(fan.sys.ObjUtil.coerce(fid,fan.sys.Int.$type));
  }
  ;
  return null;
}
fan.domkit.Table.prototype.pulseScrollBar = function(dir)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(dir,fan.domkit.Dir.m_right))
  {
    this.m_hbar.style().addClass("active");
    if (this.m_hbarPulseId != null)
    {
      fan.dom.Win.cur().clearTimeout(fan.sys.ObjUtil.coerce(this.m_hbarPulseId,fan.sys.Int.$type));
    }
    ;
    this.m_hbarPulseId = fan.sys.ObjUtil.coerce(fan.dom.Win.cur().setTimeout(this.m_scrollPulseDir,fan.sys.Func.make$closure(
      fan.domkit.$clos$_u112,
      function(it)
      {
        $this.m_hbar.style().removeClass("active");
        return;
      })),fan.sys.Int.$type.toNullable());
  }
  else
  {
    this.m_vbar.style().addClass("active");
    if (this.m_vbarPulseId != null)
    {
      fan.dom.Win.cur().clearTimeout(fan.sys.ObjUtil.coerce(this.m_vbarPulseId,fan.sys.Int.$type));
    }
    ;
    this.m_vbarPulseId = fan.sys.ObjUtil.coerce(fan.dom.Win.cur().setTimeout(this.m_scrollPulseDir,fan.sys.Func.make$closure(
      fan.domkit.$clos$_u112,
      function(it)
      {
        $this.m_vbar.style().removeClass("active");
        return;
      })),fan.sys.Int.$type.toNullable());
  }
  ;
  return;
}
fan.domkit.Table.prototype.onUpdate = function(col,row)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(this.m_numCols,0))
  {
    return;
  }
  ;
  if (this.m_hasScrollx)
  {
    var sw = fan.sys.Int.plus(fan.sys.Int.minus(this.m_maxScrollx,this.m_tbodyw),(function($this) { if ($this.m_hasScrolly) return $this.m_overScroll; return 0; })(this));
    var sp = fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.m_scrollx,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(sw,fan.sys.Num.$type)));
    var hw = fan.sys.Int.minus(fan.sys.Int.minus(this.m_htrackw,this.m_hthumbw),fan.sys.Int.mult(this.m_thumbMargin,2));
    var hx = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(sp,fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(hw,fan.sys.Num.$type))),fan.sys.Num.$type));
    var ox = fan.sys.Str.toInt(fan.sys.Str.getRange(fan.sys.ObjUtil.toStr(this.m_hbar.firstChild().style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))),fan.sys.Range.make(0,-3)));
    if (fan.sys.ObjUtil.compareNE(ox,hx))
    {
      this.pulseScrollBar(fan.domkit.Dir.m_right);
      this.m_hbar.firstChild().style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(hx,fan.sys.Obj.$type.toNullable())),"px")]));
    }
    ;
  }
  ;
  if (this.m_hasScrolly)
  {
    var sh = fan.sys.Int.plus(fan.sys.Int.minus(this.m_maxScrolly,this.m_tbodyh),(function($this) { if ($this.m_hasScrollx) return $this.m_overScroll; return 0; })(this));
    var sp = fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.m_scrolly,fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(sh,fan.sys.Num.$type)));
    var vh = fan.sys.Int.minus(fan.sys.Int.minus(this.m_vtrackh,this.m_vthumbh),fan.sys.Int.mult(this.m_thumbMargin,2));
    var vy = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(sp,fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(vh,fan.sys.Num.$type))),fan.sys.Num.$type));
    var oy = fan.sys.Str.toInt(fan.sys.Str.getRange(fan.sys.ObjUtil.toStr(this.m_vbar.firstChild().style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]))),fan.sys.Range.make(0,-3)));
    if (fan.sys.ObjUtil.compareNE(oy,vy))
    {
      this.pulseScrollBar(fan.domkit.Dir.m_down);
      this.m_vbar.firstChild().style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(vy,fan.sys.Obj.$type.toNullable())),"px")]));
    }
    ;
  }
  ;
  this.m_thead.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  this.m_tbody.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
  this.onMoveX(col);
  this.onMoveY(row);
  this.m_thead.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (fan.sys.ObjUtil.equals($this.m_theadh,0)) return "none"; return ""; })(this)]));
  this.m_tbody.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[""]));
  this.m_headers.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u116,
    function(h,c)
    {
      var tx = fan.sys.Int.minus($this.colxSafe(c),$this.m_scrollx);
      h.style().trap("transform",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("translate(",fan.sys.ObjUtil.coerce(tx,fan.sys.Obj.$type.toNullable())),"px, 0)")]));
      return;
    }));
  this.m_cells.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u117,
    function(c,p)
    {
      var tx = fan.sys.Int.minus($this.colxSafe(p.m_col),$this.m_scrollx);
      var ty = fan.sys.Int.minus(fan.sys.Int.mult(p.m_row,$this.m_rowh),$this.m_scrolly);
      c.style().trap("transform",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("translate(",fan.sys.ObjUtil.coerce(tx,fan.sys.Obj.$type.toNullable())),"px, "),fan.sys.ObjUtil.coerce(ty,fan.sys.Obj.$type.toNullable())),"px)")]));
      return;
    }));
  return;
}
fan.domkit.Table.prototype.onMoveX = function(col)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(this.m_firstVisCol,col))
  {
    return;
  }
  ;
  var oldFirstCol = this.m_firstVisCol;
  var delta = fan.sys.Int.minus(col,oldFirstCol);
  var shift = fan.sys.Int.max(fan.sys.Int.abs(delta),this.m_numVisCols);
  var count = fan.sys.Int.min(fan.sys.Int.abs(delta),this.m_numVisCols);
  fan.sys.Int.times(fan.sys.Int.abs(count),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u97,
    function(c)
    {
      var oldCol = (function($this) { if (fan.sys.ObjUtil.compareGT(delta,0)) return fan.sys.Int.plus(oldFirstCol,c); return fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.plus(oldFirstCol,$this.m_numVisCols),c),1); })($this);
      var newCol = (function($this) { if (fan.sys.ObjUtil.compareGT(delta,0)) return fan.sys.Int.plus(fan.sys.Int.plus(oldFirstCol,shift),c); return fan.sys.Int.plus(fan.sys.Int.plus(oldFirstCol,delta),c); })($this);
      var newColw = fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce($this.colwSafe(newCol),fan.sys.Obj.$type.toNullable())),"px");
      var header = $this.m_headers.remove(fan.sys.ObjUtil.coerce(oldCol,fan.sys.Obj.$type.toNullable()));
      header.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[newColw]));
      $this.m_headers.set(fan.sys.ObjUtil.coerce(newCol,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(header,fan.dom.Elem.$type));
      $this.refreshHeader(header,newCol);
      fan.sys.Int.times($this.m_numVisRows,fan.sys.Func.make$closure(
        fan.domkit.$clos$_u96,
        function(r)
        {
          var row = fan.sys.Int.plus(r,$this.m_firstVisRow);
          var op = fan.domkit.TablePos.make(oldCol,row);
          var cell = $this.m_cells.remove(op);
          cell.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[newColw]));
          $this.m_cells.set(fan.domkit.TablePos.make(newCol,row),fan.sys.ObjUtil.coerce(cell,fan.dom.Elem.$type));
          $this.refreshCell(cell,newCol,row);
          return;
        }));
      return;
    }));
  this.m_firstVisCol = col;
  return;
}
fan.domkit.Table.prototype.onMoveY = function(row)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(this.m_firstVisRow,row))
  {
    return;
  }
  ;
  var oldFirstRow = this.m_firstVisRow;
  var delta = fan.sys.Int.minus(row,oldFirstRow);
  var shift = fan.sys.Int.max(fan.sys.Int.abs(delta),this.m_numVisRows);
  var count = fan.sys.Int.min(fan.sys.Int.abs(delta),this.m_numVisRows);
  fan.sys.Int.times(fan.sys.Int.abs(count),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u96,
    function(r)
    {
      var oldRow = (function($this) { if (fan.sys.ObjUtil.compareGT(delta,0)) return fan.sys.Int.plus(oldFirstRow,r); return fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.plus(oldFirstRow,$this.m_numVisRows),r),1); })($this);
      var newRow = (function($this) { if (fan.sys.ObjUtil.compareGT(delta,0)) return fan.sys.Int.plus(fan.sys.Int.plus(oldFirstRow,shift),r); return fan.sys.Int.plus(fan.sys.Int.plus(oldFirstRow,delta),r); })($this);
      fan.sys.Int.times($this.m_numVisCols,fan.sys.Func.make$closure(
        fan.domkit.$clos$_u97,
        function(c)
        {
          var col = fan.sys.Int.plus(c,$this.m_firstVisCol);
          var op = fan.domkit.TablePos.make(col,oldRow);
          var cell = $this.m_cells.remove(op);
          $this.m_cells.set(fan.domkit.TablePos.make(col,newRow),fan.sys.ObjUtil.coerce(cell,fan.dom.Elem.$type));
          $this.refreshCell(cell,col,newRow);
          return;
        }));
      return;
    }));
  this.m_firstVisRow = row;
  return;
}
fan.domkit.Table.prototype.findMaxVisCols = function()
{
  var $this = this;
  var vis = 0;
  this.m_colw.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u122,
    function(w,i)
    {
      var dw = 0;
      var di = i;
      while ((fan.sys.ObjUtil.compareLT(dw,$this.m_tbodyw) && fan.sys.ObjUtil.compareLT(di,$this.m_colw.size())))
      {
        dw = fan.sys.Int.plus(dw,$this.m_colw.get((function($this) { var $_u123 = di; di = fan.sys.Int.increment(di); return $_u123; })($this)));
      }
      ;
      vis = fan.sys.Int.max(vis,fan.sys.Int.minus(di,i));
      return;
    }));
  return vis;
}
fan.domkit.Table.prototype.openHeaderPopup = function(button,popup)
{
  var x = button.pagePos().m_x;
  var y = fan.sys.Float.plusInt(button.pagePos().m_y,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(button.size().m_h,fan.sys.Num.$type)));
  var w = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(button.size().m_w,fan.sys.Num.$type));
  popup.open(x,y);
  return;
}
fan.domkit.Table.prototype.onScroll = function(delta)
{
  if (delta == null)
  {
    return;
  }
  ;
  var scrollBoundx = fan.sys.Int.minus(this.m_maxScrollx,this.m_tbodyw);
  var scrollBoundy = fan.sys.Int.minus(this.m_maxScrolly,this.m_tbodyh);
  if ((this.m_hasScrollx && this.m_hasScrolly))
  {
    scrollBoundx = fan.sys.Int.plus(scrollBoundx,this.m_overScroll);
    scrollBoundy = fan.sys.Int.plus(scrollBoundy,this.m_overScroll);
  }
  ;
  this.m_scrollx = fan.sys.Int.max(fan.sys.Int.min(fan.sys.Int.plus(this.m_scrollx,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(delta.m_x,fan.sys.Num.$type))),scrollBoundx),0);
  this.m_scrolly = fan.sys.Int.max(fan.sys.Int.min(fan.sys.Int.plus(this.m_scrolly,fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(delta.m_y,fan.sys.Num.$type))),scrollBoundy),0);
  var col = fan.sys.Int.max(fan.sys.Int.min(fan.sys.Int.max(fan.sys.Int.minus(fan.sys.Int.not(this.m_colx.binarySearch(fan.sys.ObjUtil.coerce(this.m_scrollx,fan.sys.Obj.$type.toNullable()))),1),0),fan.sys.Int.minus(this.m_numCols,this.m_numVisCols)),0);
  var row = fan.sys.Int.max(fan.sys.Int.min(fan.sys.Int.div(this.m_scrolly,this.m_rowh),fan.sys.Int.minus(this.m_numRows,this.m_numVisRows)),0);
  this.onUpdate(col,row);
  return;
}
fan.domkit.Table.prototype.onMouseEvent = function(e)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(this.m_numCols,0))
  {
    return;
  }
  ;
  var p = this.relPos(e.pagePos());
  var mx = fan.sys.Int.plus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(p.m_x,fan.sys.Num.$type)),this.m_scrollx);
  var my = fan.sys.Int.minus(fan.sys.Int.plus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(p.m_y,fan.sys.Num.$type)),this.m_scrolly),this.m_theadh);
  this.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
  if (fan.sys.ObjUtil.compareGT(mx,fan.sys.Int.plus(fan.sys.ObjUtil.coerce(this.m_colx.last(),fan.sys.Int.$type),fan.sys.ObjUtil.coerce(this.m_colw.last(),fan.sys.Int.$type))))
  {
    return;
  }
  ;
  var col = this.m_colx.binarySearch(fan.sys.ObjUtil.coerce(mx,fan.sys.Obj.$type.toNullable()));
  if (fan.sys.ObjUtil.compareLT(col,0))
  {
    col = fan.sys.Int.minus(fan.sys.Int.not(col),1);
  }
  ;
  var cx = fan.sys.Int.minus(mx,this.m_colx.get(col));
  var canResize = ((fan.sys.ObjUtil.compareGT(col,0) && fan.sys.ObjUtil.compareLT(cx,5)) || (fan.sys.ObjUtil.compareLT(col,fan.sys.Int.minus(this.m_numCols,1)) && fan.sys.ObjUtil.compareLT(fan.sys.Int.minus(this.m_colw.get(col),cx),5)));
  if (fan.sys.ObjUtil.compareLT(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(p.m_y,fan.sys.Num.$type)),this.m_theadh))
  {
    if (fan.sys.ObjUtil.equals(e.type(),"mousemove"))
    {
      if (canResize)
      {
        this.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["col-resize"]));
      }
      ;
    }
    else
    {
      if (fan.sys.ObjUtil.equals(e.type(),"mousedown"))
      {
        if (canResize)
        {
          this.m_resizeCol = fan.sys.ObjUtil.coerce((function($this) { if (fan.sys.ObjUtil.compareLT(cx,5)) return fan.sys.Int.minus(col,1); return col; })(this),fan.sys.Int.$type.toNullable());
          this.style().trap("cursor",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["col-resize"]));
          this.add(fan.sys.ObjUtil.coerce((function($this) { var $_u125 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
            fan.domkit.$clos$_u8,
            function(it)
            {
              it.style().addClass("domkit-resize-splitter");
              return;
            })),fan.dom.Elem.$type),fan.sys.Func.make$closure(
            fan.domkit.$clos$_u8,
            function(it)
            {
              it.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minusInt(p.m_x,2),fan.sys.Obj.$type.toNullable())),"px")]));
              it.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["5px"]));
              it.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
              return;
            })),fan.dom.Elem.$type); $this.m_resizeElem = $_u125; return $_u125; })(this),fan.dom.Elem.$type));
          var doc = fan.dom.Win.cur().doc();
          var fmove = null;
          var fup = null;
          fmove = doc.onEvent("mousemove",true,fan.sys.Func.make$closure(
            fan.domkit.$clos$_u21,
            function(de)
            {
              de.stop();
              var dex = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce($this.relPos(de.pagePos()).m_x,fan.sys.Num.$type));
              $this.m_resizeElem.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Int.minus(dex,2),fan.sys.Obj.$type.toNullable())),"px")]));
              return;
            }));
          fup = doc.onEvent("mouseup",true,fan.sys.Func.make$closure(
            fan.domkit.$clos$_u21,
            function(de)
            {
              var demx = fan.sys.Int.plus(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce($this.relPos(de.pagePos()).m_x,fan.sys.Num.$type)),$this.m_scrollx);
              $this.m_ucolw.set(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce($this.m_resizeCol,fan.sys.Int.$type),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.sys.Int.max(20,fan.sys.Int.minus(demx,$this.m_colx.get(fan.sys.ObjUtil.coerce($this.m_resizeCol,fan.sys.Int.$type)))),fan.sys.Obj.$type.toNullable()));
              var oldscroll = fan.graphics.Point.makeInt($this.m_scrollx,$this.m_scrolly);
              $this.remove(fan.sys.ObjUtil.coerce($this.m_resizeElem,fan.dom.Elem.$type));
              $this.m_resizeElem = null;
              $this.doRebuild();
              $this.onScroll(oldscroll);
              de.stop();
              doc.removeEvent("mousemove",true,fan.sys.ObjUtil.coerce(fmove,fan.sys.Type.find("sys::Func")));
              doc.removeEvent("mouseup",true,fan.sys.ObjUtil.coerce(fup,fan.sys.Type.find("sys::Func")));
              return;
            }));
        }
        else
        {
          if ((this.m_hasHpbut && fan.sys.ObjUtil.compareGT(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(p.m_x,fan.sys.Num.$type)),fan.sys.Int.minus(this.m_tbodyw,this.m_hpbutw))))
          {
            var hp = fan.sys.ObjUtil.coerce(this.m_cbHeaderPopup.call(this),fan.domkit.Popup.$type);
            this.openHeaderPopup(fan.sys.ObjUtil.coerce(this.m_hpbut,fan.dom.Elem.$type),hp);
          }
          else
          {
            col = this.m_view.colViewToModel(col);
            this.sort(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type.toNullable()),(function($this) { if (fan.sys.ObjUtil.equals($this.sortCol(),col)) return (function($this) { if (fan.sys.ObjUtil.equals($this.sortDir(),fan.domkit.Dir.m_up)) return fan.domkit.Dir.m_down; return fan.domkit.Dir.m_up; })($this); return fan.domkit.Dir.m_up; })(this));
          }
          ;
        }
        ;
      }
      ;
    }
    ;
  }
  else
  {
    var row = fan.sys.Int.div(my,this.m_rowh);
    if (fan.sys.ObjUtil.compareGE(row,this.m_numRows))
    {
      if (fan.sys.ObjUtil.equals(e.type(),"mousedown"))
      {
        this.updateSel(fan.sys.List.make(fan.sys.Int.$type));
      }
      ;
      return;
    }
    ;
    var cy = fan.sys.Int.minus(my,fan.sys.Int.mult(row,this.m_rowh));
    var vcol = col;
    var vrow = row;
    col = this.m_view.colViewToModel(col);
    row = this.m_view.rowViewToModel(row);
    if (fan.sys.ObjUtil.equals(e.type(),"mousedown"))
    {
      this.onMouseEventSelect(e,row,vrow);
    }
    ;
    if (fan.sys.ObjUtil.equals(e.type(),"dblclick"))
    {
      (function($this) { var $_u128 = $this.m_cbAction; if ($_u128 == null) return null; return $_u128.call($this); })(this);
    }
    ;
    var cb = this.m_cbTableEvent.get(e.type());
    if (cb != null)
    {
      cb.call(fan.domkit.TableEvent.make(this,fan.sys.Func.make$closure(
        fan.domkit.$clos$_u129,
        function(it)
        {
          it.m_type = e.type();
          it.m_col = col;
          it.m_row = row;
          it.m_pagePos = e.pagePos();
          it.m_cellPos = fan.graphics.Point.makeInt(cx,cy);
          it.m_size = fan.graphics.Size.makeInt($this.m_colw.get(vcol),$this.m_rowh);
          it.m__event = e;
          return;
        })));
    }
    ;
  }
  ;
  return;
}
fan.domkit.Table.prototype.onMouseEventSelect = function(e,row,vrow)
{
  var $this = this;
  this.m_manFocus = true;
  if (fan.sys.ObjUtil.equals(e.target().tagName(),"a"))
  {
    e.target().trap("click",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[]));
    e.stop();
    return;
  }
  ;
  var cur = this.m_sel.indexes();
  var newsel = cur.dup();
  if ((e.shift() && this.m_pivot != null))
  {
    if (fan.sys.ObjUtil.compareLT(vrow,this.m_pivot))
    {
      fan.sys.Range.make(vrow,fan.sys.ObjUtil.coerce(this.m_pivot,fan.sys.Int.$type)).each(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u130,
        function(i)
        {
          newsel.add(fan.sys.ObjUtil.coerce($this.m_view.rowViewToModel(i),fan.sys.Obj.$type.toNullable()));
          return;
        }));
      newsel = newsel.unique().sort();
    }
    else
    {
      if (fan.sys.ObjUtil.compareGT(vrow,this.m_pivot))
      {
        fan.sys.Range.make(fan.sys.ObjUtil.coerce(this.m_pivot,fan.sys.Int.$type),vrow).each(fan.sys.Func.make$closure(
          fan.domkit.$clos$_u130,
          function(i)
          {
            newsel.add(fan.sys.ObjUtil.coerce($this.m_view.rowViewToModel(i),fan.sys.Obj.$type.toNullable()));
            return;
          }));
        newsel = newsel.unique().sort();
      }
      ;
    }
    ;
  }
  else
  {
    if ((e.meta() || e.ctrl()))
    {
      if (cur.contains(fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type.toNullable())))
      {
        newsel.remove(fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type.toNullable()));
      }
      else
      {
        newsel.add(fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type.toNullable())).sort();
      }
      ;
      this.m_pivot = fan.sys.ObjUtil.coerce(this.m_view.rowModelToView(row),fan.sys.Int.$type.toNullable());
    }
    else
    {
      newsel = fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type.toNullable())]);
      this.m_pivot = fan.sys.ObjUtil.coerce(this.m_view.rowModelToView(row),fan.sys.Int.$type.toNullable());
    }
    ;
  }
  ;
  this.updateSel(newsel);
  return;
}
fan.domkit.Table.prototype.onKeyEvent = function(e)
{
  if (fan.sys.ObjUtil.compareNE(e.type(),"keydown"))
  {
    return;
  }
  ;
  if ((fan.sys.ObjUtil.equals(this.m_numCols,0) || fan.sys.ObjUtil.equals(this.m_numRows,0)))
  {
    return;
  }
  ;
  var selTop = this.m_view.rowViewToModel(0);
  var selBottom = this.m_view.rowViewToModel(fan.sys.Int.minus(this.m_numRows,1));
  var selFirstVis = this.m_view.rowViewToModel(this.m_firstVisRow);
  var pivot = this.m_view.rowModelToView(fan.sys.ObjUtil.coerce((function($this) { var $_u131 = $this.m_sel.indexes().first(); if ($_u131 != null) return $_u131; return fan.sys.ObjUtil.coerce(selTop,fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type));
  if (e.meta())
  {
    if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_up))
    {
      e.stop();
      this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(selTop,fan.sys.Obj.$type.toNullable())]));
      this.scrollTo(null,fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
      return;
    }
    ;
    if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_down))
    {
      e.stop();
      this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(selBottom,fan.sys.Obj.$type.toNullable())]));
      this.scrollTo(null,fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.m_numRows,1),fan.sys.Int.$type.toNullable()));
      return;
    }
    ;
    if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_left))
    {
      e.stop();
      this.scrollTo(fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),null);
      return;
    }
    ;
    if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_right))
    {
      e.stop();
      this.scrollTo(fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.m_numCols,1),fan.sys.Int.$type.toNullable()),null);
      return;
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_pageUp))
  {
    e.stop();
    var prev = fan.sys.Int.max(fan.sys.Int.minus(pivot,fan.sys.Int.minus(this.m_numVisRows,3)),0);
    this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_view.rowViewToModel(prev),fan.sys.Obj.$type.toNullable())]));
    this.scrollTo(null,fan.sys.ObjUtil.coerce(prev,fan.sys.Int.$type.toNullable()));
    return;
  }
  ;
  if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_pageDown))
  {
    e.stop();
    var next = fan.sys.Int.min(fan.sys.Int.max(fan.sys.Int.plus(pivot,fan.sys.Int.minus(this.m_numVisRows,3)),0),fan.sys.Int.minus(this.m_numRows,1));
    this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_view.rowViewToModel(next),fan.sys.Obj.$type.toNullable())]));
    this.scrollTo(null,fan.sys.ObjUtil.coerce(next,fan.sys.Int.$type.toNullable()));
    return;
  }
  ;
  var $_u132 = e.key();
  if (fan.sys.ObjUtil.equals($_u132,fan.dom.Key.m_left))
  {
    var cur = this.m_colx.binarySearch(fan.sys.ObjUtil.coerce(this.m_scrollx,fan.sys.Obj.$type.toNullable()));
    if (fan.sys.ObjUtil.compareLT(cur,0))
    {
      cur = fan.sys.Int.minus(fan.sys.Int.not(cur),1);
    }
    ;
    var pre = (function($this) { if (fan.sys.ObjUtil.equals($this.m_colx.get(cur),$this.m_scrollx)) return fan.sys.Int.minus(cur,1); return cur; })(this);
    this.scrollTo(fan.sys.ObjUtil.coerce(fan.sys.Int.max(0,pre),fan.sys.Int.$type.toNullable()),null);
    return;
  }
  else if (fan.sys.ObjUtil.equals($_u132,fan.dom.Key.m_right))
  {
    var cur = this.m_colx.binarySearch(fan.sys.ObjUtil.coerce(this.m_scrollx,fan.sys.Obj.$type.toNullable()));
    if (fan.sys.ObjUtil.compareLT(cur,0))
    {
      cur = fan.sys.Int.minus(fan.sys.Int.not(cur),1);
    }
    ;
    this.scrollTo(fan.sys.ObjUtil.coerce(fan.sys.Int.min(fan.sys.Int.minus(this.m_numCols,1),fan.sys.Int.plus(cur,1)),fan.sys.Int.$type.toNullable()),null);
    return;
  }
  else if (fan.sys.ObjUtil.equals($_u132,fan.dom.Key.m_up))
  {
    if (this.m_sel.indexes().isEmpty())
    {
      this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(selFirstVis,fan.sys.Obj.$type.toNullable())]));
      this.scrollTo(null,fan.sys.ObjUtil.coerce(this.m_firstVisRow,fan.sys.Int.$type.toNullable()));
      return;
    }
    else
    {
      if (fan.sys.ObjUtil.equals(pivot,0))
      {
        return this.scrollTo(null,fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
      }
      ;
      var prev = fan.sys.Int.minus(pivot,1);
      this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_view.rowViewToModel(prev),fan.sys.Obj.$type.toNullable())]));
      this.scrollTo(null,fan.sys.ObjUtil.coerce(prev,fan.sys.Int.$type.toNullable()));
      return;
    }
    ;
  }
  else if (fan.sys.ObjUtil.equals($_u132,fan.dom.Key.m_down))
  {
    if (this.m_sel.indexes().isEmpty())
    {
      this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(selFirstVis,fan.sys.Obj.$type.toNullable())]));
      this.scrollTo(null,fan.sys.ObjUtil.coerce(this.m_firstVisRow,fan.sys.Int.$type.toNullable()));
      return;
    }
    else
    {
      if (fan.sys.ObjUtil.equals(pivot,fan.sys.Int.minus(this.m_numRows,1)))
      {
        return this.scrollTo(null,fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.m_numRows,1),fan.sys.Int.$type.toNullable()));
      }
      ;
      var next = fan.sys.Int.plus(pivot,1);
      this.updateSel(fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_view.rowViewToModel(next),fan.sys.Obj.$type.toNullable())]));
      this.scrollTo(null,fan.sys.ObjUtil.coerce(next,fan.sys.Int.$type.toNullable()));
      return;
    }
    ;
  }
  ;
  if ((fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_space) || fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_enter)))
  {
    (function($this) { var $_u134 = $this.m_cbAction; if ($_u134 == null) return null; return $_u134.call($this); })(this);
    return;
  }
  ;
  if (fan.sys.ObjUtil.equals(e.type(),"keydown"))
  {
    return (function($this) { var $_u135 = $this.m_cbKeyDown; if ($_u135 == null) return null; return $_u135.call(e); })(this);
  }
  ;
  return;
}
fan.domkit.Table.prototype.updateSel = function(newsel)
{
  if (!this.m_sel.m_enabled)
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.equals(this.m_sel.indexes(),newsel))
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.equals((function($this) { var $_u136 = $this.m_cbBeforeSelect; if ($_u136 == null) return null; return $_u136.call(newsel); })(this),false))
  {
    return;
  }
  ;
  this.m_sel.indexes$(newsel);
  (function($this) { var $_u137 = $this.m_cbSelect; if ($_u137 == null) return null; return $_u137.call($this); })(this);
  return;
}
fan.domkit.Table.prototype.colxSafe = function(c)
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u138 = $this.m_colx.getSafe(c); if ($_u138 != null) return $_u138; return fan.sys.ObjUtil.coerce(fan.sys.Int.plus(fan.sys.Int.plus(fan.sys.ObjUtil.coerce($this.m_colx.last(),fan.sys.Int.$type),fan.sys.ObjUtil.coerce($this.m_colw.last(),fan.sys.Int.$type)),fan.sys.Int.mult(fan.sys.Int.plus(fan.sys.Int.minus(c,$this.m_colx.size()),1),100)),fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type);
}
fan.domkit.Table.prototype.colwSafe = function(c)
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u139 = $this.m_colw.getSafe(c); if ($_u139 != null) return $_u139; return fan.sys.ObjUtil.coerce(100,fan.sys.Int.$type.toNullable()); })(this),fan.sys.Int.$type);
}
fan.domkit.Table.prototype.ts = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Duration.now().minus(fan.sys.Duration.boot()).toMillis(),fan.sys.Obj.$type.toNullable())),"ms");
}
fan.domkit.Table.prototype.cbBeforeSelect = function()
{
  return this.m_cbBeforeSelect;
}
fan.domkit.Table.prototype.cbBeforeSelect$ = function(it)
{
  this.m_cbBeforeSelect = it;
  return;
}
fan.domkit.Table.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.domkit.Table.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.domkit.Table.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.domkit.Table.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.domkit.Table.prototype.cbSort = function()
{
  return this.m_cbSort;
}
fan.domkit.Table.prototype.cbSort$ = function(it)
{
  this.m_cbSort = it;
  return;
}
fan.domkit.Table.prototype.cbKeyDown = function()
{
  return this.m_cbKeyDown;
}
fan.domkit.Table.prototype.cbKeyDown$ = function(it)
{
  this.m_cbKeyDown = it;
  return;
}
fan.domkit.Table.prototype.cbTableEvent = function()
{
  return this.m_cbTableEvent;
}
fan.domkit.Table.prototype.cbTableEvent$ = function(it)
{
  this.m_cbTableEvent = it;
  return;
}
fan.domkit.Table.prototype.cbHeaderPopup = function()
{
  return this.m_cbHeaderPopup;
}
fan.domkit.Table.prototype.cbHeaderPopup$ = function(it)
{
  this.m_cbHeaderPopup = it;
  return;
}
fan.domkit.Table.prototype.thead = function()
{
  return this.m_thead;
}
fan.domkit.Table.prototype.thead$ = function(it)
{
  this.m_thead = it;
  return;
}
fan.domkit.Table.prototype.tbody = function()
{
  return this.m_tbody;
}
fan.domkit.Table.prototype.tbody$ = function(it)
{
  this.m_tbody = it;
  return;
}
fan.domkit.Table.prototype.hbar = function()
{
  return this.m_hbar;
}
fan.domkit.Table.prototype.hbar$ = function(it)
{
  this.m_hbar = it;
  return;
}
fan.domkit.Table.prototype.vbar = function()
{
  return this.m_vbar;
}
fan.domkit.Table.prototype.vbar$ = function(it)
{
  this.m_vbar = it;
  return;
}
fan.domkit.Table.prototype.headers = function()
{
  return this.m_headers;
}
fan.domkit.Table.prototype.headers$ = function(it)
{
  this.m_headers = it;
  return;
}
fan.domkit.Table.prototype.cells = function()
{
  return this.m_cells;
}
fan.domkit.Table.prototype.cells$ = function(it)
{
  this.m_cells = it;
  return;
}
fan.domkit.Table.prototype.theadh = function()
{
  return this.m_theadh;
}
fan.domkit.Table.prototype.theadh$ = function(it)
{
  this.m_theadh = it;
  return;
}
fan.domkit.Table.prototype.tbodyw = function()
{
  return this.m_tbodyw;
}
fan.domkit.Table.prototype.tbodyw$ = function(it)
{
  this.m_tbodyw = it;
  return;
}
fan.domkit.Table.prototype.tbodyh = function()
{
  return this.m_tbodyh;
}
fan.domkit.Table.prototype.tbodyh$ = function(it)
{
  this.m_tbodyh = it;
  return;
}
fan.domkit.Table.prototype.numCols = function()
{
  return this.m_numCols;
}
fan.domkit.Table.prototype.numCols$ = function(it)
{
  this.m_numCols = it;
  return;
}
fan.domkit.Table.prototype.numRows = function()
{
  return this.m_numRows;
}
fan.domkit.Table.prototype.numRows$ = function(it)
{
  this.m_numRows = it;
  return;
}
fan.domkit.Table.prototype.colx = function()
{
  return this.m_colx;
}
fan.domkit.Table.prototype.colx$ = function(it)
{
  this.m_colx = it;
  return;
}
fan.domkit.Table.prototype.colw = function()
{
  return this.m_colw;
}
fan.domkit.Table.prototype.colw$ = function(it)
{
  this.m_colw = it;
  return;
}
fan.domkit.Table.prototype.ucolw = function()
{
  return this.m_ucolw;
}
fan.domkit.Table.prototype.ucolw$ = function(it)
{
  this.m_ucolw = it;
  return;
}
fan.domkit.Table.prototype.rowh = function()
{
  return this.m_rowh;
}
fan.domkit.Table.prototype.rowh$ = function(it)
{
  this.m_rowh = it;
  return;
}
fan.domkit.Table.prototype.numVisCols = function()
{
  return this.m_numVisCols;
}
fan.domkit.Table.prototype.numVisCols$ = function(it)
{
  this.m_numVisCols = it;
  return;
}
fan.domkit.Table.prototype.numVisRows = function()
{
  return this.m_numVisRows;
}
fan.domkit.Table.prototype.numVisRows$ = function(it)
{
  this.m_numVisRows = it;
  return;
}
fan.domkit.Table.prototype.maxScrollx = function()
{
  return this.m_maxScrollx;
}
fan.domkit.Table.prototype.maxScrollx$ = function(it)
{
  this.m_maxScrollx = it;
  return;
}
fan.domkit.Table.prototype.maxScrolly = function()
{
  return this.m_maxScrolly;
}
fan.domkit.Table.prototype.maxScrolly$ = function(it)
{
  this.m_maxScrolly = it;
  return;
}
fan.domkit.Table.prototype.hasScrollx = function()
{
  return this.m_hasScrollx;
}
fan.domkit.Table.prototype.hasScrollx$ = function(it)
{
  this.m_hasScrollx = it;
  return;
}
fan.domkit.Table.prototype.hasScrolly = function()
{
  return this.m_hasScrolly;
}
fan.domkit.Table.prototype.hasScrolly$ = function(it)
{
  this.m_hasScrolly = it;
  return;
}
fan.domkit.Table.prototype.htrackw = function()
{
  return this.m_htrackw;
}
fan.domkit.Table.prototype.htrackw$ = function(it)
{
  this.m_htrackw = it;
  return;
}
fan.domkit.Table.prototype.hthumbw = function()
{
  return this.m_hthumbw;
}
fan.domkit.Table.prototype.hthumbw$ = function(it)
{
  this.m_hthumbw = it;
  return;
}
fan.domkit.Table.prototype.vtrackh = function()
{
  return this.m_vtrackh;
}
fan.domkit.Table.prototype.vtrackh$ = function(it)
{
  this.m_vtrackh = it;
  return;
}
fan.domkit.Table.prototype.vthumbh = function()
{
  return this.m_vthumbh;
}
fan.domkit.Table.prototype.vthumbh$ = function(it)
{
  this.m_vthumbh = it;
  return;
}
fan.domkit.Table.prototype.resizeCol = function()
{
  return this.m_resizeCol;
}
fan.domkit.Table.prototype.resizeCol$ = function(it)
{
  this.m_resizeCol = it;
  return;
}
fan.domkit.Table.prototype.resizeElem = function()
{
  return this.m_resizeElem;
}
fan.domkit.Table.prototype.resizeElem$ = function(it)
{
  this.m_resizeElem = it;
  return;
}
fan.domkit.Table.prototype.hpbut = function()
{
  return this.m_hpbut;
}
fan.domkit.Table.prototype.hpbut$ = function(it)
{
  this.m_hpbut = it;
  return;
}
fan.domkit.Table.prototype.hasHpbut = function()
{
  return this.m_hasHpbut;
}
fan.domkit.Table.prototype.hasHpbut$ = function(it)
{
  this.m_hasHpbut = it;
  return;
}
fan.domkit.Table.prototype.scrollx = function()
{
  return this.m_scrollx;
}
fan.domkit.Table.prototype.scrollx$ = function(it)
{
  this.m_scrollx = it;
  return;
}
fan.domkit.Table.prototype.scrolly = function()
{
  return this.m_scrolly;
}
fan.domkit.Table.prototype.scrolly$ = function(it)
{
  this.m_scrolly = it;
  return;
}
fan.domkit.Table.prototype.hbarPulseId = function()
{
  return this.m_hbarPulseId;
}
fan.domkit.Table.prototype.hbarPulseId$ = function(it)
{
  this.m_hbarPulseId = it;
  return;
}
fan.domkit.Table.prototype.vbarPulseId = function()
{
  return this.m_vbarPulseId;
}
fan.domkit.Table.prototype.vbarPulseId$ = function(it)
{
  this.m_vbarPulseId = it;
  return;
}
fan.domkit.Table.prototype.hbarPageId = function()
{
  return this.m_hbarPageId;
}
fan.domkit.Table.prototype.hbarPageId$ = function(it)
{
  this.m_hbarPageId = it;
  return;
}
fan.domkit.Table.prototype.vbarPageId = function()
{
  return this.m_vbarPageId;
}
fan.domkit.Table.prototype.vbarPageId$ = function(it)
{
  this.m_vbarPageId = it;
  return;
}
fan.domkit.Table.prototype.hthumbDragOff = function()
{
  return this.m_hthumbDragOff;
}
fan.domkit.Table.prototype.hthumbDragOff$ = function(it)
{
  this.m_hthumbDragOff = it;
  return;
}
fan.domkit.Table.prototype.vthumbDragOff = function()
{
  return this.m_vthumbDragOff;
}
fan.domkit.Table.prototype.vthumbDragOff$ = function(it)
{
  this.m_vthumbDragOff = it;
  return;
}
fan.domkit.Table.prototype.firstVisCol = function()
{
  return this.m_firstVisCol;
}
fan.domkit.Table.prototype.firstVisCol$ = function(it)
{
  this.m_firstVisCol = it;
  return;
}
fan.domkit.Table.prototype.firstVisRow = function()
{
  return this.m_firstVisRow;
}
fan.domkit.Table.prototype.firstVisRow$ = function(it)
{
  this.m_firstVisRow = it;
  return;
}
fan.domkit.Table.prototype.pivot = function()
{
  return this.m_pivot;
}
fan.domkit.Table.prototype.pivot$ = function(it)
{
  this.m_pivot = it;
  return;
}
fan.domkit.Table.prototype.manFocus = function()
{
  return this.m_manFocus;
}
fan.domkit.Table.prototype.manFocus$ = function(it)
{
  this.m_manFocus = it;
  return;
}
fan.domkit.Table.static$init = function()
{
  fan.domkit.Table.m_cellEvents = fan.sys.ObjUtil.coerce((function($this) { var $_u140 = fan.sys.List.make(fan.sys.Str.$type, ["mousedown","mouseup","click","dblclick"]); if ($_u140 == null) return null; return fan.sys.ObjUtil.toImmutable($_u140); })(this),fan.sys.Type.find("sys::Str[]"));
  return;
}
fan.domkit.Table.prototype.m_model = null;
fan.domkit.Table.prototype.m_showHeader = false;
fan.domkit.Table.prototype.m_stripeClasses = null;
fan.domkit.Table.prototype.m_view = null;
fan.domkit.Table.prototype.m_sortEnabled = false;
fan.domkit.Table.prototype.m_sel = null;
fan.domkit.Table.m_cellEvents = null;
fan.domkit.Table.prototype.m_cbBeforeSelect = null;
fan.domkit.Table.prototype.m_cbSelect = null;
fan.domkit.Table.prototype.m_cbAction = null;
fan.domkit.Table.prototype.m_cbSort = null;
fan.domkit.Table.prototype.m_cbKeyDown = null;
fan.domkit.Table.prototype.m_cbTableEvent = null;
fan.domkit.Table.prototype.m_cbHeaderPopup = null;
fan.domkit.Table.prototype.m_sbarsz = 0;
fan.domkit.Table.prototype.m_thumbMargin = 0;
fan.domkit.Table.prototype.m_overScroll = 0;
fan.domkit.Table.prototype.m_scrollPageFreq = null;
fan.domkit.Table.prototype.m_scrollPulseDir = null;
fan.domkit.Table.prototype.m_thead = null;
fan.domkit.Table.prototype.m_tbody = null;
fan.domkit.Table.prototype.m_hbar = null;
fan.domkit.Table.prototype.m_vbar = null;
fan.domkit.Table.prototype.m_headers = null;
fan.domkit.Table.prototype.m_cells = null;
fan.domkit.Table.prototype.m_theadh = 0;
fan.domkit.Table.prototype.m_tbodyw = 0;
fan.domkit.Table.prototype.m_tbodyh = 0;
fan.domkit.Table.prototype.m_numCols = 0;
fan.domkit.Table.prototype.m_numRows = 0;
fan.domkit.Table.prototype.m_colx = null;
fan.domkit.Table.prototype.m_colw = null;
fan.domkit.Table.prototype.m_ucolw = null;
fan.domkit.Table.prototype.m_rowh = 0;
fan.domkit.Table.prototype.m_numVisCols = 0;
fan.domkit.Table.prototype.m_numVisRows = 0;
fan.domkit.Table.prototype.m_maxScrollx = 0;
fan.domkit.Table.prototype.m_maxScrolly = 0;
fan.domkit.Table.prototype.m_hasScrollx = false;
fan.domkit.Table.prototype.m_hasScrolly = false;
fan.domkit.Table.prototype.m_htrackw = 0;
fan.domkit.Table.prototype.m_hthumbw = 0;
fan.domkit.Table.prototype.m_vtrackh = 0;
fan.domkit.Table.prototype.m_vthumbh = 0;
fan.domkit.Table.prototype.m_resizeCol = null;
fan.domkit.Table.prototype.m_resizeElem = null;
fan.domkit.Table.prototype.m_hpbut = null;
fan.domkit.Table.prototype.m_hasHpbut = false;
fan.domkit.Table.prototype.m_hpbutw = 0;
fan.domkit.Table.prototype.m_scrollx = 0;
fan.domkit.Table.prototype.m_scrolly = 0;
fan.domkit.Table.prototype.m_hbarPulseId = null;
fan.domkit.Table.prototype.m_vbarPulseId = null;
fan.domkit.Table.prototype.m_hbarPageId = null;
fan.domkit.Table.prototype.m_vbarPageId = null;
fan.domkit.Table.prototype.m_hthumbDragOff = null;
fan.domkit.Table.prototype.m_vthumbDragOff = null;
fan.domkit.Table.prototype.m_firstVisCol = 0;
fan.domkit.Table.prototype.m_firstVisRow = 0;
fan.domkit.Table.prototype.m_pivot = null;
fan.domkit.Table.prototype.m_manFocus = false;
fan.domkit.TablePos = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.TablePos.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.TablePos.prototype.$typeof = function() { return fan.domkit.TablePos.$type; }
fan.domkit.TablePos.make = function(c,r) {
  var self = new fan.domkit.TablePos();
  fan.domkit.TablePos.make$(self,c,r);
  return self;
  }
fan.domkit.TablePos.make$ = function(self,c,r)
{
  self.m_col = c;
  self.m_row = r;
  self.m_toStr = fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(r,fan.sys.Obj.$type.toNullable()));
  self.m_hash = fan.sys.Str.hash(self.m_toStr);
  return;
}
fan.domkit.TablePos.prototype.hash = function()
{
  return this.m_hash;
}
fan.domkit.TablePos.prototype.toStr = function()
{
  return this.m_toStr;
}
fan.domkit.TablePos.prototype.equals = function(that)
{
  return fan.sys.ObjUtil.equals(this.m_toStr,fan.sys.ObjUtil.toStr(that));
}
fan.domkit.TablePos.prototype.m_col = 0;
fan.domkit.TablePos.prototype.m_row = 0;
fan.domkit.TablePos.prototype.m_hash = 0;
fan.domkit.TablePos.prototype.m_toStr = null;
fan.domkit.TableModel = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.TableModel.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.TableModel.prototype.$typeof = function() { return fan.domkit.TableModel.$type; }
fan.domkit.TableModel.prototype.numCols = function()
{
  return 0;
}
fan.domkit.TableModel.prototype.numRows = function()
{
  return 0;
}
fan.domkit.TableModel.prototype.headerHeight = function()
{
  return 20;
}
fan.domkit.TableModel.prototype.colWidth = function(col)
{
  return 100;
}
fan.domkit.TableModel.prototype.rowHeight = function()
{
  return 20;
}
fan.domkit.TableModel.prototype.item = function(row)
{
  return fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type);
}
fan.domkit.TableModel.prototype.onHeader = function(header,col)
{
  header.text$(fan.sys.Str.plus("Col ",fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable())));
  return;
}
fan.domkit.TableModel.prototype.isVisibleDef = function(col)
{
  return true;
}
fan.domkit.TableModel.prototype.onCell = function(cell,col,row,flags)
{
  cell.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("C",fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable())),":R"),fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type.toNullable())));
  return;
}
fan.domkit.TableModel.prototype.sortCompare = function(col,row1,row2)
{
  return 0;
}
fan.domkit.TableModel.prototype.onSort = function(col,dir)
{
  return;
}
fan.domkit.TableModel.make = function() {
  var self = new fan.domkit.TableModel();
  fan.domkit.TableModel.make$(self);
  return self;
  }
fan.domkit.TableModel.make$ = function(self)
{
  return;
}
fan.domkit.TableFlags = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.TableFlags.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.TableFlags.prototype.$typeof = function() { return fan.domkit.TableFlags.$type; }
fan.domkit.TableFlags.make = function(f) {
  var self = new fan.domkit.TableFlags();
  fan.domkit.TableFlags.make$(self,f);
  return self;
  }
fan.domkit.TableFlags.make$ = function(self,f)
{
  f.call(self);
  return;
}
fan.domkit.TableFlags.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("TableFlags { focused=",fan.sys.ObjUtil.coerce(this.m_focused,fan.sys.Obj.$type.toNullable())),"; selected="),fan.sys.ObjUtil.coerce(this.m_selected,fan.sys.Obj.$type.toNullable()))," }");
}
fan.domkit.TableFlags.static$init = function()
{
  var $this = this;
  fan.domkit.TableFlags.m_defVal = fan.domkit.TableFlags.make(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u102,
    function(it)
    {
      return;
    }));
  return;
}
fan.domkit.TableFlags.m_defVal = null;
fan.domkit.TableFlags.prototype.m_focused = false;
fan.domkit.TableFlags.prototype.m_selected = false;
fan.domkit.TableEvent = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.TableEvent.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.TableEvent.prototype.$typeof = function() { return fan.domkit.TableEvent.$type; }
fan.domkit.TableEvent.make = function(t,f) {
  var self = new fan.domkit.TableEvent();
  fan.domkit.TableEvent.make$(self,t,f);
  return self;
  }
fan.domkit.TableEvent.make$ = function(self,t,f)
{
  self.m_table = t;
  f.call(self);
  return;
}
fan.domkit.TableEvent.prototype.table = function()
{
  return this.m_table;
}
fan.domkit.TableEvent.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.domkit.TableEvent.prototype._event = function()
{
  return this.m__event;
}
fan.domkit.TableEvent.prototype._event$ = function(it)
{
  this.m__event = it;
  return;
}
fan.domkit.TableEvent.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("TableEvent { type=",this.m_type)," row="),fan.sys.ObjUtil.coerce(this.m_row,fan.sys.Obj.$type.toNullable()))," col="),fan.sys.ObjUtil.coerce(this.m_col,fan.sys.Obj.$type.toNullable()))," pagePos="),this.m_pagePos)," cellPos="),this.m_cellPos)," size="),this.m_size)," }");
}
fan.domkit.TableEvent.prototype.m_table = null;
fan.domkit.TableEvent.prototype.m_type = null;
fan.domkit.TableEvent.prototype.m_col = 0;
fan.domkit.TableEvent.prototype.m_row = 0;
fan.domkit.TableEvent.prototype.m_pagePos = null;
fan.domkit.TableEvent.prototype.m_cellPos = null;
fan.domkit.TableEvent.prototype.m_size = null;
fan.domkit.TableEvent.prototype.m__event = null;
fan.domkit.TableSelection = fan.sys.Obj.$extend(fan.domkit.IndexSelection);
fan.domkit.TableSelection.prototype.$ctor = function()
{
  fan.domkit.IndexSelection.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.TableSelection.prototype.$typeof = function() { return fan.domkit.TableSelection.$type; }
fan.domkit.TableSelection.make = function(view) {
  var self = new fan.domkit.TableSelection();
  fan.domkit.TableSelection.make$(self,view);
  return self;
  }
fan.domkit.TableSelection.make$ = function(self,view)
{
  fan.domkit.IndexSelection.make$(self);
  self.m_view = view;
  return;
}
fan.domkit.TableSelection.prototype.max = function()
{
  return this.m_view.numRows();
}
fan.domkit.TableSelection.prototype.toItem = function(index)
{
  return this.m_view.m_table.model().item(index);
}
fan.domkit.TableSelection.prototype.toIndex = function(item)
{
  var numRows = this.m_view.numRows();
  for (var row = 0; fan.sys.ObjUtil.compareLT(row,numRows); row = fan.sys.Int.increment(row))
  {
    if (fan.sys.ObjUtil.equals(this.m_view.m_table.model().item(row),item))
    {
      return fan.sys.ObjUtil.coerce(row,fan.sys.Int.$type.toNullable());
    }
    ;
  }
  ;
  return null;
}
fan.domkit.TableSelection.prototype.onUpdate = function(oldIndexes,newIndexes)
{
  var $this = this;
  oldIndexes.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u130,
    function(i)
    {
      if (fan.sys.ObjUtil.compareLT(i,$this.max()))
      {
        $this.m_view.m_table.refreshRow($this.m_view.rowModelToView(i));
      }
      ;
      return;
    }));
  newIndexes.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u130,
    function(i)
    {
      if (fan.sys.ObjUtil.compareLT(i,$this.max()))
      {
        $this.m_view.m_table.refreshRow($this.m_view.rowModelToView(i));
      }
      ;
      return;
    }));
  return;
}
fan.domkit.TableSelection.prototype.view = function()
{
  return this.m_view;
}
fan.domkit.TableSelection.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.domkit.TableSelection.prototype.m_view = null;
fan.domkit.TableView = fan.sys.Obj.$extend(fan.domkit.TableModel);
fan.domkit.TableView.prototype.$ctor = function()
{
  fan.domkit.TableModel.prototype.$ctor.call(this);
  var $this = this;
  this.m_rows = fan.sys.List.make(fan.sys.Int.$type);
  this.m_cols = fan.sys.List.make(fan.sys.Int.$type);
  this.m_vis = fan.sys.List.make(fan.sys.Bool.$type);
  this.m_sortDir = fan.domkit.Dir.m_up;
  return;
}
fan.domkit.TableView.prototype.$typeof = function() { return fan.domkit.TableView.$type; }
fan.domkit.TableView.make = function(table) {
  var self = new fan.domkit.TableView();
  fan.domkit.TableView.make$(self,table);
  return self;
  }
fan.domkit.TableView.make$ = function(self,table)
{
  fan.domkit.TableModel.make$(self);
  ;
  self.m_table = table;
  return;
}
fan.domkit.TableView.prototype.numCols = function()
{
  return this.m_cols.size();
}
fan.domkit.TableView.prototype.numRows = function()
{
  return this.m_rows.size();
}
fan.domkit.TableView.prototype.headerHeight = function()
{
  return this.m_table.model().headerHeight();
}
fan.domkit.TableView.prototype.colWidth = function(c)
{
  return this.m_table.model().colWidth(this.m_cols.get(c));
}
fan.domkit.TableView.prototype.rowHeight = function()
{
  return this.m_table.model().rowHeight();
}
fan.domkit.TableView.prototype.item = function(r)
{
  return this.m_table.model().item(this.m_rows.get(r));
}
fan.domkit.TableView.prototype.onHeader = function(e,c)
{
  this.m_table.model().onHeader(e,this.m_cols.get(c));
  return;
}
fan.domkit.TableView.prototype.onCell = function(e,c,r,f)
{
  this.m_table.model().onCell(e,this.m_cols.get(c),this.m_rows.get(r),f);
  return;
}
fan.domkit.TableView.prototype.isColVisible = function(col)
{
  return this.m_vis.get(col);
}
fan.domkit.TableView.prototype.setColVisible = function(col,visible)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(this.m_vis.get(col),visible))
  {
    return this;
  }
  ;
  this.m_vis.set(col,fan.sys.ObjUtil.coerce(visible,fan.sys.Obj.$type.toNullable()));
  this.m_cols.clear();
  this.m_vis.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u141,
    function(v,i)
    {
      if (v)
      {
        $this.m_cols.add(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
      }
      ;
      return;
    }));
  return this;
}
fan.domkit.TableView.prototype.sort = function(col,dir)
{
  if (dir === undefined) dir = fan.domkit.Dir.m_up;
  var $this = this;
  var model = this.m_table.model();
  this.m_sortCol = col;
  this.m_sortDir = dir;
  if (col == null)
  {
    this.m_rows.each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u142,
      function(val,i)
      {
        $this.m_rows.set(i,fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
        return;
      }));
  }
  else
  {
    if (dir === fan.domkit.Dir.m_up)
    {
      this.m_rows.sort(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u143,
        function(a,b)
        {
          return model.sortCompare(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type),a,b);
        }));
    }
    else
    {
      this.m_rows.sortr(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u143,
        function(a,b)
        {
          return model.sortCompare(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type),a,b);
        }));
    }
    ;
  }
  ;
  return;
}
fan.domkit.TableView.prototype.refresh = function()
{
  var model = this.m_table.model();
  if (fan.sys.ObjUtil.compareNE(this.m_rows.size(),model.numRows()))
  {
    this.refreshRows();
  }
  ;
  if (fan.sys.ObjUtil.compareNE(this.m_vis.size(),model.numCols()))
  {
    this.refreshCols();
  }
  ;
  return;
}
fan.domkit.TableView.prototype.refreshRows = function()
{
  var $this = this;
  var model = this.m_table.model();
  this.m_rows.clear();
  this.m_rows.capacity$(model.numRows());
  fan.sys.Int.times(model.numRows(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u130,
    function(i)
    {
      $this.m_rows.add(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
      return;
    }));
  if ((this.m_sortCol != null && fan.sys.ObjUtil.compareLT(this.m_sortCol,model.numCols())))
  {
    this.sort(this.m_sortCol,this.m_sortDir);
  }
  ;
  return;
}
fan.domkit.TableView.prototype.refreshCols = function()
{
  var $this = this;
  var model = this.m_table.model();
  this.m_cols.clear();
  this.m_cols.capacity$(model.numCols());
  this.m_vis.clear();
  this.m_vis.capacity$(model.numCols());
  fan.sys.Int.times(model.numCols(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u130,
    function(i)
    {
      var visDef = model.isVisibleDef(i);
      $this.m_vis.add(fan.sys.ObjUtil.coerce(visDef,fan.sys.Obj.$type.toNullable()));
      if (visDef)
      {
        $this.m_cols.add(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
      }
      ;
      return;
    }));
  return;
}
fan.domkit.TableView.prototype.rowViewToModel = function(i)
{
  return this.m_rows.get(i);
}
fan.domkit.TableView.prototype.colViewToModel = function(i)
{
  return this.m_cols.get(i);
}
fan.domkit.TableView.prototype.rowsViewToModel = function(i)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(i.map(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u144,
    function(x)
    {
      return $this.m_rows.get(x);
    })),fan.sys.Type.find("sys::Int[]"));
}
fan.domkit.TableView.prototype.colsViewToModel = function(i)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(i.map(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u144,
    function(x)
    {
      return $this.m_cols.get(x);
    })),fan.sys.Type.find("sys::Int[]"));
}
fan.domkit.TableView.prototype.rowModelToView = function(i)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(this.m_rows.findIndex(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u145,
    function(x)
    {
      return fan.sys.ObjUtil.equals(x,i);
    })),fan.sys.Int.$type);
}
fan.domkit.TableView.prototype.colModelToView = function(i)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(this.m_cols.findIndex(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u145,
    function(x)
    {
      return fan.sys.ObjUtil.equals(x,i);
    })),fan.sys.Int.$type);
}
fan.domkit.TableView.prototype.rowsModelToView = function(i)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(i.map(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u144,
    function(x)
    {
      return $this.rowModelToView(x);
    })),fan.sys.Type.find("sys::Int[]"));
}
fan.domkit.TableView.prototype.colsModelToView = function(i)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(i.map(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u144,
    function(x)
    {
      return $this.colModelToView(x);
    })),fan.sys.Type.find("sys::Int[]"));
}
fan.domkit.TableView.prototype.table = function()
{
  return this.m_table;
}
fan.domkit.TableView.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.domkit.TableView.prototype.rows = function()
{
  return this.m_rows;
}
fan.domkit.TableView.prototype.rows$ = function(it)
{
  this.m_rows = it;
  return;
}
fan.domkit.TableView.prototype.cols = function()
{
  return this.m_cols;
}
fan.domkit.TableView.prototype.cols$ = function(it)
{
  this.m_cols = it;
  return;
}
fan.domkit.TableView.prototype.vis = function()
{
  return this.m_vis;
}
fan.domkit.TableView.prototype.vis$ = function(it)
{
  this.m_vis = it;
  return;
}
fan.domkit.TableView.prototype.sortCol = function()
{
  return this.m_sortCol;
}
fan.domkit.TableView.prototype.sortCol$ = function(it)
{
  this.m_sortCol = it;
  return;
}
fan.domkit.TableView.prototype.sortDir = function()
{
  return this.m_sortDir;
}
fan.domkit.TableView.prototype.sortDir$ = function(it)
{
  this.m_sortDir = it;
  return;
}
fan.domkit.TableView.prototype.m_table = null;
fan.domkit.TableView.prototype.m_rows = null;
fan.domkit.TableView.prototype.m_cols = null;
fan.domkit.TableView.prototype.m_vis = null;
fan.domkit.TableView.prototype.m_sortCol = null;
fan.domkit.TableView.prototype.m_sortDir = null;
fan.domkit.ScrollBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.ScrollBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cbScroll = null;
  return;
}
fan.domkit.ScrollBox.prototype.$typeof = function() { return fan.domkit.ScrollBox.$type; }
fan.domkit.ScrollBox.make = function() {
  var self = new fan.domkit.ScrollBox();
  fan.domkit.ScrollBox.make$(self);
  return self;
  }
fan.domkit.ScrollBox.make$ = function(self)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.style().addClass("domkit-ScrollBox").addClass("domkit-border");
  self.onEvent("scroll",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.fireScroll(e);
      return;
    }));
  return;
}
fan.domkit.ScrollBox.prototype.onScroll = function(f)
{
  this.m_cbScroll = f;
  return;
}
fan.domkit.ScrollBox.prototype.fireScroll = function(e)
{
  (function($this) { var $_u146 = $this.m_cbScroll; if ($_u146 == null) return null; return $_u146.call($this); })(this);
  return;
}
fan.domkit.ScrollBox.prototype.cbScroll = function()
{
  return this.m_cbScroll;
}
fan.domkit.ScrollBox.prototype.cbScroll$ = function(it)
{
  this.m_cbScroll = it;
  return;
}
fan.domkit.ScrollBox.prototype.m_cbScroll = null;
fan.domkit.WellBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.WellBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.domkit.WellBox.prototype.$typeof = function() { return fan.domkit.WellBox.$type; }
fan.domkit.WellBox.make = function() {
  var self = new fan.domkit.WellBox();
  fan.domkit.WellBox.make$(self);
  return self;
  }
fan.domkit.WellBox.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  self.style().addClass("domkit-WellBox");
  return;
}
fan.domkit.WellBox.prototype.mergeHeader = function(header,halign)
{
  if (halign === undefined) halign = fan.domkit.Align.m_left;
  var $this = this;
  header.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["12px"]));
  header.style().trap("zIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10"]));
  var $_u147 = halign;
  if (fan.sys.ObjUtil.equals($_u147,fan.domkit.Align.m_center))
  {
    header.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["center"]));
  }
  else if (fan.sys.ObjUtil.equals($_u147,fan.domkit.Align.m_right))
  {
    header.style().trap("right",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
  }
  else
  {
    header.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["10px"]));
  }
  ;
  this.style().trap("paddingTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["24px"]));
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Box.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u11,
    function(it)
    {
      it.style().trap("marginTop",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["-12px"]));
      fan.sys.ObjUtil.coerce(it.add(header),fan.domkit.Box.$type).add($this);
      return;
    })),fan.domkit.Box.$type);
}
fan.domkit.DomListener = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.DomListener.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_checkFreq = 1000000000;
  this.m_map = fan.dom.WeakMap.make();
  this.m_mounted = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Int"),fan.sys.Type.find("dom::Elem"));
  this.m_checkMutations = fan.sys.List.make(fan.dom.MutationRec.$type);
  this.m_checkState = fan.sys.List.make(fan.dom.Elem.$type);
  return;
}
fan.domkit.DomListener.prototype.$typeof = function() { return fan.domkit.DomListener.$type; }
fan.domkit.DomListener.cur = function()
{
  var r = fan.sys.ObjUtil.as(fan.concurrent.Actor.locals().get("domkit.DomListener"),fan.domkit.DomListener.$type);
  if (r == null)
  {
    fan.concurrent.Actor.locals().set("domkit.DomListener",r = fan.domkit.DomListener.make());
  }
  ;
  return fan.sys.ObjUtil.coerce(r,fan.domkit.DomListener.$type);
}
fan.domkit.DomListener.make = function() {
  var self = new fan.domkit.DomListener();
  fan.domkit.DomListener.make$(self);
  return self;
  }
fan.domkit.DomListener.make$ = function(self)
{
  var $this = self;
  ;
  self.m_observer = fan.dom.MutationObserver.make(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u148,
    function(recs)
    {
      $this.m_checkMutations.addAll(recs);
      return;
    }));
  self.m_observer.observe(fan.dom.Win.cur().doc().body(),fan.sys.Map.fromLiteral(["childList","subtree"],[fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable())],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Bool")));
  self.reqCheck();
  return;
}
fan.domkit.DomListener.prototype.onMount = function(target,f)
{
  var state = fan.sys.ObjUtil.coerce((function($this) { var $_u149 = $this.m_map.get(target); if ($_u149 != null) return $_u149; return fan.domkit.DomState.make(); })(this),fan.domkit.DomState.$type);
  state.m_onMount = f;
  this.m_map.set(target,state);
  return;
}
fan.domkit.DomListener.prototype.onUnmount = function(target,f)
{
  var state = fan.sys.ObjUtil.coerce((function($this) { var $_u150 = $this.m_map.get(target); if ($_u150 != null) return $_u150; return fan.domkit.DomState.make(); })(this),fan.domkit.DomState.$type);
  state.m_onUnmount = f;
  this.m_map.set(target,state);
  return;
}
fan.domkit.DomListener.prototype.onResize = function(target,f)
{
  var state = fan.sys.ObjUtil.coerce((function($this) { var $_u151 = $this.m_map.get(target); if ($_u151 != null) return $_u151; return fan.domkit.DomState.make(); })(this),fan.domkit.DomState.$type);
  state.m_onResize = f;
  this.m_map.set(target,state);
  return;
}
fan.domkit.DomListener.prototype.reqCheck = function()
{
  var $this = this;
  fan.dom.Win.cur().reqAnimationFrame(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u1,
    function()
    {
      $this.onCheck();
      return;
    }));
  return;
}
fan.domkit.DomListener.prototype.onCheck = function()
{
  var $this = this;
  try
  {
    var nowTicks = fan.sys.Duration.nowTicks();
    if ((this.m_lastTicks != null && fan.sys.ObjUtil.compareLT(fan.sys.Int.minus(nowTicks,fan.sys.ObjUtil.coerce(this.m_lastTicks,fan.sys.Int.$type)),this.m_checkFreq)))
    {
      return;
    }
    ;
    this.m_lastTicks = fan.sys.ObjUtil.coerce(nowTicks,fan.sys.Int.$type.toNullable());
    this.m_checkMutations.each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u152,
      function(r,i)
      {
        $this.m_checkState.clear();
        r.added().each(fan.sys.Func.make$closure(
          fan.domkit.$clos$_u153,
          function(e)
          {
            $this.findRegNodes(e,$this.m_checkState);
            return;
          }));
        $this.m_checkState.each(fan.sys.Func.make$closure(
          fan.domkit.$clos$_u153,
          function(e)
          {
            var s = fan.sys.ObjUtil.coerce($this.m_map.get(e),fan.domkit.DomState.$type);
            s.fireMount(e);
            $this.m_mounted.set(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.hash(e),fan.sys.Obj.$type.toNullable()),e);
            return;
          }));
        $this.m_checkState.clear();
        r.removed().each(fan.sys.Func.make$closure(
          fan.domkit.$clos$_u153,
          function(e)
          {
            $this.findRegNodes(e,$this.m_checkState);
            return;
          }));
        $this.m_checkState.each(fan.sys.Func.make$closure(
          fan.domkit.$clos$_u153,
          function(e)
          {
            var s = fan.sys.ObjUtil.coerce($this.m_map.get(e),fan.domkit.DomState.$type);
            s.fireUnmount(e);
            $this.m_mounted.remove(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.hash(e),fan.sys.Obj.$type.toNullable()));
            return;
          }));
        return;
      }));
    this.m_checkMutations.clear();
    this.m_checkState.clear();
    this.m_mounted.each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u153,
      function(e)
      {
        var s = fan.sys.ObjUtil.coerce($this.m_map.get(e),fan.domkit.DomState.$type);
        if (s.m_onResize != null)
        {
          s.m_newSize = e.size();
          if (s.m_lastSize == null)
          {
            s.m_lastSize = s.m_newSize;
          }
          ;
          if (fan.sys.ObjUtil.compareNE(s.m_lastSize,s.m_newSize))
          {
            s.fireResize(e);
          }
          ;
          s.m_lastSize = s.m_newSize;
        }
        ;
        return;
      }));
  }
  catch ($_u154)
  {
    $_u154 = fan.sys.Err.make($_u154);
    if ($_u154 instanceof fan.sys.Err)
    {
      var err = $_u154;
      var err;
      err.trace();
    }
    else
    {
      throw $_u154;
    }
  }
  finally
  {
    this.reqCheck();
  }
  ;
  return;
}
fan.domkit.DomListener.prototype.findRegNodes = function(elem,list)
{
  var $this = this;
  if (this.m_map.has(elem))
  {
    list.add(elem);
  }
  ;
  elem.children().each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u155,
    function(c)
    {
      $this.findRegNodes(c,list);
      return;
    }));
  return;
}
fan.domkit.DomListener.prototype.checkFreq = function()
{
  return this.m_checkFreq;
}
fan.domkit.DomListener.prototype.checkFreq$ = function(it)
{
  this.m_checkFreq = it;
  return;
}
fan.domkit.DomListener.prototype.lastTicks = function()
{
  return this.m_lastTicks;
}
fan.domkit.DomListener.prototype.lastTicks$ = function(it)
{
  this.m_lastTicks = it;
  return;
}
fan.domkit.DomListener.prototype.observer = function()
{
  return this.m_observer;
}
fan.domkit.DomListener.prototype.observer$ = function(it)
{
  this.m_observer = it;
  return;
}
fan.domkit.DomListener.prototype.map = function()
{
  return this.m_map;
}
fan.domkit.DomListener.prototype.map$ = function(it)
{
  this.m_map = it;
  return;
}
fan.domkit.DomListener.prototype.mounted = function()
{
  return this.m_mounted;
}
fan.domkit.DomListener.prototype.mounted$ = function(it)
{
  this.m_mounted = it;
  return;
}
fan.domkit.DomListener.prototype.checkMutations = function()
{
  return this.m_checkMutations;
}
fan.domkit.DomListener.prototype.checkMutations$ = function(it)
{
  this.m_checkMutations = it;
  return;
}
fan.domkit.DomListener.prototype.checkState = function()
{
  return this.m_checkState;
}
fan.domkit.DomListener.prototype.checkState$ = function(it)
{
  this.m_checkState = it;
  return;
}
fan.domkit.DomListener.prototype.m_checkFreq = 0;
fan.domkit.DomListener.prototype.m_lastTicks = null;
fan.domkit.DomListener.prototype.m_observer = null;
fan.domkit.DomListener.prototype.m_map = null;
fan.domkit.DomListener.prototype.m_mounted = null;
fan.domkit.DomListener.prototype.m_checkMutations = null;
fan.domkit.DomListener.prototype.m_checkState = null;
fan.domkit.DomState = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.DomState.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_onMount = null;
  this.m_onUnmount = null;
  this.m_onResize = null;
  this.m_mounted = false;
  this.m_unmounted = true;
  return;
}
fan.domkit.DomState.prototype.$typeof = function() { return fan.domkit.DomState.$type; }
fan.domkit.DomState.prototype.onMount = function()
{
  return this.m_onMount;
}
fan.domkit.DomState.prototype.onMount$ = function(it)
{
  this.m_onMount = it;
  return;
}
fan.domkit.DomState.prototype.onUnmount = function()
{
  return this.m_onUnmount;
}
fan.domkit.DomState.prototype.onUnmount$ = function(it)
{
  this.m_onUnmount = it;
  return;
}
fan.domkit.DomState.prototype.onResize = function()
{
  return this.m_onResize;
}
fan.domkit.DomState.prototype.onResize$ = function(it)
{
  this.m_onResize = it;
  return;
}
fan.domkit.DomState.prototype.lastSize = function()
{
  return this.m_lastSize;
}
fan.domkit.DomState.prototype.lastSize$ = function(it)
{
  this.m_lastSize = it;
  return;
}
fan.domkit.DomState.prototype.newSize = function()
{
  return this.m_newSize;
}
fan.domkit.DomState.prototype.newSize$ = function(it)
{
  this.m_newSize = it;
  return;
}
fan.domkit.DomState.prototype.fireMount = function(elem)
{
  if (this.m_mounted)
  {
    return;
  }
  ;
  this.m_mounted = true;
  this.m_unmounted = false;
  try
  {
    (function($this) { var $_u156 = $this.m_onMount; if ($_u156 == null) return null; return $_u156.call(elem); })(this);
  }
  catch ($_u157)
  {
    $_u157 = fan.sys.Err.make($_u157);
    if ($_u157 instanceof fan.sys.Err)
    {
      var err = $_u157;
      var err;
      err.trace();
    }
    else
    {
      throw $_u157;
    }
  }
  ;
  return;
}
fan.domkit.DomState.prototype.fireUnmount = function(elem)
{
  if (this.m_unmounted)
  {
    return;
  }
  ;
  this.m_mounted = false;
  this.m_unmounted = true;
  try
  {
    (function($this) { var $_u158 = $this.m_onUnmount; if ($_u158 == null) return null; return $_u158.call(elem); })(this);
  }
  catch ($_u159)
  {
    $_u159 = fan.sys.Err.make($_u159);
    if ($_u159 instanceof fan.sys.Err)
    {
      var err = $_u159;
      var err;
      err.trace();
    }
    else
    {
      throw $_u159;
    }
  }
  ;
  return;
}
fan.domkit.DomState.prototype.fireResize = function(elem)
{
  try
  {
    (function($this) { var $_u160 = $this.m_onResize; if ($_u160 == null) return null; return $_u160.call(elem); })(this);
  }
  catch ($_u161)
  {
    $_u161 = fan.sys.Err.make($_u161);
    if ($_u161 instanceof fan.sys.Err)
    {
      var err = $_u161;
      var err;
      err.trace();
    }
    else
    {
      throw $_u161;
    }
  }
  ;
  return;
}
fan.domkit.DomState.prototype.mounted = function()
{
  return this.m_mounted;
}
fan.domkit.DomState.prototype.mounted$ = function(it)
{
  this.m_mounted = it;
  return;
}
fan.domkit.DomState.prototype.unmounted = function()
{
  return this.m_unmounted;
}
fan.domkit.DomState.prototype.unmounted$ = function(it)
{
  this.m_unmounted = it;
  return;
}
fan.domkit.DomState.make = function() {
  var self = new fan.domkit.DomState();
  fan.domkit.DomState.make$(self);
  return self;
  }
fan.domkit.DomState.make$ = function(self)
{
  ;
  return;
}
fan.domkit.DomState.prototype.m_onMount = null;
fan.domkit.DomState.prototype.m_onUnmount = null;
fan.domkit.DomState.prototype.m_onResize = null;
fan.domkit.DomState.prototype.m_lastSize = null;
fan.domkit.DomState.prototype.m_newSize = null;
fan.domkit.DomState.prototype.m_mounted = false;
fan.domkit.DomState.prototype.m_unmounted = false;
fan.domkit.Checkbox = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Checkbox.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cbAction = null;
  return;
}
fan.domkit.Checkbox.prototype.$typeof = function() { return fan.domkit.Checkbox.$type; }
fan.domkit.Checkbox.make = function() {
  var self = new fan.domkit.Checkbox();
  fan.domkit.Checkbox.make$(self);
  return self;
  }
fan.domkit.Checkbox.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self,"input");
  ;
  self.set("type","checkbox");
  self.style().addClass("domkit-Checkbox");
  self.onEvent("change",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.fireAction(e);
      return;
    }));
  return;
}
fan.domkit.Checkbox.prototype.wrap = function(content)
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make("label"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.add($this).add(fan.sys.ObjUtil.coerce((function($this) { if (fan.sys.ObjUtil.is(content,fan.dom.Elem.$type)) return content; return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.Label.make(),fan.sys.Func.make$closure(
        fan.domkit.$clos$_u39,
        function(it)
        {
          it.text$(fan.sys.ObjUtil.toStr(content));
          return;
        })),fan.domkit.Label.$type); })($this),fan.dom.Elem.$type));
      return;
    })),fan.dom.Elem.$type);
}
fan.domkit.Checkbox.prototype.indeterminate = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("indeterminate",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Bool.$type);
}
fan.domkit.Checkbox.prototype.indeterminate$ = function(it)
{
  this.trap("indeterminate",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.Checkbox.prototype.checked = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("checked",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Bool.$type);
}
fan.domkit.Checkbox.prototype.checked$ = function(it)
{
  this.trap("checked",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.Checkbox.prototype.onAction = function(f)
{
  this.m_cbAction = f;
  return;
}
fan.domkit.Checkbox.prototype.fireAction = function(e)
{
  (function($this) { var $_u163 = $this.m_cbAction; if ($_u163 == null) return null; return $_u163.call($this); })(this);
  return;
}
fan.domkit.Checkbox.prototype.cbAction = function()
{
  return this.m_cbAction;
}
fan.domkit.Checkbox.prototype.cbAction$ = function(it)
{
  this.m_cbAction = it;
  return;
}
fan.domkit.Checkbox.prototype.m_indeterminate = false;
fan.domkit.Checkbox.prototype.m_checked = false;
fan.domkit.Checkbox.prototype.m_cbAction = null;
fan.domkit.TextArea = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.TextArea.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_cbModify = null;
  return;
}
fan.domkit.TextArea.prototype.$typeof = function() { return fan.domkit.TextArea.$type; }
fan.domkit.TextArea.make = function() {
  var self = new fan.domkit.TextArea();
  fan.domkit.TextArea.make$(self);
  return self;
  }
fan.domkit.TextArea.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self,"textarea");
  ;
  self.style().addClass("domkit-control domkit-control-text domkit-TextArea");
  self.onEvent("input",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.fireModify(e);
      return;
    }));
  return;
}
fan.domkit.TextArea.prototype.cols = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("cols",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Int.$type.toNullable());
}
fan.domkit.TextArea.prototype.cols$ = function(it)
{
  this.trap("cols",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.TextArea.prototype.rows = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("rows",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Int.$type.toNullable());
}
fan.domkit.TextArea.prototype.rows$ = function(it)
{
  this.trap("rows",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.TextArea.prototype.placeholder = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("placeholder",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type.toNullable());
}
fan.domkit.TextArea.prototype.placeholder$ = function(it)
{
  this.trap("placeholder",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[it]));
  return;
}
fan.domkit.TextArea.prototype.ro = function()
{
  return fan.sys.ObjUtil.coerce(this.prop("readOnly"),fan.sys.Bool.$type);
}
fan.domkit.TextArea.prototype.ro$ = function(it)
{
  this.setProp("readOnly",fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type.toNullable()));
  return;
}
fan.domkit.TextArea.prototype.val = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("value",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
}
fan.domkit.TextArea.prototype.val$ = function(it)
{
  this.trap("value",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[it]));
  return;
}
fan.domkit.TextArea.prototype.onModify = function(f)
{
  this.m_cbModify = f;
  return;
}
fan.domkit.TextArea.prototype.fireModify = function(e)
{
  (function($this) { var $_u164 = $this.m_cbModify; if ($_u164 == null) return null; return $_u164.call($this); })(this);
  return;
}
fan.domkit.TextArea.prototype.cbModify = function()
{
  return this.m_cbModify;
}
fan.domkit.TextArea.prototype.cbModify$ = function(it)
{
  this.m_cbModify = it;
  return;
}
fan.domkit.TextArea.prototype.m_cols = null;
fan.domkit.TextArea.prototype.m_rows = null;
fan.domkit.TextArea.prototype.m_placeholder = null;
fan.domkit.TextArea.prototype.m_ro = false;
fan.domkit.TextArea.prototype.m_val = null;
fan.domkit.TextArea.prototype.m_cbModify = null;
fan.domkit.AccordionBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.AccordionBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.domkit.AccordionBox.prototype.$typeof = function() { return fan.domkit.AccordionBox.$type; }
fan.domkit.AccordionBox.make = function() {
  var self = new fan.domkit.AccordionBox();
  fan.domkit.AccordionBox.make$(self);
  return self;
  }
fan.domkit.AccordionBox.make$ = function(self)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.style().addClass("domkit-AccordionBox");
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      $this.onMouseDown(e);
      return;
    }));
  return;
}
fan.domkit.AccordionBox.prototype.addGroup = function(header,kids,expanded)
{
  if (expanded === undefined) expanded = false;
  var $this = this;
  header.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
  kids.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u165,
    function(k)
    {
      k.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
      return;
    }));
  var group = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.style().addClass("domkit-AccordionBox-group collapsed");
      return;
    })),fan.dom.Elem.$type);
  group.add(header);
  group.addAll(kids);
  this.add(group);
  if (expanded)
  {
    this.expand(fan.sys.Int.minus(this.children().size(),1),true);
  }
  ;
  return this;
}
fan.domkit.AccordionBox.prototype.isExpanded = function(groupIndex)
{
  var group = this.children().getSafe(groupIndex);
  if (group == null)
  {
    return false;
  }
  ;
  return group.style().hasClass("expanded");
}
fan.domkit.AccordionBox.prototype.expand = function(groupIndex,expanded)
{
  var $this = this;
  var group = this.children().getSafe(groupIndex);
  if (group == null)
  {
    return;
  }
  ;
  if (expanded)
  {
    group.style().removeClass("collapsed").addClass("expanded");
    group.children().each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u165,
      function(k)
      {
        k.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
        return;
      }));
  }
  else
  {
    group.style().removeClass("expanded").addClass("collapsed");
    group.children().eachRange(fan.sys.Range.make(1,-1),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u165,
      function(k)
      {
        k.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["none"]));
        return;
      }));
  }
  ;
  return;
}
fan.domkit.AccordionBox.prototype.onMouseDown = function(e)
{
  var $this = this;
  var kids = this.children();
  var group = kids.find(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u166,
    function(g)
    {
      return g.containsChild(e.target());
    }));
  if (group == null)
  {
    return;
  }
  ;
  if (group.firstChild().containsChild(e.target()))
  {
    var index = kids.findIndex(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u166,
      function(g)
      {
        return fan.sys.ObjUtil.equals(g,group);
      }));
    this.expand(fan.sys.ObjUtil.coerce(index,fan.sys.Int.$type),!this.isExpanded(fan.sys.ObjUtil.coerce(index,fan.sys.Int.$type)));
  }
  ;
  return;
}
fan.domkit.Link = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Link.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_uri = fan.sys.Uri.fromStr("#");
  return;
}
fan.domkit.Link.prototype.$typeof = function() { return fan.domkit.Link.$type; }
fan.domkit.Link.make = function() {
  var self = new fan.domkit.Link();
  fan.domkit.Link.make$(self);
  return self;
  }
fan.domkit.Link.make$ = function(self)
{
  fan.dom.Elem.make$(self,"a");
  ;
  self.style().addClass("domkit-control domkit-Link");
  self.uri$(fan.sys.Uri.fromStr("#"));
  return;
}
fan.domkit.Link.prototype.target = function()
{
  return fan.sys.ObjUtil.coerce(this.trap("target",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Str.$type);
}
fan.domkit.Link.prototype.target$ = function(it)
{
  this.trap("target",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[it]));
  return;
}
fan.domkit.Link.prototype.uri = function()
{
  return this.m_uri;
}
fan.domkit.Link.prototype.uri$ = function(it)
{
  this.m_uri = it;
  this.setAttr("href",this.m_uri.encode());
  return;
}
fan.domkit.Link.prototype.m_target = null;
fan.domkit.Link.prototype.m_uri = null;
fan.domkit.DragTarget = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.DragTarget.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.DragTarget.prototype.$typeof = function() { return fan.domkit.DragTarget.$type; }
fan.domkit.DragTarget.bind = function(elem)
{
  return fan.domkit.DragTarget.make(elem);
}
fan.domkit.DragTarget.make = function(elem) {
  var self = new fan.domkit.DragTarget();
  fan.domkit.DragTarget.make$(self,elem);
  return self;
  }
fan.domkit.DragTarget.make$ = function(self,elem)
{
  var $this = self;
  elem.trap("draggable",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable())]));
  elem.onEvent("dragstart",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if ($this.m_cbDrag == null)
      {
        return;
      }
      ;
      var data = $this.m_cbDrag.call(elem);
      fan.domkit.DndUtil.setData(e.dataTransfer(),data);
      if ($this.m_cbDragImage != null)
      {
        $this.m_dragImage = fan.sys.ObjUtil.coerce($this.m_cbDragImage.call(data),fan.dom.Elem.$type.toNullable());
        $this.m_dragImage.style().trap("position",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["absolute"]));
        $this.m_dragImage.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["-1000px"]));
        $this.m_dragImage.style().trap("right",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["-1000px"]));
        fan.dom.Win.cur().doc().body().add(fan.sys.ObjUtil.coerce($this.m_dragImage,fan.dom.Elem.$type));
        e.dataTransfer().setDragImage(fan.sys.ObjUtil.coerce($this.m_dragImage,fan.dom.Elem.$type),0,0);
      }
      ;
      return;
    }));
  elem.onEvent("dragend",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if ($this.m_cbEnd != null)
      {
        $this.m_cbEnd.call(elem);
      }
      ;
      (function($this) { var $_u167 = (function($this) { var $_u168 = $this.m_dragImage; if ($_u168 == null) return null; return $_u168.parent(); })($this); if ($_u167 == null) return null; return $_u167.remove(fan.sys.ObjUtil.coerce($this.m_dragImage,fan.dom.Elem.$type)); })($this);
      fan.domkit.DndUtil.clearData(e.dataTransfer());
      return;
    }));
  return;
}
fan.domkit.DragTarget.prototype.onDrag = function(f)
{
  this.m_cbDrag = f;
  return;
}
fan.domkit.DragTarget.prototype.onDragImage = function(f)
{
  this.m_cbDragImage = f;
  return;
}
fan.domkit.DragTarget.prototype.onEnd = function(f)
{
  this.m_cbEnd = f;
  return;
}
fan.domkit.DragTarget.prototype.cbDrag = function()
{
  return this.m_cbDrag;
}
fan.domkit.DragTarget.prototype.cbDrag$ = function(it)
{
  this.m_cbDrag = it;
  return;
}
fan.domkit.DragTarget.prototype.cbDragImage = function()
{
  return this.m_cbDragImage;
}
fan.domkit.DragTarget.prototype.cbDragImage$ = function(it)
{
  this.m_cbDragImage = it;
  return;
}
fan.domkit.DragTarget.prototype.cbEnd = function()
{
  return this.m_cbEnd;
}
fan.domkit.DragTarget.prototype.cbEnd$ = function(it)
{
  this.m_cbEnd = it;
  return;
}
fan.domkit.DragTarget.prototype.dragImage = function()
{
  return this.m_dragImage;
}
fan.domkit.DragTarget.prototype.dragImage$ = function(it)
{
  this.m_dragImage = it;
  return;
}
fan.domkit.DragTarget.prototype.m_cbDrag = null;
fan.domkit.DragTarget.prototype.m_cbDragImage = null;
fan.domkit.DragTarget.prototype.m_cbEnd = null;
fan.domkit.DragTarget.prototype.m_dragImage = null;
fan.domkit.DropTarget = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.DropTarget.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.DropTarget.prototype.$typeof = function() { return fan.domkit.DropTarget.$type; }
fan.domkit.DropTarget.bind = function(elem)
{
  return fan.domkit.DropTarget.make(elem);
}
fan.domkit.DropTarget.make = function(elem) {
  var self = new fan.domkit.DropTarget();
  fan.domkit.DropTarget.make$(self,elem);
  return self;
  }
fan.domkit.DropTarget.make$ = function(self,elem)
{
  var $this = self;
  var pos = elem.style().get("position");
  if ((fan.sys.ObjUtil.compareNE(pos,"relative") || fan.sys.ObjUtil.compareNE(pos,"absolute")))
  {
    elem.style().set("position","relative");
  }
  ;
  elem.onEvent("dragenter",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      e.stop();
      var data = fan.domkit.DndUtil.getData(e.dataTransfer());
      if ($this._canDrop(data))
      {
        elem.style().addClass("domkit-dnd-over");
      }
      ;
      return;
    }));
  elem.onEvent("dragover",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      e.stop();
      if ($this.m_cbOver != null)
      {
        var x = fan.sys.ObjUtil.coerce(e.trap("clientX",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Int.$type);
        var y = fan.sys.ObjUtil.coerce(e.trap("clientY",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),fan.sys.Int.$type);
        $this.m_cbOver.call(fan.graphics.Point.makeInt(x,y));
      }
      ;
      return;
    }));
  elem.onEvent("dragleave",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      if (fan.sys.ObjUtil.equals(e.target(),elem))
      {
        elem.style().removeClass("domkit-dnd-over");
        (function($this) { var $_u169 = $this.m_cbLeave; if ($_u169 == null) return null; return $_u169.call(); })($this);
      }
      ;
      return;
    }));
  elem.onEvent("drop",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      e.stop();
      elem.style().removeClass("domkit-dnd-over");
      var data = fan.domkit.DndUtil.getData(e.dataTransfer());
      if ($this._canDrop(data))
      {
        (function($this) { var $_u170 = $this.m_cbDrop; if ($_u170 == null) return null; return $_u170.call(data); })($this);
      }
      ;
      return;
    }));
  return;
}
fan.domkit.DropTarget.prototype.canDrop = function(f)
{
  this.m_cbCanDrop = f;
  return;
}
fan.domkit.DropTarget.prototype.onDrop = function(f)
{
  this.m_cbDrop = f;
  return;
}
fan.domkit.DropTarget.prototype.onOver = function(f)
{
  this.m_cbOver = f;
  return;
}
fan.domkit.DropTarget.prototype.onLeave = function(f)
{
  this.m_cbLeave = f;
  return;
}
fan.domkit.DropTarget.prototype._canDrop = function(data)
{
  return fan.sys.ObjUtil.coerce((function($this) { if ($this.m_cbCanDrop == null) return fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type); return $this.m_cbCanDrop.call(data); })(this),fan.sys.Bool.$type);
}
fan.domkit.DropTarget.prototype.cbCanDrop = function()
{
  return this.m_cbCanDrop;
}
fan.domkit.DropTarget.prototype.cbCanDrop$ = function(it)
{
  this.m_cbCanDrop = it;
  return;
}
fan.domkit.DropTarget.prototype.cbDrop = function()
{
  return this.m_cbDrop;
}
fan.domkit.DropTarget.prototype.cbDrop$ = function(it)
{
  this.m_cbDrop = it;
  return;
}
fan.domkit.DropTarget.prototype.cbOver = function()
{
  return this.m_cbOver;
}
fan.domkit.DropTarget.prototype.cbOver$ = function(it)
{
  this.m_cbOver = it;
  return;
}
fan.domkit.DropTarget.prototype.cbLeave = function()
{
  return this.m_cbLeave;
}
fan.domkit.DropTarget.prototype.cbLeave$ = function(it)
{
  this.m_cbLeave = it;
  return;
}
fan.domkit.DropTarget.prototype.depth = function()
{
  return this.m_depth;
}
fan.domkit.DropTarget.prototype.depth$ = function(it)
{
  this.m_depth = it;
  return;
}
fan.domkit.DropTarget.prototype.m_cbCanDrop = null;
fan.domkit.DropTarget.prototype.m_cbDrop = null;
fan.domkit.DropTarget.prototype.m_cbOver = null;
fan.domkit.DropTarget.prototype.m_cbLeave = null;
fan.domkit.DropTarget.prototype.m_depth = 0;
fan.domkit.DndUtil = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.DndUtil.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.DndUtil.prototype.$typeof = function() { return fan.domkit.DndUtil.$type; }
fan.domkit.DndUtil.getData = function(dt)
{
  var data = fan.sys.ObjUtil.coerce(fan.domkit.DndUtil.m_dataRef.val(),fan.sys.Unsafe.$type).val();
  if (data != null)
  {
    return fan.sys.ObjUtil.coerce(data,fan.sys.Obj.$type);
  }
  ;
  if (!dt.files().isEmpty())
  {
    return dt.files();
  }
  ;
  return dt.getData("text/plain");
}
fan.domkit.DndUtil.setData = function(dt,data)
{
  fan.domkit.DndUtil.m_dataRef.val$(fan.sys.Unsafe.make(data));
  dt.setData("text/plain",fan.sys.ObjUtil.toStr(data));
  return;
}
fan.domkit.DndUtil.clearData = function(dt)
{
  fan.domkit.DndUtil.m_dataRef.val$(fan.sys.Unsafe.make(null));
  return;
}
fan.domkit.DndUtil.make = function() {
  var self = new fan.domkit.DndUtil();
  fan.domkit.DndUtil.make$(self);
  return self;
  }
fan.domkit.DndUtil.make$ = function(self)
{
  return;
}
fan.domkit.DndUtil.static$init = function()
{
  fan.domkit.DndUtil.m_dataRef = fan.concurrent.AtomicRef.make(fan.sys.Unsafe.make(null));
  return;
}
fan.domkit.DndUtil.m_dataRef = null;
fan.domkit.ButtonGroup = fan.sys.Obj.$extend(fan.sys.Obj);
fan.domkit.ButtonGroup.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_buttons = fan.sys.List.make(fan.dom.Elem.$type);
  this.m_inheritEnabled = true;
  this.m_enabled = true;
  this.m_selIndex = null;
  return;
}
fan.domkit.ButtonGroup.prototype.$typeof = function() { return fan.domkit.ButtonGroup.$type; }
fan.domkit.ButtonGroup.prototype.buttons = function()
{
  return this.m_buttons;
}
fan.domkit.ButtonGroup.prototype.buttons$ = function(it)
{
  this.m_buttons = it;
  this.update();
  return;
}
fan.domkit.ButtonGroup.prototype.add = function(button)
{
  if (this.m_inheritEnabled)
  {
    button.enabled$(fan.sys.ObjUtil.coerce(this.enabled(),fan.sys.Bool.$type.toNullable()));
  }
  ;
  this.buttons$(this.buttons().add(button));
  return this;
}
fan.domkit.ButtonGroup.prototype.inheritEnabled = function()
{
  return this.m_inheritEnabled;
}
fan.domkit.ButtonGroup.prototype.inheritEnabled$ = function(it)
{
  this.m_inheritEnabled = it;
  return;
}
fan.domkit.ButtonGroup.prototype.enabled = function()
{
  return this.m_enabled;
}
fan.domkit.ButtonGroup.prototype.enabled$ = function(it)
{
  var $this = this;
  this.m_enabled = it;
  if (this.m_inheritEnabled)
  {
    this.buttons().each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u172,
      function(b)
      {
        b.enabled$(fan.sys.ObjUtil.coerce($this.m_enabled,fan.sys.Bool.$type.toNullable()));
        return;
      }));
  }
  ;
  return;
}
fan.domkit.ButtonGroup.prototype.selIndex = function()
{
  return this.m_selIndex;
}
fan.domkit.ButtonGroup.prototype.selIndex$ = function(it)
{
  var old = this.m_selIndex;
  var mod = (function($this) { var $_u173 = (function($this) { var $_u174 = $this.m_cbBeforeSelect; if ($_u174 == null) return null; return $_u174.call($this,fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type)); })($this); if ($_u173 != null) return $_u173; return fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()); })(this);
  if (fan.sys.ObjUtil.coerce(mod,fan.sys.Bool.$type))
  {
    this.m_selIndex = it;
  }
  ;
  this.update();
  if (fan.sys.ObjUtil.compareNE(it,old))
  {
    (function($this) { var $_u175 = $this.m_cbSelect; if ($_u175 == null) return null; return $_u175.call($this); })(this);
  }
  ;
  return;
}
fan.domkit.ButtonGroup.prototype.onBeforeSelect = function(f)
{
  this.m_cbBeforeSelect = f;
  return;
}
fan.domkit.ButtonGroup.prototype.onSelect = function(f)
{
  this.m_cbSelect = f;
  return;
}
fan.domkit.ButtonGroup.prototype.select = function(button)
{
  var $this = this;
  this.selIndex$(this.buttons().findIndex(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u176,
    function(b)
    {
      return b === button;
    })));
  return;
}
fan.domkit.ButtonGroup.prototype.update = function()
{
  var $this = this;
  this.buttons().each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u177,
    function(b,i)
    {
      if (fan.sys.ObjUtil.is(b,fan.domkit.ToggleButton.$type))
      {
        var t = fan.sys.ObjUtil.coerce(b,fan.domkit.ToggleButton.$type);
        t.m_group = $this;
        t.selected$(fan.sys.ObjUtil.equals(i,$this.selIndex()));
        return;
      }
      ;
      if (fan.sys.ObjUtil.is(b,fan.domkit.RadioButton.$type))
      {
        var r = fan.sys.ObjUtil.coerce(b,fan.domkit.RadioButton.$type);
        r.m_group = $this;
        r.checked$(fan.sys.ObjUtil.equals(i,$this.selIndex()));
        return;
      }
      ;
      throw fan.sys.ArgErr.make(fan.sys.Str.plus(fan.sys.Str.plus("Invalid button for group '",fan.sys.ObjUtil.$typeof(b)),"'"));
    }));
  return;
}
fan.domkit.ButtonGroup.prototype._event = function()
{
  return this.m__event;
}
fan.domkit.ButtonGroup.prototype._event$ = function(it)
{
  this.m__event = it;
  return;
}
fan.domkit.ButtonGroup.prototype.cbBeforeSelect = function()
{
  return this.m_cbBeforeSelect;
}
fan.domkit.ButtonGroup.prototype.cbBeforeSelect$ = function(it)
{
  this.m_cbBeforeSelect = it;
  return;
}
fan.domkit.ButtonGroup.prototype.cbSelect = function()
{
  return this.m_cbSelect;
}
fan.domkit.ButtonGroup.prototype.cbSelect$ = function(it)
{
  this.m_cbSelect = it;
  return;
}
fan.domkit.ButtonGroup.make = function() {
  var self = new fan.domkit.ButtonGroup();
  fan.domkit.ButtonGroup.make$(self);
  return self;
  }
fan.domkit.ButtonGroup.make$ = function(self)
{
  ;
  return;
}
fan.domkit.ButtonGroup.prototype.m_buttons = null;
fan.domkit.ButtonGroup.prototype.m_inheritEnabled = false;
fan.domkit.ButtonGroup.prototype.m_enabled = false;
fan.domkit.ButtonGroup.prototype.m_selIndex = null;
fan.domkit.ButtonGroup.prototype.m__event = null;
fan.domkit.ButtonGroup.prototype.m_cbBeforeSelect = null;
fan.domkit.ButtonGroup.prototype.m_cbSelect = null;
fan.domkit.FlowBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.FlowBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_halign = fan.domkit.Align.m_left;
  this.m_gaps = fan.sys.List.make(fan.sys.Str.$type);
  return;
}
fan.domkit.FlowBox.prototype.$typeof = function() { return fan.domkit.FlowBox.$type; }
fan.domkit.FlowBox.make = function() {
  var self = new fan.domkit.FlowBox();
  fan.domkit.FlowBox.make$(self);
  return self;
  }
fan.domkit.FlowBox.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  ;
  self.style().addClass("domkit-FlowBox");
  return;
}
fan.domkit.FlowBox.prototype.halign = function()
{
  return this.m_halign;
}
fan.domkit.FlowBox.prototype.halign$ = function(it)
{
  this.m_halign = it;
  this.style().trap("textAlign",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[it.toStr()]));
  return;
}
fan.domkit.FlowBox.prototype.gaps = function()
{
  return this.m_gaps;
}
fan.domkit.FlowBox.prototype.gaps$ = function(it)
{
  this.m_gaps = it;
  this.applyStyle();
  return;
}
fan.domkit.FlowBox.prototype.onAdd = function(c)
{
  this.applyStyle();
  return;
}
fan.domkit.FlowBox.prototype.onRemove = function(c)
{
  this.applyStyle();
  return;
}
fan.domkit.FlowBox.prototype.applyStyle = function()
{
  var $this = this;
  var kids = this.children();
  var text = kids.any(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u178,
    function(kid)
    {
      return fan.sys.ObjUtil.is(kid,fan.domkit.TextField.$type);
    }));
  var lastGap = null;
  kids.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u14,
    function(kid,i)
    {
      var gap = fan.sys.Float.make(0.0);
      if (fan.sys.ObjUtil.compareGT($this.gaps().size(),0))
      {
        var s = $this.gaps().get(fan.sys.Int.mod(i,$this.gaps().size()));
        gap = fan.sys.Num.toFloat(fan.dom.CssDim.fromStr(s).m_val);
        if ((fan.sys.ObjUtil.compareGT(gap,fan.sys.Float.make(0.0)) && fan.sys.ObjUtil.compareLT(i,fan.sys.Int.minus(kids.size(),1))))
        {
          kid.style().set("margin-right",s);
        }
        ;
      }
      ;
      if (fan.sys.ObjUtil.equals(kid.style().effective("width"),"100%"))
      {
        kid.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["auto"]));
      }
      ;
      if ((fan.sys.ObjUtil.compareGT(kids.size(),1) && (fan.sys.ObjUtil.equals(gap,fan.sys.Float.make(-1.0)) || fan.sys.ObjUtil.equals(lastGap,fan.sys.Float.make(-1.0)))))
      {
        if ((fan.sys.ObjUtil.equals(i,0) || fan.sys.ObjUtil.compareGE(lastGap,fan.sys.Float.make(0.0))))
        {
          kid.style().addClass("group-left");
        }
        else
        {
          if ((fan.sys.ObjUtil.compareLT(i,fan.sys.Int.minus(kids.size(),1)) && fan.sys.ObjUtil.equals(gap,fan.sys.Float.make(-1.0))))
          {
            kid.style().removeClass("group-right").addClass("group-middle");
          }
          else
          {
            kid.style().addClass("group-right");
          }
          ;
        }
        ;
      }
      ;
      lastGap = fan.sys.ObjUtil.coerce(gap,fan.sys.Float.$type.toNullable());
      return;
    }));
  return;
}
fan.domkit.FlowBox.prototype.m_halign = null;
fan.domkit.FlowBox.prototype.m_gaps = null;
fan.domkit.Combo = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Combo.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.domkit.Combo.prototype.$typeof = function() { return fan.domkit.Combo.$type; }
fan.domkit.Combo.make = function() {
  var self = new fan.domkit.Combo();
  fan.domkit.Combo.make$(self);
  return self;
  }
fan.domkit.Combo.make$ = function(self)
{
  var $this = self;
  fan.dom.Elem.make$(self,"div");
  self.m_field = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.TextField.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u179,
    function(it)
    {
      it.onEvent("keydown",false,fan.sys.Func.make$closure(
        fan.domkit.$clos$_u0,
        function(e)
        {
          if (fan.sys.ObjUtil.equals(e.key(),fan.dom.Key.m_down))
          {
            e.stop();
            $this.m_button.openPopup();
          }
          ;
          return;
        }));
      return;
    })),fan.domkit.TextField.$type);
  self.m_button = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.domkit.ListButton.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u180,
    function(it)
    {
      it.m_isCombo = true;
      it.onSelect(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u180,
        function(it)
        {
          $this.m_field.val$(fan.sys.ObjUtil.coerce($this.m_button.m_sel.item(),fan.sys.Str.$type));
          $this.m_field.focus();
          $this.m_field.fireModify(null);
          return;
        }));
      return;
    })),fan.domkit.ListButton.$type);
  self.style().addClass("domkit-Combo");
  self.add(self.m_field);
  self.add(self.m_button);
  return;
}
fan.domkit.Combo.prototype.field = function()
{
  return this.m_field;
}
fan.domkit.Combo.prototype.field$ = function(it)
{
  this.m_field = it;
  return;
}
fan.domkit.Combo.prototype.items = function()
{
  return fan.sys.ObjUtil.coerce(this.m_button.items(),fan.sys.Type.find("sys::Str[]"));
}
fan.domkit.Combo.prototype.items$ = function(it)
{
  this.m_button.items$(it);
  return;
}
fan.domkit.Combo.prototype.onElem = function(f)
{
  this.m_button.onElem(f);
  return;
}
fan.domkit.Combo.prototype.enabled = function()
{
  return this.m_field.enabled();
}
fan.domkit.Combo.prototype.enabled$ = function(it)
{
  this.m_field.enabled$((function($this) { var $_u181 = it; $this.m_button.enabled$($_u181); return $_u181; })(this));
  return;
}
fan.domkit.Combo.prototype.update = function(val)
{
  var $this = this;
  this.m_button.m_sel.index$((function($this) { var $_u182 = $this.items().findIndex(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u183,
    function(i)
    {
      return fan.sys.ObjUtil.equals(i,val);
    })); if ($_u182 != null) return $_u182; return fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()); })(this));
  return;
}
fan.domkit.Combo.prototype.button = function()
{
  return this.m_button;
}
fan.domkit.Combo.prototype.button$ = function(it)
{
  this.m_button = it;
  return;
}
fan.domkit.Combo.prototype.m_field = null;
fan.domkit.Combo.prototype.m_items = null;
fan.domkit.Combo.prototype.m_enabled = null;
fan.domkit.Combo.prototype.m_button = null;
fan.domkit.GridBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.GridBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_halign = fan.domkit.Align.m_left;
  this.m_init = true;
  this.m_cstyleMap = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  return;
}
fan.domkit.GridBox.prototype.$typeof = function() { return fan.domkit.GridBox.$type; }
fan.domkit.GridBox.make = function() {
  var self = new fan.domkit.GridBox();
  fan.domkit.GridBox.make$(self);
  return self;
  }
fan.domkit.GridBox.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  ;
  self.m_table = fan.dom.Elem.make("table");
  self.m_tbody = fan.dom.Elem.make("tbody");
  self.m_table.add(self.m_tbody);
  self.style().addClass("domkit-GridBox");
  self.add(self.m_table);
  return;
}
fan.domkit.GridBox.prototype.halign = function()
{
  return this.m_halign;
}
fan.domkit.GridBox.prototype.halign$ = function(it)
{
  var $_u184 = (function($this) { var $_u185 = it; $this.m_halign = $_u185; return $_u185; })(this);
  if (fan.sys.ObjUtil.equals($_u184,fan.domkit.Align.m_left))
  {
    this.m_table.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[null]));
  }
  else if (fan.sys.ObjUtil.equals($_u184,fan.domkit.Align.m_center))
  {
    this.m_table.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 auto"]));
  }
  else if (fan.sys.ObjUtil.equals($_u184,fan.domkit.Align.m_right))
  {
    this.m_table.style().trap("margin",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0 0 0 auto"]));
  }
  else if (fan.sys.ObjUtil.equals($_u184,fan.domkit.Align.m_fill))
  {
    this.m_table.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["100%"]));
  }
  ;
  return;
}
fan.domkit.GridBox.prototype.cellStyle = function(col,row,style)
{
  var $this = this;
  if ((fan.sys.ObjUtil.is(col,fan.sys.Range.$type) && fan.sys.ObjUtil.is(row,fan.sys.Range.$type)))
  {
    fan.sys.ObjUtil.coerce(row,fan.sys.Range.$type).each(fan.sys.Func.make$closure(
      fan.domkit.$clos$_u96,
      function(r)
      {
        fan.sys.ObjUtil.coerce(col,fan.sys.Range.$type).each(fan.sys.Func.make$closure(
          fan.domkit.$clos$_u97,
          function(c)
          {
            $this.m_cstyleMap.set(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())),":"),fan.sys.ObjUtil.coerce(r,fan.sys.Obj.$type.toNullable())),style);
            return;
          }));
        return;
      }));
  }
  else
  {
    if (fan.sys.ObjUtil.is(col,fan.sys.Range.$type))
    {
      fan.sys.ObjUtil.coerce(col,fan.sys.Range.$type).each(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u97,
        function(c)
        {
          $this.m_cstyleMap.set(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())),":"),row),style);
          return;
        }));
    }
    else
    {
      if (fan.sys.ObjUtil.is(row,fan.sys.Range.$type))
      {
        fan.sys.ObjUtil.coerce(row,fan.sys.Range.$type).each(fan.sys.Func.make$closure(
          fan.domkit.$clos$_u96,
          function(r)
          {
            $this.m_cstyleMap.set(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",col),":"),fan.sys.ObjUtil.coerce(r,fan.sys.Obj.$type.toNullable())),style);
            return;
          }));
      }
      else
      {
        this.m_cstyleMap.set(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",col),":"),row),style);
      }
      ;
    }
    ;
  }
  ;
  if (!this.m_init)
  {
    this.updateCellStyle();
  }
  ;
  return this;
}
fan.domkit.GridBox.prototype.numRows = function()
{
  return this.m_tbody.children().size();
}
fan.domkit.GridBox.prototype.addRow = function(cells,colspan)
{
  if (colspan === undefined) colspan = fan.sys.ObjUtil.coerce(fan.sys.Int.$type.emptyList(),fan.sys.Type.find("sys::Int[]"));
  return this._addRow(null,cells,colspan);
}
fan.domkit.GridBox.prototype.insertRowBefore = function(index,cells,colspan)
{
  if (colspan === undefined) colspan = fan.sys.ObjUtil.coerce(fan.sys.Int.$type.emptyList(),fan.sys.Type.find("sys::Int[]"));
  return this._addRow(fan.sys.ObjUtil.coerce(index,fan.sys.Int.$type.toNullable()),cells,colspan);
}
fan.domkit.GridBox.prototype._addRow = function(at,cells,colspan)
{
  if (colspan === undefined) colspan = fan.sys.ObjUtil.coerce(fan.sys.Int.$type.emptyList(),fan.sys.Type.find("sys::Int[]"));
  var $this = this;
  var r = this.m_tbody.children().size();
  var cx = 0;
  var tr = fan.dom.Elem.make("tr");
  cells.each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u186,
    function(elem,c)
    {
      var td = fan.dom.Elem.make("td");
      var cs = colspan.getSafe(c);
      if (cs != null)
      {
        td.set("colspan",fan.sys.Int.toStr(fan.sys.ObjUtil.coerce(cs,fan.sys.Int.$type)));
      }
      ;
      $this.applyCellStyle(fan.sys.Int.plus(c,cx),r,td);
      if (elem != null)
      {
        td.add(fan.sys.ObjUtil.coerce(elem,fan.dom.Elem.$type));
      }
      ;
      cx = fan.sys.Int.plus(cx,(function($this) { if (cs == null) return 0; return fan.sys.Int.minus(fan.sys.ObjUtil.coerce(cs,fan.sys.Int.$type),1); })($this));
      tr.add(td);
      return;
    }));
  if (at == null)
  {
    this.m_tbody.add(tr);
  }
  else
  {
    this.m_tbody.insertBefore(tr,this.m_tbody.children().get(fan.sys.ObjUtil.coerce(at,fan.sys.Int.$type)));
  }
  ;
  this.m_init = false;
  return this;
}
fan.domkit.GridBox.prototype.rowIndexOf = function(child)
{
  var $this = this;
  return this.m_tbody.children().findIndex(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u188,
    function(row)
    {
      return row.containsChild(child);
    }));
}
fan.domkit.GridBox.prototype.removeRow = function(index)
{
  var row = this.m_tbody.children().getSafe(index);
  if (row != null)
  {
    this.m_tbody.removeChild(fan.sys.ObjUtil.coerce(row,fan.dom.Elem.$type));
  }
  ;
  return this;
}
fan.domkit.GridBox.prototype.removeAllRows = function()
{
  this.m_tbody.removeAll();
  return this;
}
fan.domkit.GridBox.prototype.updateCellStyle = function()
{
  var $this = this;
  this.m_tbody.children().each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u189,
    function(tr,r)
    {
      tr.children().each(fan.sys.Func.make$closure(
        fan.domkit.$clos$_u190,
        function(td,c)
        {
          $this.applyCellStyle(c,r,td);
          return;
        }));
      return;
    }));
  return;
}
fan.domkit.GridBox.prototype.applyCellStyle = function(c,r,td)
{
  this.setCellStyle("*:*",td);
  var calt = (function($this) { if (fan.sys.Int.isOdd(c)) return "odd"; return "even"; })(this);
  var ralt = (function($this) { if (fan.sys.Int.isOdd(r)) return "odd"; return "even"; })(this);
  this.setCellStyle(fan.sys.Str.plus("*:",ralt),td);
  this.setCellStyle(fan.sys.Str.plus(fan.sys.Str.plus("",calt),":*"),td);
  this.setCellStyle(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",calt),":"),ralt),td);
  this.setCellStyle(fan.sys.Str.plus("*:",fan.sys.ObjUtil.coerce(r,fan.sys.Obj.$type.toNullable())),td);
  this.setCellStyle(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",calt),":"),fan.sys.ObjUtil.coerce(r,fan.sys.Obj.$type.toNullable())),td);
  this.setCellStyle(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())),":*"),td);
  this.setCellStyle(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())),":"),ralt),td);
  this.setCellStyle(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())),":"),fan.sys.ObjUtil.coerce(r,fan.sys.Obj.$type.toNullable())),td);
  return;
}
fan.domkit.GridBox.prototype.setCellStyle = function(key,td)
{
  var s = this.m_cstyleMap.get(key);
  if (s != null)
  {
    td.style().setCss(fan.sys.ObjUtil.coerce(s,fan.sys.Str.$type));
  }
  ;
  return;
}
fan.domkit.GridBox.prototype.table = function()
{
  return this.m_table;
}
fan.domkit.GridBox.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.domkit.GridBox.prototype.tbody = function()
{
  return this.m_tbody;
}
fan.domkit.GridBox.prototype.tbody$ = function(it)
{
  this.m_tbody = it;
  return;
}
fan.domkit.GridBox.prototype.init = function()
{
  return this.m_init;
}
fan.domkit.GridBox.prototype.init$ = function(it)
{
  this.m_init = it;
  return;
}
fan.domkit.GridBox.prototype.cstyleMap = function()
{
  return this.m_cstyleMap;
}
fan.domkit.GridBox.prototype.cstyleMap$ = function(it)
{
  this.m_cstyleMap = it;
  return;
}
fan.domkit.GridBox.prototype.m_halign = null;
fan.domkit.GridBox.prototype.m_table = null;
fan.domkit.GridBox.prototype.m_tbody = null;
fan.domkit.GridBox.prototype.m_init = false;
fan.domkit.GridBox.prototype.m_cstyleMap = null;
fan.domkit.FlipBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.FlipBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.domkit.FlipBox.prototype.$typeof = function() { return fan.domkit.FlipBox.$type; }
fan.domkit.FlipBox.make = function() {
  var self = new fan.domkit.FlipBox();
  fan.domkit.FlipBox.make$(self);
  return self;
  }
fan.domkit.FlipBox.make$ = function(self)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  self.style().addClass("domkit-FlipBox");
  self.add((function($this) { var $_u193 = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.style().addClass("domkit-FlipBox-card");
      return;
    })),fan.dom.Elem.$type); $this.m_card = $_u193; return $_u193; })(self));
  return;
}
fan.domkit.FlipBox.prototype.front = function()
{
  return this.m_card.children().getSafe(0);
}
fan.domkit.FlipBox.prototype.front$ = function(it)
{
  this.m_card.add(fan.sys.ObjUtil.coerce(it,fan.dom.Elem.$type));
  it.style().addClass("domkit-FlipBox-front");
  return;
}
fan.domkit.FlipBox.prototype.back = function()
{
  return this.m_card.children().getSafe(1);
}
fan.domkit.FlipBox.prototype.back$ = function(it)
{
  this.m_card.add(fan.sys.ObjUtil.coerce(it,fan.dom.Elem.$type));
  it.style().addClass("domkit-FlipBox-back");
  return;
}
fan.domkit.FlipBox.prototype.flip = function(onComplete)
{
  if (onComplete === undefined) onComplete = null;
  var $this = this;
  this.m_card.style().toggleClass("flip");
  if (onComplete != null)
  {
    fan.dom.Win.cur().setTimeout(fan.sys.Duration.fromStr("500ms"),fan.sys.Func.make$closure(
      fan.domkit.$clos$_u1,
      function()
      {
        onComplete.call($this);
        return;
      }));
  }
  ;
  return;
}
fan.domkit.FlipBox.prototype.isFront = function()
{
  return !this.isBack();
}
fan.domkit.FlipBox.prototype.isBack = function()
{
  return this.m_card.style().hasClass("flip");
}
fan.domkit.FlipBox.prototype.toFront = function()
{
  if (this.isBack())
  {
    this.flip();
  }
  ;
  return this;
}
fan.domkit.FlipBox.prototype.toBack = function()
{
  if (this.isFront())
  {
    this.flip();
  }
  ;
  return this;
}
fan.domkit.FlipBox.prototype.card = function()
{
  return this.m_card;
}
fan.domkit.FlipBox.prototype.card$ = function(it)
{
  this.m_card = it;
  return;
}
fan.domkit.FlipBox.prototype.m_front = null;
fan.domkit.FlipBox.prototype.m_back = null;
fan.domkit.FlipBox.prototype.m_card = null;
fan.domkit.Sheet = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.Sheet.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_canDismiss = false;
  this.m_delay = null;
  return;
}
fan.domkit.Sheet.prototype.$typeof = function() { return fan.domkit.Sheet.$type; }
fan.domkit.Sheet.make = function() {
  var self = new fan.domkit.Sheet();
  fan.domkit.Sheet.make$(self);
  return self;
  }
fan.domkit.Sheet.make$ = function(self)
{
  var $this = self;
  fan.domkit.Box.make$(self);
  ;
  self.m_uid = fan.sys.ObjUtil.coerce(fan.domkit.Sheet.m_nextId.val(),fan.sys.Int.$type);
  fan.domkit.Sheet.m_nextId.val$(fan.sys.ObjUtil.coerce(fan.sys.Int.plus(self.m_uid,1),fan.sys.Obj.$type.toNullable()));
  self.trap("tabIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]));
  self.style().addClass("domkit-Sheet");
  self.onEvent("mousedown",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u0,
    function(e)
    {
      e.stop();
      if ($this.m_canDismiss)
      {
        $this.close();
      }
      ;
      return;
    }));
  return;
}
fan.domkit.Sheet.prototype.canDismiss = function()
{
  return this.m_canDismiss;
}
fan.domkit.Sheet.prototype.canDismiss$ = function(it)
{
  this.m_canDismiss = it;
  return;
}
fan.domkit.Sheet.prototype.isOpen = function()
{
  return this.m_isOpen;
}
fan.domkit.Sheet.prototype.isOpen$ = function(it)
{
  this.m_isOpen = it;
  return;
}
fan.domkit.Sheet.prototype.delay = function()
{
  return this.m_delay;
}
fan.domkit.Sheet.prototype.delay$ = function(it)
{
  this.m_delay = it;
  return;
}
fan.domkit.Sheet.prototype.onBeforeOpen = function()
{
  return;
}
fan.domkit.Sheet.prototype.onKeyDown = function(f)
{
  this.m_cbKeyDown = f;
  return;
}
fan.domkit.Sheet.prototype.open = function(parent,height)
{
  var $this = this;
  if (this.m_isOpen)
  {
    return this;
  }
  ;
  var ppos = parent.pagePos();
  this.style().setAll(fan.sys.Map.fromLiteral(["left","top","width","height"],[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(ppos.m_x,fan.sys.Obj.$type.toNullable())),"px"),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(ppos.m_y,fan.sys.Obj.$type.toNullable())),"px"),fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(parent.size().m_w,fan.sys.Obj.$type.toNullable())),"px"),"0px"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  var body = fan.dom.Win.cur().doc().body();
  body.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.dom.Elem.make(),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      it.id$(fan.sys.Str.plus("domkitSheet-mask-",fan.sys.ObjUtil.coerce($this.m_uid,fan.sys.Obj.$type.toNullable())));
      it.style().addClass("domkit-Sheet-mask");
      if ($this.m_canDismiss)
      {
        it.onEvent("keydown",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            e.stop();
            $this.close();
            return;
          }));
        it.onEvent("mousedown",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            e.stop();
            $this.close();
            return;
          }));
      }
      else
      {
        it.onEvent("keydown",false,fan.sys.Func.make$closure(
          fan.domkit.$clos$_u0,
          function(e)
          {
            (function($this) { var $_u194 = $this.m_cbKeyDown; if ($_u194 == null) return null; return $_u194.call(e); })($this);
            return;
          }));
      }
      ;
      it.add($this);
      return;
    })),fan.dom.Elem.$type));
  this.onBeforeOpen();
  var opts = (function($this) { if ($this.m_delay == null) return null; return fan.sys.Map.fromLiteral(["transition-delay"],[$this.m_delay],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Duration?")); })(this);
  this.transition(fan.sys.Map.fromLiteral(["height"],[height],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),opts,fan.sys.Duration.fromStr("250ms"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      $this.focus();
      $this.fireOpen(null);
      return;
    }));
  return this;
}
fan.domkit.Sheet.prototype.close = function(f)
{
  if (f === undefined) f = null;
  var $this = this;
  if (f != null)
  {
    this.m_cbClose = f;
  }
  ;
  this.transition(fan.sys.Map.fromLiteral(["height"],["0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("250ms"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      var mask = fan.dom.Win.cur().doc().elemById(fan.sys.Str.plus("domkitSheet-mask-",fan.sys.ObjUtil.coerce($this.m_uid,fan.sys.Obj.$type.toNullable())));
      var parent = (function($this) { var $_u196 = mask; if ($_u196 == null) return null; return $_u196.parent(); })($this);
      if (parent != null)
      {
        parent.remove(fan.sys.ObjUtil.coerce(mask,fan.dom.Elem.$type));
        (function($this) { var $_u197 = parent.querySelector("input"); if ($_u197 == null) return null; return $_u197.focus(); })($this);
      }
      ;
      $this.fireClose(null);
      return;
    }));
  return;
}
fan.domkit.Sheet.prototype.onOpen = function(f)
{
  this.m_cbOpen = f;
  return;
}
fan.domkit.Sheet.prototype.onClose = function(f)
{
  this.m_cbClose = f;
  return;
}
fan.domkit.Sheet.prototype.fireOpen = function(e)
{
  (function($this) { var $_u198 = $this.m_cbOpen; if ($_u198 == null) return null; return $_u198.call($this); })(this);
  this.m_isOpen = true;
  return;
}
fan.domkit.Sheet.prototype.fireClose = function(e)
{
  (function($this) { var $_u199 = $this.m_cbClose; if ($_u199 == null) return null; return $_u199.call($this); })(this);
  this.m_isOpen = false;
  return;
}
fan.domkit.Sheet.prototype.cbOpen = function()
{
  return this.m_cbOpen;
}
fan.domkit.Sheet.prototype.cbOpen$ = function(it)
{
  this.m_cbOpen = it;
  return;
}
fan.domkit.Sheet.prototype.cbClose = function()
{
  return this.m_cbClose;
}
fan.domkit.Sheet.prototype.cbClose$ = function(it)
{
  this.m_cbClose = it;
  return;
}
fan.domkit.Sheet.prototype.cbKeyDown = function()
{
  return this.m_cbKeyDown;
}
fan.domkit.Sheet.prototype.cbKeyDown$ = function(it)
{
  this.m_cbKeyDown = it;
  return;
}
fan.domkit.Sheet.static$init = function()
{
  fan.domkit.Sheet.m_nextId = fan.concurrent.AtomicRef.make(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()));
  return;
}
fan.domkit.Sheet.prototype.m_canDismiss = false;
fan.domkit.Sheet.prototype.m_isOpen = false;
fan.domkit.Sheet.prototype.m_delay = null;
fan.domkit.Sheet.prototype.m_uid = 0;
fan.domkit.Sheet.m_nextId = null;
fan.domkit.Sheet.prototype.m_cbOpen = null;
fan.domkit.Sheet.prototype.m_cbClose = null;
fan.domkit.Sheet.prototype.m_cbKeyDown = null;
fan.domkit.CardBox = fan.sys.Obj.$extend(fan.domkit.Box);
fan.domkit.CardBox.prototype.$ctor = function()
{
  fan.domkit.Box.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_effect = null;
  this.m_effectDur = fan.sys.Duration.fromStr("350ms");
  return;
}
fan.domkit.CardBox.prototype.$typeof = function() { return fan.domkit.CardBox.$type; }
fan.domkit.CardBox.make = function() {
  var self = new fan.domkit.CardBox();
  fan.domkit.CardBox.make$(self);
  return self;
  }
fan.domkit.CardBox.make$ = function(self)
{
  fan.domkit.Box.make$(self);
  ;
  self.style().addClass("domkit-CardBox");
  return;
}
fan.domkit.CardBox.prototype.selItem = function()
{
  return (function($this) { if ($this.selIndex() == null) return null; return $this.children().get(fan.sys.ObjUtil.coerce($this.selIndex(),fan.sys.Int.$type)); })(this);
}
fan.domkit.CardBox.prototype.selIndex = function()
{
  return this.m_selIndex;
}
fan.domkit.CardBox.prototype.selIndex$ = function(it)
{
  var old = this.m_selIndex;
  this.m_selIndex = fan.sys.ObjUtil.coerce(fan.sys.Int.min(fan.sys.Int.max(fan.sys.ObjUtil.coerce(it,fan.sys.Int.$type),0),this.children().size()),fan.sys.Int.$type.toNullable());
  if (fan.sys.ObjUtil.compareNE(old,this.m_selIndex))
  {
    this.updateStyle();
  }
  ;
  return;
}
fan.domkit.CardBox.prototype.effect = function()
{
  return this.m_effect;
}
fan.domkit.CardBox.prototype.effect$ = function(it)
{
  this.m_effect = it;
  return;
}
fan.domkit.CardBox.prototype.effectDur = function()
{
  return this.m_effectDur;
}
fan.domkit.CardBox.prototype.effectDur$ = function(it)
{
  this.m_effectDur = it;
  return;
}
fan.domkit.CardBox.prototype.onAdd = function(c)
{
  this.updateStyle();
  return;
}
fan.domkit.CardBox.prototype.onRemove = function(c)
{
  this.updateStyle();
  return;
}
fan.domkit.CardBox.prototype.updateStyle = function()
{
  var $this = this;
  var kids = this.children();
  if ((fan.sys.ObjUtil.compareGT(kids.size(),0) && this.selIndex() == null))
  {
    this.selIndex$(fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
  }
  ;
  var fx = this.m_effect;
  var cur = kids.find(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u61,
    function(k)
    {
      return fan.sys.ObjUtil.equals(k.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[])),"block");
    }));
  var next = (function($this) { if (fx == null) return null; return $this.children().get(fan.sys.ObjUtil.coerce($this.selIndex(),fan.sys.Int.$type)); })(this);
  var size = (function($this) { if (fx == null) return null; return $this.size(); })(this);
  if (cur == null)
  {
    cur = next;
  }
  ;
  if (cur === next)
  {
    fx = null;
    next = null;
  }
  ;
  var curIndex = kids.findIndex(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u61,
    function(k)
    {
      return fan.sys.ObjUtil.equals(k,cur);
    }));
  if ((fx != null && !fan.dom.Win.cur().doc().body().containsChild(this)))
  {
    fx = null;
    next = null;
  }
  ;
  var $_u203 = fx;
  if (fan.sys.ObjUtil.equals($_u203,"slideLeft"))
  {
    var cy = (function($this) { if (fan.sys.ObjUtil.compareGT(curIndex,$this.selIndex())) return fan.sys.Str.plus(fan.sys.Str.plus("-",fan.sys.ObjUtil.coerce(size.m_h,fan.sys.Obj.$type.toNullable())),"px"); return "0px"; })(this);
    var ny = (function($this) { if (fan.sys.ObjUtil.compareLT(curIndex,$this.selIndex())) return fan.sys.Str.plus(fan.sys.Str.plus("-",fan.sys.ObjUtil.coerce(size.m_h,fan.sys.Obj.$type.toNullable())),"px"); return "0px"; })(this);
    cur.style().trap("transform",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("translateX(0) translateY(",cy),")")]));
    next.style().trap("transform",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("translateX(",fan.sys.ObjUtil.coerce(size.m_w,fan.sys.Obj.$type.toNullable())),"px) translateY("),ny),")")]));
    next.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
    cur.transition(fan.sys.Map.fromLiteral(["transform","opacity"],[fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("translateX(-",fan.sys.ObjUtil.coerce(size.m_w,fan.sys.Obj.$type.toNullable())),"px) translateY("),cy),")"),"0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,this.m_effectDur);
    next.transition(fan.sys.Map.fromLiteral(["transform"],[fan.sys.Str.plus(fan.sys.Str.plus("translateX(0px) translateY(",ny),")")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,this.m_effectDur,fan.sys.Func.make$closure(
      fan.domkit.$clos$_u8,
      function(it)
      {
        $this.updateDis();
        return;
      }));
  }
  else if (fan.sys.ObjUtil.equals($_u203,"slideRight"))
  {
    var cy = (function($this) { if (fan.sys.ObjUtil.compareGT(curIndex,$this.selIndex())) return fan.sys.Str.plus(fan.sys.Str.plus("-",fan.sys.ObjUtil.coerce(size.m_h,fan.sys.Obj.$type.toNullable())),"px"); return "0px"; })(this);
    var ny = (function($this) { if (fan.sys.ObjUtil.compareLT(curIndex,$this.selIndex())) return fan.sys.Str.plus(fan.sys.Str.plus("-",fan.sys.ObjUtil.coerce(size.m_h,fan.sys.Obj.$type.toNullable())),"px"); return "0px"; })(this);
    cur.style().trap("transform",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("translateX(0) translateY(",cy),")")]));
    next.style().trap("transform",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("translateX(-",fan.sys.ObjUtil.coerce(size.m_w,fan.sys.Obj.$type.toNullable())),"px) translateY("),ny),")")]));
    next.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["block"]));
    cur.transition(fan.sys.Map.fromLiteral(["transform","opacity"],[fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("translateX(",fan.sys.ObjUtil.coerce(size.m_w,fan.sys.Obj.$type.toNullable())),"px) translateY("),cy),")"),"0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,this.m_effectDur);
    next.transition(fan.sys.Map.fromLiteral(["transform"],[fan.sys.Str.plus(fan.sys.Str.plus("translateX(0px) translateY(",ny),")")],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,this.m_effectDur,fan.sys.Func.make$closure(
      fan.domkit.$clos$_u8,
      function(it)
      {
        $this.updateDis();
        return;
      }));
  }
  else
  {
    this.updateDis();
  }
  ;
  return;
}
fan.domkit.CardBox.prototype.updateDis = function()
{
  var $this = this;
  this.children().each(fan.sys.Func.make$closure(
    fan.domkit.$clos$_u14,
    function(kid,i)
    {
      kid.style().trap("display",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[(function($this) { if (fan.sys.ObjUtil.equals(i,$this.selIndex())) return "block"; return "none"; })($this)]));
      kid.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["1.0"]));
      kid.transition(fan.sys.Map.fromLiteral(["transform"],["translateX(0) translateY(0)"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("0ns"));
      return;
    }));
  return;
}
fan.domkit.CardBox.prototype.m_selIndex = null;
fan.domkit.CardBox.prototype.m_effect = null;
fan.domkit.CardBox.prototype.m_effectDur = null;
fan.domkit.ProgressBar = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.ProgressBar.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_min = 0;
  this.m_max = 100;
  this.m_val = 0;
  return;
}
fan.domkit.ProgressBar.prototype.$typeof = function() { return fan.domkit.ProgressBar.$type; }
fan.domkit.ProgressBar.make = function(f) {
  var self = new fan.domkit.ProgressBar();
  fan.domkit.ProgressBar.make$(self,f);
  return self;
  }
fan.domkit.ProgressBar.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.dom.Elem.make$(self,"div");
  ;
  self.style().addClass("domkit-control domkit-control-button domkit-ProgressBar");
  if (f != null)
  {
    f.call(self);
  }
  ;
  self.update();
  return;
}
fan.domkit.ProgressBar.prototype.min = function()
{
  return this.m_min;
}
fan.domkit.ProgressBar.prototype.min$ = function(it)
{
  this.m_min = it;
  this.update();
  return;
}
fan.domkit.ProgressBar.prototype.max = function()
{
  return this.m_max;
}
fan.domkit.ProgressBar.prototype.max$ = function(it)
{
  this.m_max = it;
  this.update();
  return;
}
fan.domkit.ProgressBar.prototype.val = function()
{
  return this.m_val;
}
fan.domkit.ProgressBar.prototype.val$ = function(it)
{
  this.m_val = fan.sys.Int.min(fan.sys.Int.max(it,this.min()),this.max());
  this.update();
  return;
}
fan.domkit.ProgressBar.prototype.onText = function(f)
{
  this.m_cbText = f;
  return;
}
fan.domkit.ProgressBar.prototype.onBarColor = function(f)
{
  this.m_cbBarColor = f;
  return;
}
fan.domkit.ProgressBar.prototype.update = function()
{
  this.text$(fan.sys.ObjUtil.coerce((function($this) { if ($this.m_cbText == null) return ""; return $this.m_cbText.call($this); })(this),fan.sys.Str.$type));
  var color = (function($this) { if ($this.m_cbBarColor == null) return "#3498db"; return $this.m_cbBarColor.call($this); })(this);
  var offset = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.val(),this.min()),fan.sys.Num.$type)),fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.minus(this.max(),this.min()),fan.sys.Num.$type))),fan.sys.Float.make(100.0)),fan.sys.Num.$type));
  this.style().trap("background",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("linear-gradient(left, ",color)," "),fan.sys.ObjUtil.coerce(offset,fan.sys.Obj.$type.toNullable())),"%, "),color)," "),fan.sys.ObjUtil.coerce(offset,fan.sys.Obj.$type.toNullable())),"%, #fff "),fan.sys.ObjUtil.coerce(offset,fan.sys.Obj.$type.toNullable())),"%)")]));
  return;
}
fan.domkit.ProgressBar.prototype.cbText = function()
{
  return this.m_cbText;
}
fan.domkit.ProgressBar.prototype.cbText$ = function(it)
{
  this.m_cbText = it;
  return;
}
fan.domkit.ProgressBar.prototype.cbBarColor = function()
{
  return this.m_cbBarColor;
}
fan.domkit.ProgressBar.prototype.cbBarColor$ = function(it)
{
  this.m_cbBarColor = it;
  return;
}
fan.domkit.ProgressBar.prototype.m_min = 0;
fan.domkit.ProgressBar.prototype.m_max = 0;
fan.domkit.ProgressBar.prototype.m_val = 0;
fan.domkit.ProgressBar.prototype.m_cbText = null;
fan.domkit.ProgressBar.prototype.m_cbBarColor = null;
fan.domkit.Tooltip = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Tooltip.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
  this.m_delay = fan.sys.Duration.fromStr("750ms");
  this.m_inNode = false;
  this.m_inTooltip = false;
  return;
}
fan.domkit.Tooltip.prototype.$typeof = function() { return fan.domkit.Tooltip.$type; }
fan.domkit.Tooltip.make = function() {
  var self = new fan.domkit.Tooltip();
  fan.domkit.Tooltip.make$(self);
  return self;
  }
fan.domkit.Tooltip.make$ = function(self)
{
  fan.dom.Elem.make$(self);
  ;
  self.style().addClass("domkit-Popup");
  self.style().trap("zIndex",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(2000,fan.sys.Obj.$type.toNullable())]));
  return;
}
fan.domkit.Tooltip.prototype.delay = function()
{
  return this.m_delay;
}
fan.domkit.Tooltip.prototype.delay$ = function(it)
{
  this.m_delay = it;
  return;
}
fan.domkit.Tooltip.prototype.bind = function(node)
{
  var $this = this;
  if (this.m_node != null)
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Tooltip already bound to ",this.m_node));
  }
  ;
  this.m_node = node;
  node.onEvent("mouseenter",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u84,
    function(it)
    {
      $this.m_inNode = true;
      $this.check();
      return;
    }));
  node.onEvent("mouseleave",false,fan.sys.Func.make$closure(
    fan.domkit.$clos$_u84,
    function(it)
    {
      $this.m_inNode = false;
      $this.check();
      return;
    }));
  return;
}
fan.domkit.Tooltip.prototype.check = function()
{
  var $this = this;
  if (this.m_inNode)
  {
    if (this.m_delay == null)
    {
      if (this.isOpen())
      {
        return;
      }
      ;
      this.open();
    }
    else
    {
      if (this.isOpen())
      {
        return;
      }
      ;
      if (this.m_timerId != null)
      {
        return;
      }
      ;
      this.m_timerId = fan.sys.ObjUtil.coerce(fan.dom.Win.cur().setTimeout(fan.sys.ObjUtil.coerce(this.m_delay,fan.sys.Duration.$type),fan.sys.Func.make$closure(
        fan.domkit.$clos$_u112,
        function(it)
        {
          $this.open();
          return;
        })),fan.sys.Int.$type.toNullable());
    }
    ;
  }
  else
  {
    if (this.isOpen())
    {
      this.close();
      return;
    }
    ;
    if (this.m_timerId != null)
    {
      fan.dom.Win.cur().clearTimeout(fan.sys.ObjUtil.coerce(this.m_timerId,fan.sys.Int.$type));
      this.m_timerId = null;
    }
    ;
  }
  ;
  return;
}
fan.domkit.Tooltip.prototype.isOpen = function()
{
  return this.parent() != null;
}
fan.domkit.Tooltip.prototype.open = function()
{
  this.m_timerId = null;
  var x = this.m_node.pagePos().m_x;
  var y = fan.sys.Float.plusInt(fan.sys.Float.plus(this.m_node.pagePos().m_y,this.m_node.size().m_h),1);
  this.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(x,fan.sys.Obj.$type.toNullable())),"px")]));
  this.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(y,fan.sys.Obj.$type.toNullable())),"px")]));
  this.style().trap("opacity",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),["0"]));
  fan.dom.Win.cur().doc().body().add(this);
  var sz = this.size();
  var vp = fan.dom.Win.cur().viewport();
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plusInt(fan.sys.Float.plusInt(sz.m_w,fan.domkit.Tooltip.m_gutter),fan.domkit.Tooltip.m_gutter),vp.m_w))
  {
    this.style().trap("width",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minusInt(fan.sys.Float.minusInt(vp.m_w,fan.domkit.Tooltip.m_gutter),fan.domkit.Tooltip.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plusInt(fan.sys.Float.plusInt(sz.m_h,fan.domkit.Tooltip.m_gutter),fan.domkit.Tooltip.m_gutter),vp.m_h))
  {
    this.style().trap("height",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minusInt(fan.sys.Float.minusInt(vp.m_h,fan.domkit.Tooltip.m_gutter),fan.domkit.Tooltip.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  sz = this.size();
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plusInt(fan.sys.Float.plus(x,sz.m_w),fan.domkit.Tooltip.m_gutter),vp.m_w))
  {
    this.style().trap("left",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minusInt(fan.sys.Float.minus(vp.m_w,sz.m_w),fan.domkit.Tooltip.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  if (fan.sys.ObjUtil.compareGT(fan.sys.Float.plusInt(fan.sys.Float.plus(y,sz.m_h),fan.domkit.Tooltip.m_gutter),vp.m_h))
  {
    this.style().trap("top",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(fan.sys.Float.minusInt(fan.sys.Float.minus(vp.m_h,sz.m_h),fan.domkit.Tooltip.m_gutter),fan.sys.Obj.$type.toNullable())),"px")]));
  }
  ;
  this.transition(fan.sys.Map.fromLiteral(["opacity"],["1"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"));
  return;
}
fan.domkit.Tooltip.prototype.close = function()
{
  var $this = this;
  this.transition(fan.sys.Map.fromLiteral(["opacity"],["0"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")),null,fan.sys.Duration.fromStr("100ms"),fan.sys.Func.make$closure(
    fan.domkit.$clos$_u8,
    function(it)
    {
      (function($this) { var $_u211 = $this.parent(); if ($_u211 == null) return null; return $_u211.remove($this); })($this);
      return;
    }));
  return;
}
fan.domkit.Tooltip.prototype.node = function()
{
  return this.m_node;
}
fan.domkit.Tooltip.prototype.node$ = function(it)
{
  this.m_node = it;
  return;
}
fan.domkit.Tooltip.prototype.timerId = function()
{
  return this.m_timerId;
}
fan.domkit.Tooltip.prototype.timerId$ = function(it)
{
  this.m_timerId = it;
  return;
}
fan.domkit.Tooltip.prototype.inNode = function()
{
  return this.m_inNode;
}
fan.domkit.Tooltip.prototype.inNode$ = function(it)
{
  this.m_inNode = it;
  return;
}
fan.domkit.Tooltip.prototype.inTooltip = function()
{
  return this.m_inTooltip;
}
fan.domkit.Tooltip.prototype.inTooltip$ = function(it)
{
  this.m_inTooltip = it;
  return;
}
fan.domkit.Tooltip.static$init = function()
{
  fan.domkit.Tooltip.m_gutter = 12;
  return;
}
fan.domkit.Tooltip.prototype.m_delay = null;
fan.domkit.Tooltip.m_gutter = 0;
fan.domkit.Tooltip.prototype.m_node = null;
fan.domkit.Tooltip.prototype.m_timerId = null;
fan.domkit.Tooltip.prototype.m_inNode = false;
fan.domkit.Tooltip.prototype.m_inTooltip = false;
fan.domkit.Align = fan.sys.Obj.$extend(fan.sys.Enum);
fan.domkit.Align.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.Align.prototype.$typeof = function() { return fan.domkit.Align.$type; }
fan.domkit.Align.make = function($ordinal,$name) {
  var self = new fan.domkit.Align();
  fan.domkit.Align.make$(self,$ordinal,$name);
  return self;
  }
fan.domkit.Align.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.domkit.Align.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.domkit.Align.$type,$name,checked),fan.domkit.Align.$type.toNullable());
}
fan.domkit.Align.static$init = function()
{
  fan.domkit.Align.m_top = fan.domkit.Align.make(0,"top");
  fan.domkit.Align.m_left = fan.domkit.Align.make(1,"left");
  fan.domkit.Align.m_bottom = fan.domkit.Align.make(2,"bottom");
  fan.domkit.Align.m_right = fan.domkit.Align.make(3,"right");
  fan.domkit.Align.m_center = fan.domkit.Align.make(4,"center");
  fan.domkit.Align.m_fill = fan.domkit.Align.make(5,"fill");
  fan.domkit.Align.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u212 = fan.sys.List.make(fan.domkit.Align.$type, [fan.domkit.Align.m_top,fan.domkit.Align.m_left,fan.domkit.Align.m_bottom,fan.domkit.Align.m_right,fan.domkit.Align.m_center,fan.domkit.Align.m_fill]); if ($_u212 == null) return null; return fan.sys.ObjUtil.toImmutable($_u212); })(this),fan.sys.Type.find("domkit::Align[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.domkit.Align.m_top = null;
fan.domkit.Align.m_left = null;
fan.domkit.Align.m_bottom = null;
fan.domkit.Align.m_right = null;
fan.domkit.Align.m_center = null;
fan.domkit.Align.m_fill = null;
fan.domkit.Align.m_vals = null;
fan.domkit.Dir = fan.sys.Obj.$extend(fan.sys.Enum);
fan.domkit.Dir.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.domkit.Dir.prototype.$typeof = function() { return fan.domkit.Dir.$type; }
fan.domkit.Dir.make = function($ordinal,$name) {
  var self = new fan.domkit.Dir();
  fan.domkit.Dir.make$(self,$ordinal,$name);
  return self;
  }
fan.domkit.Dir.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.domkit.Dir.fromStr = function($name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.domkit.Dir.$type,$name,checked),fan.domkit.Dir.$type.toNullable());
}
fan.domkit.Dir.static$init = function()
{
  fan.domkit.Dir.m_up = fan.domkit.Dir.make(0,"up");
  fan.domkit.Dir.m_down = fan.domkit.Dir.make(1,"down");
  fan.domkit.Dir.m_left = fan.domkit.Dir.make(2,"left");
  fan.domkit.Dir.m_right = fan.domkit.Dir.make(3,"right");
  fan.domkit.Dir.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u213 = fan.sys.List.make(fan.domkit.Dir.$type, [fan.domkit.Dir.m_up,fan.domkit.Dir.m_down,fan.domkit.Dir.m_left,fan.domkit.Dir.m_right]); if ($_u213 == null) return null; return fan.sys.ObjUtil.toImmutable($_u213); })(this),fan.sys.Type.find("domkit::Dir[]"));
  if (true)
  {
  }
  ;
  return;
}
fan.domkit.Dir.m_up = null;
fan.domkit.Dir.m_down = null;
fan.domkit.Dir.m_left = null;
fan.domkit.Dir.m_right = null;
fan.domkit.Dir.m_vals = null;
fan.domkit.Label = fan.sys.Obj.$extend(fan.dom.Elem);
fan.domkit.Label.prototype.$ctor = function()
{
  fan.dom.Elem.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.domkit.Label.prototype.$typeof = function() { return fan.domkit.Label.$type; }
fan.domkit.Label.make = function() {
  var self = new fan.domkit.Label();
  fan.domkit.Label.make$(self);
  return self;
  }
fan.domkit.Label.make$ = function(self)
{
  fan.dom.Elem.make$(self,"span");
  self.style().addClass("domkit-control domkit-Label");
  return;
}
fan.domkit.$pod = fan.sys.Pod.$add('domkit');
with (fan.domkit.$pod)
{
  fan.domkit.Button.$type = $at('Button','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.ToggleButton.$type = $at('ToggleButton','domkit::Button',[],{'sys::Js':""},8192);
  fan.domkit.Box.$type = $at('Box','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.SashBox.$type = $at('SashBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.TextField.$type = $at('TextField','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.RadioButton.$type = $at('RadioButton','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.ListButton.$type = $at('ListButton','domkit::Button',[],{'sys::Js':""},8192);
  fan.domkit.Selection.$type = $at('Selection','sys::Obj',[],{'sys::Js':""},8193);
  fan.domkit.IndexSelection.$type = $at('IndexSelection','domkit::Selection',[],{'sys::NoDoc':"",'sys::Js':""},8193);
  fan.domkit.ListButtonSelection.$type = $at('ListButtonSelection','domkit::IndexSelection',[],{'sys::Js':""},128);
  fan.domkit.TreeNode.$type = $at('TreeNode','sys::Obj',[],{'sys::Js':""},8193);
  fan.domkit.TreeFlags.$type = $at('TreeFlags','sys::Obj',[],{'sys::Js':""},8194);
  fan.domkit.TreeEvent.$type = $at('TreeEvent','sys::Obj',[],{'sys::Js':""},8192);
  fan.domkit.Tree.$type = $at('Tree','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.TreeSelection.$type = $at('TreeSelection','domkit::Selection',[],{'sys::Js':""},128);
  fan.domkit.Dialog.$type = $at('Dialog','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.Popup.$type = $at('Popup','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.Menu.$type = $at('Menu','domkit::Popup',[],{'sys::Js':""},8192);
  fan.domkit.MenuItem.$type = $at('MenuItem','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.FilePicker.$type = $at('FilePicker','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.FlexBox.$type = $at('FlexBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.Table.$type = $at('Table','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.TablePos.$type = $at('TablePos','sys::Obj',[],{'sys::Js':""},130);
  fan.domkit.TableModel.$type = $at('TableModel','sys::Obj',[],{'sys::Js':""},8192);
  fan.domkit.TableFlags.$type = $at('TableFlags','sys::Obj',[],{'sys::Js':""},8194);
  fan.domkit.TableEvent.$type = $at('TableEvent','sys::Obj',[],{'sys::Js':""},8192);
  fan.domkit.TableSelection.$type = $at('TableSelection','domkit::IndexSelection',[],{'sys::Js':""},128);
  fan.domkit.TableView.$type = $at('TableView','domkit::TableModel',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.domkit.ScrollBox.$type = $at('ScrollBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.WellBox.$type = $at('WellBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.DomListener.$type = $at('DomListener','sys::Obj',[],{'sys::Js':""},8192);
  fan.domkit.DomState.$type = $at('DomState','sys::Obj',[],{'sys::Js':""},128);
  fan.domkit.Checkbox.$type = $at('Checkbox','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.TextArea.$type = $at('TextArea','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.AccordionBox.$type = $at('AccordionBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.Link.$type = $at('Link','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.DragTarget.$type = $at('DragTarget','sys::Obj',[],{'sys::Js':""},8192);
  fan.domkit.DropTarget.$type = $at('DropTarget','sys::Obj',[],{'sys::Js':""},8192);
  fan.domkit.DndUtil.$type = $at('DndUtil','sys::Obj',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.domkit.ButtonGroup.$type = $at('ButtonGroup','sys::Obj',[],{'sys::Js':""},8192);
  fan.domkit.FlowBox.$type = $at('FlowBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.Combo.$type = $at('Combo','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.GridBox.$type = $at('GridBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.FlipBox.$type = $at('FlipBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.Sheet.$type = $at('Sheet','domkit::Box',[],{'sys::NoDoc':"",'sys::Js':""},8192);
  fan.domkit.CardBox.$type = $at('CardBox','domkit::Box',[],{'sys::Js':""},8192);
  fan.domkit.ProgressBar.$type = $at('ProgressBar','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.Tooltip.$type = $at('Tooltip','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.Align.$type = $at('Align','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.domkit.Dir.$type = $at('Dir','sys::Enum',[],{'sys::Js':"",'sys::Serializable':"sys::Serializable{simple=true;}"},8234);
  fan.domkit.Label.$type = $at('Label','dom::Elem',[],{'sys::Js':""},8192);
  fan.domkit.Button.$type.$af('popupOffset',73728,'graphics::Point',{'sys::NoDoc':""}).$af('enabled',271360,'sys::Bool?',{}).$af('isCombo',65664,'sys::Bool',{}).$af('mouseDown',65664,'sys::Bool',{}).$af('_event',73728,'dom::Event?',{'sys::NoDoc':""}).$af('popup',67584,'domkit::Popup?',{}).$af('cbAction',67584,'sys::Func?',{}).$af('cbPopup',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onPopup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::Button->domkit::Popup|',false)]),{}).$am('removeOnPopup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('openPopup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('showDown',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('showUp',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doMouseDown',262272,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doMouseUp',262272,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fireAction',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.ToggleButton.$type.$af('selected',73728,'sys::Bool',{}).$af('elemOn',73728,'sys::Obj?',{}).$af('elemOff',73728,'sys::Obj?',{}).$af('group',65664,'domkit::ButtonGroup?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doMouseUp',263296,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Box.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.SashBox.$type.$af('dir',73728,'domkit::Dir',{}).$af('resizable',73728,'sys::Bool',{}).$af('sizes',73728,'sys::Str[]',{}).$af('minSize',73728,'sys::Str',{}).$af('dims',67584,'dom::CssDim[]',{}).$af('active',67584,'sys::Bool',{}).$af('resizeIndex',67584,'sys::Int?',{}).$af('pivoff',67584,'sys::Float?',{}).$af('splitter',67584,'dom::Elem?',{}).$af('cbSashResize',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSashResize',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('div',40962,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onAdd',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('onRemove',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('applyStyle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onMouseDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onMouseUp',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onMouseMove',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('toDiv',2048,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem?',false)]),{}).$am('applyResize',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('delta','sys::Float',false)]),{}).$am('sizesToPercent',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""});
  fan.domkit.TextField.$type.$af('cols',8192,'sys::Int?',{}).$af('placeholder',8192,'sys::Str?',{}).$af('ro',8192,'sys::Bool',{}).$af('password',8192,'sys::Bool',{}).$af('val',8192,'sys::Str',{}).$af('cbAction',67584,'sys::Func?',{}).$af('cbModify',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onModify',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('select',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('end','sys::Int',false)]),{}).$am('fireAction',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event?',false)]),{}).$am('fireModify',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event?',false)]),{}).$am('checkUpdate',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.RadioButton.$type.$af('checked',8192,'sys::Bool',{}).$af('cbAction',67584,'sys::Func?',{}).$af('group',65664,'domkit::ButtonGroup?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('wrap',8192,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('content','sys::Obj',false)]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireAction',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.ListButton.$type.$af('items',73728,'sys::Obj[]',{}).$af('sel',73728,'domkit::Selection',{}).$af('cbSelect',67584,'sys::Func?',{}).$af('cbElem',67584,'sys::Func?',{}).$af('find',67584,'sys::Str',{}).$af('menu',67584,'domkit::Menu?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onElem',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj->sys::Obj|',false)]),{}).$am('update',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fireSelect',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeListbox',2048,'domkit::Popup',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeElem',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('onMenuKeyDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.Selection.$type.$af('enabled',73728,'sys::Bool',{}).$af('multi',73728,'sys::Bool',{}).$af('item',270337,'sys::Obj?',{}).$af('items',270337,'sys::Obj[]',{}).$af('index',270337,'sys::Int?',{}).$af('indexes',270337,'sys::Int[]',{}).$am('isEmpty',270337,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',270337,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refresh',262272,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.IndexSelection.$type.$af('item',271360,'sys::Obj?',{}).$af('items',271360,'sys::Obj[]',{}).$af('index',271360,'sys::Int?',{}).$af('indexes',336896,'sys::Int[]',{}).$am('isEmpty',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refresh',263296,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('max',266241,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toItem',266241,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('toIndex',266241,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('onUpdate',266241,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('oldIndexes','sys::Int[]',false),new fan.sys.Param('newIndexes','sys::Int[]',false)]),{}).$am('checkIndexes',2048,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('indexes','sys::Int[]',false)]),{}).$am('toItems',2048,'sys::Obj[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('indexes','sys::Int[]',false)]),{}).$am('toIndexes',2048,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('items','sys::Obj[]',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.ListButtonSelection.$type.$af('button',67584,'domkit::ListButton',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('button','domkit::ListButton',false)]),{}).$am('max',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toItem',271360,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('toIndex',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('oldIndexes','sys::Int[]',false),new fan.sys.Param('newIndexes','sys::Int[]',false)]),{});
  fan.domkit.TreeNode.$type.$af('parent',73728,'domkit::TreeNode?',{}).$af('depth',65664,'sys::Int?',{}).$af('elem',65664,'dom::Elem?',{}).$af('expanded',65664,'sys::Bool',{}).$am('isExpanded',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasChildren',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('children',270336,'domkit::TreeNode[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onElem',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false),new fan.sys.Param('flags','domkit::TreeFlags',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.TreeFlags.$type.$af('focused',73730,'sys::Bool',{}).$af('selected',73730,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.TreeEvent.$type.$af('tree',73728,'domkit::Tree',{}).$af('node',73728,'domkit::TreeNode',{}).$af('type',73730,'sys::Str',{}).$af('pagePos',73730,'graphics::Point',{}).$af('nodePos',73730,'graphics::Point',{}).$af('size',73730,'graphics::Size',{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','domkit::Tree',false),new fan.sys.Param('n','domkit::TreeNode',false),new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Tree.$type.$af('roots',73728,'domkit::TreeNode[]',{}).$af('sel',73728,'domkit::Selection',{}).$af('depthIndent',100354,'sys::Int',{}).$af('nodes',67584,'domkit::TreeNode[]',{}).$af('cbSelect',67584,'sys::Func?',{}).$af('cbAction',67584,'sys::Func?',{}).$af('cbTreeEvent',67584,'[sys::Str:sys::Func]',{}).$af('manFocus',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('rebuild',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refresh',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refreshNode',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','domkit::TreeNode',false)]),{}).$am('expand',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','domkit::TreeNode',false),new fan.sys.Param('expanded','sys::Bool',false)]),{}).$am('displayState',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','domkit::TreeNode',false),new fan.sys.Param('state','sys::Str?',false)]),{'sys::NoDoc':""}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::Tree,dom::Event->sys::Void|',false)]),{}).$am('onTreeEvent',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('f','|domkit::TreeEvent->sys::Void|',false)]),{}).$am('doRebuild',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doRefreshNode',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','domkit::TreeNode',false)]),{}).$am('toElem',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','domkit::TreeNode?',false),new fan.sys.Param('node','domkit::TreeNode',false)]),{}).$am('toNode',2048,'domkit::TreeNode',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('onMouseEvent',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onUpdateSel',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('oldNodes','domkit::TreeNode[]',false),new fan.sys.Param('newNodes','domkit::TreeNode[]',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.TreeSelection.$type.$af('item',271360,'sys::Obj?',{}).$af('items',336896,'sys::Obj[]',{}).$af('index',271360,'sys::Int?',{}).$af('indexes',271360,'sys::Int[]',{}).$af('tree',67584,'domkit::Tree',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tree','domkit::Tree',false)]),{}).$am('isEmpty',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Dialog.$type.$af('title',73728,'sys::Obj?',{}).$af('uid',67586,'sys::Int',{}).$af('nextId',100354,'concurrent::AtomicRef',{}).$af('frame',67584,'dom::Elem?',{}).$af('cbOpen',67584,'sys::Func?',{}).$af('cbClose',67584,'sys::Func?',{}).$af('cbKeyDown',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onBeforeOpen',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onAfterOpen',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onKeyDown',4096,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|dom::Event->sys::Void|',false)]),{}).$am('open',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onOpen',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onClose',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireOpen',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fireClose',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Popup.$type.$af('halign',73728,'domkit::Align',{}).$af('isOpen',73728,'sys::Bool',{}).$af('uid',67586,'sys::Int',{}).$af('nextId',100354,'concurrent::AtomicInt',{}).$af('gutter',100354,'sys::Float',{}).$af('openPos',67584,'graphics::Point?',{}).$af('cbOpen',67584,'sys::Func?',{}).$af('cbClose',67584,'sys::Func?',{}).$af('_cbClose',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('open',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Float',false),new fan.sys.Param('y','sys::Float',false)]),{}).$am('close',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fitBounds',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onBeforeOpen',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onOpen',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onClose',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('_onClose',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireOpen',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event?',false)]),{}).$am('fireClose',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event?',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Menu.$type.$af('onCustomKeyDown',65664,'sys::Func?',{}).$af('selIndex',67584,'sys::Int?',{}).$af('lastEvent',67584,'sys::Int',{}).$af('armed',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onBeforeOpen',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('select',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int?',false)]),{'sys::NoDoc':""}).$am('findFirst',2048,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findPrev',2048,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false)]),{}).$am('findNext',2048,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false)]),{}).$am('fireAction',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.MenuItem.$type.$af('enabled',271360,'sys::Bool?',{}).$af('_event',73728,'dom::Event?',{'sys::NoDoc':""}).$af('cbAction',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireAction',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.FilePicker.$type.$af('accept',8192,'sys::Str?',{}).$af('multi',8192,'sys::Bool',{}).$af('cbSelect',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('open',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('files',8192,'dom::DomFile[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('reset',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::FilePicker->sys::Void|',false)]),{});
  fan.domkit.FlexBox.$type.$af('dir',73728,'sys::Str',{}).$af('wrap',73728,'sys::Str',{}).$af('alignMain',73728,'sys::Str',{}).$af('alignCross',73728,'sys::Str',{}).$af('alignLines',73728,'sys::Str',{}).$af('flex',73728,'sys::Str[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onParent',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','dom::Elem',false)]),{}).$am('onAdd',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('onRemove',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('applyStyle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Table.$type.$af('model',73728,'domkit::TableModel',{}).$af('showHeader',73728,'sys::Bool',{}).$af('stripeClasses',73728,'sys::Str[]',{}).$af('view',73728,'domkit::TableView',{'sys::NoDoc':""}).$af('sortEnabled',73728,'sys::Bool',{'sys::NoDoc':""}).$af('sel',73728,'domkit::Selection',{}).$af('cellEvents',100354,'sys::Str[]',{}).$af('cbBeforeSelect',67584,'sys::Func?',{}).$af('cbSelect',67584,'sys::Func?',{}).$af('cbAction',67584,'sys::Func?',{}).$af('cbSort',67584,'sys::Func?',{}).$af('cbKeyDown',67584,'sys::Func?',{}).$af('cbTableEvent',67584,'[sys::Str:sys::Func]',{}).$af('cbHeaderPopup',67584,'sys::Func?',{}).$af('sbarsz',67586,'sys::Int',{}).$af('thumbMargin',67586,'sys::Int',{}).$af('overScroll',67586,'sys::Int',{}).$af('scrollPageFreq',67586,'sys::Duration',{}).$af('scrollPulseDir',67586,'sys::Duration',{}).$af('thead',67584,'dom::Elem?',{}).$af('tbody',67584,'dom::Elem?',{}).$af('hbar',67584,'dom::Elem?',{}).$af('vbar',67584,'dom::Elem?',{}).$af('headers',67584,'[sys::Int:dom::Elem]',{}).$af('cells',67584,'[domkit::TablePos:dom::Elem]',{}).$af('theadh',67584,'sys::Int',{}).$af('tbodyw',67584,'sys::Int',{}).$af('tbodyh',67584,'sys::Int',{}).$af('numCols',67584,'sys::Int',{}).$af('numRows',67584,'sys::Int',{}).$af('colx',67584,'sys::Int[]',{}).$af('colw',67584,'sys::Int[]',{}).$af('ucolw',67584,'[sys::Int:sys::Int]',{}).$af('rowh',67584,'sys::Int',{}).$af('numVisCols',67584,'sys::Int',{}).$af('numVisRows',67584,'sys::Int',{}).$af('maxScrollx',67584,'sys::Int',{}).$af('maxScrolly',67584,'sys::Int',{}).$af('hasScrollx',67584,'sys::Bool',{}).$af('hasScrolly',67584,'sys::Bool',{}).$af('htrackw',67584,'sys::Int',{}).$af('hthumbw',67584,'sys::Int',{}).$af('vtrackh',67584,'sys::Int',{}).$af('vthumbh',67584,'sys::Int',{}).$af('resizeCol',67584,'sys::Int?',{}).$af('resizeElem',67584,'dom::Elem?',{}).$af('hpbut',67584,'dom::Elem?',{}).$af('hasHpbut',67584,'sys::Bool',{}).$af('hpbutw',67586,'sys::Int',{}).$af('scrollx',67584,'sys::Int',{}).$af('scrolly',67584,'sys::Int',{}).$af('hbarPulseId',67584,'sys::Int?',{}).$af('vbarPulseId',67584,'sys::Int?',{}).$af('hbarPageId',67584,'sys::Int?',{}).$af('vbarPageId',67584,'sys::Int?',{}).$af('hthumbDragOff',67584,'sys::Int?',{}).$af('vthumbDragOff',67584,'sys::Int?',{}).$af('firstVisCol',67584,'sys::Int',{}).$af('firstVisRow',67584,'sys::Int',{}).$af('pivot',67584,'sys::Int?',{}).$af('manFocus',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onHeaderPopup',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::Table->domkit::Popup|',false)]),{}).$am('sortCol',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sortDir',8192,'domkit::Dir',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sort',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int?',false),new fan.sys.Param('dir','domkit::Dir',true)]),{}).$am('scrollTo',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int?',false),new fan.sys.Param('row','sys::Int?',false)]),{}).$am('onBeforeSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Int[]->sys::Bool|',false)]),{'sys::NoDoc':""}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onSort',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onKeyDown',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|dom::Event->sys::Void|',false)]),{'sys::NoDoc':""}).$am('onTableEvent',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('f','|domkit::TableEvent->sys::Void|',false)]),{}).$am('onBeforeRebuild',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('rebuild',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refresh',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refreshHeaders',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refreshHeader',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('header','dom::Elem?',false),new fan.sys.Param('col','sys::Int',false)]),{}).$am('refreshRow',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('row','sys::Int',false)]),{}).$am('refreshCell',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cell','dom::Elem?',false),new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)]),{}).$am('doRebuild',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeScrollBar',2048,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','domkit::Dir',false)]),{}).$am('startScrollPage',2048,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('delta','graphics::Point',false)]),{}).$am('stopScrollPage',2048,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('fid','sys::Int?',false)]),{}).$am('pulseScrollBar',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','domkit::Dir',false)]),{}).$am('onUpdate',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)]),{}).$am('onMoveX',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)]),{}).$am('onMoveY',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('row','sys::Int',false)]),{}).$am('findMaxVisCols',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('openHeaderPopup',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('button','dom::Elem',false),new fan.sys.Param('popup','domkit::Popup',false)]),{}).$am('onScroll',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('delta','graphics::Point?',false)]),{}).$am('onMouseEvent',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('onMouseEventSelect',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false),new fan.sys.Param('row','sys::Int',false),new fan.sys.Param('vrow','sys::Int',false)]),{}).$am('onKeyEvent',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{}).$am('updateSel',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newsel','sys::Int[]',false)]),{'sys::NoDoc':""}).$am('colxSafe',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Int',false)]),{}).$am('colwSafe',2048,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Int',false)]),{}).$am('ts',2048,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.TablePos.$type.$af('col',73730,'sys::Int',{}).$af('row',73730,'sys::Int',{}).$af('hash',336898,'sys::Int',{}).$af('toStr',336898,'sys::Str',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Int',false),new fan.sys.Param('r','sys::Int',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{});
  fan.domkit.TableModel.$type.$am('numCols',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numRows',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('headerHeight',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('colWidth',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)]),{}).$am('rowHeight',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('item',270336,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('row','sys::Int',false)]),{}).$am('onHeader',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('header','dom::Elem',false),new fan.sys.Param('col','sys::Int',false)]),{}).$am('isVisibleDef',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)]),{}).$am('onCell',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cell','dom::Elem',false),new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false),new fan.sys.Param('flags','domkit::TableFlags',false)]),{}).$am('sortCompare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row1','sys::Int',false),new fan.sys.Param('row2','sys::Int',false)]),{}).$am('onSort',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int?',false),new fan.sys.Param('dir','domkit::Dir',false)]),{'sys::NoDoc':""}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.TableFlags.$type.$af('defVal',106498,'domkit::TableFlags',{}).$af('focused',73730,'sys::Bool',{}).$af('selected',73730,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.TableEvent.$type.$af('table',73728,'domkit::Table',{}).$af('type',73730,'sys::Str',{}).$af('col',73730,'sys::Int',{}).$af('row',73730,'sys::Int',{}).$af('pagePos',73730,'graphics::Point',{}).$af('cellPos',73730,'graphics::Point',{}).$af('size',73730,'graphics::Size',{}).$af('_event',73728,'dom::Event?',{'sys::NoDoc':""}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','domkit::Table',false),new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.TableSelection.$type.$af('view',67584,'domkit::TableView',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('view','domkit::TableView',false)]),{}).$am('max',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toItem',271360,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('toIndex',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]),{}).$am('onUpdate',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('oldIndexes','sys::Int[]',false),new fan.sys.Param('newIndexes','sys::Int[]',false)]),{});
  fan.domkit.TableView.$type.$af('table',65664,'domkit::Table',{}).$af('rows',67584,'sys::Int[]',{}).$af('cols',67584,'sys::Int[]',{}).$af('vis',67584,'sys::Bool[]',{}).$af('sortCol',65664,'sys::Int?',{}).$af('sortDir',65664,'domkit::Dir',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('table','domkit::Table',false)]),{}).$am('numCols',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numRows',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('headerHeight',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('colWidth',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Int',false)]),{}).$am('rowHeight',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('item',271360,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Int',false)]),{}).$am('onHeader',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Elem',false),new fan.sys.Param('c','sys::Int',false)]),{}).$am('onCell',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Elem',false),new fan.sys.Param('c','sys::Int',false),new fan.sys.Param('r','sys::Int',false),new fan.sys.Param('f','domkit::TableFlags',false)]),{}).$am('isColVisible',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)]),{}).$am('setColVisible',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('visible','sys::Bool',false)]),{}).$am('sort',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int?',false),new fan.sys.Param('dir','domkit::Dir',true)]),{}).$am('refresh',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refreshRows',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('refreshCols',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('rowViewToModel',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int',false)]),{}).$am('colViewToModel',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int',false)]),{}).$am('rowsViewToModel',8192,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int[]',false)]),{}).$am('colsViewToModel',8192,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int[]',false)]),{}).$am('rowModelToView',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int',false)]),{}).$am('colModelToView',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int',false)]),{}).$am('rowsModelToView',8192,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int[]',false)]),{}).$am('colsModelToView',8192,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int[]',false)]),{});
  fan.domkit.ScrollBox.$type.$af('cbScroll',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onScroll',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireScroll',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.WellBox.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mergeHeader',8192,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('header','dom::Elem',false),new fan.sys.Param('halign','domkit::Align',true)]),{'sys::NoDoc':""});
  fan.domkit.DomListener.$type.$af('checkFreq',67584,'sys::Int',{}).$af('lastTicks',67584,'sys::Int?',{}).$af('observer',67584,'dom::MutationObserver',{}).$af('map',67584,'dom::WeakMap',{}).$af('mounted',67584,'[sys::Int:dom::Elem]',{}).$af('checkMutations',67584,'dom::MutationRec[]',{}).$af('checkState',67584,'dom::Elem[]',{}).$am('cur',40962,'domkit::DomListener',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onMount',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','dom::Elem',false),new fan.sys.Param('f','|dom::Elem->sys::Void|',false)]),{}).$am('onUnmount',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','dom::Elem',false),new fan.sys.Param('f','|dom::Elem->sys::Void|',false)]),{}).$am('onResize',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','dom::Elem',false),new fan.sys.Param('f','|dom::Elem->sys::Void|',false)]),{}).$am('reqCheck',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onCheck',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findRegNodes',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false),new fan.sys.Param('list','dom::Elem[]',false)]),{});
  fan.domkit.DomState.$type.$af('onMount',73728,'sys::Func?',{}).$af('onUnmount',73728,'sys::Func?',{}).$af('onResize',73728,'sys::Func?',{}).$af('lastSize',73728,'graphics::Size?',{}).$af('newSize',73728,'graphics::Size?',{}).$af('mounted',67584,'sys::Bool',{}).$af('unmounted',67584,'sys::Bool',{}).$am('fireMount',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('fireUnmount',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('fireResize',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Checkbox.$type.$af('indeterminate',8192,'sys::Bool',{}).$af('checked',8192,'sys::Bool',{}).$af('cbAction',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('wrap',8192,'dom::Elem',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('content','sys::Obj',false)]),{}).$am('onAction',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireAction',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.TextArea.$type.$af('cols',8192,'sys::Int?',{}).$af('rows',8192,'sys::Int?',{}).$af('placeholder',8192,'sys::Str?',{}).$af('ro',8192,'sys::Bool',{}).$af('val',8192,'sys::Str',{}).$af('cbModify',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onModify',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireModify',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.AccordionBox.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addGroup',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('header','dom::Elem',false),new fan.sys.Param('kids','dom::Elem[]',false),new fan.sys.Param('expanded','sys::Bool',true)]),{}).$am('isExpanded',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('groupIndex','sys::Int',false)]),{}).$am('expand',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('groupIndex','sys::Int',false),new fan.sys.Param('expanded','sys::Bool',false)]),{}).$am('onMouseDown',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event',false)]),{});
  fan.domkit.Link.$type.$af('target',8192,'sys::Str',{}).$af('uri',73728,'sys::Uri',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.DragTarget.$type.$af('cbDrag',67584,'sys::Func?',{}).$af('cbDragImage',67584,'sys::Func?',{}).$af('cbEnd',67584,'sys::Func?',{}).$af('dragImage',67584,'dom::Elem?',{}).$am('bind',40962,'domkit::DragTarget',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('onDrag',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|dom::Elem->sys::Obj|',false)]),{}).$am('onDragImage',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj->dom::Elem|',false)]),{}).$am('onEnd',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|dom::Elem->sys::Void|',false)]),{});
  fan.domkit.DropTarget.$type.$af('cbCanDrop',67584,'sys::Func?',{}).$af('cbDrop',67584,'sys::Func?',{}).$af('cbOver',67584,'sys::Func?',{}).$af('cbLeave',67584,'sys::Func?',{}).$af('depth',67584,'sys::Int',{}).$am('bind',40962,'domkit::DropTarget',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('elem','dom::Elem',false)]),{}).$am('canDrop',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj->sys::Bool|',false)]),{}).$am('onDrop',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj->sys::Void|',false)]),{}).$am('onOver',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|graphics::Point->sys::Void|',false)]),{}).$am('onLeave',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|->sys::Void|',false)]),{}).$am('_canDrop',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('data','sys::Obj',false)]),{});
  fan.domkit.DndUtil.$type.$af('dataRef',100354,'concurrent::AtomicRef',{}).$am('getData',40962,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dt','dom::DataTransfer',false)]),{}).$am('setData',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dt','dom::DataTransfer',false),new fan.sys.Param('data','sys::Obj',false)]),{}).$am('clearData',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dt','dom::DataTransfer',false)]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.ButtonGroup.$type.$af('buttons',73728,'dom::Elem[]',{}).$af('inheritEnabled',73728,'sys::Bool',{}).$af('enabled',73728,'sys::Bool',{}).$af('selIndex',73728,'sys::Int?',{}).$af('_event',73728,'dom::Event?',{'sys::NoDoc':""}).$af('cbBeforeSelect',67584,'sys::Func?',{}).$af('cbSelect',67584,'sys::Func?',{}).$am('add',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('button','dom::Elem',false)]),{}).$am('onBeforeSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::ButtonGroup,sys::Int->sys::Bool|',false)]),{}).$am('onSelect',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('select',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('button','dom::Elem',false)]),{}).$am('update',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.FlowBox.$type.$af('halign',73728,'domkit::Align',{}).$af('gaps',73728,'sys::Str[]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onAdd',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('onRemove',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('applyStyle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Combo.$type.$af('field',73728,'domkit::TextField',{}).$af('items',8192,'sys::Str[]',{}).$af('enabled',271360,'sys::Bool?',{}).$af('button',67584,'domkit::ListButton',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onElem',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Obj->sys::Obj|',false)]),{}).$am('update',128,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Str',false)]),{});
  fan.domkit.GridBox.$type.$af('halign',73728,'domkit::Align',{}).$af('table',67584,'dom::Elem',{}).$af('tbody',67584,'dom::Elem',{}).$af('init',67584,'sys::Bool',{}).$af('cstyleMap',67584,'[sys::Str:sys::Str]',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cellStyle',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Obj',false),new fan.sys.Param('row','sys::Obj',false),new fan.sys.Param('style','sys::Str',false)]),{}).$am('numRows',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addRow',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cells','dom::Elem?[]',false),new fan.sys.Param('colspan','sys::Int[]',true)]),{}).$am('insertRowBefore',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('cells','dom::Elem?[]',false),new fan.sys.Param('colspan','sys::Int[]',true)]),{}).$am('_addRow',2048,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('at','sys::Int?',false),new fan.sys.Param('cells','dom::Elem?[]',false),new fan.sys.Param('colspan','sys::Int[]',true)]),{}).$am('rowIndexOf',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)]),{}).$am('removeRow',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('removeAllRows',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('updateCellStyle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('applyCellStyle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Int',false),new fan.sys.Param('r','sys::Int',false),new fan.sys.Param('td','dom::Elem',false)]),{}).$am('setCellStyle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('td','dom::Elem',false)]),{});
  fan.domkit.FlipBox.$type.$af('front',8192,'dom::Elem?',{}).$af('back',8192,'dom::Elem?',{}).$af('card',67584,'dom::Elem',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('flip',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('onComplete','|sys::This->sys::Void|?',true)]),{}).$am('isFront',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isBack',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toFront',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toBack',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Sheet.$type.$af('canDismiss',73728,'sys::Bool',{}).$af('isOpen',73728,'sys::Bool',{}).$af('delay',73728,'sys::Duration?',{'sys::NoDoc':""}).$af('uid',67586,'sys::Int',{}).$af('nextId',100354,'concurrent::AtomicRef',{}).$af('cbOpen',67584,'sys::Func?',{}).$af('cbClose',67584,'sys::Func?',{}).$af('cbKeyDown',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onBeforeOpen',266240,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onKeyDown',4096,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|dom::Event->sys::Void|',false)]),{}).$am('open',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','dom::Elem',false),new fan.sys.Param('height','sys::Str',false)]),{}).$am('close',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('onOpen',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('onClose',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fireOpen',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event?',false)]),{}).$am('fireClose',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','dom::Event?',false)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.CardBox.$type.$af('selIndex',335872,'sys::Int?',{}).$af('effect',73728,'sys::Str?',{}).$af('effectDur',73728,'sys::Duration',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('selItem',8192,'dom::Elem?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('onAdd',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('onRemove',267264,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','dom::Elem',false)]),{}).$am('updateStyle',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('updateDis',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.ProgressBar.$type.$af('min',73728,'sys::Int',{}).$af('max',73728,'sys::Int',{}).$af('val',73728,'sys::Int',{}).$af('cbText',67584,'sys::Func?',{}).$af('cbBarColor',67584,'sys::Func?',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]),{}).$am('onText',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::ProgressBar->sys::Str|',false)]),{}).$am('onBarColor',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|domkit::ProgressBar->sys::Str|',false)]),{}).$am('update',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Tooltip.$type.$af('delay',73728,'sys::Duration?',{}).$af('gutter',100354,'sys::Int',{}).$af('node',67584,'dom::Elem?',{}).$af('timerId',67584,'sys::Int?',{}).$af('inNode',67584,'sys::Bool',{}).$af('inTooltip',67584,'sys::Bool',{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('bind',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('node','dom::Elem',false)]),{}).$am('check',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isOpen',2048,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('open',2048,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{'sys::NoDoc':""}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Align.$type.$af('top',106506,'domkit::Align',{}).$af('left',106506,'domkit::Align',{}).$af('bottom',106506,'domkit::Align',{}).$af('right',106506,'domkit::Align',{}).$af('center',106506,'domkit::Align',{}).$af('fill',106506,'domkit::Align',{}).$af('vals',106498,'domkit::Align[]',{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'domkit::Align?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Dir.$type.$af('up',106506,'domkit::Dir',{}).$af('down',106506,'domkit::Dir',{}).$af('left',106506,'domkit::Dir',{}).$af('right',106506,'domkit::Dir',{}).$af('vals',106498,'domkit::Dir[]',{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('fromStr',40966,'domkit::Dir?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.domkit.Label.$type.$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.name", "domkit");
  m_meta.set("pod.version", "1.0.78.3106");
  m_version = fan.sys.Version.fromStr("1.0.78.3106");
  m_meta.set("pod.depends", "sys 1.0;concurrent 1.0;graphics 1.0;dom 1.0");
  m_meta.set("pod.summary", "DOM Based UI Framework");
  m_meta.set("pod.isScript", "false");
  m_meta.set("fcode.version", "1.0.51");
  m_meta.set("build.host", "brian-desktop");
  m_meta.set("build.user", "brian");
  m_meta.set("build.ts", "2022-11-15T16:23:14-05:00 New_York");
  m_meta.set("build.tsKey", "221115162314");
  m_meta.set("build.compiler", "1.0.78.3106");
  m_meta.set("build.platform", "macosx-x86_64");
  m_meta.set("pod.docSrc", "true");
  m_meta.set("license.name", "Academic Free License 3.0");
  m_meta.set("org.name", "Fantom");
  m_meta.set("pod.native.dotnet", "false");
  m_meta.set("proj.name", "Fantom Core");
  m_meta.set("proj.uri", "https://fantom.org/");
  m_meta.set("pod.docApi", "true");
  m_meta.set("org.uri", "https://fantom.org/");
  m_meta.set("pod.native.java", "false");
  m_meta.set("vcs.uri", "https://github.com/fantom-lang/fantom");
  m_meta.set("pod.native.jni", "false");
  m_meta.set("vcs.name", "Git");
  m_meta.set("pod.native.js", "false");
  m_meta.set("skyspark.build", "3.1.6");
  m_meta = m_meta.toImmutable();
}
fan.domkit.$clos$_u0 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","dom::Event","false"]);
fan.domkit.$clos$_u1 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,[]);
fan.domkit.$clos$_u5 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Popup?","false"]);
fan.domkit.$clos$_u8 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Elem","false"]);
fan.domkit.$clos$_u10 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["s","sys::Str","false"]);
fan.domkit.$clos$_u11 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Box","false"]);
fan.domkit.$clos$_u12 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["d","dom::CssDim","false"]);
fan.domkit.$clos$_u14 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["kid","dom::Elem","false","i","sys::Int","false"]);
fan.domkit.$clos$_u15 = new fan.sys.ClosureFuncSpec$(fan.sys.Str.$type,["sum","sys::Float","false","unit","sys::Str","false"]);
fan.domkit.$clos$_u21 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["de","dom::Event","false"]);
fan.domkit.$clos$_u25 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["c","dom::Elem","false"]);
fan.domkit.$clos$_u28 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["d","dom::CssDim","false"]);
fan.domkit.$clos$_u30 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["d","dom::CssDim","false","i","sys::Int","false"]);
fan.domkit.$clos$_u34 = new fan.sys.ClosureFuncSpec$(fan.sys.Obj.$type.toNullable(),["c","dom::CssDim","false"]);
fan.domkit.$clos$_u39 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Label","false"]);
fan.domkit.$clos$_u41 = new fan.sys.ClosureFuncSpec$(fan.domkit.Popup.$type,["it","domkit::Button","false"]);
fan.domkit.$clos$_u44 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::Menu","false"]);
fan.domkit.$clos$_u45 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["item","sys::Obj","false","i","sys::Int","false"]);
fan.domkit.$clos$_u46 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::MenuItem","false"]);
fan.domkit.$clos$_u49 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["i","sys::Obj","false"]);
fan.domkit.$clos$_u52 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["index","sys::Int","false"]);
fan.domkit.$clos$_u53 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["index","sys::Int","false"]);
fan.domkit.$clos$_u54 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["item","sys::Obj","false"]);
fan.domkit.$clos$_u55 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["r","domkit::TreeNode","false"]);
fan.domkit.$clos$_u57 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TreeFlags","false"]);
fan.domkit.$clos$_u58 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["k","domkit::TreeNode","false"]);
fan.domkit.$clos$_u60 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["p","dom::Elem","false"]);
fan.domkit.$clos$_u61 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["k","dom::Elem","false"]);
fan.domkit.$clos$_u65 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TreeEvent","false"]);
fan.domkit.$clos$_u66 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["n","domkit::TreeNode","false"]);
fan.domkit.$clos$_u84 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Event","false"]);
fan.domkit.$clos$_u96 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["r","sys::Int","false"]);
fan.domkit.$clos$_u97 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","sys::Int","false"]);
fan.domkit.$clos$_u101 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","sys::Str","false"]);
fan.domkit.$clos$_u102 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TableFlags","false"]);
fan.domkit.$clos$_u105 = new fan.sys.ClosureFuncSpec$(fan.sys.Int.$type,["r","sys::Int","false","w","sys::Int","false"]);
fan.domkit.$clos$_u112 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","dom::Win","false"]);
fan.domkit.$clos$_u116 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["h","dom::Elem","false","c","sys::Int","false"]);
fan.domkit.$clos$_u117 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","dom::Elem","false","p","domkit::TablePos","false"]);
fan.domkit.$clos$_u122 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["w","sys::Int","false","i","sys::Int","false"]);
fan.domkit.$clos$_u129 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TableEvent","false"]);
fan.domkit.$clos$_u130 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["i","sys::Int","false"]);
fan.domkit.$clos$_u141 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["v","sys::Bool","false","i","sys::Int","false"]);
fan.domkit.$clos$_u142 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["val","sys::Int","false","i","sys::Int","false"]);
fan.domkit.$clos$_u143 = new fan.sys.ClosureFuncSpec$(fan.sys.Int.$type,["a","sys::Int","false","b","sys::Int","false"]);
fan.domkit.$clos$_u144 = new fan.sys.ClosureFuncSpec$(fan.sys.Int.$type,["x","sys::Int","false"]);
fan.domkit.$clos$_u145 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["x","sys::Int","false"]);
fan.domkit.$clos$_u148 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["recs","dom::MutationRec[]","false"]);
fan.domkit.$clos$_u152 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["r","dom::MutationRec","false","i","sys::Int","false"]);
fan.domkit.$clos$_u153 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["e","dom::Elem","false"]);
fan.domkit.$clos$_u155 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["c","dom::Elem","false"]);
fan.domkit.$clos$_u165 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["k","dom::Elem","false"]);
fan.domkit.$clos$_u166 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["g","dom::Elem","false"]);
fan.domkit.$clos$_u172 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","dom::Elem","false"]);
fan.domkit.$clos$_u176 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["b","dom::Elem","false"]);
fan.domkit.$clos$_u177 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["b","dom::Elem","false","i","sys::Int","false"]);
fan.domkit.$clos$_u178 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["kid","dom::Elem","false"]);
fan.domkit.$clos$_u179 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::TextField","false"]);
fan.domkit.$clos$_u180 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["it","domkit::ListButton","false"]);
fan.domkit.$clos$_u183 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["i","sys::Str","false"]);
fan.domkit.$clos$_u186 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["elem","dom::Elem?","false","c","sys::Int","false"]);
fan.domkit.$clos$_u188 = new fan.sys.ClosureFuncSpec$(fan.sys.Bool.$type,["row","dom::Elem","false"]);
fan.domkit.$clos$_u189 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["tr","dom::Elem","false","r","sys::Int","false"]);
fan.domkit.$clos$_u190 = new fan.sys.ClosureFuncSpec$(fan.sys.Void.$type,["td","dom::Elem","false","c","sys::Int","false"]);
fan.domkit.Tree.static$init();
fan.domkit.Dialog.static$init();
fan.domkit.Popup.static$init();
fan.domkit.Table.static$init();
fan.domkit.TableFlags.static$init();
fan.domkit.DndUtil.static$init();
fan.domkit.Sheet.static$init();
fan.domkit.Tooltip.static$init();
fan.domkit.Align.static$init();
fan.domkit.Dir.static$init();
}).call(this);
