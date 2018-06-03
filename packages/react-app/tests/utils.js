import {
    Selector
} from 'testcafe';


export async function StencilComponentSelector(selector) {
    return await Selector(selector).addCustomMethods({
        click: (el) => {
            return new Promise((resolve) => {
                el.shadowRoot.querySelector('button').click();
                resolve();
            })
        }
    });
}


export async function ListSelector(selector) {
    return await Selector(selector).addCustomMethods({
        getListContents: (el) => {
            return new Promise((resolve) => {
                const contents = [].slice.call(el.querySelectorAll('li')).map(e => {
                    return e.innerText;
                });
                return resolve(contents);
            })
        }
    })
}