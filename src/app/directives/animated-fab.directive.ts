import { Directive, HostListener, Input } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Directive({
  selector: '[appAnimatedFab]'
})
export class AnimatedFabDirective {

  @Input('appAnimatedFab') fab: any;
  expanded: boolean = true;
  shrinkAnimation: Animation;

  constructor(
    private animationCtrl: AnimationController
  ) { }


  ngAfterViewInit() {
    this.fab = this.fab.el;
    this.setupAnimation();
  }

  setupAnimation(){
  const textSpan = this.fab.querySelector('span');

  const shrink = this.animationCtrl.create('shrink')
  .addElement(this.fab)
  .duration(400)
  .fromTo('width', '140px','50px');

  const fade = this.animationCtrl.create('fade')
  .addElement(textSpan)
  .duration(400)
  .fromTo('opacity', 1, 0)
  .fromTo('width', '70px', '0px');

  this.shrinkAnimation = this.animationCtrl.create('shrink-animation')
  .duration(400)
  .easing('ease-out')
  .addAnimation([shrink,fade])
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any){


    if($event.detail.deltaY > 0 && this.expanded){

      this.expanded = false;
      this.shrinkFab();
    }else if ($event.detail.deltaY < 0 && !this.expanded){

      this.expanded = true;
      this.expandFab();
    }
  }

  shrinkFab(){
    this.shrinkAnimation.direction('alternate').play();
  }

  expandFab(){
    this.shrinkAnimation.direction('reverse').play();
  }


}
