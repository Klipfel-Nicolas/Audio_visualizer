import { EventEmitter } from "events";
export default class Page extends EventEmitter {
  constructor() {
    super();
    
    this.page = document.querySelector("#app");
 
    this.clickEventElements = document.querySelectorAll('.click-element');


    this.addEventListeners();
  }




  
  // Events
  onResize() {
   
  }


 
  

  // Loop

  update() {
   
  }

  // Listeners
  onClickEvent(element) {
    this.emit(element.dataset.event)
  }

  addEventListeners() {
      
    this.clickEventElements.forEach(element => {
        element.addEventListener('click', () => this.onClickEvent(element))
    })
  }

  removeEventListeners() {}

  // Destroy

  destroy() {
  }
}
