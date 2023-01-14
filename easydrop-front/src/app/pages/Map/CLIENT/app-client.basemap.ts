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
import {DataService} from "../../../services/data.service"; // Esri TypeScript Types

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
        Basemap, VectorTileLayer] = await loadModules([
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
        "esri/layers/VectorTileLayer"
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

    const editThisAction = {
      title: "See products",
      id: "see_products",
      className: "esri-icon-drag-horizontal"
    };

    this.storehouseLayer = new this._FeatureLayer({
      url: "https://services5.arcgis.com/ObTnNYKRHBBDNxkd/arcgis/rest/services/storehouselayer/FeatureServer/0",
      renderer: render_logos,
      outFields: ["*"],
      popupTemplate: {
        title: "{storehouseName}",
        actions: [editThisAction],
        content: [
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
            type: "fields",
            fieldInfos: [
              {
                fieldName: "storehouseAddress",
                visible: true,
                label: "Address"
              }
            ]
          }]
      }
    })

    this.map.add(this.storehouseLayer, 0);
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
