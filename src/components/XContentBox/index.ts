import Component from '@biotope/element';
import { XDropdown } from '../XDropdown/index';
import template from './template';

interface XContentBoxProps {
  headline: string;
}

interface XContentBoxState {}

class XContentBox extends Component<XContentBoxProps, XContentBoxState> {
  public static componentName = 'x-content-box';
  public static attributes = ['headline'];
  public static dependencies = [XDropdown as typeof Component];

  public render() {
    return template(
      this.html,
      { headline: this.props.headline },
      this.createStyle,
    );
  }
}

export default XContentBox;

XContentBox.register();
