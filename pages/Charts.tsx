import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Header from './Header';
export const Charts = (props: { history: string[]; title: string; state: string; }) => {
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
            },
        ],
    };
    const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/HrAdminHomePage");
    }
    return (
        <div>
            <View>
                <View >
                    <Header />
                </View>
                <h2 className = "text-center"> Skill Base Chart View </h2>
                <View style={styleSheet.MainContainer}>
                <BarChart
        data={{
          labels: ['R&D', 'Back Office', 'IT', 'Development', 'QA'],
          datasets: [{ data: [10, 20, 50, 40, 20] }],
        }}
        width={Dimensions.get('window').width - 250}
        height={230}
        yAxisLabel={'SR - '}
        chartConfig={{
          backgroundColor: '#EB2828',
          fillShadowGradient: '#FCBD00',
          fillShadowGradientOpacity: 1,
          backgroundGradientFrom: '#2F8079',
          backgroundGradientTo: '#2F8079',
          decimalPlaces: 0,
          color: (opacity = 1) => '#DCE0E3',
          style: {
            borderRadius: 12, padding: 10
          },
        }}
      />
      <br />
            <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>

                </View>

            </View>

        </div>
    )
}

const styleSheet = StyleSheet.create({

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
export default Charts;
Charts.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
