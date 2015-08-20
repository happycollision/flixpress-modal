# Flixpress Modal Box

> jQuery plugin for Flixpress.com's modal boxes.


## Getting Started

(This is a jQuery plugin. It also requires jQuery UI's Slide effect.)

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/happycollision/jquery-flixpress-modal/master/dist/flixpress-modal.min.js
[max]: https://raw.githubusercontent.com/happycollision/jquery-flixpress-modal/master/dist/flixpress-modal.js

In your web page `<head>`, do something like this:

```html

<link rel="stylesheet" type="text/css" href="flixpress-modal.css">
```
In your web page footer, do something like this:

```html

<script src="jquery.js"></script>
<script src="jquery-ui/ui/core.js"></script>
<script src="jquery-ui/ui/effect.js"></script>
<script src="jquery-ui/ui/effect-slide.js"></script>

<script src="flixpress-modal.js"></script>
<script>
  jQuery(function ($) {
    $.flixpressModal();
  });
</script>
```

## Usage and Options

Calling a modal box from an element click can be accomplished two ways by default. You can simply give an element a class name of `modal` or you can target an element with jQuery and call the plugin's collection method on it. So both of the follwoing examples will have the same effect:

```html
<div class="modal some-button-thing">Push me</div>
```

```html
<div class="some-button-thing">Push me</div>
<script>
  $('.some-button-thing').flixpressModal();
</script>
```

In each case, however, no content will be found and the modal box will say as much. We must also dsignate content to appear in the box for each element. This can be done in several ways.

__Directly on the element__: Sometimes, you will want to populate your content with javascript or you will have comparatively simple content to display. In this case, you can use the `data` attribute and store a value for `modal-content`. Here is one example in plain HTML and one using jQuery:

```html
<div class="modal some-button-thing" data-modal-content="Surprise!">Push me</div>
```

```html
<div class="modal some-button-thing">Push me</div>
<script>
  $('.some-button-thing').data('modal-content','Surprise!');
</script>
```

NOTE: All methods of populating content in the modal boxes involve the data attribute. From now on, I'll assume you won't need the jQuery version in examples.

__In another web page__: Flixpress Modal will automatically create an iframe with a web address if you use `data-modal-content-address` as your key and a valid url (absolute or relative) as your value.

```html
<div class="modal some-button-thing" data-modal-content-address="another-page.html">Push me</div>
```

NOTE: Cross site loading will require all the [usual credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

__In another element__: You can use another element on the page (visible or not) to store your content. Just give it a unique class name and reference that class name in the clicked element's `data-modal-content-name` attribute.

```html
<div class="modal some-button-thing" data-modal-content-name="hidden-content">Push me</div>
<div class="hidden-content">The content that is hidden...</div>
```

### Options

The static method is used to invoke the default options, or set new ones using a javascript object.

```javascript
$.flixpressModal(options);
```

#### classNamePrefix

Type: `string`  
Default: `'flixpress-modal-'`

Prefixes all class names for elements created by the plugin.

#### toolbarImageSrc

Type: `string`  
Default: `''`

URL for the image to be displayed in the toolbar.

#### preferredSize

Type: `string` possible values: `'partial', 'full'`  
Default: `'partial'`

Defines the default size for the modal box when invoked without a size override.

#### alternateSizeClassName

Type: `string`  
Default: `'full-modal'`

Defines the class name that will inverse the `preferredSize` behavior. Considering these last two options' default values (and an automatic run on the `modal` class), `<div class="modal"></div>` will open a partial modal while `<div class="modal full-modal"></div>` will open a full-sized modal box.

#### partialModalProperties

Type: `Object`|`Boolean:false`  
Default: `false`

Optionally passes an object in to alter the default sizing of the partial modal. As of now, the object may only contain 2 possible key/value pairs: `percentHeight` and `percentWidth`. The values for each must be numbers.

```javascript
var options = {
  percentHeight: 80,
  percentwidth: 80
};

$.flixpressModal({partialModalProperties: options});
```

The code above mimics the default behavior of the initial size of any partial modal that is invoked.

#### automaticRunClassName

Type: `string`  
Default: `'modal'`

Defines the class name that Flixpress Modal will use to autmatically assign modal functionality. All examples in this document assume the default.

### Resizing

The modal boxes may be resized on the fly using the `flixpressModalSizeChange()` method. It is assigned to the global namespace.

After a modal box is invoked, simply call `flixpressModalSizeChange()` and pass in the same options that you would use for `partialModalProperties` above. Right now, only `perecntHeight` and `percentWidth` are supported.

## Changelog

1.0.0: Spun off from [original location](http://github.com/happycollision/flixpress-static-prjects)

## License

MIT © Don Denton
