export default class ClassNames {
    static classListAdd(element: HTMLElement, className: string) {
        className = className.trim();

        let classNames = element.className.split(' ');
        let hash = {};
        for (let index = 0, length = classNames.length; index < length; index++) {
            let name = classNames[index].trim();
            if (name) {
                hash[name] = name;
            }
        }

        hash[className] = className;

        classNames = Object.keys(hash);
        element.className = Object.keys(hash).join(' ');
    }

    static classListRemove(element: HTMLElement, className: string) {
        className = className.trim();

        let classNames = element.className.split(' ');
        let hash = {};
        for (let index = 0, length = classNames.length; index < length; index++) {
            let name = classNames[index].trim();
            if (name) {
                hash[name] = name;
            }
        }

        delete hash[className];

        element.className = Object.keys(hash).join(' ');
    }
}
