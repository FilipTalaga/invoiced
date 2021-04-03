import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputEvent = (val: string) => void;

@Component({
    selector: 'text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TextFieldComponent),
        },
    ],
})
export default class TextFieldComponent implements ControlValueAccessor {
    @Input() type!: string;

    private val = '';

    set value(val) {
        this.val = val;
        this.onChange(val);
        this.onTouched(val);
    }

    get value() {
        return this.val;
    }

    writeValue = (value: string) => (this.value = value);

    registerOnChange = (fn: InputEvent) => (this.onChange = fn);

    registerOnTouched = (fn: InputEvent) => (this.onTouched = fn);

    private onChange: InputEvent = () => {};

    private onTouched: InputEvent = () => {};
}
