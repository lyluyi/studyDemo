/ *！
 * jQuery JavaScript Library v2.0.3 
 * http://jquery.com/ 
 * 
 *包括Sizzle.js 
 * http://sizzlejs.com/ 
 * 
 *版权所有2005,2013 jQuery Foundation，Inc。和其他贡献者
 *在麻省理工学院下发布许可证
 * http://jquery.org/license 
 * 
 *日期：2013-07-03T13：30Z 
 * / 
（函数（窗口，未定义）{ 

//无法执行此操作，因为包括ASP.NET跟踪在内的多个应用程序
//通过arguments.caller.callee堆栈，如果
你试图追踪“use strict”调用链，Firefox就会死掉。（＃13335）
//支持：Firefox 18+ 
//“use strict”; 
var
	//对根jQuery（文档）
	rootjQuery 的中心引用，

	//在DOM ready 
	readyList 上使用的延迟，

	//支持：IE9 
	//对于`typeof xmlNode.method`而不是` 
	xmlNode.method ！== undefined`core_strundefined = typeof undefined，

	//使用正确的文档，使用window参数（sandbox）
	location = window.location，
	document = window.document，
	docElem = document.documentElement，

	//覆盖jQuery时覆盖
	_jQuery = window.jQuery，

	//在覆盖
	_ $ =窗口的情况下覆盖$。$，

	// [[Class]]  - >类型对
	class2type = {}，

	//已删除的数据缓存ID列表，因此我们可以重用它们
	core_deletedIds = []，

	core_version =“2.0.3”，

	//保存对某些核心方法的引用
	core_concat = core_deletedIds.concat，
	core_push = core_deletedIds.push，
	core_slice = core_deletedIds.slice，
	core_indexOf = core_deletedIds.indexOf，
	core_toString = class2type.toString，
	core_hasOwn = class2type.hasOwnProperty，
	core_trim = core_version.trim，

	//定义jQuery的本地副本
	jQuery = function（selector，context）{ 
		// jQuery对象实际上只是init构造函数'enhanced' 
		返回新的jQuery.fn.init（selector，context，rootjQuery）; 
	}，

	//用于匹配数字
	core_pnum = / [+  - ]？（？：\ d *。*）\ d +（？：[eE] [+  - ]？\ d + |）/ .source，

	//用于分割on whitespace 
	core_rnotwhite = / \ S + / g，

	//检查HTML字符串的简单方法
	//优先于<tag>优先#id以避免XSS通过location.hash（＃9521）
	//严格HTML识别（＃11290：必须以<）启动
	rquickExpr = / ^（？：\ s *（<[\ w \ W] +>）[^>] * |＃（[\ w  - ] *））$ /，

	//匹配独立标签
	rsingleTag = / ^ <（\ w +）\ s * \ /？>（？：<\ / \ 1> |）$ /，

	//匹配用于驼峰的虚线字符串
	rmsPrefix = / ^  -  ms- /，
	rdashAlpha = /  - （[\ da-z]）/ gi，

	//由jQuery.camelCase用作replace（）的回调
	fcamelCase = function（all，letter）{
		return letter.toUpperCase（）; 
	}，

	// ready事件处理程序和self cleanup方法
	completed = function（）{ 
		document.removeEventListener（“DOMContentLoaded”，completed，false）; 
		window.removeEventListener（“load”，completed，false）; 
		jQuery.ready（）; 
	}; 

jQuery.fn = jQuery.prototype = { 
	//当前使用的
	jQuery 版本jquery：core_version，

	构造函数：jQuery，
	init：function（selector，context，rootjQuery）{ 
		var match，elem; 

		// HANDLE：$（“”），$（null），$（undefined），$（false）
		if（！selector）{ 
			return this; 
		} 

		//处理HTML字符串
		if（typeof selector ===“string”）{ 
			if（selector.charAt（0）===“<”&& selector.charAt（selector.length  -  1）===“>”&& selector.length> = 3 ）{ 
				//假设以<>开头和结尾的字符串是HTML并跳过正则表达式检查
				match = [null，selector，null]; 

			} else { 
				match = rquickExpr.exec（selector）; 
			} 

			//匹配html或确保没有为#id指定上下文
			if（match &&（match [1] ||！context））{ 

				// HANDLE：$（html） - > $（array）
				if（match [1 ]）{ 
					context =上下文实例jQuery？context [0]：context; 

					//脚本适用于back-compat 
					jQuery.merge（这个，
						context && context.nodeType？context.ownerDocument || context：document，
						true 
					））; 

					// HANDLE：$（html，props）
					if（rsingleTag.test（match [1]）&& jQuery.isPlainObject（context））{ 
						for（match in context）{ 
							//如果可能的
							话，上下文属性被称为方法if（ jQuery.isFunction（this [match]））{ 
								this [match]（context [match]）; 

							// ...并以其他方式设置为属性
							} else { 
								this.attr（match，context [match]）; 
							} 
						} 
					} 

					返回这一点; 

				// HANDLE：$（＃id）
				} else {
					elem = document.getElementById（match [2]）; 

					//检查parentNode以便在Blackberry 4.6返回时捕获
					//不再位于文档中的节点＃6963 
					if（elem && elem.parentNode）{ 
						//将元素直接注入jQuery对象
						this.length = 1; 
						这[0] = elem; 
					} 

					this.context = document; 
					this.selector = selector; 
					归还这个; 
				} 

			// HANDLE：$（expr，$（...））
			} else if（！context || context.jquery）{ 
				return（context || rootjQuery）.find（selector）; 

			// HANDLE：$（expr，context）
			//（这相当于：$（context）.find（expr）
			} else { 
				return this.constructor（context）.find（selector）; 
			} 

		// HANDLE：$（DOMElement）
		} else if（selector.nodeType）{ 
			this.context = this [0] = selector; 
			this.length = 1; 
			归还这个; 

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get：function（num）{ 
		return num == null？

			//返回'clean'数组
			this.toArray（）：

			//只返回对象
			（num <0？this [this.length + num]：this [num]）; 
	}，

	//获取一个元素数组并将其推入堆栈
	//（返回新的匹配元素集）
	pushStack：function（elems）{ 

		//构建一个新的jQuery匹配元素集
		var ret = jQuery.merge（this.constructor（），elems）; 

		//将旧对象添加到堆栈中（作为参考）
		ret.prevObject = this; 
		ret.context = this.context; 

		//返回新形成的元素集
		返回ret; 
	}，

	//为匹配集中的每个元素执行回调。
	//（您可以使用args数组对参数进行种子处理，但这
	只是在内部使用。）
	each：function（callback，args）{ 
		return jQuery.each（this，callback，args）; 
	}，

	ready：function（fn）{ 
		//添加回调
		jQuery.ready.promise（）。done（fn）; 

		归还这个; 
	}，

	slice：function（）{
		return this.pushStack（core_slice.apply（this，arguments））; 
	}，

	first：function（）{ 
		return this.eq（0）; 
	}，

	last：function（）{ 
		return this.eq（-1）; 
	}，

	eq：function（i）{ 
		var len = this.length，
			j = + i +（i <0？len：0）; 
		return this.pushStack（j> = 0 && j <len？[this [j]]：[]）; 
	}，

	map：function（callback）{ 
		return this.pushStack（jQuery.map（this，function（elem，i）{ 
			return callback.call（elem，i，elem）; 
		}））; 
	}，

	end：function（）{ 
		return this.prevObject || this.constructor（NULL）; 
	}，

	//仅供内部使用。
	//表现得像一个Array的方法，而不是像jQuery方法。
	push：core_push，
	sort：[] .sort，
	splice：[] .splice 
}; 

//为init函数提供jQuery原型，以便以后实例化
jQuery.fn.init.prototype = jQuery.fn; 

jQuery.extend = jQuery.fn.extend = function（）{ 
	var options，name，src，copy，copyIsArray，clone，
		target = arguments [0] || {}，
		i = 1，
		length = arguments.length，
		deep = false; 

	//处理深拷贝情况
	if（typeof target ===“boolean”）{ 
		deep = target; 
		target = arguments [1] || {}; 
		//跳过布尔值，目标
		i = 2; 
	}

	//当目标是字符串或其他东西时（可能在深层复制中）
	if（typeof target！==“object”&&！jQuery.isFunction（target））{ 
		target = {}; 
	} 

	//延伸jQuery的本身，如果只有一个参数被传递
	如果（长度===ⅰ）{ 
		目标=此; 
		- 一世; 
	} 

	for（; i <length; i ++）{ 
		//只处理非空/未定义的值
		if（（options = arguments [i]）！= null）{ 
			//扩展基础对象
			（选项中的名称）{ 
				src = target [name]; 
				copy = options [name]; 

				//防止永无止境的循环
				if（target === copy）{ 
					continue; 
				}

				//如果我们正在合并普通对象或数组，
				则递归:(深&& copy &&（jQuery.isPlainObject（copy）||（copyIsArray = jQuery.isArray（copy））））{ 
					if（copyIsArray）{ 
						copyIsArray = false; 
						clone = src && jQuery.isArray（src）？src：[]; 

					} else { 
						clone = src && jQuery.isPlainObject（src）？src：{}; 
					} 

					//永远不要移动原始对象，克隆它们
					target [name] = jQuery.extend（deep，clone，copy）; 

				//不要引入未定义的值
				}否则if（copy！== undefined）{ 
					target [name] = copy; 
				} 
			} 
		} 
	} 

	//返回修改的对象
	回归目标; 
}; 

jQuery.extend（{ 
	//对于页面
	expando 上每个jQuery副本唯一：“jQuery”+（core_version + Math.random（））.replace（/ \ D / g，“”），

	noConflict：function（deep） { 
		if（window。$ === jQuery）{ 
			window。$ = _ $; 
		} 

		if（deep && window.jQuery === jQuery）{ 
			window.jQuery = _jQuery; 
		} 

		return jQuery; 
	}，

	//是DOM准备使用？一旦发生就设置为
	true.isReady：false，

	//一个计数器，用于跟踪
	在就绪事件触发之前要等待的项目数量。请参阅＃6781 
	readyWait：1，

	//保持（或释放）准备好的事件
	holdReady：function（hold）{ 
		if（hold）{ 
			jQuery.readyWait ++; 
		} else { 
			jQuery.ready（true）; 
		} 
	} 

	//处理当DOM准备
	就绪：功能（等待）{ 

		//中止如果有挂起持有或我们已经做好准备
		，如果（等待===真--jQuery.readyWait：jQuery.isReady） { 
			返回; 
		} 

		//记住DOM已准备就绪
		jQuery.isReady = true; 

		//如果正常的DOM Ready事件被触发，减少并等待，如果需要
		if（wait！== true && --jQuery.readyWait> 0）{ 
			return; 
		} 

		//如果有绑定的函数，则执行
		readyList.resolveWith（document，[jQuery]）; 

		//触发任何绑定的就绪事件
		if（jQuery.fn.trigger）{ 
			jQuery（document）.trigger（“ready”）。off（“ready”）; 
		} 
	} 

	//见测试/单位/ core.js的有关isFunction细节。
	//从版本1.3开始，
	不支持DOM方法和函数，例如alert //。它们在IE上返回false（＃2968）。
	isFunction：function（obj）{ 
		return jQuery.type（obj）===“function”; 
	，

	isArray：Array.isArray，

	isWindow：function（obj）{ 
		return obj！= null && obj === obj.window; 
	}，

	isNumeric：function（obj）{ 
		return！isNaN（parseFloat（obj））&&
	}，

	type：function（obj）{ 
		if（obj == null）{ 
			return String（obj）; 
		} 
		//支持：Safari <= 5.1（functionish RegExp）
		返回typeof obj ===“object”|| typeof obj ===“function”？
			class2type [core_toString.call（obj）] || “对象”：
			typeof obj; 
	}，

	isPlainObject：function（obj）{ 
		//不是普通对象：
		//  - 内部[[Class]]属性不是“[object Object]”的任何对象或值
		//  -  DOM节点
		//  -  window 
		if（jQuery） .type（obj）！==“object”|| obj.nodeType || jQuery.isWindow（obj））{ 
			return false; 
		} 

		//支持：Firefox <20
		// try / catch抑制在尝试访问
		某些主机对象的“构造函数”属性时抛出的异常，即。| window.location的| 
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622 
		尝试{ 
			if（obj.constructor && 
					！core_hasOwn.call（obj.constructor.prototype，“isPrototypeOf”））{ 
				return false; 
			} 
		}赶上（E）{ 
			返回false; 
		} 

		//如果函数尚未返回，我们确信
		// | obj | 是一个普通的对象，由{}创建或用新的Object构造
		返回true; 
	，

	isEmptyObject：function（obj）{ 
		var name; 
		for（obj中的名字）{
			返回虚假; 
		} 
		return true; 
	}，

	error：function（msg）{ 
		throw new Error（msg）; 
	}，

	// data：html 
	// context的字符串（可选）：如果指定，将在此上下文中创建片段，默认为文档
	// keepScripts（可选）：如果为true，将包含在html字符串
	parseHTML中传递的脚本：function（data，context，keepScripts）{ 
		if（！data || typeof data！==“string”）{ 
			return null; 
		} 
		if（typeof context ===“boolean”）{ 
			keepScripts = context; 
			context = false; 
		} 
		context = context || 文件; 

		var parsed = rsingleTag.exec（data），
			scripts =！keepScripts && []; 

		//单个标记
		if（parsed）{ 
			return [context.createElement（parsed [1]）]; 
		} 

		parsed = jQuery.buildFragment（[data]，context，scripts）; 

		if（scripts）{ 
			jQuery（scripts）.remove（）; 
		} 

		return jQuery.merge（[]，parsed.childNodes）; 
	}，

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval; 

		code = jQuery.trim（code）; 

		if（code）{ 
			//如果代码包含有效的序言位置
			// strict mode pragma，则通过将
			//脚本标记注入文档来执行代码。
			if（code.indexOf（“use strict”）=== 1）{ 
				script = document.createElement（“script”）;
				script.text = code; 
				document.head.appendChild（script）.parentNode.removeChild（script）; 
			} else { 
			//否则，
			通过使用间接全局eval 
				间接（代码）来避免DOM节点创建，插入和删除; 
			} 
		} 
	}，

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					值= callback.apply（OBJ [I]中，参数）; 

					if（value === false）{ 
						break; 
					} 
				} 
			}否则{ 
				对于（i的OBJ）{ 
					值= callback.apply（OBJ [I]中，参数）; 

					if（value === false）{ 
						break; 
					} 
				} 
			} 

		//一个特殊的，快速的，为的情况下最常见的用途每
		} else { 
			if（isArray）{ 
				for（; i <length; i ++）{ 
					value = callback.call（obj [i]，i，obj [i]）; 

					if（value === false）{ 
						break; 
					} 
				} 
			}否则{ 
				对于（i的OBJ）{ 
					值= callback.call（OBJ [I]，I，OBJ [1]）; 

					if（value === false）{ 
						break; 
					} 
				} 
			} 
		} 

		返回OBJ; 
	}，

	trim：function（text）{ 
		return text == null？“”：core_trim.call（text）; 
	}，

	//结果仅供内部使用
	makeArray：function（arr，results）{ 
		var ret = results || [];

		if（arr！= null）{ 
			if（isArraylike（Object（arr）））{ 
				jQuery.merge（ret，
					typeof arr ===“string”？
					[arr]：arr 
				）; 
			} else { 
				core_push.call（ret，arr）; 
			} 
		} 

		返回RET; 
	}，

	inArray：function（elem，arr，i）{ 
		return arr == null？-1：core_indexOf.call（arr，elem，i）; 
	}，

	merge：function（first，second）{ 
		var l = second.length，
			i = first.length，
			j = 0; 

		if（typeof l ===“number”）{ 
			for（; j <l; j ++）{ 
				first [i ++] = second [j]; 
			} 
		} else {
			while（second [j]！== undefined）{ 
				first [i ++] = second [j ++]; 
			} 
		} 

		first.length = I; 

		先回来; 
	}，

	grep：function（elems，callback，inv）{ 
		var retVal，
			ret = []，
			i = 0，
			length = elems.length; 
		inv = !! inv; 

		//遍历数组，只保存
		//传递验证函数的
		项目（; i <length; i ++）{ 
			retVal = !! callback（elems [i]，i）; 
			if（inv！== retVal）{ 
				ret.push（elems [i]）; 
			} 
		} 

		返回RET; 
	}，

	// arg仅供内部使用
	map：function（elems，callback，arg）{ 
		var value，
			i = 0，
			length = elems.length，
			isArray = isArraylike（elems），
			ret = []; 

		//遍历数组，将每个项目翻译成
		if（isArray）{ 
			for（; i <length; i ++）{ 
				value = callback（elems [i]，i，arg）; 

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if（typeof context ===“string”）{ 
			tmp = fn [context]; 
			context = fn; 
			fn = tmp; 
		} 

		//快速检查确定目标是否可调用，在规范
		//中抛出一个TypeError，但我们只返回undefined。
		if（！jQuery.isFunction（fn））{ 
			return undefined; 
		}

		//模拟bind 
		args = core_slice.call（arguments，2）; 
		proxy = function（）{ 
			return fn.apply（context || this，args.concat（core_slice.call（arguments）））; 
		}; 

		//将唯一处理程序的guid设置为原始处理程序的guid，因此可以将其删除
		proxy.guid = fn.guid = fn.guid || jQuery.guid ++; 

		返回代理; 
	}，

	//获取和设置集合值的多功能方法
	//如果是函数
	访问，则可以选择执行value / s ：function（elems，fn，key，value，chainable，emptyGet，raw）{ 
		var i = 0，
			length = elems.length，
			bulk = key == null; 

		//设置许多值
		if（jQuery.type（key）===“object”）{ 
			chainable = true; 
			for（i in key）{ 
				jQuery.access（elems，fn，i，key [i]，true，emptyGet，raw）; 
			} 

		//设置一个值
		} else if（value！== undefined）{ 
			chainable = true; 

			if（！jQuery.isFunction（value））{ 
				raw = true; 
			} 

			if（bulk）{ 
				//批量操作针对整个集合运行
				if（raw）{ 
					fn.call（elems，value）; 
					fn = null; 

				// ...执行函数值时除外
				} else { 
					bulk = fn; 
					fn = function（elem，key，value）{
						return bulk.call（jQuery（elem），value）; 
					}; 
				} 
			} 

			如果（FN）{ 
				对于（; I <长度;我++）{ 
					FN（elems的[I]，键，原始值：value.call（elems的[I]，I，FN（elems的[I]，键） ））; 
				} 
			} 
		} 

		返回链式方法？
			elems：

			//获取
			批量？
				fn.call（elems）：
				长度？fn（elems [0]，key）：emptyGet; 
	}，

	now：Date.now，

	//一种快速交换/输出CSS属性以获得正确计算的方法。
	//注意：此方法属于css模块，但此处需要支持模块。
	//如果支持模块化，则应将此方法移回css模块。
	swap：function（elem，options，callback，args）{ 
		var ret，name，
			old = {}; 

		//记住旧值，并插入新值
		（选项中的名称）{ 
			old [name] = elem.style [name]; 
			elem.style [name] = options [name]; 
		} 

		ret = callback.apply（elem，args || []）; 

		//恢复旧值
		（选项中的名称）{ 
			elem.style [name] = old [name]; 
		} 

		return ret; 
	} 
}; 

jQuery.ready.promise = function（obj）{ 
	if（！readyList）{ 

		readyList = jQuery.Deferred（）;

		//捕获在浏览器事件发生后调用$（document）.ready（）的情况。
		//我们曾经尝试在这里使用readyState“interactive”，但是它引起了像
		ChrisS在这里发现的问题：http：//bugs.jquery.com/ticket/12282#comment:15 
		if（document.readyState = ==“complete”）{ 
			//异步处理它以允许脚本有机会延迟就绪
			setTimeout（jQuery.ready）; 

		} else { 

			//使用方便的事件回调
			document.addEventListener（“DOMContentLoaded”，completed，false）; 

			//一个回退到window.onload，它将始终工作
			window.addEventListener（“load”，completed，false）; 
		} 
	}
	return readyList.promise（obj）; 
}; 

//填充class2type映射
jQuery.each（“布尔值数字字符串函数数组日期RegExp对象错误”.split（“”），函数（i，name）{ 
	class2type [“[object”+ name +“]”] = name .toLowerCase（）; 
}）; 

function isArraylike（obj）{ 
	var length = obj.length，
		type = jQuery.type（obj）; 

	if（jQuery.isWindow（obj））{ 
		return false; 
	} 

	if（obj.nodeType === 1 && length）{ 
		return true; 
	} 

	return type ===“array”|| type！==“function”&& 
		（length === 0 || 
		typeof length ===“number”&& length> 0 && （长度 -  1）在obj）; 
}

//所有jQuery对象都应该指向这些
rootjQuery = jQuery（document）; 
/ *！
 * Sizzle CSS Selector Engine v1.9.4-pre 
 * http://sizzlejs.com/ 
 * 
 *版权所有2013 jQuery Foundation，Inc。和其他贡献者
 *根据MIT许可证发布
 * http://jquery.org/license 
 * 
 *日期：2013-06-03 
 * / 
（function（window，undefined）{ 

var i，
	support，
	cachedruns，
	Expr，
	getText，
	isXML，
	compile，
	outermostContext，
	sortInput，

	// Local document vars 
	setDocument，
	document，
	docElem，
	documentIsHTML，
	rbuggyQSA，
	rbuggyMatches，
	matches，
	contains，

	//特定于实例的数据
	expando =“sizzle”+  - （new Date（）），
	preferredDoc = window.document，
	dirruns = 0，
	done = 0，
	classCache = createCache（），
	tokenCache = createCache（），
	compilerCache = createCache（），
	hasDuplicate = false，
	sortOrder = function（a，b）{ 
		if（a === b）{ 
			hasDuplicate = true; 
			返回0; 
		} 
		return 0; 
	}，

	//通用常量
	strundefined = typeof undefined，
	MAX_NEGATIVE = 1 << 31，

	//实例方法
	hasOwn =（{}）。hasOwnProperty，
	arr = []，
	pop = arr.pop，
	push_native = arr.push，
	push = arr.push，
	slice = arr.slice，
	//如果我们可以'使用精简的indexOf'使用原生的
	indexOf = arr.indexOf || function（elem）{ 
		var i = 0，
			len = this.length; 
		for（; i <len; i ++）{ 
			if（this [i] === elem）{ 
				return i; 
			} 
		} 
		返回-1; 
	}，

	booleans =“checked | selected | async | autofocus | autoplay | controls | defer | disabled | hidden | ismap | loop | multiple | open | readonly | required | scoped”，

	//正则表达式

	//空格字符http：// www.w3.org/TR/css3-selectors/#whitespace
	whitespace =“[\\ x20 \\ t \\ r \\ n \\ f]”，
	// http://www.w3.org/TR/css3-syntax/#characters 
	characterEncoding =“（？：\\ \\。| [\\ w-] | [^ \\ x00  -  \\ xa0]）+“，

	//在CSS标识符字符上松散建模
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	//这些首选项用于减少
	需要标记化的选择器数量PSEUDO preFilter 
	pseudos =“:(”+ characterEncoding +“）（？：\\（（（['\”]）（（？：\\\\。| [^ \\\\]）*？）\ \ 3 |（（？：\\\\。| [^ \\\\（）[\\]] |“+ attributes.replace（3,8）+”）*）|。*）\\）| ）“，

	//前导和非转义尾随空格，捕获后面的一些非空格字符
	rtrim = new RegExp（”^“+ whitespace +”+ |（（？：^ | [^ \\\\]） （？：\\\\。）*）“+ whitespace +”+ $“，”g“），

	rcomma = new RegExp（“^”+ whitespace +“*，”+ whitespace +“*”），
	rcombinators = new RegExp（“^”+ whitespace +“*（[> +〜] |”+ whitespace +“）”“ +空格+“*”），

	rsibling = new RegExp（空格+“* [+〜]”），
	rattributeQuotes = new RegExp（“=”+ whitespace +“*（[^ \\]'\”] *）“ + whitespace +“* \\]”，“g”），

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		//用于实现.is（）的库
		//我们在`select` 
		“needsContext”中使用它进行POS匹配：new RegExp（“^”+ whitespace +“* [> +〜] | :(偶数|奇数| eq | gt | lt | nth | first | last）（？：\\（”+ 
			whitespace +“*（（？： -  \\ d）？\ \ d *）“+ whitespace +”* \\）|）（？= [^  - ] | $）“，”i“
	}}，

	rnative = / ^ [^ {] + \ {\ s * \ [native \ w /，

	//易于解析/可检索的ID或TAG或CLASS选择器
	rquickExpr = 

	/^(?: #([ \w-]+)|(\w+)|\ .( [ .w-] +），$ / ，rinputs = / ^（？：input | select | textarea | button ）$ / i，
	rheader = / ^ h \ d $ / i，

	rescape = /'| \\ / g，

	// CSS逃脱http://www.w3.org/TR/CSS21/syndata.html#escaped- characters 
	runescape = new RegExp（“\\\\（[\\ da-f] {1,6}”+ whitespace +“？（（”+ whitespace +“）|。）”，“ig”），
	funescape = function（_，escaped，escapedWhitespace）{ 
		var high =“0x”+ escaped  -  0x10000; 
		// NaN表示非代码点
		//支持：Firefox 
		//解决错误的数字解释+“0x” 
		返回高！==高|| 逃过白天？
			转义：
			// BMP代码点
			高<0？
				String.fromCharCode（high + 0x10000）：
				//补充平面代码点（代理对）
				String.fromCharCode（高>> 10 | 0xD800，高＆0x3FF | 0xDC00）; 
	}; 

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while（（target [j ++] = els [i ++]））{} 
			target.length = j  -  1; 
		} 
	}; 
} 

功能灒（选择器，上下文，结果，种子）{ 
	VAR的比赛，ELEM，米，节点类型，
		// QSA乏
		I，基团，老，NID，newContext，newSelector; 

	if（（context？context.ownerDocument || context：preferredDoc）！== document）{ 
		setDocument（context）; 
	} 

	context = context || 文件; 
	结果=结果|| [];

	if（！selector || typeof selector！==“string”）{ 
		return results; 
	} 

	if（（nodeType = context.nodeType）！== 1 && nodeType！== 9）{ 
		return []; 
	} 

	if（documentIsHTML &&！seed）{ 

		//快捷方式
		if（（match = rquickExpr.exec（selector）））{ 
			//加速：Sizzle（“＃ID”）
			if（（m = match [1]）） { 
				if（nodeType === 9）{ 
					elem = context.getElementById（m）; 
					//检查parentNode以便在Blackberry 4.6返回时捕获
					//不再位于文档中的节点＃6963 
					if（elem && elem.parentNode）{ 
						//处理IE，Opera和Webkit返回项目的情况
						//按名称而不是ID 
						if（elem.id === m）{ 
							results.push（elem）; 
							返回结果; 
						} 
					} else { 
						return results; 
					} 
				else { 
					//上下文不是文档
					if（context.ownerDocument &&（elem = context.ownerDocument.getElementById（m））&& 
						contains（context，elem）&& elem.id === m）{ 
						results.push（ elem）; 
						返回结果; 
					} 
				} 

			//加速：Sizzle（“TAG”）
			} else if（match [2]）{ 
				push.apply（results，context.getElementsByTagName（selector））; 
				返回结果;

			//加速：Sizzle（“。CLASS”）
			} else if（（m = match [3]）&& support.getElementsByClassName && context.getElementsByClassName）{ 
				push.apply（results，context.getElementsByClassName（m））; 
				返回结果; 
			} 
		} 

		// QSA路径
		if（support.qsa &&（！rbuggyQSA ||！rbuggyQSA.test（selector）））{ 
			nid = old = expando; 
			newContext = context; 
			newSelector = nodeType === 9 && selector; 

			// qSA在基于元素的查询上奇怪地
			工作//我们可以通过在根上指定一个额外的ID来解决这个问题，
			并从那里开始工作（感谢Andrew Dupont的技术）
			// IE 8没有
			if（nodeType === 1 && context.nodeName.toLowerCase（）！==“object”）{ 
				groups = tokenize（selector）; 

				if（（old = context.getAttribute（“id”）））{ 
					nid = old.replace（rescape，“\\ $＆”）; 
				} else { 
					context.setAttribute（“id”，nid）; 
				} 
				nid =“[id ='”+ nid +“']”; 

				i = groups.length; 
				while（
					i  - ）{ groups [i] = nid + toSelector（groups [i]）; 
				} 
				newContext = rsibling.test（selector）&& context.parentNode || 上下文; 
				newSelector = groups.join（“，”）; 
			} 

			if（newSelector）{ 
				try { 
					push。
						newContext.querySelectorAll（newSelector）
					）; 
					返回结果; 
				} catch（qsaError）{ 
				} finally { 
					if（！old）{ 
						context.removeAttribute（“id”）; 
					} 
				} 
			} 
		} 
	} 

	//其他所有
	返回选择（selector.replace（RTRIM， “$ 1”），上下文，结果，种子）; 
} 

/ ** 
 *创建有限大小的键值缓存
 * @returns {Function（string，Object）}使用
 *属性名称（空格后缀）字符串和（如果缓存为大于Expr.cacheLength）
 *删除最旧的条目
 * /
function createCache（）{ 
	var keys = []; 

	function cache（key，value）{ 
		//使用（key +“”）避免与本机原型属性冲突（参见问题＃157）
		if（keys.push（key + =“”）> Expr.cacheLength）{ 
			//只保留最近的条目
			delete cache [keys.shift（）]; 
		} 
		return（cache [key] = value）; 
	} 
	返回缓存; 
} 

/ ** 
 *标记一个特殊用途的函数Sizzle 
 * @param {Function} fn标记
 * / 
function markFunction（fn）的函数{ 
	fn [expando] = true; 
	返回fn; 
} 

/ ** 
 *支持使用元素进行测试
 * @param {Function} fn传递创建的div并期望一个布尔结果
 * / 
function assert（fn）{ 
	var div = document.createElement（“div”）; 

	试试{ 
		return !! fn（div）; 
	} catch（e）{ 
		return false; 
	} finally { 
		//默认情况下从父节点删除
		if（div.parentNode）{ 
			div.parentNode.removeChild（div）; 
		} 
		//在IE中释放内存
		div = null; 
	} 
} 

/ ** 
 *添加所有指定的attrs的相同的处理
 * @参数{字符串} ATTRS管道分隔的属性列表
 * @参数{功能}处理程序将被应用的方法
 * /
function addHandle（attrs，handler）{ 
	var arr = attrs.split（“|”），
		i = attrs.length; 

	while（
		i-- ）{ Expr.attrHandle [arr [i]] = handler; 
	} 
} 

/ ** 
 两个兄妹*检查文档顺序
 * @参数{元素}一个
 * @参数{元素} b 
 * @Returns {数量}返回小于0，如果一个先于B，大于0，如果跟在b 
 * / 
function siblingCheck（a，b）{ 
	var cur = b && a，
		diff = cur && a.nodeType === 1 && b.nodeType === 1 && 
			（~b.sourceIndex || MAX_NEGATIVE） - 
			（~a.sourceIndex || MAX_NEGATIVE）; 

	// 
	如果（diff）{ 在两个节点上都可用，则使用IE sourceIndex
		返回差异; 
	} 

	//检查b是否跟随
	if（cur）{ 
		while（（cur = cur.nextSibling））{ 
			if（cur === b）{ 
				return -1; 
			} 
		} 
	} 

	返回？1：-1; 
} 

/ ** 
 *返回在伪输入类型中使用的函数
 * @param {String} type 
 * / 
function createInputPseudo（type）{ 
	return function（elem）{ 
		var name = elem.nodeName.toLowerCase（）; 
		返回名称===“输入”&& elem.type === type; 
	}; 
} 

/ ** 
 *返回一个在pseudos中用于按钮的函数
 * @param {String} type 
 * /
function createButtonPseudo（type）{ 
	return function（elem）{ 
		var name = elem.nodeName.toLowerCase（）; 
		return（name ===“input”|| name ===“button”）&& elem.type === type; 
	}; 
} 

/ ** 
 *返回一个在pseudos中用于位置的
 函数* @param {Function} fn 
 * / 
function createPositionalPseudo（fn）{ 
	return markFunction（function（argument）{ 
		argument = + argument; 
		return markFunction（function（seed，matches） ）{ 
			var j，
				matchIndexes = fn（[]，seed.length，argument），
				i = matchIndexes.length; 

			//匹配在指定索引处找到的元素
			while（i-- ）{
				if（seed [（j = matchIndexes [i]）]）{ 
					seed [j] =！（匹配[j] = seed [j]）; 
				} 
			} 
		}）; 
	}）; 
} 

/ ** 
 *检测xml 
 * @param {Element | Object}元素元素或文档
 * / 
isXML = Sizzle.isXML = function（elem）{ 
	// documentElement在尚不存在的情况下进行验证
	// （例如在IE中加载iframe  - ＃4833）
	var documentElement = elem &&（elem.ownerDocument || elem）.documentElement; 
	return documentElement？documentElement.nodeName！==“HTML”：false; 
}; 

//公开支持变量以方便
支持= Sizzle.support = {}; 

/ **
 *基于当前文档设置一次与文档相关的变量
 * @param {Element | Object} [doc]用于设置文档的元素或文档对象
 * @returns {Object}返回当前文档
 * / 
setDocument = Sizzle。 setDocument = function（node）{ 
	var doc = node？node.ownerDocument || node：preferredDoc，
		parent = doc.defaultView; 

	//如果没有文档和documentElement可用，则返回
	if（doc === document || doc.nodeType！== 9 ||！doc.documentElement）{ 
		return document; 
	} 

	//设置我们的文档
	document = doc; 
	docElem = doc.documentElement; 

	//支持测试
	documentIsHTML =！isXML（doc）;

	//支持：IE> 8 
	//如果将iframe文档分配给“document”变量并且iframe已经重新加载，
	// IE将在访问“document”变量时抛出“permission denied”错误，请参阅jQuery＃13936 
	// IE6 -8不支持defaultView属性，因此
	如果（parent && parent.attachEvent && parent！== parent.top）{ 
		parent.attachEvent（“onbeforeunload”，function（）{ 
			setDocument（）; 
		}）; 
	} 

	/ * Attributes 
	---------------------------------------------- ------------------------ * / 

	//支持：IE <8 
	//确认getAttribute确实返回属性而不是属性（IE8布尔除外）
	support.attributes = assert（function（div）{ 
		div.className =“i”; 
		return！div.getAttribute（“className”）; 
	}）; 

	/ * getElement（s）By * 
	------------------------------------------ ---------------------------- * / 

	//检查getElementsByTagName（“*”）是否仅返回元素
	support.getElementsByTagName = assert（function （div）{ 
		div.appendChild（doc.createComment（“”））; 
		return！div.getElementsByTagName（“*”）。length; 
	}）; 

	//检查getElementsByClassName是否可以信任
	support.getElementsByClassName = assert（function（div）{ 
		div.innerHTML =“<div class ='a'> </ div> <div class ='a i'> </ div>” ;

		// Catch类over-caching 
		div.firstChild.className =“i”; 
		//支持：Opera <10 
		//抓住gEBCN找不到非领先类的失败
		返回div.getElementsByClassName（“i”）。length === 2; 
	}）; 

	//支持：IE <10 
	//检查getElementById是否按名称返回元素
	//破坏的getElementById方法不会获取编程集名称，
	//所以使用roundabout getElementsByName测试
	support.getById = assert（function（div） { 
		docElem.appendChild（div）.id = expando; 
		return！doc.getElementsByName ||！doc.getElementsByName（expando）.length; 
	}）; 

	// ID查找并过滤
	if（support.getById）{
		Expr.find [“ID”] = function（id，context）{ 
			if（typeof context.getElementById！== strundefined && documentIsHTML）{ 
				var m = context.getElementById（id）; 
				//检查parentNode以便在Blackberry 4.6返回时捕获
				//不再在文档中的节点＃6963 
				返回m && m.parentNode？[m]：[]; 
			} 
		}; 
		Expr.filter [“ID”] = function（id）{ 
			var attrId = id.replace（runescape，funescape）; 
			return function（elem）{ 
				return elem.getAttribute（“id”）=== attrId; 
			}; 
		}; 
	} else { 
		//支持：IE6 / 7 
		// getElementById作为查找快捷方式
		删除Expr 不可靠。

		Expr.filter [“ID”] = function（id）{ 
			var attrId = id.replace（runescape，funescape）; 
			return函数（elem）{ 
				var node = typeof elem.getAttributeNode！== strundefined && elem.getAttributeNode（“id”）; 
				return node && node.value === attrId; 
			}; 
		}; 
	} 

	//标签
	Expr.find [“TAG”] = support.getElementsByTagName？
		function（tag，context）{ 
			if（typeof context.getElementsByTagName！== strundefined）{ 
				return context.getElementsByTagName（tag）; 
			} 
		：
		function（tag，context）{ 
			var elem，
				tmp = []，
				i = 0，
				results = context。

			//过滤掉可能的注释
			if（tag ===“*”）{ 
				while（（elem = results [i ++]））{ 
					if（elem.nodeType === 1）{ 
						tmp.push（elem）; 
					} 
				} 

				返回TMP; 
			} 
			返回结果; 
		}; 

	//类
	Expr.find [“CLASS”] = support.getElementsByClassName && function（className，context）{ 
		if（typeof context.getElementsByClassName！== strundefined && documentIsHTML）{ 
			return context.getElementsByClassName（className）; 
		} 
	}; 

	/ * QSA / matchesSelector 
	--------------------------------------------- ------------------------- * / 

	// QSA和matchesSelector支持

	// matchesSelector（：active）在为true时报告为false（IE9 / Opera 11.5）
	rbuggyMatches = []; 

	// qSa（：focus）在为true时报告为false（Chrome 21）
	//我们允许这样做，因为IE8 / 9中的错误
	会在iframe上访问`document.activeElement`时抛出错误
	//所以，我们allow：焦点一直通过QSA以避免IE错误
	//见http://bugs.jquery.com/ticket/13378 
	rbuggyQSA = []; 

	if（（support.qsa = rnative.test（doc.querySelectorAll）））{ 
		//构建QSA正则表达式
		//从Diego Perini采用的正则表达式策略
		断言（函数（div）{ 
			// Select故意设置为空字符串
			//这是为了测试IE的未明确处理
			//设置一个布尔内容属性，
			//因为它的存在应该足够了
			// http://bugs.jquery.com/ticket/12359 
			div.innerHTML =“<select> <option selected =''> </ option> </选择>“; 

			//支持：IE8 
			//布尔属性和“值” 
			如果不正确处理（！div.querySelectorAll（“[selected]”）。length）{ 
				rbuggyQSA.push（“\\ [”+ whitespace +“*（？ ：value |“+ booleans +”）“）; 
			} 

			// Webkit / Opera  - ：checked应该返回选定的选项元素
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked 
			// IE8在这里抛出错误，不会看到后来测试
			是否（！div。
				rbuggyQSA.push（ “：检查”）; 
			} 
		}; 

		assert（function（div）{ 

			//支持：Opera 10-12 / IE8 
			// ^ = $ = * =和空值
			//不应选择任何内容
			//支持：Windows 8 Native Apps 
			//类型属性受限制.innerHTML赋值
			var input = doc.createElement（“input”）; 
			input.setAttribute（“type”，“hidden”）; 
			div.appendChild（input）.setAttribute（“t”，“”）; 

			if（div.querySelectorAll （“[t ^ ='']”）。length）{ 
				rbuggyQSA.push（“[* ^ $] =”+ whitespace +“*（？：''| \”\“）”）; 
			} 

			// FF 3.5  - ：启用/：
			// IE8在这里抛出错误，
			如果（！div.querySelectorAll（“：enabled”），则不会看到以后的测试.length）{ 
				rbuggyQSA.push（“：enabled”，“：disabled”）; 
			} 

			// Opera 10-11不会抛出逗号后无效的伪
			div.querySelectorAll（“*，：x”）; 
			rbuggyQSA.push（ “*：”）; 
		}）; 
	} 

	如果（（support.matchesSelector = rnative.test（（匹配= docElem.webkitMatchesSelector || 
		docElem.mozMatchesSelector || 
		docElem.oMatchesSelector || 
		docElem.msMatchesSelector））））{ 

		断言（函数（DIV）{ 
			//检查如果可以
			在断开连接的节点上执行matchesSelector //（IE 9）
			support.disconnectedMatch = matches.call（div，“div”）; 

			//这应该失败，异常
			// Gecko没有错误，返回false而不是
			matches.call（div，“[s！='']：x”）; 
			rbuggyMatches.push（“！=”，pseudos）; 
		}）; 
	} 

	rbuggyQSA = rbuggyQSA.length && new RegExp（rbuggyQSA.join（“|”））; 
	rbuggyMatches = rbuggyMatches.length && new RegExp（rbuggyMatches.join（“|”））; 

	/ *包含
	----------------------------------------------- ----------------------- * / 

	//元素包含另一个
	//有目的地不实现包含的后代
	//在中，元素不包含自身
	contains = rnative.test（docElem.contains）|| docElem.compareDocumentPosition？
		function（a，b）{ 
			var adown = a.nodeType === 9？a.documentElement：a，
				bup = b && b.parentNode; 
			返回=== bup || !!（bup && bup.nodeType === 1 &&（
				adown.contains？
					adown.contains（bup）：
					a.compareDocumentPosition && a.compareDocumentPosition（bup）＆16 
			））; 
		}：
		function（a，b）{ 
			if（b）{ 
				while（（b = b.parentNode））{ 
					if（b === a）{ 
						return true; 
					} 
				} 
			} 
			返回false; 
		}; 

	/ *排序
	-------------------------------------------------- -------------------- * / 

	//文档顺序排序
	sortOrder = docElem.compareDocumentPosition？
	function（a，b）{ 

		// 
		如果（a === b）{ 
			hasDuplicate = true，则重复删除标志; 
			返回0; 
		} 

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition（b）; 

		if（compare）{ 
			//断开连接的节点
			if（比较＆1 || 
				（！support.sortDetached && b.compareDocumentPosition（a）=== compare））{ 

				//选择与我们首选文档相关的第一个元素
				if（ a === doc || contains（preferredDoc，a））{
					返回-1; 
				} 
				if（b === doc || contains（preferredDoc，b））{ 
					return 1; 
				} 

				//维护原始订单
				返回sortInput？
					（indexOf.call（sortInput，a） -  indexOf.call（sortInput，b））：
					0; 
			} 

			return compare＆4？-1：1; 
		} 

		//不能直接比较，对方法的存在进行排序
		返回a.compareDocumentPosition？-1：1; 
	}：
	function（a，b）{ 
		var cur，
			i = 0，
			aup = a.parentNode，
			bup = b.parentNode，
			ap = [a]，
			bp = [b]; 

		//如果节点相同，则提前退出
		if（a === b）{ 
			hasDuplicate = true; 
			返回0; 

		//无父节点是文档还是已断开连接
		}否则if（！aup ||！bup）{ 
			return a === doc？-1：
				b === doc？1：
				aup？-1：
				bup？1：
				sortInput？
				（indexOf.call（sortInput，a） -  indexOf.call（sortInput，b））：
				0; 

		//如果节点是兄弟节点，我们可以快速检查
		}否则if（aup === bup）{ 
			return siblingCheck（a，b）; 
		} 

		//否则我们需要他们的祖先的完整列表进行比较
		cur = a; 
		while（（cur = cur.parentNode））{ 
			ap.unshift（cur）; 
		}
		cur = b; 
		while（（cur = cur.parentNode））{ 
			bp.unshift（cur）; 
		} 

		//走下树寻找差异
		而（ap [i] === bp [i]）{ 
			i ++; 
		} 

		回我？
			//做一个兄弟检查节点是否有一个共同的祖先
			siblingCheck（ap [i]，bp [i]）：

			//否则我们文档中的节点首先排序
			ap [i] === preferredDoc？-1：
			bp [i] === preferredDoc？1：
			0; 
	}; 

	返回文档; 
}; 

Sizzle.matches = function（expr，elements）{ 
	return Sizzle（expr，null，null，elements）; 
}; 

Sizzle.matchesSelector = function（elem，expr）{
	//如果需要，设置文档变量if 
	（（elem.ownerDocument || elem）！== document）{ 
		setDocument（elem）; 
	} 

	//确保引用属性选择器
	expr = expr.replace（rattributeQuotes，“='$ 1']”）; 

	if（support.matchesSelector && documentIsHTML && 
		（！rbuggyMatches ||！rbuggyMatches.test（expr））&& 
		（！rbuggyQSA ||！rbuggyQSA.test（expr）））{ 

		try { 
			var ret = matches.call（elem，expr） ; 

			// IE 9的matchesSelector在断开连接的节点上返回false 
			if（ret || support.disconnectedMatch || 
					//同样，断开的节点被称为
					在IE 9 中的文档//片段中
					elem.document && elem.document.nodeType！== 11）{ 
				return ret; 
			} 
		} catch（e）{} 
	} 

	返回Sizzle（expr，document，null，[elem]）。length> 0; 
}; 

Sizzle.contains = function（context，elem）{ 
	//如果需要，设置文档变量
	if（（context.ownerDocument || context）！== document）{ 
		setDocument（context）; 
	} 
	return contains（context，elem）; 
}; 

Sizzle.attr = function（elem，name）{ 
	//如果需要设置文档变量
	if（（elem.ownerDocument || elem）！== document）{ 
		setDocument（elem）; 
	} 

	var fn = Expr.attrHandle [name.toLowerCase（）]，
		//不要被Object.prototype属性（jQuery＃13807）愚弄
		val = fn && hasOwn.call（Expr.attrHandle，name.toLowerCase（））？
			fn（elem，name，！documentIsHTML）：
			undefined; 

	return val === undefined？
		support.attributes || ！documentIsHTML？
			elem.getAttribute（name）:( 
			val = elem.getAttributeNode（name））&& val.specified？
				val.value：
				null：
		val; 
}; 

Sizzle.error = function（msg）{ 
	throw new Error（“语法错误，无法识别的表达式：”+ msg）; 
}; 

/ ** 
 *文档排序和删除重复
 * @param {ArrayLike}结果
 * /
Sizzle.uniqueSort = function（results）{ 
	var elem，
		duplicates = []，
		j = 0，
		i = 0; 

	//除非我们*知道*我们可以检测到重复，否则假设它们的存在
	已经重复=！support.detectDuplicates; 
	sortInput =！support.sortStable && results.slice（0）; 
	results.sort（sortOrder）; 

	if（hasDuplicate）{ 
		while（（elem = results [i ++]））{ 
			if（elem === results [i]）{ 
				j = duplicates.push（i）; 
			} 
		} 
		而（j--）{ 
			results.splice（复制[J]，1）; 
		} 
	} 

	返回结果; 
}; 

/ **
 *用于检索DOM节点数组的文本值的实用函数
 * @param {Array | Element} elem 
 * / 
getText = Sizzle.getText = function（elem）{ 
	var node，
		ret =“”，
		i = 0，
		nodeType = elem.nodeType; 

	if（！nodeType）{ 
		//如果没有nodeType，这应该是
		（;（node = elem [i]）的数组; i ++）{ 
			//不要遍历注释节点
			ret + = getText（node）; 
		} 
	else if（nodeType === 1 || nodeType === 9 || nodeType === 11）{ 
		//使用textContent元素
		//删除innerText用法以保证新行的一致性（参见＃11153）
		if（typeof） elem.textContent ===“string”）{
			return elem.textContent; 
		} else { 
			//遍历其子
			节点（elem = elem.firstChild; elem; elem = elem.nextSibling）{ 
				ret + = getText（elem）; 
			} 
		} 
	}否则如果（节点类型=== 3 ||节点类型=== 4）{ 
		返回elem.nodeValue; 
	} 
	//不包括注释o 处理指令节点

	返回ret; 
}; 

Expr = Sizzle.selectors = { 

	//可以通过用户
	cacheLength：50，

	createPseudo：markFunction，

	match：matchExpr，

	attrHandle：{}，

	find：{}，

	relative：{ 
		“>”：{dir：“parentNode” ，第一：真}，
		“”：{dir：“parentNode”}，
		“+”：{dir：“previousSibling”，first：true}，
		“〜”：{dir：“previousSibling”} 
	}，

	preFilter：{ 
		“ATTR”：function（match） ）{ 
			match [1] = match [1] .replace（runescape，funescape）; 

			//移动给定值以匹配[3]无论引用
			匹配还是不带引号匹配[3] =（匹配[4] || match [5] ||“”）.replace（runescape，funescape）; 

			if（match [2] ===“〜=”）{ 
				match [3] =“”+ match [3] +“”; 
			} 

			return match.slice（0,4）; 
		}，

		“CHILD”：函数（匹配）{ 
			/ *匹配来自matchExpr [“CHILD”
				3参数（偶数|奇数| \ d * | \ d * n（[+  - ] \ d +）？| ...）
				xn + y参数的4 xn分量（[+  - ]？\ d * n |）
				xn分量的5个符号xn分量的
				6个
				符号y 分量的7个符号y分量的
				y y 
			* / 
			match [1] = match [1] .toLowerCase（）; 

			if（match [1] .slice（0,3）===“nth”）{ 
				// nth- *需要参数
				if（！match [3]）{ 
					Sizzle.error（match [0]）; 
				} 

				// Expr.filter.CHILD的数字x和y参数
				//记住false / true分别为0/1 
				匹配[4] = +（匹配[4]？匹配[5] +（匹配[6] | | 1）：2 *（匹配[3] ===“偶”||匹配[3] ===“奇数”））;
				match [5] = +（（match [7] + match [8]）|| match [3] ===“odd”）; 

			//其他类型禁止参数
			} else if（match [3]）{ 
				Sizzle.error（match [0]）; 
			} 

			return match; 
		}，

		“PSEUDO”：function（match）{ 
			var excess，
				unquoted =！match [5] && match [2]; 

			if（matchExpr [“CHILD”]。test（match [0]））{ 
				return null; 
			} 

			//接受引用的参数as-is 
			if（match [3] && match [4]！== undefined）{ 
				match [2] = match [4]; 

			//从不带引号的参数中
			删除多余的字符}否则if（unquoted && rpseudo.test（unquoted）&&
				（excess = tokenize（unquoted，true））&& 
				//前进到下一个右括号
				（excess = unquoted.indexOf（“）”，unquoted.length  -  excess） -  unquoted.length））{ 

				// excess是否定索引
				match [0] = match [0] .slice（0，excess）; 
				match [2] = unquoted.slice（0，excess）; 
			} 

			//仅返回伪过滤器方法所需的捕获（类型和参数）
			return match.slice（0,3）; 
		} 
	}，

	过滤器：{ 

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					回报pattern.test（！typeof运算elem.className === “串” && elem.className || typeof运算elem.getAttribute == strundefined && elem.getAttribute（ “类”）|| “”）; 
				}）; 
		}，

		“ATTR”：函数（名称，运算符，检查）{ 
			return function（elem）{ 
				var result = Sizzle.attr（elem，name）; 

				if（result == null）{ 
					return operator ===“！=”; 
				} 
				if（！operator）{ 
					return true; 
				} 

				result + =“”; 

				return operator ===“=”？结果=== check：
					operator ===“！=”？结果！==检查：
					运营商===“^ =”？check && result.indexOf（check）=== 0：
					operator ===“* =”？check && result.indexOf（check）> -1：
					operator ===“$ =”？check && result.slice（-check.length）=== check：
					operator ===“
					operator ===“| =”？结果===检查|| result.slice（0，check.length + 1）=== check +“ - ”：
					false; 
			}; 
		}，

		“CHILD”：function（type，what，argument，first，last）{ 
			var simple = type.slice（0,3）！==“nth”，
				forward = type.slice（-4）！==“最后“，
				ofType = what ===”of-type“; 

			首先返回=== 1 && last === 0？

				//快捷方式：nth  -  *（n）
				function（elem）{ 
					return !! elem.parentNode; 
				}：

				function（elem，context，xml）{ 
					var cache，outerCache，node，diff，nodeIndex，start，
						dir = simple！== forward？“nextSibling”：“
						name = ofType && elem.nodeName.toLowerCase（），
						useCache =！xml &&！ofType; 

					if（parent）{ 

						// :( first | last | only） - （child | of-type）
						if（simple）{ 
							while（dir）{ 
								node = elem; 
								while（（node = node [dir]））{ 
									if（ofType？node.nodeName.toLowerCase（）=== name：node.nodeType === 1）{ 
										return false; 
									} 
								} 
								//反向：only- *（如果我们还没有这样做）
								start = dir = type ===“only”&&！start &&“nextSibling”; 
							} 
							return true; 
						}

						开始= [前进？parent.firstChild：parent.lastChild]; 

						// non-xml：nth-​​child（...）将缓存数据存储在`parent` 
						if（forward && useCache）{ 
							//从先前缓存的索引中查找`elem` 
							outerCache = parent [expando] || （parent [expando] = {}）; 
							cache = outerCache [type] || []; 
							nodeIndex = cache [0] === dirruns && cache [1]; 
							diff = cache [0] === dirruns && cache [2]; 
							node = nodeIndex && parent.childNodes [nodeIndex]; 

							while（（node = ++ nodeIndex && node && node [dir] || 

								//从开始回退到寻找`elem` 
								（diff = nodeIndex = 0）|| start.pop（）））{

								//找到后，缓存`parent`上的索引并断开
								if（node.nodeType === 1 && ++ diff && node === elem）{ 
									outerCache [type] = [dirruns，nodeIndex，diff]; 
									打破; 
								} 
							} 

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										（节点[的expando] ||（节点[的expando] = {}））[类型] = [dirruns，DIFF]; 
									} 

									if（node === elem）{ 
										break; 
									} 
								} 
							} 
						} 

						//纳入的偏移，则核对周期大小
						存在- =最后; 
						return diff === first || （diff％first === 0 && diff / first> = 0）; 
					} 
				}; 
		}，

		“PSEUDO”：function（伪，参数）{ 
			//伪类名称不区分大小写
			// http://www.w3.org/TR/selectors/#pseudo-classes 
			//在大小写自定义的情况下按优先级排序pseudos用大写字母添加
			//记住setFilters继承自pseudos 
			var args，
				fn = Expr.pseudos [伪] || Expr.setFilters [pseudo.toLowerCase（）] || 
					Sizzle.error（“unsupported pseudo：”+ pseudo）; 

			//用户可以使用createPseudo来指示
			创建过滤函数需要//参数
			//正如Sizzle所做的那样
			（fn [expando]）{ 
				return fn（argument）; 
			}

			//但是
			如果（fn.length> 1）{ 
				args = [pseudo，pseudo，“”，argument]，则保持对旧签名的支持; 
				返回Expr.setFilters.hasOwnProperty（pseudo.toLowerCase（））？
					markFunction（function（seed，matches）{ 
						var idx，
							matched = fn（seed，argument），
							i = matched.length; 
						while（i-- ）{ 
							idx = indexOf.call（seed，matched [i]）; 
							seed [ idx] =！（匹配[idx] = matched [i]）; 
						} 
					}）：
					function（elem）{ 
						return fn（elem，0，args）; 
					}; 
			} 

			return fn; 
		} 
	}，

	假点：{
		//潜在复杂的伪
		“not”：markFunction（function（selector）{ 
			//修剪传递给编译的选择器
			//以避免将前导和尾随
			空格视为组合器
			var input = []，
				results = []，
				matcher = compile（selector.replace（rtrim，“$ 1”））; 

			返回匹配器[expando]？
				markFunction（函数（种子，匹配，上下文，xml）{ 
					var elem，unmatched 
						= matcher（seed，null，xml，[]），
						i = seed.length; 

					//匹配`matcher`无法匹配的元素
					while（
						i-- ）{ if（（elem = unmatched [i]））{ 
							seed [i] =！（matches [i] = elem）; 
						}
					} 
				}：
				function（elem，context，xml）{ 
					input [0] = elem; 
					matcher（输入，null，xml，结果）; 
					return！results.pop（）; 
				}; 
		}），

		“has”：markFunction（function（selector）{ 
			return function（elem）{ 
				return Sizzle（selector，elem）.length> 0; 
			}; 
		}），

		“contains”：markFunction（function（text）{ 
			return function （elem）{ 
				return（elem.textContent || elem.innerText || getText（elem））。indexOf（text）> -1; 
			}; 
		}），

		//“元素是否由：lang（）选择器表示
		//仅基于元素的语言值
		//等于标识符C，
		//或以标识符C开头，后面紧跟“ - ”。
		// C对元素语言值的匹配是不区分大小写的。
		//标识符C不必须是一个有效的语言名称。” 
		// http://www.w3.org/TR/selectors/#lang-pseudo 
		‘郎’：markFunction（函数（朗）{ 
			//朗value必须是有效的标识符
			if（！ridentifier.test（lang ||“”））{ 
				Sizzle.error（“unsupported lang：”+ lang）; 
			} 
			lang = lang.replace（runescape，funescape）.toLowerCase（）; 
			返回函数（elem）{ 
				var elemLang;
						elem.lang：
						elem.getAttribute（“xml：lang”）|| elem.getAttribute（“lang”）））{ 

						elemLang = elemLang.toLowerCase（）; 
						返回elemLang === lang || elemLang.indexOf（lang +“ - ”）=== 0; 
					} 
				}而（（ELEM = elem.parentNode）&& elem.nodeType === 1）; 
				返回虚假; 
			}; 
		}），

		//杂项
		“target”：function（elem）{ 
			var hash = window.location && window.location.hash; 
			return hash && hash.slice（1）=== elem.id; 
		}，

		“root”：function（elem）{ 
			return elem === docElem; 
		}，

		“focus”：function（elem）{
			return elem === document.activeElement &&（！document.hasFocus || document.hasFocus（））&& !!（elem.type || elem.href || ~elem.tabIndex）; 
		}，

		//布尔属性
		“enabled”：function（elem）{ 
			return elem.disabled === false; 
		}，

		“disabled”：function（elem）{ 
			return elem.disabled === true; 
		}，

		“checked”：function（elem）{ 
			//在CSS3中，：checked应返回已检查和选中的元素
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/# checked 
			var nodeName = elem.nodeName.toLowerCase（）; 
			return（nodeName ===“input”&& !! elem.checked）|| （nodeName ===“option”&& !! elem。选择的）; 
		}，

		“selected”：function（elem）{ 
			// 
			如果（elem.parentNode）{ 
				elem.parentNode.selectedIndex; 访问此属性，则
			在Safari中选择默认选项//选项正常工作。
			} 
			return elem.selected === true; 
		}，
		//内容
		“empty”：function（elem）{ 
			// http://www.w3.org/TR/selectors/#empty-pseudo 
			//：empty仅受元素节点和内容节点（包括文本）的影响（3），cdata（4）），
			//不评论，处理说明或其他
			//感谢Diego Perini获取nodeName快捷方式
			//大于“@”表示字母字符（特别是不以“＃”或“＃”开头） ？“）


			for（elem = elem.firstChild; elem; elem = elem.nextSibling）{ 
				if（elem.nodeName>“@”|| elem.nodeType === 3 || elem.nodeType === 4）{ 
					return false; 
				} 
			} 
			返回true; 
		}，

		“parent”：function（elem）{ 
			return！Expr.pseudos [“empty”]（elem）; 
		}，

		//元素/输入类型
		“header”：function（elem）{ 
			return rheader.test（elem.nodeName）; 
		}，

		“input”：function（elem）{ 
			return rinputs.test（elem.nodeName）; 
		}，

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		“last”：createPositionalPseudo（function（matchIndexes，length）{ 
			return [length  -  1]; 
		}），

		“eq”：createPositionalPseudo（function（matchIndexes，length，argument）{ 
			return [argument <0？argument + length：argument]; 
		}），

		“even”：createPositionalPseudo（function（matchIndexes，length）{ 
			var i = 0; 
			for （; i <length; i + = 2）{ 
				matchIndexes.push（i）; 
			} 
			return matchIndexes; 
		}），

		“odd”：createPositionalPseudo（function（matchIndexes，length）{ 
			var i = 1; 
			for（; i <length ; i + = 2）{ 
				matchIndexes.push（i）; 
			} 
			return matchIndexes; 
		}），

		“lt”：createPositionalPseudo（function（matchIndexes，length，argument）{
			var i =参数<0？参数+长度：参数; 
			for（; --i> = 0;）{ 
				matchIndexes.push（i）; 
			} 
			return matchIndexes; 
		}），

		“gt”：createPositionalPseudo（function（matchIndexes，length，argument）{ 
			var i = argument <0？argument + length：argument; 
			for（; ++ i <length;）{ 
				matchIndexes.push（i）; 
			} 
			return matchIndexes; 
		}）
	} 
}; 

Expr.pseudos [“nth”] = Expr.pseudos [“eq”]; 

//添加按钮/输入类型伪
（i in {radio：true，checkbox：true，file：true，password：true，image：true}）{ 
	Expr.pseudos [i] = createInputPseudo（i）; 
}
for（i in {submit：true，reset：true}）{ 
	Expr.pseudos [i] = createButtonPseudo（i）; 
} 

//用于创建新setFilters 
函数的简易API setFilters（）{} 
setFilters.prototype = Expr.filters = Expr.pseudos; 
Expr.setFilters = new setFilters（）; 

function tokenize（selector，parseOnly）{ 
	var matched，match，tokens，type，
		soFar，groups，preFilters，
		cached = tokenCache [selector +“”]; 

	if（cached）{ 
		return parseOnly？0：cached.slice（0）; 
	} 

	soFar = selector; 
	groups = []; 
	preFilters = Expr.preFilter; 

	while（soFar）{ 

		//逗号和第一次运行
		if（！matched ||（match = rcomma.exec（soFar）））{ 
			if（match）{ 
				//不要将尾随逗号用作有效的
				soFar = soFar.slice（match [0] .length）|| 至今; 
			} 
			groups.push（tokens = []）; 
		} 

		matched = false; 

		//组合
		if（（match = rcombinators.exec（soFar）））{ 
			matched = match.shift（）; 
			tokens.push（{ 
				value：matched，
				//将后代组合符转换为空格
				类型：match [0] .replace（rtrim，“”）
			}）; 
			soFar = soFar.slice（matched.length）; 
		} 

		//过滤器
		（在Expr.filter中输入）{
			if（（match = matchExpr [type] .exec（soFar））&&（！preFilters [type] || 
				（match = preFilters [type]（match））））{ 
				matched = match.shift（）; 
				tokens.push（{ 
					value：matched，
					type：type，
					matches：match 
				}）; 
				soFar = soFar.slice（matched.length）; 
			} 
		} 

		如果（匹配！）{ 
			打破; 
		} 
	} 

	//返回无效多余的长度
	//如果我们只是解析
	//否则，抛出一个错误或返回令牌
	返回PARSEONLY？
		soFar.length：
		soFar？
			Sizzle.error（selector）：
			//缓存令牌
			tokenCache（selector，groups）.slice（0）; 
} 

功能toSelector（令牌）{ 
	VAR I = 0，
		LEN = tokens.length，
		选择= “”; 
	for（; i <len; i ++）{ 
		selector + = tokens [i] .value; 
	} 
	回选择; 
} 

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			//我们无法在XML节点上设置任意数据，因此它们不会受益于dir缓存
			if（xml）{ 
				while（（elem = elem [dir]））{ 
					if（elem.nodeType === 1 | | checkNonElements）{ 
						if（matcher（elem，context，xml））{ 
							return true; 
						} 
					} 
				} 
			else { 
				while（（elem = elem [dir]））{
					if（elem.nodeType === 1 || checkNonElements）{ 
						outerCache = elem [expando] || （elem [expando] = {}）; 
						if（（cache = outerCache [dir]）&& cache [0] === dirkey）{ 
							if（（data = cache [1]）=== true || data === cachedruns）{ 
								return data === true ; 
							} 
						else { 
							cache = outerCache [dir] = [dirkey]; 
							cache [1] = matcher（elem，context，xml）|| cachedruns; 
							if（cache [1] === true）{ 
								return true; 
							} 
						} 
					} 
				} 
			} 
		}; 
} 

function elementMatcher（matchers）{ 
	return matchers.length > 1？
		function（elem，context，xml）{ 
			var i = matchers.length; 
			while（
				i-- ）{ if（！matchers [i]（elem，context，xml））{ 
					return false; 
				} 
			} 
			返回true; 
		}：
		matchers [0]; 
} 

功能冷凝（不匹配，地图，过滤器，上下文，XML）{ 
	VAR ELEM，
		newUnmatched = []，
		I = 0，
		LEN = unmatched.length，
		映射=地图！= NULL; 

	for（; i <len; i ++）{ 
		if（（elem = unmatched [i]））{ 
			if（！filter || filter（elem，context，xml））{ 
				newUnmatched.push（elem）; 
				if（mapped）{ 
					map.push（i）; 
				}
			} 
		} 
	} 

	返回newUnmatched; 
} 

功能setMatcher（预过滤器，选择器，匹配器，后置滤波器，postFinder，后选器）{ 
	如果（后滤波器&&后滤波器[的expando]！）{ 
		后滤波器= setMatcher（后滤波器）; 
	} 
	if（postFinder &&！postFinder [expando]）{ 
		postFinder = setMatcher（postFinder，postSelector）; 
	} 
	return markFunction（function（seed，results，context，xml）{ 
		var temp，i，elem，
			preMap = []，
			postMap = []，
			preexisting = results.length，

			//从种子或上下文中获取初始元素
			elems =种子|| multipleContexts（selector ||“*”，context.nodeType？[context]：context，[]），

			// Prefilter获取匹配器输入，保留种子结果同步的
			映射matcherIn = preFilter &&（seed ||！selector） ？
				压缩（elems，preMap，preFilter，context，xml）：
				elems，

			matcherOut = matcher？
				//如果我们有postFinder，或过滤的种子，或非种子postFilter或预先存在的结果，
				postFinder || （种子？preFilter：preexisting || postFilter）？

					// ...中间处理是必要的
					[]：

					// ...否则直接使用结果
					结果：
				matcherIn; 

		//查找主要匹配项
		if（matcher）{ 
			matcher（matcherIn，matcherOut，context，xml）; 
		} 

		//应用postFilter 
		if（postFilter）{ 
			temp = condense（matcherOut，postMap）; 
			postFilter（temp，[]，context，xml）; 

			//将失败的元素移回matcherIn 
			i = temp.length; 
			while（
				i  - ）{ if（（elem = temp [i]））{ 
					matcherOut [postMap [i]] =！（matcherIn [postMap [i]] = elem）; 
				} 
			} 
		} 

		如果（种子）{ 
			如果（postFinder ||预滤器）{ 
				如果（postFinder）{ 
					//通过缩合该中间成postFinder上下文获取最终matcherOut 
					温度= [];
					i = matcherOut.length; 
					while（
						i  - ）{ if（（elem = matcherOut [i]））{ 
							//恢复matcherIn因为elem还不是最终匹配
							temp.push（（matcherIn [i] = elem））; 
						} 
					} 
					postFinder（NULL，（matcherOut = []），温度，XML）; 
				} 

				//将匹配的元素从种子移动到结果以保持它们同步
				i = matcherOut.length; 
				while（
					i-- ）{ if（（elem = matcherOut [i]）&& 
						（temp = postFinder？indexOf.call（seed，elem）：preMap [i]）> -1）{ 

						seed [temp] =！（结果[temp] = elem）; 
					} 
				} 
			}

		//通过postFinder添加元素到结果，如果已定义
		} else { 
			matcherOut = condense（
				matcherOut === results？
					matcherOut.splice（preexisting，matcherOut.length）：
					matcherOut 
			）; 
			if（postFinder）{ 
				postFinder（null，results，matcherOut，xml）; 
			} else { 
				push.apply（results，matcherOut）; 
			} 
		} 
	}）; 
} 

功能matcherFromTokens（令牌）{ 
	VAR checkContext，匹配器，J，
		LEN = tokens.length，
		leadingRelative = Expr.relative [令牌[0] .TYPE]，
		implicitRelative = leadingRelative || Expr.relative [“”]，
		i = leadingRelative？1：0，

		//基础匹配器确保元素可以从顶级上下文访问
		matchContext = addCombinator（function（elem）{ 
			return elem === checkContext; 
		}，implicitRelative，true），
		matchAnyContext = addCombinator（function（elem）{ 
			return indexOf.call（checkContext，elem）> -1; 
		}，implicitRelative，true），
		matchers = [function（elem，context，xml）{ 
			return（！leadingRelative &&（xml || context！== outermostContext））|| （
				（checkContext = context）.nodeType？
					matchContext（elem，context，xml）：
					matchAnyContext（elem，context，xml））; 
		}]; 

	for（; i <len; i ++）{
		if（（matcher = Expr.relative [tokens [i] .type]））{ 
			matchers = [addCombinator（elementMatcher（matchers），matcher）]; 
		} else { 
			matcher = Expr.filter [tokens [i] .type] .apply（null，tokens [i] .matches）; 

			//在看到位置匹配器时返回特殊情况
			if（matcher [expando]）{ 
				//找到下一个相对运算符（如果有的话）以正确处理
				j = ++ i; 
				for（; j <len; j ++）{ 
					if（Expr.relative [tokens [j] .type]）{ 
						break; 
					} 
				} 
				返回setMatcher（
					I> 1 && elementMatcher（匹配器），
					I> 1个&& toSelector（
						//如果前面的标记是后代组合子，插入一个隐式的任意元素`*` 
						tokens.slice（0，i  -  1）.concat（{value：tokens [i  -  2] .type ===“”？ “*”：“”}）
					）。replace（rtrim，“$ 1”），
					matcher，
					i <j && matcherFromTokens（tokens.slice（i，j）），
					j <len && matcherFromTokens（（tokens = tokens.slice（ j））），
					j <len && toSelector（tokens）
				）; 
			} 
			matchers.push（匹配）; 
		} 
	} 

	返回elementMatcher（匹配器）; 
} 

功能matcherFromGroupMatchers（elementMatchers，
	var matcherCachedRuns = 0，
		bySet = setMatchers.length> 0，
		byElement = elementMatchers.length> 0，
		superMatcher = function（seed，context，xml，results，expandContext）{ 
			var elem，j，matcher，
				setMatched = []，
				matchedCount = 0，
				i =“0”，
				unmatched 
				= seed && []，outermost = expandContext！= null，
				contextBackup = outermostContext，
				//我们必须始终有种子元素或上下文
				elems = seed || byElement && Expr.find [“TAG”]（“*”，expandContext && context.parentNode || context），
				//使用整数dirruns iff这是最外层的匹配器
				dirrunsUnique =（dirruns + = contextBackup == null？1：Math.random（）|| 0.1）; 

			if（outermost）{ 
				outermostContext = context！== document && context; 
				cachedruns = matcherCachedRuns; 
			} 

			//添加元素直接传递给结果的元素
			//如果没有元素，请将`i`保持为字符串，这样`matchedCount`将在下面
			为“00” （;（elem = elems [i]）！= null; i ++） { 
				if（byElement && elem）{ 
					j = 0; 
					while（（matcher = elementMatchers [j ++]））{ 
						if（matcher（elem，context，xml））{ 
							results.push（elem）; 
							打破; 
						} 
					} 
					如果（最外）{
						dirruns = dirrunsUnique; 
						cachedruns = ++ matcherCachedRuns; 
					} 
				} 

				//用于设置过滤轨道无与伦比的元素
				，如果（bySet）{ 
					//他们将通过一切可能的匹配了
					IF（（ELEM =匹配&& ELEM）！）{ 
						matchedCount--; 
					} 

					//为每个元素延长数组，匹配与否
					如果（seed）{ 
						unmatched.push（elem）; 
					} 
				} 
			} 

			//应用组过滤器来匹配元素
			matchedCount + = I; 
			if（bySet && i！== matchedCount）{ 
				j = 0; 
				while（（matcher = setMatchers [j ++]））{
					matcher（不匹配，setMatched，context，xml）; 
				} 

				if（seed）{ 
					//重新
					积分元素匹配以消除排序的需要if（matchedCount> 0）{ 
						while（
							i  - ）{ if（！（unmatched [i] || setMatched [i]））{ 
								setMatched [ i] = pop.call（结果）; 
							} 
						} 
					} 

					//丢弃索引占位符值以获得实际仅匹配
					setMatched =冷凝（setMatched）; 
				} 

				//将匹配项添加到结果
				push.apply（results，setMatched）; 

				//无核集匹配成功匹配多个成功的匹配器规定排序
				if（outermost &&！seed && setMatched.length> 0 && 
					（matchedCount + setMatchers.length）> 1）{ 

					Sizzle.uniqueSort（results）; 
				} 
			} 

			//由嵌套的匹配覆盖全局的操纵
			如果（最外）{ 
				dirruns = dirrunsUnique; 
				outermostContext = contextBackup; 
			} 

			返回无与伦比; 
		}; 

	返回bySet？
		markFunction（superMatcher）：
		superMatcher; 
} 

compile = Sizzle.compile = function（selector，group / *仅供内部使用* /）{ 
	var i，
		setMatchers = []，
		elementMatchers = []，
		cached = compilerCache [selector +“”];

	if（！cached）{ 
		//生成递归函数的函数，可用于检查每个元素
		if（！group）{ 
			group = tokenize（selector）; 
		} 
		i = group.length; 
		while（
			i  - ）{ cached = matcherFromTokens（group [i]）; 
			if（cached [expando]）{ 
				setMatchers.push（cached）; 
			} else { 
				elementMatchers.push（cached）; 
			} 
		} 

		//缓存的编译函数
		缓存= compilerCache（选择器，matcherFromGroupMatchers（elementMatchers，setMatchers））; 
	} 
	return cached; 
}; 

function multipleContexts（selector，contexts，results）{ 
	var i = 0，
		len = contexts.length; 
	for（; i <len; i ++）{ 
		Sizzle（selector，contexts [i]，results）; 
	} 
	返回结果; 
} 

功能选择（选择器，上下文，结果，种子）{ 
	VAR I，令牌，令牌类型，查找
		匹配=记号化（选择器）; 

	if（！seed）{ 
		//如果只有一个组，
		则尝试最小化操作if （match.length === 1）{ 

			//如果根选择器是ID 
			tokens = match [0]，请选择快捷方式并设置上下文] = match [0] .slice（0）; 
			if（tokens.length> 2 &&（token = tokens [0]）。type ===“ID”&& 
					support.getById && context.nodeType === 9 && documentIsHTML && 
					Expr。

				context =（Expr.find [“ID”]（token.matches [0] .replace（runescape，funescape），context）|| []）[0]; 
				if（！context）{ 
					return results; 
				} 
				selector = selector.slice（tokens.shift（）。value.length）; 
			} 

			//取一个种子为从右到左匹配设定
			I = matchExpr [“needsContext”]。试验（选择器）？0：tokens.length; 
			while（
				i-- ）{ token = tokens [i]; 

				//如果我们击中组合器
				if（Expr.relative [（type = token.type）]）{ 
					break; 
				} 
				if（（find = Expr.find [type]））{ 
					//搜索，扩展主导兄弟组合子的上下文
					if（（seed = find（
						token.matches [0] .replace（runescape，funescape），
						rsibling.test（tokens [0] .type）&& context.parentNode || context 
					）））{ 

						//如果种子是空的或没有遗留的标记，我们可以返回早期的
						tokens.splice（i，1）; 
						selector = seed.length && toSelector（tokens）; 
						if（！selector）{ 
							push.apply（results，seed）; 
							返回结果; 
						} 

						打破; 
					} 
				} 
			} 
		} 
	} 

	//编译并执行过滤功能
	//如果我们修改上面的选择器提供`match`避免retokenization 
	编译（选择器，匹配）（
		种子，
		context，
		！documentIsHTML，
		results，
		rsibling.test（selector）
	）; 
	返回结果; 
} 

//一次性分配

//排序稳定性
support.sortStable = expando.split（“”）。sort（sortOrder）.join（“”）=== expando; 

//支持：Chrome <14 
//如果未将其传递给比较函数
support.detectDuplicates = hasDuplicate，则始终假设重复项。

//针对默认文档
setDocument（）初始化; 

//支持：Webkit <537.32  -  Safari 6.0.3 / Chrome 25（在Chrome 27中修复）
//分离的节点混淆地遵循* each * 
support.sortDetached = assert（function（div1）{
	//应返回1，但返回4（以下）
	返回div1.compareDocumentPosition（document.createElement（“div”））＆1; 
}）; 

//支持：IE <8 
//防止属性/属性“插入” 
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx 
if（！assert（function（ div）{ 
	div.innerHTML =“<a href='#'> </a>”; 
	返回div.firstChild.getAttribute（“href”）===“＃”; 
}））{ 
	addHandle（“type | href | height | width“，function（elem，name，isXML）{ 
		if（！isXML）{ 
			return elem.getAttribute（name，name.toLowerCase（）===”type“？1：2）; 
		} 
	}）; 
} 

//支持：
//使用defaultValue代替getAttribute（“value”）
if（！support.attributes ||！assert（function（div）{ 
	div.innerHTML =“<input />”; 
	div.firstChild.setAttribute（“value”， “”）; 
	返回div.firstChild.getAttribute（“value”）===“”; 
}}）{ 
	addHandle（“value”，function（elem，name，isXML）{ 
		if（！isXML && elem.nodeName.toLowerCase （）===“input”）{ 
			return elem.defaultValue; 
		} 
	}）; 
} 

//支持：IE <9 
//当getAttribute位于
if 时，使用getAttributeNode获取布尔值（！assert（function（div）{ 
	return div.getAttribute（“disabled”）== null;
		var val; 
		if（！isXML）{ 
			return（val = elem.getAttributeNode（name））&& val.specified？
				val.value：
				elem [name] === true？name.toLowerCase（）：null; 
		} 
	}; 
} 

jQuery.find =灒; 
jQuery.expr = Sizzle.selectors; 
jQuery.expr [“：”] = jQuery.expr.pseudos; 
jQuery.unique = Sizzle.uniqueSort; 
jQuery.text = Sizzle.getText; 
jQuery.isXMLDoc = Sizzle.isXML; 
jQuery.contains = Sizzle.contains; 


}）（窗口）; 
// String to Object选项格式cache 
var optionsCache = {}; 

//将字符串格式的选项转换为对象格式的选项并存储在缓存
函数createOptions（options）{
	var object = optionsCache [options] = {}; 
	jQuery.each（options.match（core_rnotwhite）|| []，function（_，flag）{ 
		object [flag] = true; 
	}）; 
	返回对象; 
} 

/ * 
 *使用以下参数创建一个回调列表：
 * 
 *选择：空间分隔的选项可选列表将改变
 *回调列表中表现还是比较传统的选择对象
 * 
 *默认情况下的回调列表会像一个事件回调列表，可以
 多次*“触发”。
 * 
 *可能的选项：
 * 
 *一次：将确保回调列表只能被触发一次（如延期）
 *
 * memory：将跟踪之前的值，并
 在使用最新的“memorized” 
 *值（如Deferred）
 * 
 * unique之后立即激活列表后调用任何回调* 将确保回调只能添加一次（列表中没有重复）
 * 
 * stopOnFalse：当回调返回false时中断调用
 * 
 * / 
jQuery.Callbacks = function（options）{ 

	//如果需要，将选项从String格式转换为Object格式
	//（我们签入cache first）
	options = typeof options ===“string”？
		（optionsCache [options] || createOptions（options））：
		jQuery.extend（{}，options）;

	var //上次触发值（对于不可忘记的列表）
		内存，
		//标记是否已触发列表已
		触发，
		//标记列表当前是否触发
		触发，
		//第一次回调触发（内部使用添加和fireWith）
		firingStart，
		//触发
		kickLength 时的循环结束，
		//当前触发回调的索引（如果需要
		，通过删除修改）firingIndex，
		//实际回调列表
		list = []，
		//可重复列表的火灾调用堆栈
		stack =！options.once && []，
		// Fire callbacks 
		fire = function（data）{ 
			memory = options.memory && data;
			fired = true; 
			firingIndex = firingStart || 0; 
			firingStart = 0; 
			firingLength = list.length; 
			firing = true; 
			for（; list && firingIndex <firingLength; firingIndex ++）{ 
				if（list [firingIndex] .apply（data [0]，data [1]）=== false && options.stopOnFalse）{ 
					memory = false; //使用add 
					break 防止进一步调用; 
				} 
			} 
			firing = false; 
			if（list）{ 
				if（stack）{ 
					if（stack.length）{ 
						fire（stack.shift（））; 
					} 
				}否则如果（存储器）{ 
					列表= []; 
				} else { 
					self.disable（）; 
				}
			} 
		，
		//实际回调对象
		self = { 
			//向列表中
			添加回调或回调集合add：function（）{ 
				if（list）{ 
					//首先，我们保存当前长度
					var start = list.length ; 
					（function add（args）{ 
						jQuery.each（args，function（_，arg）{ 
							var type = jQuery.type（arg）; 
							if（type ===“function”）{ 
								if（！options.unique ||！ self.has（arg））{ 
									list.push（arg）; 
								} 
							} else if（arg && arg.length && type！==“string”）{ 
								// Inspect递归
								添加（arg）; 
							}
						}）; 
					}）（参数）; 
					//我们是否需要将回调添加到
					//当前触发批处理？
					if（firing）{ 
						firingLength = list.length; 
					//对于记忆，如果我们没有射击那么
					//我们应该马上打电话
					}如果（记忆）{ 
						firingStart = start; 
						火（记忆）; 
					} 
				} 
				返回这一点; 
			}，
			//从列表中
			删除回调remove：function（）{ 
				if（list）{ 
					jQuery.each（arguments，function（_，arg）{ 
						var index; 
						while（（index = jQuery.inArray（arg，list， index））> -1）{
							list.splice（index，1）; 
							//处理触发索引
							如果（触发）{ 
								if（index <= firingLength）{ 
									firingLength--; 
								} 
								if（index <= firingIndex）{ 
									firingIndex--; 
								} 
							} 
						} 
					; 
				} 
				返回这一点; 
			}，
			//检查给定的回调是否在列表中。
			//如果没有给出参数，则返回列表是否附加了回调。
			has：function（fn）{ 
				return fn？jQuery.inArray（fn，list）> -1：!!（list && list.length）; 
			}，
			//从列表中删除所有回调
			empty：function（）{ 
				list = []; 
				firingLength = 0; 
				归还这个; 
			}，
			//让列表不再执行任何操作
			disable：function（）{ 
				list = stack = memory = undefined; 
				归还这个; 
			}，
			//它被禁用了吗？
			disabled：function（）{ 
				return！list; 
			}，
			//将列表锁定在当前状态
			锁定中：function（）{ 
				stack = undefined; 
				if（！memory）{ 
					self.disable（）; 
				} 
				返回这一点; 
			}，
			//它被锁定了吗？
			locked：function（）{ 
				return！stack; 
			}，
			//使用给定的上下文和参数调用所有回调
			fireWith：function（context，args）{ 
				if（list &&（！fired || stack））{ 
					args = args || []; 
					args = [context，args.slice？args.slice（）：args]; 
					if（firing）{ 
						stack.push（args）; 
					} else { 
						fire（args）; 
					} 
				} 
				返回这一点; 
			}，
			//使用给定的参数调用所有回调
			fire：function（）{ 
				self.fireWith（this，arguments）; 
				归还这个; 
			}，
			//要知道回调是否至少一次被调用过
			：function（）{
				返回!!解雇 
			} 
		}; 

	回归自我; 
}; 
jQuery.extend（{ 

	Deferred：function（func）{ 
		var tuples = [ 
				// action，add listener，listener list，final state 
				[“resolve”，“done”，jQuery.Callbacks（“once memory”），“resolved” ]，
				[“拒绝”，“失败”，jQuery.Callbacks（“一次记忆”），“拒绝”]，
				[“通知”，“进度”，jQuery.Callbacks（“记忆”）] 
			]，
			州=“待定” “，
			promise = { 
				state：function（）{ 
					return state; 
				}，
				always：function（）{ 
					deferred。完成（参数）.fail（参数）; 
					归还这个; 
				}，
				那么：function（/ * fnDone，fnFail，fnProgress * /）{ 
					var fns = arguments; 
					return jQuery.Deferred（function（newDefer）{ 
						jQuery.each（tuples，function（i，tuple）{ 
							var action = tuple [0]，
								fn = jQuery.isFunction（fns [i]）&& fns [i]; 
							//延迟[done | fail | progress]将转发动作转发给newDefer 
							deferred [tuple [1]]（function（）{ 
								var returns = fn && fn.apply（this，arguments）; 
								if（返回&& jQuery.isFunction（returns.promise） ））{ 
									returned.promise（）。
										done（newDefer.resolve）
										.fail（newDefer.reject）
										.progress（newDefer.notify）;
								} else { 
									newDefer [action +“With”]（这= = promise？newDefer.promise（）：this，fn？[return]：arguments）; 
								} 
							}; 
						}）; 
						fns = null; 
					}）。诺言（）; 
				}，
				//获得延迟的承诺
				//如果提供了obj，则将promise方面添加到对象
				promise：function（obj）{ 
					return obj！= null？jQuery.extend（obj，promise）：promise; 
				} 
			，
			deferred = {}; 

		//保持管道为back-compat 
		promise.pipe = promise.then; 

		//添加特定于列表的方法
		jQuery.each（元组，函数（i，tuple）{
			var list = tuple [2]，
				stateString = tuple [3]; 

			//承诺[完成| 失败| progress] = list.add 
			promise [tuple [1]] = list.add; 

			//处理状态
			if（stateString）{ 
				list.add（function（）{ 
					// state = [resolved | rejected] 
					state = stateString; 

				// [reject_list | resolve_list] .disable; progress_list.lock 
				}，tuples [i ^ 1 ] [2] .disable，元组[2] [2] .lock）; 
			} 

			// deferred [resolve | 拒绝| notify] 
			deferred [tuple [0]] = function（）{ 
				deferred [tuple [0] +“With”]（这= = deferred？promise：this，arguments）; 
				归还这个; 
			};
			deferred [tuple [0] +“With”] = list.fireWith; 
		}）; 

		//使延期承诺
		promise.promise（延期）; 

		//调用给定的func if 
		if（func）{ 
			func.call（deferred，deferred）; 
		} 

		//全部完成！
		延期退货; 
	}，

	// Deferred helper 
	when：function（subordinate / *，...，subordinateN * /）{ 
		var i = 0，
			resolveValues = core_slice.call（arguments），
			length = resolveValues.length，

			//未完成的下属的数量
			剩余=长度！== 1 || （subordinate && jQuery.isFunction（subordinate.promise））？长度：0，

			//主人延期。如果resolveValues只包含一个Deferred，那就使用它。
			延迟=剩余=== 1？subordinate：jQuery.Deferred（），

			//解析和进度值的更新函数
			updateFunc = function（i，contexts，values）{ 
				return function（value）{ 
					contexts [i] = this; 
					values [i] = arguments.length> 1？core_slice.call（arguments）：value; 
					if（values === progressValues）{ 
						deferred.notifyWith（contexts，values）; 
					} else if（！（--remaining））{ 
						deferred.resolveWith（contexts，values）; 
					} 
				}; 
			}，

			progressValues，progressContexts，resolveContexts;

		//将侦听器添加到Deferred下属; 待人为已解决
		如果（长度> 1）{ 
			progressValues =新阵列（长度）; 
			progressContexts = new Array（length）; 
			resolveContexts = new Array（length）; 
			为（; I <长度;我++）{ 
				如果（resolveValues [I] && jQuery.isFunction（resolveValues [I] .promise））{ 
					resolveValues [I] .promise（）
						.done（updateFunc（I，resolveContexts，resolveValues））
						.fail（deferred.reject）
						.progress（updateFunc（i，progressContexts，progressValues））; 
				} else { 
					--remaining; 
				} 
			} 
		} 

		//如果我们没有任何东西等待，解析主
		if（！remaining）{ 
			deferred.resolveWith（resolveContexts，resolveValues）; 
		} 

		return deferred.promise（）; 
	} 
}; 
jQuery.support =（function（support）{ 
	var input = document.createElement（“input”），
		fragment = document.createDocumentFragment（），
		div = document.createElement（“div”），
		select = document.createElement（“select” ），
		opt = select.appendChild（document.createElement（“option”））; 

	//在有限的环境中尽早完成
	if（！input.type）{ 
		return support; 
	} 

	input.type =“checkbox”; 

	//支持：Safari 5.1，iOS 5.1，Android 4.x，Android 2.3
	//检查默认复选框/单选格值（旧WebKit上的“”;其他地方的“on”）
	support.checkOn = input.value！==“”; 

	//必须访问父级才能正确选择
	//支持：IE9，IE10 
	support.optSelected = opt.selected; 

	//稍后会定义
	support.reliableMarginRight = true; 
	support.boxSizingReliable = true; 
	support.pixelPosition = false; 

	//确保已正确克隆已检查状态
	//支持：IE9，IE10 
	input.checked = true; 
	support.noCloneChecked = input.cloneNode（true）.checked; 

	//确保禁用选项内的选项未标记为已禁用
	//（WebKit将其标记为已禁用）
	select.disabled = true; 
	support.optDisabled =！opt.disabled; 

	//检查输入在成为无线电后是否保持其值
	//支持：IE9，IE10 
	input = document.createElement（“input”）; 
	input.value =“t”; 
	input.type =“radio”; 
	support.radioValue = input.value ===“t”; 

	//＃11217  - 当名称在checked属性
	input.setAttribute（“checked”，“t”）之后，WebKit丢失检查; 
	input.setAttribute（“name”，“t”）; 

	fragment.appendChild（input）; 

	//支持：Safari 5.1，Android 4.x，Android 2.3 
	//旧的WebKit在片段
	支持中没有正确克隆已检查状态。

	//支持：Firefox，Chrome，Safari 
	//谨防CSP限制（https://developer.mozilla.org/en/Security/CSP)support.focusinBubbles 
	=“onfocusin”在窗口中; 

	div.style.backgroundClip =“content-box”; 
	div.cloneNode（true）.style.backgroundClip =“”; 
	support.clearCloneStyle = div.style.backgroundClip ===“content-box”; 

	//在doc ready 
	jQuery 运行需要正文的测试（function（）{ 
		var container，marginDiv，
			//支持：Firefox，Android 2.3（前缀框大小版本）
			.divReset =“padding：0; margin：0; border ：0; display：block; -webkit-box-sizing：content-box; -moz-box-sizing：content-box; box-sizing：content-box“，
			body = document.getElementsByTagName（”

		if（！body）{ 
			//返回没有正文
			返回的frameset文档; 
		} 

		container = document.createElement（“div”）; 
		container.style.cssText =“border：0; width：0; height：0; position：absolute; top：0; left：-9999px; margin-top：1px”; 

		//检查框大小和边距行为。
		body.appendChild（container）.appendChild（div）; 
		div.innerHTML =“”; 
		//支持：Firefox，Android 2.3（前缀框大小版本）。
		div.style.cssText =“ -  webkit-box-sizing：border-box; -moz-box-sizing：border-box; box-sizing：border-box; padding：1px; border：1px; display：block; width ：4像素;边距：1％;位置：绝对的;顶部：1％“;

		//有一些非-1值的身体缩放，票＃13543 
		jQuery.swap（body，body.style.zoom！= null？{zoom：1}：{}，function（）{ 
			support.boxSizing = div.offsetWidth === 4; 
		}）; 

		//使用window.getComputedStyle，因为node.js上的jsdom会在没有它的情况下中断。
		if（window.getComputedStyle）{ 
			support.pixelPosition =（window.getComputedStyle（div，null）|| {}）。top！==“1％”; 
			support.boxSizingReliable =（window.getComputedStyle（div，null）|| {width：“4px”}）。width ===“4px”; 

			//支持：Android 2.3 
			//检查具有明确宽度且没有边距的div是否错误
			//根据容器宽度计算margin-right。（＃3333）
			// WebKit Bug 13343  -  getComputedStyle为margin-right 
			marginDiv = div.appendChild（document.createElement（“div”））返回错误的值; 
			marginDiv.style.cssText = div.style.cssText = divReset; 
			marginDiv.style.marginRight = marginDiv.style.width =“0”; 
			div.style.width =“1px”; 

			support.reliableMarginRight = 
				！parseFloat（（window.getComputedStyle（marginDiv，null）|| {}）。marginRight）; 
		} 

		body.removeChild（container）; 
	}）; 

	返回支持; 
}）（{}）; 

/ * 
	实现摘要

	1.通过1.9.x分支实现API表面和语义兼容性
	2.通过减少存储来提高模块的可维护性
		单一机制的路径。
	3.使用相同的单一机制来支持“私有”和“用户”数据。
	4. _Never_将“私有”数据暴露给用户代码（TODO：Drop _data，_removeData）
	5。避免暴露用户对象的实现细节（例如，expando属性）
	6。为2014年
* / 
var的WeakMap实现升级提供明确的路径data_user，data_priv，
	rbrace = /（？：\ {[\ s \ S] * \} | \ [[\ s \ S] * \]）$ /，
	rmultiDash = /（[AZ]）/ g; 

function Data（）{ 
	//支持：Android <4，
	//旧WebKit没有Object.preventExtensions / freeze方法，
	//返回新的空对象，而没有[[set]]访问者
	Object.defineProperty（this.cache = {}，0，{
		get：function（）{ 
			return {}; 
		} 
	}; 

	this.expando = jQuery.expando + Math.random（）; 
} 

Data.uid = 1; 

Data.accepts = function（owner）{ 
	//仅接受：
	//  - 节点
	//  -  Node.ELEMENT_NODE 
	//  -  Node.DOCUMENT_NODE 
	//  - 对象
	//  - 任何
	返回owner.nodeType？
		owner.nodeType === 1 || owner.nodeType === 9：true; 
}; 

Data.prototype = { 
	key：function（owner）{ 
		//我们可以接受现代浏览器中非元素节点的数据，
		//但我们不应该，请参阅＃8335。
		//始终返回冻结对象的键。
		if（！Data.accepts（owner））{ 
			return 0; 
		} 

		var descriptor = {}，
			//检查所有者对象是否已有缓存密钥
			unlock = owner [this.expando]; 

		//如果没有，请创建一个
		if（！unlock）{ 
			unlock = Data.uid ++; 

			//将其保存在不可枚举的不可写属性中
			try { 
				descriptor [this.expando] = {value：unlock}; 
				Object.defineProperties（所有者，描述符）; 

			//支持：Android <4 
			//回退到不太安全的定义
			} catch（e）{ 
				descriptor [this.expando] = unlock; 
				jQuery.extend（所有者，描述符）; 
			} 
		}

		//确保缓存对象
		if（！this.cache [unlock]）{ 
			this.cache [unlock] = {}; 
		} 

		return unlock; 
	}，
	set：function（所有者，数据，值）{ 
		var prop，
			//可能会为此节点分配一个解锁，
			//如果此“所有者”没有条目，则创建一个内联
			//并设置解锁好像所有者条目一直存在
			unlock = this.key（owner），
			cache = this.cache [unlock]; 

		//句柄：[owner，key，value] args 
		if（typeof data ===“string”）{ 
			cache [data] = value; 

		//句柄：[owner，{properties}] args 
		} else {
			// 
			如果（jQuery.isEmptyObject（cache））{ 
				jQuery.extend（this.cache [unlock]，data）; 对象的新分配是浅层复制的; 
			//否则，将属性逐个复制到缓存对象
			} else { 
				for（prop in data）{ 
					cache [prop] = data [prop]; 
				} 
			} 
		} 
		返回缓存; 
	}，
	get：function（owner，key）{ 
		//找到或将创建有效的缓存。
		//将创建新的缓存并返回解锁，
		//允许直接访问新创建的
		//空数据对象。必须提供有效的所有者对象。
		var cache = this.cache [this.key（owner）];

		返回键=== undefined？
			cache：cache [key]; 
	}，
	访问：功能（所有者，键，值）{ 
		VAR存储; 
		//在以下情况中：
		// 
		// 1.未指定密钥
		// 2. 指定了字符串密钥，但未提供任何值
		// 
		//采用“读取”路径并允许get方法确定
		//要返回的值，分别是：
		// 
		// 1.整个缓存对象
		// 2.存储在键的数据
		// 
		if（key === undefined || 
				（（key && typeof key ===“string “）&& value === undefined））{ 

			stored = this.get（owner，key）; 

			返回存储！
				stored：this.get（owner，jQuery.camelCase（key））; 
		} 

		// [*]当键不是字符串，或
		指定键和值//时，使用以下任
		一项设置或扩展（现有对象）：
		// // 1.属性对象
		// 2. A键和值
		// 
		this.set（所有者，键，值）; 

		//由于“set”路径可以有两个可能的入口点
		//根据采用的路径返回预期的数据[*] 
		返回值！== undefined？价值：关键; 
	}，
	remove：function（owner，key）{ 
		var i，name，camel，
			unlock = this.key（owner），
			cache = this.cache [unlock]; 

		if（key === undefined）{
			this.cache [unlock] = {}; 

		} else { 
			//支持数组或空格分隔的键，
			如果（jQuery.isArray（key））{ 
				//如果“name”是键数组... 
				//最初创建数据时，通过（“key” ，“val”）签名，
				//键将转换为camelCase。
				//由于没有办法告诉_how_添加了一个密钥，删除
				//普通密钥和camelCase密钥。＃12786 
				//这只会惩罚数组参数路径。
				name = key.concat（key.map（jQuery.camelCase））; 
			} else { 
				camel = jQuery.camelCase（key）; 
				//在任何操作
				if 之前尝试将字符串作为键（缓存中的键）{
					name = [key，camel]; 
				} else { 
					//如果存在带空格的键，请使用它。
					//否则，通过匹配非空白
					名称= camel来创建数组; 
					name =缓存中的名称？
						[name] :( name.match（core_rnotwhite）|| []）; 
				} 
			} 

			I = name.length; 
			while（
				i  - ）{ delete cache [name [i]]; 
			} 
		} 
	}，
	hasData：功能（所有者）{ 
		返回jQuery.isEmptyObject（！
			this.cache [所有者[this.expando]] || {} 
		）; 
	}，
	discard：function（owner）{ 
		if（owner [this.expando]）{
			删除this.cache [owner [this.expando]]; 
		} 
	} 
}; 

//这些可以在整个jQuery核心代码库中使用
data_user = new Data（）; 
data_priv = new Data（）; 


jQuery.extend（{ 
	acceptData：Data.accepts，

	hasData：功能（ELEM）{ 
		返回data_user.hasData（ELEM）|| data_priv.hasData（ELEM）; 
	}，

	数据：功能（ELEM，名称，数据）{ 
		返回data_user。 access（elem，name，data）; 
	}，

	removeData：function（elem，name）{ 
		data_user.remove（elem，name）; 
	}，

	// TODO：现在所有对_data和_removeData的调用都已被替换
	//直接调用data_priv方法，可以不推荐使用这些方法。
	_data：function（elem，name，data）{ 
		return data_priv.access（elem，name，data）; 
	}，

	_removeData：function（elem，name）{ 
		data_priv.remove（elem，name）; 
	} 
}; 

jQuery.fn.extend（{ 
	data：function（key，value）{ 
		var attrs，name，
			elem = this [0]，
			i = 0，
			data = null; 

		//获取所有值
		if（key === undefined）{ 
			if（this.length）{ 
				data = data_user.get（elem）; 

				if（elem.nodeType === 1 &&！data_priv.get（elem，“hasDataAttrs”））{ 
					attrs = elem.attributes;
					for（; i <attrs.length; i ++）{ 
						name = attrs [i] .name; 

						if（name.indexOf（“data-”）=== 0）{ 
							name = jQuery.camelCase（name.slice（5））; 
							dataAttr（elem，name，data [name]）; 
						} 
					} 
					data_priv.set（ELEM “hasDataAttrs”，TRUE）; 
				} 
			} 

			返回数据; 
		} 

		//设置多个值
		if（typeof key ===“object”）{ 
			return this.each（function（）{ 
				data_user.set（this，key）; 
			}）; 
		} 

		返回jQuery.access（此，函数（值）{ 
			VAR数据，
				camelKey = jQuery.camelCase（键）;

			//调用jQuery对象（元素匹配）不为空
			//（因此在[0]处出现一个元素）并且
			//“value”参数未定义。一个空的jQuery对象
			//将导致elem = this [0]的`undefined`，
			如果尝试读取数据缓存，它将//抛出异常。
			if（elem && value === undefined）{ 
				//尝试从
				密钥中获取数据//使用密钥as-is 
				data = data_user.get（elem，key）; 
				if（data！== undefined）{ 
					return data; 
				} 

				//试图从缓存获取数据
				//与密钥骆驼源化的
				数据= data_user.get（ELEM，camelKey）;
				if（data！== undefined）{ 
					return data; 
				} 

				//尝试“发现” 
				// HTML5自定义数据中的数据 -  * attrs 
				data = dataAttr（elem，camelKey，undefined）; 
				if（data！== undefined）{ 
					return data; 
				} 

				//我们努力尝试，但数据不存在。
				返回; 
			} 

			//设置数据... 
			）{this.each（函数（
				//首先，试图存储任何的副本或引用
				//数据可能已经存储与关键驼峰。
				VAR数据= data_user.get （this，camelKey）; 

				//对于HTML5 data- *属性互操作，我们必须
				//使用破折号以camelCase形式存储属性名称。
				//这可能不适用于所有属性... * 
				data_user.set（this，camelKey，value）; 

				// * ...对于可能_actually_ 
				//有破折号的属性，我们还需要存储该
				//未更改属性的副本。
				if（key.indexOf（“ - ”）！== -1 && data！== undefined）{ 
					data_user.set（this，key，value）; 
				} 
			}; 
		}，null，value，arguments.length> 1，null，true）; 
	}，

	removeData：function（key）{ 
		return this.each（function（）{ 
			data_user.remove（this，key）; 
		}）; 
	} 
};

function dataAttr（elem，key，data）{ 
	var name; 

	//如果在内部找不到任何内容，请尝试
	从HTML5 data- *属性获取任何//数据
	if（data === undefined && elem.nodeType === 1）{ 
		name =“data-”+ key.replace（ rmultiDash，“ -  $ 1”）。toLowerCase（）; 
		data = elem.getAttribute（name）; 

		if（typeof data ===“string”）{ 
			try { 
				data = data ===“true”？true：
					data ===“false”？false：
					data ===“null”？null：
					//只有在不更改字符串
					+ data +“”=== data 时才转换为数字？+ data：
					rbrace.test（数据）？JSON.parse（数据）：
					数据; 
			} catch（e）{}

			//确保我们设置数据，以便以后不会更改
			data_user.set（elem，key，data）; 
		} else { 
			data = undefined; 
		} 
	} 
	返回数据; 
} 
jQuery.extend（{ 
	队列：功能（ELEM，类型，数据）{ 
		VAR队列; 

		如果（ELEM）{ 
			式=（类型|| “FX”）+ “队列”; 
			队列= data_priv.get（ELEM，类型） ; 

			//如果这只是一个查询
			if（data）{ 
				if（！queue || jQuery.isArray（data））{ 
					queue = data_priv.access（elem，type，jQuery.makeArray（data） ））; 
				} else { 
					queue.push（data）; 
				} 
			}
			返回队列|| []; 
		} 
	}，

	出列：功能（ELEM，类型）{ 
		类型=类型|| “FX”; 

		var queue = jQuery.queue（elem，type），
			startLength = queue.length，
			fn = queue.shift（），
			hooks = jQuery._queueHooks（elem，type），
			next = function（）{ 
				jQuery.dequeue（elem，type ）; 
			}; 

		//如果fx队列出队，请始终删除进度sentinel 
		if（fn ===“inprogress”）{ 
			fn = queue.shift（）; 
			startLength--; 
		} 

		if（fn）{ 

			//添加进度sentinel以防止fx队列
			//自动出列
			if（type ===“fx”）{
				queue.unshift（“inprogress”）; 
			} 

			//清除最后一个队列停止函数
			delete hooks.stop; 
			fn.call（elem，next，hooks）; 
		} 

		if（！startLength && hooks）{ 
			hooks.empty.fire（）; 
		} 
	}，

	//不用于公共消费-生成queueHooks对象，或返回当前一个
	_queueHooks：功能（ELEM，类型）{ 
		VAR键=类型+ “queueHooks”; 
		return data_priv.get（elem，key）|| data_priv.access（elem，key，{ 
			empty：jQuery.Callbacks（“once memory”）。add（function（）{ 
				data_priv.remove（elem，[type +“queue”，key]）; 
			}）
		}）; 
	} 
};

jQuery.fn.extend（{ 
	queue：function（type，data）{ 
		var setter = 2; 

		if（typeof type！==“string”）{ 
			data = type; 
			type =“fx”; 
			setter--; 
		} 

		if（ arguments.length <setter）{ 
			return jQuery.queue（this [0]，type）; 
		} 

		return data === undefined？
			this：
			this.each（function（）{ 
				var queue = jQuery.queue（this，type，data） ）; 

				//确保这个队列的钩子
				jQuery._queueHooks（this，type）; 

				if（type ===“fx”&& queue [0]！==“inprogress”）{ 
					jQuery.dequeue（this，type）; 
				} 
			}）; 
	}，
	dequeue：function（type）{ 
		return this.each（function（）{ 
			jQuery.dequeue（this，type）; 
		}）; 
	}，
	//基于Clint Helfers的插件，经过许可。
	// http://blindsignals.com/index.php/2009/07/jquery-delay/ 
	delay：function（time，type）{ 
		time = jQuery.fx？jQuery.fx.speeds [time] || 时间：时间; 
		type = type || “FX”; 

		return this.queue（type，function（next，hooks）{ 
			var timeout = setTimeout（next，time）; 
			hooks.stop = function（）{ 
				clearTimeout（timeout）; 
			}; 
		}）; 
	}，
	clearQueue：function（type）{ 
		return this.queue（type ||“fx”，[]）; 
	}，
	//当某个类型的队列
	被清空时获取一个promise （fx是默认类型）
	promise：function（type，obj）{ 
		var tmp，
			count = 1，
			defer = jQuery.Deferred（），
			elements = this，
			i = this.length，
			resolve = function（）{ 
				if（！（ -  count））{ 
					defer.resolveWith（elements，[elements]）; 
				} 
			}; 

		if（typeof type！==“string”）{ 
			obj = type; 
			type = undefined; 
		} 
		type = type || “FX”; 

		while（
			i  - ）{ tmp = data_priv.get（elements [i]，type +“queueHooks”）; 
			if（tmp && tmp.empty）{ 
				count ++;
				tmp.empty.add（resolve）; 
			} 
		} 
		解决（）; 
		return defer.promise（obj）; 
	} 
}; 
var nodeHook，boolHook，
	rclass = / [\ t \ r \ n \ f] / g，
	rreturn = / \ r / g，
	rfocusable = / ^（？：input | select | textarea | button）$ / i; 

jQuery.fn.extend（{ 
	attr：function（name，value）{ 
		return jQuery.access（this，jQuery.attr，name，value，arguments.length> 1）; 
	}，

	removeAttr：function（name）{ 
		return this。 each（function（）{ 
			jQuery.removeAttr（this，name）; 
		}）; 
	}，

	prop：function（name，value）{ 
		return jQuery.access（this，jQuery.prop，name，value，arguments.length> 1） ;
	}，

	removeProp：function（name）{ 
		return this.each（function（）{ 
			delete this [jQuery.propFix [name] || name]; 
		}）; 
	}，

	addClass：function（value）{ 
		var classes，elem，cur，clazz，j，
			i = 0，
			len = this.length，
			proceed = typeof value ===“string”&& value; 

		if（jQuery.isFunction（value））{ 
			return this.each（function（j）{ 
				jQuery（this）.addClass（value.call（this，j，this.className））; 
			}）; 
		} 

		if（proceed）{ 
			//这里的
			析取是为了更好的压缩性（参见removeClass）classes =（value ||“”）。match（core_rnotwhite）|| [];

			for（; i <len; i ++）{ 
				elem = this [i]; 
				cur = elem.nodeType === 1 &&（elem.className？
					（“”+ elem.className +“”）。replace（rclass，“”）：
					“” 
				）; 

				if（cur）{ 
					j = 0; 
					while（（clazz = classes [j ++]））{ 
						if（cur.indexOf（“”+ clazz +“”）<0）{ 
							cur + = clazz +“”; 
						} 
					} 
					elem.className = jQuery.trim（CUR）; 

				} 
			} 
		} 

		返回这一点; 
	}，

	removeClass：function（value）{ 
		var classes，elem，cur，clazz，j，
			i = 0，
			len = this。
			proceed = arguments.length === 0 || typeof value ===“string”&& value; 

		if（jQuery.isFunction（value））{ 
			return this.each（function（j）{ 
				jQuery（this）.removeClass（value.call（this，j，this.className））; 
			}）; 
		} 
		if（proceed）{ 
			classes =（value ||“”）。match（core_rnotwhite）|| []; 

			for（; i <len; i ++）{ 
				elem = this [i]; 
				//此表达式用于更好的压缩性（请参阅addClass）
				cur = elem.nodeType === 1 &&（elem.className？
					（“”+ elem.className +“”）.replace（rclass，“”）：
					“” 
				）;

					while（（clazz = classes [j ++]））{ 
						//删除* all * instances 
						while（cur.indexOf（“”+ clazz +“”）> = 0）{ 
							cur = cur.replace（“”+ clazz +“ “，”“）; 
						} 
					} 
					elem.className =值？jQuery.trim（cur）：“”; 
				} 
			} 
		} 

		返回这一点; 
	}，

	toggleClass：function（value，stateVal）{ 
		var type = typeof value; 

		if（typeof stateVal ===“boolean”&& type ===“string”）{ 
			return stateVal？this.addClass（value）：this.removeClass（value）; 
		} 

		if（jQuery.isFunction（value））{ 
			return this。
				jQuery（this）.toggleClass（value.call（this，i，this.className，stateVal），stateVal）; 
			}）; 
		} 

		返回this.each（函数（）{ 
			如果（类型=== “串”）{ 
				//切换个别类名
				变种的className，
					I = 0，
					自= jQuery的（本），
					类名= value.match（core_rnotwhite）| | []; 

				while（（className = classNames [i ++]））{ 
					//检查给定的每个className，空格分隔列表
					if（self.hasClass（className））{ 
						self.removeClass（className）; 
					} else { 
						self.addClass（ className）; 
					} 
				} 

			//切换整个班级名称
			} else if（type === core_strundefined || type ===“boolean”）{ 
				if（this.className）{ 
					// store className if set 
					data_priv.set（this，“__ className __”，this.className）; 
				} 

				//如果元素有一个类名或者我们传递了“false”，
				//然后删除整个类名（如果有的话，上面保存了它）。
				//否则带回以前保存的内容（如果有的话），
				//如果没有存储任何内容，则回退到空字符串。
				this.className = this.className || 值===假？“”：data_priv.get（this，“__ className__”）|| “”; 
			} 
		}; 
	}，

	hasClass：function（selector）{
		var className =“”+ selector +“”，
			i = 0，
			l = this.length; 
		for（; i <l; i ++）{ 
			if（this [i] .nodeType === 1 &&（“”+ this [i] .className +“”）。replace（rclass，“”）。indexOf（className） > = 0）{ 
				return true; 
			} 
		} 

		返回false; 
	}，

	val：function（value）{ 
		var hooks，ret，isFunction，
			elem = this [0]; 

		if（！arguments.length）{ 
			if（elem）{ 
				hooks = jQuery.valHooks [elem.type] || jQuery.valHooks [elem.nodeName.toLowerCase（）]; 

				if（hooks &&“get”in hooks &&（ret = hooks.get（elem，“value”））！
					== undefined）{ return ret; 
				}

				ret = elem.value; 

				return typeof ret ===“string”？
					//处理最常见的字符串case 
					ret.replace（rreturn，“”）：
					//处理value为null / undef或number 
					ret == null的情况？“”：ret; 
			} 

			return; 
		} 

		isFunction = jQuery.isFunction（value）; 

		return this.each（function（i）{ 
			var val; 

			if（this.nodeType！== 1）{ 
				return; 
			} 

			if（isFunction）{ 
				val = value.call（this，i，jQuery（this）.val（） ）; 
			} else { 
				val = value; 
			} 

			//将null / undefined视为“”;
				val =“”; 
			} else if（typeof val ===“number”）{ 
				val + =“”; 
			} else if（jQuery.isArray（val））{ 
				val = jQuery.map（val，function（value）{ 
					return value == null？“”：value +“”; 
				}）; 
			} 

			hooks = jQuery.valHooks [this.type] || jQuery.valHooks [this.nodeName.toLowerCase（）]; 

			//如果set返回undefined，
			如果（！hooks ||！（挂钩中的“set”）|| hooks.set（this，val，“value”）=== undefined）{ 
				this.value = VAL; 
			} 
		}; 
	} 
}; 

jQuery.extend（{ 
	valHooks：{ 
		option：{ 
			get：
				//在Blackberry 4.7中未定义attributes.value，但
				//使用.value。见＃6932 
				var val = elem.attributes.value; 
				return！val || val.specified？elem.value：elem.text; 
			} 
		}，
		选择：{ 
			得到：函数（ELEM）{ 
				VAR值，选项，
					选项= elem.options，
					索引= elem.selectedIndex，
					一个= elem.type === “中选择一” || index <0，
					values = 1？null：[]，
					max = 1？index + 1：options.length，
					i = index <0？
						最大：
						一个？指数：0; 

				//遍历
				（; i <max; i ++）{的所有选定选项
					option = options [i]; 

					// IE6-9在表单重置后不会更新（＃2551）
					if（（option.selected || i === index）&& 
							//不返回被禁用的选项或禁用的optgroup 
							（jQuery。 support.optDisabled？！option.disabled：option.getAttribute（“disabled”）=== null）&& 
							（！option.parentNode.disabled ||！jQuery.nodeName（option.parentNode，“optgroup”）））{ 

						//获取选项
						值的具体值= jQuery（option）.val（）; 

						//我们不需要一个数组来选择
						if（one）{ 
							return value; 
						} 

						// Multi-Selects返回一个数组
						值。
					} 
				} 

				返回值; 
			}，

			set：function（elem，value）{ 
				var optionSet，option，
					options = elem.options，
					values = jQuery.makeArray（value），
					i = options.length; 

				while（
					i-- ）{ option = options [i]; 
					if（（option.selected = jQuery.inArray（jQuery（option）.val（），values）> = 0））{ 
						optionSet = true; 
					} 
				} 

				//当不匹配的值被设定力的浏览器行为一致
				，如果（optionSet！）{ 
					elem.selectedIndex = -1; 
				} 
				返回值; 
			} 
		} 
	}，

	attr：function（elem，name，value）{ 
		var hooks，ret，
			nType = elem.nodeType; 

		// 
		如果（！elem || nType === 3 || nType === 8 || nType === 2）{ 
			return; 请不要在文本，注释和属性节点上获取/设置属性 
		} 

		//回退来支撑时的属性不被支持
		，如果（typeof运算elem.getAttribute === core_strundefined）{ 
			返回jQuery.prop（ELEM，名称，值）; 
		} 

		//所有属性是小写
		//抓斗必要钩如果定义
		如果（n类型== 1 || jQuery.isXMLDoc（ELEM）！）{ 
			名称= name.toLowerCase（）; 
			hooks = jQuery.attrHooks [name] ||
				（jQuery.expr.match.bool.test（name）？boolHook：nodeHook）; 
		} 

		if（value！== undefined）{ 

			if（value === null）{ 
				jQuery.removeAttr（elem，name）; 

			} else if（hooks &&“set”in hooks &&（ret = hooks.set（elem，value，name））！== undefined）{ 
				return ret; 

			} else { 
				elem.setAttribute（name，value +“”）; 
				回报值; 
			} 

		}否则，如果（在钩子钩&& “得到” &&（RET = hooks.get（ELEM，名））== NULL！）{ 
			返回RET; 

		} else { 
			ret = jQuery.find.attr（elem，name）; 

			//不存在的属性返回null，
			我们规范化为undefined return ret == null？
				undefined：
				RET; 
		} 
	}，

	removeAttr：功能（ELEM，值）{ 
		变数名称，PROPNAME，
			I = 0，
			attrNames =值&& value.match（core_rnotwhite）; 

		if（attrNames && elem.nodeType === 1）{ 
			while（（name = attrNames [i ++]））{ 
				propName = jQuery.propFix [name] || 名称; 

				//布尔属性得到特殊处理（＃10870）
				if（jQuery.expr.match.bool.test（name））{ 
					//将相应属性设置为false 
					elem [propName] = false; 
				} 

				elem.removeAttribute（名称）; 
			} 
		} 
	}，

	attrHooks：{ 
		式：{ 
			组：功能（ELEM，值）{
				if（！jQuery.support.radioValue && value ===“radio”&& jQuery.nodeName（elem，“input”））{ 
					//在值重置IE6-9中的值后，在单选按钮上设置类型
					//如果在创建期间的值之后设置了类型，则将值重置为默认值
					var val = elem.value; 
					elem.setAttribute（“type”，value）; 
					if（val）{ 
						elem.value = val; 
					} 
					返回值; 
				} 
			} 
		} 
	}，

	propFix：{ 
		“为”： “htmlFor”， 
		“ 类”： “的className” 
	}，

	道具：功能（ELEM，名称，值）{ 
		VAR RET，钩，notxml，

		// 
		如果（！elem || nType === 3 || nType === 8 || nType === 2）{ 
			return; 请不要在文本，注释和属性节点上获取/设置属性 
		} 

		notxml = nType！== 1 || ！jQuery.isXMLDoc（elem）; 

		if（notxml）{ 
			//修复名称和附加挂钩
			name = jQuery.propFix [name] || 名称; 
			hooks = jQuery.propHooks [name]; 
		} 

		if（value！== undefined）{ 
			return hooks &&“set”in hooks &&（ret = hooks.set（elem，value，name））！== undefined？
				ret：
				（elem [name] = value）; 

		} else { 
			return hooks &&“get”in hooks &&（ret = hooks.get（elem，name））！== null？
				ret：
		} 
	，

	propHooks：{ 
		tabIndex：{ 
			get：function（elem）{ 
				return elem.hasAttribute（“tabindex”）|| rfocusable.test（elem.nodeName）|| elem.href？
					elem.tabIndex：
					-1; 
			} 
		} 
	} 
; 

//布尔属性的钩子
boolHook = { 
	set：function（elem，value，name）{ 
		if（value === false）{ 
			//设置为false时删除布尔属性
			jQuery.removeAttr（elem，name）; 
		} else { 
			elem.setAttribute（name，name）; 
		} 
		return name; 
	} 
};
jQuery.each（jQuery.expr.match.bool.source.match（/ \ w + / g），function（i，name）{ 
	var getter = jQuery.expr.attrHandle [name] || jQuery.find.attr; 

	jQuery .expr.attrHandle [name] = function（elem，name，isXML）{ 
		var fn = jQuery.expr.attrHandle [name]，
			ret = isXML？
				undefined：
				/ * jshint eqeqeq：false * / 
				//暂时禁用此处理程序检查是否存在
				（jQuery.expr.attrHandle [name] = undefined）！= 
					getter（elem，name，isXML）？

					name.toLowerCase（）：
					null; 

		//恢复处理程序
		jQuery.expr.attrHandle [name] = fn; 

		返回ret ; 
	}; 
}）; 

//支持：IE9 +
// 
如果（！jQuery.support.optSelected）{ 
	jQuery.propHooks.selected = { 
		get：function（elem）{ 
			var parent = elem.parentNode; } ，则optgroup中选项的选择性可能不准确。
			if（parent && parent.parentNode）{ 
				parent.parentNode.selectedIndex; 
			} 
			return null; 
		} 
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if（！jQuery.support.checkOn）{ 
		jQuery.valHooks [this] .get = function（elem）{ 
			//支持：
			如果未指定值，则返回Webkit //“”而不是“on” 
			返回elem .getAttribute（“value”）=== null？“on”：elem.value; 
		}; 
	} 
}; 
var rkeyEvent = / ^ key /，
	rmouseEvent = / ^（？：mouse | contextmenu）| click /，
	rfocusMorph = / ^（？：focusinfocus | focusoutblur）$ /，
	rtypenamespace = /^([^.]*)(?:\。（。+）| ）$ /; 

function returnTrue（）{ 
	return true; 
} 

函数returnFalse（）{ 
	返回false; 
} 

功能safeActiveElement（）{ 
	尝试{ 
		返回document.activeElement; 
	} catch（err）{} 
} 

/ * 
 * Helper函数用于管理事件 - 不是公共接口的一部分。
 *为Dean Edwards的addEvent库提供了许多想法的道具。
 * / 
jQuery.event = { 

	global：{}，

	add：function（elem，types，handler，data，selector）{

		var handleObjIn，eventHandle，tmp，
			events，t，handleObj，
			special，handlers，type，namespaces，origType，
			elemData = data_priv.get（elem）; 

		// 
		如果（！elemData）{ 
			return; 不要将事件附加到noData或text / comment节点（但允许普通对象）
		} 

		//呼叫者可以在自定义数据的对象传递代替处理的
		IF（handler.handler）{ 
			handleObjIn =处理程序; 
			handler = handleObjIn.handler; 
			selector = handleObjIn.selector; 
		} 

		//确保处理程序都有一个唯一的ID，用于查找/删除后
		，如果{（handler.guid！）
			handler.guid = jQuery.guid ++; 
		}

		//初始化元素的事件结构和主处理程序，如果这是第一个
		if（！（events = elemData.events））{ 
			events = elemData.events = {}; 
		} 
		if（！（eventHandle = elemData.handle））{ 
			eventHandle = elemData.handle = function（e）{ 
				//丢弃jQuery.event.trigger（）的第二个事件和
				//在页面后调用事件时已经卸载了
				返回类型的jQuery！== core_strundefined &&（！e || jQuery.event.triggered！== e.type）？
					jQuery.event.dispatch.apply（eventHandle.elem，arguments）：
					undefined; 
			}; 
			//添加elem作为句柄fn的属性，以防止IE非本机事件的内存泄漏
			eventHandle.elem = elem; 
		} 

		//处理由空格
		类型=（types ||“”）.match（core_rnotwhite）|| 分隔的多个事件 [ “”]; 
		t = types.length; 
		while（t--）{ 
			tmp = rtypenamespace.exec（types [t]）|| []; 
			type = origType = tmp [1]; 
			namespaces =（tmp [2] ||“”）。split（“。”）。sort（）; 

			//那里*必须*是一个类型，没有附加的名称空间只有处理程序
			if（！type）{ 
				continue; 
			} 

			//如果事件更改了其类型，请使用特殊事件处理程序更改类型
			special = jQuery.event.special [type] || {}; 

			//如果定义了选择器，则确定特殊事件api类型，否则给定类型
			type =（selector？special.delegateType：special.bindType）|| 类型; 

			//基于新重置类型
			special = jQuery.event.special [type] || 更新特殊 {}; 

			// handleObj被传递给所有事件处理程序
			handleObj = jQuery.extend（{ 
				type：type，
				origType：origType，
				data：data，
				handler：handler，
				guid：handler.guid，
				selector：selector，
				needsContext：selector && jQuery.expr。 match.needsContext.test（selector），
				namespace：namespaces.join（“。”）
			}，handleObjIn）; 

			//如果我们是第一个
			if（！（handlers = events [type]））{ 初始化事件处理程序队列
				handlers = events [type] = []; 
				handlers.delegateCount = 0; 

				//如果特殊事件处理程序返回false，
				则仅使用addEventListener if （！special.setup || special.setup.call（elem，data，namespaces，eventHandle）=== false）{ 
					if（elem.addEventListener）{ 
						elem.addEventListener （type，eventHandle，false）; 
					} 
				} 
			} 

			如果（special.add）{ 
				special.add.call（ELEM，handleObj）; 

				if（！handleObj.handler.guid）{ 
					handleObj.handler.guid = handler.guid; 
				} 
			} 

			//加入元素的处理程序列表，代表们在前面
			，如果（选择）{
				handlers.splice（handlers.delegateCount ++，0，handleObj）; 
			} else { 
				handlers.push（handleObj）; 
			} 

			//跟踪曾经使用过的事件，事件优化
			jQuery.event.global [type] = true; 
		} 

		// Nullify elem以防止IE中的内存泄漏
		elem = null; 
	}，

	//从元素
	remove中删除一个事件或一组事件：function（elem，types，handler，selector，mappedTypes）{ 

		var j，origCount，tmp，
			events，t，handleObj，
			special，handlers，type，namespaces， origType，
			elemData = data_priv.hasData（elem）&& data_priv.get（elem）; 

		if（！elemData ||！（events = elemData.events））{
			返回; 
		} 

		//对于类型中的每个type.namespace; type可以省略
		types =（types ||“”）。match（core_rnotwhite）|| [ “”]; 
		t = types.length; 
		while（t--）{ 
			tmp = rtypenamespace.exec（types [t]）|| []; 
			type = origType = tmp [1]; 
			namespaces =（tmp [2] ||“”）。split（“。”）。sort（）; 

			//取消绑定元素的所有事件（在此命名空间上，如果提供）
			if（！type）{ 
				for（type in events）{ 
					jQuery.event.remove（elem，type + types [t]，handler，selector，true） ; 
				} 
				继续; 
			} 

			special = jQuery.event.special [type] || {};
			type =（selector？special.delegateType：special.bindType）|| 类型; 
			处理程序=事件[类型] || []; 
			tmp = tmp [2] && new RegExp（“（^ | \\。）”+ namespaces.join（“\\。（？：。* \\。|）”）+“（\\。| $）” ）; 

			//删除匹配的事件
			origCount = j = handlers.length; 
			while（
				j-- ）{ handleObj = handlers [j]; 

				if（（mappedTypes || origType === handleObj.origType）&& 
					（！handler || handler.guid === handleObj.guid）&& 
					（！tmp || tmp.test（handleObj.namespace））&& 
					（！selector | | selector === handleObj.selector || selector ===“**”&& handleObj.selector））{ 
					handlers.splice（j，1）;

						handlers.delegateCount--; 
					} 
					if（special.remove）{ 
						special.remove.call（elem，handleObj）; 
					} 
				} 
			} 

			//如果我们删除的东西删除通用的事件处理程序，不存在更多的处理程序
			//（除去特殊事件处理的过程中避免了无限递归潜在的）
			，如果（origCount && handlers.length！）{ 
				如果（special.teardown！| | special.teardown.call（elem，namespaces，elemData.handle）=== false）{ 
					jQuery.removeEvent（elem，type，elemData.handle）; 
				} 

				删除事件[类型]; 
			} 
		} 

		//删除的expando，如果它不再使用
		if（jQuery.isEmptyObject（events））{ 
			delete elemData.handle; 
			data_priv.remove（elem，“events”）; 
		} 
	}，

	触发：功能（事件，数据，ELEM，onlyHandlers）{ 

		VAR I，CUR，TMP，bubbleType，ontype，手柄，特别，
			eventPath = [ELEM || document]，
			type = core_hasOwn.call（event，“type”）？event.type：event，
			namespaces = core_hasOwn.call（event，“namespace”）？event.namespace.split（“。”）：[]; 

		cur = tmp = elem = elem || 文件; 

		// 
		如果（elem.nodeType === 3 || elem.nodeType === 8）{ 
			return; 则不要在文本和注释节点上执行事件 
		}

		//聚焦/模糊变形聚焦/聚焦; 确保我们现在不解雇它们
		（rfocusMorph.test（type + jQuery.event.triggered））{ 
			return; 
		} 

		if（type.indexOf（“。”）> = 0）{ 
			//命名空间触发器; 创建一个regexp以匹配handle（）中的事件类型
			namespaces = type.split（“。”）; 
			type = namespaces.shift（）; 
			namespaces.sort（）; 
		} 
		ontype = type.indexOf（“：”）<0 &&“on”+ type; 

		//调用者可以传入jQuery.Event对象，Object，还是仅传递事件类型字符串
		event = event [jQuery.expando]？
			event：
			new jQuery.Event（type，typeof event ===“object”&& event）;

		//触发位掩码：＆1表示本机处理程序; ＆2为jQuery（总是如此）
		event.isTrigger = onlyHandlers？2：3; 
		event.namespace = namespaces.join（“。”）; 
		event.namespace_re = event.namespace？
			new RegExp（“（^ | \\。）”+ namespaces.join（“\\。（？：。* \\。|）”）+“（\\。| $）”）：
			null; 

		//在事件被重用的情况下清理事件
		event.result = undefined; 
		if（！event.target）{ 
			event.target = elem; 
		} 

		//克隆任何传入的数据并在事件前添加，创建处理程序arg list 
		data = data == null？
			[event]：
			jQuery.makeArray（data，[event]）;

		special = jQuery.event.special [type] || {}; 
		if（！onlyHandlers && special.trigger && special.trigger.apply（elem，data）=== false）{ 
			return; 
		} 

		//根据W3C事件规范（＃9951）预先确定事件传播路径
		//冒泡到文档，然后到窗口; 注意全局ownerDocument var（＃9724）
		if（！onlyHandlers &&！special.noBubble &&！jQuery.isWindow（elem））{ 

			bubbleType = special.delegateType || 类型; 
			if（！rfocusMorph.test（bubbleType + type））{ 
				cur = cur.parentNode; 
			} 
			for（; cur; cur = cur.parentNode）{ 
				eventPath.push（cur）; 
				tmp = cur; 
			}

			//如果我们需要文档（例如，不是普通的obj或分离的DOM），只有添加窗口if 
			（tmp ===（elem.ownerDocument || document））{ 
				eventPath.push（tmp.defaultView || tmp.parentWindow ||窗口）; 
			} 
		} 

		//事件路径上的消防处理程序
		i = 0; 
		while（（cur = eventPath [i ++]）&&！event.isPropagationStopped（））{ 

			event.type = i> 1？
				bubbleType：special.bindType 
				|| 类型; 

			// jQuery handler 
			handle =（data_priv.get（cur，“events”）|| {}）[event.type] && data_priv.get（cur，“handle”）; 
			if（handle）{ 
				handle.apply（cur，data）; 
			} 

			//本机处理程序
			handle = ontype && cur [ontype]; 
			if（handle && jQuery.acceptData（cur）&& handle.apply && handle.apply（cur，data）=== false）{ 
				event.preventDefault（）; 
			} 
		} 
		event.type =类型; 

		//如果没有人阻止默认操作，请立即执行
		（！onlyHandlers &&！event.isDefaultPrevented（））{ 

			if（（！special._default || special._default.apply（eventPath.pop（），data）== = false）&& 
				jQuery.acceptData（elem））{ 

				//在目标上调用与事件名称相同的本机DOM方法。
				//不要对窗口执行默认操作，这就是全局变量（＃6170）
				if（ontype && jQuery。

					//当我们调用它的FOO（）方法
					tmp = elem [ontype]时，不要重新触发onFOO事件; 

					if（tmp）{ 
						elem [ontype] = null; 
					} 

					//阻止重新触发同一事件，因为我们已经将它
					冒充到jQuery.event.triggered = type 之上; 
					elem [type]（）; 
					jQuery.event.triggered = undefined; 

					if（tmp）{ 
						elem [ontype] = tmp; 
					} 
				} 
			} 
		} 

		返回event.result; 
	}，

	dispatch：function（event）{ 

		//从本机事件对象
		事件中创建一个可写的jQuery.Event = jQuery.event.fix（event）;

		var i，j，ret，matched，handleObj，
			handlerQueue = []，
			args = core_slice.call（arguments），
			handlers =（data_priv.get（this，“events”）|| {}）[event.type] || []，
			special = jQuery.event.special [event.type] || {}; 

		//使用fix-ed jQuery.Event而不是（只读）本机事件
		args [0] = event; 
		event.delegateTarget = this; 

		//为映射类型调用preDispatch挂钩，如果需要，让它保释
		（special.preDispatch && special.preDispatch.call（this，event）=== false）{ 
			return; 
		} 

		//确定处理程序
		handlerQueue = jQuery.event.handlers.call（此，事件处理程序）;

		//先运行代理; 他们可能想要阻止我们下面的传播
		i = 0; 
		while（（matched = handlerQueue [i ++]）&&！event.isPropagationStopped（））{ 
			event.currentTarget = matched.elem; 

			j = 0; 
			while（（handleObj = matched.handlers [j ++]）&&！event.isImmediatePropagationStopped（））{ 

				//触发事件必须1）没有命名空间，或者
				// 2）命名空间是子集或等于绑定事件（两者都没有命名空间）。
				if（！event.namespace_re || event.namespace_re.test（handleObj.namespace））{ 

					event.handleObj = handleObj; 
					event.data = handleObj.data;

					ret =（（jQuery.event.special [handleObj.origType] || {}）。handle || handleObj.handler）
							.apply（matched.elem，args）; 

					if（ret！== undefined）{ 
						if（（event.result = ret）=== false）{ 
							event.preventDefault（）; 
							event.stopPropagation（）; 
						} 
					} 
				} 
			} 
		} 

		//调用执行postDispatch钩为映射的类型
		，如果（special.postDispatch）{ 
			special.postDispatch.call（此，事件）; 
		} 

		return event.result; 
	}，

	handlers：function（event，handlers）{ 
		var i，matches，sel，handleObj，
			handlerQueue = []，
			delegateCount = handlers.delegateCount，
			cur = event.target; 

		//查找委托处理程序
		//黑洞SVG <use>实例树（＃13180）
		//避免在Firefox（＃3861）中进行非左键单击
		冒充（ifateCount && cur.nodeType &&（！event.button ||） event.type！==“click”））{ 

			for（; cur！== this; cur = cur.parentNode || this）{ 

				//不要处理已禁用元素的点击次数（＃6911，＃8165，＃11382 ，＃11764）
				if（cur.disabled！== true || event.type！==“click”）{ 
					matches = []; 
					for（i = 0; i <delegateCount; i ++）{ 
						handleObj = handlers [i]; 

						//不要与Object.prototype属性冲突（＃13203）
						sel = handleObj.selector +“”; 

						if（matches [sel] === undefined）{ 
							matches [sel] = handleObj.needsContext？
								jQuery（sel，this）.index（cur）> = 0：
								jQuery.find（sel，this，null，[cur]）。length; 
						} 
						if（matches [sel]）{ 
							matches.push（handleObj）; 
						} 
					} 
					如果（matches.length）{ 
						handlerQueue.push（{ELEM是：cur，处理程序：匹配}）; 
					} 
				} 
			} 
		} 

		//添加剩余的（直接结合的）处理程序
		，如果（delegateCount <handlers.length）{ 
			handlerQueue.push（{ELEM：此，处理程序：handlers.slice（delegateCount）}）;
		} 

		return handlerQueue; 
	}，

	//包括由KeyEvent的和的MouseEvent共享一些事件道具
	道具： “方altKey气泡取消currentTarget当前中ctrlKey的EventPhase metaKey relatedTarget Shift键，目标的timeStamp图，该” .split（” “），

	fixHooks：{}，

	keyHooks：{ 
		道具：”字符则charCode key keyCo de“.split（”“），
		filter：function（event，original）{ 

			//为关键事件添加
			if（event.which == null）{ 
				event.which = original.charCode！= null？original.charCode：original.keyCode; 
			} 

			return event; 
		} 
	}，

	mouseHooks：{
		道具：“按钮按钮clientX clientY offsetX offsetY pageX pageY screenX screenY toElement”.split（“”），
		filter：function（event，original）{ 
			var eventDoc，doc，body，
				button = original.button; 

			//计算pageX / Y（如果缺少）和clientX / Y可用
			if（event.pageX == null && original.clientX！= null）{ 
				eventDoc = event.target.ownerDocument || 文件; 
				doc = eventDoc.documentElement; 
				body = eventDoc.body; 

				event.pageX = original.clientX +（doc && doc.scrollLeft || body && body.scrollLeft || 0） - （doc && doc.clientLeft || body && body.clientLeft || 0）;
				event.pageY = original.clientY +（doc && doc.scrollTop || body && body.scrollTop || 0） - （doc && doc.clientTop || body && body.clientTop || 0）; 
			} 

			//添加点击：1 === left; 2 ===中; 3 ===对
			//注意：按钮没有标准化，所以
			如果（！event.which && button！== undefined）{ 
				event.which =（按钮＆1？1：（按钮＆2？），请不要使用它。 3 :(按钮＆4？2：0）））; 
			} 

			return event; 
		} 
	}，

	固定：功能（事件）{ 
		如果（事件[jQuery.expando]）{ 
			返回事件; 
		} 

		//创建事件对象的可写副本并规范化一些属性
		var i，prop，copy，
			type = event.type，
			originalEvent = event，
			fixHook = this.fixHooks [type]; 

		if（！fixHook）{ 
			this.fixHooks [type] = fixHook = 
				rmouseEvent.test（type）？this.mouseHooks：
				rkeyEvent.test（type）？this.keyHooks：
				{}; 
		} 
		copy = fixHook.props？this.props.concat（fixHook.props）：this.props; 

		event = new jQuery.Event（originalEvent）; 

		i = copy.length; 
		while（
			i-- ）{ prop = copy [i]; 
			event [prop] = originalEvent [prop]; 
		} 

		//支持：Cordova 2.5（WebKit）（＃13255）
		//所有事件都应该有目标; Cordova deviceready 
		如果（！event.target）{
			event.target = document; 
		} 

		//支持：Safari 6.0 +，Chrome <28 
		//目标不应该是文本节点（＃504，＃13143）
		if（event.target.nodeType === 3）{ 
			event.target = event.target.parentNode ; 
		} 

		return fixHook.filter？fixHook.filter（event，originalEvent）：event; 
	}，

	special：{ 
		load：{ 
			//防止触发的image.load事件从冒泡到window.load 
			noBubble：true 
		}，
		焦点：{ 
			//如果可能的话，
			触发本机事件，使模糊/焦点序列正确触发：function（）{ 
				if（this！== safeActiveElement（）&& this.focus）{ 
					this.focus（）;
					返回虚假; 
				} 
			，
			delegateType：“focusin” 
		}，
		blur：{ 
			trigger：function（）{ 
				if（this === safeActiveElement（）&& this.blur）{ 
					this.blur（）; 
					返回虚假; 
				} 
			，
			delegateType：“focusout” 
		}，
		单击：{ 
			//对于复选框，触发本机事件，因此检查状态将是正确的
			触发器：function（）{ 
				if（this.type ===“checkbox”&& this.click && jQuery .nodeName（this，“input”））{ 
					this.click（）; 
					返回虚假; 
				} 
			}，

			//对于跨浏览器的一致性，不要
			_default：function（event）{ 
				return jQuery.nodeName（event.target，“a”）; 
			} 
		}，

		beforeunload：{ 
			执行postDispatch：函数（事件）{ 

				//支持：火狐20+ 
				如果的returnValue字段没有设置// Firefox没有警觉。
				if（event.result！== undefined）{ 
					event.originalEvent.returnValue = event.result; 
				} 
			} 
		} 
	}，

	模拟：功能（类型，ELEM，事件，气泡）{ 
		//背驮式上的供体事件，以模拟不同的一个。
		//伪造原始事件以避免捐赠者的停止传播，但如果
		//模拟事件阻止默认，那么我们在捐赠者身上做同样的事情。
		var e = jQuery.extend（
			new jQuery.Event（），
			event，
			{ 
				type：type，
				isSimulated：true，
				originalEvent：{} 
			} 
		）; 
		if（bubble）{ 
			jQuery.event.trigger（e，null，elem）; 
		} else { 
			jQuery.event.dispatch.call（elem，e）; 
		} 
		if（e.isDefaultPrevented（））{ 
			event.preventDefault（）; 
		} 
	} 
}; 

jQuery.removeEvent = function（elem，type，handle）{ 
	if（elem.removeEventListener）{ 
		elem.removeEventListener（type，handle，false）; 
	} 
}; 

jQuery.Event = function（src，props）{
	//允许没有'new'关键字的实例化
	if（！（此实例为jQuery.Event））{ 
		return new jQuery.Event（src，props）; 
	} 

	//事件对象
	if（src && src.type）{ 
		this.originalEvent = src; 
		this.type = src.type; 

		//冒泡文档的事件可能已经被
		树下面的处理程序标记为阻止了// 反映正确的价值。
		this.isDefaultPrevented =（src.defaultPrevented || 
			src.getPreventDefault && src.getPreventDefault（））？returnTrue：returnFalse; 

	//事件类型
	} else { 
		this.type = src; 
	} 

	//将显式提供的属性放到事件对象上
	if（props）{ 
		jQuery.extend（this，props）; 
	} 

	//如果传入的事件没有
	this，则创建时间戳.timeStamp = src && src.timeStamp || jQuery.now（）; 

	//将它标记为已修复
	[jQuery.expando] = true; 
}; 

// jQuery.Event基于ECMAScript语言绑定指定的DOM3事件
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding .html 
jQuery.Event.prototype = { 
	isDefaultPrevented：returnFalse，
	isPropagationStopped：returnFalse，
	isImmediatePropagationStopped：returnFalse，

	preventDefault：function（）{ 
		var e = this.originalEvent; 

		this.isDefaultPrevented = returnTrue;

		if（e && e.preventDefault）{ 
			e.preventDefault（）; 
		} 
	，
	stopPropagation：function（）{ 
		var e = this.originalEvent; 

		this.isPropagationStopped = returnTrue; 

		if（e && e.stopPropagation）{ 
			e.stopPropagation（）; 
		} 
	}，
	stopImmediatePropagation：函数（）{ 
		this.isImmediatePropagationStopped = returnTrue; 
		this.stopPropagation（）; 
	} 
}; 

//使用鼠标悬停/事件和事件时间检查创建鼠标中心/离开事件
//支持：Chrome 15+ 
jQuery.each（{ 
	mouseenter：“mouseover”，
	mouseleave：“mouseout” 
}，function（orig，fix）{
	jQuery.event.special [orig] = { 
		delegateType：fix，
		bindType：fix，

		handle：function（event）{ 
			var ret，
				target = this，
				related = event.relatedTarget，
				handleObj = event.handleObj; 

			//对于mousenter / leave调用处理程序（如果相关）在目标之外。
			//注意：如果鼠标离开/进入浏览器窗口，
			则没有relatedTarget if （！related ||（related！== target &&！jQuery.contains（target，related）））{ 
				event.type = handleObj.origType; 
				ret = handleObj.handler.apply（this，arguments）; 
				event.type = fix; 
			} 
			return ret; 
		} 
	}; 
}）;

//创建“冒泡”焦点和模糊事件
//支持：Firefox，Chrome，Safari 
if（！jQuery.support.focusinBubbles）{ 
	jQuery.each（{focus：“focusin”，blur：“focusout”}，function（orig ，修复）{ 

		//附加一个捕获处理程序，而有人想要focusin / focusout 
		var attaches = 0，
			handler = function（event）{ 
				jQuery.event.simulate（fix，event.target，jQuery.event.fix（event）， true;; 
			}; 

		jQuery.event.special [fix] = { 
			setup：function（）{ 
				if（attaches ++ === 0）{ 
					document.addEventListener（orig，handler，true）; 
				} 
			}，
			teardown：function（）{ 
				if（--attaches === 0）{
					document.removeEventListener（orig，handler，true）; 
				} 
			} 
		}; 
	}）; 
} 

1.3中（{ 

	于：功能（类型，选择器，数据，FN，/ * INTERNAL * /一个）{ 
		VAR origFn，类型; 

		//类型可以是地图上的类型/处理程序
		，如果（typeof运算类型== =“object”）{ 
			//（types-Object，selector，data）
			if（typeof selector！==“string”）{ 
				//（types-Object，data）
				data = data || selector; 
				selector = undefined; 
			} 
			for（type in types）{ 
				this.on（type，selector，data，types [type]，one）; 
			} 
			return this; 
		}

		if（data == null && fn == null）{ 
			//（types，fn）
			fn = selector; 
			data = selector = undefined; 
		} else if（fn == null）{ 
			if（typeof selector ===“string”）{ 
				//（types，selector，fn）
				fn = data; 
				data = undefined; 
			} else { 
				//（types，data，fn）
				fn = data; 
				data = selector; 
				selector = undefined; 
			} 
		} 
		如果（FN ===假）{ 
			FN = returnFalse; 
		} else if（！fn）{ 
			return this; 
		} 

		if（one === 1）{ 
			origFn = fn; 
			fn = function（event）{
				//可以使用空集，因为event包含info 
				jQuery（）。off（event）; 
				return origFn.apply（this，arguments）; 
			}; 
			//使用相同的guid，因此调用者可以使用origFn 
			fn.guid = origFn.guid || 删除 （origFn.guid = jQuery.guid ++）; 
		} 
		返回this.each（函数（）{ 
			jQuery.event.add（此，种类，FN，数据选择器）; 
		}）; 
	}，
	one：function（types，selector，data，fn）{ 
		return this.on（types，selector，data，fn，1）; 
	}，
	off：function（types，selector，fn）{ 
		var handleObj，type; 
		if（types && types.preventDefault && types.handleObj）{ 
			//（event）dispatched jQuery.Event
			handleObj = types.handleObj; 
			jQuery（types.delegateTarget）.off（
				handleObj.namespace？handleObj.origType +“。”+ handleObj.namespace：handleObj.origType，
				handleObj.selector，
				handleObj.handler 
			）; 
			归还这个; 
		} 
		如果（typeof运算类型=== “对象”）{ 
			//（类型对象[，选择器]）
			为（在类型类型）{ 
				this.off（类型，选择器，类型[型]）; 
			} 
			返回这一点; 
		} 
		if（selector === false || typeof selector ===“function”）{ 
			//（types [，fn]）
			fn = selector; 
			selector = undefined; 
		} 
		if（fn === false）{
			fn = returnFalse; 
		} 
		返回this.each（函数（）{ 
			jQuery.event.remove（此，种类，FN，选择器）; 
		}）; 
	}，

	trigger：function（type，data）{ 
		return this.each（function（）{ 
			jQuery.event.trigger（type，data，this）; 
		}）; 
	}，
	triggerHandler：function（type，data）{ 
		var elem = this [0]; 
		if（elem）{ 
			return jQuery.event.trigger（type，data，elem，true）; 
		} 
	} 
}）; 
var isSimple = 
	/^。[^ ：#\ [。，] {$ / ，rparentsprev = / ^（?: parents | prev（？：Until | All））/，
	rneedsContext = jQuery.expr.match.needsContext，
	//保证在从唯一集合开始时生成唯一集合的方法
	guaranteeUnique = { 
		children：true，
		contents：true，
		next：true，
		prev：true 
	}; 

jQuery.fn.extend（{ 
	find：function（selector）{ 
		var i，
			ret = []，
			self = this，
			len = self.length; 

		if（typeof selector！==“string”）{ 
			return this.pushStack（jQuery） （selector）.filter（function（）{ 
				for（i = 0; i <len; i ++）{ 
					if（jQuery.contains（self [i]，this））{ 
						return true; 
					} 
				} 
			}））; 
		} 

		for（ i = 0; i <len; i ++）{
			jQuery.find（selector，self [i]，ret）; 
		} 

		//需要因为$（selector，context）变成$（context）.find（selector）
		ret = this.pushStack（len> 1？jQuery.unique（ret）：ret）; 
		ret.selector = this.selector？this.selector +“”+选择器：选择器; 
		返回; 
	}，

	has：function（target）{ 
		var targets = jQuery（target，this），
			l = targets.length; 

		return this.filter（function（）{ 
			var i = 0; 
			for（; i <l; i ++）{ 
				if（jQuery.contains（this，targets [i]））{ 
					return true; 
				} 
			} 
		}）; 
	}，

	not：function（selector）{
		return this.pushStack（winnow（this，selector || []，true））; 
	}，

	filter：function（selector）{ 
		return this.pushStack（winnow（this，selector || []，false））; 
	}，

	is：function（selector）{ 
		return !! winnow（
			this，

			//如果这是位置/相对选择器，检查返回集合中的成员资格
			// so $（“p：first”）。is（“p：对于带有两个“p”的doc，last“）不会返回
			true。typeof selector ===”string“&& rneedsContext.test（selector）？
				jQuery（selector）：
				selector || []，
			false 
		）。length; 
	}，

	最近：函数（选择器，上下文）{ 
		var cur，
			i = 0，
			l = this.length，
			matched = []，
			pos =（rneedsContext.test（selectors）|| typeof selectors！==“string”）？
				jQuery（selectors，context || this.context）：
				0; 

		for（; i <l; i ++）{ 
			for（cur = this [i]; cur && cur！== context; cur = cur.parentNode）{ 
				//总是跳过文档片段
				if（cur.nodeType <11 &&（pos） ？
					pos.index（cur）> -1：

					//不要将非元素传递给Sizzle 
					cur.nodeType === 1 && 
						jQuery.find.matchesSelector（cur，selectors）））{ 

					cur = matched.push（cur ）; 
					打破; 
				} 
			} 
		}

		return this.pushStack（matched.length> 1？jQuery.unique（matched）：matched）; 
	}，

	//确定元素在
	匹配的元素集中的位置
	index：function（elem）{ 

		//无参数，在父元素中返回索引
		if（！elem）{ 
			return（this [0] && this [0 ] .parentNode）？this.first（）。prevAll（）。length：-1; 
		} 

		//索引在选择器
		if（typeof elem ===“string”）{ 
			return core_indexOf.call（jQuery（elem），this [0]）; 
		} 

		//找到所需元素的位置
		return core_indexOf.call（this，

			//如果收到jQuery对象，则使用第一个元素
			elem.jquery？elem [0]：elem 
		）; 
	}，

	add：function（selector，context）{ 
		var set = typeof selector ===“string”？
				jQuery（selector，context）：
				jQuery.makeArray（selector && selector.nodeType？[selector]：selector），
			all = jQuery.merge（this.get（），set）; 

		return this.pushStack（jQuery.unique（all））; 
	}，

	addBack：function（selector）{ 
		return this.add（selector == null？
			this.prevObject：this.prevObject.filter（selector）
		）; 
	} 
}; 

function sibling（cur，dir）{ 
	while（（cur = cur [dir]）&& cur.nodeType！== 1）{} 

	return cur; 
} 

jQuery.each（{
	parent：function（elem）{ 
		var parent = elem.parentNode; 
		return parent && parent.nodeType！== 11？parent：null; 
	}，
	parents：function（elem）{ 
		return jQuery.dir（elem，“parentNode”）; 
	}，
	parentsUntil：function（elem，i，until）{ 
		return jQuery.dir（elem，“parentNode”，until）; 
	}，
	next：function（elem）{ 
		return sibling（elem，“nextSibling”）; 
	}，
	prev：function（elem）{ 
		return sibling（elem，“previousSibling”）; 
	}，
	nextAll：function（elem）{ 
		return jQuery.dir（elem，“nextSibling”）; 
	}，
	prevAll：function（elem）{
		return jQuery.dir（elem，“previousSibling”）; 
	}，
	nextUntil：function（elem，i，until）{ 
		return jQuery.dir（elem，“nextSibling”，until）; 
	}，
	prevUntil：function（elem，i，until）{ 
		return jQuery.dir（elem，“previousSibling”，until）; 
	}，
	siblings：function（elem）{ 
		return jQuery.sibling（（elem.parentNode || {}）。firstirstChild，elem）; 
	}，
	children：function（elem）{ 
		return jQuery.sibling（elem.firstChild）; 
	}，
	contents：function（elem）{ 
		return elem.contentDocument || jQuery.merge（[]，elem.childNodes）; 
	} 
}，功能（姓名，FN）{ 
	jQuery.fn [名称] =函数（直至，选择器）{
		var matched = jQuery.map（this，fn，until）; 

		if（name.slice（-5）！==“Until”）{ 
			selector = until; 
		} 

		if（selector && typeof selector ===“string”）{ 
			matched = jQuery.filter（selector，matched）; 
		} 

		if（this.length> 1）{ 
			//删除重复项
			if（！guaranteedUnique [name]）{ 
				jQuery.unique（matched）; 
			} 

			//父项*和prev-derivative的
			逆序（如果（rparentsprev.test（name））{matched.reverse 
				（）; 
			} 
		} 

		返回this.pushStack（匹配）; 
	}; 
}）; 

jQuery.extend（{ 
	filter：function（expr，elems，not）{
		var elem = elems [0]; 

		if（not）{ 
			expr =“：not（”+ expr +“）”; 
		} 

		return elems.length === 1 && elem.nodeType === 1？
			jQuery.find.matchesSelector（elem，expr）？[elem]：[]：
			jQuery.find.matches（expr，jQuery.grep（elems，function（elem）{ 
				return elem.nodeType === 1; 
			}））; 
	}，

	dir：function（elem，dir，until）{ 
		var matched = []，
			truncate = until！== undefined; 

		while（（elem = elem [dir]）&& elem.nodeType！== 9）{ 
			if（elem.nodeType === 1）{ 
				if（truncate && jQuery（elem）.is（until））{ 
					break; 
				} 
				matched.push（elem）;
		} 
		return matching; 
	}，

	兄弟：function（n，elem）{ 
		var matched = []; 

		for（; n; n = n.nextSibling）{ 
			if（n.nodeType === 1 && n！== elem）{ 
				matched.push（n）; 
			} 
		} 

		返回匹配的; 
	} 
}; 

//为过滤器实现相同的功能而不是
函数winnow（元素，限定符，不是）{ 
	if（jQuery.isFunction（qualifier））{ 
		return jQuery.grep（elements，function（elem，i）{ 
			/ * jshint -W018 * / 
			return !! qualifier.call（elem，i，elem）！== not; 
		}）; 

	} 

	if（qualifier.nodeType）{
		return jQuery.grep（elements，function（elem）{ 
			return（elem === qualifier）！== not; 
		}）; 

	} 

	if（typeof qualifier ===“string”）{ 
		if（isSimple.test（qualifier））{ 
			return jQuery.filter（qualifier，elements，not）; 
		} 

		qualifier = jQuery.filter（限定符，元素）; 
	} 

	return jQuery.grep（elements，function（elem）{ 
		return（core_indexOf.call（qualifier，elem）> = 0）！== not; 
	}）; 
} 
var rxhtmlTag = / <（？！area | br | col | embed | hr | img | input | link | meta | param）（（[\ w：] +）[^>] *）\ /> / gi，
	rtagName = / <（[\ w：] +）/，
	rhtml = / <|＆＃？\ w +; /，
	rnoInnerhtml = / <（？：script | style | link）/ i，
	manipulation_rcheckableType = / ^（？：checkbox | radio）$ / i，
	// checked =“checked”或check 
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, 
	rscriptType = / ^ $ | \ /（？：java | ecma）script / i 
	，
	rscriptTypeMasked = /^true \ /((*)/ , rcleanScript = / ^ \ s * <！（？：\ [CDATA \ [| - ）|（？：\] \] |  - ）> \ s * $ / g，

	//我们必须关闭这些标签以支持XHTML（＃13200）
	wrapMap = { 

		//支持：IE 9 
		选项：[ 1，“<select multiple ='multiple'>”，“</ select>”]，

		thead：[1，“<table>”，“</ table>”]，
		col：[2，“<table> < colgroup>“，”</ colgroup> </ table>“]，
		tr：[2，”<table> <tbody>“，”</ tbody> </ table>“]， 
		td：[3，”<table> <tbody> <tr>“，”</ tr> </ tbody> </ table>“]，

		_ default：[0，” “，”“]
	}; 

//支持：IE 9 
wrapMap.optgroup = wrapMap.option; 

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead; 
wrapMap.th = wrapMap.td; 

jQuery.fn.extend（{ 
	text：function（value）{ 
		return jQuery.access（this，function（value）{ 
			return value === undefined？
				jQuery.text（this）：
				this.empty（）。append（（this [0] && this [0] .ownerDocument || document）.createTextNode（value））; 
		}，null，value，arguments.length）; 
	}，

	append：function（）{ 
		return this.domManip（arguments，function（elem） ）{ 
			if（this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9）{
				var target = manipulationTarget（this，elem）; 
				target.appendChild（elem）; 
			} 
		}; 
	}，

	prepend：function（）{ 
		return this.domManip（arguments，function（elem）{ 
			if（this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9）{ 
				var target = manipulationTarget（this，elem）; 
				target.insertBefore（elem，target.firstChild）; 
			} 
		}）; 
	}，

	before：function（）{ 
		return this.domManip（arguments，function（elem）{ 
			if（this.parentNode）{ 
				this.parentNode.insertBefore（elem，this）; 
			} 
		}）; 
	}，

	之后：功能（）{
		return this.domManip（arguments，function（elem）{ 
			if（this.parentNode）{ 
				this.parentNode.insertBefore（elem，this.nextSibling）; 
			} 
		}）; 
	}，

	// keepData仅供内部使用 - 请不要
	删除文件：function（selector，keepData）{ 
		var elem，
			elems = selector？jQuery.filter（selector，this）：this，
			i = 0; 

		for（;（elem = elems [i]）！= null; i ++）{ 
			if（！keepData && elem.nodeType === 1）{ 
				jQuery.cleanData（getAll（elem））; 
			} 

			if（elem.parentNode）{ 
				if（keepData && jQuery.contains（elem.ownerDocument，elem））{ 
					setGlobalEval（getAll（elem，“script”））;
				} 
				elem.parentNode.removeChild（elem）; 
			} 
		} 

		返回这一点; 
	}，

	empty：function（）{ 
		var elem，
			i = 0; 

		for（;（elem = this [i]）！= null; i ++）{ 
			if（elem.nodeType === 1）{ 

				//防止内存泄漏
				jQuery.cleanData（getAll（elem，false））; 

				//删除所有剩余的节点
				elem.textContent =“”; 
			} 
		} 

		返回这一点; 
	}，

	clone：function（dataAndEvents，deepDataAndEvents）{ 
		dataAndEvents = dataAndEvents == null？false：dataAndEvents; 
		deepDataAndEvents = deepDataAndEvents == null？dataAndEvents：deepDataAndEvents;

		return this.map（function（）{ 
			return jQuery.clone（this，dataAndEvents，deepDataAndEvents）; 
		}）; 
	}，

	html：function（value）{ 
		return jQuery.access（this，function（value）{ 
			var elem = this [0] || {}，
				i = 0，
				l = this.length; 

			if（value === undefined && elem.nodeType === 1）{ 
				return elem.innerHTML; 
			} 

			//看看我们是否可以使用快捷方式并使用innerHTML 
			if（typeof value ===“string”&&！rnoInnerhtml.test（value）&& 
				！wrapMap [（rtagName.exec（value）|| [“”，“”]）[1] .toLowerCase（）]）{ 

				value = value.replace（rxhtmlTag，“<$ 1> </ $ 2>”）;

					for（; i <l; i ++）{ 
						elem = this [i] || {}; 

						// 
						如果（elem.nodeType === 1）{ 
							jQuery.cleanData（getAll（elem，false）），删除元素节点并防止内存泄漏; 
							elem.innerHTML = value; 
						} 
					} 

					ELEM = 0; 

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if（parent）{ 
				//如果它已移动（＃13810）
				if（next && next.parentNode！== parent）{ 
					next = this.nextSibling; 
				} 
				jQuery的（本）卸下摆臂（）; 
				parent.insertBefore（elem，next）; 
			} 
		//允许新内容包含来自上下文集的元素
		}，true）;

		//强制删除如果没有新内容（例如，来自空参数）
		返回i？这个：this.remove（）; 
	}，

	detach：function（selector）{ 
		return this.remove（selector，true）; 
	}，

	domManip：function（args，callback，allowIntersection）{ 

		//展平任何嵌套数组
		args = core_concat.apply（[]，args）; 

		var fragment，first，scripts，hasScripts，node，doc，
			i = 0，
			l = this.length，
			set = this，
			iNoClone = l  -  1，
			value = args [0]，
			isFunction = jQuery.isFunction（value）; 

		//我们无法在WebKit中克隆包含checked的节点片段
		if（isFunction ||！（l <= 1 || typeof value！==“string”|| jQuery.support.checkClone ||！rchecked.test（value）））{ 
			return this.each（function（index）{ 
				var self = set.eq（index）; 
				if（isFunction）{ 
					args [0] = value.call（this，index，self.html（））; 
				} 
				self.domManip（args，callback，allowIntersection）; 
			}）; 
		} 

		if（l）{ 
			fragment = jQuery.buildFragment（args，this [0] .ownerDocument，false，！allowIntersection && this）; 
			first = fragment.firstChild; 

			if（fragment.childNodes.length === 1）{ 
				fragment = first; 
			} 

			if（first）{
				scripts = jQuery.map（getAll（fragment，“script”），disableScript）; 
				hasScripts = scripts.length; 

				//将原始片段用于最后一个项而不是第一个项，因为它可能会
				在某些情况下被错误地清空（＃8070）。
				for（; i <l; i ++）{ 
					node = fragment; 

					if（i！== iNoClone）{ 
						node = jQuery.clone（node，true，true）; 

						//保留对克隆脚本的引用以便以后恢复
						if（hasScripts）{ 
							//支持：QtWebKit 
							// jQuery.merge因为core_push.apply（_，arraylike）抛出
							jQuery.merge（scripts，getAll（node，“script”）） ; 
						} 
					}

					callback.call（this [i]，node，i）; 
				} 

				if（hasScripts）{ 
					doc = scripts [scripts.length  -  1] .ownerDocument; 

					//重新启用脚本
					jQuery.map（scripts，restoreScript）; 

					//在第一次文档插入时评估可执行脚本
					（i = 0; i <hasScripts; i ++）{ 
						node = scripts [i]; 
						if（rscriptType.test（node.type ||“”）&& 
							！data_priv.access（node，“globalEval”）&& jQuery.contains（doc，node））{ 

							if（node.src）{ 
								//希望ajax可用... 
								jQuery._evalUrl（node.src）; 
							} else { 
								jQuery.globalEval（node.textContent。
							} 
						} 
					} 
				} 
			} 
		} 

		返回 
	} 
}; 

jQuery.each（{ 
	appendTo：“append”，
	prependTo：“prepend”，
	insertBefore：“before”，
	insertAfter：“after”，
	replaceAll：“replaceWith” 
}，function（name，original）{ 
	jQuery.fn [name] = function（selector）{ 
		var elems，
			ret = []，
			insert = jQuery（selector），
			last = insert.length  -  1，
			i = 0; 

		for（; i <= last; i ++）{ 
			elems = i === last ？this：this.clone（true）; 
			jQuery（insert [i]）[original]（elems）; 

			//支持：
			// .get（）因为core_push.apply（_，arraylike）抛出
			core_push.apply（ret，elems.get（））; 
		} 

		return this.pushStack（ret）; 
	}; 
}）; 

jQuery.extend（{ 
	克隆：功能（ELEM，dataAndEvents，deepDataAndEvents）{ 
		VAR I，L，srcElements，destElements，
			克隆= elem.cloneNode（真），
			页入= jQuery.contains（elem.ownerDocument，ELEM）; 

		//支持：IE> = 9 
		//修复克隆问题
		if（！jQuery.support.noCloneChecked &&（elem.nodeType === 1 || elem.nodeType === 11）&&！jQuery.isXMLDoc（elem））{ 

			//我们出于性能原因，请
			回避Sizzle：http：//jsperf.com/getall-vs-sizzle/2 destElements = getAll（clone）;
			srcElements = getAll（elem）; 

			for（i = 0，l = srcElements.length; i <l; i ++）{ 
				fixInput（srcElements [i]，destElements [i]）; 
			} 
		} 

		//来自原稿的事件复制到克隆
		如果（dataAndEvents）{ 
			如果（deepDataAndEvents）{ 
				srcElements = srcElements || getAll（elem）; 
				destElements = destElements || getAll（clone）; 

				for（i = 0，l = srcElements.length; i <l; i ++）{ 
					cloneCopyEvent（srcElements [i]，destElements [i]）; 
				} 
			else { 
				cloneCopyEvent（elem，clone）; 
			} 
		} 

		//保留脚本评估历史记录
		destElements = getAll（clone，“script”）; 
		if（destElements.length> 0）{ 
			setGlobalEval（destElements，！inPage && getAll（elem，“script”））; 
		} 

		//返回克隆集
		返回克隆; 
	}，

	buildFragment：function（elems，context，scripts，selection）{ 
		var elem，tmp，tag，wrap，contains，j，
			i = 0，
			l = elems.length，
			fragment = context.createDocumentFragment（），
			nodes = [] ; 

		for（; i <l; i ++）{ 
			elem = elems [i]; 

			if（elem || elem === 0）{ 

				//直接添加节点
				if（jQuery.type（elem）===“object”）{ 
					//支持：QtWebKit
					// jQuery.merge因为core_push.apply（_，arraylike）抛出
					jQuery.merge（nodes，elem.nodeType？[elem]：elem）; 

				//将非html转换为文本节点
				}否则if（！rhtml.test（elem））{ 
					nodes.push（context.createTextNode（elem））; 

				//将html转换为DOM节点
				} else { 
					tmp = tmp || fragment.appendChild（context.createElement（“div”））; 

					//反序列化标准表示
					标记=（rtagName.exec（elem）|| [“”，“”]）[1] .toLowerCase（）; 
					wrap = wrapMap [tag] || wrapMap._default; 
					tmp.innerHTML = wrap [1] + elem.replace（rxhtmlTag，“<$ 1> </ $ 2>”）+ wrap [2];

					j = wrap [0]; 
					while（
						j-- ）{ tmp = tmp.lastChild; 
					} 

					//支持：QtWebKit的
					// jQuery.merge因为core_push.apply（_，arraylike）抛出
					jQuery.merge（节点，tmp.childNodes）; 

					//记住顶级容器
					tmp = fragment.firstChild; 

					//修复＃12346 
					//支持：Webkit，IE 
					tmp.textContent =“”; 
				} 
			} 
		} 

		//从片段中除去包装
		fragment.textContent = “”; 

		i = 0; 
		while（（elem = nodes [i ++]））{ 

			//＃4087  - 如果origin和destination元素相同，那么这是
			//那个元素，如果没有做任何事情
			（选择&& jQuery.inArray（elem，selection）！== -1）{ 
				continue; 
			} 

			contains = jQuery.contains（elem.ownerDocument，elem）; 

			//追加到片段
			tmp = getAll（fragment.appendChild（elem），“script”）; 

			//保留脚本评估历史
			if（contains）{ 
				setGlobalEval（tmp）; 
			} 

			//捕获可执行文件
			if（scripts）{ 
				j = 0; 
				while（（elem = tmp [j ++]））{ 
					if（rscriptType.test（elem.type ||“”））{ 
						scripts.push（elem）; 
					} 
				} 
			} 
		} 

		返回片段;
	，

	cleanData：function（elems）{ 
		var data，elem，events，type，key，j，
			special = jQuery.event.special，
			i = 0; 

		for（;（elem = elems [i]）！== undefined; i ++）{ 
			if（Data.accepts（elem））{ 
				key = elem [data_priv.expando]; 

				if（key &&（data = data_priv.cache [key]））{ 
					events = Object.keys（data.events || {}）; 
					if（events.length）{ 
						for（j = 0;（type = events [j]）！== undefined; j ++）{ 
							if（special [type]）{ 
								jQuery.event.remove（elem，type）; 

							//这是避免jQuery.event.remove的开销
							} else { 的快捷方式
								jQuery.removeEvent（elem，type，data.handle）; 
							} 
						} 
					} 
					如果（data_priv.cache [键]）{ 
						//丢弃任何剩余的`private`数据
						删除data_priv.cache [键]。
					} 
				} 
			} 
			//丢弃任何剩余的`user`数据
			删除data_user.cache [ELEM [data_user.expando]]; 
		} 
	，

	_evalUrl：function（url）{ 
		return jQuery.ajax（{ 
			url：url，
			type：“GET”，
			dataType：“script”，
			async：false，
			global：false，
			“throws”：true 
		}）; 
	} 
}; 

//支持：1.x兼容性
//操作表需要一个tbody 
函数manipulationTarget（elem，content）{ 
	return jQuery.nodeName（elem，“table”）&& 
		jQuery.nodeName（content.nodeType === 1？content：content.firstChild，“tr”）？

		elem.getElementsByTagName（“tbody”）[0] || 
			elem.appendChild（elem.ownerDocument.createElement（“tbody”））：
		elem; 
} 

//替换/恢复脚本元素的type属性以获得安全的DOM操作
函数disableScript（elem）{ 
	elem.type =（elem.getAttribute（“type”）！== null）+“/”+ elem.type; 
	返回元素; 
} 
功能restoreScript（ELEM）{ 
	VAR匹配= rscriptTypeMasked.exec（elem.type）;

		elem.type = match [1]; 
	} else { 
		elem.removeAttribute（“type”）; 
	} 

	return elem; 
} 

//将脚本标记为已经被评估的
函数setGlobalEval（elems，refElements）{ 
	var l = elems.length，
		i = 0; 

	for（; i <l; i ++）{ 
		data_priv.set（
			elems [i]，“globalEval”，！refElements || data_priv.get（refElements [i]，“globalEval”）
		）; 
	} 
} 

函数cloneCopyEvent（SRC，目标寄存器）{ 
	VAR I，L，类型，pdataOld，pdataCur，udataOld，udataCur，事件; 

	if（dest.nodeType！== 1）{ 
		return; 
	} 

	// 1.复制私有数据：事件，处理程序等。
	if（data_priv.hasData（src））{ 
		pdataOld = data_priv.access（src）; 
		pdataCur = data_priv.set（dest，pdataOld）; 
		events = pdataOld.events; 

		if（events）{ 
			delete pdataCur.handle; 
			pdataCur.events = {}; 

			for（in in events）{ 
				for（i = 0，l = events [type] .length; i <l; i ++）{ 
					jQuery.event.add（dest，type，events [type] [i]）; 
				} 
			} 
		} 
	} 

	// 2.复制用户数据
	，如果（data_user.hasData（SRC））{ 
		udataOld = data_user.access（SRC）; 
		udataCur = jQuery.extend（{}，udataOld）; 

		data_user.set（dest，udataCur）; 
	} 
}


function getAll（context，tag）{ 
	var ret = context.getElementsByTagName？context.getElementsByTagName（tag ||“*”）：
			context.querySelectorAll？context.querySelectorAll（tag ||“*”）：
			[]; 

	return tag === undefined || tag && jQuery.nodeName（context，tag）？
		jQuery.merge（[context]，ret）：
		ret; 
} 

//支持：IE> = 9 
函数fixInput（src，dest）{ 
	var nodeName = dest.nodeName.toLowerCase（）; 

	//无法保持克隆复选框或单选按钮的已检查状态。
	if（nodeName ===“input”&& manipulation_rcheckableType.test（src.type））{ 
		dest.checked = src.checked;

	//无法在克隆选项时将所选选项返回到默认选定状态
	}否则if（nodeName ===“input”|| nodeName ===“textarea”）{ 
		dest.defaultValue = src.defaultValue; 
	} 
} 
1.3中（{ 
	wrapAll：功能（HTML）{ 
		VAR涡卷; 

		如果（jQuery.isFunction（HTML））{ 
			返回this.each（功能（I）{ 
				jQuery的（本）.wrapAll（html.call（这个，i））; 
			}）; 
		} 

		if（this [0]）{ 

			//包围目标的元素
			包裹= jQuery（html，this [0] .ownerDocument）.eq（0）.clone（true） ; 

			if（this [0] .parentNode）{ 
				wrap.insertBefore（this [0]）; 
			}

			wrap.map（function（）{ 
				var elem = this; 

				while（elem.firstElementChild）{ 
					elem = elem.firstElementChild; 
				} 

				return elem; 
			}）。append（this）; 
		} 

		返回这一点; 
	}，

	wrapInner：function（html）{ 
		if（jQuery.isFunction（html））{ 
			return this.each（function（i）{ 
				jQuery（this）.wrapInner（html.call（this，i））; 
			}）; 
		} 

		返回this.each（函数（）{ 
			VAR自= jQuery的（本），
				内容= self.contents（）; 

			如果（contents.length）{ 
				contents.wrapAll（HTML）; 

			}其他{ 
				self.append（HTML）;
			} 
		}; 
	}，

	wrap：function（html）{ 
		var isFunction = jQuery.isFunction（html）; 

		return this.each（function（i）{ 
			jQuery（this）.wrapAll（isFunction？html.call（this，i）：html）; 
		}）; 
	}，

	unwrap：function（）{ 
		return this.parent（）。each（function（）{ 
			if（！jQuery.nodeName（this，“body”））{ 
				jQuery（this）.replaceWith（this.childNodes）; 
			} 
		} ）。结束（）; 
	} 
}; 
var curCSS，iframe，
	//如果display is none或者以table开头，除了“table”，“table-cell”或“table-caption” 
	//请参阅此处获取显示值：https：//developer.mozilla。
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,rmargin 
	= / ^ margin /，
	rnumsplit = new RegExp（“^（”+ core_pnum +“）（。*）$”， “i”），
	rnumnonpx = new RegExp（“^（”+ core_pnum +“）（?! px）[az％] + $”，“i”），
	rrelNum = new RegExp（“^（[+  - ]） =（“+ core_pnum +”）“，”i“），
	elemdisplay = {BODY：”block“}，

	cssShow = {position：”absolute“，visibility：”hidden“，display：”block“}，
	cssNormalTransform = { 
		letterSpacing：0，
		fontWeight：400 
	}，

	cssExpand = [“Top”，“Right”，“Bottom”，“Left”]，
	cssPrefixes = [“Webkit”，“O”，“Moz“，”ms“]; 

//返回映射到潜在供应商前缀属性
函数vendorPropName（样式，名称）的css属性{

	//不是供应商前缀的名称的快捷方式
	if（样式中的名称）{ 
		return name; 
	} 

	//检查供应商前缀名称
	var capName = name.charAt（0）.toUpperCase（）+ name.slice（1），
		origName = name，
		i = cssPrefixes.length; 

	while（
		i  - ）{ name = cssPrefixes [i] + capName; 
		if（姓名样式）{ 
			return name; 
		} 
	} 

	返回origName; 
} 

功能是否隐藏（ELEM，EL）{ 
	//是否隐藏可能从jQuery的＃滤波函数调用; 
	//在这种情况下，元素将是第二个参数
	elem = el || ELEM;
	return jQuery.css（elem，“display”）===“none”|| ！jQuery.contains（elem.ownerDocument，elem）; 
} 

//注意：我们已经列入window.getComputedStyle的“窗口” 
//因为node.js的jsdom将在不打破它。
function getStyles（elem）{ 
	return window.getComputedStyle（elem，null）; 
} 

功能显示隐藏（元素，显示）{ 
	变种显示，ELEM，隐藏，
		值= []，
		索引= 0，
		长度= elements.length; 

	for（; index <length; index ++）{ 
		elem = elements [index]; 
		if（！elem.style）{ 
			继续; 
		} 

		values [index] = data_priv.get（elem，“olddisplay”）; 
		display = elem。
		if（show）{ 
			//重置此元素的内联显示以了解是否
			//被级联规则隐藏
			如果（！values [index] && display ===“none”）{ 
				elem.style.display =“”; 
			} 

			//设置已重写与显示元素：无
			在样式表中所使用的默认浏览器样式是// 
			//对于这样的元件
			，如果（elem.style.display ===“” &&是否隐藏（ELEM））{ 
				values [index] = data_priv.access（elem，“olddisplay”，css_defaultDisplay（elem.nodeName））; 
			} 
		else { 

			if（！values [index]）{ 
				hidden = isHidden（elem）; 

				if（显示&& 显示！==“无”|| ！hidden）{
					data_priv.set（elem，“olddisplay”，隐藏？display：jQuery.css（elem，“display”））; 
				} 
			} 
		} 
	} 

	//设置的大多数元素的显示在第二环路
	//避免恒定回流
	为（索引= 0;索引<长度;索引++）{ 
		ELEM =元素[指数]; 
		if（！elem.style）{ 
			继续; 
		} 
		if（！show || elem.style.display ===“none”|| elem.style.display ===“”）{ 
			elem.style.display = show？值[index] || ““ ： “没有”; 
		} 
	} 

	返回元件; 
} 

1.3中（{ 
	CSS：功能（名称，值）{
		return jQuery.access（this，function（elem，name，value）{ 
			var styles，len，
				map = {}，
				i = 0; 

			if（jQuery.isArray（name））{ 
				styles = getStyles（elem）; 
				len = name .length; 

				for（; i <len; i ++）{ 
					map [name [i]] = jQuery.css（elem，name [i]，false，styles）; 
				} 

				return map; 
			} 

			return value！== undefined？
				jQuery .style（elem，name，value）：
				jQuery.css（elem，name）; 
		}，name，value，arguments.length> 1）; 
	}，
	show：function（）{ 
		return showHide（this，true）; 
	}，
	hide：function（）{
		return showHide（this）; 
	}，
	toggle：function（state）{ 
		if（typeof state ===“boolean”）{ 
			return state？this.show（）：this.hide（）; 
		} 

		返回this.each（函数（）{ 
			如果（是否隐藏（本））{ 
				jQuery的（本）.show（）; 
			}其他{ 
				jQuery的（本）.hide（）; 
			} 
		}）; 
	} 
}; 

jQuery.extend（{ 
	//添加样式属性挂钩，用于覆盖
	获取和设置样式属性的默认//行为
	cssHooks：{ 
		opacity：{ 
			get：function（elem，computed）{ 
				if（computed）{ 
					//我们应该总是从不透明度中得到一个数字
					var ret = curCSS（elem，“opacity”）; 
					return ret ===“”？“1”：ret; 
				} 
			} 
		} 
	} 

	//不要自动“PX”添加到这些可能的，无单位的性质
	cssNumber：{ 
		“信息columnCount”：真实的，
		“fillOpacity”：真实的，
		“fontWeight设置”：真实的，
		“lineHeight是”：真实的，
		“不透明度“：true，
		”order“：true，
		”orphans“：true，
		”widows“：true，
		”zIndex“：true，
		”zoom“：true 
	}，

	}，

	//获取并设置DOM节点
	样式的样式属性：function（elem，name，value，extra）{ 
		// 
		如果（！elem || elem.nodeType ==，请不要在文本和注释节点上设置样式）= 3 || elem.nodeType === 8 ||！elem.style）{ 
			return; 
		} 

		//确保我们正在使用正确的名称
		var ret，type，hooks，
			origName = jQuery.camelCase（name），
			style = elem.style; 

		name = jQuery.cssProps [origName] || （jQuery.cssProps [origName] = vendorPropName（style，origName））; 

		//获取
		前缀版本的
		钩子//后跟未加前缀的版本hooks = jQuery.cssHooks [name] || jQuery.cssHooks [origName];

		//检查我们是否设置了值
		if（value！== undefined）{ 
			type = typeof value; 

			//将相对数字字符串（+ =或 -  =）转换为相对数字。＃7345 
			if（type ===“string”&&（ret = rrelNum.exec（value）））{ 
				value =（ret [1] + 1）* ret [2] + parseFloat（jQuery.css（elem，name） ）; 
				//修正bug＃9237 
				type =“number”; 
			} 

			//确保未设置NaN和null值。请参阅：＃7116 
			if（value == null || type ===“number”&& isNaN（value））{ 
				return; 
			} 

			//如果传入了一个数字，将'px'添加到（某些CSS属性除外）
			if（type ===“number”＆
				value + =“px”; 
			} 

			//修正了＃8908，可以更准确地在指定cssHooks做setter方法，
			//但这意味着定义八（为每个有问题的属性）相同的功能
			，如果（！jQuery.support.clearCloneStyle &&值===“ “&& name.indexOf（”background“）=== 0）{ 
				style [name] =”inherit“; 
			} 

			//如果提供了一个钩子，请使用该值，否则只需设置指定值
			if（！hooks ||！（挂钩中的“set”）||（value = hooks.set（elem，value，extra））！ == undefined）{ 
				style [name] = value; 
			} 

		} else { 
			//如果提供了一个钩子，那么从那里得到非计算值
			if（hooks &&“get”in hooks &&（ret = hooks.get（elem，false，extra））！== undefined）{ 
				return ret; 
			} 

			//否则只从样式对象
			返回样式[name]中获取值; 
		} 
	，

	css：function（elem，name，extra，styles）{ 
		var val，num，hooks，
			origName = jQuery.camelCase（name）; 

		//确保我们正在使用正确的名称
		name = jQuery.cssProps [origName] || （jQuery.cssProps [origName] = vendorPropName（elem.style，origName））; 

		//获取
		前缀版本的
		钩子//后跟未加前缀的版本hooks = jQuery.cssHooks [name] || jQuery.cssHooks [origName];

		//如果提供了一个钩子，则从那里得到计算值
		if（hooks &&“get”in hooks）{ 
			val = hooks.get（elem，true，extra）; 
		} 

		//否则，如果存在获取计算值的方法，请使用
		if（val === undefined）{ 
			val = curCSS（elem，name，styles）; 
		} 

		//将“normal”转换为计算值
		if（val ===“normal”&& name in cssNormalTransform）{ 
			val = cssNormalTransform [name]; 
		} 

		//返回，转换为数字，如果强制或提供限定符，val看起来是数字
		if（extra ===“”|| extra）{ 
			num = parseFloat（val）; 
			return extra === true || jQuery的。isNumeric（num）？num || 0：val;
		} 
		return val; 
	} 
}; 

curCSS = function（elem，name，_computed）{ 
	var width，minWidth，maxWidth，
		computed = _computed || getStyles（elem），

		//支持：IE9 
		// getPropertyValue仅用于IE9 中的.css（'filter'），参见＃12537 
		ret = calculated ？computed.getPropertyValue（name）|| computed [name]：undefined，
		style = elem.style; 

	if（computed）{ 

		if（ret ===“”&&！jQuery.contains（elem.ownerDocument，elem））{ 
			ret = jQuery.style（elem，name）; 
		} 

		//支持：Safari 5.1 
		//向Dean Edwards推介“令人敬畏的黑客”
		// Safari 5.1.7（至少）返回一组较大值的百分比，但宽度似乎是可靠的像素
		//这是针对CSSOM草案规范的：http：//dev.w3.org/csswg/cssom/ ＃resolved-values 
		if（rnumnonpx.test（ret）&& rmargin.test（name））{ 

			//记住原始值
			width = style.width; 
			minWidth = style.minWidth; 
			maxWidth = style.maxWidth; 

			//输入新值以获得out 
			style.minWidth = style.maxWidth = style.width = ret; 
			ret = computed.width; 

			//恢复更改的值
			style.width = width; 
			style.minWidth = minWidth; 
			style.maxWidth = maxWidth; 
		} 
	}

	返回; 
}; 


function setPositiveNumber（elem，value，subtract）{ 
	var matches = rnumsplit.exec（value）; 
	回归比赛？
		//防止未定义的“减去”，例如，当在cssHooks中使用
		Math.max（0，匹配[1]  - （减去|| 0））+（匹配[2] ||“px”）：
		value; 
} 

功能augmentWidthOrHeight（ELEM，名，特，isBorderBox，样式）{ 
	VAR I =额外===（isBorderBox “边界”： “内容”）？
		//如果我们已经有了正确的测量，请避免增加
		4：
		//否则初始化水平或垂直属性
		名称===“width”？1：0，

		val = 0; 

	for（; i <4;
		//两个盒子模型都不包括边距，所以如果我们需要它，请添加它
		（额外===“margin”）{ 
			val + = jQuery.css（elem，extra + cssExpand [i]，true，styles）; 
		} 

		如果（isBorderBox）{ 
			//边界盒包括填充，因此将其删除，如果我们想要的内容
			，如果（额外=== “内容”）{ 
				VAL - = jQuery.css（ELEM， “填充” + cssExpand [I]，真的，风格）; 
			} 

			//此时，extra不是border也不是margin，所以删除border 
			if（extra！==“margin”）{ 
				val  -  = jQuery.css（elem，“border”+ cssExpand [i] +“Width” ，真实，风格）; 
			} 
		} else { 
			//此时，extra不是内容，因此添加填充
			val + = jQuery.css（elem，“padding”+ cssExpand [i]，true，styles）; 

			//此时，extra不是content也不是padding，所以添加border 
			if（extra！==“padding”）{ 
				val + = jQuery.css（elem，“border”+ cssExpand [i] +“Width”，真的，风格）; 
			} 
		} 
	} 

	返回VAL; 
} 

功能getWidthOrHeight（ELEM，名，特）{ 

	//与印性质，这相当于边界框的值开始
	VAR valueIsBorderBox = TRUE，
		VAL =名称=== “宽”？elem.offsetWidth：elem.offsetHeight，
		styles = getStyles（elem），
		isBorderBox = jQuery.support.boxSizing && jQuery.css（elem，“boxSizing”，false，

	//一些非html元素为offsetWidth返回undefined，所以检查null / undefined 
	// svg  -  https://bugzilla.mozilla.org/show_bug.cgi?id=649285 
	// MathML  -  https://bugzilla.mozilla .org / show_bug.cgi？id = 491668 
	if（val <= 0 || val == null）{ 
		//如果需要，回退到计算然后未计算的css 
		val = curCSS（elem，name，styles）; 
		if（val <0 || val == null）{ 
			val = elem.style [name]; 
		} 

		//计算单位不是像素。停在这里然后回来。
		if（rnumnonpx.test（val））{ 
			return val; 
		} 

		//如果浏览器返回不可靠的值，我们需要检查样式
		// for getComputedStyle默默地回退到可靠的elem.style 
		valueIsBorderBox = isBorderBox &&（jQuery.support.boxSizingReliable || val === elem.style [name]）; 

		//标准化“”，自动，并准备额外的
		val = parseFloat（val）|| 0; 
	} 

	//使用有源箱规模模型加/减无关的风格
	回归（VAL + 
		augmentWidthOrHeight（
			ELEM，
			名称，
			额外||（isBorderBox “边界”： “内容”），
			valueIsBorderBox，
			样式
		）
	）+ “PX” ;

		display = elemdisplay [nodeName]; 

	if（！display）{ 
		display = actualDisplay（nodeName，doc）; 

		//如果简单方法失败，请从iframe内部读取
		if（display ===“none”||！display）{ 
			//如果可能，使用已创建的iframe 
			iframe =（iframe || 
				jQuery（“<iframe frameborder） =' 
				0'width =' 0'height ='0'/>“）。css（”cssText“，”display：block！important“）
			）。appendTo（doc.documentElement）; 

			//总是编写一个新的HTML骨架，以便Webkit和Firefox不会重复使用
			doc =（iframe [0] .contentWindow || iframe [0] .contentDocument）.document; 
			doc.write（“<！doctype html> <html> <body>

			display = actualDisplay（nodeName，doc）; 
			iframe.detach（）; 
		} 

		//存储正确的默认显示
		elemdisplay [nodeName] = display; 
	} 

	返回显示; 
} 

//从css_defaultDisplay内才调用
函数actualDisplay（姓名，DOC）{ 
	VAR ELEM = jQuery的（doc.createElement（名））.appendTo（doc.body），
		显示= jQuery.css（ELEM [0]， “显示” ）; 
	elem.remove（）; 
	返回显示; 
} 

jQuery.each（[“height”，“width”]，function（i，name）{ 
	jQuery.cssHooks [name] = { 
		get：function（elem，computed，extra）{ 
			if（computed）{
				//如果我们无形地显示它们
				，某些元素可以有维度信息//但是，它必须具有当前显示样式，这将受益于此
				返回elem.offsetWidth === 0 && rdisplayswap.test（jQuery.css（elem，“display） “））？
					jQuery.swap（elem，cssShow，function（）{ 
						return getWidthOrHeight（elem，name，extra）; 
					}）：
					getWidthOrHeight（elem，name，extra）; 
			} 
		，

		set：function（elem，value，extra）{ 
			var styles = extra && getStyles（elem）; 
			return setPositiveNumber（elem，value，extra？
				augmentWidthOrHeight（
					elem，
					name，
					extra，
					jQuery.support.boxSizing && jQuery.css（elem，“boxSizing”，false，styles）===“border-box”，
					styles 
				）：0 
			）; 
		} 
	}; 
}）; 

//在DOM就绪之前无法添加这些钩子，因为支持测试
//直到DOM就绪后才运行
jQuery（function（）{ 
	//支持：Android 2.3 
	if（！jQuery.support.reliableMarginRight）{ 
		jQuery.cssHooks .marginRight = { 
			get：function（elem，computed）{ 
				if（computed）{ 
					//支持：Android 2.3 
					// WebKit Bug 13343  -  getComputedStyle为margin-right返回错误值
					//通过暂时将元素显示设置为内联来解决问题块
					return jQuery.swap（elem，{“display”：“inline-block”}，
						curCSS，[elem，“marginRight”]）; 
				} 
			} 
		}; 
	} 

	// Webkit bug：https：
	//bugs.webkit.org/show_bug.cgi ？id = 29084 // getComputedStyle在指定top / left / bottom / right 
	// 时返回百分比，而不是让css模块依赖于偏移量模块，我们只是在这里查一下
	（！jQuery.support.pixelPosition && jQuery.fn.position）{ 
		jQuery.each（[“top”，“left”]，function（i，prop）{ 
			jQuery.cssHooks [prop ] = { 
				get：function（elem，computed）{ 
					if（computed）{ 
						computed = curCSS（elem，prop）;
						//如果curCSS返回百分比，则回
						退到偏移量返回rnumnonpx.test（计算）？
							jQuery（elem）.position（）[prop] +“px”：
							computed; 
					} 
				} 
			}; 
		}）; 
	} 

}; 

if（jQuery.expr && jQuery.expr.filters）{ 
	jQuery.expr.filters.hidden = function（elem）{ 
		//支持：Opera <= 12.12 
		// Opera在某些元素上报告offsetWidths和offsetHeights小于零
		返回elem。 offsetWidth <= 0 && elem.offsetHeight <= 0; 
	}; 

	jQuery.expr.filters.visible = function（elem）{ 
		return！jQuery.expr.filters.hidden（elem）; 
	}; 
}

//动画使用这些钩子来扩展属性
jQuery.each（{ 
	margin：“”，
	padding：“”，
	border：“Width” 
}，function（prefix，suffix）{ 
	jQuery.cssHooks [prefix + suffix] = { 
		expand：function（value）{ 
			var i = 0，
				expanded = {}，

				//假设一个数字，如果不是字符串
				parts = typeof value ===“string”？value.split（“”）：[value]; 

			for（; i <4; i ++）{ 
				expanded [prefix + cssExpand [i] + suffix] = 
					parts [i] || parts [i  -  2] || parts [0]; 
			} 

			return expanded; 
		} 
	}; 

	if（ ！rmargin.test（前缀））{
		jQuery.cssHooks [prefix + suffix] .set = setPositiveNumber; 
	} 
}; 
var r20 = /％20 / g，
	rbracket = / \ [\] $ /，
	rCRLF = / \ r？\ n / g，
	rsubmitterTypes = / ^（？：submit | button | image | reset | file）$ / i ，
	rsubmittable = / ^（？：input | select | textarea | keygen）/ i; 

jQuery.fn.extend（{ 
	serialize：function（）{ 
		return jQuery.param（this.serializeArray（））; 
	}，
	serializeArray：function（）{ 
		return this.map（function（）{ 
			//可以为“元素添加propHook” “过滤或添加表单元素
			var elements = jQuery.prop（this，”elements“）; 
			return elements？jQuery.makeArray（elements）：this; 
		}）. 
		filter（function（）{
			var type = this.type; 
			//使用.is（“：disabled”）以便fieldset [disabled]可以
			返回this.name &&！jQuery（this）.is（“：disabled”）&& 
				rsubmittable.test（this.nodeName）&&！rsubmitterTypes.test （type）&& 
				（this.checked ||！manipulation_rcheckableType.test（type））; 
		} 
		.map（function（i，elem）{ 
			var val = jQuery（this）.val（）; 

			return val == null？
				null：
				jQuery.isArray（val）？
					jQuery.map（val，function（val）{ 
						return {name：elem.name，value：val.replace（rCRLF，“\ r \ n”）}; 
					}）：
					{name：elem.name，value：val.replace（rCRLF，“\ r \ n”） }; 
		}）。得到（）; 
	} 
};

//将表单元素数组或一组
//键/值序列化为查询字符串
jQuery.param = function（a，traditional）{ 
	var prefix，
		s = []，
		add = function（key，value）{ 
			/ /如果value是一个函数，调用它并返回其
			值= jQuery.isFunction（value）？value（）:( value == null？“”：value）; 
			s [s.length] = encodeURIComponent（key）+“=”+ encodeURIComponent（value）; 
		}; 

	//将jQuery <= 1.3.2行为的传统设置为true。
	if（traditional === undefined）{ 
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional; 
	} 

	//如果传入了一个数组，则假设它是一个表单元素数组。
	if（jQuery.isArray（a）||（a.jquery &&！jQuery.isPlainObject（a）））{ 
		//序列化表单元素
		jQuery.each（a，function（）{ 
			add（this.name，this.value） ）; 
		}）; 

	} else { 
		//如果是传统的，编码“旧的”方式（1.3.2或更旧的方式
		//做它），否则递归编码params。
		for（a中的前缀）{ 
			buildParams（前缀，[前缀]，繁体，添加）; 
		} 
	} 

	//返回所得到的序列
	返回s.join（ “＆”）.replace（R20， “+”）; 
}; 

function buildParams（prefix，obj，traditional，add）{ 
	var name; 

	if（jQuery。
		jQuery.each（obj，function（i，v）{ 
			if（traditional || rbracket.test（prefix））{ 
				//将每个数组项视为标量.add 
				（prefix，v）; 

			} else { 
				// Item is非标量（数组或对象），编码其数字索引
				.buildParams（前缀+“[”+（typeof v ===“object”？i：“”）+“]”，v，traditional，add）; 
			} 
		}）; 

	} else if（！traditional && jQuery.type（obj）===“object”）{ 
		//序列化对象项。
		for（obj中的名字）{ 
			buildParams（prefix +“[”+ name +“]”，obj [name]，traditional，add）; 
		} 

	} else { 
		//序列化标量项。
		add（prefix，obj）; 
	} 
}
jQuery.each（（“blur focus focusin focusout load resize scroll unload click dblclick”+ 
	“mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave”+ 
	“change select submit keydown keypress keyup error contextmenu”）。split（“”），function（i， name）{ 

	//句柄事件绑定
	jQuery.fn [name] = function（data，fn）{ 
		return arguments.length> 0？
			this.on（name，null，data，fn）：
			this.trigger（name）; 
	} ; 
}）; 

jQuery.fn.extend（{ 
	hover：function（fnOver，fnOut）{ 
		return this.mouseenter（fnOver）.mouseleave（fnOut || fnOver）; 
	}，

	bind：function（types，data，fn）{ 
		return this.on（ types，null，data，fn）;
	}，
	unbind：function（types，fn）{ 
		return this.off（types，null，fn）; 
	}，

	delegate：function（selector，types，data，fn）{ 
		return this.on（types，selector，data，fn）; 
	}，
	undelegate：function（selector，types，fn）{ 
		//（namespace）或（selector，types [，fn]）
		返回arguments.length === 1？this.off（selector，“**”）：this.off（types，selector ||“**”，fn）; 
	} 
}; 
var 
	//文档位置
	ajaxLocParts，
	ajaxLocation，

	ajax_nonce = jQuery.now（），

	ajax_rquery = / \？/，
	rhash = /#.*$/,rts 
	= /（[？＆]）_ = [^＆] * / ，
	rheaders = / ^（。*？）：[\ t] *（[^ \ r \ n] *）$ / mg，
	//＃7653，＃8125，＃8152：本地协议检测
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res | widget）：
	$ / ，rnoContent = / ^（？ ：GET | HEAD）$ /，
	rprotocol = / ^ \ / \ //，
	rurl = /^([\w.+-]+ ：）（？：\ / / /（[^] / / ##：] ）（？::（\ d +）|）|）/，

	//保留旧加载方法的副本
	_load = jQuery.fn.load，

	/ * Prefilters 
	 * 1）它们对于引入自定义数据类型很有用（参见ajax / jsonp.js为例）
	 * 2）这些被称为：
	 *  - 在要求传输之前*  - 在
	 参数序列化之后（如果s.processData为真，s.data是一个字符串）
	 * 3）key是dataType 
	 * 4）可以使用catchall符号“*”
	 * 5）执行将以transport dataType开始，如果需要，则继续执行“*” 
	 * / 
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement（“a”）; 
	ajaxLocation.href =“”; 
	ajaxLocation = ajaxLocation.href; 
} 

//将位置分成部分
ajaxLocParts = rurl.exec（ajaxLocation.toLowerCase（））|| []; 

// jQuery.ajaxPrefilter的基本“构造函数”和jQuery.ajaxTransport 
函数addToPrefiltersOrTransports（结构）{ 

	// dataTypeExpression是可选的，默认为“*” 
	返回函数（dataTypeExpression，func）{ 

		if（typeof dataTypeExpression！==“string”） { 
			func = dataTypeExpression; 
			dataTypeExpression =“*”; 
		}

		var dataType，
			i = 0，
			dataTypes = dataTypeExpression.toLowerCase（）。match（core_rnotwhite）|| []; 

		if（jQuery.isFunction（func））{ 
			//对于dataTypeExpression中的每个dataType 
			而（（dataType = dataTypes [i ++]））{ 
				//如果请求前置
				if（dataType [0] ===“+”）{ 
					dataType = dataType.slice（1）|| “*”; 
					（structure [dataType] = structure [dataType] || []）。unshift（func）; 

				//否则追加
				} else { 
					（structure [dataType] = structure [dataType] || []）。push（func）; 
				} 
			} 
		} 
	}; 
} 

//预滤器和运输的基本检查功能
function inspectPrefiltersOrTransports（structure，options，originalOptions，jqXHR）{ 

	var inspected = {}，
		seekingTransport =（structure === transports）; 

	function inspect（dataType）{ 
		var selected; 
		检查[dataType] = true; 
		jQuery.each（structure [dataType] || []，function（_，prefilterOrFactory）{ 
			var dataTypeOrTransport = prefilterOrFactory（options，originalOptions，jqXHR）; 
			if（typeof dataTypeOrTransport ===“string”&&！seekingTransport &&！inspectpected [dataTypeOrTransport] ]）{ 
				options.dataTypes.unshift（dataTypeOrTransport）; 
				inspect（dataTypeOrTransport）; 
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if（deep）{ 
		jQuery.extend（true，target，deep）; 
	}

	回归目标; 
} 

jQuery.fn.load =功能（URL，参数，可以回调）{ 
	如果（typeof运算URL == “字符串” && _Load！）{ 
		返回_load.apply（这一点，参数）; 
	} 

	var selector，type，response，
		self = this，
		off = url.indexOf（“”）; 

	if（off> = 0）{ 
		selector = url.slice（off）; 
		url = url.slice（0，off）; 
	} 

	//如果它是一个函数
	，如果（jQuery.isFunction（PARAMS））{ 

		//我们假设它的回调
		回调=参数; 
		params = undefined; 

	//否则，构建一个参数字符串
	}否则if（params && typeof params ===“object”）{ 
		type =“

	//如果我们要修改元素，请发出请求
	if（self.length> 0）{ 
		jQuery.ajax（{ 
			url：url，

			// if“type”变量未定义，然后将使用“GET”方法
			类型： type，
			dataType：“html”，
			data：params 
		}）。done（function（responseText）{ 

			//保存响应以用于完整的回调
			响应=参数; 

			self.html（选择器？

				//如果指定了选择器，找到虚拟div中的右元素
				//排除脚本以避免IE'权限被拒绝'错误
				jQuery（“<div>”）。append（jQuery.parseHTML（responseText））。find（selector）：

				//否则使用完整结果
				responseText）; 

		完成（callback && function（jqXHR，status）{ 
			self.each（callback，response || [jqXHR.responseText，status，jqXHR]）; 
		}）; 
	} 

	返回这一点; 
}; 

//附加一堆函数来处理常见的AJAX事件
jQuery.each（[“ajaxStart”，“ajaxStop”，“ajaxComplete”，“ajaxError”，“ajaxSuccess”，“ajaxSend”]，函数（i，type）{ 
	jQuery .fn [type] = function（fn）{ 
		return this.on（type，fn）; 
	}; 
}）; 

jQuery.extend（{ 

	//用于保持活动查询
	活动数的计数器：0，

	//上次修改的头缓存，用于下一个请求
	lastModified：{}，

	ajaxSettings：{ 
		url：ajaxLocation，
		type：“GET”，
		isLocal：rlocalProtocol.test（ajaxLocParts [1]），
		global：true，
		processData：true，
		async：true，
		contentType：“application / x-www-form-urlencoded; charset = UTF-8“，
		/ * 
		timeout：0，
		data：null，
		dataType：null，
		username：null，
		password：null，
		cache：null，
		throws：false，
		traditional：false，
		headers：{}，
		* / 

		accepted： { 
			“*”：allTypes，
			text：“text / plain”，
			html：“text / html”，
			xml：“application / xml，text / xml”，
			json：“application / json，text / javascript” 
		}，

		内容：{ 
			xml：/ xml /，
			html：/ html /，
			json：/ json / 
		}，

		responseFields：{ 
			xml：“responseXML”，
			text：“responseText”，
			json：“responseJSON” 
		}，

		//数据转换器
		//键使用单个空间
		转换器分隔源（或catchall“*”）和目标类型：{ 

			//将任何内容转换为文本
			“* text”：String，

			// Text to html（true = no transformation）
			“text html”：true，

			//将文本评估为json表达式
			“text json”：jQuery.parseJSON，

			//将文本解析为xml
			“text xml”：jQuery.parseXML 
		}，

		//对于不应深度扩展的选项：
		//如果
		//以及创建一个不应该
		深度扩展的选项时，可以在此处添加自己的自定义选项（请参阅ajaxExtend）
		flatOptions：{ 
			url：true，
			context：true 
		} 
	}，
	//使用ajaxSettings和设置字段

	将完整的成熟设置对象创建到目标中。
	//如果省略target，则写入ajaxSettings。
	ajaxSetup：function（target，settings）{ 
		返回设置？

			//构建设置对象
			ajaxExtend（ajaxExtend（target，jQuery.ajaxSettings），settings）：

			//扩展ajaxSettings 
			ajaxExtend（jQuery.ajaxSettings，target）; 
	}，

	ajaxPrefilter：addToPrefiltersOrTransports（prefilters），
	ajaxTransport：addToPrefiltersOrTransports（transports），

	//主方法
	ajax：function（url，options）{ 

		//如果url是一个对象，则模拟1.5之前的签名
		if（typeof url ===“ object“）{ 
			options = url; 
			url = undefined; 
		} 

		//强制选项为对象
		选项=选项|| {}; 

		var transport，
			//没有反缓存参数
			cacheURL的URL ，
			//响应头
			responseHeadersString，
			responseHeaders，
			//超时句柄
			timeoutTimer，
			//跨域检测变量
			部分，
			//要知道是否要调度全局事件
			fireGlobals，
			//循环变量
			i，
			//创建最终选项对象
			s = jQuery.ajaxSetup（{}， options），
			//回调上下文
			callbackContext = s.context || s，
			//全局事件的上下文是callbackContext，如果它是DOM节点或jQuery集合
			globalEventContext = s.context &&（callbackContext.nodeType || callbackContext.jquery）？
				jQuery（callbackContext）：
				jQuery.event，
			// Deferreds 
			deferred = jQuery.Deferred（），
			completeDeferred = jQuery.Callbacks（“一次内存”），
			//状态相关的回调
			statusCode = s.statusCode || {}，
			//标题（它们一次全部发送）
			requestHeaders = {}，
			requestHeadersNames = {}，
			// jqXHR 
			状态= 0，
			//默认中止消息
			strAbort =“cancel”，
			//假xhr 
			jqXHR = { 
				readyState：0，

				//如果需要，构建头哈希表
				getResponseHeader：function（key）{ 
					var match; 
					if（state === 2）{ 
						if（！responseHeaders）{ 
							responseHeaders = {};
							while（（match = rheaders.exec（responseHeadersString）））{ 
								responseHeaders [match [1] .toLowerCase（）] = match [2]; 
							} 
						= 
						match = responseHeaders [key.toLowerCase（）]; 
					} 
					return match == null？null：匹配; 
				}，

				//原始字符串
				getAllResponseHeaders：function（）{ 
					return state === 2？responseHeadersString：null; 
				}，

				//缓存标头
				setRequestHeader：function（name，value）{ 
					var lname = name.toLowerCase（）; 
					if（！state）{ 
						name = requestHeadersNames [lname] = requestHeadersNames [lname] || 名称;
						requestHeaders [name] = value; 
					} 
					返回这一点; 
				}，

				//覆盖响应内容类型标头
				overrideMimeType：function（type）{ 
					if（！state）{ 
						s.mimeType = type; 
					} 
					返回这一点; 
				}，

				//依赖于状态的回调
				statusCode：function（map）{ 
					var code; 
					if（map）{ 
						if（state <2）{ 
							for（map in map）{ 
								//以保留旧回调的方式延迟添加新回调
								statusCode [code] = [statusCode [code]，map [code]] ; 
							} 
						} else {
							//执行适当的回调
							jqXHR.always（map [jqXHR.status]）; 
						} 
					} 
					返回这一点; 
				}，

				//取消请求
				abort：function（statusText）{ 
					var finalText = statusText || strAbort; 
					if（transport）{ 
						transport.abort（finalText）; 
					} 
					done（0，finalText）; 
					归还这个; 
				} 
			}; 

		//附加deferreds 
		deferred.promise（jqXHR）.complete = completeDeferred.add; 
		jqXHR.success = jqXHR.done; 
		jqXHR.error = jqXHR.fail; 

		//删除哈希字符（＃7531：和字符串提升）
		//如果没有提供添加协议（前置过滤器可能会期望它）
		//在设置对象中处理错误的URL（＃10093：与旧签名的一致性）
		//我们还使用url参数（如果可用）
		s.url =（（url || s.url || ajaxLocation）+“”）.replace（rhash，“”）
			。replace（rprotocol，ajaxLocParts [1] +“//”）; 

		// Alias方法选项按票证＃12004 
		s.type = options.method || 键入 options.type || s.method || s.type; 

		//提取dataTypes列表
		s.dataTypes = jQuery.trim（s.dat aType ||“*”）。toLowerCase（）。match（core_rnotwhite）|| [ “”]; 

		//当我们有一个协议时，跨域请求是有序的：host：port mismatch 
		if（s。
			parts = rurl.exec（s.url.toLowerCase（））; 
			s.crossDomain = !!（parts && 
				（parts [1]！== ajaxLocParts [1] || parts [2]！== ajaxLocParts [2] || 
					（parts [3] ||（parts [1] == =“http：”？“80”：“443”））！== 
						（ajaxLocParts [3] ||（ajaxLocParts [1] ===“http：”？“80”：“443”）））
			）; 
		} 

		//转换数据如果尚未字符串
		如果（s.data && s.processData &&的typeof s.data == “字符串”！）{ 
			s.data = jQuery.param（s.data，s.traditional）; 
		} 

		//应用prefilters 
		inspectPrefiltersOrTransports（prefilters，s，options，jqXHR）;

			返回jqXHR; 
		} 

		//如果要求
		fireGlobals = s.global，我们现在可以触发全局事件; 

		//注意一组新的请求
		if（fireGlobals && jQuery.active ++ === 0）{ 
			jQuery.event.trigger（“ajaxStart”）; 
		} 

		//大写类型
		s.type = s.type.toUpperCase（）; 

		//确定请求是否包含内容
		s.hasContent =！rnoContent.test（s.type）; 

		//保存URL，以防我们
		以后在
		cacheURL = s.url 上使用If-Modified-Since //和/或If-None-Match标头进行操作; 

		//更多选项处理没有内容的请求
		if（！s.hasContent）{ 

			//如果数据可用，则将数据附加到url
			if（s.data）{ 
				cacheURL =（s.url + =（ajax_rquery.test（cacheURL）？“＆”：“？”）+ s.data）; 
				//＃9682：删除数据，使其不用于最终重试
				删除s.data; 
			} 

			//如果需要在URL添加抗缓存
			如果（s.cache ===假）{ 
				s.url = rts.test（cacheURL）？

					//如果已有'_'参数，请将其值设置为
					cacheURL.replace（rts，“$ 1_ =”+ ajax_nonce ++）：

					//否则将一个添加到结束
					cacheURL +（ajax_rquery.test（cacheURL）？“＆ “：”？“）+”_ =“+ ajax_nonce ++; 
			} 
		} 

		//设置了If-Modified-Since和/或如果-None-Match头，如果处于ifModified模式。
		if（s.ifModified）{
			if（jQuery.lastModified [cacheURL]）{ 
				jqXHR.setRequestHeader（“If-Modified-Since”，jQuery.lastModified [cacheURL]）; 
			} 
			如果（jQuery.etag [cacheURL]）{ 
				jqXHR.setRequestHeader（ “如果-无-匹配”，jQuery.etag [cacheURL]）; 
			} 
		} 

		//设置正确的标题，如果正在发送数据
		，如果（s.data && s.hasContent && s.contentType！==虚假|| options.contentType）{ 
			jqXHR.setRequestHeader（ “内容类型”，S。内容类型 ）; 
		} 

		//设置服务器的接受报头，根据数据类型
		jqXHR.setRequestHeader（ 
			“ 接受”，
			s.dataTypes [0] && s.accepts [s.dataTypes [0]]？
				s.accepts [s.dataTypes [0]] +（s.dataTypes [0]！==“*”？“，”+ allTypes +“; q = 0.01”：“”）：
				s.accepts [“*” ] 
		）; 

		//检查
		（i in s.headers）{ 
			jqXHR.setRequestHeader（i，s.headers [i]）;的标题选项; 
		} 

		//允许自定义标头/ mimetypes并提前中止
		if（s.beforeSend &&（s.beforeSend.call（callbackContext，jqXHR，s）=== false || state === 2））{ 
			//如果没有中止则中止已经返回并返回
			jqXHR.abort（）; 
		} 

		// aborting不再是取消
		strAbort =“abort”; 

		//在deferreds上安装回调
		（i in {success：1，error：1，complete：
			jqXHR [i]（s [i]）; 
		} 

		//获取transport 
		transport = inspectPrefiltersOrTransports（transports，s，options，jqXHR）; 

		//如果没有传输，我们自动中止
		if（！transport）{ 
			done（-1，“No Transport”）; 
		} else { 
			jqXHR.readyState = 1; 

			//发送全局事件
			if（fireGlobals）{ 
				globalEventContext.trigger（“ajaxSend”，[jqXHR，s]）; 
			} 
			//超时
			if（s.async && s.timeout> 0）{ 
				timeoutTimer = setTimeout（function（）{ 
					jqXHR.abort（“timeout”）; 
				}，s.timeout）; 
			} 

			try { 
				state = 1;
				transport.send（requestHeaders，done）; 
			} catch（e）{ 
				//如果没有做，
				则将异常传播为错误if（state <2）{ 
					done（-1，e）; 
				//简单地重新抛出
				}否则{ 
					throw e; 
				} 
			} 
		} 

		//回调用于当一切都做
		函数来完成（状态，nativeStatusText，响应报头）{ 
			VAR isSuccess，成功，错误，响应，修改，
				状态文本= nativeStatusText; 

			//一次调用
			if（state === 2）{ 
				return; 
			} 

			//状态是“完成”现在
			状态= 2; 

			//如果存在则清除超时
			if（timeoutTimer）{ 
				clearTimeout（timeoutTimer）; 
			} 

			//用于早期垃圾收集
			的解除引用传输//（无论将使用多长时间的jqXHR对象）
			transport = undefined; 

			//缓存响应头
			responseHeadersString = headers || “”; 

			//设置readyState 
			jqXHR.readyState = status> 0？4：0; 

			//确定成功是否成功
			=状态> = 200 &&状态<300 || 状态=== 304; 

			//获取响应数据
			if（
				respond ）{ response = ajaxHandleResponses（s，jqXHR，response）; 
			} 

			//转换无论什么（总是设置responseXXX字段）
			response = ajaxConvert（s，response，jqXHR，isSuccess）; 

			//如果成功，则处理类型链接
			if（isSuccess）{ 

				//设置If-Modified-Since和/或If-None-Match标头，如果处于ifModified模式。
				if（s.ifModified）{ 
					modified = jqXHR.getResponseHeader（“Last-Modified”）; 
					if（modified）{ 
						jQuery.lastModified [cacheURL] = modified; 
					} 
					modified = jqXHR.getResponseHeader（“etag”）; 
					if（modified）{ 
						jQuery.etag [cacheURL] = modified; 
					} 
				} 

				//如果没有内容
				如果（状态=== 204 || s.type === “HEAD”）{ 
					状态文本= “nocontent”;

				} else if（status === 304）{ 
					statusText =“notmodified”; 

				//如果我们有数据，让我们转换它
				} else { 
					statusText = response.state; 
					success = response.data; 
					error = response.error; 
					isSuccess =！error; 
				} 
			} else { 
				//我们从statusText中提取错误
				//然后规范化statusText和非中止的状态
				error = statusText; 
				if（status ||！statusText）{ 
					statusText =“error”; 
					if（status <0）{ 
						status = 0; 
					} 
				} 
			} 

			//为假XHR对象设置数据
			jqXHR.status =状态;
			jqXHR.statusText =（nativeStatusText || statusText）+“”; 

			//成功/错误
			if（isSuccess）{ 
				deferred.resolveWith（callbackContext，[success，statusText，jqXHR]）; 
			} else { 
				deferred.rejectWith（callbackContext，[jqXHR，statusText，error]）; 
			} 

			//依赖于状态的回调
			jqXHR.statusCode（statusCode）; 
			statusCode = undefined; 

			if（fireGlobals）{ 
				globalEventContext.trigger（isSuccess？“ajaxSuccess”：“ajaxError”，
					[jqXHR，s，isSuccess？success：error]）; 
			} 

			//完成
			completeDeferred.fireWith（callbackContext，[jqXHR，statusText]）; 

			if（fireGlobals）{
				globalEventContext.trigger（“ajaxComplete”，[jqXHR，s]）; 
				//处理全局AJAX计数器
				if（！（ -  jQuery.active））{ 
					jQuery.event.trigger（“ajaxStop”）; 
				} 
			} 
		} 

		返回jqXHR; 
	}，

	getJSON：function（url，data，callback）{ 
		return jQuery.get（url，data，callback，“json”）; 
	}，

	getScript：function（url，callback）{ 
		return jQuery.get（url，undefined，callback，“script”）; 
	} 
}; 

jQuery.each（[“get”，“post”]，function（i，method）{ 
	jQuery [method] = function（url，data，callback，type）{ 
		//如果省略data参数则移位参数
		if（jQuery.isFunction（data））{ 
			type = type || 回电话; 
			callback = data; 
			data = undefined; 
		} 

		return jQuery.ajax（{ 
			url：url，
			type：method，
			dataType：type，
			data：data，
			success：callback 
		}）; 
	}; 
}）; 

/ *处理对ajax请求的响应：
 *  - 找到正确的dataType（在content-type和expected dataType之间进行调解）
 *  - 返回相应的响应
 * / 
function ajaxHandleResponses（s，jqXHR，responses）{ 

	var ct，type，finalDataType， firstDataType，
		contents = s.contents，
		dataTypes = s.dataTypes;

	//删除auto dataType并在进程中获取content-type 
	（dataTypes [0] ===“*”）{ 
		dataTypes.shift（）; 
		if（ct === undefined）{ 
			ct = s.mimeType || jqXHR.getResponseHeader（ “内容类型”）; 
		} 
	} 

	//检查是否我们在处理一个已知的内容类型
	，如果（CT）{ 
		为（类型内容）{ 
			如果（内容【类型】&&内容【类型】。测试（CT））{ 
				dataTypes.unshift（ type）; 
				打破; 
			} 
		} 
	} 

	//检查，如果我们有用于预期数据类型的响应
	，如果（数据类型[0]中的反应）{ 
		finalDataType =数据类型[0]; 
	} else {
		//尝试使用convertible dataTypes 
		（在响应中输入）{ 
			if（！dataTypes [0] || s.converters [type +“”+ dataTypes [0]]）{ 
				finalDataType = type; 
				打破; 
			} 
			if（！firstDataType）{ 
				firstDataType = type; 
			} 
		} 
		//或者只是使用第一个
		finalDataType = finalDataType || firstDataType; 
	} 

	//如果我们找到了dataType 
	//我们将dataType添加到列表中
	// 如果需要//返回相应的响应
	if（finalDataType）{ 
		if（finalDataType！== dataTypes [0]）{ 
			dataTypes.unshift（finalDataType）; 
		} 
		return responses [finalDataType];
	} 
} 

/ *给出的请求和原始响应链转化
 *也设置在jqXHR实例responseXXX字段
 * / 
功能ajaxConvert（S，响应，jqXHR，isSuccess）{ 
	VAR CONV2，电流，CONV，TMP，分组，
		转换器= {}，
		//使用dataTypes的副本，以防我们需要修改它以进行转换
		dataTypes = s.dataTypes.slice（）; 

	//使用小写密钥创建转换器映射
	if（dataTypes [1]）{ 
		for（conv in s.converters）{ 
			converters [conv.toLowerCase（）] = s.converters [conv]; 
		} 
	} 

	电流= dataTypes.shift（）; 

	//转换为每个顺序数据类型
	while（current）{ 

		if（s.responseFields [current]）{ 
			jqXHR [s.responseFields [current]] = response; 
		} 

		//如果提供的
		话，应用dataFilter （！prev && isSuccess && s.dataFilter）{ 
			response = s.dataFilter（response，s.dataType）; 
		} 

		prev = current; 
		current = dataTypes.shift（）; 

		if（current）{ 

		//如果当前dataType为非自动
			if（current ===“*”）{ 

				current = prev; 

			//转换响应如果prev dataType是非auto且与当前不同
			} else if else（prev！==“*”&& prev！== current）{ 

				//寻求直接转换器
				conv = converter [prev +“”+ current] || 转换器[“*”+当前]; 

				//如果没有找到，请寻找一对
				if（！conv）{ 
					for（conv2 in converters）{ 

						//如果conv2输出当前
						tmp = conv2.split（“”）; 
						if（tmp [1] === current）{ 

							//如果prev可以转换为接受输入
							conv = converter [prev +“”+ tmp [0]] || 
								converter [“*”+ tmp [0]]; 
							if（conv）{ 
								//压缩等价转换器
								if（conv === true）{ 
									conv = converters [conv2]; 

								//否则，插入中间数据类型
								} else if（converters [conv2]！== true）{ 
									current = tmp [0]; 
									dataTypes.unshift（tmp [1]）; 
								} 
								打破; 
							} 
						} 
					} 
				} 

				//应用转换器（如果不是等价）
				如果（CONV！== TRUE）{ 

					//除非错误被允许气泡，捕捉并返回它们
					如果（CONV && S [ “抛出”]）{ 
						响应=转换（回应）; 
					} else { 
						try { 
							response = conv（response）; 
						} catch（e）{ 
							return {state：“parsererror”，error：conv？e：“没有从”+ prev +“转换为”+ current};
					} 
				} 
			} 
		} 
	} 

	返回{状态： “成功”，数据：响应}; 
} 
//安装脚本dataType 
jQuery.ajaxSetup（{ 
	接受：{ 
		脚本：“text / javascript，application / javascript，application / ecmascript，application / x-ecmascript” 
	}，
	内容：{ 
		script：/（？：java | ecma） script / 
	}，
	converter：{ 
		“text script”：function（text）{ 
			jQuery.globalEval（text）; 
			return text; 
		} 
	} 
}）; 

//处理缓存的特殊情况和crossDomain 
jQuery.ajaxPrefilter（“script”，function（s）{ 
	if（s.cache === undefined）{
		s.cache = false; 
	} 
	if（s.crossDomain）{ 
		s.type =“GET”; 
	} 
}; 

//绑定脚本标记hack transport 
jQuery.ajaxTransport（“script”，function（s）{ 
	//此传输仅处理跨域请求
	if（s.crossDomain）{ 
		var script，callback; 
		return { 
			send：function（_，完成）{ 
				script = jQuery（“<script>”）。prop（{ 
					async：true，
					charset：s.scriptCharset，
					src：s.url 
				}）。on（
					“load error”，
					callback = function（evt）{ 
						script .remove（）; 
						callback = null; 
						if（evt）{
							完成（evt.type ===“error”？404：200，evt.type）; 
						} 
					} 
				; 
				document.head.appendChild（script [0]）; 
			}，
			abort：function（）{ 
				if（callback）{ 
					callback（）; 
				} 
			} 
		}; 
	} 
}; 
var oldCallbacks = []，
	rjsonp = /（=）\？（？=＆| $）| \？\？/; 

//默认jsonp设置
jQuery.ajaxSetup（{ 
	jsonp：“callback”，
	jsonpCallback：function（）{ 
		var callback = oldCallbacks.pop（）||（jQuery.expando +“_”+（ajax_nonce ++））; 
		this [callback] = true; 
		返回回调; 
	} 
}）;

//检测，规范化选项并为jsonp请求安装回调
jQuery.ajaxPrefilter（“json jsonp”，function（s，originalSettings，jqXHR）{ 

	var callbackName，overwritten，responseContainer，
		jsonProp = s.jsonp！== false &&（rjsonp。 test（s.url）？
			“url”：
			typeof s.data ===“string”&&！（s.contentType ||“”）。indexOf（“application / x-www-form-urlencoded”）&& rjsonp。 test（s.data）&&“data” 
		）; 

	//处理iff预期数据类型是“jsonp”还是我们有一个参数来设置
	if（jsonProp || s.dataTypes [0] ===“jsonp”）{ 

		//获取回叫名称，记住与之关联的预先存在的值
		callbackName = s.jsonpCallback = jQuery.isFunction（s.jsonpCallback）？
			s.jsonpCallback（）：
			s.jsonpCallback; 

		//将回调插入url或表单数据
		if（jsonProp）{ 
			s [jsonProp] = s [jsonProp] .replace（rjsonp，“$ 1”+ callbackName）; 
		} else if（s.jsonp！== false）{ 
			s.url + =（ajax_rquery.test（s.url）？“＆”：“？”）+ s.jsonp +“=”+ callbackName; 
		} 

		//使用数据转换器在脚本执行后检索json 
		s.converters [“script json”] = function（）{ 
			if（！responseContainer）{ 
				jQuery.error（callbackName +“not called”）; 
			} 
			return responseContainer [0]; 
		}; 

		//强制json dataType 
		s.dataTypes [0] =“json” ; 

		//安装回调
		overwritten = window [callbackName]; 
		window [callbackName] = function（）{ 
			responseContainer = arguments; 
		}; 

		//清理功能（转换器后触发）
		jqXHR.always（function（）{ 
			//恢复预先存在的值
			窗口[callbackName] =覆盖; 

			// 
			如果（s [callbackName]）{ 
				//确保保存，则保存为空闲重新使用这些选项不会
				破坏s.jsonpCallback = originalSettings.jsonpCallback; 

				//保存回调名称以备将来使用
				oldCallbacks.push（callbackName）; 
			} 

			//如果它是一个函数并且我们有响应则调用
			if（responseContainer && jQuery.isFunction（覆盖））{ 
				overwritten（responseContainer [0]）; 
			} 

			responseContainer = overwritten = undefined; 
		}）; 

		//委托给脚本
		返回“script”; 
	} 
}; 
jQuery.ajaxSettings.xhr = function（）{ 
	try { 
		return new XMLHttpRequest（）; 
	} catch（e）{} 
}; 

var xhrSupported = jQuery.ajaxSettings.xhr（），
	xhrSuccessStatus = { 
		//文件协议总是产生状态代码0，假设200 
		0：200，
		//支持：IE9 
		//＃1450：有时IE返回1223时它应该是204 
		1223 ：204 
	}，
	//支持：IE9 
	//我们需要跟踪出站xhr并手动中止它们
	//因为IE不够聪明，只能自己完成
	xhrId = 0，
	xhrCallbacks = {}; 

if（window.ActiveXObject）{ 
	jQuery（window）.on（“unload”，function（）{ 
		for（var key in xhrCallbacks）{ 
			xhrCallbacks [key]（）; 
		} 
		xhrCallbacks = undefined; 
	}）; 
} 

jQuery.support.cors = !! xhrSupported &&（xhrSupported中的“withCredentials”）; 
jQuery.support.ajax = xhrSupported = !! xhrSupported; 

jQuery.ajaxTransport（function（options）{ 
	var callback; 
	//只有在通过XMLHttpRequest支持时才允许跨域
	if（jQuery.support.cors || xhrSupported &&！options.crossDomain）{ 
		return { 
			send：function（headers，complete）{ 
				var i，id，
					xhr = options.xhr（）; 
				xhr.open（options.type，options.url，options.async，options.username，options.password）; 
				//如果提供了自定义字段if 
				（options.xhrFields）{ 
					for（i in options.xhrFields）{ 
						xhr [i] = options.xhrFields [i]; 
					} 
				} 
				如果需要//覆盖mime类型
				如果（options.mimeType && xhr.overrideMimeType）{ 
					xhr.overrideMimeType（options.mimeType）; 
				} 
				// X-Requested-With标头
				//对于跨域请求，作为预检的条件
				//类似于拼图游戏，我们根本不会将其设置为确定。
				//（它总是可以基于每个请求设置，甚至可以使用ajaxSetup设置）
				//对于同域请求，如果已经提供，则不会更改标头。
				if（！options.crossDomain &&！headers [“X-Requested-With”]）{ 
					headers [“X-Requested-With”] =“XMLHttpRequest”; 
				} 
				// 
				为（i in headers）设置标题{ 
					xhr.setRequestHeader（i，headers [i]）;
							callback = xhr.onload = xhr.onerror = null; 
							if（type ===“abort”）{ 
								xhr.abort（）; 
							} else if（type ===“error”）{ 
								complete（
									//文件协议总是产生状态0，假设404 
									xhr.status || 404，
									xhr.statusText 
								）; 
							}其他{ 
								完成（
									xhrSuccessStatus [xhr.status] || xhr.status，
									xhr.statusText，
									//支持：IE9 
									//＃11426：当请求二进制数据，IE9会抛出异常
									//任何企图访问的responseText 
									的typeof xhr.responseText ===“string”？{
										text：xhr.responseText 
									}：undefined，
									xhr.getAllResponseHeaders（）
								）; 
							} 
						} 
					}; 
				}; 
				//听取事件
				xhr.onload = callback（）; 
				xhr.onerror = callback（“error”）; 
				//创建中止回调
				callback = xhrCallbacks [（id = xhrId ++）] = callback（“abort”）; 
				//发送请求
				//这可能会引发一个异常，它实际上是
				//在jQuery.ajax中处理的（所以这里没有try / catch）
				xhr.send（options.hasContent && options.data || null）; 
			}，
			abort：function（）{ 
				if（callback）{
					回电话（）; 
				} 
			} 
		}; 
	} 
}; 
var fxNow，timerId，
	rfxtypes = / ^（？：toggle | show | hide）$ /，
	rfxnum = new RegExp（“^（？：（[+  - ]）= |）（”+ core_pnum +“）（[az ％] *）$“，”i“），
	rrun = / queueHooks $ /，
	animationPrefilters = [defaultPrefilter]，
	tweeners = { 
		”*“：[function（prop，value）{ 
			var tween = this.createTween（prop，value ），
				target = tween.cur（），
				parts = rfxnum.exec（value），
				unit = parts && parts [3] || （jQuery.cssNumber [prop]？“”：“px”），

				//潜在的单位不匹配需要起始值计算
				start =（jQuery.cssNumber [prop] || unit！==“px”&& + target）&& 
					rfxnum.exec（jQuery.css（tween.elem，prop）），
				scale = 1，
				maxIterations = 20; 

			if（start && start [3]！== unit）{ 
				// jQuery.css 
				unit = unit || 报告的信任单位 开始[3]; 

				//确保稍后在
				parts = parts || 上更新补间属性 []; 

				//从非零起点迭代近似
				开始= +目标|| 1; 

				do { 
					//如果上一次迭代归零，则加倍，直到得到*某些东西* 
					//使用一个字符串来加倍因子，这样我们就不会意外地将比例视为低于
					scale = scale || ”。

					//调整并应用
					start = start / scale; 
					jQuery.style（tween.elem，prop，start + unit）; 

				//更新比例，从tween.cur（）容忍零或NaN 
				//如果比例不变或完美，或者如果我们刚刚有足够的话，则打破循环
				（比例！==（scale = tween.cur（ ）/ target）&& scale！== 1 &&  -  maxIterations）; 
			} 

			//更新补间属性
			if（parts）{ 
				start = tween.start = + start || +目标|| 0; 
				tween.unit = unit; 
				//如果提供了一个+ = /  -  =标记，我们正在做一个相对动画
				tween.end = parts [1]？
					开始+（部分[1] + 1）*部分[2]：
					+部分[2]; 
			}

			返回补间; 
		}] 
	}; 

//同步创建的动画将同步运行
函数createFxNow（）{ 
	setTimeout（function（）{ 
		fxNow = undefined; 
	}）; 
	return（fxNow = jQuery.now（））; 
} 

函数createTween（值，丙，动画）{ 
	VAR吐温，
		集合=（tweeners [丙] || []）.concat（tweeners [ “*”]），
		索引= 0，
		长度= collection.length; 
	for（; index <length; index ++）{ 
		if（（tween = collection [index] .call（animation，prop，value）））{ 

			//我们完成了这个属性
			返回补间; 
		} 
	} 
}

function动画（elem，properties，options）{ 
	var result，
		stopped，
		index = 0，
		length = animationPrefilters.length，
		deferred = jQuery.Deferred（）。always（function（）{ 
			//不匹配elem：animated selector 
			delete tick.elem; 
		}），
		tick = function（）{ 
			if（stopped）{ 
				return false; 
			} 
			var currentTime = fxNow || createFxNow（），
				剩余= Math.max（0，animation.startTime + animation.duration  -  currentTime），
				//过时的崩溃bug不允许我们使用1  - （0.5 || 0）（＃12497）
				temp =剩余/ animation.duration || 0，
				百分比= 1  -  temp，
				index = 0，
				length = animation.tweens.length; 

			for（; index <length; index ++）{ 
				animation.tweens [index] .run（percent）; 
			} 

			deferred.notifyWith（elem，[animation，percent，remaining]）; 

			if（百分比<1 &&长度）{ 
				返回剩余; 
			} else { 
				deferred.resolveWith（elem，[animation]）; 
				返回虚假; 
			} 
		，，
		animation = deferred.promise（{ 
			elem：elem，
			props：jQuery.extend（{}，properties），
			opts：jQuery.extend（true，{specialEasing：{}}，options），
			originalProperties：properties，
			originalOptions： options，
			startTime：fxNow || createFxNow（），
			duration：options.duration，
			tweens 
			：[]，createTween：function（prop，end）{ 
				var tween = jQuery.Tween（elem，animation.opts，prop，end，
						animation.opts.specialEasing [prop] || animation.opts .easing）; 
				animation.tweens.push（tween）; 
				返回补间; 
			}，
			stop：function（gotoEnd）{ 
				var index = 0，
					//如果我们要结束，我们想要运行所有的补间
					//否则我们跳过这部分
					长度= gotoEnd？animation.tweens.length：0; 
				if（已停止）{ 
					return this; 
				} 
				stopped = true; 
				for（; index <length; index ++）{
					animation.tweens [index] .run（1）; 
				} 

				//解析当我们播放最后一帧时
				//否则，拒绝
				if（gotoEnd）{ 
					deferred.resolveWith（elem，[animation，gotoEnd]）; 
				} else { 
					deferred.rejectWith（elem，[animation，gotoEnd]）; 
				} 
				返回这一点; 
			} 
		}），
		props = animation.props; 

	propFilter（props，animation.opts.specialEasing）; 

	for（; index <length; index ++）{ 
		result = animationPrefilters [index] .call（animation，elem，props，animation.opts）; 
		if（result）{ 
			return result; 
		} 
	}

	jQuery.map（props，createTween，animation）; 

	if（jQuery.isFunction（animation.opts.start））{ 
		animation.opts.start.call（elem，animation）; 
	} 

	jQuery.fx.timer（
		jQuery.extend（蜱，{ 
			ELEM：ELEM，
			动画：动画，
			队列：animation.opts.queue 
		}）
	）; 

	//附加来自options的回调
	返回animation.progress（animation.opts.progress）
		.done（animation.opts.done，animation.opts.complete）
		.fail（animation.opts.fail）
		.always（animation.opts.always） ; 
} 

功能propFilter（道具，specialEasing）{ 
	变种索引，名称，缓和，值，钩;

	// camelCase，specialEasing和expand cssHook pass 
	for（index in props）{ 
		name = jQuery.camelCase（index）; 
		easing = specialEasing [name]; 
		value = props [index]; 
		if（jQuery.isArray（value））{ 
			easing = value [1]; 
			value = props [index] = value [0]; 
		} 

		if（index！== name）{ 
			props [name] = value; 
			删除道具[索引]; 
		} 

		hooks = jQuery.cssHooks [name]; 
		if（hooks &&“expand”in hooks）{ 
			value = hooks.expand（value）; 
			删除道具[名称]; 

			//不是$ .extend，这不会覆盖已经存在的键。
			//也 - 从上面重用'index'，因为我们有
			（index in value）{ 
				if（！（props in props））{ 
					props [index] = value [index]; 
					specialEasing [index] =缓和; 
				} 
			} 
		}否则{ 
			specialEasing [名称] =缓解; 
		} 
	} 
} 

jQuery.Animation = jQuery.extend（动画，{ 

	中间人：功能（道具，回调）{ 
		如果（jQuery.isFunction（道具））{ 
			回调=道具; 
			道具= [ “*”]; 
		}其他{ 
			道具= props.split（“”）; 
		} 

		var prop，
			index = 0，
			length = props.length;

		for（; index <length; index ++）{ 
			prop = props [index]; 
			tweeners [prop] = tweeners [prop] || []; 
			tweeners [prop] .unshift（callback）; 
		} 
	}，

	预滤器：函数（回调，前置）{ 
		如果（前置）{ 
			animationPrefilters.unshift（回调）; 
		} else { 
			animationPrefilters.push（callback）; 
		} 
	} 
}）; 

function defaultPrefilter（elem，props，opts）{ 
	/ * jshint validthis：true * / 
	var prop，value，toggle，tween，hooks，oldfire，
		anim = this，
		orig = {}，
		style = elem.style，
		hidden = elem。 nodeType && isHidden（elem），
		dataShow = data_priv.get（elem，“fxshow”）; 

	// handle queue：false promises 
	if（！opts.queue）{ 
		hooks = jQuery._queueHooks（elem，“fx”）; 
		if（hooks.unqueued == null）{ 
			hooks.unqueued = 0; 
			oldfire = hooks.empty.fire; 
			hooks.empty.fire = function（）{ 
				if（！hooks.unqueued）{ 
					oldfire（）; 
				} 
			}; 
		} 
		hooks.unqueued ++; 

		anim.always（function（）{ 
			//执行此操作可确保
			在完成
			anim.always 之前// 将调用完整的处理程序（function（）{ 
				hooks.unqueued--; 
				if（！jQuery.queue（elem，“） fx“）。length）{
					hooks.empty.fire（）; 
				} 
			}; 
		}）; 
	} 

	//高度/宽度溢出传递
	if（elem.nodeType === 1 &&（道具中的“高度”|道具中的“高度”））{ 
		//确保没有任何
		泄漏//记录所有3个溢出属性，因为
		当overflowX和
		// overflowY设置为相同的值时，
		IE9-10 不会//更改overflow属性opts.overflow = [style.overflow，style.overflowX，style.overflowY]; 

		//将display属性设置为inline-block for height / width 
		//动画内容元素的动画宽度/高度
		if（jQuery.css（elem，“display”）===“inline”&& 
				jQuery.css（elem） ，

			style.display =“inline-block”; 
		} 
	} 

	如果（opts.overflow）{ 
		style.overflow = “隐藏”; 
		anim.always（function（）{ 
			style.overflow = opts.overflow [0]; 
			style.overflowX = opts.overflow [1]; 
			style.overflowY = opts.overflow [2]; 
		}）; 
	} 


	//显示/隐藏传递
	给（道具中的道具）{ 
		value = props [prop]; 
		if（rfxtypes.exec（value））{ 
			delete props [prop]; 
			toggle = toggle || value ===“toggle”; 
			if（value ===（hidden？“hide”：“show”））{ 

				//如果从停止的隐藏或显示中遗留了dataShow，我们将继续show，
				if（value ===“show”&& dataShow && dataShow [prop]！== undefined）{ 
					hidden = true; 
				} else { 
					继续; 
				} 
			} 
			原稿[丙] = dataShow && dataShow [丙] || jQuery.style（elem，prop）; 
		} 
	} 

	如果（jQuery.isEmptyObject（原稿）！）{ 
		如果（dataShow）{ 
			如果（在dataShow “隐藏”）{ 
				隐藏= dataShow.hidden; 
			} 
		else { 
			dataShow = data_priv.access（elem，“fxshow”，{}）; 
		} 

		//存储状态，如果它的切换 - 启用.stop（）。toggle（）到“反向” 
		if（toggle）{ 
			dataShow.hidden =！hidden;
			jQuery（elem）.show（）; 
		} else { 
			anim.done（function（）{ 
				jQuery（elem）.hide（）; 
			}）; 
		} 
		anim.done（function（）{ 
			var prop; 

			data_priv.remove（elem，“fxshow”）; 
			for（prop in orig）{ 
				jQuery.style（elem，prop，orig [prop]）; 
			} 
		}）; 
		for（prop in orig）{ 
			tween = createTween（hidden？dataShow [prop]：0，prop，anim）; 

			if（！（在dataShow中为prop））{ 
				dataShow [prop] = tween.start; 
				if（hidden）{ 
					tween.end = tween.start; 
					tween.start = prop ===“width”|| 道具===“身高”？1：0; 
				} 
			} 
		}
	} 
} 

函数吐温（ELEM，选项，道具，端，缓和）{ 
	返回新Tween.prototype.init（ELEM，选项，道具，端，缓和）; 
} 
jQuery.Tween =吐温; 

Tween.prototype = { 
	constructor：Tween，
	init：function（elem，options，prop，end，easing，unit）{ 
		this.elem = elem; 
		this.prop = prop; 
		this.easing = easing || “摇摆”; 
		this.options = options; 
		this.start = this.now = this.cur（）; 
		this.end = end; 
		this.unit = unit || （jQuery.cssNumber [prop]？“”：“px”）; 
	}，
	cur：function（）{ 
		var hooks = Tween.propHooks [this.prop]; 

		return hooks && hooks.get？
			hooks.get（this）：
			Tween.propHooks._default.get（this）; 
	}，
	运行：功能（百分比）{ 
		VAR缓解，
			钩= Tween.propHooks [this.prop]; 

		if（this.options.duration）{ 
			this.pos = eased = jQuery.easing [this.easing]（
				percent，this.options.duration * percent，0,1，this.options.duration 
			）; 
		} else { 
			this.pos = eased = percent; 
		} 
		this.now =（this.end  -  this.start）* eased + this.start; 

		if（this.options.step）{ 
			this.options.step.call（this.elem，this.now，this）; 
		} 

		if（hooks && hooks.set）{ 
			hooks.set（this）; 
		} else {
			Tween.propHooks._default.set（this）; 
		} 
		返回这一点; 
	} 
}; 

Tween.prototype.init.prototype = Tween.prototype; 

Tween.propHooks = {_ default 
	：{ 
		get：function（tween）{ 
			var result; 

			if（tween.elem [tween.prop]！= null && 
				（！tween.elem.style || tween.elem.style [tween.prop] == null））{ 
				return tween.elem [tween.prop]; 
			} 

			//传递一个空字符串作为第三参数的CSS将自动
			//尝试parseFloat和回退到一个字符串，如果解析失败
			//这样，如“10px的”被解析简单的值为浮点数。
			//按原样返回复杂值，例如“rotate（1rad）”。
			result = jQuery.css（tween.elem，tween.prop，“”）; 
			//空字符串，null，undefined和“auto”被转换为0. 
			return！result || 结果===“自动”？0：结果; 
		}，
		set：function（tween）{ 
			//使用step hook for back compat  - 如果它在那里使用cssHook  - 如果它
			可用则使用.style 并使用plain属性
			if if（jQuery.fx.step [tween.prop] ）{ 
				jQuery.fx.step [tween.prop]（补间）; 
			} else if（tween.elem.style &&（tween.elem.style [jQuery.cssProps [tween.prop]]！= null || jQuery.cssHooks [tween.prop]））{ 
				jQuery.style（tween.elem， tween.prop，tween.now + tween.unit）; 
			} else { 
				tween.elem [tween。
			} 
		} 
	} 
}; 

//支持：IE9 
//基于恐慌的方法在断开连接的节点上设置东西

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = { 
	set：function（tween）{ 
		if（tween.elem.nodeType && tween.elem.parentNode） { 
			tween.elem [tween.prop] = tween.now; 
		} 
	} 
}; 

jQuery.each（[“toggle”，“show”，“hide”]，function（i，name）{ 
	var cssFn = jQuery.fn [name]; 
	jQuery.fn [name] = function（speed，easing，callback） { 
		return speed == null || typeof speed ===“boolean”？
			cssFn.apply（this，arguments）：
			this.animate（genFx（name，true），speed，easing，callback）;
	}; 
}）; 

jQuery.fn.extend（{ 
	fadeTo：function（speed，to，easing，callback）{ 

		//在将不透明度设置为0后显示任何隐藏元素
		返回this.filter（isHidden）.css（“opacity”，0）.show（ ）

			//为指定的值设置动画
			.end（）。animate（{opacity：to}，speed，easing，callback）; 
	}，
	animate：function（prop，speed，easing，callback）{ 
		var empty = jQuery.isEmptyObject（ prop），
			optall = jQuery.speed（speed，easing，callback），
			doAnimation = function（）{ 
				//操作prop的副本，这样每个属性的缓动不会丢失
				var anim = Animation（this，jQuery.extend （{}，prop），optall）;

				// 
				如果（空|| data_priv.get（this，“finish”））{ 
					anim.stop（true）; 空动画或立即结束。
				} 
			}; 
			doAnimation.finish = doAnimation; 

		返回空|| optall.queue === false？
			this.each（doAnimation）：
			this.queue（optall.queue，doAnimation）; 
	}，
	stop：function（type，clearQueue，gotoEnd）{ 
		var stopQueue = function（hooks）{ 
			var stop = hooks.stop; 
			delete hooks.stop; 
			停止（gotoEnd）; 
		}; 

		if（typeof type！==“string”）{ 
			gotoEnd = clearQueue; 
			clearQueue = type; 
			type = undefined; 
		}
		if（clearQueue && type！== false）{ 
			this.queue（type ||“fx”，[]）; 
		} 

		返回this.each（函数（）{ 
			VAR出队=真，
				索引=类型= NULL &&型+ “queueHooks”！
				定时器= jQuery.timers，
				数据= data_priv.get（本）; 

			如果（指数）{ 
				如果（ data [index] && data [index] .stop）{ 
					stopQueue（data [index]）; 
				} 
			} else { 
				for（data in data）{ 
					if（data [index] && data [index] .stop && rrun.test（ index））{ 
						stopQueue（data [index]）; 
					} 
				} 
			} 

			for（index = timers.length; index--;）{
				if（timers [index] .elem === this &&（type == null || timers [index] .queue === type））{ 
					timers [index] .anim.stop（gotoEnd）; 
					dequeue = false; 
					timers.splice（index，1）; 
				} 
			} 

			//开始在队列中的下一个如果最后一步不是被迫
			//当前计时器会打电话给他们完整的回调，这将出列
			//但只有当他们gotoEnd 
			如果（出队||！gotoEnd）{ 
				jQuery的。出队（这，类型）; 
			} 
		}; 
	}，
	finish：function（type）{ 
		if（type！== false）{ 
			type = type || “FX”; 
		} 
		返回this.each（函数（）{ 
			VAR指数，
				data = data_priv.get（this），
				queue = data [type +“queue”]，
				hooks = data [type +“queueHooks”]，
				timers = jQuery.timers，
				length = queue？queue.length：0; 

			//在私有数据
			data.finish = true 上启用整理标志; 

			//首先清空队列
			jQuery.queue（this，type，[]）; 

			if（hooks && hooks.stop）{ 
				hooks.stop.call（this，true）; 
			} 

			//寻找任何活动的动画，然后完成它们
			（index = timers.length; index--;）{ 
				if（timers [index] .elem === this && timers [index] .queue === type） { 
					timers [index] .anim.stop（true）; 
					timers.splice（index，1）;
				} 
			} 

			//寻找任何动画在旧队列和完成他们
			对（索引= 0;索引<长度;索引++）{ 
				如果（队列[指数] &&队列[指数] .finish）{ 
					队列[指数] .finish。打电话（这）; 
				} 
			} 

			//关闭整理标志
			删除data.finish; 
		}）; 
	} 
}; 

//生成参数以创建标准动画
函数genFx（type，includeWidth）{ 
	var which，
		attrs = {height：type}，
		i = 0; 

	//如果我们包含宽度，则步长值为1以执行所有cssExpand值，
	//如果我们不包含宽度，则步长值为2以跳过左右
	includeWidth = includeWidth？1：0; 
	for（; i <4; i + = 2  -  includeWidth）{ 
		which = cssExpand [i]; 
		attrs [“margin”+ which] = attrs [“padding”+ which] = type; 
	} 

	if（includeWidth）{ 
		attrs.opacity = attrs.width = type; 
	} 

	返回ATTRS; 
} 

//生成自定义动画的快捷方式
jQuery.each（{ 
	slideDown：genFx（“show”），
	slideUp：genFx（“hide”），
	slideToggle：genFx（“toggle”），
	fadeIn：{opacity：“show”}，
	fadeOut：{opacity：“hide”}，
	fadeToggle：{opacity：“toggle”} 
}，function（name，props）{ 
	jQuery。
		返回this.animate（道具，速度，缓和，回调）; 
	}; 
}）; 

jQuery.speed = function（speed，easing，fn）{ 
	var opt = speed && typeof speed ===“object”？jQuery.extend（{}，speed）：{ 
		完成：fn || ！fn && easing || 
			jQuery.isFunction（速度）&&速度，
		持续时间：速度，
		缓和：fn &&缓和|| 缓和&&！jQuery.isFunction（缓和）&&缓和
	}; 

	opt.duration = jQuery.fx.off？0：typeof opt.duration ===“number”？opt.duration：
		jQuery.fx.speeds中的opt.duration？jQuery.fx.speeds [opt.duration]：jQuery.fx.speeds._default; 

	// normalize opt.queue  -  true / undefined / null  - >“fx” 
	if（opt。queue == null || opt.queue === true）{
		opt.queue =“fx”; 
	} 

	//排队
	opt.old = opt.complete; 

	opt.complete = function（）{ 
		if（jQuery.isFunction（opt.old））{ 
			opt.old.call（this）; 
		} 

		if（opt.queue）{ 
			jQuery.dequeue（this，opt.queue）; 
		} 
	}; 

	返回选择; 
}; 

jQuery.easing = { 
	linear：function（p）{ 
		return p; 
	}，
	swing：function（p）{ 
		return 0.5  -  Math.cos（p * Math.PI）/ 2; 
	} 
}; 

jQuery.timers = []; 
jQuery.fx = Tween.prototype.init; 
jQuery.fx.tick = function（）{ 
	var timer，
		timers = jQuery.timers，
		i = 0; 

	fxNow = jQuery.now（）; 

	for（; i <timers.length; i ++）{ 
		timer = timers [i]; 
		//检查计时器是否尚未被删除
		if（！timer（）&& timers [i] === timer）{ 
			timers.splice（i-- ，1）; 
		} 
	} 

	如果（timers.length！）{ 
		jQuery.fx.stop（）; 
	} 
	fxNow = undefined; 
}; 

jQuery.fx.timer = function（timer）{ 
	if（timer（）&& jQuery.timers.push（timer））{ 
		jQuery.fx.start（）; 
	} 
}; 

jQuery.fx.interval = 13; 

jQuery.fx.start = function（）{ 
	if（！timerId）{ 
		timerId = setInterval（jQuery.fx.tick，jQuery.fx.interval）; 
	}
}; 

jQuery.fx.stop = function（）{ 
	clearInterval（timerId）; 
	timerId = null; 
}; 

jQuery.fx.speeds = { 
	slow：600，
	fast：200，
	//默认速度
	_default：400 
}; 

//返回Compat <1.8扩展点
jQuery.fx.step = {}; 

if（jQuery.expr && jQuery.expr.filters）{ 
	jQuery.expr.filters.animated = function（elem）{ 
		return jQuery.grep（jQuery.timers，function（fn）{ 
			return elem === fn.elem; 
		} ）。长度; 
	}; 
} 
jQuery.fn.offset =函数（选项）{ 
	如果（的arguments.length）{ 
		返回选项===未定义？
			这个 ：
			this.each（function（i）{ 
				jQuery.offset.setOffset（this，options，i）; 
			}）; 
	} 

	var docElem，win，
		elem = this [0]，
		box = {top：0，left：0}，
		doc = elem && elem.ownerDocument; 

	if（！doc）{ 
		return; 
	} 

	docElem = doc.documentElement; 

	//确保它不是断开连接的DOM节点
	if（！jQuery.contains（docElem，elem））{ 
		return box; 
	} 

	//如果我们没有gBCR，只需使用0,0而不是错误
	// BlackBerry 5，iOS 3（原始iPhone）
	if（typeof elem.getBoundingClientRect！== core_strundefined）{ 
		box = elem.getBoundingClientRect（）; 
	}
	win = getWindow（doc）; 
	return { 
		top：box.top + win.pageYOffset  -  docElem.clientTop，
		left：box.left + win.pageXOffset  -  docElem.clientLeft 
	}; 
}; 

jQuery.offset = { 

	setOffset：function（elem，options，i）{ 
		var curPosition，curLeft，curCSSTop，curTop，curOffset，curCSSLeft，calculatePosition，
			position = jQuery.css（elem，“position”），
			curElem = jQuery（elem） ，
			props = {}; 

		//首先设置位置，
		如果（位置===“静态”）{ 
			elem.style.position =“relative”，则设置为in-top top / left 。
		} 

		curOffset = curElem.offset（）; 
		curCSSTop = jQuery.css（elem，“top”）;
		curCSSLeft = jQuery.css（elem，“left”）; 
		calculatePosition =（position ===“absolute”|| position ===“fixed”）&&（curCSSTop + curCSSLeft）.indexOf（“auto”）> -1; 

		// 
		如果（
			topPosition ）{ curPosition = curElem.position（）; 如果top或left是auto并且position是absolute或fixed，则需要能够计算位置 
			curTop = curPosition.top; 
			curLeft = curPosition.left; 

		} else { 
			curTop = parseFloat（curCSSTop）|| 0; 
			curLeft = parseFloat（curCSSLeft）|| 0; 
		} 

		if（jQuery.isFunction（options））{ 
			options = options.call（elem，i，curOffset）; 
		} 

		if（options.top！= null）{
			props.top =（options.top  -  curOffset.top）+ curTop; 
		} 
		if（options.left！= null）{ 
			props.left =（options.left  -  curOffset.left）+ curLeft; 
		} 

		if（选项中的“using”）{ 
			options.using.call（elem，props）; 

		} else { 
			curElem.css（props）; 
		} 
	} 
}; 


jQuery.fn.extend（{ 

	position：function（）{ 
		if（！this [0]）{ 
			return; 
		} 

		var offsetParent，offset，
			elem = this [0]，
			parentOffset = {top：0，left：0}; 

		/ /固定元素从窗口偏移（parentOffset = {top：0，left：0}，因为它是唯一的偏移父元素
		if（jQuery.css（elem，“position”）===“fixed”）{ 
			//我们假设当计算位置固定时，getBoundingClientRect可用
			offset = elem.getBoundingClientRect（）; 

		} else { 
			// Get * real * offsetParent 
			offsetParent = this.offsetParent（）; 

			//获取正确的偏移量
			offset = this.offset（）; 
			if（！jQuery.nodeName（offsetParent [0]，“html”））{ 
				parentOffset = offsetParent.offset（）; 
			} 

			//添加offsetParent边框
			parentOffset.top + = jQuery.css（offsetParent [0]，“borderTopWidth”，true）; 
			parentOffset.left + = jQuery.css（offsetParent [0]，“borderLeftWidth”，true）; 
		}

		//减去父偏移量和元素边距
		返回{ 
			top：offset.top  -  parentOffset.top  -  jQuery.css（elem，“marginTop”，true），
			left：offset.left  -  parentOffset.left  -  jQuery.css（elem，“ marginLeft“，true）
		}; 
	}，

	offsetParent：function（）{ 
		return this.map（function（）{ 
			var offsetParent = this.offsetParent || docElem; 

			while（offsetParent &&（！jQuery.nodeName（offsetParent，“html”）&& jQuery.css（offsetParent， “position”）===“static”））{ 
				offsetParent = offsetParent.offsetParent; 
			} 

			return offsetParent || docElem; 
		}）; 
	} 
};


jQuery.each（{scrollLeft：“pageXOffset”，scrollTop：“pageYOffset”}，function（method，prop）{ 
	var top =“pageYOffset”=== prop; 

	jQuery.fn [method] = function（val）{ 
		return jQuery .access（this，function（elem，method，val）{ 
			var win = getWindow（elem）; 

			if（val === undefined）{ 
				return win？win [prop]：elem [method]; 
			} 

			if（win）{ 
				win.scrollTo（
					！top？val：window.pageXOffset，
					top？val：window.pageYOffset 
				）; 

			} else { 
				elem [method] = val; 
			} 
		}，method，val，arguments.length，null）; 
	}; 
}） ; 

function getWindow（elem）{
	返回jQuery.isWindow（elem）？elem：elem.nodeType === 9 && elem.defaultView; 
} 
//创建innerHeight，innerWidth，height，width，outerHeight和outerWidth方法
jQuery.each（{Height：“height”，Width：“width”}，function（name，type）{ 
	jQuery.each（{padding：“inner “+ name，content：type，”“：”outer“+ name}，function（defaultExtra，funcName）{ 
		// margin仅适用于outerHeight，outerWidth 
		jQuery.fn [funcName] = function（margin，value）{ 
			var chainable = arguments.length &&（defaultExtra || typeof margin！==“boolean”），
				extra = defaultExtra ||（margin === true || value === true？“margin”：“border”）; 

			返回jQuery。

				if（jQuery.isWindow（elem））{ 
					//从5/8/2012开始，这将为Mobile Safari产生不正确的结果，但是
					//我们不能做很多事情。请参阅此URL上的pull请求以进行讨论：
					// https://github.com/jquery/jquery/pull/764 
					return elem.document.documentElement [“client”+ name]; 
				} 

				//获取文档宽度或高度
				if（elem.nodeType === 9）{ 
					doc = elem.documentElement; 

					//滚动[宽度/高度]或偏移[宽度/高度]或客户端[宽度/高度]，
					//以最大
					回报Math.max（
						elem.body [“scroll”+ name]，doc [“scroll”]滚动+名称]，
						elem.body [“offset”+ name]，doc [“offset”+ name]，
						doc [“client”+ name] 
					）; 
				} 

				return value === undefined？
					//获取元素的宽度或高度，请求但不强制parseFloat 
					jQuery.css（elem，type，extra）：

					//在元素
					jQuery.style 上设置宽度或高度（elem，type，value，extra）; 
			，类型，可链接？margin：undefined，chainable，null）; 
		}; 
	}）; 
}）; 
//限制任何已弃用的API的范围污染
//（function（）{ 

//匹配元素集中包含的元素数量
jQuery.fn.size = function（）{ 
	return this.length; 
};

jQuery.fn.andSelf = jQuery.fn.addBack; 

//}）（）; 
if（typeof module ===“object”&& module && typeof module.exports ===“object”）{ 
	//在实现Node 
	//模块模式（包括browserify）的加载器中将jQuery作为module.exports公开。不要创建全局，因为
	//用户将在本地存储它们，并且全局变量
	在Node模块世界中皱眉。
	module.exports = jQuery; 
} else { 
	//注册为命名的AMD模块，因为jQuery可以与其他
	可能使用define的文件连接，但不能通过适当的串联脚本
	// //了解匿名AMD模块。名为AMD的安全且最强大
	//注册方式 使用小写jquery是因为AMD模块名称是
	从文件名派生的，而jQuery通常以小写的
	//文件名提供。在创建全局之后执行此操作，以便如果AMD模块想要
	//调用noConflict来隐藏此版本的jQuery，它将起作用。
	if（typeof define ===“function”&& define.amd）{ 
		define（“jquery”，[]，function（）{return jQuery;}）; 
	} 
} 

//如果有一个窗口对象，即至少有一个文档属性，
//定义jQuery和$标识符
如果（typeof运算窗口===“对象” && typeof运算window.document ===“对象”）{ 
	窗口.jQuery = window。$ = jQuery; 
} 

}）（窗口）;