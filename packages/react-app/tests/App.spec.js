import {
    Selector
} from 'testcafe';

import {
    StencilComponentSelector,
    ListSelector
} from './utils';

const STENCIL_COMPONENT_NAME = 'st-button';
let stencilComponent;
let nameInput;
let stencilComponentGreeting;
let eventsEl;
let methodsEl;


fixture `React Stencil Component Test`
    .page `http://localhost:8080/`
    .beforeEach(async t => {
        nameInput = Selector('#nameInput');
        stencilComponent = await StencilComponentSelector(STENCIL_COMPONENT_NAME);
        stencilComponentGreeting = Selector(() => document.querySelector('st-button').shadowRoot.querySelector('input'));
        eventsEl = await ListSelector('#events');
        methodsEl = await ListSelector('#methods');
    })

test('Should add event and method', async t => {

    const GREETING = 'Hello'
    const NAME = 'Peter'
    const expectedResult = `${GREETING} ${NAME}`;

    await t.typeText(stencilComponentGreeting, GREETING, {
        replace: true
    })

    await t
        .typeText(nameInput, NAME, {
            replace: true
        });

    await stencilComponent.click();

    const events = await eventsEl.getListContents();
    const methods = await methodsEl.getListContents();

    await t.expect(events[0]).eql(expectedResult);
    await t.expect(methods[0]).eql(expectedResult);
});

test('Can update name', async t => {

    const GREETING = 'Hello'
    const NAME1 = 'Peter'
    const NAME2 = 'Paul'

    await t.typeText(stencilComponentGreeting, GREETING, {
        replace: true
    })

    await t
        .typeText(nameInput, NAME1, {
            replace: true
        });

    await stencilComponent.click();

    await t
        .typeText(nameInput, NAME2, {
            replace: true
        });

    await stencilComponent.click();

    const events = await eventsEl.getListContents();
    const methods = await methodsEl.getListContents();

    await t.expect(events[0]).eql(`${GREETING} ${NAME1}`);
    await t.expect(events[1]).eql(`${GREETING} ${NAME2}`);
    await t.expect(methods[0]).eql(`${GREETING} ${NAME1}`);;
    await t.expect(methods[1]).eql(`${GREETING} ${NAME2}`);
});

test('Can update greeting', async t => {

    const GREETING1 = 'Hello'
    const GREETING2 = 'Bye'
    const NAME = 'Peter'

    await t.typeText(stencilComponentGreeting, GREETING1, {
        replace: true
    })

    await t
        .typeText(nameInput, NAME, {
            replace: true
        });

    await stencilComponent.click();

    await t.typeText(stencilComponentGreeting, GREETING2, {
        replace: true
    })

    // need to update React
    await t.click(nameInput);

    await stencilComponent.click();

    const events = await eventsEl.getListContents();
    const methods = await methodsEl.getListContents();

    await t.expect(events[0]).eql(`${GREETING1} ${NAME}`);
    await t.expect(events[1]).eql(`${GREETING2} ${NAME}`);
    await t.expect(methods[0]).eql(`${GREETING1} ${NAME}`);
    await t.expect(methods[1]).eql(`${GREETING2} ${NAME}`);
});