import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { setDefaultOptions, loadModules } from 'esri-loader';
import esri = __esri;
import {AppUser} from "../../../models/appUser";
import {DataService} from "../../../services/data.service";
import {pipe} from "rxjs"; // Esri TypeScript Types

function logOut() {
  // delete user's session
  sessionStorage.removeItem("user");

  // redirect user to login page
  window.location.replace("app.loginForm.html");
}
@Component({
  selector: "app-basemap",
  templateUrl: "./app-client.basemap.html",
  styleUrls: ['./app-client.basemap.css']
})
export class AppClientBasemap implements OnInit, OnDestroy {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl!: ElementRef;

  // register Dojo AMD dependencies
  _Map;
  _MapView;
  _FeatureLayer;
  _Graphic;
  _GraphicsLayer;
  _Route;
  _RouteParameters;
  _FeatureSet;
  _Point;
  _locator;

  // Instances
  map: esri.Map;
  view: esri.MapView;
  pointGraphic: esri.Graphic;
  graphicsLayer: esri.GraphicsLayer;

  // Attributes
  zoom = 11.2;
  center: Array<number> = [26.115875, 44.439322];
  loaded = false;
  pointCoords: number[] = [26.115875, 44.439322];
  dir: number = 0;
  count: number = 0;
  timeoutHandler = null;
  basemap = null;
  storehouseLayer: __esri.FeatureLayer;
  easydropLayer: __esri.FeatureLayer;
  selected_store = "";

  altex_products_urls = ["../../../../assets/products/ALTEX/applewatch.jpg",
    "../../../../assets/products/ALTEX/aspirator.jpg",
    "../../../../assets/products/ALTEX/mixer bosh.jpg",
    "../../../../assets/products/ALTEX/sony-a7-IV.jpg",
    "../../../../assets/products/ALTEX/Uscator rufe.jpg"
  ];

  client: AppUser = new AppUser("N/A", "N/A", "N/A", "N/A",
    "N/A");

  constructor(private dataService: DataService) { }

  // @ts-ignore
  async initializeMap() {
    try {
      // configure esri-loader to use version x from the ArcGIS CDN
      // setDefaultOptions({ version: '3.3.0', css: true });
      setDefaultOptions({ css: true });

      // Load the modules for the ArcGIS API for JavaScript
      const [esriConfig, Map, MapView, FeatureLayer, Graphic, Point, GraphicsLayer, route, RouteParameters, FeatureSet,
        Basemap, VectorTileLayer, Locate, Search] = await loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/layers/GraphicsLayer",
        "esri/rest/route",
        "esri/rest/support/RouteParameters",
        "esri/rest/support/FeatureSet",
        "esri/Basemap",
        "esri/layers/VectorTileLayer",
        "esri/widgets/Locate",
        "esri/widgets/Search"
      ]);

      esriConfig.apiKey = "AAPK9c35c4e723f74349b3a567f912c4f830Geg15YP_3y6EW9M1hKGNnErJ-gakUO6tZJZzz0DrMxJhHFU8IAOc5JwTdjGjQon-";

      this._Map = Map;
      this._MapView = MapView;
      this._FeatureLayer = FeatureLayer;
      this._Graphic = Graphic;
      this._GraphicsLayer = GraphicsLayer;
      this._Route = route;
      this._RouteParameters = RouteParameters;
      this._FeatureSet = FeatureSet;
      this._Point = Point;

