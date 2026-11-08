import './style.css';
import { createRoot } from '@nuvo-js/core'
import App from './App';

const root = document.getElementById('app');

createRoot(root!, App());


const datewise = window['datewise']

console.log(datewise)