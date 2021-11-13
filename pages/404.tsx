import React from 'react';
import { View} from 'react-native';
import Header from "./Header";
import Footer from './Footer';
const NotFoundPage = (props: { history: string[]; }) => {
    const submit = (e: { preventDefault: () => void; }) => {
        props.history.push("/");
    }
    return (
        <div>

            <View>
                <View >
                    <Header />
                </View>
            </View>
            <div className="text-center col-6 mx-auto">
                <br /><br /><br />
                <h2>404 Page Not Found</h2><br /><br /><br />
                <button button-type='submit' className="btn btn-primary" onClick={submit}>Back</button>
            </div>
            <View>
                <View >
                    <Footer />
                </View>
            </View>
        </div>
    )
}

export default NotFoundPage;