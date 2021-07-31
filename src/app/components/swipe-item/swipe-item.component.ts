import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GestureController, AnimationController, IonItem, Animation } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements AfterViewInit {

  @Input('email') mail: any;
  bigIcon: boolean = false;
  trashAnimation: Animation;
  archiveAnimation: Animation;
  deleteAnimation: Animation;

  @ViewChild(IonItem, { read: ElementRef }) item: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('trash', { read: ElementRef }) trashIcon: ElementRef;
  @ViewChild('archive', { read: ElementRef }) archiveIcon: ElementRef;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: Router,
    private gestureCtrl: GestureController,
    private animationCtrl: AnimationController,

  ) { }

  ngAfterViewInit() {

    this.setupIconAnimation();
    const ANIMATION_BREACKPOINT = 70;
    const style = this.item.nativeElement.style;
    const windowWidth = window.innerWidth;
    this.animDeleteItem();
    
    const moveGesture = this.gestureCtrl.create({
      el: this.item.nativeElement,
      gestureName: 'move',
      threshold: 0,
      onStart: ev => {
        // -> Transicao inicial vazia
        style.transition = '';
      },
      onMove: ev => {
        // -> Aplicando estilo css na borda do item
        this.item.nativeElement.classList.add('rounded');

        // -> Definindo transicao ao mover
        style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;

        // -> Se o deltax for maior que 0 estamos deslizando o item para a direita se entao for menor que 0 deslizando para esquerda
        if (ev.deltaX > 0) {
          // -> Trocando cor do background
          this.wrapper.nativeElement.style['background-color'] = 'var(--ion-color-danger)'

        } else if (ev.deltaX < 0) {
          // -> Trocando cor do background
          this.wrapper.nativeElement.style['background-color'] = 'var(--ion-color-success)'

        }

        /**
         * Validando se o valor de deltaX e maior do que o 
         * ponto de interrupcao do swipe e se o icone nao e grande
         */
        if (ev.deltaX > ANIMATION_BREACKPOINT && !this.bigIcon) {

          this.animateTrash(true);
        } else if (ev.deltaX > 0 && ev.deltaX < ANIMATION_BREACKPOINT && this.bigIcon) {

          this.animateTrash(false);
        }

        if (ev.deltaX < -ANIMATION_BREACKPOINT && !this.bigIcon) {

          this.animateArquive(true);
        } else if (ev.deltaX < 0 && ev.deltaX > -ANIMATION_BREACKPOINT && this.bigIcon) {

          this.animateArquive(false);
        }
      },
      onEnd: ev => {

        // -> Removendo estilo da borda do item
        this.item.nativeElement.classList.remove('rounded');

        // -> Fazendo item voltar a posicao original
        style.transition = '0.2s ease-out';

        if(ev.deltaX > ANIMATION_BREACKPOINT){

          style.transform = `translate3d(${windowWidth}px, 0, 0)`
          this.deleteAnimation.play();
          this.delete.emit(true);

        } else if(ev.deltaX < -ANIMATION_BREACKPOINT){

          style.transform = `translate3d(-${windowWidth}px, 0, 0)`
          this.deleteAnimation.play();
          this.delete.emit(true);

        }else{

          style.transform = '';
        }
      }
    });
    moveGesture.enable();

  }

  // -> Criando animacao dos icones
  setupIconAnimation() {

    this.trashAnimation = this.animationCtrl.create('trash-animation')
      .addElement(this.trashIcon.nativeElement)
      .duration(300)
      .easing('ease-in')
      .fromTo('transform', 'scale(1)', 'scale(1.5)');

    this.archiveAnimation = this.animationCtrl.create('arquive-animation')
      .addElement(this.archiveIcon.nativeElement)
      .duration(300)
      .easing('ease-in')
      .fromTo('transform', 'scale(1)', 'scale(1.5)');
    
  }

  // -> Criando animacao do lado lixeira
  animateTrash(zoomIn) {

    this.bigIcon = zoomIn;
    // -> Exec. animacao
    if(zoomIn){
      this.trashAnimation.direction('alternate').play();
    }else{
      this.trashAnimation.direction('reverse').play();
    } 
    Haptics.impact({ style: ImpactStyle.Light });
  }

  // -> Criando animacao do lado arquivo 
  animateArquive(zoomIn) {

    this.bigIcon = zoomIn;

    // -> Exec. animacao
    if(zoomIn){
      this.archiveAnimation.direction('alternate').play();
    }else{
      this.archiveAnimation.direction('reverse').play();
    } 
    Haptics.impact({ style: ImpactStyle.Light });
  }

  animDeleteItem(){

    this.deleteAnimation = this.animationCtrl.create('delete-animation')
    .addElement(this.item.nativeElement)
    .duration(300)
    .easing('ease-out')
    .fromTo('height', '89px', '0');

  }

  // -> Ver detalhes
  openDatails(id) {
    this.route.navigate(['tabs', 'mail', id]);
    Haptics.impact({ style: ImpactStyle.Light })
  }
}
