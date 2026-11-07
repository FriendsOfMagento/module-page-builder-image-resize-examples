# Friends of Magento Page Builder Image Resize Examples

Adds [image resize](https://github.com/FriendsOfMagento/module-page-builder-image-resize) support to two content types from the official [Page Builder examples](https://github.com/commerce-docs/pagebuilder-examples):

| Example module | Content type | Image | What this module adds |
|---|---|---|---|
| `FAQ_Custom` | FAQ Item | Its own `<img>` uploader | A content type file, the form fields, and a fix for the example's admin preview |
| `Quote_Custom` | Quote | Page Builder background images | A fix for the example's form name. Resize support is added automatically. |

Read it together with [Add resize support to a content type](https://github.com/FriendsOfMagento/module-page-builder-image-resize/blob/main/docs/extending.md).

## Compatibility

- **Magento Open Source / Adobe Commerce:** 2.4.7 or later, tested on 2.4.8-p5
- **Mage-OS:** 3.x and 4.x, not tested
- **PHP:** 8.1 or later

It follows the [image resize module](https://github.com/FriendsOfMagento/module-page-builder-image-resize#compatibility), which Composer installs with it. Other versions aren't tested and are installed at your own risk.

## Install

The example modules are not Composer packages for current PHP versions, and their licence does not allow copying them here, so install them from their repository first:

```bash
git clone https://github.com/commerce-docs/pagebuilder-examples.git
cd app/code
ln -s ../../pagebuilder-examples/FAQ
ln -s ../../pagebuilder-examples/Quote
```

Then install this module and run:

```bash
bin/magento module:enable FAQ_Custom Quote_Custom Fom_PageBuilderImageResizeExamples
bin/magento setup:upgrade
bin/magento cache:flush
```

## FAQ Item

The FAQ Item renders its image as one `<img>`, so it gets one **Resize Image** checkbox under the uploader:

- `view/adminhtml/pagebuilder/content_type/faq_item.xml` adds the `image_resize_desktop` attribute to the `image` element, and its converter.
- `view/adminhtml/ui_component/pagebuilder_faq_item_form.xml` puts the image at sort order 30 in the `general` fieldset, and the resize fields at 31 to 34.

The FAQ Item has no separate mobile image. Phones get the same resized file.

The FAQ example starts an accordion on its admin preview. In the admin, the accordion is built on the backend tabs widget, which takes the Page Builder option menu of the first FAQ item as its tab list and loads its links by AJAX. The admin redirects that request to the dashboard, and the injected dashboard page breaks RequireJS on the edit page (`require is not a function`). The mixin `view/adminhtml/web/js/content-type/faq/preview-mixin.js` turns the accordion off in the Page Builder stage. The storefront accordion is not changed.

## Quote

The Quote form extends `pagebuilder_base_form_with_background_video`, and the content type stores its images in `data-background-images`. The image resize module finds both and adds the settings itself:

- **Resize Image** under Background Image
- **Resize Mobile Image** under Mobile Image

The form also inherits the video background fields, including **Resize Image** under Fallback Image. The Quote content type does not save video settings, so these fields have no effect there.

The Quote example asks for the form `pagebuilder_Quote_Custom_form`, but its form and layout files are named `pagebuilder_custom_quote_form.xml`, so its edit form does not open. This module adds both names as aliases:

- `view/adminhtml/ui_component/pagebuilder_Quote_Custom_form.xml` extends the example's form.
- `view/adminhtml/layout/pagebuilder_Quote_Custom_form.xml` loads the example's layout handle.
