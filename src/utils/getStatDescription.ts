import { getStats } from './getStats';
import i18n from '../i18n/i18n';

interface IParams {
	before: number;
	current: number;
	context: string;
}

export const getStatDescription = ({ before, current, context }: IParams) => {
	const { trend, actualDiff, percentDiff } = getStats(before, current);
	let description = null;

	if (trend === 0) {
		description = i18n.t('global.noChangeSinceLastUpdate');
	} else {
		{
			const prefixTranslation =
				trend === 1 ? i18n.t('global.increase') : i18n.t('global.decrease');
			const ofTranslation = i18n.t('global.of');
			const asTranslation = i18n.t('global.as');

			/* prettier-ignore */
			description = `${prefixTranslation} ${ofTranslation} ${Math.abs(actualDiff)} ${context}, ${asTranslation}${percentDiff}%`;
		}
	}

	return {
		description
	};
};
