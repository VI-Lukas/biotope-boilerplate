import { wire } from 'hyperhtml';
import * as styles from './styles.scss';

interface XContentBoxTemplateData {
  headline: string;
}

export default (
  render: Function,
  { headline }: XContentBoxTemplateData,
  createStyle: Function,
) => {
  const headlineClass = 'x-content-box__headline';
  return render`
        ${createStyle(styles)}
        ${
          headline
            ? wire()`<span class="${headlineClass}">${headline}</span>`
            : ''
        }
        <slot></slot>
    `;
};
