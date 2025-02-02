/*
 *
 * Wijmo Library 3.20131.6
 * http://wijmo.com/
 *
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/widgets/license/
 *
 */
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Base/jquery.wijmo.widget.ts"/>
/*globals window,document,jQuery*/
/*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.resizable.js
*	jquery.ui.mouse.js
*	jquery.wijmo.wijutil.js
*
*/
var wijmo;
(function (wijmo) {
    "use strict";
    var $ = jQuery, widgetName = "wijdialog", uiStateHover = "ui-state-hover", zonCSS = "wijmo-wijdialog-defaultdockingzone";
    /** @ignore */
    var JQueryUIDialog = (function (_super) {
        __extends(JQueryUIDialog, _super);
        function JQueryUIDialog() {
            _super.apply(this, arguments);

        }
        JQueryUIDialog.prototype._create = function () {
            return $.ui.dialog.prototype._create.apply(this, arguments);
        };
        JQueryUIDialog.prototype._init = function () {
            return $.ui.dialog.prototype._init.apply(this, arguments);
        };
        JQueryUIDialog.prototype._destroy = function () {
            return $.ui.dialog.prototype._destroy.apply(this, arguments);
        };
        JQueryUIDialog.prototype._appendTo = function () {
            return $.ui.dialog.prototype._appendTo.apply(this, arguments);
        };
        JQueryUIDialog.prototype._setOptions = function () {
            return $.ui.dialog.prototype._setOptions.apply(this, arguments);
        };
        JQueryUIDialog.prototype._setOption = function (key, value) {
            return $.ui.dialog.prototype._setOption.apply(this, arguments);
        };
        JQueryUIDialog.prototype.widget = function () {
            return $.ui.dialog.prototype.widget.apply(this, arguments);
        };
        JQueryUIDialog.prototype.close = function () {
            return $.ui.dialog.prototype.close.apply(this, arguments);
        };
        JQueryUIDialog.prototype.isOpen = function () {
            return $.ui.dialog.prototype.isOpen.apply(this, arguments);
        };
        JQueryUIDialog.prototype.moveToTop = function () {
            return $.ui.dialog.prototype.moveToTop.apply(this, arguments);
        };
        JQueryUIDialog.prototype._moveToTop = function () {
            return $.ui.dialog.prototype._moveToTop.apply(this, arguments);
        };
        JQueryUIDialog.prototype.open = function () {
            return $.ui.dialog.prototype.open.apply(this, arguments);
        };
        JQueryUIDialog.prototype._focusTabbable = function () {
            return $.ui.dialog.prototype._focusTabbable.apply(this, arguments);
        };
        JQueryUIDialog.prototype._keepFocus = function () {
            return $.ui.dialog.prototype._keepFocus.apply(this, arguments);
        };
        JQueryUIDialog.prototype._createWrapper = function () {
            return $.ui.dialog.prototype._createWrapper.apply(this, arguments);
        };
        JQueryUIDialog.prototype._createTitlebar = function () {
            return $.ui.dialog.prototype._createTitlebar.apply(this, arguments);
        };
        JQueryUIDialog.prototype._title = function () {
            return $.ui.dialog.prototype._title.apply(this, arguments);
        };
        JQueryUIDialog.prototype._createButtonPane = function () {
            return $.ui.dialog.prototype._createButtonPane.apply(this, arguments);
        };
        JQueryUIDialog.prototype._createButtons = function () {
            return $.ui.dialog.prototype._createButtons.apply(this, arguments);
        };
        JQueryUIDialog.prototype._makeDraggable = function () {
            return $.ui.dialog.prototype._makeDraggable.apply(this, arguments);
        };
        JQueryUIDialog.prototype._makeResizable = function () {
            return $.ui.dialog.prototype._makeResizable.apply(this, arguments);
        };
        JQueryUIDialog.prototype._minHeight = function () {
            return $.ui.dialog.prototype._minHeight.apply(this, arguments);
        };
        JQueryUIDialog.prototype._position = function () {
            return $.ui.dialog.prototype._position.apply(this, arguments);
        };
        JQueryUIDialog.prototype._size = function () {
            return $.ui.dialog.prototype._size.apply(this, arguments);
        };
        JQueryUIDialog.prototype._blockFrames = function () {
            return $.ui.dialog.prototype._blockFrames.apply(this, arguments);
        };
        JQueryUIDialog.prototype._unblockFrames = function () {
            return $.ui.dialog.prototype._unblockFrames.apply(this, arguments);
        };
        JQueryUIDialog.prototype._createOverlay = function () {
            if(!this.options.modal) {
                return;
            }
            var self = this;
            if(!$.ui.dialog.overlayInstances) {
                // Prevent use of anchors and inputs.
                // We use a delay in case the overlay is created from an
                // event that we're going to be cancelling. (#2804)
                this._delay(function () {
                    // Handle .dialog().dialog("close") (#4065)
                    if($.ui.dialog.overlayInstances) {
                        this.document.bind("focusin.dialog", function (event) {
                            if(!$(event.target).closest(".ui-dialog").length && // TODO: Remove hack when datepicker implements
                            // the .ui-front logic (#8989)
                            !$(event.target).closest(".ui-datepicker").length) {
                                event.preventDefault();
                                var dialogEle = $(".ui-dialog:visible:last .ui-dialog-content"), dialogObj;
                                if(dialogEle.data("wijmoWijdialog")) {
                                    dialogObj = dialogEle.data("wijmoWijdialog");
                                } else {
                                    dialogObj = dialogEle.data("wijmoC1dialog");
                                }
                                if(dialogObj) {
                                    dialogObj._focusTabbable();
                                }
                            }
                        });
                    }
                });
            }
            this.overlay = $("<div>").addClass("ui-widget-overlay ui-front ui-dialog-overlay").appendTo(this._appendTo());
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            });
            $.ui.dialog.overlayInstances++;
        };
        JQueryUIDialog.prototype._destroyOverlay = function () {
            return $.ui.dialog.prototype._destroyOverlay.apply(this, arguments);
        };
        return JQueryUIDialog;
    })(wijmo.JQueryUIWidget);
    wijmo.JQueryUIDialog = JQueryUIDialog;    
    var wijdialog_options = (function () {
        function wijdialog_options() {
            /** This option specifies the starting z-index for the dialog.
            * @example
            * $("selector").wijdialog({zIndex: 2000});
            */
            this.zIndex = 1000;
            /** Selector option for auto self initialization.
            *	This option is internal.
            * @ignore
            */
            this.initSelector = "";
            /** The captionButtons option determines the caption buttons to show on the wijdialog title bar.
            * @type {object}
            * @remarks
            * The default value for this option is:
            * {
            * pin: {visible: true, click: self.pin,
            * iconClassOn: "ui-icon-pin-w", iconClassOff:"ui-icon-pin-s"},
            * refresh: {visible: true, click: self.refresh,
            * iconClassOn: "ui-icon-refresh"},
            * toggle: {visible: true, click: self.toggle},
            * minimize: {visible: true, click: self.minimize,
            * iconClassOn: "ui-icon-minus"},
            * maximize: {visible: true, click: self.maximize,
            * iconClassOn: "ui-icon-extlink"},
            * close: {visible: true, click: self.close,
            * iconClassOn: "ui-icon-close"}
            * };
            * Each button is represented by an object in this object.
            * property name: The name of the button.
            * visible: A value specifies whether this button is visible.
            * click: The event handler to handle the click event of this button.
            * iconClassOn: Icon for normal state.
            * iconClassOff: Icon after clicking.
            * @example
            * $("selector").wijdialog({captionButtons: {
            * pin: { visible: false },
            * refresh: { visible: false },
            * toggle: { visible: false },
            * minimize: { visible: false },
            * maximize: { visible: false }
            * }
            * });
            */
            this.captionButtons = {
            };
            /** The collapsingAnimation option determines the animation effect that is used when the wijdialog is collapsed.
            * @type {object}
            * @example
            * $("selector").wijdialog({collapsingAnimation:
            * { effect: "puff", duration: 300, easing: "easeOutExpo" }
            * });
            */
            this.collapsingAnimation = null;
            /** The expandingAnimation option determines the animation effect that is used when the wijdialog is expanded.
            * @type {object}
            * @example
            * $("selector").wijdialog({expandingAnimation:
            * { effect: "puff", duration: 300, easing: "easeOutExpo" }
            * });
            */
            this.expandingAnimation = null;
            /** This option specifies the URL for the iframe element inside wijdialog.
            * @example
            * $("selector").wijdialog({contentUrl: 'http://www.google.com'});
            */
            this.contentUrl = "";
            /** The minimizeZoneElementId option specifies the ID of the DOM element to dock to when wijdialog is minimized.
            * @example
            * $("selector").wijdialog({minimizeZoneElementId: "zoomId"});
            */
            this.minimizeZoneElementId = "";
            /** The buttonCreating event is called before the caption buttons are created.
            * It can be used to change the array of the buttons or to change, add, or remove buttons from the title bar.
            * @event
            * @param {jQuery.Event} e jQuery Event object
            * @param {object} data Buttons array that will be created.
            */
            this.buttonCreating = null;
            /** The stateChanged event is called when the dialog state ("maximized", "minimized", "normal") is changed.
            * @event
            * @dataKey {string} originalState The original state of the dialog box.
            * @dataKey {string} state The current state of the dialog box.
            */
            this.stateChanged = null;
            /** The blur event is called when the dialog widget loses focus.
            * @event
            * @dataKey {DOMElement} el The DOM element of this dialog.
            */
            this.blur = null;
        }
        return wijdialog_options;
    })();    
    /** @widget
    * @extends jQuery.ui.dialog
    */
    var wijdialog = (function (_super) {
        __extends(wijdialog, _super);
        function wijdialog() {
            _super.apply(this, arguments);

        }
        wijdialog.prototype._create = function () {
            var self = this, o = self.options;
            // enable touch support:
            //if (window.wijmoApplyWijTouchUtilEvents) {
            //    $ = window.wijmoApplyWijTouchUtilEvents($);
            //}
            $.ui.dialog.maxZ = $.ui.dialog.maxZ || 100;
            //Add support for jUICE!
            if($.isArray(o.buttons)) {
                $.each(o.buttons, function (idx, value) {
                    var c = value.click;
                    if(c && (typeof c === "string") && window[c]) {
                        value.click = window[c];
                    }
                });
            }
            //end
            self.form = self.element.closest("form[id]")// for asp.net
            ;
            $.ui.dialog.prototype._create.apply(self, arguments);
            self.uiDialog.addClass("wijmo-wijdialog");
            self._initWijWindow();
            self._bindWindowResize();
            self._attachDraggableResizableEvent();
            self._originalPosition = o.position;
            self.uiDialog.css({
                zIndex: o.zIndex
            });
            self.isPin = false;
            if(self.form.length) {
                self.uiDialog.appendTo(self.form);
            }
        };
        wijdialog.prototype._makeDraggable = function () {
            $.ui.dialog.prototype._makeDraggable.apply(this, arguments);
            this.uiDialog.draggable("option", "cancel", ".wijmo-wijdialog-captionbutton");
        };
        wijdialog.prototype._handleDisabledOption = function (disabled, ele) {
            var self = this;
            if(disabled) {
                if(!self.disabledDiv) {
                    self.disabledDiv = self._createDisabledDiv();
                }
                self.disabledDiv.appendTo("body");
                if($.browser.msie) {
                    self.uiDialog.draggable("disable");
                }
            } else if(self.disabledDiv) {
                self.disabledDiv.remove();
                self.disabledDiv = null;
                if($.browser.msie) {
                    self.uiDialog.draggable("enable");
                }
            }
        };
        wijdialog.prototype._createDisabledDiv = function () {
            var self = this, div, ele = //Change your outerelement here
            self.uiDialog, eleOffset = ele.offset(), disabledWidth = ele.outerWidth(), disabledHeight = ele.outerHeight();
            div = $("<div></div>").addClass("ui-disabled").css({
                "z-index": "99999",
                position: "absolute",
                width: disabledWidth,
                height: disabledHeight,
                left: eleOffset.left,
                top: eleOffset.top
            });
            if($.browser.msie) {
                div.css("background-color", "white");
                if($.browser.version === "9.0") {
                    div.css("opacity", "0.1");
                }
            }
            return div;
        };
        wijdialog.prototype.destroy = /**
        * Removes the wijdialog functionality completely. This returns the element to its pre-init state.
        */
        function () {
            var self = this;
            //Add for support disabled option at 2011/7/8
            if(self.disabledDiv) {
                self.disabledDiv.remove();
                self.disabledDiv = null;
            }
            //end for disabled option
            $.ui.dialog.prototype._destroy.apply(self, arguments);
            self.element.unbind(".wijdialog").removeData('wijdialog');
        };
        wijdialog.prototype._attachDraggableResizableEvent = function () {
            var self = this, uiDialog = self.uiDialog, o = self.options;
            if(o.draggable && uiDialog.draggable) {
                uiDialog.bind("dragstop", function (event, ui) {
                    self._saveNormalState();
                    self._destoryIframeMask();
                }).bind("dragstart", function (event, ui) {
                    self._createIframeMask();
                });
            }
            if(o.resizable && uiDialog.resizable) {
                uiDialog.bind("resizestop", function (event, ui) {
                    self._saveNormalState();
                    self._destoryIframeMask();
                }).bind("resizestart", function (event, ui) {
                    self._createIframeMask();
                });
            }
        };
        wijdialog.prototype._createIframeMask = //fixed iframe bug.
        function () {
            var self = this;
            if(self.innerFrame) {
                self.mask = $("<div style='width:100%;height:100%;position:absolute;" + "top:0px;left:0px;z-index:" + ($.ui.dialog.maxZ + 1) + "'></div>").appendTo(self.uiDialog);
            }
        };
        wijdialog.prototype._destoryIframeMask = function () {
            var self = this;
            if(self.innerFrame && self.mask) {
                self.mask.remove();
                self.mask = undefined;
            }
        };
        wijdialog.prototype._initWijWindow = function () {
            var self = this, isIn = true;
            self._createCaptionButtons();
            self._checkUrl();
            //self.uiDialogButtonPane = $(".ui-dialog-buttonpane", self.uiDialog);
            self.uiDialog.bind("mousedown", function (event) {
                var el = event.target;
                if(!$.contains(self.element[0], el)) {
                    self.uiDialog.focus();
                }
            }).bind("mouseenter", function (event) {
                isIn = true;
            }).bind("mouseleave", function (event) {
                isIn = false;
            }).bind("focusout", function (event) {
                if(!isIn) {
                    self._trigger("blur", event, {
                        el: self.element
                    });
                }
            });
        };
        wijdialog.prototype._moveToTop = function (event, force) {
//            var self = this, options = self.options, saveScroll;
//            if((options.modal && !force) || (!options.stack && !options.modal)) {
//                return self._trigger('focus', event);
//            }
//            if(options.zIndex > $.ui.dialog.maxZ) {
//                $.ui.dialog.maxZ = options.zIndex;
//            }
//            if(self.overlay) {
//                $.ui.dialog.maxZ += 1;
//                self.overlay.css('z-index', $.ui.dialog.maxZ);
//            }
//            //Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
//            //  http://ui.jquery.com/bugs/ticket/3193
//            saveScroll = {
//                scrollTop: self.element.scrollTop(),
//                scrollLeft: self.element.scrollLeft()
//            };
//            $.ui.dialog.maxZ += 1;
//            self.uiDialog.css('z-index', $.ui.dialog.maxZ);
//            self.element.attr(saveScroll);
//            self._trigger('focus', event);
//            return self;
        };
        wijdialog.prototype._checkUrl = function () {
            var self = this, o = self.options, url = o.contentUrl, innerFrame = $('<iframe style="width:100%;height:99%;" frameborder="0"></iframe>');
            if(typeof url === "string" && url.length > 0) {
                self.element.addClass("wijmo-wijdialog-hasframe");
                //innerFrame.attr("src", url);
                self.element.append(innerFrame);
                self.innerFrame = innerFrame;
            }
            self.contentWrapper = self.element;
        };
        wijdialog.prototype._setOption = function (key, value) {
            var self = this;
            $.ui.dialog.prototype._setOption.apply(self, arguments);
            //			if (key === "captionButtons") {
            //				// self._createCaptionButtons();
            //				// todo: reset captionButtons
            //			}
            //			//Add for support disabled option at 2011/7/8
            //			else
            if(key === "disabled") {
                self._handleDisabledOption(value, self.element);
            } else //end for disabled option
            if(key === "contentUrl") {
                if(self.innerFrame) {
                    self.innerFrame.attr("src", value);
                } else {
                    self._checkUrl();
                }
            } else if(key = "captionButtons") {
                self._createCaptionButtons();
            }
        };
        wijdialog.prototype._createCaptionButtons = function () {
            var captionButtons = [], self = this, o = self.options, i, buttons = {
                pin: {
                    visible: true,
                    click: self.pin,
                    iconClassOn: "ui-icon-pin-w",
                    iconClassOff: "ui-icon-pin-s"
                },
                refresh: {
                    visible: true,
                    click: self.refresh,
                    iconClassOn: "ui-icon-refresh"
                },
                toggle: {
                    visible: true,
                    click: self.toggle,
                    iconClassOn: "ui-icon-carat-1-n",
                    iconClassOff: "ui-icon-carat-1-s"
                },
                minimize: {
                    visible: true,
                    click: self.minimize,
                    iconClassOn: "ui-icon-minus"
                },
                maximize: {
                    visible: true,
                    click: self.maximize,
                    iconClassOn: "ui-icon-extlink"
                },
                close: {
                    visible: true,
                    text: o.closeText,
                    click: self.close,
                    iconClassOn: "ui-icon-close"
                }
            }, oCaptionButtons = o.captionButtons, uiDialogTitlebar = self.uiDialogTitlebar;
            uiDialogTitlebar.children(".ui-dialog-titlebar-close, .wijmo-wijdialog-captionbutton").remove();
            $.each(buttons, function (name, value) {
                if(oCaptionButtons && oCaptionButtons[name]) {
                    $.extend(value, oCaptionButtons[name]);
                }
                captionButtons.push({
                    button: name,
                    info: value
                });
            });
            self._trigger("buttonCreating", null, captionButtons);
            for(i = 0; i < captionButtons.length; i++) {
                self._createCaptionButton(captionButtons[i], uiDialogTitlebar);
            }
        };
        wijdialog.prototype._createCaptionButton = function (buttonHash, uiDialogTitlebar, notAppendToHeader) {
            var self = this, buttonObject, buttonCSS = "wijmo-wijdialog-titlebar-" + buttonHash.button, button = uiDialogTitlebar.children("." + buttonCSS), info = buttonHash.info, buttonIcon = $("<span></span>");
            if(info.visible) {
                if(button.size() === 0) {
                    buttonIcon.addClass("ui-icon " + info.iconClassOn).text(info.text || buttonHash.button);
                    buttonObject = $('<a href="#"></a>').append(buttonIcon).addClass(buttonCSS + " ui-corner-all wijmo-wijdialog-captionbutton").attr("role", "button").hover(function () {
                        buttonObject.addClass(uiStateHover);
                    }, function () {
                        buttonObject.removeClass(uiStateHover);
                    }).click(function (event) {
                        if(buttonIcon.hasClass(info.iconClassOff)) {
                            buttonIcon.removeClass(info.iconClassOff);
                        } else {
                            buttonIcon.addClass(info.iconClassOff);
                        }
                        if($.isFunction(info.click)) {
                            info.click.apply(self, arguments);
                        }
                        return false;
                    });
                    if(notAppendToHeader) {
                        return buttonObject;
                    } else {
                        buttonObject.appendTo(uiDialogTitlebar);
                    }
                }
                self[buttonHash.button + "Button"] = buttonObject;
            } else {
                button.remove();
            }
        };
        wijdialog.prototype.pin = /**
        * The pin method prevents the wijdialog from being moved.
        */
        function () {
            var drag = this.isPin, buttonIcon = this.pinButton.children("span");
            if(!drag) {
                if(buttonIcon.length) {
                    if(!buttonIcon.hasClass("ui-icon-pin-s")) {
                        buttonIcon.addClass("ui-icon-pin-s");
                    }
                }
            } else {
                buttonIcon.removeClass("ui-icon-pin-s");
            }
            this._enableDisableDragger(!drag);
            this.isPin = !drag;
        };
        wijdialog.prototype.refresh = /**
        * The refresh method refreshes the iframe content within the wijdialog.
        */
        function () {
            var fr = this.innerFrame;
            if(fr !== undefined) {
                fr.attr("src", fr.attr("src"));
            }
        };
        wijdialog.prototype.toggle = /**
        * The toggle method expands or collapses the content of the wijdialog.
        */
        function () {
            var self = this, buttonIcon = self.toggleButton.children("span");
            // TODO : toggle animation and event invoking.
            if(!self.minimized) {
                if(self.collapsed === undefined || !self.collapsed) {
                    self.collapsed = true;
                    if(!buttonIcon.hasClass("ui-icon-carat-1-s")) {
                        buttonIcon.addClass("ui-icon-carat-1-s");
                    }
                    self._collapseDialogContent(true);
                } else {
                    self.collapsed = false;
                    if(buttonIcon.hasClass("ui-icon-carat-1-s")) {
                        buttonIcon.removeClass("ui-icon-carat-1-s");
                    }
                    self._expandDialogContent(true);
                }
            }
        };
        wijdialog.prototype._expandDialogContent = function (fireEvent) {
            var self = this, o = self.options, animationSetting = o.expandingAnimation;
            self.uiDialog.height("auto");
            if(fireEvent && animationSetting !== null) {
                self.contentWrapper.show(animationSetting.animated, animationSetting.options, animationSetting.duration, function (e) {
                    self.uiDialog.css("height", self._toggleHeight);
                    if($.isFunction(animationSetting.callback)) {
                        animationSetting.callback(e);
                    }
                    if(o.resizable) {
                        self._enableDisableResizer(false);
                    }
                });
            } else {
                self.contentWrapper.show();
                if(o.resizable) {
                    self._enableDisableResizer(false);
                }
                self.uiDialog.css("height", self.toggleHeight);
            }
        };
        wijdialog.prototype._collapseDialogContent = function (fireEvent) {
            var self = this, o = self.options, animationSetting = o.collapsingAnimation;
            if(o.resizable) {
                self._enableDisableResizer(true);
            }
            self._toggleHeight = self.uiDialog[0].style.height;
            self.uiDialog.height("auto");
            if(fireEvent && animationSetting !== null) {
                self.contentWrapper.hide(animationSetting.animated, animationSetting.options, animationSetting.duration);
            } else {
                self.contentWrapper.hide();
            }
            self._enableDisableDragger(self.isPin);
        };
        wijdialog.prototype._enableDisableResizer = function (disabled) {
            var dlg = this.uiDialog;
            if(!this.options.resizable) {
                return;
            }
            dlg.resizable({
                disabled: disabled
            });
            if(disabled) {
                dlg.removeClass("ui-state-disabled");
            }
        };
        wijdialog.prototype._enableDisableDragger = function (disabled) {
            var dlg = this.uiDialog;
            if(!this.options.draggable) {
                return;
            }
            dlg.draggable({
                disabled: disabled
            });
            if(disabled) {
                dlg.removeClass("ui-state-disabled");
            }
        };
        wijdialog.prototype.minimize = /**
        * The minimize method minimizes the wijdialog.
        */
        function () {
            var self = this, dlg = self.uiDialog, o = self.options, miniZone = null, $from = $("<div></div>"), $to = $("<div></div>"), defaultZone, scrollTop, top, originalPosition, originalSize = {
                width: undefined,
                height: undefined
            }, position, size = {
                width: undefined,
                height: undefined
            }, content = "uiDialog", originalState;
            //content has 2 value 'uiDialog' for normal content,'copy' for iframe
            //to resolve the issue that iframe reload when minimize.
            //Only minimize from normal,maximized state
            if(!self.minimized) {
                originalPosition = self.uiDialog.position();
                originalSize.width = self.uiDialog.width();
                originalSize.height = self.uiDialog.height();
                originalState = self.getState();
                if(self.maximized) {
                    self.maximized = false;
                    self.restoreButton.remove();
                    //fixed bug can't minimize window when it's maximized
                    $(window).unbind(".onWinResize");
                } else {
                    // minimize from normal state
                    if(self.collapsed) {
                        self._expandDialogContent(false);
                    }
                    self._saveNormalState();
                }
                // disable resizer
                self._enableDisableResizer(true);
                //hide content
                if(self.collapsed) {
                    self._collapseDialogContent(false);
                }
                $from.appendTo(document.body).css({
                    top: self.uiDialog.offset().top,
                    left: self.uiDialog.offset().left,
                    height: self.uiDialog.innerHeight(),
                    width: self.uiDialog.innerWidth(),
                    position: "absolute"
                });
                self.contentWrapper.hide();
                if(self.uiDialogButtonPane.length) {
                    self.uiDialogButtonPane.hide();
                }
                // remove size restriction
                dlg.height("auto");
                dlg.width("auto");
                self._doButtonAction(self.minimizeButton, "hide");
                self._restoreButton(true, self.minimizeButton, "After");
                self._doButtonAction(self.pinButton, "hide");
                self._doButtonAction(self.refreshButton, "hide");
                self._doButtonAction(self.toggleButton, "hide");
                self._doButtonAction(self.maximizeButton, "show");
                if($.browser.webkit) {
                    $(".wijmo-wijdialog-captionbutton", self.uiDialog).css("float", "left");
                }
                if(self.innerFrame) {
                    content = "copy";
                    self[content] = self.uiDialog.clone();
                    self[content].empty();
                    self.uiDialogTitlebar.appendTo(self[content]);
                }
                if(o.minimizeZoneElementId.length > 0) {
                    miniZone = $("#" + o.minimizeZoneElementId);
                }
                if(miniZone !== null && miniZone.size() > 0) {
                    miniZone.append(self[content]);
                } else {
                    defaultZone = $("." + zonCSS);
                    if(defaultZone.size() === 0) {
                        defaultZone = $('<div class="' + zonCSS + '"></div>');
                        $(document.body).append(defaultZone);
                    }
                    defaultZone.append(self[content]).css("z-index", dlg.css("z-index"));
                }
                self[content].css("position", "static");
                self[content].css("float", "left");
                if($.browser.msie && $.browser.version === '6.0') {
                    scrollTop = $(document).scrollTop();
                    top = document.documentElement.clientHeight - defaultZone.height() + scrollTop;
                    defaultZone.css({
                        position: 'absolute',
                        left: "0px",
                        top: top
                    });
                }
                $to.appendTo(document.body).css({
                    top: self[content].offset().top,
                    left: self[content].offset().left,
                    height: self[content].innerHeight(),
                    width: self[content].innerWidth(),
                    position: "absolute"
                });
                self.uiDialog.hide();
                if(self.innerFrame) {
                    self[content].hide();
                }
                $from.effect("transfer", {
                    to: $to,
                    className: "ui-widget-content"
                }, 100, function () {
                    $from.remove();
                    $to.remove();
                    self[content].show();
                    self.minimized = true;
                    position = self.uiDialog.position();
                    size.width = self.uiDialog.width();
                    size.height = self.uiDialog.height();
                    self._enableDisableDragger(true);
                    self._trigger('resize', null, {
                        originalPosition: originalPosition,
                        originalSize: originalSize,
                        position: position,
                        size: size
                    });
                    self._trigger("stateChanged", null, {
                        originalState: originalState,
                        state: "minimized"
                    });
                });
            }
        };
        wijdialog.prototype._doButtonAction = function (button, action) {
            if(button !== undefined) {
                button.removeClass(uiStateHover);
                button[action]();
            }
        };
        wijdialog.prototype.maximize = /**
        * The maximize method maximizes the wijdialog.
        */
        function () {
            var self = this, w = $(window), originalPosition, originalSize = {
                width: undefined,
                height: undefined
            }, position, size = {
                width: undefined,
                height: undefined
            }, state;
            if(!self.maximized) {
                self._enableDisableDragger(false);
                originalPosition = self.uiDialog.position();
                originalSize.width = self.uiDialog.width();
                originalSize.height = self.uiDialog.height();
                // maximized from minimized state
                if(self.minimized) {
                    self.restore()//bug in IE when minimize -> maximize -> restore
                    ;
                } else {
                    if(self.collapsed) {
                        self._expandDialogContent(false);
                    }
                    self._saveNormalState();
                    state = "normal";
                }
                self.maximized = true;
                if(self.maximizeButton !== undefined) {
                    self.maximizeButton.hide();
                    self._restoreButton(true, self.maximizeButton, "Before");
                }
                if($.browser.webkit) {
                    $(".wijmo-wijdialog-captionbutton").css("float", "");
                }
                self._onWinResize(self, w);
                if(self.collapsed) {
                    self._collapseDialogContent(false);
                }
                /// TODO : bind resize event.
                if(!self.collapsed) {
                    self._enableDisableDragger(true);
                }
                self._enableDisableResizer(true);
                position = self.uiDialog.position();
                size.width = self.uiDialog.width();
                size.height = self.uiDialog.height();
                self._trigger('resize', null, {
                    originalPosition: originalPosition,
                    originalSize: originalSize,
                    position: position,
                    size: size
                });
                if(state === "normal") {
                    self._trigger("stateChanged", null, {
                        originalState: "normal",
                        state: "maximized"
                    });
                }
            }
        };
        wijdialog.prototype._bindWindowResize = function () {
            var self = this, w = $(window), top, scrollTop, defaultZone;
            w.resize(function () {
                if(self.maximized) {
                    self._onWinResize(self, w);
                }
            });
            //fixed ie 6 position:fixed
            if($.browser.msie && $.browser.version === '6.0') {
                w.bind("scroll.wijdialog resize.wijdialog", function () {
                    if(self.minimized) {
                        scrollTop = $(document).scrollTop();
                        defaultZone = self.uiDialog.parent();
                        top = document.documentElement.clientHeight - defaultZone.height() + scrollTop;
                        defaultZone.css({
                            top: top
                        });
                    }
                });
            }
        };
        wijdialog.prototype._saveNormalState = function () {
            var self = this, dialog = self.uiDialog, ele = self.element;
            if(!self.maximized) {
                self.normalWidth = dialog.css("width");
                self.normalLeft = dialog.css("left");
                self.normalTop = dialog.css("top");
                self.normalHeight = dialog.css("height");
                self.normalInnerHeight = ele.css("height");
                self.normalInnerWidth = ele.css("width");
                self.normalInnerMinWidth = ele.css("min-width");
                self.normalInnerMinHeight = ele.css("min-height");
            }
        };
        wijdialog.prototype._onWinResize = function (self, w) {
            self.uiDialog.css("top", w.scrollTop());
            self.uiDialog.css("left", w.scrollLeft());
            self.uiDialog.setOutWidth(w.width());
            self.uiDialog.setOutHeight(w.height());
            self.options.width = self.uiDialog.width();
            self.options.height = self.uiDialog.height();
            self._size();
            if(self.collapsed) {
                //fixed bug when resize on maxmize and collapse state.
                self.uiDialog.height("auto");
                self.contentWrapper.hide();
            }
        };
        wijdialog.prototype._restoreButton = function (show, button, position) {
            var self = this, buttonHash = {
                button: "restore",
                info: {
                    visible: show,
                    click: self.restore,
                    iconClassOn: "ui-icon-newwin"
                }
            }, restore = self._createCaptionButton(buttonHash, self.uiDialogTitlebar, true);
            if(show) {
                restore["insert" + position](button);
                self.restoreButton = restore;
            }
        };
        wijdialog.prototype._appendToBody = function (dlg) {
            if(!this.innerFrame) {
                dlg.appendTo(document.body);
            } else {
                this.uiDialogTitlebar.prependTo(dlg);
                dlg.show();
            }
        };
        wijdialog.prototype.restore = /**
        * The restore method restores the wijdialog to its normal size from either the minimized or the maximized state.
        */
        function () {
            var self = this, dlg = self.uiDialog, originalPosition, originalSize = {
                width: undefined,
                height: undefined
            }, position, size = {
                width: undefined,
                height: undefined
            }, $from = $("<div></div>"), $to = $("<div></div>"), content = "uiDialog", state;
            //content has 2 value 'uiDialog' for normal content,'copy' for iframe
            //to resolve the issue that iframe reload when minimize on ff & webkit.
            // restore form minimized state.
            if(self.minimized) {
                self.minimized = false;
                //self._enableDisableDragger(false);
                if(self.innerFrame) {
                    content = "copy";
                    if(!self[content]) {
                        content = "uiDialog";
                    }
                }
                originalPosition = self[content].position();
                originalSize.width = self[content].width();
                originalSize.height = self[content].height();
                $from.appendTo(document.body).css({
                    top: self[content].offset().top,
                    left: self[content].offset().left,
                    height: self[content].innerHeight(),
                    width: self[content].innerWidth(),
                    position: "absolute"
                });
                dlg.css("position", "absolute");
                dlg.css("float", "");
                self._appendToBody(dlg);
                self._enableDisableResizer(false);
                if(!self.isPin) {
                    self._enableDisableDragger(false);
                }
                self._restoreToNormal();
                self.contentWrapper.show();
                if(self.uiDialogButtonPane.length) {
                    self.uiDialogButtonPane.show();
                }
                $to.appendTo(document.body).css({
                    top: self.uiDialog.offset().top,
                    left: self.uiDialog.offset().left,
                    height: self.uiDialog.innerHeight(),
                    width: self.uiDialog.innerWidth(),
                    position: "absolute"
                });
                self.uiDialog.hide();
                $from.effect("transfer", {
                    to: $to,
                    className: "ui-widget-content"
                }, 150, function () {
                    self.uiDialog.show();
                    position = self.uiDialog.position();
                    size.width = self.uiDialog.width();
                    size.height = self.uiDialog.height();
                    $from.remove();
                    $to.remove();
                    if(self.copy) {
                        self.copy.remove();
                    }
                    self._trigger('resize', null, {
                        originalPosition: originalPosition,
                        originalSize: originalSize,
                        position: position,
                        size: size
                    });
                    state = self.getState();
                    self._trigger("stateChanged", null, {
                        originalState: "minimized",
                        state: state
                    });
                });
                if(self.collapsed) {
                    self._collapseDialogContent();
                }
                self._doButtonAction(self.minimizeButton, "show");
                self._doButtonAction(self.restoreButton, "remove");
                self._doButtonAction(self.pinButton, "show");
                self._doButtonAction(self.refreshButton, "show");
                self._doButtonAction(self.toggleButton, "show");
                if($.browser.webkit) {
                    $(".wijmo-wijdialog-captionbutton").css("float", "");
                }
            } else if(self.maximized) {
                self.maximized = false;
                originalPosition = self.uiDialog.position();
                originalSize.width = self.uiDialog.width();
                originalSize.height = self.uiDialog.height();
                $(window).unbind(".onWinResize");
                if(self.collapsed) {
                    self._expandDialogContent();
                }
                self._enableDisableResizer(false);
                if(!self.isPin) {
                    self._enableDisableDragger(false);
                }
                self._restoreToNormal();
                self.contentWrapper.show();
                if(self.collapsed) {
                    self._collapseDialogContent();
                }
                if(self.maximizeButton !== undefined) {
                    self.maximizeButton.show();
                    self._restoreButton(false, self.maximizeButton, "before");
                }
                position = self.uiDialog.position();
                size.width = self.uiDialog.width();
                size.height = self.uiDialog.height();
                self._trigger('resize', null, {
                    originalPosition: originalPosition,
                    originalSize: originalSize,
                    position: position,
                    size: size
                });
                state = self.getState();
                self._trigger("stateChanged", null, {
                    originalState: "maximized",
                    state: state
                });
            }
        };
        wijdialog.prototype.getState = /**
        * The getState method gets the state of the dialog widget.
        * @returns {string} Possible values are: minimized, maximized, and normal.
        */
        function () {
            var self = this;
            return self.minimized ? "minimized" : (self.maximized ? "maximized" : "normal");
        };
        wijdialog.prototype.reset = /**
        * The reset method resets dialog properties such as width and height to their default values.
        */
        function () {
            var self = this;
            self.normalWidth = self.normalLeft = self.normalTop = self.normalHeight = self.normalInnerHeight = self.normalInnerWidth = self.normalInnerMinWidth = self.normalInnerMinHeight = undefined;
            self._setOption("position", self._originalPosition);
        };
        wijdialog.prototype.open = /**
        * The open method opens an instance of the wijdialog.
        */
        function () {
            var self = this, o = self.options;
            if((o.hide === "drop" || o.hide === "bounce") && $.browser.msie) {
                //fixed bug when effect "drop" on IE
                self.uiDialog.css("filter", "auto");
            }
            if(!self.innerFrame) {
                if(!self.minimized) {
                    $.ui.dialog.prototype.open.apply(self, arguments);
                    //					if (!self.maximized) {
                    //						self._restoreToNormal();
                    //					}
                                    } else {
                    self.uiDialog.show();
                    self._isOpen = true;
                }
                self.uiDialog.wijTriggerVisibility();
            } else {
                self.innerFrame.attr("src", o.contentUrl);
                if(!self.minimized) {
                    $.ui.dialog.prototype.open.apply(self, arguments);
                } else {
                    self.uiDialogTitlebar.show();
                    self._isOpen = true;
                }
            }
            if(self.collapsed) {
                self._collapseDialogContent();
            }
            if(o.disabled) {
                if(self.disabledDiv) {
                    self.disabledDiv.show();
                } else {
                    self.disable();
                }
            }
        };
        wijdialog.prototype.close = /**
        * The close method closes the dialog widget.
        */
        function () {
            var self = this, o = self.options;
            if($.ui.dialog.prototype.close.apply(self, arguments)) {
                if(self.innerFrame) {
                    self.innerFrame.attr("src", "");
                    if(self.minimized) {
                        self.uiDialogTitlebar.hide();
                    }
                }
                if(self.disabledDiv && o.disabled) {
                    self.disabledDiv.hide();
                }
            }
        };
        wijdialog.prototype._restoreToNormal = function () {
            var self = this, dialog = self.uiDialog, ele = self.element;
            dialog.css("width", self.normalWidth);
            dialog.css("left", self.normalLeft);
            dialog.css("top", self.normalTop);
            dialog.css("height", self.normalHeight);
            ele.css("height", self.normalInnerHeight);
            ele.css("width", self.normalInnerWidth);
            ele.css("min-width", self.normalInnerMinWidth);
            ele.css("min-height", self.normalInnerMinHeight);
            self.options.width = self.uiDialog.width();
            self.options.height = self.uiDialog.height();
        };
        return wijdialog;
    })(JQueryUIDialog);
    wijmo.wijdialog = wijdialog;    
    if($.ui && $.ui.dialog) {
        $.extend($.ui.dialog.overlay, {
            create: function (dialog) {
                if(this.instances.length === 0) {
                    // prevent use of anchors and inputs
                    // we use a setTimeout in case the overlay is created from an
                    // event that we're going to be cancelling (see #2804)
                    setTimeout(function () {
                        // handle $(el).dialog().dialog('close') (see #4065)
                        if($.ui.dialog.overlay.instances.length) {
                            $(document).bind($.ui.dialog.overlay.events, function (event) {
                                // stop events if the z-index of the target is < the z-index of the overlay
                                // we cannot return true when we don't want to cancel the event (#3523)
                                if($(event.target).zIndex() < $.ui.dialog.overlay.maxZ && !$.contains(dialog.element[0], event.target)) {
                                    return false;
                                }
                            });
                        }
                    }, 1);
                    // allow closing by pressing the escape key
                    $(document).bind('keydown.dialog-overlay', function (event) {
                        if(dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
                            dialog.close(event);
                            event.preventDefault();
                        }
                    });
                    // handle window resize
                    $(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
                }
                var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay')).appendTo(document.body).css({
                    width: this.width(),
                    height: this.height()
                });
                if($.fn.bgiframe) {
                    $el.bgiframe();
                }
                this.instances.push($el);
                return $el;
            },
            height: function () {
                var scrollHeight, offsetHeight;
                // handle IE 6
                if($.browser.msie) {
                    scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                    offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                    if(scrollHeight < offsetHeight) {
                        return $(window).height() + 'px';
                    } else {
                        return scrollHeight + 'px';
                    }
                    // handle "good" browsers
                                    } else {
                    return $(document).height() + 'px';
                }
            },
            width: function () {
                var scrollWidth, offsetWidth;
                // handle IE 6
                if($.browser.msie) {
                    scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                    offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                    if(scrollWidth < offsetWidth) {
                        return $(window).width() + 'px';
                    } else {
                        return scrollWidth + 'px';
                    }
                    // handle "good" browsers
                                    } else {
                    return $(document).width() + 'px';
                }
            }
        });
        wijdialog.prototype.options = $.extend(true, {
        }, $.ui.dialog.prototype.options, new wijdialog_options());
        // for some reason, the jQuery UI dialog override these two methods to $.noonp, I orderride it as base widget.
        wijdialog.prototype.disable = function () {
            return this._setOption("disabled", true);
        };
        wijdialog.prototype.enable = function () {
            return this._setOption("disabled", false);
        };
        $.wijmo.registerWidget(widgetName, $.ui.dialog, wijdialog.prototype);
    }
})(wijmo || (wijmo = {}));
