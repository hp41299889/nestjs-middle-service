export const GET_ARGS_CONTENT = `
const getArgs = () => {
    const args = {};
    let key;
    process.argv.slice(2).forEach((arg, index, array) => {
        if (arg.startsWith('--')) {
            key = arg.slice(2);
            args[key] = '';
        } else {
            args[key] += arg;
            if (array[index + 1] && !array[index + 1].startsWith('--')) {
                args[key] += ' ';
            };
        };
    });
    return args;
};
const args = getArgs();
`;