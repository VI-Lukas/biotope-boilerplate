import Component from '@biotope/element';
import XIcon from '../XIcon/XIcon';
import template from './template';

interface XDropdownProps {
  id: string;
  label: string;
  required: boolean;
  disabled: boolean;
  error?: string;
  readonly: boolean;
  options: Option[];
  resetLabel?: string;
  resetable: boolean;
  role: 'default' | 'table-cell';
  hint?: string;
  selectedValue: string;
  selectedLabel: string;
}

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

interface XDropdownState {
  focus: boolean;
  options: Option[];
}

export class XDropdown extends Component<XDropdownProps, XDropdownState> {
  private get select(): HTMLSelectElement {
    return this.shadowRoot.querySelector(
      '.x-dropdown__element',
    ) as HTMLSelectElement;
  }

  protected get defaultProps(): XDropdownProps {
    return {
      id: 'list',
      label: 'Label text',
      disabled: false,
      required: false,
      readonly: false,
      options: [],
      resetLabel: 'Reset',
      resetable: false,
      role: 'default',
      selectedLabel: '',
      selectedValue: '',
    };
  }

  get defaultState(): XDropdownState {
    return {
      focus: false,
      options: [],
    };
  }

  private get options() {
    return this.state.options.length
      ? this.state.options
      : this.props.selectedLabel && this.props.selectedValue
      ? [
          {
            label: this.props.selectedLabel,
            value: this.props.selectedValue,
            selected: true,
          },
        ]
      : [];
  }
  public static componentName = 'x-dropdown';

  static dependencies = [XIcon as typeof Component];

  protected static attributes = [
    'label',
    'error',
    'reset-label',
    'role',
    'hint',
    'selected-value',
    'selected-label',
    { name: 'resetable', converter: value => value != null },
    { name: 'required', converter: value => value != null },
    { name: 'disabled', converter: value => value != null },
    { name: 'readonly', converter: value => value != null },
    { name: 'options', converter: value => JSON.parse(value) },
  ];

  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
  }

  public connectedCallback() {
    this.select.addEventListener('change', this.onChange);
    this.select.addEventListener('focus', this.onFocus);
    this.select.addEventListener('focusout', this.onFocusOut);
    this.setState({ ...this.state, options: this.props.options });
  }

  public disconnectedCallback() {
    this.select.removeEventListener('change', this.onChange);
    this.select.removeEventListener('focus', this.onFocus);
    this.select.removeEventListener('focusout', this.onFocusOut);
  }

  public onPropsChanged() {
    const options = this.props.options;

    if (this.props.resetable) {
      const resetOption = {
        label: this.props.resetLabel,
        value: 'xDropdownResetIdentifier',
      } as Option;
      const seperatorOption = {
        label: '──────────',
        value: '',
        disabled: true,
      } as Option;
      options.unshift(resetOption, seperatorOption);
    }

    this.setState({ ...this.state, options: options || [] });
  }

  public render() {
    return template(
      this.html,
      this,
      {
        id: this.props.id,
        label: this.props.label,
        required: this.props.required,
        selected: this.options.some(option => option.selected),
        focus: this.state.focus,
        error: this.props.error,
        disabled: this.props.disabled,
        readOnly: this.props.readonly,
        options: this.options,
        role: this.props.role,
        hint: this.props.hint,
      },
      this.createStyle,
    );
  }

  private onChange(event: UIEvent) {
    const select = event.target as HTMLSelectElement;
    const currentValue = select.options[select.selectedIndex].value;
    const currentOptions = this.state.options.map(option => ({
      ...option,
      selected: option.value === currentValue,
    }));

    if (
      select.options[select.selectedIndex].value === 'xDropdownResetIdentifier'
    ) {
      this.setState({
        ...this.state,
        options: this.props.options,
      });
      this.onFocusOut();
      this.select.blur();
      this.emit('onChange', null, false);
    } else {
      this.setState({
        ...this.state,
        options: currentOptions,
      });

      this.emit(
        'onChange',
        {
          currentValue,
          options: this.state.options,
        },
        false,
      );
    }
  }

  private onFocus() {
    this.setState({ ...this.state, focus: true });
  }

  private onFocusOut() {
    this.setState({ ...this.state, focus: false });
  }
}

XDropdown.register();
