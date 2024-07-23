interface divInterface {
  prevBtn: HTMLButtonElement; 
  nextBtn?: HTMLButtonElement, 
  progressBar: HTMLDivElement, 
  circleNum:  NodeListOf<Element>
}

class Progress {
  private dom = {} as divInterface; 
  private progress: number = 0;
  private counter: number = 0;

  constructor(container: HTMLDivElement) {
      this.getElements(container); 
      this.initNext();
      this.initPrev();
      this.initNumber(true);
  }

  getElements(container: HTMLDivElement) {
      this.dom = {
          prevBtn: container.querySelector('.btnPrev') as HTMLButtonElement,
          nextBtn: container.querySelector('.btnNext') as HTMLButtonElement, 
          progressBar: container.querySelector('.progress-bar') as HTMLDivElement, 
          circleNum: container.querySelectorAll('.circle') as NodeListOf<Element>
      }
  }

  initNext() {
      this.dom.nextBtn?.addEventListener('click', () => {
        if (this.counter < 3) {
          this.counter++
          this.progress += 33.333;
          this.dom.progressBar.style.width = `${this.progress}%`
          this.initNumber(true);
        }

        if (this.counter > 0) this.dom.prevBtn.disabled = false;
      })
  }

  initPrev() {
    this.dom.prevBtn.addEventListener('click', () => {
      this.counter--; 
      this.progress-=33.333;
      this.dom.progressBar.style.width = `${this.progress}%`
      this.initNumber(false);
      if(this.counter === 0 ) {
        this.dom.prevBtn.disabled = true;
      }
    })
  }

  initNumber(next: boolean) {
    console.log(next)
    Array.from(this.dom.circleNum).forEach((e, index) => {
      if (next) {
        this.counter === index? e.classList.add('active') : null;
      } else {
        console.log(next)
        this.counter + 1 === index? e.classList.remove('active') : null;
      }
    })
  }
}



export default Progress