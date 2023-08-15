import * as THREE from 'three'
import { EventEmitter } from "events";

import Experience from '../Experience';
import Environment from '../Scene/Environement';
import AudioVisualizer from "../Sketches/AudioVisualizer/AudioVisualizer";
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

            // Cube Object
            this.cube = new Objects();
            this.cube.addMeshObject(
                new THREE.BoxGeometry( 1.5, 1.5, 1.5 ),
                new THREE.MeshBasicMaterial( {
                    color: 0x00ff00, 
                    wireframe: false 
                }),
            )
            this.cube.object.rotation.x = -.3
            this.cube.object.rotation.y = 1
            this.cube.addObjectDebug('cube')
            
            this.audioVisualizer.setThreeAudioVisualizer(this.cube.object)
        
     
            this.emit("worldready");
        }); 
        
    }

    

    //RESIZE
    resize() {
    }

    //UPDATE
    update() {
        
    }
}