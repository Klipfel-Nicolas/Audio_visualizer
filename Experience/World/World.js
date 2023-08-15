import * as THREE from 'three'
import { EventEmitter } from "events";

import Experience from '../Experience';
import Environment from '../Scene/Environement';
import AudioVisualizer from "../Sketches/AudioVisualizer/AudioVisualizer";
import ShaderMaterials from '../Sketches/shaderMaterials/ShaderMaterials';
import Objects from './Objects';

export default class World extends EventEmitter {
    constructor() {
        super();

        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.audioVisualizer = new AudioVisualizer();
        this.debug = this.experience.debug;
        
        // Start world (on ressource ready)
        this.resources.on("ready", ()=> {
            this.environment = new Environment();

            /* ---------------------------------------------------------
                                Audio Object
             ---------------------------------------------------------*/
             this.shaderClass = new ShaderMaterials();
             this.sphereGeo =  new THREE.SphereGeometry(1, 100, 100);
             this.audioMaterial = this.shaderClass.createAudioMaterial();
             
             this.sphere = new Objects();
             this.sphere.addMeshObject(
                 this.sphereGeo,
                 this.audioMaterial
             )  
            this.sphere.addObjectDebug('sphere')        

            this.audioVisualizer.setThreeAudioVisualizer(this.sphere.object, 'uAudioFrequency')
        
     
            this.emit("worldready");
        }); 
        
    }

    

    //RESIZE
    resize() {
    }

    //UPDATE
    update() {
        if(this.shaderClass) this.shaderClass.update();

        if(this.audioVisualizer.analyser)this.audioVisualizer.update();

    }
}