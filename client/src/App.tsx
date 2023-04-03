import React, {FC} from 'react'
import 'assets/style.scss'
import {observer} from 'mobx-react-lite'
import NavigationBar from './components/navigation/NavigationBar/NavigationBar'
import Footer from "components/footer/Footer";
import Router from "./routes";
import 'react-widgets/styles.css'

const App: FC = () => {

    return (
        <div>
            <NavigationBar />
            <div
                className="container position-relative"
                style={{minHeight: 'calc(100vh - 498px)', margin: '2rem auto'}}
            >
                <Router />
            </div>
            <Footer />
        </div>
    )
}

export default observer(App)
