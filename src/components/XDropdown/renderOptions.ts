import { wire } from 'hyperhtml';
import { Option } from './index';

export const renderOptions = (option: Option, objectIdentity: any) => {
  return wire(objectIdentity, `:option:${option.value}`)`
		<option disabled=${option.disabled} value="${option.value}">${
    option.label
  }</option>` as HTMLOptionElement;
};
