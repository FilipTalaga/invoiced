/* eslint-disable id-blacklist */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
    trimWhole: () => string;
    reverse: () => string;
}

String.prototype.trimWhole = function () {
    return this.replace(/\s\s+/g, ' ').trim();
};

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};
