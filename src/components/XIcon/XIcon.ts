import Component from '@biotope/element';
import template from './template';

interface XIconProps {
  icon: string;
}

interface XIconState {}

class XIcon extends Component<XIconProps, XIconState> {
  public static componentName = 'x-icon';

  public static attributes = ['icon'];

  get defaultProps() {
    return {
      icon: '',
    };
  }

  public render() {
    return template(this.html, { iconName: this.props.icon }, this.createStyle);
  }
}

export default XIcon;
