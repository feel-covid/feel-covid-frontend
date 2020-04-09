declare module 'react-charts' {
	/** Declaration file generated by dts-gen */

	export const alignAuto: string;

	export const alignBottom: string;

	export const alignBottomLeft: string;

	export const alignBottomRight: string;

	export const alignLeft: string;

	export const alignRight: string;

	export const alignTop: string;

	export const alignTopLeft: string;

	export const alignTopRight: string;

	export const anchorBottom: string;

	export const anchorCenter: string;

	export const anchorClosest: string;

	export const anchorGridBottom: string;

	export const anchorGridLeft: string;

	export const anchorGridRight: string;

	export const anchorGridTop: string;

	export const anchorLeft: string;

	export const anchorPointer: string;

	export const anchorRight: string;

	export const anchorTop: string;

	export const axisTypeLinear: string;

	export const axisTypeLog: string;

	export const axisTypeOrdinal: string;

	export const axisTypeTime: string;

	export const axisTypeUtc: string;

	export const focusAuto: string;

	export const focusClosest: string;

	export const focusElement: string;

	export const groupingPrimary: string;

	export const groupingSecondary: string;

	export const groupingSeries: string;

	export const groupingSingle: string;

	export const positionBottom: string;

	export const positionLeft: string;

	export const positionRight: string;

	export const positionTop: string;

	export function Chart(_ref: any): any;

	export function curveBasis(context: any): any;

	export function curveBasisClosed(context: any): any;

	export function curveBasisOpen(context: any): any;

	export function curveBundle(context: any): any;

	export function curveCardinal(context: any): any;

	export function curveCardinalClosed(context: any): any;

	export function curveCardinalOpen(context: any): any;

	export function curveCatmullRom(context: any): any;

	export function curveCatmullRomClosed(context: any): any;

	export function curveCatmullRomOpen(context: any): any;

	export function curveLinear(context: any): any;

	export function curveLinearClosed(context: any): any;

	export function curveMonotoneX(context: any): any;

	export function curveMonotoneY(context: any): any;

	export function curveNatural(context: any): any;

	export function curveStep(context: any): any;

	export function curveStepAfter(context: any): any;

	export function curveStepBefore(context: any): any;

	export namespace Chart {
		namespace defaultProps {
			const focus: string;

			const grouping: string;

			const showVoronoi: boolean;

			function getDatumStyle(): any;

			function getDatums(d: any): any;

			function getLabel(d: any, i: any): any;

			function getPrimary(d: any): any;

			function getPrimaryAxisID(s: any): any;

			function getR(d: any): any;

			function getSecondary(d: any): any;

			function getSecondaryAxisID(s: any): any;

			function getSeriesID(d: any, i: any): any;

			function getSeriesOrder(d: any): any;

			function getSeriesStyle(series: any): any;

			function onHover(): void;
		}

		namespace propTypes {
			function axes(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

			function dark(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

			function data(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

			function focus(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

			function getDatumStyle(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getDatums(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getLabel(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getPrimary(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getPrimaryAxisID(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getR(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

			function getSecondary(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getSecondaryAxisID(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getSeriesID(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getSeriesOrder(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function getSeriesStyle(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function grouping(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function onClick(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function onFocus(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function onHover(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function primaryCursor(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function renderSVG(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function secondaryCursor(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function series(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function showVoronoi(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			function tooltip(
				p0: any,
				p1: any,
				p2: any,
				p3: any,
				p4: any,
				p5: any
			): any;

			namespace axes {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace dark {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace getDatumStyle {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace getSeriesStyle {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace onClick {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace onFocus {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace onHover {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace primaryCursor {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace renderSVG {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace secondaryCursor {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace series {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace showVoronoi {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}

			namespace tooltip {
				function isRequired(
					p0: any,
					p1: any,
					p2: any,
					p3: any,
					p4: any,
					p5: any
				): any;
			}
		}
	}

	export namespace curveBundle {
		function beta(beta: any): any;
	}

	export namespace curveCardinal {
		function tension(tension: any): any;
	}

	export namespace curveCardinalClosed {
		function tension(tension: any): any;
	}

	export namespace curveCardinalOpen {
		function tension(tension: any): any;
	}

	export namespace curveCatmullRom {
		function alpha(alpha: any): any;
	}

	export namespace curveCatmullRomClosed {
		function alpha(alpha: any): any;
	}

	export namespace curveCatmullRomOpen {
		function alpha(alpha: any): any;
	}
}
