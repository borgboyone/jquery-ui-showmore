# jquery-ui-showmore
Robust and flexible jQuery UI based widget for expanding and collapsing large areas of content via "Show More" and "Show Less" controls.

Extensive features:

- Automatically detects if controls are needed for the content area based on collapsedHeight
- Refresh function available for situations where the content or the sizing of the content area changes
- Built-in safeguards to prevent content bounce on initialization (provided an initial max-height is supplied)
- Initial max-height class provided (ui-showmore-initial)
- Control text customizable via options
- Built-in jQuery UI icon support (solid up and down triangles)
- Accepts collapsed height in pixels, ems, or taken from content max-height
- Callbacks for content expand and collapse
- Gradient fade support via ccs

Usage
---
At a minimum:
```js
    $('#content .article').showmore();
```

With specific options:

```js
    $('#content .article').showmore({
        moreText: 'I want to see more!',
        lessText: 'I\'m done.',
        showIcon: false,
        duration: 400
    });
```

Options
-------
- `moreText`: Text to display for the expand control. (Default: 'Show More')
- `lessText`: Text to display for the collapse control. (Default: 'Show Less')
- `collapsedHeight`: Height of the collapsed content area either as numeric (pixels), px's ('100px'), em's ('6em'), or 'max-height'. (Default: 'max-height')
- `duration`: Time in milliseconds for expand and collapse animation. (Default: 200)
- `showIcon`: Display triangle icons with controls. (Default: true)

Methods
-------
- `refresh`: Examines the content height and determines if the controls are necessary. Maintains the existing expansion state of the controls if they are still required.
- `expand`: Expands the content area if controls are present.
- `collapse`: Collapses the content area if controls are present.
- `isExpanded`: Returns *true* if the content area is expanded, *false* if the content area is collapsed, and *undefined* if controls aren't present.
- `toggle`: Toggles the expanded, collapsed state of the content area if controls are present.
- `destroy`: Removes the showmore visibles and supporting HTML and returns any inline css to its initial state.

A useful example:
```js
    $(window).resize(function() {
        $('#content .article').showmore('refresh');
    });
```

Callbacks
---------
Callbacks receive the jQuery based event and a ui object with keys: `item`, `element` and the event name (either `expanded` or `collapsed`).
- `expand`: Called when the content area is expanded via user interaction
- `collapse`: Called when the content area is collapsed via user interaction

As an example:
```js
    $('#content .article').showmore({
    	expand: function(event, ui) {
                    console.log('I was expanded.');
                },
        collapse: function(event, ui) {
                    console.log('I was collapsed.');
                }
    });
```

CSS
---
CSS is required in order for the showmore functionality to work correctly.  Working CSS is provided as an example and most users will find little, if any, changes necessary.
An initial CSS class is provided (*ui-shomore-initial*) for users to apply to the content area so that the content displays in a collapsed state on page render and also to prevent content bounce on showmore initialization. Inline CSS is also acceptable.  Remember to use *max-height* and not *height* for correct functionality.
Since most users desire a linear fade of the collapsed content leading into the 'Show More' control, the example CSS illustrates the use of this concept.

License
-------
MIT License. Copyright 2015, Anthony Wells.