      this.basemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            portalItem: {
              id: "031b3b2b4d46485fb51e159e0d98d5c6"
            }
          })
        ]
      });

      // Configure the Map
      const mapProperties = {
        basemap: this.basemap
      };

      this.map = new Map(mapProperties);

      this.addFeatureLayers();
      this.addPoint(this.pointCoords[1], this.pointCoords[0]);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this.center,
        zoom: this.zoom,
        map: this.map
      };

      this.view = new MapView(mapViewProperties);

      // Initialize the geolocation
      const locate = new Locate({
        view: this.view,
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
          options.target.scale = 1500;
          return view.goTo(options.target);
        }
      });

      this.view.ui.add(locate, "top-left");

      // Initialize search engine
      const search = new Search({  //Add Search widget
        view: this.view
      });

      this.view.ui.add(search, "top-right")

      // Fires `pointer-move` event when user clicks on "Shift"
      // key and moves the pointer on the view.
      this.view.on('pointer-move', ["Shift"], (event) => {
        let point = this.view.toMap({ x: event.x, y: event.y });
        console.log("map moved: ", point.longitude, point.latitude);
      });

      await this.view.when(); // wait for map to load
      console.log("ArcGIS map loaded");
      // this.addRouter();
      console.log(this.view.center);
      return this.view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  resetBasemap() {
    this.center= [26.115875, 44.439322];
    this.pointCoords = [26.115875, 44.439322];
  }

  addFeatureLayers() {
    // Storehouse_logos
    var render_logos = {
      type: "unique-value",
      field: "sellerName",
      uniqueValueInfos: [
        {
          value: "ALTEX",
          symbol: {
            type: "picture-marker",
            url: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/a52aca1c0be0434b85241f715640b32b/data",
            width: "26px",
            height: "26px"
          }
        },
        {
          value: "FLANCO",
          symbol: {
            type: "picture-marker",
            url: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/f4195c24cc054a72ac1a8e636641862e/data",
            width: "26px",
            height: "26px"
          }
        },
        {
          value: "EMAG",
          symbol: {
            type: "picture-marker",
            url: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/1dc4c883299e48c2bc7c974602a54202/data",
            width: "26px",
            height: "26px"
          }
        },
        {
          value: "STORE",
          symbol: {
            type: "picture-marker",
            url: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/3f7c3d1dd2cf400e93d75d8943ec55bf/data",
            width: "26px",
            height: "26px"
          }
        }
      ]
    }

    // Storehouse Layer
    this.storehouseLayer = new this._FeatureLayer({
      url: "https://services5.arcgis.com/ObTnNYKRHBBDNxkd/arcgis/rest/services/storehouselayer/FeatureServer/0",
      renderer: render_logos,
      outFields: ["*"],
      popupTemplate: {
        title: "{storehouseName}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "storehouseAddress",
                visible: true,
                label: "Address"
              },
              {
                fieldName: "sellerName",
                visible: true,
                label: "Seller"
              }
            ]
          },
          {
            type: "media",
            mediaInfos: [
              {
                value: {
                  sourceURL: "{imgURL}"
                }
              }
            ]
          },
          {
            type: "media",
            mediaInfos: [
              {
                value: {
                  sourceURL: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/be2273b6193e4e26a03ced3cfac78872/data"
                },
                caption: "<b>Description: </b>The latest Apple Watch will measure your pulse, help you respond to messages faster," +
                  "track your hearbeat and many others<br><br><b>Price: </b>1599 RON"
              }
            ],
            title: "Applewatch Series 8",
          },
          {
            type: "media",
            mediaInfos: [
              {
                value: {
                  sourceURL: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/50844d64531d421289d699e30eb4d058/data"
                },
                caption: "<b>Description: </b>The Samsung Galaxy S22 will help you take the best photos, play best mobile games," +
                  "and help you stay organized<br><br><b>Price: </b>3999 RON"
              }
            ],
            title: "Samsung Galaxy S22"
          },
          {
            type: "media",
            mediaInfos: [
              {
                value: {
                  sourceURL: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/5ac58ca82c3949da92938c5db84f5d0d/data"
                },
                caption: "<b>Description: </b>The perfect multi purpose mixer that is a must have for every home cook" +
                  "<br><br><b>Price: </b>159 RON"
              }
            ],
            title: "Bosh Mixer"
          },
          {
            type: "media",
            mediaInfos: [
              {
                value: {
                  sourceURL: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/34db570c8f704fad82dbc5158665c09f/data"
                },
                caption: "<b>Description: </b>A state of the art mirrorless camera, that will make you take the perfect shots" +
                  "<br><br><b>Price: </b> 6999 RON"
              }
            ],
            title: "Sony A7 IV"
          },
          {
            type: "media",
            mediaInfos: [
              {
                value: {
                  sourceURL: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/13dd446ebab748f49e8627ec6f6cc434/data"
                },
                caption: "<b>Description: </b>The samsung clothes dryer is ergonomic, has good power consumtion and has 12 drying programes" +
                  "<br><br><b>Price: </b> 2789 RON"
              }
            ],
            title: "Samsung Clothes Dryer"
          }
        ]
      }
    })

    this.map.add(this.storehouseLayer, 0);

    // EasyDrop render
    let easydrop_render = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "https://andpskir6jjwuens.maps.arcgis.com/sharing/rest/content/items/508cf4dce7e945b3a321595fb48aeca1/data",
        width: "32px",
        height: "32px"
      }
    }

    this.easydropLayer = new this._FeatureLayer({
        url: "https://services5.arcgis.com/ObTnNYKRHBBDNxkd/arcgis/rest/services/easydrop/FeatureServer/0",
        renderer: easydrop_render,
        outFields: ["*"],
        popupTemplate: {
          title: "{name}",
          content: [{
            type: "fields",
            fieldInfos: [
              {
                fieldName: "id",
                visible: true,
                label: "Id"
              },
              {
                fieldName: "address",
                visible: true,
                label: "Address"
              }]
          }]
        }
      })

    this.map.add(this.easydropLayer, 1);
    this.easydropLayer.visible = false;
  }

  addPoint(lat: number, lng: number) {
    this.graphicsLayer = new this._GraphicsLayer();
    this.map.add(this.graphicsLayer);
    const point = { //Create a point
      type: "point",
      longitude: lng,
      latitude: lat
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1
      }
    };
    this.pointGraphic = new this._Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    });
    //this.graphicsLayer.add(this.pointGraphic);
  }

  removePoint() {
    if (this.pointGraphic != null) {
      this.graphicsLayer.remove(this.pointGraphic);
    }
  }

  addRouter() {
    const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

    this.view.on("click", (event) => {
      console.log("point clicked: ", event.mapPoint.latitude, event.mapPoint.longitude);
      if (this.view.graphics.length === 0) {
        addGraphic("origin", event.mapPoint);
      } else if (this.view.graphics.length === 1) {
        addGraphic("destination", event.mapPoint);
        getRoute(); // Call the route service
      } else {
        this.view.graphics.removeAll();
        addGraphic("origin", event.mapPoint);
      }
    });

    var addGraphic = (type: any, point: any) => {
      const graphic = new this._Graphic({
        symbol: {
          type: "simple-marker",
          color: (type === "origin") ? "white" : "black",
          size: "8px"
        } as any,
        geometry: point
      });
      this.view.graphics.add(graphic);
    }

    var getRoute = () => {
      const routeParams = new this._RouteParameters({
        stops: new this._FeatureSet({
          features: this.view.graphics.toArray()
        }),
        returnDirections: true
      });

      this._Route.solve(routeUrl, routeParams).then((data: any) => {
        for (let result of data.routeResults) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
          };
          this.view.graphics.add(result.route);
        }

        // Display directions
        if (data.routeResults.length > 0) {
          const directions: any = document.createElement("ol");
          directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
          directions.style.marginTop = "0";
          directions.style.padding = "15px 15px 15px 30px";
          const features = data.routeResults[0].directions.features;

          let sum = 0;
          // Show each direction
          features.forEach((result: any, i: any) => {
            sum += parseFloat(result.attributes.length);
            const direction = document.createElement("li");
            direction.innerHTML = result.attributes.text + " (" + result.attributes.length + " miles)";
            directions.appendChild(direction);
          });

          sum = sum * 1.609344;
          console.log('dist (km) = ', sum);

          this.view.ui.empty("top-right");
          this.view.ui.add(directions, "top-right");

        }

      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  runTimer() {
    // @ts-ignore
    this.timeoutHandler = setTimeout(() => {
      // code to execute continuously until the view is closed
      // ...
      //this.animatePointDemo();
      this.runTimer();
    }, 200);
  }

  animatePointDemo() {
    this.removePoint();
    switch (this.dir) {
      case 0:
        this.pointCoords[1] += 0.01;
        break;
      case 1:
        this.pointCoords[0] += 0.02;
        break;
      case 2:
        this.pointCoords[1] -= 0.01;
        break;
      case 3:
        this.pointCoords[0] -= 0.02;
        break;
    }

    this.count += 1;
    if (this.count >= 10) {
      this.count = 0;
      this.dir += 1;
      if (this.dir > 3) {
        this.dir = 0;
      }
    }

    //this.addPoint(this.pointCoords[1], this.pointCoords[0]);
  }

  stopTimer() {
    if (this.timeoutHandler != null) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }

  }

  submitOrder (order) {
    // Hide the stores
    this.storehouseLayer.visible = false;

    // Make the easydrops visible
    this.easydropLayer.visible = true;

  }

  submitEasyDropSelection(easyDrop) {
    this.easydropLayer.visible = false;
    this.storehouseLayer.visible = true;
  }

  filterSubmit(filteredOption) {
    if (filteredOption.altex && !filteredOption.emag && !filteredOption.flanco && !filteredOption.other) {
      this.storehouseLayer.definitionExpression = "sellerName = 'ALTEX";
    } else if (!filteredOption.altex && filteredOption.emag && !filteredOption.flanco && !filteredOption.other) {
      this.storehouseLayer.definitionExpression = "sellerName = 'EMAG";
    } else if (!filteredOption.altex && !filteredOption.emag && filteredOption.flanco && !filteredOption.other) {
      this.storehouseLayer.definitionExpression = "sellerName = 'FLANCO";
    } else if (!filteredOption.altex && !filteredOption.emag && !filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression = "sellerName = 'STORE";
    } else if (filteredOption.altex && filteredOption.emag && !filteredOption.flanco && !filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'ALTEX' OR sellerName = 'EMAG'"
    } else if (filteredOption.altex && !filteredOption.emag && filteredOption.flanco && !filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'ALTEX' OR sellerName = 'FLANCO'"
    } else if (filteredOption.altex && !filteredOption.emag && !filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'ALTEX' OR sellerName = 'STORE'"
    } else if (!filteredOption.altex && filteredOption.emag && filteredOption.flanco && !filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'EMAG' OR sellerName = 'FLANCO'"
    } else if (!filteredOption.altex && filteredOption.emag && !filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'EMAG' OR sellerName = 'STORE'"
    } else if (!filteredOption.altex && !filteredOption.emag && filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'FLANCO' OR sellerName = 'STORE'"
    } else if (filteredOption.altex && filteredOption.emag && filteredOption.flanco && !filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'FLANCO' OR sellerName = 'EMAG' OR sellerName = 'ALTEX'"
    } else if (!filteredOption.altex && filteredOption.emag && filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'FLANCO' OR sellerName = 'EMAG' OR sellerName = 'STORE'"
    } else if (filteredOption.altex && !filteredOption.emag && filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'FLANCO' OR sellerName = 'ALTEX' OR sellerName = 'STORE'"
    } else if (filteredOption.altex && !filteredOption.emag && filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'FLANCO' OR sellerName = 'EMAG' OR sellerName = 'STORE'"
    } else if (filteredOption.altex && filteredOption.emag && !filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression ="sellerName = 'ALTEX' OR sellerName = 'EMAG' OR sellerName = 'STORE'"
    } else if (filteredOption.altex && filteredOption.emag && filteredOption.flanco && filteredOption.other) {
      this.storehouseLayer.definitionExpression =""
    }

  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
      console.log("mapView ready: ", this.view.ready);
      this.loaded = this.view.ready;
      if (this.dataService.getLoggedClient() != null) {
        // @ts-ignore
        this.client = this.dataService.getLoggedClient();
      }

      this.mapLoadedEvent.emit(true);
      this.runTimer();
    });
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      // @ts-ignore
      this.view.container = null;
    }
    this.stopTimer();
  }
}
