import { getTrendAndDiff } from '../../../../../utils/getTrendAndDiff';
import i18n from '../../../../../i18n/i18n';

interface IParams {
	before: number;
	current: number;
}

export const getDiffDescription = ({ before, current }: IParams) => {
	const { trend, actualDiff, percentDiff } = getTrendAndDiff(before, current);
	let description = null;

	if (trend === 0) {
		description = i18n.t('global.noChangeSinceLastUpdate');
	} else {
		const prefixTranslation =
			trend === 1 ? i18n.t('global.increase') : i18n.t('global.decrease');
		const ofTranslation = i18n.t('global.of');
		const asTranslation = i18n.t('global.as');

		/* prettier-ignore */
		description = `${prefixTranslation} ${ofTranslation} ${Math.abs(actualDiff)}, ${asTranslation}${percentDiff}%`;
	}

	return {
		description
	};
};
