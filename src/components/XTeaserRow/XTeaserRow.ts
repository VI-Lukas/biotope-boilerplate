import Component from "@biotope/element";
import XButton from "../XButton/XButton";
import { TeaserRowOptions } from "./interfaces/TeaserRowOptions";
import { TeaserRowState } from "./interfaces/TeaserRowState";
import template from "./template";

class XTeaserRow extends Component<TeaserRowOptions, TeaserRowState> {
	static componentName = "x-teaser-row";
	static dependencies = [XButton as typeof Component];

	static attributes = [
		"heading",
		"text",
		{
			name: "items",
			converter: (s: string): TeaserRowOptions => JSON.parse(s)
		}
	];

	protected get defaultProps() {
		return {
			heading: "Static TeaserRow Headline",
			text: "Static TeaserRow Text",
			items: [
				{
					headline: "Static Item Headline",
					url: "Static Item Link",
					linkLabel: "Static Link Title",
					text: "Static Text",
					target: "_blank"
				},
				{
					headline: "Static Item Headline",
					url: "Static Item Link",
					linkLabel: "Static Link Title",
					list: [
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						}
					]
				},
				{
					headline: "Last Static Item Headline",
					url: "Static Item Link",
					linkLabel: "Static Link Title",
					list: [
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						},
						{
							heading: "Static List Item"
						}
					]
				}
			]
		};
	}

	render() {
		return template(this.html, this.props, this.createStyle);
	}
}

export default XTeaserRow;
