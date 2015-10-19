(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

/*!
 * jQuery UI ShowMore 1.0.0
 * https://github.com/borgboyone/jquery-ui-showmore
 *
 * Copyright 2015 Anthony Wells
 * Released under the MIT license.
 * https://raw.githubusercontent.com/borgboyone/jquery-ui-showmore/master/LICENSE
 *
 * http://borgboyone.github.io/jquery-ui-showmore/
 */

var showmore = $.widget('aw.showmore', {
	options: {
		moreText: "Show More",
		lessText: "Show Less",
		collapsedHeight: 200,
		duration: 200, // possibly animate
		expand: undefined,
		collapse: undefined,
		showIcon: true
	},
	_create: function() {
		this._super();
		var $element = $(this.element),
			curDisplay = $element.css('display'),
			initialHeight = curDisplay !== 'none' ? $element.outerHeight() : this.options.collapsedHeight;
		var wrapper = this.wrapper = $element.wrap('<div class="ui-showmore-wrapper" style="height:' + initialHeight + 'px;" aria-collapsible="true"></div>').parent().uniqueId()
			.append('<div class="ui-showmore-more" style="display: none;" aria-controls="' + $element.parent().prop('id') + '"><span>' + (this.options.showIcon ? '<span class="ui-icon ui-icon-triangle-1-s ui-showmore-icon"></span>' : '') + '<span>' + this.options.moreText + '</span></span></div>')
			.append('<div class="ui-showmore-less" style="display: none;" aria-controls="' + $element.parent().prop('id') + '"><span>' + (this.options.showIcon ? '<span class="ui-icon ui-icon-triangle-1-n ui-showmore-icon"></span>' : '') + '<span>' + this.options.lessText + '</span></span></div>');
		this._on(wrapper.find('.ui-showmore-more > span'), {'click': this._expand});
		this._on(wrapper.find('.ui-showmore-less > span'), {'click': this._collapse});
		// we can now safely clear max-height and/or display none on this.element, but save old values if present in a style tag
		var elementStyles = $element.prop('style');
		this.originalStyles = {};
		this.originalStyles.maxHeight = elementStyles.maxHeight;
		$element.css('max-height', 'none');
		if (curDisplay === 'none') {
			this.originalStyles.display = elementStyles.display;
			$element.css('display', 'block');
		}

		this.isExpanded = undefined;
		this.refresh();
	},
	_destroy: function() {
		// do this without div flicker
		$(this.element).css('max-height', typeof this.originalStyles.maxHeight !== 'undefined' ? this.originalStyles.maxHeight : '');
		if ('display' in this.originalStyles)
			$(this.element).css('display', typeof this.originalStyles.display !== 'undefined' ? this.originalStyles.display : '');
		this.element.siblings().remove().unwrap();
		this._super();
	},
	expand: function() {
		if ((typeof this.isExpanded !== 'undefined') && !this.isExpanded)
			this._expand();
	},
	_expand: function(event) {
        var height = $(this.element).outerHeight() + this.wrapper.find('.ui-showmore-less').outerHeight();
        this.wrapper.animate({height: height}, this.options.duration);
        this.wrapper.attr('aria-expanded', 'true');
        this.isExpanded = true;
        $('.ui-showmore-more').hide();
        $('.ui-showmore-less').show();

		if (event) this._trigger('expand', event, {});
	},
	collapse: function() {
		if ((typeof this.isExpanded !== 'undefined') && this.isExpanded)
			this._collapse();
	},
	_collapse: function(event) {
		var height = this.options.collapsedHeight;
        this.wrapper.animate({height: height}, this.options.duration);
        this.wrapper.attr('aria-expanded', 'false');
        this.isExpanded = false;
        $('.ui-showmore-less').hide();
        $('.ui-showmore-more').show();

		if (event) this._trigger('collapse', event, {});
	},
	// in case content has changed
	refresh: function() {
		// if not needed, adjust height, hide clickables
		if ($(this.element).outerHeight() <= this.options.collapsedHeight) {
			this.wrapper.find('.ui-showmore-less').hide();
			this.wrapper.find('.ui-showmore-more').hide();
			this.wrapper.removeAttr('aria-expanded');
			this.wrapper.outerHeight($(this.element).outerHeight()); // 'auto' is also acceptable
			this.isExpanded = undefined;
		} else {
			if ((typeof this.isExpanded !== 'undefined') && this.isExpanded) {
				this._expand();
			} else {
				this._collapse();
			}
		}
	},
	isExpanded: function() {
		return this.isExpanded;
	},
	toggle: function() {
		if (typeof this.isExpanded !== 'undefined') {
			this.isExpanded ? this._collapse() : this._expand();
		}
	}
});

}));
