export function clsx(...args: (string | undefined)[]) {
    const len = args.length;

    let i = 0,
        tmp,
        str = '';

    for (; i < len; i++) {
        if ((tmp = args[i])) {
            if (typeof tmp === 'string') {
                str += (str && ' ') + tmp;
            }
        }
    }

    return str;
}

