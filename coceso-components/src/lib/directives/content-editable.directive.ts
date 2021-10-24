import {Directive, ElementRef, forwardRef, HostListener, Inject, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[contenteditable][formControlName], [contenteditable][formControl], [contenteditable][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableDirective),
      multi: true,
    },
  ],
})
export class ContentEditableDirective implements ControlValueAccessor {

  private _onTouched = () => {
  };

  private _onChange: (value: string) => void = () => {
  };

  constructor(@Inject(ElementRef) private readonly elementRef: ElementRef, @Inject(Renderer2) private readonly renderer: Renderer2) {
  }

  @HostListener('input')
  private onInput() {
    // Multiline is done through tags, replace them with newlines
    // TODO Check for other browsers
    const value = this.elementRef.nativeElement.innerHTML?.replace(/(<[^>]+>)+/g, '\n').trim();
    this._onChange(value || null);
  }

  @HostListener('blur')
  onBlur() {
    this._onTouched();
  }

  writeValue(value: string | null) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', value?.replace(/\n/g, '<br>') || '');
  }

  registerOnChange(onChange: (value: string | null) => void) {
    this._onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this._onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'contenteditable', String(!disabled));
  }
}
