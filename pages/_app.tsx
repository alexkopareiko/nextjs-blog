import { wrapper } from '../store'
import '../styles/global.css'


function App({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    )
}
export default wrapper.withRedux(App)