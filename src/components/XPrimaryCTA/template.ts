import { wire } from "hyperhtml";
import headset from "../../resources/icons/headset.svg";
import { PrimaryCTAOptions } from "./interfaces/PrimaryCTAOptions";
import * as styles from "./styles.scss";

export default (
	render: Function,
	{ link, linkLabel, linkTarget, text, icon }: PrimaryCTAOptions,
	createStyle: Function
) => {
	let iconFile = null;
	if (icon === "headset") {
		iconFile = headset;
	}

	return render`
        ${createStyle(styles)}
        <div class="primary-cta">
            <div class="primary-cta__content">
                ${
					iconFile !== null
						? wire()`<div class="primary-cta__icon">${{
								html: iconFile
						  }}</div>`
						: null
				}
                <div class="primary-cta__text">${text}</div>
                ${
					link
						? wire()`<x-button data-resources="[{paths : ['components/XButton/XButton.js']}]" conversion btnHref="${link}" btnText="${linkLabel}" target="${linkTarget}" type="link"></x-button>`
						: null
				}
            </div>
        </div>
    `;
};
