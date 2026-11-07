import {
    Element, Store, Fragment
} from '@nuvo-js/core';
import { Button } from './uikit';
import Icon from './uikit/Icon';

interface Todo {
    id: string;
    title: string;
}

function App() {
    const store = new Store<Todo[]>([]);
    const value = new Store<string | undefined>(undefined);


    return (
        Fragment([
            new Element<HTMLHeadingElement>({
                tagName: 'h1',
                props: {
                    children: ['Nuvo todo example.'],
                },
            }).dom,

        ])
    );
}

export default App;
