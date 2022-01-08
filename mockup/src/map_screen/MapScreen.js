
import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

//states geojsons
import vaStateData from '../virginiaState.json'
import mdStateData from '../marylandState.json'
import azStateData from '../arizonaState.json'

//fake districting created to test generated districtings
import fakeMarylandData from '../marylandCreated.json'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

let vaState = JSON.parse(JSON.stringify(vaStateData))
let mdState = JSON.parse(JSON.stringify(mdStateData))
let azState = JSON.parse(JSON.stringify(azStateData))

let mdFakeDistricts = JSON.parse(JSON.stringify(fakeMarylandData))

let activeStates = []
let newDistrictingCount = 0
let newDistrictingColors = ["#0000ff", "#EE82EE", "#ff0000"]


function numberWithCommas(x) {
  let wholeNumber = x.toString().split(".")[0]
  return wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default function MapScreen(props) {
  const mapContainerRef = useRef(null)
  console.log(props.currentState)
  let map = useRef(null)
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-95.8, 36.9],
      zoom: 4.3,
    })
    map.current.on('load', function () {
      map.current.addSource('virginiaState', {
        "type": "geojson",
        "data": vaState
      })

      map.current.addSource('marylandState', {
        "type": "geojson",
        "data": mdState
      })

      map.current.addSource('arizonaState', {
        "type": "geojson",
        "data": azState
      })

      map.current.addSource('fakeMDDistricts', {
        "type": "geojson",
        "data": mdFakeDistricts
      })

      map.current.addLayer({
        'id': 'virginiaState-layer',
        'type': 'fill',
        'source': 'virginiaState',
        'paint': {
          'fill-color': '#ffffff',
          'fill-opacity': 1,
          'fill-outline-color': '#000000'
        },
        'layout': {
          'visibility': 'none'
        }
      })
      map.current.addLayer({
        'id': 'marylandState-layer',
        'type': 'fill',
        'source': 'marylandState',
        'paint': {
          'fill-color': '#ffffff',
          'fill-opacity': 1,
          'fill-outline-color': '#000000'
        },
        'layout': {
          'visibility': 'none'
        }
      })
      map.current.addLayer({
        'id': 'arizonaState-layer',
        'type': 'fill',
        'source': 'arizonaState',
        'paint': {
          'fill-color': '#ffffff',
          'fill-opacity': 1,
          'fill-outline-color': '#000000'
        },
        'layout': {
          'visibility': 'none'
        }
      })

      map.current.addLayer({
        'id': 'fakeMDDistrict-layer',
        'type': 'line',
        'source': 'fakeMDDistricts',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': 'none',
        },
        'paint': {
          'line-color': '#000000',
          'line-width': 1
        }
      })
    })
    // add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    // clean up on unmount
    return () => map.current.remove()
  }, [])

  function showStateMap(stateName) {
    if (stateName === "Maryland") {
      document.getElementById("menu1").style.visibility = "visible"
      document.getElementById("menu2").style.visibility = "hidden"
      document.getElementById("menu3").style.visibility = "hidden"
      map.current.setLayoutProperty('marylandState-layer', 'visibility', 'visible')
      hideStateLayers("Virginia")
      hideStateLayers("Arizona")
    } else if (stateName === "Virginia") {
      document.getElementById("menu1").style.visibility = "hidden"
      document.getElementById("menu2").style.visibility = "visible"
      document.getElementById("menu3").style.visibility = "hidden"
      map.current.setLayoutProperty('virginiaState-layer', 'visibility', 'visible')
      hideStateLayers("Maryland")
      hideStateLayers("Arizona")
    } else if (stateName === "Arizona") {
      document.getElementById("menu1").style.visibility = "hidden"
      document.getElementById("menu2").style.visibility = "hidden"
      document.getElementById("menu3").style.visibility = "visible"
      map.current.setLayoutProperty('arizonaState-layer', 'visibility', 'visible')
      hideStateLayers("Maryland")
      hideStateLayers("Virginia")
    }
  }

  function hideStateLayers(stateName) {
    if (stateName === "Maryland") {
      map.current.setLayoutProperty('marylandState-layer', 'visibility', 'none')
      if (map.current.getSource('mdPrecincts') !== undefined) {
        map.current.setLayoutProperty('marylandPrecincts-layer', 'visibility', 'none')
        map.current.setLayoutProperty('marylandCounties-layer', 'visibility', 'none')
        map.current.setLayoutProperty('marylandDistricts-layer', 'visibility', 'none')
        map.current.setLayoutProperty('marylandPrecincts-outline-layer', 'visibility', 'none')
        map.current.setLayoutProperty('marylandCounties-outline-layer', 'visibility', 'none')
        map.current.setLayoutProperty('marylandDistricts-outline-layer', 'visibility', 'none')
      }
    } else if (stateName === "Virginia") {
      map.current.setLayoutProperty('virginiaState-layer', 'visibility', 'none')
      if (map.current.getSource('vaPrecincts') !== undefined) {
        map.current.setLayoutProperty('virginiaPrecincts-layer', 'visibility', 'none')
        map.current.setLayoutProperty('virginiaCounties-layer', 'visibility', 'none')
        map.current.setLayoutProperty('virginiaDistricts-layer', 'visibility', 'none')
        map.current.setLayoutProperty('virginiaPrecincts-outline-layer', 'visibility', 'none')
        map.current.setLayoutProperty('virginiaCounties-outline-layer', 'visibility', 'none')
        map.current.setLayoutProperty('virginiaDistricts-outline-layer', 'visibility', 'none')
      }
    } else if (stateName === "Arizona") {
      map.current.setLayoutProperty('arizonaState-layer', 'visibility', 'none')
      if (map.current.getSource('azPrecincts') !== undefined) {
        map.current.setLayoutProperty('arizonaPrecincts-layer', 'visibility', 'none')
        map.current.setLayoutProperty('arizonaCounties-layer', 'visibility', 'none')
        map.current.setLayoutProperty('arizonaDistricts-layer', 'visibility', 'none')
        map.current.setLayoutProperty('arizonaPrecincts-outline-layer', 'visibility', 'none')
        map.current.setLayoutProperty('arizonaCounties-outline-layer', 'visibility', 'none')
        map.current.setLayoutProperty('arizonaDistricts-outline-layer', 'visibility', 'none')
      }
    }
  }

  if (props.stateChanged) {
    if (!activeStates.includes(props.currentState)) {
      //create layers for state from geo data
      if (props.currentState === "Maryland" && props.loadingGeo === false) {
        if (map.current.getSource('mdPrecincts') === undefined) {
          map.current.addSource('mdPrecincts', {
            "type": "geojson",
            "data": props.precinctGeo
          })
          map.current.addSource('mdCounties', {
            "type": "geojson",
            "data": props.countyGeo
          })
          map.current.addSource('mdEnacted', {
            "type": "geojson",
            "data": props.enactedDistrictingGeo
          })
          map.current.addLayer({
            'id': 'marylandPrecincts-layer',
            'type': 'fill',
            'source': 'mdPrecincts',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'marylandPrecincts-outline-layer',
            'type': 'line',
            'source': 'mdPrecincts',
            'paint': {
              'line-color': '#909090',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'marylandCounties-layer',
            'type': 'fill',
            'source': 'mdCounties',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'marylandCounties-outline-layer',
            'type': 'line',
            'source': 'mdCounties',
            'paint': {
              'line-color': '#606060',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'marylandDistricts-layer',
            'type': 'fill',
            'source': 'mdEnacted',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'marylandDistricts-outline-layer',
            'type': 'line',
            'source': 'mdEnacted',
            'paint': {
              'line-color': '#000000',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })

          activeStates.push("Maryland")
        }
      } else if (props.currentState === "Virginia" && props.loadingGeo === false) {
        if (map.current.getSource('vaPrecincts') === undefined) {
          map.current.addSource('vaPrecincts', {
            "type": "geojson",
            "data": props.precinctGeo
          })
          map.current.addSource('vaCounties', {
            "type": "geojson",
            "data": props.countyGeo
          })
          map.current.addSource('vaEnacted', {
            "type": "geojson",
            "data": props.enactedDistrictingGeo
          })

          map.current.addLayer({
            'id': 'virginiaPrecincts-layer',
            'type': 'fill',
            'source': 'vaPrecincts',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'virginiaPrecincts-outline-layer',
            'type': 'line',
            'source': 'vaPrecincts',
            'paint': {
              'line-color': '#909090',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'virginiaCounties-layer',
            'type': 'fill',
            'source': 'vaCounties',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'virginiaCounties-outline-layer',
            'type': 'line',
            'source': 'vaCounties',
            'paint': {
              'line-color': '#606060',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'virginiaDistricts-layer',
            'type': 'fill',
            'source': 'vaEnacted',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'virginiaDistricts-outline-layer',
            'type': 'line',
            'source': 'vaEnacted',
            'paint': {
              'line-color': '#000000',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          activeStates.push("Virginia")
        }
      } else if (props.currentState === "Arizona" && props.loadingGeo === false) {
        if (map.current.getSource('azPrecincts') === undefined) {
          map.current.addSource('azPrecincts', {
            "type": "geojson",
            "data": props.precinctGeo
          })
          map.current.addSource('azCounties', {
            "type": "geojson",
            "data": props.countyGeo
          })
          map.current.addSource('azEnacted', {
            "type": "geojson",
            "data": props.enactedDistrictingGeo
          })
          map.current.addLayer({
            'id': 'arizonaPrecincts-layer',
            'type': 'fill',
            'source': 'azPrecincts',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'arizonaPrecincts-outline-layer',
            'type': 'line',
            'source': 'azPrecincts',
            'paint': {
              'line-color': '#909090',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'arizonaCounties-layer',
            'type': 'fill',
            'source': 'azCounties',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'arizonaCounties-outline-layer',
            'type': 'line',
            'source': 'azCounties',
            'paint': {
              'line-color': '#606060',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'arizonaDistricts-layer',
            'type': 'fill',
            'source': 'azEnacted',
            'paint': {
              'fill-color': '#eeeeee',
              'fill-opacity': 0,
              'fill-outline-color': '#000000'
            },
            'layout': {
              'visibility': 'none'
            }
          })
          map.current.addLayer({
            'id': 'arizonaDistricts-outline-layer',
            'type': 'line',
            'source': 'azEnacted',
            'paint': {
              'line-color': '#000000',
              'line-width': 1
            },
            'layout': {
              'visibility': 'none'
            }
          })
          activeStates.push("Arizona")
        }
      }
    }
  }

  let toggleLayers = ['Precincts', 'Counties', 'Districts']


  //ADD in loading a districting from server creating its layers and all that jazz
  if (props.newDistrictingForMap) {
    console.log("Map screen knows geo is incoming")
    let sourceName = newDistrictingCount.toString() + "source"
    if (map.current.getSource(sourceName) !== undefined) {
      map.current.removeLayer(sourceName + '-layer')
      map.current.removeLayer(sourceName + 'outline-layer')
      map.current.removeSource(sourceName)
      if (props.currentState === "Maryland") {
        let layers = document.getElementById('menu1')
        layers.removeChild(layers.lastChild)

      } else if (props.currentState === "Virginia") {
        let layers = document.getElementById('menu2')
        layers.removeChild(layers.lastChild)

      } else if (props.currentState === "Arizona") {
        let layers = document.getElementById('menu3')
        layers.removeChild(layers.lastChild)
      }
    }
    if (map.current.getSource(sourceName) === undefined) {
      map.current.addSource(sourceName, {
        "type": "geojson",
        "data": props.newDistrictingGeometry
      })
      map.current.addLayer({
        'id': sourceName + '-layer',
        'type': 'fill',
        'source': sourceName,
        'paint': {
          'fill-color': '#eeeeee',
          'fill-opacity': 0,
        },
        'layout': {
          'visibility': 'visible'
        }
      })
      map.current.addLayer({
        'id': sourceName + 'outline-layer',
        'type': 'line',
        'source': sourceName,
        'paint': {
          'line-color': newDistrictingColors[newDistrictingCount % 3],
          'line-width': 1
        },
        'layout': {
          'visibility': 'visible'
        }
      })

      map.current.on('click', sourceName + '-layer', function (e) {

          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<p>Number: " + (e.features[0].properties.number) + "</p>" +
              "<div> Compactness: " + (e.features[0].properties.compactness)+ " </div>" +
              "<div> Dev Avg: " + (e.features[0].properties.deviationFromAverage)+ " </div>" +
              "<div> Dev Enacted Area: " + (e.features[0].properties.compactness)+ " </div>" +
              "<div> Dev Enacted Pop: " + (e.features[0].properties.compactness)+ " </div>" +
              "<div> Dev Ideal Pop: " + (e.features[0].properties.compactness)+ " </div>" +
              "<div> Total Pop: " + (e.features[0].properties.totalPop)+ " </div>" +
              "<div> Black Pop: " + (e.features[0].properties.blackPop)+ " </div>" +
              "<div> Asian Pop: " + (e.features[0].properties.asianPop)+ " </div>" +
              "<div> Hispanic Pop: " + (e.features[0].properties.hispanicPop)+ " </div>")
            .addTo(map.current);
      })
      if (props.currentState === "Maryland" && document.getElementById('menu1').childNodes.length < (toggleLayers.length + newDistrictingCount) + 1) {
        console.log("HERE")
        let layers = document.getElementById('menu1')
        let id = "New Districting"
        let link = document.createElement('a')
        link.href = '#'
        link.className = ''
        link.textContent = id
        link.id = id
        link.onclick = function (e) {
          e.preventDefault()
          e.stopPropagation()
          if (map.current.getLayoutProperty(sourceName + 'outline-layer', 'visibility') === "visible") {
            map.current.setLayoutProperty(sourceName + 'outline-layer', 'visibility', 'none')
            map.current.setLayoutProperty(sourceName + '-layer', 'visibility', 'none')
          } else {
            map.current.setLayoutProperty(sourceName + 'outline-layer', 'visibility', 'visible')
            map.current.setLayoutProperty(sourceName + '-layer', 'visibility', 'visible')
          }
        }
        layers.appendChild(link)
      }
      if (props.currentState === "Virginia" && document.getElementById('menu2').childNodes.length < (toggleLayers.length + newDistrictingCount) + 1) {
        console.log("HERE")
        let layers = document.getElementById('menu2')
        let id = "New Districting"
        let link = document.createElement('a')
        link.href = '#'
        link.className = ''
        link.textContent = id
        link.id = id
        link.onclick = function (e) {
          e.preventDefault()
          e.stopPropagation()
          if (map.current.getLayoutProperty(sourceName + 'outline-layer', 'visibility') === "visible") {
            map.current.setLayoutProperty(sourceName + 'outline-layer', 'visibility', 'none')
            map.current.setLayoutProperty(sourceName + '-layer', 'visibility', 'none')
          } else {
            map.current.setLayoutProperty(sourceName + 'outline-layer', 'visibility', 'visible')
            map.current.setLayoutProperty(sourceName + '-layer', 'visibility', 'visible')
          }
        }
        layers.appendChild(link)
      }
      if (props.currentState === "Arizona" && document.getElementById('menu3').childNodes.length < (toggleLayers.length + newDistrictingCount) + 1) {
        console.log("HERE")
        let layers = document.getElementById('menu3')
        let id = "New Districting"
        let link = document.createElement('a')
        link.href = '#'
        link.className = ''
        link.textContent = id
        link.id = id
        link.onclick = function (e) {
          e.preventDefault()
          e.stopPropagation()
          if (map.current.getLayoutProperty(sourceName + 'outline-layer', 'visibility') === "visible") {
            map.current.setLayoutProperty(sourceName + 'outline-layer', 'visibility', 'none')
            map.current.setLayoutProperty(sourceName + '-layer', 'visibility', 'none')
          } else {
            map.current.setLayoutProperty(sourceName + 'outline-layer', 'visibility', 'visible')
            map.current.setLayoutProperty(sourceName + '-layer', 'visibility', 'visible')
          }
        }
        layers.appendChild(link)
      }
    }
  }


  if (props.showFakeMaryland) {
    if (document.getElementById('menu1').childNodes.length < toggleLayers.length + 1) {
      let layers = document.getElementById('menu1')
      let id = "New Districting"
      let link = document.createElement('a')
      link.href = '#'
      link.className = ''
      link.textContent = id
      link.id = id
      link.onclick = function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (map.current.getLayoutProperty('fakeMDDistrict-layer', 'visibility') === "visible") {
          map.current.setLayoutProperty('fakeMDDistrict-layer', 'visibility', 'none')
        } else {
          map.current.setLayoutProperty('fakeMDDistrict-layer', 'visibility', 'visible')
        }
      }
      layers.appendChild(link)
    }
    map.current.flyTo({
      center: [-77.211046, 39.332766],
      zoom: 7.3
    })
  }

  if (props.currentState === "Maryland" && map.current.getSource('mdPrecincts') !== undefined) {
    map.current.on('click', 'marylandPrecincts-layer', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<p>Precinct: " + (e.features[0].properties.NAME) + "</p>" +
          "<div> Total pop: " + numberWithCommas((e.features[0].properties.ADJ_POP)) + " </div>" +
          "<ul> <li> White: " + numberWithCommas((e.features[0].properties.ADJ_WHITE)) + "</li> <li>African American: " + numberWithCommas((e.features[0].properties.ADJ_BLACK)) + "</li> <li>Asian: " + numberWithCommas((e.features[0].properties.ADJ_ASIAN)) + "</li> <li>Hispanic: " + numberWithCommas((e.features[0].properties.UNADJHISP)) + "</li> <ul>")
        .addTo(map.current);
    })
  }
  if (props.currentState === "Virginia" && map.current.getSource('vaPrecincts') !== undefined) {
    map.current.on('click', 'virginiaPrecincts-layer', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<p>Precinct: " + (e.features[0].properties.precinct) + "</p>" +
          "<div> Total pop: " + numberWithCommas((e.features[0].properties.TOTPOP)) + " </div>" +
          "<ul> <li> White: " + numberWithCommas((e.features[0].properties.NH_WHITE)) + "</li> <li>African American: " + numberWithCommas((e.features[0].properties.NH_BLACK)) + "</li> <li>Hispanic: " + numberWithCommas((e.features[0].properties.HISP)) + "</li> <li>Asian: " + numberWithCommas((e.features[0].properties.NH_ASIAN)) + "</li> <ul>")
        .addTo(map.current);
    })
  }
  if (props.currentState === "Arizona" && map.current.getSource('azPrecincts') !== undefined) {
    map.current.on('click', 'arizonaPrecincts-layer', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<p>Precinct: " + (e.features[0].properties.PRECINCT) + "</p>" +
          "<div> Total pop: " + numberWithCommas((e.features[0].properties.TOTPOP)) + " </div>" +
          "<ul> <li> White: " + numberWithCommas((e.features[0].properties.NH_WHITE)) + "</li> <li>Hispanic: " + numberWithCommas((e.features[0].properties.HISP)) + "</li> <li>Native American: " + numberWithCommas((e.features[0].properties.NH_AMIN)) + "</li> <li>Black: " + numberWithCommas((e.features[0].properties.NH_BLACK)) + "</li> <ul>")
        .addTo(map.current);
    })
  }

  //maryland toggle
  if (props.currentState === "Maryland") {
    if (document.getElementById('menu1').childNodes.length < toggleLayers.length) {
      for (let i = 0; i < toggleLayers.length; i++) {
        let id = toggleLayers[i]
        let link = document.createElement('a')
        link.href = '#'
        link.className = ''
        link.textContent = id
        link.id = id

        link.onclick = function (e) {
          let clickedLayer = this.textContent
          e.preventDefault()
          e.stopPropagation()
          if (clickedLayer === 'Precincts') {
            if (map.current.getLayoutProperty('marylandPrecincts-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('marylandPrecincts-layer', 'visibility', 'none')
              map.current.setLayoutProperty('marylandPrecincts-outline-layer', 'visibility', 'none')
            } else {
              map.current.setLayoutProperty('marylandPrecincts-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('marylandPrecincts-outline-layer', 'visibility', 'visible')
            }
          }
          else if (clickedLayer === 'Counties') {
            if (map.current.getLayoutProperty('marylandCounties-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('marylandCounties-layer', 'visibility', 'none')
              map.current.setLayoutProperty('marylandCounties-outline-layer', 'visibility', 'none')
            } else {
              map.current.setLayoutProperty('marylandCounties-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('marylandCounties-outline-layer', 'visibility', 'visible')
            }
          }
          else if (clickedLayer === 'Districts') {
            if (map.current.getLayoutProperty('marylandDistricts-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('marylandDistricts-layer', 'visibility', 'none')
              map.current.setLayoutProperty('marylandDistricts-outline-layer', 'visibility', 'none')
            } else {
              map.current.setLayoutProperty('marylandDistricts-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('marylandDistricts-outline-layer', 'visibility', 'visible')
            }
          }
        }
        let layers = document.getElementById('menu1')
        layers.style.visibility = "hidden"
        layers.appendChild(link)
      }
    }
  }
  //virginia toggle
  if (props.currentState === "Virginia") {
    if (document.getElementById('menu2').childNodes.length < toggleLayers.length) {
      for (let i = 0; i < toggleLayers.length; i++) {
        let id = toggleLayers[i]
        let link = document.createElement('a')
        link.href = '#'
        link.className = ''
        link.textContent = id
        link.id = id

        link.onclick = function (e) {
          let clickedLayer = this.textContent
          e.preventDefault()
          e.stopPropagation()
          if (clickedLayer === 'Precincts') {
            if (map.current.getLayoutProperty('virginiaPrecincts-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('virginiaPrecincts-layer', 'visibility', 'none')
              map.current.setLayoutProperty('virginiaPrecincts-outline-layer', 'visibility', 'none')
            } else {
              map.current.setLayoutProperty('virginiaPrecincts-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('virginiaPrecincts-outline-layer', 'visibility', 'visible')
            }
          }
          else if (clickedLayer === 'Counties') {
            if (map.current.getLayoutProperty('virginiaCounties-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('virginiaCounties-layer', 'visibility', 'none')
              map.current.setLayoutProperty('virginiaCounties-outline-layer', 'visibility', 'none')
            } else {
              map.current.setLayoutProperty('virginiaCounties-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('virginiaCounties-outline-layer', 'visibility', 'visible')
            }
          }
          else if (clickedLayer === 'Districts') {
            if (map.current.getLayoutProperty('virginiaDistricts-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('virginiaDistricts-layer', 'visibility', 'none')
              map.current.setLayoutProperty('virginiaDistricts-outline-layer', 'visibility', 'none')
            } else {
              map.current.setLayoutProperty('virginiaDistricts-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('virginiaDistricts-outline-layer', 'visibility', 'visible')
            }
          }
        }
        let layers = document.getElementById('menu2')
        layers.style.visibility = "hidden"
        layers.appendChild(link)
      }
    }
  }
  //az toggle
  if (props.currentState === "Arizona") {
    if (document.getElementById('menu3').childNodes.length < toggleLayers.length) {
      for (let i = 0; i < toggleLayers.length; i++) {
        let id = toggleLayers[i]
        let link = document.createElement('a')
        link.href = '#'
        link.className = ''
        link.textContent = id
        link.id = id

        link.onclick = function (e) {
          let clickedLayer = this.textContent
          e.preventDefault()
          e.stopPropagation()
          if (clickedLayer === 'Precincts') {
            if (map.current.getLayoutProperty('arizonaPrecincts-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('arizonaPrecincts-layer', 'visibility', 'none')
              map.current.setLayoutProperty('arizonaPrecincts-outline-layer', 'visibility', 'none')

            } else {
              map.current.setLayoutProperty('arizonaPrecincts-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('arizonaPrecincts-outline-layer', 'visibility', 'visible')

            }
          }
          else if (clickedLayer === 'Counties') {
            if (map.current.getLayoutProperty('arizonaCounties-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('arizonaCounties-layer', 'visibility', 'none')
              map.current.setLayoutProperty('arizonaCounties-outline-layer', 'visibility', 'none')

            } else {
              map.current.setLayoutProperty('arizonaCounties-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('arizonaCounties-outline-layer', 'visibility', 'visible')

            }
          }
          else if (clickedLayer === 'Districts') {
            if (map.current.getLayoutProperty('arizonaDistricts-layer', 'visibility') === "visible") {
              map.current.setLayoutProperty('arizonaDistricts-layer', 'visibility', 'none')
              map.current.setLayoutProperty('arizonaDistricts-outline-layer', 'visibility', 'none')
            } else {
              map.current.setLayoutProperty('arizonaDistricts-layer', 'visibility', 'visible')
              map.current.setLayoutProperty('arizonaDistricts-outline-layer', 'visibility', 'visible')
            }
          }
        }
        let layers = document.getElementById('menu3')
        layers.style.visibility = "hidden"
        layers.appendChild(link)
      }
    }
  }

  if (props.currentState === 'Maryland') {
    map.current.flyTo({
      center: [-77.211046, 39.332766],
      zoom: 7.3
    })
    showStateMap("Maryland")

  }
  else if (props.currentState === 'Virginia') {
    map.current.flyTo({
      center: [-79.567743, 37.256465],
      zoom: 6.5
    })
    showStateMap("Virginia")
  }
  else if (props.currentState === 'Arizona') {
    map.current.flyTo({
      center: [-111.2, 34.29],
      zoom: 6.3
    })
    showStateMap("Arizona")
  }
  return (
    <div>
      <div id="map" className="map-container" ref={mapContainerRef} />
      <nav id="menu1"></nav>
      <nav id="menu2"></nav>
      <nav id="menu3"></nav>
    </div>
  )
}