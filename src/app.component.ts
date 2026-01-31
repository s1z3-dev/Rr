import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorPanelComponent } from './components/calculator-panel/calculator-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CalculatorPanelComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  price1 = signal(0);
  price2 = signal(0);

  isChoice1Best = computed(() => {
    const p1 = this.price1();
    const p2 = this.price2();
    return p1 > 0 && p2 > 0 && p1 < p2;
  });

  isChoice1Worst = computed(() => {
    const p1 = this.price1();
    const p2 = this.price2();
    return p1 > 0 && p2 > 0 && p1 > p2;
  });
  
  isChoice2Best = computed(() => {
    const p1 = this.price1();
    const p2 = this.price2();
    return p1 > 0 && p2 > 0 && p2 < p1;
  });

  isChoice2Worst = computed(() => {
    const p1 = this.price1();
    const p2 = this.price2();
    return p1 > 0 && p2 > 0 && p2 > p1;
  });
}
