/*
 *
 * Wijmo Library 3.20131.6
 * http://wijmo.com/
 *
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 * 
 * Licensed under the Wijmo Commercial License. Also available under the GNU GPL Version 3 license.
 * licensing@wijmo.com
 * http://wijmo.com/widgets/license/
 *
 *
 */
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../external/declarations/globalize.d.ts"/>
/// <reference path="../Base/jquery.wijmo.widget.ts" />
/// <reference path="../wijtabs/jquery.wijmo.wijtabs.ts" />
/*globals jQuery,window,document*/
/*
* Depends:
*     jquery.ui.core.js
*     jquery.ui.widget.js
*     jquery.wijmo.wijtooltip.js
*/
var wijmo;
(function (wijmo) {
    "use strict";
    var $ = jQuery, widgetName = "wijribbon";
    var css_ribbon = "wijmo-wijribbon", css_ribbon_disabled = css_ribbon + "-disabled", css_ribbon_bigbutton = css_ribbon + "-bigbutton", css_ribbon_panel = css_ribbon + "-panel", css_ribbon_groups = css_ribbon + "-groups", css_ribbon_group = css_ribbon + "-group", css_ribbon_groupcontent = css_ribbon_group + "-content", css_ribbon_grouplabel = css_ribbon_group + "-label", css_ribbon_dropdown = css_ribbon + "-dropdown", css_ribbon_dropdowngroup = css_ribbon + "-dropdowngroup", css_ribbon_abbrev = css_ribbon + "-abbrev", css_ribbon_abbrevgroup = css_ribbon_abbrev + "group", css_ribbon_text = css_ribbon + "-text", css_ribbon_icon = css_ribbon + "-icon", css_ribbon_abbrevicon = css_ribbon + "-abbrevicon";
    /** @widget */
    var wijribbon = (function (_super) {
        __extends(wijribbon, _super);
        function wijribbon() {
            _super.apply(this, arguments);

        }
        wijribbon.prototype._create = function () {
            var self = this;
            // enable touch support:
            if(window.wijmoApplyWijTouchUtilEvents) {
                $ = window.wijmoApplyWijTouchUtilEvents($);
            }
            self._ribbonify();
            //update for visibility change
            if(self.element.is(":hidden") && self.element.wijAddVisibilityObserver) {
                self.element.wijAddVisibilityObserver(function () {
                    self.updateRibbonSize();
                    if(self.options.disabled) {
                        self._setDisabled(true);
                    }
                    if(self.element.wijRemoveVisibilityObserver) {
                        self.element.wijRemoveVisibilityObserver();
                    }
                }, "wijribbon");
            }
            if(self.options.disabled) {
                self._setDisabled(true);
            }
        };
        wijribbon.prototype._setOption = function (key, value) {
            $.wijmo.widget.prototype._setOption.apply(this, arguments);
            if(key === "disabled") {
                this._setDisabled(value);
            }
        };
        wijribbon.prototype._setDisabled = function (value) {
            var self = this, element = self.element, eleOffset = element.offset(), offsetTop = eleOffset.top, offsetLeft = eleOffset.left, offsetParent = $("body"), wijCSS = this.options.wijCSS, disabledModal = self.disabledModal;
            if(element.data("wijmoWijtabs")) {
                element.wijtabs("option", "disabled", value);
            }
            if(element.closest(".wijmo-wijeditor").length !== 0) {
                offsetTop = 0;
                offsetLeft = 0;
                offsetParent = element.parent();
            }
            if(value) {
                if(!disabledModal) {
                    disabledModal = $("<div></div>").addClass(wijCSS.stateDisabled + " " + css_ribbon_disabled).css({
                        top: offsetTop,
                        left: offsetLeft,
                        "background-color": //"z-index": "10000",
                        //for ie can't disabled, so add background-color attribute
                        "lightgray",
                        "position": "absolute"
                    }).appendTo(offsetParent).bind("click mousedown mouseup mouseover mouseout " + "focus keydown keypress", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                    self.disabledModal = disabledModal;
                }
                self.disabledModal.width(element.width()).height(element.outerHeight()).show();
            } else {
                if(self.disabledModal) {
                    self.disabledModal.hide();
                }
            }
        };
        wijribbon.prototype._ribbonify = function () {
            var self = this, wijCSS = this.options.wijCSS;
            self.buttons = {
            };
            self.listUis = {
            };
            self._getButtonSets();
            self._createButtons();
            self._createGroup();
            self._createSplit();
            self._createDropdwon();
            self._hideShowedList();
            self._createTab();
            $("." + wijCSS.helperReset + ":not(." + css_ribbon_groups + ", ." + wijCSS.tabsNav + ")", self.element).hover(function () {
                $(this).addClass(wijCSS.stateHover);
            }, function () {
                $(this).removeClass(wijCSS.stateHover);
            });
            //update for adding active class at 2011-11-17
            $(".ui-button", self.element).bind("mouseenter", function () {
                $("." + wijCSS.buttonText, this).addClass(wijCSS.stateHover);
            }).bind("mouseleave", function () {
                $("." + wijCSS.buttonText, this).removeClass(wijCSS.stateHover);
            });
            $("button.ui-button", self.element).bind("mousedown", function () {
                self._addActiveClassToButtonText(this);
            }).bind("mouseup", function () {
                self._addActiveClassToButtonText(this);
            });
            //update for 36511 issue for jquery ui 1.10: button interface changed
            /**
            $("label.ui-button", self.element).bind("click", function () {
            self._addActiveClassToLabelButtonText(this);
            });*/
                    };
        wijribbon.prototype._addActiveClassToButtonText = function (button) {
            var wijCSS = this.options.wijCSS;
            if(button) {
                if($(button).hasClass(wijCSS.stateActive)) {
                    $("." + wijCSS.buttonText, button).addClass(wijCSS.stateActive);
                } else {
                    $("." + wijCSS.buttonText, button).removeClass(wijCSS.stateActive);
                }
            }
        };
        wijribbon.prototype._addActiveClassToLabelButtonText = function (button) {
            var self = this, oriEle, oriEleID, eleGroup;
            if(button) {
                oriEleID = $(button).attr("for");
                oriEle = $("#" + oriEleID, self.element);
                if(oriEle.is(":checkbox")) {
                    self._addActiveClassToButtonText(button);
                } else if((oriEle.is(":radio"))) {
                    eleGroup = self.element.find("[name='" + oriEle.attr("name") + "']");
                    $.each(eleGroup, function () {
                        self._updateGroupElementTextState(this);
                    });
                }
            }
        };
        wijribbon.prototype._updateGroupElementTextState = function (button) {
            var radioLabelEle, wijCSS = this.options.wijCSS;
            if(!button) {
                return;
            }
            radioLabelEle = $("[for='" + $(button).attr("id") + "']", $(button).parent());
            if(radioLabelEle) {
                if(radioLabelEle.hasClass(wijCSS.stateActive)) {
                    radioLabelEle.children("." + wijCSS.buttonText).addClass(wijCSS.stateActive);
                } else {
                    radioLabelEle.children("." + wijCSS.buttonText).removeClass(wijCSS.stateActive);
                }
            }
        };
        wijribbon.prototype._getButtonSets = function () {
            var self = this, span;
            self.groups = [];
            self.splits = [];
            self.dropdowns = [];
            $("span>button, span>:checkbox, span>:radio, div>button, div>:checkbox," + " div>:radio", self.element).each(function (i, btn) {
                span = $(btn).parent();
                if($(">ul", span).length === 0) {
                    self.groups.push(span);
                } else {
                    if($(">button", span).length === 2) {
                        self.splits.push(span);
                    } else if($(">button", span).length === 1) {
                        self.dropdowns.push(span);
                    }
                }
                return this;
            });
            self.groups = self._unique(self.groups);
            self.splits = self._unique(self.splits);
        };
        wijribbon.prototype._unique = function (group) {
            var array = $.makeArray($.map(group, function (n) {
                return n.get(0);
            }));
            return $.map($.unique(array), function (n) {
                return $(n);
            });
        };
        wijribbon.prototype._createButtons = function () {
            var self = this, element = self.element;
            $(":checkbox", element).each(function () {
                self._createButton($(this), "checkbox");
                //update for 36511 issue for jquery ui 1.10: button interface changed
                $(this).bind("change", function () {
                    self._addActiveClassToLabelButtonText($(this).button("widget")[0]);
                });
                return this;
            });
            $(":radio", element).each(function () {
                self._createButton($(this), "radio");
                $(this).bind("change", function () {
                    self._addActiveClassToLabelButtonText($(this).button("widget")[0]);
                });
                return this;
            });
            $("button", element).each(function () {
                self._createButton($(this), "button");
                return this;
            });
        };
        wijribbon.prototype._createButton = function (button, type) {
            var self = this, wijCSS = this.options.wijCSS, options = self._buildButtonOption(button, type), name = button.data("commandName"), labelEle;
            button.button(options);
            if(!options.text) {
                if(type === "button") {
                    button.children("." + wijCSS.buttonText).text(name);
                } else {
                    labelEle = $("[for='" + button.attr("id") + "']", button.parent());
                    if(labelEle) {
                        labelEle.children("." + wijCSS.buttonText).text(name);
                    }
                }
            }
            self._triggerEvent(button);
        };
        wijribbon.prototype._createGroup = function () {
            $.each(this.groups, function (i, group) {
                group.buttonset();
            });
        };
        wijribbon.prototype._createSplit = function () {
            var self = this, wijCSS = this.options.wijCSS;
            $.each(self.splits, function (i, split) {
                var list = split.children("ul"), content = split.children("button:eq(0)"), splitName = content.data("commandName"), triggerEle = split.children("button:eq(1)"), splitObj;
                list.children("li").addClass(wijCSS.cornerAll);
                split.addClass(css_ribbon + "-" + splitName);
                triggerEle.button({
                    icons: {
                        primary: wijCSS.iconArrowDown
                    },
                    text: false
                }).data("list", list).unbind("click").bind(//update for preventing submit by wuhao at 2011/8/2
                "click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }).bind(//end at 2011/8/2
                "mouseup", function (e) {
                    list = $(this).data("list");
                    if(list.is(":visible")) {
                        self.showList.hide().css("z-index", "");
                        self.showList = null;
                    } else {
                        list.show().position({
                            my: 'left top',
                            at: 'left bottom',
                            of: split
                        }).css("z-index", 9999);
                        self.showList = list;
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
                triggerEle.children("." + wijCSS.buttonText).text("foo");
                split.after(list);
                list.css("position", "absolute").addClass(wijCSS.helperReset + " " + wijCSS.helperClearFix + " " + wijCSS.cornerAll + " " + css_ribbon_dropdown).hide();
                split.buttonset();
                splitObj = {
                    ui: content,
                    defaultValue: content.button("option", "label"),
                    buttons: [],
                    type: "split",
                    trigger: triggerEle,
                    list: list
                };
                $("button, :checkbox, :radio", list).bind("click", function (e) {
                    //var uiButton = $(this);
                    //content.button("option", "label",
                    ///uiButton.button("option", "label"));
                    //content.data("commandName", uiButton.data("commandName"));
                    list.hide().css("z-index", "");
                    self.showList = null;
                    e.preventDefault();
                });
                list.find(">li>button,>li>:radio,>li>:checkbox").each(function (i, button) {
                    var commandName = $(button).data("commandName");
                    if(commandName !== "" && self.buttons[commandName]) {
                        self.buttons[commandName].parent = content;
                        self.buttons[commandName].type = "split";
                    }
                    splitObj.buttons.push($(button));
                });
                if(splitName !== "") {
                    self.listUis[splitName] = splitObj;
                }
            });
        };
        wijribbon.prototype._createDropdwon = function () {
            var self = this, wijCSS = this.options.wijCSS;
            self.dropdownLabels = {
            };
            $.each(self.dropdowns, function (i, dropdown) {
                var list = dropdown.children("ul"), button = dropdown.children("button:eq(0)"), dropdownName = button.data("commandName"), dropdownObj;
                list.children("li").addClass(wijCSS.cornerAll);
                dropdown.addClass(css_ribbon + "-" + dropdownName);
                button.button({
                    icons: {
                        secondary: wijCSS.iconArrowDown
                    }
                }).unbind("click").bind(//update by wuhao 2011/8/1 for preventing submit
                "click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }).bind(//end for preventing submit
                "mouseup", function (e) {
                    if(list.is(":visible")) {
                        self.showList.hide().css("z-index", "");
                        self.showList = null;
                    } else {
                        if(self.showList) {
                            self.showList.hide();
                            self.showList = null;
                        }
                        list.show().position({
                            my: 'left top',
                            at: 'left bottom',
                            of: button
                        }).css("z-index", 9999);
                        self.showList = list;
                        self.isShow = true;
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
                dropdownObj = {
                    ui: button,
                    defaultValue: button.button("option", "label"),
                    buttons: [],
                    type: "dropdown",
                    list: list
                };
                $("button, :checkbox, :radio", list).bind("click", function (e) {
                    var name = $(this).data("commandName"), label, width = button.children("." + wijCSS.buttonText).width();
                    if(!self.dropdownLabels[name]) {
                        self.dropdownLabels[name] = self._getDropdownLabelSubstr($(this).button("option", "label"), button.children("." + wijCSS.buttonText), width);
                    }
                    label = self.dropdownLabels[name];
                    button.button("option", "label", label);
                    button.attr("title", $(this).button("option", "label"));
                    list.hide().css("z-index", "");
                    self.showList = null;
                    e.preventDefault();
                });
                //dropdown.after(list);
                list.css("position", "absolute").addClass(wijCSS.helperReset + " " + wijCSS.helperClearFix + " " + wijCSS.cornerAll + " " + css_ribbon_dropdown).hide();
                dropdown.buttonset();
                list.find(">li>button,>li>:radio,>li>:checkbox").each(function (i, btn) {
                    var commandName = $(btn).data("commandName");
                    if(commandName !== "" && self.buttons[commandName]) {
                        self.buttons[commandName].parent = button;
                        self.buttons[commandName].type = "dropdown";
                    }
                    dropdownObj.buttons.push($(btn));
                });
                // cache a hash to save the dropdown.
                if(dropdownName !== "") {
                    self.listUis[dropdownName] = dropdownObj;
                }
            });
        };
        wijribbon.prototype._createTab = function () {
            var self = this, wijCSS = this.options.wijCSS, element = self.element;
            element.addClass(css_ribbon);
            self.tabEle = element;
            if($(">ul", element).length > 0) {
                element.wijtabs();
                self._createRibbonGroups();
                return true;
            } else {
                element.addClass(css_ribbon + "-simple").addClass(wijCSS.stateDefault).addClass(wijCSS.helperClearFix);
            }
            return false;
        };
        wijribbon.prototype.updateRibbonSize = /** @ignore */
        function () {
            var self = this, groupDropDown, wijCSS = this.options.wijCSS, abbrevgroupContainer;
            self.tabEle.children("div").each(function (i, tabPage) {
                var $tabPage = $(tabPage), isTabVisible = $tabPage.is(":visible"), groups = $tabPage.find(">ul>li"), groupInfos = [], pageWidth;
                pageWidth = $tabPage.width();
                //				if($tabPage.css("display") === "none"){
                //					pageWidth = self.tabEle.width();
                //				}
                //Note: add by wh at 2011/10/30
                if(!isTabVisible) {
                    $tabPage.removeClass(wijCSS.wijtabsHide);
                    pageWidth = $tabPage.width();
                }
                groups.each(function (j, li) {
                    var group = $(li), lblDiv = group.find(">div:last"), text = //text = $.trim(lblDiv.text());
                    lblDiv.attr("displayname") ? lblDiv.attr("displayname") : $.trim(lblDiv.text());
                    //update by wh for refresh 2012/1/9
                    //recover the ribbon to orign
                    groupDropDown = group.children("." + css_ribbon_dropdowngroup);
                    abbrevgroupContainer = group.children("." + css_ribbon_abbrevgroup);
                    if(groupDropDown) {
                        group.addClass(css_ribbon + "-" + text.toLowerCase()).prepend(groupDropDown.children());
                        groupDropDown.remove();
                        if(abbrevgroupContainer) {
                            abbrevgroupContainer.remove();
                        }
                    }
                    //end
                    groupInfos.push({
                        width: group.outerWidth(true),
                        text: text
                    });
                    return this;
                });
                self._adjustRibbonGroupIfNeeded(groups, groupInfos, pageWidth);
                //Note: add by wh at 2011/10/30
                if(!isTabVisible) {
                    $tabPage.addClass(wijCSS.wijtabsHide);
                }
                return this;
            });
            if(self.options.disabled) {
                self._setDisabled(true);
            }
        };
        wijribbon.prototype._createRibbonGroups = function () {
            var self = this, wijCSS = this.options.wijCSS;
            self.tabEle.children("div").each(function (i, tabPage) {
                var $tabPage = $(tabPage), isTabVisible = $tabPage.is(":visible"), groups = $tabPage.find(">ul>li"), groupInfos = [], pageWidth;
                //update for fixed issue 21292 by wh at 2012/5/8
                if($tabPage.data("destroy.tabs")) {
                    $tabPage.remove();
                    return;
                }
                //end
                if(!isTabVisible) {
                    $tabPage.removeClass(wijCSS.wijtabsHide);
                }
                pageWidth = $tabPage.width();
                $tabPage.addClass(css_ribbon_panel);
                $tabPage.find(">ul").addClass(wijCSS.helperReset + " " + wijCSS.helperClearFix + " " + wijCSS.content + " " + wijCSS.cornerAll + " " + css_ribbon_groups);
                groups.each(function (j, li) {
                    var group = $(li), lblDiv = group.find(">div:last"), css = wijCSS.stateDefault + " " + css_ribbon_group, text = //text = $.trim(lblDiv.text());
                    lblDiv.attr("displayname") ? lblDiv.attr("displayname") : $.trim(lblDiv.text());
                    if(lblDiv) {
                        css += " " + css_ribbon + "-" + text.toLowerCase();
                    }
                    group.addClass(css);
                    lblDiv.addClass(css_ribbon_grouplabel).bind("click", function () {
                        return false;
                    });
                    group.wrapInner("<div class = '" + css_ribbon_groupcontent + "'></div>");
                    group.children().bind("mouseover", function () {
                        $(this).addClass(wijCSS.stateHover);
                    }).bind("mouseout", function () {
                        $(this).removeClass(wijCSS.stateHover);
                    });
                    lblDiv.appendTo(group);
                    groupInfos.push({
                        width: group.outerWidth(true),
                        text: text
                    });
                    return this;
                });
                self._originalGroupInfo = groupInfos;
                self._adjustRibbonGroupIfNeeded(groups, groupInfos, pageWidth);
                if(!isTabVisible) {
                    $tabPage.addClass(wijCSS.wijtabsHide);
                }
                return this;
            });
        };
        wijribbon.prototype._adjustRibbonGroupIfNeeded = function (groups, groupInfos, pageWidth) {
            var self = this, i = groups.length - 1, j = 0, iWidth = 0, jWidth = 0, groupDropDown, abbrevgroupContainer, gi;
            for(; i >= 0; i--) {
                jWidth = 0;
                for(j = 0; j < i; j++) {
                    jWidth += groupInfos[j].width;
                }
                if(jWidth + iWidth + groupInfos[i].width <= pageWidth) {
                    //remove the dropdowngroup and add dropdowngroup's children to group
                    groupDropDown = $(groups[i]).children("." + css_ribbon_dropdowngroup);
                    abbrevgroupContainer = $(groups[i]).children("." + css_ribbon_abbrevgroup);
                    if(groupDropDown) {
                        $(groups[i]).addClass(css_ribbon + "-" + groupInfos[i].text.toLowerCase()).prepend(groupDropDown.children());
                        groupDropDown.remove();
                        if(abbrevgroupContainer) {
                            abbrevgroupContainer.remove();
                        }
                        //continue;
                                            }
                } else {
                    gi = groupInfos[i];
                    iWidth += self._createDropDownRibbonGroup(gi.text, groups[i]);
                }
            }
        };
        wijribbon.prototype._createDropDownRibbonGroup = function (text, group) {
            var self = this, grpClass = css_ribbon + "-" + text.toLowerCase(), wijCSS = this.options.wijCSS, $group = $(group).removeClass(grpClass), displayText = $group.find(">div:last").text() || text, $abbrevgrp;
            $group.wrapInner("<div class='" + css_ribbon_dropdowngroup + " " + css_ribbon_group + "'></div>").children().hide().addClass(grpClass).bind("mouseup." + self.widget, function (e) {
                if(self.showDrpDwnGroup !== null) {
                    self.showDrpDwnGroup.hide().css("z-index", "");
                    self.showDrpDwnGroup = null;
                }
            });
            $abbrevgrp = $("<div class='" + css_ribbon_abbrevgroup + "'>" + "<span class='" + css_ribbon_abbrev + text.toLowerCase() + " " + css_ribbon_icon + " " + css_ribbon_abbrevicon + "'></span>" + "<span class='" + css_ribbon_text + "'>" + displayText + "</span>" + "<span class='" + wijCSS.icon + " " + wijCSS.iconArrowDown + " " + css_ribbon_icon + "'></span></div>").appendTo($group).unbind(self.widget).bind("mouseover." + self.widget, function (e) {
                $(this).addClass(wijCSS.stateHover);
            }).bind("mouseout." + self.widget, function (e) {
                $(this).removeClass(wijCSS.stateHover);
            }).bind("click." + self.widget, function (e) {
                var $drpGroup = $(this).siblings("." + css_ribbon_dropdowngroup);
                if($drpGroup.is(":visible")) {
                    $drpGroup.hide().css("z-index", "");
                    self.showDrpDwnGroup = null;
                } else {
                    if(self.showDrpDwnGroup) {
                        self.showDrpDwnGroup.hide().css("z-index", "");
                    }
                    $drpGroup.show().position({
                        my: "left top",
                        at: "left bottom",
                        of: this
                    }).css("z-index", "10000");
                    self.showDrpDwnGroup = $drpGroup;
                    e.stopPropagation();
                }
            });
            return $group.outerWidth(true);
        };
        wijribbon.prototype._hideShowedList = function () {
            var self = this;
            $(document).bind("mouseup", function (e) {
                var target = e.target;
                if(self.showList) {
                    //Note: click the font, dropdown is open
                    //then click the design view(document), there is a error
                    //update by wh at 2011/9/14
                    //if (!$.contains(self.showList.get(0), target)) {
                    if($(target).is(document) || !$.contains(self.showList.get(0), target)) {
                        //end by wh
                        self.showList.hide().css("z-index", "");
                        self.showList = null;
                    }
                }
                if(self.showDrpDwnGroup) {
                    //Note: click the font, dropdown is open
                    //then click the design view(document), there is a error
                    //update by wh at 2011/9/14
                    //if (!$.contains(self.showDrpDwnGroup.get(0), target)) {
                    if($(target).is(document) || !$.contains(self.showDrpDwnGroup.get(0), target)) {
                        //end by wh
                        self.showDrpDwnGroup.hide().css("z-index", "");
                        self.showDrpDwnGroup = null;
                    }
                }
            });
        };
        wijribbon.prototype._buildButtonOption = function (node, type) {
            var text = true, self = this, nodeClass = node.attr("class"), spans, iconClass, iconEle, imagePosition, label, labelEle, name;
            // only icon
            if(nodeClass && nodeClass !== "" && nodeClass !== css_ribbon_bigbutton) {
                iconClass = nodeClass.split(" ")[0];
                node.removeClass(iconClass);
                label = $.trim(node.text());
                if(label === "") {
                    text = false;
                }
            } else {
                if(type === "checkbox" || type === "radio") {
                    if($.trim(node.attr("id")) === "") {
                        return;
                    }
                    labelEle = $("[for='" + node.attr("id") + "']", node.parent());
                    if(!labelEle.is("label")) {
                        return;
                    }
                    nodeClass = labelEle.attr("class");
                    if(nodeClass && nodeClass !== "" && nodeClass !== css_ribbon_bigbutton) {
                        iconClass = nodeClass.split(" ")[0];
                        labelEle.removeClass(iconClass);
                        label = $.trim(labelEle.text());
                        if(label === "") {
                            text = false;
                        }
                    } else {
                        //TODO only text
                        spans = labelEle.children("span,div");
                    }
                } else if(type === "button") {
                    spans = node.children("span,div");
                }
                if(spans) {
                    if(spans.length === 1) {
                        //only image
                        if(spans.eq(0).attr("class") !== "") {
                            iconEle = spans.eq(0);
                            iconClass = iconEle.attr("class");
                            text = false;
                        }
                        // to do only text
                                            } else if(spans.length === 2) {
                        if(spans.eq(0).attr("class")) {
                            iconEle = spans.eq(0);
                            iconClass = iconEle.attr("class");
                            if(iconEle.is("span")) {
                                imagePosition = "left";
                            } else if(iconEle.is("div")) {
                                imagePosition = "top";
                            }
                            label = spans.eq(1).text();
                        }
                        // TODO: Text before image.
                        // TODO: Text above image.
                                            } else {
                        if(type === "button" && $.trim(node.text()) !== "") {
                            label = $.trim(node.text());
                        }
                    }
                }
            }
            if(type === "button") {
                node.empty();
                name = $.trim(node.attr("name"));
                if(name !== "") {
                    node.removeAttr("name");
                }
            } else {
                name = $.trim(labelEle.attr("name"));
                if(name !== "") {
                    labelEle.removeAttr("name");
                }
            }
            if(name !== "") {
                node.data("commandName", name);
                self.buttons[name] = {
                    button: node
                };
            }
            return {
                label: label,
                icons: {
                    primary: iconClass
                },
                position: imagePosition,
                text: text
            };
        };
        wijribbon.prototype._triggerEvent = function (button) {
            var self = this;
            button.bind("click", function (e) {
                if(self.options.disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                var commandName = button.data("commandName"), buttonObj = self.buttons[commandName], obj = {
                    name: undefined,
                    commandName: undefined
                };
                if(buttonObj && buttonObj.parent) {
                    obj.name = buttonObj.parent.data("commandName");
                }
                obj.commandName = commandName;
                self._trigger("click", e, obj);
                // if is button to prevent submit form
                if(button.is("button")) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        };
        wijribbon.prototype._getDropdownLabelSubstr = function (text, label, width) {
            var self = this, length = text.length, start = 0, end = length, mid = Math.floor((start + end) / 2), newLabel = $("<span></span>"), str = text.substr(0, mid), midWidth;
            newLabel.appendTo(label.parent());
            midWidth = self._calculateWidth(str, newLabel);
            while(midWidth !== width && end > start) {
                str = text.substr(0, mid + 1);
                midWidth = self._calculateWidth(str, newLabel);
                if(midWidth > width) {
                    end = mid - 1;
                } else if(midWidth < width) {
                    start = mid + 1;
                }
                mid = Math.floor((start + end) / 2);
            }
            newLabel.remove();
            return str;
        };
        wijribbon.prototype._calculateWidth = function (str, span) {
            span.text(str);
            return span.width();
        };
        wijribbon.prototype.hideDropdown = /** @ignore */
        function (name) {
            var self = this, dropdown = self.listUis[name];
            if(dropdown && dropdown.list) {
                dropdown.list.hide();
            }
        };
        wijribbon.prototype.destroy = /**
        * Remove the functionality completely. This will return the element back to its pre-init state.
        */
        function () {
            if(this.disabledModal) {
                this.disabledModal.remove();
            }
            $.Widget.prototype.destroy.call(this);
        };
        wijribbon.prototype.getDropdownList = /** @ignore */
        function (name) {
            var self = this, dropdown = self.listUis[name], retrunObj = {
            };
            if(dropdown) {
                $.each(dropdown.buttons, function (i, button) {
                    retrunObj[button.data("commandName")] = button.button("option", "label");
                });
            }
            return retrunObj;
        };
        wijribbon.prototype.setButtonDisabled = /** The method sets the chosen button as enabled or disabled according to the command name.
        * @param {string} commandName The name of the command.
        * @param {boolean} disabled The disabled state of the button, true or false.
        */
        function (commandName, disabled) {
            var buttonObj = this.buttons[commandName], wijCSS = this.options.wijCSS, isButtonEle = false, button, splitUi;
            if(buttonObj && buttonObj.button) {
                button = buttonObj.button;
                isButtonEle = button.is("button");
                button.button("option", "disabled", disabled);
                if(isButtonEle) {
                    // when the keypress, the button text will be happen change
                    // For "Save" to "save"
                    if(commandName !== "save") {
                        button.children("." + wijCSS.buttonText).text(commandName);
                    }
                } else {
                    $("[for='" + button.attr("id") + "']", button.parent()).children("." + wijCSS.buttonText).text(commandName);
                }
                splitUi = this.listUis[commandName];
                if(splitUi && splitUi.type === "split") {
                    splitUi.trigger.button("option", "disabled", disabled);
                    splitUi.trigger.children("." + wijCSS.buttonText).text(commandName);
                }
            }
        };
        wijribbon.prototype.setButtonsDisabled = /** The method sets the ribbon buttons as enabled or disabled according to the command name.
        * @param {object} commands An object that contains commands infos that need to change state,
        *               key is command name, value is button disabled state, true or false.
        */
        function (commands) {
            var self = this;
            $.each(commands, function (key, value) {
                self.setButtonDisabled(key, value);
            });
        };
        wijribbon.prototype.setButtonsChecked = /** The method sets sets the buttons as checked or not checked.
        * @param {object} commands An object that contains commands infos that need to change state,
        *               key is command name, value is button checked state, true or false.
        */
        function (commands) {
            var self = this;
            $.each(commands, function (key, value) {
                if($.isPlainObject(value)) {
                    self.setButtonChecked(key, value.checked, value.name);
                } else {
                    self.setButtonChecked(key, value, null);
                }
            });
        };
        wijribbon.prototype.setButtonChecked = /** Sets a ribbon button as checked or not checked.
        * @param {string} commandName The command name of the button.
        * @param {boolean} checked The checked state of the button.
        * @param {string} name The parent name of the button.
        */
        function (commandName, checked, name) {
            var self = this, radios, buttonObj = self.buttons[commandName], wijCSS = this.options.wijCSS, buttonEle, listUi, label;
            if(buttonObj && buttonObj.button) {
                buttonEle = buttonObj.button;
                if(buttonEle.is("button")) {
                    if(checked) {
                        buttonEle.addClass(wijCSS.stateActive);
                    } else {
                        buttonEle.removeClass(wijCSS.stateActive);
                    }
                } else {
                    buttonEle.prop("checked", checked);
                    buttonEle.button("refresh");
                }
                if(buttonObj.parent) {
                    if(buttonObj.type === "dropdown") {
                        // checked
                        if(checked) {
                            if(!self.dropdownLabels[commandName]) {
                                self.dropdownLabels[commandName] = self._getDropdownLabelSubstr(buttonEle.button("option", "label"), buttonObj.parent.children("." + wijCSS.buttonText), buttonObj.parent.children("." + wijCSS.buttonText).width());
                            }
                            label = self.dropdownLabels[commandName];
                            buttonObj.parent.button("option", "label", label);
                            buttonObj.parent.attr("title", buttonEle.button("option", "label"));
                            //add for adding active class at 2011/11/16
                            //TODO: dropdown hasn't unchecked behavior,
                            //so when will remove
                            //the active class
                            //buttonObj.parent.children("." + css_button_text)
                            //.addClass(css_state_active);
                            //update for fixing issue 20268 by wh at 2011/3/7
                            //radios = $(":radio", buttonObj.parent
                            //		.closest("ul"));
                            radios = $(":radio", buttonObj.button.closest("ul"));
                            //end for issue 20268
                            if(radios) {
                                $.each(radios, function () {
                                    self._updateGroupElementTextState(this);
                                });
                            }
                            //end for active class
                                                    }
                        // dropdown hasn't unchecked behavior.
                        //						else {
                        //							// unchecked
                        //							if (!name) {
                        //								name = buttonObj.parent.data("commandName");
                        //							}
                        //							listUi = self.listUis[name];
                        //							if (listUi) {
                        //							listUi.ui.button("option", "label", listUi.defaultValue);
                        //							}
                        //						}
                        //TODO the list button is icon.
                                            }
                    //TODO split
                                    } else {
                    self._addActiveClassToButtonText(buttonEle.button("widget"));
                }
            } else if(name) {
                // handle dropdown
                listUi = self.listUis[name];
                if(listUi) {
                    listUi.ui.button("option", "label", listUi.defaultValue);
                    if(listUi.buttons) {
                        $.each(listUi.buttons, function (i, btn) {
                            btn.prop("checked", false);
                            btn.button("refresh");
                            //add for adding active class at 2011/11/16
                            self._addActiveClassToButtonText(btn.button("widget"));
                            //end for adding active class
                                                    });
                    }
                }
            }
        };
        return wijribbon;
    })(wijmo.wijmoWidget);
    wijmo.wijribbon = wijribbon;    
    var wijribbon_options = (function () {
        function wijribbon_options() {
            /** Selector option for auto self initialization. This option is internal.
            * @ignore
            */
            this.initSelector = ":jqmData(role='wijribbon')";
            /** All CSS classes used in widgets.
            * @ignore
            */
            this.wijCSS = {
                wijtabsHide: "wijmo-wijtabs-hide"
            };
            /** The wijRibbonClick event is a function that is called
            * when the ribbon command button is clicked.
            * @event
            * @dataKey {string} commandName the command name of the button.
            * @dataKey {string} name the parent name of the button which means if the drop down item is clicked,
            *                     then the name specifies the command name of the drop down button.
            */
            this.click = null;
        }
        return wijribbon_options;
    })();    
    ;
    wijribbon.prototype.options = $.extend(true, {
    }, wijmo.wijmoWidget.prototype.options, new wijribbon_options());
    $.wijmo.registerWidget("wijribbon", wijribbon.prototype);
})(wijmo || (wijmo = {}));
