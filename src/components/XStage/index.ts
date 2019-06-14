import Component from "@biotope/element";
import { ComponentOptions } from "./interfaces/ComponentOptions";
import { ComponentState } from "./interfaces/ComponentState";
import template from "./template";

class XStage extends Component<ComponentOptions, ComponentState> {
	protected get defaultProps() {
		return {
			headline: "Default Headline",
			claim: "Default Claim",
			secondaryColor: false,
			image: {
				url: "_assets/XStage/01_ensemblehaus-freiburg-low-res.png",
				alt: "Default Alt Text",
				align: "top"
			}
		};
	}
	public static componentName = "x-stage";

	static attributes = [
		"headline",
		"claim",
		{ name: "secondary-color", converter: value => value != null },
		{ name: "image", converter: value => JSON.parse(value) }
	];

	public render() {
		return template(this.html, this.props, this.createStyle);
	}
}

export default XStage;
XStage.register();
