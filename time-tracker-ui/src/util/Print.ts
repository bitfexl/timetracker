/**
 * Print an element.
 * @param element The element to print.
 * @returns A promise which will resolve after the print is either completed or cancled by the user.
 */
export async function printElement(element: HTMLElement) {
    return new Promise<void>((resolve) => {
        const className = randomClassName("print-");

        const style = document.createElement("style");
        style.innerHTML = `
        @media print {
            :not(.${className}, .inner-${className} *) {
                display: none !important;
            }

            .inner-${className} {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
            }
        }
    `;

        style.onload = () => {
            window.print();

            document.head.removeChild(style);
            removeClass(element, className);
            element.classList.remove("inner-" + className);

            resolve();
        };

        addClass(element, className);
        element.classList.add("inner-" + className);
        document.head.appendChild(style);
    });
}

function addClass(element: HTMLElement, className: string) {
    element.classList.add(className);
    const parent = element.parentElement;
    if (parent != null) {
        addClass(parent, className);
    }
}

function removeClass(element: HTMLElement, className: string) {
    element.classList.remove(className);
    const parent = element.parentElement;
    if (parent != null) {
        removeClass(parent, className);
    }
}

function randomClassName(prefix: string) {
    return prefix + Math.floor(Math.random() * 9999999999 + 999999999).toString(36);
}