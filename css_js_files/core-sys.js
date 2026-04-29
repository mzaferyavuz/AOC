(function () {
var root = this;
var fan;
if (typeof exports !== 'undefined') {
  fan = exports;
} else {
  fan = root.fan = {};
}
fan.sys = {};
fan.sys.Obj = function() {};
fan.sys.Obj.$init = {};
fan.sys.Obj.$extend = function(base)
{
function f()
{
if (arguments.length > 0 && arguments[0] === fan.sys.Obj.$init) return;
this.$ctor.apply(this, arguments);
}
f.prototype = new base(fan.sys.Obj.$init)
f.prototype.constructor = f;
return f;
}
fan.sys.Obj.prototype.$ctor = function() {}
fan.sys.Obj.prototype.make$ = function() {}
fan.sys.Obj.prototype.equals = function(that)
{
return this === that;
}
fan.sys.Obj.prototype.compare = function(that)
{
if (this < that) return -1;
if (this > that) return 1;
return 0;
}
fan.sys.Obj.$hashCounter = 0;
fan.sys.Obj.prototype.hash = function()
{
if (this.$hash === undefined)
this.$hash = fan.sys.Obj.$hashCounter++;
return this.$hash;
}
fan.sys.Obj.prototype.$with = function(f)
{
f.call(this);
return this;
}
fan.sys.Obj.prototype.isImmutable = function()
{
return this.$typeof().isConst();
}
fan.sys.Obj.prototype.toImmutable = function()
{
if (this.$typeof().isConst()) return this;
throw fan.sys.NotImmutableErr.make(this.$typeof().toString());
}
fan.sys.Obj.prototype.$typeof = function()
{
return fan.sys.Obj.$type;
}
fan.sys.Obj.prototype.toStr = function()
{
return "" + this.$typeof() + "@" + this.hash();
}
fan.sys.Obj.prototype.toString = function()
{
return "" + this.toStr();
}
fan.sys.Obj.prototype.trap = function(name, args)
{
return fan.sys.ObjUtil.doTrap(this, name, args, this.$typeof());
}
fan.sys.Facet = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Facet.prototype.$ctor = function() {}
fan.sys.Deprecated = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Deprecated.prototype.$ctor = function() { this.m_msg = ""; }
fan.sys.Deprecated.prototype.$typeof = function() { return fan.sys.Deprecated.$type; }
fan.sys.Deprecated.prototype.toStr = function() { return fanx_ObjEncoder.encode(this); }
fan.sys.Deprecated.make = function(func)
{
if (func === undefined) func = null;
var self = new fan.sys.Deprecated();
if (func != null)
{
func.enterCtor(self);
func.call(self);
func.exitCtor();
}
return self;
}
fan.sys.FacetMeta = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.FacetMeta.prototype.$ctor = function() { this.m_inherited = false; }
fan.sys.FacetMeta.prototype.$typeof = function() { return fan.sys.FacetMeta.$type; }
fan.sys.FacetMeta.prototype.toStr = function() { return fanx_ObjEncoder.encode(this); }
fan.sys.FacetMeta.make = function(func)
{
if (func === undefined) func = null;
var self = new fan.sys.FacetMeta();
if (func != null)
{
func.enterCtor(self);
func.call(self);
func.exitCtor();
}
return self;
}
fan.sys.Js = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Js.prototype.$ctor = function() {}
fan.sys.Js.m_defVal = new fan.sys.Js();
fan.sys.Js.prototype.$typeof = function() { return fan.sys.Js.$type; }
fan.sys.Js.prototype.toStr = function() { return this.$typeof().qname(); }
fan.sys.NoDoc = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.NoDoc.prototype.$ctor = function() {}
fan.sys.NoDoc.m_defVal = new fan.sys.NoDoc();
fan.sys.NoDoc.prototype.$typeof = function() { return fan.sys.NoDoc.$type; }
fan.sys.NoDoc.prototype.toStr = function() { return this.$typeof().qname(); }
fan.sys.Operator = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Operator.prototype.$ctor = function() {}
fan.sys.Operator.m_defVal = new fan.sys.Operator();
fan.sys.Operator.prototype.$typeof = function() { return fan.sys.Operator.$type; }
fan.sys.Operator.prototype.toStr = function() { return this.$typeof().qname(); }
fan.sys.Serializable = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Serializable.prototype.$ctor = function()
{
this.m_simple = false;
this.m_collection = false;
}
fan.sys.Serializable.prototype.$typeof = function() { return fan.sys.Serializable.$type; }
fan.sys.Serializable.prototype.toStr = function() { return fanx_ObjEncoder.encode(this); }
fan.sys.Serializable.make = function(func)
{
if (func === undefined) func = null;
var self = new fan.sys.Serializable();
if (func != null)
{
func.enterCtor(self);
func.call(self);
func.exitCtor();
}
return self;
}
fan.sys.Transient = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Transient.prototype.$ctor = function() {}
fan.sys.Transient.m_defVal = new fan.sys.Transient();
fan.sys.Transient.prototype.$typeof = function() { return fan.sys.Transient.$type; }
fan.sys.Transient.prototype.toStr = function() { return this.$typeof().qname(); }
fan.sys.TimeZone = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.TimeZone.prototype.$ctor = function()
{
this.m_name = null;
this.m_fullName = null;
this.m_rules = null;
}
fan.sys.TimeZone.listNames = function()
{
return fan.sys.List.make(fan.sys.Str.$type, fan.sys.TimeZone.names).ro();
}
fan.sys.TimeZone.listFullNames = function()
{
return fan.sys.List.make(fan.sys.Str.$type, fan.sys.TimeZone.fullNames).ro();
}
fan.sys.TimeZone.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
var tz = fan.sys.TimeZone.fromCache$(name);
if (tz != null) return tz;
target = fan.sys.TimeZone.aliases[name];
tz = fan.sys.TimeZone.fromCache$(target);
if (tz != null) return tz;
if (checked) throw fan.sys.ParseErr.make("TimeZone not found: " + name);
return null;
}
fan.sys.TimeZone.defVal = function()
{
return fan.sys.TimeZone.m_utc;
}
fan.sys.TimeZone.utc = function()
{
return fan.sys.TimeZone.m_utc;
}
fan.sys.TimeZone.rel = function()
{
return fan.sys.TimeZone.m_rel;
}
fan.sys.TimeZone.cur = function()
{
if (fan.sys.TimeZone.m_cur == null)
{
try
{
var tz = fan.sys.Env.cur().m_vars.get("timezone");
if (tz == null) tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1];
if (tz == null) tz = "UTC"
fan.sys.TimeZone.m_cur = fan.sys.TimeZone.fromStr(tz);
}
catch (err)
{
console.log(fan.sys.Err.make(err).m_msg);
fan.sys.TimeZone.m_cur = fan.sys.TimeZone.m_utc;
throw fan.sys.Err.make(err);
}
}
return fan.sys.TimeZone.m_cur;
}
fan.sys.TimeZone.fromGmtOffset = function(offset)
{
if (offset == 0)
return fan.sys.TimeZone.utc();
else
return fan.sys.TimeZone.fromStr("GMT" + (offset < 0 ? "+" : "-") + fan.sys.Int.div(Math.abs(offset), 3600));
}
fan.sys.TimeZone.prototype.toStr = function () { return this.m_name; }
fan.sys.TimeZone.prototype.$typeof = function() { return fan.sys.TimeZone.$type; }
fan.sys.TimeZone.prototype.$name = function () { return this.m_name; }
fan.sys.TimeZone.prototype.fullName = function() { return this.m_fullName; }
fan.sys.TimeZone.prototype.offset = function(year)
{
return fan.sys.Duration.make(this.rule(year).offset * fan.sys.Duration.nsPerSec);
}
fan.sys.TimeZone.prototype.dstOffset = function(year)
{
var r = this.rule(year);
if (r.dstOffset == 0) return null;
return fan.sys.Duration.make(r.dstOffset * fan.sys.Duration.nsPerSec);
}
fan.sys.TimeZone.prototype.stdAbbr = function(year)
{
return this.rule(year).stdAbbr;
}
fan.sys.TimeZone.prototype.dstAbbr = function(year)
{
return this.rule(year).dstAbbr;
}
fan.sys.TimeZone.prototype.abbr = function(year, inDST)
{
return inDST ? this.rule(year).dstAbbr : this.rule(year).stdAbbr;
}
fan.sys.TimeZone.prototype.rule = function(year)
{
var rule = this.m_rules[0];
if (year >= rule.startYear) return rule;
for (var i=1; i<this.m_rules.length; ++i)
if (year >= (rule = this.m_rules[i]).startYear) return rule;
return this.m_rules[this.m_rules.length-1];
}
fan.sys.TimeZone.dstOffset = function(rule, year, mon, day, time)
{
var start = rule.dstStart;
var end   = rule.dstEnd;
if (start == null) return 0;
var s = fan.sys.TimeZone.compare(rule, start, year, mon, day, time);
var e = fan.sys.TimeZone.compare(rule, end,   year, mon, day, time);
if (end.mon < start.mon)
{
if (e > 0 || s <= 0) return rule.dstOffset;
}
else
{
if (s <= 0 && e > 0) return rule.dstOffset;
}
return 0;
}
fan.sys.TimeZone.compare = function(rule, x, year, mon, day, time)
{
var c = fan.sys.TimeZone.compareMonth(x, mon);
if (c != 0) return c;
c = fan.sys.TimeZone.compareOnDay(rule, x, year, mon, day);
if (c != 0) return c;
return fan.sys.TimeZone.compareAtTime(rule, x, time);
}
fan.sys.TimeZone.isDstDate = function(rule, x, year, mon, day)
{
return fan.sys.TimeZone.compareMonth(x, mon) == 0 &&
fan.sys.TimeZone.compareOnDay(rule, x, year, mon, day) == 0;
}
fan.sys.TimeZone.compareMonth = function(x, mon)
{
if (x.mon < mon) return -1;
if (x.mon > mon) return +1;
return 0;
}
fan.sys.TimeZone.compareOnDay = function(rule, x, year, mon, day)
{
if (x.atMode == 'u' && rule.offset + x.atTime < 0)
++day;
switch (x.onMode)
{
case 'd':
if (x.onDay < day) return -1;
if (x.onDay > day) return +1;
return 0;
case 'l':
var last = fan.sys.DateTime.weekdayInMonth(year, fan.sys.Month.m_vals.get(mon), fan.sys.Weekday.m_vals.get(x.onWeekday), -1);
if (last < day) return -1;
if (last > day) return +1;
return 0;
case '>':
var start = fan.sys.DateTime.weekdayInMonth(year, fan.sys.Month.m_vals.get(mon), fan.sys.Weekday.m_vals.get(x.onWeekday), 1);
while (start < x.onDay) start += 7;
if (start < day) return -1;
if (start > day) return +1;
return 0;
case '<':
var lastw = fan.sys.DateTime.weekdayInMonth(year, fan.sys.Month.m_vals.get(mon), fan.sys.Weekday.m_vals.get(x.onWeekday), -1);
while (lastw > x.onDay) lastw -= 7;
if (lastw < day) return -1;
if (lastw > day) return +1;
return 0;
default:
throw new Error('' + x.onMode);
}
}
fan.sys.TimeZone.compareAtTime = function(rule, x, time)
{
var atTime = x.atTime;
if (x.atMode == 'u')
{
if (rule.offset + x.atTime < 0)
atTime = 24*60*60 + rule.offset + x.atTime;
else
atTime += rule.offset;
}
if (atTime < time) return -1;
if (atTime > time) return +1;
return 0;
}
fan.sys.TimeZone.cache$ = function(fullName, encoded)
{
var city = fullName.split("/").reverse()[0];
fan.sys.TimeZone.cache[city] = encoded;
fan.sys.TimeZone.cache[fullName] = encoded;
fan.sys.TimeZone.names.push(city);
fan.sys.TimeZone.fullNames.push(fullName);
}
fan.sys.TimeZone.fromCache$ = function(name)
{
var entry = fan.sys.TimeZone.cache[name];
if (entry == null || entry === undefined) return null;
if ((typeof entry) !== 'string') return entry;
var buf = fan.sys.Buf.fromBase64(entry);
var tz  = new fan.sys.TimeZone();
var fullName = buf.readUtf();
var city = fullName.split("/").reverse()[0];
tz.m_name = city;
tz.m_fullName = fullName;
var decodeDst = function() {
var dst = new fan.sys.TimeZone$DstTime(
buf.read(),
buf.read(),
buf.read(),
buf.read(),
buf.readS4(),
buf.read()
);
return dst;
};
var rule;
tz.m_rules = [];
while (buf.more())
{
rule = new fan.sys.TimeZone$Rule();
rule.startYear = buf.readS2();
rule.offset    = buf.readS4();
rule.stdAbbr   = buf.readUtf();
rule.dstOffset = buf.readS4();
if (rule.dstOffset != 0)
{
rule.dstAbbr  = buf.readUtf();
rule.dstStart = decodeDst();
rule.dstEnd   = decodeDst();
}
tz.m_rules.push(rule);
}
fan.sys.TimeZone.cache[city] = tz;
fan.sys.TimeZone.cache[fullName] = tz;
return tz;
}
fan.sys.TimeZone.alias$ = function(alias, target)
{
var parts = alias.split("/");
fan.sys.TimeZone.aliases[alias] = target;
if (parts.length > 1) fan.sys.TimeZone.aliases[parts[parts.length-1]] = target;
}
fan.sys.TimeZone.cache = {};
fan.sys.TimeZone.names = [];
fan.sys.TimeZone.fullNames = [];
fan.sys.TimeZone.aliases = {};
fan.sys.TimeZone.m_utc = null;
fan.sys.TimeZone.m_cur = null;
fan.sys.TimeZone$Rule = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.TimeZone$Rule.prototype.$ctor = function()
{
this.startYear = null;
this.offset = null;
this.stdAbbr = null;
this.dstOffset = null;
this.dstAbbr = null;
this.dstStart = null;
this.dstEnd = null;
}
fan.sys.TimeZone$Rule.prototype.isWallTime = function()
{
return this.dstStart.atMode == 'w';
}
fan.sys.TimeZone$DstTime = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.TimeZone$DstTime.prototype.$ctor = function(mon, onMode, onWeekday, onDay, atTime, atMode)
{
this.mon = mon;
this.onMode = String.fromCharCode(onMode);
this.onWeekday = onWeekday;
this.onDay = onDay;
this.atTime = atTime;
this.atMode = String.fromCharCode(atMode);
}
fan.sys.Uri = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Uri.prototype.$ctor = function() {}
fan.sys.Uri.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
return fan.sys.Uri.makeSections(new fan.sys.UriDecoder(s, false).decode());
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Uri",  s);
}
}
fan.sys.Uri.decode = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
return new fan.sys.Uri.makeSections(new fan.sys.UriDecoder(s, true).decode());
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Uri", s);
}
}
fan.sys.Uri.decodeQuery = function(s)
{
try
{
return new fan.sys.UriDecoder(s, true).decodeQuery();
}
catch (err)
{
if (err instanceof fan.sys.ArgErr)
throw fan.sys.ArgErr.make("Invalid Uri query: `" + s + "`: " + err.msg());
throw fan.sys.ArgErr.make("Invalid Uri query: `" + s + "`");
}
}
fan.sys.Uri.encodeQuery = function(map)
{
var buf  = "";
var keys = map.keys();
var len  = keys.size();
for (var i=0; i<len; i++)
{
var key = keys.get(i);
var val = map.get(key);
if (buf.length > 0) buf += '&';
buf = fan.sys.Uri.encodeQueryStr(buf, key);
if (val != null)
{
buf += '=';
buf = fan.sys.Uri.encodeQueryStr(buf, val);
}
}
return buf;
}
fan.sys.Uri.encodeQueryStr = function(buf, str)
{
var len = str.length;
for (var i=0; i<len; ++i)
{
var c = str.charCodeAt(i);
if (c < 128 && (fan.sys.Uri.charMap[c] & fan.sys.Uri.QUERY) != 0 && (fan.sys.Uri.delimEscMap[c] & fan.sys.Uri.QUERY) == 0)
buf += str.charAt(i);
else if (c == 32)
buf += "+"
else
buf = fan.sys.UriEncoder.percentEncodeChar(buf, c);
}
return buf;
}
fan.sys.Uri.escapeToken = function(str, section)
{
var mask = fan.sys.Uri.$sectionToMask(section);
var buf = [];
var delimEscMap = fan.sys.Uri.delimEscMap;
for (var i = 0; i< str.length; ++i)
{
var c = str.charCodeAt(i);
if (c < delimEscMap.length && (delimEscMap[c] & mask) != 0)
buf.push('\\');
buf.push(String.fromCharCode(c));
}
return buf.join("");
}
fan.sys.Uri.encodeToken = function(str, section)
{
var mask = fan.sys.Uri.$sectionToMask(section);
var buf = ""
var delimEscMap = fan.sys.Uri.delimEscMap;
var charMap = fan.sys.Uri.charMap;
for (var i = 0; i < str.length; ++i)
{
var c = str.charCodeAt(i);
if (c < 128 && (charMap[c] & mask) != 0 && (delimEscMap[c] & mask) == 0)
buf += String.fromCharCode(c);
else
buf = fan.sys.UriEncoder.percentEncodeChar(buf, c);
}
return buf;
}
fan.sys.Uri.decodeToken = function(str, section)
{
var mask = fan.sys.Uri.$sectionToMask(section);
if (str.length == 0) return "";
return new fan.sys.UriDecoder(str, true).decodeToken(mask);
}
fan.sys.Uri.unescapeToken = function(str)
{
var buf = "";
for (var i = 0; i < str.length; ++i)
{
var c = str.charAt(i);
if (c == '\\')
{
++i;
if (i >= str.length) throw fan.sys.ArgErr.make("Invalid esc: " + str);
c = str.charAt(i);
}
buf += c;
}
return buf;
}
fan.sys.Uri.$sectionToMask = function(section)
{
switch (section)
{
case 1: return fan.sys.Uri.PATH; break;
case 2: return fan.sys.Uri.QUERY; break;
case 3: return fan.sys.Uri.FRAG; break;
default: throw fan.sys.ArgErr.make("Invalid section flag: " + section);
}
}
fan.sys.Uri.m_sectionPath  = 1;
fan.sys.Uri.m_sectionQuery = 2;
fan.sys.Uri.m_sectionFrag  = 3;
fan.sys.Uri.makeSections = function(x)
{
var uri = new fan.sys.Uri();
uri.m_scheme   = x.scheme;
uri.m_userInfo = x.userInfo;
uri.m_host     = x.host;
uri.m_port     = x.port;
uri.m_pathStr  = x.pathStr;
uri.m_path     = x.path.ro();
uri.m_queryStr = x.queryStr;
uri.m_query    = x.query.ro();
uri.m_frag     = x.frag;
uri.m_str      = x.str != null ? x.str : new fan.sys.UriEncoder(uri, false).encode();
return uri;
}
fan.sys.Uri.prototype.m_str = null;
fan.sys.Uri.prototype.m_scheme = null;
fan.sys.Uri.prototype.m_userInfo = null;
fan.sys.Uri.prototype.m_host = null;
fan.sys.Uri.prototype.m_port = null;
fan.sys.Uri.prototype.m_path = null;
fan.sys.Uri.prototype.m_pathStr = null;
fan.sys.Uri.prototype.m_query = null;
fan.sys.Uri.prototype.m_queryStr = null;
fan.sys.Uri.prototype.m_frag = null;
fan.sys.Uri.prototype.m_encoded = null;
fan.sys.UriSections = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.UriSections.prototype.$ctor = function() {}
fan.sys.UriSections.prototype.setAuth = function(x)  { this.userInfo = x.m_userInfo; this.host = x.m_host; this.port = x.m_port; }
fan.sys.UriSections.prototype.setPath = function(x)  { this.pathStr = x.m_pathStr; this.path = x.m_path; }
fan.sys.UriSections.prototype.setQuery = function(x) { this.queryStr = x.m_queryStr; this.query = x.m_query; }
fan.sys.UriSections.prototype.setFrag = function(x)  { this.frag = x.m_frag; }
fan.sys.UriSections.prototype.normalize = function()
{
this.normalizeSchemes();
this.normalizePath();
this.normalizeQuery();
}
fan.sys.UriSections.prototype.normalizeSchemes = function()
{
if (this.scheme == null) return;
if (this.scheme == "http")  { this.normalizeScheme(80);  return; }
if (this.scheme == "https") { this.normalizeScheme(443); return; }
if (this.scheme == "ftp")   { this.normalizeScheme(21);  return; }
}
fan.sys.UriSections.prototype.normalizeScheme = function(p)
{
if (this.port != null && this.port == p) this.port = null;
if (this.pathStr == null || this.pathStr.length == 0)
{
this.pathStr = "/";
if (this.path == null) this.path = fan.sys.Uri.emptyPath();
}
}
fan.sys.UriSections.prototype.normalizePath = function()
{
if (this.path == null) return;
var isAbs = fan.sys.Str.startsWith(this.pathStr, "/");
var isDir = fan.sys.Str.endsWith(this.pathStr, "/");
var dotLast = false;
var modified = false;
for (var i=0; i<this.path.size(); ++i)
{
var seg = this.path.get(i);
if (seg == "." && (this.path.size() > 1 || this.host != null))
{
this.path.removeAt(i);
modified = true;
dotLast = true;
i -= 1;
}
else if (seg == ".." && i > 0 && this.path.get(i-1).toString() != "..")
{
this.path.removeAt(i);
this.path.removeAt(i-1);
modified = true;
i -= 2;
dotLast = true;
}
else
{
dotLast = false;
}
}
if (modified)
{
if (dotLast) isDir = true;
if (this.path.size() == 0 || this.path.last().toString() == "..") isDir = false;
this.pathStr = fan.sys.Uri.toPathStr(isAbs, this.path, isDir);
}
}
fan.sys.UriSections.prototype.normalizeQuery = function()
{
if (this.query == null)
this.query = fan.sys.Uri.emptyQuery();
}
fan.sys.UriSections.prototype.scheme = null;
fan.sys.UriSections.prototype.host = null;
fan.sys.UriSections.prototype.userInfo = null;
fan.sys.UriSections.prototype.port = null;
fan.sys.UriSections.prototype.pathStr = null;
fan.sys.UriSections.prototype.path = null;
fan.sys.UriSections.prototype.queryStr = null;
fan.sys.UriSections.prototype.query = null;
fan.sys.UriSections.prototype.frag = null;
fan.sys.UriSections.prototype.str = null;
fan.sys.UriDecoder = fan.sys.Obj.$extend(fan.sys.UriSections);
fan.sys.UriDecoder.prototype.$ctor = function(str, decoding)
{
this.str = str;
this.decoding = decoding;
}
fan.sys.UriDecoder.prototype.decode = function()
{
var str = this.str;
var len = str.length;
var pos = 0;
var hasUpper = false;
for (var i=0; i<len; ++i)
{
var c = str.charCodeAt(i);
if (fan.sys.Uri.isScheme(c))
{
if (!hasUpper && fan.sys.Uri.isUpper(c)) hasUpper = true;
continue;
}
if (c != 58) break;
pos = i + 1;
var scheme = str.substring(0, i);
if (hasUpper) scheme = fan.sys.Str.lower(scheme);
this.scheme = scheme;
break;
}
if (pos+1 < len && str.charAt(pos) == '/' && str.charAt(pos+1) == '/')
{
var authStart = pos+2;
var authEnd = len;
var at = -1;
var colon = -1;
for (var i=authStart; i<len; ++i)
{
var c = str.charAt(i);
if (c == '/' || c == '?' || c == '#') { authEnd = i; break; }
else if (c == '@' && at < 0) { at = i; colon = -1; }
else if (c == ':') colon = i;
else if (c == ']') colon = -1;
}
var hostStart = authStart;
var hostEnd = authEnd;
if (at > 0)
{
this.userInfo = this.substring(authStart, at, fan.sys.Uri.USER);
hostStart = at+1;
}
if (colon > 0)
{
this.port = fan.sys.Int.fromStr(str.substring(colon+1, authEnd));
hostEnd = colon;
}
this.host = this.substring(hostStart, hostEnd, fan.sys.Uri.HOST);
pos = authEnd;
}
var pathStart = pos;
var pathEnd = len;
var numSegs = 1;
var prev = 0;
for (var i=pathStart; i<len; ++i)
{
var c = str.charAt(i);
if (prev != '\\')
{
if (c == '?' || c == '#') { pathEnd = i; break; }
if (i != pathStart && c == '/') ++numSegs;
prev = c;
}
else
{
prev = (c != '\\') ? c : 0;
}
}
this.pathStr = this.substring(pathStart, pathEnd, fan.sys.Uri.PATH);
this.path = this.pathSegments(this.pathStr, numSegs);
pos = pathEnd;
if (pos < len && str.charAt(pos) == '?')
{
var queryStart = pos+1;
var queryEnd = len;
prev = 0;
for (var i=queryStart; i<len; ++i)
{
var c = str.charAt(i);
if (prev != '\\')
{
if (c == '#') { queryEnd = i; break; }
prev = c;
}
else
{
prev = (c != '\\') ? c : 0;
}
}
this.queryStr = this.substring(queryStart, queryEnd, fan.sys.Uri.QUERY);
this.query = this.parseQuery(this.queryStr);
pos = queryEnd;
}
if (pos < len  && str.charAt(pos) == '#')
{
this.frag = this.substring(pos+1, len, fan.sys.Uri.FRAG);
}
this.normalize();
this.str = null;
return this;
}
fan.sys.UriDecoder.prototype.pathSegments = function(pathStr, numSegs)
{
var len = pathStr.length;
if (len == 0 || (len == 1 && pathStr.charAt(0) == '/'))
return fan.sys.Uri.emptyPath();
if (len > 1 && pathStr.charAt(len-1) == '/' && pathStr.charAt(len-2) != '\\')
{
numSegs--;
len--;
}
var path = [];
var n = 0;
var segStart = 0;
var prev = 0;
for (var i=0; i<pathStr.length; ++i)
{
var c = pathStr.charAt(i);
if (prev != '\\')
{
if (c == '/')
{
if (i > 0) { path.push(pathStr.substring(segStart, i)); n++ }
segStart = i+1;
}
prev = c;
}
else
{
prev = (c != '\\') ? c : 0;
}
}
if (segStart < len)
{
path.push(pathStr.substring(segStart, pathStr.length));
n++;
}
return fan.sys.List.make(fan.sys.Str.$type, path);
}
fan.sys.UriDecoder.prototype.decodeQuery = function()
{
return this.parseQuery(this.substring(0, this.str.length, fan.sys.Uri.QUERY));
}
fan.sys.UriDecoder.prototype.parseQuery = function(q)
{
if (q == null) return null;
var map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
try
{
var start = 0;
var eq = 0;
var len = q.length;
var prev = 0;
var escaped = false;
for (var i=0; i<len; ++i)
{
var ch = q.charAt(i);
if (prev != '\\')
{
if (ch == '=') eq = i;
if (ch != '&' && ch != ';') { prev = ch; continue; }
}
else
{
escaped = true;
prev = (ch != '\\') ? ch : 0;
continue;
}
if (start < i)
{
this.addQueryParam(map, q, start, eq, i, escaped);
escaped = false;
}
start = eq = i+1;
}
if (start < len)
this.addQueryParam(map, q, start, eq, len, escaped);
}
catch (err)
{
fan.sys.Err.make(err).trace();
}
return map;
}
fan.sys.UriDecoder.prototype.addQueryParam = function(map, q, start, eq, end, escaped)
{
if (start == eq && q.charAt(start) != '=')
{
key = this.toQueryStr(q, start, end, escaped);
val = "true";
}
else
{
key = this.toQueryStr(q, start, eq, escaped);
val = this.toQueryStr(q, eq+1, end, escaped);
}
dup = map.get(key, null);
if (dup != null) val = dup + "," + val;
map.set(key, val);
}
fan.sys.UriDecoder.prototype.toQueryStr = function(q, start, end, escaped)
{
if (!escaped) return q.substring(start, end);
var s = "";
var prev = 0;
for (var i=start; i<end; ++i)
{
var c = q.charAt(i);
if (c != '\\')
{
s += c;
prev = c;
}
else
{
if (prev == '\\') { s += c; prev = 0; }
else prev = c;
}
}
return s;
}
fan.sys.UriDecoder.prototype.decodeToken = function(mask)
{
return this.substring(0, this.str.length, mask);
}
fan.sys.UriDecoder.prototype.substring = function(start, end, section)
{
var buf = [];
var delimEscMap = fan.sys.Uri.delimEscMap;
if (!this.decoding)
{
var last = 0;
var backslash = 92;
for (var i = start; i < end; ++i)
{
var ch = this.str.charCodeAt(i);
if (last == backslash && ch < delimEscMap.length && (delimEscMap[ch] & section) == 0)
{
buf.pop();
}
buf.push(String.fromCharCode(ch));
last = ((last == backslash && ch == backslash) ? 0 : ch);
}
}
else
{
this.dpos = start;
while (this.dpos < end)
{
var ch = this.nextChar(section);
if (this.nextCharWasEscaped && ch < delimEscMap.length && (delimEscMap[ch] & section) != 0)
{
buf.push('\\');
}
buf.push(String.fromCharCode(ch));
}
}
return buf.join("");
}
fan.sys.UriDecoder.prototype.nextChar = function(section)
{
var c = this.nextOctet(section);
if (c < 0) return -1;
var c2, c3;
switch (c >> 4)
{
case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
return c;
case 12: case 13:
c2 = this.nextOctet(section);
if ((c2 & 0xC0) != 0x80)
throw fan.sys.ParseErr.make("Invalid UTF-8 encoding");
return ((c & 0x1F) << 6) | (c2 & 0x3F);
case 14:
c2 = this.nextOctet(section);
c3 = this.nextOctet(section);
if (((c2 & 0xC0) != 0x80) || ((c3 & 0xC0) != 0x80))
throw fan.sys.ParseErr.make("Invalid UTF-8 encoding");
return (((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0));
default:
throw fan.sys.ParseErr.make("Invalid UTF-8 encoding");
}
}
fan.sys.UriDecoder.prototype.nextOctet = function(section)
{
var c = this.str.charCodeAt(this.dpos++);
if (c == 37)
{
this.nextCharWasEscaped = true;
return (fan.sys.Uri.hexNibble(this.str.charCodeAt(this.dpos++)) << 4) | fan.sys.Uri.hexNibble(this.str.charCodeAt(this.dpos++));
}
else
{
this.nextCharWasEscaped = false;
}
if (c == 43 && section == fan.sys.Uri.QUERY)
return 32
if (c >= fan.sys.Uri.charMap.length || (fan.sys.Uri.charMap[c] & section) == 0)
throw fan.sys.ParseErr.make("Invalid char in " + fan.sys.Uri.toSection(section) + " at index " + (this.dpos-1));
return c;
}
fan.sys.UriDecoder.prototype.decoding = false;
fan.sys.UriDecoder.prototype.dpos = null;
fan.sys.UriDecoder.prototype.nextCharWasEscaped = null;
fan.sys.UriEncoder = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.UriEncoder.prototype.$ctor = function(uri, encoding)
{
this.uri = uri;
this.encoding = encoding;
this.buf = '';
}
fan.sys.UriEncoder.prototype.encode = function()
{
var uri = this.uri;
if (uri.m_scheme != null) this.buf += uri.m_scheme + ':';
if (uri.m_userInfo != null || uri.m_host != null || uri.m_port != null)
{
this.buf += '/' + '/';
if (uri.m_userInfo != null) { this.doEncode(uri.m_userInfo, fan.sys.Uri.USER); this.buf += '@'; }
if (uri.m_host != null) this.doEncode(uri.m_host, fan.sys.Uri.HOST);
if (uri.m_port != null) this.buf += ':' + uri.m_port;
}
if (uri.m_pathStr != null)
this.doEncode(uri.m_pathStr, fan.sys.Uri.PATH);
if (uri.m_queryStr != null)
{ this.buf += '?'; this.doEncode(uri.m_queryStr, fan.sys.Uri.QUERY); }
if (uri.m_frag != null)
{ this.buf += '#'; this.doEncode(uri.m_frag, fan.sys.Uri.FRAG); }
return this.buf;
}
fan.sys.UriEncoder.prototype.doEncode = function(s, section)
{
if (!this.encoding) { this.buf += s; return this.buf; }
var len = s.length;
var c = 0;
var prev;
for (var i=0; i<len; ++i)
{
prev = c;
c = s.charCodeAt(i);
if (c < 128 && (fan.sys.Uri.charMap[c] & section) != 0 && prev != 92)
{
this.buf += String.fromCharCode(c);
continue;
}
if (c == 92 && prev != 92) continue;
if (c == 32 && section == fan.sys.Uri.QUERY)
this.buf += '+';
else
this.buf = fan.sys.UriEncoder.percentEncodeChar(this.buf, c);
if (c == 92) c = 0;
}
return this.buf;
}
fan.sys.UriEncoder.prototype.uri = null;
fan.sys.UriEncoder.prototype.encoding = null;
fan.sys.UriEncoder.prototype.buf = null;
fan.sys.UriEncoder.percentEncodeChar = function(buf, c)
{
if (c <= 0x007F)
{
buf = fan.sys.UriEncoder.percentEncodeByte(buf, c);
}
else if (c > 0x07FF)
{
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0xE0 | ((c >> 12) & 0x0F));
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0x80 | ((c >>  6) & 0x3F));
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0x80 | ((c >>  0) & 0x3F));
}
else
{
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0xC0 | ((c >>  6) & 0x1F));
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0x80 | ((c >>  0) & 0x3F));
}
return buf;
}
fan.sys.UriEncoder.percentEncodeByte = function(buf, c)
{
buf += '%';
var hi = (c >> 4) & 0xf;
var lo = c & 0xf;
buf += (hi < 10 ? String.fromCharCode(48+hi) : String.fromCharCode(65+(hi-10)));
buf += (lo < 10 ? String.fromCharCode(48+lo) : String.fromCharCode(65+(lo-10)));
return buf;
}
fan.sys.Uri.prototype.$typeof = function()
{
return fan.sys.Uri.$type;
}
fan.sys.Uri.prototype.equals = function(that)
{
if (that instanceof fan.sys.Uri)
return this.m_str === that.m_str;
else
return false;
}
fan.sys.Uri.prototype.toCode = function()
{
var s = '`';
var len = this.m_str.length;
for (var i=0; i<len; ++i)
{
var c = this.m_str.charAt(i);
switch (c)
{
case '\n': s += '\\' + 'n'; break;
case '\r': s += '\\' + 'r'; break;
case '\f': s += '\\' + 'f'; break;
case '\t': s += '\\' + 't'; break;
case '`':  s += '\\' + '`'; break;
case '$':  s += '\\' + '$'; break;
default:  s += c;
}
}
s += '`';
return s;
}
fan.sys.Uri.prototype.hash = function()
{
return fan.sys.Str.hash(this.m_str);
}
fan.sys.Uri.prototype.toStr = function()
{
return this.m_str;
}
fan.sys.Uri.prototype.toLocale = function()
{
return this.m_str;
}
fan.sys.Uri.prototype.$literalEncode = function(out)
{
out.wStrLiteral(this.m_str, '`');
}
fan.sys.Uri.prototype.encode = function()
{
var x = this.m_encoded;
if (x != null) return x;
return this.m_encoded = new fan.sys.UriEncoder(this, true).encode();
}
fan.sys.Uri.prototype.get = function()
{
if (this.m_scheme == "fan")
{
if (this.m_path.size() == 0)
return fan.sys.Pod.find(this.m_host);
}
return fan.sys.File.make();
}
fan.sys.Uri.prototype.isAbs = function() { return this.m_scheme != null; }
fan.sys.Uri.prototype.isRel = function() { return this.m_scheme == null; }
fan.sys.Uri.prototype.isDir = function()
{
if (this.m_pathStr != null)
{
var p = this.m_pathStr;
var len = p.length;
if (len > 0 && p.charAt(len-1) == '/')
return true;
}
return false;
}
fan.sys.Uri.prototype.scheme = function() { return this.m_scheme; }
fan.sys.Uri.prototype.auth = function()
{
if (this.m_host == null) return null;
if (this.m_port == null)
{
if (this.m_userInfo == null) return this.m_host;
else return this.m_userInfo + '@' + this.m_host;
}
else
{
if (this.m_userInfo == null) return this.m_host + ':' + this.m_port;
else return this.m_userInfo + '@' + this.m_host + ':' + this.m_port;
}
}
fan.sys.Uri.prototype.host = function() { return this.m_host; }
fan.sys.Uri.prototype.userInfo = function() { return this.m_userInfo; }
fan.sys.Uri.prototype.port = function() { return this.m_port; }
fan.sys.Uri.prototype.path = function() { return this.m_path; }
fan.sys.Uri.prototype.pathStr = function() { return this.m_pathStr; }
fan.sys.Uri.prototype.isPathAbs = function()
{
if (this.m_pathStr == null || this.m_pathStr.length == 0)
return false;
else
return this.m_pathStr.charAt(0) == '/';
}
fan.sys.Uri.prototype.isPathRel = function()
{
return !this.isPathAbs();
}
fan.sys.Uri.prototype.isPathOnly = function()
{
return this.m_scheme == null && this.m_host == null && this.m_port == null &&
this.m_userInfo == null && this.m_queryStr == null && this.m_frag == null;
}
fan.sys.Uri.prototype.$name = function()
{
if (this.m_path.size() == 0) return "";
return this.m_path.last();
}
fan.sys.Uri.prototype.basename = function()
{
var n = this.$name();
var dot = n.lastIndexOf('.');
if (dot < 2)
{
if (dot < 0) return n;
if (n == ".") return n;
if (n == "..") return n;
}
return n.substring(0, dot);
}
fan.sys.Uri.prototype.ext = function()
{
var n = this.$name();
var dot = n.lastIndexOf('.');
if (dot < 2)
{
if (dot < 0) return null;
if (n == ".") return null;
if (n == "..") return null;
}
return n.substring(dot+1);
}
fan.sys.Uri.prototype.mimeType = function()
{
if (this.isDir()) return fan.sys.MimeType.m_dir;
return fan.sys.MimeType.forExt(this.ext());
}
fan.sys.Uri.prototype.query = function() { return this.m_query; }
fan.sys.Uri.prototype.queryStr = function() { return this.m_queryStr; }
fan.sys.Uri.prototype.frag = function() { return this.m_frag; }
fan.sys.Uri.prototype.parent = function()
{
if (this.m_path.size() == 0) return null;
if (this.m_path.size() == 1 && !this.isPathAbs() && !this.isDir()) return null;
return this.getRange(fan.sys.Uri.parentRange);
}
fan.sys.Uri.prototype.pathOnly = function()
{
if (this.m_pathStr == null)
throw fan.sys.Err.make("Uri has no path: " + this);
if (this.m_scheme == null && this.m_userInfo == null && this.m_host == null &&
this.m_port == null && this.m_queryStr == null && this.m_frag == null)
return this;
var t = new fan.sys.UriSections();
t.path     = this.m_path;
t.pathStr  = this.m_pathStr;
t.query    = fan.sys.Uri.emptyQuery();
t.str      = this.m_pathStr;
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.getRangeToPathAbs = function(range) { return this.getRange(range, true); }
fan.sys.Uri.prototype.getRange = function(range, forcePathAbs)
{
if (forcePathAbs === undefined) forcePathAbs = false;
if (this.m_pathStr == null)
throw fan.sys.Err.make("Uri has no path: " + this);
var size = this.m_path.size();
var s = range.$start(size);
var e = range.$end(size);
var n = e - s + 1;
if (n < 0) throw fan.sys.IndexErr.make(range);
var head = (s == 0);
var tail = (e == size-1);
if (head && tail && (!forcePathAbs || this.isPathAbs())) return this;
var t = new fan.sys.UriSections();
t.path = this.m_path.getRange(range);
var sb = "";
if ((head && this.isPathAbs()) || forcePathAbs) sb += '/';
for (var i=0; i<t.path.size(); ++i)
{
if (i > 0) sb += '/';
sb += t.path.get(i);
}
if (t.path.size() > 0 && (!tail || this.isDir())) sb += '/';
t.pathStr = sb;
if (head)
{
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
}
if (tail)
{
t.queryStr = this.m_queryStr;
t.query    = this.m_query;
t.frag     = this.m_frag;
}
else
{
t.query    = fan.sys.Uri.emptyQuery();
}
if (!head && !tail)
{
t.str = t.pathStr;
}
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.relTo = function(base)
{
if ((this.m_scheme != base.m_scheme) ||
(this.m_userInfo != base.m_userInfo) ||
(this.m_host != base.m_host) ||
(this.m_port != base.m_port))
return this;
var t = new fan.sys.UriSections();
t.query    = this.m_query;
t.queryStr = this.m_queryStr;
t.frag     = this.m_frag;
var d=0;
var len = Math.min(this.m_path.size(), base.m_path.size());
for (; d<len; ++d)
if (this.m_path.get(d) != base.m_path.get(d))
break;
if (d == 0)
{
if (base.m_path.isEmpty() && fan.sys.Str.startsWith(this.m_pathStr, "/"))
{
t.path = this.m_path;
t.pathStr = this.m_pathStr.substring(1);
}
else
{
t.path = this.m_path;
t.pathStr = this.m_pathStr;
}
}
else if (d == this.m_path.size() && d == base.m_path.size())
{
t.path = fan.sys.Uri.emptyPath();
t.pathStr = "";
}
else
{
t.path = this.m_path.getRange(fan.sys.Range.makeInclusive(d, -1));
var backup = base.m_path.size() - d;
if (!base.isDir()) backup--;
while (backup-- > 0) t.path.insert(0, "..");
t.pathStr = fan.sys.Uri.toPathStr(false, t.path, this.isDir());
}
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.relToAuth = function()
{
if (this.m_scheme == null && this.m_userInfo == null &&
this.m_host == null && this.m_port == null)
return this;
var t = new fan.sys.UriSections();
t.path     = this.m_path;
t.pathStr  = this.m_pathStr;
t.query    = this.m_query;
t.queryStr = this.m_queryStr;
t.frag     = this.m_frag;
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.plus = function(r)
{
if (r.m_scheme != null) return r;
if (r.m_host != null && this.m_scheme == null) return r;
if (r.isPathAbs() && this.m_host == null) return r;
var base = this;
var t = new fan.sys.UriSections();
if (r.m_host != null)
{
t.setAuth(r);
t.setPath(r);
t.setQuery(r);
}
else
{
if (r.m_pathStr == null || r.m_pathStr == "")
{
t.setPath(base);
if (r.m_queryStr != null)
t.setQuery(r);
else
t.setQuery(base);
}
else
{
if (fan.sys.Str.startsWith(r.m_pathStr, "/"))
t.setPath(r);
else
fan.sys.Uri.merge(t, base, r);
t.setQuery(r);
}
t.setAuth(base);
}
t.scheme = base.m_scheme;
t.frag   = r.m_frag;
t.normalize();
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.merge = function(t, base, r)
{
var baseIsAbs = base.isPathAbs();
var baseIsDir = base.isDir();
var rIsDir    = r.isDir();
var rPath     = r.m_path;
var dotLast   = false;
var tPath;
if (base.m_path.size() == 0)
{
tPath = r.m_path;
}
else
{
tPath = base.m_path.rw();
if (!baseIsDir) tPath.pop();
for (var i=0; i<rPath.size(); ++i)
{
var rSeg = rPath.get(i);
if (rSeg == ".") { dotLast = true; continue; }
if (rSeg == "..")
{
if (tPath.size() > 0) { tPath.pop(); dotLast = true; continue; }
if (baseIsAbs) continue;
}
tPath.add(rSeg); dotLast = false;
}
}
t.path = tPath;
t.pathStr = fan.sys.Uri.toPathStr(baseIsAbs, tPath, rIsDir || dotLast);
}
fan.sys.Uri.toPathStr = function(isAbs, path, isDir)
{
var buf = '';
if (isAbs) buf += '/';
for (var i=0; i<path.size(); ++i)
{
if (i > 0) buf += '/';
buf += path.get(i);
}
if (isDir && !(buf.length > 0 && buf.charAt(buf.length-1) == '/'))
buf += '/';
return buf;
}
fan.sys.Uri.prototype.plusName = function(name, asDir)
{
var size        = this.m_path.size();
var isDir       = this.isDir() || this.m_path.isEmpty();
var newSize     = isDir ? size + 1 : size;
var temp        = this.m_path.dup().m_values;
temp[newSize-1] = name;
var t = new fan.sys.UriSections();
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
t.query    = fan.sys.Uri.emptyQuery();
t.queryStr = null;
t.frag     = null;
t.path     = fan.sys.List.make(fan.sys.Str.$type, temp);
t.pathStr  = fan.sys.Uri.toPathStr(this.isAbs() || this.isPathAbs(), t.path, asDir);
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.plusSlash = function()
{
if (this.isDir()) return this;
var t = new fan.sys.UriSections();
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
t.query    = this.m_query;
t.queryStr = this.m_queryStr;
t.frag     = this.m_frag;
t.path     = this.m_path;
t.pathStr  = this.m_pathStr + "/";
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.plusQuery = function(q)
{
if (q == null || q.isEmpty()) return this;
var merge = this.m_query.dup().setAll(q);
var s = "";
var keys = merge.keys();
for (var i=0; i<keys.size(); i++)
{
if (s.length > 0) s += '&';
var key = keys.get(i);
var val = merge.get(key);
s = fan.sys.Uri.appendQueryStr(s, key);
s += '=';
s = fan.sys.Uri.appendQueryStr(s, val);
}
var t = new fan.sys.UriSections();
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
t.frag     = this.m_frag;
t.pathStr  = this.m_pathStr;
t.path     = this.m_path;
t.query    = merge.ro();
t.queryStr = s;
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.appendQueryStr = function(buf, str)
{
var len = str.length;
for (var i=0; i<len; ++i)
{
var c = str.charCodeAt(i);
if (c < fan.sys.Uri.delimEscMap.length && (fan.sys.Uri.delimEscMap[c] & fan.sys.Uri.QUERY) != 0)
buf += '\\';
buf += str.charAt(i);
}
return buf;
}
fan.sys.Uri.isName = function(name)
{
var len = name.length;
if (len == 0) return false;
if (name.charAt(0) == '.' && len <= 2)
{
if (len == 1) return false;
if (name.charAt(1) == '.') return false;
}
for (var i=0; i<len; ++i)
{
var c = name.charCodeAt(i);
if (c < 128 && fan.sys.Uri.nameMap[c]) continue;
return false;
}
return true;
}
fan.sys.Uri.checkName = function(name)
{
if (!fan.sys.Uri.isName(name))
throw fan.sys.NameErr.make(name);
}
fan.sys.Uri.isUpper = function(c)
{
return 65 <= c && c <= 90;
}
fan.sys.Uri.hexNibble = function(ch)
{
if ((fan.sys.Uri.charMap[ch] & fan.sys.Uri.HEX) == 0)
throw fan.sys.ParseErr.make("Invalid percent encoded hex: '" + String.fromCharCode(ch));
if (ch <= 57) return ch - 48;
if (ch <= 90) return (ch - 65) + 10;
return (ch - 97) + 10;
}
fan.sys.Uri.toSection = function(section)
{
switch (section)
{
case fan.sys.Uri.SCHEME: return "scheme";
case fan.sys.Uri.USER:   return "userInfo";
case fan.sys.Uri.HOST:   return "host";
case fan.sys.Uri.PATH:   return "path";
case fan.sys.Uri.QUERY:  return "query";
case fan.sys.Uri.FRAG:   return "frag";
default:                 return "uri";
}
}
fan.sys.Uri.isScheme = function(c)
{
return c < 128 ? (fan.sys.Uri.charMap[c] & fan.sys.Uri.SCHEME) != 0 : false;
}
fan.sys.Uri.charMap     = new Array(128);
fan.sys.Uri.nameMap     = new Array(128);
fan.sys.Uri.delimEscMap = new Array(128);
fan.sys.Uri.SCHEME     = 0x01;
fan.sys.Uri.USER       = 0x02;
fan.sys.Uri.HOST       = 0x04;
fan.sys.Uri.PATH       = 0x08;
fan.sys.Uri.QUERY      = 0x10;
fan.sys.Uri.FRAG       = 0x20;
fan.sys.Uri.DIGIT      = 0x40;
fan.sys.Uri.HEX        = 0x80;
for (var i=0; i<128; ++i) { fan.sys.Uri.charMap[i] = 0 ; }
for (var i=0; i<128; ++i) { fan.sys.Uri.nameMap[i] = 0 ; }
for (var i=0; i<128; ++i) { fan.sys.Uri.delimEscMap[i] = 0 ; }
fan.sys.Uri.unreserved = fan.sys.Uri.SCHEME | fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
for (var i=97; i<=122; ++i) { fan.sys.Uri.charMap[i] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[i] = true; }
for (var i=65; i<=90; ++i) { fan.sys.Uri.charMap[i] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[i] = true; }
for (var i=48; i<=57; ++i) { fan.sys.Uri.charMap[i] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[i] = true; }
fan.sys.Uri.charMap[45] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[45] = true;
fan.sys.Uri.charMap[46] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[46] = true;
fan.sys.Uri.charMap[95] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[95] = true;
fan.sys.Uri.charMap[126] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[126] = true;
for (var i=48; i<=57; ++i) fan.sys.Uri.charMap[i] |= fan.sys.Uri.HEX | fan.sys.Uri.DIGIT;
for (var i=97; i<=102; ++i) fan.sys.Uri.charMap[i] |= fan.sys.Uri.HEX;
for (var i=65; i<=70; ++i) fan.sys.Uri.charMap[i] |= fan.sys.Uri.HEX;
fan.sys.Uri.charMap[33]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[36]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[38]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[39] = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[40]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[41]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[42]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[43]  = fan.sys.Uri.SCHEME | fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[44]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[59]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[61]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[58] = fan.sys.Uri.PATH | fan.sys.Uri.USER | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[47] = fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[63] = fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[35] = 0;
fan.sys.Uri.charMap[91] = 0;
fan.sys.Uri.charMap[93] = 0;
fan.sys.Uri.charMap[64] = fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.delimEscMap[58]  = fan.sys.Uri.PATH;
fan.sys.Uri.delimEscMap[47]  = fan.sys.Uri.PATH;
fan.sys.Uri.delimEscMap[63]  = fan.sys.Uri.PATH;
fan.sys.Uri.delimEscMap[35]  = fan.sys.Uri.PATH | fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[38]  = fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[59]  = fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[61]  = fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[92] = fan.sys.Uri.SCHEME | fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.emptyPath = function()
{
var p = fan.sys.Uri.$emptyPath;
if (p == null)
{
p = fan.sys.Uri.$emptyPath =
fan.sys.List.make(fan.sys.Str.$type, []).toImmutable();
}
return p;
}
fan.sys.Uri.$emptyPath = null;
fan.sys.Uri.emptyQuery = function()
{
var q = fan.sys.Uri.$emptyQuery;
if (q == null)
{
q = fan.sys.Uri.$emptyQuery =
fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type).toImmutable();
}
return q;
}
fan.sys.Uri.$emptyQuery = null;
fan.sys.Num = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Num.prototype.$ctor = function() {}
fan.sys.Num.prototype.$typeof = function() { return fan.sys.Num.$type; }
fan.sys.Num.toDecimal = function(val) { return fan.sys.Decimal.make(val.valueOf()); }
fan.sys.Num.toFloat = function(val) { return fan.sys.Float.make(val.valueOf()); }
fan.sys.Num.toInt = function(val)
{
if (isNaN(val)) return 0;
if (val == Number.POSITIVE_INFINITY) return fan.sys.Int.m_maxVal;
if (val == Number.NEGATIVE_INFINITY) return fan.sys.Int.m_minVal;
if (val < 0) return Math.ceil(val);
return Math.floor(val);
}
fan.sys.Num.localeDecimal = function()
{
return fan.sys.Locale.cur().numSymbols().decimal;
}
fan.sys.Num.localeGrouping = function()
{
return fan.sys.Locale.cur().numSymbols().grouping;
}
fan.sys.Num.localeMinus = function()
{
return fan.sys.Locale.cur().numSymbols().minus;
}
fan.sys.Num.localePercent = function()
{
return fan.sys.Locale.cur().numSymbols().percent;
}
fan.sys.Num.localePosInf = function()
{
return fan.sys.Locale.cur().numSymbols().posInf;
}
fan.sys.Num.localeNegInf = function()
{
return fan.sys.Locale.cur().numSymbols().negInf;
}
fan.sys.Num.localeNaN = function()
{
return fan.sys.Locale.cur().numSymbols().nan;
}
fan.sys.Num.toLocale = function(p, d, locale)
{
var symbols = locale.numSymbols();
var s = "";
if (d.m_negative) s += symbols.minus;
d.round(p.m_maxFrac);
var start = 0;
if (p.m_optInt && d.zeroInt()) start = d.m_decimal;
if (p.m_minFrac == 0 && d.zeroFrac(p.m_maxFrac)) d.m_size = d.m_decimal;
for (var i=0; i<p.m_minInt-d.m_decimal; ++i) s += '0';
var decimal = false;
for (var i=start; i<d.m_size; ++i)
{
if (i < d.m_decimal)
{
if ((d.m_decimal - i) % p.m_group == 0 && i > 0)
s += symbols.grouping;
}
else
{
if (i == d.m_decimal && p.m_maxFrac > 0)
{
s += symbols.decimal;
decimal = true;
}
if (i-d.m_decimal >= p.m_maxFrac) break;
}
s += String.fromCharCode(d.m_digits[i]);
}
for (var i=0; i<p.m_minFrac-d.fracSize(); ++i)
{
if (!decimal) { s += symbols.decimal; decimal = true; }
s += '0';
}
if (s.length == 0) return "0";
return s;
}
fan.sys.NumDigits = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.NumDigits.prototype.$ctor = function()
{
this.m_digits;
this.m_decimal;
this.m_size = 0;
this.m_negative = false;
}
fan.sys.NumDigits.makeStr = function(s)
{
var obj = new fan.sys.NumDigits();
obj.m_digits = [];
var expPos = -1;
obj.m_decimal = -99;
for (var i=0; i<s.length; ++i)
{
var c = s.charCodeAt(i);
if (c == 45) { obj.m_negative = true; continue; }
if (c == 46) { obj.m_decimal = obj.m_negative ? i-1 : i; continue; }
if (c == 101 || c == 69) { expPos = i; break; }
obj.m_digits.push(c); obj.m_size++;
}
if (obj.m_decimal < 0) obj.m_decimal = obj.m_size;
if (expPos >= 0)
{
var exp = parseInt(s.substring(expPos+1), 10);
obj.m_decimal += exp;
if (obj.m_decimal >= obj.m_size)
{
while(obj.m_size <= obj.m_decimal) obj.m_digits[obj.m_size++] = 48;
}
else if (obj.m_decimal < 0)
{
for (var i=0; i<-obj.m_decimal; ++i) obj.m_digits.unshift(48);
obj.m_size += -obj.m_decimal;
obj.m_decimal = 0;
}
}
return obj;
}
fan.sys.NumDigits.makeLong = function(l)
{
var obj = new fan.sys.NumDigits();
if (l < 0) { obj.m_negative = true; l = -l; }
var s = l.toString();
if (s.charAt(0) === '-') s = "9223372036854775808";
obj.m_digits = [];
for (var i=0; i<s.length; i++) obj.m_digits.push(s.charCodeAt(i));
obj.m_size = obj.m_decimal = obj.m_digits.length;
return obj;
}
fan.sys.NumDigits.prototype.intSize = function()  { return this.m_decimal; }
fan.sys.NumDigits.prototype.fracSize = function() { return this.m_size - this.m_decimal; }
fan.sys.NumDigits.prototype.zeroInt = function()
{
for (var i=0; i<this.m_decimal; ++i) if (this.m_digits[i] != 48) return false;
return true;
}
fan.sys.NumDigits.prototype.zeroFrac = function(maxFrac)
{
var until = this.m_decimal + maxFrac;
for (var i=this.m_decimal; i<until; ++i) if (this.m_digits[i] != 48) return false;
return true;
}
fan.sys.NumDigits.prototype.round = function(maxFrac)
{
if (this.fracSize() <= maxFrac) return;
if (this.m_digits[this.m_decimal+maxFrac] >= 53)
{
var i = this.m_decimal + maxFrac - 1;
while (true)
{
if (this.m_digits[i] < 57) { this.m_digits[i]++; break; }
this.m_digits[i--] = 48;
if (i < 0)
{
this.m_digits.unshift(49);
this.m_size++; this.m_decimal++;
break;
}
}
}
this.m_size = this.m_decimal + maxFrac;
while (this.m_digits[this.m_size-1] == 48 && this.m_size > this.m_decimal) this.m_size--;
}
fan.sys.NumDigits.prototype.toString = function()
{
var s = "";
for (var i=0; i<this.m_digits.length; i++) s += String.fromCharCode(this.m_digits[i]);
return s + " neg=" + this.m_negative + " decimal=" + this.m_decimal;
}
fan.sys.NumPattern = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.NumPattern.prototype.$ctor = function()
{
this.m_pattern;
this.m_group;
this.m_optInt;
this.m_minInt;
this.m_minFrac;
this.m_maxFrac;
}
fan.sys.NumPattern.parse = function(s)
{
var x = fan.sys.NumPattern.m_cache[s];
if (x != null) return x;
return fan.sys.NumPattern.make(s);
}
fan.sys.NumPattern.make = function(s)
{
var group = fan.sys.Int.m_maxVal;
var optInt = true;
var comma = false;
var decimal = false;
var minInt = 0, minFrac = 0, maxFrac = 0;
var last = 0;
for (var i=0; i<s.length; ++i)
{
var c = s.charAt(i);
switch (c)
{
case ',':
comma = true;
group = 0;
break;
case '0':
if (decimal)
{ minFrac++; maxFrac++; }
else
{ minInt++; if (comma) group++; }
break;
case '#':
if (decimal)
maxFrac++;
else
if (comma) group++;
break;
case '.':
decimal = true;
optInt  = last == '#';
break;
}
last = c;
}
if (!decimal) optInt = last == '#';
var obj = new fan.sys.NumPattern();
obj.m_pattern = s;
obj.m_group   = group;
obj.m_optInt  = optInt;
obj.m_minInt  = minInt;
obj.m_minFrac = minFrac;
obj.m_maxFrac = maxFrac;
return obj;
}
fan.sys.NumPattern.prototype.toString = function()
{
return this.m_pattern + " group=" + this.m_group + " minInt=" + this.m_minInt +
" maxFrac=" + this.m_maxFrac + " minFrac=" + this.m_minFrac + " optInt=" + this.m_optInt;
}
fan.sys.NumPattern.m_cache = {};
fan.sys.NumPattern.cache = function(p)
{
fan.sys.NumPattern.m_cache[p] = fan.sys.NumPattern.make(p);
}
fan.sys.Int = fan.sys.Obj.$extend(fan.sys.Num);
fan.sys.Int.prototype.$ctor = function() {}
fan.sys.Int.prototype.$typeof = function() { return fan.sys.Int.$type; }
fan.sys.Int.make = function(val) { return val; }
fan.sys.Int.MAX_SAFE = 9007199254740991;
fan.sys.Int.MIN_SAFE = -9007199254740991;
fan.sys.Int.fromStr = function(s, radix, checked)
{
if (radix === undefined) radix = 10;
if (checked === undefined) checked = true;
try
{
if (radix === 10) { var n = fan.sys.Int.parseDecimal(s); return n; }
if (radix === 16) { var n = fan.sys.Int.parseHex(s); return n; }
throw new Error("Unsupported radix " + radix);
}
catch (err) {}
if (checked) throw fan.sys.ParseErr.makeStr("Int", s);
return null;
}
fan.sys.Int.parseDecimal = function(s)
{
var n = 0;
if (s.charCodeAt(0) === 45) n++;
for (var i=n; i<s.length; i++)
{
ch = s.charCodeAt(i);
if (ch >= 48 && ch <= 57) continue;
throw new Error("Illegal decimal char " + s.charAt(i));
}
var x = parseInt(s, 10);
if (isNaN(x)) throw new Error("Invalid number");
return x;
}
fan.sys.Int.parseHex = function(s)
{
for (var i=0; i<s.length; i++)
{
ch = s.charCodeAt(i);
if (ch >= 48 && ch <= 57) continue;
if (ch >= 65 && ch <= 70) continue;
if (ch >= 97 && ch <= 102) continue;
throw new Error("Illegal hex char " + s.charAt(i));
}
var x = parseInt(s, 16);
if (isNaN(x)) throw new Error("Invalid number");
return x;
}
fan.sys.Int.toStr = function(self)
{
return self.toString();
}
fan.sys.Int.equals = function(self, obj)
{
return self === obj;
}
fan.sys.Int.hash = function(self) { return self; }
fan.sys.Int.abs = function(self)      { return self < 0 ? -self : self; }
fan.sys.Int.min = function(self, val) { return self < val ? self : val; }
fan.sys.Int.max = function(self, val) { return self > val ? self : val; }
fan.sys.Int.clamp = function(self, min, max)
{
if (self < min) return min;
if (self > max) return max;
return self;
}
fan.sys.Int.clip = function(self, min, max) { return fan.sys.Int.clamp(self, min, max); }
fan.sys.Int.isEven  = function(self) { return self % 2 == 0; }
fan.sys.Int.isOdd   = function(self) { return self % 2 != 0; }
fan.sys.Int.isSpace = function(self) { return self == 32 || self == 9 || self == 10 || self == 13; }
fan.sys.Int.isDigit = function(self, radix)
{
if (radix == null || radix == 10) return self >= 48 && self <= 57;
if (radix == 16)
{
if (self >= 48 && self <= 57) return true;
if (self >= 65 && self <= 70) return true;
if (self >= 97 && self <= 102) return true;
return false;
}
if (radix <= 10) return 48 <= self && self <= (48+radix);
var x = self-10;
if (97 <= self && self <= 97+x) return true;
if (65 <= self && self <= 65+x) return true;
return false;
}
fan.sys.Int.toDigit = function(self, radix)
{
if (radix == null || radix == 10) return 0 <= self && self <= 9 ? 48+self : null;
if (self < 0 || self >= radix) return null;
if (self < 10) return 48+self;
return self-10+97;
}
fan.sys.Int.fromDigit = function(self, radix)
{
if (self < 0 || self >= 128) return null;
var ten = radix < 10 ? radix : 10;
if (48 <= self && self < 48+ten) return self-48;
if (radix > 10)
{
var alpha = radix-10;
if (97 <= self && self < 97+alpha) return self+10-97;
if (65 <= self && self < 65+alpha) return self+10-65;
}
return null;
}
fan.sys.Int.random = function(r)
{
if (r === undefined) return Math.floor(Math.random() * Math.pow(2, 64));
else
{
var start = r.start();
var end   = r.end();
if (r.inclusive()) ++end;
if (end <= start) throw fan.sys.ArgErr.make("Range end < start: " + r);
r = end-start;
if (r < 0) r = -r;
return Math.floor(Math.random()*r) + start;
}
}
fan.sys.Int.isUpper    = function(self) { return self >= 65 && self <= 90; }
fan.sys.Int.isLower    = function(self) { return self >= 97 && self <= 122; }
fan.sys.Int.upper      = function(self) { return fan.sys.Int.isLower(self) ? self-32 : self; }
fan.sys.Int.lower      = function(self) { return fan.sys.Int.isUpper(self) ? self+32 : self; }
fan.sys.Int.isAlpha    = function(self) { return fan.sys.Int.isUpper(self) || fan.sys.Int.isLower(self); }
fan.sys.Int.isAlphaNum = function(self) { return fan.sys.Int.isAlpha(self) || fan.sys.Int.isDigit(self); }
fan.sys.Int.equalsIgnoreCase = function(self, ch) { return (self|0x20) == (ch|0x20); }
fan.sys.Int.times = function(self, f)
{
for (var i=0; i<self; i++)
f.call(i);
}
fan.sys.Int.negate    = function(self) { return -self; }
fan.sys.Int.increment = function(self) { return self+1; }
fan.sys.Int.decrement = function(self) { return self-1; }
fan.sys.Int.plus        = function(a, b) { return a + b; }
fan.sys.Int.plusFloat   = function(a, b) { return fan.sys.Float.make(a + b); }
fan.sys.Int.plusDecimal = function(a, b) { return fan.sys.Decimal.make(a + b); }
fan.sys.Int.minus        = function(a, b) { return a - b; }
fan.sys.Int.minusFloat   = function(a, b) { return fan.sys.Float.make(a - b); }
fan.sys.Int.minusDecimal = function(a, b) { return fan.sys.Decimal.make(a - b); }
fan.sys.Int.mult         = function(a, b) { return a * b; }
fan.sys.Int.multFloat    = function(a, b) { return fan.sys.Float.make(a * b); }
fan.sys.Int.multDecimal  = function(a, b) { return fan.sys.Decimal.make(a * b); }
fan.sys.Int.div = function(a, b)
{
var r = a / b;
if (r < 0) return Math.ceil(r);
return Math.floor(r);
}
fan.sys.Int.divFloat   = function(a, b) { return fan.sys.Float.make(a / b); }
fan.sys.Int.divDecimal = function(a, b) { return fan.sys.Decimal.make(fan.sys.Int.div(a, b)); }
fan.sys.Int.mod        = function(a, b) { return a % b; }
fan.sys.Int.modFloat   = function(a, b) { return fan.sys.Float.make(a % b); }
fan.sys.Int.modDecimal = function(a, b) { return fan.sys.Decimal.make(a % b); }
fan.sys.Int.pow = function(self, pow)
{
if (pow < 0) throw fan.sys.ArgErr.make("pow < 0");
return Math.pow(self, pow);
}
fan.sys.Int.not = function(a)    { return ~a; }
fan.sys.Int.and = function(a, b) { var x = a & b;  if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.or  = function(a, b) { var x = a | b;  if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.xor = function(a, b) { var x = a ^ b;  if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.shiftl = function(a, b) { var x = a << b; if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.shiftr = function(a, b) { var x = a >>> b; if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.shifta = function(a, b) { var x = a >> b; return x; }
fan.sys.Int.toInt = function(val) { return val; }
fan.sys.Int.toFloat = function(val) { return fan.sys.Float.make(val); }
fan.sys.Int.toDecimal = function(val) { return fan.sys.Decimal.make(val); }
fan.sys.Int.toChar = function(self)
{
if (self < 0 || self > 0xFFFF) throw fan.sys.Err.make("Invalid unicode char: " + self);
return String.fromCharCode(self);
}
fan.sys.Int.toHex = function(self, width)
{
if (width === undefined) width = null;
if (self == null) self = 0;
var val = self;
if (val < 0) val += fan.sys.Int.MAX_SAFE;
var s = "";
while (true)
{
s = "0123456789abcdef".charAt(val % 16) + s;
val = Math.floor(val / 16);
if (val === 0) break
}
if (width != null && s.length < width)
{
var zeros = width - s.length;
for (var i=0; i<zeros; ++i) s = '0' + s;
}
return s;
}
fan.sys.Int.toRadix = function(self, radix, width)
{
if (width === undefined) width = null;
var s = self.toString(radix);
if (width != null && s.length < width)
{
var zeros = width - s.length;
for (var i=0; i<zeros; ++i) s = '0' + s;
}
return s;
}
fan.sys.Int.toCode = function(self, base)
{
if (base === undefined) base = 10;
if (base == 10) return self.toString();
if (base == 16) return "0x" + fan.sys.Int.toHex(self);
throw fan.sys.ArgErr.make("Invalid base " + base);
}
fan.sys.Int.toDuration = function(self)
{
return fan.sys.Duration.make(self);
}
fan.sys.Int.toDateTime = function(self, tz)
{
return (tz === undefined)
? fan.sys.DateTime.makeTicks(self)
: fan.sys.DateTime.makeTicks(self, tz);
}
fan.sys.Int.charMap = [];
fan.sys.Int.SPACE    = 0x01;
fan.sys.Int.UPPER    = 0x02;
fan.sys.Int.LOWER    = 0x04;
fan.sys.Int.DIGIT    = 0x08;
fan.sys.Int.HEX      = 0x10;
fan.sys.Int.ALPHA    = fan.sys.Int.UPPER | fan.sys.Int.LOWER;
fan.sys.Int.ALPHANUM = fan.sys.Int.UPPER | fan.sys.Int.LOWER | fan.sys.Int.DIGIT;
fan.sys.Int.charMap[32] |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[10] |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[13] |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[9]  |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[12] |= fan.sys.Int.SPACE;
for (var i=97; i<=122; ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.LOWER;
for (var i=65; i<=90;  ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.UPPER;
for (var i=48; i<=57; ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.DIGIT;
for (var i=48; i<=57;  ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.HEX;
for (var i=97; i<=102; ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.HEX;
for (var i=65; i<=70;  ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.HEX;
fan.sys.Int.toLocale = function(self, pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
if (pattern != null && pattern.length == 1 && pattern.charAt(0) == 'B')
return fan.sys.Int.toLocaleBytes(self);
if (pattern == null)
pattern = "#,###";
var p = fan.sys.NumPattern.parse(pattern);
var d = fan.sys.NumDigits.makeLong(self);
return fan.sys.Num.toLocale(p, d, locale);
}
fan.sys.Int.toLocaleBytes = function(b)
{
var KB = fan.sys.Int.m_KB;
var MB = fan.sys.Int.m_MB;
var GB = fan.sys.Int.m_GB;
if (b < KB)    return b + "B";
if (b < 10*KB) return fan.sys.Float.toLocale(b/KB, "#.#") + "KB";
if (b < MB)    return Math.round(b/KB) + "KB";
if (b < 10*MB) return fan.sys.Float.toLocale(b/MB, "#.#") + "MB";
if (b < GB)    return Math.round(b/MB) + "MB";
if (b < 10*GB) return fan.sys.Float.toLocale(b/GB, "#.#") + "GB";
return Math.round(b/fan.sys.Int.m_GB) + "GB";
}
fan.sys.Int.m_KB = 1024;
fan.sys.Int.m_MB = 1024*1024;
fan.sys.Int.m_GB = 1024*1024*1024;
fan.sys.Int.localeIsUpper = function(self) { return fan.sys.Int.isUpper(self); }
fan.sys.Int.localeIsLower = function(self) { return fan.sys.Int.isLower(self); }
fan.sys.Int.localeUpper   = function(self) { return fan.sys.Int.upper(self); }
fan.sys.Int.localeLower   = function(self) { return fan.sys.Int.lower(self); }
fan.sys.Err = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Err.prototype.$ctor = function(msg, cause)
{
this.$err    = new Error();
this.m_msg   = msg;
this.m_cause = cause;
}
fan.sys.Err.make$ = function(self, msg, cause)
{
this.$err    = new Error();
self.m_msg   = msg;
self.m_cause = cause;
}
fan.sys.Err.prototype.$assign = function(jsErr)
{
this.$err = jsErr;
return this;
}
fan.sys.Err.prototype.cause = function()
{
return this.m_cause;
}
fan.sys.Err.prototype.$typeof = function()
{
return fan.sys.Err.$type;
}
fan.sys.Err.prototype.toStr = function()
{
return this.$typeof() + ": " + this.m_msg;
}
fan.sys.Err.prototype.msg = function()
{
return this.m_msg;
}
fan.sys.Err.prototype.trace = function()
{
fan.sys.ObjUtil.echo(this.traceToStr());
}
fan.sys.Err.prototype.traceToStr = function()
{
var s = this.$typeof() + ": " + this.m_msg;
if (this.$err.stack) s += "\n" + fan.sys.Err.cleanTrace(this.$err.stack);
if (this.m_cause)    s += "\n  Caused by: " + this.m_cause.traceToStr();
return s;
}
fan.sys.Err.cleanTrace = function(orig)
{
var stack = [];
var lines = orig.split('\n');
for (var i=0; i<lines.length; i++)
{
var line = lines[i];
if (line.indexOf("@") != -1)
{
var about = line.lastIndexOf("@");
var slash = line.lastIndexOf("/");
if (slash != -1)
{
var func = "Unknown";
var sub = "  at " + func + " (" + line.substr(slash+1) + ")";
stack.push(sub);
}
}
else if (line.charAt(line.length-1) == ')')
{
var paren = line.lastIndexOf("(");
var slash = line.lastIndexOf("/");
var sub   = line.substring(0, paren+1) + line.substr(slash+1);
stack.push(sub);
}
else
{
stack.push(line)
}
}
return stack.join("\n") + "\n";
}
fan.sys.Err.make = function(err, cause)
{
if (err instanceof fan.sys.Err) return err;
if (err instanceof Error)
{
var m = err.message;
if (m.indexOf(" from null") != -1) return fan.sys.NullErr.make(m, cause).$assign(err);
if (m.indexOf(" of null")   != -1) return fan.sys.NullErr.make(m, cause).$assign(err);
return new fan.sys.Err(err.message, cause).$assign(err);
}
return new fan.sys.Err("" + err, cause);
}
fan.sys.ArgErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ArgErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.ArgErr.prototype.$typeof = function() { return fan.sys.ArgErr.$type; }
fan.sys.ArgErr.make = function(msg, cause) { return new fan.sys.ArgErr(msg, cause); }
fan.sys.CancelledErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.CancelledErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.CancelledErr.prototype.$typeof = function() { return fan.sys.CancelledErr.$type; }
fan.sys.CancelledErr.make = function(msg, cause) { return new fan.sys.CancelledErr(msg, cause); }
fan.sys.CastErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.CastErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.CastErr.prototype.$typeof = function() { return fan.sys.CastErr.$type; }
fan.sys.CastErr.make = function(msg, cause) { return new fan.sys.CastErr(msg, cause); }
fan.sys.ConstErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ConstErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.ConstErr.prototype.$typeof = function() { return fan.sys.ConstErr.$type; }
fan.sys.ConstErr.make = function(msg, cause) { return new fan.sys.ConstErr(msg, cause); }
fan.sys.FieldNotSetErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.FieldNotSetErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.FieldNotSetErr.prototype.$typeof = function() { return fan.sys.FieldNotSetErr.$type; }
fan.sys.FieldNotSetErr.make = function(msg, cause) { return new fan.sys.FieldNotSetErr(msg, cause); }
fan.sys.IndexErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.IndexErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.IndexErr.prototype.$typeof = function() { return fan.sys.IndexErr.$type; }
fan.sys.IndexErr.make = function(msg, cause) { return new fan.sys.IndexErr(""+msg, cause); }
fan.sys.InterruptedErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.InterruptedErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.InterruptedErr.prototype.$typeof = function() { return fan.sys.InterruptedErr.$type; }
fan.sys.InterruptedErr.make = function(msg, cause) { return new fan.sys.InterruptedErr(msg, cause); }
fan.sys.IOErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.IOErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.IOErr.prototype.$typeof = function() { return fan.sys.IOErr.$type; }
fan.sys.IOErr.make = function(msg, cause) { return new fan.sys.IOErr(msg, cause); }
fan.sys.NameErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.NameErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.NameErr.prototype.$typeof = function() { return fan.sys.NameErr.$type; }
fan.sys.NameErr.make = function(msg, cause) { return new fan.sys.NameErr(msg, cause); }
fan.sys.NotImmutableErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.NotImmutableErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.NotImmutableErr.prototype.$typeof = function() { return fan.sys.NotImmutableErr.$type; }
fan.sys.NotImmutableErr.make = function(msg, cause) { return new fan.sys.NotImmutableErr(msg, cause); }
fan.sys.NullErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.NullErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.NullErr.prototype.$typeof = function() { return fan.sys.NullErr.$type; }
fan.sys.NullErr.make = function(msg, cause) { return new fan.sys.NullErr(msg, cause); }
fan.sys.ParseErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ParseErr.prototype.$ctor = function(type, val, more, cause)
{
var msg = type;
if (val != undefined)
{
msg = "Invalid " + type + ": '" + val + "'";
if (more != undefined) msg += ": " + more;
}
fan.sys.Err.prototype.$ctor.call(this, msg, cause)
}
fan.sys.ParseErr.prototype.$typeof = function() { return fan.sys.ParseErr.$type; }
fan.sys.ParseErr.make = function(msg, cause) { return new fan.sys.ParseErr(msg, null, null, cause); }
fan.sys.ParseErr.makeStr = function(type, val, more, cause) { return new fan.sys.ParseErr(type, val, more, cause); }
fan.sys.ReadonlyErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ReadonlyErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.ReadonlyErr.prototype.$typeof = function() { return fan.sys.ReadonlyErr.$type; }
fan.sys.ReadonlyErr.make = function(msg, cause) { return new fan.sys.ReadonlyErr(msg, cause); }
fan.sys.TestErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.TestErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.TestErr.prototype.$typeof = function() { return fan.sys.TestErr.$type; }
fan.sys.TestErr.make = function(msg, cause) { return new fan.sys.TestErr(msg, cause); }
fan.sys.TimeoutErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.TimeoutErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.TimeoutErr.prototype.$typeof = function() { return fan.sys.TimeoutErr.$type; }
fan.sys.TimeoutErr.make = function(msg, cause) { return new fan.sys.TimeoutErr(msg, cause); }
fan.sys.UnknownKeyErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownKeyErr .prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownKeyErr.prototype.$typeof = function() { return fan.sys.UnknownKeyErr.$type; }
fan.sys.UnknownKeyErr.make = function(msg, cause) { return new fan.sys.UnknownKeyErr(msg, cause); }
fan.sys.UnknownPodErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownPodErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownPodErr.prototype.$typeof = function() { return fan.sys.UnknownPodErr.$type; }
fan.sys.UnknownPodErr.make = function(msg, cause) { return new fan.sys.UnknownPodErr(msg, cause); }
fan.sys.UnknownServiceErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownServiceErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownServiceErr.prototype.$typeof = function() { return fan.sys.UnknownServiceErr.$type; }
fan.sys.UnknownServiceErr.make = function(msg, cause) { return new fan.sys.UnknownServiceErr(msg, cause); }
fan.sys.UnknownSlotErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownSlotErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownSlotErr.prototype.$typeof = function() { return fan.sys.UnknownSlotErr.$type; }
fan.sys.UnknownSlotErr.make = function(msg, cause) { return new fan.sys.UnknownSlotErr(msg, cause); }
fan.sys.UnknownFacetErr= fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownFacetErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownFacetErr.prototype.$typeof = function() { return fan.sys.UnknownFacetErr.$type; }
fan.sys.UnknownFacetErr.make = function(msg, cause) { return new fan.sys.UnknownFacetErr(msg, cause); }
fan.sys.UnknownTypeErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownTypeErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownTypeErr.prototype.$typeof = function() { return fan.sys.UnknownTypeErr.$type; }
fan.sys.UnknownTypeErr.make = function(msg, cause) { return new fan.sys.UnknownTypeErr(msg, cause); }
fan.sys.UnresolvedErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnresolvedErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnresolvedErr.prototype.$typeof = function() { return fan.sys.UnresolvedErr.$type; }
fan.sys.UnresolvedErr.make = function(msg, cause) { return new fan.sys.UnresolvedErr(msg, cause); }
fan.sys.UnsupportedErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnsupportedErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnsupportedErr.prototype.$typeof = function() { return fan.sys.UnsupportedErr.$type; }
fan.sys.UnsupportedErr.make = function(msg, cause) { return new fan.sys.UnsupportedErr(msg, cause); }
fan.sys.Unsafe = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Unsafe.make = function(val)
{
var self = new fan.sys.Unsafe();
self.m_val = val;
return self;
}
fan.sys.Unsafe.prototype.$ctor = function()
{
}
fan.sys.Unsafe.prototype.$typeof = function () {
return fan.sys.Unsafe.$type;
}
fan.sys.Unsafe.prototype.val = function() { return this.m_val; }
fan.sys.Pod = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Pod.of = function(obj)
{
return fan.sys.Type.of(obj).pod();
}
fan.sys.Pod.list = function()
{
if (fan.sys.Pod.$list == null)
{
var pods = fan.sys.Pod.$pods;
var list = fan.sys.List.make(fan.sys.Pod.$type);
for (var n in pods) list.add(pods[n]);
fan.sys.Pod.$list = list.sort().toImmutable();
}
return fan.sys.Pod.$list;
}
fan.sys.Pod.load = function(instream) {
throw fan.sys.UnsupportedErr.make("Pod.load");
}
fan.sys.Pod.prototype.$ctor = function(name)
{
this.m_name  = name;
this.m_types = [];
this.m_meta = [];
this.m_version = fan.sys.Version.m_defVal;
}
fan.sys.Pod.prototype.$typeof = function() { return fan.sys.Pod.$type; }
fan.sys.Pod.prototype.$name = function()
{
return this.m_name;
}
fan.sys.Pod.prototype.meta = function()
{
return this.m_meta;
}
fan.sys.Pod.prototype.version = function()
{
return this.m_version;
}
fan.sys.Pod.prototype.uri = function()
{
if (this.m_uri == null) this.m_uri = fan.sys.Uri.fromStr("fan://" + this.m_name);
return this.m_uri;
}
fan.sys.Pod.prototype.depends = function()
{
if (this.$dependsArray == null)
{
var arr = [];
var depends = this.meta().get("pod.depends").split(";");
for (var i=0; i<depends.length; ++i) {
var d = depends[i];
if (d == "") continue;
arr.push(fan.sys.Depend.fromStr(d))
}
this.$dependsArray = fan.sys.List.make(fan.sys.Depend.$type, arr);
}
return this.$dependsArray;
}
fan.sys.Pod.prototype.props = function(uri, maxAge) {
return fan.sys.Env.cur().props(this, uri, maxAge);
}
fan.sys.Pod.prototype.config = function(key, def) {
return fan.sys.Env.cur().config(this, key, def);
}
fan.sys.Pod.prototype.doc = function() {
return null;
}
fan.sys.Pod.prototype.toStr = function() { return this.m_name; }
fan.sys.Pod.prototype.files = function() {
throw fan.sys.UnsupportedErr.make("Pod.files")
}
fan.sys.Pod.prototype.file = function(uri, checked) {
throw fan.sys.UnsupportedErr.make("Pod.file")
}
fan.sys.Pod.prototype.types = function()
{
if (this.$typesArray == null)
{
var arr = [];
for (p in this.m_types) arr.push(this.m_types[p]);
this.$typesArray = fan.sys.List.make(fan.sys.Type.$type, arr);
}
return this.$typesArray;
}
fan.sys.Pod.prototype.type = function(name, checked)
{
if (checked === undefined) checked = true;
var t = this.m_types[name];
if (t == null && checked)
{
throw fan.sys.UnknownTypeErr.make(this.m_name + "::" + name);
}
return t;
}
fan.sys.Pod.prototype.locale = function(key, def)
{
return fan.sys.Env.cur().locale(this, key, def);
}
fan.sys.Pod.prototype.$at = function(name, baseQname, mixins, facets, flags)
{
var qname = this.m_name + "::" + name;
if (this.m_types[name] != null)
throw fan.sys.Err.make("Type already exists " + qname);
var t = new fan.sys.Type(qname, baseQname, mixins, facets, flags);
this.m_types[name] = t;
return t;
}
fan.sys.Pod.prototype.$am = function(name, baseQname, mixins, facets, flags)
{
var t = this.$at(name, baseQname, mixins, facets, flags);
t.m_isMixin = true;
return t;
}
fan.sys.Pod.find = function(name, checked)
{
if (checked === undefined) checked = true;
var p = fan.sys.Pod.$pods[name];
if (p == null && checked)
throw fan.sys.UnknownPodErr.make(name);
return p;
}
fan.sys.Pod.$add = function(name)
{
if (fan.sys.Pod.$pods[name] != null)
throw fan.sys.Err.make("Pod already exists " + name);
var p = new fan.sys.Pod(name);
fan.sys.Pod.$pods[name] = p;
return p;
}
fan.sys.Pod.$pods = [];
fan.sys.Pod.prototype.log = function()
{
if (this.m_log == null) this.m_log = fan.sys.Log.get(this.m_name);
return this.m_log;
}
fan.sys.Void = function() {};
fan.sys.Void.prototype.$typeof = function() { return fan.sys.Void.$type; }
fan.sys.Version = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Version.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
var segments = fan.sys.List.make(fan.sys.Int.$type);
var seg = -1;
var valid = true;
var len = s.length;
for (var i=0; i<len; ++i)
{
var c = s.charCodeAt(i);
if (c == 46)
{
if (seg < 0 || i+1>=len) { valid = false; break; }
segments.add(seg);
seg = -1;
}
else
{
if (48 <= c && c <= 57)
{
if (seg < 0) seg = c-48;
else seg = seg*10 + (c-48);
}
else
{
valid = false; break;
}
}
}
if (seg >= 0) segments.add(seg);
if (!valid || segments.size() == 0)
{
if (checked)
throw fan.sys.ParseErr.makeStr("Version", s);
else
return null;
}
return new fan.sys.Version(segments);
}
fan.sys.Version.make = function(segments)
{
var valid = segments.size() > 0;
for (var i=0; i<segments.size(); ++i)
if (segments.get(i) < 0) valid = false;
if (!valid) throw fan.sys.ArgErr.make("Invalid Version: '" + segments + "'");
return new fan.sys.Version(segments);
}
fan.sys.Version.prototype.$ctor = function(segments)
{
this.m_segments = segments.ro();
}
fan.sys.Version.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.Version)
return this.toStr() == obj.toStr();
else
return false;
}
fan.sys.Version.prototype.compare = function(obj)
{
var that = obj;
var a = this.m_segments;
var b = that.m_segments;
for (var i=0; i<a.size() && i<b.size(); ++i)
{
var ai = a.get(i);
var bi = b.get(i);
if (ai < bi) return -1;
if (ai > bi) return +1;
}
if (a.size() < b.size()) return -1;
if (a.size() > b.size()) return +1;
return 0;
}
fan.sys.Version.prototype.hash = function() { return fan.sys.Str.hash(this.toStr()); }
fan.sys.Version.prototype.$typeof = function() { return fan.sys.Version.$type; }
fan.sys.Version.prototype.toStr = function()
{
if (this.m_str == null)
{
var s = "";
for (var i=0; i<this.m_segments.size(); ++i)
{
if (i > 0) s += '.';
s += this.m_segments.get(i);
}
this.m_s = s;
}
return this.m_s;
}
fan.sys.Version.prototype.segments = function() { return this.m_segments; }
fan.sys.Version.prototype.segment = function(index) { return this.m_segments.get(index); }
fan.sys.Version.prototype.major = function() { return this.m_segments.get(0); }
fan.sys.Version.prototype.minor = function()
{
if (this.m_segments.size() < 2) return null;
return this.m_segments.get(1);
}
fan.sys.Version.prototype.build = function()
{
if (this.m_segments.size() < 3) return null;
return this.m_segments.get(2);
}
fan.sys.Version.prototype.patch = function()
{
if (this.m_segments.size() < 4) return null;
return this.m_segments.get(3);
}
fan.sys.Date = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Date.prototype.$ctor = function(year, month, day)
{
this.m_year = year;
this.m_month = month;
this.m_day = day;
}
fan.sys.Date.prototype.equals = function(that)
{
if (that instanceof fan.sys.Date)
{
return this.m_year.valueOf() == that.m_year.valueOf() &&
this.m_month.valueOf() == that.m_month.valueOf() &&
this.m_day.valueOf() == that.m_day.valueOf();
}
return false;
}
fan.sys.Date.prototype.compare = function(that)
{
if (this.m_year.valueOf() == that.m_year.valueOf())
{
if (this.m_month.valueOf() == that.m_month.valueOf())
{
if (this.m_day.valueOf() == that.m_day.valueOf()) return 0;
return this.m_day < that.m_day ? -1 : +1;
}
return this.m_month < that.m_month ? -1 : +1;
}
return this.m_year < that.m_year ? -1 : +1;
}
fan.sys.Date.prototype.$typeof = function()
{
return fan.sys.Date.$type;
}
fan.sys.Date.prototype.toIso = function()
{
return this.toStr();
}
fan.sys.Date.prototype.hash = function()
{
return (this.m_year << 16) ^ (this.m_month << 8) ^ this.m_day;
}
fan.sys.Date.prototype.toStr = function()
{
if (this.m_str == null) this.m_str = this.toLocale("YYYY-MM-DD");
return this.m_str;
}
fan.sys.Date.prototype.year  = function() { return this.m_year; }
fan.sys.Date.prototype.month = function() { return fan.sys.Month.m_vals.get(this.m_month); }
fan.sys.Date.prototype.day   = function() { return this.m_day; }
fan.sys.Date.prototype.weekday = function()
{
var weekday = (fan.sys.DateTime.firstWeekday(this.m_year, this.m_month) + this.m_day - 1) % 7;
return fan.sys.Weekday.m_vals.get(weekday);
}
fan.sys.Date.prototype.dayOfYear = function()
{
return fan.sys.DateTime.dayOfYear(this.year(), this.month().m_ordinal, this.day())+1;
}
fan.sys.Date.prototype.weekOfYear = function(startOfWeek)
{
if (startOfWeek === undefined) startOfWeek = fan.sys.Weekday.localeStartOfWeek();
return fan.sys.DateTime.weekOfYear(this.year(), this.month().m_ordinal, this.day(), startOfWeek);
}
fan.sys.Date.prototype.plus = function(d)
{
var ticks = d.m_ticks;
if (ticks % fan.sys.Duration.nsPerDay != 0)
throw fan.sys.ArgErr.make("Duration must be even num of days");
var year = this.m_year;
var month = this.m_month;
var day = this.m_day;
var numDays = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerDay);
var dayIncr = numDays < 0 ? +1 : -1;
while (numDays != 0)
{
if (numDays > 0)
{
day++;
if (day > this.numDays(year, month))
{
day = 1;
month++;
if (month >= 12) { month = 0; year++; }
}
numDays--;
}
else
{
day--;
if (day <= 0)
{
month--;
if (month < 0) { month = 11; year--; }
day = this.numDays(year, month);
}
numDays++;
}
}
return new fan.sys.Date(year, month, day);
}
fan.sys.Date.prototype.minus = function(d)
{
return this.plus(d.negate());
}
fan.sys.Date.prototype.minusDate = function(that)
{
if (this.equals(that)) return fan.sys.Duration.m_defVal;
var a = this;
var b = that;
if (a.compare(b) > 0) { b = this; a = that; }
var days = 0;
if (a.m_year == b.m_year)
{
days = b.dayOfYear() - a.dayOfYear();
}
else
{
days = (fan.sys.DateTime.isLeapYear(a.m_year) ? 366 : 365) - a.dayOfYear();
days += b.dayOfYear();
for (var i=a.m_year+1; i<b.m_year; ++i)
days += fan.sys.DateTime.isLeapYear(i) ? 366 : 365;
}
if (a == this) days = -days;
return fan.sys.Duration.make(days * fan.sys.Duration.nsPerDay);
}
fan.sys.Date.prototype.numDays = function(year, mon)
{
if (fan.sys.DateTime.isLeapYear(year))
return fan.sys.DateTime.daysInMonLeap[mon];
else
return fan.sys.DateTime.daysInMon[mon];
}
fan.sys.Date.prototype.firstOfMonth = function()
{
if (this.m_day == 1) return this;
return new fan.sys.Date(this.m_year, this.m_month, 1);
}
fan.sys.Date.prototype.lastOfMonth = function()
{
var last = this.month().numDays(this.m_year);
if (this.m_day == last) return this;
return new fan.sys.Date(this.m_year, this.m_month, last);
}
fan.sys.Date.prototype.toLocale = function(pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
if (pattern == null)
{
var pod = fan.sys.Pod.find("sys");
pattern = fan.sys.Env.cur().locale(pod, "date", "D-MMM-YYYY", locale);
}
return fan.sys.DateTimeStr.makeDate(pattern, locale, this).format();
}
fan.sys.Date.fromLocale = function(s, pattern, checked)
{
if (checked === undefined) checked = true;
return fan.sys.DateTimeStr.make(pattern, null).parseDate(s, checked);
}
fan.sys.Date.make = function(year, month, day)
{
return new fan.sys.Date(year, month.m_ordinal, day);
}
fan.sys.Date.today = function(tz)
{
var d = new Date();
return new fan.sys.Date(d.getFullYear(), d.getMonth(), d.getDate());
}
fan.sys.Date.yesterday = function(tz)
{
return fan.sys.Date.today(tz).minus(fan.sys.Duration.m_oneDay);
}
fan.sys.Date.tomorrow = function(tz)
{
return fan.sys.Date.today(tz).plus(fan.sys.Duration.m_oneDay);
}
fan.sys.Date.fromStr = function(s, checked)
{
try
{
var num = function(x, index) { return x.charCodeAt(index) - 48; }
var year  = num(s, 0)*1000 + num(s, 1)*100 + num(s, 2)*10 + num(s, 3);
var month = num(s, 5)*10   + num(s, 6) - 1;
var day   = num(s, 8)*10   + num(s, 9);
if (s.charAt(4) != '-' || s.charAt(7) != '-' || s.length != 10)
throw new Error();
return new fan.sys.Date(year, month, day);
}
catch (err)
{
if (checked != null && !checked) return null;
throw fan.sys.ParseErr.makeStr("Date", s);
}
}
fan.sys.Date.fromIso = function(s, checked)
{
return fan.sys.Date.fromStr(s, checked);
}
fan.sys.Date.prototype.isYesterday = function() { return this.equals(fan.sys.Date.today().plus(fan.sys.Duration.m_negOneDay)); }
fan.sys.Date.prototype.isToday     = function() { return this.equals(fan.sys.Date.today()); }
fan.sys.Date.prototype.isTomorrow  = function() { return this.equals(fan.sys.Date.today().plus(fan.sys.Duration.m_oneDay)); }
fan.sys.Date.prototype.toDateTime = function(t, tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
return fan.sys.DateTime.makeDT(this, t, tz);
}
fan.sys.Date.prototype.midnight = function(tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
return fan.sys.DateTime.makeDT(this, fan.sys.Time.m_defVal, tz);
}
fan.sys.Date.prototype.toCode = function()
{
if (this.equals(fan.sys.Date.m_defVal)) return "Date.defVal";
return "Date(\"" + this.toString() + "\")";
}
fan.sys.Enum = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Enum.prototype.$ctor = function() {}
fan.sys.Enum.make = function(ordinal, name)
{
throw new Error();
}
fan.sys.Enum.make$ = function(self, ordinal, name)
{
if (name == null) throw fan.sys.NullErr.make();
self.m_ordinal = ordinal;
self.m_name = name;
}
fan.sys.Enum.doFromStr = function(t, name, checked)
{
var slot = t.slot(name, false);
if (slot != null && (slot.m_flags & fan.sys.FConst.Enum) != 0)
{
try
{
return slot.get(null);
}
catch (err) {}
}
if (!checked) return null;
throw fan.sys.ParseErr.makeStr(t.qname(), name);
}
fan.sys.Enum.prototype.equals = function(that)
{
return this == that;
}
fan.sys.Enum.prototype.compare = function(that)
{
if (this.m_ordinal < that.m_ordinal) return -1;
if (this.m_ordinal == that.m_ordinal) return 0;
return +1;
}
fan.sys.Enum.prototype.$typeof = function()    { return fan.sys.Enum.$type; }
fan.sys.Enum.prototype.toStr = function()   { return this.m_name; }
fan.sys.Enum.prototype.ordinal = function() { return this.m_ordinal; }
fan.sys.Enum.prototype.$name = function()    { return this.m_name; }
fan.sys.Endian = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.Endian.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
}
fan.sys.Endian.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.Endian.$type, name, checked);
}
fan.sys.Endian.prototype.$typeof = function()
{
return fan.sys.Endian.$type;
}
fan.sys.Test = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Test.prototype.$ctor = function()
{
this.verifyCount = 0;
}
fan.sys.Test.make$ = function(self)
{
}
fan.sys.Test.prototype.verify = function(cond, msg)
{
if (!cond) this.fail(msg);
this.verifyCount++;
}
fan.sys.Test.prototype.verifyTrue = function(cond, msg)
{
return this.verify(cond, msg);
}
fan.sys.Test.prototype.verifyFalse = function(cond, msg)
{
if (cond) this.fail(msg);
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNull = function(a, msg)
{
if (msg === undefined) msg = null;
if (a != null)
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(a) + " is not null";
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNotNull = function(a, msg)
{
if (msg === undefined) msg = null;
if (a == null)
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(a) + " is null";
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyEq = function(expected, actual, msg)
{
if (!fan.sys.ObjUtil.equals(expected, actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " != " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNotEq = function(expected, actual, msg)
{
if (fan.sys.ObjUtil.equals(expected, actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " == " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifySame = function(expected, actual, msg)
{
if (!fan.sys.ObjUtil.equals(expected, actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " !== " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNotSame = function(expected, actual, msg)
{
if (fan.sys.ObjUtil.equals(expected == actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " === " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyType = function(obj, t)
{
this.verifyEq(fan.sys.Type.of(obj), t);
}
fan.sys.Test.prototype.verifyErr = function(errType, func)
{
try
{
func.call();
}
catch (err)
{
var e = fan.sys.Err.make(err);
if (e.$typeof() == errType || errType == null) { this.verifyCount++; return; }
console.log("  verifyErr: " + e + "\n");
this.fail(e.$typeof() + " thrown, expected " + errType);
}
this.fail("No err thrown, expected " + errType);
}
fan.sys.Test.prototype.verifyErrMsg = function(errType, errMsg, func)
{
try
{
func.call();
}
catch (err)
{
var e = fan.sys.Err.make(err);
if (e.$typeof() != errType) {
print("  verifyErrMsg: " + e + "\n");
this.fail(e.$typeof() + " thrown, expected " + errType);
}
this.verifyCount++;
this.verifyEq(errMsg, e.msg());
return;
}
this.fail("No err thrown, expected " + errType);
}
fan.sys.Test.prototype.fail = function(msg)
{
throw this.err(msg);
}
fan.sys.Test.prototype.err = function(msg)
{
if (msg == null)
return fan.sys.Err.make("Test failed");
else
return fan.sys.Err.make("Test failed: " + msg);
}
fan.sys.Test.prototype.$typeof = function()
{
return fan.sys.Test.$type;
}
fan.sys.Test.prototype.setup = function() {}
fan.sys.Test.prototype.teardown = function() {}
fan.sys.Test.prototype.tempDir = function()
{
if (this.m_tempDir == null && fan.sys.Env.$nodejs)
{
var x = fan.sys.Env.cur().tempDir();
this.m_tempDir = x.plus(fan.sys.Uri.fromStr("test/"), false);
this.m_tempDir.$delete();
this.m_tempDir.create();
}
return this.m_tempDir;
}
function TestException(msg)
{
this.mge = msg;
this.name = "TestException";
}
TestException.prototype.toString = function()
{
return this.name + ": " + this.msg;
}
fan.sys.Duration = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Duration.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var len = s.length;
var x1  = s.charAt(len-1);
var x2  = s.charAt(len-2);
var x3  = s.charAt(len-3);
var dot = s.indexOf('.') > 0;
var mult = -1;
var suffixLen  = -1;
switch (x1)
{
case 's':
if (x2 == 'n') { mult=1; suffixLen=2; }
if (x2 == 'm') { mult=1000000; suffixLen=2; }
break;
case 'c':
if (x2 == 'e' && x3 == 's') { mult=1000000000; suffixLen=3; }
break;
case 'n':
if (x2 == 'i' && x3 == 'm') { mult=60000000000; suffixLen=3; }
break;
case 'r':
if (x2 == 'h') { mult=3600000000000; suffixLen=2; }
break;
case 'y':
if (x2 == 'a' && x3 == 'd') { mult=86400000000000; suffixLen=3; }
break;
}
if (mult < 0) throw new Error();
s = s.substring(0, len-suffixLen);
if (dot)
{
var num = parseFloat(s);
if (isNaN(num)) throw new Error();
return fan.sys.Duration.make(Math.floor(num*mult));
}
else
{
var num = fan.sys.Int.fromStr(s);
return fan.sys.Duration.make(num*mult);
}
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Duration", s);
}
}
fan.sys.Duration.now = function()
{
var ms = new Date().getTime();
return fan.sys.Duration.make(ms * fan.sys.Duration.nsPerMilli);
}
fan.sys.Duration.nowTicks = function()
{
return fan.sys.Duration.now().ticks();
}
fan.sys.Duration.boot = function()
{
return fan.sys.Duration.m_boot;
}
fan.sys.Duration.uptime = function()
{
return fan.sys.Duration.now().minus(fan.sys.Duration.m_boot);
}
fan.sys.Duration.make = function(ticks)
{
var self = new fan.sys.Duration();
self.m_ticks = ticks;
return self;
}
fan.sys.Duration.makeMillis = function(ms)
{
return fan.sys.Duration.make(ms*1000000);
}
fan.sys.Duration.makeSec = function(secs)
{
return fan.sys.Duration.make(secs*1000000000);
}
fan.sys.Duration.prototype.$ctor = function(ticks)
{
this.m_ticks = 0;
}
fan.sys.Duration.prototype.equals = function(that)
{
if (that instanceof fan.sys.Duration)
return this.m_ticks == that.m_ticks;
else
return false;
}
fan.sys.Duration.prototype.compare = function(that)
{
if (this.m_ticks < that.m_ticks) return -1;
if (this.m_ticks == that.m_ticks) return 0;
return +1;
}
fan.sys.Duration.prototype.hash = function()
{
return (this.m_ticks ^ (this.m_ticks >> 32));
}
fan.sys.Duration.prototype.$typeof = function()
{
return fan.sys.Duration.$type;
}
fan.sys.Duration.prototype.ticks = function()
{
return this.m_ticks;
}
fan.sys.Duration.prototype.negate = function() { return fan.sys.Duration.make(-this.m_ticks); }
fan.sys.Duration.prototype.plus = function(x)  { return fan.sys.Duration.make(this.m_ticks + x.m_ticks); }
fan.sys.Duration.prototype.minus = function(x) { return fan.sys.Duration.make(this.m_ticks - x.m_ticks); }
fan.sys.Duration.prototype.mult = function(x)  { return fan.sys.Duration.make(this.m_ticks * x); }
fan.sys.Duration.prototype.multFloat = function(x)  { return fan.sys.Duration.make(this.m_ticks * x); }
fan.sys.Duration.prototype.div = function(x)   { return fan.sys.Duration.make(this.m_ticks / x); }
fan.sys.Duration.prototype.divFloat = function(x)   { return fan.sys.Duration.make(this.m_ticks / x); }
fan.sys.Duration.prototype.floor = function(accuracy)
{
if (this.m_ticks % accuracy.m_ticks == 0) return this;
return fan.sys.Duration.make(this.m_ticks - (this.m_ticks % accuracy.m_ticks));
}
fan.sys.Duration.prototype.min = function(that)
{
if (this.m_ticks <= that.m_ticks) return this;
else return that;
}
fan.sys.Duration.prototype.max = function(that)
{
if (this.m_ticks >= that.m_ticks) return this;
else return that;
}
fan.sys.Duration.prototype.clamp = function(min, max)
{
if (this.m_ticks < min.m_ticks) return min;
if (this.m_ticks > max.m_ticks) return max;
return this;
}
fan.sys.Duration.prototype.abs = function()
{
if (this.m_ticks >= 0) return this;
return fan.sys.Duration.make(-this.m_ticks);
}
fan.sys.Duration.prototype.toStr = function()
{
if (this.m_ticks == 0) return "0ns";
var ns = this.m_ticks;
if (ns % fan.sys.Duration.nsPerMilli == 0)
{
if (ns % fan.sys.Duration.nsPerDay == 0) return ns/fan.sys.Duration.nsPerDay + "day";
if (ns % fan.sys.Duration.nsPerHr  == 0) return ns/fan.sys.Duration.nsPerHr  + "hr";
if (ns % fan.sys.Duration.nsPerMin == 0) return ns/fan.sys.Duration.nsPerMin + "min";
if (ns % fan.sys.Duration.nsPerSec == 0) return ns/fan.sys.Duration.nsPerSec + "sec";
return ns/fan.sys.Duration.nsPerMilli + "ms";
}
return ns + "ns";
}
fan.sys.Duration.prototype.$literalEncode = function(out) { out.w(this.toStr()); }
fan.sys.Duration.prototype.toCode = function() { return this.toStr(); }
fan.sys.Duration.prototype.toMillis = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerMilli); }
fan.sys.Duration.prototype.toSec    = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerSec); }
fan.sys.Duration.prototype.toMin    = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerMin); }
fan.sys.Duration.prototype.toHour   = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerHr); }
fan.sys.Duration.prototype.toDay    = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerDay); }
fan.sys.Duration.prototype.toLocale = function()
{
var ticks = this.m_ticks;
var pod = fan.sys.Duration.$type.m_pod;
var env = fan.sys.Env.cur();
var locale = fan.sys.Locale.cur();
if (ticks < 0) return "-" + fan.sys.Duration.make(-ticks).toLocale();
if (ticks < 1000) return ticks + env.locale(pod, "nsAbbr", "ns",  locale);
if (ticks < 2*fan.sys.Duration.nsPerMilli)
{
var s = '';
var ms = Math.floor(ticks/fan.sys.Duration.nsPerMilli);
var us = Math.floor((ticks - ms*fan.sys.Duration.nsPerMilli)/1000);
s += ms;
s += '.';
if (us < 100) s += '0';
if (us < 10)  s += '0';
s += us;
if (s.charAt(s.length-1) == '0') s = s.substr(0, s.length-1);
if (s.charAt(s.length-1) == '0') s = s.substr(0, s.length-1);
s += env.locale(pod, "msAbbr", "ms",  locale);;
return s;
}
if (ticks < 2*fan.sys.Duration.nsPerSec)
return Math.floor(ticks/fan.sys.Duration.nsPerMilli) + env.locale(pod, "msAbbr", "ms",  locale);
if (ticks < 1*fan.sys.Duration.nsPerMin)
return Math.floor(ticks/fan.sys.Duration.nsPerSec) + env.locale(pod, "secAbbr", "sec",  locale);
var days = Math.floor(ticks/fan.sys.Duration.nsPerDay); ticks -= days*fan.sys.Duration.nsPerDay;
var hr   = Math.floor(ticks/fan.sys.Duration.nsPerHr);  ticks -= hr*fan.sys.Duration.nsPerHr;
var min  = Math.floor(ticks/fan.sys.Duration.nsPerMin); ticks -= min*fan.sys.Duration.nsPerMin;
var sec  = Math.floor(ticks/fan.sys.Duration.nsPerSec);
var s = '';
if (days > 0) s += days + (days == 1 ? env.locale(pod, "dayAbbr", "day", locale) : env.locale(pod, "daysAbbr", "days", locale)) + " ";
if (hr  > 0) s += hr  + env.locale(pod, "hourAbbr", "hr",  locale) + " ";
if (min > 0) s += min + env.locale(pod, "minAbbr",  "min", locale) + " ";
if (sec > 0) s += sec + env.locale(pod, "secAbbr",  "sec", locale) + " ";
return s.substring(0, s.length-1);
}
fan.sys.Duration.prototype.toIso = function()
{
var s = '';
var ticks = this.m_ticks;
if (ticks == 0) return "PT0S";
if (ticks < 0) s += '-';
s += 'P';
var abs  = Math.abs(ticks);
var sec  = Math.floor(abs / fan.sys.Duration.nsPerSec);
var frac = abs % fan.sys.Duration.nsPerSec;
if (sec > fan.sys.Duration.secPerDay)
{
s += Math.floor(sec/fan.sys.Duration.secPerDay) + 'D';
sec = sec % fan.sys.Duration.secPerDay;
}
if (sec == 0 && frac == 0) return s;
s += 'T';
if (sec > fan.sys.Duration.secPerHr)
{
s += Math.floor(sec/fan.sys.Duration.secPerHr) + 'H';
sec = sec % fan.sys.Duration.secPerHr;
}
if (sec > fan.sys.Duration.secPerMin)
{
s += Math.floor(sec/fan.sys.Duration.secPerMin) + 'M';
sec = sec % fan.sys.Duration.secPerMin;
}
if (sec == 0 && frac == 0) return s;
s += sec;
if (frac != 0)
{
s += '.';
for (var i=10; i<=100000000; i*=10) if (frac < i) s += '0';
s += frac;
var x = s.length-1;
while (s.charAt(x) == '0') x--;
s = s.substr(0, x+1);
}
s += 'S';
return s;
}
fan.sys.Duration.fromIso = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var ticks = 0;
var neg = false;
var p = new fan.sys.IsoParser(s);
if (p.cur == 45) { neg = true; p.consume(); }
else if (p.cur == 43) { p.consume(); }
p.consume(80);
if (p.cur == -1) throw new Error();
var num = 0;
if (p.cur != 84)
{
num = p.num();
p.consume(68);
ticks += num * fan.sys.Duration.nsPerDay;
if (p.cur == -1) return fan.sys.Duration.make(ticks);
}
p.consume(84);
if (p.cur == -1) throw new Error();
num = p.num();
if (num >= 0 && p.cur == 72)
{
p.consume();
ticks += num * fan.sys.Duration.nsPerHr;
num = p.num();
}
if (num >= 0 && p.cur == 77)
{
p.consume();
ticks += num * fan.sys.Duration.nsPerMin;
num = p.num();
}
if (num >= 0 && p.cur == 83 || p.cur == 46)
{
ticks += num * fan.sys.Duration.nsPerSec;
if (p.cur == 46) { p.consume(); ticks += p.frac(); }
p.consume(83);
}
if (p.cur != -1) throw new Error();
if (neg) ticks = -ticks;
return fan.sys.Duration.make(ticks);
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("ISO 8601 Duration",  s);
}
}
fan.sys.IsoParser = function(s)
{
this.s = s;
this.cur = s.charCodeAt(0);
this.off = 0;
this.curIsDigit = false;
}
fan.sys.IsoParser.prototype.num = function()
{
if (!this.curIsDigit && this.cur != -1 && this.cur != 46)
throw new Error();
var num = 0;
while (this.curIsDigit)
{
num = num*10 + this.digit();
this.consume();
}
return num;
}
fan.sys.IsoParser.prototype.frac = function()
{
var ticks = 0;
for (var i=100000000; i>=0; i/=10)
{
if (!this.curIsDigit) break;
ticks += this.digit() * i;
this.consume();
}
return ticks;
}
fan.sys.IsoParser.prototype.digit = function() { return this.cur - 48; }
fan.sys.IsoParser.prototype.consume = function(ch)
{
if (ch != null && this.cur != ch) throw new Error();
this.off++;
if (this.off < this.s.length)
{
this.cur = this.s.charCodeAt(this.off);
this.curIsDigit = 48 <= this.cur && this.cur <= 57;
}
else
{
this.cur = -1;
this.curIsDigit = false;
}
}
fan.sys.Decimal = fan.sys.Obj.$extend(fan.sys.Num);
fan.sys.Decimal.prototype.$ctor = function() {}
fan.sys.Decimal.make = function(val)
{
var x = new Number(val);
x.$fanType = fan.sys.Decimal.$type;
return x;
}
fan.sys.Decimal.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
for (var i=0; i<s.length; i++)
if (!fan.sys.Int.isDigit(s.charCodeAt(i)) && s[i] !== '.')
throw new Error();
return fan.sys.Decimal.make(parseFloat(s));
}
catch (e)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Decimal",  s);
}
}
fan.sys.Decimal.toFloat = function(self)
{
return fan.sys.Float.make(self.valueOf());
}
fan.sys.Decimal.negate = function(self)
{
return fan.sys.Decimal.make(-self.valueOf());
}
fan.sys.Decimal.equals = function(self, that)
{
if (that != null && self.$fanType === that.$fanType)
{
if (isNaN(self) || isNaN(that)) return false;
return self.valueOf() == that.valueOf();
}
return false;
}
fan.sys.Decimal.hash = function(self)
{
fan.sys.Str.hash(self.toString());
}
fan.sys.Decimal.encode = function(self, out)
{
out.w(""+self).w("d");
}
fan.sys.Decimal.toCode = function(self)
{
return "" + self + "d";
}
fan.sys.Decimal.toLocale = function(self, pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
return fan.sys.Float.toLocale(self, pattern, locale);
}
fan.sys.Decimal.toStr = function(self)
{
return fan.sys.Float.toStr(self);
}
fan.sys.Locale = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Locale.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
var len = s.length;
try
{
if (len == 2)
{
if (fan.sys.Str.isLower(s))
return new fan.sys.Locale(s, s, null);
}
if (len == 5)
{
var lang = s.substring(0, 2);
var country = s.substring(3, 5);
if (fan.sys.Str.isLower(lang) && fan.sys.Str.isUpper(country) && s.charAt(2) == '-')
return new fan.sys.Locale(s, lang, country);
}
}
catch (err) {}
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Locale", s);
}
fan.sys.Locale.prototype.$ctor = function(str, lang, country)
{
this.m_str       = str;
this.m_lang      = lang;
this.m_country   = country;
this.m_strProps  = fan.sys.Uri.fromStr("locale/" + str + ".props");
this.m_langProps = fan.sys.Uri.fromStr("locale/" + lang + ".props");
}
fan.sys.Locale.cur = function()
{
if (fan.sys.Locale.$cur == null)
{
var loc = fan.sys.Env.cur().m_vars.get("locale");
if (loc == null) loc = "en-US"
fan.sys.Locale.$cur = fan.sys.Locale.fromStr(loc);
}
return fan.sys.Locale.$cur;
}
fan.sys.Locale.setCur = function(locale)
{
if (locale == null) throw fan.sys.NullErr.make();
fan.sys.Locale.$cur = locale;
}
fan.sys.Locale.prototype.use = function(func)
{
var old = fan.sys.Locale.cur();
try
{
fan.sys.Locale.setCur(this);
func.call(this);
}
finally
{
fan.sys.Locale.setCur(old);
}
return this;
}
fan.sys.Locale.prototype.lang = function() { return this.m_lang; }
fan.sys.Locale.prototype.country = function() { return this.m_country; }
fan.sys.Locale.prototype.$typeof = function() { return fan.sys.Locale.$type; }
fan.sys.Locale.prototype.hash = function() { return fan.sys.Str.hash(this.m_str); }
fan.sys.Locale.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.Locale)
return obj.m_str == this.m_str;
return false;
}
fan.sys.Locale.prototype.toStr = function() { return this.m_str; }
fan.sys.Locale.prototype.monthByName = function(name)
{
if (this.m_monthsByName == null)
{
var map = {};
for (var i=0; i<fan.sys.Month.m_vals.size(); ++i)
{
var m = fan.sys.Month.m_vals.get(i);
map[fan.sys.Str.lower(m.abbr(this))] = m;
map[fan.sys.Str.lower(m.full(this))] = m;
}
this.m_monthsByName = map;
}
return this.m_monthsByName[name];
}
fan.sys.Locale.prototype.numSymbols = function()
{
if (this.m_numSymbols == null)
{
var pod = fan.sys.Pod.find("sys");
var env = fan.sys.Env.cur();
this.m_numSymbols =
{
decimal:  env.locale(pod, "numDecimal",  ".",    this),
grouping: env.locale(pod, "numGrouping", ",",    this),
minus:    env.locale(pod, "numMinus",    "-" ,   this),
percent:  env.locale(pod, "numPercent",  "%",    this),
posInf:   env.locale(pod, "numPosInf",   "+Inf", this),
negInf:   env.locale(pod, "numNegInf",   "-Inf", this),
nan:      env.locale(pod, "numNaN",      "NaN",  this)
};
}
return this.m_numSymbols;
}
fan.sys.This = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.This.prototype.$ctor = function() {}
fan.sys.This.prototype.$typeof = function() { return fan.sys.This.$type; }
fan.sys.StrBuf = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.StrBuf.prototype.$ctor = function()
{
this.m_str = "";
}
fan.sys.StrBuf.prototype.$typeof = function()
{
return fan.sys.StrBuf.$type;
}
fan.sys.StrBuf.prototype.add = function(obj)
{
this.m_str += obj==null ? "null" : fan.sys.ObjUtil.toStr(obj);
return this;
}
fan.sys.StrBuf.prototype.addChar = function(ch)
{
this.m_str += String.fromCharCode(ch);
return this;
}
fan.sys.StrBuf.prototype.capacity = function()
{
if (this.m_capacity == null) return this.m_str.length;
return this.m_capacity;
}
fan.sys.StrBuf.prototype.capacity$ = function(c) { this.m_capacity = c; }
fan.sys.StrBuf.prototype.m_capacity = null;
fan.sys.StrBuf.prototype.clear = function()
{
this.m_str = "";
return this;
}
fan.sys.StrBuf.prototype.get = function(i)
{
if (i < 0) i = this.m_str.length+i;
if (i < 0 || i >= this.m_str.length) throw fan.sys.IndexErr.make(i);
return this.m_str.charCodeAt(i);
}
fan.sys.StrBuf.prototype.getRange = function(range)
{
var size = this.m_str.length;
var s = range.$start(size);
var e = range.$end(size);
if (e+1 < s) throw fan.sys.IndexErr.make(range);
return this.m_str.substr(s, (e-s)+1);
}
fan.sys.StrBuf.prototype.set = function(i, ch)
{
if (i < 0) i = this.m_str.length+i;
if (i < 0 || i >= this.m_str.length) throw fan.sys.IndexErr.make(i);
this.m_str = this.m_str.substr(0,i) + String.fromCharCode(ch) + this.m_str.substr(i+1);
return this;
}
fan.sys.StrBuf.prototype.join = function(x, sep)
{
if (sep === undefined) sep = " ";
var s = (x == null) ? "null" : fan.sys.ObjUtil.toStr(x);
if (this.m_str.length > 0) this.m_str += sep;
this.m_str += s;
return this;
}
fan.sys.StrBuf.prototype.insert = function(i, x)
{
var s = (x == null) ? "null" : fan.sys.ObjUtil.toStr(x);
if (i < 0) i = this.m_str.length+i;
if (i < 0 || i > this.m_str.length) throw fan.sys.IndexErr.make(i);
this.m_str = this.m_str.substr(0,i) + s + this.m_str.substr(i);
return this;
}
fan.sys.StrBuf.prototype.remove = function(i)
{
if (i < 0) i = this.m_str.length+i;
if (i< 0 || i >= this.m_str.length) throw fan.sys.IndexErr.make(i);
this.m_str = this.m_str.substr(0,i) + this.m_str.substr(i+1);
return this;
}
fan.sys.StrBuf.prototype.removeRange = function(r)
{
var s = r.$start(this.m_str.length);
var e = r.$end(this.m_str.length);
var n = e - s + 1;
if (s < 0 || n < 0) throw fan.sys.IndexErr.make(r);
this.m_str = this.m_str.substr(0,s) + this.m_str.substr(e+1);
return this;
}
fan.sys.StrBuf.prototype.replaceRange = function(r, str)
{
var s = r.$start(this.m_str.length);
var e = r.$end(this.m_str.length);
var n = e - s + 1;
if (s < 0 || n < 0) throw fan.sys.IndexErr.make(r);
this.m_str = this.m_str.substr(0,s) + str + this.m_str.substr(e+1);
return this;
}
fan.sys.StrBuf.prototype.reverse = function()
{
this.m_str = fan.sys.Str.reverse(this.m_str);
return this;
}
fan.sys.StrBuf.prototype.isEmpty = function()
{
return this.m_str.length == 0;
}
fan.sys.StrBuf.prototype.size = function()
{
return this.m_str.length;
}
fan.sys.StrBuf.prototype.toStr = function()
{
return this.m_str;
}
fan.sys.StrBuf.prototype.out = function()
{
return new fan.sys.StrBufOutStream(this);
}
fan.sys.StrBuf.make = function() { return new fan.sys.StrBuf(); }
fan.sys.LogRec = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.LogRec.prototype.$ctor = function() {}
fan.sys.LogRec.make = function(time, level, logName, msg, err)
{
if (err === undefined) err = null;
var self = new fan.sys.LogRec();
self.m_time    = time;
self.m_level   = level;
self.m_logName = logName;
self.m_msg     = msg;
self.m_err     = err;
return self;
}
fan.sys.LogRec.prototype.toStr = function()
{
var ts = this.m_time.toLocale("hh:mm:ss DD-MMM-YY");
return '[' + ts + '] [' + this.m_level + '] [' + this.m_logName + '] ' + this.m_msg;
}
fan.sys.LogRec.prototype.print = function(out)
{
fan.sys.ObjUtil.echo(this.toStr());
if (this.m_err != null) this.m_err.trace();
}
fan.sys.LogRec.prototype.$typeof = function() { return fan.sys.LogRec.$type; }
fan.sys.Func = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Func.prototype.$ctor = function()
{
}
fan.sys.Func.make$closure = function(spec, func)
{
var self = new fan.sys.Func();
self.m_params = spec.m_params;
self.m_return = spec.m_type.ret;
self.m_type   = spec.m_type;
self.m_func   = func;
return self;
}
fan.sys.Func.make = function(params, ret, func)
{
var self = new fan.sys.Func();
fan.sys.Func.make$(self, params, ret, func);
return self;
}
fan.sys.Func.make$ = function(self, params, ret, func)
{
var types = [];
for (var i=0; i<params.size(); i++)
types.push(params.get(i).m_type);
self.m_params = params;
self.m_return = ret;
self.m_type   = new fan.sys.FuncType(types, ret);
self.m_func   = func;
}
fan.sys.Func.prototype.$typeof = function() { return this.m_type; }
fan.sys.Func.prototype.toImmutable = function()
{
if (this.isImmutable()) return this;
throw fan.sys.NotImmutableErr.make("Func");
}
fan.sys.Func.prototype.params = function() { return this.m_params; }
fan.sys.Func.prototype.arity = function() { return this.m_params.size(); }
fan.sys.Func.prototype.returns = function() { return this.m_return; }
fan.sys.Func.prototype.method = function() { return null; }
fan.sys.Func.prototype.call = function() { return this.m_func.apply(null, arguments); }
fan.sys.Func.prototype.callList = function(args) { return this.m_func.apply(null, args.m_values); }
fan.sys.Func.prototype.callOn = function(obj, args) { return this.m_func.apply(obj, args.m_values); }
fan.sys.Func.prototype.enterCtor = function(obj) {}
fan.sys.Func.prototype.exitCtor = function() {}
fan.sys.Func.prototype.checkInCtor = function(obj) {}
fan.sys.Func.prototype.toStr = function() { return "sys::Func"; }
fan.sys.Func.prototype.retype = function(t)
{
if (t instanceof fan.sys.FuncType)
{
var params = [];
for (var i=0; i < t.pars.length; ++i)
params.push(new fan.sys.Param(String.fromCharCode(i+65), t.pars[i], 0));
var paramList = fan.sys.List.make(fan.sys.Param.$type, params);
return fan.sys.Func.make(paramList, t.ret, this.m_func);
}
else
throw fan.sys.ArgErr.make(fan.sys.Str.plus("Not a Func type: ", t));
}
fan.sys.ClosureFuncSpec$ = function(ret, params)
{
var types = [];
var paramDefs = [];
var i, param;
if (params.length % 3 != 0) {
throw fan.sys.ArgErr("Invalid params " + params.toString);
}
for (i=0; i<params.length; i+=3) {
param = new fan.sys.Param(params[i], params[i+1], params[i+2]);
paramDefs.push(param);
types.push(param.m_type);
}
this.m_params = fan.sys.ObjUtil.toImmutable(fan.sys.List.make(fan.sys.Param.$type, paramDefs));
this.m_type = fan.sys.ObjUtil.toImmutable(new fan.sys.FuncType(types, ret));
}
fan.sys.Range = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Range.prototype.$ctor = function(start, end, exclusive)
{
this.m_start = start;
this.m_end = end;
this.m_exclusive = (exclusive === undefined) ? false : exclusive;
}
fan.sys.Range.makeInclusive = function(start, end)
{
return new fan.sys.Range(start, end, false);
}
fan.sys.Range.makeExclusive = function(start, end)
{
return new fan.sys.Range(start, end, true);
}
fan.sys.Range.make = function(start, end, exclusive)
{
return new fan.sys.Range(start, end, exclusive);
}
fan.sys.Range.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var dot = s.indexOf('.');
if (s.charAt(dot+1) != '.') throw new Error();
var exclusive = s.charAt(dot+2) == '<';
var start = fan.sys.Int.fromStr(s.substr(0, dot));
var end   = fan.sys.Int.fromStr(s.substr(dot + (exclusive?3:2)));
return new fan.sys.Range(start, end, exclusive);
}
catch (err) {}
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Range", s);
}
fan.sys.Range.prototype.start = function() { return this.m_start; }
fan.sys.Range.prototype.end   = function() { return this.m_end; }
fan.sys.Range.prototype.inclusive = function() { return !this.m_exclusive; }
fan.sys.Range.prototype.exclusive = function() { return this.m_exclusive; }
fan.sys.Range.prototype.isEmpty = function()
{
return this.m_exclusive && this.m_start == this.m_end;
}
fan.sys.Range.prototype.min = function()
{
if (this.isEmpty()) return null;
if (this.m_end < this.m_start) return this.m_exclusive ? this.m_end+1 : this.m_end;
return this.m_start;
}
fan.sys.Range.prototype.max = function()
{
if (this.isEmpty()) return null;
if (this.m_end < this.m_start) return this.m_start;
return this.m_exclusive ? this.m_end-1 : this.m_end;
}
fan.sys.Range.prototype.first = function()
{
if (this.isEmpty()) return null;
return this.m_start;
}
fan.sys.Range.prototype.last = function()
{
if (this.isEmpty()) return null;
if (!this.m_exclusive) return this.m_end;
if (this.m_start < this.m_end) return this.m_end-1;
return this.m_end+1;
}
fan.sys.Range.prototype.contains = function(i)
{
if (this.m_start < this.m_end)
{
if (this.m_exclusive)
return this.m_start <= i && i < this.m_end;
else
return this.m_start <= i && i <= this.m_end;
}
else
{
if (this.m_exclusive)
return this.m_end < i && i <= this.m_start;
else
return this.m_end <= i && i <= this.m_start;
}
}
fan.sys.Range.prototype.offset = function(offset)
{
if (offset == 0) return this;
return fan.sys.Range.make(this.m_start+offset, this.m_end+offset, this.m_exclusive);
}
fan.sys.Range.prototype.each = function(func)
{
var start = this.m_start;
var end   = this.m_end;
if (start < end)
{
if (this.m_exclusive) --end;
for (var i=start; i<=end; ++i) func.call(i);
}
else
{
if (this.m_exclusive) ++end;
for (var i=start; i>=end; --i) func.call(i);
}
}
fan.sys.Range.prototype.eachWhile = function(func)
{
var start = this.m_start;
var end   = this.m_end;
var r = null
if (start < end)
{
if (this.m_exclusive) --end;
for (var i=start; i<=end; ++i)
{
r = func.call(i);
if (r != null) return r;
}
}
else
{
if (this.m_exclusive) ++end;
for (var i=start; i>=end; --i)
{
r = func.call(i);
if (r != null) return r;
}
}
return null;
}
fan.sys.Range.prototype.map = function(func)
{
var r = func.returns();
if (r === fan.sys.Void.$type) r = fan.sys.Obj.$type.toNullable();
var acc   = fan.sys.List.make(r);
var start = this.m_start;
var end   = this.m_end;
if (start < end)
{
if (this.m_exclusive) --end;
for (var i=start; i<=end; ++i) acc.add(func.call(i));
}
else
{
if (this.m_exclusive) ++end;
for (var i=start; i>=end; --i) acc.add(func.call(i));
}
return acc;
}
fan.sys.Range.prototype.toList = function()
{
var start = this.m_start;
var end = this.m_end;
var acc = fan.sys.List.make(fan.sys.Int.$type);
if (start < end)
{
if (this.m_exclusive) --end;
for (var i=start; i<=end; ++i) acc.push(i);
}
else
{
if (this.m_exclusive) ++end;
for (var i=start; i>=end; --i) acc.push(i);
}
return acc;
}
fan.sys.Range.prototype.random = function() { return fan.sys.Int.random(this); }
fan.sys.Range.prototype.equals = function(that)
{
if (that instanceof fan.sys.Range)
{
return this.m_start == that.m_start &&
this.m_end == that.m_end &&
this.m_exclusive == that.m_exclusive;
}
return false;
}
fan.sys.Range.prototype.hash = function() { return (this.m_start << 24) ^ this.m_end; }
fan.sys.Range.prototype.toStr = function()
{
if (this.m_exclusive)
return this.m_start + "..<" + this.m_end;
else
return this.m_start + ".." + this.m_end;
}
fan.sys.Range.prototype.$typeof = function() { return fan.sys.Range.$type;}
fan.sys.Range.prototype.$start = function(size)
{
if (size == null) return this.m_start;
var x = this.m_start;
if (x < 0) x = size + x;
if (x > size) throw fan.sys.IndexErr.make(this);
return x;
}
fan.sys.Range.prototype.$end = function(size)
{
if (size == null) return this.m_end;
var x = this.m_end;
if (x < 0) x = size + x;
if (this.m_exclusive) x--;
if (x >= size) throw fan.sys.IndexErr.make(this);
return x;
}
fan.sys.Log = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Log.prototype.$ctor = function()
{
this.m_name  = null;
this.m_level = fan.sys.LogLevel.m_info;
}
fan.sys.Log.list = function()
{
return fan.sys.List.make(fan.sys.Log.$type, fan.sys.Log.m_byName).ro();
}
fan.sys.Log.find = function(name, checked)
{
if (checked === undefined) checked = true;
var log = fan.sys.Log.m_byName[name];
if (log != null) return log;
if (checked) throw fan.sys.Err.make("Unknown log: " + name);
return null;
}
fan.sys.Log.get = function(name)
{
var log = fan.sys.Log.m_byName[name];
if (log != null) return log;
return fan.sys.Log.make(name, true);
}
fan.sys.Log.make = function(name, register)
{
var self = new fan.sys.Log();
fan.sys.Log.make$(self, name, register);
return self;
}
fan.sys.Log.make$ = function(self, name, register)
{
fan.sys.Uri.checkName(name);
self.m_name = name;
if (register)
{
if (fan.sys.Log.m_byName[name] != null)
throw fan.sys.ArgErr.make("Duplicate log name: " + name);
fan.sys.Log.m_byName[name] = self;
}
}
fan.sys.Log.m_byName = [];
fan.sys.Log.prototype.$typeof = function() { return fan.sys.Log.$type; }
fan.sys.Log.prototype.toStr = function() { return this.m_name; }
fan.sys.Log.prototype.$name = function() { return this.m_name; }
fan.sys.Log.prototype.level = function()
{
return this.m_level;
}
fan.sys.Log.prototype.level$ = function(level)
{
if (level == null) throw fan.sys.ArgErr.make("level cannot be null");
this.m_level = level;
}
fan.sys.Log.prototype.enabled = function(level)
{
return this.m_level.m_ordinal <= level.m_ordinal;
}
fan.sys.Log.prototype.isEnabled = function(level)
{
return this.enabled(level);
}
fan.sys.Log.prototype.isErr = function()   { return this.isEnabled(fan.sys.LogLevel.m_err); }
fan.sys.Log.prototype.isWarn = function()  { return this.isEnabled(fan.sys.LogLevel.m_warn); }
fan.sys.Log.prototype.isInfo = function()  { return this.isEnabled(fan.sys.LogLevel.m_info); }
fan.sys.Log.prototype.isDebug = function() { return this.isEnabled(fan.sys.LogLevel.m_debug); }
fan.sys.Log.prototype.err = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_err, this.m_name, msg, err));
}
fan.sys.Log.prototype.warn = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_warn, this.m_name, msg, err));
}
fan.sys.Log.prototype.info = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_info, this.m_name, msg, err));
}
fan.sys.Log.prototype.debug = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_debug, this.m_name, msg, err));
}
fan.sys.Log.prototype.log = function(rec)
{
if (!this.enabled(rec.m_level)) return;
for (var i=0; i<fan.sys.Log.m_handlers.length; ++i)
{
try { fan.sys.Log.m_handlers[i].call(rec); }
catch (e) { fan.sys.Err.make(e).trace(); }
}
}
fan.sys.Log.handlers = function()
{
return fan.sys.List.make(fan.sys.Func.$type, fan.sys.Log.m_handlers).ro();
}
fan.sys.Log.addHandler = function(func)
{
if (!func.isImmutable()) throw fan.sys.NotImmutableErr.make("handler must be immutable");
fan.sys.Log.m_handlers.push(func);
}
fan.sys.Log.removeHandler = function(func)
{
var index = null;
for (var i=0; i<fan.sys.Log.m_handlers.length; i++)
if (fan.sys.Log.m_handlers[i] == func) { index=i; break }
if (index == null) return;
fan.sys.Log.m_handlers.splice(index, 1);
}
fan.sys.Log.m_handlers = [];
fan.sys.Weekday = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.Weekday.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
this.m_localeAbbrKey = name + "Abbr";
this.m_localeFullKey = name + "Full";
}
fan.sys.Weekday.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.Weekday.$type, name, checked);
}
fan.sys.Weekday.prototype.increment = function()
{
var arr = fan.sys.Weekday.m_vals;
return arr.get((this.m_ordinal+1) % arr.size());
}
fan.sys.Weekday.prototype.decrement = function()
{
var arr = fan.sys.Weekday.m_vals;
return this.m_ordinal == 0 ? arr.get(arr.size()-1) : arr.get(this.m_ordinal-1);
}
fan.sys.Weekday.prototype.$typeof = function()
{
return fan.sys.Weekday.$type;
}
fan.sys.Weekday.prototype.toLocale = function(pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
if (pattern == null) return this.abbr(locale);
if (fan.sys.Str.isEveryChar(pattern, 87))
{
switch (pattern.length)
{
case 3: return this.abbr(locale);
case 4: return this.full(locale);
}
}
throw fan.sys.ArgErr.make("Invalid pattern: " + pattern);
}
fan.sys.Weekday.prototype.localeAbbr = function() { return this.abbr(fan.sys.Locale.cur()); }
fan.sys.Weekday.prototype.abbr = function(locale)
{
var pod = fan.sys.Pod.find("sys");
return fan.sys.Env.cur().locale(pod, this.m_localeAbbrKey, this.$name(), locale);
}
fan.sys.Weekday.prototype.localeFull = function() { return this.full(fan.sys.Locale.cur()); }
fan.sys.Weekday.prototype.full = function(locale)
{
var pod = fan.sys.Pod.find("sys");
return fan.sys.Env.cur().locale(pod, this.m_localeFullKey, this.$name(), locale);
}
fan.sys.Weekday.localeStartOfWeek = function(locale)
{
if (locale === undefined) locale = fan.sys.Locale.cur();
var pod = fan.sys.Pod.find("sys");
return fan.sys.Weekday.fromStr(fan.sys.Env.cur().locale(pod, "weekdayStart", "sun", locale));
}
fan.sys.Weekday.localeVals = function()
{
var start = fan.sys.Weekday.localeStartOfWeek();
var list = fan.sys.Weekday.m_localeVals[start.m_ordinal];
if (list == null)
{
list = fan.sys.List.make(fan.sys.Weekday.$type);
for (var i=0; i<7; ++i)
list.add(fan.sys.Weekday.m_vals.get((i + start.m_ordinal) % 7));
fan.sys.Weekday.m_localeVals[start.m_ordinal] = list.toImmutable();
}
return list;
}
fan.sys.Weekday.m_localeVals = [];
fan.sys.Buf = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Buf.prototype.$ctor = function() {}
fan.sys.Buf.make = function(capacity)
{
var c = capacity || 1024;
return fan.sys.MemBuf.makeCapacity(c);
}
fan.sys.Buf.random = function(size)
{
var buf = [];
for (var i=0; i<size;)
{
var x = Math.random() * 4294967296;
buf[i++] = (0xff & (x >> 24));
if (i < size)
{
buf[i++] = (0xff & (x >> 16));
if (i < size)
{
buf[i++] = (0xff & (x >> 8));
if (i < size) buf[i++] = (0xff & x);
}
}
}
return fan.sys.MemBuf.makeBytes(buf);
}
fan.sys.Buf.prototype.equals = function(that)
{
return this == that;
}
fan.sys.Buf.prototype.bytesEqual = function(that)
{
if (this == that) return true;
if (this.size() != that.size()) return false;
for (var i=0; i<this.size(); ++i)
if (this.getByte(i) != that.getByte(i))
return false;
return true;
}
fan.sys.Buf.prototype.toStr = function()
{
return this.$typeof().$name() + "(pos=" + this.pos() + " size=" + this.size() + ")";
}
fan.sys.Buf.prototype.$typeof = function()
{
return fan.sys.Buf.$type;
}
fan.sys.Buf.prototype.isEmpty = function() { return this.size() == 0; }
fan.sys.Buf.prototype.capacity = function() { return fan.sys.Int.m_maxVal; }
fan.sys.Buf.prototype.capacity$ = function(c) {}
fan.sys.Buf.prototype.remaining = function() { return this.size()-this.pos(); }
fan.sys.Buf.prototype.more = function() { return this.size()-this.pos() > 0; }
fan.sys.Buf.prototype.seek = function(pos)
{
var size = this.size();
if (pos < 0) pos = size + pos;
if (pos < 0 || pos > size) throw fan.sys.IndexErr.make(pos);
this.pos$(pos);
return this;
}
fan.sys.Buf.prototype.flip = function()
{
this.size(this.pos());
this.pos$(0);
return this;
}
fan.sys.Buf.prototype.get = function(pos)
{
var size = this.size();
if (pos < 0) pos = size + pos;
if (pos < 0 || pos >= size) throw fan.sys.IndexErr.make(pos);
return this.getByte(pos);
}
fan.sys.Buf.prototype.getRange = function(range)
{
var size = this.size();
var s = range.$start(size);
var e = range.$end(size);
var n = (e - s + 1);
if (n < 0) throw fan.sys.IndexErr.make(range);
var slice = this.getBytes(s, n);
var result = new fan.sys.MemBuf(slice, n);
result.charset$(this.charset());
return result;
}
fan.sys.Buf.prototype.dup = function()
{
var size = this.size();
var copy = this.getBytes(0, size);
var result = new fan.sys.MemBuf(copy, size);
result.charset$(this.charset());
return result;
}
fan.sys.Buf.prototype.set = function(pos, b)
{
var size = this.size();
if (pos < 0) pos = size + pos;
if (pos < 0 || pos >= size) throw fan.sys.IndexErr.make(pos);
this.setByte(pos, b);
return this;
}
fan.sys.Buf.prototype.trim = function()
{
return this;
}
fan.sys.Buf.prototype.clear = function()
{
this.pos$(0);
this.size$(0);
return this;
}
fan.sys.Buf.prototype.flush = function()
{
return this;
}
fan.sys.Buf.prototype.close = function()
{
return true;
}
fan.sys.Buf.prototype.endian = function() { return this.m_out.endian(); }
fan.sys.Buf.prototype.endian$ = function(endian)
{
this.m_out.endian$(endian);
this.m_in.endian$(endian);
}
fan.sys.Buf.prototype.charset = function()
{
return this.m_out.charset();
}
fan.sys.Buf.prototype.charset$ = function(charset)
{
this.m_out.charset$(charset);
this.m_in.charset$(charset);
}
fan.sys.Buf.prototype.fill = function(b, times)
{
if (this.capacity() < this.size()+times) this.capacity(this.size()+times);
for (var i=0; i<times; ++i) this.m_out.write(b);
return this;
}
fan.sys.Buf.prototype.out = function() { return this.m_out; }
fan.sys.Buf.prototype.write = function(b) { this.m_out.write(b); return this; }
fan.sys.Buf.prototype.writeBuf = function(other, n) { this.m_out.writeBuf(other, n); return this; }
fan.sys.Buf.prototype.writeI2 = function(x) { this.m_out.writeI2(x); return this; }
fan.sys.Buf.prototype.writeI4 = function(x) { this.m_out.writeI4(x); return this; }
fan.sys.Buf.prototype.writeI8 = function(x) { this.m_out.writeI8(x); return this; }
fan.sys.Buf.prototype.writeF4 = function(x) { this.m_out.writeF4(x); return this; }
fan.sys.Buf.prototype.writeF8 = function(x) { this.m_out.writeF8(x); return this; }
fan.sys.Buf.prototype.writeDecimal = function(x) { this.m_out.writeDecimal(x); return this; }
fan.sys.Buf.prototype.writeBool = function(x) { this.m_out.writeBool(x); return this; }
fan.sys.Buf.prototype.writeUtf = function(x) { this.m_out.writeUtf(x); return this; }
fan.sys.Buf.prototype.writeChar = function(c) { this.m_out.writeChar(c); return this; }
fan.sys.Buf.prototype.writeChars = function(s, off, len) { this.m_out.writeChars(s, off, len); return this; }
fan.sys.Buf.prototype.print = function(obj) { this.m_out.print(obj); return this; }
fan.sys.Buf.prototype.printLine = function(obj) { this.m_out.printLine(obj); return this; }
fan.sys.Buf.prototype.writeObj = function(obj, opt) { this.m_out.writeObj(obj, opt); return this; }
fan.sys.Buf.prototype.writeXml = function(s, flags) { this.m_out.writeXml(s, flags); return this; }
fan.sys.Buf.prototype.$in = function() { return this.m_in; }
fan.sys.Buf.prototype.read = function() {  return this.m_in.read(); }
fan.sys.Buf.prototype.readBuf = function(other, n) { return this.m_in.readBuf(other, n); }
fan.sys.Buf.prototype.unread = function(n) { this.m_in.unread(n); return this; }
fan.sys.Buf.prototype.readBufFully = function(buf, n) { return this.m_in.readBufFully(buf, n); }
fan.sys.Buf.prototype.readAllBuf = function() { return this.m_in.readAllBuf(); }
fan.sys.Buf.prototype.peek = function() { return this.m_in.peek(); }
fan.sys.Buf.prototype.readU1 = function() { return this.m_in.readU1(); }
fan.sys.Buf.prototype.readS1 = function() { return this.m_in.readS1(); }
fan.sys.Buf.prototype.readU2 = function() { return this.m_in.readU2(); }
fan.sys.Buf.prototype.readS2 = function() { return this.m_in.readS2(); }
fan.sys.Buf.prototype.readU4 = function() { return this.m_in.readU4(); }
fan.sys.Buf.prototype.readS4 = function() { return this.m_in.readS4(); }
fan.sys.Buf.prototype.readS8 = function() { return this.m_in.readS8(); }
fan.sys.Buf.prototype.readF4 = function() { return this.m_in.readF4(); }
fan.sys.Buf.prototype.readF8 = function() { return this.m_in.readF8(); }
fan.sys.Buf.prototype.readDecimal = function() { return this.m_in.readDecimal(); }
fan.sys.Buf.prototype.readBool = function() { return this.m_in.readBool(); }
fan.sys.Buf.prototype.readUtf = function() { return this.m_in.readUtf(); }
fan.sys.Buf.prototype.readChar = function() { return this.m_in.readChar(); }
fan.sys.Buf.prototype.unreadChar = function(c) { this.m_in.unreadChar(c); return this; }
fan.sys.Buf.prototype.peekChar = function() { return this.m_in.peekChar(); }
fan.sys.Buf.prototype.readChars = function(n) { return this.m_in.readChars(n); }
fan.sys.Buf.prototype.readLine = function(max) { return this.m_in.readLine(max); }
fan.sys.Buf.prototype.readStrToken = function(max, f) { return this.m_in.readStrToken(max, f); }
fan.sys.Buf.prototype.readAllLines = function() { return this.m_in.readAllLines(); }
fan.sys.Buf.prototype.eachLine = function(f) { this.m_in.eachLine(f); }
fan.sys.Buf.prototype.readAllStr = function(normNewlines) { return this.m_in.readAllStr(normNewlines); }
fan.sys.Buf.prototype.readObj = function(opt) { return this.m_in.readObj(opt); }
fan.sys.Buf.prototype.readProps = function() { return this.m_in.readProps(); }
fan.sys.Buf.prototype.writeProps = function(props, close) { return this.m_out.writeProps(props, close); }
fan.sys.Buf.prototype.toHex = function()
{
var buf = this.unsafeArray();
var size = this.size();
var hexChars = fan.sys.Buf.hexChars;
var s = "";
for (var i=0; i<size; ++i)
{
var b = buf[i] & 0xFF;
s += String.fromCharCode(hexChars[b>>4]) + String.fromCharCode(hexChars[b&0xf]);
}
return s;
}
fan.sys.Buf.fromHex = function(s)
{
var slen = s.length;
var buf = [];
var hexInv = fan.sys.Buf.hexInv;
var size = 0;
for (var i=0; i<slen; ++i)
{
var c0 = s.charCodeAt(i);
var n0 = c0 < 128 ? hexInv[c0] : -1;
if (n0 < 0) continue;
var n1 = -1;
if (++i < slen)
{
var c1 = s.charCodeAt(i);
n1 = c1 < 128 ? hexInv[c1] : -1;
}
if (n1 < 0) throw fan.sys.IOErr.make("Invalid hex str");
buf[size++] = (n0 << 4) | n1;
}
return fan.sys.MemBuf.makeBytes(buf);
}
fan.sys.Buf.hexChars = [
48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102];
fan.sys.Buf.hexInv = [];
for (var i=0; i<128; ++i) fan.sys.Buf.hexInv[i] = -1;
for (var i=0; i<10; ++i)  fan.sys.Buf.hexInv[48+i] = i;
for (var i=10; i<16; ++i) fan.sys.Buf.hexInv[97+i-10] = fan.sys.Buf.hexInv[65+i-10] = i;
fan.sys.Buf.prototype.toBase64 = function()
{
return this.$doBase64(fan.sys.Buf.base64chars, true);
}
fan.sys.Buf.prototype.toBase64Uri = function()
{
return this.$doBase64(fan.sys.Buf.base64UriChars, false);
}
fan.sys.Buf.prototype.$doBase64 = function(table, pad)
{
var buf = this.m_buf;
var size = this.m_size;
var s = '';
var i = 0;
var end = size-2;
for (; i<end; i += 3)
{
var n = ((buf[i] & 0xff) << 16) + ((buf[i+1] & 0xff) << 8) + (buf[i+2] & 0xff);
s += String.fromCharCode(table[(n >>> 18) & 0x3f]);
s += String.fromCharCode(table[(n >>> 12) & 0x3f]);
s += String.fromCharCode(table[(n >>> 6) & 0x3f]);
s += String.fromCharCode(table[n & 0x3f]);
}
var rem = size - i;
if (rem > 0)
{
var n = ((buf[i] & 0xff) << 10) | (rem == 2 ? ((buf[size-1] & 0xff) << 2) : 0);
s += String.fromCharCode(table[(n >>> 12) & 0x3f]);
s += String.fromCharCode(table[(n >>> 6) & 0x3f]);
s += rem == 2 ? String.fromCharCode(table[n & 0x3f]) : (pad ? '=' : "");
if (pad) s += '=';
}
return s;
}
fan.sys.Buf.fromBase64 = function(s)
{
var slen = s.length;
var si = 0;
var max = slen * 6 / 8;
var buf = [];
var size = 0;
while (si < slen)
{
var n = 0;
var v = 0;
for (var j=0; j<4 && si<slen;)
{
var ch = s.charCodeAt(si++);
var c = ch < 128 ? fan.sys.Buf.base64inv[ch] : -1;
if (c >= 0)
{
n |= c << (18 - j++ * 6);
if (ch != 61 ) v++;
}
}
if (v > 1) buf.push(n >> 16);
if (v > 2) buf.push(n >> 8);
if (v > 3) buf.push(n);
}
return fan.sys.MemBuf.makeBytes(buf);
}
fan.sys.Buf.base64chars = [
65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,
48,49,50,51,52,53,54,55,56,57,43,47];
fan.sys.Buf.base64UriChars = [
65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,
48,49,50,51,52,53,54,55,56,57,45,95];
fan.sys.Buf.base64inv = [];
for (var i=0; i<128; ++i) fan.sys.Buf.base64inv[i] = -1;
for (var i=0; i<fan.sys.Buf.base64chars.length; ++i)
fan.sys.Buf.base64inv[fan.sys.Buf.base64chars[i]] = i;
fan.sys.Buf.base64inv[45] = 62;
fan.sys.Buf.base64inv[95] = 63;
fan.sys.Buf.base64inv[61] = 0;
fan.sys.Buf.prototype.toDigest = function(algorithm)
{
var buf = this.m_buf.slice(0, this.m_size);
var digest = null;
switch (algorithm)
{
case "MD5":
digest = fan.sys.Buf_Md5(buf);  break;
case "SHA1":
case "SHA-1":
digest = fan.sys.buf_sha1.digest(buf); break;
case "SHA-256":
digest = fan.sys.buf_sha256.digest(buf); break;
default: throw fan.sys.ArgErr.make("Unknown digest algorithm " + algorithm);
}
return fan.sys.MemBuf.makeBytes(digest);
}
fan.sys.Buf.prototype.hmac = function(algorithm, keyBuf)
{
var buf = this.m_buf.slice(0, this.m_size);
var key = keyBuf.m_buf.slice(0, keyBuf.m_size);
var digest = null;
switch (algorithm)
{
case "MD5":
digest = fan.sys.Buf_Md5(buf, key);  break;
case "SHA1":
case "SHA-1":
digest = fan.sys.buf_sha1.digest(buf, key); break;
case "SHA-256":
digest = fan.sys.buf_sha256.digest(buf, key); break;
default: throw fan.sys.ArgErr.make("Unknown digest algorithm " + algorithm);
}
return fan.sys.MemBuf.makeBytes(digest);
}
fan.sys.Buf.prototype.crc = function(algorithm)
{
if (algorithm == "CRC-16") return this.crc16();
if (algorithm == "CRC-32") return this.crc32();
if (algorithm == "CRC-32-Adler") return this.crcAdler32();
throw fan.sys.ArgErr.make("Unknown CRC algorthm: " + algorithm);
}
fan.sys.Buf.prototype.crc16 = function()
{
var array = this.unsafeArray();
var size = this.size();
var seed = 0xffff;
for (var i=0; i<size; ++i) seed = this.$crc16(array[i], seed);
return seed;
}
fan.sys.Buf.prototype.$crc16 = function(dataToCrc, seed)
{
var dat = ((dataToCrc ^ (seed & 0xFF)) & 0xFF);
seed = (seed & 0xFFFF) >>> 8;
var index1 = (dat & 0x0F);
var index2 = (dat >>> 4);
if ((fan.sys.Buf.CRC16_ODD_PARITY[index1] ^ fan.sys.Buf.CRC16_ODD_PARITY[index2]) == 1)
seed ^= 0xC001;
dat  <<= 6;
seed ^= dat;
dat  <<= 1;
seed ^= dat;
return seed;
}
fan.sys.Buf.prototype.crc32 = function()
{
var array = this.unsafeArray();
var crc = -1;
for (var i=0, iTop=array.length; i<iTop; i++)
{
crc = ( crc >>> 8 ) ^ fan.sys.Buf.CRC32_b_table[(crc ^ array[i]) & 0xFF];
}
return (crc ^ (-1)) >>> 0;
};
fan.sys.Buf.prototype.crcAdler32 = function(seed)
{
var array = this.unsafeArray();
var a = 1, b = 0, L = array.length, M = 0;
if (typeof seed === 'number') { a = seed & 0xFFFF; b = (seed >>> 16) & 0xFFFF; }
for(var i=0; i<L;)
{
M = Math.min(L-i, 3850) + i;
for(; i<M; i++)
{
a += array[i] & 0xFF;
b += a;
}
a = (15 * (a >>> 16) + (a & 65535));
b = (15 * (b >>> 16) + (b & 65535));
}
return ((b % 65521) << 16) | (a % 65521);
}
fan.sys.Buf.CRC16_ODD_PARITY = [ 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0 ];
fan.sys.Buf.CRC32_a_table =
"00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 " +
"0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 " +
"1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 " +
"136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 " +
"3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B " +
"35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 " +
"26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F " +
"2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D " +
"76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 " +
"7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 " +
"6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 " +
"65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 " +
"4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB " +
"4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 " +
"5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F " +
"5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD " +
"EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 " +
"E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 " +
"F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 " +
"FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 " +
"D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B " +
"D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 " +
"CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F " +
"C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D " +
"9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 " +
"95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 " +
"86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 " +
"88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 " +
"A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB " +
"AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 " +
"BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF " +
"B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D ";
fan.sys.Buf.CRC32_b_table = fan.sys.Buf.CRC32_a_table.split(' ').map(function(s){ return parseInt(s,16) });
fan.sys.Buf.pbk = function(algorithm, password, salt, iterations, keyLen)
{
var digest = null;
var passBuf = fan.sys.Str.toBuf(password);
passBytes = passBuf.m_buf.slice(0, passBuf.m_size);
saltBytes = salt.m_buf.slice(0, salt.m_size);
switch(algorithm)
{
case "PBKDF2WithHmacSHA1":
digest = fan.sys.buf_sha1.pbkdf2(passBytes, saltBytes, iterations, keyLen); break;
case "PBKDF2WithHmacSHA256":
digest = fan.sys.buf_sha256.pbkdf2(passBytes, saltBytes, iterations, keyLen); break;
default: throw fan.sys.Err.make("Unsupported algorithm: " + algorithm);
}
return fan.sys.MemBuf.makeBytes(digest);
}
fan.sys.MemBuf = fan.sys.Obj.$extend(fan.sys.Buf);
fan.sys.MemBuf.prototype.$ctor = function(buf, size)
{
this.m_buf  = (buf  !== undefined) ? buf  : [];
this.m_size = (size !== undefined) ? size : 0;
this.m_pos  = 0;
this.m_out  = new fan.sys.MemBufOutStream(this);
this.m_in   = new fan.sys.MemBufInStream(this);
}
fan.sys.MemBuf.makeCapacity = function(capacity)
{
var buf = new fan.sys.MemBuf();
buf.capacity$(capacity);
return buf;
}
fan.sys.MemBuf.makeBytes = function(bytes)
{
var buf = new fan.sys.MemBuf();
buf.m_buf = bytes;
buf.m_size = bytes.length;
return buf;
}
fan.sys.MemBuf.prototype.$typeof = function() { return fan.sys.MemBuf.$type; }
fan.sys.MemBuf.prototype.toImmutable = function()
{
var buf  = this.m_buf;
var size = this.m_size;
this.m_buf = fan.sys.MemBuf.$emptyBytes
this.m_size = 0;
return new fan.sys.ConstBuf(buf, size, this.endian(), this.charset());
}
fan.sys.MemBuf.prototype.size = function() { return this.m_size; }
fan.sys.MemBuf.prototype.size$ = function(x)
{
if (x > this.m_buf.length)
{
this.m_buf.length = x;
}
this.m_size = x;
}
fan.sys.MemBuf.prototype.pos = function() { return this.m_pos; }
fan.sys.MemBuf.prototype.pos$ = function(x) { this.m_pos = x; }
fan.sys.MemBuf.prototype.getByte = function(pos)
{
return this.m_buf[pos] & 0xFF;
}
fan.sys.MemBuf.prototype.setByte = function(pos, x)
{
this.m_buf[pos] = x & 0xFF;
}
fan.sys.MemBuf.prototype.getBytes = function(pos, len)
{
return this.m_buf.slice(pos, pos+len);
}
fan.sys.MemBuf.prototype.pipeTo = function(dst, len)
{
if (this.m_pos+len > this.m_size) throw fan.sys.IOErr.make("Not enough bytes to write");
var byteArray = this.cpMemToJavaBuffer(len)
dst.write(byteArray, 0, len);
this.m_pos += len;
}
fan.sys.MemBuf.prototype.pipeFrom = function(src, len)
{
this.grow(this.m_pos + len);
var byteArray = new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, len);
var read = src.read(byteArray, 0, len);
if (read < 0) return -1;
this.cpJavaBufferToMem(byteArray, read);
this.m_pos += read;
this.m_size = this.m_pos;
return read;
}
fan.sys.MemBuf.prototype.cpMemToJavaBuffer = function(len)
{
var bytes = new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, len);
for (var i=0; i<len; ++i)
{
var b = this.m_buf[this.m_pos+i];
if (b > 127) b |= 0xFFFFFF00;
bytes[i] = b;
}
return bytes;
}
fan.sys.MemBuf.prototype.cpJavaBufferToMem = function(bytes, len)
{
for (var i=0; i<len; ++i)
this.m_buf[this.m_pos+i] = bytes[i] & 0xFF;
}
fan.sys.MemBuf.prototype.capacity = function()
{
return this.m_buf.length;
}
fan.sys.MemBuf.prototype.capacity$ = function(c)
{
if (c < this.m_size) throw fan.sys.ArgErr.make("capacity < size");
this.m_buf.length = c;
}
fan.sys.MemBuf.prototype.trim = function()
{
if (this.m_size == this.m_buf.length) return this;
this.m_buf = this.m_buf.slice(0, size);
return this;
}
fan.sys.MemBuf.prototype.grow = function(capacity)
{
if (this.m_buf.length >= capacity) return;
this.capacity$(Math.max(capacity, this.m_size*2));
}
fan.sys.MemBuf.prototype.unsafeArray = function()
{
return this.m_buf;
}
fan.sys.MemBuf.$emptyBytes = [];
fan.sys.ConstBuf = fan.sys.Obj.$extend(fan.sys.Buf);
fan.sys.ConstBuf.prototype.$ctor = function(buf, size, endian, charset)
{
this.m_buf     = buf;
this.m_pos     = 0;
this.m_size    = size;
this.m_in      = fan.sys.ConstBuf.errInStream;
this.m_out     = fan.sys.ConstBuf.errOutStream;
this.m_endian  = endian;
this.m_charset = charset;
}
fan.sys.ConstBuf.prototype.$typeof = function() { return fan.sys.ConstBuf.$type; }
fan.sys.ConstBuf.prototype.isImmutable = function() { return true; }
fan.sys.ConstBuf.prototype.toImmutable= function() { return this; }
fan.sys.ConstBuf.prototype.$in = function()
{
return new fan.sys.ConstBufInStream(this);
}
fan.sys.ConstBuf.prototype.size = function() { return this.m_size; }
fan.sys.ConstBuf.prototype.size$ = function(x) { throw this.err(); }
fan.sys.ConstBuf.prototype.pos = function() { return 0; }
fan.sys.ConstBuf.prototype.pos$ = function(x) { throw this.err(); }
fan.sys.ConstBuf.prototype.getByte = function(pos)
{
return this.m_buf[pos] & 0xFF;
}
fan.sys.ConstBuf.prototype.setByte = function(pos, x) { throw this.err() }
fan.sys.ConstBuf.prototype.getBytes = function(pos, len)
{
return this.m_buf.slice(pos, pos+len);
}
fan.sys.ConstBuf.prototype.pipeFrom = function() { throw this.err(); }
fan.sys.ConstBuf.prototype.capacity = function() { throw this.err(); }
fan.sys.ConstBuf.prototype.capacity$ = function(c) { throw this.err(); }
fan.sys.ConstBuf.prototype.sync = function() { throw this.err(); }
fan.sys.ConstBuf.prototype.trim = function() { throw this.err(); }
fan.sys.ConstBuf.prototype.endian = function() { return this.m_endian; }
fan.sys.ConstBuf.prototype.endian$ = function(endian) { throw this.err(); }
fan.sys.ConstBuf.prototype.charset = function() { return this.m_charset; }
fan.sys.ConstBuf.prototype.charset$ = function(charset) { throw this.err(); }
fan.sys.ConstBuf.prototype.unsafeArray = function()
{
return this.m_buf;
}
fan.sys.ConstBuf.prototype.err = function()
{
return fan.sys.ReadonlyErr.make("Buf is immutable");
}
fan.sys.Charset = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Charset.prototype.$ctor = function(name, encoder)
{
this.m_name = name;
this.m_encoder = encoder;
}
fan.sys.Charset.prototype.$typeof = function() { return fan.sys.Charset.$type; }
fan.sys.Charset.utf16BE = function()
{
return new fan.sys.Charset("UTF-16BE", new fan.sys.Charset.Encoder(
fan.sys.Charset.Utf16BEEncoder.encodeOut,
fan.sys.Charset.Utf16BEEncoder.encodeIn,
fan.sys.Charset.Utf16BEEncoder.decode));
}
fan.sys.Charset.utf16LE = function()
{
return new fan.sys.Charset("UTF-16LE", new fan.sys.Charset.Encoder(
fan.sys.Charset.Utf16LEEncoder.encodeOut,
fan.sys.Charset.Utf16LEEncoder.encodeIn,
fan.sys.Charset.Utf16LEEncoder.decode));
}
fan.sys.Charset.utf8 = function()
{
return new fan.sys.Charset("UTF-8", new fan.sys.Charset.Encoder(
fan.sys.Charset.Utf8Encoder.encodeOut,
fan.sys.Charset.Utf8Encoder.encodeIn,
fan.sys.Charset.Utf8Encoder.decode));
}
fan.sys.Charset.iso8851_1 = function()
{
return new fan.sys.Charset("ISO-8859-1", new fan.sys.Charset.Encoder(
fan.sys.Charset.Iso8859_1Encoder.encodeOut,
fan.sys.Charset.Iso8859_1Encoder.encodeIn,
fan.sys.Charset.Iso8859_1Encoder.decode));
}
fan.sys.Charset.iso8851_2 = function()
{
return new fan.sys.Charset("ISO-8859-2", new fan.sys.Charset.Iso8859Encoder(
fan.sys.Charset.Iso8859Encoder.iso2_u2i,
fan.sys.Charset.Iso8859Encoder.iso2_i2u
));
}
fan.sys.Charset.iso8851_5 = function()
{
return new fan.sys.Charset("ISO-8859-5", new fan.sys.Charset.Iso8859Encoder(
fan.sys.Charset.Iso8859Encoder.iso5_u2i,
fan.sys.Charset.Iso8859Encoder.iso5_i2u
));
}
fan.sys.Charset.iso8851_8 = function()
{
return new fan.sys.Charset("ISO-8859-8", new fan.sys.Charset.Iso8859Encoder(
fan.sys.Charset.Iso8859Encoder.iso8_u2i,
fan.sys.Charset.Iso8859Encoder.iso8_i2u
));
}
fan.sys.Charset.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
var nname = name.toUpperCase();
try
{
switch(nname)
{
case "UTF-8":      return fan.sys.Charset.utf8();
case "UTF-16BE":   return fan.sys.Charset.utf16BE();
case "UTF-16LE":   return fan.sys.Charset.utf16LE();
case "ISO-8859-1": return fan.sys.Charset.iso8851_1();
case "ISO-8859-2": return fan.sys.Charset.iso8851_2();
case "ISO-8859-5": return fan.sys.Charset.iso8851_5();
case "ISO-8859-8": return fan.sys.Charset.iso8851_8();
default: throw new Error();
}
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Unsupported charset '" + nname + "'");
}
}
fan.sys.Charset.defVal = function() { return fan.sys.Charset.utf8(); }
fan.sys.Charset.prototype.$name = function() { return this.m_name; }
fan.sys.Charset.prototype.hash = function() { return 0; }
fan.sys.Charset.prototype.equals = function(that)
{
if (that instanceof fan.sys.Charset)
{
return this.m_name == that.m_name;
}
return false;
}
fan.sys.Charset.prototype.toStr = function() { return this.$name(); }
fan.sys.Charset.Encoder = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Charset.Encoder.prototype.$ctor = function(encodeOut, encodeIn, decode)
{
this.m_encodeOut = encodeOut;
this.m_encodeIn = encodeIn;
this.m_decode = decode;
}
fan.sys.Charset.Encoder.prototype.encodeOut = function(c, outStream) { this.m_encodeOut(c, outStream); }
fan.sys.Charset.Encoder.prototype.encodeIn = function(c, inStream) { this.m_encodeIn(c, inStream); }
fan.sys.Charset.Encoder.prototype.decode = function(inStream) { return this.m_decode(inStream); }
fan.sys.Charset.Utf8Encoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Utf8Encoder.encodeOut = function(c, outStream)
{
if (c <= 0x007F)
{
outStream.write(c);
}
else if (c > 0x07FF)
{
outStream.write(0xE0 | ((c >>> 12) & 0x0F))
.write(0x80 | ((c >>>  6) & 0x3F))
.write(0x80 | ((c >>>  0) & 0x3F));
}
else
{
outStream.write(0xC0 | ((c >>>  6) & 0x1F))
.write(0x80 | ((c >>>  0) & 0x3F));
}
}
fan.sys.Charset.Utf8Encoder.encodeIn = function(c, inStream)
{
if (c <= 0x007F)
{
inStream.unread(c);
}
else if (c > 0x07FF)
{
inStream.unread(0x80 | ((c >>  0) & 0x3F))
.unread(0x80 | ((c >>  6) & 0x3F))
.unread(0xE0 | ((c >> 12) & 0x0F));
}
else
{
inStream.unread(0x80 | ((c >>  0) & 0x3F))
.unread(0xC0 | ((c >>  6) & 0x1F));
}
}
fan.sys.Charset.Utf8Encoder.decode = function(inStream)
{
var c = inStream.read();
if (c == null) return -1;
var c2, c3;
switch (c >>> 4)
{
case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
return c;
case 12: case 13:
c2 = inStream.read();
if ((c2 & 0xC0) != 0x80)
throw fan.sys.IOErr.make("Invalid UTF-8 encoding");
return ((c & 0x1F) << 6) | (c2 & 0x3F);
case 14:
c2 = inStream.read();
c3 = inStream.read();
if (((c2 & 0xC0) != 0x80) || ((c3 & 0xC0) != 0x80))
throw fan.sys.IOErr.make("Invalid UTF-8 encoding");
return (((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0));
default:
throw fan.sys.IOErr.make("Invalid UTF-8 encoding");
}
}
fan.sys.Charset.Utf16BEEncoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Utf16BEEncoder.encodeOut = function(c, outStream)
{
outStream.write((c >>> 8) & 0xFF).write((c >>> 0) & 0xFF);
}
fan.sys.Charset.Utf16BEEncoder.encodeIn = function(c, inStream)
{
inStream.unread((c >>> 0) & 0xFF).unread((c >>> 8) & 0xFF);
}
fan.sys.Charset.Utf16BEEncoder.decode = function(inStream)
{
var c1 = inStream.read();
var c2 = inStream.read();
if (c1 == null || c2 == null) return -1;
return ((c1 << 8) | c2);
}
fan.sys.Charset.Utf16LEEncoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Utf16LEEncoder.encodeOut = function(c, outStream)
{
outStream.write((c >>> 0) & 0xFF).write((c >>> 8) & 0xFF);
}
fan.sys.Charset.Utf16LEEncoder.encodeIn = function(c, inStream)
{
inStream.unread((c >>> 8) & 0xFF).unread((c >>> 0) & 0xFF);
}
fan.sys.Charset.Utf16LEEncoder.decode = function(inStream)
{
var c1 = inStream.read();
var c2 = inStream.read();
if (c1 == null || c2 == null) return -1;
return (c1 | (c2 << 8));
}
fan.sys.Charset.Iso8859_1Encoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Iso8859_1Encoder.encodeOut = function(c, outStream)
{
if (c > 0xFF) throw fan.sys.IOErr.make("Invalid ISO-8859-1 char");
outStream.write((c >>> 0) & 0xFF);
}
fan.sys.Charset.Iso8859_1Encoder.encodeIn = function(c, inStream)
{
inStream.unread((c >>> 0) & 0xFF);
}
fan.sys.Charset.Iso8859_1Encoder.decode = function(inStream)
{
var c = inStream.read();
if (c == null) return -1;
return (c & 0xFF);
}
fan.sys.Charset.Iso8859Encoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Iso8859Encoder.prototype.$ctor = function(u2i, i2u)
{
this.m_encodeOut = fan.sys.Charset.Iso8859Encoder.encodeOut;
this.m_encodeIn = fan.sys.Charset.Iso8859Encoder.encodeIn;
this.m_decode = fan.sys.Charset.Iso8859Encoder.decode;
this.m_u2i = u2i;
this.m_i2u = i2u;
}
fan.sys.Charset.Iso8859Encoder.prototype.encodeOut = function(c, outStream)
{
this.m_encodeOut(this.m_u2i(c), outStream);
}
fan.sys.Charset.Iso8859Encoder.prototype.encodeIn = function(c, inStream)
{
this.m_encodeIn(this.m_u2i(c), inStream);
}
fan.sys.Charset.Iso8859Encoder.prototype.decode = function(inStream)
{
var c = this.m_decode(inStream);
if (c == -1) return -1;
return this.m_i2u(c);
}
fan.sys.Charset.Iso8859Encoder.encodeOut = function(c, outStream)
{
if (c > 0xFF) throw fan.sys.IOErr.make("Invalid ISO-8859 char");
outStream.write(c);
}
fan.sys.Charset.Iso8859Encoder.encodeIn = function(c, inStream)
{
inStream.unread(c);
}
fan.sys.Charset.Iso8859Encoder.decode = function(inStream)
{
var c = inStream.read();
if (c == null) return -1;
return c & 0xFF;
}
fan.sys.Charset.Iso8859Encoder.iso2_i2u = function(c)
{
switch(c)
{
case 0xA1: return 0x0104; case 0xA2: return 0x02D8; case 0xA3: return 0x0141;
case 0xA5: return 0x013D; case 0xA6: return 0x015A; case 0xA9: return 0x0160;
case 0xAA: return 0x015E; case 0xAB: return 0x0164; case 0xAC: return 0x0179;
case 0xAE: return 0x017D; case 0xAF: return 0x017B; case 0xB1: return 0x0105;
case 0xB2: return 0x02DB; case 0xB3: return 0x0142; case 0xB5: return 0x013E;
case 0xB6: return 0x015B; case 0xB7: return 0x02C7; case 0xB9: return 0x0161;
case 0xBA: return 0x015F; case 0xBB: return 0x0165; case 0xBC: return 0x017A;
case 0xBD: return 0x02DD; case 0xBE: return 0x017E; case 0xBF: return 0x017C;
case 0xC0: return 0x0154; case 0xC3: return 0x0102; case 0xC5: return 0x0139;
case 0xC6: return 0x0106; case 0xC8: return 0x010C; case 0xCA: return 0x0118;
case 0xCC: return 0x011A; case 0xCF: return 0x010E; case 0xD0: return 0x0110;
case 0xD1: return 0x0143; case 0xD2: return 0x0147; case 0xD5: return 0x0150;
case 0xD8: return 0x0158; case 0xD9: return 0x016E; case 0xDB: return 0x0170;
case 0xDE: return 0x0162; case 0xDF: return 0x00DF; case 0xE0: return 0x0155;
case 0xE3: return 0x0103; case 0xE5: return 0x013A; case 0xE6: return 0x0107;
case 0xE8: return 0x010D; case 0xEA: return 0x0119; case 0xEC: return 0x011B;
case 0xEF: return 0x010F; case 0xF0: return 0x0111; case 0xF1: return 0x0144;
case 0xF2: return 0x0148; case 0xF5: return 0x0151; case 0xF8: return 0x0159;
case 0xF9: return 0x016F; case 0xFB: return 0x0171; case 0xFE: return 0x0163;
case 0xFF: return 0x02D9;
default: return c;
}
}
fan.sys.Charset.Iso8859Encoder.iso2_u2i = function(c)
{
switch(c)
{
case 0x0104: return 0xA1; case 0x02D8: return 0xA2; case 0x0141: return 0xA3;
case 0x013D: return 0xA5; case 0x015A: return 0xA6; case 0x0160: return 0xA9;
case 0x015E: return 0xAA; case 0x0164: return 0xAB; case 0x0179: return 0xAC;
case 0x017D: return 0xAE; case 0x017B: return 0xAF; case 0x0105: return 0xB1;
case 0x02DB: return 0xB2; case 0x0142: return 0xB3; case 0x013E: return 0xB5;
case 0x015B: return 0xB6; case 0x02C7: return 0xB7; case 0x0161: return 0xB9;
case 0x015F: return 0xBA; case 0x0165: return 0xBB; case 0x017A: return 0xBC;
case 0x02DD: return 0xBD; case 0x017E: return 0xBE; case 0x017C: return 0xBF;
case 0x0154: return 0xC0; case 0x0102: return 0xC3; case 0x0139: return 0xC5;
case 0x0106: return 0xC6; case 0x010C: return 0xC8; case 0x0118: return 0xCA;
case 0x011A: return 0xCC; case 0x010E: return 0xCF; case 0x0110: return 0xD0;
case 0x0143: return 0xD1; case 0x0147: return 0xD2; case 0x0150: return 0xD5;
case 0x0158: return 0xD8; case 0x016E: return 0xD9; case 0x0170: return 0xDB;
case 0x0162: return 0xDE; case 0x00DF: return 0xDF; case 0x0155: return 0xE0;
case 0x0103: return 0xE3; case 0x013A: return 0xE5; case 0x0107: return 0xE6;
case 0x010D: return 0xE8; case 0x0119: return 0xEA; case 0x011B: return 0xEC;
case 0x010F: return 0xEF; case 0x0111: return 0xF0; case 0x0144: return 0xF1;
case 0x0148: return 0xF2; case 0x0151: return 0xF5; case 0x0159: return 0xF8;
case 0x016F: return 0xF9; case 0x0171: return 0xFB; case 0x0163: return 0xFE;
case 0x02D9: return 0xFF;
default: return (c >>> 0) & 0xFF;
}
}
fan.sys.Charset.Iso8859Encoder.iso5_i2u = function(c)
{
switch(c)
{
case 0xA1: return 0x0401; case 0xA2: return 0x0402; case 0xA3: return 0x0403;
case 0xA4: return 0x0404; case 0xA5: return 0x0405; case 0xA6: return 0x0406;
case 0xA7: return 0x0407; case 0xA8: return 0x0408; case 0xA9: return 0x0409;
case 0xAA: return 0x040A; case 0xAB: return 0x040B; case 0xAC: return 0x040C;
case 0xAE: return 0x040E; case 0xAF: return 0x040F; case 0xB0: return 0x0410;
case 0xB1: return 0x0411; case 0xB2: return 0x0412; case 0xB3: return 0x0413;
case 0xB4: return 0x0414; case 0xB5: return 0x0415; case 0xB6: return 0x0416;
case 0xB7: return 0x0417; case 0xB8: return 0x0418; case 0xB9: return 0x0419;
case 0xBA: return 0x041A; case 0xBB: return 0x041B; case 0xBC: return 0x041C;
case 0xBD: return 0x041D; case 0xBE: return 0x041E; case 0xBF: return 0x041F;
case 0xC0: return 0x0420; case 0xC1: return 0x0421; case 0xC2: return 0x0422;
case 0xC3: return 0x0423; case 0xC4: return 0x0424; case 0xC5: return 0x0425;
case 0xC6: return 0x0426; case 0xC7: return 0x0427; case 0xC8: return 0x0428;
case 0xC9: return 0x0429; case 0xCA: return 0x042A; case 0xCB: return 0x042B;
case 0xCC: return 0x042C; case 0xCD: return 0x042D; case 0xCE: return 0x042E;
case 0xCF: return 0x042F; case 0xD0: return 0x0430; case 0xD1: return 0x0431;
case 0xD2: return 0x0432; case 0xD3: return 0x0433; case 0xD4: return 0x0434;
case 0xD5: return 0x0435; case 0xD6: return 0x0436; case 0xD7: return 0x0437;
case 0xD8: return 0x0438; case 0xD9: return 0x0439; case 0xDA: return 0x043A;
case 0xDB: return 0x043B; case 0xDC: return 0x043C; case 0xDD: return 0x043D;
case 0xDE: return 0x043E; case 0xDF: return 0x043F; case 0xE0: return 0x0440;
case 0xE1: return 0x0441; case 0xE2: return 0x0442; case 0xE3: return 0x0443;
case 0xE4: return 0x0444; case 0xE5: return 0x0445; case 0xE6: return 0x0446;
case 0xE7: return 0x0447; case 0xE8: return 0x0448; case 0xE9: return 0x0449;
case 0xEA: return 0x044A; case 0xEB: return 0x044B; case 0xEC: return 0x044C;
case 0xED: return 0x044D; case 0xEE: return 0x044E; case 0xEF: return 0x044F;
case 0xF0: return 0x2116; case 0xF1: return 0x0451; case 0xF2: return 0x0452;
case 0xF3: return 0x0453; case 0xF4: return 0x0454; case 0xF5: return 0x0455;
case 0xF6: return 0x0456; case 0xF7: return 0x0457; case 0xF8: return 0x0458;
case 0xF9: return 0x0459; case 0xFA: return 0x045A; case 0xFB: return 0x045B;
case 0xFC: return 0x045C; case 0xFD: return 0x00A7; case 0xFE: return 0x045E;
case 0xFF: return 0x045F;
default: return c;
}
}
fan.sys.Charset.Iso8859Encoder.iso5_u2i = function(c)
{
switch(c)
{
case 0x0401: return 0xA1; case 0x0402: return 0xA2; case 0x0403: return 0xA3;
case 0x0404: return 0xA4; case 0x0405: return 0xA5; case 0x0406: return 0xA6;
case 0x0407: return 0xA7; case 0x0408: return 0xA8; case 0x0409: return 0xA9;
case 0x040A: return 0xAA; case 0x040B: return 0xAB; case 0x040C: return 0xAC;
case 0x040E: return 0xAE; case 0x040F: return 0xAF; case 0x0410: return 0xB0;
case 0x0411: return 0xB1; case 0x0412: return 0xB2; case 0x0413: return 0xB3;
case 0x0414: return 0xB4; case 0x0415: return 0xB5; case 0x0416: return 0xB6;
case 0x0417: return 0xB7; case 0x0418: return 0xB8; case 0x0419: return 0xB9;
case 0x041A: return 0xBA; case 0x041B: return 0xBB; case 0x041C: return 0xBC;
case 0x041D: return 0xBD; case 0x041E: return 0xBE; case 0x041F: return 0xBF;
case 0x0420: return 0xC0; case 0x0421: return 0xC1; case 0x0422: return 0xC2;
case 0x0423: return 0xC3; case 0x0424: return 0xC4; case 0x0425: return 0xC5;
case 0x0426: return 0xC6; case 0x0427: return 0xC7; case 0x0428: return 0xC8;
case 0x0429: return 0xC9; case 0x042A: return 0xCA; case 0x042B: return 0xCB;
case 0x042C: return 0xCC; case 0x042D: return 0xCD; case 0x042E: return 0xCE;
case 0x042F: return 0xCF; case 0x0430: return 0xD0; case 0x0431: return 0xD1;
case 0x0432: return 0xD2; case 0x0433: return 0xD3; case 0x0434: return 0xD4;
case 0x0435: return 0xD5; case 0x0436: return 0xD6; case 0x0437: return 0xD7;
case 0x0438: return 0xD8; case 0x0439: return 0xD9; case 0x043A: return 0xDA;
case 0x043B: return 0xDB; case 0x043C: return 0xDC; case 0x043D: return 0xDD;
case 0x043E: return 0xDE; case 0x043F: return 0xDF; case 0x0440: return 0xE0;
case 0x0441: return 0xE1; case 0x0442: return 0xE2; case 0x0443: return 0xE3;
case 0x0444: return 0xE4; case 0x0445: return 0xE5; case 0x0446: return 0xE6;
case 0x0447: return 0xE7; case 0x0448: return 0xE8; case 0x0449: return 0xE9;
case 0x044A: return 0xEA; case 0x044B: return 0xEB; case 0x044C: return 0xEC;
case 0x044D: return 0xED; case 0x044E: return 0xEE; case 0x044F: return 0xEF;
case 0x2116: return 0xF0; case 0x0451: return 0xF1; case 0x0452: return 0xF2;
case 0x0453: return 0xF3; case 0x0454: return 0xF4; case 0x0455: return 0xF5;
case 0x0456: return 0xF6; case 0x0457: return 0xF7; case 0x0458: return 0xF8;
case 0x0459: return 0xF9; case 0x045A: return 0xFA; case 0x045B: return 0xFB;
case 0x045C: return 0xFC; case 0x00A7: return 0xFD; case 0x045E: return 0xFE;
case 0x045F: return 0xFF;
default: return (c >>> 0) & 0xFF;
}
}
fan.sys.Charset.Iso8859Encoder.iso8_i2u = function(c)
{
switch(c)
{
case 0xAA: return 0x00D7; case 0xBA: return 0x00F7; case 0xDF: return 0x2017;
case 0xE0: return 0x05D0; case 0xE1: return 0x05D1; case 0xE2: return 0x05D2;
case 0xE3: return 0x05D3; case 0xE4: return 0x05D4; case 0xE5: return 0x05D5;
case 0xE6: return 0x05D6; case 0xE7: return 0x05D7; case 0xE8: return 0x05D8;
case 0xE9: return 0x05D9; case 0xEA: return 0x05DA; case 0xEB: return 0x05DB;
case 0xEC: return 0x05DC; case 0xED: return 0x05DD; case 0xEE: return 0x05DE;
case 0xEF: return 0x05DF; case 0xF0: return 0x05E0; case 0xF1: return 0x05E1;
case 0xF2: return 0x05E2; case 0xF3: return 0x05E3; case 0xF4: return 0x05E4;
case 0xF5: return 0x05E5; case 0xF6: return 0x05E6; case 0xF7: return 0x05E7;
case 0xF8: return 0x05E8; case 0xF9: return 0x05E9; case 0xFA: return 0x05EA;
case 0xFD: return 0x200E; case 0xFE: return 0x200F;
default: return c;
}
}
fan.sys.Charset.Iso8859Encoder.iso8_u2i = function(c)
{
switch(c)
{
case 0x00D7: return 0xAA; case 0x00F7: return 0xBA; case 0x2017: return 0xDF;
case 0x05D0: return 0xE0; case 0x05D1: return 0xE1; case 0x05D2: return 0xE2;
case 0x05D3: return 0xE3; case 0x05D4: return 0xE4; case 0x05D5: return 0xE5;
case 0x05D6: return 0xE6; case 0x05D7: return 0xE7; case 0x05D8: return 0xE8;
case 0x05D9: return 0xE9; case 0x05DA: return 0xEA; case 0x05DB: return 0xEB;
case 0x05DC: return 0xEC; case 0x05DD: return 0xED; case 0x05DE: return 0xEE;
case 0x05DF: return 0xEF; case 0x05E0: return 0xF0; case 0x05E1: return 0xF1;
case 0x05E2: return 0xF2; case 0x05E3: return 0xF3; case 0x05E4: return 0xF4;
case 0x05E5: return 0xF5; case 0x05E6: return 0xF6; case 0x05E7: return 0xF7;
case 0x05E8: return 0xF8; case 0x05E9: return 0xF9; case 0x05EA: return 0xFA;
case 0x200E: return 0xFD; case 0x200F: return 0xFE;
default: return (c >>> 0) & 0xFF;
}
}
fan.sys.Depend = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Depend.prototype.$ctor = function(name, constraints)
{
this.m_$name = name;
this.m_constraints = constraints;
this.m_str = null;
}
fan.sys.Depend.fromStr = function(str, checked)
{
if (checked === undefined) checked = true;
try
{
var d = new fan.sys.DependParser(str).parse();
return d;
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Depend", str);
}
}
fan.sys.Depend.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.Depend)
return this.toStr() == obj.toStr();
else
return false;
}
fan.sys.Depend.prototype.hash = function()
{
return fan.sys.Str.hash(this.toStr());
}
fan.sys.Depend.prototype.$typeof = function()
{
return fan.sys.Depend.$type;
}
fan.sys.Depend.prototype.toStr = function()
{
if (this.m_str == null)
{
var s = "";
s += this.m_$name + " ";
for (var i=0; i<this.m_constraints.length; ++i)
{
if (i > 0) s += ",";
var c = this.m_constraints[i];
s += c.m_version;
if (c.m_isPlus) s += "+";
if (c.m_endVersion != null) s += "-" + c.m_endVersion;
}
this.m_str = s.toString();
}
return this.m_str;
}
fan.sys.Depend.prototype.$name = function()
{
return this.m_$name;
}
fan.sys.Depend.prototype.size = function()
{
return this.m_constraints.length;
}
fan.sys.Depend.prototype.version = function( index)
{
if (index === undefined) index = 0;
return this.m_constraints[index].m_version;
}
fan.sys.Depend.prototype.isSimple = function(index)
{
if (index === undefined) index = 0;
return !this.isPlus(index) && !this.isRange(index);
}
fan.sys.Depend.prototype.isPlus = function(index)
{
if (index === undefined) index = 0;
return this.m_constraints[index].m_isPlus;
}
fan.sys.Depend.prototype.isRange = function(index)
{
if (index === undefined) index = 0;
return this.m_constraints[index].m_endVersion != null;
}
fan.sys.Depend.prototype.endVersion = function(index)
{
if (index === undefined) index = 0;
return this.m_constraints[index].m_endVersion;
}
fan.sys.Depend.prototype.match = function(v)
{
for (var i=0; i<this.m_constraints.length; ++i)
{
var c = this.m_constraints[i];
if (c.m_isPlus)
{
if (c.m_version.compare(v) <= 0)
return true;
}
else if (c.m_endVersion != null)
{
if (c.m_version.compare(v) <= 0 &&
(c.m_endVersion.compare(v) >= 0 || fan.sys.Depend.doMatch(c.m_endVersion, v)))
return true;
}
else
{
if (fan.sys.Depend.doMatch(c.m_version, v))
return true;
}
}
return false;
}
fan.sys.Depend.doMatch = function(a, b)
{
if (a.segments().size() > b.segments().size()) return false;
for (var i=0; i<a.segments().size(); ++i)
if (a.segment(i) != b.segment(i))
return false;
return true;
}
fan.sys.DependConstraint = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.DependConstraint.prototype.$ctor = function()
{
this.m_version = null;
this.m_isPlus  = false;
this.m_endVersion = null;
}
fan.sys.DependParser = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.DependParser.prototype.$ctor = function(str)
{
this.m_cur = 0;
this.m_pos = 0;
this.m_str = str;
this.m_len = str.length;
this.m_$name;
this.m_constraints = [];
this.consume();
}
fan.sys.DependParser.prototype.parse = function()
{
this.m_$name = this.$name();
this.m_constraints.push(this.constraint());
while (this.m_cur == 44)
{
this.consume();
this.consumeSpaces();
this.m_constraints.push(this.constraint());
}
if (this.m_pos <= this.m_len) throw new Error();
return new fan.sys.Depend(this.m_$name, this.m_constraints);
}
fan.sys.DependParser.prototype.$name = function()
{
var s = ""
while (this.m_cur != 32)
{
if (this.m_cur < 0) throw new Error();
s += String.fromCharCode(this.m_cur);
this.consume();
}
this.consumeSpaces();
if (s.length == 0) throw new Error();
return s;
}
fan.sys.DependParser.prototype.constraint = function()
{
var c = new fan.sys.DependConstraint();
c.m_version = this.version();
this.consumeSpaces();
if (this.m_cur == 43)
{
c.m_isPlus = true;
this.consume();
this.consumeSpaces();
}
else if (this.m_cur == 45)
{
this.consume();
this.consumeSpaces();
c.m_endVersion = this.version();
this.consumeSpaces();
}
return c;
}
fan.sys.DependParser.prototype.version = function()
{
var segs = fan.sys.List.make(fan.sys.Int.$type);
var seg = this.consumeDigit();
while (true)
{
if (48 <= this.m_cur && this.m_cur <= 57)
{
seg = seg*10 + this.consumeDigit();
}
else
{
segs.add(seg);
seg = 0;
if (this.m_cur != 46) break;
else this.consume();
}
}
return fan.sys.Version.make(segs);
}
fan.sys.DependParser.prototype.consumeDigit = function()
{
if (48 <= this.m_cur && this.m_cur <= 57)
{
var digit = this.m_cur - 48;
this.consume();
return digit;
}
throw new Error();
}
fan.sys.DependParser.prototype.consumeSpaces = function()
{
while (this.m_cur == 32 || this.m_cur == 9) this.consume();
}
fan.sys.DependParser.prototype.consume = function()
{
if (this.m_pos < this.m_len)
{
this.m_cur = this.m_str.charCodeAt(this.m_pos++);
}
else
{
this.m_cur = -1;
this.m_pos = this.m_len+1;
}
}
fan.sys.Str = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Str.prototype.$ctor = function() {}
fan.sys.Str.equalsIgnoreCase = function(self, that)
{
return self.toLowerCase() == that.toLowerCase();
}
fan.sys.Str.compareIgnoreCase = function(self, that)
{
var a = self.toLowerCase();
var b = that.toLowerCase();
if (a < b) return -1;
if (a == b) return 0;
return 1;
}
fan.sys.Str.toStr = function(self) { return self; }
fan.sys.Str.toLocale = function(self) { return self; }
fan.sys.Str.$typeof = function(self) { return fan.sys.Str.$type; }
fan.sys.Str.hash = function(self)
{
var hash = 0;
if (self.length == 0) return hash;
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
hash = ((hash << 5) - hash) + ch;
hash = hash & hash;
}
return hash;
}
fan.sys.Str.get = function(self, index)
{
if (index < 0) index += self.length;
if (index < 0 || index >= self.length) throw fan.sys.IndexErr.make(index);
return self.charCodeAt(index);
}
fan.sys.Str.getSafe = function(self, index, def)
{
if (def === undefined) def = 0;
try
{
if (index < 0) index += self.length;
if (index < 0 || index >= self.length) throw new Error();
return self.charCodeAt(index);
}
catch (err) { return def; }
}
fan.sys.Str.getRange = function(self, range)
{
var size = self.length;
var s = range.$start(size);
var e = range.$end(size);
if (e+1 < s) throw fan.sys.IndexErr.make(range);
return self.substr(s, (e-s)+1);
}
fan.sys.Str.plus = function(self, obj)
{
if (obj == null) return self + "null";
var x = fan.sys.ObjUtil.toStr(obj);
if (x.length == 0) return self;
return self + x;
}
fan.sys.Str.intern = function(self) { return self; }
fan.sys.Str.isEmpty = function(self) { return self.length == 0; }
fan.sys.Str.size = function(self) { return self.length; }
fan.sys.Str.startsWith = function(self, test)
{
if (self.length < test.length) return false;
for (var i=0; i<test.length; i++)
if (self[i] != test[i])
return false;
return true;
}
fan.sys.Str.endsWith = function(self, test)
{
if (self.length < test.length) return false;
for (var i=0; i<test.length; i++)
if (self[self.length-i-1] != test[test.length-i-1])
return false;
return true;
}
fan.sys.Str.contains = function(self, arg)
{
return self.indexOf(arg) != -1
}
fan.sys.Str.containsChar = function(self, arg)
{
return self.indexOf(fan.sys.Int.toChar(arg)) != -1
}
fan.sys.Str.index = function(self, s, off)
{
var i = 0;
if (off != null) i = off;
if (i < 0) i = self.length+i;
var r = self.indexOf(s, i);
if (r < 0) return null;
return r;
}
fan.sys.Str.indexr = function(self, s, off)
{
var i = -1;
if (off != null) i = off;
if (i < 0) i = self.length+i;
var r = self.lastIndexOf(s, i);
if (r < 0) return null;
return r;
}
fan.sys.Str.indexIgnoreCase = function(self, s, off)
{
return fan.sys.Str.index(self.toLowerCase(), s.toLowerCase(), off);
}
fan.sys.Str.indexrIgnoreCase = function(self, s, off)
{
return fan.sys.Str.indexr(self.toLowerCase(), s.toLowerCase(), off);
}
fan.sys.Str.each = function(self, f)
{
var len = self.length;
if (f.m_params.size() == 1)
{
for (var i=0; i<len; i++)
f.call(self.charCodeAt(i));
}
else
{
for (var i=0; i<len; i++)
f.call(self.charCodeAt(i), i);
}
}
fan.sys.Str.eachr = function(self, f)
{
if (f.m_params.size() == 1)
{
for (var i=self.length-1; i>=0; i--)
f.call(self.charCodeAt(i));
}
else
{
for (var i=self.length-1; i>=0; i--)
f.call(self.charCodeAt(i), i);
}
}
fan.sys.Str.eachWhile = function(self, f)
{
var len = self.length;
if (f.m_params.size() == 1)
{
for (var i=0; i<len; i++)
{
var r = f.call(self.charCodeAt(i));
if (r != null) return r;
}
}
else
{
for (var i=0; i<len; i++)
{
var r = f.call(self.charCodeAt(i), i);
if (r != null) return r;
}
}
return null;
}
fan.sys.Str.any = function(self, f)
{
var len = self.length;
if (f.m_params.size() == 1)
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i)) == true)
return true;
}
else
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i), i) == true)
return true;
}
return false;
}
fan.sys.Str.all = function(self, f)
{
var len = self.length;
if (f.m_params.size() == 1)
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i)) == false)
return false;
}
else
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i), i) == false)
return false;
}
return true;
}
fan.sys.Str.spaces = function(n)
{
if (fan.sys.Str.$spaces == null)
{
fan.sys.Str.$spaces = new Array();
var s = "";
for (var i=0; i<20; i++)
{
fan.sys.Str.$spaces[i] = s;
s += " ";
}
}
if (n < 20) return fan.sys.Str.$spaces[n];
var s = "";
for (var i=0; i<n; i++) s += " ";
return s;
}
fan.sys.Str.$spaces = null;
fan.sys.Str.lower = function(self)
{
var lower = "";
for (var i = 0; i < self.length; ++i)
{
var char = self[i];
var code = self.charCodeAt(i);
if (65 <= code && code <= 90)
char = String.fromCharCode(code | 0x20);
lower = lower + char;
}
return lower;
}
fan.sys.Str.upper = function(self)
{
var upper = "";
for (var i = 0; i < self.length; ++i)
{
var char = self[i];
var code = self.charCodeAt(i);
if (97 <= code && code <= 122)
char = String.fromCharCode(code & ~0x20);
upper = upper + char;
}
return upper;
}
fan.sys.Str.capitalize = function(self)
{
if (self.length > 0)
{
var ch = self.charCodeAt(0);
if (97 <= ch && ch <= 122)
return String.fromCharCode(ch & ~0x20) + self.substring(1);
}
return self;
}
fan.sys.Str.decapitalize = function(self)
{
if (self.length > 0)
{
var ch = self.charCodeAt(0);
if (65 <= ch && ch <= 90)
{
s = String.fromCharCode(ch | 0x20);
s += self.substring(1)
return s;
}
}
return self;
}
fan.sys.Str.toDisplayName = function(self)
{
if (self.length == 0) return "";
var s = '';
var c = self.charCodeAt(0);
if (97 <= c && c <= 122) c &= ~0x20;
s += String.fromCharCode(c);
var last = c;
for (var i=1; i<self.length; ++i)
{
c = self.charCodeAt(i);
if (65 <= c && c <= 90 && last != 95)
{
var next = i+1 < self.length ? self.charCodeAt(i+1) : 81;
if (!(65 <= last && last <= 90) || !(65 <= next && next <= 90))
s += ' ';
}
else if (97 <= c && c <= 122)
{
if ((48 <= last && last <= 57)) { s += ' '; c &= ~0x20; }
else if (last == 95) c &= ~0x20;
}
else if (48 <= c && c <= 57)
{
if (!(48 <= last && last <= 57)) s += ' ';
}
else if (c == 95)
{
s += ' ';
last = c;
continue;
}
s += String.fromCharCode(c);
last = c;
}
return s;
}
fan.sys.Str.fromDisplayName = function(self)
{
if (self.length == 0) return "";
var s = "";
var c = self.charCodeAt(0);
var c2 = self.length == 1 ? 0 : self.charCodeAt(1);
if (65 <= c && c <= 90 && !(65 <= c2 && c2 <= 90)) c |= 0x20;
s += String.fromCharCode(c);
var last = c;
for (var i=1; i<self.length; ++i)
{
c = self.charCodeAt(i);
if (c != 32)
{
if (last == 32 && 97 <= c && c <= 122) c &= ~0x20;
s += String.fromCharCode(c);
}
last = c;
}
return s;
}
fan.sys.Str.mult = function(self, times)
{
if (times <= 0) return "";
if (times == 1) return self;
var s = '';
for (var i=0; i<times; ++i) s += self;
return s;
}
fan.sys.Str.justl = function(self, width) { return fan.sys.Str.padr(self, width, 32); }
fan.sys.Str.justr = function(self, width) { return fan.sys.Str.padl(self, width, 32); }
fan.sys.Str.padl = function(self, w, ch)
{
if (ch === undefined) ch = 32;
if (self.length >= w) return self;
var c = String.fromCharCode(ch);
var s = '';
for (var i=self.length; i<w; ++i) s += c;
s += self;
return s;
}
fan.sys.Str.padr = function(self, w, ch)
{
if (ch === undefined) ch = 32;
if (self.length >= w) return self;
var c = String.fromCharCode(ch);
var s = '';
s += self;
for (var i=self.length; i<w; ++i) s += c;
return s;
}
fan.sys.Str.reverse = function(self)
{
var rev = "";
for (var i=self.length-1; i>=0; i--)
rev += self[i];
return rev;
}
fan.sys.Str.trim = function(self, trimStart, trimEnd)
{
if (self.length == 0) return self;
if (trimStart == null) trimStart = true;
if (trimEnd == null) trimEnd = true;
var s = 0;
var e = self.length-1;
while (trimStart && s<self.length && self.charCodeAt(s) <= 32) s++;
while (trimEnd && e>=s && self.charCodeAt(e) <= 32) e--;
return self.substr(s, (e-s)+1);
}
fan.sys.Str.trimStart = function(self) { return fan.sys.Str.trim(self, true, false); }
fan.sys.Str.trimEnd   = function(self) { return fan.sys.Str.trim(self, false, true); }
fan.sys.Str.trimToNull = function(self)
{
var trimmed = fan.sys.Str.trim(self, true, true);
return trimmed.length == 0 ? null : trimmed;
}
fan.sys.Str.split = function(self, sep, trimmed)
{
if (sep == null) return fan.sys.Str.splitws(self);
var toks = fan.sys.List.make(fan.sys.Str.$type, []);
var trim = (trimmed != null) ? trimmed : true;
var len = self.length;
var x = 0;
for (var i=0; i<len; ++i)
{
if (self.charCodeAt(i) != sep) continue;
if (x <= i) toks.add(fan.sys.Str.splitStr(self, x, i, trim));
x = i+1;
}
if (x <= len) toks.add(fan.sys.Str.splitStr(self, x, len, trim));
return toks;
}
fan.sys.Str.splitStr = function(val, s, e, trim)
{
if (trim == true)
{
while (s < e && val.charCodeAt(s) <= 32) ++s;
while (e > s && val.charCodeAt(e-1) <= 32) --e;
}
return val.substring(s, e);
}
fan.sys.Str.splitws = function(val)
{
var toks = fan.sys.List.make(fan.sys.Str.$type, []);
var len = val.length;
while (len > 0 && val.charCodeAt(len-1) <= 32) --len;
var x = 0;
while (x < len && val.charCodeAt(x) <= 32) ++x;
for (var i=x; i<len; ++i)
{
if (val.charCodeAt(i) > 32) continue;
toks.add(val.substring(x, i));
x = i + 1;
while (x < len && val.charCodeAt(x) <= 32) ++x;
i = x;
}
if (x <= len) toks.add(val.substring(x, len));
if (toks.size() == 0) toks.add("");
return toks;
}
fan.sys.Str.splitLines = function(self)
{
var lines = fan.sys.List.make(fan.sys.Str.$type, []);
var len = self.length;
var s = 0;
for (var i=0; i<len; ++i)
{
var c = self.charAt(i);
if (c == '\n' || c == '\r')
{
lines.add(self.substring(s, i));
s = i+1;
if (c == '\r' && s < len && self.charAt(s) == '\n') { i++; s++; }
}
}
lines.add(self.substring(s, len));
return lines;
}
fan.sys.Str.replace = function(self, oldstr, newstr)
{
if (oldstr == '') return self;
return self.split(oldstr).join(newstr);
}
fan.sys.Str.numNewlines = function(self)
{
var numLines = 0;
var len = self.length;
for (var i=0; i<len; ++i)
{
var c = self.charCodeAt(i);
if (c == 10) numLines++;
else if (c == 13)
{
numLines++;
if (i+1<len && self.charCodeAt(i+1) == 10) i++;
}
}
return numLines;
}
fan.sys.Str.isAscii = function(self)
{
for (var i=0; i<self.length; i++)
if (self.charCodeAt(i) > 127)
return false;
return true;
}
fan.sys.Str.isSpace = function(self)
{
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch != 32 && ch != 9 && ch != 10 && ch != 12 && ch != 13)
return false;
}
return true;
}
fan.sys.Str.isUpper = function(self)
{
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch < 65 || ch > 90) return false;
}
return true;
}
fan.sys.Str.isLower = function(self)
{
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch < 97 || ch > 122) return false;
}
return true;
}
fan.sys.Str.isAlpha = function(self)
{
var Int = fan.sys.Int;
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch >= 128 || (Int.charMap[ch] & Int.ALPHA) == 0)
return false;
}
return true;
}
fan.sys.Str.isAlphaNum = function(self)
{
var Int = fan.sys.Int;
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch >= 128 || (Int.charMap[ch] & Int.ALPHANUM) == 0)
return false;
}
return true;
}
fan.sys.Str.isEveryChar = function(self, ch)
{
var len = self.length;
for (var i=0; i<len; ++i)
if (self.charCodeAt(i) != ch) return false;
return true;
}
fan.sys.Str.localeCompare = function(self, that)
{
return self.localeCompare(that, fan.sys.Locale.cur().toStr(), {sensitivity:'base'});
}
fan.sys.Str.localeUpper = function(self)
{
return self.toLocaleUpperCase(fan.sys.Locale.cur().toStr());
}
fan.sys.Str.localeLower = function(self)
{
return self.toLocaleLowerCase(fan.sys.Locale.cur().toStr());
}
fan.sys.Str.localeCapitalize = function(self)
{
var upper = fan.sys.Str.localeUpper(self);
return upper[0] + self.substring(1);
}
fan.sys.Str.localeDecapitalize = function(self)
{
var lower = fan.sys.Str.localeLower(self);
return lower[0] + self.substring(1);
}
fan.sys.Str.toBool = function(self, checked) { return fan.sys.Bool.fromStr(self, checked); }
fan.sys.Str.toFloat = function(self, checked) { return fan.sys.Float.fromStr(self, checked); }
fan.sys.Str.toInt = function(self, radix, checked) { return fan.sys.Int.fromStr(self, radix, checked); }
fan.sys.Str.toDecimal = function(self, checked) { return fan.sys.Decimal.fromStr(self, checked); }
fan.sys.Str.$in = function(self) { return fan.sys.InStream.makeForStr(self); }
fan.sys.Str.toUri = function(self) { return fan.sys.Uri.fromStr(self); }
fan.sys.Str.toRegex = function(self) { return fan.sys.Regex.fromStr(self); }
fan.sys.Str.chars = function(self)
{
var ch = fan.sys.List.make(fan.sys.Int.$type, []);
for (var i=0; i<self.length; i++) ch.add(self.charCodeAt(i));
return ch;
}
fan.sys.Str.fromChars = function(ch)
{
var i, s = '';
for (i=0; i<ch.size(); i++) s += String.fromCharCode(ch.get(i));
return s;
}
fan.sys.Str.toBuf = function(self, charset)
{
if (charset === undefined) charset = fan.sys.Charset.utf8();
var buf = new fan.sys.MemBuf();
buf.charset$(charset);
buf.print(self);
return buf.flip();
}
fan.sys.Str.toCode = function(self, quote, escu)
{
if (quote === undefined) quote = 34;
if (escu === undefined) escu = false;
var s = "";
var q = 0;
if (quote != null)
{
q = String.fromCharCode(quote);
s += q;
}
var len = self.length;
for (var i=0; i<len; ++i)
{
var c = self.charAt(i);
switch (c)
{
case '\n': s += '\\' + 'n'; break;
case '\r': s += '\\' + 'r'; break;
case '\f': s += '\\' + 'f'; break;
case '\t': s += '\\' + 't'; break;
case '\\': s += '\\' + '\\'; break;
case '"':  if (q == '"')  s += '\\' + '"';  else s += c; break;
case '`':  if (q == '`')  s += '\\' + '`';  else s += c; break;
case '\'': if (q == '\'') s += '\\' + '\''; else s += c; break;
case '$':  s += '\\' + '$'; break;
default:
var hex  = function(x) { return "0123456789abcdef".charAt(x); }
var code = c.charCodeAt(0);
if (code < 32 || (escu && code > 127))
{
s += '\\' + 'u'
+ hex((code>>12)&0xf)
+ hex((code>>8)&0xf)
+ hex((code>>4)&0xf)
+ hex(code & 0xf);
}
else
{
s += c;
}
}
}
if (q != 0) s += q;
return s;
}
fan.sys.Str.toXml = function(self)
{
var s = null;
var len = self.length;
for (var i=0; i<len; ++i)
{
var ch = self.charAt(i);
var c = self.charCodeAt(i);
if (c > 62)
{
if (s != null) s += ch;
}
else
{
var esc = fan.sys.Str.xmlEsc[c];
if (esc != null && (c != 62 || i==0 || self.charCodeAt(i-1) == 93))
{
if (s == null)
{
s = "";
s += self.substring(0,i);
}
s += esc;
}
else if (s != null)
{
s += ch;
}
}
}
if (s == null) return self;
return s;
}
fan.sys.Str.xmlEsc = [];
fan.sys.Str.xmlEsc[38] = "&amp;";
fan.sys.Str.xmlEsc[60] = "&lt;";
fan.sys.Str.xmlEsc[62] = "&gt;";
fan.sys.Str.xmlEsc[39] = "&#39;";
fan.sys.Str.xmlEsc[34] = "&quot;";
fan.sys.Str.javaToJs = function(java)
{
var js = "";
for(var i=0; i<java.length(); ++i) js += String.fromCharCode(java.charAt(i));
return js;
}
fan.sys.Bool = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Bool.prototype.$ctor = function() {}
fan.sys.Bool.hash = function(self)
{
return self ? 1231 : 1237;
}
fan.sys.Bool.prototype.$typeof = function()
{
return fan.sys.Bool.$type;
}
fan.sys.Bool.not = function(self)    { return !self; }
fan.sys.Bool.and = function(self, b) { return self && b; }
fan.sys.Bool.or  = function(self, b) { return self || b; }
fan.sys.Bool.xor = function(self, b) { return self != b; }
fan.sys.Bool.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
if (s == "true") return true;
if (s == "false") return false;
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Bool", s);
}
fan.sys.Bool.toStr  = function(self) { return self ? "true" : "false"; }
fan.sys.Bool.toCode = function(self) { return self ? "true" : "false"; }
fan.sys.Bool.toLocale = function(self)
{
var key = self ? "boolTrue" : "boolFalse";
return fan.sys.Env.cur().locale(fan.sys.Pod.find("sys"), key, fan.sys.Bool.toStr(self));
}
fan.sys.MimeType = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.MimeType.prototype.$ctor = function() {}
fan.sys.MimeType.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var mime = fan.sys.MimeType.byMime[s];
if (mime != null) return mime;
return fan.sys.MimeType.parseStr(s);
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("MimeType",  s);
}
}
fan.sys.MimeType.parseStr = function(s)
{
var slash = s.indexOf('/');
if (slash < 0) throw ParseErr.make(s);
var media = s.substring(0, slash);
var sub = s.substring(slash+1, s.length);
var params = fan.sys.MimeType.emptyParams();
var semi = sub.indexOf(';');
if (semi > 0)
{
params = fan.sys.MimeType.doParseParams(sub, semi+1);
sub = fan.sys.Str.trim(sub.substring(0, semi));
}
var r = new fan.sys.MimeType();
r.m_str = s;
r.m_mediaType = fan.sys.Str.lower(media);
r.m_subType   = fan.sys.Str.lower(sub);
r.m_params    = params.ro();
return r;
}
fan.sys.MimeType.parseParams = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var v = fan.sys.MimeType.doParseParams(s, 0);
return v;
}
catch (err)
{
if (!checked) return null;
if (err instanceof fan.sys.ParseErr) throw err;
throw fan.sys.ParseErr.makeStr("MimeType params",  s);
}
}
fan.sys.MimeType.doParseParams = function(s, offset)
{
var params = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
params.caseInsensitive$(true);
var inQuotes = false;
var keyStart = offset;
var valStart = -1;
var valEnd   = -1;
var eq       = -1;
var hasEsc   = false;
for (var i=keyStart; i<s.length; ++i)
{
var c = s.charAt(i);
if (c == '=' && eq < 0 && !inQuotes)
{
eq = i++;
while (fan.sys.MimeType.isSpace(s, i)) ++i;
if (s.charAt(i) == '"') { inQuotes = true; ++i; c = s.charAt(i); }
else inQuotes = false;
valStart = i;
}
if (c == ';' && eq < 0 && !inQuotes)
{
var key = fan.sys.Str.trim(s.substring(keyStart, i));
params.set(key, "");
keyStart = i+1;
eq = valStart = valEnd = -1;
hasEsc = false;
continue;
}
if (eq < 0) continue;
if (c == '\\' && inQuotes)
{
++i;
hasEsc = true;
continue;
}
if (c == '"' && inQuotes)
{
valEnd = i-1;
inQuotes = false;
}
if (c == ';' && !inQuotes)
{
if (valEnd < 0) valEnd = i-1;
var key = fan.sys.Str.trim(s.substring(keyStart, eq));
var val = fan.sys.Str.trim(s.substring(valStart, valEnd+1));
if (hasEsc) val = fan.sys.MimeType.unescape(val);
params.set(key, val);
keyStart = i+1;
eq = valStart = valEnd = -1;
hasEsc = false;
}
}
if (keyStart < s.length)
{
if (valEnd < 0) valEnd = s.length-1;
if (eq < 0)
{
var key = fan.sys.Str.trim(s.substring(keyStart, s.length));
params.set(key, "");
}
else
{
var key = fan.sys.Str.trim(s.substring(keyStart, eq));
var val = fan.sys.Str.trim(s.substring(valStart, valEnd+1));
if (hasEsc) val = fan.sys.MimeType.unscape(val);
params.set(key, val);
}
}
return params;
}
fan.sys.MimeType.isSpace = function(s, i)
{
if (i >= s.length) throw fan.sys.IndexErr.make(i);
return fan.sys.Int.isSpace(s.charCodeAt(i));
}
fan.sys.MimeType.unescape = function(s)
{
var buf = "";
for (var i=0; i<s.length; ++i)
{
var c = s.charAt(i);
if (c != '\\') buf += c;
else if (s.charAt(i+1) == '\\') { buf += '\\'; i++; }
}
return buf;
}
fan.sys.MimeType.forExt = function(ext)
{
if (ext == null) return null;
try
{
ext = ext.toLowerCase();
return fan.sys.MimeType.byExt[ext];
}
catch (err)
{
fan.sys.ObjUtil.echo("MimeType.forExt: " + s);
fan.sys.ObjUtil.echo(err);
return null;
}
}
fan.sys.MimeType.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.MimeType)
{
return this.m_mediaType == obj.m_mediaType &&
this.m_subType == obj.m_subType &&
this.m_params.equals(obj.m_params);
}
return false;
}
fan.sys.MimeType.prototype.hash = function()
{
return 0;
}
fan.sys.MimeType.prototype.toStr = function() { return this.m_str; }
fan.sys.MimeType.prototype.$typeof = function() { return fan.sys.MimeType.$type; }
fan.sys.MimeType.prototype.mediaType = function() { return this.m_mediaType; }
fan.sys.MimeType.prototype.subType = function() { return this.m_subType; }
fan.sys.MimeType.prototype.params = function() { return this.m_params; }
fan.sys.MimeType.prototype.charset = function()
{
var s = this.params().get("charset");
if (s == null) return fan.sys.Charset.utf8();
return fan.sys.Charset.fromStr(s);
}
fan.sys.MimeType.prototype.noParams = function()
{
if (this.params().isEmpty()) return this;
return fan.sys.MimeType.fromStr(this.mediaType() + "/" + this.subType());
}
fan.sys.MimeType.emptyParams = function()
{
var q = fan.sys.MimeType.emptyQuery;
if (q == null)
{
q = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
q.caseInsensitive$(true);
fan.sys.MimeType.emptyQuery = q;
}
return q;
}
fan.sys.MimeType.emptyQuery = null;
fan.sys.MimeType.cache$ = function(ext, s)
{
var mime = fan.sys.MimeType.parseStr(s);
fan.sys.MimeType.byExt[ext] = mime;
fan.sys.MimeType.byMime[mime.toStr()] = mime;
mime = mime.noParams();
fan.sys.MimeType.byMime[mime.toStr()] = mime;
}
fan.sys.MimeType.byExt  = {}
fan.sys.MimeType.byMime = {}
fan.sys.MimeType.predefined = function(media, sub, params)
{
if (params === undefined) params = "";
var t = new fan.sys.MimeType();
t.m_mediaType = media;
t.m_subType = sub;
t.m_params = fan.sys.MimeType.parseParams(params, true);
t.m_str = media + "/" + sub;
return t;
}
fan.sys.Type = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Type.prototype.$ctor = function(qname, base, mixins, facets, flags)
{
if (qname === undefined) return;
if (fan.sys.Type.$type != null)
{
var acc = fan.sys.List.make(fan.sys.Type.$type, []);
for (var i=0; i<mixins.length; i++)
acc.add(fan.sys.Type.find(mixins[i]));
this.m_mixins = acc.ro();
}
var s = qname.split("::");
this.m_qname    = qname;
this.m_pod      = fan.sys.Pod.find(s[0]);
this.m_name     = s[1];
this.m_base     = base == null ? null : fan.sys.Type.find(base);
this.m_myFacets = new fan.sys.Facets(facets);
this.m_flags    = flags;
this.m_$qname   = 'fan.' + this.m_pod + '.' + this.m_name;
this.m_isMixin  = false;
this.m_nullable = new fan.sys.NullableType(this);
this.m_slotsInfo   = [];
this.m_slotsByName = null;
}
fan.sys.Type.prototype.pod = function() { return this.m_pod; }
fan.sys.Type.prototype.$name = function() { return this.m_name; }
fan.sys.Type.prototype.qname = function() { return this.m_qname; }
fan.sys.Type.prototype.signature = function() { return this.m_qname; }
fan.sys.Type.prototype.isAbstract  = function() { return (this.flags() & fan.sys.FConst.Abstract) != 0; }
fan.sys.Type.prototype.isClass     = function() { return (this.flags() & (fan.sys.FConst.Enum|fan.sys.FConst.Mixin)) == 0; }
fan.sys.Type.prototype.isConst     = function() { return (this.flags() & fan.sys.FConst.Const) != 0; }
fan.sys.Type.prototype.isEnum      = function() { return (this.flags() & fan.sys.FConst.Enum) != 0; }
fan.sys.Type.prototype.isFacet     = function() { return (this.flags() & fan.sys.FConst.Facet) != 0; }
fan.sys.Type.prototype.isFinal     = function() { return (this.flags() & fan.sys.FConst.Final) != 0; }
fan.sys.Type.prototype.isInternal  = function() { return (this.flags() & fan.sys.FConst.Internal) != 0; }
fan.sys.Type.prototype.isMixin     = function() { return (this.flags() & fan.sys.FConst.Mixin) != 0; }
fan.sys.Type.prototype.isPublic    = function() { return (this.flags() & fan.sys.FConst.Public) != 0; }
fan.sys.Type.prototype.isSynthetic = function() { return (this.flags() & fan.sys.FConst.Synthetic) != 0; }
fan.sys.Type.prototype.flags = function() { return this.m_flags; };
fan.sys.Type.prototype.trap = function(name, args)
{
if (name == "flags") return this.flags();
return fan.sys.Obj.prototype.trap.call(this, name, args);
}
fan.sys.Type.prototype.equals = function(that)
{
if (that instanceof fan.sys.Type)
return this.signature() === that.signature();
else
return false;
}
fan.sys.Type.prototype.isVal = function()
{
return this === fan.sys.Bool.$type ||
this === fan.sys.Int.$type ||
this === fan.sys.Float.$type;
}
fan.sys.Type.prototype.isClass = function()   { return !this.m_isMixin && this.m_base.m_qname != "sys::Enum"; }
fan.sys.Type.prototype.isEnum = function()    { return this.m_base != null && this.m_base.m_qname == "sys::Enum"; }
fan.sys.Type.prototype.isMixin = function()   { return this.m_isMixin; }
fan.sys.Type.prototype.log = function()       { return fan.sys.Log.get(this.m_pod.m_name); }
fan.sys.Type.prototype.toStr = function()     { return this.signature(); }
fan.sys.Type.prototype.toLocale = function()  { return this.signature(); }
fan.sys.Type.prototype.$typeof = function()   { return fan.sys.Type.$type; }
fan.sys.Type.prototype.$literalEncode = function(out)  { out.w(this.signature()).w("#"); }
fan.sys.Type.prototype.isNullable = function() { return false; }
fan.sys.Type.prototype.toNonNullable = function() { return this; }
fan.sys.Type.prototype.toNullable = function() { return this.m_nullable; }
fan.sys.Type.prototype.toNonNullable = function() { return this; }
fan.sys.Type.prototype.isGenericType = function()
{
return this == fan.sys.List.$type ||
this == fan.sys.Map.$type ||
this == fan.sys.Func.$type;
}
fan.sys.Type.prototype.isGenericInstance = function() { false }
fan.sys.Type.prototype.isGenericParameter = function()
{
return this.m_pod.m_name === "sys" && this.m_name.length === 1;
}
fan.sys.Type.prototype.isGeneric = function() { return this.isGenericType(); }
fan.sys.Type.prototype.params = function()
{
if (fan.sys.Type.$noParams == null)
fan.sys.Type.$noParams = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Type.$type).ro();
return fan.sys.Type.$noParams;
}
fan.sys.Type.prototype.parameterize = function(params)
{
if (this === fan.sys.List.$type)
{
var v = params.get("V");
if (v == null) throw fan.sys.ArgErr.make("List.parameterize - V undefined");
return v.toListOf();
}
if (this === fan.sys.Map.$type)
{
var v = params.get("V");
var k = params.get("K");
if (v == null) throw fan.sys.ArgErr.make("Map.parameterize - V undefined");
if (k == null) throw fan.sys.ArgErr.make("Map.parameterize - K undefined");
return new fan.sys.MapType(k, v);
}
if (this === fan.sys.Func.$type)
{
var r = params.get("R");
if (r == null) throw fan.sys.ArgErr.make("Func.parameterize - R undefined");
var p = [];
for (var i=65; i<=72; ++i)
{
var x = params.get(String.fromCharCode(i));
if (x == null) break;
p.push(x);
}
return new fan.sys.FuncType(p, r);
}
throw fan.sys.UnsupportedErr.make("not generic: " + this);
}
fan.sys.Type.prototype.toListOf = function()
{
if (this.m_listOf == null) this.m_listOf = new fan.sys.ListType(this);
return this.m_listOf;
}
fan.sys.Type.prototype.emptyList = function()
{
if (this.$emptyList == null)
this.$emptyList = fan.sys.List.make(this).toImmutable();
return this.$emptyList;
}
fan.sys.Type.prototype.make = function(args)
{
if (args === undefined) args = null;
var make = this.method("make", false);
if (make != null && make.isPublic())
{
if (this.isAbstract() && !make.isStatic())
throw fan.sys.Err.make("Cannot instantiate abstract class: " + this.m_qname);
var numArgs = args == null ? 0 : args.size();
var params = make.params();
if ((numArgs == params.size()) ||
(numArgs < params.size() && params.get(numArgs).hasDefault()))
return make.invoke(null, args);
}
var defVal = this.slot("defVal", false);
if (defVal != null && defVal.isPublic())
{
if (defVal instanceof fan.sys.Field) return defVal.get(null);
if (defVal instanceof fan.sys.Method) return defVal.invoke(null, null);
}
throw fan.sys.Err.make("Type missing 'make' or 'defVal' slots: " + this);
}
fan.sys.Type.prototype.slots   = function() { return this.reflect().m_slotList.ro(); }
fan.sys.Type.prototype.methods = function() { return this.reflect().m_methodList.ro(); }
fan.sys.Type.prototype.fields  = function() { return this.reflect().m_fieldList.ro(); }
fan.sys.Type.prototype.slot = function(name, checked)
{
if (checked === undefined) checked = true;
var slot = this.reflect().m_slotsByName[name];
if (slot != null) return slot;
if (checked) throw fan.sys.UnknownSlotErr.make(this.m_qname + "." + name);
return null;
}
fan.sys.Type.prototype.method = function(name, checked)
{
var slot = this.slot(name, checked);
if (slot == null) return null;
return fan.sys.ObjUtil.coerce(slot, fan.sys.Method.$type);
}
fan.sys.Type.prototype.field = function(name, checked)
{
var slot = this.slot(name, checked);
if (slot == null) return null;
return fan.sys.ObjUtil.coerce(slot, fan.sys.Field.$type);
}
fan.sys.Type.prototype.$am = function(name, flags, returns, params, facets)
{
var r = fanx_TypeParser.load(returns);
var m = new fan.sys.Method(this, name, flags, r, params, facets);
this.m_slotsInfo.push(m);
return this;
}
fan.sys.Type.prototype.$af = function(name, flags, of, facets)
{
var t = fanx_TypeParser.load(of);
var f = new fan.sys.Field(this, name, flags, t, facets);
this.m_slotsInfo.push(f);
return this;
}
fan.sys.Type.prototype.base = function()
{
return this.m_base;
}
fan.sys.Type.prototype.mixins = function()
{
if (this.m_mixins == null)
this.m_mixins = fan.sys.Type.$type.emptyList();
return this.m_mixins;
}
fan.sys.Type.prototype.inheritance = function()
{
if (this.m_inheritance == null) this.m_inheritance = fan.sys.Type.$inheritance(this);
return this.m_inheritance;
}
fan.sys.Type.$inheritance = function(self)
{
var map = {};
var acc = fan.sys.List.make(fan.sys.Type.$type);
if (self == fan.sys.Void.$type)
{
acc.add(self);
return acc.trim().ro();
}
map[self.qname()] = self;
acc.add(self);
fan.sys.Type.addInheritance(self.base(), acc, map);
var mixins = self.mixins();
for (var i=0; i<mixins.size(); ++i)
fan.sys.Type.addInheritance(mixins.get(i), acc, map);
return acc.trim().ro();
}
fan.sys.Type.addInheritance = function(t, acc, map)
{
if (t == null) return;
var ti = t.inheritance();
for (var i=0; i<ti.size(); ++i)
{
var x = ti.get(i);
if (map[x.qname()] == null)
{
map[x.qname()] = x;
acc.add(x);
}
}
}
fan.sys.Type.prototype.fits = function(that) { return this.toNonNullable().is(that.toNonNullable()); }
fan.sys.Type.prototype.is = function(that)
{
if (that instanceof fan.sys.NullableType)
that = that.m_root;
if (this.equals(that)) return true;
if (this === fan.sys.Void.$type) return false;
var base = this.m_base;
while (base != null)
{
if (base.equals(that)) return true;
base = base.m_base;
}
var t = this;
while (t != null)
{
var m = t.mixins();
for (var i=0; i<m.size(); i++)
if (fan.sys.Type.checkMixin(m.get(i), that)) return true;
t = t.m_base;
}
return false;
}
fan.sys.Type.checkMixin = function(mixin, that)
{
if (mixin.equals(that)) return true;
var m = mixin.mixins();
for (var i=0; i<m.size(); i++)
if (fan.sys.Type.checkMixin(m.get(i), that))
return true;
return false;
}
fan.sys.Type.prototype.hasFacet = function(type)
{
return this.facet(type, false) != null;
}
fan.sys.Type.prototype.facets = function()
{
if (this.m_inheritedFacets == null) this.loadFacets();
return this.m_inheritedFacets.list();
}
fan.sys.Type.prototype.facet = function(type, checked)
{
if (checked === undefined) checked = true;
if (this.m_inheritedFacets == null) this.loadFacets();
return this.m_inheritedFacets.get(type, checked);
}
fan.sys.Type.prototype.loadFacets = function()
{
var f = this.m_myFacets.dup();
var inheritance = this.inheritance();
for (var i=0; i<inheritance.size(); ++i)
{
var x = inheritance.get(i);
if (x.m_myFacets) f.inherit(x.m_myFacets);
}
this.m_inheritedFacets = f;
}
fan.sys.Type.prototype.reflect = function()
{
if (this.m_slotsByName != null) return this;
this.doReflect();
return this;
}
fan.sys.Type.prototype.doReflect = function()
{
var slots = [];
var nameToSlot  = {};
var nameToIndex = {};
if (this.m_mixins)
{
for (var i=0; i<this.m_mixins.size(); i++)
{
this.$mergeType(this.m_mixins.get(i), slots, nameToSlot, nameToIndex);
}
}
this.$mergeType(this.m_base, slots, nameToSlot, nameToIndex);
for (var i=0; i<this.m_slotsInfo.length; i++)
{
var slot = this.m_slotsInfo[i]
this.$mergeSlot(slot, slots, nameToSlot, nameToIndex);
}
var fields  = [];
var methods = [];
for (var i=0; i<slots.length; i++)
{
var slot = slots[i];
if (slot instanceof fan.sys.Field) fields.push(slot);
else methods.push(slot);
}
this.m_slotList    = fan.sys.List.make(fan.sys.Slot.$type, slots);
this.m_fieldList   = fan.sys.List.make(fan.sys.Field.$type, fields);
this.m_methodList  = fan.sys.List.make(fan.sys.Method.$type, methods);
this.m_slotsByName = nameToSlot;
}
fan.sys.Type.prototype.$mergeType = function(inheritedType, slots, nameToSlot, nameToIndex)
{
if (inheritedType == null) return;
var inheritedSlots = inheritedType.reflect().slots();
for (var i=0; i<inheritedSlots.size(); i++)
this.$mergeSlot(inheritedSlots.get(i), slots, nameToSlot, nameToIndex);
}
fan.sys.Type.prototype.$mergeSlot = function(slot, slots, nameToSlot, nameToIndex)
{
if (slot.isCtor() && slot.m_parent != this) return;
var name = slot.m_name;
var dup  = nameToIndex[name];
if (dup != null)
{
if (slot.parent() == fan.sys.Obj.$type)
return;
var dupSlot = slots[dup];
if (slot.parent() != this && slot.isAbstract() && !dupSlot.isAbstract())
return;
if ((slot.m_flags & (fan.sys.FConst.Getter | fan.sys.FConst.Setter)) != 0)
{
var field = slots[dup];
if ((slot.m_flags & fan.sys.FConst.Getter) != 0)
field.m_getter = slot;
else
field.m_setter = slot;
return;
}
nameToSlot[name] = slot;
slots[dup] = slot;
}
else
{
nameToSlot[name] = slot;
slots.push(slot);
nameToIndex[name] = slots.length-1;
}
}
fan.sys.Type.find = function(sig, checked)
{
return fanx_TypeParser.load(sig, checked);
}
fan.sys.Type.of = function(obj)
{
if (obj instanceof fan.sys.Obj)
return obj.$typeof();
else
return fan.sys.Type.toFanType(obj);
}
fan.sys.Type.toFanType = function(obj)
{
if (obj == null) throw fan.sys.Err.make("sys::Type.toFanType: obj is null");
if (obj.$fanType != undefined) return obj.$fanType;
if ((typeof obj) == "boolean" || obj instanceof Boolean) return fan.sys.Bool.$type;
if ((typeof obj) == "number"  || obj instanceof Number)  return fan.sys.Int.$type;
if ((typeof obj) == "string"  || obj instanceof String)  return fan.sys.Str.$type;
throw fan.sys.Err.make("sys::Type.toFanType: Not a Fantom type: " + obj);
}
fan.sys.Type.common = function(objs)
{
if (objs.length == 0) return fan.sys.Obj.$type.toNullable();
var nullable = false;
var best = null;
for (var i=0; i<objs.length; i++)
{
var obj = objs[i];
if (obj == null) { nullable = true; continue; }
var t = fan.sys.ObjUtil.$typeof(obj);
if (best == null) { best = t; continue; }
while (!t.is(best))
{
best = best.base();
if (best == null) return nullable ? fan.sys.Obj.$type.toNullable() : fan.sys.Obj.$type;
}
}
if (best == null) best = fan.sys.Obj.$type;
return nullable ? best.toNullable() : best;
}
fan.sys.NullableType = fan.sys.Obj.$extend(fan.sys.Type)
fan.sys.NullableType.prototype.$ctor = function(root)
{
this.m_root = root;
this.m_signature = root.signature() + "?";
}
fan.sys.NullableType.prototype.podName = function() { return this.m_root.podName(); }
fan.sys.NullableType.prototype.pod = function() { return this.m_root.pod(); }
fan.sys.NullableType.prototype.name = function() { return this.m_root.name(); }
fan.sys.NullableType.prototype.qname = function() { return this.m_root.qname(); }
fan.sys.NullableType.prototype.signature = function() { return this.m_signature; }
fan.sys.NullableType.prototype.flags = function() { return this.m_root.flags(); }
fan.sys.NullableType.prototype.base = function() { return this.m_root.base(); }
fan.sys.NullableType.prototype.mixins = function() { return this.m_root.mixins(); }
fan.sys.NullableType.prototype.inheritance = function() { return this.m_root.inheritance(); }
fan.sys.NullableType.prototype.is = function(type) { return this.m_root.is(type); }
fan.sys.NullableType.prototype.isVal = function() { return this.m_root.isVal(); }
fan.sys.NullableType.prototype.isNullable = function() { return true; }
fan.sys.NullableType.prototype.toNullable = function() { return this; }
fan.sys.NullableType.prototype.toNonNullable = function() { return this.m_root; }
fan.sys.NullableType.prototype.isGenericType = function() { return this.m_root.isGenericType(); }
fan.sys.NullableType.prototype.isGenericInstance = function() { return this.m_root.isGenericInstance(); }
fan.sys.NullableType.prototype.isGenericParameter = function() { return this.m_root.isGenericParameter(); }
fan.sys.NullableType.prototype.getRawType = function() { return this.m_root.getRawType(); }
fan.sys.NullableType.prototype.params = function() { return this.m_root.params(); }
fan.sys.NullableType.prototype.parameterize = function(params) { return this.m_root.parameterize(params).toNullable(); }
fan.sys.NullableType.prototype.fields = function() { return this.m_root.fields(); }
fan.sys.NullableType.prototype.methods = function() { return this.m_root.methods(); }
fan.sys.NullableType.prototype.slots = function() { return this.m_root.slots(); }
fan.sys.NullableType.prototype.slot = function(name, checked) { return this.m_root.slot(name, checked); }
fan.sys.NullableType.prototype.facets = function() { return this.m_root.facets(); }
fan.sys.NullableType.prototype.facet = function(type, checked) { return this.m_root.facet(type, checked); }
fan.sys.NullableType.prototype.doc = function() { return this.m_root.doc(); }
fan.sys.GenericType = fan.sys.Obj.$extend(fan.sys.Type)
fan.sys.GenericType.prototype.$ctor = function(v) {}
fan.sys.GenericType.prototype.params = function()
{
if (this.m_params == null) this.m_params = this.makeParams();
return this.m_params;
}
fan.sys.GenericType.prototype.doReflect = function()
{
var master = this.base();
master.doReflect();
var masterSlots = master.slots();
var slots = [];
var fields = [];
var methods = [];
var slotsByName = {};
for (var i=0; i<masterSlots.size(); i++)
{
var slot = masterSlots.get(i);
if (slot instanceof fan.sys.Method)
{
slot = this.parameterizeMethod(slot);
methods.push(slot);
}
else
{
slot = this.parameterizeField(slot);
fields.push(slot);
}
slots.push(slot);
slotsByName[slot.m_name] = slot;
}
this.m_slotList = fan.sys.List.make(fan.sys.Slot.$type, slots);
this.m_fieldList = fan.sys.List.make(fan.sys.Field.$type, fields);
this.m_methodList = fan.sys.List.make(fan.sys.Method.$type, methods);
this.m_slotsByName = slotsByName;
}
fan.sys.GenericType.prototype.parameterizeField = function(f)
{
var t = f.type();
if (!t.isGenericParameter()) return f;
t = this.parameterizeType(t);
var pf = new fan.sys.Field(this, f.m_name, f.m_flags, t, f.m_facets);
return pf;
}
fan.sys.GenericType.prototype.parameterizeMethod = function(m)
{
if (!m.isGenericMethod()) return m;
var func = m.m_func;
var ret;
var params = fan.sys.List.make(fan.sys.Param.$type);
if (func.returns().isGenericParameter())
ret = this.parameterizeType(func.returns());
else
ret = func.returns();
var arity = m.params().size();
for (var i=0; i<arity; ++i)
{
var p = m.params().get(i);
if (p.m_type.isGenericParameter())
{
params.add(new fan.sys.Param(p.m_name, this.parameterizeType(p.m_type), p.m_hasDefault));
}
else
{
params.add(p);
}
}
var pm = new fan.sys.Method(this, m.m_name, m.m_flags, ret, params, m.m_facets, m)
return pm;
}
fan.sys.GenericType.prototype.parameterizeType = function(t)
{
var nullable = t.isNullable();
var nn = t.toNonNullable();
if (nn instanceof fan.sys.ListType)
t = this.parameterizeListType(nn);
else if (nn instanceof fan.sys.FuncType)
t = this.parameterizeFuncType(nn);
else
t = this.doParameterize(nn);
return nullable ? t.toNullable() : t;
}
fan.sys.GenericType.prototype.parameterizeListType = function(t)
{
return this.doParameterize(t.v).toListOf();
}
fan.sys.GenericType.prototype.parameterizeFuncType = function(t)
{
var params = [];
for (var i=0; i<t.pars.length; i++)
{
var param = t.pars[i];
if (param.isGenericParameter()) param = this.doParameterize(param);
params[i] = param;
}
var ret = t.ret;
if (ret.isGenericParameter()) ret = this.doParameterize(ret);
return new fan.sys.FuncType(params, ret);
}
fan.sys.GenericType.prototype.doParameterize = function(t) {}
fan.sys.ListType = fan.sys.Obj.$extend(fan.sys.GenericType)
fan.sys.ListType.prototype.$ctor = function(v)
{
this.v = v;
this.m_qname  = "sys::List";
this.m_pod    = fan.sys.Pod.find("sys");
this.m_name   = "List";
this.m_base   = fan.sys.List.$type;
this.m_mixins = fan.sys.Type.$type.emptyList();
this.m_slots  = {};
}
fan.sys.ListType.prototype.signature = function()
{
return this.v.signature() + '[]';
}
fan.sys.ListType.prototype.equals = function(that)
{
if (that instanceof fan.sys.ListType)
return this.v.equals(that.v);
else
return false;
}
fan.sys.ListType.prototype.is = function(that)
{
if (that instanceof fan.sys.ListType)
{
if (that.v.qname() == "sys::Obj") return true;
return this.v.is(that.v);
}
if (that instanceof fan.sys.Type)
{
if (that.qname() == "sys::List") return true;
if (that.qname() == "sys::Obj")  return true;
}
return false;
}
fan.sys.ListType.prototype.as = function(obj, that)
{
var objType = fan.sys.ObjUtil.$typeof(obj);
if (objType instanceof fan.sys.ListType &&
objType.v.qname() == "sys::Obj" &&
that instanceof fan.sys.ListType)
return obj;
if (that instanceof fan.sys.NullableType &&
that.m_root instanceof fan.sys.ListType)
that = that.m_root;
return objType.is(that) ? obj : null;
}
fan.sys.ListType.prototype.toNullable = function()
{
if (this.m_nullable == null) this.m_nullable = new fan.sys.NullableType(this);
return this.m_nullable;
}
fan.sys.ListType.prototype.facets = function() { return fan.sys.List.$type.facets(); }
fan.sys.ListType.prototype.facet = function(type, checked) { return fan.sys.List.$type.facet(type, checked); }
fan.sys.ListType.prototype.makeParams = function()
{
return fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Type.$type)
.set("V", this.v)
.set("L", this).ro();
}
fan.sys.ListType.prototype.isGenericParameter = function()
{
return this.v.isGenericParameter();
}
fan.sys.ListType.prototype.doParameterize = function(t)
{
if (t == fan.sys.Sys.VType) return this.v;
if (t == fan.sys.Sys.LType) return this;
throw new Error(t.toString());
}
fan.sys.MapType = fan.sys.Obj.$extend(fan.sys.GenericType);
fan.sys.MapType.prototype.$ctor = function(k, v)
{
this.k = k;
this.v = v;
this.m_qname  = "sys::Map";
this.m_pod    = fan.sys.Pod.find("sys");
this.m_name   = "Map";
this.m_base   = fan.sys.Map.$type;
this.m_mixins = fan.sys.Type.$type.emptyList();
this.m_slots  = {};
}
fan.sys.MapType.prototype.signature = function()
{
return "[" + this.k.signature() + ':' + this.v.signature() + ']';
}
fan.sys.MapType.prototype.equals = function(that)
{
if (that instanceof fan.sys.MapType)
return this.k.equals(that.k) && this.v.equals(that.v);
else
return false;
}
fan.sys.MapType.prototype.is = function(that)
{
if (that.isNullable()) that = that.m_root;
if (that instanceof fan.sys.MapType)
{
return this.k.is(that.k) && this.v.is(that.v);
}
if (that instanceof fan.sys.Type)
{
if (that.qname() == "sys::Map") return true;
if (that.qname() == "sys::Obj")  return true;
}
return false;
}
fan.sys.MapType.prototype.as = function(obj, that)
{
var objType = fan.sys.ObjUtil.$typeof(obj);
if (objType instanceof fan.sys.MapType && that instanceof fan.sys.MapType)
return obj;
return objType.is(that) ? obj : null;
}
fan.sys.MapType.prototype.toNullable = function()
{
if (this.m_nullable == null) this.m_nullable = new fan.sys.NullableType(this);
return this.m_nullable;
}
fan.sys.MapType.prototype.facets = function() { return fan.sys.Map.$type.facets(); }
fan.sys.MapType.prototype.facet = function(type, checked) { return fan.sys.Map.$type.facet(type, checked); }
fan.sys.MapType.prototype.makeParams = function()
{
return fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Type.$type)
.set("K", this.k)
.set("V", this.v)
.set("M", this).ro();
}
fan.sys.MapType.prototype.isGenericParameter = function()
{
return this.v.isGenericParameter() && this.k.isGenericParameter();
}
fan.sys.MapType.prototype.doParameterize = function(t)
{
if (t == fan.sys.Sys.KType) return this.k;
if (t == fan.sys.Sys.VType) return this.v;
if (t == fan.sys.Sys.MType) return this;
throw new Error(t.toString());
}
fan.sys.FuncType = fan.sys.Obj.$extend(fan.sys.GenericType);
fan.sys.FuncType.prototype.$ctor = function(params, ret)
{
this.m_pod    = fan.sys.Pod.find("sys");
this.m_name   = "Func";
this.m_qname  = "sys::Func";
this.m_base   = fan.sys.Obj.$type;
this.pars     = params;
this.ret      = ret;
this.m_mixins = fan.sys.Type.$type.emptyList();
this.genericParameterType |= ret.isGenericParameter();
for (var i=0; i<params.length; ++i)
this.genericParameterType |= params[i].isGenericParameter();
}
fan.sys.FuncType.prototype.signature = function()
{
var s = '|'
for (var i=0; i<this.pars.length; i++)
{
if (i > 0) s += ',';
s += this.pars[i].signature();
}
s += '->';
s += this.ret.signature();
s += '|';
return s;
}
fan.sys.FuncType.prototype.equals = function(that)
{
if (that instanceof fan.sys.FuncType)
{
if (this.pars.length != that.pars.length) return false;
for (var i=0; i<this.pars.length; i++)
if (!this.pars[i].equals(that.pars[i])) return false;
return this.ret.equals(that.ret);
}
return false;
}
fan.sys.FuncType.prototype.is = function(that)
{
if (this == that) return true;
if (that instanceof fan.sys.FuncType)
{
if (that.ret.m_qname != "sys::Void" && !this.ret.is(that.ret)) return false;
if (this.pars.length > that.pars.length) return false;
for (var i=0; i<this.pars.length; ++i)
if (!that.pars[i].is(this.pars[i])) return false;
return true;
}
if (that.toString() == "sys::Func") return true;
if (that.toString() == "sys::Func?") return true;
return this.base().is(that);
}
fan.sys.FuncType.prototype.as = function(that)
{
return that;
}
fan.sys.FuncType.prototype.toNullable = function()
{
if (this.m_nullable == null) this.m_nullable = new fan.sys.NullableType(this);
return this.m_nullable;
}
fan.sys.FuncType.prototype.facets = function() { return fan.sys.Func.$type.facets(); }
fan.sys.FuncType.prototype.facet = function(type, checked) { return fan.sys.Func.$type.facet(type, checked); }
fan.sys.FuncType.prototype.makeParams = function()
{
var map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Type.$type);
for (var i=0; i<this.pars.length; ++i)
map.set(String.fromCharCode(i+65), this.pars[i]);
return map.set("R", this.ret).ro();
}
fan.sys.FuncType.prototype.isGenericParameter = function() { return this.genericParameterType; }
fan.sys.FuncType.prototype.doParameterize = function(t)
{
if (t == fan.sys.Sys.RType) return ret;
var name = t.$name().charCodeAt(0) - 65;
if (name < this.pars.length) return this.pars[name];
return fan.sys.Obj.$type;
}
fan.sys.Regex = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Regex.fromStr = function(pattern, flags)
{
return new fan.sys.Regex(pattern, flags);
}
fan.sys.Regex.glob = function(pattern)
{
var s = "";
for (var i=0; i<pattern.length; ++i)
{
var c = pattern.charCodeAt(i);
if (fan.sys.Int.isAlphaNum(c)) s += String.fromCharCode(c);
else if (c == 63) s += '.';
else if (c == 42) s += '.*';
else s += '\\' + String.fromCharCode(c);
}
return new fan.sys.Regex(s);
}
fan.sys.Regex.quote = function(pattern)
{
var s = "";
for (var i=0; i<pattern.length; ++i)
{
var c = pattern.charCodeAt(i);
if (fan.sys.Int.isAlphaNum(c)) s += String.fromCharCode(c);
else s += '\\' + String.fromCharCode(c);
}
return new fan.sys.Regex(s);
}
fan.sys.Regex.prototype.$ctor = function(source, flags)
{
this.m_source = source;
this.m_flags = flags;
this.m_regexp = new RegExp(source, flags);
}
fan.sys.Regex.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.Regex)
return obj.m_source === this.m_source && obj.m_flags == this.m_flags;
else
return false;
}
fan.sys.Regex.prototype.flags = function() { return this.m_flags; }
fan.sys.Regex.prototype.hash = function() { return fan.sys.Str.hash(this.m_source); }
fan.sys.Regex.prototype.toStr = function() { return this.m_source; }
fan.sys.Regex.prototype.$typeof = function() { return fan.sys.Regex.$type; }
fan.sys.Regex.prototype.matches = function(s)
{
return this.matcher(s).matches();
}
fan.sys.Regex.prototype.matcher = function(s)
{
return new fan.sys.RegexMatcher(this.m_regexp, this.m_source, s);
}
fan.sys.Regex.prototype.split = function(s, limit)
{
if (limit === undefined) limit = 0;
if (limit === 1)
return fan.sys.List.make(fan.sys.Str.$type, [s]);
var array = [];
var re = this.m_regexp;
while (true)
{
var m = s.match(re);
if (m == null || (limit != 0 && array.length == limit -1))
{
array.push(s);
break;
}
array.push(s.substring(0, m.index));
s = s.substring(m.index + m[0].length);
}
if (limit == 0)
{
while (array[array.length-1] == "") { array.pop(); }
}
return fan.sys.List.make(fan.sys.Str.$type, array);
}
fan.sys.OutStream = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.OutStream.prototype.$ctor = function()
{
this.out = null;
this.m_charset=fan.sys.Charset.utf8();
this.m_bigEndian = true;
}
fan.sys.OutStream.make$ = function(self, out) { self.out = out; }
fan.sys.OutStream.prototype.$typeof = function() { return fan.sys.OutStream.$type; }
fan.sys.OutStream.prototype.write = function(x)
{
try
{
this.out.write(x);
return this;
}
catch (err)
{
if (this.out == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null OutStream");
else
throw err;
}
}
fan.sys.OutStream.prototype.writeBuf = function(buf, n)
{
if (n === undefined) n = buf.remaining();
try
{
this.out.writeBuf(buf, n);
return this;
}
catch (err)
{
if (this.out == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null OutStream");
else
throw err;
}
}
fan.sys.OutStream.prototype.endian = function()
{
return this.m_bigEndian ? fan.sys.Endian.m_big : fan.sys.Endian.m_little;
}
fan.sys.OutStream.prototype.endian$ = function(endian)
{
this.m_bigEndian = (endian == fan.sys.Endian.m_big);
}
fan.sys.OutStream.prototype.writeI2 = function(x)
{
if (this.m_bigEndian)
return this.write((x >>> 8) & 0xFF)
.write((x >>> 0) & 0xFF);
else
return this.write((x >>> 0) & 0xFF)
.write((x >>> 8) & 0xFF);
}
fan.sys.OutStream.prototype.writeI4 = function(x)
{
if (this.m_bigEndian)
return this.write((x >>> 24) & 0xFF)
.write((x >>> 16) & 0xFF)
.write((x >>> 8)  & 0xFF)
.write((x >>> 0)  & 0xFF);
else
return this.write((x >>> 0)  & 0xFF)
.write((x >>> 8)  & 0xFF)
.write((x >>> 16) & 0xFF)
.write((x >>> 24) & 0xFF);
}
fan.sys.OutStream.prototype.writeI8 = function(x)
{
if (this.m_bigEndian)
return this.write((x >>> 56) & 0xFF)
.write((x >>> 48) & 0xFF)
.write((x >>> 40) & 0xFF)
.write((x >>> 32) & 0xFF)
.write((x >>> 24) & 0xFF)
.write((x >>> 16) & 0xFF)
.write((x >>> 8)  & 0xFF)
.write((x >>> 0)  & 0xFF);
else
return this.write((x >>> 0)  & 0xFF)
.write((x >>> 8)  & 0xFF)
.write((x >>> 16) & 0xFF)
.write((x >>> 24) & 0xFF)
.write((x >>> 32) & 0xFF)
.write((x >>> 40) & 0xFF)
.write((x >>> 48) & 0xFF)
.write((x >>> 56) & 0xFF);
}
fan.sys.OutStream.prototype.writeF4 = function(x)
{
return this.writeI4(fan.sys.Float.bits32(x));
}
fan.sys.OutStream.prototype.writeF8 = function(x)
{
throw fan.sys.Err.make("OutStream.writeF8 not supported in JavaScript");
}
fan.sys.OutStream.prototype.writeDecimal = function(x)
{
return this.writeUtf(x.toString());
}
fan.sys.OutStream.prototype.writeBool = function(x)
{
return this.write(x ? 1 : 0);
}
fan.sys.OutStream.prototype.writeUtf = function(s)
{
var slen = s.length;
var utflen = 0;
var i = 0;
for (i=0; i<slen; ++i)
{
var c = s.charCodeAt(i);
if (c <= 0x007F)
utflen +=1;
else if (c > 0x07FF)
utflen += 3;
else
utflen += 2;
}
if (utflen > 65536) throw fan.sys.IOErr.make("String too big");
this.write((utflen >>> 8) & 0xFF);
this.write((utflen >>> 0) & 0xFF);
for (i=0; i<slen; ++i)
{
var c = s.charCodeAt(i);
if (c <= 0x007F)
{
this.write(c);
}
else if (c > 0x07FF)
{
this.write(0xE0 | ((c >> 12) & 0x0F));
this.write(0x80 | ((c >>  6) & 0x3F));
this.write(0x80 | ((c >>  0) & 0x3F));
}
else
{
this.write(0xC0 | ((c >>  6) & 0x1F));
this.write(0x80 | ((c >>  0) & 0x3F));
}
}
return this;
}
fan.sys.OutStream.prototype.charset = function() { return this.m_charset; }
fan.sys.OutStream.prototype.charset$ = function(charset) { this.m_charset = charset; }
fan.sys.OutStream.prototype.writeChar = function(c)
{
if (this.out != null)
{
this.out.writeChar(c)
return this;
}
else return this.m_charset.m_encoder.encodeOut(c, this);
}
fan.sys.OutStream.prototype.writeChars = function(s, off, len)
{
if (off === undefined) off = 0;
if (len === undefined) len = s.length-off;
var end = off+len;
for (var i=off; i<end; i++)
this.writeChar(s.charCodeAt(i));
return this;
}
fan.sys.OutStream.prototype.print = function(obj)
{
var s = obj == null ? "null" : fan.sys.ObjUtil.toStr(obj);
return this.writeChars(s, 0, s.length);
}
fan.sys.OutStream.prototype.printLine = function(obj)
{
if (obj === undefined) obj = "";
var s = obj == null ? "null" : fan.sys.ObjUtil.toStr(obj);
this.writeChars(s, 0, s.length);
return this.writeChars('\n', 0, 1);
}
fan.sys.OutStream.prototype.writeObj = function(obj, options)
{
if (options === undefined) options = null;
new fanx_ObjEncoder(this, options).writeObj(obj);
return this;
}
fan.sys.OutStream.prototype.flush = function()
{
if (this.out != null) this.out.flush();
return this;
}
fan.sys.OutStream.prototype.writeProps = function(props, close)
{
if (close === undefined) close = true;
var origCharset = this.charset();
this.charset$(fan.sys.Charset.utf8());
try
{
var keys = props.keys().sort();
var size = keys.size();
for (var i=0; i<size; ++i)
{
var key = keys.get(i);
var val = props.get(key);
this.writePropStr(key);
this.writeChar(61);
this.writePropStr(val);
this.writeChar(10);
}
return this;
}
finally
{
try { if (close) this.close(); } catch (err) { fan.sys.ObjUtil.echo(err); }
this.charset$(origCharset);
}
}
fan.sys.OutStream.prototype.writePropStr = function(s)
{
var len = s.length;
for (var i=0; i<len; ++i)
{
var ch = s.charCodeAt(i);
var peek = i+1<len ? s.charCodeAt(i+1) : -1;
switch (ch)
{
case 10: this.writeChar(92).writeChar(110); continue;
case 13: this.writeChar(92).writeChar(114); continue;
case  9: this.writeChar(92).writeChar(116); continue;
case 92: this.writeChar(92).writeChar(92); continue;
}
if ((ch < 32) || (ch == 47 && (peek == 47 || peek == 42)) || (ch == 61))
{
var nib1 = fan.sys.Int.toDigit((ch >>> 4) & 0xf, 16);
var nib2 = fan.sys.Int.toDigit((ch >>> 0) & 0xf, 16);
this.writeChar(92).writeChar(117)
.writeChar(48).writeChar(48)
.writeChar(nib1).writeChar(nib2);
continue;
}
this.writeChar(ch);
}
}
fan.sys.OutStream.prototype.writeXml = function(s, mask)
{
if (mask === undefined) mask = 0;
var escNewlines  = (mask & fan.sys.OutStream.m_xmlEscNewlines) != 0;
var escQuotes    = (mask & fan.sys.OutStream.m_xmlEscQuotes) != 0;
var escUnicode   = (mask & fan.sys.OutStream.m_xmlEscUnicode) != 0;
for (var i=0; i<s.length; ++i)
{
var ch = s.charCodeAt(i);
switch (ch)
{
case  0: case  1: case  2: case  3: case  4: case  5: case  6:
case  7: case  8: case 11: case 12:
case 14: case 15: case 16: case 17: case 18: case 19: case 20:
case 21: case 22: case 23: case 24: case 25: case 26: case 27:
case 28: case 29: case 30: case 31:
this.writeXmlEsc(ch);
break;
case 10: case 13:
if (!escNewlines)
this.writeChar(ch);
else
this.writeXmlEsc(ch);
break;
case 32:
this.writeChar(32);
break;
case 33: case 35: case 36: case 37: case 40: case 41: case 42:
case 43: case 44: case 45: case 46: case 47: case 48: case 49:
case 50: case 51: case 52: case 53: case 54: case 55: case 56:
case 57: case 58: case 59: case 61: case 63: case 64: case 65:
case 66: case 67: case 68: case 69: case 70: case 71: case 72:
case 73: case 74: case 75: case 76: case 77: case 78: case 79:
case 80: case 81: case 82: case 83: case 84: case 85: case 86:
case 87: case 88: case 89: case 90: case 91: case 92: case 93:
case 94: case 95: case 96: case 97: case 98: case 99: case 100:
case 101: case 102: case 103: case 104: case 105: case 106: case 107:
case 108: case 109: case 110: case 111: case 112: case 113: case 114:
case 115: case 116: case 117: case 118: case 119: case 120: case 121:
case 122: case 123: case 124: case 125: case 126:
this.writeChar(ch);
break;
case 60:
this.writeChar(38);
this.writeChar(108);
this.writeChar(116);
this.writeChar(59);
break;
case 62:
if (i > 0 && s.charCodeAt(i-1) != 93)
this.writeChar(62);
else
{
this.writeChar(38);
this.writeChar(103);
this.writeChar(116);
this.writeChar(59);
}
break;
case 38:
this.writeChar(38);
this.writeChar(97);
this.writeChar(109);
this.writeChar(112);
this.writeChar(59);
break;
case 34:
if (!escQuotes)
this.writeChar(34);
else
{
this.writeChar(38);
this.writeChar(113);
this.writeChar(117);
this.writeChar(111);
this.writeChar(116);
this.writeChar(59);
}
break;
case 39:
if (!escQuotes)
this.writeChar(39);
else
{
this.writeChar(38);
this.writeChar(35);
this.writeChar(51);
this.writeChar(57);
this.writeChar(59);
}
break;
default:
if (ch <= 0xf7 || !escUnicode)
this.writeChar(ch);
else
this.writeXmlEsc(ch);
}
}
return this;
}
fan.sys.OutStream.prototype.writeXmlEsc = function(ch)
{
var enc =  this.m_charset.m_encoder;
var hex = "0123456789abcdef";
this.writeChar(38);
this.writeChar(35);
this.writeChar(120);
if (ch > 0xff)
{
this.writeChar(hex.charCodeAt((ch >>> 12) & 0xf));
this.writeChar(hex.charCodeAt((ch >>> 8)  & 0xf));
}
this.writeChar(hex.charCodeAt((ch >>> 4) & 0xf));
this.writeChar(hex.charCodeAt((ch >>> 0) & 0xf));
this.writeChar(59);
}
fan.sys.OutStream.prototype.sync = function()
{
if (this.out != null) this.out.sync();
return this;
}
fan.sys.OutStream.prototype.close = function()
{
if (this.out != null) return this.out.close();
return true;
}
fan.sys.OutStream.prototype.close = function()
{
if (this.out != null) return this.out.close();
return true;
}
fan.sys.SysOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.SysOutStream.make = function(out, bufSize)
{
return new fan.sys.SysOutStream(fan.sys.SysOutStream.toBuffered(out, bufSize));
}
fan.sys.SysOutStream.toBuffered = function(out, bufSize)
{
if (bufSize == null || bufSize == 0)
return out;
else
return new java.io.BufferedOutputStream(out, bufSize);
}
fan.sys.SysOutStream.prototype.$ctor = function(out)
{
fan.sys.OutStream.prototype.$ctor.call(this);
this.out = out;
}
fan.sys.SysOutStream.prototype.$typeof = function() { return fan.sys.SysOutStream.$type; }
fan.sys.SysOutStream.prototype.w = function(v)
{
try
{
this.out.write(v);
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e).val;
}
}
fan.sys.SysOutStream.prototype.writeBuf = function(buf, n)
{
if (n === undefined) n = buf.remaining();
try
{
buf.pipeTo(this.out, n);
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysOutStream.prototype.writeChar = function(c)
{
this.m_charset.m_encoder.encodeOut(c, this);
return this;
}
fan.sys.SysOutStream.prototype.flush = function()
{
try
{
this.out.flush();
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysOutStream.prototype.close = function()
{
try
{
if (this.out != null) this.out.close();
return true;
}
catch (e)
{
return false;
}
}
fan.sys.ConsoleOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.ConsoleOutStream.prototype.$ctor = function()
{
fan.sys.OutStream.prototype.$ctor.call(this);
this.m_buf = "";
}
fan.sys.ConsoleOutStream.prototype.$typeof = function() { return fan.sys.SysOutStream.$type; }
fan.sys.ConsoleOutStream.prototype.write = function(v)
{
if (v == 10) this.flush();
else this.m_buf += String.fromCharCode(v)
}
fan.sys.ConsoleOutStream.prototype.flush = function()
{
if (this.m_buf.length > 0 && console) console.log(this.m_buf);
this.m_buf = "";
}
fan.sys.LocalFileOutStream = fan.sys.Obj.$extend(fan.sys.SysOutStream);
fan.sys.LocalFileOutStream.prototype.$ctor = function(out, fd)
{
fan.sys.SysOutStream.prototype.$ctor.call(this);
this.out = out;
this.fd = fd;
}
fan.sys.LocalFileOutStream.prototype.sync = function()
{
try
{
this.flush();
this.fd.sync();
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.LogLevel = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.LogLevel.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
}
fan.sys.LogLevel.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.LogLevel.$type, name, checked);
}
fan.sys.LogLevel.prototype.$typeof = function()
{
return fan.sys.LogLevel.$type;
}
fan.sys.Time = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Time.prototype.$ctor = function(hour, min, sec, ns)
{
if (hour < 0 || hour > 23)     throw fan.sys.ArgErr.make("hour " + hour);
if (min < 0 || min > 59)       throw fan.sys.ArgErr.make("min " + min);
if (sec < 0 || sec > 59)       throw fan.sys.ArgErr.make("sec " + sec);
if (ns < 0 || ns > 999999999)  throw fan.sys.ArgErr.make("ns " + ns);
this.m_hour = hour;
this.m_min  = min;
this.m_sec  = sec;
this.m_ns   = ns;
}
fan.sys.Time.make = function(hour, min, sec, ns)
{
if (sec === undefined) sec = 0;
if (ns === undefined)  ns = 0;
return new fan.sys.Time(hour, min, sec, ns);
}
fan.sys.Time.now = function(tz)
{
return fan.sys.DateTime.makeTicks(fan.sys.DateTime.nowTicks(), tz).time();
}
fan.sys.Time.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var num = function(x,index) { return x.charCodeAt(index) - 48; }
var hour  = num(s, 0)*10  + num(s, 1);
var min   = num(s, 3)*10  + num(s, 4);
var sec   = num(s, 6)*10  + num(s, 7);
if (s.charAt(2) != ':' || s.charAt(5) != ':')
throw new Error();
var i = 8;
var ns = 0;
var tenth = 100000000;
var len = s.length;
if (i < len && s.charAt(i) == '.')
{
++i;
while (i < len)
{
var c = s.charCodeAt(i);
if (c < 48 || c > 57) break;
ns += (c - 48) * tenth;
tenth /= 10;
++i;
}
}
if (i < s.length) throw new Error();
var instance = new fan.sys.Time(hour, min, sec, ns);
return instance;
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.makeStr("Time", s);
}
}
fan.sys.Time.prototype.equals = function(that)
{
if (that instanceof fan.sys.Time)
{
return this.m_hour.valueOf() == that.m_hour.valueOf() &&
this.m_min.valueOf() == that.m_min.valueOf() &&
this.m_sec.valueOf() == that.m_sec.valueOf() &&
this.m_ns.valueOf() == that.m_ns.valueOf();
}
return false;
}
fan.sys.Time.prototype.hash = function()
{
return (this.m_hour << 28) ^ (this.m_min << 21) ^ (this.m_sec << 14) ^ this.m_ns;
}
fan.sys.Time.prototype.compare = function(that)
{
if (this.m_hour.valueOf() == that.m_hour.valueOf())
{
if (this.m_min.valueOf() == that.m_min.valueOf())
{
if (this.m_sec.valueOf() == that.m_sec.valueOf())
{
if (this.m_ns.valueOf() == that.m_ns.valueOf()) return 0;
return this.m_ns < that.m_ns ? -1 : +1;
}
return this.m_sec < that.m_sec ? -1 : +1;
}
return this.m_min < that.m_min ? -1 : +1;
}
return this.m_hour < that.m_hour ? -1 : +1;
}
fan.sys.Time.prototype.toStr = function()
{
return this.toLocale("hh:mm:ss.FFFFFFFFF");
}
fan.sys.Time.prototype.$typeof = function()
{
return fan.sys.Time.$type;
}
fan.sys.Time.prototype.hour = function() { return this.m_hour; }
fan.sys.Time.prototype.min = function() { return this.m_min; }
fan.sys.Time.prototype.sec = function() { return this.m_sec; }
fan.sys.Time.prototype.nanoSec = function() { return this.m_ns; }
fan.sys.Time.prototype.toLocale = function(pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
if (pattern == null)
{
var pod = fan.sys.Pod.find("sys");
pattern = fan.sys.Env.cur().locale(pod, "time", "hh:mm:ss", locale);
}
return new fan.sys.DateTimeStr.makeTime(pattern, locale, this).format();
}
fan.sys.Time.fromLocale = function(s, pattern, checked)
{
if (checked === undefined) checked = true;
return fan.sys.DateTimeStr.make(pattern, null).parseTime(s, checked);
}
fan.sys.Time.prototype.toIso = function() { return this.toStr(); }
fan.sys.Time.fromIso = function(s, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Time.fromStr(s, checked);
}
fan.sys.Time.prototype.plus = function(d)  { return this.$plus(d.ticks()); }
fan.sys.Time.prototype.minus = function(d) { return this.$plus(-d.ticks()); }
fan.sys.Time.prototype.$plus = function(ticks)
{
if (ticks == 0) return this;
if (ticks > fan.sys.Duration.nsPerDay)
throw fan.sys.ArgErr.make("Duration out of range: " + fan.sys.Duration.make(ticks));
var newTicks = this.toDuration().m_ticks + ticks;
if (newTicks < 0) newTicks = fan.sys.Duration.nsPerDay + newTicks;
if (newTicks >= fan.sys.Duration.nsPerDay) newTicks %= fan.sys.Duration.nsPerDay;
return fan.sys.Time.fromDuration(fan.sys.Duration.make(newTicks));
}
fan.sys.Time.fromDuration = function(d)
{
var ticks = d.m_ticks;
if (ticks == 0) return fan.sys.Time.m_defVal;
if (ticks < 0 || ticks > fan.sys.Duration.nsPerDay )
throw fan.sys.ArgErr.make("Duration out of range: " + d);
var hour = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerHr);  ticks %= fan.sys.Duration.nsPerHr;
var min  = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerMin); ticks %= fan.sys.Duration.nsPerMin;
var sec  = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerSec); ticks %= fan.sys.Duration.nsPerSec;
var ns   = ticks;
return new fan.sys.Time(hour, min, sec, ns);
}
fan.sys.Time.prototype.toDuration = function()
{
return fan.sys.Duration.make(this.m_hour*fan.sys.Duration.nsPerHr +
this.m_min*fan.sys.Duration.nsPerMin +
this.m_sec*fan.sys.Duration.nsPerSec +
this.m_ns);
}
fan.sys.Time.prototype.toDateTime = function(d, tz)
{
return fan.sys.DateTime.makeDT(d, this, tz);
}
fan.sys.Time.prototype.toCode = function()
{
if (this.equals(fan.sys.Time.m_defVal)) return "Time.defVal";
return "Time(\"" + this.toString() + "\")";
}
fan.sys.Time.prototype.isMidnight = function()
{
return this.equals(fan.sys.Time.m_defVal);
}
fan.sys.Month = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.Month.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
this.m_localeAbbrKey = name + "Abbr";
this.m_localeFullKey = name + "Full";
}
fan.sys.Month.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.Month.$type, name, checked);
}
fan.sys.Month.prototype.increment = function()
{
var arr = fan.sys.Month.m_vals;
return arr.get((this.m_ordinal+1) % arr.size());
}
fan.sys.Month.prototype.decrement = function()
{
var arr = fan.sys.Month.m_vals;
return this.m_ordinal == 0 ? arr.get(arr.size()-1) : arr.get(this.m_ordinal-1);
}
fan.sys.Month.prototype.numDays = function(year)
{
if (fan.sys.DateTime.isLeapYear(year))
return fan.sys.DateTime.daysInMonLeap[this.m_ordinal];
else
return fan.sys.DateTime.daysInMon[this.m_ordinal];
}
fan.sys.Month.prototype.$typeof = function()
{
return fan.sys.Month.$type;
}
fan.sys.Month.prototype.toLocale = function(pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
if (pattern == null) return this.abbr(locale);
if (fan.sys.Str.isEveryChar(pattern, 77))
{
switch (pattern.length)
{
case 1: return ""+(this.m_ordinal+1);
case 2: return this.m_ordinal < 9 ? "0" + (this.m_ordinal+1) : ""+(this.m_ordinal+1);
case 3: return this.abbr(locale);
case 4: return this.full(locale);
}
}
throw fan.sys.ArgErr.make("Invalid pattern: " + pattern);
}
fan.sys.Month.prototype.localeAbbr = function() { return this.abbr(fan.sys.Locale.cur()); }
fan.sys.Month.prototype.abbr = function(locale)
{
var pod = fan.sys.Pod.find("sys");
return fan.sys.Env.cur().locale(pod, this.m_localeAbbrKey, this.$name(), locale);
}
fan.sys.Month.prototype.localeFull = function() { return this.full(fan.sys.Locale.cur()); }
fan.sys.Month.prototype.full = function(locale)
{
var pod = fan.sys.Pod.find("sys");
return fan.sys.Env.cur().locale(pod, this.m_localeFullKey, this.$name(), locale);
}
fan.sys.DateTime = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.DateTime.diffJs     = 946684800000;
fan.sys.DateTime.nsPerYear  = 365*24*60*60*1000000000;
fan.sys.DateTime.nsPerDay   = 24*60*60*1000000000;
fan.sys.DateTime.nsPerHour  = 60*60*1000000000;
fan.sys.DateTime.nsPerMin   = 60*1000000000;
fan.sys.DateTime.nsPerSec   = 1000000000;
fan.sys.DateTime.nsPerMilli = 1000000;
fan.sys.DateTime.minTicks   = -3124137600000000000;
fan.sys.DateTime.maxTicks   = 3155760000000000000;
fan.sys.DateTime.now = function(tolerance)
{
if (tolerance === undefined)
{
if (fan.sys.DateTime.toleranceDefault == null)
fan.sys.DateTime.toleranceDefault = fan.sys.Duration.makeMillis(250);
tolerance = fan.sys.DateTime.toleranceDefault;
}
var now = fan.sys.DateTime.nowTicks();
if (fan.sys.DateTime.cached == null)
fan.sys.DateTime.cached = fan.sys.DateTime.makeTicks(0, fan.sys.TimeZone.cur());
var c = fan.sys.DateTime.cached;
if (tolerance != null && now - c.m_ticks <= tolerance.m_ticks)
return c;
fan.sys.DateTime.cached = fan.sys.DateTime.makeTicks(now, fan.sys.TimeZone.cur());
return fan.sys.DateTime.cached;
}
fan.sys.DateTime.nowUtc = function(tolerance)
{
if (tolerance === undefined)
{
if (fan.sys.DateTime.toleranceDefault == null)
fan.sys.DateTime.toleranceDefault = fan.sys.Duration.makeMillis(250);
tolerance = fan.sys.DateTime.toleranceDefault;
}
var now = fan.sys.DateTime.nowTicks();
if (fan.sys.DateTime.cachedUtc == null)
fan.sys.DateTime.cachedUtc = fan.sys.DateTime.makeTicks(0, fan.sys.TimeZone.utc());
var c = fan.sys.DateTime.cachedUtc;
if (tolerance != null && now - c.m_ticks <= tolerance.m_ticks)
return c;
fan.sys.DateTime.cachedUtc = fan.sys.DateTime.makeTicks(now, fan.sys.TimeZone.utc());
return fan.sys.DateTime.cachedUtc;
}
fan.sys.DateTime.nowTicks = function()
{
return (new Date().getTime() - fan.sys.DateTime.diffJs) * fan.sys.DateTime.nsPerMilli
}
fan.sys.DateTime.boot = function()
{
return fan.sys.DateTime.m_boot;
}
fan.sys.DateTime.prototype.$ctor = function() {}
fan.sys.DateTime.make = function(year, month, day, hour, min, sec, ns, tz)
{
return fan.sys.DateTime.doMake(year, month, day, hour, min, sec, ns, undefined, tz);
}
fan.sys.DateTime.doMake = function(year, month, day, hour, min, sec, ns, knownOffset, tz)
{
if (sec === undefined) sec = 0;
if (ns  === undefined) ns = 0;
if (tz  === undefined) tz = fan.sys.TimeZone.cur();
month = month.ordinal();
if (year < 1901 || year > 2099) throw fan.sys.ArgErr.make("year " + year);
if (month < 0 || month > 11)    throw fan.sys.ArgErr.make("month " + month);
if (day < 1 || day > fan.sys.DateTime.numDaysInMonth(year, month)) throw fan.sys.ArgErr.make("day " + day);
if (hour < 0 || hour > 23)      throw fan.sys.ArgErr.make("hour " + hour);
if (min < 0 || min > 59)        throw fan.sys.ArgErr.make("min " + min);
if (sec < 0 || sec > 59)        throw fan.sys.ArgErr.make("sec " + sec);
if (ns < 0 || ns > 999999999)   throw fan.sys.ArgErr.make("ns " + ns);
var dayOfYear = fan.sys.DateTime.dayOfYear(year, month, day);
var timeInSec = hour*3600 + min*60 + sec;
var ticks = fan.sys.Int.plus(fan.sys.DateTime.yearTicks[year-1900],
fan.sys.Int.plus(dayOfYear * fan.sys.DateTime.nsPerDay,
fan.sys.Int.plus(timeInSec * fan.sys.DateTime.nsPerSec, ns)));
var rule = tz.rule(year);
var dst;
if (knownOffset == null)
{
ticks -= rule.offset * fan.sys.DateTime.nsPerSec;
var dstOffset = fan.sys.TimeZone.dstOffset(rule, year, month, day, timeInSec);
if (dstOffset != 0) ticks -= dstOffset * fan.sys.DateTime.nsPerSec;
dst = dstOffset != 0;
}
else
{
ticks -= knownOffset * fan.sys.DateTime.nsPerSec;
dst = knownOffset != rule.offset;
}
var weekday = (fan.sys.DateTime.firstWeekday(year, month) + day - 1) % 7;
var fields = 0;
fields |= ((year-1900) & 0xff) << 0;
fields |= (month & 0xf) << 8;
fields |= (day & 0x1f)  << 12;
fields |= (hour & 0x1f) << 17;
fields |= (min  & 0x3f) << 22;
fields |= (weekday & 0x7) << 28;
fields |= (dst ? 1 : 0) << 31;
var instance = new fan.sys.DateTime();
instance.m_ticks = ticks;
instance.m_ns    = ns;
instance.m_tz    = tz;
instance.m_fields   = fields;
return instance;
}
fan.sys.DateTime.makeDT = function(d, t, tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
return fan.sys.DateTime.make(
d.year(), d.month(), d.day(),
t.hour(), t.min(), t.sec(), t.nanoSec(), tz);
}
fan.sys.DateTime.makeTicks = function(ticks, tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
if (ticks < fan.sys.DateTime.minTicks || ticks >= fan.sys.DateTime.maxTicks)
throw fan.sys.ArgErr.make("Ticks out of range 1901 to 2099");
var instance = new fan.sys.DateTime();
instance.m_ticks = ticks;
instance.m_tz    = tz;
var year = fan.sys.DateTime.ticksToYear(ticks);
var rule = tz.rule(year);
ticks += rule.offset * fan.sys.DateTime.nsPerSec;
var month = 0, day = 0, dstOffset = 0;
var rem;
while (true)
{
year = fan.sys.DateTime.ticksToYear(ticks);
rem = ticks - fan.sys.DateTime.yearTicks[year-1900];
if (rem < 0) rem += fan.sys.DateTime.nsPerYear;
var dayOfYear = fan.sys.Int.div(rem, fan.sys.DateTime.nsPerDay);
rem %= fan.sys.DateTime.nsPerDay;
if (fan.sys.DateTime.isLeapYear(year))
{
month = fan.sys.DateTime.monForDayOfYearLeap[dayOfYear];
day   = fan.sys.DateTime.dayForDayOfYearLeap[dayOfYear];
}
else
{
month = fan.sys.DateTime.monForDayOfYear[dayOfYear];
day   = fan.sys.DateTime.dayForDayOfYear[dayOfYear];
}
if (dstOffset == null) { dstOffset = 0; break; }
if (dstOffset != 0)
{
if (rule.isWallTime() && fan.sys.TimeZone.dstOffset(rule, year, month, day, fan.sys.Int.div(rem, fan.sys.DateTime.nsPerSec)) == 0)
{
ticks -= dstOffset * fan.sys.DateTime.nsPerSec;
dstOffset = null;
continue;
}
break;
}
dstOffset = fan.sys.TimeZone.dstOffset(rule, year, month, day, fan.sys.Int.div(rem, fan.sys.DateTime.nsPerSec));
if (dstOffset == 0) break;
ticks += dstOffset * fan.sys.DateTime.nsPerSec;
}
var hour = fan.sys.Int.div(rem, fan.sys.DateTime.nsPerHour);  rem %= fan.sys.DateTime.nsPerHour;
var min  = fan.sys.Int.div(rem, fan.sys.DateTime.nsPerMin);   rem %= fan.sys.DateTime.nsPerMin;
var weekday = (fan.sys.DateTime.firstWeekday(year, month) + day - 1) % 7;
var rem = ticks >= 0 ? ticks : ticks - fan.sys.DateTime.yearTicks[0];
instance.m_ns = rem % fan.sys.DateTime.nsPerSec;
var fields = 0;
fields |= ((year-1900) & 0xff) << 0;
fields |= (month & 0xf) << 8;
fields |= (day & 0x1f)  << 12;
fields |= (hour & 0x1f) << 17;
fields |= (min  & 0x3f) << 22;
fields |= (weekday & 0x7) << 28;
fields |= (dstOffset != 0 ? 1 : 0) << 31;
instance.m_fields = fields;
return instance;
}
fan.sys.DateTime.fromStr = function(s, checked, iso)
{
if (checked === undefined) checked = true;
if (iso === undefined) iso = false;
try
{
var num = function(s, index) { return s.charCodeAt(index) - 48; }
var year  = num(s, 0)*1000 + num(s, 1)*100 + num(s, 2)*10 + num(s, 3);
var month = num(s, 5)*10   + num(s, 6) - 1;
var day   = num(s, 8)*10   + num(s, 9);
var hour  = num(s, 11)*10  + num(s, 12);
var min   = num(s, 14)*10  + num(s, 15);
var sec   = num(s, 17)*10  + num(s, 18);
if (s.charAt(4)  != '-' || s.charAt(7)  != '-' ||
s.charAt(10) != 'T' || s.charAt(13) != ':' ||
s.charAt(16) != ':')
throw new Error();
var i = 19;
var ns = 0;
var tenth = 100000000;
if (s.charAt(i) == '.')
{
++i;
while (true)
{
var c = s.charCodeAt(i);
if (c < 48 || c > 57) break;
ns += (c - 48) * tenth;
tenth /= 10;
++i;
}
}
var offset = 0;
var c = s.charAt(i++);
if (c != 'Z')
{
var offHour = num(s, i++)*10 + num(s, i++);
if (s.charAt(i++) != ':') throw new Error();
var offMin  = num(s, i++)*10 + num(s, i++);
offset = offHour*3600 + offMin*60;
if (c == '-') offset = -offset;
else if (c != '+') throw new Error();
}
var tz;
if (iso)
{
if (i < s.length) throw new Error();
tz = fan.sys.TimeZone.fromGmtOffset(offset);
}
else
{
if (s.charAt(i++) != ' ') throw new Error();
tz = fan.sys.TimeZone.fromStr(s.substring(i), true);
}
var instance = fan.sys.DateTime.doMake(year, fan.sys.Month.m_vals.get(month), day, hour, min, sec, ns, offset, tz);
return instance;
}
catch (err)
{
if (!checked) return null;
if (err instanceof fan.sys.ParseErr) throw err;
throw fan.sys.ParseErr.makeStr("DateTime", s);
}
}
fan.sys.DateTime.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.DateTime)
{
return this.m_ticks == obj.m_ticks;
}
return false;
}
fan.sys.DateTime.prototype.hash = function()
{
return this.m_ticks;
}
fan.sys.DateTime.prototype.compare = function(obj)
{
var that = obj.m_ticks;
if (this.m_ticks < that) return -1; return this.m_ticks  == that ? 0 : +1;
}
fan.sys.DateTime.prototype.$typeof = function()
{
return fan.sys.DateTime.$type;
}
fan.sys.DateTime.prototype.ticks = function() { return this.m_ticks; }
fan.sys.DateTime.prototype.date = function() { return fan.sys.Date.make(this.year(), this.month(), this.day()); }
fan.sys.DateTime.prototype.time = function() { return fan.sys.Time.make(this.hour(), this.min(), this.sec(), this.nanoSec()); }
fan.sys.DateTime.prototype.year = function() { return (this.m_fields & 0xff) + 1900; }
fan.sys.DateTime.prototype.month = function() { return fan.sys.Month.m_vals.get((this.m_fields >> 8) & 0xf); }
fan.sys.DateTime.prototype.day = function() { return (this.m_fields >> 12) & 0x1f; }
fan.sys.DateTime.prototype.hour = function() { return (this.m_fields >> 17) & 0x1f; }
fan.sys.DateTime.prototype.min = function() { return (this.m_fields >> 22) & 0x3f; }
fan.sys.DateTime.prototype.sec = function()
{
var rem = this.m_ticks >= 0 ? this.m_ticks : this.m_ticks - fan.sys.DateTime.yearTicks[0];
return fan.sys.Int.div((rem % fan.sys.DateTime.nsPerMin),  fan.sys.DateTime.nsPerSec);
}
fan.sys.DateTime.prototype.nanoSec = function()
{
return this.m_ns;
}
fan.sys.DateTime.prototype.weekday = function() { return fan.sys.Weekday.m_vals.get((this.m_fields >> 28) & 0x7); }
fan.sys.DateTime.prototype.tz = function() { return this.m_tz; }
fan.sys.DateTime.prototype.dst = function() { return ((this.m_fields >> 31) & 0x1) != 0; }
fan.sys.DateTime.prototype.tzAbbr = function() { return this.dst() ? this.m_tz.dstAbbr(this.year()) : this.m_tz.stdAbbr(this.year()); }
fan.sys.DateTime.prototype.dayOfYear = function() { return fan.sys.DateTime.dayOfYear(this.year(), this.month().m_ordinal, this.day())+1; }
fan.sys.DateTime.prototype.weekOfYear = function(startOfWeek)
{
if (startOfWeek === undefined) startOfWeek = fan.sys.Weekday.localeStartOfWeek();
return fan.sys.DateTime.weekOfYear(this.year(), this.month().m_ordinal, this.day(), startOfWeek);
}
fan.sys.DateTime.weekOfYear = function(year, month, day, startOfWeek)
{
var firstWeekday = fan.sys.DateTime.firstWeekday(year, 0);
var lastDayInFirstWeek = 7 - (firstWeekday - startOfWeek.m_ordinal);
if (month == 0 && day <= lastDayInFirstWeek) return 1;
var doy = fan.sys.DateTime.dayOfYear(year, month, day) + 1;
var woy = Math.floor((doy - lastDayInFirstWeek - 1) / 7);
return woy + 2;
}
fan.sys.DateTime.prototype.hoursInDay = function()
{
var year  = this.year();
var month = this.month().m_ordinal;
var day   = this.day();
var rule  = this.tz().rule(year);
if (rule.dstStart != null)
{
if (fan.sys.TimeZone.isDstDate(rule, rule.dstStart, year, month, day)) return 23;
if (fan.sys.TimeZone.isDstDate(rule, rule.dstEnd, year, month, day))   return 25;
}
return 24;
}
fan.sys.DateTime.prototype.toLocale = function(pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
if (pattern == null)
{
var pod = fan.sys.Pod.find("sys");
pattern = fan.sys.Env.cur().locale(pod, "dateTime", "D-MMM-YYYY WWW hh:mm:ss zzz", locale);
}
return fan.sys.DateTimeStr.makeDateTime(pattern, locale, this).format();
}
fan.sys.DateTime.fromLocale = function(s, pattern, tz, checked)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
if (checked === undefined) checked = true;
return fan.sys.DateTimeStr.make(pattern, null).parseDateTime(s, tz, checked);
}
fan.sys.DateTime.prototype.minusDateTime = function(time)
{
return fan.sys.Duration.make(this.m_ticks-time.m_ticks);
}
fan.sys.DateTime.prototype.plus = function(duration)
{
var d = duration.m_ticks;
if (d == 0) return this;
return fan.sys.DateTime.makeTicks(this.m_ticks+d, this.m_tz);
}
fan.sys.DateTime.prototype.minus = function(duration)
{
var d = duration.m_ticks;
if (d == 0) return this;
return fan.sys.DateTime.makeTicks(this.m_ticks-d, this.m_tz);
}
fan.sys.DateTime.prototype.toTimeZone = function(tz)
{
if (this.m_tz == tz) return this;
if (tz == fan.sys.TimeZone.m_rel || this.m_tz == fan.sys.TimeZone.m_rel)
{
return fan.sys.DateTime.make(
this.year(), this.month(), this.day(),
this.hour(), this.min(), this.sec(), this.nanoSec(), tz);
}
else
{
return fan.sys.DateTime.makeTicks(this.m_ticks, tz);
}
}
fan.sys.DateTime.prototype.toUtc = function()
{
return this.toTimeZone(fan.sys.TimeZone.m_utc);
}
fan.sys.DateTime.prototype.toRel = function()
{
return this.toTimeZone(fan.sys.TimeZone.m_rel);
}
fan.sys.DateTime.prototype.floor = function(accuracy)
{
if (this.m_ticks % accuracy.m_ticks == 0) return this;
return fan.sys.DateTime.makeTicks(this.m_ticks - (this.m_ticks % accuracy.m_ticks), this.m_tz);
}
fan.sys.DateTime.prototype.midnight = function()
{
return fan.sys.DateTime.make(this.year(), this.month(), this.day(), 0, 0, 0, 0, this.m_tz);
}
fan.sys.DateTime.prototype.isMidnight = function()
{
return this.hour() == 0 && this.min() == 0 && this.sec() == 0 && this.nanoSec() == 0;
}
fan.sys.DateTime.prototype.toStr = function()
{
return this.toLocale("YYYY-MM-DD'T'hh:mm:ss.FFFFFFFFFz zzzz");
}
fan.sys.DateTime.isLeapYear = function(year)
{
if ((year & 3) != 0) return false;
return (year % 100 != 0) || (year % 400 == 0);
}
fan.sys.DateTime.weekdayInMonth = function(year, mon, weekday, pos)
{
mon = mon.m_ordinal;
weekday = weekday.m_ordinal;
fan.sys.DateTime.checkYear(year);
if (pos == 0) throw fan.sys.ArgErr.make("Pos is zero");
var firstWeekday = fan.sys.DateTime.firstWeekday(year, mon);
var numDays = fan.sys.DateTime.numDaysInMonth(year, mon);
if (pos > 0)
{
var day = weekday - firstWeekday + 1;
if (day <= 0) day = 8 - firstWeekday + weekday;
day += (pos-1)*7;
if (day > numDays) throw fan.sys.ArgErr.make("Pos out of range " + pos);
return day;
}
else
{
var lastWeekday = (firstWeekday + numDays - 1) % 7;
var off = lastWeekday - weekday;
if (off < 0) off = 7 + off;
off -= (pos+1)*7;
var day = numDays - off;
if (day < 1) throw fan.sys.ArgErr.make("Pos out of range " + pos);
return day;
}
}
fan.sys.DateTime.dayOfYear = function(year, mon, day)
{
return fan.sys.DateTime.isLeapYear(year) ?
fan.sys.DateTime.dayOfYearForFirstOfMonLeap[mon] + day - 1 :
fan.sys.DateTime.dayOfYearForFirstOfMon[mon] + day - 1;
}
fan.sys.DateTime.numDaysInMonth = function(year, month)
{
if (month == 1 && fan.sys.DateTime.isLeapYear(year))
return 29;
else
return fan.sys.DateTime.daysInMon[month];
}
fan.sys.DateTime.ticksToYear = function(ticks)
{
var year = fan.sys.Int.div(ticks, fan.sys.DateTime.nsPerYear) + 2000;
if (fan.sys.DateTime.yearTicks[year-1900] > ticks) year--;
return year;
}
fan.sys.DateTime.firstWeekday = function(year, mon)
{
var firstDayOfYear = fan.sys.DateTime.isLeapYear(year)
? fan.sys.DateTime.dayOfYearForFirstOfMonLeap[mon]
: fan.sys.DateTime.dayOfYearForFirstOfMon[mon];
return (fan.sys.DateTime.firstWeekdayOfYear[year-1900] + firstDayOfYear) % 7;
}
fan.sys.DateTime.checkYear = function(year)
{
if (year < 1901 || year > 2099)
throw fan.sys.ArgErr.make("Year out of range " + year);
}
fan.sys.DateTime.prototype.toJava = function()
{
return (this.m_ticks / fan.sys.DateTime.nsPerMilli) + 946684800000;
}
fan.sys.DateTime.fromJava = function(millis, tz, negIsNull)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
if (negIsNull === undefined) negIsNull = true;
if (millis <= 0 && negIsNull) return null;
var ticks = (millis - 946684800000) * fan.sys.DateTime.nsPerMilli;
return fan.sys.DateTime.makeTicks(ticks, tz);
}
fan.sys.DateTime.prototype.toJs = function()
{
var ms = (this.m_ticks / fan.sys.DateTime.nsPerMilli) + 946684800000;
return new Date(ms);
}
fan.sys.DateTime.prototype.toHttpStr = function()
{
return this.toTimeZone(fan.sys.TimeZone.utc()).toLocale(
"WWW, DD MMM YYYY hh:mm:ss", fan.sys.Locale.fromStr("en")) + " GMT";
}
fan.sys.DateTime.fromHttpStr = function(s, checked)
{
if (checked === undefined) checked = true;
var oldLoc = fan.sys.Locale.cur();
var formats = ["WWW, DD MMM YYYY hh:mm:ss zzz",
"WWWW, DD-MMM-YY hh:mm:ss zzz",
"WWW MMM D hh:mm:ss YYYY",]
try
{
fan.sys.Locale.setCur(fan.sys.Locale.m_en);
var temp = s;
if (s.substring(0, 9).endsWith('  '))
temp = s.substring(0,8) + s.substring(9);
for (var i = 0; i < formats.length; ++i)
{
var dt = fan.sys.DateTime.fromLocale(temp, formats[i], fan.sys.TimeZone.utc(), false);
if (dt != null) return dt;
}
}
finally
{
fan.sys.Locale.setCur(oldLoc);
}
if (!checked) return null;
throw fan.sys.ParseErr.make("Invalid HTTP DateTime: '" + s + "'")
}
fan.sys.DateTime.prototype.toIso = function()
{
return this.toLocale("YYYY-MM-DD'T'hh:mm:ss.FFFFFFFFFz");
}
fan.sys.DateTime.fromIso = function(s, checked)
{
if (checked === undefined) checked = true;
return fan.sys.DateTime.fromStr(s, checked, true);
}
fan.sys.DateTime.prototype.toCode = function()
{
if (this.equals(fan.sys.DateTime.m_defVal)) return "DateTime.defVal";
return "DateTime(\"" + this.toString() + "\")";
}
fan.sys.DateTime.yearTicks = [];
fan.sys.DateTime.firstWeekdayOfYear = [];
fan.sys.DateTime.yearTicks[0] = -3155673600000000000;
fan.sys.DateTime.firstWeekdayOfYear[0] = 1;
for (var i=1; i<202; ++i)
{
var daysInYear = 365;
if (fan.sys.DateTime.isLeapYear(i+1900-1)) daysInYear = 366;
fan.sys.DateTime.yearTicks[i] = fan.sys.DateTime.yearTicks[i-1] + daysInYear * fan.sys.DateTime.nsPerDay;
fan.sys.DateTime.firstWeekdayOfYear[i] = (fan.sys.DateTime.firstWeekdayOfYear[i-1] + daysInYear) % 7;
}
fan.sys.DateTime.daysInMon     = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
fan.sys.DateTime.daysInMonLeap = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
fan.sys.DateTime.dayOfYearForFirstOfMon     = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
fan.sys.DateTime.dayOfYearForFirstOfMonLeap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (var i=1; i<12; ++i)
{
fan.sys.DateTime.dayOfYearForFirstOfMon[i] =
fan.sys.DateTime.dayOfYearForFirstOfMon[i-1] + fan.sys.DateTime.daysInMon[i-1];
fan.sys.DateTime.dayOfYearForFirstOfMonLeap[i] =
fan.sys.DateTime.dayOfYearForFirstOfMonLeap[i-1] + fan.sys.DateTime.daysInMonLeap[i-1];
}
fan.sys.DateTime.monForDayOfYear     = [];
fan.sys.DateTime.dayForDayOfYear     = [];
fan.sys.DateTime.monForDayOfYearLeap = [];
fan.sys.DateTime.dayForDayOfYearLeap = [];
fan.sys.DateTime.fillInDayOfYear = function(mon, days, daysInMon, len)
{
var m = 0, d = 1;
for (var i=0; i<len; ++i)
{
mon[i] = m; days[i] = d++;
if (d > daysInMon[m]) { m++; d = 1; }
}
}
fan.sys.DateTime.fillInDayOfYear(fan.sys.DateTime.monForDayOfYear, fan.sys.DateTime.dayForDayOfYear, fan.sys.DateTime.daysInMon, 365);
fan.sys.DateTime.fillInDayOfYear(fan.sys.DateTime.monForDayOfYearLeap, fan.sys.DateTime.dayForDayOfYearLeap, fan.sys.DateTime.daysInMonLeap, 366);
fan.sys.List = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.List.make = function(of, values)
{
if (of == null) throw fan.sys.NullErr();
if (values === undefined || typeof(values) == "number") values = [];
var self = new fan.sys.List();
self.m_of = of;
self.m_size = values.length;
self.m_values = values;
self.m_readonly = false;
self.m_immutable = false;
return self;
}
fan.sys.List.makeObj = function(capacity)
{
return fan.sys.List.make(fan.sys.Obj.$type);
}
fan.sys.List.prototype.$ctor = function()
{
}
fan.sys.List.prototype.$typeof = function() { return this.m_of.toListOf(); }
fan.sys.List.prototype.of = function() { return this.m_of; }
fan.sys.List.prototype.isEmpty = function() { return this.m_size == 0; }
fan.sys.List.prototype.size = function() { return this.m_size; }
fan.sys.List.prototype.size$ = function(val)
{
this.modify();
var oldSize = this.m_size;
var newSize = val;
for (var i=0; this.m_size+i<newSize; i++)
this.m_values.push(null);
this.m_size = newSize;
}
fan.sys.List.prototype.capacity = function() { return this.m_values.length; }
fan.sys.List.prototype.capacity$ = function(val)
{
this.modify();
if (val < this.m_size) throw fan.sys.ArgErr.make("capacity < size");
}
fan.sys.List.prototype.get = function(index)
{
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
return this.m_values[index];
}
fan.sys.List.prototype.getSafe = function(index, def)
{
if (def === undefined) def = null;
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) return def;
return this.m_values[index];
}
fan.sys.List.prototype.getRange = function(range)
{
var s = range.$start(this.m_size);
var e = range.$end(this.m_size);
if (e+1 < s || s < 0) throw fan.sys.IndexErr.make(range);
return fan.sys.List.make(this.m_of, this.m_values.slice(s, e+1));
}
fan.sys.List.prototype.containsSame = function(value)
{
var size = this.m_size;
var vals = this.m_values;
for (var i=0; i<size; i++)
if (value === vals[i])
return true;
return false;
}
fan.sys.List.prototype.contains = function(value)
{
return this.index(value) != null;
}
fan.sys.List.prototype.containsAll = function(list)
{
for (var i=0; i<list.size(); ++i)
if (this.index(list.get(i)) == null)
return false;
return true;
}
fan.sys.List.prototype.containsAny = function(list)
{
for (var i=0; i<list.size(); ++i)
if (this.index(list.get(i)) != null)
return true;
return false;
}
fan.sys.List.prototype.index = function(value, off)
{
if (off === undefined) off = 0;
var size = this.m_size;
var values = this.m_values;
if (size == 0) return null;
var start = off;
if (start < 0) start = size + start;
if (start >= size || start < 0) throw fan.sys.IndexErr.make(off);
if (value == null)
{
for (var i=start; i<size; ++i)
if (values[i] == null)
return i;
}
else
{
for (var i=start; i<size; ++i)
{
var obj = values[i];
if (obj != null && fan.sys.ObjUtil.equals(obj, value))
return i;
}
}
return null;
}
fan.sys.List.prototype.indexr = function(value, off)
{
if (off === undefined) off = -1;
var size = this.m_size;
var values = this.m_values;
if (size == 0) return null;
var start = off;
if (start < 0) start = size + start;
if (start >= size || start < 0) throw fan.sys.IndexErr.make(off);
if (value == null)
{
for (var i=start; i>=0; --i)
if (values[i] == null)
return i;
}
else
{
for (var i=start; i>=0; --i)
{
var obj = values[i];
if (obj != null && fan.sys.ObjUtil.equals(obj, value))
return i;
}
}
return null;
}
fan.sys.List.prototype.indexSame = function(value, off)
{
if (off === undefined) off = 0;
var size = this.m_size;
var values = this.m_values;
if (size == 0) return null;
var start = off;
if (start < 0) start = size + start;
if (start >= size || start < 0) throw fan.sys.IndexErr.make(off);
for (var i=start; i<size; i++)
if (value === values[i])
return i;
return null;
}
fan.sys.List.prototype.first = function()
{
if (this.m_size == 0) return null;
return this.m_values[0];
}
fan.sys.List.prototype.last = function()
{
if (this.m_size == 0) return null;
return this.m_values[this.m_size-1];
}
fan.sys.List.prototype.dup = function()
{
return fan.sys.List.make(this.m_of, this.m_values.slice(0));
}
fan.sys.List.prototype.hash = function()
{
var hash = 33;
var size = this.m_size;
var vals = this.m_values;
for (var i=0; i<size; ++i)
{
var obj = vals[i];
hash = (31*hash) + (obj == null ? 0 : fan.sys.ObjUtil.hash(obj));
}
return hash;
}
fan.sys.List.prototype.equals = function(that)
{
if (that instanceof fan.sys.List)
{
if (!this.m_of.equals(that.m_of)) return false;
if (this.m_size != that.m_size) return false;
for (var i=0; i<this.m_size; ++i)
if (!fan.sys.ObjUtil.equals(this.m_values[i], that.m_values[i]))
return false;
return true;
}
return false;
}
fan.sys.List.prototype.set = function(index, value)
{
this.modify();
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
this.m_values[index] = value;
return this;
}
fan.sys.List.prototype.add = function(value)
{
return this.insert$(this.m_size, value);
}
fan.sys.List.prototype.addIfNotNull = function(value)
{
return this.addNotNull(value);
}
fan.sys.List.prototype.addNotNull = function(value)
{
if (value == null) return this;
return this.add(value);
}
fan.sys.List.prototype.addAll = function(list)
{
return this.insertAll$(this.m_size, list);
}
fan.sys.List.prototype.insert = function(index, value)
{
if (index < 0) index = this.m_size + index;
if (index > this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
return this.insert$(index, value);
}
fan.sys.List.prototype.insert$ = function(i, value)
{
this.modify();
this.m_values.splice(i, 0, value);
this.m_size++;
return this;
}
fan.sys.List.prototype.insertAll = function(index, list)
{
if (index < 0) index = this.m_size + index;
if (index > this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
return this.insertAll$(index, list);
}
fan.sys.List.prototype.insertAll$ = function(i, list)
{
this.modify();
if (list.m_size == 0) return this;
var vals = list.m_values;
if (this.m_values === vals) vals = vals.slice(0);
for (var j=0; j<list.m_size; j++)
this.m_values.splice(i+j, 0, vals[j]);
this.m_size += list.m_size;
return this;
}
fan.sys.List.prototype.remove = function(value)
{
var index = this.index(value);
if (index == null) return null;
return this.removeAt(index);
}
fan.sys.List.prototype.removeSame = function(value)
{
var index = this.indexSame(value);
if (index == null) return null;
return this.removeAt(index);
}
fan.sys.List.prototype.removeAt = function(index)
{
this.modify();
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
var old = this.m_values.splice(index, 1);
this.m_size--;
return old[0];
}
fan.sys.List.prototype.removeRange = function(r)
{
this.modify();
var s = r.$start(this.m_size);
var e = r.$end(this.m_size);
var n = e - s + 1;
if (n < 0) throw fan.sys.IndexErr.make(r);
this.m_values.splice(s, n);
this.m_size -= n;
return this;
}
fan.sys.List.prototype.removeAll = function(toRemove)
{
this.modify();
for (var i=0; i<toRemove.m_size; i++)
this.remove(toRemove.get(i));
return this;
}
fan.sys.List.prototype.trim = function()
{
this.modify();
return this;
}
fan.sys.List.prototype.clear = function()
{
this.modify();
this.m_values.splice(0, this.m_size);
this.m_size = 0;
return this;
}
fan.sys.List.prototype.fill = function(value, times)
{
this.modify();
for (var i=0; i<times; i++) this.add(value);
return this;
}
fan.sys.List.prototype.peek = function()
{
if (this.m_size == 0) return null;
return this.m_values[this.m_size-1];
}
fan.sys.List.prototype.pop = function()
{
if (this.m_size == 0) return null;
return this.removeAt(-1);
}
fan.sys.List.prototype.push = function(obj)
{
return this.add(obj);
}
fan.sys.List.prototype.each = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
f.call(this.m_values[i])
}
else
{
for (var i=0; i<this.m_size; i++)
f.call(this.m_values[i], i)
}
}
fan.sys.List.prototype.eachr = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=this.m_size-1; i>=0; i--)
f.call(this.m_values[i])
}
else
{
for (var i=this.m_size-1; i>=0; i--)
f.call(this.m_values[i], i)
}
}
fan.sys.List.prototype.eachNotNull = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
if (this.m_values[i] != null)
f.call(this.m_values[i])
}
else
{
for (var i=0; i<this.m_size; i++)
if (this.m_values[i] != null)
f.call(this.m_values[i], i)
}
}
fan.sys.List.prototype.eachRange = function(r, f)
{
var s = r.$start(this.m_size);
var e = r.$end(this.m_size);
var n = e - s + 1;
if (n < 0) throw fan.sys.IndexErr.make(r);
if (f.m_params.size() == 1)
{
for (var i=s; i<=e; ++i)
f.call(this.m_values[i]);
}
else
{
for (var i=s; i<=e; ++i)
f.call(this.m_values[i], i);
}
}
fan.sys.List.prototype.eachWhile = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
{
var r = f.call(this.m_values[i]);
if (r != null) return r;
}
}
else
{
for (var i=0; i<this.m_size; ++i)
{
var r = f.call(this.m_values[i], i);
if (r != null) return r;
}
}
return null;
}
fan.sys.List.prototype.eachrWhile = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=this.m_size-1; i>=0; i--)
{
var r = f.call(this.m_values[i]);
if (r != null) return r;
}
}
else
{
for (var i=this.m_size-1; i>=0; i--)
{
var r = f.call(this.m_values[i], i);
if (r != null) return r;
}
}
return null;
}
fan.sys.List.prototype.find = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i]) == true)
return this.m_values[i];
}
else
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i], i) == true)
return this.m_values[i];
}
return null;
}
fan.sys.List.prototype.findIndex = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i]) == true)
return i;
}
else
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i], i) == true)
return i;
}
return null;
}
fan.sys.List.prototype.findAll = function(f)
{
var acc = fan.sys.List.make(this.m_of);
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i]) == true)
acc.add(this.m_values[i]);
}
else
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i], i) == true)
acc.add(this.m_values[i]);
}
return acc;
}
fan.sys.List.prototype.findType = function(t)
{
var acc = fan.sys.List.make(t);
for (var i=0; i<this.m_size; ++i)
{
var item = this.m_values[i];
if (item != null && fan.sys.ObjUtil.$typeof(item).is(t))
acc.add(item);
}
return acc;
}
fan.sys.List.prototype.findNotNull = function()
{
var acc = fan.sys.List.make(this.m_of.toNonNullable());
for (var i=0; i<this.m_size; ++i)
{
var item = this.m_values[i];
if (item != null)
acc.add(item);
}
return acc;
}
fan.sys.List.prototype.exclude = function(f)
{
var acc = fan.sys.List.make(this.m_of);
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i]) != true)
acc.add(this.m_values[i]);
}
else
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i], i) != true)
acc.add(this.m_values[i]);
}
return acc;
}
fan.sys.List.prototype.any = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i]) == true)
return true;
}
else
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i], i) == true)
return true;
}
return false;
}
fan.sys.List.prototype.all = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i]) != true)
return false;
}
else
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i], i) != true)
return false;
}
return true;
}
fan.sys.List.prototype.reduce = function(reduction, f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
reduction = f.call(reduction, this.m_values[i]);
}
else
{
for (var i=0; i<this.m_size; ++i)
reduction = f.call(reduction, this.m_values[i], i);
}
return reduction;
}
fan.sys.List.prototype.map = function(f)
{
var r = f.returns();
if (r == fan.sys.Void.$type) r = fan.sys.Obj.$type.toNullable();
var acc = fan.sys.List.make(r);
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
acc.add(f.call(this.m_values[i]));
}
else
{
for (var i=0; i<this.m_size; ++i)
acc.add(f.call(this.m_values[i], i));
}
return acc;
}
fan.sys.List.prototype.mapNotNull = function(f)
{
var r = f.returns();
if (r == fan.sys.Void.$type) r = fan.sys.Obj.$type.toNullable();
var acc = fan.sys.List.make(r.toNonNullable());
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
acc.addNotNull(f.call(this.m_values[i]));
}
else
{
for (var i=0; i<this.m_size; ++i)
acc.addNotNull(f.call(this.m_values[i], i));
}
return acc;
}
fan.sys.List.prototype.flatMap = function(f)
{
var of = f.returns().v;
if (of === undefined || of == null) of = fan.sys.Obj.$type.toNullable();
var acc = fan.sys.List.make(of);
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
acc.addAll(f.call(this.m_values[i]));
}
else
{
for (var i=0; i<this.m_size; ++i)
acc.addAll(f.call(this.m_values[i], i));
}
return acc;
}
fan.sys.List.prototype.groupBy = function(f)
{
var r = f.returns();
if (r == fan.sys.Void.$type) r = fan.sys.Obj.$type;
var acc = fan.sys.Map.make(r, this.$typeof());
return this.groupByInto(acc, f);
}
fan.sys.List.prototype.groupByInto = function(acc, f)
{
var mapValType = acc.m_type.v;
var bucketOfType = mapValType.v;
var arity1 = f.arity() == 1;
for (var i=0; i<this.m_size; ++i)
{
var val = this.m_values[i];
var key = arity1 ? f.call(val) : f.call(val, i);
var bucket = acc.get(key);
if (bucket == null)
{
bucket = fan.sys.List.make(bucketOfType, 8);
acc.set(key, bucket);
}
bucket.add(val);
}
return acc;
}
fan.sys.List.prototype.max = function(f)
{
if (f === undefined) f = null;
if (this.m_size == 0) return null;
var max = this.m_values[0];
for (var i=1; i<this.m_size; ++i)
{
var s = this.m_values[i];
if (f == null)
max = (s != null && s > max) ? s : max;
else
max = (s != null && f.call(s, max) > 0) ? s : max;
}
return max;
}
fan.sys.List.prototype.min = function(f)
{
if (f === undefined) f = null;
if (this.m_size == 0) return null;
var min = this.m_values[0];
for (var i=1; i<this.m_size; ++i)
{
var s = this.m_values[i];
if (f == null)
min = (s == null || s < min) ? s : min;
else
min = (s == null || f.call(s, min) < 0) ? s : min;
}
return min;
}
fan.sys.List.prototype.unique = function()
{
var dups = new Map();
var acc = fan.sys.List.make(this.m_of);
for (var i=0; i<this.m_size; ++i)
{
var v = this.m_values[i];
var key = v;
if (dups.get(key) === undefined)
{
dups.set(key, this);
acc.add(v);
}
}
return acc;
}
fan.sys.List.prototype.union = function(that)
{
var dups = fan.sys.Map.make(fan.sys.Obj.$type, fan.sys.Obj.$type);
var acc = fan.sys.List.make(this.m_of);
for (var i=0; i<this.m_size; ++i)
{
var v = this.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
if (dups.get(key) == null)
{
dups.set(key, this);
acc.add(v);
}
}
for (var i=0; i<that.m_size; ++i)
{
var v = that.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
if (dups.get(key) == null)
{
dups.set(key, this);
acc.add(v);
}
}
return acc;
}
fan.sys.List.prototype.intersection = function(that)
{
var dups = fan.sys.Map.make(fan.sys.Obj.$type, fan.sys.Obj.$type);
for (var i=0; i<that.m_size; ++i)
{
var v = that.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
dups.set(key, this);
}
var acc = fan.sys.List.make(this.m_of);
for (var i=0; i<this.m_size; ++i)
{
var v = this.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
if (dups.get(key) != null)
{
acc.add(v);
dups.remove(key);
}
}
return acc;
}
fan.sys.List.prototype.sort = function(f)
{
this.modify();
if (f === undefined) f = null;
if (f != null)
this.m_values.sort(function(a,b) { return f.call(a,b) });
else
this.m_values.sort(function(a,b) { return fan.sys.ObjUtil.compare(a,b,false) });
return this;
}
fan.sys.List.prototype.sortr = function(f)
{
this.modify();
if (f === undefined) f = null;
if (f != null)
this.m_values.sort(function(a,b) { return f.call(b,a) });
else
this.m_values.sort(function(a,b) { return fan.sys.ObjUtil.compare(b,a,false) });
return this;
}
fan.sys.List.prototype.binarySearch = function(key, f)
{
var c = f != null
? function(item,index) { return f.call(key,item) }
: function(item,index) { return fan.sys.ObjUtil.compare(key,item,false) };
return this.doBinaryFind(c);
}
fan.sys.List.prototype.binaryFind = function(f)
{
return this.doBinaryFind(f.m_func);
}
fan.sys.List.prototype.doBinaryFind = function(f)
{
var low = 0;
var high = this.m_size - 1;
while (low <= high)
{
var mid = Math.floor((low + high) / 2);
var cmp = f(this.m_values[mid], mid);
if (cmp > 0) low = mid + 1;
else if (cmp < 0) high = mid - 1;
else return mid;
}
return -(low + 1);
}
fan.sys.List.prototype.reverse = function()
{
this.modify();
var mid = this.m_size/2;
for (var i=0; i<mid; ++i)
{
var a = this.m_values[i];
var b = this.m_values[this.m_size-i-1];
this.m_values[i] = b;
this.m_values[this.m_size-i-1] = a;
}
return this;
}
fan.sys.List.prototype.swap = function(a, b)
{
var temp = this.get(a);
this.set(a, this.get(b));
this.set(b, temp);
return this;
}
fan.sys.List.prototype.moveTo = function(item, toIndex)
{
this.modify();
var curIndex = this.index(item);
if (curIndex == null) return this;
if (curIndex == toIndex) return this;
this.removeAt(curIndex);
if (toIndex == -1) return this.add(item);
if (toIndex < 0) ++toIndex;
return this.insert(toIndex, item);
}
fan.sys.List.prototype.flatten = function()
{
var acc = fan.sys.List.make(fan.sys.Obj.$type.toNullable());
this.doFlatten(acc);
return acc;
}
fan.sys.List.prototype.doFlatten = function(acc)
{
for (var i=0; i<this.m_size; ++i)
{
var item = this.m_values[i];
if (item instanceof fan.sys.List)
item.doFlatten(acc);
else
acc.add(item);
}
}
fan.sys.List.prototype.random = function()
{
if (this.m_size == 0) return null;
var i = Math.floor(Math.random() * 4294967296);
if (i < 0) i = -i;
return this.m_values[i % this.m_size];
}
fan.sys.List.prototype.shuffle = function()
{
this.modify();
for (var i=0; i<this.m_size; ++i)
{
var randi = Math.floor(Math.random() * (i+1));
var temp = this.m_values[i];
this.m_values[i] = this.m_values[randi];
this.m_values[randi] = temp;
}
return this;
}
fan.sys.List.prototype.join = function(sep, f)
{
if (sep === undefined) sep = "";
if (f === undefined) f = null;
if (this.m_size === 0) return "";
if (this.m_size === 1)
{
var v = this.m_values[0];
if (f != null) return f.call(v, 0);
if (v == null) return "null";
return fan.sys.ObjUtil.toStr(v);
}
var s = ""
for (var i=0; i<this.m_size; ++i)
{
if (i > 0) s += sep;
if (f == null)
s += this.m_values[i];
else
s += f.call(this.m_values[i], i);
}
return s;
}
fan.sys.List.prototype.toStr = function()
{
if (this.m_size == 0) return "[,]";
var s = "[";
for (var i=0; i<this.m_size; i++)
{
if (i > 0) s += ", ";
s += this.m_values[i];
}
s += "]";
return s;
}
fan.sys.List.prototype.toCode = function()
{
var s = '';
s += this.m_of.signature();
s += '[';
if (this.m_size == 0) s += ',';
for (var i=0; i<this.m_size; ++i)
{
if (i > 0) s += ', ';
s += fan.sys.ObjUtil.trap(this.m_values[i], "toCode", null);
}
s += ']';
return s;
}
fan.sys.List.prototype.$literalEncode = function(out)
{
out.writeList(this);
}
fan.sys.List.prototype.isRW = function()
{
return !this.m_readonly;
}
fan.sys.List.prototype.isRO = function()
{
return this.m_readonly;
}
fan.sys.List.prototype.rw = function()
{
if (!this.m_readonly) return this;
var rw = fan.sys.List.make(this.m_of, this.m_values.slice(0));
rw.m_readonly = false;
rw.m_readonlyList = this;
return rw;
}
fan.sys.List.prototype.ro = function()
{
if (this.m_readonly) return this;
if (this.m_readonlyList == null)
{
var ro = fan.sys.List.make(this.m_of, this.m_values.slice(0));
ro.m_readonly = true;
this.m_readonlyList = ro;
}
return this.m_readonlyList;
}
fan.sys.List.prototype.isImmutable = function()
{
return this.m_immutable;
}
fan.sys.List.prototype.toImmutable = function()
{
if (this.m_immutable) return this;
var temp = [];
for (var i=0; i<this.m_size; ++i)
{
var item = this.m_values[i];
if (item != null)
{
if (item instanceof fan.sys.List) item = item.toImmutable();
else if (item instanceof fan.sys.Map) item = item.toImmutable();
else if (!fan.sys.ObjUtil.isImmutable(item))
throw fan.sys.NotImmutableErr.make("Item [" + i + "] not immutable " +
fan.sys.Type.of(item));
}
temp[i] = item;
}
var ro = fan.sys.List.make(this.m_of, temp);
ro.m_readonly = true;
ro.m_immutable = true;
return ro;
}
fan.sys.List.prototype.modify = function()
{
if (this.m_readonly)
throw fan.sys.ReadonlyErr.make("List is readonly");
if (this.m_readonlyList != null)
{
this.m_readonlyList.m_values = this.m_values.slice(0);
this.m_readonlyList = null;
}
}
fan.sys.FileStore = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.FileStore.prototype.$ctor = function() {}
fan.sys.FileStore.prototype.$typeof = function() { return fan.sys.FileStore.$type; }
fan.sys.LocalFileStore = fan.sys.Obj.$extend(fan.sys.FileStore);
fan.sys.LocalFileStore.prototype.$ctor = function() {}
fan.sys.LocalFileStore.prototype.$typeof = function() { return fan.sys.LocalFileStore.$type; }
fan.sys.Dimension = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Dimension.prototype.$ctor = function()
{
this.kg  = 0;
this.m   = 0;
this.sec = 0;
this.K   = 0;
this.A   = 0;
this.mol = 0;
this.cd  = 0;
}
fan.sys.Dimension.prototype.hashCode = function()
{
return (kg << 28) ^ (m << 23) ^ (sec << 18) ^
(K << 13) ^ (A << 8) ^ (mol << 3) ^ cd;
}
fan.sys.Dimension.prototype.equals = function(o)
{
return this.kg == x.kg && this.m   == x.m   && this.sec == x.sec && this.K == x.K &&
this.A  == x.A  && this.mol == x.mol && this.cd  == x.cd;
}
fan.sys.Dimension.prototype.toString = function()
{
if (this.m_str == null)
{
var s = "";
s = this.append(s, "kg",  this.kg);  s = this.append(s, "m",   this.m);
s = this.append(s, "sec", this.sec); s = this.append(s, "K",   this.K);
s = this.append(s, "A",   this.A);   s = this.append(s, "mol", this.mol);
s = this.append(s, "cd",  this.cd);
this.m_str = s;
}
return this.m_str;
}
fan.sys.Dimension.prototype.append = function(s, key, val)
{
if (val == 0) return s;
if (s.length > 0) s += '*';
s += key + val;
return s
}
fan.sys.Unit = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Unit.prototype.$ctor = function() {}
fan.sys.Unit.prototype.$typeof = function() { return fan.sys.Unit.$type; }
fan.sys.Unit.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
var unit = fan.sys.Unit.m_units[name];
if (unit != null || !checked) return unit;
throw fan.sys.Err.make("Unit not found: " + name);
}
fan.sys.Unit.list = function()
{
var arr = fan.sys.List.make(fan.sys.Unit.$type, []);
var quantities = fan.sys.Unit.m_quantities;
for (var quantity in quantities) {
arr.addAll(fan.sys.Unit.quantity(quantity));
}
return arr;
}
fan.sys.Unit.quantities = function()
{
return fan.sys.Unit.m_quantityNames;
}
fan.sys.Unit.quantity = function(quantity)
{
var list = fan.sys.Unit.m_quantities[quantity];
if (list == null) throw fan.sys.Err.make("Unknown unit database quantity: " + quantity);
return list;
}
fan.sys.Unit.define = function(str)
{
var unit = null;
try
{
unit = fan.sys.Unit.parseUnit(str);
}
catch (e)
{
var msg = str;
if (e instanceof fan.sys.ParseErr) msg += ": " + e.m_msg;
throw fan.sys.ParseErr.makeStr("Unit", msg);
}
for (var i=0; i<unit.m_ids.size(); ++i)
{
var id = unit.m_ids.get(i);
fan.sys.Unit.m_units[id] = unit;
}
return unit;
}
fan.sys.Unit.parseUnit = function(s)
{
var idStrs = s;
var c = s.indexOf(';');
if (c > 0) idStrs = s.substring(0, c);
var ids = fan.sys.Str.split(idStrs, 44);
if (c < 0) return fan.sys.Unit.make(ids, fan.sys.Unit.m_dimensionless, fan.sys.Float.make(1), fan.sys.Float.make(0));
var dim = s = fan.sys.Str.trim(s.substring(c+1));
c = s.indexOf(';');
if (c < 0) return fan.sys.Unit.make(ids, fan.sys.Unit.parseDim(dim), fan.sys.Float.make(1), fan.sys.Float.make(0));
dim = fan.sys.Str.trim(s.substring(0, c));
var scale = s = fan.sys.Str.trim(s.substring(c+1));
c = s.indexOf(';');
if (c < 0) return fan.sys.Unit.make(ids, fan.sys.Unit.parseDim(dim), fan.sys.Float.fromStr(scale), fan.sys.Float.make(0));
scale = fan.sys.Str.trim(s.substring(0, c));
var offset = fan.sys.Str.trim(s.substring(c+1));
return fan.sys.Unit.make(ids, fan.sys.Unit.parseDim(dim), fan.sys.Float.fromStr(scale), fan.sys.Float.fromStr(offset));
}
fan.sys.Unit.parseDim = function(s)
{
if (s.length == 0) return fan.sys.Unit.m_dimensionless;
var dim = new fan.sys.Dimension();
var ratios = fan.sys.Str.split(s, 42, true);
for (var i=0; i<ratios.size(); ++i)
{
var r = ratios.get(i);
if (fan.sys.Str.startsWith(r, "kg"))  { dim.kg  = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(2))); continue; }
if (fan.sys.Str.startsWith(r, "sec")) { dim.sec = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(3))); continue; }
if (fan.sys.Str.startsWith(r, "mol")) { dim.mol = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(3))); continue; }
if (fan.sys.Str.startsWith(r, "m"))   { dim.m   = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(1))); continue; }
if (fan.sys.Str.startsWith(r, "K"))   { dim.K   = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(1))); continue; }
if (fan.sys.Str.startsWith(r, "A"))   { dim.A   = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(1))); continue; }
if (fan.sys.Str.startsWith(r, "cd"))  { dim.cd  = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(2))); continue; }
throw fan.sys.ParseErr.make("Bad ratio '" + r + "'");
}
var key = dim.toString();
var cached = fan.sys.Unit.m_dims[key];
if (cached != null) return cached;
fan.sys.Unit.m_dims[key] = dim;
return dim;
}
fan.sys.Unit.make = function(ids, dim, scale, offset)
{
var instance = new fan.sys.Unit();
instance.m_ids    = fan.sys.Unit.checkIds(ids);
instance.m_dim    = dim;
instance.m_scale  = scale;
instance.m_offset = offset;
return instance;
}
fan.sys.Unit.checkIds = function(ids)
{
if (ids.size() == 0) throw fan.sys.ParseErr.make("No unit ids defined");
for (var i=0; i<ids.size(); ++i) fan.sys.Unit.checkId(ids.get(i));
return ids.toImmutable();
}
fan.sys.Unit.checkId = function(id)
{
if (id.length == 0) throw fan.sys.ParseErr.make("Invalid unit id length 0");
for (var i=0; i<id.length; ++i)
{
var code = id.charCodeAt(i);
var ch   = id.charAt(i);
if (fan.sys.Int.isAlpha(code) || ch == '_' || ch == '%' || ch == '$' || ch == '/' || code > 128) continue;
throw fan.sys.ParseErr.make("Invalid unit id " + id + " (invalid char '" + ch + "')");
}
}
fan.sys.Unit.prototype.equals = function(obj) { return this == obj; }
fan.sys.Unit.prototype.hash = function() { return fan.sys.Str.hash(this.toStr()); }
fan.sys.Unit.prototype.$typeof = function() { return fan.sys.Unit.$type; }
fan.sys.Unit.prototype.toStr = function() { return this.m_ids.last(); }
fan.sys.Unit.prototype.ids = function() { return this.m_ids; }
fan.sys.Unit.prototype.$name = function() { return this.m_ids.first(); }
fan.sys.Unit.prototype.symbol = function() { return this.m_ids.last(); }
fan.sys.Unit.prototype.scale = function() { return this.m_scale; }
fan.sys.Unit.prototype.offset = function() { return this.m_offset; }
fan.sys.Unit.prototype.definition = function()
{
var s = "";
for (var i=0; i<this.m_ids.size(); ++i)
{
if (i > 0) s += ", ";
s += this.m_ids.get(i);
}
if (this.m_dim != fan.sys.Unit.m_dimensionless)
{
s += "; " + this.m_dim;
if (this.m_scale != 1.0 || this.m_offset != 0.0)
{
s += "; " + this.m_scale;
if (this.m_offset != 0.0) s += "; " + this.m_offset;
}
}
return s;
}
fan.sys.Unit.prototype.dim = function() { return this.m_dim.toString(); }
fan.sys.Unit.prototype.kg = function() { return this.m_dim.kg; }
fan.sys.Unit.prototype.m = function() { return this.m_dim.m; }
fan.sys.Unit.prototype.sec = function() { return this.m_dim.sec; }
fan.sys.Unit.prototype.K = function() { return this.m_dim.K; }
fan.sys.Unit.prototype.A = function() { return this.m_dim.A; }
fan.sys.Unit.prototype.mol = function() { return this.m_dim.mol; }
fan.sys.Unit.prototype.cd = function() { return this.m_dim.cd; }
fan.sys.Unit.prototype.convertTo = function(scalar, to)
{
if (this.m_dim != to.m_dim) throw fan.sys.Err.make("Incovertable units: " + this + " and " + to);
return ((scalar * this.m_scale + this.m_offset) - to.m_offset) / to.m_scale;
}
fan.sys.Unit.m_units      = {};
fan.sys.Unit.m_dims       = {};
fan.sys.Unit.m_quantities = {};
fan.sys.Unit.m_quantityNames;
fan.sys.Unit.m_dimensionless = new fan.sys.Dimension();
fan.sys.Unit.m_dims[fan.sys.Unit.m_dimensionless.toString()] =  fan.sys.Unit.m_dimensionless;
fan.sys.RegexMatcher = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.RegexMatcher.prototype.$ctor = function(regexp, source, str)
{
this.m_regexp = regexp;
this.m_source = source;
this.m_str = str + "";
this.m_match = null;
}
fan.sys.RegexMatcher.prototype.equals = function(that) { return this === that; }
fan.sys.RegexMatcher.prototype.toStr = function() { return this.m_source; }
fan.sys.RegexMatcher.prototype.$typeof = function() { return fan.sys.RegexMatcher.$type; }
fan.sys.RegexMatcher.prototype.matches = function()
{
if (!this.m_regexpForMatching)
this.m_regexpForMatching = fan.sys.RegexMatcher.recompile(this.m_regexp, true);
this.m_match = this.m_regexpForMatching.exec(this.m_str);
this.m_wasMatch = this.m_match != null && this.m_match[0].length === this.m_str.length;
return this.m_wasMatch;
}
fan.sys.RegexMatcher.prototype.find = function()
{
if (!this.m_regexpForMatching)
this.m_regexpForMatching = fan.sys.RegexMatcher.recompile(this.m_regexp, true);
this.m_match = this.m_regexpForMatching.exec(this.m_str);
this.m_wasMatch = this.m_match != null;
return this.m_wasMatch;
}
fan.sys.RegexMatcher.prototype.replaceFirst = function(replacement)
{
return this.m_str.replace(fan.sys.RegexMatcher.recompile(this.m_regexp, false), replacement);
}
fan.sys.RegexMatcher.prototype.replaceAll = function(replacement)
{
return this.m_str.replace(fan.sys.RegexMatcher.recompile(this.m_regexp, true), replacement);
}
fan.sys.RegexMatcher.prototype.groupCount = function()
{
if (!this.m_wasMatch)
return 0;
return this.m_match.length - 1;
}
fan.sys.RegexMatcher.prototype.group = function(group)
{
if (group === undefined) group = 0;
if (!this.m_wasMatch)
throw fan.sys.Err.make("No match found");
if (group < 0 || group > this.groupCount())
throw fan.sys.IndexErr.make(group);
return this.m_match[group];
}
fan.sys.RegexMatcher.prototype.start = function(group)
{
if (!this.m_wasMatch)
throw fan.sys.Err.make("No match found");
if (group === undefined) group = 0;
if (group < 0 || group > this.groupCount())
throw fan.sys.IndexErr.make(group);
if (group === 0)
return this.m_match.index;
throw fan.sys.UnsupportedErr.make("Not implemented in javascript");
}
fan.sys.RegexMatcher.prototype.end = function(group)
{
if (!this.m_wasMatch)
throw fan.sys.Err.make("No match found");
if (group === undefined) group = 0;
if (group < 0 || group > this.groupCount())
throw fan.sys.IndexErr.make(group);
if (group === 0)
return this.m_match.index + this.m_match[group].length;
throw fan.sys.UnsupportedErr.make("Not implemented in javascript");
}
fan.sys.RegexMatcher.recompile = function(regexp, global)
{
var flags = global ? "g" : "";
if (regexp.ignoreCase) flags += "i";
if (regexp.multiline)  flags += "m";
if (regexp.unicode)    flags += "u";
return new RegExp(regexp.source, flags);
}
fan.sys.Slot = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Slot.prototype.$ctor = function()
{
this.m_parent = null;
this.m_qname  = null;
this.m_name   = null;
this.m_flags  = null;
this.m_facets = null;
}
fan.sys.Slot.prototype.$typeof = function() { return fan.sys.Slot.$type; }
fan.sys.Slot.prototype.toStr = function() { return this.m_qname; }
fan.sys.Slot.prototype.$literalEncode = function(out)
{
this.m_parent.$literalEncode(out);
out.w(this.m_name);
}
fan.sys.Slot.findMethod = function(qname, checked)
{
if (checked === undefined) checked = true;
var slot = fan.sys.Slot.find(qname, checked);
if (slot instanceof fan.sys.Method || checked)
return fan.sys.ObjUtil.coerce(slot, fan.sys.Method.$type);
return null;
}
fan.sys.Slot.findField = function(qname, checked)
{
if (checked === undefined) checked = true;
var slot = fan.sys.Slot.find(qname, checked);
if (slot instanceof fan.sys.Field || checked)
return fan.sys.ObjUtil.coerce(slot, fan.sys.Field.$type);
return null;
}
fan.sys.Slot.find = function(qname, checked)
{
if (checked === undefined) checked = true;
var typeName, slotName;
try
{
var dot = qname.indexOf('.');
typeName = qname.substring(0, dot);
slotName = qname.substring(dot+1);
}
catch (e)
{
throw fan.sys.Err.make("Invalid slot qname \"" + qname + "\", use <pod>::<type>.<slot>");
}
var type = fan.sys.Type.find(typeName, checked);
if (type == null) return null;
return type.slot(slotName, checked);
}
fan.sys.Slot.findFunc = function(qname, checked)
{
if (checked === undefined) checked = true;
var m = fan.sys.Slot.find(qname, checked);
if (m == null) return null;
return m.m_func;
}
fan.sys.Slot.prototype.parent = function() { return this.m_parent; }
fan.sys.Slot.prototype.qname = function() { return this.m_qname; }
fan.sys.Slot.prototype.$name = function() { return this.m_name; }
fan.sys.Slot.prototype.isField = function() { return this instanceof fan.sys.Field; }
fan.sys.Slot.prototype.isMethod = function() { return this instanceof fan.sys.Method; }
fan.sys.Slot.prototype.isAbstract = function()  { return (this.m_flags & fan.sys.FConst.Abstract)  != 0; }
fan.sys.Slot.prototype.isConst = function()     { return (this.m_flags & fan.sys.FConst.Const)     != 0; }
fan.sys.Slot.prototype.isCtor = function()      { return (this.m_flags & fan.sys.FConst.Ctor)      != 0; }
fan.sys.Slot.prototype.isInternal = function()  { return (this.m_flags & fan.sys.FConst.Internal)  != 0; }
fan.sys.Slot.prototype.isNative = function()    { return (this.m_flags & fan.sys.FConst.Native)    != 0; }
fan.sys.Slot.prototype.isOverride = function()  { return (this.m_flags & fan.sys.FConst.Override)  != 0; }
fan.sys.Slot.prototype.isPrivate = function()   { return (this.m_flags & fan.sys.FConst.Private)   != 0; }
fan.sys.Slot.prototype.isProtected = function() { return (this.m_flags & fan.sys.FConst.Protected) != 0; }
fan.sys.Slot.prototype.isPublic = function()    { return (this.m_flags & fan.sys.FConst.Public)    != 0; }
fan.sys.Slot.prototype.isStatic = function()    { return (this.m_flags & fan.sys.FConst.Static)    != 0; }
fan.sys.Slot.prototype.isSynthetic = function() { return (this.m_flags & fan.sys.FConst.Synthetic) != 0; }
fan.sys.Slot.prototype.isVirtual = function()   { return (this.m_flags & fan.sys.FConst.Virtual)   != 0; }
fan.sys.Slot.prototype.facets = function() { return this.m_facets.list(); }
fan.sys.Slot.prototype.hasFacet = function(type) { return this.facet(type, false) != null; }
fan.sys.Slot.prototype.facet = function(type, checked)
{
if (checked === undefined) checked = true;
return this.m_facets.get(type, checked);
}
fan.sys.Slot.prototype.$$name = function(n)
{
switch (n)
{
case "char":   return "$char";
case "delete": return "$delete";
case "enum":   return "$enum";
case "export": return "$export";
case "fan":    return "$fan";
case "float":  return "$float";
case "import": return "$import";
case "in":     return "$in";
case "int":    return "$int";
case "name":   return "$name";
case "typeof": return "$typeof";
case "var":    return "$var";
case "with":   return "$with";
}
return n;
}
fan.sys.Field = fan.sys.Obj.$extend(fan.sys.Slot);
fan.sys.Field.makeSetFunc = function(map)
{
return fan.sys.Func.make(
fan.sys.List.make(fan.sys.Param.$type),
fan.sys.Void.$type,
function(obj)
{
var keys = map.keys();
for (var i=0; i<keys.size(); i++)
{
var field = keys.get(i);
var val = map.get(field);
field.set(obj, val, false);
}
});
}
fan.sys.Field.prototype.$ctor = function(parent, name, flags, type, facets)
{
this.m_parent = parent;
this.m_name   = name;
this.m_qname  = parent.qname() + "." + name;
this.m_flags  = flags;
this.m_type   = type;
this.m_$name  = this.$$name(name);
this.m_$qname = this.m_parent.m_$qname + '.m_' + this.m_$name;
this.m_getter = null;
this.m_setter = null;
this.m_facets = new fan.sys.Facets(facets);
}
fan.sys.Field.prototype.trap = function(name, args)
{
if (name == "getter") return this.m_getter;
if (name == "setter") return this.m_setter;
return fan.sys.Obj.prototype.trap.call(this, name, args);
}
fan.sys.Field.prototype.type = function() { return this.m_type; }
fan.sys.Field.prototype.get = function(instance)
{
if (this.isStatic())
{
return eval(this.m_$qname);
}
else
{
var target = instance;
if ((this.m_flags & fan.sys.FConst.Native) != 0)
target = instance.peer;
var getter = target[this.m_$name];
if (getter != null)
return getter.call(target);
else
return target["m_"+this.m_$name]
}
}
fan.sys.Field.prototype.set = function(instance, value, checkConst)
{
if (checkConst === undefined) checkConst = true;
if ((this.m_flags & fan.sys.FConst.Const) != 0)
{
if (checkConst)
throw fan.sys.ReadonlyErr.make("Cannot set const field " + this.m_qname);
else if (value != null && !fan.sys.ObjUtil.isImmutable(value))
throw fan.sys.ReadonlyErr.make("Cannot set const field " + this.m_qname + " with mutable value");
}
if ((this.m_flags & fan.sys.FConst.Static) != 0)
throw fan.sys.ReadonlyErr.make("Cannot set static field " + this.m_qname);
if (value != null && !fan.sys.ObjUtil.$typeof(value).is(this.m_type.toNonNullable()))
throw fan.sys.ArgErr.make("Wrong type for field " + this.m_qname + ": " + this.m_type + " != " + fan.sys.ObjUtil.$typeof(value));
if ((this.m_flags & fan.sys.FConst.Native) != 0)
{
var peer = instance.peer;
var setter = peer[this.m_$name + "$"];
setter.call(peer, instance, value);
}
else
{
var setter = instance[this.m_$name + "$"];
if (setter != null)
setter.call(instance, value);
else
instance["m_"+this.m_$name] = value;
}
}
fan.sys.Field.prototype.$typeof = function() { return fan.sys.Field.$type; }
fan.sys.Method = fan.sys.Obj.$extend(fan.sys.Slot);
fan.sys.Method.prototype.$ctor = function(parent, name, flags, returns, params, facets, generic)
{
if (generic === undefined) generic = null;
this.m_parent  = parent;
this.m_name    = name;
this.m_qname   = parent.qname() + "." + name;
this.m_flags   = flags;
this.m_returns = returns;
this.m_params  = params;
this.m_func    = new fan.sys.MethodFunc(this, returns);
this.m_$name   = this.$$name(name);
this.m_$qname  = this.m_parent.m_$qname + '.' + this.m_$name;
this.m_facets  = new fan.sys.Facets(facets);
this.m_mask    = (generic != null) ? 0 : fan.sys.Method.toMask(parent, returns, params);
this.m_generic = generic;
}
fan.sys.Method.GENERIC = 0x01;
fan.sys.Method.toMask = function(parent, returns, params)
{
if (parent.pod().$name() != "sys") return 0;
var p = returns.isGenericParameter() ? 1 : 0;
for (var i=0; i<params.size(); ++i)
p |= params.get(i).m_type.isGenericParameter() ? 1 : 0;
var mask = 0;
if (p != 0) mask |= fan.sys.Method.GENERIC;
return mask;
}
fan.sys.Method.prototype.invoke = function(instance, args)
{
var func = (this.isCtor() || this.isStatic())
? eval(this.m_$qname)
: instance[this.m_$name];
var vals = args==null ? [] : args.m_values;
if (func == null && instance != null)
{
qname = this.m_$qname;
if (this.m_parent.m_qname === "sys::Obj")
qname = "fan.sys.ObjUtil." + this.m_$name;
func = eval(qname);
vals.splice(0, 0, instance);
instance = null;
}
if (func == null) fan.sys.ObjUtil.echo("### Method.invoke missing: " + this.m_$qname);
return func.apply(instance, vals);
}
fan.sys.Method.prototype.$typeof = function() { return fan.sys.Method.$type; }
fan.sys.Method.prototype.returns = function() { return this.m_returns; }
fan.sys.Method.prototype.params  = function() { return this.m_params.ro(); }
fan.sys.Method.prototype.func = function() { return this.m_func; }
fan.sys.Method.prototype.isGenericMethod = function() { return (this.m_mask & fan.sys.Method.GENERIC) != 0; }
fan.sys.Method.prototype.isGenericInstance = function() { return this.m_generic != null; }
fan.sys.Method.prototype.getGenericMethod = function() { return this.m_generic; }
fan.sys.Method.prototype.callOn = function(target, args) { return this.invoke(target, args); }
fan.sys.Method.prototype.call = function()
{
var instance = null;
var args = arguments;
if (!this.isCtor() && !this.isStatic())
{
instance = args[0];
args = Array.prototype.slice.call(args).slice(1);
}
return this.invoke(instance, fan.sys.List.make(fan.sys.Obj.$type, args));
}
fan.sys.Method.prototype.callList = function(args)
{
var instance = null;
if (!this.isCtor() && !this.isStatic())
{
instance = args.get(0);
args = args.getRange(new fan.sys.Range(1, -1));
}
return this.invoke(instance, args);
}
fan.sys.Uuid = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Uuid.prototype.$ctor = function ()
{
this.m_value = "";
}
fan.sys.Uuid.make = function()
{
var uuid;
if (window.crypto === undefined)
{
uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
return v.toString(16);
});
}
else
{
uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function(c) {
return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
});
}
return fan.sys.Uuid.fromStr(uuid);
}
fan.sys.Uuid.makeStr = function(a, b, c, d, e)
{
var self = new fan.sys.Uuid();
self.m_value = fan.sys.Int.toHex(a, 8) + "-" +
fan.sys.Int.toHex(b, 4) + "-" +
fan.sys.Int.toHex(c, 4) + "-" +
fan.sys.Int.toHex(d, 4) + "-" +
fan.sys.Int.toHex(e, 12);
return self;
}
fan.sys.Uuid.makeBits = function(hi, lo)
{
throw fan.sys.UnsupportedErr.make("Uuid.makeBits not implemented in Js env");
}
fan.sys.Uuid.fromStr = function (s, checked)
{
if (checked === undefined) checked = true;
try
{
var len = s.length;
if (len != 36 ||
s.charAt(8) != '-' || s.charAt(13) != '-' || s.charAt(18) != '-' || s.charAt(23) != '-')
{
throw new Error();
}
var a = fan.sys.Int.fromStr(s.substring(0, 8), 16);
var b = fan.sys.Int.fromStr(s.substring(9, 13), 16);
var c = fan.sys.Int.fromStr(s.substring(14, 18), 16);
var d = fan.sys.Int.fromStr(s.substring(19, 23), 16);
var e = fan.sys.Int.fromStr(s.substring(24), 16);
return fan.sys.Uuid.makeStr(a, b, c, d, e);
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Uuid", s);
}
}
fan.sys.Uuid.prototype.$typeof = function () {
return fan.sys.Uuid.$type;
}
fan.sys.Uuid.prototype.bitsHi = function()
{
throw fan.sys.UnsupportedErr.make("Uuid.bitsHi not implemented in Js env");
}
fan.sys.Uuid.prototype.bitsLo = function()
{
throw fan.sys.UnsupportedErr.make("Uuid.bitsLo not implemented in Js env");
}
fan.sys.Uuid.prototype.equals = function(that)
{
if (that instanceof fan.sys.Uuid)
return this.m_value == that.m_value;
else
return false;
}
fan.sys.Uuid.prototype.hash = function()
{
return fan.sys.Str.hash(this.m_value);
}
fan.sys.Uuid.prototype.compare = function(that)
{
return fan.sys.ObjUtil.compare(this.m_value, that.m_value)
}
fan.sys.Uuid.prototype.toStr = function()
{
return this.m_value;
}
fan.sys.InStream = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.InStream.prototype.$ctor = function()
{
this.$in = null;
this.m_charset = fan.sys.Charset.utf8();
this.m_bigEndian = true;
}
fan.sys.InStream.make$ = function(self, $in) { self.$in = $in; }
fan.sys.InStream.prototype.rChar = function()
{
if (this.$in != null)
return this.$in.rChar();
else
return this.m_charset.m_encoder.decode(this);
}
fan.sys.InStream.prototype.avail = function()
{
return 0;
}
fan.sys.InStream.prototype.read = function()
{
try
{
return this.$in.read();
}
catch (err)
{
if (this.$in == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null InStream");
else
throw fan.sys.Err.make(err);
}
}
fan.sys.InStream.prototype.readBuf = function(buf, n)
{
try
{
return this.$in.readBuf(buf, n);
}
catch (err)
{
if (this.$in == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null InStream");
else
throw fan.sys.Err.make(err);
}
}
fan.sys.InStream.prototype.unread = function(n)
{
try
{
return this.$in.unread(n);
}
catch (err)
{
if (this.$in == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null InStream");
else
throw fan.sys.Err.make(err);
}
}
fan.sys.InStream.prototype.skip = function(n)
{
if (this.$in != null) return this.$in.skip(n);
for (var i=0; i<n; ++i)
if (this.read() == 0) return i;
return n;
}
fan.sys.InStream.prototype.readAllBuf = function()
{
try
{
var size = fan.sys.Int.Chunk;
var buf = fan.sys.Buf.make(size);
while (this.readBuf(buf, size) != null);
buf.flip();
return buf;
}
finally
{
try { this.close(); } catch (e) { fan.sys.ObjUtil.echo("InStream.readAllBuf: " + e); }
}
}
fan.sys.InStream.prototype.readBufFully = function(buf, n)
{
if (buf == null) buf = fan.sys.Buf.make(n);
var total = n;
var got = 0;
while (got < total)
{
var r = this.readBuf(buf, total-got);
if (r == null || r == 0) throw fan.sys.IOErr.make("Unexpected end of stream");
got += r;
}
buf.flip();
return buf;
}
fan.sys.InStream.prototype.endian = function()
{
return this.m_bigEndian ? fan.sys.Endian.m_big : fan.sys.Endian.m_little;
}
fan.sys.InStream.prototype.endian$ = function(endian)
{
this.m_bigEndian = (endian == fan.sys.Endian.m_big);
}
fan.sys.InStream.prototype.peek = function()
{
var x = this.read();
if (x != null) this.unread(x);
return x;
}
fan.sys.InStream.prototype.readU1 = function()
{
var c = this.read();
if (c == null) throw fan.sys.IOErr.make("Unexpected end of stream");
return c;
}
fan.sys.InStream.prototype.readS1 = function()
{
var c = this.read();
if (c == null) throw fan.sys.IOErr.make("Unexpected end of stream");
return c <= 0x7F ? c : (0xFFFFFF00 | c);
}
fan.sys.InStream.prototype.readU2 = function()
{
var c1 = this.read();
var c2 = this.read();
if (c1 == null || c2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if (this.m_bigEndian)
return c1 << 8 | c2;
else
return c2 << 8 | c1;
}
fan.sys.InStream.prototype.readS2 = function()
{
var c1 = this.read();
var c2 = this.read();
if (c1 == null || c2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
var c;
if (this.m_bigEndian)
c = c1 << 8 | c2;
else
c = c2 << 8 | c1;
return c <= 0x7FFF ? c : (0xFFFF0000 | c);
}
fan.sys.InStream.prototype.readU4 = function()
{
var c1 = this.read();
var c2 = this.read();
var c3 = this.read();
var c4 = this.read();
if (c1 == null || c2 == null || c3 == null || c4 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
var c;
if (this.m_bigEndian)
c = (c1 << 24) + (c2 << 16) + (c3 << 8) + c4;
else
c = (c4 << 24) + (c3 << 16) + (c2 << 8) + c1;
if (c >= 0)
return c;
else
return (c & 0x7FFFFFFF) + Math.pow(2, 31);
}
fan.sys.InStream.prototype.readS4 = function()
{
var c1 = this.read();
var c2 = this.read();
var c3 = this.read();
var c4 = this.read();
if (c1 == null || c2 == null || c3 == null || c4 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if (this.m_bigEndian)
return (c1 << 24) + (c2 << 16) + (c3 << 8) + c4;
else
return (c4 << 24) + (c3 << 16) + (c2 << 8) + c1;
}
fan.sys.InStream.prototype.readS8 = function()
{
var c1 = this.read();
var c2 = this.read();
var c3 = this.read();
var c4 = this.read();
var c5 = this.read();
var c6 = this.read();
var c7 = this.read();
var c8 = this.read();
if ((c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8) < 0) throw fan.sys.IOErr.make("Unexpected end of stream");
if (this.m_bigEndian)
return ((c1 << 56) + (c2 << 48) + (c3 << 40) + (c4 << 32) +
(c5 << 24) + (c6 << 16) + (c7 << 8) + c8);
else
return ((c8 << 56) + (c7 << 48) + (c6 << 40) + (c5 << 32) +
(c4 << 24) + (c3 << 16) + (c2 << 8) + c1);
}
fan.sys.InStream.prototype.readF4 = function()
{
return fan.sys.Float.makeBits32(this.readS4());
}
fan.sys.InStream.prototype.readF8 = function()
{
throw fan.sys.Err.make("InStream.readF8 not supported in JavaScript");
}
fan.sys.InStream.prototype.readDecimal = function()
{
var inp = this.readUtf()
return fan.sys.Decimal.fromStr(inp);
}
fan.sys.InStream.prototype.readBool = function()
{
var c = this.read();
if (c == null) throw IOErr.make("Unexpected end of stream");
return c != 0;
}
fan.sys.InStream.prototype.readUtf = function()
{
var len1 = this.read();
var len2 = this.read();
if (len1 == null || len2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
var utflen = len1 << 8 | len2;
var buf = "";
var bnum = 0;
var c1, c2, c3;
while (bnum < utflen)
{
var c1 = this.read(); bnum++;
if (c1 == null) throw IOErr.make("Unexpected end of stream");
switch (c1 >> 4) {
case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
buf += String.fromCharCode(c1);
break;
case 12: case 13:
if (bnum >= utflen) throw fan.sys.IOErr.make("UTF encoding error");
c2 = this.read(); bnum++;
if (c2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if ((c2 & 0xC0) != 0x80) throw fan.sys.IOErr.make("UTF encoding error");
buf += String.fromCharCode(((c1 & 0x1F) << 6) | (c2 & 0x3F));
break;
case 14:
if (bnum+1 >= utflen) throw fan.sys.IOErr.make("UTF encoding error");
c2 = this.read(); bnum++;
c3 = this.read(); bnum++;
if (c2 == null || c3 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if (((c2 & 0xC0) != 0x80) || ((c3 & 0xC0) != 0x80))  throw fan.sys.IOErr.make("UTF encoding error");
buf += String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0));
break;
default:
throw fan.sys.IOErr.make("UTF encoding error");
}
}
return buf;
}
fan.sys.InStream.prototype.charset = function() { return this.m_charset; }
fan.sys.InStream.prototype.charset$ = function(charset) { this.m_charset = charset; }
fan.sys.InStream.prototype.readChar = function()
{
var ch = this.rChar();
return ch < 0 ? null : ch;
}
fan.sys.InStream.prototype.unreadChar = function(c)
{
var ch = this.m_charset.m_encoder.encodeIn(c, this);
return ch < 0 ? null : ch;
}
fan.sys.InStream.prototype.peekChar = function()
{
var x = this.readChar();
if (x != null) this.unreadChar(x);
return x;
}
fan.sys.InStream.prototype.readChars = function(n)
{
if (n === undefined || n < 0) throw fan.sys.ArgErr.make("readChars n < 0: " + n);
if (n == 0) return "";
var buf = "";
for (i=n; i>0; --i)
{
var ch = this.rChar();
if (ch < 0) throw fan.sys.IOErr.make("Unexpected end of stream");
buf += String.fromCharCode(ch);
}
return buf;
}
fan.sys.InStream.prototype.readLine = function(max)
{
if (max === undefined) max = fan.sys.Int.Chunk;
var maxChars = (max != null) ? max.valueOf() : fan.sys.Int.m_maxVal;
if (maxChars <= 0) return "";
var c = this.rChar();
if (c < 0) return null;
var buf = "";
while (true)
{
if (c == 10) break;
if (c == 13)
{
c = this.rChar();
if (c >= 0 && c != 10) this.unreadChar(c);
break;
}
buf += String.fromCharCode(c);
if (buf.length >= maxChars) break;
c = this.rChar();
if (c < 0) break;
}
return buf;
}
fan.sys.InStream.prototype.readStrToken = function(max, f)
{
if (max === undefined) max = fan.sys.Int.Chunk;
var maxChars = (max != null) ? max.valueOf() : fan.sys.Int.m_maxVal;
if (maxChars <= 0) return "";
var c = this.rChar();
if (c < 0) return null;
buf = "";
while (true)
{
var terminate;
if (f == null)
terminate = fan.sys.Int.isSpace(c);
else
terminate = f.call(c);
if (terminate)
{
this.unreadChar(c);
break;
}
buf += String.fromCharCode(c);
if (buf.length >= maxChars) break;
c = this.rChar();
if (c < 0) break;
}
return buf;
}
fan.sys.InStream.prototype.readAllLines = function()
{
try
{
var list = fan.sys.List.make(fan.sys.Str.$type, []);
var line = "";
while ((line = this.readLine()) != null)
list.push(line);
return list;
}
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
}
}
fan.sys.InStream.prototype.eachLine = function(f)
{
try
{
var line;
while ((line = this.readLine()) != null)
f.call(line);
}
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
}
}
fan.sys.InStream.prototype.readAllStr = function(normalizeNewlines)
{
if (normalizeNewlines === undefined) normalizeNewlines = true;
try
{
var s = "";
var normalize = normalizeNewlines;
var last = -1;
while (true)
{
var c = this.rChar();
if (c < 0) break;
if (normalize)
{
if (c == 13) s += String.fromCharCode(10);
else if (last == 13 && c == 10) {}
else s += String.fromCharCode(c);
last = c;
}
else
{
s += String.fromCharCode(c);
}
}
return s;
}
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
}
}
fan.sys.InStream.prototype.readObj = function(options)
{
if (options === undefined) options = null;
return new fanx_ObjDecoder(this, options).readObj();
}
fan.sys.InStream.prototype.readProps = function()
{
var origCharset = this.charset();
this.charset$(fan.sys.Charset.utf8());
try
{
var props = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
var name = "";
var v = null;
var inBlockComment = 0;
var inEndOfLineComment = false;
var c =  32, last = 32;
var lineNum = 1;
while (true)
{
last = c;
c = this.rChar();
if (c < 0) break;
if (c == 10 || c == 13)
{
inEndOfLineComment = false;
if (last == 13 && c == 10) continue;
var n = fan.sys.Str.trim(name);
if (v !== null)
{
props.add(n, fan.sys.Str.trim(v));
name = "";
v = null;
}
else if (n.length > 0)
throw fan.sys.IOErr.make("Invalid name/value pair [Line " + lineNum + "]");
lineNum++;
continue;
}
if (inEndOfLineComment) continue;
if (inBlockComment > 0)
{
if (last == 47 && c == 42) inBlockComment++;
if (last == 42 && c == 47) inBlockComment--;
continue;
}
if (c == 61 && v === null)
{
v = "";
continue;
}
if (c == 35 && (last == 10 || last == 13))
{
inEndOfLineComment = true;
continue;
}
if (c == 47 && fan.sys.Int.isSpace(last))
{
var peek = this.rChar();
if (peek < 0) break;
if (peek == 47) { inEndOfLineComment = true; continue; }
if (peek == 42) { inBlockComment++; continue; }
this.unreadChar(peek);
}
if (c == 92)
{
var peek = this.rChar();
if (peek < 0) break;
else if (peek == 110) c = 10;
else if (peek == 114) c = 13;
else if (peek == 116) c = 9;
else if (peek == 92)  c = 92;
else if (peek == 13 || peek == 10)
{
lineNum++;
if (peek == 13)
{
peek = this.rChar();
if (peek != 10) this.unreadChar(peek);
}
while (true)
{
peek = this.rChar();
if (peek == 32 || peek == 9) continue;
this.unreadChar(peek);
break;
}
continue;
}
else if (peek == 117)
{
var n3 = fan.sys.InStream.hex(this.rChar());
var n2 = fan.sys.InStream.hex(this.rChar());
var n1 = fan.sys.InStream.hex(this.rChar());
var n0 = fan.sys.InStream.hex(this.rChar());
if (n3 < 0 || n2 < 0 || n1 < 0 || n0 < 0) throw fan.sys.IOErr.make("Invalid hex value for \\uxxxx [Line " +  lineNum + "]");
c = ((n3 << 12) | (n2 << 8) | (n1 << 4) | n0);
}
else throw fan.sys.IOErr.make("Invalid escape sequence [Line " + lineNum + "]");
}
if (v === null)
name += String.fromCharCode(c);
else
v += String.fromCharCode(c);
}
var n = fan.sys.Str.trim(name);
if (v !== null)
props.add(n, fan.sys.Str.trim(v));
else if (n.length > 0)
throw fan.sys.IOErr.make("Invalid name/value pair [Line " + lineNum + "]");
return props;
}
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
this.charset$(origCharset);
}
}
fan.sys.InStream.hex = function(c)
{
if (48 <= c && c <= 57) return c - 48;
if (97 <= c && c <= 102) return c - 97 + 10;
if (65 <= c && c <= 70) return c - 65 + 10;
return -1;
}
fan.sys.InStream.prototype.pipe = function(out, toPipe, close)
{
if (toPipe === undefined) toPipe = null;
if (close === undefined) close = true;
try
{
var bufSize = fan.sys.Int.Chunk;
var buf = fan.sys.Buf.make(bufSize);
var total = 0;
if (toPipe == null)
{
while (true)
{
var n = this.readBuf(buf.clear(), bufSize);
if (n == null) break;
out.writeBuf(buf.flip(), buf.remaining());
total += n;
}
}
else
{
var toPipeVal = toPipe;
while (total < toPipeVal)
{
if (toPipeVal - total < bufSize) bufSize = toPipeVal - total;
var n = this.readBuf(buf.clear(), bufSize);
if (n == null) throw fan.sys.IOErr.make("Unexpected end of stream");
out.writeBuf(buf.flip(), buf.remaining());
total += n;
}
}
return total;
}
finally
{
if (close) this.close();
}
}
fan.sys.InStream.prototype.close = function()
{
if (this.$in != null) return this.$in.close();
return true;
}
fan.sys.InStream.prototype.$typeof = function()
{
return fan.sys.InStream.$type;
}
fan.sys.InStream.make = function($in)
{
var s = new fan.sys.InStream();
s.make$($in);
return s;
}
fan.sys.InStream.makeForStr = function(s)
{
return new fan.sys.StrInStream(s);
}
fan.sys.SysInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.SysInStream.make = function(ins, bufSize)
{
if (bufSize == null || bufSize == 0)
return new fan.sys.SysInStream(ins);
else
return new fan.sys.SysInStream(new java.io.BufferedInputStream(ins, bufSize));
}
fan.sys.SysInStream.prototype.$ctor = function(ins)
{
fan.sys.InStream.prototype.$ctor.call(this);
this.m_in = ins;
}
fan.sys.SysInStream.prototype.$typeof = function() { return fan.sys.SysInStream.$type; }
fan.sys.SysInStream.prototype.read = function() { var n = this.r(); return n < 0 ? null : n; }
fan.sys.SysInStream.prototype.r = function()
{
try
{
return this.m_in.read();
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.readChar = function()
{
var c = this.rChar()
return (c < 0) ? null : c;
}
fan.sys.SysInStream.prototype.rChar = function()
{
return this.m_charset.m_encoder.decode(this);
}
fan.sys.SysInStream.prototype.readBuf = function(buf, n)
{
try
{
var read = buf.pipeFrom(this.m_in, n);
if (read < 0) return null;
return read;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.unread = function(n)
{
try
{
if (!(this.m_in instanceof java.io.PushbackInputStream))
this.m_in = new java.io.PushbackInputStream(this.m_in, 128);
this.m_in.unread(n);
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.skip = function(n)
{
try
{
var skipped = this.m_in.skip(n);
if (skipped < 0) return 0;
return skipped;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.close = function()
{
try
{
if (this.m_in != null) this.m_in.close();
return true;
}
catch (e)
{
return false;
}
}
fan.sys.File = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.File.prototype.$ctor = function() {}
fan.sys.File.prototype.$typeof = function() { return fan.sys.File.$type; }
fan.sys.File.make = function(uri, checkSlash)
{
if (checkSlash === undefined) checkSlash = true;
var f = new fan.sys.File();
f.m_uri = uri;
return f;
}
fan.sys.File.os = function(osPath)
{
return new fan.sys.File();
}
fan.sys.File.prototype.exists = function() { return true; }
fan.sys.File.prototype.uri = function() { return this.m_uri; }
fan.sys.LocalFile = fan.sys.Obj.$extend(fan.sys.File);
fan.sys.LocalFile.prototype.$ctor = function() {}
fan.sys.LocalFile.prototype.$typeof = function() { return fan.sys.LocalFile.$type; }
fan.sys.LocalFile.make = function(file)
{
var instance = new fan.sys.LocalFile();
instance.m_file = file;
instance.m_uri  = fan.sys.LocalFile.fileToUri(file, file.isDirectory(), null);
return instance;
}
fan.sys.LocalFile.makeUri = function(uri, file)
{
if (file.exists())
{
if (file.isDirectory())
{
if (!uri.isDir())
throw fan.sys.IOErr.make("Must use trailing slash for dir: " + uri);
}
else
{
if (uri.isDir())
throw fan.sys.IOErr.make("Cannot use trailing slash for file: " + uri);
}
}
var instance = new fan.sys.LocalFile();
instance.m_uri  = uri;
instance.m_file = file;
return instance;
}
fan.sys.LocalFile.fileToUri = function(file, isDir, scheme)
{
var path = fan.sys.Str.javaToJs(file.getPath());
var len = path.length;
var s = "";
if (scheme != null) s += scheme + ':';
if (len > 2 && path.charAt(1) == ':' && path.charAt(0) != '/')
s += '/';
for (var i=0; i<len; ++i)
{
var c = path.charAt(i);
switch (c)
{
case '?':
case '#':  s += '\\' + c; break;
case '\\': s += '/'; break;
default:   s += c;
}
}
if (isDir && (s.length == 0 || s.charAt(s.length-1) != '/'))
s += '/';
return fan.sys.Uri.fromStr(s);
}
fan.sys.LocalFile.uriToFile = function(uri)
{
if (uri.scheme() != null && uri.scheme() != "file")
throw fan.sys.ArgErr.make("Invalid Uri scheme for local file: " + uri);
return new java.io.File(fan.sys.LocalFile.uriToPath(uri));
}
fan.sys.LocalFile.uriToPath = function(uri)
{
var path = uri.pathStr();
var len  = path.length;
var s = null;
for (var i=0; i<len; ++i)
{
var c = path.charAt(i);
if (c == '\\')
{
if (s == null) { s = ""; s += path.substr(0, i); }
}
else if (s != null) s += c;
}
return s == null ? path : s;
}
fan.sys.LocalFile.fileNameToUriName = function(name)
{
var len = name.length;
var s = null;
for (var i=0; i<len; ++i)
{
var c = name.charAt(i);
switch (c)
{
case '?':
case '#':
if (s == null) { s = ""; s += name.substr(0,i); }
s += '\\' + c;
break;
default:
if (s != null) s += c;
}
}
return s == null ? name : s;
}
fan.sys.LocalFile.prototype.isDir = function() { return this.m_uri.isDir(); }
fan.sys.LocalFile.prototype.exists = function() { return this.m_file.exists(); }
fan.sys.LocalFile.prototype.size = function()
{
if (this.m_file.isDirectory()) return null;
return this.m_file.length();
}
fan.sys.LocalFile.prototype.osPath = function()
{
return fan.sys.Str.javaToJs(this.m_file.getPath());
}
fan.sys.LocalFile.prototype.parent = function()
{
var parent = this.m_uri.parent();
if (parent == null) return null;
return fan.sys.LocalFile.makeUri(parent, fan.sys.LocalFile.uriToFile(parent));
}
fan.sys.LocalFile.prototype.list = function()
{
var list = this.m_file.listFiles();
var len = list == null ? 0 : list.length;
var acc = fan.sys.List.make(fan.sys.File.$type, []);
for (var i=0; i<len; ++i)
{
var f = list[i];
var name = fan.sys.LocalFile.fileNameToUriName(f.getName());
acc.add(fan.sys.LocalFile.makeUri(this.m_uri.plusName(name, f.isDirectory()), f));
}
return acc;
}
fan.sys.LocalFile.prototype.plus = function(uri, checkSlash)
{
return fan.sys.File.make(this.m_uri.plus(uri), checkSlash);
}
fan.sys.LocalFile.prototype.create = function()
{
if (this.isDir())
this.createDir();
else
this.createFile();
return this;
}
fan.sys.LocalFile.prototype.createFile = function()
{
if (this.m_file.exists())
{
if (this.m_file.isDirectory())
throw fan.sys.IOErr.make("Already exists as dir: " + this.m_file);
}
var parent = this.m_file.getParentFile();
if (parent != null && !parent.exists())
{
if (!parent.mkdirs())
throw fan.sys.IOErr.make("Cannot create dir: " + parent);
}
try
{
var out = new java.io.FileOutputStream(this.m_file);
out.close();
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.LocalFile.prototype.createDir = function()
{
if (this.m_file.exists())
{
if (!this.m_file.isDirectory())
throw fan.sys.IOErr.make("Already exists as file: " + this.m_file);
}
else
{
if (!this.m_file.mkdirs())
throw fan.sys.IOErr.make("Cannot create dir: " + this.m_file);
}
}
fan.sys.LocalFile.prototype.$delete = function()
{
if (!this.exists()) return;
if (this.m_file.isDirectory())
{
var kids = this.list();
for (var i=0; i<kids.size(); ++i)
kids.get(i).$delete();
}
if (!this.m_file['delete']())
throw fan.sys.IOErr.make("Cannot delete: " + this.m_file);
}
fan.sys.LocalFile.prototype.$in = function(bufSize)
{
if (bufSize === undefined) bufSize = fan.sys.Int.Chunk;
try
{
return fan.sys.SysInStream.make(new java.io.FileInputStream(this.m_file), bufSize);
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.LocalFile.prototype.out = function(append, bufSize)
{
if (append === undefined) append = false;
if (bufSize === undefined) bufSize = fan.sys.Int.Chunk;
try
{
var parent = this.m_file.getParentFile();
if (parent != null && !parent.exists()) parent.mkdirs();
var fout = new java.io.FileOutputStream(this.m_file, append);
var bout = fan.sys.SysOutStream.toBuffered(fout, bufSize);
return new fan.sys.LocalFileOutStream(bout, fout.getFD());
}
catch (err)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.Env = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Env.cur = function()
{
if (fan.sys.Env.$cur == null) fan.sys.Env.$cur = new fan.sys.Env();
return fan.sys.Env.$cur;
}
fan.sys.Env.prototype.$ctor = function()
{
this.m_args = fan.sys.List.make(fan.sys.Str.$type).toImmutable();
this.m_index = fan.sys.Map.make(fan.sys.Str.$type, new fan.sys.ListType(fan.sys.Str.$type));
this.m_index = this.m_index.toImmutable();
this.m_vars = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type)
this.m_vars.caseInsensitive$(true);
if (typeof fan$env !== 'undefined')
{
var keys = Object.keys(fan$env);
for (var i=0; i<keys.length; i++)
{
var k = keys[i];
var v = fan$env[k]
this.m_vars.set(k, v);
}
}
this.m_vars = this.m_vars.toImmutable();
this.m_props = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Map.$type);
this.m_out = new fan.sys.SysOutStream(new fan.sys.ConsoleOutStream());
}
fan.sys.Env.$invokeMain = function(qname)
{
var dot = qname.indexOf('.');
if (dot < 0) qname += '.main';
var main = fan.sys.Slot.findMethod(qname);
if (main.isStatic()) main.call();
else main.callOn(main.parent().make());
}
fan.sys.Env.prototype.$setIndex = function(index)
{
if (index.$typeof().toStr() != "[sys::Str:sys::Str[]]") throw fan.sys.ArgErr.make("Invalid type");
this.m_index = index.toImmutable();
}
fan.sys.Env.prototype.$setVars = function(vars)
{
if (vars.$typeof().toStr() != "[sys::Str:sys::Str]") throw fan.sys.ArgErr.make("Invalid type");
if (!vars.caseInsensitive()) throw fan.sys.ArgErr.make("Map must be caseInsensitive");
this.m_vars = vars.toImmutable();
}
fan.sys.Env.noDef = "_Env_nodef_";
fan.sys.Env.localeTestMode = false;
fan.sys.Env.$nodejs = this.window !== this;
fan.sys.Env.prototype.$typeof = function() { return fan.sys.Env.$type; }
fan.sys.Env.prototype.toStr = function() { return this.$typeof().toString(); }
fan.sys.Env.prototype.runtime = function() { return "js"; }
fan.sys.Env.prototype.javaVersion = function() { return 0; }
fan.sys.Env.prototype.args = function() { return this.m_args; }
fan.sys.Env.prototype.vars = function() { return this.m_vars; }
fan.sys.Env.prototype.diagnostics = function()
{
var map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Obj.$type);
return map;
}
fan.sys.Env.prototype.out = function() { return this.m_out; }
fan.sys.Env.prototype.homeDir = function() { return this.m_homeDir; }
fan.sys.Env.prototype.workDir = function() { return this.m_workDir; }
fan.sys.Env.prototype.tempDir = function() { return this.m_tempDir; }
fan.sys.Env.prototype.index = function(key)
{
return this.m_index.get(key, fan.sys.Str.$type.emptyList());
}
fan.sys.Env.prototype.props = function(pod, uri, maxAge)
{
var key = pod.$name() + ':' + uri.toStr();
return this.$props(key);
}
fan.sys.Env.prototype.config = function(pod, key, def)
{
if (def === undefined) def = null;
return this.props(pod, fan.sys.Env.m_configProps, fan.sys.Duration.m_oneMin).get(key, def);
}
fan.sys.Env.prototype.locale = function(pod, key, def, locale)
{
if (fan.sys.Env.localeTestMode &&
key.indexOf(".browser") == -1 &&
key.indexOf(".icon") == -1 &&
key.indexOf(".accelerator") == -1 &&
pod.$name() != "sys")
return pod + "::" + key;
if (def === undefined) def = fan.sys.Env.noDef;
if (locale === undefined) locale = fan.sys.Locale.cur();
var val;
var maxAge = fan.sys.Duration.m_maxVal;
val = this.props(pod, locale.m_strProps, maxAge).get(key, null);
if (val != null) return val;
val = this.props(pod, locale.m_langProps, maxAge).get(key, null);
if (val != null) return val;
val = this.props(pod, fan.sys.Env.m_localeEnProps, maxAge).get(key, null);
if (val != null) return val;
if (def === fan.sys.Env.noDef) return pod + "::" + key;
return def;
}
fan.sys.Env.prototype.$props = function(key)
{
var map = this.m_props.get(key);
if (map == null)
{
map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type)
this.m_props.add(key, map);
}
return map;
}
fan.sys.Map = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Map.make = function(k, v)
{
var mt = null;
if (k !== undefined && v === undefined)
{
mt = k;
}
else
{
if (k === undefined) k = fan.sys.Obj.$type;
if (v === undefined) v = fan.sys.Obj.$type.toNullable();
mt = new fan.sys.MapType(k, v);
}
if (mt.k.isNullable()) throw fan.sys.ArgErr.make("map key type cannot be nullable: " + mt.k.toStr());
var self = new fan.sys.Map();
self.m_vals = [];
self.m_keys = null;
self.m_size = 0;
self.m_readonly = false;
self.m_immutable = false;
self.m_type = mt;
self.m_def = null;
return self;
}
fan.sys.Map.prototype.$ctor = function() {}
fan.sys.Map.prototype.$typeof = function() { return this.m_type; }
fan.sys.Map.prototype.isEmpty = function() { return this.m_size == 0; }
fan.sys.Map.prototype.size = function() { return this.m_size; }
fan.sys.Map.prototype.get = function(key, defVal)
{
var val = this.$get(key);
if (val === undefined)
{
val = defVal;
if (val === undefined) val = this.m_def;
}
return val;
}
fan.sys.Map.prototype.getChecked = function(key, checked)
{
if (checked === undefined) checked = true;
var val = this.$get(key);
if (val === undefined)
{
if (checked) throw fan.sys.UnknownKeyErr.make("" + key);
return null;
}
return val;
}
fan.sys.Map.prototype.getOrThrow = function(key)
{
var val = this.$get(key);
if (val === undefined)
throw fan.sys.UnknownKeyErr.make("" + key);
return val;
}
fan.sys.Map.prototype.containsKey = function(key)
{
return this.$get(key) !== undefined;
}
fan.sys.Map.prototype.keys = function()
{
var array = [];
this.$each(function(b) { array.push(b.key); });
return fan.sys.List.make(this.m_type.k, array);
}
fan.sys.Map.prototype.vals = function()
{
var array = [];
this.$each(function(b) { array.push(b.val); });
return fan.sys.List.make(this.m_type.v, array);
}
fan.sys.Map.prototype.set = function(key, val)
{
this.modify();
if (key == null)
throw fan.sys.NullErr.make("key is null");
if (!fan.sys.ObjUtil.isImmutable(key))
throw fan.sys.NotImmutableErr.make("key is not immutable: " + fan.sys.ObjUtil.$typeof(key));
this.$set(key, val);
return this;
}
fan.sys.Map.prototype.add = function(key, val)
{
this.modify();
if (key == null)
throw fan.sys.NullErr.make("key is null");
if (!fan.sys.ObjUtil.isImmutable(key))
throw fan.sys.NotImmutableErr.make("key is not immutable: " + fan.sys.ObjUtil.$typeof(key));
this.$set(key, val, true);
return this;
}
fan.sys.Map.prototype.addIfNotNull = function(key, val)
{
return this.addNotNull(key, val);
}
fan.sys.Map.prototype.addNotNull = function(key, val)
{
if (val == null) return this;
return this.add(key, val);
}
fan.sys.Map.prototype.getOrAdd = function(key, valFunc)
{
var val = this.$get(key);
if (val !== undefined) return val;
val = valFunc.call(key);
this.add(key, val);
return val;
}
fan.sys.Map.prototype.setAll = function(m)
{
this.modify();
var keys = m.keys();
var len = keys.size();
for (var i=0; i<len; i++)
{
var key = keys.get(i);
this.set(key, m.get(key));
}
return this;
}
fan.sys.Map.prototype.addAll = function(m)
{
this.modify();
var keys = m.keys();
var len = keys.size();
for (var i=0; i<len; i++)
{
var key = keys.get(i);
this.add(key, m.get(key));
}
return this;
}
fan.sys.Map.prototype.setList = function(list, f)
{
this.modify();
if (f === undefined) f = null;
if (f == null)
{
for (var i=0; i<list.size(); ++i)
this.set(list.get(i), list.get(i));
}
else if (f.m_params.size() == 1)
{
for (var i=0; i<list.size(); ++i)
this.set(f.call(list.get(i)), list.get(i));
}
else
{
for (var i=0; i<list.size(); ++i)
this.set(f.call(list.get(i), i), list.get(i));
}
return this;
}
fan.sys.Map.prototype.addList = function(list, f)
{
this.modify();
if (f === undefined) f = null;
if (f == null)
{
for (var i=0; i<list.size(); ++i)
this.add(list.get(i), list.get(i));
}
else if (f.m_params.size() == 1)
{
for (var i=0; i<list.size(); ++i)
this.add(f.call(list.get(i)), list.get(i));
}
else
{
for (var i=0; i<list.size(); ++i)
this.add(f.call(list.get(i), i), list.get(i));
}
return this;
}
fan.sys.Map.prototype.remove = function(key)
{
this.modify();
return this.$remove(key);
}
fan.sys.Map.prototype.dup = function()
{
var dup = fan.sys.Map.make(this.m_type.k, this.m_type.v);
if (this.m_ordered) dup.ordered$(true);
if (this.m_caseInsensitive) dup.caseInsensitive$(true);
dup.m_def = this.m_def;
this.$each(function(b) { dup.set(b.key, b.val); });
return dup;
}
fan.sys.Map.prototype.clear = function()
{
this.modify();
if (this.m_ordered) this.m_keys = [];
this.m_vals = [];
this.m_size = 0;
return this;
}
fan.sys.Map.prototype.m_caseInsensitive = false;
fan.sys.Map.prototype.caseInsensitive = function() { return this.m_caseInsensitive; }
fan.sys.Map.prototype.caseInsensitive$ = function(val)
{
this.modify();
if (this.m_type.k != fan.sys.Str.$type)
throw fan.sys.UnsupportedErr.make("Map not keyed by Str: " + this.m_type);
if (this.m_size != 0)
throw fan.sys.UnsupportedErr.make("Map not empty");
if (val && this.ordered())
throw fan.sys.UnsupportedErr.make("Map cannot be caseInsensitive and ordered");
this.m_caseInsensitive = val;
}
fan.sys.Map.prototype.m_ordered = false;
fan.sys.Map.prototype.ordered = function() { return this.m_ordered; }
fan.sys.Map.prototype.ordered$ = function(val)
{
this.modify();
if (this.m_size != 0)
throw fan.sys.UnsupportedErr.make("Map not empty");
if (val && this.caseInsensitive())
throw fan.sys.UnsupportedErr.make("Map cannot be caseInsensitive and ordered");
this.m_ordered = val;
this.m_keys = [];
}
fan.sys.Map.prototype.def = function() { return this.m_def; }
fan.sys.Map.prototype.def$ = function(val)
{
this.modify();
if (val != null && !fan.sys.ObjUtil.isImmutable(val))
throw fan.sys.NotImmutableErr.make("def must be immutable: " + fan.sys.ObjUtil.$typeof(val));
this.m_def = val;
}
fan.sys.Map.prototype.equals = function(that)
{
if (that != null)
{
if (!this.m_type.equals(that.m_type)) return false;
if (this.m_size != that.m_size) return false;
var eq = true;
this.$each(function(b)
{
eq = fan.sys.ObjUtil.equals(b.val, that.get(b.key));
return eq;
});
return eq;
}
return false;
}
fan.sys.Map.prototype.hash = function()
{
return 0;
}
fan.sys.Map.prototype.toStr = function()
{
if (this.m_size == 0) return "[:]";
var s = "";
this.$each(function(b)
{
if (s.length > 0) s += ", ";
s += b.key + ":" + b.val;
});
return "[" + s + "]";
}
fan.sys.Map.prototype.$literalEncode = function(out)
{
out.writeMap(this);
}
fan.sys.Map.prototype.each = function(f)
{
this.$each(function(b) { f.call(b.val, b.key); });
}
fan.sys.Map.prototype.eachWhile = function(f)
{
var result = null;
this.$each(function(b)
{
var r = f.call(b.val, b.key);
if (r != null) { result=r; return false; }
});
return result;
}
fan.sys.Map.prototype.find = function(f)
{
var result = null;
this.$each(function(b)
{
if (f.call(b.val, b.key))
{
result = b.val;
return false;
}
});
return result;
}
fan.sys.Map.prototype.findAll = function(f)
{
var acc = fan.sys.Map.make(this.m_type.k, this.m_type.v);
if (this.m_ordered) acc.ordered$(true);
if (this.m_caseInsensitive) acc.caseInsensitive$(true);
this.$each(function(b)
{
if (f.call(b.val, b.key))
acc.set(b.key, b.val);
});
return acc;
}
fan.sys.Map.prototype.findNotNull = function()
{
var acc = fan.sys.Map.make(this.m_type.k, this.m_type.v.toNonNullable());
if (this.m_ordered) acc.ordered$(true);
if (this.m_caseInsensitive) acc.caseInsensitive$(true);
this.$each(function(b)
{
if (b.val != null)
acc.set(b.key, b.val);
});
return acc;
}
fan.sys.Map.prototype.exclude = function(f)
{
var acc = fan.sys.Map.make(this.m_type.k, this.m_type.v);
if (this.m_ordered) acc.ordered$(true);
if (this.m_caseInsensitive) acc.caseInsensitive$(true);
this.$each(function(b)
{
if (!f.call(b.val, b.key))
acc.set(b.key, b.val);
});
return acc;
}
fan.sys.Map.prototype.any = function(f)
{
if (this.m_size == 0) return false;
var any = false;
this.$each(function(b)
{
if (f.call(b.val, b.key))
{
any = true;
return false;
}
});
return any;
}
fan.sys.Map.prototype.all = function(f)
{
if (this.m_size == 0) return true;
var all = true;
this.$each(function(b)
{
if (!f.call(b.val, b.key))
{
all = false
return false;
}
});
return all;
}
fan.sys.Map.prototype.reduce = function(reduction, f)
{
this.$each(function(b) { reduction = f.call(reduction, b.val, b.key); });
return reduction;
}
fan.sys.Map.prototype.map = function(f)
{
var r = f.returns();
if (r == fan.sys.Void.$type) r = fan.sys.Obj.$type.toNullable();
var acc = fan.sys.Map.make(this.m_type.k, r);
if (this.m_ordered) acc.ordered$(true);
if (this.m_caseInsensitive) acc.caseInsensitive$(true);
this.$each(function(b) { acc.add(b.key, f.call(b.val, b.key)); });
return acc;
}
fan.sys.Map.prototype.mapNotNull = function(f)
{
var r = f.returns();
if (r == fan.sys.Void.$type) r = fan.sys.Obj.$type;
var acc = fan.sys.Map.make(this.m_type.k, r.toNonNullable());
if (this.m_ordered) acc.ordered$(true);
if (this.m_caseInsensitive) acc.caseInsensitive$(true);
this.$each(function(b) { acc.addNotNull(b.key, f.call(b.val, b.key)); });
return acc;
}
fan.sys.Map.prototype.join = function(sep, f)
{
if (f === undefined) f = null;
if (this.m_size == 0) return "";
var s = "";
this.$each(function(b)
{
if (s.length > 0) s += sep;
if (f == null)
s += b.key + ": " + b.val;
else
s += f.call(b.val, b.key);
});
return s;
}
fan.sys.Map.prototype.toCode = function()
{
var size = this.m_size;
var s = '';
s += this.m_type.signature();
s += '[';
if (size == 0) s += ':';
var first = true;
this.$each(function(b)
{
if (first) first = false;
else s += ', ';
s += fan.sys.ObjUtil.trap(b.key, "toCode", null)
+ ':'
+ fan.sys.ObjUtil.trap(b.val, "toCode", null);
});
s += ']';
return s;
}
fan.sys.Map.prototype.isRW = function() { return !this.m_readonly; }
fan.sys.Map.prototype.isRO = function() { return this.m_readonly; }
fan.sys.Map.prototype.rw = function()
{
if (!this.m_readonly) return this;
var rw = this.dup();
rw.m_readonly = false;
return rw;
}
fan.sys.Map.prototype.ro = function()
{
if (this.m_readonly) return this;
var ro = this.dup();
ro.m_readonly = true;
return ro;
}
fan.sys.Map.prototype.isImmutable = function() { return this.m_immutable; }
fan.sys.Map.prototype.toImmutable = function()
{
if (this.m_immutable) return this;
var ro = fan.sys.Map.make(this.m_type.k, this.m_type.v);
if (this.m_ordered) ro.ordered$(true);
if (this.m_caseInsensitive) ro.caseInsensitive$(true);
this.$each(function(b)
{
ro.set(b.key, fan.sys.ObjUtil.toImmutable(b.val));
});
ro.m_readonly = true;
ro.m_immutable = true;
ro.m_def = this.m_def;
return ro;
}
fan.sys.Map.prototype.modify = function()
{
if (this.m_readonly)
throw fan.sys.ReadonlyErr.make("Map is readonly");
}
fan.sys.Map.fromLiteral = function(keys, vals, k, v)
{
var map = fan.sys.Map.make(k,v);
for (var i=0; i<keys.length; i++)
map.set(keys[i], vals[i]);
return map;
}
fan.sys.Map.prototype.hashKey = function(key)
{
if (this.m_caseInsensitive) key = fan.sys.Str.lower(key);
return fan.sys.ObjUtil.hash(key);
}
fan.sys.Map.prototype.keysEqual = function(a, b)
{
return (this.m_caseInsensitive)
? fan.sys.Str.equalsIgnoreCase(a, b)
: fan.sys.ObjUtil.equals(a, b);
}
fan.sys.Map.prototype.$get = function(key, val)
{
var b = this.m_vals[this.hashKey(key)];
while (b !== undefined)
{
if (this.keysEqual(b.key, key)) return b.val;
b = b.next;
}
return undefined;
}
fan.sys.Map.prototype.$set = function(key, val, add)
{
var n = { key:key, val:val };
var h = this.hashKey(key);
var b = this.m_vals[h];
if (b === undefined)
{
if (this.m_ordered)
{
n.ki = this.m_keys.length;
this.m_keys.push(key);
}
this.m_vals[h] = n;
this.m_size++;
return
}
while (true)
{
if (this.keysEqual(b.key, key))
{
if (add) throw fan.sys.ArgErr.make("Key already mapped: " + key);
b.val = val;
return;
}
if (b.next === undefined)
{
if (this.m_ordered)
{
n.ki = this.m_keys.length;
this.m_keys.push(key);
}
b.next = n;
this.m_size++;
return;
}
b = b.next;
}
}
fan.sys.Map.prototype.$remove = function(key)
{
var h = this.hashKey(key);
var b = this.m_vals[h];
if (b === undefined) return null;
if (b.next === undefined)
{
if (this.m_ordered) this.m_keys[b.ki] = undefined;
this.m_vals[h] = undefined;
this.m_size--;
var v = b.val;
delete b;
return v;
}
var prev = undefined;
while (b !== undefined)
{
if (this.keysEqual(b.key, key))
{
if (prev !== undefined && b.next !== undefined) prev.next = b.next;
else if (prev === undefined) this.m_vals[h] = b.next;
else if (b.next === undefined) prev.next = undefined;
if (this.m_ordered) this.m_keys[b.ki] = undefined;
this.m_size--;
var v = b.val
delete b;
return v;
}
prev = b;
b = b.next;
}
return null;
}
fan.sys.Map.prototype.$each = function(func)
{
if (this.m_ordered)
{
for (var i=0; i<this.m_keys.length; i++)
{
var k = this.m_keys[i];
if (k === undefined) continue;
var v = this.$get(k);
if (func({ key:k, ki:i, val:v }) === false) return;
}
}
else
{
for (var h in this.m_vals)
{
var b = this.m_vals[h];
while (b !== undefined)
{
if (func(b) === false) return;
b = b.next;
}
}
}
}
fan.sys.Param = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Param.prototype.$ctor = function(name, type, hasDefault)
{
this.m_name = name;
this.m_type = (type instanceof fan.sys.Type) ? type : fan.sys.Type.find(type);
this.m_hasDefault = hasDefault;
}
fan.sys.Param.prototype.$name = function() { return this.m_name; }
fan.sys.Param.prototype.type = function() { return this.m_type; }
fan.sys.Param.prototype.hasDefault = function() { return this.m_hasDefault; }
fan.sys.Param.prototype.$typeof = function() { return fan.sys.Param.$type; }
fan.sys.Param.prototype.toStr = function() { return this.m_type.toStr() + " " + this.m_name; }
fan.sys.Float = fan.sys.Obj.$extend(fan.sys.Num);
fan.sys.Float.prototype.$ctor = function() {}
fan.sys.Float.make = function(val)
{
var x = new Number(val);
x.$fanType = fan.sys.Float.$type;
return x;
}
fan.sys.Float.makeBits = function(bits)
{
throw fan.sys.Err.make("Float.makeBits not available in JavaScript");
}
fan.sys.Float.makeBits32 = function(bits)
{
var buffer = new ArrayBuffer(4);
(new Uint32Array(buffer))[0] = bits;
return fan.sys.Float.make(new Float32Array(buffer)[0]);
}
fan.sys.Float.prototype.$typeof = function()
{
return fan.sys.Float.$type;
}
fan.sys.Float.equals = function(self, that)
{
if (that != null && self.$fanType === that.$fanType)
{
return self.valueOf() == that.valueOf();
}
return false;
}
fan.sys.Float.compare = function(self, that)
{
if (self == null) return that == null ? 0 : -1;
if (that == null) return 1;
if (isNaN(self)) return isNaN(that) ? 0 : -1;
if (isNaN(that)) return 1;
if (self < that) return -1;
return self.valueOf() == that.valueOf() ? 0 : 1;
}
fan.sys.Float.isNaN = function(self)
{
return isNaN(self);
}
fan.sys.Float.isNegZero = function(self)
{
return 1/self === -Infinity;
}
fan.sys.Float.normNegZero = function(self)
{
return fan.sys.Float.isNegZero(self) ? 0.0 : self;
}
fan.sys.Float.hash = function(self)
{
return fan.sys.Str.hash(self.toString());
}
fan.sys.Float.bits = function(self)
{
throw fan.sys.Err.make("Float.bits not available in JavaScript");
}
fan.sys.Float.bitsArray = function(self)
{
var buf = new ArrayBuffer(8);
(new Float64Array(buf))[0] = self;
return [(new Uint32Array(buf))[0], (new Uint32Array(buf))[1]];
}
fan.sys.Float.bits32 = function(self)
{
var buf = new ArrayBuffer(4);
(new Float32Array(buf))[0] = self;
return (new Uint32Array(buf))[0];
}
fan.sys.Float.toInt = function(val) { return (val<0) ? Math.ceil(val) : Math.floor(val); }
fan.sys.Float.toFloat = function(val) { return val; }
fan.sys.Float.toDecimal = function(val) { return fan.sys.Decimal.make(val); }
fan.sys.Float.abs = function(self) { return fan.sys.Float.make(Math.abs(self)); }
fan.sys.Float.approx = function(self, that, tolerance)
{
if (fan.sys.Float.compare(self, that) == 0) return true;
var t = tolerance == null
? Math.min(Math.abs(self/1e6), Math.abs(that/1e6))
: tolerance;
return Math.abs(self - that) <= t;
}
fan.sys.Float.ceil  = function(self) { return fan.sys.Float.make(Math.ceil(self)); }
fan.sys.Float.exp   = function(self) { return fan.sys.Float.make(Math.exp(self)); }
fan.sys.Float.floor = function(self) { return fan.sys.Float.make(Math.floor(self)); }
fan.sys.Float.log   = function(self) { return fan.sys.Float.make(Math.log(self)); }
fan.sys.Float.log10 = function(self) { return fan.sys.Float.make(Math.log(self) / Math.LN10); }
fan.sys.Float.min   = function(self, that) { return fan.sys.Float.make(Math.min(self, that)); }
fan.sys.Float.max   = function(self, that) { return fan.sys.Float.make(Math.max(self, that)); }
fan.sys.Float.negate = function(self) { return fan.sys.Float.make(-self); }
fan.sys.Float.pow   = function(self, exp) { return fan.sys.Float.make(Math.pow(self, exp)); }
fan.sys.Float.round = function(self) { return fan.sys.Float.make(Math.round(self)); }
fan.sys.Float.sqrt  = function(self) { return fan.sys.Float.make(Math.sqrt(self)); }
fan.sys.Float.random = function() { return fan.sys.Float.make(Math.random()); }
fan.sys.Float.clamp = function(self, min, max)
{
if (self < min) return min;
if (self > max) return max;
return self;
}
fan.sys.Float.clip = function(self, min, max) { return fan.sys.Float.clamp(self, min, max); }
fan.sys.Float.plus     = function(a,b) { return fan.sys.Float.make(a+b); }
fan.sys.Float.plusInt  = function(a,b) { return fan.sys.Float.make(a+b); }
fan.sys.Float.plusDecimal = function(a,b) { return fan.sys.Decimal.make(a+b); }
fan.sys.Float.minus        = function(a,b) { return fan.sys.Float.make(a-b); }
fan.sys.Float.minusInt     = function(a,b) { return fan.sys.Float.make(a-b); }
fan.sys.Float.minusDecimal = function(a,b) { return fan.sys.Decimal.make(a-b); }
fan.sys.Float.mult        = function(a,b) { return fan.sys.Float.make(a*b); }
fan.sys.Float.multInt     = function(a,b) { return fan.sys.Float.make(a*b); }
fan.sys.Float.multDecimal = function(a,b) { return fan.sys.Decimal.make(a*b); }
fan.sys.Float.div        = function(a,b) { return fan.sys.Float.make(a/b); }
fan.sys.Float.divInt     = function(a,b) { return fan.sys.Float.make(a/b); }
fan.sys.Float.divDecimal = function(a,b) { return fan.sys.Decimal.make(a/b); }
fan.sys.Float.mod        = function(a,b) { return fan.sys.Float.make(a%b); }
fan.sys.Float.modInt     = function(a,b) { return fan.sys.Float.make(a%b); }
fan.sys.Float.modDecimal = function(a,b) { return fan.sys.Decimal.make(a%b); }
fan.sys.Float.increment = function(self) { return fan.sys.Float.make(self+1); }
fan.sys.Float.decrement = function(self) { return fan.sys.Float.make(self-1); }
fan.sys.Float.acos  = function(self) { return fan.sys.Float.make(Math.acos(self)); }
fan.sys.Float.asin  = function(self) { return fan.sys.Float.make(Math.asin(self)); }
fan.sys.Float.atan  = function(self) { return fan.sys.Float.make(Math.atan(self)); }
fan.sys.Float.atan2 = function(y, x) { return fan.sys.Float.make(Math.atan2(y, x)); }
fan.sys.Float.cos   = function(self) { return fan.sys.Float.make(Math.cos(self)); }
fan.sys.Float.sin   = function(self) { return fan.sys.Float.make(Math.sin(self)); }
fan.sys.Float.tan   = function(self) { return fan.sys.Float.make(Math.tan(self)); }
fan.sys.Float.toDegrees = function(self) { return fan.sys.Float.make(self * 180 / Math.PI); }
fan.sys.Float.toRadians = function(self) { return fan.sys.Float.make(self * Math.PI / 180); }
fan.sys.Float.cosh  = function(self) { return fan.sys.Float.make(0.5 * (Math.exp(self) + Math.exp(-self))); }
fan.sys.Float.sinh  = function(self) { return fan.sys.Float.make(0.5 * (Math.exp(self) - Math.exp(-self))); }
fan.sys.Float.tanh  = function(self) { return fan.sys.Float.make((Math.exp(2*self)-1) / (Math.exp(2*self)+1)); }
fan.sys.Float.fromStr = function(s, checked)
{
if (s == "NaN") return fan.sys.Float.m_nan;
if (s == "INF") return fan.sys.Float.m_posInf;
if (s == "-INF") return fan.sys.Float.m_negInf;
if (isNaN(s))
{
if (checked != null && !checked) return null;
throw fan.sys.ParseErr.makeStr("Float", s);
}
return fan.sys.Float.make(parseFloat(s));
}
fan.sys.Float.toStr = function(self)
{
if (isNaN(self)) return "NaN";
if (fan.sys.Float.isNegZero(self)) return "-0.0";
if (self == fan.sys.Float.m_posInf) return "INF";
if (self == fan.sys.Float.m_negInf) return "-INF";
return (fan.sys.Float.toInt(self) == self) ? self.toFixed(1) : ""+self;
}
fan.sys.Float.encode = function(self, out)
{
if (isNaN(self)) out.w("sys::Float(\"NaN\")");
else if (self == fan.sys.Float.m_posInf) out.w("sys::Float(\"INF\")");
else if (self == fan.sys.Float.m_negInf) out.w("sys::Float(\"-INF\")");
else out.w(""+self).w("f");
}
fan.sys.Float.toCode = function(self)
{
if (isNaN(self)) return "Float.nan";
if (self == fan.sys.Float.m_posInf) return "Float.posInf";
if (self == fan.sys.Float.m_negInf) return "Float.negInf";
var s = ""+self
if (s.indexOf(".") == -1) s += ".0";
return s + "f";
}
fan.sys.Float.toLocale = function(self, pattern, locale)
{
if (locale === undefined || locale == null) locale = fan.sys.Locale.cur();
if (pattern === undefined) pattern = null;
try
{
if (isNaN(self)) return locale.numSymbols().nan;
if (self == fan.sys.Float.m_posInf) return locale.numSymbols().posInf;
if (self == fan.sys.Float.m_negInf) return locale.numSymbols().negInf;
if (pattern == null)
{
if (Math.abs(self) >= 100.0)
return fan.sys.Int.toLocale(Math.round(self), null, locale);
pattern = fan.sys.Float.toDefaultLocalePattern(self);
}
var string = ''+self;
var p = fan.sys.NumPattern.parse(pattern);
var d = fan.sys.NumDigits.makeStr(string);
return fan.sys.Num.toLocale(p, d, locale);
}
catch (err)
{
fan.sys.ObjUtil.echo(err);
return ''+self;
}
}
fan.sys.Float.toDefaultLocalePattern = function(self)
{
var abs  = Math.abs(self);
var fabs = Math.floor(abs);
if (fabs >= 10.0) return "#0.0#";
if (fabs >= 1.0)  return "#0.0##";
var frac = abs - fabs;
if (frac < 0.00000001) return "0.0";
if (frac < 0.0000001)  return "0.0000000##";
if (frac < 0.000001)   return "0.000000##";
if (frac < 0.00001)    return "0.00000##";
if (frac < 0.0001)     return "0.0000##";
if (frac < 0.001)      return "0.000##";
return "0.0##";
}
fan.sys.Sys = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Sys.prototype.$ctor = function() {}
fan.sys.Sys.genericParamTypes = [];
fan.sys.Sys.initGenericParamTypes = function()
{
fan.sys.Sys.AType = fan.sys.Sys.initGeneric('A');
fan.sys.Sys.BType = fan.sys.Sys.initGeneric('B');
fan.sys.Sys.CType = fan.sys.Sys.initGeneric('C');
fan.sys.Sys.DType = fan.sys.Sys.initGeneric('D');
fan.sys.Sys.EType = fan.sys.Sys.initGeneric('E');
fan.sys.Sys.FType = fan.sys.Sys.initGeneric('F');
fan.sys.Sys.GType = fan.sys.Sys.initGeneric('G');
fan.sys.Sys.HType = fan.sys.Sys.initGeneric('H');
fan.sys.Sys.KType = fan.sys.Sys.initGeneric('K');
fan.sys.Sys.LType = fan.sys.Sys.initGeneric('L');
fan.sys.Sys.MType = fan.sys.Sys.initGeneric('M');
fan.sys.Sys.RType = fan.sys.Sys.initGeneric('R');
fan.sys.Sys.VType = fan.sys.Sys.initGeneric('V');
}
fan.sys.Sys.initGeneric = function(ch)
{
var name = ch;
try
{
var pod = fan.sys.Pod.find("sys");
return fan.sys.Sys.genericParamTypes[ch] = pod.$at(name, "sys::Obj", [], 0);
}
catch (err)
{
throw initFail("generic " + name, e);
}
}
fan.sys.Sys.genericParamType = function(name)
{
if (name.length == 1)
return fan.sys.Sys.genericParamTypes[name];
else
return null;
}
fan.sys.Sys.initWarn = function(field, e)
{
fan.sys.ObjUtil.echo("WARN: cannot init Sys." + field);
fan.sys.ObjUtil.echo(e);
}
fan.sys.Sys.initFail = function(field, e)
{
fan.sys.ObjUtil.echo("ERROR: cannot init Sys." + field);
fan.sys.ObjUtil.echo(e);
throw new Error("Cannot boot fan: " + e);
}
fan.sys.Facets = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Facets.prototype.$ctor = function(map)
{
this.m_map = map;
this.m_list = null;
}
fan.sys.Facets.empty = function()
{
var x = fan.sys.Facets.m_emptyVal;
if (x == null) x = fan.sys.Facets.m_emptyVal = new fan.sys.Facets({});
return x;
}
fan.sys.Facets.makeTransient = function()
{
var x = fan.sys.Facets.m_transientVal;
if (x == null)
{
var m = {};
m[fan.sys.Transient.$type.qname()] = "";
x = fan.sys.Facets.m_transientVal = new fan.sys.Facets(m);
}
return x;
}
fan.sys.Facets.prototype.list = function()
{
if (this.m_list == null)
{
this.m_list = fan.sys.List.make(fan.sys.Facet.$type);
for (var key in this.m_map)
{
var type = fan.sys.Type.find(key);
this.m_list.add(this.get(type, true));
}
this.m_list = this.m_list.toImmutable();
}
return this.m_list;
}
fan.sys.Facets.prototype.get = function(type, checked)
{
var val = this.m_map[type.qname()];
if (typeof val == "string")
{
var f = this.decode(type, val);
this.m_map[type.qname()] = f;
return f;
}
if (val != null) return val;
if (checked) throw fan.sys.UnknownFacetErr.make(type.qname());
return null;
}
fan.sys.Facets.prototype.decode = function(type, s)
{
try
{
if (s.length == 0) return type.make();
return fanx_ObjDecoder.decode(s);
}
catch (e)
{
var msg = "ERROR: Cannot decode facet " + type + ": " + s;
fan.sys.ObjUtil.echo(msg);
delete this.m_map[type.qname()];
throw fan.sys.IOErr.make(msg);
}
}
fan.sys.Facets.prototype.dup = function()
{
var dup = {};
for (key in this.m_map) dup[key] = this.m_map[key];
return new fan.sys.Facets(dup);
}
fan.sys.Facets.prototype.inherit = function(facets)
{
var keys = [];
for (key in facets.m_map) keys.push(key);
if (keys.length == 0) return;
this.m_list = null;
for (var i=0; i<keys.length; i++)
{
var key = keys[i];
if (this.m_map[key] != null) continue;
var type = fan.sys.Type.find(key);
var meta = type.facet(fan.sys.FacetMeta.$type, false);
if (meta == null || !meta.m_inherited) continue;
this.m_map[key] = facets.m_map[key];
}
}
fan.sys.Facets.m_emptyVal = null;
fan.sys.Facets.m_transientVal = null;
fan.sys.MethodFunc = fan.sys.Obj.$extend(fan.sys.Func);
fan.sys.MethodFunc.prototype.$ctor = function(method, returns)
{
this.m_method = method;
this.m_returns = returns;
this.m_type = null;
}
fan.sys.MethodFunc.prototype.returns = function() { return this.m_returns; }
fan.sys.MethodFunc.prototype.arity = function() { return this.params().size(); }
fan.sys.MethodFunc.prototype.params = function()
{
if (this.m_fparams == null)
{
var mparams = this.m_method.m_params;
var fparams = mparams;
if ((this.m_method.m_flags & (fan.sys.FConst.Static|fan.sys.FConst.Ctor)) == 0)
{
var temp = [];
temp[0] = new fan.sys.Param("this", this.m_method.m_parent, 0);
fparams = fan.sys.List.make(fan.sys.Param.$type, temp.concat(mparams.m_values));
}
this.m_fparams = fparams.ro();
}
return this.m_fparams;
}
fan.sys.MethodFunc.prototype.method = function() { return this.m_method; }
fan.sys.MethodFunc.prototype.isImmutable = function() { return true; }
fan.sys.MethodFunc.prototype.$typeof = function()
{
if (this.m_type == null)
{
var params = this.params();
var types = [];
for (var i=0; i<params.size(); i++)
types.push(params.get(i).m_type);
this.m_type = new fan.sys.FuncType(types, this.m_returns);
}
return this.m_type;
}
fan.sys.MethodFunc.prototype.call = function()
{
return this.m_method.call.apply(this.m_method, arguments);
}
fan.sys.MethodFunc.prototype.callList = function(args)
{
return this.m_method.callList.apply(this.m_method, arguments);
}
fan.sys.MethodFunc.prototype.callOn = function(obj, args)
{
return this.m_method.callOn.apply(this.m_method, arguments);
}
fan.sys.MethodFunc.prototype.retype = function(t)
{
if (t instanceof fan.sys.FuncType)
{
var params = [];
for (var i=0; i < t.pars.length; ++i)
params.push(new fan.sys.Param(String.fromCharCode(i+65), t.pars[i], 0));
var paramList = fan.sys.List.make(fan.sys.Param.$type, params);
var func = new fan.sys.MethodFunc(this.m_method, t.ret);
func.m_type = t;
func.m_fparams = paramList;
return func;
}
else
throw fan.sys.ArgErr.make(fan.sys.Str.plus("Not a Func type: ", t));
}
function fanx_TypeParser(sig, checked)
{
this.sig     = sig;
this.len     = sig.length;
this.pos     = 0;
this.cur     = sig.charAt(this.pos);
this.peek    = sig.charAt(this.pos+1);
this.checked = checked;
}
fanx_TypeParser.prototype.loadTop = function()
{
var type = this.load();
if (this.cur != null) throw this.err();
return type;
}
fanx_TypeParser.prototype.load = function()
{
var type;
if (this.cur == '|')
type = this.loadFunc();
else if (this.cur == '[')
{
var ffi = true;
for (var i=this.pos+1; i<this.len; i++)
{
var ch = this.sig.charAt(i);
if (this.isIdChar(ch)) continue;
ffi = (ch == ']');
break;
}
if (ffi)
throw fan.sys.ArgErr.make("Java types not allowed '" + this.sig + "'");
else
type = this.loadMap();
}
else
type = this.loadBasic();
if (this.cur == '?')
{
this.consume('?');
type = type.toNullable();
}
while (this.cur == '[')
{
this.consume('[');
this.consume(']');
type = type.toListOf();
if (this.cur == '?')
{
this.consume('?');
type = type.toNullable();
}
}
if (this.cur == '?')
{
this.consume('?');
type = type.toNullable();
}
return type;
}
fanx_TypeParser.prototype.loadMap = function()
{
this.consume('[');
var key = this.load();
this.consume(':');
var val = this.load();
this.consume(']');
return new fan.sys.MapType(key, val);
}
fanx_TypeParser.prototype.loadFunc = function()
{
this.consume('|');
var params = [];
if (this.cur != '-')
{
while (true)
{
params.push(this.load());
if (this.cur == '-') break;
this.consume(',');
}
}
this.consume('-');
this.consume('>');
var ret = this.load();
this.consume('|');
return new fan.sys.FuncType(params, ret);
}
fanx_TypeParser.prototype.loadBasic = function()
{
var podName = this.consumeId();
this.consume(':');
this.consume(':');
var typeName = this.consumeId();
if (typeName.length == 1 && podName == "sys")
{
var type = fan.sys.Sys.genericParamType(typeName);
if (type != null) return type;
}
return fanx_TypeParser.find(podName, typeName, this.checked);
}
fanx_TypeParser.prototype.consumeId = function()
{
var start = this.pos;
while (this.isIdChar(this.cur)) this.$consume();
return this.sig.substring(start, this.pos);
}
fanx_TypeParser.prototype.isIdChar = function(ch)
{
if (ch == null) return false;
return fan.sys.Int.isAlphaNum(ch.charCodeAt(0)) || ch == '_';
}
fanx_TypeParser.prototype.consume = function(expected)
{
if (this.cur != expected) throw this.err();
this.$consume();
}
fanx_TypeParser.prototype.$consume = function()
{
this.cur = this.peek;
this.pos++;
this.peek = this.pos+1 < this.len ? this.sig.charAt(this.pos+1) : null;
}
fanx_TypeParser.prototype.err = function(sig)
{
if (sig === undefined) sig = this.sig;
return fan.sys.ArgErr.make("Invalid type signature '" + sig + "'");
}
fanx_TypeParser.load = function(sig, checked)
{
var type = fanx_TypeParser.cache[sig];
if (type != null) return type;
var len = sig.length;
var last = len > 1 ? sig.charAt(len-1) : 0;
if (last == '?')
{
type = fanx_TypeParser.load(sig.substring(0, len-1), checked).toNullable();
fanx_TypeParser.cache[sig] = type;
return type;
}
if (last != ']' && last != '|')
{
var podName;
var typeName;
try
{
var colon = sig.indexOf("::");
podName  = sig.substring(0, colon);
typeName = sig.substring(colon+2);
if (podName.length == 0 || typeName.length == 0) throw fan.sys.Err.make("");
}
catch (err)
{
throw fan.sys.ArgErr.make("Invalid type signature '" + sig + "', use <pod>::<type>");
}
if (podName.charAt(0) == '[')
throw fan.sys.ArgErr.make("Java types not allowed '" + sig + "'");
type = fanx_TypeParser.find(podName, typeName, checked);
fanx_TypeParser.cache[sig] = type;
return type;
}
try
{
type = new fanx_TypeParser(sig, checked).loadTop();
fanx_TypeParser.cache[sig] = type;
return type;
}
catch (err)
{
throw fan.sys.Err.make(err);
}
}
fanx_TypeParser.find = function(podName, typeName, checked)
{
var pod = fan.sys.Pod.find(podName, checked);
if (pod == null) return null;
return pod.type(typeName, checked);
}
fanx_TypeParser.cache = [];
function fanx_Token() {}
fanx_Token.EOF              = -1;
fanx_Token.ID               = 0;
fanx_Token.BOOL_LITERAL     = 1;
fanx_Token.STR_LITERAL      = 2;
fanx_Token.INT_LITERAL      = 3;
fanx_Token.FLOAT_LITERAL    = 4;
fanx_Token.DECIMAL_LITERAL  = 5;
fanx_Token.DURATION_LITERAL = 6;
fanx_Token.URI_LITERAL      = 7;
fanx_Token.NULL_LITERAL     = 8;
fanx_Token.DOT              = 9;
fanx_Token.SEMICOLON        = 10;
fanx_Token.COMMA            = 11;
fanx_Token.COLON            = 12;
fanx_Token.DOUBLE_COLON     = 13;
fanx_Token.LBRACE           = 14;
fanx_Token.RBRACE           = 15;
fanx_Token.LPAREN           = 16;
fanx_Token.RPAREN           = 17;
fanx_Token.LBRACKET         = 18;
fanx_Token.RBRACKET         = 19;
fanx_Token.LRBRACKET        = 20;
fanx_Token.EQ               = 21;
fanx_Token.POUND            = 22;
fanx_Token.QUESTION         = 23;
fanx_Token.AS               = 24;
fanx_Token.USING            = 25;
fanx_Token.isLiteral = function(type)
{
return fanx_Token.BOOL_LITERAL <= type && type <= fanx_Token.NULL_LITERAL;
}
fanx_Token.toString = function(type)
{
switch (type)
{
case fanx_Token.EOF:              return "end of file";
case fanx_Token.ID:               return "identifier";
case fanx_Token.BOOL_LITERAL:     return "Bool literal";
case fanx_Token.STR_LITERAL:      return "String literal";
case fanx_Token.INT_LITERAL:      return "Int literal";
case fanx_Token.FLOAT_LITERAL:    return "Float literal";
case fanx_Token.DECIMAL_LITERAL:  return "Decimal literal";
case fanx_Token.DURATION_LITERAL: return "Duration literal";
case fanx_Token.URI_LITERAL:      return "Uri literal";
case fanx_Token.NULL_LITERAL:     return "null";
case fanx_Token.DOT:              return ".";
case fanx_Token.SEMICOLON:        return ";";
case fanx_Token.COMMA:            return ",";
case fanx_Token.COLON:            return ":";
case fanx_Token.DOUBLE_COLON:     return "::";
case fanx_Token.LBRACE:           return "{";
case fanx_Token.RBRACE:           return "}";
case fanx_Token.LPAREN:           return "(";
case fanx_Token.RPAREN:           return ")";
case fanx_Token.LBRACKET:         return "[";
case fanx_Token.RBRACKET:         return "]";
case fanx_Token.LRBRACKET:        return "[]";
case fanx_Token.EQ:               return "=";
case fanx_Token.POUND:            return "#";
case fanx_Token.QUESTION:         return "?";
case fanx_Token.AS:               return "as";
case fanx_Token.USING:            return "using";
default:                          return "Token[" + type + "]";
}
}
function fanx_ObjDecoder(input, options)
{
this.tokenizer = new fanx_Tokenizer(input);
this.options = options;
this.curt = null;
this.usings = [];
this.numUsings = 0;
this.consume();
}
fanx_ObjDecoder.prototype.readObj = function()
{
this.readHeader();
return this.$readObj(null, null, true);
}
fanx_ObjDecoder.prototype.readHeader = function()
{
while (this.curt == fanx_Token.USING)
this.usings[this.numUsings++] = this.readUsing();
}
fanx_ObjDecoder.prototype.readUsing = function()
{
var line = this.tokenizer.line;
this.consume();
var podName = this.consumeId("Expecting pod name");
var pod = fan.sys.Pod.find(podName, false);
if (pod == null) throw this.err("Unknown pod: " + podName);
if (this.curt != fanx_Token.DOUBLE_COLON)
{
this.endOfStmt(line);
return new fanx_UsingPod(pod);
}
this.consume();
var typeName = this.consumeId("Expecting type name");
var t = pod.type(typeName, false);
if (t == null) throw this.err("Unknown type: " + podName + "::" + typeName);
if (this.curt == fanx_Token.AS)
{
this.consume();
typeName = this.consumeId("Expecting using as name");
}
this.endOfStmt(line);
return new fanx_UsingType(t, typeName);
}
fanx_ObjDecoder.prototype.$readObj = function(curField, peekType, root)
{
if (fanx_Token.isLiteral(this.curt))
{
var val = this.tokenizer.val;
this.consume();
return val;
}
if (this.curt == fanx_Token.LBRACKET)
return this.readCollection(curField, peekType);
var line = this.tokenizer.line;
var t = (peekType != null) ? peekType : this.readType();
if (this.curt == fanx_Token.LPAREN)
return this.readSimple(line, t);
else if (this.curt == fanx_Token.POUND)
return this.readTypeOrSlotLiteral(line, t);
else if (this.curt == fanx_Token.LBRACKET)
return this.readCollection(curField, t);
else
return this.readComplex(line, t, root);
}
fanx_ObjDecoder.prototype.readTypeOrSlotLiteral = function(line, t)
{
this.consume(fanx_Token.POUND, "Expected '#' for type literal");
if (this.curt == fanx_Token.ID && !this.isEndOfStmt(line))
{
var slotName = this.consumeId("slot literal name");
return t.slot(slotName);
}
else
{
return t;
}
}
fanx_ObjDecoder.prototype.readSimple = function(line, t)
{
this.consume(fanx_Token.LPAREN, "Expected ( in simple");
var str = this.consumeStr("Expected string literal for simple");
this.consume(fanx_Token.RPAREN, "Expected ) in simple");
try
{
var script = "fan." + t.pod().$name() + "." + t.$name() + ".fromStr('" + str + "')";
var val = eval(script);
return val;
}
catch (e)
{
throw fan.sys.ParseErr.make(e.toString() + " [Line " + this.line + "]", e);
}
}
fanx_ObjDecoder.prototype.readComplex = function(line, t, root)
{
var toSet = fan.sys.Map.make(fan.sys.Field.$type, fan.sys.Obj.$type.toNullable());
var toAdd = fan.sys.List.make(fan.sys.Obj.$type.toNullable());
this.readComplexFields(t, toSet, toAdd);
var makeCtor = t.method("make", false);
if (makeCtor == null || !makeCtor.isPublic())
throw this.err("Missing public constructor " + t.qname() + ".make", line);
var args = null;
if (root && this.options != null && this.options.get("makeArgs") != null)
args = fan.sys.List.make(fan.sys.Obj.$type).addAll(this.options.get("makeArgs"));
var obj = null;
var setAfterCtor = true;
try
{
var p = makeCtor.params().last();
if (p != null && p.type().fits(fan.sys.Func.$type))
{
if (args == null) args = fan.sys.List.make(fan.sys.Obj.$type);
args.add(fan.sys.Field.makeSetFunc(toSet));
setAfterCtor = false;
}
obj = makeCtor.callList(args);
}
catch (e)
{
throw this.err("Cannot make " + t + ": " + e, line, e);
}
if (setAfterCtor && toSet.size() > 0)
{
var keys = toSet.keys();
for (var i=0; i<keys.size(); i++)
{
var field = keys.get(i);
var val = toSet.get(field);
this.complexSet(obj, field, val, line);
}
}
if (toAdd.size() > 0)
{
var addMethod = t.method("add", false);
if (addMethod == null) throw this.err("Method not found: " + t.qname() + ".add", line);
for (var i=0; i<toAdd.size(); ++i)
this.complexAdd(t, obj, addMethod, toAdd.get(i), line);
}
return obj;
}
fanx_ObjDecoder.prototype.readComplexFields = function(t, toSet, toAdd)
{
if (this.curt != fanx_Token.LBRACE) return;
this.consume();
while (this.curt != fanx_Token.RBRACE)
{
var line = this.tokenizer.line;
var readField = false;
if (this.curt == fanx_Token.ID)
{
var name = this.consumeId("Expected field name");
if (this.curt == fanx_Token.EQ)
{
this.consume();
this.readComplexSet(t, line, name, toSet);
readField = true;
}
else
{
this.tokenizer.undo(this.tokenizer.type, this.tokenizer.val, this.tokenizer.line);
this.curt = this.tokenizer.reset(fanx_Token.ID, name, line);
}
}
if (!readField) this.readComplexAdd(t, line, toAdd);
if (this.curt == fanx_Token.COMMA) this.consume();
else this.endOfStmt(line);
}
this.consume(fanx_Token.RBRACE, "Expected '}'");
}
fanx_ObjDecoder.prototype.readComplexSet = function(t, line, name, toSet)
{
var field = t.field(name, false);
if (field == null) throw this.err("Field not found: " + t.qname() + "." + name, line);
var val = this.$readObj(field, null, false);
try
{
if (field.isConst()) val = fan.sys.ObjUtil.toImmutable(val);
}
catch (ex)
{
throw this.err("Cannot make object const for " + field.qname() + ": " + ex, line, ex);
}
toSet.set(field, val);
}
fanx_ObjDecoder.prototype.complexSet = function(obj, field, val, line)
{
try
{
if (field.isConst())
field.set(obj, fan.sys.ObjUtil.toImmutable(val), false);
else
field.set(obj, val);
}
catch (ex)
{
throw this.err("Cannot set field " + field.qname() + ": " + ex, line, ex);
}
}
fanx_ObjDecoder.prototype.readComplexAdd = function(t, line, toAdd)
{
var val = this.$readObj(null, null, false);
toAdd.add(val);
}
fanx_ObjDecoder.prototype.complexAdd = function(t, obj, addMethod, val, line)
{
try
{
addMethod.invoke(obj, fan.sys.List.make(fan.sys.Obj.$type, [val]));
}
catch (ex)
{
throw this.err("Cannot call " + t.qname() + ".add: " + ex, line, ex);
}
}
fanx_ObjDecoder.prototype.readCollection = function(curField, t)
{
this.consume(fanx_Token.LBRACKET, "Expecting '['");
var peekType = null;
if (this.curt == fanx_Token.ID && t == null)
{
peekType = this.readType();
if (this.curt == fanx_Token.RBRACKET && peekType instanceof fan.sys.MapType)
{
t = peekType; peekType = null;
this.consume();
while (this.curt == fanx_Token.LRBRACKET) { this.consume(); t = t.toListOf(); }
if (this.curt == fanx_Token.QUESTION) { this.consume(); t = t.toNullable(); }
if (this.curt == fanx_Token.POUND) { this.consume(); return t; }
this.consume(fanx_Token.LBRACKET, "Expecting '['");
}
}
if (this.curt == fanx_Token.COMMA && peekType == null)
{
this.consume();
this.consume(fanx_Token.RBRACKET, "Expecting ']'");
return fan.sys.List.make(this.toListOfType(t, curField, false), []);
}
if (this.curt == fanx_Token.COLON && peekType == null)
{
this.consume();
this.consume(fanx_Token.RBRACKET, "Expecting ']'");
return fan.sys.Map.make(this.toMapType(t, curField, false));
}
var first = this.$readObj(null, peekType, false);
if (this.curt == fanx_Token.COLON)
return this.readMap(this.toMapType(t, curField, true), first);
else
return this.readList(this.toListOfType(t, curField, true), first);
}
fanx_ObjDecoder.prototype.readList = function(of, first)
{
var acc = [];
acc.push(first)
while (this.curt != fanx_Token.RBRACKET)
{
this.consume(fanx_Token.COMMA, "Expected ','");
if (this.curt == fanx_Token.RBRACKET) break;
acc.push(this.$readObj(null, null, false));
}
this.consume(fanx_Token.RBRACKET, "Expected ']'");
if (of == null) of = fan.sys.Type.common(acc);
return fan.sys.List.make(of, acc);
}
fanx_ObjDecoder.prototype.readMap = function(mapType, firstKey)
{
var map = mapType == null
? fan.sys.Map.make(fan.sys.Obj.$type, fan.sys.Obj.$type.toNullable())
: fan.sys.Map.make(mapType);
map.ordered$(true);
this.consume(fanx_Token.COLON, "Expected ':'");
map.set(firstKey, this.$readObj(null, null, false));
while (this.curt != fanx_Token.RBRACKET)
{
this.consume(fanx_Token.COMMA, "Expected ','");
if (this.curt == fanx_Token.RBRACKET) break;
var key = this.$readObj(null, null, false);
this.consume(fanx_Token.COLON, "Expected ':'");
var val = this.$readObj(null, null, false);
map.set(key, val);
}
this.consume(fanx_Token.RBRACKET, "Expected ']'");
if (mapType == null)
{
var size = map.size();
var k = fan.sys.Type.common(map.keys().m_values);
var v = fan.sys.Type.common(map.vals().m_values);
map.m_type = new fan.sys.MapType(k, v);
}
return map;
}
fanx_ObjDecoder.prototype.toListOfType = function(t, curField, infer)
{
if (t != null) return t;
if (curField != null)
{
var ft = curField.type().toNonNullable();
if (ft instanceof fan.sys.ListType) return ft.v;
}
if (infer) return null;
return fan.sys.Obj.$type.toNullable();
}
fanx_ObjDecoder.prototype.toMapType = function(t, curField, infer)
{
if (t instanceof fan.sys.MapType)
return t;
if (curField != null)
{
var ft = curField.type().toNonNullable();
if (ft instanceof fan.sys.MapType) return ft;
}
if (infer) return null;
if (fanx_ObjDecoder.defaultMapType == null)
fanx_ObjDecoder.defaultMapType =
new fan.sys.MapType(fan.sys.Obj.$type, fan.sys.Obj.$type.toNullable());
return fanx_ObjDecoder.defaultMapType;
}
fanx_ObjDecoder.prototype.readType = function(lbracket)
{
if (lbracket === undefined) lbracket = false;
var t = this.readSimpleType();
if (this.curt == fanx_Token.QUESTION)
{
this.consume();
t = t.toNullable();
}
if (this.curt == fanx_Token.COLON)
{
this.consume();
var lbracket2 = this.curt == fanx_Token.LBRACKET;
if (lbracket2) this.consume();
t = new fan.sys.MapType(t, this.readType(lbracket2));
if (lbracket2) this.consume(fanx_Token.RBRACKET, "Expected closeing ']'");
}
while (this.curt == fanx_Token.LRBRACKET)
{
this.consume();
t = t.toListOf();
}
if (this.curt == fanx_Token.QUESTION)
{
this.consume();
t = t.toNullable();
}
return t;
}
fanx_ObjDecoder.prototype.readSimpleType = function()
{
var line = this.tokenizer.line;
var n = this.consumeId("Expected type signature");
if (this.curt != fanx_Token.DOUBLE_COLON)
{
for (var i=0; i<this.numUsings; ++i)
{
var t = this.usings[i].resolve(n);
if (t != null) return t;
}
throw this.err("Unresolved type name: " + n);
}
this.consume(fanx_Token.DOUBLE_COLON, "Expected ::");
var typeName = this.consumeId("Expected type name");
var pod = fan.sys.Pod.find(n, false);
if (pod == null) throw this.err("Pod not found: " + n, line);
var type = pod.type(typeName, false);
if (type == null) throw this.err("Type not found: " + n + "::" + typeName, line);
return type;
}
fanx_ObjDecoder.prototype.err = function(msg)
{
return fanx_ObjDecoder.err(msg, this.tokenizer.line);
}
fanx_ObjDecoder.prototype.consumeId = function(expected)
{
this.verify(fanx_Token.ID, expected);
var id = this.tokenizer.val;
this.consume();
return id;
}
fanx_ObjDecoder.prototype.consumeStr = function(expected)
{
this.verify(fanx_Token.STR_LITERAL, expected);
var id = this.tokenizer.val;
this.consume();
return id;
}
fanx_ObjDecoder.prototype.consume = function(type, expected)
{
if (type != undefined)
this.verify(type, expected);
this.curt = this.tokenizer.next();
}
fanx_ObjDecoder.prototype.verify = function(type, expected)
{
if (this.curt != type)
throw this.err(expected + ", not '" + fanx_Token.toString(this.curt) + "'");
}
fanx_ObjDecoder.prototype.isEndOfStmt = function(lastLine)
{
if (this.curt == fanx_Token.EOF) return true;
if (this.curt == fanx_Token.SEMICOLON) return true;
return lastLine < this.tokenizer.line;
}
fanx_ObjDecoder.prototype.endOfStmt = function(lastLine)
{
if (this.curt == fanx_Token.SEMICOLON) { this.consume(); return; }
if (lastLine < this.tokenizer.line) return;
if (this.curt == fanx_Token.RBRACE) return;
throw this.err("Expected end of statement: semicolon, newline, or end of block; not '" + fanx_Token.toString(this.curt) + "'");
}
fanx_ObjDecoder.decode = function(s)
{
return new fanx_ObjDecoder(fan.sys.InStream.makeForStr(s), null).readObj();
}
fanx_ObjDecoder.err = function(msg, line)
{
return fan.sys.IOErr.make(msg + " [Line " + line + "]");
}
fanx_ObjDecoder.defaultMapType = null;
function fanx_UsingPod(p) { this.pod = p; }
fanx_UsingPod.prototype.resolve = function(n)
{
return this.pod.type(n, false);
}
function fanx_UsingType(t,n) { this.type = t; this.name = n; }
fanx_UsingType.prototype.resolve = function(n)
{
return this.name == n ? this.type : null;
}
function fanx_ObjEncoder(out, options)
{
this.out    = out;
this.level  = 0;
this.indent = 0;
this.skipDefaults = false;
this.skipErrors   = false;
this.curFieldType = null;
if (options != null) this.initOptions(options);
}
fanx_ObjEncoder.encode = function(obj)
{
var buf = fan.sys.StrBuf.make();
var out = new fan.sys.StrBufOutStream(buf);
new fanx_ObjEncoder(out, null).writeObj(obj);
return buf.toStr();
}
fanx_ObjEncoder.prototype.writeObj = function(obj)
{
if (obj == null)
{
this.w("null");
return;
}
var t = typeof obj;
if (t === "boolean") { this.w(obj.toString()); return; }
if (t === "number")  { this.w(obj.toString()); return; }
if (t === "string")  { this.wStrLiteral(obj.toString(), '"'); return; }
var f = obj.$fanType;
if (f === fan.sys.Float.$type)   { fan.sys.Float.encode(obj, this); return; }
if (f === fan.sys.Decimal.$type) { fan.sys.Decimal.encode(obj, this); return; }
if (obj.$literalEncode)
{
obj.$literalEncode(this);
return;
}
var type = fan.sys.ObjUtil.$typeof(obj);
var ser = type.facet(fan.sys.Serializable.$type, false);
if (ser != null)
{
if (ser.m_simple)
this.writeSimple(type, obj);
else
this.writeComplex(type, obj, ser);
}
else
{
if (this.skipErrors)
this.w("null /\u002A Not serializable: ").w(type.qname()).w(" */");
else
throw fan.sys.IOErr.make("Not serializable: " + type);
}
}
fanx_ObjEncoder.prototype.writeSimple = function(type, obj)
{
var str = fan.sys.ObjUtil.toStr(obj);
this.wType(type).w('(').wStrLiteral(str, '"').w(')');
}
fanx_ObjEncoder.prototype.writeComplex = function(type, obj, ser)
{
this.wType(type);
var first = true;
var defObj = null;
if (this.skipDefaults)
{
try { defObj = fan.sys.ObjUtil.$typeof(obj).make(); } catch(e) {}
}
var fields = type.fields();
for (var i=0; i<fields.size(); ++i)
{
var f = fields.get(i);
if (f.isStatic() || f.isSynthetic() || f.hasFacet(fan.sys.Transient.$type))
continue;
var val = f.get(obj);
if (defObj != null)
{
var defVal = f.get(defObj);
if (fan.sys.ObjUtil.equals(val, defVal)) continue;
}
if (first) { this.w('\n').wIndent().w('{').w('\n'); this.level++; first = false; }
this.wIndent().w(f.$name()).w('=');
this.curFieldType = f.type().toNonNullable();
this.writeObj(val);
this.curFieldType = null;
this.w('\n');
}
if (ser.m_collection)
first = this.writeCollectionItems(type, obj, first);
if (!first) { this.level--; this.wIndent().w('}'); }
}
fanx_ObjEncoder.prototype.writeCollectionItems = function(type, obj, first)
{
var m = type.method("each", false);
if (m == null) throw fan.sys.IOErr.make("Missing " + type.qname() + ".each");
var enc = this;
var it  = fan.sys.Func.make(
fan.sys.List.make(fan.sys.Param.$type),
fan.sys.Void.$type,
function(obj)
{
if (first) { enc.w('\n').wIndent().w('{').w('\n'); enc.level++; first = false; }
enc.wIndent();
enc.writeObj(obj);
enc.w(',').w('\n');
return null;
});
m.invoke(obj, fan.sys.List.make(fan.sys.Obj.$type, [it]));
return first;
}
fanx_ObjEncoder.prototype.writeList = function(list)
{
var of = list.of();
var nl = this.isMultiLine(of);
var inferred = false;
if (this.curFieldType != null && (this.curFieldType instanceof fan.sys.ListType))
{
inferred = true;
}
this.curFieldType = null;
if (!inferred) this.wType(of);
var size = list.size();
if (size == 0) { this.w("[,]"); return; }
if (nl) this.w('\n').wIndent();
this.w('[');
this.level++;
for (var i=0; i<size; ++i)
{
if (i > 0) this.w(',');
if (nl) this.w('\n').wIndent();
this.writeObj(list.get(i));
}
this.level--;
if (nl) this.w('\n').wIndent();
this.w(']');
}
fanx_ObjEncoder.prototype.writeMap = function(map)
{
var t = map.$typeof();
var nl = this.isMultiLine(t.k) || this.isMultiLine(t.v);
var inferred = false;
if (this.curFieldType != null && (this.curFieldType instanceof fan.sys.MapType))
{
inferred = true;
}
this.curFieldType = null;
if (!inferred) this.wType(t);
if (map.isEmpty()) { this.w("[:]"); return; }
this.level++;
this.w('[');
var first = true;
var keys = map.keys();
for (var i=0; i<keys.size(); i++)
{
if (first) first = false; else this.w(',');
if (nl) this.w('\n').wIndent();
var key = keys.get(i);
var val = map.get(key);
this.writeObj(key); this.w(':'); this.writeObj(val);
}
this.w(']');
this.level--;
}
fanx_ObjEncoder.prototype.isMultiLine = function(t)
{
return t.pod() != fan.sys.Pod.$sysPod;
}
fanx_ObjEncoder.prototype.wType = function(t)
{
return this.w(t.signature());
}
fanx_ObjEncoder.prototype.wStrLiteral = function(s, quote)
{
var len = s.length;
this.w(quote);
for (var i=0; i<len; ++i)
{
var c = s.charAt(i);
switch (c)
{
case '\n': this.w('\\').w('n'); break;
case '\r': this.w('\\').w('r'); break;
case '\f': this.w('\\').w('f'); break;
case '\t': this.w('\\').w('t'); break;
case '\\': this.w('\\').w('\\'); break;
case '"':  if (quote == '"') this.w('\\').w('"'); else this.w(c); break;
case '`':  if (quote == '`') this.w('\\').w('`'); else this.w(c); break;
case '$':  this.w('\\').w('$'); break;
default:   this.w(c);
}
}
return this.w(quote);
}
fanx_ObjEncoder.prototype.wIndent = function()
{
var num = this.level * this.indent;
for (var i=0; i<num; ++i) this.w(' ');
return this;
}
fanx_ObjEncoder.prototype.w = function(s)
{
var len = s.length;
for (var i=0; i<len; ++i)
this.out.writeChar(s.charCodeAt(i));
return this;
}
fanx_ObjEncoder.prototype.initOptions = function(options)
{
this.indent = fanx_ObjEncoder.option(options, "indent", this.indent);
this.skipDefaults = fanx_ObjEncoder.option(options, "skipDefaults", this.skipDefaults);
this.skipErrors = fanx_ObjEncoder.option(options, "skipErrors", this.skipErrors);
}
fanx_ObjEncoder.option = function(options, name, def)
{
var val = options.get(name);
if (val == null) return def;
return val;
}
function fanx_Tokenizer(input)
{
this.input = null;
this.type  = null;
this.val   = null;
this.line  = 1;
this.$undo = null;
this.cur   = 0;
this.curt  = 0;
this.peek  = 0;
this.peekt = 0;
this.input = input;
this.consume();
this.consume();
}
fanx_Tokenizer.prototype.next = function()
{
if (this.$undo != null) { this.$undo.reset(this); this.$undo = null; return this.type; }
this.val = null;
return this.type = this.doNext();
}
fanx_Tokenizer.prototype.doNext = function()
{
while (true)
{
while (this.curt == fanx_Tokenizer.SPACE) this.consume();
if (this.cur < 0) return fanx_Token.EOF;
if (this.curt == fanx_Tokenizer.ALPHA) return this.id();
if (this.curt == fanx_Tokenizer.DIGIT) return this.number(false);
switch (this.cur)
{
case  43:  this.consume(); return this.number(false);
case  45:  this.consume(); return this.number(true);
case  34:  return this.str();
case  39:  return this.ch();
case  96:  return this.uri();
case  40:  this.consume(); return fanx_Token.LPAREN;
case  41:  this.consume(); return fanx_Token.RPAREN;
case  44:  this.consume(); return fanx_Token.COMMA;
case  59:  this.consume(); return fanx_Token.SEMICOLON;
case  61:  this.consume(); return fanx_Token.EQ;
case  123: this.consume(); return fanx_Token.LBRACE;
case  125: this.consume(); return fanx_Token.RBRACE;
case  35:  this.consume(); return fanx_Token.POUND;
case  63:  this.consume(); return fanx_Token.QUESTION;
case  46:
if (this.peekt == fanx_Tokenizer.DIGIT) return this.number(false);
this.consume();
return fanx_Token.DOT;
case  91:
this.consume();
if (this.cur == 93 ) { this.consume(); return fanx_Token.LRBRACKET; }
return fanx_Token.LBRACKET;
case  93:
this.consume();
return fanx_Token.RBRACKET;
case  58:
this.consume();
if (this.cur == 58 ) { this.consume(); return fanx_Token.DOUBLE_COLON; }
return fanx_Token.COLON;
case  42:
if (this.peek == 42 ) { this.skipCommentSL(); continue; }
break;
case  47:
if (this.peek == 47 ) { this.skipCommentSL(); continue; }
if (this.peek == 42 ) { this.skipCommentML(); continue; }
break;
}
throw this.err("Unexpected symbol: " + this.cur + " (0x" + this.cur.toString(16) + ")");
}
}
fanx_Tokenizer.prototype.id = function()
{
var val = "";
var first = this.cur;
while ((this.curt == fanx_Tokenizer.ALPHA || this.curt == fanx_Tokenizer.DIGIT) && this.cur > 0)
{
val += String.fromCharCode(this.cur);
this.consume();
}
switch (first)
{
case  97:
if (val == "as") { return fanx_Token.AS; }
break;
case  102:
if (val == "false") { this.val = false; return fanx_Token.BOOL_LITERAL; }
break;
case  110:
if (val == "null") { this.val = null; return fanx_Token.NULL_LITERAL; }
break;
case  116:
if (val == "true") { this.val = true; return fanx_Token.BOOL_LITERAL; }
break;
case  117:
if (val == "using") { return fanx_Token.USING; }
break;
}
this.val = val;
return fanx_Token.ID;
}
fanx_Tokenizer.prototype.number = function(neg)
{
if (this.cur == 48 && this.peek == 120/*'x'*/)
return this.hex();
var s = null;
var whole = 0;
var wholeCount = 0;
while (this.curt == fanx_Tokenizer.DIGIT)
{
if (s != null)
{
s += String.fromCharCode(this.cur);
}
else
{
whole = whole*10 + (this.cur - 48);
wholeCount++;
if (wholeCount >= 18) { s = (neg) ? "-" : ""; s += whole; }
}
this.consume();
if (this.cur == 95) this.consume();
}
var floating = false;
if (this.cur == 46 && this.peekt == fanx_Tokenizer.DIGIT)
{
floating = true;
if (s == null) { s = (neg) ? "-" : ""; s += whole; }
s += '.';
this.consume();
while (this.curt == fanx_Tokenizer.DIGIT)
{
s += String.fromCharCode(this.cur);
this.consume();
if (this.cur == 95) this.consume();
}
}
if (this.cur == 101 || this.cur == 69/*'E'*/)
{
floating = true;
if (s == null) { s = (neg) ? "-" : ""; s += whole; }
s += 'e';
this.consume();
if (this.cur == 45 || this.cur == 43/*'+'*/) { s += String.fromCharCode(this.cur); this.consume(); }
if (this.curt != fanx_Tokenizer.DIGIT) throw this.err("Expected exponent digits");
while (this.curt == fanx_Tokenizer.DIGIT)
{
s += String.fromCharCode(this.cur);
this.consume();
if (this.cur == 95) this.consume();
}
}
var floatSuffix  = false;
var decimalSuffix = false;
var dur = -1;
if (100 <= this.cur && this.cur <= 115/*'s'*/)
{
if (this.cur == 110 && this.peek == 115/*'s'*/) { this.consume(); this.consume(); dur = 1; }
if (this.cur == 109 && this.peek == 115/*'s'*/) { this.consume(); this.consume(); dur = 1000000; }
if (this.cur == 115 && this.peek == 101/*'e'*/) { this.consume(); this.consume(); if (this.cur != 99/*'c'*/) throw this.err("Expected 'sec' in Duration literal"); this.consume(); dur = 1000000000; }
if (this.cur == 109 && this.peek == 105/*'i'*/) { this.consume(); this.consume(); if (this.cur != 110/*'n'*/) throw this.err("Expected 'min' in Duration literal"); this.consume(); dur = 60000000000; }
if (this.cur == 104 && this.peek == 114/*'r'*/) { this.consume(); this.consume(); dur = 3600000000000; }
if (this.cur == 100 && this.peek == 97/*'a'*/)  { this.consume(); this.consume(); if (this.cur != 121/*'y'*/) throw this.err("Expected 'day' in Duration literal"); this.consume(); dur = 86400000000000; }
}
if (this.cur == 102 || this.cur == 70/*'F'*/)
{
this.consume();
floatSuffix = true;
}
else if (this.cur == 100 || this.cur == 68/*'D'*/)
{
this.consume();
decimalSuffix = true;
}
if (neg) whole = -whole;
try
{
if (floatSuffix)
{
if (s == null)
this.val = fan.sys.Float.make(whole);
else
this.val = fan.sys.Float.fromStr(s);
return fanx_Token.FLOAT_LITERAL;
}
if (decimalSuffix || floating)
{
var num = (s == null) ? whole : fan.sys.Float.fromStr(s);
if (dur > 0)
{
this.val = fan.sys.Duration.make(num * dur);
return fanx_Token.DURATION_LITERAL;
}
else
{
this.val = fan.sys.Decimal.make(num);
return fanx_Token.DECIMAL_LITERAL;
}
}
var num = (s == null) ? whole : Math.floor(fan.sys.Float.fromStr(s, true));
if (dur > 0)
{
this.val = fan.sys.Duration.make(num*dur);
return fanx_Token.DURATION_LITERAL;
}
else
{
this.val = num;
return fanx_Token.INT_LITERAL;
}
}
catch (e)
{
throw this.err("Invalid numeric literal: " + s);
}
}
fanx_Tokenizer.prototype.hex = function()
{
this.consume();
this.consume();
var type = fanx_Token.INT_LITERAL;
var val = this.$hex(this.cur);
if (val < 0) throw this.err("Expecting hex number");
var str = String.fromCharCode(this.cur);
this.consume();
var nibCount = 1;
while (true)
{
var nib = this.$hex(this.cur);
if (nib < 0)
{
if (this.cur == 95) { this.consume(); continue; }
break;
}
str += String.fromCharCode(this.cur);
nibCount++;
if (nibCount > 16) throw this.err("Hex literal too big");
this.consume();
}
this.val = fan.sys.Int.fromStr(str, 16);
return type;
}
fanx_Tokenizer.prototype.$hex = function(c)
{
if (48 <= c && c <= 57) return c - 48;
if (97 <= c && c <= 102) return c - 97 + 10;
if (65 <= c && c <= 70) return c - 65 + 10;
return -1;
}
fanx_Tokenizer.prototype.str = function()
{
this.consume();
var s = "";
var loop = true;
while (loop)
{
switch (this.cur)
{
case 34:   this.consume(); loop = false; break;
case -1:          throw this.err("Unexpected end of string");
case 36:   throw this.err("Interpolated strings unsupported");
case 92:  s += this.escape(); break;
case 13:  s += '\n'; this.consume(); break;
default:          s += String.fromCharCode(this.cur); this.consume(); break;
}
}
this.val = s;
return fanx_Token.STR_LITERAL;
}
fanx_Tokenizer.prototype.ch = function()
{
this.consume();
var c;
if (this.cur == 92)
{
c = this.escape();
}
else
{
c = this.cur;
this.consume();
}
if (this.cur != 39) throw this.err("Expecting ' close of char literal");
this.consume();
this.val = c;
return fanx_Token.INT_LITERAL;
}
fanx_Tokenizer.prototype.escape = function()
{
if (this.cur != 92) throw this.err("Internal error");
this.consume();
switch (this.cur)
{
case   98:   this.consume(); return '\b';
case   102:  this.consume(); return '\f';
case   110:  this.consume(); return '\n';
case   114:  this.consume(); return '\r';
case   116:  this.consume(); return '\t';
case   36:   this.consume(); return '$';
case   34:   this.consume(); return '"';
case  39:   this.consume(); return '\'';
case   96:   this.consume(); return '`';
case  92:   this.consume(); return '\\';
}
if (this.cur == 117)
{
this.consume();
var n3 = this.$hex(this.cur); this.consume();
var n2 = this.$hex(this.cur); this.consume();
var n1 = this.$hex(this.cur); this.consume();
var n0 = this.$hex(this.cur); this.consume();
if (n3 < 0 || n2 < 0 || n1 < 0 || n0 < 0) throw this.err("Invalid hex value for \\uxxxx");
return String.fromCharCode((n3 << 12) | (n2 << 8) | (n1 << 4) | n0);
}
throw this.err("Invalid escape sequence");
}
fanx_Tokenizer.prototype.uri = function()
{
this.consume();
var s = "";
while (true)
{
if (this.cur < 0) throw this.err("Unexpected end of uri");
if (this.cur == 92)
{
s += this.escape();
}
else
{
if (this.cur == 96) { this.consume(); break; }
s += String.fromCharCode(this.cur);
this.consume();
}
}
this.val = fan.sys.Uri.fromStr(s);
return fanx_Token.URI_LITERAL;
}
fanx_Tokenizer.prototype.skipCommentSL = function()
{
this.consume();
this.consume();
while (true)
{
if (this.cur == 10 || this.cur == 13/*'\r'*/) { this.consume(); break; }
if (this.cur < 0) break;
this.consume();
}
return null;
}
fanx_Tokenizer.prototype.skipCommentML = function()
{
this.consume();
this.consume();
var depth = 1;
while (true)
{
if (this.cur == 42 && this.peek == 47/*'/'*/) { this.consume(); this.consume(); depth--; if (depth <= 0) break; }
if (this.cur == 47 && this.peek == 42/*'*'*/) { this.consume(); this.consume(); depth++; continue; }
if (this.cur < 0) break;
this.consume();
}
return null;
}
fanx_Tokenizer.prototype.err = function(msg)
{
return fanx_ObjDecoder.err(msg, this.line);
}
fanx_Tokenizer.prototype.consume = function()
{
if (this.cur == 10 || this.cur == 13/*'\r'*/) this.line++;
var c = this.input.readChar();
if (c == 10 && this.peek == 13/*'\r'*/) c = this.input.readChar();
if (c == null) c = -1;
this.cur   = this.peek;
this.curt  = this.peekt;
this.peek  = c;
this.peekt = 0 < c && c < 128 ? fanx_Tokenizer.charMap[c] : fanx_Tokenizer.ALPHA;
}
fanx_Tokenizer.prototype.undo = function(type, val, line)
{
if (this.$undo != null) throw new fan.sys.Err.make("only one pushback supported");
this.$undo = new fanx_Undo(type, val, line);
}
fanx_Tokenizer.prototype.reset = function(type, val, line)
{
this.type = type;
this.val  = val;
this.line = line;
return type;
}
fanx_Tokenizer.charMap = [];
fanx_Tokenizer.SPACE = 1;
fanx_Tokenizer.ALPHA = 2;
fanx_Tokenizer.DIGIT = 3;
fanx_Tokenizer.charMap[32 ]  = fanx_Tokenizer.SPACE;
fanx_Tokenizer.charMap[10 ] = fanx_Tokenizer.SPACE;
fanx_Tokenizer.charMap[13 ] = fanx_Tokenizer.SPACE;
fanx_Tokenizer.charMap[9  ] = fanx_Tokenizer.SPACE;
for (var i=97; i<=122/*'z'*/; ++i) fanx_Tokenizer.charMap[i] = fanx_Tokenizer.ALPHA;
for (var i=65; i<=90/*'Z'*/;  ++i) fanx_Tokenizer.charMap[i] = fanx_Tokenizer.ALPHA;
fanx_Tokenizer.charMap[95 ] = fanx_Tokenizer.ALPHA;
for (var i=48; i<=57/*'9'*/; ++i) fanx_Tokenizer.charMap[i] = fanx_Tokenizer.DIGIT;
function fanx_Undo(t, v, l) { this.type = t; this.val = v; this.line = l; }
fanx_Undo.prototype.reset = function(t) { t.reset(this.type, this.val, this.line); }
with (fan.sys.Pod.$add('sys'))
{
  fan.sys.Obj.$type = $at('Obj',null,[],{},8705);
  fan.sys.Type.$type = $at('Type','sys::Obj',[],{},8706);
  fan.sys.Sys.initGenericParamTypes();
  fan.sys.Facet.$type = $am('Facet','sys::Obj',[],{},8963);
  fan.sys.TimeZone.$type = $at('TimeZone','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8706);
  fan.sys.Uri.$type = $at('Uri','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Num.$type = $at('Num','sys::Obj',[],{},8707);
  fan.sys.Int.$type = $at('Int','sys::Num',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Err.$type = $at('Err','sys::Obj',[],{},8706);
  fan.sys.CancelledErr.$type = $at('CancelledErr','sys::Err',[],{},8706);
  fan.sys.Unsafe.$type = $at('Unsafe','sys::Obj',[],{},8738);
  fan.sys.Pod.$type = $at('Pod','sys::Obj',[],{},8738);
  fan.sys.Void.$type = $at('Void','sys::Obj',[],{},8738);
  fan.sys.ConstErr.$type = $at('ConstErr','sys::Err',[],{},8706);
  fan.sys.Version.$type = $at('Version','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.ArgErr.$type = $at('ArgErr','sys::Err',[],{},8706);
  fan.sys.Date.$type = $at('Date','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Enum.$type = $at('Enum','sys::Obj',[],{},8707);
  fan.sys.Endian.$type = $at('Endian','sys::Enum',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8746);
  fan.sys.Test.$type = $at('Test','sys::Obj',[],{},8705);
  fan.sys.TestErr.$type = $at('TestErr','sys::Err',[],{},8706);
  fan.sys.NameErr.$type = $at('NameErr','sys::Err',[],{},8706);
  fan.sys.Duration.$type = $at('Duration','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Decimal.$type = $at('Decimal','sys::Num',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.TimeoutErr.$type = $at('TimeoutErr','sys::Err',[],{},8706);
  fan.sys.IOErr.$type = $at('IOErr','sys::Err',[],{},8706);
  fan.sys.Locale.$type = $at('Locale','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8706);
  fan.sys.UnresolvedErr.$type = $at('UnresolvedErr','sys::Err',[],{},8706);
  fan.sys.This.$type = $at('This','sys::Obj',[],{},8738);
  fan.sys.UnknownSlotErr.$type = $at('UnknownSlotErr','sys::Err',[],{},8706);
  fan.sys.StrBuf.$type = $at('StrBuf','sys::Obj',[],{},8736);
  fan.sys.ReadonlyErr.$type = $at('ReadonlyErr','sys::Err',[],{},8706);
  fan.sys.LogRec.$type = $at('LogRec','sys::Obj',[],{},8706);
  fan.sys.Func.$type = $at('Func','sys::Obj',[],{},8736);
  fan.sys.Range.$type = $at('Range','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.IndexErr.$type = $at('IndexErr','sys::Err',[],{},8706);
  fan.sys.Log.$type = $at('Log','sys::Obj',[],{},8706);
  fan.sys.Weekday.$type = $at('Weekday','sys::Enum',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8746);
  fan.sys.Buf.$type = $at('Buf','sys::Obj',[],{},8704);
  fan.sys.MemBuf.$type = $at('MemBuf','sys::Buf',[],{},640);
  fan.sys.ConstBuf.$type = $at('ConstBuf','sys::Buf',[],{},640);
  fan.sys.Charset.$type = $at('Charset','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Depend.$type = $at('Depend','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Str.$type = $at('Str','sys::Obj',[],{},8738);
  fan.sys.Bool.$type = $at('Bool','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.MimeType.$type = $at('MimeType','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Regex.$type = $at('Regex','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.OutStream.$type = $at('OutStream','sys::Obj',[],{},8704);
  fan.sys.SysOutStream.$type = $at('SysOutStream','sys::OutStream',[],{},640);
  fan.sys.LogLevel.$type = $at('LogLevel','sys::Enum',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8746);
  fan.sys.Time.$type = $at('Time','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.UnknownTypeErr.$type = $at('UnknownTypeErr','sys::Err',[],{},8706);
  fan.sys.Month.$type = $at('Month','sys::Enum',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8746);
  fan.sys.CastErr.$type = $at('CastErr','sys::Err',[],{},8706);
  fan.sys.ParseErr.$type = $at('ParseErr','sys::Err',[],{},8706);
  fan.sys.DateTime.$type = $at('DateTime','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.NotImmutableErr.$type = $at('NotImmutableErr','sys::Err',[],{},8706);
  fan.sys.UnknownPodErr.$type = $at('UnknownPodErr','sys::Err',[],{},8706);
  fan.sys.List.$type = $at('List','sys::Obj',[],{'sys::Serializable':""},8736);
  fan.sys.FileStore.$type = $at('FileStore','sys::Obj',[],{},8707);
  fan.sys.LocalFileStore.$type = $at('LocalFileStore','sys::FileStore',[],{},642);
  fan.sys.Unit.$type = $at('Unit','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8706);
  fan.sys.RegexMatcher.$type = $at('RegexMatcher','sys::Obj',[],{},8736);
  fan.sys.Slot.$type = $at('Slot','sys::Obj',[],{},8707);
  fan.sys.Field.$type = $at('Field','sys::Slot',[],{},8706);
  fan.sys.FieldNotSetErr.$type = $at('FieldNotSetErr','sys::Err',[],{},8706);
  fan.sys.Method.$type = $at('Method','sys::Slot',[],{},8706);
  fan.sys.Serializable.$type = $at('Serializable','sys::Obj',['sys::Facet'],{'sys::FacetMeta':"sys::FacetMeta{inherited=true;}",'sys::Serializable':""},8754);
  fan.sys.Transient.$type = $at('Transient','sys::Obj',['sys::Facet'],{},8754);
  fan.sys.Js.$type = $at('Js','sys::Obj',['sys::Facet'],{},8754);
  fan.sys.NoDoc.$type = $at('NoDoc','sys::Obj',['sys::Facet'],{},8754);
  fan.sys.Deprecated.$type = $at('Deprecated','sys::Obj',['sys::Facet'],{'sys::Serializable':""},8754);
  fan.sys.Operator.$type = $at('Operator','sys::Obj',['sys::Facet'],{},8754);
  fan.sys.FacetMeta.$type = $at('FacetMeta','sys::Obj',['sys::Facet'],{'sys::Serializable':""},8754);
  fan.sys.UnknownServiceErr.$type = $at('UnknownServiceErr','sys::Err',[],{},8706);
  fan.sys.NullErr.$type = $at('NullErr','sys::Err',[],{},8706);
  fan.sys.Uuid.$type = $at('Uuid','sys::Obj',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.UnsupportedErr.$type = $at('UnsupportedErr','sys::Err',[],{},8706);
  fan.sys.UnknownKeyErr.$type = $at('UnknownKeyErr','sys::Err',[],{},8706);
  fan.sys.UnknownFacetErr.$type = $at('UnknownFacetErr','sys::Err',[],{},8706);
  fan.sys.InStream.$type = $at('InStream','sys::Obj',[],{},8704);
  fan.sys.SysInStream.$type = $at('SysInStream','sys::InStream',[],{},640);
  fan.sys.File.$type = $at('File','sys::Obj',[],{},8707);
  fan.sys.LocalFile.$type = $at('LocalFile','sys::File',[],{},642);
  fan.sys.InterruptedErr.$type = $at('InterruptedErr','sys::Err',[],{},8706);
  fan.sys.Env.$type = $at('Env','sys::Obj',[],{},8707);
  fan.sys.Map.$type = $at('Map','sys::Obj',[],{'sys::Serializable':""},8736);
  fan.sys.Param.$type = $at('Param','sys::Obj',[],{},8738);
  fan.sys.Float.$type = $at('Float','sys::Num',[],{'sys::Serializable':"sys::Serializable{simple=true;}"},8738);
  fan.sys.Obj.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Type.$type.$am('inheritance',8192,'sys::Type[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isSynthetic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('facets',8192,'sys::Facet[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mixins',8192,'sys::Type[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',40962,'sys::Type?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('qname',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('isFacet',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('method',8192,'sys::Method?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('params',8192,'[sys::Str:sys::Type]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fits',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false)]),{}).$am('isInternal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('slots',8192,'sys::Slot[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('field',8192,'sys::Field?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isNullable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doc',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fields',8192,'sys::Field[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toNonNullable',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasFacet',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('pod',8192,'sys::Pod?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('signature',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('methods',8192,'sys::Method[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('slot',8192,'sys::Slot?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('toNullable',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('emptyList',8192,'sys::Obj[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isConst',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('of',40962,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('isPublic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isFinal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8192,'sys::Obj',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj[]?',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isClass',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parameterize',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('params','[sys::Str:sys::Type]',false)]),{}).$am('isGeneric',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isEnum',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isVal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isAbstract',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isMixin',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('toListOf',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('facet',8192,'sys::Facet?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('base',8192,'sys::Type?',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Facet.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.TimeZone.$type.$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cur',40962,'sys::TimeZone',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('offset',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)]),{}).$am('utc',40962,'sys::TimeZone',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fullName',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dstOffset',8192,'sys::Duration?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)]),{}).$am('stdAbbr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::TimeZone?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('listFullNames',40962,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('rel',40962,'sys::TimeZone',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dstAbbr',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)]),{}).$am('listNames',40962,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('defVal',40962,'sys::TimeZone',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Uri.$type.$af('defVal',106498,'sys::Uri',{}).$af('sectionFrag',106498,'sys::Int',{}).$af('sectionQuery',106498,'sys::Int',{}).$af('sectionPath',106498,'sys::Int',{}).$am('encode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plusName',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('asDir','sys::Bool',true)]),{}).$am('userInfo',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parent',8192,'sys::Uri?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('relTo',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('base','sys::Uri',false)]),{}).$am('encodeQuery',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('q','[sys::Str:sys::Str]',false)]),{}).$am('auth',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('mimeType',8192,'sys::MimeType?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decode',40962,'sys::Uri?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('checkName',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('escapeToken',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('section','sys::Int',false)]),{}).$am('path',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isAbs',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRange',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)]),{}).$am('host',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('pathStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unescapeToken',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ext',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decodeQuery',40962,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('query',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plusSlash',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decodeToken',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('section','sys::Int',false)]),{}).$am('plus',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('toAppend','sys::Uri',false)]),{}).$am('basename',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromStr',40966,'sys::Uri?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('port',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toFile',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRangeToPathAbs',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('queryStr',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('relToAuth',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('frag',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('scheme',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isPathAbs',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('base','sys::Obj?',true),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('plusQuery',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('query','[sys::Str:sys::Str]?',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pathOnly',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isPathRel',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isRel',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isPathOnly',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isName',40962,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('encodeToken',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('section','sys::Int',false)]),{}).$am('isDir',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Num.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toInt',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('localePercent',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('localeNaN',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('localeMinus',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeNegInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('localeDecimal',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeGrouping',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localePosInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Int.$type.$af('maxVal',106498,'sys::Int',{}).$af('minVal',106498,'sys::Int',{}).$af('defVal',106498,'sys::Int',{}).$am('shiftl',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('mult',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('mod',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('localePercent',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('divFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('upper',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isSpace',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('div',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('plusFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('localeUpper',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isUpper',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('shiftr',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('equalsIgnoreCase',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ch','sys::Int',false)]),{}).$am('toDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clamp',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('min','sys::Int',false),new fan.sys.Param('max','sys::Int',false)]),{}).$am('toDateTime',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('modFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('multFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('isAlphaNum',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toRadix',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',false),new fan.sys.Param('width','sys::Int?',true)]),{}).$am('isAlpha',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('base','sys::Int',true)]),{}).$am('lower',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plus',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('divDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('localeIsLower',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeMinus',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromStr',40966,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('radix','sys::Int',true),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('toHex',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int?',true)]),{}).$am('localeNegInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('shifta',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('isDigit',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true)]),{}).$am('localeLower',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDuration',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeGrouping',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minus',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('isEven',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('increment',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plusDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('localeIsUpper',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('random',40962,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range?',true)]),{}).$am('not',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('times',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int->sys::Void|',false)]),{}).$am('minusDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('min',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Int',false)]),{}).$am('and',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('minusFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('isOdd',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pow',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pow','sys::Int',false)]),{}).$am('xor',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDigit',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toChar',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('toInt',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('modDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('or',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('max',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Int',false)]),{}).$am('toFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromDigit',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true)]),{}).$am('localeNaN',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('abs',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('negate',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decrement',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('isLower',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeDecimal',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('multDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('clip',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('min','sys::Int',false),new fan.sys.Param('max','sys::Int',false)]),{}).$am('localePosInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Err.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.CancelledErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Unsafe.$type.$am('val',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj?',false)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Pod.$type.$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('log',8192,'sys::Log',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('orderByDepends',40962,'sys::Pod[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pods','sys::Pod[]',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('type',8192,'sys::Type?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('locale',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('def','sys::Str?',true)]),{}).$am('file',8192,'sys::File?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('load',40962,'sys::Pod',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',40962,'sys::Pod?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('of',40962,'sys::Pod?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('flattenDepends',40962,'sys::Pod[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pods','sys::Pod[]',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('types',8192,'sys::Type[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('depends',8192,'sys::Depend[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('list',40962,'sys::Pod[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('version',8192,'sys::Version',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('uri',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('props',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('maxAge','sys::Duration',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('meta',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('files',8192,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doc',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('config',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('def','sys::Str?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Void.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.ConstErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Version.$type.$af('defVal',106498,'sys::Version',{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('minor',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('segments',8192,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('patch',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Version?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('version','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('major',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('build',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::Version?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('segments','sys::Int[]',false)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.ArgErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Date.$type.$af('defVal',106498,'sys::Date',{}).$am('minus',8192,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('days','sys::Duration',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('firstOfMonth',8192,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('weekOfYear',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('startOfWeek','sys::Weekday',true)]),{}).$am('year',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dayOfYear',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromLocale',40962,'sys::Date?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('weekday',8192,'sys::Weekday',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isToday',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('yesterday',40962,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('lastOfMonth',8192,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('today',40962,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toIso',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::Date?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false),new fan.sys.Param('month','sys::Month',false),new fan.sys.Param('day','sys::Int',false)]),{}).$am('day',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDateTime',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Time',false),new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('midnight',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tomorrow',40962,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('fromIso',40962,'sys::Date?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isTomorrow',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plus',8192,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('days','sys::Duration',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Date?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('month',8192,'sys::Month',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minusDate',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('days','sys::Date',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('isYesterday',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Enum.$type.$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('doFromStr',36866,'sys::Enum?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ordinal','sys::Int',false),new fan.sys.Param('name','sys::Str',false)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ordinal',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Endian.$type.$af('big',106506,'sys::Endian',{}).$af('vals',106498,'sys::Endian[]',{}).$af('little',106506,'sys::Endian',{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Endian?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('doFromStr',36866,'sys::Enum?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ordinal',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Test.$type.$am('curTestMethod',8192,'sys::Method',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('verifyErr',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('errType','sys::Type?',false),new fan.sys.Param('c','|sys::Test->sys::Void|',false)]),{}).$am('verifyNotEq',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('verifyTrue',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cond','sys::Bool',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('verifyNull',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('verifySame',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('verifyErrMsg',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('errType','sys::Type',false),new fan.sys.Param('errMsg','sys::Str',false),new fan.sys.Param('c','|sys::Test->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('verify',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cond','sys::Bool',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('teardown',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('verifyFalse',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cond','sys::Bool',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('verifyNotSame',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('verifyEq',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('fail',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('setup',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tempDir',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('verifyNotNull',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)]),{}).$am('verifyType',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false),new fan.sys.Param('t','sys::Type',false)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.TestErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str?',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.NameErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Duration.$type.$af('maxVal',106498,'sys::Duration',{}).$af('minVal',106498,'sys::Duration',{}).$af('defVal',106498,'sys::Duration',{}).$am('toSec',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minus',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Duration',false)]),{}).$am('toMin',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('mult',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('divFloat',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('toHour',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('div',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('min',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Duration',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('now',40962,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toMillis',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('boot',40962,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('floor',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('accuracy','sys::Duration',false)]),{}).$am('toIso',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::Duration?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ticks','sys::Int',false)]),{}).$am('clamp',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('min','sys::Duration',false),new fan.sys.Param('max','sys::Duration',false)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('multFloat',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ticks',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('max',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Duration',false)]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromIso',40962,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('plus',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Duration',false)]),{}).$am('uptime',40962,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('abs',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromStr',40966,'sys::Duration?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('nowTicks',40962,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('negate',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('toDay',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Decimal.$type.$af('defVal',106498,'sys::Decimal',{}).$am('minus',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('mult',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('mod',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('localePercent',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('modInt',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('divFloat',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('increment',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('multInt',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('div',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('plusFloat',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('min',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Decimal',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minusFloat',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plusInt',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('modFloat',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('multFloat',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('toInt',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('max',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Decimal',false)]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plus',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('localeNaN',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('abs',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeMinus',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromStr',40966,'sys::Decimal?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('negate',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decrement',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minusInt',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('localeNegInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('localeDecimal',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('divInt',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('localeGrouping',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localePosInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.TimeoutErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.IOErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Locale.$type.$af('en',106498,'sys::Locale',{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cur',40962,'sys::Locale',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('country',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('use',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('func','|sys::This->sys::Void|',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Locale?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('setCur',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('locale','sys::Locale',false)]),{}).$am('lang',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnresolvedErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.This.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnknownSlotErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.StrBuf.$type.$af('capacity',73728,'sys::Int',{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('insert',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('x','sys::Obj?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('remove',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('out',8192,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ch','sys::Int',false)]),{}).$am('replaceRange',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false),new fan.sys.Param('str','sys::Str',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRange',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)]),{}).$am('get',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('removeRange',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)]),{}).$am('join',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',false),new fan.sys.Param('sep','sys::Str',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('capacity','sys::Int',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('add',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('set',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('ch','sys::Int',false)]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('reverse',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('size',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.ReadonlyErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.LogRec.$type.$af('msg',73730,'sys::Str',{}).$af('err',73730,'sys::Err?',{}).$af('level',73730,'sys::LogLevel',{}).$af('logName',73730,'sys::Str',{}).$af('time',73730,'sys::DateTime',{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('print',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('time','sys::DateTime',false),new fan.sys.Param('level','sys::LogLevel',false),new fan.sys.Param('logName','sys::Str',false),new fan.sys.Param('message','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Func.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('retype',8192,'sys::Func',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false)]),{}).$am('method',8192,'sys::Method?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('callOn',270336,'sys::R',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','sys::Obj?',false),new fan.sys.Param('args','sys::Obj?[]?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('params',8192,'sys::Param[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('callList',270336,'sys::R',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj?[]?',false)]),{}).$am('call',270336,'sys::R',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::A',true),new fan.sys.Param('b','sys::B',true),new fan.sys.Param('c','sys::C',true),new fan.sys.Param('d','sys::D',true),new fan.sys.Param('e','sys::E',true),new fan.sys.Param('f','sys::F',true),new fan.sys.Param('g','sys::G',true),new fan.sys.Param('h','sys::H',true)]),{}).$am('arity',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('bind',8192,'sys::Func',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj?[]',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('returns',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Range.$type.$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('toList',8192,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('random',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('min',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('exclusive',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('end',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('end','sys::Int',false),new fan.sys.Param('exclusive','sys::Bool',false)]),{}).$am('map',8192,'sys::Obj?[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int->sys::Obj?|',false)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('inclusive',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('last',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('offset',8192,'sys::Range',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('offset','sys::Int',false)]),{}).$am('max',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('start',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('each',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int->sys::Void|',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('contains',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int',false)]),{}).$am('makeExclusive',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('end','sys::Int',false)]),{}).$am('fromStr',40966,'sys::Range?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('makeInclusive',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('end','sys::Int',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('eachWhile',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int->sys::Obj?|',false)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('first',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.IndexErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Log.$type.$af('level',73728,'sys::LogLevel',{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('log',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','sys::LogRec',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isDebug',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',40962,'sys::Log?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('get',40962,'sys::Log',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('isInfo',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('register','sys::Bool',false)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('info',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addHandler',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('handler','|sys::LogRec->sys::Void|',false)]),{}).$am('debug',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)]),{}).$am('err',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)]),{}).$am('isErr',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('removeHandler',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('handler','|sys::LogRec->sys::Void|',false)]),{}).$am('list',40962,'sys::Log[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('warn',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('handlers',40962,'|sys::LogRec->sys::Void|[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isEnabled',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('level','sys::LogLevel',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isWarn',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Weekday.$type.$af('thu',106506,'sys::Weekday',{}).$af('tue',106506,'sys::Weekday',{}).$af('vals',106498,'sys::Weekday[]',{}).$af('sun',106506,'sys::Weekday',{}).$af('mon',106506,'sys::Weekday',{}).$af('wed',106506,'sys::Weekday',{}).$af('fri',106506,'sys::Weekday',{}).$af('sat',106506,'sys::Weekday',{}).$am('localeStartOfWeek',40962,'sys::Weekday',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('increment',8192,'sys::Weekday',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeVals',40962,'sys::Weekday[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeAbbr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Weekday?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('doFromStr',36866,'sys::Enum?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)]),{}).$am('decrement',8192,'sys::Weekday',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeFull',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ordinal',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Buf.$type.$af('endian',73728,'sys::Endian',{}).$af('size',73728,'sys::Int',{}).$af('charset',73728,'sys::Charset',{}).$af('capacity',73728,'sys::Int',{}).$am('readF4',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)]),{}).$am('fromHex',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('readBufFully',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('fromBase64',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('readF8',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeProps',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)]),{}).$am('readS2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trim',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRange',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)]),{}).$am('readBuf',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('bytesEqual',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Buf',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('write',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)]),{}).$am('readS8',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unreadChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('printLine',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)]),{}).$am('toBase64',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI2',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('read',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('in',8192,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toBase64Uri',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fill',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false),new fan.sys.Param('times','sys::Int',false)]),{}).$am('sync',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('remaining',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toHex',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeUtf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('toFile',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('pbk',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('password','sys::Str',false),new fan.sys.Param('salt','sys::Buf',false),new fan.sys.Param('iterations','sys::Int',false),new fan.sys.Param('keyLen','sys::Int',false)]),{}).$am('writeChars',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDigest',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('unread',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('writeF4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('writeXml',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('flags','sys::Int',true)]),{}).$am('readAllLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('seek',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pos','sys::Int',false)]),{}).$am('writeBool',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('readChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('out',8192,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('random',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','sys::Int',false)]),{}).$am('flush',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readUtf',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pos',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('crc',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)]),{}).$am('readU2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('readU1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hmac',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('key','sys::Buf',false)]),{}).$am('writeF8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::Buf?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('capacity','sys::Int',true)]),{}).$am('flip',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBool',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('set',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('byte','sys::Int',false)]),{}).$am('writeBuf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)]),{}).$am('readObj',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('more',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('peekChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeObj',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('readStrToken',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)]),{}).$am('readLine',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)]),{}).$am('peek',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('print',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)]),{}).$am('internalMake',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readChars',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('eachLine',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('writeDecimal',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)]),{}).$am('dup',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.MemBuf.$type.$af('endian',73728,'sys::Endian',{}).$af('size',73728,'sys::Int',{}).$af('charset',73728,'sys::Charset',{}).$af('capacity',73728,'sys::Int',{}).$am('readF4',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)]),{}).$am('fromHex',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('readBufFully',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('fromBase64',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('readF8',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeProps',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)]),{}).$am('readS2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trim',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRange',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)]),{}).$am('readBuf',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('bytesEqual',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Buf',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('write',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)]),{}).$am('readS8',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unreadChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('init',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('printLine',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)]),{}).$am('toBase64',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI2',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('read',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('in',8192,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toBase64Uri',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fill',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false),new fan.sys.Param('times','sys::Int',false)]),{}).$am('sync',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('remaining',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toHex',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeUtf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('toFile',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('pbk',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('password','sys::Str',false),new fan.sys.Param('salt','sys::Buf',false),new fan.sys.Param('iterations','sys::Int',false),new fan.sys.Param('keyLen','sys::Int',false)]),{}).$am('writeChars',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDigest',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('unread',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('writeF4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('writeXml',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('flags','sys::Int',true)]),{}).$am('readAllLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('seek',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pos','sys::Int',false)]),{}).$am('writeBool',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('readChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('out',8192,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('random',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','sys::Int',false)]),{}).$am('flush',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readUtf',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pos',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('crc',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)]),{}).$am('readU2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('readU1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hmac',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('key','sys::Buf',false)]),{}).$am('writeF8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('flip',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBool',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('set',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('byte','sys::Int',false)]),{}).$am('writeBuf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)]),{}).$am('readObj',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('more',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('peekChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeObj',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('readStrToken',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)]),{}).$am('readLine',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)]),{}).$am('peek',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('print',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)]),{}).$am('readChars',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('eachLine',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('writeDecimal',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)]),{}).$am('dup',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.ConstBuf.$type.$af('endian',73728,'sys::Endian',{}).$af('size',73728,'sys::Int',{}).$af('charset',73728,'sys::Charset',{}).$af('capacity',73728,'sys::Int',{}).$am('readF4',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)]),{}).$am('fromHex',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('readBufFully',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('fromBase64',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('readF8',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeProps',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)]),{}).$am('readS2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trim',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRange',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)]),{}).$am('readBuf',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('bytesEqual',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Buf',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('write',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)]),{}).$am('readS8',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unreadChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('init',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('printLine',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)]),{}).$am('toBase64',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI2',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('read',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('in',8192,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toBase64Uri',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fill',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false),new fan.sys.Param('times','sys::Int',false)]),{}).$am('sync',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('remaining',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toHex',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeUtf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('toFile',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('pbk',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('password','sys::Str',false),new fan.sys.Param('salt','sys::Buf',false),new fan.sys.Param('iterations','sys::Int',false),new fan.sys.Param('keyLen','sys::Int',false)]),{}).$am('writeChars',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDigest',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('unread',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('writeF4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('writeXml',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('flags','sys::Int',true)]),{}).$am('readAllLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('seek',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pos','sys::Int',false)]),{}).$am('writeBool',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('readChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('out',8192,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('random',40962,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','sys::Int',false)]),{}).$am('flush',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readUtf',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('pos',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('crc',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)]),{}).$am('readU2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('readU1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hmac',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('key','sys::Buf',false)]),{}).$am('writeF8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('flip',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBool',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('set',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('byte','sys::Int',false)]),{}).$am('writeBuf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)]),{}).$am('readObj',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('more',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('peekChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeObj',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('readStrToken',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)]),{}).$am('readLine',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)]),{}).$am('peek',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('print',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)]),{}).$am('readChars',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('eachLine',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('writeDecimal',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)]),{}).$am('dup',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Charset.$type.$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('utf8',40962,'sys::Charset',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('utf16BE',40962,'sys::Charset',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Charset?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('utf16LE',40962,'sys::Charset',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('defVal',40962,'sys::Charset',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Depend.$type.$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('isPlus',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',true)]),{}).$am('match',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('version','sys::Version',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('version',8192,'sys::Version',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',true)]),{}).$am('isRange',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Depend?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('size',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isSimple',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',true)]),{}).$am('endVersion',8192,'sys::Version',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Str.$type.$af('defVal',106498,'sys::Str',{}).$am('mult',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('times','sys::Int',false)]),{}).$am('getSafe',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('def','sys::Int',true)]),{}).$am('upper',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('replace',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('from','sys::Str',false),new fan.sys.Param('to','sys::Str',false)]),{}).$am('indexr',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)]),{}).$am('toDisplayName',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeDecapitalize',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('justr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false)]),{}).$am('toXml',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('padr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false),new fan.sys.Param('char','sys::Int',true)]),{}).$am('justl',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false)]),{}).$am('trimEnd',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeCompare',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('padl',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false),new fan.sys.Param('char','sys::Int',true)]),{}).$am('isSpace',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeUpper',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('split',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('separator','sys::Int?',true),new fan.sys.Param('trim','sys::Bool',true)]),{}).$am('trim',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRange',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)]),{}).$am('isUpper',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numNewlines',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('equalsIgnoreCase',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('toDecimal',8192,'sys::Decimal?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('indexIgnoreCase',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)]),{}).$am('trimStart',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('all',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Bool|',false)]),{}).$am('isAlphaNum',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('in',8192,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isAlpha',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('quote','sys::Int?',true),new fan.sys.Param('escapeUnicode','sys::Bool',true)]),{}).$am('lower',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('index',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)]),{}).$am('splitLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toBool',8192,'sys::Bool?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('eachr',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Void|',false)]),{}).$am('plus',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('each',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Void|',false)]),{}).$am('capitalize',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeCapitalize',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('contains',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('isAscii',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('endsWith',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('spaces',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('localeLower',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compareIgnoreCase',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('containsChar',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ch','sys::Int',false)]),{}).$am('decapitalize',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('fromDisplayName',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trimToNull',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toInt',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('intern',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toRegex',8192,'sys::Regex',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toUri',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toFloat',8192,'sys::Float?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('fromChars',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('chars','sys::Int[]',false)]),{}).$am('reverse',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('any',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Bool|',false)]),{}).$am('toBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('charset','sys::Charset',true)]),{}).$am('indexrIgnoreCase',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('isLower',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('eachWhile',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Obj?|',false)]),{}).$am('chars',8192,'sys::Int[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('startsWith',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{});
  fan.sys.Bool.$type.$af('defVal',106498,'sys::Bool',{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('or',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('not',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromStr',40966,'sys::Bool?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('and',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('xor',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.MimeType.$type.$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('charset',8192,'sys::Charset',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('noParams',8192,'sys::MimeType',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('forExt',40962,'sys::MimeType?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ext','sys::Str',false)]),{}).$am('mediaType',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('params',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::MimeType?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('subType',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('parseParams',40962,'[sys::Str:sys::Str]?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Regex.$type.$af('defVal',106498,'sys::Regex',{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('glob',40962,'sys::Regex',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false)]),{}).$am('flags',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('matcher',8192,'sys::RegexMatcher',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('matches',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('quote',40962,'sys::Regex',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false)]),{}).$am('split',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('limit','sys::Int',true)]),{}).$am('fromStr',40966,'sys::Regex?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('flags','sys::Str',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.OutStream.$type.$af('charset',73728,'sys::Charset',{}).$af('endian',73728,'sys::Endian',{}).$af('xmlEscQuotes',106498,'sys::Int',{}).$af('xmlEscUnicode',106498,'sys::Int',{}).$af('xmlEscNewlines',106498,'sys::Int',{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('writeF4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('writeXml',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('mode','sys::Int',true)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('writeBool',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('writeProps',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false),new fan.sys.Param('close','sys::Bool',true)]),{}).$am('flush',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numPendingBits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeF8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream?',false)]),{}).$am('write',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)]),{}).$am('close',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('writeBits',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Int',false),new fan.sys.Param('num','sys::Int',false)]),{}).$am('printLine',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)]),{}).$am('writeI2',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('writeBuf',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)]),{}).$am('writeI8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('writeObj',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('sync',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('print',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('writeUtf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('writeDecimal',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)]),{}).$am('writeChars',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.SysOutStream.$type.$af('charset',73728,'sys::Charset',{}).$af('endian',73728,'sys::Endian',{}).$af('xmlEscQuotes',106498,'sys::Int',{}).$af('xmlEscUnicode',106498,'sys::Int',{}).$af('xmlEscNewlines',106498,'sys::Int',{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('writeF4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('writeXml',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('mode','sys::Int',true)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('writeBool',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)]),{}).$am('writeProps',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false),new fan.sys.Param('close','sys::Bool',true)]),{}).$am('flush',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numPendingBits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeF8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('write',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)]),{}).$am('close',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeI4',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('writeBits',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Int',false),new fan.sys.Param('num','sys::Int',false)]),{}).$am('printLine',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)]),{}).$am('writeI2',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('writeBuf',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)]),{}).$am('writeI8',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('writeObj',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('sync',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('print',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('writeUtf',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('writeDecimal',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)]),{}).$am('writeChars',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.LogLevel.$type.$af('silent',106506,'sys::LogLevel',{}).$af('debug',106506,'sys::LogLevel',{}).$af('err',106506,'sys::LogLevel',{}).$af('vals',106498,'sys::LogLevel[]',{}).$af('warn',106506,'sys::LogLevel',{}).$af('info',106506,'sys::LogLevel',{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::LogLevel?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('doFromStr',36866,'sys::Enum?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ordinal',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Time.$type.$af('defVal',106498,'sys::Time',{}).$am('minus',8192,'sys::Time',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dur','sys::Duration',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('fromLocale',40962,'sys::Time?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('nanoSec',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sec',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('min',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hour',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('now',40962,'sys::Time',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toIso',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::Time?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hour','sys::Int',false),new fan.sys.Param('min','sys::Int',false),new fan.sys.Param('sec','sys::Int',true),new fan.sys.Param('ns','sys::Int',true)]),{}).$am('toDateTime',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Date',false),new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromDuration',40962,'sys::Time',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Duration',false)]),{}).$am('fromIso',40962,'sys::Time?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('plus',8192,'sys::Time',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dur','sys::Duration',false)]),{}).$am('isMidnight',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Time?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('toDuration',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnknownTypeErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Month.$type.$af('jul',106506,'sys::Month',{}).$af('feb',106506,'sys::Month',{}).$af('jun',106506,'sys::Month',{}).$af('dec',106506,'sys::Month',{}).$af('vals',106498,'sys::Month[]',{}).$af('nov',106506,'sys::Month',{}).$af('jan',106506,'sys::Month',{}).$af('mar',106506,'sys::Month',{}).$af('sep',106506,'sys::Month',{}).$af('oct',106506,'sys::Month',{}).$af('apr',106506,'sys::Month',{}).$af('may',106506,'sys::Month',{}).$af('aug',106506,'sys::Month',{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('increment',8192,'sys::Month',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numDays',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeAbbr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Month?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('doFromStr',36866,'sys::Enum?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)]),{}).$am('decrement',8192,'sys::Month',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeFull',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ordinal',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.CastErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.ParseErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.DateTime.$type.$af('defVal',106498,'sys::DateTime',{}).$am('date',8192,'sys::Date',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('weekOfYear',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('startOfWeek','sys::Weekday',true)]),{}).$am('year',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dayOfYear',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tz',8192,'sys::TimeZone',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('weekday',8192,'sys::Weekday',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toRel',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('toJava',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hoursInDay',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('nowUnique',40962,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toIso',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('day',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tzAbbr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromJava',40962,'sys::DateTime?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('millis','sys::Int',false),new fan.sys.Param('tz','sys::TimeZone',true),new fan.sys.Param('negIsNull','sys::Bool',true)]),{}).$am('plus',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('duration','sys::Duration',false)]),{}).$am('fromStr',40966,'sys::DateTime?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('month',8192,'sys::Month',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('nowTicks',40962,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toUtc',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minus',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('duration','sys::Duration',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('weekdayInMonth',40962,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false),new fan.sys.Param('mon','sys::Month',false),new fan.sys.Param('weekday','sys::Weekday',false),new fan.sys.Param('pos','sys::Int',false)]),{}).$am('dst',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minusDateTime',8192,'sys::Duration',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('time','sys::DateTime',false)]),{}).$am('fromLocale',40962,'sys::DateTime?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('tz','sys::TimeZone',true),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('nanoSec',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toTimeZone',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',false)]),{}).$am('sec',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('min',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hour',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromHttpStr',40962,'sys::DateTime?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('now',40962,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tolerance','sys::Duration?',true)]),{}).$am('boot',40962,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('floor',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('accuracy','sys::Duration',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::DateTime?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false),new fan.sys.Param('month','sys::Month',false),new fan.sys.Param('day','sys::Int',false),new fan.sys.Param('hour','sys::Int',false),new fan.sys.Param('min','sys::Int',false),new fan.sys.Param('sec','sys::Int',true),new fan.sys.Param('ns','sys::Int',true),new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toHttpStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('midnight',8192,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ticks',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('nowUtc',40962,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tolerance','sys::Duration?',true)]),{}).$am('isLeapYear',40962,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)]),{}).$am('fromIso',40962,'sys::DateTime?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isMidnight',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('makeTicks',40962,'sys::DateTime',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ticks','sys::Int',false),new fan.sys.Param('tz','sys::TimeZone',true)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('time',8192,'sys::Time',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.NotImmutableErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnknownPodErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.List.$type.$af('size',73728,'sys::Int',{}).$af('capacity',73728,'sys::Int',{}).$am('indexSame',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false),new fan.sys.Param('offset','sys::Int',true)]),{}).$am('addNotNull',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V?',false)]),{}).$am('getSafe',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('def','sys::V?',true)]),{}).$am('makeObj',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('capacity','sys::Int',false)]),{}).$am('indexr',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false),new fan.sys.Param('offset','sys::Int',true)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('findAll',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)]),{}).$am('flatten',8192,'sys::Obj?[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('removeAll',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::L',false)]),{}).$am('trim',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getRange',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)]),{}).$am('find',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)]),{}).$am('findType',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false)]),{}).$am('intersection',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::L',false)]),{}).$am('exclude',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)]),{}).$am('join',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('separator','sys::Str',true),new fan.sys.Param('c','|sys::V,sys::Int->sys::Str|?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('sortr',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)]),{}).$am('add',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)]),{}).$am('all',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)]),{}).$am('reduce',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('init','sys::Obj?',false),new fan.sys.Param('c','|sys::Obj?,sys::V,sys::Int->sys::Obj?|',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('last',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('binaryFind',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Int|',false)]),{}).$am('swap',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('indexA','sys::Int',false),new fan.sys.Param('indexB','sys::Int',false)]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('eachrWhile',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?|',false)]),{}).$am('containsAny',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::L',false)]),{}).$am('index',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false),new fan.sys.Param('offset','sys::Int',true)]),{}).$am('sort',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)]),{}).$am('fill',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::V',false),new fan.sys.Param('times','sys::Int',false)]),{}).$am('eachr',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Void|',false)]),{}).$am('push',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)]),{}).$am('each',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Void|',false)]),{}).$am('eachNotNull',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Void|',false)]),{}).$am('mapNotNull',8192,'sys::Obj[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?|',false)]),{}).$am('flatMap',8192,'sys::Obj?[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?[]|',false)]),{}).$am('contains',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)]),{}).$am('findNotNull',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unique',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('removeAt',8192,'sys::V',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('insertAll',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('list','sys::L',false)]),{}).$am('ro',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('eachRange',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false),new fan.sys.Param('c','|sys::V,sys::Int->sys::Void|',false)]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('groupByInto',8192,'[sys::Obj:sys::L]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('map','[sys::Obj:sys::L]',false),new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj|',false)]),{}).$am('rw',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('insert',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('item','sys::V',false)]),{}).$am('groupBy',8192,'[sys::Obj:sys::L]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj|',false)]),{}).$am('binarySearch',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::V',false),new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)]),{}).$am('remove',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)]),{}).$am('pop',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('random',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('min',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)]),{}).$am('addIfNotNull',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V?',false)]),{}).$am('isRO',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('of',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::V',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)]),{}).$am('removeRange',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('of','sys::Type',false),new fan.sys.Param('capacity','sys::Int',false)]),{}).$am('map',8192,'sys::Obj?[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?|',false)]),{}).$am('isRW',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('set',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('item','sys::V',false)]),{}).$am('max',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)]),{}).$am('containsAll',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::L',false)]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('union',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::L',false)]),{}).$am('reverse',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('any',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)]),{}).$am('peek',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('removeSame',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)]),{}).$am('findIndex',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('addAll',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::L',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('containsSame',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)]),{}).$am('shuffle',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('eachWhile',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?|',false)]),{}).$am('first',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dup',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('moveTo',8192,'sys::L',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V?',false),new fan.sys.Param('toIndex','sys::Int',false)]),{});
  fan.sys.FileStore.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('freeSpace',270337,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('availSpace',270337,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('totalSpace',270337,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('makeNew',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.LocalFileStore.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('init',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('freeSpace',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('availSpace',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('totalSpace',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Unit.$type.$am('symbol',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('A',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('mult',8192,'sys::Unit',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Unit',false)]),{}).$am('quantities',40962,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('scale',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('dim',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('K',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mol',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sec',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('div',8192,'sys::Unit',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Unit',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('define',40962,'sys::Unit',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]),{}).$am('definition',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('kg',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cd',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('quantity',40962,'sys::Unit[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('quantity','sys::Str',false)]),{}).$am('offset',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('convertTo',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('scalar','sys::Float',false),new fan.sys.Param('unit','sys::Unit',false)]),{}).$am('list',40962,'sys::Unit[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('m',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Unit?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ids',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.RegexMatcher.$type.$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('start',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('group','sys::Int',true)]),{}).$am('replaceFirst',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('replacement','sys::Str',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('matches',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('replaceAll',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('replacement','sys::Str',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('groupCount',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('end',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('group','sys::Int',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('group',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('group','sys::Int',true)]),{});
  fan.sys.Slot.$type.$am('parent',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasFacet',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)]),{}).$am('isStatic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('signature',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isField',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isSynthetic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isPrivate',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isNative',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('facets',8192,'sys::Facet[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isProtected',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findMethod',40962,'sys::Method?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',40962,'sys::Slot?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isConst',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('qname',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isOverride',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isMethod',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isPublic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',132,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findFunc',40962,'sys::Func?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isAbstract',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isInternal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doc',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isVirtual',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findField',40962,'sys::Field?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('facet',8192,'sys::Facet?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isCtor',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Field.$type.$am('parent',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasFacet',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)]),{}).$am('isStatic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('signature',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isField',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isSynthetic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isPrivate',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('type',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isNative',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('facets',8192,'sys::Facet[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isProtected',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findMethod',40962,'sys::Method?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',40962,'sys::Slot?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isConst',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('instance','sys::Obj?',true)]),{}).$am('qname',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isOverride',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isMethod',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isPublic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeSetFunc',40962,'|sys::Obj->sys::Void|',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('vals','[sys::Field:sys::Obj?]',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('set',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('instance','sys::Obj?',false),new fan.sys.Param('value','sys::Obj?',false)]),{}).$am('findFunc',40962,'sys::Func?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isAbstract',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isInternal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doc',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isVirtual',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findField',40962,'sys::Field?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('facet',8192,'sys::Facet?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isCtor',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.FieldNotSetErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Method.$type.$am('parent',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasFacet',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)]),{}).$am('isStatic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('signature',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isField',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isSynthetic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isPrivate',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isNative',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('facets',8192,'sys::Facet[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isProtected',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findMethod',40962,'sys::Method?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',40962,'sys::Slot?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('isConst',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('qname',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isOverride',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isMethod',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isPublic',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findFunc',40962,'sys::Func?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('callOn',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','sys::Obj?',false),new fan.sys.Param('args','sys::Obj?[]?',false)]),{}).$am('paramDef',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('param','sys::Param',false),new fan.sys.Param('instance','sys::Obj?',true)]),{}).$am('params',8192,'sys::Param[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isAbstract',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('callList',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj?[]?',false)]),{}).$am('call',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',true),new fan.sys.Param('b','sys::Obj?',true),new fan.sys.Param('c','sys::Obj?',true),new fan.sys.Param('d','sys::Obj?',true),new fan.sys.Param('e','sys::Obj?',true),new fan.sys.Param('f','sys::Obj?',true),new fan.sys.Param('g','sys::Obj?',true),new fan.sys.Param('h','sys::Obj?',true)]),{}).$am('isInternal',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('func',8192,'sys::Func',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('doc',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('returns',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isVirtual',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findField',40962,'sys::Field?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('facet',8192,'sys::Facet?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isCtor',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Serializable.$type.$af('simple',73730,'sys::Bool',{}).$af('collection',73730,'sys::Bool',{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('instance$init$sys$Serializable',133120,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Serializable->sys::Void|?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Transient.$type.$af('defVal',106498,'sys::Transient',{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Js.$type.$af('defVal',106498,'sys::Js',{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.NoDoc.$type.$af('defVal',106498,'sys::NoDoc',{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Deprecated.$type.$af('msg',73730,'sys::Str',{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('instance$init$sys$Deprecated',133120,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Deprecated->sys::Void|?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Operator.$type.$af('defVal',106498,'sys::Operator',{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('static$init',165890,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',133124,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.FacetMeta.$type.$af('inherited',73730,'sys::Bool',{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('instance$init$sys$FacetMeta',133120,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::FacetMeta->sys::Void|?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnknownServiceErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.NullErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Uuid.$type.$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('bitsLo',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('fromStr',40966,'sys::Uuid?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('makeBits',40962,'sys::Uuid',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hi','sys::Int',false),new fan.sys.Param('lo','sys::Int',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::Uuid?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('bitsHi',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnsupportedErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnknownKeyErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.UnknownFacetErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.InStream.$type.$af('endian',73728,'sys::Endian',{}).$af('charset',73728,'sys::Charset',{}).$am('readF4',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)]),{}).$am('readBufFully',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('readF8',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBuf',270336,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('pipe',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('n','sys::Int?',true),new fan.sys.Param('close','sys::Bool',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('readS8',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unreadChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('read',270336,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('unread',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('skip',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('readAllLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readNullTerminatedStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)]),{}).$am('readUtf',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readPropsListVals',8192,'[sys::Str:sys::Str[]]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numPendingBits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream?',false)]),{}).$am('close',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('avail',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBool',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readObj',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('peekChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readStrToken',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)]),{}).$am('readLine',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)]),{}).$am('peek',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('readChars',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('eachLine',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('readBits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('num','sys::Int',false)]),{});
  fan.sys.SysInStream.$type.$af('endian',73728,'sys::Endian',{}).$af('charset',73728,'sys::Charset',{}).$am('readF4',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)]),{}).$am('readBufFully',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('readF8',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readS4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBuf',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]),{}).$am('pipe',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('n','sys::Int?',true),new fan.sys.Param('close','sys::Bool',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('readS8',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('unreadChar',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('read',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('unread',271360,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('skip',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('readAllLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU4',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readNullTerminatedStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)]),{}).$am('readUtf',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readPropsListVals',8192,'[sys::Str:sys::Str[]]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU2',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readU1',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('numPendingBits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('close',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',139268,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('avail',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readBool',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readObj',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('peekChar',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readStrToken',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)]),{}).$am('readLine',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)]),{}).$am('peek',8192,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('readChars',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)]),{}).$am('eachLine',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('readBits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('num','sys::Int',false)]),{});
  fan.sys.File.$type.$af('modified',270337,'sys::DateTime?',{}).$af('pathSep',106498,'sys::Str',{}).$af('sep',106498,'sys::Str',{}).$am('parent',270337,'sys::File?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)]),{}).$am('osRoots',40962,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('mimeType',8192,'sys::MimeType?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('createFile',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('copyTo',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('moveInto',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false)]),{}).$am('writeProps',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)]),{}).$am('path',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('normalize',270337,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('create',270337,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isExecutable',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('pathStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ext',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('in',270337,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bufferSize','sys::Int?',true)]),{}).$am('copyInto',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('list',270337,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Regex?',true)]),{}).$am('plus',270337,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('path','sys::Uri',false),new fan.sys.Param('checkSlash','sys::Bool',true)]),{}).$am('basename',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',270337,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isReadable',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('readAllLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isWritable',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('osPath',270337,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('delete',270337,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('out',270337,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('append','sys::Bool',true),new fan.sys.Param('bufferSize','sys::Int?',true)]),{}).$am('createDir',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',40966,'sys::File?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checkSlash','sys::Bool',true)]),{}).$am('listFiles',270336,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Regex?',true)]),{}).$am('deleteOnExit',270337,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('os',40962,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('osPath','sys::Str',false)]),{}).$am('readObj',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isEmpty',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeObj',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('listDirs',270336,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Regex?',true)]),{}).$am('store',270336,'sys::FileStore',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('createTemp',40962,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('prefix','sys::Str',true),new fan.sys.Param('suffix','sys::Str',true),new fan.sys.Param('dir','sys::File?',true)]),{}).$am('uri',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isHidden',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('makeNew',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('rename',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newName','sys::Str',false)]),{}).$am('eachLine',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('exists',270337,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mmap',270337,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true),new fan.sys.Param('pos','sys::Int',true),new fan.sys.Param('size','sys::Int?',true)]),{}).$am('walk',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::File->sys::Void|',false)]),{}).$am('open',270337,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true)]),{}).$am('isDir',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('moveTo',270337,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false)]),{});
  fan.sys.LocalFile.$type.$af('modified',336896,'sys::DateTime?',{}).$af('pathSep',106498,'sys::Str',{}).$af('sep',106498,'sys::Str',{}).$am('parent',271360,'sys::File?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)]),{}).$am('osRoots',40962,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('mimeType',8192,'sys::MimeType?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('createFile',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('copyTo',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('moveInto',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false)]),{}).$am('writeProps',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)]),{}).$am('path',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('normalize',271360,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('create',271360,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isExecutable',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('pathStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ext',8192,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('init',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('in',271360,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bufferSize','sys::Int?',true)]),{}).$am('copyInto',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('list',271360,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Regex?',true)]),{}).$am('plus',271360,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checkSlash','sys::Bool',true)]),{}).$am('basename',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',271360,'sys::Int?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readProps',8192,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isReadable',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('readAllLines',8192,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isWritable',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('readAllBuf',8192,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('osPath',271360,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('delete',271360,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('out',271360,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('append','sys::Bool',true),new fan.sys.Param('bufferSize','sys::Int?',true)]),{}).$am('createDir',8192,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('listFiles',270336,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Regex?',true)]),{}).$am('deleteOnExit',271360,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('os',40962,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('osPath','sys::Str',false)]),{}).$am('readObj',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isEmpty',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('writeObj',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('listDirs',270336,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Regex?',true)]),{}).$am('store',270336,'sys::FileStore',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('createTemp',40962,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('prefix','sys::Str',true),new fan.sys.Param('suffix','sys::Str',true),new fan.sys.Param('dir','sys::File?',true)]),{}).$am('uri',8192,'sys::Uri',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isHidden',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('rename',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newName','sys::Str',false)]),{}).$am('eachLine',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('exists',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mmap',271360,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true),new fan.sys.Param('pos','sys::Int',true),new fan.sys.Param('size','sys::Int?',true)]),{}).$am('open',271360,'sys::Buf',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true)]),{}).$am('walk',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::File->sys::Void|',false)]),{}).$am('moveTo',271360,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false)]),{}).$am('isDir',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.InterruptedErr.$type.$am('msg',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('cause',8192,'sys::Err?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('trace',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('traceToStr',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Env.$type.$am('parent',8192,'sys::Env?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('homeDir',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('path',270336,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('host',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('idHash',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('vars',270336,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findAllPodNames',270336,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toStr',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('in',270336,'sys::InStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findFile',270336,'sys::File?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('runtime',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('index',270336,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false)]),{}).$am('findAllFiles',270336,'sys::File[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)]),{}).$am('props',270336,'[sys::Str:sys::Str]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('maxAge','sys::Duration',false)]),{}).$am('indexPodNames',270336,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false)]),{}).$am('exit',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('status','sys::Int',true)]),{}).$am('compileScript',270336,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('indexKeys',270336,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cur',40962,'sys::Env',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('javaVersion',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('addShutdownHook',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hook','|->sys::Void|',false)]),{}).$am('locale',270336,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('def','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('platform',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('out',270336,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('promptPassword',270336,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true)]),{}).$am('compileScriptToJs',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)]),{}).$am('workDir',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('mainMethod',270336,'sys::Method?',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('gc',270336,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',4100,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','sys::Env',true)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('os',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('err',270336,'sys::OutStream',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('args',270336,'sys::Str[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('diagnostics',270336,'[sys::Str:sys::Obj]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('findPodFile',270336,'sys::File?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('podName','sys::Str',false)]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('tempDir',270336,'sys::File',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('removeShutdownHook',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hook','|->sys::Void|',false)]),{}).$am('arch',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('user',270336,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('prompt',270336,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true)]),{}).$am('config',270336,'sys::Str?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('def','sys::Str?',true)]),{});
  fan.sys.Map.$type.$af('def',73728,'sys::V?',{}).$af('caseInsensitive',73728,'sys::Bool',{}).$af('ordered',73728,'sys::Bool',{}).$am('addNotNull',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('val','sys::V?',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('findAll',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('find',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)]),{}).$am('exclude',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)]),{}).$am('join',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('separator','sys::Str',false),new fan.sys.Param('c','|sys::V,sys::K->sys::Str|?',true)]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('add',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('val','sys::V',false)]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('all',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)]),{}).$am('reduce',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('init','sys::Obj?',false),new fan.sys.Param('c','|sys::Obj?,sys::V,sys::K->sys::Obj?|',false)]),{}).$am('containsKey',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false)]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('each',8192,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Void|',false)]),{}).$am('mapNotNull',8192,'[sys::Obj:sys::Obj?]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Obj?|',false)]),{}).$am('findNotNull',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('size',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ro',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('vals',8192,'sys::V[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('rw',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('keys',8192,'sys::K[]',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('remove',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false)]),{}).$am('addIfNotNull',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('val','sys::V?',false)]),{}).$am('isRO',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('get',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('def','sys::V?',true)]),{}).$am('addList',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::V[]',false),new fan.sys.Param('c','|sys::V,sys::Int->sys::K|?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',8196,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)]),{}).$am('setAll',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('m','sys::M',false)]),{}).$am('map',8192,'[sys::Obj:sys::Obj?]',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Obj?|',false)]),{}).$am('isRW',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('set',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('val','sys::V',false)]),{}).$am('getOrAdd',8192,'sys::V',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('valFunc','|sys::K->sys::V|',false)]),{}).$am('isEmpty',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clear',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('setList',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::V[]',false),new fan.sys.Param('c','|sys::V,sys::Int->sys::K|?',true)]),{}).$am('any',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('addAll',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('m','sys::M',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('getOrThrow',8192,'sys::V',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false)]),{}).$am('instance$init$sys$Map',133120,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('getChecked',8192,'sys::V?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('eachWhile',8192,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Obj?|',false)]),{}).$am('dup',8192,'sys::M',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Param.$type.$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('compare',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('type',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hasDefault',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('equals',270336,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)]),{}).$am('name',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('make',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',270336,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{});
  fan.sys.Float.$type.$af('nan',106498,'sys::Float',{}).$af('posInf',106498,'sys::Float',{}).$af('defVal',106498,'sys::Float',{}).$af('negInf',106498,'sys::Float',{}).$af('e',106498,'sys::Float',{}).$af('pi',106498,'sys::Float',{}).$am('mult',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('mod',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('localePercent',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cos',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('echo',40962,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)]),{}).$am('isNaN',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('atan',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('privateMake',2052,'sys::Void',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('div',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('sqrt',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isImmutable',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('trap',270336,'sys::Obj?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',true)]),{}).$am('exp',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('clamp',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('min','sys::Float',false),new fan.sys.Param('max','sys::Float',false)]),{}).$am('atan2',40962,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('x','sys::Float',false)]),{}).$am('tan',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toStr',271360,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('sinh',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toCode',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('bits',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toDegrees',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('ceil',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('acos',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plus',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('divDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('localeMinus',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('fromStr',40966,'sys::Float?',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]),{}).$am('localeNegInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeBits32',40962,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bits','sys::Int',false)]),{}).$am('normNegZero',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('divInt',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('localeGrouping',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('hash',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('isNegZero',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minus',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)]),{}).$am('compare',271360,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)]),{}).$am('log',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('modInt',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('log10',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('increment',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('multInt',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('plusDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('random',40962,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('tanh',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minusDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('min',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Float',false)]),{}).$am('pow',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pow','sys::Float',false)]),{}).$am('sin',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('floor',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('bits32',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toImmutable',8192,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('plusInt',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('typeof',8192,'sys::Type',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toLocale',8192,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)]),{}).$am('toInt',8192,'sys::Int',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('modDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('max',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Float',false)]),{}).$am('toFloat',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('toRadians',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('cosh',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeNaN',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('with',270336,'sys::This',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)]),{}).$am('abs',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('round',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('makeBits',40962,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bits','sys::Int',false)]),{}).$am('negate',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('decrement',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('minusInt',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]),{}).$am('equals',271360,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)]),{}).$am('asin',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('localeDecimal',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('multDecimal',8192,'sys::Decimal',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]),{}).$am('clip',8192,'sys::Float',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('min','sys::Float',false),new fan.sys.Param('max','sys::Float',false)]),{}).$am('localePosInf',40962,'sys::Str',fan.sys.List.make(fan.sys.Param.$type,[]),{}).$am('approx',8192,'sys::Bool',fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false),new fan.sys.Param('tolerance','sys::Float?',true)]),{});
}
fan.sys.FConst = function() {};
fan.sys.FConst.Abstract   = 0x00000001;
fan.sys.FConst.Const      = 0x00000002;
fan.sys.FConst.Ctor       = 0x00000004;
fan.sys.FConst.Enum       = 0x00000008;
fan.sys.FConst.Facet      = 0x00000010;
fan.sys.FConst.Final      = 0x00000020;
fan.sys.FConst.Getter     = 0x00000040;
fan.sys.FConst.Internal   = 0x00000080;
fan.sys.FConst.Mixin      = 0x00000100;
fan.sys.FConst.Native     = 0x00000200;
fan.sys.FConst.Override   = 0x00000400;
fan.sys.FConst.Private    = 0x00000800;
fan.sys.FConst.Protected  = 0x00001000;
fan.sys.FConst.Public     = 0x00002000;
fan.sys.FConst.Setter     = 0x00004000;
fan.sys.FConst.Static     = 0x00008000;
fan.sys.FConst.Storage    = 0x00010000;
fan.sys.FConst.Synthetic  = 0x00020000;
fan.sys.FConst.Virtual    = 0x00040000;
fan.sys.FConst.FlagsMask  = 0x0007ffff;
fan.sys.buf_crypto = (function () {
var crypto = {};
crypto.pbkdf2 = function(PRF, hLen, key, salt, iterations, dkLen)
{
var F = function F(P, S, c, i) {
var U_r;
var U_c;
var xor = function(a, b) {
var aw = a;
var bw = b;
if (aw.length != bw.length) throw "Lengths don't match";
for (var i = 0; i < aw.length; ++i) {
aw[i] ^= bw[i];
}
return aw;
};
S = S.concat(crypto.wordsToBytes([i]));
U_r = U_c = PRF(P, S);
for (var iter = 1; iter < c; ++iter) {
U_c = PRF(P, crypto.wordsToBytes(U_c));
U_r = xor(U_r, U_c);
}
return crypto.wordsToBytes(U_r);
};
var l = Math.ceil(dkLen / hLen);
var r = dkLen - (l - 1) * hLen;
var T = [];
var block;
for (var i = 1; i <= l; ++i) {
block = F(key, salt, iterations, i);
T = T.concat(block);
}
return T.slice(0, dkLen);
}
crypto.bytesToWords = function(bytes)
{
var words = new Array();
var size = bytes.length;
for (var i=0; size>3 && (i+4)<=size; i+=4)
{
words.push((bytes[i]<<24) | (bytes[i+1]<<16) | (bytes[i+2]<<8) | bytes[i+3]);
}
var rem = bytes.length % 4;
if (rem > 0)
{
if (rem == 3) words.push((bytes[size-3]<<24) | (bytes[size-2]<<16) | bytes[size-1]<<8);
if (rem == 2) words.push((bytes[size-2]<<24) | bytes[size-1]<<16);
if (rem == 1) words.push(bytes[size-1]<<24);
}
return words;
}
crypto.wordsToBytes = function(dw) {
var db = new Array();
for (var i=0; i<dw.length; i++)
{
db.push(0xff & (dw[i] >> 24));
db.push(0xff & (dw[i] >> 16));
db.push(0xff & (dw[i] >> 8));
db.push(0xff & dw[i]);
}
return db;
}
return crypto;
})();
fan.sys.MemBufOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.MemBufOutStream.prototype.$ctor = function(buf)
{
fan.sys.OutStream.prototype.$ctor.call(this);
this.buf = buf;
}
fan.sys.MemBufOutStream.prototype.write = function(v)
{
if (this.buf.m_pos+1 >= this.buf.m_buf.length) this.buf.grow(this.buf.m_pos+1);
this.buf.m_buf[this.buf.m_pos++] = (0xff & v);
if (this.buf.m_pos > this.buf.m_size) this.buf.m_size = this.buf.m_pos;
return this;
}
fan.sys.MemBufOutStream.prototype.writeChar = function(c)
{
this.m_charset.m_encoder.encodeOut(c, this);
return this;
}
fan.sys.MemBufOutStream.prototype.writeBuf = function(other, n)
{
if (n === undefined) n = other.remaining();
this.buf.grow(this.buf.m_pos + n);
if (other.m_pos+n > other.m_size)
throw fan.sys.IOErr.make("Not enough bytes to write");
var orig = this.buf.m_buf;
var temp = other.m_buf.slice(other.m_pos, other.m_pos+n);
this.buf.m_buf = this.buf.m_buf.slice(0, this.buf.m_pos).concat(temp);
this.buf.m_pos += n;
other.m_pos += n;
var remaining = this.buf.m_size - this.buf.m_pos;
if (remaining > 0)
{
temp = orig.slice(this.buf.m_pos, this.buf.m_pos+remaining);
this.buf.m_buf = this.buf.m_buf.concat(temp);
}
if (this.buf.m_pos > this.buf.m_size) this.buf.m_size = this.buf.m_pos;
return this;
}
fan.sys.MemBufOutStream.prototype.flush = function() {}
fan.sys.MemBufOutStream.prototype.sync = function() {}
fan.sys.MemBufInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.MemBufInStream.prototype.$ctor = function(buf)
{
fan.sys.InStream.prototype.$ctor.call(this);
this.buf = buf;
}
fan.sys.MemBufInStream.prototype.read = function()
{
if (this.buf.m_pos >= this.buf.m_size) return null;
return this.buf.m_buf[this.buf.m_pos++] & 0xff;
}
fan.sys.MemBufInStream.prototype.readChar = function()
{
var c = this.rChar();
return (c < 0) ? null : c;
}
fan.sys.MemBufInStream.prototype.rChar = function()
{
return this.m_charset.m_encoder.decode(this);
}
fan.sys.MemBufInStream.prototype.readBuf = function(other, n)
{
if (this.buf.m_pos >= this.buf.m_size) return null;
var len = Math.min(this.buf.m_size-this.buf.m_pos, n);
var orig = other.m_buf;
var temp = this.buf.m_buf.slice(this.buf.m_pos, this.buf.m_pos+len);
other.m_buf = other.m_buf.slice(0, other.m_pos).concat(temp);
this.buf.m_pos += len;
other.m_pos += len;
other.m_size = other.m_pos;
var remaining =  other.m_size - other.m_pos;
if (remaining > 0)
{
temp = orig.slice(other.m_pos, other.m_pos+remaining);
other.m_buf = other.m_buf.concat(temp);
}
return len;
}
fan.sys.MemBufInStream.prototype.unread = function(n)
{
n &= 0xFF;
if (this.buf.m_pos > 0 && this.buf.m_buf[this.buf.m_pos-1] == n)
{
this.buf.m_pos--;
}
else
{
if (this.buf.m_size+1 >= this.buf.m_buf.length) this.buf.grow(this.buf.m_size+1);
this.buf.m_buf.splice(this.buf.m_pos, 0, n)
this.buf.m_size++;
}
return this;
}
fan.sys.MemBufInStream.prototype.avail = function()
{
return this.buf.remaining();
}
fan.sys.MemBufInStream.prototype.peek = function()
{
if (this.buf.m_pos >= this.buf.m_size) return null;
return this.buf.m_buf[this.buf.m_pos] & 0xFF;
}
fan.sys.MemBufInStream.prototype.skip = function(n)
{
var oldPos = this.buf.m_pos;
this.buf.m_pos += n;
if (this.buf.m_pos < this.buf.m_size) return n;
this.buf.m_pos = this.buf.m_size;
return this.buf.m_pos-oldPos;
}
fan.sys.ErrInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.ErrInStream.prototype.read    = function()         { throw this.err(); }
fan.sys.ErrInStream.prototype.rChar    = function()         { throw this.err(); }
fan.sys.ErrInStream.prototype.readBuf = function(other, n) { throw this.err(); }
fan.sys.ErrInStream.prototype.unread  = function(n)        { throw this.err(); }
fan.sys.ErrInStream.prototype.unread  = function(n)        { throw this.err(); }
fan.sys.ErrInStream.prototype.endian  = function(endian)   { throw this.err(); }
fan.sys.ErrInStream.prototype.charset = function(charset)  { throw this.err(); }
fan.sys.ErrInStream.prototype.err     = function() { return fan.sys.ReadonlyErr.make("Buf is immutable; use Buf.in()"); }
fan.sys.ErrOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.ErrOutStream.prototype.write     = function(v)        { throw this.err(); }
fan.sys.ErrOutStream.prototype.writeBuf  = function(other, n) { throw this.err(); }
fan.sys.ErrOutStream.prototype.writeChar = function(c)        { throw this.err(); }
fan.sys.ErrOutStream.prototype.writeChar = function(c)        { throw this.err(); }
fan.sys.ErrOutStream.prototype.endian    = function(endian)   { throw this.err(); }
fan.sys.ErrOutStream.prototype.charset   = function(charset)  { throw this.err(); }
fan.sys.ErrOutStream.prototype.err       = function() { return fan.sys.ReadonlyErr.make("Buf is immutable"); }
fan.sys.ConstBufInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.ConstBufInStream.prototype.$ctor = function(buf)
{
this.$in  = null;
this.buf  = buf;
this.pos  = 0;
this.size = buf.size();
this.endian$(buf.endian());
this.charset$(buf.charset());
}
fan.sys.ConstBufInStream.prototype.read = function()
{
if (this.pos >= this.size) return null;
return this.buf.m_buf[this.pos++] & 0xFF;
}
fan.sys.ConstBufInStream.prototype.readBuf = function(other, n)
{
if (this.pos >= this.size) return null;
var len = Math.min(this.size - this.pos, n);
other.pipeFrom(buf.m_buf, pos, len);
this.pos += len;
return len;
}
fan.sys.ConstBufInStream.prototype.unread = function(n)
{
if (this.pos > 0 && this.buf.m_buf[this.pos-1] == n)
{
this.pos--;
}
else
{
throw this.buf.err();
}
return this;
}
fan.sys.ConstBufInStream.prototype.peek = function()
{
if (this.pos >= this.size) return null;
return this.buf.m_buf[this.pos] & 0xFF;
}
fan.sys.ConstBufInStream.prototype.skip = function(n)
{
var oldPos = this.pos;
this.pos += n;
if (this.pos < this.size) return n;
this.pos = this.size;
return this.pos-oldPos;
}
fan.sys.Buf_Md5 = function(buf, key)
{
var chrsz = 8;
function core_md5(x, len)
{
x[len >> 5] |= 0x80 << ((len) % 32);
x[(((len + 64) >>> 9) << 4) + 14] = len;
var a =  1732584193;
var b = -271733879;
var c = -1732584194;
var d =  271733878;
for(var i=0; i<x.length; i+=16)
{
var olda = a;
var oldb = b;
var oldc = c;
var oldd = d;
a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
a = safe_add(a, olda);
b = safe_add(b, oldb);
c = safe_add(c, oldc);
d = safe_add(d, oldd);
}
return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b); }
function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t); }
function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t); }
function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s, t); }
function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t); }
function core_hmac_md5(key, data)
{
var bkey = bytesToWords(key);
if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
var ipad = Array(16), opad = Array(16);
for(var i = 0; i < 16; i++)
{
ipad[i] = bkey[i] ^ 0x36363636;
opad[i] = bkey[i] ^ 0x5C5C5C5C;
}
var hash = core_md5(ipad.concat(bytesToWords(data)), 512 + data.length * chrsz);
return core_md5(opad.concat(hash), 512 + 128);
}
function safe_add(x, y)
{
var lsw = (x & 0xFFFF) + (y & 0xFFFF);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
function bit_rol(num, cnt)
{
return (num << cnt) | (num >>> (32 - cnt));
}
function bytesToWords(bytes)
{
var words = new Array();
var size = bytes.length;
for (var i=0; size>3 && (i+4)<=size; i+=4)
{
words.push((bytes[i+3]<<24) | (bytes[i+2]<<16) | (bytes[i+1]<<8) | bytes[i]);
}
var rem = bytes.length % 4;
if (rem > 0)
{
if (rem == 3) words.push((bytes[size-1]<<16) | (bytes[size-2]<<8) | bytes[size-3]);
if (rem == 2) words.push((bytes[size-1]<<8) | bytes[size-2]);
if (rem == 1) words.push(bytes[size-1]);
}
return words;
}
var dw = (key === undefined)
? core_md5(bytesToWords(buf), buf.length * chrsz)
: core_hmac_md5(key, buf);
var db = new Array();
for (var i=0; i<dw.length; i++)
{
db.push(0xff & dw[i]);
db.push(0xff & (dw[i] >> 8));
db.push(0xff & (dw[i] >> 16));
db.push(0xff & (dw[i] >> 24));
}
return db;
}
fan.sys.ObjUtil = function() {};
fan.sys.ObjUtil.hash = function(obj)
{
if (obj instanceof fan.sys.Obj) return obj.hash();
var t = typeof obj;
if (t === "number") return fan.sys.Int.hash(obj);
if (t === "string") return fan.sys.Str.hash(obj);
return 0;
}
fan.sys.ObjUtil.equals = function(a, b)
{
if (a == null) return b == null;
if (a instanceof fan.sys.Obj) return a.equals(b);
var t = typeof a;
if (t === "number") return fan.sys.Int.equals(a, b);
if (t === "string") return a === b;
var f = a.$fanType;
if (f === fan.sys.Float.$type) return fan.sys.Float.equals(a, b);
if (f === fan.sys.Decimal.$type) return fan.sys.Decimal.equals(a, b);
return a === b;
}
fan.sys.ObjUtil.compare = function(a, b, op)
{
if (a instanceof fan.sys.Obj)
{
if (b == null) return +1;
return a.compare(b);
}
else if (a != null && a.$fanType != null)
{
if (op === true && (isNaN(a) || isNaN(b))) return Number.NaN;
return fan.sys.Float.compare(a, b);
}
else
{
if (a == null)
{
if (b != null) return -1;
return 0;
}
if (b == null) return 1;
if (a < b) return -1;
if (a > b) return 1;
return 0;
}
}
fan.sys.ObjUtil.compareNE = function(a,b) { return !fan.sys.ObjUtil.equals(a,b); }
fan.sys.ObjUtil.compareLT = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) <  0; }
fan.sys.ObjUtil.compareLE = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) <= 0; }
fan.sys.ObjUtil.compareGE = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) >= 0; }
fan.sys.ObjUtil.compareGT = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) >  0; }
fan.sys.ObjUtil.is = function(obj, type)
{
if (obj == null) return false;
return fan.sys.ObjUtil.$typeof(obj).is(type);
}
fan.sys.ObjUtil.as = function(obj, type)
{
if (obj == null) return null;
type = type.toNonNullable();
var t = fan.sys.ObjUtil.$typeof(obj);
if (t.is(fan.sys.Func.$type)) return t.as(obj, type);
if (t.is(fan.sys.List.$type)) return t.as(obj, type);
if (t.is(fan.sys.Map.$type))  return t.as(obj, type);
if (t.is(type)) return obj;
return null;
}
fan.sys.ObjUtil.coerce = function(obj, type)
{
if (obj == null)
{
if (type.isNullable()) return obj;
throw fan.sys.NullErr.make("Coerce to non-null");
}
var v = fan.sys.ObjUtil.as(obj, type);
if (v == null)
{
var t = fan.sys.ObjUtil.$typeof(obj);
throw fan.sys.CastErr.make(t + " cannot be cast to " + type);
}
return obj;
}
fan.sys.ObjUtil.$typeof = function(obj)
{
if (obj instanceof fan.sys.Obj) return obj.$typeof();
else return fan.sys.Type.toFanType(obj);
}
fan.sys.ObjUtil.trap = function(obj, name, args)
{
if (obj instanceof fan.sys.Obj) return obj.trap(name, args);
else return fan.sys.ObjUtil.doTrap(obj, name, args, fan.sys.Type.toFanType(obj));
}
fan.sys.ObjUtil.doTrap = function(obj, name, args, type)
{
var slot = type.slot(name, true);
if (slot instanceof fan.sys.Method)
{
return slot.invoke(obj, args);
}
else
{
var argSize = (args == null) ? 0 : args.size();
if (argSize == 0) return slot.get(obj);
if (argSize == 1)
{
var val = args.get(0);
slot.set(obj, val);
return val;
}
throw fan.sys.ArgErr.make("Invalid number of args to get or set field '" + name + "'");
}
}
fan.sys.ObjUtil.isImmutable = function(obj)
{
if (obj instanceof fan.sys.Obj) return obj.isImmutable();
else if (obj == null) return true;
else
{
if ((typeof obj) == "boolean" || obj instanceof Boolean) return true;
if ((typeof obj) == "number"  || obj instanceof Number) return true;
if ((typeof obj) == "string"  || obj instanceof String) return true;
if (obj.$fanType != null) return true;
}
throw fan.sys.UnknownTypeErr.make("Not a Fantom type: " + obj);
}
fan.sys.ObjUtil.toImmutable = function(obj)
{
if (obj instanceof fan.sys.Obj) return obj.toImmutable();
else if (obj == null) return null;
else
{
if ((typeof obj) == "boolean" || obj instanceof Boolean) return obj;
if ((typeof obj) == "number"  || obj instanceof Number) return obj;
if ((typeof obj) == "string"  || obj instanceof String) return obj;
if (obj.$fanType != null) return obj;
}
throw fan.sys.UnknownTypeErr.make("Not a Fantom type: " + obj);
}
fan.sys.ObjUtil.$with = function(self, f)
{
if (self instanceof fan.sys.Obj)
{
return self.$with(f);
}
else
{
f.call(self);
return self;
}
}
fan.sys.ObjUtil.toStr = function(obj)
{
if (obj == null) return "null";
if (typeof obj == "string") return obj;
if (obj.$fanType === fan.sys.Float.$type) return fan.sys.Float.toStr(obj);
return obj.toString();
}
fan.sys.ObjUtil.echo = function(obj)
{
if (obj === undefined) obj = "";
var s = fan.sys.ObjUtil.toStr(obj);
try { console.log(s); }
catch (e1)
{
try { print(s + "\n"); }
catch (e2) {}
}
}
fan.sys.buf_sha1 = (function () {
var crypto = fan.sys.buf_crypto;
var ns = {};
var chrsz = 8;
function core_sha1(x, len)
{
x[len >> 5] |= 0x80 << (24 - len % 32);
x[((len + 64 >> 9) << 4) + 15] = len;
var w = Array(80);
var a =  1732584193;
var b = -271733879;
var c = -1732584194;
var d =  271733878;
var e = -1009589776;
for(var i = 0; i < x.length; i += 16)
{
var olda = a;
var oldb = b;
var oldc = c;
var oldd = d;
var olde = e;
for(var j = 0; j < 80; j++)
{
if(j < 16) w[j] = x[i + j];
else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
safe_add(safe_add(e, w[j]), sha1_kt(j)));
e = d;
d = c;
c = rol(b, 30);
b = a;
a = t;
}
a = safe_add(a, olda);
b = safe_add(b, oldb);
c = safe_add(c, oldc);
d = safe_add(d, oldd);
e = safe_add(e, olde);
}
return Array(a, b, c, d, e);
}
function sha1_ft(t, b, c, d)
{
if(t < 20) return (b & c) | ((~b) & d);
if(t < 40) return b ^ c ^ d;
if(t < 60) return (b & c) | (b & d) | (c & d);
return b ^ c ^ d;
}
function sha1_kt(t)
{
return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
(t < 60) ? -1894007588 : -899497514;
}
function core_hmac_sha1(key, data)
{
var bkey = crypto.bytesToWords(key);
if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
var ipad = Array(16), opad = Array(16);
for(var i = 0; i < 16; i++)
{
ipad[i] = bkey[i] ^ 0x36363636;
opad[i] = bkey[i] ^ 0x5C5C5C5C;
}
var hash = core_sha1(ipad.concat(crypto.bytesToWords(data)), 512 + data.length * chrsz);
return core_sha1(opad.concat(hash), 512 + 160);
}
function safe_add(x, y)
{
var lsw = (x & 0xFFFF) + (y & 0xFFFF);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
function rol(num, cnt)
{
return (num << cnt) | (num >>> (32 - cnt));
}
ns.digest = function(buf, key)
{
var dw = (key === undefined)
? core_sha1(crypto.bytesToWords(buf), buf.length * chrsz)
: core_hmac_sha1(key, buf);
return crypto.wordsToBytes(dw);
}
ns.pbkdf2 = function(key, salt, iterations, dkLen)
{
return crypto.pbkdf2(core_hmac_sha1, 20, key, salt, iterations, dkLen);
}
return ns;
})();
fan.sys.buf_sha256 = (function () {
var crypto = fan.sys.buf_crypto;
var ns = {};
function sha256_S (X, n) {return ( X >>> n ) | (X << (32 - n));}
function sha256_R (X, n) {return ( X >>> n );}
function sha256_Ch(x, y, z) {return ((x & y) ^ ((~x) & z));}
function sha256_Maj(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));}
function sha256_Sigma0256(x) {return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));}
function sha256_Sigma1256(x) {return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));}
function sha256_Gamma0256(x) {return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));}
function sha256_Gamma1256(x) {return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));}
function sha256_Sigma0512(x) {return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));}
function sha256_Sigma1512(x) {return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));}
function sha256_Gamma0512(x) {return (sha256_S(x, 1)  ^ sha256_S(x, 8) ^ sha256_R(x, 7));}
function sha256_Gamma1512(x) {return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));}
var sha256_K = new Array
(
1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
-1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
-1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
-1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
-1866530822, -1538233109, -1090935817, -965641998
);
function binb_sha256(m, l)
{
var HASH = new Array(1779033703, -1150833019, 1013904242, -1521486534,
1359893119, -1694144372, 528734635, 1541459225);
var W = new Array(64);
var a, b, c, d, e, f, g, h;
var i, j, T1, T2;
m[l >> 5] |= 0x80 << (24 - l % 32);
m[((l + 64 >> 9) << 4) + 15] = l;
for(i = 0; i < m.length; i += 16)
{
a = HASH[0];
b = HASH[1];
c = HASH[2];
d = HASH[3];
e = HASH[4];
f = HASH[5];
g = HASH[6];
h = HASH[7];
for(j = 0; j < 64; j++)
{
if (j < 16) W[j] = m[j + i];
else W[j] = safe_add(safe_add(safe_add(sha256_Gamma1256(W[j - 2]), W[j - 7]),
sha256_Gamma0256(W[j - 15])), W[j - 16]);
T1 = safe_add(safe_add(safe_add(safe_add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)),
sha256_K[j]), W[j]);
T2 = safe_add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
h = g;
g = f;
f = e;
e = safe_add(d, T1);
d = c;
c = b;
b = a;
a = safe_add(T1, T2);
}
HASH[0] = safe_add(a, HASH[0]);
HASH[1] = safe_add(b, HASH[1]);
HASH[2] = safe_add(c, HASH[2]);
HASH[3] = safe_add(d, HASH[3]);
HASH[4] = safe_add(e, HASH[4]);
HASH[5] = safe_add(f, HASH[5]);
HASH[6] = safe_add(g, HASH[6]);
HASH[7] = safe_add(h, HASH[7]);
}
return HASH;
}
function safe_add (x, y)
{
var lsw = (x & 0xFFFF) + (y & 0xFFFF);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
function hmac_sha256(key, data)
{
var bkey = crypto.bytesToWords(key);
if(bkey.length > 16) bkey = binb_sha256(bkey, key.length * 8);
var ipad = Array(16), opad = Array(16);
for(var i = 0; i < 16; i++)
{
ipad[i] = bkey[i] ^ 0x36363636;
opad[i] = bkey[i] ^ 0x5C5C5C5C;
}
var hash = binb_sha256(ipad.concat(crypto.bytesToWords(data)), 512 + data.length * 8);
return binb_sha256(opad.concat(hash), 512 + 256);
}
ns.digest = function(data, key)
{
var hash;
if (key === undefined)
hash = binb_sha256(crypto.bytesToWords(data), data.length * 8);
else
hash = hmac_sha256(key, data);
return crypto.wordsToBytes(hash);
}
ns.pbkdf2 = function(key, salt, iterations, dkLen)
{
return crypto.pbkdf2(hmac_sha256, 32, key, salt, iterations, dkLen);
}
return ns;
})();
fan.sys.StrInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.StrInStream.prototype.$ctor = function(str)
{
this.str  = str;
this.size = str.length;
this.pos  = 0;
this.pushback = null;
}
fan.sys.StrInStream.prototype.read = function()
{
var b = this.rChar();
return (b < 0) ? null : b & 0xFF;
}
fan.sys.StrInStream.prototype.readBuf = function(buf, n)
{
for (var i=0; i<n; ++i)
{
var c = this.rChar();
if (c < 0) return i == 0 ? null : i;
buf.out().writeChar(c);
}
return n;
}
fan.sys.StrInStream.prototype.unread = function(c)
{
return this.unreadChar(c);
}
fan.sys.StrInStream.prototype.rChar = function()
{
if (this.pushback != null && this.pushback.length > 0)
return this.pushback.pop();
if (this.pos >= this.size) return -1;
return this.str.charCodeAt(this.pos++);
}
fan.sys.StrInStream.prototype.readChar = function()
{
var c = this.rChar();
return (c < 0) ? null : c;
}
fan.sys.StrInStream.prototype.unreadChar = function(c)
{
if (this.pushback == null) this.pushback = [];
this.pushback.push(c);
return this;
}
fan.sys.StrInStream.prototype.close = function()
{
return true;
}
fan.sys.StrBufOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.StrBufOutStream.prototype.$ctor = function(buf)
{
fan.sys.OutStream.prototype.$ctor.call(this)
this.m_buf = buf;
}
fan.sys.StrBufOutStream.prototype.w = function(v)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.write = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeBuf = function(buf, n)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeI2 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeI4 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeI8 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeF4 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeF8 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeUtf = function(x)
{
throw fan.sys.UnsupportedErr.make("modified UTF-8 format write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeChar = function(c)
{
this.m_buf.m_str += String.fromCharCode(c);
return this;
}
fan.sys.StrBufOutStream.prototype.writeChars = function(s, off, len)
{
if (off === undefined) off = 0;
if (len === undefined) len = s.length-off;
this.m_buf.m_str += s.substr(off, len);
return this;
}
fan.sys.StrBufOutStream.prototype.flush = function() { return this; }
fan.sys.StrBufOutStream.prototype.close = function() { return true; }
fan.sys.DateTimeStr = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.DateTimeStr.prototype.$ctor = function()
{
this.pattern = "";
this.year = 0;
this.mon  = null;
this.day  = 0;
this.hour = 0;
this.min  = 0;
this.sec  = 0;
this.ns   = 0;
this.weekday  = null;
this.tz       = null;
this.tzName   = null;
this.tzOffset = 0;
this.dst  = 0;
this.loc  = null;
this.str  = "";
this.pos  = 0;
}
fan.sys.DateTimeStr.makeDateTime = function(pattern, locale, dt)
{
var x = new fan.sys.DateTimeStr();
x.valDateTime = dt;
x.pattern = pattern;
x.loc     = locale;
x.year    = dt.year();
x.mon     = dt.month();
x.day     = dt.day();
x.hour    = dt.hour();
x.min     = dt.min();
x.sec     = dt.sec();
x.ns      = dt.nanoSec();
x.weekday = dt.weekday();
x.tz      = dt.tz();
x.dst     = dt.dst();
return x;
}
fan.sys.DateTimeStr.makeDate = function(pattern, locale, d)
{
var x = new fan.sys.DateTimeStr();
x.valDate = d;
x.pattern = pattern;
x.loc     = locale;
x.year    = d.year();
x.mon     = d.month();
x.day     = d.day();
try { x.weekday = d.weekday(); } catch (e) {}
return x;
}
fan.sys.DateTimeStr.makeTime = function(pattern, locale, t)
{
var x = new fan.sys.DateTimeStr();
x.pattern = pattern;
x.loc     = locale;
x.hour    = t.hour();
x.min     = t.min();
x.sec     = t.sec();
x.ns      = t.nanoSec();
return x;
}
fan.sys.DateTimeStr.make = function(pattern, locale)
{
var x = new fan.sys.DateTimeStr();
x.pattern = pattern;
x.loc     = locale;
return x;
}
fan.sys.DateTimeStr.prototype.format = function()
{
var s = "";
var len = this.pattern.length;
for (var i=0; i<len; ++i)
{
var c = this.pattern.charAt(i);
if (c == '\'')
{
var numLiterals = 0;
while (true)
{
++i;
if (i >= len) throw fan.sys.ArgErr.make("Invalid pattern: unterminated literal");
c = this.pattern.charAt(i);
if (c == '\'') break;
s += c;
numLiterals++;
}
if (numLiterals == 0) s += "'";
continue;
}
var n = 1;
while (i+1<len && this.pattern.charAt(i+1) == c) { ++i; ++n; }
var invalidNum = false;
switch (c)
{
case 'Y':
var y = this.year;
switch (n)
{
case 2:  y %= 100; if (y < 10) s += '0';
case 4:  s += y; break;
default: invalidNum = true;
}
break;
case 'M':
switch (n)
{
case 4:
s += this.mon.full(this.locale());
break;
case 3:
s += this.mon.abbr(this.locale());
break;
case 2:  if (this.mon.ordinal()+1 < 10) s += '0';
case 1:  s += this.mon.ordinal()+1; break;
default: invalidNum = true;
}
break;
case 'D':
switch (n)
{
case 3:  s += this.day + fan.sys.DateTimeStr.daySuffix(this.day); break;
case 2:  if (this.day < 10) s += '0';
case 1:  s += this.day; break;
default: invalidNum = true;
}
break;
case 'W':
switch (n)
{
case 4:
s += this.weekday.full(this.locale());
break;
case 3:
s += this.weekday.abbr(this.locale());
break;
default: invalidNum = true;
}
break;
case 'V':
var woy = this.weekOfYear();
if (woy < 1) throw fan.sys.ArgErr.make("Week of year not available");
switch (n)
{
case 3:  s += woy + fan.sys.DateTimeStr.daySuffix(woy); break;
case 2:  if (woy < 10) s += '0';
case 1:  s += woy; break;
default: invalidNum = true;
}
break;
case 'h':
case 'k':
var h = this.hour;
if (c == 'k')
{
if (h == 0) h = 12;
else if (h > 12) h -= 12;
}
switch (n)
{
case 2:  if (h < 10) s += '0';
case 1:  s += h; break;
default: invalidNum = true;
}
break;
case 'm':
switch (n)
{
case 2:  if (this.min < 10) s += '0';
case 1:  s += this.min; break;
default: invalidNum = true;
}
break;
case 's':
switch (n)
{
case 2:  if (this.sec < 10) s += '0';
case 1:  s += this.sec; break;
default: invalidNum = true;
}
break;
case 'S':
if (this.sec != 0 || this.ns != 0)
{
switch (n)
{
case 2:  if (this.sec < 10) s += '0';
case 1:  s += this.sec; break;
default: invalidNum = true;
}
}
break;
case 'a':
switch (n)
{
case 1:  s += (this.hour < 12 ? "a"  : "p"); break;
case 2:  s += (this.hour < 12 ? "am" : "pm"); break;
default: invalidNum = true;
}
break;
case 'A':
switch (n)
{
case 1:  s += (this.hour < 12 ? "A"  : "P"); break;
case 2:  s += (this.hour < 12 ? "AM" : "PM"); break;
default: invalidNum = true;
}
break;
case 'f':
case 'F':
var req = 0, opt = 0;
if (c == 'F') opt = n;
else
{
req = n;
while (i+1<len && this.pattern.charAt(i+1) == 'F') { ++i; ++opt; }
}
var frac = this.ns;
for (var x=0, tenth=100000000; x<9; ++x)
{
if (req > 0) req--;
else
{
if (frac == 0 || opt <= 0) break;
opt--;
}
s += Math.floor(frac / tenth);
frac %= tenth;
tenth  = Math.floor(tenth / 10);
}
break;
case 'z':
var rule = this.tz.rule(this.year);
switch (n)
{
case 1:
var offset = rule.offset;
if (this.dst) offset += rule.dstOffset;
if (offset == 0) { s += 'Z'; break; }
if (offset < 0) { s += '-'; offset = -offset; }
else { s += '+'; }
var zh = Math.floor(offset / 3600);
var zm = Math.floor((offset % 3600) / 60);
if (zh < 10) s += '0'; s += zh + ':';
if (zm < 10) s += '0'; s += zm;
break;
case 3:
s += this.dst ? rule.dstAbbr : rule.stdAbbr;
break;
case 4:
s += this.tz.$name();
break;
default:
invalidNum = true;
break;
}
break;
default:
if (fan.sys.Int.isAlpha(c.charCodeAt(0)))
throw fan.sys.ArgErr.make("Invalid pattern: unsupported char '" + c + "'");
if (i+1 < len)
{
var next = this.pattern.charAt(i+1);
if (next  == 'F' && this.ns == 0) break;
if (next == 'S' && this.sec == 0 && this.ns == 0) break;
}
s += c;
}
if (invalidNum)
throw fan.sys.ArgErr.make("Invalid pattern: unsupported num of '" + c + "' (x" + n + ")");
}
return s;
}
fan.sys.DateTimeStr.daySuffix = function(day)
{
if (day == 11 || day == 12 || day == 13) return "th";
switch (day % 10)
{
case 1:  return "st";
case 2:  return "nd";
case 3:  return "rd";
default: return "th";
}
}
fan.sys.DateTimeStr.prototype.parseDateTime = function(s, defTz, checked)
{
try
{
this.tzOffset = null;
this.parse(s);
var defRule = defTz.rule(this.year);
if (this.tzName != null)
{
if (this.tzName == defTz.$name() ||
this.tzName == defRule.stdAbbr ||
this.tzName == defRule.dstAbbr)
{
this.tz = defTz;
}
else
{
this.tz = fan.sys.TimeZone.fromStr(this.tzName, false);
if (this.tz == null) this.tz = defTz;
}
}
else if (this.tzOffset != null)
{
var time = this.hour*3600 + this.min*60 + this.sec;
var defOffset = defRule.offset + fan.sys.TimeZone.dstOffset(defRule, this.year, this.mon.ordinal(), this.day, time);
if (this.tzOffset == defOffset)
this.tz = defTz;
else
this.tz = fan.sys.TimeZone.fromGmtOffset(this.tzOffset);
}
else this.tz = defTz;
return fan.sys.DateTime.doMake(this.year, this.mon, this.day, this.hour, this.min, this.sec, this.ns, this.tzOffset, this.tz);
}
catch (err)
{
if (checked) throw fan.sys.ParseErr.makeStr("DateTime", s, fan.sys.Err.make(err));
return null;
}
}
fan.sys.DateTimeStr.prototype.parseDate = function(s, checked)
{
try
{
this.parse(s);
return fan.sys.Date.make(this.year, this.mon, this.day);
}
catch (err)
{
if (checked) throw fan.sys.ParseErr.makeStr("Date", s, fan.sys.Err.make(err));
return null;
}
}
fan.sys.DateTimeStr.prototype.parseTime = function(s, checked)
{
try
{
this.parse(s);
return fan.sys.Time.make(this.hour, this.min, this.sec, this.ns);
}
catch (err)
{
if (checked) throw fan.sys.ParseErr.makeStr("Time", s, fan.sys.Err.make(err));
return null;
}
}
fan.sys.DateTimeStr.prototype.parse = function(s)
{
this.str = s;
this.pos = 0;
var len = this.pattern.length;
var skippedLast = false;
for (var i=0; i<len; ++i)
{
var c = this.pattern.charAt(i);
var n = 1;
while (i+1<len && this.pattern.charAt(i+1) == c) { ++i; ++n; }
switch (c)
{
case 'Y':
this.year = this.parseInt(n);
if (this.year < 30) this.year += 2000;
else if (this.year < 100) this.year += 1900;
break;
case 'M':
switch (n)
{
case 4:  this.mon = this.parseMon(); break;
case 3:  this.mon = this.parseMon(); break;
default: this.mon = fan.sys.Month.m_vals.get(this.parseInt(n)-1); break;
}
break;
case 'D':
if (n != 3) this.day = this.parseInt(n);
else
{
this.day = this.parseInt(1);
this.skipWord();
}
break;
case 'h':
case 'k':
this.hour = this.parseInt(n);
break;
case 'm':
this.min = this.parseInt(n);
break;
case 's':
this.sec = this.parseInt(n);
break;
case 'S':
if (!skippedLast) this.sec = this.parseInt(n);
break;
case 'a':
case 'A':
var amPm = this.str.charAt(this.pos); this.pos += n;
if (amPm == 'P' || amPm == 'p')
{
if (this.hour < 12) this.hour += 12;
}
else
{
if (this.hour == 12) this.hour = 0;
}
break;
case 'W':
this.skipWord();
break;
case 'F':
if (skippedLast) break;
case 'f':
this.ns = 0;
var tenth = 100000000;
while (true)
{
var digit = this.parseOptDigit();
if (digit < 0) break;
this.ns += tenth * digit;
tenth = Math.floor(tenth / 10);
}
break;
case 'z':
switch (n)
{
case 1:  this.parseTzOffset(); break;
default: this.parseTzName();
}
break;
case '\'':
if (n == 2)
{
var actual = this.str.charAt(this.pos++);
if (actual != '\'')
throw fan.sys.Err.make("Expected single quote, not '" + actual + "' [pos " + this.pos +"]");
}
else
{
while (true)
{
var expected = this.pattern.charAt(++i);
if (expected == '\'') break;
var actual = this.str.charAt(this.pos++);
if (actual != expected)
throw fan.sys.Err.make("Expected '" + expected + "', not '" + actual + "' [pos " + this.pos +"]");
}
}
break;
default:
var match = this.pos+1 < this.str.length ? this.str.charAt(this.pos++) : 0;
if (i+1 < this.pattern.length)
{
var next = this.pattern.charAt(i+1);
if (next == 'F' || next == 'S')
{
if (match != c) { skippedLast = true; --this.pos; break; }
}
}
skippedLast = false;
if (match != c)
throw fan.sys.Err.make("Expected '" + c + "' literal char, not '" + match + "' [pos " + this.pos +"]");
}
}
}
fan.sys.DateTimeStr.prototype.parseInt = function(n)
{
var num = 0;
for (var i=0; i<n; ++i) num = num*10 + this.parseReqDigit();
if (n == 1)
{
var digit = this.parseOptDigit();
if (digit >= 0) num = num*10 + digit;
}
return num;
}
fan.sys.DateTimeStr.prototype.parseReqDigit = function()
{
var ch = this.str.charCodeAt(this.pos++);
if (48 <= ch && ch <= 57) return ch - 48;
throw fan.sys.Err.make("Expected digit, not '" + String.fromCharCode(ch) + "' [pos " + (this.pos-1) + "]");
}
fan.sys.DateTimeStr.prototype.parseOptDigit = function()
{
if (this.pos < this.str.length)
{
var ch = this.str.charCodeAt(this.pos);
if (48 <= ch && ch <= 57) { this.pos++; return ch-48; }
}
return -1;
}
fan.sys.DateTimeStr.prototype.parseMon = function()
{
var s = "";
while (this.pos < this.str.length)
{
var ch = this.str.charCodeAt(this.pos);
if (97 <= ch && ch <= 122) { s += String.fromCharCode(ch); this.pos++; continue; }
if (65 <= ch && ch <= 90)  { s += String.fromCharCode(fan.sys.Int.lower(ch)); this.pos++; continue; }
break;
}
var m = this.locale().monthByName(s);
if (m == null) throw fan.sys.Err.make("Invalid month: " + s);
return m;
}
fan.sys.DateTimeStr.prototype.parseTzOffset = function()
{
var ch = this.str.charAt(this.pos++);
var neg = false;
switch (ch)
{
case '-': neg = true; break;
case '+': neg = false; break;
case 'Z': this.tzOffset = 0; return;
default: throw fan.sys.Err.make("Unexpected tz offset char: " + ch + " [pos " + (this.pos-1) + "]");
}
var hr = this.parseInt(1);
var min = 0;
if (this.pos < this.str.length)
{
ch = this.str.charCodeAt(this.pos);
if (ch == 58)
{
this.pos++;
min = this.parseInt(1);
}
else if (48 <= ch && ch <= 57)
{
min = this.parseInt(1);
}
}
this.tzOffset = hr*3600 + min*60;
if (neg) this.tzOffset = -this.tzOffset;
}
fan.sys.DateTimeStr.prototype.parseTzName = function()
{
var s = "";
while (this.pos < this.str.length)
{
var ch = this.str.charCodeAt(this.pos);
if ((97 <= ch && ch <= 122) ||
(65 <= ch && ch <= 90) ||
(48 <= ch && ch <= 57) ||
ch == 43 || ch == 45 || ch == 95)
{
s += String.fromCharCode(ch);
this.pos++;
}
else break;
}
this.tzName = s;
}
fan.sys.DateTimeStr.prototype.skipWord = function()
{
while (this.pos < this.str.length)
{
var ch = this.str.charCodeAt(this.pos);
if ((97 <= ch && ch <= 122) || (65 <= ch && ch <= 90))
this.pos++;
else
break;
}
}
fan.sys.DateTimeStr.prototype.locale = function()
{
if (this.loc == null) this.loc = fan.sys.Locale.cur();
return this.loc;
}
fan.sys.DateTimeStr.prototype.weekOfYear = function()
{
var sow = fan.sys.Weekday.localeStartOfWeek(this.locale());
if (this.valDateTime !== undefined) return this.valDateTime.weekOfYear(sow);
if (this.valDate !== undefined)     return this.valDate.weekOfYear(sow);
return 0;
}
;(function() {
var c=fan.sys.TimeZone.cache$;
c("CET","AANDRVQHzAAADhAAA0NFVAAADhAABENFU1QCbAAAAAAcIHMJbAAAAAAcIHMHywAADhAAA0NFVAAADhAABENFU1QCbAAAAAAcIHMIbAAAAAAcIHM=");
c("CST6CDT","AAdDU1Q2Q0RUB9f//6ugAANDU1QAAA4QAANDRFQCPgAIAAAcIHcKPgABAAAcIHcHy///q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("EET","AANFRVQHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("EST","AANFU1QHy///ubAAA0VTVAAAAAA=");
c("EST5EDT","AAdFU1Q1RURUB9f//7mwAANFU1QAAA4QAANFRFQCPgAIAAAcIHcKPgABAAAcIHcHy///ubAAA0VTVAAADhAAA0VEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("HST","AANIU1QHy///c2AAA0hTVAAAAAA=");
c("MET","AANNRVQHzAAADhAAA01FVAAADhAABE1FU1QCbAAAAAAcIHMJbAAAAAAcIHMHywAADhAAA01FVAAADhAABE1FU1QCbAAAAAAcIHMIbAAAAAAcIHM=");
c("MST","AANNU1QHy///nZAAA01TVAAAAAA=");
c("MST7MDT","AAdNU1Q3TURUB9f//52QAANNU1QAAA4QAANNRFQCPgAIAAAcIHcKPgABAAAcIHcHy///nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdw==");
c("PST8PDT","AAdQU1Q4UERUB9f//4+AAANQU1QAAA4QAANQRFQCPgAIAAAcIHcKPgABAAAcIHcHy///j4AAA1BTVAAADhAAA1BEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("WET","AANXRVQHzAAAAAAAA1dFVAAADhAABFdFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAAAAAAA1dFVAAADhAABFdFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Asia/Almaty","AAtBc2lhL0FsbWF0eQfUAABUYAADKzA2AAAAAAfMAABUYAAHKzA2LyswNwAADhAAByswNi8rMDcCbAAAAAAcIHMJbAAAAAAcIHMHywAAVGAAByswNi8rMDcAAA4QAAcrMDYvKzA3AmwAAAAAHCBzCGwAAAAAHCBz");
c("Asia/Amman","AApBc2lhL0FtbWFuB94AABwgAANFRVQAAA4QAARFRVNUAmwEAAABUYB3CWwFAAAAAABzB9wAABwgAARFRVNUAAAAAAfWAAAcIAADRUVUAAAOEAAERUVTVAJsBAAAAVGAdwlsBQAAAAAAcwfVAAAcIAADRUVUAAAOEAAERUVTVAJsBAAAAVGAdwhsBQAAAAAAcwfUAAAcIAADRUVUAAAOEAAERUVTVAJsBAAAAVGAdwlkAA8AAAAAcwfTAAAcIAADRUVUAAAOEAAERUVTVAJsBAAAAVGAdwlkABgAAAAAcwfSAAAcIAADRUVUAAAOEAAERUVTVAJsBAAAAVGAdwhsBQAAAAAAcwfQAAAcIAADRUVUAAAOEAAERUVTVAJsBAAAAAAAcwhsBQAAAAAAcwfPAAAcIAADRUVUAAAOEAAERUVTVAZkAAEAAAAAcwhsBQAAAAAAcwfLAAAcIAADRUVUAAAOEAAERUVTVAM+BQEAAAAAdwg+BQ8AAAAAcw==");
c("Asia/Anadyr","AAtBc2lhL0FuYWR5cgfbAACowAADKzEyAAAAAAfaAACasAAHKzExLysxMgAADhAABysxMS8rMTICbAAAAAAcIHMJbAAAAAAcIHMHzAAAqMAABysxMi8rMTMAAA4QAAcrMTIvKzEzAmwAAAAAHCBzCWwAAAAAHCBzB8sAAKjAAAcrMTIvKzEzAAAOEAAHKzEyLysxMwJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Aqtau","AApBc2lhL0FxdGF1B9QAAEZQAAMrMDUAAAAAB8wAADhAAAcrMDQvKzA1AAAOEAAHKzA0LyswNQJsAAAAABwgcwlsAAAAABwgcwfLAAA4QAAHKzA0LyswNQAADhAAByswNC8rMDUCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Asia/Aqtobe","AAtBc2lhL0FxdG9iZQfUAABGUAADKzA1AAAAAAfMAABGUAAHKzA1LyswNgAADhAAByswNS8rMDYCbAAAAAAcIHMJbAAAAAAcIHMHywAARlAAByswNS8rMDYAAA4QAAcrMDUvKzA2AmwAAAAAHCBzCGwAAAAAHCBz");
c("Asia/Ashgabat","AA1Bc2lhL0FzaGdhYmF0B8sAAEZQAAMrMDUAAAAA");
c("Asia/Atyrau","AAtBc2lhL0F0eXJhdQfUAABGUAADKzA1AAAAAAfPAAA4QAAHKzA0LyswNQAADhAAByswNC8rMDUCbAAAAAAcIHMJbAAAAAAcIHMHzAAARlAAByswNS8rMDYAAA4QAAcrMDUvKzA2AmwAAAAAHCBzCWwAAAAAHCBzB8sAAEZQAAcrMDUvKzA2AAAOEAAHKzA1LyswNgJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Baghdad","AAxBc2lhL0JhZ2hkYWQH2AAAKjAAByswMy8rMDQAAAAAB8sAACowAAcrMDMvKzA0AAAOEAAHKzAzLyswNANkAAEAACowcwlkAAEAACowcw==");
c("Asia/Baku","AAlBc2lhL0Jha3UH4AAAOEAAByswNC8rMDUAAAAAB80AADhAAAcrMDQvKzA1AAAOEAAHKzA0LyswNQJsAAAAADhAdwlsAAAAAEZQdwfMAAA4QAAHKzA0LyswNQAADhAAByswNC8rMDUCbAAAAAAOEHUJbAAAAAAOEHUHywAAOEAAAyswNAAAAAA=");
c("Asia/Bangkok","AAxBc2lhL0Jhbmdrb2sHywAAYnAAAyswNwAAAAA=");
c("Asia/Barnaul","AAxBc2lhL0Jhcm5hdWwH4AAAYnAAAyswNwAAAAAH3gAAVGAAAyswNgAAAAAH2wAAYnAAAyswNwAAAAAHzAAAVGAAByswNi8rMDcAAA4QAAcrMDYvKzA3AmwAAAAAHCBzCWwAAAAAHCBzB8sAAFRgAAcrMDYvKzA3AAAOEAAHKzA2LyswNwJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Beirut","AAtBc2lhL0JlaXJ1dAfPAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAAAAdwlsAAAAAAAAdwfLAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAAAAdwhsAAAAAAAAdw==");
c("Asia/Bishkek","AAxBc2lhL0Jpc2hrZWsH1QAAVGAAAyswNgAAAAAHzQAARlAAByswNS8rMDYAAA4QAAcrMDUvKzA2AmwAAAAAIyh3CWwAAAAAIyh3B8sAAEZQAAcrMDUvKzA2AAAOEAAHKzA1LyswNgM+AAcAAAAAcwhsAAAAAAAAdw==");
c("Asia/Brunei","AAtBc2lhL0JydW5laQfLAABwgAADKzA4AAAAAA==");
c("Asia/Chita","AApBc2lhL0NoaXRhB+AAAH6QAAMrMDkAAAAAB94AAHCAAAMrMDgAAAAAB9sAAIygAAMrMTAAAAAAB8wAAH6QAAcrMDkvKzEwAAAOEAAHKzA5LysxMAJsAAAAABwgcwlsAAAAABwgcwfLAAB+kAAHKzA5LysxMAAADhAAByswOS8rMTACbAAAAAAcIHMIbAAAAAAcIHM=");
c("Asia/Choibalsan","AA9Bc2lhL0Nob2liYWxzYW4H4QAAcIAAByswOC8rMDkAAAAAB98AAHCAAAcrMDgvKzA5AAAOEAAHKzA4LyswOQJsBgAAABwgdwhsBgAAAAAAdwfYAABwgAAHKzA4LyswOQAAAAAH1wAAfpAAByswOS8rMTAAAAAAB9IAAH6QAAcrMDkvKzEwAAAOEAAHKzA5LysxMAJsBgAAABwgdwhsBgAAABwgdwfRAAB+kAAHKzA5LysxMAAADhAAByswOS8rMTADbAYAAAAcIHcIbAYAAAAcIHcHzwAAfpAAByswOS8rMTAAAAAAB8sAAH6QAAcrMDkvKzEwAAAOEAAHKzA5LysxMAJsAAAAAAAAdwhsAAAAAAAAdw==");
c("Asia/Colombo","AAxBc2lhL0NvbG9tYm8H1gAATVgABSswNTMwAAAAAAfMAABUYAADKzA2AAAAAAfLAABNWAAFKzA1MzAAAAAA");
c("Asia/Damascus","AA1Bc2lhL0RhbWFzY3VzB9wAABwgAANFRVQAAA4QAARFRVNUAmwFAAAAAAB3CWwFAAAAAAB3B9oAABwgAANFRVQAAA4QAARFRVNUAz4FAQAAAAB3CWwFAAAAAAB3B9kAABwgAANFRVQAAA4QAARFRVNUAmwFAAAAAAB3CWwFAAAAAAB3B9gAABwgAANFRVQAAA4QAARFRVNUAz4FAQAAAAB3CmQAAQAAAAB3B9cAABwgAANFRVQAAA4QAARFRVNUAmwFAAAAAAB3Cj4FAQAAAAB3B9YAABwgAANFRVQAAA4QAARFRVNUA2QAAQAAAAB3CGQAFgAAAAB3B88AABwgAANFRVQAAA4QAARFRVNUA2QAAQAAAAB3CWQAAQAAAAB3B80AABwgAANFRVQAAA4QAARFRVNUAmwBAAAAAAB3CWQAAQAAAAB3B8sAABwgAANFRVQAAA4QAARFRVNUA2QAAQAAAAB3CWQAAQAAAAB3");
c("Asia/Dhaka","AApBc2lhL0RoYWthB9oAAFRgAAcrMDYvKzA3AAAAAAfZAABUYAAHKzA2LyswNwAADhAAByswNi8rMDcFZAATAAFDcHcLZAAfAAFRgHcHywAAVGAAAyswNgAAAAA=");
c("Asia/Dili","AAlBc2lhL0RpbGkH0AAAfpAAAyswOQAAAAAHywAAcIAAAyswOAAAAAA=");
c("Asia/Dubai","AApBc2lhL0R1YmFpB8sAADhAAAMrMDQAAAAA");
c("Asia/Dushanbe","AA1Bc2lhL0R1c2hhbmJlB8sAAEZQAAMrMDUAAAAA");
c("Asia/Famagusta","AA5Bc2lhL0ZhbWFndXN0YQfhAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfgAAAqMAADKzAzAAAAAAfOAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAAAAdwhsAAAAAAAAdw==");
c("Asia/Gaza","AAlBc2lhL0dhemEH4wAAHCAAA0VFVAAADhAABEVFU1QCbAUAAAAAAHcJbAYAAAAOEHcH4AAAHCAAA0VFVAAADhAABEVFU1QCPgYYAAAOEHcJbAYAAAAOEHcH3wAAHCAAA0VFVAAADhAABEVFU1QCbAUAAAFRgHcJPgUVAAAAAHcH3AAAHCAABEVFU1QAAAAAB9sAABwgAANFRVQAAAAAB9oAABwgAANFRVQAAA4QAARFRVNUAmQAGgAAAAB3B2QACwAAAAB3B9kAABwgAANFRVQAAA4QAARFRVNUAmwFAAAAAAB3CD4FAQAADhB3B9gAABwgAANFRVQAAA4QAARFRVNUAmwFAAAAAAB3CGQAAQAAAAB3B9cAABwgAANFRVQAAA4QAARFRVNUA2QAAQAAAAB3CD4ECAAAHCB3B9YAABwgAANFRVQAAA4QAARFRVNUA2QAAQAAAAB3CGQAFgAAAAB3B9UAABwgAANFRVQAAA4QAARFRVNUAz4FDwAAAAB3CWQABAAAHCB3B9QAABwgAANFRVQAAA4QAARFRVNUAz4FDwAAAAB3CWQAAQAADhB3B88AABwgAANFRVQAAA4QAARFRVNUAz4FDwAAAAB3CT4FDwAAAAB3B8wAABwgAANFRVQAAA4QAARFRVNUAz4FAQAAAAB3CD4FDwAAAABzB8sAABwgAANJU1QAAA4QAANJRFQCZAAfAAAAAHcIZAADAAAAAHc=");
c("Asia/Hebron","AAtBc2lhL0hlYnJvbgfjAAAcIAADRUVUAAAOEAAERUVTVAJsBQAAAAAAdwlsBgAAAA4QdwfgAAAcIAADRUVUAAAOEAAERUVTVAI+BhgAAA4QdwlsBgAAAA4QdwffAAAcIAADRUVUAAAOEAAERUVTVAJsBQAAAVGAdwk+BRUAAAAAdwfbAAAcIAAERUVTVAAAAAAH2gAAHCAAA0VFVAAADhAABEVFU1QCZAAaAAAAAHcHZAALAAAAAHcH2QAAHCAAA0VFVAAADhAABEVFU1QCbAUAAAAAAHcIPgUBAAAOEHcH2AAAHCAAA0VFVAAADhAABEVFU1QCbAUAAAAAAHcIZAABAAAAAHcH1wAAHCAAA0VFVAAADhAABEVFU1QDZAABAAAAAHcIPgQIAAAcIHcH1gAAHCAAA0VFVAAADhAABEVFU1QDZAABAAAAAHcIZAAWAAAAAHcH1QAAHCAAA0VFVAAADhAABEVFU1QDPgUPAAAAAHcJZAAEAAAcIHcH1AAAHCAAA0VFVAAADhAABEVFU1QDPgUPAAAAAHcJZAABAAAOEHcHzwAAHCAAA0VFVAAADhAABEVFU1QDPgUPAAAAAHcJPgUPAAAAAHcHzAAAHCAAA0VFVAAADhAABEVFU1QDPgUBAAAAAHcIPgUPAAAAAHMHywAAHCAAA0lTVAAADhAAA0lEVAJkAB8AAAAAdwhkAAMAAAAAdw==");
c("Asia/Ho_Chi_Minh","ABBBc2lhL0hvX0NoaV9NaW5oB8sAAGJwAAMrMDcAAAAA");
c("Asia/Hong_Kong","AA5Bc2lhL0hvbmdfS29uZwfLAABwgAAESEtTVAAAAAA=");
c("Asia/Hovd","AAlBc2lhL0hvdmQH4QAAYnAAByswNy8rMDgAAAAAB98AAGJwAAcrMDcvKzA4AAAOEAAHKzA3LyswOAJsBgAAABwgdwhsBgAAAAAAdwfXAABicAAHKzA3LyswOAAAAAAH0gAAYnAAByswNy8rMDgAAA4QAAcrMDcvKzA4AmwGAAAAHCB3CGwGAAAAHCB3B9EAAGJwAAcrMDcvKzA4AAAOEAAHKzA3LyswOANsBgAAABwgdwhsBgAAABwgdwfPAABicAAHKzA3LyswOAAAAAAHywAAYnAAByswNy8rMDgAAA4QAAcrMDcvKzA4AmwAAAAAAAB3CGwAAAAAAAB3");
c("Asia/Irkutsk","AAxBc2lhL0lya3V0c2sH3gAAcIAAAyswOAAAAAAH2wAAfpAAAyswOQAAAAAHzAAAcIAAByswOC8rMDkAAA4QAAcrMDgvKzA5AmwAAAAAHCBzCWwAAAAAHCBzB8sAAHCAAAcrMDgvKzA5AAAOEAAHKzA4LyswOQJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Jakarta","AAxBc2lhL0pha2FydGEHywAAYnAAA1dJQgAAAAA=");
c("Asia/Jayapura","AA1Bc2lhL0pheWFwdXJhB8sAAH6QAANXSVQAAAAA");
c("Asia/Jerusalem","AA5Bc2lhL0plcnVzYWxlbQfdAAAcIAADSVNUAAAOEAADSURUAj4FFwAAHCB3CWwAAAAAHCB3B9wAABwgAANJU1QAAA4QAANJRFQDPAUBAAAcIHcIZAAXAAAcIHcH2wAAHCAAA0lTVAAADhAAA0lEVAM8BQEAABwgdwlkAAIAABwgdwfaAAAcIAADSVNUAAAOEAADSURUAzwFAQAAHCB3CGQADAAAHCB3B9kAABwgAANJU1QAAA4QAANJRFQDPAUBAAAcIHcIZAAbAAAcIHcH2AAAHCAAA0lTVAAADhAAA0lEVAM8BQEAABwgdwlkAAUAABwgdwfXAAAcIAADSVNUAAAOEAADSURUAzwFAQAAHCB3CGQAEAAAHCB3B9YAABwgAANJU1QAAA4QAANJRFQDPAUBAAAcIHcJZAABAAAcIHcH1QAAHCAAA0lTVAAADhAAA0lEVAM8BQEAABwgdwlkAAkAABwgdwfUAAAcIAADSVNUAAAOEAADSURUA2QABwAADhB3CGQAFgAADhB3B9MAABwgAANJU1QAAA4QAANJRFQCZAAcAAAOEHcJZAADAAAOEHcH0gAAHCAAA0lTVAAADhAAA0lEVAJkAB0AAA4QdwlkAAcAAA4QdwfRAAAcIAADSVNUAAAOEAADSURUA2QACQAADhB3CGQAGAAADhB3B9AAABwgAANJU1QAAA4QAANJRFQDZAAOAAAcIHcJZAAGAAAOEHcHzwAAHCAAA0lTVAAADhAAA0lEVANkAAIAABwgdwhkAAMAABwgdwfOAAAcIAADSVNUAAAOEAADSURUAmQAFAAAAAB3CGQABgAAAAB3B80AABwgAANJU1QAAA4QAANJRFQCZAAVAAAAAHcIZAAOAAAAAHcHzAAAHCAAA0lTVAAADhAAA0lEVAJkAA8AAAAAdwhkABAAAAAAdwfLAAAcIAADSVNUAAAOEAADSURUAmQAHwAAAAB3CGQAAwAAAAB3");
c("Asia/Kabul","AApBc2lhL0thYnVsB8sAAD9IAAUrMDQzMAAAAAA=");
c("Asia/Kamchatka","AA5Bc2lhL0thbWNoYXRrYQfbAACowAADKzEyAAAAAAfaAACasAAHKzExLysxMgAADhAABysxMS8rMTICbAAAAAAcIHMJbAAAAAAcIHMHzAAAqMAABysxMi8rMTMAAA4QAAcrMTIvKzEzAmwAAAAAHCBzCWwAAAAAHCBzB8sAAKjAAAcrMTIvKzEzAAAOEAAHKzEyLysxMwJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Karachi","AAxBc2lhL0thcmFjaGkH2gAARlAABFBLU1QAAAAAB9kAAEZQAANQS1QAAA4QAARQS1NUA2QADwAAAAB3CmQAAQAAAAB3B9gAAEZQAANQS1QAAA4QAARQS1NUBWQAAQAAAAB3CmQAAQAAAAB3B9MAAEZQAARQS1NUAAAAAAfSAABGUAADUEtUAAAOEAAEUEtTVAM+AAIAAAAAdwk+AAIAAAAAdwfLAABGUAAEUEtTVAAAAAA=");
c("Asia/Kathmandu","AA5Bc2lhL0thdGhtYW5kdQfLAABQ3AAFKzA1NDUAAAAA");
c("Asia/Khandyga","AA1Bc2lhL0toYW5keWdhB94AAH6QAAMrMDkAAAAAB9sAAIygAAMrMTAAAAAAB9QAAIygAAcrMTAvKzExAAAOEAAHKzEwLysxMQJsAAAAABwgcwlsAAAAABwgcwfMAAB+kAAHKzA5LysxMAAADhAAByswOS8rMTACbAAAAAAcIHMJbAAAAAAcIHMHywAAfpAAByswOS8rMTAAAA4QAAcrMDkvKzEwAmwAAAAAHCBzCGwAAAAAHCBz");
c("Asia/Kolkata","AAxBc2lhL0tvbGthdGEHywAATVgAA0lTVAAAAAA=");
c("Asia/Krasnoyarsk","ABBBc2lhL0tyYXNub3lhcnNrB94AAGJwAAMrMDcAAAAAB9sAAHCAAAMrMDgAAAAAB8wAAGJwAAcrMDcvKzA4AAAOEAAHKzA3LyswOAJsAAAAABwgcwlsAAAAABwgcwfLAABicAAHKzA3LyswOAAADhAAByswNy8rMDgCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Asia/Kuala_Lumpur","ABFBc2lhL0t1YWxhX0x1bXB1cgfLAABwgAADKzA4AAAAAA==");
c("Asia/Kuching","AAxBc2lhL0t1Y2hpbmcHywAAcIAAAyswOAAAAAA=");
c("Asia/Macau","AApBc2lhL01hY2F1B8sAAHCAAANDU1QAAAAA");
c("Asia/Magadan","AAxBc2lhL01hZ2FkYW4H4AAAmrAAAysxMQAAAAAH3gAAjKAAAysxMAAAAAAH2wAAqMAAAysxMgAAAAAHzAAAmrAABysxMS8rMTIAAA4QAAcrMTEvKzEyAmwAAAAAHCBzCWwAAAAAHCBzB8sAAJqwAAcrMTEvKzEyAAAOEAAHKzExLysxMgJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Makassar","AA1Bc2lhL01ha2Fzc2FyB8sAAHCAAARXSVRBAAAAAA==");
c("Asia/Manila","AAtBc2lhL01hbmlsYQfLAABwgAADUFNUAAAAAA==");
c("Asia/Nicosia","AAxBc2lhL05pY29zaWEHzgAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAAAHcIbAAAAAAAAHc=");
c("Asia/Novokuznetsk","ABFBc2lhL05vdm9rdXpuZXRzawfbAABicAADKzA3AAAAAAfaAABUYAAHKzA2LyswNwAADhAAByswNi8rMDcCbAAAAAAcIHMJbAAAAAAcIHMHzAAAYnAAByswNy8rMDgAAA4QAAcrMDcvKzA4AmwAAAAAHCBzCWwAAAAAHCBzB8sAAGJwAAcrMDcvKzA4AAAOEAAHKzA3LyswOAJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Novosibirsk","ABBBc2lhL05vdm9zaWJpcnNrB+AAAGJwAAMrMDcAAAAAB94AAFRgAAMrMDYAAAAAB9sAAGJwAAMrMDcAAAAAB8wAAFRgAAcrMDYvKzA3AAAOEAAHKzA2LyswNwJsAAAAABwgcwlsAAAAABwgcwfLAABUYAAHKzA2LyswNwAADhAAByswNi8rMDcCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Asia/Omsk","AAlBc2lhL09tc2sH3gAAVGAAAyswNgAAAAAH2wAAYnAAAyswNwAAAAAHzAAAVGAAByswNi8rMDcAAA4QAAcrMDYvKzA3AmwAAAAAHCBzCWwAAAAAHCBzB8sAAFRgAAcrMDYvKzA3AAAOEAAHKzA2LyswNwJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Oral","AAlBc2lhL09yYWwH1AAARlAAAyswNQAAAAAHzAAAOEAAByswNC8rMDUAAA4QAAcrMDQvKzA1AmwAAAAAHCBzCWwAAAAAHCBzB8sAADhAAAcrMDQvKzA1AAAOEAAHKzA0LyswNQJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Pontianak","AA5Bc2lhL1BvbnRpYW5hawfLAABicAADV0lCAAAAAA==");
c("Asia/Pyongyang","AA5Bc2lhL1B5b25neWFuZwfiAAB+kAADS1NUAAAAAAffAAB3iAADS1NUAAAAAAfLAAB+kAADS1NUAAAAAA==");
c("Asia/Qatar","AApBc2lhL1FhdGFyB8sAACowAAMrMDMAAAAA");
c("Asia/Qostanay","AA1Bc2lhL1Fvc3RhbmF5B9QAAFRgAAMrMDYAAAAAB8wAAEZQAAcrMDUvKzA2AAAOEAAHKzA1LyswNgJsAAAAABwgcwlsAAAAABwgcwfLAABGUAAHKzA1LyswNgAADhAAByswNS8rMDYCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Asia/Qyzylorda","AA5Bc2lhL1F5enlsb3JkYQfiAABGUAADKzA1AAAAAAfUAABUYAADKzA2AAAAAAfMAABGUAAHKzA1LyswNgAADhAAByswNS8rMDYCbAAAAAAcIHMJbAAAAAAcIHMHywAARlAAByswNS8rMDYAAA4QAAcrMDUvKzA2AmwAAAAAHCBzCGwAAAAAHCBz");
c("Asia/Riyadh","AAtBc2lhL1JpeWFkaAfLAAAqMAADKzAzAAAAAA==");
c("Asia/Sakhalin","AA1Bc2lhL1Nha2hhbGluB+AAAJqwAAMrMTEAAAAAB94AAIygAAMrMTAAAAAAB9sAAJqwAAMrMTEAAAAAB80AAIygAAcrMTAvKzExAAAOEAAHKzEwLysxMQJsAAAAABwgcwlsAAAAABwgcwfMAACasAAHKzExLysxMgAADhAABysxMS8rMTICbAAAAAAcIHMJbAAAAAAcIHMHywAAmrAABysxMS8rMTIAAA4QAAcrMTEvKzEyAmwAAAAAHCBzCGwAAAAAHCBz");
c("Asia/Samarkand","AA5Bc2lhL1NhbWFya2FuZAfLAABGUAADKzA1AAAAAA==");
c("Asia/Seoul","AApBc2lhL1Nlb3VsB8sAAH6QAANLU1QAAAAA");
c("Asia/Shanghai","AA1Bc2lhL1NoYW5naGFpB8sAAHCAAANDU1QAAAAA");
c("Asia/Singapore","AA5Bc2lhL1NpbmdhcG9yZQfLAABwgAADKzA4AAAAAA==");
c("Asia/Srednekolymsk","ABJBc2lhL1NyZWRuZWtvbHltc2sH3gAAmrAAAysxMQAAAAAH2wAAqMAAAysxMgAAAAAHzAAAmrAABysxMS8rMTIAAA4QAAcrMTEvKzEyAmwAAAAAHCBzCWwAAAAAHCBzB8sAAJqwAAcrMTEvKzEyAAAOEAAHKzExLysxMgJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Taipei","AAtBc2lhL1RhaXBlaQfLAABwgAADQ1NUAAAAAA==");
c("Asia/Tashkent","AA1Bc2lhL1Rhc2hrZW50B8sAAEZQAAMrMDUAAAAA");
c("Asia/Tbilisi","AAxBc2lhL1RiaWxpc2kH1QAAOEAAAyswNAAAAAAH1AAAKjAAByswMy8rMDQAAA4QAAcrMDMvKzA0AmwAAAAAHCBzCWwAAAAAHCBzB80AADhAAAcrMDQvKzA1AAAOEAAHKzA0LyswNQJsAAAAAAAAdwlsAAAAAAAAdwfMAAA4QAADKzA1AAAAAAfLAAA4QAAHKzA0LyswNQAADhAAByswNC8rMDUCbAAAAAAAAHcIbAAAAAAAAHc=");
c("Asia/Tehran","AAtBc2lhL1RlaHJhbgfuAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABUAAVGAdwhkABUAAVGAdwfsAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABQAAVGAdwhkABQAAVGAdwfpAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABUAAVGAdwhkABUAAVGAdwfoAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABQAAVGAdwhkABQAAVGAdwflAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABUAAVGAdwhkABUAAVGAdwfkAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABQAAVGAdwhkABQAAVGAdwfhAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABUAAVGAdwhkABUAAVGAdwfgAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABQAAVGAdwhkABQAAVGAdwfdAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABUAAVGAdwhkABUAAVGAdwfcAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABQAAVGAdwhkABQAAVGAdwfZAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABUAAVGAdwhkABUAAVGAdwfYAAAxOAALKzAzMzAvKzA0MzAAAA4QAAsrMDMzMC8rMDQzMAJkABQAAVGAdwhkABQAAVGAdwfWAAAxOAALKzAzMzAvKzA0MzAAAAAAB9UAADE4AAsrMDMzMC8rMDQzMAAADhAACyswMzMwLyswNDMwAmQAFQABUYB3CGQAFQABUYB3B9QAADE4AAsrMDMzMC8rMDQzMAAADhAACyswMzMwLyswNDMwAmQAFAABUYB3CGQAFAABUYB3B9EAADE4AAsrMDMzMC8rMDQzMAAADhAACyswMzMwLyswNDMwAmQAFQABUYB3CGQAFQABUYB3B9AAADE4AAsrMDMzMC8rMDQzMAAADhAACyswMzMwLyswNDMwAmQAFAABUYB3CGQAFAABUYB3B80AADE4AAsrMDMzMC8rMDQzMAAADhAACyswMzMwLyswNDMwAmQAFQABUYB3CGQAFQABUYB3B8wAADE4AAsrMDMzMC8rMDQzMAAADhAACyswMzMwLyswNDMwAmQAFAABUYB3CGQAFAABUYB3B8sAADE4AAsrMDMzMC8rMDQzMAAADhAACyswMzMwLyswNDMwAmQAFQABUYB3CGQAFQABUYB3");
c("Asia/Thimphu","AAxBc2lhL1RoaW1waHUHywAAVGAAAyswNgAAAAA=");
c("Asia/Tokyo","AApBc2lhL1Rva3lvB8sAAH6QAANKU1QAAAAA");
c("Asia/Tomsk","AApBc2lhL1RvbXNrB+AAAGJwAAMrMDcAAAAAB94AAFRgAAMrMDYAAAAAB9sAAGJwAAMrMDcAAAAAB9IAAFRgAAcrMDYvKzA3AAAOEAAHKzA2LyswNwJsAAAAABwgcwlsAAAAABwgcwfMAABicAAHKzA3LyswOAAADhAAByswNy8rMDgCbAAAAAAcIHMJbAAAAAAcIHMHywAAYnAAByswNy8rMDgAAA4QAAcrMDcvKzA4AmwAAAAAHCBzCGwAAAAAHCBz");
c("Asia/Ulaanbaatar","ABBBc2lhL1VsYWFuYmFhdGFyB+EAAHCAAAcrMDgvKzA5AAAAAAffAABwgAAHKzA4LyswOQAADhAAByswOC8rMDkCbAYAAAAcIHcIbAYAAAAAAHcH1wAAcIAAByswOC8rMDkAAAAAB9IAAHCAAAcrMDgvKzA5AAAOEAAHKzA4LyswOQJsBgAAABwgdwhsBgAAABwgdwfRAABwgAAHKzA4LyswOQAADhAAByswOC8rMDkDbAYAAAAcIHcIbAYAAAAcIHcHzwAAcIAAByswOC8rMDkAAAAAB8sAAHCAAAcrMDgvKzA5AAAOEAAHKzA4LyswOQJsAAAAAAAAdwhsAAAAAAAAdw==");
c("Asia/Urumqi","AAtBc2lhL1VydW1xaQfLAABUYAADKzA2AAAAAA==");
c("Asia/Ust-Nera","AA1Bc2lhL1VzdC1OZXJhB94AAIygAAMrMTAAAAAAB9sAAJqwAAMrMTEAAAAAB8wAAJqwAAcrMTEvKzEyAAAOEAAHKzExLysxMgJsAAAAABwgcwlsAAAAABwgcwfLAACasAAHKzExLysxMgAADhAABysxMS8rMTICbAAAAAAcIHMIbAAAAAAcIHM=");
c("Asia/Vladivostok","ABBBc2lhL1ZsYWRpdm9zdG9rB94AAIygAAMrMTAAAAAAB9sAAJqwAAMrMTEAAAAAB8wAAIygAAcrMTAvKzExAAAOEAAHKzEwLysxMQJsAAAAABwgcwlsAAAAABwgcwfLAACMoAAHKzEwLysxMQAADhAABysxMC8rMTECbAAAAAAcIHMIbAAAAAAcIHM=");
c("Asia/Yakutsk","AAxBc2lhL1lha3V0c2sH3gAAfpAAAyswOQAAAAAH2wAAjKAAAysxMAAAAAAHzAAAfpAAByswOS8rMTAAAA4QAAcrMDkvKzEwAmwAAAAAHCBzCWwAAAAAHCBzB8sAAH6QAAcrMDkvKzEwAAAOEAAHKzA5LysxMAJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Yangon","AAtBc2lhL1lhbmdvbgfLAABbaAAFKzA2MzAAAAAA");
c("Asia/Yekaterinburg","ABJBc2lhL1lla2F0ZXJpbmJ1cmcH3gAARlAAAyswNQAAAAAH2wAAVGAAAyswNgAAAAAHzAAARlAAByswNS8rMDYAAA4QAAcrMDUvKzA2AmwAAAAAHCBzCWwAAAAAHCBzB8sAAEZQAAcrMDUvKzA2AAAOEAAHKzA1LyswNgJsAAAAABwgcwhsAAAAABwgcw==");
c("Asia/Yerevan","AAxBc2lhL1llcmV2YW4H3AAAOEAAByswNC8rMDUAAAAAB9sAADhAAAcrMDQvKzA1AAAOEAAHKzA0LyswNQJsAAAAABwgcwlsAAAAABwgcwfNAAA4QAAHKzA0LyswNQAADhAAByswNC8rMDUCbAAAAAAcIHMJbAAAAAAcIHMHywAAOEAAAyswNAAAAAA=");
c("Pacific/Apia","AAxQYWNpZmljL0FwaWEH3AAAttAABysxMy8rMTQAAA4QAAcrMTMvKzE0CGwAAAAAKjB3Az4AAQAAOEB3B9sAALbQAAcrMTMvKzE0AAAOEAAHKzEzLysxNAhsBgAAACowdwM+BgEAADhAdwfL//9lUAAHLTExLy0xMAAAAAA=");
c("Pacific/Auckland","ABBQYWNpZmljL0F1Y2tsYW5kB9gAAKjAAAROWlNUAAAOEAAETlpEVAhsAAAAABwgcwM+AAEAABwgcwfXAACowAAETlpTVAAADhAABE5aRFQIbAAAAAAcIHMCPgAPAAAcIHMHywAAqMAABE5aU1QAAA4QAAROWkRUCT4AAQAAHCBzAj4ADwAAHCBz");
c("Pacific/Bougainville","ABRQYWNpZmljL0JvdWdhaW52aWxsZQfeAACasAADKzExAAAAAAfLAACMoAADKzEwAAAAAA==");
c("Pacific/Chatham","AA9QYWNpZmljL0NoYXRoYW0H2AAAs0wACysxMjQ1LysxMzQ1AAAOEAALKzEyNDUvKzEzNDUIbAAAAAAmrHMDPgABAAAmrHMH1wAAs0wACysxMjQ1LysxMzQ1AAAOEAALKzEyNDUvKzEzNDUIbAAAAAAmrHMCPgAPAAAmrHMHywAAs0wACysxMjQ1LysxMzQ1AAAOEAALKzEyNDUvKzEzNDUJPgABAAAmrHMCPgAPAAAmrHM=");
c("Pacific/Chuuk","AA1QYWNpZmljL0NodXVrB8sAAIygAAMrMTAAAAAA");
c("Pacific/Easter","AA5QYWNpZmljL0Vhc3Rlcgfj//+roAAHLTA2Ly0wNQAADhAABy0wNi8tMDUIPgACAAA4QHUDPgACAAAqMHUH4P//q6AABy0wNi8tMDUAAA4QAActMDYvLTA1Bz4ACQAAOEB1BD4ACQAAKjB1B9///6ugAActMDYvLTA1AAAAAAfc//+roAAHLTA2Ly0wNQAADhAABy0wNi8tMDUIPgACAAA4QHUDPgAXAAAqMHUH2///q6AABy0wNi8tMDUAAA4QAActMDYvLTA1Bz4AEAAAOEB1BD4AAgAAKjB1B9r//6ugAActMDYvLTA1AAAOEAAHLTA2Ly0wNQk+AAkAADhAdQM+AAEAACowdQfZ//+roAAHLTA2Ly0wNQAADhAABy0wNi8tMDUJPgAJAAA4QHUCPgAJAAAqMHUH2P//q6AABy0wNi8tMDUAAA4QAActMDYvLTA1CT4ACQAAOEB1AmQAHgAAKjB1B9D//6ugAActMDYvLTA1AAAOEAAHLTA2Ly0wNQk+AAkAADhAdQI+AAkAACowdQfP//+roAAHLTA2Ly0wNQAADhAABy0wNi8tMDUJPgAJAAA4QHUDZAAEAAAqMHUHzv//q6AABy0wNi8tMDUAAA4QAActMDYvLTA1CGQAGwAAOEB1Aj4ACQAAKjB1B83//6ugAActMDYvLTA1AAAOEAAHLTA2Ly0wNQk+AAkAADhAdQJkAB4AACowdQfL//+roAAHLTA2Ly0wNQAADhAABy0wNi8tMDUJPgAJAAA4QHUCPgAJAAAqMHU=");
c("Pacific/Efate","AA1QYWNpZmljL0VmYXRlB8sAAJqwAAcrMTEvKzEyAAAAAA==");
c("Pacific/Enderbury","ABFQYWNpZmljL0VuZGVyYnVyeQfLAAC20AADKzEzAAAAAA==");
c("Pacific/Fakaofo","AA9QYWNpZmljL0Zha2FvZm8H2wAAttAAAysxMwAAAAAHy///ZVAAAy0xMQAAAAA=");
c("Pacific/Fiji","AAxQYWNpZmljL0ZpamkH4wAAqMAABysxMi8rMTMAAA4QAAcrMTIvKzEzCj4ACAAAHCB3AD4ADAAAKjB3B98AAKjAAAcrMTIvKzEzAAAOEAAHKzEyLysxMwo+AAEAABwgdwA+AAwAACowdwfeAACowAAHKzEyLysxMwAADhAABysxMi8rMTMKPgABAAAcIHcAPgASAAAcIHcH3AAAqMAABysxMi8rMTMAAA4QAAcrMTIvKzEzCT4AFQAAHCB3AD4AEgAAKjB3B9sAAKjAAAcrMTIvKzEzAAAOEAAHKzEyLysxMwk+ABUAABwgdwI+AAEAACowdwfaAACowAAHKzEyLysxMwAADhAABysxMi8rMTMJPgAVAAAcIHcCbAAAAAAqMHcH0AAAqMAABysxMi8rMTMAAAAAB88AAKjAAAcrMTIvKzEzAAAOEAAHKzEyLysxMwo+AAEAABwgdwFsAAAAACowdwfLAACowAAHKzEyLysxMwAAAAA=");
c("Pacific/Funafuti","ABBQYWNpZmljL0Z1bmFmdXRpB8sAAKjAAAMrMTIAAAAA");
c("Pacific/Galapagos","ABFQYWNpZmljL0dhbGFwYWdvcwfL//+roAAHLTA2Ly0wNQAAAAA=");
c("Pacific/Gambier","AA9QYWNpZmljL0dhbWJpZXIHy///gXAAAy0wOQAAAAA=");
c("Pacific/Guadalcanal","ABNQYWNpZmljL0d1YWRhbGNhbmFsB8sAAJqwAAMrMTEAAAAA");
c("Pacific/Guam","AAxQYWNpZmljL0d1YW0H0AAAjKAABENoU1QAAAAAB8sAAIygAANHU1QAAAAA");
c("Pacific/Honolulu","ABBQYWNpZmljL0hvbm9sdWx1B8v//3NgAANIU1QAAAAA");
c("Pacific/Kiritimati","ABJQYWNpZmljL0tpcml0aW1hdGkHywAAxOAAAysxNAAAAAA=");
c("Pacific/Kosrae","AA5QYWNpZmljL0tvc3JhZQfPAACasAADKzExAAAAAAfLAACowAADKzEyAAAAAA==");
c("Pacific/Kwajalein","ABFQYWNpZmljL0t3YWphbGVpbgfLAACowAADKzEyAAAAAA==");
c("Pacific/Majuro","AA5QYWNpZmljL01hanVybwfLAACowAADKzEyAAAAAA==");
c("Pacific/Marquesas","ABFQYWNpZmljL01hcnF1ZXNhcwfL//96aAAFLTA5MzAAAAAA");
c("Pacific/Nauru","AA1QYWNpZmljL05hdXJ1B8sAAKjAAAMrMTIAAAAA");
c("Pacific/Niue","AAxQYWNpZmljL05pdWUHy///ZVAAAy0xMQAAAAA=");
c("Pacific/Norfolk","AA9QYWNpZmljL05vcmZvbGsH4wAAmrAABysxMS8rMTIAAA4QAAcrMTEvKzEyCT4AAQAAHCBzAz4AAQAAHCBzB98AAJqwAAMrMTEAAAAAB8sAAKG4AAUrMTEzMAAAAAA=");
c("Pacific/Noumea","AA5QYWNpZmljL05vdW1lYQfLAACasAAHKzExLysxMgAAAAA=");
c("Pacific/Pago_Pago","ABFQYWNpZmljL1BhZ29fUGFnbwfL//9lUAADU1NUAAAAAA==");
c("Pacific/Palau","AA1QYWNpZmljL1BhbGF1B8sAAH6QAAMrMDkAAAAA");
c("Pacific/Pitcairn","ABBQYWNpZmljL1BpdGNhaXJuB87//4+AAAMtMDgAAAAAB8v//4h4AAUtMDgzMAAAAAA=");
c("Pacific/Pohnpei","AA9QYWNpZmljL1BvaG5wZWkHywAAmrAAAysxMQAAAAA=");
c("Pacific/Port_Moresby","ABRQYWNpZmljL1BvcnRfTW9yZXNieQfLAACMoAADKzEwAAAAAA==");
c("Pacific/Rarotonga","ABFQYWNpZmljL1Jhcm90b25nYQfL//9zYAAJLTEwLy0wOTMwAAAAAA==");
c("Pacific/Tahiti","AA5QYWNpZmljL1RhaGl0aQfL//9zYAADLTEwAAAAAA==");
c("Pacific/Tarawa","AA5QYWNpZmljL1RhcmF3YQfLAACowAADKzEyAAAAAA==");
c("Pacific/Tongatapu","ABFQYWNpZmljL1RvbmdhdGFwdQfSAAC20AAHKzEzLysxNAAAAAAH0QAAttAABysxMy8rMTQAAA4QAAcrMTMvKzE0Cj4AAQAAHCB3AGwAAAAAHCB3B9AAALbQAAcrMTMvKzE0AAAOEAAHKzEzLysxNAo+AAEAABwgdwJkABMAABwgcwfPAAC20AAHKzEzLysxNAAAAAAHywAAttAAAysxMwAAAAA=");
c("Pacific/Wake","AAxQYWNpZmljL1dha2UHywAAqMAAAysxMgAAAAA=");
c("Pacific/Wallis","AA5QYWNpZmljL1dhbGxpcwfLAACowAADKzEyAAAAAA==");
c("Etc/GMT","AAdFdGMvR01UB8sAAAAAAANHTVQAAAAA");
c("Etc/GMT+1","AAlFdGMvR01UKzEHy///8fAAAy0wMQAAAAA=");
c("Etc/GMT+10","AApFdGMvR01UKzEwB8v//3NgAAMtMTAAAAAA");
c("Etc/GMT+11","AApFdGMvR01UKzExB8v//2VQAAMtMTEAAAAA");
c("Etc/GMT+12","AApFdGMvR01UKzEyB8v//1dAAAMtMTIAAAAA");
c("Etc/GMT+2","AAlFdGMvR01UKzIHy///4+AAAy0wMgAAAAA=");
c("Etc/GMT+3","AAlFdGMvR01UKzMHy///1dAAAy0wMwAAAAA=");
c("Etc/GMT+4","AAlFdGMvR01UKzQHy///x8AAAy0wNAAAAAA=");
c("Etc/GMT+5","AAlFdGMvR01UKzUHy///ubAAAy0wNQAAAAA=");
c("Etc/GMT+6","AAlFdGMvR01UKzYHy///q6AAAy0wNgAAAAA=");
c("Etc/GMT+7","AAlFdGMvR01UKzcHy///nZAAAy0wNwAAAAA=");
c("Etc/GMT+8","AAlFdGMvR01UKzgHy///j4AAAy0wOAAAAAA=");
c("Etc/GMT+9","AAlFdGMvR01UKzkHy///gXAAAy0wOQAAAAA=");
c("Etc/GMT-1","AAlFdGMvR01ULTEHywAADhAAAyswMQAAAAA=");
c("Etc/GMT-10","AApFdGMvR01ULTEwB8sAAIygAAMrMTAAAAAA");
c("Etc/GMT-11","AApFdGMvR01ULTExB8sAAJqwAAMrMTEAAAAA");
c("Etc/GMT-12","AApFdGMvR01ULTEyB8sAAKjAAAMrMTIAAAAA");
c("Etc/GMT-13","AApFdGMvR01ULTEzB8sAALbQAAMrMTMAAAAA");
c("Etc/GMT-14","AApFdGMvR01ULTE0B8sAAMTgAAMrMTQAAAAA");
c("Etc/GMT-2","AAlFdGMvR01ULTIHywAAHCAAAyswMgAAAAA=");
c("Etc/GMT-3","AAlFdGMvR01ULTMHywAAKjAAAyswMwAAAAA=");
c("Etc/GMT-4","AAlFdGMvR01ULTQHywAAOEAAAyswNAAAAAA=");
c("Etc/GMT-5","AAlFdGMvR01ULTUHywAARlAAAyswNQAAAAA=");
c("Etc/GMT-6","AAlFdGMvR01ULTYHywAAVGAAAyswNgAAAAA=");
c("Etc/GMT-7","AAlFdGMvR01ULTcHywAAYnAAAyswNwAAAAA=");
c("Etc/GMT-8","AAlFdGMvR01ULTgHywAAcIAAAyswOAAAAAA=");
c("Etc/GMT-9","AAlFdGMvR01ULTkHywAAfpAAAyswOQAAAAA=");
c("Etc/Rel","AAdFdGMvUmVsB8sAAAAAAANSZWwAAAAA");
c("Etc/UTC","AAdFdGMvVVRDB8sAAAAAAANVVEMAAAAA");
c("Europe/Amsterdam","ABBFdXJvcGUvQW1zdGVyZGFtB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Andorra","AA5FdXJvcGUvQW5kb3JyYQfMAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Europe/Astrakhan","ABBFdXJvcGUvQXN0cmFraGFuB+AAADhAAAMrMDQAAAAAB94AACowAAMrMDMAAAAAB9sAADhAAAMrMDQAAAAAB8wAACowAAcrMDMvKzA0AAAOEAAHKzAzLyswNAJsAAAAABwgcwlsAAAAABwgcwfLAAAqMAAHKzAzLyswNAAADhAAByswMy8rMDQCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Europe/Athens","AA1FdXJvcGUvQXRoZW5zB8wAABwgAANFRVQAAA4QAARFRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAABwgAANFRVQAAA4QAARFRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Belgrade","AA9FdXJvcGUvQmVsZ3JhZGUHzAAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Europe/Berlin","AA1FdXJvcGUvQmVybGluB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Brussels","AA9FdXJvcGUvQnJ1c3NlbHMHzAAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Europe/Bucharest","ABBFdXJvcGUvQnVjaGFyZXN0B80AABwgAANFRVQAAA4QAARFRVNUAmwAAAAADhB1CWwAAAAADhB1B8wAABwgAANFRVQAAA4QAARFRVNUAmwAAAAAAAB3CWwAAAAAAAB3B8sAABwgAANFRVQAAA4QAARFRVNUAmwAAAAAAAB3CGwAAAAAAAB3");
c("Europe/Budapest","AA9FdXJvcGUvQnVkYXBlc3QHzAAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Europe/Chisinau","AA9FdXJvcGUvQ2hpc2luYXUHzQAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAcIHcJbAAAAAAqMHcHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAAAHcJbAAAAAAAAHcHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAAAHcIbAAAAAAAAHc=");
c("Europe/Copenhagen","ABFFdXJvcGUvQ29wZW5oYWdlbgfMAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Europe/Dublin","AA1FdXJvcGUvRHVibGluB8wAAA4QAAdJU1QvR01U///x8AAHSVNUL0dNVAlsAAAAAA4QdQJsAAAAAA4QdQfLAAAOEAAHSVNUL0dNVP//8fAAB0lTVC9HTVQJPgAWAAAOEHUCbAAAAAAOEHU=");
c("Europe/Gibraltar","ABBFdXJvcGUvR2licmFsdGFyB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Helsinki","AA9FdXJvcGUvSGVsc2lua2kHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Europe/Istanbul","AA9FdXJvcGUvSXN0YW5idWwH4AAAKjAAAyswMwAAAAAH3wAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUH3gAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUH2wAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUH1wAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHMJbAAAAAAOEHMHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHMIbAAAAAAOEHM=");
c("Europe/Kaliningrad","ABJFdXJvcGUvS2FsaW5pbmdyYWQH3gAAHCAAA0VFVAAAAAAH2wAAKjAAAyswMwAAAAAHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAcIHMJbAAAAAAcIHMHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Europe/Kiev","AAtFdXJvcGUvS2lldgfMAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Europe/Kirov","AAxFdXJvcGUvS2lyb3YH3gAAKjAAAyswMwAAAAAH2wAAOEAAAyswNAAAAAAHzAAAKjAAByswMy8rMDQAAA4QAAcrMDMvKzA0AmwAAAAAHCBzCWwAAAAAHCBzB8sAACowAAcrMDMvKzA0AAAOEAAHKzAzLyswNAJsAAAAABwgcwhsAAAAABwgcw==");
c("Europe/Lisbon","AA1FdXJvcGUvTGlzYm9uB8wAAAAAAANXRVQAAA4QAARXRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/London","AA1FdXJvcGUvTG9uZG9uB8wAAAAAAAdHTVQvQlNUAAAOEAAHR01UL0JTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAAAAABRwAADhAAAUICbAAAAAAOEHUJPgAWAAAOEHU=");
c("Europe/Luxembourg","ABFFdXJvcGUvTHV4ZW1ib3VyZwfMAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Europe/Madrid","AA1FdXJvcGUvTWFkcmlkB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Malta","AAxFdXJvcGUvTWFsdGEHzAAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Europe/Minsk","AAxFdXJvcGUvTWluc2sH2wAAKjAAAyswMwAAAAAHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAcIHMJbAAAAAAcIHMHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Europe/Monaco","AA1FdXJvcGUvTW9uYWNvB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Moscow","AA1FdXJvcGUvTW9zY293B94AACowAANNU0sAAAAAB9sAADhAAANNU0sAAAAAB8wAACowAAdNU0svTVNEAAAOEAAHTVNLL01TRAJsAAAAABwgcwlsAAAAABwgcwfLAAAqMAAHTVNLL01TRAAADhAAB01TSy9NU0QCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Europe/Oslo","AAtFdXJvcGUvT3NsbwfMAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Europe/Paris","AAxFdXJvcGUvUGFyaXMHzAAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Europe/Prague","AA1FdXJvcGUvUHJhZ3VlB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Riga","AAtFdXJvcGUvUmlnYQfRAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfQAAAcIAADRUVUAAAAAAfNAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAABwgcwhsAAAAABwgcw==");
c("Europe/Rome","AAtFdXJvcGUvUm9tZQfMAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Europe/Samara","AA1FdXJvcGUvU2FtYXJhB9sAADhAAAMrMDQAAAAAB9oAACowAAcrMDMvKzA0AAAOEAAHKzAzLyswNAJsAAAAABwgcwlsAAAAABwgcwfMAAA4QAAHKzA0LyswNQAADhAAByswNC8rMDUCbAAAAAAcIHMJbAAAAAAcIHMHywAAOEAAByswNC8rMDUAAA4QAAcrMDQvKzA1AmwAAAAAHCBzCGwAAAAAHCBz");
c("Europe/Saratov","AA5FdXJvcGUvU2FyYXRvdgfgAAA4QAADKzA0AAAAAAfeAAAqMAADKzAzAAAAAAfbAAA4QAADKzA0AAAAAAfMAAAqMAAHKzAzLyswNAAADhAAByswMy8rMDQCbAAAAAAcIHMJbAAAAAAcIHMHywAAKjAAByswMy8rMDQAAA4QAAcrMDMvKzA0AmwAAAAAHCBzCGwAAAAAHCBz");
c("Europe/Simferopol","ABFFdXJvcGUvU2ltZmVyb3BvbAfeAAAqMAADTVNLAAAAAAfNAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfMAAAqMAAHTVNLL01TRAAADhAAB01TSy9NU0QCbAAAAAAcIHMJbAAAAAAcIHMHywAAKjAAB01TSy9NU0QAAA4QAAdNU0svTVNEAmwAAAAAAAB3CGwAAAAAAAB3");
c("Europe/Sofia","AAxFdXJvcGUvU29maWEHzQAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAAAHcJbAAAAAAAAHcHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAAAHcIbAAAAAAAAHc=");
c("Europe/Stockholm","ABBFdXJvcGUvU3RvY2tob2xtB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Tallinn","AA5FdXJvcGUvVGFsbGlubgfSAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfPAAAcIAADRUVUAAAAAAfOAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfMAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAABwgcwlsAAAAABwgcwfLAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAABwgcwhsAAAAABwgcw==");
c("Europe/Tirane","AA1FdXJvcGUvVGlyYW5lB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Ulyanovsk","ABBFdXJvcGUvVWx5YW5vdnNrB+AAADhAAAMrMDQAAAAAB94AACowAAMrMDMAAAAAB9sAADhAAAMrMDQAAAAAB8wAACowAAcrMDMvKzA0AAAOEAAHKzAzLyswNAJsAAAAABwgcwlsAAAAABwgcwfLAAAqMAAHKzAzLyswNAAADhAAByswMy8rMDQCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Europe/Uzhgorod","AA9FdXJvcGUvVXpoZ29yb2QHzAAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAAHCAAA0VFVAAADhAABEVFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Europe/Vienna","AA1FdXJvcGUvVmllbm5hB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Vilnius","AA5FdXJvcGUvVmlsbml1cwfTAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfPAAAcIAADRUVUAAAAAAfOAAAOEAADQ0VUAAAOEAAEQ0VTVAJsAAAAAA4QdQlsAAAAAA4QdQfMAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAABwgcwlsAAAAABwgcwfLAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAABwgcwhsAAAAABwgcw==");
c("Europe/Volgograd","ABBFdXJvcGUvVm9sZ29ncmFkB+IAADhAAAMrMDQAAAAAB94AACowAAMrMDMAAAAAB9sAADhAAAMrMDQAAAAAB8wAACowAAcrMDMvKzA0AAAOEAAHKzAzLyswNAJsAAAAABwgcwlsAAAAABwgcwfLAAAqMAAHKzAzLyswNAAADhAAByswMy8rMDQCbAAAAAAcIHMIbAAAAAAcIHM=");
c("Europe/Warsaw","AA1FdXJvcGUvV2Fyc2F3B8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Europe/Zaporozhye","ABFFdXJvcGUvWmFwb3Jvemh5ZQfMAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAcIAADRUVUAAAOEAAERUVTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Europe/Zurich","AA1FdXJvcGUvWnVyaWNoB8wAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Africa/Abidjan","AA5BZnJpY2EvQWJpZGphbgfLAAAAAAADR01UAAAAAA==");
c("Africa/Accra","AAxBZnJpY2EvQWNjcmEHywAAAAAACUdNVC8rMDAyMAAAAAA=");
c("Africa/Algiers","AA5BZnJpY2EvQWxnaWVycwfLAAAOEAADQ0VUAAAAAA==");
c("Africa/Bissau","AA1BZnJpY2EvQmlzc2F1B8sAAAAAAANHTVQAAAAA");
c("Africa/Cairo","AAxBZnJpY2EvQ2Fpcm8H5AAAHCAABEVFU1QAAAAAB+MAABwgAANFRVQAAA4QAARFRVNUBWQABgABUYB3BGQAAgABUYB3B+IAABwgAANFRVQAAA4QAARFRVNUBWQADgABUYB3BGQACgABUYB3B+EAABwgAANFRVQAAA4QAARFRVNUBWQAHQABUYB3BGQAGQABUYB3B+AAABwgAANFRVQAAA4QAARFRVNUBmQABwABUYB3BWQAAgABUYB3B98AABwgAANFRVQAAA4QAARFRVNUBmQAFwABUYB3BWQACwABUYB3B94AABwgAANFRVQAAA4QAARFRVNUBGQADwABUYB3BWQAGgABUYB3B9sAABwgAARFRVNUAAAAAAfaAAAcIAADRUVUAAAOEAAERUVTVANsBQAAAAAAcwdkAAoAAVGAdwfZAAAcIAADRUVUAAAOEAAERUVTVANsBQAAAAAAcwdkABQAAVGAdwfYAAAcIAADRUVUAAAOEAAERUVTVANsBQAAAAAAcwdsBAAAAVGAdwfXAAAcIAADRUVUAAAOEAAERUVTVANsBQAAAAAAcwg+BAEAAVGAdwfWAAAcIAADRUVUAAAOEAAERUVTVANsBQAAAAAAcwhkABUAAVGAdwfLAAAcIAADRUVUAAAOEAAERUVTVANsBQAAAAAAcwhsBAAAAVGAdw==");
c("Africa/Casablanca","ABFBZnJpY2EvQ2FzYWJsYW5jYQfuAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDALZAAWAAAqMHcBZAAKAAAcIHcH7QAADhAAByswMS8rMDAAAAAAB+wAAA4QAAcrMDEvKzAw///x8AAHKzAxLyswMABkABcAACowdwFkABsAABwgdwfrAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDABZAAHAAAqMHcCZAAOAAAcIHcH6gAADhAAByswMS8rMDD///HwAAcrMDEvKzAwAWQADwAAKjB3AmQAFgAAHCB3B+kAAA4QAAcrMDEvKzAw///x8AAHKzAxLyswMAFkABcAACowdwNkAAYAABwgdwfoAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDACZAAKAAAqMHcDZAAOAAAcIHcH5wAADhAAByswMS8rMDD///HwAAcrMDEvKzAwAmQAEwAAKjB3A2QAFwAAHCB3B+YAAA4QAAcrMDEvKzAw///x8AAHKzAxLyswMAJkABsAACowdwRkAAgAABwgdwflAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDADZAALAAAqMHcEZAAQAAAcIHcH5AAADhAAByswMS8rMDD///HwAAcrMDEvKzAwA2QAEwAAKjB3BGQAGAAAHCB3B+MAAA4QAAcrMDEvKzAw///x8AAHKzAxLyswMARkAAUAACowdwVkAAkAABwgdwfiAAAOEAAHKzAxLyswMAAADhAAByswMS8rMDAFZAARAAAcIHcEZAANAAAqMHcH4QAAAAAAByswMC8rMDEAAA4QAAcrMDAvKzAxBmQAAgAAHCB3BGQAFQAAKjB3B+AAAAAAAAcrMDAvKzAxAAAOEAAHKzAwLyswMQZkAAoAABwgdwVkAAUAACowdwffAAAAAAAHKzAwLyswMQAADhAAByswMC8rMDEGZAASAAAcIHcFZAANAAAqMHcH3gAAAAAAByswMC8rMDEAAA4QAAcrMDAvKzAxB2QAAgAAHCB3BWQAHAAAKjB3B90AAAAAAAcrMDAvKzAxAAAOEAAHKzAwLyswMQdkAAoAABwgdwZkAAcAACowdwfcAAAAAAAHKzAwLyswMQAADhAAByswMC8rMDEHZAAUAAAcIHcGZAAUAAAqMHcH2wAAAAAAByswMC8rMDEAAA4QAAcrMDAvKzAxA2QAAwAAAAB3BmQAHwAAAAB3B9oAAAAAAAcrMDAvKzAxAAAOEAAHKzAwLyswMQRkAAIAAAAAdwdkAAgAAAAAdwfZAAAAAAAHKzAwLyswMQAADhAAByswMC8rMDEFZAABAAAAAHcHZAAVAAAAAHcH2AAAAAAAByswMC8rMDEAAA4QAAcrMDAvKzAxBWQAAQAAAAB3CGQAAQAAAAB3B8sAAAAAAAcrMDAvKzAxAAAAAA==");
c("Africa/Ceuta","AAxBZnJpY2EvQ2V1dGEHzAAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAADhAAA0NFVAAADhAABENFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Africa/El_Aaiun","AA9BZnJpY2EvRWxfQWFpdW4H7gAADhAAByswMS8rMDD///HwAAcrMDEvKzAwC2QAFgAAKjB3AWQACgAAHCB3B+0AAA4QAAcrMDEvKzAwAAAAAAfsAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDAAZAAXAAAqMHcBZAAbAAAcIHcH6wAADhAAByswMS8rMDD///HwAAcrMDEvKzAwAWQABwAAKjB3AmQADgAAHCB3B+oAAA4QAAcrMDEvKzAw///x8AAHKzAxLyswMAFkAA8AACowdwJkABYAABwgdwfpAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDABZAAXAAAqMHcDZAAGAAAcIHcH6AAADhAAByswMS8rMDD///HwAAcrMDEvKzAwAmQACgAAKjB3A2QADgAAHCB3B+cAAA4QAAcrMDEvKzAw///x8AAHKzAxLyswMAJkABMAACowdwNkABcAABwgdwfmAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDACZAAbAAAqMHcEZAAIAAAcIHcH5QAADhAAByswMS8rMDD///HwAAcrMDEvKzAwA2QACwAAKjB3BGQAEAAAHCB3B+QAAA4QAAcrMDEvKzAw///x8AAHKzAxLyswMANkABMAACowdwRkABgAABwgdwfjAAAOEAAHKzAxLyswMP//8fAAByswMS8rMDAEZAAFAAAqMHcFZAAJAAAcIHcH4gAADhAAByswMS8rMDAAAA4QAAcrMDEvKzAwBWQAEQAAHCB3BGQADQAAKjB3B+EAAAAAAAcrMDAvKzAxAAAOEAAHKzAwLyswMQZkAAIAABwgdwRkABUAACowdwfgAAAAAAAHKzAwLyswMQAADhAAByswMC8rMDEGZAAKAAAcIHcFZAAFAAAqMHcH3wAAAAAAByswMC8rMDEAAA4QAAcrMDAvKzAxBmQAEgAAHCB3BWQADQAAKjB3B94AAAAAAAcrMDAvKzAxAAAOEAAHKzAwLyswMQdkAAIAABwgdwVkABwAACowdwfdAAAAAAAHKzAwLyswMQAADhAAByswMC8rMDEHZAAKAAAcIHcGZAAHAAAqMHcH3AAAAAAAByswMC8rMDEAAA4QAAcrMDAvKzAxB2QAFAAAHCB3BmQAFAAAKjB3B9sAAAAAAAcrMDAvKzAxAAAOEAAHKzAwLyswMQNkAAMAAAAAdwZkAB8AAAAAdwfaAAAAAAAHKzAwLyswMQAADhAAByswMC8rMDEEZAACAAAAAHcHZAAIAAAAAHcH2QAAAAAAByswMC8rMDEAAA4QAAcrMDAvKzAxBWQAAQAAAAB3B2QAFQAAAAB3B9gAAAAAAAcrMDAvKzAxAAAOEAAHKzAwLyswMQVkAAEAAAAAdwhkAAEAAAAAdwfLAAAAAAAHKzAwLyswMQAAAAA=");
c("Africa/Johannesburg","ABNBZnJpY2EvSm9oYW5uZXNidXJnB8sAABwgAARTQVNUAAAAAA==");
c("Africa/Juba","AAtBZnJpY2EvSnViYQfQAAAqMAADRUFUAAAAAAfLAAAcIAAEQ0FTVAAAAAA=");
c("Africa/Khartoum","AA9BZnJpY2EvS2hhcnRvdW0H4QAAHCAAA0NBVAAAAAAH0AAAKjAAA0VBVAAAAAAHywAAHCAABENBU1QAAAAA");
c("Africa/Lagos","AAxBZnJpY2EvTGFnb3MHywAADhAAA1dBVAAAAAA=");
c("Africa/Maputo","AA1BZnJpY2EvTWFwdXRvB8sAABwgAANDQVQAAAAA");
c("Africa/Monrovia","AA9BZnJpY2EvTW9ucm92aWEHywAAAAAAA0dNVAAAAAA=");
c("Africa/Nairobi","AA5BZnJpY2EvTmFpcm9iaQfLAAAqMAADRUFUAAAAAA==");
c("Africa/Ndjamena","AA9BZnJpY2EvTmRqYW1lbmEHywAADhAAA1dBVAAAAAA=");
c("Africa/Sao_Tome","AA9BZnJpY2EvU2FvX1RvbWUH4wAAAAAAA0dNVAAAAAAH4gAADhAAA1dBVAAAAAAHywAAAAAAA0dNVAAAAAA=");
c("Africa/Tripoli","AA5BZnJpY2EvVHJpcG9saQfdAAAcIAADRUVUAAAAAAfcAAAOEAAEQ0VTVAAAAAAHzQAAHCAAA0VFVAAAAAAHzAAADhAABENFU1QAAAAAB8sAABwgAANFRVQAAAAA");
c("Africa/Tunis","AAxBZnJpY2EvVHVuaXMH2QAADhAABENFU1QAAAAAB9YAAA4QAANDRVQAAA4QAARDRVNUAmwAAAAAHCBzCWwAAAAAHCBzB9UAAA4QAANDRVQAAA4QAARDRVNUBGQAAQAAAABzCGQAHgAADhBzB8sAAA4QAARDRVNUAAAAAA==");
c("Africa/Windhoek","AA9BZnJpY2EvV2luZGhvZWsH4gAAHCAAAVMAAAAAB8sAABwgAAFD///x8AABVwM+AAEAABwgdwg+AAEAABwgdw==");
c("America/Adak","AAxBbWVyaWNhL0FkYWsH1///c2AAA0hTVAAADhAAA0hEVAI+AAgAABwgdwo+AAEAABwgdwfL//9zYAADSFNUAAAOEAADSERUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Anchorage","ABFBbWVyaWNhL0FuY2hvcmFnZQfX//+BcAAEQUtTVAAADhAABEFLRFQCPgAIAAAcIHcKPgABAAAcIHcHy///gXAABEFLU1QAAA4QAARBS0RUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Araguaina","ABFBbWVyaWNhL0FyYWd1YWluYQfd///V0AADLTAzAAAAAAfc///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAPAAAAAHcBPgAWAAAAAHcH0///1dAAAy0wMwAAAAAH0v//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCmQAAwAAAAB3AT4ADwAAAAB3B9H//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AAgAAAAAdwE+AA8AAAAAdwfQ///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAIAAAAAHcBZAAbAAAAAHcHz///1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCWQAAwAAAAB3AWQAFQAAAAB3B87//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMglkAAsAAAAAdwJkAAEAAAAAdwfN///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJZAAGAAAAAHcBZAAQAAAAAHcHzP//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCWQABgAAAAB3AWQACwAAAAB3B8v//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AAsAAAAAdwE+AA8AAAAAdw==");
c("America/Asuncion","ABBBbWVyaWNhL0FzdW5jaW9uB93//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAEAAAAAdwI+ABYAAAAAdwfa///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgABAAAAAHcDPgAIAAAAAHcH1f//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ADwAAAAB3Aj4ACAAAAAB3B9T//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AA8AAAAAdwM+AAEAAAAAdwfS///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMIPgABAAAAAHcDPgABAAAAAHcHzv//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4AAQAAAAB3Aj4AAQAAAAB3B83//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAEAAAAAdwFsAAAAAAAAdwfM///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgABAAAAAHcCZAABAAAAAHcHy///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCWQAAQAAAAB3AWwAAAAAAAB3");
c("America/Atikokan","ABBBbWVyaWNhL0F0aWtva2FuB8v//7mwAANFU1QAAAAA");
c("America/Bahia","AA1BbWVyaWNhL0JhaGlhB9z//9XQAAMtMDMAAAAAB9v//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AA8AAAAAdwE+AA8AAAAAdwfT///V0AADLTAzAAAAAAfS///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIKZAADAAAAAHcBPgAPAAAAAHcH0f//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCT4ACAAAAAB3AT4ADwAAAAB3B9D//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AAgAAAAAdwFkABsAAAAAdwfP///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJZAADAAAAAHcBZAAVAAAAAHcHzv//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCWQACwAAAAB3AmQAAQAAAAB3B83//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMglkAAYAAAAAdwFkABAAAAAAdwfM///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJZAAGAAAAAHcBZAALAAAAAHcHy///1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCT4ACwAAAAB3AT4ADwAAAAB3");
c("America/Bahia_Banderas","ABZBbWVyaWNhL0JhaGlhX0JhbmRlcmFzB9r//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcH0v//nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdwfR//+dkAADTVNUAAAOEAADTURUBD4AAQAAHCB3CGwAAAAAHCB3B8z//52QAANNU1QAAA4QAANNRFQDPgABAAAcIHcJbAAAAAAcIHcHy///nZAAA01TVAAAAAA=");
c("America/Barbados","ABBBbWVyaWNhL0JhcmJhZG9zB8v//8fAAANBU1QAAAAA");
c("America/Belem","AA1BbWVyaWNhL0JlbGVtB8v//9XQAAMtMDMAAAAA");
c("America/Belize","AA5BbWVyaWNhL0JlbGl6ZQfL//+roAABUwAAAAA=");
c("America/North_Dakota/Beulah","ABtBbWVyaWNhL05vcnRoX0Rha290YS9CZXVsYWgH2v//q6AAA0NTVAAADhAAA0NEVAI+AAgAABwgdwo+AAEAABwgdwfX//+dkAADTVNUAAAOEAADTURUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//52QAANNU1QAAA4QAANNRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Blanc-Sablon","ABRBbWVyaWNhL0JsYW5jLVNhYmxvbgfL///HwAADQVNUAAAAAA==");
c("America/Boa_Vista","ABFBbWVyaWNhL0JvYV9WaXN0YQfQ///HwAADLTA0AAAAAAfP///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJZAADAAAAAHcBZAAVAAAAAHcHy///x8AAAy0wNAAAAAA=");
c("America/Bogota","AA5BbWVyaWNhL0JvZ290YQfL//+5sAAHLTA1Ly0wNAAAAAA=");
c("America/Boise","AA1BbWVyaWNhL0JvaXNlB9f//52QAANNU1QAAA4QAANNRFQCPgAIAAAcIHcKPgABAAAcIHcHy///nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Argentina/Buenos_Aires","AB5BbWVyaWNhL0FyZ2VudGluYS9CdWVub3NfQWlyZXMH2f//1dAABy0wMy8tMDIAAAAAB9j//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AA8AAAAAdwI+AA8AAAAAdwfQ///V0AAHLTAzLy0wMgAAAAAHz///x8AABy0wNC8tMDMAAAAAB8v//9XQAActMDMvLTAyAAAAAA==");
c("America/Cambridge_Bay","ABVBbWVyaWNhL0NhbWJyaWRnZV9CYXkH1///nZAAA01TVAAADhAAA01EVAI+AAgAABwgdwo+AAEAABwgdwfR//+dkAADTVNUAAAOEAADTURUAz4AAQAAHCB3CWwAAAAAHCB3B9D//6ugAANDU1QAAAAAB8///6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcHy///nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Campo_Grande","ABRBbWVyaWNhL0NhbXBvX0dyYW5kZQfj///HwAAHLTA0Ly0wMwAAAAAH4v//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCj4AAQAAAAB3AT4ADwAAAAB3B+D//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AA8AAAAAdwE+AA8AAAAAdwff///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAPAAAAAHcBPgAWAAAAAHcH3f//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ADwAAAAB3AT4ADwAAAAB3B9z//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AA8AAAAAdwE+ABYAAAAAdwfY///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAPAAAAAHcBPgAPAAAAAHcH1///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACAAAAAB3AWQAGQAAAAB3B9b//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwpkAAUAAAAAdwE+AA8AAAAAdwfV///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJZAAQAAAAAHcBPgAPAAAAAHcH1P//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCmQAAgAAAAB3AT4ADwAAAAB3B9P//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwlkABMAAAAAdwE+AA8AAAAAdwfS///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMKZAADAAAAAHcBPgAPAAAAAHcH0f//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACAAAAAB3AT4ADwAAAAB3B9D//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAgAAAAAdwFkABsAAAAAdwfP///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJZAADAAAAAHcBZAAVAAAAAHcHzv//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCWQACwAAAAB3AmQAAQAAAAB3B83//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwlkAAYAAAAAdwFkABAAAAAAdwfM///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJZAAGAAAAAHcBZAALAAAAAHcHy///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACwAAAAB3AT4ADwAAAAB3");
c("America/Cancun","AA5BbWVyaWNhL0NhbmN1bgff//+5sAADRVNUAAAAAAfS//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B9H//6ugAANDU1QAAA4QAANDRFQEPgABAAAcIHcIbAAAAAAcIHcHzv//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfM//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3B8v//7mwAANFU1QAAAAA");
c("America/Caracas","AA9BbWVyaWNhL0NhcmFjYXMH4P//x8AAAy0wNAAAAAAH1///wLgABS0wNDMwAAAAAAfL///HwAADLTA0AAAAAA==");
c("America/Argentina/Catamarca","ABtBbWVyaWNhL0FyZ2VudGluYS9DYXRhbWFyY2EH2P//1dAAAy0wMwAAAAAH1P//1dAABy0wMy8tMDIAAAAAB9D//9XQAAMtMDMAAAAAB8///8fAAActMDQvLTAzAAAAAAfL///V0AAHLTAzLy0wMgAAAAA=");
c("America/Cayenne","AA9BbWVyaWNhL0NheWVubmUHy///1dAAAy0wMwAAAAA=");
c("America/North_Dakota/Center","ABtBbWVyaWNhL05vcnRoX0Rha290YS9DZW50ZXIH1///q6AAA0NTVAAADhAAA0NEVAI+AAgAABwgdwo+AAEAABwgdwfL//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Chicago","AA9BbWVyaWNhL0NoaWNhZ28H1///q6AAA0NTVAAADhAAA0NEVAI+AAgAABwgdwo+AAEAABwgdwfL//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Chihuahua","ABFBbWVyaWNhL0NoaWh1YWh1YQfS//+dkAADTVNUAAAOEAADTURUAz4AAQAAHCB3CWwAAAAAHCB3B9H//52QAANNU1QAAA4QAANNRFQEPgABAAAcIHcIbAAAAAAcIHcHzv//nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdwfM//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B8v//6ugAANDU1QAAAAA");
c("America/Argentina/Cordoba","ABlBbWVyaWNhL0FyZ2VudGluYS9Db3Jkb2JhB9n//9XQAActMDMvLTAyAAAAAAfY///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAPAAAAAHcCPgAPAAAAAHcH0P//1dAABy0wMy8tMDIAAAAAB8///8fAAActMDQvLTAzAAAAAAfL///V0AAHLTAzLy0wMgAAAAA=");
c("America/Costa_Rica","ABJBbWVyaWNhL0Nvc3RhX1JpY2EHy///q6AAA0NTVAAAAAA=");
c("America/Creston","AA9BbWVyaWNhL0NyZXN0b24Hy///nZAAA01TVAAAAAA=");
c("America/Cuiaba","AA5BbWVyaWNhL0N1aWFiYQfj///HwAAHLTA0Ly0wMwAAAAAH4v//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCj4AAQAAAAB3AT4ADwAAAAB3B+D//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AA8AAAAAdwE+AA8AAAAAdwff///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAPAAAAAHcBPgAWAAAAAHcH3f//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ADwAAAAB3AT4ADwAAAAB3B9z//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AA8AAAAAdwE+ABYAAAAAdwfY///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAPAAAAAHcBPgAPAAAAAHcH1///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACAAAAAB3AWQAGQAAAAB3B9b//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwpkAAUAAAAAdwE+AA8AAAAAdwfV///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJZAAQAAAAAHcBPgAPAAAAAHcH1P//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCmQAAgAAAAB3AT4ADwAAAAB3B9P//8fAAAMtMDQAAAAAB9L//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwpkAAMAAAAAdwE+AA8AAAAAdwfR///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAIAAAAAHcBPgAPAAAAAHcH0P//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACAAAAAB3AWQAGwAAAAB3B8///8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwlkAAMAAAAAdwFkABUAAAAAdwfO///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJZAALAAAAAHcCZAABAAAAAHcHzf//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCWQABgAAAAB3AWQAEAAAAAB3B8z//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwlkAAYAAAAAdwFkAAsAAAAAdwfL///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgALAAAAAHcBPgAPAAAAAHc=");
c("America/Curacao","AA9BbWVyaWNhL0N1cmFjYW8Hy///x8AAA0FTVAAAAAA=");
c("America/Danmarkshavn","ABRBbWVyaWNhL0Rhbm1hcmtzaGF2bgfMAAAAAAADR01UAAAAAAfL///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDICbAAAAAAOEHUIbAAAAAAOEHU=");
c("America/Dawson","AA5BbWVyaWNhL0Rhd3NvbgfX//+PgAADUFNUAAAOEAADUERUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//4+AAANQU1QAAA4QAANQRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Dawson_Creek","ABRBbWVyaWNhL0Rhd3Nvbl9DcmVlawfL//+dkAADTVNUAAAAAA==");
c("America/Denver","AA5BbWVyaWNhL0RlbnZlcgfX//+dkAADTVNUAAAOEAADTURUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//52QAANNU1QAAA4QAANNRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Detroit","AA9BbWVyaWNhL0RldHJvaXQH1///ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfL//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Edmonton","ABBBbWVyaWNhL0VkbW9udG9uB9f//52QAANNU1QAAA4QAANNRFQCPgAIAAAcIHcKPgABAAAcIHcHy///nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Eirunepe","ABBBbWVyaWNhL0VpcnVuZXBlB93//7mwAAMtMDUAAAAAB9j//8fAAAMtMDQAAAAAB8v//7mwAAMtMDUAAAAA");
c("America/El_Salvador","ABNBbWVyaWNhL0VsX1NhbHZhZG9yB8v//6ugAANDU1QAAAAA");
c("America/Fort_Nelson","ABNBbWVyaWNhL0ZvcnRfTmVsc29uB9///52QAANNU1QAAAAAB9f//4+AAANQU1QAAA4QAANQRFQCPgAIAAAcIHcKPgABAAAcIHcHy///j4AAA1BTVAAADhAAA1BEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Fortaleza","ABFBbWVyaWNhL0ZvcnRhbGV6YQfS///V0AADLTAzAAAAAAfR///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAIAAAAAHcBPgAPAAAAAHcH0P//1dAAAy0wMwAAAAAHz///1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCWQAAwAAAAB3AWQAFQAAAAB3B8v//9XQAAMtMDMAAAAA");
c("America/Glace_Bay","ABFBbWVyaWNhL0dsYWNlX0JheQfX///HwAADQVNUAAAOEAADQURUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//8fAAANBU1QAAA4QAANBRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Godthab","AA9BbWVyaWNhL0dvZHRoYWIHzP//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyAmwAAAAADhB1CWwAAAAADhB1B8v//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("America/Goose_Bay","ABFBbWVyaWNhL0dvb3NlX0JheQfb///HwAADQVNUAAAOEAADQURUAj4ACAAAHCB3Cj4AAQAAHCB3B9f//8fAAANBU1QAAA4QAANBRFQCPgAIAAAAPHcKPgABAAAAPHcHy///x8AAA0FTVAAADhAAA0FEVAM+AAEAAAA8dwlsAAAAAAA8dw==");
c("America/Grand_Turk","ABJBbWVyaWNhL0dyYW5kX1R1cmsH4v//ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwff///HwAADQVNUAAAAAAfX//+5sAADRVNUAAAOEAADRURUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//7mwAANFU1QAAA4QAANFRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Guatemala","ABFBbWVyaWNhL0d1YXRlbWFsYQfX//+roAADQ1NUAAAAAAfW//+roAADQ1NUAAAOEAADQ0RUA2QAHgAAAAB3CWQAAQAAAAB3B8v//6ugAANDU1QAAAAA");
c("America/Guayaquil","ABFBbWVyaWNhL0d1YXlhcXVpbAfL//+5sAAHLTA1Ly0wNAAAAAA=");
c("America/Guyana","AA5BbWVyaWNhL0d1eWFuYQfL///HwAADLTA0AAAAAA==");
c("America/Halifax","AA9BbWVyaWNhL0hhbGlmYXgH1///x8AAA0FTVAAADhAAA0FEVAI+AAgAABwgdwo+AAEAABwgdwfL///HwAADQVNUAAAOEAADQURUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Havana","AA5BbWVyaWNhL0hhdmFuYQfd//+5sAADQ1NUAAAOEAADQ0RUAj4ACAAAAABzCj4AAQAAAABzB9z//7mwAANDU1QAAA4QAANDRFQDZAABAAAAAHMKPgABAAAAAHMH2///ubAAA0NTVAAADhAAA0NEVAI+AA8AAAAAcwpkAA0AAAAAcwfZ//+5sAADQ1NUAAAOEAADQ0RUAj4ACAAAAABzCWwAAAAAAABzB9j//7mwAANDU1QAAA4QAANDRFQCPgAPAAAAAHMJbAAAAAAAAHMH1///ubAAA0NTVAAADhAAA0NEVAI+AAgAAAAAcwlsAAAAAAAAcwfU//+5sAADQ1NUAAAAAAfQ//+5sAADQ1NUAAAOEAADQ0RUAz4AAQAAAABzCWwAAAAAAABzB87//7mwAANDU1QAAA4QAANDRFQCbAAAAAAAAHMJbAAAAAAAAHMHzf//ubAAA0NTVAAADhAAA0NEVAM+AAEAAAAAdwlkAAwAAAAAcwfM//+5sAADQ1NUAAAOEAADQ0RUAz4AAQAAAAB3CWQABgAAAABzB8v//7mwAANDU1QAAA4QAANDRFQDPgABAAAAAHcJPgAIAAAAAHM=");
c("America/Hermosillo","ABJBbWVyaWNhL0hlcm1vc2lsbG8Hz///nZAAA01TVAAAAAAHzP//nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdwfL//+dkAADTVNUAAAAAA==");
c("America/Indiana/Indianapolis","ABxBbWVyaWNhL0luZGlhbmEvSW5kaWFuYXBvbGlzB9f//7mwAANFU1QAAA4QAANFRFQCPgAIAAAcIHcKPgABAAAcIHcH1v//ubAAA0VTVAAADhAAA0VEVAM+AAEAABwgdwlsAAAAABwgdwfL//+5sAADRVNUAAAAAA==");
c("America/Inuvik","AA5BbWVyaWNhL0ludXZpawfX//+dkAADTVNUAAAOEAADTURUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//52QAANNU1QAAA4QAANNRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Iqaluit","AA9BbWVyaWNhL0lxYWx1aXQH1///ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfQ//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3B8///6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcHy///ubAAA0VTVAAADhAAA0VEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Jamaica","AA9BbWVyaWNhL0phbWFpY2EHy///ubAAA0VTVAAAAAA=");
c("America/Argentina/Jujuy","ABdBbWVyaWNhL0FyZ2VudGluYS9KdWp1eQfY///V0AADLTAzAAAAAAfQ///V0AAHLTAzLy0wMgAAAAAHz///x8AABy0wNC8tMDMAAAAAB8v//9XQAActMDMvLTAyAAAAAA==");
c("America/Juneau","AA5BbWVyaWNhL0p1bmVhdQfX//+BcAAEQUtTVAAADhAABEFLRFQCPgAIAAAcIHcKPgABAAAcIHcHy///gXAABEFLU1QAAA4QAARBS0RUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Indiana/Knox","ABRBbWVyaWNhL0luZGlhbmEvS25veAfX//+roAADQ1NUAAAOEAADQ0RUAj4ACAAAHCB3Cj4AAQAAHCB3B9b//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcHy///ubAAA0VTVAAAAAA=");
c("America/La_Paz","AA5BbWVyaWNhL0xhX1BhegfL///HwAADLTA0AAAAAA==");
c("America/Argentina/La_Rioja","ABpBbWVyaWNhL0FyZ2VudGluYS9MYV9SaW9qYQfY///V0AADLTAzAAAAAAfU///V0AAHLTAzLy0wMgAAAAAH0P//1dAAAy0wMwAAAAAHz///x8AABy0wNC8tMDMAAAAAB8v//9XQAActMDMvLTAyAAAAAA==");
c("America/Lima","AAxBbWVyaWNhL0xpbWEHy///ubAABy0wNS8tMDQAAAAA");
c("America/Los_Angeles","ABNBbWVyaWNhL0xvc19BbmdlbGVzB9f//4+AAANQU1QAAA4QAANQRFQCPgAIAAAcIHcKPgABAAAcIHcHy///j4AAA1BTVAAADhAAA1BEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Kentucky/Louisville","ABtBbWVyaWNhL0tlbnR1Y2t5L0xvdWlzdmlsbGUH1///ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfL//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Maceio","AA5BbWVyaWNhL01hY2VpbwfS///V0AADLTAzAAAAAAfR///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAIAAAAAHcBPgAPAAAAAHcH0P//1dAAAy0wMwAAAAAHz///1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCWQAAwAAAAB3AWQAFQAAAAB3B8z//9XQAAMtMDMAAAAAB8v//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AAsAAAAAdwE+AA8AAAAAdw==");
c("America/Managua","AA9BbWVyaWNhL01hbmFndWEH1///q6AAA0NTVAAAAAAH1v//q6AAA0NTVAAADhAAA0NEVANkAB4AABwgdwk+AAEAAA4QdwfV//+roAADQ1NUAAAOEAADQ0RUA2QACgAAAAB3CT4AAQAAAAB3B83//6ugAANDU1QAAAAAB8v//7mwAANFU1QAAAAA");
c("America/Manaus","AA5BbWVyaWNhL01hbmF1cwfL///HwAADLTA0AAAAAA==");
c("America/Indiana/Marengo","ABdBbWVyaWNhL0luZGlhbmEvTWFyZW5nbwfX//+5sAADRVNUAAAOEAADRURUAj4ACAAAHCB3Cj4AAQAAHCB3B9b//7mwAANFU1QAAA4QAANFRFQDPgABAAAcIHcJbAAAAAAcIHcHy///ubAAA0VTVAAAAAA=");
c("America/Martinique","ABJBbWVyaWNhL01hcnRpbmlxdWUHy///x8AAA0FTVAAAAAA=");
c("America/Matamoros","ABFBbWVyaWNhL01hdGFtb3Jvcwfa//+roAADQ1NUAAAOEAADQ0RUAj4ACAAAHCB3Cj4AAQAAHCB3B9L//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcH0f//q6AAA0NTVAAADhAAA0NEVAQ+AAEAABwgdwhsAAAAABwgdwfM//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B8v//6ugAANDU1QAAAAA");
c("America/Mazatlan","ABBBbWVyaWNhL01hemF0bGFuB9L//52QAANNU1QAAA4QAANNRFQDPgABAAAcIHcJbAAAAAAcIHcH0f//nZAAA01TVAAADhAAA01EVAQ+AAEAABwgdwhsAAAAABwgdwfM//+dkAADTVNUAAAOEAADTURUAz4AAQAAHCB3CWwAAAAAHCB3B8v//52QAANNU1QAAAAA");
c("America/Argentina/Mendoza","ABlBbWVyaWNhL0FyZ2VudGluYS9NZW5kb3phB9j//9XQAAMtMDMAAAAAB9T//9XQAActMDMvLTAyAAAAAAfQ///V0AADLTAzAAAAAAfP///HwAAHLTA0Ly0wMwAAAAAHy///1dAABy0wMy8tMDIAAAAA");
c("America/Menominee","ABFBbWVyaWNhL01lbm9taW5lZQfX//+roAADQ1NUAAAOEAADQ0RUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Merida","AA5BbWVyaWNhL01lcmlkYQfS//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B9H//6ugAANDU1QAAA4QAANDRFQEPgABAAAcIHcIbAAAAAAcIHcHzP//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfL//+roAADQ1NUAAAAAA==");
c("America/Metlakatla","ABJBbWVyaWNhL01ldGxha2F0bGEH4///gXAABEFLU1QAAA4QAARBS0RUAj4ACAAAHCB3Cj4AAQAAHCB3B+L//4+AAANQU1QAAAAAB9///4FwAARBS1NUAAAOEAAEQUtEVAI+AAgAABwgdwo+AAEAABwgdwfL//+PgAADUFNUAAAAAA==");
c("America/Mexico_City","ABNBbWVyaWNhL01leGljb19DaXR5B9L//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcH0f//q6AAA0NTVAAAAAAHzP//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfL//+roAADQ1NUAAAAAA==");
c("America/Miquelon","ABBBbWVyaWNhL01pcXVlbG9uB9f//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgI+AAgAABwgdwo+AAEAABwgdwfL///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Moncton","AA9BbWVyaWNhL01vbmN0b24H1///x8AAA0FTVAAADhAAA0FEVAI+AAgAABwgdwo+AAEAABwgdwfL///HwAADQVNUAAAOEAADQURUAz4AAQAAADx3CWwAAAAAADx3");
c("America/Monterrey","ABFBbWVyaWNhL01vbnRlcnJleQfS//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B9H//6ugAANDU1QAAA4QAANDRFQEPgABAAAcIHcIbAAAAAAcIHcHzP//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfL//+roAADQ1NUAAAAAA==");
c("America/Montevideo","ABJBbWVyaWNhL01vbnRldmlkZW8H3///1dAABy0wMy8tMDIAAAAAB9b//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AAEAABwgdwI+AAgAABwgdwfV///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJZAAJAAAcIHcCZAAbAAAcIHcHy///1dAABy0wMy8tMDIAAAAA");
c("America/Kentucky/Monticello","ABtBbWVyaWNhL0tlbnR1Y2t5L01vbnRpY2VsbG8H1///ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfQ//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3B8v//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Nassau","AA5BbWVyaWNhL05hc3NhdQfX//+5sAADRVNUAAAOEAADRURUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//7mwAANFU1QAAA4QAANFRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/North_Dakota/New_Salem","AB5BbWVyaWNhL05vcnRoX0Rha290YS9OZXdfU2FsZW0H1///q6AAA0NTVAAADhAAA0NEVAI+AAgAABwgdwo+AAEAABwgdwfT//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B8v//52QAANNU1QAAA4QAANNRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/New_York","ABBBbWVyaWNhL05ld19Zb3JrB9f//7mwAANFU1QAAA4QAANFRFQCPgAIAAAcIHcKPgABAAAcIHcHy///ubAAA0VTVAAADhAAA0VEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Nipigon","AA9BbWVyaWNhL05pcGlnb24H1///ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfL//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Nome","AAxBbWVyaWNhL05vbWUH1///gXAABEFLU1QAAA4QAARBS0RUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//4FwAARBS1NUAAAOEAAEQUtEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Noronha","AA9BbWVyaWNhL05vcm9uaGEH0v//4+AAAy0wMgAAAAAH0f//4+AABy0wMi8tMDEAAA4QAActMDIvLTAxCT4ACAAAAAB3AT4ADwAAAAB3B9D//+PgAAMtMDIAAAAAB8///+PgAActMDIvLTAxAAAOEAAHLTAyLy0wMQlkAAMAAAAAdwFkABUAAAAAdwfL///j4AADLTAyAAAAAA==");
c("America/Ojinaga","AA9BbWVyaWNhL09qaW5hZ2EH2v//nZAAA01TVAAADhAAA01EVAI+AAgAABwgdwo+AAEAABwgdwfS//+dkAADTVNUAAAOEAADTURUAz4AAQAAHCB3CWwAAAAAHCB3B9H//52QAANNU1QAAA4QAANNRFQEPgABAAAcIHcIbAAAAAAcIHcHzv//nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdwfM//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B8v//6ugAANDU1QAAAAA");
c("America/Panama","AA5BbWVyaWNhL1BhbmFtYQfL//+5sAADRVNUAAAAAA==");
c("America/Pangnirtung","ABNBbWVyaWNhL1BhbmduaXJ0dW5nB9f//7mwAANFU1QAAA4QAANFRFQCPgAIAAAcIHcKPgABAAAcIHcH0P//ubAAA0VTVAAADhAAA0VEVAM+AAEAABwgdwlsAAAAABwgdwfP//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3B8v//7mwAANFU1QAAA4QAANFRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Paramaribo","ABJBbWVyaWNhL1BhcmFtYXJpYm8Hy///1dAAAy0wMwAAAAA=");
c("America/Indiana/Petersburg","ABpBbWVyaWNhL0luZGlhbmEvUGV0ZXJzYnVyZwfX//+5sAADRVNUAAAOEAADRURUAj4ACAAAHCB3Cj4AAQAAHCB3B9b//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcHy///ubAAA0VTVAAAAAA=");
c("America/Phoenix","AA9BbWVyaWNhL1Bob2VuaXgHy///nZAAA01TVAAAAAA=");
c("America/Port-au-Prince","ABZBbWVyaWNhL1BvcnQtYXUtUHJpbmNlB+H//7mwAANFU1QAAA4QAANFRFQCPgAIAAAcIHcKPgABAAAcIHcH4P//ubAAA0VTVAAAAAAH3P//ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfX//+5sAADRVNUAAAAAAfV//+5sAADRVNUAAAOEAADRURUAz4AAQAAAAB3CWwAAAAAAAB3B87//7mwAANFU1QAAAAAB8v//7mwAANFU1QAAA4QAANFRFQDPgABAAAOEHMJbAAAAAAOEHM=");
c("America/Port_of_Spain","ABVBbWVyaWNhL1BvcnRfb2ZfU3BhaW4Hy///x8AAA0FTVAAAAAA=");
c("America/Porto_Velho","ABNBbWVyaWNhL1BvcnRvX1ZlbGhvB8v//8fAAAMtMDQAAAAA");
c("America/Puerto_Rico","ABNBbWVyaWNhL1B1ZXJ0b19SaWNvB8v//8fAAANBU1QAAAAA");
c("America/Punta_Arenas","ABRBbWVyaWNhL1B1bnRhX0FyZW5hcwfg///V0AADLTAzAAAAAAff///HwAAHLTA0Ly0wMwAAAAAH3P//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCD4AAgAAOEB1Az4AFwAAKjB1B9v//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwc+ABAAADhAdQQ+AAIAACowdQfa///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAJAAA4QHUDPgABAAAqMHUH2f//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1Aj4ACQAAKjB1B9j//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAkAADhAdQJkAB4AACowdQfQ///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAJAAA4QHUCPgAJAAAqMHUHz///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1A2QABAAAKjB1B87//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwhkABsAADhAdQI+AAkAACowdQfN///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAJAAA4QHUCZAAeAAAqMHUHy///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1Aj4ACQAAKjB1");
c("America/Rainy_River","ABNBbWVyaWNhL1JhaW55X1JpdmVyB9f//6ugAANDU1QAAA4QAANDRFQCPgAIAAAcIHcKPgABAAAcIHcHy///q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Rankin_Inlet","ABRBbWVyaWNhL1Jhbmtpbl9JbmxldAfX//+roAADQ1NUAAAOEAADQ0RUAj4ACAAAHCB3Cj4AAQAAHCB3B9H//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcH0P//ubAAA0VTVAAAAAAHy///q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Recife","AA5BbWVyaWNhL1JlY2lmZQfS///V0AADLTAzAAAAAAfR///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAIAAAAAHcBPgAPAAAAAHcH0P//1dAAAy0wMwAAAAAHz///1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCWQAAwAAAAB3AWQAFQAAAAB3B8v//9XQAAMtMDMAAAAA");
c("America/Regina","AA5BbWVyaWNhL1JlZ2luYQfL//+roAADQ1NUAAAAAA==");
c("America/Resolute","ABBBbWVyaWNhL1Jlc29sdXRlB9f//6ugAANDU1QAAA4QAANDRFQCPgAIAAAcIHcKPgABAAAcIHcH1v//ubAAA0VTVAAAAAAH0f//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfQ//+5sAADRVNUAAAAAAfL//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Rio_Branco","ABJBbWVyaWNhL1Jpb19CcmFuY28H3f//ubAAAy0wNQAAAAAH2P//x8AAAy0wNAAAAAAHy///ubAAAy0wNQAAAAA=");
c("America/Argentina/Rio_Gallegos","AB5BbWVyaWNhL0FyZ2VudGluYS9SaW9fR2FsbGVnb3MH2P//1dAAAy0wMwAAAAAH1P//1dAABy0wMy8tMDIAAAAAB9D//9XQAAMtMDMAAAAAB8///8fAAActMDQvLTAzAAAAAAfL///V0AAHLTAzLy0wMgAAAAA=");
c("America/Argentina/Salta","ABdBbWVyaWNhL0FyZ2VudGluYS9TYWx0YQfY///V0AADLTAzAAAAAAfQ///V0AAHLTAzLy0wMgAAAAAHz///x8AABy0wNC8tMDMAAAAAB8v//9XQAActMDMvLTAyAAAAAA==");
c("America/Argentina/San_Juan","ABpBbWVyaWNhL0FyZ2VudGluYS9TYW5fSnVhbgfY///V0AADLTAzAAAAAAfU///V0AAHLTAzLy0wMgAAAAAH0P//1dAAAy0wMwAAAAAHz///x8AABy0wNC8tMDMAAAAAB8v//9XQAActMDMvLTAyAAAAAA==");
c("America/Argentina/San_Luis","ABpBbWVyaWNhL0FyZ2VudGluYS9TYW5fTHVpcwfZ///V0AADLTAzAAAAAAfY///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAIAAAAAHcCPgAIAAAAAHcH1P//1dAABy0wMy8tMDIAAAAAB9D//9XQAAMtMDMAAAAAB8///8fAAAMtMDMAAAAAB8v//9XQAAMtMDMAAAAA");
c("America/Santarem","ABBBbWVyaWNhL1NhbnRhcmVtB9j//9XQAAMtMDMAAAAAB8v//8fAAAMtMDQAAAAA");
c("America/Santiago","ABBBbWVyaWNhL1NhbnRpYWdvB+P//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwg+AAIAADhAdQM+AAIAACowdQfg///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMHPgAJAAA4QHUEPgAJAAAqMHUH3///x8AABy0wNC8tMDMAAAAAB9z//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwg+AAIAADhAdQM+ABcAACowdQfb///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMHPgAQAAA4QHUEPgACAAAqMHUH2v//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1Az4AAQAAKjB1B9n//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAkAADhAdQI+AAkAACowdQfY///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAJAAA4QHUCZAAeAAAqMHUH0P//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1Aj4ACQAAKjB1B8///8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAkAADhAdQNkAAQAACowdQfO///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMIZAAbAAA4QHUCPgAJAAAqMHUHzf//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1AmQAHgAAKjB1B8v//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAkAADhAdQI+AAkAACowdQ==");
c("America/Santo_Domingo","ABVBbWVyaWNhL1NhbnRvX0RvbWluZ28H0P//x8AAA0FTVAAAAAAHy///x8AAA0FTVAAAAAA=");
c("America/Sao_Paulo","ABFBbWVyaWNhL1Nhb19QYXVsbwfj///V0AAHLTAzLy0wMgAAAAAH4v//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCj4AAQAAAAB3AT4ADwAAAAB3B+D//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AA8AAAAAdwE+AA8AAAAAdwff///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAPAAAAAHcBPgAWAAAAAHcH3f//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCT4ADwAAAAB3AT4ADwAAAAB3B9z//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AA8AAAAAdwE+ABYAAAAAdwfY///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAPAAAAAHcBPgAPAAAAAHcH1///1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCT4ACAAAAAB3AWQAGQAAAAB3B9b//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgpkAAUAAAAAdwE+AA8AAAAAdwfV///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJZAAQAAAAAHcBPgAPAAAAAHcH1P//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCmQAAgAAAAB3AT4ADwAAAAB3B9P//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMglkABMAAAAAdwE+AA8AAAAAdwfS///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIKZAADAAAAAHcBPgAPAAAAAHcH0f//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCT4ACAAAAAB3AT4ADwAAAAB3B9D//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMgk+AAgAAAAAdwFkABsAAAAAdwfP///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJZAADAAAAAHcBZAAVAAAAAHcHzv//1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCWQACwAAAAB3AmQAAQAAAAB3B83//9XQAActMDMvLTAyAAAOEAAHLTAzLy0wMglkAAYAAAAAdwFkABAAAAAAdwfM///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJZAAGAAAAAHcBZAALAAAAAHcHy///1dAABy0wMy8tMDIAAA4QAActMDMvLTAyCT4ACwAAAAB3AT4ADwAAAAB3");
c("America/Scoresbysund","ABRBbWVyaWNhL1Njb3Jlc2J5c3VuZAfM///x8AAHLTAxLyswMAAADhAABy0wMS8rMDACbAAAAAAOEHUJbAAAAAAOEHUHy///8fAABy0wMS8rMDAAAA4QAActMDEvKzAwAmwAAAAADhB1CGwAAAAADhB1");
c("America/Sitka","AA1BbWVyaWNhL1NpdGthB9f//4FwAARBS1NUAAAOEAAEQUtEVAI+AAgAABwgdwo+AAEAABwgdwfL//+BcAAEQUtTVAAADhAABEFLRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/St_Johns","ABBBbWVyaWNhL1N0X0pvaG5zB9v//87IAANOU1QAAA4QAANORFQCPgAIAAAcIHcKPgABAAAcIHcH1///zsgAA05TVAAADhAAA05EVAI+AAgAAAA8dwo+AAEAAAA8dwfL///OyAADTlNUAAAOEAADTkRUAz4AAQAAADx3CWwAAAAAADx3");
c("America/Swift_Current","ABVBbWVyaWNhL1N3aWZ0X0N1cnJlbnQHy///q6AAA0NTVAAAAAA=");
c("America/Tegucigalpa","ABNBbWVyaWNhL1RlZ3VjaWdhbHBhB9f//6ugAANDU1QAAAAAB9b//6ugAANDU1QAAA4QAANDRFQEPgABAAAAAHcHPgEBAAAAAHcHy///q6AAA0NTVAAAAAA=");
c("America/Indiana/Tell_City","ABlBbWVyaWNhL0luZGlhbmEvVGVsbF9DaXR5B9f//6ugAANDU1QAAA4QAANDRFQCPgAIAAAcIHcKPgABAAAcIHcH1v//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfL//+5sAADRVNUAAAAAA==");
c("America/Thule","AA1BbWVyaWNhL1RodWxlB9f//8fAAANBU1QAAA4QAANBRFQCPgAIAAAcIHcKPgABAAAcIHcHy///x8AAA0FTVAAADhAAA0FEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Thunder_Bay","ABNBbWVyaWNhL1RodW5kZXJfQmF5B9f//7mwAANFU1QAAA4QAANFRFQCPgAIAAAcIHcKPgABAAAcIHcHy///ubAAA0VTVAAADhAAA0VEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Tijuana","AA9BbWVyaWNhL1RpanVhbmEH2v//j4AAA1BTVAAADhAAA1BEVAI+AAgAABwgdwo+AAEAABwgdwfS//+PgAADUFNUAAAOEAADUERUAz4AAQAAHCB3CWwAAAAAHCB3B9H//4+AAANQU1QAAA4QAANQRFQDPgABAAAcIHcJbAAAAAAcIHcHzP//j4AAA1BTVAAADhAAA1BEVAM+AAEAABwgdwlsAAAAABwgdwfL//+PgAADUFNUAAAOEAADUERUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Toronto","AA9BbWVyaWNhL1Rvcm9udG8H1///ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfL//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Argentina/Tucuman","ABlBbWVyaWNhL0FyZ2VudGluYS9UdWN1bWFuB9n//9XQAActMDMvLTAyAAAAAAfY///V0AAHLTAzLy0wMgAADhAABy0wMy8tMDIJPgAPAAAAAHcCPgAPAAAAAHcH1P//1dAABy0wMy8tMDIAAAAAB9D//9XQAAMtMDMAAAAAB8///8fAAActMDQvLTAzAAAAAAfL///V0AAHLTAzLy0wMgAAAAA=");
c("America/Argentina/Ushuaia","ABlBbWVyaWNhL0FyZ2VudGluYS9Vc2h1YWlhB9j//9XQAAMtMDMAAAAAB9T//9XQAActMDMvLTAyAAAAAAfQ///V0AADLTAzAAAAAAfP///HwAAHLTA0Ly0wMwAAAAAHy///1dAABy0wMy8tMDIAAAAA");
c("America/Vancouver","ABFBbWVyaWNhL1ZhbmNvdXZlcgfX//+PgAADUFNUAAAOEAADUERUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//4+AAANQU1QAAA4QAANQRFQDPgABAAAcIHcJbAAAAAAcIHc=");
c("America/Indiana/Vevay","ABVBbWVyaWNhL0luZGlhbmEvVmV2YXkH1///ubAAA0VTVAAADhAAA0VEVAI+AAgAABwgdwo+AAEAABwgdwfW//+5sAADRVNUAAAOEAADRURUAz4AAQAAHCB3CWwAAAAAHCB3B8v//7mwAANFU1QAAAAA");
c("America/Indiana/Vincennes","ABlBbWVyaWNhL0luZGlhbmEvVmluY2VubmVzB9f//7mwAANFU1QAAA4QAANFRFQCPgAIAAAcIHcKPgABAAAcIHcH1v//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfL//+5sAADRVNUAAAAAA==");
c("America/Whitehorse","ABJBbWVyaWNhL1doaXRlaG9yc2UH1///j4AAA1BTVAAADhAAA1BEVAI+AAgAABwgdwo+AAEAABwgdwfL//+PgAADUFNUAAAOEAADUERUAz4AAQAAHCB3CWwAAAAAHCB3");
c("America/Indiana/Winamac","ABdBbWVyaWNhL0luZGlhbmEvV2luYW1hYwfX//+5sAADRVNUAAAOEAADRURUAj4ACAAAHCB3Cj4AAQAAHCB3B9b//6ugAANDU1QAAA4QAANDRFQDPgABAAAcIHcJbAAAAAAcIHcHy///ubAAA0VTVAAAAAA=");
c("America/Winnipeg","ABBBbWVyaWNhL1dpbm5pcGVnB9f//6ugAANDU1QAAA4QAANDRFQCPgAIAAAcIHcKPgABAAAcIHcH1v//q6AAA0NTVAAADhAAA0NEVAM+AAEAABwgdwlsAAAAABwgdwfL//+roAADQ1NUAAAOEAADQ0RUAz4AAQAAHCBzCWwAAAAAHCBz");
c("America/Yakutat","AA9BbWVyaWNhL1lha3V0YXQH1///gXAABEFLU1QAAA4QAARBS0RUAj4ACAAAHCB3Cj4AAQAAHCB3B8v//4FwAARBS1NUAAAOEAAEQUtEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("America/Yellowknife","ABNBbWVyaWNhL1llbGxvd2tuaWZlB9f//52QAANNU1QAAA4QAANNRFQCPgAIAAAcIHcKPgABAAAcIHcHy///nZAAA01TVAAADhAAA01EVAM+AAEAABwgdwlsAAAAABwgdw==");
c("Indian/Chagos","AA1JbmRpYW4vQ2hhZ29zB8wAAFRgAAMrMDYAAAAAB8sAAEZQAAMrMDUAAAAA");
c("Indian/Christmas","ABBJbmRpYW4vQ2hyaXN0bWFzB8sAAGJwAAMrMDcAAAAA");
c("Indian/Cocos","AAxJbmRpYW4vQ29jb3MHywAAW2gABSswNjMwAAAAAA==");
c("Indian/Kerguelen","ABBJbmRpYW4vS2VyZ3VlbGVuB8sAAEZQAAMrMDUAAAAA");
c("Indian/Mahe","AAtJbmRpYW4vTWFoZQfLAAA4QAADKzA0AAAAAA==");
c("Indian/Maldives","AA9JbmRpYW4vTWFsZGl2ZXMHywAARlAAAyswNQAAAAA=");
c("Indian/Mauritius","ABBJbmRpYW4vTWF1cml0aXVzB8sAADhAAAcrMDQvKzA1AAAAAA==");
c("Indian/Reunion","AA5JbmRpYW4vUmV1bmlvbgfLAAA4QAADKzA0AAAAAA==");
c("Antarctica/Casey","ABBBbnRhcmN0aWNhL0Nhc2V5B+IAAHCAAAMrMDgAAAAAB+AAAJqwAAMrMTEAAAAAB9wAAHCAAAMrMDgAAAAAB9sAAJqwAAMrMTEAAAAAB9oAAHCAAAMrMDgAAAAAB9kAAJqwAAMrMTEAAAAAB8sAAHCAAAMrMDgAAAAA");
c("Antarctica/Davis","ABBBbnRhcmN0aWNhL0RhdmlzB9wAAGJwAAMrMDcAAAAAB9sAAEZQAAMrMDUAAAAAB9oAAGJwAAMrMDcAAAAAB9kAAEZQAAMrMDUAAAAAB8sAAGJwAAMrMDcAAAAA");
c("Antarctica/DumontDUrville","ABlBbnRhcmN0aWNhL0R1bW9udERVcnZpbGxlB8sAAIygAAMrMTAAAAAA");
c("Antarctica/Macquarie","ABRBbnRhcmN0aWNhL01hY3F1YXJpZQfaAACasAADKzExAAAAAAfYAACMoAAEQUVTVAAADhAABEFFRFQJPgABAAAcIHMDPgABAAAcIHMH1wAAjKAABEFFU1QAAA4QAARBRURUCT4AAQAAHCBzAmwAAAAAHCBzB9YAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwM+AAEAABwgcwfRAACMoAAEQUVTVAAADhAABEFFRFQJPgABAAAcIHMCbAAAAAAcIHMH0AAAjKAABEFFU1QAAA4QAARBRURUB2wAAAAAHCBzAmwAAAAAHCBzB8sAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwJsAAAAABwgcw==");
c("Antarctica/Mawson","ABFBbnRhcmN0aWNhL01hd3NvbgfZAABGUAADKzA1AAAAAAfLAABUYAADKzA2AAAAAA==");
c("Antarctica/Palmer","ABFBbnRhcmN0aWNhL1BhbG1lcgfg///V0AADLTAzAAAAAAff///HwAAHLTA0Ly0wMwAAAAAH3P//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCD4AAgAAOEB1Az4AFwAAKjB1B9v//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwc+ABAAADhAdQQ+AAIAACowdQfa///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAJAAA4QHUDPgABAAAqMHUH2f//x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1Aj4ACQAAKjB1B9j//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwk+AAkAADhAdQJkAB4AACowdQfQ///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAJAAA4QHUCPgAJAAAqMHUHz///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1A2QABAAAKjB1B87//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwhkABsAADhAdQI+AAkAACowdQfN///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMJPgAJAAA4QHUCZAAeAAAqMHUHy///x8AABy0wNC8tMDMAAA4QAActMDQvLTAzCT4ACQAAOEB1Aj4ACQAAKjB1");
c("Antarctica/Rothera","ABJBbnRhcmN0aWNhL1JvdGhlcmEHy///1dAAAy0wMwAAAAA=");
c("Antarctica/Syowa","ABBBbnRhcmN0aWNhL1N5b3dhB8sAACowAAMrMDMAAAAA");
c("Antarctica/Troll","ABBBbnRhcmN0aWNhL1Ryb2xsB9UAAAAAAAErAAAcIAABKwJsAAAAAA4QdQlsAAAAAA4QdQfLAAAAAAADLTAwAAAAAA==");
c("Antarctica/Vostok","ABFBbnRhcmN0aWNhL1Zvc3RvawfLAABUYAADKzA2AAAAAA==");
c("Australia/Adelaide","ABJBdXN0cmFsaWEvQWRlbGFpZGUH2AAAhZgABEFDU1QAAA4QAARBQ0RUCT4AAQAAHCBzAz4AAQAAHCBzB9cAAIWYAARBQ1NUAAAOEAAEQUNEVAlsAAAAABwgcwJsAAAAABwgcwfWAACFmAAEQUNTVAAADhAABEFDRFQJbAAAAAAcIHMDZAACAAAcIHMHywAAhZgABEFDU1QAAA4QAARBQ0RUCWwAAAAAHCBzAmwAAAAAHCBz");
c("Australia/Brisbane","ABJBdXN0cmFsaWEvQnJpc2JhbmUHywAAjKAABEFFU1QAAAAA");
c("Australia/Broken_Hill","ABVBdXN0cmFsaWEvQnJva2VuX0hpbGwH2AAAhZgABEFDU1QAAA4QAARBQ0RUCT4AAQAAHCBzAz4AAQAAHCBzB9cAAIWYAARBQ1NUAAAOEAAEQUNEVAlsAAAAABwgcwJsAAAAABwgcwfWAACFmAAEQUNTVAAADhAABEFDRFQJbAAAAAAcIHMDZAACAAAcIHMH0AAAhZgABEFDU1QAAA4QAARBQ0RUCWwAAAAAHCBzAmwAAAAAHCBzB8wAAIWYAARBQ1NUAAAOEAAEQUNEVAlsAAAAABwgcwJsAAAAABwgcwfLAACFmAAEQUNTVAAADhAABEFDRFQJbAAAAAAcIHMCPgABAAAcIHM=");
c("Australia/Currie","ABBBdXN0cmFsaWEvQ3VycmllB9gAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwM+AAEAABwgcwfXAACMoAAEQUVTVAAADhAABEFFRFQJPgABAAAcIHMCbAAAAAAcIHMH1gAAjKAABEFFU1QAAA4QAARBRURUCT4AAQAAHCBzAz4AAQAAHCBzB9EAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwJsAAAAABwgcwfQAACMoAAEQUVTVAAADhAABEFFRFQHbAAAAAAcIHMCbAAAAAAcIHMHywAAjKAABEFFU1QAAA4QAARBRURUCT4AAQAAHCBzAmwAAAAAHCBz");
c("Australia/Darwin","ABBBdXN0cmFsaWEvRGFyd2luB8sAAIWYAARBQ1NUAAAAAA==");
c("Australia/Eucla","AA9BdXN0cmFsaWEvRXVjbGEH2QAAewwACyswODQ1LyswOTQ1AAAAAAfXAAB7DAALKzA4NDUvKzA5NDUAAA4QAAsrMDg0NS8rMDk0NQlsAAAAABwgcwJsAAAAABwgcwfLAAB7DAALKzA4NDUvKzA5NDUAAAAA");
c("Australia/Hobart","ABBBdXN0cmFsaWEvSG9iYXJ0B9gAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwM+AAEAABwgcwfXAACMoAAEQUVTVAAADhAABEFFRFQJPgABAAAcIHMCbAAAAAAcIHMH1gAAjKAABEFFU1QAAA4QAARBRURUCT4AAQAAHCBzAz4AAQAAHCBzB9EAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwJsAAAAABwgcwfQAACMoAAEQUVTVAAADhAABEFFRFQHbAAAAAAcIHMCbAAAAAAcIHMHywAAjKAABEFFU1QAAA4QAARBRURUCT4AAQAAHCBzAmwAAAAAHCBz");
c("Australia/Lindeman","ABJBdXN0cmFsaWEvTGluZGVtYW4HywAAjKAABEFFU1QAAAAA");
c("Australia/Lord_Howe","ABNBdXN0cmFsaWEvTG9yZF9Ib3dlB9gAAJOoAAkrMTAzMC8rMTEAAAcIAAkrMTAzMC8rMTEJPgABAAAcIHcDPgABAAAcIHcH1wAAk6gACSsxMDMwLysxMQAABwgACSsxMDMwLysxMQlsAAAAABwgdwJsAAAAABwgdwfWAACTqAAJKzEwMzAvKzExAAAHCAAJKzEwMzAvKzExCWwAAAAAHCB3Az4AAQAAHCB3B9EAAJOoAAkrMTAzMC8rMTEAAAcIAAkrMTAzMC8rMTEJbAAAAAAcIHcCbAAAAAAcIHcH0AAAk6gACSsxMDMwLysxMQAABwgACSsxMDMwLysxMQdsAAAAABwgdwJsAAAAABwgdwfMAACTqAAJKzEwMzAvKzExAAAHCAAJKzEwMzAvKzExCWwAAAAAHCB3AmwAAAAAHCB3B8sAAJOoAAkrMTAzMC8rMTEAAAcIAAkrMTAzMC8rMTEJbAAAAAAcIHcCPgABAAAcIHc=");
c("Australia/Melbourne","ABNBdXN0cmFsaWEvTWVsYm91cm5lB9gAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwM+AAEAABwgcwfXAACMoAAEQUVTVAAADhAABEFFRFQJbAAAAAAcIHMCbAAAAAAcIHMH1gAAjKAABEFFU1QAAA4QAARBRURUCWwAAAAAHCBzAz4AAQAAHCBzB9EAAIygAARBRVNUAAAOEAAEQUVEVAlsAAAAABwgcwJsAAAAABwgcwfQAACMoAAEQUVTVAAADhAABEFFRFQHbAAAAAAcIHMCbAAAAAAcIHMHywAAjKAABEFFU1QAAA4QAARBRURUCWwAAAAAHCBzAmwAAAAAHCBz");
c("Australia/Perth","AA9BdXN0cmFsaWEvUGVydGgH2QAAcIAABEFXU1QAAAAAB9cAAHCAAARBV1NUAAAOEAAEQVdEVAlsAAAAABwgcwJsAAAAABwgcwfLAABwgAAEQVdTVAAAAAA=");
c("Australia/Sydney","ABBBdXN0cmFsaWEvU3lkbmV5B9gAAIygAARBRVNUAAAOEAAEQUVEVAk+AAEAABwgcwM+AAEAABwgcwfXAACMoAAEQUVTVAAADhAABEFFRFQJbAAAAAAcIHMCbAAAAAAcIHMH1gAAjKAABEFFU1QAAA4QAARBRURUCWwAAAAAHCBzAz4AAQAAHCBzB9EAAIygAARBRVNUAAAOEAAEQUVEVAlsAAAAABwgcwJsAAAAABwgcwfQAACMoAAEQUVTVAAADhAABEFFRFQHbAAAAAAcIHMCbAAAAAAcIHMHzAAAjKAABEFFU1QAAA4QAARBRURUCWwAAAAAHCBzAmwAAAAAHCBzB8sAAIygAARBRVNUAAAOEAAEQUVEVAlsAAAAABwgcwI+AAEAABwgcw==");
c("Atlantic/Azores","AA9BdGxhbnRpYy9Bem9yZXMHzP//8fAABy0wMS8rMDAAAA4QAActMDEvKzAwAmwAAAAADhB1CWwAAAAADhB1B8v///HwAActMDEvKzAwAAAOEAAHLTAxLyswMAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Atlantic/Bermuda","ABBBdGxhbnRpYy9CZXJtdWRhB9f//8fAAANBU1QAAA4QAANBRFQCPgAIAAAcIHcKPgABAAAcIHcHy///x8AAA0FTVAAADhAAA0FEVAM+AAEAABwgdwlsAAAAABwgdw==");
c("Atlantic/Canary","AA9BdGxhbnRpYy9DYW5hcnkHzAAAAAAAA1dFVAAADhAABFdFU1QCbAAAAAAOEHUJbAAAAAAOEHUHywAAAAAAA1dFVAAADhAABFdFU1QCbAAAAAAOEHUIbAAAAAAOEHU=");
c("Atlantic/Cape_Verde","ABNBdGxhbnRpYy9DYXBlX1ZlcmRlB8v///HwAAMtMDEAAAAA");
c("Atlantic/Faroe","AA5BdGxhbnRpYy9GYXJvZQfMAAAAAAADV0VUAAAOEAAEV0VTVAJsAAAAAA4QdQlsAAAAAA4QdQfLAAAAAAADV0VUAAAOEAAEV0VTVAJsAAAAAA4QdQhsAAAAAA4QdQ==");
c("Atlantic/Madeira","ABBBdGxhbnRpYy9NYWRlaXJhB8wAAAAAAANXRVQAAA4QAARXRVNUAmwAAAAADhB1CWwAAAAADhB1B8sAAAAAAANXRVQAAA4QAARXRVNUAmwAAAAADhB1CGwAAAAADhB1");
c("Atlantic/Reykjavik","ABJBdGxhbnRpYy9SZXlramF2aWsHywAAAAAAA0dNVAAAAAA=");
c("Atlantic/South_Georgia","ABZBdGxhbnRpYy9Tb3V0aF9HZW9yZ2lhB8v//+PgAAMtMDIAAAAA");
c("Atlantic/Stanley","ABBBdGxhbnRpYy9TdGFubGV5B9r//9XQAAMtMDMAAAAAB9H//8fAAActMDQvLTAzAAAOEAAHLTA0Ly0wMwg+AAEAABwgdwM+AA8AABwgdwfL///HwAAHLTA0Ly0wMwAADhAABy0wNC8tMDMIPgAJAAAAAHcDPgAQAAAAAHc=");
var a=fan.sys.TimeZone.alias$;
a("Africa/Asmera","Nairobi");
a("Africa/Timbuktu","Abidjan");
a("America/Argentina/ComodRivadavia","Catamarca");
a("America/Atka","Adak");
a("America/Buenos_Aires","Buenos_Aires");
a("America/Catamarca","Catamarca");
a("America/Coral_Harbour","Atikokan");
a("America/Cordoba","Cordoba");
a("America/Ensenada","Tijuana");
a("America/Fort_Wayne","Indianapolis");
a("America/Indianapolis","Indianapolis");
a("America/Jujuy","Jujuy");
a("America/Knox_IN","Knox");
a("America/Louisville","Louisville");
a("America/Mendoza","Mendoza");
a("America/Montreal","Toronto");
a("America/Porto_Acre","Rio_Branco");
a("America/Rosario","Cordoba");
a("America/Santa_Isabel","Tijuana");
a("America/Shiprock","Denver");
a("America/Virgin","Port_of_Spain");
a("Antarctica/South_Pole","Auckland");
a("Asia/Ashkhabad","Ashgabat");
a("Asia/Calcutta","Kolkata");
a("Asia/Chongqing","Shanghai");
a("Asia/Chungking","Shanghai");
a("Asia/Dacca","Dhaka");
a("Asia/Harbin","Shanghai");
a("Asia/Kashgar","Urumqi");
a("Asia/Katmandu","Kathmandu");
a("Asia/Macao","Macau");
a("Asia/Rangoon","Yangon");
a("Asia/Saigon","Ho_Chi_Minh");
a("Asia/Tel_Aviv","Jerusalem");
a("Asia/Thimbu","Thimphu");
a("Asia/Ujung_Pandang","Makassar");
a("Asia/Ulan_Bator","Ulaanbaatar");
a("Atlantic/Faeroe","Faroe");
a("Atlantic/Jan_Mayen","Oslo");
a("Australia/ACT","Sydney");
a("Australia/Canberra","Sydney");
a("Australia/LHI","Lord_Howe");
a("Australia/NSW","Sydney");
a("Australia/North","Darwin");
a("Australia/Queensland","Brisbane");
a("Australia/South","Adelaide");
a("Australia/Tasmania","Hobart");
a("Australia/Victoria","Melbourne");
a("Australia/West","Perth");
a("Australia/Yancowinna","Broken_Hill");
a("Brazil/Acre","Rio_Branco");
a("Brazil/DeNoronha","Noronha");
a("Brazil/East","Sao_Paulo");
a("Brazil/West","Manaus");
a("Canada/Atlantic","Halifax");
a("Canada/Central","Winnipeg");
a("Canada/Eastern","Toronto");
a("Canada/Mountain","Edmonton");
a("Canada/Newfoundland","St_Johns");
a("Canada/Pacific","Vancouver");
a("Canada/Saskatchewan","Regina");
a("Canada/Yukon","Whitehorse");
a("Chile/Continental","Santiago");
a("Chile/EasterIsland","Easter");
a("Cuba","Havana");
a("Egypt","Cairo");
a("Eire","Dublin");
a("Etc/UCT","UTC");
a("Europe/Belfast","London");
a("Europe/Tiraspol","Chisinau");
a("GB","London");
a("GB-Eire","London");
a("GMT+0","GMT");
a("GMT-0","GMT");
a("GMT0","GMT");
a("Greenwich","GMT");
a("Hongkong","Hong_Kong");
a("Iceland","Reykjavik");
a("Iran","Tehran");
a("Israel","Jerusalem");
a("Japan","Tokyo");
a("Libya","Tripoli");
a("Mexico/BajaNorte","Tijuana");
a("Mexico/BajaSur","Mazatlan");
a("Mexico/General","Mexico_City");
a("NZ","Auckland");
a("NZ-CHAT","Chatham");
a("Navajo","Denver");
a("PRC","Shanghai");
a("Pacific/Johnston","Honolulu");
a("Pacific/Ponape","Pohnpei");
a("Pacific/Samoa","Pago_Pago");
a("Pacific/Truk","Chuuk");
a("Pacific/Yap","Chuuk");
a("Poland","Warsaw");
a("Portugal","Lisbon");
a("ROC","Taipei");
a("ROK","Seoul");
a("Turkey","Istanbul");
a("UCT","UTC");
a("US/Alaska","Anchorage");
a("US/Aleutian","Adak");
a("US/Arizona","Phoenix");
a("US/Central","Chicago");
a("US/East-Indiana","Indianapolis");
a("US/Eastern","New_York");
a("US/Hawaii","Honolulu");
a("US/Indiana-Starke","Knox");
a("US/Michigan","Detroit");
a("US/Mountain","Denver");
a("US/Pacific","Los_Angeles");
a("US/Samoa","Pago_Pago");
a("Universal","UTC");
a("W-SU","Moscow");
a("Zulu","UTC");
})();
fan.sys.Pod.$sysPod = fan.sys.Pod.find("sys");
fan.sys.Bool.m_defVal = false;
fan.sys.ConstBuf.errInStream  = new fan.sys.ErrInStream();
fan.sys.ConstBuf.errOutStream = new fan.sys.ErrOutStream();
fan.sys.Int.m_maxVal = Math.pow(2, 53)
fan.sys.Int.m_minVal = -Math.pow(2, 53)
fan.sys.Int.m_defVal = 0;
fan.sys.Int.Chunk  = 4096;
fan.sys.Float.m_posInf = fan.sys.Float.make(Number.POSITIVE_INFINITY);
fan.sys.Float.m_negInf = fan.sys.Float.make(Number.NEGATIVE_INFINITY);
fan.sys.Float.m_nan    = fan.sys.Float.make(Number.NaN);
fan.sys.Float.m_e      = fan.sys.Float.make(Math.E);
fan.sys.Float.m_pi     = fan.sys.Float.make(Math.PI);
fan.sys.Float.m_defVal = fan.sys.Float.make(0);
fan.sys.NumPattern.cache("00");    fan.sys.NumPattern.cache("000");       fan.sys.NumPattern.cache("0000");
fan.sys.NumPattern.cache("0.0");   fan.sys.NumPattern.cache("0.00");      fan.sys.NumPattern.cache("0.000");
fan.sys.NumPattern.cache("0.#");   fan.sys.NumPattern.cache("#,###.0");   fan.sys.NumPattern.cache("#,###.#");
fan.sys.NumPattern.cache("0.##");  fan.sys.NumPattern.cache("#,###.00");  fan.sys.NumPattern.cache("#,###.##");
fan.sys.NumPattern.cache("0.###"); fan.sys.NumPattern.cache("#,###.000"); fan.sys.NumPattern.cache("#,###.###");
fan.sys.NumPattern.cache("0.0#");  fan.sys.NumPattern.cache("#,###.0#");  fan.sys.NumPattern.cache("#,###.0#");
fan.sys.NumPattern.cache("0.0##"); fan.sys.NumPattern.cache("#,###.0##"); fan.sys.NumPattern.cache("#,###.0##");
fan.sys.Str.m_defVal = "";
fan.sys.Duration.nsPerDay   = 86400000000000;
fan.sys.Duration.nsPerHr    = 3600000000000;
fan.sys.Duration.nsPerMin   = 60000000000;
fan.sys.Duration.nsPerSec   = 1000000000;
fan.sys.Duration.nsPerMilli = 1000000;
fan.sys.Duration.secPerDay  = 86400;
fan.sys.Duration.secPerHr   = 3600;
fan.sys.Duration.secPerMin  = 60;
fan.sys.Duration.m_defVal    = fan.sys.Duration.make(0);
fan.sys.Duration.m_minVal    = fan.sys.Duration.make(fan.sys.Int.m_minVal);
fan.sys.Duration.m_maxVal    = fan.sys.Duration.make(fan.sys.Int.m_maxVal);
fan.sys.Duration.m_oneDay    = fan.sys.Duration.make(fan.sys.Duration.nsPerDay);
fan.sys.Duration.m_oneMin    = fan.sys.Duration.make(fan.sys.Duration.nsPerMin);
fan.sys.Duration.m_oneSec    = fan.sys.Duration.make(fan.sys.Duration.nsPerSec);
fan.sys.Duration.m_negOneDay = fan.sys.Duration.make(-fan.sys.Duration.nsPerDay);
fan.sys.Duration.m_boot      = fan.sys.Duration.now();
fan.sys.Endian.m_big    = new fan.sys.Endian(0,  "big");
fan.sys.Endian.m_little = new fan.sys.Endian(1,  "little");
fan.sys.Endian.m_vals = fan.sys.List.make(fan.sys.Endian.$type,
[
fan.sys.Endian.m_big,
fan.sys.Endian.m_little
]);
fan.sys.OutStream.m_xmlEscNewlines = 0x01;
fan.sys.OutStream.m_xmlEscQuotes   = 0x02;
fan.sys.OutStream.m_xmlEscUnicode  = 0x04;
fan.sys.Uri.parentRange = fan.sys.Range.make(0, -2, false);
fan.sys.Uri.m_defVal = fan.sys.Uri.fromStr("");
fan.sys.Locale.m_en = fan.sys.Locale.fromStr("en")
fan.sys.LogLevel.m_debug  = new fan.sys.LogLevel(0, "debug");
fan.sys.LogLevel.m_info   = new fan.sys.LogLevel(1, "info");
fan.sys.LogLevel.m_warn   = new fan.sys.LogLevel(2, "warn");
fan.sys.LogLevel.m_err    = new fan.sys.LogLevel(3, "err");
fan.sys.LogLevel.m_silent = new fan.sys.LogLevel(4, "silent");
fan.sys.LogLevel.m_vals = fan.sys.List.make(fan.sys.LogLevel.$type,
[
fan.sys.LogLevel.m_debug,
fan.sys.LogLevel.m_info,
fan.sys.LogLevel.m_warn,
fan.sys.LogLevel.m_err,
fan.sys.LogLevel.m_silent
]).toImmutable();
fan.sys.Log.m_handlers.push(fan.sys.Func.make(
fan.sys.List.make(fan.sys.Param.$type, new fan.sys.Param("rec", fan.sys.LogRec.$type, false)),
fan.sys.Void.$type,
function(rec) { rec.print(); }
));
fan.sys.Month.m_jan = new fan.sys.Month(0,  "jan");
fan.sys.Month.m_feb = new fan.sys.Month(1,  "feb");
fan.sys.Month.m_mar = new fan.sys.Month(2,  "mar");
fan.sys.Month.m_apr = new fan.sys.Month(3,  "apr");
fan.sys.Month.m_may = new fan.sys.Month(4,  "may");
fan.sys.Month.m_jun = new fan.sys.Month(5,  "jun");
fan.sys.Month.m_jul = new fan.sys.Month(6,  "jul");
fan.sys.Month.m_aug = new fan.sys.Month(7,  "aug");
fan.sys.Month.m_sep = new fan.sys.Month(8,  "sep");
fan.sys.Month.m_oct = new fan.sys.Month(9,  "oct");
fan.sys.Month.m_nov = new fan.sys.Month(10, "nov");
fan.sys.Month.m_dec = new fan.sys.Month(11, "dec");
fan.sys.Month.m_vals = fan.sys.List.make(fan.sys.Month.$type,
[
fan.sys.Month.m_jan,
fan.sys.Month.m_feb,
fan.sys.Month.m_mar,
fan.sys.Month.m_apr,
fan.sys.Month.m_may,
fan.sys.Month.m_jun,
fan.sys.Month.m_jul,
fan.sys.Month.m_aug,
fan.sys.Month.m_sep,
fan.sys.Month.m_oct,
fan.sys.Month.m_nov,
fan.sys.Month.m_dec
]).toImmutable();
fan.sys.Weekday.m_sun = new fan.sys.Weekday(0,  "sun");
fan.sys.Weekday.m_mon = new fan.sys.Weekday(1,  "mon");
fan.sys.Weekday.m_tue = new fan.sys.Weekday(2,  "tue");
fan.sys.Weekday.m_wed = new fan.sys.Weekday(3,  "wed");
fan.sys.Weekday.m_thu = new fan.sys.Weekday(4,  "thu");
fan.sys.Weekday.m_fri = new fan.sys.Weekday(5,  "fri");
fan.sys.Weekday.m_sat = new fan.sys.Weekday(6,  "sat");
fan.sys.Weekday.m_vals = fan.sys.List.make(fan.sys.Weekday.$type,
[
fan.sys.Weekday.m_sun,
fan.sys.Weekday.m_mon,
fan.sys.Weekday.m_tue,
fan.sys.Weekday.m_wed,
fan.sys.Weekday.m_thu,
fan.sys.Weekday.m_fri,
fan.sys.Weekday.m_sat
]).toImmutable();
fan.sys.TimeZone.m_utc = fan.sys.TimeZone.fromStr("UTC");
fan.sys.TimeZone.m_rel = fan.sys.TimeZone.fromStr("Rel");
fan.sys.Time.m_defVal = new fan.sys.Time(0, 0, 0, 0);
fan.sys.Date.m_defVal = new fan.sys.Date(2000, 0, 1);
fan.sys.DateTime.m_defVal = fan.sys.DateTime.make(
2000, fan.sys.Month.m_jan, 1, 0, 0, 0, 0, fan.sys.TimeZone.utc());
fan.sys.DateTime.m_boot = fan.sys.DateTime.now();
fan.sys.Regex.m_defVal = fan.sys.Regex.fromStr("");
fan.sys.Version.m_defVal = fan.sys.Version.fromStr("0");
fan.sys.Unit.m_quantityNames = fan.sys.List.make(fan.sys.Str.$type, []);
fan.sys.Env.m_configProps   = fan.sys.Uri.fromStr("config.props");
fan.sys.Env.m_localeEnProps = fan.sys.Uri.fromStr("locale/en.props");
with (fan.sys.Env.cur().$props("sys:locale/en.props"))
{
  set("dateTime","D-MMM-YYYY WWW hh:mm:ss zzz");
  set("date","D-MMM-YYYY");
  set("time","hh:mm");
  set("float","#,###.0##");
  set("decimal","#,###.0##");
  set("int","#,###");
  set("boolTrue","True");
  set("boolFalse","False");
  set("numMinus","-");
  set("numDecimal",".");
  set("numGrouping",",");
  set("numPercent","%");
  set("numPosInf","∞");
  set("numNegInf","-∞");
  set("numNaN","�");
  set("nsAbbr","ns");
  set("msAbbr","ms");
  set("secAbbr","sec");
  set("minAbbr","min");
  set("hourAbbr","hr");
  set("dayAbbr","day");
  set("daysAbbr","days");
  set("janAbbr","Jan");
  set("febAbbr","Feb");
  set("marAbbr","Mar");
  set("aprAbbr","Apr");
  set("mayAbbr","May");
  set("junAbbr","Jun");
  set("julAbbr","Jul");
  set("augAbbr","Aug");
  set("sepAbbr","Sep");
  set("octAbbr","Oct");
  set("novAbbr","Nov");
  set("decAbbr","Dec");
  set("janFull","January");
  set("febFull","February");
  set("marFull","March");
  set("aprFull","April");
  set("mayFull","May");
  set("junFull","June");
  set("julFull","July");
  set("augFull","August");
  set("sepFull","September");
  set("octFull","October");
  set("novFull","November");
  set("decFull","December");
  set("weekdayStart","sun");
  set("sunAbbr","Sun");
  set("monAbbr","Mon");
  set("tueAbbr","Tue");
  set("wedAbbr","Wed");
  set("thuAbbr","Thu");
  set("friAbbr","Fri");
  set("satAbbr","Sat");
  set("sunFull","Sunday");
  set("monFull","Monday");
  set("tueFull","Tuesday");
  set("wedFull","Wednesday");
  set("thuFull","Thursday");
  set("friFull","Friday");
  set("satFull","Saturday");
}
with (fan.sys.Env.cur().$props("sys:locale/en-US.props"))
{
  set("dateTime","D-MMM-YYYY WWW k:mm:ssAA zzz");
  set("time","k:mmAA");
}
with (fan.sys.Pod.find('sys'))
{
  m_meta = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
  m_meta.set("pod.version", "1.0.78");
  m_meta.set("pod.depends", "");
  m_meta = m_meta.toImmutable();
  m_version = fan.sys.Version.fromStr("1.0.78");
}
}).call(this);
(function() {
 var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');

 var c=fan.sys.MimeType.cache$;
 
c("as","text/plain; charset=utf-8");
c("atom","application/atom+xml");
c("c","text/plain; charset=utf-8");
c("class","application/java");
c("cpp","text/plain; charset=utf-8");
c("cs","text/plain; charset=utf-8");
c("css","text/css; charset=utf-8");
c("csv","text/csv");
c("doc","application/msword");
c("docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document");
c("dump","application/octet-stream");
c("exe","application/octet-stream");
c("fan","text/plain; charset=utf-8");
c("fandoc","text/plain; charset=utf-8");
c("fansym","text/plain; charset=utf-8");
c("fog","text/plain; charset=utf-8");
c("gif","image/gif");
c("gtar","application/x-gtar");
c("gz","application/x-gzip");
c("gzip","application/x-gzip");
c("h","text/plain; charset=utf-8");
c("htm","text/html; charset=utf-8");
c("html","text/html; charset=utf-8");
c("ico","image/x-icon");
c("ics","text/calendar");
c("java","text/plain");
c("jpeg","image/jpeg");
c("jpg","image/jpeg");
c("log","text/plain; charset=utf-8");
c("js","text/javascript; charset=utf-8");
c("json","application/json");
c("jsonld","application/ld+json");
c("map","application/json");
c("mp3","audio/mpeg3");
c("mpeg","video/mpeg");
c("obix","text/xml; charset=utf-8");
c("oga","audio/ogg");
c("ogg","audio/ogg");
c("ogv","video/ogg");
c("otf","font/otf");
c("pdf","application/pdf");
c("png","image/png");
c("pod","application/zip");
c("ppt","application/vnd.ms-powerpoint");
c("pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation");
c("props","text/plain; charset=utf-8");
c("properties","text/plain; charset=utf-8");
c("rss","application/rss+xml");
c("svg","image/svg+xml; charset=utf-8");
c("swf","application/x-shockwave-flash");
c("tar","application/x-tar");
c("txt","text/plain; charset=utf-8");
c("text","text/plain; charset=utf-8");
c("tiff","image/tiff");
c("trio","text/trio; charset=utf-8");
c("ttf","font/ttf");
c("ttl","text/turtle");
c("tsv","text/tab-separated-values");
c("wav","audio/wav");
c("woff","font/woff");
c("woff2","font/woff2");
c("xhtml","application/xhtml+xml");
c("xls","application/vnd.ms-excel");
c("xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
c("xml","text/xml; charset=utf-8");
c("zip","application/zip");
c("zinc","text/zinc; charset=utf-8");
}).call(this);
(function () {
var root=this;
var fan=root.fan;
if (!fan && (typeof require !== 'undefined')) fan = require('sys.js');


// dimensionless
fan.sys.Unit.m_quantityNames.add('dimensionless');
with (fan.sys.Unit.m_quantities['dimensionless'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('percent, %; ; 0.01'));
 add(fan.sys.Unit.define('pixel, px'));
 add(fan.sys.Unit.define('decibel, db'));
 add(fan.sys.Unit.define('power_factor, pf'));
 add(fan.sys.Unit.define('ph, pH'));
 add(fan.sys.Unit.define('percent_relative_humidity, %RH'));
 add(fan.sys.Unit.define('grams_of_water_per_kilogram_dry_air, gH₂O/kgAir'));
 add(fan.sys.Unit.define('volts_per_degree_kelvin, V/K'));
 add(fan.sys.Unit.define('degree_days_celsius, °daysC'));
 add(fan.sys.Unit.define('degree_days_fahrenheit, °daysF'));
 add(fan.sys.Unit.define('percent_obscuration_per_foot, %obsc/ft'));
 add(fan.sys.Unit.define('percent_obscuration_per_meter, %obsc/m'));
 add(fan.sys.Unit.define('psi_per_degree_fahrenheit, psi/°F'));
 add(fan.sys.Unit.define('square_meters_per_newton, m²/N'));
 add(fan.sys.Unit.define('watts_per_square_meter_degree_kelvin, W/m²K'));
 add(fan.sys.Unit.define('db_millivolt, dBmV'));
 add(fan.sys.Unit.define('db_microvolt, dBµV'));
 add(fan.sys.Unit.define('parts_per_unit, ppu'));
 add(fan.sys.Unit.define('parts_per_million, ppm; ; 1.0E-6'));
 add(fan.sys.Unit.define('parts_per_billion, ppb; ; 1.0E-9'));
 add(fan.sys.Unit.define('grams_per_kilogram, g/kg; ; 0.0010'));
 add(fan.sys.Unit.define('radian, rad'));
 add(fan.sys.Unit.define('degrees_angular, deg; ; 0.017453292519943'));
 add(fan.sys.Unit.define('degrees_phase, degPh; ; 0.017453292519943'));
 add(fan.sys.Unit.define('steradian, sr'));
 add(fan.sys.Unit.define('nephelometric_turbidity_units, ntu'));
 add(fan.sys.Unit.define('formazin_nephelometric_unit, fnu'));
 add(fan.sys.Unit.define('power_usage_effectiveness, PUE'));
 add(fan.sys.Unit.define('data_center_infrastructure_efficiency, DCIE'));
}
fan.sys.Unit.m_quantities['dimensionless'] = fan.sys.Unit.m_quantities['dimensionless'].toImmutable();
// currency
fan.sys.Unit.m_quantityNames.add('currency');
with (fan.sys.Unit.m_quantities['currency'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('afghani,AFN,Af'));
 add(fan.sys.Unit.define('algerian_dinar,DZD'));
 add(fan.sys.Unit.define('argentine_peso,ARS'));
 add(fan.sys.Unit.define('armenian_dram,AMD,Դ'));
 add(fan.sys.Unit.define('aruban_guilder_florin,AWG,ƒ'));
 add(fan.sys.Unit.define('australian_dollar,AUD'));
 add(fan.sys.Unit.define('azerbaijanian_manat,AZN,ман'));
 add(fan.sys.Unit.define('bahamian_dollar,BSD'));
 add(fan.sys.Unit.define('bahraini_dinar,BHD'));
 add(fan.sys.Unit.define('baht,THB,฿'));
 add(fan.sys.Unit.define('balboa,PAB'));
 add(fan.sys.Unit.define('barbados_dollar,BBD'));
 add(fan.sys.Unit.define('belarussian_ruble,BYR,Br'));
 add(fan.sys.Unit.define('belize_dollar,BZD'));
 add(fan.sys.Unit.define('bermudian_dollar,BMD'));
 add(fan.sys.Unit.define('bolivar_fuerte,VEF'));
 add(fan.sys.Unit.define('boliviano,BOB'));
 add(fan.sys.Unit.define('brazilian_real,BRL,R$'));
 add(fan.sys.Unit.define('brunei_dollar,BND'));
 add(fan.sys.Unit.define('bulgarian_lev,BGN,лв'));
 add(fan.sys.Unit.define('burundi_franc,BIF'));
 add(fan.sys.Unit.define('canadian_dollar,CAD'));
 add(fan.sys.Unit.define('cape_verde_escudo,CVE'));
 add(fan.sys.Unit.define('cayman_islands_dollar,KYD'));
 add(fan.sys.Unit.define('cedi,GHS,₵'));
 add(fan.sys.Unit.define('cfa_franc_bceao,XAF'));
 add(fan.sys.Unit.define('cfp_franc,XPF'));
 add(fan.sys.Unit.define('chilean_peso,CLP'));
 add(fan.sys.Unit.define('chinese_yuan,CNY, 元'));
 add(fan.sys.Unit.define('congolese_franc,CDF'));
 add(fan.sys.Unit.define('cordoba_oro,NIO,C$'));
 add(fan.sys.Unit.define('costa_rican_colon,CRC,₡'));
 add(fan.sys.Unit.define('croatian_kuna,HRK,Kn'));
 add(fan.sys.Unit.define('cuban_peso,CUP'));
 add(fan.sys.Unit.define('czech_koruna,CZK,Kč'));
 add(fan.sys.Unit.define('dalasi,GMD'));
 add(fan.sys.Unit.define('danish_krone,DKK,kr'));
 add(fan.sys.Unit.define('denar,MKD,ден'));
 add(fan.sys.Unit.define('djibouti_franc,DJF'));
 add(fan.sys.Unit.define('dobra,STD,Db'));
 add(fan.sys.Unit.define('dominican_peso,DOP'));
 add(fan.sys.Unit.define('dong,VND,₫'));
 add(fan.sys.Unit.define('east_caribbean_dollar,XCD'));
 add(fan.sys.Unit.define('egyptian_pound,EGP'));
 add(fan.sys.Unit.define('ethiopian_birr,ETB'));
 add(fan.sys.Unit.define('euro,EUR,€'));
 add(fan.sys.Unit.define('falkland_islands_pound,FKP'));
 add(fan.sys.Unit.define('fiji_dollar,FJD'));
 add(fan.sys.Unit.define('forint,HUF'));
 add(fan.sys.Unit.define('gibraltar_pound,GIP'));
 add(fan.sys.Unit.define('gourde,HTG'));
 add(fan.sys.Unit.define('guarani,PYG,₲'));
 add(fan.sys.Unit.define('guinea_franc,GNF'));
 add(fan.sys.Unit.define('guyana_dollar,GYD'));
 add(fan.sys.Unit.define('hong_kong_dollar,HKD'));
 add(fan.sys.Unit.define('hryvnia,UAH,₴'));
 add(fan.sys.Unit.define('iceland_krona,ISK,Kr'));
 add(fan.sys.Unit.define('indian_rupee,INR,₹'));
 add(fan.sys.Unit.define('iranian_rial,IRR'));
 add(fan.sys.Unit.define('iraqi_dinar,IQD'));
 add(fan.sys.Unit.define('jamaican_dollar,JMD'));
 add(fan.sys.Unit.define('jordanian_dinar,JOD'));
 add(fan.sys.Unit.define('kenyan_shilling,KES,Sh'));
 add(fan.sys.Unit.define('kina,PGK'));
 add(fan.sys.Unit.define('kip,LAK,₭'));
 add(fan.sys.Unit.define('konvertibilna_marka,BAM,КМ'));
 add(fan.sys.Unit.define('kuwaiti_dinar,KWD'));
 add(fan.sys.Unit.define('kwacha,MWK,MK'));
 add(fan.sys.Unit.define('kwanza,AOA,Kz'));
 add(fan.sys.Unit.define('kyat,MMK'));
 add(fan.sys.Unit.define('lari,GEL,ლ'));
 add(fan.sys.Unit.define('lebanese_pound,LBP'));
 add(fan.sys.Unit.define('lek,ALL'));
 add(fan.sys.Unit.define('lempira,HNL'));
 add(fan.sys.Unit.define('leone,SLL,Le'));
 add(fan.sys.Unit.define('leu,RON'));
 add(fan.sys.Unit.define('liberian_dollar,LRD'));
 add(fan.sys.Unit.define('libyan_dinar,LYD'));
 add(fan.sys.Unit.define('lilangeni,SZL'));
 add(fan.sys.Unit.define('loti,LSL'));
 add(fan.sys.Unit.define('malagasy_ariary,MGA'));
 add(fan.sys.Unit.define('malaysian_ringgit,MYR,RM'));
 add(fan.sys.Unit.define('manat,TMT'));
 add(fan.sys.Unit.define('mauritius_rupee,MUR'));
 add(fan.sys.Unit.define('metical,MZN,MTn'));
 add(fan.sys.Unit.define('mexican_peso,MXN'));
 add(fan.sys.Unit.define('moldavian_leu,MDL'));
 add(fan.sys.Unit.define('moroccan_dirham,MAD'));
 add(fan.sys.Unit.define('naira,NGN,₦'));
 add(fan.sys.Unit.define('nakfa,ERN,Nfk'));
 add(fan.sys.Unit.define('namibia_dollar,NAD'));
 add(fan.sys.Unit.define('nepalese_rupee,NPR'));
 add(fan.sys.Unit.define('new_israeli_shekel,ILS,₪'));
 add(fan.sys.Unit.define('new_zealand_dollar,NZD'));
 add(fan.sys.Unit.define('ngultrum,BTN'));
 add(fan.sys.Unit.define('north_korean_won,KPW'));
 add(fan.sys.Unit.define('norwegian_krone,NOK'));
 add(fan.sys.Unit.define('nuevo_sol,PEN'));
 add(fan.sys.Unit.define('ouguiya,MRO,UM'));
 add(fan.sys.Unit.define('pakistan_rupee,PKR,₨'));
 add(fan.sys.Unit.define('pataca,MOP'));
 add(fan.sys.Unit.define('peso_uruguayo,UYU'));
 add(fan.sys.Unit.define('philippine_peso,PHP,₱'));
 add(fan.sys.Unit.define('pound_sterling,GBP,£'));
 add(fan.sys.Unit.define('pula,BWP'));
 add(fan.sys.Unit.define('pzloty,PLN,zł'));
 add(fan.sys.Unit.define('qatari_rial,QAR'));
 add(fan.sys.Unit.define('quetzal,GTQ'));
 add(fan.sys.Unit.define('rand,ZAR'));
 add(fan.sys.Unit.define('rial_omani,OMR'));
 add(fan.sys.Unit.define('riel,KHR'));
 add(fan.sys.Unit.define('rufiyaa,MVR'));
 add(fan.sys.Unit.define('rupiah,IDR,Rp'));
 add(fan.sys.Unit.define('russian_ruble,RUB'));
 add(fan.sys.Unit.define('rwanda_franc,RWF'));
 add(fan.sys.Unit.define('saint_helena_pound,SHP'));
 add(fan.sys.Unit.define('saudi_riyal,SAR'));
 add(fan.sys.Unit.define('serbian_dinar,RSD,din'));
 add(fan.sys.Unit.define('seychelles_rupee,SCR'));
 add(fan.sys.Unit.define('singapore_dollar,SGD'));
 add(fan.sys.Unit.define('solomon_islands_dollar,SBD'));
 add(fan.sys.Unit.define('som,KGS'));
 add(fan.sys.Unit.define('somali_shilling,SOS'));
 add(fan.sys.Unit.define('somoni,TJS,ЅМ'));
 add(fan.sys.Unit.define('south_korean_won,KRW,₩'));
 add(fan.sys.Unit.define('sri_lanka_rupee,LKR,Rs'));
 add(fan.sys.Unit.define('sudanese_pound,SDG'));
 add(fan.sys.Unit.define('suriname_dollar,SRD'));
 add(fan.sys.Unit.define('swedish_krona,SEK'));
 add(fan.sys.Unit.define('swiss_franc,CHF,SFr'));
 add(fan.sys.Unit.define('syrian_pound,SYP'));
 add(fan.sys.Unit.define('taiwan_dollar,TWD'));
 add(fan.sys.Unit.define('taka,BDT,৳'));
 add(fan.sys.Unit.define('tala,WST'));
 add(fan.sys.Unit.define('tanzanian_shilling,TZS'));
 add(fan.sys.Unit.define('tenge,KZT,〒'));
 add(fan.sys.Unit.define('trinidad_and_tobago_dollar,TTD'));
 add(fan.sys.Unit.define('tugrik,MNT,₮'));
 add(fan.sys.Unit.define('tunisian_dinar,TND'));
 add(fan.sys.Unit.define('turkish_lira,TRY,₤'));
 add(fan.sys.Unit.define('uae_dirham,AED'));
 add(fan.sys.Unit.define('uganda_shilling,UGX'));
 add(fan.sys.Unit.define('us_dollar,USD,$'));
 add(fan.sys.Unit.define('uzbekistan_sum,UZS'));
 add(fan.sys.Unit.define('vatu,VUV,Vt'));
 add(fan.sys.Unit.define('yemeni_rial,YER'));
 add(fan.sys.Unit.define('yen,JPY,¥'));
 add(fan.sys.Unit.define('zambian_kwacha,ZMW,ZK'));
 add(fan.sys.Unit.define('zimbabwe_dollar,ZWL'));
}
fan.sys.Unit.m_quantities['currency'] = fan.sys.Unit.m_quantities['currency'].toImmutable();
// acceleration
fan.sys.Unit.m_quantityNames.add('acceleration');
with (fan.sys.Unit.m_quantities['acceleration'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('meters_per_second_squared, m/s²; m1*sec-2'));
}
fan.sys.Unit.m_quantities['acceleration'] = fan.sys.Unit.m_quantities['acceleration'].toImmutable();
// angular acceleration
fan.sys.Unit.m_quantityNames.add('angular acceleration');
with (fan.sys.Unit.m_quantities['angular acceleration'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('radians_per_second_squared, rad/s²; sec-2'));
}
fan.sys.Unit.m_quantities['angular acceleration'] = fan.sys.Unit.m_quantities['angular acceleration'].toImmutable();
// angular momentum
fan.sys.Unit.m_quantityNames.add('angular momentum');
with (fan.sys.Unit.m_quantities['angular momentum'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('joule_second, Js; kg1*m2*sec-1'));
}
fan.sys.Unit.m_quantities['angular momentum'] = fan.sys.Unit.m_quantities['angular momentum'].toImmutable();
// angular velocity
fan.sys.Unit.m_quantityNames.add('angular velocity');
with (fan.sys.Unit.m_quantities['angular velocity'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('radians_per_second, rad/s; sec-1'));
 add(fan.sys.Unit.define('revolutions_per_minute, rpm; sec-1; 6.2831853071796'));
}
fan.sys.Unit.m_quantities['angular velocity'] = fan.sys.Unit.m_quantities['angular velocity'].toImmutable();
// area
fan.sys.Unit.m_quantityNames.add('area');
with (fan.sys.Unit.m_quantities['area'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('square_meter, m²; m2'));
 add(fan.sys.Unit.define('square_millimeter, mm²; m2; 1.0E-6'));
 add(fan.sys.Unit.define('square_centimeter, cm²; m2; 1.0E-4'));
 add(fan.sys.Unit.define('square_kilometer, km²; m2; 1000000.0'));
 add(fan.sys.Unit.define('square_inch, in²; m2; 6.45161E-4'));
 add(fan.sys.Unit.define('square_foot, ft²; m2; 0.092903'));
 add(fan.sys.Unit.define('square_yard, yd²; m2; 0.836131'));
 add(fan.sys.Unit.define('square_mile, mile²; m2; 2589988.110336'));
 add(fan.sys.Unit.define('acre; m2; 4046.872627'));
}
fan.sys.Unit.m_quantities['area'] = fan.sys.Unit.m_quantities['area'].toImmutable();
// capacitance
fan.sys.Unit.m_quantityNames.add('capacitance');
with (fan.sys.Unit.m_quantities['capacitance'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('farad, F; kg-1*m-2*sec4*A2'));
}
fan.sys.Unit.m_quantities['capacitance'] = fan.sys.Unit.m_quantities['capacitance'].toImmutable();
// cooling efficiency
fan.sys.Unit.m_quantityNames.add('cooling efficiency');
with (fan.sys.Unit.m_quantities['cooling efficiency'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('coefficient_of_performance, COP; ; 1'));
 add(fan.sys.Unit.define('energy_efficiency_ratio, Btu/Wh, EER; ; 0.2930832356'));
 add(fan.sys.Unit.define('kilowatt_per_ton, kW/ton; ; 1'));
}
fan.sys.Unit.m_quantities['cooling efficiency'] = fan.sys.Unit.m_quantities['cooling efficiency'].toImmutable();
// density
fan.sys.Unit.m_quantityNames.add('density');
with (fan.sys.Unit.m_quantities['density'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('kilograms_per_cubic_meter, kg/m³; kg1*m-3'));
 add(fan.sys.Unit.define('grams_per_cubic_meter, g/m³; kg1*m-3; 1.0E-3'));
 add(fan.sys.Unit.define('milligrams_per_cubic_meter, mg/m³; kg1*m-3; 1.0E-6'));
 add(fan.sys.Unit.define('micrograms_per_cubic_meter, µg/m³; kg1*m-3; 1.0E-9'));
}
fan.sys.Unit.m_quantities['density'] = fan.sys.Unit.m_quantities['density'].toImmutable();
// electric charge
fan.sys.Unit.m_quantityNames.add('electric charge');
with (fan.sys.Unit.m_quantities['electric charge'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('coulomb, C; sec1*A1'));
 add(fan.sys.Unit.define('ampere_hour, Ah; sec1*A1; 3600'));
}
fan.sys.Unit.m_quantities['electric charge'] = fan.sys.Unit.m_quantities['electric charge'].toImmutable();
// electric conductance
fan.sys.Unit.m_quantityNames.add('electric conductance');
with (fan.sys.Unit.m_quantities['electric conductance'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('siemens, S; kg-1*m-2*sec3*A2'));
}
fan.sys.Unit.m_quantities['electric conductance'] = fan.sys.Unit.m_quantities['electric conductance'].toImmutable();
// electric current
fan.sys.Unit.m_quantityNames.add('electric current');
with (fan.sys.Unit.m_quantities['electric current'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('ampere, A; A1'));
 add(fan.sys.Unit.define('milliampere, mA; A1; 0.0010'));
}
fan.sys.Unit.m_quantities['electric current'] = fan.sys.Unit.m_quantities['electric current'].toImmutable();
// electromagnetic moment
fan.sys.Unit.m_quantityNames.add('electromagnetic moment');
with (fan.sys.Unit.m_quantities['electromagnetic moment'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('ampere_square_meter, Am²; m2*A1'));
}
fan.sys.Unit.m_quantities['electromagnetic moment'] = fan.sys.Unit.m_quantities['electromagnetic moment'].toImmutable();
// electric current density
fan.sys.Unit.m_quantityNames.add('electric current density');
with (fan.sys.Unit.m_quantities['electric current density'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('amperes_per_square_meter, A/m²; m-2*A1'));
}
fan.sys.Unit.m_quantities['electric current density'] = fan.sys.Unit.m_quantities['electric current density'].toImmutable();
// electric field strength
fan.sys.Unit.m_quantityNames.add('electric field strength');
with (fan.sys.Unit.m_quantities['electric field strength'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('volts_per_meter, V/m; kg1*m1*sec-3*A-1'));
}
fan.sys.Unit.m_quantities['electric field strength'] = fan.sys.Unit.m_quantities['electric field strength'].toImmutable();
// electric potential
fan.sys.Unit.m_quantityNames.add('electric potential');
with (fan.sys.Unit.m_quantities['electric potential'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('volt, Volt, V; kg1*m2*sec-3*A-1'));
 add(fan.sys.Unit.define('millivolt, mV; kg1*m2*sec-3*A-1; 0.0010'));
 add(fan.sys.Unit.define('kilovolt, kV; kg1*m2*sec-3*A-1; 1000.0'));
 add(fan.sys.Unit.define('megavolt, MV; kg1*m2*sec-3*A-1; 1000000.0'));
}
fan.sys.Unit.m_quantities['electric potential'] = fan.sys.Unit.m_quantities['electric potential'].toImmutable();
// electric resistance
fan.sys.Unit.m_quantityNames.add('electric resistance');
with (fan.sys.Unit.m_quantities['electric resistance'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('ohm, Ω, Ω; kg1*m2*sec-3*A-2'));
 add(fan.sys.Unit.define('kilohm, kΩ, kΩ; kg1*m2*sec-3*A-2; 1000.0'));
 add(fan.sys.Unit.define('megohm, MΩ, MΩ; kg1*m2*sec-3*A-2; 1000000.0'));
 add(fan.sys.Unit.define('milliohm, mΩ, mΩ; kg1*m2*sec-3*A-2; 0.0010'));
}
fan.sys.Unit.m_quantities['electric resistance'] = fan.sys.Unit.m_quantities['electric resistance'].toImmutable();
// electrical conductivity
fan.sys.Unit.m_quantityNames.add('electrical conductivity');
with (fan.sys.Unit.m_quantities['electrical conductivity'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('siemens_per_meter, S/m; kg-1*m-3*sec3*A2'));
}
fan.sys.Unit.m_quantities['electrical conductivity'] = fan.sys.Unit.m_quantities['electrical conductivity'].toImmutable();
// electrical resistivity
fan.sys.Unit.m_quantityNames.add('electrical resistivity');
with (fan.sys.Unit.m_quantities['electrical resistivity'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('ohm_meter, Ωm, Ωm; kg1*m3*sec-3*A-2'));
}
fan.sys.Unit.m_quantities['electrical resistivity'] = fan.sys.Unit.m_quantities['electrical resistivity'].toImmutable();
// energy
fan.sys.Unit.m_quantityNames.add('energy');
with (fan.sys.Unit.m_quantities['energy'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('joule, J; kg1*m2*sec-2'));
 add(fan.sys.Unit.define('kilojoule, kJ; kg1*m2*sec-2; 1000.0'));
 add(fan.sys.Unit.define('watt_hour, Wh; kg1*m2*sec-2; 3600.0'));
 add(fan.sys.Unit.define('kilowatt_hour, kWh; kg1*m2*sec-2; 3600000.0'));
 add(fan.sys.Unit.define('megawatt_hour, MWh; kg1*m2*sec-2; 3.6E9'));
 add(fan.sys.Unit.define('gigawatt_hour, GWh; kg1*m2*sec-2; 3.6E12'));
 add(fan.sys.Unit.define('btu, BTU; kg1*m2*sec-2; 1054.852'));
 add(fan.sys.Unit.define('kilobtu, kBTU; kg1*m2*sec-2; 1054852.0'));
 add(fan.sys.Unit.define('megabtu, MBTU, MMBTU; kg1*m2*sec-2; 1.054852E9'));
 add(fan.sys.Unit.define('horsepower_hour, hph; kg1*m2*sec-2; 2686088.6'));
 add(fan.sys.Unit.define('calorie, cal; kg1*m2*sec-2; 4.184'));
 add(fan.sys.Unit.define('therm; kg1*m2*sec-2; 1.05506E8'));
 add(fan.sys.Unit.define('tons_refrigeration_hour, tonrefh; kg1*m2*sec-2; 1.26606708E7'));
 add(fan.sys.Unit.define('megajoule, MJ; kg1*m2*sec-2; 1000000.0'));
 add(fan.sys.Unit.define('gigajoule, GJ; kg1*m2*sec-2; 1000000000.0'));
 add(fan.sys.Unit.define('newton_meter, Nm; kg1*m2*sec-2'));
 add(fan.sys.Unit.define('cubic_meters_natural_gas, standard_cubic_meter, scm, m³_gas; kg1*m2*sec-2; 37313432.83582089'));
 add(fan.sys.Unit.define('cubic_feet_natural_gas, standard_cubic_foot, scf, ft³_gas; kg1*m2*sec-2; 1086498'));
 add(fan.sys.Unit.define('hundred_cubic_feet_natural_gas; kg1*m2*sec-2; 108649800'));
 add(fan.sys.Unit.define('thousand_cubic_feet_natural_gas; kg1*m2*sec-2; 1086498000'));
 add(fan.sys.Unit.define('million_cubic_feet_natural_gas; kg1*m2*sec-2; 1086498000000'));
}
fan.sys.Unit.m_quantities['energy'] = fan.sys.Unit.m_quantities['energy'].toImmutable();
// apparent energy
fan.sys.Unit.m_quantityNames.add('apparent energy');
with (fan.sys.Unit.m_quantities['apparent energy'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('volt_ampere_hour, VAh; kg1*m2*sec-2; 3600.0'));
 add(fan.sys.Unit.define('kilovolt_ampere_hour, kVAh; kg1*m2*sec-2; 3600000.0'));
 add(fan.sys.Unit.define('megavolt_ampere_hour, MVAh; kg1*m2*sec-2; 3.6E9'));
}
fan.sys.Unit.m_quantities['apparent energy'] = fan.sys.Unit.m_quantities['apparent energy'].toImmutable();
// reactive energy
fan.sys.Unit.m_quantityNames.add('reactive energy');
with (fan.sys.Unit.m_quantities['reactive energy'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('volt_ampere_reactive_hour, VARh; kg1*m2*sec-2; 3600.0'));
 add(fan.sys.Unit.define('kilovolt_ampere_reactive_hour, kVARh; kg1*m2*sec-2; 3600000.0'));
 add(fan.sys.Unit.define('megavolt_ampere_reactive_hour, MVARh; kg1*m2*sec-2; 3.6E9'));
}
fan.sys.Unit.m_quantities['reactive energy'] = fan.sys.Unit.m_quantities['reactive energy'].toImmutable();
// energy by area
fan.sys.Unit.m_quantityNames.add('energy by area');
with (fan.sys.Unit.m_quantities['energy by area'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('joules_per_square_meter, J/m²; kg1*sec-2'));
 add(fan.sys.Unit.define('watt_hours_per_square_meter, Wh/m²; kg1*sec-2; 3600.0'));
 add(fan.sys.Unit.define('watt_hours_per_square_foot, Wh/ft²; kg1*sec-2; 3.8750077500155E4'));
 add(fan.sys.Unit.define('kilowatt_hours_per_square_meter, kWh/m²; kg1*sec-2; 3600000.0'));
 add(fan.sys.Unit.define('kilowatt_hours_per_square_foot, kWh/ft²; kg1*sec-2; 3.8750077500155E7'));
 add(fan.sys.Unit.define('megawatt_hours_per_square_meter, MWh/m²; kg1*sec-2; 3.6E9'));
 add(fan.sys.Unit.define('megawatt_hours_per_square_foot, MWh/ft²; kg1*sec-2; 3.8750077500155E10'));
 add(fan.sys.Unit.define('megajoules_per_square_meter, MJ/m²; kg1*sec-2; 1000000.0'));
 add(fan.sys.Unit.define('megajoules_per_square_foot, MJ/ft²; kg1*sec-2; 1.076391041671E7'));
 add(fan.sys.Unit.define('kilobtu_per_square_foot, kBTU/ft²; kg1*sec-2; 1.135433731957E7'));
 add(fan.sys.Unit.define('megabtu_per_square_foot, MBTU/ft²; kg1*sec-2; 1.135433731957E10'));
}
fan.sys.Unit.m_quantities['energy by area'] = fan.sys.Unit.m_quantities['energy by area'].toImmutable();
// enthalpy
fan.sys.Unit.m_quantityNames.add('enthalpy');
with (fan.sys.Unit.m_quantities['enthalpy'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('joules_per_gram, J/g; m2*sec-2; 0.0010'));
 add(fan.sys.Unit.define('joules_per_kilogram, J/kg; m2*sec-2'));
 add(fan.sys.Unit.define('joules_per_kilogram_dry_air, J/kg_dry; m2*sec-2'));
 add(fan.sys.Unit.define('btu_per_pound, BTU/lb; m2*sec-2; 2325.5576058607867'));
 add(fan.sys.Unit.define('btus_per_pound_dry_air, btu/lb_dry; m2*sec-2; 2326.0'));
 add(fan.sys.Unit.define('kilojoules_per_kilogram, kJ/kg; m2*sec-2; 1000.0'));
 add(fan.sys.Unit.define('kilojoules_per_kilogram_dry_air, kJ/kg_dry; m2*sec-2; 1000.0'));
 add(fan.sys.Unit.define('megajoules_per_kilogram_dry_air, MJ/kg_dry; m2*sec-2; 1000000.0'));
 add(fan.sys.Unit.define('calorie_per_gram, cal/g; m2*sec-2; 4184.0'));
}
fan.sys.Unit.m_quantities['enthalpy'] = fan.sys.Unit.m_quantities['enthalpy'].toImmutable();
// entropy
fan.sys.Unit.m_quantityNames.add('entropy');
with (fan.sys.Unit.m_quantities['entropy'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('joules_per_degree_kelvin, J/°K; kg1*m2*sec-2*K-1'));
 add(fan.sys.Unit.define('kilojoules_per_degree_kelvin, kJ/°K; kg1*m2*sec-2*K-1; 1000.0'));
 add(fan.sys.Unit.define('megajoules_per_degree_kelvin, MJ/°K; kg1*m2*sec-2*K-1; 1000000.0'));
}
fan.sys.Unit.m_quantities['entropy'] = fan.sys.Unit.m_quantities['entropy'].toImmutable();
// force
fan.sys.Unit.m_quantityNames.add('force');
with (fan.sys.Unit.m_quantities['force'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('newton, N; kg1*m1*sec-2'));
 add(fan.sys.Unit.define('pound_force, lbf; kg1*m1*sec-2; 4.448222'));
}
fan.sys.Unit.m_quantities['force'] = fan.sys.Unit.m_quantities['force'].toImmutable();
// frequency
fan.sys.Unit.m_quantityNames.add('frequency');
with (fan.sys.Unit.m_quantities['frequency'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('hertz, Hz; sec-1'));
 add(fan.sys.Unit.define('kilohertz, kHz; sec-1; 1000.0'));
 add(fan.sys.Unit.define('cycles_per_hour, cph; sec-1; 2.777777777777778E-4'));
 add(fan.sys.Unit.define('cycles_per_minute, cpm; sec-1; 0.016666666666666666'));
 add(fan.sys.Unit.define('megahertz, MHz; sec-1; 1000000.0'));
 add(fan.sys.Unit.define('per_minute, /min; sec-1; 0.016666666666666666'));
 add(fan.sys.Unit.define('per_second, /s; sec-1'));
 add(fan.sys.Unit.define('per_hour, /h; sec-1; 2.777777777777778E-4'));
 add(fan.sys.Unit.define('percent_per_second, %/s; sec-1'));
 add(fan.sys.Unit.define('air_changes_per_hour, ACH; sec-1; 2.777777777777778E-4'));
}
fan.sys.Unit.m_quantities['frequency'] = fan.sys.Unit.m_quantities['frequency'].toImmutable();
// grammage
fan.sys.Unit.m_quantityNames.add('grammage');
with (fan.sys.Unit.m_quantities['grammage'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('kilograms_per_square_meter, kg/m²; kg1*m-2'));
 add(fan.sys.Unit.define('grams_per_square_meter, g/m²; kg1*m-2; 0.0010'));
}
fan.sys.Unit.m_quantities['grammage'] = fan.sys.Unit.m_quantities['grammage'].toImmutable();
// heating rate
fan.sys.Unit.m_quantityNames.add('heating rate');
with (fan.sys.Unit.m_quantities['heating rate'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('degrees_kelvin_per_second, K/s; sec-1*K1'));
 add(fan.sys.Unit.define('degrees_celsius_per_hour, °C/h; sec-1*K1; 2.777777777777778E-4'));
 add(fan.sys.Unit.define('degrees_celsius_per_minute, °C/min; sec-1*K1; 0.016666666666666666'));
 add(fan.sys.Unit.define('degrees_fahrenheit_per_hour, °F/h; sec-1*K1; 1.5432098765432E-4'));
 add(fan.sys.Unit.define('degrees_fahrenheit_per_minute, °F/min; sec-1*K1; 0.0092592592592593'));
 add(fan.sys.Unit.define('degrees_kelvin_per_hour, K/h; sec-1*K1; 2.777777777777778E-4'));
 add(fan.sys.Unit.define('degrees_kelvin_per_minute, K/min; sec-1*K1; 0.016666666666666666'));
}
fan.sys.Unit.m_quantities['heating rate'] = fan.sys.Unit.m_quantities['heating rate'].toImmutable();
// illuminance
fan.sys.Unit.m_quantityNames.add('illuminance');
with (fan.sys.Unit.m_quantities['illuminance'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('lux, lx; m-2*cd1'));
 add(fan.sys.Unit.define('footcandle, fc; m-2*cd1; 0.092937'));
 add(fan.sys.Unit.define('phot; m-2*cd1; 10000.0'));
}
fan.sys.Unit.m_quantities['illuminance'] = fan.sys.Unit.m_quantities['illuminance'].toImmutable();
// inductance
fan.sys.Unit.m_quantityNames.add('inductance');
with (fan.sys.Unit.m_quantities['inductance'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('henry, H; kg1*m2*sec-2*A-2'));
}
fan.sys.Unit.m_quantities['inductance'] = fan.sys.Unit.m_quantities['inductance'].toImmutable();
// irradiance
fan.sys.Unit.m_quantityNames.add('irradiance');
with (fan.sys.Unit.m_quantities['irradiance'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('watts_per_square_meter_irradiance, W/m²_irr; kg1*sec-3'));
 add(fan.sys.Unit.define('watts_per_square_foot_irradiance, W/ft²_irr; kg1*sec-3; 10.76391041671'));
}
fan.sys.Unit.m_quantities['irradiance'] = fan.sys.Unit.m_quantities['irradiance'].toImmutable();
// length
fan.sys.Unit.m_quantityNames.add('length');
with (fan.sys.Unit.m_quantities['length'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('meter, m; m1'));
 add(fan.sys.Unit.define('micrometer, µm; m1; 1.0E-5'));
 add(fan.sys.Unit.define('millimeter, mm; m1; 0.0010'));
 add(fan.sys.Unit.define('centimeter, cm; m1; 0.01'));
 add(fan.sys.Unit.define('kilometer, km; m1; 1000.0'));
 add(fan.sys.Unit.define('inch, in; m1; 0.0254'));
 add(fan.sys.Unit.define('foot, ft; m1; 0.3048'));
 add(fan.sys.Unit.define('yard, yd; m1; 0.9144'));
 add(fan.sys.Unit.define('mile; m1; 1609.344'));
}
fan.sys.Unit.m_quantities['length'] = fan.sys.Unit.m_quantities['length'].toImmutable();
// luminance
fan.sys.Unit.m_quantityNames.add('luminance');
with (fan.sys.Unit.m_quantities['luminance'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('candelas_per_square_meter, cd/m²; m-2*cd1'));
 add(fan.sys.Unit.define('candels_per_square_foot, cd/ft²; m-2*cd1; 0.092937'));
}
fan.sys.Unit.m_quantities['luminance'] = fan.sys.Unit.m_quantities['luminance'].toImmutable();
// luminous flux
fan.sys.Unit.m_quantityNames.add('luminous flux');
with (fan.sys.Unit.m_quantities['luminous flux'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('lumen, lm; cd1'));
}
fan.sys.Unit.m_quantities['luminous flux'] = fan.sys.Unit.m_quantities['luminous flux'].toImmutable();
// luminous intensity
fan.sys.Unit.m_quantityNames.add('luminous intensity');
with (fan.sys.Unit.m_quantities['luminous intensity'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('candela, cd; cd1'));
}
fan.sys.Unit.m_quantities['luminous intensity'] = fan.sys.Unit.m_quantities['luminous intensity'].toImmutable();
// magnetic field strength
fan.sys.Unit.m_quantityNames.add('magnetic field strength');
with (fan.sys.Unit.m_quantities['magnetic field strength'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('amperes_per_meter, A/m; m-1*A1'));
}
fan.sys.Unit.m_quantities['magnetic field strength'] = fan.sys.Unit.m_quantities['magnetic field strength'].toImmutable();
// magnetic flux
fan.sys.Unit.m_quantityNames.add('magnetic flux');
with (fan.sys.Unit.m_quantities['magnetic flux'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('weber, Wb; kg1*m2*sec-2*A-1'));
}
fan.sys.Unit.m_quantities['magnetic flux'] = fan.sys.Unit.m_quantities['magnetic flux'].toImmutable();
// magnetic flux density
fan.sys.Unit.m_quantityNames.add('magnetic flux density');
with (fan.sys.Unit.m_quantities['magnetic flux density'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('tesla, T; kg1*sec-2*A-1'));
}
fan.sys.Unit.m_quantities['magnetic flux density'] = fan.sys.Unit.m_quantities['magnetic flux density'].toImmutable();
// mass
fan.sys.Unit.m_quantityNames.add('mass');
with (fan.sys.Unit.m_quantities['mass'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('kilogram, kg; kg1'));
 add(fan.sys.Unit.define('milligram, mg; kg1; 1.0E-6'));
 add(fan.sys.Unit.define('gram, g; kg1; 0.0010'));
 add(fan.sys.Unit.define('ounce, oz; kg1; 0.02835'));
 add(fan.sys.Unit.define('pound, lb; kg1; 0.453591'));
 add(fan.sys.Unit.define('kilopound, klb; kg1; 453.591'));
 add(fan.sys.Unit.define('metric_ton, ton; kg1; 1000.0'));
 add(fan.sys.Unit.define('short_ton, t; kg1; 907.18474'));
}
fan.sys.Unit.m_quantities['mass'] = fan.sys.Unit.m_quantities['mass'].toImmutable();
// mass flow
fan.sys.Unit.m_quantityNames.add('mass flow');
with (fan.sys.Unit.m_quantities['mass flow'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('kilograms_per_second, kg/s; kg1*sec-1'));
 add(fan.sys.Unit.define('kilograms_per_minute, kg/min; kg1*sec-1; 0.016666666666666666'));
 add(fan.sys.Unit.define('kilograms_per_hour, kg/h; kg1*sec-1; 2.777777777777778E-4'));
 add(fan.sys.Unit.define('pounds_per_minute, lb/min; kg1*sec-1; 0.007559872833333333'));
 add(fan.sys.Unit.define('pounds_per_hour, lb/h; kg1*sec-1; 1.2599788055555556E-4'));
 add(fan.sys.Unit.define('pounds_per_second, lb/s; kg1*sec-1; 0.45359237'));
 add(fan.sys.Unit.define('kilopounds_per_hour, klb/h; kg1*sec-1; 0.12599788055555556'));
 add(fan.sys.Unit.define('grams_per_second, g/s; kg1*sec-1; 0.0010'));
 add(fan.sys.Unit.define('grams_per_minute, g/min; kg1*sec-1; 1.6666666666666667E-5'));
 add(fan.sys.Unit.define('metric_tons_per_hour, ton/h; kg1*sec-1; 0.2777777777777778'));
}
fan.sys.Unit.m_quantities['mass flow'] = fan.sys.Unit.m_quantities['mass flow'].toImmutable();
// momentum
fan.sys.Unit.m_quantityNames.add('momentum');
with (fan.sys.Unit.m_quantities['momentum'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('newton_second, Ns; kg1*m1*sec-1'));
}
fan.sys.Unit.m_quantities['momentum'] = fan.sys.Unit.m_quantities['momentum'].toImmutable();
// power
fan.sys.Unit.m_quantityNames.add('power');
with (fan.sys.Unit.m_quantities['power'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('watt, W; kg1*m2*sec-3'));
 add(fan.sys.Unit.define('milliwatt, mW; kg1*m2*sec-3; 0.0010'));
 add(fan.sys.Unit.define('kilowatt, kW; kg1*m2*sec-3; 1000.0'));
 add(fan.sys.Unit.define('megawatt, MW; kg1*m2*sec-3; 1000000.0'));
 add(fan.sys.Unit.define('gigawatt, GW; kg1*m2*sec-3; 1.0E9'));
 add(fan.sys.Unit.define('btus_per_hour, BTU/h; kg1*m2*sec-3; 0.292875'));
 add(fan.sys.Unit.define('therms_per_hour, therm/h; kg1*m2*sec-3; 29287.5'));
 add(fan.sys.Unit.define('horsepower, hp; kg1*m2*sec-3; 745.7'));
 add(fan.sys.Unit.define('foot_pounds_per_second, ftlbs/sec; kg1*m2*sec-3; 1.355818'));
 add(fan.sys.Unit.define('tons_refrigeration, tonref; kg1*m2*sec-3; 3516.853'));
 add(fan.sys.Unit.define('kilobtus_per_hour, kBTU/h; kg1*m2*sec-3; 293.07107017222'));
 add(fan.sys.Unit.define('megabtus_per_hour, MBTU/h, MMBTU/h; kg1*m2*sec-3; 293071.07017222'));
 add(fan.sys.Unit.define('joules_per_hour, J/h; kg1*m2*sec-3; 0.000277777778'));
 add(fan.sys.Unit.define('kilojoules_per_hour, kJ/h; kg1*m2*sec-3; 0.277777778'));
 add(fan.sys.Unit.define('megajoules_per_hour, MJ/h; kg1*m2*sec-3; 277.777778'));
 add(fan.sys.Unit.define('gigajoules_per_hour, GJ/h; kg1*m2*sec-3; 277777.778'));
}
fan.sys.Unit.m_quantities['power'] = fan.sys.Unit.m_quantities['power'].toImmutable();
// power by area
fan.sys.Unit.m_quantityNames.add('power by area');
with (fan.sys.Unit.m_quantities['power by area'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('watts_per_square_meter, W/m²; kg1*sec-3'));
 add(fan.sys.Unit.define('watts_per_square_foot, W/ft²; kg1*sec-3; 10.7639104'));
 add(fan.sys.Unit.define('kilowatts_per_square_meter, kW/m²; kg1*sec-3; 1000.0'));
 add(fan.sys.Unit.define('kilowatts_per_square_foot, kW/ft²; kg1*sec-3; 10763.9104'));
 add(fan.sys.Unit.define('kilobtus_per_hour_per_square_foot, kBTU/h/ft²; kg1*sec-3; 3153.8257472'));
}
fan.sys.Unit.m_quantities['power by area'] = fan.sys.Unit.m_quantities['power by area'].toImmutable();
// power by volumetric flow
fan.sys.Unit.m_quantityNames.add('power by volumetric flow');
with (fan.sys.Unit.m_quantities['power by volumetric flow'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('watts_per_cubic_meters_per_second, W/m³/s; kg1*m-1*sec-2'));
 add(fan.sys.Unit.define('watts_per_cubic_feet_per_minute, W/cfm; kg1*m-1*sec-2; 2118.8800032893155'));
 add(fan.sys.Unit.define('kilowatts_per_kilocubic_feet_per_minute, kW/kcfm; kg1*m-1*sec-2; 2118.8800032893155'));
 add(fan.sys.Unit.define('kilowatts_per_gallons_per_minute, kW/gal/min; kg1*m-1*sec-2; 15850323'));
}
fan.sys.Unit.m_quantities['power by volumetric flow'] = fan.sys.Unit.m_quantities['power by volumetric flow'].toImmutable();
// apparent power
fan.sys.Unit.m_quantityNames.add('apparent power');
with (fan.sys.Unit.m_quantities['apparent power'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('volt_ampere, VA; kg1*m2*sec-3'));
 add(fan.sys.Unit.define('kilovolt_ampere, kVA; kg1*m2*sec-3; 1000.0'));
 add(fan.sys.Unit.define('megavolt_ampere, mVA; kg1*m2*sec-3; 1000000.0'));
}
fan.sys.Unit.m_quantities['apparent power'] = fan.sys.Unit.m_quantities['apparent power'].toImmutable();
// reactive power
fan.sys.Unit.m_quantityNames.add('reactive power');
with (fan.sys.Unit.m_quantities['reactive power'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('volt_ampere_reactive, VAR; kg1*m2*sec-3'));
 add(fan.sys.Unit.define('kilovolt_ampere_reactive, kVAR; kg1*m2*sec-3; 1000.0'));
 add(fan.sys.Unit.define('megavolt_ampere_reactive, MVAR; kg1*m2*sec-3; 1000000.0'));
}
fan.sys.Unit.m_quantities['reactive power'] = fan.sys.Unit.m_quantities['reactive power'].toImmutable();
// pressure
fan.sys.Unit.m_quantityNames.add('pressure');
with (fan.sys.Unit.m_quantities['pressure'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('pascal, Pa; kg1*m-1*sec-2'));
 add(fan.sys.Unit.define('kilopascal, kPa; kg1*m-1*sec-2; 1000.0'));
 add(fan.sys.Unit.define('bar; kg1*m-1*sec-2; 100000.0'));
 add(fan.sys.Unit.define('atmosphere, atm; kg1*m-1*sec-2; 101317.1'));
 add(fan.sys.Unit.define('pounds_per_square_inch, psi; kg1*m-1*sec-2; 6894.73'));
 add(fan.sys.Unit.define('centimeters_of_water, cmH₂O; kg1*m-1*sec-2; 98.0665'));
 add(fan.sys.Unit.define('inches_of_water, in/wc, inH₂O; kg1*m-1*sec-2; 248.84'));
 add(fan.sys.Unit.define('millimeters_of_mercury, mmHg; kg1*m-1*sec-2; 133.322368421'));
 add(fan.sys.Unit.define('centimeters_of_mercury, cmHg; kg1*m-1*sec-2; 1333.22368421'));
 add(fan.sys.Unit.define('inches_of_mercury, inHg; kg1*m-1*sec-2; 3386.38815789'));
 add(fan.sys.Unit.define('hectopascal, hPa; kg1*m-1*sec-2; 100.0'));
 add(fan.sys.Unit.define('millibar, mbar; kg1*m-1*sec-2; 100.0'));
}
fan.sys.Unit.m_quantities['pressure'] = fan.sys.Unit.m_quantities['pressure'].toImmutable();
// specific entropy
fan.sys.Unit.m_quantityNames.add('specific entropy');
with (fan.sys.Unit.m_quantities['specific entropy'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('joules_per_kilogram_degree_kelvin, J/kg°K; m2*sec-2*K-1'));
}
fan.sys.Unit.m_quantities['specific entropy'] = fan.sys.Unit.m_quantities['specific entropy'].toImmutable();
// surface tension
fan.sys.Unit.m_quantityNames.add('surface tension');
with (fan.sys.Unit.m_quantities['surface tension'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('newtons_per_meter, N/m; kg1*sec-2'));
}
fan.sys.Unit.m_quantities['surface tension'] = fan.sys.Unit.m_quantities['surface tension'].toImmutable();
// temperature
fan.sys.Unit.m_quantityNames.add('temperature');
with (fan.sys.Unit.m_quantities['temperature'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('fahrenheit, °F; K1; 0.5555555555555556; 255.37222222222223'));
 add(fan.sys.Unit.define('celsius, °C; K1; 1.0; 273.15'));
 add(fan.sys.Unit.define('kelvin, K; K1'));
}
fan.sys.Unit.m_quantities['temperature'] = fan.sys.Unit.m_quantities['temperature'].toImmutable();
// temperature differential
fan.sys.Unit.m_quantityNames.add('temperature differential');
with (fan.sys.Unit.m_quantities['temperature differential'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('fahrenheit_degrees, Δ°F; K1; 0.5555555555555556'));
 add(fan.sys.Unit.define('celsius_degrees, Δ°C; K1'));
 add(fan.sys.Unit.define('kelvin_degrees, ΔK; K1'));
}
fan.sys.Unit.m_quantities['temperature differential'] = fan.sys.Unit.m_quantities['temperature differential'].toImmutable();
// thermal conductivity
fan.sys.Unit.m_quantityNames.add('thermal conductivity');
with (fan.sys.Unit.m_quantities['thermal conductivity'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('watts_per_meter_degree_kelvin, W/m°K; kg1*m1*sec-3*K-1'));
}
fan.sys.Unit.m_quantities['thermal conductivity'] = fan.sys.Unit.m_quantities['thermal conductivity'].toImmutable();
// time
fan.sys.Unit.m_quantityNames.add('time');
with (fan.sys.Unit.m_quantities['time'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('nanosecond, ns; sec1; 1.0E-9'));
 add(fan.sys.Unit.define('microsecond, µs; sec1; 1.0E-6'));
 add(fan.sys.Unit.define('millisecond, ms; sec1; 0.0010'));
 add(fan.sys.Unit.define('hundredths_second, cs; sec1; 0.01'));
 add(fan.sys.Unit.define('tenths_second, ds; sec1; 0.1'));
 add(fan.sys.Unit.define('second, sec, s; sec1'));
 add(fan.sys.Unit.define('minute, min; sec1; 60.0'));
 add(fan.sys.Unit.define('hour, hr, h; sec1; 3600.0'));
 add(fan.sys.Unit.define('day; sec1; 86400.0'));
 add(fan.sys.Unit.define('week, wk; sec1; 604800.0'));
 add(fan.sys.Unit.define('julian_month, mo; sec1; 2629800.0'));
 add(fan.sys.Unit.define('year, yr; sec1; 3.1536E7'));
}
fan.sys.Unit.m_quantities['time'] = fan.sys.Unit.m_quantities['time'].toImmutable();
// velocity
fan.sys.Unit.m_quantityNames.add('velocity');
with (fan.sys.Unit.m_quantities['velocity'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('meters_per_second, m/s; m1*sec-1'));
 add(fan.sys.Unit.define('kilometers_per_second, km/s; m1*sec-1; 1000.0'));
 add(fan.sys.Unit.define('kilometers_per_hour, km/h; m1*sec-1; 0.277778'));
 add(fan.sys.Unit.define('miles_per_hour, mph; m1*sec-1; 0.447027'));
 add(fan.sys.Unit.define('feet_per_second, ft/s; m1*sec-1; 0.3048'));
 add(fan.sys.Unit.define('feet_per_minute, ft/min; m1*sec-1; 0.00508'));
 add(fan.sys.Unit.define('millimeters_per_second, mm/s; m1*sec-1; 0.0010'));
 add(fan.sys.Unit.define('millimeters_per_minute, mm/min; m1*sec-1; 1.6666666666666667E-5'));
 add(fan.sys.Unit.define('meters_per_minute, m/min; m1*sec-1; 0.016666666666666666'));
 add(fan.sys.Unit.define('meters_per_hour, m/h; m1*sec-1; 2.777777777777778E-4'));
 add(fan.sys.Unit.define('knot; m1*sec-1; 0.5144'));
}
fan.sys.Unit.m_quantities['velocity'] = fan.sys.Unit.m_quantities['velocity'].toImmutable();
// volume
fan.sys.Unit.m_quantityNames.add('volume');
with (fan.sys.Unit.m_quantities['volume'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('cubic_meter, m³; m3'));
 add(fan.sys.Unit.define('cubic_millimeter, mm³; m3; 1.0E-9'));
 add(fan.sys.Unit.define('cubic_centimeter, cm³; m3; 1.0E-6'));
 add(fan.sys.Unit.define('milliliter, mL; m3; 1.0E-6'));
 add(fan.sys.Unit.define('hectoliter, hL; m3; 0.10'));
 add(fan.sys.Unit.define('liter, L; m3; 0.0010'));
 add(fan.sys.Unit.define('kiloliter, kL; m3'));
 add(fan.sys.Unit.define('cubic_inch, in³; m3; 1.6387064E-5'));
 add(fan.sys.Unit.define('cubic_foot, ft³; m3; 0.028317'));
 add(fan.sys.Unit.define('cubic_yard, yd³; m3; 0.764555'));
 add(fan.sys.Unit.define('gallon, gal; m3; 0.003785'));
 add(fan.sys.Unit.define('kilogallon, kgal; m3; 3.785'));
 add(fan.sys.Unit.define('quart, qt; m3; 9.46E-4'));
 add(fan.sys.Unit.define('pint, pt; m3; 4.73E-4'));
 add(fan.sys.Unit.define('fluid_ounce, fl_oz; m3; 2.95729E-5'));
 add(fan.sys.Unit.define('imperial_gallon, galUK; m3; 0.004546092'));
 add(fan.sys.Unit.define('hecto_cubic_foot, hft³; m3; 2.8317'));
}
fan.sys.Unit.m_quantities['volume'] = fan.sys.Unit.m_quantities['volume'].toImmutable();
// volumetric flow
fan.sys.Unit.m_quantityNames.add('volumetric flow');
with (fan.sys.Unit.m_quantities['volumetric flow'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('cubic_meters_per_second, m³/s; m3*sec-1'));
 add(fan.sys.Unit.define('milliliters_per_second, mL/s; m3*sec-1; 1.0E-6'));
 add(fan.sys.Unit.define('hectoliters_per_second, hL/s; m3*sec-1; 0.10'));
 add(fan.sys.Unit.define('liters_per_second, L/s; m3*sec-1; 0.0010'));
 add(fan.sys.Unit.define('cubic_feet_per_second, cfs; m3*sec-1; 0.028317'));
 add(fan.sys.Unit.define('cubic_feet_per_minute, cfm; m3*sec-1; 4.719474432E-4'));
 add(fan.sys.Unit.define('cubic_feet_per_hour, cfh; m3*sec-1; 0.000007866'));
 add(fan.sys.Unit.define('kilocubic_feet_per_minute, kcfm; m3*sec-1; 0.4719474432'));
 add(fan.sys.Unit.define('imperial_gallons_per_minute, galUK/min; m3*sec-1; 0.004546092'));
 add(fan.sys.Unit.define('liters_per_minute, L/min; m3*sec-1; 1.6666666666666667E-5'));
 add(fan.sys.Unit.define('gallons_per_minute, gal/min; m3*sec-1; 6.30901964E-5'));
 add(fan.sys.Unit.define('gallons_per_hour, gal/hr, gph; m3*sec-1; 1.0515033E-6'));
 add(fan.sys.Unit.define('liters_per_hour, L/h; m3*sec-1; 2.7777777777777776E-7'));
 add(fan.sys.Unit.define('cubic_meters_per_minute, m³/min; m3*sec-1; 0.016666666666666666'));
 add(fan.sys.Unit.define('cubic_meters_per_hour, m³/h; m3*sec-1; 2.777777777777778E-4'));
}
fan.sys.Unit.m_quantities['volumetric flow'] = fan.sys.Unit.m_quantities['volumetric flow'].toImmutable();
// bytes
fan.sys.Unit.m_quantityNames.add('bytes');
with (fan.sys.Unit.m_quantities['bytes'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('byte'));
 add(fan.sys.Unit.define('kilobyte, kB; ; 1024'));
 add(fan.sys.Unit.define('megabyte, MB; ; 1048576'));
 add(fan.sys.Unit.define('gigabyte, GB; ; 1073741824'));
 add(fan.sys.Unit.define('terabyte, TB; ; 1099511627776'));
 add(fan.sys.Unit.define('petabyte, PB; ; 1125899906842624'));
}
fan.sys.Unit.m_quantities['bytes'] = fan.sys.Unit.m_quantities['bytes'].toImmutable();
// honeywell ontology units
fan.sys.Unit.m_quantityNames.add('honeywell ontology units');
with (fan.sys.Unit.m_quantities['honeywell ontology units'] = fan.sys.List.make(fan.sys.Unit.$type))
{
 add(fan.sys.Unit.define('a_ab, abA'));
 add(fan.sys.Unit.define('a_stat, statA'));
 add(fan.sys.Unit.define('abampere, abA'));
 add(fan.sys.Unit.define('abampere_per_square_centimeter, AbamperePerSquareCentimeter'));
 add(fan.sys.Unit.define('abcoulomb, abC'));
 add(fan.sys.Unit.define('abcoulomb_per_square_centimeter, abC/cm²'));
 add(fan.sys.Unit.define('abfarad, abF'));
 add(fan.sys.Unit.define('abfarad_per_centimeter, abF/cm'));
 add(fan.sys.Unit.define('abhenry, abH'));
 add(fan.sys.Unit.define('abohm, abOhm'));
 add(fan.sys.Unit.define('absiemen, aS'));
 add(fan.sys.Unit.define('abtesla, abT'));
 add(fan.sys.Unit.define('abvolt, abV'));
 add(fan.sys.Unit.define('abvolt_centimeter, abV_cm'));
 add(fan.sys.Unit.define('abvolt_per_centimeter, abV/cm'));
 add(fan.sys.Unit.define('abvolt_second, abvolt_second'));
 add(fan.sys.Unit.define('acre, acre'));
 add(fan.sys.Unit.define('acre_foot, acre_foot'));
 add(fan.sys.Unit.define('ampere_per_degree, A/deg'));
 add(fan.sys.Unit.define('ampere_per_joule, A_J⁻¹'));
 add(fan.sys.Unit.define('ampere_per_millimeter, A/mm'));
 add(fan.sys.Unit.define('ampere_per_radian, A/rad'));
 add(fan.sys.Unit.define('ampere_per_square_centimeter, A/cm³'));
 add(fan.sys.Unit.define('ampere_per_square_foot, A/ft²'));
 add(fan.sys.Unit.define('ampere_per_square_millimeter, A/mm²'));
 add(fan.sys.Unit.define('ampere_turn, At'));
 add(fan.sys.Unit.define('ampere_turn_per_inch, At/in'));
 add(fan.sys.Unit.define('ampere_turn_per_meter, At/m'));
 add(fan.sys.Unit.define('amu, μ'));
 add(fan.sys.Unit.define('angstrom, Ã…'));
 add(fan.sys.Unit.define('angular_milli_seconds, angmillisec'));
 add(fan.sys.Unit.define('angular_minute, angmin'));
 add(fan.sys.Unit.define('angular_second, angsec'));
 add(fan.sys.Unit.define('arc_minute, arcMin'));
 add(fan.sys.Unit.define('arc_second, arcSec'));
 add(fan.sys.Unit.define('arcmin, arcMin'));
 add(fan.sys.Unit.define('arcsec, arcSec'));
 add(fan.sys.Unit.define('are, a'));
 add(fan.sys.Unit.define('argentine_peso, ArgentinePeso'));
 add(fan.sys.Unit.define('armenian_dram, ArmenianDram'));
 add(fan.sys.Unit.define('astronomical_unit, au'));
 add(fan.sys.Unit.define('atm_cubic_foot_per_pound_mole_kelvin, atm_ft³/lbmol_K'));
 add(fan.sys.Unit.define('atm_cubic_foot_per_pound_mole_r, atm_ft³/lbmol_R'));
 add(fan.sys.Unit.define('atm_t, at'));
 add(fan.sys.Unit.define('atmosphere_absolute, atma'));
 add(fan.sys.Unit.define('atmosphere_diff, atmdiff'));
 add(fan.sys.Unit.define('atmosphere_gauge, atmg'));
 add(fan.sys.Unit.define('atmosphere_liter_per_mole_kelvin, atm_l/mol_K'));
 add(fan.sys.Unit.define('atmosphere_per_hour, atm_/h'));
 add(fan.sys.Unit.define('atmosphere_technical, at'));
 add(fan.sys.Unit.define('atmospheres_per_ft, atm/ft'));
 add(fan.sys.Unit.define('atmospheres_per_meter, atm/m'));
 add(fan.sys.Unit.define('atomic_mass_unit, u'));
 add(fan.sys.Unit.define('atomic_number, Z'));
 add(fan.sys.Unit.define('atto, a'));
 add(fan.sys.Unit.define('atto_gram, atto_g'));
 add(fan.sys.Unit.define('atto_joule, attoJ'));
 add(fan.sys.Unit.define('australian_dollar, A$'));
 add(fan.sys.Unit.define('australian_dollar_per_cubic_meter, A$/m³'));
 add(fan.sys.Unit.define('australian_dollar_per_hour, A$/hr'));
 add(fan.sys.Unit.define('australian_dollar_per_kilowatthour, A$/kWh'));
 add(fan.sys.Unit.define('avoirdupois_ounce, ozav'));
 add(fan.sys.Unit.define('ban, ban'));
 add(fan.sys.Unit.define('bar, bar'));
 add(fan.sys.Unit.define('bar, bar'));
 add(fan.sys.Unit.define('bar_absolute, bara'));
 add(fan.sys.Unit.define('bar_diff, bardiff'));
 add(fan.sys.Unit.define('bar_gauge, barg'));
 add(fan.sys.Unit.define('bar_per_hour, bar_/h'));
 add(fan.sys.Unit.define('bar_per_kilometer, bar/km'));
 add(fan.sys.Unit.define('bar_per_meter, bar/m'));
 add(fan.sys.Unit.define('barad, ρ'));
 add(fan.sys.Unit.define('barn, b'));
 add(fan.sys.Unit.define('barns_per_cubic_centimeter, barns/cm³'));
 add(fan.sys.Unit.define('barns_per_electron, barns/electron'));
 add(fan.sys.Unit.define('barrel, bbl'));
 add(fan.sys.Unit.define('barrel_per_day, bpd'));
 add(fan.sys.Unit.define('barrel_per_day_f, std_bpd'));
 add(fan.sys.Unit.define('barrel_per_day_per_kilo_pascal, bbl_/d_kPa'));
 add(fan.sys.Unit.define('barrel_per_day_per_psi, bbl_/d_psi'));
 add(fan.sys.Unit.define('barrel_per_day_pounds_per_square_inch, bbl/d_psi'));
 add(fan.sys.Unit.define('barrel_per_foot, bbl/ft'));
 add(fan.sys.Unit.define('barrel_per_hour, bph'));
 add(fan.sys.Unit.define('barrel_per_hour_f, std_bph'));
 add(fan.sys.Unit.define('barrel_per_inch, bbl/in'));
 add(fan.sys.Unit.define('barrel_per_mile, bbl/mile'));
 add(fan.sys.Unit.define('barrel_per_minute, bpm'));
 add(fan.sys.Unit.define('barrel_per_uk_ton, bbl/uk_t'));
 add(fan.sys.Unit.define('barrel_per_us_ton, bbl/us_t'));
 add(fan.sys.Unit.define('barrels_per_acre, bbl/acre'));
 add(fan.sys.Unit.define('barrels_per_centipoise_day_psi, bbl/cP_d_psi'));
 add(fan.sys.Unit.define('barrels_per_day_foot, bbl/d_ft'));
 add(fan.sys.Unit.define('barrels_per_day_foot_pounds_per_sq_in, bbl/d_ft_psi'));
 add(fan.sys.Unit.define('barrels_per_million_std_cubic_feet_degf, bbl/million_std_ft³'));
 add(fan.sys.Unit.define('bbls, bbl'));
 add(fan.sys.Unit.define('becquerel, Bq'));
 add(fan.sys.Unit.define('becquerel_per_kilogram, Bq/kg'));
 add(fan.sys.Unit.define('bel, B'));
 add(fan.sys.Unit.define('bel_per_meter, B/m'));
 add(fan.sys.Unit.define('bel_per_octave, B/O'));
 add(fan.sys.Unit.define('benoit_chain_a, benoit_chain'));
 add(fan.sys.Unit.define('billion_cubic_feet, billion_ft³'));
 add(fan.sys.Unit.define('billions_of_electron_volt, billion_eV'));
 add(fan.sys.Unit.define('biot, abA'));
 add(fan.sys.Unit.define('biot, Bi'));
 add(fan.sys.Unit.define('bit, bit'));
 add(fan.sys.Unit.define('bits_per_second, bps'));
 add(fan.sys.Unit.define('board_foot, Bf'));
 add(fan.sys.Unit.define('breath_per_minute, breaths/min'));
 add(fan.sys.Unit.define('british_thermal_unit_thermochemical, BtuTC'));
 add(fan.sys.Unit.define('british_thermal_units_per_barrel, Btu/bbl'));
 add(fan.sys.Unit.define('british_thermal_units_per_hour_cubic_foot, Btus/h_ft³'));
 add(fan.sys.Unit.define('british_thermal_units_per_minute, Btu/min'));
 add(fan.sys.Unit.define('british_thermal_units_per_second, Btu/s'));
 add(fan.sys.Unit.define('british_thermal_units_per_second_square_foot, Btu/s_ft²'));
 add(fan.sys.Unit.define('british_thermal_units_per_uk_gallon, Btu/uk_gal'));
 add(fan.sys.Unit.define('btu_foot, btu_foot'));
 add(fan.sys.Unit.define('btu_foot_per_square_foot_hour_degree_fahrenheit, btu_foot_per_square_foot_hour_degree_fahrenheit'));
 add(fan.sys.Unit.define('btu_inch, btu_inch'));
 add(fan.sys.Unit.define('btu_inch_per_square_foot_hour_degree_fahrenheit, btu_inch_per_square_foot_hour_degree_fahrenheit'));
 add(fan.sys.Unit.define('btu_inch_per_square_foot_second_degree_fahrenheit, btu_inch_per_square_foot_second_degree_fahrenheit'));
 add(fan.sys.Unit.define('btu_it, Btu_it'));
 add(fan.sys.Unit.define('btu_it_per_hr, Btu/hr'));
 add(fan.sys.Unit.define('btu_per_cubic_foot, Btu/ft³'));
 add(fan.sys.Unit.define('btu_per_degree_fahrenheit, Btu/°F'));
 add(fan.sys.Unit.define('btu_per_degree_rankine, Btu/°R'));
 add(fan.sys.Unit.define('btu_per_gallon, Btu/gal'));
 add(fan.sys.Unit.define('btu_per_hour_f, Btu/h_F'));
 add(fan.sys.Unit.define('btu_per_hour_foot_degree_fahrenheit, Btu/h_ft_°F'));
 add(fan.sys.Unit.define('btu_per_hour_foot_degree_rankine, Btu/h_ft_°R'));
 add(fan.sys.Unit.define('btu_per_hour_r, Btu/h_R'));
 add(fan.sys.Unit.define('btu_per_hour_square_foot, btu_per_hour_square_foot'));
 add(fan.sys.Unit.define('btu_per_hour_square_foot_f, Btu/h_ft²_F'));
 add(fan.sys.Unit.define('btu_per_hour_square_foot_r, Btu/h_ft²_R'));
 add(fan.sys.Unit.define('btu_per_hour_square_inch, Btu/h_in²'));
 add(fan.sys.Unit.define('btu_per_pound_degree_fahrenheit, btu_per_pound_degree_fahrenheit'));
 add(fan.sys.Unit.define('btu_per_pound_degree_rankine, btu_per_pound_degree_rankine'));
 add(fan.sys.Unit.define('btu_per_pound_mole, btu_per_pound_mole'));
 add(fan.sys.Unit.define('btu_per_pound_mole_deg_rankine, btu_per_pound_mole_deg_rankine'));
 add(fan.sys.Unit.define('btu_per_pound_mole_degree_fahrenheit, Btu/lbmol_°F'));
 add(fan.sys.Unit.define('btu_per_pound_mole_r, Btu/lbmol_R'));
 add(fan.sys.Unit.define('btu_per_second, Btu/s'));
 add(fan.sys.Unit.define('btu_per_second_square_foot, btu_per_second_square_foot'));
 add(fan.sys.Unit.define('btu_per_square_foot, Btu/ft²'));
 add(fan.sys.Unit.define('btu_per_square_foot_hour_degree_fahrenheit, btu_per_square_foot_hour_degree_fahrenheit'));
 add(fan.sys.Unit.define('btu_per_square_foot_second_degree_fahrenheit, btu_per_square_foot_second_degree_fahrenheit'));
 add(fan.sys.Unit.define('btu_per_standard_cubic_foot, Btu/std_ft³'));
 add(fan.sys.Unit.define('btu_th, Btu_th'));
 add(fan.sys.Unit.define('btus_per_brake_horsepower_hour, btus_per_brake_horsepower_hour'));
 add(fan.sys.Unit.define('btus_per_hour_foot_cubed_deg_f, Btus/h_ft³_°F'));
 add(fan.sys.Unit.define('btus_per_hour_foot_squared_deg_fper_inch, Btus_in/h_ft²_°F'));
 add(fan.sys.Unit.define('btus_per_hour_meter_squared_deg_c, Btu/h_m²_°C'));
 add(fan.sys.Unit.define('btus_per_second_per_cubic_foot, Btus/s_/ft³'));
 add(fan.sys.Unit.define('btus_per_second_per_cubic_foot_deg_f, Btus/s_ft³_°F'));
 add(fan.sys.Unit.define('btus_per_second_per_square_foot_deg_f, Btu/s_ft²_°F'));
 add(fan.sys.Unit.define('bushel, bu'));
 add(fan.sys.Unit.define('cal_th, cal_th'));
 add(fan.sys.Unit.define('calorie_nutritional, Cal'));
 add(fan.sys.Unit.define('calorie_per_cubic_meter, cal/m³'));
 add(fan.sys.Unit.define('calorie_per_hour, cal/hr'));
 add(fan.sys.Unit.define('calorie_per_mole, cal/gmol'));
 add(fan.sys.Unit.define('calorie_per_mole_kelvin, cal/mol_K'));
 add(fan.sys.Unit.define('calories_per_cubic_centimeter, cal/cm³'));
 add(fan.sys.Unit.define('calories_per_cubic_millimeter, cal/mm³'));
 add(fan.sys.Unit.define('calories_per_gram_degree_kelvin, cal/g_K'));
 add(fan.sys.Unit.define('calories_per_hour_centimeter_degree_celsius, cal/h_cm_°C'));
 add(fan.sys.Unit.define('calories_per_hour_centimeter_squared, cal/h_cm²'));
 add(fan.sys.Unit.define('calories_per_hour_cubic_centimeter, cal/h_cm³'));
 add(fan.sys.Unit.define('calories_per_hour_square_centimeter_deg_c, cal/h_cm²_°C'));
 add(fan.sys.Unit.define('calories_per_kilogram, cal/kg'));
 add(fan.sys.Unit.define('calories_per_milli_liter, cal/mL'));
 add(fan.sys.Unit.define('calories_per_pound_mass, cal/lb'));
 add(fan.sys.Unit.define('calories_per_second_centimeter_deg_c, cal/s_cm_°C'));
 add(fan.sys.Unit.define('calories_per_second_cubic_centimeter, cal/s_cm³'));
 add(fan.sys.Unit.define('calories_per_second_square_centimeter_deg_c, cal/s_cm²_°C'));
 add(fan.sys.Unit.define('canadian_dollar, C$'));
 add(fan.sys.Unit.define('canadian_dollar_per_cubic_foot, C$/ft³'));
 add(fan.sys.Unit.define('canadian_dollar_per_cubic_meter, C$/m³'));
 add(fan.sys.Unit.define('canadian_dollar_per_hour, C$/hr'));
 add(fan.sys.Unit.define('canadian_dollar_per_kilowatthour, C$/kWh'));
 add(fan.sys.Unit.define('candela_per_square_inch, cd/in²'));
 add(fan.sys.Unit.define('candle, candle'));
 add(fan.sys.Unit.define('candlepower, cp'));
 add(fan.sys.Unit.define('capture_unit, capture_unit'));
 add(fan.sys.Unit.define('carat, ct'));
 add(fan.sys.Unit.define('centesimal_minute, centesimal_minute'));
 add(fan.sys.Unit.define('centesimal_second, centesimal_second'));
 add(fan.sys.Unit.define('centi, c'));
 add(fan.sys.Unit.define('centi_bar, cbar'));
 add(fan.sys.Unit.define('centimeter_cubed, cm³_sm'));
 add(fan.sys.Unit.define('centimeter_per_second, cm/s'));
 add(fan.sys.Unit.define('centimeter_per_second_squared, cm/s²'));
 add(fan.sys.Unit.define('centimeter_per_year, cm/yr'));
 add(fan.sys.Unit.define('centimeter_second_degree_celsius, centimeter_second_degree_celsius'));
 add(fan.sys.Unit.define('centimeter_squared_per_gram, cm²/g'));
 add(fan.sys.Unit.define('centimeter_to_the_fourth, cm⁴'));
 add(fan.sys.Unit.define('centipoise, cP'));
 add(fan.sys.Unit.define('centistoke, cSt'));
 add(fan.sys.Unit.define('centistokes, cSt'));
 add(fan.sys.Unit.define('ch_hours, chu_h'));
 add(fan.sys.Unit.define('chain, ch'));
 add(fan.sys.Unit.define('cheval_vapeur, ch'));
 add(fan.sys.Unit.define('chus, chus'));
 add(fan.sys.Unit.define('circular_mil, cmil'));
 add(fan.sys.Unit.define('clo, clo'));
 add(fan.sys.Unit.define('colony_forming_unit, CFU'));
 add(fan.sys.Unit.define('coulomb_meter, C_m'));
 add(fan.sys.Unit.define('coulomb_per_cubic_meter, C_m⁻⁴'));
 add(fan.sys.Unit.define('coulomb_per_gram, C/g'));
 add(fan.sys.Unit.define('coulomb_per_kilogram, C/kg'));
 add(fan.sys.Unit.define('coulomb_per_meter, C/m'));
 add(fan.sys.Unit.define('coulomb_per_mole, C_mol⁻¹'));
 add(fan.sys.Unit.define('coulomb_per_square_meter, C/m²'));
 add(fan.sys.Unit.define('coulomb_square_meter, C_m²'));
 add(fan.sys.Unit.define('coulombs_per_cubic_centimeter, C/cm³'));
 add(fan.sys.Unit.define('coulombs_per_cubic_millimeter, C/mm³'));
 add(fan.sys.Unit.define('coulombs_per_square_centimeter, C/cm²'));
 add(fan.sys.Unit.define('coulombs_per_square_millimeter, C/mm²'));
 add(fan.sys.Unit.define('cubic_centimeter_c, std_cm³'));
 add(fan.sys.Unit.define('cubic_centimeter_per_day, cc/d'));
 add(fan.sys.Unit.define('cubic_centimeter_per_day_c, std_cc/d'));
 add(fan.sys.Unit.define('cubic_centimeter_per_gram, cm³/g'));
 add(fan.sys.Unit.define('cubic_centimeter_per_hour, cc/hr'));
 add(fan.sys.Unit.define('cubic_centimeter_per_hour_c, std_cc/hr'));
 add(fan.sys.Unit.define('cubic_centimeter_per_minute, cc/min'));
 add(fan.sys.Unit.define('cubic_centimeter_per_minute_c, std_cc/min'));
 add(fan.sys.Unit.define('cubic_centimeter_per_mole, cc/gmol'));
 add(fan.sys.Unit.define('cubic_centimeter_per_second, cc/s'));
 add(fan.sys.Unit.define('cubic_centimeter_per_second_c, std_cc/s'));
 add(fan.sys.Unit.define('cubic_coulomb_meter_per_square_joule, C³_m³_J⁻²'));
 add(fan.sys.Unit.define('cubic_decimeter, dm³'));
 add(fan.sys.Unit.define('cubic_decimeter_per_kilo_mole, dm³/kmol'));
 add(fan.sys.Unit.define('cubic_decimeter_per_kilogram, dm³/kg'));
 add(fan.sys.Unit.define('cubic_decimeter_per_kilowatthour, dm³/kW_h'));
 add(fan.sys.Unit.define('cubic_decimeter_per_megajoule, dm³/MJ'));
 add(fan.sys.Unit.define('cubic_decimeter_per_meter, dm³/m'));
 add(fan.sys.Unit.define('cubic_decimeter_per_second, dm³/s'));
 add(fan.sys.Unit.define('cubic_decimeter_per_second_per_second, dm³/s²'));
 add(fan.sys.Unit.define('cubic_decimeter_per_ton, dm³/t'));
 add(fan.sys.Unit.define('cubic_feet_per_day_foot_psi, ft³/d_ft_psi'));
 add(fan.sys.Unit.define('cubic_feet_per_foot, ft³/ft'));
 add(fan.sys.Unit.define('cubic_feet_per_kilogram, ft³/kg'));
 add(fan.sys.Unit.define('cubic_feet_per_min_square_foot, ft³/min_ft²'));
 add(fan.sys.Unit.define('cubic_feet_per_minute_per_minute, ft³/min²'));
 add(fan.sys.Unit.define('cubic_feet_per_second_per_second, ft³/s²'));
 add(fan.sys.Unit.define('cubic_feet_per_second_square_foot, ft³/s_ft²'));
 add(fan.sys.Unit.define('cubic_feet_per_std_cubic_foot_deg_f, ft³/std_ft³'));
 add(fan.sys.Unit.define('cubic_foot_per_day, ft³/d'));
 add(fan.sys.Unit.define('cubic_foot_per_day_f, std_ft³/d'));
 add(fan.sys.Unit.define('cubic_foot_per_hour_f, std_ft³/hr'));
 add(fan.sys.Unit.define('cubic_foot_per_hour_square_foot, ft³/hÂ·ft²'));
 add(fan.sys.Unit.define('cubic_foot_per_hour_square_inch, ft³/hÂ·in²'));
 add(fan.sys.Unit.define('cubic_foot_per_minute_f, std_ft³/min'));
 add(fan.sys.Unit.define('cubic_foot_per_minute_square_foot, ft³/minÂ·ft²'));
 add(fan.sys.Unit.define('cubic_foot_per_minute_square_inch, ft³/minÂ·in²'));
 add(fan.sys.Unit.define('cubic_foot_per_pound, ft³/lb'));
 add(fan.sys.Unit.define('cubic_foot_per_pound_mole, ft³/lbmol'));
 add(fan.sys.Unit.define('cubic_foot_per_second_f, std_ft³/s'));
 add(fan.sys.Unit.define('cubic_foot_per_second_square_foot, ft³/sÂ·ft²'));
 add(fan.sys.Unit.define('cubic_foot_per_second_square_inch, ft³/sÂ·in²'));
 add(fan.sys.Unit.define('cubic_inch_per_minute, in³/min'));
 add(fan.sys.Unit.define('cubic_inches_per_foot, in³/ft'));
 add(fan.sys.Unit.define('cubic_kilometer, km³'));
 add(fan.sys.Unit.define('cubic_kilometer_per_second_squared, km³/s²'));
 add(fan.sys.Unit.define('cubic_meter_c, std_m³'));
 add(fan.sys.Unit.define('cubic_meter_per_centipoise_day_kilo_pascal, m³/cP_d_kPa'));
 add(fan.sys.Unit.define('cubic_meter_per_centipoise_pascal_second, m³/cP_Pa_s'));
 add(fan.sys.Unit.define('cubic_meter_per_day, m³/d'));
 add(fan.sys.Unit.define('cubic_meter_per_day_c, std_m³/d'));
 add(fan.sys.Unit.define('cubic_meter_per_day_kilo_pascal, m³/d_kPa'));
 add(fan.sys.Unit.define('cubic_meter_per_day_per_bar, m³_/d_bar'));
 add(fan.sys.Unit.define('cubic_meter_per_day_per_kilo_pascal, m³_/d_kPa'));
 add(fan.sys.Unit.define('cubic_meter_per_day_per_meter, m³_/d_/m'));
 add(fan.sys.Unit.define('cubic_meter_per_day_per_pound_per_square_inch, m³_/d__psi'));
 add(fan.sys.Unit.define('cubic_meter_per_gram, m³/g'));
 add(fan.sys.Unit.define('cubic_meter_per_hour_c, std_m³/h'));
 add(fan.sys.Unit.define('cubic_meter_per_hour_per_bar, m³_/h_bar'));
 add(fan.sys.Unit.define('cubic_meter_per_hour_per_kilo_pascal, m³_/h_/kPa'));
 add(fan.sys.Unit.define('cubic_meter_per_hour_per_meter, m³_/h_/m'));
 add(fan.sys.Unit.define('cubic_meter_per_hour_square_centimeter, m³/h_cm²'));
 add(fan.sys.Unit.define('cubic_meter_per_hour_square_meter, m³/h_m²'));
 add(fan.sys.Unit.define('cubic_meter_per_joule, m³/J'));
 add(fan.sys.Unit.define('cubic_meter_per_kelvin, m³/K'));
 add(fan.sys.Unit.define('cubic_meter_per_kilo_mole, m³/kmol'));
 add(fan.sys.Unit.define('cubic_meter_per_kilogram, m³/kg'));
 add(fan.sys.Unit.define('cubic_meter_per_kilogram_second_squared, m³_kg⁻¹_s⁻²'));
 add(fan.sys.Unit.define('cubic_meter_per_kilometer, m³/km'));
 add(fan.sys.Unit.define('cubic_meter_per_kilowatthour, m³/kW_h'));
 add(fan.sys.Unit.define('cubic_meter_per_meter, m³/m'));
 add(fan.sys.Unit.define('cubic_meter_per_minute_c, std_m³/min'));
 add(fan.sys.Unit.define('cubic_meter_per_minute_per_bar, m³_/min_bar'));
 add(fan.sys.Unit.define('cubic_meter_per_minute_square_centimeter, m³/min_cm²'));
 add(fan.sys.Unit.define('cubic_meter_per_minute_square_meter, m³/min_m²'));
 add(fan.sys.Unit.define('cubic_meter_per_mole, m³_mol⁻¹'));
 add(fan.sys.Unit.define('cubic_meter_per_pascal_second, m³/Pa_s'));
 add(fan.sys.Unit.define('cubic_meter_per_second_c, std_m³/s'));
 add(fan.sys.Unit.define('cubic_meter_per_second_meter, m³/s_m'));
 add(fan.sys.Unit.define('cubic_meter_per_second_per_foot, m³_/s_/ft'));
 add(fan.sys.Unit.define('cubic_meter_per_second_square_centimeter, m³/s_cm²'));
 add(fan.sys.Unit.define('cubic_meter_per_second_square_meter, m³/s_m²'));
 add(fan.sys.Unit.define('cubic_meter_per_second_squared, m³/s²'));
 add(fan.sys.Unit.define('cubic_meter_per_square_meter, m³_/m²'));
 add(fan.sys.Unit.define('cubic_meter_per_squared_second, m³/s²'));
 add(fan.sys.Unit.define('cubic_meter_per_tonne, m³/t'));
 add(fan.sys.Unit.define('cubic_meter_per_uk_ton, m³/uk_t'));
 add(fan.sys.Unit.define('cubic_meter_per_us_ton, m³/us_t'));
 add(fan.sys.Unit.define('cubic_meter_permeability_length, m³_PL'));
 add(fan.sys.Unit.define('cubic_mile, mi³'));
 add(fan.sys.Unit.define('cubic_millimeter_c, std_mm³'));
 add(fan.sys.Unit.define('cubic_millimeter_per_joule, mm³/J'));
 add(fan.sys.Unit.define('cubic_yard_per_minute, yd³/min'));
 add(fan.sys.Unit.define('curie, Ci'));
 add(fan.sys.Unit.define('cv_hours, cv_h'));
 add(fan.sys.Unit.define('cycle, cycle'));
 add(fan.sys.Unit.define('cycles_per_second, cycles/s'));
 add(fan.sys.Unit.define('czech_koruna, Kč'));
 add(fan.sys.Unit.define('da, μ'));
 add(fan.sys.Unit.define('dalton, Da'));
 add(fan.sys.Unit.define('dalton, u'));
 add(fan.sys.Unit.define('darcy, darcy'));
 add(fan.sys.Unit.define('darcy_foot, darcy_ft'));
 add(fan.sys.Unit.define('darcy_meter, darcy_m'));
 add(fan.sys.Unit.define('day, d'));
 add(fan.sys.Unit.define('day, d'));
 add(fan.sys.Unit.define('day_per_barrel, d_/bbl'));
 add(fan.sys.Unit.define('day_sidereal, d'));
 add(fan.sys.Unit.define('day_sidereal, d'));
 add(fan.sys.Unit.define('days_per_cubic_foot, d/ft³'));
 add(fan.sys.Unit.define('days_per_cubic_meter, d/m³'));
 add(fan.sys.Unit.define('debye, D'));
 add(fan.sys.Unit.define('deca, da'));
 add(fan.sys.Unit.define('deca_ton_per_cubic_meter, decaton/m³'));
 add(fan.sys.Unit.define('decanewton_meter, decaN_m'));
 add(fan.sys.Unit.define('decanewtons, decaN'));
 add(fan.sys.Unit.define('deci, d'));
 add(fan.sys.Unit.define('deci_bar, dbar'));
 add(fan.sys.Unit.define('deci_s_per_m, ds/m'));
 add(fan.sys.Unit.define('decibel_carrier, dBc'));
 add(fan.sys.Unit.define('decibel_per_foot, dB/ft'));
 add(fan.sys.Unit.define('decibel_per_kilometer, dB/km'));
 add(fan.sys.Unit.define('decibel_per_meter, dB/m'));
 add(fan.sys.Unit.define('decibel_per_octave, dB/O'));
 add(fan.sys.Unit.define('decibel_referred_to_one_milliwatt, dBm'));
 add(fan.sys.Unit.define('decimeter_per_second, dm/s'));
 add(fan.sys.Unit.define('decinewton_meter, dN_m'));
 add(fan.sys.Unit.define('deg, °'));
 add(fan.sys.Unit.define('deg_r, °R'));
 add(fan.sys.Unit.define('degree, degree'));
 add(fan.sys.Unit.define('degree_api, API'));
 add(fan.sys.Unit.define('degree_celsius_centimeter, degree_celsius_centimeter'));
 add(fan.sys.Unit.define('degree_celsius_per_hour, °C_/_hr'));
 add(fan.sys.Unit.define('degree_celsius_per_minute, °C_/_m'));
 add(fan.sys.Unit.define('degree_celsius_per_second, °C_/_s'));
 add(fan.sys.Unit.define('degree_fahrenheit_hour, degree_fahrenheit_hour'));
 add(fan.sys.Unit.define('degree_fahrenheit_hour_per_btu, degree_fahrenheit_hour_per_btu'));
 add(fan.sys.Unit.define('degree_fahrenheit_per_hour, °F_/_h'));
 add(fan.sys.Unit.define('degree_fahrenheit_per_minute, °F_/_m'));
 add(fan.sys.Unit.define('degree_fahrenheit_per_second, °F_/_s'));
 add(fan.sys.Unit.define('degree_per_hour, deg/h'));
 add(fan.sys.Unit.define('degree_per_second, deg/s'));
 add(fan.sys.Unit.define('degree_per_second_squared, deg/s²'));
 add(fan.sys.Unit.define('degree_rankine, °R'));
 add(fan.sys.Unit.define('degree_rankine_difference, Δ°R'));
 add(fan.sys.Unit.define('degree_rankine_per_hour, °R_/_h'));
 add(fan.sys.Unit.define('degree_rankine_per_minute, °R_/_m'));
 add(fan.sys.Unit.define('degree_rankine_per_psia, R/psia'));
 add(fan.sys.Unit.define('degree_rankine_per_second, °R_/_s'));
 add(fan.sys.Unit.define('degrees_celsius_per_foot, °C/ft'));
 add(fan.sys.Unit.define('degrees_celsius_per_kilometer, °C/km'));
 add(fan.sys.Unit.define('degrees_celsius_per_meter, °C/m'));
 add(fan.sys.Unit.define('degrees_celsius_per_second, °C/s'));
 add(fan.sys.Unit.define('degrees_csquare_meter_hours_per_kilo_cal, °C_m²_h/kcal'));
 add(fan.sys.Unit.define('degrees_csquare_meter_hours_per_kilojoule, °C_m²_h/kJ'));
 add(fan.sys.Unit.define('degrees_fahrenheit_per_foot, °F/ft'));
 add(fan.sys.Unit.define('degrees_fahrenheit_per_meter, °F/m'));
 add(fan.sys.Unit.define('degrees_fahrenheit_per_second, °F/s'));
 add(fan.sys.Unit.define('degrees_fsquare_feet_hours_per_btu, °F_ft²_h/Btu'));
 add(fan.sys.Unit.define('degrees_kelvin_square_meter_per_kilowatt, K_m²/kW'));
 add(fan.sys.Unit.define('degrees_of_an_angle_per_foot, deg/ft'));
 add(fan.sys.Unit.define('degrees_of_an_angle_per_hour, degang/h'));
 add(fan.sys.Unit.define('degrees_of_an_angle_per_meter, deg/m'));
 add(fan.sys.Unit.define('degrees_of_an_angle_per_minute, degang/min'));
 add(fan.sys.Unit.define('degrees_of_an_angle_per_second, degang/s'));
 add(fan.sys.Unit.define('diopter, D'));
 add(fan.sys.Unit.define('dry_gallon_us, dry_gal'));
 add(fan.sys.Unit.define('dry_pint_us, dry_pt'));
 add(fan.sys.Unit.define('dry_quart_us, dry_qt'));
 add(fan.sys.Unit.define('dwt, dwt'));
 add(fan.sys.Unit.define('dyne, dyn'));
 add(fan.sys.Unit.define('dyne_centimeter, dyne_centimeter'));
 add(fan.sys.Unit.define('dyne_centimeter_squared, dyn__cm²'));
 add(fan.sys.Unit.define('dyne_per_square_centimeter, dyn/cm²'));
 add(fan.sys.Unit.define('dyne_second_per_square_centimeter, dyn_s/cm²'));
 add(fan.sys.Unit.define('dynes_per_centimeter, dyn/cm'));
 add(fan.sys.Unit.define('dynes_per_square_centimeter, dyn/cm²a'));
 add(fan.sys.Unit.define('e_h, E_h'));
 add(fan.sys.Unit.define('electron_volt, eV'));
 add(fan.sys.Unit.define('electron_volt_per_kelvin, eV_K⁻¹'));
 add(fan.sys.Unit.define('electron_volt_per_tesla, eV_T⁻¹'));
 add(fan.sys.Unit.define('electron_volt_second, eV_s'));
 add(fan.sys.Unit.define('engler, engler'));
 add(fan.sys.Unit.define('equivalent, eq'));
 add(fan.sys.Unit.define('equivalent_per_cubic_meter, eq/m³'));
 add(fan.sys.Unit.define('equivalent_per_kilogram, eq/kg'));
 add(fan.sys.Unit.define('equivalents_per_liter, eqs/L'));
 add(fan.sys.Unit.define('erg, erg'));
 add(fan.sys.Unit.define('erg, erg'));
 add(fan.sys.Unit.define('erg_per_cubic_centimeter, erg/cm³'));
 add(fan.sys.Unit.define('erg_per_second, erg/s'));
 add(fan.sys.Unit.define('erg_per_square_centimeter_second, erg_per_square_centimeter_second'));
 add(fan.sys.Unit.define('erg_second, erg_s'));
 add(fan.sys.Unit.define('ergs_per_cubic_centimeter, ergs/cm³'));
 add(fan.sys.Unit.define('ergs_per_cubic_meter, ergs/m³'));
 add(fan.sys.Unit.define('ergs_per_gram, ergs/g'));
 add(fan.sys.Unit.define('ergs_per_kilogram, ergs/kg'));
 add(fan.sys.Unit.define('ergs_per_square_centimeter, ergs/cm²'));
 add(fan.sys.Unit.define('ergs_per_year, ergs/yr'));
 add(fan.sys.Unit.define('euro, €'));
 add(fan.sys.Unit.define('euro_per_cubic_meter, €/m³'));
 add(fan.sys.Unit.define('euro_per_hour, €/hr'));
 add(fan.sys.Unit.define('euro_per_kilowatthour, €/kWh'));
 add(fan.sys.Unit.define('ev, eV'));
 add(fan.sys.Unit.define('exa, E'));
 add(fan.sys.Unit.define('exajoule, exaJ'));
 add(fan.sys.Unit.define('exajoule_per_year, exaJ/yr'));
 add(fan.sys.Unit.define('exbi, Ei'));
 add(fan.sys.Unit.define('farad_per_meter, F_m⁻¹'));
 add(fan.sys.Unit.define('farads_per_meter, Farads/m'));
 add(fan.sys.Unit.define('fathom, fath'));
 add(fan.sys.Unit.define('fathoms, fathoms'));
 add(fan.sys.Unit.define('feet_per_barrel, ft/bbl'));
 add(fan.sys.Unit.define('feet_per_cubic_foot, ft/ft³'));
 add(fan.sys.Unit.define('feet_per_day, ft/day'));
 add(fan.sys.Unit.define('feet_per_degree_fahrenheit, ft/°F'));
 add(fan.sys.Unit.define('feet_per_feet, ft_/ft'));
 add(fan.sys.Unit.define('feet_per_meter, ft/m'));
 add(fan.sys.Unit.define('feet_per_mile, ft/mile'));
 add(fan.sys.Unit.define('feet_per_us_gallon, ft/gal'));
 add(fan.sys.Unit.define('femto, f'));
 add(fan.sys.Unit.define('femto_coulomb, femtoC'));
 add(fan.sys.Unit.define('femto_meter, femtometer'));
 add(fan.sys.Unit.define('fermi, fm'));
 add(fan.sys.Unit.define('flight, flight'));
 add(fan.sys.Unit.define('flops, flops'));
 add(fan.sys.Unit.define('foot_candle_seconds, fc_s'));
 add(fan.sys.Unit.define('foot_cubed, ft³_sm'));
 add(fan.sys.Unit.define('foot_kilo_pound_force, ft_kipf'));
 add(fan.sys.Unit.define('foot_kip, ft_kip'));
 add(fan.sys.Unit.define('foot_lambert, foot_lambert'));
 add(fan.sys.Unit.define('foot_per_hour, ft/hr'));
 add(fan.sys.Unit.define('foot_per_micro_second, ft/µs'));
 add(fan.sys.Unit.define('foot_per_milli_second, ft/ms'));
 add(fan.sys.Unit.define('foot_per_second_squared, ft/s²'));
 add(fan.sys.Unit.define('foot_pound, foot_pound'));
 add(fan.sys.Unit.define('foot_pound_force, foot_pound_force'));
 add(fan.sys.Unit.define('foot_pound_force_per_hour, foot_pound_force_per_hour'));
 add(fan.sys.Unit.define('foot_pound_force_per_minute, foot_pound_force_per_minute'));
 add(fan.sys.Unit.define('foot_pound_force_per_second, foot_pound_force_per_second'));
 add(fan.sys.Unit.define('foot_pound_force_per_square_foot, foot_pound_force_per_square_foot'));
 add(fan.sys.Unit.define('foot_pound_force_per_square_foot_second, foot_pound_force_per_square_foot_second'));
 add(fan.sys.Unit.define('foot_pound_force_per_square_meter, foot_pound_force_per_square_meter'));
 add(fan.sys.Unit.define('foot_pound_force_second, lbf_/_s'));
 add(fan.sys.Unit.define('foot_pound_mass, ft_lb'));
 add(fan.sys.Unit.define('foot_poundal, ft_pdl'));
 add(fan.sys.Unit.define('foot_pounds_force_per_barrel, ft_lbf/bbl'));
 add(fan.sys.Unit.define('foot_pounds_force_per_minute, ft_lbf/min'));
 add(fan.sys.Unit.define('foot_pounds_force_per_pound_mass, ft_lb_f/lb'));
 add(fan.sys.Unit.define('foot_pounds_force_per_second, ft_lbf/s'));
 add(fan.sys.Unit.define('foot_pounds_force_per_square_inch, ft_lb_f/in²'));
 add(fan.sys.Unit.define('foot_pounds_force_per_us_gallon, ft_lbf/gal'));
 add(fan.sys.Unit.define('fourth_power_of_meter_per_s, m⁴/s'));
 add(fan.sys.Unit.define('fraction, fr'));
 add(fan.sys.Unit.define('fractional_area, fa'));
 add(fan.sys.Unit.define('frame_per_second, fps'));
 add(fan.sys.Unit.define('franklin, Fr'));
 add(fan.sys.Unit.define('ft_pdl, ft_pdl'));
 add(fan.sys.Unit.define('ft_per_min, ft³/min'));
 add(fan.sys.Unit.define('furlong, fur'));
 add(fan.sys.Unit.define('galileo, galileo'));
 add(fan.sys.Unit.define('gallon_per_day, gpd'));
 add(fan.sys.Unit.define('gallon_per_day_f, std_gpd'));
 add(fan.sys.Unit.define('gallon_per_hour, gal/h'));
 add(fan.sys.Unit.define('gallon_per_hour_f, std_gph'));
 add(fan.sys.Unit.define('gallon_per_hour_square_foot, gph/ft²'));
 add(fan.sys.Unit.define('gallon_per_hour_square_inch, gph/in²'));
 add(fan.sys.Unit.define('gallon_per_minute, gpm'));
 add(fan.sys.Unit.define('gallon_per_minute_f, std_gpm'));
 add(fan.sys.Unit.define('gallon_per_minute_square_foot, gpm/ft²'));
 add(fan.sys.Unit.define('gallon_per_minute_square_inch, gpm/in²'));
 add(fan.sys.Unit.define('gallon_per_second, gps'));
 add(fan.sys.Unit.define('gallon_per_second_f, std_gps'));
 add(fan.sys.Unit.define('gallon_per_second_square_foot, gps/ft²'));
 add(fan.sys.Unit.define('gallon_per_second_square_inch, gps/in²'));
 add(fan.sys.Unit.define('gallon_uk, gal_UK'));
 add(fan.sys.Unit.define('gallon_ukper_minute, gal_UK/min'));
 add(fan.sys.Unit.define('gallon_us, gal_US'));
 add(fan.sys.Unit.define('gallon_usper_day, gal/d'));
 add(fan.sys.Unit.define('gamma, gamma'));
 add(fan.sys.Unit.define('gauss, Gs'));
 add(fan.sys.Unit.define('gibi, Gi'));
 add(fan.sys.Unit.define('giga, G'));
 add(fan.sys.Unit.define('giga_becquerel, GBq'));
 add(fan.sys.Unit.define('giga_calorie, Gcal'));
 add(fan.sys.Unit.define('giga_calorie_per_hour, Gcal/hr'));
 add(fan.sys.Unit.define('giga_electron_volt, GeV'));
 add(fan.sys.Unit.define('giga_ev, GeV'));
 add(fan.sys.Unit.define('giga_hertz, GHz'));
 add(fan.sys.Unit.define('giga_hz, GHz'));
 add(fan.sys.Unit.define('giga_ohm, Gohm'));
 add(fan.sys.Unit.define('giga_pascal, Gpaa'));
 add(fan.sys.Unit.define('giga_pascal_per_centimeter, GPa/cm'));
 add(fan.sys.Unit.define('giga_radian, gigaradian'));
 add(fan.sys.Unit.define('giga_siemen, Gsiemen'));
 add(fan.sys.Unit.define('giga_standard_cubic_meter_c, G_std_ft³'));
 add(fan.sys.Unit.define('giga_volt, GV'));
 add(fan.sys.Unit.define('giga_years, Gyr'));
 add(fan.sys.Unit.define('gilbert, Gi'));
 add(fan.sys.Unit.define('gon, gon'));
 add(fan.sys.Unit.define('gon, grad'));
 add(fan.sys.Unit.define('gons, gons'));
 add(fan.sys.Unit.define('grad, grad'));
 add(fan.sys.Unit.define('grad, grad'));
 add(fan.sys.Unit.define('grade, gr'));
 add(fan.sys.Unit.define('grain, gr'));
 add(fan.sys.Unit.define('grain, grain'));
 add(fan.sys.Unit.define('grain_per_gallon, gr/gal'));
 add(fan.sys.Unit.define('grains_per_cubic_foot, grains/ft³'));
 add(fan.sys.Unit.define('grains_per_gallon, grains/gal'));
 add(fan.sys.Unit.define('gram_degree_celsius, gram_degree_celsius'));
 add(fan.sys.Unit.define('gram_feet_per_cubic_centimeter_second, g_ft/cm³_s'));
 add(fan.sys.Unit.define('gram_force, gm_f'));
 add(fan.sys.Unit.define('gram_force_per_square_meter, gf/m²'));
 add(fan.sys.Unit.define('gram_meter_per_second, g_m/s'));
 add(fan.sys.Unit.define('gram_per_cubic_centimeter, g/cm³'));
 add(fan.sys.Unit.define('gram_per_hour, g/hr'));
 add(fan.sys.Unit.define('gram_per_liter, g/L'));
 add(fan.sys.Unit.define('gram_per_meter, g/m'));
 add(fan.sys.Unit.define('gram_per_minute_square_centimeter, g/min_cm²'));
 add(fan.sys.Unit.define('gram_per_mole, g/mol'));
 add(fan.sys.Unit.define('gram_per_second_square_centimeter, g/s_cm²'));
 add(fan.sys.Unit.define('gram_square_meter, g_m²'));
 add(fan.sys.Unit.define('grams_per_centimeter_fourth, g/cm⁴'));
 add(fan.sys.Unit.define('grams_per_cubic_decimeter, g/dm³'));
 add(fan.sys.Unit.define('grams_per_uk_gallon, g/gal_uk'));
 add(fan.sys.Unit.define('grams_per_us_gallon, g/gal'));
 add(fan.sys.Unit.define('gravity, grav'));
 add(fan.sys.Unit.define('gray, Gy'));
 add(fan.sys.Unit.define('gray_per_second, Gy/s'));
 add(fan.sys.Unit.define('half_amilli_second, halfmillis'));
 add(fan.sys.Unit.define('hartree, E_h'));
 add(fan.sys.Unit.define('heart_beats_per_minute, BPM'));
 add(fan.sys.Unit.define('hectare, ha'));
 add(fan.sys.Unit.define('hectare_meter, ha_m'));
 add(fan.sys.Unit.define('hecto, h'));
 add(fan.sys.Unit.define('hecto_bar, hectobar'));
 add(fan.sys.Unit.define('hecto_liter, hectoL'));
 add(fan.sys.Unit.define('henry_per_meter, H/m'));
 add(fan.sys.Unit.define('hertz_per_kelvin, Hz_K⁻¹'));
 add(fan.sys.Unit.define('hertz_per_tesla, Hz_T⁻¹'));
 add(fan.sys.Unit.define('hertz_per_volt, Hz_V⁻¹'));
 add(fan.sys.Unit.define('horsepower_boiler, hp/boiler'));
 add(fan.sys.Unit.define('horsepower_electric, hp/V'));
 add(fan.sys.Unit.define('horsepower_hour, hp_h'));
 add(fan.sys.Unit.define('horsepower_hour_per_pound_mole_r, hp_h/lbmol_R'));
 add(fan.sys.Unit.define('horsepower_hours_per_barrel, hp/bbl'));
 add(fan.sys.Unit.define('horsepower_hours_per_pound_mass, hp_h/lb'));
 add(fan.sys.Unit.define('horsepower_metric, hp/m'));
 add(fan.sys.Unit.define('horsepower_per_cubic_foot, hp/ft³'));
 add(fan.sys.Unit.define('horsepower_per_square_inch, hp/in²'));
 add(fan.sys.Unit.define('hour_per_cubic_meter, h_/m³'));
 add(fan.sys.Unit.define('hour_per_kilometer, h_/km'));
 add(fan.sys.Unit.define('hour_square_foot, hour_square_foot'));
 add(fan.sys.Unit.define('hours_per_cubic_foot, h/ft³'));
 add(fan.sys.Unit.define('hp, HP'));
 add(fan.sys.Unit.define('hr, h'));
 add(fan.sys.Unit.define('hundred_cubic_feet_natural_gas, hundred_cubic_feet_natural_gas'));
 add(fan.sys.Unit.define('hundred_normal_cubic_meter_per_hour, hnorm_m³/hr'));
 add(fan.sys.Unit.define('hundred_seconds, hectos'));
 add(fan.sys.Unit.define('hundred_weight_long, cwt'));
 add(fan.sys.Unit.define('hundred_weight_short, cwt'));
 add(fan.sys.Unit.define('hydraulic_horsepower_per_square_inch, hp/in²_hyd'));
 add(fan.sys.Unit.define('in_h_o, inAq'));
 add(fan.sys.Unit.define('inch_cubed, in³_sm'));
 add(fan.sys.Unit.define('inch_kilo_pound_force, in_kipf'));
 add(fan.sys.Unit.define('inch_of_mercury_absolute_f, inHga'));
 add(fan.sys.Unit.define('inch_of_mercury_fdiff, inHgdiff'));
 add(fan.sys.Unit.define('inch_of_mercury_gauge_f, inHgg'));
 add(fan.sys.Unit.define('inch_per_hour, in/hr'));
 add(fan.sys.Unit.define('inch_per_second_squared, in/s²'));
 add(fan.sys.Unit.define('inch_pound_force, inch_pound_force'));
 add(fan.sys.Unit.define('inches_per_inch_degree_fahrenheit, in/in_°F'));
 add(fan.sys.Unit.define('inches_per_minute, in/min'));
 add(fan.sys.Unit.define('inches_per_second, in/s'));
 add(fan.sys.Unit.define('inches_per_year, in/yr'));
 add(fan.sys.Unit.define('indian_rupee, ₹'));
 add(fan.sys.Unit.define('indian_rupee_per_cubic_foot, ₹/ft³'));
 add(fan.sys.Unit.define('indian_rupee_per_cubic_meter, ₹/m³'));
 add(fan.sys.Unit.define('indian_rupee_per_hour, ₹/hr'));
 add(fan.sys.Unit.define('indian_rupee_per_kilowatthour, ₹/kWh'));
 add(fan.sys.Unit.define('international_unit, IU'));
 add(fan.sys.Unit.define('international_unit_per_liter, IU/L'));
 add(fan.sys.Unit.define('j, N_m'));
 add(fan.sys.Unit.define('japanese_yen, JP¥'));
 add(fan.sys.Unit.define('japanese_yen_per_cubic_meter, JP¥/m³'));
 add(fan.sys.Unit.define('japanese_yen_per_hour, JP¥/hr'));
 add(fan.sys.Unit.define('japanese_yen_per_kilowatthour, JP¥/kWh'));
 add(fan.sys.Unit.define('joule_meter_per_mole, J_m_mol⁻¹'));
 add(fan.sys.Unit.define('joule_per_cubic_decimeter, J/dm³'));
 add(fan.sys.Unit.define('joule_per_cubic_meter, J/m³'));
 add(fan.sys.Unit.define('joule_per_cubic_meter_kelvin, J/m³_K'));
 add(fan.sys.Unit.define('joule_per_gram_degree_kelvin, J/g_K'));
 add(fan.sys.Unit.define('joule_per_kelvin, J_K⁻¹'));
 add(fan.sys.Unit.define('joule_per_kilogram_kelvin, J/kg_K'));
 add(fan.sys.Unit.define('joule_per_kilogram_kelvin_per_cubic_meter, joule_per_kilogram_kelvin_per_cubic_meter'));
 add(fan.sys.Unit.define('joule_per_kilogram_kelvin_per_pascal, joule_per_kilogram_kelvin_per_pascal'));
 add(fan.sys.Unit.define('joule_per_meter, J/m'));
 add(fan.sys.Unit.define('joule_per_mole, J/mol'));
 add(fan.sys.Unit.define('joule_per_mole_kelvin, J_mol⁻¹_K⁻¹'));
 add(fan.sys.Unit.define('joule_per_normal_cubic_meter_c, J/norm_m³'));
 add(fan.sys.Unit.define('joule_per_second_square_meter_deg_c, J/s_m²_°C'));
 add(fan.sys.Unit.define('joule_per_square_centimeter, J/cm²'));
 add(fan.sys.Unit.define('joule_per_square_tesla, J_T⁻²'));
 add(fan.sys.Unit.define('joule_per_standard_cubic_meter_c, J/std_m³'));
 add(fan.sys.Unit.define('joule_per_tesla, J_T⁻¹'));
 add(fan.sys.Unit.define('joule_second, J_s'));
 add(fan.sys.Unit.define('joule_second_per_mole, J_s_mol⁻¹'));
 add(fan.sys.Unit.define('katal, kat'));
 add(fan.sys.Unit.define('kelvin_meter_squared_per_w, K_m²/W'));
 add(fan.sys.Unit.define('kelvin_per_kilo_pascal, K/kPa'));
 add(fan.sys.Unit.define('kelvin_per_kilogram_per_square_cm, K/kg/cm²'));
 add(fan.sys.Unit.define('kelvin_per_meter, K/m'));
 add(fan.sys.Unit.define('kelvin_per_pascal, K/Pa'));
 add(fan.sys.Unit.define('kelvin_per_tesla, K_T⁻¹'));
 add(fan.sys.Unit.define('kelvin_per_watt, K/W'));
 add(fan.sys.Unit.define('kibi, Ki'));
 add(fan.sys.Unit.define('killowatt_per_cubic_meter_degree_kelvin, kW/m³_K'));
 add(fan.sys.Unit.define('kilo, k'));
 add(fan.sys.Unit.define('kilo_a, kA'));
 add(fan.sys.Unit.define('kilo_ampere, kA'));
 add(fan.sys.Unit.define('kilo_bar, kbar'));
 add(fan.sys.Unit.define('kilo_cal, kcal'));
 add(fan.sys.Unit.define('kilo_calorie_meter_per_square_centimeter, kcal_m/cm²'));
 add(fan.sys.Unit.define('kilo_calorie_per_cubic_meter, kcal/m³'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour, kcal/hr'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour_c, kcal/h_°C'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour_kelvin, kcal/h_K'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour_meter_degree_celsius, kcal/h_m_°C'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour_meter_kelvin, kcal/h_m_K'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour_square_meter, kcal/h_m²'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour_square_meter_c, kcal/h_m²_°C'));
 add(fan.sys.Unit.define('kilo_calorie_per_hour_square_meter_kelvin, kcal/h_m²_K'));
 add(fan.sys.Unit.define('kilo_calorie_per_kilo_mole, kcal/kmol'));
 add(fan.sys.Unit.define('kilo_calorie_per_kilo_mole_deg_celsius, kcal/kmol_°C'));
 add(fan.sys.Unit.define('kilo_calorie_per_kilo_mole_kelvin, kcal/kmol_K'));
 add(fan.sys.Unit.define('kilo_calorie_per_kilogram, kcal/kg'));
 add(fan.sys.Unit.define('kilo_calorie_per_kilogram_degree_celsius, kcal/kg_°C'));
 add(fan.sys.Unit.define('kilo_calorie_per_kilogram_kelvin, kcal/kg_K'));
 add(fan.sys.Unit.define('kilo_calorie_per_normal_cubic_meter_c, kcal/norm_m³'));
 add(fan.sys.Unit.define('kilo_calorie_per_standard_cubic_meter_c, kcal/std_m³'));
 add(fan.sys.Unit.define('kilo_calories_per_cubic_centimeter, kcal/cm³'));
 add(fan.sys.Unit.define('kilo_calories_per_gram, kcal/g'));
 add(fan.sys.Unit.define('kilo_candela, kcd'));
 add(fan.sys.Unit.define('kilo_coulombs, kC'));
 add(fan.sys.Unit.define('kilo_dynes, kdyn'));
 add(fan.sys.Unit.define('kilo_electron_volt, k_eV'));
 add(fan.sys.Unit.define('kilo_electron_volt_per_micrometer, keV/µm'));
 add(fan.sys.Unit.define('kilo_ev, keV'));
 add(fan.sys.Unit.define('kilo_hm, khm'));
 add(fan.sys.Unit.define('kilo_lux, klx'));
 add(fan.sys.Unit.define('kilo_mole, kmol'));
 add(fan.sys.Unit.define('kilo_mole_per_cubic_meter, kmol/m³'));
 add(fan.sys.Unit.define('kilo_mole_per_day, kmol/d'));
 add(fan.sys.Unit.define('kilo_mole_per_hour, kmol/hr'));
 add(fan.sys.Unit.define('kilo_mole_per_hour_square_meter, kmol/h_m²'));
 add(fan.sys.Unit.define('kilo_mole_per_minute, kmol/min'));
 add(fan.sys.Unit.define('kilo_mole_per_minute_square_meter, kmol/min_m²'));
 add(fan.sys.Unit.define('kilo_mole_per_second, kmol/s'));
 add(fan.sys.Unit.define('kilo_mole_per_second_square_meter, kmol/s_m²'));
 add(fan.sys.Unit.define('kilo_newton_meter, kN_m'));
 add(fan.sys.Unit.define('kilo_newton_meter_squared, kN_m²'));
 add(fan.sys.Unit.define('kilo_newtons, kN'));
 add(fan.sys.Unit.define('kilo_newtons_per_meter, kN/m'));
 add(fan.sys.Unit.define('kilo_newtons_per_square_meter, kN/m²a'));
 add(fan.sys.Unit.define('kilo_ohm_meter, kΩ·m'));
 add(fan.sys.Unit.define('kilo_pa_a, KPaA'));
 add(fan.sys.Unit.define('kilo_pascal_absolute, kPaa'));
 add(fan.sys.Unit.define('kilo_pascal_diff, kPadiff'));
 add(fan.sys.Unit.define('kilo_pascal_gauge, kPag'));
 add(fan.sys.Unit.define('kilo_pascal_per_hour, kPa_/h'));
 add(fan.sys.Unit.define('kilo_pascal_per_meter, kPa/m'));
 add(fan.sys.Unit.define('kilo_pascal_per_min, kPa_/min'));
 add(fan.sys.Unit.define('kilo_pascal_seconds_per_meter, KPa_s/m'));
 add(fan.sys.Unit.define('kilo_pond, kp'));
 add(fan.sys.Unit.define('kilo_pound_force, kipf'));
 add(fan.sys.Unit.define('kilo_pound_force_per_foot, kipf/ft'));
 add(fan.sys.Unit.define('kilo_pound_force_per_inch, kipf/in'));
 add(fan.sys.Unit.define('kilo_pound_force_per_square_foot, ksf'));
 add(fan.sys.Unit.define('kilo_pound_force_per_square_inch, ksi'));
 add(fan.sys.Unit.define('kilo_pound_mass_per_foot, kip/ft'));
 add(fan.sys.Unit.define('kilo_pound_mass_per_inch, kip/in'));
 add(fan.sys.Unit.define('kilo_pound_mass_per_square_foot, kip/ft²'));
 add(fan.sys.Unit.define('kilo_pound_mass_per_square_inch, kip/in²'));
 add(fan.sys.Unit.define('kilo_pound_mass_per_square_inch_diff, kip/in²_diff'));
 add(fan.sys.Unit.define('kilo_radian, kiloradian'));
 add(fan.sys.Unit.define('kilo_sec, ks'));
 add(fan.sys.Unit.define('kilo_siemen, ksiemen'));
 add(fan.sys.Unit.define('kilo_standard_cubic_meter_c, Kstd_ft³'));
 add(fan.sys.Unit.define('kilo_v_a, kilo_v_a'));
 add(fan.sys.Unit.define('kilo_w_hr, kW_h'));
 add(fan.sys.Unit.define('kilobits_per_second, kbps'));
 add(fan.sys.Unit.define('kilocalorie, kcal'));
 add(fan.sys.Unit.define('kilocalorie_per_centimeter_second_degree_celsius, kilocalorie_per_centimeter_second_degree_celsius'));
 add(fan.sys.Unit.define('kilocalorie_per_gram, kcal/gm'));
 add(fan.sys.Unit.define('kilocalorie_per_gram_degree_celsius, kilocalorie_per_gram_degree_celsius'));
 add(fan.sys.Unit.define('kilocalorie_per_minute, kcal/min'));
 add(fan.sys.Unit.define('kilocalorie_per_mole, kcal/mol'));
 add(fan.sys.Unit.define('kilocalorie_per_mole_degree_celsius, kilocalorie_per_mole_degree_celsius'));
 add(fan.sys.Unit.define('kilocalorie_per_second, kcal/s'));
 add(fan.sys.Unit.define('kilocalorie_per_square_centimeter, kcal/cm²'));
 add(fan.sys.Unit.define('kilocalorie_per_square_centimeter_minute, kilocalorie_per_square_centimeter_minute'));
 add(fan.sys.Unit.define('kilocalorie_per_square_centimeter_second, kilocalorie_per_square_centimeter_second'));
 add(fan.sys.Unit.define('kilogram_force, kgf'));
 add(fan.sys.Unit.define('kilogram_force_meter, m_kgf'));
 add(fan.sys.Unit.define('kilogram_force_meter_per_square_centimeter, kg_fm/cm²'));
 add(fan.sys.Unit.define('kilogram_force_meter_squared, kg_fm²'));
 add(fan.sys.Unit.define('kilogram_force_per_centimeter, kgf/cm'));
 add(fan.sys.Unit.define('kilogram_force_per_square_centimeter, kgf/cm²'));
 add(fan.sys.Unit.define('kilogram_force_per_square_meter, kgf/m²'));
 add(fan.sys.Unit.define('kilogram_force_per_square_milli_imeter, kgf/mm²'));
 add(fan.sys.Unit.define('kilogram_force_per_square_millimeter, kgf/mm²a'));
 add(fan.sys.Unit.define('kilogram_kelvin, kilogram_kelvin'));
 add(fan.sys.Unit.define('kilogram_m, kg_m'));
 add(fan.sys.Unit.define('kilogram_meter_per_second, kg_m/s'));
 add(fan.sys.Unit.define('kilogram_meter_per_square_centimeter, kg_m/cm²'));
 add(fan.sys.Unit.define('kilogram_meter_squared, kilogram_meter_squared'));
 add(fan.sys.Unit.define('kilogram_millimeter_per_second, kg_mm/s'));
 add(fan.sys.Unit.define('kilogram_per_centimeter, kg/cm'));
 add(fan.sys.Unit.define('kilogram_per_day, kg/d'));
 add(fan.sys.Unit.define('kilogram_per_hour_square_meter, kg/h_m²'));
 add(fan.sys.Unit.define('kilogram_per_joule, kg/J'));
 add(fan.sys.Unit.define('kilogram_per_kilo_mole, kg/kmol'));
 add(fan.sys.Unit.define('kilogram_per_liter, kg/L'));
 add(fan.sys.Unit.define('kilogram_per_meter, kg/m'));
 add(fan.sys.Unit.define('kilogram_per_meter_squared_second, kg/m²_s'));
 add(fan.sys.Unit.define('kilogram_per_meter_to_the_power, kg/m⁴'));
 add(fan.sys.Unit.define('kilogram_per_millimeter, kg/mm'));
 add(fan.sys.Unit.define('kilogram_per_minute_square_meter, kg/min_m²'));
 add(fan.sys.Unit.define('kilogram_per_mole, kg/mol'));
 add(fan.sys.Unit.define('kilogram_per_normal_cubic_meter_c, kg/norm_m³'));
 add(fan.sys.Unit.define('kilogram_per_second_square_meter, kg/s_m²'));
 add(fan.sys.Unit.define('kilogram_per_square_centimeter, kg/cm²'));
 add(fan.sys.Unit.define('kilogram_per_square_centimeter_absolute, kg/cm²a'));
 add(fan.sys.Unit.define('kilogram_per_square_centimeter_diff, kg/cm²diff'));
 add(fan.sys.Unit.define('kilogram_per_square_centimeter_gauge, kg/cm²g'));
 add(fan.sys.Unit.define('kilogram_per_square_centimeter_per_meter, kg/cm²/m'));
 add(fan.sys.Unit.define('kilogram_per_square_millimeter, kg/mm²'));
 add(fan.sys.Unit.define('kilogram_per_standard_cubic_meter_c, kg/std_m³'));
 add(fan.sys.Unit.define('kilogram_second_squared, kilogram_second_squared'));
 add(fan.sys.Unit.define('kilogram_square_meter, kg_m²'));
 add(fan.sys.Unit.define('kilogram_square_millimeter, kg_mm²'));
 add(fan.sys.Unit.define('kilograms_force_meter_per_meter, kilograms_force_meter_per_meter'));
 add(fan.sys.Unit.define('kilograms_force_seconds_per_square_meter, kgf_s/m²'));
 add(fan.sys.Unit.define('kilograms_per_cubic_decimeter, kg/dm³'));
 add(fan.sys.Unit.define('kilograms_per_decimeter_fourth, kg/dm⁴'));
 add(fan.sys.Unit.define('kilograms_per_kilowatthour, kg/kWh'));
 add(fan.sys.Unit.define('kilograms_per_megajoule, kg/MJ'));
 add(fan.sys.Unit.define('kilograms_per_meter_second, kg/m_s'));
 add(fan.sys.Unit.define('kilojoule_meter_per_hour_sq_meter_deg_k, kJ_m/h_m²_K'));
 add(fan.sys.Unit.define('kilojoule_per_cubic_decimeter, kJ/dm³'));
 add(fan.sys.Unit.define('kilojoule_per_cubic_meter, kJ/m³'));
 add(fan.sys.Unit.define('kilojoule_per_hour_c, kJ/h_°C'));
 add(fan.sys.Unit.define('kilojoule_per_hour_kelvin, kJ/h_K'));
 add(fan.sys.Unit.define('kilojoule_per_hour_meter_degree_celsius, kJ/h_m_°C'));
 add(fan.sys.Unit.define('kilojoule_per_hour_square_meter, kJ/h_m²'));
 add(fan.sys.Unit.define('kilojoule_per_hour_square_meter_c, kJ/h_m²_°C'));
 add(fan.sys.Unit.define('kilojoule_per_hour_square_meter_kelvin, kJ/h_m²_K'));
 add(fan.sys.Unit.define('kilojoule_per_kilo_mole, kJ/kmol'));
 add(fan.sys.Unit.define('kilojoule_per_kilo_mole_degree_celsius, kJ/kmol_°C'));
 add(fan.sys.Unit.define('kilojoule_per_kilo_mole_kelvin, kilojoule_per_kilo_mole_kelvin'));
 add(fan.sys.Unit.define('kilojoule_per_kilo_mole_kelvin_gas_constant, kJ/kmol_K'));
 add(fan.sys.Unit.define('kilojoule_per_kilogram_degree_celsius, kJ/kg_°C'));
 add(fan.sys.Unit.define('kilojoule_per_kilogram_kelvin, kJ/kg_K'));
 add(fan.sys.Unit.define('kilojoule_per_normal_cubic_meter_c, kJ/norm_m³'));
 add(fan.sys.Unit.define('kilojoule_per_standard_cubic_meter_c, kJ/std_m³'));
 add(fan.sys.Unit.define('kilometer_per_cubic_decimeter, km/dm³'));
 add(fan.sys.Unit.define('kilometer_per_liter, km/L'));
 add(fan.sys.Unit.define('kilowatt_per_cubic_meter, kW/m³'));
 add(fan.sys.Unit.define('kilowatt_per_square_centimeter, kW/cm²'));
 add(fan.sys.Unit.define('kilowatt_per_square_meter_degree_kelvin, kW/m²_K'));
 add(fan.sys.Unit.define('kilowatthours_per_cubic_meter, kWh/m³'));
 add(fan.sys.Unit.define('kilowatthours_per_decimeter, kWh/dm³'));
 add(fan.sys.Unit.define('kilowatthours_per_kilogram, kWh/kg'));
 add(fan.sys.Unit.define('kilowatthours_per_kilogram_degree_c, kWh/kg_°C'));
 add(fan.sys.Unit.define('kip, kipf'));
 add(fan.sys.Unit.define('kip_per_square_foot_absolute, kipd/ft²a'));
 add(fan.sys.Unit.define('kip_per_square_foot_diff, kipf/ft²diff'));
 add(fan.sys.Unit.define('kip_per_square_foot_gauge, kipf/ft²g'));
 add(fan.sys.Unit.define('kip_per_square_inch, kipf/in²'));
 add(fan.sys.Unit.define('kip_per_square_inch_absolute, kip/in²a'));
 add(fan.sys.Unit.define('kip_per_square_inch_gauge, kipf/in²g'));
 add(fan.sys.Unit.define('kj_per_kw_hr, kJ/kWh'));
 add(fan.sys.Unit.define('knot, knot'));
 add(fan.sys.Unit.define('knot_per_second, kn/s'));
 add(fan.sys.Unit.define('kpascal_cubic_meter_per_kmole_kelvin, kPa_m³/kmol_K'));
 add(fan.sys.Unit.define('l_per_sec, ltr/s'));
 add(fan.sys.Unit.define('laos_kip, â‚_'));
 add(fan.sys.Unit.define('lb, lbm'));
 add(fan.sys.Unit.define('lb_f_per_in, psia'));
 add(fan.sys.Unit.define('lb_t, lbt'));
 add(fan.sys.Unit.define('light_year, ly'));
 add(fan.sys.Unit.define('liquid_cup_us, cup'));
 add(fan.sys.Unit.define('liquid_pint_us, pt_US'));
 add(fan.sys.Unit.define('liter_per_day, ltr/d'));
 add(fan.sys.Unit.define('liter_per_day_c, std_ltr/d'));
 add(fan.sys.Unit.define('liter_per_gram, ltr/g'));
 add(fan.sys.Unit.define('liter_per_hour_c, std_L/h'));
 add(fan.sys.Unit.define('liter_per_kilo_mole, ltr/kmol'));
 add(fan.sys.Unit.define('liter_per_kilogram, ltr/kg'));
 add(fan.sys.Unit.define('liter_per_meter, ltr/m'));
 add(fan.sys.Unit.define('liter_per_minute_c, std_L/min'));
 add(fan.sys.Unit.define('liter_per_minute_per_bar, L/min_bar'));
 add(fan.sys.Unit.define('liter_per_mole, lltr/mol'));
 add(fan.sys.Unit.define('liter_per_tonne, ltr/t'));
 add(fan.sys.Unit.define('liter_per_uk_ton, ltr/uk_ton'));
 add(fan.sys.Unit.define('liters_per_second_c, std_ltr/s'));
 add(fan.sys.Unit.define('liters_per_second_per_second, ltr/s²'));
 add(fan.sys.Unit.define('long_ton, long_ton'));
 add(fan.sys.Unit.define('lumens_per_square_meter, lumens/m²'));
 add(fan.sys.Unit.define('lux_second, lx_s'));
 add(fan.sys.Unit.define('maxwell, Mx'));
 add(fan.sys.Unit.define('mcf, MCF'));
 add(fan.sys.Unit.define('mebi, Mi'));
 add(fan.sys.Unit.define('mechanical_horsepower_ft_lbf_per_s, hhp'));
 add(fan.sys.Unit.define('mega, M'));
 add(fan.sys.Unit.define('mega_ampere, MA'));
 add(fan.sys.Unit.define('mega_bar, Mbar'));
 add(fan.sys.Unit.define('mega_becquerel, MBq'));
 add(fan.sys.Unit.define('mega_calorie, Mcal'));
 add(fan.sys.Unit.define('mega_calorie_per_hour, Mcal/hr'));
 add(fan.sys.Unit.define('mega_electron_volt, MeV'));
 add(fan.sys.Unit.define('mega_electron_volt_femtometer, MeV_fm'));
 add(fan.sys.Unit.define('mega_electron_volt_per_centimeter, MeV/cm'));
 add(fan.sys.Unit.define('mega_electron_volt_per_speed_of_light, MeV/c'));
 add(fan.sys.Unit.define('mega_ev, MeV'));
 add(fan.sys.Unit.define('mega_flops, Mflops'));
 add(fan.sys.Unit.define('mega_gram, Mg'));
 add(fan.sys.Unit.define('mega_grams_per_square_meter, Mg/m²'));
 add(fan.sys.Unit.define('mega_hertz_per_kelvin, MHz_K⁻¹'));
 add(fan.sys.Unit.define('mega_hertz_per_tesla, MHz_T⁻¹'));
 add(fan.sys.Unit.define('mega_meter, megameter'));
 add(fan.sys.Unit.define('mega_newtons, MN'));
 add(fan.sys.Unit.define('mega_pascal_absolute, MPaa'));
 add(fan.sys.Unit.define('mega_pascal_diff, Mpadiff'));
 add(fan.sys.Unit.define('mega_pascal_gauge, MPag'));
 add(fan.sys.Unit.define('mega_pascal_per_hour, MPa_/h'));
 add(fan.sys.Unit.define('mega_pascal_per_meter, MPa/m'));
 add(fan.sys.Unit.define('mega_pascal_seconds_per_meter_mega_rayl, MPa_s/m'));
 add(fan.sys.Unit.define('mega_pounds_per_square_inch, Mpsia'));
 add(fan.sys.Unit.define('mega_radian, megaradian'));
 add(fan.sys.Unit.define('mega_standard_cubic_meter_c, Mstd_ft³'));
 add(fan.sys.Unit.define('mega_toe, megatoe'));
 add(fan.sys.Unit.define('mega_years, Myr'));
 add(fan.sys.Unit.define('mega_yr, Myr'));
 add(fan.sys.Unit.define('megabits_per_second, mbps'));
 add(fan.sys.Unit.define('megajoule_per_cubic_meter, MJ/m³'));
 add(fan.sys.Unit.define('megajoule_per_kilogram, MJ/kg'));
 add(fan.sys.Unit.define('megajoule_per_meter, MJ/m'));
 add(fan.sys.Unit.define('megajoule_per_year, MJ/yr'));
 add(fan.sys.Unit.define('megavolt_ampere, megavolt_ampere'));
 add(fan.sys.Unit.define('megawatt_hours_per_cubic_meter, MWh/m³'));
 add(fan.sys.Unit.define('megawatt_hours_per_kilogram, MW_h/kg'));
 add(fan.sys.Unit.define('meter_cubed, m³_sm'));
 add(fan.sys.Unit.define('meter_cubed_per_meter_squared_per_second, m³/m²_s'));
 add(fan.sys.Unit.define('meter_kelvin, m_K'));
 add(fan.sys.Unit.define('meter_kelvin_per_watt, meter_kelvin_per_watt'));
 add(fan.sys.Unit.define('meter_kilogram, meter_kilogram'));
 add(fan.sys.Unit.define('meter_per_cubic_meter, m/m³'));
 add(fan.sys.Unit.define('meter_per_day, m/day'));
 add(fan.sys.Unit.define('meter_per_farad, m/F'));
 add(fan.sys.Unit.define('meter_per_kelvin, m/K'));
 add(fan.sys.Unit.define('meter_per_kilometer, m/km'));
 add(fan.sys.Unit.define('meter_per_meter, m/m'));
 add(fan.sys.Unit.define('meter_per_meter_kelvin, m/m_K'));
 add(fan.sys.Unit.define('meter_per_milli_second, m/ms'));
 add(fan.sys.Unit.define('meter_squared, m²_PR'));
 add(fan.sys.Unit.define('meter_squared_per_kilogram, m²/kg'));
 add(fan.sys.Unit.define('meter_squared_per_meterole, m²/mol'));
 add(fan.sys.Unit.define('meter_squared_per_pascal_second, m²/Pa_s'));
 add(fan.sys.Unit.define('meter_squared_per_second, m³/m_s'));
 add(fan.sys.Unit.define('meter_to_the_fourth, m⁴'));
 add(fan.sys.Unit.define('metric_ton_force, mtf'));
 add(fan.sys.Unit.define('metric_ton_per_day, mt/d'));
 add(fan.sys.Unit.define('metric_ton_per_second, mt/s'));
 add(fan.sys.Unit.define('metric_ton_per_year, mt/yr'));
 add(fan.sys.Unit.define('metric_tons_per_hour, tph'));
 add(fan.sys.Unit.define('mgallon, Mgal'));
 add(fan.sys.Unit.define('mho, mho'));
 add(fan.sys.Unit.define('mhos, mhos'));
 add(fan.sys.Unit.define('mhos_per_meter, mhos/m'));
 add(fan.sys.Unit.define('micro, Âµ'));
 add(fan.sys.Unit.define('micro_a, µA'));
 add(fan.sys.Unit.define('micro_ampere, µA'));
 add(fan.sys.Unit.define('micro_ampere_per_square_centimeter, µ_A/cm²'));
 add(fan.sys.Unit.define('micro_ampere_per_square_inch, µ_A/in²'));
 add(fan.sys.Unit.define('micro_bars, µbara'));
 add(fan.sys.Unit.define('micro_calories_per_second_square_centimeter, µcal/s_cm²'));
 add(fan.sys.Unit.define('micro_coulomb, µC'));
 add(fan.sys.Unit.define('micro_curie, µcurie'));
 add(fan.sys.Unit.define('micro_farad, microF'));
 add(fan.sys.Unit.define('micro_farads, µF'));
 add(fan.sys.Unit.define('micro_farads_per_meter, µF/m'));
 add(fan.sys.Unit.define('micro_grams, µgm'));
 add(fan.sys.Unit.define('micro_grams_per_cubic_centimeter, µ_g/cm³'));
 add(fan.sys.Unit.define('micro_grams_per_liter, µ_g/L'));
 add(fan.sys.Unit.define('micro_henries_per_meter, µH/m'));
 add(fan.sys.Unit.define('micro_henry, µH'));
 add(fan.sys.Unit.define('micro_hertz, µHz'));
 add(fan.sys.Unit.define('micro_hm_per_foot, µ_ohm_/ft'));
 add(fan.sys.Unit.define('micro_hm_per_meter, µ_ohm_/m'));
 add(fan.sys.Unit.define('micro_inch, in⁻⁶'));
 add(fan.sys.Unit.define('micro_joule, µJ'));
 add(fan.sys.Unit.define('micro_liter, µL'));
 add(fan.sys.Unit.define('micro_meter_per_day, µn/day'));
 add(fan.sys.Unit.define('micro_meter_per_second, µm/s'));
 add(fan.sys.Unit.define('micro_mole, µmol'));
 add(fan.sys.Unit.define('micro_newtons, µN'));
 add(fan.sys.Unit.define('micro_ohm, µohm'));
 add(fan.sys.Unit.define('micro_pascal, µPaa'));
 add(fan.sys.Unit.define('micro_pounds_per_square_inch, µpsia'));
 add(fan.sys.Unit.define('micro_rad, μrad'));
 add(fan.sys.Unit.define('micro_radian, µradian'));
 add(fan.sys.Unit.define('micro_sec, μs'));
 add(fan.sys.Unit.define('micro_seconds_per_foot, µs/ft'));
 add(fan.sys.Unit.define('micro_seconds_per_meter, µs/m'));
 add(fan.sys.Unit.define('micro_siemen, µsiemen'));
 add(fan.sys.Unit.define('micro_teslas, µT'));
 add(fan.sys.Unit.define('micro_torr, Âµtorr'));
 add(fan.sys.Unit.define('micro_torr, μTorr'));
 add(fan.sys.Unit.define('micro_volt, µV'));
 add(fan.sys.Unit.define('micro_volt_per_foot, µV/ft'));
 add(fan.sys.Unit.define('micro_volt_per_meter, µV/m'));
 add(fan.sys.Unit.define('micro_watt, µW'));
 add(fan.sys.Unit.define('micro_watt_per_cubic_meter, µW/m³'));
 add(fan.sys.Unit.define('micro_webers, µWb'));
 add(fan.sys.Unit.define('microgravity, microG'));
 add(fan.sys.Unit.define('microns_of_mercury_at_deg_c, µm_Hga'));
 add(fan.sys.Unit.define('microsiemens_per_centimeter, µS/cm'));
 add(fan.sys.Unit.define('mil_angle, mil_angle'));
 add(fan.sys.Unit.define('mil_length, mil'));
 add(fan.sys.Unit.define('mil_per_day, mil/d'));
 add(fan.sys.Unit.define('mil_per_year, mil/yr'));
 add(fan.sys.Unit.define('mile, mile'));
 add(fan.sys.Unit.define('mile_international, mi'));
 add(fan.sys.Unit.define('mile_per_minute, mi/min'));
 add(fan.sys.Unit.define('mile_usstatute, mi'));
 add(fan.sys.Unit.define('miles_per_uk_gallon, miles/uk_gal'));
 add(fan.sys.Unit.define('miles_per_us_gallon, miles/gal'));
 add(fan.sys.Unit.define('milli_coulomb, milliC'));
 add(fan.sys.Unit.define('milli_coulombs_per_square_meter, milli_C/m²'));
 add(fan.sys.Unit.define('milli_curie, millicurie'));
 add(fan.sys.Unit.define('milli_darcies_per_centipoise, millidarcies/cP'));
 add(fan.sys.Unit.define('milli_darcies_per_pascal_second, millidarcies/Pa_s'));
 add(fan.sys.Unit.define('milli_darcy, millidarcy'));
 add(fan.sys.Unit.define('milli_darcy_foot, millidarcy_ft'));
 add(fan.sys.Unit.define('milli_darcy_meter, millidarcy_m'));
 add(fan.sys.Unit.define('milli_darcy_sq_feet_per_pound_force_second, millidarcy_sq_ft/lb_fs'));
 add(fan.sys.Unit.define('milli_darcy_sq_inches_per_pound_force_second, millidarcy_sq_in/lb_fs'));
 add(fan.sys.Unit.define('milli_degrees_kelvin_per_meter, mK/m'));
 add(fan.sys.Unit.define('milli_equivalent, millieq'));
 add(fan.sys.Unit.define('milli_equivalents_per_cubic_centimeter, millieqs/cm³'));
 add(fan.sys.Unit.define('milli_equivalents_per_gram, millieqs/g'));
 add(fan.sys.Unit.define('milli_equivalents_per_hecto_gram, millieqs/hecto_g'));
 add(fan.sys.Unit.define('milli_galileo, milligalileo'));
 add(fan.sys.Unit.define('milli_gauss, milligauss'));
 add(fan.sys.Unit.define('milli_gray, milli_gy'));
 add(fan.sys.Unit.define('milli_henry, milliH'));
 add(fan.sys.Unit.define('milli_hertz, milliHz'));
 add(fan.sys.Unit.define('milli_joule, milliJ'));
 add(fan.sys.Unit.define('milli_joule_per_square_centimeter, milli_J/cm²'));
 add(fan.sys.Unit.define('milli_joule_per_square_meter, milli_J/m²'));
 add(fan.sys.Unit.define('milli_m_hg, mm_Hg'));
 add(fan.sys.Unit.define('milli_m_hga, mmHgA'));
 add(fan.sys.Unit.define('milli_mhos_per_meter, mmhos/m'));
 add(fan.sys.Unit.define('milli_mole, millimol'));
 add(fan.sys.Unit.define('milli_newton_meter_squared, milliN_m²'));
 add(fan.sys.Unit.define('milli_newtons, milliN'));
 add(fan.sys.Unit.define('milli_newtons_per_kilometer, mN/km'));
 add(fan.sys.Unit.define('milli_newtons_per_meter, mN/m'));
 add(fan.sys.Unit.define('milli_pascal, milliPa'));
 add(fan.sys.Unit.define('milli_pascal_second, mPa_s'));
 add(fan.sys.Unit.define('milli_rad, mrad'));
 add(fan.sys.Unit.define('milli_radian, milliradian'));
 add(fan.sys.Unit.define('milli_rem, milli_rem'));
 add(fan.sys.Unit.define('milli_rems_per_hour, milli_rems_per_hour'));
 add(fan.sys.Unit.define('milli_second_per_foot, millis_/ft'));
 add(fan.sys.Unit.define('milli_second_per_meter, milli_s_/m'));
 add(fan.sys.Unit.define('milli_seconds, millis'));
 add(fan.sys.Unit.define('milli_seconds_per_centimeter, milli_s/cm'));
 add(fan.sys.Unit.define('milli_seconds_per_inch, milli_s/in'));
 add(fan.sys.Unit.define('milli_seconds_per_second, milliss/s'));
 add(fan.sys.Unit.define('milli_siemen, millisiemen'));
 add(fan.sys.Unit.define('milli_siemen_per_meter, mS/m'));
 add(fan.sys.Unit.define('milli_sievert, milliSv'));
 add(fan.sys.Unit.define('milli_sievert_per_hour, milliSv/h'));
 add(fan.sys.Unit.define('milli_teslas, milliT'));
 add(fan.sys.Unit.define('milli_torr, utorr'));
 add(fan.sys.Unit.define('milli_torr, utorr'));
 add(fan.sys.Unit.define('milli_watt, milliW'));
 add(fan.sys.Unit.define('milli_watt_per_square_meter, milliW/m²'));
 add(fan.sys.Unit.define('milli_webers, milliWb'));
 add(fan.sys.Unit.define('milliampere_per_square_centimeter, milli_A/cm²'));
 add(fan.sys.Unit.define('milliampere_per_square_foot, milli_A/ft²'));
 add(fan.sys.Unit.define('millibar, millibara'));
 add(fan.sys.Unit.define('millibar_absolute, mbara'));
 add(fan.sys.Unit.define('millibar_diff, mbardiff'));
 add(fan.sys.Unit.define('millibar_gauge, mbarg'));
 add(fan.sys.Unit.define('milligram_per_cubic_decimeter, mg/dm³'));
 add(fan.sys.Unit.define('milligram_per_joule, milli_g/J'));
 add(fan.sys.Unit.define('milligram_per_kilogram, milli_g/kg'));
 add(fan.sys.Unit.define('milligram_per_liter, mg/L'));
 add(fan.sys.Unit.define('milligram_per_milli_liter, mg/mL'));
 add(fan.sys.Unit.define('milligram_per_us_gallon, mg/gal'));
 add(fan.sys.Unit.define('milligravity, milligrav'));
 add(fan.sys.Unit.define('millimeter_cubed, mm³_sm'));
 add(fan.sys.Unit.define('millimeter_of_mercury_absolute, mmHgA'));
 add(fan.sys.Unit.define('millimeter_of_mercury_absolute_f, mmHga'));
 add(fan.sys.Unit.define('millimeter_of_mercury_fdiff, mmHgdiff'));
 add(fan.sys.Unit.define('millimeter_of_mercury_gauge_f, mmHgg'));
 add(fan.sys.Unit.define('millimeter_per_millimeter_degree_kelvin, mm/mm_K'));
 add(fan.sys.Unit.define('millimeter_per_year, mm/yr'));
 add(fan.sys.Unit.define('millimeter_to_the_fourth, mm⁴'));
 add(fan.sys.Unit.define('million_barrels, million_bbl'));
 add(fan.sys.Unit.define('million_btu_per_hour, MMBtu/hr'));
 add(fan.sys.Unit.define('million_cubic_feet, million_ft³'));
 add(fan.sys.Unit.define('million_cubic_feet_natural_gas, million_cubic_feet_natural_gas'));
 add(fan.sys.Unit.define('million_cubic_foot_per_day, million_ft³/d'));
 add(fan.sys.Unit.define('million_cubic_foot_per_day_f, million_std_ft³/d'));
 add(fan.sys.Unit.define('million_cubic_foot_per_hour, million_ft³/hr'));
 add(fan.sys.Unit.define('million_cubic_foot_per_hour_f, million_std_ft³/hr'));
 add(fan.sys.Unit.define('million_cubic_meter, million_m³'));
 add(fan.sys.Unit.define('million_cubic_meter_per_day, million_m³/d'));
 add(fan.sys.Unit.define('million_dollars_per_flight, M$/Flight'));
 add(fan.sys.Unit.define('million_dollars_per_year, M$/yr'));
 add(fan.sys.Unit.define('million_kilo_calorie_per_hour, MMkcal/hr'));
 add(fan.sys.Unit.define('million_kilojoule_per_hour, MMkJ/hr'));
 add(fan.sys.Unit.define('million_pounds_mass_per_day, mmp/d'));
 add(fan.sys.Unit.define('million_pounds_mass_per_year, mmp/yr'));
 add(fan.sys.Unit.define('million_standard_cubic_feet_at_deg_f, million_std_ft³'));
 add(fan.sys.Unit.define('million_standard_cubic_meter_c, million_std_m³'));
 add(fan.sys.Unit.define('million_std_cubic_meter_deg_cper_day, million_std_m³/d'));
 add(fan.sys.Unit.define('millions_of_electron_volt, million_eV'));
 add(fan.sys.Unit.define('millivolt_per_foot, milliV/ft'));
 add(fan.sys.Unit.define('millivolt_per_meter, milliV/m'));
 add(fan.sys.Unit.define('minute_per_foot, min_/ft'));
 add(fan.sys.Unit.define('minute_per_meter, min_/m'));
 add(fan.sys.Unit.define('minute_sidereal, sid_min'));
 add(fan.sys.Unit.define('mmhg_liter_per_mole_kelvin, mmHg_l/mol_K'));
 add(fan.sys.Unit.define('mole, mol'));
 add(fan.sys.Unit.define('mole_degree_celsius, mole_degree_celsius'));
 add(fan.sys.Unit.define('mole_fraction, mol_fr'));
 add(fan.sys.Unit.define('mole_kelvin, mole_kelvin'));
 add(fan.sys.Unit.define('mole_per_cubic_meter, mol/m³'));
 add(fan.sys.Unit.define('mole_per_day, mol/d'));
 add(fan.sys.Unit.define('mole_per_hour, mol/hr'));
 add(fan.sys.Unit.define('mole_per_hour_square_centimeter, mol/h_cm²'));
 add(fan.sys.Unit.define('mole_per_hour_square_meter, mol/hr_m²'));
 add(fan.sys.Unit.define('mole_per_kilogram, mol/kg'));
 add(fan.sys.Unit.define('mole_per_meter_squared_second, mol/m²_s'));
 add(fan.sys.Unit.define('mole_per_minute, mol/min'));
 add(fan.sys.Unit.define('mole_per_minute_square_centimeter, mol/min_cm²'));
 add(fan.sys.Unit.define('mole_per_minute_square_meter, mol/min_m²'));
 add(fan.sys.Unit.define('mole_per_mole, mol/mol'));
 add(fan.sys.Unit.define('mole_per_second, mol/s'));
 add(fan.sys.Unit.define('mole_per_second_square_centimeter, mol/s_cm²'));
 add(fan.sys.Unit.define('mole_per_second_square_meter, mol/s_m²'));
 add(fan.sys.Unit.define('mole_percent, mole_%'));
 add(fan.sys.Unit.define('moles_pounds_mass_per_hour_square_foot, lbmol/h_ft²'));
 add(fan.sys.Unit.define('moles_pounds_mass_per_second_square_foot, lbmol/s_ft²'));
 add(fan.sys.Unit.define('month, month'));
 add(fan.sys.Unit.define('n_m, N_m'));
 add(fan.sys.Unit.define('nano, n'));
 add(fan.sys.Unit.define('nano_a, nA'));
 add(fan.sys.Unit.define('nano_ampere, nA'));
 add(fan.sys.Unit.define('nano_coulomb, nC'));
 add(fan.sys.Unit.define('nano_curie, ncurie'));
 add(fan.sys.Unit.define('nano_farad, nF'));
 add(fan.sys.Unit.define('nano_henry, nH'));
 add(fan.sys.Unit.define('nano_joule, nJ'));
 add(fan.sys.Unit.define('nano_meter, nm'));
 add(fan.sys.Unit.define('nano_meter_per_second, nm/s'));
 add(fan.sys.Unit.define('nano_ohm, nohm'));
 add(fan.sys.Unit.define('nano_seconds_per_foot, ns/ft'));
 add(fan.sys.Unit.define('nano_seconds_per_meter, ns/m'));
 add(fan.sys.Unit.define('nano_teslas, nT'));
 add(fan.sys.Unit.define('nano_watt, nW'));
 add(fan.sys.Unit.define('nat, nat'));
 add(fan.sys.Unit.define('nautical_mile, nautical_mile'));
 add(fan.sys.Unit.define('nautical_mile_per_hour, nmi/hr'));
 add(fan.sys.Unit.define('nautical_mile_per_minute, nmi/min'));
 add(fan.sys.Unit.define('nephelometric_turbidity_unit, NTU'));
 add(fan.sys.Unit.define('new_turkish_lira, ₺'));
 add(fan.sys.Unit.define('newton_meter, N_m'));
 add(fan.sys.Unit.define('newton_meter_per_meter, newton_meter_per_meter'));
 add(fan.sys.Unit.define('newton_meter_squared, N_m²'));
 add(fan.sys.Unit.define('newton_meter_squared_per_meter_squared, N_m²/m²'));
 add(fan.sys.Unit.define('newton_per_coulomb, N/C'));
 add(fan.sys.Unit.define('newton_per_cubic_meter, N/m³'));
 add(fan.sys.Unit.define('newton_per_kilogram, N/kg'));
 add(fan.sys.Unit.define('newton_seconds_per_meter_squared, N_s/m²'));
 add(fan.sys.Unit.define('newtons_per_square_meter, N/m²a'));
 add(fan.sys.Unit.define('newtons_per_square_millimeter, N/mm²a'));
 add(fan.sys.Unit.define('no_dimension, nodim'));
 add(fan.sys.Unit.define('normal_cubic_meter_c, norm_m³'));
 add(fan.sys.Unit.define('normal_cubic_meter_per_cubic_meter, norm_m³/m³'));
 add(fan.sys.Unit.define('normal_cubic_meter_per_day, norm_m³/d'));
 add(fan.sys.Unit.define('normal_cubic_meter_per_hour, norm_m³/hr'));
 add(fan.sys.Unit.define('normal_cubic_meter_per_minute, norm_m³/min'));
 add(fan.sys.Unit.define('normal_cubic_meter_per_second, norm_m³/s'));
 add(fan.sys.Unit.define('oersted, oersted'));
 add(fan.sys.Unit.define('oersted_centimeter, oersted_centimeter'));
 add(fan.sys.Unit.define('ohm_centimeter, ohm__cm'));
 add(fan.sys.Unit.define('ohm_meter, ohm_m'));
 add(fan.sys.Unit.define('ohm_per_meter, ohm/m'));
 add(fan.sys.Unit.define('ounce_force, ounce_f'));
 add(fan.sys.Unit.define('ounce_force_inch, ounce_force_inch'));
 add(fan.sys.Unit.define('ounce_imperial, I_oz'));
 add(fan.sys.Unit.define('ounce_mass, ozm'));
 add(fan.sys.Unit.define('ounce_per_cubic_inch, oz/in³'));
 add(fan.sys.Unit.define('ounce_per_gallon, oz/gal'));
 add(fan.sys.Unit.define('ounce_per_square_foot, oz/ft²'));
 add(fan.sys.Unit.define('ounce_per_square_yard, oz/yd²'));
 add(fan.sys.Unit.define('ounce_troy, t_oz'));
 add(fan.sys.Unit.define('oz, ozm'));
 add(fan.sys.Unit.define('parsec, pc'));
 add(fan.sys.Unit.define('part_per_billion_mole, ppb_mol'));
 add(fan.sys.Unit.define('part_per_billion_volume, ppb_vol'));
 add(fan.sys.Unit.define('part_per_billion_weight, ppb_wt'));
 add(fan.sys.Unit.define('part_per_million_mole, ppm_mol'));
 add(fan.sys.Unit.define('part_per_million_per_degree_celsius, ppm/°C'));
 add(fan.sys.Unit.define('part_per_million_per_degree_fahrenheit, ppm/°F'));
 add(fan.sys.Unit.define('part_per_million_volume, ppm_vol'));
 add(fan.sys.Unit.define('part_per_million_weight, ppm_wt'));
 add(fan.sys.Unit.define('parts_per_ten_thousand_mole, pptt_mol'));
 add(fan.sys.Unit.define('parts_per_ten_thousand_volume, pptt_vol'));
 add(fan.sys.Unit.define('parts_per_ten_thousand_weight, pptt_wt'));
 add(fan.sys.Unit.define('parts_per_thousand_mole, ppt_mol'));
 add(fan.sys.Unit.define('parts_per_thousand_volume, ppt_vol'));
 add(fan.sys.Unit.define('parts_per_thousand_weight, ppt_wt'));
 add(fan.sys.Unit.define('pascal_absolute, Paa'));
 add(fan.sys.Unit.define('pascal_cubic_meter_per_mole_kelvin, Pa_m³/mol_K'));
 add(fan.sys.Unit.define('pascal_diff, Padiff'));
 add(fan.sys.Unit.define('pascal_gauge, Pag'));
 add(fan.sys.Unit.define('pascal_per_cubic_meter, Pa/m³'));
 add(fan.sys.Unit.define('pascal_per_hour, Pa_/h'));
 add(fan.sys.Unit.define('pascal_per_meter, Pa/m'));
 add(fan.sys.Unit.define('pascal_per_second, Pa/s'));
 add(fan.sys.Unit.define('pascal_second, Pa_s'));
 add(fan.sys.Unit.define('pascal_sper_cubic_meter, Pa_s/m³'));
 add(fan.sys.Unit.define('pebi, Pi'));
 add(fan.sys.Unit.define('peck, pk'));
 add(fan.sys.Unit.define('penny_weight, dwt'));
 add(fan.sys.Unit.define('per_bar, per_bar'));
 add(fan.sys.Unit.define('per_cubic_meter, m⁻³'));
 add(fan.sys.Unit.define('per_day, per_day'));
 add(fan.sys.Unit.define('per_degree_celsius, per_°C'));
 add(fan.sys.Unit.define('per_degree_fahrenheit, per_°F'));
 add(fan.sys.Unit.define('per_degree_rankine, per_°R'));
 add(fan.sys.Unit.define('per_hour, per_hour'));
 add(fan.sys.Unit.define('per_kelvin, per_K'));
 add(fan.sys.Unit.define('per_kilo_pascal, per_kPa'));
 add(fan.sys.Unit.define('per_meter, m⁻¹'));
 add(fan.sys.Unit.define('per_meter_kelvin, m⁻¹_K⁻¹'));
 add(fan.sys.Unit.define('per_micro_pounds_per_square_inch, per_µpsi'));
 add(fan.sys.Unit.define('per_mille, per_mille'));
 add(fan.sys.Unit.define('per_min, per_min'));
 add(fan.sys.Unit.define('per_mole, mol⁻¹'));
 add(fan.sys.Unit.define('per_pascal, per_Pa'));
 add(fan.sys.Unit.define('per_pico_pascal, per_pico_Pa'));
 add(fan.sys.Unit.define('per_pounds_per_square_inch, per_psi'));
 add(fan.sys.Unit.define('per_second, per_second'));
 add(fan.sys.Unit.define('per_square_giga_electron_volt, GeV⁻²'));
 add(fan.sys.Unit.define('per_tesla_meter, m⁻¹_T⁻¹'));
 add(fan.sys.Unit.define('per_tesla_second, s⁻¹_T⁻¹'));
 add(fan.sys.Unit.define('person, person'));
 add(fan.sys.Unit.define('peta, P'));
 add(fan.sys.Unit.define('phot, ph'));
 add(fan.sys.Unit.define('phot, ph'));
 add(fan.sys.Unit.define('pica, Pm'));
 add(fan.sys.Unit.define('pico, p'));
 add(fan.sys.Unit.define('pico_a, pA'));
 add(fan.sys.Unit.define('pico_ampere, picoA'));
 add(fan.sys.Unit.define('pico_coulomb, picoC'));
 add(fan.sys.Unit.define('pico_curie, picocurie'));
 add(fan.sys.Unit.define('pico_curie_per_gram, picocurie_/g'));
 add(fan.sys.Unit.define('pico_farad, picoF'));
 add(fan.sys.Unit.define('pico_meter, picometer'));
 add(fan.sys.Unit.define('pico_pascal, picoPaa'));
 add(fan.sys.Unit.define('pico_second, picos'));
 add(fan.sys.Unit.define('pico_siemen, picosiemen'));
 add(fan.sys.Unit.define('pint_imperial, pi'));
 add(fan.sys.Unit.define('planck_charge, Q_p'));
 add(fan.sys.Unit.define('planck_energy, Eᵨ'));
 add(fan.sys.Unit.define('planck_length, l_P'));
 add(fan.sys.Unit.define('planck_mass, m_P'));
 add(fan.sys.Unit.define('planck_temperature, Î˜_P'));
 add(fan.sys.Unit.define('planck_time, t_P'));
 add(fan.sys.Unit.define('poise, P'));
 add(fan.sys.Unit.define('port, Port'));
 add(fan.sys.Unit.define('pound_degree_fahrenheit, pound_degree_fahrenheit'));
 add(fan.sys.Unit.define('pound_degree_rankine, pound_degree_rankine'));
 add(fan.sys.Unit.define('pound_force_foot, pound_force_foot'));
 add(fan.sys.Unit.define('pound_force_inch, pound_force_inch'));
 add(fan.sys.Unit.define('pound_force_per_foot, lbf/ft'));
 add(fan.sys.Unit.define('pound_force_per_pound, lbf/lb'));
 add(fan.sys.Unit.define('pound_force_per_square_foot, psf'));
 add(fan.sys.Unit.define('pound_force_per_square_inch_second, pound_force_per_square_inch_second'));
 add(fan.sys.Unit.define('pound_force_second_per_square_foot, lbf_s/ft²'));
 add(fan.sys.Unit.define('pound_force_second_per_square_inch, pound_force_second_per_square_inch'));
 add(fan.sys.Unit.define('pound_mass_foot_per_second, lbm_ft/s'));
 add(fan.sys.Unit.define('pound_mass_inch_per_second, lbm_in/s'));
 add(fan.sys.Unit.define('pound_mass_per_foot, lbm/ft'));
 add(fan.sys.Unit.define('pound_mass_per_inch, lb/in'));
 add(fan.sys.Unit.define('pound_mass_per_second_foot, lbm/s_ft'));
 add(fan.sys.Unit.define('pound_mass_per_square_foot, lbm/ft²'));
 add(fan.sys.Unit.define('pound_mass_per_square_inch, lbm/in²'));
 add(fan.sys.Unit.define('pound_mass_square_foot, lbm_ft²'));
 add(fan.sys.Unit.define('pound_mass_square_inch, lbm_in²'));
 add(fan.sys.Unit.define('pound_mole, lbmol'));
 add(fan.sys.Unit.define('pound_mole_degree_fahrenheit, pound_mole_degree_fahrenheit'));
 add(fan.sys.Unit.define('pound_mole_per_barrel, lbmol/bbl'));
 add(fan.sys.Unit.define('pound_mole_per_cubic_foot, lbmol/ft³'));
 add(fan.sys.Unit.define('pound_mole_per_day, lbmol/d'));
 add(fan.sys.Unit.define('pound_mole_per_gallon, lbmol/gal'));
 add(fan.sys.Unit.define('pound_mole_per_hour, lbmol/hr'));
 add(fan.sys.Unit.define('pound_mole_per_hour_square_foot, lbmol/h_ft²'));
 add(fan.sys.Unit.define('pound_mole_per_hour_square_inch, lbmol/h_in²'));
 add(fan.sys.Unit.define('pound_mole_per_min, lbmol/min'));
 add(fan.sys.Unit.define('pound_mole_per_minute_square_foot, lbmol/min_ft²'));
 add(fan.sys.Unit.define('pound_mole_per_minute_square_inch, lbmol/min_in²'));
 add(fan.sys.Unit.define('pound_mole_per_second, lbmol/s'));
 add(fan.sys.Unit.define('pound_mole_per_second_square_foot, lbmol/s_ft²'));
 add(fan.sys.Unit.define('pound_mole_per_second_square_inch, lbmol/s_in²'));
 add(fan.sys.Unit.define('pound_mole_per_uk_gallon, lbmol/uk_gal'));
 add(fan.sys.Unit.define('pound_per_barrel, lb/bbl'));
 add(fan.sys.Unit.define('pound_per_cubic_foot, lb/ft³'));
 add(fan.sys.Unit.define('pound_per_cubic_inch, lb/in³'));
 add(fan.sys.Unit.define('pound_per_cubic_meter, lbm/m³'));
 add(fan.sys.Unit.define('pound_per_cubic_yard, lb/yd³'));
 add(fan.sys.Unit.define('pound_per_day, lb/d'));
 add(fan.sys.Unit.define('pound_per_foot, lb/ft'));
 add(fan.sys.Unit.define('pound_per_foot_hour, pound_per_foot_hour'));
 add(fan.sys.Unit.define('pound_per_foot_second, pound_per_foot_second'));
 add(fan.sys.Unit.define('pound_per_gallon, lb/gal'));
 add(fan.sys.Unit.define('pound_per_hour_square_foot, lb/h_ft²'));
 add(fan.sys.Unit.define('pound_per_hour_square_inch, lb/h_in²'));
 add(fan.sys.Unit.define('pound_per_inch, lb/in'));
 add(fan.sys.Unit.define('pound_per_minute_square_foot, lb/min_ft²'));
 add(fan.sys.Unit.define('pound_per_minute_square_inch, lb/min_in²'));
 add(fan.sys.Unit.define('pound_per_pound_mole, lb/lbmol'));
 add(fan.sys.Unit.define('pound_per_second_square_foot, lb/s_ft²'));
 add(fan.sys.Unit.define('pound_per_second_square_inch, lb/s_in²'));
 add(fan.sys.Unit.define('pound_per_square_foot, lb/ft²'));
 add(fan.sys.Unit.define('pound_per_square_foot_absolute, psfa'));
 add(fan.sys.Unit.define('pound_per_square_foot_diff, psfdiff'));
 add(fan.sys.Unit.define('pound_per_square_foot_gauge, psfg'));
 add(fan.sys.Unit.define('pound_per_square_inch_absolute, psia'));
 add(fan.sys.Unit.define('pound_per_square_inch_diff, psidiff'));
 add(fan.sys.Unit.define('pound_per_square_inch_gauge, psig'));
 add(fan.sys.Unit.define('pound_per_square_inch_per_hour, psi/h'));
 add(fan.sys.Unit.define('pound_per_square_inch_per_meter, psi/m'));
 add(fan.sys.Unit.define('pound_per_square_inch_per_minute, psi_/min'));
 add(fan.sys.Unit.define('pound_per_square_inch_second, psi_s'));
 add(fan.sys.Unit.define('pound_per_standard_cubic_foot_f, lb/std_ft³'));
 add(fan.sys.Unit.define('pound_per_year, lb/yr'));
 add(fan.sys.Unit.define('pound_sterling, £'));
 add(fan.sys.Unit.define('pound_sterling_per_cubic_foot, £/ft³'));
 add(fan.sys.Unit.define('pound_sterling_per_cubic_meter, £/m³'));
 add(fan.sys.Unit.define('pound_sterling_per_hour, £/hr'));
 add(fan.sys.Unit.define('pound_sterling_per_kilowatthour, £/kWh'));
 add(fan.sys.Unit.define('pound_troy, lbt'));
 add(fan.sys.Unit.define('poundal, pdl'));
 add(fan.sys.Unit.define('poundal_centimeter_squared, pdl_cm²'));
 add(fan.sys.Unit.define('poundal_per_centimeter, pdl/in'));
 add(fan.sys.Unit.define('poundal_per_square_foot, pdl/ft²'));
 add(fan.sys.Unit.define('pounds_force_feet_per_inch, pounds_force_feet_per_inch'));
 add(fan.sys.Unit.define('pounds_force_inches_per_inch, pounds_force_inches_per_inch'));
 add(fan.sys.Unit.define('pounds_force_inches_squared, lb_fin²'));
 add(fan.sys.Unit.define('pounds_force_per_cubic_foot, lb_f/ft³'));
 add(fan.sys.Unit.define('pounds_force_per_hundred_foot, lbf/hft'));
 add(fan.sys.Unit.define('pounds_force_per_us_gallon, lb_f/gal'));
 add(fan.sys.Unit.define('pounds_force_seconds_per_square_inch, lbf_s/in²'));
 add(fan.sys.Unit.define('pounds_mass_per_foot_hour, lb/ft_h'));
 add(fan.sys.Unit.define('pounds_mass_per_foot_second, lb/ft_s'));
 add(fan.sys.Unit.define('pounds_mass_per_horsepower_hour, lb/hp_h'));
 add(fan.sys.Unit.define('pounds_mass_per_hour_foot, lb/h_ft'));
 add(fan.sys.Unit.define('pounds_mass_per_hour_square_foot, lb/h_ft²'));
 add(fan.sys.Unit.define('pounds_mass_per_second_foot, lb/s_ft'));
 add(fan.sys.Unit.define('pounds_mass_per_second_square_foot, lb/s_ft²'));
 add(fan.sys.Unit.define('pounds_mass_per_uk_gallon_foot, lb/uk_gal_ft'));
 add(fan.sys.Unit.define('pounds_mass_per_us_gallon_foot, lb/gal_ft'));
 add(fan.sys.Unit.define('pounds_mass_square_feet_per_second_squared, lbf_ft²/s²'));
 add(fan.sys.Unit.define('pounds_per_square_inch_days_per_barrel, psi_d/bbl'));
 add(fan.sys.Unit.define('pounds_per_uk_gallon, lb/uk_gal'));
 add(fan.sys.Unit.define('psi, psia'));
 add(fan.sys.Unit.define('psi_cubic_foot_per_pound_mole_r, psi_ft³/lbmol_°R'));
 add(fan.sys.Unit.define('psi_per_foot, psi/ft'));
 add(fan.sys.Unit.define('quad, quad'));
 add(fan.sys.Unit.define('quad, quad'));
 add(fan.sys.Unit.define('quads, quads'));
 add(fan.sys.Unit.define('quads_per_year, quads/yr'));
 add(fan.sys.Unit.define('quartic_coulomb_meter_per_cubic_energy, C⁴_m⁴_J⁻³'));
 add(fan.sys.Unit.define('radian_per_cubic_foot, rad/ft³'));
 add(fan.sys.Unit.define('radian_per_cubic_meter, rad/m³'));
 add(fan.sys.Unit.define('radian_per_foot, rad/ft'));
 add(fan.sys.Unit.define('radian_per_hour, rad/h'));
 add(fan.sys.Unit.define('radian_per_meter, rad/m'));
 add(fan.sys.Unit.define('radian_per_minute, rad/min'));
 add(fan.sys.Unit.define('refrigeration_ton_btu_per_h, refrig_ton'));
 add(fan.sys.Unit.define('register_ton, RT'));
 add(fan.sys.Unit.define('relative_molar_wt, relative_molar_wt'));
 add(fan.sys.Unit.define('relative_permeability, Î_r'));
 add(fan.sys.Unit.define('relative_permittivity, Îµr'));
 add(fan.sys.Unit.define('rem, rem'));
 add(fan.sys.Unit.define('rems_per_hour, rems/h'));
 add(fan.sys.Unit.define('rev, rev'));
 add(fan.sys.Unit.define('revolution, rev'));
 add(fan.sys.Unit.define('revolution_per_hour, rev/h'));
 add(fan.sys.Unit.define('revolution_per_second, rev/s'));
 add(fan.sys.Unit.define('revolutions_per_hour, rph'));
 add(fan.sys.Unit.define('revolutions_per_minute_per_second, rpm/s'));
 add(fan.sys.Unit.define('revolutions_per_second, rps'));
 add(fan.sys.Unit.define('rod, rd'));
 add(fan.sys.Unit.define('roentgen, R'));
 add(fan.sys.Unit.define('romanian_leu_per_cubic_meter, RON/m³'));
 add(fan.sys.Unit.define('romanian_leu_per_hour, RON/hr'));
 add(fan.sys.Unit.define('romanian_leu_per_kilowatthour, RON/kWh'));
 add(fan.sys.Unit.define('sacks, sacks'));
 add(fan.sys.Unit.define('sec, s'));
 add(fan.sys.Unit.define('second_per_cubic_foot, s_/ft³'));
 add(fan.sys.Unit.define('second_per_cubic_meter, s/m³'));
 add(fan.sys.Unit.define('second_per_liter, s_/L'));
 add(fan.sys.Unit.define('second_per_uk_quart, s_/uk_quart'));
 add(fan.sys.Unit.define('second_per_us_quart, s_/us_quart'));
 add(fan.sys.Unit.define('second_square_foot, second_square_foot'));
 add(fan.sys.Unit.define('second_time_squared, s²'));
 add(fan.sys.Unit.define('seconds_per_centimeter, s_/cm'));
 add(fan.sys.Unit.define('seconds_per_foot, s/ft'));
 add(fan.sys.Unit.define('seconds_per_inch, s/in'));
 add(fan.sys.Unit.define('seconds_per_meter, s/m'));
 add(fan.sys.Unit.define('seconds_redwood, sredwood'));
 add(fan.sys.Unit.define('sga, sga'));
 add(fan.sys.Unit.define('sh, Sh'));
 add(fan.sys.Unit.define('shake, Sh'));
 add(fan.sys.Unit.define('siemens, siemen'));
 add(fan.sys.Unit.define('sievert, Sv'));
 add(fan.sys.Unit.define('sievert_per_hour, Sv/h'));
 add(fan.sys.Unit.define('sievert_per_second, Sv/s'));
 add(fan.sys.Unit.define('singapore_dollar, S$'));
 add(fan.sys.Unit.define('singapore_dollar_per_cubic_meter, S$/m³'));
 add(fan.sys.Unit.define('singapore_dollar_per_hour, S$/hr'));
 add(fan.sys.Unit.define('singapore_dollar_per_kilowatthour, S$/kWh'));
 add(fan.sys.Unit.define('slug, slug'));
 add(fan.sys.Unit.define('slug, slug'));
 add(fan.sys.Unit.define('slug_per_cubic_foot, slug/ft³'));
 add(fan.sys.Unit.define('slug_per_foot, slug/ft'));
 add(fan.sys.Unit.define('slug_per_foot_second, slug_per_foot_second'));
 add(fan.sys.Unit.define('slug_per_second, slug/s'));
 add(fan.sys.Unit.define('slug_per_square_foot, slug/ft²'));
 add(fan.sys.Unit.define('specific_gravity_rel_density_per_f, sp_gr'));
 add(fan.sys.Unit.define('square_centimeter_minute, square_centimeter_minute'));
 add(fan.sys.Unit.define('square_centimeter_per_second, cm²/s'));
 add(fan.sys.Unit.define('square_centimeter_second, square_centimeter_second'));
 add(fan.sys.Unit.define('square_coulomb_meter_per_joule, C²_m²_J⁻¹'));
 add(fan.sys.Unit.define('square_degree, deg²'));
 add(fan.sys.Unit.define('square_feet_per_cubic_feet, ft²/ft³'));
 add(fan.sys.Unit.define('square_feet_per_cubic_inch, ft²/in³'));
 add(fan.sys.Unit.define('square_foot_degree_fahrenheit, square_foot_degree_fahrenheit'));
 add(fan.sys.Unit.define('square_foot_fhour_per_btu, ft²_F_h/Btu'));
 add(fan.sys.Unit.define('square_foot_hour_degree_fahrenheit, square_foot_hour_degree_fahrenheit'));
 add(fan.sys.Unit.define('square_foot_hour_degree_fahrenheit_per_btu, square_foot_hour_degree_fahrenheit_per_btu'));
 add(fan.sys.Unit.define('square_foot_per_btu_inch, square_foot_per_btu_inch'));
 add(fan.sys.Unit.define('square_foot_per_hour, ft²/hr'));
 add(fan.sys.Unit.define('square_foot_per_second, ft²/s'));
 add(fan.sys.Unit.define('square_foot_rhour_per_btu, ft²_°R_h/Btu'));
 add(fan.sys.Unit.define('square_foot_second_degree_fahrenheit, square_foot_second_degree_fahrenheit'));
 add(fan.sys.Unit.define('square_inches_per_second, in²/s'));
 add(fan.sys.Unit.define('square_meter_chour_per_kilo_calorie, m²_°C_h/kcal'));
 add(fan.sys.Unit.define('square_meter_chour_per_kilo_joule, m²_C_h/kJ'));
 add(fan.sys.Unit.define('square_meter_cper_kilowatt, m²_°C/kW'));
 add(fan.sys.Unit.define('square_meter_cper_watt, m²_°C/W'));
 add(fan.sys.Unit.define('square_meter_kelvin, square_meter_kelvin'));
 add(fan.sys.Unit.define('square_meter_kelvin_hour_per_kilo_calorie, m²_K_h/kcal'));
 add(fan.sys.Unit.define('square_meter_kelvin_per_kilowatt, m²_K/kW'));
 add(fan.sys.Unit.define('square_meter_kelvin_per_watt, m²_K/W'));
 add(fan.sys.Unit.define('square_meter_per_cubic_centimeter, m²/cm³'));
 add(fan.sys.Unit.define('square_meter_per_cubic_meter, m²/m³'));
 add(fan.sys.Unit.define('square_meter_per_day_kilo_pascal, m²/d_kPa'));
 add(fan.sys.Unit.define('square_meter_per_gram, m²/g'));
 add(fan.sys.Unit.define('square_meter_per_hour, m²/hr'));
 add(fan.sys.Unit.define('square_meter_per_kelvin, m²/K'));
 add(fan.sys.Unit.define('square_meter_per_second, m²/s'));
 add(fan.sys.Unit.define('square_meter_steradian, square_meter_steradian'));
 add(fan.sys.Unit.define('square_micron_meter, µm²_m'));
 add(fan.sys.Unit.define('square_microns, µm²'));
 add(fan.sys.Unit.define('square_millimeter_per_second, mm²/s'));
 add(fan.sys.Unit.define('ssu, ssu'));
 add(fan.sys.Unit.define('standard_cubic_foot_f, std_ft³'));
 add(fan.sys.Unit.define('standard_cubic_foot_per_barrel, std_ft³/bbl'));
 add(fan.sys.Unit.define('standard_cubic_foot_per_hour, std_ft³/hr'));
 add(fan.sys.Unit.define('standard_cubic_meter_per_cubic_meter, std_m³/m³'));
 add(fan.sys.Unit.define('standard_cubic_meter_per_meter_squared, stdm³/m²'));
 add(fan.sys.Unit.define('statampere, statA'));
 add(fan.sys.Unit.define('statcoulomb, statC'));
 add(fan.sys.Unit.define('statcoulomb_per_mole, statC/mol'));
 add(fan.sys.Unit.define('statcoulomb_per_square_centimeter, statC/cm²'));
 add(fan.sys.Unit.define('statfarad, statF'));
 add(fan.sys.Unit.define('stathenry, statH'));
 add(fan.sys.Unit.define('stathenry_per_centimeter, statH/cm'));
 add(fan.sys.Unit.define('statmho, statS'));
 add(fan.sys.Unit.define('statohm, statOhm'));
 add(fan.sys.Unit.define('statvolt, statV'));
 add(fan.sys.Unit.define('statvolt_centimeter, statV_cm'));
 add(fan.sys.Unit.define('statvolt_per_centimeter, statV/cm'));
 add(fan.sys.Unit.define('stere, st'));
 add(fan.sys.Unit.define('stilb, sb'));
 add(fan.sys.Unit.define('stilb, sb'));
 add(fan.sys.Unit.define('stokes, St'));
 add(fan.sys.Unit.define('tablespoon, tbsp'));
 add(fan.sys.Unit.define('talbot, tb'));
 add(fan.sys.Unit.define('teaspoon, tsp'));
 add(fan.sys.Unit.define('tebi, Ti'));
 add(fan.sys.Unit.define('technical_atmosphere_absolute, atea'));
 add(fan.sys.Unit.define('technical_atmosphere_diff, atediff'));
 add(fan.sys.Unit.define('technical_atmosphere_gauge, ateg'));
 add(fan.sys.Unit.define('ten_milli_second, ten_millis'));
 add(fan.sys.Unit.define('tera_electron_volt, tera_eV'));
 add(fan.sys.Unit.define('terabecquerel, teraBq'));
 add(fan.sys.Unit.define('terajoule, teraJ'));
 add(fan.sys.Unit.define('terajoule_per_year, teraJ/yr'));
 add(fan.sys.Unit.define('teraohm, teraohm'));
 add(fan.sys.Unit.define('terawatt, teraW'));
 add(fan.sys.Unit.define('terrawatt_hours, terraW_h'));
 add(fan.sys.Unit.define('tesla_meter, m_T'));
 add(fan.sys.Unit.define('tesla_second, s_T'));
 add(fan.sys.Unit.define('tex, tex'));
 add(fan.sys.Unit.define('therm, therm'));
 add(fan.sys.Unit.define('therm_eec, therm_EC'));
 add(fan.sys.Unit.define('therm_us, therm_US'));
 add(fan.sys.Unit.define('therms, therms'));
 add(fan.sys.Unit.define('therms_per_cubic_foot, therms/ft³'));
 add(fan.sys.Unit.define('therms_per_pound_mass, therms/lb'));
 add(fan.sys.Unit.define('therms_per_uk_gallon, therms/uk_gal'));
 add(fan.sys.Unit.define('thm_us, thm'));
 add(fan.sys.Unit.define('thousand_btus_per_hour, Mbtu/hr'));
 add(fan.sys.Unit.define('thousand_cubic_feet, thousand_ft³'));
 add(fan.sys.Unit.define('thousand_cubic_feet_at_deg_f, Kstd_m³'));
 add(fan.sys.Unit.define('thousand_cubic_feet_natural_gas, thousand_cubic_feet_natural_gas'));
 add(fan.sys.Unit.define('thousand_cubic_feet_per_day_per_foot, thousand_ft³_/d_/ft'));
 add(fan.sys.Unit.define('thousand_cubic_meter_per_day_per_meter, thousand_m³_/d_/m'));
 add(fan.sys.Unit.define('thousand_cubic_meter_per_hour_per_meter, thousand_m³_/h_/m'));
 add(fan.sys.Unit.define('thousand_foot_pounds_force, kft_kipf'));
 add(fan.sys.Unit.define('thousand_kilograms_per_inch, Mkg/in'));
 add(fan.sys.Unit.define('thousand_normal_cubic_meter_per_day, knorm_m³/d'));
 add(fan.sys.Unit.define('thousand_normal_cubic_meter_per_hour, knorm_m³/hr'));
 add(fan.sys.Unit.define('thousand_normal_cubic_meter_per_minute, knorm_m³/min'));
 add(fan.sys.Unit.define('thousand_normal_cubic_meter_per_second, knorm_m³/s'));
 add(fan.sys.Unit.define('thousand_pounds, kip'));
 add(fan.sys.Unit.define('thousand_pounds_per_cubic_foot, kip/ft³'));
 add(fan.sys.Unit.define('thousand_pounds_per_hour, thousand_lb/hr'));
 add(fan.sys.Unit.define('thousand_revolution_per_minute, krpm'));
 add(fan.sys.Unit.define('thousand_standard_cubic_foot_per_day, kstd_ft³/d'));
 add(fan.sys.Unit.define('thousand_standard_cubic_foot_per_hour, kstd_ft³/hr'));
 add(fan.sys.Unit.define('thousand_standard_cubic_foot_per_minute, kstd_ft³/min'));
 add(fan.sys.Unit.define('thousand_standard_cubic_foot_per_second, kstd_ft³/s'));
 add(fan.sys.Unit.define('thousand_std_cubic_meter_deg_cper_day, kstd_m³/d'));
 add(fan.sys.Unit.define('thousand_stock_tank_barrels_deg_fper_day, kstdbpd'));
 add(fan.sys.Unit.define('toe, toe'));
 add(fan.sys.Unit.define('ton_assay, AT'));
 add(fan.sys.Unit.define('ton_assay, AT'));
 add(fan.sys.Unit.define('ton_energy, t/lbf'));
 add(fan.sys.Unit.define('ton_long_per_cubic_yard, ton/yd³'));
 add(fan.sys.Unit.define('ton_metric, mT'));
 add(fan.sys.Unit.define('ton_of_oil_equivalent, toe'));
 add(fan.sys.Unit.define('ton_per_year, ton/yr'));
 add(fan.sys.Unit.define('ton_short, s_ton'));
 add(fan.sys.Unit.define('ton_short_per_cubic_yard, ton/yd'));
 add(fan.sys.Unit.define('ton_short_per_hour, ton/hr'));
 add(fan.sys.Unit.define('tonne, mT'));
 add(fan.sys.Unit.define('tons_per_cubic_meter, t/m³'));
 add(fan.sys.Unit.define('torr, Torr'));
 add(fan.sys.Unit.define('torr, torr'));
 add(fan.sys.Unit.define('torr_absolute, Torra'));
 add(fan.sys.Unit.define('torr_diff, Torrdiff'));
 add(fan.sys.Unit.define('torr_gauge, Torrg'));
 add(fan.sys.Unit.define('trillion_cubic_feet, trillion_ft³'));
 add(fan.sys.Unit.define('troy_ounce, ozt'));
 add(fan.sys.Unit.define('turkish_lira_per_cubic_meter, ₺/m³'));
 add(fan.sys.Unit.define('turkish_lira_per_hour, ₺/hr'));
 add(fan.sys.Unit.define('turkish_lira_per_kilowatthour, ₺/kWh'));
 add(fan.sys.Unit.define('u, μ'));
 add(fan.sys.Unit.define('uaedirham_per_cubic_meter, AED/m³'));
 add(fan.sys.Unit.define('uaedirham_per_hour, AED/hr'));
 add(fan.sys.Unit.define('uaedirham_per_kilowatthour, AED/kWh'));
 add(fan.sys.Unit.define('uk_fluid_ounce, uk_fluid_ounce'));
 add(fan.sys.Unit.define('uk_gallons_per_day, uk_gpd'));
 add(fan.sys.Unit.define('uk_gallons_per_hour, uk_gph'));
 add(fan.sys.Unit.define('uk_gallons_per_hour_foot, uk_gal/h_ft'));
 add(fan.sys.Unit.define('uk_gallons_per_hour_inch, uk_gal/h_in'));
 add(fan.sys.Unit.define('uk_gallons_per_hour_square_foot, uk_gal/h_ft²'));
 add(fan.sys.Unit.define('uk_gallons_per_hour_square_inch, uk_gal/h_in²'));
 add(fan.sys.Unit.define('uk_gallons_per_mile, uk_gal/mile'));
 add(fan.sys.Unit.define('uk_gallons_per_minute, uk_gpm'));
 add(fan.sys.Unit.define('uk_gallons_per_minute_foot, uk_gal/min_ft'));
 add(fan.sys.Unit.define('uk_gallons_per_minute_per_minute, uk_gal/min²'));
 add(fan.sys.Unit.define('uk_gallons_per_minute_square_foot, uk_gal/min_ft²'));
 add(fan.sys.Unit.define('uk_gallons_per_pound_mass, uk_gal/lb'));
 add(fan.sys.Unit.define('uk_pint, uk_pint'));
 add(fan.sys.Unit.define('uk_pints_per_horsepower_hour, uk_pt/hp_h'));
 add(fan.sys.Unit.define('uk_quarts, uk_quarts'));
 add(fan.sys.Unit.define('uk_ton_feet_squared, uk_ton_f_ft²'));
 add(fan.sys.Unit.define('uk_tons_force, us_t_f'));
 add(fan.sys.Unit.define('uk_tons_force_per_foot, uk_t/ft'));
 add(fan.sys.Unit.define('uk_tons_force_per_square_foot, uk_tf/ft²a'));
 add(fan.sys.Unit.define('uk_tons_per_day, uk_t/d'));
 add(fan.sys.Unit.define('uk_tons_per_hour, uk_t/h'));
 add(fan.sys.Unit.define('uk_tons_per_minute, uk_t/min'));
 add(fan.sys.Unit.define('uk_tons_per_year, uk_t/yr'));
 add(fan.sys.Unit.define('unified_atomic_mass_unit, u'));
 add(fan.sys.Unit.define('unit_pole, U/nWb'));
 add(fan.sys.Unit.define('us_fluid_ounces, fl_oz'));
 add(fan.sys.Unit.define('us_gallons_per_foot, gal/ft'));
 add(fan.sys.Unit.define('us_gallons_per_foot_hour, gal/ft_h'));
 add(fan.sys.Unit.define('us_gallons_per_hour_inch, gal/h_in'));
 add(fan.sys.Unit.define('us_gallons_per_hour_square_foot, gal/h_ft²'));
 add(fan.sys.Unit.define('us_gallons_per_hour_square_inch, gal/h_in²'));
 add(fan.sys.Unit.define('us_gallons_per_mile, gal/mile'));
 add(fan.sys.Unit.define('us_gallons_per_minute_foot, gal/min_ft'));
 add(fan.sys.Unit.define('us_gallons_per_minute_per_minute, gal/min²'));
 add(fan.sys.Unit.define('us_gallons_per_minute_square_foot, gal/min_ft²'));
 add(fan.sys.Unit.define('us_gallons_per_pound_mass, gal/lb'));
 add(fan.sys.Unit.define('us_gallons_per_uk_ton, gal/uk_t'));
 add(fan.sys.Unit.define('us_gallons_per_us_ton, gal/mt'));
 add(fan.sys.Unit.define('us_pints, us_pt'));
 add(fan.sys.Unit.define('us_quarts, us_quars'));
 add(fan.sys.Unit.define('us_ton_force_miles_per_barrel, us_tf/bbl'));
 add(fan.sys.Unit.define('us_tons_force, us_tf'));
 add(fan.sys.Unit.define('us_tons_force_feet, us_tons_fft'));
 add(fan.sys.Unit.define('us_tons_force_feet_squared, us_ton_fft²'));
 add(fan.sys.Unit.define('us_tons_force_miles, us_tons_fmiles'));
 add(fan.sys.Unit.define('us_tons_force_miles_per_foot, us_tons_force_miles_per_foot'));
 add(fan.sys.Unit.define('us_tons_force_per_foot, tf/ft'));
 add(fan.sys.Unit.define('us_tons_force_per_square_foot, us_tf/ft²a'));
 add(fan.sys.Unit.define('us_tons_force_per_square_inch, us_tf/in²a'));
 add(fan.sys.Unit.define('us_tons_per_day, us_t/d'));
 add(fan.sys.Unit.define('us_tons_per_hour, us_t/h'));
 add(fan.sys.Unit.define('us_tons_per_minute, us_t/min'));
 add(fan.sys.Unit.define('us_tons_per_square_foot, us_tons/ft²'));
 add(fan.sys.Unit.define('us_tons_per_year, us_t/yr'));
 add(fan.sys.Unit.define('usdollar, $'));
 add(fan.sys.Unit.define('usdollar_per_cubic_foot, $/ft³'));
 add(fan.sys.Unit.define('usdollar_per_cubic_meter, $/m³'));
 add(fan.sys.Unit.define('usdollar_per_hour, $/hr'));
 add(fan.sys.Unit.define('usdollar_per_kilowatthour, $/kWh'));
 add(fan.sys.Unit.define('v, V'));
 add(fan.sys.Unit.define('v_ab, abV'));
 add(fan.sys.Unit.define('v_stat, statV'));
 add(fan.sys.Unit.define('volt_meter, m_V'));
 add(fan.sys.Unit.define('volt_per_bel, V/B'));
 add(fan.sys.Unit.define('volt_per_decibel, V/dB'));
 add(fan.sys.Unit.define('volt_per_second, V_/_sec'));
 add(fan.sys.Unit.define('volt_per_square_meter, V_m⁻²'));
 add(fan.sys.Unit.define('volume_fraction, vol_fr'));
 add(fan.sys.Unit.define('volume_per_volume_fraction, vol/vol'));
 add(fan.sys.Unit.define('volume_percent, vol_%'));
 add(fan.sys.Unit.define('w_hr, w_hr'));
 add(fan.sys.Unit.define('watt_meter_per_meter_squared_k, W_m/m²_K'));
 add(fan.sys.Unit.define('watt_per_c, W/°C'));
 add(fan.sys.Unit.define('watt_per_cubic_meter, W/m³'));
 add(fan.sys.Unit.define('watt_per_cubic_meter_per_kelvin, W/m³_K'));
 add(fan.sys.Unit.define('watt_per_kelvin, W/K'));
 add(fan.sys.Unit.define('watt_per_kilowatt, W/kW'));
 add(fan.sys.Unit.define('watt_per_meter_degree_celsius, W/m_°C'));
 add(fan.sys.Unit.define('watt_per_meter_kelvin, W/m_K'));
 add(fan.sys.Unit.define('watt_per_square_centimeter, W/cm²'));
 add(fan.sys.Unit.define('watt_per_square_inch, W/in²'));
 add(fan.sys.Unit.define('watt_per_square_meter_c, W/m²_°C'));
 add(fan.sys.Unit.define('watt_per_square_meter_kelvin, W/m²_K'));
 add(fan.sys.Unit.define('watt_per_square_meter_quartic_kelvin, W_m⁻²_K⁻⁴'));
 add(fan.sys.Unit.define('watt_per_square_meter_steradian, watt_per_square_meter_steradian'));
 add(fan.sys.Unit.define('watt_per_square_millimeter, W/mm²'));
 add(fan.sys.Unit.define('watt_per_watt, W/W'));
 add(fan.sys.Unit.define('watt_square_meter, W_m²'));
 add(fan.sys.Unit.define('watt_square_meter_per_steradian, W_m²_sr⁻¹'));
 add(fan.sys.Unit.define('weber_per_meter, Wb/m'));
 add(fan.sys.Unit.define('webers_per_millimeter, Wb/mm'));
 add(fan.sys.Unit.define('weight_fraction, wt_fr'));
 add(fan.sys.Unit.define('weight_percent, wt_%'));
 add(fan.sys.Unit.define('yard_cubed, yd³_sm'));
 add(fan.sys.Unit.define('year_sidereal, s_yr'));
 add(fan.sys.Unit.define('year_tropical, t_yr'));
 add(fan.sys.Unit.define('yobi, Yi'));
 add(fan.sys.Unit.define('yocto, y'));
 add(fan.sys.Unit.define('yotta, Y'));
 add(fan.sys.Unit.define('yr, a'));
 add(fan.sys.Unit.define('yr_tropical, a_t'));
 add(fan.sys.Unit.define('yuan_renminbi, ¥'));
 add(fan.sys.Unit.define('yuan_renminbi_per_cubic_meter, ¥/m³'));
 add(fan.sys.Unit.define('yuan_renminbi_per_hour, ¥/hr'));
 add(fan.sys.Unit.define('yuan_renminbi_per_kilowatthour, ¥/kWh'));
 add(fan.sys.Unit.define('zebi, Zi'));
 add(fan.sys.Unit.define('zepto, z'));
 add(fan.sys.Unit.define('zetta, Z'));
 add(fan.sys.Unit.define('thermal_load, KWr'));
 add(fan.sys.Unit.define('bolivianMvdol, BOV'));
 add(fan.sys.Unit.define('bulgarianLev, BGN'));
 add(fan.sys.Unit.define('cFAFrancBCEAO, CFA'));
 add(fan.sys.Unit.define('comoroFranc, CF'));
 add(fan.sys.Unit.define('croatianKuna, kn'));
 add(fan.sys.Unit.define('cyprusPound, £'));
 add(fan.sys.Unit.define('danishKrone, DKK'));
 add(fan.sys.Unit.define('bahrainiDinarPerCubicMeter, BHD/m³'));
 add(fan.sys.Unit.define('bahrainiDinarPerHour, BHD/hr'));
 add(fan.sys.Unit.define('bahrainiDinarPerCubicFoot, BHD/ft³'));
 add(fan.sys.Unit.define('iranianRialPerCubicMeter, IRR/m³'));
 add(fan.sys.Unit.define('iranianRialPerHour, IRR/hr'));
 add(fan.sys.Unit.define('bahrainiDinarPerKilowatthour, BHD/kWh'));
 add(fan.sys.Unit.define('iranianRialPerCubicFoot, IRR/ft³'));
 add(fan.sys.Unit.define('iraqiDinarPerCubicMeter, IQD/m³'));
 add(fan.sys.Unit.define('iraqiDinarPerHour, IQD/hr'));
 add(fan.sys.Unit.define('iranianRialPerKilowatthour, IRR/kWh'));
 add(fan.sys.Unit.define('iraqiDinarPerCubicFoot, IQD/ft³'));
 add(fan.sys.Unit.define('jordanianDinarPerCubicMeter, JOD/m³'));
 add(fan.sys.Unit.define('jordanianDinarPerHour, JOD/hr'));
 add(fan.sys.Unit.define('iraqiDinarPerKilowatthour, IQD/kWh'));
 add(fan.sys.Unit.define('jordanianDinarPerCubicFoot, JOD/ft³'));
 add(fan.sys.Unit.define('kuwaitiDinarPerCubicMeter, KWD/m³'));
 add(fan.sys.Unit.define('kuwaitiDinarPerHour, KWD/hr'));
 add(fan.sys.Unit.define('jordanianDinarPerKilowatthour, JOD/kWh'));
 add(fan.sys.Unit.define('kuwaitiDinarPerCubicFoot, KWD/ft³'));
 add(fan.sys.Unit.define('libyanDinarPerCubicMeter, LYD/m³'));
 add(fan.sys.Unit.define('libyanDinarPerHour, LYD/hr'));
 add(fan.sys.Unit.define('kuwaitiDinarPerKilowatthour, KWD/kWh'));
 add(fan.sys.Unit.define('libyanDinarPerCubicFoot, LYD/ft³'));
 add(fan.sys.Unit.define('moroccanDirhamPerHour, MAD/hr'));
 add(fan.sys.Unit.define('libyanDinarPerKilowatthour, LYD/kWh'));
 add(fan.sys.Unit.define('omaniRialPerCubicMeter, OMR/m³'));
 add(fan.sys.Unit.define('omaniRialPerHour, OMR/hr'));
 add(fan.sys.Unit.define('moroccanDirhamPerKilowatthour, MAD/kWh'));
 add(fan.sys.Unit.define('omaniRialPerCubicFoot, OMR/ft³'));
 add(fan.sys.Unit.define('qatariRialPerCubicMeter, QAR/m³'));
 add(fan.sys.Unit.define('omaniRialPerKilowatthour, OMR/kWh'));
 add(fan.sys.Unit.define('qatariRialPerCubicFoot, QAR/ft³'));
 add(fan.sys.Unit.define('europeanCompositeUnit, XBA'));
 add(fan.sys.Unit.define('europeanMonetaryUnit, XBB'));
 add(fan.sys.Unit.define('qatariRialPerHour, QAR/hr'));
 add(fan.sys.Unit.define('saudiRiyalPerCubicMeter, SAR/m³'));
 add(fan.sys.Unit.define('saudiRiyalPerHour, SAR/hr'));
 add(fan.sys.Unit.define('qatariRialPerKilowatthour, QAR/kWh'));
 add(fan.sys.Unit.define('saudiRiyalPerCubicFoot, SAR/ft³'));
 add(fan.sys.Unit.define('yemeniRialPerCubicFoot, YER/ft³'));
 add(fan.sys.Unit.define('yemeniRialPerCubicMeter, YER/m³'));
 add(fan.sys.Unit.define('saudiRiyalPerKilowatthour, SAR/kWh'));
 add(fan.sys.Unit.define('uAEDirhamPerCubicFoot, AED/ft³'));
 add(fan.sys.Unit.define('yemeniRialPerHour, YER/hr'));
 add(fan.sys.Unit.define('yemeniRialPerKilowatthour, YER/kWh'));
 add(fan.sys.Unit.define('goldFranc, XFO'));
 add(fan.sys.Unit.define('kenyanShilling, KSh'));
 add(fan.sys.Unit.define('latvianLats, Ls'));
 add(fan.sys.Unit.define('mileUsStatute, mi'));
 add(fan.sys.Unit.define('nakfa, Nkf'));
 add(fan.sys.Unit.define('netherlandsAntillianGuilder, NAƒ'));
 add(fan.sys.Unit.define('paanga, T$'));
 add(fan.sys.Unit.define('slovakKoruna, Sk'));
 add(fan.sys.Unit.define('specialDrawingRights, XDR'));
 add(fan.sys.Unit.define('sriLankaRupee, LKR'));
 add(fan.sys.Unit.define('uICFranc, XFU'));
 add(fan.sys.Unit.define('unidadDeValorReal, COU'));
 add(fan.sys.Unit.define('unidadesDeFormento, UF'));
 add(fan.sys.Unit.define('venezuelanBolvar, VEB'));
 add(fan.sys.Unit.define('wirEuro, CHE'));
 add(fan.sys.Unit.define('wirFranc, CHW'));
 add(fan.sys.Unit.define('europeanUnitOfAccountSeventeen, XBD'));
 add(fan.sys.Unit.define('europeanUnitOfAccountNine, XBC'));
}
fan.sys.Unit.m_quantities['honeywell ontology units'] = fan.sys.Unit.m_quantities['honeywell ontology units'].toImmutable();
fan.sys.Unit.m_quantityNames = fan.sys.Unit.m_quantityNames.toImmutable();
}).call(this);
