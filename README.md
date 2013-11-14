MapReplace
==========

A Google Chrome Extension that will replace Google Maps with other mapping services on any web site.

Map Replace let you replace Google Maps with maps from the Norwegian Mapping Authority, Finn.no (Norway) or Open Street Map. This Chrome Extension works on any web site that uses Google Maps, like Strava.com, Runkeeper.com and Movescount.com.

The benefit of replacing Google Maps with other map providers is that they might provide better maps for certain areas. For example, the maps from the Norwegian Mapping Authority provides superior maps over Norway.

## Contributing

Add other maps and layers by sending a pull request to this repository.
By following the schema design in the ```js/interceptors.js``` file, the layers will get appended to the extension popup.

## Developing

There are no external dependencies for this project, just clone the repo and develop.

```
git clone https://github.com/follesoe/MapReplace/
```

### Running the extension to Chrome

Navigate to ```chrome://extensions/``` in Google Chrome, check the ```Developer mode``` options in the top right hand corner.
Press the ```Load unpacked extension...``` and select the project root folder.


## Contributors

* Jonas Follesø [@follesoe](https://twitter.com/follesoe)
* Mikael Brevik [@mikaelbrevik](https://twitter.com/mikaelbrevik)

### Icon design

Icon is made by Hege Røkenes


## License
MIT: [http://rem.mit-license.org](http://rem.mit-license.org)

The map providers can have different license. This extension does not store or have any official affiliation with any of the map providers. The map data is only requested by the clients them self.