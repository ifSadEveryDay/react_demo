/*
 * @Descripttion :
 * @version      :
 * @Author       : luoawai
 * @Date         : 2020-11-23 14:51:00
 * @LastEditors  : luoawai
 * @LastEditTime : 2020-11-27 17:13:34
 * @FilePath     : \src\App.tsx
 */
import React, { useEffect } from 'react';
import loading from './assets/Images/ajax-loader.gif';
import './App.css';
import { hot } from 'react-hot-loader/root';
import {
  Viewer,
  IonResource,
  Cartesian3,
  HeadingPitchRoll,
  Cesium3DTileset,
  Cesium3DTileStyle,
  ScreenSpaceEventHandler,
  Color,
  LabelStyle,
  ScreenSpaceEventType,
  HeightReference,
  VerticalOrigin,
  HorizontalOrigin,
  Cartesian2,
  createWorldTerrain
} from '@smart/cesium';

function App() {
  useEffect(() => {
    //  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjE1NmI5MC1hNjA1LTRhMjMtYjA4MS04NTM4ZTUxNzU0MjYiLCJpZCI6MzE2OTksImlhdCI6MTYwMDMyMzUwMn0.8C6ptciABjSVDHkeC7iSGaYARIZ_uilU4qv6vfCNMNg';
    const viewer:any = new Viewer('cesiumContainer', {
      scene3DOnly: true,
      selectionIndicator: false,
      baseLayerPicker: false,
      geocoder: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      homeButton: true,
      fullscreenButton: false,
      timeline: false,
      animation: false

    });
    // 1.鹰眼图初始化
    const eyeViewer:any = new Viewer('eye', {
      scene3DOnly: true,
      selectionIndicator: false,
      baseLayerPicker: false,
      geocoder: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      homeButton: false,
      fullscreenButton: false,
      timeline: false,
      animation: false
    });
    viewer.cesiumWidget.creditContainer.style.display = 'none';
    eyeViewer.cesiumWidget.creditContainer.style.display = 'none';
    // 2.设置鹰眼图中球属性
    const control = eyeViewer.scene.screenSpaceCameraController;
    control.enableRotate = false;
    control.enableTranslate = false;
    control.enableZoom = false;
    control.enableTilt = false;
    control.enableLook = false;
    /**
     * @method: syncViewer
     * @Descripttion: 同步视图
     * @param {*}
     * @return {*}
     */
    const syncViewer = function() {
      eyeViewer.camera.flyTo({
        destination: viewer.camera.position,
        orientation: {
          heading: viewer.camera.heading,
          pitch: viewer.camera.pitch,
          roll: viewer.camera.roll
        },
        duration: 0.0
      });
    };
    // 同步视图
    viewer.scene.preRender.addEventListener(syncViewer);
    viewer.terrainProvider = createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true
    });
    //  viewer.scene.globe.enableLighting = true;
    const initialPosition = Cartesian3.fromDegrees(
      -73.998114468289017509,
      40.674512895646692812,
      2631.082799425431
    );
    const initialOrientation = HeadingPitchRoll.fromDegrees(
      7.1077496389876024807,
      -31.987223091598949054,
      0.025883251314954971306
    );
    const homeCameraView = {
      destination: initialPosition,
      orientation: {
        heading: initialOrientation.heading,
        pitch: initialOrientation.pitch,
        roll: initialOrientation.roll
      }
    };
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      (e: any) => {
        e.cancel = true;
        viewer.scene.camera.flyTo(homeCameraView);
      }
    );
    viewer.scene.camera.setView(homeCameraView);
    const city = viewer.scene.primitives.add(
      new Cesium3DTileset({ url: IonResource.fromAssetId(75343) })
    );
    const defaultStyle = new Cesium3DTileStyle({
      color: 'color(\'white\')',
      show: true
    });

    const transparentStyle = new Cesium3DTileStyle({
      color: 'color(\'white\', 0.3)',
      show: true
    });

    const heightStyle = new Cesium3DTileStyle({
      color: {
        conditions: [
          ['${Height} >= 300', 'rgba(45, 0, 75, 0.5)'],
          ['${Height} >= 200', 'rgb(102, 71, 151)'],
          ['${Height} >= 100', 'rgb(170, 162, 204)'],
          ['${Height} >= 50', 'rgb(224, 226, 238)'],
          ['${Height} >= 25', 'rgb(252, 230, 200)'],
          ['${Height} >= 10', 'rgb(248, 176, 87)'],
          ['${Height} >= 5', 'rgb(198, 106, 11)'],
          ['true', 'rgb(127, 59, 8)']
        ]
      },
      labelText: '(${Temperature} > 90) ? ">90" : "<=90"'
    });

    const tileStyle:any = document.getElementById('tileStyle');
    function set3DTileStyle() {
      const selectedStyle = tileStyle.options[tileStyle.selectedIndex].value;
      if (selectedStyle === 'none') {
        city.style = defaultStyle;
      } else if (selectedStyle === 'height') {
        city.style = heightStyle;
      } else if (selectedStyle === 'transparent') {
        city.style = transparentStyle;
      }
    }
    tileStyle.addEventListener('change', set3DTileStyle);
    // 未加载成功前显示加载中。。。
    const loadingIndicator: any = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
    city.readyPromise.then(function() {
      loadingIndicator.style.display = 'none';
    });
    const ellipsoid = viewer.scene.globe.ellipsoid;
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function(movement) {
      const cartesian = viewer.scene.camera.pickEllipsoid(movement.position, ellipsoid);
      const entity = viewer.entities.add({
        position: cartesian,
        point: {
          color: Color.RED,
          pixelSize: 10
        },
        label: {
          text: '测试名称',
          font: '14pt Source Han Sans CN',
          fillColor: Color.BLACK,
          backgroundColor: Color.AQUA,
          showBackground: true,
          style: LabelStyle.FILL,
          outlineWidth: 2,
          verticalOrigin: VerticalOrigin.CENTER,
          horizontalOrigin: HorizontalOrigin.LEFT,
          pixelOffset: new Cartesian2(10, 0),
          // 设置偏移
          heightReference: HeightReference.RELATIVE_TO_GROUND
        }
      });
      // hack 句柄销毁
      // handler.destroy();
    }, ScreenSpaceEventType.LEFT_CLICK);
  }, []);
  return (
    <div>
      <div id="cesiumContainer"></div>
      <div className="backdrop" id="menu">
        <h2>Sample NYC Geocaches</h2>
        <span>
          <strong>Camera Mode</strong>
        </span>
        <div className="nowrap">
          <input id="freeMode" name="source" type="radio" checked />
          <label htmlFor="freeMode">Free</label>
        </div>
        <div className="nowrap">
          <input id="droneMode" name="source" type="radio" />
          <label htmlFor="droneMode">Drone View</label>
        </div>
        <br />
        <span>
          <strong>3d Tile Styling</strong>
        </span>
        <div className="nowrap">
          <select id="tileStyle">
            <option value="none">None</option>
            <option value="height">Height</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>
        <br />
        <span>
          <strong>Display Options</strong>
        </span>
        <div className="nowrap">
          <input id="shadows" type="checkbox" />
          <label htmlFor="shadows">Shadows</label>
        </div>

        <div className="nowrap">
          <input id="neighborhoods" type="checkbox" checked />
          <label htmlFor="neighborhoods">Neighborhoods</label>
        </div>
        <br />
      </div>
      <div id="loadingIndicator" className="cover">
        <div id="loadingIcon" className="loadingIndicator">
          <img src={loading} />
        </div>
      </div>
      {/* 鹰眼图 */}
      <div id="eye"></div>
    </div>
  );
}

export default hot(App);
