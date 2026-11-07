import { SVGElement } from '@nuvo-js/core';
import type { SVGElementPropsType } from '@nuvo-js/core/types';

function Trash(props: SVGElementPropsType) {
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
                strokeWidth: 4,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                ...props,
                children: [
                    new SVGElement<SVGPolylineElement>({
                        tagName: 'polyline',
                        props: {
                            points: '3 6 5 6 21 6',
                            strokeWidth: 4,
                        },
                    }).dom, new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            strokeWidth: 4,
                            d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Trash;
