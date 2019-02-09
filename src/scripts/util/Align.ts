export type AlignType = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

export function alignClass(align: AlignType, classNames: string[]) {
    switch (align) {
        case 'start':
            classNames.push('align-start');
            break;
        case 'end':
            classNames.push('align-end');
            break;
        case 'left':
            classNames.push('align-left');
            break;
        case 'right':
            classNames.push('align-right');
            break;
        case 'center':
            classNames.push('align-center');
            break;
        case 'justify':
            classNames.push('align-justify');
            break;
        case 'initial':
            classNames.push('align-initial');
            break;
        case 'inherit':
            classNames.push('align-inherit');
            break;
    }
}