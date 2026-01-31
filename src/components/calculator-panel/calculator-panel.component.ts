import { Component, ChangeDetectionStrategy, model, computed, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPanelComponent {
  isBest = input(false);
  isWorst = input(false);
  defaultName = input.required<string>();
  
  itemName = model('Choice 1');
  weight = model<number | null>(null);
  unit = model('g / ml');
  quantity = model<number | null>(1);
  price = model<number | null>(null);

  unitPriceChange = output<number>();

  readonly EUR_TO_BGN = 1.95583;

  unitPriceBGN = computed(() => {
    const w = this.weight() ?? 0;
    const q = this.quantity() ?? 1;
    const p = this.price() ?? 0;

    if (w > 0 && q > 0 && p > 0) {
      const unitPriceEUR = p / (w * q);
      return unitPriceEUR * this.EUR_TO_BGN;
    }
    return 0;
  });

  constructor() {
    effect(() => {
      this.unitPriceChange.emit(this.unitPriceBGN());
      if (this.defaultName() && this.itemName() === 'Choice 1') {
        this.itemName.set(this.defaultName());
      }
    });
  }

  onWeightChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.weight.set(value ? parseFloat(value) : null);
  }

  onQuantityChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = value ? parseInt(value, 10) : 1;
    this.quantity.set(isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue);
  }

  onPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.price.set(value ? parseFloat(value) : null);
  }
}
