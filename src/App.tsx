import React, {FunctionComponent} from 'react';
import Props from './components/base';
import Posts from "./components/posts";

interface AppComponent extends FunctionComponent<Props> {
}

const App: AppComponent = () => {
    return (
        <div>
            <Posts/>
        </div>
    )
}

export default App;
