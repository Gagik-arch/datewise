import { SVGElement } from '@nuvo-js/core';
import type { SVGElementPropsType } from '@nuvo-js/core/types';

function ChevronsLeft(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: 24,
                height: 24,
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 2,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                ...props,
                children: [
                    new SVGElement<SVGPolylineElement>({
                        tagName: 'polyline',
                        props: {
                            points: '11 17 6 12 11 7',
                        },
                    }).dom,

                    new SVGElement<SVGPolylineElement>({
                        tagName: 'polyline',
                        props: {
                            points: '18 17 13 12 18 7',
                        },
                    }).dom,
                ],
            },
        }).dom
    );
}

export default ChevronsLeft;
