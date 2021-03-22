import React, {useEffect, setState, useRef} from 'react'
import { loadModules } from 'esri-loader';
import requests from '../data/geojson.json'

let key = process.env.NEXT_PUBLIC_ESRI_API_KEY

export default function Map() {
    const mapEl = useRef(null)
    
    const loadMap = () =>loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/GeoJSONLayer",
        "esri/widgets/Locate",
        "esri/widgets/Track",
        "esri/Graphic",
        "esri/widgets/Legend"
    ], {css: true})
    .then(function ([esriConfig, Map, MapView, GeoJSONLayer, Locate, Track, Graphic, Legend]){
                esriConfig.apiKey = key
        
                const requestBlob = new Blob([JSON.stringify(requests)], {type: "application/json"});
                const url = URL.createObjectURL(requestBlob);

                console.log(url)

                const requestResults = new GeoJSONLayer({
                        url: url,
                })

                // requestResults.renderer = electionRender

                const map = new Map({
                        basemap: "arcgis-light-gray", // Basemap layer service
                        layers: [requestResults]
                    });


                const view = new MapView({
                    container: mapEl.current,
                    map: map,
                    center: [-90.20, 38.65],
                    zoom: 11,
                    popup:{
                        dockEnabled: true,
                        dockOptions:{
                            breakpoint: false,
                            buttonEnabled: false,
                            position:'bottom-left'
                        }
                    }
                });
                
                const locate = new Locate({
                    view: view,
                    useHeadingEnabled: false,
                    goToOverride: function(view, options) {
                      options.target.scale = 1500;
                      return view.goTo(options.target);
                    }
                });
                const track = new Track({
                    view: view,
                    graphic: new Graphic({
                      symbol: {
                        type: "simple-marker",
                        size: "12px",
                        color: "green",
                        outline: {
                          color: "#efefef",
                          width: "1.5px"
                        }
                      }
                    }),
                    useHeadingEnabled: false
                  });

                var legend = new Legend({
                    view: view,
                    layerInfos: [{
                        layer: requestResults,
                        title: "Legend"
                    }]
                });

                view.ui.add(legend, "bottom-right");
                view.ui.add(locate, "top-left"); 

                    
            })
    
    useEffect(() => {
        loadMap()
        
    }, [])

    return (
        <div id='stl311map' style={{ height: '100vh', width: '100%' }} ref={mapEl} />
    )
}
