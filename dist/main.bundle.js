var ac_main =
webpackJsonpac__name_([1],{

/***/ "./node_modules/@ngrx/core/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/@ngrx/core/src/operator/enterZone.ts"));
__export(__webpack_require__("./node_modules/@ngrx/core/src/operator/leaveZone.ts"));
__export(__webpack_require__("./node_modules/@ngrx/core/src/operator/select.ts"));
__export(__webpack_require__("./node_modules/@ngrx/core/src/compose.ts"));


/***/ },

/***/ "./node_modules/@ngrx/core/src/compose.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
exports.compose = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i - 0] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var last = functions[functions.length - 1];
        var rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
};


/***/ },

/***/ "./node_modules/@ngrx/core/src/operator/enterZone.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
function enterZone(zone) {
    return this.lift(new EnterZoneOperator(zone));
}
exports.enterZone = enterZone;
var EnterZoneOperator = (function () {
    function EnterZoneOperator(_zone) {
        this._zone = _zone;
    }
    EnterZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new EnterZoneSubscriber(subscriber, this._zone));
    };
    return EnterZoneOperator;
}());
exports.EnterZoneOperator = EnterZoneOperator;
var EnterZoneSubscriber = (function (_super) {
    __extends(EnterZoneSubscriber, _super);
    function EnterZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    EnterZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.run(function () { return _this.destination.next(value); });
    };
    return EnterZoneSubscriber;
}(Subscriber_1.Subscriber));


/***/ },

/***/ "./node_modules/@ngrx/core/src/operator/leaveZone.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
function leaveZone(zone) {
    return this.lift(new LeaveZoneOperator(zone));
}
exports.leaveZone = leaveZone;
var LeaveZoneOperator = (function () {
    function LeaveZoneOperator(_zone) {
        this._zone = _zone;
    }
    LeaveZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new LeaveZoneSubscriber(subscriber, this._zone));
    };
    return LeaveZoneOperator;
}());
exports.LeaveZoneOperator = LeaveZoneOperator;
var LeaveZoneSubscriber = (function (_super) {
    __extends(LeaveZoneSubscriber, _super);
    function LeaveZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    LeaveZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.runOutsideAngular(function () { return _this.destination.next(value); });
    };
    return LeaveZoneSubscriber;
}(Subscriber_1.Subscriber));


/***/ },

/***/ "./node_modules/@ngrx/core/src/operator/select.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var pluck_1 = __webpack_require__("./node_modules/rxjs/operator/pluck.js");
var map_1 = __webpack_require__("./node_modules/rxjs/operator/map.js");
var distinctUntilChanged_1 = __webpack_require__("./node_modules/rxjs/operator/distinctUntilChanged.js");
function select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    var mapped$;
    if (typeof pathOrMapFn === 'string') {
        mapped$ = pluck_1.pluck.call.apply(pluck_1.pluck, [this, pathOrMapFn].concat(paths));
    }
    else if (typeof pathOrMapFn === 'function') {
        mapped$ = map_1.map.call(this, pathOrMapFn);
    }
    else {
        throw new TypeError(("Unexpected type " + typeof pathOrMapFn + " in select operator,")
            + " expected 'string' or 'function'");
    }
    return distinctUntilChanged_1.distinctUntilChanged.call(mapped$);
}
exports.select = select;


/***/ },

/***/ "./node_modules/@ngrx/store/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/@ngrx/store/src/dispatcher.ts"));
__export(__webpack_require__("./node_modules/@ngrx/store/src/ng2.ts"));
__export(__webpack_require__("./node_modules/@ngrx/store/src/reducer.ts"));
__export(__webpack_require__("./node_modules/@ngrx/store/src/state.ts"));
__export(__webpack_require__("./node_modules/@ngrx/store/src/store.ts"));
__export(__webpack_require__("./node_modules/@ngrx/store/src/utils.ts"));


/***/ },

/***/ "./node_modules/@ngrx/store/src/dispatcher.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
var Dispatcher = (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        _super.call(this, { type: Dispatcher.INIT });
    }
    Dispatcher.prototype.dispatch = function (action) {
        this.next(action);
    };
    Dispatcher.prototype.complete = function () {
        // noop
    };
    Dispatcher.INIT = '@ngrx/store/init';
    return Dispatcher;
}(BehaviorSubject_1.BehaviorSubject));
exports.Dispatcher = Dispatcher;


/***/ },

/***/ "./node_modules/@ngrx/store/src/ng2.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var reducer_1 = __webpack_require__("./node_modules/@ngrx/store/src/reducer.ts");
var dispatcher_1 = __webpack_require__("./node_modules/@ngrx/store/src/dispatcher.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/src/store.ts");
var state_1 = __webpack_require__("./node_modules/@ngrx/store/src/state.ts");
var utils_1 = __webpack_require__("./node_modules/@ngrx/store/src/utils.ts");
exports.INITIAL_REDUCER = new core_1.OpaqueToken('Token ngrx/store/reducer');
exports.INITIAL_STATE = new core_1.OpaqueToken('Token ngrx/store/initial-state');
exports._INITIAL_REDUCER = new core_1.OpaqueToken('Token _ngrx/store/reducer');
exports._INITIAL_STATE = new core_1.OpaqueToken('Token _ngrx/store/initial-state');
function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return utils_1.combineReducers(reducer);
}
exports._initialReducerFactory = _initialReducerFactory;
function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: dispatcher_1.Dispatcher.INIT });
    }
    return initialState;
}
exports._initialStateFactory = _initialStateFactory;
function _storeFactory(dispatcher, reducer, state$) {
    return new store_1.Store(dispatcher, reducer, state$);
}
exports._storeFactory = _storeFactory;
function _stateFactory(initialState, dispatcher, reducer) {
    return new state_1.State(initialState, dispatcher, reducer);
}
exports._stateFactory = _stateFactory;
function _reducerFactory(dispatcher, reducer) {
    return new reducer_1.Reducer(dispatcher, reducer);
}
exports._reducerFactory = _reducerFactory;
;
/**
 * @deprecated, use StoreModule.provideStore instead!
 */
function provideStore(_reducer, _initialState) {
    return [
        dispatcher_1.Dispatcher,
        { provide: store_1.Store, useFactory: _storeFactory, deps: [dispatcher_1.Dispatcher, reducer_1.Reducer, state_1.State] },
        { provide: reducer_1.Reducer, useFactory: _reducerFactory, deps: [dispatcher_1.Dispatcher, exports.INITIAL_REDUCER] },
        { provide: state_1.State, useFactory: _stateFactory, deps: [exports.INITIAL_STATE, dispatcher_1.Dispatcher, reducer_1.Reducer] },
        { provide: exports.INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [exports._INITIAL_REDUCER] },
        { provide: exports.INITIAL_STATE, useFactory: _initialStateFactory, deps: [exports._INITIAL_STATE, exports.INITIAL_REDUCER] },
        { provide: exports._INITIAL_STATE, useValue: _initialState },
        { provide: exports._INITIAL_REDUCER, useValue: _reducer }
    ];
}
exports.provideStore = provideStore;
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (_reducer, _initialState) {
        return {
            ngModule: StoreModule,
            providers: provideStore(_reducer, _initialState)
        };
    };
    StoreModule = __decorate([
        core_1.NgModule({}), 
        __metadata('design:paramtypes', [])
    ], StoreModule);
    return StoreModule;
}());
exports.StoreModule = StoreModule;


/***/ },

/***/ "./node_modules/@ngrx/store/src/reducer.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
var Reducer = (function (_super) {
    __extends(Reducer, _super);
    function Reducer(_dispatcher, initialReducer) {
        _super.call(this, initialReducer);
        this._dispatcher = _dispatcher;
    }
    Reducer.prototype.replaceReducer = function (reducer) {
        this.next(reducer);
    };
    Reducer.prototype.next = function (reducer) {
        _super.prototype.next.call(this, reducer);
        this._dispatcher.dispatch({ type: Reducer.REPLACE });
    };
    Reducer.REPLACE = '@ngrx/store/replace-reducer';
    return Reducer;
}(BehaviorSubject_1.BehaviorSubject));
exports.Reducer = Reducer;


/***/ },

/***/ "./node_modules/@ngrx/store/src/state.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var withLatestFrom_1 = __webpack_require__("./node_modules/rxjs/operator/withLatestFrom.js");
var scan_1 = __webpack_require__("./node_modules/rxjs/operator/scan.js");
var observeOn_1 = __webpack_require__("./node_modules/rxjs/operator/observeOn.js");
var queue_1 = __webpack_require__("./node_modules/rxjs/scheduler/queue.js");
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
var State = (function (_super) {
    __extends(State, _super);
    function State(_initialState, action$, reducer$) {
        var _this = this;
        _super.call(this, _initialState);
        var actionInQueue$ = observeOn_1.observeOn.call(action$, queue_1.queue);
        var actionAndReducer$ = withLatestFrom_1.withLatestFrom.call(actionInQueue$, reducer$);
        var state$ = scan_1.scan.call(actionAndReducer$, function (state, _a) {
            var action = _a[0], reducer = _a[1];
            return reducer(state, action);
        }, _initialState);
        state$.subscribe(function (value) { return _this.next(value); });
    }
    return State;
}(BehaviorSubject_1.BehaviorSubject));
exports.State = State;


/***/ },

/***/ "./node_modules/@ngrx/store/src/store.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@ngrx/core/index.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(_dispatcher, _reducer, state$) {
        _super.call(this);
        this._dispatcher = _dispatcher;
        this._reducer = _reducer;
        this.select = core_1.select.bind(this);
        this.source = state$;
    }
    Store.prototype.lift = function (operator) {
        var store = new Store(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    Store.prototype.replaceReducer = function (reducer) {
        this._reducer.next(reducer);
    };
    Store.prototype.dispatch = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.next = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.error = function (err) {
        this._dispatcher.error(err);
    };
    Store.prototype.complete = function () {
        // noop
    };
    return Store;
}(Observable_1.Observable));
exports.Store = Store;


/***/ },

/***/ "./node_modules/@ngrx/store/src/utils.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i];
            var reducer = finalReducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
exports.combineReducers = combineReducers;


/***/ },

/***/ "./node_modules/file-saver/FileSaver.js":
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__("./node_modules/webpack/buildin/amd-define.js") !== null) && (__webpack_require__("./node_modules/webpack/buildin/amd-options.js") !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
    return saveAs;
  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ },

/***/ "./node_modules/ng2-bs3-modal/components/modal-body.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ModalBodyComponent = (function () {
    function ModalBodyComponent() {
    }
    ModalBodyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal-body',
                    template: "\n        <div class=\"modal-body\">\n            <ng-content></ng-content>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalBodyComponent.ctorParameters = [];
    return ModalBodyComponent;
}());
exports.ModalBodyComponent = ModalBodyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9uZzItYnMzLW1vZGFsL2NvbXBvbmVudHMvbW9kYWwtYm9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQTZELGVBQWUsQ0FBQyxDQUFBO0FBSTdFO0lBQUE7SUFjQSxDQUFDO0lBYk0sNkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSxtR0FJVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaUNBQWMsR0FBNkQsRUFDakYsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSwwQkFBa0IscUJBYzlCLENBQUEifQ==

/***/ },

/***/ "./node_modules/ng2-bs3-modal/components/modal-footer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var modal_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal.js");
var ModalFooterComponent = (function () {
    function ModalFooterComponent(modal) {
        this.modal = modal;
        this.showDefaultButtons = false;
        this.dismissButtonLabel = 'Dismiss';
        this.closeButtonLabel = 'Close';
    }
    ModalFooterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal-footer',
                    template: "\n        <div class=\"modal-footer\">\n            <ng-content></ng-content>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"modal.dismiss()\">{{dismissButtonLabel}}</button>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-primary\" (click)=\"modal.close()\">{{closeButtonLabel}}</button>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalFooterComponent.ctorParameters = [
        { type: modal_1.ModalComponent, },
    ];
    ModalFooterComponent.propDecorators = {
        'showDefaultButtons': [{ type: core_1.Input, args: ['show-default-buttons',] },],
        'dismissButtonLabel': [{ type: core_1.Input, args: ['dismiss-button-label',] },],
        'closeButtonLabel': [{ type: core_1.Input, args: ['close-button-label',] },],
    };
    return ModalFooterComponent;
}());
exports.ModalFooterComponent = ModalFooterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZm9vdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25nMi1iczMtbW9kYWwvY29tcG9uZW50cy9tb2RhbC1mb290ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUF5QyxlQUFlLENBQUMsQ0FBQTtBQUN6RCxzQkFBK0IsU0FBUyxDQUFDLENBQUE7QUFHekM7SUFJSSw4QkFBb0IsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFIeEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLHVCQUFrQixHQUFXLFNBQVMsQ0FBQztRQUN2QyxxQkFBZ0IsR0FBVyxPQUFPLENBQUM7SUFDUyxDQUFDO0lBQzNDLCtCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsd2FBTVQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQTZEO1FBQ2xGLEVBQUMsSUFBSSxFQUFFLHNCQUFjLEdBQUc7S0FDdkIsQ0FBQztJQUNLLG1DQUFjLEdBQTJDO1FBQ2hFLG9CQUFvQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLElBQUksRUFBRSxDQUFDLHNCQUFzQixFQUFHLEVBQUUsRUFBRTtRQUMxRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRyxFQUFFLEVBQUU7UUFDMUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUcsRUFBRSxFQUFFO0tBQ3JFLENBQUM7SUFDRiwyQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksNEJBQW9CLHVCQTBCaEMsQ0FBQSJ9

/***/ },

/***/ "./node_modules/ng2-bs3-modal/components/modal-header.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var modal_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal.js");
var ModalHeaderComponent = (function () {
    function ModalHeaderComponent(modal) {
        this.modal = modal;
        this.showClose = false;
    }
    ModalHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal-header',
                    template: "\n        <div class=\"modal-header\">\n            <button *ngIf=\"showClose\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"modal.dismiss()\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <ng-content></ng-content>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalHeaderComponent.ctorParameters = [
        { type: modal_1.ModalComponent, },
    ];
    ModalHeaderComponent.propDecorators = {
        'showClose': [{ type: core_1.Input, args: ['show-close',] },],
    };
    return ModalHeaderComponent;
}());
exports.ModalHeaderComponent = ModalHeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25nMi1iczMtbW9kYWwvY29tcG9uZW50cy9tb2RhbC1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUF5QyxlQUFlLENBQUMsQ0FBQTtBQUN6RCxzQkFBK0IsU0FBUyxDQUFDLENBQUE7QUFHekM7SUFFSSw4QkFBb0IsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFEeEMsY0FBUyxHQUFZLEtBQUssQ0FBQztJQUNpQixDQUFDO0lBQzNDLCtCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUseVVBT1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQTZEO1FBQ2xGLEVBQUMsSUFBSSxFQUFFLHNCQUFjLEdBQUc7S0FDdkIsQ0FBQztJQUNLLG1DQUFjLEdBQTJDO1FBQ2hFLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUcsRUFBRSxFQUFFO0tBQ3RELENBQUM7SUFDRiwyQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlksNEJBQW9CLHVCQXVCaEMsQ0FBQSJ9

/***/ },

/***/ "./node_modules/ng2-bs3-modal/components/modal-instance.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/add/observable/fromEvent.js");
var ModalInstance = (function () {
    function ModalInstance(element) {
        this.element = element;
        this.suffix = '.ng2-bs3-modal';
        this.shownEventName = 'shown.bs.modal' + this.suffix;
        this.hiddenEventName = 'hidden.bs.modal' + this.suffix;
        this.visible = false;
        this.init();
    }
    ModalInstance.prototype.open = function () {
        return this.show();
    };
    ModalInstance.prototype.close = function () {
        this.result = ModalResult.Close;
        return this.hide();
    };
    ModalInstance.prototype.dismiss = function () {
        this.result = ModalResult.Dismiss;
        return this.hide();
    };
    ModalInstance.prototype.destroy = function () {
        var _this = this;
        return this.hide().then(function () {
            if (_this.$modal) {
                _this.$modal.data('bs.modal', null);
                _this.$modal.remove();
            }
        });
    };
    ModalInstance.prototype.show = function () {
        var promise = toPromise(this.shown);
        this.resetData();
        this.$modal.modal();
        return promise;
    };
    ModalInstance.prototype.hide = function () {
        if (this.$modal && this.visible) {
            var promise = toPromise(this.hidden);
            this.$modal.modal('hide');
            return promise;
        }
        return Promise.resolve(this.result);
    };
    ModalInstance.prototype.init = function () {
        var _this = this;
        this.$modal = jQuery(this.element.nativeElement);
        this.$modal.appendTo('body');
        this.shown = Observable_1.Observable.fromEvent(this.$modal, this.shownEventName)
            .map(function () {
            _this.visible = true;
        });
        this.hidden = Observable_1.Observable.fromEvent(this.$modal, this.hiddenEventName)
            .map(function () {
            var result = (!_this.result || _this.result === ModalResult.None)
                ? ModalResult.Dismiss : _this.result;
            _this.result = ModalResult.None;
            _this.visible = false;
            return result;
        });
    };
    ModalInstance.prototype.resetData = function () {
        this.$modal.removeData();
        this.$modal.data('backdrop', booleanOrValue(this.$modal.attr('data-backdrop')));
        this.$modal.data('keyboard', booleanOrValue(this.$modal.attr('data-keyboard')));
    };
    return ModalInstance;
}());
exports.ModalInstance = ModalInstance;
function booleanOrValue(value) {
    if (value === 'true')
        return true;
    else if (value === 'false')
        return false;
    return value;
}
function toPromise(observable) {
    return new Promise(function (resolve, reject) {
        observable.subscribe(function (next) {
            resolve(next);
        });
    });
}
(function (ModalResult) {
    ModalResult[ModalResult["None"] = 0] = "None";
    ModalResult[ModalResult["Close"] = 1] = "Close";
    ModalResult[ModalResult["Dismiss"] = 2] = "Dismiss";
})(exports.ModalResult || (exports.ModalResult = {}));
var ModalResult = exports.ModalResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbmcyLWJzMy1tb2RhbC9jb21wb25lbnRzL21vZGFsLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSwyQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUM3QyxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFDL0IsUUFBTywrQkFBK0IsQ0FBQyxDQUFBO0FBSXZDO0lBWUksdUJBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFWL0IsV0FBTSxHQUFXLGdCQUFnQixDQUFDO1FBQ2xDLG1CQUFjLEdBQVcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4RCxvQkFBZSxHQUFXLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFNbEUsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUdyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELDRCQUFJLEdBQUo7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUFBLGlCQU9DO1FBTkcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyw0QkFBSSxHQUFaO1FBQ0ksSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTyw0QkFBSSxHQUFaO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sNEJBQUksR0FBWjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQzlELEdBQUcsQ0FBQztZQUNELEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLE1BQU0sR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDaEUsR0FBRyxDQUFDO1lBQ0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLElBQUksS0FBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDO2tCQUN6RCxXQUFXLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUM7WUFFeEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQy9CLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU8saUNBQVMsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFqRkQsSUFpRkM7QUFqRlkscUJBQWEsZ0JBaUZ6QixDQUFBO0FBRUQsd0JBQXdCLEtBQUs7SUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsbUJBQXNCLFVBQXlCO0lBQzNDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQy9CLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFdBQVksV0FBVztJQUNuQiw2Q0FBSSxDQUFBO0lBQ0osK0NBQUssQ0FBQTtJQUNMLG1EQUFPLENBQUE7QUFDWCxDQUFDLEVBSlcsbUJBQVcsS0FBWCxtQkFBVyxRQUl0QjtBQUpELElBQVksV0FBVyxHQUFYLG1CQUlYLENBQUEifQ==

/***/ },

/***/ "./node_modules/ng2-bs3-modal/components/modal.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var modal_instance_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal-instance.js");
var ModalComponent = (function () {
    function ModalComponent(element) {
        var _this = this;
        this.element = element;
        this.overrideSize = null;
        this.visible = false;
        this.animation = true;
        this.backdrop = true;
        this.keyboard = true;
        this.cssClass = '';
        this.onClose = new core_1.EventEmitter(false);
        this.onDismiss = new core_1.EventEmitter(false);
        this.onOpen = new core_1.EventEmitter(false);
        this.instance = new modal_instance_1.ModalInstance(this.element);
        this.instance.hidden.subscribe(function (result) {
            _this.visible = _this.instance.visible;
            if (result === modal_instance_1.ModalResult.Dismiss) {
                _this.onDismiss.emit(undefined);
            }
        });
        this.instance.shown.subscribe(function () {
            _this.onOpen.emit(undefined);
        });
    }
    Object.defineProperty(ModalComponent.prototype, "fadeClass", {
        get: function () {
            return this.animation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataKeyboardAttr", {
        get: function () {
            return this.keyboard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataBackdropAttr", {
        get: function () {
            return this.backdrop;
        },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.ngOnDestroy = function () {
        return this.instance && this.instance.destroy();
    };
    ModalComponent.prototype.routerCanDeactivate = function () {
        return this.ngOnDestroy();
    };
    ModalComponent.prototype.open = function (size) {
        var _this = this;
        if (ModalSize.validSize(size))
            this.overrideSize = size;
        return this.instance.open().then(function () {
            _this.visible = _this.instance.visible;
        });
    };
    ModalComponent.prototype.close = function (value) {
        var _this = this;
        return this.instance.close().then(function () {
            _this.onClose.emit(value);
        });
    };
    ModalComponent.prototype.dismiss = function () {
        return this.instance.dismiss();
    };
    ModalComponent.prototype.getCssClasses = function () {
        var classes = [];
        if (this.isSmall()) {
            classes.push('modal-sm');
        }
        if (this.isLarge()) {
            classes.push('modal-lg');
        }
        if (this.cssClass !== '') {
            classes.push(this.cssClass);
        }
        return classes.join(' ');
    };
    ModalComponent.prototype.isSmall = function () {
        return this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    };
    ModalComponent.prototype.isLarge = function () {
        return this.overrideSize !== ModalSize.Small
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    };
    ModalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal',
                    host: {
                        'class': 'modal',
                        'role': 'dialog',
                        'tabindex': '-1'
                    },
                    template: "\n        <div class=\"modal-dialog\" [ngClass]=\"getCssClasses()\">\n            <div class=\"modal-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    ModalComponent.propDecorators = {
        'animation': [{ type: core_1.Input },],
        'backdrop': [{ type: core_1.Input },],
        'keyboard': [{ type: core_1.Input },],
        'size': [{ type: core_1.Input },],
        'cssClass': [{ type: core_1.Input },],
        'onClose': [{ type: core_1.Output },],
        'onDismiss': [{ type: core_1.Output },],
        'onOpen': [{ type: core_1.Output },],
        'fadeClass': [{ type: core_1.HostBinding, args: ['class.fade',] },],
        'dataKeyboardAttr': [{ type: core_1.HostBinding, args: ['attr.data-keyboard',] },],
        'dataBackdropAttr': [{ type: core_1.HostBinding, args: ['attr.data-backdrop',] },],
    };
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
var ModalSize = (function () {
    function ModalSize() {
    }
    ModalSize.validSize = function (size) {
        return size && (size === ModalSize.Small || size === ModalSize.Large);
    };
    ModalSize.Small = 'sm';
    ModalSize.Large = 'lg';
    return ModalSize;
}());
exports.ModalSize = ModalSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbmcyLWJzMy1tb2RhbC9jb21wb25lbnRzL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBeUcsZUFBZSxDQUFDLENBQUE7QUFDekgsK0JBQTJDLGtCQUFrQixDQUFDLENBQUE7QUFHOUQ7SUE2Qkksd0JBQW9CLE9BQW1CO1FBN0IzQyxpQkFvSUM7UUF2R3VCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUEzQi9CLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBR3BDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFeEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixhQUFRLEdBQXFCLElBQUksQ0FBQztRQUNsQyxhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEIsWUFBTyxHQUFzQixJQUFJLG1CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsY0FBUyxHQUFzQixJQUFJLG1CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsV0FBTSxHQUFzQixJQUFJLG1CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFlakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDbEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssNEJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDMUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBekJBLHNCQUFJLHFDQUFTO2FBQWI7WUFDRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVBLHNCQUFJLDRDQUFnQjthQUFwQjtZQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUEsc0JBQUksNENBQWdCO2FBQXBCO1lBQ0csTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFpQkQsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVELDRDQUFtQixHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDZCQUFJLEdBQUosVUFBSyxJQUFhO1FBQWxCLGlCQUtDO1FBSkcsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztZQUM3QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhCQUFLLEdBQUwsVUFBTSxLQUFXO1FBQWpCLGlCQUlDO1FBSEcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzlCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFPLEdBQVA7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUNJLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUUzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sZ0NBQU8sR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxLQUFLO2VBQ3JDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEtBQUs7ZUFDN0IsSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ2pELENBQUM7SUFFTyxnQ0FBTyxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDLEtBQUs7ZUFDckMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsS0FBSztlQUM3QixJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDakQsQ0FBQztJQUNFLHlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxPQUFPO29CQUNqQixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLE9BQU87d0JBQ2hCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixVQUFVLEVBQUUsSUFBSTtxQkFDbkI7b0JBQ0QsUUFBUSxFQUFFLHNNQU1UO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw2QkFBYyxHQUE2RDtRQUNsRixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO0tBQ25CLENBQUM7SUFDSyw2QkFBYyxHQUEyQztRQUNoRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUMvQixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUM5QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUM5QixNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUMxQixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUM5QixXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNoQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUM3QixXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7UUFDN0Qsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLG9CQUFvQixFQUFHLEVBQUUsRUFBRTtRQUM1RSxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUcsRUFBRSxFQUFFO0tBQzNFLENBQUM7SUFDRixxQkFBQztBQUFELENBQUMsQUFwSUQsSUFvSUM7QUFwSVksc0JBQWMsaUJBb0kxQixDQUFBO0FBRUQ7SUFBQTtJQU9BLENBQUM7SUFIVSxtQkFBUyxHQUFoQixVQUFpQixJQUFZO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFMTSxlQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2IsZUFBSyxHQUFHLElBQUksQ0FBQztJQUt4QixnQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksaUJBQVMsWUFPckIsQ0FBQSJ9

/***/ },

/***/ "./node_modules/ng2-bs3-modal/directives/autofocus.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var modal_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal.js");
var AutofocusDirective = (function () {
    function AutofocusDirective(el, modal) {
        var _this = this;
        this.el = el;
        this.modal = modal;
        if (modal) {
            this.modal.onOpen.subscribe(function () {
                _this.el.nativeElement.focus();
            });
        }
    }
    AutofocusDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[autofocus]'
                },] },
    ];
    /** @nocollapse */
    AutofocusDirective.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: modal_1.ModalComponent, decorators: [{ type: core_1.Optional },] },
    ];
    return AutofocusDirective;
}());
exports.AutofocusDirective = AutofocusDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25nMi1iczMtbW9kYWwvZGlyZWN0aXZlcy9hdXRvZm9jdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUF3RCxlQUFlLENBQUMsQ0FBQTtBQUN4RSxzQkFBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUdyRDtJQUNJLDRCQUFvQixFQUFjLEVBQVcsS0FBcUI7UUFEdEUsaUJBa0JDO1FBakJ1QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVcsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDOUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUNFLDZCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxhQUFhO2lCQUMxQixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaUNBQWMsR0FBNkQ7UUFDbEYsRUFBQyxJQUFJLEVBQUUsaUJBQVUsR0FBRztRQUNwQixFQUFDLElBQUksRUFBRSxzQkFBYyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxFQUFHLEVBQUM7S0FDekQsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSwwQkFBa0IscUJBa0I5QixDQUFBIn0=

/***/ },

/***/ "./node_modules/ng2-bs3-modal/ng2-bs3-modal.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var modal_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal.js");
var modal_header_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal-header.js");
var modal_body_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal-body.js");
var modal_footer_1 = __webpack_require__("./node_modules/ng2-bs3-modal/components/modal-footer.js");
var autofocus_1 = __webpack_require__("./node_modules/ng2-bs3-modal/directives/autofocus.js");
__export(__webpack_require__("./node_modules/ng2-bs3-modal/components/modal.js"));
__export(__webpack_require__("./node_modules/ng2-bs3-modal/components/modal-header.js"));
__export(__webpack_require__("./node_modules/ng2-bs3-modal/components/modal-body.js"));
__export(__webpack_require__("./node_modules/ng2-bs3-modal/components/modal-footer.js"));
__export(__webpack_require__("./node_modules/ng2-bs3-modal/components/modal-instance.js"));
var Ng2Bs3ModalModule = (function () {
    function Ng2Bs3ModalModule() {
    }
    Ng2Bs3ModalModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        modal_1.ModalComponent,
                        modal_header_1.ModalHeaderComponent,
                        modal_body_1.ModalBodyComponent,
                        modal_footer_1.ModalFooterComponent,
                        autofocus_1.AutofocusDirective
                    ],
                    exports: [
                        modal_1.ModalComponent,
                        modal_header_1.ModalHeaderComponent,
                        modal_body_1.ModalBodyComponent,
                        modal_footer_1.ModalFooterComponent,
                        autofocus_1.AutofocusDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    Ng2Bs3ModalModule.ctorParameters = [];
    return Ng2Bs3ModalModule;
}());
exports.Ng2Bs3ModalModule = Ng2Bs3ModalModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWJzMy1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9uZzItYnMzLW1vZGFsL25nMi1iczMtbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUUvQyxzQkFBK0Isb0JBQW9CLENBQUMsQ0FBQTtBQUNwRCw2QkFBcUMsMkJBQTJCLENBQUMsQ0FBQTtBQUNqRSwyQkFBbUMseUJBQXlCLENBQUMsQ0FBQTtBQUM3RCw2QkFBcUMsMkJBQTJCLENBQUMsQ0FBQTtBQUNqRSwwQkFBbUMsd0JBQXdCLENBQUMsQ0FBQTtBQUU1RCxpQkFBYyxvQkFBb0IsQ0FBQyxFQUFBO0FBQ25DLGlCQUFjLDJCQUEyQixDQUFDLEVBQUE7QUFDMUMsaUJBQWMseUJBQXlCLENBQUMsRUFBQTtBQUN4QyxpQkFBYywyQkFBMkIsQ0FBQyxFQUFBO0FBQzFDLGlCQUFjLDZCQUE2QixDQUFDLEVBQUE7QUFHNUM7SUFBQTtJQXlCQSxDQUFDO0lBeEJNLDRCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFO3dCQUNMLHFCQUFZO3FCQUNmO29CQUNELFlBQVksRUFBRTt3QkFDVixzQkFBYzt3QkFDZCxtQ0FBb0I7d0JBQ3BCLCtCQUFrQjt3QkFDbEIsbUNBQW9CO3dCQUNwQiw4QkFBa0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxzQkFBYzt3QkFDZCxtQ0FBb0I7d0JBQ3BCLCtCQUFrQjt3QkFDbEIsbUNBQW9CO3dCQUNwQiw4QkFBa0I7cUJBQ3JCO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxnQ0FBYyxHQUE2RCxFQUNqRixDQUFDO0lBQ0Ysd0JBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLHlCQUFpQixvQkF5QjdCLENBQUEifQ==

/***/ },

/***/ "./node_modules/ng2-charts/components/charts/charts.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
/* tslint:disable-next-line */
var BaseChartDirective = (function () {
    function BaseChartDirective(element) {
        this.labels = [];
        this.options = {};
        this.chartClick = new core_1.EventEmitter();
        this.chartHover = new core_1.EventEmitter();
        this.initFlag = false;
        this.element = element;
    }
    BaseChartDirective.prototype.ngOnInit = function () {
        this.ctx = this.element.nativeElement.getContext('2d');
        this.cvs = this.element.nativeElement;
        this.initFlag = true;
        if (this.data || this.datasets) {
            this.refresh();
        }
    };
    BaseChartDirective.prototype.ngOnChanges = function (changes) {
        if (this.initFlag) {
            // Check if the changes are in the data or datasets
            if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
                this.chart.data.datasets = this.getDatasets();
                if (changes.hasOwnProperty('labels')) {
                    this.chart.data.labels = this.labels;
                }
                this.chart.update();
            }
            else {
                this.refresh();
            }
        }
    };
    BaseChartDirective.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
    };
    BaseChartDirective.prototype.getChartBuilder = function (ctx /*, data:Array<any>, options:any*/) {
        var _this = this;
        var datasets = this.getDatasets();
        var options = Object.assign({}, this.options);
        if (this.legend === false) {
            options.legend = { display: false };
        }
        // hock for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = function (active) {
                if (active && !active.length) {
                    return;
                }
                _this.chartHover.emit({ active: active });
            };
        }
        if (!options.onClick) {
            options.onClick = function (event, active) {
                _this.chartClick.emit({ event: event, active: active });
            };
        }
        var opts = {
            type: this.chartType,
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: options
        };
        if (typeof Chart === 'undefined') {
            throw new Error('ng2-charts configuration issue: Embedding Chart.js lib is mandatory');
        }
        return new Chart(ctx, opts);
    };
    BaseChartDirective.prototype.getDatasets = function () {
        var _this = this;
        var datasets = void 0;
        // in case if datasets is not provided, but data is present
        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
            if (Array.isArray(this.data[0])) {
                datasets = this.data.map(function (data, index) {
                    return { data: data, label: _this.labels[index] || "Label " + index };
                });
            }
            else {
                datasets = [{ data: this.data, label: "Label 0" }];
            }
        }
        if (this.datasets && this.datasets.length ||
            (datasets && datasets.length)) {
            datasets = (this.datasets || datasets)
                .map(function (elm, index) {
                var newElm = Object.assign({}, elm);
                if (_this.colors && _this.colors.length) {
                    Object.assign(newElm, _this.colors[index]);
                }
                else {
                    Object.assign(newElm, getColors(_this.chartType, index, newElm.data.length));
                }
                return newElm;
            });
        }
        if (!datasets) {
            throw new Error("ng-charts configuration error, \n      data or datasets field are required to render char " + this.chartType);
        }
        return datasets;
    };
    BaseChartDirective.prototype.refresh = function () {
        // if (this.options && this.options.responsive) {
        //   setTimeout(() => this.refresh(), 50);
        // }
        // todo: remove this line, it is producing flickering
        this.ngOnDestroy();
        this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
    };
    BaseChartDirective.defaultColors = [
        [255, 99, 132],
        [54, 162, 235],
        [255, 206, 86],
        [231, 233, 237],
        [75, 192, 192],
        [151, 187, 205],
        [220, 220, 220],
        [247, 70, 74],
        [70, 191, 189],
        [253, 180, 92],
        [148, 159, 177],
        [77, 83, 96]
    ];
    BaseChartDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'canvas[baseChart]' },] },
    ];
    /** @nocollapse */
    BaseChartDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    BaseChartDirective.propDecorators = {
        'data': [{ type: core_1.Input },],
        'datasets': [{ type: core_1.Input },],
        'labels': [{ type: core_1.Input },],
        'options': [{ type: core_1.Input },],
        'chartType': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'chartClick': [{ type: core_1.Output },],
        'chartHover': [{ type: core_1.Output },],
    };
    return BaseChartDirective;
}());
exports.BaseChartDirective = BaseChartDirective;
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function () { return '#fff'; }),
        pointBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointBorderColor: colors.map(function () { return '#fff'; }),
        pointHoverBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointHoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function (color) { return rgba(color, 1); }),
        hoverBackgroundColor: colors.map(function (color) { return rgba(color, 0.8); }),
        hoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param index
 * @returns {number[]|Color}
 */
function generateColor(index) {
    return BaseChartDirective.defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param count
 * @returns {Colors}
 */
function generateColors(count) {
    var colorsArr = new Array(count);
    for (var i = 0; i < count; i++) {
        colorsArr[i] = BaseChartDirective.defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}
/**
 * Generate colors by chart type
 * @param chartType
 * @param index
 * @param count
 * @returns {Color}
 */
function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}
var ChartsModule = (function () {
    function ChartsModule() {
    }
    ChartsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        BaseChartDirective
                    ],
                    exports: [
                        BaseChartDirective
                    ],
                    imports: []
                },] },
    ];
    /** @nocollapse */
    ChartsModule.ctorParameters = [];
    return ChartsModule;
}());
exports.ChartsModule = ChartsModule;


/***/ },

/***/ "./node_modules/ng2-charts/ng2-charts.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-charts/components/charts/charts.js"));


/***/ },

/***/ "./node_modules/ng2-file-upload/file-upload/file-drop.directive.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var FileDropDirective = (function () {
    function FileDropDirective(element) {
        this.fileOver = new core_1.EventEmitter();
        this.onFileDrop = new core_1.EventEmitter();
        this.element = element;
    }
    FileDropDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileDropDirective.prototype.getFilters = function () {
        return {};
    };
    FileDropDirective.prototype.onDrop = function (event) {
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        var options = this.getOptions();
        var filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    };
    FileDropDirective.prototype.onDragOver = function (event) {
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    };
    FileDropDirective.prototype.onDragLeave = function (event) {
        if (event.currentTarget === this.element[0]) {
            return;
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    };
    FileDropDirective.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    };
    FileDropDirective.prototype._preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDropDirective.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    /*
     _addOverClass(item:any):any {
     item.addOverClass();
     }
  
     _removeOverClass(item:any):any {
     item.removeOverClass();
     }*/
    FileDropDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ng2FileDrop]' },] },
    ];
    /** @nocollapse */
    FileDropDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    FileDropDirective.propDecorators = {
        'uploader': [{ type: core_1.Input },],
        'fileOver': [{ type: core_1.Output },],
        'onFileDrop': [{ type: core_1.Output },],
        'onDrop': [{ type: core_1.HostListener, args: ['drop', ['$event'],] },],
        'onDragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
        'onDragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
    };
    return FileDropDirective;
}());
exports.FileDropDirective = FileDropDirective;


/***/ },

/***/ "./node_modules/ng2-file-upload/file-upload/file-item.class.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var file_like_object_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var FileItem = (function () {
    function FileItem(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new file_like_object_class_1.FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'file';
        }
        this.url = uploader.options.url;
    }
    FileItem.prototype.upload = function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    FileItem.prototype.cancel = function () {
        this.uploader.cancelItem(this);
    };
    FileItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileItem.prototype.onBeforeUpload = function () {
        return void 0;
    };
    FileItem.prototype.onBuildForm = function (form) {
        return { form: form };
    };
    FileItem.prototype.onProgress = function (progress) {
        return { progress: progress };
    };
    FileItem.prototype.onSuccess = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onError = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onCancel = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onComplete = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    FileItem.prototype._onBuildForm = function (form) {
        this.onBuildForm(form);
    };
    FileItem.prototype._onProgress = function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    FileItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    FileItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    FileItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    FileItem.prototype._onComplete = function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    };
    FileItem.prototype._prepareToUploading = function () {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    };
    return FileItem;
}());
exports.FileItem = FileItem;


/***/ },

/***/ "./node_modules/ng2-file-upload/file-upload/file-like-object.class.js":
/***/ function(module, exports) {

"use strict";
"use strict";
function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
var FileLikeObject = (function () {
    function FileLikeObject(fileOrInput) {
        var isInput = isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        var method = '_createFrom' + postfix;
        this[method](fakePathOrObject);
    }
    FileLikeObject.prototype._createFromFakePath = function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    FileLikeObject.prototype._createFromObject = function (object) {
        // this.lastModifiedDate = copy(object.lastModifiedDate);
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());
exports.FileLikeObject = FileLikeObject;


/***/ },

/***/ "./node_modules/ng2-file-upload/file-upload/file-select.directive.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
// todo: filters
var FileSelectDirective = (function () {
    function FileSelectDirective(element) {
        this.element = element;
    }
    FileSelectDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileSelectDirective.prototype.getFilters = function () {
        return void 0;
    };
    FileSelectDirective.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    FileSelectDirective.prototype.onChange = function () {
        // let files = this.uploader.isHTML5 ? this.element.nativeElement[0].files : this.element.nativeElement[0];
        var files = this.element.nativeElement.files;
        var options = this.getOptions();
        var filters = this.getFilters();
        // if(!this.uploader.isHTML5) this.destroy();
        this.uploader.addToQueue(files, options, filters);
        if (this.isEmptyAfterSelection()) {
        }
    };
    FileSelectDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ng2FileSelect]' },] },
    ];
    /** @nocollapse */
    FileSelectDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    FileSelectDirective.propDecorators = {
        'uploader': [{ type: core_1.Input },],
        'onChange': [{ type: core_1.HostListener, args: ['change',] },],
    };
    return FileSelectDirective;
}());
exports.FileSelectDirective = FileSelectDirective;


/***/ },

/***/ "./node_modules/ng2-file-upload/file-upload/file-type.class.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var FileType = (function () {
    function FileType() {
    }
    FileType.getMimeClass = function (file) {
        var mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    };
    FileType.fileTypeDetection = function (inputFilename) {
        var types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        var chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        var extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    };
    /*  MS office  */
    FileType.mime_doc = [
        'application/msword',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'application/vnd.ms-word.document.macroEnabled.12',
        'application/vnd.ms-word.template.macroEnabled.12'
    ];
    FileType.mime_xsl = [
        'application/vnd.ms-excel',
        'application/vnd.ms-excel',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        'application/vnd.ms-excel.sheet.macroEnabled.12',
        'application/vnd.ms-excel.template.macroEnabled.12',
        'application/vnd.ms-excel.addin.macroEnabled.12',
        'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
    ];
    FileType.mime_ppt = [
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.openxmlformats-officedocument.presentationml.template',
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        'application/vnd.ms-powerpoint.addin.macroEnabled.12',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
        'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
    ];
    /* PSD */
    FileType.mime_psd = [
        'image/photoshop',
        'image/x-photoshop',
        'image/psd',
        'application/photoshop',
        'application/psd',
        'zz-application/zz-winassoc-psd'
    ];
    /* Compressed files */
    FileType.mime_compress = [
        'application/x-gtar',
        'application/x-gcompress',
        'application/compress',
        'application/x-tar',
        'application/x-rar-compressed',
        'application/octet-stream'
    ];
    return FileType;
}());
exports.FileType = FileType;


/***/ },

/***/ "./node_modules/ng2-file-upload/file-upload/file-upload.module.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var file_drop_directive_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-drop.directive.js");
var file_select_directive_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-select.directive.js");
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    FileUploadModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective],
                    exports: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective]
                },] },
    ];
    /** @nocollapse */
    FileUploadModule.ctorParameters = [];
    return FileUploadModule;
}());
exports.FileUploadModule = FileUploadModule;


/***/ },

/***/ "./node_modules/ng2-file-upload/file-upload/file-uploader.class.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var file_like_object_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var file_item_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-item.class.js");
var file_type_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-type.class.js");
function isFile(value) {
    return (File && value instanceof File);
}
var FileUploader = (function () {
    function FileUploader(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false
        };
        this.setOptions(options);
    }
    FileUploader.prototype.setOptions = function (options) {
        this.options = Object.assign(this.options, options);
        this.authToken = options.authToken;
        this.authTokenHeader = options.authTokenHeader || 'Authorization';
        this.autoUpload = options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
        // this.options.filters.unshift({name: 'folder', fn: this._folderFilter});
    };
    FileUploader.prototype.addToQueue = function (files, options, filters) {
        var _this = this;
        var list = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            list.push(file);
        }
        var arrayOfFilters = this._getFilters(filters);
        var count = this.queue.length;
        var addedFileItems = [];
        list.map(function (some) {
            if (!options) {
                options = _this.options;
            }
            var temp = new file_like_object_class_1.FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                var fileItem = new file_item_class_1.FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    };
    FileUploader.prototype.removeFromQueue = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    FileUploader.prototype.clearQueue = function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    FileUploader.prototype.uploadItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this[transport](item);
    };
    FileUploader.prototype.cancelItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    };
    FileUploader.prototype.uploadAll = function () {
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.map(function (item) { return item._prepareToUploading(); });
        items[0].upload();
    };
    FileUploader.prototype.cancelAll = function () {
        var items = this.getNotUploadedItems();
        items.map(function (item) { return item.cancel(); });
    };
    FileUploader.prototype.isFile = function (value) {
        return isFile(value);
    };
    FileUploader.prototype.isFileLikeObject = function (value) {
        return value instanceof file_like_object_class_1.FileLikeObject;
    };
    FileUploader.prototype.getIndexOfItem = function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    FileUploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploader.prototype.getReadyItems = function () {
        return this.queue
            .filter(function (item) { return (item.isReady && !item.isUploading); })
            .sort(function (item1, item2) { return item1.index - item2.index; });
    };
    FileUploader.prototype.destroy = function () {
        return void 0;
        /*forEach(this._directives, (key) => {
         forEach(this._directives[key], (object) => {
         object.destroy();
         });
         });*/
    };
    FileUploader.prototype.onAfterAddingAll = function (fileItems) {
        return { fileItems: fileItems };
    };
    FileUploader.prototype.onBuildItemForm = function (fileItem, form) {
        return { fileItem: fileItem, form: form };
    };
    FileUploader.prototype.onAfterAddingFile = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onWhenAddingFileFailed = function (item, filter, options) {
        return { item: item, filter: filter, options: options };
    };
    FileUploader.prototype.onBeforeUploadItem = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onProgressItem = function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    FileUploader.prototype.onProgressAll = function (progress) {
        return { progress: progress };
    };
    FileUploader.prototype.onSuccessItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onErrorItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCancelItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteAll = function () {
        return void 0;
    };
    FileUploader.prototype._mimeTypeFilter = function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    FileUploader.prototype._fileSizeFilter = function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    FileUploader.prototype._fileTypeFilter = function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(file_type_class_1.FileType.getMimeClass(item)) === -1);
    };
    FileUploader.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    FileUploader.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    FileUploader.prototype._headersGetter = function (parsedHeaders) {
        return function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        };
    };
    FileUploader.prototype._xhrTransport = function (item) {
        var _this = this;
        var xhr = item._xhr = new XMLHttpRequest();
        var sendable;
        this._onBeforeUploadItem(item);
        // todo
        /*item.formData.map(obj => {
         obj.map((value, key) => {
         form.append(key, value);
         });
         });*/
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            sendable.append(item.alias, item._file, item.file.name);
        }
        else {
            sendable = item._file;
        }
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        // todo
        /*item.headers.map((value, name) => {
         xhr.setRequestHeader(name, value);
         });*/
        if (this.options.headers) {
            for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.send(sendable);
        this._render();
    };
    FileUploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploader.prototype._getFilters = function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
        }
        return this.options.filters;
    };
    FileUploader.prototype._render = function () {
        return void 0;
        // todo: ?
    };
    // private _folderFilter(item:FileItem):boolean {
    //   return !!(item.size || item.type);
    // }
    FileUploader.prototype._queueLimitFilter = function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    FileUploader.prototype._isValidFile = function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every(function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        });
    };
    FileUploader.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    /* tslint:disable */
    FileUploader.prototype._transformResponse = function (response, headers) {
        // todo: ?
        /*var headersGetter = this._headersGetter(headers);
         forEach($http.defaults.transformResponse, (transformFn) => {
         response = transformFn(response, headersGetter);
         });*/
        return response;
    };
    /* tslint:enable */
    FileUploader.prototype._parseHeaders = function (headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    };
    /*private _iframeTransport(item:FileItem) {
     // todo: implement it later
     }*/
    FileUploader.prototype._onWhenAddingFileFailed = function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    FileUploader.prototype._onAfterAddingFile = function (item) {
        this.onAfterAddingFile(item);
    };
    FileUploader.prototype._onAfterAddingAll = function (items) {
        this.onAfterAddingAll(items);
    };
    FileUploader.prototype._onBeforeUploadItem = function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    FileUploader.prototype._onBuildItemForm = function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    FileUploader.prototype._onProgressItem = function (item, progress) {
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    /* tslint:disable */
    FileUploader.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    /* tslint:enable */
    FileUploader.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;


/***/ },

/***/ "./node_modules/ng2-file-upload/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-select.directive.js"));
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-drop.directive.js"));
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-uploader.class.js"));
var file_upload_module_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-upload.module.js");
exports.FileUploadModule = file_upload_module_1.FileUploadModule;


/***/ },

/***/ "./node_modules/ng2-toastr/ng2-toastr.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-toastr/src/toast.js"));
__export(__webpack_require__("./node_modules/ng2-toastr/src/toast-manager.js"));
__export(__webpack_require__("./node_modules/ng2-toastr/src/toast-container.component.js"));
__export(__webpack_require__("./node_modules/ng2-toastr/src/toast-options.js"));
__export(__webpack_require__("./node_modules/ng2-toastr/src/toast.module.js"));
//# sourceMappingURL=ng2-toastr.js.map

/***/ },

/***/ "./node_modules/ng2-toastr/src/toast-container.component.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var toast_options_1 = __webpack_require__("./node_modules/ng2-toastr/src/toast-options.js");
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var ToastContainer = (function () {
    function ToastContainer(sanitizer, cdr, options) {
        this.sanitizer = sanitizer;
        this.cdr = cdr;
        this.position = 'fixed';
        this.messageClass = 'toast-message';
        this.titleClass = 'toast-title';
        this.positionClass = 'toast-top-right';
        this.toasts = [];
        this.maxShown = 5;
        this.newestOnTop = false;
        this.animate = 'fade';
        if (options) {
            Object.assign(this, options);
        }
    }
    ToastContainer.prototype.addToast = function (toast) {
        if (this.positionClass.indexOf('top') > 0) {
            if (this.newestOnTop) {
                this.toasts.unshift(toast);
            }
            else {
                this.toasts.push(toast);
            }
            if (this.toasts.length > this.maxShown) {
                var diff = this.toasts.length - this.maxShown;
                if (this.newestOnTop) {
                    this.toasts.splice(this.maxShown);
                }
                else {
                    this.toasts.splice(0, diff);
                }
            }
        }
        else {
            this.toasts.unshift(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(this.maxShown);
            }
        }
        this.cdr.detectChanges();
    };
    ToastContainer.prototype.removeToast = function (toast) {
        if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
            toast.timeoutId = null;
        }
        this.toasts = this.toasts.filter(function (t) {
            return t.id !== toast.id;
        });
    };
    ToastContainer.prototype.removeAllToasts = function () {
        this.toasts = [];
    };
    ToastContainer.prototype.clicked = function (toast) {
        if (this.onToastClicked) {
            this.onToastClicked(toast);
        }
    };
    ToastContainer.prototype.anyToast = function () {
        return this.toasts.length > 0;
    };
    ToastContainer.prototype.findToast = function (toastId) {
        for (var _i = 0, _a = this.toasts; _i < _a.length; _i++) {
            var toast = _a[_i];
            if (toast.id === toastId) {
                return toast;
            }
        }
        return null;
    };
    ToastContainer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'toast-container',
                    template: "\n    <div #toastContainer id=\"toast-container\" [style.position]=\"position\" class=\"{{positionClass}}\">\n      <div *ngFor=\"let toast of toasts\" [@inOut]=\"animate\" class=\"toast toast-{{toast.type}}\" \n      (click)=\"clicked(toast)\">\n        <div class=\"toast-close-button\" *ngIf=\"toast.config.showCloseButton\" (click)=\"removeToast(toast)\">&times;\n        </div> \n        <div *ngIf=\"toast.title\" class=\"{{toast.config.titleClass || titleClass}}\">{{toast.title}}</div>\n        <div [ngSwitch]=\"toast.config.enableHTML\">\n          <span *ngSwitchCase=\"true\" [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(toast.message)\"></span>\n          <span *ngSwitchDefault class=\"{{toast.config.messageClass || messageClass}}\">{{toast.message}}</span>\n        </div>             \n      </div>\n    </div>\n    ",
                    animations: [
                        core_1.trigger('inOut', [
                            core_1.state('flyRight, flyLeft', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                            core_1.state('fade', core_1.style({ opacity: 1 })),
                            core_1.state('slideDown, slideUp', core_1.style({ opacity: 1, transform: 'translateY(0)' })),
                            core_1.transition('void => flyRight', [
                                core_1.style({
                                    opacity: 0,
                                    transform: 'translateX(100%)'
                                }),
                                core_1.animate('0.2s ease-in')
                            ]),
                            core_1.transition('flyRight => void', [
                                core_1.animate('0.2s 10 ease-out', core_1.style({
                                    opacity: 0,
                                    transform: 'translateX(100%)'
                                }))
                            ]),
                            core_1.transition('void => flyLeft', [
                                core_1.style({
                                    opacity: 0,
                                    transform: 'translateX(-100%)'
                                }),
                                core_1.animate('0.2s ease-in')
                            ]),
                            core_1.transition('flyLeft => void', [
                                core_1.animate('0.2s 10 ease-out', core_1.style({
                                    opacity: 0,
                                    transform: 'translateX(-100%)'
                                }))
                            ]),
                            core_1.transition('void => fade', [
                                core_1.style({
                                    opacity: 0,
                                }),
                                core_1.animate('0.3s ease-in')
                            ]),
                            core_1.transition('fade => void', [
                                core_1.animate('0.3s 10 ease-out', core_1.style({
                                    opacity: 0,
                                }))
                            ]),
                            core_1.transition('void => slideDown', [
                                core_1.style({
                                    opacity: 0,
                                    transform: 'translateY(-200%)'
                                }),
                                core_1.animate('0.3s ease-in')
                            ]),
                            core_1.transition('slideDown => void', [
                                core_1.animate('0.3s 10 ease-out', core_1.style({
                                    opacity: 0,
                                    transform: 'translateY(-200%)'
                                }))
                            ]),
                            core_1.transition('void => slideUp', [
                                core_1.style({
                                    opacity: 0,
                                    transform: 'translateY(200%)'
                                }),
                                core_1.animate('0.3s ease-in')
                            ]),
                            core_1.transition('slideUp => void', [
                                core_1.animate('0.3s 10 ease-out', core_1.style({
                                    opacity: 0,
                                    transform: 'translateY(200%)'
                                }))
                            ]),
                        ]),
                    ],
                },] },
    ];
    /** @nocollapse */
    ToastContainer.ctorParameters = [
        { type: platform_browser_1.DomSanitizer, },
        { type: core_1.ChangeDetectorRef, },
        { type: toast_options_1.ToastOptions, decorators: [{ type: core_1.Optional },] },
    ];
    return ToastContainer;
}());
exports.ToastContainer = ToastContainer;
//# sourceMappingURL=toast-container.component.js.map

/***/ },

/***/ "./node_modules/ng2-toastr/src/toast-manager.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var toast_container_component_1 = __webpack_require__("./node_modules/ng2-toastr/src/toast-container.component.js");
var toast_options_1 = __webpack_require__("./node_modules/ng2-toastr/src/toast-options.js");
var toast_1 = __webpack_require__("./node_modules/ng2-toastr/src/toast.js");
var Rx_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var ToastsManager = (function () {
    function ToastsManager(componentFactoryResolver, appRef, options) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.options = {};
        this.index = 0;
        this.toastClicked = new Rx_1.Subject();
        if (options) {
            Object.assign(this.options, options);
        }
    }
    ToastsManager.prototype.setRootViewContainerRef = function (vRef) {
        this._rootViewContainerRef = vRef;
    };
    ToastsManager.prototype.onClickToast = function () {
        return this.toastClicked.asObservable();
    };
    ToastsManager.prototype.show = function (toast, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.container) {
                if (!_this.appRef['_rootComponents'].length) {
                    var err = new Error('Application root component cannot be found. Try accessing application reference in the later life cycle of angular app.');
                    console.error(err);
                    reject(err);
                }
                // get app root view component ref
                if (!_this._rootViewContainerRef) {
                    _this._rootViewContainerRef = _this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
                }
                // get options providers
                var providers = core_1.ReflectiveInjector.resolve([
                    { provide: toast_options_1.ToastOptions, useValue: _this.options }
                ]);
                // create and load ToastContainer
                var toastFactory = _this.componentFactoryResolver.resolveComponentFactory(toast_container_component_1.ToastContainer);
                var childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, _this._rootViewContainerRef.parentInjector);
                _this.container = _this._rootViewContainerRef.createComponent(toastFactory, _this._rootViewContainerRef.length, childInjector);
                _this.container.instance.onToastClicked = function (toast) {
                    _this._onToastClicked(toast);
                };
            }
            resolve(_this.setupToast(toast, options));
        });
    };
    ToastsManager.prototype.createTimeout = function (toast) {
        var _this = this;
        var task = setTimeout(function () {
            _this.clearToast(toast);
        }, toast.config.toastLife);
        return task.toString();
    };
    ToastsManager.prototype.setupToast = function (toast, options) {
        var _this = this;
        toast.id = ++this.index;
        Object.keys(toast.config).forEach(function (k) {
            if (_this.options.hasOwnProperty(k)) {
                toast.config[k] = _this.options[k];
            }
            if (options && options.hasOwnProperty(k)) {
                toast.config[k] = options[k];
            }
        });
        if (toast.config.dismiss === 'auto') {
            toast.timeoutId = this.createTimeout(toast);
        }
        this.container.instance.addToast(toast);
        return toast;
    };
    ToastsManager.prototype._onToastClicked = function (toast) {
        this.toastClicked.next(toast);
        if (toast.config.dismiss === 'click') {
            this.clearToast(toast);
        }
    };
    ToastsManager.prototype.dismissToast = function (toast) {
        this.clearToast(toast);
    };
    ToastsManager.prototype.clearToast = function (toast) {
        if (this.container) {
            var instance = this.container.instance;
            instance.removeToast(toast);
            if (!instance.anyToast()) {
                this.dispose();
            }
        }
    };
    ToastsManager.prototype.clearAllToasts = function () {
        if (this.container) {
            var instance = this.container.instance;
            instance.removeAllToasts();
            this.dispose();
        }
    };
    ToastsManager.prototype.dispose = function () {
        var _this = this;
        // using timeout to allow animation to finish
        setTimeout(function () {
            if (_this.container && !_this.container.instance.anyToast()) {
                _this.container.destroy();
                _this.container = null;
            }
        }, 2000);
    };
    ToastsManager.prototype.error = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('error', message, title, data);
        return this.show(toast, options);
    };
    ToastsManager.prototype.info = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('info', message, title, data);
        return this.show(toast, options);
    };
    ToastsManager.prototype.success = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('success', message, title, data);
        return this.show(toast, options);
    };
    ToastsManager.prototype.warning = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('warning', message, title, data);
        return this.show(toast, options);
    };
    // allow user define custom background color and image
    ToastsManager.prototype.custom = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('custom', message, title, data);
        return this.show(toast, options);
    };
    ToastsManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ToastsManager.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: toast_options_1.ToastOptions, decorators: [{ type: core_1.Optional },] },
    ];
    return ToastsManager;
}());
exports.ToastsManager = ToastsManager;
//# sourceMappingURL=toast-manager.js.map

/***/ },

/***/ "./node_modules/ng2-toastr/src/toast-options.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ToastOptions = (function () {
    function ToastOptions(options) {
        this.newestOnTop = false;
        this.animate = 'fade';
        this.enableHTML = false;
        this.showCloseButton = false;
        Object.assign(this, options);
    }
    ToastOptions.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ToastOptions.ctorParameters = [
        { type: Object, },
    ];
    return ToastOptions;
}());
exports.ToastOptions = ToastOptions;
//# sourceMappingURL=toast-options.js.map

/***/ },

/***/ "./node_modules/ng2-toastr/src/toast.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var Toast = (function () {
    function Toast(type, message, title, data) {
        this.type = type;
        this.message = message;
        this.title = title;
        this.data = data;
        this.config = {
            dismiss: 'auto',
            enableHTML: false,
            titleClass: '',
            messageClass: '',
            toastLife: 3000,
            showCloseButton: false,
        };
    }
    return Toast;
}());
exports.Toast = Toast;
//# sourceMappingURL=toast.js.map

/***/ },

/***/ "./node_modules/ng2-toastr/src/toast.module.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var toast_container_component_1 = __webpack_require__("./node_modules/ng2-toastr/src/toast-container.component.js");
var toast_manager_1 = __webpack_require__("./node_modules/ng2-toastr/src/toast-manager.js");
var toast_options_1 = __webpack_require__("./node_modules/ng2-toastr/src/toast-options.js");
var ToastModule = (function () {
    function ToastModule() {
    }
    ToastModule.forRoot = function (config) {
        return {
            ngModule: ToastModule,
            providers: [
                { provide: toast_options_1.ToastOptions, useValue: config }
            ]
        };
    };
    ToastModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [toast_container_component_1.ToastContainer],
                    exports: [toast_container_component_1.ToastContainer],
                    providers: [toast_manager_1.ToastsManager],
                    entryComponents: [toast_container_component_1.ToastContainer]
                },] },
    ];
    /** @nocollapse */
    ToastModule.ctorParameters = [];
    return ToastModule;
}());
exports.ToastModule = ToastModule;
//# sourceMappingURL=toast.module.js.map

/***/ },

/***/ "./node_modules/rxjs/AsyncSubject.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
/**
 * @class AsyncSubject<T>
 */
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        _super.apply(this, arguments);
        this.value = null;
        this.hasNext = false;
        this.hasCompleted = false;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;
//# sourceMappingURL=AsyncSubject.js.map

/***/ },

/***/ "./node_modules/rxjs/ReplaySubject.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var queue_1 = __webpack_require__("./node_modules/rxjs/scheduler/queue.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var observeOn_1 = __webpack_require__("./node_modules/rxjs/operator/observeOn.js");
var ObjectUnsubscribedError_1 = __webpack_require__("./node_modules/rxjs/util/ObjectUnsubscribedError.js");
var SubjectSubscription_1 = __webpack_require__("./node_modules/rxjs/SubjectSubscription.js");
/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map

/***/ },

/***/ "./node_modules/rxjs/Rx.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
exports.Subject = Subject_1.Subject;
exports.AnonymousSubject = Subject_1.AnonymousSubject;
/* tslint:enable:no-unused-variable */
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
exports.Observable = Observable_1.Observable;
// statics
/* tslint:disable:no-use-before-declare */
__webpack_require__("./node_modules/rxjs/add/observable/bindCallback.js");
__webpack_require__("./node_modules/rxjs/add/observable/bindNodeCallback.js");
__webpack_require__("./node_modules/rxjs/add/observable/combineLatest.js");
__webpack_require__("./node_modules/rxjs/add/observable/concat.js");
__webpack_require__("./node_modules/rxjs/add/observable/defer.js");
__webpack_require__("./node_modules/rxjs/add/observable/empty.js");
__webpack_require__("./node_modules/rxjs/add/observable/forkJoin.js");
__webpack_require__("./node_modules/rxjs/add/observable/from.js");
__webpack_require__("./node_modules/rxjs/add/observable/fromEvent.js");
__webpack_require__("./node_modules/rxjs/add/observable/fromEventPattern.js");
__webpack_require__("./node_modules/rxjs/add/observable/fromPromise.js");
__webpack_require__("./node_modules/rxjs/add/observable/generate.js");
__webpack_require__("./node_modules/rxjs/add/observable/if.js");
__webpack_require__("./node_modules/rxjs/add/observable/interval.js");
__webpack_require__("./node_modules/rxjs/add/observable/merge.js");
__webpack_require__("./node_modules/rxjs/add/observable/race.js");
__webpack_require__("./node_modules/rxjs/add/observable/never.js");
__webpack_require__("./node_modules/rxjs/add/observable/of.js");
__webpack_require__("./node_modules/rxjs/add/observable/onErrorResumeNext.js");
__webpack_require__("./node_modules/rxjs/add/observable/pairs.js");
__webpack_require__("./node_modules/rxjs/add/observable/range.js");
__webpack_require__("./node_modules/rxjs/add/observable/using.js");
__webpack_require__("./node_modules/rxjs/add/observable/throw.js");
__webpack_require__("./node_modules/rxjs/add/observable/timer.js");
__webpack_require__("./node_modules/rxjs/add/observable/zip.js");
//dom
__webpack_require__("./node_modules/rxjs/add/observable/dom/ajax.js");
__webpack_require__("./node_modules/rxjs/add/observable/dom/webSocket.js");
//operators
__webpack_require__("./node_modules/rxjs/add/operator/buffer.js");
__webpack_require__("./node_modules/rxjs/add/operator/bufferCount.js");
__webpack_require__("./node_modules/rxjs/add/operator/bufferTime.js");
__webpack_require__("./node_modules/rxjs/add/operator/bufferToggle.js");
__webpack_require__("./node_modules/rxjs/add/operator/bufferWhen.js");
__webpack_require__("./node_modules/rxjs/add/operator/catch.js");
__webpack_require__("./node_modules/rxjs/add/operator/combineAll.js");
__webpack_require__("./node_modules/rxjs/add/operator/combineLatest.js");
__webpack_require__("./node_modules/rxjs/add/operator/concat.js");
__webpack_require__("./node_modules/rxjs/add/operator/concatAll.js");
__webpack_require__("./node_modules/rxjs/add/operator/concatMap.js");
__webpack_require__("./node_modules/rxjs/add/operator/concatMapTo.js");
__webpack_require__("./node_modules/rxjs/add/operator/count.js");
__webpack_require__("./node_modules/rxjs/add/operator/dematerialize.js");
__webpack_require__("./node_modules/rxjs/add/operator/debounce.js");
__webpack_require__("./node_modules/rxjs/add/operator/debounceTime.js");
__webpack_require__("./node_modules/rxjs/add/operator/defaultIfEmpty.js");
__webpack_require__("./node_modules/rxjs/add/operator/delay.js");
__webpack_require__("./node_modules/rxjs/add/operator/delayWhen.js");
__webpack_require__("./node_modules/rxjs/add/operator/distinct.js");
__webpack_require__("./node_modules/rxjs/add/operator/distinctUntilChanged.js");
__webpack_require__("./node_modules/rxjs/add/operator/distinctUntilKeyChanged.js");
__webpack_require__("./node_modules/rxjs/add/operator/do.js");
__webpack_require__("./node_modules/rxjs/add/operator/exhaust.js");
__webpack_require__("./node_modules/rxjs/add/operator/exhaustMap.js");
__webpack_require__("./node_modules/rxjs/add/operator/expand.js");
__webpack_require__("./node_modules/rxjs/add/operator/elementAt.js");
__webpack_require__("./node_modules/rxjs/add/operator/filter.js");
__webpack_require__("./node_modules/rxjs/add/operator/finally.js");
__webpack_require__("./node_modules/rxjs/add/operator/find.js");
__webpack_require__("./node_modules/rxjs/add/operator/findIndex.js");
__webpack_require__("./node_modules/rxjs/add/operator/first.js");
__webpack_require__("./node_modules/rxjs/add/operator/groupBy.js");
__webpack_require__("./node_modules/rxjs/add/operator/ignoreElements.js");
__webpack_require__("./node_modules/rxjs/add/operator/isEmpty.js");
__webpack_require__("./node_modules/rxjs/add/operator/audit.js");
__webpack_require__("./node_modules/rxjs/add/operator/auditTime.js");
__webpack_require__("./node_modules/rxjs/add/operator/last.js");
__webpack_require__("./node_modules/rxjs/add/operator/let.js");
__webpack_require__("./node_modules/rxjs/add/operator/every.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/add/operator/mapTo.js");
__webpack_require__("./node_modules/rxjs/add/operator/materialize.js");
__webpack_require__("./node_modules/rxjs/add/operator/max.js");
__webpack_require__("./node_modules/rxjs/add/operator/merge.js");
__webpack_require__("./node_modules/rxjs/add/operator/mergeAll.js");
__webpack_require__("./node_modules/rxjs/add/operator/mergeMap.js");
__webpack_require__("./node_modules/rxjs/add/operator/mergeMapTo.js");
__webpack_require__("./node_modules/rxjs/add/operator/mergeScan.js");
__webpack_require__("./node_modules/rxjs/add/operator/min.js");
__webpack_require__("./node_modules/rxjs/add/operator/multicast.js");
__webpack_require__("./node_modules/rxjs/add/operator/observeOn.js");
__webpack_require__("./node_modules/rxjs/add/operator/onErrorResumeNext.js");
__webpack_require__("./node_modules/rxjs/add/operator/pairwise.js");
__webpack_require__("./node_modules/rxjs/add/operator/partition.js");
__webpack_require__("./node_modules/rxjs/add/operator/pluck.js");
__webpack_require__("./node_modules/rxjs/add/operator/publish.js");
__webpack_require__("./node_modules/rxjs/add/operator/publishBehavior.js");
__webpack_require__("./node_modules/rxjs/add/operator/publishReplay.js");
__webpack_require__("./node_modules/rxjs/add/operator/publishLast.js");
__webpack_require__("./node_modules/rxjs/add/operator/race.js");
__webpack_require__("./node_modules/rxjs/add/operator/reduce.js");
__webpack_require__("./node_modules/rxjs/add/operator/repeat.js");
__webpack_require__("./node_modules/rxjs/add/operator/repeatWhen.js");
__webpack_require__("./node_modules/rxjs/add/operator/retry.js");
__webpack_require__("./node_modules/rxjs/add/operator/retryWhen.js");
__webpack_require__("./node_modules/rxjs/add/operator/sample.js");
__webpack_require__("./node_modules/rxjs/add/operator/sampleTime.js");
__webpack_require__("./node_modules/rxjs/add/operator/scan.js");
__webpack_require__("./node_modules/rxjs/add/operator/sequenceEqual.js");
__webpack_require__("./node_modules/rxjs/add/operator/share.js");
__webpack_require__("./node_modules/rxjs/add/operator/single.js");
__webpack_require__("./node_modules/rxjs/add/operator/skip.js");
__webpack_require__("./node_modules/rxjs/add/operator/skipUntil.js");
__webpack_require__("./node_modules/rxjs/add/operator/skipWhile.js");
__webpack_require__("./node_modules/rxjs/add/operator/startWith.js");
__webpack_require__("./node_modules/rxjs/add/operator/subscribeOn.js");
__webpack_require__("./node_modules/rxjs/add/operator/switch.js");
__webpack_require__("./node_modules/rxjs/add/operator/switchMap.js");
__webpack_require__("./node_modules/rxjs/add/operator/switchMapTo.js");
__webpack_require__("./node_modules/rxjs/add/operator/take.js");
__webpack_require__("./node_modules/rxjs/add/operator/takeLast.js");
__webpack_require__("./node_modules/rxjs/add/operator/takeUntil.js");
__webpack_require__("./node_modules/rxjs/add/operator/takeWhile.js");
__webpack_require__("./node_modules/rxjs/add/operator/throttle.js");
__webpack_require__("./node_modules/rxjs/add/operator/throttleTime.js");
__webpack_require__("./node_modules/rxjs/add/operator/timeInterval.js");
__webpack_require__("./node_modules/rxjs/add/operator/timeout.js");
__webpack_require__("./node_modules/rxjs/add/operator/timeoutWith.js");
__webpack_require__("./node_modules/rxjs/add/operator/timestamp.js");
__webpack_require__("./node_modules/rxjs/add/operator/toArray.js");
__webpack_require__("./node_modules/rxjs/add/operator/toPromise.js");
__webpack_require__("./node_modules/rxjs/add/operator/window.js");
__webpack_require__("./node_modules/rxjs/add/operator/windowCount.js");
__webpack_require__("./node_modules/rxjs/add/operator/windowTime.js");
__webpack_require__("./node_modules/rxjs/add/operator/windowToggle.js");
__webpack_require__("./node_modules/rxjs/add/operator/windowWhen.js");
__webpack_require__("./node_modules/rxjs/add/operator/withLatestFrom.js");
__webpack_require__("./node_modules/rxjs/add/operator/zip.js");
__webpack_require__("./node_modules/rxjs/add/operator/zipAll.js");
/* tslint:disable:no-unused-variable */
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
exports.Subscription = Subscription_1.Subscription;
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
exports.Subscriber = Subscriber_1.Subscriber;
var AsyncSubject_1 = __webpack_require__("./node_modules/rxjs/AsyncSubject.js");
exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
var ReplaySubject_1 = __webpack_require__("./node_modules/rxjs/ReplaySubject.js");
exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
var ConnectableObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ConnectableObservable.js");
exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
var Notification_1 = __webpack_require__("./node_modules/rxjs/Notification.js");
exports.Notification = Notification_1.Notification;
var EmptyError_1 = __webpack_require__("./node_modules/rxjs/util/EmptyError.js");
exports.EmptyError = EmptyError_1.EmptyError;
var ArgumentOutOfRangeError_1 = __webpack_require__("./node_modules/rxjs/util/ArgumentOutOfRangeError.js");
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
var ObjectUnsubscribedError_1 = __webpack_require__("./node_modules/rxjs/util/ObjectUnsubscribedError.js");
exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
var TimeoutError_1 = __webpack_require__("./node_modules/rxjs/util/TimeoutError.js");
exports.TimeoutError = TimeoutError_1.TimeoutError;
var UnsubscriptionError_1 = __webpack_require__("./node_modules/rxjs/util/UnsubscriptionError.js");
exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
var timeInterval_1 = __webpack_require__("./node_modules/rxjs/operator/timeInterval.js");
exports.TimeInterval = timeInterval_1.TimeInterval;
var timestamp_1 = __webpack_require__("./node_modules/rxjs/operator/timestamp.js");
exports.Timestamp = timestamp_1.Timestamp;
var TestScheduler_1 = __webpack_require__("./node_modules/rxjs/testing/TestScheduler.js");
exports.TestScheduler = TestScheduler_1.TestScheduler;
var VirtualTimeScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/VirtualTimeScheduler.js");
exports.VirtualTimeScheduler = VirtualTimeScheduler_1.VirtualTimeScheduler;
var AjaxObservable_1 = __webpack_require__("./node_modules/rxjs/observable/dom/AjaxObservable.js");
exports.AjaxResponse = AjaxObservable_1.AjaxResponse;
exports.AjaxError = AjaxObservable_1.AjaxError;
exports.AjaxTimeoutError = AjaxObservable_1.AjaxTimeoutError;
var asap_1 = __webpack_require__("./node_modules/rxjs/scheduler/asap.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var queue_1 = __webpack_require__("./node_modules/rxjs/scheduler/queue.js");
var animationFrame_1 = __webpack_require__("./node_modules/rxjs/scheduler/animationFrame.js");
var rxSubscriber_1 = __webpack_require__("./node_modules/rxjs/symbol/rxSubscriber.js");
var iterator_1 = __webpack_require__("./node_modules/rxjs/symbol/iterator.js");
var observable_1 = __webpack_require__("./node_modules/rxjs/symbol/observable.js");
/* tslint:enable:no-unused-variable */
/**
 * @typedef {Object} Rx.Scheduler
 * @property {Scheduler} queue Schedules on a queue in the current event frame
 * (trampoline scheduler). Use this for iteration operations.
 * @property {Scheduler} asap Schedules on the micro task queue, which uses the
 * fastest transport mechanism available, either Node.js' `process.nextTick()`
 * or Web Worker MessageChannel or setTimeout or others. Use this for
 * asynchronous conversions.
 * @property {Scheduler} async Schedules work with `setInterval`. Use this for
 * time-based operations.
 * @property {Scheduler} animationFrame Schedules work with `requestAnimationFrame`.
 * Use this for synchronizing with the platform's painting
 */
var Scheduler = {
    asap: asap_1.asap,
    queue: queue_1.queue,
    animationFrame: animationFrame_1.animationFrame,
    async: async_1.async
};
exports.Scheduler = Scheduler;
/**
 * @typedef {Object} Rx.Symbol
 * @property {Symbol|string} rxSubscriber A symbol to use as a property name to
 * retrieve an "Rx safe" Observer from an object. "Rx safety" can be defined as
 * an object that has all of the traits of an Rx Subscriber, including the
 * ability to add and remove subscriptions to the subscription chain and
 * guarantees involving event triggering (can't "next" after unsubscription,
 * etc).
 * @property {Symbol|string} observable A symbol to use as a property name to
 * retrieve an Observable as defined by the [ECMAScript "Observable" spec](https://github.com/zenparsing/es-observable).
 * @property {Symbol|string} iterator The ES6 symbol to use as a property name
 * to retrieve an iterator from an object.
 */
var Symbol = {
    rxSubscriber: rxSubscriber_1.$$rxSubscriber,
    observable: observable_1.$$observable,
    iterator: iterator_1.$$iterator
};
exports.Symbol = Symbol;
//# sourceMappingURL=Rx.js.map

/***/ },

/***/ "./node_modules/rxjs/Scheduler.js":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/bindCallback.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var bindCallback_1 = __webpack_require__("./node_modules/rxjs/observable/bindCallback.js");
Observable_1.Observable.bindCallback = bindCallback_1.bindCallback;
//# sourceMappingURL=bindCallback.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/bindNodeCallback.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var bindNodeCallback_1 = __webpack_require__("./node_modules/rxjs/observable/bindNodeCallback.js");
Observable_1.Observable.bindNodeCallback = bindNodeCallback_1.bindNodeCallback;
//# sourceMappingURL=bindNodeCallback.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/combineLatest.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var combineLatest_1 = __webpack_require__("./node_modules/rxjs/observable/combineLatest.js");
Observable_1.Observable.combineLatest = combineLatest_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/concat.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var concat_1 = __webpack_require__("./node_modules/rxjs/observable/concat.js");
Observable_1.Observable.concat = concat_1.concat;
//# sourceMappingURL=concat.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/defer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var defer_1 = __webpack_require__("./node_modules/rxjs/observable/defer.js");
Observable_1.Observable.defer = defer_1.defer;
//# sourceMappingURL=defer.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/dom/ajax.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var ajax_1 = __webpack_require__("./node_modules/rxjs/observable/dom/ajax.js");
Observable_1.Observable.ajax = ajax_1.ajax;
//# sourceMappingURL=ajax.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/dom/webSocket.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var webSocket_1 = __webpack_require__("./node_modules/rxjs/observable/dom/webSocket.js");
Observable_1.Observable.webSocket = webSocket_1.webSocket;
//# sourceMappingURL=webSocket.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/empty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var empty_1 = __webpack_require__("./node_modules/rxjs/observable/empty.js");
Observable_1.Observable.empty = empty_1.empty;
//# sourceMappingURL=empty.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/forkJoin.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var forkJoin_1 = __webpack_require__("./node_modules/rxjs/observable/forkJoin.js");
Observable_1.Observable.forkJoin = forkJoin_1.forkJoin;
//# sourceMappingURL=forkJoin.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/from.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var from_1 = __webpack_require__("./node_modules/rxjs/observable/from.js");
Observable_1.Observable.from = from_1.from;
//# sourceMappingURL=from.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/fromEvent.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var fromEvent_1 = __webpack_require__("./node_modules/rxjs/observable/fromEvent.js");
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/fromEventPattern.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var fromEventPattern_1 = __webpack_require__("./node_modules/rxjs/observable/fromEventPattern.js");
Observable_1.Observable.fromEventPattern = fromEventPattern_1.fromEventPattern;
//# sourceMappingURL=fromEventPattern.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/fromPromise.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var fromPromise_1 = __webpack_require__("./node_modules/rxjs/observable/fromPromise.js");
Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
//# sourceMappingURL=fromPromise.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/generate.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var GenerateObservable_1 = __webpack_require__("./node_modules/rxjs/observable/GenerateObservable.js");
Observable_1.Observable.generate = GenerateObservable_1.GenerateObservable.create;
//# sourceMappingURL=generate.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/if.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var if_1 = __webpack_require__("./node_modules/rxjs/observable/if.js");
Observable_1.Observable.if = if_1._if;
//# sourceMappingURL=if.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/interval.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var interval_1 = __webpack_require__("./node_modules/rxjs/observable/interval.js");
Observable_1.Observable.interval = interval_1.interval;
//# sourceMappingURL=interval.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/merge.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var merge_1 = __webpack_require__("./node_modules/rxjs/observable/merge.js");
Observable_1.Observable.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/never.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var never_1 = __webpack_require__("./node_modules/rxjs/observable/never.js");
Observable_1.Observable.never = never_1.never;
//# sourceMappingURL=never.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/of.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var of_1 = __webpack_require__("./node_modules/rxjs/observable/of.js");
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/onErrorResumeNext.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var onErrorResumeNext_1 = __webpack_require__("./node_modules/rxjs/operator/onErrorResumeNext.js");
Observable_1.Observable.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNextStatic;
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/pairs.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var pairs_1 = __webpack_require__("./node_modules/rxjs/observable/pairs.js");
Observable_1.Observable.pairs = pairs_1.pairs;
//# sourceMappingURL=pairs.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/race.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var race_1 = __webpack_require__("./node_modules/rxjs/operator/race.js");
Observable_1.Observable.race = race_1.raceStatic;
//# sourceMappingURL=race.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/range.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var range_1 = __webpack_require__("./node_modules/rxjs/observable/range.js");
Observable_1.Observable.range = range_1.range;
//# sourceMappingURL=range.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/throw.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var throw_1 = __webpack_require__("./node_modules/rxjs/observable/throw.js");
Observable_1.Observable.throw = throw_1._throw;
//# sourceMappingURL=throw.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/timer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var timer_1 = __webpack_require__("./node_modules/rxjs/observable/timer.js");
Observable_1.Observable.timer = timer_1.timer;
//# sourceMappingURL=timer.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/using.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var using_1 = __webpack_require__("./node_modules/rxjs/observable/using.js");
Observable_1.Observable.using = using_1.using;
//# sourceMappingURL=using.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/zip.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var zip_1 = __webpack_require__("./node_modules/rxjs/observable/zip.js");
Observable_1.Observable.zip = zip_1.zip;
//# sourceMappingURL=zip.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/audit.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var audit_1 = __webpack_require__("./node_modules/rxjs/operator/audit.js");
Observable_1.Observable.prototype.audit = audit_1.audit;
//# sourceMappingURL=audit.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/auditTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var auditTime_1 = __webpack_require__("./node_modules/rxjs/operator/auditTime.js");
Observable_1.Observable.prototype.auditTime = auditTime_1.auditTime;
//# sourceMappingURL=auditTime.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/buffer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var buffer_1 = __webpack_require__("./node_modules/rxjs/operator/buffer.js");
Observable_1.Observable.prototype.buffer = buffer_1.buffer;
//# sourceMappingURL=buffer.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/bufferCount.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var bufferCount_1 = __webpack_require__("./node_modules/rxjs/operator/bufferCount.js");
Observable_1.Observable.prototype.bufferCount = bufferCount_1.bufferCount;
//# sourceMappingURL=bufferCount.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/bufferTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var bufferTime_1 = __webpack_require__("./node_modules/rxjs/operator/bufferTime.js");
Observable_1.Observable.prototype.bufferTime = bufferTime_1.bufferTime;
//# sourceMappingURL=bufferTime.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/bufferToggle.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var bufferToggle_1 = __webpack_require__("./node_modules/rxjs/operator/bufferToggle.js");
Observable_1.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;
//# sourceMappingURL=bufferToggle.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/bufferWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var bufferWhen_1 = __webpack_require__("./node_modules/rxjs/operator/bufferWhen.js");
Observable_1.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;
//# sourceMappingURL=bufferWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/catch.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var catch_1 = __webpack_require__("./node_modules/rxjs/operator/catch.js");
Observable_1.Observable.prototype.catch = catch_1._catch;
Observable_1.Observable.prototype._catch = catch_1._catch;
//# sourceMappingURL=catch.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/combineAll.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var combineAll_1 = __webpack_require__("./node_modules/rxjs/operator/combineAll.js");
Observable_1.Observable.prototype.combineAll = combineAll_1.combineAll;
//# sourceMappingURL=combineAll.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/combineLatest.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var combineLatest_1 = __webpack_require__("./node_modules/rxjs/operator/combineLatest.js");
Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/concat.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var concat_1 = __webpack_require__("./node_modules/rxjs/operator/concat.js");
Observable_1.Observable.prototype.concat = concat_1.concat;
//# sourceMappingURL=concat.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/concatAll.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var concatAll_1 = __webpack_require__("./node_modules/rxjs/operator/concatAll.js");
Observable_1.Observable.prototype.concatAll = concatAll_1.concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/concatMap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var concatMap_1 = __webpack_require__("./node_modules/rxjs/operator/concatMap.js");
Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/concatMapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var concatMapTo_1 = __webpack_require__("./node_modules/rxjs/operator/concatMapTo.js");
Observable_1.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;
//# sourceMappingURL=concatMapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/count.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var count_1 = __webpack_require__("./node_modules/rxjs/operator/count.js");
Observable_1.Observable.prototype.count = count_1.count;
//# sourceMappingURL=count.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/debounce.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var debounce_1 = __webpack_require__("./node_modules/rxjs/operator/debounce.js");
Observable_1.Observable.prototype.debounce = debounce_1.debounce;
//# sourceMappingURL=debounce.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/debounceTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var debounceTime_1 = __webpack_require__("./node_modules/rxjs/operator/debounceTime.js");
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/defaultIfEmpty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var defaultIfEmpty_1 = __webpack_require__("./node_modules/rxjs/operator/defaultIfEmpty.js");
Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/delay.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var delay_1 = __webpack_require__("./node_modules/rxjs/operator/delay.js");
Observable_1.Observable.prototype.delay = delay_1.delay;
//# sourceMappingURL=delay.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/delayWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var delayWhen_1 = __webpack_require__("./node_modules/rxjs/operator/delayWhen.js");
Observable_1.Observable.prototype.delayWhen = delayWhen_1.delayWhen;
//# sourceMappingURL=delayWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/dematerialize.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var dematerialize_1 = __webpack_require__("./node_modules/rxjs/operator/dematerialize.js");
Observable_1.Observable.prototype.dematerialize = dematerialize_1.dematerialize;
//# sourceMappingURL=dematerialize.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/distinct.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var distinct_1 = __webpack_require__("./node_modules/rxjs/operator/distinct.js");
Observable_1.Observable.prototype.distinct = distinct_1.distinct;
//# sourceMappingURL=distinct.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/distinctUntilChanged.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var distinctUntilChanged_1 = __webpack_require__("./node_modules/rxjs/operator/distinctUntilChanged.js");
Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/distinctUntilKeyChanged.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var distinctUntilKeyChanged_1 = __webpack_require__("./node_modules/rxjs/operator/distinctUntilKeyChanged.js");
Observable_1.Observable.prototype.distinctUntilKeyChanged = distinctUntilKeyChanged_1.distinctUntilKeyChanged;
//# sourceMappingURL=distinctUntilKeyChanged.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/do.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var do_1 = __webpack_require__("./node_modules/rxjs/operator/do.js");
Observable_1.Observable.prototype.do = do_1._do;
Observable_1.Observable.prototype._do = do_1._do;
//# sourceMappingURL=do.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/elementAt.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var elementAt_1 = __webpack_require__("./node_modules/rxjs/operator/elementAt.js");
Observable_1.Observable.prototype.elementAt = elementAt_1.elementAt;
//# sourceMappingURL=elementAt.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/every.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var every_1 = __webpack_require__("./node_modules/rxjs/operator/every.js");
Observable_1.Observable.prototype.every = every_1.every;
//# sourceMappingURL=every.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/exhaust.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var exhaust_1 = __webpack_require__("./node_modules/rxjs/operator/exhaust.js");
Observable_1.Observable.prototype.exhaust = exhaust_1.exhaust;
//# sourceMappingURL=exhaust.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/exhaustMap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var exhaustMap_1 = __webpack_require__("./node_modules/rxjs/operator/exhaustMap.js");
Observable_1.Observable.prototype.exhaustMap = exhaustMap_1.exhaustMap;
//# sourceMappingURL=exhaustMap.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/expand.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var expand_1 = __webpack_require__("./node_modules/rxjs/operator/expand.js");
Observable_1.Observable.prototype.expand = expand_1.expand;
//# sourceMappingURL=expand.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/filter.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var filter_1 = __webpack_require__("./node_modules/rxjs/operator/filter.js");
Observable_1.Observable.prototype.filter = filter_1.filter;
//# sourceMappingURL=filter.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/finally.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var finally_1 = __webpack_require__("./node_modules/rxjs/operator/finally.js");
Observable_1.Observable.prototype.finally = finally_1._finally;
Observable_1.Observable.prototype._finally = finally_1._finally;
//# sourceMappingURL=finally.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/find.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var find_1 = __webpack_require__("./node_modules/rxjs/operator/find.js");
Observable_1.Observable.prototype.find = find_1.find;
//# sourceMappingURL=find.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/findIndex.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var findIndex_1 = __webpack_require__("./node_modules/rxjs/operator/findIndex.js");
Observable_1.Observable.prototype.findIndex = findIndex_1.findIndex;
//# sourceMappingURL=findIndex.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/first.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var first_1 = __webpack_require__("./node_modules/rxjs/operator/first.js");
Observable_1.Observable.prototype.first = first_1.first;
//# sourceMappingURL=first.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/groupBy.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var groupBy_1 = __webpack_require__("./node_modules/rxjs/operator/groupBy.js");
Observable_1.Observable.prototype.groupBy = groupBy_1.groupBy;
//# sourceMappingURL=groupBy.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/ignoreElements.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var ignoreElements_1 = __webpack_require__("./node_modules/rxjs/operator/ignoreElements.js");
Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
//# sourceMappingURL=ignoreElements.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/isEmpty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var isEmpty_1 = __webpack_require__("./node_modules/rxjs/operator/isEmpty.js");
Observable_1.Observable.prototype.isEmpty = isEmpty_1.isEmpty;
//# sourceMappingURL=isEmpty.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/last.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var last_1 = __webpack_require__("./node_modules/rxjs/operator/last.js");
Observable_1.Observable.prototype.last = last_1.last;
//# sourceMappingURL=last.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/let.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var let_1 = __webpack_require__("./node_modules/rxjs/operator/let.js");
Observable_1.Observable.prototype.let = let_1.letProto;
Observable_1.Observable.prototype.letBind = let_1.letProto;
//# sourceMappingURL=let.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/mapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var mapTo_1 = __webpack_require__("./node_modules/rxjs/operator/mapTo.js");
Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
//# sourceMappingURL=mapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/materialize.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var materialize_1 = __webpack_require__("./node_modules/rxjs/operator/materialize.js");
Observable_1.Observable.prototype.materialize = materialize_1.materialize;
//# sourceMappingURL=materialize.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/max.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var max_1 = __webpack_require__("./node_modules/rxjs/operator/max.js");
Observable_1.Observable.prototype.max = max_1.max;
//# sourceMappingURL=max.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/merge.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var merge_1 = __webpack_require__("./node_modules/rxjs/operator/merge.js");
Observable_1.Observable.prototype.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/mergeAll.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var mergeAll_1 = __webpack_require__("./node_modules/rxjs/operator/mergeAll.js");
Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
//# sourceMappingURL=mergeAll.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/mergeMapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var mergeMapTo_1 = __webpack_require__("./node_modules/rxjs/operator/mergeMapTo.js");
Observable_1.Observable.prototype.flatMapTo = mergeMapTo_1.mergeMapTo;
Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
//# sourceMappingURL=mergeMapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/mergeScan.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var mergeScan_1 = __webpack_require__("./node_modules/rxjs/operator/mergeScan.js");
Observable_1.Observable.prototype.mergeScan = mergeScan_1.mergeScan;
//# sourceMappingURL=mergeScan.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/min.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var min_1 = __webpack_require__("./node_modules/rxjs/operator/min.js");
Observable_1.Observable.prototype.min = min_1.min;
//# sourceMappingURL=min.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/multicast.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var multicast_1 = __webpack_require__("./node_modules/rxjs/operator/multicast.js");
Observable_1.Observable.prototype.multicast = multicast_1.multicast;
//# sourceMappingURL=multicast.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/observeOn.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var observeOn_1 = __webpack_require__("./node_modules/rxjs/operator/observeOn.js");
Observable_1.Observable.prototype.observeOn = observeOn_1.observeOn;
//# sourceMappingURL=observeOn.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/onErrorResumeNext.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var onErrorResumeNext_1 = __webpack_require__("./node_modules/rxjs/operator/onErrorResumeNext.js");
Observable_1.Observable.prototype.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/pairwise.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var pairwise_1 = __webpack_require__("./node_modules/rxjs/operator/pairwise.js");
Observable_1.Observable.prototype.pairwise = pairwise_1.pairwise;
//# sourceMappingURL=pairwise.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/partition.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var partition_1 = __webpack_require__("./node_modules/rxjs/operator/partition.js");
Observable_1.Observable.prototype.partition = partition_1.partition;
//# sourceMappingURL=partition.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/pluck.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var pluck_1 = __webpack_require__("./node_modules/rxjs/operator/pluck.js");
Observable_1.Observable.prototype.pluck = pluck_1.pluck;
//# sourceMappingURL=pluck.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/publish.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var publish_1 = __webpack_require__("./node_modules/rxjs/operator/publish.js");
Observable_1.Observable.prototype.publish = publish_1.publish;
//# sourceMappingURL=publish.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/publishBehavior.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var publishBehavior_1 = __webpack_require__("./node_modules/rxjs/operator/publishBehavior.js");
Observable_1.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;
//# sourceMappingURL=publishBehavior.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/publishLast.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var publishLast_1 = __webpack_require__("./node_modules/rxjs/operator/publishLast.js");
Observable_1.Observable.prototype.publishLast = publishLast_1.publishLast;
//# sourceMappingURL=publishLast.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/publishReplay.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var publishReplay_1 = __webpack_require__("./node_modules/rxjs/operator/publishReplay.js");
Observable_1.Observable.prototype.publishReplay = publishReplay_1.publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/race.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var race_1 = __webpack_require__("./node_modules/rxjs/operator/race.js");
Observable_1.Observable.prototype.race = race_1.race;
//# sourceMappingURL=race.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/reduce.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var reduce_1 = __webpack_require__("./node_modules/rxjs/operator/reduce.js");
Observable_1.Observable.prototype.reduce = reduce_1.reduce;
//# sourceMappingURL=reduce.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/repeat.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var repeat_1 = __webpack_require__("./node_modules/rxjs/operator/repeat.js");
Observable_1.Observable.prototype.repeat = repeat_1.repeat;
//# sourceMappingURL=repeat.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/repeatWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var repeatWhen_1 = __webpack_require__("./node_modules/rxjs/operator/repeatWhen.js");
Observable_1.Observable.prototype.repeatWhen = repeatWhen_1.repeatWhen;
//# sourceMappingURL=repeatWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/retry.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var retry_1 = __webpack_require__("./node_modules/rxjs/operator/retry.js");
Observable_1.Observable.prototype.retry = retry_1.retry;
//# sourceMappingURL=retry.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/retryWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var retryWhen_1 = __webpack_require__("./node_modules/rxjs/operator/retryWhen.js");
Observable_1.Observable.prototype.retryWhen = retryWhen_1.retryWhen;
//# sourceMappingURL=retryWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/sample.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var sample_1 = __webpack_require__("./node_modules/rxjs/operator/sample.js");
Observable_1.Observable.prototype.sample = sample_1.sample;
//# sourceMappingURL=sample.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/sampleTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var sampleTime_1 = __webpack_require__("./node_modules/rxjs/operator/sampleTime.js");
Observable_1.Observable.prototype.sampleTime = sampleTime_1.sampleTime;
//# sourceMappingURL=sampleTime.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/scan.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var scan_1 = __webpack_require__("./node_modules/rxjs/operator/scan.js");
Observable_1.Observable.prototype.scan = scan_1.scan;
//# sourceMappingURL=scan.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/sequenceEqual.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var sequenceEqual_1 = __webpack_require__("./node_modules/rxjs/operator/sequenceEqual.js");
Observable_1.Observable.prototype.sequenceEqual = sequenceEqual_1.sequenceEqual;
//# sourceMappingURL=sequenceEqual.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/share.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var share_1 = __webpack_require__("./node_modules/rxjs/operator/share.js");
Observable_1.Observable.prototype.share = share_1.share;
//# sourceMappingURL=share.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/single.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var single_1 = __webpack_require__("./node_modules/rxjs/operator/single.js");
Observable_1.Observable.prototype.single = single_1.single;
//# sourceMappingURL=single.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/skip.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var skip_1 = __webpack_require__("./node_modules/rxjs/operator/skip.js");
Observable_1.Observable.prototype.skip = skip_1.skip;
//# sourceMappingURL=skip.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/skipUntil.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var skipUntil_1 = __webpack_require__("./node_modules/rxjs/operator/skipUntil.js");
Observable_1.Observable.prototype.skipUntil = skipUntil_1.skipUntil;
//# sourceMappingURL=skipUntil.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/skipWhile.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var skipWhile_1 = __webpack_require__("./node_modules/rxjs/operator/skipWhile.js");
Observable_1.Observable.prototype.skipWhile = skipWhile_1.skipWhile;
//# sourceMappingURL=skipWhile.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/startWith.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var startWith_1 = __webpack_require__("./node_modules/rxjs/operator/startWith.js");
Observable_1.Observable.prototype.startWith = startWith_1.startWith;
//# sourceMappingURL=startWith.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/subscribeOn.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var subscribeOn_1 = __webpack_require__("./node_modules/rxjs/operator/subscribeOn.js");
Observable_1.Observable.prototype.subscribeOn = subscribeOn_1.subscribeOn;
//# sourceMappingURL=subscribeOn.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/switch.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var switch_1 = __webpack_require__("./node_modules/rxjs/operator/switch.js");
Observable_1.Observable.prototype.switch = switch_1._switch;
Observable_1.Observable.prototype._switch = switch_1._switch;
//# sourceMappingURL=switch.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/switchMap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var switchMap_1 = __webpack_require__("./node_modules/rxjs/operator/switchMap.js");
Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/switchMapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var switchMapTo_1 = __webpack_require__("./node_modules/rxjs/operator/switchMapTo.js");
Observable_1.Observable.prototype.switchMapTo = switchMapTo_1.switchMapTo;
//# sourceMappingURL=switchMapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/take.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var take_1 = __webpack_require__("./node_modules/rxjs/operator/take.js");
Observable_1.Observable.prototype.take = take_1.take;
//# sourceMappingURL=take.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/takeLast.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var takeLast_1 = __webpack_require__("./node_modules/rxjs/operator/takeLast.js");
Observable_1.Observable.prototype.takeLast = takeLast_1.takeLast;
//# sourceMappingURL=takeLast.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/takeUntil.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var takeUntil_1 = __webpack_require__("./node_modules/rxjs/operator/takeUntil.js");
Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/takeWhile.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var takeWhile_1 = __webpack_require__("./node_modules/rxjs/operator/takeWhile.js");
Observable_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
//# sourceMappingURL=takeWhile.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/throttle.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var throttle_1 = __webpack_require__("./node_modules/rxjs/operator/throttle.js");
Observable_1.Observable.prototype.throttle = throttle_1.throttle;
//# sourceMappingURL=throttle.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/throttleTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var throttleTime_1 = __webpack_require__("./node_modules/rxjs/operator/throttleTime.js");
Observable_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
//# sourceMappingURL=throttleTime.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/timeInterval.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var timeInterval_1 = __webpack_require__("./node_modules/rxjs/operator/timeInterval.js");
Observable_1.Observable.prototype.timeInterval = timeInterval_1.timeInterval;
//# sourceMappingURL=timeInterval.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/timeout.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var timeout_1 = __webpack_require__("./node_modules/rxjs/operator/timeout.js");
Observable_1.Observable.prototype.timeout = timeout_1.timeout;
//# sourceMappingURL=timeout.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/timeoutWith.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var timeoutWith_1 = __webpack_require__("./node_modules/rxjs/operator/timeoutWith.js");
Observable_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
//# sourceMappingURL=timeoutWith.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/timestamp.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var timestamp_1 = __webpack_require__("./node_modules/rxjs/operator/timestamp.js");
Observable_1.Observable.prototype.timestamp = timestamp_1.timestamp;
//# sourceMappingURL=timestamp.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/toArray.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var toArray_1 = __webpack_require__("./node_modules/rxjs/operator/toArray.js");
Observable_1.Observable.prototype.toArray = toArray_1.toArray;
//# sourceMappingURL=toArray.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/toPromise.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var toPromise_1 = __webpack_require__("./node_modules/rxjs/operator/toPromise.js");
Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/window.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var window_1 = __webpack_require__("./node_modules/rxjs/operator/window.js");
Observable_1.Observable.prototype.window = window_1.window;
//# sourceMappingURL=window.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/windowCount.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var windowCount_1 = __webpack_require__("./node_modules/rxjs/operator/windowCount.js");
Observable_1.Observable.prototype.windowCount = windowCount_1.windowCount;
//# sourceMappingURL=windowCount.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/windowTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var windowTime_1 = __webpack_require__("./node_modules/rxjs/operator/windowTime.js");
Observable_1.Observable.prototype.windowTime = windowTime_1.windowTime;
//# sourceMappingURL=windowTime.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/windowToggle.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var windowToggle_1 = __webpack_require__("./node_modules/rxjs/operator/windowToggle.js");
Observable_1.Observable.prototype.windowToggle = windowToggle_1.windowToggle;
//# sourceMappingURL=windowToggle.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/windowWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var windowWhen_1 = __webpack_require__("./node_modules/rxjs/operator/windowWhen.js");
Observable_1.Observable.prototype.windowWhen = windowWhen_1.windowWhen;
//# sourceMappingURL=windowWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/withLatestFrom.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var withLatestFrom_1 = __webpack_require__("./node_modules/rxjs/operator/withLatestFrom.js");
Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/zip.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var zip_1 = __webpack_require__("./node_modules/rxjs/operator/zip.js");
Observable_1.Observable.prototype.zip = zip_1.zipProto;
//# sourceMappingURL=zip.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/zipAll.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var zipAll_1 = __webpack_require__("./node_modules/rxjs/operator/zipAll.js");
Observable_1.Observable.prototype.zipAll = zipAll_1.zipAll;
//# sourceMappingURL=zipAll.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/BoundCallbackObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var AsyncSubject_1 = __webpack_require__("./node_modules/rxjs/AsyncSubject.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var BoundCallbackObservable = (function (_super) {
    __extends(BoundCallbackObservable, _super);
    function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
    }
    /* tslint:enable:max-line-length */
    /**
     * Converts a callback API to a function that returns an Observable.
     *
     * <span class="informal">Give it a function `f` of type `f(x, callback)` and
     * it will return a function `g` that when called as `g(x)` will output an
     * Observable.</span>
     *
     * `bindCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done. The output of `bindCallback` is a function that takes the same
     * parameters as `func`, except the last one (the callback). When the output
     * function is called with arguments, it will return an Observable where the
     * results will be delivered to.
     *
     * @example <caption>Convert jQuery's getJSON to an Observable API</caption>
     * // Suppose we have jQuery.getJSON('/my/url', callback)
     * var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
     * var result = getJSONAsObservable('/my/url');
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindNodeCallback}
     * @see {@link from}
     * @see {@link fromPromise}
     *
     * @param {function} func Function with a callback as the last parameter.
     * @param {function} [selector] A function which takes the arguments from the
     * callback and maps those a value to emit on the output Observable.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * callbacks.
     * @return {function(...params: *): Observable} A function which returns the
     * Observable that delivers the same values the callback would deliver.
     * @static true
     * @name bindCallback
     * @owner Observable
     */
    BoundCallbackObservable.create = function (func, selector, scheduler) {
        if (selector === void 0) { selector = undefined; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return new BoundCallbackObservable(func, selector, args, scheduler);
        };
    };
    BoundCallbackObservable.prototype._subscribe = function (subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
            if (!subject) {
                subject = this.subject = new AsyncSubject_1.AsyncSubject();
                var handler = function handlerFn() {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i - 0] = arguments[_i];
                    }
                    var source = handlerFn.source;
                    var selector = source.selector, subject = source.subject;
                    if (selector) {
                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                        if (result_1 === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subject.next(result_1);
                            subject.complete();
                        }
                    }
                    else {
                        subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    }
                };
                // use named function instance to avoid closure.
                handler.source = this;
                var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                if (result === errorObject_1.errorObject) {
                    subject.error(errorObject_1.errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(BoundCallbackObservable.dispatch, 0, { source: this, subscriber: subscriber });
        }
    };
    BoundCallbackObservable.dispatch = function (state) {
        var self = this;
        var source = state.source, subscriber = state.subscriber;
        var callbackFunc = source.callbackFunc, args = source.args, scheduler = source.scheduler;
        var subject = source.subject;
        if (!subject) {
            subject = source.subject = new AsyncSubject_1.AsyncSubject();
            var handler = function handlerFn() {
                var innerArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    innerArgs[_i - 0] = arguments[_i];
                }
                var source = handlerFn.source;
                var selector = source.selector, subject = source.subject;
                if (selector) {
                    var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                    if (result_2 === errorObject_1.errorObject) {
                        self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                    }
                    else {
                        self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                    }
                }
                else {
                    var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                    self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
                }
            };
            // use named function to pass values in without closure
            handler.source = source;
            var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
            if (result === errorObject_1.errorObject) {
                subject.error(errorObject_1.errorObject.e);
            }
        }
        self.add(subject.subscribe(subscriber));
    };
    return BoundCallbackObservable;
}(Observable_1.Observable));
exports.BoundCallbackObservable = BoundCallbackObservable;
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=BoundCallbackObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/BoundNodeCallbackObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var AsyncSubject_1 = __webpack_require__("./node_modules/rxjs/AsyncSubject.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var BoundNodeCallbackObservable = (function (_super) {
    __extends(BoundNodeCallbackObservable, _super);
    function BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
    }
    /* tslint:enable:max-line-length */
    /**
     * Converts a Node.js-style callback API to a function that returns an
     * Observable.
     *
     * <span class="informal">It's just like {@link bindCallback}, but the
     * callback is expected to be of type `callback(error, result)`.</span>
     *
     * `bindNodeCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done. The callback function is expected to follow Node.js conventions,
     * where the first argument to the callback is an error, while remaining
     * arguments are the callback result. The output of `bindNodeCallback` is a
     * function that takes the same parameters as `func`, except the last one (the
     * callback). When the output function is called with arguments, it will
     * return an Observable where the results will be delivered to.
     *
     * @example <caption>Read a file from the filesystem and get the data as an Observable</caption>
     * import * as fs from 'fs';
     * var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
     * var result = readFileAsObservable('./roadNames.txt', 'utf8');
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     * @see {@link fromPromise}
     *
     * @param {function} func Function with a callback as the last parameter.
     * @param {function} [selector] A function which takes the arguments from the
     * callback and maps those a value to emit on the output Observable.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * callbacks.
     * @return {function(...params: *): Observable} A function which returns the
     * Observable that delivers the same values the Node.js callback would
     * deliver.
     * @static true
     * @name bindNodeCallback
     * @owner Observable
     */
    BoundNodeCallbackObservable.create = function (func, selector, scheduler) {
        if (selector === void 0) { selector = undefined; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return new BoundNodeCallbackObservable(func, selector, args, scheduler);
        };
    };
    BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
            if (!subject) {
                subject = this.subject = new AsyncSubject_1.AsyncSubject();
                var handler = function handlerFn() {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i - 0] = arguments[_i];
                    }
                    var source = handlerFn.source;
                    var selector = source.selector, subject = source.subject;
                    var err = innerArgs.shift();
                    if (err) {
                        subject.error(err);
                    }
                    else if (selector) {
                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                        if (result_1 === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subject.next(result_1);
                            subject.complete();
                        }
                    }
                    else {
                        subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    }
                };
                // use named function instance to avoid closure.
                handler.source = this;
                var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                if (result === errorObject_1.errorObject) {
                    subject.error(errorObject_1.errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
        }
    };
    return BoundNodeCallbackObservable;
}(Observable_1.Observable));
exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
function dispatch(state) {
    var self = this;
    var source = state.source, subscriber = state.subscriber;
    // XXX: cast to `any` to access to the private field in `source`.
    var _a = source, callbackFunc = _a.callbackFunc, args = _a.args, scheduler = _a.scheduler;
    var subject = source.subject;
    if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function handlerFn() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i - 0] = arguments[_i];
            }
            var source = handlerFn.source;
            var selector = source.selector, subject = source.subject;
            var err = innerArgs.shift();
            if (err) {
                subject.error(err);
            }
            else if (selector) {
                var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                if (result_2 === errorObject_1.errorObject) {
                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                }
                else {
                    self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                }
            }
            else {
                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
            }
        };
        // use named function to pass values in without closure
        handler.source = source;
        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject_1.errorObject) {
            subject.error(errorObject_1.errorObject.e);
        }
    }
    self.add(subject.subscribe(subscriber));
}
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=BoundNodeCallbackObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/ConnectableObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return this.lift(new RefCountOperator(this));
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subscribe: { value: ConnectableObservable.prototype._subscribe },
    getSubject: { value: ConnectableObservable.prototype.getSubject },
    connect: { value: ConnectableObservable.prototype.connect },
    refCount: { value: ConnectableObservable.prototype.refCount }
};
var ConnectableSubscriber = (function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject_1.SubjectSubscriber));
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source._subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ConnectableObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/DeferObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var DeferObservable = (function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * @see {@link create}
     *
     * @param {function(): Observable|Promise} observableFactory The Observable
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * @return {Observable} An Observable whose Observers' subscriptions trigger
     * an invocation of the given Observable factory function.
     * @static true
     * @name defer
     * @owner Observable
     */
    DeferObservable.create = function (observableFactory) {
        return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
}(Observable_1.Observable));
exports.DeferObservable = DeferObservable;
var DeferSubscriber = (function (_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
        _super.call(this, destination);
        this.factory = factory;
        this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function () {
        try {
            this._callFactory();
        }
        catch (err) {
            this._error(err);
        }
    };
    DeferSubscriber.prototype._callFactory = function () {
        var result = this.factory();
        if (result) {
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return DeferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=DeferObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/ErrorObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ErrorObservable = (function (_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
        _super.call(this);
        this.error = error;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits an error notification.
     *
     * <span class="informal">Just emits 'error', and nothing else.
     * </span>
     *
     * <img src="./img/throw.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the error notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then emit an error.</caption>
     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @example <caption>Map and flattens numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x === 13 ?
     *     Rx.Observable.throw('Thirteens are bad') :
     *     Rx.Observable.of('a', 'b', 'c')
     * );
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link of}
     *
     * @param {any} error The particular Error to pass to the error notification.
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emission of the error notification.
     * @return {Observable} An error Observable: emits only the error notification
     * using the given error argument.
     * @static true
     * @name throw
     * @owner Observable
     */
    ErrorObservable.create = function (error, scheduler) {
        return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function (arg) {
        var error = arg.error, subscriber = arg.subscriber;
        subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function (subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ErrorObservable.dispatch, 0, {
                error: error, subscriber: subscriber
            });
        }
        else {
            subscriber.error(error);
        }
    };
    return ErrorObservable;
}(Observable_1.Observable));
exports.ErrorObservable = ErrorObservable;
//# sourceMappingURL=ErrorObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/ForkJoinObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ForkJoinObservable = (function (_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    /* tslint:enable:max-line-length */
    /**
     * @param sources
     * @return {any}
     * @static true
     * @name forkJoin
     * @owner Observable
     */
    ForkJoinObservable.create = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = sources.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
            sources = sources[0];
        }
        if (sources.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function (subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    };
    return ForkJoinObservable;
}(Observable_1.Observable));
exports.ForkJoinObservable = ForkJoinObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ForkJoinSubscriber = (function (_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources, resultSelector) {
        _super.call(this, destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        var len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                this.add(innerSubscription);
            }
        }
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            var value = resultSelector ? resultSelector.apply(this, values) : values;
            destination.next(value);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=ForkJoinObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/FromEventObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/FromEventPatternObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventPatternObservable = (function (_super) {
    __extends(FromEventPatternObservable, _super);
    function FromEventPatternObservable(addHandler, removeHandler, selector) {
        _super.call(this);
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.selector = selector;
    }
    /**
     * Creates an Observable from an API based on addHandler/removeHandler
     * functions.
     *
     * <span class="informal">Converts any addHandler/removeHandler API to an
     * Observable.</span>
     *
     * <img src="./img/fromEventPattern.png" width="100%">
     *
     * Creates an Observable by using the `addHandler` and `removeHandler`
     * functions to add and remove the handlers, with an optional selector
     * function to project the event arguments to a result. The `addHandler` is
     * called when the output Observable is subscribed, and `removeHandler` is
     * called when the Subscription is unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * function addClickHandler(handler) {
     *   document.addEventListener('click', handler);
     * }
     *
     * function removeClickHandler(handler) {
     *   document.removeEventListener('click', handler);
     * }
     *
     * var clicks = Rx.Observable.fromEventPattern(
     *   addClickHandler,
     *   removeClickHandler
     * );
     * clicks.subscribe(x => console.log(x));
     *
     * @see {@link from}
     * @see {@link fromEvent}
     *
     * @param {function(handler: Function): any} addHandler A function that takes
     * a `handler` function as argument and attaches it somehow to the actual
     * source of events.
     * @param {function(handler: Function): void} removeHandler A function that
     * takes a `handler` function as argument and removes it in case it was
     * previously attached using `addHandler`.
     * @param {function(...args: any): T} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEventPattern
     * @owner Observable
     */
    FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
    };
    FromEventPatternObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var removeHandler = this.removeHandler;
        var handler = !!this.selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _this._callSelector(subscriber, args);
        } : function (e) { subscriber.next(e); };
        this._callAddHandler(handler, subscriber);
        subscriber.add(new Subscription_1.Subscription(function () {
            //TODO: determine whether or not to forward to error handler
            removeHandler(handler);
        }));
    };
    FromEventPatternObservable.prototype._callSelector = function (subscriber, args) {
        try {
            var result = this.selector.apply(this, args);
            subscriber.next(result);
        }
        catch (e) {
            subscriber.error(e);
        }
    };
    FromEventPatternObservable.prototype._callAddHandler = function (handler, errorSubscriber) {
        try {
            this.addHandler(handler);
        }
        catch (e) {
            errorSubscriber.error(e);
        }
    };
    return FromEventPatternObservable;
}(Observable_1.Observable));
exports.FromEventPatternObservable = FromEventPatternObservable;
//# sourceMappingURL=FromEventPatternObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/GenerateObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var isScheduler_1 = __webpack_require__("./node_modules/rxjs/util/isScheduler.js");
var selfSelector = function (value) { return value; };
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var GenerateObservable = (function (_super) {
    __extends(GenerateObservable, _super);
    function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
        _super.call(this);
        this.initialState = initialState;
        this.condition = condition;
        this.iterate = iterate;
        this.resultSelector = resultSelector;
        this.scheduler = scheduler;
    }
    GenerateObservable.create = function (initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
        if (arguments.length == 1) {
            return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
        }
        if (resultSelectorOrObservable === undefined || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
            return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
        }
        return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
    };
    GenerateObservable.prototype._subscribe = function (subscriber) {
        var state = this.initialState;
        if (this.scheduler) {
            return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
                subscriber: subscriber,
                iterate: this.iterate,
                condition: this.condition,
                resultSelector: this.resultSelector,
                state: state });
        }
        var _a = this, condition = _a.condition, resultSelector = _a.resultSelector, iterate = _a.iterate;
        do {
            if (condition) {
                var conditionResult = void 0;
                try {
                    conditionResult = condition(state);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (!conditionResult) {
                    subscriber.complete();
                    break;
                }
            }
            var value = void 0;
            try {
                value = resultSelector(state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                break;
            }
            try {
                state = iterate(state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
        } while (true);
    };
    GenerateObservable.dispatch = function (state) {
        var subscriber = state.subscriber, condition = state.condition;
        if (subscriber.closed) {
            return;
        }
        if (state.needIterate) {
            try {
                state.state = state.iterate(state.state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
        }
        else {
            state.needIterate = true;
        }
        if (condition) {
            var conditionResult = void 0;
            try {
                conditionResult = condition(state.state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
            if (!conditionResult) {
                subscriber.complete();
                return;
            }
            if (subscriber.closed) {
                return;
            }
        }
        var value;
        try {
            value = state.resultSelector(state.state);
        }
        catch (err) {
            subscriber.error(err);
            return;
        }
        if (subscriber.closed) {
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        return this.schedule(state);
    };
    return GenerateObservable;
}(Observable_1.Observable));
exports.GenerateObservable = GenerateObservable;
//# sourceMappingURL=GenerateObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/IfObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IfObservable = (function (_super) {
    __extends(IfObservable, _super);
    function IfObservable(condition, thenSource, elseSource) {
        _super.call(this);
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
    }
    IfObservable.create = function (condition, thenSource, elseSource) {
        return new IfObservable(condition, thenSource, elseSource);
    };
    IfObservable.prototype._subscribe = function (subscriber) {
        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
        return new IfSubscriber(subscriber, condition, thenSource, elseSource);
    };
    return IfObservable;
}(Observable_1.Observable));
exports.IfObservable = IfObservable;
var IfSubscriber = (function (_super) {
    __extends(IfSubscriber, _super);
    function IfSubscriber(destination, condition, thenSource, elseSource) {
        _super.call(this, destination);
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
        this.tryIf();
    }
    IfSubscriber.prototype.tryIf = function () {
        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
        var result;
        try {
            result = condition();
            var source = result ? thenSource : elseSource;
            if (source) {
                this.add(subscribeToResult_1.subscribeToResult(this, source));
            }
            else {
                this._complete();
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    return IfSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=IfObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/IntervalObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__("./node_modules/rxjs/util/isNumeric.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IntervalObservable = (function (_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = async_1.async;
        }
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified Scheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` Scheduler to provide a notion of time, but you may pass any
     * Scheduler to it.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link delay}
     *
     * @param {number} [period=0] The interval size in milliseconds (by default)
     * or the time unit determined by the scheduler's clock.
     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a sequential number each time
     * interval.
     * @static true
     * @name interval
     * @owner Observable
     */
    IntervalObservable.create = function (period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
        var index = state.index, subscriber = state.subscriber, period = state.period;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };
    return IntervalObservable;
}(Observable_1.Observable));
exports.IntervalObservable = IntervalObservable;
//# sourceMappingURL=IntervalObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/NeverObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var noop_1 = __webpack_require__("./node_modules/rxjs/util/noop.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var NeverObservable = (function (_super) {
    __extends(NeverObservable, _super);
    function NeverObservable() {
        _super.call(this);
    }
    /**
     * Creates an Observable that emits no items to the Observer.
     *
     * <span class="informal">An Observable that never emits anything.</span>
     *
     * <img src="./img/never.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that emits
     * neither values nor errors nor the completion notification. It can be used
     * for testing purposes or for composing with other Observables. Please not
     * that by never emitting a complete notification, this Observable keeps the
     * subscription from being disposed automatically. Subscriptions need to be
     * manually disposed.
     *
     * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
     * function info() {
     *   console.log('Will not be called');
     * }
     * var result = Rx.Observable.never().startWith(7);
     * result.subscribe(x => console.log(x), info, info);
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link of}
     * @see {@link throw}
     *
     * @return {Observable} A "never" Observable: never emits anything.
     * @static true
     * @name never
     * @owner Observable
     */
    NeverObservable.create = function () {
        return new NeverObservable();
    };
    NeverObservable.prototype._subscribe = function (subscriber) {
        noop_1.noop();
    };
    return NeverObservable;
}(Observable_1.Observable));
exports.NeverObservable = NeverObservable;
//# sourceMappingURL=NeverObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/PairsObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
function dispatch(state) {
    var obj = state.obj, keys = state.keys, length = state.length, index = state.index, subscriber = state.subscriber;
    if (index === length) {
        subscriber.complete();
        return;
    }
    var key = keys[index];
    subscriber.next([key, obj[key]]);
    state.index = index + 1;
    this.schedule(state);
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PairsObservable = (function (_super) {
    __extends(PairsObservable, _super);
    function PairsObservable(obj, scheduler) {
        _super.call(this);
        this.obj = obj;
        this.scheduler = scheduler;
        this.keys = Object.keys(obj);
    }
    /**
     * Convert an object into an observable sequence of [key, value] pairs
     * using an optional Scheduler to enumerate the object.
     *
     * @example <caption>Converts a javascript object to an Observable</caption>
     * var obj = {
     *   foo: 42,
     *   bar: 56,
     *   baz: 78
     * };
     *
     * var source = Rx.Observable.pairs(obj);
     *
     * var subscription = source.subscribe(
     *   function (x) {
     *     console.log('Next: %s', x);
     *   },
     *   function (err) {
     *     console.log('Error: %s', err);
     *   },
     *   function () {
     *     console.log('Completed');
     *   });
     *
     * @param {Object} obj The object to inspect and turn into an
     * Observable sequence.
     * @param {Scheduler} [scheduler] An optional Scheduler to run the
     * enumeration of the input sequence on.
     * @returns {(Observable<Array<string | T>>)} An observable sequence of
     * [key, value] pairs from the object.
     */
    PairsObservable.create = function (obj, scheduler) {
        return new PairsObservable(obj, scheduler);
    };
    PairsObservable.prototype._subscribe = function (subscriber) {
        var _a = this, keys = _a.keys, scheduler = _a.scheduler;
        var length = keys.length;
        if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
                obj: this.obj, keys: keys, length: length, index: 0, subscriber: subscriber
            });
        }
        else {
            for (var idx = 0; idx < length; idx++) {
                var key = keys[idx];
                subscriber.next([key, this.obj[key]]);
            }
            subscriber.complete();
        }
    };
    return PairsObservable;
}(Observable_1.Observable));
exports.PairsObservable = PairsObservable;
//# sourceMappingURL=PairsObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/RangeObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var RangeObservable = (function (_super) {
    __extends(RangeObservable, _super);
    function RangeObservable(start, count, scheduler) {
        _super.call(this);
        this.start = start;
        this._count = count;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits a sequence of numbers within a specified
     * range.
     *
     * <span class="informal">Emits a sequence of numbers in a range.</span>
     *
     * <img src="./img/range.png" width="100%">
     *
     * `range` operator emits a range of sequential integers, in order, where you
     * select the `start` of the range and its `length`. By default, uses no
     * Scheduler and just delivers the notifications synchronously, but may use
     * an optional Scheduler to regulate those deliveries.
     *
     * @example <caption>Emits the numbers 1 to 10</caption>
     * var numbers = Rx.Observable.range(1, 10);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link interval}
     *
     * @param {number} [start=0] The value of the first integer in the sequence.
     * @param {number} [count=0] The number of sequential integers to generate.
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emissions of the notifications.
     * @return {Observable} An Observable of numbers that emits a finite range of
     * sequential integers.
     * @static true
     * @name range
     * @owner Observable
     */
    RangeObservable.create = function (start, count, scheduler) {
        if (start === void 0) { start = 0; }
        if (count === void 0) { count = 0; }
        return new RangeObservable(start, count, scheduler);
    };
    RangeObservable.dispatch = function (state) {
        var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(start);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
    };
    RangeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var start = this.start;
        var count = this._count;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(RangeObservable.dispatch, 0, {
                index: index, count: count, start: start, subscriber: subscriber
            });
        }
        else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(start++);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
    };
    return RangeObservable;
}(Observable_1.Observable));
exports.RangeObservable = RangeObservable;
//# sourceMappingURL=RangeObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/SubscribeOnObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var asap_1 = __webpack_require__("./node_modules/rxjs/scheduler/asap.js");
var isNumeric_1 = __webpack_require__("./node_modules/rxjs/util/isNumeric.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var SubscribeOnObservable = (function (_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) { delayTime = 0; }
        if (scheduler === void 0) { scheduler = asap_1.asap; }
        _super.call(this);
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
            this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = asap_1.asap;
        }
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) { delay = 0; }
        if (scheduler === void 0) { scheduler = asap_1.asap; }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source, subscriber = arg.subscriber;
        return source.subscribe(subscriber);
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(Observable_1.Observable));
exports.SubscribeOnObservable = SubscribeOnObservable;
//# sourceMappingURL=SubscribeOnObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/TimerObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__("./node_modules/rxjs/util/isNumeric.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var isScheduler_1 = __webpack_require__("./node_modules/rxjs/util/isScheduler.js");
var isDate_1 = __webpack_require__("./node_modules/rxjs/util/isDate.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var TimerObservable = (function (_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        _super.call(this);
        this.period = -1;
        this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
            this.period = Number(period) < 1 && 1 || Number(period);
        }
        else if (isScheduler_1.isScheduler(period)) {
            scheduler = period;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
            scheduler = async_1.async;
        }
        this.scheduler = scheduler;
        this.dueTime = isDate_1.isDate(dueTime) ?
            (+dueTime - this.scheduler.now()) :
            dueTime;
    }
    /**
     * Creates an Observable that starts emitting after an `initialDelay` and
     * emits ever increasing numbers after each `period` of time thereafter.
     *
     * <span class="informal">Its like {@link interval}, but you can specify when
     * should the emissions start.</span>
     *
     * <img src="./img/timer.png" width="100%">
     *
     * `timer` returns an Observable that emits an infinite sequence of ascending
     * integers, with a constant interval of time, `period` of your choosing
     * between those emissions. The first emission happens after the specified
     * `initialDelay`. The initial delay may be a {@link Date}. By default, this
     * operator uses the `async` Scheduler to provide a notion of time, but you
     * may pass any Scheduler to it. If `period` is not specified, the output
     * Observable emits only one value, `0`. Otherwise, it emits an infinite
     * sequence.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
     * var numbers = Rx.Observable.timer(3000, 1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @example <caption>Emits one number after five seconds</caption>
     * var numbers = Rx.Observable.timer(5000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link interval}
     * @see {@link delay}
     *
     * @param {number|Date} initialDelay The initial delay time to wait before
     * emitting the first value of `0`.
     * @param {number} [period] The period of time between emissions of the
     * subsequent numbers.
     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a `0` after the
     * `initialDelay` and ever increasing numbers after each `period` of time
     * thereafter.
     * @static true
     * @name timer
     * @owner Observable
     */
    TimerObservable.create = function (initialDelay, period, scheduler) {
        if (initialDelay === void 0) { initialDelay = 0; }
        return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function (state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        else if (period === -1) {
            return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, period = _a.period, dueTime = _a.dueTime, scheduler = _a.scheduler;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
            index: index, period: period, subscriber: subscriber
        });
    };
    return TimerObservable;
}(Observable_1.Observable));
exports.TimerObservable = TimerObservable;
//# sourceMappingURL=TimerObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/UsingObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var UsingObservable = (function (_super) {
    __extends(UsingObservable, _super);
    function UsingObservable(resourceFactory, observableFactory) {
        _super.call(this);
        this.resourceFactory = resourceFactory;
        this.observableFactory = observableFactory;
    }
    UsingObservable.create = function (resourceFactory, observableFactory) {
        return new UsingObservable(resourceFactory, observableFactory);
    };
    UsingObservable.prototype._subscribe = function (subscriber) {
        var _a = this, resourceFactory = _a.resourceFactory, observableFactory = _a.observableFactory;
        var resource;
        try {
            resource = resourceFactory();
            return new UsingSubscriber(subscriber, resource, observableFactory);
        }
        catch (err) {
            subscriber.error(err);
        }
    };
    return UsingObservable;
}(Observable_1.Observable));
exports.UsingObservable = UsingObservable;
var UsingSubscriber = (function (_super) {
    __extends(UsingSubscriber, _super);
    function UsingSubscriber(destination, resource, observableFactory) {
        _super.call(this, destination);
        this.resource = resource;
        this.observableFactory = observableFactory;
        destination.add(resource);
        this.tryUse();
    }
    UsingSubscriber.prototype.tryUse = function () {
        try {
            var source = this.observableFactory.call(this, this.resource);
            if (source) {
                this.add(subscribeToResult_1.subscribeToResult(this, source));
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    return UsingSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=UsingObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/bindCallback.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BoundCallbackObservable_1 = __webpack_require__("./node_modules/rxjs/observable/BoundCallbackObservable.js");
exports.bindCallback = BoundCallbackObservable_1.BoundCallbackObservable.create;
//# sourceMappingURL=bindCallback.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/bindNodeCallback.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BoundNodeCallbackObservable_1 = __webpack_require__("./node_modules/rxjs/observable/BoundNodeCallbackObservable.js");
exports.bindNodeCallback = BoundNodeCallbackObservable_1.BoundNodeCallbackObservable.create;
//# sourceMappingURL=bindNodeCallback.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/combineLatest.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var isScheduler_1 = __webpack_require__("./node_modules/rxjs/util/isScheduler.js");
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var combineLatest_1 = __webpack_require__("./node_modules/rxjs/operator/combineLatest.js");
/* tslint:enable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from all the Observables passed as
 * arguments. This is done by subscribing to each Observable, in order, and
 * collecting an array of each of the most recent values any time any of the
 * input Observables emits, then either taking that array and passing it as
 * arguments to an optional `project` function and emitting the return value of
 * that, or just emitting the array of recent values directly if there is no
 * `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} observable1 An input Observable to combine with the
 * source Observable.
 * @param {Observable} observable2 An input Observable to combine with the
 * source Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for subscribing to
 * each input Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @static true
 * @name combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    var scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1.CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/concat.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var concat_1 = __webpack_require__("./node_modules/rxjs/operator/concat.js");
exports.concat = concat_1.concatStatic;
//# sourceMappingURL=concat.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/defer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var DeferObservable_1 = __webpack_require__("./node_modules/rxjs/observable/DeferObservable.js");
exports.defer = DeferObservable_1.DeferObservable.create;
//# sourceMappingURL=defer.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/dom/AjaxObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var map_1 = __webpack_require__("./node_modules/rxjs/operator/map.js");
function getCORSRequest() {
    if (root_1.root.XMLHttpRequest) {
        var xhr = new root_1.root.XMLHttpRequest();
        if ('withCredentials' in xhr) {
            xhr.withCredentials = !!this.withCredentials;
        }
        return xhr;
    }
    else if (!!root_1.root.XDomainRequest) {
        return new root_1.root.XDomainRequest();
    }
    else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (root_1.root.XMLHttpRequest) {
        return new root_1.root.XMLHttpRequest();
    }
    else {
        var progId = void 0;
        try {
            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new root_1.root.ActiveXObject(progId)) {
                        break;
                    }
                }
                catch (e) {
                }
            }
            return new root_1.root.ActiveXObject(progId);
        }
        catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url, headers) {
    if (headers === void 0) { headers = null; }
    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
}
exports.ajaxGet = ajaxGet;
;
function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
exports.ajaxPost = ajaxPost;
;
function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
exports.ajaxDelete = ajaxDelete;
;
function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
exports.ajaxPut = ajaxPut;
;
function ajaxGetJSON(url, headers) {
    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers })
        .lift(new map_1.MapOperator(function (x, index) { return x.response; }, null));
}
exports.ajaxGetJSON = ajaxGetJSON;
;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var AjaxObservable = (function (_super) {
    __extends(AjaxObservable, _super);
    function AjaxObservable(urlOrRequest) {
        _super.call(this);
        var request = {
            async: true,
            createXHR: function () {
                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
            },
            crossDomain: false,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        }
        else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        this.request = request;
    }
    AjaxObservable.prototype._subscribe = function (subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
    };
    /**
     * Creates an observable for an Ajax request with either a request object with
     * url, headers, etc or a string for a URL.
     *
     * @example
     * source = Rx.Observable.ajax('/products');
     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
     *
     * @param {string|Object} request Can be one of the following:
     *   A string of the URL to make the Ajax call.
     *   An object with the following properties
     *   - url: URL of the request
     *   - body: The body of the request
     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
     *   - async: Whether the request is async
     *   - headers: Optional headers
     *   - crossDomain: true if a cross domain request, else false
     *   - createXHR: a function to override if you need to use an alternate
     *   XMLHttpRequest implementation.
     *   - resultSelector: a function to use to alter the output value type of
     *   the Observable. Gets {@link AjaxResponse} as an argument.
     * @return {Observable} An observable sequence containing the XMLHttpRequest.
     * @static true
     * @name ajax
     * @owner Observable
    */
    AjaxObservable.create = (function () {
        var create = function (urlOrRequest) {
            return new AjaxObservable(urlOrRequest);
        };
        create.get = ajaxGet;
        create.post = ajaxPost;
        create.delete = ajaxDelete;
        create.put = ajaxPut;
        create.getJSON = ajaxGetJSON;
        return create;
    })();
    return AjaxObservable;
}(Observable_1.Observable));
exports.AjaxObservable = AjaxObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AjaxSubscriber = (function (_super) {
    __extends(AjaxSubscriber, _super);
    function AjaxSubscriber(destination, request) {
        _super.call(this, destination);
        this.request = request;
        this.done = false;
        var headers = request.headers = request.headers || {};
        // force CORS if requested
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // ensure content type is set
        if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        // properly serialize body
        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
        this.send();
    }
    AjaxSubscriber.prototype.next = function (e) {
        this.done = true;
        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
        var response = new AjaxResponse(e, xhr, request);
        destination.next(response);
    };
    AjaxSubscriber.prototype.send = function () {
        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
        var createXHR = request.createXHR;
        var xhr = tryCatch_1.tryCatch(createXHR).call(request);
        if (xhr === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            this.xhr = xhr;
            // open XHR first
            var result = void 0;
            if (user) {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
            }
            else {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
            }
            if (result === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
                return null;
            }
            // timeout and responseType can be set once the XHR is open
            xhr.timeout = request.timeout;
            xhr.responseType = request.responseType;
            // set headers
            this.setHeaders(xhr, headers);
            // now set up the events
            this.setupEvents(xhr, request);
            // finally send the request
            if (body) {
                xhr.send(body);
            }
            else {
                xhr.send();
            }
        }
        return xhr;
    };
    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        }
        else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
            return body;
        }
        if (contentType) {
            var splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(function (key) { return (encodeURI(key) + "=" + encodeURI(body[key])); }).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    };
    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    };
    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
        var progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
        }
        ;
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr && root_1.root.XDomainRequest) {
            if (progressSubscriber) {
                var xhrProgress_1;
                xhrProgress_1 = function (e) {
                    var progressSubscriber = xhrProgress_1.progressSubscriber;
                    progressSubscriber.next(e);
                };
                xhr.onprogress = xhrProgress_1;
                xhrProgress_1.progressSubscriber = progressSubscriber;
            }
            var xhrError_1;
            xhrError_1 = function (e) {
                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxError('ajax error', this, request));
            };
            xhr.onerror = xhrError_1;
            xhrError_1.request = request;
            xhrError_1.subscriber = this;
            xhrError_1.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
            var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (this.readyState === 4) {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status_1 = this.status === 1223 ? 204 : this.status;
                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status_1 === 0) {
                    status_1 = response ? 200 : 0;
                }
                if (200 <= status_1 && status_1 < 300) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                }
                else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
                }
            }
        }
        ;
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
    };
    AjaxSubscriber.prototype.unsubscribe = function () {
        var _a = this, done = _a.done, xhr = _a.xhr;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        _super.prototype.unsubscribe.call(this);
    };
    return AjaxSubscriber;
}(Subscriber_1.Subscriber));
exports.AjaxSubscriber = AjaxSubscriber;
/**
 * A normalized AJAX response.
 *
 * @see {@link ajax}
 *
 * @class AjaxResponse
 */
var AjaxResponse = (function () {
    function AjaxResponse(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        switch (this.responseType) {
            case 'json':
                if ('response' in xhr) {
                    //IE does not support json as responseType, parse it internally
                    this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
                }
                else {
                    this.response = JSON.parse(xhr.responseText || 'null');
                }
                break;
            case 'xml':
                this.response = xhr.responseXML;
                break;
            case 'text':
            default:
                this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
                break;
        }
    }
    return AjaxResponse;
}());
exports.AjaxResponse = AjaxResponse;
/**
 * A normalized AJAX error.
 *
 * @see {@link ajax}
 *
 * @class AjaxError
 */
var AjaxError = (function (_super) {
    __extends(AjaxError, _super);
    function AjaxError(message, xhr, request) {
        _super.call(this, message);
        this.message = message;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
    }
    return AjaxError;
}(Error));
exports.AjaxError = AjaxError;
/**
 * @see {@link ajax}
 *
 * @class AjaxTimeoutError
 */
var AjaxTimeoutError = (function (_super) {
    __extends(AjaxTimeoutError, _super);
    function AjaxTimeoutError(xhr, request) {
        _super.call(this, 'ajax timeout', xhr, request);
    }
    return AjaxTimeoutError;
}(AjaxError));
exports.AjaxTimeoutError = AjaxTimeoutError;
//# sourceMappingURL=AjaxObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/dom/WebSocketSubject.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var ReplaySubject_1 = __webpack_require__("./node_modules/rxjs/ReplaySubject.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var assign_1 = __webpack_require__("./node_modules/rxjs/util/assign.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var WebSocketSubject = (function (_super) {
    __extends(WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
        if (urlConfigOrSource instanceof Observable_1.Observable) {
            _super.call(this, destination, urlConfigOrSource);
        }
        else {
            _super.call(this);
            this.WebSocketCtor = root_1.root.WebSocket;
            this._output = new Subject_1.Subject();
            if (typeof urlConfigOrSource === 'string') {
                this.url = urlConfigOrSource;
            }
            else {
                // WARNING: config object could override important members here.
                assign_1.assign(this, urlConfigOrSource);
            }
            if (!this.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            this.destination = new ReplaySubject_1.ReplaySubject();
        }
    }
    WebSocketSubject.prototype.resultSelector = function (e) {
        return JSON.parse(e.data);
    };
    /**
     * @param urlConfigOrSource
     * @return {WebSocketSubject}
     * @static true
     * @name webSocket
     * @owner Observable
     */
    WebSocketSubject.create = function (urlConfigOrSource) {
        return new WebSocketSubject(urlConfigOrSource);
    };
    WebSocketSubject.prototype.lift = function (operator) {
        var sock = new WebSocketSubject(this, this.destination);
        sock.operator = operator;
        return sock;
    };
    WebSocketSubject.prototype._resetState = function () {
        this.socket = null;
        if (!this.source) {
            this.destination = new ReplaySubject_1.ReplaySubject();
        }
        this._output = new Subject_1.Subject();
    };
    // TODO: factor this out to be a proper Operator/Subscriber implementation and eliminate closures
    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new Observable_1.Observable(function (observer) {
            var result = tryCatch_1.tryCatch(subMsg)();
            if (result === errorObject_1.errorObject) {
                observer.error(errorObject_1.errorObject.e);
            }
            else {
                self.next(result);
            }
            var subscription = self.subscribe(function (x) {
                var result = tryCatch_1.tryCatch(messageFilter)(x);
                if (result === errorObject_1.errorObject) {
                    observer.error(errorObject_1.errorObject.e);
                }
                else if (result) {
                    observer.next(x);
                }
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
            return function () {
                var result = tryCatch_1.tryCatch(unsubMsg)();
                if (result === errorObject_1.errorObject) {
                    observer.error(errorObject_1.errorObject.e);
                }
                else {
                    self.next(result);
                }
                subscription.unsubscribe();
            };
        });
    };
    WebSocketSubject.prototype._connectSocket = function () {
        var _this = this;
        var WebSocketCtor = this.WebSocketCtor;
        var observer = this._output;
        var socket = null;
        try {
            socket = this.protocol ?
                new WebSocketCtor(this.url, this.protocol) :
                new WebSocketCtor(this.url);
            this.socket = socket;
        }
        catch (e) {
            observer.error(e);
            return;
        }
        var subscription = new Subscription_1.Subscription(function () {
            _this.socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = function (e) {
            var openObserver = _this.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            var queue = _this.destination;
            _this.destination = Subscriber_1.Subscriber.create(function (x) { return socket.readyState === 1 && socket.send(x); }, function (e) {
                var closingObserver = _this.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
                        'and an optional reason: { code: number, reason: string }'));
                }
                _this._resetState();
            }, function () {
                var closingObserver = _this.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                _this._resetState();
            });
            if (queue && queue instanceof ReplaySubject_1.ReplaySubject) {
                subscription.add(queue.subscribe(_this.destination));
            }
        };
        socket.onerror = function (e) {
            _this._resetState();
            observer.error(e);
        };
        socket.onclose = function (e) {
            _this._resetState();
            var closeObserver = _this.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = function (e) {
            var result = tryCatch_1.tryCatch(_this.resultSelector)(e);
            if (result === errorObject_1.errorObject) {
                observer.error(errorObject_1.errorObject.e);
            }
            else {
                observer.next(result);
            }
        };
    };
    WebSocketSubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this.socket) {
            this._connectSocket();
        }
        var subscription = new Subscription_1.Subscription();
        subscription.add(this._output.subscribe(subscriber));
        subscription.add(function () {
            var socket = _this.socket;
            if (_this._output.observers.length === 0) {
                if (socket && socket.readyState === 1) {
                    socket.close();
                }
                _this._resetState();
            }
        });
        return subscription;
    };
    WebSocketSubject.prototype.unsubscribe = function () {
        var _a = this, source = _a.source, socket = _a.socket;
        if (socket && socket.readyState === 1) {
            socket.close();
            this._resetState();
        }
        _super.prototype.unsubscribe.call(this);
        if (!source) {
            this.destination = new ReplaySubject_1.ReplaySubject();
        }
    };
    return WebSocketSubject;
}(Subject_1.AnonymousSubject));
exports.WebSocketSubject = WebSocketSubject;
//# sourceMappingURL=WebSocketSubject.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/dom/ajax.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AjaxObservable_1 = __webpack_require__("./node_modules/rxjs/observable/dom/AjaxObservable.js");
exports.ajax = AjaxObservable_1.AjaxObservable.create;
//# sourceMappingURL=ajax.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/dom/webSocket.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var WebSocketSubject_1 = __webpack_require__("./node_modules/rxjs/observable/dom/WebSocketSubject.js");
exports.webSocket = WebSocketSubject_1.WebSocketSubject.create;
//# sourceMappingURL=webSocket.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/empty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
exports.empty = EmptyObservable_1.EmptyObservable.create;
//# sourceMappingURL=empty.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/forkJoin.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ForkJoinObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ForkJoinObservable.js");
exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
//# sourceMappingURL=forkJoin.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/fromEvent.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromEventObservable_1 = __webpack_require__("./node_modules/rxjs/observable/FromEventObservable.js");
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/fromEventPattern.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromEventPatternObservable_1 = __webpack_require__("./node_modules/rxjs/observable/FromEventPatternObservable.js");
exports.fromEventPattern = FromEventPatternObservable_1.FromEventPatternObservable.create;
//# sourceMappingURL=fromEventPattern.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/if.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var IfObservable_1 = __webpack_require__("./node_modules/rxjs/observable/IfObservable.js");
exports._if = IfObservable_1.IfObservable.create;
//# sourceMappingURL=if.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/interval.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var IntervalObservable_1 = __webpack_require__("./node_modules/rxjs/observable/IntervalObservable.js");
exports.interval = IntervalObservable_1.IntervalObservable.create;
//# sourceMappingURL=interval.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/merge.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var merge_1 = __webpack_require__("./node_modules/rxjs/operator/merge.js");
exports.merge = merge_1.mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/never.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var NeverObservable_1 = __webpack_require__("./node_modules/rxjs/observable/NeverObservable.js");
exports.never = NeverObservable_1.NeverObservable.create;
//# sourceMappingURL=never.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/pairs.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var PairsObservable_1 = __webpack_require__("./node_modules/rxjs/observable/PairsObservable.js");
exports.pairs = PairsObservable_1.PairsObservable.create;
//# sourceMappingURL=pairs.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/range.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var RangeObservable_1 = __webpack_require__("./node_modules/rxjs/observable/RangeObservable.js");
exports.range = RangeObservable_1.RangeObservable.create;
//# sourceMappingURL=range.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/throw.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ErrorObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ErrorObservable.js");
exports._throw = ErrorObservable_1.ErrorObservable.create;
//# sourceMappingURL=throw.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/timer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var TimerObservable_1 = __webpack_require__("./node_modules/rxjs/observable/TimerObservable.js");
exports.timer = TimerObservable_1.TimerObservable.create;
//# sourceMappingURL=timer.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/using.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var UsingObservable_1 = __webpack_require__("./node_modules/rxjs/observable/UsingObservable.js");
exports.using = UsingObservable_1.UsingObservable.create;
//# sourceMappingURL=using.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/zip.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var zip_1 = __webpack_require__("./node_modules/rxjs/operator/zip.js");
exports.zip = zip_1.zipStatic;
//# sourceMappingURL=zip.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/audit.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Ignores source values for a duration determined by another Observable, then
 * emits the most recent value from the source Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link auditTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/audit.png" width="100%">
 *
 * `audit` is similar to `throttle`, but emits the last value from the silenced
 * time window, instead of the first value. `audit` emits the most recent value
 * from the source Observable on the output Observable as soon as its internal
 * timer becomes disabled, and ignores source values while the timer is enabled.
 * Initially, the timer is disabled. As soon as the first source value arrives,
 * the timer is enabled by calling the `durationSelector` function with the
 * source value, which returns the "duration" Observable. When the duration
 * Observable emits a value or completes, the timer is disabled, then the most
 * recent source value is emitted on the output Observable, and this process
 * repeats for the next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.audit(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttle}
 *
 * @param {function(value: T): Observable|Promise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration, returned as an Observable or a Promise.
 * @return {Observable<T>} An Observable that performs rate-limiting of
 * emissions from the source Observable.
 * @method audit
 * @owner Observable
 */
function audit(durationSelector) {
    return this.lift(new AuditOperator(durationSelector));
}
exports.audit = audit;
var AuditOperator = (function () {
    function AuditOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    AuditOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new AuditSubscriber(subscriber, this.durationSelector));
    };
    return AuditOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AuditSubscriber = (function (_super) {
    __extends(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
    }
    AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
            if (duration === errorObject_1.errorObject) {
                this.destination.error(errorObject_1.errorObject.e);
            }
            else {
                this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
            }
        }
    };
    AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
    };
    return AuditSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=audit.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/auditTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Ignores source values for `duration` milliseconds, then emits the most recent
 * value from the source Observable, then repeats this process.
 *
 * <span class="informal">When it sees a source values, it ignores that plus
 * the next ones for `duration` milliseconds, and then it emits the most recent
 * value from the source.</span>
 *
 * <img src="./img/auditTime.png" width="100%">
 *
 * `auditTime` is similar to `throttleTime`, but emits the last value from the
 * silenced time window, instead of the first value. `auditTime` emits the most
 * recent value from the source Observable on the output Observable as soon as
 * its internal timer becomes disabled, and ignores source values while the
 * timer is enabled. Initially, the timer is disabled. As soon as the first
 * source value arrives, the timer is enabled. After `duration` milliseconds (or
 * the time unit determined internally by the optional `scheduler`) has passed,
 * the timer is disabled, then the most recent source value is emitted on the
 * output Observable, and this process repeats for the next source value.
 * Optionally takes a {@link Scheduler} for managing timers.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.auditTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} duration Time to wait before emitting the most recent source
 * value, measured in milliseconds or the time unit determined internally
 * by the optional `scheduler`.
 * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
 * managing the timers that handle the rate-limiting behavior.
 * @return {Observable<T>} An Observable that performs rate-limiting of
 * emissions from the source Observable.
 * @method auditTime
 * @owner Observable
 */
function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new AuditTimeOperator(duration, scheduler));
}
exports.auditTime = auditTime;
var AuditTimeOperator = (function () {
    function AuditTimeOperator(duration, scheduler) {
        this.duration = duration;
        this.scheduler = scheduler;
    }
    AuditTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
    };
    return AuditTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AuditTimeSubscriber = (function (_super) {
    __extends(AuditTimeSubscriber, _super);
    function AuditTimeSubscriber(destination, duration, scheduler) {
        _super.call(this, destination);
        this.duration = duration;
        this.scheduler = scheduler;
        this.hasValue = false;
    }
    AuditTimeSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, this));
        }
    };
    AuditTimeSubscriber.prototype.clearThrottle = function () {
        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    return AuditTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.clearThrottle();
}
//# sourceMappingURL=auditTime.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/buffer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Buffers the source Observable values until `closingNotifier` emits.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when another Observable emits.</span>
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * Buffers the incoming Observable values until the given `closingNotifier`
 * Observable emits a value, at which point it emits the buffer on the output
 * Observable and starts a new buffer internally, awaiting the next time
 * `closingNotifier` emits.
 *
 * @example <caption>On every click, emit array of most recent interval events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var buffered = interval.buffer(clicks);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link window}
 *
 * @param {Observable<any>} closingNotifier An Observable that signals the
 * buffer to be emitted on the output Observable.
 * @return {Observable<T[]>} An Observable of buffers, which are arrays of
 * values.
 * @method buffer
 * @owner Observable
 */
function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}
exports.buffer = buffer;
var BufferOperator = (function () {
    function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    BufferOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
    };
    return BufferOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferSubscriber = (function (_super) {
    __extends(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.buffer = [];
        this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
    }
    BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };
    return BufferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=buffer.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/bufferCount.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Buffers the source Observable values until the size hits the maximum
 * `bufferSize` given.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when its size reaches `bufferSize`.</span>
 *
 * <img src="./img/bufferCount.png" width="100%">
 *
 * Buffers a number of values from the source Observable by `bufferSize` then
 * emits the buffer and clears it, and starts a new buffer each
 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
 * `null`, then new buffers are started immediately at the start of the source
 * and when each buffer closes and is emitted.
 *
 * @example <caption>Emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2);
 * buffered.subscribe(x => console.log(x));
 *
 * @example <caption>On every click, emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2, 1);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link pairwise}
 * @see {@link windowCount}
 *
 * @param {number} bufferSize The maximum size of the buffer emitted.
 * @param {number} [startBufferEvery] Interval at which to start a new buffer.
 * For example if `startBufferEvery` is `2`, then a new buffer will be started
 * on every other value from the source. A new buffer is started at the
 * beginning of the source by default.
 * @return {Observable<T[]>} An Observable of arrays of buffered values.
 * @method bufferCount
 * @owner Observable
 */
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}
exports.bufferCount = bufferCount;
var BufferCountOperator = (function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
    }
    BufferCountOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferCountSubscriber = (function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _super.call(this, destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [];
        this.count = 0;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var count = this.count++;
        var _a = this, destination = _a.destination, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers;
        var startOn = (startBufferEvery == null) ? bufferSize : startBufferEvery;
        if (count % startOn === 0) {
            buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                destination.next(buffer);
            }
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var buffers = this.buffers;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=bufferCount.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/bufferTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var isScheduler_1 = __webpack_require__("./node_modules/rxjs/util/isScheduler.js");
/* tslint:disable:max-line-length */
/**
 * Buffers the source Observable values for a specific time period.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * those arrays periodically in time.</span>
 *
 * <img src="./img/bufferTime.png" width="100%">
 *
 * Buffers values from the source for a specific time duration `bufferTimeSpan`.
 * Unless the optional argument `bufferCreationInterval` is given, it emits and
 * resets the buffer every `bufferTimeSpan` milliseconds. If
 * `bufferCreationInterval` is given, this operator opens the buffer every
 * `bufferCreationInterval` milliseconds and closes (emits and resets) the
 * buffer every `bufferTimeSpan` milliseconds. When the optional argument
 * `maxBufferSize` is specified, the buffer will be closed either after
 * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
 *
 * @example <caption>Every second, emit an array of the recent click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(1000);
 * buffered.subscribe(x => console.log(x));
 *
 * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(2000, 5000);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link windowTime}
 *
 * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
 * @param {number} [bufferCreationInterval] The interval at which to start new
 * buffers.
 * @param {number} [maxBufferSize] The maximum buffer size.
 * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
 * intervals that determine buffer boundaries.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferTime
 * @owner Observable
 */
function bufferTime(bufferTimeSpan) {
    var length = arguments.length;
    var scheduler = async_1.async;
    if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
    }
    var bufferCreationInterval = null;
    if (length >= 2) {
        bufferCreationInterval = arguments[1];
    }
    var maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
        maxBufferSize = arguments[2];
    }
    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
}
exports.bufferTime = bufferTime;
var BufferTimeOperator = (function () {
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
    }
    BufferTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
    };
    return BufferTimeOperator;
}());
var Context = (function () {
    function Context() {
        this.buffer = [];
    }
    return Context;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferTimeSubscriber = (function (_super) {
    __extends(BufferTimeSubscriber, _super);
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        _super.call(this, destination);
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
        this.contexts = [];
        var context = this.openContext();
        this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
        if (this.timespanOnly) {
            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
            this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
        else {
            var closeState = { subscriber: this, context: context };
            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: this, scheduler: scheduler };
            this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
    }
    BufferTimeSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        var filledBufferContext;
        for (var i = 0; i < len; i++) {
            var context = contexts[i];
            var buffer = context.buffer;
            buffer.push(value);
            if (buffer.length == this.maxBufferSize) {
                filledBufferContext = context;
            }
        }
        if (filledBufferContext) {
            this.onBufferFull(filledBufferContext);
        }
    };
    BufferTimeSubscriber.prototype._error = function (err) {
        this.contexts.length = 0;
        _super.prototype._error.call(this, err);
    };
    BufferTimeSubscriber.prototype._complete = function () {
        var _a = this, contexts = _a.contexts, destination = _a.destination;
        while (contexts.length > 0) {
            var context = contexts.shift();
            destination.next(context.buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferTimeSubscriber.prototype._unsubscribe = function () {
        this.contexts = null;
    };
    BufferTimeSubscriber.prototype.onBufferFull = function (context) {
        this.closeContext(context);
        var closeAction = context.closeAction;
        closeAction.unsubscribe();
        this.remove(closeAction);
        if (!this.closed && this.timespanOnly) {
            context = this.openContext();
            var bufferTimeSpan = this.bufferTimeSpan;
            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    };
    BufferTimeSubscriber.prototype.openContext = function () {
        var context = new Context();
        this.contexts.push(context);
        return context;
    };
    BufferTimeSubscriber.prototype.closeContext = function (context) {
        this.destination.next(context.buffer);
        var contexts = this.contexts;
        var spliceIndex = contexts ? contexts.indexOf(context) : -1;
        if (spliceIndex >= 0) {
            contexts.splice(contexts.indexOf(context), 1);
        }
    };
    return BufferTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchBufferTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var prevContext = state.context;
    if (prevContext) {
        subscriber.closeContext(prevContext);
    }
    if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
    }
}
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
    var context = subscriber.openContext();
    var action = this;
    if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
        action.schedule(state, bufferCreationInterval);
    }
}
function dispatchBufferClose(arg) {
    var subscriber = arg.subscriber, context = arg.context;
    subscriber.closeContext(context);
}
//# sourceMappingURL=bufferTime.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/bufferToggle.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
/**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.
 *
 * <span class="informal">Collects values from the past as an array. Starts
 * collecting only when `opening` emits, and calls the `closingSelector`
 * function to get an Observable that tells when to close the buffer.</span>
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * a Subscribable or Promise returned by the `closingSelector` function emits.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var buffered = clicks.bufferToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferWhen}
 * @see {@link windowToggle}
 *
 * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
 * buffers.
 * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
 * which, when it emits, signals that the associated buffer should be emitted
 * and cleared.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferToggle
 * @owner Observable
 */
function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
}
exports.bufferToggle = bufferToggle;
var BufferToggleOperator = (function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferToggleSubscriber = (function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(subscribeToResult_1.subscribeToResult(this, openings));
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            this.destination.next(context.buffer);
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer, subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription_1.Subscription();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        }
        else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=bufferToggle.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/bufferWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Buffers the source Observable values, using a factory function of closing
 * Observables to determine when to close, emit, and reset the buffer.
 *
 * <span class="informal">Collects values from the past as an array. When it
 * starts collecting values, it calls a function that returns an Observable that
 * tells when to close the buffer and restart collecting.</span>
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` function emits a value. When it closes
 * the buffer, it immediately opens a new buffer and repeats the process.
 *
 * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferWhen(() =>
 *   Rx.Observable.interval(1000 + Math.random() * 4000)
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link windowWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals buffer closure.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferWhen
 * @owner Observable
 */
function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}
exports.bufferWhen = bufferWhen;
var BufferWhenOperator = (function () {
    function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
    };
    return BufferWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferWhenSubscriber = (function (_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.closingSelector = closingSelector;
        this.subscribing = false;
        this.openBuffer();
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
            this.complete();
        }
        else {
            this.openBuffer();
        }
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            closingSubscription = new Subscription_1.Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
            this.subscribing = false;
        }
    };
    return BufferWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=bufferWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/combineAll.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var combineLatest_1 = __webpack_require__("./node_modules/rxjs/operator/combineLatest.js");
/**
 * Converts a higher-order Observable into a first-order Observable by waiting
 * for the outer Observable to complete, then applying {@link combineLatest}.
 *
 * <span class="informal">Flattens an Observable-of-Observables by applying
 * {@link combineLatest} when the Observable-of-Observables completes.</span>
 *
 * <img src="./img/combineAll.png" width="100%">
 *
 * Takes an Observable of Observables, and collects all Observables from it.
 * Once the outer Observable completes, it subscribes to all collected
 * Observables and combines their values using the {@link combineLatest}
 * strategy, such that:
 * - Every time an inner Observable emits, the output Observable emits.
 * - When the returned observable emits, it emits all of the latest values by:
 *   - If a `project` function is provided, it is called with each recent value
 *     from each inner Observable in whatever order they arrived, and the result
 *     of the `project` function is what is emitted by the output Observable.
 *   - If there is no `project` function, an array of all of the most recent
 *     values is emitted by the output Observable.
 *
 * @example <caption>Map two click events to a finite interval Observable, then apply combineAll</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev =>
 *   Rx.Observable.interval(Math.random()*2000).take(3)
 * ).take(2);
 * var result = higherOrder.combineAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 * @see {@link mergeAll}
 *
 * @param {function} [project] An optional function to map the most recent
 * values from each inner Observable into a new result. Takes each of the most
 * recent values from each collected inner Observable as arguments, in order.
 * @return {Observable} An Observable of projected results or arrays of recent
 * values.
 * @method combineAll
 * @owner Observable
 */
function combineAll(project) {
    return this.lift(new combineLatest_1.CombineLatestOperator(project));
}
exports.combineAll = combineAll;
//# sourceMappingURL=combineAll.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/combineLatest.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var none = {};
/* tslint:disable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    observables.unshift(this);
    return this.lift.call(new ArrayObservable_1.ArrayObservable(observables), new CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
}());
exports.CombineLatestOperator = CombineLatestOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CombineLatestSubscriber = (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(none);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === none ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryProject = function (values) {
        var result;
        try {
            result = this.project.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.CombineLatestSubscriber = CombineLatestSubscriber;
//# sourceMappingURL=combineLatest.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/concat.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var isScheduler_1 = __webpack_require__("./node_modules/rxjs/util/isScheduler.js");
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var mergeAll_1 = __webpack_require__("./node_modules/rxjs/operator/mergeAll.js");
/* tslint:disable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins this Observable with multiple other Observables by subscribing to them
 * one at a time, starting with the source, and merging their results into the
 * output Observable. Will wait for each Observable to complete before moving
 * on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = timer.concat(sequence);
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = timer1.concat(timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {Observable} other An input Observable to concatenate after the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @method concat
 * @owner Observable
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(concatStatic.apply(void 0, [this].concat(observables)));
}
exports.concat = concat;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins multiple Observables together by subscribing to them one at a time and
 * merging their results into the output Observable. Will wait for each
 * Observable to complete before moving on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = Rx.Observable.concat(timer, sequence);
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = Rx.Observable.concat(timer1, timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {Observable} input1 An input Observable to concatenate with others.
 * @param {Observable} input2 An input Observable to concatenate with others.
 * More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @static true
 * @name concat
 * @owner Observable
 */
function concatStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var scheduler = null;
    var args = observables;
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
        scheduler = args.pop();
    }
    if (scheduler === null && observables.length === 1) {
        return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatStatic = concatStatic;
//# sourceMappingURL=concat.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/concatMapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var mergeMapTo_1 = __webpack_require__("./node_modules/rxjs/operator/mergeMapTo.js");
/* tslint:disable:max-line-length */
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in a serialized fashion on the output Observable.
 *
 * <span class="informal">It's like {@link concatMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/concatMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. Each new `innerObservable`
 * instance emitted on the output Observable is concatenated with the previous
 * `innerObservable` instance.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMapTo` is equivalent to `mergeMapTo` with concurrency parameter
 * set to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link mergeMapTo}
 * @see {@link switchMapTo}
 *
 * @param {Observable} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An observable of values merged together by joining the
 * passed observable with itself, one after the other, for each value emitted
 * from the source.
 * @method concatMapTo
 * @owner Observable
 */
function concatMapTo(innerObservable, resultSelector) {
    return this.lift(new mergeMapTo_1.MergeMapToOperator(innerObservable, resultSelector, 1));
}
exports.concatMapTo = concatMapTo;
//# sourceMappingURL=concatMapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/count.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Counts the number of emissions on the source and emits that number when the
 * source completes.
 *
 * <span class="informal">Tells how many values were emitted, when the source
 * completes.</span>
 *
 * <img src="./img/count.png" width="100%">
 *
 * `count` transforms an Observable that emits values into an Observable that
 * emits a single value that represents the number of values emitted by the
 * source Observable. If the source Observable terminates with an error, `count`
 * will pass this error notification along without emitting an value first. If
 * the source Observable does not terminate at all, `count` will neither emit
 * a value nor terminate. This operator takes an optional `predicate` function
 * as argument, in which case the output emission will represent the number of
 * source values that matched `true` with the `predicate`.
 *
 * @example <caption>Counts how many seconds have passed before the first click happened</caption>
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var secondsBeforeClick = seconds.takeUntil(clicks);
 * var result = secondsBeforeClick.count();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Counts how many odd numbers are there between 1 and 7</caption>
 * var numbers = Rx.Observable.range(1, 7);
 * var result = numbers.count(i => i % 2 === 1);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link max}
 * @see {@link min}
 * @see {@link reduce}
 *
 * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
 * boolean function to select what values are to be counted. It is provided with
 * arguments of:
 * - `value`: the value from the source Observable.
 * - `index`: the (zero-based) "index" of the value from the source Observable.
 * - `source`: the source Observable instance itself.
 * @return {Observable} An Observable of one number that represents the count as
 * described above.
 * @method count
 * @owner Observable
 */
function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
}
exports.count = count;
var CountOperator = (function () {
    function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CountSubscriber = (function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.count = 0;
        this.index = 0;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=count.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/debounce.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Emits a value from the source Observable only after a particular time span
 * determined by another Observable has passed without another source emission.
 *
 * <span class="informal">It's like {@link debounceTime}, but the time span of
 * emission silence is determined by a second Observable.</span>
 *
 * <img src="./img/debounce.png" width="100%">
 *
 * `debounce` delays values emitted by the source Observable, but drops previous
 * pending delayed emissions if a new value arrives on the source Observable.
 * This operator keeps track of the most recent value from the source
 * Observable, and spawns a duration Observable by calling the
 * `durationSelector` function. The value is emitted only when the duration
 * Observable emits a value or completes, and if no other value was emitted on
 * the source Observable since the duration Observable was spawned. If a new
 * value appears before the duration Observable emits, the previous value will
 * be dropped and will not be emitted on the output Observable.
 *
 * Like {@link debounceTime}, this is a rate-limiting operator, and also a
 * delay-like operator since output emissions do not necessarily occur at the
 * same time as they did on the source Observable.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounce(() => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 * @see {@link throttle}
 *
 * @param {function(value: T): Observable|Promise} durationSelector A function
 * that receives a value from the source Observable, for computing the timeout
 * duration for each source value, returned as an Observable or a Promise.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified duration Observable returned by
 * `durationSelector`, and may drop some values if they occur too frequently.
 * @method debounce
 * @owner Observable
 */
function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
}
exports.debounce = debounce;
var DebounceOperator = (function () {
    function DebounceOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    DebounceOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
    };
    return DebounceOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceSubscriber = (function (_super) {
    __extends(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
        this.durationSubscription = null;
    }
    DebounceSubscriber.prototype._next = function (value) {
        try {
            var result = this.durationSelector.call(this, value);
            if (result) {
                this._tryNext(value, result);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    DebounceSubscriber.prototype._complete = function () {
        this.emitValue();
        this.destination.complete();
    };
    DebounceSubscriber.prototype._tryNext = function (value, duration) {
        var subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
        }
        subscription = subscribeToResult_1.subscribeToResult(this, duration);
        if (!subscription.closed) {
            this.add(this.durationSubscription = subscription);
        }
    };
    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    DebounceSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    DebounceSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            var value = this.value;
            var subscription = this.durationSubscription;
            if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
            }
            this.value = null;
            this.hasValue = false;
            _super.prototype._next.call(this, value);
        }
    };
    return DebounceSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=debounce.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/debounceTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link Scheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/defaultIfEmpty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/* tslint:disable:max-line-length */
/**
 * Emits a given value if the source Observable completes without emitting any
 * `next` value, otherwise mirrors the source Observable.
 *
 * <span class="informal">If the source Observable turns out to be empty, then
 * this operator will emit a default value.</span>
 *
 * <img src="./img/defaultIfEmpty.png" width="100%">
 *
 * `defaultIfEmpty` emits the values emitted by the source Observable or a
 * specified default value if the source Observable is empty (completes without
 * having emitted any `next` value).
 *
 * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link empty}
 * @see {@link last}
 *
 * @param {any} [defaultValue=null] The default value used if the source
 * Observable is empty.
 * @return {Observable} An Observable that emits either the specified
 * `defaultValue` if the source Observable emits no items, or the values emitted
 * by the source Observable.
 * @method defaultIfEmpty
 * @owner Observable
 */
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}
exports.defaultIfEmpty = defaultIfEmpty;
var DefaultIfEmptyOperator = (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DefaultIfEmptySubscriber = (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        _super.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/delay.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var isDate_1 = __webpack_require__("./node_modules/rxjs/util/isDate.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Notification_1 = __webpack_require__("./node_modules/rxjs/Notification.js");
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The Scheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
}
exports.delay = delay;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelaySubscriber = (function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_1.Subscriber));
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());
//# sourceMappingURL=delay.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/delayWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Delays the emission of items from the source Observable by a given time span
 * determined by the emissions of another Observable.
 *
 * <span class="informal">It's like {@link delay}, but the time span of the
 * delay duration is determined by a second Observable.</span>
 *
 * <img src="./img/delayWhen.png" width="100%">
 *
 * `delayWhen` time shifts each emitted value from the source Observable by a
 * time span determined by another Observable. When the source emits a value,
 * the `delayDurationSelector` function is called with the source value as
 * argument, and should return an Observable, called the "duration" Observable.
 * The source value is emitted on the output Observable only when the duration
 * Observable emits a value or completes.
 *
 * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
 * is an Observable. When `subscriptionDelay` emits its first value or
 * completes, the source Observable is subscribed to and starts behaving like
 * described in the previous paragraph. If `subscriptionDelay` is not provided,
 * `delayWhen` will subscribe to the source Observable as soon as the output
 * Observable is subscribed.
 *
 * @example <caption>Delay each click by a random amount of time, between 0 and 5 seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delayWhen(event =>
 *   Rx.Observable.interval(Math.random() * 5000)
 * );
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounce}
 * @see {@link delay}
 *
 * @param {function(value: T): Observable} delayDurationSelector A function that
 * returns an Observable for each value emitted by the source Observable, which
 * is then used to delay the emission of that item on the output Observable
 * until the Observable returned from this function emits a value.
 * @param {Observable} subscriptionDelay An Observable that triggers the
 * subscription to the source Observable once it emits any value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by an amount of time specified by the Observable returned by
 * `delayDurationSelector`.
 * @method delayWhen
 * @owner Observable
 */
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return new SubscriptionDelayObservable(this, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
}
exports.delayWhen = delayWhen;
var DelayWhenOperator = (function () {
    function DelayWhenOperator(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    DelayWhenOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    };
    return DelayWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelayWhenSubscriber = (function (_super) {
    __extends(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
        _super.call(this, destination);
        this.delayDurationSelector = delayDurationSelector;
        this.completed = false;
        this.delayNotifierSubscriptions = [];
        this.values = [];
    }
    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        var value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function (value) {
        try {
            var delayNotifier = this.delayDurationSelector(value);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    DelayWhenSubscriber.prototype._complete = function () {
        this.completed = true;
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        var value = null;
        if (subscriptionIdx !== -1) {
            value = this.values[subscriptionIdx];
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
            this.values.splice(subscriptionIdx, 1);
        }
        return value;
    };
    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
        var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
        this.add(notifierSubscription);
        this.delayNotifierSubscriptions.push(notifierSubscription);
        this.values.push(value);
    };
    DelayWhenSubscriber.prototype.tryComplete = function () {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    };
    return DelayWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubscriptionDelayObservable = (function (_super) {
    __extends(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
        _super.call(this);
        this.source = source;
        this.subscriptionDelay = subscriptionDelay;
    }
    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
}(Observable_1.Observable));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubscriptionDelaySubscriber = (function (_super) {
    __extends(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
        _super.call(this);
        this.parent = parent;
        this.source = source;
        this.sourceSubscribed = false;
    }
    SubscriptionDelaySubscriber.prototype._next = function (unused) {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function (err) {
        this.unsubscribe();
        this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function () {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    };
    return SubscriptionDelaySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=delayWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/dematerialize.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Converts an Observable of {@link Notification} objects into the emissions
 * that they represent.
 *
 * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
 * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
 *
 * <img src="./img/dematerialize.png" width="100%">
 *
 * `dematerialize` is assumed to operate an Observable that only emits
 * {@link Notification} objects as `next` emissions, and does not emit any
 * `error`. Such Observable is the output of a `materialize` operation. Those
 * notifications are then unwrapped using the metadata they contain, and emitted
 * as `next`, `error`, and `complete` on the output Observable.
 *
 * Use this operator in conjunction with {@link materialize}.
 *
 * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
 * var notifA = new Rx.Notification('N', 'A');
 * var notifB = new Rx.Notification('N', 'B');
 * var notifE = new Rx.Notification('E', void 0,
 *   new TypeError('x.toUpperCase is not a function')
 * );
 * var materialized = Rx.Observable.of(notifA, notifB, notifE);
 * var upperCase = materialized.dematerialize();
 * upperCase.subscribe(x => console.log(x), e => console.error(e));
 *
 * @see {@link Notification}
 * @see {@link materialize}
 *
 * @return {Observable} An Observable that emits items and notifications
 * embedded in Notification objects emitted by the source Observable.
 * @method dematerialize
 * @owner Observable
 */
function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}
exports.dematerialize = dematerialize;
var DeMaterializeOperator = (function () {
    function DeMaterializeOperator() {
    }
    DeMaterializeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DeMaterializeSubscriber(subscriber));
    };
    return DeMaterializeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DeMaterializeSubscriber = (function (_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
        _super.call(this, destination);
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=dematerialize.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/distinct.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var Set_1 = __webpack_require__("./node_modules/rxjs/util/Set.js");
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
 * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
 * source observable directly with an equality check against previous values.
 * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
 * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
 * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
 * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
 * that the internal `Set` can be "flushed", basically clearing it of values.
 * @param {function} [keySelector] optional function to select which value you want to check as distinct.
 * @param {Observable} [flushes] optional Observable for flushing the internal HashSet of the operator.
 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
 * @method distinct
 * @owner Observable
 */
function distinct(keySelector, flushes) {
    return this.lift(new DistinctOperator(keySelector, flushes));
}
exports.distinct = distinct;
var DistinctOperator = (function () {
    function DistinctOperator(keySelector, flushes) {
        this.keySelector = keySelector;
        this.flushes = flushes;
    }
    DistinctOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
    };
    return DistinctOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctSubscriber = (function (_super) {
    __extends(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, keySelector, flushes) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.values = new Set_1.Set();
        if (flushes) {
            this.add(subscribeToResult_1.subscribeToResult(this, flushes));
        }
    }
    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
    };
    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DistinctSubscriber.prototype._next = function (value) {
        if (this.keySelector) {
            this._useKeySelector(value);
        }
        else {
            this._finalizeNext(value, value);
        }
    };
    DistinctSubscriber.prototype._useKeySelector = function (value) {
        var key;
        var destination = this.destination;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this._finalizeNext(key, value);
    };
    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
        var values = this.values;
        if (!values.has(key)) {
            values.add(key);
            this.destination.next(value);
        }
    };
    return DistinctSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.DistinctSubscriber = DistinctSubscriber;
//# sourceMappingURL=distinct.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/distinctUntilChanged.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
/* tslint:disable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If a comparator function is not provided, an equality check is used by default.
 * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/distinctUntilKeyChanged.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var distinctUntilChanged_1 = __webpack_require__("./node_modules/rxjs/operator/distinctUntilChanged.js");
/* tslint:disable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
 * using a property accessed by using the key provided to check if the two items are distinct.
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If a comparator function is not provided, an equality check is used by default.
 * @param {string} key string key for object property lookup on each item.
 * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} an Observable that emits items from the source Observable with distinct values based on the key specified.
 * @method distinctUntilKeyChanged
 * @owner Observable
 */
function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged.call(this, function (x, y) {
        if (compare) {
            return compare(x[key], y[key]);
        }
        return x[key] === y[key];
    });
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
//# sourceMappingURL=distinctUntilKeyChanged.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/do.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/* tslint:disable:max-line-length */
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}
exports._do = _do;
var DoOperator = (function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DoSubscriber = (function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _super.call(this, destination);
        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function (value) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.next(value);
        }
    };
    DoSubscriber.prototype._error = function (err) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.error(err);
        }
    };
    DoSubscriber.prototype._complete = function () {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.complete();
        }
    };
    return DoSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=do.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/elementAt.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var ArgumentOutOfRangeError_1 = __webpack_require__("./node_modules/rxjs/util/ArgumentOutOfRangeError.js");
/**
 * Emits the single value at the specified `index` in a sequence of emissions
 * from the source Observable.
 *
 * <span class="informal">Emits only the i-th value, then completes.</span>
 *
 * <img src="./img/elementAt.png" width="100%">
 *
 * `elementAt` returns an Observable that emits the item at the specified
 * `index` in the source Observable, or a default value if that `index` is out
 * of range and the `default` argument is provided. If the `default` argument is
 * not given and the `index` is out of range, the output Observable will emit an
 * `ArgumentOutOfRangeError` error.
 *
 * @example <caption>Emit only the third click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.elementAt(2);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link skip}
 * @see {@link single}
 * @see {@link take}
 *
 * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
 * Observable has completed before emitting the i-th `next` notification.
 *
 * @param {number} index Is the number `i` for the i-th source emission that has
 * happened since the subscription, starting from the number `0`.
 * @param {T} [defaultValue] The default value returned for missing indices.
 * @return {Observable} An Observable that emits a single item, if it is found.
 * Otherwise, will emit the default value if given. If not, then emits an error.
 * @method elementAt
 * @owner Observable
 */
function elementAt(index, defaultValue) {
    return this.lift(new ElementAtOperator(index, defaultValue));
}
exports.elementAt = elementAt;
var ElementAtOperator = (function () {
    function ElementAtOperator(index, defaultValue) {
        this.index = index;
        this.defaultValue = defaultValue;
        if (index < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    ElementAtOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
    };
    return ElementAtOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ElementAtSubscriber = (function (_super) {
    __extends(ElementAtSubscriber, _super);
    function ElementAtSubscriber(destination, index, defaultValue) {
        _super.call(this, destination);
        this.index = index;
        this.defaultValue = defaultValue;
    }
    ElementAtSubscriber.prototype._next = function (x) {
        if (this.index-- === 0) {
            this.destination.next(x);
            this.destination.complete();
        }
    };
    ElementAtSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index >= 0) {
            if (typeof this.defaultValue !== 'undefined') {
                destination.next(this.defaultValue);
            }
            else {
                destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
            }
        }
        destination.complete();
    };
    return ElementAtSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=elementAt.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/exhaust.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Converts a higher-order Observable into a first-order Observable by dropping
 * inner Observables while the previous inner Observable has not yet completed.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * next inner Observables while the current inner is still executing.</span>
 *
 * <img src="./img/exhaust.png" width="100%">
 *
 * `exhaust` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable begins emitting the items emitted by that
 * inner Observable. So far, it behaves like {@link mergeAll}. However,
 * `exhaust` ignores every new inner Observable if the previous Observable has
 * not yet completed. Once that one completes, it will accept and flatten the
 * next inner Observable and repeat this process.
 *
 * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var result = higherOrder.exhaust();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link switch}
 * @see {@link mergeAll}
 * @see {@link exhaustMap}
 * @see {@link zipAll}
 *
 * @return {Observable} Returns an Observable that takes a source of Observables
 * and propagates the first observable exclusively until it completes before
 * subscribing to the next.
 * @method exhaust
 * @owner Observable
 */
function exhaust() {
    return this.lift(new SwitchFirstOperator());
}
exports.exhaust = exhaust;
var SwitchFirstOperator = (function () {
    function SwitchFirstOperator() {
    }
    SwitchFirstOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchFirstSubscriber(subscriber));
    };
    return SwitchFirstOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchFirstSubscriber = (function (_super) {
    __extends(SwitchFirstSubscriber, _super);
    function SwitchFirstSubscriber(destination) {
        _super.call(this, destination);
        this.hasCompleted = false;
        this.hasSubscription = false;
    }
    SwitchFirstSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(subscribeToResult_1.subscribeToResult(this, value));
        }
    };
    SwitchFirstSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchFirstSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=exhaust.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/exhaustMap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable only if the previous projected Observable has completed.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link exhaust}.</span>
 *
 * <img src="./img/exhaustMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. When it projects a source value to
 * an Observable, the output Observable begins emitting the items emitted by
 * that projected Observable. However, `exhaustMap` ignores every new projected
 * Observable if the previous projected Observable has not yet completed. Once
 * that one completes, it will accept and flatten the next projected Observable
 * and repeat this process.
 *
 * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaust}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable containing projected Observables
 * of each item of the source, ignoring projected Observables that start before
 * their preceding Observable has completed.
 * @method exhaustMap
 * @owner Observable
 */
function exhaustMap(project, resultSelector) {
    return this.lift(new SwitchFirstMapOperator(project, resultSelector));
}
exports.exhaustMap = exhaustMap;
var SwitchFirstMapOperator = (function () {
    function SwitchFirstMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchFirstMapOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchFirstMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchFirstMapSubscriber = (function (_super) {
    __extends(SwitchFirstMapSubscriber, _super);
    function SwitchFirstMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.hasSubscription = false;
        this.hasCompleted = false;
        this.index = 0;
    }
    SwitchFirstMapSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.tryNext(value);
        }
    };
    SwitchFirstMapSubscriber.prototype.tryNext = function (value) {
        var index = this.index++;
        var destination = this.destination;
        try {
            var result = this.project(value, index);
            this.hasSubscription = true;
            this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
        }
        catch (err) {
            destination.error(err);
        }
    };
    SwitchFirstMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchFirstMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    };
    SwitchFirstMapSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        try {
            var result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            destination.next(result);
        }
        catch (err) {
            destination.error(err);
        }
    };
    SwitchFirstMapSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchFirstMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchFirstMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=exhaustMap.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/expand.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * Recursively projects each source value to an Observable which is merged in
 * the output Observable.
 *
 * <span class="informal">It's similar to {@link mergeMap}, but applies the
 * projection function to every source value as well as every output value.
 * It's recursive.</span>
 *
 * <img src="./img/expand.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger. *Expand* will re-emit on the output
 * Observable every source value. Then, each output value is given to the
 * `project` function which returns an inner Observable to be merged on the
 * output Observable. Those output values resulting from the projection are also
 * given to the `project` function to produce new output values. This is how
 * *expand* behaves recursively.
 *
 * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var powersOfTwo = clicks
 *   .mapTo(1)
 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
 *   .take(10);
 * powersOfTwo.subscribe(x => console.log(x));
 *
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 *
 * @param {function(value: T, index: number) => Observable} project A function
 * that, when applied to an item emitted by the source or the output Observable,
 * returns an Observable.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for subscribing to
 * each projected inner Observable.
 * @return {Observable} An Observable that emits the source values and also
 * result of applying the projection function to each value emitted on the
 * output Observable and and merging the results of the Observables obtained
 * from this transformation.
 * @method expand
 * @owner Observable
 */
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (scheduler === void 0) { scheduler = undefined; }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
}
exports.expand = expand;
var ExpandOperator = (function () {
    function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
}());
exports.ExpandOperator = ExpandOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ExpandSubscriber = (function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        _super.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }
    ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.closed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            var result = tryCatch_1.tryCatch(this.project)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            }
            else {
                var state = { subscriber: this, result: result, value: value, index: index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return ExpandSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.ExpandSubscriber = ExpandSubscriber;
//# sourceMappingURL=expand.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/finally.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
/**
 * Returns an Observable that mirrors the source Observable, but will call a specified function when
 * the source terminates on complete or error.
 * @param {function} callback function to be called when source terminates.
 * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
 * @method finally
 * @owner Observable
 */
function _finally(callback) {
    return this.lift(new FinallyOperator(callback));
}
exports._finally = _finally;
var FinallyOperator = (function () {
    function FinallyOperator(callback) {
        this.callback = callback;
    }
    FinallyOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new FinallySubscriber(subscriber, this.callback));
    };
    return FinallyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FinallySubscriber = (function (_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, callback) {
        _super.call(this, destination);
        this.add(new Subscription_1.Subscription(callback));
    }
    return FinallySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=finally.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/find.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/* tslint:disable:max-line-length */
/**
 * Emits only the first value emitted by the source Observable that meets some
 * condition.
 *
 * <span class="informal">Finds the first value that passes some test and emits
 * that.</span>
 *
 * <img src="./img/find.png" width="100%">
 *
 * `find` searches for the first item in the source Observable that matches the
 * specified condition embodied by the `predicate`, and returns the first
 * occurrence in the source. Unlike {@link first}, the `predicate` is required
 * in `find`, and does not emit an error if a valid value is not found.
 *
 * @example <caption>Find and emit the first click that happens on a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.find(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link first}
 * @see {@link findIndex}
 * @see {@link take}
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
 * A function called with each item to test for condition matching.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable<T>} An Observable of the first item that matches the
 * condition.
 * @method find
 * @owner Observable
 */
function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate is not a function');
    }
    return this.lift(new FindValueOperator(predicate, this, false, thisArg));
}
exports.find = find;
var FindValueOperator = (function () {
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
    }
    FindValueOperator.prototype.call = function (observer, source) {
        return source._subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
    };
    return FindValueOperator;
}());
exports.FindValueOperator = FindValueOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FindValueSubscriber = (function (_super) {
    __extends(FindValueSubscriber, _super);
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
        this.index = 0;
    }
    FindValueSubscriber.prototype.notifyComplete = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    FindValueSubscriber.prototype._next = function (value) {
        var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
        var index = this.index++;
        try {
            var result = predicate.call(thisArg || this, value, index, this.source);
            if (result) {
                this.notifyComplete(this.yieldIndex ? index : value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    FindValueSubscriber.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };
    return FindValueSubscriber;
}(Subscriber_1.Subscriber));
exports.FindValueSubscriber = FindValueSubscriber;
//# sourceMappingURL=find.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/findIndex.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var find_1 = __webpack_require__("./node_modules/rxjs/operator/find.js");
/**
 * Emits only the index of the first value emitted by the source Observable that
 * meets some condition.
 *
 * <span class="informal">It's like {@link find}, but emits the index of the
 * found value, not the value itself.</span>
 *
 * <img src="./img/findIndex.png" width="100%">
 *
 * `findIndex` searches for the first item in the source Observable that matches
 * the specified condition embodied by the `predicate`, and returns the
 * (zero-based) index of the first occurrence in the source. Unlike
 * {@link first}, the `predicate` is required in `findIndex`, and does not emit
 * an error if a valid value is not found.
 *
 * @example <caption>Emit the index of first click that happens on a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link first}
 * @see {@link take}
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
 * A function called with each item to test for condition matching.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of the index of the first item that
 * matches the condition.
 * @method find
 * @owner Observable
 */
function findIndex(predicate, thisArg) {
    return this.lift(new find_1.FindValueOperator(predicate, this, true, thisArg));
}
exports.findIndex = findIndex;
//# sourceMappingURL=findIndex.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/groupBy.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var Map_1 = __webpack_require__("./node_modules/rxjs/util/Map.js");
var FastMap_1 = __webpack_require__("./node_modules/rxjs/util/FastMap.js");
/* tslint:disable:max-line-length */
/**
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as `GroupedObservables`, one
 * {@link GroupedObservable} per group.
 *
 * <img src="./img/groupBy.png" width="100%">
 *
 * @param {function(value: T): K} keySelector a function that extracts the key
 * for each item.
 * @param {function(value: T): R} [elementSelector] a function that extracts the
 * return element for each item.
 * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
 * a function that returns an Observable to determine how long each group should
 * exist.
 * @return {Observable<GroupedObservable<K,R>>} an Observable that emits
 * GroupedObservables, each of which corresponds to a unique key value and each
 * of which emits those items from the source Observable that share that key
 * value.
 * @method groupBy
 * @owner Observable
 */
function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
}
exports.groupBy = groupBy;
var GroupByOperator = (function () {
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    };
    return GroupByOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var GroupBySubscriber = (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
        this.groups = null;
        this.attemptedToUnsubscribe = false;
        this.count = 0;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = value;
        }
        if (!group) {
            group = this.subjectSelector ? this.subjectSelector() : new Subject_1.Subject();
            groups.set(key, group);
            var groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, group));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed && !this.attemptedToUnsubscribe) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(Subscriber_1.Subscriber));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var GroupDurationSubscriber = (function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        _super.call(this);
        this.key = key;
        this.group = group;
        this.parent = parent;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this._complete();
    };
    GroupDurationSubscriber.prototype._error = function (err) {
        var group = this.group;
        if (!group.closed) {
            group.error(err);
        }
        this.parent.removeGroup(this.key);
    };
    GroupDurationSubscriber.prototype._complete = function () {
        var group = this.group;
        if (!group.closed) {
            group.complete();
        }
        this.parent.removeGroup(this.key);
    };
    return GroupDurationSubscriber;
}(Subscriber_1.Subscriber));
/**
 * An Observable representing values belonging to the same group represented by
 * a common key. The values emitted by a GroupedObservable come from the source
 * Observable. The common key is available as the field `key` on a
 * GroupedObservable instance.
 *
 * @class GroupedObservable<K, T>
 */
var GroupedObservable = (function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        _super.call(this);
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription_1.Subscription();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(Observable_1.Observable));
exports.GroupedObservable = GroupedObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerRefCountSubscription = (function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        _super.call(this);
        this.parent = parent;
        parent.count++;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(Subscription_1.Subscription));
//# sourceMappingURL=groupBy.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/ignoreElements.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var noop_1 = __webpack_require__("./node_modules/rxjs/util/noop.js");
/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * @return {Observable} an empty Observable that only calls `complete`
 * or `error`, based on which one is called by the source Observable.
 * @method ignoreElements
 * @owner Observable
 */
function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
exports.ignoreElements = ignoreElements;
;
var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
    }
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var IgnoreElementsSubscriber = (function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        _super.apply(this, arguments);
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
        noop_1.noop();
    };
    return IgnoreElementsSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ignoreElements.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/isEmpty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
 *
 * <img src="./img/isEmpty.png" width="100%">
 *
 * @return {Observable} an Observable that emits a Boolean.
 * @method isEmpty
 * @owner Observable
 */
function isEmpty() {
    return this.lift(new IsEmptyOperator());
}
exports.isEmpty = isEmpty;
var IsEmptyOperator = (function () {
    function IsEmptyOperator() {
    }
    IsEmptyOperator.prototype.call = function (observer, source) {
        return source._subscribe(new IsEmptySubscriber(observer));
    };
    return IsEmptyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var IsEmptySubscriber = (function (_super) {
    __extends(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
        _super.call(this, destination);
    }
    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    };
    IsEmptySubscriber.prototype._next = function (value) {
        this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return IsEmptySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=isEmpty.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/let.js":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * @param func
 * @return {Observable<R>}
 * @method let
 * @owner Observable
 */
function letProto(func) {
    return func(this);
}
exports.letProto = letProto;
//# sourceMappingURL=let.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/mapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 *
 * <span class="informal">Like {@link map}, but it maps every source value to
 * the same output value every time.</span>
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * Takes a constant `value` as argument, and emits that whenever the source
 * Observable emits a value. In other words, ignores the actual source value,
 * and simply uses the emission moment to know when to emit the given `value`.
 *
 * @example <caption>Map every every click to the string 'Hi'</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var greetings = clicks.mapTo('Hi');
 * greetings.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {any} value The value to map each source value to.
 * @return {Observable} An Observable that emits the given `value` every time
 * the source Observable emits something.
 * @method mapTo
 * @owner Observable
 */
function mapTo(value) {
    return this.lift(new MapToOperator(value));
}
exports.mapTo = mapTo;
var MapToOperator = (function () {
    function MapToOperator(value) {
        this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapToSubscriber = (function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        _super.call(this, destination);
        this.value = value;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=mapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/materialize.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Notification_1 = __webpack_require__("./node_modules/rxjs/Notification.js");
/**
 * Represents all of the notifications from the source Observable as `next`
 * emissions marked with their original types within {@link Notification}
 * objects.
 *
 * <span class="informal">Wraps `next`, `error` and `complete` emissions in
 * {@link Notification} objects, emitted as `next` on the output Observable.
 * </span>
 *
 * <img src="./img/materialize.png" width="100%">
 *
 * `materialize` returns an Observable that emits a `next` notification for each
 * `next`, `error`, or `complete` emission of the source Observable. When the
 * source Observable emits `complete`, the output Observable will emit `next` as
 * a Notification of type "complete", and then it will emit `complete` as well.
 * When the source Observable emits `error`, the output will emit `next` as a
 * Notification of type "error", and then `complete`.
 *
 * This operator is useful for producing metadata of the source Observable, to
 * be consumed as `next` emissions. Use it in conjunction with
 * {@link dematerialize}.
 *
 * @example <caption>Convert a faulty Observable to an Observable of Notifications</caption>
 * var letters = Rx.Observable.of('a', 'b', 13, 'd');
 * var upperCase = letters.map(x => x.toUpperCase());
 * var materialized = upperCase.materialize();
 * materialized.subscribe(x => console.log(x));
 *
 * @see {@link Notification}
 * @see {@link dematerialize}
 *
 * @return {Observable<Notification<T>>} An Observable that emits
 * {@link Notification} objects that wrap the original emissions from the source
 * Observable with metadata.
 * @method materialize
 * @owner Observable
 */
function materialize() {
    return this.lift(new MaterializeOperator());
}
exports.materialize = materialize;
var MaterializeOperator = (function () {
    function MaterializeOperator() {
    }
    MaterializeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MaterializeSubscriber = (function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        _super.call(this, destination);
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification_1.Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=materialize.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/max.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var reduce_1 = __webpack_require__("./node_modules/rxjs/operator/reduce.js");
/**
 * The Max operator operates on an Observable that emits numbers (or items that can be evaluated as numbers),
 * and when source Observable completes it emits a single item: the item with the largest number.
 *
 * <img src="./img/max.png" width="100%">
 *
 * @param {Function} optional comparer function that it will use instead of its default to compare the value of two
 * items.
 * @return {Observable} an Observable that emits item with the largest number.
 * @method max
 * @owner Observable
 */
function max(comparer) {
    var max = (typeof comparer === 'function')
        ? function (x, y) { return comparer(x, y) > 0 ? x : y; }
        : function (x, y) { return x > y ? x : y; };
    return this.lift(new reduce_1.ReduceOperator(max));
}
exports.max = max;
//# sourceMappingURL=max.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/merge.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var mergeAll_1 = __webpack_require__("./node_modules/rxjs/operator/mergeAll.js");
var isScheduler_1 = __webpack_require__("./node_modules/rxjs/util/isScheduler.js");
/* tslint:disable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(mergeStatic.apply(void 0, [this].concat(observables)));
}
exports.merge = merge;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {...Observable} observables Input Observables to merge together.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1) {
        return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
}
exports.mergeStatic = mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/mergeMapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in the output Observable.
 *
 * <span class="informal">It's like {@link mergeMap}, but maps each value always
 * to the same inner Observable.</span>
 *
 * <img src="./img/mergeMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then merges those resulting Observables into one
 * single Observable, which is the output Observable.
 *
 * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 * @see {@link switchMapTo}
 *
 * @param {Observable} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable.
 * @method mergeMapTo
 * @owner Observable
 */
function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
}
exports.mergeMapTo = mergeMapTo;
// TODO: Figure out correct signature here: an Operator<Observable<T>, R>
//       needs to implement call(observer: Subscriber<R>): Subscriber<Observable<T>>
var MergeMapToOperator = (function () {
    function MergeMapToOperator(ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapToOperator.prototype.call = function (observer, source) {
        return source._subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
    };
    return MergeMapToOperator;
}());
exports.MergeMapToOperator = MergeMapToOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapToSubscriber = (function (_super) {
    __extends(MergeMapToSubscriber, _super);
    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapToSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var resultSelector = this.resultSelector;
            var index = this.index++;
            var ish = this.ish;
            var destination = this.destination;
            this.active++;
            this._innerSub(ish, destination, resultSelector, value, index);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapToSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    };
    MergeMapToSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        var result;
        try {
            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        destination.next(result);
    };
    MergeMapToSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapToSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapToSubscriber = MergeMapToSubscriber;
//# sourceMappingURL=mergeMapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/mergeScan.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
/**
 * @param project
 * @param seed
 * @param concurrent
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method mergeScan
 * @owner Observable
 */
function mergeScan(project, seed, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new MergeScanOperator(project, seed, concurrent));
}
exports.mergeScan = mergeScan;
var MergeScanOperator = (function () {
    function MergeScanOperator(project, seed, concurrent) {
        this.project = project;
        this.seed = seed;
        this.concurrent = concurrent;
    }
    MergeScanOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new MergeScanSubscriber(subscriber, this.project, this.seed, this.concurrent));
    };
    return MergeScanOperator;
}());
exports.MergeScanOperator = MergeScanOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeScanSubscriber = (function (_super) {
    __extends(MergeScanSubscriber, _super);
    function MergeScanSubscriber(destination, project, acc, concurrent) {
        _super.call(this, destination);
        this.project = project;
        this.acc = acc;
        this.concurrent = concurrent;
        this.hasValue = false;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeScanSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var index = this.index++;
            var ish = tryCatch_1.tryCatch(this.project)(this.acc, value);
            var destination = this.destination;
            if (ish === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeScanSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var destination = this.destination;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
    };
    MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    return MergeScanSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeScanSubscriber = MergeScanSubscriber;
//# sourceMappingURL=mergeScan.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/min.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var reduce_1 = __webpack_require__("./node_modules/rxjs/operator/reduce.js");
/**
 * The Min operator operates on an Observable that emits numbers (or items that can be evaluated as numbers),
 * and when source Observable completes it emits a single item: the item with the smallest number.
 *
 * <img src="./img/min.png" width="100%">
 *
 * @param {Function} optional comparer function that it will use instead of its default to compare the value of two items.
 * @return {Observable<R>} an Observable that emits item with the smallest number.
 * @method min
 * @owner Observable
 */
function min(comparer) {
    var min = (typeof comparer === 'function')
        ? function (x, y) { return comparer(x, y) < 0 ? x : y; }
        : function (x, y) { return x < y ? x : y; };
    return this.lift(new reduce_1.ReduceOperator(min));
}
exports.min = min;
//# sourceMappingURL=min.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/multicast.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ConnectableObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ConnectableObservable.js");
/* tslint:disable:max-line-length */
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} an Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
    }
    else {
        subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
        };
    }
    if (typeof selector === 'function') {
        return this.lift(new MulticastOperator(subjectFactory, selector));
    }
    var connectable = Object.create(this, ConnectableObservable_1.connectableObservableDescriptor);
    connectable.source = this;
    connectable.subjectFactory = subjectFactory;
    return connectable;
}
exports.multicast = multicast;
var MulticastOperator = (function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source._subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());
exports.MulticastOperator = MulticastOperator;
//# sourceMappingURL=multicast.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/onErrorResumeNext.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FromObservable_1 = __webpack_require__("./node_modules/rxjs/observable/FromObservable.js");
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
function onErrorResumeNext() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i - 0] = arguments[_i];
    }
    if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
        nextSources = nextSources[0];
    }
    return this.lift(new OnErrorResumeNextOperator(nextSources));
}
exports.onErrorResumeNext = onErrorResumeNext;
/* tslint:enable:max-line-length */
function onErrorResumeNextStatic() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i - 0] = arguments[_i];
    }
    var source = null;
    if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
        nextSources = nextSources[0];
    }
    source = nextSources.shift();
    return new FromObservable_1.FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
}
exports.onErrorResumeNextStatic = onErrorResumeNextStatic;
var OnErrorResumeNextOperator = (function () {
    function OnErrorResumeNextOperator(nextSources) {
        this.nextSources = nextSources;
    }
    OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
    };
    return OnErrorResumeNextOperator;
}());
var OnErrorResumeNextSubscriber = (function (_super) {
    __extends(OnErrorResumeNextSubscriber, _super);
    function OnErrorResumeNextSubscriber(destination, nextSources) {
        _super.call(this, destination);
        this.destination = destination;
        this.nextSources = nextSources;
    }
    OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._error = function (err) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._complete = function () {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
        var next = this.nextSources.shift();
        if (next) {
            this.add(subscribeToResult_1.subscribeToResult(this, next));
        }
        else {
            this.destination.complete();
        }
    };
    return OnErrorResumeNextSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/pairwise.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Groups pairs of consecutive emissions together and emits them as an array of
 * two values.
 *
 * <span class="informal">Puts the current value and previous value together as
 * an array, and emits that.</span>
 *
 * <img src="./img/pairwise.png" width="100%">
 *
 * The Nth emission from the source Observable will cause the output Observable
 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
 * pair. For this reason, `pairwise` emits on the second and subsequent
 * emissions from the source Observable, but not on the first emission, because
 * there is no previous value in that case.
 *
 * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var pairs = clicks.pairwise();
 * var distance = pairs.map(pair => {
 *   var x0 = pair[0].clientX;
 *   var y0 = pair[0].clientY;
 *   var x1 = pair[1].clientX;
 *   var y1 = pair[1].clientY;
 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
 * });
 * distance.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 *
 * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
 * consecutive values from the source Observable.
 * @method pairwise
 * @owner Observable
 */
function pairwise() {
    return this.lift(new PairwiseOperator());
}
exports.pairwise = pairwise;
var PairwiseOperator = (function () {
    function PairwiseOperator() {
    }
    PairwiseOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var PairwiseSubscriber = (function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        _super.call(this, destination);
        this.hasPrev = false;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        }
        else {
            this.hasPrev = true;
        }
        this.prev = value;
    };
    return PairwiseSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=pairwise.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/partition.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var not_1 = __webpack_require__("./node_modules/rxjs/util/not.js");
var filter_1 = __webpack_require__("./node_modules/rxjs/operator/filter.js");
/**
 * Splits the source Observable into two, one with values that satisfy a
 * predicate, and another with values that don't satisfy the predicate.
 *
 * <span class="informal">It's like {@link filter}, but returns two Observables:
 * one like the output of {@link filter}, and the other with values that did not
 * pass the condition.</span>
 *
 * <img src="./img/partition.png" width="100%">
 *
 * `partition` outputs an array with two Observables that partition the values
 * from the source Observable through the given `predicate` function. The first
 * Observable in that array emits source values for which the predicate argument
 * returns true. The second Observable emits source values for which the
 * predicate returns false. The first behaves like {@link filter} and the second
 * behaves like {@link filter} with the predicate negated.
 *
 * @example <caption>Partition click events into those on DIV elements and those elsewhere</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
 * var clicksOnDivs = parts[0];
 * var clicksElsewhere = parts[1];
 * clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
 * clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
 *
 * @see {@link filter}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted on the first Observable in the returned array, if
 * `false` the value is emitted on the second Observable in the array. The
 * `index` parameter is the number `i` for the i-th source emission that has
 * happened since the subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
 * with values that passed the predicate, and another with values that did not
 * pass the predicate.
 * @method partition
 * @owner Observable
 */
function partition(predicate, thisArg) {
    return [
        filter_1.filter.call(this, predicate, thisArg),
        filter_1.filter.call(this, not_1.not(predicate, thisArg))
    ];
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/pluck.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var map_1 = __webpack_require__("./node_modules/rxjs/operator/map.js");
/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * @example <caption>Map every every click to the tagName of the clicked target element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {...string} properties The nested properties to pluck from each source
 * value (an object).
 * @return {Observable} Returns a new Observable of property values from the
 * source values.
 * @method pluck
 * @owner Observable
 */
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
}
exports.pluck = pluck;
function plucker(props, length) {
    var mapper = function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
//# sourceMappingURL=pluck.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/publish.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var multicast_1 = __webpack_require__("./node_modules/rxjs/operator/multicast.js");
/* tslint:disable:max-line-length */
/**
 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
 * before it begins emitting items to those Observers that have subscribed to it.
 *
 * <img src="./img/publish.png" width="100%">
 *
 * @param {Function} Optional selector function which can use the multicasted source sequence as many times as needed,
 * without causing multiple subscriptions to the source sequence.
 * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
 * @return a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
 * @method publish
 * @owner Observable
 */
function publish(selector) {
    return selector ? multicast_1.multicast.call(this, function () { return new Subject_1.Subject(); }, selector) :
        multicast_1.multicast.call(this, new Subject_1.Subject());
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/publishBehavior.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
var multicast_1 = __webpack_require__("./node_modules/rxjs/operator/multicast.js");
/**
 * @param value
 * @return {ConnectableObservable<T>}
 * @method publishBehavior
 * @owner Observable
 */
function publishBehavior(value) {
    return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
}
exports.publishBehavior = publishBehavior;
//# sourceMappingURL=publishBehavior.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/publishLast.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AsyncSubject_1 = __webpack_require__("./node_modules/rxjs/AsyncSubject.js");
var multicast_1 = __webpack_require__("./node_modules/rxjs/operator/multicast.js");
/**
 * @return {ConnectableObservable<T>}
 * @method publishLast
 * @owner Observable
 */
function publishLast() {
    return multicast_1.multicast.call(this, new AsyncSubject_1.AsyncSubject());
}
exports.publishLast = publishLast;
//# sourceMappingURL=publishLast.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/publishReplay.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ReplaySubject_1 = __webpack_require__("./node_modules/rxjs/ReplaySubject.js");
var multicast_1 = __webpack_require__("./node_modules/rxjs/operator/multicast.js");
/**
 * @param bufferSize
 * @param windowTime
 * @param scheduler
 * @return {ConnectableObservable<T>}
 * @method publishReplay
 * @owner Observable
 */
function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
}
exports.publishReplay = publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/race.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables
 * @param {...Observables} ...observables sources used to race for which Observable emits first.
 * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
 * @method race
 * @owner Observable
 */
function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return this.lift.call(raceStatic.apply(void 0, [this].concat(observables)));
}
exports.race = race;
function raceStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        else {
            return observables[0];
        }
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
}
exports.raceStatic = raceStatic;
var RaceOperator = (function () {
    function RaceOperator() {
    }
    RaceOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RaceSubscriber(subscriber));
    };
    return RaceOperator;
}());
exports.RaceOperator = RaceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RaceSubscriber = (function (_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        _super.call(this, destination);
        this.hasFirst = false;
        this.observables = [];
        this.subscriptions = [];
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                    this.add(subscription);
                }
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.RaceSubscriber = RaceSubscriber;
//# sourceMappingURL=race.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/repeat.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
/**
 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times,
 * on a particular Scheduler.
 *
 * <img src="./img/repeat.png" width="100%">
 *
 * @param {Scheduler} [scheduler] the Scheduler to emit the items on.
 * @param {number} [count] the number of times the source Observable items are repeated, a count of 0 will yield
 * an empty Observable.
 * @return {Observable} an Observable that repeats the stream of items emitted by the source Observable at most
 * count times.
 * @method repeat
 * @owner Observable
 */
function repeat(count) {
    if (count === void 0) { count = -1; }
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
    }
    else {
        return this.lift(new RepeatOperator(count - 1, this));
    }
}
exports.repeat = repeat;
var RepeatOperator = (function () {
    function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RepeatSubscriber = (function (_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
    }
    RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.complete.call(this);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            this.unsubscribe();
            this.isStopped = false;
            this.closed = false;
            source.subscribe(this);
        }
    };
    return RepeatSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=repeat.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/repeatWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Returns an Observable that emits the same values as the source observable with the exception of a `complete`.
 * A `complete` will cause the emission of the Throwable that cause the complete to the Observable returned from
 * notificationHandler. If that Observable calls onComplete or `complete` then retry will call `complete` or `error`
 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
 * Scheduler.
 *
 * <img src="./img/repeatWhen.png" width="100%">
 *
 * @param {notificationHandler} receives an Observable of notifications with which a user can `complete` or `error`,
 * aborting the retry.
 * @param {scheduler} the Scheduler on which to subscribe to the source Observable.
 * @return {Observable} the source Observable modified with retry logic.
 * @method repeatWhen
 * @owner Observable
 */
function repeatWhen(notifier) {
    return this.lift(new RepeatWhenOperator(notifier, this));
}
exports.repeatWhen = repeatWhen;
var RepeatWhenOperator = (function () {
    function RepeatWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    RepeatWhenOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RepeatWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RepeatWhenSubscriber = (function (_super) {
    __extends(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.source = source;
    }
    RepeatWhenSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var notifications = this.notifications;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
                notifications = new Subject_1.Subject();
                retries = tryCatch_1.tryCatch(this.notifier)(notifications);
                if (retries === errorObject_1.errorObject) {
                    return _super.prototype.complete.call(this);
                }
                retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
            }
            else {
                this.notifications = null;
                this.retriesSubscription = null;
            }
            this.unsubscribe();
            this.closed = false;
            this.notifications = notifications;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            notifications.next();
        }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, notifications = _a.notifications, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
        this.notifications = null;
        this.retries = null;
        this.retriesSubscription = null;
        this.unsubscribe();
        this.isStopped = false;
        this.closed = false;
        this.notifications = notifications;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
    };
    return RepeatWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=repeatWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/retry.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the
 * predicate returns true for that specific exception and retry count.
 * If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of
 * count resubscriptions (given as a number parameter) rather than propagating the `error` call.
 *
 * <img src="./img/retry.png" width="100%">
 *
 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @param {number} number of retry attempts before failing.
 * @return {Observable} the source Observable modified with the retry logic.
 * @method retry
 * @owner Observable
 */
function retry(count) {
    if (count === void 0) { count = -1; }
    return this.lift(new RetryOperator(count, this));
}
exports.retry = retry;
var RetryOperator = (function () {
    function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RetryOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RetrySubscriber(subscriber, this.count, this.source));
    };
    return RetryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RetrySubscriber = (function (_super) {
    __extends(RetrySubscriber, _super);
    function RetrySubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
    }
    RetrySubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.error.call(this, err);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            this.unsubscribe();
            this.isStopped = false;
            this.closed = false;
            source.subscribe(this);
        }
    };
    return RetrySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=retry.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/retryWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
 * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
 * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
 * Scheduler.
 *
 * <img src="./img/retryWhen.png" width="100%">
 *
 * @param {notificationHandler} receives an Observable of notifications with which a user can `complete` or `error`,
 * aborting the retry.
 * @param {scheduler} the Scheduler on which to subscribe to the source Observable.
 * @return {Observable} the source Observable modified with retry logic.
 * @method retryWhen
 * @owner Observable
 */
function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}
exports.retryWhen = retryWhen;
var RetryWhenOperator = (function () {
    function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RetryWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RetryWhenSubscriber = (function (_super) {
    __extends(RetryWhenSubscriber, _super);
    function RetryWhenSubscriber(destination, notifier, source) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var errors = this.errors;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
                errors = new Subject_1.Subject();
                retries = tryCatch_1.tryCatch(this.notifier)(errors);
                if (retries === errorObject_1.errorObject) {
                    return _super.prototype.error.call(this, errorObject_1.errorObject.e);
                }
                retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
            }
            else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this.unsubscribe();
            this.closed = false;
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
        }
    };
    RetryWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
        if (errors) {
            errors.unsubscribe();
            this.errors = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, errors = _a.errors, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
        this.errors = null;
        this.retries = null;
        this.retriesSubscription = null;
        this.unsubscribe();
        this.isStopped = false;
        this.closed = false;
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
    };
    return RetryWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=retryWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/sample.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Emits the most recently emitted value from the source Observable whenever
 * another Observable, the `notifier`, emits.
 *
 * <span class="informal">It's like {@link sampleTime}, but samples whenever
 * the `notifier` Observable emits something.</span>
 *
 * <img src="./img/sample.png" width="100%">
 *
 * Whenever the `notifier` Observable emits a value or completes, `sample`
 * looks at the source Observable and emits whichever value it has most recently
 * emitted since the previous sampling, unless the source has not emitted
 * anything since the previous sampling. The `notifier` is subscribed to as soon
 * as the output Observable is subscribed.
 *
 * @example <caption>On every click, sample the most recent "seconds" timer</caption>
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = seconds.sample(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounce}
 * @see {@link sampleTime}
 * @see {@link throttle}
 *
 * @param {Observable<any>} notifier The Observable to use for sampling the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the results of sampling the
 * values emitted by the source Observable whenever the notifier Observable
 * emits value or completes.
 * @method sample
 * @owner Observable
 */
function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
}
exports.sample = sample;
var SampleOperator = (function () {
    function SampleOperator(notifier) {
        this.notifier = notifier;
    }
    SampleOperator.prototype.call = function (subscriber, source) {
        var sampleSubscriber = new SampleSubscriber(subscriber);
        var subscription = source._subscribe(sampleSubscriber);
        subscription.add(subscribeToResult_1.subscribeToResult(sampleSubscriber, this.notifier));
        return subscription;
    };
    return SampleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SampleSubscriber = (function (_super) {
    __extends(SampleSubscriber, _super);
    function SampleSubscriber() {
        _super.apply(this, arguments);
        this.hasValue = false;
    }
    SampleSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    SampleSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    SampleSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    };
    return SampleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=sample.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/sampleTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
/**
 * Emits the most recently emitted value from the source Observable within
 * periodic time intervals.
 *
 * <span class="informal">Samples the source Observable at periodic time
 * intervals, emitting what it samples.</span>
 *
 * <img src="./img/sampleTime.png" width="100%">
 *
 * `sampleTime` periodically looks at the source Observable and emits whichever
 * value it has most recently emitted since the previous sampling, unless the
 * source has not emitted anything since the previous sampling. The sampling
 * happens periodically in time every `period` milliseconds (or the time unit
 * defined by the optional `scheduler` argument). The sampling starts as soon as
 * the output Observable is subscribed.
 *
 * @example <caption>Every second, emit the most recent click at most once</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.sampleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {number} period The sampling period expressed in milliseconds or the
 * time unit determined internally by the optional `scheduler`.
 * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
 * managing the timers that handle the sampling.
 * @return {Observable<T>} An Observable that emits the results of sampling the
 * values emitted by the source Observable at the specified time interval.
 * @method sampleTime
 * @owner Observable
 */
function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new SampleTimeOperator(period, scheduler));
}
exports.sampleTime = sampleTime;
var SampleTimeOperator = (function () {
    function SampleTimeOperator(period, scheduler) {
        this.period = period;
        this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
    };
    return SampleTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SampleTimeSubscriber = (function (_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, period, scheduler) {
        _super.call(this, destination);
        this.period = period;
        this.scheduler = scheduler;
        this.hasValue = false;
        this.add(scheduler.schedule(dispatchNotification, period, { subscriber: this, period: period }));
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNotification(state) {
    var subscriber = state.subscriber, period = state.period;
    subscriber.notifyNext();
    this.schedule(state, period);
}
//# sourceMappingURL=sampleTime.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/scan.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/* tslint:disable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    var hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=scan.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/sequenceEqual.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
/**
 * Compares all values of two observables in sequence using an optional comparor function
 * and returns an observable of a single boolean value representing whether or not the two sequences
 * are equal.
 *
 * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
 *
 * <img src="./img/sequenceEqual.png" width="100%">
 *
 * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
 * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
 * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
 * observables completes, the operator will wait for the other observable to complete; If the other
 * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
 * completes or emits after the other complets, the returned observable will never complete.
 *
 * @example <caption>figure out if the Konami code matches</caption>
 * var code = Observable.from([
 *  "ArrowUp",
 *  "ArrowUp",
 *  "ArrowDown",
 *  "ArrowDown",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "KeyB",
 *  "KeyA",
 *  "Enter" // no start key, clearly.
 * ]);
 *
 * var keys = Rx.Observable.fromEvent(document, 'keyup')
 *  .map(e => e.code);
 * var matches = keys.bufferCount(11, 1)
 *  .mergeMap(
 *    last11 =>
 *      Rx.Observable.from(last11)
 *        .sequenceEqual(code)
 *   );
 * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
 *
 * @see {@link combineLatest}
 * @see {@link zip}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} compareTo the observable sequence to compare the source sequence to.
 * @param {function} [comparor] An optional function to compare each value pair
 * @return {Observable} An Observable of a single boolean value representing whether or not
 * the values emitted by both observables were equal in sequence
 * @method sequenceEqual
 * @owner Observable
 */
function sequenceEqual(compareTo, comparor) {
    return this.lift(new SequenceEqualOperator(compareTo, comparor));
}
exports.sequenceEqual = sequenceEqual;
var SequenceEqualOperator = (function () {
    function SequenceEqualOperator(compareTo, comparor) {
        this.compareTo = compareTo;
        this.comparor = comparor;
    }
    SequenceEqualOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
    };
    return SequenceEqualOperator;
}());
exports.SequenceEqualOperator = SequenceEqualOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SequenceEqualSubscriber = (function (_super) {
    __extends(SequenceEqualSubscriber, _super);
    function SequenceEqualSubscriber(destination, compareTo, comparor) {
        _super.call(this, destination);
        this.compareTo = compareTo;
        this.comparor = comparor;
        this._a = [];
        this._b = [];
        this._oneComplete = false;
        this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, this)));
    }
    SequenceEqualSubscriber.prototype._next = function (value) {
        if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
        }
        else {
            this._a.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype._complete = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        }
        else {
            this._oneComplete = true;
        }
    };
    SequenceEqualSubscriber.prototype.checkValues = function () {
        var _c = this, _a = _c._a, _b = _c._b, comparor = _c.comparor;
        while (_a.length > 0 && _b.length > 0) {
            var a = _a.shift();
            var b = _b.shift();
            var areEqual = false;
            if (comparor) {
                areEqual = tryCatch_1.tryCatch(comparor)(a, b);
                if (areEqual === errorObject_1.errorObject) {
                    this.destination.error(errorObject_1.errorObject.e);
                }
            }
            else {
                areEqual = a === b;
            }
            if (!areEqual) {
                this.emit(false);
            }
        }
    };
    SequenceEqualSubscriber.prototype.emit = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    SequenceEqualSubscriber.prototype.nextB = function (value) {
        if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
        }
        else {
            this._b.push(value);
            this.checkValues();
        }
    };
    return SequenceEqualSubscriber;
}(Subscriber_1.Subscriber));
exports.SequenceEqualSubscriber = SequenceEqualSubscriber;
var SequenceEqualCompareToSubscriber = (function (_super) {
    __extends(SequenceEqualCompareToSubscriber, _super);
    function SequenceEqualCompareToSubscriber(destination, parent) {
        _super.call(this, destination);
        this.parent = parent;
    }
    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
        this.parent.nextB(value);
    };
    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    SequenceEqualCompareToSubscriber.prototype._complete = function () {
        this.parent._complete();
    };
    return SequenceEqualCompareToSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=sequenceEqual.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/share.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var multicast_1 = __webpack_require__("./node_modules/rxjs/operator/multicast.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .publish().refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
 * @method share
 * @owner Observable
 */
function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
}
exports.share = share;
;
//# sourceMappingURL=share.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/single.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var EmptyError_1 = __webpack_require__("./node_modules/rxjs/util/EmptyError.js");
/**
 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
 * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
 *
 * <img src="./img/single.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {Function} a predicate function to evaluate items emitted by the source Observable.
 * @return {Observable<T>} an Observable that emits the single item emitted by the source Observable that matches
 * the predicate.
 .
 * @method single
 * @owner Observable
 */
function single(predicate) {
    return this.lift(new SingleOperator(predicate, this));
}
exports.single = single;
var SingleOperator = (function () {
    function SingleOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    SingleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
    };
    return SingleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SingleSubscriber = (function (_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        }
        else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };
    SingleSubscriber.prototype._next = function (value) {
        var predicate = this.predicate;
        this.index++;
        if (predicate) {
            this.tryNext(value);
        }
        else {
            this.applySingleValue(value);
        }
    };
    SingleSubscriber.prototype.tryNext = function (value) {
        try {
            var result = this.predicate(value, this.index, this.source);
            if (result) {
                this.applySingleValue(value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return SingleSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=single.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/skip.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Returns an Observable that skips `n` items emitted by an Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
 * @return {Observable} an Observable that skips values emitted by the source Observable.
 *
 * @method skip
 * @owner Observable
 */
function skip(total) {
    return this.lift(new SkipOperator(total));
}
exports.skip = skip;
var SkipOperator = (function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipSubscriber = (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=skip.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/skipUntil.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
 *
 * <img src="./img/skipUntil.png" width="100%">
 *
 * @param {Observable} the second Observable that has to emit an item before the source Observable's elements begin to
 * be mirrored by the resulting Observable.
 * @return {Observable<T>} an Observable that skips items from the source Observable until the second Observable emits
 * an item, then emits the remaining items.
 * @method skipUntil
 * @owner Observable
 */
function skipUntil(notifier) {
    return this.lift(new SkipUntilOperator(notifier));
}
exports.skipUntil = skipUntil;
var SkipUntilOperator = (function () {
    function SkipUntilOperator(notifier) {
        this.notifier = notifier;
    }
    SkipUntilOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
    };
    return SkipUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipUntilSubscriber = (function (_super) {
    __extends(SkipUntilSubscriber, _super);
    function SkipUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.hasValue = false;
        this.isInnerStopped = false;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    SkipUntilSubscriber.prototype._next = function (value) {
        if (this.hasValue) {
            _super.prototype._next.call(this, value);
        }
    };
    SkipUntilSubscriber.prototype._complete = function () {
        if (this.isInnerStopped) {
            _super.prototype._complete.call(this);
        }
        else {
            this.unsubscribe();
        }
    };
    SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
    };
    SkipUntilSubscriber.prototype.notifyComplete = function () {
        this.isInnerStopped = true;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    return SkipUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=skipUntil.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/skipWhile.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
 * true, but emits all further source items as soon as the condition becomes false.
 *
 * <img src="./img/skipWhile.png" width="100%">
 *
 * @param {Function} predicate - a function to test each item emitted from the source Observable.
 * @return {Observable<T>} an Observable that begins emitting items emitted by the source Observable when the
 * specified predicate becomes false.
 * @method skipWhile
 * @owner Observable
 */
function skipWhile(predicate) {
    return this.lift(new SkipWhileOperator(predicate));
}
exports.skipWhile = skipWhile;
var SkipWhileOperator = (function () {
    function SkipWhileOperator(predicate) {
        this.predicate = predicate;
    }
    SkipWhileOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
    };
    return SkipWhileOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipWhileSubscriber = (function (_super) {
    __extends(SkipWhileSubscriber, _super);
    function SkipWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
    }
    SkipWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    };
    SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
        try {
            var result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    return SkipWhileSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=skipWhile.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/startWith.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var ScalarObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ScalarObservable.js");
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
var concat_1 = __webpack_require__("./node_modules/rxjs/operator/concat.js");
var isScheduler_1 = __webpack_require__("./node_modules/rxjs/util/isScheduler.js");
/* tslint:disable:max-line-length */
/**
 * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
 * source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * @param {Values} an Iterable that contains the items you want the modified Observable to emit first.
 * @return {Observable} an Observable that emits the items in the specified Iterable and then emits the items
 * emitted by the source Observable.
 * @method startWith
 * @owner Observable
 */
function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
    }
    var scheduler = array[array.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
    }
    else {
        scheduler = null;
    }
    var len = array.length;
    if (len === 1) {
        return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
    }
    else if (len > 1) {
        return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(array, scheduler), this);
    }
    else {
        return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), this);
    }
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/subscribeOn.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var SubscribeOnObservable_1 = __webpack_require__("./node_modules/rxjs/observable/SubscribeOnObservable.js");
/**
 * Asynchronously subscribes Observers to this Observable on the specified Scheduler.
 *
 * <img src="./img/subscribeOn.png" width="100%">
 *
 * @param {Scheduler} the Scheduler to perform subscription actions on.
 * @return {Observable<T>} the source Observable modified so that its subscriptions happen on the specified Scheduler
 .
 * @method subscribeOn
 * @owner Observable
 */
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
}
exports.subscribeOn = subscribeOn;
//# sourceMappingURL=subscribeOn.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/switch.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Converts a higher-order Observable into a first-order Observable by
 * subscribing to only the most recently emitted of those inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * previous inner Observable once a new one appears.</span>
 *
 * <img src="./img/switch.png" width="100%">
 *
 * `switch` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable subscribes to the inner Observable and
 * begins emitting the items emitted by that. So far, it behaves
 * like {@link mergeAll}. However, when a new inner Observable is emitted,
 * `switch` unsubscribes from the earlier-emitted inner Observable and
 * subscribes to the new inner Observable and begins emitting items from it. It
 * continues to behave like this for subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * // Each click event is mapped to an Observable that ticks every second
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var switched = higherOrder.switch();
 * // The outcome is that `switched` is essentially a timer that restarts
 * // on every click. The interval Observables from older clicks do not merge
 * // with the current interval Observable.
 * switched.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switchMap}
 * @see {@link switchMapTo}
 * @see {@link zipAll}
 *
 * @return {Observable<T>} An Observable that emits the items emitted by the
 * Observable most recently emitted by the source Observable.
 * @method switch
 * @name switch
 * @owner Observable
 */
function _switch() {
    return this.lift(new SwitchOperator());
}
exports._switch = _switch;
var SwitchOperator = (function () {
    function SwitchOperator() {
    }
    SwitchOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchSubscriber(subscriber));
    };
    return SwitchOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchSubscriber = (function (_super) {
    __extends(SwitchSubscriber, _super);
    function SwitchSubscriber(destination) {
        _super.call(this, destination);
        this.active = 0;
        this.hasCompleted = false;
    }
    SwitchSubscriber.prototype._next = function (value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, value));
    };
    SwitchSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    SwitchSubscriber.prototype.unsubscribeInner = function () {
        this.active = this.active > 0 ? this.active - 1 : 0;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
            this.remove(innerSubscription);
        }
    };
    SwitchSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    SwitchSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchSubscriber.prototype.notifyComplete = function () {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return SwitchSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switch.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/switchMap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/switchMapTo.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * Projects each source value to the same Observable which is flattened multiple
 * times with {@link switch} in the output Observable.
 *
 * <span class="informal">It's like {@link switchMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/switchMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. The output Observables
 * emits values only from the most recently emitted instance of
 * `innerObservable`.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link switch}
 * @see {@link switchMap}
 * @see {@link mergeMapTo}
 *
 * @param {Observable} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` every time a value is emitted on the source Observable.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable, and taking only the values
 * from the most recently projected inner Observable.
 * @method switchMapTo
 * @owner Observable
 */
function switchMapTo(innerObservable, resultSelector) {
    return this.lift(new SwitchMapToOperator(innerObservable, resultSelector));
}
exports.switchMapTo = switchMapTo;
var SwitchMapToOperator = (function () {
    function SwitchMapToOperator(observable, resultSelector) {
        this.observable = observable;
        this.resultSelector = resultSelector;
    }
    SwitchMapToOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
    };
    return SwitchMapToOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapToSubscriber = (function (_super) {
    __extends(SwitchMapToSubscriber, _super);
    function SwitchMapToSubscriber(destination, inner, resultSelector) {
        _super.call(this, destination);
        this.inner = inner;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapToSubscriber.prototype._next = function (value) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, this.index++));
    };
    SwitchMapToSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapToSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapToSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    };
    SwitchMapToSubscriber.prototype.tryResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        var result;
        try {
            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        destination.next(result);
    };
    return SwitchMapToSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMapTo.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/take.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var ArgumentOutOfRangeError_1 = __webpack_require__("./node_modules/rxjs/util/ArgumentOutOfRangeError.js");
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of `next` values to emit.
 * @return {Observable<T>} An Observable that emits only the first `count`
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @method take
 * @owner Observable
 */
function take(count) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(count));
    }
}
exports.take = take;
var TakeOperator = (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeSubscriber = (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=take.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/takeLast.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var ArgumentOutOfRangeError_1 = __webpack_require__("./node_modules/rxjs/util/ArgumentOutOfRangeError.js");
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
/**
 * Emits only the last `count` values emitted by the source Observable.
 *
 * <span class="informal">Remembers the latest `count` values, then emits those
 * only when the source completes.</span>
 *
 * <img src="./img/takeLast.png" width="100%">
 *
 * `takeLast` returns an Observable that emits at most the last `count` values
 * emitted by the source Observable. If the source emits fewer than `count`
 * values then all of its values are emitted. This operator must wait until the
 * `complete` notification emission from the source in order to emit the `next`
 * values on the output Observable, because otherwise it is impossible to know
 * whether or not more values will be emitted on the source. For this reason,
 * all values are emitted synchronously, followed by the complete notification.
 *
 * @example <caption>Take the last 3 values of an Observable with many values</caption>
 * var many = Rx.Observable.range(1, 100);
 * var lastThree = many.takeLast(3);
 * lastThree.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of values to emit from the end of
 * the sequence of values emitted by the source Observable.
 * @return {Observable<T>} An Observable that emits at most the last count
 * values emitted by the source Observable.
 * @method takeLast
 * @owner Observable
 */
function takeLast(count) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeLastOperator(count));
    }
}
exports.takeLast = takeLast;
var TakeLastOperator = (function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeLastSubscriber = (function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=takeLast.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/takeUntil.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=takeUntil.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/takeWhile.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Emits values emitted by the source Observable so long as each value satisfies
 * the given `predicate`, and then completes as soon as this `predicate` is not
 * satisfied.
 *
 * <span class="informal">Takes values from the source only while they pass the
 * condition given. When the first value does not satisfy, it completes.</span>
 *
 * <img src="./img/takeWhile.png" width="100%">
 *
 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
 * emitted on the source is given to the `predicate` function which returns a
 * boolean, representing a condition to be satisfied by the source values. The
 * output Observable emits the source values until such time as the `predicate`
 * returns false, at which point `takeWhile` stops mirroring the source
 * Observable and completes the output Observable.
 *
 * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.takeWhile(ev => ev.clientX > 200);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates a value emitted by the source Observable and returns a boolean.
 * Also takes the (zero-based) index as the second argument.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable so long as each value satisfies the condition defined by the
 * `predicate`, then completes.
 * @method takeWhile
 * @owner Observable
 */
function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
}
exports.takeWhile = takeWhile;
var TakeWhileOperator = (function () {
    function TakeWhileOperator(predicate) {
        this.predicate = predicate;
    }
    TakeWhileOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
    };
    return TakeWhileOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeWhileSubscriber = (function (_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.index = 0;
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;
        try {
            result = this.predicate(value, this.index++);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        }
        else {
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=takeWhile.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/throttle.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link throttleTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/throttle.png" width="100%">
 *
 * `throttle` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled by calling the `durationSelector` function with the source value,
 * which returns the "duration" Observable. When the duration Observable emits a
 * value or completes, the timer is disabled, and this process repeats for the
 * next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {function(value: T): Observable|Promise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttle
 * @owner Observable
 */
function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
}
exports.throttle = throttle;
var ThrottleOperator = (function () {
    function ThrottleOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
    };
    return ThrottleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ThrottleSubscriber = (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.destination = destination;
        this.durationSelector = durationSelector;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
            this.tryDurationSelector(value);
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        var duration = null;
        try {
            duration = this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.emitAndThrottle(value, duration);
    };
    ThrottleSubscriber.prototype.emitAndThrottle = function (value, duration) {
        this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
        this.destination.next(value);
    };
    ThrottleSubscriber.prototype._unsubscribe = function () {
        var throttled = this.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._unsubscribe();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this._unsubscribe();
    };
    return ThrottleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=throttle.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/throttleTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for `duration` milliseconds, then repeats this process.
 *
 * <span class="informal">Lets a value pass, then ignores source values for the
 * next `duration` milliseconds.</span>
 *
 * <img src="./img/throttleTime.png" width="100%">
 *
 * `throttleTime` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled. After `duration` milliseconds (or the time unit determined
 * internally by the optional `scheduler`) has passed, the timer is disabled,
 * and this process repeats for the next source value. Optionally takes a
 * {@link Scheduler} for managing timers.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttle}
 *
 * @param {number} duration Time to wait before emitting another value after
 * emitting the last value, measured in milliseconds or the time unit determined
 * internally by the optional `scheduler`.
 * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
 * managing the timers that handle the sampling.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttleTime
 * @owner Observable
 */
function throttleTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new ThrottleTimeOperator(duration, scheduler));
}
exports.throttleTime = throttleTime;
var ThrottleTimeOperator = (function () {
    function ThrottleTimeOperator(duration, scheduler) {
        this.duration = duration;
        this.scheduler = scheduler;
    }
    ThrottleTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
    };
    return ThrottleTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ThrottleTimeSubscriber = (function (_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, duration, scheduler) {
        _super.call(this, destination);
        this.duration = duration;
        this.scheduler = scheduler;
    }
    ThrottleTimeSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
            this.destination.next(value);
        }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
}
//# sourceMappingURL=throttleTime.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/timeInterval.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
/**
 * @param scheduler
 * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timeInterval
 * @owner Observable
 */
function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new TimeIntervalOperator(scheduler));
}
exports.timeInterval = timeInterval;
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
exports.TimeInterval = TimeInterval;
;
var TimeIntervalOperator = (function () {
    function TimeIntervalOperator(scheduler) {
        this.scheduler = scheduler;
    }
    TimeIntervalOperator.prototype.call = function (observer, source) {
        return source._subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
    };
    return TimeIntervalOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeIntervalSubscriber = (function (_super) {
    __extends(TimeIntervalSubscriber, _super);
    function TimeIntervalSubscriber(destination, scheduler) {
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.lastTime = 0;
        this.lastTime = scheduler.now();
    }
    TimeIntervalSubscriber.prototype._next = function (value) {
        var now = this.scheduler.now();
        var span = now - this.lastTime;
        this.lastTime = now;
        this.destination.next(new TimeInterval(value, span));
    };
    return TimeIntervalSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=timeInterval.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/timeout.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var isDate_1 = __webpack_require__("./node_modules/rxjs/util/isDate.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var TimeoutError_1 = __webpack_require__("./node_modules/rxjs/util/TimeoutError.js");
/**
 * @param due
 * @param errorToSend
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method timeout
 * @owner Observable
 */
function timeout(due, errorToSend, scheduler) {
    if (errorToSend === void 0) { errorToSend = null; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    var error = errorToSend || new TimeoutError_1.TimeoutError();
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, error, scheduler));
}
exports.timeout = timeout;
var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
    }
    TimeoutOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler));
    };
    return TimeoutOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeoutSubscriber = (function (_super) {
    __extends(TimeoutSubscriber, _super);
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
        _super.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutSubscriber.prototype, "previousIndex", {
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeoutSubscriber.prototype, "hasCompleted", {
        get: function () {
            return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
    });
    TimeoutSubscriber.dispatchTimeout = function (state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.notifyTimeout();
        }
    };
    TimeoutSubscriber.prototype.scheduleTimeout = function () {
        var currentIndex = this.index;
        this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
        this.index++;
        this._previousIndex = currentIndex;
    };
    TimeoutSubscriber.prototype._next = function (value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
    };
    TimeoutSubscriber.prototype._error = function (err) {
        this.destination.error(err);
        this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype._complete = function () {
        this.destination.complete();
        this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype.notifyTimeout = function () {
        this.error(this.errorToSend);
    };
    return TimeoutSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=timeout.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/timeoutWith.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var isDate_1 = __webpack_require__("./node_modules/rxjs/util/isDate.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * @param due
 * @param withObservable
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method timeoutWith
 * @owner Observable
 */
function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}
exports.timeoutWith = timeoutWith;
var TimeoutWithOperator = (function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    TimeoutWithOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    };
    return TimeoutWithOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeoutWithSubscriber = (function (_super) {
    __extends(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _super.call(this);
        this.destination = destination;
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.timeoutSubscription = undefined;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        destination.add(this);
        this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
        get: function () {
            return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
    });
    TimeoutWithSubscriber.dispatchTimeout = function (state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.handleTimeout();
        }
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
        var currentIndex = this.index;
        var timeoutState = { subscriber: this, index: currentIndex };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
        this.index++;
        this._previousIndex = currentIndex;
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
    };
    TimeoutWithSubscriber.prototype._error = function (err) {
        this.destination.error(err);
        this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype._complete = function () {
        this.destination.complete();
        this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype.handleTimeout = function () {
        if (!this.closed) {
            var withObservable = this.withObservable;
            this.unsubscribe();
            this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
        }
    };
    return TimeoutWithSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=timeoutWith.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/timestamp.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
/**
 * @param scheduler
 * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timestamp
 * @owner Observable
 */
function timestamp(scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new TimestampOperator(scheduler));
}
exports.timestamp = timestamp;
var Timestamp = (function () {
    function Timestamp(value, timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }
    return Timestamp;
}());
exports.Timestamp = Timestamp;
;
var TimestampOperator = (function () {
    function TimestampOperator(scheduler) {
        this.scheduler = scheduler;
    }
    TimestampOperator.prototype.call = function (observer, source) {
        return source._subscribe(new TimestampSubscriber(observer, this.scheduler));
    };
    return TimestampOperator;
}());
var TimestampSubscriber = (function (_super) {
    __extends(TimestampSubscriber, _super);
    function TimestampSubscriber(destination, scheduler) {
        _super.call(this, destination);
        this.scheduler = scheduler;
    }
    TimestampSubscriber.prototype._next = function (value) {
        var now = this.scheduler.now();
        this.destination.next(new Timestamp(value, now));
    };
    return TimestampSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=timestamp.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/toArray.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
 * @method toArray
 * @owner Observable
 */
function toArray() {
    return this.lift(new ToArrayOperator());
}
exports.toArray = toArray;
var ToArrayOperator = (function () {
    function ToArrayOperator() {
    }
    ToArrayOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ToArraySubscriber(subscriber));
    };
    return ToArrayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ToArraySubscriber = (function (_super) {
    __extends(ToArraySubscriber, _super);
    function ToArraySubscriber(destination) {
        _super.call(this, destination);
        this.array = [];
    }
    ToArraySubscriber.prototype._next = function (x) {
        this.array.push(x);
    };
    ToArraySubscriber.prototype._complete = function () {
        this.destination.next(this.array);
        this.destination.complete();
    };
    return ToArraySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=toArray.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/window.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Branch out the source Observable values as a nested Observable whenever
 * `windowBoundaries` emits.
 *
 * <span class="informal">It's like {@link buffer}, but emits a nested Observable
 * instead of an array.</span>
 *
 * <img src="./img/window.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping
 * windows. It emits the current window and opens a new one whenever the
 * Observable `windowBoundaries` emits an item. Because each window is an
 * Observable, the output is a higher-order Observable.
 *
 * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var result = clicks.window(interval)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link buffer}
 *
 * @param {Observable<any>} windowBoundaries An Observable that completes the
 * previous window and starts a new window.
 * @return {Observable<Observable<T>>} An Observable of windows, which are
 * Observables emitting values of the source Observable.
 * @method window
 * @owner Observable
 */
function window(windowBoundaries) {
    return this.lift(new WindowOperator(windowBoundaries));
}
exports.window = window;
var WindowOperator = (function () {
    function WindowOperator(windowBoundaries) {
        this.windowBoundaries = windowBoundaries;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        var windowSubscriber = new WindowSubscriber(subscriber);
        var sourceSubscription = source._subscribe(windowSubscriber);
        if (!sourceSubscription.closed) {
            windowSubscriber.add(subscribeToResult_1.subscribeToResult(windowSubscriber, this.windowBoundaries));
        }
        return sourceSubscription;
    };
    return WindowOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowSubscriber = (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination) {
        _super.call(this, destination);
        this.window = new Subject_1.Subject();
        destination.next(this.window);
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow();
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this._complete();
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
    };
    WindowSubscriber.prototype._unsubscribe = function () {
        this.window = null;
    };
    WindowSubscriber.prototype.openWindow = function () {
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var destination = this.destination;
        var newWindow = this.window = new Subject_1.Subject();
        destination.next(newWindow);
    };
    return WindowSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=window.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/windowCount.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
/**
 * Branch out the source Observable values as a nested Observable with each
 * nested Observable emitting at most `windowSize` values.
 *
 * <span class="informal">It's like {@link bufferCount}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowCount.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows every `startWindowEvery`
 * items, each containing no more than `windowSize` items. When the source
 * Observable completes or encounters an error, the output Observable emits
 * the current window and propagates the notification from the source
 * Observable. If `startWindowEvery` is not provided, then new windows are
 * started immediately at the start of the source and when each window completes
 * with size `windowSize`.
 *
 * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(3)
 *   .map(win => win.skip(1)) // skip first of every 3 clicks
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(2, 3)
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link bufferCount}
 *
 * @param {number} windowSize The maximum number of values emitted by each
 * window.
 * @param {number} [startWindowEvery] Interval at which to start a new window.
 * For example if `startWindowEvery` is `2`, then a new window will be started
 * on every other value from the source. A new window is started at the
 * beginning of the source by default.
 * @return {Observable<Observable<T>>} An Observable of windows, which in turn
 * are Observable of values.
 * @method windowCount
 * @owner Observable
 */
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
exports.windowCount = windowCount;
var WindowCountOperator = (function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowCountSubscriber = (function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new Subject_1.Subject()];
        this.count = 0;
        destination.next(this.windows[0]);
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new Subject_1.Subject();
            windows.push(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
    };
    return WindowCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=windowCount.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/windowTime.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Branch out the source Observable values as a nested Observable periodically
 * in time.
 *
 * <span class="informal">It's like {@link bufferTime}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowTime.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable starts a new window periodically, as
 * determined by the `windowCreationInterval` argument. It emits each window
 * after a fixed timespan, specified by the `windowTimeSpan` argument. When the
 * source Observable completes or encounters an error, the output Observable
 * emits the current window and propagates the notification from the source
 * Observable. If `windowCreationInterval` is not provided, the output
 * Observable starts a new window when the previous window of duration
 * `windowTimeSpan` completes.
 *
 * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Every 5 seconds start a window 1 second long, and emit at most 2 click events per window</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000, 5000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link bufferTime}
 *
 * @param {number} windowTimeSpan The amount of time to fill each window.
 * @param {number} [windowCreationInterval] The interval at which to start new
 * windows.
 * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
 * intervals that determine window boundaries.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowTime
 * @owner Observable
 */
function windowTime(windowTimeSpan, windowCreationInterval, scheduler) {
    if (windowCreationInterval === void 0) { windowCreationInterval = null; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
}
exports.windowTime = windowTime;
var WindowTimeOperator = (function () {
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
    }
    WindowTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler));
    };
    return WindowTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowTimeSubscriber = (function (_super) {
    __extends(WindowTimeSubscriber, _super);
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
        this.windows = [];
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var window_1 = this.openWindow();
            var closeState = { subscriber: this, window: window_1, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: this, scheduler: scheduler };
            this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        }
        else {
            var window_2 = this.openWindow();
            var timeSpanOnlyState = { subscriber: this, window: window_2, windowTimeSpan: windowTimeSpan };
            this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
    }
    WindowTimeSubscriber.prototype._next = function (value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            var window_3 = windows[i];
            if (!window_3.closed) {
                window_3.next(value);
            }
        }
    };
    WindowTimeSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowTimeSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            var window_4 = windows.shift();
            if (!window_4.closed) {
                window_4.complete();
            }
        }
        this.destination.complete();
    };
    WindowTimeSubscriber.prototype.openWindow = function () {
        var window = new Subject_1.Subject();
        this.windows.push(window);
        var destination = this.destination;
        destination.next(window);
        return window;
    };
    WindowTimeSubscriber.prototype.closeWindow = function (window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    };
    return WindowTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
    if (window) {
        window.complete();
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
    var window = subscriber.openWindow();
    var action = this;
    var context = { action: action, subscription: null };
    var timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
function dispatchWindowClose(arg) {
    var subscriber = arg.subscriber, window = arg.window, context = arg.context;
    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}
//# sourceMappingURL=windowTime.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/windowToggle.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Branch out the source Observable values as a nested Observable starting from
 * an emission from `openings` and ending when the output of `closingSelector`
 * emits.
 *
 * <span class="informal">It's like {@link bufferToggle}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowToggle.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows that contain those items
 * emitted by the source Observable between the time when the `openings`
 * Observable emits an item and when the Observable returned by
 * `closingSelector` emits an item.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var result = clicks.windowToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * ).mergeAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowWhen}
 * @see {@link bufferToggle}
 *
 * @param {Observable<O>} openings An observable of notifications to start new
 * windows.
 * @param {function(value: O): Observable} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns an Observable,
 * which, when it emits (either `next` or `complete`), signals that the
 * associated window should complete.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowToggle
 * @owner Observable
 */
function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}
exports.windowToggle = windowToggle;
var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowToggleSubscriber = (function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openSubscription = subscribeToResult_1.subscribeToResult(this, openings, openings));
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.error(err);
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.complete();
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.unsubscribe();
                context.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingSelector = this.closingSelector;
            var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
            if (closingNotifier === errorObject_1.errorObject) {
                return this.error(errorObject_1.errorObject.e);
            }
            else {
                var window_1 = new Subject_1.Subject();
                var subscription = new Subscription_1.Subscription();
                var context = { window: window_1, subscription: subscription };
                this.contexts.push(context);
                var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                }
                else {
                    innerSubscription.context = context;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
        }
        else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window, subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=windowToggle.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/windowWhen.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Branch out the source Observable values as a nested Observable using a
 * factory function of closing Observables to determine when to start a new
 * window.
 *
 * <span class="informal">It's like {@link bufferWhen}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowWhen.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping windows.
 * It emits the current window and opens a new one whenever the Observable
 * produced by the specified `closingSelector` function emits an item. The first
 * window is opened immediately when subscribing to the output Observable.
 *
 * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks
 *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link bufferWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals (on either `next` or
 * `complete`) when to close the previous window and start a new one.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowWhen
 * @owner Observable
 */
function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
}
exports.windowWhen = windowWhen;
var WindowOperator = (function () {
    function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowSubscriber(subscriber, this.closingSelector));
    };
    return WindowOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowSubscriber = (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.destination = destination;
        this.closingSelector = closingSelector;
        this.openWindow();
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
        if (this.closingNotification) {
            this.closingNotification.unsubscribe();
        }
    };
    WindowSubscriber.prototype.openWindow = function (innerSub) {
        if (innerSub === void 0) { innerSub = null; }
        if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var window = this.window = new Subject_1.Subject();
        this.destination.next(window);
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            var err = errorObject_1.errorObject.e;
            this.destination.error(err);
            this.window.error(err);
        }
        else {
            this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
        }
    };
    return WindowSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=windowWhen.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/withLatestFrom.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:disable:max-line-length */
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 *
 * @param {Observable} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Function} [project] Projection function for combining values
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method withLatestFrom
 * @owner Observable
 */
function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var project;
    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
}
exports.withLatestFrom = withLatestFrom;
var WithLatestFromOperator = (function () {
    function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WithLatestFromSubscriber = (function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        _super.call(this, destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        var len = observables.length;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
                this._tryProject(args);
            }
            else {
                this.destination.next(args);
            }
        }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return WithLatestFromSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=withLatestFrom.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/zip.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var iterator_1 = __webpack_require__("./node_modules/rxjs/symbol/iterator.js");
/* tslint:disable:max-line-length */
/**
 * @param observables
 * @return {Observable<R>}
 * @method zip
 * @owner Observable
 */
function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(zipStatic.apply(void 0, [this].concat(observables)));
}
exports.zipProto = zipProto;
/* tslint:enable:max-line-length */
/**
 * @param observables
 * @return {Observable<R>}
 * @static true
 * @name zip
 * @owner Observable
 */
function zipStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
}
exports.zipStatic = zipStatic;
var ZipOperator = (function () {
    function ZipOperator(project) {
        this.project = project;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ZipSubscriber(subscriber, this.project));
    };
    return ZipOperator;
}());
exports.ZipOperator = ZipOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ZipSubscriber = (function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, project, values) {
        if (values === void 0) { values = Object.create(null); }
        _super.call(this, destination);
        this.iterators = [];
        this.active = 0;
        this.project = (typeof project === 'function') ? project : null;
        this.values = values;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (isArray_1.isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[iterator_1.$$iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator_1.$$iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            }
            else {
                this.active--; // not an observable
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        // abort if not all of them have values
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            // check to see if it's completed now that you've gotten
            // the next value.
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.project) {
            this._tryProject(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(Subscriber_1.Subscriber));
exports.ZipSubscriber = ZipSubscriber;
var StaticIterator = (function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}());
var StaticArrayIterator = (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator_1.$$iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ZipBufferIterator = (function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        _super.call(this, destination);
        this.parent = parent;
        this.observable = observable;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
    }
    ZipBufferIterator.prototype[iterator_1.$$iterator] = function () {
        return this;
    };
    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
    //    this is legit because `next()` will never be called by a subscription in this case.
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=zip.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/zipAll.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var zip_1 = __webpack_require__("./node_modules/rxjs/operator/zip.js");
/**
 * @param project
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method zipAll
 * @owner Observable
 */
function zipAll(project) {
    return this.lift(new zip_1.ZipOperator(project));
}
exports.zipAll = zipAll;
//# sourceMappingURL=zipAll.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/Action.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AnimationFrameAction.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncAction.js");
var AnimationFrame_1 = __webpack_require__("./node_modules/rxjs/util/AnimationFrame.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AnimationFrameAction = (function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        scheduler.actions.push(this);
        // If an animation frame has already been requested, don't request another
        // one. If an animation frame hasn't been requested yet, request one. Return
        // the current animation frame request id.
        return scheduler.scheduled || (scheduler.scheduled = AnimationFrame_1.AnimationFrame.requestAnimationFrame(scheduler.flush.bind(scheduler, null)));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested animation frame and
        // set the scheduled flag to undefined so the next AnimationFrameAction will
        // request its own.
        if (scheduler.actions.length === 0) {
            AnimationFrame_1.AnimationFrame.cancelAnimationFrame(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction_1.AsyncAction));
exports.AnimationFrameAction = AnimationFrameAction;
//# sourceMappingURL=AnimationFrameAction.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AnimationFrameScheduler.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncScheduler.js");
var AnimationFrameScheduler = (function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        _super.apply(this, arguments);
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AnimationFrameScheduler = AnimationFrameScheduler;
//# sourceMappingURL=AnimationFrameScheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AsapAction.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Immediate_1 = __webpack_require__("./node_modules/rxjs/util/Immediate.js");
var AsyncAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncAction.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        scheduler.actions.push(this);
        // If a microtask has already been scheduled, don't schedule another
        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
        // the current scheduled microtask id.
        return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested microtask and
        // set the scheduled flag to undefined so the next AsapAction will schedule
        // its own.
        if (scheduler.actions.length === 0) {
            Immediate_1.Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    };
    return AsapAction;
}(AsyncAction_1.AsyncAction));
exports.AsapAction = AsapAction;
//# sourceMappingURL=AsapAction.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AsapScheduler.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncScheduler.js");
var AsapScheduler = (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        _super.apply(this, arguments);
    }
    AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AsapScheduler = AsapScheduler;
//# sourceMappingURL=AsapScheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AsyncAction.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var Action_1 = __webpack_require__("./node_modules/rxjs/scheduler/Action.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.delay = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AsyncScheduler.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__("./node_modules/rxjs/Scheduler.js");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/QueueAction.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncAction.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/QueueScheduler.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncScheduler.js");
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;
//# sourceMappingURL=QueueScheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/VirtualTimeScheduler.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncAction.js");
var AsyncScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncScheduler.js");
var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        var _this = this;
        if (SchedulerAction === void 0) { SchedulerAction = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Number.POSITIVE_INFINITY; }
        _super.call(this, SchedulerAction, function () { return _this.frame; });
        this.maxFrames = maxFrames;
        this.frame = 0;
        this.index = -1;
    }
    /**
     * Prompt the Scheduler to execute all of its queued actions, therefore
     * clearing its queue.
     * @return {void}
     */
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.VirtualTimeScheduler = VirtualTimeScheduler;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = scheduler.index += 1; }
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.index = index;
        this.index = scheduler.index = index;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return !this.id ?
            _super.prototype.schedule.call(this, state, delay) : this.add(new VirtualAction(this.scheduler, this.work)).schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_1.AsyncAction));
exports.VirtualAction = VirtualAction;
//# sourceMappingURL=VirtualTimeScheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/animationFrame.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AnimationFrameAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AnimationFrameAction.js");
var AnimationFrameScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AnimationFrameScheduler.js");
exports.animationFrame = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
//# sourceMappingURL=animationFrame.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/asap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AsapAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsapAction.js");
var AsapScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsapScheduler.js");
exports.asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
//# sourceMappingURL=asap.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/async.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AsyncAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncAction.js");
var AsyncScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncScheduler.js");
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=async.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/queue.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var QueueAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/QueueAction.js");
var QueueScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/QueueScheduler.js");
exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
//# sourceMappingURL=queue.js.map

/***/ },

/***/ "./node_modules/rxjs/testing/ColdObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var SubscriptionLoggable_1 = __webpack_require__("./node_modules/rxjs/testing/SubscriptionLoggable.js");
var applyMixins_1 = __webpack_require__("./node_modules/rxjs/util/applyMixins.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ColdObservable = (function (_super) {
    __extends(ColdObservable, _super);
    function ColdObservable(messages, scheduler) {
        _super.call(this, function (subscriber) {
            var observable = this;
            var index = observable.logSubscribedFrame();
            subscriber.add(new Subscription_1.Subscription(function () {
                observable.logUnsubscribedFrame(index);
            }));
            observable.scheduleMessages(subscriber);
            return subscriber;
        });
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
    }
    ColdObservable.prototype.scheduleMessages = function (subscriber) {
        var messagesLength = this.messages.length;
        for (var i = 0; i < messagesLength; i++) {
            var message = this.messages[i];
            subscriber.add(this.scheduler.schedule(function (_a) {
                var message = _a.message, subscriber = _a.subscriber;
                message.notification.observe(subscriber);
            }, message.frame, { message: message, subscriber: subscriber }));
        }
    };
    return ColdObservable;
}(Observable_1.Observable));
exports.ColdObservable = ColdObservable;
applyMixins_1.applyMixins(ColdObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
//# sourceMappingURL=ColdObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/testing/HotObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var SubscriptionLoggable_1 = __webpack_require__("./node_modules/rxjs/testing/SubscriptionLoggable.js");
var applyMixins_1 = __webpack_require__("./node_modules/rxjs/util/applyMixins.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var HotObservable = (function (_super) {
    __extends(HotObservable, _super);
    function HotObservable(messages, scheduler) {
        _super.call(this);
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
    }
    HotObservable.prototype._subscribe = function (subscriber) {
        var subject = this;
        var index = subject.logSubscribedFrame();
        subscriber.add(new Subscription_1.Subscription(function () {
            subject.logUnsubscribedFrame(index);
        }));
        return _super.prototype._subscribe.call(this, subscriber);
    };
    HotObservable.prototype.setup = function () {
        var subject = this;
        var messagesLength = subject.messages.length;
        /* tslint:disable:no-var-keyword */
        for (var i = 0; i < messagesLength; i++) {
            (function () {
                var message = subject.messages[i];
                /* tslint:enable */
                subject.scheduler.schedule(function () { message.notification.observe(subject); }, message.frame);
            })();
        }
    };
    return HotObservable;
}(Subject_1.Subject));
exports.HotObservable = HotObservable;
applyMixins_1.applyMixins(HotObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
//# sourceMappingURL=HotObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/testing/SubscriptionLog.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var SubscriptionLog = (function () {
    function SubscriptionLog(subscribedFrame, unsubscribedFrame) {
        if (unsubscribedFrame === void 0) { unsubscribedFrame = Number.POSITIVE_INFINITY; }
        this.subscribedFrame = subscribedFrame;
        this.unsubscribedFrame = unsubscribedFrame;
    }
    return SubscriptionLog;
}());
exports.SubscriptionLog = SubscriptionLog;
//# sourceMappingURL=SubscriptionLog.js.map

/***/ },

/***/ "./node_modules/rxjs/testing/SubscriptionLoggable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var SubscriptionLog_1 = __webpack_require__("./node_modules/rxjs/testing/SubscriptionLog.js");
var SubscriptionLoggable = (function () {
    function SubscriptionLoggable() {
        this.subscriptions = [];
    }
    SubscriptionLoggable.prototype.logSubscribedFrame = function () {
        this.subscriptions.push(new SubscriptionLog_1.SubscriptionLog(this.scheduler.now()));
        return this.subscriptions.length - 1;
    };
    SubscriptionLoggable.prototype.logUnsubscribedFrame = function (index) {
        var subscriptionLogs = this.subscriptions;
        var oldSubscriptionLog = subscriptionLogs[index];
        subscriptionLogs[index] = new SubscriptionLog_1.SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
    };
    return SubscriptionLoggable;
}());
exports.SubscriptionLoggable = SubscriptionLoggable;
//# sourceMappingURL=SubscriptionLoggable.js.map

/***/ },

/***/ "./node_modules/rxjs/testing/TestScheduler.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var Notification_1 = __webpack_require__("./node_modules/rxjs/Notification.js");
var ColdObservable_1 = __webpack_require__("./node_modules/rxjs/testing/ColdObservable.js");
var HotObservable_1 = __webpack_require__("./node_modules/rxjs/testing/HotObservable.js");
var SubscriptionLog_1 = __webpack_require__("./node_modules/rxjs/testing/SubscriptionLog.js");
var VirtualTimeScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/VirtualTimeScheduler.js");
var defaultMaxFrame = 750;
var TestScheduler = (function (_super) {
    __extends(TestScheduler, _super);
    function TestScheduler(assertDeepEqual) {
        _super.call(this, VirtualTimeScheduler_1.VirtualAction, defaultMaxFrame);
        this.assertDeepEqual = assertDeepEqual;
        this.hotObservables = [];
        this.coldObservables = [];
        this.flushTests = [];
    }
    TestScheduler.prototype.createTime = function (marbles) {
        var indexOf = marbles.indexOf('|');
        if (indexOf === -1) {
            throw new Error('marble diagram for time should have a completion marker "|"');
        }
        return indexOf * TestScheduler.frameTimeFactor;
    };
    TestScheduler.prototype.createColdObservable = function (marbles, values, error) {
        if (marbles.indexOf('^') !== -1) {
            throw new Error('cold observable cannot have subscription offset "^"');
        }
        if (marbles.indexOf('!') !== -1) {
            throw new Error('cold observable cannot have unsubscription marker "!"');
        }
        var messages = TestScheduler.parseMarbles(marbles, values, error);
        var cold = new ColdObservable_1.ColdObservable(messages, this);
        this.coldObservables.push(cold);
        return cold;
    };
    TestScheduler.prototype.createHotObservable = function (marbles, values, error) {
        if (marbles.indexOf('!') !== -1) {
            throw new Error('hot observable cannot have unsubscription marker "!"');
        }
        var messages = TestScheduler.parseMarbles(marbles, values, error);
        var subject = new HotObservable_1.HotObservable(messages, this);
        this.hotObservables.push(subject);
        return subject;
    };
    TestScheduler.prototype.materializeInnerObservable = function (observable, outerFrame) {
        var _this = this;
        var messages = [];
        observable.subscribe(function (value) {
            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createNext(value) });
        }, function (err) {
            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createError(err) });
        }, function () {
            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createComplete() });
        });
        return messages;
    };
    TestScheduler.prototype.expectObservable = function (observable, unsubscriptionMarbles) {
        var _this = this;
        if (unsubscriptionMarbles === void 0) { unsubscriptionMarbles = null; }
        var actual = [];
        var flushTest = { actual: actual, ready: false };
        var unsubscriptionFrame = TestScheduler
            .parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
        var subscription;
        this.schedule(function () {
            subscription = observable.subscribe(function (x) {
                var value = x;
                // Support Observable-of-Observables
                if (x instanceof Observable_1.Observable) {
                    value = _this.materializeInnerObservable(value, _this.frame);
                }
                actual.push({ frame: _this.frame, notification: Notification_1.Notification.createNext(value) });
            }, function (err) {
                actual.push({ frame: _this.frame, notification: Notification_1.Notification.createError(err) });
            }, function () {
                actual.push({ frame: _this.frame, notification: Notification_1.Notification.createComplete() });
            });
        }, 0);
        if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
            this.schedule(function () { return subscription.unsubscribe(); }, unsubscriptionFrame);
        }
        this.flushTests.push(flushTest);
        return {
            toBe: function (marbles, values, errorValue) {
                flushTest.ready = true;
                flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
            }
        };
    };
    TestScheduler.prototype.expectSubscriptions = function (actualSubscriptionLogs) {
        var flushTest = { actual: actualSubscriptionLogs, ready: false };
        this.flushTests.push(flushTest);
        return {
            toBe: function (marbles) {
                var marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
                flushTest.ready = true;
                flushTest.expected = marblesArray.map(function (marbles) {
                    return TestScheduler.parseMarblesAsSubscriptions(marbles);
                });
            }
        };
    };
    TestScheduler.prototype.flush = function () {
        var hotObservables = this.hotObservables;
        while (hotObservables.length > 0) {
            hotObservables.shift().setup();
        }
        _super.prototype.flush.call(this);
        var readyFlushTests = this.flushTests.filter(function (test) { return test.ready; });
        while (readyFlushTests.length > 0) {
            var test = readyFlushTests.shift();
            this.assertDeepEqual(test.actual, test.expected);
        }
    };
    TestScheduler.parseMarblesAsSubscriptions = function (marbles) {
        if (typeof marbles !== 'string') {
            return new SubscriptionLog_1.SubscriptionLog(Number.POSITIVE_INFINITY);
        }
        var len = marbles.length;
        var groupStart = -1;
        var subscriptionFrame = Number.POSITIVE_INFINITY;
        var unsubscriptionFrame = Number.POSITIVE_INFINITY;
        for (var i = 0; i < len; i++) {
            var frame = i * this.frameTimeFactor;
            var c = marbles[i];
            switch (c) {
                case '-':
                case ' ':
                    break;
                case '(':
                    groupStart = frame;
                    break;
                case ')':
                    groupStart = -1;
                    break;
                case '^':
                    if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    subscriptionFrame = groupStart > -1 ? groupStart : frame;
                    break;
                case '!':
                    if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
                    break;
                default:
                    throw new Error('there can only be \'^\' and \'!\' markers in a ' +
                        'subscription marble diagram. Found instead \'' + c + '\'.');
            }
        }
        if (unsubscriptionFrame < 0) {
            return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame);
        }
        else {
            return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
        }
    };
    TestScheduler.parseMarbles = function (marbles, values, errorValue, materializeInnerObservables) {
        if (materializeInnerObservables === void 0) { materializeInnerObservables = false; }
        if (marbles.indexOf('!') !== -1) {
            throw new Error('conventional marble diagrams cannot have the ' +
                'unsubscription marker "!"');
        }
        var len = marbles.length;
        var testMessages = [];
        var subIndex = marbles.indexOf('^');
        var frameOffset = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
        var getValue = typeof values !== 'object' ?
            function (x) { return x; } :
            function (x) {
                // Support Observable-of-Observables
                if (materializeInnerObservables && values[x] instanceof ColdObservable_1.ColdObservable) {
                    return values[x].messages;
                }
                return values[x];
            };
        var groupStart = -1;
        for (var i = 0; i < len; i++) {
            var frame = i * this.frameTimeFactor + frameOffset;
            var notification = void 0;
            var c = marbles[i];
            switch (c) {
                case '-':
                case ' ':
                    break;
                case '(':
                    groupStart = frame;
                    break;
                case ')':
                    groupStart = -1;
                    break;
                case '|':
                    notification = Notification_1.Notification.createComplete();
                    break;
                case '^':
                    break;
                case '#':
                    notification = Notification_1.Notification.createError(errorValue || 'error');
                    break;
                default:
                    notification = Notification_1.Notification.createNext(getValue(c));
                    break;
            }
            if (notification) {
                testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification: notification });
            }
        }
        return testMessages;
    };
    return TestScheduler;
}(VirtualTimeScheduler_1.VirtualTimeScheduler));
exports.TestScheduler = TestScheduler;
//# sourceMappingURL=TestScheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/util/AnimationFrame.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var RequestAnimationFrameDefinition = (function () {
    function RequestAnimationFrameDefinition(root) {
        if (root.requestAnimationFrame) {
            this.cancelAnimationFrame = root.cancelAnimationFrame.bind(root);
            this.requestAnimationFrame = root.requestAnimationFrame.bind(root);
        }
        else if (root.mozRequestAnimationFrame) {
            this.cancelAnimationFrame = root.mozCancelAnimationFrame.bind(root);
            this.requestAnimationFrame = root.mozRequestAnimationFrame.bind(root);
        }
        else if (root.webkitRequestAnimationFrame) {
            this.cancelAnimationFrame = root.webkitCancelAnimationFrame.bind(root);
            this.requestAnimationFrame = root.webkitRequestAnimationFrame.bind(root);
        }
        else if (root.msRequestAnimationFrame) {
            this.cancelAnimationFrame = root.msCancelAnimationFrame.bind(root);
            this.requestAnimationFrame = root.msRequestAnimationFrame.bind(root);
        }
        else if (root.oRequestAnimationFrame) {
            this.cancelAnimationFrame = root.oCancelAnimationFrame.bind(root);
            this.requestAnimationFrame = root.oRequestAnimationFrame.bind(root);
        }
        else {
            this.cancelAnimationFrame = root.clearTimeout.bind(root);
            this.requestAnimationFrame = function (cb) { return root.setTimeout(cb, 1000 / 60); };
        }
    }
    return RequestAnimationFrameDefinition;
}());
exports.RequestAnimationFrameDefinition = RequestAnimationFrameDefinition;
exports.AnimationFrame = new RequestAnimationFrameDefinition(root_1.root);
//# sourceMappingURL=AnimationFrame.js.map

/***/ },

/***/ "./node_modules/rxjs/util/ArgumentOutOfRangeError.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var err = _super.call(this, 'argument out of range');
        this.name = err.name = 'ArgumentOutOfRangeError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ },

/***/ "./node_modules/rxjs/util/FastMap.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var FastMap = (function () {
    function FastMap() {
        this.values = {};
    }
    FastMap.prototype.delete = function (key) {
        this.values[key] = null;
        return true;
    };
    FastMap.prototype.set = function (key, value) {
        this.values[key] = value;
        return this;
    };
    FastMap.prototype.get = function (key) {
        return this.values[key];
    };
    FastMap.prototype.forEach = function (cb, thisArg) {
        var values = this.values;
        for (var key in values) {
            if (values.hasOwnProperty(key) && values[key] !== null) {
                cb.call(thisArg, values[key], key);
            }
        }
    };
    FastMap.prototype.clear = function () {
        this.values = {};
    };
    return FastMap;
}());
exports.FastMap = FastMap;
//# sourceMappingURL=FastMap.js.map

/***/ },

/***/ "./node_modules/rxjs/util/Immediate.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/
"use strict";
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var ImmediateDefinition = (function () {
    function ImmediateDefinition(root) {
        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
            this.setImmediate = root.setImmediate.bind(root);
            this.clearImmediate = root.clearImmediate.bind(root);
        }
        else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            // Don't get fooled by e.g. browserify environments.
            if (this.canUseProcessNextTick()) {
                // For Node.js before 0.9
                this.setImmediate = this.createProcessNextTickSetImmediate();
            }
            else if (this.canUsePostMessage()) {
                // For non-IE10 modern browsers
                this.setImmediate = this.createPostMessageSetImmediate();
            }
            else if (this.canUseMessageChannel()) {
                // For web workers, where supported
                this.setImmediate = this.createMessageChannelSetImmediate();
            }
            else if (this.canUseReadyStateChange()) {
                // For IE 6–8
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            }
            else {
                // For older browsers
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            var ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    ImmediateDefinition.prototype.identify = function (o) {
        return this.root.Object.prototype.toString.call(o);
    };
    ImmediateDefinition.prototype.canUseProcessNextTick = function () {
        return this.identify(this.root.process) === '[object process]';
    };
    ImmediateDefinition.prototype.canUseMessageChannel = function () {
        return Boolean(this.root.MessageChannel);
    };
    ImmediateDefinition.prototype.canUseReadyStateChange = function () {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    };
    ImmediateDefinition.prototype.canUsePostMessage = function () {
        var root = this.root;
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `root.postMessage` means something completely different and can't be used for this purpose.
        if (root.postMessage && !root.importScripts) {
            var postMessageIsAsynchronous_1 = true;
            var oldOnMessage = root.onmessage;
            root.onmessage = function () {
                postMessageIsAsynchronous_1 = false;
            };
            root.postMessage('', '*');
            root.onmessage = oldOnMessage;
            return postMessageIsAsynchronous_1;
        }
        return false;
    };
    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    ImmediateDefinition.prototype.partiallyApplied = function (handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
            var _a = result, handler = _a.handler, args = _a.args;
            if (typeof handler === 'function') {
                handler.apply(undefined, args);
            }
            else {
                (new Function('' + handler))();
            }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
    };
    ImmediateDefinition.prototype.addFromSetImmediateArguments = function (args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
    };
    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createPostMessageSetImmediate = function () {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
        var root = this.root;
        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
            var instance = globalMessageHandler.instance;
            if (event.source === root &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                instance.runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        onGlobalMessage.instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
            var _a = setImmediate, messagePrefix = _a.messagePrefix, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.postMessage(messagePrefix + handle, '*');
            return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
    };
    ImmediateDefinition.prototype.runIfPresent = function (handle) {
        // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
        // So if we're currently running a task, we'll need to delay this invocation.
        if (this.currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // 'too much recursion' error.
            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        }
        else {
            var task = this.tasksByHandle[handle];
            if (task) {
                this.currentlyRunningATask = true;
                try {
                    task();
                }
                finally {
                    this.clearImmediate(handle);
                    this.currentlyRunningATask = false;
                }
            }
        }
    };
    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function () {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
            var _a = setImmediate, channel = _a.channel, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var root = instance.root;
            var doc = root.document;
            var html = doc.documentElement;
            var handle = instance.addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement('script');
            script.onreadystatechange = function () {
                instance.runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    return ImmediateDefinition;
}());
exports.ImmediateDefinition = ImmediateDefinition;
exports.Immediate = new ImmediateDefinition(root_1.root);
//# sourceMappingURL=Immediate.js.map

/***/ },

/***/ "./node_modules/rxjs/util/Map.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var MapPolyfill_1 = __webpack_require__("./node_modules/rxjs/util/MapPolyfill.js");
exports.Map = root_1.root.Map || (function () { return MapPolyfill_1.MapPolyfill; })();
//# sourceMappingURL=Map.js.map

/***/ },

/***/ "./node_modules/rxjs/util/MapPolyfill.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var MapPolyfill = (function () {
    function MapPolyfill() {
        this.size = 0;
        this._values = [];
        this._keys = [];
    }
    MapPolyfill.prototype.get = function (key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
    };
    MapPolyfill.prototype.set = function (key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            this._keys.push(key);
            this._values.push(value);
            this.size++;
        }
        else {
            this._values[i] = value;
        }
        return this;
    };
    MapPolyfill.prototype.delete = function (key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
    };
    MapPolyfill.prototype.clear = function () {
        this._keys.length = 0;
        this._values.length = 0;
        this.size = 0;
    };
    MapPolyfill.prototype.forEach = function (cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
            cb.call(thisArg, this._values[i], this._keys[i]);
        }
    };
    return MapPolyfill;
}());
exports.MapPolyfill = MapPolyfill;
//# sourceMappingURL=MapPolyfill.js.map

/***/ },

/***/ "./node_modules/rxjs/util/Set.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
function minimalSetImpl() {
    // THIS IS NOT a full impl of Set, this is just the minimum
    // bits of functionality we need for this library.
    return (function () {
        function MinimalSet() {
            this._values = [];
        }
        MinimalSet.prototype.add = function (value) {
            if (!this.has(value)) {
                this._values.push(value);
            }
        };
        MinimalSet.prototype.has = function (value) {
            return this._values.indexOf(value) !== -1;
        };
        Object.defineProperty(MinimalSet.prototype, "size", {
            get: function () {
                return this._values.length;
            },
            enumerable: true,
            configurable: true
        });
        MinimalSet.prototype.clear = function () {
            this._values.length = 0;
        };
        return MinimalSet;
    }());
}
exports.minimalSetImpl = minimalSetImpl;
exports.Set = root_1.root.Set || minimalSetImpl();
//# sourceMappingURL=Set.js.map

/***/ },

/***/ "./node_modules/rxjs/util/TimeoutError.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when duetime elapses.
 *
 * @see {@link timeout}
 *
 * @class TimeoutError
 */
var TimeoutError = (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError() {
        var err = _super.call(this, 'Timeout has occurred');
        this.name = err.name = 'TimeoutError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=TimeoutError.js.map

/***/ },

/***/ "./node_modules/rxjs/util/applyMixins.js":
/***/ function(module, exports) {

"use strict";
"use strict";
function applyMixins(derivedCtor, baseCtors) {
    for (var i = 0, len = baseCtors.length; i < len; i++) {
        var baseCtor = baseCtors[i];
        var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
        for (var j = 0, len2 = propertyKeys.length; j < len2; j++) {
            var name_1 = propertyKeys[j];
            derivedCtor.prototype[name_1] = baseCtor.prototype[name_1];
        }
    }
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=applyMixins.js.map

/***/ },

/***/ "./node_modules/rxjs/util/assign.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
function assignImpl(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var len = sources.length;
    for (var i = 0; i < len; i++) {
        var source = sources[i];
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
                target[k] = source[k];
            }
        }
    }
    return target;
}
exports.assignImpl = assignImpl;
;
function getAssign(root) {
    return root.Object.assign || assignImpl;
}
exports.getAssign = getAssign;
exports.assign = getAssign(root_1.root);
//# sourceMappingURL=assign.js.map

/***/ },

/***/ "./node_modules/rxjs/util/isDate.js":
/***/ function(module, exports) {

"use strict";
"use strict";
function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
exports.isDate = isDate;
//# sourceMappingURL=isDate.js.map

/***/ },

/***/ "./node_modules/rxjs/util/isNumeric.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
exports.isNumeric = isNumeric;
;
//# sourceMappingURL=isNumeric.js.map

/***/ },

/***/ "./node_modules/rxjs/util/noop.js":
/***/ function(module, exports) {

"use strict";
"use strict";
/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ },

/***/ "./node_modules/rxjs/util/not.js":
/***/ function(module, exports) {

"use strict";
"use strict";
function not(pred, thisArg) {
    function notPred() {
        return !(notPred.pred.apply(notPred.thisArg, arguments));
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
}
exports.not = not;
//# sourceMappingURL=not.js.map

/***/ },

/***/ "./node_modules/webpack/buildin/amd-define.js":
/***/ function(module, exports) {

module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },

/***/ "./node_modules/webpack/buildin/amd-options.js":
/***/ function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },

/***/ "./src/app/app.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ng2_toastr_1 = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
var global_methods_1 = __webpack_require__("./src/app/shared/global-methods.ts");
/*
 * App Component
 * Top Level Component
 */
var App = (function () {
    function App(toastr, vRef) {
        this.toastr = toastr;
        this.vRef = vRef;
        this.toastr.setRootViewContainerRef(vRef);
    }
    App.prototype.ngOnInit = function () {
        global_methods_1.exLog('Hello App Component !');
        document.title = 'RADWIN ' + window.location.hostname;
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            styles: [__webpack_require__("./src/assets/scss/style.scss")],
            encapsulation: core_1.ViewEncapsulation.None,
            template: "<router-outlet></router-outlet>"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ng2_toastr_1.ToastsManager !== 'undefined' && ng2_toastr_1.ToastsManager) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _b) || Object])
    ], App);
    return App;
    var _a, _b;
}());
exports.App = App;


/***/ },

/***/ "./src/app/app.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = __webpack_require__("./src/app/environment.ts");
var app_routes_1 = __webpack_require__("./src/app/app.routes.ts");
// App is our top level component
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var auth_1 = __webpack_require__("./src/app/blocks/auth/index.ts");
var store_providers_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./blocks/ngrx-store/store-providers\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
// Components
var alarms_1 = __webpack_require__("./src/app/blocks/alarms/index.ts");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var dashboard_1 = __webpack_require__("./src/app/dashboard/index.ts");
var modal_component_1 = __webpack_require__("./src/app/blocks/modal/modal.component.ts");
var quick_look_1 = __webpack_require__("./src/app/quick-look/index.ts");
var link_state_component_1 = __webpack_require__("./src/app/quick-look/link-state.component.ts");
var overview_1 = __webpack_require__("./src/app/overview/index.ts");
var system_1 = __webpack_require__("./src/app/system/index.ts");
var radio_1 = __webpack_require__("./src/app/radio/index.ts");
var network_1 = __webpack_require__("./src/app/network/index.ts");
var monitor_1 = __webpack_require__("./src/app/monitor/index.ts");
var recent_events_1 = __webpack_require__("./src/app/recent-events/index.ts");
var change_band_1 = __webpack_require__("./src/app/radio/change-band/index.ts");
var wifi_1 = __webpack_require__("./src/app/wifi/index.ts");
var security_1 = __webpack_require__("./src/app/security/index.ts");
var swu_component_1 = __webpack_require__("./src/app/tools/unit/swu.component.ts");
var unit_tools_component_1 = __webpack_require__("./src/app/tools/unit/unit-tools.component.ts");
var operations_component_1 = __webpack_require__("./src/app/tools/operations/operations.component.ts");
var restore_to_defaults_component_1 = __webpack_require__("./src/app/tools/operations/restoreToDefaults/restore-to-defaults-component.ts");
var network_tools_component_1 = __webpack_require__("./src/app/tools/network/network-tools.component.ts");
var blocks_2 = __webpack_require__("./src/app/blocks/index.ts");
// Pipes
var blocks_3 = __webpack_require__("./src/app/blocks/index.ts");
// 3rd Party
var ng2_charts_1 = __webpack_require__("./node_modules/ng2-charts/ng2-charts.js");
var ng2_file_upload_1 = __webpack_require__("./node_modules/ng2-file-upload/index.js");
var ng2_bs3_modal_1 = __webpack_require__("./node_modules/ng2-bs3-modal/ng2-bs3-modal.js");
var ng2_toastr_1 = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
// Application wide providers
var APP_PROVIDERS = [
    blocks_1.ExHttpService,
    auth_1.AuthGuard,
];
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.App],
            declarations: [
                app_component_1.App,
                modal_component_1.WModalComponent, dashboard_1.DashboardComponent, login_component_1.LoginComponent, quick_look_1.QuickLookComponent,
                overview_1.OverviewComponent, system_1.SystemMonitorComponent, system_1.SystemConfigurationComponent,
                radio_1.RadioMonitorComponent, radio_1.RadioConfigurationComponent,
                network_1.NetworkConfigurationComponent, monitor_1.DeviceMonitorComponent, recent_events_1.RecentEventsComponent,
                change_band_1.ChangeBandComponent, network_1.TrapComponent, wifi_1.WifiConfigurationComponent,
                security_1.SecurityConfigurationComponent, unit_tools_component_1.UnitToolsComponent, operations_component_1.OperationsComponent,
                network_tools_component_1.NetworkToolsComponent, link_state_component_1.LinkStateComponent, blocks_2.GaugeComponent, alarms_1.AlarmsComponent,
                swu_component_1.SwuComponent, restore_to_defaults_component_1.RestoreToDeaultsComponent,
                // pipes
                blocks_3.ProductPipe, blocks_3.UnitsPipe, blocks_3.TimeTicks, blocks_3.NoneValuePipe,
            ],
            imports: [
                ng2_bs3_modal_1.Ng2Bs3ModalModule,
                ng2_file_upload_1.FileUploadModule,
                ng2_charts_1.ChartsModule,
                ng2_toastr_1.ToastModule.forRoot(blocks_2.options),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true })
            ],
            entryComponents: [restore_to_defaults_component_1.RestoreToDeaultsComponent],
            providers: [
                environment_1.ENV_PROVIDERS,
                APP_PROVIDERS,
                store_providers_1.STORE_PROVIDERS
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ },

/***/ "./src/app/app.routes.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var _1 = __webpack_require__("./src/app/dashboard/index.ts");
var auth_1 = __webpack_require__("./src/app/blocks/auth/index.ts");
exports.ROUTES = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'dashboard', component: _1.DashboardComponent, children: _1.ROUTES, canActivate: [auth_1.AuthGuard] },
    { path: '**', component: login_component_1.LoginComponent }
];


/***/ },

/***/ "./src/app/blocks/alarms/alarms.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var alarms_service_1 = __webpack_require__("./src/app/blocks/alarms/alarms.service.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var AlarmsComponent = (function () {
    function AlarmsComponent(_alarmsService, _store) {
        this._alarmsService = _alarmsService;
        this._store = _store;
    }
    AlarmsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeAlaramsSub = this._store.select('activeAlarms')
            .subscribe(function (alarms) {
            _this.alarms = alarms;
        });
    };
    AlarmsComponent.prototype.ngOnDestroy = function () {
        this.activeAlaramsSub.unsubscribe();
    };
    AlarmsComponent = __decorate([
        core_1.Component({
            selector: 'active-alarms',
            providers: [alarms_service_1.ActiveAlarmsService],
            template: "\n                <li class=\"alarms-dropdown-header\">Active Alarms\n                </li>\n                <li>\n                    <!-- inner menu: contains the actual data -->\n                    <ul class=\"menu\" style=\"padding: 15px;\">\n                        <div *ngIf=\"alarms && alarms.length == 0\">No Active Alarms</div>\n                        <div class=\"alarms-list\">\n                            <li *ngFor=\"let alarm of alarms\">\n                                <h4>{{ alarm.interfaceName }}</h4>\n                                <p>{{ alarm.description }}</p>\n                                <small>{{ alarm.dateAndTime }}</small>\n                            </li>\n                        </div>\n                    </ul>\n                </li>\n                <!--<li class=\"footer\"><a href=\"#\">See All Messages</a></li>-->    \n    ",
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof alarms_service_1.ActiveAlarmsService !== 'undefined' && alarms_service_1.ActiveAlarmsService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], AlarmsComponent);
    return AlarmsComponent;
    var _a, _b;
}());
exports.AlarmsComponent = AlarmsComponent;


/***/ },

/***/ "./src/app/blocks/alarms/alarms.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./src/app/blocks/alarms/alarms.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var exhttp_service_1 = __webpack_require__("./src/app/blocks/exhttp.service.ts");
var activeAlarmsUrl = consts_1.Consts.baseUrls.activeAlarms;
var ActiveAlarmsService = (function () {
    function ActiveAlarmsService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
    }
    ActiveAlarmsService.prototype.getActiveAlarms = function () {
        var _this = this;
        this._httpService.getData(activeAlarmsUrl)
            .map(function (payload) { return ({ type: 'GET_ALARMS', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    ActiveAlarmsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof exhttp_service_1.ExHttpService !== 'undefined' && exhttp_service_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], ActiveAlarmsService);
    return ActiveAlarmsService;
    var _a, _b;
}());
exports.ActiveAlarmsService = ActiveAlarmsService;


/***/ },

/***/ "./src/app/blocks/alarms/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/blocks/alarms/alarms.component.ts"));
__export(__webpack_require__("./src/app/blocks/alarms/alarms.service.ts"));
__export(__webpack_require__("./src/app/blocks/alarms/alarms.model.ts"));


/***/ },

/***/ "./src/app/blocks/auth/auth.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (!!localStorage.getItem(shared_1.Consts.jwtToken))
            return true;
        // if (tokenNotExpired(Consts.jwtToken)) {
        //   return true;
        // }
        this.router.navigate(['login']);
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
exports.AuthGuard = AuthGuard;


/***/ },

/***/ "./src/app/blocks/auth/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/blocks/auth/auth.service.ts"));


/***/ },

/***/ "./src/app/blocks/can-deactivate.guard.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var CanDeactivateGuard = (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component) {
        return component.canDeactivate ? component.canDeactivate() : true;
    };
    return CanDeactivateGuard;
}());
exports.CanDeactivateGuard = CanDeactivateGuard;


/***/ },

/***/ "./src/app/blocks/exhttp.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var ExHttpService = (function () {
    function ExHttpService(_http) {
        this._http = _http;
    }
    ExHttpService.prototype.createJwtAuthorizationHeader = function () {
        var header = new http_1.Headers();
        header.append('Authorization', shared_1.Consts.jwtPrefix +
            localStorage.getItem(shared_1.Consts.jwtToken));
        return header;
    };
    ExHttpService.prototype.createJwtAuthorizationRequestOptions = function () {
        var options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        options.headers.append('Authorization', shared_1.Consts.jwtPrefix +
            localStorage.getItem(shared_1.Consts.jwtToken));
        return options;
    };
    ExHttpService.prototype.getData = function (url) {
        return this._http.get(url, { headers: this.createJwtAuthorizationHeader() })
            .map(function (response) { return response.json().data; });
    };
    ExHttpService.prototype.get = function (url) {
        return this._http.get(url, { headers: this.createJwtAuthorizationHeader() })
            .map(function (response) { return response.json(); });
    };
    ExHttpService.prototype.getBlob = function (url) {
        return this._http.get(url, { headers: this.createJwtAuthorizationHeader(),
            responseType: http_1.ResponseContentType.Blob });
    };
    ExHttpService.prototype.postData = function (bodyPayload, url) {
        var body = JSON.stringify(bodyPayload);
        return this._http
            .post(url, body, this.createJwtAuthorizationRequestOptions())
            .map(function (res) { return res.json().data; });
    };
    ExHttpService.prototype.post = function (url, bodyPayload) {
        var body = JSON.stringify(bodyPayload);
        return this._http
            .post(url, body, this.createJwtAuthorizationRequestOptions())
            .map(function (res) { return res.json(); });
    };
    ExHttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ExHttpService);
    return ExHttpService;
    var _a;
}());
exports.ExHttpService = ExHttpService;


/***/ },

/***/ "./src/app/blocks/gauge.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
/*
 * App Component
 * Top Level Component
 */
var GaugeComponent = (function () {
    function GaugeComponent(_title) {
        this._title = _title;
    }
    Object.defineProperty(GaugeComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            if (val && this._gauge) {
                this._value = val;
                this._gauge.value = this._value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    GaugeComponent.prototype.ngAfterViewInit = function () {
        this._gauge = new RadialGauge({
            renderTo: this._title,
            title: this._title,
            width: 300,
            height: 300,
            units: 'Mb/s',
            minValue: 0,
            maxValue: 120,
            majorTicks: [
                '0',
                '30M',
                '60M',
                '90M',
                '120M',
            ],
            minorTicks: 0,
            strokeTicks: true,
            highlights: [
                {
                    'from': 0,
                    'to': 30,
                    'color': 'rgba(141, 181, 211, 1)'
                },
                {
                    'from': 30,
                    'to': 60,
                    'color': 'rgba(251, 204, 196, 1)'
                },
                {
                    'from': 60,
                    'to': 90,
                    'color': 'rgba(114, 205, 154, 1)'
                }
            ],
            colorPlate: '#fff',
            borderShadowWidth: 0,
            colorBorderOuter: '#f3abab',
            colorBorderInner: '#f3abab',
            borders: false,
            needleType: 'line',
            needleWidth: 3,
            needleStart: 1,
            needleCircleSize: 0.1,
            needleCircleOuter: true,
            needleCircleInner: false,
            animationDuration: 1500,
            animationRule: 'linear',
            valueBox: true,
            valueBoxStroke: 0,
            colorValueBoxBackground: '#fff',
            colorValueBoxRect: '#fff',
            colorValueBoxShadow: '#fff',
            valueBoxBorderRadius: 0,
            valueInt: 1,
            valueDec: 1,
            fontValue: 'Roboto',
            fontNumbers: 'Roboto',
            fontUnits: 'Roboto',
            fontTitle: 'Roboto',
            colorNeedle: '#f47f6b',
        }).draw();
    };
    GaugeComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], GaugeComponent.prototype, "value", null);
    GaugeComponent = __decorate([
        core_1.Component({
            selector: 'gauge',
            template: "\n                <div class=\"gauge-container\">\n                    <canvas id=\"{{_title}}\"></canvas>\n                </div>\n    ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core_1.Attribute('title')), 
        __metadata('design:paramtypes', [Object])
    ], GaugeComponent);
    return GaugeComponent;
}());
exports.GaugeComponent = GaugeComponent;


/***/ },

/***/ "./src/app/blocks/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/blocks/alarms/alarms.service.ts"));
__export(__webpack_require__("./src/app/blocks/exhttp.service.ts"));
__export(__webpack_require__("./src/app/blocks/pipes/units.pipe.ts"));
__export(__webpack_require__("./src/app/blocks/pipes/product.pipe.ts"));
__export(__webpack_require__("./src/app/blocks/pipes/time-ticks.pipe.ts"));
__export(__webpack_require__("./src/app/blocks/pipes/none-value.pipe.ts"));
__export(__webpack_require__("./src/app/blocks/gauge.component.ts"));
__export(__webpack_require__("./src/app/blocks/modal/modal.service.ts"));
__export(__webpack_require__("./src/app/blocks/modal/modal.component.ts"));
__export(__webpack_require__("./src/app/blocks/spinner/spinner.service.ts"));
__export(__webpack_require__("./src/app/blocks/can-deactivate.guard.ts"));
__export(__webpack_require__("./src/app/blocks/validators.ts"));
__export(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./ngrx-store/reducers\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
__export(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./ngrx-store/store\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
__export(__webpack_require__("./src/app/blocks/toast-options.ts"));


/***/ },

/***/ "./src/app/blocks/modal/modal.component.html":
/***/ function(module, exports) {

module.exports = "<modal style=\"top: 15%\" #modal data-backdrop=\"static\">\r\n\t<modal-header [show-close]=\"true\">\r\n\t\t<h4 class=\"modal-title\">{{ title }}</h4>\r\n\t</modal-header>\r\n\t<modal-body>\r\n\t\t<div class=\"modal-body-container\">\r\n\t\t\t<div class=\"modal-body-content\">\r\n\t\t\t\t<i [ngClass]=\"getIconClass()\"></i>\r\n\t\t\t\t<div #innercomponent></div>\r\n\t\t\t\t<p>{{message}}</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</modal-body>\r\n\t<modal-footer>\r\n\t\t<button type=\"button\" *ngIf=\"okText\" class=\"btn btn-primary\" style=\"width: 80px;\" (click)=\"onOk()\">{{ okText }}</button>\r\n\t\t<button type=\"button\" *ngIf=\"cancelText\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"onDismiss()\">{{ cancelText }}</button>\r\n\t</modal-footer>\r\n</modal>\r\n\r\n"

/***/ },

/***/ "./src/app/blocks/modal/modal.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ng2_bs3_modal_1 = __webpack_require__("./node_modules/ng2-bs3-modal/ng2-bs3-modal.js");
var modal_service_1 = __webpack_require__("./src/app/blocks/modal/modal.service.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var KEY_ESC = 27;
var WModalComponent = (function () {
    function WModalComponent(_modalService, _resolver) {
        this._modalService = _modalService;
        this._resolver = _resolver;
        this._defaults = {
            modalType: shared_1.Consts.ModalType.info,
            title: 'Confirmation',
            message: 'Do you want to cancel your changes?',
            cancelText: 'CANCEL',
            okText: 'OK'
        };
        _modalService.activate = this.activate.bind(this);
        _modalService.activateWithInnerTemplate = this.activateWithInnerTemplate.bind(this);
    }
    WModalComponent.prototype.activate = function (message, title, okText, cancelText, modalType) {
        var _this = this;
        if (message === void 0) { message = this._defaults.message; }
        if (title === void 0) { title = this._defaults.title; }
        if (okText === void 0) { okText = this._defaults.okText; }
        if (cancelText === void 0) { cancelText = this._defaults.cancelText; }
        if (modalType === void 0) { modalType = this._defaults.modalType; }
        this.title = title;
        this.message = message;
        this.okText = okText;
        this.cancelText = cancelText;
        this.modalType = modalType;
        var promise = new Promise(function (resolve, reject) {
            _this.negativeOnClick = function (e) { return resolve(false); };
            _this.positiveOnClick = function (e) { return resolve(true); };
            _this.modal.open();
        });
        document.onkeyup = function (e) {
            if (e.which === KEY_ESC) {
                _this.modal.close();
                return _this.negativeOnClick(undefined);
            }
        };
        return promise;
    };
    WModalComponent.prototype.activateWithInnerTemplate = function (component) {
        var _this = this;
        var factory = this._resolver.resolveComponentFactory(component);
        this.innercomponent.clear();
        var componentRef = this.innercomponent.createComponent(factory);
        this.okText = this._defaults.okText;
        this.cancelText = this._defaults.cancelText;
        this.message = '';
        var promise = new Promise(function (resolve, reject) {
            _this.negativeOnClick = function (e) { return resolve({ responce: false, internalData: undefined }); };
            _this.positiveOnClick = function (e) { return resolve({ responce: true, internalData: componentRef.instance }); };
            _this.modal.open();
        });
        return promise;
    };
    WModalComponent.prototype.onOk = function (result) {
        this.positiveOnClick(undefined);
        this.tryClose();
    };
    WModalComponent.prototype.onDismiss = function (result) {
        this.negativeOnClick(undefined);
        this.tryClose();
    };
    WModalComponent.prototype.tryClose = function () {
        this.innercomponent.clear();
        this.modal.close();
    };
    WModalComponent.prototype.ngOnInit = function () {
    };
    WModalComponent.prototype.ngOnDestroy = function () {
    };
    WModalComponent.prototype.getIconClass = function () {
        switch (this.modalType) {
            case shared_1.Consts.ModalType.error:
                return 'rad-sprite modal-error-icon';
            case shared_1.Consts.ModalType.info:
                return 'rad-sprite modal-info-icon';
            case shared_1.Consts.ModalType.warning:
                return 'rad-sprite modal-warning-icon';
            case shared_1.Consts.ModalType.question:
                return 'rad-sprite modal-question-icon';
            default:
                return 'rad-sprite modal-info-icon';
        }
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', (typeof (_a = typeof ng2_bs3_modal_1.ModalComponent !== 'undefined' && ng2_bs3_modal_1.ModalComponent) === 'function' && _a) || Object)
    ], WModalComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('innercomponent', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', (typeof (_b = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _b) || Object)
    ], WModalComponent.prototype, "innercomponent", void 0);
    WModalComponent = __decorate([
        core_1.Component({
            selector: 'rad-modal',
            template: __webpack_require__("./src/app/blocks/modal/modal.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof modal_service_1.WModalService !== 'undefined' && modal_service_1.WModalService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.ComponentFactoryResolver !== 'undefined' && core_1.ComponentFactoryResolver) === 'function' && _d) || Object])
    ], WModalComponent);
    return WModalComponent;
    var _a, _b, _c, _d;
}());
exports.WModalComponent = WModalComponent;


/***/ },

/***/ "./src/app/blocks/modal/modal.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var WModalService = (function () {
    function WModalService() {
    }
    WModalService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WModalService);
    return WModalService;
}());
exports.WModalService = WModalService;


/***/ },

/***/ "./src/app/blocks/pipes/none-value.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var NoneValuePipe = (function () {
    function NoneValuePipe() {
    }
    NoneValuePipe.prototype.transform = function (value) {
        if (!value) {
            return 'N/A';
        }
        else {
            return value;
        }
    };
    NoneValuePipe = __decorate([
        core_1.Pipe({
            name: 'noneValuePipe'
        }), 
        __metadata('design:paramtypes', [])
    ], NoneValuePipe);
    return NoneValuePipe;
}());
exports.NoneValuePipe = NoneValuePipe;


/***/ },

/***/ "./src/app/blocks/pipes/product.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ProductPipe = (function () {
    function ProductPipe() {
    }
    ProductPipe.prototype.transform = function (value) {
        if (!value)
            return '';
        var res = value.split('- RW-5');
        return res[0];
    };
    ProductPipe = __decorate([
        core_1.Pipe({
            name: 'productPipe'
        }), 
        __metadata('design:paramtypes', [])
    ], ProductPipe);
    return ProductPipe;
}());
exports.ProductPipe = ProductPipe;


/***/ },

/***/ "./src/app/blocks/pipes/time-ticks.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var TimeTicks = (function () {
    function TimeTicks() {
    }
    TimeTicks.prototype.transform = function (value) {
        if (!value)
            return '';
        // let _date = new Date();
        // _date.setSeconds(-value / 10);
        // return _date
        return displayTime(value / 100);
    };
    TimeTicks = __decorate([
        core_1.Pipe({
            name: 'timeTicks'
        }), 
        __metadata('design:paramtypes', [])
    ], TimeTicks);
    return TimeTicks;
}());
exports.TimeTicks = TimeTicks;
function displayTime(ticksInSecs) {
    var ticks = Math.round(ticksInSecs);
    var dd = Math.floor(ticks / 86400);
    var hh = Math.floor(ticks / 3600) % 24;
    var mm = Math.floor(ticks / 60) % 60;
    var ss = ticks % 60;
    return pad(dd, 2) + 'd:' + pad(hh, 2) + 'h:' + pad(mm, 2) + 'm:' + pad(ss, 2) + 's';
}
function pad(n, width) {
    var _n = n + '';
    return _n.length >= width ? _n : new Array(width - _n.length + 1).join('0') + _n;
}


/***/ },

/***/ "./src/app/blocks/pipes/units.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var UnitsPipe = (function () {
    function UnitsPipe() {
    }
    UnitsPipe.prototype.transform = function (value, unit) {
        if (value === undefined)
            return '';
        switch (unit) {
            case 'dbm':
                return value + ' [dBm]';
            case 'mhz':
                return value + ' [MHz]';
            case 'ghz':
                if (value && value.indexOf('[GHz]') >= 0) {
                    return value;
                }
                return value + ' [GHz]';
            case 'mbs':
                return value + ' [Mb/s]';
            case 'fps':
                return value + ' [Fps]';
            case 'c':
                return value + ' [c]';
            case 'w':
                return value + ' [w]';
            default:
                break;
        }
        return value;
    };
    UnitsPipe = __decorate([
        core_1.Pipe({
            name: 'units'
        }), 
        __metadata('design:paramtypes', [])
    ], UnitsPipe);
    return UnitsPipe;
}());
exports.UnitsPipe = UnitsPipe;


/***/ },

/***/ "./src/app/blocks/spinner/spinner.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var SpinnerService = (function () {
    function SpinnerService() {
        this._selector = 'preloader';
        this._messageSelector = 'spinner-message';
        this._element = document.getElementById(this._selector);
        this._messageElement = document.getElementById(this._messageSelector);
    }
    SpinnerService.prototype.show = function (message, autoHide) {
        this._element.style['display'] = 'block';
        this._messageElement.innerHTML = message;
        if (autoHide) {
            this.hide(2000);
        }
    };
    SpinnerService.prototype.hide = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        setTimeout(function () {
            _this._element.style['display'] = 'none';
        }, delay);
    };
    SpinnerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SpinnerService);
    return SpinnerService;
}());
exports.SpinnerService = SpinnerService;


/***/ },

/***/ "./src/app/blocks/toast-options.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ng2_toastr_1 = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
exports.options = new ng2_toastr_1.ToastOptions({
    // animate: 'flyRight',
    positionClass: 'toast-bottom-right',
    toastLife: 50000,
});


/***/ },

/***/ "./src/app/blocks/validators.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
function ip4Validator(control) {
    if (!control.value || control.value === undefined)
        return { invalidIp4: false };
    if (!control.value.match(ipRegex)) {
        return { invalidIp4: true };
    }
}
exports.ip4Validator = ip4Validator;
function wifiIpValidator(control) {
    if (!control.value || control.value === undefined)
        return { invalidWifiIp: false };
    var ip = control.value;
    if (!ip.startsWith('192.168.')) {
        return { invalidWifiIp: true };
    }
}
exports.wifiIpValidator = wifiIpValidator;
function ipParamsValidator(group) {
    if (!group.value.hsuDefaultGateway || group.value.hsuDefaultGateway === undefined ||
        !group.value.hsuSubnetMask || group.value.hsuSubnetMask === undefined ||
        !group.value.hsuIp || group.value.hsuIp === undefined)
        return { invalidIpParams: false };
    // Convert ips to numeric
    var ip = convertIpToNumeric(group.value.hsuIp);
    var mask = convertIpToNumeric(group.value.hsuSubnetMask);
    var gw = convertIpToNumeric(group.value.hsuDefaultGateway);
    if (!(((ip & mask) === (mask & gw)) || (gw === 0))) {
        return { invalidIpParams: true };
    }
    else {
        return { invalidIpParams: false };
    }
}
exports.ipParamsValidator = ipParamsValidator;
function matchingPasswordsValidator(group) {
    if (group.value.newPassword !== group.value.confirmPassword) {
        return { passwordsMismatch: true };
    }
    return null;
}
exports.matchingPasswordsValidator = matchingPasswordsValidator;
function convertIpToNumeric(ip) {
    var splitted = ip.split('.');
    var a = +splitted[0] * 16777216;
    var b = +splitted[1] * 65536;
    var c = +splitted[2] * 256;
    var d = +splitted[3];
    return a + b + c + d;
}
function restrictedCharsValidator(control) {
    if (!control.value || control.value === undefined)
        return { invalidChars: false };
    if (!control.value.match(/^[^,;%]+$/)) {
        return { invalidChars: true };
    }
}
exports.restrictedCharsValidator = restrictedCharsValidator;
function invalidPasswordValidator(control) {
    if (!control.value || control.value === undefined)
        return { invalidPassword: false };
    if (!control.value.match(/^[^.*@?|# ]+$/)) {
        return { invalidPassword: true };
    }
}
exports.invalidPasswordValidator = invalidPasswordValidator;
function minMaxNumberValidator(min, max) {
    return function (control) {
        if (!control.value || control.value === undefined)
            return null;
        if (control.value < min || control.value > max) {
            return { invalidMinMax: true };
        }
        return null;
    };
}
exports.minMaxNumberValidator = minMaxNumberValidator;
function spectrumRangeValidator(group) {
    if (!group.value.minAirFrequency || group.value.minAirFrequency === undefined ||
        !group.value.maxAirFrequency || group.value.maxAirFrequency === undefined)
        return { invalidSpectrumRange: false };
    if (group.value.maxAirFrequency - group.value.minAirFrequency > 500) {
        return { invalidSpectrumRange: true };
    }
    return null;
}
exports.spectrumRangeValidator = spectrumRangeValidator;
function ntpServerValidator(control) {
    if (!control.value || control.value === undefined)
        return { invalidNtpServer: false };
    if (!control.value.match(ipRegex) || control.value === '0.0.0.0' || control.value === '255.255.255.255') {
        return { invalidNtpServer: true };
    }
}
exports.ntpServerValidator = ntpServerValidator;


/***/ },

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ function(module, exports) {

module.exports = "<!-- template -->\r\n\r\n<!-- /#wrapper -->\r\n<div class=\"wrapper\">\r\n\r\n\t<!-- Main Header -->\r\n\t<header class=\"main-header\">\r\n\t\t<!-- Header Navbar -->\r\n\t\t<nav class=\"navbar navbar-static-top\" role=\"navigation\">\r\n\t\t\t<!-- Sidebar toggle button-->\r\n\t\t\t<a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\">\r\n\t\t\t\t<i class=\"rad-sprite hamburger\"></i>\r\n\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\r\n\t\t\t</a>\r\n\t\t\t<span>\r\n                <img src=\"/assets/img/logo.png\" style=\"padding-top:15px\">\r\n            </span>\r\n\t\t\t<!-- Navbar Right Menu -->\r\n\t\t\t<div class=\"navbar-custom-menu\">\r\n\t\t\t\t<ul class=\"nav navbar-nav\">\r\n\r\n\t\t\t\t\t<!-- Notifications Menu -->\r\n\t\t\t\t\t<li class=\"dropdown notifications-menu\" (click)='RequestForAlarms()'>\r\n\t\t\t\t\t\t<!-- Menu toggle button -->\r\n\t\t\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n\t\t\t\t\t\t\t<i class=\"rad-sprite bell\"></i>\r\n\t\t\t\t\t\t\t<span *ngIf=\"alarmsCounter > 0\" class=\"label label-warning\">{{alarmsCounter}}</span>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t<ul class=\"dropdown-menu\">\r\n\t\t\t\t\t\t\t<active-alarms></active-alarms>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<!-- User Account Menu -->\r\n\t\t\t\t\t<li class=\"dropdown user user-menu\">\r\n\t\t\t\t\t\t<!-- Menu Toggle Button -->\r\n\t\t\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n\t\t\t\t\t\t\t<!-- The user image in the navbar-->\r\n\t\t\t\t\t\t\t<!-- hidden-xs hides the username on small devices so only the image appears. -->\r\n\t\t\t\t\t\t\t<!--               <span class=\"hidden-xs\">{{ loginData.fullName }}</span>\r\n                            --><span class=\"hidden-xs\">Admin</span>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t<ul class=\"dropdown-menu\">\r\n\t\t\t\t\t\t\t<!-- Menu Footer-->\r\n\t\t\t\t\t\t\t<li class=\"user-footer\">\r\n\t\t\t\t\t\t\t\t<a href=\"/\" (click)='logout()' class=\"btn btn-default btn-flat\">Log out</a>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</nav>\r\n\t</header>\r\n\t<!-- Left side column. contains the logo and sidebar -->\r\n\t<span class=\"main-sidebar\">\r\n\r\n        <!-- sidebar: style can be found in sidebar.less -->\r\n        <section class=\"sidebar\">\r\n\r\n            <!-- Sidebar Menu -->\r\n            <ul class=\"sidebar-menu\">\r\n                <li class=\"treeview\">\r\n                    <a [routerLink]=\" ['./overview'] \" [routerLinkActive]=\"['is-active']\" >\r\n                        <i class=\"rad-sprite overview\"></i>\r\n                        <span class=\"side-bar-title\">OVERVIEW</span>\r\n\t</a>\r\n\t</li>\r\n\t<li class=\"treeview\">\r\n\t\t<a><i class=\"rad-sprite configure\"></i><span class=\"side-bar-title\">CONFIGURE</span></a>\r\n\t\t<ul class=\"treeview-menu\">\r\n\t\t\t<li><a [routerLink]=\" ['./system-configuration'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i><span class=\"side-bar-title sub-menu\">SYSTEM</span></a></li>\r\n\t\t\t<li><a [routerLink]=\" ['./radio-configuration'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i> <span class=\"side-bar-title sub-menu\">RADIO</span></a></li>\r\n\t\t\t<li><a [routerLink]=\" ['./network-configuration'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i> <span class=\"side-bar-title sub-menu\">NETWORK</span></a></li>\r\n\t\t\t<li><a [routerLink]=\" ['./wifi-configuration'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i> <span class=\"side-bar-title sub-menu\">WIFI</span></a></li>\r\n\t\t\t<li><a [routerLink]=\" ['./security-configuration'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i> <span class=\"side-bar-title sub-menu\">SECURITY</span></a></li>\r\n\t\t</ul>\r\n\t</li>\r\n\t<li class=\"treeview\">\r\n\t\t<a><i class=\"rad-sprite tools\"></i> <span class=\"side-bar-title\">TOOLS</span></a>\r\n\t\t<ul class=\"treeview-menu\">\r\n\t\t\t<li><a [routerLink]=\" ['./unit-tools'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i> <span class=\"side-bar-title sub-menu\">UNIT</span></a></li>\r\n\t\t\t<li><a [routerLink]=\" ['./network-tools'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i> <span class=\"side-bar-title sub-menu\">NETWORK</span></a></li>\r\n\t\t\t<li><a [routerLink]=\" ['./operations-tools'] \" [routerLinkActive]=\"['is-active']\"><i class=\"rad-sprite sub-menu-icon\"></i> <span class=\"side-bar-title sub-menu\">OPERATIONS</span></a></li>\r\n\t\t</ul>\r\n\t</li>\r\n\r\n\t</ul>\r\n\t</section>\r\n\t</span>\r\n\r\n\t<!-- Content Wrapper. Contains page content -->\r\n\t<div class=\"content-wrapper\">\r\n\t\t<section class=\"content-header\">\r\n\t\t\t<h1>\r\n\t\t\t\t{{system?.product | productPipe }}\r\n\t\t\t</h1>\r\n\t\t\t<h5 *ngIf=\"system\">{{system?.hsu?.hsuName}}, {{system?.hsu?.hsuLocation}}</h5>\r\n\t\t</section>\r\n\r\n\t\t<!-- Main content -->\r\n\t\t<section class=\"content\">\r\n\t\t\t<quick-look></quick-look>\r\n\t\t\t<!-- Your Page Content Here -->\r\n\t\t\t<router-outlet></router-outlet>\r\n\t\t</section>\r\n\t</div>\r\n\r\n</div>\r\n\r\n<rad-modal></rad-modal>\r\n"

/***/ },

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var global_methods_1 = __webpack_require__("./src/app/shared/global-methods.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var system_1 = __webpack_require__("./src/app/system/index.ts");
var _1 = __webpack_require__("./src/app/radio/index.ts");
var change_band_1 = __webpack_require__("./src/app/radio/change-band/index.ts");
var _2 = __webpack_require__("./src/app/network/index.ts");
var monitor_service_1 = __webpack_require__("./src/app/monitor/monitor.service.ts");
var alarms_1 = __webpack_require__("./src/app/blocks/alarms/index.ts");
/*
 * App Component
 * Top Level Component
 */
var DashboardComponent = (function () {
    function DashboardComponent(_store, _monitorService, _networkService, _systemService, _alarmsService, _radioService) {
        this._store = _store;
        this._monitorService = _monitorService;
        this._networkService = _networkService;
        this._systemService = _systemService;
        this._alarmsService = _alarmsService;
        this._radioService = _radioService;
        this.alarmsCounter = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // $.AdminLTE.layout.fix();
        global_methods_1.exLog('Hello Dashboard Component !');
        this.systemSub = this._store.select('system')
            .subscribe(function (system) {
            _this.system = system;
        });
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.alarmsCounter = monitor.activeAlarmsCounter;
        });
        // System data required, when refresh fetch data
        this._systemService.getData();
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.monitorSub.unsubscribe();
        this.systemSub.unsubscribe();
    };
    DashboardComponent.prototype.logout = function () {
        global_methods_1.exLog('logout');
        localStorage.removeItem(consts_1.Consts.jwtToken);
    };
    DashboardComponent.prototype.RequestForAlarms = function () {
        this._alarmsService.getActiveAlarms();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            providers: [blocks_1.WModalService, system_1.SystemService, _1.RadioService, change_band_1.ChangeBandService, blocks_1.SpinnerService,
                _2.NetworkService, monitor_service_1.MonitorService, _2.TrapsDestinationsService, alarms_1.ActiveAlarmsService],
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _a) || Object, (typeof (_b = typeof monitor_service_1.MonitorService !== 'undefined' && monitor_service_1.MonitorService) === 'function' && _b) || Object, (typeof (_c = typeof _2.NetworkService !== 'undefined' && _2.NetworkService) === 'function' && _c) || Object, (typeof (_d = typeof system_1.SystemService !== 'undefined' && system_1.SystemService) === 'function' && _d) || Object, (typeof (_e = typeof alarms_1.ActiveAlarmsService !== 'undefined' && alarms_1.ActiveAlarmsService) === 'function' && _e) || Object, (typeof (_f = typeof _1.RadioService !== 'undefined' && _1.RadioService) === 'function' && _f) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b, _c, _d, _e, _f;
}());
exports.DashboardComponent = DashboardComponent;


/***/ },

/***/ "./src/app/dashboard/dashboard.routes.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var overview_1 = __webpack_require__("./src/app/overview/index.ts");
var unit_tools_component_1 = __webpack_require__("./src/app/tools/unit/unit-tools.component.ts");
var network_tools_component_1 = __webpack_require__("./src/app/tools/network/network-tools.component.ts");
var operations_component_1 = __webpack_require__("./src/app/tools/operations/operations.component.ts");
var _1 = __webpack_require__("./src/app/system/index.ts");
var _2 = __webpack_require__("./src/app/network/index.ts");
var _3 = __webpack_require__("./src/app/radio/index.ts");
var _4 = __webpack_require__("./src/app/wifi/index.ts");
var _5 = __webpack_require__("./src/app/security/index.ts");
var can_deactivate_guard_1 = __webpack_require__("./src/app/blocks/can-deactivate.guard.ts");
exports.ROUTES = [
    { path: '', redirectTo: 'overview' },
    { path: 'overview', component: overview_1.OverviewComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'system-configuration', component: _1.SystemConfigurationComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'radio-configuration', component: _3.RadioConfigurationComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'network-configuration', component: _2.NetworkConfigurationComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'wifi-configuration', component: _4.WifiConfigurationComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'security-configuration', component: _5.SecurityConfigurationComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'unit-tools', component: unit_tools_component_1.UnitToolsComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'network-tools', component: network_tools_component_1.NetworkToolsComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
    { path: 'operations-tools', component: operations_component_1.OperationsComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] }
];


/***/ },

/***/ "./src/app/dashboard/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/dashboard/dashboard.component.ts"));
__export(__webpack_require__("./src/app/dashboard/dashboard.routes.ts"));


/***/ },

/***/ "./src/app/environment.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// Angular 2
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var can_deactivate_guard_1 = __webpack_require__("./src/app/blocks/can-deactivate.guard.ts");
// Environment Providers
var PROVIDERS = [
    can_deactivate_guard_1.CanDeactivateGuard
];
var _decorateModuleRef = function identity(value) { return value; };
if (false) {
    // Production
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(core_1.ApplicationRef);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
exports.decorateModuleRef = _decorateModuleRef;
exports.ENV_PROVIDERS = PROVIDERS.slice();


/***/ },

/***/ "./src/app/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// App
__export(__webpack_require__("./src/app/app.module.ts"));


/***/ },

/***/ "./src/app/login/login.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"login-background\">\n\t<section class=\"bg-placeholder fullHeight imageShadow\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"form-container\">\n\t\t\t\t<div class=\"logo-text\">\n\t\t\t\t\t<a href=\"#\"><img src=\"/assets/img/logo.png\" alt=\"RADWIN\" width=\"146\" height=\"27\"></a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form\">\n\t\t\t\t\t<div *ngIf=\"regularLoginMode\" class=\"form-header\">User Login</div>\n\t\t\t\t\t<div *ngIf=\"!regularLoginMode\" class=\"form-header\">Password Help</div>\n\t\t\t\t\t<div class=\"form-content\">\n\n\t\t\t\t\t\t<form *ngIf=\"regularLoginMode\" class=\"login-form\" [formGroup]=\"form\">\n\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"regularLoginMode && form.controls['username'].dirty && !form.controls.username.valid && !form.controls.username.pending\">\n\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.username.errors.required\">Username is required.</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<input *ngIf=\"regularLoginMode\" type=\"text\" formControlName=\"username\" placeholder=\"USERNAME\" maxlength=\"20\">\n\n\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.password.dirty && !form.controls.password.valid && !form.controls.password.pending\">\n\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.password.errors.required\">Password is required.</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<input type=\"password\" formControlName=\"password\" placeholder=\"PASSWORD\" maxlength=\"20\" autocomplete=\"false\">\n\n\t\t\t\t\t\t\t<span *ngIf=\"regularLoginMode\" class=\"forgot-pass\"><a href=\"#\" (click)=\"toggleLoginMode($event)\" >Forgot Password?</a></span>\n\t\t\t\t\t\t\t<input type=\"submit\" [disabled]=\"!form.valid\" (click)=\"login($event)\" value=\"LOG IN\">\n\t\t\t\t\t\t</form>\n\n\n\t\t\t\t\t\t<form *ngIf=\"!regularLoginMode\" class=\"login-form\" [formGroup]=\"forgotForm\">\n\t\t\t\t\t\t\t<div class=\"form-text\">\n\t\t\t\t\t\t\t\t<p>Enter alternative password</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<input type=\"password\" formControlName=\"password\" placeholder=\"PASSWORD\" maxlength=\"20\" autocomplete=\"false\">\n\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"forgotForm.controls.password.dirty && !forgotForm.controls.password.valid && !forgotForm.controls.password.pending\">\n\t\t\t\t\t\t\t\t<p *ngIf=\"forgotForm.controls.password.errors.required\">Password is required.</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<input type=\"submit\" [disabled]=\"!forgotForm.valid\" (click)=\"login($event)\" value=\"LOG IN\">\n\t\t\t\t\t\t</form>\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"!regularLoginMode\" class=\"form-footer\"><a href=\"#\" (click)=\"toggleLoginMode($event)\">RETURN TO LOGIN</a></div>\n\t\t\t\t\t<div class=\"form-footer\">\n\t\t\t\t\t\tVersion: {{ version }} Build: {{ build }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</section>\n</div>\n<rad-modal></rad-modal>"

/***/ },

/***/ "./src/app/login/login.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var LoginComponent = (function () {
    function LoginComponent(_router, _formBuilder, _http, _store, _modalService, _spinnerService) {
        this._router = _router;
        this._formBuilder = _formBuilder;
        this._http = _http;
        this._store = _store;
        this._modalService = _modalService;
        this._spinnerService = _spinnerService;
        this.regularLoginMode = true;
        this.form = _formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        this.forgotForm = _formBuilder.group({
            username: ['admin'],
            password: ['', forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.login = function (event) {
        var _this = this;
        event.preventDefault();
        var body;
        if (this.regularLoginMode) {
            body = this.form.value;
        }
        else {
            body = this.forgotForm.value;
        }
        this._http.post(shared_1.Consts.baseUrls.auth, body, { headers: shared_1.contentHeaders })
            .subscribe(function (response) {
            if (response.json().access_token !== undefined) {
                _this._store.dispatch({ type: 'INIT' });
                localStorage.setItem(shared_1.Consts.jwtToken, response.json().access_token);
                _this._spinnerService.show('Loading...', true);
                _this._router.navigate(['dashboard']);
            }
            else {
                _this.showError();
            }
        }, function (error) { return _this.showError(error); });
    };
    LoginComponent.prototype.showError = function (error) {
        this._modalService.activate(shared_1.Resources.wrongUserPassword, shared_1.Resources.loginTitle, undefined, '', shared_1.Consts.ModalType.error);
    };
    LoginComponent.prototype.toggleLoginMode = function (event) {
        shared_1.exLog('forgot password !');
        this.regularLoginMode = !this.regularLoginMode;
    };
    LoginComponent.prototype.ngOnInit = function () {
        // this._http.get('./assets/files/release.json')
        //     .map((res: Response) => res.json()).subscribe(release => {
        //         this.version = release.version;
        //         this.build = release.build;
        //         }
        //     );
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            providers: [blocks_1.WModalService, blocks_1.SpinnerService],
            styles: [__webpack_require__("./src/app/login/login.styles.scss")],
            template: __webpack_require__("./src/app/login/login.component.html"),
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object, (typeof (_c = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _c) || Object, (typeof (_d = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _d) || Object, (typeof (_e = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _e) || Object, (typeof (_f = typeof blocks_1.SpinnerService !== 'undefined' && blocks_1.SpinnerService) === 'function' && _f) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d, _e, _f;
}());
exports.LoginComponent = LoginComponent;


/***/ },

/***/ "./src/app/login/login.styles.scss":
/***/ function(module, exports) {

module.exports = "/*************************************************/\n/*                                               */\n/*\tTheme        : RADWIN                        */\n/*\tDeveloped by : Manoj Dharajiya               */\n/*\tSite URL     : http://md.wearedevelopers.in  */\n/*\tversion      : 1.0.0\t                     */\n/*                                               */\n/*************************************************/\nselect,\ntextarea,\ninput {\n  width: 100%;\n  padding: 10px 73px 10px 10px;\n  border: 1px solid #a1a7ad;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  color: #d8d8d8;\n  -webkit-transition: all 0.5s ease-in 0s;\n  -moz-transition: all 0.5s ease-in 0s;\n  -ms-transition: all 0.5s ease-in 0s;\n  -o-transition: all 0.5s ease-in 0s;\n  transition: all 0.5s ease-in 0s; }\n\n*::-webkit-input-placeholder {\n  color: #a1a7ad;\n  opacity: 1; }\n\n*::-moz-placeholder {\n  color: #a1a7ad;\n  opacity: 1; }\n\n/*===== Login / Forgot-Password Css  =====*/\n.container {\n  max-width: 1200px;\n  width: auto; }\n\n.loader {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background-image: url(\"../assets/img/loader.gif\");\n  background-color: #fff;\n  background-repeat: no-repeat;\n  background-position: center center;\n  z-index: 99; }\n\n.bg-placeholder {\n  background-position: 0 0 !important;\n  height: 100%;\n  top: 0;\n  width: 100%;\n  background-size: cover !important;\n  background-repeat: no-repeat; }\n  @media (min-width: 768px) and (max-width: 1026px) {\n    .bg-placeholder {\n      background-position: center !important; } }\n\n.fullHeight {\n  position: relative; }\n\n.imageShadow {\n  position: relative; }\n  .imageShadow:after {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    content: \"\";\n    background: rgba(0, 0, 0, 0.6);\n    z-index: 1;\n    top: 0;\n    left: 0; }\n\n.form-container {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 350px;\n  max-width: 85%;\n  z-index: 2;\n  -webkit-transform: translate(-50%,-50%);\n  -moz-transform: translate(-50%,-50%);\n  -ms-transform: translate(-50%,-50%);\n  -o-transform: translate(-50%,-50%);\n  transform: translate(-50%,-50%); }\n  .form-container .logo-text {\n    margin-bottom: 20px; }\n  .form-container .form {\n    background: #fff;\n    -webkit-border-radius: 5px;\n    -moz-border-radius: 5px;\n    -ms-border-radius: 5px;\n    -o-border-radius: 5px;\n    border-radius: 5px; }\n  .form-container .form-text p {\n    margin-bottom: 0; }\n  .form-container .form-content {\n    padding: 40px 39px 90px 36px; }\n  .form-container .form-header {\n    font-family: \"Roboto\";\n    font-weight: 400;\n    color: #ef4023;\n    font-size: 18px;\n    background: #f7f7f7;\n    text-align: center;\n    padding: 15px 5px;\n    -webkit-border-radius: 5px 5px 0 0;\n    -moz-border-radius: 5px 5px 0 0;\n    -ms-border-radius: 5px 5px 0 0;\n    -o-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0; }\n  .form-container .form-footer {\n    padding: 0 0 20px 0;\n    text-align: center;\n    color: #a1a7ad;\n    -webkit-border-radius: 0 0 5px 5px;\n    -moz-border-radius: 0 0 5px 5px;\n    -ms-border-radius: 0 0 5px 5px;\n    -o-border-radius: 0 0 5px 5px;\n    border-radius: 0 0 5px 5px; }\n    .form-container .form-footer a {\n      color: #a1a7ad;\n      text-decoration: none;\n      text-transform: uppercase; }\n      .form-container .form-footer a:hover, .form-container .form-footer a:focus {\n        color: #a1a7ad;\n        text-decoration: \"none\"; }\n  .form-container form input[type=\"email\"],\n  .form-container form input[type=\"text\"] {\n    margin: 0 0 30px;\n    padding: 10px 73px 10px 10px;\n    color: #a1a7ad;\n    line-height: 1.1em;\n    -webkit-border-radius: 2px;\n    -moz-border-radius: 2px;\n    -ms-border-radius: 2px;\n    -o-border-radius: 2px;\n    border-radius: 2px; }\n  .form-container form input[type=\"submit\"] {\n    width: 97px;\n    height: 37px;\n    padding: 0;\n    margin-top: 6px;\n    border: none;\n    background: #ef4023;\n    color: #fff;\n    text-align: center;\n    text-transform: uppercase;\n    -webkit-border-radius: 2px;\n    -moz-border-radius: 2px;\n    -ms-border-radius: 2px;\n    -o-border-radius: 2px;\n    border-radius: 2px;\n    float: right; }\n  .form-container .login-form .forgot-pass {\n    font-size: 12px;\n    color: #a1a7ad;\n    display: inline-block;\n    float: left;\n    margin-top: 18px; }\n    .form-container .login-form .forgot-pass a {\n      color: #a1a7ad;\n      text-decoration: none; }\n      .form-container .login-form .forgot-pass a:hover, .form-container .login-form .forgot-pass a:focus {\n        color: #a1a7ad;\n        text-decoration: \"none\"; }\n  .form-container .forgot-password {\n    position: relative; }\n    .form-container .forgot-password input[type=\"email\"],\n    .form-container .forgot-password input[type=\"text\"] {\n      margin: 0; }\n    .form-container .forgot-password input[type=\"submit\"] {\n      position: absolute;\n      top: 0;\n      right: 0;\n      margin: 0;\n      border: none;\n      background: #ef4023;\n      color: #fff;\n      text-align: center;\n      text-transform: uppercase;\n      width: 63px;\n      height: 37px;\n      padding: 0;\n      -webkit-border-radius: 0 2px 2px 0;\n      -moz-border-radius: 0 2px 2px 0;\n      -ms-border-radius: 0 2px 2px 0;\n      -o-border-radius: 0 2px 2px 0;\n      border-radius: 0 2px 2px 0; }\n  @media (max-width: 767px) {\n    .form-container {\n      margin: 20px auto; }\n      .form-container .form-content {\n        padding: 40px 25px 90px 25px; } }\n  @media (max-width: 767px) and (orientation: landscape) {\n    .form-container {\n      position: inherit;\n      left: inherit;\n      top: inherit;\n      -webkit-transform: translate(0,0);\n      -moz-transform: translate(0,0);\n      -ms-transform: translate(0,0);\n      -o-transform: translate(0,0);\n      transform: translate(0,0); } }\n\n/*===== Login / Forgot-Password Css  =====*/\n/*************************************************/\n/*                                               */\n/*\tTheme        : RADWIN                        */\n/*\tDeveloped by : Manoj Dharajiya               */\n/*\tSite URL     : http://md.wearedevelopers.in  */\n/*\tversion      : 1.0.0\t                     */\n/*                                               */\n/*************************************************/\n.login-background {\n  background-image: url(\"/assets/img/login_background.jpg\") !important;\n  background-size: 100% 100%;\n  width: 100%;\n  height: 100%;\n  position: absolute; }\n"

/***/ },

/***/ "./src/app/monitor/device-monitor.component.html":
/***/ function(module, exports) {

module.exports = "<div [ngClass]=\"{'box box-light-blue': true}\">\r\n    <div class=\"box-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-2\">\r\n                <div class=\"device-monitor-title border-right\">\r\n                    {{device}}\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <div class=\"device-monitor-block border-right\">\r\n                    <div class=\"device-row border-bottom\">\r\n                        <div class=\"monitor-graph\">\r\n                            <div class=\"sparkline\" #rsssparkline></div>\r\n                        </div>\r\n                        <div class=\"measure\">\r\n                            <div class=\"monitor-caption\">RSS</div>\r\n                            <div class=\"monitor-caption-data\" *ngIf='isLinkSynchronized'>{{rss | units: 'dbm'}}</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"device-row\">\r\n                        <div class=\"monitor-graph\">\r\n                            <div class=\"sparkline\" #tputsparkline></div>\r\n                        </div>\r\n                        <div class=\"measure\">\r\n                            <div class=\"monitor-caption\">Est. T-Put</div>\r\n                            <div class=\"monitor-caption-data\" *ngIf='isLinkSynchronized'>{{tput / 1000000 | number : '1.2-2' | units: 'mbs'}}</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <div class=\"device-monitor-block\">\r\n                    <div class=\"device-row border-bottom\">\r\n                        <div class=\"monitor-graph\">\r\n                            <div class=\"sparkline\" #txsparkline></div>\r\n                        </div>\r\n                        <div class=\"measure\">\r\n                            <div class=\"monitor-caption\">LAN TX</div>\r\n                            <div class=\"monitor-caption-data\" *ngIf='isLinkSynchronized'>{{tx | units: 'mbs'}}</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"device-row\">\r\n                        <div class=\"monitor-graph\">\r\n                            <div class=\"sparkline\" #rxsparkline></div>\r\n                        </div>\r\n                        <div class=\"measure\">\r\n                            <div class=\"monitor-caption\">LAN RX</div>\r\n                            <div class=\"monitor-caption-data\" *ngIf='isLinkSynchronized'>{{rx | units: 'mbs'}}</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>"

/***/ },

/***/ "./src/app/monitor/device-monitor.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var hsuColor = '#8db5d3';
var hbsColor = '#f47f6b';
var DeviceMonitorComponent = (function () {
    function DeviceMonitorComponent(device, _store) {
        this._store = _store;
        this.tputValues = [];
        this.rssValues = [];
        this.txValues = [];
        this.rxValues = [];
        this.sparksColor = hsuColor;
        this.device = '';
        this.tputLineOptions = {
            type: 'line',
            width: '170px',
            height: '40px',
            lineColor: this.sparksColor,
            fillColor: 'transparent',
            spotColor: this.sparksColor,
            spotRadius: '3',
            drawNormalOnTop: true,
            lineWidth: '3'
        };
        this.rssBarOptions = {
            type: 'bar',
            width: '100px',
            height: '40px',
            barColor: this.sparksColor,
            barWidth: 15,
            chartRangeMin: 0,
            barSpacing: 5
        };
        this.lanBarOptions = {
            raw: true,
            type: 'bar',
            width: '100px',
            height: '40px',
            barColor: this.sparksColor,
            barWidth: 7,
            chartRangeMin: 0,
            barSpacing: 5
        };
        this.device = device;
    }
    DeviceMonitorComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.device === 'HSU') {
            this.sparksColor = hsuColor;
        }
        else {
            this.sparksColor = hbsColor;
        }
        this.isLinkSynchronized = false;
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.isLinkSynchronized = (monitor.hsuLinkState !== "Not Synchronized");
        });
        this.tputLineOptions.lineColor = this.sparksColor;
        this.tputLineOptions.spotColor = this.sparksColor;
        this.lanBarOptions.barColor = this.sparksColor;
        this.rssBarOptions.barColor = this.sparksColor;
    };
    Object.defineProperty(DeviceMonitorComponent.prototype, "tput", {
        get: function () {
            return this._tput;
        },
        set: function (value) {
            if (value) {
                if (this.isLinkSynchronized) {
                    this._tput = value;
                    this.tputValues.push(this._tput);
                }
                else {
                    this.tputValues = [];
                }
                if (this.tputValues.length >= 20) {
                    this.tputValues.shift();
                }
                jQuery(this.tputSpark.nativeElement).sparkline(this.tputValues, this.tputLineOptions);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DeviceMonitorComponent.prototype, "rss", {
        get: function () {
            return this._rss;
        },
        set: function (value) {
            if (value) {
                if (this.isLinkSynchronized) {
                    this._rss = value < -95 ? -95 : value;
                    this.rssValues.push(this._rss);
                }
                else {
                    this.rssValues = [];
                }
                if (this.rssValues.length >= 10) {
                    this.rssValues.shift();
                }
                jQuery(this.rssSpark.nativeElement).sparkline(this.rssValues, this.rssBarOptions);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DeviceMonitorComponent.prototype, "tx", {
        get: function () {
            return this._tx;
        },
        set: function (value) {
            if (value) {
                if (this.isLinkSynchronized) {
                    this._tx = value;
                    this.txValues.push(this._tx);
                }
                else {
                    this.txValues = [];
                }
                if (this.txValues.length >= 12) {
                    this.txValues.shift();
                }
                jQuery(this.txSpark.nativeElement).sparkline(this.txValues, this.lanBarOptions);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DeviceMonitorComponent.prototype, "rx", {
        get: function () {
            return this._rx;
        },
        set: function (value) {
            if (value) {
                if (this.isLinkSynchronized) {
                    this._rx = value;
                    this.rxValues.push(this._rx);
                }
                else {
                    this.rxValues = [];
                }
                if (this.rxValues.length >= 12) {
                    this.rxValues.shift();
                }
                jQuery(this.rxSpark.nativeElement).sparkline(this.rxValues, this.lanBarOptions);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    __decorate([
        core_1.ViewChild('tputsparkline'), 
        __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
    ], DeviceMonitorComponent.prototype, "tputSpark", void 0);
    __decorate([
        core_1.ViewChild('rsssparkline'), 
        __metadata('design:type', (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object)
    ], DeviceMonitorComponent.prototype, "rssSpark", void 0);
    __decorate([
        core_1.ViewChild('txsparkline'), 
        __metadata('design:type', (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object)
    ], DeviceMonitorComponent.prototype, "txSpark", void 0);
    __decorate([
        core_1.ViewChild('rxsparkline'), 
        __metadata('design:type', (typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object)
    ], DeviceMonitorComponent.prototype, "rxSpark", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DeviceMonitorComponent.prototype, "tput", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DeviceMonitorComponent.prototype, "rss", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DeviceMonitorComponent.prototype, "tx", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DeviceMonitorComponent.prototype, "rx", null);
    DeviceMonitorComponent = __decorate([
        core_1.Component({
            selector: 'device-monitor',
            template: __webpack_require__("./src/app/monitor/device-monitor.component.html"),
            styles: [__webpack_require__("./src/app/monitor/device-monitor.styles.scss")],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core_1.Attribute('device')), 
        __metadata('design:paramtypes', [Object, (typeof (_e = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _e) || Object])
    ], DeviceMonitorComponent);
    return DeviceMonitorComponent;
    var _a, _b, _c, _d, _e;
}());
exports.DeviceMonitorComponent = DeviceMonitorComponent;


/***/ },

/***/ "./src/app/monitor/device-monitor.styles.scss":
/***/ function(module, exports) {

module.exports = ".device-monitor-title {\n  text-align: center;\n  border-right: 1px solid #d8d8d8;\n  font-size: 36px;\n  padding: 42px; }\n\n.device-monitor-block.border-right {\n  border-right: 1px solid #d8d8d8; }\n\n.monitor-caption {\n  padding-left: 10px;\n  padding-top: 10px;\n  color: #76828e;\n  font-size: 14px;\n  font-weight: 400; }\n\n.monitor-caption-data {\n  color: #273238;\n  font-size: 18px;\n  padding-left: 10px;\n  padding-top: 2px; }\n\n.device-row {\n  display: flex;\n  padding: 5px;\n  min-height: 68px; }\n  .device-row.border-bottom {\n    border-bottom: 1px solid #d8d8d8; }\n\n.measure {\n  margin-left: auto; }\n"

/***/ },

/***/ "./src/app/monitor/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/monitor/device-monitor.component.ts"));
__export(__webpack_require__("./src/app/monitor/monitor.model.ts"));
__export(__webpack_require__("./src/app/monitor/monitor.service.ts"));


/***/ },

/***/ "./src/app/monitor/monitor.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
;


/***/ },

/***/ "./src/app/monitor/monitor.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var Rx_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var monitorUrl = consts_1.Consts.baseUrls.monitor;
var monitorInterval = consts_1.Consts.monitorInterval;
var MonitorService = (function () {
    function MonitorService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
        this._timeoutsCounter = 0;
        this.subscribeToMonitorSuspend();
    }
    MonitorService.prototype.startMonitoring = function () {
        var _this = this;
        this.monitorSub = Rx_1.Observable.timer(0, monitorInterval)
            .flatMap(function () { return _this._httpService.getData(monitorUrl); })
            .map(function (payload) { return ({ type: 'GET_MONITOR', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        }, function (err) {
            // Handle token expiration
            if (err.status === 401) {
                _this.onTokenExpiration();
                return;
            }
            _this._timeoutsCounter++;
            if (_this._timeoutsCounter >= consts_1.Consts.timeoutRetries) {
                _this.onTimeOut();
            }
        });
    };
    MonitorService.prototype.stopMonitor = function () {
        if (this.monitorSub != undefined)
            this.monitorSub.unsubscribe();
    };
    MonitorService.prototype.subscribeToMonitorSuspend = function () {
        var _this = this;
        this.stateProviderSub = this._store.select('monitorSuspend')
            .subscribe(function (isSuspend) {
            _this.isMonitorSuspend = isSuspend;
            if (_this.isMonitorSuspend)
                _this.stopMonitor();
            else
                _this.startMonitoring();
        });
    };
    MonitorService.prototype.onTimeOut = function () {
        this._timeoutsCounter = 0;
        this.stopMonitor();
        this._store.dispatch({ type: 'TIMEOUT_OCCURED' });
    };
    MonitorService.prototype.onTokenExpiration = function () {
        this._store.dispatch({ type: 'TOKEN_EXPIRATION' });
    };
    MonitorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], MonitorService);
    return MonitorService;
    var _a, _b;
}());
exports.MonitorService = MonitorService;


/***/ },

/***/ "./src/app/network/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/network/network-configuration.component.ts"));
__export(__webpack_require__("./src/app/network/network.service.ts"));
__export(__webpack_require__("./src/app/network/network.model.ts"));
__export(__webpack_require__("./src/app/network/traps-destinations.service.ts"));
__export(__webpack_require__("./src/app/network/trap-destination.component.ts"));


/***/ },

/***/ "./src/app/network/network-configuration.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n\t<form *ngIf=\"network\" [formGroup]=\"form\">\r\n\t\t<h3 class=\"box-title\">Network</h3>\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<div class=\"box box-green\">\r\n\t\t\t\t<div class=\"box-body\">\r\n\t\t\t\t\t<fieldset formGroupName=\"ipParams\">\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\tIP Address:\r\n\t\t\t\t\t\t\t\t\t<input formControlName=\"hsuIp\" [(ngModel)]=\"network.ipParams && network.ipParams.hsuIp\" class=\"form-control\" type=\"text\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.ipParams.controls.hsuIp.dirty && !form.controls.ipParams.controls.hsuIp.valid\">\r\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ipParams.controls.hsuIp.errors.invalidIp4\">IP Address is invalid</p>\r\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ipParams.controls.hsuIp.errors.required\">IP Address is required</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.ipParams.dirty && !form.controls.ipParams.valid\">\r\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ipParams.errors.invalidIpParams\">Invalid IP params</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\tSubnet Mask:\r\n\t\t\t\t\t\t\t\t\t<input formControlName=\"hsuSubnetMask\" [(ngModel)]=\"network.ipParams && network.ipParams.hsuSubnetMask\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\ttype=\"text\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.ipParams.controls.hsuSubnetMask.dirty && !form.controls.ipParams.controls.hsuSubnetMask.valid\">\r\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ipParams.controls.hsuSubnetMask.errors.invalidIp4\">Subnet Mask is invalid</p>\r\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ipParams.controls.hsuSubnetMask.errors.required\">Subnet Mask is required</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\tDefault Gateway:\r\n\t\t\t\t\t\t\t\t\t<input formControlName=\"hsuDefaultGateway\" [(ngModel)]=\"network.ipParams && network.ipParams.hsuDefaultGateway\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\ttype=\"text\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.ipParams.controls.hsuDefaultGateway.dirty && !form.controls.ipParams.controls.hsuDefaultGateway.valid\">\r\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ipParams.controls.hsuDefaultGateway.errors.invalidIp4\">Default Gateway is invalid</p>\r\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ipParams.controls.hsuDefaultGateway.errors.required\">Default Gateway Mask is required</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</fieldset>\r\n\t\t\t\t\t<fieldset>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\tCurrent:\r\n\t\t\t\t\t\t\t\t\t<input formControlName=\"currentPortState\" [(ngModel)]=\"network.currentPortState\" class=\"form-control\" type=\"text\" readonly>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\tMode:\r\n\t\t\t\t\t\t\t\t\t<select formControlName=\"desiredPortState\" [(ngModel)]=\"network.desiredPortState\" class=\"form-control\">\r\n                                        <option *ngFor=\"let state of network.availablePortStates\" [value]=\"state\">{{ state }}</option>\r\n                                    </select>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\tCRC Errors:\r\n\t\t\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" (click)=\"ClearCrcCounter()\" type=\"number\" readonly value={{crcCounterPresenter}}>\r\n\t\t\t\t\t\t\t\t\t\t<span style=\"cursor: pointer;\" class=\"input-group-addon\" (click)=\"ClearCrcCounter()\">X</span>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</fieldset>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<div class=\"box box-light-blue\">\r\n\t\t\t\t<div class=\"vlan-wrapper\">\r\n\t\t\t\t\t<div class=\"vlan-content\">\r\n\t\t\t\t\t\t<div class=\"vlan-title\">\r\n\t\t\t\t\t\t\t<div>VLAN MANAGEMENT</div>\r\n\t\t\t\t\t\t\t<div class=\"onoffswitch\">\r\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" (click)=\"vlanCheckBoxClicked()\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" [(ngModel)]=\"isVlanEnabled\"\r\n\t\t\t\t\t\t\t\t\t[ngModelOptions]=\"{standalone: true}\">\r\n\t\t\t\t\t\t\t\t<label class=\"onoffswitch-label\" for=\"myonoffswitch\">\r\n                                <span class=\"onoffswitch-inner\"></span>\r\n                                <span class=\"onoffswitch-switch\"></span>\r\n                            </label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n                        <div class=\"vlan-form\">\r\n                            <div class=\"row\">\r\n                                <div class=\"col-lg-6\">\r\n                                    <div class=\"form-group\">\r\n                                        ID:\r\n                                        <input formControlName=\"vlanId\" [(ngModel)]=\"vlanId\" [readonly]=\"!isVlanEnabled\" class=\"form-control\" type=\"number\"\r\n                                            min=\"1\" max=\"4094\">\r\n                                        <div class=\"control-msgs\" *ngIf=\"form.controls.vlanId.dirty && !form.controls.vlanId.valid\">\r\n                                            <p *ngIf=\"form.controls.vlanId.errors.invalidMinMax\">VLAN ID should be set in the range of 1-4094 </p>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-lg-6\">\r\n                                    <div class=\"form-group\">\r\n                                        Priority:\r\n                                        <input formControlName=\"vlanPriority\" type=\"number\" min=\"0\" max=\"7\"\r\n                                            [(ngModel)]=\"vlanPriority\"\r\n                                            [readonly]=\"!isVlanEnabled\" class=\"form-control\">\r\n                                        <div class=\"control-msgs\" *ngIf=\"form.controls.vlanPriority.dirty && !form.controls.vlanPriority.valid\">\r\n                                            <p *ngIf=\"form.controls.vlanPriority.errors.invalidMinMax\">VLAN Priority should be set in the range of 0-7 </p>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\t<div class=\"col-md-6\">\r\n\t\t<div class=\"box box-red\">\r\n\t\t\t<div class=\"box-body\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"traps-header\">\r\n\t\t\t\t\t\t<div class=\"col-md-4\">\r\n\t\t\t\t\t\t\t<div class=\"trap-title\">\r\n\t\t\t\t\t\t\t\t<div>TRAP DESTINATIONS</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-8\">\r\n\t\t\t\t\t\t\t<div class=\"traps-buttons\">\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(0)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(0)}\">1</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(1)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(1)}\">2</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(2)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(2)}\">3</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(3)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(3)}\">4</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(4)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(4)}\">5</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(5)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(5)}\">6</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(6)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(6)}\">7</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(7)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(7)}\">8</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(8)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(8)}\">9</button>\r\n\t\t\t\t\t\t\t\t<button (click)=\"changeTrapIndex(9)\" [ngClass]=\"{'btn btn-default': true, 'active': isActive(9)}\">10</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-md-12\">\r\n\t\t\t\t\t\t<trap-comp [trap]=\"clonedTraps[trapIndex]\"></trap-comp>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"buttons-footer\">\r\n\t<button form=\"form\" type=\"submit\" (click)=\"save($event)\" [disabled]=\"isFormDisabled()\" class=\"btn btn-primary\">APPLY ALL</button>\r\n\t<button form=\"form\" type=\"cancel\" (click)=\"cancel($event)\" class=\"btn btn-default\">CANCEL</button>\r\n</div>"

/***/ },

/***/ "./src/app/network/network-configuration.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var network_service_1 = __webpack_require__("./src/app/network/network.service.ts");
var traps_destinations_service_1 = __webpack_require__("./src/app/network/traps-destinations.service.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var blocks_2 = __webpack_require__("./src/app/blocks/index.ts");
__webpack_require__("./node_modules/rxjs/add/observable/fromPromise.js");
var NetworkConfigurationComponent = (function () {
    function NetworkConfigurationComponent(_networkService, _modalService, _store, _trapsService, _formBuilder) {
        this._networkService = _networkService;
        this._modalService = _modalService;
        this._store = _store;
        this._trapsService = _trapsService;
        this._formBuilder = _formBuilder;
        this.form = _formBuilder.group({
            ipParams: this._formBuilder.group({
                hsuDefaultGateway: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.ip4Validator])],
                hsuSubnetMask: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.ip4Validator])],
                hsuIp: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.ip4Validator])]
            }, { validator: blocks_2.ipParamsValidator }),
            currentPortState: [''],
            desiredPortState: [''],
            vlanId: ['', blocks_2.minMaxNumberValidator(1, 4094)],
            vlanPriority: ['', blocks_2.minMaxNumberValidator(0, 7)]
        });
    }
    NetworkConfigurationComponent.prototype.changeTrapIndex = function (index) {
        this.trapIndex = index;
    };
    NetworkConfigurationComponent.prototype.isActive = function (index) {
        return this.trapIndex === index;
    };
    NetworkConfigurationComponent.prototype.save = function () {
        var _this = this;
        var dirtyNetworkForm = {};
        for (var control in this.form.controls) {
            if (this.form.controls[control].dirty) {
                dirtyNetworkForm[control] = this.form.controls[control].value;
            }
        }
        if (dirtyNetworkForm.ipParams) {
            this._modalService.activate(shared_1.Resources.changeIpParamsWarning, shared_1.Resources.warning)
                .then(function (responseOk) {
                if (responseOk) {
                    _this.initialNetworkData.ipParams.hsuIp = _this.network.ipParams.hsuIp;
                    _this.initialNetworkData.ipParams.hsuSubnetMask = _this.network.ipParams.hsuSubnetMask;
                    _this.initialNetworkData.ipParams.hsuDefaultGateway = _this.network.ipParams.hsuDefaultGateway;
                    _this._networkService.setData(_this.initialNetworkData);
                    var newIp = window.location.protocol + '//' + dirtyNetworkForm.ipParams.hsuIp;
                    window.location.href = newIp;
                }
            });
            return;
        }
        if (this.isVlanEnabledByUser()) {
            this._modalService.activate(shared_1.Resources.changeMngVlanWarning, shared_1.Resources.warning)
                .then(function (responseOk) {
                if (!responseOk) {
                    return;
                }
            });
        }
        // Check if traps are dirty
        if (this.trapsAreDirty()) {
            this._trapsService.setData(this.clonedTraps);
        }
        this._networkService.setData(dirtyNetworkForm);
        this.form.reset();
    };
    NetworkConfigurationComponent.prototype.trapsAreDirty = function () {
        return !(JSON.stringify(this.traps) === JSON.stringify(this.clonedTraps));
    };
    NetworkConfigurationComponent.prototype.cancel = function () {
        this.getNetwork();
        this.form.reset();
    };
    NetworkConfigurationComponent.prototype.canDeactivate = function () {
        if (!this.form || !this.form.dirty) {
            return true;
        }
        // Ask User
        return Observable_1.Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    };
    NetworkConfigurationComponent.prototype.ngOnDestroy = function () {
        this.networkSub.unsubscribe();
        this.crcSub.unsubscribe();
        this.trapsSub.unsubscribe();
    };
    NetworkConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.trapIndex = 0;
        shared_1.exLog('hello Network Configuration Component');
        this.crcSub = this._store.select('crcDecreaser').subscribe(function (s) { return _this.crcDecreaser = s; });
        this.networkSub = this._store.select('network')
            .subscribe(function (network) {
            _this.initialNetworkData = network;
            _this.network = network;
            _this.crcCounterPresenter = network.crcErrors - _this.crcDecreaser;
            _this.vlanId = network.vlanId;
            _this.vlanPriority = network.vlanPriority;
            _this.isVlanEnabled = _this.isInitialVlanEnabled();
        });
        this.trapsSub = this._store.select('traps')
            .subscribe(function (traps) {
            _this.traps = traps;
            _this.clonedTraps = JSON.parse(JSON.stringify(traps));
        });
        this.getNetwork();
    };
    NetworkConfigurationComponent.prototype.isInitialVlanEnabled = function () {
        return this.network.vlanId !== 0 && this.network.vlanPriority !== 0;
    };
    NetworkConfigurationComponent.prototype.isVlanEnabledByUser = function () {
        return this.isVlanEnabled && !this.isInitialVlanEnabled();
    };
    NetworkConfigurationComponent.prototype.ClearCrcCounter = function () {
        this._store.dispatch({ type: 'SET_CRC_DECREASER', payload: this.network.crcErrors });
        this.crcCounterPresenter = 0;
    };
    NetworkConfigurationComponent.prototype.getNetwork = function () {
        this._networkService.getData();
        this._trapsService.getData();
    };
    NetworkConfigurationComponent.prototype.isFormDisabled = function () {
        // if (this.isVlanEnabled === true) {
        //   // Check all 
        //   return !this.form.valid || this.form.pristine;
        // } else {
        //   // Skip vlan 
        //   return !this.form.controls['ipParams'].valid || !this.form.controls['currentPortState'].valid;
        // }
        return false;
    };
    NetworkConfigurationComponent.prototype.vlanCheckBoxClicked = function () {
        this.isVlanEnabled = !this.isVlanEnabled;
        if (this.isVlanEnabled === true) {
            this.vlanId = this.network.vlanId;
            this.vlanPriority = this.network.vlanPriority;
        }
        else {
            this.vlanId = 0;
            this.vlanPriority = 0;
        }
    };
    NetworkConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'network-configuration',
            template: __webpack_require__("./src/app/network/network-configuration.component.html"),
            styles: [__webpack_require__("./src/app/network/network.styles.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof network_service_1.NetworkService !== 'undefined' && network_service_1.NetworkService) === 'function' && _a) || Object, (typeof (_b = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _b) || Object, (typeof (_c = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _c) || Object, (typeof (_d = typeof traps_destinations_service_1.TrapsDestinationsService !== 'undefined' && traps_destinations_service_1.TrapsDestinationsService) === 'function' && _d) || Object, (typeof (_e = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _e) || Object])
    ], NetworkConfigurationComponent);
    return NetworkConfigurationComponent;
    var _a, _b, _c, _d, _e;
}());
exports.NetworkConfigurationComponent = NetworkConfigurationComponent;


/***/ },

/***/ "./src/app/network/network.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./src/app/network/network.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var networkUrl = consts_1.Consts.baseUrls.network;
var NetworkService = (function () {
    function NetworkService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
        // this.getData();
    }
    NetworkService.prototype.getData = function () {
        var _this = this;
        this._httpService.getData(networkUrl)
            .map(function (payload) { return ({ type: 'GET_NETWORK', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    NetworkService.prototype.setData = function (network) {
        var _this = this;
        this._httpService.postData(network, networkUrl)
            .subscribe(function (action) {
            //this._store.dispatch({ type: 'GET_NETWORK', payload: network });
            _this.getData();
        });
    };
    NetworkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], NetworkService);
    return NetworkService;
    var _a, _b;
}());
exports.NetworkService = NetworkService;


/***/ },

/***/ "./src/app/network/network.styles.scss":
/***/ function(module, exports) {

module.exports = ".custom-pagination {\n  display: flex;\n  height: auto;\n  flex-flow: row wrap;\n  justify-content: space-around; }\n\n.vlan-wrapper {\n  display: flex;\n  padding: 20px;\n  justify-content: center;\n  align-items: center;\n  min-height: 166px; }\n\n.vlan-content {\n  display: flex;\n  flex-flow: row wrap;\n  flex: 2; }\n\n.vlan-title {\n  padding-left: 10px;\n  padding-top: 10px;\n  width: 170px;\n  border-right: 1px solid #edeff0;\n  font-size: 18px; }\n\n.trap-title {\n  padding-left: 10px;\n  padding-top: 10px;\n  width: 120px;\n  font-size: 18px; }\n\n.vlan-form {\n  flex-flow: row wrap;\n  flex: 2;\n  background-color: #fbfbfb; }\n\n.traps-header {\n  padding-bottom: 80px; }\n\n.traps-buttons {\n  padding: 20px;\n  text-align: right; }\n"

/***/ },

/***/ "./src/app/network/trap-destination.component.html":
/***/ function(module, exports) {

module.exports = "\r\n    <form [formGroup]=\"trapform\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                    IP Address\r\n                    <input formControlName=\"hostIp\" [(ngModel)]=\"trap && trap.hostIp\" class=\"form-control\" type=\"text\">\r\n                    <div class=\"control-msgs\" *ngIf=\"trapform.controls.hostIp.dirty && !trapform.controls.hostIp.valid\">\r\n                        <p *ngIf=\"trapform.controls.hostIp.errors.invalidIp4\">IP Address is invalid</p>\r\n                        <p *ngIf=\"trapform.controls.hostIp.errors.required\">IP Address is required</p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                    Port\r\n                    <input formControlName=\"hostPort\" [(ngModel)]=\"trap && trap.hostPort\" class=\"form-control\" type=\"number\">\r\n                </div>\r\n            </div>\r\n            <!--<div class=\"col-lg-4\">\r\n                <div class=\"form-group\">\r\n                    Security Model\r\n                    <select formControlName=\"securityModel\" [(ngModel)]=\"securityModel\" class=\"form-control\">\r\n                       <option value=\"SNMPv1\">SNMPv1</option>\r\n                 </select>\r\n                </div>\r\n            </div>-->\r\n        </div>\r\n\r\n        <!--<div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                    Username\r\n                    <input class=\"form-control\" type=\"text\" readonly>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                    Password\r\n                    <input class=\"form-control\" type=\"text\" readonly>\r\n                </div>\r\n            </div>\r\n        </div>-->\r\n    </form>"

/***/ },

/***/ "./src/app/network/trap-destination.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var network_model_1 = __webpack_require__("./src/app/network/network.model.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var TrapComponent = (function () {
    function TrapComponent(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.securityModel = 'SNMPv1';
        this.trapform = _formBuilder.group({
            hostIp: ['', blocks_1.ip4Validator],
            hostPort: [''],
            securityModel: ['']
        });
    }
    TrapComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof network_model_1.ITrapDestination !== 'undefined' && network_model_1.ITrapDestination) === 'function' && _a) || Object)
    ], TrapComponent.prototype, "trap", void 0);
    TrapComponent = __decorate([
        core_1.Component({
            selector: 'trap-comp',
            template: __webpack_require__("./src/app/network/trap-destination.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
    ], TrapComponent);
    return TrapComponent;
    var _a, _b;
}());
exports.TrapComponent = TrapComponent;


/***/ },

/***/ "./src/app/network/traps-destinations.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var trapsUrl = consts_1.Consts.baseUrls.trapsDestinations;
var TrapsDestinationsService = (function () {
    function TrapsDestinationsService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
        // this.getData();
    }
    TrapsDestinationsService.prototype.getData = function () {
        var _this = this;
        this._httpService.getData(trapsUrl)
            .map(function (payload) { return ({ type: 'GET_TRAPS', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    TrapsDestinationsService.prototype.setData = function (traps) {
        var _this = this;
        this._httpService.postData(traps, trapsUrl)
            .subscribe(function (action) {
            // this._store.dispatch({ type: 'GET_NETWORK', payload: network });
            _this.getData();
        });
    };
    TrapsDestinationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], TrapsDestinationsService);
    return TrapsDestinationsService;
    var _a, _b;
}());
exports.TrapsDestinationsService = TrapsDestinationsService;


/***/ },

/***/ "./src/app/overview/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/overview/overview.component.ts"));


/***/ },

/***/ "./src/app/overview/overview.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <system-monitor></system-monitor>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n        <radio-monitor></radio-monitor>\r\n    </div>\r\n    <div class=\"col-md-8\">\r\n        <device-monitor device=\"HSU\" [tput]=\"monitor.hsuTput\" [rss]=\"monitor.hsuRss\" [tx]=\"monitor.hsuLan1TxMbps\" [rx]=\"monitor.hsuLan1RxMbps\">\r\n        </device-monitor>\r\n        <device-monitor device=\"HBS\" [tput]=\"monitor.hbsTput\" [rss]=\"monitor.hbsRss\" [tx]=\"monitor.hbsLan1TxMbps\" [rx]=\"monitor.hbsLan1RxMbps\">\r\n        </device-monitor>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <recent-events></recent-events>\r\n</div>"

/***/ },

/***/ "./src/app/overview/overview.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var system_1 = __webpack_require__("./src/app/system/index.ts");
var network_1 = __webpack_require__("./src/app/network/index.ts");
var radio_1 = __webpack_require__("./src/app/radio/index.ts");
var ng2_toastr_1 = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
var OverviewComponent = (function () {
    function OverviewComponent(_systemService, _networkService, _radioService, toastr, _store) {
        this._systemService = _systemService;
        this._networkService = _networkService;
        this._radioService = _radioService;
        this.toastr = toastr;
        this._store = _store;
    }
    OverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.toastr.success('You are awesome!', 'Success!');
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.monitor = monitor;
        });
        this._systemService.getData();
        this._networkService.getData();
        this._radioService.getData();
        // jQuery('.events-table-wrapper').slimScroll();
    };
    OverviewComponent.prototype.ngOnDestroy = function () {
        this.monitorSub.unsubscribe();
    };
    OverviewComponent = __decorate([
        core_1.Component({
            selector: 'overview',
            template: __webpack_require__("./src/app/overview/overview.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof system_1.SystemService !== 'undefined' && system_1.SystemService) === 'function' && _a) || Object, (typeof (_b = typeof network_1.NetworkService !== 'undefined' && network_1.NetworkService) === 'function' && _b) || Object, (typeof (_c = typeof radio_1.RadioService !== 'undefined' && radio_1.RadioService) === 'function' && _c) || Object, (typeof (_d = typeof ng2_toastr_1.ToastsManager !== 'undefined' && ng2_toastr_1.ToastsManager) === 'function' && _d) || Object, (typeof (_e = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _e) || Object])
    ], OverviewComponent);
    return OverviewComponent;
    var _a, _b, _c, _d, _e;
}());
exports.OverviewComponent = OverviewComponent;


/***/ },

/***/ "./src/app/quick-look/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/quick-look/quick-look.component.ts"));


/***/ },

/***/ "./src/app/quick-look/link-state.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var LinkStateComponent = (function () {
    function LinkStateComponent() {
    }
    Object.defineProperty(LinkStateComponent.prototype, "linkState", {
        get: function () {
            return this._linkState;
        },
        set: function (state) {
            if (state) {
                this._linkState = state;
                this.status = this.getCurrentStatus();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LinkStateComponent.prototype, "airState", {
        get: function () {
            return this._airState;
        },
        set: function (state) {
            if (state) {
                this._airState = state;
                this.status = this.getCurrentStatus();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    LinkStateComponent.prototype.ngOnInit = function () {
    };
    LinkStateComponent.prototype.getClass = function () {
        switch (this.linkState) {
            case 'Not Synchronized':
                return 'rad-sprite nosync';
            case 'Active Violated':
                return 'rad-sprite violated';
            case 'Active Unregistered':
                return 'rad-sprite syncunregistered';
            case 'Active':
                return 'rad-sprite registered';
            case 'Active Authentication Error':
                return 'rad-sprite authenticationerror';
            case 'Active SW Upgrade Required':
                return 'rad-sprite swuupgraderequired';
            default:
                return 'rad-sprite registered';
        }
    };
    LinkStateComponent.prototype.getCurrentStatus = function () {
        if (this._airState !== 'Active') {
            return this._airState;
        }
        else {
            return this._linkState;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], LinkStateComponent.prototype, "linkState", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], LinkStateComponent.prototype, "airState", null);
    LinkStateComponent = __decorate([
        core_1.Component({
            selector: 'link-state',
            template: "\n                <div class=\"info-box info-box-green\">\n                    <div class=\"info-box-icon\">\n                        <i [ngClass]=\"getClass()\"></i>\n                    </div>\n                    <div class=\"info-box-content\">\n                        <span class=\"info-box-label\">Status</span>\n                        <span class=\"info-box-text\">{{status}}</span>\n                        <!--<span class=\"info-box-text\">{{linkState}}</span>\n                        <span class=\"info-box-text\">{{airState}}</span>-->\n                    </div>\n                </div>\n            "
        }), 
        __metadata('design:paramtypes', [])
    ], LinkStateComponent);
    return LinkStateComponent;
}());
exports.LinkStateComponent = LinkStateComponent;


/***/ },

/***/ "./src/app/quick-look/quick-look.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"quick-look-wrapper\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-3 col-sm-6 col-xs-12\">\r\n            <link-state linkState=\"{{monitor?.hsuLinkState}}\" airState=\"{{monitor?.hsuAirState}}\"> </link-state>\r\n        </div>\r\n        <div class=\"col-md-3 col-sm-6 col-xs-12\">\r\n            <div class=\"info-box info-box-red\">\r\n                <div class=\"info-box-icon\">\r\n                    <i class=\"rad-sprite graph\"></i>\r\n                </div>\r\n                <div class=\"info-box-content\">\r\n                    <span class=\"info-box-label\">RSS</span>\r\n                    <span class=\"info-box-text\" *ngIf=\"!(monitor?.hsuLinkState == 'Not Synchronized')\">{{ monitor?.hsuRss | units: 'dbm'}}</span>\r\n                    <span class=\"info-box-text\" *ngIf=\"monitor?.hsuLinkState == 'Not Synchronized'\" >N/A</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-3 col-sm-6 col-xs-12\">\r\n            <div class=\"info-box\">\r\n                <div class=\"info-box-icon\">\r\n                    <i class=\"rad-sprite lantxrx\"></i>\r\n                </div>\r\n                <div class=\"info-box-content\" (click)=\"onLanClick($event)\">\r\n                    <span class=\"info-box-label\">LAN TX/RX</span>\r\n                    <span *ngIf=\"mbpsUnits\" style=\"cursor: pointer\" class=\"info-box-text\">{{monitor?.hsuLan1TxMbps}} / {{monitor?.hsuLan1RxMbps | units: 'mbs'}}</span>\r\n                    <span *ngIf=\"!mbpsUnits\" style=\"cursor: pointer\" class=\"info-box-text\">{{monitor?.hsuLan1TxFps}} / {{monitor?.hsuLan1RxFps | units: 'fps'}}</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-3 col-sm-6 col-xs-12\">\r\n            <div class=\"info-box info-box-light-blue\">\r\n                <div class=\"info-box-icon\">\r\n                    <i class=\"rad-sprite uptime\"></i>\r\n                </div>\r\n                <div class=\"info-box-content\">\r\n                    <span class=\"info-box-label\">Up Time</span>\r\n                    <span *ngIf=\"monitor?.upTime\" class=\"info-box-text\">{{ monitor?.upTime | timeTicks }}</span>\r\n                    <!--<span *ngIf=\"monitor?.upTime\" class=\"info-box-text\">{{ monitor?.upTime | timeTicks | date:'medium' }}</span>-->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div>\r\n        <div class=\"quick-look-bar\">\r\n            <div class=\"col-xs-6 col-md-3\">\r\n                <div class=\"quick-look-block border-right\">\r\n                    <div class=\"quick-look-header\">\r\n                        Sector ID\r\n                    </div>\r\n                    <span class=\"quick-look-text\">\r\n                    {{system?.sectorId}}\r\n                </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-xs-6 col-md-3\">\r\n                <div class=\"quick-look-block border-right\">\r\n                    <div class=\"quick-look-header\">\r\n                        Serial Number\r\n                    </div>\r\n                    <span class=\"quick-look-text\">\r\n                    {{system?.serialNumber}}\r\n                </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-xs-6 col-md-3\">\r\n                <div class=\"quick-look-block border-right\">\r\n                    <div class=\"quick-look-header\">\r\n                        SW Version\r\n                    </div>\r\n                    <span class=\"quick-look-text\">\r\n                    {{system?.swVersion}}\r\n                </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-xs-6 col-md-3\">\r\n                <div class=\"quick-look-block\">\r\n                    <div class=\"quick-look-header\">\r\n                        HW Version\r\n                    </div>\r\n                    <span class=\"quick-look-text\">\r\n                    {{system?.hwVersion}}\r\n                </span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>"

/***/ },

/***/ "./src/app/quick-look/quick-look.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var QuickLookComponent = (function () {
    function QuickLookComponent(_modalService, _router, _store) {
        this._modalService = _modalService;
        this._router = _router;
        this._store = _store;
        this.mbpsUnits = true;
        this.isTimeOutPopupOpen = false;
    }
    QuickLookComponent.prototype.ngOnInit = function () {
        var _this = this;
        shared_1.exLog('hello Quick Look component');
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.monitor = monitor;
        });
        this.systemSub = this._store.select('system')
            .subscribe(function (system) {
            _this.system = system;
        });
        this.alarmsCounterSub = this._store.select('alarmsCounter')
            .subscribe(function (counter) {
            _this.alarmsCounter = counter;
        });
        this.timeoutOccuredSub = this._store.select('timeoutOccured')
            .subscribe(function (timeoutOccured) {
            if (timeoutOccured && !_this.isTimeOutPopupOpen) {
                console.log('timeout');
                _this._modalService.activate(shared_1.Resources.timeout, shared_1.Resources.error, undefined, '', shared_1.Consts.ModalType.error)
                    .then(function (response) {
                    _this.isTimeOutPopupOpen = true;
                    _this._router.navigate(['login']);
                });
            }
        });
        this.tokenExpirationSub = this._store.select('tokenExpiration')
            .subscribe(function (tokenExpiration) {
            if (tokenExpiration) {
                _this._modalService.activate(shared_1.Resources.tokenExpiration, shared_1.Resources.error, undefined, '')
                    .then(function (response) {
                    _this._router.navigate(['login']);
                });
            }
        });
    };
    QuickLookComponent.prototype.ngOnDestroy = function () {
        this.systemSub.unsubscribe();
        this.monitorSub.unsubscribe();
        this.alarmsCounterSub.unsubscribe();
        this.timeoutOccuredSub.unsubscribe();
        this.tokenExpirationSub.unsubscribe();
    };
    QuickLookComponent.prototype.onLanClick = function () {
        this.mbpsUnits = !this.mbpsUnits;
    };
    QuickLookComponent = __decorate([
        core_1.Component({
            selector: 'quick-look',
            template: __webpack_require__("./src/app/quick-look/quick-look.component.html"),
            styles: [__webpack_require__("./src/app/quick-look/quick-look.styles.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _c) || Object])
    ], QuickLookComponent);
    return QuickLookComponent;
    var _a, _b, _c;
}());
exports.QuickLookComponent = QuickLookComponent;


/***/ },

/***/ "./src/app/quick-look/quick-look.styles.scss":
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ "./src/app/radio/change-band/change-band.component.html":
/***/ function(module, exports) {

module.exports = "<form *ngIf=\"bands\" [formGroup]=\"bandform\">\r\n    <div class=\"box-body\">\r\n        <fieldset>\r\n            <div class=\"form-group\">\r\n                Band:\r\n                <div class=\"input-group\">\r\n                    <select formControlName=\"currentBandId\" [(ngModel)]=\"bands.currentBandId\" class=\"form-control\">\r\n                         <option *ngFor=\"let band of bands?.bandsList\" [value]=\"band.bandId\">{{ band.description }}</option>\r\n                </select>\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n        <button form=\"bandform\" type=\"submit\" (click)=\"changeBand($event)\" [disabled]=\"!bandform.valid || bandform.pristine\" class=\"btn btn-default\">CHANGE BAND</button>\r\n    </div>\r\n</form>"

/***/ },

/***/ "./src/app/radio/change-band/change-band.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var change_band_service_1 = __webpack_require__("./src/app/radio/change-band/change-band.service.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
__webpack_require__("./node_modules/rxjs/add/observable/fromPromise.js");
var ChangeBandComponent = (function () {
    function ChangeBandComponent(_bandService, _store, _modalService, _formBuilder) {
        this._bandService = _bandService;
        this._store = _store;
        this._modalService = _modalService;
        this._formBuilder = _formBuilder;
        this.bandform = _formBuilder.group({
            currentBandId: ['']
        });
    }
    ChangeBandComponent.prototype.changeBand = function () {
        var _this = this;
        this._modalService.activate(shared_1.Resources.changeBandWarning, shared_1.Resources.warning)
            .then(function (responseOk) {
            if (responseOk) {
                shared_1.exLog('Change Band Form Value: ', _this.bandform.value);
                _this._bandService.setData(_this.bandform.value)
                    .subscribe(function (response) {
                    shared_1.exLog(response);
                    if (response.code === '200') {
                        var p = Promise.resolve(_this._modalService.activate(shared_1.Resources.reseting, shared_1.Resources.changeBandSuccess));
                        return Observable_1.Observable.fromPromise(p);
                    }
                });
            }
        });
    };
    ChangeBandComponent.prototype.canDeactivate = function () {
        if (!this.bandform || !this.bandform.dirty) {
            return true;
        }
        // Ask User
        return Observable_1.Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    };
    ChangeBandComponent.prototype.ngOnInit = function () {
        var _this = this;
        shared_1.exLog('hello Change Band Configuration Component');
        this.changeBandSub = this._store.select('changeBand')
            .subscribe(function (bands) {
            _this.bands = bands;
        });
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.monitor = monitor;
            _this.linkOff = monitor.hsuLinkState === 'Not Synchronized';
            if (!_this.linkOff) {
                _this.bandform.controls['currentBandId'].disable();
            }
            else {
                _this.bandform.controls['currentBandId'].enable();
            }
        });
    };
    ChangeBandComponent.prototype.ngOnDestroy = function () {
        this.changeBandSub.unsubscribe();
        this.monitorSub.unsubscribe();
    };
    ChangeBandComponent = __decorate([
        core_1.Component({
            selector: 'change-band',
            providers: [change_band_service_1.ChangeBandService],
            template: __webpack_require__("./src/app/radio/change-band/change-band.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof change_band_service_1.ChangeBandService !== 'undefined' && change_band_service_1.ChangeBandService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object, (typeof (_c = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _c) || Object, (typeof (_d = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _d) || Object])
    ], ChangeBandComponent);
    return ChangeBandComponent;
    var _a, _b, _c, _d;
}());
exports.ChangeBandComponent = ChangeBandComponent;


/***/ },

/***/ "./src/app/radio/change-band/change-band.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var changeBandUrl = shared_1.Consts.baseUrls.changeBand;
var ChangeBandService = (function () {
    function ChangeBandService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
        //this.getData();
    }
    ChangeBandService.prototype.getData = function () {
        var _this = this;
        this._httpService.getData(changeBandUrl)
            .map(function (payload) { return ({ type: 'GET_BANDS', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    ChangeBandService.prototype.setData = function (band) {
        return this._httpService.postData(band, changeBandUrl);
    };
    ChangeBandService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], ChangeBandService);
    return ChangeBandService;
    var _a, _b;
}());
exports.ChangeBandService = ChangeBandService;


/***/ },

/***/ "./src/app/radio/change-band/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/radio/change-band/change-band.component.ts"));
__export(__webpack_require__("./src/app/radio/change-band/change-band.service.ts"));


/***/ },

/***/ "./src/app/radio/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/radio/radio-configuration.component.ts"));
__export(__webpack_require__("./src/app/radio/radio-monitor.component.ts"));
__export(__webpack_require__("./src/app/radio/radio.service.ts"));
__export(__webpack_require__("./src/app/radio/radio.model.ts"));


/***/ },

/***/ "./src/app/radio/radio-configuration.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <h3 class=\"box-title\">Radio</h3>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"box box-light-blue\">\r\n            <form *ngIf=\"radio\" [formGroup]=\"form\">\r\n                <div class=\"box-body\">\r\n                    <fieldset>\r\n                        Antenna Type: {{radio.antennaType}} <br> Antenna Connection Type: {{radio.antennaConnectionType}}\r\n                        <br> TX Power (System): {{monitor?.configMonitor?.totalTxPower}} <br> EIRP: {{eirp | number:'2.0'\r\n                        | units: 'dbm' }} Max: {{monitor?.configMonitor?.maxEirp}} <br> TX Power(Per radio): {{monitor?.configMonitor?.currentTxPower}}\r\n                        <div class=\"form-group\">\r\n                            Sector ID\r\n                            <input formControlName=\"sectorId\" [(ngModel)]=\"radio.sectorId\" [readonly]=\"!canChangesectorId\" class=\"form-control\" type=\"text\">\r\n                            <div class=\"control-msgs\" *ngIf=\"form.controls.sectorId.dirty && !form.controls.sectorId.valid\">\r\n                                <p *ngIf=\"form.controls.sectorId.errors.minLength\">Sector ID is must be at least 4 characters.</p>\r\n                                <p *ngIf=\"form.controls.sectorId.errors.maxLength\">Sector ID is maximum characters is 24.</p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            Required TX Power Per Radio\r\n                            <div class=\"input-group\">\r\n                                <input formControlName=\"desiredTxPower\" [(ngModel)]=\"radio.desiredTxPower\" class=\"form-control\" type=\"number\" min={{radio.minTxPower}}\r\n                                    max=\"{{radio.maxTxPower}}\">\r\n                                <span class=\"input-group-addon\">dBm</span>\r\n                            </div>\r\n                            <div class=\"control-msgs\" *ngIf=\"form.controls.desiredTxPower.dirty && !form.controls.desiredTxPower.valid\">\r\n                                <p *ngIf=\"form.controls.desiredTxPower.errors.required\">TX Power Per Radio is required.</p>\r\n                                <p *ngIf=\"form.controls.desiredTxPower.errors.invalidMinMax\">Tx Power Per Radio should be between {{radio.minTxPower}}-{{radio.maxTxPower}}</p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            Antenna Gain\r\n                            <div class=\"input-group\">\r\n                                <input formControlName=\"antennaGain\" [(ngModel)]=\"radio.antennaGain\" class=\"form-control\" type=\"number\" step=\"0.1\" readonly\r\n                                    min=\"{{radio.minAntennaGain\" max=\"radio.maxAntennaGain}}\">\r\n                                <span class=\"input-group-addon\">dBi</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-6\">\r\n                                <div class=\"form-group\">\r\n                                    Channel Bandwidth\r\n                                    <div class=\"input-group\">\r\n                                        <select formControlName=\"currentCbw\" [(ngModel)]=\"radio.currentCbw\" class=\"form-control\" type=\"number\">\r\n                                            <option *ngFor=\"let cbw of radio?.options?.cbwList\" [value]=\"cbw\">{{ cbw }}</option>\r\n                                     </select>\r\n                                        <span class=\"input-group-addon\">MHz</span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-lg-6\">\r\n                                <div class=\"form-group\">\r\n                                    Frequency\r\n                                    <div class=\"input-group\">\r\n                                        <input [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"radio.currentFrequency\" class=\"form-control\" readonly>\r\n                                        <!--<span class=\"input-group-addon\">GHz</span>-->\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </fieldset>\r\n                </div>\r\n            </form>\r\n\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"col-md-6\">\r\n        <div class=\"box box-green\">\r\n            <change-band></change-band>\r\n        </div>\r\n        <div class=\"box\" *ngIf=\"radio.hsuType == 'Stationary' || radio.hsuType == 'Mobile'\">\r\n            <div class=\"box-header\">\r\n                <h3 class=\"box-title\">MOBILITY SETTINGS</h3>\r\n            </div>\r\n            <div class=\"box-body\">\r\n                <form *ngIf=\"radio\" [formGroup]=\"form\">\r\n                    <fieldset>\r\n                        <div class=\"form-group\">\r\n                            Mobility level\r\n                            <div class=\"input-group\">\r\n                                <select formControlName=\"mobilityLevels\" [(ngModel)]=\"radio.mobilityLevel\" class=\"form-control\" type=\"number\">\r\n                                        <option *ngFor=\"let level of mobilityLevels\" [value]=\"level\">{{ level }}</option>\r\n                                    </select>\r\n                            </div>\r\n                        </div>\r\n                    </fieldset>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"buttons-footer\">\r\n    <button form=\"form\" type=\"submit\" (click)=\"save($event)\" [disabled]=\"!form.valid || form.pristine\" class=\"btn btn-primary\">APPLY ALL</button>\r\n    <button form=\"form\" type=\"cancel\" (click)=\"cancel($event)\" class=\"btn btn-default\">CANCEL</button>\r\n</div>"

/***/ },

/***/ "./src/app/radio/radio-configuration.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var radio_service_1 = __webpack_require__("./src/app/radio/radio.service.ts");
var global_methods_1 = __webpack_require__("./src/app/shared/global-methods.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var change_band_1 = __webpack_require__("./src/app/radio/change-band/index.ts");
__webpack_require__("./node_modules/rxjs/add/observable/fromPromise.js");
var RadioConfigurationComponent = (function () {
    // private mask = [/[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/];
    // [textMask]="{mask: mask}"
    function RadioConfigurationComponent(_radioService, _modalService, _changeBandService, _store, _formBuilder) {
        this._radioService = _radioService;
        this._modalService = _modalService;
        this._changeBandService = _changeBandService;
        this._store = _store;
        this._formBuilder = _formBuilder;
        this.initializeForm();
    }
    RadioConfigurationComponent.prototype.save = function () {
        global_methods_1.exLog('Radio Form Value: ', this.form.value);
        var dirtyForm = {};
        for (var control in this.form.controls) {
            if (this.form.controls[control].dirty) {
                dirtyForm[control] = this.form.controls[control].value;
            }
        }
        this._radioService.setData(dirtyForm);
        this.form.reset();
    };
    RadioConfigurationComponent.prototype.cancel = function () {
        this.getRadio();
        this.form.reset();
    };
    RadioConfigurationComponent.prototype.canDeactivate = function () {
        if (!this.form || !this.form.dirty) {
            return true;
        }
        // Ask User
        return Observable_1.Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    };
    RadioConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        global_methods_1.exLog('hello Radio Configuration Component');
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.monitor = monitor;
            _this.canChangesectorId = monitor.hsuLinkState === 'Not Synchronized' ||
                monitor.hsuLinkState === 'Active Unregistered';
            _this.linkOff = monitor.hsuLinkState === 'Not Synchronized';
            // this.linkOff = monitor.hsuLinkState === Consts.linkStates.linkOff;
            if (!_this.linkOff) {
                _this.form.controls['currentCbw'].disable();
                _this.form.controls['mobilityLevels'].disable();
            }
            else {
                _this.form.controls['currentCbw'].enable();
                _this.form.controls['mobilityLevels'].enable();
            }
        });
        this.radioSub = this._store.select('radio')
            .subscribe(function (radio) {
            _this.radio = radio;
            _this.calculateEirp();
        });
        this.isLinkSynchronized = true;
        this.getRadio();
    };
    RadioConfigurationComponent.prototype.ngOnDestroy = function () {
        this.radioSub.unsubscribe();
        this.monitorSub.unsubscribe();
    };
    RadioConfigurationComponent.prototype.initializeForm = function () {
        var _this = this;
        this.mobilityLevels = [1, 2, 3, 4];
        this.form = this._formBuilder.group({
            sectorId: ['', forms_1.Validators.compose([forms_1.Validators.minLength(4), forms_1.Validators.maxLength(24)])],
            antennaGain: [''],
            desiredTxPower: ['', blocks_1.minMaxNumberValidator(-8, 25)],
            currentCbw: [''],
            mobilityLevels: ['']
        });
        if (this.form.controls['antennaGain']) {
            this.form.controls['antennaGain'].valueChanges.subscribe(function (value) {
                _this.calculateEirp();
            });
        }
    };
    RadioConfigurationComponent.prototype.calculateEirp = function () {
        if (this.radio !== undefined && this.monitor.configMonitor !== undefined) {
            this.eirp = this.monitor.configMonitor.totalTxPower + this.radio.antennaGain + this.radio.cableLoss / 10;
        }
    };
    RadioConfigurationComponent.prototype.getRadio = function () {
        this._radioService.getData();
        this._changeBandService.getData();
    };
    RadioConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'radio-configuration',
            template: __webpack_require__("./src/app/radio/radio-configuration.component.html"),
            styles: [__webpack_require__("./src/app/radio/radio.styles.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof radio_service_1.RadioService !== 'undefined' && radio_service_1.RadioService) === 'function' && _a) || Object, (typeof (_b = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _b) || Object, (typeof (_c = typeof change_band_1.ChangeBandService !== 'undefined' && change_band_1.ChangeBandService) === 'function' && _c) || Object, (typeof (_d = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _d) || Object, (typeof (_e = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _e) || Object])
    ], RadioConfigurationComponent);
    return RadioConfigurationComponent;
    var _a, _b, _c, _d, _e;
}());
exports.RadioConfigurationComponent = RadioConfigurationComponent;


/***/ },

/***/ "./src/app/radio/radio-monitor.component.html":
/***/ function(module, exports) {

module.exports = "<div>\r\n    <h3 class=\"box-title\">Radio</h3>\r\n    <div>\r\n        <div>\r\n            <table class=\"table radio-table\">\r\n                <tbody>\r\n                    <tr>\r\n                        <td colspan=\"2\">\r\n                            <div class=\"radio-table-icon\">\r\n                                <i class=\"rad-sprite globe\"></i>\r\n                            </div>\r\n                            <div class=\"quick-look-header\">\r\n                                Lat.    Long.       Hgt.\r\n                            </div>\r\n                            <div class=\"quick-look-text\">\r\n                                N/A, N/A, N/A\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n                <tbody class=\"radio-table-body\">\r\n                    <tr>\r\n                        <td>Sector ID</td>\r\n                        <td>{{ radio?.sectorId }}</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>Frequency</td>\r\n                        <td>{{ radio?.currentFrequency | units: 'ghz' }}</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>Band</td>\r\n                        <td>{{ radio?.currentBand }}</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>Channel BW</td>\r\n                        <td>{{ radio?.currentCbw | units: 'mhz' }}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ },

/***/ "./src/app/radio/radio-monitor.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var global_methods_1 = __webpack_require__("./src/app/shared/global-methods.ts");
var RadioMonitorComponent = (function () {
    function RadioMonitorComponent(_store) {
        this._store = _store;
        this.radio = {};
        this.monitor = {};
    }
    RadioMonitorComponent.prototype.ngOnInit = function () {
        var _this = this;
        global_methods_1.exLog('hello Radio monitor component');
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.monitor = monitor;
        });
        this.radioSub = this._store.select('radio')
            .subscribe(function (radio) {
            _this.radio = radio;
        });
    };
    RadioMonitorComponent.prototype.ngOnDestroy = function () {
        this.radioSub.unsubscribe();
        this.monitorSub.unsubscribe();
    };
    RadioMonitorComponent = __decorate([
        core_1.Component({
            selector: 'radio-monitor',
            template: __webpack_require__("./src/app/radio/radio-monitor.component.html"),
            styles: [__webpack_require__("./src/app/radio/radio.styles.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _a) || Object])
    ], RadioMonitorComponent);
    return RadioMonitorComponent;
    var _a;
}());
exports.RadioMonitorComponent = RadioMonitorComponent;


/***/ },

/***/ "./src/app/radio/radio.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./src/app/radio/radio.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var radioUrl = shared_1.Consts.baseUrls.radio;
var RadioService = (function () {
    function RadioService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
        // this.getData();
    }
    RadioService.prototype.getData = function () {
        var _this = this;
        this._httpService.getData(radioUrl)
            .map(function (payload) { return ({ type: 'GET_RADIO', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    RadioService.prototype.setData = function (radio) {
        var _this = this;
        this._httpService.postData(radio, radioUrl)
            .subscribe(function (action) {
            // this._store.dispatch({ type: 'SET_RADIO', payload: radio });
            _this.getData();
        });
    };
    RadioService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], RadioService);
    return RadioService;
    var _a, _b;
}());
exports.RadioService = RadioService;


/***/ },

/***/ "./src/app/radio/radio.styles.scss":
/***/ function(module, exports) {

module.exports = ".radio-table-body {\n  background-image: url(\"/assets/icon/pattern.png\");\n  background-repeat: initial;\n  border-top: 1px solid #cfd3da; }\n\n.radio-table > thead > tr > th, .radio-table > tbody > tr > th, .radio-table > tfoot > tr > th, .radio-table > thead > tr > td, .radio-table > tbody > tr > td, .radio-table > tfoot > tr > td {\n  border-top: 1px solid #cfd3da; }\n\n.radio-table tr td .progress {\n  margin-top: 5px; }\n\n.radio-table-icon {\n  float: left;\n  padding-right: 20px; }\n"

/***/ },

/***/ "./src/app/recent-events/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/recent-events/recent-events.component.ts"));
__export(__webpack_require__("./src/app/recent-events/recent-events.service.ts"));
__export(__webpack_require__("./src/app/recent-events/recent-events.model.ts"));


/***/ },

/***/ "./src/app/recent-events/recent-events.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"col-md-12\">\r\n    <div class=\"events-title\">\r\n        <h3 class=\"box-title\">Events</h3>\r\n        <i class=\"rad-sprite refresh\" (click)=\"refresh()\" ></i>\r\n    </div>\r\n    <div class=\"box\">\r\n        <div class=\"box-body\">\r\n            <div class=\"events-table-wrapper\">\r\n                <table class=\"table\" *ngIf=\"events\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th></th>\r\n                            <th class=\"events-th\">#</th>\r\n                            <th class=\"events-th\">Date & Time</th>\r\n                            <th class=\"events-th\">Description</th>\r\n                            <th class=\"events-th\">Interface</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor=\"let event of events\">\r\n                            <td><i [ngClass]=\"getSeverityClass(event.severity)\"></i></td>\r\n                            <td>{{ event.eventIndex }}</td>\r\n                            <td>{{ event.dateAndTime }}</td>\r\n                            <td>{{ event.description }}</td>\r\n                            <td>{{ event.interfaceName }}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ },

/***/ "./src/app/recent-events/recent-events.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var recent_events_service_1 = __webpack_require__("./src/app/recent-events/recent-events.service.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var global_methods_1 = __webpack_require__("./src/app/shared/global-methods.ts");
var RecentEventsComponent = (function () {
    function RecentEventsComponent(_recentEventsService, _store) {
        this._recentEventsService = _recentEventsService;
        this._store = _store;
    }
    RecentEventsComponent.prototype.getRecentEvents = function () {
        this._recentEventsService.getData();
    };
    RecentEventsComponent.prototype.ngOnInit = function () {
        var _this = this;
        global_methods_1.exLog('hello Recent Events component');
        this.eventsSub = this._store.select('events')
            .subscribe(function (events) {
            _this.events = events;
        });
        this.getRecentEvents();
    };
    RecentEventsComponent.prototype.ngOnDestroy = function () {
        this.eventsSub.unsubscribe();
    };
    RecentEventsComponent.prototype.refresh = function () {
        global_methods_1.exLog('Refresh Recent Events table');
        this.getRecentEvents();
    };
    RecentEventsComponent.prototype.getSeverityClass = function (severity) {
        switch (severity) {
            case consts_1.Consts.TrapType[consts_1.Consts.TrapType.Info]:
                return 'severity-circle info';
            case consts_1.Consts.TrapType[consts_1.Consts.TrapType.Normal]:
                return 'severity-circle normal';
            case consts_1.Consts.TrapType[consts_1.Consts.TrapType.Warning]:
                return 'severity-circle warning';
            case consts_1.Consts.TrapType[consts_1.Consts.TrapType.Minor]:
                return 'severity-circle minor';
            case consts_1.Consts.TrapType[consts_1.Consts.TrapType.Major]:
                return 'severity-circle major';
            case consts_1.Consts.TrapType[consts_1.Consts.TrapType.Critical]:
                return 'severity-circle critical';
            default:
                return 'severity-circle';
        }
    };
    RecentEventsComponent = __decorate([
        core_1.Component({
            selector: 'recent-events',
            providers: [recent_events_service_1.RecentEventsService],
            styles: [__webpack_require__("./src/app/recent-events/recent-events.styles.scss")],
            template: __webpack_require__("./src/app/recent-events/recent-events.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof recent_events_service_1.RecentEventsService !== 'undefined' && recent_events_service_1.RecentEventsService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], RecentEventsComponent);
    return RecentEventsComponent;
    var _a, _b;
}());
exports.RecentEventsComponent = RecentEventsComponent;


/***/ },

/***/ "./src/app/recent-events/recent-events.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./src/app/recent-events/recent-events.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var recentEventsUrl = consts_1.Consts.baseUrls.recentEvents;
var RecentEventsService = (function () {
    function RecentEventsService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
    }
    RecentEventsService.prototype.getData = function () {
        var _this = this;
        this._httpService.getData(recentEventsUrl)
            .map(function (payload) { return ({ type: 'GET_EVENTS', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    RecentEventsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], RecentEventsService);
    return RecentEventsService;
    var _a, _b;
}());
exports.RecentEventsService = RecentEventsService;


/***/ },

/***/ "./src/app/recent-events/recent-events.styles.scss":
/***/ function(module, exports) {

module.exports = ".events-title {\n  display: inline-flex; }\n\n.events-table-wrapper {\n  overflow: auto;\n  height: 220px;\n  font-size: 16px; }\n\n.events-th {\n  color: #a0a8b6;\n  font-family: Roboto;\n  font-size: 14px;\n  font-weight: 400; }\n\n.severity-circle {\n  width: 15px;\n  height: 15px;\n  display: inline-block;\n  border-radius: 50%;\n  border: 3px solid; }\n\n.severity-circle.info {\n  border: 1px solid;\n  border-color: #d7dadd; }\n\n.severity-circle.normal {\n  border: 2px solid;\n  border-color: #c2caef; }\n\n.severity-circle.warning {\n  border: 3px solid;\n  border-color: #efce39; }\n\n.severity-circle.minor {\n  border: 4px solid;\n  border-color: #ef8939; }\n\n.severity-circle.major {\n  border: 5px solid;\n  border-color: #ec1f27; }\n\n.severity-circle.critical {\n  border: 6px solid;\n  border-color: #ec1f27; }\n"

/***/ },

/***/ "./src/app/security/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/security/security-configuration.component.ts"));
__export(__webpack_require__("./src/app/security/security.service.ts"));
__export(__webpack_require__("./src/app/security/security.model.ts"));


/***/ },

/***/ "./src/app/security/security-configuration.component.html":
/***/ function(module, exports) {

module.exports = "<h3 class=\"box-title\">\n\tLink Password\n</h3>\n<div class=\"row\">\n\t<div class=\"col-md-8\">\n\t\t<div class=\"box box-green\">\n\t\t\t<form [formGroup]=\"linkPasswordForm\">\n\t\t\t\t<fieldset [disabled]=\"isChangeLinkPasswordDisabled()\">\n\t\t\t\t\t<div class=\"box-body\">\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-xs-6 col-sm-3 col-md-3\">\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\tCurrent Password\n\t\t\t\t\t\t\t\t\t<input formControlName=\"currentPassword\" class=\"form-control\" type=\"password\" maxlength=\"16\">\n\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"linkPasswordForm.controls.currentPassword.dirty && !linkPasswordForm.controls.currentPassword.valid\">\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.currentPassword.errors.required\">Current Password is required</p>\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.currentPassword.errors.invalidPassword\">Current Password is invalid</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div formGroupName=\"matchingPasswords\">\n\t\t\t\t\t\t\t\t<div class=\"col-xs-6 col-sm-3 col-md-3\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\tNew Password\n\t\t\t\t\t\t\t\t\t\t<input formControlName=\"newPassword\" class=\"form-control\" type=\"password\" maxlength=\"16\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.newPassword.dirty && !linkPasswordForm.controls.matchingPasswords.controls.newPassword.valid\">\n\t\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.newPassword.errors.required\">New Password is required</p>\n\t\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.newPassword.errors.invalidPassword\">New Password is invalid</p>\n\t\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.newPassword.errors.minlength\">The Link Password value should be at least 8 characters long.</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xs-6 col-sm-3 col-md-3\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\tConfirm Password\n\t\t\t\t\t\t\t\t\t\t<input formControlName=\"confirmPassword\" class=\"form-control\" type=\"password\" maxlength=\"16\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.confirmPassword.dirty && !linkPasswordForm.controls.matchingPasswords.controls.confirmPassword.valid\">\n\t\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.confirmPassword.errors.required\">Confirm Password is required</p>\n\t\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.confirmPassword.errors.invalidPassword\">Confirm Password is invalid</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"linkPasswordForm.controls.matchingPasswords.controls.confirmPassword.dirty \n                                    && linkPasswordForm.controls.matchingPasswords.controls.newPassword.dirty &&!linkPasswordForm.controls.matchingPasswords.valid\">\n\t\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"linkPasswordForm.controls.matchingPasswords.errors.passwordsMismatch\">Confirm Password mismatch</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-xs-6 col-sm-3 col-md-3\">\n\t\t\t\t\t\t\t\t<div class=\"box-buttons\">\n\t\t\t\t\t\t\t\t\t<button form=\"form\" type=\"submit\" (click)=\"save($event)\" [disabled]=\"!linkPasswordForm.valid || linkPasswordForm.pristine\"\n\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-primary\">SAVE</button>\n\t\t\t\t\t\t\t\t\t<button form=\"form\" type=\"cancel\" (click)=\"cancel($event)\" class=\"btn btn-default\">CANCEL</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</fieldset>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>"

/***/ },

/***/ "./src/app/security/security-configuration.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var security_service_1 = __webpack_require__("./src/app/security/security.service.ts");
var operations_service_1 = __webpack_require__("./src/app/tools/operations/operations.service.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
__webpack_require__("./node_modules/rxjs/add/observable/fromPromise.js");
var SecurityConfigurationComponent = (function () {
    function SecurityConfigurationComponent(_securityService, _modalService, _operationsService, _store, _formBuilder) {
        this._securityService = _securityService;
        this._modalService = _modalService;
        this._operationsService = _operationsService;
        this._store = _store;
        this._formBuilder = _formBuilder;
        this.linkPasswordForm = _formBuilder.group({
            matchingPasswords: this._formBuilder.group({
                newPassword: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_1.invalidPasswordValidator, forms_1.Validators.minLength(8)])],
                confirmPassword: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_1.invalidPasswordValidator, forms_1.Validators.minLength(8)])],
            }, { validator: blocks_1.matchingPasswordsValidator }),
            currentPassword: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_1.invalidPasswordValidator])],
        });
    }
    SecurityConfigurationComponent.prototype.save = function () {
        var _this = this;
        shared_1.exLog('Security Form Value: ', this.linkPasswordForm.value);
        var dirtyForm = {};
        dirtyForm.currentPassword = this.linkPasswordForm.controls['currentPassword'].value;
        dirtyForm.newPassword = this.linkPasswordForm.controls['matchingPasswords'].value['newPassword'];
        this._securityService.setData(dirtyForm)
            .subscribe(function (response) {
            var p;
            if (response && response.message) {
                p = Promise.resolve(_this._modalService.activate(shared_1.Resources.changeLinkPasswordSuccess, 'Link Password'));
                _this._operationsService.resync().subscribe();
            }
            else {
                p = Promise.resolve(_this._modalService.activate(shared_1.Resources.changeLinkPasswordFailure, 'Link Password'));
            }
            return Observable_1.Observable.fromPromise(p);
        });
    };
    SecurityConfigurationComponent.prototype.cancel = function () {
        this.linkPasswordForm.reset();
    };
    SecurityConfigurationComponent.prototype.canDeactivate = function () {
        if (!this.linkPasswordForm || !this.linkPasswordForm.dirty) {
            return true;
        }
        // Ask User
        return Observable_1.Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    };
    SecurityConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        shared_1.exLog('hello Security Configuration Component');
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this._isChangeLinkPasswordEnabled = monitor.hsuLinkState === 'Not Synchronized' ||
                monitor.hsuLinkState === 'Active Authentication Error';
        });
    };
    SecurityConfigurationComponent.prototype.ngOnDestroy = function () {
        this.monitorSub.unsubscribe();
    };
    SecurityConfigurationComponent.prototype.isChangeLinkPasswordDisabled = function () {
        return !this._isChangeLinkPasswordEnabled;
    };
    SecurityConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'security-configuration',
            providers: [security_service_1.SecurityService, operations_service_1.OperationsService],
            template: __webpack_require__("./src/app/security/security-configuration.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof security_service_1.SecurityService !== 'undefined' && security_service_1.SecurityService) === 'function' && _a) || Object, (typeof (_b = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _b) || Object, (typeof (_c = typeof operations_service_1.OperationsService !== 'undefined' && operations_service_1.OperationsService) === 'function' && _c) || Object, (typeof (_d = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _d) || Object, (typeof (_e = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _e) || Object])
    ], SecurityConfigurationComponent);
    return SecurityConfigurationComponent;
    var _a, _b, _c, _d, _e;
}());
exports.SecurityConfigurationComponent = SecurityConfigurationComponent;


/***/ },

/***/ "./src/app/security/security.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./src/app/security/security.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var changeLinkPasswordUrl = consts_1.Consts.baseUrls.changeLinkPassword;
var SecurityService = (function () {
    function SecurityService(_httpService) {
        this._httpService = _httpService;
    }
    // getData(): Observable<ISecurityModel> {
    //   return this._httpService.getData(changeLinkPasswordUrl);
    // }
    SecurityService.prototype.setData = function (security) {
        return this._httpService.postData(security, changeLinkPasswordUrl);
    };
    SecurityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object])
    ], SecurityService);
    return SecurityService;
    var _a;
}());
exports.SecurityService = SecurityService;


/***/ },

/***/ "./src/app/shared/consts.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Consts;
(function (Consts) {
    'use strict';
    var url = window.location.protocol + '//' + window.location.hostname;
    Consts.ip = window.location.hostname;
    if (false) {
    }
    else {
        url += ':5000';
    }
    Consts.timeoutRetries = 3;
    Consts.monitorInterval = 2000;
    Consts.jwtToken = 'jwt';
    Consts.jwtPrefix = 'JWT ';
    Consts.baseUrls = {
        auth: url + '/auth',
        system: url + '/api/v1/data/system',
        radio: url + '/api/v1/data/radio',
        recentEvents: url + '/api/v1/data/recent-events',
        activeAlarms: url + '/api/v1/data/active-alarms',
        network: url + '/api/v1/data/network',
        monitor: url + '/api/v1/data/monitor',
        wifi: url + '/api/v1/data/wifi',
        trapsDestinations: url + '/api/v1/data/traps-destinations',
        ping: url + '/api/v1/operations/ping',
        trace: url + '/api/v1/operations/trace',
        resync: url + '/api/v1/operations/resync',
        reset: url + '/api/v1/operations/reset',
        speed: url + '/api/v1/operations/speed-test',
        restoreToDefaults: url + '/api/v1/operations/restore-to-defaults',
        changeBand: url + '/api/v1/operations/change-band',
        activateLicense: url + '/api/v1/operations/activate-license',
        changeLinkPassword: url + '/api/v1/operations/change-link-password',
        diagnostics: url + '/api/v1/operations/diagnostics',
        // Swu
        swuStart: url + '/api/v1/operations/software-upgrade/start',
        swuValidate: url + '/api/v1/operations/software-upgrade/validate',
        swuUpload: url + '/api/v1/operations/software-upgrade/upload',
        swuBackup: url + '/api/v1/operations/software-upgrade/backup',
        // Spectrum
        spectrumStart: url + '/api/v1/operations/spectrum/start',
        spectrumStop: url + '/api/v1/operations/spectrum/stop',
        spectrumRange: url + '/api/v1/operations/spectrum/range',
        spectrumTable: url + '/api/v1/operations/spectrum/table',
        skipAlignment: url + '/api/v1/alignment/action/skip'
    };
    (function (linkStates) {
        linkStates[linkStates["linkOff"] = 'Not Synchronized'] = "linkOff";
        linkStates[linkStates["violated"] = 'Active Violated'] = "violated";
        linkStates[linkStates["unregistered"] = 'Active Unregistered'] = "unregistered";
        linkStates[linkStates["registered"] = 'Active'] = "registered";
        linkStates[linkStates["authenticationError"] = 'Active Authentication Error'] = "authenticationError";
        linkStates[linkStates["swUpgradeRequired"] = 'Active SW Upgrade Required'] = "swUpgradeRequired";
        linkStates[linkStates["registeredPassive"] = 'Active'] = "registeredPassive";
    })(Consts.linkStates || (Consts.linkStates = {}));
    var linkStates = Consts.linkStates;
    (function (ModalType) {
        ModalType[ModalType["question"] = 1] = "question";
        ModalType[ModalType["info"] = 2] = "info";
        ModalType[ModalType["warning"] = 3] = "warning";
        ModalType[ModalType["error"] = 4] = "error";
    })(Consts.ModalType || (Consts.ModalType = {}));
    var ModalType = Consts.ModalType;
    ;
    (function (TrapType) {
        TrapType[TrapType["Info"] = 1] = "Info";
        TrapType[TrapType["Normal"] = 2] = "Normal";
        TrapType[TrapType["Warning"] = 4] = "Warning";
        TrapType[TrapType["Minor"] = 8] = "Minor";
        TrapType[TrapType["Major"] = 16] = "Major";
        TrapType[TrapType["Critical"] = 32] = "Critical";
    })(Consts.TrapType || (Consts.TrapType = {}));
    var TrapType = Consts.TrapType;
    ;
})(Consts = exports.Consts || (exports.Consts = {}));


/***/ },

/***/ "./src/app/shared/global-methods.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function propertiesDiffer(entityA, entityB) {
    return Object.keys(entityA).find(function (key) { return entityA[key] !== entityB[key]; });
}
exports.propertiesDiffer = propertiesDiffer;
function exLog() {
    var mix = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mix[_i - 0] = arguments[_i];
    }
    if (false) {
    }
    else {
        console.log.apply(console, mix);
    }
}
exports.exLog = exLog;


/***/ },

/***/ "./src/app/shared/headers.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
exports.contentHeaders = new http_1.Headers();
exports.contentHeaders.append('Accept', 'application/json');
exports.contentHeaders.append('Content-Type', 'application/json');
exports.reqPostOptions = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });


/***/ },

/***/ "./src/app/shared/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/shared/consts.ts"));
__export(__webpack_require__("./src/app/shared/global-methods.ts"));
__export(__webpack_require__("./src/app/shared/headers.ts"));
__export(__webpack_require__("./src/app/shared/resources.ts"));


/***/ },

/***/ "./src/app/shared/resources.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var Resources;
(function (Resources) {
    'use strict';
    Resources.wrongUserPassword = "Wrong username or password";
    Resources.loginTitle = 'Login';
    Resources.timeout = 'Timeout occured';
    Resources.tokenExpiration = 'Session timeout, please re-login';
    Resources.error = 'Error';
    Resources.changeBandSuccess = 'Change Band Successfully';
    Resources.reseting = 'Device is about to reset';
    Resources.changeBandWarning = 'Are you sure you want to change band ?';
    Resources.warning = 'Warning';
    Resources.pingInProgressWarning = 'Ping in progress, are you sure you want to cancel ?';
    Resources.traceInProgressWarning = 'Trace in progress, are you sure you want to cancel ?';
    Resources.speedTestInProgressWarning = 'Speed Test in progress, are you sure you want to cancel ?';
    Resources.resultWillShownHere = 'Result will shown here';
    Resources.resetWarning = 'Are you sure you want to reset ?';
    Resources.resyncWarning = 'Are you sure you want to resync ?';
    Resources.spectrumWarning = "This operation will cause the HSU to stop service for up to {0} \n    sec or until Stop button pressed. Are you sure you want to start Spectrum Analysis ?";
    Resources.changeLinkPasswordSuccess = "Link Password changed successfully";
    Resources.changeLinkPasswordFailure = "Link Password failed";
    Resources.changeIpParamsWarning = 'You have set new IP Configuration and the connection will be reset.\n All changes made on this page will be discarded.\n Continue ?';
    Resources.changeMngVlanWarning = 'Enabling the VLAN tagging inhibits access from non VLAN tagged sources.\n Do not enable VLAN unless you are sure you can generate/receive VLAN tagged traffic.\n Continue ?';
    Resources.activateDeviceWarning = 'You are about to activate an HSU. Please make sure you know exactly the HBS location for alignment.\n Continue ?';
    Resources.restoreWarning = "You are about to restore device to release {0}.\n Some of the current configuration settings may be lost.\n Do you wish to continue ?";
    Resources.backupFailed = 'Backup Failed';
})(Resources = exports.Resources || (exports.Resources = {}));


/***/ },

/***/ "./src/app/system/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/system/system-configuration.component.ts"));
__export(__webpack_require__("./src/app/system/system-monitor.component.ts"));
__export(__webpack_require__("./src/app/system/system.service.ts"));
__export(__webpack_require__("./src/app/system/system.model.ts"));


/***/ },

/***/ "./src/app/system/system-configuration.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n    <h3 class=\"box-title\">System</h3>\n    <div class=\"col-md-6\">\n        <div class=\"box box-light-blue\">\n            <form *ngIf=\"system\" [formGroup]=\"form\">\n                <div class=\"box-body\">\n                    <div>\n                        <fieldset>\n                            <div class=\"form-group\">\n                                Name\n                                <input formControlName=\"hsuName\" [(ngModel)]=\"system.hsu && system.hsu.hsuName\" class=\"form-control\" type=\"text\" maxlength=\"30\">\n                                <div class=\"control-msgs\" *ngIf=\"form.controls.hsuName.dirty && !form.controls.hsuName.valid\">\n                                    <p *ngIf=\"form.controls.hsuName.errors.required\">Name is required.</p>\n                                    <p *ngIf=\"form.controls.hsuName.errors.invalidChars\">Bad chars: ,'%</p>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <div class=\"form-group\">\n                                        Location\n                                        <input formControlName=\"hsuLocation\" [(ngModel)]=\"system.hsu && system.hsu.hsuLocation\" class=\"form-control\" type=\"text\"\n                                            maxlength=\"30\">\n                                        <div class=\"control-msgs\" *ngIf=\"form.controls.hsuLocation.dirty && !form.controls.hsuLocation.valid\">\n                                            <p *ngIf=\"form.controls.hsuLocation.errors.required\">Location is required.</p>\n                                            <p *ngIf=\"form.controls.hsuLocation.errors.invalidChars\">Bad chars: ,'%</p>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <div class=\"col-lg-6\">\n                                        Contact\n                                        <input formControlName=\"hsuContact\" [(ngModel)]=\"system.hsu && system.hsu.hsuContact\" class=\"form-control\" type=\"text\" maxlength=\"30\">\n                                        <div class=\"control-msgs\" *ngIf=\"form.controls.hsuContact.dirty && !form.controls.hsuContact.valid\">\n                                            <p *ngIf=\"form.controls.hsuContact.errors.required\">Contact is required.</p>\n                                            <p *ngIf=\"form.controls.hsuContact.errors.invalidChars\">Bad chars: ,'%</p>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <div class=\"form-group\">\n                                        NTP Server\n                                        <input formControlName=\"ntpServer\" [(ngModel)]=\"system.ntpServer\" class=\"form-control\" type=\"text\">\n                                        <div class=\"control-msgs\" *ngIf=\"form.controls.ntpServer.dirty && !form.controls.ntpServer.valid\">\n                                            <p *ngIf=\"form.controls.ntpServer.errors.invalidNtpServer\">NTP server is invalid.</p>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-6\">\n                                    <div class=\"form-group\">\n                                        Offset [Minutes]\n                                        <input formControlName=\"ntpTimeOffsetFromUTC\" [(ngModel)]=\"system.ntpTimeOffsetFromUTC\" class=\"form-control\" type=\"number\"\n                                            min=-1439 max=1439>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <div *ngIf=\"monitor.realTimeAndDate\" class=\"form-group\">\n                                        Date & Time\n                                        {{monitor.realTimeAndDate | date: 'medium'}}\n                                    </div>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n\n<div class=\"buttons-footer\">\n    <button form=\"form\" type=\"submit\" (click)=\"save($event)\" [disabled]=\"!form.valid || form.pristine\" class=\"btn btn-primary\">APPLY ALL</button>\n    <button form=\"form\" type=\"cancel\" (click)=\"cancel($event)\" class=\"btn btn-default\">CANCEL</button>\n</div>"

/***/ },

/***/ "./src/app/system/system-configuration.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var system_service_1 = __webpack_require__("./src/app/system/system.service.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var blocks_2 = __webpack_require__("./src/app/blocks/index.ts");
__webpack_require__("./node_modules/rxjs/add/observable/fromPromise.js");
var SystemConfigurationComponent = (function () {
    function SystemConfigurationComponent(_systemService, _store, _modalService, _formBuilder) {
        this._systemService = _systemService;
        this._store = _store;
        this._modalService = _modalService;
        this._formBuilder = _formBuilder;
        this.form = _formBuilder.group({
            hsuName: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.restrictedCharsValidator])],
            hsuLocation: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.restrictedCharsValidator])],
            hsuContact: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.restrictedCharsValidator])],
            ntpServer: ['', blocks_2.ntpServerValidator],
            ntpTimeOffsetFromUTC: ['']
        });
    }
    SystemConfigurationComponent.prototype.save = function () {
        var dirtyForm = {};
        for (var control in this.form.controls) {
            if (this.form.controls[control].dirty) {
                dirtyForm[control] = this.form.controls[control].value;
            }
        }
        this._systemService.setData(dirtyForm);
        this.form.reset();
    };
    SystemConfigurationComponent.prototype.cancel = function () {
        this.getSystem();
        this.form.reset();
    };
    SystemConfigurationComponent.prototype.canDeactivate = function () {
        if (!this.form || !this.form.dirty) {
            return true;
        }
        // Ask User
        return Observable_1.Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    };
    SystemConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        shared_1.exLog('hello System Configuration Component');
        this.systemSub = this._store.select('system')
            .subscribe(function (system) {
            _this.system = system;
        });
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.monitor = monitor;
        });
        this.getSystem();
    };
    SystemConfigurationComponent.prototype.ngOnDestroy = function () {
        this.systemSub.unsubscribe();
        this.monitorSub.unsubscribe();
    };
    SystemConfigurationComponent.prototype.getSystem = function () {
        this._systemService.getData();
    };
    SystemConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'system-configuration',
            template: __webpack_require__("./src/app/system/system-configuration.component.html"),
            styles: [__webpack_require__("./src/app/system/system.styles.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof system_service_1.SystemService !== 'undefined' && system_service_1.SystemService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object, (typeof (_c = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _c) || Object, (typeof (_d = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _d) || Object])
    ], SystemConfigurationComponent);
    return SystemConfigurationComponent;
    var _a, _b, _c, _d;
}());
exports.SystemConfigurationComponent = SystemConfigurationComponent;


/***/ },

/***/ "./src/app/system/system-monitor.component.html":
/***/ function(module, exports) {

module.exports = "<div>\r\n    <h3 class=\"box-title\">System</h3>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"box box-green\">\r\n            <div class=\"box-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4\">\r\n                        <div class=\"system-box-title\">\r\n                            HSU\r\n                        </div>\r\n                        <div style=\"font-size: 18px;\">\r\n                        {{system?.hsu?.hsuName}} \r\n                        {{system?.hsu?.hsuLocation}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            IP Address\r\n                        </div>\r\n                        <div class=\"info-box-text sm\">\r\n                            {{network?.ipParams?.hsuIp}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            Subnet Mask\r\n                        </div>\r\n                        <div class=\"info-box-text sm\">\r\n                            {{network?.ipParams?.hsuSubnetMask}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            Def. Gateway\r\n                        </div>\r\n                        <div class=\"info-box-text sm\">\r\n                            {{network?.ipParams?.hsuDefaultGateway}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            MAC Address\r\n                        </div>\r\n                        <div class=\"info-box-text sm\">\r\n                            {{ system?.macAddress }}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"col-md-6\" *ngIf=\"system?.hbs?.hbsName\">\r\n        <div class=\"box\">\r\n            <div class=\"box-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4\">\r\n                        <div class=\"system-box-title\">\r\n                            HBS\r\n                        </div>\r\n                        <div style=\"font-size: 18px;\" *ngIf='isLinkSynchronized'>\r\n                            {{system?.hbs?.hbsName}} \r\n                            {{system?.hbs?.hbsLocation}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            IP Address\r\n                        </div>\r\n                        <div class=\"info-box-text sm\" *ngIf='isLinkSynchronized'>\r\n                            {{system?.hbs?.hbsIp | noneValuePipe }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            Subnet Mask\r\n                        </div>\r\n                        <div class=\"info-box-text sm\" *ngIf='isLinkSynchronized'>\r\n                            {{system?.hbs?.hbsSubnetMask | noneValuePipe}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            Def. Gateway\r\n                        </div>\r\n                        <div class=\"info-box-text sm\">\r\n                            N/A\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"info-box-label\">\r\n                            MAC Address\r\n                        </div>\r\n                        <div class=\"info-box-text sm\">\r\n                            N/A\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ },

/***/ "./src/app/system/system-monitor.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var global_methods_1 = __webpack_require__("./src/app/shared/global-methods.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var SystemMonitorComponent = (function () {
    function SystemMonitorComponent(_store) {
        this._store = _store;
        this.system = {};
        this.network = {};
    }
    SystemMonitorComponent.prototype.ngOnInit = function () {
        var _this = this;
        global_methods_1.exLog('hello System Monitor component');
        this.systemSub = this._store.select('system')
            .subscribe(function (system) {
            _this.system = system;
        });
        this.networkSub = this._store.select('network')
            .subscribe(function (network) {
            _this.network = network;
        });
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.isLinkSynchronized = monitor.hsuLinkState !== 'Not Synchronized';
        });
    };
    SystemMonitorComponent.prototype.ngOnDestroy = function () {
        this.systemSub.unsubscribe();
        this.networkSub.unsubscribe();
    };
    SystemMonitorComponent = __decorate([
        core_1.Component({
            selector: 'system-monitor',
            styles: [__webpack_require__("./src/app/system/system.styles.scss")],
            template: __webpack_require__("./src/app/system/system-monitor.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _a) || Object])
    ], SystemMonitorComponent);
    return SystemMonitorComponent;
    var _a;
}());
exports.SystemMonitorComponent = SystemMonitorComponent;


/***/ },

/***/ "./src/app/system/system.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./src/app/system/system.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var systemUrl = shared_1.Consts.baseUrls.system;
var SystemService = (function () {
    function SystemService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
        // this.getData();
    }
    SystemService.prototype.getData = function () {
        var _this = this;
        this._httpService.getData(systemUrl)
            .map(function (payload) { return ({ type: 'GET_SYSTEM', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    SystemService.prototype.setData = function (system) {
        var _this = this;
        this._httpService.postData(system, systemUrl)
            .subscribe(function (action) {
            // this._store.dispatch({ type: 'SET_SYSTEM', payload: system });
            _this.getData();
        });
    };
    SystemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], SystemService);
    return SystemService;
    var _a, _b;
}());
exports.SystemService = SystemService;


/***/ },

/***/ "./src/app/system/system.styles.scss":
/***/ function(module, exports) {

module.exports = ".parent {\n  display: flex;\n  height: auto;\n  flex-flow: row wrap;\n  justify-content: inherit; }\n\n.child {\n  width: auto;\n  height: auto;\n  border-right: 1px solid #f4f4f4;\n  padding-right: 20px;\n  padding-left: 20px;\n  align-self: center; }\n\n.hsu_component {\n  display: flex;\n  flex-direction: row;\n  margin-left: 20px;\n  margin-right: 20px; }\n\n.hsu_side_bar {\n  width: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px; }\n\n.hsu_side_bar.hbs {\n  background-color: #c6c7ca; }\n\n.hsu_header {\n  height: 60px;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  align-items: center;\n  background-color: white; }\n\n.hsu_title {\n  color: black;\n  padding-left: 10px; }\n\n.hsu_table_row {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap; }\n\n.hsu_title_text {\n  font-family: \"arial\";\n  padding-top: 5px;\n  color: #a4acb4;\n  font-size: 0.9em; }\n\n.pipe {\n  padding-left: 10px;\n  padding-right: 10px;\n  color: orange;\n  font-size: 0.9em;\n  font-style: bold;\n  display: block; }\n\n.hsu_table {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  border-bottom: 1px solid #d8d8d8; }\n\n.info_box {\n  height: 60px;\n  background-color: white;\n  width: 210px;\n  border-top: 1px solid #d8d8d8;\n  padding-left: 20px; }\n\n.info_box.with_border {\n  border-right: 1px solid #d8d8d8; }\n\n.info_box_caption {\n  color: #a4acb4;\n  font-size: 0.8em;\n  font-family: arial;\n  padding-top: 10px; }\n\n.info_box_text {\n  color: #4f535e;\n  font-family: arial;\n  font-size: 1em;\n  font-style: bold;\n  padding-top: 3px; }\n\n.category_caption {\n  font-size: 1.5em;\n  font-family: arial;\n  color: #ef4023;\n  padding-left: 20px;\n  padding-top: 10px;\n  padding-bottom: 10px; }\n"

/***/ },

/***/ "./src/app/tools/network/network-tools.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n\t<h3 class=\"box-title\">Network</h3>\r\n\r\n\t<div class=\"col-md-6\">\r\n\t\t<div class=\"box box-light-blue\">\r\n\t\t\t<div class=\"box-header\">\r\n\t\t\t\t<h3 class=\"box-title\">SPEED TEST</h3>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"box-body\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t\t<gauge title=\"Downlink\" [value]=\"speedTestData?.dlSpeed\"> </gauge>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t\t<gauge title=\"Uplink\" [value]=\"speedTestData?.ulSpeed\"> </gauge>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\" style=\"text-align: center\">\r\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-default\" [disabled]=\"speedTestInProgress\" (click)=\"startSpeedTest()\">START</button>\r\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!speedTestInProgress\" (click)=\"stopSpeedTest()\">STOP</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"col-md-6\">\r\n\t\t<div class=\"box box-green\">\r\n\t\t\t<div class=\"box-header\">\r\n\t\t\t\t<h3 class=\"box-title\">PING</h3>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"box-body\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<form [formGroup]=\"form\">\r\n\t\t\t\t\t\t<div class=\"col-md-3\">\r\n\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\tTarget IP\r\n\t\t\t\t\t\t\t\t<input formControlName=\"ip\" type=\"text\" class=\"form-control\" placeholder=\"IP\">\r\n\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.ip.dirty && !form.controls.ip.valid\">\r\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ip.errors.required\">IP is required</p>\r\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.ip.errors.invalidIp4\">IP is invalid</p>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-3\">\r\n\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\tPackets (1-30)\r\n\t\t\t\t\t\t\t\t<input formControlName=\"packetCount\" type=\"number\" class=\"form-control\" placeholder=\"Packets\" min=1 max=30>\r\n\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.packetCount.dirty && !form.controls.packetCount.valid\">\r\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.packetCount.errors.invalidMinMax\">Packet Count is invalid</p>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-3\">\r\n\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\tPacket Size (0-65535)\r\n\t\t\t\t\t\t\t\t<input formControlName=\"packetSize\" type=\"number\" class=\"form-control\" placeholder=\"Packet Size\" min=0 max=65535>\r\n\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"form.controls.packetSize.dirty && !form.controls.packetSize.valid\">\r\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"form.controls.packetSize.errors.invalidMinMax\">Packet Size is invalid</p>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-3\">\r\n\t\t\t\t\t\t\t<div class=\"box-buttons\">\r\n\t\t\t\t\t\t\t\t<button type=\"submit\" *ngIf=!pingInProgress class=\"btn btn-default\" (click)=\"ping()\" [disabled]=\"!form.valid\">PING</button>\r\n\t\t\t\t\t\t\t\t<div *ngIf=pingInProgress id=\"cssload-wrapper\">\r\n\t\t\t\t\t\t\t\t\t<div id=\"cssload-border\">\r\n\t\t\t\t\t\t\t\t\t\t<div id=\"cssload-whitespace\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div id=\"cssload-line\">\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\r\n\t\t<div class=\"box box-results\" *ngIf=\"ipNetworkTools?.result\">\r\n\t\t\t<div class=\"box-header\">\r\n\t\t\t\t<h3 class=\"box-title\">RESULTS</h3>\r\n\t\t\t\t<div class=\"box-tools pull-right\">\r\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-box-tool\" data-widget=\"remove\">CLOSE\r\n                </button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"box-body\">\r\n\t\t\t\t<pre class=\"rd-pre\"> {{ ipNetworkTools?.result }}</pre>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\r\n\t\t<div class=\"box\">\r\n\t\t\t<div class=\"box-header\">\r\n\t\t\t\t<h3 class=\"box-title\">TRACE</h3>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"box-body\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<form [formGroup]=\"traceform\">\r\n\t\t\t\t\t\t<div class=\"col-md-3\">\r\n\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\tTarget IP\r\n\t\t\t\t\t\t\t\t<input formControlName=\"ip\" type=\"text\" class=\"form-control\" placeholder=\"IP\">\r\n\t\t\t\t\t\t\t\t<div class=\"control-msgs\" *ngIf=\"traceform.controls.ip.dirty && !traceform.controls.ip.valid\">\r\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"traceform.controls.ip.errors.required\">IP is required</p>\r\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"traceform.controls.ip.errors.invalidIp4\">IP is invalid</p>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-3\">\r\n\t\t\t\t\t\t\t<div class=\"box-buttons\">\r\n\t\t\t\t\t\t\t\t<button type=\"submit\" *ngIf=!traceInProgress class=\"btn btn-default\" (click)=\"trace()\" [disabled]=\"!traceform.valid\">TRACE</button>\r\n\t\t\t\t\t\t\t\t<div *ngIf=traceInProgress id=\"cssload-wrapper\">\r\n\t\t\t\t\t\t\t\t\t<div id=\"cssload-border\">\r\n\t\t\t\t\t\t\t\t\t\t<div id=\"cssload-whitespace\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div id=\"cssload-line\">\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"box box-results\" *ngIf=\"traceNetworkTools?.result\">\r\n\t\t\t<div class=\"box-header\">\r\n\t\t\t\t<h3 class=\"box-title\">RESULTS</h3>\r\n\t\t\t\t<div class=\"box-tools pull-right\">\r\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-box-tool\" data-widget=\"remove\">CLOSE\r\n                </button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"box-body\">\r\n\t\t\t\t<pre class=\"rd-pre\"> {{ traceNetworkTools?.result }}</pre>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ },

/***/ "./src/app/tools/network/network-tools.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var network_tools_service_1 = __webpack_require__("./src/app/tools/network/network-tools.service.ts");
var speed_test_service_1 = __webpack_require__("./src/app/tools/network/speed-test.service.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var blocks_2 = __webpack_require__("./src/app/blocks/index.ts");
var emptyResult = '';
var NetworkToolsComponent = (function () {
    function NetworkToolsComponent(_networkToolsService, _speedTestService, _store, _formBuilder, _modalService) {
        this._networkToolsService = _networkToolsService;
        this._speedTestService = _speedTestService;
        this._store = _store;
        this._formBuilder = _formBuilder;
        this._modalService = _modalService;
        this.ipNetworkTools = {};
        this.traceNetworkTools = {};
        this.form = _formBuilder.group({
            ip: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.ip4Validator])],
            packetCount: ['5', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.minMaxNumberValidator(1, 30)])],
            packetSize: ['5', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.minMaxNumberValidator(0, 65535)])]
        });
        this.traceform = _formBuilder.group({
            ip: ['', forms_1.Validators.compose([forms_1.Validators.required, blocks_2.ip4Validator])]
        });
        this.pingInProgress = false;
        this.speedTestInProgress = false;
        this.traceInProgress = false;
    }
    NetworkToolsComponent.prototype.ping = function () {
        var _this = this;
        this.clearResults();
        this.pingInProgress = true;
        this._networkToolsService.ping(this.form.value)
            .subscribe(function (networkTools) {
            _this.pingInProgress = false;
            _this.ipNetworkTools = (networkTools);
        });
    };
    NetworkToolsComponent.prototype.trace = function () {
        var _this = this;
        this.clearResults();
        this.traceInProgress = true;
        this._networkToolsService.trace(this.traceform.value)
            .subscribe(function (networkTools) {
            _this.traceNetworkTools = (networkTools);
            _this.traceInProgress = false;
        });
    };
    NetworkToolsComponent.prototype.startSpeedTest = function () {
        this.speedTestInProgress = true;
        this._speedTestService.startSpeedTest();
    };
    NetworkToolsComponent.prototype.stopSpeedTest = function () {
        this.speedTestInProgress = false;
        this._speedTestService.stop();
    };
    NetworkToolsComponent.prototype.canDeactivate = function () {
        // Ask User
        if (!this.pingInProgress && !this.traceInProgress && !this.speedTestInProgress) {
            return true;
        }
        var warning;
        if (this.pingInProgress) {
            warning = shared_1.Resources.pingInProgressWarning;
        }
        if (this.traceInProgress) {
            warning = shared_1.Resources.traceInProgressWarning;
        }
        if (this.speedTestInProgress) {
            warning = shared_1.Resources.speedTestInProgressWarning;
        }
        var p = Promise.resolve(this._modalService.activate(warning, shared_1.Resources.warning));
        return Observable_1.Observable.fromPromise(p);
    };
    NetworkToolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        shared_1.exLog('hello Network Tools component');
        this.clearResults();
        this.speedTestSub = this._store.select('speedTest')
            .subscribe(function (speedTestData) {
            _this.speedTestData = speedTestData;
        });
    };
    NetworkToolsComponent.prototype.clearResults = function () {
        this.ipNetworkTools.result = emptyResult;
        this.traceNetworkTools.result = emptyResult;
    };
    NetworkToolsComponent.prototype.ngOnDestroy = function () {
        if (this.speedTestInProgress) {
            this._speedTestService.stop();
        }
        this.speedTestSub.unsubscribe();
    };
    NetworkToolsComponent = __decorate([
        core_1.Component({
            selector: 'tools-network',
            providers: [network_tools_service_1.NetworkToolsService, speed_test_service_1.SpeedTestService],
            template: __webpack_require__("./src/app/tools/network/network-tools.component.html"),
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof network_tools_service_1.NetworkToolsService !== 'undefined' && network_tools_service_1.NetworkToolsService) === 'function' && _a) || Object, (typeof (_b = typeof speed_test_service_1.SpeedTestService !== 'undefined' && speed_test_service_1.SpeedTestService) === 'function' && _b) || Object, (typeof (_c = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _c) || Object, (typeof (_d = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _d) || Object, (typeof (_e = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _e) || Object])
    ], NetworkToolsComponent);
    return NetworkToolsComponent;
    var _a, _b, _c, _d, _e;
}());
exports.NetworkToolsComponent = NetworkToolsComponent;


/***/ },

/***/ "./src/app/tools/network/network-tools.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var consts_1 = __webpack_require__("./src/app/shared/consts.ts");
var ping = consts_1.Consts.baseUrls.ping;
var trace = consts_1.Consts.baseUrls.trace;
var NetworkToolsService = (function () {
    function NetworkToolsService(httpService) {
        this.httpService = httpService;
    }
    NetworkToolsService.prototype.ping = function (networkTools) {
        return this.httpService.postData(networkTools, ping);
    };
    NetworkToolsService.prototype.trace = function (networkTools) {
        return this.httpService.postData(networkTools, trace);
    };
    NetworkToolsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object])
    ], NetworkToolsService);
    return NetworkToolsService;
    var _a;
}());
exports.NetworkToolsService = NetworkToolsService;


/***/ },

/***/ "./src/app/tools/network/speed-test.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var speedtestDataUrl = shared_1.Consts.baseUrls.speed + '/data';
var startSpeedtestUrl = shared_1.Consts.baseUrls.speed + '/start';
var stopSpeedtestUrl = shared_1.Consts.baseUrls.speed + '/stop';
var SpeedTestService = (function () {
    function SpeedTestService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
    }
    SpeedTestService.prototype.startSpeedTest = function () {
        var _this = this;
        // Every 28 seconds start speed test
        this._store.dispatch({ type: 'CLEAR_SPEEDTEST_DATA' });
        this.speedTestIntervalSub = Observable_1.Observable.timer(0, 28000)
            .flatMap(function () { return _this._httpService.post(startSpeedtestUrl); })
            .subscribe();
        this.speedTestIDataSub = Observable_1.Observable.interval(1000)
            .flatMap(function () { return _this._httpService.getData(speedtestDataUrl); })
            .map(function (payload) { return ({ type: 'GET_SPEEDTEST_DATA', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    SpeedTestService.prototype.stop = function () {
        this._httpService.post(stopSpeedtestUrl).subscribe();
        if (this.speedTestIntervalSub !== undefined)
            this.speedTestIntervalSub.unsubscribe();
        if (this.speedTestIDataSub !== undefined)
            this.speedTestIDataSub.unsubscribe();
        // this._store.dispatch({ type: 'CLEAR_SPEEDTEST_DATA' });
    };
    SpeedTestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], SpeedTestService);
    return SpeedTestService;
    var _a, _b;
}());
exports.SpeedTestService = SpeedTestService;


/***/ },

/***/ "./src/app/tools/operations/operations.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <h3 class=\"box-title\">Operations</h3>\r\n\r\n  <div class=\"col-md-8\">\r\n    <div class=\"box box-light-blue\">\r\n      <div class=\"box-header\">\r\n        <h3 class=\"box-title\">SPECTRUM ANALYZER</h3>\r\n      </div>\r\n      <div class=\"box-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-2\">\r\n            <form *ngIf=\"spectrumRange\" [formGroup]=\"spectrumForm\">\r\n              <fieldset>\r\n                <div class=\"form-group\">\r\n                  Range [MHz]:\r\n                  <input formControlName=\"minAirFrequency\" [(ngModel)]=\"spectrumRange.minAirFrequency\" class=\"form-control\" type=\"number\" step=5\r\n                    min={{spectrumRange.minChipFrequency}}>\r\n                  <input formControlName=\"maxAirFrequency\" [(ngModel)]=\"spectrumRange.maxAirFrequency\" class=\"form-control\" type=\"number\" step=5\r\n                    max={{spectrumRange.maxChipFrequency}}>\r\n                  <div class=\"control-msgs\" *ngIf=\"spectrumForm.controls.minAirFrequency.dirty || spectrumForm.controls.maxAirFrequency.dirty\">\r\n                    <p *ngIf=\"spectrumForm.errors?.invalidSpectrumRange\">Scanning range should be up to 500MHz</p>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  Duration [sec]:\r\n                  <input formControlName=\"duration\" [(ngModel)]=\"duration\" class=\"form-control\" type=\"number\" min=\"60\" max=\"86400\">\r\n                  <div class=\"control-msgs\" *ngIf=\"spectrumForm.controls.duration.dirty && !spectrumForm.controls.duration.valid\">\r\n                    <p *ngIf=\"spectrumForm.controls.duration.errors.invalidMinMax\">Duration should be 60-86400 sec</p>\r\n                  </div>\r\n                </div>\r\n              </fieldset>\r\n              <button type=\"submit\" [disabled]=\"!spectrumForm.valid || spectrumTestInProgress\" (click)=\"startSpectrum($event)\" class=\"btn btn-default\">START</button>\r\n              <button type=\"submit\" [disabled]=\"!spectrumTestInProgress\" (click)=\"stopSpectrum($event)\" class=\"btn btn-default\">STOP</button>\r\n            </form>\r\n          </div>\r\n          <div class=\"col-md-10\">\r\n            <div class=\"chart\">\r\n              <div>\r\n                Antenna A\r\n              </div>\r\n              <canvas baseChart class=\"spectrum-chart\" id=\"antennaA\" [datasets]=\"barChartDataA\" [labels]=\"barChartLabels\" [options]=\"barChartOptions\"\r\n                [colors]=\"barChartColors\" [chartType]=\"barChartType\">\r\n              </canvas>\r\n            </div>\r\n            <div class=\"chart\">\r\n              <div>\r\n                Antenna B\r\n              </div>\r\n              <canvas baseChart class=\"spectrum-chart\" id=\"antennaB\" [datasets]=\"barChartDataB\" [labels]=\"barChartLabels\" [options]=\"barChartOptions\"\r\n                [colors]=\"barChartColors\" [chartType]=\"barChartType\">\r\n              </canvas>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col-md-4\">\r\n    <div class=\"box box-green\">\r\n      <div class=\"box-header\">\r\n        <h3 class=\"box-title\">DIAGNOSTICS FILE</h3>\r\n      </div>\r\n      <div class=\"box-body\">\r\n        <button type=\"submit\" [disabled]=\"false\" (click)=\"getDiagnostics($event)\" class=\"btn btn-default\">DOWNLOAD</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"box box-red\">\r\n      <div class=\"box-header\">\r\n        <h3 class=\"box-title\">FUNCTIONS</h3>\r\n      </div>\r\n      <div class=\"box-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-4 col-md-4\">\r\n            <div class=\"description-block border-right\">\r\n              <button type=\"submit\" (click)=\"reset($event)\" class=\"btn btn-default\">RESET</button>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-4 col-md-4\">\r\n            <div class=\"description-block border-right\">\r\n              <button type=\"submit\" (click)=\"resync($event)\" class=\"btn btn-default\">RESYNC</button>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col-sm-4 col-md-4\">\r\n            <div class=\"description-block\">\r\n              <button type=\"submit\" [disabled]=\"!isActive\" (click)=\"acitvateDevice($event)\" class=\"btn btn-default\">DEVICE ACTIVATION</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"box\">\r\n      <div class=\"box-header\">\r\n        <h3 class=\"box-title\">LICENSE ACTIVATION</h3>\r\n      </div>\r\n      <div class=\"box-body\">\r\n        <form [formGroup]=\"licenseActivationForm\">\r\n          <div class=\"form-group\">\r\n            Enter License Key\r\n            <input formControlName=\"key\" [(ngModel)]=\"licenseKey\" class=\"form-control\">\r\n          </div>\r\n          <button type=\"submit\" [disabled]=\"!licenseActivationForm.valid || licenseActivationForm.pristine\" (click)=\"activateLicense(licenseKey)\"\r\n            class=\"btn btn-default\">ACTIVATE LICENSE</button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n        \r\n    <div class=\"box\">\r\n      <div class=\"box-header\">\r\n        <h3 class=\"box-title\">RESTORE TO FACTORY DEFAULTS</h3>\r\n      </div>\r\n      <div class=\"box-body\">\r\n        <button type=\"submit\" class=\"btn btn-default\" (click)=\"restoreToDefualtsPressed($event)\">RESTORE</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/tools/operations/operations.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var ng2_charts_1 = __webpack_require__("./node_modules/ng2-charts/ng2-charts.js");
var operations_service_1 = __webpack_require__("./src/app/tools/operations/operations.service.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var spectrum_chart_options_1 = __webpack_require__("./src/app/tools/operations/spectrum-chart.options.ts");
var restore_to_defaults_component_1 = __webpack_require__("./src/app/tools/operations/restoreToDefaults/restore-to-defaults-component.ts");
var spectrum_service_1 = __webpack_require__("./src/app/tools/operations/spectrum.service.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var file_saver_1 = __webpack_require__("./node_modules/file-saver/FileSaver.js");
var diagnosticsUrl = shared_1.Consts.baseUrls.diagnostics;
var OFFSET = 100;
var OperationsComponent = (function () {
    function OperationsComponent(_operationsService, _router, _modalService, _spectrumService, _formBuilder, _store) {
        this._operationsService = _operationsService;
        this._router = _router;
        this._modalService = _modalService;
        this._spectrumService = _spectrumService;
        this._formBuilder = _formBuilder;
        this._store = _store;
        this.barChartOptions = spectrum_chart_options_1.SpectrumChart.barChartOptions;
        this.barChartColors = spectrum_chart_options_1.SpectrumChart.barChartColors;
        this.barChartLegend = spectrum_chart_options_1.SpectrumChart.legend;
        this.barChartType = spectrum_chart_options_1.SpectrumChart.type;
        this.barChartLabels = [];
        this.duration = 120;
        this.barChartDataA = [
            { label: 'Current', data: [] },
            { label: 'Average', data: [] },
            { label: 'Max', data: [] }
        ];
        this.barChartDataB = [
            { label: 'Current', data: [] },
            { label: 'Average', data: [] },
            { label: 'Max', data: [] }
        ];
        this.spectrumForm = _formBuilder.group({
            minAirFrequency: [''],
            maxAirFrequency: [''],
            duration: ['', blocks_1.minMaxNumberValidator(60, 86400)]
        }, { validator: blocks_1.spectrumRangeValidator });
        this.licenseActivationForm = _formBuilder.group({
            key: ['', forms_1.Validators.required]
        });
    }
    OperationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        shared_1.exLog('hello Operations component');
        this.spectrumSub = this._store.select('spectrum')
            .subscribe(function (spectrum) {
            if (spectrum && spectrum.spectrumChannelFrequncy !== undefined) {
                _this.barChartLabels = spectrum.spectrumChannelFrequncy;
                _this.barChartDataA[0].data = spectrum.currentAntennaA.map(function (val) { return val + OFFSET; });
                _this.barChartDataB[0].data = spectrum.currentAntennaB.map(function (val) { return val + OFFSET; });
                _this.barChartDataA[1].data = spectrum.averageAntennaA.map(function (val) { return val + OFFSET; });
                _this.barChartDataB[1].data = spectrum.averageAntennaB.map(function (val) { return val + OFFSET; });
                _this.barChartDataA[2].data = spectrum.maxAntennaA.map(function (val) { return val + OFFSET; });
                _this.barChartDataB[2].data = spectrum.maxAntennaB.map(function (val) { return val + OFFSET; });
            }
        });
        this.spectrumRangeSub = this._store.select('spectrumRange')
            .subscribe(function (range) {
            _this.spectrumRange = range;
        });
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.isActive = monitor.hsuAirState === 'Active';
        });
        this._spectrumService.getRange();
        this._spectrumService.getLastSpectrumTable();
    };
    OperationsComponent.prototype.ngOnDestroy = function () {
        this.spectrumSub.unsubscribe();
        this.spectrumRangeSub.unsubscribe();
        this.monitorSub.unsubscribe();
    };
    OperationsComponent.prototype.startSpectrum = function () {
        var _this = this;
        var durationStr = String(this.duration);
        var warningMessage = shared_1.Resources.spectrumWarning.replace('{0}', durationStr);
        this._modalService.activate(warningMessage, shared_1.Resources.warning, undefined, undefined, shared_1.Consts.ModalType.warning)
            .then(function (responseOk) {
            if (responseOk) {
                var spectrumDurationTimer = window.setTimeout(function () { return _this.stopSpectrum(); }, _this.duration * 1000);
                _this.spectrumTestInProgress = true;
                _this._spectrumService.startSpectrum(_this.spectrumForm.value);
            }
        });
    };
    OperationsComponent.prototype.stopSpectrum = function () {
        shared_1.exLog('Stopping spectrum');
        this.spectrumTestInProgress = false;
        this._spectrumService.stopSpectrum();
    };
    OperationsComponent.prototype.getDiagnostics = function (e) {
        this._operationsService.getDiagnostics()
            .subscribe(function (response) {
            var data = JSON.stringify(response, null, 4);
            var diagnosticFileName = 'diagnostics_' + new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
            diagnosticFileName = diagnosticFileName + '.json';
            var blob = new Blob([data], { type: 'application/json' });
            file_saver_1.saveAs(blob, diagnosticFileName);
        });
    };
    OperationsComponent.prototype.reset = function (e) {
        var _this = this;
        this._modalService.activate(shared_1.Resources.resetWarning, shared_1.Resources.warning)
            .then(function (responseOk) {
            if (responseOk) {
                _this._operationsService.reset()
                    .subscribe(function (response) {
                    if (response.code === '200') {
                        _this._router.navigate(['login']);
                    }
                });
            }
        });
    };
    OperationsComponent.prototype.restoreToDefualtsPressed = function () {
        var _this = this;
        this._modalService.activateWithInnerTemplate(restore_to_defaults_component_1.RestoreToDeaultsComponent)
            .then(function (userAction) {
            if (userAction.responce) {
                _this._operationsService.restoreToDefaults(userAction.internalData.data)
                    .subscribe(function (response) {
                    if (response.code === '200') {
                        _this._router.navigate(['login']);
                    }
                });
            }
        });
    };
    OperationsComponent.prototype.resync = function (e) {
        var _this = this;
        this._modalService.activate(shared_1.Resources.resyncWarning, shared_1.Resources.warning)
            .then(function (responseOk) {
            if (responseOk) {
                _this._operationsService.resync()
                    .subscribe(function (response) {
                    if (response.code === '200') {
                        _this._router.navigate(['login']);
                    }
                });
            }
        });
    };
    OperationsComponent.prototype.activateLicense = function (key) {
        var _this = this;
        this._operationsService.setActivateLicense(this.licenseActivationForm.value.key)
            .subscribe(function (response) {
            _this._operationsService.getActivateLicense()
                .subscribe(function (res) {
                _this._modalService.activate(res.data.status, shared_1.Resources.warning);
            });
        });
    };
    OperationsComponent.prototype.acitvateDevice = function (e) {
        var _this = this;
        this._modalService.activate(shared_1.Resources.activateDeviceWarning, shared_1.Resources.warning)
            .then(function (responseOk) {
            if (responseOk) {
                _this._operationsService.activateDevice()
                    .subscribe(function (response) {
                    if (response.code === '200') {
                    }
                });
            }
        });
    };
    OperationsComponent.prototype.canDeactivate = function () {
        return true;
    };
    __decorate([
        core_1.ViewChild(ng2_charts_1.BaseChartDirective), 
        __metadata('design:type', Object)
    ], OperationsComponent.prototype, "_chart", void 0);
    OperationsComponent = __decorate([
        core_1.Component({
            selector: 'unit',
            providers: [operations_service_1.OperationsService, spectrum_service_1.SpectrumService],
            template: __webpack_require__("./src/app/tools/operations/operations.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof operations_service_1.OperationsService !== 'undefined' && operations_service_1.OperationsService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _c) || Object, (typeof (_d = typeof spectrum_service_1.SpectrumService !== 'undefined' && spectrum_service_1.SpectrumService) === 'function' && _d) || Object, (typeof (_e = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _e) || Object, (typeof (_f = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _f) || Object])
    ], OperationsComponent);
    return OperationsComponent;
    var _a, _b, _c, _d, _e, _f;
}());
exports.OperationsComponent = OperationsComponent;


/***/ },

/***/ "./src/app/tools/operations/operations.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var resetUrl = shared_1.Consts.baseUrls.reset;
var resyncUrl = shared_1.Consts.baseUrls.resync;
var restoreToDefaultsUrl = shared_1.Consts.baseUrls.restoreToDefaults;
var activateLicenseUrl = shared_1.Consts.baseUrls.activateLicense;
var skipAlignmentUrl = shared_1.Consts.baseUrls.skipAlignment;
var diagnosticsUrl = shared_1.Consts.baseUrls.diagnostics;
var OperationsService = (function () {
    function OperationsService(_httpService) {
        this._httpService = _httpService;
    }
    OperationsService.prototype.getDiagnostics = function () {
        return this._httpService.get(diagnosticsUrl);
    };
    OperationsService.prototype.reset = function () {
        return this._httpService.post(resetUrl);
    };
    OperationsService.prototype.restoreToDefaults = function (data) {
        return this._httpService.postData(data, restoreToDefaultsUrl);
    };
    OperationsService.prototype.resync = function () {
        return this._httpService.post(resyncUrl);
    };
    OperationsService.prototype.getActivateLicense = function () {
        return this._httpService.get(activateLicenseUrl);
    };
    OperationsService.prototype.activateDevice = function () {
        return this._httpService.post(skipAlignmentUrl);
    };
    OperationsService.prototype.setActivateLicense = function (key) {
        var urlWithParamss = activateLicenseUrl + "?key=" + key;
        return this._httpService.post(urlWithParamss);
    };
    OperationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object])
    ], OperationsService);
    return OperationsService;
    var _a;
}());
exports.OperationsService = OperationsService;


/***/ },

/***/ "./src/app/tools/operations/restoreToDefaults/restore-to-defaults-component.html":
/***/ function(module, exports) {

module.exports = "<div>\r\n    <input type=\"checkbox\" #resetPwdChBox [checked]=false (change)=\"onResetIpChanged(resetPwdChBox.checked)\" />\r\n    <p>{{resetIpWarningMessage}}</p>\r\n</div>"

/***/ },

/***/ "./src/app/tools/operations/restoreToDefaults/restore-to-defaults-component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var restore_to_defaults_data_1 = __webpack_require__("./src/app/tools/operations/restoreToDefaults/restore-to-defaults-data.ts");
var RestoreToDeaultsComponent = (function () {
    function RestoreToDeaultsComponent() {
        this.data = new restore_to_defaults_data_1.RestoreToDefaultsData();
        this.data.isDefaultIpRequired = false;
        this.resetIpWarningMessage = 'Default IP Address (10.0.0.120).';
    }
    RestoreToDeaultsComponent.prototype.onResetIpChanged = function (resetIpRequired) {
        this.data.isDefaultIpRequired = resetIpRequired;
    };
    RestoreToDeaultsComponent = __decorate([
        core_1.Component({
            selector: 'restore-to-deaults',
            template: __webpack_require__("./src/app/tools/operations/restoreToDefaults/restore-to-defaults-component.html")
        }), 
        __metadata('design:paramtypes', [])
    ], RestoreToDeaultsComponent);
    return RestoreToDeaultsComponent;
}());
exports.RestoreToDeaultsComponent = RestoreToDeaultsComponent;


/***/ },

/***/ "./src/app/tools/operations/restoreToDefaults/restore-to-defaults-data.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var RestoreToDefaultsData = (function () {
    function RestoreToDefaultsData() {
    }
    return RestoreToDefaultsData;
}());
exports.RestoreToDefaultsData = RestoreToDefaultsData;


/***/ },

/***/ "./src/app/tools/operations/spectrum-chart.options.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var SpectrumChart;
(function (SpectrumChart) {
    'use strict';
    SpectrumChart.legend = true;
    SpectrumChart.type = 'bar';
    SpectrumChart.barChartOptions = {
        scaleShowVerticalLines: false,
        // display: false,
        responsive: true,
        // legend: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return tooltipItem.yLabel - 100;
                }
            }
        },
        scales: {
            xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Frequency (MHz)'
                    },
                    gridLines: {
                        display: false
                    }
                }],
            yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Power (dBm)'
                    },
                    ticks: {
                        reverse: false,
                        min: 0,
                        max: 60,
                        stepSize: 10,
                        callback: function (label, index, lables) {
                            return label - 100;
                        }
                    },
                    gridLines: {}
                }]
        }
    };
    SpectrumChart.currentColor = 'rgba(141, 181, 211, 1)';
    SpectrumChart.averageColor = 'rgba(244, 127, 107, 1)';
    SpectrumChart.maxColor = 'rgba(114, 205, 154, 1)';
    SpectrumChart.barChartColors = [
        {
            backgroundColor: SpectrumChart.currentColor,
            borderColor: SpectrumChart.currentColor,
            pointBackgroundColor: SpectrumChart.currentColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: SpectrumChart.currentColor
        },
        {
            backgroundColor: SpectrumChart.averageColor,
            borderColor: SpectrumChart.averageColor,
            pointBackgroundColor: SpectrumChart.averageColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: SpectrumChart.averageColor
        },
        {
            backgroundColor: SpectrumChart.maxColor,
            borderColor: SpectrumChart.maxColor,
            pointBackgroundColor: SpectrumChart.maxColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: SpectrumChart.maxColor
        }
    ];
})(SpectrumChart = exports.SpectrumChart || (exports.SpectrumChart = {}));


/***/ },

/***/ "./src/app/tools/operations/spectrum.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var startSpectrumUrl = shared_1.Consts.baseUrls.spectrumStart;
var stopSpectrumUrl = shared_1.Consts.baseUrls.spectrumStop;
var spectrumRangeUrl = shared_1.Consts.baseUrls.spectrumRange;
var spectrumTableUrl = shared_1.Consts.baseUrls.spectrumTable;
var SpectrumService = (function () {
    function SpectrumService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
    }
    SpectrumService.prototype.startSpectrum = function (range) {
        var _this = this;
        var urlWithParamss = startSpectrumUrl + "?min=" + range.minAirFrequency + "&max=" + range.maxAirFrequency + "&duration=" + range.duration;
        this._httpService.post(urlWithParamss)
            .subscribe(function (response) {
            _this.getSpectrumTable();
        });
    };
    SpectrumService.prototype.getSpectrumTable = function () {
        var _this = this;
        this.spectrumSubscription = Observable_1.Observable.timer(0, 7000)
            .flatMap(function () { return _this._httpService.getData(spectrumTableUrl); })
            .map(function (payload) { return ({ type: 'GET_SPECTRUM_TABLE', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    SpectrumService.prototype.getLastSpectrumTable = function () {
        var _this = this;
        this._httpService.getData(spectrumTableUrl)
            .map(function (payload) { return ({ type: 'GET_SPECTRUM_TABLE', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    SpectrumService.prototype.stopSpectrum = function () {
        this.spectrumSubscription.unsubscribe();
        this._httpService.post(stopSpectrumUrl).subscribe();
    };
    SpectrumService.prototype.getRange = function () {
        var _this = this;
        this._httpService.getData(spectrumRangeUrl)
            .map(function (payload) { return ({ type: 'GET_SPECTRUM_RANGE', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    SpectrumService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], SpectrumService);
    return SpectrumService;
    var _a, _b;
}());
exports.SpectrumService = SpectrumService;


/***/ },

/***/ "./src/app/tools/unit/swu.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"col-md-5\">\r\n\t<div class=\"box box-green\">\r\n\t\t<div class=\"box-header\">\r\n\t\t\t<h3 class=\"box-title\">{{ title }}</h3>\r\n\t\t</div>\r\n\t\t<div class=\"box-body\">\r\n\t\t\t<span>\r\n        <span class=\"btn btn-file\">\r\n          BROWSE <input type=\"file\" ng2FileSelect *ngIf=\"uploader.queue.length==0\" [uploader]=\"uploader\" [disabled]=\"swuBrowseButtonState()\" accept=\"{{fileType}}\"/>\r\n        </span>\r\n\t\t\t<button type=\"submit\" (click)=\"validateSwu()\" class=\"btn btn-default\">VALIDATE</button>\r\n\t\t\t<button type=\"submit\" (click)=\"startSwu()\" class=\"btn btn-default\" [disabled]=\"swuStartButtonState()\">START</button>\r\n\t\t\t<!--<button type=\"submit\" (click)=\"stopMonitor()\" class=\"btn btn-default\">Stop Monitor</button>-->\r\n\t\t\t</span>\r\n\t\t\t<div>\r\n\t\t\t\t<div *ngIf=\"isValidating\"> \r\n\t\t\t\t\t<br> \r\n\t\t\t\t\t<i class=\"icon-spin6 animate-spin\"></i>Validating...\r\n\t\t\t\t</div>\r\n\t\t\t\t<br>Type: {{ swuData?.type }} <br> Release: {{ swuData?.release }} <br> Description: {{ swuData?.description }} <br>\r\n\t\t\t\t<div *ngIf=\"type == 'restore'\"> Date: {{ swuData?.date}} </div>\r\n\t\t\t</div>\r\n\t\t\t<div *ngIf=\"swuData?.error\">\r\n\t\t\t\t<br> Error: {{ swuData.error.message }}\r\n\t\t\t</div>\r\n\r\n\t\t\t<table class=\"table\">\r\n\t\t\t\t<thead>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th width=\"50%\">Name</th>\r\n\t\t\t\t\t\t<th>Size</th>\r\n\t\t\t\t\t\t<th>Progress</th>\r\n\t\t\t\t\t\t<th>Status</th>\r\n\t\t\t\t\t\t<th>Actions</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr *ngFor=\"let item of uploader.queue\">\r\n\t\t\t\t\t\t<td><strong>{{ item?.file?.name }}</strong></td>\r\n\t\t\t\t\t\t<td nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div class=\"progress\" style=\"margin-bottom: 0;\">\r\n\t\t\t\t\t\t\t\t<div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t<td class=\"text-center\">\r\n\t\t\t\t\t\t\t<span *ngIf=\"item.isSuccess\"><i class=\"icon-ok\"></i></span>\r\n\t\t\t\t\t\t\t<span *ngIf=\"item.isCancel\"><i class=\"icon-block\"></i></span>\r\n\t\t\t\t\t\t\t<span *ngIf=\"item.isError\"><i class=\"icon-cancel\"></i></span>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t<td nowrap>\r\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success btn-xs\" (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\r\n                  Upload\r\n              </button>\r\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-warning btn-xs\" (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\">\r\n                  Cancel\r\n              </button>\r\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger btn-xs\" (click)=\"item.remove()\">\r\n                  Remove\r\n              </button>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ },

/***/ "./src/app/tools/unit/swu.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ng2_file_upload_1 = __webpack_require__("./node_modules/ng2-file-upload/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var swu_service_1 = __webpack_require__("./src/app/tools/unit/swu.service.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var swuUploadUrl = shared_1.Consts.baseUrls.swuUpload;
var SwuComponent = (function () {
    function SwuComponent(_swuService, _store, _modalService) {
        this._swuService = _swuService;
        this._store = _store;
        this._modalService = _modalService;
        this.isInProcess = false;
        this.isValidating = false;
    }
    SwuComponent.prototype.ngOnInit = function () {
        shared_1.exLog('hello Swu component, type:' + this.type);
        if (this.type === 'swu') {
            this.title = 'Software Upgrade';
            this.fileType = '.swul';
        }
        else {
            this.title = 'Restore';
            this.fileType = '.backupl';
        }
        this.uploader = new RadFileUploader({
            url: swuUploadUrl + '?mode=' + this.type,
            isHTML5: true,
            authToken: shared_1.Consts.jwtPrefix + localStorage.getItem(shared_1.Consts.jwtToken)
        });
        this.subscription = this.uploader.completeItemEvent.subscribe(this.validateSwu);
        //this.validateSwu();
    };
    SwuComponent.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    SwuComponent.prototype.validateSwu = function () {
        var _this = this;
        this.swuData = {};
        this.isValidating = true;
        this._swuService.getSwuState(this.type)
            .subscribe(function (swudata) {
            _this.isValidating = false;
            _this.swuData = (swudata);
        });
    };
    SwuComponent.prototype.canDeactivate = function () {
        return true;
    };
    SwuComponent.prototype.startSwu = function () {
        var _this = this;
        this.isInProcess = true;
        // in restore ask user
        if (this.type === 'restore') {
            var warningMessage = shared_1.Resources.restoreWarning.replace('{0}', this.swuData.release);
            this._modalService.activate(warningMessage, shared_1.Resources.warning, undefined, undefined, shared_1.Consts.ModalType.warning)
                .then(function (responseOk) {
                if (responseOk) {
                    _this.startProcess();
                }
            });
        }
        else {
            // swu
            this.startProcess();
        }
    };
    SwuComponent.prototype.startProcess = function () {
        var _this = this;
        this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });
        this._swuService.startSwu(this.type)
            .subscribe(function (swudata) {
            _this.isInProcess = false;
            _this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });
            if (swudata.error) {
                _this.swuData = swudata;
            }
            else {
                var message = _this.title + ' completed, reseting';
                var p = Promise.resolve(_this._modalService.activate(message, 'Info'));
                return Observable_1.Observable.fromPromise(p);
            }
        });
    };
    SwuComponent.prototype.uploadStart = function () {
        shared_1.exLog('uploading started');
    };
    SwuComponent.prototype.swuBrowseButtonState = function () {
        return this.isInProcess;
    };
    SwuComponent.prototype.swuStartButtonState = function () {
        return !this.swuData;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SwuComponent.prototype, "type", void 0);
    SwuComponent = __decorate([
        core_1.Component({
            selector: 'swu-component',
            providers: [swu_service_1.SwuService],
            template: __webpack_require__("./src/app/tools/unit/swu.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof swu_service_1.SwuService !== 'undefined' && swu_service_1.SwuService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object, (typeof (_c = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _c) || Object])
    ], SwuComponent);
    return SwuComponent;
    var _a, _b, _c;
}());
exports.SwuComponent = SwuComponent;
var RadFileUploader = (function (_super) {
    __extends(RadFileUploader, _super);
    function RadFileUploader(options) {
        _super.call(this, options);
        this.completeItemEvent = new core_1.EventEmitter();
    }
    RadFileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
        this.completeItemEvent.emit();
        _super.prototype.onCompleteItem.call(this, item, response, status, headers);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RadFileUploader.prototype, "completeItemEvent", void 0);
    return RadFileUploader;
}(ng2_file_upload_1.FileUploader));
exports.RadFileUploader = RadFileUploader;


/***/ },

/***/ "./src/app/tools/unit/swu.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var swuValidateUrl = shared_1.Consts.baseUrls.swuValidate;
var swuStartUrl = shared_1.Consts.baseUrls.swuStart;
var swuStartBackupUrl = shared_1.Consts.baseUrls.swuBackup;
var SwuService = (function () {
    function SwuService(_httpService) {
        this._httpService = _httpService;
    }
    SwuService.prototype.getSwuState = function (mode) {
        shared_1.exLog('SWU getdata');
        return this._httpService.getData(swuValidateUrl + '?mode=' + mode);
    };
    SwuService.prototype.startSwu = function (mode) {
        shared_1.exLog('SWU start');
        return this._httpService.post(swuStartUrl + '?mode=' + mode);
    };
    SwuService.prototype.startBackup = function () {
        shared_1.exLog('SWU BACKUP start');
        return this._httpService.getBlob(swuStartBackupUrl);
    };
    SwuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object])
    ], SwuService);
    return SwuService;
    var _a;
}());
exports.SwuService = SwuService;


/***/ },

/***/ "./src/app/tools/unit/unit-tools.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <h3 class=\"box-title\">Unit</h3>\r\n\r\n\r\n  <swu-component type=\"swu\"> </swu-component>\r\n\r\n  <swu-component type=\"restore\"> </swu-component>\r\n  \r\n\r\n  <div class=\"col-md-2\">\r\n    <div class=\"box\">\r\n      <div class=\"box-header\">\r\n        <h3 class=\"box-title\">Backup</h3>\r\n      </div>\r\n      <div class=\"box-body\">\r\n        <span>\r\n        <button type=\"submit\" (click)=\"backupDevice()\" class=\"btn btn-default\">BACKUP</button>\r\n      </span>\r\n      </div>\r\n    </div>\r\n  </div>"

/***/ },

/***/ "./src/app/tools/unit/unit-tools.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var file_saver_1 = __webpack_require__("./node_modules/file-saver/FileSaver.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var swu_service_1 = __webpack_require__("./src/app/tools/unit/swu.service.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var swuUploadUrl = shared_1.Consts.baseUrls.swuUpload;
var UnitToolsComponent = (function () {
    function UnitToolsComponent(_swuService, _spinnerService, _store, _modalService) {
        this._swuService = _swuService;
        this._spinnerService = _spinnerService;
        this._store = _store;
        this._modalService = _modalService;
    }
    UnitToolsComponent.prototype.ngOnInit = function () {
        shared_1.exLog('hello Unit Tools component');
    };
    UnitToolsComponent.prototype.canDeactivate = function () {
        return true;
        // return Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    };
    UnitToolsComponent.prototype.backupDevice = function () {
        var _this = this;
        this.isBackupInProcess = true;
        this._spinnerService.show('Backup in process...');
        // Method will stop monitor
        this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });
        this._swuService.startBackup()
            .subscribe(function (response) {
            // In case of server error, returned body will be json and binary
            _this._spinnerService.hide();
            _this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });
            if (response && response['_body'].type === 'application/json') {
                _this._modalService.activate(shared_1.Resources.backupFailed, shared_1.Resources.error, undefined, '', shared_1.Consts.ModalType.error);
            }
            else {
                var backupFileName = shared_1.Consts.ip + '_' + new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
                backupFileName = backupFileName + '.backupl';
                var blob = new Blob([response['_body']], { type: 'application/octet-stream' });
                file_saver_1.saveAs(blob, backupFileName);
            }
        });
    };
    UnitToolsComponent = __decorate([
        core_1.Component({
            selector: 'unit',
            providers: [swu_service_1.SwuService],
            template: __webpack_require__("./src/app/tools/unit/unit-tools.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof swu_service_1.SwuService !== 'undefined' && swu_service_1.SwuService) === 'function' && _a) || Object, (typeof (_b = typeof blocks_1.SpinnerService !== 'undefined' && blocks_1.SpinnerService) === 'function' && _b) || Object, (typeof (_c = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _c) || Object, (typeof (_d = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _d) || Object])
    ], UnitToolsComponent);
    return UnitToolsComponent;
    var _a, _b, _c, _d;
}());
exports.UnitToolsComponent = UnitToolsComponent;


/***/ },

/***/ "./src/app/wifi/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/wifi/wifi-configuration.component.ts"));
__export(__webpack_require__("./src/app/wifi/wifi.service.ts"));
__export(__webpack_require__("./src/app/wifi/wifi.model.ts"));


/***/ },

/***/ "./src/app/wifi/wifi-configuration.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n    <h3 class=\"box-title\">WiFi</h3>\n    <div class=\"col-md-6\">\n        <div class=\"box box-light-blue\">\n            <form *ngIf=\"wifi\" [formGroup]=\"form\">\n                <div class=\"box-body\">\n                    <fieldset>\n                        <div class=\"form-group\">\n                            SSID {{ wifi.wifiSSID}}\n                        </div>\n                        <div class=\"form-group\">\n                            Status {{ monitor.configMonitor?.wifiApStatus }}\n                        </div>\n\n                        <div class=\"form-group\">\n                            Security {{ wifi.wifiSecurityType }}\n                        </div>\n                        <div class=\"form-group\">\n                            Access Point Mode:\n                            <select formControlName=\"wifiMode\" [(ngModel)]=\"wifi.wifiMode\" class=\"form-control\">\n                                <option *ngFor=\"let mode of wifi?.wifiModes\" [value]=\"mode\">{{ mode }}</option>\n                            </select>\n                        </div>\n                        <div class=\"form-group\">\n                            Channel\n                            <input formControlName=\"wifiChannel\" [(ngModel)]=\"wifi.wifiChannel\" class=\"form-control\" type=\"number\" step=\"1\" min=\"1\" max=\"11\">\n                            <div class=\"control-msgs\" *ngIf=\"form.controls.wifiChannel.dirty && !form.controls.wifiChannel.valid\">\n                                <p *ngIf=\"form.controls.wifiChannel.errors.required\">Channel is required.</p>\n                                <p *ngIf=\"form.controls.wifiChannel.errors.invalidMinMax\">Channel should be between 1-11</p>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            Tx Power\n                            <div class=\"input-group\">\n                                <input formControlName=\"wifiTxPower\" [(ngModel)]=\"wifi.wifiTxPower\" class=\"form-control\" type=\"number\" step=\"1\" min=\"1\" max=\"{{wifi.wifiMaxTxPower}}\">\n                                <span class=\"input-group-addon\">dBm</span>\n                            </div>\n\n                            <div class=\"control-msgs\" *ngIf=\"form.controls.wifiTxPower.dirty && !form.controls.wifiTxPower.valid\">\n                                <p *ngIf=\"form.controls.wifiTxPower.errors.required\">Tx Power Gain is required.</p>\n                                <p *ngIf=\"form.controls.wifiTxPower.errors.invalidMinMax\">Tx Power should be between 1-{{wifi.wifiMaxTxPower}}</p>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            Password\n                            <input formControlName=\"wifiPassword\" class=\"form-control\" type=\"password\" maxlength=\"30\">\n                            <div class=\"control-msgs\" *ngIf=\"form.controls.wifiPassword.dirty && !form.controls.wifiPassword.valid\">\n                                <p *ngIf=\"form.controls.wifiPassword.errors.minlength\">Password must be at least 8 characters.</p>\n                                <p *ngIf=\"form.controls.wifiPassword.errors.maxlength\">Password should not exceed 30 characters.</p>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            IP Address\n                            <input formControlName=\"wifiNetwork\" [(ngModel)]=\"wifi.wifiNetwork\" class=\"form-control\">\n                            <div class=\"control-msgs\" *ngIf=\"form.controls.wifiNetwork.dirty && !form.controls.wifiNetwork.valid\">\n                                <p *ngIf=\"form.controls.wifiNetwork.errors.invalidIp4\">IP Address is invalid.</p>\n                                <p *ngIf=\"form.controls.wifiNetwork.errors.invalidWifiIp\">IP Address is must be 192.168.X.X</p>\n                            </div>\n                        </div>\n\n                    </fieldset>\n                </div>\n            </form>\n        </div>\n    </div>\n\n\n    <div class=\"col-md-6\">\n        <div class=\"box box-green\">\n            <div class=\"box-header\">\n                <h3 class=\"box-title\"> Connected Clients</h3>\n            </div>\n            <div class=\"box-body\">\n                <div class=\"wifi-table-wrapper\">\n                    <table class=\"table table-striped\">\n                        <thead>\n                            <tr>\n                                <th class=\"wifi-th\">#</th>\n                                <th class=\"wifi-th\">MAC Address</th>\n                                <th class=\"wifi-th\">RSSI [dBm]</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let row of monitor.configMonitor?.wifiRssiTable; let i = index;\">\n                                <td>{{ i + 1 }}</td>\n                                <td>{{ row.mac }}</td>\n                                <td>{{ row.rssi }}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"buttons-footer\">\n    <button form=\"form\" type=\"submit\" (click)=\"save($event)\" [disabled]=\"!form.valid || form.pristine\" class=\"btn btn-primary\">APPLY ALL</button>\n    <button form=\"form\" type=\"cancel\" (click)=\"cancel($event)\" class=\"btn btn-default\">CANCEL</button>\n</div>"

/***/ },

/***/ "./src/app/wifi/wifi-configuration.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var wifi_service_1 = __webpack_require__("./src/app/wifi/wifi.service.ts");
var global_methods_1 = __webpack_require__("./src/app/shared/global-methods.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
__webpack_require__("./node_modules/rxjs/add/observable/fromPromise.js");
var WifiConfigurationComponent = (function () {
    function WifiConfigurationComponent(_wifiService, _store, _modalService, _formBuilder) {
        this._wifiService = _wifiService;
        this._store = _store;
        this._modalService = _modalService;
        this._formBuilder = _formBuilder;
        this.form = _formBuilder.group({
            wifiMode: [''],
            wifiChannel: ['', blocks_1.minMaxNumberValidator(1, 11)],
            wifiTxPower: ['', blocks_1.minMaxNumberValidator(1, 17)],
            wifiPassword: ['********', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.maxLength(30)])],
            wifiNetwork: ['', forms_1.Validators.compose([blocks_1.ip4Validator, blocks_1.wifiIpValidator])]
        });
    }
    WifiConfigurationComponent.prototype.save = function () {
        var dirtyForm = {};
        for (var control in this.form.controls) {
            if (this.form.controls[control].dirty) {
                dirtyForm[control] = this.form.controls[control].value;
            }
        }
        this._wifiService.setData(dirtyForm);
        this.form.reset();
    };
    WifiConfigurationComponent.prototype.cancel = function () {
        this.getWifi();
        this.form.reset();
    };
    WifiConfigurationComponent.prototype.canDeactivate = function () {
        if (!this.form || !this.form.dirty) {
            return true;
        }
        // Ask User
        return Observable_1.Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    };
    WifiConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        global_methods_1.exLog('hello Wifi Configuration Component');
        this.wifiSub = this._store.select('wifi')
            .subscribe(function (wifi) {
            _this.wifi = wifi;
        });
        this.monitorSub = this._store.select('monitor')
            .subscribe(function (monitor) {
            _this.monitor = monitor;
        });
        this.getWifi();
    };
    WifiConfigurationComponent.prototype.ngOnDestroy = function () {
        this.wifiSub.unsubscribe();
        this.monitorSub.unsubscribe();
    };
    WifiConfigurationComponent.prototype.getWifi = function () {
        this._wifiService.getData();
    };
    WifiConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'wifi-configuration',
            providers: [wifi_service_1.WifiService],
            styles: [__webpack_require__("./src/app/wifi/wifi.styles.scss")],
            template: __webpack_require__("./src/app/wifi/wifi-configuration.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof wifi_service_1.WifiService !== 'undefined' && wifi_service_1.WifiService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object, (typeof (_c = typeof blocks_1.WModalService !== 'undefined' && blocks_1.WModalService) === 'function' && _c) || Object, (typeof (_d = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _d) || Object])
    ], WifiConfigurationComponent);
    return WifiConfigurationComponent;
    var _a, _b, _c, _d;
}());
exports.WifiConfigurationComponent = WifiConfigurationComponent;


/***/ },

/***/ "./src/app/wifi/wifi.model.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./src/app/wifi/wifi.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var store_1 = __webpack_require__("./node_modules/@ngrx/store/index.ts");
var blocks_1 = __webpack_require__("./src/app/blocks/index.ts");
var shared_1 = __webpack_require__("./src/app/shared/index.ts");
var wifiUrl = shared_1.Consts.baseUrls.wifi;
var WifiService = (function () {
    function WifiService(_httpService, _store) {
        this._httpService = _httpService;
        this._store = _store;
        // this.getData();
    }
    WifiService.prototype.getData = function () {
        var _this = this;
        this._httpService.getData(wifiUrl)
            .map(function (payload) { return ({ type: 'GET_WIFI', payload: payload }); })
            .subscribe(function (action) {
            _this._store.dispatch(action);
        });
    };
    WifiService.prototype.setData = function (wifi) {
        var _this = this;
        this._httpService.postData(wifi, wifiUrl)
            .subscribe(function (action) {
            // this._store.dispatch({ type: 'SET_SYSTEM', payload: system });
            _this.getData();
        });
    };
    WifiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof blocks_1.ExHttpService !== 'undefined' && blocks_1.ExHttpService) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], WifiService);
    return WifiService;
    var _a, _b;
}());
exports.WifiService = WifiService;


/***/ },

/***/ "./src/app/wifi/wifi.styles.scss":
/***/ function(module, exports) {

module.exports = ".wifi-title {\n  display: inline-flex; }\n\n.wifi-table-wrapper {\n  overflow: auto;\n  height: 270px;\n  font-size: 16px; }\n\n.wifi-th {\n  color: #a0a8b6;\n  font-family: Roboto;\n  font-size: 14px;\n  font-weight: 400; }\n\n.table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {\n  background-color: #f1faf5; }\n"

/***/ },

/***/ "./src/assets/scss/style.scss":
/***/ function(module, exports) {


/***/ },

/***/ "./src/main.browser.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular bootstraping
 */
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/index.js");
var environment_1 = __webpack_require__("./src/app/environment.ts");
var hmr_1 = __webpack_require__("./node_modules/@angularclass/hmr/dist/index.js");
/*
 * App Module
 * our top level module that holds all of our components
 */
var app_1 = __webpack_require__("./src/app/index.ts");
/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_1.AppModule).then(function(MODULE_REF) {
  if (false) {
    module["hot"]["accept"]();
    
    if (MODULE_REF.instance["hmrOnInit"]) {
      module["hot"]["data"] && MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
    }
    if (MODULE_REF.instance["hmrOnStatus"]) {
      module["hot"]["apply"](function(status) {
        MODULE_REF.instance["hmrOnStatus"](status);
      });
    }
    if (MODULE_REF.instance["hmrOnCheck"]) {
      module["hot"]["check"](function(err, outdatedModules) {
        MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
      });
    }
    if (MODULE_REF.instance["hmrOnDecline"]) {
      module["hot"]["decline"](function(dependencies) {
        MODULE_REF.instance["hmrOnDecline"](dependencies);
      });
    }
    module["hot"]["dispose"](function(store) {
      MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
      MODULE_REF.destroy();
      MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
    });
  }
  return MODULE_REF;
})
        .then(environment_1.decorateModuleRef)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
hmr_1.bootloader(main);


/***/ }

},["./src/main.browser.ts"]);
//# sourceMappingURL=main.map