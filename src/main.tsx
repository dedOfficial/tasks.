import { render } from 'preact';
import App from './app/App';
import './index.css';

render(<App />, document.getElementById('app') as HTMLElement);
