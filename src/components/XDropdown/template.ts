import classNames from 'classnames';
import { wire } from 'hyperhtml';
import { Option } from './index';
import { renderOptions } from './renderOptions';
import * as styles from './styles.scss';

interface XDropdownTemplateData {
  id: string;
  label: string;
  required: boolean;
  selected: boolean;
  focus: boolean;
  error: string;
  disabled: boolean;
  readOnly: boolean;
  options: Option[];
  role: string;
  hint: string;
}

export default (
  render: Function,
  objectIdentity,
  {
    id,
    label,
    error,
    required,
    selected,
    focus,
    disabled,
    readOnly,
    options,
    hint,
    role,
  }: XDropdownTemplateData,
  createStyle: Function,
) => {
  const labelClasses = classNames('x-dropdown__label', {
    ['x-dropdown__label--floating']: selected || focus,
    ['x-dropdown__label--required']: required,
  });
  const elementClass = classNames('x-dropdown__element', {
    ['x-dropdown__element--notEmpty']: selected || focus,
  });
  const wrapClass = classNames('x-dropdown__wrap', {
    ['x-dropdown__wrap--error']: error,
    ['x-dropdown__wrap--readonly']: readOnly,
    ['x-dropdown__wrap--disabled']: disabled,
    ['x-dropdown__wrap--tableCell']: role === 'table-cell',
  });
  const errorClass = classNames('x-dropdown__error', {
    ['x-dropdown__error--active']: error,
  });
  const iconErrorClass = classNames('x-dropdown__iconError', {
    ['x-dropdown__iconError--active']: error,
  });
  const iconArrowChevron = classNames('x-dropdown__iconChevron', {
    ['x-dropdown__iconChevron--active']: focus,
    ['x-dropdown__iconChevron--hidden']: error,
  });
  const hintClass = classNames('x-dropdown__hint', {
    ['x-dropdown__hint--visible']: hint,
    ['x-dropdown__hint--hidden']: error,
  });

  // we need a placeholder option which we select when no other option is selected.
  const emptyOption = selected
    ? null
    : wire(objectIdentity, ':emptyOption')`<option disabled></option>`;

  const dropdownEle = wire(
    objectIdentity,
  )`<select class="${elementClass}" id="${id}" disabled=${disabled}>
		${role !== 'table-cell' ? emptyOption : ''}
		${options.map(option => renderOptions(option, objectIdentity))}
	</select>` as HTMLSelectElement;

  // select the first option with `selected: true` or the empty option.
  dropdownEle.selectedIndex = selected
    ? findIndex(options, o => o.selected)
    : 0;

  readOnly
    ? dropdownEle.setAttribute('readonly', 'true')
    : dropdownEle.removeAttribute('readonly');

  return render`
		${createStyle(styles)}
		<div class="${wrapClass}">
			${dropdownEle}
			<label class="${labelClasses}" for="${id}">${label}</label>
			<x-icon class="${iconErrorClass}" icon="error"></x-icon>
			<x-icon class="${iconArrowChevron}" icon="arrow-down"></x-ixon>
			<span class="${errorClass}">${error}</span>
			<span class="${hintClass}">${hint}</span>
		</div>
	`;
};

/**
 * Array.findIndex is not available in IE11 and using lodash bloats the build file size.
 */
function findIndex<T>(values: T[], predicate: (v: T) => boolean): number {
  for (let i = 0; i < values.length; i++) {
    if (predicate(values[i])) {
      return i;
    }
  }

  return -1;
}
