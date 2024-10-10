import { render } from 'preact';
import App from './app/App';

import './shared/styles/index.css';

render(<App />, document.getElementById('app') as HTMLElement);
