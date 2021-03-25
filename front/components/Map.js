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


                var requestRenderer = {
                    type: "unique-value",  // autocasts as new UniqueValueRenderer()
                    field: "STATUS",
                    uniqueValueInfos: [{
                      // All features with value of "North" will be blue
                      value: "OPEN",
                      symbol: {
                        type: "simple-marker",  // autocasts as new SimpleFillSymbol()
                        color: "green",
                        size: 5
                      }
                    }, {
                      // All features with value of "East" will be green
                      value: "CLOSED",
                      symbol: {
                        type: "simple-marker",  // autocasts as new SimpleFillSymbol()
                        color: "orange",
                        size: 5
                      }
                    }]
                  };

                const requestResults = new GeoJSONLayer({
                        url: url,
                        renderer: requestRenderer,
                        outfields: ["*"],
                        popupTemplate: {
                            title: "Open311 Status",
                            content: [
                                {
                                    type: "fields",
                                    fieldInfos: [
                                        {
                                            fieldName: "STATUS",
                                            visible: true,
                                            label: "Status",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},
                                        {
                                            fieldName: "DESCRIPTION",
                                            visible: true,
                                            label: "Description",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},
                                        {
                                            fieldName: "REQUESTED_DATETIME",
                                            visible: true,
                                            label: "Request Date",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},  
                                        {
                                            fieldName: "DESCRIPTION",
                                            visible: true,
                                            label: "Description",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},   
                                        {
                                            fieldName: "ADDRESS",
                                            visible: true,
                                            label: "Address",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},   
                                        {
                                            fieldName: "ZIPCODE",
                                            visible: true,
                                            label: "Zip Code",
                                            format: {
                                              places: 0,
                                              digitSeparator: false
                                        }},   
                                        {
                                            fieldName: "AGENCY_RESPONSIBLE",
                                            visible: true,
                                            label: "Assigned Agency",
                                            format: {
                                              places: 0,
                                              digitSeparator: false
                                        }},   
                                        {
                                            fieldName: "SERVICE_NOTICE",
                                            visible: true,
                                            label: "Full Description",
                                            format: {
                                              places: 0,
                                              digitSeparator: false
                                        }},   
                                        {
                                            fieldName: "STREETVIEW",
                                            visible: true,
                                            label: "Streetview",
                                            format: {
                                              places: 0,
                                              digitSeparator: false
                                        }},   
                                        {
                                            fieldName: "DIRECTIONS",
                                            visible: true,
                                            label: "Directions",
                                            format: {
                                              places: 0,
                                              digitSeparator: false
                                        }},   
                                        
                                        
                                    ]
                                },
                            ]
                            }
                });

                const neighborhoods = new GeoJSONLayer({
                    url: 'https://raw.githubusercontent.com/AvidDabbler/STL-GeoJson-Data/main/Neighborhood_Boundaries.json',
                    renderer: {
                        type: "simple",
                        symbol: {
                            type: "simple-fill",
                            color: [0,0,0,0],
                            outline: {
                                width: 1,
                                color: 'black',
                                style: 'dot'
                            }
                        }
                      }
                })
                  


                // requestResults.renderer = electionRender

                const map = new Map({
                        basemap: "arcgis-light-gray", // Basemap layer service
                        layers: [
                            neighborhoods,
                            requestResults, 
                        ]
                    });


                const view = new MapView({
                    container: mapEl.current,
                    map: map,
                    center: [-90.27, 38.65],
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
                
                var legend = new Legend({
                    view: view,
                    layerInfos: [{
                        layer: requestResults,
                        title: "Legend"
                    }]
                });

                view.ui.add(legend, "top-right");
                view.ui.add(locate, "top-left"); 

                    
            })
    
    useEffect(() => {
        loadMap()
        
    }, [])

    return (
        <div id='stl311map' style={{ height: '100vh', width: '100%' }} ref={mapEl} />
    )
}
