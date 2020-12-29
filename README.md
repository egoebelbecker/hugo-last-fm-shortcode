# Hugo Shortcode for Last.fm

## What Is This?

This is a shortcode for adding a widget to your Hugo blog. It will display the current 
(or last) track you scrobbled to [Last.fm.](https://www.last.fm/)

## Installation

1. Get yourself an API key at [Last.fm.](https://secure.last.fm/login?next=/api/account/create)

2. Copy the contents of **layouts/contents/shortcodes** to the same directory in your Hugo source tree.
If you don’t have that directory, create it. 

3. Copy the contents of **static** to the same directory in your Hugo source tree. You probably 
have a static directory, but it might be empty if you haven’t added any static resources yet.

4. Time to add the widget to a page!

## Usage

Here’s the shortcode:

```
{{< nowplaying user="LAST_FM_USER" key="LAST_FM_KEY" >}}
```

You should see a widget like this:





