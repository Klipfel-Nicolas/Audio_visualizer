import * as THREE from 'three'
import Experience from '../../Experience';

import trackList from '../../../datas/trackList';

export default class AudioVisualizer  {
  
    constructor() {
        this.experience = new Experience();

        this.trackList = trackList;
        this.sound = {};
        this.isPlaying = false;

        //Page events
        this.page = this.experience.page;
        this.handleAudioController();
    }

    /* ----------------------------------------------------------------
                        Set Three audioVisualizer
    ---------------------------------------------------------------- */
    /**
     * Create a Three audio listener, loader and analyser
     * @param {THREE.Mesh} mesh 
     */
    createThreeAudioAnalyser(mesh) {
        // audio listener
        this.listener = new THREE.AudioListener();
        mesh.add(this.listener);

        //global audio source
        this.sound = new THREE.Audio(this.listener);
        this.loader = new THREE.AudioLoader();

        // analyser
        this.analyser = new THREE.AudioAnalyser(this.sound, 32)
    }

    /**
     * @param {String} track - path to mp3 file
     * Load sound with Three loader
     */
    loadThreeAudio(track) {
        this.loader.load(track, (buffer) => {
            this.sound.setBuffer(buffer)
            this.sound.setLoop(true)
            this.sound.setVolume(0.5)
        })
    }


    /**
     * Three audio visualizer
     * @param {THREE.Mesh} mesh 
     */
    setThreeAudioVisualizer(mesh, frequencyUniformName) {
        this.mesh = mesh
        this.createThreeAudioAnalyser(mesh);
        this.loadThreeAudio(this.trackList[0]);

        // Set uniforms
        this.frequencyUniformName = frequencyUniformName;
        this.mesh.material.uniforms[this.frequencyUniformName] = {value: 0}; 
        
    }

    /* ---------------------------------
            Utils functions
    --------------------------------- */
    /**
     * getFrenquency function
     */
    getFrequency() {
        return this.analyser.getAverageFrequency()
    }

    /* ----------------------------------------------------------------
                        Audio Controller (play, pause stop...)
    ---------------------------------------------------------------- */
    handleAudioController() {
        this.page.on("audio-play", () => {
            this.sound.play();
            this.isPlaying = true;
        })
        this.page.on("audio-pause", () => {
            this.sound.pause();
            this.isPlaying = false;
        })
        this.page.on("audio-stop", () => {
            this.sound.stop();
            this.isPlaying = false;
        })
    }


    /* ----------------------------------------------------------------
                        Events
    ---------------------------------------------------------------- */
    onResize() {}

    addEventListeners() {}

    removeEventListeners() {}

    destroy() {}

    update() {
        if(this.getFrequency()) {
            this.freq = Math.max(this.getFrequency() - 100, 0) / 50;
            this.mesh.material.uniforms[this.frequencyUniformName].value = this.freq;

            return this.freq;
        } 
    }

    
}
