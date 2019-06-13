import wire from 'hyperhtml';
import { TeaserRowOptions } from './interfaces/TeaserRowOptions';
import * as styles from './styles.scss';

export default (
  render: Function,
  { heading, text, items }: TeaserRowOptions,
  createStyle: Function,
) => {
  const addEmptyitems = items => {
    const classModifier: string[] = [];
    const emptyItemsMarkup: string[] = [];

    if (items.length % 3 !== 0) {
      for (let i = 0; i < 3 - (items.length % 3); i++) {
        classModifier.push(` teaserRow__item--threeRows`);
      }
    }

    if (items.length % 2 !== 0) {
      for (let i = 0; i < 2 - (items.length % 2); i++) {
        classModifier[i] = classModifier[i] + ` teaserRow__item--twoRows`;
      }
    }

    classModifier.forEach((element, index) => {
      emptyItemsMarkup.push(`
                <div class="teaserRow__item ${
                  typeof classModifier[index] !== undefined
                    ? classModifier[index]
                    : ''
                }"></div>
            `);
    });
    return emptyItemsMarkup;
  };

  const createItemMarkup = () => {
    const value = items.map(
      item => wire()`
            <div class="teaserRow__item">
                <h3>${item.headline}</h3>
                ${item.text !== undefined ? wire()`<p>${item.text}</p>` : ''}
                ${
                  item.list !== undefined
                    ? wire()`<ul>${item.list.map(
                        item => wire()`
                        <li>${item.heading}</li>
                    `,
                      )}</ul>`
                    : ''
                }
                ${wire()`<x-button
                    text btnHref="${item.url}"
                    btnText="${item.linkLabel}"
                    target="${item.target}"
                    type="link"
                    data-resources="[{paths : ['components/XButton/index.js']}]"></x-button>`}
            </div>
        `,
    );
    return value;
  };

  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles.toString();

  return render`
        ${createStyle(styles)}
        <div class="teaserRow">
            <div class="teaserRow__inner">
                <h2>${heading}</h2>
                <p>${text}</p>
            </div>
            <div class="teaserRow__itemWrapper">
                <div class="teaserRow__itemWrapperInner">
                   ${createItemMarkup()}
                   ${addEmptyitems(items)}
                </div>
            </div>
        </div>
    `;
};
