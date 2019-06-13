import icons from './icons';
import * as styles from './styles.scss';

interface XIconTemplateData {
  iconName: string;
}

const getIconForName = (iconName: string) => icons[iconName] || '';

export default (
  render: Function,
  data: XIconTemplateData,
  createStyle: Function,
) => {
  return render`
        ${createStyle(styles)}
        ${{ html: getIconForName(data.iconName) }}
    `;
};
