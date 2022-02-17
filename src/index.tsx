import ReactDOM from 'react-dom'
import './index.css'
import App from './pages/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
// import store from './store'
import store from 'state'
import MulticallUpdater from 'state/multicall/updater'
import ApplicationUpdater from 'state/block/updater'
import './assets/css/antd.less'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from 'utils/getLibrary'
import { BrowserRouter as Router } from 'react-router-dom'
import TransactionUpdater from 'state/transactions/updater'

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
      <TransactionUpdater />
    </>
  )
}

ReactDOM.render(
  <Router>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Updaters />
        <App />
      </Provider>
    </Web3ReactProvider>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
