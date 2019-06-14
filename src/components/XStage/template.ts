import classNames from 'classnames';
import { wire } from 'hyperhtml';
import { ComponentOptions } from './interfaces/ComponentOptions';
import * as styles from './styles.scss';

export default (
  render: Function,
  data: ComponentOptions,
  createStyle: Function,
) => {
  const wrapClass = classNames('stage__imageContainer', {
    ['stage__imageContainer--alignTop']: data.image.align === 'top',
    ['stage__imageContainer--alignBottom']: data.image.align === 'bottom',
    ['stage__imageContainer--alignCenter']: data.image.align === 'center',
  });

  const textColorClass = classNames('stage__textWrapper', {
    ['stage__textWrapper--colored']: data.text.secondaryColor,
  });

  const wrapStyle = classNames('', {
    [`background-image: url('${data.image.url}'`]: data.image.url,
  });

  return render`
        ${createStyle(styles)}
        <div class="stage">
            <div class=${wrapClass} style=${wrapStyle}></div>
            <div class=${textColorClass}>
                <h1 class="stage__headline">${data.text.headline}</h1>
                <h3 class="stage__claim">${data.text.claim}</h3>
            </div>
        </div>
    `;
};
